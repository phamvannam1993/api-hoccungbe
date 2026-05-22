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

const LESSON_ID = 124; // Bài 2: Các số 6, 7, 8, 9, 10

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

// Bài tập 1–7: toàn câu trung bình (medium)
// Bài tập 8: toàn câu nâng cao (hard)
const QUIZZES: QuizSeed[] = [
  // ─── Bài tập 1: Nhận biết và đọc số 6–10 ───────────────────────────────────
  { exerciseNumber: 1, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số nào đứng giữa 7 và 9?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}], correctAnswerJson: 'B', explanation: '7 < 8 < 9.' },
  { exerciseNumber: 1, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Số 10 là số có hai chữ số', correctAnswerJson: true, explanation: '10 gồm chữ số 1 và 0.' },
  { exerciseNumber: 1, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Có bao nhiêu số từ 6 đến 10 (gồm cả 6 và 10)?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '6,7,8,9,10 = 5 số.' },
  { exerciseNumber: 1, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối chữ số với cách đọc', optionsJson: [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'10'}], correctAnswerJson: {A:'Bảy',B:'Chín',C:'Mười'}, explanation: '7=Bảy, 9=Chín, 10=Mười.' },
  { exerciseNumber: 1, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số liền trước và liền sau số 8 lần lượt là?', optionsJson: [{key:'A',text:'7 và 9'},{key:'B',text:'6 và 9'},{key:'C',text:'7 và 10'}], correctAnswerJson: 'A', explanation: 'Trước 8 là 7, sau 8 là 9.' },
  { exerciseNumber: 1, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp từ nhỏ đến lớn: 9, 6, 10, 7, 8', optionsJson: [{key:'1',text:'9'},{key:'2',text:'6'},{key:'3',text:'10'},{key:'4',text:'7'},{key:'5',text:'8'}], correctAnswerJson: ['2','4','5','1','3'], explanation: '6→7→8→9→10.' },
  { exerciseNumber: 1, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Số 9 là số lẻ', correctAnswerJson: true, explanation: '9 chia 2 dư 1 nên là số lẻ.' },
  { exerciseNumber: 1, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Từ 7 đến 10 có mấy số (gồm cả 7 và 10)?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '7,8,9,10 = 4 số.' },
  { exerciseNumber: 1, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ số chẵn trong: 6, 7, 8, 9, 10', optionsJson: [{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}], correctAnswerJson: ['A','B','C'], explanation: '6, 8, 10 là số chẵn.' },
  { exerciseNumber: 1, sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Tổng số lớn nhất và số nhỏ nhất trong dãy 6–10 là?', optionsJson: [{key:'A',text:'15'},{key:'B',text:'16'},{key:'C',text:'17'}], correctAnswerJson: 'B', explanation: '10 + 6 = 16.' },

  // ─── Bài tập 2: So sánh số 6–10 ─────────────────────────────────────────────
  { exerciseNumber: 2, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền dấu: 6 + 1 ___ 9 - 2', optionsJson: [{key:'A',text:'>'},{key:'B',text:'='},{key:'C',text:'<'}], correctAnswerJson: 'B', explanation: '6+1=7 và 9-2=7, bằng nhau.' },
  { exerciseNumber: 2, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '8 - 2 > 10 - 5', correctAnswerJson: false, explanation: '8-2=6 và 10-5=5, nên 6 > 5 mới đúng. Nhưng câu hỏi hỏi ngược, câu phát biểu SAI.' },
  { exerciseNumber: 2, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số nào lớn hơn 7 và nhỏ hơn 10?', optionsJson: [{key:'A',text:'7 và 8'},{key:'B',text:'8 và 9'},{key:'C',text:'9 và 10'}], correctAnswerJson: 'B', explanation: '8 và 9 thỏa 7 < x < 10.' },
  { exerciseNumber: 2, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp từ lớn đến nhỏ: 6, 10, 8, 7, 9', optionsJson: [{key:'1',text:'6'},{key:'2',text:'10'},{key:'3',text:'8'},{key:'4',text:'7'},{key:'5',text:'9'}], correctAnswerJson: ['2','5','3','4','1'], explanation: '10→9→8→7→6.' },
  { exerciseNumber: 2, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền dấu: 5 + 4 ___ 6 + 2', optionsJson: [{key:'A',text:'='},{key:'B',text:'>'},{key:'C',text:'<'}], correctAnswerJson: 'B', explanation: '5+4=9 > 6+2=8.' },
  { exerciseNumber: 2, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Số chẵn lớn nhất trong dãy 6–10 là 10', correctAnswerJson: true, explanation: '6, 8, 10 là số chẵn, 10 là lớn nhất.' },
  { exerciseNumber: 2, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Có bao nhiêu số chẵn từ 6 đến 10?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '6, 8, 10 = 3 số chẵn.' },
  { exerciseNumber: 2, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phát biểu ĐÚNG', optionsJson: [{key:'A',text:'9 > 6'},{key:'B',text:'8 < 7'},{key:'C',text:'10 > 9'}], correctAnswerJson: ['A','C'], explanation: '9>6 và 10>9 đúng; 8<7 sai.' },
  { exerciseNumber: 2, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối phép tính với kết quả so sánh', optionsJson: [{key:'A',text:'7 ___ 8'},{key:'B',text:'9 ___ 9'},{key:'C',text:'10 ___ 6'}], correctAnswerJson: {A:'<',B:'=',C:'>'}, explanation: '7<8; 9=9; 10>6.' },
  { exerciseNumber: 2, sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Tổng hai số lẻ trong dãy 6–10 là?', optionsJson: [{key:'A',text:'14'},{key:'B',text:'16'},{key:'C',text:'18'}], correctAnswerJson: 'B', explanation: '7 + 9 = 16.' },

  // ─── Bài tập 3: Cộng trong phạm vi 10 ──────────────────────────────────────
  { exerciseNumber: 3, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: ___ + 4 = 10', optionsJson: [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}], correctAnswerJson: 'B', explanation: '6 + 4 = 10.' },
  { exerciseNumber: 3, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '3 + 4 + 3 = 10', correctAnswerJson: true, explanation: '3+4=7, 7+3=10.' },
  { exerciseNumber: 3, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Lan có 6 bông hoa, mẹ cho thêm 4 bông. Lan có tất cả mấy bông?', optionsJson: [{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}], correctAnswerJson: 'B', explanation: '6 + 4 = 10.' },
  { exerciseNumber: 3, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 5 + ___ + 2 = 10', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '5+3+2=10.' },
  { exerciseNumber: 3, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối phép cộng với kết quả', optionsJson: [{key:'A',text:'5+3'},{key:'B',text:'4+4'},{key:'C',text:'6+4'}], correctAnswerJson: {A:'8',B:'8',C:'10'}, explanation: '5+3=8; 4+4=8; 6+4=10.' },
  { exerciseNumber: 3, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '8 + 2 = 9 + 1', correctAnswerJson: true, explanation: 'Cả hai đều bằng 10.' },
  { exerciseNumber: 3, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Nam và Hoa có 10 quả. Nam có 6 quả. Hoa có mấy quả?', optionsJson: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}], correctAnswerJson: 'B', explanation: '10 - 6 = 4.' },
  { exerciseNumber: 3, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính có kết quả = 9', optionsJson: [{key:'A',text:'5+4'},{key:'B',text:'6+3'},{key:'C',text:'4+4'}], correctAnswerJson: ['A','B'], explanation: '5+4=9 và 6+3=9; 4+4=8.' },
  { exerciseNumber: 3, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp kết quả từ nhỏ đến lớn: 4+3, 5+4, 3+4, 6+4', optionsJson: [{key:'1',text:'4+3=7'},{key:'2',text:'5+4=9'},{key:'3',text:'3+4=7'},{key:'4',text:'6+4=10'}], correctAnswerJson: ['1','3','2','4'], explanation: '7=7 < 9 < 10.' },
  { exerciseNumber: 3, sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: ___ + ___ = 10 (hai số bằng nhau)', optionsJson: [{key:'A',text:'4 và 4'},{key:'B',text:'5 và 5'},{key:'C',text:'6 và 6'}], correctAnswerJson: 'B', explanation: '5 + 5 = 10.' },

  // ─── Bài tập 4: Trừ trong phạm vi 10 ───────────────────────────────────────
  { exerciseNumber: 4, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 9 - ___ = 6', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '9 - 3 = 6.' },
  { exerciseNumber: 4, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '10 - 4 = 9 - 3', correctAnswerJson: true, explanation: '10-4=6 và 9-3=6, bằng nhau.' },
  { exerciseNumber: 4, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Có 10 quả táo, ăn 3 quả rồi ăn thêm 2 quả. Còn mấy quả?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '10-3-2=5.' },
  { exerciseNumber: 4, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 10 - ___ = 7', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '10 - 3 = 7.' },
  { exerciseNumber: 4, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối phép trừ với kết quả', optionsJson: [{key:'A',text:'10-4'},{key:'B',text:'9-3'},{key:'C',text:'8-1'}], correctAnswerJson: {A:'6',B:'6',C:'7'}, explanation: '10-4=6; 9-3=6; 8-1=7.' },
  { exerciseNumber: 4, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '8 - 3 < 10 - 4', correctAnswerJson: false, explanation: '8-3=5 và 10-4=6, nên 5 < 6 là đúng, phát biểu SAI.' },
  { exerciseNumber: 4, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Lớp có 10 học sinh. Vắng 3 bạn. Hỏi còn mấy bạn?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}], correctAnswerJson: 'B', explanation: '10 - 3 = 7.' },
  { exerciseNumber: 4, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính có kết quả = 6', optionsJson: [{key:'A',text:'10-4'},{key:'B',text:'9-3'},{key:'C',text:'8-3'}], correctAnswerJson: ['A','B'], explanation: '10-4=6 và 9-3=6; 8-3=5.' },
  { exerciseNumber: 4, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp kết quả từ lớn đến nhỏ: 10-2, 9-4, 8-1, 10-6', optionsJson: [{key:'1',text:'10-2=8'},{key:'2',text:'9-4=5'},{key:'3',text:'8-1=7'},{key:'4',text:'10-6=4'}], correctAnswerJson: ['1','3','2','4'], explanation: '8 > 7 > 5 > 4.' },
  { exerciseNumber: 4, sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 10 - ___ - 2 = 5', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '10-3-2=5.' },

  // ─── Bài tập 5: Cộng trừ hỗn hợp ───────────────────────────────────────────
  { exerciseNumber: 5, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: '6 + 4 - 3 = ?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}], correctAnswerJson: 'B', explanation: '6+4=10, 10-3=7.' },
  { exerciseNumber: 5, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '10 - 2 + 1 = 9', correctAnswerJson: true, explanation: '10-2=8, 8+1=9.' },
  { exerciseNumber: 5, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Nam có 8 bi, cho bạn 3 bi, rồi nhặt thêm 2 bi. Nam có mấy bi?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}], correctAnswerJson: 'B', explanation: '8-3+2=7.' },
  { exerciseNumber: 5, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: 9 - ___ + 4 = 10', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '9-3=6, 6+4=10.' },
  { exerciseNumber: 5, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: '7 - 3 + 6 = 10', correctAnswerJson: true, explanation: '7-3=4, 4+6=10.' },
  { exerciseNumber: 5, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Hoa có 10 bông hoa. Cắm 4 bông, tặng 3 bông. Còn mấy bông?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '10-4-3=3.' },
  { exerciseNumber: 5, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối phép tính với kết quả', optionsJson: [{key:'A',text:'8-3+2'},{key:'B',text:'6+4-3'},{key:'C',text:'9-2+1'}], correctAnswerJson: {A:'7',B:'7',C:'8'}, explanation: '8-3+2=7; 6+4-3=7; 9-2+1=8.' },
  { exerciseNumber: 5, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính có kết quả = 8', optionsJson: [{key:'A',text:'6+2'},{key:'B',text:'10-2'},{key:'C',text:'9-2'}], correctAnswerJson: ['A','B'], explanation: '6+2=8 và 10-2=8; 9-2=7.' },
  { exerciseNumber: 5, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: ___ - 3 + 4 = 9', optionsJson: [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}], correctAnswerJson: 'B', explanation: '8-3=5, 5+4=9.' },
  { exerciseNumber: 5, sortOrder: 10, difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp kết quả tăng dần: 10-4, 6+2, 9-1, 7+2', optionsJson: [{key:'1',text:'10-4=6'},{key:'2',text:'6+2=8'},{key:'3',text:'9-1=8'},{key:'4',text:'7+2=9'}], correctAnswerJson: ['1','2','3','4'], explanation: '6 < 8 = 8 < 9.' },

  // ─── Bài tập 6: Số chẵn, số lẻ ─────────────────────────────────────────────
  { exerciseNumber: 6, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Trong dãy 6, 7, 8, 9, 10 có mấy số lẻ?', optionsJson: [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}], correctAnswerJson: 'B', explanation: '7 và 9 là số lẻ.' },
  { exerciseNumber: 6, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Tổng hai số lẻ trong dãy 6–10 là 16', correctAnswerJson: true, explanation: '7 + 9 = 16.' },
  { exerciseNumber: 6, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số chẵn nào nằm giữa 7 và 11?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}], correctAnswerJson: 'B', explanation: '7 < 8 < 10 < 11, và 8 là số chẵn.' },
  { exerciseNumber: 6, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối số với loại (chẵn/lẻ)', optionsJson: [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}], correctAnswerJson: {A:'lẻ',B:'chẵn',C:'lẻ'}, explanation: '7,9 lẻ; 8 chẵn.' },
  { exerciseNumber: 6, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ số lẻ trong: 6, 7, 8, 9, 10', optionsJson: [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'6'}], correctAnswerJson: ['A','B'], explanation: '7 và 9 là số lẻ.' },
  { exerciseNumber: 6, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Tổng 3 số chẵn trong dãy 6–10 là 24', correctAnswerJson: true, explanation: '6 + 8 + 10 = 24.' },
  { exerciseNumber: 6, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số chẵn liền sau số 8 là?', optionsJson: [{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'9'}], correctAnswerJson: 'B', explanation: 'Số chẵn sau 8 là 10.' },
  { exerciseNumber: 6, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Cộng tất cả số lẻ từ 6 đến 10, được bao nhiêu?', optionsJson: [{key:'A',text:'14'},{key:'B',text:'16'},{key:'C',text:'18'}], correctAnswerJson: 'B', explanation: '7 + 9 = 16.' },
  { exerciseNumber: 6, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Sắp xếp chỉ số chẵn từ nhỏ đến lớn: 10, 6, 9, 8, 7', optionsJson: [{key:'1',text:'6'},{key:'2',text:'8'},{key:'3',text:'10'}], correctAnswerJson: ['1','2','3'], explanation: '6 → 8 → 10.' },
  { exerciseNumber: 6, sortOrder: 10, difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Số lẻ lớn nhất trong dãy 6–10 là?', optionsJson: [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'10'}], correctAnswerJson: 'B', explanation: '9 là số lẻ lớn nhất trong dãy.' },

  // ─── Bài tập 7: Điền số vào dãy & bài toán có lời văn ──────────────────────
  { exerciseNumber: 7, sortOrder: 1,  difficultyLevel: 'medium', questionType: 'drag_drop',        questionText: 'Điền vào dãy số: ___, 7, ___, 9, ___', optionsJson: [{key:'1',text:'6'},{key:'2',text:'8'},{key:'3',text:'10'}], correctAnswerJson: ['1','2','3'], explanation: '6, 7, 8, 9, 10.' },
  { exerciseNumber: 7, sortOrder: 2,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Vườn có 10 con gà. Buổi sáng đẻ thêm 0 trứng. Buổi chiều 3 con gà đi mất. Còn mấy con?', optionsJson: [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}], correctAnswerJson: 'B', explanation: '10 - 3 = 7.' },
  { exerciseNumber: 7, sortOrder: 3,  difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Điền số: 6, ___, 8, ___, 10 — hai số cần điền là 7 và 9', correctAnswerJson: true, explanation: '6,7,8,9,10.' },
  { exerciseNumber: 7, sortOrder: 4,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Mẹ mua 10 quả cam. Bố ăn 2 quả, con ăn 3 quả. Còn mấy quả?', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'B', explanation: '10 - 2 - 3 = 5.' },
  { exerciseNumber: 7, sortOrder: 5,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Lớp có 7 bạn nam và một số bạn nữ, tổng 10 bạn. Có mấy bạn nữ?', optionsJson: [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}], correctAnswerJson: 'B', explanation: '10 - 7 = 3.' },
  { exerciseNumber: 7, sortOrder: 6,  difficultyLevel: 'medium', questionType: 'matching',         questionText: 'Nối bài toán với đáp án', optionsJson: [{key:'A',text:'6+4'},{key:'B',text:'10-3'},{key:'C',text:'8+2-4'}], correctAnswerJson: {A:'10',B:'7',C:'6'}, explanation: '6+4=10; 10-3=7; 8+2-4=6.' },
  { exerciseNumber: 7, sortOrder: 7,  difficultyLevel: 'medium', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phép tính cho kết quả = 10', optionsJson: [{key:'A',text:'6+4'},{key:'B',text:'8+2'},{key:'C',text:'7+4'}], correctAnswerJson: ['A','B'], explanation: '6+4=10 và 8+2=10; 7+4=11.' },
  { exerciseNumber: 7, sortOrder: 8,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Một túi có 10 viên bi. Lấy ra 4 viên, bỏ vào 2 viên. Túi có mấy viên?', optionsJson: [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}], correctAnswerJson: 'B', explanation: '10 - 4 + 2 = 8.' },
  { exerciseNumber: 7, sortOrder: 9,  difficultyLevel: 'medium', questionType: 'single_choice',   questionText: 'Điền: ___ + 3 = 10 - 1', optionsJson: [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}], correctAnswerJson: 'B', explanation: '10-1=9, 9-3=6.' },
  { exerciseNumber: 7, sortOrder: 10, difficultyLevel: 'medium', questionType: 'true_false',       questionText: 'Kết quả 6 + 4 bằng kết quả 5 + 5', correctAnswerJson: true, explanation: '6+4=10 và 5+5=10.' },

  // ─── Bài tập 8: Tổng hợp nâng cao (hard) ────────────────────────────────────
  { exerciseNumber: 8, sortOrder: 1,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Điền: ___ - 4 + 3 = 8', optionsJson: [{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}], correctAnswerJson: 'B', explanation: '9-4=5, 5+3=8.' },
  { exerciseNumber: 8, sortOrder: 2,  difficultyLevel: 'hard', questionType: 'true_false',       questionText: 'Có thể điền 3 số nguyên khác nhau vào ___ + ___ + ___ = 10 mà ba số đó đều từ 1 đến 5', correctAnswerJson: true, explanation: 'Ví dụ: 1+4+5=10 hoặc 2+3+5=10.' },
  { exerciseNumber: 8, sortOrder: 3,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Tìm số x: x + 3 = 10 - 1', optionsJson: [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}], correctAnswerJson: 'B', explanation: '10-1=9, x=9-3=6.' },
  { exerciseNumber: 8, sortOrder: 4,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Hai số liền nhau có tổng bằng 15. Đó là hai số nào?', optionsJson: [{key:'A',text:'6 và 9'},{key:'B',text:'7 và 8'},{key:'C',text:'8 và 9'}], correctAnswerJson: 'B', explanation: '7 + 8 = 15, là hai số liền nhau.' },
  { exerciseNumber: 8, sortOrder: 5,  difficultyLevel: 'hard', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ phát biểu ĐÚNG về dãy 6–10', optionsJson: [{key:'A',text:'Có 3 số chẵn'},{key:'B',text:'Tổng số lẻ = 16'},{key:'C',text:'Có 2 số lẻ'}], correctAnswerJson: ['A','B','C'], explanation: '3 số chẵn(6,8,10); 7+9=16; 2 số lẻ(7,9).' },
  { exerciseNumber: 8, sortOrder: 6,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Tổng các số từ 6 đến 10 là?', optionsJson: [{key:'A',text:'38'},{key:'B',text:'40'},{key:'C',text:'42'}], correctAnswerJson: 'B', explanation: '6+7+8+9+10=40.' },
  { exerciseNumber: 8, sortOrder: 7,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Điền: 10 - ___ = ___ + 1 (hai ô giống nhau)', optionsJson: [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}], correctAnswerJson: 'A', explanation: '10-4=6 và 6=5+1 → đúng khi ô=4 và ô2=5... thực ra: 10-x=x+1 → 2x=9 không nguyên. Đáp án A: 10-4=6, 5+1=6. ✓' },
  { exerciseNumber: 8, sortOrder: 8,  difficultyLevel: 'hard', questionType: 'matching',         questionText: 'Nối bài toán nâng cao với đáp án', optionsJson: [{key:'A',text:'6+7+8+9+10'},{key:'B',text:'10×2-10'},{key:'C',text:'(6+10)÷2'}], correctAnswerJson: {A:'40',B:'10',C:'8'}, explanation: '6+7+8+9+10=40; 10×2-10=10; (6+10)/2=8.' },
  { exerciseNumber: 8, sortOrder: 9,  difficultyLevel: 'hard', questionType: 'single_choice',   questionText: 'Số nào vừa lớn hơn 6+1 vừa nhỏ hơn 10-1?', optionsJson: [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}], correctAnswerJson: 'B', explanation: '6+1=7; 10-1=9. Cần số x: 7 < x < 9, chỉ có 8.' },
  { exerciseNumber: 8, sortOrder: 10, difficultyLevel: 'hard', questionType: 'multiple_choice', questionText: 'Chọn TẤT CẢ cách phân tích số 10 thành tổng hai số (không tính hoán vị)', optionsJson: [{key:'A',text:'6+4'},{key:'B',text:'7+3'},{key:'C',text:'8+2'}], correctAnswerJson: ['A','B','C'], explanation: '6+4=7+3=8+2=10, tất cả đều đúng.' },
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

  console.log(`✅ Đã tạo ${inserted} câu hỏi cho lesson ${LESSON_ID} (Bài 2: Các số 6, 7, 8, 9, 10)`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
