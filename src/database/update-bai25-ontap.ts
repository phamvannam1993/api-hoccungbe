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

const LESSON_ID = 739; // on-tap-va-ke-chuyen-5 (Bài 25: Ôn tập và kể chuyện) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "r" viết thường.', type: 'single_choice', opts: [['A', 's'], ['B', 'r'], ['C', 't']], correct: 'B' },
  { text: 'Chọn chữ "s" viết thường.', type: 'single_choice', opts: [['A', 's'], ['B', 'r'], ['C', 'c']], correct: 'A' },
  { text: 'Chọn chữ "t" viết thường.', type: 'single_choice', opts: [['A', 'tr'], ['B', 'th'], ['C', 't']], correct: 'C' },
  { text: 'Chọn chữ ghép "tr".', type: 'single_choice', opts: [['A', 'th'], ['B', 'tr'], ['C', 'ch']], correct: 'B' },
  { text: 'Chọn chữ ghép "th".', type: 'single_choice', opts: [['A', 'th'], ['B', 'tr'], ['C', 'kh']], correct: 'A' },
  { text: 'Chọn từ đúng với hình củ sả.', type: 'single_choice', opts: [['A', 'củ sả'], ['B', 'củ nghệ'], ['C', 'củ khoai']], correct: 'A' },
  { text: 'Chọn từ đúng với hình rễ cây tre.', type: 'single_choice', opts: [['A', 'lá tre'], ['B', 'rễ tre'], ['C', 'cây khế']], correct: 'B' },
  { text: 'Chọn từ đúng với hình chiếc lá mía.', type: 'single_choice', opts: [['A', 'lá mía'], ['B', 'lá hẹ'], ['C', 'lá nho']], correct: 'A' },
  { text: 'Chọn từ đúng với hình cửa sổ.', type: 'single_choice', opts: [['A', 'cửa sổ'], ['B', 'nhà gỗ'], ['C', 'ghế gỗ']], correct: 'A' },
  { text: 'Mùa hè, nhà bà có những quả gì?', type: 'single_choice', opts: [['A', 'Dừa và dưa lê'], ['B', 'Na và thị'], ['C', 'Khế và đu đủ']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Ghép r + i được tiếng nào?', type: 'single_choice', opts: [['A', 'ri'], ['B', 'si'], ['C', 'ti']], correct: 'A' },
  { text: 'Ghép s + u được tiếng nào?', type: 'single_choice', opts: [['A', 'ru'], ['B', 'su'], ['C', 'thu']], correct: 'B' },
  { text: 'Ghép t + ia được tiếng nào?', type: 'single_choice', opts: [['A', 'tia'], ['B', 'thia'], ['C', 'tria']], correct: 'A' },
  { text: 'Ghép th + ua được tiếng nào?', type: 'single_choice', opts: [['A', 'tua'], ['B', 'trua'], ['C', 'thua']], correct: 'C' },
  { text: 'Ghép th + ưa được tiếng nào?', type: 'single_choice', opts: [['A', 'thưa'], ['B', 'thua'], ['C', 'thư']], correct: 'A' },
  { text: 'Từ nào có tiếng chứa vần ia?', type: 'single_choice', opts: [['A', 'lá mía'], ['B', 'mùa thu'], ['C', 'cửa sổ']], correct: 'A' },
  { text: 'Từ nào có tiếng chứa vần ua?', type: 'single_choice', opts: [['A', 'rễ tre'], ['B', 'khế chua'], ['C', 'củ sả']], correct: 'B' },
  { text: 'Từ nào có tiếng chứa vần ưa?', type: 'single_choice', opts: [['A', 'lụa thưa'], ['B', 'tổ cò'], ['C', 'lá mía']], correct: 'A' },
  { text: 'Mùa thu, nhà bà có những quả gì?', type: 'single_choice', opts: [['A', 'Dừa và dưa lê'], ['B', 'Na và thị'], ['C', 'Mía và khế']], correct: 'B' },
  { text: 'Cụm từ nào là nội dung luyện viết của bài?', type: 'single_choice', opts: [['A', 'giữa mùa mưa lũ'], ['B', 'mùa hè có dừa'], ['C', 'rễ tre nho nhỏ']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ r', type: 'multiple_choice', opts: [['A', 'rễ'], ['B', 'ri'], ['C', 'sả'], ['D', 'rổ'], ['E', 'tre']], correct: ['A', 'B', 'D'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng chữ s', type: 'multiple_choice', opts: [['A', 'sả'], ['B', 'sổ'], ['C', 'su'], ['D', 'rễ'], ['E', 'tre']], correct: ['A', 'B', 'C'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng th', type: 'multiple_choice', opts: [['A', 'thưa'], ['B', 'thu'], ['C', 'thị'], ['D', 'tre'], ['E', 'tổ']], correct: ['A', 'B', 'C'] },
  { text: 'Nhận xét nào đúng về từ "lụa thưa"?', type: 'single_choice', opts: [['A', 'Tiếng lụa có vần ua, tiếng thưa có vần ưa'], ['B', 'Cả hai tiếng đều có vần ia'], ['C', 'Tiếng lụa có vần ưa, tiếng thưa có vần ua']], correct: 'A' },
  { text: 'Tiếng nào không cùng nhóm với các tiếng còn lại?', type: 'single_choice', opts: [['A', 'mía'], ['B', 'lụa'], ['C', 'mùa'], ['D', 'chua']], correct: 'A' },
  { text: 'Câu "Mùa hè, nhà bà có dừa, có dưa lê." có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '8 tiếng'], ['B', '9 tiếng'], ['C', '10 tiếng']], correct: 'B' },
  { text: 'Khi đang gặm cỏ, cừu non gặp nguy hiểm gì?', type: 'single_choice', opts: [['A', 'Cừu non gặp chó sói'], ['B', 'Cừu non bị lạc đường'], ['C', 'Cừu non rơi xuống nước']], correct: 'A' },
  { text: 'Cừu non đã đề nghị chó sói làm gì?', type: 'single_choice', opts: [['A', 'Hát hoặc hú lên để cừu non múa'], ['B', 'Đi tìm thêm thức ăn'], ['C', 'Đưa cừu non về nhà']], correct: 'A' },
  { text: 'Cừu non đã thoát khỏi chó sói bằng cách nào?', type: 'single_choice', opts: [['A', 'Khiến chó sói cất tiếng hú, làm người chăn cừu nghe thấy và chạy đến'], ['B', 'Tự mình đánh đuổi chó sói'], ['C', 'Trốn xuống một chiếc hang']], correct: 'A' },
  { text: 'Câu chuyện "Chó sói và cừu non" nhắc em điều gì?', type: 'single_choice', opts: [['A', 'Khi gặp nguy hiểm cần bình tĩnh, nhanh trí tìm cách cầu cứu'], ['B', 'Khi gặp khó khăn nên đứng im chờ đợi'], ['C', 'Không cần nghe lời người lớn']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 25: Ôn tập và kể chuyện (lesson 739)…');
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
