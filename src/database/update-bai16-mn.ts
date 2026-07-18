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

const LESSON_ID = 730; // chu-cai-m-m-n-n (Bài 16: M m – N n) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "m" viết thường.', type: 'single_choice', opts: [['A', 'n'], ['B', 'm'], ['C', 'h']], correct: 'B' },
  { text: 'Chọn chữ "M" viết hoa.', type: 'single_choice', opts: [['A', 'N'], ['B', 'H'], ['C', 'M']], correct: 'C' },
  { text: 'Chọn chữ "n" viết thường.', type: 'single_choice', opts: [['A', 'm'], ['B', 'n'], ['C', 'u']], correct: 'B' },
  { text: 'Chọn chữ "N" viết hoa.', type: 'single_choice', opts: [['A', 'M'], ['B', 'N'], ['C', 'K']], correct: 'B' },
  { text: 'Chữ M và chữ m có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con cá.', type: 'single_choice', opts: [['A', 'cá mè'], ['B', 'cá cờ'], ['C', 'cá hô']], correct: 'A' },
  { text: 'Chọn từ đúng với hình cành lá me.', type: 'single_choice', opts: [['A', 'lá hẹ'], ['B', 'lá me'], ['C', 'lá đa']], correct: 'B' },
  { text: 'Chọn từ đúng với hình chiếc nơ màu đỏ.', type: 'single_choice', opts: [['A', 'nơ đỏ'], ['B', 'cờ đỏ'], ['C', 'lá đỏ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc ca nô.', type: 'single_choice', opts: [['A', 'ô tô'], ['B', 'ca nô'], ['C', 'xe đạp']], correct: 'B' },
  { text: 'Trong câu "Mẹ mua nơ cho Hà.", mẹ mua gì cho Hà?', type: 'single_choice', opts: [['A', 'Một chiếc nơ'], ['B', 'Một chiếc ô'], ['C', 'Một con cá']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép m + e được tiếng nào?', type: 'single_choice', opts: [['A', 'me'], ['B', 'ne'], ['C', 'ma']], correct: 'A' },
  { text: 'Ghép m + e + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'mè'], ['B', 'mẹ'], ['C', 'mé']], correct: 'B' },
  { text: 'Ghép n + ơ được tiếng nào?', type: 'single_choice', opts: [['A', 'nô'], ['B', 'nơ'], ['C', 'no']], correct: 'B' },
  { text: 'Ghép n + ơ + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'nợ'], ['B', 'nở'], ['C', 'nờ']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ m?', type: 'single_choice', opts: [['A', 'mẹ'], ['B', 'nơ'], ['C', 'nô']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ n?', type: 'single_choice', opts: [['A', 'me'], ['B', 'mè'], ['C', 'nơ']], correct: 'C' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Mẹ mua ___ cho Hà.', type: 'single_choice', opts: [['A', 'nơ'], ['B', 'mè'], ['C', 'me']], correct: 'A' },
  { text: 'Điền từ thích hợp vào chỗ trống: Bố mẹ cho Hà đi ___.', type: 'single_choice', opts: [['A', 'cá mè'], ['B', 'ca nô'], ['C', 'nơ đỏ']], correct: 'B' },
  { text: 'Trong câu "Bố mẹ cho Hà đi ca nô.", ai cho Hà đi ca nô?', type: 'single_choice', opts: [['A', 'Bố mẹ'], ['B', 'Bạn bè'], ['C', 'Cô giáo']], correct: 'A' },
  { text: 'Trong từ "ca nô", tiếng nào có chữ n?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'nô'], ['C', 'Cả hai tiếng']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ m', type: 'multiple_choice', opts: [['A', 'mẹ'], ['B', 'mua'], ['C', 'nơ'], ['D', 'mè'], ['E', 'me']], correct: ['A', 'B', 'D', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ n', type: 'multiple_choice', opts: [['A', 'nơ'], ['B', 'nợ'], ['C', 'nề'], ['D', 'me'], ['E', 'nô']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Muốn đổi tiếng "me" thành tiếng "mẹ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh nặng vào chữ e'], ['B', 'Thêm thanh sắc vào chữ e'], ['C', 'Đổi chữ m thành chữ n']], correct: 'A' },
  { text: 'Muốn đổi tiếng "nơ" thành tiếng "nợ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh hỏi'], ['B', 'Thêm thanh nặng'], ['C', 'Đổi chữ n thành chữ m']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: nơ – Mẹ – cho Hà – mua', type: 'single_choice', opts: [['A', 'Mẹ mua nơ cho Hà.'], ['B', 'Hà mua mẹ cho nơ.'], ['C', 'Nơ cho Hà mua mẹ.']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: cho Hà – Bố mẹ – đi ca nô', type: 'single_choice', opts: [['A', 'Cho Hà bố mẹ đi ca nô.'], ['B', 'Bố mẹ đi ca nô cho Hà.'], ['C', 'Bố mẹ cho Hà đi ca nô.']], correct: 'C' },
  { text: 'Câu "Mẹ mua nơ cho Hà." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mẹ mua nơ cho Hà." có bao nhiêu tiếng bắt đầu bằng chữ m?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu "Bố mẹ cho Hà đi ca nô." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'C' },
  { text: 'Khi làm quen với một người lớn, lời giới thiệu nào lễ phép và đầy đủ nhất?', type: 'single_choice', opts: [['A', 'Cháu chào chú ạ. Cháu tên là Nam, cháu học lớp 1A.'], ['B', 'Cháu là Nam, chú phải nhớ tên cháu nhé!'], ['C', 'Chú tên là gì, nói nhanh đi ạ!']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 16: M m – N n (lesson 730)…');
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
