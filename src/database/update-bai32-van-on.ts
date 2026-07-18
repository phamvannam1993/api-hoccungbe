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

const LESSON_ID = 746; // van-on-on-on (Bài 32: Vần on, ôn, ơn) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'on, ôn, ơn'], ['B', 'an, ăn, ân'], ['C', 'om, ôm, ơm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần on?', type: 'single_choice', opts: [['A', 'con'], ['B', 'lớn'], ['C', 'chồn']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôn?', type: 'single_choice', opts: [['A', 'sơn'], ['B', 'nón'], ['C', 'lớn']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơn?', type: 'single_choice', opts: [['A', 'con'], ['B', 'lớn'], ['C', 'ngon']], correct: 'B' },
  { text: 'Quan sát hình chiếc mũ trong bài. Đó là gì?', type: 'single_choice', opts: [['A', 'Nón lá'], ['B', 'Cái ô'], ['C', 'Cái bàn']], correct: 'A' },
  { text: 'Quan sát hình con vật nhỏ trong bài đọc vần. Đó là con gì?', type: 'single_choice', opts: [['A', 'Con mèo'], ['B', 'Con chồn'], ['C', 'Con thỏ']], correct: 'B' },
  { text: 'Quan sát hình con chim trong bài. Đó là con gì?', type: 'single_choice', opts: [['A', 'Chim sẻ'], ['B', 'Sơn ca'], ['C', 'Chim én']], correct: 'B' },
  { text: 'Tiếng "nón" có vần nào?', type: 'single_choice', opts: [['A', 'on'], ['B', 'ôn'], ['C', 'ơn']], correct: 'B' },
  { text: 'Tiếng "lớn" có vần nào?', type: 'single_choice', opts: [['A', 'ôn'], ['B', 'ơn'], ['C', 'on']], correct: 'B' },
  { text: 'Cụm từ "con chồn" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "con"?', type: 'single_choice', opts: [['A', 'ngon'], ['B', 'lớn'], ['C', 'nớn']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "nón"?', type: 'single_choice', opts: [['A', 'ôn'], ['B', 'chồn'], ['C', 'sơn']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "lớn"?', type: 'single_choice', opts: [['A', 'sơn'], ['B', 'ngon'], ['C', 'con']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng có vần on?', type: 'single_choice', opts: [['A', 'con, ngon, giòn'], ['B', 'nón, chồn, ôn'], ['C', 'lớn, sơn, hờn']], correct: 'A' },
  { text: 'Từ nào ghép đúng với tiếng "sơn" để tạo từ có trong bài?', type: 'single_choice', opts: [['A', 'sơn gà'], ['B', 'sơn ca'], ['C', 'sơn cá']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Sơn ca / véo von / Mẹ ơi / con đã lớn khôn.', type: 'single_choice', opts: [['A', 'Sơn ca véo von: Mẹ ơi, con đã lớn khôn.'], ['B', 'Mẹ ơi véo von, sơn ca con đã lớn khôn.'], ['C', 'Con đã sơn ca véo von mẹ ơi lớn khôn.']], correct: 'A' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'Sơn ca véo von: Mẹ ơi, con đã lớn khôn.'], ['B', 'Sơn ca véo vôn: Mẹ ơi, con đã lớn khơn.'], ['C', 'Sơn ca véo von: Mẹ ơi, cơn đã lớn khôn.']], correct: 'A' },
  { text: 'Đọc bài vè: "Ve vẻ vè ve / Vè bốn chú lợn / Nhởn nhơ no giòn / Ăn ngủ vô tư." — Bài đọc nhắc đến mấy chú lợn con?', type: 'single_choice', opts: [['A', 'Hai chú'], ['B', 'Ba chú'], ['C', 'Bốn chú']], correct: 'C' },
  { text: 'Các chú lợn con được tả như thế nào?', type: 'single_choice', opts: [['A', 'Ăn ngủ vô tư'], ['B', 'Buồn bã, mệt mỏi'], ['C', 'Rất sợ hãi']], correct: 'A' },
  { text: 'Nhìn tranh "Rừng xanh vui nhộn", em thấy khung cảnh như thế nào?', type: 'single_choice', opts: [['A', 'Vui nhộn'], ['B', 'Buồn bã'], ['C', 'Vắng lặng']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Trong câu "Sơn ca véo von: Mẹ ơi, con đã lớn khôn." có bao nhiêu tiếng chứa một trong các vần on, ôn, ơn?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Sơn ca véo von: Mẹ ơi, con đã lớn khôn.", tiếng nào mang vần ơn?', type: 'single_choice', opts: [['A', 'con'], ['B', 'sơn'], ['C', 'lớn']], correct: 'C' },
  { text: 'Trong câu "Sơn ca véo von: Mẹ ơi, con đã lớn khôn.", tiếng nào mang vần ôn?', type: 'single_choice', opts: [['A', 'khôn'], ['B', 'con'], ['C', 'lớn']], correct: 'A' },
  { text: 'Nhóm nào gồm đúng các tiếng có chứa vần ôn?', type: 'single_choice', opts: [['A', 'nón, chồn, khôn'], ['B', 'con, ngon, giòn'], ['C', 'lớn, sơn, hờn']], correct: 'A' },
  { text: 'Dòng nào có đủ cả ba vần on, ôn, ơn?', type: 'single_choice', opts: [['A', 'con, nón, lớn'], ['B', 'con, ngon, giòn'], ['C', 'sơn, lớn, hờn']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để điền vào chỗ trống: "c... ch... s... ca lớn kh..."', type: 'single_choice', opts: [['A', 'on – ôn – ơn – ôn'], ['B', 'ôn – on – ơn – on'], ['C', 'ơn – ôn – on – ơn']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Con chồn đội nớn lá."?', type: 'single_choice', opts: [['A', 'con'], ['B', 'chồn'], ['C', 'nớn']], correct: 'C' },
  { text: 'Câu "Sơn ca véo von" có mấy tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong bài vè "Bốn chú lợn con", dòng nào cho thấy lợn con sống thoải mái, không lo nghĩ?', type: 'single_choice', opts: [['A', 'Ve vẻ vè ve'], ['B', 'Ăn ngủ vô tư'], ['C', 'Là to tròn thế']], correct: 'B' },
  { text: 'Câu nào dưới đây viết đúng và có nghĩa phù hợp với bài?', type: 'single_choice', opts: [['A', 'Con chồn, nón lá, sơn ca.'], ['B', 'Cơn chồn, nớn lá, sơn ka.'], ['C', 'Con chồn, non lá, xơn ca.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 32: Vần on, ôn, ơn (lesson 746)…');
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
