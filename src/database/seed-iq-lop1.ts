/**
 * 1000 câu TOÁN TƯ DUY LỚP 1 → iq_questions (grade=1).
 *   npm run seed:iq-lop1 -- --dry | npm run seed:iq-lop1
 * Đếm, cộng/trừ trong 20, so sánh, dãy số, quy luật, gấp đôi, đếm chân, logic.
 */
import 'dotenv/config';
import { createGen, generate, seedGrade, docSo, capitalize, NAMES, type Q, type Level } from './iq-gen';

const G = createGen(20260820);
const { rnd, ri, pick, numOptions } = G;
const SUBJECT = 'THỬ THÁCH IQ|LỚP 1 - Toán tư duy';

const NOUNS = ['quả táo', 'viên bi', 'bông hoa', 'con chim', 'cái kẹo', 'quả bóng', 'chiếc lá', 'ngôi sao', 'con cá', 'cái bánh'];

const FAMILIES: Array<() => Q | null> = [
  // Cộng có lời văn (tổng ≤ 20)
  () => {
    const a = ri(2, 12), b = ri(2, 20 - a), noun = pick(NOUNS), ans = a + b, o = numOptions(ans, noun.split(' ')[0]);
    return { question: `Có ${a} ${noun}, thêm ${b} ${noun} nữa.\nHỏi có tất cả mấy ${noun}?`, question_speech: `Có ${docSo(a)} ${noun}, thêm ${docSo(b)} ${noun} nữa. Hỏi có tất cả mấy ${noun}?`, options: o.options, correct_index: o.correct_index, explanation: `Lấy ${a} cộng ${b}: ${a} + ${b} = ${ans}. Vậy có ${ans} ${noun}.`, explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Trừ có lời văn
  () => {
    const a = ri(5, 20), b = ri(1, a - 1), noun = pick(NOUNS), ans = a - b, o = numOptions(ans, noun.split(' ')[0]);
    return { question: `Có ${a} ${noun}, cho bạn ${b} ${noun}.\nHỏi còn lại mấy ${noun}?`, question_speech: `Có ${docSo(a)} ${noun}, cho bạn ${docSo(b)} ${noun}. Hỏi còn lại mấy ${noun}?`, options: o.options, correct_index: o.correct_index, explanation: `Lấy ${a} trừ ${b}: ${a} − ${b} = ${ans}. Vậy còn ${ans} ${noun}.`, explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Cộng thuần
  () => {
    const a = ri(1, 15), b = ri(1, 20 - a), ans = a + b, o = numOptions(ans);
    return { question: `Tính: ${a} + ${b} = ?`, question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `${a} + ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Trừ thuần
  () => {
    const a = ri(3, 20), b = ri(1, a - 1), ans = a - b, o = numOptions(ans);
    return { question: `Tính: ${a} − ${b} = ?`, question_speech: `Tính ${docSo(a)} trừ ${docSo(b)} bằng bao nhiêu?`, options: o.options, correct_index: o.correct_index, explanation: `${a} − ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // So sánh lớn nhất
  () => {
    const set = new Set<number>(); while (set.size < 4) set.add(ri(1, 20));
    const nums = [...set], ans = Math.max(...nums), arr = nums.slice().sort(() => rnd() - 0.5);
    return { question: `Trong các số ${nums.join(', ')}, số nào lớn nhất?`, question_speech: `Trong các số ${nums.map(docSo).join(', ')}, số nào lớn nhất?`, options: arr.map(String), correct_index: arr.indexOf(ans), explanation: `So sánh ${nums.join(', ')} thì ${ans} là số lớn nhất.`, explanation_speech: `${capitalize(docSo(ans))} là số lớn nhất.` };
  },
  // So sánh nhỏ nhất
  () => {
    const set = new Set<number>(); while (set.size < 4) set.add(ri(1, 20));
    const nums = [...set], ans = Math.min(...nums), arr = nums.slice().sort(() => rnd() - 0.5);
    return { question: `Trong các số ${nums.join(', ')}, số nào nhỏ nhất?`, question_speech: `Trong các số ${nums.map(docSo).join(', ')}, số nào nhỏ nhất?`, options: arr.map(String), correct_index: arr.indexOf(ans), explanation: `So sánh ${nums.join(', ')} thì ${ans} là số nhỏ nhất.`, explanation_speech: `${capitalize(docSo(ans))} là số nhỏ nhất.` };
  },
  // Số liền sau
  () => {
    const n = ri(0, 19), ans = n + 1, o = numOptions(ans);
    return { question: `Số liền sau của số ${n} là số nào?`, question_speech: `Số liền sau của số ${docSo(n)} là số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Đếm tiếp sau ${n} được ${ans}.`, explanation_speech: `Số liền sau của ${docSo(n)} là ${docSo(ans)}.` };
  },
  // Số liền trước
  () => {
    const n = ri(1, 20), ans = n - 1, o = numOptions(ans);
    return { question: `Số liền trước của số ${n} là số nào?`, question_speech: `Số liền trước của số ${docSo(n)} là số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Số đứng ngay trước ${n} là ${ans}.`, explanation_speech: `Số liền trước của ${docSo(n)} là ${docSo(ans)}.` };
  },
  // Dãy +1
  () => {
    const s = ri(1, 12), seq = [s, s + 1, s + 2, s + 3, s + 4], pos = ri(1, 3), ans = seq[pos];
    const shown = seq.map((v, i) => (i === pos ? '?' : v)).join(', '), o = numOptions(ans);
    return { question: `Điền số còn thiếu vào dãy: ${shown}`, question_speech: `Điền số còn thiếu vào dãy: ${seq.map((v, i) => (i === pos ? 'dấu hỏi' : docSo(v))).join(', ')}.`, options: o.options, correct_index: o.correct_index, explanation: `Dãy đếm tăng dần từng 1 đơn vị nên số còn thiếu là ${ans}.`, explanation_speech: `Số còn thiếu là ${docSo(ans)}.` };
  },
  // Dãy +2
  () => {
    const s = ri(1, 6) * 2 - ri(0, 1), seq = [s, s + 2, s + 4, s + 6, s + 8], pos = ri(1, 4), ans = seq[pos];
    const shown = seq.map((v, i) => (i === pos ? '?' : v)).join(', '), o = numOptions(ans);
    return { question: `Điền số còn thiếu vào dãy: ${shown}`, question_speech: `Điền số còn thiếu vào dãy: ${seq.map((v, i) => (i === pos ? 'dấu hỏi' : docSo(v))).join(', ')}.`, options: o.options, correct_index: o.correct_index, explanation: `Dãy tăng dần từng 2 đơn vị nên số còn thiếu là ${ans}.`, explanation_speech: `Số còn thiếu là ${docSo(ans)}.` };
  },
  // Gấp đôi
  () => {
    const n = ri(1, 10), ans = n * 2, o = numOptions(ans);
    return { question: `Gấp đôi số ${n} là số nào?`, question_speech: `Gấp đôi số ${docSo(n)} là số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Gấp đôi là lấy ${n} + ${n} = ${ans}.`, explanation_speech: `Gấp đôi ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // Đếm chân gà
  () => {
    const n = ri(2, 8), ans = n * 2, o = numOptions(ans, 'chân');
    return { question: `Mỗi con gà có 2 chân.\nHỏi ${n} con gà có bao nhiêu chân?`, question_speech: `Mỗi con gà có hai chân. Hỏi ${docSo(n)} con gà có bao nhiêu chân?`, options: o.options, correct_index: o.correct_index, explanation: `Mỗi con 2 chân, ${n} con là 2 + 2 + … = ${ans} chân.`, explanation_speech: `${capitalize(docSo(n))} con gà có ${docSo(ans)} chân.` };
  },
  // Nhiều hơn bao nhiêu
  () => {
    const b = ri(2, 10), d = ri(1, 8), a = b + d, na = pick(NAMES); let nb = pick(NAMES); while (nb === na) nb = pick(NAMES);
    const o = numOptions(d, 'cái');
    return { question: `${na} có ${a} cái kẹo, ${nb} có ${b} cái kẹo.\nHỏi ${na} có nhiều hơn ${nb} mấy cái kẹo?`, question_speech: `${na} có ${docSo(a)} cái kẹo, ${nb} có ${docSo(b)} cái kẹo. Hỏi ${na} nhiều hơn ${nb} mấy cái kẹo?`, options: o.options, correct_index: o.correct_index, explanation: `Lấy ${a} − ${b} = ${d}. Vậy ${na} nhiều hơn ${nb} ${d} cái kẹo.`, explanation_speech: `Nhiều hơn ${docSo(d)} cái kẹo.` };
  },
  // Tổng 3 số nhỏ
  () => {
    const a = ri(1, 6), b = ri(1, 6), c = ri(1, 6), ans = a + b + c, o = numOptions(ans);
    return { question: `Tính: ${a} + ${b} + ${c} = ?`, question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} cộng ${docSo(c)}.`, options: o.options, correct_index: o.correct_index, explanation: `${a} + ${b} + ${c} = ${ans}.`, explanation_speech: `Kết quả bằng ${docSo(ans)}.` };
  },
  // ── SUY LUẬN ── Logic cao/thấp (3 bạn)
  () => {
    const set = new Set<string>(); while (set.size < 3) set.add(pick(NAMES));
    const [x, y, z] = [...set], askTallest = rnd() < 0.5, ans = askTallest ? x : z;
    const opts = [x, y, z, 'Không rõ'].sort(() => rnd() - 0.5);
    return { question: `${x} cao hơn ${y}. ${y} cao hơn ${z}.\nHỏi ai ${askTallest ? 'cao nhất' : 'thấp nhất'}?`, question_speech: `${x} cao hơn ${y}. ${y} cao hơn ${z}. Hỏi ai ${askTallest ? 'cao nhất' : 'thấp nhất'}?`, options: opts, correct_index: opts.indexOf(ans), explanation: `${x} cao hơn ${y}, ${y} cao hơn ${z} nên ${x} cao nhất, ${z} thấp nhất. Vậy ${ans} ${askTallest ? 'cao nhất' : 'thấp nhất'}.`, explanation_speech: `${ans} là người ${askTallest ? 'cao nhất' : 'thấp nhất'}.` };
  },
];

const DIFFS: Level[] = ['easy', 'easy', 'easy', 'easy', 'easy', 'easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard'];

async function main() {
  const qs = generate(1000, FAMILIES, DIFFS);
  await seedGrade(1, qs, SUBJECT);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
