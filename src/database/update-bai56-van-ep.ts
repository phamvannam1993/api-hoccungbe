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

const LESSON_ID = 770; // van-ep-ep-ip-up (Bài 56: Vần ep, êp, ip, up) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ep, êp, ip, up'], ['B', 'et, êt, it, ut'], ['C', 'ap, ăp, âp']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ep?', type: 'single_choice', opts: [['A', 'kẹp'], ['B', 'nếp'], ['C', 'nhịp']], correct: 'A' },
  { text: 'Tiếng nào chứa vần êp?', type: 'single_choice', opts: [['A', 'dép'], ['B', 'nếp'], ['C', 'giúp']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ip?', type: 'single_choice', opts: [['A', 'búp'], ['B', 'nhịp'], ['C', 'bếp']], correct: 'B' },
  { text: 'Tiếng nào chứa vần up?', type: 'single_choice', opts: [['A', 'giúp'], ['B', 'kịp'], ['C', 'xếp']], correct: 'A' },
  { text: 'Vật dùng để đi ở chân trong bài là gì?', type: 'single_choice', opts: [['A', 'Đôi dép'], ['B', 'Đôi tất'], ['C', 'Đôi giày']], correct: 'A' },
  { text: 'Người chuyên nấu ăn trong nhà hàng được gọi là gì?', type: 'single_choice', opts: [['A', 'Bác sĩ'], ['B', 'Đầu bếp'], ['C', 'Giáo viên']], correct: 'B' },
  { text: 'Con chim có tiếng kêu đặc biệt trong bài là chim gì?', type: 'single_choice', opts: [['A', 'Chim bìm bịp'], ['B', 'Chim sẻ'], ['C', 'Chim công']], correct: 'A' },
  { text: 'Phần hoa sen chưa nở được gọi là gì?', type: 'single_choice', opts: [['A', 'Lá sen'], ['B', 'Búp sen'], ['C', 'Đài sen']], correct: 'B' },
  { text: 'Cụm từ "đầu bếp" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "dép"?', type: 'single_choice', opts: [['A', 'chép'], ['B', 'bếp'], ['C', 'bịp']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "bếp"?', type: 'single_choice', opts: [['A', 'kẹp'], ['B', 'nếp'], ['C', 'giúp']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "kịp"?', type: 'single_choice', opts: [['A', 'nhịp'], ['B', 'búp'], ['C', 'xếp']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "búp"?', type: 'single_choice', opts: [['A', 'nép'], ['B', 'giúp'], ['C', 'kịp']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ep?', type: 'single_choice', opts: [['A', 'kẹp, nẹp, dép'], ['B', 'nếp, xếp, bếp'], ['C', 'kịp, nhịp, bịp']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần êp?', type: 'single_choice', opts: [['A', 'dép, chép, kẹp'], ['B', 'nếp, xếp, bếp'], ['C', 'búp, giúp, súp']], correct: 'B' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Trong bếp, lũ cún con múp míp ___ vào bên mẹ."', type: 'single_choice', opts: [['A', 'nép'], ['B', 'nếp'], ['C', 'kịp']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: nép vào bên mẹ / lũ cún con / Trong bếp / múp míp.', type: 'single_choice', opts: [['A', 'Trong bếp, lũ cún con múp míp nép vào bên mẹ.'], ['B', 'Lũ cún con trong bếp bên mẹ múp míp nép vào.'], ['C', 'Nép vào bên mẹ trong bếp lũ cún con múp míp.']], correct: 'A' },
  { text: 'Đọc đoạn: "Dịp nghỉ lễ, nhà Hà có chú Tư và cô Lan đến chơi. Mẹ nấu súp gà, cơm nếp và rán cá chép. Hà giúp mẹ rửa rau quả và sắp xếp bát đĩa. Bố thì dọn dẹp nhà cửa. Nhà Hà hôm nay thật là vui." — Những ai đến nhà Hà chơi?', type: 'single_choice', opts: [['A', 'Chú Tư và cô Lan'], ['B', 'Bác Nam và cô Hoa'], ['C', 'Ông bà của Hà']], correct: 'A' },
  { text: 'Mẹ Hà chuẩn bị những món gì?', type: 'single_choice', opts: [['A', 'Súp gà, cơm nếp và cá chép'], ['B', 'Cháo gà, bánh mì và cá thu'], ['C', 'Cơm rang, thịt bò và rau luộc']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Trong bếp, lũ cún con múp míp nép vào bên mẹ." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '10 tiếng'], ['B', '11 tiếng'], ['C', '12 tiếng']], correct: 'B' },
  { text: 'Trong câu "Trong bếp, lũ cún con múp míp nép vào bên mẹ." có bao nhiêu tiếng chứa các vần ep, êp, ip, up?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Trong bếp, lũ cún con múp míp nép vào bên mẹ."?', type: 'single_choice', opts: [['A', 'bếp, múp, míp, nép'], ['B', 'trong, lũ, cún, mẹ'], ['C', 'cún, con, vào, bên']], correct: 'A' },
  { text: 'Câu nào có đủ cả bốn vần ep, êp, ip, up?', type: 'single_choice', opts: [['A', 'Trong bếp, cún múp míp nép bên mẹ.'], ['B', 'Bé đi đôi dép mới.'], ['C', 'Đầu bếp đang nấu súp.']], correct: 'A' },
  { text: 'Câu "Hà giúp mẹ rửa rau quả và sắp xếp bát đĩa." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '10 tiếng'], ['B', '11 tiếng'], ['C', '12 tiếng']], correct: 'B' },
  { text: 'Những tiếng nào chứa vần up hoặc êp trong câu "Hà giúp mẹ rửa rau quả và sắp xếp bát đĩa."?', type: 'single_choice', opts: [['A', 'giúp, xếp'], ['B', 'mẹ, rửa'], ['C', 'rau, quả']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "đôi d… – đầu b… – bìm b… – b… sen"', type: 'single_choice', opts: [['A', 'ep – êp – ip – up'], ['B', 'êp – ep – up – ip'], ['C', 'ip – up – ep – êp']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Hà giúp mẹ sắp xép bát đĩa."?', type: 'single_choice', opts: [['A', 'giúp'], ['B', 'xép'], ['C', 'đĩa']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Chú Tư và cô Lan đến chơi. (2) Mẹ chuẩn bị các món ăn. (3) Hà giúp mẹ rửa rau quả và xếp bát đĩa. (4) Bố dọn dẹp nhà cửa.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },
  { text: 'Khi nhà có khách, em nên làm gì?', type: 'single_choice', opts: [['A', 'Lễ phép chào khách và giúp người lớn chuẩn bị'], ['B', 'Trốn vào phòng, không chào hỏi'], ['C', 'Bày đồ chơi khắp nhà rồi bỏ đi']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 56: Vần ep, êp, ip, up (lesson 770)…');
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
