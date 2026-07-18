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

const LESSON_ID = 759; // on-tap-va-ke-chuyen-9 (Bài 45: Ôn tập và kể chuyện 9) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 45 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học vần mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ui?', type: 'single_choice', opts: [['A', 'củi'], ['B', 'cửi'], ['C', 'cầu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ưi?', type: 'single_choice', opts: [['A', 'chào'], ['B', 'cửi'], ['C', 'rêu']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ao?', type: 'single_choice', opts: [['A', 'cầu'], ['B', 'đèo'], ['C', 'chào']], correct: 'C' },
  { text: 'Tiếng nào chứa vần eo?', type: 'single_choice', opts: [['A', 'rau'], ['B', 'đèo'], ['C', 'dịu']], correct: 'B' },
  { text: 'Tiếng nào chứa vần au?', type: 'single_choice', opts: [['A', 'rau'], ['B', 'cầu'], ['C', 'rêu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần âu?', type: 'single_choice', opts: [['A', 'chào'], ['B', 'cầu'], ['C', 'cửi']], correct: 'B' },
  { text: 'Tiếng nào chứa vần êu?', type: 'single_choice', opts: [['A', 'củi'], ['B', 'sưu'], ['C', 'rêu']], correct: 'C' },
  { text: 'Tiếng nào chứa vần iu?', type: 'single_choice', opts: [['A', 'dịu'], ['B', 'cầu'], ['C', 'đèo']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ưu?', type: 'single_choice', opts: [['A', 'rau'], ['B', 'chào'], ['C', 'sưu']], correct: 'C' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "củi"?', type: 'single_choice', opts: [['A', 'cửi'], ['B', 'túi'], ['C', 'hưu']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "cửi"?', type: 'single_choice', opts: [['A', 'gửi'], ['B', 'núi'], ['C', 'dịu']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "chào"?', type: 'single_choice', opts: [['A', 'kéo'], ['B', 'cầu'], ['C', 'sao']], correct: 'C' },
  { text: 'Tiếng nào có cùng vần với tiếng "đèo"?', type: 'single_choice', opts: [['A', 'cau'], ['B', 'kẹo'], ['C', 'rìu']], correct: 'B' },
  { text: 'Nhóm nào lần lượt chứa các vần au, âu, êu?', type: 'single_choice', opts: [['A', 'rau, cầu, rêu'], ['B', 'cầu, rau, rêu'], ['C', 'rêu, cầu, rau']], correct: 'A' },
  { text: 'Câu nào có cả tiếng chứa vần iu và tiếng chứa vần ưu?', type: 'single_choice', opts: [['A', 'Bé cầm cái rìu.'], ['B', 'Ông đã nghỉ hưu.'], ['C', 'Bà nói dịu dàng sau khi nghỉ hưu.']], correct: 'C' },
  { text: 'Đọc đoạn: "Nghỉ hè, nhà Hà đi Tam Đảo. Khi tán cây, ngọn cỏ còn thiu thiu ngủ, Hà đã dậy ngắm mây mù. Đến trưa, trời như vào thu. Mùa hè ở Tam Đảo quả là dễ chịu." — Nghỉ hè, nhà Hà đi đâu?', type: 'single_choice', opts: [['A', 'Đi Đà Lạt'], ['B', 'Đi Tam Đảo'], ['C', 'Đi Hà Nội']], correct: 'B' },
  { text: 'Hà dậy sớm để làm gì?', type: 'single_choice', opts: [['A', 'Ngắm mây mù'], ['B', 'Chơi kéo co'], ['C', 'Đi hái rau']], correct: 'A' },
  { text: 'Đến trưa, thời tiết ở Tam Đảo như thế nào?', type: 'single_choice', opts: [['A', 'Nóng như mùa hè'], ['B', 'Lạnh như mùa đông'], ['C', 'Trời như vào thu']], correct: 'C' },
  { text: 'Hà cảm thấy mùa hè ở Tam Đảo như thế nào?', type: 'single_choice', opts: [['A', 'Rất oi bức'], ['B', 'Rất dễ chịu'], ['C', 'Rất lạnh giá']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Tàu neo đậu ven bờ" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Tàu neo đậu ven bờ", có bao nhiêu tiếng chứa các vần đã ôn trong bài?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'C' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần đã ôn trong câu "Tàu neo đậu ven bờ"?', type: 'single_choice', opts: [['A', 'tàu, neo, đậu'], ['B', 'neo, ven, bờ'], ['C', 'tàu, ven, bờ']], correct: 'A' },
  { text: 'Câu "Nghỉ hè, nhà Hà đi Tam Đảo" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mùa hè ở Tam Đảo quả là dễ chịu", có bao nhiêu tiếng chứa các vần được ôn trong bài?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'A' },
  { text: 'Câu nào có cả vần ui và vần ưi?', type: 'single_choice', opts: [['A', 'Bé vui vẻ nhận quà.'], ['B', 'Lan gửi thư cho bà.'], ['C', 'Bé vui vẻ gửi quà cho bà.']], correct: 'C' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự câu chuyện "Sự tích hoa cúc trắng": (1) Cô bé đi tìm cách chữa bệnh cho mẹ. (2) Cô bé gặp một cụ già. (3) Cô bé xé các cánh hoa thành nhiều cánh nhỏ. (4) Người mẹ khỏi bệnh.', type: 'single_choice', opts: [['A', '2 – 1 – 4 – 3'], ['B', '1 – 2 – 3 – 4'], ['C', '3 – 2 – 1 – 4']], correct: 'B' },
  { text: 'Cụ già hướng dẫn cô bé làm gì để cứu mẹ?', type: 'single_choice', opts: [['A', 'Đi tìm một bông hoa cúc trắng'], ['B', 'Đi tìm một giỏ quả chín'], ['C', 'Đi gọi các bạn đến giúp']], correct: 'A' },
  { text: 'Khi thấy bông hoa chỉ có bốn cánh, cô bé đã làm gì?', type: 'single_choice', opts: [['A', 'Vứt bông hoa đi'], ['B', 'Đem bông hoa về ngay'], ['C', 'Xé mỗi cánh hoa thành nhiều cánh nhỏ']], correct: 'C' },
  { text: 'Câu chuyện "Sự tích hoa cúc trắng" ca ngợi điều gì?', type: 'single_choice', opts: [['A', 'Sự thông minh khi vui chơi'], ['B', 'Lòng hiếu thảo và tình yêu thương mẹ'], ['C', 'Sự nhanh nhẹn khi làm việc']], correct: 'B' },
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
  console.log('Cập nhật quiz Bài 45: Ôn tập và kể chuyện 9 (lesson 759)…');
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
