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

const LESSON_ID = 760; // van-ac-ac-ac (Bài 46: Vần ac, ăc, âc) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ac, ăc, âc'], ['B', 'an, ăn, ân'], ['C', 'ao, eo, êu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ac?', type: 'single_choice', opts: [['A', 'lạc'], ['B', 'mặc'], ['C', 'gấc']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăc?', type: 'single_choice', opts: [['A', 'nhạc'], ['B', 'mặc'], ['C', 'nhấc']], correct: 'B' },
  { text: 'Tiếng nào chứa vần âc?', type: 'single_choice', opts: [['A', 'bác'], ['B', 'mắc'], ['C', 'gấc']], correct: 'C' },
  { text: 'Người mặc áo trắng, khám và chữa bệnh cho mọi người là ai?', type: 'single_choice', opts: [['A', 'Bác sĩ'], ['B', 'Giáo viên'], ['C', 'Công an']], correct: 'A' },
  { text: 'Vật dùng để treo quần áo trong bài được gọi là gì?', type: 'single_choice', opts: [['A', 'Mắc áo'], ['B', 'Giá sách'], ['C', 'Cái kéo']], correct: 'A' },
  { text: 'Quả có vỏ màu đỏ, bên trong có nhiều hạt đỏ là quả gì?', type: 'single_choice', opts: [['A', 'Quả cam'], ['B', 'Quả gấc'], ['C', 'Quả táo']], correct: 'B' },
  { text: 'Trong tranh, Tây Bắc có những cảnh đẹp nào?', type: 'single_choice', opts: [['A', 'Ruộng bậc thang và thác nước'], ['B', 'Bãi biển và tàu thuyền'], ['C', 'Phố xá và nhà cao tầng']], correct: 'A' },
  { text: 'Tiếng "Bắc" chứa vần nào?', type: 'single_choice', opts: [['A', 'ac'], ['B', 'ăc'], ['C', 'âc']], correct: 'B' },
  { text: 'Cụm từ "quả gấc" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "lạc"?', type: 'single_choice', opts: [['A', 'nhạc'], ['B', 'mặc'], ['C', 'gấc']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "mặc"?', type: 'single_choice', opts: [['A', 'thác'], ['B', 'mắc'], ['C', 'nhấc']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "gấc"?', type: 'single_choice', opts: [['A', 'bác'], ['B', 'Bắc'], ['C', 'nhấc']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ac?', type: 'single_choice', opts: [['A', 'lạc, nhạc, thác'], ['B', 'mặc, mắc, Bắc'], ['C', 'nhấc, gấc, giấc']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ăc?', type: 'single_choice', opts: [['A', 'bác, lạc, nhạc'], ['B', 'mặc, mắc, Bắc'], ['C', 'bậc, nhấc, gấc']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âc?', type: 'single_choice', opts: [['A', 'nhấc, gấc, giấc'], ['B', 'mặc, mắc, Bắc'], ['C', 'lạc, bác, thác']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Tây Bắc có ruộng ___ thang."', type: 'single_choice', opts: [['A', 'bậc'], ['B', 'Bắc'], ['C', 'bác']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Tây Bắc / ruộng bậc thang / có / và thác nước.', type: 'single_choice', opts: [['A', 'Tây Bắc có ruộng bậc thang và thác nước.'], ['B', 'Ruộng bậc thang Tây Bắc và có thác nước.'], ['C', 'Có Tây Bắc thác nước và ruộng bậc thang.']], correct: 'A' },
  { text: 'Đọc đoạn: "Nếu lên Tây Bắc, bạn hãy đến Sa Pa. Vào mùa hè, mỗi ngày ở đây như có bốn mùa. Sa Pa có Thác Bạc, có Cầu Mây, có các bản Tả Van, Tả Phìn, Sín Chải." — Vào mùa hè, mỗi ngày ở Sa Pa được ví như thế nào?', type: 'single_choice', opts: [['A', 'Như có bốn mùa'], ['B', 'Như chỉ có mùa hè'], ['C', 'Như một ngày mưa lớn']], correct: 'A' },
  { text: 'Địa điểm nào được nhắc đến trong bài đọc?', type: 'single_choice', opts: [['A', 'Thác Bạc và Cầu Mây'], ['B', 'Hồ Gươm và Tháp Rùa'], ['C', 'Vịnh Hạ Long và đảo Cát Bà']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Tây Bắc có ruộng bậc thang, có thác nước." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong câu "Tây Bắc có ruộng bậc thang, có thác nước." có bao nhiêu tiếng chứa các vần ac, ăc, âc?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Tây Bắc có ruộng bậc thang, có thác nước."?', type: 'single_choice', opts: [['A', 'Tây, ruộng, nước'], ['B', 'Bắc, bậc, thác'], ['C', 'có, thang, nước']], correct: 'B' },
  { text: 'Câu "Sa Pa có Thác Bạc, có Cầu Mây" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Sa Pa có Thác Bạc, có Cầu Mây", có bao nhiêu tiếng chứa vần ac?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần ac, ăc, âc?', type: 'single_choice', opts: [['A', 'Bác mặc áo và nhấc quả gấc.'], ['B', 'Bé mặc chiếc áo mới.'], ['C', 'Em thích ăn quả gấc.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "b… sĩ – m… áo – quả g…"', type: 'single_choice', opts: [['A', 'ac – ăc – âc'], ['B', 'ăc – âc – ac'], ['C', 'âc – ac – ăc']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Tây Bác có ruộng bậc thang."?', type: 'single_choice', opts: [['A', 'Bác'], ['B', 'ruộng'], ['C', 'thang']], correct: 'A' },
  { text: 'Sắp xếp thông tin theo đúng thứ tự đoạn đọc về Sa Pa: (1) Sa Pa có Thác Bạc, Cầu Mây và nhiều bản đẹp. (2) Bài đọc mời bạn đến thăm Sa Pa. (3) Mùa hè, mỗi ngày ở Sa Pa như có bốn mùa.', type: 'single_choice', opts: [['A', '2 – 3 – 1'], ['B', '1 – 2 – 3'], ['C', '3 – 1 – 2']], correct: 'A' },
  { text: 'Em muốn bật tivi khi người lớn đang ngồi trong phòng. Em nên nói gì?', type: 'single_choice', opts: [['A', 'Mẹ ơi, con xin phép bật tivi xem một lát ạ!'], ['B', 'Con bật tivi đây!'], ['C', 'Mọi người phải để con xem tivi!']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 46: Vần ac, ăc, âc (lesson 760)…');
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
