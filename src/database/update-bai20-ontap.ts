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

const LESSON_ID = 734; // on-tap-va-ke-chuyen-4 (Bài 20: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "m" viết thường.', type: 'single_choice', opts: [['A', 'n'], ['B', 'm'], ['C', 'h']], correct: 'B' },
  { text: 'Chọn chữ "n" viết thường.', type: 'single_choice', opts: [['A', 'n'], ['B', 'm'], ['C', 'u']], correct: 'A' },
  { text: 'Chọn chữ ghép "gh".', type: 'single_choice', opts: [['A', 'gi'], ['B', 'gh'], ['C', 'nh']], correct: 'B' },
  { text: 'Chọn chữ ghép "nh".', type: 'single_choice', opts: [['A', 'ng'], ['B', 'ngh'], ['C', 'nh']], correct: 'C' },
  { text: 'Chọn chữ ghép "ngh".', type: 'single_choice', opts: [['A', 'ngh'], ['B', 'ng'], ['C', 'nh']], correct: 'A' },
  { text: 'Chọn từ đúng với hình nụ hoa cà.', type: 'single_choice', opts: [['A', 'nụ cà'], ['B', 'củ nghệ'], ['C', 'lá nho']], correct: 'A' },
  { text: 'Chọn từ đúng với hình nhà ga.', type: 'single_choice', opts: [['A', 'nhà gỗ'], ['B', 'nhà ga'], ['C', 'ngõ nhỏ']], correct: 'B' },
  { text: 'Từ nào chỉ thời gian học sinh được nghỉ vào mùa hè?', type: 'single_choice', opts: [['A', 'nghỉ hè'], ['B', 'nghỉ học'], ['C', 'nghỉ trưa']], correct: 'A' },
  { text: 'Chọn từ chỉ một con ngõ nhỏ.', type: 'single_choice', opts: [['A', 'bờ hồ'], ['B', 'ngõ nhỏ'], ['C', 'nhà nhỏ']], correct: 'B' },
  { text: 'Trong câu "Mẹ ghé nhà bà.", ai ghé nhà bà?', type: 'single_choice', opts: [['A', 'Mẹ'], ['B', 'Bé'], ['C', 'Bố']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép gh + e + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'ghè'], ['B', 'ghé'], ['C', 'ghẻ']], correct: 'B' },
  { text: 'Ghép nh + a + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'nhá'], ['B', 'nhả'], ['C', 'nhà']], correct: 'C' },
  { text: 'Ghép ng + o + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'ngõ'], ['B', 'ngỏ'], ['C', 'ngó']], correct: 'A' },
  { text: 'Ghép ngh + i + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'nghĩ'], ['B', 'nghỉ'], ['C', 'nghị']], correct: 'B' },
  { text: 'Ghép gi + a + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'già'], ['B', 'giá'], ['C', 'giả']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Mẹ ___ nhà bà.', type: 'single_choice', opts: [['A', 'ghé'], ['B', 'ghế'], ['C', 'ghi']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nhà bà ở ___ nhỏ.', type: 'single_choice', opts: [['A', 'ngủ'], ['B', 'ngõ'], ['C', 'nghỉ']], correct: 'B' },
  { text: 'Từ nào có tiếng bắt đầu bằng gh?', type: 'single_choice', opts: [['A', 'ghế gỗ'], ['B', 'giá đỗ'], ['C', 'nhà ga']], correct: 'A' },
  { text: 'Từ nào có tiếng bắt đầu bằng ngh?', type: 'single_choice', opts: [['A', 'ngõ nhỏ'], ['B', 'nghỉ hè'], ['C', 'nho nhỏ']], correct: 'B' },
  { text: 'Nhà bà ở đâu?', type: 'single_choice', opts: [['A', 'Ở nhà ga'], ['B', 'Ở ngõ nhỏ'], ['C', 'Ở bờ hồ']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng nh', type: 'multiple_choice', opts: [['A', 'nhà'], ['B', 'nhỏ'], ['C', 'nho'], ['D', 'ngõ'], ['E', 'nghỉ']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ngh', type: 'multiple_choice', opts: [['A', 'nghỉ'], ['B', 'nghệ'], ['C', 'nghe'], ['D', 'ngõ'], ['E', 'ngủ']], correct: ['A', 'B', 'C'] },
  { text: 'Cách viết nào đúng?', type: 'single_choice', opts: [['A', 'ngỉ hè'], ['B', 'nghỉ hè'], ['C', 'nghhỉ hè']], correct: 'B' },
  { text: 'Cụm từ nào được viết đúng?', type: 'single_choice', opts: [['A', 'gế gỗ'], ['B', 'ghế ghỗ'], ['C', 'ghế gỗ']], correct: 'C' },
  { text: 'Sắp xếp các từ thành câu đúng: nhà bà – Mẹ – ghé', type: 'single_choice', opts: [['A', 'Nhà bà mẹ ghé.'], ['B', 'Mẹ ghé nhà bà.'], ['C', 'Ghé mẹ nhà bà.']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: ở ngõ nhỏ – Nhà bà', type: 'single_choice', opts: [['A', 'Nhà bà ở ngõ nhỏ.'], ['B', 'Ở nhà bà ngõ nhỏ.'], ['C', 'Ngõ nhỏ ở nhà bà.']], correct: 'A' },
  { text: 'Ban đầu, cô bé nuôi con vật nào và muốn đổi lấy con gì?', type: 'single_choice', opts: [['A', 'Nuôi gà trống và muốn đổi lấy gà mái'], ['B', 'Nuôi con vịt và muốn đổi lấy con cá'], ['C', 'Nuôi con chó và muốn đổi lấy con mèo']], correct: 'A' },
  { text: 'Cô bé đổi gà mái lấy con vật nào?', type: 'single_choice', opts: [['A', 'Con mèo'], ['B', 'Con vịt'], ['C', 'Con cá']], correct: 'B' },
  { text: 'Khi thấy chú chó nhỏ xinh xắn, cô bé đã làm gì?', type: 'single_choice', opts: [['A', 'Cô bé đổi con vịt lấy chú chó'], ['B', 'Cô bé mang chú chó trả lại'], ['C', 'Cô bé bỏ đi ngay']], correct: 'A' },
  { text: 'Vì sao cuối cùng không có con vật nào ở bên cô bé?', type: 'single_choice', opts: [['A', 'Vì cô bé thường xuyên đổi bạn mới và không biết quý trọng tình bạn'], ['B', 'Vì các con vật đều đi ngủ'], ['C', 'Vì cô bé chuyển đến nhà bà']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 20: Ôn tập và kể chuyện (lesson 734)…');
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
