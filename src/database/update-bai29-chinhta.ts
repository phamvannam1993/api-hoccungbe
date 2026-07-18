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

const LESSON_ID = 743; // luyen-tap-chinh-ta-1 (Bài 29: Luyện tập chính tả) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Chọn chữ "c".', type: 'single_choice', opts: [['A', 'c'], ['B', 'k'], ['C', 'g']], correct: 'A' },
  { text: 'Chọn chữ "k".', type: 'single_choice', opts: [['A', 'c'], ['B', 'k'], ['C', 'gh']], correct: 'B' },
  { text: 'Chọn chữ "g".', type: 'single_choice', opts: [['A', 'gh'], ['B', 'ng'], ['C', 'g']], correct: 'C' },
  { text: 'Chọn chữ ghép "gh".', type: 'single_choice', opts: [['A', 'g'], ['B', 'gh'], ['C', 'ngh']], correct: 'B' },
  { text: 'Chọn chữ ghép "ng".', type: 'single_choice', opts: [['A', 'ng'], ['B', 'ngh'], ['C', 'nh']], correct: 'A' },
  { text: 'Chọn chữ ghép "ngh".', type: 'single_choice', opts: [['A', 'gh'], ['B', 'ng'], ['C', 'ngh']], correct: 'C' },
  { text: 'Chọn từ đúng với hình con cá cờ.', type: 'single_choice', opts: [['A', 'cá cờ'], ['B', 'ká cờ'], ['C', 'gá cờ']], correct: 'A' },
  { text: 'Chọn từ đúng với hình chiếc ghế bằng gỗ.', type: 'single_choice', opts: [['A', 'gế gỗ'], ['B', 'ghế gỗ'], ['C', 'ghế ghỗ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình con cá ngừ.', type: 'single_choice', opts: [['A', 'cá nghừ'], ['B', 'cá ngừ'], ['C', 'cá nhừ']], correct: 'B' },
  { text: 'Chọn từ đúng với hình củ nghệ.', type: 'single_choice', opts: [['A', 'củ ngệ'], ['B', 'củ nghệ'], ['C', 'củ nhệ']], correct: 'B' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Điền c hoặc k: "_á cờ"', type: 'single_choice', opts: [['A', 'c'], ['B', 'k']], correct: 'A' },
  { text: 'Điền c hoặc k: "chữ _í"', type: 'single_choice', opts: [['A', 'c'], ['B', 'k']], correct: 'B' },
  { text: 'Điền c hoặc k: "_ệ sách"', type: 'single_choice', opts: [['A', 'c'], ['B', 'k']], correct: 'B' },
  { text: 'Điền g hoặc gh: "_à gô"', type: 'single_choice', opts: [['A', 'g'], ['B', 'gh']], correct: 'A' },
  { text: 'Điền g hoặc gh: "_ế gỗ"', type: 'single_choice', opts: [['A', 'g'], ['B', 'gh']], correct: 'B' },
  { text: 'Điền g hoặc gh: "_i bài"', type: 'single_choice', opts: [['A', 'g'], ['B', 'gh']], correct: 'B' },
  { text: 'Điền ng hoặc ngh: "cá _ừ"', type: 'single_choice', opts: [['A', 'ng'], ['B', 'ngh']], correct: 'A' },
  { text: 'Điền ng hoặc ngh: "_ỉ hè"', type: 'single_choice', opts: [['A', 'ng'], ['B', 'ngh']], correct: 'B' },
  { text: 'Cách viết nào đúng?', type: 'single_choice', opts: [['A', 'chữ cí'], ['B', 'chữ kí'], ['C', 'chữ khí']], correct: 'B' },
  { text: 'Cách viết nào đúng?', type: 'single_choice', opts: [['A', 'ngề nghiệp'], ['B', 'nghề nghiệp'], ['C', 'nhề nghiệp']], correct: 'B' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Chọn tất cả các tiếng bắt đầu bằng c', type: 'multiple_choice', opts: [['A', 'cá'], ['B', 'cò'], ['C', 'cổ'], ['D', 'ki'], ['E', 'cọ']], correct: ['A', 'B', 'C', 'E'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng k', type: 'multiple_choice', opts: [['A', 'kè'], ['B', 'kế'], ['C', 'kẻ'], ['D', 'kệ'], ['E', 'cá']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng gh', type: 'multiple_choice', opts: [['A', 'ghe'], ['B', 'ghi'], ['C', 'ghế'], ['D', 'ghẹ'], ['E', 'gà']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Chọn tất cả các tiếng bắt đầu bằng ngh', type: 'multiple_choice', opts: [['A', 'nghe'], ['B', 'nghề'], ['C', 'nghé'], ['D', 'nghỉ'], ['E', 'ngõ']], correct: ['A', 'B', 'C', 'D'] },
  { text: 'Trước các chữ e, ê, i, em thường viết nhóm nào?', type: 'single_choice', opts: [['A', 'c, g, ng'], ['B', 'k, gh, ngh'], ['C', 'ch, kh, nh']], correct: 'B' },
  { text: 'Trước các chữ a, o, ô, ơ, u, ư, em thường viết nhóm nào?', type: 'single_choice', opts: [['A', 'c, g, ng'], ['B', 'k, gh, ngh'], ['C', 'gi, nh, th']], correct: 'A' },
  { text: 'Sửa từ viết sai trong câu: "Bé dùng thước để cẻ ô."', type: 'single_choice', opts: [['A', 'Sửa "cẻ" thành "kẻ"'], ['B', 'Sửa "ô" thành "ơ"'], ['C', 'Sửa "thước" thành "thướk"']], correct: 'A' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'Bé ngồi trên gế gỗ.'], ['B', 'Bé ngồi trên ghế ghỗ.'], ['C', 'Bé ngồi trên ghế gỗ.']], correct: 'C' },
  { text: 'Câu nào được viết đúng?', type: 'single_choice', opts: [['A', 'Bé được ngỉ hè.'], ['B', 'Bé được nghỉ hè.'], ['C', 'Bé được nghỷ hè.']], correct: 'B' },
  { text: 'Dòng nào gồm toàn bộ các từ được viết đúng chính tả?', type: 'single_choice', opts: [['A', 'cá cờ – chữ kí – ghế gỗ – củ nghệ'], ['B', 'ká cờ – chữ cí – gế gỗ – củ ngệ'], ['C', 'cá cờ – chữ khí – ghế ghỗ – củ nghê']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 29: Luyện tập chính tả (lesson 743)…');
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
