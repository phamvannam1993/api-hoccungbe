/**
 * Seed bài viết SEO cho tính năng "360 tình huống tiếng Anh cho ba mẹ nói với con"
 * (/tinh-huong-tieng-anh).
 *   npm run seed:articles-features5
 * Upsert theo slug.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };

const ARTICLES: Art[] = [
  {
    category: 'Phụ huynh',
    title: 'Chưa biết nói gì tiếng Anh với con? Bắt đầu với 360 tình huống này',
    slug: '360-tinh-huong-tieng-anh-noi-voi-con',
    excerpt:
      'Bộ 360 câu tiếng Anh ngắn theo 18 tình huống hằng ngày — buổi sáng, giờ ăn, tắm rửa, an toàn, đi ngủ… Mỗi câu có phát âm, nghe chậm và nghĩa tiếng Việt để ba mẹ tự tin nói cùng con.',
    tags: ['tiếng anh cho bé', 'ba mẹ dạy con tiếng anh', 'giao tiếp tiếng anh', 'tiếng anh hằng ngày', 'bé hay học'],
    content: [
      `<p>Nhiều ba mẹ muốn cho con “tắm” tiếng Anh ngay tại nhà nhưng lại lúng túng: <em>biết nói câu gì, nói lúc nào, phát âm ra sao?</em> Bé Hay Học vừa ra mắt <a href="/tinh-huong-tieng-anh"><strong>360 tình huống tiếng Anh</strong></a> — những câu ngắn, quen thuộc để ba mẹ nói với con trong đúng các khoảnh khắc hằng ngày.</p>`,

      `<h2>Vì sao học theo tình huống lại hiệu quả?</h2>`,
      `<p>Trẻ nhỏ học ngôn ngữ tự nhiên nhất khi câu nói <strong>gắn với việc đang xảy ra</strong>. Nói “Brush your teeth” đúng lúc con cầm bàn chải, hay “Good night, sweet dreams” khi tắt đèn đi ngủ — con hiểu ngay mà không cần dịch. Lặp lại mỗi ngày, con thấm dần một cách thoải mái.</p>`,

      `<h2>18 chủ đề, 360 câu cho cả ngày của bé</h2>`,
      ul([
        'Buổi sáng thức dậy, Giờ ăn, Tắm & vệ sinh, Giờ đi ngủ.',
        'Vui chơi, Ra ngoài, Đi chơi xa, Việc nhà, Đi mua sắm.',
        'An toàn, Lễ phép, Sức khỏe & ốm đau, Ở trường.',
        'Cảm xúc, Gia đình, Học & khen ngợi, Thời tiết, Sinh nhật & lễ hội.',
      ]),
      `<p>Mỗi chủ đề có <strong>20 câu</strong> chọn lọc, ngắn gọn và đúng ngữ pháp — vừa đủ để dùng thật, không quá tải.</p>`,

      `<h2>Mỗi câu có gì?</h2>`,
      ul([
        '<strong>Câu tiếng Anh</strong> ngắn, tự nhiên (vd “Did you sleep well?”, “Hold my hand.”).',
        '<strong>Phiên âm IPA</strong> để ba mẹ đọc chuẩn hơn.',
        '<strong>Nút Nghe</strong> phát âm giọng Anh, và <strong>Nghe chậm</strong> để nghe rõ từng âm.',
        '<strong>Nghĩa tiếng Việt</strong> đi kèm, có thể ẩn đi để tự kiểm tra.',
      ]),

      `<h2>Gợi ý cho ba mẹ</h2>`,
      ul([
        'Mỗi ngày chọn <strong>một chủ đề</strong> hợp với sinh hoạt (sáng dậy, giờ ăn…).',
        'Nói câu tiếng Anh <strong>ngay tại khoảnh khắc đó</strong>, kèm hành động.',
        'Đừng ngại phát âm chưa chuẩn — bấm <strong>Nghe</strong> để cùng con nghe lại.',
        'Lặp lại vài câu quen thuộc mỗi ngày; nhớ nhờ lặp, không nhờ học thuộc.',
      ]),

      `<p>Bắt đầu ngay tại <a href="/tinh-huong-tieng-anh">360 tình huống tiếng Anh</a>. Muốn con luyện thêm từ vựng, cho bé chơi <a href="/hoc-tieng-anh">Game học tiếng Anh</a> và xem <a href="/tu-vung-tieng-anh">Từ vựng theo chủ đề</a> nhé.</p>`,
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
