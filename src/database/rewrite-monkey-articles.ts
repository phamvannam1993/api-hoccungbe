import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql', host: process.env.DB_HOST, port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  entities: [], synchronize: false,
});

// Nội dung TỰ VIẾT của Bé Hay Học — không sao chép, không nhắc "Monkey", không link ngoài.
// Có ví dụ + bài tập tự xây + link bài học nội bộ + CTA.

const A1_TITLE = 'Toán lớp 1 học những gì? Lộ trình và kinh nghiệm giúp bé học tốt';
const A1_EXCERPT = 'Toán lớp 1 học những gì và bé cần chuẩn bị ra sao? Bé Hay Học tổng hợp lộ trình 4 mảng kiến thức (số, phép tính, hình học, đo lường), kèm ví dụ và cách đồng hành cùng con tại nhà.';
const A1 = `
<p>Bước vào lớp 1, môn Toán không còn là những trò chơi đếm số đơn thuần mà trở thành một môn học có chương trình rõ ràng. Nhiều phụ huynh băn khoăn <strong>toán lớp 1 học những gì</strong> và làm sao để con theo kịp mà vẫn thấy vui. Bài viết này của Bé Hay Học sẽ giúp ba mẹ hình dung trọn vẹn lộ trình và cách đồng hành cùng con.</p>

<h2>Toán lớp 1 học những gì?</h2>
<p>Theo chương trình giáo dục phổ thông hiện hành, Toán lớp 1 xoay quanh bốn mảng kiến thức chính. Ba mẹ có thể xem đây là "bản đồ" để theo dõi con đang ở đâu.</p>

<h3>1. Số và chữ số trong phạm vi 100</h3>
<p>Bé nhận biết, đọc, viết và đếm các số từ 0 đến 100; hiểu cấu tạo số có hai chữ số (hàng chục – hàng đơn vị) và biết so sánh, sắp thứ tự các số bằng dấu &gt;, &lt;, =.</p>

<h3>2. Phép cộng và phép trừ</h3>
<p>Đây là phần trọng tâm của cả năm học: cộng, trừ trong phạm vi 10 rồi mở rộng đến 100 (không nhớ). Bé làm quen với bảng cộng, bảng trừ và bắt đầu tính nhẩm nhanh.</p>

<h3>3. Hình học và không gian</h3>
<p>Bé nhận dạng hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương, khối hộp chữ nhật; xác định vị trí trên – dưới, trước – sau, phải – trái.</p>

<h3>4. Đo lường và thời gian</h3>
<p>Bé so sánh dài – ngắn, làm quen đơn vị xăng-ti-mét (cm), tập xem giờ đúng trên đồng hồ và nhận biết các ngày trong tuần.</p>

<h2>Bé cần chuẩn bị gì để học toán lớp 1 hiệu quả?</h2>
<ul>
  <li><strong>Đếm thành thạo đến 20</strong> và hiểu "nhiều hơn – ít hơn – bằng nhau" qua đồ vật quen thuộc.</li>
  <li><strong>Nhận biết mặt số</strong> từ 0 đến 9 và ghép được số với số lượng tương ứng.</li>
  <li><strong>Ngồi học tập trung 10–15 phút</strong> và làm quen với việc cầm bút, viết số.</li>
  <li><strong>Tâm lý thoải mái</strong>: xem Toán là trò chơi tư duy, không phải áp lực.</li>
</ul>

<h2>Ví dụ minh họa (do Bé Hay Học biên soạn)</h2>
<p><strong>Ví dụ 1 – So sánh số:</strong> Trong giỏ có 7 quả cam và 5 quả táo. Hỏi loại quả nào nhiều hơn? → 7 &gt; 5, vậy cam nhiều hơn.</p>
<p><strong>Ví dụ 2 – Phép cộng gắn với đời sống:</strong> Bé có 3 cái kẹo, mẹ cho thêm 4 cái. Bé có tất cả bao nhiêu cái? → 3 + 4 = 7 (cái kẹo).</p>

<h2>Bài tập tự luyện</h2>
<ol>
  <li>Viết các số còn thiếu: 6, 7, __, __, 10.</li>
  <li>Điền dấu &gt;, &lt;, = : 8 ... 5 ; 4 ... 4 ; 2 ... 9.</li>
  <li>Tính: 5 + 2 = ? ; 9 − 3 = ? ; 6 + 4 = ?</li>
</ol>

<h2>Kinh nghiệm giúp con học toán lớp 1 nhẹ nhàng</h2>
<p>Thay vì bắt con làm thật nhiều bài, ba mẹ hãy gắn Toán với những tình huống hằng ngày: đếm bậc cầu thang, chia bánh cho cả nhà, so sánh chiều cao đồ vật. Khi con hiểu Toán "có ích thật", con sẽ hào hứng hơn nhiều. Đừng quên khen ngợi mỗi tiến bộ nhỏ để con giữ được sự tự tin.</p>

<h2>Học Toán lớp 1 cùng Bé Hay Học</h2>
<p>Tại <a href="/khoa-hoc/toan-lop-1">khóa Toán lớp 1 của Bé Hay Học</a>, mỗi bài học được chia thành 3 mức độ Làm quen – Luyện tập – Thử thách, có bài tập tương tác và phản hồi ngay. Ba mẹ có thể bắt đầu với <a href="/toan-lop-1/toan-lop-1-bai-1">bài Các số 0–5</a> rồi cho con luyện tiếp <a href="/toan-lop-1/toan-lop-1-bai-10">phép cộng trong phạm vi 10</a>. Tất cả đều miễn phí và học lại được nhiều lần.</p>
<p><strong>👉 Cho bé bắt đầu ngay tại <a href="/khoa-hoc/toan-lop-1">Toán lớp 1 – Bé Hay Học</a>.</strong></p>
`.trim();

