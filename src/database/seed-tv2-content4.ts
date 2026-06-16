import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const LESSONS: { id: number; content: string }[] = [
  {
    id: 1194,
    content: `Bài 17 trong chương trình tiếng việt lớp 2 mang tên "Những cách chào độc đáo" sẽ đưa các em nhỏ đến với một hành trình khám phá vô cùng thú vị về văn hóa chào hỏi của các dân tộc trên khắp thế giới. Mỗi nền văn hóa đều có những cách chào hỏi riêng biệt, thể hiện bản sắc và giá trị của dân tộc mình.

Ở Nhật Bản, người ta cúi đầu chào nhau như một cách bày tỏ sự kính trọng. Cúi đầu càng thấp thể hiện sự tôn kính càng cao. Ở Thái Lan, người ta chắp tay trước ngực và cúi đầu nhẹ, gọi là "wai". Còn ở một số bộ lạc châu Phi, người ta chào nhau bằng cách chạm mũi vào nhau, gọi là chào "hongi". Thật kỳ lạ và thú vị phải không nào?

Trong khi đó, người Tây Ban Nha và người Pháp thường chào nhau bằng cách hôn má. Người Maori ở New Zealand chào nhau bằng cách chạm trán và mũi vào nhau, gọi là "hongi", biểu tượng cho sự chia sẻ hơi thở của sự sống. Người Mỹ và nhiều nước phương Tây thì bắt tay hoặc ôm nhau thân mật.

Còn ở Việt Nam, chúng ta cũng có nhiều cách chào hỏi tùy theo đối tượng và hoàn cảnh. Với người lớn tuổi, chúng ta khoanh tay cúi đầu và nói "Con chào ông/bà/bố/mẹ ạ". Với bạn bè cùng trang lứa, chúng ta có thể vẫy tay hoặc gật đầu chào nhau.

Qua bài học trong chương trình tiếng việt lớp 2 này, các em hiểu được rằng dù cách chào hỏi có khác nhau đến đâu, tất cả đều chứa đựng một ý nghĩa chung là sự tôn trọng và thân thiện. Biết tôn trọng sự khác biệt trong văn hóa của các dân tộc là một đức tính quý báu mà mỗi chúng ta cần rèn luyện từ khi còn nhỏ.

Từ ngữ trọng tâm trong bài gồm: chào hỏi, văn hóa, tôn trọng, đa dạng, bản sắc, dân tộc. Sau khi học bài này, các em biết cách chào hỏi lịch sự, đồng thời hiểu và tôn trọng sự khác biệt văn hóa giữa các quốc gia trên thế giới.`,
  },
  {
    id: 1195,
    content: `Bài 18 trong chương trình tiếng việt lớp 2 có tựa đề "Thư viện biết đi" — một câu chuyện cảm động về những chiếc xe thư viện lưu động mang sách đến tận tay những em nhỏ ở vùng sâu, vùng xa còn nhiều khó khăn. Đây là một trong những bài học ý nghĩa nhất về tình yêu sách và khát vọng tri thức.

Ở những vùng núi xa xôi, nhiều em nhỏ không có điều kiện đến thư viện hay hiệu sách. Nhưng nhờ có những chiếc xe thư viện lưu động, sách đã tìm đến với các em. Mỗi tuần một lần hoặc hai tuần một lần, chiếc xe đặc biệt này lại lăn bánh qua các bản làng, mang theo hàng trăm cuốn sách đủ thể loại: truyện tranh, truyện cổ tích, sách khoa học, sách tô màu...

Những người lái xe thư viện lưu động không chỉ là tài xế mà còn là những người bạn của sách. Họ nhiệt tình hướng dẫn các em chọn sách, đọc sách và trả lời những câu hỏi thú vị từ các bạn nhỏ ham học. Mỗi lần xe đến, bọn trẻ chạy ra đón vui mừng như đón một người bạn thân lâu ngày mới gặp.

Sách mở ra cả một thế giới diệu kỳ trước mắt các em. Qua trang sách, các em được du lịch đến những vùng đất xa xôi, gặp gỡ những nhân vật thú vị và học được bao điều bổ ích. Một cậu bé ở bản vùng cao từng nói: "Nhờ có sách, em biết biển cả trông như thế nào dù em chưa bao giờ được nhìn thấy biển".

Trong tiếng việt lớp 2, bài học này dạy các em hiểu giá trị to lớn của sách và việc đọc sách. Sách là người thầy, người bạn đồng hành suốt cuộc đời mỗi người. Dù ở đâu, dù hoàn cảnh như thế nào, nếu có sách, chúng ta luôn có thể học hỏi và vươn lên.

Từ ngữ trọng tâm: thư viện, lưu động, vùng sâu vùng xa, tri thức, ham học, tình yêu sách. Mục tiêu bài học giúp các em biết yêu quý sách, có ý thức đọc sách hàng ngày và biết giữ gìn sách cẩn thận.`,
  },
  {
    id: 1196,
    content: `Bài 19 "Cảm ơn anh hà mã" trong chương trình tiếng việt lớp 2 là một câu chuyện dễ thương và đầy ý nghĩa về lòng biết ơn. Câu chuyện xoay quanh chú hà mã tốt bụng và những người bạn trong khu rừng, qua đó truyền dạy cho các em bài học quý giá về việc biết nói lời cảm ơn và giúp đỡ lẫn nhau.

Trong một khu rừng nhiệt đới xanh tươi, hà mã là con vật to lớn nhất sống gần bờ sông. Một ngày, có cơn mưa to bất ngờ làm nước sông dâng cao, cuốn trôi nhiều thứ. Chú thỏ nhỏ bị mắc kẹt trên một hòn đá giữa dòng nước chảy xiết, không biết làm sao để vào bờ. Anh hà mã thấy vậy liền lội ra, để thỏ trèo lên lưng mình rồi đưa thỏ vào bờ an toàn.

Thỏ vui mừng, nói ngay: "Cảm ơn anh hà mã rất nhiều! Nếu không có anh, em không biết phải làm sao!". Anh hà mã cười hiền lành đáp: "Không có gì đâu em! Thấy em cần giúp thì anh giúp thôi. Em cũng hãy nhớ giúp đỡ các bạn khác khi có dịp nhé!".

Từ đó, thỏ luôn ghi nhớ lời anh hà mã. Khi thấy bạn chim bị gãy cánh, thỏ mang lá thuốc đến chữa vết thương. Khi thấy sóc nhỏ không với được quả hạt trên cành cao, thỏ giúp lấy xuống. Và mỗi lần như vậy, thỏ đều nói: "Cảm ơn anh hà mã đã dạy em bài học này."

Trong tiếng việt lớp 2, bài học "Cảm ơn anh hà mã" giúp các em hiểu rằng lòng biết ơn không chỉ là nói lời cảm ơn mà còn thể hiện qua hành động giúp đỡ người khác. Khi ai đó giúp đỡ chúng ta, hãy nói lời cảm ơn chân thành và tìm cách đáp lại bằng những hành động tốt đẹp.

Từ ngữ trọng tâm: lòng biết ơn, giúp đỡ, cảm ơn, chân thành, tình bạn, sẻ chia. Sau bài học này, các em biết nói lời cảm ơn đúng lúc, đúng chỗ và biết đền đáp lòng tốt của người khác bằng những việc làm có ý nghĩa.`,
  },
  {
    id: 1197,
    content: `Bài 20 trong tiếng việt lớp 2 có tên "Từ chú bồ câu đến in-tơ-nét" đưa các em vào một hành trình khám phá lịch sử truyền tin đầy hấp dẫn, từ những phương tiện thô sơ thời xưa đến công nghệ hiện đại ngày nay. Đây là bài học kết hợp giữa lịch sử và khoa học công nghệ thật thú vị.

Từ hàng ngàn năm trước, con người đã nghĩ ra nhiều cách để truyền tin cho nhau khi ở xa. Một trong những cách sớm nhất là dùng bồ câu đưa thư. Chim bồ câu có khả năng kỳ diệu là luôn tìm được đường về tổ dù đi xa đến đâu. Người ta gắn thư vào chân bồ câu rồi thả ra, chim sẽ tự bay về đưa thư. Trong thời chiến, bồ câu đưa thư đã góp phần truyền đi nhiều tin tức quan trọng cứu sống hàng ngàn người.

Sau đó, con người phát minh ra điện báo — máy có thể truyền tín hiệu qua dây điện bằng các ký hiệu chấm và gạch gọi là mã Morse. Tiếp theo là điện thoại, cho phép con người nói chuyện trực tiếp với nhau dù cách xa hàng nghìn cây số. Rồi fax, rồi email...

Và ngày nay, internet đã thay đổi hoàn toàn cách con người giao tiếp. Chỉ cần một chiếc điện thoại thông minh, chúng ta có thể gửi tin nhắn, gọi video, chia sẻ hình ảnh cho bạn bè ở khắp nơi trên thế giới chỉ trong vài giây. Thông tin di chuyển với tốc độ ánh sáng qua các sợi cáp quang và vệ tinh trên không trung.

Học tiếng việt lớp 2 qua bài này, các em thấy rõ sự tiến bộ vượt bậc của loài người. Từ chú bồ câu nhỏ bé cho đến mạng internet toàn cầu, mỗi phát minh đều là thành quả của trí tuệ và nỗ lực không ngừng nghỉ của con người. Chúng ta cần trân trọng những thành tựu đó và dùng công nghệ một cách có ích.

Từ ngữ trọng tâm: truyền tin, bồ câu đưa thư, điện báo, internet, công nghệ, phát minh. Mục tiêu bài học giúp các em hiểu lịch sử phát triển thông tin liên lạc và biết sử dụng công nghệ một cách thông minh, có trách nhiệm.`,
  },
  {
    id: 1198,
    content: `Bài 21 "Mai An Tiêm" trong chương trình tiếng việt lớp 2 kể lại truyền thuyết về người anh hùng Mai An Tiêm và nguồn gốc của quả dưa hấu — loại quả quen thuộc mà chúng ta thưởng thức mỗi ngày. Đây là câu chuyện đẹp về nghị lực phi thường và tinh thần tự lực cánh sinh của người Việt.

Ngày xưa, có một người tên là Mai An Tiêm rất được vua Hùng yêu quý. Nhưng vì bị kẻ xấu gièm pha, vua Hùng nổi giận đày Mai An Tiêm cùng vợ con ra một hòn đảo hoang giữa biển khơi, không mang theo lương thực, không ai được tiếp tế.

Trên đảo hoang, cuộc sống vô cùng khắc nghiệt. Vợ Mai An Tiêm lo sợ, khóc lóc. Nhưng ông vẫn bình tĩnh, vững tin và nói: "Trời sinh voi, trời sinh cỏ. Đất này không thể không có thức ăn". Ông không nản lòng mà quyết tâm khai phá đảo hoang, tìm kiếm thức ăn và xây dựng cuộc sống mới.

Một ngày, có đàn chim lạ bay đến, tha theo những hạt giống và đánh rơi xuống đất. Từ những hạt giống đó, mọc lên những dây leo xanh tốt với những quả to, vỏ xanh, ruột đỏ ngọt lịm. Đó chính là dưa hấu! Mai An Tiêm trồng thêm dưa, còn khắc tên mình lên quả rồi thả ra biển, hi vọng có người tìm thấy.

Quả dưa trôi dạt đến đất liền, người ta ăn thấy ngon lạ và biết được xuất xứ từ đảo của Mai An Tiêm. Tiếng lành đồn xa, cuối cùng vua Hùng biết được và cho đón gia đình ông về, phục hồi tước vị và khen ngợi nghị lực phi thường của ông.

Trong tiếng việt lớp 2, truyện Mai An Tiêm dạy các em bài học sâu sắc: dù gặp hoàn cảnh khó khăn đến đâu, nếu không nản lòng, biết cố gắng và tự lực thì nhất định sẽ vượt qua. Nghị lực và niềm tin chính là chìa khóa của thành công.

Từ ngữ trọng tâm: nghị lực, tự lực cánh sinh, vượt khó, tin tưởng, dưa hấu, truyền thuyết. Sau bài học này, các em biết ý nghĩa của quả dưa hấu trong văn hóa Việt Nam và học được đức tính kiên trì, không bỏ cuộc trước khó khăn.`,
  },
  {
    id: 1199,
    content: `Bài 22 "Thư gửi bố ngoài đảo" trong chương trình tiếng việt lớp 2 là một bức thư xúc động của em bé gửi cho người bố đang công tác ngoài đảo xa. Bài học không chỉ dạy cách viết thư mà còn chạm đến những tình cảm sâu sắc về tình cha con và lòng yêu nước thiêng liêng.

Bố ơi! Con nhớ bố lắm. Hôm nay mẹ dạy con viết thư gửi cho bố. Con muốn kể cho bố nghe nhiều chuyện lắm. Ở nhà, con và mẹ vẫn khỏe. Con đã lên lớp 2 rồi, đang học tiếng việt lớp 2 và toán. Cô giáo khen con đọc bài rất to và rõ ràng. Con cũng đã biết viết nhiều chữ đẹp hơn rồi bố ạ.

Tối qua, mẹ chỉ con nhìn lên bầu trời, nói rằng bố đang ở ngoài đảo cũng nhìn thấy bầu trời và những vì sao giống như con đang nhìn. Con thích điều đó lắm, vì dù bố ở xa nhưng chúng ta vẫn cùng nhìn một bầu trời. Con tìm mãi mới thấy ngôi sao sáng nhất và con nghĩ đó là ngôi sao của bố.

Bạn Nam ở lớp con kể rằng bố bạn ấy cũng là bộ đội biển, đang canh giữ đảo Trường Sa. Cô giáo giải thích cho cả lớp hiểu: các chú bộ đội đang ngày đêm bảo vệ vùng biển và hải đảo của Tổ quốc. Nhờ có các chú, ngư dân mới yên tâm ra biển đánh cá và đất nước mình mới bình yên. Con tự hào về bố lắm!

Con hứa với bố sẽ học thật giỏi, ngoan ngoãn và giúp mẹ việc nhà. Con sẽ ăn nhiều cơm để cao lớn, khỏe mạnh chờ bố về. Bố nhớ giữ gìn sức khỏe, đừng để bị ốm nhé. Mẹ nói biển ngoài đó nhiều gió lắm, bố phải mặc ấm.

Bài học trong tiếng việt lớp 2 này giúp các em hiểu về tình cảm gia đình ấm áp và lòng biết ơn những người đang làm nhiệm vụ bảo vệ đất nước nơi đầu sóng ngọn gió. Yêu gia đình và yêu Tổ quốc là hai tình cảm luôn gắn bó, bổ sung cho nhau trong tâm hồn mỗi người Việt Nam.

Từ ngữ trọng tâm: tình cha con, công tác, hải đảo, bảo vệ Tổ quốc, lòng yêu nước, bức thư.`,
  },
  {
    id: 1200,
    content: `Bài 23 "Bóp nát quả cam" trong tiếng việt lớp 2 kể về câu chuyện lịch sử nổi tiếng của thiếu niên anh hùng Trần Quốc Toản — người đã bóp nát quả cam vì sục sôi lòng yêu nước khi không được tham gia hội nghị Bình Than bàn việc đánh giặc giữ nước.

Vào thời nhà Trần, giặc Nguyên Mông hung hãn xâm lược nước ta. Vua Trần triệu tập hội nghị Bình Than, mời các vương hầu và tướng lĩnh về bàn kế sách chống giặc. Trần Quốc Toản khi đó mới 16 tuổi, lòng đầy hào khí muốn được tham gia cứu nước. Cậu chèo thuyền ra giữa sông xin vào dự hội nghị nhưng vì còn nhỏ tuổi, lính canh không cho vào.

Không chịu được nỗi uất ức, Trần Quốc Toản quyết xông thẳng vào nơi họp. Quân lính giữ lại, Quốc Toản vẫn cố lách vào. Hành động táo bạo đó khiến cậu bị đưa ra trước mặt nhà vua. Vua Trần không phạt mà còn cảm kích trước tinh thần yêu nước của cậu bé, ban cho Quốc Toản một quả cam quý.

Nhận được cam, nhưng lòng Trần Quốc Toản vẫn sục sôi vì chưa được bàn việc nước. Cậu nắm chặt quả cam trong tay, miên man nghĩ đến cảnh giặc tàn phá quê hương, đến nỗi nhục mất nước. Khi nhìn lại, quả cam đã bị bóp nát từ lúc nào mà cậu không hay.

Sau hội nghị, Trần Quốc Toản tự mình chiêu mộ quân, tập luyện binh mã và treo lá cờ thêu sáu chữ vàng "Phá cường địch, báo hoàng ân". Đội quân nhỏ của cậu lập được nhiều chiến công hiển hách trong cuộc kháng chiến chống Nguyên Mông.

Trong chương trình tiếng việt lớp 2, câu chuyện về Trần Quốc Toản là tấm gương sáng về lòng yêu nước nồng nàn và tinh thần dũng cảm của tuổi trẻ. Dù còn nhỏ tuổi, chúng ta vẫn có thể đóng góp cho đất nước bằng cách học tập chăm chỉ và rèn luyện đạo đức tốt.

Từ ngữ trọng tâm: yêu nước, anh hùng, dũng cảm, chống giặc, hội nghị Bình Than, Trần Quốc Toản.`,
  },
  {
    id: 1201,
    content: `Bài 24 "Chiếc rễ đa tròn" trong chương trình tiếng việt lớp 2 là câu chuyện cảm động về tình yêu thiên nhiên và đức tính giản dị của Bác Hồ — vị lãnh tụ kính yêu của dân tộc Việt Nam. Câu chuyện nhỏ nhưng chứa đựng bài học lớn về cách sống hòa hợp với thiên nhiên.

Trong vườn Phủ Chủ tịch ở Hà Nội, có một cây đa cổ thụ tỏa bóng xanh mát. Một ngày, chú bảo vệ định cắt bỏ một chiếc rễ phụ dài đang thõng xuống đất, vì thấy nó không đẹp và có vẻ thừa thãi. Bác Hồ đi ngang qua, thấy vậy liền hỏi chú bảo vệ định làm gì.

Khi nghe chú bảo vệ giải thích, Bác nhẹ nhàng nói: "Chú đừng chặt. Hãy uốn nó thành vòng tròn cho đẹp." Bác còn tự mình hướng dẫn cách uốn chiếc rễ thành hình tròn rồi buộc cẩn thận. Chiếc rễ đa từ đó trở thành một vật trang trí độc đáo, đẹp một cách tự nhiên và thú vị.

Bác Hồ luôn yêu quý mọi sinh vật, kể cả những chiếc rễ cây bé nhỏ. Bác không muốn bất cứ điều gì bị lãng phí hay bị hủy hoại một cách không cần thiết. Với Bác, thiên nhiên là người bạn cần được trân trọng và gìn giữ.

Câu chuyện còn cho thấy đức tính giản dị của Bác Hồ. Dù là người đứng đầu đất nước, Bác vẫn quan tâm đến từng chiếc lá, từng chiếc rễ cây trong vườn. Bác không muốn ai phá hoại thiên nhiên, dù chỉ là một hành động nhỏ.

Học tiếng việt lớp 2 qua bài này, các em được học về tình yêu thiên nhiên và lối sống giản dị, tiết kiệm từ tấm gương của Bác Hồ. Mỗi cây xanh, mỗi con vật đều có ích và đáng được bảo vệ. Chúng ta cần biết yêu quý và bảo vệ môi trường tự nhiên xung quanh mình.

Từ ngữ trọng tâm: tình yêu thiên nhiên, giản dị, tiết kiệm, Bác Hồ, cây đa, bảo vệ môi trường. Mục tiêu bài học rèn cho các em ý thức bảo vệ cây xanh và thiên nhiên trong cuộc sống hàng ngày.`,
  },
  {
    id: 1202,
    content: `Bài 25 "Đất nước chúng mình" trong tiếng việt lớp 2 là một bài thơ ca ngợi vẻ đẹp của đất nước Việt Nam — từ những dòng sông xanh, những cánh đồng lúa vàng đến những bờ biển dài cát trắng và những dãy núi hùng vĩ. Bài thơ khơi dậy trong lòng các em tình yêu quê hương đất nước sâu sắc.

Đất nước Việt Nam hình chữ S thân thương trải dài từ cực Bắc xuống tận mũi Cà Mau. Phía Bắc có những dãy núi cao vút với đỉnh Fansipan được mệnh danh là "nóc nhà Đông Dương". Phía Đông là Biển Đông bao la với hàng nghìn hòn đảo lớn nhỏ, trong đó có quần đảo Hoàng Sa và Trường Sa — phần lãnh thổ thiêng liêng của Tổ quốc.

Nước ta có hàng trăm con sông lớn nhỏ mang nước ngọt tưới mát cho đồng ruộng. Sông Hồng đỏ nặng phù sa ở miền Bắc, sông Hương thơ mộng ở miền Trung, sông Cửu Long chín cửa đổ ra biển ở miền Nam — mỗi con sông đều gắn bó với cuộc sống của người dân một vùng đất.

Đất nước chúng ta có biết bao cảnh đẹp nổi tiếng: vịnh Hạ Long với hàng nghìn hòn đảo đá vôi kỳ ảo, phố cổ Hội An yên bình, hang Sơn Đoòng to nhất thế giới, ruộng bậc thang Mù Cang Chải vào mùa lúa chín vàng óng...

Việt Nam còn là đất nước của 54 dân tộc anh em cùng chung sống, mỗi dân tộc có bản sắc văn hóa riêng với trang phục, phong tục và tiếng nói đặc trưng. Sự đa dạng đó làm cho văn hóa Việt Nam thêm phong phú và đặc sắc.

Trong chương trình tiếng việt lớp 2, bài thơ "Đất nước chúng mình" giúp các em cảm nhận được vẻ đẹp và sự phong phú của Tổ quốc. Yêu đất nước không chỉ là cảm xúc trong lòng mà còn thể hiện qua việc học tập tốt, giữ gìn cảnh quan và bảo vệ môi trường.

Từ ngữ trọng tâm: đất nước, Tổ quốc, tự hào, yêu quê hương, dân tộc, cảnh đẹp, chữ S. Bài học bồi dưỡng lòng tự hào dân tộc và ý thức bảo vệ đất nước từ thuở ấu thơ.`,
  },
  {
    id: 1203,
    content: `Bài 26 "Trên các miền đất nước" trong chương trình tiếng việt lớp 2 đưa các em đi khám phá đặc trưng của ba miền Bắc, Trung, Nam — ba vùng đất mang những nét riêng biệt nhưng cùng tạo nên một Việt Nam thống nhất và giàu bản sắc. Đây là bài học về địa lý và văn hóa vùng miền thật sinh động.

Miền Bắc với thủ đô Hà Nội nghìn năm văn hiến là vùng đất lịch sử, cội nguồn của văn minh Việt cổ. Khí hậu miền Bắc có bốn mùa rõ rệt: xuân ấm áp hoa đào nở rộ, hè nóng bức ve kêu, thu mát mẻ lá vàng rơi, đông lạnh giá. Đồng bằng sông Hồng phì nhiêu là vựa lúa của miền Bắc. Vịnh Hạ Long, Sa Pa, Ninh Bình là những điểm đến nổi tiếng thu hút du khách khắp nơi.

Miền Trung hẹp và dài, lưng tựa dãy Trường Sơn hùng vĩ, mặt nhìn ra Biển Đông bao la. Đây là vùng đất hứng chịu nhiều thiên tai nhất nhưng người dân miền Trung vẫn mạnh mẽ, kiên cường. Cố đô Huế với những lăng tẩm, cung điện uy nghiêm, phố cổ Hội An với những ngôi nhà mái ngói rêu phong là di sản văn hóa thế giới được UNESCO công nhận.

Miền Nam nắng vàng quanh năm với Thành phố Hồ Chí Minh năng động là trung tâm kinh tế lớn nhất cả nước. Đồng bằng sông Cửu Long "chín rồng" phì nhiêu là vựa lúa, vựa trái cây lớn nhất Việt Nam. Người miền Nam phóng khoáng, thân thiện và hiếu khách nổi tiếng.

Ba miền tuy khác nhau về khí hậu, địa hình và phong tục nhưng đều là con Lạc cháu Hồng, đều nói tiếng Việt và cùng chung lịch sử dựng nước và giữ nước.

Qua bài học trong tiếng việt lớp 2, các em hiểu rõ hơn về địa lý và văn hóa của từng vùng miền, từ đó thêm yêu và tự hào về đất nước Việt Nam đa dạng và giàu đẹp.

Từ ngữ trọng tâm: ba miền, Bắc Trung Nam, địa lý, văn hóa vùng miền, đặc trưng, thống nhất. Bài học giúp các em có hiểu biết cơ bản về địa lý đất nước và tôn trọng sự đa dạng văn hóa vùng miền.`,
  },
  {
    id: 1204,
    content: `Bài 27 "Chuyện quả bầu" trong chương trình tiếng việt lớp 2 kể lại truyền thuyết về nguồn gốc của 54 dân tộc Việt Nam — câu chuyện kỳ diệu về quả bầu thần kỳ chứa đựng muôn loài và từ đó sinh ra các dân tộc anh em trên đất nước Việt Nam.

Ngày xưa, có một cặp vợ chồng người Khơ Mú sống giữa núi rừng. Một hôm, họ nghe thấy tiếng gõ trong quả bầu khổng lồ treo trên cây. Người chồng lấy que nhọn chọc vào quả bầu, từ đó các loài vật bò ra trước. Tiếp theo, dân tộc Khơ Mú chui ra, vì chui qua lỗ nhỏ nên da bị ám khói đen. Rồi đến lượt các dân tộc khác lần lượt chui ra — Thái, Mường, Dao, Tày, Nùng... Cuối cùng là người Kinh chui ra, da trắng hơn vì chui qua lỗ to hơn được khoét thêm.

Từ một quả bầu thần kỳ, tất cả các dân tộc sinh ra. Họ tản ra khắp núi rừng, mỗi dân tộc chọn một vùng đất sinh sống, dần dần hình thành những bản làng, những phong tục tập quán và tiếng nói riêng. Nhưng tất cả đều nhớ rằng mình cùng ra từ một quả bầu — cùng là anh em ruột thịt.

Truyền thuyết này phản ánh quan niệm về tình đoàn kết dân tộc sâu sắc của người Việt. 54 dân tộc anh em tuy có ngôn ngữ, trang phục và phong tục khác nhau nhưng đều là con cháu của một nguồn gốc, cùng chung vận mệnh trên dải đất hình chữ S.

Học tiếng việt lớp 2 qua bài "Chuyện quả bầu", các em hiểu rằng sự đa dạng của các dân tộc là tài sản quý giá của đất nước. Mỗi dân tộc đều có bản sắc riêng đáng trân trọng và bảo tồn. Yêu đất nước cũng có nghĩa là yêu và tôn trọng tất cả 54 dân tộc anh em.

Từ ngữ trọng tâm: truyền thuyết, quả bầu, nguồn gốc, 54 dân tộc, đoàn kết, anh em. Sau bài học này, các em biết tên một số dân tộc ở Việt Nam và hiểu ý nghĩa của đoàn kết dân tộc.`,
  },
  {
    id: 1205,
    content: `Bài 28 "Khám phá đáy biển ở Trường Sa" trong chương trình tiếng việt lớp 2 đưa các em vào một cuộc phiêu lưu kỳ thú dưới đáy biển quần đảo Trường Sa — vùng biển thiêng liêng của Tổ quốc Việt Nam với hệ sinh thái biển phong phú và đa dạng bậc nhất khu vực.

Dưới những làn nước trong xanh ở Trường Sa là cả một thế giới huyền bí và tuyệt đẹp. Những rạn san hô đủ màu sắc rực rỡ — đỏ, vàng, tím, trắng — mọc lên như những khu rừng dưới nước. Hàng trăm loài cá với bộ vảy lấp lánh bơi lội tung tăng giữa những thảm san hô: cá mú đỏ, cá bướm vàng, cá hề cam sọc trắng, cá nóc tròn trịa...

Ngoài cá, dưới đáy biển Trường Sa còn có rùa biển khổng lồ đang bơi chậm rãi, những con mực ống dài phun mực tạo màn khói đen, những con bạch tuộc khéo léo ẩn mình vào đá san hô. Sao biển năm cánh đủ màu sắc nằm lặng yên trên nền cát trắng như những bông hoa biển.

Trường Sa không chỉ đẹp mà còn vô cùng quan trọng. Đây là vùng biển chiến lược nằm trên tuyến hàng hải quốc tế nhộn nhịp, là ngư trường truyền thống của ngư dân Việt Nam bao đời nay. Nguồn tài nguyên phong phú dưới đáy biển Trường Sa là tài sản vô giá của đất nước.

Các chiến sĩ hải quân ngày đêm canh gác, bảo vệ vùng trời vùng biển và hải đảo này. Nhờ có họ, ngư dân mới yên tâm ra khơi đánh cá và quần đảo Trường Sa mãi mãi là một phần không thể tách rời của lãnh thổ Việt Nam.

Bài học trong tiếng việt lớp 2 giúp các em yêu biển, hiểu biển và ý thức được trách nhiệm bảo vệ chủ quyền biển đảo Tổ quốc. Biển Đông không chỉ là nguồn tài nguyên mà còn là máu thịt, là phần lãnh thổ thiêng liêng của dân tộc Việt Nam.

Từ ngữ trọng tâm: Trường Sa, đáy biển, san hô, sinh vật biển, chủ quyền, hải đảo. Mục tiêu bài học bồi dưỡng tình yêu biển đảo và ý thức bảo vệ chủ quyền lãnh thổ quốc gia.`,
  },
  {
    id: 1206,
    content: `Bài 29 "Hồ Gươm" trong chương trình tiếng việt lớp 2 giới thiệu về Hồ Hoàn Kiếm — viên ngọc xanh giữa lòng thủ đô Hà Nội, nơi gắn liền với truyền thuyết trả gươm thần lừng danh của vua Lê Lợi và biểu tượng thiêng liêng của người dân đất Thăng Long nghìn năm văn hiến.

Hồ Gươm nằm ở trung tâm thành phố Hà Nội, bao quanh bởi những hàng liễu rủ duyên dáng và những con đường rợp bóng cây xanh. Mặt hồ phẳng lặng như tấm gương khổng lồ phản chiếu bầu trời và những mái nhà, cây cối xung quanh. Giữa hồ có Tháp Rùa cổ kính rêu phong in bóng xuống mặt nước xanh, tạo nên khung cảnh thơ mộng và trầm mặc.

Hồ Gươm gắn liền với truyền thuyết về Rùa Vàng và thanh gươm thần. Tương truyền, vua Lê Lợi dùng gươm thần đánh đuổi giặc Minh xâm lược, giải phóng đất nước. Sau khi đất nước thái bình, vua ngồi thuyền dạo hồ thì Rùa Vàng nổi lên đòi lại gươm thần. Vua cúi xuống trao gươm, Rùa Vàng ngậm gươm lặn xuống đáy hồ. Từ đó hồ có tên là Hồ Hoàn Kiếm — nghĩa là hồ trả gươm.

Trên hồ, cây cầu Thê Húc màu đỏ son dẫn ra đền Ngọc Sơn uy nghi. Đền thờ danh tướng Trần Hưng Đạo và nhà y học Lê Hữu Trác, những người có công lớn với đất nước và dân tộc. Mỗi sáng, người dân Hà Nội lại tập trung quanh hồ đi bộ, tập thể dục, hít thở không khí trong lành.

Trong tiếng việt lớp 2, bài học về Hồ Gươm không chỉ giới thiệu một danh lam thắng cảnh đẹp mà còn kể câu chuyện lịch sử hào hùng của dân tộc. Hồ Gươm là tâm hồn của Hà Nội, là biểu tượng của lòng yêu nước và tinh thần bất khuất của người Việt.

Từ ngữ trọng tâm: Hồ Hoàn Kiếm, truyền thuyết, Rùa Vàng, gươm thần, Hà Nội, biểu tượng. Sau bài học, các em biết tên và ý nghĩa lịch sử của Hồ Gươm — di sản văn hóa quý giá của thủ đô.`,
  },
  {
    id: 1207,
    content: `Bài 30 "Cánh đồng quê em" là bài học cuối cùng trong phần tiếng việt lớp 2 Tập 2, khép lại một năm học với những vần thơ đẹp đẽ về cánh đồng lúa quê hương — hình ảnh thân thuộc nhất, gần gũi nhất trong ký ức tuổi thơ của biết bao thế hệ người Việt Nam.

Mỗi sáng sớm, khi mặt trời vừa ló dạng sau rặng tre, cánh đồng quê em đã rộn ràng tiếng người, tiếng trâu và mùi đất ẩm tươi mát. Những thửa ruộng vuông vắn nằm kề nhau, lúa đang thì con gái xanh mướt như tấm thảm nhung khổng lồ trải dài đến tận chân trời. Những chú cò trắng bay lượn nhẹ nhàng, thỉnh thoảng đậu xuống bờ ruộng kiếm ăn, trông thật bình yên và đẹp mắt.

Đến mùa gặt, cánh đồng nhuộm vàng rực rỡ. Những bông lúa cúi đầu nặng trĩu hạt thơm nức. Cả làng ra đồng gặt lúa, tiếng cười nói rộn ràng, tiếng liềm cắt lúa xào xạc hòa cùng gió thổi. Mùi thơm của rơm rạ mới cắt bay thoảng trong gió chiều khiến ai cũng cảm thấy ấm lòng.

Trẻ em trong làng thích ra đồng nhất vào buổi chiều. Các bạn thả diều trên bờ đê, bắt cào cào châu chấu trong lúa, hay ngồi câu cá bên con mương nhỏ chạy qua cánh đồng. Tiếng sáo diều vi vu hòa với tiếng hát của những bà mẹ đang cấy lúa — âm thanh đó mãi mãi là giai điệu của quê hương trong ký ức mỗi người.

Cánh đồng không chỉ nuôi sống chúng ta bằng hạt gạo mà còn nuôi dưỡng tâm hồn chúng ta bằng vẻ đẹp bình dị và thân thương. Dù mai sau lớn lên, dù đi đến đâu, mỗi người đều nhớ về cánh đồng quê hương với tình cảm ấm áp và sâu nặng.

Kết thúc chương trình tiếng việt lớp 2 bằng bài "Cánh đồng quê em", các em mang theo tình yêu làng quê, yêu đất nước và yêu những điều giản dị xung quanh mình. Đó là nền tảng để các em lớn lên thành những người có ích cho gia đình và xã hội.

Từ ngữ trọng tâm: cánh đồng, lúa, quê hương, mùa gặt, tình yêu làng quê, nông thôn, bình yên. Bài học bồi đắp tình yêu thiên nhiên và quê hương đất nước trong tâm hồn các em nhỏ.`,
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
