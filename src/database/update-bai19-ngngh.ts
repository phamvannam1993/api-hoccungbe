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

const LESSON_ID = 733; // chu-cai-ng-ngh (Bài 19: Ng ng – Ngh ngh) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ ghép "ng" viết thường.', type: 'single_choice', opts: [['A', 'ng'], ['B', 'ngh'], ['C', 'nh']], correct: 'A' },
  { text: 'Chọn chữ ghép "Ng" viết hoa.', type: 'single_choice', opts: [['A', 'Nh'], ['B', 'Ngh'], ['C', 'Ng']], correct: 'C' },
  { text: 'Chọn chữ ghép "ngh" viết thường.', type: 'single_choice', opts: [['A', 'nh'], ['B', 'ngh'], ['C', 'ng']], correct: 'B' },
  { text: 'Chọn chữ ghép "Ngh" viết hoa.', type: 'single_choice', opts: [['A', 'Ngh'], ['B', 'Ng'], ['C', 'Nh']], correct: 'A' },
  { text: 'Tiếng nào bắt đầu bằng ng?', type: 'single_choice', opts: [['A', 'nghé'], ['B', 'ngõ'], ['C', 'nghe']], correct: 'B' },
  { text: 'Tiếng nào bắt đầu bằng ngh?', type: 'single_choice', opts: [['A', 'ngủ'], ['B', 'ngã'], ['C', 'nghé']], correct: 'C' },
  { text: 'Chọn từ đúng với hình nơi ba con đường gặp nhau.', type: 'single_choice', opts: [['A', 'ngã ba'], ['B', 'ngõ nhỏ'], ['C', 'bờ đê']], correct: 'A' },
  { text: 'Chọn từ đúng với hình một con ngõ hẹp.', type: 'single_choice', opts: [['A', 'ngã ba'], ['B', 'ngõ nhỏ'], ['C', 'nhà nhỏ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình củ nghệ.', type: 'single_choice', opts: [['A', 'củ nghệ'], ['B', 'củ khoai'], ['C', 'củ gừng']], correct: 'A' },
  { text: 'Trong câu "Nghé theo mẹ ra ngõ.", nghé đi theo ai?', type: 'single_choice', opts: [['A', 'Theo bà'], ['B', 'Theo mẹ'], ['C', 'Theo bạn']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép ng + o + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'ngó'], ['B', 'ngõ'], ['C', 'ngỏ']], correct: 'B' },
  { text: 'Ghép ng + a + thanh ngã được tiếng nào?', type: 'single_choice', opts: [['A', 'ngà'], ['B', 'ngả'], ['C', 'ngã']], correct: 'C' },
  { text: 'Ghép ng + u + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'ngủ'], ['B', 'ngũ'], ['C', 'ngụ']], correct: 'A' },
  { text: 'Ghép ngh + e được tiếng nào?', type: 'single_choice', opts: [['A', 'nghe'], ['B', 'nge'], ['C', 'nghê']], correct: 'A' },
  { text: 'Ghép ngh + e + thanh sắc được tiếng nào?', type: 'single_choice', opts: [['A', 'nghe'], ['B', 'nghé'], ['C', 'nghè']], correct: 'B' },
  { text: 'Ghép ngh + i + thanh hỏi được tiếng nào?', type: 'single_choice', opts: [['A', 'nghị'], ['B', 'nghỉ'], ['C', 'nghĩ']], correct: 'B' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nghé theo mẹ ra ___.', type: 'single_choice', opts: [['A', 'ngõ'], ['B', 'nghé'], ['C', 'ngủ']], correct: 'A' },
  { text: 'Điền tiếng thích hợp vào chỗ trống: Nghé đã no ___.', type: 'single_choice', opts: [['A', 'cá'], ['B', 'cỏ'], ['C', 'nghệ']], correct: 'B' },
  { text: 'Nghé ngủ ở đâu?', type: 'single_choice', opts: [['A', 'Ở bờ đê'], ['B', 'Ở trong nhà'], ['C', 'Ở dưới hồ']], correct: 'A' },
  { text: 'Từ nào chỉ thời gian học sinh được nghỉ vào mùa hè?', type: 'single_choice', opts: [['A', 'nghỉ hè'], ['B', 'ngõ nhỏ'], ['C', 'ngã ba']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ng', type: 'multiple_choice', opts: [['A', 'ngõ'], ['B', 'ngã'], ['C', 'ngủ'], ['D', 'nghé'], ['E', 'ngự']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ngh', type: 'multiple_choice', opts: [['A', 'nghe'], ['B', 'nghé'], ['C', 'nghỉ'], ['D', 'ngõ'], ['E', 'nghệ']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'ngõ'], ['B', 'ngủ'], ['C', 'ngã'], ['D', 'nghé']], correct: 'D' },
  { text: 'Chọn cách viết đúng.', type: 'single_choice', opts: [['A', 'nge'], ['B', 'nghe'], ['C', 'ngge']], correct: 'B' },
  { text: 'Chữ ghép ngh thường đứng trước nhóm chữ nào?', type: 'single_choice', opts: [['A', 'e, ê, i'], ['B', 'a, o, ô'], ['C', 'u, ư, ơ']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: theo mẹ – Nghé – ra ngõ', type: 'single_choice', opts: [['A', 'Nghé theo mẹ ra ngõ.'], ['B', 'Ra ngõ nghé theo mẹ.'], ['C', 'Mẹ ra ngõ theo nghé.']], correct: 'A' },
  { text: 'Sắp xếp các từ thành câu đúng: ở bờ đê – Nghé – ngủ', type: 'single_choice', opts: [['A', 'Ở bờ đê nghé ngủ.'], ['B', 'Nghé ngủ ở bờ đê.'], ['C', 'Ngủ nghé ở bờ đê.']], correct: 'B' },
  { text: 'Câu "Nghé theo mẹ ra ngõ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Nghé theo mẹ ra ngõ." có bao nhiêu tiếng bắt đầu bằng ng hoặc ngh?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Khi đi thăm vườn bách thú, em nên làm gì?', type: 'single_choice', opts: [['A', 'Quan sát từ nơi an toàn và không trêu chọc động vật'], ['B', 'Tự ý trèo qua hàng rào'], ['C', 'Ném đồ ăn vào chuồng thú']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 19: Ng ng – Ngh ngh (lesson 733)…');
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
