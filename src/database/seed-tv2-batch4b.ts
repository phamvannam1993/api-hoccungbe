import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

async function seed() {
  const conn = await mysql.createConnection(DB);

  const INSERT = `INSERT INTO quizzes (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`;

  function r(lessonId: number, exerciseNumber: number, questionType: string, questionText: string, optionsJson: any, correctAnswer: any, difficultyLevel: string, explanation: string | null, sortOrder: number) {
    return [lessonId, exerciseNumber, questionType, questionText, optionsJson ? JSON.stringify(optionsJson) : null, JSON.stringify(correctAnswer), difficultyLevel, explanation ?? null, 10, sortOrder];
  }

  const lessons: { id: number; rows: any[][] }[] = [];

  // ─── 1202: Bài 25 – Đất nước chúng mình ────────────────────────────────────
  {
    const id = 1202;
    const rows: any[][] = [
      // Ex1 easy – từ vựng về đất nước
      r(id,1,'single_choice','Từ nào có nghĩa là quê hương của chúng ta?',[{key:'A',text:'Đất nước'},{key:'B',text:'Bầu trời'},{key:'C',text:'Dòng sông'}],'A','easy','Đất nước là quê hương, nơi chúng ta sinh sống',1),
      r(id,1,'single_choice','Lá cờ Việt Nam có màu gì với ngôi sao màu gì?',[{key:'A',text:'Cờ xanh sao trắng'},{key:'B',text:'Cờ đỏ sao vàng'},{key:'C',text:'Cờ vàng sao đỏ'}],'B','easy','Cờ Việt Nam màu đỏ với ngôi sao vàng năm cánh',2),
      r(id,1,'single_choice','Tên nước ta là gì?',[{key:'A',text:'Trung Quốc'},{key:'B',text:'Lào'},{key:'C',text:'Việt Nam'}],'C','easy','Tên nước ta là Cộng hòa Xã hội Chủ nghĩa Việt Nam',3),
      r(id,1,'true_false','Từ "Tổ quốc" có nghĩa là đất nước của tổ tiên để lại. Đúng hay sai?',null,true,'easy','Tổ quốc là đất nước của dân tộc, do tổ tiên gây dựng',4),
      r(id,1,'true_false','Việt Nam có 100 dân tộc anh em. Đúng hay sai?',null,false,'easy','Việt Nam có 54 dân tộc anh em',5),
      r(id,1,'fill_blank','Nước ta có [b1] dân tộc anh em cùng sinh sống.',[{key:'b1',text:''}],{b1:'54'},'easy','Việt Nam có 54 dân tộc',6),
      r(id,1,'fill_blank','Lá cờ [b1] [b2] là biểu tượng của nước Việt Nam.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đỏ',b2:'sao vàng'},'easy','Cờ đỏ sao vàng là quốc kỳ Việt Nam',7),
      r(id,1,'single_choice','Từ "dân tộc" trong bài có nghĩa là gì?',[{key:'A',text:'Loài thực vật'},{key:'B',text:'Cộng đồng người cùng chung nguồn gốc'},{key:'C',text:'Loài động vật'}],'B','easy','Dân tộc là cộng đồng người có ngôn ngữ, văn hóa chung',8),
      r(id,1,'sorting','Sắp xếp các từ để thành câu đúng: chúng / là / Việt Nam / mình / Đất nước',[{key:'1',text:'chúng'},{key:'2',text:'là'},{key:'3',text:'Việt Nam'},{key:'4',text:'mình'},{key:'5',text:'Đất nước'}],['5','4','2','3','1'],'easy','Đất nước chúng mình là Việt Nam',9),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Đất nước'},{key:'B',text:'Tổ quốc'},{key:'C',text:'Dân tộc'}],{A:'Quê hương nơi ta sinh sống',B:'Đất nước của tổ tiên',C:'Cộng đồng người chung nguồn gốc'},'easy',null,10),
      // Ex2 medium – bài thơ / đoạn văn về vẻ đẹp Việt Nam
      r(id,2,'single_choice','Trong bài đọc "Đất nước chúng mình", tác giả miêu tả Việt Nam là đất nước như thế nào?',[{key:'A',text:'Đất nước giàu đẹp, đáng tự hào'},{key:'B',text:'Đất nước nghèo nàn, buồn bã'},{key:'C',text:'Đất nước xa lạ'}],'A','medium','Bài thơ ca ngợi vẻ đẹp và sự phong phú của đất nước Việt Nam',1),
      r(id,2,'single_choice','Hình ảnh nào KHÔNG được nhắc đến trong bài thơ về đất nước?',[{key:'A',text:'Cánh đồng lúa xanh'},{key:'B',text:'Dòng sông hiền hòa'},{key:'C',text:'Tòa nhà cao tầng'}],'C','medium','Bài thơ thiên về hình ảnh thiên nhiên, làng quê',2),
      r(id,2,'true_false','Bài thơ "Đất nước chúng mình" thể hiện tình yêu quê hương đất nước. Đúng hay sai?',null,true,'medium','Chủ đề bài thơ là tình yêu đất nước Việt Nam',3),
      r(id,2,'true_false','Câu thơ "Đất nước chúng mình đẹp lắm" thể hiện sự tự hào về quê hương. Đúng hay sai?',null,true,'medium','Câu thơ bày tỏ niềm tự hào và yêu quý đất nước',4),
      r(id,2,'fill_blank','Bài thơ sử dụng từ "[b1]" để thể hiện đất nước rất đẹp và đáng yêu.',[{key:'b1',text:''}],{b1:'chúng mình'},'medium','Từ "chúng mình" tạo sự gần gũi, thân thương',5),
      r(id,2,'single_choice','Tại sao tác giả dùng từ "chúng mình" trong bài thơ?',[{key:'A',text:'Để chỉ một mình tác giả'},{key:'B',text:'Để tạo sự gần gũi, thân thương với quê hương'},{key:'C',text:'Để chỉ người nước ngoài'}],'B','medium','Chúng mình tạo cảm giác cùng nhau, thân thiết',6),
      r(id,2,'matching','Nối hình ảnh với cảm xúc tác giả muốn gợi lên:',[{key:'A',text:'Cờ đỏ sao vàng'},{key:'B',text:'54 dân tộc'},{key:'C',text:'Đất nước xinh đẹp'}],{A:'Tự hào về quốc kỳ',B:'Đoàn kết dân tộc',C:'Yêu quê hương'},'medium',null,7),
      r(id,2,'fill_blank','Đất nước Việt Nam trải dài từ [b1] đến [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Bắc',b2:'Nam'},'medium','Việt Nam trải dài từ Bắc xuống Nam',8),
      r(id,2,'single_choice','Hình ảnh "dòng sông" trong bài thơ gợi lên điều gì?',[{key:'A',text:'Sự nguy hiểm'},{key:'B',text:'Vẻ đẹp hiền hòa của thiên nhiên'},{key:'C',text:'Mùa lũ lụt'}],'B','medium','Dòng sông gợi lên vẻ đẹp thanh bình của đất nước',9),
      r(id,2,'sorting','Sắp xếp các ý theo trình tự bài thơ: ca ngợi thiên nhiên / giới thiệu tên nước / kêu gọi yêu quê hương / nêu 54 dân tộc',[{key:'1',text:'ca ngợi thiên nhiên'},{key:'2',text:'giới thiệu tên nước'},{key:'3',text:'kêu gọi yêu quê hương'},{key:'4',text:'nêu 54 dân tộc'}],['2','4','1','3'],'medium','Bài thơ đi từ giới thiệu → dân tộc → thiên nhiên → tình cảm',10),
      // Ex3 hard – biện pháp nghệ thuật, cảm xúc
      r(id,3,'single_choice','Biện pháp nghệ thuật nào được dùng trong câu "Đất nước mình như dải lụa mềm"?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp từ'}],'A','hard','So sánh đất nước với dải lụa để thể hiện vẻ đẹp mềm mại',1),
      r(id,3,'single_choice','Từ "xinh đẹp" trong bài thơ thuộc loại từ nào?',[{key:'A',text:'Danh từ'},{key:'B',text:'Tính từ'},{key:'C',text:'Động từ'}],'B','hard','Xinh đẹp là tính từ miêu tả vẻ đẹp',2),
      r(id,3,'true_false','Câu "Đất nước ta ơi!" thể hiện cảm xúc nhớ nhung và yêu thương. Đúng hay sai?',null,true,'hard','Từ "ơi" là tiếng gọi thân thương, thể hiện tình cảm sâu sắc',3),
      r(id,3,'fill_blank','Hình ảnh "[b1] sao vàng" trong bài thơ là biểu tượng của đất nước Việt Nam.',[{key:'b1',text:''}],{b1:'cờ đỏ'},'hard','Cờ đỏ sao vàng là quốc kỳ, biểu tượng Việt Nam',4),
      r(id,3,'matching','Nối câu thơ với biện pháp nghệ thuật:',[{key:'A',text:'Đất nước như bà mẹ hiền'},{key:'B',text:'Đẹp lắm! Đẹp lắm! Đất nước mình'},{key:'C',text:'Dòng sông uốn lượn xanh ngời'}],{A:'Nhân hóa / So sánh',B:'Điệp từ',C:'Miêu tả sinh động'},'hard',null,5),
      r(id,3,'single_choice','Thông điệp chính của bài thơ "Đất nước chúng mình" là gì?',[{key:'A',text:'Giới thiệu địa lý Việt Nam'},{key:'B',text:'Khơi dậy tình yêu và tự hào về đất nước'},{key:'C',text:'Kể chuyện lịch sử'}],'B','hard','Bài thơ nhằm khơi dậy tình yêu quê hương trong lòng trẻ em',6),
      r(id,3,'fill_blank','Tình cảm của tác giả đối với đất nước thể hiện qua từ ngữ [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu',b2:'tự hào'},'hard','Yêu và tự hào là cảm xúc chủ đạo của bài',7),
      r(id,3,'sorting','Sắp xếp các yếu tố tạo nên vẻ đẹp đất nước theo bài thơ: dân tộc đoàn kết / thiên nhiên tươi đẹp / lịch sử hào hùng / con người thân thiện',[{key:'1',text:'dân tộc đoàn kết'},{key:'2',text:'thiên nhiên tươi đẹp'},{key:'3',text:'lịch sử hào hùng'},{key:'4',text:'con người thân thiện'}],['2','1','4','3'],'hard','Bài nhấn mạnh thiên nhiên, đoàn kết, con người rồi lịch sử',8),
      r(id,3,'single_choice','Vì sao nhà thơ chọn hình ảnh "cờ đỏ sao vàng" để viết về đất nước?',[{key:'A',text:'Vì đây là màu sắc đẹp nhất'},{key:'B',text:'Vì đây là biểu tượng thiêng liêng của đất nước'},{key:'C',text:'Vì đây là màu yêu thích của tác giả'}],'B','hard','Quốc kỳ là biểu tượng thiêng liêng đại diện cho đất nước',9),
      r(id,3,'matching','Nối từ ngữ với tác dụng trong bài thơ:',[{key:'A',text:'chúng mình'},{key:'B',text:'ơi'},{key:'C',text:'đẹp lắm'}],{A:'Tạo sự gần gũi, thân thương',B:'Tiếng gọi thể hiện tình cảm',C:'Nhấn mạnh vẻ đẹp đất nước'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1203: Bài 26 – Trên các miền đất nước ─────────────────────────────────
  {
    const id = 1203;
    const rows: any[][] = [
      // Ex1 easy – từ vựng địa lý
      r(id,1,'single_choice','Việt Nam có mấy miền chính?',[{key:'A',text:'Hai miền'},{key:'B',text:'Ba miền'},{key:'C',text:'Bốn miền'}],'B','easy','Việt Nam có ba miền: Bắc, Trung, Nam',1),
      r(id,1,'single_choice','Miền nào có nhiều núi cao nhất ở Việt Nam?',[{key:'A',text:'Miền Nam'},{key:'B',text:'Miền Trung'},{key:'C',text:'Miền Bắc'}],'C','easy','Miền Bắc có dãy Hoàng Liên Sơn với đỉnh Fansipan cao nhất',2),
      r(id,1,'single_choice','Đồng bằng sông Cửu Long thuộc miền nào?',[{key:'A',text:'Miền Bắc'},{key:'B',text:'Miền Trung'},{key:'C',text:'Miền Nam'}],'C','easy','Đồng bằng sông Cửu Long nằm ở miền Nam',3),
      r(id,1,'true_false','Miền Trung có nhiều bãi biển đẹp. Đúng hay sai?',null,true,'easy','Miền Trung có đường bờ biển dài với nhiều bãi biển đẹp',4),
      r(id,1,'true_false','Đồng bằng là vùng đất bằng phẳng. Đúng hay sai?',null,true,'easy','Đồng bằng là vùng đất thấp, bằng phẳng',5),
      r(id,1,'fill_blank','Ba miền của Việt Nam là miền [b1], miền [b2] và miền [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'Bắc',b2:'Trung',b3:'Nam'},'easy','Ba miền Bắc, Trung, Nam',6),
      r(id,1,'fill_blank','Vùng đất [b1] là nơi có nhiều ruộng lúa và sông ngòi.',[{key:'b1',text:''}],{b1:'đồng bằng'},'easy','Đồng bằng là vùng đất bằng phẳng, màu mỡ',7),
      r(id,1,'matching','Nối địa danh với miền:',[{key:'A',text:'Hà Nội'},{key:'B',text:'Đà Nẵng'},{key:'C',text:'Thành phố Hồ Chí Minh'}],{A:'Miền Bắc',B:'Miền Trung',C:'Miền Nam'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ Bắc vào Nam: miền Nam / miền Trung / miền Bắc',[{key:'1',text:'miền Nam'},{key:'2',text:'miền Trung'},{key:'3',text:'miền Bắc'}],['3','2','1'],'easy','Từ Bắc xuống Nam: Bắc → Trung → Nam',9),
      r(id,1,'single_choice','Từ "núi" chỉ loại địa hình nào?',[{key:'A',text:'Vùng đất thấp, bằng phẳng'},{key:'B',text:'Khối đất đá cao vút lên'},{key:'C',text:'Vùng nước sâu'}],'B','easy','Núi là khối đất đá nhô cao so với vùng xung quanh',10),
      // Ex2 medium – đặc điểm từng miền
      r(id,2,'single_choice','Điểm đặc trưng của miền Bắc là gì?',[{key:'A',text:'Nhiều bãi biển, nắng ấm quanh năm'},{key:'B',text:'Có bốn mùa rõ rệt, có núi cao và đồng bằng sông Hồng'},{key:'C',text:'Kênh rạch chằng chịt, sông Cửu Long'}],'B','medium','Miền Bắc có 4 mùa rõ ràng, núi non và đồng bằng sông Hồng',1),
      r(id,2,'single_choice','Miền Nam nổi tiếng với sản vật gì?',[{key:'A',text:'Gạo và trái cây nhiệt đới'},{key:'B',text:'Đá quý và gỗ quý'},{key:'C',text:'Tôm cá vùng núi'}],'A','medium','Miền Nam đồng bằng phì nhiêu, nổi tiếng lúa gạo và trái cây',2),
      r(id,2,'true_false','Miền Trung có địa hình hẹp, nhiều đèo và biển. Đúng hay sai?',null,true,'medium','Miền Trung dải đất hẹp nằm giữa núi và biển',3),
      r(id,2,'fill_blank','Đồng bằng sông [b1] nằm ở miền Bắc, là vựa lúa quan trọng.',[{key:'b1',text:''}],{b1:'Hồng'},'medium','Đồng bằng sông Hồng là vựa lúa miền Bắc',4),
      r(id,2,'single_choice','Hình ảnh nào đặc trưng cho miền Trung?',[{key:'A',text:'Cánh đồng lúa mênh mông'},{key:'B',text:'Bờ biển xanh, cát trắng, nắng vàng'},{key:'C',text:'Rừng tràm, kênh rạch'}],'B','medium','Miền Trung nổi tiếng với biển xanh, cát trắng',5),
      r(id,2,'matching','Nối mỗi miền với đặc điểm nổi bật:',[{key:'A',text:'Miền Bắc'},{key:'B',text:'Miền Trung'},{key:'C',text:'Miền Nam'}],{A:'Bốn mùa, núi cao, sông Hồng',B:'Biển dài, đèo núi, dải đất hẹp',C:'Sông Cửu Long, trái cây, nắng ấm'},'medium',null,6),
      r(id,2,'fill_blank','Miền [b1] có khí hậu nắng ấm quanh năm và kênh rạch chằng chịt.',[{key:'b1',text:''}],{b1:'Nam'},'medium','Miền Nam nắng ấm quanh năm, nhiều kênh rạch',7),
      r(id,2,'true_false','Cả ba miền đều có sông ngòi. Đúng hay sai?',null,true,'medium','Mỗi miền đều có hệ thống sông ngòi riêng',8),
      r(id,2,'single_choice','Tại sao miền Nam có thể trồng lúa quanh năm?',[{key:'A',text:'Vì khí hậu lạnh'},{key:'B',text:'Vì nắng ấm và mưa nhiều'},{key:'C',text:'Vì nhiều núi'}],'B','medium','Khí hậu nóng ẩm giúp trồng lúa nhiều vụ',9),
      r(id,2,'sorting','Sắp xếp đặc điểm theo đúng miền (Bắc→Trung→Nam): kênh rạch / bốn mùa / biển cát trắng',[{key:'1',text:'kênh rạch'},{key:'2',text:'bốn mùa'},{key:'3',text:'biển cát trắng'}],['2','3','1'],'medium','Bắc: bốn mùa; Trung: biển; Nam: kênh rạch',10),
      // Ex3 hard – so sánh 3 miền, nối đặc trưng
      r(id,3,'single_choice','Điểm giống nhau giữa ba miền Bắc, Trung, Nam là gì?',[{key:'A',text:'Đều có khí hậu lạnh'},{key:'B',text:'Đều là một phần của đất nước Việt Nam'},{key:'C',text:'Đều không có núi'}],'B','hard','Dù khác nhau, ba miền đều là một phần thiêng liêng của Việt Nam',1),
      r(id,3,'single_choice','Điểm khác nhau lớn nhất giữa miền Bắc và miền Nam về khí hậu là gì?',[{key:'A',text:'Miền Bắc có 4 mùa, miền Nam nắng ấm quanh năm'},{key:'B',text:'Miền Bắc nóng hơn miền Nam'},{key:'C',text:'Miền Nam có tuyết'}],'A','hard','Miền Bắc có bốn mùa rõ rệt, miền Nam nắng ấm quanh năm',2),
      r(id,3,'matching','Nối mỗi đặc điểm với miền phù hợp:',[{key:'A',text:'Đỉnh Fansipan cao nhất'},{key:'B',text:'Đèo Hải Vân nổi tiếng'},{key:'C',text:'Sông Cửu Long chín nhánh'}],{A:'Miền Bắc',B:'Miền Trung',C:'Miền Nam'},'hard',null,3),
      r(id,3,'fill_blank','Miền Trung có địa hình [b1] và bờ biển [b2] dài.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'hẹp',b2:'đẹp'},'hard','Miền Trung dải đất hẹp với bờ biển đẹp dài',4),
      r(id,3,'true_false','Miền Bắc và miền Nam có cùng khí hậu. Đúng hay sai?',null,false,'hard','Miền Bắc có 4 mùa, miền Nam nắng ấm quanh năm',5),
      r(id,3,'sorting','Sắp xếp các điểm từ Bắc vào Nam: Thành phố Hồ Chí Minh / Hà Nội / Đà Nẵng / Huế',[{key:'1',text:'Thành phố Hồ Chí Minh'},{key:'2',text:'Hà Nội'},{key:'3',text:'Đà Nẵng'},{key:'4',text:'Huế'}],['2','4','3','1'],'hard','Bắc→Nam: Hà Nội, Huế, Đà Nẵng, TP.HCM',6),
      r(id,3,'fill_blank','Nghề đánh cá phát triển mạnh ở những nơi có [b1] dài.',[{key:'b1',text:''}],{b1:'bờ biển'},'hard','Bờ biển dài giúp ngư dân đánh bắt hải sản',7),
      r(id,3,'single_choice','Vì sao Việt Nam được gọi là đất nước "rừng vàng biển bạc"?',[{key:'A',text:'Vì có nhiều vàng và bạc trong lòng đất'},{key:'B',text:'Vì rừng và biển đều giàu tài nguyên quý giá'},{key:'C',text:'Vì màu sắc của rừng và biển là vàng và bạc'}],'B','hard','Rừng vàng biển bạc ý chỉ tài nguyên phong phú',8),
      r(id,3,'matching','Nối sản vật với miền sản xuất chính:',[{key:'A',text:'Lúa gạo đồng bằng sông Cửu Long'},{key:'B',text:'Vải thiều, long nhãn'},{key:'C',text:'Nước mắm Phú Quốc'}],{A:'Miền Nam',B:'Miền Bắc',C:'Miền Nam'},'hard',null,9),
      r(id,3,'true_false','Sự đa dạng của ba miền làm cho Việt Nam thêm phong phú và đẹp hơn. Đúng hay sai?',null,true,'hard','Sự khác biệt của ba miền tạo nên sự phong phú cho đất nước',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1204: Bài 27 – Chuyện quả bầu ─────────────────────────────────────────
  {
    const id = 1204;
    const rows: any[][] = [
      // Ex1 easy – từ vựng truyện quả bầu
      r(id,1,'single_choice','Quả bầu trong truyện là loại quả gì?',[{key:'A',text:'Quả tròn, màu xanh lớn'},{key:'B',text:'Quả nhỏ màu đỏ'},{key:'C',text:'Quả vuông màu vàng'}],'A','easy','Quả bầu là loại quả tròn lớn màu xanh',1),
      r(id,1,'single_choice','Trong truyện "Chuyện quả bầu", các dân tộc chui ra từ đâu?',[{key:'A',text:'Từ trong núi'},{key:'B',text:'Từ trong quả bầu'},{key:'C',text:'Từ dưới biển'}],'B','easy','Theo truyện, các dân tộc đều chui ra từ trong quả bầu',2),
      r(id,1,'single_choice','Từ "nguồn gốc" có nghĩa là gì?',[{key:'A',text:'Nơi bắt đầu, xuất phát của sự vật'},{key:'B',text:'Màu sắc của sự vật'},{key:'C',text:'Kích thước của sự vật'}],'A','easy','Nguồn gốc là nơi bắt đầu, gốc gác của sự vật, sự việc',3),
      r(id,1,'true_false','Truyện "Chuyện quả bầu" giải thích nguồn gốc 54 dân tộc Việt Nam. Đúng hay sai?',null,true,'easy','Truyện kể nguồn gốc các dân tộc cùng ra từ quả bầu',4),
      r(id,1,'true_false','Trong truyện, các dân tộc là kẻ thù của nhau. Đúng hay sai?',null,false,'easy','Các dân tộc là anh em, cùng chung nguồn gốc từ quả bầu',5),
      r(id,1,'fill_blank','Theo truyện, các dân tộc đều là [b1] vì cùng xuất phát từ một quả bầu.',[{key:'b1',text:''}],{b1:'anh em'},'easy','Các dân tộc là anh em cùng nguồn gốc',6),
      r(id,1,'fill_blank','Việt Nam có [b1] dân tộc anh em cùng sinh sống.',[{key:'b1',text:''}],{b1:'54'},'easy','Việt Nam có 54 dân tộc',7),
      r(id,1,'matching','Nối nhân vật / sự vật với vai trò trong truyện:',[{key:'A',text:'Quả bầu'},{key:'B',text:'Các dân tộc'},{key:'C',text:'Anh em'}],{A:'Nơi xuất phát của các dân tộc',B:'Những người con của quả bầu',C:'Mối quan hệ giữa các dân tộc'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp theo thứ tự trong truyện: Các dân tộc sống hòa thuận / Quả bầu xuất hiện / Các dân tộc chui ra',[{key:'1',text:'Các dân tộc sống hòa thuận'},{key:'2',text:'Quả bầu xuất hiện'},{key:'3',text:'Các dân tộc chui ra'}],['2','3','1'],'easy','Quả bầu xuất hiện → dân tộc chui ra → sống hòa thuận',9),
      r(id,1,'single_choice','Truyện "Chuyện quả bầu" thuộc thể loại gì?',[{key:'A',text:'Truyện khoa học'},{key:'B',text:'Truyện dân gian / truyền thuyết'},{key:'C',text:'Truyện trinh thám'}],'B','easy','Đây là truyện dân gian giải thích nguồn gốc dân tộc',10),
      // Ex2 medium – diễn biến chính của truyện
      r(id,2,'single_choice','Vì sao quả bầu trong truyện lại đặc biệt?',[{key:'A',text:'Vì nó rất ngon'},{key:'B',text:'Vì bên trong có các dân tộc sinh sống'},{key:'C',text:'Vì nó có màu sắc đẹp'}],'B','medium','Quả bầu đặc biệt vì chứa đựng nguồn gốc các dân tộc',1),
      r(id,2,'single_choice','Thông điệp chính của truyện "Chuyện quả bầu" là gì?',[{key:'A',text:'Các dân tộc Việt Nam đều là anh em, cùng nguồn gốc'},{key:'B',text:'Quả bầu là loại quả ngon nhất'},{key:'C',text:'Nên trồng nhiều quả bầu'}],'A','medium','Truyện dạy về sự đoàn kết, cùng nguồn gốc của các dân tộc',2),
      r(id,2,'true_false','Truyện dân gian thường dùng yếu tố kỳ lạ để giải thích hiện tượng. Đúng hay sai?',null,true,'medium','Truyện dân gian hay dùng yếu tố huyền bí, kỳ lạ',3),
      r(id,2,'fill_blank','Sau khi ra khỏi quả bầu, các dân tộc đi khắp [b1] để sinh sống.',[{key:'b1',text:''}],{b1:'đất nước'},'medium','Các dân tộc tỏa đi khắp nơi trên đất nước',4),
      r(id,2,'single_choice','Trong truyện, hình ảnh quả bầu tượng trưng cho điều gì?',[{key:'A',text:'Sự giàu có'},{key:'B',text:'Cái nôi chung của các dân tộc Việt Nam'},{key:'C',text:'Thiên nhiên tươi đẹp'}],'B','medium','Quả bầu là cái nôi, nguồn gốc chung của 54 dân tộc',5),
      r(id,2,'matching','Nối sự kiện với ý nghĩa:',[{key:'A',text:'Các dân tộc từ quả bầu chui ra'},{key:'B',text:'Các dân tộc sống hòa thuận'},{key:'C',text:'Có 54 dân tộc'}],{A:'Cùng nguồn gốc',B:'Tình đoàn kết anh em',C:'Sự đa dạng phong phú'},'medium',null,6),
      r(id,2,'true_false','Truyện "Chuyện quả bầu" chỉ có người Kinh mới liên quan. Đúng hay sai?',null,false,'medium','Truyện nói về tất cả 54 dân tộc Việt Nam',7),
      r(id,2,'fill_blank','Các dân tộc tuy khác nhau nhưng đều là [b1] một nhà.',[{key:'b1',text:''}],{b1:'anh em'},'medium','Tất cả các dân tộc là anh em trong đại gia đình Việt Nam',8),
      r(id,2,'sorting','Sắp xếp ý nghĩa từ cụ thể đến khái quát: 54 dân tộc / quả bầu thần kỳ / đoàn kết dân tộc',[{key:'1',text:'54 dân tộc'},{key:'2',text:'quả bầu thần kỳ'},{key:'3',text:'đoàn kết dân tộc'}],['2','1','3'],'medium','Từ chi tiết (quả bầu) → số lượng → ý nghĩa',9),
      r(id,2,'single_choice','Tại sao trẻ em cần biết truyện "Chuyện quả bầu"?',[{key:'A',text:'Để biết cách trồng bầu'},{key:'B',text:'Để hiểu và yêu quý các dân tộc anh em'},{key:'C',text:'Để học nấu ăn'}],'B','medium','Truyện giúp trẻ hiểu giá trị đoàn kết dân tộc',10),
      // Ex3 hard – đặc điểm truyền thuyết, đa dạng dân tộc
      r(id,3,'single_choice','Truyền thuyết khác truyện thực ở điểm nào?',[{key:'A',text:'Truyền thuyết hoàn toàn là sự thật lịch sử'},{key:'B',text:'Truyền thuyết có yếu tố kỳ ảo, thần kỳ'},{key:'C',text:'Truyền thuyết không có nhân vật'}],'B','hard','Truyền thuyết pha trộn lịch sử với yếu tố kỳ ảo',1),
      r(id,3,'single_choice','Sự đa dạng của 54 dân tộc thể hiện ở điểm nào?',[{key:'A',text:'Ngôn ngữ, trang phục, phong tục khác nhau'},{key:'B',text:'Đều nói cùng một tiếng'},{key:'C',text:'Đều mặc cùng một loại trang phục'}],'A','hard','54 dân tộc có ngôn ngữ, phong tục, trang phục riêng',2),
      r(id,3,'true_false','Các dân tộc Việt Nam tuy khác về ngôn ngữ nhưng đều là anh em. Đúng hay sai?',null,true,'hard','Dù khác biệt, 54 dân tộc đều là anh em trong đại gia đình',3),
      r(id,3,'fill_blank','Truyện "Chuyện quả bầu" thuộc thể loại [b1] dân gian của người Việt.',[{key:'b1',text:''}],{b1:'truyền thuyết'},'hard','Đây là truyền thuyết dân gian',4),
      r(id,3,'matching','Nối đặc điểm với thể loại truyện:',[{key:'A',text:'Có yếu tố thần kỳ, kỳ ảo'},{key:'B',text:'Giải thích nguồn gốc sự vật'},{key:'C',text:'Nhân vật là người thật, việc thật'}],{A:'Truyền thuyết',B:'Truyền thuyết',C:'Lịch sử'},'hard',null,5),
      r(id,3,'single_choice','Điều gì chứng tỏ các dân tộc Việt Nam đoàn kết với nhau?',[{key:'A',text:'Cùng chiến đấu bảo vệ đất nước qua các thời kỳ'},{key:'B',text:'Đều ở cùng một nơi'},{key:'C',text:'Đều nói một thứ tiếng'}],'A','hard','Đoàn kết thể hiện qua lịch sử cùng chống giặc ngoại xâm',6),
      r(id,3,'fill_blank','Truyện kể rằng tất cả dân tộc đều có chung [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nguồn gốc',b2:'tổ tiên'},'hard','Cùng nguồn gốc, tổ tiên là điểm chung các dân tộc',7),
      r(id,3,'sorting','Sắp xếp theo tầm quan trọng từ chi tiết → ý nghĩa: đoàn kết / quả bầu / 54 dân tộc / nguồn gốc',[{key:'1',text:'đoàn kết'},{key:'2',text:'quả bầu'},{key:'3',text:'54 dân tộc'},{key:'4',text:'nguồn gốc'}],['2','4','3','1'],'hard','Quả bầu → nguồn gốc → 54 dân tộc → đoàn kết',8),
      r(id,3,'true_false','Hiểu về nguồn gốc chung giúp các dân tộc thêm yêu quý nhau. Đúng hay sai?',null,true,'hard','Biết cùng nguồn gốc giúp thêm tình đoàn kết',9),
      r(id,3,'single_choice','Thông điệp truyện muốn nhắn gửi đến trẻ em là gì?',[{key:'A',text:'Hãy trồng nhiều bầu'},{key:'B',text:'Hãy yêu quý và đoàn kết với tất cả các dân tộc anh em'},{key:'C',text:'Hãy sợ những điều kỳ lạ'}],'B','hard','Truyện dạy trẻ biết yêu quý sự đoàn kết dân tộc',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1205: Bài 28 – Khám phá đáy biển ở Trường Sa ─────────────────────────
  {
    const id = 1205;
    const rows: any[][] = [
      // Ex1 easy – từ vựng biển
      r(id,1,'single_choice','Trường Sa là tên gì?',[{key:'A',text:'Một ngọn núi cao'},{key:'B',text:'Quần đảo của Việt Nam ở Biển Đông'},{key:'C',text:'Một dòng sông lớn'}],'B','easy','Trường Sa là quần đảo thuộc chủ quyền Việt Nam ở Biển Đông',1),
      r(id,1,'single_choice','San hô là gì?',[{key:'A',text:'Loài cá biển'},{key:'B',text:'Sinh vật biển tạo thành rạn đẹp sặc sỡ'},{key:'C',text:'Loài chim biển'}],'B','easy','San hô là sinh vật biển tạo nên các rạn san hô đầy màu sắc',2),
      r(id,1,'single_choice','Từ "đáy biển" nghĩa là gì?',[{key:'A',text:'Mặt nước biển'},{key:'B',text:'Nơi sâu nhất dưới lòng biển'},{key:'C',text:'Bờ cát ven biển'}],'B','easy','Đáy biển là phần sâu nhất dưới lòng biển',3),
      r(id,1,'true_false','Trường Sa là quần đảo thuộc chủ quyền Việt Nam. Đúng hay sai?',null,true,'easy','Trường Sa là lãnh thổ thiêng liêng của Tổ quốc Việt Nam',4),
      r(id,1,'true_false','Tôm và cua là loài động vật sống trên cạn. Đúng hay sai?',null,false,'easy','Tôm và cua là động vật sống dưới nước, nhất là biển',5),
      r(id,1,'fill_blank','Dưới đáy biển ở Trường Sa có rất nhiều [b1] và [b2] sặc sỡ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'san hô',b2:'cá'},'easy','San hô và cá là sinh vật tiêu biểu ở Trường Sa',6),
      r(id,1,'fill_blank','Để khám phá đáy biển, người ta phải [b1] xuống lòng biển.',[{key:'b1',text:''}],{b1:'lặn'},'easy','Lặn biển là hoạt động khám phá dưới nước',7),
      r(id,1,'matching','Nối sinh vật biển với đặc điểm:',[{key:'A',text:'San hô'},{key:'B',text:'Cá'},{key:'C',text:'Tôm'}],{A:'Tạo thành rạn đầy màu sắc',B:'Bơi lội dưới nước',C:'Có càng, sống đáy biển'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ nhỏ đến lớn: tôm / cá ngừ đại dương / san hô / cua',[{key:'1',text:'tôm'},{key:'2',text:'cá ngừ đại dương'},{key:'3',text:'san hô'},{key:'4',text:'cua'}],['1','4','3','2'],'easy','Tôm nhỏ nhất, cá ngừ lớn nhất',9),
      r(id,1,'single_choice','Hoạt động nào giúp con người khám phá đáy biển?',[{key:'A',text:'Leo núi'},{key:'B',text:'Lặn biển'},{key:'C',text:'Đi bộ'}],'B','easy','Lặn biển là cách khám phá thế giới dưới nước',10),
      // Ex2 medium – đa dạng sinh học ở Trường Sa
      r(id,2,'single_choice','Tại sao vùng biển Trường Sa có nhiều loài sinh vật?',[{key:'A',text:'Vì nước biển ở đây ngọt'},{key:'B',text:'Vì rạn san hô tạo môi trường sống phong phú'},{key:'C',text:'Vì ở đây không có sóng'}],'B','medium','Rạn san hô là nơi cư trú của hàng nghìn loài sinh vật biển',1),
      r(id,2,'single_choice','Màu sắc của rạn san hô ở Trường Sa như thế nào?',[{key:'A',text:'Chỉ màu trắng'},{key:'B',text:'Sặc sỡ, nhiều màu rực rỡ'},{key:'C',text:'Đen tối'}],'B','medium','Rạn san hô rất sặc sỡ với nhiều loài, màu sắc khác nhau',2),
      r(id,2,'true_false','Vùng biển Trường Sa giàu tài nguyên hải sản. Đúng hay sai?',null,true,'medium','Trường Sa có ngư trường phong phú với nhiều hải sản',3),
      r(id,2,'fill_blank','Rạn san hô là nơi [b1] của rất nhiều loài sinh vật biển.',[{key:'b1',text:''}],{b1:'sinh sống'},'medium','Rạn san hô cung cấp nơi ở và thức ăn cho sinh vật',4),
      r(id,2,'single_choice','Khi lặn biển ở Trường Sa, người ta có thể thấy gì?',[{key:'A',text:'Núi tuyết và gấu trúc'},{key:'B',text:'San hô, cá, tôm, cua đầy màu sắc'},{key:'C',text:'Chỉ có cát trắng'}],'B','medium','Đáy biển Trường Sa đầy san hô và sinh vật phong phú',5),
      r(id,2,'matching','Nối hoạt động với mục đích:',[{key:'A',text:'Lặn biển'},{key:'B',text:'Đánh cá'},{key:'C',text:'Bảo vệ san hô'}],{A:'Khám phá thế giới dưới nước',B:'Khai thác hải sản',C:'Giữ gìn hệ sinh thái biển'},'medium',null,6),
      r(id,2,'true_false','San hô cần ánh sáng mặt trời để phát triển. Đúng hay sai?',null,true,'medium','San hô cần ánh sáng và nước biển trong sạch để tồn tại',7),
      r(id,2,'fill_blank','Ngư dân Việt Nam thường ra [b1] để đánh bắt hải sản.',[{key:'b1',text:''}],{b1:'Trường Sa'},'medium','Trường Sa là ngư trường quan trọng của ngư dân Việt Nam',8),
      r(id,2,'sorting','Sắp xếp các bước khám phá đáy biển: quan sát / mặc đồ lặn / lặn xuống / lên bờ',[{key:'1',text:'quan sát'},{key:'2',text:'mặc đồ lặn'},{key:'3',text:'lặn xuống'},{key:'4',text:'lên bờ'}],['2','3','1','4'],'medium','Mặc đồ → lặn → quan sát → lên bờ',9),
      r(id,2,'single_choice','Điều gì khiến đáy biển Trường Sa trở nên kỳ diệu?',[{key:'A',text:'Sự im lặng hoàn toàn'},{key:'B',text:'Sự phong phú của san hô và các loài sinh vật'},{key:'C',text:'Không có gì đặc biệt'}],'B','medium','Sự đa dạng sinh học tạo nên vẻ đẹp kỳ diệu của Trường Sa',10),
      // Ex3 hard – tầm quan trọng chủ quyền + sinh thái
      r(id,3,'single_choice','Tại sao Trường Sa quan trọng với Việt Nam?',[{key:'A',text:'Chỉ vì có nhiều cá'},{key:'B',text:'Vì là lãnh thổ chủ quyền và có nguồn tài nguyên biển phong phú'},{key:'C',text:'Chỉ vì đẹp'}],'B','hard','Trường Sa quan trọng cả về chủ quyền lãnh thổ lẫn kinh tế',1),
      r(id,3,'single_choice','Bảo vệ rạn san hô quan trọng vì sao?',[{key:'A',text:'Vì san hô dùng để trang trí'},{key:'B',text:'Vì san hô là nơi sống của nhiều loài sinh vật biển'},{key:'C',text:'Vì san hô là thức ăn ngon'}],'B','hard','Rạn san hô là hệ sinh thái biển quan trọng, nuôi dưỡng nhiều loài',2),
      r(id,3,'true_false','Ô nhiễm biển làm hại đến san hô và sinh vật biển. Đúng hay sai?',null,true,'hard','Ô nhiễm phá hủy hệ sinh thái biển, gây hại san hô',3),
      r(id,3,'fill_blank','Trường Sa là một phần lãnh thổ [b1] của nước Việt Nam.',[{key:'b1',text:''}],{b1:'thiêng liêng'},'hard','Trường Sa là lãnh thổ thiêng liêng không thể tách rời',4),
      r(id,3,'matching','Nối hành động với tác động đến biển:',[{key:'A',text:'Đánh bắt cá có chọn lọc'},{key:'B',text:'Xả rác xuống biển'},{key:'C',text:'Bảo vệ rạn san hô'}],{A:'Bảo vệ nguồn lợi hải sản',B:'Ô nhiễm, phá hủy sinh thái',C:'Giữ gìn đa dạng sinh học'},'hard',null,5),
      r(id,3,'single_choice','Trẻ em có thể làm gì để bảo vệ biển Việt Nam?',[{key:'A',text:'Không xả rác, giữ biển sạch'},{key:'B',text:'Đánh cá thật nhiều'},{key:'C',text:'Không cần làm gì'}],'A','hard','Giữ biển sạch là hành động thiết thực bảo vệ môi trường biển',6),
      r(id,3,'fill_blank','Đa dạng sinh học biển cần được [b1] và [b2] bền vững.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bảo vệ',b2:'khai thác'},'hard','Vừa bảo vệ vừa khai thác hợp lý để duy trì bền vững',7),
      r(id,3,'sorting','Sắp xếp theo mức độ quan trọng của Trường Sa: ngư trường / chủ quyền / sinh thái / du lịch',[{key:'1',text:'ngư trường'},{key:'2',text:'chủ quyền'},{key:'3',text:'sinh thái'},{key:'4',text:'du lịch'}],['2','3','1','4'],'hard','Chủ quyền → sinh thái → ngư trường → du lịch',8),
      r(id,3,'true_false','Ngư dân Việt Nam có quyền đánh bắt cá ở vùng biển Trường Sa. Đúng hay sai?',null,true,'hard','Ngư dân Việt Nam có quyền hợp pháp đánh bắt trên vùng biển chủ quyền',9),
      r(id,3,'single_choice','Vì sao cần học về Trường Sa?',[{key:'A',text:'Để biết nơi đó có nhiều tôm cá'},{key:'B',text:'Để hiểu và tự hào về lãnh thổ đất nước, yêu quý và bảo vệ biển'},{key:'C',text:'Để học cách lặn biển'}],'B','hard','Hiểu về Trường Sa giúp học sinh yêu quê hương và ý thức bảo vệ chủ quyền',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1206: Bài 29 – Hồ Gươm ─────────────────────────────────────────────────
  {
    const id = 1206;
    const rows: any[][] = [
      // Ex1 easy – từ vựng Hà Nội / Hồ Gươm
      r(id,1,'single_choice','Hồ Gươm nằm ở thành phố nào?',[{key:'A',text:'Đà Nẵng'},{key:'B',text:'Hà Nội'},{key:'C',text:'Thành phố Hồ Chí Minh'}],'B','easy','Hồ Gươm là hồ nổi tiếng ở trung tâm Hà Nội',1),
      r(id,1,'single_choice','Tháp Rùa nằm ở đâu?',[{key:'A',text:'Giữa Hồ Gươm'},{key:'B',text:'Trên đỉnh núi'},{key:'C',text:'Bên bờ sông Hồng'}],'A','easy','Tháp Rùa nằm trên một hòn đảo nhỏ giữa Hồ Gươm',2),
      r(id,1,'single_choice','Con vật gắn liền với truyền thuyết Hồ Gươm là con gì?',[{key:'A',text:'Rắn'},{key:'B',text:'Rùa'},{key:'C',text:'Cá'}],'B','easy','Con rùa gắn với truyền thuyết Lê Lợi trả gươm',3),
      r(id,1,'true_false','Lê Lợi là vị vua nổi tiếng trong lịch sử Việt Nam. Đúng hay sai?',null,true,'easy','Lê Lợi là người lãnh đạo khởi nghĩa Lam Sơn và lập nhà Lê',4),
      r(id,1,'true_false','Đền Ngọc Sơn nằm ở giữa hồ, xa bờ hoàn toàn. Đúng hay sai?',null,false,'easy','Đền Ngọc Sơn nằm trên đảo nhỏ và có cầu Thê Húc nối vào bờ',5),
      r(id,1,'fill_blank','Hồ Gươm còn được gọi là hồ [b1].',[{key:'b1',text:''}],{b1:'Hoàn Kiếm'},'easy','Hồ Gươm có tên chính thức là hồ Hoàn Kiếm',6),
      r(id,1,'fill_blank','Cầu [b1] màu đỏ dẫn vào đền Ngọc Sơn.',[{key:'b1',text:''}],{b1:'Thê Húc'},'easy','Cầu Thê Húc màu đỏ son nằm trong khuôn viên Hồ Gươm',7),
      r(id,1,'matching','Nối địa danh với mô tả:',[{key:'A',text:'Tháp Rùa'},{key:'B',text:'Đền Ngọc Sơn'},{key:'C',text:'Hồ Gươm'}],{A:'Tháp cổ giữa hồ',B:'Ngôi đền linh thiêng ven hồ',C:'Hồ nổi tiếng ở Hà Nội'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp theo thứ tự từ trong ra ngoài: bờ hồ / Tháp Rùa / mặt nước / cầu Thê Húc',[{key:'1',text:'bờ hồ'},{key:'2',text:'Tháp Rùa'},{key:'3',text:'mặt nước'},{key:'4',text:'cầu Thê Húc'}],['1','4','3','2'],'easy','Bờ → cầu Thê Húc → mặt nước → Tháp Rùa',9),
      r(id,1,'single_choice','Hồ Gươm có nghĩa là gì?',[{key:'A',text:'Hồ của gươm thần'},{key:'B',text:'Hồ nước xanh'},{key:'C',text:'Hồ có nhiều cá'}],'A','easy','Hồ Gươm tên gắn với thanh gươm thần trong truyền thuyết',10),
      // Ex2 medium – truyền thuyết gươm thần
      r(id,2,'single_choice','Theo truyền thuyết, Lê Lợi nhận gươm thần để làm gì?',[{key:'A',text:'Để trang trí'},{key:'B',text:'Để đánh đuổi giặc ngoại xâm'},{key:'C',text:'Để câu cá'}],'B','medium','Gươm thần giúp Lê Lợi lãnh đạo nghĩa quân đánh đuổi giặc Minh',1),
      r(id,2,'single_choice','Sau khi chiến thắng, Lê Lợi trả gươm cho ai?',[{key:'A',text:'Cho dân làng'},{key:'B',text:'Cho Rùa thần ở hồ'},{key:'C',text:'Cho quan lại'}],'B','medium','Rùa vàng nổi lên nhận lại gươm thần',2),
      r(id,2,'true_false','Truyền thuyết Hồ Gươm gắn với chiến thắng chống giặc ngoại xâm. Đúng hay sai?',null,true,'medium','Truyền thuyết nói về cuộc kháng chiến chống giặc Minh thắng lợi',3),
      r(id,2,'fill_blank','Rùa vàng nổi lên nhận lại thanh [b1] từ Lê Lợi.',[{key:'b1',text:''}],{b1:'gươm'},'medium','Gươm thần được trả lại cho rùa vàng dưới hồ',4),
      r(id,2,'single_choice','Hồ Hoàn Kiếm có nghĩa là gì?',[{key:'A',text:'Hồ trả gươm'},{key:'B',text:'Hồ đen'},{key:'C',text:'Hồ lớn nhất'}],'A','medium','Hoàn Kiếm nghĩa là trả gươm, gắn với truyền thuyết',5),
      r(id,2,'matching','Nối sự kiện với ý nghĩa trong truyền thuyết:',[{key:'A',text:'Lê Lợi nhận gươm thần'},{key:'B',text:'Đánh thắng giặc Minh'},{key:'C',text:'Trả gươm cho Rùa vàng'}],{A:'Nhận sứ mệnh bảo vệ đất nước',B:'Gươm thần phù trợ nghĩa quân',C:'Hoàn thành sứ mệnh, gươm về chủ cũ'},'medium',null,6),
      r(id,2,'true_false','Hồ Gươm là biểu tượng văn hóa của Hà Nội. Đúng hay sai?',null,true,'medium','Hồ Gươm là biểu tượng lịch sử và văn hóa của thủ đô Hà Nội',7),
      r(id,2,'fill_blank','Mỗi sáng sớm, người Hà Nội thường ra [b1] để đi bộ và hóng mát.',[{key:'b1',text:''}],{b1:'Hồ Gươm'},'medium','Hồ Gươm là nơi người Hà Nội thường đến thư giãn',8),
      r(id,2,'sorting','Sắp xếp các sự kiện trong truyền thuyết: trả gươm / nhận gươm / đánh giặc / chiến thắng',[{key:'1',text:'trả gươm'},{key:'2',text:'nhận gươm'},{key:'3',text:'đánh giặc'},{key:'4',text:'chiến thắng'}],['2','3','4','1'],'medium','Nhận gươm → đánh giặc → chiến thắng → trả gươm',9),
      r(id,2,'single_choice','Vì sao người Hà Nội yêu quý Hồ Gươm?',[{key:'A',text:'Vì hồ rất lớn'},{key:'B',text:'Vì hồ gắn liền với lịch sử và là biểu tượng thủ đô'},{key:'C',text:'Vì hồ có nhiều cá'}],'B','medium','Hồ Gươm mang giá trị lịch sử, văn hóa sâu sắc',10),
      // Ex3 hard – bối cảnh lịch sử, Hồ Gươm là biểu tượng Hà Nội
      r(id,3,'single_choice','Giặc Minh trong truyền thuyết Hồ Gươm là giặc từ đâu?',[{key:'A',text:'Từ phương Nam'},{key:'B',text:'Từ phương Bắc (Trung Quốc)'},{key:'C',text:'Từ châu Âu'}],'B','hard','Giặc Minh là quân nhà Minh từ Trung Quốc xâm lược Việt Nam',1),
      r(id,3,'single_choice','Hành động trả gươm của Lê Lợi thể hiện điều gì?',[{key:'A',text:'Ông không cần gươm nữa'},{key:'B',text:'Tinh thần yêu hòa bình sau khi hoàn thành nhiệm vụ'},{key:'C',text:'Ông sợ gươm'}],'B','hard','Trả gươm thể hiện tinh thần trọng hòa bình, không hiếu chiến',2),
      r(id,3,'true_false','Hồ Gươm là địa điểm lịch sử quan trọng của thủ đô Hà Nội. Đúng hay sai?',null,true,'hard','Hồ Gươm gắn với lịch sử và là trái tim của Hà Nội',3),
      r(id,3,'fill_blank','Truyền thuyết Hồ Gươm thể hiện tinh thần [b1] và [b2] của người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu nước',b2:'hòa bình'},'hard','Yêu nước trong chiến đấu và yêu hòa bình sau chiến thắng',4),
      r(id,3,'matching','Nối địa danh với ý nghĩa lịch sử / văn hóa:',[{key:'A',text:'Tháp Rùa'},{key:'B',text:'Đền Ngọc Sơn'},{key:'C',text:'Hồ Gươm'}],{A:'Biểu tượng Hồ Gươm, nhắc nhớ truyền thuyết',B:'Nơi thờ phụng anh hùng dân tộc',C:'Biểu tượng thủ đô Hà Nội ngàn năm'},'hard',null,5),
      r(id,3,'single_choice','Tại sao Hồ Gươm được gọi là "trái tim của Hà Nội"?',[{key:'A',text:'Vì hồ có hình trái tim'},{key:'B',text:'Vì hồ nằm ở trung tâm và mang giá trị văn hóa, lịch sử lớn'},{key:'C',text:'Vì hồ là nơi bán đồ ăn'}],'B','hard','Hồ Gươm ở trung tâm, gắn bó với đời sống tâm hồn người Hà Nội',6),
      r(id,3,'fill_blank','Hà Nội đã có lịch sử hơn [b1] năm là thủ đô của Việt Nam.',[{key:'b1',text:''}],{b1:'1000'},'hard','Thăng Long - Hà Nội có lịch sử hơn 1000 năm',7),
      r(id,3,'sorting','Sắp xếp các lý do Hồ Gươm quan trọng theo mức độ: đẹp / lịch sử / biểu tượng Hà Nội / di tích văn hóa',[{key:'1',text:'đẹp'},{key:'2',text:'lịch sử'},{key:'3',text:'biểu tượng Hà Nội'},{key:'4',text:'di tích văn hóa'}],['3','2','4','1'],'hard','Quan trọng nhất: biểu tượng → lịch sử → di tích → đẹp',8),
      r(id,3,'true_false','Mỗi người Việt Nam đều có thể tự hào về Hồ Gươm. Đúng hay sai?',null,true,'hard','Hồ Gươm là niềm tự hào chung của người Hà Nội và cả nước',9),
      r(id,3,'single_choice','Điều quan trọng nhất cần nhớ về Hồ Gươm là gì?',[{key:'A',text:'Hồ có nước xanh'},{key:'B',text:'Hồ gắn với lịch sử chống giặc ngoại xâm và là biểu tượng thủ đô'},{key:'C',text:'Hồ có nhiều cây xanh'}],'B','hard','Giá trị lịch sử và biểu tượng văn hóa là điều quan trọng nhất',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1207: Bài 30 – Cánh đồng quê em ──────────────────────────────────────
  {
    const id = 1207;
    const rows: any[][] = [
      // Ex1 easy – từ vựng cánh đồng
      r(id,1,'single_choice','Cánh đồng là gì?',[{key:'A',text:'Vùng đất rộng lớn trồng lúa và hoa màu'},{key:'B',text:'Vùng núi cao'},{key:'C',text:'Vùng biển sâu'}],'A','easy','Cánh đồng là vùng đất bằng phẳng rộng lớn để trồng trọt',1),
      r(id,1,'single_choice','Lúa chín có màu gì?',[{key:'A',text:'Màu xanh lá'},{key:'B',text:'Màu vàng'},{key:'C',text:'Màu đỏ'}],'B','easy','Lúa chín ngả màu vàng rực',2),
      r(id,1,'single_choice','Con cò thường xuất hiện ở đâu?',[{key:'A',text:'Trên cánh đồng lúa'},{key:'B',text:'Trong rừng rậm'},{key:'C',text:'Dưới đáy biển'}],'A','easy','Cò trắng thường bay và kiếm ăn trên cánh đồng',3),
      r(id,1,'true_false','Bờ đê là con đường đất ngăn nước bên ruộng lúa. Đúng hay sai?',null,true,'easy','Bờ đê ngăn nước, cũng là đường đi trên cánh đồng',4),
      r(id,1,'true_false','Gió thổi làm cho lúa đứng yên không lay động. Đúng hay sai?',null,false,'easy','Gió thổi làm lúa rập rờn, lay động như sóng',5),
      r(id,1,'fill_blank','Mùa lúa [b1], cánh đồng ngập tràn màu vàng rực rỡ.',[{key:'b1',text:''}],{b1:'chín'},'easy','Khi lúa chín, đồng lúa vàng ươm rất đẹp',6),
      r(id,1,'fill_blank','Con [b1] trắng bay lượn trên cánh đồng xanh.',[{key:'b1',text:''}],{b1:'cò'},'easy','Cò trắng là hình ảnh quen thuộc trên đồng ruộng',7),
      r(id,1,'matching','Nối hình ảnh với màu sắc:',[{key:'A',text:'Cánh đồng lúa non'},{key:'B',text:'Cánh đồng lúa chín'},{key:'C',text:'Cò bay trên đồng'}],{A:'Màu xanh mướt',B:'Màu vàng rực',C:'Màu trắng'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp theo mùa lúa: lúa chín vàng / cấy lúa / gặt lúa / lúa non xanh',[{key:'1',text:'lúa chín vàng'},{key:'2',text:'cấy lúa'},{key:'3',text:'gặt lúa'},{key:'4',text:'lúa non xanh'}],['2','4','1','3'],'easy','Cấy → lúa non → chín → gặt',9),
      r(id,1,'single_choice','Từ "rập rờn" miêu tả chuyển động nào của lúa?',[{key:'A',text:'Đứng yên hoàn toàn'},{key:'B',text:'Nhẹ nhàng lay động theo gió'},{key:'C',text:'Gãy đổ hết'}],'B','easy','Rập rờn chỉ sự chuyển động nhẹ nhàng, uyển chuyển',10),
      // Ex2 medium – cảnh sắc cánh đồng
      r(id,2,'single_choice','Hình ảnh cánh đồng trong bài gợi lên cảm xúc gì?',[{key:'A',text:'Sợ hãi, lo lắng'},{key:'B',text:'Yêu mến, thanh bình, tự hào về quê hương'},{key:'C',text:'Buồn chán'}],'B','medium','Cánh đồng quê gợi tình yêu và sự bình yên của làng quê',1),
      r(id,2,'single_choice','Câu "Gió thổi lúa rập rờn như sóng" sử dụng biện pháp nghệ thuật nào?',[{key:'A',text:'Điệp từ'},{key:'B',text:'So sánh'},{key:'C',text:'Ẩn dụ'}],'B','medium','So sánh lúa rập rờn như sóng biển để tả vẻ đẹp sinh động',2),
      r(id,2,'true_false','Cánh đồng lúa xanh gợi lên hình ảnh mùa xuân, no ấm. Đúng hay sai?',null,true,'medium','Lúa xanh tươi gợi lên sức sống và sự no ấm',3),
      r(id,2,'fill_blank','Trên cánh đồng, cò bay [b1] trắng muốt trên nền lúa xanh.',[{key:'b1',text:''}],{b1:'lả'},'medium','Cò bay lả là hình ảnh thơ mộng của đồng quê',4),
      r(id,2,'single_choice','Hình ảnh "bờ đê" trong bài gắn với cuộc sống của ai?',[{key:'A',text:'Người dân vùng núi'},{key:'B',text:'Người nông dân làng quê'},{key:'C',text:'Người dân thành phố'}],'B','medium','Bờ đê gắn với cuộc sống của người nông dân',5),
      r(id,2,'matching','Nối hình ảnh với cảm giác gợi lên:',[{key:'A',text:'Lúa vàng trải dài'},{key:'B',text:'Gió thổi mát'},{key:'C',text:'Cò trắng bay'}],{A:'No ấm, trù phú',B:'Thoải mái, dễ chịu',C:'Thơ mộng, bình yên'},'medium',null,6),
      r(id,2,'true_false','Bài văn miêu tả cánh đồng chỉ vào mùa đông giá lạnh. Đúng hay sai?',null,false,'medium','Bài miêu tả cánh đồng lúa xanh và chín vàng, mùa trồng trọt',7),
      r(id,2,'fill_blank','Lúa [b1] đung đưa theo chiều gió, tạo nên hình ảnh đẹp.',[{key:'b1',text:''}],{b1:'xanh'},'medium','Lúa xanh đung đưa là hình ảnh sống động của đồng ruộng',8),
      r(id,2,'sorting','Sắp xếp từ xa đến gần khi nhìn cánh đồng: bờ đê / lúa chín / chân trời / cò bay',[{key:'1',text:'bờ đê'},{key:'2',text:'lúa chín'},{key:'3',text:'chân trời'},{key:'4',text:'cò bay'}],['3','4','2','1'],'medium','Xa: chân trời → cò bay → lúa chín → gần: bờ đê',9),
      r(id,2,'single_choice','Tại sao tác giả yêu cánh đồng quê?',[{key:'A',text:'Vì cánh đồng rộng lớn'},{key:'B',text:'Vì nơi đó gắn với ký ức tuổi thơ và tình yêu quê hương'},{key:'C',text:'Vì cánh đồng cho nhiều lúa'}],'B','medium','Tình yêu cánh đồng gắn với tình yêu quê hương, ký ức tuổi thơ',10),
      // Ex3 hard – hình ảnh, ngôn ngữ miêu tả, tình yêu quê hương
      r(id,3,'single_choice','Tác dụng của hình ảnh so sánh trong miêu tả cánh đồng là gì?',[{key:'A',text:'Làm câu văn dài hơn'},{key:'B',text:'Giúp người đọc hình dung cảnh vật sinh động, gần gũi'},{key:'C',text:'Làm câu văn khó hiểu hơn'}],'B','hard','So sánh giúp tạo hình ảnh sống động, cảnh vật trở nên gần gũi',1),
      r(id,3,'single_choice','Câu "Cánh đồng lúa như tấm thảm vàng khổng lồ" dùng biện pháp gì?',[{key:'A',text:'Điệp từ'},{key:'B',text:'Nhân hóa'},{key:'C',text:'So sánh'}],'C','hard','So sánh cánh đồng với tấm thảm vàng để tả vẻ đẹp hoành tráng',2),
      r(id,3,'true_false','Ngôn ngữ miêu tả giàu hình ảnh làm cho bài văn thêm sinh động. Đúng hay sai?',null,true,'hard','Hình ảnh phong phú giúp bài văn miêu tả thêm hấp dẫn',3),
      r(id,3,'fill_blank','Tình yêu quê hương thể hiện qua việc [b1] và trân trọng những hình ảnh quen thuộc.',[{key:'b1',text:''}],{b1:'nhớ'},'hard','Nhớ và yêu những hình ảnh quen thuộc là biểu hiện yêu quê',4),
      r(id,3,'matching','Nối từ ngữ miêu tả với hình ảnh tương ứng:',[{key:'A',text:'Rập rờn'},{key:'B',text:'Trắng muốt'},{key:'C',text:'Vàng ươm'}],{A:'Lúa lay động theo gió',B:'Cánh cò bay',C:'Cánh đồng lúa chín'},'hard',null,5),
      r(id,3,'single_choice','Câu nào hay nhất miêu tả cánh đồng mùa gặt?',[{key:'A',text:'Cánh đồng có nhiều lúa'},{key:'B',text:'Lúa chín vàng trải dài như tấm thảm, hương thơm ngào ngạt theo gió'},{key:'C',text:'Đồng lúa ở đó'}],'B','hard','Câu B dùng so sánh và tính từ gợi cảm, miêu tả sinh động',6),
      r(id,3,'fill_blank','Hình ảnh [b1] bay trên cánh đồng là biểu tượng của làng quê Việt Nam.',[{key:'b1',text:''}],{b1:'cò trắng'},'hard','Cò trắng là biểu tượng quen thuộc của làng quê Việt',7),
      r(id,3,'sorting','Sắp xếp theo trình tự miêu tả hay nhất: tình cảm / màu sắc / âm thanh / chuyển động',[{key:'1',text:'tình cảm'},{key:'2',text:'màu sắc'},{key:'3',text:'âm thanh'},{key:'4',text:'chuyển động'}],['2','4','3','1'],'hard','Tả cảnh nên bắt đầu từ màu sắc → chuyển động → âm thanh → cảm xúc',8),
      r(id,3,'true_false','Bài "Cánh đồng quê em" giúp học sinh thêm yêu quý thiên nhiên và quê hương. Đúng hay sai?',null,true,'hard','Qua hình ảnh cánh đồng, bài vun đắp tình yêu quê hương',9),
      r(id,3,'single_choice','Vì sao cần viết về cánh đồng bằng những từ ngữ đẹp và giàu cảm xúc?',[{key:'A',text:'Để dài hơn'},{key:'B',text:'Để truyền tình yêu và sự trân trọng thiên nhiên, quê hương đến người đọc'},{key:'C',text:'Để khó đọc hơn'}],'B','hard','Ngôn ngữ đẹp giúp bài văn truyền cảm hứng yêu quê hương',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── Insert all ─────────────────────────────────────────────────────────────
  for (const lesson of lessons) {
    await conn.execute(`DELETE FROM quizzes WHERE lessonId = ?`, [lesson.id]);
    for (const row of lesson.rows) {
      await conn.execute(INSERT, row);
    }
    console.log(`✅ lessonId ${lesson.id} — ${lesson.rows.length} questions inserted`);
  }

  await conn.end();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });
