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

const LESSON_ID = 744; // on-tap-va-ke-chuyen-6 (Bài 30: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ ghép "ph".', type: 'single_choice', opts: [['A', 'ph'], ['B', 'qu'], ['C', 'th']], correct: 'A' },
  { text: 'Chọn chữ ghép "qu".', type: 'single_choice', opts: [['A', 'ph'], ['B', 'qu'], ['C', 'ch']], correct: 'B' },
  { text: 'Chọn chữ "v" viết thường.', type: 'single_choice', opts: [['A', 'x'], ['B', 'y'], ['C', 'v']], correct: 'C' },
  { text: 'Chọn chữ "x" viết thường.', type: 'single_choice', opts: [['A', 's'], ['B', 'x'], ['C', 'v']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng ph?', type: 'single_choice', opts: [['A', 'phố'], ['B', 'quê'], ['C', 'xa']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng qu?', type: 'single_choice', opts: [['A', 'vỉa'], ['B', 'quý'], ['C', 'phố']], correct: 'B' },
  { text: 'Chọn từ chỉ khu phố có nhiều ngôi nhà lâu đời.', type: 'single_choice', opts: [['A', 'phố cổ'], ['B', 'quê nhà'], ['C', 'ngõ nhỏ']], correct: 'A' },
  { text: 'Chọn từ chỉ việc đi từ bờ sông này sang bờ sông kia bằng phà.', type: 'single_choice', opts: [['A', 'qua phà'], ['B', 'đi bộ'], ['C', 'đi chợ']], correct: 'A' },
  { text: 'Chọn từ chỉ những viên đá đẹp, có giá trị.', type: 'single_choice', opts: [['A', 'đá nhỏ'], ['B', 'đá quý'], ['C', 'đá vôi']], correct: 'B' },
  { text: 'Nhà của bé ở đâu?', type: 'single_choice', opts: [['A', 'Ở Phú Thọ'], ['B', 'Ở Thủ đô'], ['C', 'Ở bờ đê']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép ph + a được tiếng nào?', type: 'single_choice', opts: [['A', 'pha'], ['B', 'qua'], ['C', 'va']], correct: 'A' },
  { text: 'Ghép qu + a được tiếng nào?', type: 'single_choice', opts: [['A', 'pha'], ['B', 'qua'], ['C', 'xa']], correct: 'B' },
  { text: 'Ghép qu + ê được tiếng nào?', type: 'single_choice', opts: [['A', 'quê'], ['B', 'quơ'], ['C', 'qua']], correct: 'A' },
  { text: 'Ghép v + ê + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'vé'], ['B', 'về'], ['C', 'vẻ']], correct: 'B' },
  { text: 'Ghép x + a được tiếng nào?', type: 'single_choice', opts: [['A', 'xa'], ['B', 'va'], ['C', 'sa']], correct: 'A' },
  { text: 'Ghép x + ư + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'xừ'], ['B', 'xử'], ['C', 'xứ']], correct: 'C' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nhà bé ở Thủ ___.', type: 'single_choice', opts: [['A', 'đô'], ['B', 'đò'], ['C', 'đỏ']], correct: 'A' },
  { text: 'Điền địa danh thích hợp vào chỗ trống: Quê bé ở ___ ___.', type: 'single_choice', opts: [['A', 'Bờ Hồ'], ['B', 'Phú Thọ'], ['C', 'phố cổ']], correct: 'B' },
  { text: 'Thủ đô có địa điểm nào được nhắc đến trong bài?', type: 'single_choice', opts: [['A', 'Bờ Hồ'], ['B', 'Bờ đê'], ['C', 'Nhà ga']], correct: 'A' },
  { text: 'Phú Thọ có những cây gì?', type: 'single_choice', opts: [['A', 'Có chè và cọ'], ['B', 'Có dừa và khế'], ['C', 'Có tre và na']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ph', type: 'multiple_choice', opts: [['A', 'phố'], ['B', 'phà'], ['C', 'Phú'], ['D', 'quê'], ['E', 'vỉa']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng qu', type: 'multiple_choice', opts: [['A', 'qua'], ['B', 'quê'], ['C', 'quý'], ['D', 'cổ'], ['E', 'xa']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng v', type: 'multiple_choice', opts: [['A', 'vỉa'], ['B', 'vũ'], ['C', 'về'], ['D', 'xứ'], ['E', 'xa']], correct: ['A', 'B', 'C'] },
  { text: 'Dòng nào chỉ gồm các tiếng bắt đầu bằng x?', type: 'single_choice', opts: [['A', 'xa, xứ, xở'], ['B', 'về, vỉa, vũ'], ['C', 'phố, phà, Phú']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: ở Thủ đô – Nhà bé', type: 'single_choice', opts: [['A', 'Ở Thủ đô nhà bé.'], ['B', 'Nhà bé ở Thủ đô.'], ['C', 'Thủ đô ở nhà bé.']], correct: 'B' },
  { text: 'Đoạn đọc trong bài có bao nhiêu câu?', type: 'single_choice', opts: [['A', '4 câu'], ['B', '5 câu'], ['C', '6 câu']], correct: 'C' },
  { text: 'Mùa thu đến, đàn kiến làm gì?', type: 'single_choice', opts: [['A', 'Chăm chỉ tìm kiếm và tích trữ thức ăn'], ['B', 'Chỉ ca hát và vui chơi'], ['C', 'Ngủ dưới gốc cây']], correct: 'A' },
  { text: 'Trong khi đàn kiến làm việc, dế mèn làm gì?', type: 'single_choice', opts: [['A', 'Cùng kiến mang thức ăn'], ['B', 'Mải vui chơi và ca hát'], ['C', 'Xây một ngôi nhà mới']], correct: 'B' },
  { text: 'Sắp xếp các sự việc theo đúng trình tự câu chuyện: (1) Mùa đông đến, dế mèn đói và tìm đến đàn kiến. (2) Đàn kiến chăm chỉ tích trữ thức ăn. (3) Dế mèn mải ca hát, không chuẩn bị thức ăn. (4) Dế mèn hiểu ra và cùng đàn kiến chăm chỉ làm việc.', type: 'single_choice', opts: [['A', '2 – 3 – 1 – 4'], ['B', '3 – 2 – 4 – 1'], ['C', '1 – 2 – 3 – 4']], correct: 'A' },
  { text: 'Câu chuyện "Kiến và dế mèn" nhắc em điều gì?', type: 'single_choice', opts: [['A', 'Cần chăm chỉ, biết chuẩn bị cho tương lai và sửa chữa sai lầm'], ['B', 'Chỉ nên vui chơi, không cần làm việc'], ['C', 'Khi gặp khó khăn chỉ cần chờ người khác giúp']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 30: Ôn tập và kể chuyện (lesson 744)…');
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
