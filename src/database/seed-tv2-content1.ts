import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const LESSONS: { id: number; content: string }[] = [
  {
    id: 1146,
    content: `Bài 1 Tiếng Việt lớp 2 mang tựa đề "Tôi là học sinh lớp 2" là bài mở đầu thú vị giúp các em học sinh bước vào năm học mới với tâm thế tự tin và háo hức. Đây là bài học đầu tiên trong chương trình Tiếng Việt lớp 2 tập 1, giúp các em làm quen với môi trường lớp học mới, bạn bè mới và những thử thách mới.

Câu chuyện xoay quanh một bạn nhỏ trong ngày đầu tiên bước vào lớp 2. Em cảm thấy vừa hồi hộp vừa vui mừng khi nhìn thấy ngôi trường quen thuộc, lớp học với những hàng ghế ngay ngắn và khuôn mặt thân thiện của cô giáo. Bạn nhỏ tự giới thiệu bản thân, kể về gia đình và những điều em yêu thích. Qua đó, các em học sinh lớp 2 học cách diễn đạt thông tin về bản thân một cách rõ ràng, mạch lạc và tự tin trước tập thể lớp.

Các từ ngữ trọng tâm trong bài bao gồm: "học sinh" — người đang đi học tại trường; "lớp 2" — cấp học tiếp theo sau lớp 1; "trường học" — nơi các em đến học hàng ngày; "tự giới thiệu" — hành động nói cho người khác biết về mình; "bạn bè" — những người cùng học, cùng chơi; "cô giáo" — người dạy dỗ, hướng dẫn các em; "năm học mới" — chu kỳ học tập bắt đầu từ tháng 9. Những từ này giúp các em mở rộng vốn từ vựng cơ bản về môi trường học đường.

Qua bài học này, các em sẽ rèn luyện kỹ năng đọc hiểu văn bản ngắn, luyện viết câu giới thiệu bản thân và thực hành nói trước lớp. Bài tập kèm theo giúp các em ôn lại cách viết chữ hoa ở đầu câu và cách dùng dấu chấm cuối câu đúng chuẩn chính tả lớp 2.

Học bài "Tôi là học sinh lớp 2" không chỉ giúp các em nắm vững kiến thức Tiếng Việt cơ bản mà còn xây dựng sự tự tin khi giao tiếp. Phụ huynh có thể hỗ trợ con ôn bài bằng cách hỏi con kể về ngày đầu tiên đi học, giúp con luyện nói và luyện viết tại nhà một cách tự nhiên và vui vẻ.`,
  },
  {
    id: 1147,
    content: `Bài 2 Tiếng Việt lớp 2 với chủ đề "Ngày hôm qua đâu rồi?" là một bài học đặc biệt giúp các em học sinh lớp 2 bắt đầu hiểu về khái niệm thời gian — một trong những khái niệm trừu tượng đầu tiên mà trẻ em cần làm quen trong chương trình học. Bài học này nằm trong chủ đề "Mái trường mến yêu" của Tiếng Việt lớp 2 tập 1.

Bài đọc kể về một bạn nhỏ đang ngồi nhìn ra cửa sổ và thắc mắc: "Ngày hôm qua đâu rồi nhỉ?" Em nhớ lại những kỷ niệm đẹp của ngày hôm qua — buổi học vui vẻ, trò chơi cùng bạn bè, bữa cơm ấm áp bên gia đình. Ông nội giải thích cho em hiểu rằng ngày hôm qua đã đi vào ký ức, và chính những kỷ niệm đó làm cho ngày hôm nay trở nên ý nghĩa hơn. Câu chuyện nhẹ nhàng nhưng chứa đựng bài học sâu sắc về việc trân trọng từng khoảnh khắc trong cuộc sống.

Các từ ngữ và khái niệm trọng tâm gồm: "hôm qua" — ngày trước ngày hôm nay; "hôm nay" — ngày đang diễn ra; "ngày mai" — ngày tiếp theo sau hôm nay; "ký ức" — những điều đã xảy ra được lưu giữ trong tâm trí; "trân trọng" — biết quý giá những gì mình có; "thời gian" — sự trôi chảy của các ngày, giờ, phút; "kỷ niệm" — những khoảnh khắc đáng nhớ. Hiểu được các từ này giúp các em diễn đạt về thời gian chính xác hơn trong Tiếng Việt lớp 2.

Bài tập trong bài giúp các em phân biệt ba mốc thời gian hôm qua — hôm nay — ngày mai, đặt câu với các từ chỉ thời gian và kể lại một kỷ niệm đẹp bằng lời của mình. Mục tiêu là rèn kỹ năng dùng từ chỉ thời gian đúng ngữ cảnh.

Qua bài học "Ngày hôm qua đâu rồi?", các em học sinh lớp 2 không chỉ nắm vững kiến thức Tiếng Việt mà còn học được thái độ sống tích cực: biết trân trọng hiện tại và gìn giữ ký ức đẹp. Phụ huynh hãy cùng con ôn bài bằng cách kể cho nhau nghe về một ngày đáng nhớ trong tuần.`,
  },
  {
    id: 1148,
    content: `Bài 3 Tiếng Việt lớp 2 mang tựa đề "Niềm vui của Bi và Bống" là bài học ấm áp về tình bạn và sự chia sẻ, nằm trong chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Đây là bài học giúp các em học sinh lớp 2 hiểu được giá trị của tình bạn chân thật và niềm vui khi sống chan hòa với mọi người xung quanh.

Câu chuyện kể về hai người bạn thân là Bi và Bống. Một hôm, Bi nhận được một hộp màu vẽ mới rất đẹp và em rất sung sướng. Thay vì giữ riêng cho mình, Bi chủ động mời Bống cùng vẽ tranh. Hai bạn ngồi bên nhau, cùng vẽ, cùng cười đùa và tạo ra những bức tranh đầy màu sắc. Cuối ngày, cả hai đều cảm thấy hạnh phúc hơn rất nhiều so với khi chỉ chơi một mình. Câu chuyện giản dị nhưng truyền tải thông điệp: niềm vui được nhân đôi khi ta biết chia sẻ với bạn bè.

Các từ ngữ trọng tâm trong bài học tiếng việt lớp 2 bài 3 gồm: "niềm vui" — cảm giác hạnh phúc, vui mừng; "chia sẻ" — cùng nhau sử dụng hoặc cảm nhận điều gì đó; "tình bạn" — mối quan hệ gắn bó, thân thiết giữa các bạn; "hộp màu" — dụng cụ dùng để vẽ tranh; "cùng nhau" — hai hoặc nhiều người làm việc một lúc; "hạnh phúc" — trạng thái vui vẻ, thỏa mãn trong tâm hồn; "thân thiện" — thái độ cởi mở, dễ gần với người khác. Những từ này mở rộng vốn từ cảm xúc cho học sinh lớp 2.

Các bài tập kèm theo yêu cầu học sinh đọc hiểu câu chuyện, trả lời câu hỏi về nhân vật và kể lại câu chuyện theo cách của mình. Qua đó rèn luyện kỹ năng đọc hiểu và diễn đạt bằng lời nói cho học sinh lớp 2.

Học bài "Niềm vui của Bi và Bống" giúp các em không chỉ học Tiếng Việt mà còn hình thành nhân cách tốt đẹp. Phụ huynh có thể củng cố bài học bằng cách khuyến khích con chia sẻ đồ chơi, sách vở với anh chị em hoặc bạn bè, đồng thời luyện đọc bài cùng con mỗi tối.`,
  },
  {
    id: 1149,
    content: `Bài 4 Tiếng Việt lớp 2 với tựa đề "Làm việc thật là vui" thuộc chủ đề "Mái trường mến yêu" trong chương trình Tiếng Việt lớp 2 tập 1. Bài học mang đến cho các em học sinh lớp 2 thông điệp tích cực về tinh thần lao động, sự hợp tác và niềm vui khi hoàn thành công việc cùng nhau.

Bài đọc kể về buổi sáng cuối tuần của một gia đình nhỏ. Ba mẹ và hai anh em cùng nhau dọn dẹp nhà cửa: bố quét sân, mẹ lau nhà, anh rửa bát, em nhỏ sắp xếp đồ chơi gọn gàng. Dù mỗi người một việc, nhưng ai cũng vui vẻ, hát hò và giúp đỡ nhau. Khi công việc hoàn thành, cả nhà nhìn căn phòng sạch sẽ gọn gàng và cảm thấy tự hào vì thành quả của mình. Câu chuyện nhắn nhủ các em rằng lao động không phải là gánh nặng mà là nguồn vui khi có tinh thần tập thể.

Các từ ngữ và kiến thức trọng tâm của bài học tiếng việt lớp 2 bài 4 gồm: "lao động" — hoạt động làm việc để tạo ra thành quả; "hợp tác" — cùng làm việc với nhau để đạt mục tiêu chung; "dọn dẹp" — sắp xếp, làm sạch không gian; "tinh thần" — thái độ, ý chí bên trong mỗi người; "thành quả" — kết quả có được sau khi làm việc chăm chỉ; "tự hào" — cảm giác vui vẻ, hài lòng về điều mình đã làm; "gọn gàng" — ngăn nắp, không bừa bãi. Nắm vững các từ này giúp học sinh lớp 2 dùng từ chính xác khi nói và viết.

Bài tập của bài 4 yêu cầu học sinh đọc và trả lời câu hỏi về nội dung văn bản, tìm các từ chỉ hoạt động trong bài và đặt câu sử dụng những từ đó. Đây là cách ôn tập từ vựng và ngữ pháp hiệu quả cho học sinh lớp 2.

Bài học "Làm việc thật là vui" không chỉ giúp các em nâng cao trình độ Tiếng Việt lớp 2 mà còn giáo dục các em về ý thức lao động và tinh thần gia đình. Phụ huynh hãy tạo cơ hội cho con tham gia làm việc nhà phù hợp với lứa tuổi để con vừa ôn bài vừa rèn luyện kỹ năng sống thiết thực.`,
  },
  {
    id: 1150,
    content: `Bài 5 Tiếng Việt lớp 2 với tựa đề "Em có xinh không?" là bài học thú vị và gần gũi về vẻ đẹp bên trong và bên ngoài của con người, thuộc chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Đây là bài học giúp các em học sinh lớp 2 hiểu rằng vẻ đẹp thực sự không chỉ đến từ ngoại hình mà còn từ tâm hồn và hành động của mỗi người.

Câu chuyện kể về bé Lan — một cô bé hay thắc mắc và tò mò. Một hôm nhìn vào gương, Lan hỏi mẹ: "Mẹ ơi, em có xinh không?" Mẹ mỉm cười và dẫn Lan ra sân, chỉ cho em thấy những bông hoa đang nở rực rỡ, chú chim đang hót líu lo, và cô bạn hàng xóm đang giúp bà cụ xách đồ. Mẹ giải thích rằng vẻ đẹp thực sự là sự tử tế, lòng tốt và nụ cười chân thành. Lan hiểu ra và từ đó em luôn cố gắng làm những điều tốt đẹp để trở nên "xinh" theo cách của riêng mình.

Các từ ngữ trọng tâm của bài tiếng việt lớp 2 bài 5 bao gồm: "vẻ đẹp" — những gì làm cho ai đó hoặc điều gì đó trông đẹp; "bên ngoài" — phần nhìn thấy được bằng mắt; "bên trong" — phần tâm hồn, tính cách không nhìn thấy được; "lòng tự tin" — tin tưởng vào khả năng của bản thân; "tử tế" — có thái độ tốt, biết quan tâm đến người khác; "chân thành" — thật lòng, không giả tạo; "nụ cười" — biểu hiện vui vẻ, thân thiện trên khuôn mặt. Vốn từ này giúp học sinh lớp 2 diễn đạt cảm xúc và tính cách phong phú hơn.

Bài tập trong bài 5 yêu cầu học sinh đọc hiểu, trả lời câu hỏi về bài và liên hệ thực tế: kể về một điều tốt mà em đã làm. Mục tiêu là giúp học sinh lớp 2 phát triển kỹ năng tư duy và kết nối bài học với cuộc sống.

Bài học "Em có xinh không?" của chương trình Tiếng Việt lớp 2 không chỉ dạy kiến thức ngôn ngữ mà còn nuôi dưỡng lòng tự tin và nhân cách tốt cho trẻ. Phụ huynh hãy thường xuyên khen ngợi những hành động tốt của con và cùng con thảo luận về ý nghĩa của vẻ đẹp tâm hồn sau khi học bài.`,
  },
  {
    id: 1151,
    content: `Bài 6 Tiếng Việt lớp 2 mang tựa đề "Một giờ học" là bài học sinh động mô tả không khí của một tiết học trên lớp, nằm trong chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Qua bài học này, các em học sinh lớp 2 sẽ hiểu rõ hơn về những hoạt động diễn ra trong một giờ học và học cách học tập hiệu quả, có kỷ luật.

Bài đọc miêu tả một tiết học Tiếng Việt lớp 2 điển hình. Khi tiếng trống vang lên, các bạn học sinh nhanh chóng vào lớp, ngồi ngay ngắn chờ cô giáo. Cô giáo bước vào với nụ cười ấm áp, bắt đầu bài học bằng những câu hỏi gợi mở. Các bạn học sinh giơ tay phát biểu, chăm chú lắng nghe, hăng hái tham gia trò chơi học tập. Tiếng cười và tiếng đọc bài xen lẫn nhau tạo nên không khí học tập vui vẻ, tích cực. Bài học kết thúc khi cô khen cả lớp học tốt và nhắc nhở bài tập về nhà.

Các từ ngữ và kiến thức trọng tâm bài tiếng việt lớp 2 bài 6 gồm: "kỷ luật" — tuân thủ các quy tắc đề ra; "chăm chú" — tập trung hoàn toàn vào một việc; "phát biểu" — nói lên ý kiến trước lớp; "gợi mở" — đặt câu hỏi dẫn dắt suy nghĩ; "hăng hái" — tích cực, nhiệt tình tham gia; "hiệu quả" — làm việc đạt được kết quả tốt; "lắng nghe" — chú ý nghe một cách cẩn thận. Những từ này giúp học sinh lớp 2 mô tả hoạt động học tập một cách sinh động.

Qua bài học, các em sẽ thực hành đọc văn bản miêu tả, nhận biết trình tự sự việc và kể lại một tiết học bằng lời của mình. Bài tập giúp rèn luyện kỹ năng quan sát, ghi nhớ và diễn đạt cho học sinh lớp 2.

Bài học "Một giờ học" trong chương trình Tiếng Việt lớp 2 giúp các em nhận thức được tầm quan trọng của thái độ học tập đúng đắn. Phụ huynh có thể hỏi con về tiết học hôm nay, khuyến khích con kể chi tiết như trong bài để vừa ôn kiến thức Tiếng Việt lớp 2 vừa luyện kỹ năng nói chuyện tự nhiên.`,
  },
  {
    id: 1152,
    content: `Bài 7 Tiếng Việt lớp 2 có tựa đề "Cây xấu hổ" là một trong những bài học đặc sắc nhất trong chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Bài học giới thiệu về loài cây trinh nữ — thường được trẻ em gọi là "cây xấu hổ" vì có đặc tính kỳ lạ là tự gập lá lại khi bị chạm vào, mang đến cho các em cái nhìn đầy thú vị về thiên nhiên.

Bài đọc kể về một buổi chiều Minh và các bạn khám phá góc vườn sau nhà. Tình cờ Minh chạm vào một bụi cây nhỏ và bất ngờ khi thấy những chiếc lá tự động khép lại như đang "xấu hổ". Cậu bé tò mò thử chạm vào nhiều lần và lần nào cây cũng thu mình lại. Ông nội giải thích đây là cây trinh nữ, một loài thực vật đặc biệt có khả năng phản ứng với kích thích bên ngoài — đây là cách cây tự bảo vệ mình. Câu chuyện khơi dậy niềm yêu thích thiên nhiên và tinh thần tìm tòi khám phá trong các em.

Các từ ngữ trọng tâm của bài tiếng việt lớp 2 bài 7 bao gồm: "cây xấu hổ" hay "cây trinh nữ" — loài cây có lá tự gập lại khi bị chạm; "nhân hóa" — dùng từ ngữ chỉ người để miêu tả sự vật, hiện tượng; "tò mò" — muốn tìm hiểu, khám phá điều mới lạ; "khám phá" — tìm hiểu những điều chưa biết; "kích thích" — tác động từ bên ngoài làm thay đổi trạng thái; "tự nhiên" — môi trường không có sự can thiệp của con người; "bảo vệ" — giữ gìn, che chắn khỏi nguy hiểm. Đây là những từ vừa mang kiến thức ngôn ngữ vừa mở rộng hiểu biết về tự nhiên cho học sinh lớp 2.

Bài tập yêu cầu học sinh đọc hiểu bài, tìm các từ nhân hóa trong bài và tập đặt câu miêu tả một loài cây mà em biết. Mục tiêu là phát triển kỹ năng sử dụng biện pháp tu từ nhân hóa cơ bản cho học sinh lớp 2.

Qua bài "Cây xấu hổ", chương trình Tiếng Việt lớp 2 không chỉ dạy ngôn ngữ mà còn mở ra thế giới kỳ diệu của thiên nhiên. Phụ huynh có thể dẫn con ra vườn tìm cây trinh nữ để trực tiếp trải nghiệm điều được học trong bài, giúp kiến thức trở nên sống động và khó quên.`,
  },
  {
    id: 1153,
    content: `Bài 8 Tiếng Việt lớp 2 với tựa đề "Cầu thủ dự bị" là bài học ý nghĩa về tinh thần thể thao, sự kiên nhẫn và thái độ tích cực khi đối mặt với thử thách, thuộc chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Đây là bài học giúp các em học sinh lớp 2 hiểu rằng không phải lúc nào cũng được ở vị trí trung tâm, nhưng điều quan trọng là thái độ và sự cố gắng không ngừng.

Câu chuyện kể về Tuấn — một cậu bé yêu bóng đá nhưng lại bị xếp vào vị trí cầu thủ dự bị trong đội bóng của trường. Ban đầu Tuấn rất buồn và nản lòng vì không được ra sân thi đấu. Nhưng huấn luyện viên khuyến khích Tuấn tiếp tục tập luyện chăm chỉ và cổ vũ đồng đội hết mình. Trong một trận đấu quan trọng, khi đội cần người vào sân gấp, Tuấn được gọi và em đã tỏa sáng, góp phần giúp đội giành chiến thắng. Câu chuyện dạy các em rằng kiên nhẫn và không từ bỏ sẽ mang lại cơ hội xứng đáng.

Các từ ngữ và kiến thức trọng tâm của bài tiếng việt lớp 2 bài 8 gồm: "cầu thủ dự bị" — người chơi chờ được vào sân thay thế; "kiên nhẫn" — khả năng chờ đợi và cố gắng lâu dài mà không nản; "tinh thần thể thao" — thái độ thi đấu công bằng, tôn trọng và không bỏ cuộc; "cổ vũ" — động viên, khích lệ người khác; "nản lòng" — mất đi ý chí, không muốn tiếp tục; "chiến thắng" — kết quả giành được sau cuộc thi; "đồng đội" — những người cùng chơi trong một đội. Vốn từ này giúp học sinh lớp 2 diễn đạt về thể thao và cảm xúc phong phú hơn.

Bài tập trong bài 8 yêu cầu học sinh đọc và tóm tắt câu chuyện, phân tích tâm trạng nhân vật qua các giai đoạn khác nhau và viết vài câu về bài học em rút ra được. Đây là dạng bài giúp phát triển tư duy và kỹ năng viết câu cho học sinh lớp 2.

Học bài "Cầu thủ dự bị" trong chương trình Tiếng Việt lớp 2 giúp các em vừa học tiếng Việt vừa hình thành ý chí phấn đấu và tinh thần đoàn kết. Phụ huynh hãy chia sẻ cùng con những câu chuyện về sự kiên nhẫn và cố gắng để củng cố thêm bài học quý giá này.`,
  },
  {
    id: 1154,
    content: `Bài 9 Tiếng Việt lớp 2 với tựa đề "Cô giáo lớp em" là bài học đầy cảm xúc về tình cảm thầy trò — một trong những chủ đề truyền thống và ý nghĩa nhất trong chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Bài học giúp các em học sinh lớp 2 bày tỏ lòng biết ơn và tình yêu thương đối với cô giáo của mình.

Bài đọc miêu tả hình ảnh cô giáo lớp 2 qua đôi mắt trìu mến của một học sinh. Cô giáo luôn đến lớp sớm, chuẩn bị bài giảng chu đáo và mỉm cười chào từng em. Khi có bạn chưa hiểu bài, cô kiên nhẫn giải thích lại nhiều lần. Giờ ra chơi, cô cùng các bạn chơi trò chơi ngoài sân, cất tiếng hát vui vẻ. Học sinh cảm nhận được sự ấm áp và tình yêu thương mà cô dành cho mình mỗi ngày. Đây là bức tranh đẹp về mối quan hệ giữa thầy và trò trong môi trường giáo dục lành mạnh.

Các từ ngữ trọng tâm của bài học tiếng việt lớp 2 bài 9 gồm: "cô giáo" — người phụ nữ làm nghề dạy học; "trìu mến" — thái độ yêu thương, dịu dàng; "kiên nhẫn" — không nóng vội, chờ đợi và giúp đỡ lâu bền; "lòng biết ơn" — cảm xúc nhớ ơn người đã giúp mình; "tình cảm thầy trò" — mối quan hệ gắn bó giữa giáo viên và học sinh; "chu đáo" — làm việc cẩn thận, quan tâm đến từng chi tiết; "vai trò" — vị trí và tầm quan trọng của ai đó trong cuộc sống. Những từ này giúp học sinh lớp 2 mở rộng vốn từ về cảm xúc và mối quan hệ xã hội.

Qua bài học, các em rèn luyện kỹ năng đọc văn miêu tả, nhận biết các chi tiết đặc sắc trong bài và tập viết đoạn văn ngắn tả về cô giáo của mình. Đây là dạng bài tập viết sáng tạo phù hợp với học sinh lớp 2.

Bài học "Cô giáo lớp em" trong chương trình Tiếng Việt lớp 2 không chỉ dạy ngôn ngữ mà còn vun đắp tình cảm tốt đẹp. Phụ huynh hãy khuyến khích con vẽ tranh hoặc viết vài câu tặng cô giáo để bài học trở nên ý nghĩa và đáng nhớ hơn trong trái tim các em.`,
  },
  {
    id: 1155,
    content: `Bài 10 Tiếng Việt lớp 2 với tựa đề "Thời khoá biểu" là bài học thực hành gắn liền với cuộc sống học đường hàng ngày của các em, thuộc chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Bài học giúp học sinh lớp 2 làm quen với khái niệm thời khóa biểu, các môn học ở lớp 2 và rèn kỹ năng quản lý thời gian cá nhân.

Nội dung bài đọc giới thiệu thời khóa biểu của lớp 2A trong một tuần học. Bạn An được giao nhiệm vụ đọc thời khóa biểu trước lớp và giải thích cho các bạn nghe: sáng thứ Hai học Toán và Tiếng Việt, chiều thứ Ba học Mĩ thuật và Âm nhạc, thứ Tư học Tự nhiên và Xã hội... Qua việc đọc và hiểu thời khóa biểu, các em học sinh lớp 2 biết cách chuẩn bị sách vở và đồ dùng phù hợp với từng buổi học, hình thành thói quen tự quản lý việc học của mình.

Các từ ngữ và kiến thức trọng tâm của bài tiếng việt lớp 2 bài 10 bao gồm: "thời khóa biểu" — bảng phân chia các môn học theo ngày và giờ; "môn học" — từng lĩnh vực kiến thức được dạy ở trường; "buổi sáng/chiều" — các phần trong ngày học tập; "quản lý thời gian" — sắp xếp việc làm hợp lý theo thời gian; "chuẩn bị" — làm sẵn những thứ cần thiết trước khi thực hiện việc gì; "thứ tự" — sắp xếp theo một trình tự nhất định; "lịch học" — kế hoạch học tập theo ngày. Nắm vững các từ này giúp học sinh lớp 2 đọc và hiểu các văn bản thực tế trong cuộc sống.

Bài tập trong bài 10 yêu cầu học sinh đọc thời khóa biểu, trả lời câu hỏi về các môn học trong tuần và tập tự lập thời khóa biểu đơn giản cho bản thân. Đây là bài tập thực hành thiết thực giúp học sinh lớp 2 hình thành thói quen tự lập và chủ động trong học tập.

Học bài "Thời khoá biểu" trong chương trình Tiếng Việt lớp 2 là bước đầu giúp các em học sinh biết tổ chức và sắp xếp công việc học tập khoa học. Phụ huynh hãy cùng con xem xét thời khóa biểu thực tế của con và luyện đọc bài một cách thường xuyên để ghi nhớ kiến thức.`,
  },
  {
    id: 1156,
    content: `Bài 11 Tiếng Việt lớp 2 với tựa đề "Cái trống trường em" là bài học đặc sắc và giàu cảm xúc về biểu tượng quen thuộc của học đường, nằm trong chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Bài học giúp các em học sinh lớp 2 cảm nhận được nhịp sống học đường qua tiếng trống — âm thanh gắn bó mật thiết với ký ức trường lớp của mọi thế hệ học sinh Việt Nam.

Bài đọc là một bài thơ nhỏ hoặc đoạn văn miêu tả tiếng trống trường vang lên vào buổi sáng. Khi tiếng trống đầu tiên ngân vang, sân trường đang vắng lặng bỗng trở nên nhộn nhịp: học sinh từ các ngả đường tíu tít kéo đến, cặp sách trên vai, nụ cười trên môi. Tiếng trống giữa giờ báo hiệu giờ ra chơi — tiếng cười đùa, tiếng chạy nhảy rộn ràng. Tiếng trống tan học khiến cổng trường mở ra, gương mặt học sinh rạng rỡ sau một ngày học tốt. Chiếc trống như người bạn trung thành, điều phối nhịp sống của toàn trường.

Các từ ngữ trọng tâm của bài tiếng việt lớp 2 bài 11 gồm: "tiếng trống" — âm thanh phát ra từ nhạc cụ gõ, dùng ở trường để báo hiệu; "nhịp điệu" — sự lặp lại đều đặn của âm thanh hay hoạt động; "nhộn nhịp" — đông đúc, sôi động; "báo hiệu" — cho biết trước điều gì sắp xảy ra; "tíu tít" — nói chuyện hoặc di chuyển liên tục, náo nhiệt; "rộn ràng" — vui vẻ, sôi nổi với nhiều âm thanh; "kỷ niệm học trò" — những kỷ niệm đẹp thời đi học. Những từ này làm giàu thêm vốn từ miêu tả âm thanh và không khí cho học sinh lớp 2.

Bài tập yêu cầu học sinh đọc bài, tìm các từ láy trong bài và viết đoạn văn ngắn miêu tả một âm thanh mà em yêu thích ở trường. Đây là bài tập sáng tạo giúp phát triển khả năng quan sát và viết văn miêu tả cho học sinh lớp 2.

Qua bài "Cái trống trường em" trong chương trình Tiếng Việt lớp 2, các em không chỉ học ngôn ngữ mà còn thêm yêu mái trường thân thương. Phụ huynh hãy nhắc con lắng nghe tiếng trống khi đến trường và chia sẻ cảm xúc của mình để bài học trở nên sống động hơn.`,
  },
  {
    id: 1157,
    content: `Bài 12 Tiếng Việt lớp 2 với tựa đề "Danh sách học sinh" là bài học thực hành thiết thực, giúp các em làm quen với một loại văn bản hành chính đơn giản trong cuộc sống học đường, thuộc chương trình Tiếng Việt lớp 2 tập 1 chủ đề "Mái trường mến yêu". Bài học này giúp học sinh lớp 2 nắm được cách đọc và viết danh sách theo đúng quy tắc chuẩn.

Nội dung bài học giới thiệu một danh sách học sinh của lớp 2A gồm đầy đủ các cột: số thứ tự, họ và tên, ngày sinh, địa chỉ. Cô giáo hướng dẫn cả lớp cách đọc danh sách từ trái sang phải, từ trên xuống dưới; cách viết họ và tên đúng quy tắc — chữ cái đầu của họ, tên đệm và tên đều phải viết hoa. Học sinh cũng học cách điền thông tin cá nhân vào mẫu danh sách một cách chính xác. Đây là kỹ năng cơ bản mà mọi học sinh lớp 2 cần thành thạo.

Các từ ngữ và kiến thức trọng tâm của bài tiếng việt lớp 2 bài 12 gồm: "danh sách" — bảng liệt kê các tên theo thứ tự; "họ và tên" — tên đầy đủ gồm họ, tên đệm và tên chính; "số thứ tự" — con số đánh dấu vị trí trong danh sách; "viết hoa" — viết chữ cái lớn hơn ở đầu từ hoặc câu; "địa chỉ" — nơi ở cụ thể của một người; "thông tin cá nhân" — những dữ liệu riêng của mỗi người; "chuẩn xác" — đúng và chính xác không sai sót. Những từ này giúp học sinh lớp 2 đọc và viết các văn bản thực tế.

Bài tập yêu cầu học sinh đọc danh sách, tìm và điền thông tin còn thiếu, sau đó tập viết tên mình và các bạn trong lớp theo đúng quy tắc viết hoa. Bài tập vừa luyện kỹ năng viết chính tả vừa giúp các em biết cách trình bày thông tin có tổ chức.

Bài học "Danh sách học sinh" trong chương trình Tiếng Việt lớp 2 giúp các em nắm vững một kỹ năng thực tế quan trọng. Phụ huynh hãy yêu cầu con đọc to tên đầy đủ của mình và các thành viên trong gia đình, kiểm tra con viết hoa đúng quy tắc để củng cố bài học một cách hiệu quả.`,
  },
  {
    id: 1158,
    content: `Bài 13 Tiếng Việt lớp 2 với tựa đề "Yêu lắm trường ơi!" là bài học tràn đầy cảm xúc và tình yêu dành cho mái trường thân yêu, kết thúc chủ đề "Mái trường mến yêu" trong chương trình Tiếng Việt lớp 2 tập 1. Đây là bài học giúp học sinh lớp 2 tổng kết lại những tình cảm đẹp đẽ đã được vun đắp qua cả chủ đề học tập về trường lớp và bạn bè.

Bài đọc là đoạn văn hoặc bài thơ bày tỏ tình yêu thương da diết với ngôi trường. Tác giả nhớ lại những kỷ niệm đẹp: buổi sáng đầu tiên đặt chân vào trường với chiếc cặp mới, những giờ học say mê, tiếng cười giòn tan của bạn bè trong sân chơi, bóng dáng thân quen của thầy cô. Những kỷ niệm ấy đan xen nhau tạo nên bức tranh ký ức học trò tươi đẹp. Câu chuyện khơi dậy trong lòng người đọc tình yêu sâu sắc với ngôi trường — nơi không chỉ là chốn học kiến thức mà còn là nơi gắn bó những kỷ niệm tuổi thơ không thể nào quên.

Các từ ngữ trọng tâm của bài tiếng việt lớp 2 bài 13 bao gồm: "tình yêu trường học" — cảm xúc gắn bó, thương mến đối với ngôi trường; "kỷ niệm" — những điều đã qua được ghi nhớ mãi trong tâm trí; "da diết" — cảm xúc sâu sắc, không nguôi; "mái trường" — hình ảnh gợi lên ngôi trường thân thương; "cảm xúc" — trạng thái tâm lý vui, buồn, nhớ, thương; "gắn bó" — có mối liên kết chặt chẽ, không muốn rời xa; "tuổi thơ" — giai đoạn còn nhỏ của mỗi người. Những từ này làm giàu vốn từ cảm xúc và kỷ niệm cho học sinh lớp 2.

Qua bài học, các em rèn kỹ năng đọc diễn cảm văn bản giàu cảm xúc, cảm nhận vẻ đẹp ngôn ngữ và viết đoạn văn ngắn bày tỏ tình cảm của mình với trường học. Đây là dạng bài tập viết sáng tạo quan trọng trong chương trình Tiếng Việt lớp 2.

Bài học "Yêu lắm trường ơi!" là viên đá cuối đẹp đẽ của chủ đề đầu tiên trong Tiếng Việt lớp 2. Phụ huynh hãy cùng con đọc bài thật diễn cảm và hỏi con điều gì em yêu nhất ở trường của mình, để tình yêu học đường được nuôi dưỡng từ trong gia đình.`,
  },
  {
    id: 1159,
    content: `Bài 14 Tiếng Việt lớp 2 với tựa đề "Em học vẽ" mở đầu cho chủ đề mới trong chương trình Tiếng Việt lớp 2 tập 1, mang đến cho các em học sinh không khí tươi vui và sáng tạo của giờ học mĩ thuật. Bài học giúp các em lớp 2 khám phá thế giới màu sắc, hình dạng và cảm nhận niềm vui sáng tạo qua từng nét vẽ.

Nội dung bài đọc kể về buổi học vẽ đầu tiên của bé Mai trong năm học lớp 2. Thầy giáo phát cho mỗi em một tờ giấy trắng và hộp màu. Thầy hướng dẫn cả lớp vẽ ngôi nhà với mái đỏ, tường vàng, cây xanh và bầu trời xanh biếc. Mai chăm chú cầm bút, lưỡng lự chọn màu rồi bắt đầu phác nét đầu tiên. Dù ngôi nhà của Mai chưa thật đẹp, nhưng em rất vui và tự hào vì đó là sản phẩm do tay mình làm ra. Bài học nhắn nhủ rằng sáng tạo không cần phải hoàn hảo — điều quan trọng là dũng cảm bắt đầu và thể hiện bản thân.

Các từ ngữ trọng tâm của bài tiếng việt lớp 2 bài 14 gồm: "mĩ thuật" — môn học về cái đẹp, nghệ thuật tạo hình; "màu sắc" — đặc tính của ánh sáng mà mắt ta nhìn thấy; "hình dạng" — hình thức bên ngoài của vật thể; "sáng tạo" — tạo ra điều mới, không sao chép; "phác thảo" — vẽ nét sơ bộ chưa chi tiết; "nét vẽ" — đường kẻ hoặc hình được tạo ra khi vẽ; "tự hào" — cảm giác hài lòng và vui mừng về thành quả của mình. Những từ này mở rộng vốn từ về nghệ thuật và sáng tạo cho học sinh lớp 2.

Bài tập yêu cầu học sinh đọc hiểu bài, tìm các từ chỉ màu sắc trong bài và tập vẽ theo hướng dẫn hoặc vẽ tự do. Đây là bài tập liên môn thú vị, kết hợp Tiếng Việt lớp 2 với môn Mĩ thuật.

Học bài "Em học vẽ" trong chương trình Tiếng Việt lớp 2 giúp các em vừa học ngôn ngữ vừa kích thích trí tưởng tượng và sự sáng tạo. Phụ huynh hãy chuẩn bị cho con giấy và bút màu để con vẽ bức tranh theo nội dung bài học — đó là cách ôn bài Tiếng Việt lớp 2 vừa hiệu quả vừa thú vị nhất.`,
  },
  {
    id: 1160,
    content: `Bài 15 Tiếng Việt lớp 2 với tựa đề "Cuốn sách của em" là bài học ý nghĩa về tình yêu sách và thói quen đọc sách, thuộc chương trình Tiếng Việt lớp 2 tập 1. Đây là bài học khơi dậy trong các em học sinh lớp 2 niềm đam mê đọc sách — thói quen tốt sẽ đồng hành cùng các em suốt cả cuộc đời.

Bài đọc kể về cậu bé Khoa có một cuốn sách truyện tranh mà em yêu thích nhất. Cuốn sách có trang bìa đẹp với nhiều màu sắc, bên trong là những câu chuyện về các con vật kỳ lạ ở rừng nhiệt đới. Mỗi tối trước khi ngủ, Khoa đều lấy cuốn sách ra đọc. Em học được cách giữ sách cẩn thận: không làm nhàu trang, không vẽ vào sách, không để sách bị ướt. Khi đọc xong, em xếp sách ngăn nắp vào giá. Câu chuyện về Khoa truyền cảm hứng cho các bạn học sinh lớp 2 yêu quý và nâng niu những cuốn sách của mình.

Các từ ngữ và kiến thức trọng tâm của bài tiếng việt lớp 2 bài 15 bao gồm: "tình yêu sách" — sự yêu thích, trân trọng đối với sách; "bộ phận của sách" — các phần tạo nên cuốn sách như bìa, trang, gáy, mục lục; "thói quen đọc sách" — hành động đọc sách được thực hiện đều đặn; "truyện tranh" — sách kể chuyện bằng hình ảnh; "nâng niu" — giữ gìn cẩn thận, không để hỏng; "tủ sách" — nơi để và bảo quản sách; "kiến thức" — những điều học được, hiểu biết được tích lũy qua thời gian. Những từ này giúp học sinh lớp 2 nói và viết về sách một cách phong phú.

Bài tập yêu cầu học sinh đọc và trả lời câu hỏi, tìm các từ chỉ bộ phận của cuốn sách trong bài và giới thiệu về một cuốn sách em yêu thích. Đây là bài luyện nói và viết sáng tạo phù hợp với học sinh lớp 2.

Bài học "Cuốn sách của em" trong chương trình Tiếng Việt lớp 2 không chỉ dạy ngôn ngữ mà còn gieo mầm tình yêu đọc sách cho trẻ. Phụ huynh hãy xây dựng góc đọc sách tại nhà và dành thời gian đọc sách cùng con mỗi ngày, đó là cách tốt nhất để con học Tiếng Việt lớp 2 hiệu quả và phát triển toàn diện.`,
  },
  {
    id: 1161,
    content: `Bài 16 Tiếng Việt lớp 2 với tựa đề "Khi trang sách mở ra" là bài học kết thúc đầy thi vị của chủ đề 2 trong chương trình Tiếng Việt lớp 2 tập 1, đưa các em học sinh vào thế giới kỳ diệu của trí tưởng tượng và niềm đam mê đọc sách. Đây là bài học nâng cao tâm hồn, giúp các em lớp 2 cảm nhận được sức mạnh diệu kỳ mà mỗi cuốn sách mang lại.

Bài đọc là một bài thơ hoặc đoạn văn giàu hình ảnh mô tả những điều kỳ diệu xảy ra khi em mở một cuốn sách ra. Khi trang sách đầu tiên mở ra, em bỗng thấy mình đang đứng giữa khu rừng xanh thẳm với tiếng chim hót; rồi trang tiếp theo đưa em đến đại dương bao la với những con cá nhiều màu sắc lượn lờ; trang sau lại dẫn em lên bầu trời đêm với muôn ngàn vì sao lấp lánh. Mỗi cuốn sách là cánh cửa dẫn đến một thế giới khác nhau — không gian, thời gian, con người, sự kiện đều có thể hiện diện chỉ qua những trang giấy mỏng manh. Đó là điều kỳ diệu mà chỉ sách mới có thể làm được.

Các từ ngữ trọng tâm của bài học tiếng việt lớp 2 bài 16 gồm: "trí tưởng tượng" — khả năng hình dung ra những điều không trực tiếp nhìn thấy; "thế giới kỳ diệu" — nơi chốn đặc biệt, đầy bí ẩn và thú vị; "kỳ diệu" — vượt ngoài sự tưởng tượng thông thường, đáng ngạc nhiên; "cánh cửa" — hình ảnh ẩn dụ cho sự bắt đầu của một hành trình mới; "bay bổng" — tưởng tượng đến những điều cao xa, rộng lớn; "khám phá" — tìm hiểu, phát hiện ra điều mới mẻ; "ẩn dụ" — cách dùng hình ảnh này để nói về điều khác. Những từ này làm phong phú thêm ngôn ngữ văn học cho học sinh lớp 2.

Bài tập yêu cầu học sinh đọc diễn cảm bài thơ/đoạn văn, tìm các hình ảnh đẹp trong bài và viết đoạn văn về điều em tưởng tượng khi đọc sách. Đây là bài tập phát triển tư duy sáng tạo và năng lực cảm thụ văn học cho học sinh lớp 2.

Bài học "Khi trang sách mở ra" là kết thúc hoàn hảo cho hành trình học Tiếng Việt lớp 2 tập 1 chủ đề 2, để lại trong các em tình yêu sâu sắc với sách và ngôn ngữ. Phụ huynh hãy cùng con tưởng tượng những thế giới kỳ diệu trong sách, biến việc đọc sách thành cuộc phiêu lưu hàng ngày của gia đình.`,
  },
];

async function seed() {
  const conn = await mysql.createConnection(DB);
  for (const l of LESSONS) {
    await conn.execute('UPDATE lessons SET content=?, updatedAt=NOW() WHERE id=?', [l.content, l.id]);
    console.log(`Updated lesson ${l.id}`);
  }
  await conn.end();
  console.log('Done!');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
