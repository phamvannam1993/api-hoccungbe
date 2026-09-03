/**
 * Seed bài viết SEO cho tính năng "Thi Tài" — sân thi đấu Toán tính giờ (/thi-tai).
 *   npm run seed:articles-features6
 * Upsert theo slug.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };

const ARTICLES: Art[] = [
  {
    category: 'Tính năng mới',
    title: 'Thi Tài Toán: sân thi đấu tính giờ giúp bé mê Toán mỗi ngày',
    slug: 'thi-tai-toan-san-thi-dau-cho-be',
    excerpt:
      'Thi Tài là sân thi đấu Toán 5 vòng, tính giờ và ghi điểm lên bảng xếp hạng tuần theo từng lớp. Câu hỏi bám sát chương trình từng lớp, tự xoay tua chống học vẹt, chấm điểm thông minh có trần mỗi ngày để bé chơi vui mà vẫn tiến bộ đều.',
    tags: ['thi tài', 'thi đấu toán', 'toán tư duy', 'trò chơi toán học', 'toán tiểu học', 'bé hay học'],
    content: [
      `<p>Làm sao để con <strong>chủ động mở ra học Toán</strong> mỗi ngày mà không cần nhắc? Bé Hay Học vừa ra mắt <a href="/thi-tai"><strong>Thi Tài</strong></a> — một sân thi đấu Toán ngắn, kịch tính và có bảng xếp hạng, biến việc luyện Toán thành một trận đấu mà bé muốn quay lại mỗi ngày.</p>`,

      `<h2>Thi Tài là gì?</h2>`,
      `<p>Mỗi lượt Thi Tài là một <strong>trận đấu 5 vòng</strong> với độ khó tăng dần. Bé trả lời càng nhanh và đúng, giữ chuỗi đúng (combo) càng dài thì điểm càng cao. Cuối trận bé nhận huy chương, cộng sao thưởng và xem mình đứng hạng mấy trong tuần.</p>`,

      `<h2>5 vòng thi hấp dẫn</h2>`,
      ul([
        '<strong>Khởi động</strong> — làm quen, lấy nhịp nhẹ nhàng.',
        '<strong>Thần tốc</strong> — mỗi câu chỉ vài giây, trả lời nhanh được thưởng điểm tốc độ.',
        '<strong>IQ · Suy luận</strong> — câu tư duy: dãy số, quy luật, so sánh.',
        '<strong>Bài toán</strong> — toán có lời văn, gắn với tình huống đời thường.',
        '<strong>Siêu thử thách</strong> — câu khó nhất, câu cuối nhân đôi điểm để lật ngược thế cờ.',
      ]),

      `<h2>Câu hỏi chuẩn theo từng lớp</h2>`,
      `<p>Bé chọn <strong>lớp 1 đến lớp 5</strong>, đề thi sẽ bám đúng mức độ của lớp đó: lớp 1 cộng trừ trong phạm vi nhỏ, lớp 3 nhân chia bảng cửu chương, lớp 5 phân số – số thập phân – phần trăm… Phần lớn câu hỏi lấy từ bộ <a href="/toan-tu-duy">Toán tư duy</a> nên vừa luyện tính toán vừa rèn suy luận.</p>`,

      `<h2>Tự xoay tua — chống học vẹt</h2>`,
      `<p>Thi Tài <strong>ghi nhớ các câu vừa ra</strong> và ưu tiên đưa câu mới ở lượt sau, đồng thời <strong>đảo vị trí đáp án mỗi lần</strong>. Nhờ vậy bé không thể học thuộc “đáp án nằm ở ô nào”, mà phải thật sự hiểu và tính ra kết quả.</p>`,

      `<h2>Chấm điểm thông minh, công bằng</h2>`,
      ul([
        'Điểm mỗi trận = <strong>trả lời đúng + tốc độ + chuỗi combo + câu khó</strong>.',
        'Có <strong>trần điểm mỗi ngày</strong> để bạn nào chơi đều cả tuần vẫn có cơ hội, không phải “cày” liên tục mới lên hạng.',
        'Khi hai bạn <strong>bằng điểm</strong>, ai làm <strong>nhanh hơn</strong> sẽ xếp trên.',
        'Bảng xếp hạng <strong>riêng từng lớp</strong> để so tài công bằng với bạn cùng trình độ.',
      ]),

      `<h2>Vì sao trẻ thích và tiến bộ?</h2>`,
      `<p>Cảm giác đếm ngược, chuỗi combo, huy chương và thứ hạng tạo <strong>động lực quay lại mỗi ngày</strong>. Trong lúc “chơi cho vui”, bé lặp lại phản xạ tính nhanh và suy luận hàng chục lần — đúng cách một kỹ năng được hình thành: <em>nhờ lặp lại đều đặn, không nhờ ép học</em>.</p>`,

      `<h2>Bắt đầu thế nào?</h2>`,
      ul([
        'Vào <a href="/thi-tai"><strong>Thi Tài</strong></a>, chọn <strong>lớp</strong> của bé.',
        'Bấm <strong>Thi ngay</strong> và cùng con chinh phục 5 vòng.',
        'Xem huy chương, điểm và thứ hạng tuần sau mỗi trận.',
      ]),

      `<p>Cho bé thử sức ngay tại <a href="/thi-tai">Thi Tài</a>. Muốn luyện thêm nền tảng, xem <a href="/toan-tu-duy">Toán tư duy</a> theo lớp hoặc các <a href="/tro-choi">trò chơi học tập</a> khác của Bé Hay Học nhé.</p>`,
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
    console.log(`\n✅ Đã seed ${n} bài viết (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
