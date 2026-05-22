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
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: false,
});

type Difficulty = 'easy' | 'medium' | 'hard';
type QuizType = 'single_choice' | 'multiple_choice' | 'true_false' | 'drag_drop' | 'matching';

type QuizSeed = {
  questionText: string;
  questionType: QuizType;
  difficultyLevel: Difficulty;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown;
  explanation?: string;
  points?: number;
};

type LessonSeed = {
  title: string;
  slug: string;
  lessonType: 'interactive' | 'game' | 'quiz' | 'story' | 'video';
  sortOrder: number;
  durationMinutes: number;
  content: string;
  topicName: string;
  quizzes: QuizSeed[];
};

const TOPIC = 'Các số 0, 1, 2, 3, 4, 5 - Toán học lớp 1';
const COURSE_SLUG = 'toan-hoc-lop-1';

const LESSONS: LessonSeed[] = [
  // ─── Bài 1: Số 0 ─────────────────────────────────────────────────────────────
  {
    title: 'Số 0 — Không có gì cả',
    slug: 'so-0-khong-co-gi-ca',
    lessonType: 'interactive',
    sortOrder: 101,
    durationMinutes: 10,
    topicName: TOPIC,
    content: 'Bé làm quen với số 0 qua hình ảnh chiếc đĩa trống, cái hộp rỗng. Số 0 nghĩa là không có gì.',
    quizzes: [
      // EASY
      { questionText: 'Số 0 có nghĩa là gì?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: 'Không có gì' }, { key: 'B', text: 'Một' }, { key: 'C', text: 'Nhiều' }], correctAnswerJson: 'A', explanation: 'Số 0 tượng trưng cho không có gì cả.' },
      { questionText: 'Chiếc đĩa không có quả nào. Đĩa có mấy quả?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: 'Không có quả nào = 0.' },
      { questionText: 'Số 0 nhỏ hơn số 1', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '0 < 1.' },
      { questionText: 'Cái hộp rỗng chứa mấy quả bóng?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Rỗng = không có = 0.' },
      { questionText: 'Số 0 là số nhỏ nhất trong các số 0, 1, 2, 3', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '0 < 1 < 2 < 3.' },
      { questionText: 'Bé ăn hết kẹo, còn mấy cái kẹo?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: 'Ăn hết = không còn = 0.' },
      { questionText: 'Số 0 có thể đếm được không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Số 0 là một số hợp lệ.' },
      { questionText: 'Bình cá rỗng không có con cá nào. Số cá là bao nhiêu?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '1' }, { key: 'C', text: '0' }], correctAnswerJson: 'C', explanation: 'Không có cá = 0.' },
      { questionText: 'Số 0 lớn hơn số 1', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: false, explanation: '0 < 1.' },
      { questionText: 'Số nào đứng trước số 1 trên trục số?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '0' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Trục số: 0, 1, 2, 3...' },
      // MEDIUM
      { questionText: 'Sắp xếp từ nhỏ đến lớn: 2, 0, 1', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '2' }, { key: '2', text: '0' }, { key: '3', text: '1' }], correctAnswerJson: ['2', '3', '1'], explanation: '0 → 1 → 2.' },
      { questionText: 'Điền số còn thiếu: 0, 1, 2, ___', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '3' }, { key: 'C', text: '1' }], correctAnswerJson: 'B', explanation: 'Dãy số tăng dần: 0, 1, 2, 3.' },
      { questionText: '0 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '0 cộng 1 bằng 1.' },
      { questionText: 'Nối đúng: "Rỗng" tương ứng với số nào?', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: 'Rỗng' }, { key: 'B', text: 'Một' }, { key: 'C', text: 'Hai' }], correctAnswerJson: { A: '0', B: '1', C: '2' }, explanation: 'Rỗng = 0, Một = 1, Hai = 2.' },
      { questionText: '1 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: '1 bớt 1 bằng 0.' },
      { questionText: 'Số nào + 0 = 3?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3 + 0 = 3.' },
      { questionText: 'Chọn TẤT CẢ trường hợp biểu thị số 0', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: 'Hộp rỗng' }, { key: 'B', text: '1 quả táo' }, { key: 'C', text: 'Đĩa không có gì' }], correctAnswerJson: ['A', 'C'], explanation: 'Rỗng và không có gì đều = 0.' },
      { questionText: 'Điền số: ___ < 1', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '0' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '0 < 1.' },
      { questionText: '0 = 1 - ___', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 - 1 = 0.' },
      { questionText: 'Số 0 cộng với bất kỳ số nào đều bằng chính số đó', questionType: 'true_false', difficultyLevel: 'medium', correctAnswerJson: true, explanation: '0 + n = n.' },
      // HARD
      { questionText: 'Bé có 3 quả cam, bé cho hết bạn. Bé còn mấy quả?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'A', explanation: '3 - 3 = 0.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 0, 3, 1, 2', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '0' }, { key: '2', text: '3' }, { key: '3', text: '1' }, { key: '4', text: '2' }], correctAnswerJson: ['2', '4', '3', '1'], explanation: '3 → 2 → 1 → 0.' },
      { questionText: 'Điền số: 0, ___, 2, 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: 'Dãy: 0, 1, 2, 3.' },
      { questionText: 'Hoa có 2 bông hoa, Hoa cắt hết đem tặng. Hoa còn mấy bông?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '0' }], correctAnswerJson: 'C', explanation: '2 - 2 = 0.' },
      { questionText: 'Số nào khi cộng với chính nó vẫn bằng chính nó?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '0 + 0 = 0.' },
      { questionText: 'Nối số với số lượng đồ vật: 0 ↔ Đĩa rỗng, 1 ↔ Một quả táo, 2 ↔ Hai ngôi sao', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: { A: 'Đĩa rỗng', B: 'Một quả táo', C: 'Hai ngôi sao' }, explanation: 'Ghép đúng số với số lượng.' },
      { questionText: '___ + 0 = 0', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '0 + 0 = 0.' },
      { questionText: 'Chọn phát biểu ĐÚNG về số 0', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0 < 1' }, { key: 'B', text: '0 + 1 = 1' }, { key: 'C', text: '0 > 1' }], correctAnswerJson: ['A', 'B'], explanation: '0 < 1 và 0 + 1 = 1 đều đúng.' },
      { questionText: 'Bảng có 5 ô, tô màu 5 ô. Còn mấy ô trắng?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '5' }, { key: 'C', text: '0' }], correctAnswerJson: 'C', explanation: '5 - 5 = 0.' },
      { questionText: 'Điền số: 3 - ___ = 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'A', explanation: '3 - 0 = 3.' },
    ],
  },

  // ─── Bài 2: Số 1 ─────────────────────────────────────────────────────────────
  {
    title: 'Số 1 — Một mình thôi',
    slug: 'so-1-mot-minh-thoi',
    lessonType: 'interactive',
    sortOrder: 102,
    durationMinutes: 10,
    topicName: TOPIC,
    content: 'Bé nhận biết số 1 qua hình ảnh: 1 mặt trời, 1 con mèo, 1 ngôi nhà. Số 1 là một, chỉ có một.',
    quizzes: [
      // EASY
      { questionText: '🌟 có mấy ngôi sao?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'A', explanation: 'Có 1 ngôi sao.' },
      { questionText: 'Số 1 lớn hơn số 0', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '1 > 0.' },
      { questionText: 'Bầu trời có mấy mặt trời?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: 'Bầu trời có 1 mặt trời.' },
      { questionText: 'Số 1 nhỏ hơn số 2', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '1 < 2.' },
      { questionText: '1 con mèo đứng một mình. Có mấy con mèo?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '1' }, { key: 'C', text: '0' }], correctAnswerJson: 'B', explanation: 'Một mình = 1.' },
      { questionText: 'Số đứng ngay sau số 0 là số nào?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '0, 1, 2... → sau 0 là 1.' },
      { questionText: 'Số 1 là số chẵn', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: false, explanation: 'Số 1 là số lẻ.' },
      { questionText: 'Bé chỉ có 1 cái bánh. Số bánh là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '3' }, { key: 'C', text: '1' }], correctAnswerJson: 'C', explanation: 'Chỉ có 1 cái bánh.' },
      { questionText: '🐱 — đây là 1 con mèo đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Đúng, 1 con mèo.' },
      { questionText: 'Số đứng ngay trước số 2 là số nào?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '..., 1, 2, 3.' },
      // MEDIUM
      { questionText: '1 + 0 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 + 0 = 1.' },
      { questionText: 'Sắp xếp từ nhỏ đến lớn: 1, 3, 0, 2', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '1' }, { key: '2', text: '3' }, { key: '3', text: '0' }, { key: '4', text: '2' }], correctAnswerJson: ['3', '1', '4', '2'], explanation: '0 → 1 → 2 → 3.' },
      { questionText: '2 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 bớt 1 bằng 1.' },
      { questionText: 'Số nào + 1 = 2?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 + 1 = 2.' },
      { questionText: 'Chọn TẤT CẢ ví dụ về số 1', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1 mặt trời' }, { key: 'B', text: '2 con chó' }, { key: 'C', text: '1 cái bàn' }], correctAnswerJson: ['A', 'C'], explanation: '1 mặt trời và 1 cái bàn đều biểu thị số 1.' },
      { questionText: '1 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '1 + 1 = 2.' },
      { questionText: 'Nối số: 0 ↔ không, 1 ↔ một, 2 ↔ hai', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: { A: 'không', B: 'một', C: 'hai' }, explanation: 'Ghép số với chữ số tương ứng.' },
      { questionText: 'Số 1 cộng với 0 bằng 1', questionType: 'true_false', difficultyLevel: 'medium', correctAnswerJson: true, explanation: '1 + 0 = 1.' },
      { questionText: 'Điền số: ___, 1, 2', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '0' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Dãy: 0, 1, 2.' },
      { questionText: '1 - 0 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 - 0 = 1.' },
      // HARD
      { questionText: 'Bé có 0 quả, mẹ cho thêm 1 quả. Bé có mấy quả?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '0 + 1 = 1.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 0, 1, 3, 2', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '0' }, { key: '2', text: '1' }, { key: '3', text: '3' }, { key: '4', text: '2' }], correctAnswerJson: ['3', '4', '2', '1'], explanation: '3 → 2 → 1 → 0.' },
      { questionText: 'Điền số: 0, 1, ___, 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '2' }, { key: 'C', text: '1' }], correctAnswerJson: 'B', explanation: '0, 1, 2, 3.' },
      { questionText: 'Tổng của 1 + 0 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '1 + 0 + 1 = 2.' },
      { questionText: 'Số nào - 1 = 0?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 - 1 = 0.' },
      { questionText: 'Chọn phát biểu ĐÚNG', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1 > 0' }, { key: 'B', text: '1 < 2' }, { key: 'C', text: '1 = 2' }], correctAnswerJson: ['A', 'B'], explanation: '1 > 0 và 1 < 2 đều đúng.' },
      { questionText: 'Nối: số 1 ↔ lớn hơn 0, số 0 ↔ nhỏ hơn 1', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: 'Số 1' }, { key: 'B', text: 'Số 0' }], correctAnswerJson: { A: 'lớn hơn 0', B: 'nhỏ hơn 1' }, explanation: '1 > 0, 0 < 1.' },
      { questionText: 'Lớp có 1 bạn vắng mặt. Còn lại 4 bạn. Lớp có bao nhiêu bạn tất cả?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '4 + 1 = 5.' },
      { questionText: 'Điền: 1 + ___ = 1', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: '1 + 0 = 1.' },
      { questionText: 'Số 1 vừa lớn hơn 0 vừa nhỏ hơn 2', questionType: 'true_false', difficultyLevel: 'hard', correctAnswerJson: true, explanation: '0 < 1 < 2.' },
    ],
  },

  // ─── Bài 3: Số 2 ─────────────────────────────────────────────────────────────
  {
    title: 'Số 2 — Một đôi bạn thân',
    slug: 'so-2-mot-doi-ban-than',
    lessonType: 'interactive',
    sortOrder: 103,
    durationMinutes: 10,
    topicName: TOPIC,
    content: 'Số 2 xuất hiện qua đôi tay, đôi mắt, đôi chân. Bé nhận biết và viết số 2.',
    quizzes: [
      // EASY
      { questionText: '🦅🦅 — có mấy con chim?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Có 2 con chim.' },
      { questionText: 'Bé có 2 con mắt đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Đúng, 2 mắt.' },
      { questionText: 'Số 2 lớn hơn số 1', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '2 > 1.' },
      { questionText: 'Đôi giày có mấy chiếc?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Một đôi = 2 chiếc.' },
      { questionText: 'Số 2 nhỏ hơn số 3', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '2 < 3.' },
      { questionText: 'Số đứng ngay sau số 1 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '3' }, { key: 'C', text: '2' }], correctAnswerJson: 'C', explanation: '1, 2, 3...' },
      { questionText: '🍎🍎 có mấy quả táo?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: 'Có 2 quả táo.' },
      { questionText: 'Số 2 là số chẵn', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '2 chia hết cho 2.' },
      { questionText: 'Bàn có 2 chân. Đây có phải là số 2 không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '2 chân = số 2.' },
      { questionText: 'Số đứng ngay trước số 3 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1, 2, 3 → trước 3 là 2.' },
      // MEDIUM
      { questionText: '1 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '1 + 1 = 2.' },
      { questionText: '2 + 0 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 + 0 = 2.' },
      { questionText: 'Sắp xếp từ nhỏ đến lớn: 2, 0, 1, 3', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '2' }, { key: '2', text: '0' }, { key: '3', text: '1' }, { key: '4', text: '3' }], correctAnswerJson: ['2', '3', '1', '4'], explanation: '0 → 1 → 2 → 3.' },
      { questionText: '3 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '3 - 1 = 2.' },
      { questionText: 'Số nào + 1 = 3?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 + 1 = 3.' },
      { questionText: 'Chọn TẤT CẢ những thứ có 2 cái', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: 'Đôi mắt' }, { key: 'B', text: 'Đôi tai' }, { key: 'C', text: 'Ngón chân' }], correctAnswerJson: ['A', 'B'], explanation: 'Mắt và tai đều có 2 cái.' },
      { questionText: '2 - 2 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: '2 - 2 = 0.' },
      { questionText: 'Điền số: 0, 1, ___', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '2' }, { key: 'C', text: '0' }], correctAnswerJson: 'B', explanation: '0, 1, 2.' },
      { questionText: '2 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '2 - 1 = 1.' },
      { questionText: 'Nối: 2 ↔ hai, 1 ↔ một, 0 ↔ không', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '1' }, { key: 'C', text: '0' }], correctAnswerJson: { A: 'hai', B: 'một', C: 'không' }, explanation: 'Ghép số với chữ.' },
      // HARD
      { questionText: 'Bé có 1 kẹo, bạn cho thêm 1 cái. Bé có mấy cái?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '1 + 1 = 2.' },
      { questionText: 'Điền: 2 + ___ = 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '2 + 1 = 3.' },
      { questionText: 'Tổng 1 + 1 + 0 = ?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '1 + 1 + 0 = 2.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 2, 5, 0, 3', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '2' }, { key: '2', text: '5' }, { key: '3', text: '0' }, { key: '4', text: '3' }], correctAnswerJson: ['2', '4', '1', '3'], explanation: '5 → 3 → 2 → 0.' },
      { questionText: 'Số nào - 2 = 0?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 - 2 = 0.' },
      { questionText: 'Chọn phép tính có kết quả = 2', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1+1' }, { key: 'B', text: '3-1' }, { key: 'C', text: '0+3' }], correctAnswerJson: ['A', 'B'], explanation: '1+1=2 và 3-1=2.' },
      { questionText: 'Vườn có 3 cây, chặt 1 cây. Còn mấy cây?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '3 - 1 = 2.' },
      { questionText: 'Điền: ___ - 0 = 2', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 - 0 = 2.' },
      { questionText: 'Số 2 nằm giữa số 1 và số 3', questionType: 'true_false', difficultyLevel: 'hard', correctAnswerJson: true, explanation: '1 < 2 < 3.' },
      { questionText: 'Nối phép tính với kết quả: 1+1 ↔ 2, 3-1 ↔ 2, 2+0 ↔ 2', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1+1' }, { key: 'B', text: '3-1' }, { key: 'C', text: '2+0' }], correctAnswerJson: { A: '2', B: '2', C: '2' }, explanation: 'Tất cả đều bằng 2.' },
    ],
  },

  // ─── Bài 4: Số 3 ─────────────────────────────────────────────────────────────
  {
    title: 'Số 3 — Đội ba người',
    slug: 'so-3-doi-ba-nguoi',
    lessonType: 'interactive',
    sortOrder: 104,
    durationMinutes: 10,
    topicName: TOPIC,
    content: 'Số 3 qua hình ảnh ba chiếc lá, tam giác có 3 góc, gia đình ba người.',
    quizzes: [
      // EASY
      { questionText: '🍃🍃🍃 — có mấy chiếc lá?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: 'Có 3 chiếc lá.' },
      { questionText: 'Tam giác có mấy góc?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: 'Tam giác có 3 góc.' },
      { questionText: 'Số 3 lớn hơn số 2', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 > 2.' },
      { questionText: 'Số 3 nhỏ hơn số 4', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 < 4.' },
      { questionText: 'Đếm: 🐦🐦🐦 = ?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3 con chim.' },
      { questionText: 'Số đứng sau số 2 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '2, 3, 4...' },
      { questionText: 'Ba người = số 3', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Ba = 3.' },
      { questionText: 'Đếm ngón tay: 1, 2, ... tiếp theo là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '3' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1, 2, 3.' },
      { questionText: 'Số 3 là số lẻ', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 không chia hết cho 2.' },
      { questionText: 'Số đứng trước số 4 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '..., 3, 4.' },
      // MEDIUM
      { questionText: '2 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '2 + 1 = 3.' },
      { questionText: '3 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '3 - 1 = 2.' },
      { questionText: 'Sắp xếp: 3, 1, 0, 2', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '3' }, { key: '2', text: '1' }, { key: '3', text: '0' }, { key: '4', text: '2' }], correctAnswerJson: ['3', '2', '4', '1'], explanation: '0 → 1 → 2 → 3.' },
      { questionText: 'Số nào + 2 = 3?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '1 + 2 = 3.' },
      { questionText: '3 - 3 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'A', explanation: '3 - 3 = 0.' },
      { questionText: 'Chọn TẤT CẢ nhóm có 3 thứ', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3 góc tam giác' }, { key: 'B', text: '4 chân bàn' }, { key: 'C', text: '3 lá cờ' }], correctAnswerJson: ['A', 'C'], explanation: 'Tam giác có 3 góc, 3 lá cờ = 3.' },
      { questionText: '1 + 1 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1+1+1 = 3.' },
      { questionText: 'Điền: 1, 2, ___', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '3' }, { key: 'C', text: '0' }], correctAnswerJson: 'B', explanation: '1, 2, 3.' },
      { questionText: '3 - 2 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '3 - 2 = 1.' },
      { questionText: 'Nối: 3 ↔ ba, 2 ↔ hai, 1 ↔ một', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '2' }, { key: 'C', text: '1' }], correctAnswerJson: { A: 'ba', B: 'hai', C: 'một' }, explanation: 'Ghép số với chữ.' },
      // HARD
      { questionText: 'Bé có 1 quả, mẹ cho thêm 2 quả. Có tất cả mấy quả?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1 + 2 = 3.' },
      { questionText: 'Điền: 3 + ___ = 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '3' }], correctAnswerJson: 'A', explanation: '3 + 0 = 3.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 1, 3, 0, 2', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '1' }, { key: '2', text: '3' }, { key: '3', text: '0' }, { key: '4', text: '2' }], correctAnswerJson: ['2', '4', '1', '3'], explanation: '3 → 2 → 1 → 0.' },
      { questionText: 'Lớp có 5 bạn, 2 bạn về nhà. Còn mấy bạn?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '5 - 2 = 3.' },
      { questionText: 'Số nào - 1 = 2?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3 - 1 = 2.' },
      { questionText: 'Chọn phép tính có kết quả = 3', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2+1' }, { key: 'B', text: '4-1' }, { key: 'C', text: '1+1' }], correctAnswerJson: ['A', 'B'], explanation: '2+1=3 và 4-1=3.' },
      { questionText: 'Điền: ___ - 2 = 1', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3 - 2 = 1.' },
      { questionText: 'Số 3 nằm giữa 2 và 4', questionType: 'true_false', difficultyLevel: 'hard', correctAnswerJson: true, explanation: '2 < 3 < 4.' },
      { questionText: 'Tổng 1 + 2 + 0 = ?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1+2+0=3.' },
      { questionText: 'Nối: 2+1 ↔ 3, 4-1 ↔ 3, 3+0 ↔ 3', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2+1' }, { key: 'B', text: '4-1' }, { key: 'C', text: '3+0' }], correctAnswerJson: { A: '3', B: '3', C: '3' }, explanation: 'Tất cả đều = 3.' },
    ],
  },

  // ─── Bài 5: Số 4 và 5 ────────────────────────────────────────────────────────
  {
    title: 'Số 4 và 5 — Bàn tay xinh',
    slug: 'so-4-va-5-ban-tay-xinh',
    lessonType: 'interactive',
    sortOrder: 105,
    durationMinutes: 12,
    topicName: TOPIC,
    content: 'Số 4 qua hình vuông 4 cạnh, bàn 4 chân. Số 5 qua 5 ngón tay, ngôi sao 5 cánh.',
    quizzes: [
      // EASY
      { questionText: '🌟🌟🌟🌟 — có mấy ngôi sao?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: 'Có 4 ngôi sao.' },
      { questionText: 'Hình vuông có mấy cạnh?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: 'Hình vuông có 4 cạnh.' },
      { questionText: 'Bàn tay có mấy ngón?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: 'Bàn tay có 5 ngón.' },
      { questionText: 'Số 4 lớn hơn số 3', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '4 > 3.' },
      { questionText: 'Số 5 là số lớn nhất trong nhóm 0, 1, 2, 3, 4, 5', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '5 là số lớn nhất.' },
      { questionText: '🐟🐟🐟🐟🐟 — có mấy con cá?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'C', explanation: 'Có 5 con cá.' },
      { questionText: 'Số 4 nhỏ hơn số 5', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '4 < 5.' },
      { questionText: 'Số đứng sau số 3 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '3, 4, 5...' },
      { questionText: 'Số đứng sau số 4 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '4, 5, 6...' },
      { questionText: 'Con nhện có 8 chân. Số đó lớn hơn 5 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '8 > 5.' },
      // MEDIUM
      { questionText: '3 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '3 + 1 = 4.' },
      { questionText: '5 - 1 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '5 - 1 = 4.' },
      { questionText: '3 + 2 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '3 + 2 = 5.' },
      { questionText: 'Sắp xếp: 4, 2, 5, 3, 0', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '4' }, { key: '2', text: '2' }, { key: '3', text: '5' }, { key: '4', text: '3' }, { key: '5', text: '0' }], correctAnswerJson: ['5', '2', '4', '1', '3'], explanation: '0→2→3→4→5.' },
      { questionText: 'Số nào + 1 = 5?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '4 + 1 = 5.' },
      { questionText: '4 - 4 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '4' }], correctAnswerJson: 'A', explanation: '4 - 4 = 0.' },
      { questionText: 'Chọn TẤT CẢ số lớn hơn 3', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '2' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'C'], explanation: '4 > 3 và 5 > 3.' },
      { questionText: 'Nối: 4 ↔ bốn, 5 ↔ năm, 3 ↔ ba', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '3' }], correctAnswerJson: { A: 'bốn', B: 'năm', C: 'ba' }, explanation: 'Ghép số với chữ.' },
      { questionText: '5 - 5 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '5' }], correctAnswerJson: 'A', explanation: '5 - 5 = 0.' },
      { questionText: 'Điền: 2, 3, 4, ___', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '2, 3, 4, 5.' },
      // HARD
      { questionText: 'Bé có 2 kẹo, mẹ cho thêm 2 cái. Có tất cả mấy cái?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '2 + 2 = 4.' },
      { questionText: 'Điền: 4 + ___ = 5', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '4 + 1 = 5.' },
      { questionText: 'Tổng 2 + 2 + 1 = ?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '2+2+1=5.' },
      { questionText: 'Chọn phép tính có kết quả = 4', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2+2' }, { key: 'B', text: '5-1' }, { key: 'C', text: '3-1' }], correctAnswerJson: ['A', 'B'], explanation: '2+2=4 và 5-1=4.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 5, 3, 1, 4, 2', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '5' }, { key: '2', text: '3' }, { key: '3', text: '1' }, { key: '4', text: '4' }, { key: '5', text: '2' }], correctAnswerJson: ['1', '4', '2', '5', '3'], explanation: '5→4→3→2→1.' },
      { questionText: 'Vườn có 5 cây hoa, héo 2 cây. Còn mấy cây?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '5 - 2 = 3.' },
      { questionText: 'Điền: ___ + 2 = 4', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 + 2 = 4.' },
      { questionText: 'Số 4 nằm giữa 3 và 5', questionType: 'true_false', difficultyLevel: 'hard', correctAnswerJson: true, explanation: '3 < 4 < 5.' },
      { questionText: '___ - 3 = 2', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '5 - 3 = 2.' },
      { questionText: 'Nối: 2+2 ↔ 4, 3+2 ↔ 5, 4+1 ↔ 5', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2+2' }, { key: 'B', text: '3+2' }, { key: 'C', text: '4+1' }], correctAnswerJson: { A: '4', B: '5', C: '5' }, explanation: '2+2=4; 3+2=4+1=5.' },
    ],
  },

  // ─── Bài 6: Đếm từ 0 đến 5 ───────────────────────────────────────────────────
  {
    title: 'Đếm từ 0 đến 5 — Trục số kỳ diệu',
    slug: 'dem-tu-0-den-5-truc-so',
    lessonType: 'game',
    sortOrder: 106,
    durationMinutes: 12,
    topicName: TOPIC,
    content: 'Bé học đếm tuần tự 0→5 và 5→0 trên trục số. Nhận biết vị trí từng số.',
    quizzes: [
      // EASY
      { questionText: 'Số đứng ngay sau 2 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '2, 3.' },
      { questionText: 'Đếm: 0, 1, 2, 3, 4, ___', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '0, 1, 2, 3, 4, 5.' },
      { questionText: 'Số đứng trước 3 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '1' }], correctAnswerJson: 'A', explanation: '2, 3.' },
      { questionText: 'Đếm ngược: 5, 4, 3, 2, 1, ___', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }], correctAnswerJson: 'A', explanation: '..., 1, 0.' },
      { questionText: 'Số lớn nhất trong dãy 0, 1, 2, 3, 4, 5 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '5 là số lớn nhất.' },
      { questionText: 'Số nhỏ nhất trong dãy 0-5 là 0', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '0 nhỏ nhất.' },
      { questionText: 'Trên trục số, 3 nằm bên phải 2', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Phải = lớn hơn.' },
      { questionText: 'Số nằm ở giữa dãy 0, 1, 2, 3, 4, 5?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '2 và 3' }], correctAnswerJson: 'C', explanation: '0,1,2,3,4,5 → giữa là 2 và 3.' },
      { questionText: 'Đếm: 0, ___, 2, 3, ___, 5', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1 và 4' }, { key: 'B', text: '2 và 3' }, { key: 'C', text: '0 và 5' }], correctAnswerJson: 'A', explanation: '0, 1, 2, 3, 4, 5.' },
      { questionText: 'Số 4 lớn hơn 3 nhưng nhỏ hơn 5', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 < 4 < 5.' },
      // MEDIUM
      { questionText: 'Điền số còn thiếu: 0, 1, ___, 3, ___, 5', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2 và 4' }, { key: 'B', text: '1 và 3' }, { key: 'C', text: '3 và 4' }], correctAnswerJson: 'A', explanation: '0,1,2,3,4,5.' },
      { questionText: 'Sắp xếp: 5, 2, 4, 0, 3, 1', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '5' }, { key: '2', text: '2' }, { key: '3', text: '4' }, { key: '4', text: '0' }, { key: '5', text: '3' }, { key: '6', text: '1' }], correctAnswerJson: ['4', '6', '2', '5', '3', '1'], explanation: '0→1→2→3→4→5.' },
      { questionText: 'Số nào nằm giữa 1 và 3?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1 < 2 < 3.' },
      { questionText: 'Số nào nằm giữa 3 và 5?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '3 < 4 < 5.' },
      { questionText: 'Chọn TẤT CẢ số nhỏ hơn 4', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '3' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'B'], explanation: '0 < 4 và 3 < 4.' },
      { questionText: 'Nối: 0 ↔ đầu tiên, 5 ↔ cuối cùng trong dãy 0-5', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '5' }], correctAnswerJson: { A: 'đầu tiên', B: 'cuối cùng' }, explanation: '0 là đầu, 5 là cuối.' },
      { questionText: 'Bước từ 2 đến 5 cần đi mấy bước?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '2→3→4→5: 3 bước.' },
      { questionText: 'Điền: ___, 4, 5', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3, 4, 5.' },
      { questionText: 'Đếm ngược từ 5: 5, ___, 3, ___, 1, 0', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4 và 2' }, { key: 'B', text: '3 và 1' }, { key: 'C', text: '2 và 0' }], correctAnswerJson: 'A', explanation: '5,4,3,2,1,0.' },
      { questionText: 'Bước từ 0 đến 5 cần đi mấy bước?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '0→1→2→3→4→5: 5 bước.' },
      // HARD
      { questionText: 'Điền tất cả số còn thiếu: 0, ___, ___, 3, ___, 5', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1, 2, 4' }, { key: 'B', text: '1, 3, 4' }, { key: 'C', text: '2, 3, 4' }], correctAnswerJson: 'A', explanation: '0, 1, 2, 3, 4, 5.' },
      { questionText: 'Số nào có 2 số đứng trước nó trong dãy 0-5?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '0, 1, 2 → 2 có 2 số đứng trước.' },
      { questionText: 'Tổng 2 số liên tiếp 4 và 5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '8' }, { key: 'B', text: '9' }, { key: 'C', text: '10' }], correctAnswerJson: 'B', explanation: '4 + 5 = 9.' },
      { questionText: 'Chọn TẤT CẢ số lớn hơn 2 và nhỏ hơn 5', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'B'], explanation: '3 và 4 thỏa 2 < x < 5.' },
      { questionText: 'Sắp xếp ngược: 5, 4, 3, 2, 1, 0', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '0' }, { key: '2', text: '3' }, { key: '3', text: '5' }, { key: '4', text: '1' }, { key: '5', text: '4' }, { key: '6', text: '2' }], correctAnswerJson: ['3', '5', '2', '6', '4', '1'], explanation: '5→4→3→2→1→0.' },
      { questionText: 'Số nào đứng ngay giữa 0 và 4?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '0,1,2,3,4 → giữa là 2.' },
      { questionText: 'Tổng tất cả số từ 0 đến 5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '14' }, { key: 'B', text: '15' }, { key: 'C', text: '12' }], correctAnswerJson: 'B', explanation: '0+1+2+3+4+5=15.' },
      { questionText: 'Nối số với vị trí trên trục: 0 ↔ đầu, 3 ↔ giữa, 5 ↔ cuối', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '3' }, { key: 'C', text: '5' }], correctAnswerJson: { A: 'đầu', B: 'giữa', C: 'cuối' }, explanation: '0 đầu dãy, 3 gần giữa, 5 cuối.' },
      { questionText: 'Điền: 5 - ___ = 0', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '5 - 5 = 0.' },
      { questionText: 'Số nào khi đếm ngược bước tiếp theo từ 1 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '1' }], correctAnswerJson: 'A', explanation: '..., 2, 1, 0.' },
    ],
  },

  // ─── Bài 7: So sánh các số trong phạm vi 5 ───────────────────────────────────
  {
    title: 'So sánh các số trong phạm vi 5',
    slug: 'so-sanh-cac-so-trong-pham-vi-5',
    lessonType: 'interactive',
    sortOrder: 107,
    durationMinutes: 12,
    topicName: TOPIC,
    content: 'Bé học dùng dấu >, <, = để so sánh các số trong phạm vi 0-5.',
    quizzes: [
      // EASY
      { questionText: '3 ___ 2 (điền >, < hoặc =)', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '<' }, { key: 'B', text: '>' }, { key: 'C', text: '=' }], correctAnswerJson: 'B', explanation: '3 > 2.' },
      { questionText: '1 < 4 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '1 < 4.' },
      { questionText: '5 > 0 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '5 > 0.' },
      { questionText: '2 ___ 3', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '>' }, { key: 'B', text: '<' }, { key: 'C', text: '=' }], correctAnswerJson: 'B', explanation: '2 < 3.' },
      { questionText: '3 = 3 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 = 3.' },
      { questionText: '4 ___ 5', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '>' }, { key: 'B', text: '<' }, { key: 'C', text: '=' }], correctAnswerJson: 'B', explanation: '4 < 5.' },
      { questionText: '0 < 1 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '0 < 1.' },
      { questionText: '5 ___ 4', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '<' }, { key: 'B', text: '>' }, { key: 'C', text: '=' }], correctAnswerJson: 'B', explanation: '5 > 4.' },
      { questionText: '2 = 2 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '2 = 2.' },
      { questionText: 'Số nào lớn hơn: 3 hay 5?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: 'Bằng nhau' }], correctAnswerJson: 'B', explanation: '5 > 3.' },
      // MEDIUM
      { questionText: 'Chọn số lớn hơn 4: 3, 5, 2', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '2' }], correctAnswerJson: 'B', explanation: '5 > 4.' },
      { questionText: 'Sắp xếp từ bé đến lớn: 4, 1, 5, 2, 0, 3', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '4' }, { key: '2', text: '1' }, { key: '3', text: '5' }, { key: '4', text: '2' }, { key: '5', text: '0' }, { key: '6', text: '3' }], correctAnswerJson: ['5', '2', '4', '6', '1', '3'], explanation: '0→1→2→3→4→5.' },
      { questionText: 'Nhóm nào có nhiều hơn: 🍎🍎🍎 hay 🍊🍊🍊🍊?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: 'Táo (3)' }, { key: 'B', text: 'Cam (4)' }, { key: 'C', text: 'Bằng nhau' }], correctAnswerJson: 'B', explanation: '4 > 3.' },
      { questionText: 'Chọn TẤT CẢ số nhỏ hơn 3', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '4' }], correctAnswerJson: ['A', 'B'], explanation: '0 và 1 nhỏ hơn 3.' },
      { questionText: 'Điền dấu: 2 ___ 4 ___ 5', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '< và <' }, { key: 'B', text: '> và <' }, { key: 'C', text: '< và >' }], correctAnswerJson: 'A', explanation: '2 < 4 < 5.' },
      { questionText: 'Nối dấu đúng: 1 __ 3 ↔ <, 5 __ 2 ↔ >', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1 __ 3' }, { key: 'B', text: '5 __ 2' }], correctAnswerJson: { A: '<', B: '>' }, explanation: '1 < 3; 5 > 2.' },
      { questionText: '3 + 1 ___ 4', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '<' }, { key: 'B', text: '>' }, { key: 'C', text: '=' }], correctAnswerJson: 'C', explanation: '3+1=4=4.' },
      { questionText: 'Số nào bé nhất: 5, 0, 3, 1?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '0 là bé nhất.' },
      { questionText: '2 - 1 ___ 2', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '=' }, { key: 'B', text: '<' }, { key: 'C', text: '>' }], correctAnswerJson: 'B', explanation: '2-1=1 < 2.' },
      { questionText: 'Chọn TẤT CẢ số lớn hơn 2 trong dãy 0-5', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'B', 'C'], explanation: '3, 4, 5 đều > 2.' },
      // HARD
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 0, 5, 2, 4, 1, 3', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '0' }, { key: '2', text: '5' }, { key: '3', text: '2' }, { key: '4', text: '4' }, { key: '5', text: '1' }, { key: '6', text: '3' }], correctAnswerJson: ['2', '4', '6', '3', '5', '1'], explanation: '5→4→3→2→1→0.' },
      { questionText: 'Điền số: ___ < 3 < ___  (chọn 2 và 4)', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1 và 4' }, { key: 'B', text: '2 và 4' }, { key: 'C', text: '2 và 5' }], correctAnswerJson: 'B', explanation: '2 < 3 < 4.' },
      { questionText: 'Tổng 2 số lớn nhất trong 0,1,2,3,4,5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '8' }, { key: 'B', text: '9' }, { key: 'C', text: '7' }], correctAnswerJson: 'B', explanation: '4+5=9.' },
      { questionText: 'Chọn ĐÚNG: 3+1 ___ 4+0', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3+1 > 4+0' }, { key: 'B', text: '3+1 = 4+0' }, { key: 'C', text: '3+1 < 4+0' }], correctAnswerJson: 'B', explanation: '3+1=4=4+0.' },
      { questionText: 'Nối: 0+5 ↔ 5, 3+2 ↔ 5, 4+1 ↔ 5', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0+5' }, { key: 'B', text: '3+2' }, { key: 'C', text: '4+1' }], correctAnswerJson: { A: '5', B: '5', C: '5' }, explanation: 'Tất cả = 5.' },
      { questionText: 'Có 4 bạn xếp hàng. Bạn thứ 3 đứng vị trí nào kể từ cuối?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: 'Thứ 1' }, { key: 'B', text: 'Thứ 2' }, { key: 'C', text: 'Thứ 3' }], correctAnswerJson: 'B', explanation: 'Hàng 4 người: từ cuối, bạn thứ 3 là thứ 2 từ cuối.' },
      { questionText: 'Điền: 5 > ___ > 3', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '5 > 4 > 3.' },
      { questionText: 'Số nào thỏa mãn: ___ > 2 và ___ < 5?', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'B'], explanation: '3 và 4 thỏa 2 < x < 5.' },
      { questionText: 'Hiệu số lớn nhất và bé nhất trong dãy 0-5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '5 - 0 = 5.' },
      { questionText: '1+2 ___ 2+1', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '<' }, { key: 'B', text: '>' }, { key: 'C', text: '=' }], correctAnswerJson: 'C', explanation: '1+2=3=2+1.' },
    ],
  },

  // ─── Bài 8: Ôn tập tổng hợp ──────────────────────────────────────────────────
  {
    title: 'Ôn tập tổng hợp — Các số 0 đến 5',
    slug: 'on-tap-tong-hop-cac-so-0-den-5',
    lessonType: 'quiz',
    sortOrder: 108,
    durationMinutes: 15,
    topicName: TOPIC,
    content: 'Bài kiểm tra tổng hợp toàn bộ kiến thức về các số 0-5: nhận biết, đếm, so sánh, cộng trừ.',
    quizzes: [
      // EASY
      { questionText: 'Số nào đứng đầu dãy 0-5?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '0 là số đầu tiên.' },
      { questionText: '🌸🌸🌸🌸 — đếm được mấy bông hoa?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '4 bông hoa.' },
      { questionText: '5 > 3 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '5 > 3.' },
      { questionText: 'Số nào đứng cuối dãy 0-5?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '5 là số cuối.' },
      { questionText: 'Số 3 là số lẻ', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '3 là số lẻ.' },
      { questionText: 'Bàn tay có 5 ngón, đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: 'Đúng, 5 ngón.' },
      { questionText: 'Số đứng giữa 2 và 4 là?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '3' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '2 < 3 < 4.' },
      { questionText: '0 + 5 = ?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '5' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '0 + 5 = 5.' },
      { questionText: '4 < 5 đúng không?', questionType: 'true_false', difficultyLevel: 'easy', correctAnswerJson: true, explanation: '4 < 5.' },
      { questionText: 'Số nào lớn hơn 2 nhưng nhỏ hơn 4?', questionType: 'single_choice', difficultyLevel: 'easy', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '2 < 3 < 4.' },
      // MEDIUM
      { questionText: '2 + 3 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '2 + 3 = 5.' },
      { questionText: '5 - 3 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '5 - 3 = 2.' },
      { questionText: 'Sắp xếp: 3, 0, 5, 1, 4, 2', questionType: 'drag_drop', difficultyLevel: 'medium', optionsJson: [{ key: '1', text: '3' }, { key: '2', text: '0' }, { key: '3', text: '5' }, { key: '4', text: '1' }, { key: '5', text: '4' }, { key: '6', text: '2' }], correctAnswerJson: ['2', '4', '6', '1', '5', '3'], explanation: '0→1→2→3→4→5.' },
      { questionText: 'Chọn TẤT CẢ số chẵn trong 0-5', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '4' }], correctAnswerJson: ['A', 'B', 'C'], explanation: '0, 2, 4 là số chẵn.' },
      { questionText: 'Nối: 3+2 ↔ 5, 4-1 ↔ 3, 2+2 ↔ 4', questionType: 'matching', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '3+2' }, { key: 'B', text: '4-1' }, { key: 'C', text: '2+2' }], correctAnswerJson: { A: '5', B: '3', C: '4' }, explanation: 'Ghép phép tính với kết quả.' },
      { questionText: '4 - 2 = ?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '4 - 2 = 2.' },
      { questionText: 'Số nào + 3 = 5?', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }], correctAnswerJson: 'B', explanation: '2 + 3 = 5.' },
      { questionText: 'Chọn TẤT CẢ số lẻ trong 0-5', questionType: 'multiple_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '1' }, { key: 'B', text: '3' }, { key: 'C', text: '5' }], correctAnswerJson: ['A', 'B', 'C'], explanation: '1, 3, 5 là số lẻ.' },
      { questionText: 'Điền: ___ + 1 = 4', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '3 + 1 = 4.' },
      { questionText: '3 + 2 ___ 4 + 1', questionType: 'single_choice', difficultyLevel: 'medium', optionsJson: [{ key: 'A', text: '<' }, { key: 'B', text: '>' }, { key: 'C', text: '=' }], correctAnswerJson: 'C', explanation: '3+2=5=4+1.' },
      // HARD
      { questionText: 'Tổng tất cả số từ 0 đến 4 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '9' }, { key: 'B', text: '10' }, { key: 'C', text: '11' }], correctAnswerJson: 'B', explanation: '0+1+2+3+4=10.' },
      { questionText: 'Sắp xếp từ lớn đến nhỏ: 2, 5, 0, 4, 1, 3', questionType: 'drag_drop', difficultyLevel: 'hard', optionsJson: [{ key: '1', text: '2' }, { key: '2', text: '5' }, { key: '3', text: '0' }, { key: '4', text: '4' }, { key: '5', text: '1' }, { key: '6', text: '3' }], correctAnswerJson: ['2', '4', '6', '1', '5', '3'], explanation: '5→4→3→2→1→0.' },
      { questionText: 'Điền: 5 - ___ = 2', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '5 - 3 = 2.' },
      { questionText: 'Chọn phép tính CÓ kết quả bằng 0', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3-3' }, { key: 'B', text: '5-5' }, { key: 'C', text: '2-1' }], correctAnswerJson: ['A', 'B'], explanation: '3-3=0 và 5-5=0.' },
      { questionText: 'Tổng 2 số lẻ liên tiếp đầu tiên trong 0-5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }], correctAnswerJson: 'B', explanation: '1+3=4.' },
      { questionText: 'Điền: ___ - ___ = 5 (dùng số trong dãy 0-5)', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '5 - 0' }, { key: 'B', text: '4 - 1' }, { key: 'C', text: '3 - 2' }], correctAnswerJson: 'A', explanation: '5 - 0 = 5.' },
      { questionText: 'Nối: 1+4 ↔ 5, 3+2 ↔ 5, 2+3 ↔ 5', questionType: 'matching', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '1+4' }, { key: 'B', text: '3+2' }, { key: 'C', text: '2+3' }], correctAnswerJson: { A: '5', B: '5', C: '5' }, explanation: 'Tất cả đều = 5.' },
      { questionText: 'Số nào vừa là số chẵn vừa nhỏ hơn 3?', questionType: 'multiple_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '4' }], correctAnswerJson: ['A', 'B'], explanation: '0 và 2 là chẵn và < 3.' },
      { questionText: 'Điền: 1 + ___ + 1 = 5', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }], correctAnswerJson: 'B', explanation: '1+3+1=5.' },
      { questionText: 'Tổng 3 số nhỏ nhất trong 0-5 là?', questionType: 'single_choice', difficultyLevel: 'hard', optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '6' }], correctAnswerJson: 'B', explanation: '0+1+2=3.' },
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await ds.initialize();

  const courseRepo = ds.getRepository('courses');
  const lessonRepo = ds.getRepository('lessons');
  const quizRepo = ds.getRepository('quizzes');

  const course = await courseRepo.findOne({ where: { slug: COURSE_SLUG } });
  if (!course) {
    console.error(`❌ Course not found: ${COURSE_SLUG}`);
    await ds.destroy();
    return;
  }
  console.log(`✅ Course: ${course.title} (id=${course.id})`);

  let lessonsCreated = 0;
  let quizzesCreated = 0;

  for (const lessonSeed of LESSONS) {
    let lesson = await lessonRepo.findOne({ where: { slug: lessonSeed.slug } });

    if (!lesson) {
      lesson = await lessonRepo.save(
        lessonRepo.create({
          courseId: course.id,
          title: lessonSeed.title,
          slug: lessonSeed.slug,
          lessonType: lessonSeed.lessonType,
          sortOrder: lessonSeed.sortOrder,
          durationMinutes: lessonSeed.durationMinutes,
          content: lessonSeed.content,
          topicName: lessonSeed.topicName,
          isPublished: true,
          isPreview: false,
        }),
      );
      lessonsCreated++;
      console.log(`📚 Tạo bài học: ${lesson.title}`);
    } else {
      console.log(`⏭️  Bài học đã tồn tại: ${lesson.slug}`);
    }

    let qIdx = 0;
    for (const q of lessonSeed.quizzes) {
      const existing = await quizRepo.findOne({
        where: { lessonId: lesson.id, questionText: q.questionText },
      });
      if (existing) continue;

      await quizRepo.save(
        quizRepo.create({
          lessonId: lesson.id,
          questionText: q.questionText,
          questionType: q.questionType,
          difficultyLevel: q.difficultyLevel,
          optionsJson: q.optionsJson ?? null,
          correctAnswerJson: q.correctAnswerJson,
          explanation: q.explanation ?? null,
          points: q.points ?? 10,
          sortOrder: ++qIdx,
          isActive: true,
        }),
      );
      quizzesCreated++;
    }
    console.log(`   └─ ${lessonSeed.quizzes.length} câu hỏi (${lessonSeed.quizzes.filter(x => x.difficultyLevel === 'easy').length} dễ / ${lessonSeed.quizzes.filter(x => x.difficultyLevel === 'medium').length} TB / ${lessonSeed.quizzes.filter(x => x.difficultyLevel === 'hard').length} khó)`);
  }

  console.log(`\n✅ Hoàn thành: ${lessonsCreated} bài học mới, ${quizzesCreated} câu hỏi mới`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
