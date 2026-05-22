import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: false,
});

type Lesson = {
  title: string;
  slug: string;
  lessonType: string;
  sortOrder: number;
  durationMinutes: number;
  isPublished: boolean;
  isPreview?: boolean;
  content: string;
};

// courseSlug -> new lessons to add (slugs not yet in DB)
const additionalLessons: Record<string, Lesson[]> = {
  'kham-pha-the-gioi-so': [
    { title: 'Nhận biết số trên đồng hồ', slug: 'nhan-biet-so-tren-dong-ho', lessonType: 'interactive', sortOrder: 11, durationMinutes: 12, isPublished: true, content: 'Bé quan sát mặt đồng hồ và nhận biết các số từ 1–12, học khái niệm "kim ngắn – kim dài".' },
    { title: 'Đếm ngược từ 10 về 0', slug: 'dem-nguoc-tu-10-ve-0', lessonType: 'game', sortOrder: 12, durationMinutes: 10, isPublished: true, content: 'Game tên lửa đếm ngược: bé hô đúng số để tên lửa phóng lên vũ trụ.' },
    { title: 'Số chẵn và số lẻ', slug: 'so-chan-va-so-le', lessonType: 'interactive', sortOrder: 13, durationMinutes: 12, isPublished: true, content: 'Bé phân loại các số 1–20 vào hai rổ: rổ chẵn và rổ lẻ bằng kéo thả.' },
    { title: 'Bài toán thực tế — Đếm đồ trong nhà', slug: 'bai-toan-thuc-te-dem-do-trong-nha', lessonType: 'interactive', sortOrder: 14, durationMinutes: 15, isPublished: true, content: 'Bé quan sát phòng khách ảo và đếm số bàn ghế, cửa sổ, bóng đèn…' },
    { title: 'Thứ tự — Cái nào đứng trước, cái nào đứng sau?', slug: 'thu-tu-truoc-sau', lessonType: 'story', sortOrder: 15, durationMinutes: 12, isPublished: true, content: 'Câu chuyện hàng xếp hàng: bé xác định ai đứng thứ 1, thứ 2, thứ 3…' },
    { title: 'Đo lường đơn giản — Cái nào dài hơn?', slug: 'do-luong-don-gian', lessonType: 'interactive', sortOrder: 16, durationMinutes: 12, isPublished: true, content: 'Bé kéo thả thanh đo để so sánh độ dài của các đồ vật trong hình.' },
    { title: 'Ghép đôi số và số chấm', slug: 'ghep-doi-so-va-so-cham', lessonType: 'game', sortOrder: 17, durationMinutes: 10, isPublished: true, content: 'Game kết nối: bé nối số với ô có số chấm tương ứng trong thời gian giới hạn.' },
    { title: 'Phép cộng có kết quả đến 20', slug: 'phep-cong-ket-qua-den-20', lessonType: 'interactive', sortOrder: 18, durationMinutes: 15, isPublished: true, content: 'Bé thực hành các phép cộng từ 10+1 đến 15+5 với hỗ trợ hình ảnh minh họa.' },
    { title: 'Phép trừ trong phạm vi 20', slug: 'phep-tru-trong-pham-vi-20', lessonType: 'game', sortOrder: 19, durationMinutes: 15, isPublished: true, content: 'Game câu cá: mỗi con cá mang một phép trừ, bé trả lời đúng để câu được cá.' },
    { title: 'Luyện tập tổng hợp — Toán vui cuối tuần', slug: 'luyen-tap-tong-hop-toan-vui', lessonType: 'quiz', sortOrder: 20, durationMinutes: 20, isPublished: true, content: '20 câu hỏi hỗn hợp: đếm, so sánh, cộng trừ — hoàn thành để nhận huy chương vàng.' },
  ],

  'be-tap-doc-am-va-van': [
    { title: 'Thanh điệu — Sáu nốt nhạc của tiếng Việt', slug: 'thanh-dieu-sau-not-nhac', lessonType: 'video', sortOrder: 13, durationMinutes: 12, isPublished: true, content: 'Video giải thích 6 thanh điệu qua hình ảnh nốt nhạc và giọng đọc mẫu.' },
    { title: 'Vần UA, ƯA, IA — Bộ ba đặc biệt', slug: 'van-ua-ua-ia', lessonType: 'interactive', sortOrder: 14, durationMinutes: 12, isPublished: true, content: 'Bé nghe âm và kéo thả chữ vào ô vần đúng.' },
    { title: 'Vần ANG, ĂNG, ÂNG — Nhóm vần mũi', slug: 'van-ang-ang-ang', lessonType: 'game', sortOrder: 15, durationMinutes: 12, isPublished: true, content: 'Game bắn bóng: bé bắn bóng có vần đúng để ghi điểm.' },
    { title: 'Vần INH, ANH — Cặp đôi thân thiết', slug: 'van-inh-anh', lessonType: 'interactive', sortOrder: 16, durationMinutes: 10, isPublished: true, content: 'Bé điền vần đúng để hoàn thành từ: b…anh, t…inh, s…anh…' },
    { title: 'Đọc từ ghép — Kết hợp hai từ đơn', slug: 'doc-tu-ghep', lessonType: 'interactive', sortOrder: 17, durationMinutes: 15, isPublished: true, content: 'Bé kéo thả hai từ để ghép thành từ ghép có nghĩa: "nhà + trường = nhà trường".' },
    { title: 'Đọc câu ngắn — Ai làm gì?', slug: 'doc-cau-ngan-ai-lam-gi', lessonType: 'story', sortOrder: 18, durationMinutes: 15, isPublished: true, content: 'Câu chuyện tranh: bé đọc câu ngắn mô tả hành động của nhân vật.' },
    { title: 'Từ trái nghĩa — To và nhỏ, dài và ngắn', slug: 'tu-trai-nghia-to-nho', lessonType: 'interactive', sortOrder: 19, durationMinutes: 12, isPublished: true, content: 'Bé nhìn tranh và chọn từ trái nghĩa phù hợp từ gợi ý.' },
    { title: 'Từ đồng nghĩa — Nhiều tên cho một ý', slug: 'tu-dong-nghia', lessonType: 'game', sortOrder: 20, durationMinutes: 12, isPublished: true, content: 'Bé nối các từ có nghĩa giống nhau: "mẹ = má", "ba = bố"…' },
    { title: 'Đọc đoạn văn ngắn — Buổi sáng của bé', slug: 'doc-doan-van-ngan', lessonType: 'story', sortOrder: 21, durationMinutes: 18, isPublished: true, content: 'Đoạn văn 5 câu mô tả buổi sáng, bé đọc rồi trả lời câu hỏi hiểu bài.' },
    { title: 'Chính tả đầu tiên — Nghe và viết', slug: 'chinh-ta-dau-tien', lessonType: 'interactive', sortOrder: 22, durationMinutes: 15, isPublished: true, content: 'Bé nghe âm thanh và gõ phím điền từ đúng vào ô trống.' },
    { title: 'Thơ thiếu nhi — Học thuộc lòng vui vẻ', slug: 'tho-thieu-nhi-hoc-thuoc-long', lessonType: 'video', sortOrder: 23, durationMinutes: 12, isPublished: true, content: 'Video bài thơ "Bé làm bao nhiêu nghề" — bé nghe và nhắc lại từng câu.' },
    { title: 'Kiểm tra tổng kết: Bé đọc xuất sắc!', slug: 'kiem-tra-tong-ket-doc-xuat-sac', lessonType: 'quiz', sortOrder: 24, durationMinutes: 25, isPublished: true, content: 'Bài kiểm tra cuối toàn khóa: đọc từ, đọc câu, nghe và điền từ — 20 câu hỏi.' },
  ],

  'the-gioi-mau-sac-sang-tao': [
    { title: 'Màu nâu, xám, trắng, đen — Màu trung tính', slug: 'mau-nau-xam-trang-den', lessonType: 'interactive', sortOrder: 9, durationMinutes: 10, isPublished: true, content: 'Bé nhận biết 4 màu trung tính và tìm chúng trong bức tranh phong cảnh.' },
    { title: 'Pha màu kỳ diệu — Đỏ + Xanh = ?', slug: 'pha-mau-ky-dieu', lessonType: 'interactive', sortOrder: 10, durationMinutes: 15, isPublished: true, content: 'Bé kéo thả hai màu vào bình thí nghiệm ảo để xem màu mới sinh ra.' },
    { title: 'Hình thoi, hình chữ nhật, hình bầu dục', slug: 'hinh-thoi-chu-nhat-bau-duc', lessonType: 'interactive', sortOrder: 11, durationMinutes: 12, isPublished: true, content: 'Nhận biết thêm 3 hình dạng mới qua đồ vật quen thuộc.' },
    { title: 'Đối xứng — Hai nửa bằng nhau', slug: 'doi-xung-hai-nua-bang-nhau', lessonType: 'interactive', sortOrder: 12, durationMinutes: 12, isPublished: true, content: 'Bé vẽ nửa còn lại của con bướm, ngôi nhà để tạo hình đối xứng.' },
    { title: 'Tạo hình từ thiên nhiên — Lá, hoa, đá', slug: 'tao-hinh-tu-thien-nhien', lessonType: 'story', sortOrder: 13, durationMinutes: 15, isPublished: true, content: 'Câu chuyện bé đi dã ngoại và tạo tranh từ những chiếc lá nhặt được.' },
    { title: 'Vẽ khuôn mặt — Mắt, mũi, miệng', slug: 've-khuon-mat', lessonType: 'interactive', sortOrder: 14, durationMinutes: 15, isPublished: true, content: 'Bé kéo thả các bộ phận khuôn mặt để tạo ra nhân vật theo ý thích.' },
    { title: 'Hoa văn lặp lại — Trang trí thêm đẹp', slug: 'hoa-van-lap-lai', lessonType: 'interactive', sortOrder: 15, durationMinutes: 12, isPublished: true, content: 'Bé chọn hình và kéo lặp lại để tạo hoa văn trang trí khung ảnh.' },
    { title: 'Tô màu theo số — Paint by numbers', slug: 'to-mau-theo-so', lessonType: 'game', sortOrder: 16, durationMinutes: 18, isPublished: true, content: 'Mỗi vùng có số, bé chọn màu tương ứng để hoàn thành bức tranh ẩn.' },
    { title: 'Tranh cắt dán — Làng quê Việt Nam', slug: 'tranh-cat-dan-lang-que', lessonType: 'interactive', sortOrder: 17, durationMinutes: 18, isPublished: true, content: 'Bé kéo thả các mảnh giấy màu để ghép thành tranh làng quê có lúa, trâu, cây dừa.' },
    { title: 'Nhận xét tranh — Tôi thấy gì trong tranh?', slug: 'nhan-xet-tranh', lessonType: 'quiz', sortOrder: 18, durationMinutes: 15, isPublished: true, content: 'Bé xem tranh và trả lời câu hỏi: "Có mấy màu? Hình gì? Bức tranh vẽ về điều gì?"' },
  ],

  'cam-xuc-cua-be': [
    { title: 'Xấu hổ — Khi mặt bé đỏ lên', slug: 'cam-xuc-xau-ho', lessonType: 'story', sortOrder: 9, durationMinutes: 12, isPublished: true, content: 'Câu chuyện bé bị vấp ngã trước lớp và cảm giác xấu hổ — cùng tìm cách vượt qua.' },
    { title: 'Ghen tị — Khi bạn có thứ mình không có', slug: 'cam-xuc-ghen-ti', lessonType: 'interactive', sortOrder: 10, durationMinutes: 15, isPublished: true, content: 'Bé chọn cách phản ứng đúng khi bạn có đồ chơi mới mà mình không có.' },
    { title: 'Thất vọng — Khi điều mình mong không xảy ra', slug: 'cam-xuc-that-vong', lessonType: 'video', sortOrder: 11, durationMinutes: 12, isPublished: true, content: 'Video hoạt hình về bé Gấu không được đi chơi vì trời mưa — và cách chuyển sang hoạt động khác.' },
    { title: 'Biết ơn — Nói lời cảm ơn từ trái tim', slug: 'cam-xuc-biet-on', lessonType: 'interactive', sortOrder: 12, durationMinutes: 12, isPublished: true, content: 'Bé nhìn tình huống và chọn lời cảm ơn phù hợp cho từng người đã giúp mình.' },
    { title: 'Tha thứ — Khi bạn làm mình buồn', slug: 'cam-xuc-tha-thu', lessonType: 'story', sortOrder: 13, durationMinutes: 15, isPublished: true, content: 'Câu chuyện bé Thỏ và Sóc làm hỏng đồ chơi của nhau — và hành trình làm hòa.' },
    { title: 'Kiên nhẫn — Đợi đến lượt mình', slug: 'cam-xuc-kien-nhan', lessonType: 'game', sortOrder: 14, durationMinutes: 12, isPublished: true, content: 'Game xếp hàng: bé thực hành đợi đến lượt mình để nhận phần thưởng.' },
    { title: 'Tự kiểm soát cảm xúc — Hít thở và bình tĩnh', slug: 'tu-kiem-soat-cam-xuc', lessonType: 'interactive', sortOrder: 15, durationMinutes: 15, isPublished: true, content: 'Bé thực hành kỹ thuật hít thở 4-7-8 theo hướng dẫn hình ảnh để bình tĩnh lại.' },
    { title: 'Cảm xúc qua âm nhạc — Nhạc vui và nhạc buồn', slug: 'cam-xuc-qua-am-nhac', lessonType: 'interactive', sortOrder: 16, durationMinutes: 12, isPublished: true, content: 'Bé nghe đoạn nhạc ngắn và chọn khuôn mặt cảm xúc tương ứng.' },
    { title: 'Nhật ký cảm xúc — Hôm nay bé cảm thấy thế nào?', slug: 'nhat-ky-cam-xuc', lessonType: 'interactive', sortOrder: 17, durationMinutes: 15, isPublished: true, content: 'Bé điền vào "nhật ký" ảo: chọn cảm xúc trong ngày và kể điều đã xảy ra.' },
    { title: 'Kiểm tra tổng kết: Chuyên gia cảm xúc nhỏ', slug: 'kiem-tra-tong-ket-cam-xuc', lessonType: 'quiz', sortOrder: 18, durationMinutes: 20, isPublished: true, content: 'Bé xem 10 tình huống và trả lời: cảm xúc gì — tại sao — nên làm gì tiếp theo.' },
  ],

  'tu-duy-logic-be-tham-tu': [
    { title: 'Quy luật số — Tiếp theo là số mấy?', slug: 'quy-luat-so-tiep-theo', lessonType: 'interactive', sortOrder: 11, durationMinutes: 15, isPublished: true, content: 'Bé quan sát dãy số có quy luật (+2, +3, x2…) và điền số tiếp theo.' },
    { title: 'Đối lập — Điều ngược lại là gì?', slug: 'doi-lap-dieu-nguoc-lai', lessonType: 'interactive', sortOrder: 12, durationMinutes: 12, isPublished: true, content: 'Bé nhìn hình minh họa và chọn từ đối lập: nhanh–chậm, ngày–đêm, trên–dưới.' },
    { title: 'Loại bỏ — Cái nào không thuộc nhóm?', slug: 'loai-bo-cai-nao-khong-thuoc-nhom', lessonType: 'game', sortOrder: 13, durationMinutes: 12, isPublished: true, content: 'Bé nhìn 4 đồ vật và loại bỏ 1 cái không cùng nhóm, giải thích lý do.' },
    { title: 'Suy luận nhân quả — Nếu… thì…', slug: 'suy-luan-nhan-qua', lessonType: 'interactive', sortOrder: 14, durationMinutes: 15, isPublished: true, content: 'Bé chọn kết quả đúng cho mỗi tình huống: "Nếu trời mưa thì…", "Nếu bé ăn nhiều thì…"' },
    { title: 'Mã màu bí mật — Giải mã kho báu', slug: 'ma-mau-bi-mat', lessonType: 'game', sortOrder: 15, durationMinutes: 15, isPublished: true, content: 'Bé dùng mã màu (đỏ=1, xanh=2, vàng=3) để đọc "mật thư" và tìm kho báu.' },
    { title: 'Bản đồ đơn giản — Bé biết đọc bản đồ', slug: 'ban-do-don-gian', lessonType: 'interactive', sortOrder: 16, durationMinutes: 15, isPublished: true, content: 'Bé đọc bản đồ khu phố đơn giản và tìm đường ngắn nhất từ nhà đến trường.' },
    { title: 'So sánh — Điểm giống và khác nhau', slug: 'so-sanh-giong-va-khac', lessonType: 'interactive', sortOrder: 17, durationMinutes: 12, isPublished: true, content: 'Bé điền vào bảng Venn: điểm giống và khác nhau giữa mèo và chó, giữa mùa hè và mùa đông.' },
    { title: 'Câu đố toán học vui — Bé giải đố', slug: 'cau-do-toan-hoc-vui', lessonType: 'quiz', sortOrder: 18, durationMinutes: 15, isPublished: true, content: 'Bé giải 8 câu đố toán logic dạng lời văn dành cho tuổi tiểu học.' },
    { title: 'Xây dựng quy tắc — Tôi nghĩ ra luật chơi', slug: 'xay-dung-quy-tac', lessonType: 'interactive', sortOrder: 19, durationMinutes: 18, isPublished: true, content: 'Bé được tự đặt quy tắc phân loại đồ vật và xem máy tính áp dụng quy tắc đó.' },
    { title: 'Thám tử cấp độ cuối — Vụ án bí ẩn', slug: 'tham-tu-cap-do-cuoi', lessonType: 'game', sortOrder: 20, durationMinutes: 25, isPublished: true, content: 'Nhiệm vụ tổng hợp: bé thu thập manh mối, giải mê cung, giải mã và tìm thủ phạm.' },
  ],

  'tieng-anh-vo-long': [
    { title: 'Greetings — Good morning! Good night!', slug: 'greetings-good-morning', lessonType: 'interactive', sortOrder: 11, durationMinutes: 10, isPublished: true, content: 'Bé học lời chào theo thời gian trong ngày và luyện nói theo hình ảnh gợi ý.' },
    { title: 'Clothes — Bé mặc gì hôm nay?', slug: 'clothes-be-mac-gi', lessonType: 'interactive', sortOrder: 12, durationMinutes: 12, isPublished: true, content: 'Bé kéo thả quần áo lên nhân vật và nghe tên tiếng Anh: shirt, pants, dress, hat…' },
    { title: 'Weather — How is the weather today?', slug: 'weather-how-is-the-weather', lessonType: 'video', sortOrder: 13, durationMinutes: 10, isPublished: true, content: 'Video bài hát về thời tiết: sunny, rainy, cloudy, snowy.' },
    { title: 'Toys — Đồ chơi yêu thích của bé', slug: 'toys-do-choi-yeu-thich', lessonType: 'game', sortOrder: 14, durationMinutes: 12, isPublished: true, content: 'Bé nghe tên đồ chơi và tìm đúng đồ vật trong căn phòng ảo.' },
    { title: 'Action verbs — Jump! Run! Clap!', slug: 'action-verbs-jump-run-clap', lessonType: 'video', sortOrder: 15, durationMinutes: 12, isPublished: true, content: 'Bài thể dục tiếng Anh: bé nghe lệnh và thực hiện hành động theo.' },
    { title: 'Opposites — Big and small, hot and cold', slug: 'opposites-big-small', lessonType: 'interactive', sortOrder: 16, durationMinutes: 12, isPublished: true, content: 'Bé nối cặp từ đối lập qua hình ảnh trực quan.' },
    { title: 'Places — School, park, market, hospital', slug: 'places-school-park', lessonType: 'story', sortOrder: 17, durationMinutes: 15, isPublished: true, content: 'Câu chuyện bé Teddy đi dạo phố và gặp các địa điểm quen thuộc.' },
    { title: 'Questions — What is this? Who is that?', slug: 'questions-what-who', lessonType: 'interactive', sortOrder: 18, durationMinutes: 15, isPublished: true, content: 'Bé luyện hỏi đáp đơn giản bằng tiếng Anh qua flashcard hình ảnh.' },
    { title: 'My day — Morning routine in English', slug: 'my-day-morning-routine', lessonType: 'video', sortOrder: 19, durationMinutes: 12, isPublished: true, content: 'Video hoạt hình về buổi sáng của bé Tim: wake up, brush teeth, eat breakfast, go to school.' },
    { title: 'Song — "If You\'re Happy and You Know It"', slug: 'song-if-youre-happy', lessonType: 'video', sortOrder: 20, durationMinutes: 8, isPublished: true, content: 'Bé học bài hát kinh điển kết hợp cảm xúc và hành động tiếng Anh.' },
    { title: 'Review — My English picture book', slug: 'review-my-english-picture-book', lessonType: 'interactive', sortOrder: 21, durationMinutes: 18, isPublished: true, content: 'Bé "vẽ" và dán nhãn tiếng Anh cho các đồ vật để tạo cuốn sách tranh của riêng mình.' },
    { title: 'Final test — English star certificate', slug: 'final-test-english-star', lessonType: 'quiz', sortOrder: 22, durationMinutes: 25, isPublished: true, content: '25 câu hỏi nghe–nhìn–chọn–nối, bé đạt 80% để nhận chứng chỉ "English Star".' },
  ],
};

