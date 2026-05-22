import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const RESET = process.argv.includes('--reset');

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: true,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type LessonRow = {
  id: number;
  title: string;
  lessonType: string;
  sortOrder: number;
  content: string;
  shortDescription: string;
  courseTitle: string;
  courseType: string;
  courseId: number;
};

// ─── Data tables ─────────────────────────────────────────────────────────────

const MATH_TOPICS = [
  { topic: 'số 0', num: 0, emoji: '0️⃣', words: ['không', 'trống rỗng', 'chưa có gì'] },
  { topic: 'số 1', num: 1, emoji: '1️⃣', words: ['một', 'đơn lẻ', 'duy nhất'] },
  { topic: 'số 2', num: 2, emoji: '2️⃣', words: ['hai', 'đôi', 'cặp đôi'] },
  { topic: 'số 3', num: 3, emoji: '3️⃣', words: ['ba', 'bộ ba', 'tam giác'] },
  { topic: 'số 4', num: 4, emoji: '4️⃣', words: ['bốn', 'hình vuông', 'bốn hướng'] },
  { topic: 'số 5', num: 5, emoji: '5️⃣', words: ['năm', 'năm ngón tay', 'nửa mười'] },
  { topic: 'số 6', num: 6, emoji: '6️⃣', words: ['sáu', 'nửa tá', 'sáu mặt xúc xắc'] },
  { topic: 'số 7', num: 7, emoji: '7️⃣', words: ['bảy', 'bảy màu cầu vồng', 'ngày trong tuần'] },
  { topic: 'số 8', num: 8, emoji: '8️⃣', words: ['tám', 'tám chân bạch tuộc', 'số 8 tròn xoe'] },
  { topic: 'số 9', num: 9, emoji: '9️⃣', words: ['chín', 'gần mười', 'chín hành tinh'] },
  { topic: 'số 10', num: 10, emoji: '🔟', words: ['mười', 'mười ngón tay', 'hai chữ số'] },
  { topic: 'phép cộng', num: 3, emoji: '➕', words: ['cộng', 'thêm vào', 'tổng'] },
  { topic: 'phép trừ', num: 5, emoji: '➖', words: ['trừ', 'bớt đi', 'hiệu'] },
  { topic: 'so sánh lớn hơn', num: 4, emoji: '>', words: ['lớn hơn', 'nhiều hơn', 'to hơn'] },
  { topic: 'so sánh nhỏ hơn', num: 2, emoji: '<', words: ['nhỏ hơn', 'ít hơn', 'bé hơn'] },
  { topic: 'hình tròn', num: 0, emoji: '⭕', words: ['tròn', 'không có góc', 'hình bánh xe'] },
  { topic: 'hình vuông', num: 4, emoji: '⬛', words: ['bốn cạnh bằng nhau', 'bốn góc vuông', 'giống ô gạch'] },
  { topic: 'hình tam giác', num: 3, emoji: '🔺', words: ['ba cạnh', 'ba góc', 'nhọn'] },
  { topic: 'đếm từ 1 đến 5', num: 5, emoji: '🖐️', words: ['một hai ba bốn năm', 'đếm ngón tay', 'đếm tuần tự'] },
  { topic: 'đếm từ 6 đến 10', num: 10, emoji: '🤙', words: ['sáu bảy tám chín mười', 'đếm tiếp', 'số lớn hơn'] },
  { topic: 'sắp xếp thứ tự', num: 3, emoji: '📶', words: ['từ bé đến lớn', 'tăng dần', 'xếp hàng'] },
  { topic: 'phân loại', num: 4, emoji: '🗂️', words: ['nhóm', 'loại', 'giống nhau'] },
  { topic: 'đo lường cơ bản', num: 3, emoji: '📏', words: ['dài', 'ngắn', 'đo'] },
  { topic: 'thời gian cơ bản', num: 7, emoji: '⏰', words: ['sáng chiều tối', 'hôm nay ngày mai', 'giờ phút'] },
];

const LANG_TOPICS = [
  { vow: 'a', words: ['ba', 'ca', 'ma', 'la'], objs: ['quả táo', 'con cá', 'bà nội', 'cái la bàn'] },
  { vow: 'ă', words: ['băng', 'căng', 'mắng', 'lặng'], objs: ['băng tuyết', 'cái lặng', 'con mắng', 'băng đĩa'] },
  { vow: 'â', words: ['bầu', 'câu', 'mẫu', 'lầu'], objs: ['bầu trời', 'câu chuyện', 'mẫu vẽ', 'lầu cao'] },
  { vow: 'e', words: ['be', 'ce', 'me', 'le'], objs: ['bé thơ', 'con cú mèo', 'mẹ yêu', 'lê xanh'] },
  { vow: 'ê', words: ['bê', 'kê', 'mê', 'lê'], objs: ['con bê', 'kệ sách', 'mê lộ', 'quả lê'] },
  { vow: 'i', words: ['bi', 'ki', 'mi', 'li'], objs: ['hòn bi', 'kì lạ', 'mì ăn liền', 'lì xì'] },
  { vow: 'o', words: ['bo', 'co', 'mo', 'lo'], objs: ['hoa bo bo', 'co ro', 'móng tay', 'lo lắng'] },
  { vow: 'ô', words: ['bô', 'cô', 'mô', 'lô'], objs: ['cái bô', 'cô giáo', 'mô hình', 'lô đề'] },
  { vow: 'ơ', words: ['bờ', 'cờ', 'mờ', 'lờ'], objs: ['bờ biển', 'cờ Việt Nam', 'mờ ảo', 'lờ đờ'] },
  { vow: 'u', words: ['bu', 'cu', 'mu', 'lu'], objs: ['con bu lon', 'cu cậu', 'múa hát', 'lu hũ'] },
  { vow: 'ư', words: ['bư', 'cư', 'mư', 'lư'], objs: ['con bướm', 'cư dân', 'mưa rào', 'lửa'] },
  { vow: 'an', words: ['ban', 'can', 'man', 'lan'], objs: ['cái bàn', 'con cá', 'màn hình', 'hoa lan'] },
  { vow: 'ăn', words: ['băn', 'căn', 'măn', 'lăn'], objs: ['băn khoăn', 'căn phòng', 'mặn mà', 'lăn bánh'] },
  { vow: 'ân', words: ['bân', 'cân', 'mân', 'lân'], objs: ['bận rộn', 'cân đường', 'mâm cỗ', 'lân cận'] },
  { vow: 'en', words: ['ben', 'cen', 'men', 'len'], objs: ['bến đò', 'xe ben', 'men rượu', 'len nhỏ'] },
  { vow: 'ên', words: ['bên', 'kên', 'mên', 'lên'], objs: ['bên cạnh', 'kền kền', 'mền chăn', 'lên cao'] },
  { vow: 'in', words: ['bin', 'cin', 'min', 'lin'], objs: ['bin rác', 'xin chào', 'mình ơi', 'lin tinh'] },
  { vow: 'on', words: ['bon', 'con', 'mon', 'lon'], objs: ['nhà bon', 'con chim', 'mon mén', 'cái lon'] },
  { vow: 'ôn', words: ['bôn', 'côn', 'môn', 'lôn'], objs: ['bốn cạnh', 'côn đồ', 'môn học', 'lôn xộn'] },
  { vow: 'ơn', words: ['bơn', 'cơn', 'mơn', 'lơn'], objs: ['bơn vơ', 'cơn mưa', 'mơn mởn', 'lơn tơn'] },
  { vow: 'un', words: ['bun', 'cun', 'mun', 'lun'], objs: ['búi tóc', 'cun cút', 'mun mủn', 'lung lay'] },
  { vow: 'ưn', words: ['bưn', 'cưn', 'mưn', 'lưn'], objs: ['bưng bê', 'cưng chiều', 'mừng rỡ', 'lừng danh'] },
  { vow: 'ang', words: ['bang', 'cang', 'mang', 'lang'], objs: ['bang nhóm', 'cánh cang', 'mang vác', 'lang thang'] },
  { vow: 'anh', words: ['banh', 'canh', 'manh', 'lanh'], objs: ['quả banh', 'canh rau', 'manh áo', 'lanh lợi'] },
];

