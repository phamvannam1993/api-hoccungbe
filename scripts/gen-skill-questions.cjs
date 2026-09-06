/**
 * Sinh kho câu hỏi RIÊNG cho "Học theo kỹ năng" (bảng skill_questions) — môn Toán lớp 1–5.
 *
 * Vì sao sinh theo mẫu chứ không viết tay: mỗi kỹ năng cần hàng chục câu ở 3 mức
 * và mỗi câu cần một CÂU SINH ĐÔI cùng dạng khác số liệu (để bé làm sai thì thử
 * lại ngay). Bộ sinh cho cả bốn thứ đó từ một chỗ — câu hỏi, đáp án nhiễu, lời
 * giải thích chỉ ra cách làm, và câu sinh đôi chỉ là một lần rút khác.
 *
 * Lời giải thích phải DẠY CÁCH NGHĨ, không nêu đáp án suông: các bộ sinh dưới đây
 * đều diễn giải phép tính (vd "Chia là tìm số còn thiếu trong phép nhân:
 * 4 × 9 = 36 nên 36 : 4 = 9").
 *
 *   node scripts/gen-skill-questions.cjs            # dry-run, in thống kê + vài mẫu
 *   node scripts/gen-skill-questions.cjs --apply    # ghi vào DB
 *   node scripts/gen-skill-questions.cjs --skill phep-chia --grade 3 --show 6
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const B = require('./data/vi-en-banks.cjs');

const ARGS = process.argv.slice(2);
const APPLY = ARGS.includes('--apply');
const argOf = (name) => {
  const i = ARGS.indexOf(name);
  return i >= 0 ? ARGS[i + 1] : undefined;
};
const ONLY_SKILL = argOf('--skill');
const ONLY_GRADE = argOf('--grade');
const SHOW = Number(argOf('--show') ?? 0);

// Mỗi (kỹ năng × lớp × mức) sinh ngần này NHÓM sinh đôi, mỗi nhóm 2 câu.
// Một phiên chỉ lấy TỐI ĐA 1 câu mỗi nhóm (câu còn lại để dành cho lượt "thử
// câu tương tự"), nên số nhóm phải lớn hơn số câu một phiên — nếu không phiên
// của bé mới sẽ phải lấp bằng câu ở mức khó hơn.
const GROUPS_PER_BUCKET = 20;
const VARIANTS_PER_GROUP = 2;
const DIFFICULTIES = ['easy', 'medium', 'hard'];

// ── RNG có seed: chạy lại cho ra đúng bộ câu cũ, nên `code` ổn định ──
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

const R = {
  int: (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1)),
  pick: (rng, arr) => arr[Math.floor(rng() * arr.length)],
  /**
   * Dãy `n` số nguyên KHÁC NHAU trong [lo, hi].
   * Cần thiết cho các câu so sánh/thống kê: nếu hai số bằng nhau thì câu hỏi
   * "số nào lớn nhất" có HAI đáp án đúng, còn "sắp xếp từ bé đến lớn" lại viết
   * ra "3 < 5 < 5" — sai toán.
   */
  ints: (rng, lo, hi, n) => {
    const out = [];
    const used = new Set();
    for (let guard = 0; out.length < n && guard < (hi - lo + 1) * 8; guard++) {
      const v = lo + Math.floor(rng() * (hi - lo + 1));
      if (used.has(v)) continue;
      used.add(v);
      out.push(v);
    }
    return out;
  },
  /**
   * Lấy `n` phần tử KHÁC NHAU. Câu đáp án dạng chữ không bù nhiễu tự động được
   * (khác câu số), nên bốc trùng là mất luôn câu đó — phải lấy mẫu không lặp.
   */
  sample: (rng, arr, n, exclude = []) => {
    const pool = arr.filter((x) => !exclude.includes(x));
    const out = [];
    const used = new Set();
    for (let guard = 0; out.length < n && guard < pool.length * 6; guard++) {
      const i = Math.floor(rng() * pool.length);
      if (used.has(i)) continue;
      used.add(i);
      out.push(pool[i]);
    }
    return out;
  },
};

/** Tạo câu trắc nghiệm: khử trùng đáp án nhiễu, xáo trộn theo rng. */
function mc(rng, questionText, correct, distractors, explanation) {
  const c = String(correct);
  const opts = [c];
  // Đáp án đúng không âm thì nhiễu cũng không được âm: học sinh tiểu học chưa
  // học số âm, một lựa chọn "−4" vừa vô nghĩa vừa lộ ngay là đáp án sai.
  const correctNum = Number(c);
  const allowNegative = Number.isFinite(correctNum) && correctNum < 0;
  for (const d of distractors) {
    const s = String(d);
    const n = Number(s);
    if (!allowNegative && Number.isFinite(n) && n < 0) continue;
    if (s !== c && !opts.includes(s) && s !== 'NaN' && s !== 'undefined') opts.push(s);
  }
  // Thiếu nhiễu thì bù bằng số lệch quanh đáp án. Chỉ làm được khi đáp án là số
  // thuần; đáp án dạng chữ mà thiếu nhiễu là lỗi của bộ sinh, để khâu kiểm tra
  // chất lượng bắt chứ không bịa thêm đáp án vô nghĩa.
  const asNumber = Number(c);
  if (Number.isFinite(asNumber) && c.trim() !== '') {
    for (let k = 1; opts.length < 4 && k <= 30; k++) {
      for (const cand of [String(asNumber + k), String(asNumber - k)]) {
        if (!allowNegative && Number(cand) < 0) continue;
        if (opts.length < 4 && !opts.includes(cand) && cand !== 'NaN') opts.push(cand);
      }
    }
  }
  if (opts.length < 4) return null;
  const four = opts.slice(0, 4);
  // Xáo trộn Fisher–Yates bằng rng để đáp án đúng không luôn ở một chỗ.
  for (let i = four.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [four[i], four[j]] = [four[j], four[i]];
  }
  return { questionText, optionsJson: four, correctIndex: four.indexOf(c), explanation };
}

// Phạm vi số theo lớp × mức — giữ bài toán vừa sức từng lớp.
const RANGE = {
  1: { easy: 10, medium: 20, hard: 100 },
  2: { easy: 20, medium: 100, hard: 1000 },
  3: { easy: 100, medium: 1000, hard: 10000 },
  4: { easy: 1000, medium: 100000, hard: 1000000 },
  5: { easy: 1000, medium: 100000, hard: 1000000 },
};

// [tên, đơn vị, động từ "bớt đi"] — động từ phải hợp với vật, không thể
// "ăn mất 3 quyển vở" hay "dùng hết 3 con gà".
const NOUNS = [
  ['quả táo', 'quả', 'ăn mất'],
  ['cái kẹo', 'cái', 'ăn mất'],
  ['cái bánh', 'cái', 'ăn mất'],
  ['quyển vở', 'quyển', 'dùng hết'],
  ['chiếc bút', 'chiếc', 'dùng hết'],
  ['bông hoa', 'bông', 'tặng bạn'],
  ['viên bi', 'viên', 'cho bạn'],
  ['con gà', 'con', 'bán đi'],
];

// ── Bộ sinh theo kỹ năng ─────────────────────────────────────────────────
// Mỗi bộ nhận (rng, grade, difficulty) và trả về một câu hoàn chỉnh.
// Giải thích luôn nêu CÁCH LÀM, vì đó là điểm khác biệt so với kho câu SGK.

const GEN = {};

GEN['dem-so'] = (rng, g, d) => {
  const max = RANGE[g][d];
  const n = R.int(rng, Math.max(2, Math.floor(max / 10)), max);
  const kind = R.pick(rng, g <= 2 ? ['lien-truoc', 'lien-sau', 'chuc-donvi'] : ['lien-sau', 'chuc-donvi', 'hang']);
  if (kind === 'lien-truoc') {
    return mc(rng, `Số liền trước của ${n} là số nào?`, n - 1, [n + 1, n - 2, n + 2],
      `Số liền trước là số bé hơn 1 đơn vị. Lấy ${n} − 1 = ${n - 1}.`);
  }
  if (kind === 'lien-sau') {
    return mc(rng, `Số liền sau của ${n} là số nào?`, n + 1, [n - 1, n + 2, n - 2],
      `Số liền sau là số lớn hơn 1 đơn vị. Lấy ${n} + 1 = ${n + 1}.`);
  }
  if (kind === 'chuc-donvi') {
    const v = R.int(rng, 11, 99);
    const chuc = Math.floor(v / 10), donvi = v % 10;
    return mc(rng, `Số ${v} gồm mấy chục và mấy đơn vị?`, `${chuc} chục ${donvi} đơn vị`,
      [`${donvi} chục ${chuc} đơn vị`, `${chuc} chục ${chuc} đơn vị`, `${chuc + 1} chục ${donvi} đơn vị`],
      `Tách ${v} = ${chuc * 10} + ${donvi}. Chữ số bên trái là hàng chục (${chuc}), chữ số bên phải là hàng đơn vị (${donvi}).`);
  }
  const v = R.int(rng, 1000, 9999);
  const tram = Math.floor(v / 100) % 10;
  return mc(rng, `Trong số ${v}, chữ số hàng trăm là chữ số nào?`, tram,
    [Math.floor(v / 1000), v % 10, Math.floor(v / 10) % 10],
    `Đọc từ phải sang trái: đơn vị → chục → trăm. Chữ số thứ ba từ phải của ${v} là ${tram}.`);
};

