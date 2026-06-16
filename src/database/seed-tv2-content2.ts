import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const LESSONS: { id: number; content: string }[] = [
  {
    id: 1162,
    content: `Bài 17 "Gọi bạn" trong chương trình Tiếng Việt lớp 2 mở ra một thế giới hồn nhiên, trong sáng của tình bạn tuổi thơ. Đây là một trong những bài học được học sinh lớp 2 yêu thích nhất bởi nội dung gần gũi, phản ánh đúng những trải nghiệm sống động trong cuộc sống hàng ngày của các em.

Bài đọc kể về việc một bạn nhỏ rủ bạn cùng ra ngoài chơi. Tiếng gọi bạn vang lên thật trong trẻo và thân thiện, thể hiện sự háo hức muốn được chia sẻ niềm vui cùng bạn bè. Qua từng câu chữ, học sinh lớp 2 cảm nhận được sự chân thành, hồn nhiên của tình bạn — thứ tình cảm đẹp đẽ và quý giá mà ai cũng trải qua trong những năm tháng đầu đời đến trường.

Những từ ngữ trọng tâm trong bài như "gọi bạn", "cùng chơi", "thân thiện", "vui vẻ" giúp học sinh lớp 2 mở rộng vốn từ về tình bạn và giao tiếp xã hội. Các em học cách dùng những lời lẽ lịch sự, ấm áp khi mời gọi bạn bè, hiểu rằng một lời mời chân thành có thể mang lại niềm vui to lớn cho cả hai phía.

Mục tiêu của bài tập trong bài 17 là giúp học sinh luyện đọc trôi chảy, hiểu nội dung văn bản và biết diễn đạt ý kiến của mình. Các bài tập đọc hiểu giúp các em rèn luyện kỹ năng tư duy, trả lời câu hỏi và kể lại nội dung theo cách diễn đạt riêng. Bài tập viết hướng dẫn học sinh lớp 2 viết đúng chính tả, dùng đúng dấu câu khi ghi lại lời thoại.

Học bài "Gọi bạn" không chỉ giúp các em tiến bộ về kỹ năng đọc viết trong môn tiếng việt lớp 2 mà còn bồi dưỡng phẩm chất tốt đẹp: biết quan tâm, chia sẻ và chủ động kết nối với bạn bè xung quanh. Tình bạn được xây dựng từ những lời gọi chân thành như vậy sẽ đồng hành cùng các em suốt cả cuộc đời. Đây chính là bài học về giá trị sống mà chương trình tiếng việt lớp 2 hướng tới, giúp học sinh không chỉ học chữ mà còn học cách làm người.`,
  },
  {
    id: 1163,
    content: `Bài 18 "Tớ nhớ cậu" trong chương trình Tiếng Việt lớp 2 là một bài học cảm động về tình bạn khi xa cách. Bài đọc mang đến cho học sinh lớp 2 những rung cảm chân thật khi khám phá cảm giác nhớ bạn — một cảm xúc quen thuộc mà hầu hết các em đều đã trải qua ít nhất một lần trong cuộc sống.

Nội dung bài kể về một bạn nhỏ viết thư cho người bạn thân đang ở xa. Trong bức thư, bạn ấy bày tỏ nỗi nhớ qua những kỷ niệm cùng nhau chơi đùa, học bài và những khoảnh khắc bình dị nhưng đáng nhớ. Qua bài đọc, học sinh lớp 2 hiểu rằng viết thư là một cách thể hiện tình cảm rất đẹp — dù ngày nay có nhiều phương tiện liên lạc hiện đại, bức thư tay vẫn mang một giá trị đặc biệt khó thay thế.

Các từ ngữ trọng tâm như "nhớ bạn", "viết thư", "kỷ niệm", "tình bạn", "xa cách" được giới thiệu kỹ lưỡng trong bài học tiếng việt lớp 2 này. Học sinh được hướng dẫn cách dùng những từ bày tỏ cảm xúc một cách phù hợp, tự nhiên và chân thành. Đây là những từ ngữ quan trọng giúp các em mở rộng khả năng diễn đạt cảm xúc trong giao tiếp hàng ngày.

Mục tiêu bài tập trong bài 18 bao gồm luyện đọc diễn cảm, nắm bắt nội dung thư và tập viết một bức thư ngắn theo mẫu. Đây là một trong những dạng bài thực hành rất quan trọng trong tiếng việt lớp 2, giúp học sinh làm quen với thể loại văn thư từ ngay từ khi còn nhỏ. Kỹ năng viết thư sẽ theo các em suốt các bậc học sau này.

Học bài "Tớ nhớ cậu" mang lại nhiều lợi ích cho học sinh lớp 2: rèn luyện kỹ năng đọc hiểu, phát triển khả năng biểu đạt cảm xúc bằng ngôn ngữ và nuôi dưỡng trái tim nhạy cảm, biết trân trọng tình bạn. Những tình cảm chân thành được học từ sách giáo khoa tiếng việt lớp 2 sẽ là nền tảng để các em xây dựng những mối quan hệ tốt đẹp trong tương lai.`,
  },
  {
    id: 1164,
    content: `Bài 19 "Chữ A và những người bạn" trong chương trình Tiếng Việt lớp 2 là một câu chuyện thú vị và sáng tạo về thế giới của các chữ cái. Bằng nghệ thuật nhân hóa độc đáo, bài học biến những ký tự trừu tượng trở thành những nhân vật sinh động, gần gũi với học sinh lớp 2, giúp các em học vần và chữ ghép một cách vui vẻ, tự nhiên.

Câu chuyện xoay quanh nhân vật chữ A — vị "thủ lĩnh" trong bảng chữ cái — và những người bạn của mình. Mỗi chữ cái đều có tính cách riêng, cùng nhau tạo nên những âm tiết, những từ ngữ có ý nghĩa. Qua câu chuyện, học sinh lớp 2 hiểu rằng mỗi chữ cái đều quan trọng và chỉ khi các chữ đứng cạnh nhau, chúng mới tạo ra được những từ có nghĩa, như những người bạn cần có nhau để cuộc sống thêm ý nghĩa.

Những từ ngữ trọng tâm của bài học tiếng việt lớp 2 này bao gồm các vần cơ bản, cách ghép chữ và đọc âm tiết. Học sinh được luyện tập nhận diện và phát âm chính xác các tổ hợp âm, đặt nền tảng vững chắc cho kỹ năng đọc viết. Đây là bài học có ý nghĩa quan trọng trong việc củng cố kiến thức về hệ thống chữ viết tiếng Việt.

Mục tiêu bài tập trong bài 19 hướng đến việc giúp học sinh lớp 2 đọc trơn, đọc đúng các âm tiết có vần phức tạp hơn, đồng thời luyện viết chính xác. Các bài tập điền vần, ghép từ và đặt câu giúp các em không chỉ ghi nhớ mà còn biết vận dụng kiến thức vào thực tế. Hình thức câu chuyện nhân hóa làm cho quá trình học trở nên thú vị và đáng nhớ hơn.

Học bài "Chữ A và những người bạn" giúp học sinh lớp 2 củng cố nền tảng tiếng việt vững chắc, phát triển tình yêu với chữ viết và ngôn ngữ. Khi hiểu rằng mỗi chữ cái như một người bạn, các em sẽ học với tâm thế tích cực và hứng khởi hơn, từ đó tiến bộ nhanh hơn trong môn tiếng việt lớp 2.`,
  },
  {
    id: 1165,
    content: `Bài 20 "Nhím nâu kết bạn" trong chương trình Tiếng Việt lớp 2 là một câu chuyện ý nghĩa về hành trình vượt qua sự nhút nhát để kết bạn. Qua nhân vật chú nhím nhỏ đáng yêu, bài học truyền tải thông điệp ấm áp rằng dù rụt rè đến đâu, ai cũng có thể học cách mở lòng và tìm được bạn bè.

Câu chuyện kể về chú nhím nâu vốn rất nhút nhát, luôn cuộn mình lại mỗi khi có ai đến gần. Nhím sống đơn độc trong khu rừng nhỏ, trong khi các bạn thú khác vui chơi cùng nhau. Một ngày, nhím gặp một người bạn kiên nhẫn và thân thiện, người đó không bỏ cuộc dù nhím có thu mình lại. Dần dần, nhím hiểu rằng gai nhọn trên người không phải là rào cản để kết bạn, và sự rụt rè cũng không phải là điểm yếu mà là một phần cá tính cần được tôn trọng.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này như "nhút nhát", "rụt rè", "kết bạn", "kiên nhẫn", "thân thiện" giúp học sinh lớp 2 mở rộng vốn từ về tính cách và cảm xúc. Đây là những từ quan trọng không chỉ trong học tập mà còn trong giao tiếp xã hội hàng ngày của các em.

Mục tiêu bài tập bao gồm đọc hiểu nội dung câu chuyện, trả lời câu hỏi về nhân vật và sự kiện, đồng thời liên hệ bản thân. Các câu hỏi mở như "Em có bao giờ cảm thấy nhút nhát không? Em đã làm gì?" giúp học sinh lớp 2 phát triển kỹ năng tư duy phản biện và tự nhận thức. Bài tập kể chuyện sáng tạo khuyến khích các em tưởng tượng và diễn đạt theo cách riêng.

Học bài "Nhím nâu kết bạn" mang lại nhiều lợi ích thiết thực cho học sinh lớp 2: phát triển kỹ năng đọc hiểu văn bản tự sự, bồi dưỡng lòng đồng cảm và sự kiên nhẫn trong cuộc sống. Câu chuyện còn giúp những em nhút nhát tìm thấy sự đồng cảm, nhận ra rằng mình không đơn độc và kết bạn là điều hoàn toàn có thể làm được. Đây là bài học nhân văn sâu sắc trong chương trình tiếng việt lớp 2.`,
  },
  {
    id: 1166,
    content: `Bài 21 "Thả diều" trong chương trình Tiếng Việt lớp 2 đưa học sinh trở về với những buổi chiều tươi đẹp của tuổi thơ, khi những cánh diều rực rỡ tung bay trên bầu trời xanh ngắt. Đây là một trong những bài học gợi cảm xúc mạnh mẽ nhất trong chương trình, chạm đến trái tim của cả học sinh lẫn phụ huynh.

Bài đọc miêu tả cảnh các bạn nhỏ cùng nhau ra cánh đồng thả diều vào buổi chiều gió lộng. Những cánh diều đủ màu sắc — đỏ, vàng, xanh — vút lên cao, kéo theo cả niềm vui và tiếng cười của trẻ thơ. Gió như người bạn đồng hành trung thành, giúp những cánh diều bay cao hơn, xa hơn. Học sinh lớp 2 cảm nhận được sự tự do, trong sáng và hạnh phúc ngây thơ qua từng dòng văn.

Những từ ngữ trọng tâm của bài học tiếng việt lớp 2 này như "thả diều", "bầu trời", "cơn gió", "bay cao", "niềm vui" giúp học sinh mở rộng vốn từ về thiên nhiên và trò chơi dân gian. Thả diều là một trò chơi truyền thống của trẻ em Việt Nam, và bài học này góp phần bảo tồn và truyền dạy giá trị văn hóa dân tộc cho thế hệ trẻ.

Mục tiêu bài tập trong bài 21 hướng đến việc luyện đọc diễn cảm, miêu tả hình ảnh và cảm xúc qua ngôn ngữ. Các bài tập quan sát tranh và viết câu miêu tả giúp học sinh lớp 2 phát triển tư duy hình ảnh và khả năng diễn đạt sáng tạo. Bài tập về từ láy, từ ghép trong ngữ cảnh bài đọc cũng là điểm nhấn quan trọng của bài học này.

Học bài "Thả diều" mang lại nhiều lợi ích cho học sinh lớp 2: không chỉ rèn luyện kỹ năng đọc viết mà còn nuôi dưỡng tâm hồn yêu thiên nhiên, yêu văn hóa truyền thống. Cánh diều trong bài học như biểu tượng của ước mơ và khát vọng — nhắc nhở các em luôn hướng đến những điều tốt đẹp phía trước. Đây là bài học tiếng việt lớp 2 kết hợp hài hòa giữa học kiến thức ngôn ngữ và giáo dục tâm hồn.`,
  },
  {
    id: 1167,
    content: `Bài 22 "Tớ là lê-gô" trong chương trình Tiếng Việt lớp 2 là một bài học thú vị và sáng tạo, khai thác thế giới của trò chơi lắp ghép lego quen thuộc với trẻ em hiện đại. Bài học không chỉ giúp học sinh lớp 2 phát triển kỹ năng ngôn ngữ mà còn khuyến khích tư duy sáng tạo và khả năng tưởng tượng không gian ba chiều.

Bài đọc được viết theo góc nhìn của những mảnh lego — những nhân vật nhỏ bé nhưng đầy năng lượng và sáng tạo. Mỗi mảnh lego kể về mình với vẻ tự hào: tuy chỉ là một mảnh nhỏ nhưng khi ghép lại cùng các bạn, chúng tạo nên những công trình kỳ diệu — lâu đài, ô tô, phi thuyền. Qua câu chuyện nhân hóa độc đáo này, học sinh lớp 2 học được bài học sâu sắc về sức mạnh của sự hợp tác và sáng tạo.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "lắp ghép", "sáng tạo", "xây dựng", "hợp tác", "tưởng tượng". Đây là những từ ngữ thuộc lĩnh vực tư duy sáng tạo, giúp học sinh làm quen với ngôn ngữ của đổi mới và xây dựng. Bài học cũng giới thiệu một số từ ngữ liên quan đến các loại đồ chơi và hoạt động vui chơi hiện đại.

Mục tiêu bài tập trong bài 22 bao gồm đọc hiểu văn bản, nhận biết biện pháp nhân hóa và luyện viết câu miêu tả. Học sinh lớp 2 được khuyến khích viết về đồ chơi yêu thích của mình theo cách nhân hóa, từ đó phát triển khả năng viết sáng tạo. Đây là một trong những bài tập tập làm văn đầu tiên trong chương trình tiếng việt lớp 2 có yếu tố sáng tạo cao.

Học bài "Tớ là lê-gô" giúp học sinh lớp 2 nhận ra rằng việc học ngôn ngữ có thể kết nối trực tiếp với cuộc sống và những điều các em yêu thích. Trò chơi lego không chỉ rèn luyện tư duy không gian mà còn dạy trẻ về sự kiên nhẫn, sáng tạo và tinh thần đồng đội — những giá trị mà bài học tiếng việt lớp 2 này khéo léo truyền tải qua ngôn ngữ văn học.`,
  },
  {
    id: 1168,
    content: `Bài 23 "Rồng rắn lên mây" trong chương trình Tiếng Việt lớp 2 đưa học sinh trở về với một trò chơi dân gian đặc sắc của trẻ em Việt Nam. Bài học kết hợp bài đồng dao truyền thống với hoạt động vui chơi tập thể, giúp học sinh lớp 2 vừa học ngôn ngữ vừa khám phá di sản văn hóa dân tộc phong phú.

Bài đọc giới thiệu trò chơi "Rồng rắn lên mây" — một trò chơi vận động tập thể mà trẻ em Việt Nam đã chơi từ hàng trăm năm nay. Trong trò chơi, các bạn nhỏ nắm tay nhau thành hàng dài như con rồng rắn, vừa chạy vừa hát bài đồng dao theo nhịp. Tiếng đồng dao vang lên rộn ràng, tạo nên không khí vui tươi, náo nhiệt của tuổi thơ. Học sinh lớp 2 cảm nhận được niềm vui hồn nhiên và tinh thần đoàn kết qua trò chơi này.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "đồng dao", "trò chơi dân gian", "rồng rắn", "nhịp điệu", "đoàn kết". Bài học giúp học sinh làm quen với thể loại văn học dân gian đặc sắc — đồng dao, với đặc trưng có vần điệu, nhịp nhàng và dễ thuộc. Đây là nền tảng để các em hiểu và yêu thêm văn học dân gian Việt Nam.

Mục tiêu bài tập trong bài 23 bao gồm học thuộc và đọc diễn cảm bài đồng dao, tìm hiểu về các trò chơi dân gian và luyện tập các từ có vần điệu. Học sinh lớp 2 được khuyến khích tìm hiểu thêm về các trò chơi dân gian khác, từ đó phát triển vốn hiểu biết về văn hóa. Bài tập đặt câu với từ ngữ trọng tâm giúp các em củng cố kỹ năng ngữ pháp.

Học bài "Rồng rắn lên mây" mang lại nhiều lợi ích quý giá cho học sinh lớp 2: rèn luyện trí nhớ qua học thuộc đồng dao, phát triển cảm thụ nhịp điệu ngôn ngữ tiếng Việt và bồi dưỡng tình yêu với văn hóa truyền thống dân tộc. Bài học tiếng việt lớp 2 này nhắc nhở các em trân trọng những trò chơi dân gian đang dần mai một trong thời đại kỹ thuật số, giữ gìn bản sắc văn hóa Việt Nam.`,
  },
  {
    id: 1169,
    content: `Bài 24 "Nặn đồ chơi" trong chương trình Tiếng Việt lớp 2 dẫn học sinh vào thế giới sáng tạo tạo hình thú vị qua hoạt động nặn đất sét. Đây là bài học kết hợp hài hòa giữa ngôn ngữ và nghệ thuật thủ công, giúp học sinh lớp 2 phát triển toàn diện cả tư duy ngôn ngữ lẫn kỹ năng sáng tạo.

Bài đọc miêu tả một buổi học thủ công mĩ nghệ đặc biệt, nơi các bạn nhỏ háo hức nặn những món đồ chơi từ đất sét. Bạn thì nặn con thỏ, bạn thì nặn chiếc bình hoa, bạn lại nặn một chiếc ô tô nhỏ xíu. Đôi tay nhỏ bé nhưng khéo léo nhào nặn, uốn nắn từng chi tiết với sự tập trung và say mê đáng ngưỡng mộ. Khi những sản phẩm hoàn thành, niềm tự hào và hạnh phúc hiện rõ trên khuôn mặt mỗi em.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "nặn", "đất sét", "tạo hình", "sáng tạo", "thủ công". Học sinh lớp 2 học được cách miêu tả quá trình làm ra một sản phẩm, sử dụng các động từ chỉ hành động tạo hình như nặn, bóp, uốn, ép. Đây là mảng từ vựng thực hành sinh động, gắn với hoạt động cụ thể trong cuộc sống.

Mục tiêu bài tập trong bài 24 hướng đến việc đọc hiểu văn bản miêu tả, học cách sắp xếp trình tự các bước trong một hoạt động và luyện viết đoạn văn miêu tả. Học sinh lớp 2 được yêu cầu viết về một hoạt động thủ công mà em yêu thích, từ đó rèn luyện kỹ năng diễn đạt trình tự và mô tả chi tiết. Đây là bước chuẩn bị quan trọng cho các bài tập làm văn miêu tả ở những lớp cao hơn.

Học bài "Nặn đồ chơi" mang lại nhiều lợi ích cho học sinh lớp 2: phát triển kỹ năng diễn đạt, làm phong phú vốn từ và kích thích trí tưởng tượng sáng tạo. Bài học còn truyền cảm hứng để các em yêu thích hoạt động nghệ thuật thủ công — một phương thức học tập gắn với thực hành, giúp các em phát triển toàn diện trong chương trình tiếng việt lớp 2 và các môn học khác.`,
  },
  {
    id: 1170,
    content: `Bài 25 "Sự tích hoa tỉ muội" trong chương trình Tiếng Việt lớp 2 đưa học sinh vào thế giới huyền bí và ấm áp của văn học dân gian Việt Nam. Câu chuyện về nguồn gốc của loài hoa tỉ muội gắn liền với tình cảm thiêng liêng giữa hai chị em gái, để lại trong lòng học sinh lớp 2 những cảm xúc sâu lắng và bài học quý giá về tình thân.

Câu chuyện kể về hai chị em gái rất yêu thương nhau. Chị luôn nhường nhịn và bảo vệ em, em luôn kính trọng và biết ơn chị. Một ngày, hoàn cảnh chia cắt hai chị em, nhưng tình yêu thương của họ không bao giờ phai nhạt. Những giọt nước mắt của tình chị em đã hóa thành những bông hoa tỉ muội — nhỏ nhoi nhưng bền bỉ, luôn nở từng chùm như nhắc nhở về tình cảm gắn bó không thể tách rời.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "tỉ muội", "chị em", "yêu thương", "sự tích", "truyền thuyết". Học sinh lớp 2 được làm quen với thể loại truyện sự tích — một thể loại văn học dân gian đặc sắc của Việt Nam, giải thích nguồn gốc của các sự vật, hiện tượng trong tự nhiên thông qua những câu chuyện cảm động.

Mục tiêu bài tập trong bài 25 bao gồm đọc hiểu truyện dân gian, nhận biết cấu trúc truyện sự tích và luyện kể chuyện sáng tạo. Học sinh lớp 2 được yêu cầu kể lại câu chuyện theo lời kể của mình, chú ý đến diễn biến, nhân vật và bài học rút ra. Bài tập tìm hiểu về các loài hoa và ý nghĩa của chúng giúp học sinh liên hệ bài học với thực tế cuộc sống.

Học bài "Sự tích hoa tỉ muội" mang lại nhiều lợi ích cho học sinh lớp 2: phát triển kỹ năng đọc hiểu văn học dân gian, nuôi dưỡng tình cảm gia đình và bồi đắp lòng yêu văn hóa Việt Nam. Câu chuyện nhắc nhở các em biết yêu thương và trân trọng những người thân trong gia đình, đặc biệt là anh chị em ruột — những người bạn đồng hành trọn đời. Đây là giá trị nhân văn cốt lõi mà chương trình tiếng việt lớp 2 muốn gửi gắm.`,
  },
  {
    id: 1171,
    content: `Bài 26 "Em mang về yêu thương" trong chương trình Tiếng Việt lớp 2 là một bài học ấm áp và đầy ý nghĩa về tình cảm gia đình được thể hiện qua những hành động nhỏ bé hàng ngày. Bài học dạy học sinh lớp 2 rằng yêu thương không nhất thiết phải là những điều to lớn — đôi khi, chính những cử chỉ giản dị nhất lại chứa đựng nhiều tình cảm nhất.

Bài đọc kể về một bạn nhỏ, sau khi học về và biết mẹ đang mệt, đã chủ động giúp mẹ làm việc nhà, rót nước cho mẹ uống và vẽ một bức tranh tặng mẹ. Những hành động tuy nhỏ nhoi nhưng mang lại nụ cười cho mẹ và cả nhà. Qua câu chuyện, học sinh lớp 2 nhận ra rằng mỗi ngày đi học về, các em đều có thể mang theo yêu thương — bằng một lời chào, một cử chỉ quan tâm hay một nụ cười thân thương.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "yêu thương", "quan tâm", "chăm sóc", "hành động", "gia đình". Học sinh được học cách dùng từ bày tỏ tình cảm chân thành và học cách miêu tả hành động thể hiện sự quan tâm. Đây là mảng từ vựng cảm xúc quan trọng, giúp các em giao tiếp và ứng xử tốt hơn trong môi trường gia đình và xã hội.

Mục tiêu bài tập trong bài 26 bao gồm đọc hiểu bài văn tự sự, liên hệ bản thân và luyện viết đoạn văn về gia đình. Học sinh lớp 2 được khuyến khích chia sẻ về những hành động yêu thương mà em đã làm hoặc muốn làm cho gia đình. Đây là loại bài tập kết nối kiến thức tiếng việt với giáo dục kỹ năng sống, rất có giá trị trong chương trình tiếng việt lớp 2 hiện đại.

Học bài "Em mang về yêu thương" mang lại nhiều lợi ích thiết thực: phát triển kỹ năng đọc hiểu, làm phong phú vốn từ về tình cảm và rèn luyện thói quen quan tâm đến người thân. Bài học nhắc nhở học sinh lớp 2 rằng mỗi ngày đến trường là một cơ hội để học và lớn lên, mỗi ngày trở về nhà là một cơ hội để yêu thương và chia sẻ. Đó là thông điệp đẹp đẽ mà tiếng việt lớp 2 muốn gửi đến các em.`,
  },
  {
    id: 1172,
    content: `Bài 27 "Mẹ" trong chương trình Tiếng Việt lớp 2 là một bài thơ xúc động về tình mẫu tử thiêng liêng và sự hi sinh vô bờ bến của người mẹ. Đây là một trong những bài học được yêu thích và trân trọng nhất trong toàn bộ chương trình tiếng việt lớp 2, chạm đến trái tim mỗi học sinh qua những vần thơ giản dị mà sâu sắc.

Bài thơ "Mẹ" khắc họa hình ảnh người mẹ tần tảo, yêu thương con vô điều kiện. Từng câu thơ như một nét vẽ nhẹ nhàng nhưng sắc nét về những hi sinh thầm lặng của mẹ: đêm khuya thức chăm con, sáng sớm dậy lo bữa ăn, ngày nắng ngày mưa vẫn một lòng vì con. Học sinh lớp 2 đọc bài thơ và cảm nhận được tình yêu bao la của mẹ — thứ tình cảm vĩ đại nhất trên đời mà mỗi người được nhận ngay từ khi chào đời.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "tình mẫu tử", "hi sinh", "yêu thương", "tần tảo", "ấm áp". Bài học giúp học sinh mở rộng vốn từ về tình cảm gia đình và học cách dùng ngôn ngữ thơ ca để diễn đạt cảm xúc. Đây cũng là cơ hội để các em làm quen với các biện pháp tu từ như so sánh và ẩn dụ trong thơ.

Mục tiêu bài tập trong bài 27 hướng đến việc đọc thuộc và đọc diễn cảm bài thơ, hiểu nội dung và cảm xúc của bài thơ, đồng thời luyện viết đoạn văn ngắn về mẹ. Học sinh lớp 2 được khuyến khích bày tỏ tình cảm với mẹ qua những câu văn chân thành. Bài học còn tích hợp giáo dục đạo đức, nhắc nhở học sinh biết ơn và hiếu thảo với cha mẹ.

Học bài thơ "Mẹ" mang lại nhiều lợi ích sâu sắc cho học sinh lớp 2: phát triển cảm thụ thơ ca, làm giàu vốn từ cảm xúc và bồi dưỡng tình yêu thương gia đình. Mỗi lần đọc bài thơ, các em như được nhắc nhở hãy trân trọng từng khoảnh khắc bên mẹ, hãy nói lời yêu thương khi còn có thể. Đây là bài học tiếng việt lớp 2 không chỉ dạy ngôn ngữ mà còn dạy cách sống đẹp.`,
  },
  {
    id: 1173,
    content: `Bài 28 "Trò chơi của bố" trong chương trình Tiếng Việt lớp 2 là một bài học ấm lòng về tình cha con qua những trò chơi tuổi thơ đáng nhớ. Bài đọc tái hiện những khoảnh khắc bình dị mà hạnh phúc khi bố cùng chơi với con, tạo nên những kỷ niệm không thể quên trong ký ức của mỗi đứa trẻ.

Bài đọc kể về những trò chơi mà bố thường chơi cùng con: bố làm ngựa cho con cưỡi, bố và con cùng thả diều, bố dạy con bắt cua ngoài đồng. Mỗi trò chơi là một kỷ niệm vàng, mỗi khoảnh khắc bên bố là một bài học về cuộc sống. Học sinh lớp 2 nhận ra rằng người bố không chỉ là trụ cột của gia đình mà còn là người bạn chơi thú vị nhất, người thầy đầu tiên trong cuộc đời mỗi đứa trẻ.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "tình cha con", "kỷ niệm", "trò chơi", "vui vẻ", "gắn bó". Học sinh được mở rộng vốn từ về các hoạt động vui chơi gia đình và học cách diễn đạt tình cảm đối với cha. Đây là những từ ngữ giúp các em giao tiếp và chia sẻ về gia đình một cách phong phú hơn trong cuộc sống hàng ngày.

Mục tiêu bài tập trong bài 28 bao gồm đọc hiểu văn bản, nhận biết các chi tiết quan trọng và luyện kể về một kỷ niệm với bố. Học sinh lớp 2 được khuyến khích chia sẻ những kỷ niệm riêng của mình với bố, qua đó phát triển kỹ năng nói và kể chuyện. Bài tập đặt câu hỏi và trả lời giúp các em rèn luyện kỹ năng đối thoại và lắng nghe.

Học bài "Trò chơi của bố" mang lại nhiều lợi ích quý giá cho học sinh lớp 2: phát triển kỹ năng đọc hiểu, làm giàu vốn từ về gia đình và bồi đắp tình cảm cha con. Bài học nhắc nhở các em trân trọng những khoảnh khắc bên bố — dù cuộc sống bận rộn, dù thời gian bên nhau có thể không nhiều, nhưng những trò chơi, những tiếng cười cùng nhau sẽ mãi là kho báu vô giá trong ký ức. Đây là thông điệp ý nghĩa của bài học tiếng việt lớp 2 này.`,
  },
  {
    id: 1174,
    content: `Bài 29 "Cánh cửa nhớ bà" trong chương trình Tiếng Việt lớp 2 là một bài học đầy cảm xúc về nỗi nhớ và tình cảm bà cháu thiêng liêng. Thông qua hình ảnh cánh cửa — biểu tượng của sự đón chờ và hy vọng — bài đọc chạm đến những góc sâu nhất trong trái tim học sinh lớp 2, khơi dậy những ký ức ấm áp về người bà yêu quý.

Bài đọc kể về một đứa cháu nhỏ nhớ bà qua hình ảnh chiếc cửa quen thuộc. Mỗi khi nhìn thấy cánh cửa ấy, cháu lại nhớ đến bóng dáng bà ngồi chờ ở ngưỡng cửa mỗi buổi chiều khi cháu đi học về, nhớ đến tiếng bà gọi tên cháu ấm áp, nhớ đến bàn tay nhăn nheo nhưng đầy yêu thương của bà. Bài đọc nhẹ nhàng mà day dứt, giúp học sinh lớp 2 hiểu được rằng tình cảm con người có thể được ghi dấu vào những vật thể bình thường nhất.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "nỗi nhớ", "ký ức", "tình bà cháu", "chờ đợi", "yêu thương". Học sinh lớp 2 học được cách dùng hình ảnh cụ thể để diễn tả cảm xúc trừu tượng — một kỹ năng quan trọng trong văn học. Đây cũng là cơ hội để các em làm quen với biện pháp ẩn dụ qua những ví dụ gần gũi với cuộc sống.

Mục tiêu bài tập trong bài 29 bao gồm đọc hiểu bài đọc, nhận biết hình ảnh biểu tượng trong văn bản và luyện viết về người thân yêu của mình. Học sinh lớp 2 được khuyến khích viết những câu văn miêu tả kỷ niệm với bà, sử dụng hình ảnh cụ thể để làm sống động cảm xúc. Đây là bước tiến quan trọng trong kỹ năng viết văn của học sinh.

Học bài "Cánh cửa nhớ bà" mang lại nhiều lợi ích sâu sắc: phát triển cảm thụ văn học, làm giàu vốn từ cảm xúc và nuôi dưỡng tình kính yêu đối với người lớn tuổi trong gia đình. Bài học tiếng việt lớp 2 này nhắc nhở các em hãy dành thời gian bên bà, hãy lắng nghe những câu chuyện của bà trước khi những ký ức ấy chỉ còn lại qua những hình ảnh như cánh cửa đợi chờ.`,
  },
  {
    id: 1175,
    content: `Bài 30 "Thương ông" trong chương trình Tiếng Việt lớp 2 là một bài học cảm động về tình cảm ông cháu và bổn phận chăm sóc, kính trọng người lớn tuổi trong gia đình. Bài học dạy học sinh lớp 2 một trong những giá trị truyền thống quý báu nhất của người Việt Nam: "Kính lão đắc thọ" và lòng hiếu thảo với các bậc trên.

Bài đọc kể về một đứa cháu nhỏ thấy ông đã già yếu, đi lại khó khăn. Thay vì bỏ đi chơi như mọi ngày, cháu quyết định ở nhà giúp ông: rót nước cho ông uống, nhặt báo cho ông đọc, ngồi nghe ông kể chuyện ngày xưa. Những hành động nhỏ bé ấy làm ông vui và khỏe hơn. Học sinh lớp 2 cảm nhận được rằng chăm sóc người lớn tuổi không cần những việc to lớn mà chỉ cần một trái tim quan tâm chân thành.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "thương ông", "chăm sóc", "kính trọng", "tuổi già", "hiếu thảo". Học sinh lớp 2 được mở rộng vốn từ về tình cảm gia đình thế hệ và học cách diễn đạt sự quan tâm, kính trọng đối với người cao tuổi. Đây là những từ ngữ quan trọng trong giáo dục đạo đức và kỹ năng sống.

Mục tiêu bài tập trong bài 30 bao gồm đọc hiểu bài văn, rút ra bài học đạo đức và luyện viết về ông hoặc người cao tuổi trong gia đình. Học sinh lớp 2 được khuyến khích chia sẻ những hành động quan tâm mà em đã làm hoặc muốn làm cho ông. Bài tập đóng vai giúp các em thực hành cách giao tiếp lịch sự và kính trọng với người lớn tuổi.

Học bài "Thương ông" mang lại nhiều lợi ích thiết thực: phát triển kỹ năng đọc hiểu, làm giàu vốn từ về gia đình và giáo dục lòng hiếu thảo. Bài học tiếng việt lớp 2 này nhắc nhở các em rằng ông bà chính là kho tàng kinh nghiệm và yêu thương vô giá — hãy trân trọng từng khoảnh khắc bên ông bà, vì đó là những kỷ niệm đẹp nhất của tuổi thơ và là món quà vô giá mà cuộc đời ban tặng.`,
  },
  {
    id: 1176,
    content: `Bài 31 "Ánh sáng của yêu thương" trong chương trình Tiếng Việt lớp 2 là một bài học sâu sắc về tình cảm gia đình được diễn đạt qua hình ảnh ẩn dụ đẹp đẽ và ý nghĩa. Tình yêu thương được ví như ánh sáng — soi đường, sưởi ấm và mang lại sức mạnh để vượt qua mọi khó khăn trong cuộc sống. Đây là một trong những bài học tiếng việt lớp 2 có chiều sâu cảm xúc và giá trị triết lý nhất.

Bài đọc sử dụng hình ảnh ánh sáng như một ẩn dụ xuyên suốt để nói về tình yêu thương trong gia đình. Tình yêu của cha mẹ như ngọn đèn trong đêm tối, soi đường cho con đi. Tình yêu của ông bà như ánh nắng ban mai, ấm áp và bền bỉ. Tình yêu của anh chị em như những tia sáng nhỏ, cùng nhau tạo nên nguồn sáng rực rỡ. Học sinh lớp 2 được dẫn dắt vào thế giới ngôn ngữ hình tượng, học cách cảm nhận ý nghĩa ẩn dụ trong văn học.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "ánh sáng", "yêu thương", "ẩn dụ", "soi đường", "sưởi ấm". Học sinh lớp 2 lần đầu tiên tiếp cận với biện pháp tu từ ẩn dụ qua những ví dụ gần gũi và dễ hiểu. Đây là bước quan trọng trong hành trình phát triển cảm thụ văn học của các em, đặt nền tảng cho việc học các tác phẩm văn học phức tạp hơn ở những bậc học sau.

Mục tiêu bài tập trong bài 31 bao gồm đọc hiểu bài thơ hoặc bài văn, nhận biết hình ảnh ẩn dụ và luyện viết câu sử dụng hình ảnh so sánh đơn giản. Học sinh lớp 2 được hướng dẫn từng bước để tạo ra những câu văn có hình ảnh sinh động: "Tình yêu của mẹ như... vì...". Đây là bài tập sáng tạo ngôn ngữ thú vị và bổ ích.

Học bài "Ánh sáng của yêu thương" mang lại nhiều lợi ích: phát triển cảm thụ văn học, làm giàu vốn từ ngữ và bồi dưỡng tình yêu gia đình. Bài học tiếng việt lớp 2 này như một ngọn nến nhỏ, thắp sáng trong trái tim mỗi học sinh tình yêu với ngôn ngữ và với những người thân yêu của mình.`,
  },
  {
    id: 1177,
    content: `Bài 32 "Chơi chong chóng" trong chương trình Tiếng Việt lớp 2 khép lại chủ đề với một bài học vui tươi, hồn nhiên về niềm vui tuổi thơ qua trò chơi chong chóng — món đồ chơi dân gian giản dị mà đầy kỳ diệu. Đây là bài học cuối cùng của tập 1, để lại trong lòng học sinh lớp 2 cảm giác nhẹ nhàng, tươi vui và yêu thích môn tiếng Việt.

Bài đọc miêu tả hình ảnh những đứa trẻ cầm chong chóng chạy trong gió, những cánh quạt nhỏ quay tròn không ngừng. Chong chóng quay càng nhanh khi gió thổi càng mạnh, tiếng quay vù vù tạo nên âm thanh vui tai. Những đứa trẻ chạy đùa, tiếng cười vang khắp sân, khuôn mặt hồng hào và đôi mắt sáng ngời hạnh phúc. Học sinh lớp 2 như được sống lại những khoảnh khắc vô lo vô nghĩ của tuổi thơ qua từng câu chữ của bài đọc.

Những từ ngữ trọng tâm trong bài học tiếng việt lớp 2 này bao gồm: "chong chóng", "quay tròn", "cơn gió", "vui chơi", "đồ chơi dân gian". Học sinh lớp 2 học được cách miêu tả chuyển động và âm thanh qua từ ngữ, sử dụng các từ láy sinh động như "vù vù", "tít mù", "vòng vòng" để diễn tả sự quay tròn của chong chóng. Đây là mảng từ vựng gợi cảm giác và chuyển động rất phong phú trong tiếng Việt.

Mục tiêu bài tập trong bài 32 bao gồm đọc diễn cảm bài đọc, viết đoạn văn miêu tả một đồ chơi yêu thích và ôn tập các kiến thức đã học trong chủ đề. Học sinh lớp 2 được tổng kết và củng cố vốn từ về trò chơi và đồ chơi truyền thống. Bài tập sáng tạo khuyến khích các em vẽ và viết về chong chóng hoặc một món đồ chơi dân gian khác mà em biết.

Học bài "Chơi chong chóng" không chỉ giúp học sinh lớp 2 hoàn thiện kỹ năng đọc viết mà còn khép lại chủ đề học tập bằng một nốt nhạc vui tươi. Chiếc chong chóng quay theo gió như biểu tượng của tuổi thơ hồn nhiên, trong sáng — luôn hướng về phía trước, không ngừng quay trong gió cuộc đời. Đây là kết thúc hoàn hảo cho hành trình học tiếng việt lớp 2 tập 1, chuẩn bị cho học sinh bước vào những bài học mới đầy thú vị phía trước.`,
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
