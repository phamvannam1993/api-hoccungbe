import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST, port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, entities: [], synchronize: false,
});

type QType = 'single_choice' | 'multiple_choice' | 'true_false' | 'fill_blank';
type Diff = 'easy' | 'medium' | 'hard';
type Q = {
  questionText: string; questionType: QType; difficultyLevel: Diff;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown; explanation?: string;
};

const sc = (text: string, opts: string[], i: number, diff: Diff, expl?: string): Q => ({
  questionText: text, questionType: 'single_choice', difficultyLevel: diff,
  optionsJson: opts.map((t, k) => ({ key: String.fromCharCode(65 + k), text: t })),
  correctAnswerJson: String.fromCharCode(65 + i), explanation: expl,
});
const tf = (text: string, c: boolean, diff: Diff, expl?: string): Q => ({
  questionText: text, questionType: 'true_false', difficultyLevel: diff,
  correctAnswerJson: c, explanation: expl,
});
const mc = (text: string, opts: string[], idxs: number[], diff: Diff): Q => ({
  questionText: text, questionType: 'multiple_choice', difficultyLevel: diff,
  optionsJson: opts.map((t, k) => ({ key: String.fromCharCode(65 + k), text: t })),
  correctAnswerJson: idxs.map((i) => String.fromCharCode(65 + i)),
});
const fb = (text: string, ans: string | number, diff: Diff, expl?: string): Q => ({
  questionText: text, questionType: 'fill_blank', difficultyLevel: diff,
  optionsJson: [{ key: 'b1', text: '' }],
  correctAnswerJson: { b1: String(ans) }, explanation: expl,
});

// ─── TOÁN LỚP 2 ───────────────────────────────────────────────────────────────
const L2_NUM_100 = [
  sc('Số liền sau của 89 là?', ['88', '90', '91'], 1, 'easy'),
  sc('Số liền trước của 70 là?', ['69', '71', '68'], 0, 'easy'),
  sc('Số lớn nhất có 2 chữ số là?', ['89', '99', '90'], 1, 'easy'),
  sc('Số bé nhất có 2 chữ số là?', ['10', '11', '99'], 0, 'easy'),
  sc('45 + 23 = ?', ['58', '68', '78'], 1, 'easy'),
  sc('78 - 35 = ?', ['33', '43', '53'], 1, 'easy'),
  sc('Số 64 gồm mấy chục mấy đơn vị?', ['6 chục 4 đơn vị', '4 chục 6 đơn vị', '64 đơn vị'], 0, 'easy'),
  fb('Tìm x: x + 25 = 60', 35, 'medium'),
  fb('70 - ? = 25', 45, 'medium'),
  sc('Số chẵn lớn nhất bé hơn 30?', ['28', '29', '26'], 0, 'medium'),
  tf('86 > 68. Đúng hay sai?', true, 'easy'),
  mc('Số nào lớn hơn 60?', ['55', '70', '72'], [1, 2], 'medium'),
];
const L2_CONG_TRU = [
  sc('Cộng có nhớ: 27 + 18 = ?', ['35', '45', '55'], 1, 'medium'),
  sc('Trừ có nhớ: 52 - 27 = ?', ['25', '35', '45'], 0, 'medium'),
  sc('15 + 27 = ?', ['32', '42', '52'], 1, 'medium'),
  sc('63 - 18 = ?', ['45', '55', '65'], 0, 'medium'),
  sc('9 + 8 = ?', ['16', '17', '18'], 1, 'easy'),
  sc('15 - 7 = ?', ['7', '8', '9'], 1, 'easy'),
  sc('Tổng của 36 và 27 là?', ['53', '63', '73'], 1, 'medium'),
  sc('Hiệu của 80 và 35 là?', ['35', '45', '55'], 1, 'medium'),
  fb('? + 19 = 45', 26, 'hard'),
  fb('Tìm x: 78 - x = 39', 39, 'hard'),
];
const L2_NHAN_CHIA = [
  sc('2 × 4 = ?', ['6', '8', '10'], 1, 'easy'),
  sc('5 × 6 = ?', ['25', '30', '35'], 1, 'easy'),
  sc('10 : 2 = ?', ['4', '5', '6'], 1, 'easy'),
  sc('25 : 5 = ?', ['4', '5', '6'], 1, 'easy'),
  sc('2 × 9 = ?', ['16', '18', '20'], 1, 'medium'),
  sc('5 × 8 = ?', ['35', '40', '45'], 1, 'medium'),
  sc('20 : 2 = ?', ['9', '10', '11'], 1, 'easy'),
  sc('40 : 5 = ?', ['7', '8', '9'], 1, 'medium'),
  fb('5 × ? = 35', 7, 'medium'),
  sc('Một phần tư của 8 là?', ['1', '2', '4'], 1, 'medium'),
];
const L2_HINH_DO = [
  sc('Hình tứ giác có mấy cạnh?', ['3', '4', '5'], 1, 'easy'),
  sc('1 kg = ? g', ['100', '1000', '10000'], 1, 'easy'),
  sc('1 lít = ? ml', ['100', '1000', '10000'], 1, 'easy'),
  sc('1 dm = ? cm', ['10', '100', '1000'], 0, 'easy'),
  sc('1 giờ = ? phút', ['30', '60', '100'], 1, 'easy'),
  sc('1 tuần có ? ngày', ['5', '6', '7'], 2, 'easy'),
  tf('1 năm có 12 tháng. Đúng hay sai?', true, 'easy'),
  mc('Đường thẳng là?', ['Cong', 'Thẳng', 'Có 2 đầu'], [1], 'medium'),
];
const L2_BAI_TOAN = [
  sc('Mua 3 cuốn vở 5.000đ/cuốn. Tổng?', ['10.000', '15.000', '20.000'], 1, 'medium'),
  sc('Có 24 quả táo chia đều 4 bạn. Mỗi bạn?', ['4', '5', '6'], 2, 'medium'),
  sc('Mẹ có 50.000đ mua 30.000đ. Còn?', ['10.000', '20.000', '30.000'], 1, 'medium'),
  sc('Lớp có 35 HS, 15 nam. Số nữ?', ['15', '20', '25'], 1, 'medium'),
];

