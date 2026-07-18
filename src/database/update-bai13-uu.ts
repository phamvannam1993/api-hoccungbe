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

const LESSON_ID = 727; // chu-cai-u-u-u-u (Bài 13: U u – Ư ư) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "u" viết thường.', type: 'single_choice', opts: [['A', 'n'], ['B', 'u'], ['C', 'ư']], correct: 'B' },
  { text: 'Chọn chữ "U" viết hoa.', type: 'single_choice', opts: [['A', 'U'], ['B', 'V'], ['C', 'Ư']], correct: 'A' },
  { text: 'Chọn chữ "ư" viết thường.', type: 'single_choice', opts: [['A', 'u'], ['B', 'ư'], ['C', 'v']], correct: 'B' },
  { text: 'Chọn chữ "Ư" viết hoa.', type: 'single_choice', opts: [['A', 'U'], ['B', 'Ư'], ['C', 'W']], correct: 'B' },
  { text: 'Chữ ư khác chữ u ở điểm nào?', type: 'single_choice', opts: [['A', 'Chữ ư có thêm nét râu'], ['B', 'Chữ ư có thêm dấu mũ'], ['C', 'Chữ ư có thêm nét gạch ngang']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc dù.', type: 'single_choice', opts: [['A', 'dù'], ['B', 'hũ'], ['C', 'dữ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình quả đu đủ.', type: 'single_choice', opts: [['A', 'đỗ đỏ'], ['B', 'đu đủ'], ['C', 'bí đỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình con hổ đang chạy.', type: 'single_choice', opts: [['A', 'hổ dữ'], ['B', 'hổ đỏ'], ['C', 'hổ nhỏ']], correct: 'A' },
  { text: 'Trong câu "Đu đủ chín ngọt lừ.", quả gì đã chín?', type: 'single_choice', opts: [['A', 'Quả bí'], ['B', 'Quả đu đủ'], ['C', 'Quả cà']], correct: 'B' },
  { text: 'Trong câu "Cá hổ là cá dữ.", con vật nào được nhắc đến?', type: 'single_choice', opts: [['A', 'Cá hổ'], ['B', 'Con hổ'], ['C', 'Con cò']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép d + u + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'đủ'], ['B', 'dù'], ['C', 'dữ']], correct: 'B' },
  { text: 'Ghép đ + u + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'đủ'], ['B', 'dù'], ['C', 'đự']], correct: 'A' },
  { text: 'Ghép h + u + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'hủ'], ['B', 'hù'], ['C', 'hũ']], correct: 'C' },
  { text: 'Ghép c + ư + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'cừ'], ['B', 'cữ'], ['C', 'cự']], correct: 'A' },
  { text: 'Ghép d + ư + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'dữ'], ['B', 'dự'], ['C', 'dừ']], correct: 'B' },
  { text: 'Ghép l + ư + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'lữ'], ['B', 'lự'], ['C', 'lừ']], correct: 'C' },
  { text: 'Tiếng nào có chứa chữ u?', type: 'single_choice', opts: [['A', 'dữ'], ['B', 'đủ'], ['C', 'lừ']], correct: 'B' },
  { text: 'Tiếng nào có chứa chữ ư?', type: 'single_choice', opts: [['A', 'dù'], ['B', 'hũ'], ['C', 'dữ']], correct: 'C' },
  { text: 'Điền từ thích hợp vào câu: Đu đủ chín ngọt ___.', type: 'single_choice', opts: [['A', 'lừ'], ['B', 'dù'], ['C', 'hũ']], correct: 'A' },
  { text: 'Chọn câu phù hợp với hình con cá hổ.', type: 'single_choice', opts: [['A', 'Cá hổ là cá dữ.'], ['B', 'Cá hổ ăn đu đủ.'], ['C', 'Cá hổ cầm chiếc dù.']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ u', type: 'multiple_choice', opts: [['A', 'dù'], ['B', 'đủ'], ['C', 'hũ'], ['D', 'dữ'], ['E', 'lừ']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng có chứa chữ ư', type: 'multiple_choice', opts: [['A', 'cừ'], ['B', 'dự'], ['C', 'lừ'], ['D', 'dù'], ['E', 'đủ']], correct: ['A', 'B', 'C'] },
  { text: 'Muốn đổi tiếng "đu" thành tiếng "đủ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh hỏi'], ['B', 'Thêm thanh huyền'], ['C', 'Đổi chữ u thành chữ ư']], correct: 'A' },
  { text: 'Muốn đổi tiếng "dữ" thành tiếng "dự", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh ngã thành thanh nặng'], ['B', 'Đổi thanh ngã thành thanh hỏi'], ['C', 'Đổi chữ ư thành chữ u']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: chín – Đu đủ – ngọt lừ', type: 'single_choice', opts: [['A', 'Chín đu đủ ngọt lừ.'], ['B', 'Đu đủ ngọt lừ chín.'], ['C', 'Đu đủ chín ngọt lừ.']], correct: 'C' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'đu đủ chín ngọt lừ.'], ['B', 'Đu đủ chín ngọt lừ.'], ['C', 'Đu Đủ Chín Ngọt Lừ.']], correct: 'B' },
  { text: 'Câu "Đu đủ chín ngọt lừ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Đu đủ chín ngọt lừ." có bao nhiêu chữ u, ư?', type: 'single_choice', opts: [['A', '2 chữ u và 1 chữ ư'], ['B', '1 chữ u và 2 chữ ư'], ['C', '3 chữ u và không có chữ ư']], correct: 'A' },
  { text: 'Câu "Cá hổ là cá dữ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Lời giới thiệu nào đầy đủ và lễ phép nhất?', type: 'single_choice', opts: [['A', 'Chào các bạn, mình tên là Lan. Mình học lớp 1A. Rất vui được làm quen với các bạn.'], ['B', 'Mình tên Lan, nhớ nhé!'], ['C', 'Các bạn phải chơi với mình.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 13: U u – Ư ư (lesson 727)…');
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
