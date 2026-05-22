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

const LESSON_ID = 123; // Bài 1: Các số 0, 1, 2, 3, 4, 5

// 50 câu hỏi mới cho bài tập 4-8 (mỗi bài 10 câu)
type QuizType = 'single_choice' | 'multiple_choice' | 'true_false' | 'drag_drop' | 'matching';
type Difficulty = 'easy' | 'medium' | 'hard';

type QuizSeed = {
  questionText: string;
  questionType: QuizType;
  difficultyLevel: Difficulty;
  exerciseNumber: number;
  sortOrder: number;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown;
  explanation?: string;
};

const NEW_QUIZZES: QuizSeed[] = [
  // ─── Bài tập 4: Nhận biết số và số lượng ────────────────────────────────────
  { exerciseNumber: 4, sortOrder: 1,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '🐣🐣 có mấy con gà con?', optionsJson: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}], correctAnswerJson: 'B', explanation: '2 con gà con.' },
  { exerciseNumber: 4, sortOrder: 2,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: 'Số 0 nhỏ hơn tất cả các số 1, 2, 3, 4, 5', correctAnswerJson: true, explanation: '0 là số nhỏ nhất.' },
  { exerciseNumber: 4, sortOrder: 3,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '🍕🍕🍕🍕🍕 có mấy miếng bánh?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '5 miếng bánh.' },
  { exerciseNumber: 4, sortOrder: 4,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: 'Hình vuông có 4 cạnh bằng nhau', correctAnswerJson: true, explanation: '4 cạnh bằng nhau.' },
  { exerciseNumber: 4, sortOrder: 5,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số liền sau số 3 là?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '3, 4.' },
  { exerciseNumber: 4, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: '4 + 1 = ?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '4 + 1 = 5.' },
  { exerciseNumber: 4, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp từ nhỏ đến lớn: 5, 1, 3, 0, 4, 2', optionsJson: [{key:'1',text:'5'},{key:'2',text:'1'},{key:'3',text:'3'},{key:'4',text:'0'},{key:'5',text:'4'},{key:'6',text:'2'}], correctAnswerJson: ['4','2','6','3','5','1'], explanation: '0→1→2→3→4→5.' },
  { exerciseNumber: 4, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số nào - 3 = 2?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '5 - 3 = 2.' },
  { exerciseNumber: 4, sortOrder: 9,  difficultyLevel: 'hard',   questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính có kết quả = 5', optionsJson: [{key:'A',text:'3+2'},{key:'B',text:'4+1'},{key:'C',text:'2+2'}], correctAnswerJson: ['A','B'], explanation: '3+2=5 và 4+1=5.' },
  { exerciseNumber: 4, sortOrder: 10, difficultyLevel: 'hard',   questionType: 'matching',         questionText: 'Nối phép tính với kết quả đúng', optionsJson: [{key:'A',text:'5-5'},{key:'B',text:'3-2'},{key:'C',text:'4-2'}], correctAnswerJson: {A:'0',B:'1',C:'2'}, explanation: '5-5=0; 3-2=1; 4-2=2.' },

  // ─── Bài tập 5: Thứ tự và vị trí số ─────────────────────────────────────────
  { exerciseNumber: 5, sortOrder: 1,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số liền trước số 4 là?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '3, 4.' },
  { exerciseNumber: 5, sortOrder: 2,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: 'Trên trục số, 5 đứng sau 4', correctAnswerJson: true, explanation: '4 rồi đến 5.' },
  { exerciseNumber: 5, sortOrder: 3,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số nào nằm giữa 0 và 2?', optionsJson: [{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'}], correctAnswerJson: 'B', explanation: '0 < 1 < 2.' },
  { exerciseNumber: 5, sortOrder: 4,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: '2 đứng trước 3 trên trục số', correctAnswerJson: true, explanation: '2, 3.' },
  { exerciseNumber: 5, sortOrder: 5,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số đứng ngay trước 5 là?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '4, 5.' },
  { exerciseNumber: 5, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Điền vào dãy số: 0, ___, ___, 3, ___, 5', optionsJson: [{key:'1',text:'1'},{key:'2',text:'2'},{key:'3',text:'4'}], correctAnswerJson: ['1','2','3'], explanation: '0,1,2,3,4,5.' },
  { exerciseNumber: 5, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Có bao nhiêu số từ 0 đến 5 (gồm cả 0 và 5)?', optionsJson: [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '0,1,2,3,4,5 = 6 số.' },
  { exerciseNumber: 5, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số nào vừa lớn hơn 1 vừa nhỏ hơn 4?', optionsJson: [{key:'A',text:'2 và 3'},{key:'B',text:'1 và 4'},{key:'C',text:'3 và 4'}], correctAnswerJson: 'A', explanation: '2 và 3 nằm giữa 1 và 4.' },
  { exerciseNumber: 5, sortOrder: 9,  difficultyLevel: 'hard',   questionType: 'single_choice',   questionText: 'Từ 2 đến 5 có mấy số (gồm cả 2 và 5)?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '2,3,4,5 = 4 số.' },
  { exerciseNumber: 5, sortOrder: 10, difficultyLevel: 'hard',   questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ số nằm giữa 0 và 5 (không kể 0 và 5)', optionsJson: [{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: ['A','B','C'], explanation: '1,2,3,4 đều nằm giữa 0 và 5.' },

  // ─── Bài tập 6: Cộng trừ trong phạm vi 5 ────────────────────────────────────
  { exerciseNumber: 6, sortOrder: 1,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '2 + 2 = ?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '2 + 2 = 4.' },
  { exerciseNumber: 6, sortOrder: 2,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: '3 + 2 = 5', correctAnswerJson: true, explanation: '3 + 2 = 5.' },
  { exerciseNumber: 6, sortOrder: 3,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '5 - 2 = ?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '5 - 2 = 3.' },
  { exerciseNumber: 6, sortOrder: 4,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: '4 - 1 = 3', correctAnswerJson: true, explanation: '4 - 1 = 3.' },
  { exerciseNumber: 6, sortOrder: 5,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '1 + 3 = ?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '1 + 3 = 4.' },
  { exerciseNumber: 6, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Bé có 3 bút, mua thêm 2 cái. Có tất cả mấy cái?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '3 + 2 = 5.' },
  { exerciseNumber: 6, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: ___ + 2 = 5', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '3 + 2 = 5.' },
  { exerciseNumber: 6, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối phép tính với kết quả', optionsJson: [{key:'A',text:'1+2'},{key:'B',text:'2+2'},{key:'C',text:'1+4'}], correctAnswerJson: {A:'3',B:'4',C:'5'}, explanation: '1+2=3; 2+2=4; 1+4=5.' },
  { exerciseNumber: 6, sortOrder: 9,  difficultyLevel: 'hard',   questionType: 'single_choice',   questionText: 'Hoa có 5 quả, ăn 2 quả rồi mua thêm 1 quả. Còn mấy quả?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '5 - 2 + 1 = 4.' },
  { exerciseNumber: 6, sortOrder: 10, difficultyLevel: 'hard',   questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính có kết quả = 3', optionsJson: [{key:'A',text:'1+2'},{key:'B',text:'5-2'},{key:'C',text:'4-2'}], correctAnswerJson: ['A','B'], explanation: '1+2=3 và 5-2=3.' },

  // ─── Bài tập 7: So sánh và sắp xếp ─────────────────────────────────────────
  { exerciseNumber: 7, sortOrder: 1,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số nào lớn nhất trong: 1, 4, 2, 0?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'1'}], correctAnswerJson: 'B', explanation: '4 là lớn nhất.' },
  { exerciseNumber: 7, sortOrder: 2,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: '5 > 4 > 3 > 2 > 1 > 0', correctAnswerJson: true, explanation: 'Đúng, giảm dần.' },
  { exerciseNumber: 7, sortOrder: 3,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Nhóm nào có ít hơn: 🍎🍎🍎 hay 🍊🍊🍊🍊?', optionsJson: [{key:'A',text:'Táo (3)'},{key:'B',text:'Cam (4)'},{key:'C',text:'Bằng nhau'}], correctAnswerJson: 'A', explanation: '3 < 4.' },
  { exerciseNumber: 7, sortOrder: 4,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: '3 = 3', correctAnswerJson: true, explanation: '3 bằng 3.' },
  { exerciseNumber: 7, sortOrder: 5,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Điền dấu: 2 ___ 4', optionsJson: [{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}], correctAnswerJson: 'B', explanation: '2 < 4.' },
  { exerciseNumber: 7, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp từ lớn đến nhỏ: 1, 5, 0, 3, 2, 4', optionsJson: [{key:'1',text:'1'},{key:'2',text:'5'},{key:'3',text:'0'},{key:'4',text:'3'},{key:'5',text:'2'},{key:'6',text:'4'}], correctAnswerJson: ['2','6','4','5','1','3'], explanation: '5→4→3→2→1→0.' },
  { exerciseNumber: 7, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số nào bé hơn 3 và lớn hơn 1?', optionsJson: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}], correctAnswerJson: 'B', explanation: '1 < 2 < 3.' },
  { exerciseNumber: 7, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: '2 + 1 ___ 5 - 1', optionsJson: [{key:'A',text:'='},{key:'B',text:'<'},{key:'C',text:'>'}], correctAnswerJson: 'B', explanation: '2+1=3 < 5-1=4.' },
  { exerciseNumber: 7, sortOrder: 9,  difficultyLevel: 'hard',   questionType: 'single_choice',   questionText: 'Tổng 2 số lớn nhất trong 0,1,2,3 là?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '2+3=5.' },
  { exerciseNumber: 7, sortOrder: 10, difficultyLevel: 'hard',   questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ số lớn hơn 2 và nhỏ hơn 5', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: ['A','B'], explanation: '3 và 4 thỏa 2 < x < 5.' },

  // ─── Bài tập 8: Tổng hợp nâng cao ───────────────────────────────────────────
  { exerciseNumber: 8, sortOrder: 1,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số chẵn đầu tiên trong dãy 0-5 là?', optionsJson: [{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'}], correctAnswerJson: 'A', explanation: '0 là số chẵn đầu tiên.' },
  { exerciseNumber: 8, sortOrder: 2,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: 'Trong dãy 0-5 có 3 số chẵn: 0, 2, 4', correctAnswerJson: true, explanation: '0, 2, 4 là số chẵn.' },
  { exerciseNumber: 8, sortOrder: 3,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: 'Số lẻ lớn nhất trong dãy 0-5 là?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '5 là số lẻ lớn nhất.' },
  { exerciseNumber: 8, sortOrder: 4,  difficultyLevel: 'easy',   questionType: 'true_false',       questionText: 'Trong dãy 0-5 có 3 số lẻ: 1, 3, 5', correctAnswerJson: true, explanation: '1, 3, 5 là số lẻ.' },
  { exerciseNumber: 8, sortOrder: 5,  difficultyLevel: 'easy',   questionType: 'single_choice',   questionText: '0 + 0 = ?', optionsJson: [{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'}], correctAnswerJson: 'A', explanation: '0 + 0 = 0.' },
  { exerciseNumber: 8, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Nam có 2 quả cam, Lan có gấp đôi. Lan có mấy quả?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '2 × 2 = 4.' },
  { exerciseNumber: 8, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 0 + ___ + ___ = 5 (hai số giống nhau)', optionsJson: [{key:'A',text:'2 và 3'},{key:'B',text:'Không thể'},{key:'C',text:'2.5 và 2.5'}], correctAnswerJson: 'B', explanation: 'Không thể dùng 2 số nguyên giống nhau cộng ra 5.' },
  { exerciseNumber: 8, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối số với phân loại', optionsJson: [{key:'A',text:'0'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: {A:'chẵn',B:'lẻ',C:'chẵn'}, explanation: '0,4 chẵn; 3 lẻ.' },
  { exerciseNumber: 8, sortOrder: 9,  difficultyLevel: 'hard',   questionType: 'single_choice',   questionText: 'Tổng tất cả số chẵn trong 0-5 là?', optionsJson: [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}], correctAnswerJson: 'B', explanation: '0+2+4=6.' },
  { exerciseNumber: 8, sortOrder: 10, difficultyLevel: 'hard',   questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phát biểu ĐÚNG', optionsJson: [{key:'A',text:'0+5=5'},{key:'B',text:'3+3=5'},{key:'C',text:'5-0=5'}], correctAnswerJson: ['A','C'], explanation: '0+5=5 và 5-0=5 đúng; 3+3=6≠5.' },
];

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');

  // Step 1: Phân bổ 30 câu hiện có → bài tập 1, 2, 3
  const existing = await ds.query(
    'SELECT id FROM quizzes WHERE lessonId = ? ORDER BY id',
    [LESSON_ID],
  );

  if (existing.length !== 30) {
    console.error(`❌ Cần đúng 30 câu hiện có, hiện có ${existing.length}`);
    await ds.destroy();
    return;
  }

  // IDs 0-9 → exerciseNumber 1, 10-19 → 2, 20-29 → 3
  for (let i = 0; i < 30; i++) {
    const exNum = Math.floor(i / 10) + 1;
    const sortOrd = (i % 10) + 1;
    await ds.query(
      'UPDATE quizzes SET exerciseNumber = ?, sortOrder = ? WHERE id = ?',
      [exNum, sortOrd, existing[i].id],
    );
  }
  console.log('✅ Phân bổ 30 câu hiện có → bài tập 1, 2, 3 (mỗi bài 10 câu)');

  // Step 2: Thêm 50 câu mới cho bài tập 4-8
  let created = 0;

  for (const q of NEW_QUIZZES) {
    const exists = await ds.query(
      'SELECT id FROM quizzes WHERE lessonId = ? AND questionText = ? LIMIT 1',
      [LESSON_ID, q.questionText],
    );
    if (exists.length) continue;

    await ds.query(
      `INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, exerciseNumber, sortOrder, optionsJson, correctAnswerJson, explanation, points, isActive, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 10, 1, NOW(), NOW())`,
      [
        LESSON_ID,
        q.questionText,
        q.questionType,
        q.difficultyLevel,
        q.exerciseNumber,
        q.sortOrder,
        q.optionsJson ? JSON.stringify(q.optionsJson) : null,
        JSON.stringify(q.correctAnswerJson),
        q.explanation ?? null,
      ],
    );
    created++;
  }

  console.log(`✅ Thêm ${created} câu mới cho bài tập 4-8`);

  // Kiểm tra kết quả
  const summary = await ds.query(
    'SELECT exerciseNumber, COUNT(*) as cnt FROM quizzes WHERE lessonId = ? GROUP BY exerciseNumber ORDER BY exerciseNumber',
    [LESSON_ID],
  );
  console.log('\nTổng kết:');
  for (const row of summary) {
    console.log(`  Bài tập ${row.exerciseNumber}: ${row.cnt} câu`);
  }

  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
