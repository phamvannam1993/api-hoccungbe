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

const LESSON_ID = 751; // van-em-em-im-um (Bài 37: Vần em, êm, im, um) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'em, êm, im, um'], ['B', 'en, ên, in, un'], ['C', 'om, ôm, ơm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần em?', type: 'single_choice', opts: [['A', 'kem'], ['B', 'đếm'], ['C', 'tìm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần êm?', type: 'single_choice', opts: [['A', 'tem'], ['B', 'mềm'], ['C', 'chim']], correct: 'B' },
  { text: 'Tiếng nào chứa vần im?', type: 'single_choice', opts: [['A', 'hẻm'], ['B', 'thềm'], ['C', 'tìm']], correct: 'C' },
  { text: 'Tiếng nào chứa vần um?', type: 'single_choice', opts: [['A', 'túm'], ['B', 'mỉm'], ['C', 'nếm']], correct: 'A' },
  { text: 'Vật nhỏ dùng để dán lên phong bì thư là gì?', type: 'single_choice', opts: [['A', 'Tem thư'], ['B', 'Tờ giấy'], ['C', 'Bức tranh']], correct: 'A' },
  { text: 'Phần nền cao ngay trước cửa nhà trong bài gọi là gì?', type: 'single_choice', opts: [['A', 'Mái nhà'], ['B', 'Thềm nhà'], ['C', 'Cổng nhà']], correct: 'B' },
  { text: 'Bạn nhỏ trong hình đang có vẻ mặt như thế nào?', type: 'single_choice', opts: [['A', 'Tủm tỉm cười'], ['B', 'Khóc to'], ['C', 'Tức giận']], correct: 'A' },
  { text: 'Tiếng "đếm" chứa vần nào?', type: 'single_choice', opts: [['A', 'em'], ['B', 'êm'], ['C', 'im']], correct: 'B' },
  { text: 'Cụm từ "tem thư" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "hẻm"?', type: 'single_choice', opts: [['A', 'kem'], ['B', 'mềm'], ['C', 'tìm']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "đếm"?', type: 'single_choice', opts: [['A', 'tem'], ['B', 'nếm'], ['C', 'túm']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "tìm"?', type: 'single_choice', opts: [['A', 'mỉm'], ['B', 'thềm'], ['C', 'chụm']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "chụm"?', type: 'single_choice', opts: [['A', 'đếm'], ['B', 'túm'], ['C', 'kem']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần em?', type: 'single_choice', opts: [['A', 'hẻm, kem, tem'], ['B', 'mềm, nếm, thềm'], ['C', 'mỉm, tìm, chim']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần êm?', type: 'single_choice', opts: [['A', 'tem, kem, hẻm'], ['B', 'mềm, nếm, thềm'], ['C', 'chụm, mũm, túm']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần im?', type: 'single_choice', opts: [['A', 'mỉm, tìm, chim'], ['B', 'đếm, mềm, nếm'], ['C', 'tem, hẻm, kem']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần um?', type: 'single_choice', opts: [['A', 'chụm, mũm, túm'], ['B', 'chim, tìm, mỉm'], ['C', 'tem, mềm, thềm']], correct: 'A' },
  { text: 'Đọc đoạn: "Chim ri cần cù tìm cỏ khô về làm tổ. Đêm qua, nó bị ốm. Chim sẻ và chim sơn ca đến thăm, đem cho nó túm rơm." — Chim ri tìm cỏ khô để làm gì?', type: 'single_choice', opts: [['A', 'Làm tổ'], ['B', 'Làm đồ chơi'], ['C', 'Làm thức ăn']], correct: 'A' },
  { text: 'Những con vật nào đến thăm chim ri?', type: 'single_choice', opts: [['A', 'Chim ri và chim én'], ['B', 'Chim sẻ và chim sơn ca'], ['C', 'Chim công và chim sáo']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Chị em Hà chơi trốn tìm." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Chị em Hà chơi trốn tìm", có bao nhiêu tiếng chứa các vần em, êm, im, um?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Hà tủm tỉm đếm: một, hai, ba." có bao nhiêu tiếng chứa các vần mới?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả bốn vần em, êm, im, um?', type: 'single_choice', opts: [['A', 'Em đứng trên thềm, mỉm cười và chụm tay.'], ['B', 'Bé ngồi chơi trước cửa nhà.'], ['C', 'Chim ri đang làm tổ.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "t… thư – đ… – t… – ch…"', type: 'single_choice', opts: [['A', 'em – êm – im – um'], ['B', 'êm – im – um – em'], ['C', 'im – um – em – êm']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Chim ri tềm cỏ khô về làm tổ."?', type: 'single_choice', opts: [['A', 'chim'], ['B', 'tềm'], ['C', 'tổ']], correct: 'B' },
  { text: 'Trong câu "Chim sẻ và chim sơn ca đến thăm, đem cho nó túm rơm." có bao nhiêu tiếng chứa các vần em, êm, im, um?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Vì sao chim ri cảm ơn chim sẻ và chim sơn ca?', type: 'single_choice', opts: [['A', 'Vì hai bạn đến thăm và mang rơm cho chim ri'], ['B', 'Vì hai bạn lấy tổ của chim ri'], ['C', 'Vì hai bạn rủ chim ri đi chơi']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Chim ri cảm ơn các bạn. (2) Chim ri bị ốm. (3) Chim sẻ và chim sơn ca mang rơm đến thăm. (4) Chim ri tìm cỏ khô làm tổ.', type: 'single_choice', opts: [['A', '4 – 2 – 3 – 1'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 4 – 1 – 2']], correct: 'A' },
  { text: 'Trời mưa, em có ô nhưng bạn không có. Em nên làm gì?', type: 'single_choice', opts: [['A', 'Che ô cùng bạn'], ['B', 'Chạy đi một mình'], ['C', 'Giấu ô không cho bạn nhìn thấy']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 37: Vần em, êm, im, um (lesson 751)…');
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
