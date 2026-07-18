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

const LESSON_ID = 718; // chu-cai-e-e-e-e (Bài 4: E e – Ê ê) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "e" viết thường.', type: 'single_choice', opts: [['A', 'a'], ['B', 'e'], ['C', 'o']], correct: 'B' },
  { text: 'Chọn chữ "ê" viết thường.', type: 'single_choice', opts: [['A', 'ê'], ['B', 'e'], ['C', 'i']], correct: 'A' },
  { text: 'Chọn chữ "E" viết hoa.', type: 'single_choice', opts: [['A', 'F'], ['B', 'E'], ['C', 'B']], correct: 'B' },
  { text: 'Chọn chữ "Ê" viết hoa.', type: 'single_choice', opts: [['A', 'Ê'], ['B', 'E'], ['C', 'A']], correct: 'A' },
  { text: 'Chữ e và chữ ê có giống hệt nhau không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'B' },
  { text: 'Tiếng nào chỉ chiếc bè?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bế']], correct: 'B' },
  { text: 'Tiếng nào chỉ em bé?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bế']], correct: 'A' },
  { text: 'Tiếng nào chỉ hành động ẵm, ôm em bé lên tay?', type: 'single_choice', opts: [['A', 'bè'], ['B', 'bé'], ['C', 'bế']], correct: 'C' },
  { text: 'Trong câu "Bà bế bé.", ai đang bế bé?', type: 'single_choice', opts: [['A', 'Mẹ'], ['B', 'Bà'], ['C', 'Bé']], correct: 'B' },
  { text: 'Trong câu "Bé kể mẹ nghe về bạn bè.", bạn nhỏ đang kể cho ai nghe?', type: 'single_choice', opts: [['A', 'Bà'], ['B', 'Bạn'], ['C', 'Mẹ']], correct: 'C' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Điền chữ còn thiếu: b_ = bé', type: 'single_choice', opts: [['A', 'e'], ['B', 'ê'], ['C', 'a']], correct: 'B' },
  { text: 'Điền chữ còn thiếu: b_ = bè', type: 'single_choice', opts: [['A', 'e'], ['B', 'ê'], ['C', 'o']], correct: 'A' },
  { text: 'Ghép b + e + huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'bế']], correct: 'B' },
  { text: 'Ghép b + ê + sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'bế'], ['B', 'bé'], ['C', 'bè']], correct: 'A' },
  { text: 'Tiếng nào có chữ ê?', type: 'single_choice', opts: [['A', 'bè'], ['B', 'bế'], ['C', 'be']], correct: 'B' },
  { text: 'Tiếng nào có dấu huyền?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bế'], ['C', 'bè']], correct: 'C' },
  { text: 'Tiếng nào có dấu sắc?', type: 'single_choice', opts: [['A', 'bé'], ['B', 'bè'], ['C', 'be']], correct: 'A' },
  { text: 'Trong từ "bạn bè", tiếng nào có chữ e?', type: 'single_choice', opts: [['A', 'bạn'], ['B', 'bè'], ['C', 'cả hai tiếng']], correct: 'B' },
  { text: 'Chọn câu đúng với tranh: một bạn nhỏ đang kể chuyện cho mẹ nghe.', type: 'single_choice', opts: [['A', 'Bé kể mẹ nghe về bạn bè.'], ['B', 'Bà bế bé.'], ['C', 'Bé đang ngủ.']], correct: 'A' },
  { text: 'Chọn câu đúng với tranh: bà đang ôm em bé trên tay.', type: 'single_choice', opts: [['A', 'Bé kể mẹ nghe.'], ['B', 'Bà bế bé.'], ['C', 'Bè ở trên sông.']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ e hoặc ê.', type: 'multiple_choice', opts: [['A', 'bè'], ['B', 'bé'], ['C', 'bế'], ['D', 'ba'], ['E', 'mẹ']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Từ nào không có chữ e hoặc ê?', type: 'single_choice', opts: [['A', 'bè'], ['B', 'bé'], ['C', 'ba'], ['D', 'mẹ']], correct: 'C' },
  { text: 'Muốn đổi tiếng "bé" thành "bè", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi dấu sắc thành dấu huyền'], ['B', 'Bỏ chữ b'], ['C', 'Thêm chữ a']], correct: 'A' },
  { text: 'Muốn đổi tiếng "bé" thành "bế", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi chữ e thành chữ ê'], ['B', 'Đổi dấu sắc thành dấu huyền'], ['C', 'Bỏ dấu sắc']], correct: 'A' },
  { text: 'Sắp xếp các từ sau thành câu đúng: mẹ – nghe – kể – Bé', type: 'single_choice', opts: [['A', 'Mẹ kể bé nghe.'], ['B', 'Bé kể mẹ nghe.'], ['C', 'Nghe mẹ bé kể.']], correct: 'B' },
  { text: 'Sắp xếp các từ sau thành câu đúng: bé – bế – Bà', type: 'single_choice', opts: [['A', 'Bé bà bế.'], ['B', 'Bà bế bé.'], ['C', 'Bế bà bé.']], correct: 'B' },
  { text: 'Điền từ thích hợp vào chỗ trống: Bé kể mẹ nghe về bạn ____.', type: 'single_choice', opts: [['A', 'bè'], ['B', 'bé'], ['C', 'bế']], correct: 'A' },
  { text: 'Trong câu "Bà bế bé." có bao nhiêu tiếng chứa chữ ê?', type: 'single_choice', opts: [['A', '1'], ['B', '2'], ['C', '3']], correct: 'B' },
  { text: 'Trong chủ đề "Trên sân trường", khi gặp bạn em nên nói gì?', type: 'single_choice', opts: [['A', 'Chào bạn!'], ['B', 'Cho mình mượn bút!'], ['C', 'Mình đi về đây!']], correct: 'A' },
  { text: 'Quan sát tranh sân trường, hoạt động nào phù hợp nhất?', type: 'single_choice', opts: [['A', 'Các bạn đang học ở bếp.'], ['B', 'Các bạn đang vui chơi trên sân trường.'], ['C', 'Các bạn đang đi câu cá.']], correct: 'B' },
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
  console.log('Cập nhật quiz Bài 4: E e – Ê ê (lesson 718)…');
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
