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

const LESSON_ID = 731; // chu-cai-g-gi (Bài 17: G g – Gi gi) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "g" viết thường.', type: 'single_choice', opts: [['A', 'q'], ['B', 'g'], ['C', 'd']], correct: 'B' },
  { text: 'Chọn chữ "G" viết hoa.', type: 'single_choice', opts: [['A', 'C'], ['B', 'Q'], ['C', 'G']], correct: 'C' },
  { text: 'Chọn chữ ghép "gi".', type: 'single_choice', opts: [['A', 'gi'], ['B', 'g'], ['C', 'gh']], correct: 'A' },
  { text: 'Chọn chữ ghép "Gi" viết hoa.', type: 'single_choice', opts: [['A', 'Gh'], ['B', 'Gi'], ['C', 'G']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ g?', type: 'single_choice', opts: [['A', 'gà'], ['B', 'già'], ['C', 'giỏ']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ gi?', type: 'single_choice', opts: [['A', 'gỗ'], ['B', 'gà'], ['C', 'giỏ']], correct: 'C' },
  { text: 'Chọn từ đúng với hình con gà gô.', type: 'single_choice', opts: [['A', 'gà gô'], ['B', 'gà giò'], ['C', 'cò gô']], correct: 'A' },
  { text: 'Chọn từ đúng với hình bàn ghế bằng gỗ.', type: 'single_choice', opts: [['A', 'đồ gỗ'], ['B', 'giá đỗ'], ['C', 'giỏ đồ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình những cọng giá.', type: 'single_choice', opts: [['A', 'giá đỗ'], ['B', 'đồ gỗ'], ['C', 'giỏ đỗ']], correct: 'A' },
  { text: 'Trong câu "Hà có giỏ trứng gà.", Hà có gì?', type: 'single_choice', opts: [['A', 'Một giỏ trứng gà'], ['B', 'Một giỏ cá'], ['C', 'Một giỏ quả']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép g + a được tiếng nào?', type: 'single_choice', opts: [['A', 'ga'], ['B', 'gia'], ['C', 'gi']], correct: 'A' },
  { text: 'Thêm thanh huyền vào tiếng "ga" được tiếng nào?', type: 'single_choice', opts: [['A', 'gá'], ['B', 'gả'], ['C', 'gà']], correct: 'C' },
  { text: 'Ghép g + ô + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'gỗ'], ['B', 'gổ'], ['C', 'gố']], correct: 'A' },
  { text: 'Ghép gi + o + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'giò'], ['B', 'giỏ'], ['C', 'gió']], correct: 'B' },
  { text: 'Ghép gi + a + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'già'], ['B', 'giá'], ['C', 'giả']], correct: 'B' },
  { text: 'Tiếng nào có thanh huyền?', type: 'single_choice', opts: [['A', 'gà'], ['B', 'gỗ'], ['C', 'giỏ']], correct: 'A' },
  { text: 'Tiếng nào có thanh ngã?', type: 'single_choice', opts: [['A', 'giá'], ['B', 'giò'], ['C', 'giỗ']], correct: 'C' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Hà có ___ trứng gà.', type: 'single_choice', opts: [['A', 'gỗ'], ['B', 'giỏ'], ['C', 'giá']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Bà che ___ cho ba chú gà.', type: 'single_choice', opts: [['A', 'gió'], ['B', 'giỏ'], ['C', 'gỗ']], correct: 'A' },
  { text: 'Vì sao bà che chuồng cho ba chú gà?', type: 'single_choice', opts: [['A', 'Vì trời có gió lớn'], ['B', 'Vì bà muốn thả gà đi'], ['C', 'Vì gà đang bơi']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ g', type: 'multiple_choice', opts: [['A', 'gà'], ['B', 'gỗ'], ['C', 'gụ'], ['D', 'giỏ'], ['E', 'giá']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ gi', type: 'multiple_choice', opts: [['A', 'già'], ['B', 'giá'], ['C', 'giò'], ['D', 'giỗ'], ['E', 'gỗ']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Từ nào không cùng nhóm với các từ còn lại?', type: 'single_choice', opts: [['A', 'gà gô'], ['B', 'đồ gỗ'], ['C', 'giá đỗ'], ['D', 'gỗ gụ']], correct: 'C' },
  { text: 'Muốn đổi tiếng "giò" thành tiếng "giỏ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh huyền thành thanh hỏi'], ['B', 'Đổi thanh huyền thành thanh sắc'], ['C', 'Bỏ chữ i']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: giỏ trứng gà – có – Hà', type: 'single_choice', opts: [['A', 'Hà có giỏ trứng gà.'], ['B', 'Giỏ trứng gà có Hà.'], ['C', 'Có Hà giỏ trứng gà.']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: cho ba chú gà – Bà – che gió', type: 'single_choice', opts: [['A', 'Bà che gió cho ba chú gà.'], ['B', 'Ba chú gà che gió cho bà.'], ['C', 'Che gió bà cho ba chú gà.']], correct: 'A' },
  { text: 'Câu "Hà có giỏ trứng gà." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Hà có giỏ trứng gà." có bao nhiêu tiếng bắt đầu bằng g hoặc gi?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Bà che gió cho ba chú gà." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Việc làm nào thể hiện em biết chăm sóc vật nuôi?', type: 'single_choice', opts: [['A', 'Cho vật nuôi ăn, uống và giữ chỗ ở sạch sẽ'], ['B', 'Trêu chọc và đuổi vật nuôi chạy'], ['C', 'Bỏ mặc vật nuôi khi trời mưa gió']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 17: G g – Gi gi (lesson 731)…');
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
