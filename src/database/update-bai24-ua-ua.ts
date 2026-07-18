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

const LESSON_ID = 738; // van-ua-ua (Bài 24: vần ua – ưa) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn vần "ua".', type: 'single_choice', opts: [['A', 'ưa'], ['B', 'ua'], ['C', 'ia']], correct: 'B' },
  { text: 'Chọn vần "ưa".', type: 'single_choice', opts: [['A', 'ua'], ['B', 'ia'], ['C', 'ưa']], correct: 'C' },
  { text: 'Tiếng nào có vần ua?', type: 'single_choice', opts: [['A', 'cua'], ['B', 'cửa'], ['C', 'dưa']], correct: 'A' },
  { text: 'Tiếng nào có vần ưa?', type: 'single_choice', opts: [['A', 'múa'], ['B', 'rùa'], ['C', 'đưa']], correct: 'C' },
  { text: 'Chọn từ đúng với hình quả cà chua.', type: 'single_choice', opts: [['A', 'cà chua'], ['B', 'dưa lê'], ['C', 'đu đủ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình bạn nhỏ múa cùng chiếc ô.', type: 'single_choice', opts: [['A', 'che ô'], ['B', 'múa ô'], ['C', 'mua ô']], correct: 'B' },
  { text: 'Chọn từ đúng với hình quả dưa lê.', type: 'single_choice', opts: [['A', 'dưa lê'], ['B', 'cà chua'], ['C', 'quả khế']], correct: 'A' },
  { text: 'Chọn từ đúng với hình cửa sổ.', type: 'single_choice', opts: [['A', 'cửa ra vào'], ['B', 'cửa sổ'], ['C', 'nhà gỗ']], correct: 'B' },
  { text: 'Trong câu "Mẹ đưa Hà đến lớp học múa.", mẹ đưa ai đi học?', type: 'single_choice', opts: [['A', 'Mẹ đưa Hà'], ['B', 'Mẹ đưa bà'], ['C', 'Mẹ đưa Nam']], correct: 'A' },
  { text: 'Hà đến lớp để học gì?', type: 'single_choice', opts: [['A', 'Học hát'], ['B', 'Học múa'], ['C', 'Học vẽ']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép m + ua + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'mua'], ['B', 'múa'], ['C', 'mưa']], correct: 'B' },
  { text: 'Ghép đ + ưa được tiếng nào?', type: 'single_choice', opts: [['A', 'đưa'], ['B', 'đua'], ['C', 'dưa']], correct: 'A' },
  { text: 'Ghép c + ua được tiếng nào?', type: 'single_choice', opts: [['A', 'cửa'], ['B', 'cua'], ['C', 'cưa']], correct: 'B' },
  { text: 'Ghép đ + ua + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'đùa'], ['B', 'đũa'], ['C', 'đúa']], correct: 'B' },
  { text: 'Ghép r + ua + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'rùa'], ['B', 'rủa'], ['C', 'rữa']], correct: 'A' },
  { text: 'Ghép c + ưa + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'cưa'], ['B', 'cửa'], ['C', 'cựa']], correct: 'B' },
  { text: 'Ghép d + ưa + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'dừa'], ['B', 'dứa'], ['C', 'dựa']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Mẹ ___ Hà đến lớp học múa.', type: 'single_choice', opts: [['A', 'đưa'], ['B', 'đũa'], ['C', 'dứa']], correct: 'A' },
  { text: 'Mẹ đi chợ mua những gì?', type: 'single_choice', opts: [['A', 'Cá, cua, sữa chua và dưa lê'], ['B', 'Cá rô, đu đủ và lá hẹ'], ['C', 'Cà chua, bí đỏ và cá cờ']], correct: 'A' },
  { text: 'Trong tranh "Giúp mẹ", bạn nhỏ đang làm gì?', type: 'single_choice', opts: [['A', 'Giúp mẹ chuẩn bị thức ăn'], ['B', 'Chơi ngoài sân'], ['C', 'Đi câu cá']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có vần ua', type: 'multiple_choice', opts: [['A', 'cua'], ['B', 'đũa'], ['C', 'rùa'], ['D', 'cửa'], ['E', 'múa']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng có vần ưa', type: 'multiple_choice', opts: [['A', 'đưa'], ['B', 'dưa'], ['C', 'cửa'], ['D', 'nhựa'], ['E', 'cua']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Từ nào không cùng nhóm với các từ còn lại?', type: 'single_choice', opts: [['A', 'cua'], ['B', 'rùa'], ['C', 'múa'], ['D', 'dứa']], correct: 'D' },
  { text: 'Muốn đổi tiếng "mua" thành tiếng "múa", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh sắc'], ['B', 'Thêm thanh huyền'], ['C', 'Đổi vần ua thành ưa']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: đến lớp học múa – Mẹ – Hà – đưa', type: 'single_choice', opts: [['A', 'Hà đưa mẹ đến lớp học múa.'], ['B', 'Mẹ đưa Hà đến lớp học múa.'], ['C', 'Đến lớp học múa mẹ Hà đưa.']], correct: 'B' },
  { text: 'Câu "Mẹ đưa Hà đến lớp học múa." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mẹ đưa Hà đến lớp học múa." có bao nhiêu tiếng chứa vần ua hoặc ưa?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu "Mẹ đi chợ mua cá, mua cua." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Đoạn "Mẹ đi chợ mua cá, mua cua. Mẹ mua cả sữa chua, dưa lê." có bao nhiêu câu?', type: 'single_choice', opts: [['A', '1 câu'], ['B', '2 câu'], ['C', '3 câu']], correct: 'B' },
  { text: 'Việc làm nào thể hiện em biết giúp đỡ mẹ?', type: 'single_choice', opts: [['A', 'Nhặt rau, sắp xếp đồ dùng và làm việc vừa sức'], ['B', 'Bày đồ chơi khắp nhà rồi bỏ đi'], ['C', 'Để mẹ làm mọi việc một mình']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 24: vần ua – ưa (lesson 738)…');
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