GEN['so-sanh-so'] = (rng, g, d) => {
  const max = RANGE[g][d];
  const a = R.int(rng, 1, max);
  let b = R.int(rng, 1, max);
  if (b === a) b = a + 1;
  const dau = a > b ? '>' : '<';
  const kind = R.pick(rng, ['dau', 'lon-nhat', 'sap-xep']);
  if (kind === 'dau') {
    return mc(rng, `Điền dấu thích hợp: ${a} ☐ ${b}`, dau, ['<', '>', '='],
      `So sánh ${a} và ${b}: ${a > b ? `${a} lớn hơn ${b}` : `${a} bé hơn ${b}`}, nên điền dấu "${dau}".`);
  }
  if (kind === 'lon-nhat') {
    const arr = R.ints(rng, 1, max, 4);
    const mx = Math.max(...arr);
    return mc(rng, `Số nào lớn nhất trong các số: ${arr.join('; ')}?`, mx, arr.filter((x) => x !== mx),
      `So sánh lần lượt từng số. Số lớn nhất là ${mx}.`);
  }
  const arr = R.ints(rng, 1, max, 3);
  const sorted = [...arr].sort((x, y) => x - y);
  return mc(rng, `Sắp xếp các số sau từ bé đến lớn: ${arr.join('; ')}`, sorted.join(' < '),
    [[...arr].sort((x, y) => y - x).join(' < '), arr.join(' < '), [...sorted].reverse().join(' < ')],
    `Xếp từ bé đến lớn nghĩa là số nhỏ đứng trước: ${sorted.join(' < ')}.`);
};

GEN['cong-tru'] = (rng, g, d) => {
  const max = RANGE[g][d];
  const a = R.int(rng, 2, max);
  const b = R.int(rng, 1, Math.max(2, Math.min(a, max)));
  if (rng() < 0.5) {
    const kq = a + b;
    return mc(rng, `${a} + ${b} = ?`, kq, [kq - 1, kq + 1, a - b],
      `Cộng ${a} với ${b}: ${a} + ${b} = ${kq}. Có thể đếm thêm ${b} đơn vị từ ${a}.`);
  }
  const kq = a - b;
  return mc(rng, `${a} − ${b} = ?`, kq, [kq + 1, kq - 1, a + b],
    `Trừ đi ${b} từ ${a}: ${a} − ${b} = ${kq}. Thử lại bằng phép cộng: ${kq} + ${b} = ${a}.`);
};

GEN['phep-nhan'] = (rng, g, d) => {
  // Bảng nhân ở lớp 1–3 dừng ở 9; lớp 4–5 mới mở rộng.
  const hi = Math.min(d === 'easy' ? 5 : d === 'medium' ? 9 : 12, g <= 3 ? 9 : 12);
  const a = R.int(rng, 2, hi);
  const b = g >= 3 && d === 'hard' ? R.int(rng, 11, 99) : R.int(rng, 2, hi);
  const kq = a * b;
  if (rng() < 0.3) {
    return mc(rng, `Phép nhân nào có kết quả bằng ${kq}?`, `${a} × ${b}`,
      [`${a} × ${b + 1}`, `${a + 1} × ${b}`, `${a} + ${b}`],
      `${a} × ${b} = ${kq}. Nhân là cộng ${a} lặp lại ${b} lần.`);
  }
  return mc(rng, `${a} × ${b} = ?`, kq, [kq + a, kq - a, a + b],
    `${a} × ${b} nghĩa là cộng ${a} lặp lại ${b} lần: ${a} × ${b} = ${kq}.`);
};

GEN['phep-chia'] = (rng, g, d) => {
  // Lớp 1–3 chỉ chia cho SỐ CÓ MỘT CHỮ SỐ; chia cho số hai chữ số là lớp 4 trở lên.
  const maxDivisor = g <= 3 ? 9 : 12;
  const hi = Math.min(d === 'easy' ? 5 : d === 'medium' ? 9 : 12, maxDivisor);
  const b = R.int(rng, 2, hi);
  const q = g >= 3 && d === 'hard' ? R.int(rng, 11, 99) : R.int(rng, 2, hi);
  const a = b * q;
  if (d === 'hard' && rng() < 0.3) {
    const du = R.int(rng, 1, b - 1);
    return mc(rng, `${a + du} : ${b} = ? (dư mấy?)`, `${q} dư ${du}`,
      [`${q} dư ${du + 1}`, `${q + 1} dư ${du}`, `${q} dư 0`],
      `Tìm số lớn nhất nhân với ${b} mà không vượt quá ${a + du}: ${b} × ${q} = ${a}. Còn thừa ${a + du} − ${a} = ${du}. Vậy được ${q} dư ${du}.`);
  }
  return mc(rng, `${a} : ${b} = ?`, q, [q + 1, q - 1, a - b],
    `Chia là tìm số còn thiếu trong phép nhân. Vì ${b} × ${q} = ${a} nên ${a} : ${b} = ${q}.`);
};

GEN['tim-thanh-phan'] = (rng, g, d) => {
  const max = RANGE[g][d];
  const kind = R.pick(rng, ['cong', 'tru', 'nhan', 'chia']);
  if (kind === 'cong') {
    const x = R.int(rng, 2, max), b = R.int(rng, 1, max);
    return mc(rng, `Tìm x, biết: x + ${b} = ${x + b}`, x, [x + b, x - b, b],
      `Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng kia: x = ${x + b} − ${b} = ${x}.`);
  }
  if (kind === 'tru') {
    const x = R.int(rng, 2, max), b = R.int(rng, 1, x);
    return mc(rng, `Tìm x, biết: x − ${b} = ${x - b}`, x, [x - b, x - 2 * b, b],
      `Muốn tìm số bị trừ, lấy hiệu cộng số trừ: x = ${x - b} + ${b} = ${x}.`);
  }
  if (kind === 'nhan') {
    const x = R.int(rng, 2, 12), b = R.int(rng, 2, 9);
    return mc(rng, `Tìm x, biết: x × ${b} = ${x * b}`, x, [x * b, x + b, b],
      `Muốn tìm thừa số chưa biết, lấy tích chia thừa số kia: x = ${x * b} : ${b} = ${x}.`);
  }
  const x = R.int(rng, 2, 12), b = R.int(rng, 2, 9);
  return mc(rng, `Tìm x, biết: x : ${b} = ${x}`, x * b, [x, x + b, x * b + b],
    `Muốn tìm số bị chia, lấy thương nhân số chia: x = ${x} × ${b} = ${x * b}.`);
};

GEN['toan-loi-van'] = (rng, g, d) => {
  const [noun, dv, verbBot] = R.pick(rng, NOUNS);
  const max = d === 'easy' ? 20 : d === 'medium' ? 100 : 500;
  const kind = R.pick(rng, g <= 2 ? ['them', 'bot'] : ['them', 'bot', 'chia-deu', 'hai-buoc']);
  if (kind === 'them') {
    const a = R.int(rng, 2, max), b = R.int(rng, 2, max);
    return mc(rng, `Lan có ${a} ${noun}, mẹ cho thêm ${b} ${noun}. Hỏi Lan có tất cả bao nhiêu ${noun}?`,
      a + b, [a - b, a + b + 1, b],
      `"Cho thêm" nghĩa là nhiều hơn lúc đầu, nên làm phép cộng: ${a} + ${b} = ${a + b} ${dv}.`);
  }
  if (kind === 'bot') {
    const a = R.int(rng, 5, max), b = R.int(rng, 1, a - 1);
    return mc(rng, `Nam có ${a} ${noun}, đã ${verbBot} ${b} ${noun}. Hỏi còn lại bao nhiêu ${noun}?`,
      a - b, [a + b, a - b - 1, b],
      `"${verbBot.charAt(0).toUpperCase() + verbBot.slice(1)}" nghĩa là ít đi, nên làm phép trừ: ${a} − ${b} = ${a - b} ${dv}.`);
  }
  if (kind === 'chia-deu') {
    const n = R.int(rng, 2, 9), each = R.int(rng, 2, 12);
    return mc(rng, `Có ${n * each} ${noun} chia đều cho ${n} bạn. Hỏi mỗi bạn được bao nhiêu ${noun}?`,
      each, [each + 1, n, n * each - n],
      `"Chia đều cho ${n} bạn" nên làm phép chia: ${n * each} : ${n} = ${each} ${dv} mỗi bạn.`);
  }
  // Dựng ngược từ đáp án để số còn lại LUÔN chia hết — tránh sinh ra bài mà
  // lời giải phải làm tròn (18 : 4 không bằng 4).
  const n = R.int(rng, 2, 6);
  const each = R.int(rng, 2, 12);
  const conlai = n * each;
  const b = R.int(rng, 2, 9);
  const a = conlai + b;
  return mc(rng, `Có ${a} ${noun}, đã ${verbBot} ${b} ${noun}, số còn lại chia đều cho ${n} bạn. Hỏi mỗi bạn được mấy ${noun}?`,
    each, [each + 1, conlai, a - b - n],
    `Bài này làm 2 bước. Bước 1 — còn lại: ${a} − ${b} = ${conlai} ${dv}. Bước 2 — chia đều: ${conlai} : ${n} = ${each} ${dv} mỗi bạn.`);
};

