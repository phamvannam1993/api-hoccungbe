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

const LESSON_ID = 720; // chu-cai-o-o-dau-hoi (Bài 6: O o, thanh hỏi) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "o" viết thường.', type: 'single_choice', opts: [['A', 'a'], ['B', 'o'], ['C', 'ô']], correct: 'B' },
  { text: 'Chọn chữ "O" viết hoa.', type: 'single_choice', opts: [['A', 'O'], ['B', 'C'], ['C', 'Ô']], correct: 'A' },
  { text: 'Chữ O và chữ o có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chọn chữ o có thanh hỏi.', type: 'single_choice', opts: [['A', 'ò'], ['B', 'ó'], ['C', 'ỏ']], correct: 'C' },
  { text: 'Chọn tiếng đúng với hình ảnh con bò.', type: 'single_choice', opts: [['A', 'cò'], ['B', 'bò'], ['C', 'cỏ']], correct: 'B' },
  { text: 'Chọn tiếng đúng với hình ảnh con cò.', type: 'single_choice', opts: [['A', 'cò'], ['B', 'bò'], ['C', 'có']], correct: 'A' },
  { text: 'Chọn tiếng đúng với hình ảnh đám cỏ.', type: 'single_choice', opts: [['A', 'có'], ['B', 'cỏ'], ['C', 'cò']], correct: 'B' },
  { text: 'Trong câu "Đàn bò gặm cỏ.", con vật nào đang gặm cỏ?', type: 'single_choice', opts: [['A', 'Đàn cò'], ['B', 'Đàn bò'], ['C', 'Đàn cá']], correct: 'B' },
  { text: 'Đàn bò đang làm gì?', type: 'single_choice', opts: [['A', 'Gặm cỏ'], ['B', 'Câu cá'], ['C', 'Đi bộ']], correct: 'A' },
  { text: 'Trong câu "Bê có cỏ.", bê có gì?', type: 'single_choice', opts: [['A', 'Cá'], ['B', 'Cỏ'], ['C', 'Bè']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép b + o + dấu huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'bó'], ['B', 'bò'], ['C', 'bỏ']], correct: 'B' },
  { text: 'Ghép b + o + dấu sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'bó'], ['B', 'bò'], ['C', 'bỏ']], correct: 'A' },
  { text: 'Ghép b + o + dấu hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'bò'], ['B', 'bỏ'], ['C', 'bó']], correct: 'B' },
  { text: 'Ghép c + o + dấu huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'có'], ['B', 'cỏ'], ['C', 'cò']], correct: 'C' },
  { text: 'Ghép c + o + dấu sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'có'], ['B', 'cò'], ['C', 'cỏ']], correct: 'A' },
  { text: 'Ghép c + o + dấu hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'cò'], ['B', 'cỏ'], ['C', 'có']], correct: 'B' },
  { text: 'Tiếng nào có thanh hỏi?', type: 'single_choice', opts: [['A', 'cò'], ['B', 'có'], ['C', 'cỏ']], correct: 'C' },
  { text: 'Tiếng nào có thanh huyền?', type: 'single_choice', opts: [['A', 'bò'], ['B', 'bó'], ['C', 'bỏ']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Đàn bò gặm ___.', type: 'single_choice', opts: [['A', 'cò'], ['B', 'cỏ'], ['C', 'có']], correct: 'B' },
  { text: 'Chọn câu phù hợp với tranh đàn bê đang ăn cỏ.', type: 'single_choice', opts: [['A', 'Bê có cỏ.'], ['B', 'Cò có cá.'], ['C', 'Bò đi bộ.']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ o', type: 'multiple_choice', opts: [['A', 'bò'], ['B', 'cò'], ['C', 'cỏ'], ['D', 'bé'], ['E', 'có']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng có thanh hỏi', type: 'multiple_choice', opts: [['A', 'bỏ'], ['B', 'cỏ'], ['C', 'bò'], ['D', 'có']], correct: ['A', 'B'] },
  { text: 'Muốn đổi tiếng "cò" thành tiếng "cỏ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi dấu huyền thành dấu hỏi'], ['B', 'Đổi dấu huyền thành dấu sắc'], ['C', 'Đổi chữ c thành chữ b']], correct: 'A' },
  { text: 'Muốn đổi tiếng "bò" thành tiếng "bó", em cần làm gì?', type: 'single_choice', opts: [['A', 'Đổi dấu huyền thành dấu hỏi'], ['B', 'Đổi dấu huyền thành dấu sắc'], ['C', 'Bỏ chữ b']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: gặm cỏ – Đàn bò', type: 'single_choice', opts: [['A', 'Gặm cỏ đàn bò.'], ['B', 'Đàn bò gặm cỏ.'], ['C', 'Cỏ gặm đàn bò.']], correct: 'B' },
  { text: 'Câu "Đàn bò gặm cỏ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong câu "Đàn bò gặm cỏ." có bao nhiêu tiếng chứa chữ o?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Quan sát ba hình: con bò – con cò – đám cỏ. Cách nối nào đúng?', type: 'single_choice', opts: [['A', 'Hình 1 – bò; hình 2 – cò; hình 3 – cỏ'], ['B', 'Hình 1 – cỏ; hình 2 – bò; hình 3 – cò'], ['C', 'Hình 1 – cò; hình 2 – cỏ; hình 3 – bò']], correct: 'A' },
  { text: 'Khi gặp mẹ sau giờ học, em nên nói gì?', type: 'single_choice', opts: [['A', 'Con chào mẹ ạ!'], ['B', 'Mẹ đi về đi!'], ['C', 'Con không chào mẹ.']], correct: 'A' },
  { text: 'Khi đến thăm ông bà, em nên nói gì?', type: 'single_choice', opts: [['A', 'Cháu chào ông bà ạ!'], ['B', 'Ông bà đưa quà cho cháu!'], ['C', 'Cháu không cần chào.']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 6: O o, thanh hỏi (lesson 720)…');
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
