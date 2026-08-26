/**
 * Seed bài viết giới thiệu HỌC ĐỌC TIẾNG VIỆT (bảng chữ cái, đánh vần, bảng vần) vào bảng articles.
 *   npm run seed:articles-tv
 * Upsert theo slug. Nội dung HTML + internal link tới /hoc-doc-tieng-viet và các trang liên quan.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const CATEGORY = 'Tiếng Việt';

function li(items: string[]) {
  return `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
}

function mainArticle() {
  const title = 'Dạy bé học đọc tiếng Việt lớp 1: bảng chữ cái, đánh vần và bảng vần';
  const slug = 'day-be-hoc-doc-tieng-viet-lop-1';
  const excerpt =
    'Hướng dẫn dạy bé lớp 1 học đọc tiếng Việt đúng cách: nhận mặt 29 chữ cái, 6 dấu thanh, tập đánh vần và bảng vần đầy đủ. Có công cụ phát âm chuẩn miễn phí trên Bé Hay Học.';
  const content = [
    `<p>Học đọc là kỹ năng quan trọng nhất của bé lớp 1. Nhiều ba mẹ băn khoăn không biết dạy con <strong>đánh vần</strong> thế nào cho đúng. Bài viết này chia sẻ lộ trình học đọc tiếng Việt rõ ràng, kèm công cụ tương tác có <strong>phát âm chuẩn</strong> để bé tự luyện tại nhà.</p>`,

    `<h2>1. Bảng chữ cái tiếng Việt (29 chữ)</h2>`,
    `<p>Trước tiên bé cần nhận mặt và nhớ <strong>âm</strong> của 29 chữ cái. Lưu ý phân biệt <em>tên chữ</em> và <em>âm</em>: ví dụ chữ "b" tên là "bê" nhưng khi đánh vần đọc là "bờ". Bé có thể bấm nghe từng chữ tại <a href="/hoc-doc-tieng-viet">công cụ Học đọc tiếng Việt</a>.</p>`,

    `<h2>2. Sáu dấu thanh</h2>`,
    `<p>Tiếng Việt có 6 thanh, làm thay đổi nghĩa của tiếng:</p>`,
    li([
      '<strong>Ngang</strong> (không dấu): ma',
      '<strong>Huyền</strong> ( ` ): mà',
      '<strong>Sắc</strong> ( ´ ): má',
      '<strong>Hỏi</strong> ( ? ): mả',
      '<strong>Ngã</strong> ( ~ ): mã',
      '<strong>Nặng</strong> ( . ): mạ',
    ]),
    `<p>Cho bé nghe và so sánh 6 thanh trên cùng một tiếng gốc để cảm nhận sự khác biệt.</p>`,

    `<h2>3. Cách đánh vần đúng</h2>`,
    `<p>Đánh vần một tiếng theo thứ tự: <strong>âm đầu – vần – thêm dấu thanh</strong>. Ví dụ:</p>`,
    li([
      '"bà": bờ – a – ba – huyền – bà',
      '"cá": cờ – a – ca – sắc – cá',
      '"mẹ": mờ – e – me – nặng – mẹ',
    ]),
    `<p>Với <strong>vần</strong>, đọc <em>âm chính – âm cuối – cả vần</em>. Một mẹo quan trọng: các vần có âm cuối là <strong>c, ch, t, p</strong> (vần trắc) chỉ đọc được khi mang dấu sắc hoặc nặng, nên khi đánh vần đọc tiếng cuối có dấu sắc:</p>`,
    li([
      '"ăm": ă – mờ – ăm',
      '"ưc": ư – cờ – <strong>ức</strong>',
      '"iêt": i – ê – tờ – <strong>iết</strong>',
      '"ich": i – chờ – <strong>ích</strong>',
    ]),

    `<h2>4. Bảng vần đầy đủ</h2>`,
    `<p>Sau khi thạo chữ cái và dấu thanh, bé học các <strong>vần</strong> thường gặp, nhóm theo âm cuối: vần kết thúc bằng -n, -m, -ng, -nh, -c, -ch, -t, -p, các vần chỉ có nguyên âm (ai, ao, oai…). Mỗi vần có từ mẫu và nút bấm nghe <a href="/hoc-doc-tieng-viet">đánh vần từng vần</a>.</p>`,

    `<h2>5. Cách học hiệu quả tại nhà</h2>`,
    li([
      'Học đều mỗi ngày 10–15 phút, không ép bé học quá lâu.',
      'Cho bé <strong>nghe trước – nhắc lại sau</strong>, ba mẹ khen ngợi kịp thời.',
      'Học chữ cái và âm trước, rồi mới ghép vần, cuối cùng ghép tiếng có dấu thanh.',
      'Kết hợp <a href="/luyen-viet-chu">luyện viết chữ</a> để bé nhớ mặt chữ tốt hơn.',
    ]),

    `<h2>Bắt đầu ngay</h2>`,
    `<p>Ba mẹ cho bé mở <a href="/hoc-doc-tieng-viet">công cụ Học đọc tiếng Việt</a> (bảng chữ cái · đánh vần & dấu thanh · bảng vần) để nghe phát âm chuẩn và tập đọc từng bước. Xem thêm <a href="/khoa-hoc/tieng-viet-lop-1">Khóa Tiếng Việt lớp 1</a> và <a href="/bai-tap/tieng-viet-lop-1">Bài tập Tiếng Việt lớp 1</a>. Chúc bé sớm đọc trôi chảy!</p>`,
  ].join('\n');
  return {
    title,
    slug,
    excerpt,
    content,
    tags: ['học đọc tiếng Việt', 'đánh vần', 'bảng vần', 'tiếng Việt lớp 1'],
  };
}

function suiteArticle() {
  const title = 'Học tiếng Việt cho bé lớp 1–3: lộ trình đầy đủ từ đánh vần đến đọc hiểu';
  const slug = 'hoc-tieng-viet-cho-be-lo-trinh-day-du';
  const excerpt =
    'Bé Hay Học vừa bổ sung bộ công cụ học tiếng Việt đầy đủ cho trẻ lớp 1–3: học đọc (đánh vần), chính tả, luyện từ và câu, tập đọc, đồng dao – ca dao và mở rộng vốn từ. Có phát âm chuẩn, miễn phí.';
  const content = [
    `<p>Tiếng Việt là môn học nền tảng, đồng hành cùng con suốt bậc tiểu học. Để giúp ba mẹ dạy con dễ dàng hơn, Bé Hay Học xây dựng một <strong>bộ công cụ học tiếng Việt đầy đủ</strong> cho bé lớp 1–3, đi từ tập đọc đến đọc hiểu và mở rộng vốn từ — tất cả có phát âm chuẩn giọng Việt, miễn phí.</p>`,

    `<h2>1. Học đọc – Đánh vần</h2>`,
    `<p><a href="/hoc-doc-tieng-viet">Học đọc tiếng Việt</a> gồm bảng chữ cái 29 chữ, 6 dấu thanh và bảng vần đầy đủ. Bé nghe phát âm và tập <strong>đánh vần</strong> từng bước — nền tảng để bé tự đọc.</p>`,

    `<h2>2. Chính tả phân biệt</h2>`,
    `<p><a href="/chinh-ta-tieng-viet">Trò chơi chính tả</a> giúp bé sửa các lỗi hay gặp nhất: phân biệt <strong>s/x, ch/tr, l/n, d/gi/r</strong> và <strong>dấu hỏi/ngã</strong>. Chọn đáp án đúng là nghe từ đúng và có tiếng khen.</p>`,

    `<h2>3. Luyện từ và câu</h2>`,
    `<p><a href="/luyen-tu-va-cau">Luyện từ và câu</a> cho bé lớp 2–3: nhận biết từ chỉ <strong>sự vật, hoạt động, đặc điểm</strong>, dùng đúng <strong>dấu câu</strong> và tìm <strong>từ trái nghĩa</strong>.</p>`,

    `<h2>4. Tập đọc – Đọc hiểu</h2>`,
    `<p><a href="/tap-doc-tieng-viet">Tập đọc tiếng Việt</a> có các bài đọc ngắn theo chủ đề quen thuộc, nghe đọc mẫu từng câu rồi trả lời <strong>câu hỏi đọc hiểu</strong> — bước từ đọc trơn lên đọc hiểu.</p>`,

    `<h2>5. Đồng dao & ca dao</h2>`,
    `<p><a href="/dong-dao-ca-dao">Đồng dao, ca dao dân gian</a> quen thuộc (Dung dăng dung dẻ, Công cha như núi Thái Sơn…) vừa vui vừa dạy bé điều hay; ca dao kèm ý nghĩa để ba mẹ giảng cho con.</p>`,

    `<h2>6. Mở rộng vốn từ</h2>`,
    `<p><a href="/mo-rong-von-tu">Mở rộng vốn từ theo chủ đề</a> giúp bé học thêm nhiều từ ngữ (con vật, nghề nghiệp, thiên nhiên, cảm xúc…) kèm nghĩa dễ hiểu và câu ví dụ.</p>`,

    `<h2>Học theo thứ tự nào?</h2>`,
    `<p>Ba mẹ nên cho bé bắt đầu từ <a href="/hoc-doc-tieng-viet">học đọc – đánh vần</a>, rồi <a href="/tap-doc-tieng-viet">tập đọc</a>; song song luyện <a href="/chinh-ta-tieng-viet">chính tả</a> và <a href="/luyen-tu-va-cau">từ và câu</a>; cuối cùng <a href="/mo-rong-von-tu">mở rộng vốn từ</a> và đọc <a href="/dong-dao-ca-dao">đồng dao, ca dao</a> cho phong phú. Mỗi ngày 10–15 phút, bé sẽ tiến bộ rõ rệt.</p>`,
  ].join('\n');
  return {
    title,
    slug,
    excerpt,
    content,
    tags: ['học tiếng Việt', 'tiếng Việt lớp 1', 'chính tả', 'luyện từ và câu', 'tập đọc'],
  };
}

async function main() {
  const articles = [mainArticle(), suiteArticle()];
  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
    console.log(`\n✅ Đã seed ${n} bài viết Tiếng Việt (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
