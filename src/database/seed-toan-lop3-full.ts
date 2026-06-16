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

// ─── Helpers tạo câu hỏi ────────────────────────────────────────────────────
const sc = (text: string, opts: string[], correctIdx: number, diff: Difficulty, ex: number, sort: number, expl?: string): QuizSeed => ({
  questionText: text, questionType: 'single_choice', difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort,
  optionsJson: opts.map((t, i) => ({ key: String.fromCharCode(65 + i), text: t })),
  correctAnswerJson: String.fromCharCode(65 + correctIdx),
  explanation: expl,
});
const tf = (text: string, correct: boolean, diff: Difficulty, ex: number, sort: number, expl?: string): QuizSeed => ({
  questionText: text, questionType: 'true_false', difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort,
  correctAnswerJson: correct, explanation: expl,
});
const mc = (text: string, opts: string[], correctIdxs: number[], diff: Difficulty, ex: number, sort: number, expl?: string): QuizSeed => ({
  questionText: text, questionType: 'multiple_choice', difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort,
  optionsJson: opts.map((t, i) => ({ key: String.fromCharCode(65 + i), text: t })),
  correctAnswerJson: correctIdxs.map((i) => String.fromCharCode(65 + i)),
  explanation: expl,
});
const dd = (text: string, items: string[], correctOrder: number[], diff: Difficulty, ex: number, sort: number, expl?: string): QuizSeed => ({
  questionText: text, questionType: 'drag_drop', difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort,
  optionsJson: items.map((t, i) => ({ key: String(i + 1), text: t })),
  correctAnswerJson: correctOrder.map((i) => String(i + 1)),
  explanation: expl,
});
const mt = (text: string, items: string[], mapping: string[], diff: Difficulty, ex: number, sort: number): QuizSeed => ({
  questionText: text, questionType: 'matching', difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort,
  optionsJson: items.map((t, i) => ({ key: String.fromCharCode(65 + i), text: t })),
  correctAnswerJson: Object.fromEntries(items.map((_, i) => [String.fromCharCode(65 + i), mapping[i]])),
});

// ─── Generators chung theo chủ đề ───────────────────────────────────────────

// Bảng nhân n (n=2..9)
function bangNhan(n: number): QuizSeed[] {
  const out: QuizSeed[] = [];
  // easy 10
  for (let i = 1; i <= 10; i++) {
    const a = ((i - 1) % 9) + 1;
    const correct = n * a;
    const opts = [String(correct), String(correct + n), String(Math.max(0, correct - n))];
    out.push(sc(`${n} × ${a} = ?`, opts, 0, 'easy', 1, i));
  }
  // medium 10
  out.push(sc(`${n} × 4 + ${n} = ?`, [String(n * 5), String(n * 4), String(n * 6)], 0, 'medium', 2, 1, `${n}×4 + ${n} = ${n}×5 = ${n * 5}.`));
  out.push(sc(`Tích của ${n} và 6 là?`, [String(n * 6), String(n + 6), String(n * 5)], 0, 'medium', 2, 2));
  out.push(tf(`${n} × 0 = 0. Đúng hay sai?`, true, 'medium', 2, 3));
  out.push(sc(`${n} nhân với mấy được ${n * 7}?`, ['6', '7', '8'], 1, 'medium', 2, 4));
  out.push(mc(`Phép tính nào có kết quả bằng ${n * 5}?`, [`${n}×5`, `${n}+${n}+${n}+${n}+${n}`, `${n}×4`], [0, 1], 'medium', 2, 5));
  out.push(dd(`Sắp tích tăng dần: ${n}×2, ${n}×5, ${n}×3`, [`${n}×2`, `${n}×5`, `${n}×3`], [0, 2, 1], 'medium', 2, 6));
  out.push(sc(`Có ${n} túi, mỗi túi 4 quả. Tổng?`, [String(n * 4), String(n + 4), String(n * 3)], 0, 'medium', 2, 7));
  out.push(sc(`${n} × 9 = ?`, [String(n * 9), String(n * 8), String(n * 10)], 0, 'medium', 2, 8));
  out.push(tf(`${n} × 10 = ${n * 10}. Đúng hay sai?`, true, 'medium', 2, 9));
  out.push(mt(`Nối phép nhân với kết quả`, [`${n}×3`, `${n}×6`, `${n}×8`], [String(n * 3), String(n * 6), String(n * 8)], 'medium', 2, 10));
  // hard 10
  out.push(sc(`(${n} × 5) - (${n} × 2) = ?`, [String(n * 3), String(n * 7), String(n * 4)], 0, 'hard', 3, 1, `${n}×5 - ${n}×2 = ${n}×3 = ${n * 3}.`));
  out.push(sc(`Tìm x: ${n} × x = ${n * 7}`, ['6', '7', '8'], 1, 'hard', 3, 2));
  out.push(sc(`${n} × 4 × 2 = ?`, [String(n * 8), String(n * 6), String(n * 4)], 0, 'hard', 3, 3));
  out.push(mc(`Phép nhân nào lớn hơn ${n * 5}?`, [`${n}×4`, `${n}×6`, `${n}×7`], [1, 2], 'hard', 3, 4));
  out.push(tf(`${n} × 8 > ${n} × 7. Đúng hay sai?`, true, 'hard', 3, 5));
  out.push(dd(`Sắp xếp giảm dần: ${n}×3, ${n}×8, ${n}×5`, [`${n}×3`, `${n}×8`, `${n}×5`], [1, 2, 0], 'hard', 3, 6));
  out.push(sc(`Một hộp có ${n} viên. Hỏi 9 hộp có bao nhiêu viên?`, [String(n * 9), String(n + 9), String(n * 8)], 0, 'hard', 3, 7));
  out.push(sc(`Số nào gấp ${n} lần số 6?`, [String(n * 6), String(6 + n), String(n + 6)], 0, 'hard', 3, 8));
  out.push(mt(`Nối`, [`${n}×2`, `${n}×7`, `${n}×9`], [String(n * 2), String(n * 7), String(n * 9)], 'hard', 3, 9));
  out.push(tf(`${n} × 1 = 1. Đúng hay sai?`, false, 'hard', 3, 10, `${n} × 1 = ${n}.`));
  return out;
}

// Bảng chia n (n=2..9)
function bangChia(n: number): QuizSeed[] {
  const out: QuizSeed[] = [];
  for (let i = 1; i <= 10; i++) {
    const q = ((i - 1) % 9) + 1;
    const a = n * q;
    out.push(sc(`${a} : ${n} = ?`, [String(q), String(q + 1), String(Math.max(0, q - 1))], 0, 'easy', 1, i));
  }
  out.push(sc(`Số nào chia hết cho ${n}?`, [String(n * 7), String(n * 7 + 1), String(n * 7 - 1)], 0, 'medium', 2, 1));
  out.push(sc(`${n * 8} chia ${n} bằng?`, ['7', '8', '9'], 1, 'medium', 2, 2));
  out.push(tf(`${n * 5} : ${n} = 5. Đúng hay sai?`, true, 'medium', 2, 3));
  out.push(sc(`Chia đều ${n * 6} quả cho ${n} bạn, mỗi bạn được mấy quả?`, ['5', '6', '7'], 1, 'medium', 2, 4));
  out.push(mc(`Phép chia nào có kết quả bằng 4?`, [`${n * 4} : ${n}`, `${n * 5} : ${n}`, `${n * 8} : ${n * 2}`], [0, 2], 'medium', 2, 5));
  out.push(dd(`Sắp thương tăng: ${n * 6}:${n}, ${n * 2}:${n}, ${n * 4}:${n}`, [`${n * 6}:${n}`, `${n * 2}:${n}`, `${n * 4}:${n}`], [1, 2, 0], 'medium', 2, 6));
  out.push(sc(`${n} × ? = ${n * 9}`, ['8', '9', '10'], 1, 'medium', 2, 7));
  out.push(sc(`Số bị chia là ${n * 7}, số chia là ${n}. Thương?`, ['6', '7', '8'], 1, 'medium', 2, 8));
  out.push(tf(`Phép chia là phép tính ngược của phép nhân. Đúng hay sai?`, true, 'medium', 2, 9));
  out.push(mt(`Nối phép chia với thương`, [`${n * 3}:${n}`, `${n * 6}:${n}`, `${n * 9}:${n}`], ['3', '6', '9'], 'medium', 2, 10));
  out.push(sc(`${n * 8} : ${n} + ${n} = ?`, [String(8 + n), String(8), String(n * 9)], 0, 'hard', 3, 1));
  out.push(sc(`Tìm x: ${n * 5} : x = 5`, [String(n), String(5), String(n * 5)], 0, 'hard', 3, 2));
  out.push(sc(`(${n * 9}) : (${n}) - 2 = ?`, ['6', '7', '8'], 1, 'hard', 3, 3, `${n * 9}:${n}=9; 9-2=7.`));
  out.push(mc(`Số nào chia hết cho ${n}?`, [String(n * 4), String(n * 4 + 1), String(n * 6)], [0, 2], 'hard', 3, 4));
  out.push(tf(`0 chia ${n} bằng 0. Đúng hay sai?`, true, 'hard', 3, 5));
  out.push(dd(`Sắp xếp tăng theo thương: ${n * 9}:${n}, ${n * 3}:${n}, ${n * 6}:${n}`, [`${n * 9}:${n}`, `${n * 3}:${n}`, `${n * 6}:${n}`], [1, 2, 0], 'hard', 3, 6));
  out.push(sc(`Có ${n * 7} bạn xếp thành ${n} hàng đều. Mỗi hàng?`, ['6', '7', '8'], 1, 'hard', 3, 7));
  out.push(sc(`Một số chia ${n} được 6, số đó là?`, [String(n * 5), String(n * 6), String(n * 7)], 1, 'hard', 3, 8));
  out.push(mt(`Nối`, [`${n * 2}:${n}`, `${n * 5}:${n}`, `${n * 8}:${n}`], ['2', '5', '8'], 'hard', 3, 9));
  out.push(tf(`Bất kỳ số nào chia cho 1 cũng bằng chính nó. Đúng hay sai?`, true, 'hard', 3, 10));
  return out;
}

