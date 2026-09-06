/**
 * Re-map lesson_skills từ đầu.
 *
 * Mapping cũ gắn TOÀN BỘ kỹ năng của môn cho MỌI bài của môn đó (chỉ 2 tổ hợp
 * cho 457 bài) nên "Học theo kỹ năng" và hồ sơ năng lực đều vô nghĩa.
 * Script này mở rộng taxonomy rồi gắn lại theo tiêu đề bài.
 *
 *   node scripts/remap-skills.cjs          # dry-run, chỉ in kết quả
 *   node scripts/remap-skills.cjs --apply  # ghi vào DB
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

// ── Taxonomy ──────────────────────────────────────────────────────────────
// code, name, subject, icon
const SKILLS = [
  // Toán
  ['dem-so',           'Đếm & nhận biết số',      'math', '🔢'],
  ['so-sanh-so',       'So sánh & thứ tự số',     'math', '⚖️'],
  ['cong-tru',         'Phép cộng, phép trừ',     'math', '➕'],
  ['phep-nhan',        'Phép nhân',               'math', '✖️'],
  ['phep-chia',        'Phép chia',               'math', '➗'],
  ['tim-thanh-phan',   'Tìm thành phần chưa biết','math', '❓'],
  ['toan-loi-van',     'Toán có lời văn',         'math', '📝'],
  ['hinh-hoc',         'Hình học',                'math', '📐'],
  ['chu-vi-dien-tich', 'Chu vi & diện tích',      'math', '🟦'],
  ['the-tich',         'Thể tích',                'math', '🧊'],
  ['do-luong',         'Đo lường & đơn vị',       'math', '📏'],
  ['thoi-gian',        'Thời gian & xem giờ',     'math', '⏰'],
  ['tien-viet',        'Tiền Việt Nam',           'math', '💰'],
  ['phan-so',          'Phân số',                 'math', '🍕'],
  ['so-thap-phan',     'Số thập phân',            'math', '🔟'],
  ['ti-so-phan-tram',  'Tỉ số & phần trăm',       'math', '📊'],
  ['chuyen-dong',      'Toán chuyển động',        'math', '🚗'],
  ['thong-ke',         'Thống kê & biểu đồ',      'math', '📈'],
  ['tu-duy-toan',      'Tư duy toán',             'math', '🧠'],
  // Tiếng Việt
  ['nhan-biet-chu',    'Nhận biết chữ cái',       'language', '🔤'],
  ['ghep-van',         'Đánh vần & ghép vần',     'language', '🧩'],
  ['doc-hieu',         'Đọc hiểu',                'language', '📖'],
  ['tu-vung',          'Từ vựng',                 'language', '💬'],
  ['luyen-tu-cau',     'Luyện từ và câu',         'language', '✍️'],
  ['chinh-ta',         'Chính tả',                'language', '📄'],
  ['ke-chuyen',        'Kể chuyện & nói nghe',    'language', '🗣️'],
  ['tap-lam-van',      'Tập làm văn',             'language', '📜'],
  // Tiếng Anh
  ['tu-vung-en',       'Từ vựng tiếng Anh',       'english', '🅰️'],
  ['nghe-noi-en',      'Nghe nói tiếng Anh',      'english', '🎧'],
  ['mau-cau-en',       'Mẫu câu tiếng Anh',       'english', '💭'],
];

// ── Luật gắn kỹ năng theo tiêu đề bài ────────────────────────────────────
// Mỗi luật: [regex trên tiêu đề đã bỏ dấu-thường-hoá, danh sách skill code]
// Áp dụng TẤT CẢ luật khớp; nếu không luật nào khớp → dùng fallback theo môn.
const MATH_RULES = [
  [/phan tram|ti so/,                                  ['ti-so-phan-tram']],
  [/ti le ban do/,                                     ['ti-so-phan-tram', 'do-luong']],
  [/the tich|hinh khai trien|hinh tru|hinh cau|hinh non/, ['the-tich', 'hinh-hoc']],
  [/dien tich|chu vi/,                                 ['chu-vi-dien-tich', 'hinh-hoc']],
  [/van toc|quang duong|chuyen dong/,                  ['chuyen-dong', 'toan-loi-van']],
  [/so thap phan/,                                     ['so-thap-phan']],
  [/phan so|quy dong|rut gon/,                         ['phan-so']],
  [/bieu do|day so lieu|thong ke|kha nang xay ra|so lan lap lai/, ['thong-ke']],
  [/xem gio|ngay - gio|gio - phut|ngay, gio|thang, nam|so do thoi gian|dong ho/, ['thoi-gian', 'do-luong']],
  [/tien viet nam|dong tien|mua ban/,                  ['tien-viet', 'do-luong']],
  [/mi-li-met|xang-ti-met|ki-lo-met|de-xi-met|met vuong|xang-ti-met vuong|ki-lo-gam|yen, ta, tan|gam|lit|mi-li-lit|don vi do|do luong|do do dai|khoi luong|dung tich|do goc/, ['do-luong']],
  [/hinh tam giac|hinh tron|hinh vuong|hinh chu nhat|hinh tu giac|hinh binh hanh|hinh thoi|hinh thang|khoi lap phuong|khoi hop|diem|doan thang|duong thang|duong gap khuc|goc|trung diem|ban kinh|duong kinh|song song|vuong goc|ve hinh|xep hinh|lap ghep|hinh phang|hinh khoi/, ['hinh-hoc']],
  [/bai toan|giai toan|co loi van|nhieu hon|it hon|them, bot|thua so|tong va hieu|tong va ti|hieu va ti|rut ve don vi|ty le/, ['toan-loi-van']],
  [/bang chia|phep chia|chia so|chia het|chia co du|chia cho|chia nhom/, ['phep-chia']],
  [/bang nhan|phep nhan|nhan so|nhan voi|gap .* len/, ['phep-nhan']],
  [/nhan, chia|nhan va chia|nhan chia/,                ['phep-nhan', 'phep-chia']],
  [/tim thanh phan|tim x|tim so hang|tim thua so|tim so bi tru|tim so bi chia/, ['tim-thanh-phan']],
  [/phep cong|phep tru|cong, tru|cong va tru|cong so|tru so|cong nham|tru nham|may va may|lam quen voi phep/, ['cong-tru']],
];

// Luật "chung" của Toán: chỉ áp dụng khi KHÔNG luật cụ thể nào ở trên khớp.
// Tránh việc "Chia số có hai chữ số…" bị dính thêm kỹ năng Đếm số.
const MATH_GENERIC_RULES = [
  [/so sanh|lam tron|sap xep|thu tu|lon hon|be hon|dai hon|ngan hon|nang hon|nhe hon/, ['so-sanh-so']],
  [/cac so|so co .* chu so|chuc va don vi|hang va lop|so tu nhien|chu so|tron chuc|tron tram|dem|so 0|lop trieu|lop nghin/, ['dem-so']],
  [/luyen tap chung|on tap chung|on tap cuoi|on tap giua|thuc hanh va trai nghiem|uoc luong|em vui hoc|em on lai/, ['tu-duy-toan']],
];

const VI_RULES = [
  [/chu cai/,                                          ['nhan-biet-chu', 'chinh-ta']],
  [/^van |, van | van [a-zăâêôơưđ]/,                   ['ghep-van', 'chinh-ta']],
  [/on tap va ke chuyen|ke chuyen/,                    ['ke-chuyen', 'doc-hieu']],
  [/on tap/,                                           ['doc-hieu', 'tu-vung', 'luyen-tu-cau', 'chinh-ta']],
];

const EN_RULES = [
  [/on tap chu de/,                                    ['tu-vung-en', 'nghe-noi-en', 'mau-cau-en']],
  [/greeting|how are you|what's your name|whats your name|who is this|can you|do you|is this|are you|i can|let's|lets /, ['mau-cau-en', 'nghe-noi-en']],
];

// Fallback khi không luật nào khớp
const FALLBACK = {
  math: ['tu-duy-toan'],
  language: ['doc-hieu', 'tu-vung', 'luyen-tu-cau', 'chinh-ta'],
  english: ['tu-vung-en', 'nghe-noi-en'],
};

// ── Helpers ───────────────────────────────────────────────────────────────
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/^bai\s*\d+\s*[:.]\s*/, '')
    .trim();
}

