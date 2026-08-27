/**
 * Seed bài viết SEO cho các tính năng MỚI: ví sao & bộ sưu tập, đấu trường thi đấu,
 * chuỗi ngày & nhiệm vụ tuần, báo cáo tuần cho phụ huynh.
 *   npm run seed:articles-features3
 * Upsert theo slug. Mỗi bài nội dung riêng + internal link tới trang tính năng.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };

const ARTICLES: Art[] = [
  {
    category: 'Học vui',
    title: 'Học mà chơi: kiếm sao, đổi thú cưng và huy hiệu trên Bé Hay Học',
    slug: 'kiem-sao-doi-thu-cung-huy-hieu-be-hay-hoc',
    excerpt: 'Mỗi bài học hoàn thành, bé nhận sao ⭐ để mở khoá nhãn dán, thú cưng, khung avatar và sưu tầm huy hiệu — cách vui để bé thích học mỗi ngày.',
    tags: ['học mà chơi', 'phần thưởng cho bé', 'động lực học tập', 'bé hay học'],
    content: [
      `<p>Trẻ nhỏ học tốt nhất khi việc học gắn với niềm vui và phần thưởng nhìn thấy được. Trên Bé Hay Học, mỗi bài tập bé hoàn thành đều mang lại <strong>sao ⭐</strong> — và những ngôi sao ấy có thể đổi thành cả một bộ sưu tập đáng yêu.</p>`,
      `<h2>Kiếm sao như thế nào?</h2>`,
      ul([
        'Hoàn thành mỗi bài tập được <strong>+3 đến +7 sao</strong> tuỳ mức độ làm đúng.',
        'Làm đúng nhiều, đạt điểm cao → càng nhiều sao.',
        'Sao được cộng tự động, hiện ngay trên đầu trang để bé theo dõi.',
      ]),
      `<h2>Đổi sao lấy gì?</h2>`,
      `<p>Trong <a href="/bo-suu-tap">Bộ sưu tập của bé</a>, sao dùng để mở khoá:</p>`,
      ul([
        '<strong>Nhãn dán</strong> ngộ nghĩnh: ngôi sao, cầu vồng, cúp vàng…',
        '<strong>Thú cưng</strong> đáng yêu: mèo con, cún con, gấu trúc, kỳ lân, rồng nhỏ…',
        '<strong>Khung avatar</strong> nhiều màu để trang trí ảnh đại diện.',
      ]),
      `<h2>Sưu tầm huy hiệu thành tích</h2>`,
      `<p>Bé còn có thể chinh phục <strong>huy hiệu</strong>: "Bước đầu tiên", "Ham học", "Chuỗi 7 ngày", "Điểm tuyệt đối", "Vua sưu tầm"… Mỗi huy hiệu là một mục tiêu rõ ràng để bé cố gắng.</p>`,
      `<h2>Đặt thú cưng làm avatar</h2>`,
      `<p>Thú cưng đã mở khoá có thể đặt làm <strong>ảnh đại diện</strong> của bé — "bạn đồng hành" nhỏ xinh theo bé suốt hành trình học. Khám phá ngay tại <a href="/bo-suu-tap">Bộ sưu tập</a> và bắt đầu kiếm sao ở <a href="/hoc-hom-nay">Học hôm nay</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Học vui',
    title: 'Đấu Trường Toán tốc độ — thi đấu theo lớp cho bé',
    slug: 'dau-truong-toan-toc-do-thi-dau-theo-lop',
    excerpt: 'Thử thách Toán tốc độ trên Bé Hay Học: trả lời đúng liên tiếp, sai một câu là dừng, ghi điểm lên bảng xếp hạng tuần riêng cho từng lớp 1–5.',
    tags: ['toán tốc độ', 'thi đấu toán', 'bảng xếp hạng', 'tính nhẩm nhanh'],
    content: [
      `<p>Trẻ con rất thích thi đua. <a href="/dau-truong">Đấu Trường Toán tốc độ</a> biến việc luyện tính nhẩm thành một trò chơi kịch tính, giúp bé phản xạ nhanh và tự tin hơn với con số.</p>`,
      `<h2>Luật chơi đơn giản</h2>`,
      ul([
        'Bé trả lời các phép tính bằng cách chọn đáp án đúng.',
        '<strong>Đúng liên tiếp</strong> càng nhiều câu càng ghi nhiều điểm.',
        '<strong>Sai một câu là dừng</strong> — nên bé phải tính chắc chắn, không đoán bừa.',
        'Điểm cao nhất trong tuần được ghi lên bảng xếp hạng.',
      ]),
      `<h2>Công bằng theo từng lớp</h2>`,
      `<p>Độ khó của phép tính <strong>tự điều chỉnh theo lớp của bé</strong> (lấy từ hồ sơ): lớp 1 làm cộng trừ trong 20, lớp lớn hơn có nhân, chia và số lớn dần. Mỗi lớp có <strong>bảng xếp hạng riêng</strong>, nên bé lớp 1 chỉ đua với các bạn lớp 1 — hoàn toàn công bằng.</p>`,
      `<h2>Vì sao nên cho bé chơi?</h2>`,
      ul([
        'Rèn <strong>tính nhẩm nhanh</strong> và sự tập trung.',
        'Tạo động lực luyện tập đều đặn để leo hạng.',
        'Bảng xếp hạng <strong>đặt lại mỗi tuần</strong> — luôn có cơ hội cho bé mới.',
      ]),
      `<p>Thử sức ngay tại <a href="/dau-truong">Đấu Trường</a>, và luyện thêm ở <a href="/luyen-tinh-nham">Luyện tính nhẩm</a> để lên trình!</p>`,
    ].join('\n'),
  },
  {
    category: 'Học vui',
    title: 'Giúp bé giữ thói quen học mỗi ngày: chuỗi ngày và nhiệm vụ tuần',
    slug: 'giup-be-giu-thoi-quen-hoc-moi-ngay',
    excerpt: 'Chuỗi ngày học liên tiếp 🔥 và nhiệm vụ tuần giúp bé hình thành thói quen học đều đặn, có mục tiêu ngắn hạn và phần thưởng để duy trì động lực.',
    tags: ['thói quen học tập', 'chuỗi ngày', 'nhiệm vụ tuần', 'động lực học'],
    content: [
      `<p>Điều quan trọng nhất với việc học của trẻ không phải là học nhiều trong một buổi, mà là <strong>học đều đặn mỗi ngày một chút</strong>. Bé Hay Học thiết kế hai cơ chế nhẹ nhàng để giúp bé duy trì thói quen ấy.</p>`,
      `<h2>Chuỗi ngày học liên tiếp 🔥</h2>`,
      `<p>Mỗi ngày bé học ít nhất một bài, "chuỗi ngày" sẽ tăng lên. Ngọn lửa 🔥 hiển thị ngay trên đầu trang nhắc bé <strong>giữ chuỗi không đứt</strong> — một động lực đơn giản mà rất hiệu quả, giống cách người lớn duy trì thói quen tốt.</p>`,
      `<h2>Nhiệm vụ tuần</h2>`,
      `<p>Mỗi tuần bé có vài nhiệm vụ ngắn với phần thưởng sao:</p>`,
      ul([
        'Hoàn thành 5 bài học trong tuần.',
        'Học đủ 3 ngày trong tuần.',
        'Đạt điểm 100% ở 2 bài.',
        'Học từ 2 môn khác nhau.',
      ]),
      `<p>Nhiệm vụ <strong>đặt lại mỗi tuần</strong> nên luôn có mục tiêu mới để bé phấn đấu và quay lại đều đặn.</p>`,
      `<h2>Mẹo cho phụ huynh</h2>`,
      ul([
        'Cho bé học vào một <strong>khung giờ cố định</strong> mỗi ngày (10–15 phút).',
        'Cùng bé xem chuỗi ngày và cổ vũ khi bé giữ được chuỗi dài.',
        'Để bé tự nhận thưởng nhiệm vụ — cảm giác "hoàn thành" rất quan trọng.',
      ]),
      `<p>Bắt đầu tại <a href="/hoc-hom-nay">Học hôm nay</a> và xem nhiệm vụ, phần thưởng ở <a href="/bo-suu-tap">Bộ sưu tập</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Phụ huynh',
    title: 'Báo cáo tuần: cách theo dõi con học trên Bé Hay Học',
    slug: 'bao-cao-tuan-theo-doi-con-hoc',
    excerpt: 'Báo cáo tuần tóm tắt bé đã học bao nhiêu bài, độ chính xác, môn chăm nhất và gợi ý cho tuần tới — giúp phụ huynh đồng hành cùng con dễ dàng.',
    tags: ['theo dõi con học', 'báo cáo học tập', 'phụ huynh', 'tiến độ học'],
    content: [
      `<p>Nhiều phụ huynh muốn đồng hành cùng con nhưng không có thời gian ngồi kèm từng buổi. <a href="/bao-cao">Báo cáo tuần</a> của Bé Hay Học giúp bố mẹ nắm được tình hình học của con chỉ trong một cái nhìn.</p>`,
      `<h2>Báo cáo tuần có gì?</h2>`,
      ul([
        '<strong>Số bài học</strong> bé hoàn thành trong 7 ngày (so với tuần trước).',
        '<strong>Độ chính xác</strong>: bé trả lời đúng bao nhiêu phần trăm.',
        '<strong>Môn chăm nhất</strong> và các môn bé đã học.',
        '<strong>Chuỗi ngày</strong> và số sao bé kiếm được.',
        '<strong>Gợi ý cho tuần tới</strong>: kỹ năng bé nên luyện thêm.',
      ]),
      `<h2>Vì sao báo cáo tuần hữu ích?</h2>`,
      ul([
        'Bố mẹ <strong>khen đúng lúc</strong> khi thấy con tiến bộ.',
        'Phát hiện sớm môn/kỹ năng con còn yếu để hỗ trợ.',
        'Có thể <strong>chia sẻ</strong> báo cáo để khoe hoặc lưu lại.',
      ]),
      `<h2>Đồng hành cùng con</h2>`,
      `<p>Chỉ cần vài phút mỗi tuần xem <a href="/bao-cao">báo cáo của bé</a>, cùng con đặt mục tiêu nhỏ cho tuần tới. Sự quan tâm đều đặn của bố mẹ là động lực lớn nhất để con thích học. Xem thêm <a href="/hoc-hom-nay">lộ trình Học hôm nay</a> để biết hệ thống gợi ý gì cho con.</p>`,
    ].join('\n'),
  },
];

async function main() {
  const conn = await createConnection({
    host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  try {
    let n = 0;
    for (const a of ARTICLES) {
      await conn.query(
        `INSERT INTO articles (title, slug, excerpt, content, category, tags, isPublished, publishedAt, authorName, viewCount, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, CAST(? AS JSON), 1, NOW(), ?, 0, NOW(), NOW())
         ON DUPLICATE KEY UPDATE title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content),
           category=VALUES(category), tags=VALUES(tags), isPublished=1, authorName=VALUES(authorName), updatedAt=NOW()`,
        [a.title, a.slug, a.excerpt, a.content, a.category, JSON.stringify(a.tags), AUTHOR],
      );
      console.log(`  ✓ [${a.category}] ${a.slug}`);
      n++;
    }
    console.log(`\n✅ Đã seed ${n} bài viết tính năng mới (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
