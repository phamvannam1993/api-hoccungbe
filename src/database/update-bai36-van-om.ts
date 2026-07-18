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

const LESSON_ID = 750; // van-om-om-om (Bài 36: Vần om, ôm, ơm) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'om, ôm, ơm'], ['B', 'on, ôn, ơn'], ['C', 'am, ăm, âm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần om?', type: 'single_choice', opts: [['A', 'xóm'], ['B', 'cốm'], ['C', 'thơm']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ôm?', type: 'single_choice', opts: [['A', 'rơm'], ['B', 'tôm'], ['C', 'khóm']], correct: 'B' },
  { text: 'Tiếng nào chứa vần ơm?', type: 'single_choice', opts: [['A', 'bờm'], ['B', 'nộm'], ['C', 'đóm']], correct: 'A' },
  { text: 'Con vật phát sáng vào ban đêm trong bài là con gì?', type: 'single_choice', opts: [['A', 'Đom đóm'], ['B', 'Con ong'], ['C', 'Con kiến']], correct: 'A' },
  { text: 'Chú chó có nhiều chấm trên thân được gọi là gì?', type: 'single_choice', opts: [['A', 'Chó vàng'], ['B', 'Chó đốm'], ['C', 'Chó mực']], correct: 'B' },
  { text: 'Trong hình có nhiều món ăn được bày trên vật gì?', type: 'single_choice', opts: [['A', 'Mâm cơm'], ['B', 'Cái bàn'], ['C', 'Chiếc ghế']], correct: 'A' },
  { text: 'Tiếng "xóm" có vần nào?', type: 'single_choice', opts: [['A', 'om'], ['B', 'ôm'], ['C', 'ơm']], correct: 'A' },
  { text: 'Tiếng "thơm" có vần nào?', type: 'single_choice', opts: [['A', 'om'], ['B', 'ôm'], ['C', 'ơm']], correct: 'C' },
  { text: 'Cụm từ "chó đốm" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "xóm"?', type: 'single_choice', opts: [['A', 'khóm'], ['B', 'cốm'], ['C', 'rơm']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "tôm"?', type: 'single_choice', opts: [['A', 'đốm'], ['B', 'bờm'], ['C', 'đóm']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "thơm"?', type: 'single_choice', opts: [['A', 'nộm'], ['B', 'khóm'], ['C', 'cơm']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần om?', type: 'single_choice', opts: [['A', 'khóm, xóm, đóm'], ['B', 'cốm, tôm, đốm'], ['C', 'thơm, rơm, bờm']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ôm?', type: 'single_choice', opts: [['A', 'khóm, xóm, đom'], ['B', 'cốm, nộm, tôm'], ['C', 'cơm, thơm, rơm']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ơm?', type: 'single_choice', opts: [['A', 'bờm, rơm, cơm'], ['B', 'tôm, cốm, nộm'], ['C', 'khóm, xóm, đóm']], correct: 'A' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Hương cốm ___ thôn xóm."', type: 'single_choice', opts: [['A', 'thơm'], ['B', 'tôm'], ['C', 'khóm']], correct: 'A' },
  { text: 'Sắp xếp các từ sau thành câu đúng: thơm / Hương cốm / thôn xóm.', type: 'single_choice', opts: [['A', 'Thơm Hương cốm thôn xóm.'], ['B', 'Hương cốm thơm thôn xóm.'], ['C', 'Thôn xóm Hương cốm thơm.']], correct: 'B' },
  { text: 'Đọc đoạn: "Hôm qua, cô Mơ ở xóm Hạ đến thăm nhà Hà. Cô cho Hà giỏ cam. Hà chọn quả cam to phần bố. Mẹ khen và thơm lên má Hà." — Cô Mơ mang gì cho Hà?', type: 'single_choice', opts: [['A', 'Một giỏ cam'], ['B', 'Một mâm cơm'], ['C', 'Một bó hoa']], correct: 'A' },
  { text: 'Hà chọn quả cam to để làm gì?', type: 'single_choice', opts: [['A', 'Ăn một mình'], ['B', 'Phần cho bố'], ['C', 'Tặng bạn']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Đọc câu "Hương cốm thơm thôn xóm." — Câu trên có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Câu "Hương cốm thơm thôn xóm." có bao nhiêu tiếng chứa các vần om, ôm, ơm?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Hương cốm thơm thôn xóm."?', type: 'single_choice', opts: [['A', 'hương, thôn, xóm'], ['B', 'cốm, thơm, xóm'], ['C', 'hương, cốm, thôn']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần om, ôm, ơm?', type: 'single_choice', opts: [['A', 'Chó đốm đứng ở xóm bên đống rơm.'], ['B', 'Bé ăn một bát cơm.'], ['C', 'Đom đóm bay trong vườn.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành các tiếng: "x… – đ… – th…"', type: 'single_choice', opts: [['A', 'om – ôm – ơm'], ['B', 'ôm – ơm – om'], ['C', 'ơm – om – ôm']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Hương cốm thom thôn xóm."?', type: 'single_choice', opts: [['A', 'cốm'], ['B', 'thom'], ['C', 'xóm']], correct: 'B' },
  { text: 'Vì sao mẹ khen Hà?', type: 'single_choice', opts: [['A', 'Vì Hà chọn quả cam to phần bố'], ['B', 'Vì Hà ăn hết giỏ cam'], ['C', 'Vì Hà đem cam đi chơi']], correct: 'A' },
  { text: 'Việc Hà chọn quả cam to phần bố cho thấy Hà là người như thế nào?', type: 'single_choice', opts: [['A', 'Biết yêu thương và quan tâm đến bố'], ['B', 'Chỉ thích chọn quả to'], ['C', 'Không muốn chia sẻ với mọi người']], correct: 'A' },
  { text: 'Bạn nhỏ đá bóng làm vỡ bình hoa. Bạn nên làm gì?', type: 'single_choice', opts: [['A', 'Nói xin lỗi và nhận lỗi'], ['B', 'Chạy ra ngoài trốn'], ['C', 'Đổ lỗi cho người khác']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Mẹ khen và thơm lên má Hà. (2) Cô Mơ đến thăm nhà Hà. (3) Hà chọn quả cam to phần bố. (4) Cô Mơ cho Hà một giỏ cam.', type: 'single_choice', opts: [['A', '2 – 4 – 3 – 1'], ['B', '4 – 2 – 1 – 3'], ['C', '3 – 1 – 2 – 4']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 36: Vần om, ôm, ơm (lesson 750)…');
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
