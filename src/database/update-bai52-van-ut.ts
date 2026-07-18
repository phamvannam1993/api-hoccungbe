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

const LESSON_ID = 766; // van-ut-ut (Bài 52: Vần ut, ưt) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài học hôm nay giới thiệu những vần nào?', type: 'single_choice', opts: [['A', 'ut, ưt'], ['B', 'et, êt'], ['C', 'ot, ôt']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ut?', type: 'single_choice', opts: [['A', 'bút'], ['B', 'mứt'], ['C', 'nứt']], correct: 'A' },
  { text: 'Tiếng nào chứa vần ưt?', type: 'single_choice', opts: [['A', 'hụt'], ['B', 'lụt'], ['C', 'mứt']], correct: 'C' },
  { text: 'Tiếng "sút" chứa vần nào?', type: 'single_choice', opts: [['A', 'ut'], ['B', 'ưt'], ['C', 'it']], correct: 'A' },
  { text: 'Vật dùng để viết và vẽ trong bài là gì?', type: 'single_choice', opts: [['A', 'Bút chì'], ['B', 'Thước kẻ'], ['C', 'Cục tẩy']], correct: 'A' },
  { text: 'Món ăn ngọt được làm từ dừa trong bài là gì?', type: 'single_choice', opts: [['A', 'Bánh dừa'], ['B', 'Mứt dừa'], ['C', 'Kẹo lạc']], correct: 'B' },
  { text: 'Mặt đất trong tranh bị khô và xuất hiện nhiều đường rạn được gọi là gì?', type: 'single_choice', opts: [['A', 'Nứt nẻ'], ['B', 'Ngập nước'], ['C', 'Trơn bóng']], correct: 'A' },
  { text: 'Cầu thủ số 7 đã thực hiện hành động gì?', type: 'single_choice', opts: [['A', 'Sút bóng'], ['B', 'Bắt bóng'], ['C', 'Ném bóng']], correct: 'A' },
  { text: 'Tiếng "nứt" chứa vần nào?', type: 'single_choice', opts: [['A', 'ut'], ['B', 'ưt'], ['C', 'ôt']], correct: 'B' },
  { text: 'Cụm từ "bút chì" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "bút"?', type: 'single_choice', opts: [['A', 'hút'], ['B', 'mứt'], ['C', 'nứt']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "mứt"?', type: 'single_choice', opts: [['A', 'lụt'], ['B', 'sút'], ['C', 'đứt']], correct: 'C' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ut?', type: 'single_choice', opts: [['A', 'bút, hụt, lụt, sút'], ['B', 'mứt, nứt, đứt, sứt'], ['C', 'bút, mứt, lụt, nứt']], correct: 'A' },
  { text: 'Nhóm nào gồm toàn các tiếng chứa vần ưt?', type: 'single_choice', opts: [['A', 'hút, sút, hụt, lụt'], ['B', 'đứt, mứt, nứt, sứt'], ['C', 'bút, mứt, sút, đứt']], correct: 'B' },
  { text: 'Chọn từ thích hợp điền vào chỗ trống: "Cầu thủ số 7 thu ___ khán giả bằng một cú sút dứt điểm."', type: 'single_choice', opts: [['A', 'hút'], ['B', 'hụt'], ['C', 'đứt']], correct: 'A' },
  { text: 'Sắp xếp các cụm từ sau thành câu đúng: Cầu thủ số 7 / khán giả / thu hút / bằng một cú sút đẹp.', type: 'single_choice', opts: [['A', 'Cầu thủ số 7 thu hút khán giả bằng một cú sút đẹp.'], ['B', 'Khán giả cầu thủ số 7 bằng một cú sút đẹp thu hút.'], ['C', 'Thu hút cầu thủ số 7 khán giả một cú sút đẹp.']], correct: 'A' },
  { text: 'Đọc đoạn: "Trận đấu thật gay cấn. Lúc đầu, đội bạn chơi rất hay, đội nhà bị dẫn một bàn. Bất ngờ, cầu thủ số 7 sút xa, tỉ số là một đều. Phút chót, số 7 lại bứt phá ghi bàn. Khán giả hò reo, nhảy múa." — Trận đấu được miêu tả như thế nào?', type: 'single_choice', opts: [['A', 'Gay cấn'], ['B', 'Buồn tẻ'], ['C', 'Yên lặng']], correct: 'A' },
  { text: 'Lúc đầu, đội nhà gặp tình thế nào?', type: 'single_choice', opts: [['A', 'Dẫn trước hai bàn'], ['B', 'Bị dẫn một bàn'], ['C', 'Hai đội chưa ghi bàn']], correct: 'B' },
  { text: 'Cầu thủ số 7 đã làm gì để đưa tỉ số về một đều?', type: 'single_choice', opts: [['A', 'Sút xa ghi bàn'], ['B', 'Bắt được bóng'], ['C', 'Chuyền bóng ra ngoài']], correct: 'A' },
  { text: 'Phút chót, cầu thủ số 7 đã làm gì?', type: 'single_choice', opts: [['A', 'Rời sân'], ['B', 'Bứt phá ghi bàn'], ['C', 'Để mất bóng']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Cụm từ "bút chì, mứt dừa" có tất cả bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '3 tiếng'], ['B', '4 tiếng'], ['C', '5 tiếng']], correct: 'B' },
  { text: 'Trong cụm từ "bút chì, mứt dừa", có bao nhiêu tiếng chứa vần ut hoặc ưt?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Phút chót, số 7 lại bứt phá ghi bàn." có bao nhiêu tiếng chứa vần ut hoặc ưt?', type: 'single_choice', opts: [['A', '1 tiếng'], ['B', '2 tiếng'], ['C', '3 tiếng']], correct: 'B' },
  { text: 'Trong câu "Cầu thủ số 7 thu hút khán giả bằng một cú sút dứt điểm." có bao nhiêu tiếng chứa vần ut hoặc ưt?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Nhóm nào gồm đúng các tiếng chứa vần mới trong câu "Cầu thủ số 7 thu hút khán giả bằng một cú sút dứt điểm."?', type: 'single_choice', opts: [['A', 'thủ, thu, cú'], ['B', 'hút, sút, dứt'], ['C', 'cầu, khán, điểm']], correct: 'B' },
  { text: 'Câu nào có cả vần ut và vần ưt?', type: 'single_choice', opts: [['A', 'Bé dùng bút viết từ "mứt".'], ['B', 'Cầu thủ sút bóng.'], ['C', 'Mẹ làm mứt dừa.']], correct: 'A' },
  { text: 'Chọn thứ tự các vần thích hợp để hoàn thành: "b… chì – m… dừa – n… nẻ"', type: 'single_choice', opts: [['A', 'ut – ưt – ưt'], ['B', 'ưt – ut – ut'], ['C', 'ut – ut – ưt']], correct: 'A' },
  { text: 'Từ nào viết sai trong câu: "Cầu thủ số 7 sút xa rồi bức phá ghi bàn."?', type: 'single_choice', opts: [['A', 'sút'], ['B', 'bức'], ['C', 'bàn']], correct: 'B' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Đội nhà bị dẫn một bàn. (2) Cầu thủ số 7 sút xa gỡ hòa. (3) Phút chót, số 7 bứt phá ghi bàn. (4) Khán giả hò reo, nhảy múa.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 2 – 1 – 4']], correct: 'A' },
  { text: 'Khi tham gia đá bóng, em nên làm gì?', type: 'single_choice', opts: [['A', 'Tuân thủ luật chơi, đoàn kết và không xô đẩy bạn'], ['B', 'Tranh bóng bằng mọi cách'], ['C', 'Cáu giận khi đội mình bị thua']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 52: Vần ut, ưt (lesson 766)…');
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