const A2_TITLE = 'Kiến thức trọng tâm Toán lớp 1: tổng hợp theo chương trình mới';
const A2_EXCERPT = 'Tổng hợp các kiến thức trọng tâm Toán lớp 1 theo chương trình mới: số học, phép tính, hình học, đo lường và làm quen dữ liệu — kèm mẹo dạy con hiệu quả từ Bé Hay Học.';
const A2 = `
<p>Toán là môn học nền tảng đi cùng con suốt những năm tháng đến trường. Nắm chắc kiến thức Toán lớp 1 ngay từ đầu sẽ giúp bé tự tin và không bị hổng khi lên các lớp trên. Dưới đây là bản tổng hợp <strong>kiến thức trọng tâm Toán lớp 1</strong> theo chương trình mới, do Bé Hay Học biên soạn.</p>

<h2>Vì sao nên cho con học chắc Toán lớp 1?</h2>
<p>Lớp 1 là giai đoạn con chuyển từ "chơi mà học" sang học có hệ thống. Nếu con hiểu bản chất số và phép tính ngay từ đầu, con sẽ tính nhẩm nhanh, tư duy logic tốt và giữ được hứng thú với Toán ở các lớp sau.</p>

<h2>Những kiến thức trọng tâm Toán lớp 1</h2>

<h3>1. Số học – nền tảng quan trọng nhất</h3>
<p>Bé nhận biết, đọc, viết, đếm số trong phạm vi 100; hiểu hàng chục – hàng đơn vị; so sánh và sắp thứ tự các số. Đây là gốc rễ cho mọi phép tính về sau.</p>

<h3>2. Phép cộng và phép trừ</h3>
<p>Cộng, trừ trong phạm vi 10 rồi mở rộng đến 100 (không nhớ); ghi nhớ bảng cộng – bảng trừ; giải các bài toán đơn giản gắn với tình huống thực tế.</p>

<h3>3. Hình học</h3>
<p>Nhận dạng và gọi tên hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương, khối hộp chữ nhật; xác định vị trí trong không gian.</p>

<h3>4. Đo lường</h3>
<p>So sánh dài – ngắn, đo độ dài bằng đơn vị xăng-ti-mét; xem giờ đúng, nhận biết các ngày trong tuần.</p>

<h3>5. Làm quen với dữ liệu</h3>
<p>Bé bước đầu biết thu thập, phân loại và đếm số lượng đồ vật theo nhóm — kỹ năng nền cho tư duy thống kê sau này.</p>

<h2>Ví dụ do Bé Hay Học biên soạn</h2>
<p><strong>Ví dụ:</strong> Lớp học có 10 bạn, trong đó 6 bạn nữ. Hỏi có bao nhiêu bạn nam? → 10 − 6 = 4 (bạn nam).</p>

<h2>Bài tập trọng tâm để con ôn luyện</h2>
<ol>
  <li>Đọc và viết các số: 15, 30, 48, 72.</li>
  <li>Đặt tính rồi tính: 24 + 13 ; 57 − 24.</li>
  <li>Gọi tên hình và tìm 2 đồ vật quanh nhà có dạng hình đó.</li>
</ol>

<h2>Mẹo dạy con học Toán lớp 1 hiệu quả</h2>
<ul>
  <li><strong>Bám sát bài trên lớp:</strong> ôn lại đúng nội dung con vừa học để con nhớ lâu.</li>
  <li><strong>Học qua trò chơi:</strong> dùng que tính, hạt, đồ vật để con "nhìn thấy" phép tính.</li>
  <li><strong>Gắn Toán với đời sống:</strong> đếm tiền lẻ, chia hoa quả, xem giờ đi ngủ.</li>
  <li><strong>Khen đúng lúc:</strong> động viên nỗ lực chứ không chỉ khen kết quả.</li>
</ul>

<h2>Ôn tập trọn bộ cùng Bé Hay Học</h2>
<p>Toàn bộ kiến thức trên đã được Bé Hay Học chia thành từng bài ngắn, có bài tập tương tác trong <a href="/khoa-hoc/toan-lop-1">khóa Toán lớp 1</a>. Con có thể ôn <a href="/toan-lop-1/toan-lop-1-bai-17">các số trong phạm vi 10</a> hoặc luyện <a href="/toan-lop-1/toan-lop-1-bai-18">phép cộng, phép trừ</a> bất cứ lúc nào.</p>
<p><strong>👉 Bắt đầu miễn phí tại <a href="/khoa-hoc/toan-lop-1">Toán lớp 1 – Bé Hay Học</a>.</strong></p>
`.trim();

