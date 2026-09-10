/**
 * Chuyển ảnh Vòng tròn âm vần sang cách đặt khoá MỚI (giữ được dấu).
 *   node scripts/doi-khoa-anh-am-van.cjs           # xem trước
 *   node scripts/doi-khoa-anh-am-van.cjs --apply   # ghi vào DB
 *
 * Vì sao cần: khoá cũ bỏ sạch dấu nên "bé" và "bê" cùng ra "am-van:be" — tải ảnh
 * cho từ này thì từ kia dùng luôn ảnh đó. Khoá mới mã hoá cả dấu phụ lẫn dấu
 * thanh kiểu Telex: "bé" → "bes", "bê" → "bee".
 *
 * Khoá cũ nào ứng với NHIỀU từ thì KHÔNG đoán bừa — script liệt kê ra để tự chọn.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

const CHU_GOC = { 'ă': 'aw', 'â': 'aa', 'ê': 'ee', 'ô': 'oo', 'ơ': 'ow', 'ư': 'uw', 'đ': 'dd' };
const THANH = { '̀': 'f', '́': 's', '̉': 'r', '̃': 'x', '̣': 'j' };

function slugMoi(tu) {
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

const slugCu = (tu) => tu.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd').toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Đọc danh sách từ thẳng từ file dữ liệu của frontend — một nguồn sự thật duy nhất.
const NGUON = path.join(__dirname, '..', '..', 'hoccungbe', 'app', 'lib', 'vongTronAm.ts');
const TU = [...new Set([...fs.readFileSync(NGUON, 'utf8').matchAll(/tu: '([^']+)'/g)].map((m) => m[1]))];

// Khoá cũ → những từ cùng rơi vào khoá đó.
const theoKhoaCu = new Map();
for (const t of TU) {
  const k = `am-van:${slugCu(t)}`;
  theoKhoaCu.set(k, [...(theoKhoaCu.get(k) ?? []), t]);
}

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.query("SELECT wordId, imageUrl FROM vocab_images WHERE wordId LIKE 'am-van:%'");
  const daCoKhoaMoi = new Set(rows.map((r) => r.wordId));

  const chuyen = [];
  const nhapNhang = [];
  const khongThay = [];

  for (const r of rows) {
    const ungVien = theoKhoaCu.get(r.wordId) ?? [];
    if (!ungVien.length) { khongThay.push(r.wordId); continue; }
    if (ungVien.length > 1) { nhapNhang.push({ cu: r.wordId, tu: ungVien }); continue; }
    const moi = `am-van:${slugMoi(ungVien[0])}`;
    if (moi === r.wordId) continue;              // đã là khoá mới
    if (daCoKhoaMoi.has(moi)) continue;          // đã có ảnh dưới khoá mới, giữ nguyên
    chuyen.push({ cu: r.wordId, moi, tu: ungVien[0], url: r.imageUrl });
  }

  console.log(`Ảnh am-van hiện có: ${rows.length}`);
  console.log(`Chuyển được chắc chắn: ${chuyen.length}`);
  for (const c of chuyen.slice(0, 10)) console.log(`   ${c.cu} → ${c.moi}   (${c.tu})`);
  if (chuyen.length > 10) console.log(`   … và ${chuyen.length - 10} ảnh nữa`);

  if (nhapNhang.length) {
    console.log(`\nKHÔNG đoán được ${nhapNhang.length} khoá — một khoá cũ ứng với nhiều từ:`);
    for (const n of nhapNhang) console.log(`   ${n.cu}  ←  ${n.tu.join(' , ')}`);
    console.log('   → Ảnh vẫn hiển thị nhờ lối lùi khoá cũ, nhưng dùng chung cho các từ trên.');
    console.log('   → Muốn tách riêng thì vào /admin/am-van tải lại ảnh cho từng từ.');
  }
  if (khongThay.length) console.log(`\nKhoá lạ (không khớp từ nào): ${khongThay.join(', ')}`);

  if (!APPLY) {
    console.log('\nXem trước. Chạy lại với --apply để ghi.');
    await db.end();
    return;
  }

  for (const c of chuyen) {
    await db.query('UPDATE vocab_images SET wordId = ? WHERE wordId = ?', [c.moi, c.cu]);
  }
  console.log(`\n✓ Đã đổi khoá cho ${chuyen.length} ảnh.`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
