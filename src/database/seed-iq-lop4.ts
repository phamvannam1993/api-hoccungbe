/**
 * 1000 câu TOÁN TƯ DUY LỚP 4 → iq_questions (grade=4).
 * Tổng–hiệu, trung bình cộng, nhân/chia, diện tích, dãy cách đều, phân số (hiển thị a/b).
 */
import 'dotenv/config';
import { createGen, generate, seedGrade, docSo, capitalize, type Q } from './iq-gen';

const G = createGen(440004);
const { ri, pick, numOptions, fromPool } = G;
const SUBJECT = 'THỬ THÁCH IQ|LỚP 4 - Toán tư duy';

const FAMILIES: Array<() => Q | null> = [
  // Tổng – hiệu (tìm số lớn)
  () => {
    const small = ri(5, 40), big = small + ri(2, 40), S = small + big, H = big - small, o = numOptions(big);
    return { question: `Hai số có tổng bằng ${S} và hiệu bằng ${H}.\nTìm số lớn.`, question_speech: `Hai số có tổng bằng ${docSo(S)} và hiệu bằng ${docSo(H)}. Tìm số lớn.`, options: o.options, correct_index: o.correct_index, explanation: `Số lớn = (tổng + hiệu) : 2 = (${S} + ${H}) : 2 = ${S + H} : 2 = ${big}.`, explanation_speech: `Số lớn bằng tổng cộng hiệu rồi chia hai, bằng ${docSo(big)}.` };
  },
  // Tổng – hiệu (tìm số bé)
  () => {
    const small = ri(5, 40), big = small + ri(2, 40), S = small + big, H = big - small, o = numOptions(small);
    return { question: `Hai số có tổng bằng ${S} và hiệu bằng ${H}.\nTìm số bé.`, question_speech: `Hai số có tổng bằng ${docSo(S)} và hiệu bằng ${docSo(H)}. Tìm số bé.`, options: o.options, correct_index: o.correct_index, explanation: `Số bé = (tổng − hiệu) : 2 = (${S} − ${H}) : 2 = ${S - H} : 2 = ${small}.`, explanation_speech: `Số bé bằng tổng trừ hiệu rồi chia hai, bằng ${docSo(small)}.` };
  },
  // Trung bình cộng của 3 số
  () => {
    const avg = ri(8, 40), a = avg + ri(-5, 5), b = avg + ri(-5, 5), c = 3 * avg - a - b;
    if (c < 1) return null;
    const o = numOptions(avg);
    return { question: `Tìm trung bình cộng của ba số: ${a}, ${b}, ${c}.`, question_speech: `Tìm trung bình cộng của ba số ${docSo(a)}, ${docSo(b)}, ${docSo(c)}.`, options: o.options, correct_index: o.correct_index, explanation: `Trung bình cộng = tổng các số chia số các số = (${a} + ${b} + ${c}) : 3 = ${a + b + c} : 3 = ${avg}.`, explanation_speech: `Tổng ba số chia ba bằng ${docSo(avg)}.` };
  },
  // Nhân 2 chữ số × 1 chữ số
  () => {
    const a = ri(11, 40), b = ri(3, 9), ans = a * b, o = numOptions(ans);
    return { question: `Tính: ${a} × ${b} = ?`, question_speech: `Tính ${docSo(a)} nhân ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `${a} × ${b} = ${ans}.`, explanation_speech: `Kết quả bằng ${docSo(ans)}.` };
  },
  // Chia hết
  () => {
    const b = ri(3, 9), q = ri(11, 40), a = b * q, o = numOptions(q);
    return { question: `Tính: ${a} : ${b} = ?`, question_speech: `Tính ${docSo(a)} chia ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `${a} : ${b} = ${q} (vì ${b} × ${q} = ${a}).`, explanation_speech: `Kết quả bằng ${docSo(q)}.` };
  },
  // Diện tích hình chữ nhật
  () => {
    const d = ri(6, 30), r = ri(3, d - 1), ans = d * r, o = numOptions(ans, 'cm²');
    return { question: `Hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm.\nTính diện tích.`, question_speech: `Hình chữ nhật dài ${docSo(d)} xăng-ti-mét, rộng ${docSo(r)} xăng-ti-mét. Tính diện tích.`, options: o.options, correct_index: o.correct_index, explanation: `Diện tích hình chữ nhật = dài × rộng = ${d} × ${r} = ${ans} cm².`, explanation_speech: `Dài nhân rộng bằng ${docSo(ans)} xăng-ti-mét vuông.` };
  },
  // Diện tích hình vuông
  () => {
    const c = ri(4, 20), ans = c * c, o = numOptions(ans, 'cm²');
    return { question: `Hình vuông có cạnh ${c} cm.\nTính diện tích hình vuông.`, question_speech: `Hình vuông cạnh ${docSo(c)} xăng-ti-mét. Tính diện tích.`, options: o.options, correct_index: o.correct_index, explanation: `Diện tích hình vuông = cạnh × cạnh = ${c} × ${c} = ${ans} cm².`, explanation_speech: `Cạnh nhân cạnh bằng ${docSo(ans)} xăng-ti-mét vuông.` };
  },
  // Dãy số cách đều – số hạng thứ k
  () => {
    const a1 = ri(1, 8), d = pick([2, 3, 4, 5]), k = ri(4, 8), ans = a1 + (k - 1) * d, o = numOptions(ans);
    const head = [a1, a1 + d, a1 + 2 * d, a1 + 3 * d].join(', ');
    return { question: `Cho dãy số cách đều: ${head}, …\nSố hạng thứ ${k} là số nào?`, question_speech: `Cho dãy số cách đều ${head}. Số hạng thứ ${docSo(k)} là số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Dãy cách đều ${d} đơn vị. Số hạng thứ ${k} = số đầu + (thứ tự − 1) × khoảng cách = ${a1} + (${k} − 1) × ${d} = ${a1} + ${(k - 1) * d} = ${ans}.`, explanation_speech: `Số hạng thứ ${docSo(k)} bằng ${docSo(ans)}.` };
  },
  // Phân số bằng nhau (hiển thị a/b)
  () => {
    const k = ri(2, 6), correct = `${k}/${2 * k}`;
    const distract = [`${k}/${2 * k + 1}`, `${k + 1}/${2 * k}`, `${k - 1 < 1 ? k + 2 : k - 1}/${2 * k}`, `${k}/${2 * k - 1}`];
    const o = fromPool(correct, [correct, ...distract]);
    return { question: `Phân số nào dưới đây bằng 1/2 ?`, question_speech: `Phân số nào bằng một phần hai?`, options: o.options, correct_index: o.correct_index, explanation: `Phân số bằng 1/2 khi tử số bằng nửa mẫu số. ${correct} có ${k} × 2 = ${2 * k} nên ${correct} = 1/2.`, explanation_speech: `Phân số ${docSo(k)} phần ${docSo(2 * k)} bằng một phần hai.` };
  },
  // Cộng hai phân số cùng mẫu (hiển thị a/b)
  () => {
    const c = ri(4, 9), a = ri(1, c - 2), b = ri(1, c - a - 0);
    if (a + b >= c) return null;
    const num = a + b, correct = `${num}/${c}`;
    const distract = [`${num + 1}/${c}`, `${a + b}/${c + c}`, `${a * b}/${c}`];
    const o = fromPool(correct, [correct, ...distract]);
    return { question: `Tính: ${a}/${c} + ${b}/${c} = ?`, question_speech: `Tính ${docSo(a)} phần ${docSo(c)} cộng ${docSo(b)} phần ${docSo(c)}.`, options: o.options, correct_index: o.correct_index, explanation: `Hai phân số cùng mẫu: cộng tử số, giữ nguyên mẫu số. ${a}/${c} + ${b}/${c} = ${a} + ${b} phần ${c} = ${num}/${c}.`, explanation_speech: `Cộng tử số giữ nguyên mẫu số, được ${docSo(num)} phần ${docSo(c)}.` };
  },
  // Tìm x: x : a = b
  () => {
    const a = ri(2, 9), b = ri(4, 30), x = a * b, o = numOptions(x);
    return { question: `Tìm x, biết: x : ${a} = ${b}`, question_speech: `Tìm x, biết x chia ${docSo(a)} bằng ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Muốn tìm số bị chia, lấy thương nhân số chia: x = ${b} × ${a} = ${x}.`, explanation_speech: `x bằng ${docSo(b)} nhân ${docSo(a)} bằng ${docSo(x)}.` };
  },
];

async function main() {
  const qs = generate(1000, FAMILIES);
  await seedGrade(4, qs, SUBJECT);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
