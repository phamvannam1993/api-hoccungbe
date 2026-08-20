/**
 * 1000 câu TOÁN TƯ DUY LỚP 3 → iq_questions (grade=3).
 * Nhân/chia bảng cửu chương, số đến 1000, gấp–giảm số lần, tìm x, trồng cây, chu vi, một phần mấy.
 */
import 'dotenv/config';
import { createGen, generate, seedGrade, docSo, capitalize, NAMES, type Q, type Level } from './iq-gen';

const G = createGen(330003);
const { ri, pick, numOptions } = G;
const SUBJECT = 'THỬ THÁCH IQ|LỚP 3 - Toán tư duy';

const FAMILIES: Array<() => Q | null> = [
  // Nhân bảng cửu chương
  () => {
    const a = ri(2, 9), b = ri(2, 9), ans = a * b, o = numOptions(ans);
    return { question: `Tính: ${a} × ${b} = ?`, question_speech: `Tính ${docSo(a)} nhân ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Theo bảng nhân: ${a} × ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} nhân ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Chia hết
  () => {
    const b = ri(2, 9), q = ri(2, 9), a = b * q, ans = q, o = numOptions(ans);
    return { question: `Tính: ${a} : ${b} = ?`, question_speech: `Tính ${docSo(a)} chia ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Vì ${b} × ${q} = ${a} nên ${a} : ${b} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} chia ${docSo(b)} bằng ${docSo(ans)}.` };
  },
  // Cộng trong 1000
  () => {
    const a = ri(100, 500), b = ri(100, 999 - a), ans = a + b, o = numOptions(ans);
    return { question: `Tính: ${a} + ${b} = ?`, question_speech: `Tính ${docSo(a)} cộng ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Đặt tính rồi tính: ${a} + ${b} = ${ans}.`, explanation_speech: `Kết quả bằng ${docSo(ans)}.` };
  },
  // Trừ trong 1000
  () => {
    const a = ri(300, 999), b = ri(100, a - 50), ans = a - b, o = numOptions(ans);
    return { question: `Tính: ${a} − ${b} = ?`, question_speech: `Tính ${docSo(a)} trừ ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Đặt tính rồi tính: ${a} − ${b} = ${ans}.`, explanation_speech: `Kết quả bằng ${docSo(ans)}.` };
  },
  // Gấp n lần
  () => {
    const a = ri(4, 20), n = ri(2, 6), ans = a * n, o = numOptions(ans);
    return { question: `Gấp ${a} lên ${n} lần được số nào?`, question_speech: `Gấp ${docSo(a)} lên ${docSo(n)} lần được số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Gấp lên ${n} lần là lấy ${a} × ${n} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} nhân ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // Giảm n lần
  () => {
    const n = ri(2, 6), ans = ri(3, 15), a = ans * n, o = numOptions(ans);
    return { question: `Giảm ${a} đi ${n} lần được số nào?`, question_speech: `Giảm ${docSo(a)} đi ${docSo(n)} lần được số nào?`, options: o.options, correct_index: o.correct_index, explanation: `Giảm đi ${n} lần là lấy ${a} : ${n} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} chia ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // Tìm x: x × a = b
  () => {
    const a = ri(2, 9), x = ri(2, 9), b = a * x, o = numOptions(x);
    return { question: `Tìm x, biết: x × ${a} = ${b}`, question_speech: `Tìm x, biết x nhân ${docSo(a)} bằng ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Muốn tìm thừa số chưa biết, lấy tích chia thừa số kia: x = ${b} : ${a} = ${x}.`, explanation_speech: `x bằng ${docSo(b)} chia ${docSo(a)} bằng ${docSo(x)}.` };
  },
  // Tìm x: x + a = b
  () => {
    const a = ri(20, 200), x = ri(20, 300), b = a + x, o = numOptions(x);
    return { question: `Tìm x, biết: x + ${a} = ${b}`, question_speech: `Tìm x, biết x cộng ${docSo(a)} bằng ${docSo(b)}.`, options: o.options, correct_index: o.correct_index, explanation: `Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng kia: x = ${b} − ${a} = ${x}.`, explanation_speech: `x bằng ${docSo(b)} trừ ${docSo(a)} bằng ${docSo(x)}.` };
  },
  // Trồng cây 2 đầu
  () => {
    const k = pick([2, 3, 4, 5]), cay = ri(4, 12), L = k * (cay - 1), ans = cay, o = numOptions(ans, 'cây');
    return { question: `Trồng cây dọc một đoạn đường dài ${L} m, hai cây liền nhau cách nhau ${k} m và trồng ở cả hai đầu.\nHỏi trồng được bao nhiêu cây?`, question_speech: `Trồng cây dọc đoạn đường dài ${docSo(L)} mét, hai cây cách nhau ${docSo(k)} mét, trồng ở cả hai đầu. Hỏi trồng được bao nhiêu cây?`, options: o.options, correct_index: o.correct_index, explanation: `Số khoảng cách = ${L} : ${k} = ${cay - 1}. Trồng cả hai đầu nên số cây = số khoảng + 1 = ${cay - 1} + 1 = ${ans} cây.`, explanation_speech: `Số khoảng bằng ${docSo(cay - 1)}, cộng thêm một được ${docSo(ans)} cây.` };
  },
  // Chia đều
  () => {
    const b = ri(3, 8), moi = ri(3, 12), a = b * moi, ans = moi, o = numOptions(ans, 'cái');
    return { question: `Có ${a} cái bánh chia đều cho ${b} bạn.\nHỏi mỗi bạn được bao nhiêu cái bánh?`, question_speech: `Có ${docSo(a)} cái bánh chia đều cho ${docSo(b)} bạn. Hỏi mỗi bạn được mấy cái bánh?`, options: o.options, correct_index: o.correct_index, explanation: `Chia đều: ${a} : ${b} = ${ans}. Mỗi bạn được ${ans} cái bánh.`, explanation_speech: `${capitalize(docSo(a))} chia ${docSo(b)} bằng ${docSo(ans)} cái.` };
  },
  // Chu vi hình vuông
  () => {
    const c = ri(3, 25), ans = 4 * c, o = numOptions(ans, 'cm');
    return { question: `Hình vuông có cạnh ${c} cm.\nTính chu vi hình vuông đó.`, question_speech: `Hình vuông có cạnh ${docSo(c)} xăng-ti-mét. Tính chu vi.`, options: o.options, correct_index: o.correct_index, explanation: `Chu vi hình vuông = cạnh × 4 = ${c} × 4 = ${ans} cm.`, explanation_speech: `Cạnh nhân bốn bằng ${docSo(ans)} xăng-ti-mét.` };
  },
  // Chu vi hình chữ nhật
  () => {
    const d = ri(6, 30), r = ri(3, d - 1), ans = 2 * (d + r), o = numOptions(ans, 'cm');
    return { question: `Hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm.\nTính chu vi hình chữ nhật.`, question_speech: `Hình chữ nhật dài ${docSo(d)} xăng-ti-mét, rộng ${docSo(r)} xăng-ti-mét. Tính chu vi.`, options: o.options, correct_index: o.correct_index, explanation: `Chu vi = (dài + rộng) × 2 = (${d} + ${r}) × 2 = ${d + r} × 2 = ${ans} cm.`, explanation_speech: `Dài cộng rộng nhân hai bằng ${docSo(ans)} xăng-ti-mét.` };
  },
  // Một phần mấy của một số (hiển thị phân số 1/n)
  () => {
    const n = pick([2, 3, 4, 5]), ans = ri(3, 15), a = ans * n, o = numOptions(ans);
    return { question: `Tính 1/${n} của số ${a}.`, question_speech: `Tính một phần ${docSo(n)} của số ${docSo(a)}.`, options: o.options, correct_index: o.correct_index, explanation: `Muốn tìm 1/${n} của một số, ta lấy số đó chia cho ${n}: ${a} : ${n} = ${ans}.`, explanation_speech: `${capitalize(docSo(a))} chia ${docSo(n)} bằng ${docSo(ans)}.` };
  },
  // ── SUY LUẬN ──────────────────────────────────────────────────────────────
  // Bốc bi chắc chắn đủ 2 màu (pigeonhole)
  () => {
    const a = ri(4, 12), b = ri(4, 12), ans = Math.max(a, b) + 1, o = numOptions(ans, 'viên');
    return { question: `Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh, kích thước như nhau.\nKhông nhìn vào hộp, phải lấy ra ít nhất bao nhiêu viên để chắc chắn có đủ cả hai màu?`, question_speech: `Hộp có ${docSo(a)} bi đỏ và ${docSo(b)} bi xanh. Không nhìn, phải lấy ít nhất mấy viên để chắc chắn đủ hai màu?`, options: o.options, correct_index: o.correct_index, explanation: `Trường hợp xấu nhất là lấy hết ${Math.max(a, b)} viên cùng một màu (màu nhiều hơn) mà vẫn chưa đủ 2 màu. Lấy thêm 1 viên nữa chắc chắn khác màu. Vậy cần ${Math.max(a, b)} + 1 = ${ans} viên.`, explanation_speech: `Cần ít nhất ${docSo(ans)} viên.` };
  },
  // Tuổi: biết tổng và hiệu
  () => {
    const con = ri(4, 12), hieu = ri(20, 30), me = con + hieu, tong = con + me, o = numOptions(con, 'tuổi');
    return { question: `Mẹ hơn con ${hieu} tuổi. Tổng số tuổi của hai mẹ con là ${tong} tuổi.\nHỏi con bao nhiêu tuổi?`, question_speech: `Mẹ hơn con ${docSo(hieu)} tuổi. Tổng tuổi hai mẹ con là ${docSo(tong)}. Hỏi con mấy tuổi?`, options: o.options, correct_index: o.correct_index, explanation: `Tuổi con = (tổng − hiệu) : 2 = (${tong} − ${hieu}) : 2 = ${tong - hieu} : 2 = ${con} tuổi.`, explanation_speech: `Con ${docSo(con)} tuổi.` };
  },
  // Giả thiết tạm: gà và chó
  () => {
    const ga = ri(4, 12), cho = ri(3, 10), H = ga + cho, C = 2 * ga + 4 * cho, o = numOptions(cho, 'con');
    return { question: `Vừa gà vừa chó có ${H} con, tất cả có ${C} chân.\nHỏi có bao nhiêu con chó?`, question_speech: `Vừa gà vừa chó có ${docSo(H)} con, tất cả ${docSo(C)} chân. Hỏi mấy con chó?`, options: o.options, correct_index: o.correct_index, explanation: `Giả sử ${H} con đều là gà thì có ${2 * H} chân, thiếu ${C} − ${2 * H} = ${C - 2 * H} chân. Mỗi con chó hơn con gà 2 chân, nên số chó = ${C - 2 * H} : 2 = ${cho} con.`, explanation_speech: `Có ${docSo(cho)} con chó.` };
  },
  // Lập số 3 chữ số khác nhau
  () => {
    const n = 4, ans = n * (n - 1) * (n - 2);
    const digs = [ri(1, 2), ri(3, 4), ri(5, 6), ri(7, 9)];
    const o = numOptions(ans, 'số');
    return { question: `Từ bốn chữ số ${digs.join(', ')} lập được bao nhiêu số có ba chữ số khác nhau?`, question_speech: `Từ bốn chữ số ${digs.map(docSo).join(', ')} lập được bao nhiêu số có ba chữ số khác nhau?`, options: o.options, correct_index: o.correct_index, explanation: `Hàng trăm có ${n} cách chọn, hàng chục còn ${n - 1} cách, hàng đơn vị còn ${n - 2} cách. Vậy có ${n} × ${n - 1} × ${n - 2} = ${ans} số.`, explanation_speech: `Có ${docSo(ans)} số.` };
  },
];

const DIFFS: Level[] = ['easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'medium', 'easy', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard'];

async function main() {
  const qs = generate(1000, FAMILIES, DIFFS);
  await seedGrade(3, qs, SUBJECT);
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
