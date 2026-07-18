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

const LESSON_ID = 758; // van-iu-uu (Bài 44: Vần iu, ưu) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'iu, ưu'], ['B', 'ui, ưi'], ['C', 'au, âu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần iu?', type: 'single_choice', opts: [['A', 'dịu'], ['B', 'hưu'], ['C', 'lựu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ưu?', type: 'single_choice', opts: [['A', 'xíu'], ['B', 'rìu'], ['C', 'hưu']], correct: 'C' },
  { text: 'Tiếng "rìu" chứa vần nào?', type: 'single_choice', opts: [['A', 'iu'], ['B', 'ưu'], ['C', 'ui']], correct: 'A' },
  { text: 'Vật có cán gỗ, lưỡi bằng kim loại trong bài là gì?', type: 'single_choice', opts: [['A', 'Cái rìu'], ['B', 'Cái kéo'], ['C', 'Cái búa']], correct: 'A' },
  { text: 'Vật dùng để địu em bé trong bài là gì?', type: 'single_choice', opts: [['A', 'Cái túi'], ['B', 'Cái địu'], ['C', 'Cái mũ']], correct: 'B' },
  { text: 'Quả có vỏ màu đỏ, bên trong có nhiều hạt là quả gì?', type: 'single_choice', opts: [['A', 'Quả lựu'], ['B', 'Quả táo'], ['C', 'Quả cam']], correct: 'A' },
  { text: 'Con vật có bộ lông trắng, xoăn trong bài là con gì?', type: 'single_choice', opts: [['A', 'Con dê'], ['B', 'Con cừu'], ['C', 'Con bò']], correct: 'B' },
  { text: 'Cụm từ "nghỉ hưu" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Bà trong bài đã làm gì?', type: 'single_choice', opts: [['A', 'Đã nghỉ hưu'], ['B', 'Đang đi học'], ['C', 'Đang làm bác sĩ']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "dịu"?', type: 'single_choice', opts: [['A', 'rìu'], ['B', 'hưu'], ['C', 'cừu']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "hưu"?', type: 'single_choice', opts: [['A', 'xíu'], ['B', 'cừu'], ['C', 'địu']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần iu?', type: 'single_choice', opts: [['A', 'dịu, rìu, xíu'], ['B', 'hưu, mưu, lựu'], ['C', 'cừu, hưu, bịu']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ưu?', type: 'single_choice', opts: [['A', 'rìu, dịu, địu'], ['B', 'hưu, mưu, lựu'], ['C', 'xíu, bịu, dịu']], correct: 'B' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Bà đã nghỉ ___ mà luôn bận bịu."', type: 'single_choice', opts: [['A', 'hưu'], ['B', 'rìu'], ['C', 'dịu']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Bà / mà luôn bận bịu / đã nghỉ hưu.', type: 'single_choice', opts: [['A', 'Bà đã nghỉ hưu mà luôn bận bịu.'], ['B', 'Đã nghỉ hưu bà mà luôn bận bịu.'], ['C', 'Mà luôn bận bịu bà đã nghỉ hưu.']], correct: 'A' },
  { text: 'Đọc đoạn: "Bà đã nghỉ hưu. Ngày ngày, bà đi chợ, nấu ăn và chăm lo cho con cháu. Mỗi lần đưa bé đi dạo, bà hay kể về ngày xưa. Lời bà dịu êm." — Ngày ngày, bà làm những việc gì?', type: 'single_choice', opts: [['A', 'Đi chợ, nấu ăn và chăm lo cho con cháu'], ['B', 'Đi học và làm bài tập'], ['C', 'Đi chơi cùng bạn bè']], correct: 'A' },
  { text: 'Khi đưa bé đi dạo, bà thường làm gì?', type: 'single_choice', opts: [['A', 'Kể về ngày xưa'], ['B', 'Hát trên sân khấu'], ['C', 'Mua nhiều đồ chơi']], correct: 'A' },
  { text: 'Lời của bà được miêu tả như thế nào?', type: 'single_choice', opts: [['A', 'Dịu êm'], ['B', 'Rất to'], ['C', 'Giận dữ']], correct: 'A' },
  { text: 'Trong bức tranh cuối bài, bà đang giúp cháu làm gì?', type: 'single_choice', opts: [['A', 'Học bài'], ['B', 'Nấu cơm'], ['C', 'Đá bóng']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Bà đã nghỉ hưu mà luôn bận bịu" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Bà đã nghỉ hưu mà luôn bận bịu", có bao nhiêu tiếng chứa vần iu hoặc ưu?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Những tiếng nào chứa vần mới trong câu "Bà đã nghỉ hưu mà luôn bận bịu"?', type: 'single_choice', opts: [['A', 'bà, nghỉ'], ['B', 'hưu, bịu'], ['C', 'luôn, bận']], correct: 'B' },
  { text: 'Câu "Lời bà dịu êm" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về bà, có bao nhiêu tiếng chứa vần iu hoặc ưu?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Câu nào có cả vần iu và vần ưu?', type: 'single_choice', opts: [['A', 'Bà nghỉ hưu và nói lời dịu dàng.'], ['B', 'Bé cầm cái rìu.'], ['C', 'Trên đồng có một con cừu.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "cái r… – quả l… – con c…"', type: 'single_choice', opts: [['A', 'iu – ưu – ưu'], ['B', 'ưu – iu – iu'], ['C', 'iu – iu – ưu']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Bà đã nghỉ hiu mà luôn bận bịu."?', type: 'single_choice', opts: [['A', 'nghỉ'], ['B', 'hiu'], ['C', 'bịu']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Bà kể chuyện ngày xưa cho bé nghe. (2) Bà đã nghỉ hưu. (3) Bà đi chợ, nấu ăn và chăm lo cho gia đình.', type: 'single_choice', opts: [['A', '2 – 3 – 1'], ['B', '1 – 2 – 3'], ['C', '3 – 1 – 2']], correct: 'A' },
  { text: 'Qua bài đọc, em nên làm gì để thể hiện tình yêu với bà?', type: 'single_choice', opts: [['A', 'Kính trọng, quan tâm và giúp đỡ bà'], ['B', 'Để bà làm hết mọi việc'], ['C', 'Không nghe lời bà']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 44: Vần iu, ưu (lesson 758)…');
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
