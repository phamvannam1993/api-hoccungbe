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

const LESSON_ID = 736; // chu-t-t-tr-tr (Bài 22: T t – Tr tr) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "t" viết thường.', type: 'single_choice', opts: [['A', 'r'], ['B', 't'], ['C', 'tr']], correct: 'B' },
  { text: 'Chọn chữ "T" viết hoa.', type: 'single_choice', opts: [['A', 'T'], ['B', 'R'], ['C', 'L']], correct: 'A' },
  { text: 'Chọn chữ ghép "tr" viết thường.', type: 'single_choice', opts: [['A', 't'], ['B', 'ch'], ['C', 'tr']], correct: 'C' },
  { text: 'Chọn chữ ghép "Tr" viết hoa.', type: 'single_choice', opts: [['A', 'Ch'], ['B', 'Tr'], ['C', 'T']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ t?', type: 'single_choice', opts: [['A', 'tre'], ['B', 'tô'], ['C', 'trê']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng chữ tr?', type: 'single_choice', opts: [['A', 'tả'], ['B', 'tô'], ['C', 'tre']], correct: 'C' },
  { text: 'Chọn từ đúng với hình chiếc xe hơi.', type: 'single_choice', opts: [['A', 'ô tô'], ['B', 'ca nô'], ['C', 'xe đạp']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con sư tử.', type: 'single_choice', opts: [['A', 'sư tử'], ['B', 'chú khỉ'], ['C', 'cá trê']], correct: 'A' },
  { text: 'Chọn từ đúng với hình con cá trê.', type: 'single_choice', opts: [['A', 'cá rô'], ['B', 'cá trê'], ['C', 'cá mè']], correct: 'B' },
  { text: 'Trong câu "Nam tô bức tranh cây tre.", Nam đang làm gì?', type: 'single_choice', opts: [['A', 'Nam đang tô tranh'], ['B', 'Nam đang câu cá'], ['C', 'Nam đang trồng cây']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép t + ô được tiếng nào?', type: 'single_choice', opts: [['A', 'tô'], ['B', 'to'], ['C', 'tre']], correct: 'A' },
  { text: 'Ghép tr + e được tiếng nào?', type: 'single_choice', opts: [['A', 'te'], ['B', 'tre'], ['C', 'trê']], correct: 'B' },
  { text: 'Ghép t + a + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'tá'], ['B', 'tạ'], ['C', 'tả']], correct: 'C' },
  { text: 'Ghép t + a + thanh nặng được tiếng nào?', type: 'single_choice', opts: [['A', 'tạ'], ['B', 'tả'], ['C', 'tà']], correct: 'A' },
  { text: 'Ghép tr + e + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'trẻ'], ['B', 'tre'], ['C', 'trẹ']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng chữ tr?', type: 'single_choice', opts: [['A', 'tê'], ['B', 'trò'], ['C', 'tô']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nam ___ bức tranh cây tre.', type: 'single_choice', opts: [['A', 'tô'], ['B', 'trò'], ['C', 'tre']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nam tô bức ___ cây tre.', type: 'single_choice', opts: [['A', 'trò'], ['B', 'tranh'], ['C', 'trê']], correct: 'B' },
  { text: 'Trong hồ có những loại cá nào?', type: 'single_choice', opts: [['A', 'Cá mè, cá trê, cá rô'], ['B', 'Cá cờ, cá hô, cá trê'], ['C', 'Cá mè, cá ngừ, cá thu']], correct: 'A' },
  { text: 'Hà đang tả cảnh vật nào?', type: 'single_choice', opts: [['A', 'Hồ cá'], ['B', 'Vườn cây'], ['C', 'Sân trường']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ t', type: 'multiple_choice', opts: [['A', 'tô'], ['B', 'tả'], ['C', 'tạ'], ['D', 'tre'], ['E', 'tê']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ tr', type: 'multiple_choice', opts: [['A', 'tre'], ['B', 'trẻ'], ['C', 'trò'], ['D', 'trê'], ['E', 'tô']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'tre'], ['B', 'trê'], ['C', 'trò'], ['D', 'tô']], correct: 'D' },
  { text: 'Muốn đổi tiếng "tre" thành tiếng "trẻ", em cần làm gì?', type: 'single_choice', opts: [['A', 'Thêm thanh hỏi vào chữ e'], ['B', 'Thêm thanh sắc vào chữ e'], ['C', 'Đổi tr thành t']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: bức tranh cây tre – Nam – tô', type: 'single_choice', opts: [['A', 'Nam tô bức tranh cây tre.'], ['B', 'Bức tranh cây tre tô Nam.'], ['C', 'Tô Nam bức tranh cây tre.']], correct: 'A' },
  { text: 'Câu "Nam tô bức tranh cây tre." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong câu "Nam tô bức tranh cây tre." có bao nhiêu tiếng bắt đầu bằng t hoặc tr?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Đoạn "Hà tả hồ cá. Hồ to, có cá mè, cá trê, cá rô." có bao nhiêu câu?', type: 'single_choice', opts: [['A', '1 câu'], ['B', '2 câu'], ['C', '3 câu']], correct: 'B' },
  { text: 'Hành động nào giúp bảo vệ môi trường biển?', type: 'single_choice', opts: [['A', 'Bỏ rác đúng nơi quy định và không ném rác xuống nước'], ['B', 'Ném túi ni-lông từ tàu xuống biển'], ['C', 'Để chai nhựa trôi tự do trên mặt nước']], correct: 'A' },
  { text: 'Vì sao không nên vứt rác xuống sông, hồ và biển?', type: 'single_choice', opts: [['A', 'Vì rác làm ô nhiễm nước và có thể gây hại cho động vật'], ['B', 'Vì rác sẽ tự biến mất ngay'], ['C', 'Vì động vật dưới nước rất thích ăn rác']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 22: T t – Tr tr (lesson 736)…');
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