const EMOTION_TOPICS = [
  { emotion: 'vui vẻ', emoji: '😊', color: 'vàng', situation: 'được tặng quà', body: 'mỉm cười, mắt sáng lên', action: 'nhảy múa, hát hò, chia sẻ niềm vui' },
  { emotion: 'buồn bã', emoji: '😢', color: 'xanh dương', situation: 'mất đồ chơi yêu thích', body: 'cúi đầu, chảy nước mắt', action: 'nói chuyện với bố mẹ, ôm gấu bông' },
  { emotion: 'tức giận', emoji: '😠', color: 'đỏ', situation: 'bị bạn giành đồ chơi', body: 'mặt đỏ, tim đập mạnh', action: 'hít thở sâu, đếm đến 10, nói chuyện' },
  { emotion: 'sợ hãi', emoji: '😨', color: 'tím', situation: 'nghe tiếng sấm to', body: 'run rẩy, tim đập nhanh', action: 'ôm bố mẹ, bật đèn sáng, hít thở' },
  { emotion: 'ngạc nhiên', emoji: '😲', color: 'cam', situation: 'thấy điều bất ngờ', body: 'há miệng, mắt mở to', action: 'hỏi thêm, khám phá, chia sẻ' },
  { emotion: 'tự hào', emoji: '😤', color: 'vàng kim', situation: 'hoàn thành bài tốt', body: 'đứng thẳng, nở nụ cười', action: 'khoe với bố mẹ, cảm ơn thầy cô' },
  { emotion: 'xấu hổ', emoji: '😳', color: 'hồng', situation: 'nói sai trước lớp', body: 'mặt đỏ, cúi đầu', action: 'hít thở, nói xin lỗi, thử lại' },
  { emotion: 'ghen tị', emoji: '😒', color: 'xanh lá', situation: 'bạn được điểm cao hơn', body: 'cau mày, không muốn nhìn', action: 'nhớ điểm mạnh của mình, cố gắng hơn' },
  { emotion: 'đồng cảm', emoji: '🤗', color: 'hồng ấm', situation: 'bạn bị ngã đau', body: 'tim thắt lại, muốn giúp đỡ', action: 'hỏi thăm, giúp bạn đứng dậy, an ủi' },
  { emotion: 'biết ơn', emoji: '🙏', color: 'vàng ấm', situation: 'bố mẹ mua cho món quà', body: 'ấm lòng, muốn mỉm cười', action: 'nói cảm ơn, ôm hôn, làm việc tốt đáp lại' },
  { emotion: 'lo lắng', emoji: '😟', color: 'xám', situation: 'ngày mai có bài kiểm tra', body: 'bồn chồn, khó ngủ', action: 'ôn bài, nói chuyện với bố mẹ, hít thở' },
  { emotion: 'phấn khích', emoji: '🤩', color: 'cam sáng', situation: 'sắp đi công viên giải trí', body: 'nói nhanh, bước nhảy', action: 'chuẩn bị đồ đạc, chia sẻ với bạn bè' },
  { emotion: 'bình tĩnh', emoji: '😌', color: 'xanh lam nhạt', situation: 'sau khi hít thở sâu', body: 'thở đều, vai thả lỏng', action: 'suy nghĩ trước khi nói, lắng nghe người khác' },
  { emotion: 'yêu thương', emoji: '❤️', color: 'đỏ hồng', situation: 'được mẹ ôm trước khi ngủ', body: 'ấm áp, an toàn, thư thái', action: 'nói yêu bố mẹ, ôm lại, làm việc giúp đỡ' },
  { emotion: 'tò mò', emoji: '🧐', color: 'tím nhạt', situation: 'thấy con sâu lạ trong vườn', body: 'nghiêng đầu, mắt sáng lên', action: 'hỏi câu hỏi, tìm hiểu, khám phá' },
];

const CREATIVE_TOPICS = [
  { title: 'màu đỏ', emoji: '🔴', skill: 'nhận biết màu', color1: 'đỏ', color2: 'vàng', result: 'cam', objects: ['quả táo', 'hoa hồng', 'đèn dừng'] },
  { title: 'màu xanh dương', emoji: '🔵', skill: 'nhận biết màu', color1: 'xanh', color2: 'đỏ', result: 'tím', objects: ['bầu trời', 'biển cả', 'việt quất'] },
  { title: 'màu vàng', emoji: '🟡', skill: 'nhận biết màu', color1: 'vàng', color2: 'xanh', result: 'xanh lá', objects: ['mặt trời', 'hoa hướng dương', 'chuối'] },
  { title: 'hình tròn', emoji: '⭕', skill: 'vẽ hình', shape: 'tròn', sides: 0, objects: ['mặt trời', 'quả bóng', 'bánh xe'] },
  { title: 'hình vuông', emoji: '⬛', skill: 'vẽ hình', shape: 'vuông', sides: 4, objects: ['cửa sổ', 'quyển sách', 'khung tranh'] },
  { title: 'hình tam giác', emoji: '🔺', skill: 'vẽ hình', shape: 'tam giác', sides: 3, objects: ['núi', 'pizza', 'mũ phù thủy'] },
  { title: 'tô màu cơ bản', emoji: '🖌️', skill: 'tô màu', technique: 'tô đều một chiều', tools: ['bút màu', 'sáp màu'] },
  { title: 'vẽ đường thẳng', emoji: '📏', skill: 'vẽ đường', technique: 'vẽ từ trái sang phải', tools: ['bút chì', 'thước kẻ'] },
  { title: 'vẽ đường cong', emoji: '〰️', skill: 'vẽ đường', technique: 'vẽ mềm mại như làn sóng', tools: ['bút màu nước'] },
  { title: 'tạo hình từ đất nặn', emoji: '🧱', skill: 'nặn đất', technique: 'lăn, bóp, dẹt', tools: ['đất nặn màu'] },
  { title: 'xé dán giấy', emoji: '✂️', skill: 'xé dán', technique: 'xé nhỏ và dán thành hình', tools: ['giấy màu', 'hồ dán'] },
  { title: 'in ngón tay', emoji: '👆', skill: 'in hình', technique: 'chấm màu và ấn ngón tay', tools: ['màu không độc hại'] },
  { title: 'vẽ cây cỏ', emoji: '🌿', skill: 'vẽ thiên nhiên', technique: 'vẽ thân cây rồi thêm lá', tools: ['bút màu xanh nâu'] },
  { title: 'vẽ mặt người', emoji: '😊', skill: 'vẽ chân dung', technique: 'hình tròn + mắt mũi miệng', tools: ['bút chì màu'] },
  { title: 'làm thiệp tặng', emoji: '💌', skill: 'thủ công', technique: 'gấp giấy và trang trí', tools: ['giấy màu', 'nhãn dán', 'bút'] },
  { title: 'ghép mảnh hình', emoji: '🧩', skill: 'ghép hình', technique: 'nhìn tổng thể rồi ghép từng phần', tools: ['mảnh ghép'] },
  { title: 'vẽ con vật', emoji: '🐱', skill: 'vẽ con vật', technique: 'vẽ hình tròn lớn nhỏ rồi thêm chi tiết', tools: ['bút màu'] },
  { title: 'vẽ ngôi nhà', emoji: '🏠', skill: 'vẽ kiến trúc', technique: 'hình vuông + tam giác trên đỉnh', tools: ['thước kẻ', 'bút màu'] },
  { title: 'trang trí bằng sticker', emoji: '🌟', skill: 'trang trí', technique: 'sắp xếp nhãn dán hài hòa', tools: ['nhãn dán', 'giấy trắng'] },
  { title: 'vẽ cầu vồng', emoji: '🌈', skill: 'vẽ màu sắc', technique: 'tô 7 màu theo thứ tự cầu vồng', tools: ['bút màu đầy đủ'] },
  { title: 'origami cơ bản', emoji: '🦢', skill: 'gấp giấy', technique: 'gấp đôi theo đường dẫn', tools: ['giấy vuông màu'] },
];

const LOGIC_TOPICS = [
  { title: 'phân loại hình dạng', pattern: 'phân loại', rule: 'nhóm theo hình dạng', example: 'tròn/vuông/tam giác' },
  { title: 'sắp xếp theo kích thước', pattern: 'sắp xếp', rule: 'từ nhỏ đến lớn', example: 'con kiến → con mèo → con voi' },
  { title: 'dãy số tăng dần', pattern: 'quy luật số', rule: 'mỗi số tăng 1', example: '1, 2, 3, 4, ?' },
  { title: 'dãy số chẵn', pattern: 'quy luật số', rule: 'mỗi số tăng 2', example: '2, 4, 6, 8, ?' },
  { title: 'dãy màu sắc', pattern: 'quy luật màu', rule: 'lặp lại theo chu kỳ', example: '🔴🔵🔴🔵🔴?' },
  { title: 'dãy hình dạng', pattern: 'quy luật hình', rule: 'lặp lại 3 hình', example: '△○□△○□△?' },
  { title: 'tìm điểm khác biệt', pattern: 'phân biệt', rule: 'tìm cái không thuộc nhóm', example: 'táo/cam/chuối/xe hơi → xe hơi' },
  { title: 'suy luận nguyên nhân', pattern: 'suy luận', rule: 'nguyên nhân → kết quả', example: 'trời mưa → đường ướt' },
  { title: 'so sánh tương đồng', pattern: 'tương đồng', rule: 'A là B → C là ?', example: 'Mèo kêu meo → Chó kêu gì?' },
  { title: 'mê cung đơn giản', pattern: 'tìm đường', rule: 'chọn đường đúng về đích', example: 'tránh ngõ cụt, tìm lối thoát' },
  { title: 'ghép cặp logic', pattern: 'ghép đôi', rule: 'nối cặp có liên quan', example: 'chim → tổ, cá → ao' },
  { title: 'suy luận điều kiện', pattern: 'if-then', rule: 'nếu... thì...', example: 'Nếu trời lạnh thì mặc áo ấm' },
  { title: 'quy luật màu xen kẽ', pattern: 'xen kẽ', rule: 'đỏ-xanh-đỏ-xanh', example: 'điền vào ô trống' },
  { title: 'phân tích bộ phận', pattern: 'phân tích', rule: 'tổng thể = các bộ phận', example: 'xe đạp = khung + bánh + tay lái' },
  { title: 'quy luật hướng', pattern: 'hướng', rule: 'trên/dưới/trái/phải', example: 'con mèo ở đâu so với cái ghế?' },
  { title: 'phân loại sống/vật vô sinh', pattern: 'phân loại', rule: 'sinh vật vs đồ vật', example: 'cây cỏ/con vật vs bàn ghế/xe cộ' },
  { title: 'sắp xếp sự kiện', pattern: 'thứ tự', rule: 'trước → sau', example: 'sáng → trưa → tối; trứng → gà con → gà lớn' },
  { title: 'tìm quy luật ẩn', pattern: 'quy luật phức', rule: 'quan sát nhiều chiều', example: '1,4,9,16,? → số bình phương' },
  { title: 'venn diagram đơn giản', pattern: 'phân loại chồng', rule: 'giao nhau và không giao nhau', example: 'đồ vật màu đỏ VÀ hình tròn' },
  { title: 'suy luận số lượng', pattern: 'đếm', rule: 'đếm theo điều kiện', example: 'đếm chỉ những con vật có 4 chân' },
  { title: 'logic không gian', pattern: 'không gian', rule: 'hình dạng khi xoay/lật', example: 'hình này trông như thế nào khi lật ngược?' },
];