GEN['hinh-hoc'] = (rng, g, d) => {
  const facts = [
    ['Hình vuông có mấy cạnh bằng nhau?', 4, [3, 2, 5], 'Hình vuông có 4 cạnh và cả 4 cạnh đều bằng nhau.'],
    ['Hình tam giác có mấy cạnh?', 3, [4, 2, 5], 'Tam giác là hình có 3 cạnh và 3 góc.'],
    ['Hình chữ nhật có mấy góc vuông?', 4, [2, 3, 0], 'Hình chữ nhật có 4 góc và cả 4 góc đều là góc vuông.'],
    ['Khối lập phương có mấy mặt?', 6, [4, 8, 12], 'Khối lập phương có 6 mặt, mỗi mặt là một hình vuông bằng nhau.'],
    ['Khối lập phương có mấy đỉnh?', 8, [6, 12, 4], 'Khối lập phương có 8 đỉnh — đếm 4 đỉnh mặt trên và 4 đỉnh mặt dưới.'],
    ['Khối hộp chữ nhật có mấy cạnh?', 12, [8, 6, 4], 'Khối hộp chữ nhật có 12 cạnh: 4 cạnh dài, 4 cạnh rộng và 4 cạnh cao.'],
    ['Góc vuông có số đo bằng bao nhiêu độ?', '90°', ['45°', '180°', '60°'], 'Góc vuông là góc đo được đúng 90°, giống góc của tờ giấy.'],
    ['Góc bẹt có số đo bằng bao nhiêu độ?', '180°', ['90°', '360°', '120°'], 'Góc bẹt là góc mở thẳng thành một đường thẳng, đo được 180°.'],
    ['Hình chữ nhật có mấy cạnh?', 4, [3, 5, 6], 'Hình chữ nhật có 4 cạnh: hai cạnh dài bằng nhau và hai cạnh rộng bằng nhau.'],
    ['Hình tam giác có mấy góc?', 3, [4, 2, 6], 'Tam giác có 3 cạnh thì cũng có 3 góc.'],
    ['Hình tròn có mấy cạnh?', 0, [1, 2, 4], 'Hình tròn không có cạnh thẳng nào, chỉ có một đường cong khép kín.'],
    ['Hình vuông có mấy góc vuông?', 4, [2, 3, 0], 'Hình vuông có 4 góc và cả 4 góc đều vuông.'],
    ['Hình lập phương có mấy mặt là hình vuông?', 6, [4, 8, 12], 'Cả 6 mặt của hình lập phương đều là hình vuông bằng nhau.'],
    ['Khối hộp chữ nhật có mấy đỉnh?', 8, [6, 12, 4], 'Khối hộp chữ nhật cũng có 8 đỉnh như khối lập phương.'],
    ['Góc nhọn có số đo thế nào?', 'Bé hơn 90°', ['Bằng 90°', 'Lớn hơn 90°', 'Bằng 180°'], 'Góc nhọn là góc nhỏ hơn góc vuông, tức là bé hơn 90°.'],
    ['Góc tù có số đo thế nào?', 'Lớn hơn 90° và bé hơn 180°', ['Bé hơn 90°', 'Bằng 90°', 'Bằng 180°'], 'Góc tù mở rộng hơn góc vuông nhưng chưa thành góc bẹt.'],
    ['Hình bình hành có mấy cặp cạnh song song?', 2, [1, 3, 0], 'Hình bình hành có 2 cặp cạnh đối diện song song với nhau.'],
    ['Hình thoi có đặc điểm gì?', 'Bốn cạnh bằng nhau', ['Bốn góc vuông', 'Chỉ có ba cạnh', 'Không có cạnh nào'], 'Hình thoi là hình có 4 cạnh bằng nhau nhưng các góc không nhất thiết vuông.'],
    ['Hình thang có mấy cạnh?', 4, [3, 5, 6], 'Hình thang có 4 cạnh, trong đó có một cặp cạnh đối song song.'],
    ['Trung điểm của đoạn thẳng là điểm thế nào?', 'Chia đoạn thẳng thành hai phần bằng nhau', ['Nằm ngoài đoạn thẳng', 'Là một đầu mút', 'Chia thành ba phần'], 'Trung điểm nằm chính giữa và chia đoạn thẳng thành hai phần dài bằng nhau.'],
    ['Hai đường thẳng song song thì thế nào?', 'Không bao giờ cắt nhau', ['Cắt nhau tại một điểm', 'Vuông góc với nhau', 'Trùng nhau'], 'Hai đường thẳng song song luôn cách đều nhau nên không bao giờ cắt nhau.'],
    ['Hai đường thẳng vuông góc tạo thành góc gì?', 'Góc vuông', ['Góc nhọn', 'Góc tù', 'Góc bẹt'], 'Hai đường thẳng vuông góc cắt nhau tạo thành góc 90°, tức góc vuông.'],
  ];
  if (g >= 3 && rng() < 0.4) {
    const r = R.int(rng, 2, 20);
    return mc(rng, `Hình tròn có bán kính ${r} cm. Đường kính hình tròn đó dài bao nhiêu xăng-ti-mét?`,
      `${r * 2} cm`, [`${r} cm`, `${r * 4} cm`, `${r + 2} cm`],
      `Đường kính gấp đôi bán kính: ${r} × 2 = ${r * 2} cm.`);
  }
  const [q, c, ds, ex] = R.pick(rng, facts);
  return mc(rng, q, c, ds, ex);
};

GEN['chu-vi-dien-tich'] = (rng, g, d) => {
  const a = R.int(rng, 2, d === 'easy' ? 10 : 30);
  const b = R.int(rng, 2, d === 'easy' ? 10 : 30);
  const kind = R.pick(rng, ['cv-cn', 'dt-cn', 'cv-vuong', 'dt-vuong']);
  if (kind === 'cv-cn') {
    return mc(rng, `Hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm. Chu vi hình đó bằng bao nhiêu?`,
      `${(a + b) * 2} cm`, [`${a * b} cm`, `${a + b} cm`, `${(a + b) * 4} cm`],
      `Chu vi hình chữ nhật = (dài + rộng) × 2 = (${a} + ${b}) × 2 = ${(a + b) * 2} cm.`);
  }
  if (kind === 'dt-cn') {
    return mc(rng, `Hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm. Diện tích hình đó bằng bao nhiêu?`,
      `${a * b} cm²`, [`${(a + b) * 2} cm²`, `${a + b} cm²`, `${a * b * 2} cm²`],
      `Diện tích hình chữ nhật = dài × rộng = ${a} × ${b} = ${a * b} cm².`);
  }
  if (kind === 'cv-vuong') {
    return mc(rng, `Hình vuông có cạnh ${a} cm. Chu vi hình vuông đó bằng bao nhiêu?`,
      `${a * 4} cm`, [`${a * a} cm`, `${a * 2} cm`, `${a + 4} cm`],
      `Chu vi hình vuông = cạnh × 4 = ${a} × 4 = ${a * 4} cm.`);
  }
  return mc(rng, `Hình vuông có cạnh ${a} cm. Diện tích hình vuông đó bằng bao nhiêu?`,
    `${a * a} cm²`, [`${a * 4} cm²`, `${a * 2} cm²`, `${a * a * 2} cm²`],
    `Diện tích hình vuông = cạnh × cạnh = ${a} × ${a} = ${a * a} cm².`);
};

GEN['the-tich'] = (rng, g, d) => {
  const a = R.int(rng, 2, 12);
  if (rng() < 0.5) {
    return mc(rng, `Hình lập phương có cạnh ${a} cm. Thể tích hình đó bằng bao nhiêu?`,
      `${a ** 3} cm³`, [`${a * a} cm³`, `${a * 6} cm³`, `${a * 3} cm³`],
      `Thể tích hình lập phương = cạnh × cạnh × cạnh = ${a} × ${a} × ${a} = ${a ** 3} cm³.`);
  }
  const b = R.int(rng, 2, 12), c = R.int(rng, 2, 12);
  return mc(rng, `Hình hộp chữ nhật có chiều dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích bằng bao nhiêu?`,
    `${a * b * c} cm³`, [`${a * b} cm³`, `${(a + b + c) * 2} cm³`, `${a + b + c} cm³`],
    `Thể tích hình hộp chữ nhật = dài × rộng × cao = ${a} × ${b} × ${c} = ${a * b * c} cm³.`);
};

GEN['do-luong'] = (rng, g, d) => {
  const table = [
    ['kg', 'g', 1000, 'ki-lô-gam', 'gam'],
    ['m', 'cm', 100, 'mét', 'xăng-ti-mét'],
    ['km', 'm', 1000, 'ki-lô-mét', 'mét'],
    ['dm', 'cm', 10, 'đề-xi-mét', 'xăng-ti-mét'],
    ['l', 'ml', 1000, 'lít', 'mi-li-lít'],
  ];
  const [big, small, k, bigName, smallName] = R.pick(rng, table);
  const n = R.int(rng, 2, d === 'easy' ? 9 : 40);
  if (rng() < 0.5) {
    return mc(rng, `${n} ${big} = ? ${small}`, n * k, [n * k * 10, n + k, Math.round((n * k) / 10)],
      `1 ${bigName} = ${k} ${smallName}, nên ${n} ${big} = ${n} × ${k} = ${n * k} ${small}.`);
  }
  return mc(rng, `${n * k} ${small} = ? ${big}`, n, [n * k, n * 10, Math.round(n / 10)],
    `${k} ${smallName} = 1 ${bigName}, nên ${n * k} ${small} = ${n * k} : ${k} = ${n} ${big}.`);
};