// ─── TOÁN LỚP 3 ───────────────────────────────────────────────────────────────
const L3_NUM_1000 = [
  sc('Số liền sau của 999 là?', ['998', '1000', '1001'], 1, 'easy'),
  sc('Số 345 gồm?', ['3 trăm 4 chục 5 đv', '5 trăm 3 chục 4 đv', '3 trăm 5 chục 4 đv'], 0, 'easy'),
  sc('245 + 130 = ?', ['365', '375', '385'], 1, 'easy'),
  sc('500 - 245 = ?', ['255', '265', '275'], 0, 'easy'),
  sc('So sánh: 567 ... 657', ['<', '>', '='], 0, 'easy'),
  fb('Tìm x: x + 120 = 350', 230, 'medium'),
  sc('Làm tròn 478 đến hàng chục?', ['470', '480', '500'], 1, 'medium'),
  tf('1 km = 1000 m. Đúng hay sai?', true, 'easy'),
  sc('Số có 3 chữ số nhỏ nhất là?', ['100', '101', '999'], 0, 'easy'),
  mc('Số chia hết cho 5?', ['25', '34', '50'], [0, 2], 'medium'),
];
const L3_NHAN_CHIA_100 = [
  sc('7 × 8 = ?', ['54', '56', '64'], 1, 'easy'),
  sc('63 : 9 = ?', ['6', '7', '8'], 1, 'easy'),
  sc('123 × 3 = ?', ['369', '379', '389'], 0, 'medium'),
  sc('484 : 4 = ?', ['111', '121', '131'], 1, 'medium'),
  sc('Gấp 7 lên 5 lần được?', ['12', '35', '42'], 1, 'medium'),
  sc('Giảm 36 đi 4 lần?', ['8', '9', '10'], 1, 'medium'),
  sc('17 : 5 = ?', ['3 dư 1', '3 dư 2', '4 dư 0'], 1, 'medium'),
  fb('Tìm x: x × 6 = 42', 7, 'medium'),
  sc('2 × 3 + 5 = ?', ['11', '13', '16'], 0, 'medium'),
  sc('(8 + 4) × 2 = ?', ['16', '20', '24'], 2, 'hard'),
];
const L3_HINH_DO = [
  sc('Chu vi hình vuông cạnh 6 cm?', ['12', '18', '24'], 2, 'medium'),
  sc('Diện tích HCN dài 8 rộng 5?', ['13', '26', '40'], 2, 'medium'),
  sc('Diện tích HV cạnh 7?', ['28', '49', '56'], 1, 'medium'),
  sc('Số La Mã VII = ?', ['5', '7', '9'], 1, 'medium'),
  sc('Số La Mã XII = ?', ['10', '12', '15'], 1, 'medium'),
  sc('1 cm = ? mm', ['10', '100', '1000'], 0, 'easy'),
  sc('1 kg = ? g', ['100', '1000', '10000'], 1, 'easy'),
  tf('1 m = 1000 mm. Đúng hay sai?', true, 'medium'),
];
const L3_LON = [
  sc('Số có 4 chữ số nhỏ nhất?', ['1000', '1234', '9999'], 0, 'easy'),
  sc('Số có 5 chữ số lớn nhất?', ['99999', '10000', '50000'], 0, 'easy'),
  sc('Làm tròn 4567 hàng nghìn?', ['4000', '4500', '5000'], 2, 'medium'),
  sc('Phép cộng 12345 + 6789 = ?', ['18134', '19134', '20134'], 1, 'hard'),
  sc('Diện tích đơn vị cm² là HV cạnh?', ['1 cm', '10 cm', '100 cm'], 0, 'medium'),
];
const L3_BAI_TOAN = [
  sc('Có 36 viên chia đều 4 bạn. Mỗi bạn?', ['7', '8', '9'], 2, 'medium'),
  sc('Một sân HCN 20m×15m. Chu vi?', ['35', '70', '300'], 1, 'medium'),
  sc('Mua 5 quyển vở 8.000đ/quyển. Tổng?', ['30.000', '40.000', '50.000'], 1, 'medium'),
  sc('3 ngày làm 90 sp. 7 ngày làm?', ['180', '210', '240'], 1, 'hard'),
];

