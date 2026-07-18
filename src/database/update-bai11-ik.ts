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

const LESSON_ID = 725; // chu-i-i-k-k (Bài 11: I i – K k) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "i" viết thường.', type: 'single_choice', opts: [['A', 'l'], ['B', 'i'], ['C', 't']], correct: 'B' },
  { text: 'Chọn chữ "I" viết hoa.', type: 'single_choice', opts: [['A', 'I'], ['B', 'K'], ['C', 'L']], correct: 'A' },
  { text: 'Chọn chữ "k" viết thường.', type: 'single_choice', opts: [['A', 'h'], ['B', 'k'], ['C', 'b']], correct: 'B' },
  { text: 'Chọn chữ "K" viết hoa.', type: 'single_choice', opts: [['A', 'H'], ['B', 'X'], ['C', 'K']], correct: 'C' },
  { text: 'Chữ I và chữ i có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chọn từ đúng với hình quả bí.', type: 'single_choice', opts: [['A', 'bí đỏ'], ['B', 'cá đỏ'], ['C', 'đỗ đỏ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình bàn tay đang dùng thước kẻ.', type: 'single_choice', opts: [['A', 'đi đò'], ['B', 'kẻ ô'], ['C', 'kì đà']], correct: 'B' },
  { text: 'Chọn từ đúng với hình mọi người ngồi trên thuyền.', type: 'single_choice', opts: [['A', 'đi đò'], ['B', 'kẻ ô'], ['C', 'bí đỏ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con kì đà.', type: 'single_choice', opts: [['A', 'cá cờ'], ['B', 'kì đà'], ['C', 'con cò']], correct: 'B' },
  { text: 'Trong câu "Nam vẽ kì đà.", Nam vẽ con gì?', type: 'single_choice', opts: [['A', 'Con cá'], ['B', 'Con cò'], ['C', 'Con kì đà']], correct: 'C' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép k + i được tiếng nào?', type: 'single_choice', opts: [['A', 'ki'], ['B', 'ik'], ['C', 'ke']], correct: 'A' },
  { text: 'Ghép k + e + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'kẻ'], ['B', 'kè'], ['C', 'kệ']], correct: 'B' },
  { text: 'Ghép k + e + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'kẻ'], ['B', 'kè'], ['C', 'ké']], correct: 'A' },
  { text: 'Ghép k + ê + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'kể'], ['B', 'kè'], ['C', 'kệ']], correct: 'C' },
  { text: 'Ghép k + i + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'kỉ'], ['B', 'kì'], ['C', 'kĩ']], correct: 'B' },
  { text: 'Ghép k + i + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'kỉ'], ['B', 'kì'], ['C', 'kí']], correct: 'A' },
  { text: 'Ghép k + i + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'kì'], ['B', 'kỉ'], ['C', 'kĩ']], correct: 'C' },
  { text: 'Điền từ thích hợp vào chỗ trống: Nam vẽ ___ đà.', type: 'single_choice', opts: [['A', 'kì'], ['B', 'kẻ'], ['C', 'kè']], correct: 'A' },
  { text: 'Kì đà bò ở đâu?', type: 'single_choice', opts: [['A', 'Ở bờ đê'], ['B', 'Ở kẽ đá'], ['C', 'Ở trên đò']], correct: 'B' },
  { text: 'Từ nào có tiếng chứa chữ i?', type: 'single_choice', opts: [['A', 'bí đỏ'], ['B', 'kẻ ô'], ['C', 'đỡ bé']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ k', type: 'multiple_choice', opts: [['A', 'kè'], ['B', 'kẻ'], ['C', 'kệ'], ['D', 'bí'], ['E', 'kì']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các từ có chứa chữ i', type: 'multiple_choice', opts: [['A', 'bí đỏ'], ['B', 'đi đò'], ['C', 'kì đà'], ['D', 'kẻ ô'], ['E', 'bờ đê']], correct: ['A', 'B', 'C'] },
  { text: 'Muốn đổi tiếng "ki" thành tiếng "kì", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh huyền'], ['B', 'Thêm thanh hỏi'], ['C', 'Đổi chữ i thành e']], correct: 'A' },
  { text: 'Muốn đổi tiếng "kì" thành tiếng "kỉ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh huyền thành thanh hỏi'], ['B', 'Đổi thanh huyền thành thanh ngã'], ['C', 'Bỏ chữ k']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: vẽ – Nam – kì đà', type: 'single_choice', opts: [['A', 'Vẽ Nam kì đà.'], ['B', 'Nam kì đà vẽ.'], ['C', 'Nam vẽ kì đà.']], correct: 'C' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: ở kẽ đá – Kì đà – bò', type: 'single_choice', opts: [['A', 'Kì đà bò ở kẽ đá.'], ['B', 'Ở kẽ đá bò kì đà.'], ['C', 'Bò kì đà ở kẽ đá.']], correct: 'A' },
  { text: 'Câu "Kì đà bò ở kẽ đá." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Kì đà bò ở kẽ đá." có bao nhiêu chữ K, k?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'B' },
  { text: 'Khi làm quen với một bạn mới, em nên nói gì?', type: 'single_choice', opts: [['A', 'Chào bạn, mình tên là Nam.'], ['B', 'Bạn đi chỗ khác đi.'], ['C', 'Mình không nói chuyện đâu.']], correct: 'A' },
  { text: 'Lời giới thiệu nào đầy đủ và lễ phép nhất?', type: 'single_choice', opts: [['A', 'Tên mình là An.'], ['B', 'Chào bạn, mình tên là An. Mình học lớp 1A. Rất vui được làm quen với bạn.'], ['C', 'Bạn phải nhớ tên mình nhé.']], correct: 'B' },
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
  console.log('Cập nhật quiz Bài 11: I i – K k (lesson 725)…');
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