function apply(rules, t, out) {
  for (const [re, codes] of rules) {
    if (re.test(t)) for (const c of codes) if (!out.includes(c)) out.push(c);
  }
  return out;
}

function skillsFor(courseType, title) {
  const t = norm(title);
  if (courseType === 'math') {
    const specific = apply(MATH_RULES, t, []);
    if (specific.length) return specific;
    const generic = apply(MATH_GENERIC_RULES, t, []);
    return generic.length ? generic : FALLBACK.math;
  }
  const rules = courseType === 'language' ? VI_RULES : EN_RULES;
  const out = apply(rules, t, []);
  return out.length ? out : (FALLBACK[courseType] || []);
}

// ── Main ──────────────────────────────────────────────────────────────────
(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // 1. Upsert taxonomy
  if (APPLY) {
    for (const [code, name, subject, icon] of SKILLS) {
      await db.query(
        `INSERT INTO skills (code, name, subject, icon, isActive, createdAt, updatedAt)
         VALUES (?,?,?,?,1,NOW(),NOW())
         ON DUPLICATE KEY UPDATE name=VALUES(name), subject=VALUES(subject), icon=VALUES(icon), isActive=1`,
        [code, name, subject, icon],
      );
    }
    console.log(`✓ Upsert ${SKILLS.length} kỹ năng`);
  }

  const [skillRows] = await db.query('SELECT id, code FROM skills');
  const idOf = new Map(skillRows.map((r) => [r.code, r.id]));
  const missing = SKILLS.map((s) => s[0]).filter((c) => !idOf.has(c));
  if (missing.length && APPLY) throw new Error('Thiếu skill sau khi upsert: ' + missing.join(', '));

  // 2. Tính mapping mới
  const [lessons] = await db.query(
    `SELECT l.id, l.title, co.slug AS course, co.courseType
       FROM lessons l JOIN courses co ON co.id = l.courseId
      ORDER BY co.id, l.sortOrder`,
  );

  const pairs = [];
  const perSkill = new Map();
  const perCourseCombos = new Map();
  for (const l of lessons) {
    const codes = skillsFor(l.courseType, l.title);
    for (const c of codes) {
      pairs.push([l.id, c]);
      perSkill.set(c, (perSkill.get(c) || 0) + 1);
    }
    const key = l.course;
    if (!perCourseCombos.has(key)) perCourseCombos.set(key, new Set());
    perCourseCombos.get(key).add(codes.slice().sort().join(','));
  }

  // 3. Báo cáo
  console.log('\n── Kỹ năng × số bài ──');
  console.table([...perSkill.entries()].sort((a, b) => b[1] - a[1]).map(([code, n]) => ({ code, lessons: n })));
  console.log('── Số tổ hợp kỹ năng khác nhau / khoá ──');
  console.table([...perCourseCombos.entries()].map(([course, s]) => ({ course, combos: s.size })));
  console.log(`Tổng liên kết: ${pairs.length} (cũ: 2012)`);

  if (!APPLY) {
    console.log('\nDry-run. Chạy lại với --apply để ghi DB.');
    await db.end();
    return;
  }

  // 4. Sao lưu mapping cũ rồi ghi đè
  const [oldRows] = await db.query('SELECT lessonId, skillId, weight FROM lesson_skills');
  const backup = `scripts/.backup-lesson_skills-${Date.now()}.json`;
  require('fs').writeFileSync(backup, JSON.stringify(oldRows));
  console.log(`✓ Sao lưu ${oldRows.length} dòng cũ → ${backup}`);

  await db.query('DELETE FROM lesson_skills');
  const values = pairs.map(([lessonId, code]) => [lessonId, idOf.get(code), 1]);
  for (let i = 0; i < values.length; i += 500) {
    await db.query(
      'INSERT INTO lesson_skills (lessonId, skillId, weight, createdAt, updatedAt) VALUES ?',
      [values.slice(i, i + 500).map((v) => [...v, new Date(), new Date()])],
    );
  }
  console.log(`✓ Ghi ${values.length} liên kết lesson_skills`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
