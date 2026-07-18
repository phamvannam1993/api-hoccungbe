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

const LESSON_ID = 737; // chu-th-van-ia (Bài 23: Th th – vần ia) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ ghép "th" viết thường.', type: 'single_choice', opts: [['A', 'ch'], ['B', 'th'], ['C', 'tr']], correct: 'B' },
  { text: 'Chọn chữ ghép "Th" viết hoa.', type: 'single_choice', opts: [['A', 'Th'], ['B', 'Tr'], ['C', 'Ch']], correct: 'A' },
  { text: 'Chọn vần "ia".', type: 'single_choice', opts: [['A', 'ai'], ['B', 'ia'], ['C', 'iê']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng th?', type: 'single_choice', opts: [['A', 'chia'], ['B', 'thu'], ['C', 'dĩa']], correct: 'B' },
  { text: 'Tiếng nào có vần ia?', type: 'single_choice', opts: [['A', 'thơ'], ['B', 'thẻ'], ['C', 'chia']], correct: 'C' },
  { text: 'Chọn từ đúng với hình ảnh thành phố Hà Nội.', type: 'single_choice', opts: [['A', 'thủ đô'], ['B', 'chợ cá'], ['C', 'nhà ga']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc phong bì.', type: 'single_choice', opts: [['A', 'lá thư'], ['B', 'lá hẹ'], ['C', 'lá khô']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc thìa và chiếc dĩa.', type: 'single_choice', opts: [['A', 'thìa dĩa'], ['B', 'lá tía tô'], ['C', 'cá trê']], correct: 'A' },
  { text: 'Chọn từ đúng với hình lá tía tô.', type: 'single_choice', opts: [['A', 'lá me'], ['B', 'lá tía tô'], ['C', 'lá nho']], correct: 'B' },
  { text: 'Trong câu "Trung thu, bé được chia quà.", bé được nhận gì?', type: 'single_choice', opts: [['A', 'Được nhận quà'], ['B', 'Được nhận cá'], ['C', 'Được nhận sách']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép th + u được tiếng nào?', type: 'single_choice', opts: [['A', 'thu'], ['B', 'chu'], ['C', 'khu']], correct: 'A' },
  { text: 'Ghép ch + ia được tiếng nào?', type: 'single_choice', opts: [['A', 'thia'], ['B', 'chia'], ['C', 'chua']], correct: 'B' },
  { text: 'Ghép th + ia được tiếng nào?', type: 'single_choice', opts: [['A', 'thia'], ['B', 'thìa'], ['C', 'chia']], correct: 'A' },
  { text: 'Thêm thanh huyền vào tiếng "thia" được tiếng nào?', type: 'single_choice', opts: [['A', 'thía'], ['B', 'thỉa'], ['C', 'thìa']], correct: 'C' },
  { text: 'Tiếng nào có thanh sắc?', type: 'single_choice', opts: [['A', 'mía'], ['B', 'dĩa'], ['C', 'thìa']], correct: 'A' },
  { text: 'Tiếng nào có thanh ngã?', type: 'single_choice', opts: [['A', 'thìa'], ['B', 'dĩa'], ['C', 'mía']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Trung ___, bé được chia quà.', type: 'single_choice', opts: [['A', 'thư'], ['B', 'thu'], ['C', 'thủ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Bé ___ thìa, chia dĩa cho cả nhà.', type: 'single_choice', opts: [['A', 'chia'], ['B', 'thia'], ['C', 'thu']], correct: 'A' },
  { text: 'Thìa dĩa to được dành cho ai?', type: 'single_choice', opts: [['A', 'Cho bé'], ['B', 'Cho bố mẹ'], ['C', 'Cho bạn bè']], correct: 'B' },
  { text: 'Thìa dĩa nhỏ được dành cho ai?', type: 'single_choice', opts: [['A', 'Cho bé'], ['B', 'Cho bố mẹ'], ['C', 'Cho ông bà']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng th', type: 'multiple_choice', opts: [['A', 'thu'], ['B', 'thẻ'], ['C', 'thơ'], ['D', 'chia'], ['E', 'thọ']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng có vần ia', type: 'multiple_choice', opts: [['A', 'chia'], ['B', 'thìa'], ['C', 'dĩa'], ['D', 'mía'], ['E', 'thu']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'chia'], ['B', 'dĩa'], ['C', 'mía'], ['D', 'thơ']], correct: 'D' },
  { text: 'Muốn đổi tiếng "thia" thành tiếng "thìa", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh huyền'], ['B', 'Thêm thanh sắc'], ['C', 'Đổi th thành ch']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: bé – được chia quà – Trung thu', type: 'single_choice', opts: [['A', 'Bé Trung thu được chia quà.'], ['B', 'Trung thu, bé được chia quà.'], ['C', 'Được chia quà Trung thu bé.']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: cho cả nhà – Bé – chia thìa, chia dĩa', type: 'single_choice', opts: [['A', 'Bé chia thìa, chia dĩa cho cả nhà.'], ['B', 'Cả nhà chia thìa, chia dĩa cho bé.'], ['C', 'Chia thìa bé cho cả nhà chia dĩa.']], correct: 'A' },
  { text: 'Câu "Trung thu, bé được chia quà." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Bé chia thìa, chia dĩa cho cả nhà." có bao nhiêu tiếng chứa vần ia?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'C' },
  { text: 'Đoạn đọc về việc chia thìa dĩa gồm bao nhiêu câu?', type: 'single_choice', opts: [['A', '2 câu'], ['B', '3 câu'], ['C', '4 câu']], correct: 'B' },
  { text: 'Khi cô giáo tặng em một món quà, em nên nói gì?', type: 'single_choice', opts: [['A', 'Em cảm ơn cô ạ!'], ['B', 'Cô tặng thêm cho em đi ạ!'], ['C', 'Em nhận quà nhưng không cần nói gì.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 23: Th th – vần ia (lesson 737)…');
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
