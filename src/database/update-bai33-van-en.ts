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

const LESSON_ID = 747; // van-en-en-in-un (Bài 33: Vần en, ên, in, un) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'en, ên, in, un'], ['B', 'an, ăn, ân, on'], ['C', 'em, êm, im, um']], correct: 'A' },
  { text: 'Tiếng nào chứa vần en?', type: 'single_choice', opts: [['A', 'sen'], ['B', 'nến'], ['C', 'pin']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ên?', type: 'single_choice', opts: [['A', 'mèn'], ['B', 'nến'], ['C', 'nhìn']], correct: 'B' },
  { text: 'Tiếng nào chứa vần in?', type: 'single_choice', opts: [['A', 'cún'], ['B', 'khèn'], ['C', 'chín']], correct: 'C' },
  { text: 'Tiếng nào chứa vần un?', type: 'single_choice', opts: [['A', 'vun'], ['B', 'mịn'], ['C', 'trên']], correct: 'A' },
  { text: 'Quan sát hình vật đang cháy sáng trong bài. Đó là gì?', type: 'single_choice', opts: [['A', 'Ngọn nến'], ['B', 'Đèn pin'], ['C', 'Bóng điện']], correct: 'A' },
  { text: 'Quan sát hình chiếc đèn màu xanh. Đó là gì?', type: 'single_choice', opts: [['A', 'Đèn bàn'], ['B', 'Đèn pin'], ['C', 'Đèn dầu']], correct: 'B' },
  { text: 'Con vật nhỏ màu nâu trong bài là con gì?', type: 'single_choice', opts: [['A', 'Cún con'], ['B', 'Mèo con'], ['C', 'Thỏ con']], correct: 'A' },
  { text: 'Tiếng "mèn" có vần nào?', type: 'single_choice', opts: [['A', 'en'], ['B', 'ên'], ['C', 'in']], correct: 'A' },
  { text: 'Cụm từ "đèn pin" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "đèn"?', type: 'single_choice', opts: [['A', 'sen'], ['B', 'nến'], ['C', 'pin']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "nến"?', type: 'single_choice', opts: [['A', 'mèn'], ['B', 'trên'], ['C', 'nhìn']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "pin"?', type: 'single_choice', opts: [['A', 'mịn'], ['B', 'vun'], ['C', 'sen']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "cún"?', type: 'single_choice', opts: [['A', 'chín'], ['B', 'khèn'], ['C', 'vun']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần en?', type: 'single_choice', opts: [['A', 'sen, khèn, mèn'], ['B', 'nến, trên, nghển'], ['C', 'pin, chín, mịn']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần in?', type: 'single_choice', opts: [['A', 'cún, vun, ngủn'], ['B', 'nhìn, chín, mịn'], ['C', 'sen, đèn, khèn']], correct: 'B' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Cún con nhìn thấy dế ___ trên tàu lá."', type: 'single_choice', opts: [['A', 'mèn'], ['B', 'nến'], ['C', 'pin']], correct: 'A' },
  { text: 'Sắp xếp các từ sau thành câu đúng: Cún con / dế mèn / nhìn thấy / trên tàu lá.', type: 'single_choice', opts: [['A', 'Cún con nhìn thấy dế mèn trên tàu lá.'], ['B', 'Dế mèn cún con trên tàu lá nhìn thấy.'], ['C', 'Trên tàu lá cún nhìn thấy con dế mèn con.']], correct: 'A' },
  { text: 'Cún con nhìn thấy con vật nào?', type: 'single_choice', opts: [['A', 'Con chồn'], ['B', 'Dế mèn'], ['C', 'Con rùa']], correct: 'B' },
  { text: 'Khi quả bóng vô tình bay trúng chú bảo vệ, các bạn nhỏ nên nói gì?', type: 'single_choice', opts: [['A', 'Cháu xin lỗi chú ạ!'], ['B', 'Chú tránh ra!'], ['C', 'Không phải lỗi của cháu!']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Đọc câu "Cún con nhìn thấy dế mèn trên tàu lá." — Câu trên có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong câu "Cún con nhìn thấy dế mèn trên tàu lá." có bao nhiêu tiếng chứa các vần en, ên, in, un?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng mang vần mới trong câu "Cún con nhìn thấy dế mèn trên tàu lá."?', type: 'single_choice', opts: [['A', 'cún, nhìn, mèn, trên'], ['B', 'con, thấy, dế, lá'], ['C', 'cún, con, tàu, lá']], correct: 'A' },
  { text: 'Câu nào có đủ cả bốn vần en, ên, in, un?', type: 'single_choice', opts: [['A', 'Cún nhìn đèn pin trên bàn.'], ['B', 'Bé cầm ngọn nến.'], ['C', 'Cún con nằm ngủ.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành các tiếng: "s… – n… – p… – c…"', type: 'single_choice', opts: [['A', 'en – ên – in – un'], ['B', 'ên – en – un – in'], ['C', 'in – un – en – ên']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Cún con nhình thấy dế mèn."?', type: 'single_choice', opts: [['A', 'cún'], ['B', 'nhình'], ['C', 'mèn']], correct: 'B' },
  { text: 'Trong câu "Cún nhìn đèn pin trên bàn", có bao nhiêu tiếng chứa một trong các vần en, ên, in, un?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong bài đố, con vật nào có tên chứa từ chỉ số ba?', type: 'single_choice', opts: [['A', 'Con ba ba'], ['B', 'Con rùa'], ['C', 'Con thỏ']], correct: 'A' },
  { text: 'Con vật nào có bốn chân ngắn và nổi tiếng trong câu chuyện chạy thi với thỏ?', type: 'single_choice', opts: [['A', 'Con ba ba'], ['B', 'Con rùa'], ['C', 'Con chó']], correct: 'B' },
  { text: 'Khi mắc lỗi, cách ứng xử nào phù hợp nhất?', type: 'single_choice', opts: [['A', 'Biết nhận lỗi, nói xin lỗi và sửa sai'], ['B', 'Im lặng bỏ đi'], ['C', 'Đổ lỗi cho người khác']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 33: Vần en, ên, in, un (lesson 747)…');
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
