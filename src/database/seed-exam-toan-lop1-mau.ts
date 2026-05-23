import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { Exam } from '../modules/exams/entities/exam.entity';
import { ExamQuestion } from '../modules/exams/entities/exam-question.entity';

async function main() {
  const ds = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'songtute',
    entities: [Exam, ExamQuestion],
    synchronize: true,
  });
  await ds.initialize();

  const examRepo = ds.getRepository(Exam);
  const qRepo = ds.getRepository(ExamQuestion);

  // Delete existing if any
  const existing = await examRepo.findOne({ where: { slug: 'kiem-tra-cuoi-hk1-toan-lop1-mau' } });
  if (existing) {
    await qRepo.delete({ examId: existing.id });
    await examRepo.delete({ id: existing.id });
  }

  const exam = await examRepo.save(examRepo.create({
    title: 'Kiểm tra cuối học kỳ I – Toán lớp 1',
    slug: 'kiem-tra-cuoi-hk1-toan-lop1-mau',
    subject: 'toan',
    grade: 1,
    semester: 1,
    description: 'Đề kiểm tra cuối học kỳ I môn Toán lớp 1 theo chuẩn Bộ GD&ĐT',
    timeLimitMinutes: 40,
    totalPoints: 10,
    isActive: true,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const questions: any[] = [
    // ── Phần I ──────────────────────────────────────────────────────────────
    // Câu 1: Đúng / Sai
    {
      examId: exam.id,
      sortOrder: 1,
      questionType: 'true_false',
      questionText: 'Phần I – Câu 1a: 3 + 5 – 7 = 1',
      difficultyLevel: 'easy',
      points: 1,
      correctAnswerJson: true,
      explanation: '3 + 5 = 8; 8 – 7 = 1 ✓',
    },
    {
      examId: exam.id,
      sortOrder: 2,
      questionType: 'true_false',
      questionText: 'Phần I – Câu 1b: 7 + 2 – 3 = 4',
      difficultyLevel: 'easy',
      points: 1,
      correctAnswerJson: false,
      explanation: '7 + 2 = 9; 9 – 3 = 6 ≠ 4 ✗',
    },
    // Câu 2: Chọn đáp án đúng – sắp xếp số
    {
      examId: exam.id,
      sortOrder: 3,
      questionType: 'single_choice',
      questionText: 'Phần I – Câu 2: Sắp xếp các số 8; 1; 5; 4; 7; 2 theo thứ tự từ bé đến lớn',
      difficultyLevel: 'easy',
      points: 1,
      optionsJson: [
        { key: 'A', text: '1; 2; 4; 5; 7; 8' },
        { key: 'B', text: '8; 7; 5; 4; 2; 1' },
        { key: 'C', text: '1; 2; 4; 5; 7; 8' },
        { key: 'D', text: '2; 1; 5; 4; 8; 7' },
      ],
      correctAnswerJson: 'A',
      explanation: 'Thứ tự từ bé đến lớn: 1 < 2 < 4 < 5 < 7 < 8',
    },
    // Câu 3: Điền số vào ô trống – dãy số
    {
      examId: exam.id,
      sortOrder: 4,
      questionType: 'fill_blank',
      questionText: 'Phần I – Câu 3: Điền số thích hợp vào ô trống',
      difficultyLevel: 'easy',
      points: 1,
      optionsJson: [
        // Chain 1: 3 → +2 → ? → +2 → ?
        { key: 'n1_g1', type: 'given', value: '3' },
        { key: 'n1_op1', type: 'op', value: '+2→' },
        { key: 'n1_b1', type: 'blank', value: '' },
        { key: 'n1_op2', type: 'op', value: '+2→' },
        { key: 'n1_b2', type: 'blank', value: '' },
        // separator
        { key: 'sep', type: 'op', value: '|' },
        // Chain 2: 10 → -3 → ? → -3 → ?
        { key: 'n2_g1', type: 'given', value: '10' },
        { key: 'n2_op1', type: 'op', value: '-3→' },
        { key: 'n2_b1', type: 'blank', value: '' },
        { key: 'n2_op2', type: 'op', value: '-3→' },
        { key: 'n2_b2', type: 'blank', value: '' },
      ],
      correctAnswerJson: {
        n1_b1: '5',
        n1_b2: '7',
        n2_b1: '7',
        n2_b2: '4',
      },
    },
    // Câu 4: Nối biểu thức với kết quả
    {
      examId: exam.id,
      sortOrder: 5,
      questionType: 'matching',
      questionText: 'Phần I – Câu 4: Nối phép tính với kết quả đúng',
      difficultyLevel: 'medium',
      points: 1,
      optionsJson: [
        { key: 'M1', text: '3 + 5' },
        { key: 'M2', text: '10 – 2' },
        { key: 'M3', text: '4 + 4' },
        { key: 'M4', text: '9 – 1' },
      ],
      correctAnswerJson: {
        M1: '8',
        M2: '8',
        M3: '8',
        M4: '8',
      },
      explanation: 'Tất cả đều bằng 8',
    },
    // Câu 5: Đếm số hình tam giác
    {
      examId: exam.id,
      sortOrder: 6,
      questionType: 'single_choice',
      questionText: 'Phần I – Câu 5: Có bao nhiêu hình tam giác trong hình vẽ?',
      difficultyLevel: 'medium',
      points: 1,
      optionsJson: [
        { key: 'A', text: '3' },
        { key: 'B', text: '5' },
        { key: 'C', text: '4' },
        { key: 'D', text: '6' },
      ],
      correctAnswerJson: 'B',
      explanation: 'Đếm cả tam giác nhỏ và tam giác to: có 5 hình tam giác',
    },

    // ── Phần II ─────────────────────────────────────────────────────────────
    // Câu 1: Bảng tính (fill_blank dạng lưới)
    {
      examId: exam.id,
      sortOrder: 7,
      questionType: 'table_fill',
      questionText: 'Phần II – Câu 1: Điền số thích hợp vào bảng',
      difficultyLevel: 'medium',
      points: 1,
      optionsJson: {
        headers: ['3', '5', '2', '4', '1', '6'],
        rows: [
          { op: '+4', keys: ['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r1c5', 'r1c6'] },
          { op: '-2', keys: ['r2c1', 'r2c2', 'r2c3', 'r2c4', 'r2c5', 'r2c6'] },
        ],
      },
      correctAnswerJson: {
        r1c1: '7', r1c2: '9', r1c3: '6', r1c4: '8', r1c5: '5', r1c6: '10',
        r2c1: '1', r2c2: '3', r2c3: '0', r2c4: '2', r2c5: '-1', r2c6: '4',
      },
      explanation: 'Hàng +4: cộng thêm 4. Hàng -2: trừ đi 2',
    },
    // Câu 2: So sánh – điền <, =, >
    {
      examId: exam.id,
      sortOrder: 8,
      questionType: 'number_compare',
      questionText: 'Phần II – Câu 2: Điền dấu <, =, > vào chỗ trống',
      difficultyLevel: 'easy',
      points: 1,
      optionsJson: [
        { key: 'p1', left: '4 + 3', right: '2 + 6' },
        { key: 'p2', left: '8 – 3', right: '3 + 3' },
        { key: 'p3', left: '1 + 7', right: '9 – 0' },
        { key: 'p4', left: '6 – 2', right: '2 + 1' },
      ],
      correctAnswerJson: {
        p1: '<',
        p2: '<',
        p3: '<',
        p4: '>',
      },
      explanation: '7<8; 5<6; 8<9; 4>3',
    },
    // Câu 3: Bảng cộng trừ với hàng số cho trước
    {
      examId: exam.id,
      sortOrder: 9,
      questionType: 'table_fill',
      questionText: 'Phần II – Câu 3: Điền số thích hợp vào bảng theo phép tính',
      difficultyLevel: 'medium',
      points: 1,
      optionsJson: {
        headers: ['4', '5', '1', '2', '3', '6'],
        rows: [
          { op: '+2', keys: ['t2c1', 't2c2', 't2c3', 't2c4', 't2c5', 't2c6'] },
          { op: '-3', keys: ['t3c1', 't3c2', 't3c3', 't3c4', 't3c5', 't3c6'] },
        ],
      },
      correctAnswerJson: {
        t2c1: '6', t2c2: '7', t2c3: '3', t2c4: '4', t2c5: '5', t2c6: '8',
        t3c1: '1', t3c2: '2', t3c3: '-2', t3c4: '-1', t3c5: '0', t3c6: '3',
      },
    },
    // Câu 4: Bài toán có lời văn
    {
      examId: exam.id,
      sortOrder: 10,
      questionType: 'single_choice',
      questionText: 'Phần II – Câu 4: Trên cành cây có 6 con chim. Có 2 con chim bay đến. Hỏi trên cành cây có tất cả bao nhiêu con chim?',
      difficultyLevel: 'easy',
      points: 1,
      optionsJson: [
        { key: 'A', text: '4 con chim' },
        { key: 'B', text: '8 con chim' },
        { key: 'C', text: '7 con chim' },
        { key: 'D', text: '6 con chim' },
      ],
      correctAnswerJson: 'B',
      explanation: '6 + 2 = 8 con chim',
    },
    // Câu 5: Điền số vào tam giác
    {
      examId: exam.id,
      sortOrder: 11,
      questionType: 'drag_to_position',
      questionText: 'Phần II – Câu 5: Điền các số 2, 6, 7 vào tam giác sao cho tổng ba số trên mỗi cạnh bằng 10',
      difficultyLevel: 'hard',
      points: 1,
      optionsJson: {
        tokens: ['2', '6', '7'],
        positions: [
          // Triangle vertices + midpoints (cx, cy based on SVG 220x200 viewBox)
          { key: 'top',   label: 'Đỉnh trên',   fixed: true,  value: '1', cx: 110, cy: 20 },
          { key: 'left',  label: 'Đỉnh trái',   fixed: true,  value: '3', cx: 20,  cy: 180 },
          { key: 'right', label: 'Đỉnh phải',   fixed: true,  value: '5', cx: 200, cy: 180 },
          { key: 'mid_tl', label: 'Giữa trên-trái',  fixed: false, cx: 65,  cy: 100 },
          { key: 'mid_tr', label: 'Giữa trên-phải',  fixed: false, cx: 155, cy: 100 },
          { key: 'mid_bt', label: 'Giữa dưới',        fixed: false, cx: 110, cy: 180 },
        ],
      },
      correctAnswerJson: {
        mid_tl: '6',
        mid_tr: '2',
        mid_bt: '7',
      },
      explanation: 'Cạnh trái: 1+6+3=10; Cạnh phải: 1+2+5... thử lại theo cạnh',
    },
  ];

  for (const q of questions) {
    await qRepo.save(qRepo.create(q));
  }

  console.log(`✅ Tạo xong đề thi mẫu: ${exam.title} (${questions.length} câu)`);
  await ds.destroy();
}

main().catch(console.error);
