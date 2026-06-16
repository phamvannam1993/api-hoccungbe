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

type QType = 'single_choice' | 'multiple_choice' | 'true_false' | 'fill_blank';
type Diff = 'easy' | 'medium' | 'hard';

interface ExamQ {
  questionText: string;
  questionType: QType;
  difficultyLevel: Diff;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown;
  explanation?: string;
  points: number;
  sortOrder: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sc = (text: string, opts: string[], correctIdx: number, diff: Diff, expl?: string): Omit<ExamQ, 'sortOrder' | 'points'> => ({
  questionText: text, questionType: 'single_choice', difficultyLevel: diff,
  optionsJson: opts.map((t, i) => ({ key: String.fromCharCode(65 + i), text: t })),
  correctAnswerJson: String.fromCharCode(65 + correctIdx), explanation: expl,
});
const tf = (text: string, correct: boolean, diff: Diff, expl?: string): Omit<ExamQ, 'sortOrder' | 'points'> => ({
  questionText: text, questionType: 'true_false', difficultyLevel: diff,
  correctAnswerJson: correct, explanation: expl,
});
const mc = (text: string, opts: string[], correctIdxs: number[], diff: Diff): Omit<ExamQ, 'sortOrder' | 'points'> => ({
  questionText: text, questionType: 'multiple_choice', difficultyLevel: diff,
  optionsJson: opts.map((t, i) => ({ key: String.fromCharCode(65 + i), text: t })),
  correctAnswerJson: correctIdxs.map((i) => String.fromCharCode(65 + i)),
});
const fb = (text: string, answer: string | number, diff: Diff, expl?: string): Omit<ExamQ, 'sortOrder' | 'points'> => ({
  questionText: text, questionType: 'fill_blank', difficultyLevel: diff,
  optionsJson: [{ key: 'b1', text: '' }],
  correctAnswerJson: { b1: String(answer) }, explanation: expl,
});

// ─── Pool: 60+ câu Toán lớp 1 ─────────────────────────────────────────────────
// Mỗi đề chọn ~15 câu khác nhau từ pool theo subject

// Pool A: Số trong phạm vi 10
const POOL_A = [
  sc('Số liền sau của 4 là?', ['3', '5', '6'], 1, 'easy'),
  sc('Số liền trước của 7 là?', ['6', '8', '5'], 0, 'easy'),
  sc('Số lớn nhất trong: 3, 8, 5?', ['3', '5', '8'], 2, 'easy'),
  sc('Số bé nhất trong: 9, 4, 6?', ['9', '4', '6'], 1, 'easy'),
  sc('Số nào lớn hơn 6?', ['5', '4', '8'], 2, 'easy'),
  sc('Đếm xuôi: 1, 2, 3, ?', ['4', '5', '6'], 0, 'easy'),
  sc('Đếm ngược: 10, 9, 8, ?', ['7', '6', '5'], 0, 'easy'),
  tf('Số 5 nhỏ hơn số 8. Đúng hay sai?', true, 'easy'),
  tf('Số 0 là số bé nhất. Đúng hay sai?', true, 'easy'),
  fb('Số liền sau của 9 là ?', 10, 'easy'),
  sc('Số nào ở giữa 3 và 5?', ['2', '4', '6'], 1, 'easy'),
  sc('Số nào lớn hơn 5 và bé hơn 7?', ['4', '6', '8'], 1, 'medium'),
  sc('Có bao nhiêu số có 1 chữ số?', ['9', '10', '11'], 1, 'medium'),
  mc('Số nào lớn hơn 5?', ['3', '6', '8'], [1, 2], 'medium'),
  fb('Số 6 gồm ? đơn vị', 6, 'medium'),
];

// Pool B: Phép cộng
const POOL_B = [
  sc('3 + 4 = ?', ['6', '7', '8'], 1, 'easy'),
  sc('5 + 2 = ?', ['6', '7', '8'], 1, 'easy'),
  sc('6 + 3 = ?', ['8', '9', '10'], 1, 'easy'),
  sc('2 + 2 = ?', ['3', '4', '5'], 1, 'easy'),
  sc('1 + 5 = ?', ['4', '6', '7'], 1, 'easy'),
  sc('4 + 4 = ?', ['7', '8', '9'], 1, 'easy'),
  sc('0 + 7 = ?', ['0', '7', '8'], 1, 'easy'),
  sc('5 + 5 = ?', ['9', '10', '11'], 1, 'easy'),
  fb('3 + ? = 9', 6, 'medium'),
  fb('? + 4 = 7', 3, 'medium'),
  sc('Có 3 con vịt, thêm 4 con. Tổng?', ['6', '7', '8'], 1, 'medium'),
  sc('5 + 2 + 1 = ?', ['7', '8', '9'], 1, 'medium'),
  sc('6 + 4 = ?', ['9', '10', '11'], 1, 'medium'),
  tf('3 + 5 = 8. Đúng hay sai?', true, 'easy'),
  sc('Số nào cộng với 5 được 10?', ['3', '4', '5'], 2, 'medium'),
];

// Pool C: Phép trừ
const POOL_C = [
  sc('7 - 3 = ?', ['3', '4', '5'], 1, 'easy'),
  sc('10 - 4 = ?', ['5', '6', '7'], 1, 'easy'),
  sc('9 - 6 = ?', ['2', '3', '4'], 1, 'easy'),
  sc('8 - 2 = ?', ['5', '6', '7'], 1, 'easy'),
  sc('5 - 0 = ?', ['0', '5', '6'], 1, 'easy'),
  sc('10 - 10 = ?', ['0', '1', '10'], 0, 'easy'),
  sc('6 - 4 = ?', ['1', '2', '3'], 1, 'easy'),
  fb('10 - ? = 3', 7, 'medium'),
  fb('? - 2 = 5', 7, 'medium'),
  sc('Có 8 viên kẹo, ăn 3 viên. Còn?', ['4', '5', '6'], 1, 'medium'),
  sc('9 - 5 - 2 = ?', ['1', '2', '3'], 1, 'hard'),
  tf('7 - 2 = 4. Đúng hay sai?', false, 'easy', '7 - 2 = 5.'),
  sc('Hiệu của 10 và 6 là?', ['3', '4', '5'], 1, 'medium'),
  sc('Số bị trừ là 8, số trừ là 5. Hiệu?', ['2', '3', '4'], 1, 'medium'),
  fb('Tìm x: x - 3 = 4', 7, 'medium'),
];

// Pool D: Hình học cơ bản
const POOL_D = [
  sc('Hình tam giác có mấy cạnh?', ['2', '3', '4'], 1, 'easy'),
  sc('Hình vuông có mấy góc?', ['3', '4', '5'], 1, 'easy'),
  sc('Hình chữ nhật có mấy cạnh?', ['3', '4', '5'], 1, 'easy'),
  sc('Hình tròn có mấy cạnh?', ['0', '1', '2'], 0, 'medium'),
  tf('Hình vuông có 4 cạnh bằng nhau. Đúng hay sai?', true, 'easy'),
  tf('Hình tam giác có 3 đỉnh. Đúng hay sai?', true, 'easy'),
  sc('Hình nào tròn?', ['Quả bóng', 'Quyển sách', 'Cái bàn'], 0, 'easy'),
  mc('Hình nào có 4 góc?', ['Tam giác', 'Hình vuông', 'Chữ nhật'], [1, 2], 'medium'),
  sc('Hình tròn giống vật gì?', ['Bút chì', 'Đồng xu', 'Thước'], 1, 'easy'),
];

// Pool E: Đo lường (cm, kg, lít, thời gian)
const POOL_E = [
  sc('1 chục = ? đơn vị', ['1', '10', '100'], 1, 'easy'),
  sc('1 tuần có mấy ngày?', ['5', '6', '7'], 2, 'easy'),
  sc('1 ngày có mấy giờ?', ['12', '24', '60'], 1, 'easy'),
  tf('Hôm nay có 7 ngày trong tuần. Đúng hay sai?', true, 'easy'),
  sc('Đo độ dài dùng?', ['Cân', 'Thước', 'Ca'], 1, 'easy'),
  sc('Đo cân nặng dùng?', ['Thước', 'Cân', 'Đồng hồ'], 1, 'easy'),
  sc('Đo thời gian dùng?', ['Cân', 'Đồng hồ', 'Thước'], 1, 'easy'),
];

// Pool F: Bài toán có lời văn
const POOL_F = [
  sc('Lan có 3 quả táo, Bình có 5 quả. Tổng?', ['7', '8', '9'], 1, 'medium'),
  sc('Có 10 con gà, bán 4 con. Còn?', ['5', '6', '7'], 1, 'medium'),
  sc('Mẹ mua 6 cái bánh, cho con 2 cái. Còn?', ['3', '4', '5'], 1, 'medium'),
  sc('Trong vườn có 8 cây cam, trồng thêm 2 cây. Tổng?', ['9', '10', '11'], 1, 'medium'),
  sc('Lan có 9 viên bi, cho Bình 4 viên. Còn?', ['4', '5', '6'], 1, 'medium'),
  sc('Có 7 bạn nam, 3 bạn nữ. Tổng số bạn?', ['9', '10', '11'], 1, 'medium'),
  sc('Bé có 10 cây bút, gãy 3 cây. Còn nguyên?', ['6', '7', '8'], 1, 'hard'),
];

// Pool G: Số trong phạm vi 20 (cho HK2)
const POOL_G = [
  sc('Số liền sau của 15 là?', ['14', '16', '17'], 1, 'easy'),
  sc('Số liền trước của 20 là?', ['18', '19', '21'], 1, 'easy'),
  sc('Số nào lớn hơn 18?', ['15', '17', '19'], 2, 'easy'),
  sc('13 + 5 = ?', ['17', '18', '19'], 1, 'medium'),
  sc('20 - 6 = ?', ['13', '14', '15'], 1, 'medium'),
  sc('12 + 7 = ?', ['18', '19', '20'], 1, 'medium'),
  sc('15 + 5 = ?', ['18', '19', '20'], 2, 'medium'),
  sc('16 - 8 = ?', ['7', '8', '9'], 1, 'medium'),
  sc('Số có 1 chục 5 đơn vị?', ['10', '15', '51'], 1, 'medium'),
  sc('Có 11 con cá, mua thêm 4 con. Tổng?', ['14', '15', '16'], 1, 'hard'),
  tf('Số 20 lớn nhất trong các số đến 20. Đúng hay sai?', true, 'easy'),
  fb('? + 8 = 14', 6, 'medium'),
  fb('17 - ? = 9', 8, 'medium'),
  sc('Số chục trong số 18 là?', ['1', '8', '0'], 0, 'medium'),
  sc('Số đơn vị trong số 12 là?', ['1', '2', '12'], 1, 'medium'),
];

// ─── Tổ chức 4 đề thi ────────────────────────────────────────────────────────
type Pool = Omit<ExamQ, 'sortOrder' | 'points'>;

const finalize = (pool: Pool[]): ExamQ[] =>
  pool.map((q, i) => ({ ...q, sortOrder: i + 1, points: 1 }));

interface ExamPlan {
  title: string;
  slug: string;
  semester: number;
  timeLimitMinutes: number;
  description: string;
  pool: Pool[];
}

// Trộn nhẹ để các đề khác nhau, đảm bảo 15 câu/đề
function mix(...pools: Pool[][]): Pool[] {
  const merged: Pool[] = [];
  const maxLen = Math.max(...pools.map((p) => p.length));
  for (let i = 0; i < maxLen; i++) {
    for (const p of pools) {
      if (p[i]) merged.push(p[i]);
    }
  }
  return merged.slice(0, 15);
}

const EXAMS: ExamPlan[] = [
  {
    title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 1',
    slug: 'giua-hk1-toan-lop-1-v2',
    semester: 1,
    timeLimitMinutes: 20,
    description: 'Đề kiểm tra 20 phút – Số trong phạm vi 10, phép cộng cơ bản, nhận biết hình',
    pool: mix(POOL_A.slice(0, 8), POOL_B.slice(0, 5), POOL_D.slice(0, 3)),
  },
  {
    title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 1',
    slug: 'cuoi-hk1-toan-lop-1-v2',
    semester: 1,
    timeLimitMinutes: 40,
    description: 'Đề kiểm tra 40 phút – Số đến 10, cộng trừ trong phạm vi 10, hình học, bài toán có lời văn',
    pool: mix(POOL_A.slice(0, 4), POOL_B.slice(5, 12), POOL_C.slice(0, 5), POOL_D.slice(3, 6), POOL_F.slice(0, 3)),
  },
  {
    title: 'Kiểm tra giữa học kỳ 2 – Toán lớp 1',
    slug: 'giua-hk2-toan-lop-1-v2',
    semester: 2,
    timeLimitMinutes: 20,
    description: 'Đề kiểm tra 20 phút – Số đến 20, cộng trừ trong 20, đo lường',
    pool: mix(POOL_G.slice(0, 9), POOL_E.slice(0, 4), POOL_F.slice(3, 5)),
  },
  {
    title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 1',
    slug: 'cuoi-hk2-toan-lop-1-v2',
    semester: 2,
    timeLimitMinutes: 40,
    description: 'Đề kiểm tra 40 phút – Tổng hợp số đến 20, cộng trừ, đo lường, hình học, bài toán',
    pool: mix(POOL_G.slice(5, 15), POOL_E.slice(3, 7), POOL_F.slice(2, 7), POOL_D.slice(2, 5)),
  },
  {
    title: 'Đề luyện tập số 1 – Toán lớp 1',
    slug: 'luyen-tap-1-toan-lop-1',
    semester: 1,
    timeLimitMinutes: 25,
    description: 'Đề luyện tập tổng hợp số 1 – Số và phép tính trong phạm vi 10',
    pool: mix(POOL_A.slice(7, 15), POOL_B.slice(2, 8), POOL_C.slice(2, 4)),
  },
  {
    title: 'Đề luyện tập số 2 – Toán lớp 1',
    slug: 'luyen-tap-2-toan-lop-1',
    semester: 2,
    timeLimitMinutes: 25,
    description: 'Đề luyện tập tổng hợp số 2 – Phạm vi 20 và bài toán có lời văn',
    pool: mix(POOL_G.slice(3, 12), POOL_F.slice(0, 4), POOL_E.slice(2, 5)),
  },
];

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');

