/**
 * 1000 câu TOÁN TƯ DUY LỚP 2 → iq_questions (grade=2).
 *   npm run seed:iq-lop2 -- --dry | npm run seed:iq-lop2
 * Số đến 100, làm quen bảng nhân 2 & 5, dãy số, so sánh, chục–đơn vị, logic.
 */
import 'dotenv/config';
import { createGen, generate, seedGrade, docSo, capitalize, NOUNS, NAMES, type Q } from './iq-gen';

const G = createGen(220002);
const { ri, pick, numOptions, fromPool } = G;
const SUBJECT = 'THỬ THÁCH IQ|LỚP 2 - Toán tư duy';

const FAMILIES: Array<() => Q | null> = [
  // Cộng trong 100
  () => {
    const a = ri(11, 60), b = ri(11, 100 - a);
    const ans = a + b, o = numOptions(ans);
    return { question: `Tính: ${a} + ${b} = ?`, question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `Đặt tính rồi tính: ${a} + ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Trừ trong 100
  () => {
    const a = ri(30, 100), b = ri(11, a - 1);
    const ans = a - b, o = numOptions(ans);
    return { question: `Tính: ${a} − ${b} = ?`, question_speech: `Tính ${docSo(a)} trừ ${docSo(b)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `Đặt tính rồi tính: ${a} − ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Nhân bảng 2
  () => {
    const n = ri(2, 10), ans = 2 * n, o = numOptions(ans);
    return { question: `Tính: 2 × ${n} = ?`, question_speech: `Tính hai nhân ${docSo(n)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `2 × ${n} nghĩa là lấy 2 cộng chính nó ${n} lần, bằng ${ans}.`, explanation_speech: `Hai nhân ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // Nhân bảng 5
  () => {
    const n = ri(2, 10), ans = 5 * n, o = numOptions(ans);
    return { question: `Tính: 5 × ${n} = ?`, question_speech: `Tính năm nhân ${docSo(n)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `5 × ${n} = ${ans}.`, explanation_speech: `Năm nhân ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // So sánh: số lớn nhất trong 4 số 2 chữ số
  () => {
    const set = new Set<number>(); while (set.size < 4) set.add(ri(10, 99));
    const nums = [...set], ans = Math.max(...nums), arr = nums.slice().sort(() => G.rnd() - 0.5);
    return { question: `Trong các số ${nums.join(', ')}, số nào lớn nhất?`, question_speech: `Trong các số ${nums.map(docSo).join(', ')}, số nào lớn nhất?`, options: arr.map(String), correct_index: arr.indexOf(ans), explanation: `So hàng chục trước: số có chục lớn nhất là số lớn nhất. Vậy ${ans} lớn nhất.`, explanation_speech: `So sánh các số thì ${docSo(ans)} là số lớn nhất.` };
  },
  // Dãy số +2/+5/+10
  () => {
    const step = pick([2, 5, 10]), s = ri(2, 30);
    const seq = [s, s + step, s + 2 * step, s + 3 * step, s + 4 * step];
    const pos = ri(1, 3), ans = seq[pos];
    const shown = seq.map((v, i) => (i === pos ? '?' : v)).join(', '), o = numOptions(ans);
    return { question: `Điền số còn thiếu vào dãy: ${shown}`, question_speech: `Điền số còn thiếu vào dãy: ${seq.map((v, i) => (i === pos ? 'dấu hỏi' : docSo(v))).join(', ')}.`, options: o.options, correct_index: o.correct_index, explanation: `Dãy tăng dần đều mỗi lần ${step} đơn vị, nên số còn thiếu là ${ans}.`, explanation_speech: `Dãy tăng đều mỗi lần ${docSo(step)} đơn vị nên số còn thiếu là ${docSo(ans)}.` };
  },
  // Số liền sau (2 chữ số)
  () => {
    const n = ri(10, 98), ans = n + 1, o = numOptions(ans);
    return { question: `Số liền sau của số ${n} là số nào?`, question_speech: `Số liền sau của số ${docSo(n)} là số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Đếm thêm 1: ${n} + 1 = ${ans}.`, explanation_speech: `Đếm thêm một được ${docSo(ans)}.` };
  },
  // Chục và đơn vị
  () => {
    const c = ri(2, 9), d = ri(1, 9), n = c * 10 + d;
    const correct = `${c} chục ${d} đơn vị`;
    const pool = [correct, `${d} chục ${c} đơn vị`, `${c} chục ${d + 1} đơn vị`, `${c + 1} chục ${d} đơn vị`, `${c} chục ${Math.max(0, d - 1)} đơn vị`];
    const o = fromPool(correct, pool);
    return { question: `Số ${n} gồm mấy chục và mấy đơn vị?`, question_speech: `Số ${docSo(n)} gồm mấy chục và mấy đơn vị?`, options: o.options, correct_index: o.correct_index, explanation: `${n} = ${c} chục ${d} đơn vị (chữ số ${c} chỉ chục, chữ số ${d} chỉ đơn vị).`, explanation_speech: `Số ${docSo(n)} gồm ${docSo(c)} chục và ${docSo(d)} đơn vị.` };
  },
  // Bài toán cộng lời văn
  () => {
    const a = ri(15, 50), b = ri(10, 100 - a), noun = pick(NOUNS), ans = a + b, o = numOptions(ans);
    return { question: `Lớp em có ${a} bạn, thêm ${b} bạn chuyển đến.\nHỏi lớp có tất cả bao nhiêu bạn?`, question_speech: `Lớp em có ${docSo(a)} bạn, thêm ${docSo(b)} bạn chuyển đến. Hỏi lớp có tất cả bao nhiêu bạn?`, options: o.options, correct_index: o.correct_index, explanation: `Lấy số cũ cộng số thêm: ${a} + ${b} = ${ans} bạn.`, explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)} bạn.` };
  },
  // Bài toán trừ lời văn
  () => {
    const a = ri(40, 100), b = ri(10, a - 5), noun = pick(NOUNS), ans = a - b, o = numOptions(ans, noun.split(' ')[0]);
    return { question: `Có ${a} ${noun}, đã bán ${b} ${noun}.\nHỏi còn lại bao nhiêu ${noun}?`, question_speech: `Có ${docSo(a)} ${noun}, đã bán ${docSo(b)} ${noun}. Hỏi còn lại bao nhiêu ${noun}?`, options: o.options, correct_index: o.correct_index, explanation: `Lấy số ban đầu trừ số đã bán: ${a} − ${b} = ${ans} ${noun}.`, explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Tổng 3 số
  () => {
    const a = ri(5, 25), b = ri(5, 25), c = ri(5, 25), ans = a + b + c, o = numOptions(ans);
    return { question: `Tính: ${a} + ${b} + ${c} = ?`, question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} cộng ${docSo(c)}.`, options: o.options, correct_index: o.correct_index, explanation: `Cộng lần lượt: ${a} + ${b} = ${a + b}; ${a + b} + ${c} = ${ans}.`, explanation_speech: `Kết quả bằng ${docSo(ans)}.` };
  },
];

async function main() {
  const qs = generate(1000, FAMILIES);
  await seedGrade(2, qs, SUBJECT);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
