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

const LESSON_ID = 740; // chu-ph-qu (Bài 26: Ph ph – Qu qu) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ ghép "ph" viết thường.', type: 'single_choice', opts: [['A', 'ph'], ['B', 'qu'], ['C', 'th']], correct: 'A' },
  { text: 'Chọn chữ ghép "Ph" viết hoa.', type: 'single_choice', opts: [['A', 'Th'], ['B', 'Ph'], ['C', 'Kh']], correct: 'B' },
  { text: 'Chọn chữ ghép "qu" viết thường.', type: 'single_choice', opts: [['A', 'ph'], ['B', 'gi'], ['C', 'qu']], correct: 'C' },
  { text: 'Chọn chữ ghép "Qu" viết hoa.', type: 'single_choice', opts: [['A', 'Qu'], ['B', 'Ph'], ['C', 'Q']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng ph?', type: 'single_choice', opts: [['A', 'quê'], ['B', 'phố'], ['C', 'quà']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng qu?', type: 'single_choice', opts: [['A', 'phí'], ['B', 'phà'], ['C', 'quê']], correct: 'C' },
  { text: 'Chọn từ đúng với hình người đang pha trà.', type: 'single_choice', opts: [['A', 'pha trà'], ['B', 'hái trà'], ['C', 'uống trà']], correct: 'A' },
  { text: 'Chọn từ đúng với hình những ngôi nhà cổ.', type: 'single_choice', opts: [['A', 'quê nhà'], ['B', 'phố cổ'], ['C', 'nhà ga']], correct: 'B' },
  { text: 'Chọn từ đúng với hình làng quê.', type: 'single_choice', opts: [['A', 'phố cổ'], ['B', 'quê nhà'], ['C', 'thủ đô']], correct: 'B' },
  { text: 'Chọn từ đúng với hình quả khế.', type: 'single_choice', opts: [['A', 'quả khế'], ['B', 'quả lê'], ['C', 'quả na']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép ph + ô + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'phò'], ['B', 'phố'], ['C', 'phổ']], correct: 'B' },
  { text: 'Ghép ph + a + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'phá'], ['B', 'phả'], ['C', 'phà']], correct: 'C' },
  { text: 'Ghép ph + i + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'phí'], ['B', 'phì'], ['C', 'phỉ']], correct: 'A' },
  { text: 'Ghép qu + ê được tiếng nào?', type: 'single_choice', opts: [['A', 'quê'], ['B', 'quế'], ['C', 'quể']], correct: 'A' },
  { text: 'Thêm thanh sắc vào tiếng "quê" được tiếng nào?', type: 'single_choice', opts: [['A', 'quề'], ['B', 'quế'], ['C', 'quể']], correct: 'B' },
  { text: 'Ghép qu + a được tiếng nào?', type: 'single_choice', opts: [['A', 'qua'], ['B', 'quê'], ['C', 'quà']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Cả nhà từ ___ về thăm quê.', type: 'single_choice', opts: [['A', 'phố'], ['B', 'quế'], ['C', 'phà']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Cả nhà từ phố về thăm ___.', type: 'single_choice', opts: [['A', 'quà'], ['B', 'quê'], ['C', 'qua']], correct: 'B' },
  { text: 'Bà cho bé món gì?', type: 'single_choice', opts: [['A', 'Quả khế'], ['B', 'Quà quê'], ['C', 'Một chiếc ô']], correct: 'B' },
  { text: 'Bố đưa bà đi thăm những đâu?', type: 'single_choice', opts: [['A', 'Bờ Hồ và phố cổ'], ['B', 'Nhà ga và bờ đê'], ['C', 'Chợ cá và vườn thú']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ph', type: 'multiple_choice', opts: [['A', 'phố'], ['B', 'phà'], ['C', 'phí'], ['D', 'quê'], ['E', 'pha']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng qu', type: 'multiple_choice', opts: [['A', 'quê'], ['B', 'quà'], ['C', 'qua'], ['D', 'quế'], ['E', 'phố']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'phà'], ['B', 'phí'], ['C', 'phố'], ['D', 'quê']], correct: 'D' },
  { text: 'Muốn đổi tiếng "quê" thành tiếng "quế", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh sắc'], ['B', 'Thêm thanh huyền'], ['C', 'Đổi qu thành ph']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: từ phố – Cả nhà – về thăm quê', type: 'single_choice', opts: [['A', 'Cả nhà từ phố về thăm quê.'], ['B', 'Từ phố quê về thăm cả nhà.'], ['C', 'Về thăm quê từ phố cả nhà.']], correct: 'A' },
  { text: 'Câu "Cả nhà từ phố về thăm quê." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Cả nhà từ phố về thăm quê." có bao nhiêu tiếng bắt đầu bằng ph hoặc qu?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Đoạn "Bà ra Thủ đô. Bà cho bé quà quê. Bố đưa bà đi Bờ Hồ, đi phố cổ." có bao nhiêu câu?', type: 'single_choice', opts: [['A', '2 câu'], ['B', '3 câu'], ['C', '4 câu']], correct: 'B' },
  { text: 'Khi bác sĩ khám bệnh cho em, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cháu cảm ơn bác sĩ ạ!'], ['B', 'Bác sĩ khám nhanh lên!'], ['C', 'Cháu không cần nói gì.']], correct: 'A' },
  { text: 'Khi bạn giúp em đứng dậy sau khi bị ngã, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cảm ơn bạn đã giúp mình!'], ['B', 'Bạn phải giúp mình chứ!'], ['C', 'Mình không cần cảm ơn.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 26: Ph ph – Qu qu (lesson 740)…');
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
