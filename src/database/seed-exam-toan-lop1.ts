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

type QType = 'single_choice' | 'true_false' | 'matching';
type Diff = 'easy' | 'medium' | 'hard';

interface Q {
  questionText: string;
  questionType: QType;
  difficultyLevel: Diff;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown;
  explanation?: string;
  points?: number;
  sortOrder: number;
}

// ─── Đề thi Toán lớp 1 – Học kỳ 1 ──────────────────────────────────────────
// Phạm vi: Số 1-10, cộng trừ trong 10, hình học cơ bản
// Thang điểm: 10 điểm, mỗi câu 0.5đ, 20 câu

const HK1_QUESTIONS: Q[] = [
  // Nhóm 1: Đếm số, nhận biết số (4 câu easy)
  {
    sortOrder: 1, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Số nào đứng ngay sau số 5?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '3' }],
    correctAnswerJson: 'B', explanation: 'Dãy số: 1, 2, 3, 4, 5, 6 → sau 5 là 6.',
  },
  {
    sortOrder: 2, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Số nào lớn nhất trong các số: 3, 7, 5, 9, 2?',
    optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '9' }, { key: 'D', text: '7' }],
    correctAnswerJson: 'C', explanation: 'So sánh: 9 > 7 > 5 > 3 > 2. Số lớn nhất là 9.',
  },
  {
    sortOrder: 3, difficultyLevel: 'easy', questionType: 'true_false',
    questionText: '7 > 5',
    correctAnswerJson: true, explanation: '7 lớn hơn 5, vậy 7 > 5 là đúng.',
  },
  {
    sortOrder: 4, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Điền số còn thiếu: 1, 2, 3, ___, 5',
    optionsJson: [{ key: 'A', text: '6' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '7' }],
    correctAnswerJson: 'C', explanation: 'Dãy số tự nhiên: 1, 2, 3, 4, 5. Số cần điền là 4.',
  },
  // Nhóm 2: Cộng trong phạm vi 10 (5 câu medium)
  {
    sortOrder: 5, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '3 + 4 = ?',
    optionsJson: [{ key: 'A', text: '6' }, { key: 'B', text: '7' }, { key: 'C', text: '8' }, { key: 'D', text: '5' }],
    correctAnswerJson: 'B', explanation: '3 + 4 = 7.',
  },
  {
    sortOrder: 6, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '5 + 5 = ?',
    optionsJson: [{ key: 'A', text: '9' }, { key: 'B', text: '11' }, { key: 'C', text: '10' }, { key: 'D', text: '8' }],
    correctAnswerJson: 'C', explanation: '5 + 5 = 10.',
  },
  {
    sortOrder: 7, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '2 + 6 = ?',
    optionsJson: [{ key: 'A', text: '7' }, { key: 'B', text: '8' }, { key: 'C', text: '9' }, { key: 'D', text: '6' }],
    correctAnswerJson: 'B', explanation: '2 + 6 = 8.',
  },
  {
    sortOrder: 8, difficultyLevel: 'medium', questionType: 'true_false',
    questionText: '4 + 3 = 8',
    correctAnswerJson: false, explanation: '4 + 3 = 7, không phải 8.',
  },
  {
    sortOrder: 9, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Điền số thích hợp: 6 + ___ = 9',
    optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '3' }, { key: 'D', text: '5' }],
    correctAnswerJson: 'C', explanation: '6 + 3 = 9. Số cần điền là 3.',
  },
  // Nhóm 3: Trừ trong phạm vi 10 (5 câu medium)
  {
    sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '8 - 3 = ?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '6' }, { key: 'C', text: '5' }, { key: 'D', text: '3' }],
    correctAnswerJson: 'C', explanation: '8 - 3 = 5.',
  },
  {
    sortOrder: 11, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '10 - 4 = ?',
    optionsJson: [{ key: 'A', text: '5' }, { key: 'B', text: '7' }, { key: 'C', text: '6' }, { key: 'D', text: '8' }],
    correctAnswerJson: 'C', explanation: '10 - 4 = 6.',
  },
  {
    sortOrder: 12, difficultyLevel: 'medium', questionType: 'true_false',
    questionText: '9 - 5 = 4',
    correctAnswerJson: true, explanation: '9 - 5 = 4 là đúng.',
  },
  {
    sortOrder: 13, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Điền số thích hợp: 7 - ___ = 3',
    optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '4' }, { key: 'D', text: '2' }],
    correctAnswerJson: 'C', explanation: '7 - 4 = 3. Số cần điền là 4.',
  },
  {
    sortOrder: 14, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Tính: 10 - 7 + 2 = ?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '6' }, { key: 'C', text: '5' }, { key: 'D', text: '3' }],
    correctAnswerJson: 'C', explanation: '10 - 7 = 3, rồi 3 + 2 = 5.',
  },
  // Nhóm 4: Hình học (3 câu easy-medium)
  {
    sortOrder: 15, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Hình nào có 4 cạnh bằng nhau?',
    optionsJson: [{ key: 'A', text: 'Hình tam giác' }, { key: 'B', text: 'Hình tròn' }, { key: 'C', text: 'Hình vuông' }, { key: 'D', text: 'Hình chữ nhật' }],
    correctAnswerJson: 'C', explanation: 'Hình vuông có 4 cạnh bằng nhau.',
  },
  {
    sortOrder: 16, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Hình tam giác có bao nhiêu cạnh?',
    optionsJson: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '3' }, { key: 'D', text: '5' }],
    correctAnswerJson: 'C', explanation: 'Hình tam giác có 3 cạnh.',
  },
  {
    sortOrder: 17, difficultyLevel: 'easy', questionType: 'true_false',
    questionText: 'Hình tròn không có cạnh',
    correctAnswerJson: true, explanation: 'Hình tròn là đường cong khép kín, không có cạnh thẳng.',
  },
  // Nhóm 5: Bài toán có lời văn (3 câu hard)
  {
    sortOrder: 18, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Bạn An có 5 quả cam. Mẹ cho thêm 3 quả. Hỏi An có tất cả bao nhiêu quả cam?',
    optionsJson: [{ key: 'A', text: '7 quả' }, { key: 'B', text: '9 quả' }, { key: 'C', text: '8 quả' }, { key: 'D', text: '6 quả' }],
    correctAnswerJson: 'C', explanation: 'An có 5 quả + 3 quả = 8 quả cam.',
  },
  {
    sortOrder: 19, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Trong hộp có 9 bút chì. Bé lấy ra 4 cái. Hỏi còn lại bao nhiêu bút chì?',
    optionsJson: [{ key: 'A', text: '4 cái' }, { key: 'B', text: '6 cái' }, { key: 'C', text: '3 cái' }, { key: 'D', text: '5 cái' }],
    correctAnswerJson: 'D', explanation: '9 - 4 = 5 bút chì còn lại.',
  },
  {
    sortOrder: 20, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Lớp học có 6 bạn nam và 4 bạn nữ. Hỏi lớp có tất cả bao nhiêu bạn?',
    optionsJson: [{ key: 'A', text: '9 bạn' }, { key: 'B', text: '11 bạn' }, { key: 'C', text: '8 bạn' }, { key: 'D', text: '10 bạn' }],
    correctAnswerJson: 'D', explanation: '6 + 4 = 10 bạn.',
  },
];

