/**
 * Seed 6 bài viết giới thiệu TOÁN TƯ DUY (tổng quan + lớp 1–5) vào bảng articles.
 *   npm run seed:articles-ttd
 * Upsert theo slug (chạy lại an toàn). Nội dung HTML + internal link tới trang luyện tập.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const CATEGORY = 'Toán tư duy';

type Grade = { g: number; age: string; intro: string; topics: string[]; benefits: string[]; tips: string };

const GRADES: Grade[] = [
  {
    g: 1, age: '6–7 tuổi',
    intro: 'Toán tư duy lớp 1 giúp bé làm quen với suy luận qua các bài đếm, so sánh, tìm quy luật và phân loại đơn giản — rèn khả năng quan sát và phán đoán ngay từ những ngày đầu đến trường.',
    topics: ['Đếm và so sánh số lượng', 'Tìm quy luật hình và màu sắc', 'Ghép hình, xếp khối', 'Phân loại theo đặc điểm', 'Logic đơn giản (đúng – sai)', 'Định hướng không gian: trái – phải, trên – dưới'],
    benefits: ['Phát triển tư duy logic và khả năng quan sát từ sớm', 'Giúp bé thấy toán học thú vị, không sợ toán', 'Tạo nền tảng vững cho các lớp trên'],
    tips: 'Cho bé học nhẹ nhàng qua hình ảnh trực quan, mỗi ngày 10–15 phút. Khuyến khích bé giải thích vì sao chọn đáp án đó thay vì chỉ đọc kết quả.',
  },
  {
    g: 2, age: '7–8 tuổi',
    intro: 'Toán tư duy lớp 2 mở rộng suy luận với dãy số theo quy luật, phép cộng – trừ có lời văn, đếm hình và các bài logic. Bé tập phân tích đề bài, tìm mối liên hệ và trình bày cách giải rõ ràng.',
    topics: ['Dãy số theo quy luật', 'Phép cộng, trừ có suy luận', 'Đếm hình (tam giác, hình vuông)', 'Bài toán logic đơn giản', 'Tìm số còn thiếu', 'Suy luận về tuổi, nhiều hơn – ít hơn'],
    benefits: ['Rèn tư duy phân tích và tìm quy luật', 'Làm quen bài toán có lời văn nhiều bước', 'Tăng sự tự tin khi giải toán'],
    tips: 'Cho bé đọc kỹ đề, vẽ hình hoặc liệt kê trường hợp, và luôn kiểm tra lại kết quả. Hiểu bản chất quan trọng hơn học thuộc.',
  },
  {
    g: 3, age: '8–9 tuổi',
    intro: 'Toán tư duy lớp 3 đưa bé đến các bài toán nhân – chia có suy luận, trồng cây, dãy số và logic loại trừ. Bé rèn khả năng lập luận theo nhiều bước và kiểm tra lại kết quả.',
    topics: ['Phép nhân, chia có suy luận', 'Bài toán trồng cây, khoảng cách', 'Dãy số và quy luật', 'Suy luận logic (phương pháp loại trừ)', 'Đếm hình và hình học', 'Bài toán về thời gian, lịch'],
    benefits: ['Thành thạo nhân chia qua tình huống thực tế', 'Biết suy luận nhiều bước, loại trừ để tìm đáp án', 'Chuẩn bị cho toán nâng cao lớp 4'],
    tips: 'Nắm chắc bảng cửu chương trước, sau đó luyện đọc – phân tích đề để chọn cách giải. Với bài trồng cây, hãy vẽ sơ đồ để dễ hình dung.',
  },
  {
    g: 4, age: '9–10 tuổi',
    intro: 'Toán tư duy lớp 4 tập trung vào các bài toán tổng – hiệu, tổng – tỉ, dãy số cách đều và suy luận logic nâng cao. Bé học cách đưa bài toán về dạng quen thuộc và giải bằng sơ đồ, lập luận.',
    topics: ['Tìm hai số khi biết tổng và hiệu', 'Tìm hai số khi biết tổng và tỉ', 'Dãy số cách đều', 'Suy luận logic nâng cao', 'Chu vi, diện tích theo tư duy', 'Bài toán tính ngược'],
    benefits: ['Làm chủ các dạng toán điển hình', 'Rèn kỹ năng vẽ sơ đồ đoạn thẳng', 'Chuẩn bị cho thi học sinh giỏi và toán lớp 5'],
    tips: 'Tập tóm tắt đề bằng sơ đồ đoạn thẳng để nhìn rõ mối quan hệ tổng – hiệu – tỉ. Chia bài toán lớn thành các bước nhỏ.',
  },
  {
    g: 5, age: '10–11 tuổi',
    intro: 'Toán tư duy lớp 5 nâng cao với toán chuyển động, tỉ số phần trăm, phân số và hình học nâng cao. Bé rèn tư duy phân tích, tổng hợp và giải các bài toán nhiều bước — hành trang vững cho bậc THCS.',
    topics: ['Toán chuyển động (vận tốc, quãng đường, thời gian)', 'Tỉ số phần trăm theo tư duy', 'Phân số và bài toán tỉ lệ', 'Suy luận logic nâng cao', 'Hình học nâng cao (diện tích, thể tích)', 'Bài toán cổ, bài toán dân gian'],
    benefits: ['Thành thạo các dạng toán thi vào lớp 6', 'Rèn tư duy phân tích – tổng hợp', 'Giải nhanh, chính xác bài toán nhiều bước'],
    tips: 'Tóm tắt đề, chia bài toán thành các bước nhỏ và luôn kiểm tra lại kết quả bằng cách thử hoặc ước lượng.',
  },
];

function li(items: string[]) {
  return `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
}

function gradeArticle(x: Grade) {
  const title = `Toán tư duy lớp ${x.g}: học những gì, các dạng bài và cách luyện hiệu quả`;
  const slug = `toan-tu-duy-lop-${x.g}-hoc-nhung-gi`;
  const excerpt = `Toán tư duy lớp ${x.g} gồm những dạng bài nào, lợi ích ra sao và cách luyện cho bé ${x.age}? Kèm ${1000} câu luyện tập miễn phí có lời giải.`;
  const content = [
    `<p>${x.intro}</p>`,
    `<h2>Toán tư duy lớp ${x.g} là gì?</h2>`,
    `<p>Toán tư duy là cách học toán chú trọng vào <strong>suy luận, phân tích và tìm quy luật</strong> thay vì chỉ ghi nhớ công thức. Với bé lớp ${x.g} (khoảng ${x.age}), toán tư duy giúp con vừa củng cố kiến thức trên lớp, vừa phát triển khả năng quan sát và giải quyết vấn đề.</p>`,
    `<h2>Các dạng bài toán tư duy lớp ${x.g}</h2>`,
    `<p>Chương trình toán tư duy lớp ${x.g} thường xoay quanh các dạng bài sau:</p>`,
    li(x.topics),
    `<h2>Vì sao nên cho bé học toán tư duy lớp ${x.g}?</h2>`,
    li(x.benefits),
    `<h2>Cách luyện toán tư duy lớp ${x.g} hiệu quả</h2>`,
    `<p>${x.tips}</p>`,
    `<h2>Luyện tập miễn phí ngay</h2>`,
    `<p>Bé có thể làm <a href="/toan-tu-duy-lop-${x.g}">bài tập Toán tư duy lớp ${x.g}</a> với <strong>1000 câu hỏi</strong> chia theo mức Dễ – Trung bình – Khó, có <strong>lời giải chi tiết</strong>, <strong>giọng đọc</strong> và <strong>chế độ làm bài chấm điểm</strong> hoàn toàn miễn phí.</p>`,
    `<p>Xem thêm cho lớp ${x.g}: <a href="/khoa-hoc/toan-lop-${x.g}">Khóa học Toán lớp ${x.g}</a>, <a href="/bai-tap/toan-lop-${x.g}">Bài tập Toán lớp ${x.g}</a>, <a href="/de-thi-lop-${x.g}">Đề thi lớp ${x.g}</a>.</p>`,
  ].join('\n');
  return { title, slug, excerpt, content, tags: ['toán tư duy', `toán tư duy lớp ${x.g}`, 'tiểu học'] };
}

function overviewArticle() {
  const title = 'Toán tư duy là gì? Lợi ích và cách cho trẻ tiểu học học đúng cách';
  const slug = 'toan-tu-duy-la-gi-loi-ich-cach-hoc';
  const excerpt = 'Toán tư duy là gì, khác gì toán thường, mang lại lợi ích nào cho trẻ tiểu học và nên bắt đầu ra sao? Hướng dẫn theo từng lớp 1–5.';
  const content = [
    `<p>Toán tư duy đang được nhiều phụ huynh quan tâm vì giúp trẻ không chỉ tính đúng mà còn <strong>biết cách nghĩ</strong>. Bài viết này giải thích toán tư duy là gì, lợi ích với trẻ tiểu học và lộ trình học phù hợp theo từng lớp.</p>`,
    `<h2>Toán tư duy là gì?</h2>`,
    `<p>Toán tư duy là cách học toán chú trọng vào <strong>suy luận, phân tích và tìm quy luật</strong> thay vì học thuộc công thức. Qua các bài toán logic, dãy số, hình học và bài toán có lời văn, trẻ phát triển khả năng quan sát, lập luận và giải quyết vấn đề.</p>`,
    `<h2>Toán tư duy khác gì toán thường?</h2>`,
    `<p>Toán thường thiên về áp dụng công thức để ra kết quả. Toán tư duy nhấn vào <em>cách nghĩ</em>: một bài toán thường có nhiều hướng tiếp cận, buộc trẻ phải phân tích đề, thử – sai và giải thích lựa chọn của mình. Nhờ đó trẻ linh hoạt và tự tin hơn.</p>`,
    `<h2>Lợi ích của toán tư duy với trẻ tiểu học</h2>`,
    li(['Phát triển tư duy logic, khả năng quan sát và phán đoán', 'Rèn tính kiên nhẫn, tập trung và cách trình bày lời giải', 'Giúp trẻ yêu thích toán, giảm sợ toán', 'Tạo nền tảng vững cho toán nâng cao và thi cử']),
    `<h2>Toán tư duy theo từng lớp</h2>`,
    `<p>Mỗi lớp có các dạng bài phù hợp với độ tuổi, khó dần theo trình độ:</p>`,
    `<ul>${GRADES.map((x) => `<li><a href="/toan-tu-duy-lop-${x.g}">Toán tư duy lớp ${x.g}</a> — ${x.topics.slice(0, 3).join(', ')}…</li>`).join('')}</ul>`,
    `<h2>Nên bắt đầu như thế nào?</h2>`,
    `<p>Hãy cho bé luyện đều mỗi ngày 10–15 phút, bắt đầu từ mức Dễ rồi nâng dần. Quan trọng là để bé <strong>tự suy nghĩ và giải thích</strong>, ba mẹ chỉ gợi ý khi cần.</p>`,
    `<p>Bé có thể bắt đầu miễn phí tại chuyên đề <a href="/toan-tu-duy">Toán tư duy lớp 1–5</a> — mỗi lớp 1000 câu có lời giải, giọng đọc và chế độ làm bài chấm điểm.</p>`,
  ].join('\n');
  return { title, slug, excerpt, content, tags: ['toán tư duy', 'toán tư duy là gì', 'tiểu học'] };
}

async function main() {
  const articles = [overviewArticle(), ...GRADES.map(gradeArticle)];
  const conn = await createConnection({
    host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  try {
    let n = 0;
    for (const a of articles) {
      await conn.query(
        `INSERT INTO articles (title, slug, excerpt, content, category, tags, isPublished, publishedAt, authorName, viewCount, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, CAST(? AS JSON), 1, NOW(), ?, 0, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
           title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content),
           category=VALUES(category), tags=VALUES(tags), isPublished=1,
           authorName=VALUES(authorName), updatedAt=NOW()`,
        [a.title, a.slug, a.excerpt, a.content, CATEGORY, JSON.stringify(a.tags), AUTHOR],
      );
      console.log(`  ✓ ${a.slug}`);
      n++;
    }
    console.log(`\n✅ Đã seed ${n} bài viết Toán tư duy (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