GEN['thoi-gian'] = (rng, g, d) => {
  const kind = R.pick(rng, ['doi', 'sau-bao-lau', 'ngay']);
  if (kind === 'doi') {
    const h = R.int(rng, 1, 9);
    return mc(rng, `${h} giờ = ? phút`, h * 60, [h * 100, h + 60, h * 30],
      `1 giờ = 60 phút, nên ${h} giờ = ${h} × 60 = ${h * 60} phút.`);
  }
  if (kind === 'sau-bao-lau') {
    const h = R.int(rng, 1, 10), m = R.pick(rng, [15, 20, 30, 45]);
    const add = R.pick(rng, [15, 30, 45]);
    const tot = m + add, nh = h + Math.floor(tot / 60), nm = tot % 60;
    return mc(rng, `Bây giờ là ${h} giờ ${m} phút. Sau ${add} phút nữa là mấy giờ?`,
      `${nh} giờ ${nm} phút`, [`${h} giờ ${tot} phút`, `${nh + 1} giờ ${nm} phút`, `${h} giờ ${nm} phút`],
      `Cộng số phút: ${m} + ${add} = ${tot} phút. Vì 60 phút = 1 giờ nên đổi thành ${nh} giờ ${nm} phút.`);
  }
  const w = R.int(rng, 2, 8);
  return mc(rng, `${w} tuần = ? ngày`, w * 7, [w * 10, w + 7, w * 5],
    `1 tuần có 7 ngày, nên ${w} tuần = ${w} × 7 = ${w * 7} ngày.`);
};

GEN['tien-viet'] = (rng, g, d) => {
  const gia = R.int(rng, 2, 20) * 1000;
  const sl = R.int(rng, 2, 6);
  if (rng() < 0.5) {
    return mc(rng, `Một quyển vở giá ${gia.toLocaleString('vi-VN')} đồng. Mua ${sl} quyển hết bao nhiêu tiền?`,
      `${(gia * sl).toLocaleString('vi-VN')} đồng`,
      [`${(gia + sl).toLocaleString('vi-VN')} đồng`, `${(gia * (sl + 1)).toLocaleString('vi-VN')} đồng`, `${gia.toLocaleString('vi-VN')} đồng`],
      `Mua ${sl} quyển cùng giá thì làm phép nhân: ${gia.toLocaleString('vi-VN')} × ${sl} = ${(gia * sl).toLocaleString('vi-VN')} đồng.`);
  }
  const dua = Math.ceil((gia * sl) / 10000) * 10000 + 10000;
  const thua = dua - gia * sl;
  return mc(rng, `Mua ${sl} quyển vở, mỗi quyển ${gia.toLocaleString('vi-VN')} đồng. Đưa ${dua.toLocaleString('vi-VN')} đồng thì được trả lại bao nhiêu?`,
    `${thua.toLocaleString('vi-VN')} đồng`,
    [`${(gia * sl).toLocaleString('vi-VN')} đồng`, `${(thua + 1000).toLocaleString('vi-VN')} đồng`, `${dua.toLocaleString('vi-VN')} đồng`],
    `Bước 1 — tiền hàng: ${gia.toLocaleString('vi-VN')} × ${sl} = ${(gia * sl).toLocaleString('vi-VN')} đồng. Bước 2 — tiền trả lại: ${dua.toLocaleString('vi-VN')} − ${(gia * sl).toLocaleString('vi-VN')} = ${thua.toLocaleString('vi-VN')} đồng.`);
};

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

GEN['phan-so'] = (rng, g, d) => {
  const kind = R.pick(rng, ['cong-cung-mau', 'rut-gon', 'so-sanh', 'phan-so-cua-so']);
  if (kind === 'cong-cung-mau') {
    const m = R.int(rng, 3, 12), a = R.int(rng, 1, m - 1), b = R.int(rng, 1, m - a);
    return mc(rng, `Tính: ${a}/${m} + ${b}/${m}`, `${a + b}/${m}`,
      [`${a + b}/${m * 2}`, `${a * b}/${m}`, `${a + b}/${m + m}`],
      `Hai phân số cùng mẫu số thì cộng tử số, giữ nguyên mẫu số: (${a} + ${b})/${m} = ${a + b}/${m}.`);
  }
  if (kind === 'rut-gon') {
    const k = R.int(rng, 2, 6), a = R.int(rng, 1, 8), m = a + R.int(rng, 1, 8);
    const A = a * k, M = m * k, gg = gcd(A, M);
    return mc(rng, `Rút gọn phân số ${A}/${M} về phân số tối giản.`, `${A / gg}/${M / gg}`,
      [`${A}/${M}`, `${A / k}/${M}`, `${A}/${M / k}`],
      `Chia cả tử và mẫu cho ước chung lớn nhất là ${gg}: ${A} : ${gg} = ${A / gg}, ${M} : ${gg} = ${M / gg}. Vậy được ${A / gg}/${M / gg}.`);
  }
  if (kind === 'so-sanh') {
    const m = R.int(rng, 3, 12), a = R.int(rng, 1, m - 1);
    let b = R.int(rng, 1, m - 1); if (b === a) b = a === 1 ? 2 : a - 1;
    const dau = a > b ? '>' : '<';
    return mc(rng, `Điền dấu thích hợp: ${a}/${m} ☐ ${b}/${m}`, dau, ['<', '>', '='],
      `Hai phân số cùng mẫu số thì phân số nào có tử số lớn hơn thì lớn hơn. Vì ${a} ${a > b ? '>' : '<'} ${b} nên ${a}/${m} ${dau} ${b}/${m}.`);
  }
  const m = R.int(rng, 2, 6), a = 1, n = m * R.int(rng, 2, 12);
  return mc(rng, `Tìm ${a}/${m} của ${n}.`, n / m, [n * m, n - m, n / m + 1],
    `Muốn tìm ${a}/${m} của một số, ta lấy số đó chia cho ${m}: ${n} : ${m} = ${n / m}.`);
};

GEN['so-thap-phan'] = (rng, g, d) => {
  const kind = R.pick(rng, ['cong', 'nhan-10', 'chia-10', 'so-sanh']);
  const a = R.int(rng, 1, 99) / 10 + R.int(rng, 0, 9) / 100;
  const A = Math.round(a * 100) / 100;
  if (kind === 'cong') {
    const B = Math.round((R.int(rng, 1, 99) / 10) * 100) / 100;
    const kq = Math.round((A + B) * 100) / 100;
    return mc(rng, `Tính: ${String(A).replace('.', ',')} + ${String(B).replace('.', ',')}`,
      String(kq).replace('.', ','),
      [String(Math.round((A - B) * 100) / 100).replace('.', ','), String(kq + 1).replace('.', ','), String(Math.round(A * B * 100) / 100).replace('.', ',')],
      `Viết hai số thẳng cột dấu phẩy rồi cộng như số tự nhiên: ${String(A).replace('.', ',')} + ${String(B).replace('.', ',')} = ${String(kq).replace('.', ',')}.`);
  }
  if (kind === 'nhan-10') {
    const kq = Math.round(A * 10 * 100) / 100;
    return mc(rng, `${String(A).replace('.', ',')} × 10 = ?`, String(kq).replace('.', ','),
      [String(Math.round(A * 100 * 100) / 100).replace('.', ','), String(Math.round((A / 10) * 100) / 100).replace('.', ','), String(A).replace('.', ',')],
      `Nhân một số thập phân với 10, ta chuyển dấu phẩy sang PHẢI một chữ số: ${String(A).replace('.', ',')} × 10 = ${String(kq).replace('.', ',')}.`);
  }
  if (kind === 'chia-10') {
    const kq = Math.round((A / 10) * 1000) / 1000;
    return mc(rng, `${String(A).replace('.', ',')} : 10 = ?`, String(kq).replace('.', ','),
      [String(Math.round(A * 10 * 100) / 100).replace('.', ','), String(A).replace('.', ','), String(Math.round((A / 100) * 10000) / 10000).replace('.', ',')],
      `Chia một số thập phân cho 10, ta chuyển dấu phẩy sang TRÁI một chữ số: ${String(A).replace('.', ',')} : 10 = ${String(kq).replace('.', ',')}.`);
  }
  const B = Math.round((A + R.int(rng, 1, 20) / 100) * 100) / 100;
  return mc(rng, `Điền dấu thích hợp: ${String(A).replace('.', ',')} ☐ ${String(B).replace('.', ',')}`, '<', ['<', '>', '='],
    `So sánh phần nguyên trước, bằng nhau thì so tiếp từng chữ số sau dấu phẩy. Ở đây ${String(A).replace('.', ',')} bé hơn ${String(B).replace('.', ',')}.`);
};

