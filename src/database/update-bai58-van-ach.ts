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

const LESSON_ID = 772; // van-ach-ech-ich (Bài 58: Vần ach, êch, ich) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ach, êch, ich'], ['B', 'anh, ênh, inh'], ['C', 'ac, ăc, âc']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ach?', type: 'single_choice', opts: [['A', 'ếch'], ['B', 'sách'], ['C', 'lịch']], correct: 'B' },
  { text: 'Tiếng nào chứa vần êch?', type: 'single_choice', opts: [['A', 'lịch'], ['B', 'ếch'], ['C', 'vách']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ich?', type: 'single_choice', opts: [['A', 'sạch'], ['B', 'chếch'], ['C', 'kịch']], correct: 'C' },
  { text: 'Ếch con trong tranh đang làm gì?', type: 'single_choice', opts: [['A', 'Đọc sách'], ['B', 'Hái hoa'], ['C', 'Bắt cá']], correct: 'A' },
  { text: 'Những đồ dùng để đọc và viết trong bài được gọi là gì?', type: 'single_choice', opts: [['A', 'Đồ chơi'], ['B', 'Sách vở'], ['C', 'Quần áo']], correct: 'B' },
  { text: 'Hai người có chiều cao khác nhau được gọi là:', type: 'single_choice', opts: [['A', 'Bằng nhau'], ['B', 'Chênh lệch'], ['C', 'Thẳng hàng']], correct: 'B' },
  { text: 'Vật dùng để xem ngày, tháng trong bài là gì?', type: 'single_choice', opts: [['A', 'Đồng hồ'], ['B', 'Quyển sách'], ['C', 'Tờ lịch']], correct: 'C' },
  { text: 'Ếch con thích làm gì?', type: 'single_choice', opts: [['A', 'Đá bóng'], ['B', 'Đọc sách'], ['C', 'Nhảy dây']], correct: 'B' },
  { text: 'Cụm từ "tờ lịch" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "vách"?', type: 'single_choice', opts: [['A', 'lịch'], ['B', 'lệch'], ['C', 'sạch']], correct: 'C' },
  { text: 'Tiếng nào có cùng vần với tiếng "ếch"?', type: 'single_choice', opts: [['A', 'lệch'], ['B', 'sách'], ['C', 'xích']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "lịch"?', type: 'single_choice', opts: [['A', 'tách'], ['B', 'xích'], ['C', 'chếch']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ach?', type: 'single_choice', opts: [['A', 'ếch, lệch, chếch'], ['B', 'vách, tách, sạch'], ['C', 'bích, xích, kịch']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần êch?', type: 'single_choice', opts: [['A', 'sách, vách, sạch'], ['B', 'bích, xích, lịch'], ['C', 'ếch, chếch, lệch']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ich?', type: 'single_choice', opts: [['A', 'bích, xích, kịch'], ['B', 'ếch, lệch, chếch'], ['C', 'vách, tách, sạch']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Ếch con thích đọc ___."', type: 'single_choice', opts: [['A', 'lịch'], ['B', 'vách'], ['C', 'sách']], correct: 'C' },
  { text: 'Sắp xếp các từ sau thành câu đúng: đọc sách / Ếch con / thích.', type: 'single_choice', opts: [['A', 'Đọc sách ếch con thích.'], ['B', 'Ếch con thích đọc sách.'], ['C', 'Thích ếch con đọc sách.']], correct: 'B' },
  { text: 'Đọc bài thơ "Ếch cốm": "Có một hôm ếch cốm / Tinh nghịch nấp bờ ao / Mải rình bắt cào cào / Quên sách bên bờ cỏ." — Ếch cốm tinh nghịch nấp ở đâu?', type: 'single_choice', opts: [['A', 'Bờ ao'], ['B', 'Trong lớp học'], ['C', 'Dưới gầm bàn']], correct: 'A' },
  { text: 'Vì sao ếch cốm quên sách?', type: 'single_choice', opts: [['A', 'Vì làm mất sách'], ['B', 'Vì cho bạn mượn sách'], ['C', 'Vì mải rình bắt cào cào']], correct: 'C' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Ếch con thích đọc sách" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Ếch con thích đọc sách", có bao nhiêu tiếng chứa các vần ach, êch, ich?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'C' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Ếch con thích đọc sách"?', type: 'single_choice', opts: [['A', 'ếch, thích, sách'], ['B', 'con, thích, đọc'], ['C', 'ếch, con, đọc']], correct: 'A' },
  { text: 'Dòng thơ "Tinh nghịch nấp bờ ao" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong bốn dòng thơ "Có một hôm ếch cốm / Tinh nghịch nấp bờ ao / Mải rình bắt cào cào / Quên sách bên bờ cỏ." có bao nhiêu tiếng chứa vần ach, êch hoặc ich?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần ach, êch, ich?', type: 'single_choice', opts: [['A', 'Ếch thích đọc sách.'], ['B', 'Bé xem tờ lịch.'], ['C', 'Em giữ sách sạch.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "s… – con … – tờ l…"', type: 'single_choice', opts: [['A', 'ach – êch – ich'], ['B', 'êch – ich – ach'], ['C', 'ich – ach – êch']], correct: 'A' },
  { text: 'Tiếng nào viết sai trong câu: "Ếch con thíc đọc sách."?', type: 'single_choice', opts: [['A', 'ếch'], ['B', 'thíc'], ['C', 'sách']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự bài thơ "Ếch cốm": (1) Ếch cốm nấp ở bờ ao. (2) Ếch mải rình bắt cào cào. (3) Ếch quên sách bên bờ cỏ. (4) Đến lớp, ếch nói xin lỗi cô.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },
  { text: 'Qua bài thơ, ếch cốm cần rút ra bài học gì?', type: 'single_choice', opts: [['A', 'Chỉ cần vui chơi, không cần mang sách'], ['B', 'Chuẩn bị sách vở đầy đủ, tập trung học và biết nhận lỗi'], ['C', 'Có thể để sách ở bất cứ đâu']], correct: 'B' },
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
  console.log('Cập nhật quiz Bài 58: Vần ach, êch, ich (lesson 772)…');
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
