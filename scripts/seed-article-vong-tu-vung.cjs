/**
 * Đăng bài giới thiệu "Vòng tròn từ vựng tiếng Anh".
 *   node scripts/seed-article-vong-tu-vung.cjs           # xem trước
 *   node scripts/seed-article-vong-tu-vung.cjs --apply   # ghi vào DB
 *
 * Upsert theo `slug` nên chạy lại chỉ cập nhật, không tạo bài trùng.
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

const SLUG = 'vong-tron-tu-vung-tieng-anh-hoc-theo-lop-va-chu-de';
const TITLE = 'Vòng tròn từ vựng tiếng Anh: bé học theo lớp và theo chủ đề, nghe cả Anh lẫn Việt';
const EXCERPT =
  'Bánh xe 48 chủ đề từ vựng tiếng Anh tiểu học, chia sẵn cho lớp 1 đến lớp 5. Bé bấm vào từ là nghe phát âm chuẩn rồi nghe luôn nghĩa tiếng Việt, kèm phiên âm và câu ví dụ. Miễn phí, không cần đăng nhập.';

const CONTENT = `
<p>Bé học từ vựng tiếng Anh hay gặp đúng một cảnh: nhìn danh sách dài dằng dặc, đọc được vài từ rồi chán. Vấn đề không nằm ở lượng từ mà ở <strong>cách bày ra</strong>. Bé Hay Học vừa ra mắt <a href="/vong-tu-vung"><strong>Vòng tròn từ vựng tiếng Anh</strong></a> — mỗi lần chỉ mười từ, xếp thành một bánh xe, bé bấm ô nào là nghe ô đó.</p>

<h2>Chia sẵn theo lớp, ba mẹ không phải chọn hộ</h2>
<p>48 chủ đề được xếp vào <strong>lớp 1 đến lớp 5</strong>, bám mạch chủ điểm của chương trình tiếng Anh tiểu học:</p>
<ul>
  <li><strong>Lớp 1</strong> — chào hỏi, màu sắc, con số, gia đình, đồ dùng học tập, bộ phận cơ thể, đồ chơi, con vật, trái cây, đồ ăn.</li>
  <li><strong>Lớp 2</strong> — phòng trong nhà, đồ vật trong nhà, quần áo, thời tiết, rau củ, đồ uống, hình khối, côn trùng, các loài chim, ngày tháng.</li>
  <li><strong>Lớp 3</strong> — thể thao, sở thích, cảm xúc, thiên nhiên, các loài hoa, động vật biển, nông trại, đồ bếp, đồ phòng tắm, số thứ tự.</li>
  <li><strong>Lớp 4</strong> — nghề nghiệp, 12 tháng, bốn mùa, địa điểm, phương tiện, nhạc cụ, lễ hội, động từ, tính từ, giới từ chỉ vị trí.</li>
  <li><strong>Lớp 5</strong> — thói quen hằng ngày, quốc gia, đồ điện tử, vũ trụ, đại từ và từ để hỏi, dụng cụ, gia vị, phụ kiện.</li>
</ul>
<p>Bé mở đúng lớp của mình là thấy ngay phần cần học, không phải bơi giữa 48 chủ đề.</p>

<h2>Mỗi vòng đúng mười từ</h2>
<p>Chủ đề nhiều từ được cắt thành nhiều phần, mỗi phần mười từ. Con số này cố ý: mười từ vừa đủ một lượt học ngắn, và vừa đủ hiện rõ trên một màn hình điện thoại mà không phải cuộn.</p>
<p>Trong mỗi chủ đề, từ quen thuộc xếp trước, từ hiếm gặp xếp sau. Bé cứ chơi từ phần 1 là gặp đúng những từ cần biết trước — <em>dog, cat, rabbit</em> chứ không phải <em>pterodactyl</em>.</p>

<h2>Nghe tiếng Anh xong nghe luôn nghĩa tiếng Việt</h2>
<p>Đây là điểm khác biệt lớn nhất so với các bảng từ vựng thông thường. Bé bấm vào một ô, hệ thống <strong>đọc từ tiếng Anh bằng giọng bản ngữ, rồi đọc tiếp nghĩa tiếng Việt</strong>. Bé chưa đọc được chữ vẫn hiểu từ vừa nghe là gì, không phải đoán qua hình.</p>
<p>Mở thẻ từ ra còn có thêm:</p>
<ul>
  <li><strong>Phiên âm quốc tế (IPA)</strong> — để ba mẹ đọc mẫu cho đúng.</li>
  <li><strong>Nút đọc chậm 🐢</strong> — kéo giãn từng âm để bé bắt chước theo. Từ mới nghe một lần thường không nhớ được cách phát âm; nghe chậm mới tách được các âm ra.</li>
  <li><strong>Câu ví dụ có nút nghe riêng</strong>, đọc cả câu tiếng Anh rồi câu dịch. Nghe từ nằm trong câu mới nhớ được cách dùng, chứ nghe từ đơn thì chỉ nhớ mặt chữ.</li>
</ul>

<h2>Có hình thật, không chỉ có biểu tượng</h2>
<p>Từ nào đã có ảnh minh hoạ thì hiện ảnh ngay trong múi bánh xe và trong thẻ từ; từ chưa có ảnh thì dùng biểu tượng. Nhờ vậy bé nhìn hình đoán nghĩa được trước khi nghe — cách nhớ từ tự nhiên nhất với trẻ nhỏ.</p>

<h2>Bấm là nghe, bé tự học được một mình</h2>
<p>Mọi thứ trên trang đều bấm là phát tiếng. Bé chưa biết đọc vẫn dùng được, ba mẹ không phải ngồi cạnh phiên dịch từng từ.</p>
<p>Từ nào bé bấm <strong>"✓ Thuộc"</strong> sẽ được đánh dấu, có thanh tiến độ cho từng vòng. Tiến độ lưu ngay trên máy, <strong>không cần tạo tài khoản</strong>.</p>

<h2>Học tiếp gì sau vòng tròn từ vựng</h2>
<p>Vòng tròn từ vựng lo phần nhận mặt từ và phát âm. Khi bé đã thuộc kha khá, ba mẹ cho con sang <a href="/hoc-tieng-anh">Game học tiếng Anh</a> để luyện theo chặng như Duolingo, hoặc <a href="/tinh-huong-tieng-anh">160 tình huống tiếng Anh</a> để nghe những câu ba mẹ nói với con hằng ngày.</p>
<p>Bé đang học tiếng Việt song song thì có <a href="/vong-tron-am">Vòng tròn âm vần</a> — cùng lối chơi bánh xe, nhưng dạy đánh vần tiếng Việt.</p>
<p><a href="/vong-tu-vung"><strong>👉 Vào Vòng tròn từ vựng tiếng Anh</strong></a></p>
`.trim();

const TAGS = [
  'từ vựng tiếng Anh cho bé', 'học tiếng Anh tiểu học', 'vòng tròn từ vựng',
  'từ vựng theo chủ đề', 'phát âm tiếng Anh cho trẻ', 'tiếng Anh lớp 1', 'bé hay học',
];

(async () => {
  console.log(`Tiêu đề : ${TITLE}`);
  console.log(`Slug    : ${SLUG}`);
  console.log(`Độ dài  : ${CONTENT.length} ký tự`);
  console.log(`Thẻ     : ${TAGS.join(', ')}`);

  // Nối DB SAU phần xem trước: soát nội dung thì không cần chạm database.
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