// ─── Đề thi Toán lớp 1 – Học kỳ 2 ──────────────────────────────────────────
// Phạm vi: Số 11-20, cộng trừ trong 20, đo lường, bài toán có lời văn

const HK2_QUESTIONS: Q[] = [
  // Nhóm 1: Số trong phạm vi 20 (4 câu easy)
  {
    sortOrder: 1, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Số nào đứng ngay trước số 15?',
    optionsJson: [{ key: 'A', text: '13' }, { key: 'B', text: '16' }, { key: 'C', text: '14' }, { key: 'D', text: '12' }],
    correctAnswerJson: 'C', explanation: 'Dãy số: ..., 13, 14, 15 → trước 15 là 14.',
  },
  {
    sortOrder: 2, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Số nào nhỏ nhất trong các số: 11, 18, 14, 20, 16?',
    optionsJson: [{ key: 'A', text: '14' }, { key: 'B', text: '11' }, { key: 'C', text: '16' }, { key: 'D', text: '18' }],
    correctAnswerJson: 'B', explanation: 'So sánh: 11 < 14 < 16 < 18 < 20. Số nhỏ nhất là 11.',
  },
  {
    sortOrder: 3, difficultyLevel: 'easy', questionType: 'true_false',
    questionText: '13 < 17',
    correctAnswerJson: true, explanation: '13 nhỏ hơn 17, vậy 13 < 17 là đúng.',
  },
  {
    sortOrder: 4, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Điền số còn thiếu: 15, 16, ___, 18, 19',
    optionsJson: [{ key: 'A', text: '19' }, { key: 'B', text: '16' }, { key: 'C', text: '17' }, { key: 'D', text: '20' }],
    correctAnswerJson: 'C', explanation: 'Dãy số tăng dần, mỗi số hơn số trước 1 đơn vị: 15, 16, 17, 18, 19.',
  },
  // Nhóm 2: Cộng trong phạm vi 20 (4 câu medium)
  {
    sortOrder: 5, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '8 + 7 = ?',
    optionsJson: [{ key: 'A', text: '14' }, { key: 'B', text: '16' }, { key: 'C', text: '13' }, { key: 'D', text: '15' }],
    correctAnswerJson: 'D', explanation: '8 + 7 = 15.',
  },
  {
    sortOrder: 6, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '9 + 9 = ?',
    optionsJson: [{ key: 'A', text: '17' }, { key: 'B', text: '19' }, { key: 'C', text: '18' }, { key: 'D', text: '16' }],
    correctAnswerJson: 'C', explanation: '9 + 9 = 18.',
  },
  {
    sortOrder: 7, difficultyLevel: 'medium', questionType: 'true_false',
    questionText: '6 + 8 = 15',
    correctAnswerJson: false, explanation: '6 + 8 = 14, không phải 15.',
  },
  {
    sortOrder: 8, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Điền số thích hợp: ___ + 6 = 13',
    optionsJson: [{ key: 'A', text: '8' }, { key: 'B', text: '6' }, { key: 'C', text: '9' }, { key: 'D', text: '7' }],
    correctAnswerJson: 'D', explanation: '7 + 6 = 13. Số cần điền là 7.',
  },
  // Nhóm 3: Trừ trong phạm vi 20 (4 câu medium)
  {
    sortOrder: 9, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '15 - 8 = ?',
    optionsJson: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '9' }, { key: 'D', text: '7' }],
    correctAnswerJson: 'D', explanation: '15 - 8 = 7.',
  },
  {
    sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '20 - 13 = ?',
    optionsJson: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '7' }, { key: 'D', text: '9' }],
    correctAnswerJson: 'C', explanation: '20 - 13 = 7.',
  },
  {
    sortOrder: 11, difficultyLevel: 'medium', questionType: 'true_false',
    questionText: '18 - 9 = 9',
    correctAnswerJson: true, explanation: '18 - 9 = 9 là đúng.',
  },
  {
    sortOrder: 12, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Tính: 14 - 6 + 5 = ?',
    optionsJson: [{ key: 'A', text: '12' }, { key: 'B', text: '14' }, { key: 'C', text: '11' }, { key: 'D', text: '13' }],
    correctAnswerJson: 'D', explanation: '14 - 6 = 8, rồi 8 + 5 = 13.',
  },
  // Nhóm 4: Đo lường & so sánh (3 câu easy-medium)
  {
    sortOrder: 13, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Đơn vị nào dùng để đo độ dài?',
    optionsJson: [{ key: 'A', text: 'kilôgam' }, { key: 'B', text: 'xăng-ti-mét' }, { key: 'C', text: 'lít' }, { key: 'D', text: 'giờ' }],
    correctAnswerJson: 'B', explanation: 'Xăng-ti-mét (cm) là đơn vị đo độ dài.',
  },
  {
    sortOrder: 14, difficultyLevel: 'easy', questionType: 'true_false',
    questionText: 'Cái thước dài hơn cái bút chì',
    correctAnswerJson: true, explanation: 'Thường thì cái thước 20-30cm dài hơn bút chì.',
  },
  {
    sortOrder: 15, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '1 tuần có bao nhiêu ngày?',
    optionsJson: [{ key: 'A', text: '5 ngày' }, { key: 'B', text: '6 ngày' }, { key: 'C', text: '8 ngày' }, { key: 'D', text: '7 ngày' }],
    correctAnswerJson: 'D', explanation: '1 tuần có 7 ngày: Thứ 2 đến Chủ nhật.',
  },
  // Nhóm 5: Bài toán có lời văn (5 câu hard)
  {
    sortOrder: 16, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Trên cây có 12 con chim. Có 5 con bay đi. Hỏi còn lại bao nhiêu con chim?',
    optionsJson: [{ key: 'A', text: '6 con' }, { key: 'B', text: '8 con' }, { key: 'C', text: '7 con' }, { key: 'D', text: '9 con' }],
    correctAnswerJson: 'C', explanation: '12 - 5 = 7 con chim còn lại.',
  },
  {
    sortOrder: 17, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Bình có 8 viên bi. Hùng có nhiều hơn Bình 6 viên. Hỏi Hùng có bao nhiêu viên bi?',
    optionsJson: [{ key: 'A', text: '13 viên' }, { key: 'B', text: '15 viên' }, { key: 'C', text: '12 viên' }, { key: 'D', text: '14 viên' }],
    correctAnswerJson: 'D', explanation: 'Hùng có: 8 + 6 = 14 viên bi.',
  },
  {
    sortOrder: 18, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Mẹ mua 20 quả trứng. Mẹ dùng để làm bánh hết 8 quả. Hỏi còn lại bao nhiêu quả trứng?',
    optionsJson: [{ key: 'A', text: '11 quả' }, { key: 'B', text: '13 quả' }, { key: 'C', text: '10 quả' }, { key: 'D', text: '12 quả' }],
    correctAnswerJson: 'D', explanation: '20 - 8 = 12 quả trứng còn lại.',
  },
  {
    sortOrder: 19, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Buổi sáng cửa hàng bán được 9 chiếc bánh. Buổi chiều bán được 7 chiếc. Hỏi cả ngày bán được bao nhiêu chiếc bánh?',
    optionsJson: [{ key: 'A', text: '15 chiếc' }, { key: 'B', text: '17 chiếc' }, { key: 'C', text: '16 chiếc' }, { key: 'D', text: '18 chiếc' }],
    correctAnswerJson: 'C', explanation: '9 + 7 = 16 chiếc bánh.',
  },
  {
    sortOrder: 20, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Vườn nhà có 15 cây. Bố trồng thêm 3 cây, rồi chặt đi 5 cây. Hỏi vườn có bao nhiêu cây?',
    optionsJson: [{ key: 'A', text: '11 cây' }, { key: 'B', text: '14 cây' }, { key: 'C', text: '13 cây' }, { key: 'D', text: '12 cây' }],
    correctAnswerJson: 'C', explanation: '15 + 3 = 18 cây, rồi 18 - 5 = 13 cây.',
  },
];

