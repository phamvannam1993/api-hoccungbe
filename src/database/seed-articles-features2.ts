/**
 * Seed bài viết SEO cho các công cụ MỚI (truyện cổ tích, thành ngữ, tập làm văn, tính nhẩm, bảng cửu chương).
 *   npm run seed:articles-features2
 * Upsert theo slug. Mỗi bài nội dung riêng + internal link tới trang công cụ.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };

const ARTICLES: Art[] = [
  {
    category: 'Tiếng Việt',
    title: 'Truyện cổ tích Việt Nam hay và ý nghĩa cho bé',
    slug: 'truyen-co-tich-viet-nam-hay-cho-be',
    excerpt: 'Tuyển tập truyện cổ tích Việt Nam quen thuộc cho bé: Thánh Gióng, Sơn Tinh Thủy Tinh, Sự tích Hồ Gươm… kèm bài học và câu hỏi đọc hiểu.',
    tags: ['truyện cổ tích', 'truyện cổ tích việt nam', 'kể chuyện cho bé', 'đọc hiểu'],
    content: [
      `<p>Truyện cổ tích là món ăn tinh thần không thể thiếu của tuổi thơ. Qua những câu chuyện dân gian, bé không chỉ được giải trí mà còn học được nhiều bài học quý về lòng dũng cảm, sự hiếu thảo và tính trung thực.</p>`,
      `<h2>Vì sao nên cho bé đọc truyện cổ tích?</h2>`,
      ul([
        'Phát triển <strong>trí tưởng tượng</strong> và tình yêu với tiếng Việt.',
        'Học <strong>bài học đạo đức</strong> một cách nhẹ nhàng qua nhân vật.',
        'Rèn <strong>kỹ năng đọc và đọc hiểu</strong> khi bé đọc và kể lại.',
        'Gắn kết gia đình qua những giờ đọc truyện cùng con.',
      ]),
      `<h2>Những truyện cổ tích quen thuộc</h2>`,
      `<p><strong>Thánh Gióng</strong> ca ngợi lòng yêu nước; <strong>Sơn Tinh – Thủy Tinh</strong> giải thích hiện tượng lũ lụt; <strong>Sự tích Hồ Gươm</strong> gắn với địa danh Hà Nội; <strong>Cây tre trăm đốt</strong>, <strong>Sự tích quả dưa hấu</strong> và <strong>Cây khế</strong> dạy bé sống hiền lành, chăm chỉ, không tham lam.</p>`,
      `<h2>Đọc và nghe kể ngay</h2>`,
      `<p>Bé có thể đọc và <a href="/truyen-co-tich">nghe kể truyện cổ tích Việt Nam</a> — mỗi truyện có nghe đọc mẫu từng câu, bài học rút ra và câu hỏi đọc hiểu. Xem thêm <a href="/tap-doc-tieng-viet">Tập đọc tiếng Việt</a> và <a href="/dong-dao-ca-dao">Đồng dao, ca dao</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Thành ngữ, tục ngữ Việt Nam cho bé và ý nghĩa',
    slug: 'thanh-ngu-tuc-ngu-cho-be-y-nghia',
    excerpt: 'Tổng hợp thành ngữ, tục ngữ Việt Nam quen thuộc cho bé kèm giải nghĩa dễ hiểu và ví dụ: chăm chỉ, đoàn kết, biết ơn, sống đẹp.',
    tags: ['thành ngữ', 'tục ngữ', 'ca dao tục ngữ', 'tiếng Việt'],
    content: [
      `<p>Thành ngữ và tục ngữ là kho tàng trí tuệ dân gian, đúc kết kinh nghiệm sống của ông cha ta trong những câu ngắn gọn, dễ nhớ. Cho bé học thành ngữ, tục ngữ giúp con giàu vốn từ và hiểu nhiều điều hay lẽ phải.</p>`,
      `<h2>Thành ngữ và tục ngữ khác nhau thế nào?</h2>`,
      `<p><strong>Thành ngữ</strong> là cụm từ cố định, thường chưa thành câu (ví dụ "ăn quả nhớ kẻ trồng cây"). <strong>Tục ngữ</strong> là câu hoàn chỉnh, nêu một bài học hoặc kinh nghiệm (ví dụ "có công mài sắt, có ngày nên kim").</p>`,
      `<h2>Một số câu quen thuộc theo chủ đề</h2>`,
      ul([
        '<strong>Chăm chỉ:</strong> "Có công mài sắt, có ngày nên kim", "Kiến tha lâu cũng đầy tổ".',
        '<strong>Đoàn kết:</strong> "Lá lành đùm lá rách", "Một cây làm chẳng nên non…".',
        '<strong>Biết ơn:</strong> "Ăn quả nhớ kẻ trồng cây", "Uống nước nhớ nguồn".',
        '<strong>Sống đẹp:</strong> "Tốt gỗ hơn tốt nước sơn", "Đói cho sạch, rách cho thơm".',
      ]),
      `<h2>Học kèm giải nghĩa và ví dụ</h2>`,
      `<p>Bé có thể học <a href="/thanh-ngu-tuc-ngu">thành ngữ, tục ngữ cho bé</a> — mỗi câu có giải nghĩa dễ hiểu, ví dụ và nghe đọc. Xem thêm <a href="/dong-dao-ca-dao">Đồng dao, ca dao</a> và <a href="/mo-rong-von-tu">Mở rộng vốn từ</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Cách dạy bé tập làm văn lớp 2–3 (dàn ý + bài mẫu)',
    slug: 'cach-day-be-tap-lam-van-lop-2-3',
    excerpt: 'Hướng dẫn dạy bé lớp 2–3 tập làm văn: cách lập dàn ý, dùng từ ngữ gợi tả, viết bài văn tả con vật, cây cối, người thân. Có bài văn mẫu.',
    tags: ['tập làm văn', 'tập làm văn lớp 2', 'dàn ý', 'văn tả'],
    content: [
      `<p>Tập làm văn là kỹ năng khiến nhiều bé lớp 2–3 lúng túng vì chưa biết bắt đầu từ đâu. Chỉ cần nắm vững <strong>dàn ý ba phần</strong> và có <strong>từ ngữ gợi tả</strong>, bé sẽ viết được một bài văn hoàn chỉnh.</p>`,
      `<h2>Dàn ý ba phần</h2>`,
      ul([
        '<strong>Mở bài:</strong> giới thiệu đối tượng (con vật, cây, người… mà em định tả).',
        '<strong>Thân bài:</strong> tả chi tiết (hình dáng, đặc điểm, hoạt động).',
        '<strong>Kết bài:</strong> nêu tình cảm, suy nghĩ của em.',
      ]),
      `<h2>Mẹo giúp bé viết hay hơn</h2>`,
      ul([
        'Chuẩn bị sẵn <strong>từ ngữ gợi tả</strong> (lông mượt, mắt tròn xoe, tán lá rộng…).',
        'Quan sát kỹ đối tượng trước khi viết.',
        'Viết câu ngắn, rõ ý; đọc lại và sửa lỗi chính tả.',
        'Đọc bài văn mẫu để học cách diễn đạt, nhưng viết bằng lời của mình.',
      ]),
      `<h2>Luyện viết ngay</h2>`,
      `<p>Bé có thể luyện <a href="/tap-lam-van">tập làm văn cho bé</a> với đề bài, dàn ý gợi ý, từ ngữ hay, bài văn mẫu nghe được và ô tự viết (lưu tự động). Xem thêm <a href="/luyen-tu-va-cau">Luyện từ và câu</a> và <a href="/mo-rong-von-tu">Mở rộng vốn từ</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Toán',
    title: 'Mẹo luyện tính nhẩm nhanh cho bé tiểu học',
    slug: 'meo-luyen-tinh-nham-nhanh-cho-be',
    excerpt: 'Các mẹo giúp bé tính nhẩm nhanh cộng, trừ, nhân, chia: làm tròn chục, mẹo nhân 9, nhân 5. Kèm trò chơi luyện tính nhẩm 60 giây miễn phí.',
    tags: ['tính nhẩm', 'tính nhẩm nhanh', 'toán tiểu học', 'luyện toán'],
    content: [
      `<p>Tính nhẩm nhanh giúp bé tự tin hơn khi học Toán và làm bài kiểm tra. Bí quyết là nắm vài <strong>mẹo tính</strong> và <strong>luyện tập đều đặn</strong> mỗi ngày.</p>`,
      `<h2>Những mẹo tính nhẩm hữu ích</h2>`,
      ul([
        '<strong>Cộng — làm tròn chục:</strong> 8 + 5 = 8 + 2 + 3 = 10 + 3 = 13.',
        '<strong>Trừ — về tròn chục:</strong> 13 − 5 = 13 − 3 − 2 = 10 − 2 = 8.',
        '<strong>Nhân 9:</strong> 9 × n = 10 × n − n. Ví dụ 9 × 7 = 70 − 7 = 63.',
        '<strong>Nhân 5:</strong> bằng một nửa của nhân 10. Ví dụ 5 × 8 = 80 ÷ 2 = 40.',
        '<strong>Chia là phép ngược của nhân:</strong> 56 ÷ 8 = 7 vì 8 × 7 = 56.',
      ]),
      `<h2>Luyện tập đều đặn</h2>`,
      `<p>Nên cho bé luyện mỗi ngày 5–10 phút để rèn phản xạ với con số. Bé có thể chơi <a href="/luyen-tinh-nham">luyện tính nhẩm nhanh</a> với bàn phím số, giải thích cách tính từng câu và chế độ Tính nhanh 60 giây ghi kỷ lục. Xem thêm <a href="/bang-cuu-chuong">Bảng cửu chương</a> và <a href="/toan-tu-duy">Toán tư duy</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Toán',
    title: 'Mẹo học thuộc bảng cửu chương nhanh cho bé',
    slug: 'meo-hoc-thuoc-bang-cuu-chuong-nhanh',
    excerpt: 'Cách giúp bé học thuộc bảng cửu chương (bảng nhân 2–9) nhanh và nhớ lâu: quy luật, mẹo nhân 9, nhân 5, và trò chơi đố nhân miễn phí.',
    tags: ['bảng cửu chương', 'bảng nhân', 'học thuộc bảng cửu chương', 'toán lớp 2'],
    content: [
      `<p>Bảng cửu chương là nền tảng của phép nhân và phép chia. Học thuộc bảng nhân giúp bé làm Toán nhanh hơn suốt bậc tiểu học. Dưới đây là vài mẹo giúp bé nhớ lâu mà không nhàm chán.</p>`,
      `<h2>Mẹo học thuộc nhanh</h2>`,
      ul([
        '<strong>Học theo thứ tự</strong> từ bảng 2, rồi 5, 10 (dễ nhất) trước, sau đó đến 3, 4, 6, 7, 8, 9.',
        '<strong>Nhận ra quy luật:</strong> bảng 9 có tổng hai chữ số luôn bằng 9 (9, 18, 27, 36…).',
        '<strong>Mẹo nhân 9:</strong> 9 × n = 10 × n − n (9 × 6 = 60 − 6 = 54).',
        '<strong>Mẹo nhân 5:</strong> kết quả luôn tận cùng bằng 0 hoặc 5.',
        '<strong>Đọc to và đọc đều mỗi ngày</strong>, kết hợp trò chơi đố để nhớ lâu.',
      ]),
      `<h2>Học và chơi ngay</h2>`,
      `<p>Bé có thể xem <a href="/bang-cuu-chuong">bảng cửu chương từ 2 đến 9</a> (in được) kèm trò chơi: chế độ Học bấm nghe đọc và chế độ Đố nhân trắc nghiệm có chấm điểm. Kết hợp <a href="/luyen-tinh-nham">luyện tính nhẩm nhanh</a> để thành thạo phép nhân, chia.</p>`,
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
    console.log(`\n✅ Đã seed ${n} bài viết công cụ mới (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => { console.error('❌', e.message); process.exit(1); });
