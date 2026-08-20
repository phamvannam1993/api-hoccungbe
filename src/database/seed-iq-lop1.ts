/**
 * Sinh & seed 1000 câu TOÁN TƯ DUY LỚP 1 vào bảng iq_questions.
 *   npm run seed:iq-lop1          → sinh + upsert vào DB (theo code, chạy lại an toàn)
 *   npm run seed:iq-lop1 -- --dry → chỉ sinh + in thống kê/mẫu, KHÔNG đụng DB
 *
 * Câu hỏi sinh bằng nhiều "dạng bài" (đếm, cộng, trừ, so sánh, dãy số, quy luật,
 * gấp đôi, đếm chân, nhiều hơn/ít hơn, tổng 3 số, logic…). Số ngẫu nhiên có seed cố
 * định → đáp án + lời giải tự tính nên CHUẨN 100% và tái lập được (idempotent).
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

// ── PRNG có seed (mulberry32) ────────────────────────────────────────────────
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260820);
const ri = (min: number, max: number) => min + Math.floor(rnd() * (max - min + 1)); // [min,max]
const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)];

// ── Đọc số tiếng Việt 0–99 (cho TTS) ─────────────────────────────────────────
const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function docSo(n: number): string {
  if (n < 10) return DIG[n];
  if (n === 10) return 'mười';
  if (n < 20) {
    const u = n % 10;
    return 'mười' + (u === 0 ? '' : u === 5 ? ' lăm' : ' ' + DIG[u]);
  }
  const t = Math.floor(n / 10);
  const u = n % 10;
  let s = DIG[t] + ' mươi';
  if (u === 1) s += ' mốt';
  else if (u === 4) s += ' tư';
  else if (u === 5) s += ' lăm';
  else if (u !== 0) s += ' ' + DIG[u];
  return s;
}
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ── Kiểu câu hỏi thô ─────────────────────────────────────────────────────────
type Q = {
  question: string;
  question_speech: string;
  options: string[];
  correct_index: number;
  explanation: string;
  explanation_speech: string;
};

// Tạo 4 lựa chọn số: 1 đúng + 3 nhiễu gần kề (khác nhau, >=0), rồi xáo trộn.
function numOptions(correct: number, unit = ''): { options: string[]; correct_index: number } {
  const chosen = new Set<number>([correct]);
  const deltas = [1, -1, 2, -2, 3, -3, 4, -4, 5, 10].sort(() => rnd() - 0.5);
  const ds: number[] = [];
  for (const d of deltas) {
    const v = correct + d;
    if (v >= 0 && !chosen.has(v)) {
      chosen.add(v);
      ds.push(v);
      if (ds.length === 3) break;
    }
  }
  while (ds.length < 3) ds.push(correct + ds.length + 6); // dự phòng
  const arr = [correct, ...ds];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const fmt = (v: number) => (unit ? `${v} ${unit}` : `${v}`);
  return { options: arr.map(fmt), correct_index: arr.indexOf(correct) };
}

const NOUNS = [
  { s: 'quả táo', p: 'quả táo' },
  { s: 'viên bi', p: 'viên bi' },
  { s: 'bông hoa', p: 'bông hoa' },
  { s: 'con chim', p: 'con chim' },
  { s: 'cái kẹo', p: 'cái kẹo' },
  { s: 'quả bóng', p: 'quả bóng' },
  { s: 'chiếc lá', p: 'chiếc lá' },
  { s: 'ngôi sao', p: 'ngôi sao' },
  { s: 'con cá', p: 'con cá' },
  { s: 'cái bánh', p: 'cái bánh' },
];
const NAMES = ['An', 'Bình', 'Cường', 'Dung', 'Hoa', 'Lan', 'Mai', 'Nam', 'Hùng', 'Trang'];

// ── Các dạng bài (mỗi hàm trả về Q) ─────────────────────────────────────────
const FAMILIES: Array<() => Q> = [
  // 1. Cộng có lời văn (tổng ≤ 20)
  () => {
    const a = ri(2, 12);
    const b = ri(2, 20 - a);
    const n = pick(NOUNS);
    const ans = a + b;
    const o = numOptions(ans, n.p.split(' ')[0]);
    return {
      question: `Có ${a} ${n.p}, thêm ${b} ${n.p} nữa.\nHỏi có tất cả mấy ${n.p}?`,
      question_speech: `Có ${docSo(a)} ${n.p}, thêm ${docSo(b)} ${n.p} nữa. Hỏi có tất cả mấy ${n.p}?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Lấy ${a} cộng ${b}: ${a} + ${b} = ${ans}. Vậy có ${ans} ${n.p}.`,
      explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)}. Vậy có ${docSo(ans)} ${n.p}.`,
    };
  },
  // 2. Trừ có lời văn
  () => {
    const a = ri(5, 20);
    const b = ri(1, a - 1);
    const n = pick(NOUNS);
    const ans = a - b;
    const o = numOptions(ans, n.p.split(' ')[0]);
    return {
      question: `Có ${a} ${n.p}, cho bạn ${b} ${n.p}.\nHỏi còn lại mấy ${n.p}?`,
      question_speech: `Có ${docSo(a)} ${n.p}, cho bạn ${docSo(b)} ${n.p}. Hỏi còn lại mấy ${n.p}?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Lấy ${a} trừ ${b}: ${a} − ${b} = ${ans}. Vậy còn ${ans} ${n.p}.`,
      explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}. Vậy còn ${docSo(ans)} ${n.p}.`,
    };
  },
  // 3. Cộng thuần
  () => {
    const a = ri(1, 15);
    const b = ri(1, 20 - a);
    const ans = a + b;
    const o = numOptions(ans);
    return {
      question: `Tính: ${a} + ${b} = ?`,
      question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} bằng bao nhiêu?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `${a} + ${b} = ${ans}.`,
      explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} bằng ${docSo(ans)}.`,
    };
  },
  // 4. Trừ thuần
  () => {
    const a = ri(3, 20);
    const b = ri(1, a - 1);
    const ans = a - b;
    const o = numOptions(ans);
    return {
      question: `Tính: ${a} − ${b} = ?`,
      question_speech: `Tính ${docSo(a)} trừ ${docSo(b)} bằng bao nhiêu?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `${a} − ${b} = ${ans}.`,
      explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(ans)}.`,
    };
  },
  // 5. So sánh — số lớn nhất
  () => {
    const set = new Set<number>();
    while (set.size < 4) set.add(ri(1, 20));
    const nums = [...set];
    const ans = Math.max(...nums);
    const arr = nums.slice().sort(() => rnd() - 0.5);
    return {
      question: `Trong các số ${nums.join(', ')}, số nào lớn nhất?`,
      question_speech: `Trong các số ${nums.map(docSo).join(', ')}, số nào lớn nhất?`,
      options: arr.map(String),
      correct_index: arr.indexOf(ans),
      explanation: `So sánh ${nums.join(', ')} thì ${ans} là số lớn nhất.`,
      explanation_speech: `So sánh các số đã cho thì ${docSo(ans)} là số lớn nhất.`,
    };
  },
  // 6. So sánh — số nhỏ nhất
  () => {
    const set = new Set<number>();
    while (set.size < 4) set.add(ri(1, 20));
    const nums = [...set];
    const ans = Math.min(...nums);
    const arr = nums.slice().sort(() => rnd() - 0.5);
    return {
      question: `Trong các số ${nums.join(', ')}, số nào nhỏ nhất?`,
      question_speech: `Trong các số ${nums.map(docSo).join(', ')}, số nào nhỏ nhất?`,
      options: arr.map(String),
      correct_index: arr.indexOf(ans),
      explanation: `So sánh ${nums.join(', ')} thì ${ans} là số nhỏ nhất.`,
      explanation_speech: `So sánh các số đã cho thì ${docSo(ans)} là số nhỏ nhất.`,
    };
  },
  // 7. Số liền sau
  () => {
    const n = ri(0, 19);
    const ans = n + 1;
    const o = numOptions(ans);
    return {
      question: `Số liền sau của số ${n} là số nào?`,
      question_speech: `Số liền sau của số ${docSo(n)} là số nào?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Đếm tiếp sau ${n} được ${ans}. Vậy số liền sau của ${n} là ${ans}.`,
      explanation_speech: `Đếm tiếp sau ${docSo(n)} được ${docSo(ans)}.`,
    };
  },
  // 8. Số liền trước
  () => {
    const n = ri(1, 20);
    const ans = n - 1;
    const o = numOptions(ans);
    return {
      question: `Số liền trước của số ${n} là số nào?`,
      question_speech: `Số liền trước của số ${docSo(n)} là số nào?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Số đứng ngay trước ${n} là ${ans}. Vậy số liền trước của ${n} là ${ans}.`,
      explanation_speech: `Số đứng ngay trước ${docSo(n)} là ${docSo(ans)}.`,
    };
  },
  // 9. Dãy số +1 (điền số thiếu ở giữa)
  () => {
    const s = ri(1, 12);
    const seq = [s, s + 1, s + 2, s + 3, s + 4];
    const pos = ri(1, 3);
    const ans = seq[pos];
    const shown = seq.map((v, i) => (i === pos ? '?' : v)).join(', ');
    const o = numOptions(ans);
    return {
      question: `Điền số còn thiếu vào dãy: ${shown}`,
      question_speech: `Điền số còn thiếu vào dãy: ${seq.map((v, i) => (i === pos ? 'dấu hỏi' : docSo(v))).join(', ')}.`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Dãy số đếm tăng dần từng 1 đơn vị nên số còn thiếu là ${ans}.`,
      explanation_speech: `Dãy số tăng dần từng một đơn vị nên số còn thiếu là ${docSo(ans)}.`,
    };
  },
  // 10. Dãy số +2 (số chẵn/lẻ)
  () => {
    const s = ri(1, 6) * 2 - ri(0, 1); // chẵn hoặc lẻ
    const seq = [s, s + 2, s + 4, s + 6, s + 8];
    const pos = ri(1, 4);
    const ans = seq[pos];
    const shown = seq.map((v, i) => (i === pos ? '?' : v)).join(', ');
    const o = numOptions(ans);
    return {
      question: `Điền số còn thiếu vào dãy: ${shown}`,
      question_speech: `Điền số còn thiếu vào dãy: ${seq.map((v, i) => (i === pos ? 'dấu hỏi' : docSo(v))).join(', ')}.`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Dãy số tăng dần từng 2 đơn vị nên số còn thiếu là ${ans}.`,
      explanation_speech: `Dãy số tăng dần từng hai đơn vị nên số còn thiếu là ${docSo(ans)}.`,
    };
  },
  // 11. Gấp đôi
  () => {
    const n = ri(1, 10);
    const ans = n * 2;
    const o = numOptions(ans);
    return {
      question: `Gấp đôi số ${n} là số nào?`,
      question_speech: `Gấp đôi số ${docSo(n)} là số nào?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Gấp đôi là lấy ${n} + ${n} = ${ans}.`,
      explanation_speech: `Gấp đôi là lấy ${docSo(n)} cộng ${docSo(n)} bằng ${docSo(ans)}.`,
    };
  },
  // 12. Đếm chân (gà 2 chân)
  () => {
    const n = ri(2, 8);
    const ans = n * 2;
    const o = numOptions(ans, 'chân');
    return {
      question: `Mỗi con gà có 2 chân.\nHỏi ${n} con gà có bao nhiêu chân?`,
      question_speech: `Mỗi con gà có hai chân. Hỏi ${docSo(n)} con gà có bao nhiêu chân?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Mỗi con 2 chân, ${n} con là 2 × ${n} = ${ans} chân.`,
      explanation_speech: `Mỗi con hai chân, ${docSo(n)} con là hai nhân ${docSo(n)} bằng ${docSo(ans)} chân.`,
    };
  },
  // 13. Nhiều hơn bao nhiêu
  () => {
    const b = ri(2, 12);
    const d = ri(1, 8);
    const a = b + d;
    const na = pick(NAMES);
    let nb = pick(NAMES);
    while (nb === na) nb = pick(NAMES);
    const o = numOptions(d, 'cái');
    return {
      question: `${na} có ${a} cái kẹo, ${nb} có ${b} cái kẹo.\nHỏi ${na} có nhiều hơn ${nb} mấy cái kẹo?`,
      question_speech: `${na} có ${docSo(a)} cái kẹo, ${nb} có ${docSo(b)} cái kẹo. Hỏi ${na} có nhiều hơn ${nb} mấy cái kẹo?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `Lấy ${a} trừ ${b}: ${a} − ${b} = ${d}. Vậy ${na} nhiều hơn ${nb} ${d} cái kẹo.`,
      explanation_speech: `${capitalize(docSo(a))} trừ ${docSo(b)} bằng ${docSo(d)}. Vậy nhiều hơn ${docSo(d)} cái kẹo.`,
    };
  },
  // 14. Tổng 3 số nhỏ
  () => {
    const a = ri(1, 6);
    const b = ri(1, 6);
    const c = ri(1, 6);
    const ans = a + b + c;
    const o = numOptions(ans);
    return {
      question: `Tính: ${a} + ${b} + ${c} = ?`,
      question_speech: `Tính ${docSo(a)} cộng ${docSo(b)} cộng ${docSo(c)} bằng bao nhiêu?`,
      options: o.options,
      correct_index: o.correct_index,
      explanation: `${a} + ${b} + ${c} = ${ans}.`,
      explanation_speech: `${capitalize(docSo(a))} cộng ${docSo(b)} cộng ${docSo(c)} bằng ${docSo(ans)}.`,
    };
  },
  // 15. Logic cao/thấp (3 bạn)
  () => {
    const set = new Set<string>();
    while (set.size < 3) set.add(pick(NAMES));
    const [x, y, z] = [...set]; // x cao hơn y, y cao hơn z → z thấp nhất, x cao nhất
    const askTallest = rnd() < 0.5;
    const ans = askTallest ? x : z;
    const opts = [x, y, z, 'Không rõ'].sort(() => rnd() - 0.5);
    return {
      question: `${x} cao hơn ${y}. ${y} cao hơn ${z}.\nHỏi ai ${askTallest ? 'cao nhất' : 'thấp nhất'}?`,
      question_speech: `${x} cao hơn ${y}. ${y} cao hơn ${z}. Hỏi ai ${askTallest ? 'cao nhất' : 'thấp nhất'}?`,
      options: opts,
      correct_index: opts.indexOf(ans),
      explanation: `${x} cao hơn ${y}, ${y} cao hơn ${z} nên ${x} cao nhất và ${z} thấp nhất. Vậy ${ans} ${askTallest ? 'cao nhất' : 'thấp nhất'}.`,
      explanation_speech: `${x} cao hơn ${y}, ${y} cao hơn ${z}, nên ${ans} là người ${askTallest ? 'cao nhất' : 'thấp nhất'}.`,
    };
  },
];

// ── Sinh N câu KHÔNG trùng ───────────────────────────────────────────────────
function generate(count: number): Q[] {
  const out: Q[] = [];
  const seen = new Set<string>();
  let i = 0;
  let guard = 0;
  while (out.length < count && guard < count * 50) {
    guard++;
    const fam = FAMILIES[i % FAMILIES.length];
    i++;
    const q = fam();
    if (q.correct_index < 0 || q.correct_index > 3 || q.options.length !== 4) continue;
    if (new Set(q.options).size !== 4) continue; // 4 lựa chọn phải khác nhau
    const key = q.question.replace(/\s+/g, ' ').trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS iq_questions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(120) NULL,
  grade TINYINT UNSIGNED NOT NULL,
  subject VARCHAR(255) NULL,
  lesson VARCHAR(255) NULL,
  question TEXT NOT NULL,
  questionSpeech TEXT NULL,
  optionsJson JSON NOT NULL,
  correctIndex TINYINT UNSIGNED NOT NULL DEFAULT 0,
  countdownJson JSON NULL,
  explanation TEXT NULL,
  explanationSpeech TEXT NULL,
  sortOrder INT UNSIGNED NOT NULL DEFAULT 1,
  isActive TINYINT(1) NOT NULL DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_iq_questions_code (code),
  KEY idx_iq_questions_grade (grade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

async function main() {
  const dry = process.argv.includes('--dry');
  const TOTAL = 1000;
  const questions = generate(TOTAL);
  console.log(`→ Đã sinh ${questions.length}/${TOTAL} câu (không trùng).`);

  // Kiểm tra nhanh tính hợp lệ
  const bad = questions.filter((q) => q.options[q.correct_index] == null);
  console.log(`→ Câu lỗi đáp án: ${bad.length} (phải 0).`);
  console.log('— 3 câu mẫu —');
  for (const q of questions.slice(0, 3)) {
    console.log(`  Q: ${q.question.replace(/\n/g, ' ')}`);
    console.log(`     ${q.options.map((o, i) => `${String.fromCharCode(65 + i)}.${o}`).join('  ')}  → đúng: ${String.fromCharCode(65 + q.correct_index)}`);
    console.log(`     Giải: ${q.explanation}`);
  }

  if (dry) {
    console.log('\n(--dry) Không ghi DB.');
    return;
  }

  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  try {
    await conn.query(CREATE_TABLE);
    let n = 0;
    for (const q of questions) {
      const code = `iq-l1-${String(n + 1).padStart(4, '0')}`;
      await conn.query(
        `INSERT INTO iq_questions
          (code, grade, subject, lesson, question, questionSpeech, optionsJson, correctIndex, explanation, explanationSpeech, sortOrder, isActive)
         VALUES (?, 1, ?, ?, ?, ?, CAST(? AS JSON), ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           question=VALUES(question), questionSpeech=VALUES(questionSpeech), optionsJson=VALUES(optionsJson),
           correctIndex=VALUES(correctIndex), explanation=VALUES(explanation), explanationSpeech=VALUES(explanationSpeech),
           sortOrder=VALUES(sortOrder), isActive=1`,
        [
          code,
          'THỬ THÁCH IQ|LỚP 1 - Toán tư duy',
          'Toán tư duy',
          q.question,
          q.question_speech,
          JSON.stringify(q.options),
          q.correct_index,
          q.explanation,
          q.explanation_speech,
          n + 1,
        ],
      );
      n++;
    }
    console.log(`\n✅ Đã upsert ${n} câu vào iq_questions (grade=1).`);
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error('❌ Lỗi seed:', e.message);
  process.exit(1);
});
