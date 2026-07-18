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

const LESSON_ID = 745; // van-an-an-an (Bài 31: Vần an, ăn, ân) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'an, ăn, ân'], ['B', 'am, ăm, âm'], ['C', 'ang, ăng, âng']], correct: 'A' },
  { text: 'Tiếng nào chứa vần an?', type: 'single_choice', opts: [['A', 'bàn'], ['B', 'khăn'], ['C', 'mận']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăn?', type: 'single_choice', opts: [['A', 'nhãn'], ['B', 'khăn'], ['C', 'thân']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ân?', type: 'single_choice', opts: [['A', 'bạn'], ['B', 'lặn'], ['C', 'gần']], correct: 'C' },
  { text: 'Quan sát hình quả mận. Chọn tên đúng của hình.', type: 'single_choice', opts: [['A', 'Quả nhãn'], ['B', 'Quả mận'], ['C', 'Quả cam']], correct: 'B' },
  { text: 'Quan sát hình chiếc khăn có hoa văn ô vuông. Đây là gì?', type: 'single_choice', opts: [['A', 'Khăn rằn'], ['B', 'Khăn len'], ['C', 'Cái bàn']], correct: 'A' },
  { text: 'Ngựa vằn và hươu cao cổ trong tranh là gì của nhau?', type: 'single_choice', opts: [['A', 'Đôi bạn thân'], ['B', 'Hai anh em'], ['C', 'Hai con vật đang đánh nhau']], correct: 'A' },
  { text: 'Tiếng "bàn" có vần nào?', type: 'single_choice', opts: [['A', 'an'], ['B', 'ăn'], ['C', 'ân']], correct: 'A' },
  { text: 'Tiếng "mận" có vần nào?', type: 'single_choice', opts: [['A', 'an'], ['B', 'ăn'], ['C', 'ân']], correct: 'C' },
  { text: 'Cụm từ "bạn thân" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "bàn"?', type: 'single_choice', opts: [['A', 'bạn'], ['B', 'khăn'], ['C', 'mận']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "khăn"?', type: 'single_choice', opts: [['A', 'gần'], ['B', 'lặn'], ['C', 'thân']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "mận"?', type: 'single_choice', opts: [['A', 'gần'], ['B', 'bạn'], ['C', 'nhãn']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng có vần an?', type: 'single_choice', opts: [['A', 'bàn, bạn, nhãn'], ['B', 'khăn, lặn, vằn'], ['C', 'gần, mận, thân']], correct: 'A' },
  { text: 'Từ nào ghép với tiếng "khăn" để tạo thành cụm từ có trong bài?', type: 'single_choice', opts: [['A', 'thân'], ['B', 'rằn'], ['C', 'mận']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Ngựa vằn / và hươu cao cổ / là / đôi bạn thân.', type: 'single_choice', opts: [['A', 'Ngựa vằn là và hươu cao cổ đôi bạn thân.'], ['B', 'Ngựa vằn và hươu cao cổ là đôi bạn thân.'], ['C', 'Đôi bạn thân ngựa vằn là và hươu cao cổ.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'Ngựa vằn và hươu cao cổ là đôi bạn thân.'], ['B', 'Ngựa vần và hươu cao cổ là đôi bạn thăn.'], ['C', 'Ngựa vằn và hươu cao cổ là đôi bặn thân.']], correct: 'A' },
  { text: 'Đọc đoạn: "Đàn gà cứ tha thẩn gần chân mẹ. Đã có mẹ che chắn, cả đàn chả sợ gì lũ quạ dữ." — Đàn gà con đi lại gần đâu?', type: 'single_choice', opts: [['A', 'Gần chân mẹ'], ['B', 'Gần lũ quạ'], ['C', 'Gần gốc cây']], correct: 'A' },
  { text: 'Vì sao đàn gà con không sợ lũ quạ dữ?', type: 'single_choice', opts: [['A', 'Vì đàn gà chạy rất nhanh'], ['B', 'Vì có mẹ che chắn'], ['C', 'Vì lũ quạ đang ngủ']], correct: 'B' },
  { text: 'Em vô ý va vào một người bạn. Em nên nói gì?', type: 'single_choice', opts: [['A', 'Mình xin lỗi bạn.'], ['B', 'Bạn tránh ra!'], ['C', 'Không phải lỗi của mình.']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Trong câu "Ngựa vằn và hươu cao cổ là đôi bạn thân." có bao nhiêu tiếng chứa một trong các vần an, ăn, ân?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Câu "Ngựa vằn và hươu cao cổ là đôi bạn thân." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'C' },
  { text: 'Trong câu "Ngựa vằn và hươu cao cổ là đôi bạn thân", tiếng nào mang vần ăn?', type: 'single_choice', opts: [['A', 'vằn'], ['B', 'bạn'], ['C', 'thân']], correct: 'A' },
  { text: 'Nhóm nào gồm đúng các tiếng khác nhau mang vần an, ăn hoặc ân trong đoạn đọc về đàn gà?', type: 'single_choice', opts: [['A', 'đàn, thẩn, gần, chân, chắn'], ['B', 'gà, mẹ, quạ, dữ'], ['C', 'tha, có, cả, sợ']], correct: 'A' },
  { text: 'Câu "Đàn gà cứ tha thẩn gần chân mẹ" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành câu: "Chiếc kh... r... nằm g... cái b..."', type: 'single_choice', opts: [['A', 'ăn – ăn – ân – an'], ['B', 'ân – an – ăn – ân'], ['C', 'an – ân – ăn – an']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Bạn An đang quàng chiếc khân rằn."?', type: 'single_choice', opts: [['A', 'bạn'], ['B', 'quàng'], ['C', 'khân']], correct: 'C' },
  { text: 'Câu nào có đủ cả ba vần an, ăn, ân?', type: 'single_choice', opts: [['A', 'Bạn An quàng khăn rồi đứng gần mẹ.'], ['B', 'Bé cầm một quả mận.'], ['C', 'Lan ngồi bên cái bàn.']], correct: 'A' },
  { text: 'Qua đoạn đọc, gà mẹ đã làm gì cho đàn gà con?', type: 'single_choice', opts: [['A', 'Che chắn và bảo vệ đàn con'], ['B', 'Đưa đàn con đi tìm lũ quạ'], ['C', 'Để đàn con ở lại một mình']], correct: 'A' },
  { text: 'Trong câu "Bạn An quàng khăn rằn", có bao nhiêu tiếng mang vần an hoặc ăn?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
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
  console.log('Cập nhật quiz Bài 31: Vần an, ăn, ân (lesson 745)…');
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
