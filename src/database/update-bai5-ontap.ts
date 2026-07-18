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

const LESSON_ID = 719; // on-tap-va-ke-chuyen-1 (Bài 5: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "a" viết thường.', type: 'single_choice', opts: [['A', 'a'], ['B', 'e'], ['C', 'c']], correct: 'A' },
  { text: 'Chọn chữ "B" viết hoa.', type: 'single_choice', opts: [['A', 'b'], ['B', 'B'], ['C', 'C']], correct: 'B' },
  { text: 'Chọn chữ "c" viết thường.', type: 'single_choice', opts: [['A', 'C'], ['B', 'e'], ['C', 'c']], correct: 'C' },
  { text: 'Chữ nào có dấu mũ ở phía trên?', type: 'single_choice', opts: [['A', 'e'], ['B', 'ê'], ['C', 'a']], correct: 'B' },
  { text: 'Chữ E và chữ e có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Ghép chữ b với chữ a được tiếng nào?', type: 'single_choice', opts: [['A', 'ba'], ['B', 'be'], ['C', 'ca']], correct: 'A' },
  { text: 'Tiếng nào chỉ người bố?', type: 'single_choice', opts: [['A', 'bà'], ['B', 'ba'], ['C', 'bé']], correct: 'B' },
  { text: 'Tiếng nào chỉ một em nhỏ?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'cá']], correct: 'A' },
  { text: 'Tiếng nào phù hợp với hình con cá?', type: 'single_choice', opts: [['A', 'cà'], ['B', 'cá'], ['C', 'ca']], correct: 'B' },
  { text: 'Trong câu "Bà bế bé.", ai bế bé?', type: 'single_choice', opts: [['A', 'Ba'], ['B', 'Bà'], ['C', 'Bạn']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Điền tiếng còn thiếu: b + a = ___', type: 'single_choice', opts: [['A', 'ba'], ['B', 'ca'], ['C', 'be']], correct: 'A' },
  { text: 'Ghép chữ b với chữ e được tiếng nào?', type: 'single_choice', opts: [['A', 'bê'], ['B', 'be'], ['C', 'ba']], correct: 'B' },
  { text: 'Ghép chữ b với chữ ê được tiếng nào?', type: 'single_choice', opts: [['A', 'be'], ['B', 'bê'], ['C', 'bé']], correct: 'B' },
  { text: 'Ghép chữ c với chữ a được tiếng nào?', type: 'single_choice', opts: [['A', 'ca'], ['B', 'cá'], ['C', 'ba']], correct: 'A' },
  { text: 'Thêm dấu sắc vào tiếng "be" được tiếng nào?', type: 'single_choice', opts: [['A', 'bè'], ['B', 'bé'], ['C', 'bế']], correct: 'B' },
  { text: 'Thêm dấu huyền vào tiếng "be" được tiếng nào?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bê']], correct: 'B' },
  { text: 'Thêm dấu sắc vào tiếng "bê" được tiếng nào?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bế']], correct: 'C' },
  { text: 'Điền từ thích hợp vào câu: Bà ___ bé.', type: 'single_choice', opts: [['A', 'cá'], ['B', 'bế'], ['C', 'bè']], correct: 'B' },
  { text: 'Số nào đứng sau số 7?', type: 'single_choice', opts: [['A', '6'], ['B', '8'], ['C', '9']], correct: 'B' },
  { text: 'Trong tranh thứ nhất của câu chuyện, búp bê đang làm gì?', type: 'single_choice', opts: [['A', 'Quét nhà'], ['B', 'Ngủ'], ['C', 'Câu cá']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ b', type: 'multiple_choice', opts: [['A', 'ba'], ['B', 'be'], ['C', 'cá'], ['D', 'bè'], ['E', 'bế']], correct: ['A', 'B', 'D', 'E'] },
  { text: 'Tiếng nào bắt đầu bằng chữ c?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'cá'], ['C', 'bà']], correct: 'B' },
  { text: 'Tiếng nào có chứa chữ ê?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bế']], correct: 'C' },
  { text: 'Sắp xếp các từ thành câu đúng: bé – Bà – bế', type: 'single_choice', opts: [['A', 'Bé bà bế.'], ['B', 'Bà bế bé.'], ['C', 'Bế bé bà.']], correct: 'B' },
  { text: 'Trong câu "Bà bế bé." có bao nhiêu chữ B, b?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'C' },
  { text: 'Trong câu "Bà bế bé." có bao nhiêu chữ ê?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'A' },
  { text: 'Vì sao dế mèn hát tặng búp bê?', type: 'single_choice', opts: [['A', 'Vì búp bê chăm chỉ làm việc'], ['B', 'Vì búp bê đang ngủ'], ['C', 'Vì búp bê đi câu cá']], correct: 'A' },
  { text: 'Búp bê cảm thấy thế nào khi nghe dế mèn hát?', type: 'single_choice', opts: [['A', 'Vui vẻ'], ['B', 'Tức giận'], ['C', 'Sợ hãi']], correct: 'A' },
  { text: 'Sắp xếp các sự việc theo đúng trình tự câu chuyện: (1) Dế mèn hát tặng búp bê. (2) Búp bê vui vẻ nghe dế mèn hát. (3) Búp bê chăm chỉ quét nhà.', type: 'single_choice', opts: [['A', '1 – 2 – 3'], ['B', '3 – 1 – 2'], ['C', '2 – 3 – 1']], correct: 'B' },
  { text: 'Câu chuyện "Búp bê và dế mèn" nhắc em điều gì?', type: 'single_choice', opts: [['A', 'Nên chăm chỉ làm việc và biết đem niềm vui đến cho người khác'], ['B', 'Không nên giúp đỡ mọi người'], ['C', 'Chỉ nên vui chơi, không cần làm việc']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 5: Ôn tập và kể chuyện (lesson 719)…');
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
