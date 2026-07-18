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

const LESSON_ID = 729; // on-tap-va-ke-chuyen-3 (Bài 15: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "h" viết thường.', type: 'single_choice', opts: [['A', 'k'], ['B', 'h'], ['C', 'l']], correct: 'B' },
  { text: 'Chọn chữ "l" viết thường.', type: 'single_choice', opts: [['A', 'i'], ['B', 'h'], ['C', 'l']], correct: 'C' },
  { text: 'Chọn chữ ghép "ch".', type: 'single_choice', opts: [['A', 'ch'], ['B', 'kh'], ['C', 'h']], correct: 'A' },
  { text: 'Chọn chữ ghép "kh".', type: 'single_choice', opts: [['A', 'k'], ['B', 'kh'], ['C', 'ch']], correct: 'B' },
  { text: 'Nhóm nào chỉ gồm các chữ ghi âm trong bảng ôn tập?', type: 'single_choice', opts: [['A', 'e, ê, i, u, ư'], ['B', 'a, ă, â, o, ô'], ['C', 'm, n, p, q, r']], correct: 'A' },
  { text: 'Chọn từ đúng với hình người đang biểu diễn vui nhộn.', type: 'single_choice', opts: [['A', 'chú hề'], ['B', 'chú khỉ'], ['C', 'cô bé']], correct: 'A' },
  { text: 'Chọn từ đúng với hình khu chợ bán cá.', type: 'single_choice', opts: [['A', 'chợ cá'], ['B', 'bờ hồ'], ['C', 'cá dữ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình những chiếc lá đã khô.', type: 'single_choice', opts: [['A', 'lá hẹ'], ['B', 'lá khô'], ['C', 'lá đỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình phần đất ở cạnh hồ.', type: 'single_choice', opts: [['A', 'bờ đê'], ['B', 'bờ hồ'], ['C', 'bờ đá']], correct: 'B' },
  { text: 'Trong câu "Chị cho bé cá cờ.", chị cho bé con gì?', type: 'single_choice', opts: [['A', 'Cá cờ'], ['B', 'Cá hô'], ['C', 'Cá dữ']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép ch + u được tiếng nào?', type: 'single_choice', opts: [['A', 'chu'], ['B', 'khu'], ['C', 'chi']], correct: 'A' },
  { text: 'Thêm thanh sắc vào tiếng "chu" được tiếng nào?', type: 'single_choice', opts: [['A', 'chù'], ['B', 'chú'], ['C', 'chủ']], correct: 'B' },
  { text: 'Ghép h + ê + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'hề'], ['B', 'hễ'], ['C', 'hệ']], correct: 'A' },
  { text: 'Ghép ch + ơ + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'chờ'], ['B', 'chở'], ['C', 'chợ']], correct: 'C' },
  { text: 'Ghép kh + ô được tiếng nào?', type: 'single_choice', opts: [['A', 'khô'], ['B', 'kho'], ['C', 'khơ']], correct: 'A' },
  { text: 'Ghép h + e + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'hè'], ['B', 'hẹ'], ['C', 'hẻ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Chị ___ bé cá cờ.', type: 'single_choice', opts: [['A', 'cho'], ['B', 'chợ'], ['C', 'che']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Dì Kha cho Hà đi ___.', type: 'single_choice', opts: [['A', 'hồ'], ['B', 'chợ'], ['C', 'khế']], correct: 'B' },
  { text: 'Cụm từ nào là nội dung luyện viết của bài?', type: 'single_choice', opts: [['A', 'cá kho khế'], ['B', 'cá cờ'], ['C', 'cá hô']], correct: 'A' },
  { text: 'Trong cụm từ "cá kho khế", những tiếng nào bắt đầu bằng kh?', type: 'single_choice', opts: [['A', 'cá và kho'], ['B', 'kho và khế'], ['C', 'cá và khế']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ch', type: 'multiple_choice', opts: [['A', 'chú'], ['B', 'chợ'], ['C', 'che'], ['D', 'khô'], ['E', 'cho']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng kh', type: 'multiple_choice', opts: [['A', 'khô'], ['B', 'kho'], ['C', 'khế'], ['D', 'Kha'], ['E', 'chợ']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Từ nào không cùng nhóm với các từ còn lại?', type: 'single_choice', opts: [['A', 'chú hề'], ['B', 'chợ cá'], ['C', 'che ô'], ['D', 'lá khô']], correct: 'D' },
  { text: 'Muốn đổi tiếng "cho" thành tiếng "chợ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi chữ o thành ơ và thêm thanh nặng'], ['B', 'Thêm thanh sắc vào chữ o'], ['C', 'Đổi ch thành kh']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: bé – cá cờ – Chị – cho', type: 'single_choice', opts: [['A', 'Chị cho bé cá cờ.'], ['B', 'Bé cho chị cá cờ.'], ['C', 'Cá cờ cho chị bé.']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: đi chợ – Dì Kha – Hà – cho', type: 'single_choice', opts: [['A', 'Hà cho Dì Kha đi chợ.'], ['B', 'Dì Kha cho Hà đi chợ.'], ['C', 'Đi chợ cho Hà Dì Kha.']], correct: 'B' },
  { text: 'Trong tranh đầu tiên của câu chuyện, quạ nhìn thấy gì dưới gốc cây?', type: 'single_choice', opts: [['A', 'Một bình có nước'], ['B', 'Một bể cá'], ['C', 'Một giỏ quả']], correct: 'A' },
  { text: 'Vì sao lúc đầu quạ không uống được nước trong bình?', type: 'single_choice', opts: [['A', 'Vì nước trong bình ở quá thấp, mỏ quạ không tới được'], ['B', 'Vì bình không có nước'], ['C', 'Vì quạ không khát']], correct: 'A' },
  { text: 'Sắp xếp các sự việc theo đúng trình tự câu chuyện: (1) Quạ thả những viên sỏi vào bình. (2) Quạ nhìn thấy một bình nước. (3) Mực nước dâng lên và quạ uống được nước. (4) Quạ không thể đưa mỏ tới chỗ có nước.', type: 'single_choice', opts: [['A', '2 – 4 – 1 – 3'], ['B', '4 – 2 – 3 – 1'], ['C', '2 – 1 – 4 – 3']], correct: 'A' },
  { text: 'Câu chuyện "Con quạ thông minh" nhắc em điều gì?', type: 'single_choice', opts: [['A', 'Khi gặp khó khăn, cần bình tĩnh suy nghĩ và kiên trì tìm cách giải quyết'], ['B', 'Gặp khó khăn thì nên bỏ cuộc'], ['C', 'Chỉ cần chờ người khác đến giúp']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 15: Ôn tập và kể chuyện (lesson 729)…');
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