  let totalExams = 0;
  let totalQs = 0;

  for (const plan of EXAMS) {
    const questions = finalize(plan.pool);

    // Xóa đề cũ
    const existing = await ds.query('SELECT id FROM exams WHERE slug = ?', [plan.slug]);
    if (existing.length > 0) {
      await ds.query('DELETE FROM exam_questions WHERE examId = ?', [existing[0].id]);
      await ds.query('DELETE FROM exams WHERE id = ?', [existing[0].id]);
    }

    // Tạo đề
    const res = await ds.query(
      `INSERT INTO exams (title, slug, subject, grade, semester, description, timeLimitMinutes, totalPoints, isActive, createdAt, updatedAt)
       VALUES (?, ?, 'toan', 1, ?, ?, ?, 10, 1, NOW(), NOW())`,
      [plan.title, plan.slug, plan.semester, plan.description, plan.timeLimitMinutes],
    );
    const examId = res.insertId;

    for (const q of questions) {
      await ds.query(
        `INSERT INTO exam_questions (examId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, explanation, points, sortOrder, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [examId, q.questionText, q.questionType, q.difficultyLevel,
          q.optionsJson ? JSON.stringify(q.optionsJson) : null,
          JSON.stringify(q.correctAnswerJson), q.explanation ?? null, q.points, q.sortOrder],
      );
    }
    console.log(`✅ ${plan.title} (${questions.length} câu)`);
    totalExams += 1;
    totalQs += questions.length;
  }

  console.log(`\n🎉 Xong! ${totalExams} đề thi Toán lớp 1, ${totalQs} câu hỏi.`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
