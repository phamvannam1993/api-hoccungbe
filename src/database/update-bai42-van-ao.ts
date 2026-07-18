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

const LESSON_ID = 756; // van-ao-eo (Bài 42: Vần ao, eo) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ao, eo'], ['B', 'ai, ay'], ['C', 'oi, ôi']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ao?', type: 'single_choice', opts: [['A', 'dao'], ['B', 'kẹo'], ['C', 'đèo']], correct: 'A' },
  { text: 'Tiếng nào chứa vần eo?', type: 'single_choice', opts: [['A', 'sáo'], ['B', 'chào'], ['C', 'dẻo']], correct: 'C' },
  { text: 'Tiếng "sáo" chứa vần nào?', type: 'single_choice', opts: [['A', 'ao'], ['B', 'eo'], ['C', 'ai']], correct: 'A' },
  { text: 'Hình màu vàng có năm cánh trong bài là gì?', type: 'single_choice', opts: [['A', 'Ngôi sao'], ['B', 'Bông hoa'], ['C', 'Mặt trời']], correct: 'A' },
  { text: 'Quả có màu đỏ trong bài là quả gì?', type: 'single_choice', opts: [['A', 'Quả cam'], ['B', 'Quả táo'], ['C', 'Quả lê']], correct: 'B' },
  { text: 'Vật nhỏ được gói bằng giấy nhiều màu là gì?', type: 'single_choice', opts: [['A', 'Cái kẹo'], ['B', 'Cái bánh'], ['C', 'Cái bút']], correct: 'A' },
  { text: 'Mặt ao có nhiều cây xanh nhỏ nổi trên nước được gọi là gì?', type: 'single_choice', opts: [['A', 'Ao bèo'], ['B', 'Ao cá'], ['C', 'Hồ sen']], correct: 'A' },
  { text: 'Cụm từ "ngôi sao" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Tiếng nào có vần eo?', type: 'single_choice', opts: [['A', 'cao'], ['B', 'veo'], ['C', 'mào']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "chào"?', type: 'single_choice', opts: [['A', 'dao'], ['B', 'dẻo'], ['C', 'kẹo']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "kẹo"?', type: 'single_choice', opts: [['A', 'sáo'], ['B', 'táo'], ['C', 'dẻo']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ao?', type: 'single_choice', opts: [['A', 'chào, dao, sáo'], ['B', 'dẻo, đèo, kẹo'], ['C', 'bèo, veo, khéo']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần eo?', type: 'single_choice', opts: [['A', 'cao, mào, sao'], ['B', 'đèo, kẹo, bèo'], ['C', 'chào, táo, sáo']], correct: 'B' },
  { text: 'Chọn các từ thích hợp để hoàn thành câu: "Ao thu lạnh ___, nước trong ___."', type: 'single_choice', opts: [['A', 'lẽo – veo'], ['B', 'veo – lẽo'], ['C', 'cao – veo']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Ao thu / nước trong veo / lạnh lẽo.', type: 'single_choice', opts: [['A', 'Ao thu nước trong veo lạnh lẽo.'], ['B', 'Ao thu lạnh lẽo, nước trong veo.'], ['C', 'Nước ao thu lạnh trong veo lẽo.']], correct: 'B' },
  { text: 'Đọc đoạn: "Trên cây cao, đàn chào mào bay đi, bay lại. Mấy chú sáo đen vui ca véo von. Còn chim ri vẫn chăm chỉ. Chú tha rơm khô về khéo léo làm tổ." — Đàn chim nào bay đi, bay lại trên cây cao?', type: 'single_choice', opts: [['A', 'Đàn chào mào'], ['B', 'Đàn chim ri'], ['C', 'Đàn bồ câu']], correct: 'A' },
  { text: 'Mấy chú sáo đen đang làm gì?', type: 'single_choice', opts: [['A', 'Ngủ trong tổ'], ['B', 'Vui ca véo von'], ['C', 'Tìm thức ăn dưới đất']], correct: 'B' },
  { text: 'Chim ri tha gì về làm tổ?', type: 'single_choice', opts: [['A', 'Lá xanh'], ['B', 'Cành cây lớn'], ['C', 'Rơm khô']], correct: 'C' },
  { text: 'Từ nào nói về đức tính của chim ri?', type: 'single_choice', opts: [['A', 'Chăm chỉ'], ['B', 'Lười biếng'], ['C', 'Nghịch ngợm']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Ao thu lạnh lẽo, nước trong veo" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Trong câu "Ao thu lạnh lẽo, nước trong veo", có bao nhiêu tiếng chứa vần ao hoặc eo?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Ao thu lạnh lẽo, nước trong veo"?', type: 'single_choice', opts: [['A', 'ao, lẽo, veo'], ['B', 'thu, lạnh, nước'], ['C', 'ao, trong, nước']], correct: 'A' },
  { text: 'Câu "Trên cây cao, đàn chào mào bay đi, bay lại" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'C' },
  { text: 'Những tiếng nào chứa vần ao trong câu "Trên cây cao, đàn chào mào bay đi, bay lại"?', type: 'single_choice', opts: [['A', 'cao, chào, mào'], ['B', 'cây, bay, lại'], ['C', 'trên, đàn, đi']], correct: 'A' },
  { text: 'Câu nào có cả vần ao và vần eo?', type: 'single_choice', opts: [['A', 'Chim sáo khéo léo làm tổ.'], ['B', 'Bé nhìn ngôi sao.'], ['C', 'Mẹ cho bé cái kẹo.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "ngôi s… – cái k… – ao b…"', type: 'single_choice', opts: [['A', 'ao – eo – eo'], ['B', 'eo – ao – ao'], ['C', 'ao – ao – eo']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Chim sáo khéo léu làm tổ."?', type: 'single_choice', opts: [['A', 'sáo'], ['B', 'khéo'], ['C', 'léu']], correct: 'C' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Chim ri tha rơm khô về. (2) Đàn chào mào bay đi, bay lại. (3) Chim ri khéo léo làm tổ. (4) Mấy chú sáo đen vui ca.', type: 'single_choice', opts: [['A', '2 – 4 – 1 – 3'], ['B', '1 – 3 – 2 – 4'], ['C', '4 – 2 – 3 – 1']], correct: 'A' },
  { text: 'Qua hình ảnh chim ri, em học được điều gì?', type: 'single_choice', opts: [['A', 'Chăm chỉ và khéo léo làm việc'], ['B', 'Chỉ vui chơi, không cần làm việc'], ['C', 'Nhờ người khác làm mọi việc']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 42: Vần ao, eo (lesson 756)…');
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