// ─── Builders ────────────────────────────────────────────────────────────────

function buildDetail(l: LessonRow, globalIdx: number) {
  const ct = l.courseType;
  const idx = l.sortOrder - 1; // 0-based

  if (ct === 'math') return buildMathDetail(l, idx, globalIdx);
  if (ct === 'language') return buildLangDetail(l, idx, globalIdx);
  if (ct === 'creative') return buildCreativeDetail(l, idx, globalIdx);
  if (ct === 'emotion') return buildEmotionDetail(l, idx, globalIdx);
  return buildLogicDetail(l, idx, globalIdx);
}

// ── MATH ────────────────────────────────────────────────────────────────────

function buildMathDetail(l: LessonRow, idx: number, gi: number) {
  const t = MATH_TOPICS[idx % MATH_TOPICS.length];
  const n = t.num;
  const nextN = n + 1;

  const goals = [
    `Nhận biết và đọc được ${t.topic} chính xác`,
    `Đếm ${n > 0 ? n : 'và hiểu khái niệm'} đồ vật trong thực tế`,
    `Viết ${t.topic} và áp dụng vào bài tập`,
  ];

  const warmup = {
    emoji: t.emoji,
    title: `Khởi động với ${t.topic}`,
    duration: 2,
    description: `Cùng bé vận động nhẹ nhàng để não bộ sẵn sàng học về ${t.topic}!`,
    steps: [
      `Vỗ tay ${Math.max(n, 1)} lần và đếm to: ${Array.from({ length: Math.max(n, 1) }, (_, i) => i + 1).join(', ')}!`,
      `Giơ ${Math.max(n, 1)} ngón tay lên và nói "${t.words[0]}"!`,
      `Nhìn quanh phòng — bé tìm ${Math.max(n, 1)} đồ vật giống nhau nhé!`,
      `Hít thở sâu — sẵn sàng học ${t.topic} rồi! ${t.emoji}`,
    ],
  };

  const knowledge = {
    title: `Khám phá ${t.topic}`,
    summary: l.content || `${t.topic.charAt(0).toUpperCase() + t.topic.slice(1)} là khái niệm toán học cơ bản giúp bé hiểu về số lượng và thứ tự.`,
    points: [
      {
        title: `Hình dạng và cách viết ${t.topic}`,
        explanation: `${t.emoji} trông giống ${t.words[1] || t.words[0]}. Khi viết, bé chú ý nét bút từ trên xuống dưới, liền mạch không nhấc bút.`,
        example: `Bé thử viết ${t.topic} vào không khí bằng ngón trỏ, sau đó viết vào giấy 3 lần.`,
        visual: t.emoji,
      },
      {
        title: `Đọc và nhận biết ${t.topic}`,
        explanation: `Ta đọc là "${t.words[0]}". ${n > 0 ? `Khi thấy ${n} đồ vật → đọc ${t.words[0]}!` : 'Số 0 nghĩa là chưa có gì, trống rỗng.'}`,
        example: n > 0 ? `Có ${n} quả táo 🍎 → đọc: ${t.words[0]} quả táo.` : `Đĩa không có bánh → đọc: không có bánh nào.`,
        visual: '👁️',
      },
      {
        title: `${t.topic} trong cuộc sống`,
        explanation: `Bé tìm ${t.topic} trong cuộc sống hàng ngày: đồ vật, thức ăn, thú cưng, bước chân...`,
        example: `${t.words[2] || t.words[0]}: ${n > 0 ? `có ${n} ${['chiếc bánh', 'con cá', 'quả cam', 'cái ghế'][gi % 4]} trên bàn!` : 'đĩa bánh chưa có gì hết!'}`,
        visual: '🌍',
      },
    ],
  };

  const practice = {
    title: `Luyện tập ${t.topic}`,
    instruction: `Bé làm từng bài tập, không vội vàng nhé! Đọc kỹ và suy nghĩ trước khi trả lời.`,
    items: [
      {
        type: 'choose',
        question: n > 0 ? `Đây là mấy ${['ngôi sao', 'quả táo', 'con cá', 'chú gà'][gi % 4]}? ${'⭐'.repeat(n)}` : `Đĩa này có bao nhiêu bánh? 🍽️`,
        options: [`${Math.max(n - 1, 0)}`, `${n}`, `${n + 1}`, `${n + 2}`],
        answer: `${n}`,
        hint: `Đếm từng cái một, chậm rãi nhé bé!`,
      },
      {
        type: 'fill',
        question: n > 0 ? `Điền số còn thiếu: ${Math.max(n - 1, 0)}, ___, ${n + 1}` : `Điền số: ___, 1, 2`,
        options: [],
        answer: `${n}`,
        hint: `Nhìn số trước và số sau để tìm số ở giữa`,
      },
      {
        type: 'choose',
        question: `Số nào đứng sau ${t.topic} (${n})?`,
        options: [`${n - 1 >= 0 ? n - 1 : n + 3}`, `${n + 1}`, `${n + 2}`, `${n + 3}`],
        answer: `${nextN}`,
        hint: `Đếm tiếp lên một số nữa từ ${n}`,
      },
    ],
  };

  const game = {
    title: `🎮 Bắt ${t.emoji} bay!`,
    type: 'tap',
    description: `Các số bay trên màn hình — bé chạm nhanh vào ${t.emoji} (${t.topic}) mỗi khi thấy!`,
    duration: 3,
    instructions: [
      `Màn hình sẽ hiện nhiều số khác nhau`,
      `Bé chỉ chạm vào ${t.topic} — tránh nhầm số khác`,
      `Mỗi lần đúng được ${10 + n} điểm ⭐`,
      `Thu được 5 ${t.emoji} là thắng trò chơi!`,
    ],
    reward: `🏆 Mở được huy hiệu "${t.words[0].toUpperCase()}" trong bộ sưu tập số!`,
  };

  const quiz = {
    title: `Kiểm tra: ${t.topic}`,
    passingScore: 60,
    questions: [
      {
        id: 1, emoji: t.emoji,
        question: n > 0 ? `${'⭐'.repeat(Math.min(n, 5))} — Có bao nhiêu ngôi sao?` : `Bé có 3 kẹo, ăn hết 3 cái. Còn lại mấy cái?`,
        options: [`${Math.max(n - 1, 0)}`, `${n}`, `${n + 1}`, `${n + 2}`],
        answer: `${n}`,
        explanation: n > 0 ? `Đúng! Đếm từng ngôi sao: ${Array.from({ length: n }, (_, i) => i + 1).join(', ')} → có ${n} ngôi sao.` : `Đúng! 3 trừ 3 bằng 0 — không còn kẹo nào cả!`,
      },
      {
        id: 2, emoji: '🔢',
        question: `Số nào lớn hơn: ${n} hay ${n + 2}?`,
        options: [`${n}`, `${n + 2}`, `Bằng nhau`, `Không biết`],
        answer: `${n + 2}`,
        explanation: `${n + 2} lớn hơn ${n} vì ${n + 2} đứng sau ${n} trong dãy số.`,
      },
      {
        id: 3, emoji: '📊',
        question: n > 0 ? `Dãy số: ${Math.max(n - 1, 0)}, ${n}, ___. Số tiếp theo là?` : `Dãy số: 0, 1, ___. Số tiếp theo là?`,
        options: [`${n}`, `${n + 1}`, `${n + 2}`, `${n - 1 >= 0 ? n - 1 : n + 3}`],
        answer: `${n + 1}`,
        explanation: `Dãy số tăng dần mỗi lần 1 đơn vị. Sau ${n} là ${n + 1}.`,
      },
      {
        id: 4, emoji: '🍬',
        question: n > 0 ? `Có ${n + 2} cái kẹo, bé ăn ${n} cái. Còn lại mấy cái?` : `Bé có 5 cái bánh, ăn 5 cái. Còn lại mấy cái?`,
        options: n > 0 ? [`${n}`, `2`, `${n + 2}`, `1`] : [`5`, `0`, `1`, `10`],
        answer: n > 0 ? `2` : `0`,
        explanation: n > 0 ? `${n + 2} trừ ${n} bằng 2. Còn lại 2 cái kẹo!` : `5 trừ 5 bằng 0. Ăn hết rồi!`,
      },
      {
        id: 5, emoji: '👈',
        question: `Số nào đứng TRƯỚC ${t.topic} (${n})?`,
        options: n > 0 ? [`${n - 1}`, `${n + 1}`, `${n + 2}`, `${n - 2 >= 0 ? n - 2 : n + 3}`] : [`1`, `2`, `0`, `3`],
        answer: n > 0 ? `${n - 1}` : `0`,
        explanation: n > 0 ? `Số đứng trước ${n} là ${n - 1}. Đếm lùi 1 bước!` : `0 là số nhỏ nhất, không có số nào đứng trước nó!`,
      },
    ],
  };

  const reward = {
    badge: ['⭐', '🏆', '🥇', '🎯', '🔢', '💎', '🚀', '🌟'][gi % 8],
    title: `Huy hiệu Nhà Toán Học Nhỏ — ${t.topic}`,
    description: `Bé đã chinh phục ${t.topic}! Kiến thức này sẽ theo bé suốt cuộc đời.`,
    points: 10 + n * 2,
    message: ['Tuyệt vời! Bé thật giỏi toán! 🎉', 'Bé học rất chăm chỉ! Bố mẹ tự hào! ⭐', 'Xuất sắc! Bé ngày càng tiến bộ! 🚀', 'Hoàn hảo! Bé đã nắm vững bài hôm nay! 💪'][gi % 4],
  };

  const report = {
    summary: `Bé đã hoàn thành bài học ${t.topic}. Kiến thức về ${t.topic} giúp bé xây dựng nền tảng toán học vững chắc.`,
    tracked: [
      { metric: 'Nhận biết số', description: `Bé có thể nhìn và đọc đúng ${t.topic}` },
      { metric: 'Đếm số lượng', description: n > 0 ? `Bé đếm được ${n} đồ vật chính xác` : 'Bé hiểu khái niệm "không có gì"' },
      { metric: 'Điểm kiểm tra', description: 'Số câu đúng trong phần quiz (tối đa 5 câu)' },
      { metric: 'Tốc độ phản xạ', description: 'Thời gian bé nhận ra số trong trò chơi' },
    ],
    tips: [
      `Chỉ vào đồ vật và hỏi bé: "Đây là mấy cái?" khi đi siêu thị hoặc ăn cơm`,
      n > 0 ? `Để bé đếm ${n} bước chân khi leo cầu thang hoặc ${n} thìa cơm khi ăn` : `Hỏi bé: "Còn kẹo không? Không có nghĩa là mấy?"`,
      `Ôn lại bài ${t.topic} sau 2 ngày — lặp lại giúp ghi nhớ lâu hơn 3 lần!`,
    ],
  };

  const review = {
    title: `Ôn lại — ${t.topic}`,
    keyPoints: [
      `${t.topic} ${n > 0 ? `đọc là "${t.words[0]}"` : 'là số không, nghĩa là "chưa có gì"'}`,
      `${t.topic} có hình dạng ${t.emoji} — bé viết ${n > 0 ? 'bằng 1 nét từ trên xuống' : 'hình tròn có gạch ngang giữa'}`,
      n > 0 ? `${n} đồ vật = ${t.words[0]}. Bé đếm: ${Array.from({ length: n }, (_, i) => i + 1).join(', ')}` : `Trước ${t.emoji} 0 không có số nào, sau 0 là số 1`,
    ],
    nextLesson: `Bài tiếp theo: ${MATH_TOPICS[(idx + 1) % MATH_TOPICS.length].topic} ${MATH_TOPICS[(idx + 1) % MATH_TOPICS.length].emoji} — hãy tiếp tục khám phá!`,
    encouragement: ['Bé học rất giỏi hôm nay! Ngày mai mình học tiếp nhé 🌙', 'Mỗi ngày học một chút, bé sẽ giỏi toán hơn mỗi ngày! 🌱', 'Bé thật kiên trì! Đó là bí quyết thành công đấy! ⭐'][gi % 3],
  };

  return { goals, warmup, knowledge, practice, game, quiz, reward, report, review };
}

