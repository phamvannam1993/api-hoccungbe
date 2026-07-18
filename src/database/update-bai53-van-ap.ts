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

const LESSON_ID = 767; // van-ap-ap-ap (Bài 53: Vần ap, ăp, âp) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ap, ăp, âp'], ['B', 'at, ăt, ât'], ['C', 'ac, ăc, âc']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ap?', type: 'single_choice', opts: [['A', 'đạp'], ['B', 'cặp'], ['C', 'mập']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăp?', type: 'single_choice', opts: [['A', 'rạp'], ['B', 'cặp'], ['C', 'nấp']], correct: 'B' },
  { text: 'Tiếng nào chứa vần âp?', type: 'single_choice', opts: [['A', 'bắp'], ['B', 'tháp'], ['C', 'mập']], correct: 'C' },
  { text: 'Phương tiện có hai bánh, dùng bàn đạp để di chuyển là gì?', type: 'single_choice', opts: [['A', 'Xe máy'], ['B', 'Xe đạp'], ['C', 'Ô tô']], correct: 'B' },
  { text: 'Vật dùng để đựng sách vở trong bài là gì?', type: 'single_choice', opts: [['A', 'Cặp da'], ['B', 'Túi kẹo'], ['C', 'Hộp bút']], correct: 'A' },
  { text: 'Con vật lớn sống dưới biển trong bài là con gì?', type: 'single_choice', opts: [['A', 'Cá heo'], ['B', 'Cá mập'], ['C', 'Cá chép']], correct: 'B' },
  { text: 'Mẹ đưa Hà đến lớp bằng phương tiện gì?', type: 'single_choice', opts: [['A', 'Xe đạp'], ['B', 'Xe buýt'], ['C', 'Ô tô']], correct: 'A' },
  { text: 'Khắp phố được miêu tả như thế nào?', type: 'single_choice', opts: [['A', 'Vắng lặng'], ['B', 'Tấp nập'], ['C', 'Tối om']], correct: 'B' },
  { text: 'Cụm từ "cá mập" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "rạp"?', type: 'single_choice', opts: [['A', 'sạp'], ['B', 'cặp'], ['C', 'mập']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "bắp"?', type: 'single_choice', opts: [['A', 'nấp'], ['B', 'cặp'], ['C', 'tháp']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "mập"?', type: 'single_choice', opts: [['A', 'gặp'], ['B', 'đạp'], ['C', 'nấp']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ap?', type: 'single_choice', opts: [['A', 'rạp, sạp, tháp'], ['B', 'bắp, cặp, gặp'], ['C', 'mập, nấp, hấp']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ăp?', type: 'single_choice', opts: [['A', 'đạp, rạp, tháp'], ['B', 'bắp, cặp, gặp'], ['C', 'mập, nấp, hấp']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âp?', type: 'single_choice', opts: [['A', 'rạp, sạp, đạp'], ['B', 'bắp, cặp, gặp'], ['C', 'mập, nấp, hấp']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Mẹ ___ xe đưa Hà đến lớp."', type: 'single_choice', opts: [['A', 'đạp'], ['B', 'gặp'], ['C', 'nấp']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Mẹ / đưa Hà đến lớp / đạp xe.', type: 'single_choice', opts: [['A', 'Mẹ đưa đạp xe Hà đến lớp.'], ['B', 'Mẹ đạp xe đưa Hà đến lớp.'], ['C', 'Đạp xe đưa mẹ Hà đến lớp.']], correct: 'B' },
  { text: 'Đọc câu đố: "Khi ngủ, tôi nằm im lìm, mặt đen sẫm. Thức dậy, tôi có thể đưa bạn chu du khắp nơi, khám phá thế giới hấp dẫn, đầy ắp sắc màu. Bạn có thể xem phim, nghe nhạc để có phút giây thư giãn, ấm áp. Tôi là ai?" — Đồ vật được nhắc đến trong câu đố là gì?', type: 'single_choice', opts: [['A', 'Tủ lạnh'], ['B', 'Ti vi'], ['C', 'Đồng hồ']], correct: 'B' },
  { text: 'Với đồ vật trong câu đố, em có thể làm gì?', type: 'single_choice', opts: [['A', 'Xem phim và nghe nhạc'], ['B', 'Nấu cơm và rửa bát'], ['C', 'Đựng sách và bút']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Mẹ đạp xe đưa Hà đến lớp" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Mẹ đạp xe đưa Hà đến lớp", có bao nhiêu tiếng chứa vần ap, ăp hoặc âp?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'A' },
  { text: 'Trong câu "Khắp phố tấp nập", có bao nhiêu tiếng chứa vần ăp hoặc âp?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'C' },
  { text: 'Câu nào có đủ cả ba vần ap, ăp, âp?', type: 'single_choice', opts: [['A', 'Bé đạp xe, gặp một bạn mập.'], ['B', 'Bé cầm chiếc cặp mới.'], ['C', 'Ngoài phố có một cái rạp.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "xe đ… – c… da – cá m…"', type: 'single_choice', opts: [['A', 'ap – ăp – âp'], ['B', 'ăp – âp – ap'], ['C', 'âp – ap – ăp']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Mẹ đặp xe đưa Hà đến lớp."?', type: 'single_choice', opts: [['A', 'mẹ'], ['B', 'đặp'], ['C', 'lớp']], correct: 'B' },
  { text: 'Trong câu "Khám phá thế giới hấp dẫn, đầy ắp sắc màu." có bao nhiêu tiếng chứa vần ăp hoặc âp?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Chi tiết nào giúp em đoán đồ vật trong câu đố là ti vi?', type: 'single_choice', opts: [['A', 'Có thể xem phim, nghe nhạc và khám phá thế giới'], ['B', 'Có thể dùng để che mưa'], ['C', 'Có thể dùng để đựng sách vở']], correct: 'A' },
  { text: 'Khi ngồi trên xe máy, em cần sử dụng đồ vật nào để bảo vệ đầu?', type: 'single_choice', opts: [['A', 'Chiếc ô'], ['B', 'Mũ bảo hiểm'], ['C', 'Mũ rộng vành']], correct: 'B' },
  { text: 'Em nên sử dụng các đồ vật quen thuộc như thế nào?', type: 'single_choice', opts: [['A', 'Dùng đúng công dụng và giữ gìn cẩn thận'], ['B', 'Dùng xong thì vứt tùy ý'], ['C', 'Tháo ra để nghịch và làm hỏng']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 53: Vần ap, ăp, âp (lesson 767)…');
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
