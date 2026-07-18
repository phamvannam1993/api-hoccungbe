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

const LESSON_ID = 755; // van-ui-ui (Bài 41: Vần ui, ưi) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ui, ưi'], ['B', 'oi, ôi'], ['C', 'ai, ay']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ui?', type: 'single_choice', opts: [['A', 'gửi'], ['B', 'núi'], ['C', 'cửi']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ưi?', type: 'single_choice', opts: [['A', 'túi'], ['B', 'mũi'], ['C', 'gửi']], correct: 'C' },
  { text: 'Tiếng "mũi" chứa vần nào?', type: 'single_choice', opts: [['A', 'ui'], ['B', 'ưi'], ['C', 'oi']], correct: 'A' },
  { text: 'Quan sát hình những ngọn núi nối tiếp nhau. Chọn tên đúng của hình.', type: 'single_choice', opts: [['A', 'Bụi cỏ'], ['B', 'Dãy núi'], ['C', 'Cánh đồng']], correct: 'B' },
  { text: 'Đám cỏ mọc thành cụm trong bài được gọi là gì?', type: 'single_choice', opts: [['A', 'Bụi cỏ'], ['B', 'Dãy núi'], ['C', 'Vườn hoa']], correct: 'A' },
  { text: 'Bạn nhỏ đang bỏ thư vào hòm thư. Bạn đang làm gì?', type: 'single_choice', opts: [['A', 'Đọc thư'], ['B', 'Viết bài'], ['C', 'Gửi thư']], correct: 'C' },
  { text: 'Trong câu "Bà gửi cho Hà túi kẹo", bà gửi cho Hà thứ gì?', type: 'single_choice', opts: [['A', 'Túi kẹo'], ['B', 'Túi sách'], ['C', 'Hộp bánh']], correct: 'A' },
  { text: 'Cụm từ "dãy núi" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Cụm từ nào có trong bài?', type: 'single_choice', opts: [['A', 'Gửi thư'], ['B', 'Gửi cá'], ['C', 'Gửi hoa']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "túi"?', type: 'single_choice', opts: [['A', 'núi'], ['B', 'gửi'], ['C', 'cửi']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "gửi"?', type: 'single_choice', opts: [['A', 'bùi'], ['B', 'ngửi'], ['C', 'mũi']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ui?', type: 'single_choice', opts: [['A', 'bùi, mũi, sủi'], ['B', 'cửi, gửi, ngửi'], ['C', 'gửi, núi, ngửi']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ưi?', type: 'single_choice', opts: [['A', 'túi, núi, mũi'], ['B', 'bùi, sủi, núi'], ['C', 'cửi, gửi, ngửi']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Bà ___ cho Hà túi kẹo."', type: 'single_choice', opts: [['A', 'ngửi'], ['B', 'gửi'], ['C', 'sủi']], correct: 'B' },
  { text: 'Sắp xếp các từ sau thành câu đúng: cho Hà / Bà / túi kẹo / gửi.', type: 'single_choice', opts: [['A', 'Bà túi kẹo gửi cho Hà.'], ['B', 'Bà gửi cho Hà túi kẹo.'], ['C', 'Túi kẹo bà cho Hà gửi.']], correct: 'B' },
  { text: 'Đọc đoạn: "Lan gửi thư cho Hà kể về quê Lan. Ở đó, có nhà sàn nằm ven đồi. Mùa này, chim ca rộn rã, sim nở rộ tím cả núi đồi. Lan mời Hà lên thăm quê Lan." — Lan gửi thư cho ai?', type: 'single_choice', opts: [['A', 'Gửi cho bà'], ['B', 'Gửi cho mẹ'], ['C', 'Gửi cho Hà']], correct: 'C' },
  { text: 'Nhà sàn ở quê Lan nằm ở đâu?', type: 'single_choice', opts: [['A', 'Ven đồi'], ['B', 'Ven biển'], ['C', 'Giữa thành phố']], correct: 'A' },
  { text: 'Loài hoa nào nở rộ tím cả núi đồi?', type: 'single_choice', opts: [['A', 'Hoa sen'], ['B', 'Hoa sim'], ['C', 'Hoa đào']], correct: 'B' },
  { text: 'Em muốn ra ngoài chơi với các bạn. Em nên nói gì với mẹ?', type: 'single_choice', opts: [['A', 'Mẹ cho con ra ngoài chơi với các bạn nhé ạ!'], ['B', 'Con đi chơi đây!'], ['C', 'Mẹ phải cho con đi chơi!']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Bà gửi cho Hà túi kẹo" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Bà gửi cho Hà túi kẹo", có bao nhiêu tiếng chứa vần ui hoặc ưi?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Những tiếng nào chứa vần mới trong câu "Bà gửi cho Hà túi kẹo"?', type: 'single_choice', opts: [['A', 'bà, Hà'], ['B', 'cho, kẹo'], ['C', 'gửi, túi']], correct: 'C' },
  { text: 'Câu "Lan gửi thư cho Hà kể về quê Lan" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong đoạn đọc về quê Lan, có bao nhiêu tiếng chứa vần ui hoặc ưi?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'A' },
  { text: 'Câu nào có cả vần ui và vần ưi?', type: 'single_choice', opts: [['A', 'Lan gửi thư từ vùng núi.'], ['B', 'Bé có một chiếc túi.'], ['C', 'Em ngửi hương hoa.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "n… – g… – m…"', type: 'single_choice', opts: [['A', 'ui – ưi – ui'], ['B', 'ưi – ui – ưi'], ['C', 'ui – ui – ưi']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Bà gủi cho Hà túi kẹo."?', type: 'single_choice', opts: [['A', 'bà'], ['B', 'gủi'], ['C', 'túi']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc về Lan: (1) Lan mời Hà lên thăm quê. (2) Lan gửi thư cho Hà. (3) Lan kể về cảnh đẹp ở quê mình.', type: 'single_choice', opts: [['A', '1 – 3 – 2'], ['B', '2 – 3 – 1'], ['C', '3 – 1 – 2']], correct: 'B' },
  { text: 'Vì sao Lan mời Hà lên thăm quê?', type: 'single_choice', opts: [['A', 'Vì Lan muốn Hà được biết và ngắm cảnh quê mình'], ['B', 'Vì Lan muốn Hà mang kẹo đến'], ['C', 'Vì Lan không thích ở quê một mình']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 41: Vần ui, ưi (lesson 755)…');
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
