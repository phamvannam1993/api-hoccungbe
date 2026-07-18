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

const LESSON_ID = 723; // chu-cai-o-o-dau-nga (Bài 9: Ơ ơ – Thanh ngã) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "ơ" viết thường.', type: 'single_choice', opts: [['A', 'o'], ['B', 'ô'], ['C', 'ơ']], correct: 'C' },
  { text: 'Chọn chữ "Ơ" viết hoa.', type: 'single_choice', opts: [['A', 'Ơ'], ['B', 'Ô'], ['C', 'O']], correct: 'A' },
  { text: 'Chữ Ơ và chữ ơ có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chữ ơ khác chữ o ở điểm nào?', type: 'single_choice', opts: [['A', 'Chữ ơ có thêm nét râu'], ['B', 'Chữ ơ có thêm dấu mũ'], ['C', 'Chữ ơ có thêm nét gạch ngang']], correct: 'A' },
  { text: 'Kí hiệu nào là thanh ngã?', type: 'single_choice', opts: [['A', '~'], ['B', '?'], ['C', '\\']], correct: 'A' },
  { text: 'Chọn từ đúng với hình ảnh bờ đê.', type: 'single_choice', opts: [['A', 'bờ đê'], ['B', 'cá cờ'], ['C', 'đỡ bé']], correct: 'A' },
  { text: 'Chọn từ đúng với hình ảnh con cá.', type: 'single_choice', opts: [['A', 'cá cò'], ['B', 'cá cờ'], ['C', 'cá cỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình ảnh người lớn đang giúp em bé đứng.', type: 'single_choice', opts: [['A', 'dỡ bé'], ['B', 'đỡ bé'], ['C', 'bờ bé']], correct: 'B' },
  { text: 'Trong câu "Bố đỡ bé.", ai đỡ bé?', type: 'single_choice', opts: [['A', 'Bố'], ['B', 'Mẹ'], ['C', 'Bà']], correct: 'A' },
  { text: 'Trong câu "Tàu dỡ hàng ở cảng.", tàu dỡ hàng ở đâu?', type: 'single_choice', opts: [['A', 'Ở trường'], ['B', 'Ở cảng'], ['C', 'Ở nhà']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép b + ơ + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'bở'], ['B', 'bờ'], ['C', 'bỡ']], correct: 'B' },
  { text: 'Ghép b + ơ + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'bờ'], ['B', 'bỡ'], ['C', 'bở']], correct: 'C' },
  { text: 'Ghép c + ơ + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'cờ'], ['B', 'cỡ'], ['C', 'cở']], correct: 'A' },
  { text: 'Ghép c + ơ + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'cờ'], ['B', 'cỡ'], ['C', 'cở']], correct: 'B' },
  { text: 'Ghép d + ơ + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'dỡ'], ['B', 'dờ'], ['C', 'dở']], correct: 'C' },
  { text: 'Ghép đ + ơ + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'đỡ'], ['B', 'đở'], ['C', 'đờ']], correct: 'A' },
  { text: 'Tiếng nào có thanh ngã?', type: 'single_choice', opts: [['A', 'bờ'], ['B', 'cỡ'], ['C', 'dở']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: ___ đê', type: 'single_choice', opts: [['A', 'bờ'], ['B', 'cờ'], ['C', 'đỡ']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào câu: Tàu ___ hàng ở cảng.', type: 'single_choice', opts: [['A', 'dở'], ['B', 'dỡ'], ['C', 'đỡ']], correct: 'B' },
  { text: 'Những phương tiện nào xuất hiện trong tranh?', type: 'single_choice', opts: [['A', 'Máy bay, tàu thuyền và ô tô'], ['B', 'Xe đạp, xe máy và tàu hỏa'], ['C', 'Xe buýt, trực thăng và xe bò']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ ơ', type: 'multiple_choice', opts: [['A', 'bờ'], ['B', 'cỡ'], ['C', 'đỡ'], ['D', 'bố'], ['E', 'cá']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng có thanh ngã', type: 'multiple_choice', opts: [['A', 'cỡ'], ['B', 'dỡ'], ['C', 'đỡ'], ['D', 'bờ'], ['E', 'dở']], correct: ['A', 'B', 'C'] },
  { text: 'Muốn đổi tiếng "cờ" thành tiếng "cỡ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh huyền thành thanh ngã'], ['B', 'Đổi chữ c thành chữ b'], ['C', 'Đổi chữ ơ thành chữ ô']], correct: 'A' },
  { text: 'Muốn đổi tiếng "bờ" thành tiếng "bở", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi thanh huyền thành thanh hỏi'], ['B', 'Đổi thanh huyền thành thanh ngã'], ['C', 'Đổi chữ b thành chữ c']], correct: 'A' },
  { text: 'Chọn từ thích hợp cho từng câu: "Tàu ___ hàng ở cảng." và "Bố ___ bé."', type: 'single_choice', opts: [['A', 'đỡ – dỡ'], ['B', 'dỡ – đỡ'], ['C', 'dở – đỡ']], correct: 'B' },
  { text: 'Sắp xếp các từ thành câu đúng: bé – Bố – đỡ', type: 'single_choice', opts: [['A', 'Bé bố đỡ.'], ['B', 'Bố đỡ bé.'], ['C', 'Đỡ bé bố.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'bố đỡ bé.'], ['B', 'Bố đỡ bé.'], ['C', 'Bố Đỡ Bé.']], correct: 'B' },
  { text: 'Câu "Tàu dỡ hàng ở cảng." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Tàu dỡ hàng ở cảng." có bao nhiêu chữ ơ?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'B' },
  { text: 'Nhóm nào chỉ gồm các phương tiện giao thông?', type: 'single_choice', opts: [['A', 'Ô tô, máy bay, tàu thủy'], ['B', 'Ô tô, con cá, máy bay'], ['C', 'Tàu thủy, bờ đê, ô tô']], correct: 'A' },
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
      'UPDATE quizzes SET questionText = ?, questionType = ?, optionsJson = ?, correctAnswerJson = ?, questionImageUrl = NULL, isActive = 1 WHERE id = ?',
      [q.text, q.type, JSON.stringify(optionsJson), JSON.stringify(q.correct), rows[i].id],
    );
    console.log(`    ✓ #${rows[i].id} (câu ${i + 1}) → ${q.type} · đáp án ${JSON.stringify(q.correct)}`);
  }
}

async function main() {
  await ds.initialize();
  console.log('Cập nhật quiz Bài 9: Ơ ơ – Thanh ngã (lesson 723)…');
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
