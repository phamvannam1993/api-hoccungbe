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

const LESSON_ID = 773; // van-ang-ang-ang (Bài 59: Vần ang, ăng, âng) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ang, ăng, âng'], ['B', 'anh, ênh, inh'], ['C', 'an, ăn, ân']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ang?', type: 'single_choice', opts: [['A', 'sáng'], ['B', 'trăng'], ['C', 'tầng']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ăng?', type: 'single_choice', opts: [['A', 'vàng'], ['B', 'măng'], ['C', 'vầng']], correct: 'B' },
  { text: 'Tiếng nào chứa vần âng?', type: 'single_choice', opts: [['A', 'làng'], ['B', 'rặng'], ['C', 'tầng']], correct: 'C' },
  { text: 'Con vật nhỏ màu vàng trong bài là con gì?', type: 'single_choice', opts: [['A', 'Cá vàng'], ['B', 'Cá chép'], ['C', 'Cá mập']], correct: 'A' },
  { text: 'Những mầm non mọc lên từ gốc tre được gọi là gì?', type: 'single_choice', opts: [['A', 'Măng tre'], ['B', 'Rặng tre'], ['C', 'Lá tre']], correct: 'A' },
  { text: 'Những tòa nhà có nhiều tầng được gọi là gì?', type: 'single_choice', opts: [['A', 'Nhà sàn'], ['B', 'Nhà tầng'], ['C', 'Nhà lá']], correct: 'B' },
  { text: 'Vầng trăng lấp ló ở đâu?', type: 'single_choice', opts: [['A', 'Sau rặng tre'], ['B', 'Trên mặt biển'], ['C', 'Sau ngôi nhà']], correct: 'A' },
  { text: 'Tiếng "trăng" chứa vần nào?', type: 'single_choice', opts: [['A', 'ang'], ['B', 'ăng'], ['C', 'âng']], correct: 'B' },
  { text: 'Cụm từ "măng tre" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "sáng"?', type: 'single_choice', opts: [['A', 'vàng'], ['B', 'trăng'], ['C', 'tầng']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "măng"?', type: 'single_choice', opts: [['A', 'làng'], ['B', 'trăng'], ['C', 'vầng']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "tầng"?', type: 'single_choice', opts: [['A', 'rặng'], ['B', 'sáng'], ['C', 'vầng']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ang?', type: 'single_choice', opts: [['A', 'làng, sáng, vàng'], ['B', 'trăng, măng, nắng'], ['C', 'tầng, vầng, nâng']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ăng?', type: 'single_choice', opts: [['A', 'sáng, vàng, làng'], ['B', 'trăng, măng, nắng'], ['C', 'tầng, vầng, nâng']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần âng?', type: 'single_choice', opts: [['A', 'tầng, vầng, nâng'], ['B', 'trăng, rặng, măng'], ['C', 'vàng, sáng, mang']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Vầng trăng sáng lấp ló sau ___ tre."', type: 'single_choice', opts: [['A', 'làng'], ['B', 'rặng'], ['C', 'tầng']], correct: 'B' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Vầng trăng sáng / sau rặng tre / lấp ló.', type: 'single_choice', opts: [['A', 'Sau rặng tre vầng lấp ló trăng sáng.'], ['B', 'Vầng trăng sáng lấp ló sau rặng tre.'], ['C', 'Lấp ló rặng tre sau vầng trăng sáng.']], correct: 'B' },
  { text: 'Đọc bài thơ "Mèo con đi học": "Hôm nay trời nắng chang chang / Mèo con đi học chẳng mang thứ gì / Chỉ mang một cái bút chì / Và mang một mẩu bánh mì con con." — Thời tiết hôm mèo con đi học như thế nào?', type: 'single_choice', opts: [['A', 'Trời nắng chang chang'], ['B', 'Trời mưa lộp độp'], ['C', 'Trời lạnh và có tuyết']], correct: 'A' },
  { text: 'Mèo con mang theo những gì khi đi học?', type: 'single_choice', opts: [['A', 'Một cái bút chì và một mẩu bánh mì'], ['B', 'Một chiếc cặp và nhiều sách vở'], ['C', 'Một quả bóng và một chiếc ô']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Vầng trăng sáng lấp ló sau rặng tre." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Vầng trăng sáng lấp ló sau rặng tre." có bao nhiêu tiếng chứa các vần ang, ăng, âng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Vầng trăng sáng lấp ló sau rặng tre."?', type: 'single_choice', opts: [['A', 'vầng, trăng, sáng, rặng'], ['B', 'lấp, ló, sau, tre'], ['C', 'vầng, ló, sau, rặng']], correct: 'A' },
  { text: 'Dòng thơ "Hôm nay trời nắng chang chang" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ bài thơ "Mèo con đi học", có bao nhiêu tiếng chứa các vần ang, ăng hoặc âng?', type: 'single_choice', opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'C' },
  { text: 'Câu nào có đủ cả ba vần ang, ăng, âng?', type: 'single_choice', opts: [['A', 'Vầng trăng sáng trên nhà tầng.'], ['B', 'Mèo con mang bút chì đi học.'], ['C', 'Trời hôm nay nắng chang chang.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "cá v… – m… tre – nhà t…"', type: 'single_choice', opts: [['A', 'ang – ăng – âng'], ['B', 'ăng – âng – ang'], ['C', 'âng – ang – ăng']], correct: 'A' },
  { text: 'Tiếng nào viết sai trong câu: "Vầng trăn sáng lấp ló sau rặng tre."?', type: 'single_choice', opts: [['A', 'vầng'], ['B', 'trăn'], ['C', 'rặng']], correct: 'B' },
  { text: 'Sắp xếp nội dung theo đúng thứ tự bài thơ "Mèo con đi học": (1) Trời nắng chang chang. (2) Mèo con đi học. (3) Mèo mang một cái bút chì. (4) Mèo mang một mẩu bánh mì.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },
  { text: 'Câu nào nói đúng về mặt trăng và mặt trời?', type: 'single_choice', opts: [['A', 'Mặt trời thường chiếu sáng ban ngày, mặt trăng thường thấy rõ vào ban đêm'], ['B', 'Mặt trăng làm cho ban ngày nóng hơn'], ['C', 'Mặt trời chỉ xuất hiện vào ban đêm']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 59: Vần ang, ăng, âng (lesson 773)…');
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