GEN['ti-so-phan-tram'] = (rng, g, d) => {
  const pct = R.pick(rng, [10, 20, 25, 50, 75]);
  const n = R.int(rng, 2, 40) * 20;
  const kq = (n * pct) / 100;
  if (rng() < 0.5) {
    return mc(rng, `Tìm ${pct}% của ${n}.`, kq, [n - kq, kq * 2, n / pct],
      `Muốn tìm ${pct}% của ${n}, ta lấy ${n} × ${pct} : 100 = ${kq}.`);
  }
  // Sĩ số phải thật — "lớp có 340 học sinh" thì bài toán mất tin cậy.
  const siSo = R.pick(rng, [20, 25, 30, 40, 50]);
  const gioi = (siSo * pct) / 100;
  return mc(rng, `Lớp có ${siSo} học sinh, trong đó ${gioi} bạn là học sinh giỏi. Hỏi số học sinh giỏi chiếm bao nhiêu phần trăm?`,
    `${pct}%`, [`${pct + 10}%`, `${Math.round(pct / 2)}%`, `${100 - pct}%`],
    `Lấy số học sinh giỏi chia số học sinh cả lớp rồi nhân 100: ${gioi} : ${siSo} × 100 = ${pct}%.`);
};

GEN['chuyen-dong'] = (rng, g, d) => {
  // Phương tiện phải hợp vận tốc — "ô tô đi 5 km/giờ" là sai thực tế.
  const VEHICLES = [
    [[4, 5, 6], 'người đi bộ'],
    [[12, 15, 18], 'người đi xe đạp'],
    [[30, 40, 45], 'xe máy'],
    [[50, 60, 80], 'ô tô'],
  ];
  const [speeds, vehicle] = R.pick(rng, VEHICLES);
  const v = R.pick(rng, speeds);
  const t = R.int(rng, 2, 6);
  const s = v * t;
  const kind = R.pick(rng, ['s', 'v', 't']);
  if (kind === 's') {
    return mc(rng, `Một ${vehicle} đi với vận tốc ${v} km/giờ trong ${t} giờ. Hỏi đi được quãng đường bao nhiêu ki-lô-mét?`,
      `${s} km`, [`${v + t} km`, `${Math.round(v / t)} km`, `${s + v} km`],
      `Quãng đường = vận tốc × thời gian: ${v} × ${t} = ${s} km.`);
  }
  if (kind === 'v') {
    return mc(rng, `Một ${vehicle} đi ${s} km hết ${t} giờ. Hỏi vận tốc là bao nhiêu ki-lô-mét trên giờ?`,
      `${v} km/giờ`, [`${s} km/giờ`, `${v * t} km/giờ`, `${v + t} km/giờ`],
      `Vận tốc = quãng đường : thời gian: ${s} : ${t} = ${v} km/giờ.`);
  }
  return mc(rng, `Một ${vehicle} đi ${s} km với vận tốc ${v} km/giờ. Hỏi đi hết bao nhiêu giờ?`,
    `${t} giờ`, [`${s} giờ`, `${v} giờ`, `${t + 1} giờ`],
    `Thời gian = quãng đường : vận tốc: ${s} : ${v} = ${t} giờ.`);
};

GEN['thong-ke'] = (rng, g, d) => {
  const n = R.int(rng, 4, 5);
  // Số liệu các ngày phải KHÁC NHAU, nếu không câu "ngày nào đọc nhiều nhất"
  // có hai đáp án cùng đúng.
  const vals = R.ints(rng, 2, 30, n);
  const kind = R.pick(rng, ['tong', 'nhieu-nhat', 'trung-binh']);
  const names = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'].slice(0, n);
  const bang = names.map((x, i) => `${x}: ${vals[i]}`).join('; ');
  if (kind === 'tong') {
    const tong = vals.reduce((a, b) => a + b, 0);
    return mc(rng, `Số quyển sách bạn Nam đọc mỗi ngày: ${bang}. Hỏi cả tuần Nam đọc bao nhiêu quyển?`,
      tong, [tong - vals[0], Math.max(...vals), Math.round(tong / n)],
      `Cộng số sách của tất cả các ngày: ${vals.join(' + ')} = ${tong} quyển.`);
  }
  if (kind === 'nhieu-nhat') {
    const mx = Math.max(...vals);
    const day = names[vals.indexOf(mx)];
    return mc(rng, `Số quyển sách bạn Nam đọc mỗi ngày: ${bang}. Ngày nào Nam đọc nhiều sách nhất?`,
      day, names.filter((x) => x !== day),
      `So sánh các số ${vals.join('; ')}, số lớn nhất là ${mx} — rơi vào ${day}.`);
  }
  // Dựng số liệu quanh một trung bình cho trước bằng các ĐỘ LỆCH cộng lại bằng 0
  // → tổng chia hết cho số ngày, lời giải không phải làm tròn, mà các ngày vẫn
  // khác nhau (cách cũ có đường lui khiến cả 5 ngày cùng một số).
  const tbWanted = R.int(rng, 6, 25);
  const lech = R.ints(rng, -Math.min(5, tbWanted - 2), 5, n - 1);
  const fixed = [...lech, -lech.reduce((a, b) => a + b, 0)].map((o) => tbWanted + o);
  const tong = fixed.reduce((a, b) => a + b, 0);
  const tb = tong / n;
  const bangTb = names.map((x, i) => `${x}: ${fixed[i]}`).join('; ');
  return mc(rng, `Số quyển sách bạn Nam đọc mỗi ngày: ${bangTb}. Trung bình mỗi ngày Nam đọc bao nhiêu quyển?`,
    tb, [tong, Math.max(...fixed), tb + 1],
    `Trung bình cộng = tổng : số ngày. Tổng là ${fixed.join(' + ')} = ${tong}, có ${n} ngày, nên ${tong} : ${n} = ${tb} quyển.`);
};

GEN['tu-duy-toan'] = (rng, g, d) => {
  const kind = R.pick(rng, ['day-so', 'thu-tu-phep-tinh', 'suy-luan']);
  if (kind === 'day-so') {
    const start = R.int(rng, 1, 20), step = R.int(rng, 2, 9);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const next = start + 4 * step;
    return mc(rng, `Số tiếp theo của dãy: ${seq.join('; ')}; ... là số nào?`,
      next, [next + step, next - 1, seq[3] + 1],
      `Xét hiệu hai số liền nhau: ${seq[1]} − ${seq[0]} = ${step}. Dãy tăng đều ${step} đơn vị, nên số tiếp theo là ${seq[3]} + ${step} = ${next}.`);
  }
  if (kind === 'thu-tu-phep-tinh') {
    const a = R.int(rng, 2, 20), b = R.int(rng, 2, 9), c = R.int(rng, 2, 9);
    const kq = a + b * c;
    return mc(rng, `Tính: ${a} + ${b} × ${c}`, kq, [(a + b) * c, a + b + c, a * b + c],
      `Trong biểu thức không có dấu ngoặc, làm nhân chia trước, cộng trừ sau: ${b} × ${c} = ${b * c}, rồi ${a} + ${b * c} = ${kq}.`);
  }
  const a = R.int(rng, 2, 9), lan = R.int(rng, 2, 5);
  return mc(rng, `Bạn An có ${a} viên bi. Bạn Bình có gấp ${lan} lần số bi của An. Hỏi Bình có bao nhiêu viên bi?`,
    a * lan, [a + lan, a * lan + a, Math.round(a / lan)],
    `"Gấp ${lan} lần" nghĩa là nhân với ${lan}: ${a} × ${lan} = ${a * lan} viên bi.`);
};

// ── Bộ sinh TIẾNG VIỆT ───────────────────────────────────────────────────
// Không có công thức như Toán, nên các bộ này rút từ kho ngữ liệu ở
// scripts/data/vi-en-banks.cjs. Muốn nhiều câu hơn thì bổ sung dữ liệu ở đó.

GEN['nhan-biet-chu'] = (rng, g, d) => {
  if (d === 'easy') {
    const c = R.pick(rng, B.CHU_CAI);
    return mc(rng, `Chọn chữ cái "${c.toUpperCase()}" viết thường.`, c,
      R.sample(rng, B.CHU_CAI, 3, [c]),
      `Chữ hoa và chữ thường là hai kiểu viết của cùng một con chữ "${c}".`);
  }
  const gh = R.pick(rng, B.CHU_GHEP);
  if (d === 'medium') {
    return mc(rng, `Chọn chữ ghép "${gh}" viết thường.`, gh,
      R.sample(rng, B.CHU_GHEP, 3, [gh]),
      `"${gh}" là một chữ ghép — hai (hoặc ba) con chữ ghi MỘT âm.`);
  }
  // Mức khó: xoay giữa vài dạng để không chỉ có mỗi câu "gồm mấy con chữ".
  const kind = R.pick(rng, ['dem', 'thu-tu', 'nguyen-am']);
  if (kind === 'dem') {
    return mc(rng, `Chữ ghép "${gh}" gồm mấy con chữ?`, gh.length,
      [gh.length + 1, gh.length - 1, 1],
      `"${gh}" viết bằng ${gh.length} con chữ nhưng chỉ đọc thành MỘT âm.`);
  }
  if (kind === 'thu-tu') {
    const i = R.int(rng, 1, B.CHU_CAI.length - 2);
    const truoc = rng() < 0.5;
    return mc(rng, `Trong bảng chữ cái, chữ nào đứng ${truoc ? 'TRƯỚC' : 'SAU'} chữ "${B.CHU_CAI[i]}"?`,
      B.CHU_CAI[truoc ? i - 1 : i + 1],
      R.sample(rng, B.CHU_CAI, 3, [B.CHU_CAI[i], B.CHU_CAI[truoc ? i - 1 : i + 1]]),
      `Bảng chữ cái xếp: … ${B.CHU_CAI[i - 1]}, ${B.CHU_CAI[i]}, ${B.CHU_CAI[i + 1]} … nên chữ đứng ${truoc ? 'trước' : 'sau'} "${B.CHU_CAI[i]}" là "${B.CHU_CAI[truoc ? i - 1 : i + 1]}".`);
  }
  const NGUYEN_AM = ['a', 'ă', 'â', 'e', 'ê', 'i', 'o', 'ô', 'ơ', 'u', 'ư', 'y'];
  const na = R.pick(rng, NGUYEN_AM);
  return mc(rng, 'Chữ nào là nguyên âm?', na,
    R.sample(rng, B.CHU_CAI.filter((x) => !NGUYEN_AM.includes(x)), 3),
    `"${na}" là nguyên âm. Nguyên âm gồm: ${NGUYEN_AM.join(', ')}.`);
};