// ─── Đề kiểm tra giữa học kỳ 1 (10 câu, 15 phút) ────────────────────────────
const GHK1_QUESTIONS: Q[] = [
  {
    sortOrder: 1, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Số nào lớn hơn 6?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '8' }],
    correctAnswerJson: 'D', explanation: '8 > 6.',
  },
  {
    sortOrder: 2, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Đếm: 2 + 3 = ?',
    optionsJson: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '3' }],
    correctAnswerJson: 'B', explanation: '2 + 3 = 5.',
  },
  {
    sortOrder: 3, difficultyLevel: 'easy', questionType: 'true_false',
    questionText: '4 + 4 = 8',
    correctAnswerJson: true, explanation: '4 + 4 = 8 là đúng.',
  },
  {
    sortOrder: 4, difficultyLevel: 'easy', questionType: 'single_choice',
    questionText: 'Điền số: 6, 7, ___, 9',
    optionsJson: [{ key: 'A', text: '10' }, { key: 'B', text: '7' }, { key: 'C', text: '8' }, { key: 'D', text: '6' }],
    correctAnswerJson: 'C', explanation: 'Dãy số tăng dần: 6, 7, 8, 9.',
  },
  {
    sortOrder: 5, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '7 - 3 = ?',
    optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '4' }, { key: 'D', text: '6' }],
    correctAnswerJson: 'C', explanation: '7 - 3 = 4.',
  },
  {
    sortOrder: 6, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: '10 - 6 = ?',
    optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '4' }, { key: 'D', text: '6' }],
    correctAnswerJson: 'C', explanation: '10 - 6 = 4.',
  },
  {
    sortOrder: 7, difficultyLevel: 'medium', questionType: 'true_false',
    questionText: '5 + 3 = 7',
    correctAnswerJson: false, explanation: '5 + 3 = 8, không phải 7.',
  },
  {
    sortOrder: 8, difficultyLevel: 'medium', questionType: 'single_choice',
    questionText: 'Hình vuông có mấy góc?',
    optionsJson: [{ key: 'A', text: '3' }, { key: 'B', text: '5' }, { key: 'C', text: '4' }, { key: 'D', text: '6' }],
    correctAnswerJson: 'C', explanation: 'Hình vuông có 4 góc.',
  },
  {
    sortOrder: 9, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Có 8 con gà, bán đi 3 con. Hỏi còn lại bao nhiêu con gà?',
    optionsJson: [{ key: 'A', text: '4 con' }, { key: 'B', text: '6 con' }, { key: 'C', text: '5 con' }, { key: 'D', text: '3 con' }],
    correctAnswerJson: 'C', explanation: '8 - 3 = 5 con gà còn lại.',
  },
  {
    sortOrder: 10, difficultyLevel: 'hard', questionType: 'single_choice',
    questionText: 'Hoa có 4 cái kẹo, mẹ cho thêm 4 cái. Hỏi Hoa có tất cả mấy cái kẹo?',
    optionsJson: [{ key: 'A', text: '7 cái' }, { key: 'B', text: '9 cái' }, { key: 'C', text: '6 cái' }, { key: 'D', text: '8 cái' }],
    correctAnswerJson: 'D', explanation: '4 + 4 = 8 cái kẹo.',
  },
];

