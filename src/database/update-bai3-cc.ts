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

const LESSON_ID = 717; // chu-c-c (Bài 3: C c) — Tiếng Việt lớp 1

type Q = {
  text: string;
  type: 'single_choice' | 'multiple_choice';
  opts: [string, string][];
  correct: string | string[];
};

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "c" viết thường.', type: 'single_choice', opts: [['A', 'b'], ['B', 'c'], ['C', 'd']], correct: 'B' },
  { text: 'Chọn chữ "C" viết hoa.', type: 'single_choice', opts: [['A', 'C'], ['B', 'O'], ['C', 'G']], correct: 'A' },
  { text: 'Chữ C và chữ c có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Trong tiếng "ca", chữ nào đứng đầu?', type: 'single_choice', opts: [['A', 'a'], ['B', 'c'], ['C', 'n']], correct: 'B' },
  { text: 'Ghép chữ c với chữ a được tiếng nào?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'cà'], ['C', 'cá']], correct: 'A' },
  { text: 'Tiếng nào chỉ con cá?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'cá'], ['C', 'cà']], correct: 'B' },
  { text: 'Tiếng nào chỉ quả cà?', type: 'single_choice', opts: [['A', 'cá'], ['B', 'cà'], ['C', 'ca']], correct: 'B' },
  { text: 'Tiếng nào chỉ cái ca?', type: 'single_choice', opts: [['A', 'cà'], ['B', 'cá'], ['C', 'ca']], correct: 'C' },
  { text: 'Trong câu "Nam và bố câu cá.", ai đi câu cá?', type: 'single_choice', opts: [['A', 'Nam và mẹ'], ['B', 'Nam và bố'], ['C', 'Nam và bà']], correct: 'B' },
  { text: 'Khi nhìn thấy cá dưới hồ, bé nói:', type: 'single_choice', opts: [['A', 'A, cá.'], ['B', 'A, cà.'], ['C', 'A, ca.']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Điền chữ còn thiếu: _a = ca', type: 'single_choice', opts: [['A', 'c'], ['B', 'b'], ['C', 'd']], correct: 'A' },
  { text: 'Điền vào chỗ trống: c + a = ___', type: 'single_choice', opts: [['A', 'cá'], ['B', 'ca'], ['C', 'cà']], correct: 'B' },
  { text: 'Điền vào chỗ trống: c + à = ___', type: 'single_choice', opts: [['A', 'cà'], ['B', 'cá'], ['C', 'ca']], correct: 'A' },
  { text: 'Điền vào chỗ trống: c + á = ___', type: 'single_choice', opts: [['A', 'cà'], ['B', 'cá'], ['C', 'ca']], correct: 'B' },
  { text: 'Tiếng nào không có dấu thanh?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'cà'], ['C', 'cá']], correct: 'A' },
  { text: 'Tiếng nào có dấu huyền?', type: 'single_choice', opts: [['A', 'cá'], ['B', 'ca'], ['C', 'cà']], correct: 'C' },
  { text: 'Tiếng nào có dấu sắc?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'cá'], ['C', 'cà']], correct: 'B' },
  { text: 'Trong từ "cá", có mấy chữ cái?', type: 'single_choice', opts: [['A', '1'], ['B', '2'], ['C', '3']], correct: 'B' },
  { text: 'Trong câu "Nam và bố câu cá.", từ nào có chứa chữ c?', type: 'single_choice', opts: [['A', 'Nam'], ['B', 'câu, cá'], ['C', 'và']], correct: 'B' },
  { text: 'Chọn câu đúng với bức tranh đầu bài.', type: 'single_choice', opts: [['A', 'Nam và bố câu cá.'], ['B', 'Nam và bà hái cà.'], ['C', 'Nam và mẹ uống ca nước.']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ c.', type: 'multiple_choice', opts: [['A', 'ca'], ['B', 'cà'], ['C', 'cá'], ['D', 'ba'], ['E', 'cái']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Từ nào khác nhóm vì không có chữ c?', type: 'single_choice', opts: [['A', 'cá'], ['B', 'cà'], ['C', 'ba'], ['D', 'ca']], correct: 'C' },
  { text: 'Muốn đổi tiếng "ca" thành "cà", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm dấu huyền'], ['B', 'Thêm dấu sắc'], ['C', 'Đổi chữ c thành b']], correct: 'A' },
  { text: 'Muốn đổi tiếng "ca" thành "cá", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm dấu huyền'], ['B', 'Thêm dấu sắc'], ['C', 'Bỏ chữ a']], correct: 'B' },
  { text: 'Sắp xếp các từ sau thành câu đúng: bố – Nam – và – câu cá', type: 'single_choice', opts: [['A', 'Nam và bố câu cá.'], ['B', 'Câu cá Nam và bố.'], ['C', 'Bố cá câu và Nam.']], correct: 'A' },
  { text: 'Điền từ thích hợp vào câu: Nam và bố câu ___.', type: 'single_choice', opts: [['A', 'cà'], ['B', 'cá'], ['C', 'ca']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'nam và bố câu cá.'], ['B', 'Nam và bố câu cá.'], ['C', 'Nam Và Bố Câu Cá.']], correct: 'B' },
  { text: 'Trong câu "Nam và bố câu cá." có bao nhiêu chữ c?', type: 'single_choice', opts: [['A', '1'], ['B', '2'], ['C', '3']], correct: 'B' },
  { text: 'Ở phần Nói – Chào hỏi, bạn nhỏ nên nói gì với bác bảo vệ?', type: 'single_choice', opts: [['A', 'Cháu chào bác ạ.'], ['B', 'Cháu ăn cơm ạ.'], ['C', 'Cháu đi ngủ ạ.']], correct: 'A' },
  { text: 'Khi vào lớp, bạn nhỏ nên nói gì với cô giáo?', type: 'single_choice', opts: [['A', 'Con chào cô ạ.'], ['B', 'Con câu cá ạ.'], ['C', 'Con ăn cà ạ.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 3: C c (lesson 717)…');
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
