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

const LESSON_ID = 726; // chu-h-h-l-l (Bài 12: H h – L l) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "h" viết thường.', type: 'single_choice', opts: [['A', 'k'], ['B', 'h'], ['C', 'l']], correct: 'B' },
  { text: 'Chọn chữ "H" viết hoa.', type: 'single_choice', opts: [['A', 'H'], ['B', 'K'], ['C', 'N']], correct: 'A' },
  { text: 'Chọn chữ "l" viết thường.', type: 'single_choice', opts: [['A', 'i'], ['B', 't'], ['C', 'l']], correct: 'C' },
  { text: 'Chọn chữ "L" viết hoa.', type: 'single_choice', opts: [['A', 'I'], ['B', 'L'], ['C', 'T']], correct: 'B' },
  { text: 'Chữ H và chữ h có phải là cùng một chữ cái không?', type: 'single_choice', opts: [['A', 'Có'], ['B', 'Không']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc lá màu đỏ.', type: 'single_choice', opts: [['A', 'lá đỏ'], ['B', 'cá đỏ'], ['C', 'cờ đỏ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình phần đất ở cạnh hồ.', type: 'single_choice', opts: [['A', 'bờ đê'], ['B', 'bờ hồ'], ['C', 'bờ đá']], correct: 'B' },
  { text: 'Chọn từ đúng với hình con cá.', type: 'single_choice', opts: [['A', 'cá hô'], ['B', 'cá cờ'], ['C', 'cá cò']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con le le.', type: 'single_choice', opts: [['A', 'le le'], ['B', 'cò cò'], ['C', 'bê bê']], correct: 'A' },
  { text: 'Trong câu "Le le bơi trên hồ.", con vật nào đang bơi?', type: 'single_choice', opts: [['A', 'Cá hô'], ['B', 'Le le'], ['C', 'Con cò']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép h + ô + thanh huyền được tiếng nào?', type: 'single_choice', opts: [['A', 'hổ'], ['B', 'hồ'], ['C', 'hố']], correct: 'B' },
  { text: 'Ghép l + e được tiếng nào?', type: 'single_choice', opts: [['A', 'le'], ['B', 'li'], ['C', 'lê']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ h?', type: 'single_choice', opts: [['A', 'hồ'], ['B', 'le'], ['C', 'lá']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ l?', type: 'single_choice', opts: [['A', 'ho'], ['B', 'hổ'], ['C', 'li']], correct: 'C' },
  { text: 'Điền từ còn thiếu vào câu: Le le bơi trên ___.', type: 'single_choice', opts: [['A', 'đá'], ['B', 'hồ'], ['C', 'đò']], correct: 'B' },
  { text: 'Điền từ còn thiếu vào câu: ___ ___ bơi trên hồ.', type: 'single_choice', opts: [['A', 'Le le'], ['B', 'Cò cò'], ['C', 'Bé bé']], correct: 'A' },
  { text: 'Trong câu "Bé bị ho.", bé bị làm sao?', type: 'single_choice', opts: [['A', 'Bé bị ho'], ['B', 'Bé bị ngã'], ['C', 'Bé bị đau chân']], correct: 'A' },
  { text: 'Bà đã có loại lá gì?', type: 'single_choice', opts: [['A', 'Lá đỏ'], ['B', 'Lá hẹ'], ['C', 'Lá đa']], correct: 'B' },
  { text: 'Chọn câu phù hợp với tranh bà đang chuẩn bị lá hẹ bên cạnh bé.', type: 'single_choice', opts: [['A', 'Bé bị ho. Bà đã có lá hẹ.'], ['B', 'Bé đi đò. Bà có cá hô.'], ['C', 'Bé bơi trên hồ. Bà có lá đỏ.']], correct: 'A' },
  { text: 'Chủ đề của phần luyện nói là gì?', type: 'single_choice', opts: [['A', 'Phương tiện giao thông'], ['B', 'Cây cối'], ['C', 'Chào hỏi']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng có chứa chữ h', type: 'multiple_choice', opts: [['A', 'hồ'], ['B', 'hổ'], ['C', 'hẹ'], ['D', 'le'], ['E', 'lá']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng có chứa chữ l', type: 'multiple_choice', opts: [['A', 'lá'], ['B', 'le'], ['C', 'lọ'], ['D', 'hồ'], ['E', 'ho']], correct: ['A', 'B', 'C'] },
  { text: 'Muốn đổi tiếng "hô" thành tiếng "hồ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh huyền'], ['B', 'Thêm thanh hỏi'], ['C', 'Đổi chữ h thành chữ l']], correct: 'A' },
  { text: 'Từ nào gồm hai tiếng giống nhau?', type: 'single_choice', opts: [['A', 'bờ hồ'], ['B', 'lá đỏ'], ['C', 'le le']], correct: 'C' },
  { text: 'Sắp xếp các cụm từ thành câu đúng: trên hồ – Le le – bơi', type: 'single_choice', opts: [['A', 'Trên hồ le le bơi.'], ['B', 'Le le bơi trên hồ.'], ['C', 'Bơi le le trên hồ.']], correct: 'B' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'le le bơi trên hồ.'], ['B', 'Le le bơi trên hồ.'], ['C', 'Le Le Bơi Trên Hồ.']], correct: 'B' },
  { text: 'Câu "Le le bơi trên hồ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Le le bơi trên hồ." có bao nhiêu chữ L, l?', type: 'single_choice', opts: [['A', '1 chữ'], ['B', '2 chữ'], ['C', '3 chữ']], correct: 'B' },
  { text: 'Đoạn "Bé bị ho. Bà đã có lá hẹ." gồm bao nhiêu câu?', type: 'single_choice', opts: [['A', '1 câu'], ['B', '2 câu'], ['C', '3 câu']], correct: 'B' },
  { text: 'Việc làm nào thể hiện em biết chăm sóc cây cối?', type: 'single_choice', opts: [['A', 'Tưới nước và bảo vệ cây'], ['B', 'Bẻ cành, hái lá để chơi'], ['C', 'Giẫm lên cây non']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 12: H h – L l (lesson 726)…');
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
