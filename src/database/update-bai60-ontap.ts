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

const LESSON_ID = 774; // on-tap-va-ke-chuyen-12 (Bài 60: Ôn tập và kể chuyện 12) — Tiếng Việt lớp 1

type Q = { text: string; type: 'single_choice' | 'multiple_choice'; opts: [string, string][]; correct: string | string[] };

// Mức DỄ (exerciseNumber = 1) — Câu 1–10
const EASY: Q[] = [
  { text: 'Bài 60 thuộc dạng bài nào?', type: 'single_choice', opts: [['A', 'Ôn tập và kể chuyện'], ['B', 'Học vần mới'], ['C', 'Tập làm toán']], correct: 'A' },
  { text: 'Tiếng "dẹp" chứa vần nào?', type: 'single_choice', opts: [['A', 'ep'], ['B', 'êp'], ['C', 'ip']], correct: 'A' },
  { text: 'Tiếng "xếp" chứa vần nào?', type: 'single_choice', opts: [['A', 'ep'], ['B', 'êp'], ['C', 'up']], correct: 'B' },
  { text: 'Tiếng "kịp" chứa vần nào?', type: 'single_choice', opts: [['A', 'êp'], ['B', 'ip'], ['C', 'up']], correct: 'B' },
  { text: 'Tiếng "cúp" chứa vần nào?', type: 'single_choice', opts: [['A', 'ep'], ['B', 'ip'], ['C', 'up']], correct: 'C' },
  { text: 'Tiếng "vách" chứa vần nào?', type: 'single_choice', opts: [['A', 'ach'], ['B', 'êch'], ['C', 'ich']], correct: 'A' },
  { text: 'Tiếng "chếch" chứa vần nào?', type: 'single_choice', opts: [['A', 'ach'], ['B', 'êch'], ['C', 'ich']], correct: 'B' },
  { text: 'Tiếng "đích" chứa vần nào?', type: 'single_choice', opts: [['A', 'ach'], ['B', 'êch'], ['C', 'ich']], correct: 'C' },
  { text: 'Hà rất thích con vật nào bà cho?', type: 'single_choice', opts: [['A', 'Con gà'], ['B', 'Con vịt'], ['C', 'Con mèo']], correct: 'A' },
  { text: 'Câu chuyện trong bài có tên là gì?', type: 'single_choice', opts: [['A', 'Quạ và đàn bồ câu'], ['B', 'Mật ong của gấu con'], ['C', 'Gà nâu và vịt xám']], correct: 'A' },
];

