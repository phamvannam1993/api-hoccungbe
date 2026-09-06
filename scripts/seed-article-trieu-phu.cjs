/**
 * Đăng bài giới thiệu game "Ai Là Triệu Phú Nhí".
 *   node scripts/seed-article-trieu-phu.cjs           # xem trước
 *   node scripts/seed-article-trieu-phu.cjs --apply   # ghi vào DB
 *
 * Upsert theo `slug` nên chạy lại chỉ cập nhật, không tạo bài trùng.
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

const SLUG = 'ai-la-trieu-phu-nhi-game-do-vui-kien-thuc-cho-be';
const TITLE = 'Ai Là Triệu Phú Nhí: game đố vui giúp bé ôn kiến thức mà không thấy chán';
const EXCERPT =
  'Sân chơi kiến thức 15 mốc thưởng dành cho học sinh lớp 1–5: câu hỏi bám chương trình từng lớp và khó tăng dần, có trợ giúp, có mốc an toàn, sai câu nào được giải thích cách làm ngay. Chơi xong bé biết mình đang yếu mảng nào.';

const CONTENT = `
<p>Con làm bài tập thì uể oải nhưng chơi game thì tập trung hàng giờ — chuyện này ba mẹ nào cũng gặp. Bé Hay Học vừa ra mắt <a href="/trieu-phu-nhi"><strong>Ai Là Triệu Phú Nhí</strong></a>, mượn đúng luật chơi quen thuộc của chương trình truyền hình để bé ôn lại kiến thức đã học mà vẫn thấy hồi hộp như đang thi thật.</p>

<h2>Không phải đố vui ngẫu nhiên — câu hỏi bám đúng chương trình của con</h2>
<p>Điều khác biệt lớn nhất so với các game đố vui thông thường: mỗi câu hỏi ở đây đều thuộc một <strong>kỹ năng cụ thể trong chương trình tiểu học</strong> — phép chia, toán có lời văn, chính tả, luyện từ và câu, đọc hiểu… Bé chọn lớp nào thì nhận câu của đúng lớp đó, từ lớp 1 đến lớp 5.</p>
<p>Kho câu hỏi dùng chung với phần <a href="/ky-nang"><strong>Học theo kỹ năng</strong></a> của Bé Hay Học, nên mỗi câu đều có lời giải thích <em>cách làm</em> chứ không chỉ nêu đáp án.</p>

<h2>Độ khó tăng dần qua 15 mốc, không nhảy cóc</h2>
<p>Mỗi câu hỏi được chấm một bậc khó từ 1 đến 15, dựa trên dạng bài chứ không chỉ dựa vào con số to hay nhỏ: một bài "tìm x" hay bài giải hai bước được xếp nặng hơn một phép cộng đơn giản, dù các con số có nhỏ hơn.</p>
<p>Nhờ vậy bé leo thang từ câu dễ đến câu khó một cách mượt mà — câu 1 luôn nhẹ nhàng để bé tự tin, câu 15 mới thật sự là thử thách.</p>
<p>Thang thưởng cũng có <strong>hai mốc an toàn</strong> ở câu 5 và câu 10, giống chương trình gốc. Vượt qua rồi thì dù có trả lời sai ở phía trên, bé vẫn giữ được số tiền của mốc đã qua. Điều này quan trọng với trẻ nhỏ: sai một câu không mất trắng, nên bé dám nghĩ và dám chọn.</p>

<h2>Ba chế độ cho ba tâm trạng khác nhau</h2>
<ul>
  <li><strong>Chinh phục triệu phú</strong> — 15 câu leo thang kinh điển, có đủ mốc an toàn và quyền dừng cuộc chơi.</li>
  <li><strong>Thử thách 60 giây</strong> — trả lời càng nhiều càng tốt trong một phút, hợp lúc bé chỉ có ít thời gian.</li>
  <li><strong>Thử thách Boss</strong> — 10 câu khó liên tiếp, dành cho bé đã vững và muốn thử sức.</li>
</ul>

<h2>Ba quyền trợ giúp, đúng như trên truyền hình</h2>
<p>Bé có thể dùng <strong>Gợi ý</strong> để loại bớt hai đáp án sai, <strong>Hỏi bạn</strong> để xem ý kiến các bạn theo phần trăm, hoặc <strong>Đổi câu hỏi</strong> sang một câu khác cùng độ khó. Mỗi quyền tốn một ít xu mà bé kiếm được khi chơi.</p>
<p>Một chi tiết nhỏ nhưng cố ý: phần "Hỏi bạn" <em>không phải lúc nào cũng đúng</em>. Câu càng khó thì các bạn càng ít chắc chắn — bé vẫn phải tự cân nhắc chứ không nhắm mắt nghe theo.</p>

<h2>Bé chưa đọc trôi vẫn chơi được</h2>
<p>Người dẫn sẽ <strong>đọc to đề bài và lần lượt cả bốn đáp án</strong>, nên các bé lớp 1, lớp 2 chưa đọc trôi vẫn theo kịp. Với câu chính tả, con chữ được đọc theo âm đúng cách dạy ở tiểu học — "s" đọc là "sờ", "ng" đọc là "ngờ" — chứ không đọc tên chữ.</p>
<p>Sau khi bé chọn đáp án, game hỏi lại <em>"Đây là câu trả lời cuối cùng chứ?"</em> rồi mới công bố — đúng nhịp hồi hộp của chương trình thật, kèm nhạc nền và tiếng vỗ tay khi trả lời đúng.</p>

<h2>Chơi xong biết con đang yếu ở đâu</h2>
<p>Đây là phần ba mẹ nên xem. Kết thúc mỗi ván, game hiện <strong>bảng phân tích năng lực theo từng kỹ năng</strong>: bé làm đúng bao nhiêu phần trăm ở phép chia, ở toán có lời văn, ở luyện từ và câu…</p>
<p>Kỹ năng nào còn yếu sẽ được gợi ý luyện thêm, kèm đường dẫn sang đúng phần luyện tập của kỹ năng đó. Một ván chơi 10 phút vì thế vừa là giải trí, vừa là một bài kiểm tra nhanh cho ba mẹ biết nên kèm con chỗ nào.</p>

<h2>Có bảng xếp hạng để bé muốn quay lại</h2>
<p>Điểm mỗi ván được ghi lên <strong>bảng xếp hạng theo tuần và theo tháng, tách riêng từng lớp</strong> cho công bằng. Bé lớp 2 không phải đọ điểm với bé lớp 5.</p>

<h2>Chơi ngay, không cần đăng nhập</h2>
<p>Game miễn phí và chơi được ngay trên điện thoại hay máy tính bảng, không bắt tạo tài khoản. Nếu ba mẹ đã tạo hồ sơ cho bé thì kết quả sẽ được lưu lại để theo dõi tiến bộ.</p>
<p><a href="/trieu-phu-nhi"><strong>👉 Chơi Ai Là Triệu Phú Nhí ngay</strong></a></p>
<p>Bé thích thi đấu có thể thử thêm <a href="/thi-tai">Thi Tài</a> — sân thi đấu tính giờ có huy chương, hoặc <a href="/ky-nang">Học theo kỹ năng</a> để luyện đúng phần còn yếu.</p>
`.trim();

const TAGS = [
  'ai là triệu phú nhí', 'game đố vui cho bé', 'trò chơi kiến thức',
  'ôn tập tiểu học', 'game học tập', 'bé hay học',
];

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log(`Tiêu đề : ${TITLE}`);
  console.log(`Slug    : ${SLUG}`);
  console.log(`Độ dài  : ${CONTENT.length} ký tự (bài Thi Tài cùng loại: 3.656)`);
  console.log(`Thẻ     : ${TAGS.join(', ')}`);

  if (!APPLY) {
    console.log('\nXem trước. Chạy lại với --apply để đăng.');
    await db.end();
    return;
  }

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
