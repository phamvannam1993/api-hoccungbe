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

const LESSON_ID = 742; // chu-y-y (Bài 28: Y y) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "y" viết thường.', type: 'single_choice', opts: [['A', 'v'], ['B', 'y'], ['C', 'u']], correct: 'B' },
  { text: 'Chọn chữ "Y" viết hoa.', type: 'single_choice', opts: [['A', 'V'], ['B', 'X'], ['C', 'Y']], correct: 'C' },
  { text: 'Chữ Y và chữ y có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Tiếng nào có chứa chữ y?', type: 'single_choice', opts: [['A', 'quý'], ['B', 'quê'], ['C', 'qua']], correct: 'A' },
  { text: 'Tiếng nào chỉ suy nghĩ hoặc điều định nói?', type: 'single_choice', opts: [['A', 'ý'], ['B', 'y'], ['C', 'quy']], correct: 'A' },
  { text: 'Chọn từ đúng với hình người làm việc trong ngành y tế.', type: 'single_choice', opts: [['A', 'y tá'], ['B', 'cô giáo'], ['C', 'thợ xây']], correct: 'A' },
  { text: 'Chọn từ đúng với hình những bông hoa màu vàng.', type: 'single_choice', opts: [['A', 'hoa hồng'], ['B', 'dã quỳ'], ['C', 'hoa sen']], correct: 'B' },
  { text: 'Chọn từ đúng với hình những viên đá đẹp, có giá trị.', type: 'single_choice', opts: [['A', 'đá quý'], ['B', 'đá nhỏ'], ['C', 'đá vôi']], correct: 'A' },
  { text: 'Trong câu "Thời gian quý hơn vàng bạc.", điều gì quý hơn vàng bạc?', type: 'single_choice', opts: [['A', 'Thời gian'], ['B', 'Đá quý'], ['C', 'Quà tặng']], correct: 'A' },
  { text: 'Tiếng nào trong câu "Thời gian quý hơn vàng bạc." có chứa chữ y?', type: 'single_choice', opts: [['A', 'thời'], ['B', 'quý'], ['C', 'bạc']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép qu + y được tiếng nào?', type: 'single_choice', opts: [['A', 'quê'], ['B', 'quy'], ['C', 'quà']], correct: 'B' },
  { text: 'Ghép qu + y + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'quỳ'], ['B', 'quý'], ['C', 'quỹ']], correct: 'A' },
  { text: 'Ghép qu + y + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'quỵ'], ['B', 'quỳ'], ['C', 'quý']], correct: 'C' },
  { text: 'Ghép qu + y + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'quỹ'], ['B', 'quỷ'], ['C', 'quỵ']], correct: 'A' },
  { text: 'Ghép qu + y + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'quỳ'], ['B', 'quỵ'], ['C', 'quý']], correct: 'B' },
  { text: 'Tiếng nào có thanh sắc?', type: 'single_choice', opts: [['A', 'quỳ'], ['B', 'quý'], ['C', 'quỹ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Thời gian ___ hơn vàng bạc.', type: 'single_choice', opts: [['A', 'quỳ'], ['B', 'quý'], ['C', 'quỹ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào tên loài hoa: Dã ___', type: 'single_choice', opts: [['A', 'quý'], ['B', 'quỵ'], ['C', 'quỳ']], correct: 'C' },
  { text: 'Điền tiếng thích hợp vào tên đồ vật: Đá ___', type: 'single_choice', opts: [['A', 'quý'], ['B', 'quỳ'], ['C', 'quy']], correct: 'A' },
  { text: 'Dì Kha kể cho Hà nghe về ai?', type: 'single_choice', opts: [['A', 'Về bà'], ['B', 'Về cô giáo'], ['C', 'Về bạn bè']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các từ có chứa chữ y', type: 'multiple_choice', opts: [['A', 'y tá'], ['B', 'dã quỳ'], ['C', 'đá quý'], ['D', 'lá hẹ'], ['E', 'cá rô']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng có chứa chữ y', type: 'multiple_choice', opts: [['A', 'quy'], ['B', 'quỳ'], ['C', 'quý'], ['D', 'quỹ'], ['E', 'quỵ']], correct: ['A', 'B', 'C', 'D', 'E'] },
  { text: 'Từ nào không cùng nhóm với các từ còn lại?', type: 'single_choice', opts: [['A', 'y tá'], ['B', 'dã quỳ'], ['C', 'đá quý'], ['D', 'nhà gỗ']], correct: 'D' },
  { text: 'Muốn đổi tiếng "quy" thành tiếng "quý", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh sắc'], ['B', 'Thêm thanh huyền'], ['C', 'Thêm thanh hỏi']], correct: 'A' },
  { text: 'Muốn đổi tiếng "quý" thành tiếng "quỳ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh sắc thành thanh huyền'], ['B', 'Đổi thanh sắc thành thanh ngã'], ['C', 'Bỏ chữ y']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: quý hơn – Thời gian – vàng bạc', type: 'single_choice', opts: [['A', 'Thời gian quý hơn vàng bạc.'], ['B', 'Vàng bạc thời gian quý hơn.'], ['C', 'Quý hơn thời gian vàng bạc.']], correct: 'A' },
  { text: 'Câu "Thời gian quý hơn vàng bạc." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Đoạn "Mẹ và Hà ghé nhà dì Kha. Dì kể cho Hà nghe về bà. Hà chú ý nghe dì kể." có bao nhiêu câu?', type: 'single_choice', opts: [['A', '2 câu'], ['B', '3 câu'], ['C', '4 câu']], correct: 'B' },
  { text: 'Khi dì Kha kể chuyện, Hà làm gì?', type: 'single_choice', opts: [['A', 'Hà chú ý nghe dì kể'], ['B', 'Hà chạy ra sân chơi'], ['C', 'Hà ngủ trên ghế']], correct: 'A' },
  { text: 'Khi bạn che ô giúp em đi dưới trời mưa, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cảm ơn bạn đã giúp mình!'], ['B', 'Bạn phải che ô cho mình!'], ['C', 'Mình không cần nói gì.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 28: Y y (lesson 742)…');
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