// ── LANGUAGE ────────────────────────────────────────────────────────────────

function buildLangDetail(l: LessonRow, idx: number, gi: number) {
  const t = LANG_TOPICS[idx % LANG_TOPICS.length];
  const v = t.vow;
  const w0 = t.words[0], w1 = t.words[1], w2 = t.words[2];

  const goals = [
    `Đọc và nhận biết âm "${v}" chính xác`,
    `Ghép âm "${v}" với phụ âm để tạo từ mới`,
    `Nhớ ít nhất 3 từ có âm "${v}" sau bài học`,
  ];

  const warmup = {
    emoji: '📖',
    title: `Khởi động âm "${v}"`,
    duration: 2,
    description: `Làm nóng giọng và tai để chuẩn bị học âm "${v}" thật tốt!`,
    steps: [
      `Hít vào sâu — thở ra và kéo dài âm: "${v}~~~~~~~~"`,
      `Vỗ tay theo nhịp và đọc: "${w0}, ${w1}, ${w2}"`,
      `Hỏi bé: "Con biết từ nào có âm '${v}' không?"`,
      `Sẵn sàng rồi — vào bài học thôi! 📖`,
    ],
  };

  const knowledge = {
    title: `Khám phá âm "${v}"`,
    summary: l.content || `Âm "${v}" là một trong những âm cơ bản trong tiếng Việt, xuất hiện trong rất nhiều từ thông dụng hàng ngày.`,
    points: [
      {
        title: `Cách phát âm "${v}"`,
        explanation: `Mở miệng ${v.includes('â') || v.includes('ô') || v.includes('ơ') || v.includes('ư') ? 'vừa phải, môi tròn' : 'rộng, lưỡi ở dưới'}, đọc rõ ràng "${v}". Âm này ${t.objs[0].includes('biển') ? 'dài, vang' : 'ngắn gọn, dứt khoát'}.`,
        example: `Bé thử đứng trước gương, đọc "${v}" 5 lần — nhìn xem môi và miệng thay đổi thế nào!`,
        visual: '👄',
      },
      {
        title: `Từ có âm "${v}"`,
        explanation: `Các từ thường gặp: ${t.words.slice(0, 3).join(', ')}. Bé hãy vừa đọc vừa chỉ vào hình tương ứng.`,
        example: `${t.objs.slice(0, 3).map((o, i) => `"${t.words[i]}" → ${o}`).join(', ')}`,
        visual: '📝',
      },
      {
        title: `Ghép âm tạo từ mới`,
        explanation: `Khi ghép phụ âm với vần "${v}", ta tạo ra từ mới. Ví dụ: "b" + "${v}" = "${w0}", "m" + "${v}" = "${w2}".`,
        example: `Bé thử ghép: "c" + "${v}" = ? | "l" + "${v}" = ? | "n" + "${v}" = ?`,
        visual: '🔤',
      },
    ],
  };

  const practice = {
    title: `Luyện tập âm "${v}"`,
    instruction: `Bé thực hành từng bài, đọc to câu hỏi trước khi trả lời nhé!`,
    items: [
      {
        type: 'choose',
        question: `Từ nào có âm "${v}"?`,
        options: [w0, 'trời', 'mưa', 'cây'],
        answer: w0,
        hint: `Đọc to từng từ — từ nào có âm "${v}" trong đó?`,
      },
      {
        type: 'fill',
        question: `Ghép âm: "b" + "${v}" = ___`,
        options: [],
        answer: w0,
        hint: `Đọc "b" rồi đọc "${v}" liền nhau thật nhanh!`,
      },
      {
        type: 'choose',
        question: `"${t.objs[0]}" — từ này có âm gì?`,
        options: [`"${v}"`, '"a"', '"o"', '"i"'],
        answer: `"${v}"`,
        hint: `Đọc to "${t.objs[0]}" — bé nghe thấy âm nào trong đó?`,
      },
    ],
  };

  const game = {
    title: `🎮 Săn chữ "${v}"`,
    type: 'tap',
    description: `Các âm tiết xuất hiện trên màn hình — bé bấm nhanh vào những âm có "${v}"!`,
    duration: 3,
    instructions: [
      `Nhìn từng âm hiện ra trên màn hình`,
      `Chỉ bấm vào từ/âm có chứa "${v}"`,
      `Bấm đúng được +10 điểm, bấm sai trừ 5 điểm`,
      `Đạt 50 điểm là chiến thắng! 🏆`,
    ],
    reward: `📚 Nhận danh hiệu "Nhà ngôn ngữ nhỏ — âm ${v}" cho hôm nay!`,
  };

  const quiz = {
    title: `Kiểm tra: âm "${v}"`,
    passingScore: 60,
    questions: [
      {
        id: 1, emoji: '📖',
        question: `Từ nào CÓ âm "${v}"?`,
        options: [w0, 'xe đạp', 'con sâu', 'bầu trời'],
        answer: w0,
        explanation: `"${w0}" có âm "${v}". Đọc to: ${w0} — nghe thấy "${v}" không?`,
      },
      {
        id: 2, emoji: '🔤',
        question: `"b" + "${v}" = ?`,
        options: [w0, w1, `d${v}`, `m${v}`],
        answer: w0,
        explanation: `Ghép "b" với "${v}" ta được "${w0}". Đọc liền: b-${v} → ${w0}!`,
      },
      {
        id: 3, emoji: '✏️',
        question: `Từ "${w1}" có âm gì ở vần?`,
        options: [`"${v}"`, '"i"', '"o"', '"e"'],
        answer: `"${v}"`,
        explanation: `Từ "${w1}" kết thúc bằng âm "${v}". Bé tách ra: ${w1.slice(0, -v.length)}-${v}!`,
      },
      {
        id: 4, emoji: '🎵',
        question: `Tiếng Việt có bao nhiêu thanh điệu?`,
        options: ['4', '5', '6', '7'],
        answer: '6',
        explanation: `Tiếng Việt có 6 thanh: ngang (a), huyền (à), sắc (á), hỏi (ả), ngã (ã), nặng (ạ).`,
      },
      {
        id: 5, emoji: '🔊',
        question: `"${w2}" có mấy âm tiết?`,
        options: ['1', '2', '3', '4'],
        answer: '1',
        explanation: `"${w2}" chỉ có 1 âm tiết vì đọc một hơi không ngắt.`,
      },
    ],
  };

  const reward = {
    badge: ['📚', '✏️', '🦋', '🌈', '🎤', '📝', '🌸', '🦜'][gi % 8],
    title: `Huy hiệu Nhà Ngôn Ngữ — âm "${v}"`,
    description: `Bé đã thuộc âm "${v}" và biết ${t.words.length} từ mới! Kho từ vựng của bé ngày càng phong phú.`,
    points: 15 + gi % 5,
    message: [`Tuyệt vời! Bé phát âm chuẩn lắm! 🎤`, `Bé học rất chăm! Đọc thêm sách nhé! 📚`, `Xuất sắc! Bé sẽ đọc được sách một mình sớm thôi! 🌟`][gi % 3],
  };

  const report = {
    summary: `Bé hoàn thành bài âm "${v}" — biết đọc, nhận biết và ghép âm thành từ. Đây là bước quan trọng để bé đọc sách độc lập!`,
    tracked: [
      { metric: 'Phát âm', description: `Bé đọc được âm "${v}" rõ ràng và chính xác` },
      { metric: 'Nhận biết', description: `Bé tìm được từ có âm "${v}" trong đoạn văn` },
      { metric: 'Ghép âm', description: `Bé ghép phụ âm + vần "${v}" tạo từ mới` },
      { metric: 'Từ vựng', description: `Bé nhớ được ${t.words.length} từ mới trong bài học` },
    ],
    tips: [
      `Đọc sách cùng bé 10 phút mỗi tối — chỉ vào chữ khi đọc to`,
      `Hỏi bé: "Con tìm được từ nào có âm '${v}' trong bài này không?"`,
      `Dán chữ "${v}" lên đồ vật trong nhà có âm đó để bé nhớ lâu hơn`,
    ],
  };

  const review = {
    title: `Ôn lại — âm "${v}"`,
    keyPoints: [
      `Âm "${v}" đọc là "${v}" — mở miệng ${v.includes('o') ? 'tròn' : 'rộng'} và phát âm rõ`,
      `Từ có âm "${v}": ${t.words.join(', ')}`,
      `Ghép "b" + "${v}" = "${w0}" — bé thử ghép thêm với các phụ âm khác nhé!`,
    ],
    nextLesson: `Bài tiếp theo: âm "${LANG_TOPICS[(idx + 1) % LANG_TOPICS.length].vow}" — tiếp tục hành trình ngôn ngữ!`,
    encouragement: [`Bé đọc giỏi lắm! Đọc sách thêm nhé 📚`, `Mỗi âm học được là một bước gần hơn đến việc đọc sách một mình! 🌱`, `Bé kiên trì thật! Cứ thế này bé sẽ đọc truyện được sớm thôi! 🌟`][gi % 3],
  };

  return { goals, warmup, knowledge, practice, game, quiz, reward, report, review };
}