GEN['ghep-van'] = (rng, g, d) => {
  const nhom = R.pick(rng, B.VAN_NHOM);
  const khac = B.VAN_NHOM.filter((x) => x.van !== nhom.van);
  if (d === 'easy') {
    const t = R.pick(rng, nhom.tieng);
    return mc(rng, `Tiếng "${t}" chứa vần nào?`, nhom.van,
      R.sample(rng, khac.map((x) => x.van), 3, [nhom.van]),
      `Bỏ âm đầu của tiếng "${t}", phần còn lại là vần "${nhom.van}".`);
  }
  if (d === 'medium') {
    const t = R.pick(rng, nhom.tieng);
    const cung = nhom.tieng.filter((x) => x !== t);
    return mc(rng, `Tiếng nào cùng vần với tiếng "${t}"?`, R.pick(rng, cung),
      R.sample(rng, khac, 3).map((x) => x.tieng[0]),
      `Tiếng "${t}" có vần "${nhom.van}". Tiếng cùng vần là tiếng cũng mang vần "${nhom.van}".`);
  }
  const a = R.pick(rng, nhom.tieng);
  return mc(rng, `Dòng nào gồm các tiếng CÙNG vần "${nhom.van}"?`,
    nhom.tieng.slice(0, 3).join(', '),
    R.sample(rng, khac, 3).map((x) => [a, ...x.tieng.slice(0, 2)].join(', ')),
    `Cả ba tiếng ${nhom.tieng.slice(0, 3).join(', ')} đều mang vần "${nhom.van}".`);
};

GEN['chinh-ta'] = (rng, g, d) => {
  const [dung, sai, luat] = R.pick(rng, B.CHINH_TA);
  const nhieu = B.CHINH_TA.filter((x) => x[0] !== dung);
  if (d === 'easy') {
    return mc(rng, 'Từ nào viết ĐÚNG chính tả?', dung,
      [sai, ...R.sample(rng, nhieu, 2).map((x) => x[1])],
      `Viết đúng là "${dung}". ${luat}.`);
  }
  if (d === 'medium') {
    return mc(rng, 'Từ nào viết SAI chính tả?', sai,
      [dung, ...R.sample(rng, nhieu, 2).map((x) => x[0])],
      `"${sai}" là sai, phải viết "${dung}". ${luat}.`);
  }
  // Chỉ hỏi "vì sao" với những cặp có QUY TẮC thật (ngh/ng, gh/g, k/c).
  // Các cặp s/x, tr/ch, d/gi/r, l/n không có quy tắc, phải nhớ — hỏi "vì sao"
  // thì đáp án hoá ra vòng vo ("vì từ này viết với n").
  const coQuyTac = B.CHINH_TA.filter((x) => x[2].startsWith('Trước'));
  const dungQuyTac = coQuyTac.some((x) => x[0] === dung);
  if (dungQuyTac && rng() < 0.6) {
    const cacQuyTac = [...new Set(coQuyTac.map((x) => x[2]))];
    return mc(rng, `Vì sao viết "${dung}" mà không viết "${sai}"?`, luat,
      R.sample(rng, cacQuyTac, 3, [luat]),
      `Quy tắc ở đây: ${luat}. Vì vậy ta viết "${dung}".`);
  }
  // Còn lại: so cả DÒNG, buộc bé kiểm từng từ chứ không đoán một từ.
  const dungKhac = R.sample(rng, B.CHINH_TA.filter((x) => x[0] !== dung).map((x) => x[0]), 2);
  const dongDung = [dung, ...dungKhac].join(', ');
  const dongSai = R.sample(rng, nhieu, 3).map((x) => [x[1], ...R.sample(rng, B.CHINH_TA.map((y) => y[0]), 2)].join(', '));
  return mc(rng, 'Dòng nào gồm các từ đều viết ĐÚNG chính tả?', dongDung, dongSai,
    `Dòng "${dongDung}" có cả ba từ viết đúng. Các dòng khác đều lẫn một từ sai chính tả.`);
};

GEN['tu-vung'] = (rng, g, d) => {
  const kind = d === 'easy' ? 'loai-tu' : d === 'medium' ? 'trai-nghia' : 'cung-nghia';
  if (kind === 'loai-tu') {
    const loai = R.pick(rng, Object.keys(B.LOAI_TU));
    const dung = R.pick(rng, B.LOAI_TU[loai]);
    const khac = Object.keys(B.LOAI_TU).filter((x) => x !== loai);
    // Hỏi theo TỪ cụ thể: "Từ nào chỉ sự vật?" chỉ có 3 đề khác nhau, còn hỏi
    // ngược lại thì mỗi từ trong kho thành một đề riêng.
    if (rng() < 0.5) {
      return mc(rng, `Từ "${dung}" thuộc loại từ nào?`, `Từ chỉ ${loai}`,
        khac.map((k) => `Từ chỉ ${k}`),
        `"${dung}" là từ chỉ ${loai}.`);
    }
    return mc(rng, `Từ nào chỉ ${loai}?`, dung,
      R.sample(rng, khac.flatMap((k) => B.LOAI_TU[k]), 3, [dung]),
      `"${dung}" là từ chỉ ${loai}. Các từ còn lại thuộc loại khác.`);
  }
  if (kind === 'trai-nghia') {
    const [a, b] = R.pick(rng, B.TRAI_NGHIA);
    const nhieu = B.TRAI_NGHIA.filter((x) => x[0] !== a);
    return mc(rng, `Từ trái nghĩa với "${a}" là từ nào?`, b,
      [...R.sample(rng, nhieu.map((x) => x[1]), 2, [b, a]), a],
      `"${a}" và "${b}" có nghĩa NGƯỢC nhau nên là hai từ trái nghĩa.`);
  }
  const [a, b] = R.pick(rng, B.CUNG_NGHIA);
  const nhieu = B.CUNG_NGHIA.filter((x) => x[0] !== a);
  return mc(rng, `Từ nào CÙNG NGHĨA với "${a}"?`, b,
    R.sample(rng, nhieu.flatMap((x) => x), 3, [a, b]),
    `"${a}" và "${b}" nói về cùng một ý nên là hai từ cùng nghĩa.`);
};

GEN['luyen-tu-cau'] = (rng, g, d) => {
  if (d === 'easy') {
    const [cau, ai, lam] = R.pick(rng, B.CAU_AI_LAM_GI);
    const khac = B.CAU_AI_LAM_GI.filter((x) => x[0] !== cau);
    return mc(rng, `Trong câu "${cau}", bộ phận trả lời câu hỏi "Ai?" là:`, ai,
      [lam, ...R.sample(rng, khac, 2).map((x) => x[1])],
      `Hỏi "Ai ${lam}?" — câu trả lời là "${ai}". Đó là bộ phận trả lời cho câu hỏi "Ai?".`);
  }
  if (d === 'medium') {
    const [cau, ai, lam] = R.pick(rng, B.CAU_AI_LAM_GI);
    const khac = B.CAU_AI_LAM_GI.filter((x) => x[0] !== cau);
    return mc(rng, `Trong câu "${cau}", bộ phận trả lời câu hỏi "Làm gì?" là:`, lam,
      [ai, ...R.sample(rng, khac, 2).map((x) => x[2])],
      `Hỏi "${ai} làm gì?" — câu trả lời là "${lam}".`);
  }
  const [cau, kieu] = R.pick(rng, B.KIEU_CAU);
  const cacKieu = ['câu kể', 'câu hỏi', 'câu khiến', 'câu cảm'];
  const dauHieu = {
    'câu kể': 'kể lại một sự việc, cuối câu có dấu chấm',
    'câu hỏi': 'dùng để hỏi, cuối câu có dấu chấm hỏi',
    'câu khiến': 'nêu yêu cầu, đề nghị; thường có "hãy", "nhớ", "đừng"',
    'câu cảm': 'bộc lộ cảm xúc; thường có "ôi", "chao ôi", "quá", "làm sao"',
  };
  return mc(rng, `Câu "${cau}" thuộc kiểu câu nào?`, kieu,
    cacKieu.filter((x) => x !== kieu),
    `Đây là ${kieu} vì nó ${dauHieu[kieu]}.`);
};