// ─── TOÁN LỚP 4 ───────────────────────────────────────────────────────────────
const L4_NUM = [
  sc('Số có 6 chữ số nhỏ nhất?', ['100000', '999999', '123456'], 0, 'easy'),
  sc('1234 + 5678 = ?', ['6812', '6912', '7012'], 1, 'easy'),
  sc('9999 - 1234 = ?', ['8765', '8775', '8865'], 0, 'easy'),
  sc('Phân số 1/2 + 1/2 = ?', ['1/4', '1', '2/4'], 1, 'easy'),
  sc('Phân số 2/4 rút gọn = ?', ['1/2', '1/4', '2/8'], 0, 'medium'),
  sc('Phân số 3/4 so với 1/2?', ['Lớn hơn', 'Bé hơn', 'Bằng'], 0, 'medium'),
  sc('Trung bình của 4, 8, 12 = ?', ['6', '8', '10'], 1, 'medium'),
  sc('Số lớn nhất 4 chữ số khác nhau?', ['9999', '9876', '1234'], 1, 'medium'),
  fb('Tìm x: x × 12 = 144', 12, 'medium'),
  mc('Số chia hết 2 và 5?', ['10', '15', '20'], [0, 2], 'medium'),
];
const L4_NHAN_CHIA = [
  sc('123 × 4 = ?', ['482', '492', '502'], 1, 'easy'),
  sc('567 × 5 = ?', ['2735', '2835', '2935'], 1, 'medium'),
  sc('484 : 4 = ?', ['111', '121', '131'], 1, 'easy'),
  sc('936 : 6 = ?', ['146', '156', '166'], 1, 'medium'),
  sc('25 × 36 = ?', ['800', '900', '1000'], 1, 'medium'),
  sc('1248 : 8 = ?', ['156', '166', '176'], 0, 'medium'),
];
const L4_HINH_DO = [
  sc('Diện tích HV cạnh 12 cm?', ['48', '120', '144'], 2, 'medium'),
  sc('1 km = ? m', ['100', '1000', '10000'], 1, 'easy'),
  sc('1 tạ = ? kg', ['10', '100', '1000'], 1, 'easy'),
  sc('1 tấn = ? kg', ['100', '1000', '10000'], 1, 'easy'),
  sc('1 ngày = ? giờ', ['12', '24', '60'], 1, 'easy'),
  sc('Diện tích HCN 9×7?', ['16', '63', '72'], 1, 'medium'),
  tf('1 yến = 10 kg. Đúng hay sai?', true, 'easy'),
];
const L4_BAI_TOAN = [
  sc('5 quyển sách 15.000đ/quyển. Tổng?', ['65.000', '75.000', '85.000'], 1, 'medium'),
  sc('Trung bình 3 số: 6, 8, 10 = ?', ['7', '8', '9'], 1, 'medium'),
  sc('1 xe chở 1200 kg, 5 xe chở?', ['5000', '6000', '7000'], 1, 'medium'),
  sc('Mảnh đất 24×15 m. Diện tích?', ['39', '360', '300'], 1, 'medium'),
];

