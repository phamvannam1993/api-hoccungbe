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

const LESSON_ID = 768; // van-op-op-op (Bài 54: Vần op, ôp, ơp) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'op, ôp, ơp'], ['B', 'ap, ăp, âp'], ['C', 'ot, ôt, ơt']], correct: 'A' },
  { text: 'Tiếng nào chứa vần op?', type: 'single_choice', opts: [['A', 'cọp'], ['B', 'hộp'], ['C', 'lớp']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôp?', type: 'single_choice', opts: [['A', 'họp'], ['B', 'lốp'], ['C', 'hợp']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơp?', type: 'single_choice', opts: [['A', 'góp'], ['B', 'tốp'], ['C', 'lợp']], correct: 'C' },
  { text: 'Con vật có bộ lông vằn trong bài là con gì?', type: 'single_choice', opts: [['A', 'Con cọp'], ['B', 'Con báo'], ['C', 'Con mèo']], correct: 'A' },
  { text: 'Bộ phận bằng cao su bao quanh bánh xe được gọi là gì?', type: 'single_choice', opts: [['A', 'Lốp xe'], ['B', 'Tay lái'], ['C', 'Bàn đạp']], correct: 'A' },
  { text: 'Vệt sáng xuất hiện trên bầu trời khi có giông là gì?', type: 'single_choice', opts: [['A', 'Tia nắng'], ['B', 'Tia chớp'], ['C', 'Cầu vồng']], correct: 'B' },
  { text: 'Mưa rơi phát ra âm thanh như thế nào?', type: 'single_choice', opts: [['A', 'Lộp độp'], ['B', 'Ríu rít'], ['C', 'Rì rào']], correct: 'A' },
  { text: 'Tiếng "họp" chứa vần nào?', type: 'single_choice', opts: [['A', 'op'], ['B', 'ôp'], ['C', 'ơp']], correct: 'A' },
  { text: 'Cụm từ "lốp xe" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "cọp"?', type: 'single_choice', opts: [['A', 'họp'], ['B', 'hộp'], ['C', 'hợp']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "hộp"?', type: 'single_choice', opts: [['A', 'góp'], ['B', 'tốp'], ['C', 'lớp']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "lớp"?', type: 'single_choice', opts: [['A', 'hợp'], ['B', 'cọp'], ['C', 'lốp']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần op?', type: 'single_choice', opts: [['A', 'cọp, góp, họp'], ['B', 'hộp, tốp, xốp'], ['C', 'hợp, lớp, lợp']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ôp?', type: 'single_choice', opts: [['A', 'cọp, họp, góp'], ['B', 'hộp, tốp, xốp'], ['C', 'hợp, lớp, chớp']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ơp?', type: 'single_choice', opts: [['A', 'hộp, lốp, tốp'], ['B', 'cọp, họp, góp'], ['C', 'hợp, lớp, lợp']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Mưa rào lộp ___."', type: 'single_choice', opts: [['A', 'độp'], ['B', 'đớp'], ['C', 'họp']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: tụ họp / Họ nhà nhái / thi hát.', type: 'single_choice', opts: [['A', 'Họ nhà nhái tụ họp thi hát.'], ['B', 'Tụ họp họ nhà nhái hát thi.'], ['C', 'Thi hát tụ họp họ nhà nhái.']], correct: 'A' },
  { text: 'Đọc đoạn: "Mưa rào lộp độp. Họ nhà nhái tụ họp thi hát đón cơn mưa đầu mùa. Mặt ao ran ran bài ca ì ọp, ì ọp. Đàn cá cờ lóp ngóp bơi đến, lâu lâu lại ngoi lên đớp mưa." — Họ nhà nhái tụ họp để làm gì?', type: 'single_choice', opts: [['A', 'Thi hát đón cơn mưa đầu mùa'], ['B', 'Thi chạy quanh bờ ao'], ['C', 'Tìm thức ăn trong vườn']], correct: 'A' },
  { text: 'Đàn cá cờ lâu lâu lại làm gì?', type: 'single_choice', opts: [['A', 'Nhảy lên bờ'], ['B', 'Ngoi lên đớp mưa'], ['C', 'Nằm im dưới đáy ao']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Mưa rào lộp độp" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mưa rào lộp độp", có bao nhiêu tiếng chứa vần ôp?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu "Đàn cá cờ lóp ngóp bơi đến, lâu lâu lại ngoi lên đớp mưa." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '12 tiếng'], ['B', '13 tiếng'], ['C', '14 tiếng']], correct: 'C' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần op, ôp hoặc ơp trong câu "Đàn cá cờ lóp ngóp bơi đến, lâu lâu lại ngoi lên đớp mưa."?', type: 'single_choice', opts: [['A', 'cá, cờ, bơi'], ['B', 'lóp, ngóp, đớp'], ['C', 'đàn, đến, mưa']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần op, ôp, ơp?', type: 'single_choice', opts: [['A', 'Con cọp đứng cạnh lốp xe khi tia chớp lóe sáng.'], ['B', 'Bé cầm một chiếc hộp.'], ['C', 'Học sinh đang họp lớp.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "con c…p – l…p xe – tia ch…p"', type: 'single_choice', opts: [['A', 'op – ôp – ơp'], ['B', 'ôp – ơp – op'], ['C', 'ơp – op – ôp']], correct: 'A' },
  { text: 'Tiếng nào viết sai trong câu: "Mưa rào lộp đợp."?', type: 'single_choice', opts: [['A', 'mưa'], ['B', 'lộp'], ['C', 'đợp']], correct: 'C' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Họ nhà nhái tụ họp thi hát. (2) Mưa rào rơi lộp độp. (3) Đàn cá cờ bơi đến và đớp mưa. (4) Mặt ao vang lên bài ca ì ọp.', type: 'single_choice', opts: [['A', '2 – 1 – 4 – 3'], ['B', '1 – 3 – 2 – 4'], ['C', '4 – 2 – 3 – 1']], correct: 'A' },
  { text: 'Vì sao mặt ao trở nên rộn ràng?', type: 'single_choice', opts: [['A', 'Vì nhái tụ họp thi hát và đàn cá cờ bơi đến'], ['B', 'Vì mọi con vật đều đi ngủ'], ['C', 'Vì mặt ao đã cạn nước']], correct: 'A' },
  { text: 'Việc làm nào giúp giữ ao hồ sạch đẹp?', type: 'single_choice', opts: [['A', 'Không vứt rác xuống ao hồ'], ['B', 'Đổ nước bẩn xuống ao'], ['C', 'Ném túi ni-lông xuống hồ']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 54: Vần op, ôp, ơp (lesson 768)…');
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
