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

const LESSON_ID = 721; // chu-cai-o-o-dau-nang (Bài 7: Ô ô, dấu nặng) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "ô" viết thường.', type: 'single_choice', opts: [['A', 'o'], ['B', 'ô'], ['C', 'ơ']], correct: 'B' },
  { text: 'Chọn chữ "Ô" viết hoa.', type: 'single_choice', opts: [['A', 'O'], ['B', 'Ơ'], ['C', 'Ô']], correct: 'C' },
  { text: 'Chữ Ô và chữ ô có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chữ ô có bộ phận nào ở phía trên?', type: 'single_choice', opts: [['A', 'Dấu mũ'], ['B', 'Dấu sắc'], ['C', 'Dấu chấm']], correct: 'A' },
  { text: 'Chọn từ đúng với hình ảnh: Người bố.', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bố'], ['C', 'bà']], correct: 'B' },
  { text: 'Chọn từ đúng với hình ảnh: Một cô bé.', type: 'single_choice', opts: [['A', 'cô bé'], ['B', 'bố bé'], ['C', 'bà bé']], correct: 'A' },
  { text: 'Chọn từ đúng với hình ảnh: Phần cổ của con cò.', type: 'single_choice', opts: [['A', 'cô bé'], ['B', 'cổ cò'], ['C', 'bố bé']], correct: 'B' },
  { text: 'Tiếng nào có chứa chữ ô?', type: 'single_choice', opts: [['A', 'cô'], ['B', 'bé'], ['C', 'bà']], correct: 'A' },
  { text: 'Trong câu "Bố và Hà đi bộ trên hè phố.", ai đi bộ cùng Hà?', type: 'single_choice', opts: [['A', 'Mẹ'], ['B', 'Bố'], ['C', 'Bà']], correct: 'B' },
  { text: 'Dấu nào được đặt ở cuối câu "Bố và Hà đi bộ trên hè phố."?', type: 'single_choice', opts: [['A', 'Dấu chấm'], ['B', 'Dấu hỏi'], ['C', 'Dấu phẩy']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép b + ô + dấu sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'bộ'], ['B', 'bố'], ['C', 'bổ']], correct: 'B' },
  { text: 'Ghép b + ô + dấu nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'bố'], ['B', 'bổ'], ['C', 'bộ']], correct: 'C' },
  { text: 'Ghép c + ô được tiếng nào?', type: 'single_choice', opts: [['A', 'cô'], ['B', 'cò'], ['C', 'co']], correct: 'A' },
  { text: 'Ghép c + ô + dấu hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'cộ'], ['B', 'cổ'], ['C', 'cố']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Bố và Hà đi ___ trên hè phố.', type: 'single_choice', opts: [['A', 'bố'], ['B', 'bộ'], ['C', 'cô']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: ___ bê bể cá.', type: 'single_choice', opts: [['A', 'Bố'], ['B', 'Bé'], ['C', 'Cô']], correct: 'A' },
  { text: 'Trong cụm từ "cô bé" có bao nhiêu chữ ô?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'A' },
  { text: 'Trong cụm từ "cổ cò" có bao nhiêu chữ ô?', type: 'single_choice', opts: [['A', 'Không có'], ['B', '1 chữ'], ['C', '2 chữ']], correct: 'B' },
  { text: 'Trong câu "Bố và Hà đi bộ trên hè phố." có bao nhiêu chữ ô?', type: 'single_choice', opts: [['A', '2 chữ'], ['B', '3 chữ'], ['C', '4 chữ']], correct: 'B' },
  { text: 'Những phương tiện nào có trong tranh "Xe cộ"?', type: 'single_choice', opts: [['A', 'Xe đạp, xe máy, ô tô'], ['B', 'Tàu thủy, máy bay, ô tô'], ['C', 'Xe buýt, tàu hỏa, xe đạp']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ ô', type: 'multiple_choice', opts: [['A', 'bố'], ['B', 'bộ'], ['C', 'cô'], ['D', 'cổ'], ['E', 'bé']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không có chữ ô?', type: 'single_choice', opts: [['A', 'phố'], ['B', 'cô'], ['C', 'bé'], ['D', 'bộ']], correct: 'C' },
  { text: 'Muốn đổi tiếng "cô" thành tiếng "cổ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm dấu hỏi'], ['B', 'Thêm dấu sắc'], ['C', 'Thêm dấu nặng']], correct: 'A' },
  { text: 'Muốn đổi tiếng "bộ" thành tiếng "bố", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi dấu nặng thành dấu sắc'], ['B', 'Đổi chữ ô thành chữ o'], ['C', 'Bỏ chữ b']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: đi bộ – Bố và Hà – trên hè phố', type: 'single_choice', opts: [['A', 'Đi bộ Bố và Hà trên hè phố.'], ['B', 'Bố và Hà đi bộ trên hè phố.'], ['C', 'Trên hè phố đi bộ Bố và Hà.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'bố và Hà đi bộ trên hè phố'], ['B', 'Bố và Hà đi bộ trên hè phố.'], ['C', 'Bố Và Hà Đi Bộ Trên Hè Phố.']], correct: 'B' },
  { text: 'Quan sát tranh: Bố đang mang một bể cá. Bố đang làm gì?', type: 'single_choice', opts: [['A', 'Bố bê bể cá.'], ['B', 'Bố đi câu cá.'], ['C', 'Bố cho cá ăn.']], correct: 'A' },
  { text: 'Câu "Bố bê bể cá." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Phương tiện nào có hai bánh và người đi phải đạp bằng chân?', type: 'single_choice', opts: [['A', 'Ô tô'], ['B', 'Xe máy'], ['C', 'Xe đạp']], correct: 'C' },
  { text: 'Khi đi bộ trên hè phố, em nên làm gì?', type: 'single_choice', opts: [['A', 'Đi trên vỉa hè và đi cùng người lớn'], ['B', 'Chạy xuống lòng đường'], ['C', 'Chơi đùa giữa đường']], correct: 'A' },
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
      'UPDATE quizzes SET questionText = ?, questionType = ?, optionsJson = ?, correctAnswerJson = ?, questionImageUrl = NULL, isActive = 1 WHERE id = ?',
      [q.text, q.type, JSON.stringify(optionsJson), JSON.stringify(q.correct), rows[i].id],
    );
    console.log(`    ✓ #${rows[i].id} (câu ${i + 1}) → ${q.type} · đáp án ${JSON.stringify(q.correct)}`);
  }
}

async function main() {
  await ds.initialize();
  console.log('Cập nhật quiz Bài 7: Ô ô, dấu nặng (lesson 721)…');
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
