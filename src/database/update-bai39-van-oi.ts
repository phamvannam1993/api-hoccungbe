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

const LESSON_ID = 753; // van-oi-oi-oi (Bài 39: Vần oi, ôi, ơi) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'oi, ôi, ơi'], ['B', 'ai, ay, ây'], ['C', 'om, ôm, ơm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần oi?', type: 'single_choice', opts: [['A', 'voi'], ['B', 'xôi'], ['C', 'mời']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôi?', type: 'single_choice', opts: [['A', 'hỏi'], ['B', 'xôi'], ['C', 'mới']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơi?', type: 'single_choice', opts: [['A', 'chòi'], ['B', 'đội'], ['C', 'mới']], correct: 'C' },
  { text: 'Con vật to lớn có chiếc vòi dài trong tranh là con gì?', type: 'single_choice', opts: [['A', 'Con voi'], ['B', 'Con hươu'], ['C', 'Con ngựa']], correct: 'A' },
  { text: 'Con chim đậu trên cành trong bài là:', type: 'single_choice', opts: [['A', 'Chim sơn ca'], ['B', 'Chim bói cá'], ['C', 'Chim bồ câu']], correct: 'B' },
  { text: 'Bạn nhỏ trong hình đang làm gì?', type: 'single_choice', opts: [['A', 'Thổi còi'], ['B', 'Đọc sách'], ['C', 'Đánh trống']], correct: 'A' },
  { text: 'Gấu bông, ô tô nhỏ và chiếc trống được gọi chung là gì?', type: 'single_choice', opts: [['A', 'Đồ dùng học tập'], ['B', 'Đồ chơi'], ['C', 'Đồ ăn']], correct: 'B' },
  { text: 'Tiếng "hội" chứa vần nào?', type: 'single_choice', opts: [['A', 'oi'], ['B', 'ôi'], ['C', 'ơi']], correct: 'B' },
  { text: 'Cụm từ "đồ chơi" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "voi"?', type: 'single_choice', opts: [['A', 'chòi'], ['B', 'xôi'], ['C', 'mời']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "xôi"?', type: 'single_choice', opts: [['A', 'hỏi'], ['B', 'hội'], ['C', 'chơi']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "mời"?', type: 'single_choice', opts: [['A', 'còi'], ['B', 'mỗi'], ['C', 'chơi']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần oi?', type: 'single_choice', opts: [['A', 'voi, chòi, hỏi'], ['B', 'xôi, mỗi, đội'], ['C', 'mời, mới, chơi']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ôi?', type: 'single_choice', opts: [['A', 'voi, bói, còi'], ['B', 'xôi, hội, đội'], ['C', 'mời, chơi, mới']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ơi?', type: 'single_choice', opts: [['A', 'chòi, hỏi, bói'], ['B', 'mỗi, xôi, thổi'], ['C', 'mời, mới, chơi']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Voi con ___ bạn đi xem hội."', type: 'single_choice', opts: [['A', 'hỏi'], ['B', 'mời'], ['C', 'đợi']], correct: 'B' },
  { text: 'Sắp xếp các từ sau thành câu đúng: Voi con / bạn / mời / đi xem hội.', type: 'single_choice', opts: [['A', 'Voi con mời bạn đi xem hội.'], ['B', 'Bạn voi con đi xem hội mời.'], ['C', 'Đi xem hội voi con bạn mời.']], correct: 'A' },
  { text: 'Đọc đoạn: "Hà hỏi mẹ: – Mẹ ơi, mạ lớn lên gọi là lúa. Bê lớn lên gọi là bò. Còn con lớn lên thì gọi là gì ạ? Mẹ ôm Hà rồi nói: – Lớn lên, con vẫn là con gái nhỏ của mẹ." — Hà hỏi ai?', type: 'single_choice', opts: [['A', 'Hỏi bố'], ['B', 'Hỏi mẹ'], ['C', 'Hỏi bạn']], correct: 'B' },
  { text: 'Mẹ nói khi lớn lên, Hà vẫn là gì?', type: 'single_choice', opts: [['A', 'Con gái nhỏ của mẹ'], ['B', 'Cô giáo của mẹ'], ['C', 'Bạn nhỏ hàng xóm']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Voi con mời bạn đi xem hội" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Voi con mời bạn đi xem hội", có bao nhiêu tiếng chứa các vần oi, ôi, ơi?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Voi con mời bạn đi xem hội"?', type: 'single_choice', opts: [['A', 'voi, mời, hội'], ['B', 'con, bạn, xem'], ['C', 'mời, bạn, đi']], correct: 'A' },
  { text: 'Câu nào có đủ cả ba vần oi, ôi, ơi?', type: 'single_choice', opts: [['A', 'Voi con mời bạn đi xem hội.'], ['B', 'Bé đang thổi còi.'], ['C', 'Em có nhiều đồ chơi.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "v… – x… – m…"', type: 'single_choice', opts: [['A', 'oi – ôi – ơi'], ['B', 'ôi – ơi – oi'], ['C', 'ơi – oi – ôi']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Voi con mời bạn đi xem hợi."?', type: 'single_choice', opts: [['A', 'voi'], ['B', 'mời'], ['C', 'hợi']], correct: 'C' },
  { text: 'Trong câu "Mẹ ôm Hà rồi nói", có bao nhiêu tiếng chứa vần oi, ôi hoặc ơi?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Theo lời Hà, mạ và bê khi lớn lên lần lượt được gọi là gì?', type: 'single_choice', opts: [['A', 'Lúa và bò'], ['B', 'Cây và trâu'], ['C', 'Lúa và dê']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Mẹ nói Hà vẫn là con gái nhỏ của mẹ. (2) Hà hỏi khi lớn lên mình được gọi là gì. (3) Mẹ ôm Hà. (4) Hà nói mạ lớn thành lúa, bê lớn thành bò.', type: 'single_choice', opts: [['A', '4 – 2 – 3 – 1'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },
  { text: 'Khi đi xe đạp, bé nên làm gì để an toàn?', type: 'single_choice', opts: [['A', 'Đi đúng phần đường, quan sát và đội mũ bảo hiểm'], ['B', 'Buông hai tay khi đang đi'], ['C', 'Đạp xe thật nhanh giữa lòng đường']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 39: Vần oi, ôi, ơi (lesson 753)…');
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
