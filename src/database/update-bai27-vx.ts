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

const LESSON_ID = 741; // chu-v-v-x-x (Bài 27: V v – X x) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "v" viết thường.', type: 'single_choice', opts: [['A', 'x'], ['B', 'v'], ['C', 'u']], correct: 'B' },
  { text: 'Chọn chữ "V" viết hoa.', type: 'single_choice', opts: [['A', 'U'], ['B', 'X'], ['C', 'V']], correct: 'C' },
  { text: 'Chọn chữ "x" viết thường.', type: 'single_choice', opts: [['A', 'x'], ['B', 'v'], ['C', 's']], correct: 'A' },
  { text: 'Chọn chữ "X" viết hoa.', type: 'single_choice', opts: [['A', 'K'], ['B', 'X'], ['C', 'V']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ v?', type: 'single_choice', opts: [['A', 'xe'], ['B', 'vẽ'], ['C', 'xã']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ x?', type: 'single_choice', opts: [['A', 'vở'], ['B', 'vua'], ['C', 'xe']], correct: 'C' },
  { text: 'Chọn từ đúng với hình quyển vở dùng để vẽ.', type: 'single_choice', opts: [['A', 'vở vẽ'], ['B', 'vở viết'], ['C', 'lá thư']], correct: 'A' },
  { text: 'Chọn từ đúng với hình phần đường dành cho người đi bộ.', type: 'single_choice', opts: [['A', 'bờ hồ'], ['B', 'vỉa hè'], ['C', 'ngõ nhỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình chiếc xe dùng để lu đường.', type: 'single_choice', opts: [['A', 'xe lu'], ['B', 'xe đạp'], ['C', 'ô tô']], correct: 'A' },
  { text: 'Trong câu "Hà vẽ xe đạp.", Hà vẽ gì?', type: 'single_choice', opts: [['A', 'Xe đạp'], ['B', 'Xe lu'], ['C', 'Quả dừa']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép v + e + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'vé'], ['B', 'vẽ'], ['C', 'vẻ']], correct: 'B' },
  { text: 'Ghép x + e được tiếng nào?', type: 'single_choice', opts: [['A', 've'], ['B', 'xe'], ['C', 'xê']], correct: 'B' },
  { text: 'Ghép v + ơ + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'vở'], ['B', 'vờ'], ['C', 'vỡ']], correct: 'A' },
  { text: 'Ghép x + ư + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'xừ'], ['B', 'xứ'], ['C', 'xử']], correct: 'B' },
  { text: 'Tiếng nào có thanh ngã?', type: 'single_choice', opts: [['A', 'vẽ'], ['B', 'xe'], ['C', 'vua']], correct: 'A' },
  { text: 'Tiếng nào có thanh hỏi?', type: 'single_choice', opts: [['A', 'xã'], ['B', 'xứ'], ['C', 'vở']], correct: 'C' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Hà ___ xe đạp.', type: 'single_choice', opts: [['A', 'vẽ'], ['B', 'xe'], ['C', 'xứ']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nghỉ hè, bố mẹ cho Hà ___ quê.', type: 'single_choice', opts: [['A', 'vẽ'], ['B', 'về'], ['C', 'xe']], correct: 'B' },
  { text: 'Quê Hà là xứ sở của cây gì?', type: 'single_choice', opts: [['A', 'Cây khế'], ['B', 'Cây dừa'], ['C', 'Cây tre']], correct: 'B' },
  { text: 'Hình ảnh nào thể hiện thành phố?', type: 'single_choice', opts: [['A', 'Nơi có nhiều tòa nhà, ô tô và xe buýt'], ['B', 'Nơi có ruộng, ao và xe bò'], ['C', 'Nơi có đàn trâu đang gặm cỏ']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ v', type: 'multiple_choice', opts: [['A', 'vẽ'], ['B', 'vở'], ['C', 'vua'], ['D', 'xe'], ['E', 'vỉa']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ x', type: 'multiple_choice', opts: [['A', 'xe'], ['B', 'xứ'], ['C', 'xưa'], ['D', 'xã'], ['E', 'vẽ']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'vẽ'], ['B', 'vở'], ['C', 'vua'], ['D', 'xe']], correct: 'D' },
  { text: 'Muốn đổi tiếng "ve" thành tiếng "vẽ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh ngã'], ['B', 'Thêm thanh sắc'], ['C', 'Đổi chữ v thành chữ x']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: xe đạp – Hà – vẽ', type: 'single_choice', opts: [['A', 'Xe đạp vẽ Hà.'], ['B', 'Hà vẽ xe đạp.'], ['C', 'Vẽ Hà xe đạp.']], correct: 'B' },
  { text: 'Câu "Hà vẽ xe đạp." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong câu "Hà vẽ xe đạp." có bao nhiêu tiếng bắt đầu bằng v hoặc x?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Đoạn "Nghỉ hè, bố mẹ cho Hà về quê. Quê Hà là xứ sở của dừa." có bao nhiêu câu?', type: 'single_choice', opts: [['A', '1 câu'], ['B', '2 câu'], ['C', '3 câu']], correct: 'B' },
  { text: 'Đặc điểm nào thường thuộc về nông thôn?', type: 'single_choice', opts: [['A', 'Có ruộng đồng, ao hồ và nhiều cây xanh'], ['B', 'Có nhiều nhà cao tầng và xe buýt'], ['C', 'Có nhiều nút giao thông đông đúc']], correct: 'A' },
  { text: 'Khi đi bộ ở thành phố, em nên làm gì?', type: 'single_choice', opts: [['A', 'Đi trên vỉa hè và sang đường đúng nơi quy định'], ['B', 'Chạy chơi giữa lòng đường'], ['C', 'Tự ý băng qua đường đông xe']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 27: V v – X x (lesson 741)…');
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
