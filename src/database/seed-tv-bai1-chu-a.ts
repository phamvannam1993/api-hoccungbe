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

const LESSON_ID = 715; // Bài 1: Chữ cái A a

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

const QUIZZES: QuizSeed[] = [
  // ─── Bài tập 1: Nhận biết chữ A (easy) ─────────────────────────────────────
  {
    exerciseNumber: 1, sortOrder: 1, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Chữ cái nào đây? "A"',
    optionsJson: [{ key: 'A', text: 'A' }, { key: 'B', text: 'B' }, { key: 'C', text: 'C' }, { key: 'D', text: 'D' }],
    correctAnswerJson: 'A',
    explanation: 'Đây là chữ A.',
  },
  {
    exerciseNumber: 1, sortOrder: 2, difficultyLevel: 'easy',
    questionType: 'true_false',
    questionText: 'Chữ "a" và chữ "A" là cùng một chữ cái',
    correctAnswerJson: true,
    explanation: '"a" là chữ thường và "A" là chữ hoa của cùng một chữ cái.',
  },
  {
    exerciseNumber: 1, sortOrder: 3, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Từ nào bắt đầu bằng chữ A?',
    optionsJson: [{ key: 'A', text: 'an' }, { key: 'B', text: 'bé' }, { key: 'C', text: 'con' }, { key: 'D', text: 'dê' }],
    correctAnswerJson: 'A',
    explanation: 'Từ "an" bắt đầu bằng chữ a.',
  },
  {
    exerciseNumber: 1, sortOrder: 4, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Chọn chữ viết hoa của "a"',
    optionsJson: [{ key: 'A', text: 'A' }, { key: 'B', text: 'B' }, { key: 'C', text: 'C' }, { key: 'D', text: 'E' }],
    correctAnswerJson: 'A',
    explanation: 'Chữ hoa của "a" là "A".',
  },
  {
    exerciseNumber: 1, sortOrder: 5, difficultyLevel: 'easy',
    questionType: 'true_false',
    questionText: 'Chữ "A" là chữ cái đầu tiên trong bảng chữ cái',
    correctAnswerJson: true,
    explanation: 'Chữ A đứng đầu tiên trong bảng chữ cái tiếng Việt.',
  },
  {
    exerciseNumber: 1, sortOrder: 6, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Từ nào có chữ "a"?',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'bé' }, { key: 'C', text: 'bí' }, { key: 'D', text: 'bò' }],
    correctAnswerJson: 'A',
    explanation: 'Từ "ba" có chứa chữ "a".',
  },
  {
    exerciseNumber: 1, sortOrder: 7, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Âm nào phát ra từ chữ "a"?',
    optionsJson: [{ key: 'A', text: 'a' }, { key: 'B', text: 'ơ' }, { key: 'C', text: 'e' }, { key: 'D', text: 'i' }],
    correctAnswerJson: 'A',
    explanation: 'Chữ "a" phát âm là "a".',
  },
  {
    exerciseNumber: 1, sortOrder: 8, difficultyLevel: 'easy',
    questionType: 'true_false',
    questionText: 'Từ "cha" có chứa chữ "a"',
    correctAnswerJson: true,
    explanation: 'Từ "cha" gồm ch + a, có chứa chữ "a".',
  },
  {
    exerciseNumber: 1, sortOrder: 9, difficultyLevel: 'easy',
    questionType: 'single_choice',
    questionText: 'Từ nào KHÔNG có chữ "a"?',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'ca' }, { key: 'C', text: 'bé' }, { key: 'D', text: 'ma' }],
    correctAnswerJson: 'C',
    explanation: 'Từ "bé" không có chữ "a", chỉ có chữ "ê".',
  },
  {
    exerciseNumber: 1, sortOrder: 10, difficultyLevel: 'easy',
    questionType: 'matching',
    questionText: 'Nối chữ hoa với chữ thường tương ứng',
    optionsJson: [{ key: 'A', text: 'A' }, { key: 'E', text: 'E' }, { key: 'O', text: 'O' }],
    correctAnswerJson: { A: 'a', E: 'e', O: 'o' },
    explanation: 'A-a, E-e, O-o là các cặp chữ hoa và chữ thường.',
  },

  // ─── Bài tập 2: Đọc và viết từ có chữ A (medium) ───────────────────────────
  {
    exerciseNumber: 2, sortOrder: 1, difficultyLevel: 'medium',
    questionType: 'single_choice',
    questionText: 'Đọc tiếng "ba" — tiếng này có mấy chữ cái?',
    optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }, { key: 'D', text: '4' }],
    correctAnswerJson: 'B',
    explanation: 'Tiếng "ba" gồm 2 chữ cái: b và a.',
  },
  {
    exerciseNumber: 2, sortOrder: 2, difficultyLevel: 'medium',
    questionType: 'drag_drop',
    questionText: 'Sắp xếp các chữ cái để tạo thành từ "ba"',
    optionsJson: [{ key: '1', text: 'b' }, { key: '2', text: 'a' }],
    correctAnswerJson: ['1', '2'],
    explanation: '"b" đứng trước, "a" đứng sau tạo thành "ba".',
  },
  {
    exerciseNumber: 2, sortOrder: 3, difficultyLevel: 'medium',
    questionType: 'single_choice',
    questionText: 'Chữ "a" đứng ở vị trí nào trong từ "ba"?',
    optionsJson: [{ key: 'A', text: 'Đầu' }, { key: 'B', text: 'Giữa' }, { key: 'C', text: 'Cuối' }],
    correctAnswerJson: 'C',
    explanation: 'Trong từ "ba", chữ "a" đứng ở cuối.',
  },
  {
    exerciseNumber: 2, sortOrder: 4, difficultyLevel: 'medium',
    questionType: 'true_false',
    questionText: 'Từ "ăn" có chứa chữ "a"',
    correctAnswerJson: false,
    explanation: 'Từ "ăn" có chữ "ă", không phải chữ "a". Đây là hai chữ cái khác nhau.',
  },
  {
    exerciseNumber: 2, sortOrder: 5, difficultyLevel: 'medium',
    questionType: 'single_choice',
    questionText: 'Ghép "b" + "a" được tiếng gì?',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'be' }, { key: 'C', text: 'bi' }, { key: 'D', text: 'bo' }],
    correctAnswerJson: 'A',
    explanation: 'Ghép b + a = ba.',
  },
  {
    exerciseNumber: 2, sortOrder: 6, difficultyLevel: 'medium',
    questionType: 'single_choice',
    questionText: 'Từ nào nghĩa là số 3?',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'bà' }, { key: 'C', text: 'bá' }, { key: 'D', text: 'bả' }],
    correctAnswerJson: 'A',
    explanation: '"ba" (không dấu) nghĩa là số 3.',
  },
  {
    exerciseNumber: 2, sortOrder: 7, difficultyLevel: 'medium',
    questionType: 'matching',
    questionText: 'Nối tiếng với nghĩa tương ứng',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'ca' }, { key: 'C', text: 'ma' }],
    correctAnswerJson: { A: 'số 3', B: 'hát', C: 'ma quỷ' },
    explanation: 'ba=số 3, ca=hát, ma=ma quỷ.',
  },
  {
    exerciseNumber: 2, sortOrder: 8, difficultyLevel: 'medium',
    questionType: 'single_choice',
    questionText: 'Điền chữ còn thiếu: "_a" để được tiếng "ca"',
    optionsJson: [{ key: 'A', text: 'c' }, { key: 'B', text: 'b' }, { key: 'C', text: 'd' }, { key: 'D', text: 'm' }],
    correctAnswerJson: 'A',
    explanation: 'c + a = ca.',
  },
  {
    exerciseNumber: 2, sortOrder: 9, difficultyLevel: 'medium',
    questionType: 'drag_drop',
    questionText: 'Sắp xếp các chữ cái để tạo thành từ "ma"',
    optionsJson: [{ key: '1', text: 'm' }, { key: '2', text: 'a' }],
    correctAnswerJson: ['1', '2'],
    explanation: '"m" đứng trước, "a" đứng sau tạo thành "ma".',
  },
  {
    exerciseNumber: 2, sortOrder: 10, difficultyLevel: 'medium',
    questionType: 'true_false',
    questionText: 'Tiếng "la" gồm chữ "l" và chữ "a"',
    correctAnswerJson: true,
    explanation: '"la" = l + a, gồm hai chữ cái l và a.',
  },

  // ─── Bài tập 3: Vận dụng chữ A trong từ và câu (hard) ──────────────────────
  {
    exerciseNumber: 3, sortOrder: 1, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Câu nào có nhiều chữ "a" nhất?',
    optionsJson: [
      { key: 'A', text: 'Ba và ca la' },
      { key: 'B', text: 'Bé bi bo' },
      { key: 'C', text: 'Mẹ bé ngủ' },
      { key: 'D', text: 'Cô bé đi' },
    ],
    correctAnswerJson: 'A',
    explanation: '"Ba và ca la" có 4 chữ "a": ba(1), và(1), ca(1), la(1).',
  },
  {
    exerciseNumber: 3, sortOrder: 2, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Từ "cá" khác từ "ca" ở điểm nào?',
    optionsJson: [{ key: 'A', text: 'Dấu thanh' }, { key: 'B', text: 'Chữ cái' }, { key: 'C', text: 'Vần' }, { key: 'D', text: 'Âm đầu' }],
    correctAnswerJson: 'A',
    explanation: '"cá" có dấu sắc, "ca" không có dấu. Hai từ chỉ khác nhau ở dấu thanh.',
  },
  {
    exerciseNumber: 3, sortOrder: 3, difficultyLevel: 'hard',
    questionType: 'matching',
    questionText: 'Nối từ với hình ảnh tương ứng',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'ca' }, { key: 'C', text: 'la' }],
    correctAnswerJson: { A: 'số 3', B: 'hát ca', C: 'chiếc lá' },
    explanation: 'ba=số 3, ca=hát ca, la=chiếc lá.',
  },
  {
    exerciseNumber: 3, sortOrder: 4, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Điền vào chỗ trống: "Con _á bơi trong hồ"',
    optionsJson: [{ key: 'A', text: 'c' }, { key: 'B', text: 'b' }, { key: 'C', text: 'm' }, { key: 'D', text: 't' }],
    correctAnswerJson: 'A',
    explanation: 'Con cá bơi trong hồ. c + á = cá.',
  },
  {
    exerciseNumber: 3, sortOrder: 5, difficultyLevel: 'hard',
    questionType: 'true_false',
    questionText: 'Từ "ba" và từ "bà" đọc giống nhau hoàn toàn',
    correctAnswerJson: false,
    explanation: '"ba" không có dấu (thanh ngang), "bà" có dấu huyền. Hai từ đọc khác nhau.',
  },
  {
    exerciseNumber: 3, sortOrder: 6, difficultyLevel: 'hard',
    questionType: 'drag_drop',
    questionText: 'Sắp xếp các tiếng thành câu có nghĩa: "cha và ba"',
    optionsJson: [{ key: '1', text: 'ba' }, { key: '2', text: 'cha' }, { key: '3', text: 'và' }],
    correctAnswerJson: ['2', '3', '1'],
    explanation: 'Câu đúng: "cha và ba" (cha đứng trước, tiếp theo là "và", cuối là "ba").',
  },
  {
    exerciseNumber: 3, sortOrder: 7, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Chữ "a" xuất hiện mấy lần trong câu "Ba và ma la ca"?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '3' }],
    correctAnswerJson: 'B',
    explanation: 'Ba(1a), và(1a), ma(1a), la(1a), ca(1a) = 5 lần.',
  },
  {
    exerciseNumber: 3, sortOrder: 8, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Từ nào dùng để gọi người sinh ra mình (giới tính nam)?',
    optionsJson: [{ key: 'A', text: 'ba' }, { key: 'B', text: 'ca' }, { key: 'C', text: 'la' }, { key: 'D', text: 'ma' }],
    correctAnswerJson: 'A',
    explanation: '"Ba" là từ dùng để gọi bố (giới tính nam) trong tiếng miền Nam.',
  },
  {
    exerciseNumber: 3, sortOrder: 9, difficultyLevel: 'hard',
    questionType: 'true_false',
    questionText: 'Trong bảng chữ cái tiếng Việt, chữ "A" đứng trước chữ "B"',
    correctAnswerJson: true,
    explanation: 'A là chữ cái đầu tiên, B là chữ cái thứ hai trong bảng chữ cái.',
  },
  {
    exerciseNumber: 3, sortOrder: 10, difficultyLevel: 'hard',
    questionType: 'single_choice',
    questionText: 'Câu "Ba la ca" có nghĩa là gì?',
    optionsJson: [
      { key: 'A', text: 'Ba hát ca' },
      { key: 'B', text: 'Ba ăn cơm' },
      { key: 'C', text: 'Ba đi học' },
      { key: 'D', text: 'Ba ngủ' },
    ],
    correctAnswerJson: 'A',
    explanation: '"Ba la ca" nghĩa là ba (bố) la hét khi hát ca.',
  },
];

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');

  await ds.query('DELETE FROM quizzes WHERE lessonId = ?', [LESSON_ID]);
  console.log(`🗑  Đã xóa câu hỏi cũ của lesson ${LESSON_ID}`);

  let inserted = 0;
  for (const q of QUIZZES) {
    await ds.query(
      `INSERT INTO quizzes
        (questionText, questionType, difficultyLevel, exerciseNumber, sortOrder,
         optionsJson, correctAnswerJson, explanation, lessonId, isActive, points, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 10, NOW(), NOW())`,
      [
        q.questionText,
        q.questionType,
        q.difficultyLevel,
        q.exerciseNumber,
        q.sortOrder,
        q.optionsJson ? JSON.stringify(q.optionsJson) : null,
        JSON.stringify(q.correctAnswerJson),
        q.explanation ?? null,
        LESSON_ID,
      ],
    );
    inserted++;
  }

  console.log(`✅ Đã tạo ${inserted} câu hỏi cho lesson ${LESSON_ID} (Bài 1: Chữ cái A a)`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