// ── CREATIVE ────────────────────────────────────────────────────────────────

function buildCreativeDetail(l: LessonRow, idx: number, gi: number) {
  const t = CREATIVE_TOPICS[idx % CREATIVE_TOPICS.length];

  const goals = [
    `Hiểu và thực hành kỹ năng: ${t.skill}`,
    `Hoàn thành hoạt động sáng tạo liên quan đến ${t.title}`,
    `Tự tin trình bày và chia sẻ tác phẩm với bố mẹ`,
  ];

  const warmup = {
    emoji: t.emoji,
    title: `Khởi động sáng tạo`,
    duration: 2,
    description: `Cùng làm nóng đôi tay và khai thông trí tưởng tượng trước khi vào bài!`,
    steps: [
      `Xòe 2 bàn tay — vẫy ngón tay nhanh như bướm bay 5 lần`,
      `Nhìn quanh phòng — bé tìm ${t.title} ở đâu đó không?`,
      `Hỏi bé: "Con nghĩ ${t.title} trông như thế nào?"`,
      `Sẵn sàng tạo ra điều kỳ diệu! ${t.emoji}`,
    ],
  };

  const hasColor = 'color1' in t;
  const hasShape = 'shape' in t;
  const hasTech = 'technique' in t;

  const knowledge = {
    title: `Khám phá: ${t.title}`,
    summary: l.content || `${t.title.charAt(0).toUpperCase() + t.title.slice(1)} là chủ đề thú vị trong nghệ thuật dành cho bé. Hôm nay bé sẽ học kỹ năng ${t.skill} qua hoạt động thực hành vui vẻ!`,
    points: [
      {
        title: hasColor ? `Màu ${(t as any).color1} và cách nhận biết` : hasShape ? `Hình ${(t as any).shape} trong cuộc sống` : `Kỹ thuật ${t.skill}`,
        explanation: hasColor
          ? `Màu ${(t as any).color1} là màu cơ bản — không pha từ màu nào khác. Khi pha ${(t as any).color1} + ${(t as any).color2}, ta được màu ${(t as any).result}!`
          : hasShape
            ? `Hình ${(t as any).shape} có ${(t as any).sides === 0 ? 'không có cạnh nào, trơn tròn đều' : `${(t as any).sides} cạnh đều nhau`}. Bé tìm hình này ở đâu trong nhà?`
            : `Kỹ thuật ${t.skill}: ${(t as any).technique || 'thực hành từng bước nhỏ'}.`,
        example: hasColor ? `${(t as any).objects?.join(', ')} đều màu ${(t as any).color1}.` : hasShape ? `${(t as any).objects?.join(', ')} đều có hình ${(t as any).shape}.` : `Dụng cụ cần: ${(t as any).tools?.join(', ')}.`,
        visual: t.emoji,
      },
      {
        title: `Cách thực hành ${t.skill}`,
        explanation: hasTech ? `${(t as any).technique}. Bé hãy thử từ từ, không vội vàng — nghệ thuật cần sự kiên nhẫn!` : `Bắt đầu từ hình đơn giản nhất, dần dần thêm chi tiết. Nhìn mẫu → thử → nhìn lại → chỉnh sửa.`,
        example: `Dụng cụ cần chuẩn bị: ${(t as any).tools?.join(', ') || 'bút màu, giấy trắng'}.`,
        visual: '✏️',
      },
      {
        title: `Sáng tạo theo cách của bé`,
        explanation: `Không có đúng hay sai trong nghệ thuật! Bé có thể thêm màu sắc yêu thích, thay đổi hình dạng, hoặc kết hợp với ý tưởng riêng của mình.`,
        example: `Sau khi làm theo mẫu, bé thử tự sáng tạo thêm 1 phiên bản riêng — thú vị hơn nhiều! 🎨`,
        visual: '🌈',
      },
    ],
  };

  const practice = {
    title: `Thực hành: ${t.title}`,
    instruction: `Bé cùng làm từng bước một, đọc kỹ hướng dẫn trước khi thực hiện nhé!`,
    items: [
      {
        type: 'choose',
        question: hasColor ? `Màu nào là màu CƠ BẢN?` : hasShape ? `Hình ${(t as any).shape} có bao nhiêu cạnh?` : `Kỹ thuật "${t.skill}" dùng công cụ gì?`,
        options: hasColor
          ? [(t as any).color1, 'Cam', 'Tím', 'Nâu']
          : hasShape
            ? [`${(t as any).sides === 0 ? '0' : (t as any).sides}`, `${(t as any).sides + 1}`, `${(t as any).sides + 2}`, '5']
            : [(t as any).tools?.[0] || 'bút màu', 'thước kẻ kim loại', 'dao kéo', 'búa đinh'],
        answer: hasColor ? (t as any).color1 : hasShape ? `${(t as any).sides === 0 ? '0' : (t as any).sides}` : (t as any).tools?.[0] || 'bút màu',
        hint: hasColor ? 'Màu cơ bản là màu không pha từ màu khác' : hasShape ? 'Đếm số cạnh của hình' : 'Nhìn lại phần dụng cụ cần chuẩn bị',
      },
      {
        type: 'choose',
        question: hasColor ? `Pha ${(t as any).color1} + ${(t as any).color2} được màu gì?` : `Đặc điểm nào ĐÚNG với ${t.title}?`,
        options: hasColor
          ? [(t as any).result, 'Đen', 'Trắng', 'Xám']
          : [`Đặc điểm đúng của ${t.title}`, 'Bất kỳ hình nào cũng giống nhau', 'Không liên quan đến nghệ thuật', 'Chỉ dùng màu đen'],
        answer: hasColor ? (t as any).result : `Đặc điểm đúng của ${t.title}`,
        hint: hasColor ? 'Thử hình dung pha hai màu này trong tưởng tượng!' : 'Nghĩ lại những gì bé vừa học',
      },
      {
        type: 'choose',
        question: `Khi tô màu, bé nên tô theo hướng nào để màu đẹp nhất?`,
        options: ['Tô lung tung mọi hướng', 'Tô theo 1 hướng đều đặn', 'Tô xoay tròn thật nhanh', 'Không quan trọng'],
        answer: 'Tô theo 1 hướng đều đặn',
        hint: 'Hướng đều giúp màu phủ đồng đều và không bị vệt',
      },
    ],
  };

  const game = {
    title: `🎮 Studio sáng tạo mini`,
    type: 'drag-drop',
    description: `Bé kéo màu sắc và hình dạng vào đúng vị trí để hoàn thành bức tranh chủ đề ${t.title}!`,
    duration: 4,
    instructions: [
      `Nhìn bức tranh chưa hoàn chỉnh ở giữa màn hình`,
      `Kéo từng màu/hình từ thanh công cụ vào vị trí đúng`,
      `Số nhỏ trong mỗi vùng cho biết màu số mấy cần tô`,
      `Hoàn thành toàn bộ bức tranh để mở khoá tác phẩm nghệ thuật!`,
    ],
    reward: `🖼️ Tác phẩm "${t.title}" của bé được lưu vào bộ sưu tập nghệ thuật!`,
  };

  const quiz = {
    title: `Kiểm tra: ${t.title}`,
    passingScore: 60,
    questions: [
      {
        id: 1, emoji: t.emoji,
        question: hasColor ? `Màu "${(t as any).color1}" thuộc loại màu gì?` : `"${t.title}" là kỹ năng gì trong nghệ thuật?`,
        options: hasColor ? ['Màu cơ bản', 'Màu thứ cấp', 'Màu trung gian', 'Màu trung tính'] : [t.skill, 'Kỹ năng khoa học', 'Kỹ năng thể thao', 'Kỹ năng toán học'],
        answer: hasColor ? 'Màu cơ bản' : t.skill,
        explanation: hasColor ? `${(t as any).color1} là màu cơ bản vì không pha từ màu nào khác. 3 màu cơ bản: đỏ, xanh, vàng.` : `${t.title} giúp phát triển kỹ năng ${t.skill} — rất quan trọng trong nghệ thuật!`,
      },
      {
        id: 2, emoji: '🧪',
        question: `Pha đỏ + vàng được màu gì?`,
        options: ['Cam', 'Tím', 'Xanh lá', 'Nâu'],
        answer: 'Cam',
        explanation: `Đỏ + Vàng = Cam. Đây là màu thứ cấp được pha từ 2 màu cơ bản!`,
      },
      {
        id: 3, emoji: '⬜',
        question: `Hình nào có 4 cạnh bằng nhau?`,
        options: ['Hình chữ nhật', 'Hình vuông', 'Tam giác', 'Hình thang'],
        answer: 'Hình vuông',
        explanation: `Hình vuông có 4 cạnh bằng nhau và 4 góc vuông — đặc điểm độc đáo của nó!`,
      },
      {
        id: 4, emoji: '🎨',
        question: `Để tô màu đẹp, bé nên làm thế nào?`,
        options: ['Tô thật nhanh', 'Tô theo 1 hướng đều đặn', 'Tô ra ngoài viền', 'Tô càng đậm càng tốt'],
        answer: 'Tô theo 1 hướng đều đặn',
        explanation: `Tô theo 1 hướng giúp màu phủ đều, không bị vệt hoặc loang. Hãy kiên nhẫn nhé!`,
      },
      {
        id: 5, emoji: '🌈',
        question: `Cầu vồng có bao nhiêu màu?`,
        options: ['5', '6', '7', '8'],
        answer: '7',
        explanation: `Cầu vồng có 7 màu: Đỏ, Cam, Vàng, Xanh lá, Xanh dương, Chàm, Tím — bé nhớ chưa?`,
      },
    ],
  };

  const reward = {
    badge: ['🎨', '🖌️', '🌻', '🎭', '🦄', '🌈', '🎪', '🎠'][gi % 8],
    title: `Huy hiệu Nghệ Sĩ Nhỏ — ${t.title}`,
    description: `Bé đã hoàn thành tác phẩm về ${t.title}! Sáng tạo của bé thật đặc biệt và độc đáo.`,
    points: 15 + gi % 8,
    message: [`Tác phẩm của bé thật đẹp! `, `Bé sáng tạo thật! Tiếp tục tô màu vào cuộc sống nhé! 🌈`, `Xuất sắc! Nghệ thuật của bé làm mọi người vui! 🎨`][gi % 3],
  };

  const report = {
    summary: `Bé đã hoàn thành bài học về ${t.title} và phát triển kỹ năng ${t.skill}. Hoạt động sáng tạo giúp bé tư duy linh hoạt và biểu đạt cảm xúc.`,
    tracked: [
      { metric: 'Kỹ năng tay', description: `Bé thực hành ${t.skill} với độ khéo léo ngày càng tăng` },
      { metric: 'Tư duy sáng tạo', description: 'Bé tự thêm ý tưởng riêng vào tác phẩm' },
      { metric: 'Kiên nhẫn', description: 'Bé hoàn thành tác phẩm từ đầu đến cuối không bỏ dở' },
      { metric: 'Biểu đạt', description: 'Bé có thể mô tả tác phẩm của mình cho bố mẹ nghe' },
    ],
    tips: [
      `Trưng bày tác phẩm của bé ở nơi trang trọng — tủ lạnh, bảng treo phòng`,
      `Hỏi bé: "Con vẽ cái này vì sao?" thay vì nhận xét đẹp/xấu`,
      `Cung cấp thêm dụng cụ: đất nặn, giấy màu, keo dán — để bé tự khám phá`,
    ],
  };

  const review = {
    title: `Ôn lại — ${t.title}`,
    keyPoints: [
      `${t.skill}: bé đã thực hành và hoàn thiện kỹ năng này hôm nay`,
      hasColor ? `Màu ${(t as any).color1} + ${(t as any).color2} = màu ${(t as any).result}` : hasShape ? `Hình ${(t as any).shape} có ${(t as any).sides} cạnh — tìm nó trong cuộc sống nhé!` : `Kỹ thuật "${(t as any).technique || t.skill}" — luyện tập thêm ở nhà!`,
      `Nghệ thuật không có đúng sai — cứ sáng tạo theo cách của bé!`,
    ],
    nextLesson: `Bài tiếp theo: ${CREATIVE_TOPICS[(idx + 1) % CREATIVE_TOPICS.length].title} ${CREATIVE_TOPICS[(idx + 1) % CREATIVE_TOPICS.length].emoji} — tiếp tục hành trình nghệ thuật!`,
    encouragement: [`Tác phẩm của bé thật đẹp! Bố mẹ cất giữ nhé! 🖼️`, `Bé có năng khiếu nghệ thuật đấy! Tiếp tục nhé! 🌟`, `Sáng tạo như bé — thế giới thêm nhiều màu sắc! 🌈`][gi % 3],
  };

  return { goals, warmup, knowledge, practice, game, quiz, reward, report, review };
}