// ─── TOÁN LỚP 5 ───────────────────────────────────────────────────────────────
const L5_SO_THAP_PHAN = [
  sc('2,5 + 3,7 = ?', ['5,2', '6,2', '7,2'], 1, 'easy'),
  sc('10 - 4,3 = ?', ['5,7', '6,7', '7,7'], 0, 'easy'),
  sc('1,5 × 4 = ?', ['5', '6', '7'], 1, 'easy'),
  sc('7,2 : 2 = ?', ['3,1', '3,6', '4,1'], 1, 'easy'),
  sc('Số 12,34 phần thập phân?', ['12', '0,34', '34'], 1, 'easy'),
  sc('0,5 = ? %', ['5', '50', '500'], 1, 'medium'),
  sc('25% của 200 = ?', ['25', '50', '75'], 1, 'medium'),
  sc('30% của 500 = ?', ['100', '150', '200'], 1, 'medium'),
  fb('Tìm x: x : 4 = 2,5', 10, 'medium'),
  sc('1/4 = ? %', ['20', '25', '40'], 1, 'easy'),
];
const L5_HINH_HOC = [
  sc('Diện tích HV cạnh 9?', ['18', '36', '81'], 2, 'easy'),
  sc('Diện tích tam giác đáy 6, cao 4?', ['10', '12', '24'], 1, 'medium', '6×4:2=12.'),
  sc('Chu vi hình tròn bán kính 3 (π=3,14)?', ['9,42', '18,84', '28,26'], 1, 'medium'),
  sc('Diện tích hình tròn bán kính 5 (π=3,14)?', ['31,4', '78,5', '15,7'], 1, 'medium'),
  sc('Thể tích HHCN 4×3×5?', ['12', '15', '60'], 2, 'medium'),
  sc('Thể tích HLP cạnh 4?', ['12', '16', '64'], 2, 'medium'),
  sc('1 m³ = ? dm³', ['100', '1000', '10000'], 1, 'medium'),
  tf('1 m² = 100 dm². Đúng hay sai?', true, 'medium'),
];
const L5_TI_LE = [
  sc('Tỉ số 4:5 = ? %', ['60', '70', '80'], 2, 'medium'),
  sc('Bài: 60 HS có 24 nữ. Tỉ số nữ?', ['30%', '40%', '50%'], 1, 'medium'),
  sc('Vận tốc 60 km/h, 3 giờ đi?', ['120', '160', '180'], 2, 'medium'),
  sc('150 km đi 3 giờ. Vận tốc?', ['45', '50', '55'], 1, 'medium'),
  sc('40 km/h trong 1,5 giờ = ? km', ['50', '60', '70'], 1, 'hard'),
  fb('Tìm x: 60% × x = 18', 30, 'hard'),
];
const L5_BAI_TOAN = [
  sc('Lãi 12%/năm, gửi 1.000.000đ, sau 1 năm có?', ['1.012.000', '1.120.000', '1.200.000'], 1, 'hard'),
  sc('Diện tích tam giác đáy 10, cao 6?', ['16', '30', '60'], 1, 'medium'),
  sc('Hai xe 50km/h và 40km/h, sau 2 giờ cách nhau?', ['10', '20', '90'], 2, 'hard'),
  sc('20% của số là 30. Số đó?', ['100', '150', '200'], 1, 'medium'),
];

// ─── Plans ────────────────────────────────────────────────────────────────────
interface ExamPlan {
  title: string; slug: string; grade: number; semester: number; time: number; description: string; pool: Q[];
}

const finalize = (pool: Q[]) => pool.slice(0, 15).map((q, i) => ({ ...q, sortOrder: i + 1, points: 1 }));

const mix = (...pools: Q[][]): Q[] => {
  const out: Q[] = [];
  const max = Math.max(...pools.map((p) => p.length));
  for (let i = 0; i < max; i++) {
    for (const p of pools) if (p[i]) out.push(p[i]);
  }
  return out;
};