const A3_TITLE = 'Cách giải toán có lời văn lớp 1: 5 bước và bài tập có đáp án';
const A3_EXCERPT = 'Hướng dẫn cách giải toán có lời văn lớp 1 theo 5 bước dễ hiểu, kèm bài tập có đáp án do Bé Hay Học biên soạn, giúp bé đọc hiểu đề và trình bày lời giải đúng.';
const A3 = `
<p>Toán có lời văn là dạng bài khiến nhiều bé lớp 1 lúng túng, vì con phải vừa đọc hiểu, vừa suy luận, vừa tính toán. Trong bài này, Bé Hay Học chia sẻ <strong>cách giải toán có lời văn lớp 1</strong> theo 5 bước rõ ràng, kèm bài tập có đáp án để con luyện tập.</p>

<h2>Toán có lời văn lớp 1 là gì?</h2>
<p>Đó là dạng bài đặt phép tính vào một tình huống thực tế bằng lời, ví dụ: "Bé có 4 quả bóng, được tặng thêm 3 quả. Hỏi bé có tất cả bao nhiêu quả bóng?". Con cần "dịch" lời văn thành phép tính rồi trình bày lời giải đầy đủ.</p>

<h2>5 bước giải toán có lời văn lớp 1</h2>
<h3>Bước 1: Đọc kĩ đề bài</h3>
<p>Đọc chậm 2 lần, gạch chân dữ kiện (con số) và câu hỏi. Xác định đề đang cho gì và hỏi gì.</p>
<h3>Bước 2: Tóm tắt đề</h3>
<p>Ghi lại ngắn gọn: "Có: 4 quả – Thêm: 3 quả – Hỏi: tất cả mấy quả?". Tóm tắt giúp con nhìn ra phép tính cần dùng.</p>
<h3>Bước 3: Chọn phép tính</h3>
<p>"Thêm", "cả hai", "tất cả" thường là phép cộng; "còn lại", "bớt", "cho đi" thường là phép trừ. Đây là "từ khóa" quan trọng con cần nhớ.</p>
<h3>Bước 4: Trình bày lời giải</h3>
<p>Viết câu lời giải + phép tính + đáp số. Ví dụ:<br/>Số quả bóng bé có tất cả là:<br/>4 + 3 = 7 (quả bóng)<br/>Đáp số: 7 quả bóng.</p>
<h3>Bước 5: Kiểm tra lại</h3>
<p>Đọc lại xem đáp số có hợp lý không, đơn vị đã đúng chưa (quả bóng, bạn, cái kẹo…).</p>

<h2>Bài tập có đáp án (do Bé Hay Học biên soạn)</h2>
<p><strong>Bài 1:</strong> Trên cây có 8 chú chim, 5 chú bay đi. Hỏi trên cây còn lại mấy chú chim?<br/><em>Đáp án:</em> 8 − 5 = 3 (chú chim). Đáp số: 3 chú chim.</p>
<p><strong>Bài 2:</strong> Lan có 6 bông hoa, Mai có 4 bông hoa. Hỏi cả hai bạn có tất cả bao nhiêu bông hoa?<br/><em>Đáp án:</em> 6 + 4 = 10 (bông hoa). Đáp số: 10 bông hoa.</p>
<p><strong>Bài 3:</strong> Trong hộp có 10 viên bi, bé lấy ra 3 viên. Hỏi trong hộp còn lại mấy viên bi?<br/><em>Đáp án:</em> 10 − 3 = 7 (viên bi). Đáp số: 7 viên bi.</p>

<h2>Lỗi bé thường mắc và cách khắc phục</h2>
<ul>
  <li><strong>Quên viết câu lời giải và đáp số:</strong> nhắc con luôn viết đủ 3 phần (lời giải – phép tính – đáp số).</li>
  <li><strong>Nhầm cộng thành trừ:</strong> luyện cho con nhận diện "từ khóa" thêm/bớt.</li>
  <li><strong>Quên đơn vị:</strong> tập thói quen viết đơn vị trong ngoặc sau kết quả.</li>
</ul>

<h2>Luyện toán có lời văn cùng Bé Hay Học</h2>
<p>Con có thể luyện thêm dạng bài này trong <a href="/khoa-hoc/toan-lop-1">khóa Toán lớp 1</a> với các bài tập tương tác có chấm điểm và giải thích ngay. Hãy cho con thử ở mức <em>Thử thách</em> để rèn phản xạ đọc hiểu đề.</p>
<p><strong>👉 Vào học ngay tại <a href="/khoa-hoc/toan-lop-1">Toán lớp 1 – Bé Hay Học</a>.</strong></p>
`.trim();

