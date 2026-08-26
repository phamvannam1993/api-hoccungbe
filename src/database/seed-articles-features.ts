/**
 * Seed bài viết RIÊNG cho từng công cụ học (SEO long-tail) vào bảng articles.
 *   npm run seed:articles-features
 * Upsert theo slug. Mỗi bài nội dung riêng + internal link tới trang công cụ.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const AUTHOR = 'Bé Hay Học';

type Art = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string[] };
const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

const ARTICLES: Art[] = [
  // ── TIẾNG VIỆT ──────────────────────────────────────────────
  {
    category: 'Tiếng Việt',
    title: 'Cách phân biệt s/x, ch/tr, l/n, dấu hỏi/ngã cho bé',
    slug: 'cach-phan-biet-chinh-ta-cho-be',
    excerpt: 'Mẹo giúp bé viết đúng chính tả tiếng Việt: phân biệt s/x, ch/tr, l/n, d/gi/r và dấu hỏi/ngã, kèm trò chơi luyện tập miễn phí.',
    tags: ['chính tả', 's x', 'ch tr', 'hỏi ngã', 'tiếng Việt'],
    content: [
      `<p>Lỗi chính tả là điều rất thường gặp ở trẻ tiểu học, nhất là khi phân biệt <strong>s/x, ch/tr, l/n, d/gi/r</strong> và <strong>dấu hỏi/ngã</strong>. Bài viết chia sẻ vài mẹo đơn giản và cách luyện tập giúp bé viết đúng.</p>`,
      `<h2>Vì sao bé hay viết sai?</h2>`,
      `<p>Nhiều cặp âm/dấu trong tiếng Việt phát âm gần giống nhau nên bé dễ nhầm khi viết. Cách tốt nhất là cho bé <strong>tiếp xúc nhiều với mặt chữ đúng</strong> và luyện tập thường xuyên theo từng cặp.</p>`,
      `<h2>Một vài mẹo nhỏ</h2>`,
      ul([
        '<strong>ch/tr:</strong> phần lớn từ chỉ đồ vật trong nhà bắt đầu bằng "ch" (chăn, chén, chổi).',
        '<strong>l/n:</strong> đọc chậm, để ý đầu lưỡi — "l" cong lưỡi lên, "n" để lưỡi thẳng.',
        '<strong>hỏi/ngã:</strong> ghi nhớ theo từng từ quen thuộc (nghỉ ngơi – suy nghĩ, sửa xe – sữa uống).',
        '<strong>s/x:</strong> học theo nhóm từ hay dùng (số, sông, sạch / xanh, xe, xoài).',
      ]),
      `<h2>Luyện tập bằng trò chơi</h2>`,
      `<p>Bé có thể luyện <a href="/chinh-ta-tieng-viet">chính tả phân biệt s/x, ch/tr, l/n, hỏi/ngã</a> qua trò chơi chọn đáp án, chọn đúng là nghe từ đúng và có tiếng khen — học mà vui. Xem thêm <a href="/luyen-tu-va-cau">Luyện từ và câu</a> và <a href="/hoc-doc-tieng-viet">Học đọc tiếng Việt</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Từ chỉ sự vật, hoạt động, đặc điểm là gì? Dạy bé phân biệt',
    slug: 'tu-chi-su-vat-hoat-dong-dac-diem',
    excerpt: 'Giải thích dễ hiểu về từ chỉ sự vật (danh từ), hoạt động (động từ), đặc điểm (tính từ) cho bé lớp 2–3, kèm ví dụ và trò chơi.',
    tags: ['luyện từ và câu', 'từ loại', 'danh từ', 'động từ', 'tính từ'],
    content: [
      `<p>Ở lớp 2–3, bé bắt đầu học phân loại từ. Ba nhóm cơ bản là <strong>từ chỉ sự vật, từ chỉ hoạt động và từ chỉ đặc điểm</strong>. Hiểu rõ ba nhóm này giúp bé đặt câu đúng và viết văn tốt hơn.</p>`,
      `<h2>Từ chỉ sự vật (danh từ)</h2>`,
      `<p>Là từ gọi tên người, con vật, đồ vật, cây cối. Ví dụ: <em>học sinh, con mèo, quyển sách, cây tre</em>.</p>`,
      `<h2>Từ chỉ hoạt động (động từ)</h2>`,
      `<p>Là từ nói về việc làm, động tác. Ví dụ: <em>chạy, hát, đọc, ăn, bơi</em>.</p>`,
      `<h2>Từ chỉ đặc điểm (tính từ)</h2>`,
      `<p>Là từ nói về màu sắc, hình dáng, tính chất. Ví dụ: <em>đỏ, cao, tròn, nhanh, đẹp</em>.</p>`,
      `<h2>Luyện tập</h2>`,
      `<p>Cho bé chơi <a href="/luyen-tu-va-cau">Luyện từ và câu</a> để nhận biết từ loại, dùng đúng dấu câu và tìm từ trái nghĩa. Kết hợp <a href="/tap-doc-tieng-viet">Tập đọc</a> để bé thấy các từ đó trong câu thật.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Rèn kỹ năng đọc hiểu cho bé lớp 1–2 qua bài đọc ngắn',
    slug: 'ren-doc-hieu-cho-be-lop-1-2',
    excerpt: 'Cách rèn đọc hiểu cho bé mới biết đọc: đọc bài ngắn, nghe đọc mẫu và trả lời câu hỏi. Kèm bài tập đọc miễn phí có đọc mẫu.',
    tags: ['tập đọc', 'đọc hiểu', 'tiếng Việt lớp 1', 'lớp 2'],
    content: [
      `<p>Sau khi bé đã đọc trơn được, bước tiếp theo là <strong>đọc hiểu</strong> — hiểu nội dung mình vừa đọc. Đây là kỹ năng quan trọng cho mọi môn học về sau.</p>`,
      `<h2>Làm sao để bé đọc hiểu tốt?</h2>`,
      ul([
        'Bắt đầu bằng <strong>bài đọc ngắn</strong>, câu đơn giản, chủ đề quen thuộc (gia đình, con vật, trường lớp).',
        'Cho bé <strong>nghe đọc mẫu</strong> để đọc đúng nhịp và ngữ điệu.',
        'Sau khi đọc, hỏi bé vài <strong>câu hỏi về nội dung</strong> để kiểm tra hiểu bài.',
        'Khen ngợi và khuyến khích bé kể lại bằng lời của mình.',
      ]),
      `<h2>Luyện tập</h2>`,
      `<p>Bé có thể luyện <a href="/tap-doc-tieng-viet">Tập đọc tiếng Việt</a> với các bài đọc ngắn có nghe đọc mẫu từng câu và câu hỏi đọc hiểu. Trước đó, hãy chắc bé đã vững <a href="/hoc-doc-tieng-viet">đánh vần</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Đồng dao, ca dao hay cho bé (có đọc mẫu và ý nghĩa)',
    slug: 'dong-dao-ca-dao-hay-cho-be',
    excerpt: 'Tuyển tập đồng dao, ca dao dân gian quen thuộc cho bé: Dung dăng dung dẻ, Nu na nu nống, Công cha như núi Thái Sơn… có đọc mẫu và ý nghĩa.',
    tags: ['đồng dao', 'ca dao', 'thơ cho bé', 'dân gian'],
    content: [
      `<p>Đồng dao và ca dao là kho tàng văn hóa dân gian, vừa vui tai vừa dạy bé nhiều điều hay. Đọc đồng dao còn giúp bé <strong>rèn nhịp điệu và phát âm</strong> tự nhiên.</p>`,
      `<h2>Đồng dao cho bé</h2>`,
      `<p>Những bài như <em>Dung dăng dung dẻ, Nu na nu nống, Kéo cưa lừa xẻ, Chi chi chành chành</em> gắn với các trò chơi dân gian, giúp bé vận động và ghi nhớ vần điệu.</p>`,
      `<h2>Ca dao dạy điều hay</h2>`,
      `<p>Ca dao như <em>"Công cha như núi Thái Sơn…"</em> hay <em>"Bầu ơi thương lấy bí cùng…"</em> dạy bé lòng hiếu thảo và tình yêu thương. Ba mẹ nên giảng ý nghĩa để bé hiểu sâu hơn.</p>`,
      `<h2>Nghe và đọc theo</h2>`,
      `<p>Bé có thể nghe đọc mẫu và đọc theo tại <a href="/dong-dao-ca-dao">Đồng dao & ca dao cho bé</a> (có kèm ý nghĩa từng bài ca dao). Xem thêm <a href="/tap-doc-tieng-viet">Tập đọc tiếng Việt</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Việt',
    title: 'Cách giúp bé mở rộng vốn từ tiếng Việt theo chủ đề',
    slug: 'giup-be-mo-rong-von-tu-tieng-viet',
    excerpt: 'Bí quyết giúp bé giàu vốn từ tiếng Việt: học từ theo chủ đề, hiểu nghĩa và đặt câu. Kèm bộ từ ngữ theo chủ đề có ví dụ và phát âm.',
    tags: ['mở rộng vốn từ', 'vốn từ', 'tiếng Việt', 'đặt câu'],
    content: [
      `<p>Vốn từ phong phú giúp bé <strong>diễn đạt rõ ràng, viết văn hay và đọc hiểu tốt</strong>. Học từ theo chủ đề là cách hiệu quả để bé nhớ lâu và dùng đúng.</p>`,
      `<h2>Mẹo giúp bé giàu vốn từ</h2>`,
      ul([
        'Học từ theo <strong>chủ đề</strong> (con vật, nghề nghiệp, thiên nhiên, cảm xúc…) để bé liên hệ dễ nhớ.',
        'Với mỗi từ mới, cho bé biết <strong>nghĩa</strong> và một <strong>câu ví dụ</strong>.',
        'Khuyến khích bé <strong>đặt câu</strong> với từ vừa học.',
        'Đọc sách, đồng dao, ca dao để gặp lại từ trong ngữ cảnh thật.',
      ]),
      `<h2>Luyện tập</h2>`,
      `<p>Bé có thể học tại <a href="/mo-rong-von-tu">Mở rộng vốn từ theo chủ đề</a> — mỗi từ có nghĩa dễ hiểu, câu ví dụ và nút nghe phát âm. Kết hợp <a href="/luyen-tu-va-cau">Luyện từ và câu</a> để dùng từ chính xác hơn.</p>`,
    ].join('\n'),
  },

  // ── TIẾNG ANH ───────────────────────────────────────────────
  {
    category: 'Tiếng Anh',
    title: 'Phonics là gì? Dạy bé đọc tiếng Anh bằng ghép vần',
    slug: 'phonics-la-gi-day-be-doc-tieng-anh',
    excerpt: 'Phonics là gì và vì sao giúp trẻ tự đọc tiếng Anh? Hướng dẫn dạy bé ghép vần đọc từ CVC (cat, dog, sun) kèm công cụ luyện miễn phí.',
    tags: ['phonics', 'ghép vần', 'đọc tiếng Anh', 'CVC'],
    content: [
      `<p><strong>Phonics</strong> là phương pháp dạy đọc bằng cách gắn <strong>chữ với âm</strong>: bé học âm của từng chữ rồi ghép lại thành từ. Đây là cách trẻ em các nước nói tiếng Anh học đọc.</p>`,
      `<h2>Vì sao nên học phonics?</h2>`,
      `<p>Khi nắm được âm của các chữ cái, bé có thể <strong>tự đọc những từ mới</strong> mà không cần học thuộc từng từ. Đây là bước ngoặt giúp bé đọc tiếng Anh độc lập.</p>`,
      `<h2>Bắt đầu với từ CVC</h2>`,
      `<p>Từ CVC (phụ âm – nguyên âm – phụ âm) như <em>cat, dog, sun, hat</em> là dạng đơn giản nhất để tập đọc. Bé đọc từng âm rồi ghép lại: /c/ – /a/ – /t/ → "cat".</p>`,
      `<h2>Luyện tập</h2>`,
      `<p>Cho bé học tại <a href="/phonics-tieng-anh">Phonics – Ghép vần đọc tiếng Anh</a> (âm 26 chữ cái + từ CVC, có nút đọc chậm). Trước đó nên học <a href="/bang-chu-cai-tieng-anh">bảng chữ cái tiếng Anh</a>.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Anh',
    title: 'Sight words là gì? Danh sách từ thông dụng cho bé',
    slug: 'sight-words-la-gi-tu-thong-dung',
    excerpt: 'Sight words (từ thông dụng) là gì và vì sao giúp bé đọc trôi chảy? Danh sách từ theo cấp độ Dolch kèm công cụ luyện nhận mặt nhanh.',
    tags: ['sight words', 'từ thông dụng', 'Dolch', 'đọc tiếng Anh'],
    content: [
      `<p><strong>Sight words</strong> là những từ xuất hiện nhiều nhất trong sách thiếu nhi (the, and, is, you…). Bé cần <strong>nhận mặt nhanh</strong> mà không phải đánh vần để đọc trôi chảy.</p>`,
      `<h2>Vì sao sight words quan trọng?</h2>`,
      `<p>Chỉ khoảng 100 từ thông dụng đã chiếm gần một nửa số từ trong văn bản thiếu nhi. Thuộc nhanh các từ này giúp bé đọc mượt và tự tin hơn.</p>`,
      `<h2>Học theo cấp độ</h2>`,
      `<p>Danh sách Dolch chia sight words theo cấp độ từ dễ đến khó, phù hợp cho bé mới bắt đầu đến lớp 1.</p>`,
      `<h2>Luyện tập</h2>`,
      `<p>Bé có thể học tại <a href="/sight-words-tieng-anh">Sight words – Từ thông dụng tiếng Anh</a> (chia theo cấp độ, có phát âm). Kết hợp <a href="/phonics-tieng-anh">Phonics</a> để đọc được cả từ mới lẫn từ quen.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Anh',
    title: 'Dạy bé bảng chữ cái tiếng Anh A–Z đúng cách',
    slug: 'day-be-bang-chu-cai-tieng-anh',
    excerpt: 'Hướng dẫn dạy bé bảng chữ cái tiếng Anh A–Z: phân biệt tên chữ và âm, học qua từ mẫu và bài hát ABC. Có công cụ phát âm miễn phí.',
    tags: ['bảng chữ cái tiếng Anh', 'ABC', 'tên chữ', 'âm'],
    content: [
      `<p>Bảng chữ cái là bước đầu tiên khi bé học tiếng Anh. Điều quan trọng là giúp bé phân biệt <strong>tên chữ</strong> và <strong>âm</strong> của mỗi chữ.</p>`,
      `<h2>Tên chữ và âm khác nhau thế nào?</h2>`,
      `<p>Ví dụ chữ "B": tên đọc là "bee" nhưng âm khi ghép vần là /b/. Hiểu điều này giúp bé chuyển sang học phonics dễ dàng hơn.</p>`,
      `<h2>Học qua từ mẫu và bài hát</h2>`,
      `<p>Gắn mỗi chữ với một từ quen thuộc (A – apple, B – ball, C – cat) và hát <em>ABC Song</em> giúp bé nhớ lâu, phát âm tự nhiên.</p>`,
      `<h2>Luyện tập</h2>`,
      `<p>Cho bé học tại <a href="/bang-chu-cai-tieng-anh">Bảng chữ cái tiếng Anh A–Z</a> (tên chữ, âm, từ mẫu, hát ABC). Tiếp theo là <a href="/phonics-tieng-anh">Phonics ghép vần</a> để bé tập đọc.</p>`,
    ].join('\n'),
  },
  {
    category: 'Tiếng Anh',
    title: 'Dạy ngữ pháp tiếng Anh cơ bản cho bé qua trò chơi',
    slug: 'day-ngu-phap-tieng-anh-co-ban-cho-be',
    excerpt: 'Dạy bé ngữ pháp tiếng Anh cơ bản: a/an, số nhiều -s, this/that, to be (am/is/are), can/can’t qua trò chơi chọn đáp án vui nhộn.',
    tags: ['ngữ pháp tiếng Anh', 'a an', 'to be', 'this that', 'trẻ em'],
    content: [
      `<p>Ngữ pháp nghe có vẻ khó, nhưng với trẻ nhỏ, chỉ cần dạy vài quy tắc cơ bản qua <strong>trò chơi</strong> là bé đã ghép được câu đúng.</p>`,
      `<h2>Những quy tắc nền tảng</h2>`,
      ul([
        '<strong>a / an:</strong> "an" trước nguyên âm (an apple), "a" trước phụ âm (a dog).',
        '<strong>Số nhiều -s:</strong> nhiều hơn một thì thêm -s (cat → cats).',
        '<strong>this / that:</strong> "this" cho vật ở gần, "that" cho vật ở xa.',
        '<strong>to be:</strong> I am, he/she/it is, you/we/they are.',
        '<strong>can / can’t:</strong> nói về việc làm được hay không.',
      ]),
      `<h2>Học qua trò chơi</h2>`,
      `<p>Bé có thể luyện tại <a href="/ngu-phap-tieng-anh">Ngữ pháp tiếng Anh qua trò chơi</a> — mỗi câu có quy tắc, ví dụ nghe được và giải thích. Kết hợp <a href="/mau-cau-tieng-anh">Mẫu câu giao tiếp</a> để dùng ngữ pháp trong câu thật.</p>`,
    ].join('\n'),
  },
];

async function main() {
  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    let n = 0;
    for (const a of ARTICLES) {
      await conn.query(
        `INSERT INTO articles (title, slug, excerpt, content, category, tags, isPublished, publishedAt, authorName, viewCount, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, CAST(? AS JSON), 1, NOW(), ?, 0, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
           title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content),
           category=VALUES(category), tags=VALUES(tags), isPublished=1,
           authorName=VALUES(authorName), updatedAt=NOW()`,
        [a.title, a.slug, a.excerpt, a.content, a.category, JSON.stringify(a.tags), AUTHOR],
      );
      console.log(`  ✓ [${a.category}] ${a.slug}`);
      n++;
    }
    console.log(`\n✅ Đã seed ${n} bài viết theo từng công cụ (published).`);
  } finally {
    await conn.end();
  }
}
main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