// Mức TRUNG BÌNH (exerciseNumber = 2) — Câu 11–20
const MEDIUM: Q[] = [
  { text: 'Tiếng nào có cùng vần với tiếng "dẹp"?', type: 'single_choice', opts: [['A', 'đẹp'], ['B', 'nếp'], ['C', 'kịp']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "xếp"?', type: 'single_choice', opts: [['A', 'dép'], ['B', 'nếp'], ['C', 'giúp']], correct: 'B' },
  { text: 'Tiếng nào có cùng vần với tiếng "kịp"?', type: 'single_choice', opts: [['A', 'nhịp'], ['B', 'búp'], ['C', 'đẹp']], correct: 'A' },
  { text: 'Tiếng nào có cùng vần với tiếng "cúp"?', type: 'single_choice', opts: [['A', 'xếp'], ['B', 'búp'], ['C', 'kịp']], correct: 'B' },
  { text: 'Nhóm nào lần lượt chứa các vần anh, ênh, inh?', type: 'single_choice', opts: [['A', 'rãnh, ghềnh, đỉnh'], ['B', 'ghềnh, đỉnh, rãnh'], ['C', 'đỉnh, rãnh, ghềnh']], correct: 'A' },
  { text: 'Cụm từ nào được viết đúng?', type: 'single_choice', opts: [['A', 'Xinh đẹp'], ['B', 'Xinh dẹp'], ['C', 'Sinh đẹp']], correct: 'A' },
  { text: 'Đọc đoạn: "Hà rất thích con gà bà cho. Sáng sáng, Hà dậy sớm chờ gà gáy ò ó o. Vậy mà mãi nó chẳng gáy. Một hôm, Hà tỉnh giấc nghe gà cục ta cục tác. Giờ Hà đã rõ vì sao con gà chẳng gáy." — Sáng sáng, Hà dậy sớm để làm gì?', type: 'single_choice', opts: [['A', 'Chờ nghe gà gáy'], ['B', 'Cho gà đi bơi'], ['C', 'Đưa gà đến trường']], correct: 'A' },
  { text: 'Hà chờ con gà gáy bằng âm thanh nào?', type: 'single_choice', opts: [['A', 'Ò ó o'], ['B', 'Cạp cạp'], ['C', 'Meo meo']], correct: 'A' },
  { text: 'Một hôm, Hà nghe con gà kêu như thế nào?', type: 'single_choice', opts: [['A', 'Cục ta cục tác'], ['B', 'Ò ó o'], ['C', 'Gâu gâu']], correct: 'A' },
  { text: 'Vì sao con gà của Hà không gáy "ò ó o"?', type: 'single_choice', opts: [['A', 'Vì đó là gà mái'], ['B', 'Vì con gà đang ngủ'], ['C', 'Vì con gà bị lạc']], correct: 'A' },
];

// Mức KHÓ / NÂNG CAO (exerciseNumber = 3) — Câu 21–30
const HARD: Q[] = [
  { text: 'Câu "Em vẽ vầng trăng sáng" có bao nhiêu tiếng?', type: 'single_choice', opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'B' },
  { text: 'Trong câu "Em vẽ vầng trăng sáng", có bao nhiêu tiếng chứa các vần ang, ăng, âng?', type: 'single_choice', opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'B' },
  { text: 'Ba tiếng "vầng – trăng – sáng" lần lượt chứa những vần nào?', type: 'single_choice', opts: [['A', 'âng – ăng – ang'], ['B', 'ăng – ang – âng'], ['C', 'ang – âng – ăng']], correct: 'A' },
  { text: 'Nhóm nào lần lượt chứa các vần ach, êch, ich?', type: 'single_choice', opts: [['A', 'vách, chếch, đích'], ['B', 'chếch, đích, vách'], ['C', 'đích, vách, chếch']], correct: 'A' },
  { text: 'Nhóm nào có đủ bốn vần ep, êp, ip, up?', type: 'single_choice', opts: [['A', 'dẹp, xếp, kịp, cúp'], ['B', 'đẹp, dép, vách, đích'], ['C', 'rãnh, ghềnh, đỉnh, sáng']], correct: 'A' },
  { text: 'Sắp xếp sự việc theo đúng thứ tự câu chuyện "Quạ và đàn bồ câu": (1) Quạ bôi trắng bộ lông của mình. (2) Đàn bồ câu cho quạ vào chuồng. (3) Đàn bồ câu phát hiện và đuổi quạ đi. (4) Họ nhà quạ cũng không nhận quạ.', type: 'single_choice', opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 1 – 4 – 3'], ['C', '3 – 2 – 1 – 4']], correct: 'A' },
  { text: 'Quạ bôi trắng bộ lông của mình để làm gì?', type: 'single_choice', opts: [['A', 'Giả làm bồ câu để được vào chuồng'], ['B', 'Làm cho bộ lông sạch hơn'], ['C', 'Tránh bị nóng dưới trời nắng']], correct: 'A' },
  { text: 'Vì sao đàn bồ câu cho quạ vào chuồng?', type: 'single_choice', opts: [['A', 'Vì tưởng quạ là một con bồ câu'], ['B', 'Vì biết quạ đang giả vờ'], ['C', 'Vì quạ mang thức ăn đến']], correct: 'A' },
  { text: 'Vì sao họ nhà quạ cũng đuổi quạ đi?', type: 'single_choice', opts: [['A', 'Vì bộ lông trắng khiến quạ không còn giống đồng loại'], ['B', 'Vì quạ không biết bay'], ['C', 'Vì quạ không tìm được thức ăn']], correct: 'A' },
  { text: 'Câu chuyện "Quạ và đàn bồ câu" nhắc chúng ta điều gì?', type: 'single_choice', opts: [['A', 'Cần sống thật thà, không giả dối để đạt lợi ích'], ['B', 'Nên thay đổi vẻ ngoài để đánh lừa người khác'], ['C', 'Có thể nói dối khi muốn được ăn ngon']], correct: 'A' },
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
  console.log('Cập nhật quiz Bài 60: Ôn tập và kể chuyện 12 (lesson 774)…');
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
