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

const LESSON_ID = 748; // van-am-am-am (Bài 34: Vần am, ăm, âm) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'am, ăm, âm'], ['B', 'an, ăn, ân'], ['C', 'em, êm, im']], correct: 'A' },
  { text: 'Tiếng nào chứa vần am?', type: 'single_choice', opts: [['A', 'cam'], ['B', 'tăm'], ['C', 'sâm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăm?', type: 'single_choice', opts: [['A', 'làm'], ['B', 'tăm'], ['C', 'đậm']], correct: 'B' },
  { text: 'Tiếng nào chứa vần âm?', type: 'single_choice', opts: [['A', 'khám'], ['B', 'nhắm'], ['C', 'sâm']], correct: 'C' },
  { text: 'Quan sát hình quả có màu vàng cam trong bài. Đó là quả gì?', type: 'single_choice', opts: [['A', 'Quả cam'], ['B', 'Quả táo'], ['C', 'Quả mận']], correct: 'A' },
  { text: 'Những que nhỏ được bó lại trong bài là gì?', type: 'single_choice', opts: [['A', 'Tăm tre'], ['B', 'Que kem'], ['C', 'Bút chì']], correct: 'A' },
  { text: 'Củ có nhiều rễ nhỏ trong bài là củ gì?', type: 'single_choice', opts: [['A', 'Củ cà rốt'], ['B', 'Củ sâm'], ['C', 'Củ khoai']], correct: 'B' },
  { text: 'Tiếng "làm" có vần nào?', type: 'single_choice', opts: [['A', 'am'], ['B', 'ăm'], ['C', 'âm']], correct: 'A' },
  { text: 'Tiếng "tấm" có vần nào?', type: 'single_choice', opts: [['A', 'ăm'], ['B', 'âm'], ['C', 'am']], correct: 'B' },
  { text: 'Cụm từ "tăm tre" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "cam"?', type: 'single_choice', opts: [['A', 'làm'], ['B', 'tấm'], ['C', 'cằm']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "tăm"?', type: 'single_choice', opts: [['A', 'đậm'], ['B', 'nhắm'], ['C', 'sâm']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "sâm"?', type: 'single_choice', opts: [['A', 'khám'], ['B', 'cằm'], ['C', 'đậm']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần am?', type: 'single_choice', opts: [['A', 'cam, làm, khám'], ['B', 'tăm, cằm, nhắm'], ['C', 'sâm, đậm, tấm']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ăm?', type: 'single_choice', opts: [['A', 'cam, khám, làm'], ['B', 'tăm, cằm, nhắm'], ['C', 'sâm, tấm, đậm']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âm?', type: 'single_choice', opts: [['A', 'sâm, đậm, tấm'], ['B', 'tăm, nhắm, cằm'], ['C', 'cam, làm, khám']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Nhện ngắm nghía ___ lưới vừa làm xong."', type: 'single_choice', opts: [['A', 'tấm'], ['B', 'tăm'], ['C', 'sâm']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Nhện / tấm lưới / ngắm nghía / vừa làm xong.', type: 'single_choice', opts: [['A', 'Nhện tấm lưới vừa làm xong ngắm nghía.'], ['B', 'Nhện ngắm nghía tấm lưới vừa làm xong.'], ['C', 'Tấm lưới nhện vừa ngắm nghía làm xong.']], correct: 'B' },
  { text: 'Đọc đoạn: "Mùa hè, ve râm ran, sen nở thắm. Lũ trẻ nô đùa trên thảm cỏ ven hồ." — Lũ trẻ nô đùa ở đâu?', type: 'single_choice', opts: [['A', 'Trên thảm cỏ ven hồ'], ['B', 'Trong lớp học'], ['C', 'Trên sân nhà']], correct: 'A' },
  { text: 'Vào mùa hè, loài hoa nào nở thắm?', type: 'single_choice', opts: [['A', 'Hoa mai'], ['B', 'Hoa sen'], ['C', 'Hoa đào']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Đọc câu "Nhện ngắm nghía tấm lưới vừa làm xong." — Câu trên có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Câu "Nhện ngắm nghía tấm lưới vừa làm xong." có bao nhiêu tiếng chứa các vần am, ăm, âm?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Nhện ngắm nghía tấm lưới vừa làm xong."?', type: 'single_choice', opts: [['A', 'nhện, nghía, lưới'], ['B', 'ngắm, tấm, làm'], ['C', 'vừa, làm, xong']], correct: 'B' },
  { text: 'Đoạn đọc "Mùa hè, ve râm ran, sen nở thắm. Lũ trẻ nô đùa trên thảm cỏ ven hồ." có tất cả bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '15 tiếng'], ['B', '16 tiếng'], ['C', '17 tiếng']], correct: 'C' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần am, ăm, âm trong đoạn đọc?', type: 'single_choice', opts: [['A', 'râm, thắm, thảm'], ['B', 'mùa, sen, trẻ'], ['C', 'hè, ran, hồ']], correct: 'A' },
  { text: 'Câu nào có đủ cả ba vần am, ăm, âm?', type: 'single_choice', opts: [['A', 'Bé làm rơi tăm cạnh củ sâm.'], ['B', 'Mẹ mua một quả cam.'], ['C', 'Bé lấy tăm tre.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành các tiếng: "c… – t… – s…"', type: 'single_choice', opts: [['A', 'am – ăm – âm'], ['B', 'ăm – âm – am'], ['C', 'âm – am – ăm']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Nhện ngắm nghía tấm lưới vừa lằm xong."?', type: 'single_choice', opts: [['A', 'ngắm'], ['B', 'tấm'], ['C', 'lằm']], correct: 'C' },
  { text: 'Dựa vào tranh "Môi trường sống của loài vật", con cá sống ở đâu?', type: 'single_choice', opts: [['A', 'Dưới nước'], ['B', 'Trên cây'], ['C', 'Trên bờ cỏ']], correct: 'A' },
  { text: 'Việc làm nào giúp bảo vệ môi trường sống của các loài vật?', type: 'single_choice', opts: [['A', 'Vứt rác xuống sông'], ['B', 'Chặt phá cây rừng'], ['C', 'Giữ nguồn nước sạch và bảo vệ cây xanh']], correct: 'C' },
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
  console.log('Cập nhật quiz Bài 34: Vần am, ăm, âm (lesson 748)…');
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
