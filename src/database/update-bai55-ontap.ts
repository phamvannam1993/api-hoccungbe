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

const LESSON_ID = 769; // on-tap-va-ke-chuyen-11 (Bài 55: Ôn tập và kể chuyện 11) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 55 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học vần mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng "nét" chứa vần nào?', type: 'single_choice', opts: [['A', 'et'], ['B', 'êt'], ['C', 'it']], correct: 'A' },
  { text: 'Tiếng "nết" chứa vần nào?', type: 'single_choice', opts: [['A', 'et'], ['B', 'êt'], ['C', 'it']], correct: 'B' },
  { text: 'Tiếng "thịt" chứa vần nào?', type: 'single_choice', opts: [['A', 'êt'], ['B', 'it'], ['C', 'ut']], correct: 'B' },
  { text: 'Tiếng "sút" chứa vần nào?', type: 'single_choice', opts: [['A', 'ut'], ['B', 'ưt'], ['C', 'it']], correct: 'A' },
  { text: 'Tiếng "mứt" chứa vần nào?', type: 'single_choice', opts: [['A', 'ut'], ['B', 'ưt'], ['C', 'êt']], correct: 'B' },
  { text: 'Tiếng "gặp" chứa vần nào?', type: 'single_choice', opts: [['A', 'ap'], ['B', 'ăp'], ['C', 'âp']], correct: 'B' },
  { text: 'Tiếng "đạp" chứa vần nào?', type: 'single_choice', opts: [['A', 'ap'], ['B', 'ăp'], ['C', 'âp']], correct: 'A' },
  { text: 'Tiếng "hộp" chứa vần nào?', type: 'single_choice', opts: [['A', 'op'], ['B', 'ôp'], ['C', 'ơp']], correct: 'B' },
  { text: 'Câu chuyện trong bài có tên là gì?', type: 'single_choice', opts: [['A', 'Mật ong của gấu con'], ['B', 'Bài học đầu tiên của thỏ con'], ['C', 'Hai người bạn và con gấu']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "nét"?', type: 'single_choice', opts: [['A', 'sét'], ['B', 'tết'], ['C', 'thịt']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "nết"?', type: 'single_choice', opts: [['A', 'vẹt'], ['B', 'tết'], ['C', 'mứt']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ap?', type: 'single_choice', opts: [['A', 'tháp, sáp, đạp'], ['B', 'gặp, sắp, bắp'], ['C', 'lấp, tấp, nập']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âp?', type: 'single_choice', opts: [['A', 'tháp, đạp, rạp'], ['B', 'gặp, bắp, cặp'], ['C', 'lấp, tấp, nập']], correct: 'C' },
  { text: 'Cụm từ nào có một tiếng chứa vần ut và một tiếng chứa vần it?', type: 'single_choice', opts: [['A', 'Chút ít'], ['B', 'Mứt sen'], ['C', 'Nét chữ']], correct: 'A' },
  { text: 'Cụm từ nào có tiếng chứa vần op?', type: 'single_choice', opts: [['A', 'Gom góp'], ['B', 'Hồi hộp'], ['C', 'Tia chớp']], correct: 'A' },
  { text: 'Đọc đoạn: "Trời xám xịt, mưa sầm sập như trút. Sấm sét ì ầm xa xa. Cây cỏ ngả rạp vào nhau. Một lúc sau, mưa lộp độp rồi dứt hẳn. Mặt trời ló khỏi chân mây. Vạn vật như thức dậy, đầy ắp sắc màu." — Lúc đầu, bầu trời và cơn mưa được miêu tả như thế nào?', type: 'single_choice', opts: [['A', 'Trời xám xịt, mưa sầm sập'], ['B', 'Trời trong xanh, nắng rực rỡ'], ['C', 'Trời mát mẻ, không có mưa']], correct: 'A' },
  { text: 'Khi mưa lớn, cây cỏ như thế nào?', type: 'single_choice', opts: [['A', 'Ngả rạp vào nhau'], ['B', 'Vươn cao thẳng đứng'], ['C', 'Khô héo dưới nắng']], correct: 'A' },
  { text: 'Sau khi mưa dứt, vật gì ló khỏi chân mây?', type: 'single_choice', opts: [['A', 'Mặt trăng'], ['B', 'Mặt trời'], ['C', 'Ngôi sao']], correct: 'B' },
  { text: 'Sau cơn mưa, vạn vật được miêu tả như thế nào?', type: 'single_choice', opts: [['A', 'Như thức dậy, đầy ắp sắc màu'], ['B', 'Trở nên tối tăm, vắng lặng'], ['C', 'Khô héo và thiếu sức sống']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Gần hồ có ngọn tháp cao vút" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Gần hồ có ngọn tháp cao vút", có bao nhiêu tiếng chứa các vần được ôn trong bài?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Những tiếng nào chứa vần được ôn trong câu "Gần hồ có ngọn tháp cao vút"?', type: 'single_choice', opts: [['A', 'gần, hồ'], ['B', 'tháp, vút'], ['C', 'ngọn, cao']], correct: 'B' },
  { text: 'Câu "Trời xám xịt, mưa sầm sập như trút" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Trời xám xịt, mưa sầm sập như trút" có bao nhiêu tiếng chứa các vần được ôn trong bài?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Câu nào có các tiếng chứa đủ bốn vần ăp, ap, op, ơp?', type: 'single_choice', opts: [['A', 'Bé gặp bạn, đạp xe, góp sách vào lớp.'], ['B', 'Bé cầm hộp bút đi học.'], ['C', 'Nam sút bóng rất mạnh.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "n…t chữ – n…t na – m…t sen"', type: 'single_choice', opts: [['A', 'et – êt – ưt'], ['B', 'êt – et – ut'], ['C', 'it – ưt – êt']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự câu chuyện "Mật ong của gấu con": (1) Gấu mẹ chuẩn bị lọ mật ong cho gấu con. (2) Gấu con giấu lọ mật ong đi. (3) Đồ ăn bị mất, các bạn cùng đi tìm. (4) Gấu con mang mật ong ra chia cho các bạn.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 2 – 1 – 4']], correct: 'A' },
  { text: 'Vì sao lúc đầu gấu con giấu lọ mật ong?', type: 'single_choice', opts: [['A', 'Vì gấu con chưa muốn chia sẻ với các bạn'], ['B', 'Vì gấu con muốn tặng mật ong cho mẹ'], ['C', 'Vì lọ mật ong đã bị vỡ']], correct: 'A' },
  { text: 'Câu chuyện "Mật ong của gấu con" nhắc chúng ta điều gì?', type: 'single_choice', opts: [['A', 'Nên thật thà và biết chia sẻ với bạn bè'], ['B', 'Nên giấu đồ ăn để dùng một mình'], ['C', 'Không nên mang đồ ăn khi đi chơi']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 55: Ôn tập và kể chuyện 11 (lesson 769)…');
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
