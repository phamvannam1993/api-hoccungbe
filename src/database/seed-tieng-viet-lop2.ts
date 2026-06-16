import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

const COURSE_SLUG = 'tieng-viet-lop-2';

type LessonSeed = {
  title: string;
  slug: string;
  lessonType: 'interactive' | 'quiz' | 'story' | 'video' | 'game';
  sortOrder: number;
  durationMinutes: number;
  content: string;
};

// Tập 1: sortOrder 1-32 — 4 chủ đề
// Tập 2: sortOrder 33-62 — 5 chủ đề
const LESSONS: LessonSeed[] = [
  // ─── Tập 1 — Chủ đề 1: Em lớn lên từng ngày ────────────────────────────────
  { title: 'Bài 1: Tôi là học sinh lớp 2', slug: 'toi-la-hoc-sinh-lop-2', lessonType: 'story', sortOrder: 1, durationMinutes: 15, content: 'Bé đọc bài văn về cảm xúc háo hức khi bước vào năm học mới với tư cách là học sinh lớp 2.' },
  { title: 'Bài 2: Ngày hôm qua đâu rồi?', slug: 'ngay-hom-qua-dau-roi', lessonType: 'story', sortOrder: 2, durationMinutes: 15, content: 'Bài thơ giúp bé suy nghĩ về thời gian trôi qua và trân trọng từng ngày được học tập vui chơi.' },
  { title: 'Bài 3: Niềm vui của Bi và Bống', slug: 'niem-vui-cua-bi-va-bong', lessonType: 'story', sortOrder: 3, durationMinutes: 15, content: 'Câu chuyện về hai anh em Bi và Bống cùng nhau khám phá niềm vui trong cuộc sống hàng ngày.' },
  { title: 'Bài 4: Làm việc thật là vui', slug: 'lam-viec-that-la-vui', lessonType: 'story', sortOrder: 4, durationMinutes: 15, content: 'Bài đọc về niềm vui khi làm việc và giúp đỡ mọi người, khuyến khích bé hình thành thói quen tốt.' },
  { title: 'Bài 5: Em có xinh không?', slug: 'em-co-xinh-khong', lessonType: 'story', sortOrder: 5, durationMinutes: 15, content: 'Câu chuyện dí dỏm về bé gái hỏi mọi người xung quanh và bài học về vẻ đẹp thực sự đến từ tâm hồn.' },
  { title: 'Bài 6: Một giờ học', slug: 'mot-gio-hoc', lessonType: 'story', sortOrder: 6, durationMinutes: 15, content: 'Bài đọc miêu tả một giờ học thú vị trên lớp, giúp bé hiểu thêm về hoạt động học tập hàng ngày.' },
  { title: 'Bài 7: Cây xấu hổ', slug: 'cay-xau-ho', lessonType: 'story', sortOrder: 7, durationMinutes: 15, content: 'Câu chuyện về cây xấu hổ khép lá lại khi bị chạm vào và bài học về sự tự tin vào bản thân.' },
  { title: 'Bài 8: Cầu thủ dự bị', slug: 'cau-thu-du-bi', lessonType: 'story', sortOrder: 8, durationMinutes: 15, content: 'Câu chuyện về cầu thủ dự bị kiên nhẫn chờ đợi cơ hội và bài học về sự cố gắng không bỏ cuộc.' },

  // ─── Tập 1 — Chủ đề 2: Đi học vui sao ─────────────────────────────────────
  { title: 'Bài 9: Cô giáo lớp em', slug: 'co-giao-lop-em', lessonType: 'story', sortOrder: 9, durationMinutes: 15, content: 'Bài thơ thể hiện tình cảm yêu quý và biết ơn của học sinh dành cho cô giáo thân yêu.' },
  { title: 'Bài 10: Thời khoá biểu', slug: 'thoi-khoa-bieu', lessonType: 'story', sortOrder: 10, durationMinutes: 15, content: 'Bài đọc giúp bé hiểu về thời khoá biểu và cách sắp xếp các môn học trong tuần.' },
  { title: 'Bài 11: Cái trống trường em', slug: 'cai-trong-truong-em', lessonType: 'story', sortOrder: 11, durationMinutes: 15, content: 'Bài thơ về tiếng trống trường quen thuộc báo hiệu giờ vào học và ra chơi mỗi ngày.' },
  { title: 'Bài 12: Danh sách học sinh', slug: 'danh-sach-hoc-sinh', lessonType: 'story', sortOrder: 12, durationMinutes: 15, content: 'Bài đọc về danh sách học sinh trong lớp và ý nghĩa của việc gọi tên điểm danh mỗi buổi sáng.' },
  { title: 'Bài 13: Yêu lắm trường ơi!', slug: 'yeu-lam-truong-oi', lessonType: 'story', sortOrder: 13, durationMinutes: 15, content: 'Bài thơ bày tỏ tình cảm yêu mến ngôi trường thân yêu nơi bé học tập và lớn lên mỗi ngày.' },
  { title: 'Bài 14: Em học vẽ', slug: 'em-hoc-ve', lessonType: 'story', sortOrder: 14, durationMinutes: 15, content: 'Câu chuyện về bé học vẽ và khám phá niềm vui sáng tạo qua những bức tranh màu sắc.' },
  { title: 'Bài 15: Cuốn sách của em', slug: 'cuon-sach-cua-em', lessonType: 'story', sortOrder: 15, durationMinutes: 15, content: 'Bài đọc về tình yêu sách và những điều kỳ diệu mà sách mang lại cho bé mỗi ngày.' },
  { title: 'Bài 16: Khi trang sách mở ra', slug: 'khi-trang-sach-mo-ra', lessonType: 'story', sortOrder: 16, durationMinutes: 15, content: 'Bài thơ về thế giới tuyệt vời mở ra trước mắt khi bé lật từng trang sách đọc.' },

  // ─── Tập 1 — Chủ đề 3: Niềm vui tuổi thơ ──────────────────────────────────
  { title: 'Bài 17: Gọi bạn', slug: 'goi-ban', lessonType: 'story', sortOrder: 17, durationMinutes: 15, content: 'Bài thơ về tiếng gọi bạn vui vẻ để cùng nhau ra chơi và tận hưởng tuổi thơ tươi đẹp.' },
  { title: 'Bài 18: Tớ nhớ cậu', slug: 'to-nho-cau', lessonType: 'story', sortOrder: 18, durationMinutes: 15, content: 'Câu chuyện về tình bạn thân thiết và nỗi nhớ khi phải xa bạn trong những ngày nghỉ.' },
  { title: 'Bài 19: Chữ A và những người bạn', slug: 'chu-a-va-nhung-nguoi-ban', lessonType: 'story', sortOrder: 19, durationMinutes: 15, content: 'Câu chuyện thú vị về chữ A và các chữ cái khác trong bảng chữ cái cùng kết bạn với nhau.' },
  { title: 'Bài 20: Nhím nâu kết bạn', slug: 'nhim-nau-ket-ban', lessonType: 'story', sortOrder: 20, durationMinutes: 15, content: 'Câu chuyện về chú nhím nâu tìm cách kết bạn với các bạn trong rừng và bài học về tình bạn.' },
  { title: 'Bài 21: Thả diều', slug: 'tha-dieu', lessonType: 'story', sortOrder: 21, durationMinutes: 15, content: 'Bài thơ về niềm vui thả diều trên cánh đồng lộng gió cùng bạn bè trong những buổi chiều hè.' },
  { title: 'Bài 22: Tớ là lê-gô', slug: 'to-la-le-go', lessonType: 'story', sortOrder: 22, durationMinutes: 15, content: 'Câu chuyện vui về những mảnh lê-gô biết nói và trò chơi lắp ghép sáng tạo của trẻ em.' },
  { title: 'Bài 23: Rồng rắn lên mây', slug: 'rong-ran-len-may', lessonType: 'story', sortOrder: 23, durationMinutes: 15, content: 'Bài đọc về trò chơi dân gian rồng rắn lên mây và những kỷ niệm tuổi thơ đáng nhớ.' },
  { title: 'Bài 24: Nặn đồ chơi', slug: 'nan-do-choi', lessonType: 'story', sortOrder: 24, durationMinutes: 15, content: 'Câu chuyện về bé học nặn đồ chơi bằng đất sét và niềm vui sáng tạo ra những món đồ xinh xắn.' },

  // ─── Tập 1 — Chủ đề 4: Mái ấm gia đình ─────────────────────────────────────
  { title: 'Bài 25: Sự tích hoa tỉ muội', slug: 'su-tich-hoa-ti-muoi', lessonType: 'story', sortOrder: 25, durationMinutes: 15, content: 'Câu chuyện về sự tích loài hoa tỉ muội mang ý nghĩa về tình anh em gắn bó trong gia đình.' },
  { title: 'Bài 26: Em mang về yêu thương', slug: 'em-mang-ve-yeu-thuong', lessonType: 'story', sortOrder: 26, durationMinutes: 15, content: 'Bài thơ về bé mang về những điều tốt đẹp từ trường học để chia sẻ tình yêu thương với gia đình.' },
  { title: 'Bài 27: Mẹ', slug: 'me-lop-2', lessonType: 'story', sortOrder: 27, durationMinutes: 15, content: 'Bài thơ cảm động ca ngợi người mẹ tần tảo yêu thương và hi sinh vì con mỗi ngày.' },
  { title: 'Bài 28: Trò chơi của bố', slug: 'tro-choi-cua-bo', lessonType: 'story', sortOrder: 28, durationMinutes: 15, content: 'Câu chuyện về những trò chơi vui vẻ của bố cùng bé và tình cảm cha con ấm áp.' },
  { title: 'Bài 29: Cánh cửa nhớ bà', slug: 'canh-cua-nho-ba', lessonType: 'story', sortOrder: 29, durationMinutes: 15, content: 'Bài thơ về nỗi nhớ bà qua hình ảnh cánh cửa nhà và tình cảm sâu nặng của cháu với bà.' },
  { title: 'Bài 30: Thương ông', slug: 'thuong-ong', lessonType: 'story', sortOrder: 30, durationMinutes: 15, content: 'Bài thơ thể hiện tình cảm yêu thương kính trọng của cháu dành cho ông nội hoặc ông ngoại.' },
  { title: 'Bài 31: Ánh sáng của yêu thương', slug: 'anh-sang-cua-yeu-thuong', lessonType: 'story', sortOrder: 31, durationMinutes: 15, content: 'Câu chuyện về tình yêu thương trong gia đình như ánh sáng soi đường cho bé trong cuộc sống.' },
  { title: 'Bài 32: Chơi chong chóng', slug: 'choi-chong-chong', lessonType: 'story', sortOrder: 32, durationMinutes: 15, content: 'Bài thơ về trò chơi chong chóng quay tít trong gió và niềm vui sum họp của cả gia đình.' },

  // ─── Tập 2 — Chủ đề 1: Vẻ đẹp quanh em ─────────────────────────────────────
  { title: 'Bài 1: Chuyện bốn mùa', slug: 'chuyen-bon-mua', lessonType: 'story', sortOrder: 33, durationMinutes: 15, content: 'Câu chuyện về bốn nàng tiên Xuân, Hạ, Thu, Đông kể về vẻ đẹp riêng của mỗi mùa trong năm.' },
  { title: 'Bài 2: Mùa nước nổi', slug: 'mua-nuoc-noi', lessonType: 'story', sortOrder: 34, durationMinutes: 15, content: 'Bài đọc về mùa nước nổi ở miền Tây Nam Bộ với những cảnh vật và sinh hoạt đặc sắc.' },
  { title: 'Bài 3: Họa mi hót', slug: 'hoa-mi-hot', lessonType: 'story', sortOrder: 35, durationMinutes: 15, content: 'Bài thơ về tiếng hót trong trẻo của chú họa mi và vẻ đẹp thiên nhiên xung quanh chúng ta.' },
  { title: 'Bài 4: Tết đến rồi', slug: 'tet-den-roi', lessonType: 'story', sortOrder: 36, durationMinutes: 15, content: 'Bài đọc về không khí náo nức đón Tết Nguyên Đán với những phong tục tập quán đẹp của người Việt.' },
  { title: 'Bài 5: Giọt nước và biển lớn', slug: 'giot-nuoc-va-bien-lon', lessonType: 'story', sortOrder: 37, durationMinutes: 15, content: 'Câu chuyện về hành trình của giọt nước từ sông suối ra đến biển lớn và vòng tuần hoàn của nước.' },
  { title: 'Bài 6: Mùa vàng', slug: 'mua-vang', lessonType: 'story', sortOrder: 38, durationMinutes: 15, content: 'Bài thơ miêu tả cảnh đồng lúa chín vàng mùa thu hoạch và công sức của người nông dân.' },
  { title: 'Bài 7: Hạt thóc', slug: 'hat-thoc', lessonType: 'story', sortOrder: 39, durationMinutes: 15, content: 'Câu chuyện về hạt thóc nhỏ bé chứa đựng bao công sức và ý nghĩa của việc trân trọng lúa gạo.' },
  { title: 'Bài 8: Lũy tre', slug: 'luy-tre', lessonType: 'story', sortOrder: 40, durationMinutes: 15, content: 'Bài thơ về lũy tre xanh mát bao quanh làng quê Việt Nam như người bạn đồng hành thân thiết.' },

  // ─── Tập 2 — Chủ đề 2: Hành tinh xanh của em ───────────────────────────────
  { title: 'Bài 9: Vẽ chim', slug: 've-chim', lessonType: 'story', sortOrder: 41, durationMinutes: 15, content: 'Câu chuyện về bé học vẽ những chú chim trong vườn và khám phá thế giới thiên nhiên qua nét cọ.' },
  { title: 'Bài 10: Khủng long', slug: 'khung-long', lessonType: 'story', sortOrder: 42, durationMinutes: 15, content: 'Bài đọc thú vị về thế giới khủng long thời tiền sử giúp bé mở rộng hiểu biết về lịch sử trái đất.' },
  { title: 'Bài 11: Sự tích cây thì là', slug: 'su-tich-cay-thi-la', lessonType: 'story', sortOrder: 43, durationMinutes: 15, content: 'Câu chuyện dân gian về nguồn gốc của cây thì là và bài học về lòng biết ơn thiên nhiên.' },
  { title: 'Bài 12: Bờ tre đón khách', slug: 'bo-tre-don-khach', lessonType: 'story', sortOrder: 44, durationMinutes: 15, content: 'Bài đọc về bờ tre ven sông đón chào khách đến thăm làng và vẻ đẹp bình yên của làng quê.' },
  { title: 'Bài 13: Tiếng chổi tre', slug: 'tieng-choi-tre', lessonType: 'story', sortOrder: 45, durationMinutes: 15, content: 'Bài thơ về tiếng chổi tre quét sân quen thuộc mỗi buổi sáng và hình ảnh người lao công chăm chỉ.' },
  { title: 'Bài 14: Cỏ non cười rồi', slug: 'co-non-cuoi-roi', lessonType: 'story', sortOrder: 46, durationMinutes: 15, content: 'Bài thơ về cỏ non xanh mướt sau cơn mưa và vẻ tươi vui của thiên nhiên đất trời mùa xuân.' },
  { title: 'Bài 15: Những con sao biển', slug: 'nhung-con-sao-bien', lessonType: 'story', sortOrder: 47, durationMinutes: 15, content: 'Bài đọc về những con sao biển kỳ diệu dưới đáy đại dương và thế giới sinh vật biển phong phú.' },
  { title: 'Bài 16: Tạm biệt cánh cam', slug: 'tam-biet-canh-cam', lessonType: 'story', sortOrder: 48, durationMinutes: 15, content: 'Câu chuyện cảm động khi bé phải tạm biệt chú bọ cánh cam và bài học về sự yêu thương thiên nhiên.' },

  // ─── Tập 2 — Chủ đề 3: Giao tiếp và kết nối ────────────────────────────────
  { title: 'Bài 17: Những cách chào độc đáo', slug: 'nhung-cach-chao-doc-dao', lessonType: 'story', sortOrder: 49, durationMinutes: 15, content: 'Bài đọc khám phá những cách chào hỏi thú vị khác nhau của các dân tộc và nền văn hóa trên thế giới.' },
  { title: 'Bài 18: Thư viện biết đi', slug: 'thu-vien-biet-di', lessonType: 'story', sortOrder: 50, durationMinutes: 15, content: 'Câu chuyện về thư viện lưu động mang sách đến tận tay trẻ em vùng xa và tình yêu sách của các bạn nhỏ.' },
  { title: 'Bài 19: Cảm ơn anh hà mã', slug: 'cam-on-anh-ha-ma', lessonType: 'story', sortOrder: 51, durationMinutes: 15, content: 'Câu chuyện vui về chú hà mã tốt bụng giúp đỡ bạn bè và bài học về lời cảm ơn chân thành.' },
  { title: 'Bài 20: Từ chú bồ câu đến in-tơ-nét', slug: 'tu-chu-bo-cau-den-in-to-net', lessonType: 'story', sortOrder: 52, durationMinutes: 15, content: 'Bài đọc thú vị về lịch sử truyền thông từ chim bồ câu đưa thư đến mạng internet hiện đại.' },

  // ─── Tập 2 — Chủ đề 4: Con người Việt Nam ──────────────────────────────────
  { title: 'Bài 21: Mai An Tiêm', slug: 'mai-an-tiem', lessonType: 'story', sortOrder: 53, durationMinutes: 15, content: 'Câu chuyện dân gian về Mai An Tiêm bị đày ra đảo hoang và sự tích quả dưa hấu của Việt Nam.' },
  { title: 'Bài 22: Thư gửi bố ngoài đảo', slug: 'thu-gui-bo-ngoai-dao', lessonType: 'story', sortOrder: 54, durationMinutes: 15, content: 'Câu chuyện cảm động về bức thư của bé gửi cho bố đang công tác bảo vệ đảo xa Tổ quốc.' },
  { title: 'Bài 23: Bóp nát quả cam', slug: 'bop-nat-qua-cam', lessonType: 'story', sortOrder: 55, durationMinutes: 15, content: 'Câu chuyện lịch sử về Trần Quốc Toản bóp nát quả cam vì lòng yêu nước nồng nàn khi còn nhỏ tuổi.' },
  { title: 'Bài 24: Chiếc rễ đa tròn', slug: 'chiec-re-da-tron', lessonType: 'story', sortOrder: 56, durationMinutes: 15, content: 'Câu chuyện về Bác Hồ và chiếc rễ đa tròn tại Phủ Chủ tịch, thể hiện tình yêu thiên nhiên của Bác.' },

  // ─── Tập 2 — Chủ đề 5: Việt Nam quê hương em ───────────────────────────────
  { title: 'Bài 25: Đất nước chúng mình', slug: 'dat-nuoc-chung-minh', lessonType: 'story', sortOrder: 57, durationMinutes: 15, content: 'Bài thơ ca ngợi đất nước Việt Nam tươi đẹp với núi sông hùng vĩ và truyền thống văn hóa lâu đời.' },
  { title: 'Bài 26: Trên các miền đất nước', slug: 'tren-cac-mien-dat-nuoc', lessonType: 'story', sortOrder: 58, durationMinutes: 15, content: 'Bài đọc giới thiệu vẻ đẹp đặc sắc của ba miền Bắc, Trung, Nam trên đất nước Việt Nam.' },
  { title: 'Bài 27: Chuyện quả bầu', slug: 'chuyen-qua-bau', lessonType: 'story', sortOrder: 59, durationMinutes: 15, content: 'Câu chuyện dân gian về quả bầu diệu kỳ giải thích nguồn gốc các dân tộc anh em trên đất Việt.' },
  { title: 'Bài 28: Khám phá đáy biển ở Trường Sa', slug: 'kham-pha-day-bien-o-truong-sa', lessonType: 'story', sortOrder: 60, durationMinutes: 15, content: 'Bài đọc thú vị về hành trình khám phá thế giới đại dương phong phú tại quần đảo Trường Sa.' },
  { title: 'Bài 29: Hồ Gươm', slug: 'ho-guom', lessonType: 'story', sortOrder: 61, durationMinutes: 15, content: 'Bài đọc về vẻ đẹp của Hồ Gươm - trái tim Hà Nội gắn với truyền thuyết Hồ Hoàn Kiếm lịch sử.' },
  { title: 'Bài 30: Cánh đồng quê em', slug: 'canh-dong-que-em', lessonType: 'story', sortOrder: 62, durationMinutes: 15, content: 'Bài thơ về cánh đồng lúa xanh mướt của quê hương và tình yêu tha thiết dành cho mảnh đất chôn rau cắt rốn.' },
];