// ── EMOTION ────────────────────────────────────────────────────────────────

function buildEmotionDetail(l: LessonRow, idx: number, gi: number) {
  const t = EMOTION_TOPICS[idx % EMOTION_TOPICS.length];

  const goals = [
    `Nhận biết và gọi tên cảm xúc "${t.emotion}" chính xác`,
    `Hiểu nguyên nhân và biểu hiện của "${t.emotion}"`,
    `Biết 3 cách lành mạnh để ứng xử với cảm xúc này`,
  ];

  const warmup = {
    emoji: t.emoji,
    title: `Khởi động cảm xúc`,
    duration: 2,
    description: `Cùng bé tập nhận biết cảm xúc qua biểu cảm khuôn mặt và cơ thể!`,
    steps: [
      `Đứng trước gương — bé thử tạo biểu cảm ${t.emoji} (${t.emotion})`,
      `Hỏi bé: "Con cảm thấy thế nào khi ${t.situation}?"`,
      `Ôm bé và nói: "Mọi cảm xúc đều ổn — quan trọng là mình biết cách xử lý"`,
      `Sẵn sàng học về cảm xúc "${t.emotion}" rồi! ${t.emoji}`,
    ],
  };

  const knowledge = {
    title: `Khám phá cảm xúc: ${t.emotion}`,
    summary: l.content || `"${t.emotion.charAt(0).toUpperCase() + t.emotion.slice(1)}" là một cảm xúc quan trọng mà mọi người đều trải qua. Nhận biết và hiểu cảm xúc giúp bé sống hạnh phúc và kết bạn dễ hơn!`,
    points: [
      {
        title: `Nhận biết cảm xúc ${t.emoji} ${t.emotion}`,
        explanation: `Khi ${t.emotion}, cơ thể bé sẽ: ${t.body}. Đây là tín hiệu tự nhiên — cơ thể đang "nói chuyện" với bé!`,
        example: `Ví dụ: Khi ${t.situation}, bé có thể cảm thấy ${t.emotion}. Lúc đó cơ thể bé: ${t.body}.`,
        visual: t.emoji,
      },
      {
        title: `Tại sao bé cảm thấy ${t.emotion}?`,
        explanation: `Cảm xúc luôn có nguyên nhân. ${t.emotion.charAt(0).toUpperCase() + t.emotion.slice(1)} thường xuất hiện khi ${t.situation} hoặc những tình huống tương tự.`,
        example: `Bé hỏi bản thân: "Tại sao mình ${t.emotion}? Chuyện gì đã xảy ra?" — Nhận ra nguyên nhân giúp bé bình tĩnh hơn.`,
        visual: '🔍',
      },
      {
        title: `Cách ứng xử lành mạnh`,
        explanation: `Khi ${t.emotion}, bé có thể: ${t.action}. Những cách này giúp bé vượt qua cảm xúc mà không làm tổn thương bản thân hay người khác.`,
        example: `Thực hành: Hít vào 4 giây → giữ 2 giây → thở ra 6 giây. Làm 3 lần — bé sẽ thấy bình tĩnh hơn ngay!`,
        visual: '💡',
      },
    ],
  };

  const practice = {
    title: `Luyện tập nhận biết cảm xúc ${t.emoji}`,
    instruction: `Bé đọc từng tình huống và chọn câu trả lời phù hợp nhất nhé!`,
    items: [
      {
        type: 'choose',
        question: `Bé ${t.situation}. Bé cảm thấy thế nào?`,
        options: [t.emotion, 'Không cảm thấy gì', 'Buồn ngủ', 'Đói bụng'],
        answer: t.emotion,
        hint: `Nghĩ về cảm giác của bé khi điều này thực sự xảy ra`,
      },
      {
        type: 'choose',
        question: `Khi ${t.emotion}, cơ thể bé thường: "${t.body}". Đây là điều gì?`,
        options: ['Biểu hiện cảm xúc tự nhiên', 'Dấu hiệu bệnh tật', 'Không bình thường', 'Cần đi bệnh viện ngay'],
        answer: 'Biểu hiện cảm xúc tự nhiên',
        hint: 'Mọi cảm xúc đều có biểu hiện trên cơ thể — đó là điều hoàn toàn bình thường!',
      },
      {
        type: 'choose',
        question: `Khi bạn ${t.emotion}, bé nên làm gì?`,
        options: [t.action.split(',')[0].trim(), 'Làm ngơ, không quan tâm', 'Trêu chọc bạn', 'Chạy đi chỗ khác'],
        answer: t.action.split(',')[0].trim(),
        hint: 'Chọn cách giúp ích cho bạn, không làm bạn tổn thương thêm',
      },
    ],
  };

  const game = {
    title: `🎮 Thám tử cảm xúc`,
    type: 'quiz-race',
    description: `Xem tình huống xuất hiện trên màn hình — bé nhận diện đúng cảm xúc nhanh nhất có thể!`,
    duration: 3,
    instructions: [
      `Đọc tình huống hoặc nhìn hình ảnh biểu cảm`,
      `4 lựa chọn cảm xúc hiện ra — chọn cái đúng nhất`,
      `Trả lời nhanh để được điểm thưởng gấp đôi ⚡`,
      `Đúng 4/5 câu là đạt "Thám tử cảm xúc xuất sắc"!`,
    ],
    reward: `❤️ Nhận danh hiệu "Thám tử cảm xúc" — người hiểu trái tim mọi người!`,
  };

  const quiz = {
    title: `Kiểm tra: cảm xúc ${t.emotion}`,
    passingScore: 60,
    questions: [
      {
        id: 1, emoji: t.emoji,
        question: `Cảm xúc ${t.emoji} này tên là gì?`,
        options: [t.emotion, 'Buồn bã', 'Tức giận', 'Sợ hãi'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
        answer: t.emotion,
        explanation: `Đây là cảm xúc "${t.emotion}"! Nhận ra nó qua biểu cảm: ${t.body}.`,
      },
      {
        id: 2, emoji: '🔍',
        question: `Tình huống nào khiến bé ${t.emotion}?`,
        options: [t.situation, 'Ngồi im không làm gì', 'Xem phim thông thường', 'Đi ngủ bình thường'],
        answer: t.situation,
        explanation: `"${t.situation}" thường khiến bé cảm thấy ${t.emotion}. Cảm xúc luôn có nguyên nhân!`,
      },
      {
        id: 3, emoji: '💡',
        question: `Cách nào LÀNH MẠNH để xử lý khi ${t.emotion}?`,
        options: [t.action.split(',')[0].trim(), 'Đánh người khác', 'Bỏ ăn', 'Trốn vào phòng mãi không ra'],
        answer: t.action.split(',')[0].trim(),
        explanation: `${t.action.split(',')[0].trim()} là cách lành mạnh! Giúp bé vượt qua cảm xúc tích cực.`,
      },
      {
        id: 4, emoji: '🤗',
        question: `Đồng cảm nghĩa là gì?`,
        options: ['Giả vờ vui theo bạn', 'Hiểu và chia sẻ cảm xúc người khác', 'Làm y chang người khác', 'Không quan tâm đến ai'],
        answer: 'Hiểu và chia sẻ cảm xúc người khác',
        explanation: `Đồng cảm là đặt mình vào vị trí người khác để hiểu họ đang cảm thấy gì — đây là kỹ năng rất quan trọng!`,
      },
      {
        id: 5, emoji: '🧘',
        question: `Khi tức giận, bài tập hít thở nào giúp bé bình tĩnh?`,
        options: ['Hít vào thật nhanh 10 lần', 'Hít vào 4 giây, giữ 2 giây, thở ra 6 giây', 'Nín thở 30 giây', 'Thở thật nhanh như chạy bộ'],
        answer: 'Hít vào 4 giây, giữ 2 giây, thở ra 6 giây',
        explanation: `Thở sâu chậm giúp hệ thần kinh bình tĩnh lại. Bé thử ngay: hít vào (1-2-3-4) → giữ (1-2) → thở ra (1-2-3-4-5-6)!`,
      },
    ],
  };

  const reward = {
    badge: ['❤️', '🤗', '😊', '💛', '🌻', '🦋', '🌟', '💖'][gi % 8],
    title: `Huy hiệu Người Bạn Thông Minh — ${t.emotion}`,
    description: `Bé đã hiểu cảm xúc "${t.emotion}" và biết cách ứng xử lành mạnh. Trí tuệ cảm xúc của bé ngày càng phát triển!`,
    points: 20 + gi % 5,
    message: [`Bé thật nhân ái và tinh tế! ❤️`, `Hiểu cảm xúc là siêu năng lực — bé đang có nó! 🌟`, `Bé sẽ là người bạn tuyệt vời của mọi người! 🤗`][gi % 3],
  };

  const report = {
    summary: `Bé đã học về cảm xúc "${t.emotion}" — nhận biết, hiểu nguyên nhân và biết cách ứng xử. Trí tuệ cảm xúc giúp bé hạnh phúc và thành công hơn trong cuộc sống!`,
    tracked: [
      { metric: 'Nhận biết cảm xúc', description: `Bé có thể nhận ra "${t.emotion}" qua biểu cảm và tình huống` },
      { metric: 'Hiểu nguyên nhân', description: 'Bé biết cảm xúc xuất hiện vì điều gì' },
      { metric: 'Ứng xử lành mạnh', description: `Bé biết ${t.action.split(',').length} cách xử lý khi ${t.emotion}` },
      { metric: 'Đồng cảm', description: 'Bé hiểu cảm xúc của người khác qua tình huống thực tế' },
    ],
    tips: [
      `Nói chuyện về cảm xúc trong bữa cơm: "Hôm nay con cảm thấy thế nào? Tại sao?"`,
      `Khi bé xúc động, đừng nói "Không được khóc!" mà nói "Bố/mẹ hiểu con đang ${t.emotion}"`,
      `Đọc sách về cảm xúc cho bé trước khi ngủ — củng cố trí tuệ cảm xúc mỗi ngày`,
    ],
  };

  const review = {
    title: `Ôn lại — ${t.emotion} ${t.emoji}`,
    keyPoints: [
      `${t.emotion} ${t.emoji}: xảy ra khi ${t.situation}`,
      `Biểu hiện: ${t.body} — đây là phản ứng tự nhiên và bình thường`,
      `Cách ứng xử lành mạnh: ${t.action}`,
    ],
    nextLesson: `Bài tiếp theo: ${EMOTION_TOPICS[(idx + 1) % EMOTION_TOPICS.length].emotion} ${EMOTION_TOPICS[(idx + 1) % EMOTION_TOPICS.length].emoji} — tiếp tục hành trình cảm xúc!`,
    encouragement: [`Bé thật nhân ái! Trí tuệ cảm xúc của bé đang lớn dần! ❤️`, `Hiểu cảm xúc = hạnh phúc hơn. Bé đang trên đường đó rồi! 🌟`, `Bé sẽ là người bạn, người con, người anh/chị tuyệt vời! 🤗`][gi % 3],
  };

  return { goals, warmup, knowledge, practice, game, quiz, reward, report, review };
}

// ── LOGIC ────────────────────────────────────────────────────────────────────

function buildLogicDetail(l: LessonRow, idx: number, gi: number) {
  const t = LOGIC_TOPICS[idx % LOGIC_TOPICS.length];

  const goals = [
    `Nhận dạng ${t.pattern} trong bài toán "${t.title}"`,
    `Áp dụng quy luật "${t.rule}" để giải bài tập`,
    `Giải thích được cách suy nghĩ của mình cho bố mẹ nghe`,
  ];

  const warmup = {
    emoji: '🧩',
    title: `Khởi động tư duy`,
    duration: 2,
    description: `Làm nóng não bộ với thử thách nhanh trước khi vào bài logic!`,
    steps: [
      `Đặt câu hỏi: "Con nghĩ con voi nặng hơn hay con kiến nặng hơn?"`,
      `Hỏi tiếp: "Tại sao con nghĩ vậy?"`,
      `Vỗ tay 3 cái — nói to: "Tôi yêu suy nghĩ! 🧠"`,
      `Sẵn sàng giải bài toán về "${t.title}" rồi! 🔍`,
    ],
  };

  const knowledge = {
    title: `Khám phá: ${t.title}`,
    summary: l.content || `"${t.title.charAt(0).toUpperCase() + t.title.slice(1)}" giúp bé phát triển tư duy logic — khả năng quan sát, tìm quy luật và suy luận chính xác.`,
    points: [
      {
        title: `Quy tắc: ${t.rule}`,
        explanation: `Trong bài toán về ${t.title}, bé áp dụng quy tắc: ${t.rule}. Nhìn tổng thể trước → tìm điểm chung → xác định quy luật → áp dụng.`,
        example: `Ví dụ: ${t.example}`,
        visual: '🔍',
      },
      {
        title: `Cách tiếp cận bài toán logic`,
        explanation: `Bé không cần vội vàng. Hãy: (1) Đọc kỹ đề, (2) Quan sát tất cả thông tin, (3) Thử đoán → kiểm tra → điều chỉnh.`,
        example: `Nếu bài toán là "${t.example}", bé thử từng bước: nhìn → đoán → kiểm tra xem có đúng không.`,
        visual: '🧩',
      },
      {
        title: `Tại sao tư duy logic quan trọng?`,
        explanation: `Logic giúp bé giải quyết vấn đề trong cuộc sống: lên kế hoạch, ra quyết định, không bị lừa. Đây là kỹ năng dùng cả đời!`,
        example: `Mỗi ngày bé dùng logic: chọn quần áo phù hợp thời tiết, sắp xếp đồ chơi, hiểu chuyện phim...`,
        visual: '💡',
      },
    ],
  };

  const practice = {
    title: `Thực hành: ${t.title}`,
    instruction: `Bé suy nghĩ thật kỹ trước khi trả lời — không có gì là vội vàng trong logic!`,
    items: [
      {
        type: 'choose',
        question: `Áp dụng quy tắc "${t.rule}": ${t.example} → Câu trả lời là?`,
        options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        answer: 'Đáp án A',
        hint: `Nhớ quy tắc: ${t.rule}. Áp dụng vào từng trường hợp rồi chọn đáp án khớp nhất!`,
      },
      {
        type: 'choose',
        question: `Dãy: 🔴🔵🔴🔵___. Tiếp theo là hình nào?`,
        options: ['🔴', '🔵', '🟡', '🟢'],
        answer: '🔴',
        hint: 'Tìm quy luật lặp lại: hai màu xen kẽ nhau!',
      },
      {
        type: 'choose',
        question: `Cái nào KHÔNG thuộc nhóm: táo 🍎, chuối 🍌, cam 🍊, xe hơi 🚗?`,
        options: ['Táo 🍎', 'Chuối 🍌', 'Cam 🍊', 'Xe hơi 🚗'],
        answer: 'Xe hơi 🚗',
        hint: 'Táo, chuối, cam đều là trái cây. Xe hơi là...',
      },
    ],
  };

  const game = {
    title: `🎮 Thám tử logic`,
    type: 'collect',
    description: `Bé điều khiển thám tử đi qua mê cung, thu thập manh mối và giải bài toán ${t.pattern} để thoát ra!`,
    duration: 4,
    instructions: [
      `Điều khiển thám tử bằng 4 nút hướng`,
      `Thu thập tất cả mảnh ghép có biểu tượng 🔍`,
      `Ghép mảnh theo quy tắc: ${t.rule}`,
      `Giải xong câu đố là thoát khỏi mê cung! 🗝️`,
    ],
    reward: `🧠 Mở khoá cấp độ "Thám tử ${t.pattern}" — tư duy logic lên level mới!`,
  };

  const quiz = {
    title: `Kiểm tra: ${t.title}`,
    passingScore: 60,
    questions: [
      {
        id: 1, emoji: '🔢',
        question: `Dãy số: 1, 3, 5, 7, ___. Số tiếp theo?`,
        options: ['8', '9', '10', '11'],
        answer: '9',
        explanation: `Dãy số lẻ — mỗi lần tăng 2. 7 + 2 = 9. Quy luật: cộng 2 liên tục!`,
      },
      {
        id: 2, emoji: '🐾',
        question: `Cái nào không thuộc nhóm: chó 🐕, mèo 🐈, cá 🐟, xe hơi 🚗?`,
        options: ['Chó', 'Mèo', 'Cá', 'Xe hơi'],
        answer: 'Xe hơi',
        explanation: `Chó, mèo, cá là động vật. Xe hơi là đồ vật — khác loại!`,
      },
      {
        id: 3, emoji: '🧠',
        question: `Nếu A > B và B > C, thì A so với C thế nào?`,
        options: ['A < C', 'A = C', 'A > C', 'Không biết'],
        answer: 'A > C',
        explanation: `Quy tắc bắc cầu: A > B > C → A > C. Giống như: Voi > ngựa > chó → Voi to hơn chó!`,
      },
      {
        id: 4, emoji: '⬛',
        question: `Hình vuông có bao nhiêu trục đối xứng?`,
        options: ['1', '2', '3', '4'],
        answer: '4',
        explanation: `Hình vuông có 4 trục đối xứng: 2 qua cạnh và 2 qua đường chéo góc.`,
      },
      {
        id: 5, emoji: '🔺',
        question: `Dãy hình: △○□△○___. Hình tiếp theo là?`,
        options: ['△', '○', '□', '⬡'],
        answer: '□',
        explanation: `Chu kỳ 3 hình: △○□ lặp lại. Sau ○ là □. Bé đếm theo chu kỳ nhé!`,
      },
    ],
  };

  const reward = {
    badge: ['🧩', '🔍', '🗝️', '💡', '🎯', '🦊', '🏅', '🧠'][gi % 8],
    title: `Huy hiệu Thám Tử Logic — ${t.title}`,
    description: `Bé đã chinh phục bài toán về ${t.title}! Tư duy logic của bé sắc bén như thám tử thực sự.`,
    points: 25 + gi % 5,
    message: [`Bé suy nghĩ thật sâu sắc! 🧠`, `Tư duy logic của bé đang sắc bén dần! 🔍`, `Xuất sắc! Bé giải toán như thám tử chuyên nghiệp! 🕵️`][gi % 3],
  };

  const report = {
    summary: `Bé đã hoàn thành bài toán logic về "${t.title}" với kỹ năng "${t.pattern}". Tư duy logic là nền tảng cho toán học, khoa học và giải quyết vấn đề sau này!`,
    tracked: [
      { metric: 'Nhận diện quy luật', description: `Bé tìm được quy luật "${t.rule}" trong bài toán` },
      { metric: 'Suy luận', description: 'Bé áp dụng quy luật để tìm ra đáp án' },
      { metric: 'Kiên nhẫn', description: 'Bé thử nhiều cách trước khi tìm ra câu trả lời đúng' },
      { metric: 'Giải thích', description: 'Bé có thể mô tả cách suy nghĩ của mình' },
    ],
    tips: [
      `Chơi cờ caro, sudoku trẻ em hoặc ghép hình cùng bé để rèn tư duy`,
      `Đặt câu hỏi "Tại sao?" thường xuyên — thúc đẩy bé suy luận sâu hơn`,
      `Để bé tự giải quyết vấn đề nhỏ trước khi hỗ trợ — kiên nhẫn là chìa khóa`,
    ],
  };

  const review = {
    title: `Ôn lại — ${t.title}`,
    keyPoints: [
      `Kỹ năng: ${t.pattern} — áp dụng quy tắc "${t.rule}"`,
      `Ví dụ: ${t.example}`,
      `Nhớ: quan sát kỹ → tìm quy luật → áp dụng → kiểm tra lại`,
    ],
    nextLesson: `Bài tiếp theo: ${LOGIC_TOPICS[(idx + 1) % LOGIC_TOPICS.length].title} 🧩 — tiếp tục thử thách tư duy!`,
    encouragement: [`Não bé đang lớn mạnh từng ngày! 🧠`, `Thám tử logic nhỏ — bé sẽ giải được mọi bí ẩn! 🔍`, `Kiên nhẫn + quan sát = thành công. Bé đang làm rất tốt! 🌟`][gi % 3],
  };

  return { goals, warmup, knowledge, practice, game, quiz, reward, report, review };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await ds.initialize();
  console.log('✅ Connected.\n');

  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    if (RESET) {
      console.log('🗑️  Truncating lesson_details...');
      await qr.query('DELETE FROM lesson_details');
      console.log('✅ Truncated.\n');
    }

    const lessons: LessonRow[] = await qr.query(
      `SELECT l.id, l.title, l.lessonType, l.sortOrder,
              COALESCE(l.content, '') as content,
              COALESCE(l.shortDescription, '') as shortDescription,
              c.title as courseTitle, c.courseType, c.id as courseId
       FROM lessons l JOIN courses c ON c.id = l.courseId
       ORDER BY c.id, l.sortOrder`,
    );

    console.log(`Found ${lessons.length} lessons. Generating details...\n`);

    let created = 0, skipped = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];

      if (!RESET) {
        const existing = await qr.query('SELECT id FROM lesson_details WHERE lessonId = ?', [lesson.id]);
        if (existing.length > 0) {
          console.log(`  [skip] #${lesson.id} ${lesson.title}`);
          skipped++;
          continue;
        }
      }

      const detail = buildDetail(lesson, i);

      await qr.query(
        `INSERT INTO lesson_details
         (lessonId, goals, warmup, knowledge, practice, game, quiz, reward, report, review, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          lesson.id,
          JSON.stringify(detail.goals),
          JSON.stringify(detail.warmup),
          JSON.stringify(detail.knowledge),
          JSON.stringify(detail.practice),
          JSON.stringify(detail.game),
          JSON.stringify(detail.quiz),
          JSON.stringify(detail.reward),
          JSON.stringify(detail.report),
          JSON.stringify(detail.review),
        ],
      );

      console.log(`  [✓] #${lesson.id} ${lesson.title} (${lesson.courseType})`);
      created++;
    }

    console.log(`\n✅ Done! Created: ${created}, Skipped: ${skipped}`);
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
