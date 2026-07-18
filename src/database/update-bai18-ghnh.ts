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

const LESSON_ID = 732; // chu-cai-gh-nh (Bài 18: Gh gh – Nh nh) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ ghép "gh" viết thường.', type: 'single_choice', opts: [['A', 'gh'], ['B', 'nh'], ['C', 'gi']], correct: 'A' },
  { text: 'Chọn chữ ghép "Gh" viết hoa.', type: 'single_choice', opts: [['A', 'Nh'], ['B', 'Gh'], ['C', 'Gi']], correct: 'B' },
  { text: 'Chọn chữ ghép "nh" viết thường.', type: 'single_choice', opts: [['A', 'ch'], ['B', 'kh'], ['C', 'nh']], correct: 'C' },
  { text: 'Chọn chữ ghép "Nh" viết hoa.', type: 'single_choice', opts: [['A', 'Nh'], ['B', 'Gh'], ['C', 'Kh']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng gh?', type: 'single_choice', opts: [['A', 'nhà'], ['B', 'ghé'], ['C', 'nhỏ']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng nh?', type: 'single_choice', opts: [['A', 'ghế'], ['B', 'ghi'], ['C', 'nhà']], correct: 'C' },
  { text: 'Chọn từ đúng với hình chiếc ghế bằng đá.', type: 'single_choice', opts: [['A', 'ghế đá'], ['B', 'ghế gỗ'], ['C', 'nhà đá']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con ghẹ màu đỏ.', type: 'single_choice', opts: [['A', 'cá đỏ'], ['B', 'ghẹ đỏ'], ['C', 'cua nhỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình ngôi nhà bằng gỗ.', type: 'single_choice', opts: [['A', 'nhà gỗ'], ['B', 'ghế gỗ'], ['C', 'nhà nhỏ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc lá nho.', type: 'single_choice', opts: [['A', 'lá me'], ['B', 'lá hẹ'], ['C', 'lá nho']], correct: 'C' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép gh + e + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'ghé'], ['B', 'ghẹ'], ['C', 'ghè']], correct: 'A' },
  { text: 'Ghép gh + e + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'ghé'], ['B', 'ghẹ'], ['C', 'ghẻ']], correct: 'B' },
  { text: 'Ghép gh + ê + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'ghế'], ['B', 'ghê'], ['C', 'ghể']], correct: 'A' },
  { text: 'Ghép gh + i được tiếng nào?', type: 'single_choice', opts: [['A', 'ghi'], ['B', 'khi'], ['C', 'gi']], correct: 'A' },
  { text: 'Ghép nh + a + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'nhá'], ['B', 'nhà'], ['C', 'nhả']], correct: 'B' },
  { text: 'Ghép nh + e + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'nhẹ'], ['B', 'nhè'], ['C', 'nhẻ']], correct: 'A' },
  { text: 'Ghép nh + o + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'nhó'], ['B', 'nhỏ'], ['C', 'nhò']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Hà ___ nhà bà.', type: 'single_choice', opts: [['A', 'nhỏ'], ['B', 'ghé'], ['C', 'nhẹ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nhà bà ở ngõ ___.', type: 'single_choice', opts: [['A', 'nhỏ'], ['B', 'ghé'], ['C', 'ghi']], correct: 'A' },
  { text: 'Trong câu "Mẹ nhờ Hà bê ghế nhỏ.", mẹ nhờ Hà làm gì?', type: 'single_choice', opts: [['A', 'Bê chiếc ghế nhỏ'], ['B', 'Quét nhà'], ['C', 'Hái lá nho']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng gh', type: 'multiple_choice', opts: [['A', 'ghé'], ['B', 'ghẹ'], ['C', 'ghế'], ['D', 'nhà'], ['E', 'ghi']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng nh', type: 'multiple_choice', opts: [['A', 'nhà'], ['B', 'nhẹ'], ['C', 'nhỏ'], ['D', 'nhờ'], ['E', 'ghé']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'ghé'], ['B', 'ghế'], ['C', 'ghi'], ['D', 'nhà']], correct: 'D' },
  { text: 'Chọn từ thích hợp cho từng hình: Hình một chiếc ghế bằng đá. Hình một con ghẹ màu đỏ.', type: 'single_choice', opts: [['A', 'ghẹ đỏ – ghế đá'], ['B', 'ghế đá – ghẹ đỏ'], ['C', 'nhà gỗ – lá nho']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: nhà bà – Hà – ghé', type: 'single_choice', opts: [['A', 'Nhà bà Hà ghé.'], ['B', 'Hà ghé nhà bà.'], ['C', 'Ghé Hà nhà bà.']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: ở ngõ nhỏ – Nhà bà', type: 'single_choice', opts: [['A', 'Nhà bà ở ngõ nhỏ.'], ['B', 'Ở ngõ nhỏ nhà bà.'], ['C', 'Ngõ nhỏ ở nhà bà.']], correct: 'A' },
  { text: 'Câu "Mẹ nhờ Hà bê ghế nhỏ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mẹ nhờ Hà bê ghế nhỏ." có bao nhiêu tiếng bắt đầu bằng gh hoặc nh?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Khi được bố mẹ đưa đến gặp cô giáo, lời giới thiệu nào lễ phép nhất?', type: 'single_choice', opts: [['A', 'Cháu chào cô ạ. Cháu tên là Nam. Đây là bố mẹ cháu.'], ['B', 'Cô phải nhớ tên cháu nhé!'], ['C', 'Cháu không muốn giới thiệu đâu.']], correct: 'A' },
  { text: 'Khi mẹ nhờ bê chiếc ghế nhỏ, Hà nên làm gì?', type: 'single_choice', opts: [['A', 'Vui vẻ giúp mẹ và bê ghế cẩn thận'], ['B', 'Giả vờ không nghe thấy'], ['C', 'Ném chiếc ghế xuống sàn']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 18: Gh gh – Nh nh (lesson 732)…');
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
