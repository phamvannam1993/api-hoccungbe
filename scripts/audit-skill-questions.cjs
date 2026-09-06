/**
 * Soát nội dung kho câu hỏi kỹ năng (skill_questions).
 *
 * Kiểm ĐỘC LẬP với bộ sinh: đọc thẳng từ DB rồi tự tính lại đáp án từ đề bài,
 * chứ không tin vào dữ liệu bộ sinh ghi ra. Bộ sinh sai thì cổng chất lượng
 * trong chính nó cũng sai theo, nên phải có một lớp soát riêng.
 *
 *   node scripts/audit-skill-questions.cjs            # tóm tắt
 *   node scripts/audit-skill-questions.cjs --detail   # in từng câu lỗi
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const DETAIL = process.argv.includes('--detail');

const num = (v) => {
  const t = String(v)
    .trim()
    .replace(/\s/g, '')
    .replace(/[.,;:]+$/, '')          // bỏ dấu câu dính cuối: "0,672." → "0,672"
    .replace(/\.(?=\d{3}\b)/g, '')   // "1.000" là phân cách nghìn
    .replace(',', '.');               // "0,672" là thập phân
  return Number(t);
};

/** Tự tính lại vế trái của đề dạng "a op b = ?" (kể cả chuỗi nhiều phép tính). */
function computeFromQuestion(text) {
  const norm = text.replace(/ : /g, ' § ').replace(/×/g, '*').replace(/−/g, '-');
  const m = /^\s*(-?\d[\d.,]*(?:\s*[-+*§]\s*-?\d[\d.,]*)+)\s*=\s*\?\s*$/.exec(norm);
  if (!m) return null;
  const tokens = m[1].split(/\s*([-+*§])\s*/).filter((x) => x !== '');
  const vals = [num(tokens[0])];
  const ops = [];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const v = num(tokens[i + 1]);
    if (!Number.isFinite(v)) return null;
    if (op === '*') vals[vals.length - 1] *= v;
    else if (op === '§') { if (v === 0) return null; vals[vals.length - 1] /= v; }
    else { ops.push(op); vals.push(v); }
  }
  if (!vals.every(Number.isFinite)) return null;
  let acc = vals[0];
  for (let i = 0; i < ops.length; i++) acc = ops[i] === '+' ? acc + vals[i + 1] : acc - vals[i + 1];
  return acc;
}