const ARTICLES: { slug: string; title: string; excerpt: string; content: string }[] = [
  { slug: 'toan-lop-1-hoc-nhung-gi-kinh-nghiem-giup-be-hoc-hieu-qua', title: A1_TITLE, excerpt: A1_EXCERPT, content: A1 },
  { slug: 'tong-hop-cac-kien-thuc-trong-tam-toan-lop-1-co-ban-theo-chuong-trinh-moi-nhat', title: A2_TITLE, excerpt: A2_EXCERPT, content: A2 },
  { slug: 'cach-giai-toan-lop-1-giai-toan-co-loi-van-va-bai-tap-co-ap-an', title: A3_TITLE, excerpt: A3_EXCERPT, content: A3 },
];

async function main() {
  await ds.initialize();
  console.log('Viết lại 3 bài dính "Monkey" bằng nội dung riêng của Bé Hay Học…');
  for (const a of ARTICLES) {
    // Xóa ảnh S3 không rõ bản quyền (để trống → FE tự dùng ảnh mặc định/OG).
    const r: any = await ds.query(
      'UPDATE articles SET title = ?, excerpt = ?, content = ?, thumbnailUrl = NULL, authorName = ?, updatedAt = NOW() WHERE slug = ?',
      [a.title, a.excerpt, a.content, 'Bé Hay Học', a.slug],
    );
    const has = String(a.content).toLowerCase().includes('monkey');
    console.log(`  ✓ ${a.slug} — updated ${r.affectedRows} | còn 'monkey'? ${has}`);
  }
  // Kiểm tra không còn bài nào dính monkey
  const left: any[] = await ds.query("SELECT slug FROM articles WHERE LOWER(content) LIKE '%monkey%' OR LOWER(title) LIKE '%monkey%'");
  console.log('Còn bài dính "monkey":', left.length, left.map((x: any) => x.slug));
  await ds.destroy();
  console.log('HOÀN TẤT ✅');
}
main().catch((e) => { console.error('LỖI:', e); process.exit(1); });