GEN['doc-hieu'] = (rng, g, d) => {
  const doan = R.pick(rng, B.DOAN_DOC);
  // Bốc ngẫu nhiên trong các câu hỏi của đoạn thay vì cố định theo mức khó —
  // cố định thì mỗi mức chỉ có đúng một câu cho mỗi đoạn.
  const [hoi, dap, sai] = R.pick(rng, doan.hoi);
  return mc(rng, `Đọc đoạn sau:\n"${doan.text}"\n\n${hoi}`, dap, sai,
    `Câu trả lời nằm ngay trong đoạn đọc: ${dap.toLowerCase()}. Khi làm bài đọc hiểu, hãy tìm lại chi tiết trong bài trước khi chọn.`);
};

GEN['ke-chuyen'] = (rng, g, d) => {
  const t = R.pick(rng, B.TRUYEN_THU_TU);
  if (d === 'easy') {
    return mc(rng, `Trong truyện "${t.ten}", sự việc nào xảy ra ĐẦU TIÊN?`, t.buoc[0],
      R.sample(rng, t.buoc.slice(1), 3), `Truyện mở đầu bằng: ${t.buoc[0]}.`);
  }
  if (d === 'medium') {
    // Hỏi bước NGAY SAU một bước cho trước — mỗi truyện cho ra nhiều đề.
    const i = R.int(rng, 0, t.buoc.length - 2);
    const nhieu = t.buoc.filter((_, k) => k !== i && k !== i + 1);
    const truyenKhac = R.pick(rng, B.TRUYEN_THU_TU.filter((x) => x.ten !== t.ten));
    return mc(rng, `Trong truyện "${t.ten}", sự việc nào xảy ra NGAY SAU "${t.buoc[i]}"?`,
      t.buoc[i + 1],
      [...nhieu, ...R.sample(rng, truyenKhac.buoc, 2)],
      `Diễn biến truyện: ${t.buoc.join(' → ')}. Sau "${t.buoc[i]}" là "${t.buoc[i + 1]}".`);
  }
  const khac = B.TRUYEN_THU_TU.filter((x) => x.ten !== t.ten);
  return mc(rng, `Sắp xếp đúng thứ tự các sự việc trong truyện "${t.ten}":`,
    t.buoc.join(' → '),
    [[...t.buoc].reverse().join(' → '),
     [t.buoc[1], t.buoc[0], t.buoc[3], t.buoc[2]].join(' → '),
     R.pick(rng, khac).buoc.join(' → ')],
    `Diễn biến đúng là: ${t.buoc.join(' → ')}.`);
};

GEN['tap-lam-van'] = (rng, g, d) => {
  const [hoi, dap, sai, giai] = R.pick(rng, B.TAP_LAM_VAN);
  return mc(rng, hoi, dap, sai, giai);
};

// ── Bộ sinh TIẾNG ANH ────────────────────────────────────────────────────

GEN['tu-vung-en'] = (rng, g, d) => {
  const [en, vi] = R.pick(rng, B.EN_VOCAB);
  const khac = B.EN_VOCAB.filter((x) => x[0] !== en);
  if (d === 'easy') {
    return mc(rng, `"${en}" nghĩa là gì?`, vi,
      R.sample(rng, khac.map((x) => x[1]), 3, [vi]),
      `"${en}" nghĩa là ${vi}.`);
  }
  if (d === 'medium') {
    return mc(rng, `Từ tiếng Anh nào có nghĩa là "${vi}"?`, en,
      R.sample(rng, khac.map((x) => x[0]), 3, [en]),
      `"${vi}" trong tiếng Anh là "${en}".`);
  }
  if (rng() < 0.5) {
    const n = R.int(rng, 1, 9);
    return mc(rng, `Số nào đứng SAU "${B.EN_NUMBERS[n - 1]}"?`, B.EN_NUMBERS[n],
      [B.EN_NUMBERS[Math.max(0, n - 2)], B.EN_NUMBERS[Math.min(9, n + 1)], B.EN_NUMBERS[0]],
      `"${B.EN_NUMBERS[n - 1]}" là ${n}, số sau là ${n + 1} — tiếng Anh đọc là "${B.EN_NUMBERS[n]}".`);
  }
  // Từ LẠC NHÓM: ba từ cùng chủ đề, một từ khác hẳn.
  // Gom nhóm theo loại từ tiếng Việt ("con cá", "quả táo", "cái bút", "màu đỏ")
  // — đủ tốt để tạo nhóm nghĩa mà không cần gắn nhãn chủ đề cho từng từ.
  const NHOM_TEN = { con: 'con vật', 'quả': 'quả/trái cây', 'cái': 'đồ vật', 'màu': 'màu sắc' };
  const loai = vi.split(' ')[0];
  const cungNhom = B.EN_VOCAB.filter((x) => x[1].split(' ')[0] === loai).map((x) => x[0]);
  const ngoaiNhom = B.EN_VOCAB.filter((x) => x[1].split(' ')[0] !== loai).map((x) => x[0]);
  if (NHOM_TEN[loai] && cungNhom.length >= 3 && ngoaiNhom.length) {
    const ba = R.sample(rng, cungNhom, 3);
    const lac = R.pick(rng, ngoaiNhom);
    if (ba.length === 3) {
      // Đáp án đúng là từ LẠC, ba đáp án nhiễu là ba từ cùng nhóm.
      return mc(rng, 'Từ nào KHÔNG cùng nhóm với các từ còn lại?', lac, ba,
        `${ba.map((x) => `"${x}"`).join(', ')} đều chỉ ${NHOM_TEN[loai]}, riêng "${lac}" thì không.`);
    }
  }

  return mc(rng, `"${en}" nghĩa là gì?`, vi,
    R.sample(rng, khac.map((x) => x[1]), 3, [vi]),
    `"${en}" nghĩa là ${vi}.`);
};

GEN['nghe-noi-en'] = (rng, g, d) => {
  const [hoi, dap, sai, lyDo] = R.pick(rng, B.EN_GIAO_TIEP);
  const giai = lyDo || `Câu đáp đúng là "${dap}".`;

  // Mỗi mức khó là một DẠNG câu khác nhau trên cùng kho tình huống — nhờ vậy
  // một tình huống cho ra ba đề thay vì một, đỡ lặp khi bé luyện nhiều buổi.
  if (d === 'easy') return mc(rng, hoi, dap, sai, giai);

  // Mức trên: hỏi NGƯỢC — cho câu nói, tìm tình huống dùng. Khó hơn vì bé phải
  // hiểu nghĩa câu tiếng Anh trước, không đoán theo tình huống tiếng Việt.
  //
  // Đã thử dạng "câu nào KHÔNG dùng được" nhưng bỏ: các đáp án nhiễu vốn đều là
  // câu sai, nên có tới ba lựa chọn cùng đúng — câu hỏi hỏng.
  const khac = B.EN_GIAO_TIEP.filter((x) => x[1] !== dap);
  return mc(rng, `Câu "${dap}" dùng trong tình huống nào?`, hoi,
    R.sample(rng, khac.map((x) => x[0]), 3, [hoi]), giai);
};

GEN['mau-cau-en'] = (rng, g, d) => {
  if (d === 'hard') {
    // Lấy từ danh sách số nhiều ĐÃ CHUẨN HOÁ, không tự cộng "s": kho từ vựng có
    // cả tính từ (green), danh từ không đếm được (bread) và bất quy tắc (foot).
    const [one, many, luat] = R.pick(rng, B.EN_PLURALS);
    const sai = [`${one}s`, `${one}es`, `${one}ies`, one].filter((x) => x !== many);
    // Đặt từ tiếng Anh trong NGOẶC KÉP: bộ đọc dựa vào đó để chuyển sang giọng
    // Anh, nếu để trần thì "candy → candies" bị đọc bằng giọng Việt.
    return mc(rng, `Số nhiều của "${one}" là:`, many, R.sample(rng, sai, 3),
      `${luat}: "${one}" → "${many}".`);
  }
  const [cau, dap, sai, giai] = R.pick(rng, B.EN_MAU_CAU);
  return mc(rng, `Điền vào chỗ trống: ${cau}`, dap, sai, giai);
};

