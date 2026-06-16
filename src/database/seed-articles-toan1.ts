import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection({
    host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'jFUnRCumnerGsGaPT5pR',
    database: 'songtute',
  });

  const now = new Date();
  const tags = JSON.stringify(['toán lớp 1', 'mẹo học toán', 'tiểu học']);
  const category = 'toan-lop-1';
  const authorName = 'Bé Hay Học';

  const articles = [
    {
      title: 'Mẹo dạy trẻ học bảng cộng trừ trong phạm vi 10 nhanh nhất',
      slug: 'meo-day-tre-hoc-bang-cong-tru-trong-pham-vi-10-nhanh-nhat',
      excerpt:
        'Bảng cộng trừ trong phạm vi 10 là nền tảng quan trọng nhất của toán lớp 1. Bài viết này chia sẻ những mẹo thực tế giúp bé ghi nhớ nhanh và chính xác mà không cần học thuộc lòng một cách máy móc. Phụ huynh có thể áp dụng ngay tại nhà chỉ sau vài ngày luyện tập.',
      content: `<h2>Tại sao bảng cộng trừ trong phạm vi 10 quan trọng?</h2>
<p>Bảng cộng trừ trong phạm vi 10 là viên gạch đầu tiên và quan trọng nhất trong hành trình học toán của trẻ lớp 1. Nếu bé nắm vững nền tảng này, việc học các phép tính lớn hơn sau này sẽ trở nên dễ dàng hơn rất nhiều. Tuy nhiên, nhiều phụ huynh thường mắc sai lầm khi bắt ép trẻ học thuộc lòng mà không hiểu bản chất của phép tính.</p>

<h2>Phương pháp dùng ngón tay – bước khởi đầu tự nhiên</h2>
<p>Ngón tay là "công cụ toán học" đầu tiên mà trẻ có thể sử dụng. Hãy để bé dùng ngón tay để đếm và tính toán trong giai đoạn đầu. Điều này không phải là "lười biếng" mà là giúp trẻ hình thành tư duy số học một cách trực quan nhất.</p>
<ul>
  <li>Dạy bé giơ ngón tay tương ứng với số đầu tiên, sau đó đếm thêm số ngón tay bằng với số thứ hai.</li>
  <li>Luyện tập mỗi ngày 5–10 phút, không nên kéo dài vì trẻ lớp 1 khó tập trung lâu.</li>
  <li>Khen ngợi và khuyến khích mỗi khi bé làm đúng để tạo động lực.</li>
</ul>

<h2>Dùng vật thể thực tế để minh họa phép tính</h2>
<p>Trẻ ở độ tuổi lớp 1 học tốt nhất qua trải nghiệm thực tế. Thay vì chỉ nói "3 + 4 = 7", hãy dùng các hạt đậu, kẹo, hoặc khối lego để minh họa.</p>
<ul>
  <li>Xếp 3 viên kẹo ra, rồi xếp thêm 4 viên, đếm tổng cộng được bao nhiêu.</li>
  <li>Bài toán trừ: "Có 8 quả táo, ăn đi 3 quả, còn lại mấy quả?" – lấy ra 3 quả rồi đếm phần còn lại.</li>
  <li>Kết hợp ăn nhẹ với học toán – ví dụ dùng bánh quy để tính cộng trừ, bé làm đúng thì được ăn.</li>
</ul>

<h2>Kỹ thuật "bạn thân của số 10"</h2>
<p>Một trong những kỹ thuật hiệu quả nhất là dạy trẻ nhận biết các cặp số cộng lại bằng 10 (còn gọi là "bạn thân của số 10"): 1+9, 2+8, 3+7, 4+6, 5+5. Khi bé thuộc các cặp này, việc tính toán trong phạm vi 10 sẽ trở nên rất nhanh.</p>
<ul>
  <li>Viết các cặp số lên thẻ giấy màu, đặt xung quanh nhà để bé nhìn thấy hàng ngày.</li>
  <li>Chơi trò "tìm bạn thân": bố/mẹ hô một số, bé phải hô số còn lại để tổng bằng 10.</li>
  <li>Ôn lại mỗi buổi sáng trong 2 phút trước khi đi học.</li>
</ul>

<h2>Thẻ học flash card – công cụ ôn tập hiệu quả</h2>
<p>Flash card là phương pháp kinh điển nhưng rất hiệu quả. Phụ huynh có thể tự làm hoặc mua sẵn bộ thẻ cộng trừ trong phạm vi 10.</p>
<ul>
  <li>Một mặt thẻ ghi phép tính (ví dụ: 6 + 3 =), mặt kia ghi đáp án (9).</li>
  <li>Mỗi ngày ôn 5–10 thẻ, không nên ôn quá nhiều một lúc.</li>
  <li>Đưa những thẻ bé làm sai vào một hộp riêng để ôn lại nhiều lần hơn.</li>
</ul>

<h2>Trò chơi súc sắc – học toán qua trò chơi</h2>
<p>Mua hai con súc sắc, bé tung hai con rồi cộng hoặc trừ hai số hiện ra. Trò chơi này vừa vui, vừa giúp bé luyện phản xạ tính toán rất hiệu quả. Bố mẹ có thể chơi cùng để tăng phần hấp dẫn.</p>

<h2>Lịch học tập hợp lý cho trẻ lớp 1</h2>
<p>Trẻ lớp 1 cần thời gian học ngắn nhưng đều đặn. Tốt nhất là học toán vào buổi sáng hoặc đầu giờ chiều khi não bộ còn tươi tỉnh. Mỗi buổi không nên quá 15–20 phút.</p>
<ul>
  <li>Buổi sáng: ôn lại các thẻ flash card hoặc trò chơi "bạn thân của số 10" (5 phút).</li>
  <li>Buổi chiều: làm bài tập cộng trừ từ sách giáo khoa hoặc vở ô ly (10–15 phút).</li>
  <li>Trước khi đi ngủ: hỏi miệng 3–5 phép tính ngẫu nhiên (3 phút).</li>
</ul>

<h2>Những lỗi phụ huynh thường gặp khi dạy bảng cộng trừ</h2>
<ul>
  <li>Bắt trẻ học thuộc lòng mà không hiểu ý nghĩa của phép tính.</li>
  <li>Học quá nhiều trong một buổi khiến trẻ mệt mỏi và chán nản.</li>
  <li>Không kiên nhẫn, la mắng khi bé làm sai – điều này làm trẻ sợ toán.</li>
  <li>Bỏ qua giai đoạn dùng tay và vật thể để đếm, vội vàng bắt tính nhẩm.</li>
</ul>

<h2>Kết luận</h2>
<p>Học bảng cộng trừ trong phạm vi 10 không cần phải là cực hình với bé lớp 1. Với những mẹo đơn giản, thực tế và vui vẻ ở trên, phụ huynh hoàn toàn có thể giúp bé nắm vững nền tảng toán học quan trọng này chỉ trong vòng 2–3 tuần. Điều quan trọng nhất là sự kiên nhẫn, nhất quán và luôn tạo không khí học tập tích cực cho trẻ.</p>`,
    },
    {
      title: 'Cách giải toán có lời văn lớp 1 đơn giản cho bé',
      slug: 'cach-giai-toan-co-loi-van-lop-1-don-gian-cho-be',
      excerpt:
        'Toán có lời văn là dạng bài khó nhất với trẻ lớp 1 vì đòi hỏi khả năng đọc hiểu và tư duy logic cùng lúc. Bài viết hướng dẫn phụ huynh cách dạy bé đọc đề, phân tích bài và trình bày lời giải đúng quy cách. Chỉ cần nắm 3 bước đơn giản, bé có thể tự giải được hầu hết bài toán có lời văn lớp 1.',
      content: `<h2>Toán có lời văn lớp 1 khó ở điểm nào?</h2>
<p>Nhiều bé lớp 1 tính cộng trừ rất giỏi nhưng lại lúng túng với bài toán có lời văn. Nguyên nhân chính là vì dạng bài này yêu cầu trẻ phải làm hai việc cùng lúc: đọc hiểu đề bài và chọn phép tính phù hợp. Đây là kỹ năng tổng hợp, cần được rèn luyện có phương pháp.</p>

<h2>Ba bước giải toán có lời văn cho bé lớp 1</h2>
<p>Phụ huynh hãy dạy bé ghi nhớ và thực hành đúng 3 bước sau mỗi khi gặp bài toán có lời văn:</p>
<ul>
  <li><strong>Bước 1 – Đọc kỹ đề bài:</strong> Đọc ít nhất 2 lần, gạch chân các số và từ khóa quan trọng.</li>
  <li><strong>Bước 2 – Xác định đề cho gì, hỏi gì:</strong> Viết ra "Đề cho:" và "Đề hỏi:" trước khi tính.</li>
  <li><strong>Bước 3 – Viết phép tính và câu trả lời:</strong> Viết đầy đủ phép tính và câu trả lời theo mẫu.</li>
</ul>

<h2>Nhận biết từ khóa của phép cộng và phép trừ</h2>
<p>Dạy bé nhận biết các từ khóa để biết dùng phép tính nào:</p>
<ul>
  <li><strong>Phép cộng:</strong> "thêm vào", "mua thêm", "có thêm", "tất cả có", "cả hai".</li>
  <li><strong>Phép trừ:</strong> "cho đi", "ăn mất", "còn lại", "bớt đi", "mất đi".</li>
</ul>
<p>Hãy viết các từ khóa này lên giấy màu và dán vào góc học tập của bé để bé nhìn thấy và ghi nhớ mỗi ngày.</p>

<h2>Mẫu trình bày lời giải chuẩn lớp 1</h2>
<p>Trình bày lời giải đúng mẫu là yêu cầu bắt buộc trong chương trình lớp 1. Dưới đây là mẫu chuẩn:</p>
<ul>
  <li>Câu lời giải (viết nguyên câu, không dùng ký hiệu).</li>
  <li>Phép tính: ví dụ 5 + 3 = 8 (kèm đơn vị nếu có).</li>
  <li>Đáp số: ghi rõ ràng.</li>
</ul>
<p>Ví dụ: "Trong vườn có 5 con chim, bay đến thêm 3 con chim nữa. Hỏi trong vườn có tất cả bao nhiêu con chim?" – Câu lời giải: "Trong vườn có tất cả số con chim là:" – Phép tính: 5 + 3 = 8 (con chim) – Đáp số: 8 con chim.</p>

<h2>Luyện tập qua bài toán thực tế trong cuộc sống</h2>
<p>Cách tốt nhất để bé hiểu toán có lời văn là gắn với thực tế hàng ngày. Phụ huynh có thể tạo ra các tình huống tự nhiên:</p>
<ul>
  <li>"Mẹ mua 4 quả cam, bố mua thêm 3 quả. Nhà mình có bao nhiêu quả cam?"</li>
  <li>"Con có 9 cái kẹo, cho em 2 cái. Con còn bao nhiêu cái kẹo?"</li>
  <li>"Trên bàn có 6 quyển sách, con lấy đi 2 quyển. Còn bao nhiêu quyển?"</li>
</ul>

<h2>Lỗi thường gặp trong bài toán có lời văn</h2>
<ul>
  <li>Không đọc kỹ đề, vội vàng tính ngay khi thấy các số trong bài.</li>
  <li>Quên viết câu lời giải hoặc viết sai đơn vị.</li>
  <li>Nhầm phép tính cộng và trừ do không chú ý từ khóa.</li>
  <li>Câu trả lời thiếu đơn vị (con, cái, quả, học sinh...).</li>
</ul>

<h2>Cách luyện tập hiệu quả tại nhà</h2>
<p>Mỗi ngày bố mẹ có thể đọc cho bé nghe 2–3 bài toán có lời văn đơn giản và yêu cầu bé giải miệng trước, sau đó viết ra giấy. Bắt đầu từ những bài cực kỳ đơn giản, tăng dần độ khó khi bé đã tự tin hơn.</p>

<h2>Kết luận</h2>
<p>Toán có lời văn lớp 1 không hề khó nếu bé được dạy đúng phương pháp từ đầu. Ba bước đọc đề – phân tích – trình bày, kết hợp với nhận biết từ khóa và luyện tập qua tình huống thực tế sẽ giúp bé tự tin giải quyết mọi bài toán có lời văn trong chương trình lớp 1.</p>`,
    },
    {
      title: 'Trò chơi học toán thú vị giúp bé lớp 1 yêu thích số học',
      slug: 'tro-choi-hoc-toan-thu-vi-giup-be-lop-1-yeu-thich-so-hoc',
      excerpt:
        'Học toán không nhất thiết phải ngồi vào bàn với sách vở. Bài viết giới thiệu 8 trò chơi học toán vui nhộn, dễ thực hiện tại nhà giúp bé lớp 1 vừa học vừa chơi mà không nhận ra mình đang học. Những trò chơi này không cần mua đồ chơi đắt tiền, chỉ cần các vật dụng có sẵn trong nhà.',
      content: `<h2>Tại sao cần dạy toán qua trò chơi?</h2>
<p>Não bộ của trẻ lớp 1 học hiệu quả nhất thông qua trải nghiệm vui vẻ và cảm xúc tích cực. Khi trẻ chơi, não bộ tiết ra dopamine – chất dẫn truyền thần kinh giúp tăng cường trí nhớ và khả năng học hỏi. Vì vậy, dạy toán qua trò chơi không chỉ vui hơn mà còn hiệu quả hơn nhiều so với cách học truyền thống.</p>

<h2>1. Trò chơi "Chợ mini" tại nhà</h2>
<p>Chuẩn bị: một số đồ vật trong nhà, nhãn giá từ 1 đến 10, tiền giấy tự làm. Bé đóng vai người bán hàng hoặc người mua hàng, thực hành cộng trừ trong tình huống thực tế.</p>
<ul>
  <li>Bé mua 3 món hàng, tính tổng tiền cần trả.</li>
  <li>Người bán tính tiền thừa phải trả lại.</li>
  <li>Luân phiên vai người bán và người mua.</li>
</ul>

<h2>2. Trò chơi "Câu cá số học"</h2>
<p>Vẽ các con cá lên bìa cứng, mỗi con cá ghi một phép tính. Làm cần câu bằng que gỗ và nam châm nhỏ. Bé câu được cá nào phải đọc to phép tính và trả lời đúng mới được giữ lại.</p>

<h2>3. Bingo số học</h2>
<p>Vẽ bảng 3x3 hoặc 4x4, điền các số kết quả vào ô. Bố/mẹ đọc phép tính, bé tìm đáp án và đánh dấu vào ô tương ứng. Ai hoàn thành một hàng ngang/dọc/chéo trước thì hô "Bingo!" và thắng.</p>

<h2>4. Trò chơi "Nhảy ô số"</h2>
<p>Vẽ các ô số từ 1 đến 20 trên sàn bằng phấn hoặc băng dính màu. Bố/mẹ đọc phép tính, bé nhảy vào ô có đáp án đúng. Kết hợp vận động thể chất với học toán giúp bé hứng thú hơn rất nhiều.</p>

<h2>5. Trò chơi thẻ số nhanh tay</h2>
<p>Mỗi người cầm một bộ thẻ số từ 0 đến 10. Bố/mẹ đọc phép tính, ai giơ thẻ đáp án đúng và nhanh nhất thì thắng. Trò chơi này luyện phản xạ tính toán rất hiệu quả.</p>

<h2>6. Trò chơi xúc xắc đôi</h2>
<p>Dùng hai con xúc xắc, tung cả hai rồi cộng hoặc trừ hai số lại. Ghi kết quả vào bảng, ai đạt điểm cao nhất sau 10 lượt thì thắng. Trò chơi đơn giản nhưng giúp bé luyện tính nhẩm rất nhiều.</p>

<h2>7. Đếm bậc thang</h2>
<p>Mỗi khi lên hoặc xuống cầu thang, bé đếm to số bậc thang. Sau đó bố/mẹ hỏi: "Nếu con đã lên 5 bậc, còn 3 bậc nữa là đến nơi. Tổng cộng có bao nhiêu bậc?" – Đây là bài toán thực tế giúp bé hiểu ý nghĩa của phép cộng.</p>

<h2>8. Trò chơi "Số bí mật"</h2>
<p>Bố/mẹ nghĩ một số bí mật từ 1 đến 20. Bé hỏi các câu hỏi có/không để đoán số đó. Ví dụ: "Số đó lớn hơn 10 không?", "Số đó chẵn không?". Trò chơi này dạy bé tư duy logic và so sánh số.</p>

<h2>Lưu ý khi tổ chức trò chơi học toán</h2>
<ul>
  <li>Giữ thời gian chơi từ 10–20 phút, không nên kéo dài.</li>
  <li>Luôn khen ngợi và động viên, không phê bình khi bé làm sai.</li>
  <li>Điều chỉnh độ khó phù hợp với trình độ hiện tại của bé.</li>
  <li>Kết thúc buổi chơi khi bé còn đang hứng thú, đừng chờ đến khi bé chán.</li>
</ul>

<h2>Kết luận</h2>
<p>Những trò chơi đơn giản trên đây có thể biến việc học toán từ một "cực hình" thành niềm vui của bé mỗi ngày. Khi bé yêu thích toán học từ nhỏ, đây sẽ là lợi thế lớn cho toàn bộ hành trình học tập sau này của bé.</p>`,
    },
    {
      title: 'Phương pháp dạy trẻ đếm số từ 1 đến 100 hiệu quả',
      slug: 'phuong-phap-day-tre-dem-so-tu-1-den-100-hieu-qua',
      excerpt:
        'Đếm số từ 1 đến 100 là kỹ năng cơ bản nhưng không phải bé nào cũng nắm vững ngay từ đầu. Bài viết chia sẻ lộ trình học đếm số theo từng giai đoạn, kết hợp các hoạt động thực tế và trò chơi thú vị để bé vừa nhớ lâu vừa hiểu được quy luật của dãy số. Phụ huynh chỉ cần 10 phút mỗi ngày là đủ.',
      content: `<h2>Lộ trình học đếm số hợp lý cho bé lớp 1</h2>
<p>Nhiều phụ huynh cố dạy bé đếm từ 1 đến 100 ngay một lúc, dẫn đến bé bị quá tải và dễ nhầm lẫn. Cách đúng là chia thành các giai đoạn nhỏ, mỗi giai đoạn khoảng 1–2 tuần:</p>
<ul>
  <li>Tuần 1–2: Đếm và nhận biết số từ 1 đến 20.</li>
  <li>Tuần 3–4: Đếm từ 20 đến 50, chú ý quy luật hàng chục.</li>
  <li>Tuần 5–6: Đếm từ 50 đến 100, nhận biết chữ số hàng chục và hàng đơn vị.</li>
</ul>

<h2>Dạy bé nhận ra quy luật của dãy số</h2>
<p>Điều quan trọng nhất khi dạy đếm số là giúp bé hiểu quy luật: mỗi số tăng thêm 1, sau số 9 đến số 10, sau số 19 đến số 20, v.v. Khi bé hiểu quy luật này, bé có thể tự suy ra các số tiếp theo mà không cần nhớ thuộc lòng từng số một.</p>

<h2>Hoạt động đếm trong cuộc sống hàng ngày</h2>
<p>Tích hợp việc đếm số vào các hoạt động thường ngày là cách học tự nhiên và hiệu quả nhất:</p>
<ul>
  <li>Đếm bậc thang khi lên xuống cầu thang.</li>
  <li>Đếm số bước chân từ nhà đến điểm dừng xe buýt.</li>
  <li>Đếm số xe ô tô màu đỏ nhìn thấy trên đường.</li>
  <li>Đếm số thìa gạo khi vo gạo nấu cơm cùng mẹ.</li>
  <li>Đếm số trang sách đã đọc mỗi tối.</li>
</ul>

<h2>Sử dụng bảng số 1–100</h2>
<p>Bảng số từ 1 đến 100 (10 hàng x 10 cột) là công cụ trực quan tuyệt vời. Dán bảng số này trong phòng học của bé để bé nhìn thấy mỗi ngày. Dùng bảng này để:</p>
<ul>
  <li>Chỉ ngẫu nhiên một số và hỏi bé đọc số đó.</li>
  <li>Dùng bút chỉ di chuyển theo hàng ngang để đếm tiếp.</li>
  <li>Tô màu dần các số đã học được – bé rất thích nhìn bảng số được tô màu đầy dần.</li>
</ul>

<h2>Trò chơi đếm số thú vị</h2>
<ul>
  <li><strong>Đếm tiếp:</strong> Bố/mẹ đếm đến một số nào đó rồi dừng, bé đếm tiếp từ chỗ bố/mẹ dừng.</li>
  <li><strong>Số còn thiếu:</strong> Đọc dãy số nhưng bỏ qua một số, bé phải nói số bị bỏ qua.</li>
  <li><strong>Đếm ngược:</strong> Sau khi thành thạo đếm xuôi, tập đếm ngược từ 10 về 1, rồi từ 20 về 1.</li>
  <li><strong>Đếm cách 2, cách 5:</strong> Đếm 2, 4, 6, 8, 10... hoặc 5, 10, 15, 20... để chuẩn bị cho bảng nhân sau này.</li>
</ul>

<h2>Bài hát và vần thơ về số</h2>
<p>Trẻ em học rất nhanh qua âm nhạc. Có nhiều bài hát thiếu nhi về đếm số mà phụ huynh có thể tìm trên YouTube. Hát cùng bé vào buổi sáng hoặc trước giờ đi ngủ giúp số học trở nên gần gũi và vui vẻ hơn.</p>

<h2>Nhận biết số chẵn và số lẻ</h2>
<p>Khi bé đã đếm được đến 20, hãy dạy thêm khái niệm số chẵn (2, 4, 6, 8, 10...) và số lẻ (1, 3, 5, 7, 9...). Cách đơn giản nhất là dùng đôi giày: số chẵn là khi mỗi vật tìm được "bạn đôi", số lẻ là khi còn thừa một vật.</p>

<h2>Kết luận</h2>
<p>Dạy trẻ đếm số từ 1 đến 100 là hành trình dài nhưng rất thú vị nếu phụ huynh biết cách biến nó thành những trải nghiệm học tập vui vẻ trong cuộc sống hàng ngày. Hãy kiên nhẫn, đừng vội vàng và luôn khuyến khích bé mỗi khi bé tiến bộ dù chỉ một chút.</p>`,
    },
    {
      title: 'Làm thế nào để bé lớp 1 thuộc bảng cộng trong 1 tuần',
      slug: 'lam-the-nao-de-be-lop-1-thuoc-bang-cong-trong-1-tuan',
      excerpt:
        'Chỉ 1 tuần với kế hoạch học tập bài bản và phương pháp đúng, bé lớp 1 hoàn toàn có thể thuộc bảng cộng trong phạm vi 10. Bài viết cung cấp lịch học chi tiết từng ngày, các mẹo ghi nhớ nhanh và cách kiểm tra tiến độ để phụ huynh dễ dàng theo dõi và hỗ trợ bé.',
      content: `<h2>Tại sao 1 tuần là đủ?</h2>
<p>Bảng cộng trong phạm vi 10 chỉ có 55 phép tính cơ bản (từ 1+1 đến các tổ hợp cộng bằng 10). Nếu học đúng phương pháp, mỗi ngày bé chỉ cần ghi nhớ khoảng 8–10 phép tính mới là có thể hoàn thành trong 1 tuần. Điều quan trọng là phải ôn lại đều đặn và không bỏ ngày nào.</p>

<h2>Lịch học bảng cộng 7 ngày</h2>
<ul>
  <li><strong>Ngày 1:</strong> Phép cộng với số 1: 1+1, 2+1, 3+1, 4+1, 5+1, 6+1, 7+1, 8+1, 9+1.</li>
  <li><strong>Ngày 2:</strong> Phép cộng với số 2: 1+2, 2+2, 3+2, 4+2, 5+2, 6+2, 7+2, 8+2. Ôn lại ngày 1.</li>
  <li><strong>Ngày 3:</strong> Phép cộng với số 3 và 4. Ôn lại ngày 1, 2.</li>
  <li><strong>Ngày 4:</strong> Phép cộng với số 5 và cộng với 0. Ôn lại toàn bộ.</li>
  <li><strong>Ngày 5:</strong> Kiểm tra tổng hợp, ôn lại các phép tính còn yếu.</li>
  <li><strong>Ngày 6:</strong> Luyện tập qua trò chơi và bài toán có lời văn.</li>
  <li><strong>Ngày 7:</strong> Kiểm tra cuối tuần, khen thưởng bé nếu đạt mục tiêu.</li>
</ul>

<h2>Kỹ thuật ghi nhớ nhanh bảng cộng</h2>
<ul>
  <li><strong>Tính chất giao hoán:</strong> Dạy bé hiểu 3+5 = 5+3, điều này giảm một nửa số phép tính cần nhớ.</li>
  <li><strong>Cộng với 0:</strong> Bất kỳ số nào cộng với 0 đều bằng chính số đó – dễ nhất.</li>
  <li><strong>Cộng với 1:</strong> Kết quả luôn là số liền sau – dễ thứ hai.</li>
  <li><strong>Các đôi số bằng nhau:</strong> 1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10 – có quy luật rõ ràng.</li>
  <li><strong>Cặp "bạn thân của 10":</strong> 1+9, 2+8, 3+7, 4+6 – chỉ cần nhớ 4 cặp này.</li>
</ul>

<h2>Cách kiểm tra tiến độ hàng ngày</h2>
<p>Mỗi buổi tối, phụ huynh hỏi miệng 10 phép tính ngẫu nhiên từ những gì bé đã học trong ngày. Ghi lại số phép tính bé trả lời đúng vào một bảng theo dõi. Khi thấy đường biểu diễn tiến bộ ngày càng tăng, bé sẽ rất tự hào và có thêm động lực.</p>

<h2>Thẻ ôn tập flash card tự làm</h2>
<p>Dành 30 phút vào ngày đầu tuần để làm cùng bé bộ flash card bảng cộng. Bé tự viết phép tính và đáp án lên thẻ giấy màu. Việc tự làm thẻ đã giúp bé nhớ một phần, và sau đó dùng thẻ để ôn tập mỗi ngày.</p>

<h2>Xử lý khi bé không nhớ được</h2>
<ul>
  <li>Không la mắng hay tỏ ra thất vọng – điều này làm bé càng sợ toán hơn.</li>
  <li>Quay lại dùng ngón tay hoặc vật thể để đếm – không có gì sai khi bé cần hỗ trợ trực quan.</li>
  <li>Giảm bớt số lượng phép tính cần học trong ngày nếu bé đang quá tải.</li>
  <li>Tìm phần thưởng nhỏ (nhãn dán, sticker, được xem thêm 15 phút phim hoạt hình) để động viên bé.</li>
</ul>

<h2>Kết luận</h2>
<p>Một tuần học bảng cộng có kế hoạch bài bản hoàn toàn nằm trong tầm tay của mọi bé lớp 1. Với sự đồng hành kiên nhẫn của phụ huynh và những phương pháp học vui vẻ, bé không chỉ thuộc bảng cộng mà còn xây dựng được thói quen học toán tích cực – nền tảng cho toàn bộ hành trình học toán về sau.</p>`,
    },
    {
      title: 'Dạy trẻ lớp 1 nhận biết hình học: tròn, vuông, tam giác',
      slug: 'day-tre-lop-1-nhan-biet-hinh-hoc-tron-vuong-tam-giac',
      excerpt:
        'Hình học là phần học thú vị nhất trong chương trình toán lớp 1 vì gắn liền với thế giới xung quanh bé. Bài viết hướng dẫn cách dạy bé nhận biết và phân biệt các hình cơ bản như hình tròn, hình vuông, hình chữ nhật và hình tam giác thông qua các hoạt động thực tế và trò chơi tìm hình trong cuộc sống.',
      content: `<h2>Hình học trong chương trình toán lớp 1</h2>
<p>Chương trình toán lớp 1 giới thiệu 4 hình cơ bản: hình tròn, hình vuông, hình chữ nhật và hình tam giác. Bé cần nhận biết, gọi tên và phân biệt được các hình này. Đây là nền tảng cho việc học hình học không gian ở các lớp cao hơn.</p>

<h2>Cách giới thiệu từng hình học cho bé</h2>
<p>Bắt đầu bằng cách tìm các vật thể trong nhà có hình dạng tương ứng, giúp bé thấy rằng toán học có mặt khắp nơi trong cuộc sống:</p>
<ul>
  <li><strong>Hình tròn:</strong> Đồng hồ, mặt trăng tròn, bánh xe, nắp chai, bát ăn cơm nhìn từ trên xuống.</li>
  <li><strong>Hình vuông:</strong> Gạch lát nền, khăn tay, khung ảnh hình vuông, miếng xốp hình vuông.</li>
  <li><strong>Hình chữ nhật:</strong> Cửa sổ, quyển sách, điện thoại, bảng viết, tờ giấy A4.</li>
  <li><strong>Hình tam giác:</strong> Miếng pizza, biển báo giao thông tam giác, nón lá.</li>
</ul>

<h2>Đặc điểm phân biệt từng hình</h2>
<ul>
  <li><strong>Hình tròn:</strong> Không có góc, không có cạnh thẳng, mọi điểm trên đường tròn cách tâm bằng nhau.</li>
  <li><strong>Hình vuông:</strong> 4 cạnh bằng nhau, 4 góc vuông.</li>
  <li><strong>Hình chữ nhật:</strong> 4 góc vuông, cạnh dài bằng nhau và cạnh ngắn bằng nhau (nhưng cạnh dài ≠ cạnh ngắn).</li>
  <li><strong>Hình tam giác:</strong> 3 cạnh, 3 góc.</li>
</ul>

<h2>Hoạt động thực hành nhận biết hình</h2>
<ul>
  <li><strong>Vẽ hình tự do:</strong> Bé tự vẽ các hình theo yêu cầu, tô màu và ghi tên hình.</li>
  <li><strong>Cắt dán:</strong> Cắt hình từ giấy màu, dán lên tờ giấy trắng tạo thành bức tranh.</li>
  <li><strong>Xếp hình:</strong> Dùng que tính để xếp thành các hình hình học trên bàn.</li>
  <li><strong>Đất nặn:</strong> Nặn các hình học bằng đất sét – hoạt động này trẻ em rất thích.</li>
</ul>

<h2>Trò chơi "Tìm hình trong nhà"</h2>
<p>Đây là trò chơi mà bé có thể chơi bất cứ lúc nào, bất cứ nơi đâu. Bố/mẹ nêu tên một hình, bé phải nhanh tay chỉ vào vật có hình dạng đó trong phòng. Trò chơi giúp bé gắn kết kiến thức toán học với thực tế xung quanh.</p>

<h2>Học hình học qua vẽ tranh</h2>
<p>Hướng dẫn bé vẽ các hình đơn giản bằng cách ghép các hình học lại với nhau:</p>
<ul>
  <li>Ngôi nhà = hình chữ nhật (thân nhà) + hình tam giác (mái nhà).</li>
  <li>Ô tô = hình chữ nhật (thân xe) + 2 hình tròn (bánh xe).</li>
  <li>Mặt người = hình tròn (khuôn mặt) + 2 hình tròn nhỏ (mắt) + hình tam giác (mũi).</li>
</ul>

<h2>Đếm cạnh và góc</h2>
<p>Sau khi bé nhận biết được các hình, dạy bé đếm số cạnh và số góc của từng hình. Đây là bước nâng cao giúp bé hiểu sâu hơn về đặc điểm của các hình học.</p>

<h2>Kết luận</h2>
<p>Hình học là phần toán học trực quan và thú vị nhất dành cho trẻ lớp 1. Thông qua việc quan sát thế giới xung quanh, vẽ, cắt, dán và chơi trò chơi, bé sẽ nắm vững kiến thức hình học cơ bản một cách tự nhiên và vui vẻ. Hãy biến mỗi hoạt động hàng ngày thành cơ hội học hình học cho bé nhé!</p>`,
    },
    {
      title: 'Bí quyết giúp bé lớp 1 không sợ học toán',
      slug: 'bi-quyet-giup-be-lop-1-khong-so-hoc-toan',
      excerpt:
        'Nhiều bé lớp 1 bắt đầu có tâm lý sợ toán từ rất sớm, và điều này ảnh hưởng tiêu cực đến kết quả học tập lâu dài. Bài viết phân tích nguyên nhân tâm lý khiến trẻ sợ toán và đưa ra những giải pháp thiết thực giúp phụ huynh xây dựng lại tình yêu toán học cho bé từ những bước nhỏ nhất.',
      content: `<h2>Tại sao trẻ lớp 1 sợ toán?</h2>
<p>Nỗi sợ học toán ở trẻ em thường xuất phát từ những trải nghiệm tiêu cực ban đầu: bị la mắng khi làm sai, bị so sánh với bạn bè, hoặc đơn giản là chưa được dạy theo cách phù hợp với tốc độ học của bé. Một khi nỗi sợ này hình thành, nó rất khó xóa bỏ nếu không được can thiệp kịp thời.</p>

<h2>Dấu hiệu bé đang sợ học toán</h2>
<ul>
  <li>Tìm cách trì hoãn, trốn tránh khi đến giờ học toán.</li>
  <li>Khóc hoặc cáu kỉnh khi được yêu cầu làm bài toán.</li>
  <li>Hay nói "Con không biết làm" mà chưa thực sự cố gắng.</li>
  <li>Lo lắng quá mức trước các bài kiểm tra toán.</li>
  <li>Kết quả học toán ngày càng giảm dù bé có trí tuệ bình thường.</li>
</ul>

<h2>Nguyên tắc vàng: Không bao giờ la mắng khi bé làm sai toán</h2>
<p>Đây là nguyên tắc quan trọng nhất. Khi bé làm sai, não bộ của trẻ liên kết việc học toán với cảm xúc tiêu cực (sợ hãi, xấu hổ). Về lâu dài, não bộ sẽ tự động "né tránh" toán học như một cơ chế tự bảo vệ. Thay vào đó, hãy nói: "Con làm sai rồi, nhưng không sao. Cùng xem lại nhé!"</p>

<h2>Bắt đầu từ những bài siêu dễ</h2>
<p>Nếu bé đang sợ toán, hãy bắt đầu lại từ những bài toán cực kỳ đơn giản mà bé chắc chắn làm đúng. Mục tiêu không phải là học kiến thức mới, mà là xây dựng lại sự tự tin. Khi bé làm đúng nhiều lần liên tiếp, não bộ bắt đầu liên kết toán học với cảm giác thành công.</p>

<h2>Khen ngợi đúng cách – khen quá trình, không khen kết quả</h2>
<p>Nghiên cứu tâm lý học cho thấy khen ngợi đúng cách có tác động lớn đến thái độ học tập của trẻ:</p>
<ul>
  <li>Thay vì nói "Con thông minh quá!", hãy nói "Con đã cố gắng rất nhiều để làm bài này!"</li>
  <li>Thay vì nói "Con giỏi lắm!", hãy nói "Con đã không bỏ cuộc dù bài khó, ba/mẹ rất tự hào!"</li>
  <li>Ghi nhận quá trình suy nghĩ: "Ba/mẹ thấy con đang cố gắng suy nghĩ rồi đó!"</li>
</ul>

<h2>Biến toán học thành trò chơi vui</h2>
<p>Khi bé đang trong trạng thái sợ, đừng bao giờ bắt bé ngồi vào bàn học. Thay vào đó, lồng ghép toán học vào các hoạt động bé yêu thích: nấu ăn, xây lego, vẽ tranh, chơi ngoài sân. Bé sẽ không nhận ra mình đang học toán.</p>

<h2>Kể chuyện toán học</h2>
<p>Tạo ra những câu chuyện ngắn có nhân vật bé yêu thích, trong đó nhân vật cần giải quyết một vấn đề toán học. Ví dụ: "Bạn gấu có 5 cái mật ong, bạn ấy muốn chia đều cho 2 bạn. Làm thế nào đây?" – Khi được đặt trong bối cảnh câu chuyện, bé sẽ giải toán mà không cảm thấy áp lực.</p>

<h2>Đặt mục tiêu nhỏ và ăn mừng mỗi tiến bộ</h2>
<ul>
  <li>Đặt mục tiêu cụ thể, nhỏ và dễ đạt được trong tuần đầu tiên.</li>
  <li>Khi bé đạt được mục tiêu, ăn mừng theo cách bé thích: đi ăn kem, xem phim hoạt hình, được chơi game thêm.</li>
  <li>Ghi lại tiến bộ của bé vào một "nhật ký toán học" – bé sẽ rất thích nhìn lại chặng đường mình đã đi.</li>
</ul>

<h2>Kết luận</h2>
<p>Nỗi sợ học toán không phải là bẩm sinh – đó là kết quả của những trải nghiệm tiêu cực có thể thay đổi được. Với sự kiên nhẫn, tình yêu thương và những phương pháp đúng đắn, phụ huynh hoàn toàn có thể giúp bé vượt qua nỗi sợ và tìm thấy niềm vui trong toán học.</p>`,
    },
    {
      title: 'Cách dạy bé so sánh số lớn hơn, nhỏ hơn, bằng nhau',
      slug: 'cach-day-be-so-sanh-so-lon-hon-nho-hon-bang-nhau',
      excerpt:
        'So sánh số là kỹ năng quan trọng trong chương trình toán lớp 1, giúp bé hiểu về thứ tự và giá trị của các số. Bài viết hướng dẫn cách dạy bé sử dụng đúng ký hiệu >, < và = thông qua các hình ảnh trực quan, câu chuyện vui và bài tập thực hành đa dạng.',
      content: `<h2>Khái niệm so sánh số trong chương trình lớp 1</h2>
<p>Chương trình toán lớp 1 yêu cầu bé so sánh và sắp xếp các số trong phạm vi đã học. Bé cần hiểu và sử dụng đúng ba ký hiệu: > (lớn hơn), < (nhỏ hơn), và = (bằng nhau). Đây là kỹ năng nền tảng cho việc học toán ở các lớp tiếp theo.</p>

<h2>Câu chuyện "Cá mập đói" – mẹo nhớ ký hiệu > và <</h2>
<p>Đây là câu chuyện giúp vô số trẻ em nhớ được ký hiệu so sánh. Hãy kể cho bé nghe: "Có một con cá mập rất tham ăn. Miệng cá mập luôn há to về phía số lớn hơn vì nó muốn nuốt số lớn đó!" Vẽ hình con cá mập với miệng mở về phía số lớn, bé sẽ nhớ ngay quy tắc sử dụng ký hiệu.</p>

<h2>Phương pháp sử dụng vật thể trực quan</h2>
<p>Trước khi dùng ký hiệu trừu tượng, hãy dùng vật thể thực tế để bé cảm nhận "lớn hơn" và "nhỏ hơn":</p>
<ul>
  <li>Xếp 7 khối lego và 4 khối lego, hỏi bé: "Bên nào nhiều hơn?"</li>
  <li>Đổ nước vào 2 cốc với lượng khác nhau, hỏi: "Cốc nào nhiều nước hơn?"</li>
  <li>So sánh chiều cao của 2 cây bút chì, hỏi: "Cây bút chì nào dài hơn?"</li>
</ul>

<h2>Dùng thanh số (number line) để so sánh</h2>
<p>Vẽ một thanh số từ 0 đến 20 trên giấy. Khi cần so sánh hai số, bé tìm vị trí của hai số trên thanh số. Số nằm bên phải thì lớn hơn, số nằm bên trái thì nhỏ hơn. Phương pháp này giúp bé hiểu trực quan về thứ tự các số.</p>

<h2>Dạy bé đọc và viết ký hiệu đúng cách</h2>
<ul>
  <li>Ký hiệu > (lớn hơn): Đầu nhọn chỉ vào số nhỏ hơn, miệng mở về phía số lớn hơn.</li>
  <li>Ký hiệu < (nhỏ hơn): Đầu nhọn chỉ vào số nhỏ hơn, miệng mở về phía số lớn hơn.</li>
  <li>Ký hiệu = (bằng nhau): Hai số bằng nhau, dùng hai gạch ngang bằng nhau.</li>
</ul>
<p>Mẹo đọc: "7 > 4" đọc là "7 lớn hơn 4"; "3 < 8" đọc là "3 nhỏ hơn 8".</p>

<h2>Bài tập so sánh dạng điền ký hiệu</h2>
<p>Đây là dạng bài phổ biến nhất trong sách giáo khoa: "Điền >, < hoặc = vào ô trống: 5 __ 8". Bé cần nhìn hai số, xác định số nào lớn hơn, rồi điền ký hiệu phù hợp.</p>
<ul>
  <li>Luyện tập trước bằng miệng: "5 và 8, số nào lớn hơn?" – "8 lớn hơn" – "Vậy ta điền ký hiệu gì?"</li>
  <li>Sau đó mới cho bé tự điền vào bài tập viết.</li>
  <li>Kiểm tra bằng cách đọc lại: "5 nhỏ hơn 8, đúng không?"</li>
</ul>

<h2>So sánh và sắp xếp dãy số</h2>
<p>Sau khi thành thạo so sánh hai số, bé cần học sắp xếp dãy số theo thứ tự tăng dần hoặc giảm dần. Bắt đầu với 3 số, sau tăng dần lên 4–5 số.</p>

<h2>Kết luận</h2>
<p>So sánh số là kỹ năng học toán quan trọng nhưng hoàn toàn có thể học vui vẻ thông qua câu chuyện con cá mập tham ăn, dùng vật thể thực tế và thanh số trực quan. Khi bé hiểu bản chất của việc so sánh, việc sử dụng ký hiệu toán học sẽ trở nên tự nhiên và dễ dàng.</p>`,
    },
    {
      title: 'Mẹo giải bài toán điền số vào ô trống cho bé lớp 1',
      slug: 'meo-giai-bai-toan-dien-so-vao-o-trong-cho-be-lop-1',
      excerpt:
        'Bài toán điền số vào ô trống là dạng bài thường xuyên xuất hiện trong đề kiểm tra toán lớp 1, nhưng nhiều bé lại hay bị nhầm lẫn. Bài viết phân tích các dạng bài điền số thường gặp và hướng dẫn cách tiếp cận từng dạng một cách có hệ thống, kèm theo các mẹo thực hành hiệu quả tại nhà.',
      content: `<h2>Các dạng bài toán điền số vào ô trống lớp 1</h2>
<p>Trong chương trình toán lớp 1, bài toán điền số vào ô trống xuất hiện ở nhiều dạng khác nhau. Phụ huynh cần hiểu rõ từng dạng để hướng dẫn bé đúng cách:</p>
<ul>
  <li><strong>Dạng 1:</strong> Điền kết quả phép tính: 3 + 4 = ☐</li>
  <li><strong>Dạng 2:</strong> Điền số hạng trong phép cộng: 3 + ☐ = 7</li>
  <li><strong>Dạng 3:</strong> Điền số trừ trong phép trừ: 8 - ☐ = 5</li>
  <li><strong>Dạng 4:</strong> Điền số vào dãy số: 2, 4, ☐, 8, 10</li>
  <li><strong>Dạng 5:</strong> Điền ký hiệu so sánh: 5 ☐ 8</li>
</ul>

<h2>Cách giải dạng 1: Điền kết quả phép tính</h2>
<p>Đây là dạng dễ nhất. Bé thực hiện phép tính và điền kết quả vào ô trống. Lỗi thường gặp là tính nhầm hoặc bỏ sót các bước. Hãy nhắc bé kiểm tra lại bằng cách tính ngược: nếu 3 + 4 = 7, thì 7 - 4 phải bằng 3.</p>

<h2>Cách giải dạng 2: Điền số hạng còn thiếu</h2>
<p>Khi gặp "3 + ☐ = 7", bé cần hiểu: "3 cộng với bao nhiêu thì bằng 7?" Phương pháp giải:</p>
<ul>
  <li>Đếm tiếp từ 3 đến 7: 4, 5, 6, 7 – đếm được 4 số nên ☐ = 4.</li>
  <li>Dùng phép trừ: 7 - 3 = 4, vậy ☐ = 4.</li>
  <li>Kiểm tra lại: 3 + 4 = 7 đúng không? Đúng rồi!</li>
</ul>

<h2>Cách giải dạng 3: Điền số trong phép trừ</h2>
<p>Khi gặp "8 - ☐ = 5", bé cần tìm số bị trừ. Phương pháp:</p>
<ul>
  <li>Hỏi: "8 trừ đi bao nhiêu thì còn 5?" – Đếm từ 5 đến 8: 6, 7, 8 – đếm được 3 số, vậy ☐ = 3.</li>
  <li>Dùng mối quan hệ: 8 - 5 = 3, vậy ☐ = 3.</li>
  <li>Kiểm tra: 8 - 3 = 5 đúng không?</li>
</ul>

<h2>Cách giải dạng 4: Điền số vào dãy số</h2>
<p>Dạng này yêu cầu bé nhận ra quy luật của dãy số. Hãy dạy bé tìm khoảng cách giữa các số liền nhau:</p>
<ul>
  <li>Dãy: 2, 4, ☐, 8, 10 → Khoảng cách là 2 → ☐ = 6.</li>
  <li>Dãy: 10, 8, ☐, 4, 2 → Khoảng cách giảm 2 → ☐ = 6.</li>
  <li>Dãy: 1, 2, 3, ☐, 5 → Khoảng cách là 1 → ☐ = 4.</li>
</ul>

<h2>Lỗi thường gặp và cách khắc phục</h2>
<ul>
  <li>Nhầm vị trí của ô trống: Đọc kỹ đề trước khi tính.</li>
  <li>Quên kiểm tra lại đáp án: Thay số vừa tìm vào ô trống và tính lại.</li>
  <li>Nhầm dạng bài: Xác định rõ đây là phép cộng hay phép trừ.</li>
</ul>

<h2>Bài tập luyện tập tại nhà</h2>
<p>Mỗi ngày, phụ huynh viết ra giấy 5 bài toán điền số vào ô trống, xen kẽ các dạng khác nhau. Đây là cách tốt nhất để bé làm quen với đa dạng các dạng bài và tránh nhầm lẫn trong kiểm tra.</p>

<h2>Kết luận</h2>
<p>Bài toán điền số vào ô trống không khó nếu bé được dạy từng dạng một cách có hệ thống. Chìa khóa thành công là hiểu mối quan hệ giữa phép cộng và phép trừ, luôn kiểm tra lại đáp án và luyện tập đều đặn mỗi ngày.</p>`,
    },
    {
      title: 'Tổng hợp dạng bài toán lớp 1 thường gặp và cách giải',
      slug: 'tong-hop-dang-bai-toan-lop-1-thuong-gap-va-cach-giai',
      excerpt:
        'Chương trình toán lớp 1 bao gồm nhiều dạng bài khác nhau, từ cộng trừ cơ bản đến so sánh, hình học và toán có lời văn. Bài viết tổng hợp đầy đủ các dạng bài thường xuất hiện trong đề kiểm tra lớp 1 kèm theo hướng dẫn giải chi tiết, giúp phụ huynh và bé ôn tập toàn diện trước kỳ thi.',
      content: `<h2>Tổng quan chương trình toán lớp 1</h2>
<p>Chương trình toán lớp 1 được chia thành các chủ đề chính: số học (đếm, đọc, viết số), phép tính (cộng, trừ trong phạm vi 10 và 20), so sánh số, hình học cơ bản và toán có lời văn. Phụ huynh cần nắm rõ từng dạng bài để hỗ trợ bé ôn tập hiệu quả.</p>

<h2>Dạng 1: Đọc, viết và so sánh số</h2>
<p>Đây là nhóm bài cơ bản nhất. Bé cần:</p>
<ul>
  <li>Đọc và viết số từ 0 đến 100.</li>
  <li>Viết số theo thứ tự tăng dần và giảm dần.</li>
  <li>Điền số còn thiếu trong dãy số.</li>
  <li>So sánh hai số dùng ký hiệu >, < , =.</li>
  <li>Xác định số liền trước, liền sau của một số.</li>
</ul>

<h2>Dạng 2: Phép cộng trong phạm vi 10 và 20</h2>
<p>Bé cần thành thạo:</p>
<ul>
  <li>Tính cộng hai số có tổng không vượt quá 10.</li>
  <li>Tính cộng hai số có tổng trong phạm vi 20 (giai đoạn cuối năm).</li>
  <li>Cộng nhiều số (3 + 2 + 1 = ?).</li>
  <li>Điền số hạng còn thiếu (☐ + 3 = 8).</li>
</ul>

<h2>Dạng 3: Phép trừ trong phạm vi 10 và 20</h2>
<ul>
  <li>Thực hiện phép trừ cho kết quả không âm.</li>
  <li>Điền số bị trừ hoặc số trừ còn thiếu.</li>
  <li>Nhận biết mối quan hệ giữa phép cộng và phép trừ.</li>
</ul>

<h2>Dạng 4: Hình học cơ bản</h2>
<ul>
  <li>Nhận biết hình tròn, hình vuông, hình chữ nhật, hình tam giác.</li>
  <li>Đếm số hình trong một bức tranh cho trước.</li>
  <li>Ghép hình từ các hình học cơ bản.</li>
  <li>Phân biệt hình theo đặc điểm (số cạnh, số góc).</li>
</ul>

<h2>Dạng 5: Toán có lời văn</h2>
<p>Đây là dạng bài tổng hợp, yêu cầu bé:</p>
<ul>
  <li>Đọc hiểu đề bài, xác định đề cho gì, hỏi gì.</li>
  <li>Chọn phép tính phù hợp (cộng hoặc trừ).</li>
  <li>Trình bày đủ: câu lời giải, phép tính, đáp số.</li>
</ul>

<h2>Dạng 6: Đo lường và thời gian (cuối năm)</h2>
<ul>
  <li>So sánh độ dài bằng trực quan hoặc đơn vị đo không chuẩn.</li>
  <li>Đọc giờ đúng trên đồng hồ (7 giờ, 8 giờ...).</li>
  <li>Nhận biết các buổi trong ngày: sáng, trưa, chiều, tối.</li>
</ul>

<h2>Kế hoạch ôn tập toàn diện</h2>
<p>Để ôn tập hiệu quả trước kỳ kiểm tra, phụ huynh có thể lập kế hoạch như sau:</p>
<ul>
  <li>Tuần 1: Ôn tập số học và so sánh số.</li>
  <li>Tuần 2: Ôn tập phép cộng trừ và điền số vào ô trống.</li>
  <li>Tuần 3: Ôn tập hình học và toán có lời văn.</li>
  <li>Tuần 4: Làm đề kiểm tra tổng hợp, chữa bài và ôn lại phần yếu.</li>
</ul>

<h2>Nguồn tài liệu ôn tập</h2>
<ul>
  <li>Sách giáo khoa và sách bài tập toán lớp 1.</li>
  <li>Vở ô ly tự làm bài tập theo từng dạng.</li>
  <li>Các trang web và ứng dụng học toán dành cho lớp 1.</li>
  <li>Đề kiểm tra các năm trước (có thể tìm trên mạng hoặc xin từ giáo viên).</li>
</ul>

<h2>Kết luận</h2>
<p>Nắm vững tất cả các dạng bài toán lớp 1 không phải là điều khó khăn nếu bé được học đúng phương pháp và luyện tập đều đặn. Phụ huynh hãy kiên nhẫn đồng hành cùng bé, tập trung vào những phần bé còn yếu và luôn tạo không khí học tập vui vẻ, tích cực. Thành công trong toán lớp 1 sẽ là nền tảng vững chắc cho tất cả các năm học tiếp theo.</p>`,
    },
  ];

  console.log('Starting to insert articles...');

  for (const article of articles) {
    const [result] = await conn.execute(
      `INSERT INTO articles
        (title, slug, excerpt, content, thumbnailUrl, category, tags, isPublished, publishedAt, viewCount, authorName, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, NULL, ?, ?, 1, NOW(), 0, ?, NOW(), NOW())`,
      [
        article.title,
        article.slug,
        article.excerpt,
        article.content,
        category,
        tags,
        authorName,
      ],
    );
    console.log(`Inserted: ${article.title}`);
  }

  await conn.end();
  console.log('Done! 10 articles inserted successfully.');
}

main().catch(console.error);