const PLANS: ExamPlan[] = [
  // ─── Toán lớp 2 ────────────────────────────────────────────────────────────
  { title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 2', slug: 'giua-hk1-toan-lop-2', grade: 2, semester: 1, time: 20, description: 'Số đến 100, cộng trừ không nhớ', pool: mix(L2_NUM_100.slice(0, 8), L2_CONG_TRU.slice(0, 4), L2_HINH_DO.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 2', slug: 'cuoi-hk1-toan-lop-2', grade: 2, semester: 1, time: 40, description: 'Số đến 100, cộng trừ có nhớ, hình học, đo lường', pool: mix(L2_NUM_100.slice(3, 12), L2_CONG_TRU, L2_HINH_DO.slice(2, 7)) },
  { title: 'Kiểm tra giữa học kỳ 2 – Toán lớp 2', slug: 'giua-hk2-toan-lop-2', grade: 2, semester: 2, time: 20, description: 'Bảng nhân chia 2, 5; số đến 1000', pool: mix(L2_NHAN_CHIA, L2_BAI_TOAN.slice(0, 2)) },
  { title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 2', slug: 'cuoi-hk2-toan-lop-2', grade: 2, semester: 2, time: 40, description: 'Tổng hợp: số đến 1000, nhân chia 2-5, đo lường, bài toán', pool: mix(L2_NHAN_CHIA, L2_HINH_DO.slice(3, 8), L2_BAI_TOAN, L2_NUM_100.slice(7, 12)) },
  { title: 'Đề luyện tập 1 – Toán lớp 2', slug: 'luyen-tap-1-toan-lop-2', grade: 2, semester: 1, time: 25, description: 'Luyện tập: số và phép tính phạm vi 100', pool: mix(L2_NUM_100.slice(2, 12), L2_CONG_TRU.slice(2, 10), L2_BAI_TOAN.slice(0, 3)) },
  { title: 'Đề luyện tập 2 – Toán lớp 2', slug: 'luyen-tap-2-toan-lop-2', grade: 2, semester: 2, time: 25, description: 'Luyện tập: nhân chia, bài toán có lời văn', pool: mix(L2_NHAN_CHIA, L2_BAI_TOAN, L2_HINH_DO.slice(0, 4)) },

  // ─── Toán lớp 3 ────────────────────────────────────────────────────────────
  { title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 3', slug: 'giua-hk1-toan-lop-3', grade: 3, semester: 1, time: 20, description: 'Số đến 1000, bảng nhân chia', pool: mix(L3_NUM_1000.slice(0, 6), L3_NHAN_CHIA_100.slice(0, 6), L3_HINH_DO.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 3', slug: 'cuoi-hk1-toan-lop-3', grade: 3, semester: 1, time: 40, description: 'Số đến 1000, nhân chia trong phạm vi 100, hình học, đo lường', pool: mix(L3_NUM_1000, L3_NHAN_CHIA_100, L3_HINH_DO) },
  { title: 'Kiểm tra giữa học kỳ 2 – Toán lớp 3', slug: 'giua-hk2-toan-lop-3', grade: 3, semester: 2, time: 20, description: 'Số đến 10000, chu vi diện tích', pool: mix(L3_LON, L3_HINH_DO.slice(2, 8), L3_BAI_TOAN.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 3', slug: 'cuoi-hk2-toan-lop-3', grade: 3, semester: 2, time: 40, description: 'Tổng hợp: số đến 100000, cộng trừ nhân chia, hình học, bài toán', pool: mix(L3_LON, L3_BAI_TOAN, L3_NHAN_CHIA_100.slice(4, 10), L3_HINH_DO.slice(0, 4)) },
  { title: 'Đề luyện tập 1 – Toán lớp 3', slug: 'luyen-tap-1-toan-lop-3', grade: 3, semester: 1, time: 25, description: 'Luyện tập: bảng nhân chia + số đến 1000', pool: mix(L3_NHAN_CHIA_100, L3_NUM_1000.slice(2, 10), L3_BAI_TOAN.slice(0, 3)) },
  { title: 'Đề luyện tập 2 – Toán lớp 3', slug: 'luyen-tap-2-toan-lop-3', grade: 3, semester: 2, time: 25, description: 'Luyện tập: chu vi diện tích, số lớn', pool: mix(L3_HINH_DO, L3_LON, L3_BAI_TOAN) },

  // ─── Toán lớp 4 ────────────────────────────────────────────────────────────
  { title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 4', slug: 'giua-hk1-toan-lop-4', grade: 4, semester: 1, time: 30, description: 'Số tự nhiên, phép cộng trừ', pool: mix(L4_NUM.slice(0, 8), L4_NHAN_CHIA.slice(0, 4), L4_HINH_DO.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 4', slug: 'cuoi-hk1-toan-lop-4', grade: 4, semester: 1, time: 60, description: 'Số tự nhiên, phép tính, đo lường', pool: mix(L4_NUM, L4_NHAN_CHIA, L4_HINH_DO, L4_BAI_TOAN.slice(0, 2)) },
  { title: 'Kiểm tra giữa học kỳ 2 – Toán lớp 4', slug: 'giua-hk2-toan-lop-4', grade: 4, semester: 2, time: 30, description: 'Phân số, hình học', pool: mix(L4_NUM.slice(3, 10), L4_HINH_DO, L4_BAI_TOAN.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 4', slug: 'cuoi-hk2-toan-lop-4', grade: 4, semester: 2, time: 60, description: 'Phân số, biểu đồ, tỉ số', pool: mix(L4_NUM.slice(2, 10), L4_NHAN_CHIA, L4_HINH_DO.slice(2, 7), L4_BAI_TOAN) },
  { title: 'Đề luyện tập 1 – Toán lớp 4', slug: 'luyen-tap-1-toan-lop-4', grade: 4, semester: 1, time: 30, description: 'Luyện: số tự nhiên + phép tính lớn', pool: mix(L4_NHAN_CHIA, L4_NUM, L4_BAI_TOAN.slice(0, 3)) },

  // ─── Toán lớp 5 ────────────────────────────────────────────────────────────
  { title: 'Kiểm tra giữa học kỳ 1 – Toán lớp 5', slug: 'giua-hk1-toan-lop-5', grade: 5, semester: 1, time: 30, description: 'Số thập phân, đơn vị đo', pool: mix(L5_SO_THAP_PHAN.slice(0, 8), L5_HINH_HOC.slice(0, 4), L5_TI_LE.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 1 – Toán lớp 5', slug: 'cuoi-hk1-toan-lop-5', grade: 5, semester: 1, time: 60, description: 'Số thập phân, %, hình học', pool: mix(L5_SO_THAP_PHAN, L5_HINH_HOC, L5_TI_LE.slice(0, 3)) },
  { title: 'Kiểm tra giữa học kỳ 2 – Toán lớp 5', slug: 'giua-hk2-toan-lop-5', grade: 5, semester: 2, time: 30, description: 'Tỉ số, vận tốc, thể tích', pool: mix(L5_TI_LE, L5_HINH_HOC.slice(3, 8), L5_BAI_TOAN.slice(0, 3)) },
  { title: 'Kiểm tra cuối học kỳ 2 – Toán lớp 5', slug: 'cuoi-hk2-toan-lop-5', grade: 5, semester: 2, time: 60, description: 'Tổng hợp cuối cấp Tiểu học: thập phân, %, hình học, bài toán', pool: mix(L5_SO_THAP_PHAN, L5_HINH_HOC, L5_TI_LE, L5_BAI_TOAN) },
  { title: 'Đề luyện tập 1 – Toán lớp 5', slug: 'luyen-tap-1-toan-lop-5', grade: 5, semester: 1, time: 30, description: 'Luyện: số thập phân và %', pool: mix(L5_SO_THAP_PHAN, L5_TI_LE.slice(0, 4), L5_BAI_TOAN.slice(0, 3)) },
  { title: 'Đề luyện tập 2 – Toán lớp 5', slug: 'luyen-tap-2-toan-lop-5', grade: 5, semester: 2, time: 30, description: 'Luyện: hình học và bài toán có lời văn', pool: mix(L5_HINH_HOC, L5_BAI_TOAN, L5_TI_LE.slice(2, 6)) },
];

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');
  let totalExams = 0, totalQs = 0;
  for (const plan of PLANS) {
    const questions = finalize(plan.pool);
    const existing = await ds.query('SELECT id FROM exams WHERE slug = ?', [plan.slug]);
    if (existing.length > 0) {
      await ds.query('DELETE FROM exam_questions WHERE examId = ?', [existing[0].id]);
      await ds.query('DELETE FROM exams WHERE id = ?', [existing[0].id]);
    }
    const res = await ds.query(
      `INSERT INTO exams (title, slug, subject, grade, semester, description, timeLimitMinutes, totalPoints, isActive, createdAt, updatedAt)
       VALUES (?, ?, 'toan', ?, ?, ?, ?, 10, 1, NOW(), NOW())`,
      [plan.title, plan.slug, plan.grade, plan.semester, plan.description, plan.time],
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
    totalExams += 1; totalQs += questions.length;
  }
  console.log(`\n🎉 Xong! ${totalExams} đề thi Toán, ${totalQs} câu hỏi.`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
