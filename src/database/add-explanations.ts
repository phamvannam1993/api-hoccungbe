import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

function val(x: any) { if (x == null) return x; if (typeof x === 'string') { try { return JSON.parse(x); } catch { return x; } } return x; }
function txt(opts: any[], k: string) { const o = (opts || []).find((x: any) => x.key === k); return o ? String(o.text).trim() : String(k); }
const isUrl = (s: any) => typeof s === 'string' && /^https?:\/\//.test(s);
const dot = (s: string) => s.replace(/\.+\s*$/, '') + '.'; // đúng một dấu chấm cuối

function genExplain(r: any): string | null {
  const q = (r.questionText || '').replace(/\[b\d+\]/g, '___');
  const opts = val(r.optionsJson) || [];
  const ans = val(r.correctAnswerJson);
  const T = r.questionType;
  const vanM = q.match(/vần\s+([a-zà-ỹ]{1,4})(?:\b|[,.?])/i); const van = vanM ? vanM[1] : null;
  const sameM = q.match(/cùng vần với tiếng\s*["'“]?([a-zà-ỹ]+)/i);

  if (T === 'single_choice' || T === 'image_choice') {
    if (typeof ans !== 'string') return null;
    const a = txt(opts, ans);
    if (/tiếng nào (có|chứa) vần|từ nào (có|chứa) vần/i.test(q) && van) return dot(`"${a}" chứa vần ${van}`);
    if (sameM) return dot(`"${a}" có cùng vần với tiếng "${sameM[1]}"`);
    if (/nhóm nào.*chứa vần/i.test(q) && van) return dot(`Nhóm "${a}" đều chứa vần ${van}`);
    if (/ghép.*được tiếng nào/i.test(q)) return dot(`Ghép lại được tiếng "${a}"`);
    return dot(`Đáp án đúng là "${a}"`);
  }
  if (T === 'multiple_choice' || T === 'cross_out') {
    if (!Array.isArray(ans)) return null;
    const list = ans.map((k: string) => `"${txt(opts, k)}"`).join(', ');
    return dot(T === 'cross_out' ? `Cần gạch bỏ: ${list}` : `Các đáp án đúng: ${list}`);
  }
  if (T === 'true_false') return ans === true ? 'Khẳng định này ĐÚNG.' : 'Khẳng định này SAI.';
  if (T === 'sorting' || T === 'drag_drop') {
    if (!Array.isArray(ans)) return null;
    return dot(`Thứ tự đúng: ${ans.map((k: string) => txt(opts, k)).join(' → ')}`);
  }
  if (T === 'fill_blank') {
    if (ans && typeof ans === 'object' && !Array.isArray(ans)) return dot(`Đáp án cần điền: ${Object.values(ans).join(', ')}`);
    return null;
  }
  if (T === 'counting') { const v = ans && typeof ans === 'object' ? Object.values(ans).join(', ') : String(ans); return dot(`Đếm được: ${v}`); }
  if (T === 'matching') {
    if (ans && typeof ans === 'object' && !Array.isArray(ans)) {
      const pairs = Object.entries(ans).filter(([, v]) => !isUrl(v)).map(([k, v]) => `${txt(opts, k)} → ${v}`);
      if (pairs.length) return dot(`Nối đúng: ${pairs.join('; ')}`);
      return 'Nối mỗi ô bên trái với hình đúng ở bên phải.';
    }
    return null;
  }
  if (T === 'find_errors') {
    if (Array.isArray(ans)) {
      const words = ans.map((k: string) => txt(opts, k)).filter(Boolean);
      return words.length ? dot(`Từ viết sai chính tả: ${words.map((w) => `"${w}"`).join(', ')}`) : null;
    }
    return null;
  }
  if (T === 'number_line') { if (Array.isArray(ans)) return dot(`Đáp án đúng: ${ans.join(', ')}`); return null; }
  if (T === 'table_fill' || T === 'puzzle' || T === 'game') {
    if (ans && typeof ans === 'object') { const v = Object.values(ans).filter((x) => !isUrl(x)).join(', '); return v ? dot(`Đáp án đúng: ${v}`) : null; }
    return null;
  }
  return null;
}

async function main() {
  await ds.initialize();
  const rows: any[] = await ds.query(
    `SELECT id,questionType,questionText,optionsJson,correctAnswerJson FROM quizzes WHERE isActive=1 AND (explanation IS NULL OR explanation='')`,
  );
  console.log(`Câu trống: ${rows.length}. Đang sinh giải thích…`);
  let updated = 0, skipped = 0;
  for (const r of rows) {
    const g = genExplain(r);
    if (!g) { skipped++; continue; }
    await ds.query('UPDATE quizzes SET explanation = ? WHERE id = ?', [g, r.id]);
    updated++;
    if (updated % 1000 === 0) console.log(`  … ${updated}`);
  }
  console.log(`HOÀN TẤT ✅ — thêm giải thích: ${updated} | bỏ qua (không sinh được): ${skipped}`);
  await ds.destroy();
}

main().catch((e) => { console.error('LỖI:', e); process.exit(1); });
