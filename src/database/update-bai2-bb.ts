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

const LESSON_ID = 716; // chu-b-b (Bài 2: B b) — Tiếng Việt lớp 1

type Q = {
  text: string;
  type: 'single_choice' | 'multiple_choice';
  opts: [string, string][]; // [key, text]
  correct: string | string[];
};

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Điền chữ còn thiếu: _a = ba', type: 'single_choice', opts: [['A', 'b'], ['B', 'd'], ['C', 'p']], correct: 'A' },
  { text: 'Điền chữ còn thiếu: b + ___ = ba', type: 'single_choice', opts: [['A', 'à'], ['B', 'a'], ['C', 'e']], correct: 'B' },
  { text: 'Điền tiếng còn thiếu: b + à = ___', type: 'single_choice', opts: [['A', 'ba'], ['B', 'bà'], ['C', 'bé']], correct: 'B' },
  { text: 'Tiếng "bà" có dấu thanh gì?', type: 'single_choice', opts: [['A', 'Dấu sắc'], ['B', 'Dấu huyền'], ['C', 'Không có dấu thanh']], correct: 'B' },
  { text: 'Tiếng nào không có dấu thanh?', type: 'single_choice', opts: [['A', 'ba'], ['B', 'bà'], ['C', 'bé']], correct: 'A' },
  { text: 'Tiếng nào có dấu huyền?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'ba'], ['C', 'bà']], correct: 'C' },
  { text: 'Trong từ "ba ba" có bao nhiêu chữ b?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'B' },
  { text: 'Trong từ "búp bê" có bao nhiêu chữ b?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'B' },
  { text: 'Đọc câu "Bà cho bé búp bê." — Ai cho bé búp bê?', type: 'single_choice', opts: [['A', 'Ba'], ['B', 'Bà'], ['C', 'Bé']], correct: 'B' },
  { text: 'Chọn câu phù hợp với hình ảnh: Bà đang đưa búp bê cho bé.', type: 'single_choice', opts: [['A', 'Bà cho bé búp bê.'], ['B', 'Bé cho bà búp bê.'], ['C', 'Ba cho bà ba ba.']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các từ có chứa chữ b', type: 'multiple_choice', opts: [['A', 'ba'], ['B', 'bà'], ['C', 'a'], ['D', 'bé'], ['E', 'ba ba']], correct: ['A', 'B', 'D', 'E'] },
  { text: 'Từ nào khác với các từ còn lại vì không có chữ b?', type: 'single_choice', opts: [['A', 'bà'], ['B', 'ba ba'], ['C', 'a'], ['D', 'bé']], correct: 'C' },
  { text: 'Muốn đổi tiếng "ba" thành tiếng "bà", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm dấu huyền trên chữ a'], ['B', 'Thêm dấu sắc trên chữ a'], ['C', 'Bỏ chữ b']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: bé – Bà – búp bê – cho', type: 'single_choice', opts: [['A', 'Bé cho bà búp bê.'], ['B', 'Bà cho bé búp bê.'], ['C', 'Búp bê cho bà bé.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'bà cho bé búp bê.'], ['B', 'Bà cho bé búp bê.'], ['C', 'Bà Cho Bé Búp Bê.']], correct: 'B' },
  { text: 'Điền từ còn thiếu vào câu: Bà cho bé ___ ___.', type: 'single_choice', opts: [['A', 'ba ba'], ['B', 'búp bê'], ['C', 'ba bà']], correct: 'B' },
  { text: 'Trong câu "Bà cho bé búp bê.", chữ B viết hoa nằm ở đâu?', type: 'single_choice', opts: [['A', 'Ở đầu câu'], ['B', 'Ở giữa câu'], ['C', 'Ở cuối câu']], correct: 'A' },
  { text: 'Trong câu "Bà cho bé búp bê." có bao nhiêu chữ B, b?', type: 'single_choice', opts: [['A', '3 chữ: 1 chữ hoa và 2 chữ thường'], ['B', '4 chữ: 1 chữ hoa và 3 chữ thường'], ['C', '4 chữ: 2 chữ hoa và 2 chữ thường']], correct: 'B' },
  { text: 'Quan sát tranh: Bé chạy ra cửa và gọi "A, bà." — Bé đang chạy ra đón ai?', type: 'single_choice', opts: [['A', 'Ba'], ['B', 'Bà'], ['C', 'Bạn']], correct: 'B' },
  { text: 'Trong tên con vật "ba ba", tiếng nào được lặp lại hai lần?', type: 'single_choice', opts: [['A', 'Tiếng bà'], ['B', 'Tiếng ba'], ['C', 'Tiếng bé']], correct: 'B' },
];

async function updateExercise(exerciseNumber: number, qs: Q[]) {
  const rows: { id: number }[] = await ds.query(
    'SELECT id FROM quizzes WHERE lessonId = ? AND exerciseNumber = ? ORDER BY sortOrder ASC, id ASC',
    [LESSON_ID, exerciseNumber],
  );
  console.log(`  exercise ${exerciseNumber}: ${rows.length} câu hiện có, ${qs.length} câu mới`);
  if (rows.length !== qs.length) {
    console.warn(`  ⚠ Số câu không khớp (${rows.length} ≠ ${qs.length}). Cập nhật tối đa ${Math.min(rows.length, qs.length)} câu theo thứ tự.`);
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
  console.log('Cập nhật quiz Bài 2: B b (lesson 716)…');
  await updateExercise(2, MEDIUM); // Trung bình
  await updateExercise(3, HARD); // Khó / Nâng cao
  await ds.destroy();
  console.log('HOÀN TẤT ✅');
}

main().catch((e) => {
  console.error('LỖI:', e);
  process.exit(1);
});
