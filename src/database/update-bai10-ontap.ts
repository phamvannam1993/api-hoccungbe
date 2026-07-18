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

const LESSON_ID = 724; // on-tap-va-ke-chuyen-2 (Bài 10: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "d" viết thường.', type: 'single_choice', opts: [['A', 'b'], ['B', 'd'], ['C', 'đ']], correct: 'B' },
  { text: 'Chọn chữ "đ" viết thường.', type: 'single_choice', opts: [['A', 'đ'], ['B', 'd'], ['C', 'q']], correct: 'A' },
  { text: 'Chọn chữ "o" viết thường.', type: 'single_choice', opts: [['A', 'ô'], ['B', 'ơ'], ['C', 'o']], correct: 'C' },
  { text: 'Chữ nào có dấu mũ ở phía trên?', type: 'single_choice', opts: [['A', 'o'], ['B', 'ô'], ['C', 'ơ']], correct: 'B' },
  { text: 'Chữ nào có thêm nét râu?', type: 'single_choice', opts: [['A', 'ơ'], ['B', 'ô'], ['C', 'o']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con cá cờ.', type: 'single_choice', opts: [['A', 'cá cò'], ['B', 'cá cờ'], ['C', 'cá cỏ']], correct: 'B' },
  { text: 'Chọn từ chỉ lá cờ màu đỏ.', type: 'single_choice', opts: [['A', 'cờ đỏ'], ['B', 'cờ đỗ'], ['C', 'bờ đỏ']], correct: 'A' },
  { text: 'Chọn từ chỉ loại hạt màu đỏ.', type: 'single_choice', opts: [['A', 'dỗ đỏ'], ['B', 'đỗ đỏ'], ['C', 'đỡ đỏ']], correct: 'B' },
  { text: 'Trong câu "Bờ đê có dế.", bờ đê có con gì?', type: 'single_choice', opts: [['A', 'Con cá'], ['B', 'Con dế'], ['C', 'Con cò']], correct: 'B' },
  { text: 'Trong câu "Bà có đỗ đỏ.", bà có gì?', type: 'single_choice', opts: [['A', 'Đỗ đỏ'], ['B', 'Cờ đỏ'], ['C', 'Cá cờ']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép d + o được tiếng nào?', type: 'single_choice', opts: [['A', 'do'], ['B', 'đo'], ['C', 'đô']], correct: 'A' },
  { text: 'Ghép đ + o được tiếng nào?', type: 'single_choice', opts: [['A', 'do'], ['B', 'đơ'], ['C', 'đo']], correct: 'C' },
  { text: 'Ghép đ + ô được tiếng nào?', type: 'single_choice', opts: [['A', 'đô'], ['B', 'đo'], ['C', 'đơ']], correct: 'A' },
  { text: 'Ghép d + ơ được tiếng nào?', type: 'single_choice', opts: [['A', 'dô'], ['B', 'dơ'], ['C', 'đơ']], correct: 'B' },
  { text: 'Từ nào bắt đầu bằng chữ d?', type: 'single_choice', opts: [['A', 'đỡ bà'], ['B', 'dỗ bé'], ['C', 'đỗ đỏ']], correct: 'B' },
  { text: 'Từ nào bắt đầu bằng chữ đ?', type: 'single_choice', opts: [['A', 'dỗ bé'], ['B', 'dế'], ['C', 'đỡ bà']], correct: 'C' },
  { text: 'Điền từ còn thiếu: Bờ ___ có dế.', type: 'single_choice', opts: [['A', 'đê'], ['B', 'dê'], ['C', 'đỏ']], correct: 'A' },
  { text: 'Điền từ còn thiếu: Bà có ___ đỏ.', type: 'single_choice', opts: [['A', 'dỗ'], ['B', 'đỗ'], ['C', 'đỡ']], correct: 'B' },
  { text: 'Chọn đúng các từ để hoàn thành hai câu: "Mẹ ___ bé ngủ." và "Bạn nhỏ ___ bà đứng dậy."', type: 'single_choice', opts: [['A', 'đỡ – dỗ'], ['B', 'dỗ – đỡ'], ['C', 'đỗ – dỗ']], correct: 'B' },
  { text: 'Câu "Bà có đỗ đỏ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ ơ', type: 'multiple_choice', opts: [['A', 'bờ'], ['B', 'cờ'], ['C', 'đỡ'], ['D', 'bố'], ['E', 'đỗ']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng có chứa chữ ô', type: 'multiple_choice', opts: [['A', 'bố'], ['B', 'cô'], ['C', 'đỗ'], ['D', 'đỏ'], ['E', 'cờ']], correct: ['A', 'B', 'C'] },
  { text: 'Nhóm nào chỉ gồm các tiếng bắt đầu bằng chữ đ?', type: 'single_choice', opts: [['A', 'đê, đỗ, đỏ'], ['B', 'dế, dỗ, do'], ['C', 'đê, dế, đỏ']], correct: 'A' },
  { text: 'Muốn đổi tiếng "dỗ" thành tiếng "đỗ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm nét gạch ngang vào chữ d để được chữ đ'], ['B', 'Đổi chữ ô thành chữ ơ'], ['C', 'Bỏ thanh ngã']], correct: 'A' },
  { text: 'Trong cụm từ "đỗ đỏ", nhận xét nào đúng?', type: 'single_choice', opts: [['A', 'Tiếng đỗ có chữ ô, tiếng đỏ có chữ o'], ['B', 'Cả hai tiếng đều có chữ ô'], ['C', 'Cả hai tiếng đều có chữ ơ']], correct: 'A' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'bờ đê có dế.'], ['B', 'Bờ đê có dế.'], ['C', 'Bờ Đê Có Dế.']], correct: 'B' },
  { text: 'Trong câu chuyện, bà kiến sống ở đâu?', type: 'single_choice', opts: [['A', 'Trong hốc dưới gốc cây'], ['B', 'Trong tổ chim trên cây'], ['C', 'Trong một bể cá']], correct: 'A' },
  { text: 'Đàn kiến con dùng vật gì để khiêng bà kiến?', type: 'single_choice', opts: [['A', 'Một chiếc lá'], ['B', 'Một cành cây'], ['C', 'Một viên đá']], correct: 'A' },
  { text: 'Sắp xếp các sự việc theo đúng trình tự câu chuyện: (1) Đàn kiến con dùng lá khiêng bà kiến. (2) Bà kiến sống trong một hốc dưới gốc cây. (3) Bà kiến được đưa đến nơi ở mới. (4) Bà kiến vui vẻ cảm ơn đàn kiến con.', type: 'single_choice', opts: [['A', '1 – 2 – 4 – 3'], ['B', '2 – 1 – 3 – 4'], ['C', '2 – 3 – 1 – 4']], correct: 'B' },
  { text: 'Câu chuyện "Đàn kiến con ngoan ngoãn" nhắc em điều gì?', type: 'single_choice', opts: [['A', 'Biết quan tâm, lễ phép và giúp đỡ người lớn tuổi'], ['B', 'Chỉ cần quan tâm đến bản thân'], ['C', 'Không nên làm việc cùng các bạn']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 10: Ôn tập và kể chuyện (lesson 724)…');
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