// Cộng/trừ phạm vi N (N = 1000, 10000, 100000)
function congTru(maxN: number, isCong: boolean): QuizSeed[] {
  const op = isCong ? '+' : '-';
  const calc = (a: number, b: number) => isCong ? a + b : a - b;
  const out: QuizSeed[] = [];
  const base = Math.floor(maxN / 100);
  for (let i = 1; i <= 10; i++) {
    const a = base * i + 12;
    const b = base + i * 5;
    const r = calc(a, b);
    out.push(sc(`${a} ${op} ${b} = ?`, [String(r), String(r + 10), String(Math.max(0, r - 10))], 0, 'easy', 1, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = base * 5 + i * 7;
    const b = base * 2 + i * 3;
    const r = calc(a, b);
    if (i % 3 === 0) {
      out.push(tf(`${a} ${op} ${b} = ${r}. Đúng hay sai?`, true, 'medium', 2, i));
    } else if (i % 3 === 1) {
      out.push(sc(`${a} ${op} ${b} = ?`, [String(r), String(r - 1), String(r + 1)], 0, 'medium', 2, i));
    } else {
      out.push(mc(`Phép tính nào đúng?`, [`${a} ${op} ${b} = ${r}`, `${a} ${op} ${b} = ${r + 1}`, `${a} ${op} ${b} = ${r - 1}`], [0], 'medium', 2, i));
    }
  }
  for (let i = 1; i <= 10; i++) {
    const a = base * 8 + i * 11;
    const b = base * 3 + i * 7;
    const r = calc(a, b);
    if (i === 1) out.push(sc(`Tìm x: x ${op} ${b} = ${r}`, [String(a), String(a + 1), String(a - 1)], 0, 'hard', 3, i));
    else if (i === 4) out.push(dd(`Sắp xếp tăng: ${a}${op}${b}, ${a + 100}${op}${b}, ${a - 50}${op}${b}`, [`${a}${op}${b}`, `${a + 100}${op}${b}`, `${a - 50}${op}${b}`], [2, 0, 1], 'hard', 3, i));
    else if (i === 7) out.push(mt(`Nối phép tính với kết quả`, [`${a}${op}${b}`, `${a + 10}${op}${b}`, `${a + 20}${op}${b}`], [String(r), String(calc(a + 10, b)), String(calc(a + 20, b))], 'hard', 3, i));
    else if (i === 10) out.push(tf(`Phép cộng có tính chất giao hoán. Đúng hay sai?`, true, 'hard', 3, i));
    else out.push(sc(`${a} ${op} ${b} = ?`, [String(r), String(r + 2), String(r - 2)], 0, 'hard', 3, i));
  }
  return out;
}

// Nhân số có k chữ số với 1 chữ số
function nhanKChuSo(k: number): QuizSeed[] {
  const out: QuizSeed[] = [];
  const baseA = Math.pow(10, k - 1) + 3;
  for (let i = 1; i <= 10; i++) {
    const a = baseA + i * 5;
    const b = (i % 8) + 2;
    out.push(sc(`${a} × ${b} = ?`, [String(a * b), String(a * b + 10), String(a * b - 10)], 0, 'easy', 1, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = baseA + i * 13;
    const b = (i % 7) + 3;
    const r = a * b;
    if (i % 3 === 0) out.push(tf(`${a} × ${b} = ${r}. Đúng hay sai?`, true, 'medium', 2, i));
    else out.push(sc(`${a} × ${b} = ?`, [String(r), String(r + 1), String(r - 1)], 0, 'medium', 2, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = baseA + i * 27;
    const b = (i % 6) + 4;
    const r = a * b;
    if (i === 5) out.push(mc(`Tích nào lớn hơn ${r}?`, [`${a + 1}×${b}`, `${a}×${b - 1}`, `${a + 10}×${b}`], [0, 2], 'hard', 3, i));
    else if (i === 8) out.push(dd(`Sắp xếp tăng: ${a}×2, ${a}×5, ${a}×3`, [`${a}×2`, `${a}×5`, `${a}×3`], [0, 2, 1], 'hard', 3, i));
    else out.push(sc(`${a} × ${b} = ?`, [String(r), String(r + b), String(r - b)], 0, 'hard', 3, i));
  }
  return out;
}

// Chia số có k chữ số cho 1 chữ số
function chiaKChuSo(k: number): QuizSeed[] {
  const out: QuizSeed[] = [];
  const baseQ = Math.pow(10, k - 1) / 10 + 5;
  for (let i = 1; i <= 10; i++) {
    const b = (i % 7) + 2;
    const q = Math.floor(baseQ) + i * 3;
    const a = b * q;
    out.push(sc(`${a} : ${b} = ?`, [String(q), String(q + 1), String(q - 1)], 0, 'easy', 1, i));
  }
  for (let i = 1; i <= 10; i++) {
    const b = (i % 6) + 3;
    const q = Math.floor(baseQ) + i * 7;
    const a = b * q;
    if (i % 3 === 0) out.push(tf(`${a} : ${b} = ${q}. Đúng hay sai?`, true, 'medium', 2, i));
    else out.push(sc(`${a} : ${b} = ?`, [String(q), String(q + 1), String(q - 1)], 0, 'medium', 2, i));
  }
  for (let i = 1; i <= 10; i++) {
    const b = (i % 5) + 4;
    const q = Math.floor(baseQ) + i * 11;
    const a = b * q;
    if (i === 4) out.push(dd(`Sắp thương tăng: ${a}:${b}, ${a + b}:${b}, ${a - b}:${b}`, [`${a}:${b}`, `${a + b}:${b}`, `${a - b}:${b}`], [2, 0, 1], 'hard', 3, i));
    else if (i === 9) out.push(mc(`Số nào chia hết cho ${b}?`, [String(a), String(a + 1), String(a + b)], [0, 2], 'hard', 3, i));
    else out.push(sc(`${a} : ${b} = ?`, [String(q), String(q + 1), String(q - 1)], 0, 'hard', 3, i));
  }
  return out;
}

// Số/so sánh trong phạm vi N
function soSanhN(maxN: number): QuizSeed[] {
  const out: QuizSeed[] = [];
  const base = Math.floor(maxN / 10);
  for (let i = 1; i <= 10; i++) {
    const a = base * i + 13;
    const b = base * i + 27;
    out.push(sc(`So sánh: ${a} ... ${b}`, ['>', '<', '='], 1, 'easy', 1, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = base * 3 + i * 11;
    if (i === 3) out.push(tf(`Số ${a} bé hơn số ${a + 1}. Đúng hay sai?`, true, 'medium', 2, i));
    else if (i === 5) out.push(mc(`Số nào lớn hơn ${a}?`, [String(a - 1), String(a + 5), String(a + 10)], [1, 2], 'medium', 2, i));
    else if (i === 7) out.push(dd(`Sắp xếp tăng: ${a + 20}, ${a}, ${a + 10}`, [String(a + 20), String(a), String(a + 10)], [1, 2, 0], 'medium', 2, i));
    else out.push(sc(`Số liền sau của ${a} là?`, [String(a + 1), String(a - 1), String(a + 2)], 0, 'medium', 2, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = base * 5 + i * 17;
    if (i === 2) out.push(sc(`Số ${a + 100} hơn số ${a} bao nhiêu đơn vị?`, ['10', '100', '1000'], 1, 'hard', 3, i));
    else if (i === 6) out.push(mc(`Số nào nằm giữa ${a} và ${a + 10}?`, [String(a + 3), String(a + 7), String(a - 1)], [0, 1], 'hard', 3, i));
    else if (i === 9) out.push(dd(`Sắp giảm dần: ${a}, ${a + 5}, ${a + 2}`, [String(a), String(a + 5), String(a + 2)], [1, 2, 0], 'hard', 3, i));
    else out.push(sc(`Số liền trước của ${a} là?`, [String(a - 1), String(a + 1), String(a)], 0, 'hard', 3, i));
  }
  return out;
}

// Hình học cơ bản (dùng cho nhiều bài hình)
function hinhHoc(topic: string): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('Hình tam giác có mấy cạnh?', ['3', '4', '5'], 0, 'easy', 1, 1));
  out.push(sc('Hình vuông có mấy góc vuông?', ['2', '3', '4'], 2, 'easy', 1, 2));
  out.push(sc('Hình chữ nhật có mấy cạnh?', ['3', '4', '5'], 1, 'easy', 1, 3));
  out.push(tf('Hình tròn có tâm. Đúng hay sai?', true, 'easy', 1, 4));
  out.push(sc('Bán kính là gì?', ['Đoạn thẳng từ tâm đến đường tròn', 'Đoạn thẳng đi qua tâm', 'Đường kính'], 0, 'easy', 1, 5));
  out.push(tf('Đường kính bằng 2 lần bán kính. Đúng hay sai?', true, 'easy', 1, 6));
  out.push(sc('Khối lập phương có mấy mặt?', ['4', '6', '8'], 1, 'easy', 1, 7));
  out.push(sc('Khối hộp chữ nhật có mấy đỉnh?', ['4', '6', '8'], 2, 'easy', 1, 8));
  out.push(tf('Hình vuông là hình chữ nhật đặc biệt. Đúng hay sai?', true, 'easy', 1, 9));
  out.push(sc('Hình tứ giác có mấy đỉnh?', ['3', '4', '5'], 1, 'easy', 1, 10));
  out.push(sc('Bán kính 4 cm, đường kính bằng?', ['6', '8', '10'], 1, 'medium', 2, 1));
  out.push(sc('Đường kính 12 cm, bán kính?', ['4', '6', '8'], 1, 'medium', 2, 2));
  out.push(tf('Góc vuông bằng 90°. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Hình nào có 4 góc vuông?', ['Hình vuông', 'Hình tam giác', 'Hình chữ nhật'], [0, 2], 'medium', 2, 4));
  out.push(sc('Khối lập phương có mấy cạnh?', ['8', '10', '12'], 2, 'medium', 2, 5));
  out.push(mt('Nối hình với số cạnh', ['Tam giác', 'Tứ giác', 'Ngũ giác'], ['3', '4', '5'], 'medium', 2, 6));
  out.push(tf('Trung điểm chia đoạn thẳng thành 2 phần bằng nhau. Đúng hay sai?', true, 'medium', 2, 7));
  out.push(sc('Đoạn AB = 10 cm, trung điểm M cách A bao nhiêu cm?', ['3', '5', '7'], 1, 'medium', 2, 8));
  out.push(dd('Sắp xếp theo số cạnh: Tứ giác, Tam giác, Lục giác', ['Tứ giác', 'Tam giác', 'Lục giác'], [1, 0, 2], 'medium', 2, 9));
  out.push(sc('Tâm hình tròn là?', ['Điểm bất kỳ trên đường tròn', 'Điểm cách đều mọi điểm trên đường tròn', 'Bán kính'], 1, 'medium', 2, 10));
  out.push(sc('Hình vuông cạnh 5 cm. Chu vi?', ['10', '15', '20'], 2, 'hard', 3, 1, '5×4=20.'));
  out.push(sc('Hình chữ nhật 6×4. Chu vi?', ['18', '20', '24'], 1, 'hard', 3, 2, '(6+4)×2=20.'));
  out.push(sc('Hình vuông cạnh 4 cm. Diện tích?', ['8', '12', '16'], 2, 'hard', 3, 3, '4×4=16.'));
  out.push(sc('HCN 7×3 cm. Diện tích?', ['10', '21', '14'], 1, 'hard', 3, 4));
  out.push(mc('Hình nào có thể có 4 góc vuông?', ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác'], [0, 1], 'hard', 3, 5));
  out.push(tf('Hai đường kính của một hình tròn luôn bằng nhau. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('Số mặt của khối hộp chữ nhật?', ['4', '6', '8'], 1, 'hard', 3, 7));
  out.push(dd('Sắp diện tích tăng: HV cạnh 3, HV cạnh 5, HV cạnh 4', ['HV cạnh 3', 'HV cạnh 5', 'HV cạnh 4'], [0, 2, 1], 'hard', 3, 8));
  out.push(mt('Nối hình khối với số đỉnh', ['Lập phương', 'Hộp chữ nhật', 'Tứ diện'], ['8', '8', '4'], 'hard', 3, 9));
  out.push(tf('Chu vi hình vuông = cạnh × 4. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Đo lường (mm, g, ml, °C)
function doLuong(unit: string): QuizSeed[] {
  const out: QuizSeed[] = [];
  if (unit === 'mm') {
    out.push(sc('1 cm = ? mm', ['1', '10', '100'], 1, 'easy', 1, 1));
    out.push(sc('1 m = ? mm', ['100', '1000', '10000'], 1, 'easy', 1, 2));
    out.push(sc('20 mm = ? cm', ['2', '20', '200'], 0, 'easy', 1, 3));
    out.push(sc('5 cm = ? mm', ['5', '50', '500'], 1, 'easy', 1, 4));
    out.push(tf('mm là đơn vị đo độ dài. Đúng hay sai?', true, 'easy', 1, 5));
    out.push(sc('1 dm = ? mm', ['10', '100', '1000'], 1, 'easy', 1, 6));
    out.push(sc('Bút chì dài khoảng?', ['15 mm', '15 cm', '15 m'], 1, 'easy', 1, 7));
    out.push(tf('1 cm = 10 mm. Đúng hay sai?', true, 'easy', 1, 8));
    out.push(sc('3 cm 4 mm = ? mm', ['7', '34', '304'], 1, 'easy', 1, 9));
    out.push(sc('Đơn vị nhỏ nhất trong các đơn vị đã học?', ['m', 'cm', 'mm'], 2, 'easy', 1, 10));
    out.push(sc('45 mm = ? cm ? mm', ['4cm 5mm', '5cm 4mm', '40cm 5mm'], 0, 'medium', 2, 1));
    out.push(sc('2 cm 5 mm + 1 cm 3 mm = ?', ['3cm 8mm', '3cm 2mm', '4cm 8mm'], 0, 'medium', 2, 2));
    out.push(tf('100 mm = 10 cm. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Đơn vị nào lớn hơn mm?', ['cm', 'm', 'km'], [0, 1, 2], 'medium', 2, 4));
    out.push(dd('Sắp tăng: 5mm, 5cm, 5m', ['5mm', '5cm', '5m'], [0, 1, 2], 'medium', 2, 5));
    out.push(sc('Đường thẳng 8 cm 5 mm dài bằng?', ['85 mm', '850 mm', '805 mm'], 0, 'medium', 2, 6));
    out.push(sc('1 m = ? cm', ['10', '100', '1000'], 1, 'medium', 2, 7));
    out.push(tf('mm dài hơn cm. Đúng hay sai?', false, 'medium', 2, 8));
    out.push(sc('30 mm + 20 mm = ? cm', ['3', '5', '50'], 1, 'medium', 2, 9));
    out.push(mt('Nối', ['1cm', '1dm', '1m'], ['10mm', '100mm', '1000mm'], 'medium', 2, 10));
    out.push(sc('1 m 5 cm = ? mm', ['105', '1050', '15'], 1, 'hard', 3, 1));
    out.push(sc('5 cm - 12 mm = ? mm', ['38', '48', '50'], 0, 'hard', 3, 2));
    out.push(sc('AB = 7 cm 6 mm. Chuyển ra mm?', ['76', '706', '760'], 0, 'hard', 3, 3));
    out.push(mc('Đo độ dài nào phù hợp dùng mm?', ['Bề dày sách', 'Chiều rộng móng tay', 'Chiều dài lớp học'], [0, 1], 'hard', 3, 4));
    out.push(dd('Sắp giảm dần: 50mm, 5cm, 5m, 5dm', ['50mm', '5cm', '5m', '5dm'], [2, 3, 0, 1], 'hard', 3, 5, '5m > 5dm > 50mm = 5cm.'));
    out.push(tf('1 m = 100 cm = 1000 mm. Đúng hay sai?', true, 'hard', 3, 6));
    out.push(sc('5 dm 4 cm 3 mm = ? mm', ['543', '534', '453'], 0, 'hard', 3, 7));
    out.push(sc('Một đoạn dây 1m, cắt đi 25 cm thì còn ? cm', ['65', '75', '85'], 1, 'hard', 3, 8));
    out.push(mt('Nối đơn vị thích hợp', ['Hạt đậu', 'Cái bút', 'Sân trường'], ['mm', 'cm', 'm'], 'hard', 3, 9));
    out.push(tf('mm là đơn vị đo nhỏ hơn cm. Đúng hay sai?', true, 'hard', 3, 10));
  } else if (unit === 'g') {
    out.push(sc('1 kg = ? g', ['100', '1000', '10000'], 1, 'easy', 1, 1));
    out.push(sc('2000 g = ? kg', ['2', '20', '200'], 0, 'easy', 1, 2));
    out.push(sc('500 g + 500 g = ? kg', ['1', '5', '10'], 0, 'easy', 1, 3));
    out.push(tf('g là đơn vị đo khối lượng. Đúng hay sai?', true, 'easy', 1, 4));
    out.push(sc('3 kg = ? g', ['300', '3000', '30000'], 1, 'easy', 1, 5));
    out.push(sc('100 g + 200 g = ?', ['200 g', '300 g', '400 g'], 1, 'easy', 1, 6));
    out.push(tf('1 kg nặng hơn 1 g. Đúng hay sai?', true, 'easy', 1, 7));
    out.push(sc('Một quả táo nặng khoảng?', ['200 g', '20 g', '2 g'], 0, 'easy', 1, 8));
    out.push(sc('5 kg = ? g', ['50', '500', '5000'], 2, 'easy', 1, 9));
    out.push(sc('Đơn vị đo khối lượng nhỏ hơn kg?', ['m', 'g', 'lít'], 1, 'easy', 1, 10));
    out.push(sc('1 kg 200 g = ? g', ['120', '1200', '12000'], 1, 'medium', 2, 1));
    out.push(sc('800 g + 200 g = ? kg', ['1', '2', '10'], 0, 'medium', 2, 2));
    out.push(tf('1500 g > 1 kg. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Mặt hàng nào thường tính bằng kg?', ['Gạo', 'Vàng', 'Thịt'], [0, 2], 'medium', 2, 4));
    out.push(dd('Sắp tăng: 300g, 1kg, 500g', ['300g', '1kg', '500g'], [0, 2, 1], 'medium', 2, 5));
    out.push(sc('2 kg - 500 g = ? g', ['1000', '1500', '2500'], 1, 'medium', 2, 6));
    out.push(sc('3000 g = ? kg', ['3', '30', '300'], 0, 'medium', 2, 7));
    out.push(tf('1 g bằng 1000 kg. Đúng hay sai?', false, 'medium', 2, 8));
    out.push(sc('Đổi 4 kg 50 g sang g?', ['450', '4050', '4500'], 1, 'medium', 2, 9));
    out.push(mt('Nối khối lượng phù hợp', ['Hạt cát', 'Quả táo', 'Bao gạo'], ['g', 'g', 'kg'], 'medium', 2, 10));
    out.push(sc('Mẹ mua 2kg cam và 500g nhãn. Tổng?', ['2 kg 500 g', '2500 g', 'Cả hai đúng'], 2, 'hard', 3, 1));
    out.push(sc('5 kg - 1 kg 200 g = ? g', ['3800', '4800', '3200'], 0, 'hard', 3, 2));
    out.push(sc('250 g × 4 = ? g', ['100', '1000', '10000'], 1, 'hard', 3, 3));
    out.push(mc('Số nào lớn hơn 1500 g?', ['1 kg', '2 kg', '1 kg 800 g'], [1, 2], 'hard', 3, 4));
    out.push(dd('Sắp giảm: 1kg, 500g, 2kg, 100g', ['1kg', '500g', '2kg', '100g'], [2, 0, 1, 3], 'hard', 3, 5));
    out.push(tf('500 g + 500 g = 1 kg. Đúng hay sai?', true, 'hard', 3, 6));
    out.push(sc('Chia đều 1 kg gạo cho 4 phần?', ['200 g', '250 g', '300 g'], 1, 'hard', 3, 7));
    out.push(sc('1 kg 50 g + 950 g = ?', ['2 kg', '1 kg', '3 kg'], 0, 'hard', 3, 8));
    out.push(mt('Nối', ['1 kg', '2500 g', '4000 g'], ['1000 g', '2 kg 500 g', '4 kg'], 'hard', 3, 9));
    out.push(tf('Có thể dùng cân để đo khối lượng. Đúng hay sai?', true, 'hard', 3, 10));
  } else if (unit === 'ml') {
    out.push(sc('1 lít = ? ml', ['100', '1000', '10000'], 1, 'easy', 1, 1));
    out.push(sc('500 ml + 500 ml = ? lít', ['1', '2', '5'], 0, 'easy', 1, 2));
    out.push(sc('2 lít = ? ml', ['200', '2000', '20000'], 1, 'easy', 1, 3));
    out.push(tf('ml là đơn vị đo dung tích. Đúng hay sai?', true, 'easy', 1, 4));
    out.push(sc('1000 ml = ?', ['1 lít', '10 lít', '100 lít'], 0, 'easy', 1, 5));
    out.push(sc('Ly nước thường có dung tích?', ['250 ml', '25 ml', '2500 ml'], 0, 'easy', 1, 6));
    out.push(tf('1 lít nhiều hơn 1 ml. Đúng hay sai?', true, 'easy', 1, 7));
    out.push(sc('Đơn vị đo dung tích nhỏ hơn lít?', ['mm', 'ml', 'g'], 1, 'easy', 1, 8));
    out.push(sc('3 lít = ? ml', ['300', '3000', '30000'], 1, 'easy', 1, 9));
    out.push(sc('200 ml + 800 ml = ?', ['1 lít', '10 lít', '100 ml'], 0, 'easy', 1, 10));
    out.push(sc('1 lít 200 ml = ? ml', ['120', '1200', '12000'], 1, 'medium', 2, 1));
    out.push(sc('2500 ml = ? lít ? ml', ['2l 500ml', '25l', '250l'], 0, 'medium', 2, 2));
    out.push(tf('1500 ml > 1 lít. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Vật nào đong bằng ml?', ['Nước hoa quả', 'Thuốc', 'Bao gạo'], [0, 1], 'medium', 2, 4));
    out.push(dd('Sắp tăng: 200ml, 1l, 500ml', ['200ml', '1l', '500ml'], [0, 2, 1], 'medium', 2, 5));
    out.push(sc('2 lít - 500 ml = ? ml', ['1000', '1500', '2500'], 1, 'medium', 2, 6));
    out.push(sc('3000 ml = ? lít', ['3', '30', '300'], 0, 'medium', 2, 7));
    out.push(tf('1 ml lớn hơn 1 lít. Đúng hay sai?', false, 'medium', 2, 8));
    out.push(sc('4 lít 50 ml = ? ml', ['450', '4050', '4500'], 1, 'medium', 2, 9));
    out.push(mt('Nối lượng nước phù hợp', ['Một ly', 'Một chai', 'Một bể'], ['ml', 'ml', 'lít'], 'medium', 2, 10));
    out.push(sc('5 lít - 1 lít 200 ml = ? ml', ['3800', '4800', '3200'], 0, 'hard', 3, 1));
    out.push(sc('250 ml × 4 = ? ml', ['100', '1000', '10000'], 1, 'hard', 3, 2));
    out.push(mc('Số nào lớn hơn 1500 ml?', ['1 lít', '2 lít', '1 lít 800 ml'], [1, 2], 'hard', 3, 3));
    out.push(dd('Sắp giảm: 1l, 500ml, 2l, 100ml', ['1l', '500ml', '2l', '100ml'], [2, 0, 1, 3], 'hard', 3, 4));
    out.push(tf('500 ml + 500 ml = 1 lít. Đúng hay sai?', true, 'hard', 3, 5));
    out.push(sc('Chia đều 1 lít cho 4 ly?', ['200 ml', '250 ml', '300 ml'], 1, 'hard', 3, 6));
    out.push(sc('1 lít 50 ml + 950 ml = ?', ['2 lít', '1 lít', '3 lít'], 0, 'hard', 3, 7));
    out.push(mt('Nối', ['1 lít', '2500 ml', '4000 ml'], ['1000 ml', '2 lít 500 ml', '4 lít'], 'hard', 3, 8));
    out.push(tf('Có thể dùng ca, chai để đong dung tích. Đúng hay sai?', true, 'hard', 3, 9));
    out.push(sc('1 lít gấp mấy lần 100 ml?', ['5', '10', '100'], 1, 'hard', 3, 10));
  } else { // độ C
    out.push(sc('Nước đá tan ở nhiệt độ?', ['0°C', '10°C', '100°C'], 0, 'easy', 1, 1));
    out.push(sc('Nước sôi ở nhiệt độ?', ['50°C', '100°C', '0°C'], 1, 'easy', 1, 2));
    out.push(sc('Đơn vị đo nhiệt độ là?', ['°C', 'm', 'kg'], 0, 'easy', 1, 3));
    out.push(tf('Nhiệt độ cơ thể bình thường là 37°C. Đúng hay sai?', true, 'easy', 1, 4));
    out.push(sc('Dụng cụ đo nhiệt độ?', ['Cân', 'Nhiệt kế', 'Thước'], 1, 'easy', 1, 5));
    out.push(sc('Mùa đông lạnh hơn, nhiệt độ?', ['Thấp hơn', 'Cao hơn', 'Bằng nhau'], 0, 'easy', 1, 6));
    out.push(tf('100°C nóng hơn 50°C. Đúng hay sai?', true, 'easy', 1, 7));
    out.push(sc('Mùa hè ở Việt Nam thường khoảng?', ['30-35°C', '0-10°C', '100°C'], 0, 'easy', 1, 8));
    out.push(sc('Nhiệt độ trong tủ lạnh thường?', ['Dưới 10°C', '50°C', '100°C'], 0, 'easy', 1, 9));
    out.push(sc('Số trên nhiệt kế ghi đơn vị?', ['kg', '°C', 'cm'], 1, 'easy', 1, 10));
    out.push(sc('Buổi sáng 24°C, buổi trưa 32°C. Tăng?', ['6°C', '8°C', '10°C'], 1, 'medium', 2, 1));
    out.push(sc('Hà Nội 18°C, Sa Pa 5°C. Chênh lệch?', ['10°C', '13°C', '15°C'], 1, 'medium', 2, 2));
    out.push(tf('Băng tuyết xuất hiện khi nhiệt độ dưới 0°C. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Nhiệt độ nào ấm áp?', ['25°C', '5°C', '30°C'], [0, 2], 'medium', 2, 4));
    out.push(dd('Sắp tăng: 0°C, 25°C, 100°C, -5°C', ['0°C', '25°C', '100°C', '-5°C'], [3, 0, 1, 2], 'medium', 2, 5));
    out.push(sc('Bé sốt 39°C, hạ xuống 37°C. Giảm?', ['1°C', '2°C', '3°C'], 1, 'medium', 2, 6));
    out.push(sc('Nhiệt độ nào cao nhất?', ['25°C', '37°C', '15°C'], 1, 'medium', 2, 7));
    out.push(tf('0°C nóng hơn 10°C. Đúng hay sai?', false, 'medium', 2, 8));
    out.push(sc('Đo nhiệt độ phòng dùng?', ['Nhiệt kế phòng', 'Nhiệt kế y tế', 'Cân'], 0, 'medium', 2, 9));
    out.push(mt('Nối', ['Tủ đông', 'Phòng', 'Lò nướng'], ['-15°C', '25°C', '180°C'], 'medium', 2, 10));
    out.push(sc('Trong ngày: sáng 22°C, trưa 30°C, chiều 28°C. Cao nhất?', ['22°C', '28°C', '30°C'], 2, 'hard', 3, 1));
    out.push(sc('Nếu sáng 20°C và mỗi giờ tăng 2°C thì sau 4 giờ là?', ['24°C', '26°C', '28°C'], 2, 'hard', 3, 2));
    out.push(mc('Nhiệt độ nào tạo ra nước ở thể lỏng?', ['10°C', '50°C', '-5°C'], [0, 1], 'hard', 3, 3));
    out.push(dd('Sắp giảm: 38°C, 5°C, 100°C, 0°C', ['38°C', '5°C', '100°C', '0°C'], [2, 0, 1, 3], 'hard', 3, 4));
    out.push(tf('Nhiệt độ càng lớn thì càng nóng. Đúng hay sai?', true, 'hard', 3, 5));
    out.push(sc('Sốt 39°C cao hơn bình thường mấy độ?', ['1', '2', '3'], 1, 'hard', 3, 6, 'Bình thường 37°C.'));
    out.push(sc('Sa Pa 8°C, Hà Nội 22°C. Chênh lệch?', ['12°C', '14°C', '16°C'], 1, 'hard', 3, 7));
    out.push(mc('Nhiệt độ dưới 0°C có thể gây?', ['Nước đông đá', 'Tuyết rơi', 'Nước sôi'], [0, 1], 'hard', 3, 8));
    out.push(mt('Nối', ['Đá', 'Nước thường', 'Nước sôi'], ['0°C', '20°C', '100°C'], 'hard', 3, 9));
    out.push(tf('Nhiệt kế đo nhiệt độ. Đúng hay sai?', true, 'hard', 3, 10));
  }
  return out;
}

// Mixed: cho luyện tập chung / ôn tập (trộn 5 dạng)
function mixed(label: string): QuizSeed[] {
  const out: QuizSeed[] = [];
  // easy
  out.push(sc('5 × 3 = ?', ['12', '15', '18'], 1, 'easy', 1, 1));
  out.push(sc('21 : 7 = ?', ['2', '3', '4'], 1, 'easy', 1, 2));
  out.push(sc('245 + 130 = ?', ['365', '375', '385'], 1, 'easy', 1, 3));
  out.push(sc('Hình vuông có mấy cạnh bằng nhau?', ['2', '3', '4'], 2, 'easy', 1, 4));
  out.push(tf('1 kg = 1000 g. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(sc('1 giờ = ? phút', ['30', '60', '100'], 1, 'easy', 1, 6));
  out.push(mc('Số chia hết cho 5?', ['10', '12', '25'], [0, 2], 'easy', 1, 7));
  out.push(tf('6 × 4 = 24. Đúng hay sai?', true, 'easy', 1, 8));
  out.push(sc('Số liền sau 99 là?', ['98', '100', '101'], 1, 'easy', 1, 9));
  out.push(sc('1 lít = ? ml', ['100', '1000', '10000'], 1, 'easy', 1, 10));
  // medium
  out.push(sc('Có 24 cái kẹo chia đều cho 6 bạn, mỗi bạn được?', ['3', '4', '5'], 1, 'medium', 2, 1));
  out.push(sc('Một hình chữ nhật 5×4. Diện tích?', ['9', '20', '14'], 1, 'medium', 2, 2));
  out.push(dd('Sắp xếp tăng: 345, 354, 453', ['345', '354', '453'], [0, 1, 2], 'medium', 2, 3));
  out.push(tf('Số có 4 chữ số nhỏ nhất là 1000. Đúng hay sai?', true, 'medium', 2, 4));
  out.push(mc('Chữ số La Mã?', ['I', '5', 'V'], [0, 2], 'medium', 2, 5));
  out.push(sc('7 × 8 + 7 = ?', ['56', '63', '70'], 1, 'medium', 2, 6));
  out.push(sc('Gấp 5 lên 4 lần được?', ['9', '20', '25'], 1, 'medium', 2, 7));
  out.push(mt('Nối', ['1 giờ', '1 phút', '1 ngày'], ['60 phút', '60 giây', '24 giờ'], 'medium', 2, 8));
  out.push(sc('Một phần ba của 12 là?', ['3', '4', '6'], 1, 'medium', 2, 9));
  out.push(tf('Hình tròn có đường kính dài gấp đôi bán kính. Đúng hay sai?', true, 'medium', 2, 10));
  // hard
  out.push(sc('Tìm x: x : 6 = 7', ['36', '42', '48'], 1, 'hard', 3, 1));
  out.push(sc('123 × 4 = ?', ['492', '482', '472'], 0, 'hard', 3, 2));
  out.push(sc('500 - 245 = ?', ['255', '265', '275'], 0, 'hard', 3, 3));
  out.push(mc('Số chia hết cho 9?', ['18', '25', '27'], [0, 2], 'hard', 3, 4));
  out.push(dd('Sắp giảm: 2546, 2645, 2456', ['2546', '2645', '2456'], [1, 0, 2], 'hard', 3, 5));
  out.push(sc('Hình chữ nhật dài 8 cm, rộng 5 cm. Chu vi?', ['26 cm', '40 cm', '13 cm'], 0, 'hard', 3, 6, '(8+5)×2=26.'));
  out.push(tf('Hai số liền nhau hơn kém nhau 1. Đúng hay sai?', true, 'hard', 3, 7));
  out.push(sc('Bài toán hai bước: Có 24 quả táo, ăn 6 quả, còn lại chia đều cho 3. Mỗi phần?', ['5', '6', '7'], 1, 'hard', 3, 8, '(24-6):3=6.'));
  out.push(mt('Nối', ['VI', 'IX', 'XII'], ['6', '9', '12'], 'hard', 3, 9));
  out.push(sc('5 km = ? m', ['500', '5000', '50000'], 1, 'hard', 3, 10));
  return out;
}

// Thời gian - lịch - tiền
function thoiGianLich(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('1 tuần có mấy ngày?', ['5', '6', '7'], 2, 'easy', 1, 1));
  out.push(sc('1 năm có bao nhiêu tháng?', ['10', '11', '12'], 2, 'easy', 1, 2));
  out.push(sc('1 giờ = ? phút', ['30', '60', '100'], 1, 'easy', 1, 3));
  out.push(sc('Tháng 2 có nhiều nhất bao nhiêu ngày?', ['28', '29', '30'], 1, 'easy', 1, 4));
  out.push(tf('Một ngày có 24 giờ. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(sc('Tháng nào có 31 ngày?', ['Tháng 4', 'Tháng 7', 'Tháng 6'], 1, 'easy', 1, 6));
  out.push(sc('1 phút = ? giây', ['30', '60', '100'], 1, 'easy', 1, 7));
  out.push(tf('Tháng 6 có 30 ngày. Đúng hay sai?', true, 'easy', 1, 8));
  out.push(sc('Cuối tuần là?', ['Thứ 2', 'Thứ 7 và CN', 'Thứ 4'], 1, 'easy', 1, 9));
  out.push(sc('Học sinh nghỉ học vào?', ['Thứ 2', 'Chủ nhật', 'Thứ 6'], 1, 'easy', 1, 10));
  out.push(sc('3 giờ chiều là?', ['13 giờ', '15 giờ', '17 giờ'], 1, 'medium', 2, 1));
  out.push(sc('Từ 7:00 đến 9:00 là?', ['1 giờ', '2 giờ', '3 giờ'], 1, 'medium', 2, 2));
  out.push(tf('1 năm có 365 hoặc 366 ngày. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Tháng nào có 30 ngày?', ['4', '5', '9'], [0, 2], 'medium', 2, 4));
  out.push(dd('Sắp xếp các tháng: Tháng 5, Tháng 3, Tháng 8', ['Tháng 5', 'Tháng 3', 'Tháng 8'], [1, 0, 2], 'medium', 2, 5));
  out.push(sc('1 giờ 30 phút = ? phút', ['60', '90', '120'], 1, 'medium', 2, 6));
  out.push(sc('Bé học lúc 7:00, tan lúc 11:00. Tổng?', ['3 giờ', '4 giờ', '5 giờ'], 1, 'medium', 2, 7));
  out.push(tf('Tháng 2 có 28 hoặc 29 ngày. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(mt('Nối', ['1 giờ', '1 phút', '1 ngày'], ['60 phút', '60 giây', '24 giờ'], 'medium', 2, 9));
  out.push(sc('Tháng nào của mùa hè?', ['Tháng 1', 'Tháng 6', 'Tháng 12'], 1, 'medium', 2, 10));
  out.push(sc('Từ thứ 2 đến thứ 5 là mấy ngày?', ['3', '4', '5'], 0, 'hard', 3, 1));
  out.push(sc('5:45 + 30 phút = ?', ['6:15', '6:25', '6:35'], 0, 'hard', 3, 2));
  out.push(sc('1 năm có 52 tuần và mấy ngày dư?', ['0', '1', '2'], 1, 'hard', 3, 3, '52×7=364, dư 1 ngày.'));
  out.push(mc('Tháng có 31 ngày?', ['1', '6', '7'], [0, 2], 'hard', 3, 4));
  out.push(dd('Sắp xếp: 8:00, 7:30, 9:15', ['8:00', '7:30', '9:15'], [1, 0, 2], 'hard', 3, 5));
  out.push(tf('Năm nhuận có 366 ngày. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('100 phút = ? giờ ? phút', ['1g 40p', '2g 40p', '1g 60p'], 0, 'hard', 3, 7));
  out.push(sc('Phim chiếu 1 giờ 45 phút, bắt đầu 19:00. Kết thúc?', ['20:35', '20:45', '21:00'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['Mùa xuân', 'Mùa hạ', 'Mùa đông'], ['T1-3', 'T6-8', 'T11-1'], 'hard', 3, 9));
  out.push(tf('Tháng 9 có 30 ngày. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

function tienViet(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('Tờ tiền nào có mệnh giá lớn nhất ở VN hiện nay?', ['200.000đ', '500.000đ', '1.000.000đ'], 1, 'easy', 1, 1));
  out.push(sc('Đơn vị tiền tệ Việt Nam là?', ['Đô la', 'Đồng', 'Yên'], 1, 'easy', 1, 2));
  out.push(sc('10.000đ + 5.000đ = ?', ['12.000', '15.000', '20.000'], 1, 'easy', 1, 3));
  out.push(tf('1.000đ + 2.000đ = 3.000đ. Đúng hay sai?', true, 'easy', 1, 4));
  out.push(sc('Đổi 50.000đ ra tờ 10.000đ được?', ['3 tờ', '5 tờ', '10 tờ'], 1, 'easy', 1, 5));
  out.push(sc('1 tờ 20.000đ + 1 tờ 50.000đ = ?', ['60.000', '70.000', '80.000'], 1, 'easy', 1, 6));
  out.push(tf('100.000đ lớn hơn 50.000đ. Đúng hay sai?', true, 'easy', 1, 7));
  out.push(sc('Mua kẹo 5.000đ, đưa 10.000đ, được trả?', ['3.000', '5.000', '15.000'], 1, 'easy', 1, 8));
  out.push(sc('5 tờ 10.000đ = ?', ['10.000', '50.000', '100.000'], 1, 'easy', 1, 9));
  out.push(sc('Có 100.000đ, mua 30.000đ, còn?', ['60.000', '70.000', '80.000'], 1, 'easy', 1, 10));
  out.push(sc('Mua 3 cái bánh, mỗi cái 5.000đ. Tổng?', ['10.000', '15.000', '20.000'], 1, 'medium', 2, 1));
  out.push(sc('Có 50.000đ, mua sách 35.000đ. Còn?', ['10.000', '15.000', '20.000'], 1, 'medium', 2, 2));
  out.push(tf('500.000đ = 5 tờ 100.000đ. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Tổng tiền 100.000đ?', ['1 tờ 100k', '2 tờ 50k', '10 tờ 10k'], [0, 1, 2], 'medium', 2, 4));
  out.push(dd('Sắp tăng: 20.000, 5.000, 50.000', ['20.000', '5.000', '50.000'], [1, 0, 2], 'medium', 2, 5));
  out.push(sc('Mẹ có 200.000đ, cho con 50.000đ. Mẹ còn?', ['100.000', '150.000', '200.000'], 1, 'medium', 2, 6));
  out.push(sc('4 tờ 50.000đ = ?', ['100.000', '200.000', '400.000'], 1, 'medium', 2, 7));
  out.push(tf('1 tờ 200.000đ đổi được 2 tờ 100.000đ. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(mt('Nối', ['10.000đ', '50.000đ', '100.000đ'], ['mười nghìn', 'năm mươi nghìn', 'một trăm nghìn'], 'medium', 2, 9));
  out.push(sc('Tiền Việt Nam viết tắt là?', ['USD', 'VND', 'JPY'], 1, 'medium', 2, 10));
  out.push(sc('Mua 2 hộp sữa 18.000đ/hộp. Tổng?', ['30.000', '36.000', '42.000'], 1, 'hard', 3, 1));
  out.push(sc('Có 500.000đ. Mua 3 món hàng 120.000, 80.000, 150.000. Còn?', ['100.000', '150.000', '200.000'], 1, 'hard', 3, 2));
  out.push(sc('Đổi 1.000.000đ ra tờ 100.000đ được mấy tờ?', ['5', '10', '100'], 1, 'hard', 3, 3));
  out.push(mc('Tổng 250.000đ?', ['1 tờ 200k + 1 tờ 50k', '2 tờ 100k + 1 tờ 50k', '5 tờ 50k'], [0, 1, 2], 'hard', 3, 4));
  out.push(dd('Sắp giảm: 500k, 100k, 200k, 50k', ['500k', '100k', '200k', '50k'], [0, 2, 1, 3], 'hard', 3, 5));
  out.push(tf('Đồng là đơn vị tiền tệ chính thức của Việt Nam. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('Mua 5 kg gạo 15.000đ/kg, trả 100.000đ. Thừa?', ['15.000', '20.000', '25.000'], 2, 'hard', 3, 7));
  out.push(sc('1 tuần được mẹ cho 50.000đ. 4 tuần được?', ['100.000', '200.000', '400.000'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['Bút 5k', 'Sách 30k', 'Cặp 250k'], ['rẻ nhất', 'vừa', 'đắt nhất'], 'hard', 3, 9));
  out.push(tf('Trả tiền khi mua hàng giúp công bằng. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Biểu thức / tính giá trị
function bieuThuc(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('2 + 3 × 4 = ?', ['14', '20', '24'], 0, 'easy', 1, 1, 'Nhân trước, cộng sau: 2 + 12 = 14.'));
  out.push(sc('(2 + 3) × 4 = ?', ['14', '20', '24'], 1, 'easy', 1, 2));
  out.push(sc('10 - 2 × 3 = ?', ['4', '24', '6'], 0, 'easy', 1, 3));
  out.push(sc('6 + 4 : 2 = ?', ['5', '8', '10'], 1, 'easy', 1, 4));
  out.push(tf('Trong biểu thức có dấu ngoặc, ta thực hiện trong ngoặc trước. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(sc('5 × 2 + 3 = ?', ['10', '13', '15'], 1, 'easy', 1, 6));
  out.push(sc('20 : 4 + 5 = ?', ['10', '15', '25'], 0, 'easy', 1, 7));
  out.push(tf('Nhân chia thực hiện trước cộng trừ. Đúng hay sai?', true, 'easy', 1, 8));
  out.push(sc('(8 - 2) × 3 = ?', ['18', '24', '20'], 0, 'easy', 1, 9));
  out.push(sc('3 + 4 + 5 = ?', ['10', '11', '12'], 2, 'easy', 1, 10));
  out.push(sc('15 - 4 × 2 + 1 = ?', ['7', '8', '23'], 1, 'medium', 2, 1));
  out.push(sc('(10 + 6) : 2 = ?', ['8', '11', '16'], 0, 'medium', 2, 2));
  out.push(tf('5 + 2 × 3 = 21. Đúng hay sai?', false, 'medium', 2, 3, '5+6=11.'));
  out.push(mc('Biểu thức nào có giá trị 12?', ['3 × 4', '6 + 6', '2 + 5'], [0, 1], 'medium', 2, 4));
  out.push(dd('Sắp giá trị tăng: 2+3, 2×3, (2+3)×3', ['2+3', '2×3', '(2+3)×3'], [0, 1, 2], 'medium', 2, 5));
  out.push(sc('Giá trị 4 × (5 + 2) = ?', ['22', '28', '30'], 1, 'medium', 2, 6));
  out.push(sc('100 - 5 × 10 = ?', ['50', '90', '95'], 0, 'medium', 2, 7));
  out.push(tf('(3 + 5) × 2 = 16. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('36 : 4 + 2 = ?', ['9', '11', '13'], 1, 'medium', 2, 9));
  out.push(mt('Nối biểu thức và giá trị', ['2×3+4', '5×(2+3)', '20:4-1'], ['10', '25', '4'], 'medium', 2, 10));
  out.push(sc('(15 + 5) × 2 - 10 = ?', ['25', '30', '35'], 1, 'hard', 3, 1));
  out.push(sc('100 - (4 × 5 + 30) = ?', ['50', '60', '70'], 0, 'hard', 3, 2));
  out.push(sc('Tìm x: x × 4 + 5 = 25', ['4', '5', '6'], 1, 'hard', 3, 3));
  out.push(mc('Biểu thức nào lớn hơn 20?', ['5 × 5', '2 × (3 + 7)', '4 × 4'], [0, 1], 'hard', 3, 4));
  out.push(dd('Sắp tăng: 2×5, 3×4, 5×2, 4×3', ['2×5', '3×4', '5×2', '4×3'], [0, 2, 1, 3], 'hard', 3, 5, 'Tất cả bằng nhau, sắp tự do.'));
  out.push(tf('Phép nhân có tính chất kết hợp. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('48 : (4 + 2) = ?', ['6', '8', '12'], 1, 'hard', 3, 7));
  out.push(sc('(20 - 8) : 3 + 1 = ?', ['4', '5', '6'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['2 + 3 × 5', '(2 + 3) × 5', '20 - 3 × 4'], ['17', '25', '8'], 'hard', 3, 9));
  out.push(tf('Trong biểu thức không có ngoặc, nhân chia làm trước. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Chu vi - diện tích
function chuViDienTich(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('Chu vi hình vuông cạnh 5 cm = ?', ['10', '15', '20'], 2, 'easy', 1, 1));
  out.push(sc('Chu vi HCN dài 6, rộng 4 = ?', ['10', '20', '24'], 1, 'easy', 1, 2));
  out.push(sc('Diện tích HV cạnh 4 = ?', ['8', '12', '16'], 2, 'easy', 1, 3));
  out.push(sc('Diện tích HCN 5×3 = ?', ['8', '15', '20'], 1, 'easy', 1, 4));
  out.push(tf('Chu vi HV = cạnh × 4. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(tf('Đơn vị diện tích là cm². Đúng hay sai?', true, 'easy', 1, 6));
  out.push(sc('Chu vi tam giác đều cạnh 5 = ?', ['10', '15', '20'], 1, 'easy', 1, 7));
  out.push(sc('HV cạnh 7. Chu vi?', ['14', '21', '28'], 2, 'easy', 1, 8));
  out.push(sc('1 cm² là diện tích HV cạnh?', ['1 cm', '10 cm', '100 cm'], 0, 'easy', 1, 9));
  out.push(sc('Diện tích HV cạnh 6 = ?', ['12', '24', '36'], 2, 'easy', 1, 10));
  out.push(sc('Chu vi HCN dài 8 rộng 5?', ['13', '26', '40'], 1, 'medium', 2, 1));
  out.push(sc('Diện tích HCN 7×4?', ['11', '22', '28'], 2, 'medium', 2, 2));
  out.push(tf('Diện tích HV cạnh 5 là 25 cm². Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Chu vi nào bằng 24?', ['HV cạnh 6', 'HCN 10×2', 'HCN 8×4'], [0, 1], 'medium', 2, 4));
  out.push(dd('Sắp diện tích tăng: HV cạnh 3, HV cạnh 5, HV cạnh 4', ['HV cạnh 3', 'HV cạnh 5', 'HV cạnh 4'], [0, 2, 1], 'medium', 2, 5));
  out.push(sc('Chu vi tam giác 3 cạnh 4, 5, 6?', ['12', '15', '17'], 1, 'medium', 2, 6));
  out.push(sc('HV chu vi 36. Cạnh?', ['6', '9', '12'], 1, 'medium', 2, 7));
  out.push(tf('HV và HCN đều có 4 góc vuông. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('HCN dài 12, rộng 5. Diện tích?', ['17', '34', '60'], 2, 'medium', 2, 9));
  out.push(mt('Nối', ['HV cạnh 4', 'HCN 5×3', 'HV cạnh 6'], ['16', '15', '36'], 'medium', 2, 10));
  out.push(sc('HCN diện tích 24, dài 6. Rộng?', ['3', '4', '6'], 1, 'hard', 3, 1));
  out.push(sc('HV diện tích 49. Cạnh?', ['6', '7', '8'], 1, 'hard', 3, 2));
  out.push(sc('Sân 20m × 15m. Chu vi?', ['35', '70', '300'], 1, 'hard', 3, 3));
  out.push(mc('Diện tích nào lớn hơn 30 cm²?', ['HCN 8×5', 'HV cạnh 6', 'HV cạnh 5'], [0, 1], 'hard', 3, 4));
  out.push(dd('Sắp chu vi giảm: HV cạnh 4, HCN 6×3, HV cạnh 5', ['HV cạnh 4', 'HCN 6×3', 'HV cạnh 5'], [2, 1, 0], 'hard', 3, 5));
  out.push(tf('Nếu cạnh HV tăng gấp đôi thì diện tích tăng gấp 4. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('Khung tranh HV cạnh 50cm. Chu vi?', ['150', '200', '250'], 1, 'hard', 3, 7));
  out.push(sc('Phòng HCN 8m×6m. Diện tích?', ['28', '48', '14'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['HV cạnh 10', 'HCN 8×5', 'HV cạnh 6'], ['100', '40', '36'], 'hard', 3, 9));
  out.push(tf('Diện tích đo bằng cm². Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Chữ số La Mã
function laMa(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('Số La Mã I là?', ['1', '2', '5'], 0, 'easy', 1, 1));
  out.push(sc('Số La Mã V là?', ['4', '5', '6'], 1, 'easy', 1, 2));
  out.push(sc('Số La Mã X là?', ['5', '10', '15'], 1, 'easy', 1, 3));
  out.push(sc('III tương ứng số?', ['1', '2', '3'], 2, 'easy', 1, 4));
  out.push(sc('VI tương ứng số?', ['4', '5', '6'], 2, 'easy', 1, 5));
  out.push(sc('VII tương ứng số?', ['5', '7', '9'], 1, 'easy', 1, 6));
  out.push(sc('IX là số?', ['11', '9', '10'], 1, 'easy', 1, 7));
  out.push(sc('XII là số?', ['10', '11', '12'], 2, 'easy', 1, 8));
  out.push(tf('Chữ số La Mã không có số 0. Đúng hay sai?', true, 'easy', 1, 9));
  out.push(sc('Số La Mã trên đồng hồ?', ['1-12', '1-24', '1-60'], 0, 'easy', 1, 10));
  out.push(sc('IV là số?', ['4', '6', '9'], 0, 'medium', 2, 1));
  out.push(sc('VIII là số?', ['7', '8', '9'], 1, 'medium', 2, 2));
  out.push(sc('XI là số?', ['9', '10', '11'], 2, 'medium', 2, 3));
  out.push(mc('Số La Mã nào nhỏ hơn 7?', ['V', 'VIII', 'VI'], [0, 2], 'medium', 2, 4));
  out.push(dd('Sắp tăng: V, II, X, IX', ['V', 'II', 'X', 'IX'], [1, 0, 3, 2], 'medium', 2, 5));
  out.push(mt('Nối', ['I', 'V', 'X'], ['1', '5', '10'], 'medium', 2, 6));
  out.push(sc('VII + III = ? (kết quả Ả Rập)', ['8', '10', '11'], 1, 'medium', 2, 7));
  out.push(tf('V đứng trước X tạo nên IX. Đúng hay sai?', false, 'medium', 2, 8, 'IX là I trước X.'));
  out.push(sc('Đồng hồ chỉ số XII. Đó là?', ['6 giờ', '10 giờ', '12 giờ'], 2, 'medium', 2, 9));
  out.push(mt('Nối', ['IV', 'IX', 'XI'], ['4', '9', '11'], 'medium', 2, 10));
  out.push(sc('Số nào lớn nhất?', ['VII', 'IX', 'XII'], 2, 'hard', 3, 1));
  out.push(sc('XII - V = ? (Ả Rập)', ['5', '7', '8'], 1, 'hard', 3, 2));
  out.push(mc('Số nào bé hơn X?', ['VII', 'IX', 'XII'], [0, 1], 'hard', 3, 3));
  out.push(dd('Sắp giảm: III, XII, VIII, IV', ['III', 'XII', 'VIII', 'IV'], [1, 2, 3, 0], 'hard', 3, 4));
  out.push(sc('Sinh nhật tháng XII là tháng?', ['10', '11', '12'], 2, 'hard', 3, 5));
  out.push(tf('II < III < IV. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('VI + III = ? (Ả Rập)', ['7', '9', '11'], 1, 'hard', 3, 7));
  out.push(mt('Nối', ['VI', 'VIII', 'XI'], ['6', '8', '11'], 'hard', 3, 8));
  out.push(sc('Số La Mã lớn nhất trong I, V, X là?', ['I', 'V', 'X'], 2, 'hard', 3, 9));
  out.push(tf('Đồng hồ La Mã thường có 12 số. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Làm tròn số
function lamTron(scale: 'chuc' | 'tram' | 'nghin' | 'chucnghin'): QuizSeed[] {
  const out: QuizSeed[] = [];
  if (scale === 'chuc' || scale === 'tram') {
    out.push(sc('Làm tròn 47 đến hàng chục?', ['40', '50', '60'], 1, 'easy', 1, 1));
    out.push(sc('Làm tròn 23 đến hàng chục?', ['20', '25', '30'], 0, 'easy', 1, 2));
    out.push(sc('Làm tròn 85 đến hàng chục?', ['80', '85', '90'], 2, 'easy', 1, 3));
    out.push(sc('Làm tròn 234 đến hàng trăm?', ['200', '230', '300'], 0, 'easy', 1, 4));
    out.push(sc('Làm tròn 678 đến hàng trăm?', ['600', '670', '700'], 2, 'easy', 1, 5));
    out.push(tf('Làm tròn 35 đến hàng chục là 40. Đúng hay sai?', true, 'easy', 1, 6));
    out.push(sc('Làm tròn 11 đến hàng chục?', ['10', '15', '20'], 0, 'easy', 1, 7));
    out.push(sc('Làm tròn 95 đến hàng chục?', ['90', '95', '100'], 2, 'easy', 1, 8));
    out.push(sc('Làm tròn 149 đến hàng trăm?', ['100', '140', '200'], 0, 'easy', 1, 9));
    out.push(sc('Làm tròn 250 đến hàng trăm?', ['200', '250', '300'], 2, 'easy', 1, 10));
    out.push(sc('Làm tròn 1234 đến hàng trăm?', ['1200', '1230', '1300'], 0, 'medium', 2, 1));
    out.push(sc('Làm tròn 5678 đến hàng trăm?', ['5600', '5700', '5800'], 1, 'medium', 2, 2));
    out.push(tf('Số 64 làm tròn hàng chục là 60. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Số nào làm tròn hàng chục thành 50?', ['45', '53', '49'], [0, 2], 'medium', 2, 4));
    out.push(dd('Sắp tăng số làm tròn hàng chục: 47, 23, 89', ['47', '23', '89'], [1, 0, 2], 'medium', 2, 5));
    out.push(sc('Làm tròn 432 đến hàng trăm?', ['400', '430', '500'], 0, 'medium', 2, 6));
    out.push(sc('Làm tròn 759 đến hàng trăm?', ['700', '750', '800'], 2, 'medium', 2, 7));
    out.push(tf('Làm tròn 350 đến hàng trăm là 400. Đúng hay sai?', true, 'medium', 2, 8));
    out.push(sc('Số 76 làm tròn hàng chục?', ['70', '76', '80'], 2, 'medium', 2, 9));
    out.push(mt('Nối số với số làm tròn hàng chục', ['33', '57', '92'], ['30', '60', '90'], 'medium', 2, 10));
    out.push(sc('Làm tròn 1456 đến hàng trăm?', ['1400', '1450', '1500'], 2, 'hard', 3, 1));
    out.push(sc('Làm tròn 9999 đến hàng trăm?', ['9000', '9900', '10000'], 2, 'hard', 3, 2));
    out.push(sc('Làm tròn 2475 đến hàng trăm?', ['2400', '2500', '2470'], 1, 'hard', 3, 3));
    out.push(mc('Số nào làm tròn hàng trăm bằng 600?', ['567', '620', '649'], [0, 1, 2], 'hard', 3, 4));
    out.push(dd('Sắp giảm số làm tròn hàng trăm: 345, 678, 234', ['345', '678', '234'], [1, 0, 2], 'hard', 3, 5));
    out.push(tf('Làm tròn 4500 hàng nghìn là 5000. Đúng hay sai?', true, 'hard', 3, 6));
    out.push(sc('Làm tròn 8888 đến hàng trăm?', ['8800', '8900', '9000'], 1, 'hard', 3, 7));
    out.push(sc('Làm tròn 3050 đến hàng trăm?', ['3000', '3050', '3100'], 2, 'hard', 3, 8));
    out.push(mt('Nối', ['234', '786', '450'], ['200', '800', '500'], 'hard', 3, 9));
    out.push(tf('Làm tròn 50 hàng chục là 50. Đúng hay sai?', true, 'hard', 3, 10));
  } else {
    out.push(sc('Làm tròn 4567 đến hàng nghìn?', ['4000', '4500', '5000'], 2, 'easy', 1, 1));
    out.push(sc('Làm tròn 8200 đến hàng nghìn?', ['8000', '8200', '9000'], 0, 'easy', 1, 2));
    out.push(sc('Làm tròn 6500 đến hàng nghìn?', ['6000', '6500', '7000'], 2, 'easy', 1, 3));
    out.push(sc('Làm tròn 12345 đến hàng nghìn?', ['12000', '12500', '13000'], 0, 'easy', 1, 4));
    out.push(sc('Làm tròn 34500 đến hàng chục nghìn?', ['30000', '34000', '40000'], 0, 'easy', 1, 5));
    out.push(sc('Làm tròn 56789 đến hàng chục nghìn?', ['50000', '56000', '60000'], 2, 'easy', 1, 6));
    out.push(tf('Làm tròn 5500 hàng nghìn là 6000. Đúng hay sai?', true, 'easy', 1, 7));
    out.push(sc('Làm tròn 9999 đến hàng nghìn?', ['9000', '9999', '10000'], 2, 'easy', 1, 8));
    out.push(sc('Làm tròn 25000 đến hàng chục nghìn?', ['20000', '25000', '30000'], 2, 'easy', 1, 9));
    out.push(sc('Làm tròn 78000 đến hàng chục nghìn?', ['70000', '78000', '80000'], 2, 'easy', 1, 10));
    out.push(sc('Làm tròn 12678 đến hàng nghìn?', ['12000', '12500', '13000'], 2, 'medium', 2, 1));
    out.push(sc('Làm tròn 45678 đến hàng chục nghìn?', ['40000', '45000', '50000'], 2, 'medium', 2, 2));
    out.push(tf('Làm tròn 45000 hàng chục nghìn là 50000. Đúng hay sai?', true, 'medium', 2, 3));
    out.push(mc('Số nào làm tròn hàng nghìn bằng 5000?', ['4567', '5234', '4789'], [0, 1, 2], 'medium', 2, 4));
    out.push(dd('Sắp tăng làm tròn hàng nghìn: 4567, 2345, 6789', ['4567', '2345', '6789'], [1, 0, 2], 'medium', 2, 5));
    out.push(sc('Làm tròn 87654 đến hàng nghìn?', ['87000', '87500', '88000'], 2, 'medium', 2, 6));
    out.push(sc('Làm tròn 65000 đến hàng chục nghìn?', ['60000', '65000', '70000'], 2, 'medium', 2, 7));
    out.push(tf('Số 55000 làm tròn hàng chục nghìn là 60000. Đúng hay sai?', true, 'medium', 2, 8));
    out.push(sc('Làm tròn 32500 đến hàng nghìn?', ['32000', '32500', '33000'], 2, 'medium', 2, 9));
    out.push(mt('Nối', ['4567', '8945', '12345'], ['5000', '9000', '12000'], 'medium', 2, 10));
    out.push(sc('Làm tròn 99999 đến hàng nghìn?', ['99000', '99500', '100000'], 2, 'hard', 3, 1));
    out.push(sc('Làm tròn 45499 đến hàng nghìn?', ['45000', '45500', '46000'], 0, 'hard', 3, 2));
    out.push(sc('Làm tròn 67890 đến hàng chục nghìn?', ['60000', '67000', '70000'], 2, 'hard', 3, 3));
    out.push(mc('Số nào làm tròn hàng chục nghìn bằng 50000?', ['45678', '53000', '47000'], [0, 1, 2], 'hard', 3, 4));
    out.push(dd('Sắp giảm làm tròn hàng nghìn: 12345, 8765, 5432', ['12345', '8765', '5432'], [0, 1, 2], 'hard', 3, 5));
    out.push(tf('Làm tròn 50000 hàng chục nghìn là 50000. Đúng hay sai?', true, 'hard', 3, 6));
    out.push(sc('Làm tròn 8500 đến hàng nghìn?', ['8000', '8500', '9000'], 2, 'hard', 3, 7));
    out.push(sc('Làm tròn 23456 đến hàng nghìn?', ['23000', '23500', '24000'], 0, 'hard', 3, 8));
    out.push(mt('Nối', ['67890', '34567', '89012'], ['68000', '35000', '89000'], 'hard', 3, 9));
    out.push(tf('Làm tròn giúp tính nhẩm nhanh hơn. Đúng hay sai?', true, 'hard', 3, 10));
  }
  return out;
}

// Thống kê - xác suất
function thongKe(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('"Mặt trời mọc ở hướng đông" là sự kiện?', ['Chắc chắn', 'Có thể', 'Không thể'], 0, 'easy', 1, 1));
  out.push(sc('"Tung đồng xu được mặt sấp" là?', ['Chắc chắn', 'Có thể', 'Không thể'], 1, 'easy', 1, 2));
  out.push(sc('"Cá biết bay" là sự kiện?', ['Chắc chắn', 'Có thể', 'Không thể'], 2, 'easy', 1, 3));
  out.push(tf('Bảng số liệu giúp ta xem thông tin dễ dàng. Đúng hay sai?', true, 'easy', 1, 4));
  out.push(sc('Thu thập số liệu để làm gì?', ['Chơi', 'Phân tích', 'Vứt đi'], 1, 'easy', 1, 5));
  out.push(sc('"Hôm nay mưa" có thể là sự kiện?', ['Chắc chắn', 'Có thể', 'Không thể'], 1, 'easy', 1, 6));
  out.push(tf('Sự kiện "ngày mai có 25 giờ" là không thể. Đúng hay sai?', true, 'easy', 1, 7));
  out.push(sc('"Lớp em có 35 học sinh" là số liệu?', ['Có', 'Không', 'Có thể'], 0, 'easy', 1, 8));
  out.push(sc('"Bảo có 5 viên kẹo" giúp ta biết gì?', ['Tên', 'Số lượng kẹo', 'Tuổi'], 1, 'easy', 1, 9));
  out.push(tf('Phân loại giúp sắp xếp số liệu. Đúng hay sai?', true, 'easy', 1, 10));
  out.push(mc('Sự kiện "có thể"?', ['Trời nắng', 'Cá bay', 'Học bài hôm nay'], [0, 2], 'medium', 2, 1));
  out.push(mc('Sự kiện "chắc chắn"?', ['Mặt trời mọc', 'Trời mưa', 'Có 24 giờ'], [0, 2], 'medium', 2, 2));
  out.push(sc('Tổng học sinh nam (12) và nữ (15) là?', ['25', '27', '30'], 1, 'medium', 2, 3));
  out.push(tf('Biểu đồ tranh dùng hình ảnh thay con số. Đúng hay sai?', true, 'medium', 2, 4));
  out.push(dd('Sắp số liệu tăng: 12, 8, 15', ['12', '8', '15'], [1, 0, 2], 'medium', 2, 5));
  out.push(sc('Bảng có cột "Số táo" ghi 8. Có?', ['7 táo', '8 táo', '9 táo'], 1, 'medium', 2, 6));
  out.push(sc('Sự kiện không thể xảy ra?', ['Mưa', 'Tuyết ở sa mạc Sahara hôm nay', 'Có sách'], 1, 'medium', 2, 7));
  out.push(tf('Tung xúc xắc có thể ra số 7. Đúng hay sai?', false, 'medium', 2, 8, 'Xúc xắc chỉ có 1-6.'));
  out.push(mt('Nối', ['Mặt trời mọc', 'Trời mưa', 'Cá bay'], ['Chắc chắn', 'Có thể', 'Không thể'], 'medium', 2, 9));
  out.push(sc('Cách ghi số liệu nào trực quan?', ['Bằng chữ', 'Bằng bảng', 'Bằng câu chuyện'], 1, 'medium', 2, 10));
  out.push(sc('5 quả táo, 3 quả cam, 2 quả ổi. Tổng?', ['8', '10', '12'], 1, 'hard', 3, 1));
  out.push(sc('Tung 1 đồng xu, khả năng ra mặt ngửa?', ['Chắc chắn', 'Có thể', 'Không thể'], 1, 'hard', 3, 2));
  out.push(mc('Sự kiện chắc chắn?', ['Có ngày và đêm', 'Mua được kẹo miễn phí', '1+1=2'], [0, 2], 'hard', 3, 3));
  out.push(dd('Sắp số liệu giảm: 25, 18, 32, 12', ['25', '18', '32', '12'], [2, 0, 1, 3], 'hard', 3, 4));
  out.push(tf('Khi tung xúc xắc thì khả năng ra số 1 và số 6 là như nhau. Đúng hay sai?', true, 'hard', 3, 5));
  out.push(sc('Lớp 30 bạn, 12 nam. Số nữ?', ['16', '18', '20'], 1, 'hard', 3, 6));
  out.push(sc('"Cây mọc trên trời" là sự kiện?', ['Chắc chắn', 'Có thể', 'Không thể'], 2, 'hard', 3, 7));
  out.push(mt('Nối số liệu với sự kiện', ['100 học sinh', '5 lớp', '20 sách'], ['Trường', 'Khối', 'Tủ'], 'hard', 3, 8));
  out.push(sc('Có 3 viên đỏ, 2 viên xanh trong hộp. Khả năng lấy được viên đỏ?', ['Lớn hơn', 'Bằng', 'Bé hơn'], 0, 'hard', 3, 9));
  out.push(tf('Bảng số liệu giúp so sánh nhanh. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Phân số - một phần mấy
function motPhanMay(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('1/2 của 10 là?', ['2', '5', '8'], 1, 'easy', 1, 1));
  out.push(sc('1/3 của 9 là?', ['3', '4', '6'], 0, 'easy', 1, 2));
  out.push(sc('1/4 của 8 là?', ['2', '4', '6'], 0, 'easy', 1, 3));
  out.push(sc('1/5 của 10 là?', ['2', '5', '10'], 0, 'easy', 1, 4));
  out.push(tf('1/2 của 6 là 3. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(sc('1/2 của 20 là?', ['5', '10', '15'], 1, 'easy', 1, 6));
  out.push(sc('1/4 của 16 là?', ['2', '4', '8'], 1, 'easy', 1, 7));
  out.push(tf('1/3 của 12 là 4. Đúng hay sai?', true, 'easy', 1, 8));
  out.push(sc('1/6 của 12 là?', ['2', '3', '4'], 0, 'easy', 1, 9));
  out.push(sc('1/5 của 25 là?', ['4', '5', '10'], 1, 'easy', 1, 10));
  out.push(sc('1/3 của 18 là?', ['3', '6', '9'], 1, 'medium', 2, 1));
  out.push(sc('1/4 của 24 là?', ['4', '6', '8'], 1, 'medium', 2, 2));
  out.push(mc('Số nào bằng 1/2 của 10?', ['5', '4', '5+0'], [0, 2], 'medium', 2, 3));
  out.push(tf('1/2 lớn hơn 1/3. Đúng hay sai?', true, 'medium', 2, 4));
  out.push(dd('Sắp tăng: 1/4, 1/2, 1/3', ['1/4', '1/2', '1/3'], [0, 2, 1], 'medium', 2, 5));
  out.push(sc('Có 30 cái kẹo, cho 1/5. Cho mấy?', ['5', '6', '10'], 1, 'medium', 2, 6));
  out.push(sc('1/2 của 1/2 chiếc bánh là?', ['1/2', '1/3', '1/4'], 2, 'medium', 2, 7));
  out.push(tf('1/3 của 9 = 3. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('Một phần mấy của 8 là 2?', ['1/2', '1/3', '1/4'], 2, 'medium', 2, 9));
  out.push(mt('Nối', ['1/2 của 10', '1/3 của 12', '1/4 của 16'], ['5', '4', '4'], 'medium', 2, 10));
  out.push(sc('1/2 của 1/4 = ?', ['1/2', '1/6', '1/8'], 2, 'hard', 3, 1));
  out.push(sc('1/3 của 24 là?', ['6', '8', '12'], 1, 'hard', 3, 2));
  out.push(mc('Phân số bé hơn 1/2?', ['1/3', '1/4', '1/5'], [0, 1, 2], 'hard', 3, 3));
  out.push(dd('Sắp giảm: 1/2, 1/5, 1/3, 1/4', ['1/2', '1/5', '1/3', '1/4'], [0, 2, 3, 1], 'hard', 3, 4));
  out.push(tf('1/4 bằng 1/2 chia 2. Đúng hay sai?', true, 'hard', 3, 5));
  out.push(sc('Có 36 viên bi, lấy 1/6. Lấy mấy viên?', ['4', '6', '9'], 1, 'hard', 3, 6));
  out.push(sc('1/2 của 1/3 chiếc pizza?', ['1/4', '1/5', '1/6'], 2, 'hard', 3, 7));
  out.push(mt('Nối', ['1/3 của 9', '1/4 của 20', '1/5 của 25'], ['3', '5', '5'], 'hard', 3, 8));
  out.push(sc('Một số có 1/4 bằng 5. Số đó?', ['10', '15', '20'], 2, 'hard', 3, 9));
  out.push(tf('Khi mẫu số càng lớn thì phần càng nhỏ. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// Gấp / giảm số lần
function gapGiam(isGap: boolean): QuizSeed[] {
  const out: QuizSeed[] = [];
  const verb = isGap ? 'Gấp' : 'Giảm';
  const fn = (a: number, b: number) => isGap ? a * b : Math.floor(a / b);
  for (let i = 1; i <= 10; i++) {
    const a = i * 4 + 2;
    const b = 3;
    const r = isGap ? a * b : Math.floor(a / b);
    out.push(sc(`${verb} ${a} lên ${b} lần được?`, [String(r), String(r + 2), String(r - 2)], 0, 'easy', 1, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = i * 6 + 12;
    const b = 4;
    const r = fn(a, b);
    if (i % 3 === 0) out.push(tf(`${verb} ${a} ${isGap ? 'lên' : 'đi'} ${b} lần được ${r}. Đúng hay sai?`, true, 'medium', 2, i));
    else out.push(sc(`${verb} ${a} ${isGap ? 'lên' : 'đi'} ${b} lần?`, [String(r), String(r + 1), String(r - 1)], 0, 'medium', 2, i));
  }
  for (let i = 1; i <= 10; i++) {
    const a = i * 10 + 20;
    const b = 5;
    const r = fn(a, b);
    if (i === 4) out.push(mc(`Số nào ${isGap ? 'gấp' : 'giảm'} ${b} lần được ${r}?`, [String(a), String(a + 1), String(a - 1)], [0], 'hard', 3, i));
    else if (i === 8) out.push(dd(`Sắp xếp ${verb} ${b} lần: ${a}, ${a + 10}, ${a - 5}`, [String(a), String(a + 10), String(a - 5)], [2, 0, 1], 'hard', 3, i));
    else out.push(sc(`${verb} ${a} ${isGap ? 'lên' : 'đi'} ${b} lần?`, [String(r), String(r + 1), String(r - 1)], 0, 'hard', 3, i));
  }
  return out;
}

// Chia có dư
function chiaCoDu(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('17 : 5 = ?', ['3 dư 1', '3 dư 2', '4 dư 1'], 1, 'easy', 1, 1));
  out.push(sc('23 : 4 = ?', ['5 dư 3', '5 dư 4', '6 dư 1'], 0, 'easy', 1, 2));
  out.push(sc('19 : 6 = ?', ['3 dư 1', '3 dư 2', '4 dư 0'], 0, 'easy', 1, 3));
  out.push(sc('25 : 7 = ?', ['3 dư 4', '3 dư 5', '4 dư 2'], 0, 'easy', 1, 4));
  out.push(tf('Số dư luôn nhỏ hơn số chia. Đúng hay sai?', true, 'easy', 1, 5));
  out.push(sc('Số chia là 5, số dư có thể là?', ['5', '4', '6'], 1, 'easy', 1, 6));
  out.push(sc('29 : 8 = ?', ['3 dư 5', '3 dư 4', '4 dư 0'], 0, 'easy', 1, 7));
  out.push(tf('15 : 5 = 3 dư 0 là phép chia hết. Đúng hay sai?', true, 'easy', 1, 8));
  out.push(sc('22 : 9 = ?', ['2 dư 3', '2 dư 4', '3 dư 0'], 1, 'easy', 1, 9));
  out.push(sc('Trong phép chia có dư, số nào có thể bằng 0?', ['Số dư', 'Số chia', 'Số bị chia'], 0, 'easy', 1, 10));
  out.push(sc('38 : 6 = ?', ['6 dư 1', '6 dư 2', '7 dư 0'], 1, 'medium', 2, 1));
  out.push(sc('45 : 7 = ?', ['6 dư 2', '6 dư 3', '7 dư 0'], 1, 'medium', 2, 2));
  out.push(tf('Trong phép chia 15:4, thương là 3 và dư 3. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Phép chia hết?', ['12:3', '14:4', '20:5'], [0, 2], 'medium', 2, 4));
  out.push(dd('Sắp số dư tăng: 10:3, 11:4, 13:5', ['10:3', '11:4', '13:5'], [0, 2, 1], 'medium', 2, 5));
  out.push(sc('60 : 7 = ?', ['8 dư 3', '8 dư 4', '9 dư 0'], 1, 'medium', 2, 6));
  out.push(sc('Một số chia 5 dư 2, có thể là?', ['10', '12', '15'], 1, 'medium', 2, 7));
  out.push(tf('Mọi số chia cho 1 đều có dư 0. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('Số bé nhất chia 4 dư 3?', ['1', '3', '7'], 1, 'medium', 2, 9));
  out.push(mt('Nối', ['10:3', '20:6', '17:5'], ['3 dư 1', '3 dư 2', '3 dư 2'], 'medium', 2, 10));
  out.push(sc('Có 25 cái kẹo chia 4 bạn, mỗi bạn bao nhiêu, dư bao nhiêu?', ['6 dư 1', '7 dư 0', '5 dư 5'], 0, 'hard', 3, 1));
  out.push(sc('99 : 8 = ?', ['12 dư 1', '12 dư 3', '13 dư 0'], 1, 'hard', 3, 2));
  out.push(sc('Số lớn nhất có thể là số dư khi chia 7?', ['5', '6', '7'], 1, 'hard', 3, 3));
  out.push(mc('Số nào chia 5 dư 2?', ['7', '12', '17'], [0, 1, 2], 'hard', 3, 4));
  out.push(dd('Sắp xếp tăng theo dư khi chia 4: 13, 14, 15, 16', ['13', '14', '15', '16'], [3, 0, 1, 2], 'hard', 3, 5, '16:4=4 dư 0; 13:4=3 dư 1...'));
  out.push(tf('Trong phép chia có dư, số dư nhỏ hơn số chia. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('Có 50 cây xếp thành các nhóm 6 cây. Mấy nhóm, dư?', ['8 nhóm dư 2', '8 nhóm dư 0', '9 nhóm dư 0'], 0, 'hard', 3, 7));
  out.push(sc('Số chia là 9, thương 7, dư 5. Số bị chia?', ['66', '68', '70'], 1, 'hard', 3, 8, '9×7+5=68.'));
  out.push(mt('Nối', ['28:5', '30:4', '37:6'], ['5 dư 3', '7 dư 2', '6 dư 1'], 'hard', 3, 9));
  out.push(tf('Có thể có phép chia mà dư bằng số chia. Đúng hay sai?', false, 'hard', 3, 10, 'Số dư luôn nhỏ hơn số chia.'));
  return out;
}

// Bài toán 2 bước tính
function baiToan2Buoc(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('Mẹ có 20 quả táo, cho con 5 quả, mua thêm 10. Còn?', ['15', '20', '25'], 2, 'easy', 1, 1, '20-5+10=25.'));
  out.push(sc('Có 30 viên kẹo, ăn 5, chia 5 bạn đều. Mỗi bạn?', ['4', '5', '6'], 1, 'easy', 1, 2));
  out.push(sc('Lớp có 35 em, 15 nam. Nữ hơn nam?', ['5', '10', '20'], 0, 'easy', 1, 3));
  out.push(sc('Bố mua 3 hộp, mỗi hộp 6 chiếc. Tổng?', ['12', '18', '24'], 1, 'easy', 1, 4));
  out.push(sc('Có 24 quả, 6 thối. Còn?', ['12', '18', '24'], 1, 'easy', 1, 5));
  out.push(sc('40 - 10 - 5 = ?', ['20', '25', '30'], 1, 'easy', 1, 6));
  out.push(tf('Bài toán hai bước có hai phép tính. Đúng hay sai?', true, 'easy', 1, 7));
  out.push(sc('5 hộp × 4 viên - 6 viên = ?', ['12', '14', '16'], 1, 'easy', 1, 8));
  out.push(sc('100 - 30 + 20 = ?', ['80', '90', '100'], 1, 'easy', 1, 9));
  out.push(sc('Có 18 cái, chia 3 phần đều, lấy 1 phần?', ['5', '6', '9'], 1, 'easy', 1, 10));
  out.push(sc('Trường có 320 HS, 145 nam. Số nữ?', ['145', '165', '175'], 2, 'medium', 2, 1));
  out.push(sc('5 thùng × 12 chai, ăn 10 chai. Còn?', ['40', '45', '50'], 2, 'medium', 2, 2));
  out.push(tf('Bài toán 2 bước cần xác định trật tự thực hiện. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Phép tính nào cần 2 bước?', ['5+3-1', '4×3+5', '7-2'], [0, 1], 'medium', 2, 4));
  out.push(dd('Sắp xếp các bước cho "3×4+2"', ['3×4', '+2', 'Kết quả'], [0, 1, 2], 'medium', 2, 5));
  out.push(sc('Có 60 quyển vở, mỗi hộp 12 quyển. 5 hộp đủ không?', ['Đủ', 'Thiếu', 'Thừa'], 0, 'medium', 2, 6));
  out.push(sc('Cô có 6 túi bút, mỗi túi 5 cái, phát 20 em. Đủ?', ['Đủ', 'Thiếu 0', 'Thừa 10'], 2, 'medium', 2, 7));
  out.push(tf('30 = 2×8+14. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('Bài: Mua 4kg gạo, mỗi kg 15.000đ. Đưa 100.000đ, thừa?', ['30.000', '40.000', '50.000'], 1, 'medium', 2, 9));
  out.push(mt('Nối bước với phép tính', ['Số tổng', 'Số còn', 'Mỗi phần'], ['+', '-', ':'], 'medium', 2, 10));
  out.push(sc('Có 50 chiếc kẹo chia đều 5 bạn, mỗi bạn ăn 5. Còn lại mỗi bạn?', ['3', '4', '5'], 2, 'hard', 3, 1, '50:5=10; 10-5=5.'));
  out.push(sc('3 ngày làm 90 sp, 5 ngày làm?', ['100', '120', '150'], 2, 'hard', 3, 2, '90:3=30/ngày; 5×30=150.'));
  out.push(sc('Mua 2 hộp 25.000đ và 3 hộp 18.000đ. Tổng?', ['100.000', '104.000', '110.000'], 1, 'hard', 3, 3, '50+54=104.'));
  out.push(mc('Phép tính nào ra 24?', ['4+5×4', '2×(8+4)', '3×8'], [1, 2], 'hard', 3, 4));
  out.push(dd('Sắp các bước giải toán', ['Tóm tắt', 'Phép tính', 'Đáp số'], [0, 1, 2], 'hard', 3, 5));
  out.push(tf('Một bài toán có thể có nhiều cách giải. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('Lớp có 40 HS, 1/4 là nữ. Số nam?', ['10', '20', '30'], 2, 'hard', 3, 7));
  out.push(sc('Mua 6 cái bút 5.000đ và 2 cuốn vở 10.000đ. Tổng?', ['40.000', '50.000', '60.000'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['Tổng', 'Hiệu', 'Tích'], ['+', '-', '×'], 'hard', 3, 9));
  out.push(tf('Bài toán hai bước cần lời giải rõ ràng. Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// So sánh "gấp mấy lần"
function gapMayLan(): QuizSeed[] {
  const out: QuizSeed[] = [];
  out.push(sc('12 gấp mấy lần 3?', ['3', '4', '5'], 1, 'easy', 1, 1));
  out.push(sc('20 gấp mấy lần 4?', ['4', '5', '6'], 1, 'easy', 1, 2));
  out.push(sc('18 gấp mấy lần 6?', ['2', '3', '4'], 1, 'easy', 1, 3));
  out.push(sc('30 gấp mấy lần 5?', ['5', '6', '7'], 1, 'easy', 1, 4));
  out.push(sc('14 gấp mấy lần 2?', ['5', '6', '7'], 2, 'easy', 1, 5));
  out.push(tf('20 gấp 4 lần 5. Đúng hay sai?', true, 'easy', 1, 6));
  out.push(sc('36 gấp mấy lần 9?', ['3', '4', '5'], 1, 'easy', 1, 7));
  out.push(sc('15 gấp mấy lần 3?', ['3', '4', '5'], 2, 'easy', 1, 8));
  out.push(sc('Muốn biết số lớn gấp mấy lần số bé, dùng phép?', ['+', '-', ':'], 2, 'easy', 1, 9));
  out.push(sc('24 : 6 = ? (24 gấp 6 mấy lần)', ['3', '4', '5'], 1, 'easy', 1, 10));
  out.push(sc('40 gấp mấy lần 8?', ['4', '5', '6'], 1, 'medium', 2, 1));
  out.push(sc('Lớp 30 HS, có 6 bạn nam. Nữ gấp mấy lần nam?', ['3', '4', '5'], 1, 'medium', 2, 2, 'Nữ 24, gấp 4 lần.'));
  out.push(tf('Số gấp k lần số b nghĩa là số đó = b × k. Đúng hay sai?', true, 'medium', 2, 3));
  out.push(mc('Số nào gấp 3 lần 6?', ['12', '18', '24'], [1], 'medium', 2, 4));
  out.push(dd('Sắp tăng số lần gấp 5: 5, 25, 15', ['5', '25', '15'], [0, 2, 1], 'medium', 2, 5));
  out.push(sc('48 gấp mấy lần 8?', ['5', '6', '7'], 1, 'medium', 2, 6));
  out.push(sc('Bạn A có 15 nhãn, bạn B có 5 nhãn. A gấp mấy lần B?', ['2', '3', '4'], 1, 'medium', 2, 7));
  out.push(tf('15 gấp 5 lần 3. Đúng hay sai?', true, 'medium', 2, 8));
  out.push(sc('Số nào gấp 6 lần 4?', ['18', '24', '30'], 1, 'medium', 2, 9));
  out.push(mt('Nối', ['12 và 3', '20 và 4', '36 và 9'], ['4 lần', '5 lần', '4 lần'], 'medium', 2, 10));
  out.push(sc('72 gấp mấy lần 9?', ['7', '8', '9'], 1, 'hard', 3, 1));
  out.push(sc('Số gấp 4 lần 12 là?', ['36', '48', '60'], 1, 'hard', 3, 2));
  out.push(sc('Một số gấp 5 lần 7. Số đó?', ['28', '35', '42'], 1, 'hard', 3, 3));
  out.push(mc('Số nào gấp 6 lần một số bé hơn 10?', ['12', '24', '54'], [0, 1, 2], 'hard', 3, 4));
  out.push(dd('Sắp tăng số lần gấp 4: 12, 20, 8, 16', ['12', '20', '8', '16'], [2, 0, 3, 1], 'hard', 3, 5, '8:4=2;12:4=3;16:4=4;20:4=5.'));
  out.push(tf('Số lớn gấp mấy lần số bé tìm bằng chia. Đúng hay sai?', true, 'hard', 3, 6));
  out.push(sc('A 36 quả, B 9 quả. A gấp B mấy lần?', ['3', '4', '5'], 1, 'hard', 3, 7));
  out.push(sc('Số lớn 56, bé 7. Gấp mấy lần?', ['7', '8', '9'], 1, 'hard', 3, 8));
  out.push(mt('Nối', ['25 và 5', '49 và 7', '64 và 8'], ['5', '7', '8'], 'hard', 3, 9));
  out.push(tf('"Gấp mấy lần" khác với "hơn bao nhiêu". Đúng hay sai?', true, 'hard', 3, 10));
  return out;
}

// ─── Map slug → generator ──────────────────────────────────────────────────
const SLUG_TO_GEN: Record<string, () => QuizSeed[]> = {
  // Chủ đề 1
  'on-tap-cac-so-den-1000-l3': () => soSanhN(1000),
  'on-tap-phep-cong-tru-pham-vi-1000': () => congTru(1000, true),
  'tim-thanh-phan-phep-cong-tru-l3': () => mixed('Tìm thành phần'),
  'on-tap-bang-nhan-chia-2-5': () => [...bangNhan(2).slice(0, 15), ...bangChia(5).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'bang-nhan-chia-3': () => [...bangNhan(3).slice(0, 15), ...bangChia(3).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'bang-nhan-chia-4': () => [...bangNhan(4).slice(0, 15), ...bangChia(4).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'on-tap-hinh-hoc-do-luong-l3': () => hinhHoc('mixed'),
  'luyen-tap-chung-1-l3': () => mixed('Luyện tập chung 1'),
  // Chủ đề 2
  'bang-nhan-chia-6': () => [...bangNhan(6).slice(0, 15), ...bangChia(6).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'bang-nhan-chia-7': () => [...bangNhan(7).slice(0, 15), ...bangChia(7).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'bang-nhan-chia-8': () => [...bangNhan(8).slice(0, 15), ...bangChia(8).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'bang-nhan-chia-9': () => [...bangNhan(9).slice(0, 15), ...bangChia(9).slice(0, 15)].map((q, i) => ({ ...q, sortOrder: (i % 10) + 1, exerciseNumber: Math.floor(i / 10) + 1 })),
  'tim-thanh-phan-phep-nhan-chia': () => mixed('Tìm thành phần nhân chia'),
  'mot-phan-may': () => motPhanMay(),
  'luyen-tap-chung-2-l3': () => mixed('Luyện tập chung 2'),
  // Chủ đề 3
  'diem-o-giua-trung-diem-doan-thang': () => hinhHoc('trung diem'),
  'hinh-tron-tam-ban-kinh-duong-kinh': () => hinhHoc('tron'),
  'goc-goc-vuong-goc-khong-vuong': () => hinhHoc('goc'),
  'hinh-tam-giac-tu-giac-chu-nhat-vuong': () => hinhHoc('tam giac'),
  'thuc-hanh-ve-goc-vuong-duong-tron-vuong-chu-nhat': () => hinhHoc('ve'),
  'khoi-lap-phuong-khoi-hop-chu-nhat': () => hinhHoc('khoi'),
  'luyen-tap-chung-3-l3': () => mixed('Luyện tập chung 3'),
  // Chủ đề 4
  'nhan-so-hai-chu-so-voi-mot-chu-so': () => nhanKChuSo(2),
  'gap-mot-so-len-mot-so-lan': () => gapGiam(true),
  'phep-chia-het-phep-chia-co-du': () => chiaCoDu(),
  'chia-so-hai-chu-so-cho-mot-chu-so': () => chiaKChuSo(2),
  'giam-mot-so-di-mot-so-lan': () => gapGiam(false),
  'bai-toan-giai-bang-hai-buoc-tinh': () => baiToan2Buoc(),
  'luyen-tap-chung-4-l3': () => mixed('Luyện tập chung 4'),
  // Chủ đề 5
  'mi-li-met': () => doLuong('mm'),
  'gam': () => doLuong('g'),
  'mi-li-lit': () => doLuong('ml'),
  'nhiet-do-don-vi-do-nhiet-do': () => doLuong('độ C'),
  'thuc-hanh-mm-g-ml-do-c': () => mixed('Thực hành đo lường'),
  'luyen-tap-chung-5-l3': () => mixed('Luyện tập chung 5'),
  // Chủ đề 6
  'nhan-so-ba-chu-so-voi-mot-chu-so': () => nhanKChuSo(3),
  'chia-so-ba-chu-so-cho-mot-chu-so': () => chiaKChuSo(3),
  'bieu-thuc-so-tinh-gia-tri-bieu-thuc': () => bieuThuc(),
  'so-sanh-so-lon-gap-may-lan-so-be': () => gapMayLan(),
  'luyen-tap-chung-6-l3': () => mixed('Luyện tập chung 6'),
  // Chủ đề 7
  'on-tap-phep-nhan-chia-pham-vi-100-1000': () => mixed('Ôn tập nhân chia'),
  'on-tap-bieu-thuc-so': () => bieuThuc(),
  'on-tap-hinh-hoc-do-luong-hk1': () => hinhHoc('on tap'),
  'on-tap-chung-hk1-l3': () => mixed('Ôn tập chung HK1'),
  // Chủ đề 8
  'cac-so-co-bon-chu-so-so-10000': () => soSanhN(10000),
  'so-sanh-cac-so-pham-vi-10000': () => soSanhN(10000),
  'lam-quen-chu-so-la-ma': () => laMa(),
  'lam-tron-so-den-hang-chuc-tram': () => lamTron('chuc'),
  'luyen-tap-chung-so-den-10000': () => mixed('Luyện tập số 10000'),
  // Chủ đề 9
  'chu-vi-tam-giac-tu-giac-chu-nhat-vuong': () => chuViDienTich(),
  'dien-tich-cua-mot-hinh-cm-vuong': () => chuViDienTich(),
  'dien-tich-chu-nhat-vuong': () => chuViDienTich(),
  'luyen-tap-chung-7-l3': () => chuViDienTich(),
  // Chủ đề 10
  'phep-cong-pham-vi-10000': () => congTru(10000, true),
  'phep-tru-pham-vi-10000': () => congTru(10000, false),
  'nhan-so-bon-chu-so-voi-mot-chu-so': () => nhanKChuSo(4),
  'chia-so-bon-chu-so-cho-mot-chu-so': () => chiaKChuSo(4),
  'luyen-tap-chung-cong-tru-nhan-chia-10000': () => mixed('Luyện tập 10000'),
  // Chủ đề 11
  'cac-so-co-nam-chu-so-so-100000': () => soSanhN(100000),
  'so-sanh-cac-so-pham-vi-100000': () => soSanhN(100000),
  'lam-tron-so-den-hang-nghin-chuc-nghin': () => lamTron('nghin'),
  'luyen-tap-chung-8-l3': () => mixed('Luyện tập số 100000'),
  // Chủ đề 12
  'phep-cong-pham-vi-100000': () => congTru(100000, true),
  'phep-tru-pham-vi-100000': () => congTru(100000, false),
  'luyen-tap-chung-9-l3': () => mixed('Luyện tập cộng trừ 100000'),
  // Chủ đề 13
  'xem-dong-ho-thang-nam': () => thoiGianLich(),
  'thuc-hanh-xem-dong-ho-lich': () => thoiGianLich(),
  'tien-viet-nam-l3': () => tienViet(),
  'luyen-tap-chung-10-l3': () => mixed('Luyện tập đồng hồ-tiền'),
  // Chủ đề 14
  'nhan-so-nam-chu-so-voi-mot-chu-so': () => nhanKChuSo(5),
  'chia-so-nam-chu-so-cho-mot-chu-so': () => chiaKChuSo(5),
  'luyen-tap-chung-11-l3': () => mixed('Luyện tập nhân chia 100000'),
  // Chủ đề 15
  'thu-thap-phan-loai-bang-so-lieu': () => thongKe(),
  'kha-nang-xay-ra-su-kien': () => thongKe(),
  'luyen-tap-chung-12-l3': () => thongKe(),
  // Chủ đề 16
  'on-tap-cac-so-10000-100000': () => soSanhN(100000),
  'on-tap-cong-tru-pham-vi-100000': () => congTru(100000, true),
  'on-tap-nhan-chia-pham-vi-100000': () => nhanKChuSo(5),
  'on-tap-hinh-hoc-do-luong-cuoi-nam-l3': () => chuViDienTich(),
  'on-tap-bang-so-lieu-kha-nang-xay-ra': () => thongKe(),
  'on-tap-chung-cuoi-nam-l3': () => mixed('Ôn tập chung cuối năm'),
};

async function main() {
  await ds.initialize();
  console.log('✅ Database connected');
  const courseRows = await ds.query('SELECT id FROM courses WHERE slug = ?', ['toan-lop-3']);
  if (courseRows.length === 0) { console.error('❌ Course toan-lop-3 not found. Run seed:toan-lop3 first.'); process.exit(1); }
  const courseId = courseRows[0].id;
  const lessonRows: { id: number; slug: string }[] = await ds.query('SELECT id, slug FROM lessons WHERE courseId = ?', [courseId]);
  const slugToId = new Map(lessonRows.map((r) => [r.slug, r.id]));

  let totalInserted = 0;
  let totalLessons = 0;
  for (const [slug, gen] of Object.entries(SLUG_TO_GEN)) {
    const lessonId = slugToId.get(slug);
    if (!lessonId) { console.warn(`⚠️  Lesson not found: ${slug}`); continue; }
    const quizzes = gen();
    await ds.query('DELETE FROM quizzes WHERE lessonId = ?', [lessonId]);
    for (const q of quizzes) {
      await ds.query(
        `INSERT INTO quizzes (questionText, questionType, difficultyLevel, exerciseNumber, sortOrder, optionsJson, correctAnswerJson, explanation, lessonId, isActive, points, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 10, NOW(), NOW())`,
        [q.questionText, q.questionType, q.difficultyLevel, q.exerciseNumber, q.sortOrder,
         q.optionsJson ? JSON.stringify(q.optionsJson) : null,
         JSON.stringify(q.correctAnswerJson), q.explanation ?? null, lessonId],
      );
    }
    console.log(`✅ ${slug} (id=${lessonId}): ${quizzes.length} câu hỏi`);
    totalInserted += quizzes.length;
    totalLessons += 1;
  }
  console.log(`\n🎉 Tổng cộng: ${totalInserted} câu hỏi cho ${totalLessons} bài học (Toán lớp 3)`);
  await ds.destroy();
}
main().catch((e) => { console.error(e); process.exit(1); });
