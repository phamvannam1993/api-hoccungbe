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

const LESSON_ID = 765; // van-et-et-it (Bài 51: Vần et, êt, it) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'et, êt, it'], ['B', 'at, ăt, ât'], ['C', 'ot, ôt, ơt']], correct: 'A' },
  { text: 'Tiếng nào chứa vần et?', type: 'single_choice', opts: [['A', 'vẹt'], ['B', 'tết'], ['C', 'mít']], correct: 'A' },
  { text: 'Tiếng nào chứa vần êt?', type: 'single_choice', opts: [['A', 'sét'], ['B', 'kết'], ['C', 'vịt']], correct: 'B' },
  { text: 'Tiếng nào chứa vần it?', type: 'single_choice', opts: [['A', 'vẹt'], ['B', 'nết'], ['C', 'vịt']], correct: 'C' },
  { text: 'Con chim có bộ lông nhiều màu trong bài là con gì?', type: 'single_choice', opts: [['A', 'Con vẹt'], ['B', 'Con én'], ['C', 'Con sáo']], correct: 'A' },
  { text: 'Những quả dài, màu đen trong bài được gọi là gì?', type: 'single_choice', opts: [['A', 'Bồ kết'], ['B', 'Quả mít'], ['C', 'Quả nhót']], correct: 'A' },
  { text: 'Quả lớn, vỏ xanh có nhiều gai nhỏ là quả gì?', type: 'single_choice', opts: [['A', 'Quả cam'], ['B', 'Quả mít'], ['C', 'Quả táo']], correct: 'B' },
  { text: 'Đôi vẹt trong bài đang làm gì?', type: 'single_choice', opts: [['A', 'Ríu rít trò chuyện'], ['B', 'Ngủ trong tổ'], ['C', 'Tìm thức ăn dưới đất']], correct: 'A' },
  { text: 'Tiếng "vẹt" chứa vần nào?', type: 'single_choice', opts: [['A', 'et'], ['B', 'êt'], ['C', 'it']], correct: 'A' },
  { text: 'Cụm từ "quả mít" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "vẹt"?', type: 'single_choice', opts: [['A', 'sét'], ['B', 'tết'], ['C', 'mít']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "kết"?', type: 'single_choice', opts: [['A', 'rét'], ['B', 'tết'], ['C', 'rít']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "mít"?', type: 'single_choice', opts: [['A', 'vịt'], ['B', 'vẹt'], ['C', 'nết']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần et?', type: 'single_choice', opts: [['A', 'vẹt, sét, rét'], ['B', 'kết, dệt, tết'], ['C', 'lít, mít, vịt']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần êt?', type: 'single_choice', opts: [['A', 'vẹt, sét, rét'], ['B', 'kết, dệt, tết'], ['C', 'lít, mít, vịt']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần it?', type: 'single_choice', opts: [['A', 'kết, nết, tết'], ['B', 'vẹt, sét, rét'], ['C', 'lít, mít, vịt']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Đôi vẹt ríu rít mãi không ___ chuyện."', type: 'single_choice', opts: [['A', 'hết'], ['B', 'hét'], ['C', 'hót']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Đôi vẹt / mãi không hết chuyện / ríu rít.', type: 'single_choice', opts: [['A', 'Đôi vẹt ríu rít mãi không hết chuyện.'], ['B', 'Ríu rít đôi vẹt chuyện mãi không hết.'], ['C', 'Mãi không hết đôi vẹt ríu rít chuyện.']], correct: 'A' },
  { text: 'Đọc đoạn: "Tết đến thật gần. Cái rét vẫn đậm. Mấy cây đào đã chi chít lộc non. Vài nụ tròn đỏ thắm vừa hé nở." — Khi Tết đến gần, cái rét như thế nào?', type: 'single_choice', opts: [['A', 'Vẫn đậm'], ['B', 'Đã hết hẳn'], ['C', 'Trở nên rất nóng']], correct: 'A' },
  { text: 'Trên những cây đào đã có gì?', type: 'single_choice', opts: [['A', 'Chi chít lộc non'], ['B', 'Nhiều quả chín'], ['C', 'Nhiều chiếc tổ chim']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Đôi vẹt ríu rít mãi không hết chuyện." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Đôi vẹt ríu rít mãi không hết chuyện." có bao nhiêu tiếng chứa các vần et, êt, it?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Đôi vẹt ríu rít mãi không hết chuyện."?', type: 'single_choice', opts: [['A', 'đôi, mãi, chuyện'], ['B', 'vẹt, rít, hết'], ['C', 'ríu, không, hết']], correct: 'B' },
  { text: 'Hai câu "Tết đến thật gần. Cái rét vẫn đậm." có tất cả bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về ngày Tết, có bao nhiêu tiếng chứa các vần et, êt hoặc it?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần et, êt, it?', type: 'single_choice', opts: [['A', 'Con vẹt đứng cạnh bồ kết và quả mít.'], ['B', 'Bé đang ăn một múi mít.'], ['C', 'Mẹ mua bồ kết về gội đầu.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "con v…t – bồ k…t – quả m…t"', type: 'single_choice', opts: [['A', 'et – êt – it'], ['B', 'êt – it – et'], ['C', 'it – et – êt']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Đôi vẹt ríu ríc mãi không hết chuyện."?', type: 'single_choice', opts: [['A', 'vẹt'], ['B', 'ríc'], ['C', 'hết']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Tết đến thật gần. (2) Cái rét vẫn đậm. (3) Cây đào chi chít lộc non, nụ hoa hé nở. (4) Trời ấm dần, đàn én bay về.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '3 – 1 – 4 – 2'], ['C', '2 – 4 – 1 – 3']], correct: 'A' },
  { text: 'Em nên chọn trang phục như thế nào cho phù hợp với thời tiết?', type: 'single_choice', opts: [['A', 'Trời nóng mặc đồ thoáng mát, trời lạnh mặc đủ ấm'], ['B', 'Trời nóng mặc thật nhiều áo ấm'], ['C', 'Trời lạnh chỉ mặc quần áo mỏng']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 51: Vần et, êt, it (lesson 765)…');
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
