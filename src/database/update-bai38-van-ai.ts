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

const LESSON_ID = 752; // van-ai-ay-ay (Bài 38: Vần ai, ay, ây) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ai, ay, ây'], ['B', 'oi, ôi, ơi'], ['C', 'am, ăm, âm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ai?', type: 'single_choice', opts: [['A', 'tay'], ['B', 'bài'], ['C', 'dây']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ay?', type: 'single_choice', opts: [['A', 'máy'], ['B', 'mây'], ['C', 'vải']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ây?', type: 'single_choice', opts: [['A', 'lái'], ['B', 'tay'], ['C', 'mây']], correct: 'C' },
  { text: 'Những quả màu đỏ mọc thành chùm trong bài là quả gì?', type: 'single_choice', opts: [['A', 'Chùm nhãn'], ['B', 'Chùm vải'], ['C', 'Chùm nho']], correct: 'B' },
  { text: 'Chiếc xe dùng để làm đất trên đồng ruộng là gì?', type: 'single_choice', opts: [['A', 'Máy cày'], ['B', 'Xe đạp'], ['C', 'Xe máy']], correct: 'A' },
  { text: 'Những khối màu trắng trên bầu trời được gọi là gì?', type: 'single_choice', opts: [['A', 'Đám khói'], ['B', 'Đám mây'], ['C', 'Đám lá']], correct: 'B' },
  { text: 'Tiếng "hai" chứa vần nào?', type: 'single_choice', opts: [['A', 'ai'], ['B', 'ay'], ['C', 'ây']], correct: 'A' },
  { text: 'Tiếng "dây" chứa vần nào?', type: 'single_choice', opts: [['A', 'ai'], ['B', 'ay'], ['C', 'ây']], correct: 'C' },
  { text: 'Cụm từ "máy cày" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "bài"?', type: 'single_choice', opts: [['A', 'máy'], ['B', 'vải'], ['C', 'mây']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "tay"?', type: 'single_choice', opts: [['A', 'mây'], ['B', 'máy'], ['C', 'vải']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "dây"?', type: 'single_choice', opts: [['A', 'mây'], ['B', 'cày'], ['C', 'hai']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ai?', type: 'single_choice', opts: [['A', 'hai, bài, vải'], ['B', 'tay, máy, cày'], ['C', 'dây, mây, đầy']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ay?', type: 'single_choice', opts: [['A', 'hai, lái, vải'], ['B', 'tay, máy, cày'], ['C', 'dây, mây, dậy']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ây?', type: 'single_choice', opts: [['A', 'tay, máy, chạy'], ['B', 'bài, lái, gai'], ['C', 'dây, dậy, mây']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Hai bạn thi nhảy ___."', type: 'single_choice', opts: [['A', 'cây'], ['B', 'tay'], ['C', 'dây']], correct: 'C' },
  { text: 'Sắp xếp các từ sau thành câu đúng: thi / Hai bạn / nhảy dây.', type: 'single_choice', opts: [['A', 'Thi hai bạn nhảy dây.'], ['B', 'Hai bạn thi nhảy dây.'], ['C', 'Nhảy dây hai bạn thi.']], correct: 'B' },
  { text: 'Đọc đoạn: "Nai con nhìn thấy con gì bé nhỏ, thân đầy gai nhọn trên bãi cỏ. Nó chạy về nhà, hổn hển kể cho mẹ nghe. Nai mẹ tủm tỉm: \'Bạn nhím đấy, con ạ.\'" — Nai con nhìn thấy con vật nào?', type: 'single_choice', opts: [['A', 'Con thỏ'], ['B', 'Con nhím'], ['C', 'Con sóc']], correct: 'B' },
  { text: 'Con vật Nai con nhìn thấy có đặc điểm gì?', type: 'single_choice', opts: [['A', 'Có đôi tai rất dài'], ['B', 'Có bộ lông màu trắng'], ['C', 'Thân đầy gai nhọn']], correct: 'C' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Hai bạn thi nhảy dây" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Hai bạn thi nhảy dây", có bao nhiêu tiếng chứa các vần ai, ay, ây?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'C' },
  { text: 'Những tiếng nào chứa vần mới trong câu "Hai bạn thi nhảy dây"?', type: 'single_choice', opts: [['A', 'hai, nhảy, dây'], ['B', 'bạn, thi, dây'], ['C', 'hai, bạn, nhảy']], correct: 'A' },
  { text: 'Trong câu "Nai con nhìn thấy con gì bé nhỏ, thân đầy gai nhọn trên bãi cỏ." có bao nhiêu tiếng chứa các vần ai, ay, ây?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'C' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Nai con nhìn thấy con gì bé nhỏ, thân đầy gai nhọn trên bãi cỏ."?', type: 'single_choice', opts: [['A', 'con, nhìn, bé, nhỏ'], ['B', 'nai, thấy, đầy, gai, bãi'], ['C', 'thân, nhọn, trên, cỏ']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần ai, ay, ây?', type: 'single_choice', opts: [['A', 'Hai bạn chạy dưới đám mây.'], ['B', 'Bé hái một chùm vải.'], ['C', 'Bố lái máy cày.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "chùm v… – m… cày – đám m…"', type: 'single_choice', opts: [['A', 'ai – ay – ây'], ['B', 'ay – ây – ai'], ['C', 'ây – ai – ay']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Hai bạn thi nhảy dâi."?', type: 'single_choice', opts: [['A', 'hai'], ['B', 'nhảy'], ['C', 'dâi']], correct: 'C' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc về Nai con: (1) Nai mẹ cho biết đó là bạn nhím. (2) Nai con nhìn thấy một con vật bé nhỏ. (3) Nai con chạy về nhà. (4) Nai con kể chuyện cho mẹ nghe.', type: 'single_choice', opts: [['A', '2 – 3 – 4 – 1'], ['B', '3 – 2 – 1 – 4'], ['C', '4 – 1 – 2 – 3']], correct: 'A' },
  { text: 'Khi dây diều của em vô tình vướng vào người khác, em nên làm gì?', type: 'single_choice', opts: [['A', 'Nói xin lỗi và nhanh chóng gỡ dây'], ['B', 'Bỏ chạy khỏi đó'], ['C', 'Đổ lỗi cho người khác']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 38: Vần ai, ay, ây (lesson 752)…');
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
