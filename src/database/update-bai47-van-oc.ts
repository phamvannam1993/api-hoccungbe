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

const LESSON_ID = 761; // van-oc-oc-uc-uc (Bài 47: Vần oc, ôc, uc, ưc) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'oc, ôc, uc, ưc'], ['B', 'ac, ăc, âc'], ['C', 'ao, eo, êu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần oc?', type: 'single_choice', opts: [['A', 'học'], ['B', 'cốc'], ['C', 'cúc']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôc?', type: 'single_choice', opts: [['A', 'sóc'], ['B', 'cốc'], ['C', 'mực']], correct: 'B' },
  { text: 'Tiếng nào chứa vần uc?', type: 'single_choice', opts: [['A', 'lộc'], ['B', 'đức'], ['C', 'cúc']], correct: 'C' },
  { text: 'Tiếng nào chứa vần ưc?', type: 'single_choice', opts: [['A', 'mực'], ['B', 'chục'], ['C', 'học']], correct: 'A' },
  { text: 'Con vật có chiếc đuôi dài, xù trong bài là con gì?', type: 'single_choice', opts: [['A', 'Con sóc'], ['B', 'Con mèo'], ['C', 'Con thỏ']], correct: 'A' },
  { text: 'Vật dùng để đựng nước trong bài là gì?', type: 'single_choice', opts: [['A', 'Cái bát'], ['B', 'Cái cốc'], ['C', 'Cái nồi']], correct: 'B' },
  { text: 'Chiếc xe lớn dùng để đào và xúc đất là gì?', type: 'single_choice', opts: [['A', 'Máy cày'], ['B', 'Máy xúc'], ['C', 'Xe tải']], correct: 'B' },
  { text: 'Con vật sống dưới biển, có nhiều xúc tu là con gì?', type: 'single_choice', opts: [['A', 'Con cá'], ['B', 'Con tôm'], ['C', 'Con mực']], correct: 'C' },
  { text: 'Cụm từ "máy xúc" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "học"?', type: 'single_choice', opts: [['A', 'sóc'], ['B', 'cốc'], ['C', 'cúc']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "cốc"?', type: 'single_choice', opts: [['A', 'chục'], ['B', 'lộc'], ['C', 'mực']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "cúc"?', type: 'single_choice', opts: [['A', 'chục'], ['B', 'đức'], ['C', 'góc']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "mực"?', type: 'single_choice', opts: [['A', 'học'], ['B', 'lộc'], ['C', 'đức']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần oc?', type: 'single_choice', opts: [['A', 'học, sóc, bọc'], ['B', 'cốc, lộc, gốc'], ['C', 'cúc, chục, xúc']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ôc?', type: 'single_choice', opts: [['A', 'học, sóc, mọc'], ['B', 'cốc, lộc, gốc'], ['C', 'đức, mực, rực']], correct: 'B' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Khóm cúc nở hoa vàng ___."', type: 'single_choice', opts: [['A', 'rực'], ['B', 'cốc'], ['C', 'học']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Ở góc vườn / khóm cúc / nở hoa vàng rực.', type: 'single_choice', opts: [['A', 'Khóm cúc ở góc vườn nở hoa vàng rực.'], ['B', 'Nở hoa vàng rực khóm cúc ở góc vườn.'], ['C', 'Ở khóm cúc hoa vàng góc vườn nở rực.']], correct: 'A' },
  { text: 'Đọc đoạn: "Đi học về, Hà thấy mấy khóm cúc đã nở rực rỡ. Hà hái cúc, cắm vào cốc rồi để ngay ngắn trên bàn học. Mẹ tấm tắc khen Hà khéo tay." — Đi học về, Hà nhìn thấy gì?', type: 'single_choice', opts: [['A', 'Mấy khóm cúc đã nở rực rỡ'], ['B', 'Một đàn chim đang bay'], ['C', 'Một cây táo có nhiều quả']], correct: 'A' },
  { text: 'Vì sao mẹ khen Hà?', type: 'single_choice', opts: [['A', 'Vì Hà đọc bài rất to'], ['B', 'Vì Hà khéo tay'], ['C', 'Vì Hà chạy rất nhanh']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Ở góc vườn, cạnh gốc cau, khóm cúc nở hoa vàng rực." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '10 tiếng'], ['B', '11 tiếng'], ['C', '12 tiếng']], correct: 'C' },
  { text: 'Trong câu "Ở góc vườn, cạnh gốc cau, khóm cúc nở hoa vàng rực." có bao nhiêu tiếng chứa các vần oc, ôc, uc, ưc?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Ở góc vườn, cạnh gốc cau, khóm cúc nở hoa vàng rực."?', type: 'single_choice', opts: [['A', 'góc, gốc, cúc, rực'], ['B', 'vườn, cau, khóm, hoa'], ['C', 'cạnh, nở, hoa, vàng']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc về Hà: (1) Hà cắm hoa cúc vào cốc. (2) Mẹ khen Hà khéo tay. (3) Hà thấy những khóm cúc nở rực rỡ. (4) Hà đi học về.', type: 'single_choice', opts: [['A', '4 – 3 – 1 – 2'], ['B', '3 – 4 – 2 – 1'], ['C', '1 – 2 – 4 – 3']], correct: 'A' },
  { text: 'Câu "Hà hái cúc, cắm vào cốc rồi để ngay ngắn trên bàn học." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '11 tiếng'], ['B', '12 tiếng'], ['C', '13 tiếng']], correct: 'C' },
  { text: 'Trong câu "Hà hái cúc, cắm vào cốc rồi để ngay ngắn trên bàn học." có bao nhiêu tiếng chứa các vần oc, ôc, uc, ưc?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả bốn vần oc, ôc, uc, ưc?', type: 'single_choice', opts: [['A', 'Bé học bên gốc cây, ngắm hoa cúc và con mực.'], ['B', 'Hà cắm hoa vào cốc.'], ['C', 'Bé nhìn máy xúc làm việc.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "h… – c… – c… – m…"', type: 'single_choice', opts: [['A', 'oc – ôc – uc – ưc'], ['B', 'ôc – oc – ưc – uc'], ['C', 'uc – ưc – oc – ôc']], correct: 'A' },
  { text: 'Câu nào được viết đúng và có nghĩa phù hợp với bài?', type: 'single_choice', opts: [['A', 'Hà cắm hoa cúc vào cốc.'], ['B', 'Hà cắm hoa cốc vào cúc.'], ['C', 'Hà cấm hoa cúc vào cốc.']], correct: 'A' },
  { text: 'Việc làm nào thể hiện sự say mê?', type: 'single_choice', opts: [['A', 'Chăm chú luyện tập múa cùng cô giáo'], ['B', 'Nói chuyện riêng trong giờ tập'], ['C', 'Bỏ tập để chạy ra ngoài chơi']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 47: Vần oc, ôc, uc, ưc (lesson 761)…');
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
