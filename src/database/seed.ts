import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

const courses = [
  {
    title: 'Khám Phá Thế Giới Số',
    slug: 'kham-pha-the-gioi-so',
    shortDescription: 'Học đếm và nhận biết số từ 1–20 qua trò chơi sinh động',
    description: 'Khóa học giúp bé làm quen với các con số thông qua hình ảnh ngộ nghĩnh, âm thanh vui tươi và các trò chơi tương tác. Bé sẽ học đếm, so sánh số lượng và thực hành cộng trừ đơn giản.',
    courseType: 'math',
    difficultyLevel: 'beginner',
    targetAgeMin: 3,
    targetAgeMax: 6,
    totalLessons: 10,
    estimatedMinutes: 120,
    isPublished: true,
    isFree: true,
    price: 0,
    lessons: [
      { title: 'Số 1, 2, 3 — Những người bạn đầu tiên', slug: 'so-1-2-3', lessonType: 'interactive', sortOrder: 1, durationMinutes: 10, isPublished: true, isPreview: true, content: 'Bé học nhận biết và đọc các số 1, 2, 3 qua hình ảnh quả táo, quả cam và ngôi sao.' },
      { title: 'Đếm đến 5 cùng những chú vịt', slug: 'dem-den-5-chu-vit', lessonType: 'video', sortOrder: 2, durationMinutes: 8, isPublished: true, content: 'Video hoạt hình với 5 chú vịt con giúp bé thuộc lòng dãy số từ 1 đến 5.' },
      { title: 'Số 6, 7, 8 — Đội quân ong mật', slug: 'so-6-7-8-doi-quan-ong', lessonType: 'interactive', sortOrder: 3, durationMinutes: 12, isPublished: true, content: 'Trò chơi đếm ong giúp bé nhận biết và viết số 6, 7, 8.' },
      { title: 'Số 9 và 10 — Đỉnh cao của đếm số', slug: 'so-9-va-10', lessonType: 'game', sortOrder: 4, durationMinutes: 15, isPublished: true, content: 'Mini game thu thập ngôi sao, bé phải đếm đúng để mở kho báu.' },
      { title: 'So sánh nhiều hơn – ít hơn', slug: 'so-sanh-nhieu-hon-it-hon', lessonType: 'interactive', sortOrder: 5, durationMinutes: 12, isPublished: true, content: 'Bé kéo thả để so sánh hai nhóm đồ vật và chọn nhóm có nhiều hơn.' },
      { title: 'Số 11–15: Bước vào thế giới lớn hơn', slug: 'so-11-15', lessonType: 'story', sortOrder: 6, durationMinutes: 10, isPublished: true, content: 'Câu chuyện về bé Cún đi chợ và đếm các loại rau củ từ 11 đến 15.' },
      { title: 'Số 16–20: Hành trình đến đỉnh núi', slug: 'so-16-20', lessonType: 'interactive', sortOrder: 7, durationMinutes: 12, isPublished: true, content: 'Bé giúp nhân vật leo núi bằng cách nhận đúng các số từ 16–20.' },
      { title: 'Cộng đơn giản với ngón tay', slug: 'cong-don-gian-ngon-tay', lessonType: 'interactive', sortOrder: 8, durationMinutes: 15, isPublished: true, content: 'Dùng hình ảnh bàn tay để học cộng hai số có kết quả dưới 10.' },
      { title: 'Trừ vui vẻ — Chia kẹo cho bạn', slug: 'tru-vui-ve-chia-keo', lessonType: 'game', sortOrder: 9, durationMinutes: 12, isPublished: true, content: 'Game mô phỏng chia kẹo, bé trả lời phép trừ để nhân vật nhận được kẹo.' },
      { title: 'Kiểm tra cuối khóa: Siêu sao toán học', slug: 'kiem-tra-cuoi-khoa-toan', lessonType: 'quiz', sortOrder: 10, durationMinutes: 15, isPublished: true, content: 'Bài kiểm tra tổng hợp 10 câu hỏi về đếm số, so sánh và cộng trừ.' },
    ],
  },
  {
    title: 'Bé Tập Đọc — Âm Và Vần',
    slug: 'be-tap-doc-am-va-van',
    shortDescription: 'Làm quen bảng chữ cái và các vần cơ bản tiếng Việt',
    description: 'Khóa học giới thiệu 29 chữ cái tiếng Việt và các vần cơ bản. Bé được học qua thơ, nhạc và trò chơi ghép vần, xây dựng nền tảng đọc vững chắc từ sớm.',
    courseType: 'language',
    difficultyLevel: 'beginner',
    targetAgeMin: 4,
    targetAgeMax: 7,
    totalLessons: 12,
    estimatedMinutes: 180,
    isPublished: true,
    isFree: false,
    price: 99000,
    lessons: [
      { title: 'Chào bảng chữ cái! A, B, C', slug: 'chao-bang-chu-cai-abc', lessonType: 'video', sortOrder: 1, durationMinutes: 10, isPublished: true, isPreview: true, content: 'Bài hát vui nhộn giúp bé nhớ mặt chữ A, B, C qua hình ảnh động vật.' },
      { title: 'Nhóm D, Đ, E, Ê — Bạn mới', slug: 'nhom-d-d-e-e', lessonType: 'interactive', sortOrder: 2, durationMinutes: 12, isPublished: true, content: 'Trò chơi kéo thả ghép chữ với từ tương ứng.' },
      { title: 'G, H, I, K — Hành trình tiếp theo', slug: 'nhom-g-h-i-k', lessonType: 'interactive', sortOrder: 3, durationMinutes: 12, isPublished: true, content: 'Bé chọn chữ đúng theo gợi ý hình ảnh và âm thanh.' },
      { title: 'L, M, N, O, Ô, Ơ — Nhóm vui vẻ', slug: 'nhom-l-m-n-o', lessonType: 'story', sortOrder: 4, durationMinutes: 15, isPublished: true, content: 'Câu chuyện về chuyến du lịch của các chữ cái.' },
      { title: 'P, Q, R, S, T — Đội ngũ mạnh mẽ', slug: 'nhom-p-q-r-s-t', lessonType: 'interactive', sortOrder: 5, durationMinutes: 12, isPublished: true, content: 'Minigame bắn bong bóng với chữ cái.' },
      { title: 'U, Ư, V, X, Y — Hoàn thành bảng chữ', slug: 'nhom-u-v-x-y', lessonType: 'video', sortOrder: 6, durationMinutes: 10, isPublished: true, content: 'Video ôn tập toàn bộ bảng chữ cái qua bài rap ngắn.' },
      { title: 'Vần AN, ĂN, ÂN — Ghép vần đầu tiên', slug: 'van-an-an-an', lessonType: 'interactive', sortOrder: 7, durationMinutes: 15, isPublished: true, content: 'Bé ghép âm đầu với vần để tạo thành từ có nghĩa.' },
      { title: 'Vần OM, ÔM, ƠM — Ngôi nhà của vần', slug: 'van-om-om-om', lessonType: 'interactive', sortOrder: 8, durationMinutes: 12, isPublished: true, content: 'Trò chơi xây nhà bằng cách ghép vần đúng.' },
      { title: 'Vần EN, IN, ON — Bộ ba thân thiết', slug: 'van-en-in-on', lessonType: 'game', sortOrder: 9, durationMinutes: 12, isPublished: true, content: 'Game xe lửa: bé trả lời đúng thì tàu chạy đến ga tiếp theo.' },
      { title: 'Từ đơn giản: con vật quen thuộc', slug: 'tu-don-gian-con-vat', lessonType: 'interactive', sortOrder: 10, durationMinutes: 15, isPublished: true, content: 'Bé đọc và ghép từ với hình ảnh các con vật: mèo, chó, gà, vịt…' },
      { title: 'Câu đơn giản đầu tiên', slug: 'cau-don-gian-dau-tien', lessonType: 'story', sortOrder: 11, durationMinutes: 15, isPublished: true, content: 'Bé đọc câu ngắn 3–4 từ và kéo thả sắp xếp từ thành câu đúng.' },
      { title: 'Kiểm tra cuối khóa: Bé đọc giỏi!', slug: 'kiem-tra-cuoi-khoa-doc', lessonType: 'quiz', sortOrder: 12, durationMinutes: 20, isPublished: true, content: 'Bài kiểm tra đọc chữ, ghép vần và đọc từ đơn giản.' },
    ],
  },
  {
    title: 'Thế Giới Màu Sắc & Sáng Tạo',
    slug: 'the-gioi-mau-sac-sang-tao',
    shortDescription: 'Khám phá màu sắc và phát triển tư duy sáng tạo qua vẽ và ghép hình',
    description: 'Bé học nhận biết 12 màu cơ bản, phân biệt hình dạng và tự tay tô màu, ghép hình tạo nên tác phẩm của riêng mình. Khóa học kích thích trí tưởng tượng và khéo léo đôi tay.',
    courseType: 'creative',
    difficultyLevel: 'beginner',
    targetAgeMin: 2,
    targetAgeMax: 6,
    totalLessons: 8,
    estimatedMinutes: 96,
    isPublished: true,
    isFree: true,
    price: 0,
    lessons: [
      { title: 'Đỏ, vàng, xanh — Ba màu kỳ diệu', slug: 'do-vang-xanh-ba-mau', lessonType: 'interactive', sortOrder: 1, durationMinutes: 10, isPublished: true, isPreview: true, content: 'Bé chạm vào màu sắc để tô màu cho tranh, học nhận biết 3 màu cơ bản.' },
      { title: 'Tím, cam, hồng — Màu mới lạ', slug: 'tim-cam-hong', lessonType: 'video', sortOrder: 2, durationMinutes: 8, isPublished: true, content: 'Video thực nghiệm pha màu cho thấy màu tím ra đời từ đỏ và xanh.' },
      { title: 'Hình tròn, vuông, tam giác', slug: 'hinh-tron-vuong-tam-giac', lessonType: 'interactive', sortOrder: 3, durationMinutes: 12, isPublished: true, content: 'Bé nhận biết và kéo các hình vào đúng ô tương ứng.' },
      { title: 'Ghép hình tạo nên ngôi nhà', slug: 'ghep-hinh-ngoi-nha', lessonType: 'game', sortOrder: 4, durationMinutes: 12, isPublished: true, content: 'Dùng các hình cơ bản để lắp ghép ngôi nhà, cây cối và mây trời.' },
      { title: 'Tô màu — Khu vườn của bé', slug: 'to-mau-khu-vuon', lessonType: 'interactive', sortOrder: 5, durationMinutes: 15, isPublished: true, content: 'Bé chọn màu và tô tranh vườn hoa theo ý thích.' },
      { title: 'Vẽ đường thẳng và đường cong', slug: 've-duong-thang-va-cong', lessonType: 'interactive', sortOrder: 6, durationMinutes: 12, isPublished: true, content: 'Luyện kỹ năng vẽ nét để chuẩn bị viết chữ sau này.' },
      { title: 'Sáng tạo với đốm màu', slug: 'sang-tao-voi-dom-mau', lessonType: 'interactive', sortOrder: 7, durationMinutes: 12, isPublished: true, content: 'Bé chạm vào màn hình để tạo ra tranh trừu tượng riêng của mình.' },
      { title: 'Triển lãm tranh bé', slug: 'trien-lam-tranh-be', lessonType: 'story', sortOrder: 8, durationMinutes: 15, isPublished: true, content: 'Câu chuyện kết thúc: bé dẫn gia đình tham quan triển lãm tranh do mình vẽ.' },
    ],
  },
  {
    title: 'Cảm Xúc Của Bé — Tôi Cảm Thấy Thế Nào?',
    slug: 'cam-xuc-cua-be',
    shortDescription: 'Giúp bé nhận diện và diễn đạt cảm xúc một cách lành mạnh',
    description: 'Khóa học về trí tuệ cảm xúc dành cho trẻ nhỏ. Bé học nhận biết 8 cảm xúc cơ bản, hiểu nguyên nhân và cách thể hiện cảm xúc phù hợp, đồng thời học kỹ năng đồng cảm với bạn bè.',
    courseType: 'emotion',
    difficultyLevel: 'beginner',
    targetAgeMin: 3,
    targetAgeMax: 7,
    totalLessons: 8,
    estimatedMinutes: 112,
    isPublished: true,
    isFree: false,
    price: 149000,
    lessons: [
      { title: 'Vui — Khi nào bé cảm thấy vui?', slug: 'cam-xuc-vui', lessonType: 'story', sortOrder: 1, durationMinutes: 12, isPublished: true, isPreview: true, content: 'Câu chuyện về bé Thỏ nhận quà sinh nhật và khám phá cảm giác vui sướng.' },
      { title: 'Buồn — Không sao, buồn là bình thường', slug: 'cam-xuc-buon', lessonType: 'video', sortOrder: 2, durationMinutes: 10, isPublished: true, content: 'Video hoạt hình về bạn Gấu mất đồ chơi và cách bạn ấy vượt qua nỗi buồn.' },
      { title: 'Tức giận — Làm gì khi nóng giận?', slug: 'cam-xuc-tuc-gian', lessonType: 'interactive', sortOrder: 3, durationMinutes: 15, isPublished: true, content: 'Bé chọn cách xử lý đúng khi nhân vật tức giận: hít thở sâu, đếm đến 10.' },
      { title: 'Sợ hãi — Mình dũng cảm hơn mình nghĩ', slug: 'cam-xuc-so-hai', lessonType: 'story', sortOrder: 4, durationMinutes: 12, isPublished: true, content: 'Câu chuyện bé Sư Tử sợ bóng tối và cách vượt qua nỗi sợ.' },
      { title: 'Tự hào — Yêu bản thân mình', slug: 'cam-xuc-tu-hao', lessonType: 'interactive', sortOrder: 5, durationMinutes: 12, isPublished: true, content: 'Bé kể lại điều mình làm tốt và nhận huy hiệu "Tôi giỏi lắm!".' },
      { title: 'Ngạc nhiên và tò mò — Thế giới thật kỳ diệu', slug: 'cam-xuc-ngac-nhien', lessonType: 'interactive', sortOrder: 6, durationMinutes: 12, isPublished: true, content: 'Bé khám phá hộp bí ẩn và chia sẻ cảm xúc khi thấy điều bất ngờ.' },
      { title: 'Đồng cảm — Quan tâm đến bạn bè', slug: 'dong-cam-ban-be', lessonType: 'story', sortOrder: 7, durationMinutes: 15, isPublished: true, content: 'Câu chuyện bé Thỏ giúp bạn Vịt khi bạn bị ngã và cảm giác ấm lòng sau đó.' },
      { title: 'Ôn tập: Ngày cảm xúc của tôi', slug: 'on-tap-ngay-cam-xuc', lessonType: 'quiz', sortOrder: 8, durationMinutes: 20, isPublished: true, content: 'Bé xem tình huống và chọn cảm xúc phù hợp, sau đó chọn cách ứng xử đúng.' },
    ],
  },
  {
    title: 'Tư Duy Logic — Bé Thám Tử Nhỏ',
    slug: 'tu-duy-logic-be-tham-tu',
    shortDescription: 'Phát triển tư duy logic qua câu đố, phân loại và giải mê cung',
    description: 'Khóa học kích thích tư duy phân tích và giải quyết vấn đề. Bé học phân loại đồ vật, tìm quy luật, giải câu đố và hoàn thành mê cung với độ khó tăng dần.',
    courseType: 'logic',
    difficultyLevel: 'intermediate',
    targetAgeMin: 4,
    targetAgeMax: 8,
    totalLessons: 10,
    estimatedMinutes: 150,
    isPublished: true,
    isFree: false,
    price: 199000,
    lessons: [
      { title: 'Phân loại đồ vật — Cái này thuộc nhóm nào?', slug: 'phan-loai-do-vat', lessonType: 'interactive', sortOrder: 1, durationMinutes: 12, isPublished: true, isPreview: true, content: 'Bé kéo thả đồ vật vào đúng nhóm: đồ ăn, đồ chơi, quần áo.' },
      { title: 'Tìm hình khác biệt — Con mắt tinh tường', slug: 'tim-hinh-khac-biet', lessonType: 'game', sortOrder: 2, durationMinutes: 15, isPublished: true, content: 'Bé tìm điểm khác nhau giữa hai bức tranh, bắt đầu từ 3 điểm rồi tăng dần.' },
      { title: 'Quy luật màu sắc — Tiếp theo là gì?', slug: 'quy-luat-mau-sac', lessonType: 'interactive', sortOrder: 3, durationMinutes: 12, isPublished: true, content: 'Bé quan sát dãy màu và chọn màu tiếp theo theo quy luật.' },
      { title: 'Quy luật hình dạng — Dãy số bí ẩn', slug: 'quy-luat-hinh-dang', lessonType: 'interactive', sortOrder: 4, durationMinutes: 15, isPublished: true, content: 'Nhận dạng quy luật lặp lại của hình dạng và điền hình còn thiếu.' },
      { title: 'Mê cung cấp 1 — Đường về nhà', slug: 'me-cung-cap-1', lessonType: 'game', sortOrder: 5, durationMinutes: 12, isPublished: true, content: 'Bé điều hướng nhân vật qua mê cung đơn giản để về nhà.' },
      { title: 'Câu đố — Tôi là ai?', slug: 'cau-do-toi-la-ai', lessonType: 'interactive', sortOrder: 6, durationMinutes: 15, isPublished: true, content: 'Bé nghe gợi ý (tối đa 3 gợi ý) và đoán tên đồ vật hoặc con vật.' },
      { title: 'Suy luận — Ai lấy bánh?', slug: 'suy-luan-ai-lay-banh', lessonType: 'story', sortOrder: 7, durationMinutes: 15, isPublished: true, content: 'Câu đố suy luận đơn giản: dựa vào 3 gợi ý để tìm ra ai đã lấy bánh.' },
      { title: 'Xếp hình Tangram — Sáng tạo từ hình học', slug: 'xep-hinh-tangram', lessonType: 'game', sortOrder: 8, durationMinutes: 15, isPublished: true, content: 'Bé kéo thả 7 mảnh Tangram để ghép thành con vật hay đồ vật theo mẫu.' },
      { title: 'Mê cung cấp 2 — Thám tử phiêu lưu', slug: 'me-cung-cap-2', lessonType: 'game', sortOrder: 9, durationMinutes: 15, isPublished: true, content: 'Mê cung phức tạp hơn với nhiều nhánh rẽ, bé cần thử-sai thông minh.' },
      { title: 'Thách thức cuối: Giải mã bí ẩn!', slug: 'thach-thuc-cuoi-giai-ma', lessonType: 'quiz', sortOrder: 10, durationMinutes: 20, isPublished: true, content: 'Tổng hợp các dạng bài logic vào một nhiệm vụ liên hoàn thám tử.' },
    ],
  },
  {
    title: 'Tiếng Anh Vỡ Lòng — Hello World!',
    slug: 'tieng-anh-vo-long',
    shortDescription: 'Bước đầu làm quen tiếng Anh qua bài hát, hình ảnh và trò chơi',
    description: 'Khóa học tiếng Anh dành cho trẻ 3–6 tuổi, tập trung vào nghe và nói. Bé học 100 từ vựng theo chủ đề quen thuộc: màu sắc, số đếm, động vật, thức ăn và gia đình.',
    courseType: 'language',
    difficultyLevel: 'beginner',
    targetAgeMin: 3,
    targetAgeMax: 6,
    totalLessons: 10,
    estimatedMinutes: 140,
    isPublished: true,
    isFree: false,
    price: 249000,
    lessons: [
      { title: 'Hello! — Xin chào bằng tiếng Anh', slug: 'hello-xin-chao', lessonType: 'video', sortOrder: 1, durationMinutes: 10, isPublished: true, isPreview: true, content: 'Bài hát "Hello, how are you?" giúp bé làm quen câu chào hỏi đầu tiên.' },
      { title: 'Colors — Học màu sắc bằng tiếng Anh', slug: 'colors-mau-sac', lessonType: 'interactive', sortOrder: 2, durationMinutes: 12, isPublished: true, content: 'Bé chọn màu đúng theo lệnh tiếng Anh: "Touch the red ball!"' },
      { title: 'Numbers 1–10 — Đếm bằng tiếng Anh', slug: 'numbers-1-10', lessonType: 'game', sortOrder: 3, durationMinutes: 12, isPublished: true, content: 'Trò chơi đếm sao với giọng đọc tiếng Anh tự nhiên.' },
      { title: 'Animals — Những người bạn động vật', slug: 'animals-dong-vat', lessonType: 'interactive', sortOrder: 4, durationMinutes: 15, isPublished: true, content: 'Bé nghe tiếng kêu và chọn hình con vật đúng, học từ dog, cat, cow, duck.' },
      { title: 'Food — Yummy! Đồ ăn ngon nào', slug: 'food-do-an', lessonType: 'story', sortOrder: 5, durationMinutes: 12, isPublished: true, content: 'Câu chuyện đi chợ, bé học tên 10 loại thức ăn tiếng Anh.' },
      { title: 'Body Parts — Cơ thể bé', slug: 'body-parts', lessonType: 'video', sortOrder: 6, durationMinutes: 10, isPublished: true, content: 'Bài hát "Head, shoulders, knees and toes" kết hợp vận động.' },
      { title: 'Family — Gia đình thân yêu', slug: 'family-gia-dinh', lessonType: 'interactive', sortOrder: 7, durationMinutes: 15, isPublished: true, content: 'Bé ghép hình thành viên gia đình với từ tiếng Anh tương ứng.' },
      { title: 'Shapes — Hình dạng xung quanh bé', slug: 'shapes-hinh-dang', lessonType: 'game', sortOrder: 8, durationMinutes: 12, isPublished: true, content: 'Bé tìm và chạm vào các hình trong tranh theo lệnh tiếng Anh.' },
      { title: 'Simple sentences — "I like..." / "I can..."', slug: 'simple-sentences', lessonType: 'interactive', sortOrder: 9, durationMinutes: 15, isPublished: true, content: 'Bé tập nói câu đơn giản bằng cách chọn từ hoàn thành câu.' },
      { title: 'Mini test — Am I a star? ⭐', slug: 'mini-test-am-i-a-star', lessonType: 'quiz', sortOrder: 10, durationMinutes: 20, isPublished: true, content: 'Bài kiểm tra nghe–nhìn–chọn, tổng hợp toàn bộ từ vựng đã học.' },
    ],
  },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Create admin user
    const adminPasswordHash = await bcrypt.hash('123456', 10);
    const existingAdmin = await queryRunner.query(
      'SELECT id FROM users WHERE email = ?',
      ['admin@hoccungbe.com'],
    );

    let adminId: number;
    if (existingAdmin.length === 0) {
      const adminResult = await queryRunner.query(
        `INSERT INTO users (fullName, email, passwordHash, role, status, createdAt, updatedAt)
         VALUES (?, ?, ?, 'admin', 'active', NOW(), NOW())`,
        ['Admin HocCungBe', 'admin@hoccungbe.com', adminPasswordHash],
      );
      adminId = adminResult.insertId;
      console.log(`Created admin user id=${adminId}`);
    } else {
      adminId = existingAdmin[0].id;
      console.log(`Admin user already exists id=${adminId}`);
    }

    // Seed courses and lessons
    for (const courseData of courses) {
      const { lessons, ...courseFields } = courseData;

      const existing = await queryRunner.query(
        'SELECT id FROM courses WHERE slug = ?',
        [courseFields.slug],
      );

      let courseId: number;
      if (existing.length > 0) {
        courseId = existing[0].id;
        console.log(`Course already exists: ${courseFields.title} (id=${courseId})`);
      } else {
        const result = await queryRunner.query(
          `INSERT INTO courses
           (title, slug, shortDescription, description, courseType, difficultyLevel,
            targetAgeMin, targetAgeMax, totalLessons, estimatedMinutes,
            isPublished, isFree, price, createdById, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            courseFields.title,
            courseFields.slug,
            courseFields.shortDescription,
            courseFields.description,
            courseFields.courseType,
            courseFields.difficultyLevel,
            courseFields.targetAgeMin,
            courseFields.targetAgeMax,
            courseFields.totalLessons,
            courseFields.estimatedMinutes,
            courseFields.isPublished ? 1 : 0,
            courseFields.isFree ? 1 : 0,
            courseFields.price,
            adminId,
          ],
        );
        courseId = result.insertId;
        console.log(`Created course: ${courseFields.title} (id=${courseId})`);
      }

      for (const lesson of lessons) {
        const existingLesson = await queryRunner.query(
          'SELECT id FROM lessons WHERE courseId = ? AND slug = ?',
          [courseId, lesson.slug],
        );
        if (existingLesson.length > 0) {
          console.log(`  Lesson already exists: ${lesson.title}`);
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
            (lesson as any).isPreview ? 1 : 0,
            lesson.isPublished ? 1 : 0,
          ],
        );
        console.log(`  Created lesson: ${lesson.title}`);
      }
    }

    console.log('\nSeed completed successfully!');
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
