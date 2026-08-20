/**
 * 1000 câu TOÁN TƯ DUY LỚP 5 → iq_questions (grade=5).
 * Chuyển động (v=s/t), tỉ số phần trăm, diện tích tam giác/thang, thể tích, phân số (a/b), đổi đơn vị.
 */
import 'dotenv/config';
import { createGen, generate, seedGrade, docSo, capitalize, type Q } from './iq-gen';

const G = createGen(550005);
const { ri, pick, numOptions, fromPool } = G;
const SUBJECT = 'THỬ THÁCH IQ|LỚP 5 - Toán tư duy';

const FAMILIES: Array<() => Q | null> = [
  // Vận tốc = quãng đường : thời gian
  () => {
    const v = ri(20, 60), t = ri(2, 6), s = v * t, o = numOptions(v, 'km/giờ');
    return { question: `Một ô tô đi quãng đường ${s} km trong ${t} giờ.\nTính vận tốc của ô tô.`, question_speech: `Một ô tô đi ${docSo(s)} ki-lô-mét trong ${docSo(t)} giờ. Tính vận tốc.`, options: o.options, correct_index: o.correct_index, explanation: `Vận tốc = quãng đường : thời gian = ${s} : ${t} = ${v} (km/giờ).`, explanation_speech: `Vận tốc bằng ${docSo(s)} chia ${docSo(t)} bằng ${docSo(v)} ki-lô-mét trên giờ.` };
  },
  // Quãng đường = vận tốc × thời gian
  () => {
    const v = ri(20, 60), t = ri(2, 6), s = v * t, o = numOptions(s, 'km');
    return { question: `Một xe máy đi với vận tốc ${v} km/giờ trong ${t} giờ.\nTính quãng đường đi được.`, question_speech: `Xe máy đi với vận tốc ${docSo(v)} ki-lô-mét trên giờ trong ${docSo(t)} giờ. Tính quãng đường.`, options: o.options, correct_index: o.correct_index, explanation: `Quãng đường = vận tốc × thời gian = ${v} × ${t} = ${s} km.`, explanation_speech: `Quãng đường bằng ${docSo(v)} nhân ${docSo(t)} bằng ${docSo(s)} ki-lô-mét.` };
  },
  // Thời gian = quãng đường : vận tốc
  () => {
    const v = ri(20, 60), t = ri(2, 6), s = v * t, o = numOptions(t, 'giờ');
    return { question: `Một người đi quãng đường ${s} km với vận tốc ${v} km/giờ.\nHỏi đi hết bao nhiêu giờ?`, question_speech: `Đi ${docSo(s)} ki-lô-mét với vận tốc ${docSo(v)} ki-lô-mét trên giờ. Hỏi hết mấy giờ?`, options: o.options, correct_index: o.correct_index, explanation: `Thời gian = quãng đường : vận tốc = ${s} : ${v} = ${t} giờ.`, explanation_speech: `Thời gian bằng ${docSo(s)} chia ${docSo(v)} bằng ${docSo(t)} giờ.` };
  },
  // a% của b
  () => {
    const p = pick([5, 10, 20, 25, 50]), b = ri(1, 12) * 20, ans = (b * p) / 100, o = numOptions(ans);
    return { question: `Tính ${p}% của ${b}.`, question_speech: `Tính ${docSo(p)} phần trăm của ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `${p}% của ${b} = ${b} × ${p} : 100 = ${b * p} : 100 = ${ans}.`, explanation_speech: `${docSo(p)} phần trăm của ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Tìm tỉ số phần trăm
  () => {
    const b = pick([20, 25, 50]), a = ri(1, b), ans = (a * 100) / b, o = numOptions(ans, '%');
    return { question: `Lớp có ${b} học sinh, trong đó ${a} bạn đạt loại Giỏi.\nHỏi số bạn Giỏi chiếm bao nhiêu phần trăm?`, question_speech: `Lớp có ${docSo(b)} học sinh, ${docSo(a)} bạn đạt Giỏi. Hỏi bạn Giỏi chiếm bao nhiêu phần trăm?`, options: o.options, correct_index: o.correct_index, explanation: `Tỉ số phần trăm = ${a} : ${b} × 100 = ${ans}%.`, explanation_speech: `${docSo(a)} chia ${docSo(b)} nhân một trăm bằng ${docSo(ans)} phần trăm.` };
  },
  // Diện tích tam giác = a × h : 2
  () => {
    let a = ri(4, 20), h = ri(3, 18);
    if ((a * h) % 2 !== 0) h += 1;
    const ans = (a * h) / 2, o = numOptions(ans, 'cm²');
    return { question: `Tam giác có đáy ${a} cm và chiều cao ${h} cm.\nTính diện tích tam giác.`, question_speech: `Tam giác đáy ${docSo(a)} xăng-ti-mét, chiều cao ${docSo(h)} xăng-ti-mét. Tính diện tích.`, options: o.options, correct_index: o.correct_index, explanation: `Diện tích tam giác = đáy × chiều cao : 2 = ${a} × ${h} : 2 = ${a * h} : 2 = ${ans} cm².`, explanation_speech: `Đáy nhân chiều cao chia hai bằng ${docSo(ans)} xăng-ti-mét vuông.` };
  },
  // Diện tích hình thang = (a+b) × h : 2
  () => {
    const a = ri(4, 14), b = ri(4, 14); let h = ri(3, 12);
    if (((a + b) * h) % 2 !== 0) h += 1;
    const ans = ((a + b) * h) / 2, o = numOptions(ans, 'cm²');
    return { question: `Hình thang có hai đáy ${a} cm và ${b} cm, chiều cao ${h} cm.\nTính diện tích hình thang.`, question_speech: `Hình thang hai đáy ${docSo(a)} và ${docSo(b)} xăng-ti-mét, cao ${docSo(h)} xăng-ti-mét. Tính diện tích.`, options: o.options, correct_index: o.correct_index, explanation: `Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2 = (${a} + ${b}) × ${h} : 2 = ${a + b} × ${h} : 2 = ${ans} cm².`, explanation_speech: `Tổng hai đáy nhân chiều cao chia hai bằng ${docSo(ans)} xăng-ti-mét vuông.` };
  },
  // Thể tích hình hộp chữ nhật
  () => {
    const a = ri(2, 10), b = ri(2, 8), c = ri(2, 6), ans = a * b * c, o = numOptions(ans, 'cm³');
    return { question: `Hình hộp chữ nhật có chiều dài ${a} cm, rộng ${b} cm, cao ${c} cm.\nTính thể tích.`, question_speech: `Hình hộp chữ nhật dài ${docSo(a)}, rộng ${docSo(b)}, cao ${docSo(c)} xăng-ti-mét. Tính thể tích.`, options: o.options, correct_index: o.correct_index, explanation: `Thể tích = dài × rộng × cao = ${a} × ${b} × ${c} = ${a * b} × ${c} = ${ans} cm³.`, explanation_speech: `Dài nhân rộng nhân cao bằng ${docSo(ans)} xăng-ti-mét khối.` };
  },
  // Cộng hai phân số cùng mẫu (hiển thị a/b)
  () => {
    const c = ri(5, 12), a = ri(1, c - 2), b = ri(1, c - a - 1);
    if (a + b >= c) return null;
    const num = a + b, correct = `${num}/${c}`;
    const o = fromPool(correct, [correct, `${num + 1}/${c}`, `${num}/${c + c}`, `${num - 1}/${c}`, `${a * b}/${c}`]);
    return { question: `Tính: ${a}/${c} + ${b}/${c} = ?`, question_speech: `Tính ${docSo(a)} phần ${docSo(c)} cộng ${docSo(b)} phần ${docSo(c)}.`, options: o.options, correct_index: o.correct_index, explanation: `Cùng mẫu số nên cộng tử số, giữ nguyên mẫu: ${a}/${c} + ${b}/${c} = ${a}+${b} phần ${c} = ${num}/${c}.`, explanation_speech: `Cộng tử giữ nguyên mẫu, được ${docSo(num)} phần ${docSo(c)}.` };
  },
  // Trung bình cộng của 4 số
  () => {
    const avg = ri(10, 50), a = avg + ri(-6, 6), b = avg + ri(-6, 6), c = avg + ri(-6, 6), d = 4 * avg - a - b - c;
    if (d < 1) return null;
    const o = numOptions(avg);
    return { question: `Tìm trung bình cộng của bốn số: ${a}, ${b}, ${c}, ${d}.`, question_speech: `Tìm trung bình cộng của bốn số ${docSo(a)}, ${docSo(b)}, ${docSo(c)}, ${docSo(d)}.`, options: o.options, correct_index: o.correct_index, explanation: `Trung bình cộng = (${a} + ${b} + ${c} + ${d}) : 4 = ${a + b + c + d} : 4 = ${avg}.`, explanation_speech: `Tổng bốn số chia bốn bằng ${docSo(avg)}.` };
  },
  // Đổi đơn vị độ dài (m → cm)
  () => {
    const m = ri(2, 30), ans = m * 100, o = numOptions(ans, 'cm');
    return { question: `Đổi: ${m} m = ? cm`, question_speech: `Đổi ${docSo(m)} mét ra bao nhiêu xăng-ti-mét?`, options: o.options, correct_index: o.correct_index, explanation: `1 m = 100 cm, nên ${m} m = ${m} × 100 = ${ans} cm.`, explanation_speech: `${capitalize(docSo(m))} mét bằng ${docSo(ans)} xăng-ti-mét.` };
  },
];

async function main() {
  const qs = generate(1000, FAMILIES);
  await seedGrade(5, qs, SUBJECT);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