// ─── Seed data ────────────────────────────────────────────────────────────────

interface ExamSeed {
  title: string;
  slug: string;
  subject: string;
  grade: number;
  semester: number;
  description: string;
  timeLimitMinutes: number | null;
  totalPoints: number;
  questions: Q[];
}

const EXAMS: ExamSeed[] = [
  {
    title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 1',
    slug: 'kiem-tra-giua-hk1-toan-lop1',
    subject: 'toan',
    grade: 1,
    semester: 1,
    description: 'Đề kiểm tra 15 phút – Số trong phạm vi 10, cộng trừ cơ bản, nhận biết hình học',
    timeLimitMinutes: 15,
    totalPoints: 10,
    questions: GHK1_QUESTIONS,
  },
  {
    title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 1',
    slug: 'kiem-tra-cuoi-hk1-toan-lop1',
    subject: 'toan',
    grade: 1,
    semester: 1,
    description: 'Đề kiểm tra 40 phút – Số trong phạm vi 10, cộng trừ trong 10, hình học cơ bản, bài toán có lời văn',
    timeLimitMinutes: 40,
    totalPoints: 10,
    questions: HK1_QUESTIONS,
  },
  {
    title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 1',
    slug: 'kiem-tra-cuoi-hk2-toan-lop1',
    subject: 'toan',
    grade: 1,
    semester: 2,
    description: 'Đề kiểm tra 40 phút – Số trong phạm vi 20, cộng trừ trong 20, đo lường, bài toán có lời văn',
    timeLimitMinutes: 40,
    totalPoints: 10,
    questions: HK2_QUESTIONS,
  },
];

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');

  for (const exam of EXAMS) {
    // Xóa đề cũ nếu có
    const existing = await ds.query('SELECT id FROM exams WHERE slug = ?', [exam.slug]);
    if (existing.length > 0) {
      await ds.query('DELETE FROM exam_questions WHERE examId = ?', [existing[0].id]);
      await ds.query('DELETE FROM exams WHERE id = ?', [existing[0].id]);
      console.log(`🗑  Đã xóa đề cũ: ${exam.slug}`);
    }

    // Tạo đề thi
    const result = await ds.query(
      `INSERT INTO exams (title, slug, subject, grade, semester, description, timeLimitMinutes, totalPoints, isActive, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
      [exam.title, exam.slug, exam.subject, exam.grade, exam.semester, exam.description, exam.timeLimitMinutes, exam.totalPoints],
    );
    const examId = result.insertId;

    // Tạo câu hỏi
    const pointsPerQ = exam.totalPoints / exam.questions.length;
    for (const q of exam.questions) {
      await ds.query(
        `INSERT INTO exam_questions (examId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, explanation, points, sortOrder, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          examId,
          q.questionText,
          q.questionType,
          q.difficultyLevel,
          q.optionsJson ? JSON.stringify(q.optionsJson) : null,
          JSON.stringify(q.correctAnswerJson),
          q.explanation ?? null,
          q.points ?? pointsPerQ,
          q.sortOrder,
        ],
      );
    }
    console.log(`✅ Tạo xong: "${exam.title}" (${exam.questions.length} câu)`);
  }

  console.log('\n🎉 Xong! Tạo 3 đề thi Toán lớp 1.');
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