async function seed() {
  await ds.initialize();
  console.log('Connected to database');
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    const adminRows = await qr.query('SELECT id FROM users LIMIT 1');
    const adminId: number = adminRows[0]?.id ?? 1;

    // Upsert course
    const existing = await qr.query('SELECT id FROM courses WHERE slug = ?', [COURSE_SLUG]);
    let courseId: number;

    if (existing.length > 0) {
      courseId = existing[0].id;
      await qr.query(
        `UPDATE courses SET title=?, totalLessons=?, estimatedMinutes=?, updatedAt=NOW() WHERE id=?`,
        ['Tiếng Việt lớp 2', LESSONS.length, LESSONS.length * 15, courseId],
      );
      console.log(`Updated course: Tiếng Việt lớp 2 (id=${courseId})`);
    } else {
      const res = await qr.query(
        `INSERT INTO courses
         (title, slug, shortDescription, description, courseType, difficultyLevel,
          targetAgeMin, targetAgeMax, totalLessons, estimatedMinutes,
          isPublished, isFree, price, createdById, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          'Tiếng Việt lớp 2',
          COURSE_SLUG,
          'Học đọc hiểu, chính tả và ngữ pháp Tiếng Việt lớp 2 theo chương trình Kết nối tri thức',
          'Khóa học toàn diện Tiếng Việt lớp 2 theo bộ sách Kết nối tri thức: tập 1 gồm 32 bài thuộc 4 chủ đề, tập 2 gồm 30 bài thuộc 5 chủ đề. Nội dung bám sát SGK, giúp bé luyện đọc hiểu, viết chính tả và rèn ngữ pháp tiếng Việt.',
          'language',
          'beginner',
          7, 8,
          LESSONS.length,
          LESSONS.length * 15,
          1, 0, 99000,
          adminId,
        ],
      );
      courseId = res.insertId;
      console.log(`Created course: Tiếng Việt lớp 2 (id=${courseId})`);
    }

    // ── Volumes ────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM volumes WHERE courseId = ?', [courseId]);
    const volDefs = [
      { name: 'TIẾNG VIỆT LỚP 2 - TẬP 1', sortOrder: 1 },
      { name: 'TIẾNG VIỆT LỚP 2 - TẬP 2', sortOrder: 2 },
    ];
    const volIds: number[] = [];
    for (const v of volDefs) {
      const r = await qr.query(
        'INSERT INTO volumes (courseId, name, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [courseId, v.name, v.sortOrder],
      );
      volIds.push(r.insertId);
    }
    const [vol1Id, vol2Id] = volIds;
    console.log(`Created volumes: ${vol1Id}, ${vol2Id}`);

    // ── Topics ─────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM topics WHERE courseId = ?', [courseId]);
    const topicDefs: { name: string; vol: number; sortOrder: number; minOrder: number; maxOrder: number }[] = [
      // Tập 1
      { name: 'Chủ đề 1: Em lớn lên từng ngày', vol: vol1Id, sortOrder: 1, minOrder: 1,  maxOrder: 8  },
      { name: 'Chủ đề 2: Đi học vui sao',        vol: vol1Id, sortOrder: 2, minOrder: 9,  maxOrder: 16 },
      { name: 'Chủ đề 3: Niềm vui tuổi thơ',     vol: vol1Id, sortOrder: 3, minOrder: 17, maxOrder: 24 },
      { name: 'Chủ đề 4: Mái ấm gia đình',        vol: vol1Id, sortOrder: 4, minOrder: 25, maxOrder: 32 },
      // Tập 2
      { name: 'Chủ đề 1: Vẻ đẹp quanh em',          vol: vol2Id, sortOrder: 1, minOrder: 33, maxOrder: 40 },
      { name: 'Chủ đề 2: Hành tinh xanh của em',     vol: vol2Id, sortOrder: 2, minOrder: 41, maxOrder: 48 },
      { name: 'Chủ đề 3: Giao tiếp và kết nối',      vol: vol2Id, sortOrder: 3, minOrder: 49, maxOrder: 52 },
      { name: 'Chủ đề 4: Con người Việt Nam',         vol: vol2Id, sortOrder: 4, minOrder: 53, maxOrder: 56 },
      { name: 'Chủ đề 5: Việt Nam quê hương em',      vol: vol2Id, sortOrder: 5, minOrder: 57, maxOrder: 62 },
    ];
    const topicMap: { minOrder: number; maxOrder: number; topicId: number; volId: number }[] = [];
    for (const t of topicDefs) {
      const r = await qr.query(
        'INSERT INTO topics (courseId, volumeId, name, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [courseId, t.vol, t.name, t.sortOrder],
      );
      topicMap.push({ minOrder: t.minOrder, maxOrder: t.maxOrder, topicId: r.insertId, volId: t.vol });
    }
    console.log(`Created ${topicDefs.length} topics`);

    // ── Lessons ────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM lessons WHERE courseId = ?', [courseId]);

    for (const l of LESSONS) {
      const tm = topicMap.find((t) => l.sortOrder >= t.minOrder && l.sortOrder <= t.maxOrder);
      const volId = l.sortOrder <= 32 ? vol1Id : vol2Id;
      await qr.query(
        `INSERT INTO lessons
         (courseId, volumeId, topicId, title, slug, content, lessonType, sortOrder, durationMinutes,
          isPreview, isPublished, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [courseId, volId, tm?.topicId ?? null, l.title, l.slug, l.content, l.lessonType, l.sortOrder, l.durationMinutes, 0, 1],
      );
      console.log(`  [${l.sortOrder}] ${l.title}`);
    }

    console.log(`\nDone! ${LESSONS.length} lessons inserted.`);
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch((err) => { console.error(err); process.exit(1); });
