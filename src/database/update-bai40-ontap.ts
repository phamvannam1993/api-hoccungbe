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

const LESSON_ID = 754; // on-tap-va-ke-chuyen-8 (Bài 40: Ôn tập và kể chuyện 8) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 40 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học chữ cái mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng nào chứa vần om?', type: 'single_choice', opts: [['A', 'lom'], ['B', 'xóm'], ['C', 'rơm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôm?', type: 'single_choice', opts: [['A', 'kem'], ['B', 'xóm'], ['C', 'khơi']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơm?', type: 'single_choice', opts: [['A', 'rơm'], ['B', 'sim'], ['C', 'tai']], correct: 'A' },
  { text: 'Tiếng nào chứa vần em?', type: 'single_choice', opts: [['A', 'nếm'], ['B', 'kem'], ['C', 'chùm']], correct: 'B' },
  { text: 'Tiếng nào chứa vần êm?', type: 'single_choice', opts: [['A', 'sim'], ['B', 'nếm'], ['C', 'hỏi']], correct: 'B' },
  { text: 'Tiếng nào chứa vần im?', type: 'single_choice', opts: [['A', 'sim'], ['B', 'chùm'], ['C', 'hãy']], correct: 'A' },
  { text: 'Tiếng nào chứa vần um?', type: 'single_choice', opts: [['A', 'xóm'], ['B', 'tai'], ['C', 'chùm']], correct: 'C' },
  { text: 'Tiếng nào chứa vần ai?', type: 'single_choice', opts: [['A', 'tai'], ['B', 'hãy'], ['C', 'đấy']], correct: 'A' },
  { text: 'Câu chuyện trong bài có tên là gì?', type: 'single_choice', opts: [['A', 'Thỏ và rùa'], ['B', 'Hai người bạn và con gấu'], ['C', 'Gà nâu và vịt xám']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào chứa vần ay?', type: 'single_choice', opts: [['A', 'tai'], ['B', 'hãy'], ['C', 'đấy']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ây?', type: 'single_choice', opts: [['A', 'đấy'], ['B', 'hỏi'], ['C', 'khơi']], correct: 'A' },
  { text: 'Tiếng nào chứa vần oi?', type: 'single_choice', opts: [['A', 'hỏi'], ['B', 'hội'], ['C', 'khơi']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôi?', type: 'single_choice', opts: [['A', 'tai'], ['B', 'hội'], ['C', 'hãy']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơi?', type: 'single_choice', opts: [['A', 'hỏi'], ['B', 'hội'], ['C', 'khơi']], correct: 'C' },
  { text: 'Cụm từ nào được viết đúng?', type: 'single_choice', opts: [['A', 'Chói lọi'], ['B', 'Chói lội'], ['C', 'Chối lọi']], correct: 'A' },
  { text: 'Đọc đoạn: "Nhím con ra bãi cỏ tìm cái ăn. Nó phấn chấn khi thấy vô số quả chín thơm ngon. Nhím vội chạy về gọi bạn chồn. Cả hai quay lại, ăn đến no nê." — Nhím con ra đâu tìm thức ăn?', type: 'single_choice', opts: [['A', 'Ra bãi cỏ'], ['B', 'Ra bờ sông'], ['C', 'Ra sân trường']], correct: 'A' },
  { text: 'Vì sao Nhím con phấn chấn?', type: 'single_choice', opts: [['A', 'Vì gặp được mẹ'], ['B', 'Vì thấy nhiều quả chín thơm ngon'], ['C', 'Vì tìm thấy một món đồ chơi']], correct: 'B' },
  { text: 'Nhím chạy về gọi người bạn nào?', type: 'single_choice', opts: [['A', 'Bạn thỏ'], ['B', 'Bạn chồn'], ['C', 'Bạn gấu']], correct: 'B' },
  { text: 'Nhím và chồn quay lại làm gì?', type: 'single_choice', opts: [['A', 'Hái hoa'], ['B', 'Ăn quả đến no nê'], ['C', 'Chơi trốn tìm']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Nhím con ra bãi cỏ tìm cái ăn." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Nhím vội chạy về gọi bạn chồn." có bao nhiêu tiếng chứa các vần đã ôn ở Bài 40?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần đã ôn trong câu "Nhím vội chạy về gọi bạn chồn."?', type: 'single_choice', opts: [['A', 'nhím, vội, chạy, gọi'], ['B', 'nhím, về, bạn, chồn'], ['C', 'vội, chạy, bạn, chồn']], correct: 'A' },
  { text: 'Câu nào có đủ ba vần ai, ay, ây?', type: 'single_choice', opts: [['A', 'Mai chạy tới gốc cây.'], ['B', 'Bé ngồi chơi trong nhà.'], ['C', 'Mẹ mua chùm quả chín.']], correct: 'A' },
  { text: 'Câu nào có đủ ba vần oi, ôi, ơi?', type: 'single_choice', opts: [['A', 'Voi mời bạn tới chơi.'], ['B', 'Bé có nhiều đồ chơi.'], ['C', 'Chim bói cá đậu trên cành.']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc về Nhím con: (1) Nhím gọi bạn chồn. (2) Nhím ra bãi cỏ tìm thức ăn. (3) Cả hai ăn quả đến no nê. (4) Nhím thấy nhiều quả chín thơm ngon.', type: 'single_choice', opts: [['A', '2 – 4 – 1 – 3'], ['B', '4 – 2 – 3 – 1'], ['C', '1 – 3 – 2 – 4']], correct: 'A' },
  { text: 'Khi nhìn thấy con gấu, hai người bạn đã làm gì?', type: 'single_choice', opts: [['A', 'Cả hai cùng chạy về nhà'], ['B', 'Một người trèo lên cây, người còn lại nằm im dưới đất'], ['C', 'Cả hai cùng đuổi con gấu']], correct: 'B' },
  { text: 'Vì sao con gấu bỏ đi?', type: 'single_choice', opts: [['A', 'Vì gấu tưởng người nằm dưới đất đã chết'], ['B', 'Vì người nằm dưới đất hét thật to'], ['C', 'Vì người trên cây ném quả xuống']], correct: 'A' },
  { text: 'Người bạn trèo lên cây đã có hành động như thế nào?', type: 'single_choice', opts: [['A', 'Dũng cảm bảo vệ bạn'], ['B', 'Bỏ mặc bạn khi gặp nguy hiểm'], ['C', 'Bình tĩnh gọi người đến giúp']], correct: 'B' },
  { text: 'Câu chuyện "Hai người bạn và con gấu" nhắc chúng ta điều gì?', type: 'single_choice', opts: [['A', 'Bạn tốt phải biết giúp đỡ nhau khi gặp khó khăn'], ['B', 'Khi gặp nguy hiểm, chỉ cần tự cứu mình'], ['C', 'Không nên đi chơi cùng bạn bè']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 40: Ôn tập và kể chuyện 8 (lesson 754)…');
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
