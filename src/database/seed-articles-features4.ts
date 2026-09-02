/**
 * Seed bài viết SEO cho tính năng MỚI: Game học tiếng Anh kiểu Duolingo (/hoc-tieng-anh)
 * và hướng dẫn cài Bé Hay Học lên điện thoại (PWA).
 *   npm run seed:articles-features4
 * Upsert theo slug. Nội dung riêng + internal link tới trang tính năng.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };

const ARTICLES: Art[] = [
  {
    category: 'Học vui',
    title: 'Game học tiếng Anh mới trên Bé Hay Học: học như chơi Duolingo',
    slug: 'game-hoc-tieng-anh-kieu-duolingo',
    excerpt:
      'Lộ trình học tiếng Anh qua bản đồ từng chặng, 6 dạng bài xen kẽ, hình minh hoạ và phát âm chuẩn, nhân vật đáng yêu biết nháy mắt và đọc theo — bé học từ vựng như đang chơi game.',
    tags: ['học tiếng anh cho bé', 'game tiếng anh', 'từ vựng tiếng anh', 'duolingo cho trẻ em', 'bé hay học'],
    content: [
      `<p>Học từ vựng tiếng Anh sẽ nhẹ nhàng hơn nhiều khi biến thành một trò chơi. Bé Hay Học vừa ra mắt <a href="/hoc-tieng-anh"><strong>Game học tiếng Anh</strong></a> theo phong cách Duolingo: bé đi qua một <strong>bản đồ các chặng</strong>, mỗi chặng là một bài học ngắn với nhiều dạng câu hỏi vui, hình ảnh sinh động và giọng đọc chuẩn.</p>`,

      `<h2>Bản đồ học theo từng chặng</h2>`,
      `<p>Bé chọn một <strong>chủ đề</strong> yêu thích (động vật, trái cây, gia đình, màu sắc, cơ thể…), rồi bước vào <strong>bản đồ các chặng</strong> cuộn dọc như trong game. Mỗi chặng học xong sẽ <strong>mở khoá chặng tiếp theo</strong> và nhận <strong>vương miện 👑</strong>. Cách này giúp bé có mục tiêu rõ ràng và cảm giác "tiến lên" sau mỗi bài.</p>`,

      `<h2>6 dạng bài xen kẽ, không nhàm chán</h2>`,
      ul([
        '<strong>Chọn nghĩa đúng</strong>: nghe/đọc từ tiếng Anh rồi chọn nghĩa tiếng Việt.',
        '<strong>Chọn từ tiếng Anh</strong>: nhìn nghĩa tiếng Việt, chọn đúng từ.',
        '<strong>"Đâu là…?"</strong>: chọn đúng bức tranh theo yêu cầu.',
        '<strong>Nghe chọn tranh</strong>: nghe phát âm rồi chọn hình đúng.',
        '<strong>Dịch câu</strong>: xếp các thẻ chữ thành câu hoàn chỉnh.',
        '<strong>Ghép cặp</strong>: nối từ tiếng Anh với nghĩa của nó.',
      ]),

      `<h2>Hình minh hoạ thật và phát âm chuẩn</h2>`,
      `<p>Nhiều từ có <strong>hình ảnh minh hoạ</strong> để bé nhớ bằng hình, kèm <strong>giọng đọc tiếng Anh chuẩn</strong>. Câu hỏi còn được <strong>đọc bằng tiếng Việt</strong> nên bé chưa biết đọc vẫn chơi được. Kho từ vựng rất phong phú với hàng chục chủ đề quen thuộc, giúp bé mở rộng vốn từ mỗi ngày. Xem thêm tại <a href="/tu-vung-tieng-anh">Từ vựng tiếng Anh theo chủ đề</a>.</p>`,

      `<h2>Nhân vật đáng yêu, biết biểu cảm</h2>`,
      `<p>Đồng hành cùng bé là những nhân vật ngộ nghĩnh biết <strong>nháy mắt</strong>, <strong>mấp môi khi đọc</strong> (đọc tới đâu tô sáng chữ tới đó), <strong>reo vui khi trả lời đúng</strong> và <strong>xịu mặt khi sai</strong> — khiến mỗi câu hỏi trở nên sống động và gần gũi.</p>`,

      `<h2>Trái tim, vương miện và sao thưởng</h2>`,
      `<p>Mỗi bài bé có <strong>5 trái tim ❤️</strong>: trả lời sai bị trừ một tim, hết tim thì chơi lại — nhờ vậy bé tập trung và cẩn thận hơn. Hoàn thành chặng, bé nhận <strong>vương miện 👑</strong> và <strong>sao ⭐</strong> để mang về <a href="/bo-suu-tap">Bộ sưu tập</a> đổi thú cưng, nhãn dán, khung avatar.</p>`,

      `<h2>Phù hợp với bé nào?</h2>`,
      `<p>Game hợp với trẻ mầm non và tiểu học mới bắt đầu làm quen tiếng Anh. Bé chưa biết đọc vẫn chơi được nhờ hình ảnh và giọng đọc; bé lớn hơn thì luyện thêm nghe và ghép câu. Mỗi ngày chỉ vài phút, học đều đặn là nhớ lâu.</p>`,

      `<p>Cho bé bắt đầu ngay tại <a href="/hoc-tieng-anh">Game học tiếng Anh</a>, và khám phá thêm <a href="/hoc-hom-nay">lộ trình Học hôm nay</a> để không bỏ lỡ bài nào.</p>`,
    ].join('\n'),
  },
  {
    category: 'Phụ huynh',
    title: 'Cài Bé Hay Học lên điện thoại: mở nhanh như app, học cả khi mất mạng',
    slug: 'cai-be-hay-hoc-len-dien-thoai',
    excerpt:
      'Chỉ vài giây để đưa Bé Hay Học ra màn hình chính điện thoại — mở nhanh như một ứng dụng, chạy toàn màn hình và dùng được cả khi mạng yếu. Hướng dẫn cho cả Android và iPhone.',
    tags: ['cài app bé hay học', 'thêm vào màn hình chính', 'pwa', 'học offline', 'ứng dụng học cho bé'],
    content: [
      `<p>Bé Hay Học có thể "cài" lên điện thoại như một ứng dụng thật mà <strong>không cần tải từ chợ ứng dụng</strong>. Sau khi cài, bé mở học chỉ bằng một chạm, chạy <strong>toàn màn hình</strong> (không còn thanh trình duyệt) và vẫn dùng được nhiều phần <strong>khi mạng yếu</strong>.</p>`,

      `<h2>Vì sao nên đưa ra màn hình chính?</h2>`,
      ul([
        'Mở nhanh bằng một chạm, không phải gõ địa chỉ web.',
        'Giao diện <strong>toàn màn hình</strong>, gọn gàng như app — bé đỡ bấm nhầm.',
        'Tải nhanh hơn nhờ lưu sẵn, dùng được cả khi mạng chập chờn.',
        'Hoàn toàn miễn phí, không chiếm nhiều bộ nhớ.',
      ]),

      `<h2>Trên điện thoại Android</h2>`,
      `<p>Mở <a href="/">behayhoc.com</a> bằng trình duyệt <strong>Chrome</strong>. Khi có bảng nhỏ hiện lên ở dưới, bấm <strong>"Cài ngay"</strong>. Nếu không thấy, bấm nút menu ⋮ góc trên rồi chọn <strong>"Cài đặt ứng dụng"</strong> (hoặc "Thêm vào màn hình chính").</p>`,

      `<h2>Trên iPhone / iPad</h2>`,
      `<p>Apple chỉ cho phép cài qua <strong>Safari</strong> (không phải trong Chrome hay trong ứng dụng khác). Các bước:</p>`,
      ul([
        'Mở <a href="/">behayhoc.com</a> bằng <strong>Safari</strong>.',
        'Bấm <strong>nút Chia sẻ</strong> (biểu tượng ô vuông có mũi tên đi lên) trên thanh Safari.',
        'Kéo xuống chọn <strong>"Thêm vào MH chính"</strong> rồi bấm "Thêm".',
      ]),
      `<p><strong>Lưu ý quan trọng:</strong> nếu bạn mở behayhoc.com từ <strong>link trong Facebook, Zalo hay Messenger</strong>, đó là "trình duyệt trong ứng dụng" và <strong>sẽ không có nút Chia sẻ của Safari</strong>. Hãy bấm dấu <strong>•••</strong> rồi chọn <strong>"Mở trong Safari"</strong> trước, sau đó cài như trên.</p>`,

      `<h2>Bắt đầu thôi</h2>`,
      `<p>Đưa Bé Hay Học ra màn hình chính, rồi cùng bé vào <a href="/hoc-tieng-anh">Game học tiếng Anh</a> hay <a href="/hoc-hom-nay">Học hôm nay</a> để bắt đầu thói quen học mỗi ngày.</p>`,
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
