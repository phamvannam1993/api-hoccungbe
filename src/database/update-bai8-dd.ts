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

const LESSON_ID = 722; // chu-cai-d-d-dd-d (Bài 8: D d – Đ đ) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "d" viết thường.', type: 'single_choice', opts: [['A', 'd'], ['B', 'đ'], ['C', 'b']], correct: 'A' },
  { text: 'Chọn chữ "đ" viết thường.', type: 'single_choice', opts: [['A', 'd'], ['B', 'đ'], ['C', 'q']], correct: 'B' },
  { text: 'Chọn chữ "D" viết hoa.', type: 'single_choice', opts: [['A', 'D'], ['B', 'Đ'], ['C', 'B']], correct: 'A' },
  { text: 'Chọn chữ "Đ" viết hoa.', type: 'single_choice', opts: [['A', 'O'], ['B', 'D'], ['C', 'Đ']], correct: 'C' },
  { text: 'Điểm khác nhau dễ thấy nhất giữa chữ d và chữ đ là gì?', type: 'single_choice', opts: [['A', 'Chữ đ có thêm một nét gạch ngang'], ['B', 'Chữ d có thêm dấu sắc'], ['C', 'Chữ đ có thêm dấu mũ']], correct: 'A' },
  { text: 'Từ nào đúng với hình cái ô màu đỏ?', type: 'single_choice', opts: [['A', 'ô đỏ'], ['B', 'ô đa'], ['C', 'ô da']], correct: 'A' },
  { text: 'Từ nào đúng với hình con dế?', type: 'single_choice', opts: [['A', 'dế'], ['B', 'đá'], ['C', 'da']], correct: 'A' },
  { text: 'Từ nào đúng với hình cây đa?', type: 'single_choice', opts: [['A', 'đa'], ['B', 'da'], ['C', 'dỏ']], correct: 'A' },
  { text: 'Trong câu "Bé có ô đỏ.", bé có gì?', type: 'single_choice', opts: [['A', 'Ô đỏ'], ['B', 'Con dế'], ['C', 'Cây đa']], correct: 'A' },
  { text: 'Trong câu "Dưới gốc đa, các bạn chơi dung dăng dung dẻ.", các bạn đang làm gì?', type: 'single_choice', opts: [['A', 'Chơi dung dăng dung dẻ'], ['B', 'Câu cá'], ['C', 'Đọc sách']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép d + a được tiếng nào?', type: 'single_choice', opts: [['A', 'đa'], ['B', 'da'], ['C', 'đá']], correct: 'B' },
  { text: 'Ghép đ + a được tiếng nào?', type: 'single_choice', opts: [['A', 'đa'], ['B', 'da'], ['C', 'đà']], correct: 'A' },
  { text: 'Ghép đ + a + dấu sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'đa'], ['B', 'đá'], ['C', 'dã']], correct: 'B' },
  { text: 'Tiếng nào có chứa chữ đ?', type: 'single_choice', opts: [['A', 'da'], ['B', 'đa'], ['C', 'dế']], correct: 'B' },
  { text: 'Tiếng nào có chứa chữ d?', type: 'single_choice', opts: [['A', 'dế'], ['B', 'đỏ'], ['C', 'đá']], correct: 'A' },
  { text: 'Từ nào có màu sắc?', type: 'single_choice', opts: [['A', 'đa'], ['B', 'đỏ'], ['C', 'dế']], correct: 'B' },
  { text: 'Điền từ thích hợp vào chỗ trống: Bé có ô ___.', type: 'single_choice', opts: [['A', 'dế'], ['B', 'đỏ'], ['C', 'đa']], correct: 'B' },
  { text: 'Điền từ thích hợp vào chỗ trống: Dưới gốc ___, các bạn chơi dung dăng dung dẻ.', type: 'single_choice', opts: [['A', 'da'], ['B', 'đa'], ['C', 'dế']], correct: 'B' },
  { text: 'Trong cụm từ "ô đỏ", tiếng nào có chữ đ?', type: 'single_choice', opts: [['A', 'ô'], ['B', 'đỏ'], ['C', 'cả hai tiếng']], correct: 'B' },
  { text: 'Trong cụm từ "đá dế", từ nào đứng trước?', type: 'single_choice', opts: [['A', 'đá'], ['B', 'dế'], ['C', 'đỏ']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chữ d', type: 'multiple_choice', opts: [['A', 'da'], ['B', 'dế'], ['C', 'đa'], ['D', 'đỏ'], ['E', 'dung']], correct: ['A', 'B', 'E'] },
  { text: 'Chọn tất cả các tiếng có chữ đ', type: 'multiple_choice', opts: [['A', 'đa'], ['B', 'đá'], ['C', 'đỏ'], ['D', 'dế'], ['E', 'dung']], correct: ['A', 'B', 'C'] },
  { text: 'Muốn đổi tiếng "da" thành "đa", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm nét gạch ngang để chữ d thành đ'], ['B', 'Thêm dấu sắc'], ['C', 'Đổi chữ a thành o']], correct: 'A' },
  { text: 'Muốn đổi tiếng "đa" thành "đá", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm dấu sắc trên chữ a'], ['B', 'Bỏ nét gạch ngang'], ['C', 'Đổi chữ đ thành d']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: ô đỏ – có – Bé', type: 'single_choice', opts: [['A', 'Ô đỏ bé có.'], ['B', 'Bé có ô đỏ.'], ['C', 'Có bé ô đỏ.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'bé có ô đỏ.'], ['B', 'Bé có ô đỏ.'], ['C', 'Bé Có Ô Đỏ.']], correct: 'B' },
  { text: 'Trong câu "Bé có ô đỏ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong câu "Bé có ô đỏ." có bao nhiêu tiếng chứa chữ đ?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'A' },
  { text: 'Khi gặp người lớn, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cháu chào bác ạ.'], ['B', 'Cháu đi chơi đây.'], ['C', 'Cháu không chào đâu.']], correct: 'A' },
  { text: 'Quan sát tranh chào hỏi, việc làm nào là đúng?', type: 'single_choice', opts: [['A', 'Bé lễ phép chào người lớn'], ['B', 'Bé quay lưng bỏ đi'], ['C', 'Bé không nói gì khi gặp người lớn']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 8: D d – Đ đ (lesson 722)…');
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
