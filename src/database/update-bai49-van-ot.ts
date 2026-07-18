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

const LESSON_ID = 763; // van-ot-ot-ot (Bài 49: Vần ot, ôt, ơt) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ot, ôt, ơt'], ['B', 'at, ăt, ât'], ['C', 'oc, ôc, ơc']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ot?', type: 'single_choice', opts: [['A', 'ngọt'], ['B', 'cột'], ['C', 'thớt']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôt?', type: 'single_choice', opts: [['A', 'vợt'], ['B', 'nhót'], ['C', 'tốt']], correct: 'C' },
  { text: 'Tiếng nào chứa vần ơt?', type: 'single_choice', opts: [['A', 'ớt'], ['B', 'lốt'], ['C', 'ngót']], correct: 'A' },
  { text: 'Quả nhỏ, có màu đỏ trong bài là quả gì?', type: 'single_choice', opts: [['A', 'Quả nhót'], ['B', 'Quả táo'], ['C', 'Quả cam']], correct: 'A' },
  { text: 'Loại lá xanh được dùng làm rau hoặc gia vị trong bài là gì?', type: 'single_choice', opts: [['A', 'Lá sen'], ['B', 'Lá lốt'], ['C', 'Lá cờ']], correct: 'B' },
  { text: 'Quả dài, màu đỏ và có vị cay là quả gì?', type: 'single_choice', opts: [['A', 'Quả ớt'], ['B', 'Quả cà'], ['C', 'Quả nhót']], correct: 'A' },
  { text: 'Vườn nhà bà có những loại rau, quả nào?', type: 'single_choice', opts: [['A', 'Ớt, rau ngót và cà rốt'], ['B', 'Cam, táo và quả lê'], ['C', 'Bầu, bí và mướp']], correct: 'A' },
  { text: 'Tiếng "rốt" chứa vần nào?', type: 'single_choice', opts: [['A', 'ot'], ['B', 'ôt'], ['C', 'ơt']], correct: 'B' },
  { text: 'Cụm từ "lá lốt" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "ngọt"?', type: 'single_choice', opts: [['A', 'nhót'], ['B', 'cột'], ['C', 'vợt']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "cột"?', type: 'single_choice', opts: [['A', 'thớt'], ['B', 'tốt'], ['C', 'ngót']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "vợt"?', type: 'single_choice', opts: [['A', 'nhót'], ['B', 'rốt'], ['C', 'thớt']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ot?', type: 'single_choice', opts: [['A', 'ngọt, nhót, ngót'], ['B', 'cột, tốt, lốt'], ['C', 'vớt, thớt, vợt']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ôt?', type: 'single_choice', opts: [['A', 'nhót, ngọt, ngót'], ['B', 'cột, tốt, rốt'], ['C', 'ớt, vợt, thớt']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ơt?', type: 'single_choice', opts: [['A', 'vớt, thớt, vợt'], ['B', 'cột, tốt, lốt'], ['C', 'nhót, ngót, ngọt']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Vườn nhà bà có ớt, rau ngót và cà ___."', type: 'single_choice', opts: [['A', 'rốt'], ['B', 'vợt'], ['C', 'cột']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Vườn nhà bà / rau ngót / có ớt / và cà rốt.', type: 'single_choice', opts: [['A', 'Vườn nhà bà có ớt, rau ngót và cà rốt.'], ['B', 'Có ớt vườn nhà bà và cà rốt rau ngót.'], ['C', 'Rau ngót vườn nhà bà cà rốt và có ớt.']], correct: 'A' },
  { text: 'Đọc đoạn: "Sớm nay thức dậy, Nam chợt thấy một chú chim sâu. Chim hớn hở như chào Nam. Nó nhảy nhót một hồi rồi bay qua bay lại, tìm bắt sâu bọ cho cây." — Sáng sớm, Nam nhìn thấy con vật nào?', type: 'single_choice', opts: [['A', 'Một chú chim sâu'], ['B', 'Một con sóc'], ['C', 'Một con mèo']], correct: 'A' },
  { text: 'Chim sâu tìm bắt sâu bọ để làm gì?', type: 'single_choice', opts: [['A', 'Bảo vệ cây'], ['B', 'Mang về cho Nam'], ['C', 'Dùng làm đồ chơi']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Vườn nhà bà có ớt, rau ngót và cà rốt." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '9 tiếng'], ['B', '10 tiếng'], ['C', '11 tiếng']], correct: 'B' },
  { text: 'Trong câu "Vườn nhà bà có ớt, rau ngót và cà rốt." có bao nhiêu tiếng chứa các vần ot, ôt, ơt?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Vườn nhà bà có ớt, rau ngót và cà rốt."?', type: 'single_choice', opts: [['A', 'vườn, nhà, bà'], ['B', 'rau, và, cà'], ['C', 'ớt, ngót, rốt']], correct: 'C' },
  { text: 'Câu "Sớm nay thức dậy, Nam chợt thấy một chú chim sâu." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '10 tiếng'], ['B', '11 tiếng'], ['C', '12 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về chim sâu, có bao nhiêu tiếng chứa vần ot, ôt hoặc ơt?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần ot, ôt, ơt?', type: 'single_choice', opts: [['A', 'Nam nhặt quả nhót, lá lốt và quả ớt.'], ['B', 'Mẹ mua một bó rau ngót.'], ['C', 'Bé cầm chiếc vợt mới.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "quả nh…t – lá l…t – quả …t"', type: 'single_choice', opts: [['A', 'ot – ôt – ơt'], ['B', 'ôt – ơt – ot'], ['C', 'ơt – ot – ôt']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc về chim sâu: (1) Nam thức dậy vào buổi sáng. (2) Nam nhìn thấy một chú chim sâu. (3) Chim sâu bay qua bay lại. (4) Chim sâu tìm bắt sâu bọ cho cây.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 4 – 1 – 2']], correct: 'A' },
  { text: 'Vì sao chim sâu là loài vật có ích?', type: 'single_choice', opts: [['A', 'Vì chim bắt sâu bọ gây hại cho cây'], ['B', 'Vì chim hái quả giúp con người'], ['C', 'Vì chim làm cây lớn thật nhanh']], correct: 'A' },
  { text: 'Em nên xem tivi và vui chơi như thế nào?', type: 'single_choice', opts: [['A', 'Sắp xếp thời gian hợp lí, xem tivi vừa phải và vui chơi an toàn'], ['B', 'Xem tivi liên tục cả ngày'], ['C', 'Chỉ vui chơi, không cần học bài']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 49: Vần ot, ôt, ơt (lesson 763)…');
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
