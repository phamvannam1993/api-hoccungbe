import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

interface FindErrorsQ {
  lessonId: number;
  sentence: string;
  errorWords: string[]; // exact word texts that are wrong (empty = fully correct sentence)
  level: 'easy' | 'medium' | 'hard';
}

/** Build optionsJson from a sentence string */
function buildOptions(sentence: string): { key: string; text: string }[] {
  return sentence.split(/\s+/).map((w, i) => ({ key: `w${i}`, text: w }));
}

/** Find option keys matching the given error words (strip trailing punctuation for comparison) */
function findErrorKeys(
  options: { key: string; text: string }[],
  errorWords: string[],
): string[] {
  return options
    .filter((o) =>
      errorWords.some(
        (e) => o.text === e || o.text.replace(/[.,!?:;"""''…]/g, '') === e,
      ),
    )
    .map((o) => o.key);
}

// ─────────────────────────────────────────────────────────────────────────────
// ALL 150 QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
const QUESTIONS: FindErrorsQ[] = [
  // ── 1147: Ngày hôm qua đâu rồi? (thời gian, ngày tháng) ─────────────────
  { lessonId: 1147, sentence: 'Ngày hôm qua trôi qua thật nhanh chống.', errorWords: ['chống'], level: 'easy' },
  { lessonId: 1147, sentence: 'Hôm nay là thứ hai, ngày đầu tiên của tuần mới.', errorWords: [], level: 'easy' },
  { lessonId: 1147, sentence: 'Buổi sáng hôm qua trời mưa rất to và lạnh.', errorWords: [], level: 'easy' },
  { lessonId: 1147, sentence: 'Tháng mười hai là tháng cuối năm, trời rất rét.', errorWords: [], level: 'easy' },
  { lessonId: 1147, sentence: 'Em nhớ lại ngày hôm wa vì có nhiều chuyện vui.', errorWords: ['wa'], level: 'easy' },
  { lessonId: 1147, sentence: 'Ngày mai em sẽ được đi công viên cùng bố mẹ.', errorWords: [], level: 'easy' },
  { lessonId: 1147, sentence: 'Buổi chiều hôm nay mặt trời lặn rất đẹp và sáng chói.', errorWords: [], level: 'easy' },
  { lessonId: 1147, sentence: 'Thời gian trôi di rất nhanh, em phải trân trọng mỗi ngày.', errorWords: ['di'], level: 'medium' },
  { lessonId: 1147, sentence: 'Mỗi buổi sáng thức dậy, em cảm thấy vui vẽ và tràn đầy năng lượng.', errorWords: ['vẽ'], level: 'medium' },
  { lessonId: 1147, sentence: 'Ngày hôm qua đã qua đi, em không thể lấy lại được nửa.', errorWords: ['nửa'], level: 'hard' },

  // ── 1149: Làm việc thật là vui (lao động, công việc) ─────────────────────
  { lessonId: 1149, sentence: 'Bố em làm việc chăm chỉ từ sáng đến chiều tối.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Mẹ nấu cơm rất ngon, cả nhà ăn hết sạch đĩa.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Các bác nông dân đang gặt lúa ngoài cánh đồng xanh tốt.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Làm việc chăm chỉ sẽ giúp em đạt được nhiều thành tích tốt.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Chú thợ nề đang xây tường gạch cho ngôi nhà mới.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Em giúp mẹ quét nhà và lau bàn ghế sạch sẽ.', errorWords: [], level: 'easy' },
  { lessonId: 1149, sentence: 'Mỗi người đều có công việc riêng, cùng nhau lao đông xây dựng quê hương.', errorWords: ['đông'], level: 'medium' },
  { lessonId: 1149, sentence: 'Làm việc thật là vui khi mọi người cùng hợp tác và giúp đổ nhau.', errorWords: ['đổ'], level: 'medium' },
  { lessonId: 1149, sentence: 'Chú thợ mộc chế tác những đồ vật tinh sảo bằng đôi bàn tay khéo léo.', errorWords: ['sảo'], level: 'hard' },
  { lessonId: 1149, sentence: 'Công viên được các cô chú công nhân chăm sóc gìn dữ sạch đẹp mỗi ngày.', errorWords: ['dữ'], level: 'hard' },

  // ── 1151: Một giờ học (trường học, học tập) ───────────────────────────────
  { lessonId: 1151, sentence: 'Cô giáo giảng bài rất hay và dễ hiểu.', errorWords: [], level: 'easy' },
  { lessonId: 1151, sentence: 'Giờ học Toán hôm nay các bạn làm bài rất sôi nỗi.', errorWords: ['nỗi'], level: 'easy' },
  { lessonId: 1151, sentence: 'Em ngồi ngay ngắn, chú ý nghe cô giáo giảng bài.', errorWords: [], level: 'easy' },
  { lessonId: 1151, sentence: 'Trong giờ học, các bạn không được nói chuyện riêng.', errorWords: [], level: 'easy' },
  { lessonId: 1151, sentence: 'Cô giáo viết chữ lên bảng đen bằng phấn trắng.', errorWords: [], level: 'easy' },
  { lessonId: 1151, sentence: 'Bạn Lan giơ tay phát biểu ý kiến trước cả lớp học.', errorWords: [], level: 'easy' },
  { lessonId: 1151, sentence: 'Một dờ học trôi qua rất nhanh vì bài học hôm nay rất thú vị.', errorWords: ['dờ'], level: 'medium' },
  { lessonId: 1151, sentence: 'Em cần chú ý học bài để không bị tụt hậu so với các bạn trong lớp.', errorWords: [], level: 'medium' },
  { lessonId: 1151, sentence: 'Bài kiểm tra hôm nay rất khó, em phải suy nghỉ rất lâu mới làm xong.', errorWords: ['nghỉ'], level: 'medium' },
  { lessonId: 1151, sentence: 'Trong giờ học, cô giáo dặn chúng em phải lắng nghe và ghi chép cẩng thận.', errorWords: ['cẩng'], level: 'hard' },

  // ── 1153: Cầu thủ dự bị (thể thao, bóng đá) ──────────────────────────────
  { lessonId: 1153, sentence: 'Các cầu thủ chạy nhanh trên sân cỏ xanh mướt.', errorWords: [], level: 'easy' },
  { lessonId: 1153, sentence: 'Trận bóng đá hôm nay rất hấp dẫn và kịch tính.', errorWords: [], level: 'easy' },
  { lessonId: 1153, sentence: 'Cầu thủ dự bị ngồi chờ ở ghế ngoài sân và sẵn sàng vào thay.', errorWords: [], level: 'easy' },
  { lessonId: 1153, sentence: 'Thủ môn bắt được bóng, cả đội vỗ tay hoan hô nhiệt liệt.', errorWords: [], level: 'easy' },
  { lessonId: 1153, sentence: 'Tiếng trống rống vang lên khi đội nhà ghi được bàn thắng.', errorWords: ['rống'], level: 'easy' },
  { lessonId: 1153, sentence: 'Huấn luyện viên động viên các cầu thủ cố gắng hết mình trong trận đấu.', errorWords: [], level: 'easy' },
  { lessonId: 1153, sentence: 'Cầu thủ số bảy sút bóng rất mạnh nhưng bóng bay quá sà.', errorWords: ['sà'], level: 'medium' },
  { lessonId: 1153, sentence: 'Đội bóng của trường em giành chiến thắng sau một trận đấu kịch tính và gay cấn.', errorWords: [], level: 'medium' },
  { lessonId: 1153, sentence: 'Cầu thủ dự bị được tung vào sân khi đồng đội bị chấn thưng.', errorWords: ['thưng'], level: 'hard' },
  { lessonId: 1153, sentence: 'Khán giả trên sân vận động hò reo cổ vũ nhiệt tình cho đội tuyển quốc gia thi đấu.', errorWords: [], level: 'hard' },

  // ── 1155: Thời khoá biểu (trường học, lịch học) ───────────────────────────
  { lessonId: 1155, sentence: 'Thời khoá biểu được treo trên tường lớp học.', errorWords: [], level: 'easy' },
  { lessonId: 1155, sentence: 'Hôm nay thứ tư, em có bốn tiết học buổi sáng.', errorWords: [], level: 'easy' },
  { lessonId: 1155, sentence: 'Em xem thời khoá biểu để chuẩn bị đúng sách vở cho ngày mai.', errorWords: [], level: 'easy' },
  { lessonId: 1155, sentence: 'Tiết Thể dục luôn được các bạn yêu thích nhất trong tuần.', errorWords: [], level: 'easy' },
  { lessonId: 1155, sentence: 'Thứ sáu có tiết Mĩ thuật, em nhớ mang bút chì và màu vẻ đến lớp.', errorWords: ['vẻ'], level: 'easy' },
  { lessonId: 1155, sentence: 'Mỗi buổi tối em xem thời khoá biểu để soạn cặp sách cho hôm sau.', errorWords: [], level: 'easy' },
  { lessonId: 1155, sentence: 'Thứ ba có tiết Tiếng Việt, em phải ôn lại bài chính tã cho thật kĩ.', errorWords: ['tã'], level: 'medium' },
  { lessonId: 1155, sentence: 'Theo thời khoá biểu, tiết cuối chiều thứ năm là giờ Sinh hoạt lớp.', errorWords: [], level: 'medium' },
  { lessonId: 1155, sentence: 'Thầy giáo nhắc nhở chúng em xem thời khoá biểu trước để chuẩn bị bài chu đáo.', errorWords: [], level: 'medium' },
  { lessonId: 1155, sentence: 'Lịch học kì hai có nhiều tiết Toán hơn, em cần ôn luyện thật cẩn thận và kiên trỉ.', errorWords: ['trỉ'], level: 'hard' },

  // ── 1157: Danh sách học sinh (tên, danh sách) ─────────────────────────────
  { lessonId: 1157, sentence: 'Cô giáo đọc danh sách học sinh để điểm danh buổi sáng.', errorWords: [], level: 'easy' },
  { lessonId: 1157, sentence: 'Tên em được gọi đầu tiên trong danh sách lớp hai A.', errorWords: [], level: 'easy' },
  { lessonId: 1157, sentence: 'Danh sách học sinh được dán lên bảng thông báo ở hành lang trường.', errorWords: [], level: 'easy' },
  { lessonId: 1157, sentence: 'Lớp em có ba mươi hai bạn học sinh, cả nam lẫn nữ.', errorWords: [], level: 'easy' },
  { lessonId: 1157, sentence: 'Bạn Minh đứng đầu dang sách vì tên có chữ cái đứng trước.', errorWords: ['dang'], level: 'easy' },
  { lessonId: 1157, sentence: 'Mỗi bạn trong lớp đều có một cái tên đẹp và ý nghĩa.', errorWords: [], level: 'easy' },
  { lessonId: 1157, sentence: 'Cô giáo ghi danh sách những bạn cần tham dự buổi họp phụ huynh vào cuốn số.', errorWords: ['số'], level: 'medium' },
  { lessonId: 1157, sentence: 'Em được xếp thứ mười lăm trong danh sách lớp theo thứ tự bảng chữ cái.', errorWords: [], level: 'medium' },
  { lessonId: 1157, sentence: 'Ban cán sự lớp lập danh sách học sinh tình nguyện tham gia buổi lao động.', errorWords: [], level: 'medium' },
  { lessonId: 1157, sentence: 'Danh sách học sinh giỏi học kì một được niêm yết công khai trước cổng trường một các trang trọng.', errorWords: ['các'], level: 'hard' },

  // ── 1159: Em học vẽ (vẽ, nghệ thuật) ─────────────────────────────────────
  { lessonId: 1159, sentence: 'Em học vẽ vào mỗi chiều thứ ba trong tuần.', errorWords: [], level: 'easy' },
  { lessonId: 1159, sentence: 'Bức tranh em vẽ là một ngôi nhà nhỏ bên bờ suối.', errorWords: [], level: 'easy' },
  { lessonId: 1159, sentence: 'Em tô màu bức tranh phong cảnh bằng bút màu sáp.', errorWords: [], level: 'easy' },
  { lessonId: 1159, sentence: 'Thầy giáo khen bức tranh của em vẽ đẹp và sinh động.', errorWords: [], level: 'easy' },
  { lessonId: 1159, sentence: 'Em muốn vẻ một bức tranh tặng mẹ nhân ngày sinh nhật của mẹ.', errorWords: ['vẻ'], level: 'easy' },
  { lessonId: 1159, sentence: 'Học vẽ giúp em phát triển khả năng quan sát và trí tưởng tượng.', errorWords: [], level: 'easy' },
  { lessonId: 1159, sentence: 'Em vẽ bông hoa hướng dương với những cánh hoa màu vàng rực rổ.', errorWords: ['rổ'], level: 'medium' },
  { lessonId: 1159, sentence: 'Bức tranh sơn mài trong bảo tàng được nghệ nhân chế tác rất tinh xảo và sắc sảo.', errorWords: [], level: 'medium' },
  { lessonId: 1159, sentence: 'Em pha màu xanh dương với màu vàng để tạo ra màu lục rồi tô lên lá cây trong tranh.', errorWords: [], level: 'hard' },
  { lessonId: 1159, sentence: 'Triển lãm tranh thiếu nhi thu hút rất nhiều người đến thăm và trầm trồ khen ngợi những tài năng nhỏ tuỗi.', errorWords: ['tuỗi'], level: 'hard' },

  // ── 1161: Khi trang sách mở ra (sách vở, đọc sách) ───────────────────────
  { lessonId: 1161, sentence: 'Em mở trang sách ra và bắt đầu đọc câu chuyện thú vị.', errorWords: [], level: 'easy' },
  { lessonId: 1161, sentence: 'Những trang sásh chứa đầy kiến thức bổ ích cho em.', errorWords: ['sásh'], level: 'easy' },
  { lessonId: 1161, sentence: 'Em đọc sách mỗi tối trước khi đi ngủ, đó là thói quen tốt.', errorWords: [], level: 'easy' },
  { lessonId: 1161, sentence: 'Bìa sách có hình ảnh rất đẹp, em muốn đọc ngay từ cái nhìn đầu tiên.', errorWords: [], level: 'easy' },
  { lessonId: 1161, sentence: 'Khi trang sách mở ra, một thế giới mới hiện ra trước mắt em.', errorWords: [], level: 'easy' },
  { lessonId: 1161, sentence: 'Em giữ gìn sách vở cẩn thận, không làm nhàu nát hay rách trang.', errorWords: [], level: 'easy' },
  { lessonId: 1161, sentence: 'Qua những trang sách, em khám phá được nhiều điều thú vị về thế giới xung quanh mình.', errorWords: [], level: 'medium' },
  { lessonId: 1161, sentence: 'Em thích đọc những cuốn truyện tranh có hình ảnh sắc sảo và nội dun hấp dẫn.', errorWords: ['dun'], level: 'medium' },
  { lessonId: 1161, sentence: 'Thư viện trường có rất nhiều đầu sách hay mà em chưa kịp khám phá hết được.', errorWords: [], level: 'medium' },
  { lessonId: 1161, sentence: 'Đọc sách không chỉ giúp em mở mang tri thức mà còn rèn luyện khả năng tưởng tượng phong fú.', errorWords: ['fú'], level: 'hard' },

  // ── 1163: Tớ nhớ cậu (bạn bè, tình cảm) ─────────────────────────────────
  { lessonId: 1163, sentence: 'Tớ nhớ cậu rất nhiều kể từ khi cậu chuyển trường.', errorWords: [], level: 'easy' },
  { lessonId: 1163, sentence: 'Hai đứa chúng mình đã là bạn thân từ hồi mẩu giáo.', errorWords: ['mẩu'], level: 'easy' },
  { lessonId: 1163, sentence: 'Bạn bè tốt luôn giúp đỡ nhau trong những lúc khó khăn.', errorWords: [], level: 'easy' },
  { lessonId: 1163, sentence: 'Em và Hoa chơi cùng nhau mỗi ngày, tụi mình rất thân thiết.', errorWords: [], level: 'easy' },
  { lessonId: 1163, sentence: 'Tớ viết thư cho cậu để kể chuyện trường lớp và bạn bè mới.', errorWords: [], level: 'easy' },
  { lessonId: 1163, sentence: 'Tình bạn là thứ quý giá mà chúng ta cần trân trọng mỗi ngày.', errorWords: [], level: 'easy' },
  { lessonId: 1163, sentence: 'Hai đứa hứa với nhau sẽ mãi mãi là bạn tốt dù có đi xa đến đâu chăn nữa.', errorWords: ['chăn'], level: 'medium' },
  { lessonId: 1163, sentence: 'Cậu đi rồi, tớ nhớ những buổi chiều hai đứa cùng thả diều và chạy nhảy trên bãi cỏ.', errorWords: [], level: 'medium' },
  { lessonId: 1163, sentence: 'Nhớ nhau không có nghĩa là yếu đuối mà là dấu hiệu của tình bạn chân thành và sâu sắc.', errorWords: [], level: 'hard' },
  { lessonId: 1163, sentence: 'Dù xa cách nhau về khoảng cách địa lí nhưng tình bạn của chúng mình vẫn bền chặc mãi mãi.', errorWords: ['chặc'], level: 'hard' },

  // ── 1165: Thả diều (trò chơi, thiên nhiên) ────────────────────────────────
  { lessonId: 1165, sentence: 'Buổi chiều các bạn nhỏ ra đồng thả diều rất vui.', errorWords: [], level: 'easy' },
  { lessonId: 1165, sentence: 'Con diều giấy bay lên cao tận tầng mây xanh thẳm.', errorWords: [], level: 'easy' },
  { lessonId: 1165, sentence: 'Gió thỗi nhẹ làm con diều lượn lờ trên bầu trời.', errorWords: ['thỗi'], level: 'easy' },
  { lessonId: 1165, sentence: 'Em cầm dây diều chạy theo chiều gió trên cánh đồng rộng lớn.', errorWords: [], level: 'easy' },
  { lessonId: 1165, sentence: 'Con diều hình chim phượng hoàng bay rất đẹp trên bầu trời xanh.', errorWords: [], level: 'easy' },
  { lessonId: 1165, sentence: 'Tiếng sáo diều vi vu trong gió chiều, nghe thật êm ái và trong trẻo.', errorWords: [], level: 'easy' },
  { lessonId: 1165, sentence: 'Để thả diều bay cao, em cần chạy nhanh ngược chiều dớ và buông dây từ từ.', errorWords: ['dớ'], level: 'medium' },
  { lessonId: 1165, sentence: 'Bầu trời mùa hè rực rỡ với hàng chục con diều đủ màu sắc của lũ trẻ trong xóm.', errorWords: [], level: 'medium' },
  { lessonId: 1165, sentence: 'Con diều bị đứt dây, bay xa dần rồi khuất sau rặng tre làng mà em không kịp chạy theo.', errorWords: [], level: 'hard' },
  { lessonId: 1165, sentence: 'Trò thả diều giúp trẻ em vui chơi ngoài trời, hít thở không khí trong lành và gắn kết với thiên nhiêm.', errorWords: ['nhiêm'], level: 'hard' },

  // ── 1167: Rồng rắn lên mây (trò chơi dân gian) ───────────────────────────
  { lessonId: 1167, sentence: 'Trò chơi rồng rắn lên mây rất phổ biến với trẻ em Việt Nam.', errorWords: [], level: 'easy' },
  { lessonId: 1167, sentence: 'Các bạn nắm đuôi áo nhau tạo thành một hàng dài như con rắn.', errorWords: [], level: 'easy' },
  { lessonId: 1167, sentence: 'Người đứng đầu hàng dẫn các bạn chạy lắt léo tránh người bắt.', errorWords: [], level: 'easy' },
  { lessonId: 1167, sentence: 'Bài đồng dao "Rồng rắn lên mây" được các em nhỏ hát rất vui.', errorWords: [], level: 'easy' },
  { lessonId: 1167, sentence: 'Trò chơi này không cần đạo cụ gì, chỉ cần một nhóm bạn vài nguời là chơi được.', errorWords: ['nguời'], level: 'easy' },
  { lessonId: 1167, sentence: 'Trẻ em ngày xưa thường chơi rồng rắn lên mây trước sân đình làng.', errorWords: [], level: 'easy' },
  { lessonId: 1167, sentence: 'Người làm "thầy thuốc" cố bắt "khúc đuôi" của hàng rồng rắn đang chạy ngoằng ngèo.', errorWords: ['ngèo'], level: 'medium' },
  { lessonId: 1167, sentence: 'Trò chơi dân gian giúp trẻ em phát triển sức khỏe, tinh thần đồng đội và gắn bó với nền văn hoá dân tộc.', errorWords: [], level: 'medium' },
  { lessonId: 1167, sentence: 'Những trò chơi dân gian truyền thống đang dần mai mọt trong nhịp sống hiện đại.', errorWords: ['mọt'], level: 'hard' },
  { lessonId: 1167, sentence: 'Bảo tồn và phát huy các trò chơi dân gian là trách nhiệm của thế hệ trẻ đối với di sản văn hoá nước nhà.', errorWords: [], level: 'hard' },

  // ── 1172: Mẹ (gia đình, mẹ) ───────────────────────────────────────────────
  { lessonId: 1172, sentence: 'Mẹ là người em yêu thương nhất trên đời này.', errorWords: [], level: 'easy' },
  { lessonId: 1172, sentence: 'Bàn tay mẹ luôn ấm áp mỗi khi ôm em vào lòng.', errorWords: [], level: 'easy' },
  { lessonId: 1172, sentence: 'Mẹ thức khuya thêu áo cho em mặc vào ngày tết.', errorWords: [], level: 'easy' },
  { lessonId: 1172, sentence: 'Tiếng ru hời của mẹ đưa em vào giấc ngủ ngon lành.', errorWords: [], level: 'easy' },
  { lessonId: 1172, sentence: 'Mẹ chắm sóc em mỗi khi em bị ốm, không rời bên em một bước.', errorWords: ['chắm'], level: 'easy' },
  { lessonId: 1172, sentence: 'Mỗi buổi sáng mẹ dậy sớm nấu cơm và chuẩn bị bữa ăn cho cả gia đình.', errorWords: [], level: 'easy' },
  { lessonId: 1172, sentence: 'Tình yêu của mẹ dành cho con là vô bờ bến, không gì có thể sánh bằng được.', errorWords: [], level: 'medium' },
  { lessonId: 1172, sentence: 'Mẹ vừa đi làm vừa chăm sóc gia đình, mẹ thật vất vã và hi sinh.', errorWords: ['vã'], level: 'medium' },
  { lessonId: 1172, sentence: 'Em hứa sẽ học thật giỏi để mẹ vui lòng và không phải lo lắng cho em nhiều.', errorWords: [], level: 'medium' },
  { lessonId: 1172, sentence: 'Những lời ru của mẹ là âm nhạc ngọt ngào nhất mà em mang theo suốt cuộc đời.', errorWords: [], level: 'hard' },

  // ── 1175: Thương ông (gia đình, ông bà) ──────────────────────────────────
  { lessonId: 1175, sentence: 'Ông nội đã già nhưng vẫn kể chuyện ngày xưa rất hay.', errorWords: [], level: 'easy' },
  { lessonId: 1175, sentence: 'Em thương ông vì ông luôn yêu chiều và chở che cho em.', errorWords: [], level: 'easy' },
  { lessonId: 1175, sentence: 'Hằng ngày em đọc báo giúp ông vì mắt ông đã kém hơn trước.', errorWords: [], level: 'easy' },
  { lessonId: 1175, sentence: 'Ông thường kể cho em nghe những câu chuyện về ngày tháng kháng chiến gian khổ.', errorWords: [], level: 'easy' },
  { lessonId: 1175, sentence: 'Mỗi buổi tối ông dắt em đi dạo quanh xóm và chỉ cho em biết tên các vì sao.', errorWords: [], level: 'easy' },
  { lessonId: 1175, sentence: 'Ông già rồi, chân tay đã yếu, em giúp ông những công việt nhỏ trong nhà.', errorWords: ['việt'], level: 'easy' },
  { lessonId: 1175, sentence: 'Em ngồi bên cạnh ông, ông truyện trò và dạy em những bài học về cuộc sống.', errorWords: ['truyện'], level: 'medium' },
  { lessonId: 1175, sentence: 'Tình cảm ông cháu thật ấm áp, đó là một phần kí ức tuổi thơ không thể nào quên được.', errorWords: [], level: 'medium' },
  { lessonId: 1175, sentence: 'Ông nội là người truyền dạy cho em tình yêu với quê hương và những giá trị truyền thống tốt đẹp.', errorWords: [], level: 'hard' },
  { lessonId: 1175, sentence: 'Kính trọng và yêu thương ông bà là đạo lí ngàn đời của người Việt Nam mà mỗi đứa cháu cần ghi nhớ.', errorWords: [], level: 'hard' },

  // ── 1178: Chuyện bốn mùa (thời tiết, mùa trong năm) ──────────────────────
  { lessonId: 1178, sentence: 'Bốn mùa xuân hạ thu đông mỗi mùa có vẻ đẹp riêng.', errorWords: [], level: 'easy' },
  { lessonId: 1178, sentence: 'Mùa xuân hoa nở rộ, chim hót líu lo trên cành cây.', errorWords: [], level: 'easy' },
  { lessonId: 1178, sentence: 'Mùa hè nắng chói chang, các bạn nhỏ được nghỉ hè vui vẻ.', errorWords: [], level: 'easy' },
  { lessonId: 1178, sentence: 'Mùa thu lá vàng rợt đầy sân, gió se se lạnh thổi nhẹ.', errorWords: ['rợt'], level: 'easy' },
  { lessonId: 1178, sentence: 'Mùa đông trời lạnh giá, em mặc áo ấm và quàng khăn ra ngoài.', errorWords: [], level: 'easy' },
  { lessonId: 1178, sentence: 'Mỗi mùa mang đến những điều kì diệu riêng cho thiên nhiên và con người.', errorWords: [], level: 'easy' },
  { lessonId: 1178, sentence: 'Vào mùa xuân, tiết trời ấm áp, cây cối đam chồi nảy lộc xanh tươi.', errorWords: ['đam'], level: 'medium' },
  { lessonId: 1178, sentence: 'Mùa hè oi bức, em thích nhất được ra biển tắm và ăn kem mát lạnh.', errorWords: [], level: 'medium' },
  { lessonId: 1178, sentence: 'Mùa thu là mùa của những buổi sáng se lạnh, sương mù giăng phủ núi đồi và thung lũng.', errorWords: [], level: 'hard' },
  { lessonId: 1178, sentence: 'Bốn mùa luân phiên thay đổi tạo nên nhịp điệu của cuộc sống và sự đa đạng của tự nhiên.', errorWords: ['đạng'], level: 'hard' },

  // ── 1183: Mùa vàng (mùa thu hoạch, nông nghiệp) ──────────────────────────
  { lessonId: 1183, sentence: 'Mùa vàng đã đến, cánh đồng lúa chín vàng ươm rực rỡ.', errorWords: [], level: 'easy' },
  { lessonId: 1183, sentence: 'Bác nông dân gặt lúa từ sáng sớm dưới ánh nắng ban mai.', errorWords: [], level: 'easy' },
  { lessonId: 1183, sentence: 'Tiếng máy gặt chạy rộn ràng trên cánh đồng vào mùa thu hoạch.', errorWords: [], level: 'easy' },
  { lessonId: 1183, sentence: 'Lúa chín vàng, bông lúa trĩu nặng uốn cong về một phía trông thật đẹp mắt.', errorWords: [], level: 'easy' },
  { lessonId: 1183, sentence: 'Mùa này người nông dân vất vả nhưng lòng phấn khởi vì năm nay được mùa bội thu.', errorWords: [], level: 'easy' },
  { lessonId: 1183, sentence: 'Hạt gạo trắng tinh được làm ra từ mồ hôi và công sức của các bác nông dân cần mẩm.', errorWords: ['mẩm'], level: 'easy' },
  { lessonId: 1183, sentence: 'Trẻ em theo chân ông bà ra đồng nhặt lúa rơi, lòng vui vẻ và thích thú với công việc này.', errorWords: [], level: 'medium' },
  { lessonId: 1183, sentence: 'Sau vụ gặt, cánh đồng trơ gốc rạ, chờ đợi vụ mùa mới sẽ lại bắt đầu vào mùa xuân.', errorWords: [], level: 'medium' },
  { lessonId: 1183, sentence: 'Mùa vàng là thành quả của một năm lao động cực nhọc, thể hiện sự cần cù và kiên nhẫng của người nông dân.', errorWords: ['nhẫng'], level: 'hard' },
  { lessonId: 1183, sentence: 'Từ hạt lúa vàng đồng quê trở thành bát cơm dẻo thơm là cả một hành trình lao động và sáng tạo đáng trân trọng.', errorWords: [], level: 'hard' },
];

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const conn = await mysql.createConnection(DB);

  let inserted = 0;
  for (const q of QUESTIONS) {
    const options = buildOptions(q.sentence);
    const correctAnswerJson = findErrorKeys(options, q.errorWords);

    // Sanity-check: if errorWords is non-empty but we couldn't find them, warn
    if (q.errorWords.length > 0 && correctAnswerJson.length !== q.errorWords.length) {
      console.warn(
        `⚠ Word mismatch in lessonId=${q.lessonId}: expected ${JSON.stringify(q.errorWords)} but found keys ${JSON.stringify(correctAnswerJson)} — skipping`,
      );
      continue;
    }

    await conn.execute(
      `INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, points, createdAt, updatedAt)
       VALUES (?, 'Hãy tìm trong câu sau những từ viết sai chính tả', 'find_errors', ?, ?, ?, 10, NOW(), NOW())`,
      [q.lessonId, q.level, JSON.stringify(options), JSON.stringify(correctAnswerJson)],
    );
    inserted++;
    if (inserted % 10 === 0) {
      console.log(`  ${inserted} questions inserted so far...`);
    }
  }

  console.log(`\nDone! ${inserted} / ${QUESTIONS.length} questions inserted.`);
  await conn.end();
}

main().catch(console.error);
