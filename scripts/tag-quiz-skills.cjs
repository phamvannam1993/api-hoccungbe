/**
 * Gắn kỹ năng cho TỪNG CÂU HỎI (bảng quiz_skills).
 *
 * Vì sao cần: gắn ở mức bài không tách được những bài trộn nhiều kỹ năng.
 * Một bài Tiếng Việt lớp 3 vừa hỏi đọc hiểu, vừa hỏi luyện từ và câu, vừa hỏi
 * chính tả — gắn mức bài thì cả ba luôn bằng nhau và hồ sơ năng lực không bao
 * giờ chỉ ra được bé yếu mảng nào. Toán cũng vậy: "toán có lời văn" hầu như
 * không xuất hiện trong tiêu đề bài, chỉ nhận ra được từ nội dung câu hỏi.
 *
 * Cách gắn: khớp luật trên `questionText` (source='rule'); câu nào không luật
 * nào khớp thì KẾ THỪA kỹ năng của bài (source='lesson') để luôn phủ 100%
 * và không bao giờ tệ hơn mapping mức bài hiện tại.
 *
 *   node scripts/tag-quiz-skills.cjs          # dry-run, chỉ in thống kê
 *   node scripts/tag-quiz-skills.cjs --apply  # ghi vào DB
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

// ── Chuẩn hoá: bỏ dấu, thường hoá ────────────────────────────────────────
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

// ── TOÁN ─────────────────────────────────────────────────────────────────
// Toán có lời văn: câu có NGỮ CẢNH đời thực + câu hỏi "hỏi/tính … bao nhiêu".
// Nhận diện bằng cặp (có danh từ ngữ cảnh) × (có động từ hỏi), thay vì chỉ độ dài.
const WORD_PROBLEM_CONTEXT = /\b(co|mua|ban|cho|tang|con lai|moi|mot|hai|ba|bon|nam)\b.*\b(hoc sinh|hs|ban|nguoi|con|cai|chiec|quyen|cuon|tui|hop|thung|gio|ro|cay|qua|bong|vien|to|xe|con ga|con vit|con bo|met|km|kg|gam|lit|dong|phut|gio|ngay|tuan|thang|nam|lop|truong|vuon|ao|kho|bai|doan duong)\b/;
const WORD_PROBLEM_ASK = /\b(hoi|bao nhieu|con lai bao nhieu|tinh (so|dien tich|chu vi|the tich|van toc|quang duong|thoi gian|tuoi|tien)|trung binh moi|may lan|gap may)\b|moi (ban|nguoi|phan|tui|hop|to|cai|con)\s+(duoc|co|nang|dai)|chia deu/;

const MATH_RULES = [
  // "Tìm x" đứng TRƯỚC các luật về loại số: "Tìm x, biết x : 1,25 = 6,4" thì kỹ
  // năng cần luyện là tìm thành phần chưa biết, không phải số thập phân.
  [/tim x|tim so hang|tim thua so|tim so bi tru|tim so bi chia|tim so chia|tim thanh phan|dien so thich hop|so thich hop/, ['tim-thanh-phan']],
  // Dạng "768 − ___ = 254": ô trống nằm trong một đẳng thức.
  [/___\s*=|=\s*___|dien so vao/,                            ['tim-thanh-phan']],
  [/phan tram|ti so phan tram|\d+\s*%/,                     ['ti-so-phan-tram']],
  [/van toc|quang duong|chuyen dong deu|km\/gio|m\/giay/,   ['chuyen-dong']],
  [/the tich|dm3|cm3|m3|hinh lap phuong|hinh hop chu nhat|hinh tru|hinh cau/, ['the-tich', 'hinh-hoc']],
  [/dien tich|chu vi/,                                      ['chu-vi-dien-tich', 'hinh-hoc']],
  [/so thap phan|\d+,\d+/,                                  ['so-thap-phan']],
  [/phan so|\d+\/\d+|tu so|mau so|quy dong|rut gon/,        ['phan-so']],
  [/bieu do|day so lieu|thong ke|kha nang xay ra|so lieu/,  ['thong-ke']],
  [/dong ho|may gio|gio kem|gio hon|phut|giay|ngay|tuan|thang|nam nhuan|the ki/, ['thoi-gian']],
  [/dong$|bao nhieu dong|tien|mua ban|gia tien|nghin dong/, ['tien-viet']],
  [/hinh tam giac|hinh tron|hinh vuong|hinh chu nhat|hinh tu giac|hinh binh hanh|hinh thoi|hinh thang|khoi|dinh|canh|goc|doan thang|duong thang|duong gap khuc|trung diem|ban kinh|duong kinh|song song|vuong goc|mat/, ['hinh-hoc']],
  [/\b(kg|g|gam|tan|ta|yen|lit|ml|mm|cm|dm|km|m2|cm2|dm2|km2)\b|ki-lo-gam|mi-li-met|xang-ti-met|de-xi-met|ki-lo-met|do dai|khoi luong|dung tich|nhiet do|do c\b/, ['do-luong']],
  [/menh gia|\d+\s*d\b|to \d+|dong\b/,                     ['tien-viet']],
  [/noi gio|gio voi/,                                        ['thoi-gian']],
  [/[:÷]\s*\d|\d\s*[:÷]|bang chia|phep chia|chia het|chia co du|chia cho|giam .* di .* lan|mot phan may|\d+\s*:\s*\d+/, ['phep-chia']],
  [/[×x*]\s*\d|\d\s*[×x*]\s*\d|bang nhan|phep nhan|nhan voi|gap .* len .* lan/, ['phep-nhan']],
  [/[+−-]\s*\d|\d\s*[+−-]\s*\d|phep cong|phep tru|cong|tru|tong|hieu|them|bot/, ['cong-tru']],
  [/lien truoc|lien sau|so lien|so chan|so le|chu so|hang (don vi|chuc|tram|nghin)|doc so|viet so|dem/, ['dem-so']],
  [/so sanh|lon hon|be hon|lon nhat|be nhat|sap xep|thu tu|dien dau|lam tron/, ['so-sanh-so']],
  [/dung dau|dang thuc|dau <|dau >|bang nhau|khong dung/,    ['so-sanh-so']],
  // "Có mấy bông hoa?", "Hình ảnh nào có 5 quả chuối?" — đếm số lượng vật.
  [/co may |bao nhieu (bong|con|qua|cai|chiec|hinh|ngoi|chu)|hinh anh nao|tuong ung voi (con )?so/, ['dem-so']],
  [/phep tinh nao|noi (buoc|bai toan) voi|ket qua bang/,     ['tu-duy-toan']],
];

// ── TIẾNG VIỆT ───────────────────────────────────────────────────────────
const VI_RULES = [
  [/bo phan tra loi|dat cau hoi cho bo phan|cau khien|cau cam|cau hoi|cau ke|dau phay|chu ngu|vi ngu|bien phap|so sanh|nhan hoa|dien tu so sanh|kieu cau|mau cau/, ['luyen-tu-cau']],
  [/trai nghia|cung nghia|dong nghia|tu lay|tu ghep|tu chi (su vat|hoat dong|dac diem|nguoi|vat)|tu nao chi|nghia la gi|chi dieu gi|thanh ngu|tuc ngu|mo rong von tu/, ['tu-vung']],
  [/chi (dac diem|tinh cach|hoat dong|su vat|mau sac)|tu tuong (thanh|hinh)|goi ta|quan he gi ve nghia/, ['tu-vung']],
  [/dien dau (cau|cuoi cau)|viet dung chinh ta|viet sai chinh ta|chon (cau|tu) viet dung|viet hoa|dau thanh|dau hoi|dau nga/, ['chinh-ta']],
  [/van nao|chua van|cung van|tieng .* co van|ghep van|am dau|danh van|doi tieng/, ['ghep-van']],
  // Ghép âm/vần dạng "Ghép h + e + thanh nặng", "c + à = ___", "bắt đầu bằng ngh".
  [/ghep\s+\S+\s*\+|\S\s*\+\s*\S+\s*=|bat dau bang|ket thuc bang|bao nhieu tieng/, ['ghep-van']],
  [/them thanh|thanh (sac|huyen|hoi|nga|nang)|bo thanh/,     ['ghep-van']],
  [/chu cai|chu ghep|viet thuong|viet hoa chu|bang chu cai/, ['nhan-biet-chu']],
  // Nhận diện mặt chữ: "Chữ nào có thêm nét râu", "có bao nhiêu chữ b", "chứa chữ a".
  [/chu nao|chua chu |bao nhieu chu |net (rau|khuyet|mocs|cong|thang|xien)|chu ghi am|ghi am/, ['nhan-biet-chu']],
  [/ke chuyen|cau chuyen|nhan vat|ke lai|sap xep .* thanh cau|thu tu tranh|sap xep .* (buoc|thu tu)|sap xep su kien/, ['ke-chuyen']],
  [/viet doan van|viet cau|dat cau voi|ta lai|mieu ta|viet loi/, ['tap-lam-van']],
  [/dau cau/, ['chinh-ta']],
  // Từ vựng: hỏi về nghĩa/sắc thái của một từ hoặc tiếng.
  [/tu nao|tieng nao chi|noi tu voi|dien ta|la gi\?|nghia cua|von tu|dien vao cho trong|dien tu thich hop/, ['tu-vung']],
  [/bai (doc|tho|van|ve)|doan (van|tho|doc)|noi ve dieu gi|khuyen ta|y nghia|vi sao|theo bai|trong bai|nhan vat chinh|em hieu/, ['doc-hieu']],
  // Câu hỏi đọc hiểu dạng "ai / ở đâu / làm gì / vì sao" về nội dung bài đọc.
  // Đặt CUỐI để các luật hẹp hơn ở trên được ưu tiên.
  [/di dau|o dau|nam o dau|\bai \b|the nao|tai sao|dieu gi|thay gi|noi gi|lam gi|khi nao|the hien dieu gi/, ['doc-hieu']],
];

// ── TIẾNG ANH ────────────────────────────────────────────────────────────
const EN_RULES = [
  // Giao tiếp: chào hỏi, đáp lời, tình huống dùng câu nào.
  [/em dap|dap lai|chao hoi|dung khi nao|hoi ve|noi gi|khi (ban|em|gap|chia tay)|tra loi/, ['nghe-noi-en', 'mau-cau-en']],
  // Ngữ pháp & mẫu câu: số nhiều, mạo từ, đại từ, sắp xếp thành câu.
  [/so nhieu|so it|mao tu|dai tu|so huu|mau cau|sap xep|chon cau (dung|sai)|cau hoi .* de hoi|dien: |\[b1\]/, ['mau-cau-en']],
  [/nghia la|co nghia|tu tieng anh nao|dich|phat am|doc la|'\w+' la |tu nao (khong )?chi|ghep: /, ['tu-vung-en']],
];

const RULES = { math: MATH_RULES, language: VI_RULES, english: EN_RULES };

function skillsForQuiz(courseType, text) {
  const t = norm(text);
  const out = [];

  if (courseType === 'math' && WORD_PROBLEM_CONTEXT.test(t) && WORD_PROBLEM_ASK.test(t)) {
    out.push('toan-loi-van');
  }

  for (const [re, codes] of RULES[courseType] ?? []) {
    if (re.test(t)) {
      for (const c of codes) if (!out.includes(c)) out.push(c);
      // Toán: dừng ở luật cụ thể đầu tiên khớp — các luật xếp từ hẹp đến rộng,
      // nếu không "12,5 + 7,35" vừa là số thập phân vừa là phép cộng lại thành
      // hai kỹ năng ngang nhau. Tiếng Việt/Anh thì cho phép nhiều kỹ năng.
      if (courseType === 'math') break;
    }
  }

  // Giới hạn 3 kỹ năng/câu để một câu không loãng ra quá nhiều mảng.
  return out.slice(0, 3);
}

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [skillRows] = await db.query('SELECT id, code FROM skills WHERE isActive = 1');
  const idOf = new Map(skillRows.map((r) => [r.code, r.id]));

  const [quizzes] = await db.query(`
    SELECT q.id, q.lessonId, q.questionText, co.courseType, co.slug AS course
      FROM quizzes q
      JOIN lessons l ON l.id = q.lessonId
      JOIN courses co ON co.id = l.courseId
     WHERE q.isActive = 1`);

  // Kỹ năng của bài — dùng làm dự phòng khi không luật nào khớp.
  const [links] = await db.query(`
    SELECT ls.lessonId, s.code FROM lesson_skills ls
      JOIN skills s ON s.id = ls.skillId AND s.isActive = 1`);
  const lessonSkills = new Map();
  for (const l of links) {
    if (!lessonSkills.has(l.lessonId)) lessonSkills.set(l.lessonId, []);
    lessonSkills.get(l.lessonId).push(l.code);
  }

  const pairs = [];
  const perSkill = new Map();
  let byRule = 0;
  let byLesson = 0;
  const uncovered = [];

  for (const q of quizzes) {
    let codes = skillsForQuiz(q.courseType, q.questionText);
    let source = 'rule';
    if (!codes.length) {
      codes = lessonSkills.get(q.lessonId) ?? [];
      source = 'lesson';
      if (!codes.length) uncovered.push(q);
    }
    if (source === 'rule') byRule++; else if (codes.length) byLesson++;

    for (const c of codes) {
      const skillId = idOf.get(c);
      if (!skillId) continue;
      pairs.push([q.id, skillId, source]);
      const k = `${c}|${source}`;
      perSkill.set(k, (perSkill.get(k) || 0) + 1);
    }
  }

  // ── Báo cáo ──
  const agg = new Map();
  for (const [k, n] of perSkill) {
    const [code, source] = k.split('|');
    if (!agg.has(code)) agg.set(code, { code, rule: 0, lesson: 0 });
    agg.get(code)[source] += n;
  }
  console.log('── Câu hỏi × kỹ năng (rule = khớp nội dung, lesson = kế thừa bài) ──');
  console.table([...agg.values()].sort((a, b) => b.rule + b.lesson - a.rule - a.lesson));
  console.log(`Câu khớp luật: ${byRule}/${quizzes.length} (${Math.round((byRule / quizzes.length) * 100)}%)`);
  console.log(`Câu kế thừa từ bài: ${byLesson}`);
  console.log(`Câu không phủ được: ${uncovered.length}`);
  console.log(`Tổng liên kết quiz_skills: ${pairs.length}`);

  if (!APPLY) {
    console.log('\nDry-run. Chạy lại với --apply để ghi DB.');
    await db.end();
    return;
  }

  await db.query('DELETE FROM quiz_skills');
  for (let i = 0; i < pairs.length; i += 1000) {
    await db.query(
      'INSERT INTO quiz_skills (quizId, skillId, weight, source, createdAt, updatedAt) VALUES ?',
      [pairs.slice(i, i + 1000).map(([quizId, skillId, source]) => [quizId, skillId, 1, source, new Date(), new Date()])],
    );
  }
  console.log(`✓ Ghi ${pairs.length} liên kết quiz_skills`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
