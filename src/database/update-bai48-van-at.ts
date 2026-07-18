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

const LESSON_ID = 762; // van-at-at-at (Bài 48: Vần at, ăt, ât) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'at, ăt, ât'], ['B', 'ac, ăc, âc'], ['C', 'an, ăn, ân']], correct: 'A' },
  { text: 'Tiếng nào chứa vần at?', type: 'single_choice', opts: [['A', 'cát'], ['B', 'bắt'], ['C', 'đất']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăt?', type: 'single_choice', opts: [['A', 'hát'], ['B', 'mặt'], ['C', 'bật']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ât?', type: 'single_choice', opts: [['A', 'lạt'], ['B', 'sắt'], ['C', 'gật']], correct: 'C' },
  { text: 'Nơi có nhiều cát, thường nằm cạnh biển được gọi là gì?', type: 'single_choice', opts: [['A', 'Bãi cát'], ['B', 'Cánh đồng'], ['C', 'Bờ đê']], correct: 'A' },
  { text: 'Vật chiếu sáng vào ban ngày trong bài là gì?', type: 'single_choice', opts: [['A', 'Mặt trăng'], ['B', 'Mặt trời'], ['C', 'Ngôi sao']], correct: 'B' },
  { text: 'Vật dùng để tạo ra ngọn lửa trong bài là gì?', type: 'single_choice', opts: [['A', 'Bật lửa'], ['B', 'Đèn pin'], ['C', 'Cái kéo']], correct: 'A' },
  { text: 'Nam làm gì trong lớp học?', type: 'single_choice', opts: [['A', 'Bắt nhịp cho các bạn hát'], ['B', 'Đọc truyện cho các bạn nghe'], ['C', 'Vẽ tranh trên bảng']], correct: 'A' },
  { text: 'Tiếng "mặt" chứa vần nào?', type: 'single_choice', opts: [['A', 'ăt'], ['B', 'at'], ['C', 'ât']], correct: 'A' },
  { text: 'Cụm từ "bãi cát" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "cát"?', type: 'single_choice', opts: [['A', 'hát'], ['B', 'bắt'], ['C', 'đất']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "mặt"?', type: 'single_choice', opts: [['A', 'bật'], ['B', 'gặt'], ['C', 'hát']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "đất"?', type: 'single_choice', opts: [['A', 'lạt'], ['B', 'sắt'], ['C', 'bật']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần at?', type: 'single_choice', opts: [['A', 'cát, hát, mát'], ['B', 'bắt, sắt, mặt'], ['C', 'bật, đất, gật']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ăt?', type: 'single_choice', opts: [['A', 'hát, cát, lạt'], ['B', 'bắt, sắt, mặt'], ['C', 'đất, bật, tất']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ât?', type: 'single_choice', opts: [['A', 'bật, đất, gật'], ['B', 'bắt, mặt, gặt'], ['C', 'cát, mát, hát']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Nam ___ nhịp cho tất cả các bạn hát."', type: 'single_choice', opts: [['A', 'bắt'], ['B', 'bật'], ['C', 'cắt']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: cho tất cả các bạn hát / Nam / bắt nhịp.', type: 'single_choice', opts: [['A', 'Nam bắt nhịp cho tất cả các bạn hát.'], ['B', 'Bắt nhịp Nam cho tất cả các bạn hát.'], ['C', 'Tất cả các bạn Nam bắt nhịp cho hát.']], correct: 'A' },
  { text: 'Đọc đoạn: "Hè đến, nhà Nam đi nghỉ mát ở Cát Bà. Mẹ và Nam bỏ áo bơi, bàn chải, khăn mặt vào ba lô. Nam rất vui khi đi chơi xa với cả nhà." — Gia đình Nam đi nghỉ mát ở đâu?', type: 'single_choice', opts: [['A', 'Sa Pa'], ['B', 'Cát Bà'], ['C', 'Tam Đảo']], correct: 'B' },
  { text: 'Mẹ và Nam bỏ những đồ vật nào vào ba lô?', type: 'single_choice', opts: [['A', 'Áo bơi, bàn chải và khăn mặt'], ['B', 'Sách, vở và bút chì'], ['C', 'Bát, đũa và nồi cơm']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Nam bắt nhịp cho tất cả các bạn hát" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong câu "Nam bắt nhịp cho tất cả các bạn hát" có bao nhiêu tiếng chứa các vần at, ăt, ât?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Nam bắt nhịp cho tất cả các bạn hát"?', type: 'single_choice', opts: [['A', 'bắt, tất, hát'], ['B', 'Nam, nhịp, bạn'], ['C', 'cho, cả, các']], correct: 'A' },
  { text: 'Câu "Hè đến, nhà Nam đi nghỉ mát ở Cát Bà" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '9 tiếng'], ['B', '10 tiếng'], ['C', '11 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về chuyến đi Cát Bà, có bao nhiêu tiếng chứa các vần at, ăt, ât?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần at, ăt, ât?', type: 'single_choice', opts: [['A', 'Nam hát rồi bắt tay bạn trên sân đất.'], ['B', 'Nam đang hát cùng các bạn.'], ['C', 'Bé nhặt chiếc bút trên bàn.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "bãi c… – m… trời – b… lửa"', type: 'single_choice', opts: [['A', 'at – ăt – ât'], ['B', 'ăt – ât – at'], ['C', 'ât – at – ăt']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Nam bắc nhịp cho các bạn hát."?', type: 'single_choice', opts: [['A', 'Nam'], ['B', 'bắc'], ['C', 'hát']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Mẹ và Nam xếp đồ vào ba lô. (2) Cả nhà Nam đi nghỉ mát ở Cát Bà. (3) Nam rất vui khi được đi chơi xa.', type: 'single_choice', opts: [['A', '2 – 1 – 3'], ['B', '1 – 3 – 2'], ['C', '3 – 2 – 1']], correct: 'A' },
  { text: 'Em muốn ra ngoài chơi khi người lớn đang có khách. Em nên nói gì?', type: 'single_choice', opts: [['A', 'Ông bà cho cháu xin phép ra ngoài chơi một lát ạ!'], ['B', 'Cháu đi chơi đây!'], ['C', 'Mọi người phải cho cháu ra ngoài!']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 48: Vần at, ăt, ât (lesson 762)…');
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
