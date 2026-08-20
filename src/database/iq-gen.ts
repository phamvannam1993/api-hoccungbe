/**
 * Hạ tầng dùng chung để SINH câu hỏi Toán tư duy (lớp 2–5) và seed vào iq_questions.
 * Mỗi lớp có file seed-iq-lopN.ts riêng, định nghĩa FAMILIES (dạng bài) rồi gọi seedGrade().
 */
import { createConnection } from 'mysql2/promise';

export type Q = {
  question: string;
  question_speech: string;
  options: string[];
  correct_index: number;
  explanation: string;
  explanation_speech: string;
};

export function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Đọc số tiếng Việt 0–9999 (cho TTS).
const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function doc2(n: number): string {
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
export function docSo(n: number): string {
  if (n < 100) return doc2(n);
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    let s = DIG[h] + ' trăm';
    if (r === 0) return s;
    if (r < 10) s += ' lẻ ' + DIG[r];
    else s += ' ' + doc2(r);
    return s;
  }
  const th = Math.floor(n / 1000);
  const r = n % 1000;
  let s = DIG[th] + ' nghìn';
  if (r === 0) return s;
  if (r < 100) s += (r < 10 ? ' không trăm lẻ ' + DIG[r] : ' không trăm ' + doc2(r));
  else s += ' ' + docSo(r);
  return s;
}
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const NOUNS = ['quả táo', 'viên bi', 'bông hoa', 'cái kẹo', 'quả bóng', 'chiếc lá', 'ngôi sao', 'con cá', 'cái bánh', 'quyển vở'];
export const NAMES = ['An', 'Bình', 'Cường', 'Dung', 'Hoa', 'Lan', 'Mai', 'Nam', 'Hùng', 'Trang'];

export type Gen = {
  rnd: () => number;
  ri: (min: number, max: number) => number;
  pick: <T>(arr: T[]) => T;
  /** 4 lựa chọn số: 1 đúng + 3 nhiễu gần kề (khác nhau, >=0), xáo trộn. */
  numOptions: (correct: number, unit?: string) => { options: string[]; correct_index: number };
  /** 4 lựa chọn từ danh sách giá trị cho trước (đảm bảo 4 khác nhau). correct phải nằm trong pool. */
  fromPool: (correct: string, pool: string[]) => { options: string[]; correct_index: number };
};

export function createGen(seed: number): Gen {
  const rnd = mulberry32(seed);
  const ri = (min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)];

  const numOptions = (correct: number, unit = '') => {
    const chosen = new Set<number>([correct]);
    const step = correct >= 40 ? 5 : 1;
    const deltas = [step, -step, step * 2, -step * 2, step * 3, -step * 3, 10, -10, 1, -1].sort(() => rnd() - 0.5);
    const ds: number[] = [];
    for (const d of deltas) {
      const v = correct + d;
      if (v >= 0 && !chosen.has(v)) {
        chosen.add(v);
        ds.push(v);
        if (ds.length === 3) break;
      }
    }
    let k = 4;
    while (ds.length < 3) {
      const v = correct + k++;
      if (!chosen.has(v)) { chosen.add(v); ds.push(v); }
    }
    const arr = [correct, ...ds];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const fmt = (v: number) => (unit ? `${v} ${unit}` : `${v}`);
    return { options: arr.map(fmt), correct_index: arr.indexOf(correct) };
  };

  const fromPool = (correct: string, pool: string[]) => {
    const others = pool.filter((x) => x !== correct);
    const chosen: string[] = [];
    const shuffled = others.slice().sort(() => rnd() - 0.5);
    for (const x of shuffled) {
      if (chosen.length === 3) break;
      chosen.push(x);
    }
    const arr = [correct, ...chosen];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return { options: arr, correct_index: arr.indexOf(correct) };
  };

  return { rnd, ri, pick, numOptions, fromPool };
}

/** Sinh `count` câu KHÔNG trùng từ danh sách dạng bài (round-robin cân bằng). */
export function generate(count: number, families: Array<() => Q | null>): Q[] {
  const out: Q[] = [];
  const seen = new Set<string>();
  let i = 0;
  let guard = 0;
  while (out.length < count && guard < count * 80) {
    guard++;
    const fam = families[i % families.length];
    i++;
    const q = fam();
    if (!q) continue;
    if (q.correct_index < 0 || q.correct_index > 3 || q.options.length !== 4) continue;
    if (new Set(q.options).size !== 4) continue;
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

/** In thống kê + upsert vào DB (bỏ qua nếu --dry). code = iq-l{grade}-0001… */
export async function seedGrade(grade: number, questions: Q[], subject: string, lesson = 'Toán tư duy') {
  console.log(`\n[Lớp ${grade}] Đã sinh ${questions.length} câu (không trùng).`);
  const bad = questions.filter((q) => q.options[q.correct_index] == null);
  console.log(`[Lớp ${grade}] Câu lỗi đáp án: ${bad.length} (phải 0).`);
  console.log('— 3 câu mẫu —');
  for (const q of questions.slice(0, 3)) {
    console.log(`  Q: ${q.question.replace(/\n/g, ' ')}`);
    console.log(`     ${q.options.map((o, i) => `${String.fromCharCode(65 + i)}.${o}`).join('  ')}  → đúng: ${String.fromCharCode(65 + q.correct_index)}`);
    console.log(`     Giải: ${q.explanation}`);
  }

  if (process.argv.includes('--dry')) {
    console.log(`(--dry) Không ghi DB.`);
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
      const code = `iq-l${grade}-${String(n + 1).padStart(4, '0')}`;
      await conn.query(
        `INSERT INTO iq_questions
          (code, grade, subject, lesson, question, questionSpeech, optionsJson, correctIndex, explanation, explanationSpeech, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, CAST(? AS JSON), ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           question=VALUES(question), questionSpeech=VALUES(questionSpeech), optionsJson=VALUES(optionsJson),
           correctIndex=VALUES(correctIndex), explanation=VALUES(explanation), explanationSpeech=VALUES(explanationSpeech),
           sortOrder=VALUES(sortOrder), isActive=1`,
        [code, grade, subject, lesson, q.question, q.question_speech, JSON.stringify(q.options), q.correct_index, q.explanation, q.explanation_speech, n + 1],
      );
      n++;
    }
    console.log(`✅ [Lớp ${grade}] Đã upsert ${n} câu vào iq_questions.`);
  } finally {
    await conn.end();
  }
}