// ── Chạy chính ───────────────────────────────────────────────────────────
(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Chỉ sinh cho những cặp (kỹ năng × lớp) thực sự có trong chương trình.
  // Dùng lesson_skills để biết lớp nào dạy kỹ năng nào — nhưng câu sinh ra là
  // câu RIÊNG, không lấy từ bài sách giáo khoa.
  const [pairs] = await db.query(`
    SELECT s.id AS skillId, s.code, s.name, s.subject,
           CAST(RIGHT(co.slug, 1) AS UNSIGNED) AS grade
      FROM lesson_skills ls
      JOIN skills s ON s.id = ls.skillId AND s.isActive = 1
      JOIN lessons l ON l.id = ls.lessonId AND l.isPublished = 1
      JOIN courses co ON co.id = l.courseId AND co.isPublished = 1
     WHERE co.slug REGEXP '-lop-[1-5]$'
     GROUP BY s.id, grade`);

  const rows = [];
  const skipped = [];
  const perSkill = new Map();

  for (const p of pairs) {
    if (ONLY_SKILL && p.code !== ONLY_SKILL) continue;
    if (ONLY_GRADE && String(p.grade) !== String(ONLY_GRADE)) continue;
    const gen = GEN[p.code];
    if (!gen) { skipped.push(`${p.code} lớp ${p.grade}`); continue; }

    // Khử trùng trên cả (kỹ năng × LỚP), không chỉ trong một nhóm hay một mức
    // khó. Trước đây khử theo nhóm nên bé gặp lại y hệt một câu trong cùng một
    // phiên; khử theo mức thì câu vẫn lọt sang mức khác của cùng kỹ năng.
    // Dấu nhận dạng gồm cả ĐÁP ÁN: "Từ nào chỉ sự vật?" với bộ đáp án khác nhau
    // vẫn là hai câu khác nhau.
    const seenInBucket = new Set();

    for (const diff of DIFFICULTIES) {
      for (let gi = 0; gi < GROUPS_PER_BUCKET; gi++) {
        const variantGroup = `${p.code}-l${p.grade}-${diff}-${gi + 1}`;
        for (let vi = 0; vi < VARIANTS_PER_GROUP; vi++) {
          let q = null;
          // Thử nhiều seed để tìm câu chưa từng sinh trong bucket này.
          for (let attempt = 0; attempt < 120 && !q; attempt++) {
            const rng = mulberry32(seedFrom(`${variantGroup}-${vi}-${attempt}`));
            const cand = gen(rng, p.grade, diff);
            if (!cand || cand.correctIndex < 0 || cand.optionsJson.length < 4) continue;
            const sig = `${cand.questionText}||${[...cand.optionsJson].sort().join('|')}`;
            if (seenInBucket.has(sig)) continue;
            cand._sig = sig;
            q = cand;
          }
          // Kho ngữ liệu cạn thì bỏ qua — thà ít câu còn hơn câu lặp.
          if (!q) continue;
          seenInBucket.add(q._sig);
          rows.push({
            code: `${variantGroup}-v${vi + 1}`,
            skillId: p.skillId,
            grade: p.grade,
            difficulty: diff,
            questionText: q.questionText,
            optionsJson: JSON.stringify(q.optionsJson),
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            variantGroup,
            generator: p.code,
            sortOrder: gi * VARIANTS_PER_GROUP + vi + 1,
          });
          perSkill.set(p.code, (perSkill.get(p.code) || 0) + 1);
        }
      }
    }
  }

  // ── Kiểm tra chất lượng trước khi ghi ──
  // Quét mọi phép tính "a op b = c" xuất hiện trong lời giải và tự tính lại.
  // Nội dung này dạy trẻ, nên một lời giải sai số (vd "18 : 4 = 4") phải chặn
  // ngay ở đây chứ không để lọt vào DB.
  function badArithmetic(text) {
    // Dấu ":" vừa là phép chia vừa là dấu hai chấm tiếng Việt ("Cộng 4 với 3: …").
    // Phép chia luôn có khoảng trắng CẢ HAI bên, dấu câu thì không — dựa vào đó
    // để tách, nếu không "với 3: 4 − 3" sẽ bị đọc thành "3 : 4 − 3".
    const norm = text.replace(/ : /g, ' § ').replace(/:/g, ' ');

    // Bắt cả CHUỖI phép tính ("4 + 27 + 25 = 56"), không chỉ hai số cuối, và
    // hiểu dấu phẩy thập phân kiểu Việt ("13,6").
    const re = /(-?\d[\d.,]*(?:\s*[+−\-×x*§]\s*-?\d[\d.,]*)+)\s*=\s*(-?\d[\d.,]*)/g;
    const num = (v) => {
      // "1.000" là phân cách nghìn, "13,6" là thập phân.
      const t = String(v).trim().replace(/\.(?=\d{3}\b)/g, '').replace(',', '.');
      return Number(t);
    };
    const bad = [];
    let m;
    while ((m = re.exec(norm))) {
      const tokens = m[1].split(/\s*([+−\-×x*§])\s*/).filter((x) => x !== '');
      const expected = num(m[2]);
      if (!Number.isFinite(expected)) continue;

      // Nhân/chia trước, cộng/trừ sau.
      const vals = [num(tokens[0])];
      const ops = [];
      for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const v = num(tokens[i + 1]);
        if (!Number.isFinite(v)) { vals.length = 0; break; }
        if (op === '×' || op === 'x' || op === '*') vals[vals.length - 1] *= v;
        else if (op === '§') { if (v === 0) { vals.length = 0; break; } vals[vals.length - 1] /= v; }
        else { ops.push(op); vals.push(v); }
      }
      if (!vals.length || !vals.every(Number.isFinite)) continue;

      let acc = vals[0];
      for (let i = 0; i < ops.length; i++) acc = ops[i] === '+' ? acc + vals[i + 1] : acc - vals[i + 1];
      if (Math.abs(acc - expected) > 1e-6) bad.push(`${m[1].replace(/§/g, ':')} = ${m[2]} (đúng ra ${Math.round(acc * 1000) / 1000})`);
    }
    return bad;
  }

  const problems = [];
  for (const r of rows) {
    const opts = JSON.parse(r.optionsJson);
    if (new Set(opts).size !== opts.length) problems.push(`${r.code}: đáp án trùng nhau`);
    if (r.correctIndex < 0 || r.correctIndex >= opts.length) problems.push(`${r.code}: correctIndex sai`);
    if (!r.explanation || r.explanation.length < 20) problems.push(`${r.code}: giải thích quá ngắn`);
    if (/undefined|NaN|Infinity/.test(r.questionText + r.explanation + opts.join())) problems.push(`${r.code}: có giá trị lỗi`);
    if (opts.some((o) => Number.isFinite(Number(o)) && Number(o) < 0) && Number(opts[r.correctIndex]) >= 0) {
      problems.push(`${r.code}: có đáp án nhiễu là số âm`);
    }
    for (const b of badArithmetic(r.explanation)) problems.push(`${r.code}: lời giải sai — ${b}`);
  }

  // Trùng câu là lỗi nghiêm trọng với người dùng: bé làm 10 câu mà gặp lại
  // cùng một đề thì thấy ngay và mất tin tưởng.
  const sigCount = new Map();
  for (const r of rows) {
    const sig = `${r.skillId}|${r.grade}|${r.questionText}|${JSON.parse(r.optionsJson).slice().sort().join('|')}`;
    sigCount.set(sig, (sigCount.get(sig) || 0) + 1);
  }
  const dupes = [...sigCount.values()].filter((n) => n > 1).length;
  if (dupes) problems.push(`${dupes} câu bị TRÙNG (cùng đề + cùng đáp án trong một kỹ năng/lớp)`);

  console.log('── Số câu sinh được theo kỹ năng ──');
  console.table([...perSkill.entries()].sort((a, b) => b[1] - a[1]).map(([code, n]) => ({ code, questions: n })));
  console.log(`Tổng: ${rows.length} câu, ${rows.length / VARIANTS_PER_GROUP} nhóm sinh đôi`);
  if (skipped.length) console.log(`Chưa có bộ sinh: ${skipped.join(', ')}`);
  if (problems.length) {
    console.log(`\n✗ ${problems.length} vấn đề chất lượng:`);
    problems.slice(0, 20).forEach((p) => console.log('  -', p));
  } else {
    console.log('✓ Kiểm tra chất lượng: không có vấn đề');
  }

  if (SHOW) {
    console.log('\n── Mẫu ──');
    for (const r of rows.slice(0, SHOW)) {
      const opts = JSON.parse(r.optionsJson);
      console.log(`\n[${r.difficulty}] ${r.questionText}`);
      opts.forEach((o, i) => console.log(`   ${i === r.correctIndex ? '✓' : ' '} ${'ABCD'[i]}. ${o}`));
      console.log(`   💡 ${r.explanation}`);
    }
  }

  if (!APPLY) {
    console.log('\nDry-run. Chạy lại với --apply để ghi DB.');
    await db.end();
    return;
  }
  if (problems.length) {
    console.log('\n✗ Có vấn đề chất lượng — KHÔNG ghi DB. Sửa bộ sinh rồi chạy lại.');
    await db.end();
    process.exit(1);
  }

  // Upsert theo `code` nên chạy lại chỉ cập nhật, không nhân bản.
  const cols = ['code', 'skillId', 'grade', 'difficulty', 'questionText', 'optionsJson', 'correctIndex', 'explanation', 'variantGroup', 'generator', 'sortOrder'];
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    await db.query(
      `INSERT INTO skill_questions (${cols.join(',')}, isActive, createdAt, updatedAt) VALUES ?
       ON DUPLICATE KEY UPDATE
         questionText=VALUES(questionText), optionsJson=VALUES(optionsJson),
         correctIndex=VALUES(correctIndex), explanation=VALUES(explanation),
         difficulty=VALUES(difficulty), sortOrder=VALUES(sortOrder), isActive=1`,
      [chunk.map((r) => [...cols.map((c) => r[c]), 1, new Date(), new Date()])],
    );
  }
  // Câu cũ không còn được sinh (do đổi bộ sinh, hoặc từng là câu trùng) thì
  // TẮT chứ không xoá — lịch sử trả lời của bé vẫn trỏ tới chúng.
  const codes = rows.map((r) => r.code);
  let disabled = 0;
  if (codes.length) {
    const [res] = await db.query(
      `UPDATE skill_questions SET isActive = 0 WHERE isActive = 1 AND code NOT IN (${codes.map(() => '?').join(',')})`,
      codes,
    );
    disabled = res.affectedRows ?? 0;
  }
  console.log(`✓ Ghi ${rows.length} câu vào skill_questions`);
  if (disabled) console.log(`· Tắt ${disabled} câu cũ không còn được sinh (giữ lại để không mất lịch sử)`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
