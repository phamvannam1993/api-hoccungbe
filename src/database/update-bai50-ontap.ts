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

const LESSON_ID = 764; // on-tap-va-ke-chuyen-10 (Bài 50: Ôn tập và kể chuyện 10) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 50 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học vần mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng "bật" chứa vần nào?', type: 'single_choice', opts: [['A', 'at'], ['B', 'ăt'], ['C', 'ât']], correct: 'C' },
  { text: 'Tiếng "mực" chứa vần nào?', type: 'single_choice', opts: [['A', 'uc'], ['B', 'ưc'], ['C', 'ôc']], correct: 'B' },
  { text: 'Tiếng "cột" chứa vần nào?', type: 'single_choice', opts: [['A', 'ot'], ['B', 'ôt'], ['C', 'ơt']], correct: 'B' },
  { text: 'Tiếng "thóc" chứa vần nào?', type: 'single_choice', opts: [['A', 'oc'], ['B', 'ôc'], ['C', 'uc']], correct: 'A' },
  { text: 'Vật dùng để tạo ra ngọn lửa là gì?', type: 'single_choice', opts: [['A', 'Bật lửa'], ['B', 'Đèn pin'], ['C', 'Cái kéo']], correct: 'A' },
  { text: 'Vật dùng để đựng mực trong bài là gì?', type: 'single_choice', opts: [['A', 'Lọ mực'], ['B', 'Cái cốc'], ['C', 'Lọ hoa']], correct: 'A' },
  { text: 'Đồ chơi gồm các khối nhỏ có nhiều chấm là gì?', type: 'single_choice', opts: [['A', 'Xúc xắc'], ['B', 'Quả bóng'], ['C', 'Khối gỗ']], correct: 'A' },
  { text: 'Cụm từ "gót chân" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu chuyện trong bài có tên là gì?', type: 'single_choice', opts: [['A', 'Bài học đầu tiên của thỏ con'], ['B', 'Hai người bạn và con gấu'], ['C', 'Sự tích hoa cúc trắng']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép âm a với âm cuối c được vần nào?', type: 'single_choice', opts: [['A', 'ac'], ['B', 'at'], ['C', 'ăc']], correct: 'A' },
  { text: 'Ghép âm ă với âm cuối t được vần nào?', type: 'single_choice', opts: [['A', 'ât'], ['B', 'ăt'], ['C', 'at']], correct: 'B' },
  { text: 'Ghép âm ô với âm cuối c được vần nào?', type: 'single_choice', opts: [['A', 'oc'], ['B', 'ôc'], ['C', 'ôt']], correct: 'B' },
  { text: 'Nhóm nào lần lượt chứa các vần ac, ăc, âc?', type: 'single_choice', opts: [['A', 'bác, mặc, gấc'], ['B', 'hát, mặt, bật'], ['C', 'học, cốc, cúc']], correct: 'A' },
  { text: 'Nhóm nào lần lượt chứa các vần at, ăt, ât?', type: 'single_choice', opts: [['A', 'bác, mặc, gấc'], ['B', 'hát, mặt, bật'], ['C', 'nhót, cột, ớt']], correct: 'B' },
  { text: 'Đọc đoạn: "Gà mẹ dẫn đàn con đi ăn. Chốc chốc, tìm thấy mồi, gà mẹ \'tục… tục…\' gọi con. Đàn gà con chạy lại, chen chúc nhau ăn rồi rúc vào bên mẹ. Gà mẹ ủ ấm cho các con." — Gà mẹ dẫn đàn con đi đâu?', type: 'single_choice', opts: [['A', 'Đi ăn'], ['B', 'Đi ngủ'], ['C', 'Đi tắm']], correct: 'A' },
  { text: 'Khi tìm thấy mồi, gà mẹ gọi đàn con bằng tiếng gì?', type: 'single_choice', opts: [['A', 'Meo… meo…'], ['B', 'Tục… tục…'], ['C', 'Gâu… gâu…']], correct: 'B' },
  { text: 'Khi nghe gà mẹ gọi, đàn gà con làm gì?', type: 'single_choice', opts: [['A', 'Chạy lại ăn mồi'], ['B', 'Bay lên cây'], ['C', 'Chạy về chuồng']], correct: 'A' },
  { text: 'Sau khi ăn, đàn gà con làm gì?', type: 'single_choice', opts: [['A', 'Rúc vào bên mẹ'], ['B', 'Đi tìm gà bố'], ['C', 'Chạy ra xa']], correct: 'A' },
  { text: 'Gà mẹ làm gì cho đàn con?', type: 'single_choice', opts: [['A', 'Ủ ấm cho các con'], ['B', 'Để các con ngủ ngoài trời'], ['C', 'Đuổi các con đi']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Hạt thóc nảy mầm" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong câu "Hạt thóc nảy mầm", có bao nhiêu tiếng chứa các vần được ôn trong bài?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Chốc chốc, tìm thấy mồi, gà mẹ \'tục… tục…\' gọi con." có bao nhiêu tiếng chứa vần ôc hoặc uc?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'C' },
  { text: 'Câu "Đàn gà con chạy lại, chen chúc nhau ăn rồi rúc vào bên mẹ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '12 tiếng'], ['B', '13 tiếng'], ['C', '14 tiếng']], correct: 'C' },
  { text: 'Trong câu "Đàn gà con chạy lại, chen chúc nhau ăn rồi rúc vào bên mẹ.", có bao nhiêu tiếng chứa vần uc?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần ac, ăc, âc?', type: 'single_choice', opts: [['A', 'Bác mặc áo rồi nhấc cặp.'], ['B', 'Bé học bài bên cửa sổ.'], ['C', 'Hà cắm hoa vào cốc.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "lọ m… – hạt th… – quả …t"', type: 'single_choice', opts: [['A', 'ưc – oc – ơt'], ['B', 'uc – ôc – ot'], ['C', 'ôc – ưc – ôt']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự câu chuyện "Bài học đầu tiên của thỏ con": (1) Thỏ mẹ dặn dò thỏ con trước khi đi chơi. (2) Thỏ con va vào anh sóc và nói: "Em cảm ơn anh." (3) Được bác voi cứu, thỏ con lại nói: "Cháu xin lỗi bác ạ." (4) Thỏ con hiểu cách dùng lời cảm ơn và xin lỗi.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 2 – 1 – 4']], correct: 'A' },
  { text: 'Thỏ con đã mắc lỗi gì?', type: 'single_choice', opts: [['A', 'Dùng nhầm lời cảm ơn và lời xin lỗi'], ['B', 'Không chịu đi chơi'], ['C', 'Không biết đường về nhà']], correct: 'A' },
  { text: 'Thỏ con hiểu ra bài học gì?', type: 'single_choice', opts: [['A', 'Khi mắc lỗi phải nói xin lỗi; khi được giúp đỡ phải nói cảm ơn'], ['B', 'Chỉ cần nói cảm ơn trong mọi tình huống'], ['C', 'Không cần nói gì khi được người khác giúp đỡ']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 50: Ôn tập và kể chuyện 10 (lesson 764)…');
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
