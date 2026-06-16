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

  // ─── 1162: Bài 17 – Gọi bạn ────────────────────────────────────────────────
  {
    const id = 1162;
    const rows: any[][] = [
      // Ex1 easy – play/invite vocab
      r(id,1,'single_choice','Từ nào có nghĩa là "mời bạn đến chơi cùng"?',[{key:'A',text:'Gọi'},{key:'B',text:'Chạy'},{key:'C',text:'Hát'}],'A','easy','Gọi bạn nghĩa là mời bạn đến chơi',1),
      r(id,1,'single_choice','Bạn nhỏ muốn rủ bạn ra ngoài chơi thì dùng từ nào?',[{key:'A',text:'Ngủ'},{key:'B',text:'Mời'},{key:'C',text:'Viết'}],'B','easy','Mời là từ dùng để rủ bạn',2),
      r(id,1,'single_choice','Trò chơi nào dưới đây không phải trò chơi vận động?',[{key:'A',text:'Nhảy dây'},{key:'B',text:'Chạy thi'},{key:'C',text:'Vẽ tranh'}],'C','easy','Vẽ tranh không phải trò chơi vận động',3),
      r(id,1,'true_false','Từ "gọi" và từ "mời" đều có thể dùng khi rủ bạn đến chơi. Đúng hay sai?',null,true,'easy','Gọi bạn, mời bạn đều có nghĩa tương tự',4),
      r(id,1,'true_false','Nhảy là hoạt động mà chân không rời khỏi mặt đất. Đúng hay sai?',null,false,'easy','Nhảy là hoạt động chân rời khỏi mặt đất',5),
      r(id,1,'fill_blank','Bạn nhỏ [b1] bạn ra sân cùng chơi nhảy dây.',[{key:'b1',text:''}],{b1:'gọi'},'easy','Gọi bạn ra chơi',6),
      r(id,1,'fill_blank','Chúng tôi cùng [b1] và [b2] dưới sân trường.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'chạy',b2:'nhảy'},'easy','Chạy và nhảy là hoạt động vui chơi',7),
      r(id,1,'sorting','Sắp xếp các từ sau để tạo câu đúng: bạn / ra / gọi / sân / chơi',[{key:'1',text:'bạn'},{key:'2',text:'ra'},{key:'3',text:'gọi'},{key:'4',text:'sân'},{key:'5',text:'chơi'}],['3','1','2','4','5'],'easy','Gọi bạn ra sân chơi',8),
      r(id,1,'matching','Nối từ với hành động phù hợp:',[{key:'A',text:'Gọi'},{key:'B',text:'Chạy'},{key:'C',text:'Hát'}],{A:'Rủ bạn đến',B:'Di chuyển nhanh',C:'Cất tiếng ca'},'easy',null,9),
      r(id,1,'true_false','Bài thơ "Gọi bạn" nói về tình bạn và niềm vui khi chơi cùng nhau. Đúng hay sai?',null,true,'easy','Bài thơ ca ngợi tình bạn và niềm vui tuổi thơ',10),
      // Ex2 medium – dialogue comprehension
      r(id,2,'single_choice','Trong bài "Gọi bạn", bạn nhỏ gọi bạn để làm gì?',[{key:'A',text:'Đi học bài'},{key:'B',text:'Ra ngoài cùng chơi'},{key:'C',text:'Ăn cơm'}],'B','medium','Bạn nhỏ gọi bạn ra ngoài cùng vui chơi',1),
      r(id,2,'single_choice','Bạn nhỏ nói câu nào khi gọi bạn ra chơi?',[{key:'A',text:'Tớ không muốn chơi'},{key:'B',text:'Mình cùng ra chơi nhé!'},{key:'C',text:'Bạn ở nhà đi'}],'B','medium','Câu mời rủ bạn cùng chơi',2),
      r(id,2,'single_choice','Điều gì khiến bạn nhỏ vui khi có bạn cùng chơi?',[{key:'A',text:'Được ngủ nhiều hơn'},{key:'B',text:'Được chia sẻ niềm vui'},{key:'C',text:'Được ăn ngon hơn'}],'B','medium','Bạn bè cùng chơi mang lại niềm vui và sự chia sẻ',3),
      r(id,2,'true_false','Khi bạn nhỏ gọi bạn ra chơi, bạn kia vui vẻ đồng ý. Đúng hay sai?',null,true,'medium','Bạn kia đồng ý cùng ra chơi',4),
      r(id,2,'true_false','Bạn nhỏ gọi bạn qua điện thoại. Đúng hay sai?',null,false,'medium','Bạn nhỏ gọi bạn trực tiếp ra ngoài chơi',5),
      r(id,2,'fill_blank','Bạn nhỏ [b1] bạn: "Chúng mình cùng ra [b2] nhé!"',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'gọi',b2:'chơi'},'medium','Bạn nhỏ gọi bạn ra chơi',6),
      r(id,2,'matching','Nối câu hỏi với câu trả lời đúng theo nội dung bài:',[{key:'A',text:'Bạn nhỏ làm gì?'},{key:'B',text:'Tại sao gọi bạn?'},{key:'C',text:'Chơi trò gì?'}],{A:'Gọi bạn ra sân',B:'Muốn chơi cùng nhau',C:'Nhảy dây và chạy'},'medium',null,7),
      r(id,2,'single_choice','Từ nào thể hiện sự mời mọc, rủ rê bạn bè?',[{key:'A',text:'Bắt'},{key:'B',text:'Mời'},{key:'C',text:'Đuổi'}],'B','medium','Mời thể hiện sự lịch sự khi rủ bạn',8),
      r(id,2,'sorting','Sắp xếp đúng thứ tự: bạn nhỏ gọi bạn → bạn đồng ý → hai bạn cùng chơi',[{key:'1',text:'Hai bạn cùng chơi'},{key:'2',text:'Bạn nhỏ gọi bạn'},{key:'3',text:'Bạn đồng ý'}],['2','3','1'],'medium','Thứ tự diễn biến câu chuyện',9),
      r(id,2,'true_false','Chơi cùng bạn giúp chúng ta vui hơn khi chơi một mình. Đúng hay sai?',null,true,'medium','Chơi cùng bạn luôn vui hơn chơi một mình',10),
      // Ex3 hard – direct speech, purpose
      r(id,3,'single_choice','Câu nào là lời nói trực tiếp của bạn nhỏ khi gọi bạn?',[{key:'A',text:'Bạn nhỏ gọi bạn ra chơi.'},{key:'B',text:'"Bạn ơi, ra chơi với tớ nhé!"'},{key:'C',text:'Bạn nhỏ muốn chơi.'}],'B','hard','Lời nói trực tiếp đặt trong dấu ngoặc kép',1),
      r(id,3,'single_choice','Dấu hiệu nào cho biết đó là lời nói trực tiếp?',[{key:'A',text:'Dấu chấm hỏi'},{key:'B',text:'Dấu ngoặc kép " "'},{key:'C',text:'Dấu phẩy'}],'B','hard','Lời nói trực tiếp thường được đặt trong dấu ngoặc kép',2),
      r(id,3,'single_choice','Mục đích của việc gọi bạn trong bài là gì?',[{key:'A',text:'Để tranh giành đồ chơi'},{key:'B',text:'Để cùng vui chơi và gắn kết tình bạn'},{key:'C',text:'Để nhờ bạn làm bài tập'}],'B','hard','Gọi bạn nhằm cùng vui chơi và thắt chặt tình bạn',3),
      r(id,3,'true_false','Câu "Bạn ơi!" là câu gọi bạn trực tiếp. Đúng hay sai?',null,true,'hard','Đây là câu hô gọi trực tiếp',4),
      r(id,3,'fill_blank','Lời nói trực tiếp được đặt trong dấu [b1].',[{key:'b1',text:''}],{b1:'ngoặc kép'},'hard','Dấu ngoặc kép dùng cho lời nói trực tiếp',5),
      r(id,3,'matching','Nối câu với loại câu:',[{key:'A',text:'"Bạn ơi, ra chơi nhé!"'},{key:'B',text:'Bạn nhỏ gọi bạn ra chơi.'},{key:'C',text:'Tại sao bạn không ra chơi?'}],{A:'Lời nói trực tiếp',B:'Câu kể',C:'Câu hỏi'},'hard',null,6),
      r(id,3,'sorting','Sắp xếp các bước để viết câu gọi bạn: chọn từ gọi → thêm tên bạn → thêm lời mời → kết thúc câu',[{key:'1',text:'Thêm lời mời'},{key:'2',text:'Chọn từ gọi'},{key:'3',text:'Kết thúc câu'},{key:'4',text:'Thêm tên bạn'}],['2','4','1','3'],'hard','Thứ tự viết câu gọi bạn',7),
      r(id,3,'single_choice','Câu nào diễn đạt đúng mục đích gọi bạn đi chơi?',[{key:'A',text:'"Bạn ở nhà học bài đi!"'},{key:'B',text:'"Mình cùng ra sân chơi nhảy dây nhé!"'},{key:'C',text:'"Bạn làm ồn quá!"'}],'B','hard','Câu rủ bạn cùng ra chơi là đúng mục đích',8),
      r(id,3,'true_false','Trong bài "Gọi bạn", tình bạn được thể hiện qua hành động gọi nhau cùng vui chơi. Đúng hay sai?',null,true,'hard','Gọi bạn ra chơi là biểu hiện của tình bạn thân thiết',9),
      r(id,3,'fill_blank','Câu "[b1] ơi, ra chơi cùng tớ nhé!" là câu [b2] trực tiếp.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Bạn',b2:'nói'},'hard','Câu nói trực tiếp gọi bạn ra chơi',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1163: Bài 18 – Tớ nhớ cậu ────────────────────────────────────────────
  {
    const id = 1163;
    const rows: any[][] = [
      // Ex1 easy – feelings and letter parts vocab
      r(id,1,'single_choice','Từ nào diễn tả cảm xúc khi không gặp bạn lâu ngày?',[{key:'A',text:'Nhớ'},{key:'B',text:'Ghét'},{key:'C',text:'Sợ'}],'A','easy','Nhớ là cảm xúc mong muốn gặp lại người thân, bạn bè',1),
      r(id,1,'single_choice','Phần nào của lá thư viết ngày tháng?',[{key:'A',text:'Nội dung thư'},{key:'B',text:'Đầu thư'},{key:'C',text:'Ký tên'}],'B','easy','Ngày tháng thường viết ở đầu thư',2),
      r(id,1,'single_choice','Từ nào là từ biểu lộ tình cảm yêu mến?',[{key:'A',text:'Buồn'},{key:'B',text:'Yêu'},{key:'C',text:'Đau'}],'B','easy','Yêu là từ biểu lộ tình cảm yêu mến',3),
      r(id,1,'true_false','Lá thư bạn bè thường có lời chào ở đầu và cuối thư. Đúng hay sai?',null,true,'easy','Thư bạn bè có lời chào mở đầu và kết thúc',4),
      r(id,1,'true_false','Khi viết thư cho bạn, chúng ta không cần ký tên. Đúng hay sai?',null,false,'easy','Thư cần có chữ ký của người gửi',5),
      r(id,1,'fill_blank','Tớ rất [b1] cậu từ khi chúng mình xa nhau.',[{key:'b1',text:''}],{b1:'nhớ'},'easy','Nhớ bạn khi xa nhau',6),
      r(id,1,'fill_blank','Lá thư gồm: [b1] tháng, lời chào, nội dung, ký [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngày',b2:'tên'},'easy','Cấu trúc lá thư',7),
      r(id,1,'sorting','Sắp xếp các phần của lá thư theo đúng thứ tự:',[{key:'1',text:'Ký tên'},{key:'2',text:'Ngày tháng'},{key:'3',text:'Nội dung thư'},{key:'4',text:'Lời chào'}],['2','4','3','1'],'easy','Thứ tự: ngày tháng, lời chào, nội dung, ký tên',8),
      r(id,1,'matching','Nối cảm xúc với tình huống:',[{key:'A',text:'Nhớ'},{key:'B',text:'Vui'},{key:'C',text:'Buồn'}],{A:'Xa bạn lâu ngày',B:'Gặp lại bạn',C:'Mất đồ chơi'},'easy',null,9),
      r(id,1,'true_false','Từ "mong" nghĩa là muốn điều gì đó xảy ra. Đúng hay sai?',null,true,'easy','Mong là từ chỉ sự mong muốn, kỳ vọng',10),
      // Ex2 medium – letter comprehension
      r(id,2,'single_choice','Trong bài "Tớ nhớ cậu", ai viết thư cho ai?',[{key:'A',text:'Bạn nhỏ viết thư cho bố mẹ'},{key:'B',text:'Bạn nhỏ viết thư cho bạn'},{key:'C',text:'Thầy giáo viết thư cho học sinh'}],'B','medium','Đây là bức thư của bạn nhỏ gửi cho bạn',1),
      r(id,2,'single_choice','Lý do bạn nhỏ viết thư là gì?',[{key:'A',text:'Để kể về điểm kiểm tra'},{key:'B',text:'Vì nhớ bạn và muốn kể chuyện'},{key:'C',text:'Để hỏi bài tập về nhà'}],'B','medium','Bạn nhỏ viết thư vì nhớ bạn và muốn chia sẻ',2),
      r(id,2,'single_choice','Trong thư, bạn nhỏ kể điều gì?',[{key:'A',text:'Chuyện học tập và cuộc sống hằng ngày'},{key:'B',text:'Chuyện làm bài tập toán'},{key:'C',text:'Chuyện đi chợ cùng mẹ'}],'A','medium','Bạn nhỏ kể về cuộc sống và kỷ niệm bạn bè',3),
      r(id,2,'true_false','Bức thư trong bài thể hiện tình bạn thắm thiết, gắn bó. Đúng hay sai?',null,true,'medium','Nội dung thư thể hiện tình bạn đẹp',4),
      r(id,2,'true_false','Bạn nhỏ không nhớ tên bạn khi viết thư. Đúng hay sai?',null,false,'medium','Bạn nhỏ viết tên bạn rõ ràng trong thư',5),
      r(id,2,'fill_blank','Cuối thư, bạn nhỏ viết: "Tớ [b1] cậu!" thể hiện tình cảm nhớ thương.',[{key:'b1',text:''}],{b1:'nhớ'},'medium','Câu kết thư thể hiện tình cảm',6),
      r(id,2,'matching','Nối phần thư với nội dung:',[{key:'A',text:'Đầu thư'},{key:'B',text:'Nội dung'},{key:'C',text:'Cuối thư'}],{A:'Ngày tháng và lời chào',B:'Kể chuyện và chia sẻ',C:'Lời tạm biệt và ký tên'},'medium',null,7),
      r(id,2,'sorting','Sắp xếp các câu trong thư theo thứ tự hợp lý:',[{key:'1',text:'Tớ nhớ cậu lắm, cậu có khỏe không?'},{key:'2',text:'Hà Nội, ngày 20 tháng 9'},{key:'3',text:'Tạm biệt cậu nhé, tớ của cậu.'},{key:'4',text:'Bạn Minh thân mến!'}],['2','4','1','3'],'medium','Thứ tự: ngày, lời chào, nội dung, tạm biệt',8),
      r(id,2,'single_choice','Từ "mong" trong "Tớ mong sớm gặp lại cậu" có nghĩa gì?',[{key:'A',text:'Không muốn gặp'},{key:'B',text:'Hy vọng được gặp'},{key:'C',text:'Đã gặp rồi'}],'B','medium','Mong có nghĩa là hy vọng, kỳ vọng',9),
      r(id,2,'true_false','Thư bạn bè thường dùng ngôn ngữ thân mật, gần gũi. Đúng hay sai?',null,true,'medium','Thư bạn bè dùng ngôn ngữ thân mật như tớ, cậu',10),
      // Ex3 hard – letter format, formal vs informal
      r(id,3,'single_choice','Lời chào nào phù hợp khi viết thư cho bạn thân?',[{key:'A',text:'Kính gửi Quý Vị'},{key:'B',text:'Bạn Minh thân mến!'},{key:'C',text:'Thưa Thầy kính mến'}],'B','hard','Thư bạn bè dùng lời chào thân mật, không trang trọng',1),
      r(id,3,'single_choice','Lời chào nào dùng khi viết thư trang trọng, không phải thư bạn bè?',[{key:'A',text:'Cậu ơi!'},{key:'B',text:'Bạn ơi!'},{key:'C',text:'Kính gửi Thầy Hiệu trưởng'}],'C','hard','Kính gửi là lời chào trang trọng dùng trong thư chính thức',2),
      r(id,3,'fill_blank','Thư bạn bè dùng lời chào [b1] như "Cậu ơi", còn thư trang trọng dùng "[b2] gửi".',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thân mật',b2:'Kính'},'hard','Phân biệt thư thân mật và thư trang trọng',3),
      r(id,3,'matching','Nối loại thư với lời chào phù hợp:',[{key:'A',text:'Thư gửi bạn'},{key:'B',text:'Thư gửi thầy cô'},{key:'C',text:'Thư gửi ông bà'}],{A:'Bạn thân mến!',B:'Kính gửi Thầy/Cô',C:'Ông bà kính yêu!'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp đúng thứ tự viết lá thư hoàn chỉnh:',[{key:'1',text:'Ký tên (Bạn của cậu, Lan)'},{key:'2',text:'Ngày 15 tháng 10'},{key:'3',text:'Nội dung: Tớ nhớ cậu lắm...'},{key:'4',text:'Cậu Minh thân mến!'},{key:'5',text:'Tạm biệt cậu nhé!'}],['2','4','3','5','1'],'hard','Thứ tự chuẩn của lá thư',5),
      r(id,3,'true_false','Thư bạn bè có thể dùng từ "tớ", "cậu" thay cho "tôi", "bạn". Đúng hay sai?',null,true,'hard','Tớ, cậu là ngôn ngữ thân mật trong thư bạn bè',6),
      r(id,3,'single_choice','Phần nào của thư giúp người đọc biết thư viết khi nào?',[{key:'A',text:'Lời chào'},{key:'B',text:'Ngày tháng'},{key:'C',text:'Ký tên'}],'B','hard','Ngày tháng ghi ở đầu thư cho biết thời điểm viết thư',7),
      r(id,3,'fill_blank','Viết đầy đủ một lá thư cần có: ngày [b1], lời [b2], nội dung, lời tạm biệt và ký [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'tháng',b2:'chào',b3:'tên'},'hard','Năm phần cơ bản của một lá thư',8),
      r(id,3,'true_false','Cuối thư bạn bè có thể viết "Người bạn thân của cậu" thay cho ký tên. Đúng hay sai?',null,true,'hard','Cuối thư bạn bè có thể thêm lời thân mật trước khi ký tên',9),
      r(id,3,'single_choice','Từ nào KHÔNG phải cảm xúc được thể hiện trong bài "Tớ nhớ cậu"?',[{key:'A',text:'Nhớ'},{key:'B',text:'Mong'},{key:'C',text:'Tức giận'}],'C','hard','Bài nói về nhớ thương và mong chờ, không có tức giận',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1164: Bài 19 – Chữ A và những người bạn ───────────────────────────────
  {
    const id = 1164;
    const rows: any[][] = [
      // Ex1 easy – vowels/consonants, letter combinations
      r(id,1,'single_choice','Chữ "a" thuộc loại nào?',[{key:'A',text:'Nguyên âm'},{key:'B',text:'Phụ âm'},{key:'C',text:'Dấu thanh'}],'A','easy','a, e, ê, i, o, ô, ơ, u, ư, y là nguyên âm',1),
      r(id,1,'single_choice','Chữ "b" thuộc loại nào?',[{key:'A',text:'Nguyên âm'},{key:'B',text:'Phụ âm'},{key:'C',text:'Dấu thanh'}],'B','easy','b là phụ âm',2),
      r(id,1,'single_choice','Hai chữ nào ghép lại tạo thành "ch"?',[{key:'A',text:'c và g'},{key:'B',text:'c và h'},{key:'C',text:'t và h'}],'B','easy','ch = c + h',3),
      r(id,1,'true_false','Chữ "e" là nguyên âm. Đúng hay sai?',null,true,'easy','e là một trong các nguyên âm tiếng Việt',4),
      r(id,1,'true_false','Chữ "m" là nguyên âm. Đúng hay sai?',null,false,'easy','m là phụ âm, không phải nguyên âm',5),
      r(id,1,'fill_blank','Nguyên âm trong tiếng Việt gồm: a, [b1], ê, i, o, ô, ơ, u, ư, y.',[{key:'b1',text:''}],{b1:'e'},'easy','Danh sách các nguyên âm tiếng Việt',6),
      r(id,1,'fill_blank','Hai chữ "n" và "g" ghép lại tạo thành âm [b1].',[{key:'b1',text:''}],{b1:'ng'},'easy','ng là tổ hợp phụ âm',7),
      r(id,1,'sorting','Sắp xếp các chữ cái nguyên âm theo thứ tự bảng chữ cái:',[{key:'1',text:'o'},{key:'2',text:'a'},{key:'3',text:'i'},{key:'4',text:'e'}],['2','4','3','1'],'easy','Thứ tự: a, e, i, o',8),
      r(id,1,'matching','Nối tổ hợp phụ âm với các chữ tạo nên nó:',[{key:'A',text:'ch'},{key:'B',text:'th'},{key:'C',text:'ph'}],{A:'c + h',B:'t + h',C:'p + h'},'easy',null,9),
      r(id,1,'true_false','Chữ "gh" được ghép từ "g" và "h". Đúng hay sai?',null,true,'easy','gh = g + h, dùng trước e, ê, i',10),
      // Ex2 medium – story comprehension
      r(id,2,'single_choice','Trong bài "Chữ A và những người bạn", chữ A là gì của bảng chữ cái?',[{key:'A',text:'Chữ cuối cùng'},{key:'B',text:'Chữ đầu tiên'},{key:'C',text:'Chữ ở giữa'}],'B','medium','Chữ A là chữ đứng đầu bảng chữ cái tiếng Việt',1),
      r(id,2,'single_choice','Những "người bạn" của chữ A trong bài là gì?',[{key:'A',text:'Những bạn học sinh'},{key:'B',text:'Những chữ cái khác'},{key:'C',text:'Những con vật'}],'B','medium','Các chữ cái khác trong bảng chữ cái là bạn của chữ A',2),
      r(id,2,'single_choice','Điều gì xảy ra khi các chữ cái kết hợp với nhau?',[{key:'A',text:'Tạo thành từ và tiếng'},{key:'B',text:'Tạo thành số'},{key:'C',text:'Tạo thành hình vẽ'}],'A','medium','Chữ cái kết hợp tạo thành tiếng và từ',3),
      r(id,2,'true_false','Chữ A một mình không thể tạo thành từ có nghĩa. Đúng hay sai?',null,false,'medium','Chữ a một mình là từ có nghĩa (a, á, à...)',4),
      r(id,2,'fill_blank','Chữ A và chữ [b1] kết hợp tạo thành âm "an".',[{key:'b1',text:''}],{b1:'n'},'medium','a + n = an',5),
      r(id,2,'matching','Nối nguyên âm với ví dụ từ:',[{key:'A',text:'a'},{key:'B',text:'o'},{key:'C',text:'u'}],{A:'ba, ca, ma',B:'bo, co, to',C:'bu, cu, tu'},'medium',null,6),
      r(id,2,'sorting','Sắp xếp để tạo từ "bạn": các chữ b, ạ, n',[{key:'1',text:'n'},{key:'2',text:'b'},{key:'3',text:'ạ'}],['2','3','1'],'medium','b + ạ + n = bạn',7),
      r(id,2,'single_choice','Bài "Chữ A và những người bạn" muốn nói điều gì?',[{key:'A',text:'Chữ A là chữ quan trọng nhất'},{key:'B',text:'Các chữ cái cần nhau để tạo thành ngôn ngữ'},{key:'C',text:'Chỉ có chữ A mới tạo được từ'}],'B','medium','Bài học về tầm quan trọng của sự hợp tác giữa các chữ cái',8),
      r(id,2,'true_false','Nguyên âm có thể đứng một mình tạo thành tiếng. Đúng hay sai?',null,true,'medium','Nguyên âm như a, o, u... có thể đứng độc lập',9),
      r(id,2,'fill_blank','Bảng chữ cái tiếng Việt bắt đầu bằng chữ [b1] và kết thúc bằng chữ [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'a',b2:'y'},'medium','Bảng chữ cái tiếng Việt từ a đến y',10),
      // Ex3 hard – letter combinations, classification
      r(id,3,'single_choice','Tổ hợp "ngh" dùng trước những nguyên âm nào?',[{key:'A',text:'a, o, u'},{key:'B',text:'e, ê, i'},{key:'C',text:'ô, ơ, ư'}],'B','hard','ngh dùng trước e, ê, i (nghề, nghỉ...)',1),
      r(id,3,'single_choice','Chữ "gh" khác chữ "g" ở điểm nào?',[{key:'A',text:'gh viết hoa, g viết thường'},{key:'B',text:'gh dùng trước e, ê, i; g dùng trước các nguyên âm khác'},{key:'C',text:'Không có gì khác nhau'}],'B','hard','gh và g đều đọc như nhau nhưng dùng trong môi trường khác nhau',2),
      r(id,3,'fill_blank','Tổ hợp [b1] đọc như "qu" dùng trước âm "a", "e", "i".',[{key:'b1',text:''}],{b1:'qu'},'hard','qu là tổ hợp phụ âm đặc biệt trong tiếng Việt',3),
      r(id,3,'matching','Phân loại: nguyên âm hay phụ âm?',[{key:'A',text:'ê'},{key:'B',text:'tr'},{key:'C',text:'ư'},{key:'D',text:'ch'}],{A:'Nguyên âm',B:'Phụ âm',C:'Nguyên âm',D:'Phụ âm'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp để tạo từ "trường": t, r, ườ, n, g',[{key:'1',text:'n'},{key:'2',text:'t'},{key:'3',text:'g'},{key:'4',text:'r'},{key:'5',text:'ườ'}],['2','4','5','1','3'],'hard','tr + ườ + n + g = trường',5),
      r(id,3,'true_false','Tổ hợp "qu" được xem là một phụ âm ghép đặc biệt trong tiếng Việt. Đúng hay sai?',null,true,'hard','qu là tổ hợp phụ âm đặc biệt',6),
      r(id,3,'single_choice','Từ nào có tổ hợp phụ âm "ng" ở cuối?',[{key:'A',text:'Không gian'},{key:'B',text:'Sông'},{key:'C',text:'Ngôi'}],'B','hard','Sông có âm cuối là "ng"',7),
      r(id,3,'fill_blank','Trong tiếng Việt, các tổ hợp phụ âm đầu gồm: ch, [b1], ng, ngh, tr, [b2], ph, qu.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'gh',b2:'th'},'hard','Các tổ hợp phụ âm đầu tiếng Việt',8),
      r(id,3,'true_false','Nguyên âm "ươ" là nguyên âm đôi trong tiếng Việt. Đúng hay sai?',null,true,'hard','ươ là nguyên âm đôi (ươi, ương...)',9),
      r(id,3,'single_choice','Điều gì làm cho chữ A trở nên đặc biệt trong bảng chữ cái?',[{key:'A',text:'Chữ A đứng đầu tiên và là nguyên âm cơ bản'},{key:'B',text:'Chữ A không kết hợp với chữ nào'},{key:'C',text:'Chữ A chỉ có trong tiếng Việt'}],'A','hard','A là nguyên âm đứng đầu bảng chữ cái',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1165: Bài 20 – Nhím nâu kết bạn ──────────────────────────────────────
  {
    const id = 1165;
    const rows: any[][] = [
      // Ex1 easy – animal vocab, personality
      r(id,1,'single_choice','Nhím nâu là con vật như thế nào?',[{key:'A',text:'To lớn và hung dữ'},{key:'B',text:'Nhỏ nhắn và có gai trên lưng'},{key:'C',text:'Bay được trên trời'}],'B','easy','Nhím là loài động vật nhỏ, có gai bảo vệ trên lưng',1),
      r(id,1,'single_choice','Từ nào miêu tả tính cách của nhím nâu lúc đầu?',[{key:'A',text:'Dũng cảm'},{key:'B',text:'Nhút nhát'},{key:'C',text:'Tự tin'}],'B','easy','Nhím nâu ban đầu nhút nhát, sợ kết bạn',2),
      r(id,1,'single_choice','Từ nào có nghĩa là không sợ hãi, mạnh dạn?',[{key:'A',text:'Nhút nhát'},{key:'B',text:'Lo lắng'},{key:'C',text:'Dũng cảm'}],'C','easy','Dũng cảm nghĩa là không sợ, mạnh dạn',3),
      r(id,1,'true_false','Nhím nâu sống trong rừng. Đúng hay sai?',null,true,'easy','Nhím là loài động vật sống trong rừng',4),
      r(id,1,'true_false','Gai của nhím là để tấn công các con vật khác. Đúng hay sai?',null,false,'easy','Gai nhím dùng để tự bảo vệ, không phải tấn công',5),
      r(id,1,'fill_blank','Nhím nâu có bộ lông màu [b1] và nhiều [b2] nhọn trên lưng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nâu',b2:'gai'},'easy','Đặc điểm ngoại hình của nhím',6),
      r(id,1,'fill_blank','Lúc đầu, nhím nâu rất [b1] và không dám [b2] bạn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhút nhát',b2:'kết'},'easy','Tính cách ban đầu của nhím nâu',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Nhút nhát'},{key:'B',text:'Thân thiện'},{key:'C',text:'Dũng cảm'}],{A:'Hay sợ, không dám làm',B:'Hay giúp đỡ, vui vẻ',C:'Không sợ, mạnh dạn'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp theo trình tự thay đổi tính cách của nhím: dũng cảm / nhút nhát / thân thiện',[{key:'1',text:'Dũng cảm'},{key:'2',text:'Nhút nhát'},{key:'3',text:'Thân thiện'}],['2','1','3'],'easy','Nhím đi từ nhút nhát → dũng cảm → thân thiện',9),
      r(id,1,'true_false','Từ "rừng" chỉ nơi sinh sống của nhiều loài động vật hoang dã. Đúng hay sai?',null,true,'easy','Rừng là môi trường sống của nhiều động vật',10),
      // Ex2 medium – why shy, how made friends
      r(id,2,'single_choice','Tại sao nhím nâu nhút nhát, không dám kết bạn?',[{key:'A',text:'Vì nhím không thích chơi'},{key:'B',text:'Vì nhím sợ gai của mình sẽ làm đau bạn'},{key:'C',text:'Vì nhím không biết nói chuyện'}],'B','medium','Nhím sợ gai sắc nhọn của mình sẽ làm đau các bạn',1),
      r(id,2,'single_choice','Điều gì giúp nhím nâu dũng cảm kết bạn?',[{key:'A',text:'Nhím cắt bỏ gai đi'},{key:'B',text:'Nhím được bạn bè chủ động đến làm quen'},{key:'C',text:'Nhím học võ thuật'}],'B','medium','Bạn bè chủ động đến làm quen giúp nhím tự tin hơn',2),
      r(id,2,'single_choice','Sau khi kết bạn, nhím nâu cảm thấy thế nào?',[{key:'A',text:'Vẫn buồn như trước'},{key:'B',text:'Vui vẻ và hạnh phúc hơn'},{key:'C',text:'Sợ hãi hơn'}],'B','medium','Có bạn bè giúp nhím vui vẻ và hạnh phúc hơn',3),
      r(id,2,'true_false','Các bạn trong rừng từ chối chơi với nhím vì gai của nhím. Đúng hay sai?',null,false,'medium','Các bạn vẫn chơi với nhím và không sợ gai',4),
      r(id,2,'fill_blank','Nhím nâu sợ [b1] của mình sẽ làm [b2] các bạn nên không dám kết bạn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'gai',b2:'đau'},'medium','Lý do nhím nhút nhát không kết bạn',5),
      r(id,2,'matching','Nối nguyên nhân với kết quả:',[{key:'A',text:'Nhím sợ gai làm đau bạn'},{key:'B',text:'Bạn bè đến làm quen'},{key:'C',text:'Nhím vui vẻ chơi cùng'}],{A:'Nhím nhút nhát',B:'Nhím mạnh dạn hơn',C:'Nhím có nhiều bạn'},'medium',null,6),
      r(id,2,'sorting','Sắp xếp thứ tự câu chuyện nhím kết bạn:',[{key:'1',text:'Nhím có nhiều bạn mới'},{key:'2',text:'Nhím nhút nhát trong rừng'},{key:'3',text:'Bạn bè đến chơi cùng nhím'},{key:'4',text:'Nhím vui vẻ kết bạn'}],['2','3','4','1'],'medium','Diễn biến câu chuyện nhím kết bạn',7),
      r(id,2,'true_false','Gai của nhím không ngăn cản các bạn chơi cùng nhím. Đúng hay sai?',null,true,'medium','Các bạn vẫn chơi với nhím dù có gai',8),
      r(id,2,'single_choice','Bài học từ câu chuyện nhím nâu là gì?',[{key:'A',text:'Không nên chơi với con vật có gai'},{key:'B',text:'Đừng sợ, hãy mạnh dạn kết bạn'},{key:'C',text:'Chỉ chơi với bạn cùng loài'}],'B','medium','Bài học: đừng sợ hãi, hãy dũng cảm kết bạn',9),
      r(id,2,'fill_blank','Nhím nâu hiểu ra rằng mọi người đều có thể là [b1] của nhau.',[{key:'b1',text:''}],{b1:'bạn'},'medium','Bài học về tình bạn từ câu chuyện',10),
      // Ex3 hard – character traits, moral
      r(id,3,'single_choice','Tính cách nào của nhím thay đổi trong câu chuyện?',[{key:'A',text:'Màu lông'},{key:'B',text:'Tính nhút nhát sang mạnh dạn'},{key:'C',text:'Kích thước cơ thể'}],'B','hard','Nhím thay đổi từ nhút nhát sang dũng cảm kết bạn',1),
      r(id,3,'single_choice','Điều gì cho thấy nhím nâu là con vật có tấm lòng tốt?',[{key:'A',text:'Nhím sợ làm đau bạn nên không dám lại gần'},{key:'B',text:'Nhím ăn nhiều thức ăn trong rừng'},{key:'C',text:'Nhím chạy rất nhanh'}],'A','hard','Nhím sợ làm đau bạn thể hiện tấm lòng quan tâm đến người khác',2),
      r(id,3,'fill_blank','Thông điệp của bài: đừng [b1] kết bạn, vì mọi người đều có thể là [b2] của nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sợ',b2:'bạn'},'hard','Thông điệp chính của câu chuyện nhím nâu',3),
      r(id,3,'matching','Nối tính cách với hành động tương ứng của nhím:',[{key:'A',text:'Nhút nhát'},{key:'B',text:'Quan tâm'},{key:'C',text:'Dũng cảm'}],{A:'Trốn tránh không dám lại gần',B:'Sợ gai làm đau bạn',C:'Mạnh dạn bước đến làm quen'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp thông điệp theo mức độ quan trọng (từ cơ bản đến sâu sắc):',[{key:'1',text:'Mọi người đều có thể là bạn của nhau'},{key:'2',text:'Đừng sợ hãi khi kết bạn'},{key:'3',text:'Điểm khác biệt không ngăn cản tình bạn'}],['2','3','1'],'hard','Các thông điệp về tình bạn từ câu chuyện',5),
      r(id,3,'true_false','Câu chuyện nhím nâu dạy chúng ta không nên phán xét người khác qua bề ngoài. Đúng hay sai?',null,true,'hard','Không nên phán xét qua bề ngoài (gai nhím trông đáng sợ nhưng nhím có tấm lòng tốt)',6),
      r(id,3,'single_choice','Câu nào thể hiện đúng thông điệp của bài "Nhím nâu kết bạn"?',[{key:'A',text:'Chỉ kết bạn với người giống mình'},{key:'B',text:'Hãy mạnh dạn và cởi mở để kết bạn với mọi người'},{key:'C',text:'Đừng chơi với con vật có gai'}],'B','hard','Thông điệp: mạnh dạn, cởi mở kết bạn với mọi người',7),
      r(id,3,'fill_blank','Nhím nâu lúc đầu [b1] nhưng cuối cùng đã [b2] kết bạn với các bạn trong rừng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhút nhát',b2:'dũng cảm'},'hard','Sự thay đổi tính cách của nhím',8),
      r(id,3,'true_false','Sự khác biệt (như có gai) không phải lý do để không kết bạn. Đúng hay sai?',null,true,'hard','Câu chuyện dạy rằng khác biệt không ngăn cản tình bạn',9),
      r(id,3,'single_choice','Vì sao câu chuyện nhím nâu phù hợp với trẻ em lớp 2?',[{key:'A',text:'Vì có nhiều phép tính khó'},{key:'B',text:'Vì dạy bài học về tình bạn và sự dũng cảm đơn giản, dễ hiểu'},{key:'C',text:'Vì kể về lịch sử xa xưa'}],'B','hard','Bài học tình bạn và dũng cảm phù hợp với lứa tuổi lớp 2',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1166: Bài 21 – Thả diều ────────────────────────────────────────────────
  {
    const id = 1166;
    const rows: any[][] = [
      // Ex1 easy – kite vocab, weather
      r(id,1,'single_choice','Đồ vật nào được thả lên trời nhờ gió?',[{key:'A',text:'Bóng đá'},{key:'B',text:'Diều'},{key:'C',text:'Ô tô'}],'B','easy','Diều được thả lên cao nhờ sức gió',1),
      r(id,1,'single_choice','Muốn thả diều bay cao, cần điều kiện thời tiết nào?',[{key:'A',text:'Trời mưa'},{key:'B',text:'Gió mạnh'},{key:'C',text:'Trời nóng'}],'B','easy','Diều bay nhờ gió, gió mạnh diều bay cao hơn',2),
      r(id,1,'single_choice','Phần nào của diều giúp diều giữ thăng bằng khi bay?',[{key:'A',text:'Dây diều'},{key:'B',text:'Cánh diều'},{key:'C',text:'Cả cánh và đuôi diều'}],'C','easy','Cánh và đuôi giúp diều thăng bằng khi bay',3),
      r(id,1,'true_false','Gió nhẹ thì diều bay cao hơn gió mạnh. Đúng hay sai?',null,false,'easy','Gió mạnh giúp diều bay cao hơn',4),
      r(id,1,'true_false','Dây diều giúp giữ diều không bay đi mất. Đúng hay sai?',null,true,'easy','Dây diều kết nối diều với người thả, giúp kiểm soát diều',5),
      r(id,1,'fill_blank','Bầu trời [b1] và [b2] nhẹ là điều kiện lý tưởng để thả diều.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xanh',b2:'gió'},'easy','Thời tiết đẹp để thả diều',6),
      r(id,1,'fill_blank','Diều [b1] cao trên bầu trời xanh nhờ sức [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bay',b2:'gió'},'easy','Diều bay nhờ gió',7),
      r(id,1,'matching','Nối từ với đặc điểm:',[{key:'A',text:'Gió mạnh'},{key:'B',text:'Gió nhẹ'},{key:'C',text:'Không có gió'}],{A:'Diều bay cao',B:'Diều bay vừa',C:'Diều không bay được'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp để tạo câu: diều / bay / bầu trời / xanh / cao / trên',[{key:'1',text:'bầu trời'},{key:'2',text:'diều'},{key:'3',text:'xanh'},{key:'4',text:'bay'},{key:'5',text:'cao'},{key:'6',text:'trên'}],['2','4','5','6','1','3'],'easy','Diều bay cao trên bầu trời xanh',9),
      r(id,1,'true_false','Cánh đồng là nơi tốt để thả diều vì không có cây cao cản gió. Đúng hay sai?',null,true,'easy','Cánh đồng thoáng rộng, gió thổi đều, thích hợp thả diều',10),
      // Ex2 medium – feelings, what child sees
      r(id,2,'single_choice','Trong bài "Thả diều", bạn nhỏ cảm thấy thế nào khi thả diều?',[{key:'A',text:'Buồn chán'},{key:'B',text:'Vui sướng, phấn khởi'},{key:'C',text:'Sợ hãi'}],'B','medium','Thả diều mang lại niềm vui, sự phấn khởi cho bạn nhỏ',1),
      r(id,2,'single_choice','Nhìn lên bầu trời khi thả diều, bạn nhỏ thấy gì?',[{key:'A',text:'Mây đen và mưa'},{key:'B',text:'Diều bay lượn, mây trắng, bầu trời xanh'},{key:'C',text:'Chỉ thấy nắng chói'}],'B','medium','Bạn nhỏ nhìn thấy cảnh đẹp của bầu trời khi thả diều',2),
      r(id,2,'single_choice','Cảm giác nào bạn nhỏ có khi nhìn diều bay cao?',[{key:'A',text:'Tự do, nhẹ nhàng như bay cùng diều'},{key:'B',text:'Lo lắng diều sẽ rơi'},{key:'C',text:'Chán nản'}],'A','medium','Nhìn diều bay tạo cảm giác tự do, nhẹ nhàng',3),
      r(id,2,'true_false','Thả diều là trò chơi giúp bạn nhỏ gần gũi với thiên nhiên. Đúng hay sai?',null,true,'medium','Thả diều kết nối con người với thiên nhiên, bầu trời',4),
      r(id,2,'fill_blank','Bạn nhỏ [b1] diều trên cánh đồng rộng, diều [b2] cao mãi lên trời xanh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thả',b2:'bay'},'medium','Hoạt động thả diều của bạn nhỏ',5),
      r(id,2,'matching','Nối cảnh vật với mô tả:',[{key:'A',text:'Bầu trời'},{key:'B',text:'Diều'},{key:'C',text:'Gió'}],{A:'Xanh rộng mênh mông',B:'Bay lượn uyển chuyển',C:'Nhẹ nhàng thổi mát'},'medium',null,6),
      r(id,2,'single_choice','Điều nào KHÔNG có trong cảnh thả diều được miêu tả trong bài?',[{key:'A',text:'Bầu trời xanh'},{key:'B',text:'Gió thổi'},{key:'C',text:'Sóng biển'}],'C','medium','Sóng biển không xuất hiện trong cảnh thả diều trên cánh đồng',7),
      r(id,2,'sorting','Sắp xếp các hoạt động theo thứ tự khi thả diều:',[{key:'1',text:'Nhìn diều bay cao'},{key:'2',text:'Ra cánh đồng'},{key:'3',text:'Chạy để diều bay lên'},{key:'4',text:'Cầm dây diều'}],['2','4','3','1'],'medium','Thứ tự các bước thả diều',8),
      r(id,2,'true_false','Bài "Thả diều" thể hiện niềm vui của trẻ em khi được vui chơi ngoài trời. Đúng hay sai?',null,true,'medium','Bài thơ ca ngợi niềm vui thả diều của trẻ em',9),
      r(id,2,'fill_blank','Nhìn diều [b1] cao, bạn nhỏ cảm thấy như mình cũng đang [b2] cùng diều.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bay',b2:'bay'},'medium','Cảm giác tự do khi nhìn diều bay',10),
      // Ex3 hard – simile, descriptive language
      r(id,3,'single_choice','Câu "Diều bay như chim" là ví dụ của biện pháp tu từ nào?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Liệt kê'}],'A','hard','So sánh: diều được so sánh với chim qua từ "như"',1),
      r(id,3,'single_choice','Từ nào thường dùng để so sánh trong câu so sánh?',[{key:'A',text:'Và'},{key:'B',text:'Như, tựa như'},{key:'C',text:'Nhưng'}],'B','hard','Như, tựa như là từ so sánh phổ biến',2),
      r(id,3,'fill_blank','Câu "Diều nhẹ [b1] mây" sử dụng biện pháp [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'như',b2:'so sánh'},'hard','So sánh diều với mây qua từ "như"',3),
      r(id,3,'matching','Nối hình ảnh với từ so sánh phù hợp:',[{key:'A',text:'Diều bay lên'},{key:'B',text:'Gió thổi nhẹ'},{key:'C',text:'Bầu trời rộng'}],{A:'như chim tung cánh',B:'như hơi thở',C:'như biển xanh'},'hard',null,4),
      r(id,3,'single_choice','Câu nào sử dụng ngôn ngữ miêu tả sinh động nhất?',[{key:'A',text:'Diều bay.'},{key:'B',text:'Con diều bay lên trời.'},{key:'C',text:'Con diều đỏ rực bay lượn nhẹ nhàng như cánh chim trên bầu trời xanh biếc.'}],'C','hard','Câu C có nhiều tính từ và so sánh, miêu tả sinh động nhất',5),
      r(id,3,'sorting','Sắp xếp từ hay nhất đến kém sinh động: "diều bay" / "diều bay cao" / "diều đỏ bay cao như chim"',[{key:'1',text:'Diều bay'},{key:'2',text:'Diều bay cao'},{key:'3',text:'Diều đỏ bay cao như chim'}],['3','2','1'],'hard','Câu có nhiều chi tiết miêu tả thì sinh động hơn',6),
      r(id,3,'fill_blank','Viết câu so sánh về diều: "Diều bay [b1] như [b2]."',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'lên cao',b2:'chim'},'hard','Tạo câu so sánh với diều',7),
      r(id,3,'true_false','Biện pháp so sánh giúp câu văn trở nên hấp dẫn và dễ hình dung hơn. Đúng hay sai?',null,true,'hard','So sánh tạo hình ảnh sinh động, dễ liên tưởng',8),
      r(id,3,'single_choice','Từ nào trong câu "Gió nhẹ thổi, diều lượn lờ" là từ tượng thanh/tượng hình?',[{key:'A',text:'Nhẹ'},{key:'B',text:'Lượn lờ'},{key:'C',text:'Diều'}],'B','hard','Lượn lờ gợi hình ảnh chuyển động uyển chuyển của diều',9),
      r(id,3,'true_false','Câu "Diều là người bạn của gió" là câu nhân hóa. Đúng hay sai?',null,true,'hard','Gọi diều là "người bạn" của gió là nhân hóa đồ vật',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1167: Bài 22 – Tớ là lê-gô ────────────────────────────────────────────
  {
    const id = 1167;
    const rows: any[][] = [
      // Ex1 easy – building vocab, shapes, colors
      r(id,1,'single_choice','Lê-gô là đồ chơi như thế nào?',[{key:'A',text:'Đồ chơi lắp ghép bằng những mảnh nhỏ'},{key:'B',text:'Đồ chơi điện tử'},{key:'C',text:'Búp bê vải'}],'A','easy','Lê-gô là đồ chơi lắp ghép từ các mảnh nhựa nhỏ',1),
      r(id,1,'single_choice','Từ nào có nghĩa là tháo rời ra từng phần?',[{key:'A',text:'Lắp'},{key:'B',text:'Tháo'},{key:'C',text:'Ghép'}],'B','easy','Tháo nghĩa là tách rời các phần ra',2),
      r(id,1,'single_choice','Hình vuông có mấy cạnh bằng nhau?',[{key:'A',text:'3 cạnh'},{key:'B',text:'4 cạnh'},{key:'C',text:'6 cạnh'}],'B','easy','Hình vuông có 4 cạnh bằng nhau',3),
      r(id,1,'true_false','Lắp và ghép có nghĩa tương tự nhau: đặt các mảnh lại với nhau. Đúng hay sai?',null,true,'easy','Lắp và ghép đều có nghĩa kết hợp các phần lại',4),
      r(id,1,'true_false','Hình chữ nhật và hình vuông đều có 4 cạnh. Đúng hay sai?',null,true,'easy','Cả hình vuông và hình chữ nhật đều có 4 cạnh',5),
      r(id,1,'fill_blank','Em [b1] các mảnh lê-gô lại để [b2] thành ngôi nhà.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ghép',b2:'xây'},'easy','Ghép lê-gô để xây công trình',6),
      r(id,1,'fill_blank','Các mảnh lê-gô có hình [b1] và hình [b2] khác nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vuông',b2:'chữ nhật'},'easy','Các hình dạng phổ biến của mảnh lê-gô',7),
      r(id,1,'matching','Nối từ với hành động:',[{key:'A',text:'Xây'},{key:'B',text:'Tháo'},{key:'C',text:'Ghép'}],{A:'Tạo nên công trình',B:'Tách rời các mảnh',C:'Kết hợp các mảnh'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ lớn đến nhỏ về kích thước hình dạng: tròn lớn / vuông nhỏ / chữ nhật vừa',[{key:'1',text:'Tròn lớn'},{key:'2',text:'Vuông nhỏ'},{key:'3',text:'Chữ nhật vừa'}],['1','3','2'],'easy','Sắp xếp theo kích thước từ lớn đến nhỏ',9),
      r(id,1,'true_false','Màu sắc của các mảnh lê-gô giúp công trình đẹp và sinh động hơn. Đúng hay sai?',null,true,'easy','Màu sắc đa dạng làm cho tác phẩm lê-gô đẹp hơn',10),
      // Ex2 medium – sequence of building
      r(id,2,'single_choice','Trong bài "Tớ là lê-gô", bạn nhỏ đang làm gì?',[{key:'A',text:'Vẽ tranh'},{key:'B',text:'Lắp ghép lê-gô thành công trình'},{key:'C',text:'Đọc sách'}],'B','medium','Bạn nhỏ đang lắp ghép lê-gô',1),
      r(id,2,'single_choice','Bước đầu tiên khi bắt đầu lắp lê-gô là gì?',[{key:'A',text:'Xây tường ngay'},{key:'B',text:'Chọn và sắp xếp các mảnh cần dùng'},{key:'C',text:'Tháo hết ra'}],'B','medium','Bước đầu tiên là chuẩn bị, chọn các mảnh phù hợp',2),
      r(id,2,'sorting','Sắp xếp đúng thứ tự các bước lắp lê-gô:',[{key:'1',text:'Hoàn thiện và ngắm nhìn tác phẩm'},{key:'2',text:'Lắp dần các mảnh theo kế hoạch'},{key:'3',text:'Chọn mảnh và lên kế hoạch'},{key:'4',text:'Ghép các mảnh cơ bản đầu tiên'}],['3','4','2','1'],'medium','Thứ tự lắp ráp lê-gô',3),
      r(id,2,'true_false','Khi lắp lê-gô sai, ta có thể tháo ra và lắp lại. Đúng hay sai?',null,true,'medium','Lê-gô có thể tháo ra lắp lại nhiều lần',4),
      r(id,2,'fill_blank','Bạn nhỏ [b1] từng mảnh lê-gô một cách cẩn thận để [b2] thành tòa tháp cao.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ghép',b2:'xây'},'medium','Quá trình lắp ráp lê-gô',5),
      r(id,2,'matching','Nối bước với mô tả:',[{key:'A',text:'Bước 1'},{key:'B',text:'Bước 2'},{key:'C',text:'Bước 3'}],{A:'Chuẩn bị mảnh ghép',B:'Lắp ráp theo thứ tự',C:'Hoàn thiện tác phẩm'},'medium',null,6),
      r(id,2,'single_choice','Khi lắp lê-gô, điều gì quan trọng nhất?',[{key:'A',text:'Lắp thật nhanh'},{key:'B',text:'Lắp đúng theo kế hoạch, từng bước một'},{key:'C',text:'Dùng càng nhiều mảnh càng tốt'}],'B','medium','Lắp lê-gô cần kiên nhẫn, theo đúng thứ tự',7),
      r(id,2,'true_false','Lê-gô giúp trẻ em phát triển tư duy sáng tạo và kiên nhẫn. Đúng hay sai?',null,true,'medium','Chơi lê-gô phát triển sáng tạo và kiên nhẫn',8),
      r(id,2,'fill_blank','Sau khi [b1] xong, bạn nhỏ rất tự hào về công trình lê-gô của mình.',[{key:'b1',text:''}],{b1:'lắp'},'medium','Cảm xúc sau khi hoàn thành tác phẩm',9),
      r(id,2,'single_choice','Điều thú vị nhất của lê-gô là gì?',[{key:'A',text:'Có thể tháo ra lắp lại, tạo ra nhiều thứ khác nhau'},{key:'B',text:'Rất rẻ tiền'},{key:'C',text:'Chỉ có một cách chơi duy nhất'}],'A','medium','Tính linh hoạt, sáng tạo là điều thú vị của lê-gô',10),
      // Ex3 hard – categorize shapes, creative language
      r(id,3,'single_choice','Mảnh lê-gô hình nào có số cạnh nhiều nhất?',[{key:'A',text:'Hình vuông (4 cạnh)'},{key:'B',text:'Hình tam giác (3 cạnh)'},{key:'C',text:'Hình lục giác (6 cạnh)'}],'C','hard','Hình lục giác có 6 cạnh, nhiều nhất trong 3 hình',1),
      r(id,3,'matching','Phân loại mảnh lê-gô theo hình dạng:',[{key:'A',text:'4 cạnh bằng nhau'},{key:'B',text:'4 cạnh, 2 cặp bằng nhau'},{key:'C',text:'Không có cạnh, đường cong'}],{A:'Hình vuông',B:'Hình chữ nhật',C:'Hình tròn'},'hard',null,2),
      r(id,3,'fill_blank','Hình [b1] có 3 cạnh, hình [b2] có 4 cạnh bằng nhau, hình [b3] không có cạnh.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'tam giác',b2:'vuông',b3:'tròn'},'hard','Đặc điểm của các hình cơ bản',3),
      r(id,3,'single_choice','Câu nào miêu tả sáng tạo khi chơi lê-gô hay nhất?',[{key:'A',text:'Tớ xếp lê-gô.'},{key:'B',text:'Tớ xếp lê-gô thành nhà.'},{key:'C',text:'Từ những mảnh lê-gô nhỏ bé, tớ xây nên cả một thành phố trong mơ!'}],'C','hard','Câu C sử dụng ngôn ngữ phong phú, sáng tạo',4),
      r(id,3,'sorting','Sắp xếp từ đơn giản đến phức tạp trong xây dựng lê-gô:',[{key:'1',text:'Tòa nhà 10 tầng'},{key:'2',text:'Bức tường đơn'},{key:'3',text:'Ngôi nhà có cửa sổ'},{key:'4',text:'Thành phố thu nhỏ'}],['2','3','1','4'],'hard','Mức độ phức tạp tăng dần',5),
      r(id,3,'true_false','Khi chơi lê-gô, bạn có thể tự do sáng tạo mà không cần theo hướng dẫn. Đúng hay sai?',null,true,'hard','Lê-gô cho phép sáng tạo tự do không giới hạn',6),
      r(id,3,'fill_blank','Bài "Tớ là lê-gô" nói về niềm vui [b1] và sự [b2] khi chơi lê-gô.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sáng tạo',b2:'kiên nhẫn'},'hard','Giá trị của trò chơi lê-gô',7),
      r(id,3,'single_choice','Từ nào mô tả đúng nhất giá trị của trò chơi lê-gô?',[{key:'A',text:'Nhàm chán'},{key:'B',text:'Sáng tạo và vui vẻ'},{key:'C',text:'Nguy hiểm'}],'B','hard','Lê-gô mang lại sự sáng tạo và niềm vui',8),
      r(id,3,'true_false','Chơi lê-gô dạy bạn nhỏ cách giải quyết vấn đề theo từng bước. Đúng hay sai?',null,true,'hard','Lắp ghép lê-gô theo trình tự dạy kỹ năng giải quyết vấn đề',9),
      r(id,3,'single_choice','Thông điệp của bài "Tớ là lê-gô" là gì?',[{key:'A',text:'Chỉ nên mua đồ chơi đắt tiền'},{key:'B',text:'Niềm vui sáng tạo từ những điều đơn giản'},{key:'C',text:'Lê-gô chỉ dành cho người lớn'}],'B','hard','Bài ca ngợi niềm vui sáng tạo từ những mảnh lê-gô nhỏ',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1168: Bài 23 – Rồng rắn lên mây ──────────────────────────────────────
  {
    const id = 1168;
    const rows: any[][] = [
      // Ex1 easy – folk rhyme vocab, game roles
      r(id,1,'single_choice','Trong trò chơi "Rồng rắn lên mây", ai đóng vai thầy thuốc?',[{key:'A',text:'Người đứng đầu hàng'},{key:'B',text:'Một bạn đứng riêng, không vào hàng'},{key:'C',text:'Người đứng cuối hàng'}],'B','medium','Thầy thuốc là người đứng ngoài hàng, không tham gia chuỗi rồng rắn',1),
      r(id,1,'single_choice','Trong đoàn rồng rắn, "đầu rồng" là ai?',[{key:'A',text:'Người đứng đầu tiên'},{key:'B',text:'Người đứng cuối cùng'},{key:'C',text:'Người đứng giữa'}],'A','easy','Đầu rồng là người dẫn đầu chuỗi',2),
      r(id,1,'single_choice','Trò chơi dân gian là gì?',[{key:'A',text:'Trò chơi điện tử'},{key:'B',text:'Trò chơi truyền thống của ông cha để lại'},{key:'C',text:'Trò chơi mới nhập từ nước ngoài'}],'B','easy','Trò chơi dân gian là trò chơi truyền thống của dân tộc',3),
      r(id,1,'true_false','Rồng rắn lên mây là trò chơi dân gian của Việt Nam. Đúng hay sai?',null,true,'easy','Đây là trò chơi dân gian truyền thống của Việt Nam',4),
      r(id,1,'true_false','Trong trò chơi, khúc đuôi là người đứng đầu hàng. Đúng hay sai?',null,false,'easy','Khúc đuôi là người đứng cuối hàng',5),
      r(id,1,'fill_blank','Trong đoàn rồng rắn có: đầu [b1], khúc [b2] và khúc [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'rồng',b2:'giữa',b3:'đuôi'},'easy','Ba phần của đoàn rồng rắn',6),
      r(id,1,'fill_blank','Các bạn đọc bài đồng dao và [b1] đến nhà [b2] thuốc để xin lửa.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đi',b2:'thầy'},'easy','Nội dung bài đồng dao trong trò chơi',7),
      r(id,1,'matching','Nối vai trong trò chơi với mô tả:',[{key:'A',text:'Thầy thuốc'},{key:'B',text:'Đầu rồng'},{key:'C',text:'Khúc đuôi'}],{A:'Đứng ngoài, không vào hàng',B:'Dẫn đầu chuỗi',C:'Người cuối hàng'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các từ khóa trong bài đồng dao theo thứ tự xuất hiện: lên mây / thầy thuốc / rồng rắn / xin lửa',[{key:'1',text:'Lên mây'},{key:'2',text:'Thầy thuốc'},{key:'3',text:'Rồng rắn'},{key:'4',text:'Xin lửa'}],['3','1','2','4'],'easy','Thứ tự xuất hiện trong bài đồng dao',9),
      r(id,1,'true_false','Trò chơi rồng rắn thường được chơi ngoài trời với nhiều người tham gia. Đúng hay sai?',null,true,'easy','Rồng rắn là trò chơi tập thể ngoài trời',10),
      // Ex2 medium – what happens, who plays which role
      r(id,2,'single_choice','Trong trò chơi rồng rắn, đoàn người cầm vai ai đứng trước?',[{key:'A',text:'Vai thầy thuốc'},{key:'B',text:'Vai người đứng trước mình'},{key:'C',text:'Không cầm ai'}],'B','medium','Mỗi người cầm vào vai người đứng trước để tạo thành chuỗi',1),
      r(id,2,'single_choice','Thầy thuốc làm gì khi đoàn rồng rắn đến?',[{key:'A',text:'Chạy trốn'},{key:'B',text:'Hỏi và cố bắt khúc đuôi'},{key:'C',text:'Đứng im không làm gì'}],'B','medium','Thầy thuốc hỏi đáp và cố bắt người ở khúc đuôi',2),
      r(id,2,'single_choice','Khi thầy thuốc bắt được khúc đuôi thì sao?',[{key:'A',text:'Trò chơi tiếp tục bình thường'},{key:'B',text:'Khúc đuôi trở thành thầy thuốc mới'},{key:'C',text:'Tất cả dừng chơi'}],'B','medium','Người bị bắt sẽ đổi vai thành thầy thuốc',3),
      r(id,2,'true_false','Đầu rồng phải bảo vệ không cho thầy thuốc bắt khúc đuôi. Đúng hay sai?',null,true,'medium','Đầu rồng dang tay ngăn thầy thuốc bắt khúc đuôi',4),
      r(id,2,'fill_blank','Đoàn rồng rắn đi vòng quanh và [b1] bài đồng dao để tiến đến nhà [b2] thuốc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đọc',b2:'thầy'},'medium','Hoạt động của đoàn rồng rắn',5),
      r(id,2,'matching','Nối hành động với vai trong trò chơi:',[{key:'A',text:'Dẫn đầu, bảo vệ đuôi'},{key:'B',text:'Bám vai người trước'},{key:'C',text:'Cố bắt người cuối hàng'}],{A:'Đầu rồng',B:'Khúc giữa',C:'Thầy thuốc'},'medium',null,6),
      r(id,2,'sorting','Sắp xếp diễn biến trò chơi rồng rắn:',[{key:'1',text:'Thầy thuốc cố bắt khúc đuôi'},{key:'2',text:'Đoàn rồng rắn đọc đồng dao đến nhà thầy thuốc'},{key:'3',text:'Đổi vai nếu bị bắt'},{key:'4',text:'Tất cả đứng thành hàng'}],['4','2','1','3'],'medium','Diễn biến trò chơi rồng rắn lên mây',7),
      r(id,2,'true_false','Trò chơi rồng rắn giúp các bạn vui vẻ, rèn luyện phản xạ nhanh. Đúng hay sai?',null,true,'medium','Trò chơi tập thể rèn luyện thể lực và phản xạ',8),
      r(id,2,'fill_blank','Thầy thuốc hỏi: "Xin [b1]!" Đầu rồng trả lời: "Không [b2]!"',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'lửa',b2:'cho'},'medium','Hội thoại trong trò chơi rồng rắn',9),
      r(id,2,'single_choice','Trò chơi rồng rắn kết thúc khi nào?',[{key:'A',text:'Khi tất cả mệt quá'},{key:'B',text:'Khi thầy thuốc bắt được khúc đuôi và đổi vai'},{key:'C',text:'Khi đọc xong bài đồng dao'}],'B','medium','Trò chơi đổi vai khi khúc đuôi bị bắt',10),
      // Ex3 hard – rhyming words, cultural significance
      r(id,3,'single_choice','Trong bài đồng dao, từ nào vần với "mây"?',[{key:'A',text:'Rắn'},{key:'B',text:'Thầy'},{key:'C',text:'Rồng'}],'B','hard','Mây vần với thầy (vần ay)',1),
      r(id,3,'single_choice','Đồng dao là gì?',[{key:'A',text:'Bài hát dân gian dành cho trẻ em'},{key:'B',text:'Bài thơ khó học'},{key:'C',text:'Bài hát của người lớn'}],'A','hard','Đồng dao là bài hát dân gian, vần điệu vui dành cho trẻ em',2),
      r(id,3,'fill_blank','Trong bài đồng dao "Rồng rắn lên [b1]", từ "mây" vần với từ "[b2]" ở câu sau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mây',b2:'thầy'},'hard','Vần điệu trong bài đồng dao',3),
      r(id,3,'matching','Nối từ với từ vần cùng:',[{key:'A',text:'Mây'},{key:'B',text:'Rắn'},{key:'C',text:'Đuôi'}],{A:'Thầy',B:'Bắn',C:'Người'},'hard',null,4),
      r(id,3,'single_choice','Ý nghĩa văn hóa của trò chơi dân gian là gì?',[{key:'A',text:'Chỉ để giải trí, không có ý nghĩa gì'},{key:'B',text:'Gìn giữ văn hóa dân tộc và gắn kết cộng đồng'},{key:'C',text:'Trò chơi nhập khẩu từ nước ngoài'}],'B','hard','Trò chơi dân gian giữ gìn văn hóa và gắn kết cộng đồng',5),
      r(id,3,'sorting','Sắp xếp từ vần điệu trong bài đồng dao: mây - thầy - thuốc - rắn - lên',[{key:'1',text:'mây'},{key:'2',text:'thầy'},{key:'3',text:'thuốc'},{key:'4',text:'rắn'},{key:'5',text:'lên'}],['5','1','2','3','4'],'hard','Thứ tự từ trong câu mở đầu bài đồng dao',6),
      r(id,3,'true_false','Trò chơi dân gian rồng rắn lên mây được truyền từ thế hệ này sang thế hệ khác. Đúng hay sai?',null,true,'hard','Trò chơi dân gian là di sản văn hóa được truyền lại',7),
      r(id,3,'fill_blank','Trò chơi dân gian giúp trẻ em [b1] thể lực và [b2] tinh thần đồng đội.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'rèn luyện',b2:'phát triển'},'hard','Giá trị của trò chơi dân gian',8),
      r(id,3,'single_choice','Điều nào KHÔNG phải ý nghĩa của trò chơi dân gian?',[{key:'A',text:'Gắn kết bạn bè'},{key:'B',text:'Giữ gìn văn hóa dân tộc'},{key:'C',text:'Thay thế hoàn toàn trò chơi điện tử'}],'C','hard','Trò chơi dân gian bổ sung chứ không thay thế hoàn toàn các trò chơi khác',9),
      r(id,3,'true_false','Vần điệu trong bài đồng dao giúp trẻ dễ nhớ và hứng thú khi chơi. Đúng hay sai?',null,true,'hard','Vần điệu tạo nhạc điệu vui, giúp trẻ dễ nhớ và thích thú',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1169: Bài 24 – Nặn đồ chơi ────────────────────────────────────────────
  {
    const id = 1169;
    const rows: any[][] = [
      // Ex1 easy – clay/craft vocab, shape adjectives
      r(id,1,'single_choice','Đất nặn có đặc điểm gì?',[{key:'A',text:'Cứng và giòn'},{key:'B',text:'Mềm và dẻo'},{key:'C',text:'Sắc và nhọn'}],'B','easy','Đất nặn mềm, dẻo, dễ tạo hình',1),
      r(id,1,'single_choice','Từ nào miêu tả đồ vật có hình cầu, không có cạnh?',[{key:'A',text:'Dài'},{key:'B',text:'Vuông'},{key:'C',text:'Tròn'}],'C','easy','Tròn miêu tả hình dạng như quả bóng, không có cạnh',2),
      r(id,1,'single_choice','Bước đầu tiên khi nặn đồ chơi bằng đất nặn là gì?',[{key:'A',text:'Lấy đất nặn và nhào cho mềm'},{key:'B',text:'Sơn màu ngay'},{key:'C',text:'Cắt đất nặn thành nhiều mảnh nhỏ'}],'A','easy','Đầu tiên cần nhào đất nặn cho dẻo mềm',3),
      r(id,1,'true_false','Đất nặn có thể được nặn thành nhiều hình dạng khác nhau. Đúng hay sai?',null,true,'easy','Đất nặn rất linh hoạt, có thể tạo ra nhiều hình dạng',4),
      r(id,1,'true_false','Hình dẹt là hình có chiều cao rất lớn. Đúng hay sai?',null,false,'easy','Hình dẹt là hình mỏng, chiều cao nhỏ',5),
      r(id,1,'fill_blank','Đất nặn rất [b1] và [b2], em có thể tạo ra mọi hình dạng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mềm',b2:'dẻo'},'easy','Đặc điểm của đất nặn',6),
      r(id,1,'fill_blank','Em nặn quả bóng [b1] và con rắn [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tròn',b2:'dài'},'easy','Hình dạng của đồ vật nặn',7),
      r(id,1,'matching','Nối hình dạng với đồ vật phù hợp:',[{key:'A',text:'Tròn'},{key:'B',text:'Dài'},{key:'C',text:'Dẹt'}],{A:'Quả bóng',B:'Con rắn',C:'Chiếc đĩa'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các tính từ hình dạng từ ít cạnh đến nhiều cạnh: vuông, tròn, tam giác',[{key:'1',text:'Vuông (4 cạnh)'},{key:'2',text:'Tròn (0 cạnh)'},{key:'3',text:'Tam giác (3 cạnh)'}],['2','3','1'],'easy','Sắp xếp theo số cạnh',9),
      r(id,1,'true_false','Nặn đất sét giúp trẻ em phát triển đôi tay khéo léo. Đúng hay sai?',null,true,'easy','Nặn đất rèn luyện sự khéo léo của đôi tay',10),
      // Ex2 medium – steps to make clay toy
      r(id,2,'single_choice','Trong bài "Nặn đồ chơi", bạn nhỏ quyết định nặn gì?',[{key:'A',text:'Ngôi nhà bằng gỗ'},{key:'B',text:'Các đồ chơi bằng đất nặn'},{key:'C',text:'Tranh vẽ màu nước'}],'B','medium','Bạn nhỏ nặn đồ chơi bằng đất nặn',1),
      r(id,2,'sorting','Sắp xếp đúng các bước nặn một con thú bằng đất nặn:',[{key:'1',text:'Ghép các phần lại thành hình hoàn chỉnh'},{key:'2',text:'Nhào đất cho mềm dẻo'},{key:'3',text:'Trang trí thêm chi tiết'},{key:'4',text:'Nặn từng phần: thân, đầu, chân'}],['2','4','1','3'],'medium','Thứ tự các bước nặn đồ chơi đất sét',2),
      r(id,2,'single_choice','Khi nặn xong, bạn nhỏ cảm thấy thế nào?',[{key:'A',text:'Thất vọng vì nặn xấu'},{key:'B',text:'Vui và tự hào về sản phẩm'},{key:'C',text:'Không quan tâm'}],'B','medium','Bạn nhỏ vui và tự hào khi hoàn thành tác phẩm',3),
      r(id,2,'true_false','Để nặn con vật, ta cần nặn từng bộ phận rồi ghép lại. Đúng hay sai?',null,true,'medium','Nặn từng bộ phận rồi ghép lại là cách làm đúng',4),
      r(id,2,'fill_blank','Bạn nhỏ [b1] đất nặn thành hình tròn để làm đầu và hình [b2] để làm thân con gấu.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nặn',b2:'dài'},'medium','Cách nặn các bộ phận của con thú',5),
      r(id,2,'matching','Nối bộ phận với hình dạng đất nặn:',[{key:'A',text:'Đầu con gấu'},{key:'B',text:'Thân con rắn'},{key:'C',text:'Đĩa đồ chơi'}],{A:'Hình tròn',B:'Hình dài thuôn',C:'Hình dẹt tròn'},'medium',null,6),
      r(id,2,'single_choice','Điều gì khiến nặn đồ chơi đất sét thú vị?',[{key:'A',text:'Rất dễ, ai cũng làm được ngay'},{key:'B',text:'Có thể tạo ra bất cứ hình dạng nào mình muốn'},{key:'C',text:'Không tốn thời gian'}],'B','medium','Sự sáng tạo tự do là điều thú vị của nặn đất sét',7),
      r(id,2,'true_false','Khi nặn sai, ta có thể nhào lại đất và nặn lại từ đầu. Đúng hay sai?',null,true,'medium','Đất nặn có thể nhào lại để nặn lại, rất linh hoạt',8),
      r(id,2,'fill_blank','Bạn nhỏ rất [b1] khi tự tay [b2] được đồ chơi cho mình.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vui',b2:'nặn'},'medium','Cảm xúc khi tự tay làm đồ chơi',9),
      r(id,2,'single_choice','Điều gì bạn nhỏ học được từ việc nặn đồ chơi?',[{key:'A',text:'Cách tính toán'},{key:'B',text:'Sự kiên nhẫn và sáng tạo'},{key:'C',text:'Cách viết chữ đẹp'}],'B','medium','Nặn đất dạy sự kiên nhẫn và phát triển sáng tạo',10),
      // Ex3 hard – describing with adjectives, comparing shapes
      r(id,3,'single_choice','Câu nào mô tả đồ chơi đất nặn hay nhất?',[{key:'A',text:'Con gấu.'},{key:'B',text:'Con gấu nâu.'},{key:'C',text:'Con gấu nâu nhỏ nhắn với đôi mắt tròn đen láy và cái mũi dẹt xinh xắn.'}],'C','hard','Câu C sử dụng nhiều tính từ miêu tả chi tiết và sinh động',1),
      r(id,3,'matching','Nối tính từ hình dạng với đặc điểm:',[{key:'A',text:'Tròn'},{key:'B',text:'Dài'},{key:'C',text:'Nhọn'},{key:'D',text:'Dẹt'}],{A:'Như quả bóng, không có góc cạnh',B:'Như con rắn, chiều dài lớn hơn chiều rộng',C:'Như mũi kim, đầu thu nhỏ lại',D:'Mỏng, chiều cao nhỏ'},'hard',null,2),
      r(id,3,'fill_blank','Để mô tả đồ chơi, ta dùng tính từ chỉ [b1] (tròn, vuông), [b2] (đỏ, xanh) và [b3] (to, nhỏ).',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'hình dạng',b2:'màu sắc',b3:'kích thước'},'hard','Các loại tính từ dùng để mô tả đồ vật',3),
      r(id,3,'sorting','Sắp xếp mô tả từ đơn giản đến đầy đủ nhất:',[{key:'1',text:'Con gấu nâu nhỏ, tròn trĩnh, dễ thương'},{key:'2',text:'Con gấu'},{key:'3',text:'Con gấu nâu'}],['2','3','1'],'hard','Mức độ chi tiết trong mô tả',4),
      r(id,3,'single_choice','So sánh hai hình: hình tròn và hình vuông. Điểm khác nhau chính là gì?',[{key:'A',text:'Hình tròn không có cạnh, hình vuông có 4 cạnh bằng nhau'},{key:'B',text:'Hình tròn to hơn hình vuông'},{key:'C',text:'Hình vuông nhẹ hơn hình tròn'}],'A','hard','Hình tròn không có cạnh, hình vuông có 4 cạnh',5),
      r(id,3,'true_false','Khi viết câu mô tả đồ chơi, càng dùng nhiều tính từ câu càng sinh động. Đúng hay sai?',null,true,'hard','Tính từ làm câu mô tả thêm sinh động và cụ thể',6),
      r(id,3,'fill_blank','Con búp bê [b1] xinh, mặc váy [b2] hồng, tóc [b3] như mây.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'tròn trĩnh',b2:'đỏ',b3:'mềm'},'hard','Câu mô tả đầy đủ về búp bê đất nặn',7),
      r(id,3,'single_choice','Câu nào so sánh hình dạng đồ chơi đúng và sinh động?',[{key:'A',text:'Con rắn dài.'},{key:'B',text:'Con rắn dài như sợi dây.'},{key:'C',text:'Con rắn có hình dạng.'}],'B','hard','Câu B dùng so sánh "như sợi dây" tạo hình ảnh sinh động',8),
      r(id,3,'true_false','Bài "Nặn đồ chơi" khuyến khích trẻ em tự tay sáng tạo đồ chơi của mình. Đúng hay sai?',null,true,'hard','Bài khuyến khích sự sáng tạo và tự làm đồ chơi',9),
      r(id,3,'single_choice','Thông điệp chính của bài "Nặn đồ chơi" là gì?',[{key:'A',text:'Chỉ nên mua đồ chơi ở cửa hàng'},{key:'B',text:'Niềm vui và sự tự hào khi tự tay sáng tạo'},{key:'C',text:'Đất nặn rất rẻ tiền'}],'B','hard','Thông điệp: niềm vui từ sáng tạo bằng đôi tay',10),
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
