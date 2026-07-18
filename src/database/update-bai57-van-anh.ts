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

const LESSON_ID = 771; // van-anh-enh-inh (Bài 57: Vần anh, ênh, inh) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'anh, ênh, inh'], ['B', 'an, ên, in'], ['C', 'ang, êng, ing']], correct: 'A' },
  { text: 'Tiếng nào chứa vần anh?', type: 'single_choice', opts: [['A', 'chanh'], ['B', 'kênh'], ['C', 'kính']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ênh?', type: 'single_choice', opts: [['A', 'cạnh'], ['B', 'kênh'], ['C', 'chính']], correct: 'B' },
  { text: 'Tiếng nào chứa vần inh?', type: 'single_choice', opts: [['A', 'mảnh'], ['B', 'lệnh'], ['C', 'kính']], correct: 'C' },
  { text: 'Quả màu xanh, có vị chua trong bài là quả gì?', type: 'single_choice', opts: [['A', 'Quả chanh'], ['B', 'Quả cam'], ['C', 'Quả táo']], correct: 'A' },
  { text: 'Phần đất nằm sát dòng kênh được gọi là gì?', type: 'single_choice', opts: [['A', 'Bờ kênh'], ['B', 'Bờ biển'], ['C', 'Bờ ruộng']], correct: 'A' },
  { text: 'Vật dùng để che mắt khỏi ánh nắng là gì?', type: 'single_choice', opts: [['A', 'Kính râm'], ['B', 'Mũ len'], ['C', 'Khăn quàng']], correct: 'A' },
  { text: 'Con kênh xinh xinh chảy qua đâu?', type: 'single_choice', opts: [['A', 'Cánh đồng'], ['B', 'Sân trường'], ['C', 'Khu phố']], correct: 'A' },
  { text: 'Tiếng "cánh" chứa vần nào?', type: 'single_choice', opts: [['A', 'anh'], ['B', 'ênh'], ['C', 'inh']], correct: 'A' },
  { text: 'Cụm từ "kính râm" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "chanh"?', type: 'single_choice', opts: [['A', 'nhanh'], ['B', 'kênh'], ['C', 'kính']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "kênh"?', type: 'single_choice', opts: [['A', 'ghềnh'], ['B', 'cạnh'], ['C', 'chính']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "kính"?', type: 'single_choice', opts: [['A', 'chính'], ['B', 'mảnh'], ['C', 'lệnh']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần anh?', type: 'single_choice', opts: [['A', 'chanh, mảnh, cạnh'], ['B', 'kênh, ghềnh, lệnh'], ['C', 'kính, chính, thịnh']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ênh?', type: 'single_choice', opts: [['A', 'chanh, cạnh, nhanh'], ['B', 'kênh, ghềnh, lệnh'], ['C', 'kính, xinh, chính']], correct: 'B' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần inh?', type: 'single_choice', opts: [['A', 'mảnh, chanh, cạnh'], ['B', 'kênh, ghềnh, lệnh'], ['C', 'kính, chính, thịnh']], correct: 'C' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Con kênh xinh xinh chảy qua ___ đồng."', type: 'single_choice', opts: [['A', 'cánh'], ['B', 'kính'], ['C', 'ghềnh']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: chảy qua cánh đồng / Con kênh / xinh xinh.', type: 'single_choice', opts: [['A', 'Con kênh xinh xinh chảy qua cánh đồng.'], ['B', 'Xinh xinh con kênh cánh đồng chảy qua.'], ['C', 'Cánh đồng con kênh chảy qua xinh xinh.']], correct: 'A' },
  { text: 'Đọc đoạn: "Nhà vịt ở gần một con kênh xinh xinh. Hôm nay trời đẹp, bố mẹ cho vịt con ra kênh tập bơi. Mới tập mà vịt con đã bơi rất nhanh." — Nhà vịt ở gần đâu?', type: 'single_choice', opts: [['A', 'Một con kênh xinh xinh'], ['B', 'Một khu rừng lớn'], ['C', 'Một ngọn núi cao']], correct: 'A' },
  { text: 'Bố mẹ cho vịt con ra kênh để làm gì?', type: 'single_choice', opts: [['A', 'Tập bơi'], ['B', 'Bắt cá'], ['C', 'Hái hoa']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Con kênh xinh xinh chảy qua cánh đồng." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '7 tiếng'], ['B', '8 tiếng'], ['C', '9 tiếng']], correct: 'B' },
  { text: 'Trong câu "Con kênh xinh xinh chảy qua cánh đồng." có bao nhiêu tiếng chứa các vần anh, ênh, inh?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Con kênh xinh xinh chảy qua cánh đồng."?', type: 'single_choice', opts: [['A', 'kênh, xinh, xinh, cánh'], ['B', 'con, chảy, qua, đồng'], ['C', 'con, kênh, qua, đồng']], correct: 'A' },
  { text: 'Câu "Nhà vịt ở gần một con kênh xinh xinh" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Trong toàn bộ đoạn đọc về gia đình vịt, có bao nhiêu tiếng chứa vần anh, ênh hoặc inh?', type: 'single_choice', opts: [['A', '6 tiếng'], ['B', '7 tiếng'], ['C', '8 tiếng']], correct: 'B' },
  { text: 'Câu nào có đủ cả ba vần anh, ênh, inh?', type: 'single_choice', opts: [['A', 'Bé đeo kính đứng bên kênh ngắm cánh đồng.'], ['B', 'Bé đeo kính nhìn cánh đồng.'], ['C', 'Con kênh chảy qua cánh đồng.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "quả ch… – bờ k… – k… râm"', type: 'single_choice', opts: [['A', 'anh – ênh – inh'], ['B', 'ênh – inh – anh'], ['C', 'inh – anh – ênh']], correct: 'A' },
  { text: 'Tiếng nào viết sai trong câu: "Con kên xinh xinh chảy qua cánh đồng."?', type: 'single_choice', opts: [['A', 'con'], ['B', 'kên'], ['C', 'cánh']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Nhà vịt ở gần một con kênh. (2) Bố mẹ cho vịt con ra kênh tập bơi. (3) Vịt con bơi rất nhanh. (4) Gia đình vịt vui vẻ, kêu cạp cạp.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 4 – 1 – 2']], correct: 'A' },
  { text: 'Việc làm nào giúp em giữ gìn sức khỏe?', type: 'single_choice', opts: [['A', 'Tập thể dục đều đặn, ăn uống đủ chất và ngủ đúng giờ'], ['B', 'Thức khuya và không vận động'], ['C', 'Chỉ ăn bánh kẹo và xem tivi cả ngày']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 57: Vần anh, ênh, inh (lesson 771)…');
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
