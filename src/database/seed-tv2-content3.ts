import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const LESSONS: { id: number; content: string }[] = [
  {
    id: 1178,
    content: `Bài 1 của Tiếng Việt lớp 2 Tập 2 mang tên "Chuyện bốn mùa" là một trong những bài đọc đặc sắc nhất, sử dụng biện pháp nghệ thuật nhân hóa để khắc họa vẻ đẹp riêng biệt của bốn mùa trong năm. Câu chuyện kể về bốn nàng tiên tượng trưng cho Xuân, Hạ, Thu, Đông đang trò chuyện cùng nhau, mỗi nàng đều tự hào giới thiệu những điều tốt đẹp mà mùa của mình mang lại cho con người và thiên nhiên.

Mùa Xuân xuất hiện với vẻ tươi tắn, rạng rỡ, mang theo hoa lá đâm chồi nảy lộc, bầu trời trong xanh và tiếng chim ca vui vẻ. Xuân đến là lúc vạn vật hồi sinh sau những ngày đông giá lạnh, cây cối bắt đầu ra lộc non mơn mởn, những cánh hoa đào, hoa mai khoe sắc rực rỡ đón chào năm mới. Mùa Hạ nóng bức nhưng lại là mùa của niềm vui trẻ thơ, mùa của tiếng ve kêu râm ran trên những tán cây xanh mát, mùa của những trái cây chín thơm ngọt như xoài, nhãn, vải. Mùa Hạ cũng là mùa học sinh được nghỉ hè, vui chơi thỏa thích.

Mùa Thu dịu dàng, se lạnh với bầu trời cao xanh và những đám mây trắng bồng bềnh. Đây là mùa của lá vàng rơi, của tiết trời mát mẻ dễ chịu, mùa của những buổi sáng sương mù huyền ảo. Mùa Đông lạnh giá nhưng cũng là mùa đặc biệt, khi mọi người quây quần bên nhau trong những ngôi nhà ấm cúng, cùng nhau ăn những bữa cơm nóng hổi.

Thông qua bài học, học sinh tiếng Việt lớp 2 được làm quen với biện pháp nhân hóa — cách biến những hiện tượng thiên nhiên vô tri vô giác thành những nhân vật có cảm xúc, suy nghĩ gần gũi như con người. Bài đọc giúp các em nhận biết đặc điểm nổi bật của từng mùa trong năm, mở rộng vốn từ về thiên nhiên Việt Nam và phát triển khả năng cảm thụ văn học. Qua "Chuyện bốn mùa", các em hiểu rằng mỗi mùa đều có vẻ đẹp và ý nghĩa riêng, thiên nhiên Việt Nam phong phú và đáng trân trọng biết bao. Bài học còn giúp các em biết yêu quý và gìn giữ môi trường thiên nhiên tươi đẹp của đất nước.`,
  },
  {
    id: 1179,
    content: `Bài 2 trong chương trình Tiếng Việt lớp 2 Tập 2 có tên "Mùa nước nổi" đưa các em nhỏ đến với vùng đồng bằng sông Cửu Long — vùng đất đặc trưng của miền Tây Nam Bộ Việt Nam, nơi mỗi năm một lần đón nhận mùa lũ mà người dân nơi đây quen gọi là "mùa nước nổi". Khác với nhiều nơi khác, người dân miền Tây không coi lũ lụt là thiên tai đáng sợ mà đã học cách sống chung và thậm chí trân trọng mùa nước như một phần không thể thiếu của cuộc sống.

Bài đọc miêu tả sinh động cảnh nước dâng tràn khắp ruộng đồng, ngập cả những con đường làng quen thuộc. Thay vì hoang mang, trẻ em trong bài lại hào hứng ra sân bắt cá, bắt tôm cùng người lớn. Những con thuyền nhỏ thay thế xe đạp trở thành phương tiện di chuyển chính. Trẻ em biết bơi từ rất sớm, tự tin vẫy vùng trong làn nước trong veo.

Mùa nước nổi mang theo phù sa màu mỡ bồi đắp cho đồng ruộng, tạo điều kiện thuận lợi cho vụ mùa năm sau bội thu. Cá tôm theo nước về nhiều vô kể, giúp người dân có thêm nguồn thực phẩm phong phú và thu nhập từ đánh bắt thủy sản. Hoa súng, bông điên điển nở vàng rực trên mặt nước tạo nên khung cảnh thơ mộng đặc trưng chỉ có ở vùng đồng bằng sông Cửu Long.

Học sinh tiếng Việt lớp 2 qua bài đọc này được mở rộng hiểu biết về địa lý và văn hóa của một vùng đất quan trọng của Tổ quốc. Các em học được rằng con người có thể thích nghi với thiên nhiên theo những cách sáng tạo và tích cực, biến những điều tưởng chừng là khó khăn thành cơ hội. Từ ngữ trọng tâm trong bài gồm: nước nổi, phù sa, đồng bằng, thích nghi, mùa lũ. Bài học còn khơi dậy lòng tự hào về sự đa dạng văn hóa và phong phú thiên nhiên của Việt Nam, giúp các em thêm yêu quê hương đất nước.`,
  },
  {
    id: 1180,
    content: `"Họa mi hót" là bài 3 trong sách Tiếng Việt lớp 2 Tập 2, một bài đọc đặc sắc ca ngợi tiếng hót tuyệt vời của loài chim họa mi — một trong những loài chim có giọng hót hay nhất trong thế giới tự nhiên. Bài văn được viết với ngôn ngữ trong sáng, giàu hình ảnh và âm thanh, giúp người đọc như thực sự được nghe thấy tiếng hót líu lo, véo von của chim họa mi vang vọng trong khu vườn xanh mát.

Bài đọc mô tả một buổi sáng sớm tươi đẹp, khi ánh nắng ban mai còn chưa chiếu rọi khắp nơi, trong màn sương mờ ảo, chú chim họa mi nhỏ bé đã cất lên tiếng hót ngân nga. Tiếng hót trong trẻo như tiếng suối chảy, như những nốt nhạc của thiên nhiên, lan tỏa khắp không gian, đánh thức cả khu vườn còn đang say giấc. Cây cối như rùng mình tỉnh giấc, những cánh hoa e ấp hé mở đón ngày mới.

Chim họa mi được miêu tả với vẻ ngoài xinh xắn: bộ lông nâu bóng mịn, đôi mắt tròn sáng long lanh, cái mỏ nhỏ khéo léo tạo nên những âm thanh kỳ diệu. Tiếng hót của họa mi không chỉ là âm thanh đơn thuần mà còn là ngôn ngữ của niềm vui, của sự sống, của tình yêu thiên nhiên.

Người nghe tiếng chim hót cảm thấy lòng nhẹ nhàng, tâm hồn thư thái, những lo âu muộn phiền tan biến đi. Tiếng hót như một món quà quý giá mà thiên nhiên ban tặng cho con người mỗi sáng thức dậy.

Qua bài học trong chương trình tiếng Việt lớp 2 này, học sinh được phát triển khả năng cảm thụ âm thanh thiên nhiên, học cách diễn đạt cảm xúc khi tiếp xúc với vẻ đẹp của tự nhiên. Các em được mở rộng vốn từ về các loài chim, về âm thanh thiên nhiên và học cách sử dụng các từ ngữ gợi tả âm thanh, hình ảnh sinh động trong văn viết. Bài học giáo dục tình yêu thiên nhiên, ý thức bảo vệ các loài động vật hoang dã quý giá.`,
  },
  {
    id: 1181,
    content: `Bài 4 "Tết đến rồi" trong sách Tiếng Việt lớp 2 Tập 2 là bài đọc vô cùng gần gũi và thân thương với mọi học sinh Việt Nam, bởi Tết Nguyên Đán là lễ hội lớn nhất và quan trọng nhất trong năm của người Việt. Bài đọc tái hiện không khí náo nức, rộn ràng của những ngày chuẩn bị đón Tết và những khoảnh khắc vui tươi trong ngày đầu năm mới.

Câu chuyện bắt đầu từ những ngày cuối tháng Chạp, khi cả nhà tất bật dọn dẹp, trang hoàng nhà cửa. Mẹ lau chùi bàn ghế sạch bóng, bố treo câu đối đỏ trước cổng, bà gói bánh chưng xanh thơm lừng mùi lá dong. Trẻ em háo hức được mặc quần áo mới, được nhận phong bao lì xì đỏ thắm từ ông bà, cha mẹ và người thân.

Đường phố ngày Tết nhộn nhịp hơn bao giờ hết, người người đi chúc Tết nhau với những nụ cười rạng rỡ và lời chúc tốt lành. Hương thơm của hoa đào, hoa mai quyện với khói hương trầm tạo nên mùi Tết đặc trưng không thể nhầm lẫn. Tiếng pháo hoa đêm giao thừa nổ vang rền làm bầu trời sáng rực, mọi người cùng nhau đếm ngược để chào đón năm mới.

Phong tục đón Tết trong bài phản ánh những nét văn hóa truyền thống đặc sắc của người Việt: tảo mộ, cúng tổ tiên, chúc Tết, lì xì, thăm hỏi họ hàng làng xóm. Những phong tục này không chỉ là nghi lễ mà còn là sợi dây kết nối tình cảm gia đình, cộng đồng, nhắc nhở con cháu luôn nhớ về cội nguồn.

Học sinh tiếng Việt lớp 2 qua bài đọc này được hiểu sâu hơn về ý nghĩa của Tết Nguyên Đán, học được các từ ngữ về phong tục tập quán và không khí lễ hội. Bài học khơi dậy tình yêu đối với văn hóa truyền thống dân tộc, giúp các em trân trọng và gìn giữ những giá trị văn hóa tốt đẹp của cha ông để lại. Đây cũng là cơ hội để các em kể lại những kỷ niệm Tết của gia đình mình bằng ngôn ngữ rõ ràng, mạch lạc.`,
  },
  {
    id: 1182,
    content: `Bài 5 "Giọt nước và biển lớn" trong chương trình Tiếng Việt lớp 2 Tập 2 là một câu chuyện triết lý sâu sắc được kể theo phong cách đơn giản, dễ hiểu dành cho lứa tuổi học sinh lớp 2. Câu chuyện kể về hành trình kỳ diệu của một giọt nước nhỏ bé từ khi sinh ra cho đến khi hòa vào đại dương mênh mông, qua đó gửi gắm bài học ý nghĩa về sức mạnh của sự đoàn kết và đóng góp.

Giọt nước nhỏ xuất hiện từ những đám mây, rơi xuống mặt đất trong một cơn mưa. Ban đầu, giọt nước cảm thấy mình quá nhỏ bé, không có ý nghĩa gì. Nhưng rồi nó bắt đầu hành trình: chảy qua khe đá, len lỏi qua đất cát, tìm đến những dòng suối nhỏ. Dọc đường, những giọt nước gặp nhau, hòa vào nhau, tạo thành những con suối ngày một lớn hơn. Suối chảy ra sông, sông đổ về biển, và cuối cùng giọt nước nhỏ bé ngày nào đã trở thành một phần của đại dương bao la.

Hành trình của giọt nước chính là vòng tuần hoàn của nước trong tự nhiên — một kiến thức khoa học cơ bản được lồng ghép khéo léo vào câu chuyện. Học sinh vừa được học về hiện tượng bay hơi, ngưng tụ, mưa, vừa tiếp thu được bài học đạo đức quý giá: mỗi cá nhân dù nhỏ bé đến đâu cũng có đóng góp quan trọng khi biết hòa chung vào tập thể.

Bài học trong tiếng Việt lớp 2 này đặc biệt ý nghĩa ở chỗ nó dạy trẻ em không nản lòng vì mình còn nhỏ, còn ít kinh nghiệm. Mỗi hành động tốt, mỗi nỗ lực nhỏ đều có giá trị và góp phần tạo nên kết quả lớn lao. Từ ngữ trọng tâm: giọt nước, vòng tuần hoàn, bay hơi, ngưng tụ, đại dương, đoàn kết. Bài đọc giúp học sinh phát triển tư duy hình ảnh, khả năng liên tưởng và rút ra bài học từ những câu chuyện ẩn dụ đơn giản. Đây là nền tảng quan trọng cho việc học văn sau này.`,
  },
  {
    id: 1183,
    content: `"Mùa vàng" là bài 6 trong sách Tiếng Việt lớp 2 Tập 2, một bài đọc đẹp như bức tranh thủy mặc về cánh đồng lúa chín vàng ươm vào mùa gặt — một trong những hình ảnh biểu tượng và thân thương nhất của làng quê Việt Nam. Bài văn được viết bằng ngôn ngữ giàu hình ảnh và cảm xúc, tái hiện sống động vẻ đẹp của nông thôn Việt Nam vào vụ thu hoạch.

Bài đọc mở đầu bằng khung cảnh cánh đồng trải dài tít tắp, những bông lúa vàng óng cúi đầu xuống như đang chào đón con người. Gió nhẹ thổi qua làm những bông lúa dập dờn như những con sóng vàng trên mặt biển. Hương lúa chín thơm ngào ngạt bay xa khắp cánh đồng, quyện vào không khí buổi sáng trong lành, khiến ai đi qua cũng phải dừng chân ngắm nhìn.

Từ sáng sớm, bà con nông dân đã ra đồng với liềm, với gánh. Tiếng nói cười, tiếng hát rộn vang khắp nơi. Những người lớn gặt lúa nhanh thoăn thoắt, bó lúa thành từng bó gọn gàng, trẻ em theo chân cha mẹ ra đồng nhặt những bông lúa rơi vãi. Không khí lao động tập thể tràn ngập niềm vui và sự phấn khởi.

Hình ảnh người nông dân trong bài hiện lên với vẻ đẹp bình dị nhưng đầy tự hào: những bàn tay chai sần vì ruộng vườn, khuôn mặt sạm nắng nhưng luôn nở nụ cười hiền hậu. Họ đã cần cù lao động suốt bao tháng trời, chăm sóc từng cây lúa từ lúc gieo hạt đến khi thu hoạch, để giờ đây được đón nhận thành quả ngọt ngào.

Học sinh tiếng Việt lớp 2 qua bài đọc này được trân trọng công lao của người nông dân, hiểu rằng bát cơm ngon hàng ngày là kết quả của biết bao mồ hôi, công sức. Bài học giáo dục đức tính biết ơn, không lãng phí thức ăn và quý trọng sức lao động. Từ ngữ trọng tâm gồm: mùa gặt, bông lúa, thu hoạch, nông dân, cánh đồng. Đây là bài học quan trọng giúp các em gắn bó với giá trị truyền thống của đất nước nông nghiệp Việt Nam.`,
  },
  {
    id: 1184,
    content: `Bài 7 "Hạt thóc" trong chương trình Tiếng Việt lớp 2 Tập 2 là một câu chuyện độc đáo, kể về hành trình dài và gian nan của một hạt thóc nhỏ bé từ khi được gieo xuống đất đến khi trở thành bát cơm trắng thơm ngon trên mâm cơm của mỗi gia đình Việt Nam. Qua góc nhìn của hạt thóc, bài đọc mang đến cho học sinh sự trân trọng sâu sắc đối với lương thực và người làm ra lương thực.

Câu chuyện bắt đầu khi hạt thóc được người nông dân tuyển chọn kỹ lưỡng, ngâm ủ cho nảy mầm rồi gieo xuống ruộng mạ. Trong lòng đất ẩm, hạt thóc nỗ lực nảy mầm xuyên qua lớp đất để vươn ra ánh sáng. Cây mạ non xanh mơn mởn được nhổ lên và cấy xuống ruộng nước, bắt đầu một hành trình mới.

Suốt những tháng ngày sinh trưởng, cây lúa phải đối mặt với nắng gắt, mưa dầm, sâu bọ phá hoại. Người nông dân ngày ngày ra đồng chăm sóc, bón phân, làm cỏ, phun thuốc bảo vệ. Bàn tay người nông dân in dấu trên từng cây lúa, từng bông thóc. Cuối cùng sau bao vất vả, hạt thóc chín vàng, được thu hoạch, đưa vào kho, xay xát thành gạo trắng và nấu thành bát cơm dẻo thơm.

Điều đặc biệt của bài đọc này trong tiếng Việt lớp 2 là cách kể chuyện từ góc nhìn của hạt thóc — một cách tiếp cận sáng tạo giúp học sinh dễ dàng đặt mình vào vị trí của nhân vật và cảm nhận được từng giai đoạn của hành trình. Học sinh được học về quy trình trồng lúa, từ gieo mạ đến thu hoạch, cũng như hiểu được công sức to lớn mà người nông dân bỏ ra.

Bài học giáo dục ý thức quý trọng lương thực, không lãng phí thức ăn — một đức tính cần thiết mà ông bà ta đã dạy từ bao đời: "Ăn một bát cơm, nhớ người cày ruộng". Từ ngữ trọng tâm: hạt thóc, gieo mạ, cấy lúa, thu hoạch, xay xát. Bài đọc là cầu nối giúp học sinh hiểu và trân trọng hơn công việc lao động sản xuất nông nghiệp, nền tảng của đời sống dân tộc Việt Nam.`,
  },
  {
    id: 1185,
    content: `Bài 8 "Lũy tre" trong sách Tiếng Việt lớp 2 Tập 2 đưa học sinh trở về với hình ảnh quen thuộc và thân thương nhất của làng quê Việt Nam — lũy tre xanh mướt bao quanh mỗi ngôi làng. Từ bao đời nay, tre đã gắn bó mật thiết với cuộc sống người Việt, trở thành biểu tượng văn hóa không thể tách rời của hình ảnh quê hương.

Bài đọc mở đầu bằng hình ảnh con đường làng uốn lượn dưới bóng tre xanh mát. Những bụi tre già đứng sừng sững, lá xanh rì rào trong gió, tạo nên âm thanh thì thầm nhẹ nhàng như tiếng hát ru của đồng quê. Bóng tre đổ xuống con đường đất đỏ, tạo nên những mảng sáng tối đan xen huyền ảo vào những buổi trưa hè nắng gắt.

Lũy tre không chỉ đẹp mà còn có nhiều công dụng thiết thực. Tre bảo vệ làng mạc khỏi gió bão, chống xói mòn đất, tạo bóng mát cho người đi đường. Từ thân tre, người dân làm ra vô số vật dụng: nhà ở, giường chiếu, rổ rá, đũa bát, cần câu, sáo tre. Thậm chí những đọt tre non còn là món ăn ngon trong bữa cơm gia đình.

Trong lịch sử, tre còn là vũ khí đánh giặc của cha ông. Hình ảnh cây tre anh hùng trong truyền thuyết Thánh Gióng nhổ tre đánh đuổi giặc Ân đã trở thành biểu tượng của tinh thần bất khuất của dân tộc Việt Nam. Vì vậy, tre không chỉ là loài cây bình thường mà còn mang ý nghĩa tâm linh, văn hóa sâu sắc.

Học sinh tiếng Việt lớp 2 qua bài đọc này được hiểu thêm về vẻ đẹp và giá trị của lũy tre trong đời sống văn hóa người Việt. Bài học giúp các em trân trọng những hình ảnh quen thuộc của quê hương, biết yêu những điều bình dị nhưng vô cùng quý giá. Từ ngữ trọng tâm: lũy tre, quê hương, bảo vệ, công dụng, biểu tượng. Qua bài học, các em cũng được rèn luyện kỹ năng quan sát và miêu tả cảnh vật xung quanh một cách sinh động và có cảm xúc.`,
  },
  {
    id: 1186,
    content: `Bài 9 "Vẽ chim" trong chương trình Tiếng Việt lớp 2 Tập 2 là một bài đọc thú vị gắn liền với hoạt động học tập quen thuộc của học sinh — giờ học mĩ thuật. Câu chuyện kể về một buổi học vẽ chim đáng nhớ, nơi cô giáo dạy các em cách quan sát tỉ mỉ và vẽ lại những chú chim đáng yêu theo cách riêng của mình.

Buổi học bắt đầu khi cô giáo mang vào lớp một chiếc lồng chim xinh xắn với chú chim vàng anh đang nhảy nhót vui vẻ. Cả lớp ồ lên thích thú, ai cũng muốn được đến gần quan sát. Cô giáo hướng dẫn các em nhìn kỹ từng bộ phận của chú chim: cái đầu tròn nhỏ, đôi mắt đen lánh tinh nghịch, cái mỏ nhọn vàng óng, đôi cánh xòe ra như những mảnh vải tơ, cái đuôi xinh xắn và đôi chân nhỏ bám chắc vào cành.

Khi bắt đầu vẽ, mỗi em có một cách thể hiện riêng. Có em vẽ chim đang bay với đôi cánh dang rộng, có em vẽ chim đang hót với cái mỏ mở ra, có em vẽ chim đang ăn hạt với cái đầu cúi xuống. Dù chưa thật hoàn hảo nhưng bức tranh nào cũng mang dấu ấn sáng tạo đáng yêu của chủ nhân.

Cô giáo đi vòng quanh lớp, khen ngợi từng em, nhẹ nhàng chỉnh sửa và động viên. Cuối buổi, những bức tranh chim nhiều màu sắc được trưng bày trên bảng, tạo thành một vườn chim sinh động khiến ai nhìn cũng phải mỉm cười.

Trong chương trình tiếng Việt lớp 2, bài đọc này không chỉ kể về một giờ học mà còn dạy học sinh kỹ năng quan sát chi tiết — nền tảng quan trọng cho cả học vẽ lẫn học viết văn miêu tả. Khi biết quan sát kỹ lưỡng sự vật, các em sẽ viết được những bài văn sinh động và chân thực hơn. Từ ngữ trọng tâm: quan sát, bộ phận, mô tả, sáng tạo, mĩ thuật. Bài học cũng khuyến khích sự tự tin, không sợ sai khi thể hiện bản thân qua nghệ thuật.`,
  },
  {
    id: 1187,
    content: `Bài 10 "Khủng long" trong sách Tiếng Việt lớp 2 Tập 2 mang đến cho học sinh một chủ đề vô cùng hấp dẫn và kỳ bí — những loài động vật khổng lồ đã tồn tại trên Trái Đất từ hàng trăm triệu năm trước và đã tuyệt chủng từ lâu. Đây là bài đọc mang tính khoa học, kích thích trí tò mò và óc khám phá của trẻ em.

Bài đọc giới thiệu khủng long là những sinh vật khổng lồ sống trong kỷ Jura và Phấn trắng, thống trị Trái Đất suốt hàng triệu năm. Chúng đa dạng về hình dáng và kích thước: có loài to lớn như ngôi nhà ba tầng, có loài nhỏ bằng con gà. Khủng long có hai nhóm chính: khủng long ăn thực vật và khủng long ăn thịt.

Khủng long ăn cỏ như Brachiosaurus có cái cổ dài ngoằng để vươn tới những tán cây cao, ăn lá cây là nguồn thức ăn chủ yếu. Chúng thường đi thành bầy đàn để bảo vệ nhau. Ngược lại, khủng long ăn thịt như Tyrannosaurus rex là những kẻ săn mồi đáng sợ nhất với hàm răng sắc nhọn và cơ thể to lớn. Chúng đi bằng hai chân sau, đôi tay trước nhỏ nhưng cái đuôi dài giúp giữ thăng bằng.

Câu hỏi tại sao khủng long tuyệt chủng vẫn còn là bí ẩn hấp dẫn. Nhiều nhà khoa học cho rằng một thiên thạch khổng lồ đã va vào Trái Đất cách đây 66 triệu năm, gây ra thảm họa môi trường khiến khủng long không thể sống sót. Ngày nay, chúng ta chỉ còn biết đến khủng long qua những hóa thạch được tìm thấy trong lòng đất.

Trong chương trình tiếng Việt lớp 2, bài học về khủng long không chỉ cung cấp kiến thức khoa học thú vị mà còn rèn luyện kỹ năng đọc hiểu văn bản thông tin — một thể loại văn bản quan trọng mà học sinh cần thành thạo. Từ ngữ trọng tâm: khủng long, tuyệt chủng, hóa thạch, thực vật, săn mồi. Bài đọc khơi dậy niềm đam mê khoa học, khuyến khích học sinh đặt câu hỏi và tìm hiểu về thế giới tự nhiên bao la.`,
  },
  {
    id: 1188,
    content: `Bài 11 "Sự tích cây thì là" trong sách Tiếng Việt lớp 2 Tập 2 là một câu chuyện dân gian thú vị giải thích nguồn gốc của cây thì là — một loại rau thơm quen thuộc trong ẩm thực Việt Nam. Đây là bài đọc thuộc thể loại truyền thuyết, giúp học sinh làm quen với một hình thức văn học dân gian đặc sắc của người Việt.

Câu chuyện kể rằng ngày xưa, có một bà tiên sống trên thiên đình chuyên trồng các loại rau thơm để làm thuốc chữa bệnh cho muôn dân. Một ngày, bà phát hiện có một loài cây lạ mọc lên trong vườn với những chiếc lá nhỏ li ti, xanh mướt và tỏa ra hương thơm dịu nhẹ đặc biệt. Bà tiên không biết cây này tên gì, chỉ biết rằng mùi hương của nó vừa thơm vừa có tác dụng làm cho bữa ăn thêm ngon miệng.

Khi bà đem cây xuống cho người dân dưới trần gian, mọi người đều thích thú vì mùi thơm của nó. Họ bắt đầu trồng trong vườn nhà, thêm vào các món ăn, đặc biệt là cháo, canh và các món cá. Tên gọi "thì là" được người dân đặt cho loài cây này vì khi họ hỏi nhau "Cây gì đây?", người ta chỉ đáp "Thì là..." rồi dừng lại vì không biết tên chính xác, và từ đó cái tên ấy gắn liền với loài cây thơm tuyệt vời này.

Dù câu chuyện mang tính dân gian, ẩn chứa trong đó là sự quan sát tinh tế và óc sáng tạo của nhân dân lao động trong việc giải thích những điều kỳ diệu xung quanh cuộc sống hàng ngày.

Trong chương trình tiếng Việt lớp 2, bài học về sự tích cây thì là giúp học sinh hiểu đặc điểm của thể loại truyền thuyết: có yếu tố kỳ ảo, giải thích nguồn gốc sự vật, thể hiện trí tưởng tượng phong phú. Từ ngữ trọng tâm: sự tích, truyền thuyết, nguồn gốc, dân gian, hương thơm. Bài đọc còn giới thiệu về một nét văn hóa ẩm thực đặc trưng của người Việt — việc dùng rau thơm trong chế biến thức ăn, phản ánh sự phong phú và tinh tế của ẩm thực dân tộc.`,
  },
  {
    id: 1189,
    content: `"Bờ tre đón khách" là bài 12 trong sách Tiếng Việt lớp 2 Tập 2, một bài đọc đậm chất trữ tình về hình ảnh những bụi tre xanh mát đứng bên đầu làng như những người bạn hiền hậu, luôn sẵn lòng che mát và đón chào những người khách từ xa trở về. Bài đọc là sự hòa quyện giữa hình ảnh thiên nhiên đẹp đẽ và tình cảm con người nồng ấm.

Câu chuyện kể về một buổi chiều tà, một người con trở về thăm quê sau nhiều năm xa cách. Khi con đường làng hiện ra trước mắt, điều đầu tiên người ấy nhận ra chính là hàng tre xanh rì rào trong gió chiều. Những cây tre già đứng thẳng hiên ngang, tán lá xòe rộng như đôi bàn tay xanh mát đang vươn ra đón chào người con xa trở về. Bóng tre đổ dài trên con đường đất quen thuộc, tiếng lá tre xào xạc như tiếng thì thầm chào đón.

Trong văn hóa Việt Nam, lũy tre không chỉ là ranh giới tự nhiên của làng mà còn là biểu tượng của lòng hiếu khách — một truyền thống đẹp của người Việt. Dù nghèo khó đến đâu, người làng quê vẫn luôn mở rộng cửa đón khách, dọn mâm cơm đạm bạc nhưng ấm áp tình người. Bờ tre là nhân chứng của biết bao cuộc tiễn đưa và đón tiếp, biết bao câu chuyện của những con người qua lại.

Bài đọc sử dụng nghệ thuật nhân hóa một cách tinh tế: những cây tre được miêu tả như có tâm hồn, biết rung động trước sự trở về của người thân. Qua đó, bài học giúp học sinh thấy rằng thiên nhiên và con người có mối gắn kết sâu sắc, thiên nhiên quê hương cũng mang trong mình tâm tình của người Việt.

Học sinh tiếng Việt lớp 2 qua bài đọc này được bồi dưỡng tình yêu quê hương, hiểu được nét đẹp văn hóa hiếu khách của người Việt Nam. Từ ngữ trọng tâm: bờ tre, hiếu khách, quê hương, đón chào, trở về. Bài học cũng rèn luyện kỹ năng đọc cảm thụ, giúp học sinh nhận ra vẻ đẹp ẩn sau những hình ảnh quen thuộc của cuộc sống hàng ngày.`,
  },
  {
    id: 1190,
    content: `Bài 13 "Tiếng chổi tre" trong chương trình Tiếng Việt lớp 2 Tập 2 là một bài thơ và bài đọc đặc sắc, khắc họa hình ảnh những người lao công cần mẫn quét đường trong buổi sáng sớm còn tối mịt, khi mọi người vẫn đang say giấc. Đây là một trong những bài học cảm động nhất về lòng biết ơn đối với những người lao động thầm lặng.

Bài đọc mở đầu bằng khung cảnh đêm khuya yên tĩnh, thành phố chìm vào giấc ngủ. Nhưng trong màn đêm đó, có những bước chân lặng thầm di chuyển trên phố vắng, có những cánh tay mệt mỏi nhưng không ngừng quét những nhát chổi đều đặn. Tiếng chổi tre kêu xoèn xoẹt trên mặt đường nhựa, tiếng duy nhất vang lên trong cái tĩnh mịch của đêm khuya.

Người lao công trong bài được miêu tả với vẻ đẹp bình dị nhưng đáng kính: mặc áo xanh bảo hộ, đội nón lá, tay cầm chiếc chổi tre dài. Dù trời lạnh buốt hay nóng nực, dù mưa hay nắng, người lao công vẫn có mặt đúng giờ, lặng lẽ làm công việc của mình mà không cần ai biết đến. Nhờ bàn tay cần mẫn của họ, mỗi buổi sáng khi người dân bước ra đường, họ được đi trên những con phố sạch sẽ, tươi mát.

Bài đọc đặt ra câu hỏi nhẹ nhàng mà sâu sắc: chúng ta đã bao giờ để ý đến tiếng chổi tre trong đêm khuya chưa? Đã bao giờ nhìn thấy người lao công đang làm việc và nói một lời cảm ơn chưa? Biết bao nhiêu người lao động thầm lặng đang đóng góp cho cuộc sống của chúng ta mà chúng ta chưa kịp nhận ra.

Trong chương trình tiếng Việt lớp 2, bài học này giáo dục học sinh lòng biết ơn và sự trân trọng đối với những người lao động, đặc biệt là những người làm công việc không mấy ai chú ý đến. Từ ngữ trọng tâm: lao công, cần mẫn, thầm lặng, biết ơn, trân trọng. Bài học định hướng giá trị sống quan trọng: biết ơn những người đã tạo ra môi trường sống tốt đẹp cho chúng ta.`,
  },
  {
    id: 1191,
    content: `Bài 14 "Cỏ non cười rồi" trong sách Tiếng Việt lớp 2 Tập 2 là một bài đọc tươi vui và đầy màu sắc về mùa xuân — mùa của sự hồi sinh và đâm chồi nảy lộc. Với nghệ thuật nhân hóa tinh tế, bài văn biến những đám cỏ non xanh mướt thành những nhân vật đáng yêu đang reo vui chào đón mùa xuân đến.

Câu chuyện mở đầu bằng hình ảnh mùa đông vừa đi qua, để lại trên mặt đất những vùng cỏ vàng úa trơ trọi. Nhưng rồi từ trong lòng đất, những mầm cỏ non bắt đầu cựa mình, khẽ vươn những chồi xanh mơn mởn ra ngoài. Mưa xuân lất phất xuống, như những ngón tay nhẹ nhàng của mẹ thiên nhiên vuốt ve và đánh thức đám cỏ dậy. Ánh nắng ấm áp chiếu xuống, cỏ non cười, hay nói đúng hơn là rung rinh trong gió như những nụ cười toả sáng.

Bài đọc miêu tả cỏ non như những đứa trẻ hiếu động, vui vẻ: cỏ xanh mơn mởn chạy dài theo triền đồi, cỏ len lỏi qua khe đá, cỏ mọc thành thảm xanh mịn màng trên những bờ sông. Đám cỏ non như đang hát, đang nhảy múa trong làn gió xuân mát dịu. Những chú bướm xuân cũng bay về đậu trên những ngọn cỏ xanh rung rinh.

Nghệ thuật nhân hóa trong bài — "cỏ non cười rồi" — là điểm nhấn đặc sắc nhất. Bài học dạy học sinh thấy rằng thiên nhiên cũng có cảm xúc, cũng vui buồn như con người, và chúng ta cần trân trọng, yêu quý thiên nhiên như những người bạn.

Học sinh tiếng Việt lớp 2 qua bài đọc này được mở rộng vốn từ về mùa xuân và thiên nhiên, được học cách sử dụng nghệ thuật nhân hóa trong miêu tả. Từ ngữ trọng tâm: cỏ non, mùa xuân, nhân hóa, hồi sinh, xanh mướt. Bài học khuyến khích học sinh quan sát sự thay đổi của thiên nhiên theo mùa, phát triển tình yêu và ý thức bảo vệ môi trường xanh xung quanh cuộc sống hàng ngày của các em.`,
  },
  {
    id: 1192,
    content: `Bài 15 "Những con sao biển" trong chương trình Tiếng Việt lớp 2 Tập 2 là câu chuyện cảm động và giàu ý nghĩa về một người đàn ông già mỗi sáng đi dọc bãi biển, nhặt từng con sao biển bị sóng đánh dạt lên bờ rồi ném chúng trở lại biển để cứu sống chúng. Đây là câu chuyện nổi tiếng được yêu thích trên toàn thế giới và mang thông điệp nhân văn sâu sắc.

Buổi sáng sớm trên bãi biển, sau một đêm sóng to gió lớn, hàng nghìn con sao biển bị sóng cuốn lên bờ nằm phơi mình trên cát, chờ chết dưới ánh nắng mặt trời. Một người đàn ông già chậm rãi đi dọc bờ biển, cúi xuống nhặt từng con sao biển một, rồi ném mạnh xuống biển. Một người trẻ đi qua, thấy vậy hỏi: "Bãi biển dài vô tận, có hàng nghìn con sao biển, ông làm sao cứu được hết? Việc ông làm có ý nghĩa gì không?" Người đàn ông nhặt thêm một con sao biển, ném ra biển và mỉm cười: "Với con sao biển này thì có ý nghĩa."

Câu trả lời ngắn gọn nhưng vô cùng sâu sắc đó đã chạm đến trái tim của người trẻ và cả những ai đọc câu chuyện này. Không phải lúc nào chúng ta cũng có thể thay đổi tất cả, giúp đỡ tất cả mọi người. Nhưng nếu mỗi người cố gắng làm điều tốt cho dù chỉ một người, một sinh linh nào đó, thì hành động đó đã có ý nghĩa to lớn.

Trong chương trình tiếng Việt lớp 2, bài học này truyền cho học sinh thông điệp rất quan trọng: đừng nản lòng khi thấy vấn đề quá lớn, quá nhiều. Hãy bắt đầu từ những điều nhỏ bé nhất trong tầm tay của mình. Mỗi hành động tốt, dù nhỏ, đều có giá trị và đều tạo ra sự khác biệt cho ai đó. Từ ngữ trọng tâm: sao biển, ý nghĩa, hành động, giúp đỡ, từng bước nhỏ. Bài học bồi dưỡng tâm hồn nhân ái, tinh thần trách nhiệm với cộng đồng và tình yêu thương đối với mọi sinh linh trong tự nhiên.`,
  },
  {
    id: 1193,
    content: `Bài 16 "Tạm biệt cánh cam" là bài cuối cùng trong phần Chủ đề 2 của sách Tiếng Việt lớp 2 Tập 2, một bài đọc đầy xúc cảm về khoảnh khắc chia tay con cánh cam nhỏ khi mùa thay đổi. Qua câu chuyện nhỏ xinh này, bài học khéo léo lồng ghép ý thức bảo vệ thiên nhiên và tình yêu đối với các loài sinh vật nhỏ bé.

Con cánh cam — loài bọ cánh cứng màu xanh óng ánh như ngọc bích — là hình ảnh quen thuộc gắn với tuổi thơ của nhiều thế hệ trẻ em Việt Nam. Câu chuyện kể về một bé gái đã nuôi con cánh cam cả một mùa hè, hàng ngày quan sát nó bay lượn trong vườn, đậu trên những bông hoa, giỡn với những giọt sương mai. Bé thích ngắm đôi cánh xanh óng ánh của cánh cam khi nó xòe ra dưới ánh nắng — đẹp như những viên đá quý nhỏ.

Khi mùa thu đến, không khí se lạnh, những chiếc lá bắt đầu vàng úa và rơi rụng. Con cánh cam cũng bắt đầu ít xuất hiện hơn, rồi một ngày bé không thấy nó đâu nữa. Bé bùi ngùi nhìn khu vườn trống vắng, lòng chộn rộn một nỗi nhớ khó nói thành lời. Nhưng bé hiểu rằng cánh cam đã đi theo tiếng gọi của thiên nhiên, nó cần có cuộc sống tự do của mình.

Bài đọc nhẹ nhàng dạy trẻ một bài học quan trọng: yêu thiên nhiên không có nghĩa là giữ chặt lấy nó. Yêu thiên nhiên là tôn trọng quy luật tự nhiên, để cho các sinh linh tự do sống theo bản năng của chúng. Bắt con cánh cam nhốt trong lọ thủy tinh không phải là tình yêu — đó là giam cầm.

Trong chương trình tiếng Việt lớp 2, bài học này kết thúc Tập 2 với một thông điệp ý nghĩa về môi trường và lối sống hài hòa với thiên nhiên. Từ ngữ trọng tâm: cánh cam, tạm biệt, thiên nhiên, tự do, bảo vệ. Bài đọc giúp học sinh nhận thức được trách nhiệm bảo vệ các loài sinh vật nhỏ bé, hiểu rằng mỗi con vật đều có vai trò trong hệ sinh thái và xứng đáng được sống tự do trong môi trường tự nhiên của chúng.`,
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
