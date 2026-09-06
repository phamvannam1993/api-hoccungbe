/**
 * Đăng bài giới thiệu "Vòng tròn âm vần".
 *   node scripts/seed-article-vong-tron-am.cjs           # xem trước
 *   node scripts/seed-article-vong-tron-am.cjs --apply   # ghi vào DB
 *
 * Upsert theo `slug` nên chạy lại chỉ cập nhật, không tạo bài trùng.
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

const SLUG = 'vong-tron-am-van-hoc-danh-van-tieng-viet-lop-1';
const TITLE = 'Vòng tròn âm vần: cách cho bé lớp 1 tập đánh vần mà không cần ba mẹ ngồi kèm';
const EXCERPT =
  'Mỗi âm một vòng tròn 10 từ quen thuộc, bấm vào là nghe đọc và xem đánh vần từng bước đúng cách dạy ở trường: bờ – ong – bong – sắc – bóng. Đủ 29 chữ cái và 39 vòng âm vần, kèm bảng chữ cái đọc theo âm chứ không đọc tên chữ.';

const CONTENT = `
<p>Dạy con đánh vần là lúc nhiều ba mẹ lúng túng nhất. Không phải vì khó, mà vì <strong>cách mình được học ngày xưa đã khác cách nhà trường dạy bây giờ</strong> — ba mẹ đọc "bê", cô giáo dạy "bờ", con về nhà lẫn lộn cả hai. Bé Hay Học vừa ra mắt <a href="/vong-tron-am"><strong>Vòng tròn âm vần</strong></a> để giải đúng chỗ vướng đó: bé bấm vào từ nào là nghe đánh vần từng bước, đúng một kiểu, không phụ thuộc ba mẹ nhớ hay quên.</p>

<h2>Mỗi âm một vòng tròn, mỗi vòng 10 từ bé nhìn là biết</h2>
<p>Màn hình chính là một bánh xe chia múi, mỗi múi một từ kèm hình minh hoạ. Chọn âm <strong>b</strong> thì có bò, bé, bàn, bút, bánh, bóng, biển, bướm, bắp, bà. Bé bấm vào múi nào, bánh xe quay múi đó lên đỉnh và mở thẻ từ.</p>
<p>Toàn bộ có <strong>39 vòng với 388 từ</strong>, chia hai nhóm:</p>
<ul>
  <li><strong>27 âm đầu</strong> — gồm cả các chữ ghép ch, gh, gi, kh, ng, ngh, nh, ph, qu, th, tr. Từ trong vòng đều <em>bắt đầu</em> bằng âm đó.</li>
  <li><strong>12 nguyên âm</strong> — a, ă, â, e, ê, i, o, ô, ơ, u, ư, y. Ở đây từ <em>chứa</em> nguyên âm đó chứ không mở đầu bằng nó, vì tiếng Việt gần như không có từ nào bắt đầu bằng "ă" hay "â" — mà đó lại đúng là lúc bé gặp chúng khi ghép vần: ch‑ăn‑chăn.</li>
</ul>

<h2>Đánh vần từng bước, chữ nào đang đọc thì sáng lên</h2>
<p>Đây là phần quan trọng nhất. Bấm nút <em>Đánh vần</em>, bé nghe lần lượt từng bước và <strong>chữ đang được đọc sẽ sáng lên</strong> để mắt bám theo tai:</p>
<p style="text-align:center"><strong>bờ – ong – bong – sắc – bóng</strong></p>
<p>Các bước này <strong>không gõ tay từng từ</strong> mà được máy tách ra theo luật, nên gần 400 từ luôn nhất quán một kiểu — không có chuyện từ này dạy một đằng, từ kia dạy một nẻo.</p>

<h2>Ba chỗ dễ dạy sai, đã xử lý riêng</h2>

<h3>1. Đọc âm, không đọc tên chữ</h3>
<p>Khi đánh vần, chữ <strong>b</strong> phải đọc là "bờ" chứ không phải "bê"; <strong>c</strong> và <strong>k</strong> đều đọc "cờ" dù tên chữ là "xê" và "ca". Đây là chỗ máy đọc tự động hay sai nhất, và cũng là chỗ ba mẹ hay dạy lệch với cô giáo.</p>

<h3>2. Tiếng đóng không có bước "chưa dấu"</h3>
<p>Tiếng kết thúc bằng <strong>p, t, c, ch</strong> chỉ mang được thanh sắc hoặc thanh nặng. Nghĩa là "băp", "but", "hoc" là những tiếng <strong>không tồn tại</strong> trong tiếng Việt. Vì vậy những từ này đánh vần rút gọn một bước:</p>
<p style="text-align:center"><strong>bờ – ăp – sắc – bắp</strong> &nbsp;&nbsp;·&nbsp;&nbsp; <strong>cờ – ôt – nặng – cột</strong></p>
<p>Còn tiếng mở thì giữ đủ năm bước, vì "bong" là tiếng đọc được bình thường.</p>

<h3>3. Tiếng không có âm đầu vẫn ghép được</h3>
<p>Những tiếng như "ăn", "ong", "em" không có âm đầu để đọc, nhưng vẫn tách ra được thành âm chính và âm cuối: <strong>ă – nờ – ăn</strong>, <strong>o – ngờ – ong</strong>. Nếu chỉ đọc trọn tiếng một lần thì bé không thấy tiếng được ghép từ đâu — mà đó chính là điều đang dạy.</p>

<h2>Kèm bảng 29 chữ cái, phân biệt rõ tên chữ và âm</h2>
<p>Dưới vòng tròn là <strong>bảng chữ cái tiếng Việt đầy đủ 29 chữ</strong>. Mỗi chữ bấm một lần là nghe <em>âm</em> trước rồi tới <em>tên chữ</em> — vì bé cần cả hai nhưng dùng vào việc khác nhau: âm để ghép tiếng, tên chữ để đọc bảng chữ cái. Nguyên âm tô hồng, phụ âm tô xanh, bấm chữ nào thì vòng tròn ở trên đổi sang chữ đó luôn.</p>
<p>Ba mẹ hay thắc mắc vì sao <strong>29 chữ cái mà chỉ có 27 âm đầu</strong>. Lý do: bảng chữ cái đếm cả nguyên âm (a, ă, â, e, ê…), còn âm đầu thì tính thêm các chữ ghép (ch, gh, gi, kh, ng, ngh, nh, ph, qu, th, tr) và không tính riêng chữ <strong>q</strong>, vì trong tiếng Việt "q" luôn đi liền với "u". Hai con số khác nhau vì đếm hai thứ khác nhau.</p>

<h2>Kiểu chữ đúng dạng bé tập viết</h2>
<p>Trang dùng bộ chữ dành riêng cho người mới học đọc: chữ <strong>a, ă, â</strong> một tầng và chữ <strong>g</strong> một tầng — đúng dạng bé được dạy viết ở lớp 1, thay vì kiểu chữ in hai tầng mà bé chưa gặp bao giờ.</p>

<h2>Bé tự học được, ba mẹ không phải ngồi cạnh</h2>
<p>Mọi thứ trên trang đều bấm là nghe: nghe âm đang học, nghe cả từ, nghe đánh vần từng bước, nghe câu ví dụ. Bé chưa biết đọc vẫn dùng được một mình.</p>
<p>Từ nào bé đã nghe đánh vần xong sẽ được <strong>đánh dấu đã học</strong>, có thanh tiến độ cho từng vòng và ngôi sao khi hoàn thành đủ 10 từ. Tiến độ lưu ngay trên máy, không cần đăng nhập.</p>

<h2>Học tiếp gì sau vòng tròn âm vần</h2>
<p>Vòng tròn âm vần lo phần nhận mặt chữ và ghép tiếng. Khi bé đã đánh vần trôi, ba mẹ cho con sang <a href="/hoc-doc-tieng-viet">Học đọc tiếng Việt</a> để ghép thành câu, hoặc <a href="/truyen-co-tich">Truyện cổ tích</a> có chế độ đọc theo tô sáng từng chữ.</p>
<p><a href="/vong-tron-am"><strong>👉 Vào Vòng tròn âm vần</strong></a></p>
`.trim();

const TAGS = [
  'vòng tròn âm vần', 'đánh vần tiếng Việt', 'học đánh vần lớp 1',
  'bảng chữ cái tiếng Việt', 'bé tập đọc', 'âm vần lớp 1', 'bé hay học',
];

(async () => {
  console.log(`Tiêu đề : ${TITLE}`);
  console.log(`Slug    : ${SLUG}`);
  console.log(`Độ dài  : ${CONTENT.length} ký tự`);
  console.log(`Thẻ     : ${TAGS.join(', ')}`);

  // Nối DB SAU phần xem trước: soát lại nội dung thì không cần chạm tới database,
  // và không bị treo khi máy đang không vào được RDS.
  if (!APPLY) {
    console.log('\nXem trước. Chạy lại với --apply để đăng.');
    return;
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await db.query(
    `INSERT INTO articles (title, slug, excerpt, content, category, tags, isPublished, publishedAt, authorName, viewCount, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,1,NOW(),?,0,NOW(),NOW())
     ON DUPLICATE KEY UPDATE
       title=VALUES(title), excerpt=VALUES(excerpt), content=VALUES(content),
       category=VALUES(category), tags=VALUES(tags), isPublished=1, updatedAt=NOW()`,
    [TITLE, SLUG, EXCERPT, CONTENT, 'Tính năng mới', JSON.stringify(TAGS), 'Bé Hay Học'],
  );
  console.log(`\n✓ Đã đăng: /bai-viet/${SLUG}`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