async function seedLessons() {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    for (const [courseSlug, lessons] of Object.entries(additionalLessons)) {
      const courseRows = await queryRunner.query(
        'SELECT id, title FROM courses WHERE slug = ?',
        [courseSlug],
      );
      if (courseRows.length === 0) {
        console.log(`Course not found: ${courseSlug}`);
        continue;
      }
      const { id: courseId, title: courseTitle } = courseRows[0];
      console.log(`\nAdding lessons to: ${courseTitle} (id=${courseId})`);

      for (const lesson of lessons) {
        const existing = await queryRunner.query(
          'SELECT id FROM lessons WHERE courseId = ? AND slug = ?',
          [courseId, lesson.slug],
        );
        if (existing.length > 0) {
          console.log(`  [skip] ${lesson.title}`);
          continue;
        }
        await queryRunner.query(
          `INSERT INTO lessons
           (courseId, title, slug, content, lessonType, sortOrder, durationMinutes,
            isPreview, isPublished, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            courseId,
            lesson.title,
            lesson.slug,
            lesson.content,
            lesson.lessonType,
            lesson.sortOrder,
            lesson.durationMinutes,
            lesson.isPreview ? 1 : 0,
            lesson.isPublished ? 1 : 0,
          ],
        );
        console.log(`  [+] ${lesson.title}`);
      }

      // Update totalLessons count
      const countRows = await queryRunner.query(
        'SELECT COUNT(*) as cnt FROM lessons WHERE courseId = ?',
        [courseId],
      );
      const total = countRows[0].cnt;
      await queryRunner.query(
        'UPDATE courses SET totalLessons = ? WHERE id = ?',
        [total, courseId],
      );
      console.log(`  → totalLessons updated to ${total}`);
    }

    console.log('\nDone!');
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seedLessons().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
