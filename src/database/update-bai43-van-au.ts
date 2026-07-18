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

const LESSON_ID = 757; // van-au-au-eu (Bài 43: Vần au, âu, êu) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'au, âu, êu'], ['B', 'ao, eo, iu'], ['C', 'ai, ay, ây']], correct: 'A' },
  { text: 'Tiếng nào chứa vần au?', type: 'single_choice', opts: [['A', 'cau'], ['B', 'bầu'], ['C', 'rêu']], correct: 'A' },
  { text: 'Tiếng nào chứa vần âu?', type: 'single_choice', opts: [['A', 'rau'], ['B', 'gấu'], ['C', 'khều']], correct: 'B' },
  { text: 'Tiếng nào chứa vần êu?', type: 'single_choice', opts: [['A', 'tàu'], ['B', 'trâu'], ['C', 'rêu']], correct: 'C' },
  { text: 'Quan sát hình cà rốt và các loại rau trong bài. Chọn tên đúng của hình.', type: 'single_choice', opts: [['A', 'Rau củ'], ['B', 'Hoa quả'], ['C', 'Cây cau']], correct: 'A' },
  { text: 'Con vật to, có sừng trong bài là con gì?', type: 'single_choice', opts: [['A', 'Con bò'], ['B', 'Con trâu'], ['C', 'Con dê']], correct: 'B' },
  { text: 'Nhân vật nhỏ mặc trang phục dân gian trong bài là ai?', type: 'single_choice', opts: [['A', 'Chú Tễu'], ['B', 'Chú Cuội'], ['C', 'Cậu bé']], correct: 'A' },
  { text: 'Đàn chim trong câu "Đàn sẻ nâu kêu ríu rít ở sau nhà" có màu gì?', type: 'single_choice', opts: [['A', 'Màu trắng'], ['B', 'Màu nâu'], ['C', 'Màu vàng']], correct: 'B' },
  { text: 'Đàn sẻ nâu kêu ríu rít ở đâu?', type: 'single_choice', opts: [['A', 'Sau nhà'], ['B', 'Trong lớp'], ['C', 'Bên bờ sông']], correct: 'A' },
  { text: 'Cụm từ "con trâu" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "cau"?', type: 'single_choice', opts: [['A', 'tàu'], ['B', 'bầu'], ['C', 'rêu']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "bầu"?', type: 'single_choice', opts: [['A', 'rau'], ['B', 'gấu'], ['C', 'khều']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "khều"?', type: 'single_choice', opts: [['A', 'sau'], ['B', 'cầu'], ['C', 'rêu']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần au?', type: 'single_choice', opts: [['A', 'cau, tàu, rau'], ['B', 'bầu, gấu, trầu'], ['C', 'kêu, khều, rêu']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âu?', type: 'single_choice', opts: [['A', 'cau, rau, sau'], ['B', 'bầu, gấu, trầu'], ['C', 'kêu, rêu, khều']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần êu?', type: 'single_choice', opts: [['A', 'kêu, khều, rêu'], ['B', 'cau, tàu, rau'], ['C', 'bầu, cầu, gấu']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Đàn sẻ nâu kêu ríu rít ở ___ nhà."', type: 'single_choice', opts: [['A', 'rau'], ['B', 'sau'], ['C', 'cau']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: ở sau nhà / Đàn sẻ nâu / kêu ríu rít.', type: 'single_choice', opts: [['A', 'Đàn sẻ nâu kêu ríu rít ở sau nhà.'], ['B', 'Ở sau nhà đàn ríu rít sẻ nâu kêu.'], ['C', 'Kêu ríu rít đàn sẻ ở nâu sau nhà.']], correct: 'A' },
  { text: 'Đọc đoạn: "Nhà dì Tư ở quê có cây cau, giàn trầu. Sau nhà có rau cải, rau dền và cả dưa hấu. Gần nhà dì có cây cầu tre nhỏ. Xa xa là dãy núi cao." — Nhà dì Tư ở đâu?', type: 'single_choice', opts: [['A', 'Ở quê'], ['B', 'Ở thành phố'], ['C', 'Ở ven biển']], correct: 'A' },
  { text: 'Sau nhà dì Tư có những gì?', type: 'single_choice', opts: [['A', 'Rau cải, rau dền và dưa hấu'], ['B', 'Hoa sen và cây táo'], ['C', 'Cây thông và hoa đào']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Đàn sẻ nâu kêu ríu rít ở sau nhà" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong câu "Đàn sẻ nâu kêu ríu rít ở sau nhà", có bao nhiêu tiếng chứa các vần au, âu, êu?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Đàn sẻ nâu kêu ríu rít ở sau nhà"?', type: 'single_choice', opts: [['A', 'đàn, sẻ, nhà'], ['B', 'nâu, kêu, sau'], ['C', 'kêu, ríu, rít']], correct: 'B' },
  { text: 'Câu "Nhà dì Tư ở quê có cây cau, giàn trầu." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '9 tiếng'], ['B', '10 tiếng'], ['C', '11 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về nhà dì Tư, có bao nhiêu tiếng chứa vần au, âu hoặc êu?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần au, âu, êu?', type: 'single_choice', opts: [['A', 'Đàn sẻ nâu kêu ở sau nhà.'], ['B', 'Dì Tư trồng nhiều rau cải.'], ['C', 'Gần nhà có một cây cầu.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "r… củ – con tr… – chú T…"', type: 'single_choice', opts: [['A', 'au – âu – êu'], ['B', 'âu – êu – au'], ['C', 'êu – au – âu']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Đàn sẻ nâu kâu ríu rít ở sau nhà."?', type: 'single_choice', opts: [['A', 'nâu'], ['B', 'kâu'], ['C', 'sau']], correct: 'B' },
  { text: 'Cây cầu tre nhỏ nằm ở đâu?', type: 'single_choice', opts: [['A', 'Gần nhà dì Tư'], ['B', 'Sau dãy núi'], ['C', 'Giữa cánh đồng']], correct: 'A' },
  { text: 'Khi đến lớp muộn và muốn vào lớp, em nên nói gì?', type: 'single_choice', opts: [['A', 'Thưa cô, cho em xin phép vào lớp ạ!'], ['B', 'Cô tránh ra cho em vào!'], ['C', 'Em vào lớp đây!']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 43: Vần au, âu, êu (lesson 757)…');
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
