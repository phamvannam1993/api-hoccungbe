/**
 * Cho khoá ảnh GIỮ NGUYÊN DẤU tiếng Việt: "am-van:cà", "am-van:cá".
 *   node scripts/khoa-anh-giu-dau.cjs           # xem trước
 *   node scripts/khoa-anh-giu-dau.cjs --apply   # ghi vào DB
 *
 * Làm hai việc:
 *   1. Đổi đối chiếu của cột `wordId` sang utf8mb4_bin.
 *      BẮT BUỘC: đối chiếu cũ (utf8mb4_unicode_ci) coi "cà" và "cá" là MỘT, mà
 *      wordId lại là khoá chính — nên hai từ khác nhau sẽ đè ảnh của nhau.
 *      Đã kiểm trên chính máy chủ: SELECT 'cà'='cá' trả về 1.
 *   2. Đổi các khoá "am-van:" đang ở dạng Telex (caf, cas) về đúng chữ có dấu.
 *
 * Khoá cũ dạng BỎ DẤU ("am-van:ca") thì để nguyên — một khoá đó ứng với nhiều
 * từ nên không đoán được, phải gán tay ở /admin/am-van.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

const CHU_GOC = { 'ă': 'aw', 'â': 'aa', 'ê': 'ee', 'ô': 'oo', 'ơ': 'ow', 'ư': 'uw', 'đ': 'dd' };
const THANH = { '̀': 'f', '́': 's', '̉': 'r', '̃': 'x', '̣': 'j' };

/** Khoá kiểu Telex — bản trung gian, chỉ còn dùng để dò ngược. */
function slugTelex(tu) {
  return tu.trim().split(/\s+/).map((tieng) => {
    let thanh = '';
    const goc = tieng.normalize('NFD').split('')
      .filter((c) => (THANH[c] ? ((thanh = THANH[c]), false) : true))
      .join('').normalize('NFC');
    let ra = '';
    for (const c of goc.toLowerCase()) ra += CHU_GOC[c] ?? c;
    return ra + thanh;
  }).join('-').replace(/[^a-z0-9-]+/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

/** Khoá MỚI: giữ nguyên chữ có dấu, chuẩn hoá NFC để byte luôn giống nhau. */
const slugMoi = (tu) => tu.normalize('NFC').toLowerCase().trim().replace(/\s+/g, '-');

const NGUON = path.join(__dirname, '..', '..', 'hoccungbe', 'app', 'lib', 'vongTronAm.ts');
const TU = [...new Set([...fs.readFileSync(NGUON, 'utf8').matchAll(/tu: '([^']+)'/g)].map((m) => m[1]))];

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [[{ gop }]] = await db.query("SELECT ('cà'='cá') AS gop");
  console.log(`Đối chiếu hiện tại coi "cà" = "cá": ${gop ? 'CÓ — phải đổi' : 'KHÔNG'}`);

  const theoTelex = new Map(TU.map((t) => [`am-van:${slugTelex(t)}`, t]));

  // Khoá dạng BỎ DẤU ứng với nhiều từ thì KHÔNG được nhận vơ. Bẫy ở đây: với
  // nhóm "bà / ba", khoá cũ "am-van:ba" trùng đúng khoá Telex của từ "ba" không
  // dấu — nhận theo Telex là gán ảnh của "bà" cho "ba" mà không ai hay.
  const slugBoDau = (tu) => tu.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const demBoDau = new Map();
  for (const t of TU) {
    const k = `am-van:${slugBoDau(t)}`;
    demBoDau.set(k, (demBoDau.get(k) ?? 0) + 1);
  }
  const [rows] = await db.query("SELECT wordId FROM vocab_images WHERE wordId LIKE 'am-van:%'");

  const doi = [];
  const deLai = [];
  for (const r of rows) {
    if ((demBoDau.get(r.wordId) ?? 0) > 1) { deLai.push(r.wordId); continue; }
    const tu = theoTelex.get(r.wordId);
    if (!tu) { deLai.push(r.wordId); continue; }
    const moi = `am-van:${slugMoi(tu)}`;
    if (moi !== r.wordId) doi.push({ cu: r.wordId, moi, tu });
  }

  console.log(`\nẢnh am-van: ${rows.length}`);
  console.log(`Đổi về chữ có dấu: ${doi.length}`);
  for (const d of doi.slice(0, 8)) console.log(`   ${d.cu} → ${d.moi}`);
  if (doi.length > 8) console.log(`   … và ${doi.length - 8} ảnh nữa`);
  if (deLai.length) {
    console.log(`\nGiữ nguyên ${deLai.length} khoá (dạng bỏ dấu, ứng với nhiều từ):`);
    console.log(`   ${deLai.join(', ')}`);
    console.log('   → Gán tay ở /admin/am-van.');
  }

  if (!APPLY) {
    console.log('\nXem trước. Chạy lại với --apply để ghi.');
    await db.end();
    return;
  }

  // Đổi đối chiếu TRƯỚC, nếu không hai khoá "cà"/"cá" sẽ đụng khoá chính khi ghi.
  await db.query(
    "ALTER TABLE vocab_images MODIFY wordId VARCHAR(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL",
  );
  console.log('✓ Đã đổi đối chiếu cột wordId sang utf8mb4_bin (phân biệt dấu).');

  for (const d of doi) await db.query('UPDATE vocab_images SET wordId = ? WHERE wordId = ?', [d.moi, d.cu]);
  console.log(`✓ Đã đổi khoá cho ${doi.length} ảnh.`);

  const [[{ gop2 }]] = await db.query("SELECT (BINARY 'cà' = BINARY 'cá') AS gop2");
  console.log(`Kiểm lại: "cà" và "cá" còn bị coi là một? ${gop2 ? 'CÒN' : 'KHÔNG'}`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
