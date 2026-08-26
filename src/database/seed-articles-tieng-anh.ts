/**
 * Seed bài viết giới thiệu LỘ TRÌNH HỌC TIẾNG ANH mới (8 mảng) vào bảng articles.
 *   npm run seed:articles-ta
 * Upsert theo slug. Nội dung HTML + internal link tới các trang tính năng mới.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const CATEGORY = 'Tiếng Anh';

function li(items: string[]) {
  return `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
}

function mainArticle() {
  const title = 'Học tiếng Anh cho bé miễn phí: lộ trình 8 bước từ chữ cái đến giao tiếp';
  const slug = 'hoc-tieng-anh-cho-be-lo-trinh-8-buoc';
  const excerpt =
    'Bé Hay Học vừa bổ sung bộ học tiếng Anh đầy đủ cho trẻ tiểu học: bảng chữ cái, phonics ghép vần, từ thông dụng, mẫu câu, hội thoại, bài hát và ngữ pháp — tất cả có phát âm giọng bản ngữ, miễn phí.';
  const content = [
    `<p>Nhiều phụ huynh muốn cho con làm quen tiếng Anh sớm nhưng chưa biết bắt đầu từ đâu và theo thứ tự nào. Bé Hay Học vừa xây dựng một <strong>lộ trình học tiếng Anh 8 bước</strong> cho trẻ tiểu học, đi từ nhận mặt chữ đến đọc, nói và giao tiếp — hoàn toàn miễn phí, có phát âm giọng bản ngữ.</p>`,

    `<h2>Vì sao nên học theo lộ trình?</h2>`,
    `<p>Học tiếng Anh hiệu quả cần đúng thứ tự: biết mặt chữ và âm trước, rồi mới ghép vần đọc từ, sau đó dùng từ để nói thành câu và giao tiếp. Học lộn xộn khiến bé mau quên và ngại nói. Lộ trình dưới đây giúp bé tiến từng bước vững chắc.</p>`,

    `<h2>Lộ trình 8 bước học tiếng Anh cho bé</h2>`,
    `<h3>1. Bảng chữ cái A–Z</h3>`,
    `<p>Bé làm quen 26 chữ cái: <a href="/bang-chu-cai-tieng-anh">tên chữ, âm và từ mẫu</a> kèm hình, nghe phát âm chuẩn. Đây là nền tảng để tập đọc.</p>`,
    `<h3>2. Phonics – Ghép vần đọc</h3>`,
    `<p><a href="/phonics-tieng-anh">Học âm của từng chữ và ghép vần</a> các từ đơn giản (cat, dog, sun…), có nút đọc chậm để bé nghe rõ cách nối âm — bí quyết giúp trẻ tự đọc từ mới.</p>`,
    `<h3>3. Sight words – Từ thông dụng</h3>`,
    `<p><a href="/sight-words-tieng-anh">Những từ xuất hiện nhiều nhất</a> trong sách thiếu nhi (the, and, is, you…) mà bé cần nhận mặt nhanh để đọc trôi chảy.</p>`,
    `<h3>4. Từ vựng theo chủ đề</h3>`,
    `<p><a href="/tu-vung-tieng-anh">Hàng trăm từ vựng</a> chia theo chủ đề quen thuộc (động vật, màu sắc, gia đình…) với hình minh hoạ, phiên âm và flashcard.</p>`,
    `<h3>5. Mẫu câu giao tiếp</h3>`,
    `<p><a href="/mau-cau-tieng-anh">Ghép từ thành câu</a> theo các mẫu quen thuộc: "This is a…", "I like…", "I can…", nói cảm xúc… giúp bé tập nói.</p>`,
    `<h3>6. Hội thoại theo tình huống</h3>`,
    `<p><a href="/hoi-thoai-tieng-anh">Các đoạn hội thoại ngắn</a> theo tình huống hằng ngày (làm quen, ở lớp, ở nhà, đi mua đồ), nghe được cả đoạn để bé luyện nghe – nói.</p>`,
    `<h3>7. Bài hát tiếng Anh</h3>`,
    `<p><a href="/bai-hat-tieng-anh">Các bài hát và đồng dao quen thuộc</a> (ABC Song, Twinkle Twinkle, Days of the Week…) — giai điệu giúp bé nhớ từ và phát âm tự nhiên.</p>`,
    `<h3>8. Ngữ pháp cơ bản qua trò chơi</h3>`,
    `<p><a href="/ngu-phap-tieng-anh">Học ngữ pháp nền tảng bằng trò chơi chọn đáp án</a>: a/an, số nhiều -s, this/that, to be (am/is/are), can/can't — có quy tắc, ví dụ và giải thích.</p>`,

    `<h2>Điểm nổi bật</h2>`,
    li([
      '<strong>Phát âm giọng bản ngữ</strong> ở mọi từ và câu — bé nghe đúng ngay từ đầu.',
      'Chọn đúng có <strong>tiếng khen và hiệu ứng vui</strong>, tạo hứng thú học.',
      'Có thể <strong>cài đặt như ứng dụng</strong> lên màn hình chính và học được cả khi mất mạng.',
      'Hoàn toàn <strong>miễn phí</strong>, không cần đăng nhập.',
    ]),

    `<h2>Bắt đầu như thế nào?</h2>`,
    `<p>Hãy cho bé học đều mỗi ngày 10–15 phút, bắt đầu từ <a href="/bang-chu-cai-tieng-anh">bảng chữ cái</a> rồi tiến dần theo lộ trình. Ba mẹ chỉ cần khuyến khích bé nghe và nhắc lại theo. Chúc bé học vui và tiến bộ mỗi ngày cùng <a href="/tu-vung-tieng-anh">Bé Hay Học</a>!</p>`,
  ].join('\n');
  return {
    title,
    slug,
    excerpt,
    content,
    tags: ['tiếng Anh cho bé', 'học tiếng Anh', 'phonics', 'tiểu học'],
  };
}

async function main() {
  const articles = [mainArticle()];
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
    console.log(`\n✅ Đã seed ${n} bài viết Tiếng Anh (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
