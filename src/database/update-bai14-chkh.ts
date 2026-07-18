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

const LESSON_ID = 728; // chu-cai-ch-kh (Bài 14: Ch ch – Kh kh) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "ch" viết thường.', type: 'single_choice', opts: [['A', 'ch'], ['B', 'kh'], ['C', 'nh']], correct: 'A' },
  { text: 'Chọn chữ "kh" viết thường.', type: 'single_choice', opts: [['A', 'h'], ['B', 'ch'], ['C', 'kh']], correct: 'C' },
  { text: 'Chọn chữ "Ch" viết hoa.', type: 'single_choice', opts: [['A', 'Kh'], ['B', 'Ch'], ['C', 'Nh']], correct: 'B' },
  { text: 'Chọn chữ "Kh" viết hoa.', type: 'single_choice', opts: [['A', 'Kh'], ['B', 'Ch'], ['C', 'K']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng ch?', type: 'single_choice', opts: [['A', 'khỉ'], ['B', 'chú'], ['C', 'khế']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng kh?', type: 'single_choice', opts: [['A', 'chợ'], ['B', 'chè'], ['C', 'khô']], correct: 'C' },
  { text: 'Chọn từ đúng với hình những chiếc lá đã khô.', type: 'single_choice', opts: [['A', 'lá khô'], ['B', 'lá đỏ'], ['C', 'lá hẹ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con khỉ.', type: 'single_choice', opts: [['A', 'chú khỉ'], ['B', 'chú chó'], ['C', 'chú cá']], correct: 'A' },
  { text: 'Chọn từ đúng với hình khu chợ bán cá.', type: 'single_choice', opts: [['A', 'chợ cá'], ['B', 'chợ hoa'], ['C', 'bờ hồ']], correct: 'A' },
  { text: 'Trong câu "Mấy chú khỉ ăn chuối.", các chú khỉ ăn gì?', type: 'single_choice', opts: [['A', 'Ăn khế'], ['B', 'Ăn chuối'], ['C', 'Ăn cá']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép ch + u được tiếng nào?', type: 'single_choice', opts: [['A', 'chu'], ['B', 'khu'], ['C', 'chi']], correct: 'A' },
  { text: 'Ghép kh + i được tiếng nào?', type: 'single_choice', opts: [['A', 'chi'], ['B', 'khi'], ['C', 'khu']], correct: 'B' },
  { text: 'Thêm thanh hỏi vào tiếng "khi" được tiếng nào?', type: 'single_choice', opts: [['A', 'khí'], ['B', 'khì'], ['C', 'khỉ']], correct: 'C' },
  { text: 'Tiếng nào có thanh huyền?', type: 'single_choice', opts: [['A', 'chè'], ['B', 'chỉ'], ['C', 'chợ']], correct: 'A' },
  { text: 'Tiếng nào có thanh hỏi?', type: 'single_choice', opts: [['A', 'chè'], ['B', 'chỉ'], ['C', 'chợ']], correct: 'B' },
  { text: 'Tiếng nào có thanh nặng?', type: 'single_choice', opts: [['A', 'chợ'], ['B', 'chè'], ['C', 'chỉ']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Mấy ___ khỉ ăn chuối.', type: 'single_choice', opts: [['A', 'chú'], ['B', 'khô'], ['C', 'chợ']], correct: 'A' },
  { text: 'Điền từ thích hợp vào chỗ trống: Chị có cá kho ___.', type: 'single_choice', opts: [['A', 'khế'], ['B', 'chuối'], ['C', 'chè']], correct: 'A' },
  { text: 'Chọn câu phù hợp với tranh các chú khỉ đang ăn chuối.', type: 'single_choice', opts: [['A', 'Mấy chú khỉ ăn chuối.'], ['B', 'Mấy chú khỉ ăn khế.'], ['C', 'Mấy chú khỉ đi chợ.']], correct: 'A' },
  { text: 'Trong câu "Chị có cá kho khế.", chị có món gì?', type: 'single_choice', opts: [['A', 'Cá kho khế'], ['B', 'Cá kho chuối'], ['C', 'Chè khế']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ch', type: 'multiple_choice', opts: [['A', 'chè'], ['B', 'chỉ'], ['C', 'chợ'], ['D', 'khế'], ['E', 'chuối']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng kh', type: 'multiple_choice', opts: [['A', 'khỉ'], ['B', 'khế'], ['C', 'khô'], ['D', 'chú'], ['E', 'kho']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'chè'], ['B', 'chợ'], ['C', 'khế'], ['D', 'chuối']], correct: 'C' },
  { text: 'Muốn đổi tiếng "khi" thành tiếng "khỉ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh hỏi'], ['B', 'Thêm thanh sắc'], ['C', 'Đổi kh thành ch']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: ăn chuối – Mấy chú khỉ', type: 'single_choice', opts: [['A', 'Ăn chuối mấy chú khỉ.'], ['B', 'Mấy chú khỉ ăn chuối.'], ['C', 'Chuối ăn mấy chú khỉ.']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: cá kho khế – có – Chị', type: 'single_choice', opts: [['A', 'Chị có cá kho khế.'], ['B', 'Cá kho khế có chị.'], ['C', 'Có chị cá kho khế.']], correct: 'A' },
  { text: 'Câu "Mấy chú khỉ ăn chuối." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mấy chú khỉ ăn chuối." có bao nhiêu tiếng bắt đầu bằng ch?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Chị có cá kho khế." có bao nhiêu tiếng bắt đầu bằng kh?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Khi giới thiệu về bể cá cảnh, câu nào phù hợp nhất?', type: 'single_choice', opts: [['A', 'Nhà em có một bể cá cảnh. Trong bể có nhiều con cá nhỏ, nhiều màu sắc.'], ['B', 'Cá cảnh đang đi học.'], ['C', 'Em để cá cảnh ở giữa sân và không cho nước vào bể.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 14: Ch ch – Kh kh (lesson 728)…');
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