/** Quét mọi phép tính "a op b = c" trong lời giải và tự tính lại. */
function badArithmetic(text) {
  const norm = text.replace(/ : /g, ' § ').replace(/:/g, ' ').replace(/×/g, '*').replace(/−/g, '-');
  const re = /(-?\d[\d.,]*(?:\s*[-+*§]\s*-?\d[\d.,]*)+)\s*=\s*(-?\d[\d.,]*)/g;
  const bad = [];
  let m;
  while ((m = re.exec(norm))) {
    const expected = num(m[2]);
    if (!Number.isFinite(expected)) continue;
    const tokens = m[1].split(/\s*([-+*§])\s*/).filter((x) => x !== '');
    const vals = [num(tokens[0])];
    const ops = [];
    let ok = true;
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const v = num(tokens[i + 1]);
      if (!Number.isFinite(v)) { ok = false; break; }
      if (op === '*') vals[vals.length - 1] *= v;
      else if (op === '§') { if (v === 0) { ok = false; break; } vals[vals.length - 1] /= v; }
      else { ops.push(op); vals.push(v); }
    }
    if (!ok || !vals.every(Number.isFinite)) continue;
    let acc = vals[0];
    for (let i = 0; i < ops.length; i++) acc = ops[i] === '+' ? acc + vals[i + 1] : acc - vals[i + 1];
    if (Math.abs(acc - expected) > 1e-6) bad.push(`${m[1].replace(/§/g, ':')} = ${m[2]} (đúng ra ${Math.round(acc * 1000) / 1000})`);
  }
  return bad;
}

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.query(`
    SELECT sq.id, sq.code, sq.grade, sq.difficulty, sq.questionText, sq.optionsJson,
           sq.correctIndex, sq.explanation, sq.variantGroup, s.code AS skill, s.subject
      FROM skill_questions sq JOIN skills s ON s.id = sq.skillId
     WHERE sq.isActive = 1`);

  const issues = new Map();
  const add = (kind, row, note) => {
    if (!issues.has(kind)) issues.set(kind, []);
    issues.get(kind).push({ row, note });
  };

  const posCount = [0, 0, 0, 0];
  const seenSig = new Map();

  for (const r of rows) {
    const opts = typeof r.optionsJson === 'string' ? JSON.parse(r.optionsJson) : r.optionsJson;
    const correct = opts[r.correctIndex];

    // 1. Cấu trúc
    if (!Array.isArray(opts) || opts.length < 2) { add('Thiếu đáp án', r, `${opts?.length} lựa chọn`); continue; }
    if (r.correctIndex < 0 || r.correctIndex >= opts.length) { add('correctIndex ngoài phạm vi', r, `${r.correctIndex}/${opts.length}`); continue; }
    if (new Set(opts.map((o) => String(o).trim())).size !== opts.length) add('Đáp án trùng nhau', r, opts.join(' | '));
    if (opts.some((o) => String(o).trim() === '')) add('Đáp án rỗng', r, opts.join(' | '));
    posCount[r.correctIndex] = (posCount[r.correctIndex] || 0) + 1;

    // 2. Tự tính lại đáp án từ ĐỀ BÀI
    const computed = computeFromQuestion(r.questionText);
    if (computed != null) {
      const got = num(correct);
      if (!Number.isFinite(got) || Math.abs(got - computed) > 1e-6) {
        add('ĐÁP ÁN SAI so với đề', r, `${r.questionText} → đánh dấu "${correct}", tính ra ${Math.round(computed * 1000) / 1000}`);
      }
      // Đáp án nhiễu trùng giá trị với đáp án đúng (khác chuỗi nhưng cùng số)
      const dup = opts.filter((o, i) => i !== r.correctIndex && Math.abs(num(o) - computed) < 1e-6);
      if (dup.length) add('Nhiễu trùng giá trị đáp án đúng', r, `${r.questionText} → ${dup.join(', ')}`);
    }

    // 3. Đáp án có khớp với con số CUỐI trong lời giải không.
    // Bắt được cả những dạng mà đề không tự tính lại được (toán lời văn, hình
    // học, đo lường) — vì lời giải luôn kết thúc bằng kết quả.
    if (r.subject === 'math' && /^[\d.,]+$/.test(String(correct).replace(/\s/g, ''))) {
      const nums = String(r.explanation).match(/-?\d[\d.,]*/g) || [];
      if (nums.length) {
        const want = num(correct);
        const hit = nums.some((n) => Math.abs(num(n) - want) < 1e-6);
        if (Number.isFinite(want) && !hit) {
          add('Đáp án không xuất hiện trong lời giải', r, `${r.questionText} → đáp án "${correct}", lời giải: ${r.explanation}`);
        }
      }
    }

    // 4. Lời giải
    for (const b of badArithmetic(r.explanation)) add('Lời giải sai phép tính', r, b);
    if (!r.explanation || r.explanation.trim().length < 20) add('Lời giải quá ngắn', r, r.explanation);
    if (/^Đáp án đúng là/i.test(r.explanation.trim())) add('Lời giải chỉ nêu đáp án', r, r.explanation);

    // 5. Phù hợp lứa tuổi
    if (r.subject === 'math' && r.grade <= 3) {
      const neg = opts.filter((o) => Number.isFinite(num(o)) && num(o) < 0);
      if (neg.length) add('Có số âm ở lớp 1–3', r, `${r.questionText} → ${neg.join(', ')}`);
    }

    // 6. Lộ đáp án ngay trong đề
    const q = String(r.questionText).toLowerCase();
    const c = String(correct).toLowerCase().trim();
    // Đọc hiểu, luyện từ và câu, thống kê: đáp án BẮT BUỘC nằm trong đề (đoạn
    // đọc / câu đã cho / bảng số liệu) — đó là bản chất dạng bài, không phải lộ đề.
    // Danh từ bất quy tắc giữ nguyên khi số nhiều (fish → fish) thì đáp án
    // TRÙNG với từ trong đề — đó chính là điều cần dạy, không phải lộ đề.
    const unchangedPlural = /^Số nhiều của/.test(r.questionText) && String(correct) === (r.questionText.match(/"([^"]+)"/) || [])[1];
    const answerMayAppear = ['doc-hieu', 'luyen-tu-cau', 'thong-ke', 'ke-chuyen'].includes(r.skill) || unchangedPlural;
    if (!answerMayAppear && c.length >= 4 && !/^\d/.test(c) && q.includes(c) && !/sắp xếp|thứ tự|đúng hay sai/i.test(r.questionText)) {
      add('Đáp án xuất hiện sẵn trong đề', r, `"${correct}" nằm trong: ${r.questionText.slice(0, 90)}`);
    }

    // 7. Ký tự lỗi
    if (/undefined|NaN|Infinity|\[object/.test(r.questionText + r.explanation + opts.join(''))) {
      add('Có giá trị lỗi', r, r.questionText);
    }

    // 8. Trùng câu
    const sig = `${r.skill}|${r.grade}|${r.questionText}|${[...opts].sort().join('|')}`;
    if (seenSig.has(sig)) add('Câu trùng nhau', r, `trùng với #${seenSig.get(sig)}`);
    else seenSig.set(sig, r.id);
  }

  // ── Báo cáo ──
  console.log(`Đã soát ${rows.length} câu đang bật.\n`);
  if (!issues.size) console.log('✓ Không phát hiện lỗi nào.');
  else {
    const table = [...issues.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .map(([kind, list]) => ({ 'Loại lỗi': kind, 'Số câu': list.length }));
    console.table(table);
    for (const [kind, list] of issues) {
      console.log(`\n── ${kind} (${list.length}) ──`);
      const show = DETAIL ? list : list.slice(0, 3);
      for (const it of show) console.log(`  [${it.row.skill} lớp ${it.row.grade} ${it.row.difficulty}] ${it.note}`);
      if (!DETAIL && list.length > 3) console.log(`  … còn ${list.length - 3} câu nữa (chạy với --detail để xem hết)`);
    }
  }

  // Vị trí đáp án đúng có bị lệch không
  const tot = posCount.reduce((a, b) => a + b, 0);
  console.log('\n── Vị trí đáp án đúng (cần rải đều ~25% mỗi vị trí) ──');
  console.log('  ' + posCount.map((n, i) => `${'ABCD'[i]}: ${Math.round((n / tot) * 100)}%`).join('   '));

  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
