import mysql from 'mysql2/promise';

const conn_config = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const TARGET_LESSON_IDS = [
  1146, 1147, 1149, 1151, 1153, 1155, 1157, 1159,
  1161, 1163, 1165, 1167, 1172, 1175, 1178, 1183,
];

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
type Difficulty = typeof DIFFICULTIES[number];

function buildOptions(sentence: string) {
  return sentence.split(/\s+/).map((text, i) => ({ key: `w${i}`, text }));
}

function findErrorKeys(
  options: { key: string; text: string }[],
  errorWords: string[],
): string[] {
  return options
    .filter(
      (o) =>
        errorWords.some(
          (e) => o.text === e || o.text.replace(/[.,!?;:]/g, '') === e,
        ),
    )
    .map((o) => o.key);
}

interface FindErrorQ {
  sentence: string;
  errors: string[];
}

type LessonQuestions = Record<Difficulty, [FindErrorQ, FindErrorQ, FindErrorQ]>;

// 16 lessons × 9 sentences each
const LESSON_QUESTIONS: Record<number, LessonQuestions> = {
  // -----------------------------------------------------------------------
  // 1146: học sinh lớp 2, trường học mới
  // -----------------------------------------------------------------------
  1146: {
    easy: [
      { sentence: 'Hôm nay tôi bắt đầu học lớp hai rất vui mừng.', errors: [] },
      { sentence: 'Tôi đi học đún giờ mỗi buổi sáng.', errors: ['đún'] },
      { sentence: 'Cô giáo phát cho mỗi bạn một quyển vỡ mới.', errors: ['vỡ'] },
    ],
    medium: [
      { sentence: 'Tôi cùng các bạn xếp hàng vào lớp thật ngăn nắp.', errors: [] },
      { sentence: 'Chúng tôi ngồi học ngoan ngoản và chú ý nghe giảng.', errors: ['ngoản'] },
      { sentence: 'Lớp học của chúng tôi sạch sẻ và thoáng mát.', errors: ['sẻ'] },
    ],
    hard: [
      { sentence: 'Cô giáo dạy chúng tôi viết chữ đẹp và dể đọc.', errors: ['dể'] },
      { sentence: 'Buổi chiều tan học, tôi chạy ra cổng trường đợi bố mẹ.', errors: [] },
      { sentence: 'Tôi nhớ mang đầy đủ sách vợ đến lớp mỗi ngày.', errors: ['vợ'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1147: thời gian, ngày hôm qua
  // -----------------------------------------------------------------------
  1147: {
    easy: [
      { sentence: 'Ngày hôm qua em đã học bài và làm bài tập xong.', errors: [] },
      { sentence: 'Buổi sang hôm nay trời đẹp và có nắng ấm.', errors: ['sang'] },
      { sentence: 'Hôm qua em đi dạo cùng bố mẹ ở công viên.', errors: [] },
    ],
    medium: [
      { sentence: 'Thời gian trôi đi rất nhanh, mới đó mà đã hết ngày hôm qua.', errors: [] },
      { sentence: 'Em nhớ lại những kỉ niệm đẹp của ngày hôm trướt.', errors: ['trướt'] },
      { sentence: 'Ngày hôm qua em được điểm mười môn tiếng Việt rất vui vẻ.', errors: [] },
    ],
    hard: [
      { sentence: 'Hôm qua chúng em học bài thơ nói về những ngày thơ ấu đẹp đẻ.', errors: ['đẻ'] },
      { sentence: 'Thời gian không chờ đợi ai, mỗi ngày trôi qua là một niềm vui mới.', errors: [] },
      { sentence: 'Ngày hôm qua đã quá đi, hôm nay em lại thứt dậy học bài chăm chỉ.', errors: ['thứt'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1149: lao động, làm việc, công việc gia đình
  // -----------------------------------------------------------------------
  1149: {
    easy: [
      { sentence: 'Em giúp mẹ quét nhà và rửa bát mỗi buổi sáng.', errors: [] },
      { sentence: 'Bố em làm việc chắm chỉ để nuôi gia đình.', errors: ['chắm'] },
      { sentence: 'Mẹ nấu cơm và dọn dẹp nhà cửa mỗi ngày.', errors: [] },
    ],
    medium: [
      { sentence: 'Mỗi người trong gia đình đều có việc làm của riêng mình.', errors: [] },
      { sentence: 'Em cẩng thận khi rửa bát để không làm vỡ chén.', errors: ['cẩng'] },
      { sentence: 'Lao động chân tay giúp chúng ta khoẻ mạnh và năng đông hơn.', errors: ['đông'] },
    ],
    hard: [
      { sentence: 'Công việc gia đình là trách nhiệm chung của mọi thành viên trong nhà.', errors: [] },
      { sentence: 'Sau khi song công việc, cả gia đình cùng quây quần bên mâm cơm.', errors: ['song'] },
      { sentence: 'Lao động không chỉ tạo ra của cải mà còn rèn luyện đức tính kiên nhẫng.', errors: ['nhẫng'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1151: giờ học, lớp học
  // -----------------------------------------------------------------------
  1151: {
    easy: [
      { sentence: 'Giờ học bắt đầu lúc bảy giờ rưỡi sáng.', errors: [] },
      { sentence: 'Các bạn ngồi vào chỗ của mình và lấy sách vỡ ra.', errors: ['vỡ'] },
      { sentence: 'Cô giáo gọi từng bạn đứng lên đọc bài.', errors: [] },
    ],
    medium: [
      { sentence: 'Trong giờ học, chúng em lặng lẻ lắng nghe cô giảng bài.', errors: ['lẻ'] },
      { sentence: 'Lớp học sạch sẽ và gọn gàng khiến chúng em học tốt hơn.', errors: [] },
      { sentence: 'Khi có câu hỏi, em giơ tay xin phép trước rồi mới nói ra ý kiến.', errors: [] },
    ],
    hard: [
      { sentence: 'Tiết học Tiếng Việt hôm nay thú zị hơn mọi khi vì cô kể câu chuyện hay.', errors: ['zị'] },
      { sentence: 'Mỗi giờ học trôi qua, chúng em tích lũy thêm nhiều kiến thức bổ ích.', errors: [] },
      { sentence: 'Trong giờ kiểm tra, em cẩn thận đọc kỉ đề bài trước khi làm.', errors: ['kỉ'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1153: bóng đá, cầu thủ, thể thao
  // -----------------------------------------------------------------------
  1153: {
    easy: [
      { sentence: 'Các bạn nam ra sân chơi bóng đá sau giờ học.', errors: [] },
      { sentence: 'Cầu thủ đá bóng vào lưới và ghi được một bàn thắng đẹp.', errors: [] },
      { sentence: 'Em thích xem bóng đá vì rất hồi hộp và kịt tính.', errors: ['kịt'] },
    ],
    medium: [
      { sentence: 'Đội bóng của trường em luyện tập rất chắm chỉ để chuẩn bị thi đấu.', errors: ['chắm'] },
      { sentence: 'Cầu thủ phải có sức bền và kỹ năng đầy đũ để thi đấu tốt.', errors: ['đũ'] },
      { sentence: 'Thể thao giúp chúng ta rèn luyện sức khỏe và tinh thần đoàn kết.', errors: [] },
    ],
    hard: [
      { sentence: 'Trong trận chung kết, cầu thủ số mười ghi bàn thắng quyết định ở phút cuối.', errors: [] },
      { sentence: 'Huấn luyện viên dặn các cầu thủ phải chơi fair play và tôn trọng đối thủ.', errors: [] },
      { sentence: 'Bóng đá không chỉ là môn thể thao mà còn là niềm đam mê của hàng triệu nguời.', errors: ['nguời'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1155: thời khóa biểu, lịch học
  // -----------------------------------------------------------------------
  1155: {
    easy: [
      { sentence: 'Thời khóa biểu giúp em biết hôm nay học môn gì.', errors: [] },
      { sentence: 'Buổi sang thứ hai em học Toán và Tiếng Việt.', errors: ['sang'] },
      { sentence: 'Em nhìn thời khóa biểu để chuẩn bị sách vở cho đúng.', errors: [] },
    ],
    medium: [
      { sentence: 'Lịch học được sắp xếp gĩ gàng theo từng buổi trong tuần.', errors: ['gĩ'] },
      { sentence: 'Mỗi ngày em có năm tiết học và một giờ nghỉ giải lao.', errors: [] },
      { sentence: 'Nhờ có thời khóa biểu, em không bao giờ quên mang sách vợ sai môn.', errors: ['vợ'] },
    ],
    hard: [
      { sentence: 'Thời khóa biểu được nhà trường sắp xếp khoa học để học sinh tiếp thu bài hiệu wả.', errors: ['wả'] },
      { sentence: 'Cuối tuần em kiểm tra lại thời khóa biểu để chuẩn bị đầy đủ cho tuần tới.', errors: [] },
      { sentence: 'Việc tuân thủ thời khóa biểu giúp em hình thành tính kỷ luật và ngăng nắp.', errors: ['ngăng'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1157: danh sách, tên bạn học
  // -----------------------------------------------------------------------
  1157: {
    easy: [
      { sentence: 'Cô giáo đọc danh sách tên các bạn trong lớp.', errors: [] },
      { sentence: 'Em ghi tên bạn vào danh sáck để không quên.', errors: ['sáck'] },
      { sentence: 'Danh sách lớp có ba mươi bạn học sinh.', errors: [] },
    ],
    medium: [
      { sentence: 'Mỗi bạn trong danh sách đều có một điểm đặt biệt riêng.', errors: ['đặt'] },
      { sentence: 'Cô giáo điểm danh theo danh sách mỗi buổi sáng trước giờ học.', errors: [] },
      { sentence: 'Em nhớ tên tất cả các bạn trong lớp một cách dể dàng.', errors: ['dể'] },
    ],
    hard: [
      { sentence: 'Danh sách học sinh được sắp xếp theo thứ tự bảng chữ cái tiếng Việt.', errors: [] },
      { sentence: 'Cô giáo lập danh sách những bạn đạt thành tích xuất sắt trong học kỳ.', errors: ['sắt'] },
      { sentence: 'Nhìn vào danh sách lớp, em thấy lớp mình có nhiều bạn mang tên rất hay và ý nghĩa.', errors: [] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1159: vẽ tranh, nghệ thuật
  // -----------------------------------------------------------------------
  1159: {
    easy: [
      { sentence: 'Em thích vẽ tranh phong cảnh và các con vật.', errors: [] },
      { sentence: 'Bạn Nam vẻ bức tranh ngôi nhà rất đẹp và sinh động.', errors: ['vẻ'] },
      { sentence: 'Giờ mỹ thuật hôm nay em vẽ cảnh mặt trời mọc.', errors: [] },
    ],
    medium: [
      { sentence: 'Tranh vẽ của em được treo trên tường lớp học rất xinh đẻ.', errors: ['đẻ'] },
      { sentence: 'Nghệ thuật giúp chúng ta thể hiện cảm xúc qua màu sắc và đường nét.', errors: [] },
      { sentence: 'Em pha màu cẩn thận để bức tranh trông sinh đông và hài hòa.', errors: ['đông'] },
    ],
    hard: [
      { sentence: 'Bức tranh của bạn Lan được chọn trưng bày tại triển lãm nghệ thuật của trường.', errors: [] },
      { sentence: 'Vẽ tranh không chỉ là kỹ năng mà còn là cách diễn đạt tâm hồn một cách tinh tế.', errors: [] },
      { sentence: 'Để vẻ được một bức tranh đẹp, em cần luyện tập kiên nhẫn và quan sát tỉ mĩ.', errors: ['vẻ', 'mĩ'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1161: sách, đọc sách, trang sách
  // -----------------------------------------------------------------------
  1161: {
    easy: [
      { sentence: 'Em đọc sách mỗi tối trước khi đi ngủ.', errors: [] },
      { sentence: 'Quyển sáck em đang đọc kể về một chú thỏ dũng cảm.', errors: ['sáck'] },
      { sentence: 'Trang sách nào cũng chứa đầy những điều thú vị để khám phá.', errors: [] },
    ],
    medium: [
      { sentence: 'Đọc sách giúp em mở rộng trí tưởng tượng và tăng vốn từ vựng.', errors: [] },
      { sentence: 'Em giữ gìn sách cẩng thận, không được làm nhăn hay rách trang.', errors: ['cẩng'] },
      { sentence: 'Thư viện trường có rất nhiều đầu sách thú zị cho học sinh mượn về đọc.', errors: ['zị'] },
    ],
    hard: [
      { sentence: 'Mỗi trang sách là một thế giới mới mở ra trước mắt người đọc.', errors: [] },
      { sentence: 'Sách không chỉ cung cấp kiến thứk mà còn nuôi dưỡng tâm hồn con người.', errors: ['thứk'] },
      { sentence: 'Thói quen đọc sách từ nhỏ sẽ giúp em trở thành người có học thứt và hiểu biết rộng.', errors: ['thứt'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1163: bạn bè, nhớ bạn, tình bạn
  // -----------------------------------------------------------------------
  1163: {
    easy: [
      { sentence: 'Em và bạn Hoa cùng chơi ở sân trường giờ ra chơi.', errors: [] },
      { sentence: 'Tình bạng là thứ quý giá nhất trong những năm tháng đi học.', errors: ['bạng'] },
      { sentence: 'Em nhớ bạn cũ khi chuyển sang trường mới.', errors: [] },
    ],
    medium: [
      { sentence: 'Bạn bè tốt luôn giúp đỡ nhau trong học tập và cuộc sống.', errors: [] },
      { sentence: 'Em và các bạn hứa sẽ giữ liên lạc dù có đi đâu xa.', errors: [] },
      { sentence: 'Nhớ bạn là cảm giác bùi ngùi khi không được gặp nhau suốt một thời gian dài.', errors: [] },
    ],
    hard: [
      { sentence: 'Tình bạn chân thành không phân biệt giàu nghèo hay hoàn cảnh xuất thân.', errors: [] },
      { sentence: 'Chúng em cụng nhau ôn bài và giúp nhau vượt qua những bài kiểm tra khó.', errors: ['cụng'] },
      { sentence: 'Người bạn tốt sẽ nói thật khi bạn mắc lỗi chứ không chỉ nói những lời vừa lòng.', errors: [] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1165: thả diều, đồng cỏ, gió
  // -----------------------------------------------------------------------
  1165: {
    easy: [
      { sentence: 'Chúng em ra đồng thả diều vào buổi chiều mát.', errors: [] },
      { sentence: 'Cơn gió nhẹ thổi qua làm con diều bay lên cao thật đẹp.', errors: [] },
      { sentence: 'Em cầm cuộn chỉ và thả diều trên đồng cỏ xanh rờn.', errors: [] },
    ],
    medium: [
      { sentence: 'Con diều của em được bố làm bằng giấy màu và trôn bằng tre.', errors: ['trôn'] },
      { sentence: 'Gió thổi mạnh, con diều cứ muốn bay lên tận mây xanh trên trời.', errors: [] },
      { sentence: 'Thả diều trên đồng cỏ lặng lẻ là trò chơi em yêu thích nhất.', errors: ['lẻ'] },
    ],
    hard: [
      { sentence: 'Tiếng sáo diều vi vu trong gió chiều tạo nên âm thanh trong trẻo và thanh bình.', errors: [] },
      { sentence: 'Đồng cỏ xanh mướt trải dài là nơi bọn trẻ thả diều và chạy nhảy tự do.', errors: [] },
      { sentence: 'Con diều lao đao trong gió lớn, em phải cầm chặt cuộn chỉ để diều khỏi bị tuột đi.', errors: ['lao'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1167: rồng rắn lên mây, trò chơi dân gian
  // -----------------------------------------------------------------------
  1167: {
    easy: [
      { sentence: 'Chúng em chơi trò rồng rắn lên mây ở sân trường.', errors: [] },
      { sentence: 'Trò chơi dân gian giúp chúng em vui vẻ và gắng kết với nhau.', errors: ['gắng'] },
      { sentence: 'Em thích chơi rồng rắn lên mây vì rất vui và náo nhiệt.', errors: [] },
    ],
    medium: [
      { sentence: 'Trò chơi dân gian là di sản văn hoá quý báu của dân tộc Việt Nam.', errors: [] },
      { sentence: 'Mỗi bạn nắm vào áo bạn đứng trước tạo thành một hàng dài như con rắng.', errors: ['rắng'] },
      { sentence: 'Chơi rồng rắn không cần đồ chơi tốn kém, chỉ cần một nhóm bạn vui vẽ là đủ.', errors: ['vẽ'] },
    ],
    hard: [
      { sentence: 'Trò chơi rồng rắn lên mây phản ánh trí tưởng tượng phong phú của trẻ em xưa.', errors: [] },
      { sentence: 'Những trò chơi dân gian như ô ăn quan, kéo co hay thả đỉa ba ba đều mang giá trị giáo dục cao.', errors: [] },
      { sentence: 'Bảo tồn trò chơi dân gian là cách chúng ta giữ gìn bản xắc văn hóa dân tộc.', errors: ['xắc'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1172: mẹ, tình cảm gia đình, mẹ yêu
  // -----------------------------------------------------------------------
  1172: {
    easy: [
      { sentence: 'Mẹ luôn yêu thương và chăm sóc em mỗi ngày.', errors: [] },
      { sentence: 'Em yêu mẹ nhất trên đời vì mẹ hiền lành và tốt bụng.', errors: [] },
      { sentence: 'Mẹ thứt dậy sớm để nấu bữa sáng cho cả gia đình.', errors: ['thứt'] },
    ],
    medium: [
      { sentence: 'Tình cảm của mẹ dành cho con là tình cảm thiêng liêng nhất trên đời.', errors: [] },
      { sentence: 'Mẹ làm việc vất vả cả ngày để em được ăn no mặt ấm.', errors: ['mặt'] },
      { sentence: 'Em muốn học giỏi để báo đáp công ơn sinh thành dưỡng dục của mẹ.', errors: [] },
    ],
    hard: [
      { sentence: 'Bàn tay mẹ tảo tần sớm hôm chăm lo cho con từng miếng ăn giấc ngủ.', errors: [] },
      { sentence: 'Dù bận trăm công nghìn việc, mẹ vẫn luôn dành thời gian kể chuyện cho em trướt khi ngủ.', errors: ['trướt'] },
      { sentence: 'Tình mẫu tử là sợi dây vô hình nhưng bền chặc nối liền trái tim mẹ và con mãi mãi.', errors: ['chặc'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1175: ông nội/ngoại, kính yêu ông bà
  // -----------------------------------------------------------------------
  1175: {
    easy: [
      { sentence: 'Em kính yêu ông bà và luôn vâng lời các cụ.', errors: [] },
      { sentence: 'Ông nội kể cho em nghe những câu chuyện ngày xưa rất hay.', errors: [] },
      { sentence: 'Mỗi dịp nghỉ lễ em về quê thăm ông bà ngoại.', errors: [] },
    ],
    medium: [
      { sentence: 'Ông bà là những người đã hi sinh rất nhiều để nuôi dưỡng bố mẹ chúng ta.', errors: [] },
      { sentence: 'Em xoa lưng cho bà mỗi tối vì bà hay bị đau lưng khi trời chuyển mùa.', errors: [] },
      { sentence: 'Kính trọng và biết ơn ông bà là truyền thống tốt đẻ của người Việt Nam.', errors: ['đẻ'] },
    ],
    hard: [
      { sentence: 'Ông ngoại thường dậy sớm tập thể dục và kể em nghe những kỷ niệm kháng chiến.', errors: [] },
      { sentence: 'Uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây là đạo lý ngàng đời của dân tộc ta.', errors: ['ngàng'] },
      { sentence: 'Chăm sóc ông bà khi tuổi già là bổn phận và cũng là niềm hạnh phúc của con cháu.', errors: [] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1178: bốn mùa, xuân hạ thu đông
  // -----------------------------------------------------------------------
  1178: {
    easy: [
      { sentence: 'Một năm có bốn mùa là xuân hạ thu đông.', errors: [] },
      { sentence: 'Mùa xuân trời ấm áp, hoa nở khắp nơi rất đẹp mắt.', errors: [] },
      { sentence: 'Mùa đông trời lạnh, em phải mặt thêm áo ấm khi ra ngoài.', errors: ['mặt'] },
    ],
    medium: [
      { sentence: 'Mỗi mùa trong năm đều có vẻ đẹp và đặc trưng riêng của mình.', errors: [] },
      { sentence: 'Mùa hạ nắng nóng, chúng em thích được tắm biển và nghỉ hè thãi mái.', errors: ['thãi'] },
      { sentence: 'Mùa thu lá vàng rơi, tiết trời mát mẻ và trong lành rất dể chịu.', errors: ['dể'] },
    ],
    hard: [
      { sentence: 'Bốn mùa luân chuyển tạo nên nhịp điệu muôn màu của thiên nhiên và cuộc sống.', errors: [] },
      { sentence: 'Mùa xuân mang theo hơi ấm và sức sống mới, vạn vật như được hồi sinh trở lại.', errors: [] },
      { sentence: 'Hiểu về bốn mùa giúp chúng ta biết cách ăn mặt và sinh hoạt phù hợp với thời tiết.', errors: ['mặt'] },
    ],
  },

  // -----------------------------------------------------------------------
  // 1183: mùa vàng, lúa chín, thu hoạch
  // -----------------------------------------------------------------------
  1183: {
    easy: [
      { sentence: 'Cánh đồng lúa chín vàng óng ả trải dài trước mắt.', errors: [] },
      { sentence: 'Bác nông dân ra đồng gặt lúa từ sáng sớm tinh mơ.', errors: [] },
      { sentence: 'Mùa thu hoạch, mọi người làm việc vất vã để gặt hết lúa trên đồng.', errors: ['vã'] },
    ],
    medium: [
      { sentence: 'Mùa vàng là mùa mà người nông dân mong đợi suốt cả năm.', errors: [] },
      { sentence: 'Những bông lúa trĩu nặng hạt vàng là thành quả của biết bao mồ hôi công sứk.', errors: ['sứk'] },
      { sentence: 'Em cùng bố mẹ ra đồng giúp thu hoạch lúa trong những ngày mùa bận rộn.', errors: [] },
    ],
    hard: [
      { sentence: 'Hương thơm của lúa chín lan toả khắp cánh đồng vào những buổi sáng mùa thu.', errors: [] },
      { sentence: 'Thu hoạch lúa đòi hỏi sự chăm chỉ và cần cù vì đây là công việc nặng nhọk.', errors: ['nhọk'] },
      { sentence: 'Hạt gạo trắng ngần là kết quả của cả một quy trình chăm bón vất vả và công phu.', errors: [] },
    ],
  },
};

async function main() {
  const conn = await mysql.createConnection(conn_config);
  console.log('Connected to database.');

  // -----------------------------------------------------------------------
  // LOOP 1: Delete and rebalance
  // -----------------------------------------------------------------------
  console.log('\n=== LOOP 1: Deleting find_errors and rebalancing ===');

  for (const lessonId of TARGET_LESSON_IDS) {
    for (const diff of DIFFICULTIES) {
      // Step 1: Delete all find_errors for this lesson + difficulty
      const [delResult]: any = await conn.execute(
        `DELETE FROM quizzes WHERE lessonId = ? AND difficultyLevel = ? AND questionType = 'find_errors'`,
        [lessonId, diff],
      );
      console.log(
        `  Lesson ${lessonId} [${diff}]: deleted ${delResult.affectedRows} find_errors questions`,
      );

      // Step 2: Count remaining questions
      const [rows]: any = await conn.execute(
        `SELECT COUNT(*) AS cnt FROM quizzes WHERE lessonId = ? AND difficultyLevel = ? AND questionType != 'find_errors'`,
        [lessonId, diff],
      );
      let count: number = rows[0].cnt;
      console.log(`  Lesson ${lessonId} [${diff}]: ${count} regular questions remaining`);

      // Step 3: If count > 7, delete most recent until count = 7
      if (count > 7) {
        const excess = count - 7;
        const [toDelete]: any = await conn.execute(
          `SELECT id FROM quizzes WHERE lessonId = ? AND difficultyLevel = ? AND questionType != 'find_errors' ORDER BY id DESC LIMIT ${excess}`,
          [lessonId, diff],
        );
        const ids: number[] = toDelete.map((r: any) => r.id);
        if (ids.length > 0) {
          await conn.execute(
            `DELETE FROM quizzes WHERE id IN (${ids.map(() => '?').join(',')})`,
            ids,
          );
          console.log(
            `  Lesson ${lessonId} [${diff}]: trimmed ${ids.length} excess questions (ids: ${ids.join(', ')})`,
          );
        }
      }
    }
  }

  // -----------------------------------------------------------------------
  // LOOP 2: Insert 3 find_errors per difficulty per lesson
  // -----------------------------------------------------------------------
  console.log('\n=== LOOP 2: Inserting find_errors questions ===');

  for (const lessonId of TARGET_LESSON_IDS) {
    const lessonQs = LESSON_QUESTIONS[lessonId];
    if (!lessonQs) {
      console.warn(`  WARNING: No questions defined for lesson ${lessonId}, skipping.`);
      continue;
    }

    for (const diff of DIFFICULTIES) {
      const qs = lessonQs[diff];
      let inserted = 0;

      for (const q of qs) {
        const options = buildOptions(q.sentence);
        const correctKeys = findErrorKeys(options, q.errors);

        const optionsJson = JSON.stringify(options);
        const correctAnswerJson = JSON.stringify(correctKeys);

        await conn.execute(
          `INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, points, createdAt, updatedAt)
           VALUES (?, 'Hãy tìm trong câu sau những từ viết sai chính tả', 'find_errors', ?, ?, ?, 10, NOW(), NOW())`,
          [lessonId, diff, optionsJson, correctAnswerJson],
        );
        inserted++;
      }

      console.log(`  Lesson ${lessonId} [${diff}]: inserted ${inserted} find_errors questions`);
    }
  }

  await conn.end();
  console.log('\nDone! Connection closed.');
}

main().catch(console.error);
