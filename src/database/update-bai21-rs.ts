import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

const LESSON_ID = 735; // chu-r-r-s-s (Bài 21: R r – S s) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "r" viết thường.', type: 'single_choice', opts: [['A', 's'], ['B', 'r'], ['C', 'n']], correct: 'B' },
  { text: 'Chọn chữ "R" viết hoa.', type: 'single_choice', opts: [['A', 'R'], ['B', 'P'], ['C', 'S']], correct: 'A' },
  { text: 'Chọn chữ "s" viết thường.', type: 'single_choice', opts: [['A', 'r'], ['B', 'c'], ['C', 's']], correct: 'C' },
  { text: 'Chọn chữ "S" viết hoa.', type: 'single_choice', opts: [['A', 'C'], ['B', 'S'], ['C', 'R']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ r?', type: 'single_choice', opts: [['A', 'sẻ'], ['B', 'ra'], ['C', 'su']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ s?', type: 'single_choice', opts: [['A', 'rô'], ['B', 'rổ'], ['C', 'sẻ']], correct: 'C' },
  { text: 'Chọn từ đúng với hình hai chiếc rổ.', type: 'single_choice', opts: [['A', 'rổ rá'], ['B', 'cá rô'], ['C', 'chữ số']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con cá.', type: 'single_choice', opts: [['A', 'cá rô'], ['B', 'cá cờ'], ['C', 'cá hô']], correct: 'A' },
  { text: 'Chọn từ đúng với hình quả su su.', type: 'single_choice', opts: [['A', 'su su'], ['B', 'đu đủ'], ['C', 'bí đỏ']], correct: 'A' },
  { text: 'Trong câu "Bầy sẻ non ríu ra ríu rít bên mẹ.", con vật nào được nhắc đến?', type: 'single_choice', opts: [['A', 'Bầy cò'], ['B', 'Bầy sẻ'], ['C', 'Bầy gà']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép r + a được tiếng nào?', type: 'single_choice', opts: [['A', 'ra'], ['B', 'sa'], ['C', 'rô']], correct: 'A' },
  { text: 'Ghép r + ô + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'rô'], ['B', 'rổ'], ['C', 'rỗ']], correct: 'B' },
  { text: 'Ghép r + ê + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'rế'], ['B', 'rễ'], ['C', 'rể']], correct: 'B' },
  { text: 'Ghép s + e + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'sẻ'], ['B', 'sẽ'], ['C', 'sè']], correct: 'A' },
  { text: 'Ghép s + o + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'só'], ['B', 'sò'], ['C', 'sỏ']], correct: 'B' },
  { text: 'Tiếng nào có thanh hỏi?', type: 'single_choice', opts: [['A', 'rổ'], ['B', 'ra'], ['C', 'rô']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Cá ___.', type: 'single_choice', opts: [['A', 'rô'], ['B', 'rổ'], ['C', 'su']], correct: 'A' },
  { text: 'Điền từ thích hợp vào chỗ trống: Chợ có gà ri, cá rô, ___ ___.', type: 'single_choice', opts: [['A', 'su su'], ['B', 'rổ rá'], ['C', 'chữ số']], correct: 'A' },
  { text: 'Chợ có những loại thực phẩm nào?', type: 'single_choice', opts: [['A', 'Gà ri, cá rô và su su'], ['B', 'Cá cờ, đu đủ và lá hẹ'], ['C', 'Gà gô, cá hô và bí đỏ']], correct: 'A' },
  { text: 'Ngoài thực phẩm, chợ còn có vật dụng gì?', type: 'single_choice', opts: [['A', 'Bút chì'], ['B', 'Rổ rá'], ['C', 'Bàn ghế']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ r', type: 'multiple_choice', opts: [['A', 'ra'], ['B', 'rễ'], ['C', 'rổ'], ['D', 'sẻ'], ['E', 'rô']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ s', type: 'multiple_choice', opts: [['A', 'su'], ['B', 'sẻ'], ['C', 'số'], ['D', 'rô'], ['E', 'sò']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'rổ'], ['B', 'rá'], ['C', 'rô'], ['D', 'sẻ']], correct: 'D' },
  { text: 'Muốn đổi tiếng "rô" thành tiếng "rổ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh hỏi'], ['B', 'Thêm thanh sắc'], ['C', 'Đổi chữ r thành chữ s']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: bên mẹ – Bầy sẻ non – ríu ra ríu rít', type: 'single_choice', opts: [['A', 'Bầy sẻ non ríu ra ríu rít bên mẹ.'], ['B', 'Bên mẹ bầy sẻ non ríu ra ríu rít.'], ['C', 'Ríu ra ríu rít bên mẹ bầy sẻ non.']], correct: 'A' },
  { text: 'Câu "Bầy sẻ non ríu ra ríu rít bên mẹ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'C' },
  { text: 'Trong câu "Bầy sẻ non ríu ra ríu rít bên mẹ." có bao nhiêu tiếng bắt đầu bằng chữ r?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'C' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'chợ có gà ri, cá rô, su su.'], ['B', 'Chợ có gà ri, cá rô, su su.'], ['C', 'Chợ Có Gà Ri, Cá Rô, Su Su.']], correct: 'B' },
  { text: 'Khi bà tặng quà, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cháu cảm ơn bà ạ!'], ['B', 'Bà phải tặng thêm cho cháu.'], ['C', 'Cháu không cần nói gì.']], correct: 'A' },
  { text: 'Khi bố giúp em mang đồ, lời nói nào lễ phép nhất?', type: 'single_choice', opts: [['A', 'Con cảm ơn bố ạ!'], ['B', 'Bố mang nhanh lên!'], ['C', 'Đây là việc của bố mà!']], correct: 'A' },
];

async function updateExercise(exerciseNumber: number, qs: Q[]) {
  const rows: { id: number }[] = await ds.query(
    'SELECT id FROM quizzes WHERE lessonId = ? AND exerciseNumber = ? ORDER BY sortOrder ASC, id ASC',
    [LESSON_ID, exerciseNumber],
  );
  console.log(`  exercise ${exerciseNumber}: ${rows.length} câu hiện có, ${qs.length} câu mới`);
  if (rows.length !== qs.length) {
    console.warn(`  ⚠ Số câu không khớp (${rows.length} ≠ ${qs.length}). Cập nhật tối đa ${Math.min(rows.length, qs.length)} câu.`);
  }
  const n = Math.min(rows.length, qs.length);
  for (let i = 0; i < n; i++) {
    const q = qs[i];
    const optionsJson = q.opts.map(([key, text]) => ({ key, text }));
    await ds.query(
      'UPDATE quizzes SET questionText = ?, questionType = ?, optionsJson = ?, correctAnswerJson = ?, questionImageUrl = NULL, explanation = NULL, explanationAudioUrl = NULL, isActive = 1 WHERE id = ?',
      [q.text, q.type, JSON.stringify(optionsJson), JSON.stringify(q.correct), rows[i].id],
    );
    console.log(`    ✓ #${rows[i].id} (câu ${i + 1}) → ${q.type} · đáp án ${JSON.stringify(q.correct)}`);
  }
}

async function main() {
  await ds.initialize();
  console.log('Cập nhật quiz Bài 21: R r – S s (lesson 735)…');
  await updateExercise(1, EASY);
  await updateExercise(2, MEDIUM);
  await updateExercise(3, HARD);
  await ds.destroy();
  console.log('HOÀN TẤT ✅');
}

main().catch((e) => {
  console.error('LỖI:', e);
  process.exit(1);
});
