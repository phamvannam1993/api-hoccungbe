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

  // ─── 1186: Bài 9: Vẽ chim ───────────────────────────────────────────────────
  {
    const id = 1186;
    const rows: any[][] = [
      // Ex1 easy - bird body parts and colors
      r(id,1,'single_choice','Bộ phận nào giúp chim bay được?',[{key:'A',text:'Mỏ'},{key:'B',text:'Cánh'},{key:'C',text:'Chân'}],'B','easy','Chim dùng cánh để bay',1),
      r(id,1,'single_choice','Chim dùng bộ phận nào để ăn?',[{key:'A',text:'Đuôi'},{key:'B',text:'Lông'},{key:'C',text:'Mỏ'}],'C','easy','Chim dùng mỏ để mổ và ăn thức ăn',2),
      r(id,1,'single_choice','Bộ phận nào phủ khắp thân chim?',[{key:'A',text:'Lông'},{key:'B',text:'Vảy'},{key:'C',text:'Da trần'}],'A','easy','Lông phủ khắp thân chim, giữ ấm và giúp bay',3),
      r(id,1,'true_false','Chim có hai cánh và hai chân. Đúng hay sai?',null,true,'easy','Hầu hết các loài chim đều có hai cánh và hai chân',4),
      r(id,1,'true_false','Đuôi chim không có tác dụng gì. Đúng hay sai?',null,false,'easy','Đuôi chim giúp định hướng khi bay',5),
      r(id,1,'fill_blank','Chim hót bằng [b1] và đậu trên cành bằng [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mỏ',b2:'chân'},'easy','Chim hót bằng mỏ, đậu bằng chân',6),
      r(id,1,'fill_blank','Màu lông của chim vành khuyên là [b1].',[{key:'b1',text:''}],{b1:'xanh'},'easy','Chim vành khuyên có lông màu xanh lá',7),
      r(id,1,'matching','Nối bộ phận chim với công dụng:',[{key:'A',text:'Mỏ'},{key:'B',text:'Cánh'},{key:'C',text:'Chân'}],{A:'Ăn mổ thức ăn',B:'Bay lên trời',C:'Đậu trên cành'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các bộ phận chim từ đầu đến đuôi: đuôi, mỏ, cánh, thân',[{key:'1',text:'đuôi'},{key:'2',text:'mỏ'},{key:'3',text:'cánh'},{key:'4',text:'thân'}],['2','4','3','1'],'easy','Mỏ → Thân → Cánh → Đuôi',9),
      r(id,1,'single_choice','Chim cánh cụt có màu lông gì?',[{key:'A',text:'Vàng'},{key:'B',text:'Đen trắng'},{key:'C',text:'Xanh lá'}],'B','easy','Chim cánh cụt có lông đen trắng đặc trưng',10),
      // Ex2 medium - observe and draw steps
      r(id,2,'single_choice','Khi vẽ chim, bước đầu tiên là vẽ gì?',[{key:'A',text:'Vẽ lông'},{key:'B',text:'Vẽ hình tròn cho thân và đầu'},{key:'C',text:'Vẽ chân'}],'B','medium','Bước đầu tiên vẽ hình dạng cơ bản: đầu và thân',1),
      r(id,2,'single_choice','Để vẽ cánh chim đang bay, ta vẽ hình gì?',[{key:'A',text:'Hình tam giác chỉ lên'},{key:'B',text:'Đường cong mở rộng hai bên'},{key:'C',text:'Hình chữ nhật'}],'B','medium','Cánh chim đang bay có dạng đường cong mở rộng',2),
      r(id,2,'true_false','Khi vẽ chim, ta nên vẽ chi tiết lông trước rồi mới vẽ thân. Đúng hay sai?',null,false,'medium','Nên vẽ hình dạng tổng thể (thân, đầu) trước rồi mới thêm chi tiết',3),
      r(id,2,'true_false','Màu sắc chim có thể rất đa dạng tùy loài. Đúng hay sai?',null,true,'medium','Mỗi loài chim có màu lông riêng biệt',4),
      r(id,2,'sorting','Sắp xếp các bước vẽ chim đúng thứ tự: tô màu, vẽ chi tiết, phác thảo hình dạng, thêm chân và mỏ',[{key:'1',text:'tô màu'},{key:'2',text:'vẽ chi tiết'},{key:'3',text:'phác thảo hình dạng'},{key:'4',text:'thêm chân và mỏ'}],['3','4','2','1'],'medium','Phác thảo → Thêm chi tiết → Vẽ chân mỏ → Tô màu',5),
      r(id,2,'fill_blank','Để vẽ chim trông sinh động, ta cần quan sát [b1] của chim thật.',[{key:'b1',text:''}],{b1:'dáng vẻ'},'medium','Quan sát dáng vẻ, tư thế chim thật giúp vẽ sinh động hơn',6),
      r(id,2,'matching','Nối loài chim với đặc điểm nổi bật:',[{key:'A',text:'Công'},{key:'B',text:'Vẹt'},{key:'C',text:'Chim sẻ'}],{A:'Đuôi dài rực rỡ',B:'Lông nhiều màu sắc',C:'Nhỏ bé nâu xám'},'medium',null,7),
      r(id,2,'single_choice','Chim nào thường được vẽ trong tranh Việt Nam dân gian?',[{key:'A',text:'Đà điểu'},{key:'B',text:'Chim phượng hoàng'},{key:'C',text:'Chim cánh cụt'}],'B','medium','Phượng hoàng là biểu tượng trong tranh dân gian Việt Nam',8),
      r(id,2,'fill_blank','Khi quan sát chim, em thấy mỏ chim có hình dạng [b1] tùy theo loài ăn gì.',[{key:'b1',text:''}],{b1:'khác nhau'},'medium','Mỏ chim biến đổi theo loại thức ăn của từng loài',9),
      r(id,2,'true_false','Chim hồng hạc có màu hồng đặc trưng. Đúng hay sai?',null,true,'medium','Chim hồng hạc nổi tiếng với bộ lông màu hồng',10),
      // Ex3 hard - adjectives for birds
      r(id,3,'single_choice','Từ nào mô tả tiếng chim hót?',[{key:'A',text:'Ồn ào'},{key:'B',text:'Véo von'},{key:'C',text:'Lặng im'}],'B','hard','Tiếng chim hót thường được miêu tả là "véo von"',1),
      r(id,3,'single_choice','Từ "rực rỡ" thường dùng để tả điều gì của chim?',[{key:'A',text:'Tiếng hót'},{key:'B',text:'Tốc độ bay'},{key:'C',text:'Màu lông'}],'C','hard','Rực rỡ là tính từ chỉ màu sắc đẹp, sặc sỡ',2),
      r(id,3,'matching','Nối tính từ với loài chim phù hợp:',[{key:'A',text:'Uyển chuyển'},{key:'B',text:'Hùng dũng'},{key:'C',text:'Nhỏ nhắn'}],{A:'Thiên nga',B:'Đại bàng',C:'Chim sẻ'},'hard',null,3),
      r(id,3,'fill_blank','Bộ lông chim công [b1] và [b2] dưới ánh nắng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'óng ánh',b2:'rực rỡ'},'hard','Lông công có màu sắc óng ánh, rực rỡ dưới ánh nắng',4),
      r(id,3,'true_false','Từ "mềm mại" có thể dùng để tả lông chim. Đúng hay sai?',null,true,'hard','Lông chim thường mềm mại, đặc biệt lông tơ',5),
      r(id,3,'sorting','Sắp xếp các tính từ từ yếu đến mạnh: rực rỡ, hơi đẹp, lộng lẫy, đẹp',[{key:'1',text:'rực rỡ'},{key:'2',text:'hơi đẹp'},{key:'3',text:'lộng lẫy'},{key:'4',text:'đẹp'}],['2','4','1','3'],'hard','Hơi đẹp → Đẹp → Rực rỡ → Lộng lẫy',6),
      r(id,3,'single_choice','Câu nào dùng tính từ đúng để tả chim?',[{key:'A',text:'Con chim bay to lớn'},{key:'B',text:'Con chim hót véo von trên cành xanh'},{key:'C',text:'Con chim chạy nhanh'}],'B','hard','Câu B dùng đúng: véo von tả tiếng hót, xanh tả màu cành',7),
      r(id,3,'fill_blank','Đôi cánh chim [b1] vươn rộng trên bầu trời [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'khỏe mạnh',b2:'bao la'},'hard','Tả đôi cánh chim khỏe mạnh trên bầu trời bao la',8),
      r(id,3,'true_false','Từ "nhanh nhẹn" có thể dùng tả động tác chim. Đúng hay sai?',null,true,'hard','Nhanh nhẹn là tính từ hợp để tả cử động của chim',9),
      r(id,3,'matching','Nối câu miêu tả với bộ phận chim được tả:',[{key:'A',text:'Sắc bén, cứng rắn'},{key:'B',text:'Mềm mại, đủ màu sắc'},{key:'C',text:'Dài thướt tha'}],{A:'Mỏ chim',B:'Lông chim',C:'Đuôi chim công'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1187: Bài 10: Khủng long ──────────────────────────────────────────────
  {
    const id = 1187;
    const rows: any[][] = [
      // Ex1 easy - dinosaur vocabulary
      r(id,1,'single_choice','Khủng long sống ở thời đại nào?',[{key:'A',text:'Thời hiện đại'},{key:'B',text:'Thời cổ đại'},{key:'C',text:'Thế kỷ 20'}],'B','easy','Khủng long sống ở thời cổ đại, hàng triệu năm trước',1),
      r(id,1,'single_choice','Từ "khổng lồ" có nghĩa là gì?',[{key:'A',text:'Rất nhỏ'},{key:'B',text:'Rất to lớn'},{key:'C',text:'Rất nhanh'}],'B','easy','Khổng lồ nghĩa là to lớn phi thường',2),
      r(id,1,'single_choice','Khủng long dùng gì để tự vệ và tấn công?',[{key:'A',text:'Móng vuốt và răng'},{key:'B',text:'Cánh'},{key:'C',text:'Lông'}],'A','easy','Khủng long ăn thịt dùng móng vuốt sắc và răng nhọn',3),
      r(id,1,'true_false','Khủng long đã tuyệt chủng, không còn sống trên Trái Đất. Đúng hay sai?',null,true,'easy','Khủng long đã tuyệt chủng khoảng 66 triệu năm trước',4),
      r(id,1,'true_false','Tất cả khủng long đều rất to lớn. Đúng hay sai?',null,false,'easy','Có nhiều loài khủng long nhỏ như gà tây',5),
      r(id,1,'fill_blank','Khủng long [b1] sống vào thời [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'khổng lồ',b2:'cổ đại'},'easy','Khủng long khổng lồ sống vào thời cổ đại',6),
      r(id,1,'fill_blank','Loài khủng long lớn nhất có tên là [b1].',[{key:'b1',text:''}],{b1:'T-Rex'},'easy','T-Rex (Tyrannosaurus Rex) là một trong những khủng long lớn nhất',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Khổng lồ'},{key:'B',text:'Tuyệt chủng'},{key:'C',text:'Thời cổ đại'}],{A:'Rất to lớn',B:'Không còn tồn tại',C:'Thời xa xưa'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các bộ phận khủng long từ đầu đến đuôi: đuôi dài, đầu to, thân lớn, cổ dài',[{key:'1',text:'đuôi dài'},{key:'2',text:'đầu to'},{key:'3',text:'thân lớn'},{key:'4',text:'cổ dài'}],['2','4','3','1'],'easy','Đầu → Cổ → Thân → Đuôi',9),
      r(id,1,'true_false','Khủng long là loài bò sát cổ đại. Đúng hay sai?',null,true,'easy','Khủng long thuộc nhóm bò sát (reptile) thời cổ đại',10),
      // Ex2 medium - what they ate, how big
      r(id,2,'single_choice','Khủng long ăn cỏ và lá cây gọi là?',[{key:'A',text:'Khủng long ăn thịt'},{key:'B',text:'Khủng long ăn cỏ'},{key:'C',text:'Khủng long ăn tạp'}],'B','medium','Khủng long ăn thực vật được gọi là khủng long ăn cỏ (herbivore)',1),
      r(id,2,'single_choice','Loài khủng long nào nổi tiếng nhất?',[{key:'A',text:'Brontosaurus'},{key:'B',text:'T-Rex'},{key:'C',text:'Triceratops'}],'B','medium','T-Rex (Tyrannosaurus Rex) là loài nổi tiếng nhất',2),
      r(id,2,'true_false','Khủng long to nhất có thể cao hơn 3 tầng nhà. Đúng hay sai?',null,true,'medium','Một số khủng long cao tới 15-18 mét, hơn 5 tầng nhà',3),
      r(id,2,'fill_blank','Khủng long ăn thịt thường có [b1] sắc nhọn và [b2] vuốt dài.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'răng',b2:'móng'},'medium','Răng sắc và móng vuốt dài giúp khủng long săn mồi',4),
      r(id,2,'matching','Nối loài khủng long với đặc điểm:',[{key:'A',text:'T-Rex'},{key:'B',text:'Brachiosaurus'},{key:'C',text:'Triceratops'}],{A:'Hai chân, ăn thịt',B:'Cổ dài, ăn lá cây',C:'Ba sừng trên đầu'},'medium',null,5),
      r(id,2,'single_choice','Khủng long Brachiosaurus ăn gì?',[{key:'A',text:'Ăn thịt các loài khủng long khác'},{key:'B',text:'Ăn lá và cành cây cao'},{key:'C',text:'Ăn cá dưới sông'}],'B','medium','Brachiosaurus có cổ dài ăn lá và cành cây trên cao',6),
      r(id,2,'fill_blank','Khủng long sống vào thời [b1], cách đây hơn [b2] triệu năm.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cổ đại',b2:'66'},'medium','Khủng long tuyệt chủng khoảng 66 triệu năm trước',7),
      r(id,2,'true_false','Khủng long và con người từng sống cùng thời. Đúng hay sai?',null,false,'medium','Khủng long tuyệt chủng trước khi con người xuất hiện hàng triệu năm',8),
      r(id,2,'sorting','Sắp xếp kích thước từ nhỏ đến lớn: voi, gà, khủng long, chó',[{key:'1',text:'voi'},{key:'2',text:'gà'},{key:'3',text:'khủng long'},{key:'4',text:'chó'}],['2','4','1','3'],'medium','Gà < Chó < Voi < Khủng long',9),
      r(id,2,'single_choice','Khủng long ba sừng Triceratops dùng sừng để làm gì?',[{key:'A',text:'Để hát'},{key:'B',text:'Để tự vệ và chiến đấu'},{key:'C',text:'Để bơi'}],'B','medium','Triceratops dùng 3 sừng để chống lại kẻ thù',10),
      // Ex3 hard - classify herbivore/carnivore, compare to modern animals
      r(id,3,'single_choice','Loài nào ngày nay được coi là hậu duệ của khủng long?',[{key:'A',text:'Cá voi'},{key:'B',text:'Chim'},{key:'C',text:'Cá sấu'}],'B','hard','Theo khoa học, chim là hậu duệ trực tiếp của khủng long',1),
      r(id,3,'matching','Phân loại khủng long ăn thịt hay ăn cỏ:',[{key:'A',text:'T-Rex'},{key:'B',text:'Brachiosaurus'},{key:'C',text:'Velociraptor'}],{A:'Ăn thịt',B:'Ăn cỏ',C:'Ăn thịt'},'hard',null,2),
      r(id,3,'true_false','Khủng long ăn cỏ thường sống theo đàn để bảo vệ nhau. Đúng hay sai?',null,true,'hard','Nhiều loài khủng long ăn cỏ sống theo đàn như trâu bò ngày nay',3),
      r(id,3,'fill_blank','Khủng long [b1] giống voi ngày nay ở chỗ đều [b2] và ăn thực vật.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ăn cỏ',b2:'to lớn'},'hard','Khủng long ăn cỏ to lớn, ăn thực vật giống voi hiện đại',4),
      r(id,3,'sorting','Sắp xếp thời gian từ xa đến gần: khủng long xuất hiện, con người xuất hiện, khủng long tuyệt chủng, trái đất hình thành',[{key:'1',text:'khủng long xuất hiện'},{key:'2',text:'con người xuất hiện'},{key:'3',text:'khủng long tuyệt chủng'},{key:'4',text:'trái đất hình thành'}],['4','1','3','2'],'hard','Trái đất → Khủng long xuất hiện → Tuyệt chủng → Con người',5),
      r(id,3,'single_choice','Đặc điểm nào giúp phân biệt khủng long ăn thịt với ăn cỏ?',[{key:'A',text:'Kích thước cơ thể'},{key:'B',text:'Hình dạng răng'},{key:'C',text:'Màu da'}],'B','hard','Khủng long ăn thịt có răng nhọn sắc, ăn cỏ có răng phẳng',6),
      r(id,3,'fill_blank','Khủng long Velociraptor nhỏ hơn T-Rex nhưng [b1] và [b2] hơn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhanh',b2:'lanh lợi'},'hard','Velociraptor nhỏ hơn nhưng nhanh và lanh lợi hơn T-Rex',7),
      r(id,3,'true_false','Cá sấu ngày nay có nhiều nét giống khủng long thời cổ đại. Đúng hay sai?',null,true,'hard','Cá sấu được coi là "hóa thạch sống" gần giống khủng long xưa',8),
      r(id,3,'matching','So sánh khủng long với động vật ngày nay:',[{key:'A',text:'T-Rex'},{key:'B',text:'Brachiosaurus'},{key:'C',text:'Pterodactyl'}],{A:'Giống sư tử (săn mồi dữ tợn)',B:'Giống hươu cao cổ (cổ dài)',C:'Giống chim (biết bay)'},'hard',null,9),
      r(id,3,'single_choice','Tại sao khủng long bị tuyệt chủng?',[{key:'A',text:'Vì con người săn bắt hết'},{key:'B',text:'Vì thiên thạch va vào Trái Đất và khí hậu thay đổi'},{key:'C',text:'Vì chúng ăn hết thức ăn'}],'B','hard','Theo khoa học, thiên thạch va vào Trái Đất 66 triệu năm trước gây tuyệt chủng',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1188: Bài 11: Sự tích cây thì là ──────────────────────────────────────
  {
    const id = 1188;
    const rows: any[][] = [
      // Ex1 easy - herb/legend vocabulary, story characters
      r(id,1,'single_choice','Cây thì là là loại cây gì?',[{key:'A',text:'Cây lấy gỗ'},{key:'B',text:'Cây rau gia vị'},{key:'C',text:'Cây ăn quả'}],'B','easy','Cây thì là là loại rau gia vị dùng trong nấu ăn',1),
      r(id,1,'single_choice','Từ "sự tích" có nghĩa là gì?',[{key:'A',text:'Câu chuyện giải thích nguồn gốc của sự vật'},{key:'B',text:'Bài thơ về thiên nhiên'},{key:'C',text:'Bài hát dân ca'}],'A','easy','Sự tích là câu chuyện dân gian giải thích nguồn gốc sự vật',2),
      r(id,1,'single_choice','Cây thì là thường được dùng để?',[{key:'A',text:'Làm thuốc chữa bệnh nặng'},{key:'B',text:'Nấu canh, ướp cá'},{key:'C',text:'Đóng đồ gỗ'}],'B','easy','Thì là dùng làm gia vị nấu canh, ướp cá rất phổ biến',3),
      r(id,1,'true_false','Câu chuyện sự tích thường có yếu tố thần kỳ. Đúng hay sai?',null,true,'easy','Sự tích dân gian thường có phép màu, nhân vật thần kỳ',4),
      r(id,1,'true_false','Cây thì là có lá to như lá chuối. Đúng hay sai?',null,false,'easy','Cây thì là có lá nhỏ, mảnh như sợi',5),
      r(id,1,'fill_blank','Cây thì là có lá [b1] như sợi chỉ và mùi [b2] đặc trưng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mảnh',b2:'thơm'},'easy','Lá thì là mảnh, có mùi thơm đặc trưng',6),
      r(id,1,'fill_blank','Trong câu chuyện sự tích, thường có nhân vật [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'người',b2:'thần'},'easy','Sự tích có nhân vật người và thần linh',7),
      r(id,1,'matching','Nối từ với nghĩa đúng:',[{key:'A',text:'Sự tích'},{key:'B',text:'Gia vị'},{key:'C',text:'Hương thơm'}],{A:'Câu chuyện nguồn gốc',B:'Chất nêm nếm món ăn',C:'Mùi dễ chịu'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các loại rau gia vị: hành, ngò, thì là, tía tô theo thứ tự bảng chữ cái',[{key:'1',text:'hành'},{key:'2',text:'ngò'},{key:'3',text:'thì là'},{key:'4',text:'tía tô'}],['1','2','3','4'],'easy','Hành, Ngò, Thì là, Tía tô',9),
      r(id,1,'true_false','Thì là có màu xanh lá cây. Đúng hay sai?',null,true,'easy','Cây thì là có màu xanh lá cây',10),
      // Ex2 medium - origin of dill herb
      r(id,2,'single_choice','Vì sao người ta kể sự tích về cây thì là?',[{key:'A',text:'Vì cây thì là quý hiếm'},{key:'B',text:'Để giải thích nguồn gốc và ý nghĩa của cây'},{key:'C',text:'Vì cây thì là đẹp nhất'}],'B','medium','Sự tích giải thích nguồn gốc, tên gọi và ý nghĩa của loài cây',1),
      r(id,2,'single_choice','Điều gì thường xảy ra trong kết thúc của sự tích?',[{key:'A',text:'Mọi thứ trở về như cũ'},{key:'B',text:'Xuất hiện sự vật mới hoặc hiện tượng mới'},{key:'C',text:'Nhân vật xấu thắng'}],'B','medium','Sự tích thường kết thúc bằng sự ra đời của sự vật/hiện tượng được giải thích',2),
      r(id,2,'true_false','Người Việt dùng thì là từ rất lâu đời. Đúng hay sai?',null,true,'medium','Thì là là gia vị quen thuộc trong ẩm thực Việt từ xa xưa',3),
      r(id,2,'fill_blank','Câu chuyện sự tích thường mang bài học về [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'lòng tốt',b2:'sự biết ơn'},'medium','Sự tích dạy về lòng tốt, sự biết ơn và đức hạnh',4),
      r(id,2,'matching','Nối câu hỏi với câu trả lời về cây thì là:',[{key:'A',text:'Thì là dùng để làm gì?'},{key:'B',text:'Thì là có lá như thế nào?'},{key:'C',text:'Thì là có mùi gì?'}],{A:'Gia vị nấu ăn',B:'Lá mảnh như sợi',C:'Mùi thơm đặc trưng'},'medium',null,5),
      r(id,2,'single_choice','Sự tích cây thì là thuộc loại văn học nào?',[{key:'A',text:'Văn học hiện đại'},{key:'B',text:'Văn học dân gian'},{key:'C',text:'Văn học nước ngoài'}],'B','medium','Sự tích là thể loại văn học dân gian truyền miệng',6),
      r(id,2,'fill_blank','Mùi thơm của cây thì là làm cho [b1] trở nên [b2] hơn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'món ăn',b2:'thơm ngon'},'medium','Thì là làm cho món ăn thơm ngon hơn',7),
      r(id,2,'true_false','Sự tích là câu chuyện có thật, ghi chép lịch sử chính xác. Đúng hay sai?',null,false,'medium','Sự tích là câu chuyện dân gian hư cấu để giải thích nguồn gốc',8),
      r(id,2,'sorting','Sắp xếp các bước trong một câu chuyện sự tích: kết thúc với sự ra đời của cây, gặp khó khăn, nhân vật chính xuất hiện, được giúp đỡ kỳ diệu',[{key:'1',text:'kết thúc với sự ra đời của cây'},{key:'2',text:'gặp khó khăn'},{key:'3',text:'nhân vật chính xuất hiện'},{key:'4',text:'được giúp đỡ kỳ diệu'}],['3','2','4','1'],'medium','Nhân vật xuất hiện → Gặp khó khăn → Được giúp đỡ → Cây ra đời',9),
      r(id,2,'single_choice','Cây thì là thường mọc ở đâu?',[{key:'A',text:'Trong rừng sâu'},{key:'B',text:'Vườn rau và bờ sông'},{key:'C',text:'Trên núi cao'}],'B','medium','Thì là thường được trồng trong vườn rau hoặc mọc ven sông',10),
      // Ex3 hard - legend features, cultural knowledge
      r(id,3,'single_choice','Đặc điểm nào KHÔNG phải của truyện sự tích?',[{key:'A',text:'Có yếu tố thần kỳ'},{key:'B',text:'Giải thích nguồn gốc sự vật'},{key:'C',text:'Ghi chép sự kiện lịch sử có thật'}],'C','hard','Sự tích là hư cấu dân gian, không ghi chép lịch sử thật',1),
      r(id,3,'matching','Nối thể loại văn học với đặc điểm:',[{key:'A',text:'Sự tích'},{key:'B',text:'Thần thoại'},{key:'C',text:'Truyện cổ tích'}],{A:'Giải thích nguồn gốc sự vật',B:'Kể về các vị thần tạo ra thế giới',C:'Kể về nhân vật thiện ác rõ ràng'},'hard',null,2),
      r(id,3,'true_false','Câu chuyện sự tích phản ánh quan niệm của người xưa về thiên nhiên. Đúng hay sai?',null,true,'hard','Sự tích thể hiện cách người xưa hiểu và giải thích thiên nhiên',3),
      r(id,3,'fill_blank','Người Việt dùng cây thì là trong món [b1] và canh [b2] rất ngon.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cá',b2:'rau'},'hard','Thì là dùng ướp cá và nấu canh rau rất phổ biến',4),
      r(id,3,'sorting','Sắp xếp các yếu tố tạo nên giá trị của sự tích: nghệ thuật kể chuyện, bài học đạo đức, giải thích hiện tượng, bảo tồn văn hóa',[{key:'1',text:'nghệ thuật kể chuyện'},{key:'2',text:'bài học đạo đức'},{key:'3',text:'giải thích hiện tượng'},{key:'4',text:'bảo tồn văn hóa'}],['3','2','1','4'],'hard','Giải thích → Bài học → Nghệ thuật → Bảo tồn văn hóa',5),
      r(id,3,'single_choice','Tại sao sự tích được truyền từ đời này sang đời khác?',[{key:'A',text:'Vì đó là quy định pháp luật'},{key:'B',text:'Vì chúng chứa đựng bài học và văn hóa cộng đồng'},{key:'C',text:'Vì chúng đã được viết thành sách giáo khoa'}],'B','hard','Sự tích truyền qua miệng vì chứa bài học quý và bản sắc văn hóa',6),
      r(id,3,'fill_blank','Sự tích phản ánh [b1] sống và [b2] của người Việt xưa.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'lối',b2:'tâm hồn'},'hard','Sự tích phản ánh lối sống và tâm hồn của người Việt xưa',7),
      r(id,3,'true_false','Nhiều loài cây, con vật, hiện tượng tự nhiên đều có sự tích giải thích. Đúng hay sai?',null,true,'hard','Văn hóa dân gian Việt có nhiều sự tích về cây cỏ, động vật, thời tiết',8),
      r(id,3,'matching','Nối sự tích với điều được giải thích:',[{key:'A',text:'Sự tích cây thì là'},{key:'B',text:'Sự tích hồ Gươm'},{key:'C',text:'Sự tích bánh chưng'}],{A:'Nguồn gốc cây thì là',B:'Nguồn gốc hồ Hoàn Kiếm',C:'Nguồn gốc bánh Tết'},'hard',null,9),
      r(id,3,'single_choice','Bài học nào thường thấy trong truyện sự tích?',[{key:'A',text:'Người tốt được phần thưởng, kẻ xấu bị trừng phạt'},{key:'B',text:'Ai mạnh người đó thắng'},{key:'C',text:'Cứ làm theo ý mình là đúng'}],'A','hard','Sự tích truyền đạo lý: thiện thắng ác, tốt được thưởng',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1189: Bài 12: Bờ tre đón khách ────────────────────────────────────────
  {
    const id = 1189;
    const rows: any[][] = [
      // Ex1 easy - hospitality vocabulary
      r(id,1,'single_choice','Từ "đón khách" có nghĩa là gì?',[{key:'A',text:'Tiếp nhận và chào mừng người đến thăm'},{key:'B',text:'Đuổi người ra khỏi nhà'},{key:'C',text:'Nấu ăn cho khách'}],'A','easy','Đón khách là chào đón, tiếp nhận người đến thăm',1),
      r(id,1,'single_choice','Cổng làng thường làm bằng gì?',[{key:'A',text:'Kim loại'},{key:'B',text:'Tre và gỗ'},{key:'C',text:'Bê tông'}],'B','easy','Cổng làng truyền thống Việt Nam thường làm bằng tre và gỗ',2),
      r(id,1,'single_choice','Khi có khách đến, chủ nhà thường nói gì?',[{key:'A',text:'Đi đi'},{key:'B',text:'Mời bác vào chơi'},{key:'C',text:'Không có ai ở nhà'}],'B','easy','Câu chào đón lịch sự khi có khách là mời vào chơi',3),
      r(id,1,'true_false','Bờ tre là hàng tre trồng ven làng. Đúng hay sai?',null,true,'easy','Bờ tre là hàng tre thường trồng quanh làng Việt Nam',4),
      r(id,1,'true_false','Người Việt không thích đón khách về nhà. Đúng hay sai?',null,false,'easy','Người Việt nổi tiếng hiếu khách, thích mời khách về nhà',5),
      r(id,1,'fill_blank','Khi có khách đến nhà, ta phải [b1] nhiệt tình và [b2] khách chu đáo.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đón',b2:'tiếp'},'easy','Đón nhiệt tình và tiếp khách chu đáo là phép lịch sự',6),
      r(id,1,'fill_blank','Bờ [b1] rợp bóng mát ở cổng [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tre',b2:'làng'},'easy','Bờ tre rợp bóng mát ở cổng làng',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Đón khách'},{key:'B',text:'Mời'},{key:'C',text:'Vui vẻ'}],{A:'Tiếp nhận người đến',B:'Nói lời muốn người khác làm gì',C:'Trạng thái tươi vui'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các hành động đón khách đúng trình tự: tiễn khách, chào hỏi, mời nước, mời vào nhà',[{key:'1',text:'tiễn khách'},{key:'2',text:'chào hỏi'},{key:'3',text:'mời nước'},{key:'4',text:'mời vào nhà'}],['2','4','3','1'],'easy','Chào → Mời vào → Mời nước → Tiễn khách',9),
      r(id,1,'true_false','Tre là loài cây gắn liền với làng quê Việt Nam. Đúng hay sai?',null,true,'easy','Tre là biểu tượng của làng quê và con người Việt Nam',10),
      // Ex2 medium - welcoming guests scene
      r(id,2,'single_choice','Trong bài thơ "Bờ tre đón khách", bờ tre tượng trưng cho điều gì?',[{key:'A',text:'Sự giàu có của làng'},{key:'B',text:'Lòng hiếu khách của người Việt'},{key:'C',text:'Hàng rào ngăn cách'}],'B','medium','Bờ tre tượng trưng cho lòng hiếu khách ấm áp của người Việt',1),
      r(id,2,'single_choice','Hình ảnh nào gợi lên sự ấm áp khi đón khách?',[{key:'A',text:'Mưa giông, gió rét'},{key:'B',text:'Bóng tre mát, tiếng chim hót, nụ cười thân thiện'},{key:'C',text:'Cổng đóng, nhà vắng người'}],'B','medium','Bóng mát, tiếng chim và nụ cười tạo không gian đón tiếp ấm áp',2),
      r(id,2,'true_false','Người Việt thường mời khách ăn cơm khi đến thăm. Đúng hay sai?',null,true,'medium','Mời khách ăn cơm là nét văn hóa hiếu khách của người Việt',3),
      r(id,2,'fill_blank','Bờ tre rì rào như đang [b1] chào những người [b2] về làng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cất tiếng',b2:'trở'},'medium','Tiếng tre rì rào như lời chào đón khách trở về làng',4),
      r(id,2,'matching','Nối hình ảnh với ý nghĩa:',[{key:'A',text:'Bờ tre xanh'},{key:'B',text:'Cổng làng'},{key:'C',text:'Tiếng chim hót'}],{A:'Sự hiếu khách',B:'Cửa ngõ chào đón',C:'Không khí vui tươi'},'medium',null,5),
      r(id,2,'single_choice','Khi đón khách, người chủ nhà cần có thái độ như thế nào?',[{key:'A',text:'Lạnh lùng, xa cách'},{key:'B',text:'Vồn vã, nhiệt tình, chu đáo'},{key:'C',text:'Bận bịu, không chú ý'}],'B','medium','Đón khách cần thái độ nhiệt tình, vồn vã và chu đáo',6),
      r(id,2,'fill_blank','Câu ca dao "Bầu ơi thương lấy bí cùng" nói về tinh thần [b1] đùm bọc [b2] của người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tương',b2:'nhau'},'medium','Tình tương thân tương ái, đùm bọc nhau của người Việt',7),
      r(id,2,'true_false','Cảnh đón khách tại làng quê thường có nhiều láng giềng cùng ra chào. Đúng hay sai?',null,true,'medium','Người làng quê hay ra đón khách cùng nhau, thể hiện sự thân thiện',8),
      r(id,2,'sorting','Sắp xếp các từ thể hiện lòng hiếu khách từ nhẹ đến đậm: niềm nở, thân thiện, ân cần, nhiệt liệt',[{key:'1',text:'niềm nở'},{key:'2',text:'thân thiện'},{key:'3',text:'ân cần'},{key:'4',text:'nhiệt liệt'}],['2','1','3','4'],'medium','Thân thiện → Niềm nở → Ân cần → Nhiệt liệt',9),
      r(id,2,'single_choice','Hàng tre ở đầu làng có ý nghĩa gì đặc biệt?',[{key:'A',text:'Chỉ để lấy bóng mát'},{key:'B',text:'Là biểu tượng chào đón và bảo vệ làng'},{key:'C',text:'Để lấy gỗ làm nhà'}],'B','medium','Hàng tre đầu làng vừa chào đón vừa bảo vệ làng khỏi gió bão',10),
      // Ex3 hard - imagery, Vietnamese hospitality culture
      r(id,3,'single_choice','Hình ảnh "bờ tre đón khách" là biện pháp nghệ thuật gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp từ'}],'B','hard','Nhân hóa: gán hành động người (đón khách) cho cây tre',1),
      r(id,3,'matching','Nối hình ảnh thơ với biện pháp nghệ thuật:',[{key:'A',text:'Tre cúi đầu chào khách'},{key:'B',text:'Tiếng gió như tiếng nhạc'},{key:'C',text:'Vui vui, rộn rộn tiếng chim'}],{A:'Nhân hóa',B:'So sánh',C:'Điệp từ'},'hard',null,2),
      r(id,3,'true_false','Văn hóa hiếu khách là nét đẹp đặc trưng của người Việt Nam. Đúng hay sai?',null,true,'hard','Hiếu khách là giá trị văn hóa quan trọng của người Việt',3),
      r(id,3,'fill_blank','Tre là hình ảnh [b1] của làng quê và [b2] Việt Nam.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'biểu tượng',b2:'con người'},'hard','Tre là biểu tượng của làng quê và con người Việt Nam',4),
      r(id,3,'sorting','Sắp xếp các yếu tố tạo nên văn hóa hiếu khách Việt: chia sẻ đồ ăn, lời chào niềm nở, tặng quà, tiễn khách ra tận cổng',[{key:'1',text:'chia sẻ đồ ăn'},{key:'2',text:'lời chào niềm nở'},{key:'3',text:'tặng quà'},{key:'4',text:'tiễn khách ra tận cổng'}],['2','1','4','3'],'hard','Chào → Chia sẻ ăn → Tiễn tận cổng → Tặng quà',5),
      r(id,3,'single_choice','Câu thơ nào thể hiện sự đón tiếp vui mừng?',[{key:'A',text:'Gió thổi lạnh lùng qua ngõ vắng'},{key:'B',text:'Bờ tre rì rào đón bước chân quen'},{key:'C',text:'Mưa rơi buồn bã trên mái nhà'}],'B','hard','Câu B thể hiện sự đón tiếp ấm áp, quen thuộc của bờ tre',6),
      r(id,3,'fill_blank','Hình ảnh bờ tre trong thơ gợi [b1] làng quê và [b2] con người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vẻ đẹp',b2:'tâm hồn'},'hard','Bờ tre gợi vẻ đẹp làng quê và tâm hồn người Việt',7),
      r(id,3,'true_false','Nhân hóa giúp bài thơ trở nên sinh động và gần gũi hơn. Đúng hay sai?',null,true,'hard','Nhân hóa làm cho vật vô tri trở nên sống động như người',8),
      r(id,3,'matching','Nối phong tục với ý nghĩa văn hóa:',[{key:'A',text:'Mời khách uống nước'},{key:'B',text:'Hỏi thăm sức khỏe'},{key:'C',text:'Tiễn khách ra đường'}],{A:'Thể hiện lòng hiếu khách',B:'Quan tâm đến người khác',C:'Quý trọng mối quan hệ'},'hard',null,9),
      r(id,3,'single_choice','Điều gì làm nên nét đẹp trong văn hóa đón khách của người Việt?',[{key:'A',text:'Đón khách cho có lệ'},{key:'B',text:'Lòng chân thành, nhiệt tình và sự ấm áp'},{key:'C',text:'Chỉ đón khách khi được lợi'}],'B','hard','Lòng chân thành và nhiệt tình là cốt lõi của văn hóa hiếu khách Việt',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1190: Bài 13: Tiếng chổi tre ──────────────────────────────────────────
  {
    const id = 1190;
    const rows: any[][] = [
      // Ex1 easy - cleaning vocabulary
      r(id,1,'single_choice','Chổi tre dùng để làm gì?',[{key:'A',text:'Nấu ăn'},{key:'B',text:'Quét nhà, quét đường'},{key:'C',text:'Câu cá'}],'B','easy','Chổi tre dùng để quét nhà và quét đường',1),
      r(id,1,'single_choice','Người quét đường thường làm việc vào lúc nào?',[{key:'A',text:'Buổi trưa nắng gắt'},{key:'B',text:'Buổi sáng sớm'},{key:'C',text:'Buổi tối khuya'}],'B','easy','Công nhân vệ sinh thường làm việc từ sáng sớm tinh mơ',2),
      r(id,1,'single_choice','Từ "sạch sẽ" nói về điều gì?',[{key:'A',text:'Không có bụi bẩn, gọn gàng'},{key:'B',text:'Rất đông người'},{key:'C',text:'Rất to lớn'}],'A','easy','Sạch sẽ nghĩa là không có bụi bẩn, gọn gàng ngăn nắp',3),
      r(id,1,'true_false','Đường phố sạch sẽ nhờ có người công nhân vệ sinh. Đúng hay sai?',null,true,'easy','Công nhân vệ sinh làm việc mỗi ngày để giữ đường phố sạch sẽ',4),
      r(id,1,'true_false','Tiếng chổi quét là "xào xạc". Đúng hay sai?',null,true,'easy','Xào xạc là từ tượng thanh mô tả tiếng chổi quét',5),
      r(id,1,'fill_blank','Công nhân vệ sinh [b1] đường phố bằng [b2] tre mỗi sáng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'quét',b2:'chổi'},'easy','Công nhân vệ sinh quét đường bằng chổi tre mỗi sáng',6),
      r(id,1,'fill_blank','Đường phố trở nên [b1] và [b2] sau khi được quét.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sạch',b2:'thoáng'},'easy','Đường phố sạch và thoáng sau khi được quét',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Quét'},{key:'B',text:'Sạch sẽ'},{key:'C',text:'Buổi sáng sớm'}],{A:'Dùng chổi để làm sạch',B:'Không có bụi bẩn',C:'Thời gian tinh mơ mặt trời chưa mọc'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ đúng để tạo câu: sáng / quét / công nhân / vệ sinh / đường / sớm',[{key:'1',text:'sáng'},{key:'2',text:'quét'},{key:'3',text:'công nhân'},{key:'4',text:'vệ sinh'},{key:'5',text:'đường'},{key:'6',text:'sớm'}],['3','4','2','5','6','1'],'easy','Công nhân vệ sinh quét đường sớm sáng',9),
      r(id,1,'true_false','Chúng ta nên biết ơn người công nhân vệ sinh. Đúng hay sai?',null,true,'easy','Công nhân vệ sinh làm việc vất vả để giữ sạch môi trường cho mọi người',10),
      // Ex2 medium - street cleaners' early morning work
      r(id,2,'single_choice','Bài thơ "Tiếng chổi tre" ca ngợi điều gì?',[{key:'A',text:'Vẻ đẹp của chổi tre'},{key:'B',text:'Sự vất vả và cống hiến của người quét đường'},{key:'C',text:'Tiếng ồn của đường phố'}],'B','medium','Bài thơ ca ngợi người quét đường làm việc vất vả mỗi sáng sớm',1),
      r(id,2,'single_choice','Người quét đường làm việc trong điều kiện nào?',[{key:'A',text:'Phòng điều hòa mát mẻ'},{key:'B',text:'Ngoài trời, dù nắng hay mưa'},{key:'C',text:'Trong nhà kho'}],'B','medium','Công nhân vệ sinh làm việc ngoài trời trong mọi thời tiết',2),
      r(id,2,'true_false','Tiếng chổi quét vào buổi sáng sớm thường làm phiền mọi người. Đúng hay sai?',null,false,'medium','Tiếng chổi sáng sớm mang lại đường phố sạch cho mọi người',3),
      r(id,2,'fill_blank','Công nhân vệ sinh thức dậy rất [b1] để đường phố [b2] trước khi mọi người ra đường.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sớm',b2:'sạch'},'medium','Thức sớm để dọn sạch đường trước giờ cao điểm',4),
      r(id,2,'matching','Nối công việc với thời gian phù hợp:',[{key:'A',text:'Quét đường phố'},{key:'B',text:'Thu gom rác'},{key:'C',text:'Tưới cây bên đường'}],{A:'Sáng sớm tinh mơ',B:'Chiều tối',C:'Sáng sớm hoặc chiều'},'medium',null,5),
      r(id,2,'single_choice','Hành động nào thể hiện tôn trọng người quét đường?',[{key:'A',text:'Vứt rác xuống đường'},{key:'B',text:'Bỏ rác vào thùng, giữ vệ sinh'},{key:'C',text:'Chạy xe nhanh qua người quét'}],'B','medium','Bỏ rác đúng chỗ giúp người quét đường làm việc dễ hơn',6),
      r(id,2,'fill_blank','Người quét đường làm việc [b1] để môi trường xanh, [b2], đẹp.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'miệt mài',b2:'sạch'},'medium','Làm việc miệt mài để môi trường xanh sạch đẹp',7),
      r(id,2,'true_false','Mỗi ngày, người công nhân vệ sinh quét hàng kilômét đường. Đúng hay sai?',null,true,'medium','Công nhân vệ sinh đô thị phải phụ trách quét rất nhiều đoạn đường',8),
      r(id,2,'sorting','Sắp xếp thứ tự công việc của người quét đường: đi về nhà nghỉ ngơi, cầm chổi ra đường, gom rác vào xe, quét từng đoạn đường',[{key:'1',text:'đi về nhà nghỉ ngơi'},{key:'2',text:'cầm chổi ra đường'},{key:'3',text:'gom rác vào xe'},{key:'4',text:'quét từng đoạn đường'}],['2','4','3','1'],'medium','Ra đường → Quét → Gom rác → Về nghỉ',9),
      r(id,2,'single_choice','Điều gì làm cho công việc quét đường vất vả hơn?',[{key:'A',text:'Đường phố quá sạch'},{key:'B',text:'Người dân ý thức giữ gìn vệ sinh tốt'},{key:'C',text:'Người vô ý xả rác bừa bãi'}],'C','medium','Khi người dân xả rác bừa bãi, người quét đường phải làm việc vất vả hơn',10),
      // Ex3 hard - onomatopoeia, appreciation for workers
      r(id,3,'single_choice','Từ "xào xạc" là loại từ gì?',[{key:'A',text:'Tính từ chỉ màu sắc'},{key:'B',text:'Từ tượng thanh mô tả âm thanh'},{key:'C',text:'Danh từ chỉ vật'}],'B','hard','Xào xạc là từ tượng thanh mô tả tiếng chổi quét',1),
      r(id,3,'matching','Nối từ tượng thanh với âm thanh tương ứng:',[{key:'A',text:'Xào xạc'},{key:'B',text:'Sột soạt'},{key:'C',text:'Rì rào'}],{A:'Tiếng chổi quét khô',B:'Tiếng lá chạm nhau',C:'Tiếng gió nhẹ, tiếng tre'},'hard',null,2),
      r(id,3,'true_false','Từ tượng thanh giúp câu thơ/văn trở nên sinh động hơn. Đúng hay sai?',null,true,'hard','Từ tượng thanh mô phỏng âm thanh thật, làm tác phẩm sinh động',3),
      r(id,3,'fill_blank','Tiếng chổi [b1] vang lên trong [b2] buổi sáng còn yên tĩnh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xào xạc',b2:'không gian'},'hard','Tiếng chổi xào xạc vang lên trong không gian buổi sáng yên tĩnh',4),
      r(id,3,'sorting','Sắp xếp từ tượng thanh theo độ to nhỏ của âm thanh (nhỏ đến to): ầm ầm, thì thầm, xào xạc, ầm ĩ',[{key:'1',text:'ầm ầm'},{key:'2',text:'thì thầm'},{key:'3',text:'xào xạc'},{key:'4',text:'ầm ĩ'}],['2','3','1','4'],'hard','Thì thầm → Xào xạc → Ầm ầm → Ầm ĩ',5),
      r(id,3,'single_choice','Câu nào thể hiện lòng biết ơn người lao động?',[{key:'A',text:'Quét đường là việc dễ, ai cũng làm được'},{key:'B',text:'Nhờ có người quét đường, đường phố chúng ta mới sạch sẽ'},{key:'C',text:'Người quét đường làm việc chậm chạp'}],'B','hard','Câu B thể hiện lòng biết ơn đúng đắn với người lao động',6),
      r(id,3,'fill_blank','Bài thơ dùng từ tượng thanh [b1] để gợi âm thanh [b2] của tiếng chổi tre.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xào xạc',b2:'đặc trưng'},'hard','Từ tượng thanh xào xạc gợi âm thanh đặc trưng của chổi tre',7),
      r(id,3,'true_false','Mọi nghề nghiệp đều đáng được tôn trọng, kể cả người quét đường. Đúng hay sai?',null,true,'hard','Mọi nghề nghiệp đều có đóng góp cho xã hội và đáng được tôn trọng',8),
      r(id,3,'matching','Nối hành động với thái độ thể hiện:',[{key:'A',text:'Bỏ rác đúng thùng'},{key:'B',text:'Chào người công nhân khi gặp'},{key:'C',text:'Không xả rác khi người quét vừa đi qua'}],{A:'Ý thức bảo vệ môi trường',B:'Thái độ tôn trọng lao động',C:'Biết ơn công sức của người khác'},'hard',null,9),
      r(id,3,'single_choice','Tác giả viết về tiếng chổi tre để nhắn gửi điều gì với người đọc?',[{key:'A',text:'Hãy mua chổi tre nhiều hơn'},{key:'B',text:'Hãy trân trọng người lao động và giữ gìn vệ sinh chung'},{key:'C',text:'Hãy thức dậy sớm hơn'}],'B','hard','Bài thơ nhắn gửi trân trọng người lao động và giữ vệ sinh chung',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1191: Bài 14: Cỏ non cười rồi ─────────────────────────────────────────
  {
    const id = 1191;
    const rows: any[][] = [
      // Ex1 easy - spring/grass vocabulary
      r(id,1,'single_choice','Cỏ non thường mọc vào mùa nào?',[{key:'A',text:'Mùa đông'},{key:'B',text:'Mùa xuân'},{key:'C',text:'Mùa thu'}],'B','easy','Cỏ non xanh mướt thường mọc nhiều vào mùa xuân',1),
      r(id,1,'single_choice','Từ "xanh mướt" tả điều gì?',[{key:'A',text:'Màu xanh đậm, tươi tốt'},{key:'B',text:'Màu vàng héo úa'},{key:'C',text:'Màu trắng tinh'}],'A','easy','Xanh mướt tả màu xanh tươi tốt, ngọt mắt',2),
      r(id,1,'single_choice','Sương là gì?',[{key:'A',text:'Mưa to'},{key:'B',text:'Những hạt nước nhỏ li ti trên lá'},{key:'C',text:'Tuyết rơi'}],'B','easy','Sương là hơi nước đọng thành giọt nhỏ trên lá, cỏ buổi sáng',3),
      r(id,1,'true_false','Mùa xuân là mùa vạn vật sinh sôi, nảy nở. Đúng hay sai?',null,true,'easy','Mùa xuân ấm áp, mưa nhiều giúp cây cỏ nảy mầm sinh trưởng',4),
      r(id,1,'true_false','Cỏ non có màu vàng. Đúng hay sai?',null,false,'easy','Cỏ non có màu xanh tươi mướt',5),
      r(id,1,'fill_blank','Cỏ non [b1] trên đồng, hạt [b2] long lanh dưới ánh sáng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xanh',b2:'sương'},'easy','Cỏ non xanh trên đồng, hạt sương long lanh dưới ánh sáng',6),
      r(id,1,'fill_blank','Mùa [b1] mang đến bầu trời [b2] và cây cỏ tươi xanh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xuân',b2:'trong xanh'},'easy','Mùa xuân mang bầu trời trong xanh và cây cỏ tươi tốt',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Cỏ non'},{key:'B',text:'Sương mai'},{key:'C',text:'Mùa xuân'}],{A:'Cỏ mới mọc còn non',B:'Hạt sương buổi sáng sớm',C:'Mùa đầu năm, ấm áp'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các mùa trong năm: thu, đông, xuân, hạ',[{key:'1',text:'thu'},{key:'2',text:'đông'},{key:'3',text:'xuân'},{key:'4',text:'hạ'}],['3','4','1','2'],'easy','Xuân → Hạ → Thu → Đông',9),
      r(id,1,'true_false','Ánh nắng xuân giúp cỏ non lớn nhanh. Đúng hay sai?',null,true,'easy','Ánh nắng và hơi ấm mùa xuân giúp cây cỏ sinh trưởng',10),
      // Ex2 medium - spring imagery comprehension
      r(id,2,'single_choice','Câu thơ "Cỏ non cười rồi" sử dụng biện pháp nghệ thuật gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Ẩn dụ'}],'B','medium','Nhân hóa: gán hành động người (cười) cho cỏ non',1),
      r(id,2,'single_choice','Hình ảnh cỏ non cười gợi lên cảm giác gì?',[{key:'A',text:'Buồn bã, ảm đạm'},{key:'B',text:'Vui tươi, rộn ràng của mùa xuân'},{key:'C',text:'Sợ hãi'}],'B','medium','Cỏ non cười gợi không khí vui tươi, rộn ràng mùa xuân',2),
      r(id,2,'true_false','Hạt sương trên cỏ như những viên pha lê nhỏ. Đúng hay sai?',null,true,'medium','Hạt sương lấp lánh trên lá cỏ trông như những viên pha lê nhỏ',3),
      r(id,2,'fill_blank','Bài thơ về mùa xuân thường miêu tả [b1] xanh, [b2] ấm và cây cỏ tươi tốt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'trời',b2:'nắng'},'medium','Trời xanh, nắng ấm là hình ảnh đặc trưng của mùa xuân',4),
      r(id,2,'matching','Nối hình ảnh mùa xuân với cảm xúc gợi lên:',[{key:'A',text:'Cỏ non xanh mướt'},{key:'B',text:'Hoa đào nở rộ'},{key:'C',text:'Chim hót líu lo'}],{A:'Tươi mát, dịu mắt',B:'Rực rỡ, phấn khởi',C:'Vui tươi, rộn ràng'},'medium',null,5),
      r(id,2,'single_choice','Buổi sáng mùa xuân, điều gì đặc biệt ở cỏ?',[{key:'A',text:'Cỏ chuyển sang màu vàng'},{key:'B',text:'Cỏ xanh mướt với hạt sương long lanh'},{key:'C',text:'Cỏ tàn úa và héo rũ'}],'B','medium','Buổi sáng xuân, cỏ xanh tươi phủ đầy hạt sương lấp lánh',6),
      r(id,2,'fill_blank','Mùa xuân là [b1] của năm, mang đến sự [b2] và hy vọng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'khởi đầu',b2:'tươi mới'},'medium','Mùa xuân là khởi đầu năm mới, mang sự tươi mới và hy vọng',7),
      r(id,2,'true_false','Mặt trời xuân ấm áp làm tan hết hạt sương trên cỏ. Đúng hay sai?',null,true,'medium','Khi mặt trời lên, hơi ấm làm hạt sương bốc hơi tan dần',8),
      r(id,2,'sorting','Sắp xếp các hình ảnh mùa xuân từ sáng sớm đến trưa: nắng chan hòa, hạt sương long lanh, hoa nở, chim hót',[{key:'1',text:'nắng chan hòa'},{key:'2',text:'hạt sương long lanh'},{key:'3',text:'hoa nở'},{key:'4',text:'chim hót'}],['2','4','3','1'],'medium','Sương sớm → Chim hót → Hoa nở → Nắng chan hòa',9),
      r(id,2,'single_choice','Từ nào KHÔNG dùng tả mùa xuân?',[{key:'A',text:'Tươi tốt'},{key:'B',text:'Giá rét'},{key:'C',text:'Xanh mướt'}],'B','medium','Giá rét là tính từ tả mùa đông, không phải mùa xuân',10),
      // Ex3 hard - personification of grass, spring feelings
      r(id,3,'single_choice','Tại sao tác giả dùng từ "cười" để tả cỏ non?',[{key:'A',text:'Vì cỏ thực sự cười được'},{key:'B',text:'Để nhân hóa cỏ, tạo hình ảnh sinh động và gần gũi'},{key:'C',text:'Vì đó là từ duy nhất phù hợp'}],'B','hard','Nhân hóa tạo hình ảnh sinh động, cỏ non "cười" như trẻ em vui xuân',1),
      r(id,3,'matching','Nối biện pháp nghệ thuật với ví dụ trong bài:',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp ngữ'}],{A:'Cỏ non cười rồi',B:'Sương như ngọc trắng',C:'Xanh xanh, mướt mướt'},'hard',null,2),
      r(id,3,'true_false','Nhân hóa cỏ non "cười" thể hiện tình cảm yêu mùa xuân của tác giả. Đúng hay sai?',null,true,'hard','Nhân hóa thể hiện cảm xúc yêu mùa xuân, yêu thiên nhiên của tác giả',3),
      r(id,3,'fill_blank','Cảm giác [b1] và [b2] là nét đặc trưng của tâm trạng con người vào mùa xuân.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vui vẻ',b2:'hy vọng'},'hard','Vui vẻ và hy vọng là tâm trạng thường gặp của con người mùa xuân',4),
      r(id,3,'sorting','Sắp xếp mức độ tươi xanh của cỏ: cỏ khô héo, cỏ hơi xanh, cỏ non xanh mướt, cỏ đã già',[{key:'1',text:'cỏ khô héo'},{key:'2',text:'cỏ hơi xanh'},{key:'3',text:'cỏ non xanh mướt'},{key:'4',text:'cỏ đã già'}],['1','2','4','3'],'hard','Khô héo → Hơi xanh → Già → Non xanh mướt',5),
      r(id,3,'single_choice','Bài thơ về mùa xuân thường muốn truyền đạt điều gì?',[{key:'A',text:'Sự lo lắng về thời tiết'},{key:'B',text:'Tình yêu thiên nhiên và niềm vui sống'},{key:'C',text:'Nỗi buồn khi mùa xuân qua đi'}],'B','hard','Thơ xuân thể hiện tình yêu thiên nhiên và niềm vui sống của con người',6),
      r(id,3,'fill_blank','Hình ảnh thiên nhiên mùa xuân trong thơ gợi [b1] đẹp đẽ và tâm trạng [b2] của người đọc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bức tranh',b2:'phấn khởi'},'hard','Hình ảnh thiên nhiên gợi bức tranh đẹp và tâm trạng phấn khởi',7),
      r(id,3,'true_false','Thơ về mùa xuân thường dùng nhiều màu sắc tươi sáng. Đúng hay sai?',null,true,'hard','Mùa xuân tươi sáng nên thơ xuân thường dùng màu xanh, hồng, vàng',8),
      r(id,3,'matching','Nối từ ngữ với cảm xúc gợi lên:',[{key:'A',text:'Cỏ non xanh mướt'},{key:'B',text:'Sương tan dưới nắng'},{key:'C',text:'Chim hót vui vẻ'}],{A:'Tươi mát, yên bình',B:'Ấm áp, hi vọng',C:'Rộn ràng, vui tươi'},'hard',null,9),
      r(id,3,'single_choice','Câu nào dưới đây thể hiện nhân hóa đúng nhất?',[{key:'A',text:'Cỏ xanh như thảm nhung'},{key:'B',text:'Cỏ non vươn mình đón nắng xuân'},{key:'C',text:'Cỏ mọc rất nhiều trên đồng'}],'B','hard','Câu B: cỏ "vươn mình" - hành động người, là nhân hóa',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1192: Bài 15: Những con sao biển ──────────────────────────────────────
  {
    const id = 1192;
    const rows: any[][] = [
      // Ex1 easy - sea vocabulary and sea creatures
      r(id,1,'single_choice','Sao biển sống ở đâu?',[{key:'A',text:'Trên cạn'},{key:'B',text:'Dưới biển'},{key:'C',text:'Trên trời'}],'B','easy','Sao biển là sinh vật biển, sống dưới nước biển',1),
      r(id,1,'single_choice','Sao biển thường có mấy cánh?',[{key:'A',text:'Ba cánh'},{key:'B',text:'Năm cánh'},{key:'C',text:'Hai cánh'}],'B','easy','Sao biển thường có 5 cánh tỏa ra như ngôi sao',2),
      r(id,1,'single_choice','Từ "ném" có nghĩa là gì?',[{key:'A',text:'Đặt nhẹ nhàng'},{key:'B',text:'Quăng mạnh ra xa'},{key:'C',text:'Nhặt lên'}],'B','easy','Ném là động tác quăng vật gì đó ra xa bằng tay',3),
      r(id,1,'true_false','Sóng biển có thể đẩy sao biển lên bờ cát. Đúng hay sai?',null,true,'easy','Sóng mạnh thường đẩy sao biển và các sinh vật biển lên bờ',4),
      r(id,1,'true_false','Cát biển thường có màu trắng hoặc vàng. Đúng hay sai?',null,true,'easy','Cát biển thường có màu trắng hoặc vàng nhạt',5),
      r(id,1,'fill_blank','Bờ [b1] trải dài với [b2] vàng óng và sóng xô ào ào.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'biển',b2:'cát'},'easy','Bờ biển trải dài với cát vàng và sóng xô',6),
      r(id,1,'fill_blank','Sao biển có hình dạng như ngôi [b1] với [b2] cánh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sao',b2:'năm'},'easy','Sao biển có hình ngôi sao với năm cánh',7),
      r(id,1,'matching','Nối sinh vật biển với đặc điểm:',[{key:'A',text:'Sao biển'},{key:'B',text:'Cá'},{key:'C',text:'Sứa'}],{A:'Hình ngôi sao, bám đáy biển',B:'Có vảy, bơi bằng vây',C:'Trong suốt, sống lơ lửng'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các sinh vật biển: tôm, cua, cá, sao biển, sứa theo thứ tự bảng chữ cái',[{key:'1',text:'tôm'},{key:'2',text:'cua'},{key:'3',text:'cá'},{key:'4',text:'sao biển'},{key:'5',text:'sứa'}],['3','2','4','5','1'],'easy','Cá, Cua, Sao biển, Sứa, Tôm',9),
      r(id,1,'true_false','Biển là môi trường sống của rất nhiều sinh vật. Đúng hay sai?',null,true,'easy','Biển là hệ sinh thái đa dạng với hàng nghìn loài sinh vật',10),
      // Ex2 medium - child throwing sea stars back to ocean
      r(id,2,'single_choice','Trong câu chuyện, đứa trẻ làm gì với những con sao biển trên bờ cát?',[{key:'A',text:'Nhặt sao biển về làm quà'},{key:'B',text:'Ném sao biển trở lại biển để cứu chúng'},{key:'C',text:'Đạp lên sao biển'}],'B','medium','Đứa trẻ ném sao biển trở lại biển để cứu chúng khỏi chết khô',1),
      r(id,2,'single_choice','Tại sao sao biển bị mắc kẹt trên bờ lại nguy hiểm?',[{key:'A',text:'Vì chúng sẽ bị nóng quá'},{key:'B',text:'Vì chúng không có nước biển sẽ bị chết khô'},{key:'C',text:'Vì chúng sẽ bị lạnh'}],'B','medium','Sao biển cần nước biển để sống, khi mắc cạn sẽ chết khô',2),
      r(id,2,'true_false','Hành động của đứa trẻ ném sao biển trở lại biển là việc làm tốt. Đúng hay sai?',null,true,'medium','Cứu sinh vật đang gặp nạn là hành động tốt đẹp',3),
      r(id,2,'fill_blank','Đứa trẻ nhìn thấy hàng trăm [b1] mắc trên bờ [b2] nên quyết định cứu chúng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sao biển',b2:'cát'},'medium','Thấy sao biển mắc trên bờ cát, trẻ quyết định cứu',4),
      r(id,2,'matching','Nối hành động với kết quả:',[{key:'A',text:'Ném sao biển ra biển'},{key:'B',text:'Để sao biển trên cát'},{key:'C',text:'Đổ nước biển lên sao biển'}],{A:'Sao biển được cứu sống',B:'Sao biển chết khô',C:'Sao biển tạm thời sống'},'medium',null,5),
      r(id,2,'single_choice','Người lớn nói với đứa trẻ rằng có quá nhiều sao biển, cứu không xuể. Trẻ trả lời thế nào?',[{key:'A',text:'Thôi không cứu nữa'},{key:'B',text:'Con sẽ cứu được con này'},{key:'C',text:'Người lớn phải giúp con'}],'B','medium','Đứa trẻ trả lời: dù không cứu được tất cả nhưng con cứu được con này',6),
      r(id,2,'fill_blank','Biển rộng lớn với những [b1] xanh và [b2] trắng xóa vỗ vào bờ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'làn nước',b2:'sóng'},'medium','Biển với làn nước xanh và sóng trắng vỗ vào bờ',7),
      r(id,2,'true_false','Chúng ta chỉ nên làm việc tốt khi mang lại ích lợi cho thật nhiều người. Đúng hay sai?',null,false,'medium','Làm điều tốt dù nhỏ cũng có ý nghĩa, như cứu từng con sao biển',8),
      r(id,2,'sorting','Sắp xếp thứ tự câu chuyện: ném sao biển ra biển, thấy sao biển trên bờ, sóng đánh sao biển lên bờ, tiếp tục cứu từng con',[{key:'1',text:'ném sao biển ra biển'},{key:'2',text:'thấy sao biển trên bờ'},{key:'3',text:'sóng đánh sao biển lên bờ'},{key:'4',text:'tiếp tục cứu từng con'}],['3','2','1','4'],'medium','Sóng đẩy lên → Thấy → Ném ra biển → Tiếp tục cứu',9),
      r(id,2,'single_choice','Câu chuyện muốn dạy chúng ta điều gì?',[{key:'A',text:'Biển rất nguy hiểm, đừng ra biển'},{key:'B',text:'Hành động nhỏ tử tế cũng có ý nghĩa lớn'},{key:'C',text:'Nên bắt sao biển về nuôi'}],'B','medium','Câu chuyện dạy: mỗi hành động tốt đẹp dù nhỏ đều có giá trị',10),
      // Ex3 hard - moral lesson, figurative language
      r(id,3,'single_choice','Hành động cứu từng con sao biển thể hiện phẩm chất gì của đứa trẻ?',[{key:'A',text:'Sự lười biếng'},{key:'B',text:'Lòng nhân ái và kiên nhẫn'},{key:'C',text:'Sự vô trách nhiệm'}],'B','hard','Cứu từng con sao biển thể hiện lòng nhân ái và sự kiên nhẫn',1),
      r(id,3,'matching','Nối ý nghĩa với chi tiết trong câu chuyện:',[{key:'A',text:'Hàng trăm sao biển trên bờ'},{key:'B',text:'Đứa trẻ ném từng con ra biển'},{key:'C',text:'Đứa trẻ tiếp tục dù biết không xuể'}],{A:'Vấn đề khó giải quyết',B:'Hành động thiết thực nhỏ',C:'Ý chí kiên định'},'hard',null,2),
      r(id,3,'true_false','Câu chuyện "Những con sao biển" là câu chuyện ngụ ngôn có bài học sâu sắc. Đúng hay sai?',null,true,'hard','Câu chuyện mang bài học: hành động nhỏ tốt đẹp đều có giá trị',3),
      r(id,3,'fill_blank','Bài học của câu chuyện: Làm [b1] dù [b2] cũng tạo nên sự khác biệt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'điều tốt',b2:'nhỏ'},'hard','Làm điều tốt dù nhỏ cũng tạo nên sự khác biệt',4),
      r(id,3,'sorting','Sắp xếp các bài học từ câu chuyện theo tầm quan trọng: yêu thiên nhiên, hành động tốt dù nhỏ, kiên nhẫn, lòng nhân ái',[{key:'1',text:'yêu thiên nhiên'},{key:'2',text:'hành động tốt dù nhỏ'},{key:'3',text:'kiên nhẫn'},{key:'4',text:'lòng nhân ái'}],['4','2','3','1'],'hard','Nhân ái → Hành động tốt → Kiên nhẫn → Yêu thiên nhiên',5),
      r(id,3,'single_choice','Câu "Ném con sao biển này ra biển, nó sẽ sống" dùng biện pháp gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'Lý lẽ thực tế, hành động cụ thể'},{key:'C',text:'So sánh'}],'B','hard','Đứa trẻ dùng lý lẽ thực tế: hành động nhỏ nhưng cứu được mạng sống',6),
      r(id,3,'fill_blank','Hình ảnh [b1] lấp lánh trong nắng gợi vẻ [b2] của biển cả.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sóng biển',b2:'hùng vĩ'},'hard','Sóng biển lấp lánh gợi vẻ hùng vĩ của đại dương',7),
      r(id,3,'true_false','Câu chuyện khuyến khích ta đừng làm gì nếu không thể làm hết tất cả. Đúng hay sai?',null,false,'hard','Ngược lại: câu chuyện khuyến khích hành động dù nhỏ, vì mỗi việc tốt đều có ý nghĩa',8),
      r(id,3,'matching','Nối nhân vật/chi tiết với tính cách/ý nghĩa:',[{key:'A',text:'Đứa trẻ ném sao biển'},{key:'B',text:'Người lớn hoài nghi'},{key:'C',text:'Sao biển sống trở lại'}],{A:'Hành động từ tâm',B:'Cái nhìn thực dụng thiếu lòng nhân ái',C:'Kết quả của lòng tốt'},'hard',null,9),
      r(id,3,'single_choice','Điều gì làm cho câu chuyện có giá trị giáo dục cao?',[{key:'A',text:'Có nhiều nhân vật thú vị'},{key:'B',text:'Bài học rõ ràng: hành động tốt dù nhỏ đều có ý nghĩa'},{key:'C',text:'Câu chuyện xảy ra ở biển'}],'B','hard','Bài học sâu sắc về lòng nhân ái và giá trị hành động nhỏ là điểm giáo dục chính',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1193: Bài 16: Tạm biệt cánh cam ───────────────────────────────────────
  {
    const id = 1193;
    const rows: any[][] = [
      // Ex1 easy - insect vocabulary, seasons
      r(id,1,'single_choice','Cánh cam là loài gì?',[{key:'A',text:'Một loài cá'},{key:'B',text:'Một loài côn trùng có cánh'},{key:'C',text:'Một loài chim'}],'B','easy','Cánh cam (bọ cánh cam) là côn trùng thuộc họ bọ cánh cứng',1),
      r(id,1,'single_choice','Từ "tạm biệt" có nghĩa là gì?',[{key:'A',text:'Gặp gỡ lần đầu'},{key:'B',text:'Lời chào khi tạm thời chia tay'},{key:'C',text:'Lời chào buổi sáng'}],'B','easy','Tạm biệt là lời chào khi chia tay, hẹn gặp lại',2),
      r(id,1,'single_choice','Côn trùng nào có đặc điểm bay được?',[{key:'A',text:'Giun đất'},{key:'B',text:'Bướm'},{key:'C',text:'Ốc sên'}],'B','easy','Bướm có cánh nên bay được, giun và ốc sên không có cánh',3),
      r(id,1,'true_false','Cánh cam có đôi cánh cứng bên ngoài che đôi cánh mỏng bên trong. Đúng hay sai?',null,true,'easy','Bọ cánh cứng có cánh ngoài cứng (elytra) che cánh trong mỏng',4),
      r(id,1,'true_false','Côn trùng có sáu chân. Đúng hay sai?',null,true,'easy','Tất cả côn trùng đều có sáu chân - đây là đặc điểm phân loại',5),
      r(id,1,'fill_blank','Con [b1] bay lượn từ [b2] sang hoa trong vườn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cánh cam',b2:'hoa'},'easy','Cánh cam bay lượn từ hoa sang hoa trong vườn',6),
      r(id,1,'fill_blank','Mùa [b1] ấm áp là thời gian nhiều [b2] bay ra hoạt động.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'hè',b2:'côn trùng'},'easy','Mùa hè ấm áp là thời gian côn trùng bay ra hoạt động nhiều',7),
      r(id,1,'matching','Nối loài côn trùng với đặc điểm nổi bật:',[{key:'A',text:'Cánh cam'},{key:'B',text:'Bướm'},{key:'C',text:'Ong'}],{A:'Cánh cứng óng ánh',B:'Cánh màu sắc đẹp',C:'Làm mật, có ngòi'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các mùa theo thứ tự hoạt động của côn trùng (nhiều đến ít): thu, đông, xuân, hạ',[{key:'1',text:'thu'},{key:'2',text:'đông'},{key:'3',text:'xuân'},{key:'4',text:'hạ'}],['4','3','1','2'],'easy','Hạ > Xuân > Thu > Đông (hoạt động côn trùng)',9),
      r(id,1,'true_false','Cánh cam thường sống ở vườn cây. Đúng hay sai?',null,true,'easy','Cánh cam (bọ cánh cam) sống ở vườn cây và bãi cỏ',10),
      // Ex2 medium - why beetle leaves, where it goes
      r(id,2,'single_choice','Trong bài thơ, cánh cam "tạm biệt" vì điều gì?',[{key:'A',text:'Vì bị đuổi đi'},{key:'B',text:'Vì mùa lạnh đến, cần bay đi trú đông'},{key:'C',text:'Vì hết thức ăn'}],'B','medium','Côn trùng thường di cư hoặc trú đông khi mùa lạnh đến',1),
      r(id,2,'single_choice','Khi mùa đông đến, nhiều loài côn trùng làm gì?',[{key:'A',text:'Bay đến vùng ấm hơn hoặc trú đông'},{key:'B',text:'Vẫn hoạt động bình thường'},{key:'C',text:'Bay lên rất cao'}],'A','medium','Côn trùng thường di cư tìm nơi ấm hoặc trú đông dưới đất, trong vỏ cây',2),
      r(id,2,'true_false','Cánh cam sẽ trở lại vào mùa xuân. Đúng hay sai?',null,true,'medium','Khi mùa ấm trở lại, côn trùng trú đông sẽ thức dậy hoạt động',3),
      r(id,2,'fill_blank','Cánh cam vỗ [b1] bay đi khi [b2] chuyển lạnh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cánh',b2:'tiết trời'},'medium','Cánh cam vỗ cánh bay đi khi tiết trời chuyển lạnh',4),
      r(id,2,'matching','Nối mùa với hoạt động của côn trùng:',[{key:'A',text:'Xuân'},{key:'B',text:'Hạ'},{key:'C',text:'Đông'}],{A:'Thức giấc, hoạt động trở lại',B:'Hoạt động mạnh nhất',C:'Ngủ đông hoặc di cư'},'medium',null,5),
      r(id,2,'single_choice','Hình ảnh "tạm biệt cánh cam" gợi lên cảm xúc gì?',[{key:'A',text:'Vui mừng'},{key:'B',text:'Bâng khuâng, luyến tiếc khi chia tay'},{key:'C',text:'Tức giận'}],'B','medium','Tạm biệt gợi cảm xúc bâng khuâng, nhớ nhung khi chia tay',6),
      r(id,2,'fill_blank','Mùa [b1] đến, vườn hoa [b2] đi, cánh cam cũng tạm biệt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thu',b2:'tàn'},'medium','Mùa thu đến, vườn hoa tàn, cánh cam cũng ra đi',7),
      r(id,2,'true_false','Sự ra đi của cánh cam đánh dấu sự thay đổi của mùa. Đúng hay sai?',null,true,'medium','Sự xuất hiện và biến mất của côn trùng là dấu hiệu thay đổi mùa',8),
      r(id,2,'sorting','Sắp xếp vòng đời theo mùa của cánh cam: trú đông, hoạt động mùa hè, bay đi mùa thu, thức dậy mùa xuân',[{key:'1',text:'trú đông'},{key:'2',text:'hoạt động mùa hè'},{key:'3',text:'bay đi mùa thu'},{key:'4',text:'thức dậy mùa xuân'}],['4','2','3','1'],'medium','Thức dậy → Hoạt động → Bay đi → Trú đông',9),
      r(id,2,'single_choice','Bài thơ nói về cánh cam để nói về điều gì sâu xa hơn?',[{key:'A',text:'Chỉ nói về côn trùng'},{key:'B',text:'Sự thay đổi của mùa và cảm xúc khi chia tay'},{key:'C',text:'Cách nuôi cánh cam'}],'B','medium','Qua hình ảnh cánh cam, bài thơ nói về sự đổi thay và cảm xúc chia tay',10),
      // Ex3 hard - seasonal change, farewell emotions, environment
      r(id,3,'single_choice','Cánh cam "tạm biệt" là hình ảnh ẩn dụ cho điều gì?',[{key:'A',text:'Côn trùng thực sự biết nói tạm biệt'},{key:'B',text:'Sự kết thúc của một mùa và bắt đầu mùa khác'},{key:'C',text:'Cánh cam bị mất đường về'}],'B','hard','Ẩn dụ: tạm biệt cánh cam = cuối mùa hè, đầu mùa thu',1),
      r(id,3,'matching','Nối hình ảnh trong bài với ý nghĩa biểu tượng:',[{key:'A',text:'Cánh cam bay đi'},{key:'B',text:'Vườn hoa tàn lá rụng'},{key:'C',text:'Gió mùa thu se lạnh'}],{A:'Mùa hè kết thúc',B:'Sự tàn phai của thời gian',C:'Mùa đông đang đến'},'hard',null,2),
      r(id,3,'true_false','Bài thơ dùng hình ảnh thiên nhiên để diễn đạt cảm xúc của con người. Đúng hay sai?',null,true,'hard','Bài thơ dùng hình ảnh cánh cam và thiên nhiên để diễn tả tâm trạng người',3),
      r(id,3,'fill_blank','Cảm xúc [b1] khi chia tay và [b2] được gặp lại là chủ đề của bài thơ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'luyến tiếc',b2:'hy vọng'},'hard','Luyến tiếc lúc chia tay và hy vọng được gặp lại là chủ đề chính',4),
      r(id,3,'sorting','Sắp xếp cảm xúc chia tay từ nhẹ đến mạnh: khóc thật nhiều, hơi buồn, bâng khuâng, tiếc nuối',[{key:'1',text:'khóc thật nhiều'},{key:'2',text:'hơi buồn'},{key:'3',text:'bâng khuâng'},{key:'4',text:'tiếc nuối'}],['2','3','4','1'],'hard','Hơi buồn → Bâng khuâng → Tiếc nuối → Khóc nhiều',5),
      r(id,3,'single_choice','Tại sao môi trường trong lành quan trọng với cánh cam và các loài côn trùng?',[{key:'A',text:'Vì côn trùng thích đẹp mắt'},{key:'B',text:'Vì ô nhiễm phá hủy nơi sống và thức ăn của chúng'},{key:'C',text:'Không có lý do đặc biệt'}],'B','hard','Ô nhiễm môi trường phá hủy hệ sinh thái, đe dọa sự tồn tại của côn trùng',6),
      r(id,3,'fill_blank','Việc [b1] môi trường giúp bảo vệ các loài côn trùng như [b2] không bị tuyệt chủng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bảo vệ',b2:'cánh cam'},'hard','Bảo vệ môi trường giúp cánh cam và côn trùng không bị tuyệt chủng',7),
      r(id,3,'true_false','Bài thơ về tạm biệt cánh cam gợi tình yêu thiên nhiên và môi trường. Đúng hay sai?',null,true,'hard','Bài thơ nuôi dưỡng tình yêu thiên nhiên, nhắc nhở bảo vệ môi trường',8),
      r(id,3,'matching','Nối biện pháp nghệ thuật với tác dụng trong bài thơ:',[{key:'A',text:'Nhân hóa cánh cam'},{key:'B',text:'Hình ảnh mùa thu tàn'},{key:'C',text:'Từ "tạm biệt"'}],{A:'Gần gũi, sinh động',B:'Gợi cảm giác buồn, tàn phai',C:'Cảm xúc chia tay nhớ nhung'},'hard',null,9),
      r(id,3,'single_choice','Thông điệp cuối cùng mà bài thơ "Tạm biệt cánh cam" muốn gửi gắm là gì?',[{key:'A',text:'Đừng tiếc nuối khi mùa đổi thay'},{key:'B',text:'Yêu quý thiên nhiên, trân trọng khoảnh khắc và hẹn gặp lại'},{key:'C',text:'Bắt côn trùng giữ lại đừng để chúng đi'}],'B','hard','Bài thơ nhắn: yêu thiên nhiên, sống trọn khoảnh khắc và hy vọng tái ngộ',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── Insert all ─────────────────────────────────────────────────────────────
  for (const lesson of lessons) {
    for (const row of lesson.rows) {
      await conn.execute(INSERT, row);
    }
    console.log(`✓ Lesson ${lesson.id}: ${lesson.rows.length} questions inserted`);
  }

  await conn.end();
  console.log('Done! 240 questions inserted across 8 lessons.');
}

seed().catch(err => { console.error(err); process.exit(1); });
