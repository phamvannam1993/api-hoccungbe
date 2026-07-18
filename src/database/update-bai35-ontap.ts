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

const LESSON_ID = 749; // on-tap-va-ke-chuyen-7 (Bài 35: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 35 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học chữ cái mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng nào chứa vần an?', type: 'single_choice', opts: [['A', 'bàn'], ['B', 'bến'], ['C', 'sâm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăm?', type: 'single_choice', opts: [['A', 'pin'], ['B', 'tăm'], ['C', 'khôn']], correct: 'B' },
  { text: 'Tiếng nào chứa vần âm?', type: 'single_choice', opts: [['A', 'sâm'], ['B', 'đèn'], ['C', 'lớn']], correct: 'A' },
  { text: 'Tiếng nào chứa vần en?', type: 'single_choice', opts: [['A', 'đèn'], ['B', 'chân'], ['C', 'trạm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ên?', type: 'single_choice', opts: [['A', 'bến'], ['B', 'bàn'], ['C', 'ngọn']], correct: 'A' },
  { text: 'Tiếng nào chứa vần in?', type: 'single_choice', opts: [['A', 'pin'], ['B', 'phùn'], ['C', 'chăm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần un?', type: 'single_choice', opts: [['A', 'khôn'], ['B', 'phùn'], ['C', 'sâm']], correct: 'B' },
  { text: 'Trong tranh bài đọc, hai con vật thi với nhau là:', type: 'single_choice', opts: [['A', 'Thỏ và rùa'], ['B', 'Gà và vịt'], ['C', 'Cá và tôm']], correct: 'A' },
  { text: 'Câu chuyện ở cuối bài có tên là gì?', type: 'single_choice', opts: [['A', 'Thỏ và rùa'], ['B', 'Gà nâu và vịt xám'], ['C', 'Chú cá thông minh']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Cụm từ nào chứa cả vần ôn và vần ơn?', type: 'single_choice', opts: [['A', 'Khôn lớn'], ['B', 'Bàn chân'], ['C', 'Tăm gỗ']], correct: 'A' },
  { text: 'Cụm từ nào chứa vần am?', type: 'single_choice', opts: [['A', 'Trạm y tế'], ['B', 'Bến đò'], ['C', 'Đèn pin']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần đã ôn?', type: 'single_choice', opts: [['A', 'bàn, chân, bến, pin'], ['B', 'cá, cờ, bé, lá'], ['C', 'nhà, xe, bố, mẹ']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Sen nở ___ hồ."', type: 'single_choice', opts: [['A', 'thắm'], ['B', 'sáng'], ['C', 'xanh']], correct: 'A' },
  { text: 'Đọc đoạn: "Nhìn rùa, thỏ chê: \'Quá là chậm như rùa.\' Rùa ôn tồn: \'Ta thi nhé.\' Thỏ hớn hở tham gia. Thỏ nhởn nhơ múa ca, rùa cứ bò cần mẫn. Thế là, rùa đi xa hơn hẳn thỏ." — Thỏ đã chê rùa như thế nào?', type: 'single_choice', opts: [['A', 'Rùa quá chậm'], ['B', 'Rùa chạy quá nhanh'], ['C', 'Rùa không biết bơi']], correct: 'A' },
  { text: 'Rùa nói gì với thỏ?', type: 'single_choice', opts: [['A', 'Ta về nhé.'], ['B', 'Ta thi nhé.'], ['C', 'Ta chơi nhé.']], correct: 'B' },
  { text: 'Trong khi thi, con vật nào bò cần mẫn?', type: 'single_choice', opts: [['A', 'Thỏ'], ['B', 'Rùa'], ['C', 'Cả thỏ và rùa']], correct: 'B' },
  { text: 'Vì sao thỏ bị rùa bỏ xa?', type: 'single_choice', opts: [['A', 'Vì thỏ nhởn nhơ múa ca'], ['B', 'Vì thỏ không tham gia'], ['C', 'Vì thỏ bị đau chân']], correct: 'A' },
  { text: 'Vịt xám đã làm gì để giúp gà nâu sang sông?', type: 'single_choice', opts: [['A', 'Cõng gà nâu trên lưng'], ['B', 'Gọi người đến giúp'], ['C', 'Làm một chiếc cầu']], correct: 'A' },
  { text: 'Thương vịt xám vất vả, gà nâu đã làm gì?', type: 'single_choice', opts: [['A', 'Ấp trứng giúp vịt'], ['B', 'Tìm thức ăn giúp vịt'], ['C', 'Làm tổ mới cho vịt']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Nhóm nào gồm toàn các vần kết thúc bằng âm m?', type: 'single_choice', opts: [['A', 'am, ăm, âm'], ['B', 'an, ăn, ân'], ['C', 'on, ôn, ơn']], correct: 'A' },
  { text: 'Nhóm nào gồm ba cụm từ mà mỗi cụm đều có hai tiếng chứa vần đã ôn?', type: 'single_choice', opts: [['A', 'bàn chân, khôn lớn, đèn pin'], ['B', 'tăm gỗ, củ sâm, ngọn cỏ'], ['C', 'mưa phùn, trạm y tế, chăm chỉ']], correct: 'A' },
  { text: 'Trong câu "Sen nở thắm hồ", có bao nhiêu tiếng chứa vần đã ôn?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Thỏ hớn hở tham gia", những tiếng nào chứa vần đã ôn?', type: 'single_choice', opts: [['A', 'thỏ, hở'], ['B', 'hớn, tham'], ['C', 'tham, gia']], correct: 'B' },
  { text: 'Dòng nào có hai tiếng cùng chứa vần ôn?', type: 'single_choice', opts: [['A', 'Rùa ôn tồn'], ['B', 'Thỏ nhởn nhơ'], ['C', 'Sen nở thắm']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự bài đọc "Thỏ và rùa": (1) Rùa bò cần mẫn. (2) Thỏ chê rùa chậm. (3) Rùa đi xa hơn thỏ. (4) Rùa rủ thỏ thi.', type: 'single_choice', opts: [['A', '2 – 4 – 1 – 3'], ['B', '4 – 2 – 3 – 1'], ['C', '1 – 3 – 2 – 4']], correct: 'A' },
  { text: 'Từ nào nói đúng nhất về tính cách của rùa?', type: 'single_choice', opts: [['A', 'Kiên trì, cần mẫn'], ['B', 'Kiêu căng, lười biếng'], ['C', 'Nhút nhát, sợ hãi']], correct: 'A' },
  { text: 'Bài đọc "Thỏ và rùa" nhắc chúng ta điều gì?', type: 'single_choice', opts: [['A', 'Không nên chủ quan; cần chăm chỉ và kiên trì'], ['B', 'Chỉ cần chạy nhanh là sẽ chiến thắng'], ['C', 'Có thể vừa thi vừa vui chơi']], correct: 'A' },
  { text: 'Sắp xếp tranh kể chuyện "Gà nâu và vịt xám" theo đúng thứ tự: (1) Vịt xám cõng gà nâu qua sông. (2) Gà nâu và vịt xám chơi cùng nhau. (3) Gà nâu ấp trứng giúp vịt xám. (4) Gà nâu không thể tự sang sông.', type: 'single_choice', opts: [['A', '2 – 4 – 1 – 3'], ['B', '4 – 2 – 3 – 1'], ['C', '1 – 3 – 2 – 4']], correct: 'A' },
  { text: 'Câu chuyện "Gà nâu và vịt xám" muốn nói điều gì?', type: 'single_choice', opts: [['A', 'Bạn bè cần yêu thương và giúp đỡ lẫn nhau'], ['B', 'Mỗi con vật nên sống một mình'], ['C', 'Chỉ những con vật biết bơi mới có ích']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 35: Ôn tập và kể chuyện (lesson 749)…');
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
