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

  // ─── 1170: Bài 25: Sự tích hoa tỉ muội ────────────────────────────────────
  {
    const id = 1170;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Hoa tỉ muội là loài hoa như thế nào?',[{key:'A',text:'Hoa to, màu đỏ rực'},{key:'B',text:'Hoa nhỏ xinh, mọc thành chùm'},{key:'C',text:'Hoa chỉ nở vào mùa đông'}],'B','easy','Hoa tỉ muội là loài hoa nhỏ xinh, thường mọc thành chùm',1),
      r(id,1,'single_choice','Từ "tỉ muội" trong tiếng Việt có nghĩa là gì?',[{key:'A',text:'Bạn bè thân thiết'},{key:'B',text:'Chị em gái'},{key:'C',text:'Anh em trai'}],'B','easy','Tỉ muội nghĩa là chị em gái',2),
      r(id,1,'single_choice','Sự tích hoa tỉ muội kể về điều gì?',[{key:'A',text:'Hai anh em đi tìm kho báu'},{key:'B',text:'Hai chị em yêu thương nhau và hóa thành hoa'},{key:'C',text:'Một cô bé trồng hoa trong vườn'}],'B','easy','Câu chuyện kể về tình chị em yêu thương hóa thành hoa',3),
      r(id,1,'true_false','Hoa tỉ muội được đặt tên theo nghĩa "chị em". Đúng hay sai?',null,true,'easy','Tỉ muội có nghĩa là chị em gái',4),
      r(id,1,'true_false','Sự tích hoa tỉ muội là câu chuyện có thật, không phải truyền thuyết. Đúng hay sai?',null,false,'easy','Đây là truyền thuyết dân gian giải thích nguồn gốc của loài hoa',5),
      r(id,1,'fill_blank','Hai chị em trong câu chuyện luôn [b1] nhau và cùng nhau làm mọi việc.',[{key:'b1',text:''}],{b1:'yêu thương'},'easy','Hai chị em yêu thương nhau là chủ đề chính',6),
      r(id,1,'fill_blank','Hoa tỉ muội thường mọc thành từng [b1] bên nhau, giống như chị em không rời xa.',[{key:'b1',text:''}],{b1:'chùm'},'easy','Hoa mọc thành chùm tượng trưng cho tình chị em gắn bó',7),
      r(id,1,'single_choice','Loài hoa trong câu chuyện mang ý nghĩa gì?',[{key:'A',text:'Sự giàu sang, phú quý'},{key:'B',text:'Tình chị em gắn bó, yêu thương'},{key:'C',text:'Sức mạnh và dũng cảm'}],'B','easy','Hoa tỉ muội tượng trưng cho tình chị em',8),
      r(id,1,'sorting','Sắp xếp các từ để tạo câu hoàn chỉnh: yêu thương / chị em / luôn / nhau',[{key:'1',text:'yêu thương'},{key:'2',text:'chị em'},{key:'3',text:'luôn'},{key:'4',text:'nhau'}],['2','3','1','4'],'easy','Câu đúng: Chị em luôn yêu thương nhau',9),
      r(id,1,'true_false','Truyền thuyết là thể loại văn học dân gian. Đúng hay sai?',null,true,'easy','Truyền thuyết thuộc thể loại văn học dân gian',10),
      // Ex2 medium
      r(id,2,'single_choice','Vì sao loài hoa được gọi là "tỉ muội"?',[{key:'A',text:'Vì hoa có màu sắc rực rỡ'},{key:'B',text:'Vì hoa mọc từ nơi hai chị em yêu thương nhau'},{key:'C',text:'Vì một người trồng hoa đặt tên'}],'B','medium','Tên hoa xuất phát từ tình chị em trong câu chuyện',1),
      r(id,2,'single_choice','Điều gì thể hiện tình yêu thương giữa hai chị em trong truyện?',[{key:'A',text:'Họ tranh giành đồ chơi'},{key:'B',text:'Họ luôn cùng nhau làm mọi việc và giúp đỡ nhau'},{key:'C',text:'Họ sống ở hai nơi khác nhau'}],'B','medium','Tình yêu thương thể hiện qua việc cùng nhau và giúp đỡ nhau',2),
      r(id,2,'single_choice','Sự kiện quan trọng nào xảy ra cuối câu chuyện?',[{key:'A',text:'Hai chị em tìm được kho báu'},{key:'B',text:'Hai chị em hóa thành loài hoa tỉ muội'},{key:'C',text:'Hai chị em rời xa nhau mãi mãi'}],'B','medium','Kết thúc câu chuyện là hai chị em hóa thành hoa',3),
      r(id,2,'true_false','Câu chuyện muốn dạy chúng ta trân trọng tình anh chị em. Đúng hay sai?',null,true,'medium','Bài học của truyện là trân trọng tình chị em',4),
      r(id,2,'true_false','Hai chị em trong truyện không quan tâm đến nhau. Đúng hay sai?',null,false,'medium','Ngược lại, hai chị em rất yêu thương và quan tâm nhau',5),
      r(id,2,'fill_blank','Câu chuyện kể về hai [b1] luôn yêu thương và gắn bó với nhau.',[{key:'b1',text:''}],{b1:'chị em'},'medium','Nhân vật chính là hai chị em',6),
      r(id,2,'matching','Nối từ với nghĩa đúng:',[{key:'A',text:'tỉ muội'},{key:'B',text:'truyền thuyết'},{key:'C',text:'yêu thương'}],{A:'chị em gái',B:'câu chuyện dân gian về nguồn gốc',C:'tình cảm gắn bó, quý mến'},'medium',null,7),
      r(id,2,'single_choice','Tại sao hoa tỉ muội thường mọc thành chùm?',[{key:'A',text:'Vì đất trồng hoa rất màu mỡ'},{key:'B',text:'Vì tượng trưng cho chị em không rời xa nhau'},{key:'C',text:'Vì đây là đặc điểm của mọi loài hoa'}],'B','medium','Hoa mọc thành chùm tượng trưng cho tình chị em gắn bó',8),
      r(id,2,'sorting','Sắp xếp các sự kiện theo thứ tự đúng trong câu chuyện:',[{key:'1',text:'Hai chị em hóa thành hoa tỉ muội'},{key:'2',text:'Hai chị em sống cùng nhau, luôn yêu thương'},{key:'3',text:'Loài hoa được gọi là hoa tỉ muội'}],['2','1','3'],'medium','Trình tự: sống yêu thương → hóa thành hoa → loài hoa có tên tỉ muội',9),
      r(id,2,'fill_blank','Truyện "Sự tích hoa tỉ muội" thuộc thể loại [b1] dân gian.',[{key:'b1',text:''}],{b1:'truyền thuyết'},'medium','Câu chuyện là truyền thuyết',10),
      // Ex3 hard
      r(id,3,'single_choice','Thể loại "truyền thuyết" có đặc điểm nào?',[{key:'A',text:'Kể về sự kiện có thật trong lịch sử'},{key:'B',text:'Giải thích nguồn gốc sự vật qua yếu tố kỳ ảo'},{key:'C',text:'Kể chuyện cổ tích về phép màu'}],'B','hard','Truyền thuyết giải thích nguồn gốc sự vật bằng yếu tố kỳ ảo',1),
      r(id,3,'single_choice','Bài học sâu sắc nhất của truyện "Sự tích hoa tỉ muội" là gì?',[{key:'A',text:'Nên trồng thật nhiều hoa trong vườn'},{key:'B',text:'Tình chị em là tình cảm quý giá cần trân trọng và giữ gìn'},{key:'C',text:'Hoa tỉ muội là loài hoa đẹp nhất'}],'B','hard','Bài học sâu sắc là trân trọng tình chị em',2),
      r(id,3,'fill_blank','Câu chuyện giải thích [b1] của loài hoa tỉ muội thông qua tình cảm [b2] đẹp đẽ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nguồn gốc',b2:'chị em'},'hard','Truyền thuyết giải thích nguồn gốc qua tình cảm chị em',3),
      r(id,3,'true_false','Yếu tố kỳ ảo (hai chị em hóa thành hoa) giúp câu chuyện trở nên sinh động và có ý nghĩa hơn. Đúng hay sai?',null,true,'hard','Yếu tố kỳ ảo làm tăng sức hấp dẫn và ý nghĩa của truyền thuyết',4),
      r(id,3,'matching','Nối đặc điểm với thể loại văn học:',[{key:'A',text:'Giải thích nguồn gốc sự vật'},{key:'B',text:'Có yếu tố kỳ ảo, phép màu'},{key:'C',text:'Dạy bài học đạo đức'}],{A:'Truyền thuyết',B:'Truyền thuyết / Cổ tích',C:'Truyện dân gian'},'hard',null,5),
      r(id,3,'single_choice','Hình ảnh "hoa mọc thành chùm" trong truyện tượng trưng cho điều gì?',[{key:'A',text:'Hoa nở nhiều vào mùa xuân'},{key:'B',text:'Sự đoàn kết, gắn bó của chị em'},{key:'C',text:'Đất đai màu mỡ'}],'B','hard','Hoa mọc thành chùm là hình ảnh tượng trưng cho sự gắn bó chị em',6),
      r(id,3,'sorting','Sắp xếp các ý để tóm tắt câu chuyện:',[{key:'1',text:'Từ đó, loài hoa được gọi là hoa tỉ muội'},{key:'2',text:'Có hai chị em rất yêu thương nhau'},{key:'3',text:'Họ không thể rời xa nhau nên hóa thành hoa'}],['2','3','1'],'hard','Tóm tắt: giới thiệu → sự kiện → kết quả',7),
      r(id,3,'fill_blank','Thông qua hình ảnh hoa tỉ muội, tác giả dân gian muốn ca ngợi [b1] giữa những người trong gia đình.',[{key:'b1',text:''}],{b1:'tình yêu thương'},'hard','Hoa tỉ muội ca ngợi tình yêu thương gia đình',8),
      r(id,3,'true_false','Truyền thuyết dân gian thường có nhân vật và sự kiện hoàn toàn hư cấu, không liên quan đến thực tế. Đúng hay sai?',null,false,'hard','Truyền thuyết thường gắn với sự vật hoặc sự kiện có thật, chỉ thêm yếu tố kỳ ảo',9),
      r(id,3,'single_choice','Từ "cùng nhau" trong câu "Hai chị em cùng nhau làm mọi việc" thể hiện điều gì?',[{key:'A',text:'Sự chia sẻ và đoàn kết'},{key:'B',text:'Sự cạnh tranh giữa chị em'},{key:'C',text:'Hai người làm hai việc khác nhau'}],'A','hard','Cùng nhau thể hiện sự chia sẻ và đoàn kết',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1171: Bài 26: Em mang về yêu thương ──────────────────────────────────
  {
    const id = 1171;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài "Em mang về yêu thương", em bé mang về điều gì?',[{key:'A',text:'Quà và đồ chơi'},{key:'B',text:'Tình yêu thương và niềm vui'},{key:'C',text:'Sách vở và bút màu'}],'B','easy','Em mang về yêu thương cho gia đình',1),
      r(id,1,'single_choice','Từ "yêu thương" thuộc loại từ gì?',[{key:'A',text:'Từ chỉ hành động'},{key:'B',text:'Từ chỉ tình cảm'},{key:'C',text:'Từ chỉ đồ vật'}],'B','easy','Yêu thương là từ chỉ tình cảm',2),
      r(id,1,'single_choice','Hành động nào thể hiện em bé giúp đỡ gia đình?',[{key:'A',text:'Em ngồi chơi một mình'},{key:'B',text:'Em quét nhà, dọn dẹp và chăm sóc người thân'},{key:'C',text:'Em đòi mua đồ chơi'}],'B','easy','Giúp đỡ gia đình là cách thể hiện yêu thương',3),
      r(id,1,'true_false','Yêu thương gia đình thể hiện qua những hành động nhỏ hàng ngày. Đúng hay sai?',null,true,'easy','Yêu thương thể hiện qua hành động cụ thể mỗi ngày',4),
      r(id,1,'true_false','Từ "giúp đỡ" có nghĩa là làm hại người khác. Đúng hay sai?',null,false,'easy','Giúp đỡ có nghĩa là hỗ trợ, làm cho người khác dễ dàng hơn',5),
      r(id,1,'fill_blank','Em bé [b1] về yêu thương khi em chăm chỉ giúp đỡ bố mẹ.',[{key:'b1',text:''}],{b1:'mang'},'easy','Từ khóa trong nhan đề bài là "mang"',6),
      r(id,1,'fill_blank','Những người trong gia đình luôn [b1] và quan tâm lẫn nhau.',[{key:'b1',text:''}],{b1:'yêu thương'},'easy','Gia đình là nơi có tình yêu thương',7),
      r(id,1,'single_choice','Từ "chia sẻ" có nghĩa là gì?',[{key:'A',text:'Lấy của người khác'},{key:'B',text:'Cùng nhau có và cảm nhận một điều gì đó'},{key:'C',text:'Giữ riêng cho mình'}],'B','easy','Chia sẻ là cùng nhau có và cảm nhận',8),
      r(id,1,'sorting','Sắp xếp các từ để tạo thành câu: về / yêu thương / em / mang',[{key:'1',text:'về'},{key:'2',text:'yêu thương'},{key:'3',text:'em'},{key:'4',text:'mang'}],['3','4','1','2'],'easy','Câu đúng: Em mang về yêu thương',9),
      r(id,1,'true_false','Quan tâm đến người thân là cách thể hiện tình yêu thương. Đúng hay sai?',null,true,'easy','Quan tâm là biểu hiện của tình yêu thương',10),
      // Ex2 medium
      r(id,2,'single_choice','Em bé trong bài đã làm gì để mang về yêu thương cho gia đình?',[{key:'A',text:'Em mang quà về nhà'},{key:'B',text:'Em giúp đỡ, chăm sóc và chia sẻ với mọi người'},{key:'C',text:'Em học bài rất giỏi'}],'B','medium','Yêu thương thể hiện qua việc giúp đỡ và chăm sóc',1),
      r(id,2,'single_choice','Điều gì khiến gia đình trở nên hạnh phúc theo bài học?',[{key:'A',text:'Có nhiều tiền và đồ vật'},{key:'B',text:'Mọi người yêu thương, quan tâm và giúp đỡ nhau'},{key:'C',text:'Ngôi nhà rộng lớn'}],'B','medium','Hạnh phúc đến từ tình yêu thương và sự quan tâm',2),
      r(id,2,'fill_blank','Khi em [b1] bố mẹ làm việc nhà, em đã mang [b2] về cho gia đình.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'giúp đỡ',b2:'yêu thương'},'medium','Giúp đỡ là cách mang yêu thương',3),
      r(id,2,'true_false','Từ "tình cảm" là danh từ chỉ cảm xúc, không nhìn thấy được bằng mắt. Đúng hay sai?',null,true,'medium','Tình cảm là từ trừu tượng, không thể thấy bằng mắt thường',4),
      r(id,2,'matching','Nối hành động với ý nghĩa:',[{key:'A',text:'quét nhà, dọn dẹp'},{key:'B',text:'hỏi thăm khi mệt'},{key:'C',text:'chia sẻ đồ ăn'}],{A:'giúp đỡ gia đình',B:'quan tâm đến người thân',C:'yêu thương và sẻ chia'},'medium',null,5),
      r(id,2,'single_choice','Từ "chăm" trong câu "Em chăm sóc bà" có nghĩa là gì?',[{key:'A',text:'Học chăm chỉ'},{key:'B',text:'Trông nom, lo lắng cho người khác'},{key:'C',text:'Làm việc nhanh'}],'B','medium','Chăm sóc nghĩa là trông nom, lo lắng',6),
      r(id,2,'true_false','Bài học muốn nói rằng chỉ người lớn mới có thể mang yêu thương. Đúng hay sai?',null,false,'medium','Trẻ em cũng có thể mang yêu thương đến gia đình',7),
      r(id,2,'sorting','Sắp xếp các hành động từ nhỏ đến có ý nghĩa lớn hơn:',[{key:'1',text:'Mỉm cười với mọi người'},{key:'2',text:'Giúp mẹ nấu cơm'},{key:'3',text:'Chăm sóc ông bà khi ốm'}],['1','2','3'],'medium','Hành động nhỏ → vừa → lớn hơn',8),
      r(id,2,'fill_blank','Từ [b1] trong bài là danh từ trừu tượng, chỉ cảm xúc không nhìn thấy được.',[{key:'b1',text:''}],{b1:'yêu thương'},'medium','Yêu thương là danh từ trừu tượng',9),
      r(id,2,'single_choice','Ý nghĩa chính của bài "Em mang về yêu thương" là gì?',[{key:'A',text:'Hướng dẫn cách làm việc nhà'},{key:'B',text:'Tình yêu thương trong gia đình thể hiện qua hành động cụ thể'},{key:'C',text:'Kể chuyện về trường học'}],'B','medium','Ý nghĩa chính là tình yêu thương qua hành động',10),
      // Ex3 hard
      r(id,3,'single_choice','Nhan đề "Em mang về yêu thương" gợi lên điều gì?',[{key:'A',text:'Em đi mua đồ về nhà'},{key:'B',text:'Tình yêu thương là thứ quý giá ta có thể trao cho gia đình'},{key:'C',text:'Em mang ba lô về nhà'}],'B','hard','Nhan đề ẩn dụ: yêu thương là thứ quý giá mang về',1),
      r(id,3,'fill_blank','Từ "yêu thương" và "tình cảm" đều là [b1] từ, chỉ [b2] không nhìn thấy được.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'danh',b2:'cảm xúc'},'hard','Cả hai là danh từ chỉ cảm xúc trừu tượng',2),
      r(id,3,'true_false','Tác giả dùng từ "mang" thay vì "tạo ra" hay "cho đi" để nhấn mạnh hành động chủ động của em bé. Đúng hay sai?',null,true,'hard','Từ "mang" nhấn mạnh hành động chủ động và có chủ ý',3),
      r(id,3,'matching','Nối từ với loại từ:',[{key:'A',text:'yêu thương'},{key:'B',text:'giúp đỡ'},{key:'C',text:'quan tâm'}],{A:'Danh từ / động từ chỉ tình cảm',B:'Động từ chỉ hành động',C:'Động từ / danh từ chỉ thái độ'},'hard',null,4),
      r(id,3,'single_choice','Em bé "mang về yêu thương" là cách nói ẩn dụ vì:',[{key:'A',text:'Yêu thương là đồ vật có thể cầm được'},{key:'B',text:'Yêu thương được so sánh như một món quà em mang về'},{key:'C',text:'Em thực sự mua yêu thương ở cửa hàng'}],'B','hard','Đây là cách nói ẩn dụ: yêu thương như món quà',5),
      r(id,3,'fill_blank','Bài học về [b1] trong gia đình cho thấy rằng hành động nhỏ cũng có thể tạo ra [b2] lớn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu thương',b2:'hạnh phúc'},'hard','Yêu thương tạo ra hạnh phúc',6),
      r(id,3,'sorting','Sắp xếp các ý luận để phân tích bài:',[{key:'1',text:'Kết luận: Yêu thương là điều quý giá nhất'},{key:'2',text:'Dẫn chứng: Em giúp đỡ, chăm sóc mọi người'},{key:'3',text:'Ý chính: Em bé mang yêu thương về cho gia đình'}],['3','2','1'],'hard','Phân tích: ý chính → dẫn chứng → kết luận',7),
      r(id,3,'true_false','Trong bài, hành động giúp đỡ của em bé là cách em thể hiện tình yêu thương mà không cần nói ra lời. Đúng hay sai?',null,true,'hard','Hành động cụ thể là cách diễn đạt tình cảm không cần lời',8),
      r(id,3,'single_choice','Từ "chia sẻ" trong bài có thể thay thế bằng từ nào có nghĩa gần giống?',[{key:'A',text:'Giấu giếm'},{key:'B',text:'Cùng hưởng, san sẻ'},{key:'C',text:'Tranh giành'}],'B','hard','Chia sẻ đồng nghĩa với san sẻ, cùng hưởng',9),
      r(id,3,'fill_blank','Điều mà em bé trong bài "mang về" không phải là đồ vật mà là [b1] — thứ không nhìn thấy nhưng rất quan trọng.',[{key:'b1',text:''}],{b1:'yêu thương'},'hard','Yêu thương là điều trừu tượng nhưng quý giá',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1172: Bài 27: Mẹ ────────────────────────────────────────────────────
  {
    const id = 1172;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài thơ "Mẹ", người mẹ được miêu tả như thế nào?',[{key:'A',text:'Nghiêm khắc và khó tính'},{key:'B',text:'Dịu dàng, hiền hậu và yêu thương con'},{key:'C',text:'Hay đi làm xa nhà'}],'B','easy','Mẹ được miêu tả là dịu dàng, hiền hậu',1),
      r(id,1,'single_choice','Từ "dịu dàng" nói về tính cách gì của mẹ?',[{key:'A',text:'Mạnh mẽ, quyết đoán'},{key:'B',text:'Nhẹ nhàng, ân cần, ấm áp'},{key:'C',text:'Nghiêm khắc, cứng rắn'}],'B','easy','Dịu dàng nghĩa là nhẹ nhàng, ân cần',2),
      r(id,1,'single_choice','Bài thơ "Mẹ" nói về tình cảm của ai?',[{key:'A',text:'Tình bạn giữa hai học sinh'},{key:'B',text:'Tình mẫu tử giữa mẹ và con'},{key:'C',text:'Tình thầy trò'}],'B','easy','Bài thơ nói về tình mẫu tử',3),
      r(id,1,'true_false','Mẹ là người chăm sóc và yêu thương con mọi lúc. Đúng hay sai?',null,true,'easy','Mẹ luôn chăm sóc và yêu thương con',4),
      r(id,1,'true_false','Từ "hi sinh" có nghĩa là mẹ không quan tâm đến con. Đúng hay sai?',null,false,'easy','Hi sinh nghĩa là chịu đựng, nhường nhịn vì người khác',5),
      r(id,1,'fill_blank','Mẹ luôn [b1] sóc con khi con bị ốm hay buồn.',[{key:'b1',text:''}],{b1:'chăm'},'easy','Mẹ chăm sóc con là hành động yêu thương',6),
      r(id,1,'fill_blank','Trong bài thơ, mẹ được ví như [b1] hiền lành, ấm áp.',[{key:'b1',text:''}],{b1:'ánh nắng'},'easy','Mẹ được so sánh với ánh nắng trong bài thơ',7),
      r(id,1,'single_choice','Từ "vất vả" trong câu "Mẹ vất vả vì con" có nghĩa là gì?',[{key:'A',text:'Mẹ rất nhàn rỗi, thoải mái'},{key:'B',text:'Mẹ phải làm việc nhiều, chịu khó'},{key:'C',text:'Mẹ đi chơi thường xuyên'}],'B','easy','Vất vả nghĩa là phải làm việc nhiều, chịu khó',8),
      r(id,1,'sorting','Sắp xếp các từ để tạo câu: mẹ / hiền / dịu dàng / và',[{key:'1',text:'mẹ'},{key:'2',text:'hiền'},{key:'3',text:'dịu dàng'},{key:'4',text:'và'}],['1','3','4','2'],'easy','Câu đúng: Mẹ dịu dàng và hiền',9),
      r(id,1,'true_false','Bài thơ "Mẹ" thể hiện lòng biết ơn và tình yêu của con với mẹ. Đúng hay sai?',null,true,'easy','Bài thơ thể hiện lòng biết ơn và tình yêu con dành cho mẹ',10),
      // Ex2 medium
      r(id,2,'single_choice','Bài thơ về mẹ thể hiện cảm xúc gì của người con?',[{key:'A',text:'Buồn bã vì mẹ đi xa'},{key:'B',text:'Biết ơn, yêu thương và trân trọng mẹ'},{key:'C',text:'Tức giận vì mẹ nghiêm khắc'}],'B','medium','Cảm xúc chính là biết ơn và yêu thương',1),
      r(id,2,'single_choice','Trong bài thơ, hình ảnh nào được dùng để so sánh với mẹ?',[{key:'A',text:'Ngọn nến cháy sáng'},{key:'B',text:'Ánh nắng ấm áp và dịu hiền'},{key:'C',text:'Cơn gió mạnh'}],'B','medium','Mẹ được so sánh với ánh nắng',2),
      r(id,2,'fill_blank','Biện pháp so sánh "mẹ như [b1]" giúp người đọc hình dung được sự [b2] và ấm áp của mẹ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ánh nắng',b2:'dịu dàng'},'medium','So sánh mẹ với ánh nắng thể hiện sự dịu dàng, ấm áp',3),
      r(id,2,'true_false','Bài thơ về mẹ thường có nhịp điệu nhẹ nhàng, tha thiết. Đúng hay sai?',null,true,'medium','Bài thơ về mẹ thường nhẹ nhàng và tha thiết',4),
      r(id,2,'matching','Nối từ với nghĩa phù hợp:',[{key:'A',text:'dịu dàng'},{key:'B',text:'hi sinh'},{key:'C',text:'vất vả'}],{A:'nhẹ nhàng, ân cần',B:'chịu đựng, nhường nhịn vì người khác',C:'cực nhọc, phải làm nhiều'},'medium',null,5),
      r(id,2,'single_choice','Vì sao người con trong bài thơ yêu mẹ?',[{key:'A',text:'Vì mẹ mua nhiều đồ chơi'},{key:'B',text:'Vì mẹ hi sinh, vất vả, yêu thương và chăm sóc con'},{key:'C',text:'Vì mẹ cho con đi chơi nhiều'}],'B','medium','Người con yêu mẹ vì những hi sinh và tình thương của mẹ',6),
      r(id,2,'true_false','Từ "hiền" và "dịu dàng" trong bài thơ đều miêu tả tính cách của mẹ. Đúng hay sai?',null,true,'medium','Cả hai từ đều miêu tả tính cách hiền lành của mẹ',7),
      r(id,2,'sorting','Sắp xếp các ý để tóm tắt nội dung bài thơ:',[{key:'1',text:'Con yêu thương và biết ơn mẹ'},{key:'2',text:'Mẹ dịu dàng, hiền hậu, chăm sóc con'},{key:'3',text:'Mẹ hi sinh, vất vả vì con'}],['2','3','1'],'medium','Thứ tự: đặc điểm → hi sinh → tình cảm con',8),
      r(id,2,'fill_blank','Trong bài thơ, từ [b1] được lặp lại nhiều lần để nhấn mạnh tình cảm với mẹ.',[{key:'b1',text:''}],{b1:'mẹ'},'medium','Từ "mẹ" được lặp lại tạo điệp từ',9),
      r(id,2,'single_choice','Bài thơ "Mẹ" thuộc thể loại văn học nào?',[{key:'A',text:'Truyện kể'},{key:'B',text:'Thơ'},{key:'C',text:'Văn xuôi'}],'B','medium','Bài "Mẹ" là bài thơ',10),
      // Ex3 hard
      r(id,3,'single_choice','Biện pháp tu từ "so sánh" trong thơ có tác dụng gì?',[{key:'A',text:'Làm cho bài thơ khó hiểu hơn'},{key:'B',text:'Giúp hình dung rõ hơn về đối tượng được miêu tả'},{key:'C',text:'Làm cho bài thơ ngắn gọn hơn'}],'B','hard','So sánh giúp người đọc hình dung rõ hơn',1),
      r(id,3,'single_choice','Điệp từ là gì?',[{key:'A',text:'Từ có hai nghĩa'},{key:'B',text:'Từ được lặp đi lặp lại nhiều lần để nhấn mạnh'},{key:'C',text:'Từ không có trong từ điển'}],'B','hard','Điệp từ là từ được lặp lại để nhấn mạnh',2),
      r(id,3,'fill_blank','Trong bài thơ "Mẹ", tác giả dùng biện pháp [b1] (lặp từ "mẹ") và [b2] (mẹ như ánh nắng) để tăng cảm xúc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'điệp từ',b2:'so sánh'},'hard','Hai biện pháp tu từ: điệp từ và so sánh',3),
      r(id,3,'true_false','Nhịp thơ đều đặn và vần điệu trong bài thơ giúp tạo cảm giác nhẹ nhàng, êm ái. Đúng hay sai?',null,true,'hard','Nhịp điệu và vần tạo sự nhẹ nhàng cho bài thơ',4),
      r(id,3,'matching','Nối biện pháp tu từ với ví dụ:',[{key:'A',text:'So sánh'},{key:'B',text:'Điệp từ'},{key:'C',text:'Nhân hóa'}],{A:'Mẹ như ánh nắng ấm áp',B:'Mẹ ơi, mẹ ơi, mẹ...',C:'Bông hoa cúi đầu chào mẹ'},'hard',null,5),
      r(id,3,'single_choice','Tại sao tác giả so sánh mẹ với "ánh nắng"?',[{key:'A',text:'Vì mẹ rất nóng tính'},{key:'B',text:'Vì mẹ ấm áp, soi sáng và nuôi dưỡng như ánh nắng'},{key:'C',text:'Vì mẹ thích ra nắng phơi đồ'}],'B','hard','Ánh nắng tượng trưng cho sự ấm áp và nuôi dưỡng',6),
      r(id,3,'sorting','Sắp xếp các bước phân tích bài thơ:',[{key:'1',text:'Nhận xét: Bài thơ thể hiện tình mẫu tử sâu sắc'},{key:'2',text:'Phân tích biện pháp tu từ: so sánh, điệp từ'},{key:'3',text:'Tóm tắt nội dung: Mẹ dịu dàng, hi sinh vì con'}],['3','2','1'],'hard','Phân tích: nội dung → tu từ → nhận xét',7),
      r(id,3,'fill_blank','Bài thơ dùng nhịp [b1] đều đặn tạo cảm giác êm ái, phù hợp với chủ đề về [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'2/2',b2:'mẹ'},'hard','Nhịp 2/2 hoặc nhịp đều tạo sự nhẹ nhàng',8),
      r(id,3,'true_false','Cảm xúc của tác giả trong bài thơ là nỗi nhớ và lòng biết ơn dành cho mẹ. Đúng hay sai?',null,true,'hard','Bài thơ thể hiện nỗi nhớ và lòng biết ơn',9),
      r(id,3,'single_choice','Từ "hi sinh" trong bài thể hiện điều gì về mẹ?',[{key:'A',text:'Mẹ không thích cuộc sống hiện tại'},{key:'B',text:'Mẹ chịu đựng khó khăn, hy vọng vì con'},{key:'C',text:'Mẹ muốn đi xa'}],'B','hard','Hi sinh thể hiện mẹ chịu đựng vì con',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1173: Bài 28: Trò chơi của bố ───────────────────────────────────────
  {
    const id = 1173;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài "Trò chơi của bố", bố thường chơi gì với con?',[{key:'A',text:'Đọc sách một mình'},{key:'B',text:'Đá bóng, câu cá, kể chuyện và cõng con'},{key:'C',text:'Xem tivi một mình'}],'B','easy','Bố chơi nhiều trò chơi cùng con',1),
      r(id,1,'single_choice','Từ "cõng" có nghĩa là gì?',[{key:'A',text:'Đẩy người khác ra xa'},{key:'B',text:'Mang người khác trên lưng'},{key:'C',text:'Nắm tay nhau đi bộ'}],'B','easy','Cõng nghĩa là mang trên lưng',2),
      r(id,1,'single_choice','Hành động "dắt tay" thể hiện điều gì?',[{key:'A',text:'Bố đang kéo con đi nhanh'},{key:'B',text:'Sự yêu thương, che chở của bố với con'},{key:'C',text:'Bố đang tức giận'}],'B','easy','Dắt tay thể hiện sự yêu thương và che chở',3),
      r(id,1,'true_false','Đá bóng là một trò chơi bố chơi cùng con trong bài. Đúng hay sai?',null,true,'easy','Đá bóng là một trong các trò chơi của bố',4),
      r(id,1,'true_false','Trong bài, bố không quan tâm đến con. Đúng hay sai?',null,false,'easy','Bố rất quan tâm, hay chơi cùng con',5),
      r(id,1,'fill_blank','Bố và con thường cùng nhau [b1] cá ở ao làng vào cuối tuần.',[{key:'b1',text:''}],{b1:'câu'},'easy','Câu cá là một trò chơi bố chơi cùng con',6),
      r(id,1,'fill_blank','Buổi tối, bố thường [b1] chuyện cho con nghe trước khi ngủ.',[{key:'b1',text:''}],{b1:'kể'},'easy','Kể chuyện là hoạt động bố và con cùng làm',7),
      r(id,1,'single_choice','Trò chơi bố chơi cùng con thể hiện điều gì?',[{key:'A',text:'Bố không có việc gì làm'},{key:'B',text:'Tình yêu thương và sự gắn kết giữa bố và con'},{key:'C',text:'Bố thích chơi hơn làm việc'}],'B','easy','Trò chơi thể hiện tình yêu thương của bố',8),
      r(id,1,'sorting','Sắp xếp các trò chơi từ yên tĩnh đến sôi động:',[{key:'1',text:'kể chuyện'},{key:'2',text:'chơi cờ'},{key:'3',text:'đá bóng'}],['1','2','3'],'easy','Kể chuyện yên tĩnh → chơi cờ → đá bóng sôi động',9),
      r(id,1,'true_false','Câu cá đòi hỏi sự kiên nhẫn. Đúng hay sai?',null,true,'easy','Câu cá cần kiên nhẫn chờ đợi',10),
      // Ex2 medium
      r(id,2,'single_choice','Bố chơi những trò chơi gì vào những thời điểm khác nhau?',[{key:'A',text:'Chỉ chơi đá bóng vào buổi sáng'},{key:'B',text:'Đá bóng ngoài sân, câu cá ở ao, kể chuyện buổi tối, cõng đi dạo'},{key:'C',text:'Chỉ ngồi nhà xem tivi'}],'B','medium','Bố chơi nhiều trò chơi ở nhiều nơi, nhiều thời điểm',1),
      r(id,2,'single_choice','Khi bố cõng con trên lưng và dắt tay con, bố muốn truyền đạt điều gì?',[{key:'A',text:'Bố muốn con tập thể dục'},{key:'B',text:'Bố muốn bảo vệ và gần gũi con'},{key:'C',text:'Bố đang đưa con đi học'}],'B','medium','Cõng và dắt tay là cách bố bảo vệ và gần gũi con',2),
      r(id,2,'fill_blank','Bố chơi [b1] với con ở ngoài sân, và [b2] ở ao làng vào cuối tuần.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đá bóng',b2:'câu cá'},'medium','Đá bóng ở sân, câu cá ở ao',3),
      r(id,2,'true_false','Các trò chơi của bố và con trong bài đều diễn ra ở một nơi duy nhất. Đúng hay sai?',null,false,'medium','Các trò chơi diễn ra ở nhiều nơi khác nhau',4),
      r(id,2,'matching','Nối trò chơi với địa điểm:',[{key:'A',text:'đá bóng'},{key:'B',text:'câu cá'},{key:'C',text:'kể chuyện'}],{A:'ngoài sân',B:'ao làng / bờ sông',C:'trong nhà, trước khi ngủ'},'medium',null,5),
      r(id,2,'single_choice','Trò chơi nào đòi hỏi sự tập trung và yên tĩnh nhất?',[{key:'A',text:'Đá bóng'},{key:'B',text:'Chơi cờ'},{key:'C',text:'Cõng con chạy'}],'B','medium','Chơi cờ đòi hỏi sự tập trung và yên tĩnh',6),
      r(id,2,'true_false','Bài văn cho thấy bố là người bạn đồng hành yêu thương của con. Đúng hay sai?',null,true,'medium','Bố như người bạn đồng hành qua các trò chơi',7),
      r(id,2,'sorting','Sắp xếp các hành động thể hiện tình bố con:',[{key:'1',text:'Kể chuyện cho con ngủ'},{key:'2',text:'Cõng con trên lưng'},{key:'3',text:'Dắt tay con đi dạo'},{key:'4',text:'Chơi đá bóng cùng con'}],['2','3','4','1'],'medium','Từ gần gũi thể chất đến hoạt động vui chơi đến trò chuyện',8),
      r(id,2,'fill_blank','Ngôn ngữ cảm xúc trong bài được thể hiện qua các từ như [b1] và [b2] khi bố chơi cùng con.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vui vẻ',b2:'hạnh phúc'},'medium','Ngôn ngữ cảm xúc thể hiện niềm vui khi chơi cùng bố',9),
      r(id,2,'single_choice','Tại sao bài học có nhan đề là "Trò chơi của bố"?',[{key:'A',text:'Vì bài kể về đồ chơi bố tặng con'},{key:'B',text:'Vì bài nói về tình bố con qua các trò chơi chung'},{key:'C',text:'Vì bố muốn dạy con chơi thể thao'}],'B','medium','Trò chơi là sợi dây kết nối tình bố con',10),
      // Ex3 hard
      r(id,3,'single_choice','So sánh trò chơi của bố ngày xưa với trò chơi của trẻ em ngày nay, điểm khác biệt lớn nhất là gì?',[{key:'A',text:'Ngày xưa có nhiều trò chơi điện tử hơn'},{key:'B',text:'Ngày xưa trò chơi gắn với thiên nhiên, ngày nay có thêm công nghệ'},{key:'C',text:'Trẻ em ngày nay không thích chơi ngoài trời'}],'B','hard','Trò chơi xưa gắn thiên nhiên; nay thêm công nghệ',1),
      r(id,3,'single_choice','Tình cảm nào được thể hiện qua ngôn ngữ cảm xúc trong bài?',[{key:'A',text:'Sự tức giận và chán nản'},{key:'B',text:'Niềm vui, hạnh phúc và tình yêu bố con'},{key:'C',text:'Nỗi buồn và cô đơn'}],'B','hard','Ngôn ngữ cảm xúc thể hiện niềm vui và tình yêu',2),
      r(id,3,'fill_blank','Các trò chơi trong bài không chỉ mang lại niềm vui mà còn tạo ra [b1] bền chặt giữa bố và con.',[{key:'b1',text:''}],{b1:'tình cảm'},'hard','Trò chơi tạo sự kết nối tình cảm',3),
      r(id,3,'true_false','Hành động "cõng con" và "dắt tay" trong bài là biểu hiện của sự bảo vệ và yêu thương của bố. Đúng hay sai?',null,true,'hard','Đây là biểu hiện thể chất của tình yêu thương',4),
      r(id,3,'matching','Nối trò chơi với giá trị nó mang lại:',[{key:'A',text:'kể chuyện trước khi ngủ'},{key:'B',text:'câu cá cùng nhau'},{key:'C',text:'đá bóng ngoài sân'}],{A:'Kích thích trí tưởng tượng, gắn kết tình cảm',B:'Rèn luyện sự kiên nhẫn và tận hưởng thiên nhiên',C:'Rèn luyện sức khỏe và tinh thần đồng đội'},'hard',null,5),
      r(id,3,'single_choice','Tại sao trò chơi có vai trò quan trọng trong bài học về tình bố con?',[{key:'A',text:'Vì trò chơi rất tốn tiền'},{key:'B',text:'Vì trò chơi là cầu nối để bố và con gần gũi, hiểu nhau hơn'},{key:'C',text:'Vì bố không có việc gì khác làm'}],'B','hard','Trò chơi là cầu nối tình cảm bố con',6),
      r(id,3,'sorting','Sắp xếp theo mức độ gắn kết tình bố con:',[{key:'1',text:'Chơi đá bóng (vui vẻ, sôi động)'},{key:'2',text:'Kể chuyện trước khi ngủ (gần gũi, thân mật nhất)'},{key:'3',text:'Cõng con đi dạo (ấm áp, che chở)'}],['1','3','2'],'hard','Sôi động → che chở → thân mật nhất',7),
      r(id,3,'fill_blank','Qua bài "Trò chơi của bố", ta thấy bố không chỉ là người [b1] mà còn là người [b2] thân thiết của con.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nuôi dưỡng',b2:'bạn'},'hard','Bố vừa nuôi dưỡng vừa là bạn của con',8),
      r(id,3,'true_false','Ngôn ngữ cảm xúc trong bài giúp người đọc cảm nhận được tình cảm bố con sâu sắc hơn. Đúng hay sai?',null,true,'hard','Ngôn ngữ cảm xúc làm tăng sức biểu cảm',9),
      r(id,3,'single_choice','So sánh "chơi cờ" và "đá bóng" về mặt tính chất:',[{key:'A',text:'Cả hai đều cần sự vận động mạnh'},{key:'B',text:'Chơi cờ cần tư duy, đá bóng cần vận động thể chất'},{key:'C',text:'Cả hai đều yên tĩnh như nhau'}],'B','hard','Chơi cờ = tư duy; đá bóng = vận động thể chất',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1174: Bài 29: Cánh cửa nhớ bà ──────────────────────────────────────
  {
    const id = 1174;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài "Cánh cửa nhớ bà", điều gì khiến cháu nhớ bà?',[{key:'A',text:'Mùi thức ăn thơm ngon'},{key:'B',text:'Cánh cửa nhà gợi lại hình ảnh và kỷ niệm về bà'},{key:'C',text:'Tiếng nhạc quen thuộc'}],'B','easy','Cánh cửa gợi nhớ hình ảnh bà',1),
      r(id,1,'single_choice','Từ "nhớ" trong bài nói lên cảm xúc gì?',[{key:'A',text:'Vui vẻ, hạnh phúc'},{key:'B',text:'Nỗi nhớ nhung, thương tiếc người thân'},{key:'C',text:'Tức giận, khó chịu'}],'B','easy','Nhớ thể hiện nỗi nhớ nhung người thân',2),
      r(id,1,'single_choice','Từ "bậc thềm" là gì trong ngôi nhà?',[{key:'A',text:'Mái nhà phía trên'},{key:'B',text:'Bậc bước chân ở cửa ra vào'},{key:'C',text:'Cửa sổ nhìn ra ngoài'}],'B','easy','Bậc thềm là bậc bước chân ở cửa',3),
      r(id,1,'true_false','Cánh cửa trong bài là nơi gợi lại kỷ niệm về bà. Đúng hay sai?',null,true,'easy','Cánh cửa gợi nhớ kỷ niệm về bà',4),
      r(id,1,'true_false','Từ "thương" và "nhớ" có nghĩa hoàn toàn giống nhau. Đúng hay sai?',null,false,'easy','Thương là tình cảm yêu mến; nhớ là nỗi nhớ nhung',5),
      r(id,1,'fill_blank','Mỗi khi nhìn thấy [b1] nhà, cháu lại nhớ đến bà.',[{key:'b1',text:''}],{b1:'cánh cửa'},'easy','Cánh cửa là hình ảnh gợi nhớ bà',6),
      r(id,1,'fill_blank','Bà thường ngồi ở [b1] chờ cháu đi học về.',[{key:'b1',text:''}],{b1:'bậc thềm'},'easy','Bà ngồi ở bậc thềm chờ cháu',7),
      r(id,1,'single_choice','Từ "kỷ niệm" có nghĩa là gì?',[{key:'A',text:'Đồ vật mua ở cửa hàng'},{key:'B',text:'Những ký ức, hình ảnh đẹp còn lưu lại trong lòng'},{key:'C',text:'Bài học ở trường'}],'B','easy','Kỷ niệm là những ký ức đẹp còn lưu lại',8),
      r(id,1,'sorting','Sắp xếp các từ để tạo câu: nhớ / bà / cháu / thương / và',[{key:'1',text:'nhớ'},{key:'2',text:'bà'},{key:'3',text:'cháu'},{key:'4',text:'thương'},{key:'5',text:'và'}],['3','4','5','1','2'],'easy','Câu đúng: Cháu thương và nhớ bà',9),
      r(id,1,'true_false','Mái hiên và bếp lửa là những hình ảnh gắn liền với bà trong bài. Đúng hay sai?',null,true,'easy','Mái hiên và bếp là không gian gắn với bà',10),
      // Ex2 medium
      r(id,2,'single_choice','Tại sao cánh cửa lại khiến cháu nhớ bà?',[{key:'A',text:'Vì cửa có màu sắc đẹp'},{key:'B',text:'Vì bà thường đứng ở cửa chờ cháu và gắn với nhiều kỷ niệm'},{key:'C',text:'Vì cửa rất to và chắc chắn'}],'B','medium','Bà thường đứng ở cửa chờ cháu nên cửa gợi nhớ bà',1),
      r(id,2,'single_choice','Những kỷ niệm cụ thể nào của cháu với bà được nhắc đến?',[{key:'A',text:'Bà dạy cháu học toán'},{key:'B',text:'Bà ngồi ở bậc thềm, nấu bếp, chờ cháu về'},{key:'C',text:'Bà và cháu cùng đi mua sắm'}],'B','medium','Các kỷ niệm cụ thể: bậc thềm, bếp lửa, chờ cháu',2),
      r(id,2,'fill_blank','Hình ảnh bà [b1] ở bậc thềm chờ cháu đi học về là kỷ niệm [b2] nhất.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngồi',b2:'đẹp'},'medium','Bà ngồi chờ cháu là kỷ niệm đẹp',3),
      r(id,2,'true_false','Cảm xúc nhớ bà trong bài là nỗi nhớ thương đầy trân trọng. Đúng hay sai?',null,true,'medium','Nỗi nhớ bà đầy tình thương và trân trọng',4),
      r(id,2,'matching','Nối hình ảnh trong nhà với kỷ niệm về bà:',[{key:'A',text:'cánh cửa'},{key:'B',text:'bậc thềm'},{key:'C',text:'bếp lửa'}],{A:'Nơi bà chờ cháu về',B:'Nơi bà thường ngồi đợi',C:'Nơi bà nấu những bữa cơm ngon'},'medium',null,5),
      r(id,2,'single_choice','Từ "hình ảnh" trong câu "Hình ảnh bà in đậm trong lòng cháu" có nghĩa là?',[{key:'A',text:'Bức ảnh chụp bà'},{key:'B',text:'Ký ức về bà còn sống mãi trong tâm trí'},{key:'C',text:'Tranh vẽ bà'}],'B','medium','Hình ảnh ở đây là ký ức trong tâm trí',6),
      r(id,2,'true_false','Bài đọc cho thấy tình cảm cháu dành cho bà rất sâu sắc và bền lâu. Đúng hay sai?',null,true,'medium','Tình cảm cháu với bà sâu sắc và bền lâu',7),
      r(id,2,'sorting','Sắp xếp các hình ảnh theo thứ tự gợi nhớ bà từ ngoài vào trong:',[{key:'1',text:'Cánh cửa'},{key:'2',text:'Mái hiên'},{key:'3',text:'Bậc thềm'},{key:'4',text:'Bếp lửa'}],['1','2','3','4'],'medium','Từ ngoài vào trong: cửa → mái hiên → thềm → bếp',8),
      r(id,2,'fill_blank','Mỗi góc nhỏ trong [b1] đều gắn với [b2] về bà trong lòng cháu.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngôi nhà',b2:'kỷ niệm'},'medium','Ngôi nhà gắn với kỷ niệm về bà',9),
      r(id,2,'single_choice','Vì sao cháu nhớ bà khi nhìn thấy những đồ vật quen thuộc trong nhà?',[{key:'A',text:'Vì những đồ vật đó rất đắt tiền'},{key:'B',text:'Vì những nơi đó gắn với hình ảnh và kỷ niệm về bà'},{key:'C',text:'Vì đồ vật trong nhà có màu sắc đẹp'}],'B','medium','Đồ vật gắn với kỷ niệm nên gợi nhớ bà',10),
      // Ex3 hard
      r(id,3,'single_choice','Hình ảnh "cánh cửa" trong bài được dùng như thế nào?',[{key:'A',text:'Miêu tả chi tiết về ngôi nhà'},{key:'B',text:'Là biểu tượng cho ký ức và tình cảm với bà'},{key:'C',text:'Cho biết cửa nhà cần sửa chữa'}],'B','hard','Cánh cửa là biểu tượng cho ký ức',1),
      r(id,3,'single_choice','Ngôn ngữ tượng trưng trong bài là gì?',[{key:'A',text:'Dùng hình ảnh cụ thể để nói về điều trừu tượng'},{key:'B',text:'Dùng nhiều từ khó'},{key:'C',text:'Kể chuyện theo trình tự thời gian'}],'A','hard','Ngôn ngữ tượng trưng dùng hình ảnh cụ thể cho điều trừu tượng',2),
      r(id,3,'fill_blank','Cánh cửa trong bài là [b1] cho ký ức, đại diện cho tình cảm [b2] của cháu với bà.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'biểu tượng',b2:'sâu sắc'},'hard','Cánh cửa là biểu tượng cho ký ức và tình cảm sâu sắc',3),
      r(id,3,'true_false','Tác giả dùng những hình ảnh cụ thể (cửa, thềm, bếp) để gợi lên tình cảm trừu tượng (nhớ, thương). Đúng hay sai?',null,true,'hard','Hình ảnh cụ thể gợi lên tình cảm trừu tượng',4),
      r(id,3,'matching','Nối hình ảnh với cảm xúc nó gợi lên:',[{key:'A',text:'cánh cửa'},{key:'B',text:'bếp lửa ấm'},{key:'C',text:'bậc thềm chờ đợi'}],{A:'Nỗi nhớ và ký ức',B:'Sự ấm áp, yêu thương',C:'Tình cảm kiên nhẫn, chờ đợi yêu thương'},'hard',null,5),
      r(id,3,'single_choice','Bài học về cánh cửa dạy ta điều gì về ký ức?',[{key:'A',text:'Ký ức gắn liền với những nơi chốn quen thuộc'},{key:'B',text:'Nên quên đi những kỷ niệm cũ'},{key:'C',text:'Chỉ đồ vật mới quan trọng, không phải kỷ niệm'}],'A','hard','Ký ức gắn với nơi chốn quen thuộc',6),
      r(id,3,'sorting','Sắp xếp theo chiều sâu cảm xúc từ nhẹ đến sâu sắc nhất:',[{key:'1',text:'Nhìn thấy cánh cửa quen'},{key:'2',text:'Nhớ đến kỷ niệm cùng bà'},{key:'3',text:'Cảm nhận tình thương bà mãi mãi'}],['1','2','3'],'hard','Nhìn → nhớ → cảm nhận sâu sắc',7),
      r(id,3,'fill_blank','Qua bài "Cánh cửa nhớ bà", ta thấy [b1] là thứ không bao giờ mất đi, dù người thân có thể không còn bên cạnh.',[{key:'b1',text:''}],{b1:'ký ức'},'hard','Ký ức là thứ còn mãi trong lòng',8),
      r(id,3,'true_false','Cảm xúc chủ đạo trong bài là niềm vui khi gặp bà. Đúng hay sai?',null,false,'hard','Cảm xúc chủ đạo là nỗi nhớ thương bà',9),
      r(id,3,'single_choice','Biện pháp tu từ nào được dùng khi nói "cánh cửa = ký ức"?',[{key:'A',text:'So sánh (dùng "như")'},{key:'B',text:'Ẩn dụ (dùng hình ảnh thay thế cho ký ức)'},{key:'C',text:'Nhân hóa (cửa biết nói)'}],'B','hard','Đây là ẩn dụ: cánh cửa đại diện cho ký ức',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1175: Bài 30: Thương ông ─────────────────────────────────────────────
  {
    const id = 1175;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài "Thương ông", ông được miêu tả như thế nào?',[{key:'A',text:'Trẻ trung, khỏe mạnh'},{key:'B',text:'Già, tóc bạc, lưng còng, đi chậm'},{key:'C',text:'Hay cáu gắt, khó tính'}],'B','easy','Ông được miêu tả là già, tóc bạc, lưng còng',1),
      r(id,1,'single_choice','Từ "tóc bạc" nói lên điều gì?',[{key:'A',text:'Ông nhuộm tóc màu trắng'},{key:'B',text:'Ông đã nhiều tuổi, tóc đã bạc theo năm tháng'},{key:'C',text:'Ông bị bệnh'}],'B','easy','Tóc bạc là dấu hiệu của tuổi già',2),
      r(id,1,'single_choice','Cháu thể hiện tình thương với ông bằng cách nào?',[{key:'A',text:'Cháu đi chơi, không quan tâm đến ông'},{key:'B',text:'Cháu dắt tay, đọc sách cho ông nghe và hỏi thăm'},{key:'C',text:'Cháu mua quà tặng ông'}],'B','easy','Cháu chăm sóc ông bằng những hành động nhỏ',3),
      r(id,1,'true_false','Từ "lưng còng" miêu tả dáng đi của người già. Đúng hay sai?',null,true,'easy','Lưng còng là đặc điểm dáng người khi già',4),
      r(id,1,'true_false','Cháu không quan tâm đến ông trong bài. Đúng hay sai?',null,false,'easy','Cháu rất quan tâm và thương ông',5),
      r(id,1,'fill_blank','Cháu [b1] tay ông đi dạo mỗi buổi chiều.',[{key:'b1',text:''}],{b1:'dắt'},'easy','Dắt tay ông đi dạo là hành động chăm sóc',6),
      r(id,1,'fill_blank','Cháu [b1] sách cho ông nghe vì mắt ông đã mờ.',[{key:'b1',text:''}],{b1:'đọc'},'easy','Đọc sách cho ông nghe vì ông mắt kém',7),
      r(id,1,'single_choice','Từ "chậm chạp" trong bài miêu tả điều gì?',[{key:'A',text:'Ông đang học bài chậm'},{key:'B',text:'Bước đi của ông không còn nhanh nhẹn do tuổi cao'},{key:'C',text:'Ông nói chuyện rất chậm'}],'B','easy','Chậm chạp miêu tả bước đi của ông khi già',8),
      r(id,1,'sorting','Sắp xếp các hành động chăm sóc ông theo thứ tự trong bài:',[{key:'1',text:'Đọc sách cho ông nghe'},{key:'2',text:'Hỏi thăm sức khỏe ông'},{key:'3',text:'Dắt tay ông đi dạo'}],['3','1','2'],'easy','Dắt tay → đọc sách → hỏi thăm',9),
      r(id,1,'true_false','Kính trọng người già là truyền thống tốt đẹp của người Việt. Đúng hay sai?',null,true,'easy','Kính trọng người già là truyền thống đạo đức',10),
      // Ex2 medium
      r(id,2,'single_choice','Cháu dắt tay ông, đọc sách và hỏi thăm thể hiện điều gì?',[{key:'A',text:'Cháu muốn ông khen'},{key:'B',text:'Cháu yêu thương và kính trọng ông'},{key:'C',text:'Đây là bài tập ở trường'}],'B','medium','Các hành động thể hiện tình yêu và kính trọng ông',1),
      r(id,2,'single_choice','Từ "kính trọng" khác "yêu thương" như thế nào?',[{key:'A',text:'Kính trọng là ghét bỏ'},{key:'B',text:'Kính trọng là tôn trọng và nể phục, yêu thương là tình cảm quý mến'},{key:'C',text:'Hai từ có nghĩa hoàn toàn giống nhau'}],'B','medium','Kính trọng là tôn trọng, yêu thương là tình cảm quý mến',2),
      r(id,2,'fill_blank','Cháu [b1] ông vì hiểu rằng ông đã già và cần được [b2] sóc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thương',b2:'chăm'},'medium','Cháu thương ông và muốn chăm sóc ông',3),
      r(id,2,'true_false','Bài văn cho thấy trẻ em cũng có thể chăm sóc người lớn tuổi. Đúng hay sai?',null,true,'medium','Trẻ em cũng có thể thể hiện tình thương với ông bà',4),
      r(id,2,'matching','Nối hành động của cháu với ý nghĩa:',[{key:'A',text:'Dắt tay ông đi dạo'},{key:'B',text:'Đọc sách cho ông'},{key:'C',text:'Hỏi thăm sức khỏe'}],{A:'Giúp ông vận động an toàn',B:'Giúp ông giải trí vì mắt kém',C:'Thể hiện sự quan tâm, lo lắng'},'medium',null,5),
      r(id,2,'single_choice','Hình ảnh "tóc bạc, lưng còng" được dùng để?',[{key:'A',text:'Tả vẻ đẹp của ông'},{key:'B',text:'Miêu tả sự già nua của ông, khiến cháu thêm thương'},{key:'C',text:'Cho biết ông thích đội mũ'}],'B','medium','Hình ảnh già nua làm tăng tình thương của cháu',6),
      r(id,2,'true_false','Việc chăm sóc ông chỉ là trách nhiệm của bố mẹ, không phải của cháu. Đúng hay sai?',null,false,'medium','Mọi thành viên trong gia đình đều có thể chăm sóc nhau',7),
      r(id,2,'sorting','Sắp xếp các hành động thể hiện tình thương từ đơn giản đến phức tạp:',[{key:'1',text:'Mỉm cười với ông'},{key:'2',text:'Hỏi thăm sức khỏe ông'},{key:'3',text:'Đọc sách cho ông nghe mỗi ngày'}],['1','2','3'],'medium','Từ đơn giản → vừa → cần kiên nhẫn',8),
      r(id,2,'fill_blank','Bài học về việc [b1] người cao tuổi là truyền thống đạo đức tốt đẹp của người Việt Nam.',[{key:'b1',text:''}],{b1:'kính trọng'},'medium','Kính trọng người cao tuổi là truyền thống',9),
      r(id,2,'single_choice','Từ "thương" trong nhan đề "Thương ông" thể hiện tình cảm gì?',[{key:'A',text:'Thương hại, tội nghiệp ông'},{key:'B',text:'Yêu mến, quan tâm và kính trọng ông'},{key:'C',text:'Sợ hãi ông'}],'B','medium','Thương ông là yêu mến, quan tâm và kính trọng',10),
      // Ex3 hard
      r(id,3,'single_choice','Thông điệp chính của bài "Thương ông" là gì?',[{key:'A',text:'Ông già thì không làm được gì'},{key:'B',text:'Hãy yêu thương và chăm sóc người cao tuổi trong gia đình'},{key:'C',text:'Trẻ em không cần kính trọng người lớn'}],'B','hard','Thông điệp: yêu thương và chăm sóc người cao tuổi',1),
      r(id,3,'single_choice','Tại sao tác giả miêu tả "tóc bạc, lưng còng, đi chậm" của ông?',[{key:'A',text:'Để người đọc thấy ông không quan trọng'},{key:'B',text:'Để người đọc cảm nhận được sự già yếu và cần được chăm sóc của ông'},{key:'C',text:'Để miêu tả thời tiết'}],'B','hard','Hình ảnh già yếu giúp người đọc đồng cảm và thương ông',2),
      r(id,3,'fill_blank','Hành động chăm sóc ông của cháu thể hiện [b1] và [b2] — hai giá trị đạo đức quan trọng của người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tình yêu thương',b2:'lòng kính trọng'},'hard','Yêu thương và kính trọng là hai giá trị đạo đức',3),
      r(id,3,'true_false','Bài văn dùng hình ảnh cụ thể (dắt tay, đọc sách) để diễn đạt tình cảm trừu tượng (thương ông). Đúng hay sai?',null,true,'hard','Hành động cụ thể diễn đạt tình cảm trừu tượng',4),
      r(id,3,'matching','Nối giá trị với hành động thể hiện trong bài:',[{key:'A',text:'Lòng hiếu thảo'},{key:'B',text:'Sự quan tâm'},{key:'C',text:'Đức tính kiên nhẫn'}],{A:'Chăm sóc ông bà khi già yếu',B:'Hỏi thăm sức khỏe hàng ngày',C:'Đọc sách cho ông nghe mỗi ngày'},'hard',null,5),
      r(id,3,'single_choice','So sánh cách cháu thương ông trong bài với cách người lớn thường thể hiện:',[{key:'A',text:'Cách của cháu hoàn toàn giống người lớn'},{key:'B',text:'Cháu thể hiện theo cách phù hợp với lứa tuổi: dắt tay, đọc sách, hỏi thăm'},{key:'C',text:'Cháu không biết cách thương ông'}],'B','hard','Cháu thể hiện tình thương theo cách phù hợp lứa tuổi',6),
      r(id,3,'sorting','Sắp xếp để phân tích bài văn:',[{key:'1',text:'Kết luận: Bài học về kính trọng người cao tuổi'},{key:'2',text:'Hình ảnh ông: già, tóc bạc, lưng còng'},{key:'3',text:'Hành động của cháu: dắt tay, đọc sách, hỏi thăm'}],['2','3','1'],'hard','Phân tích: nhân vật → hành động → kết luận',7),
      r(id,3,'fill_blank','Bài "Thương ông" dạy rằng [b1] là điều mỗi đứa trẻ có thể làm để [b2] với ông bà.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'những hành động nhỏ',b2:'thể hiện tình yêu thương'},'hard','Hành động nhỏ thể hiện tình yêu thương lớn',8),
      r(id,3,'true_false','Câu chuyện về ông cháu trong bài phản ánh truyền thống "uống nước nhớ nguồn" của người Việt. Đúng hay sai?',null,true,'hard','Chăm sóc ông bà phản ánh truyền thống biết ơn',9),
      r(id,3,'single_choice','Từ "kính trọng" trong câu "Cháu kính trọng ông" thể hiện thái độ như thế nào?',[{key:'A',text:'Sợ hãi và né tránh ông'},{key:'B',text:'Tôn trọng, nể phục và quý mến ông'},{key:'C',text:'Không quan tâm đến ông'}],'B','hard','Kính trọng = tôn trọng, nể phục, quý mến',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1176: Bài 31: Ánh sáng của yêu thương ───────────────────────────────
  {
    const id = 1176;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Trong bài "Ánh sáng của yêu thương", ánh sáng tượng trưng cho điều gì?',[{key:'A',text:'Ánh đèn điện trong nhà'},{key:'B',text:'Tình yêu thương trong gia đình'},{key:'C',text:'Ánh mặt trời buổi sáng'}],'B','easy','Ánh sáng là ẩn dụ cho tình yêu thương',1),
      r(id,1,'single_choice','Từ "ấm áp" trong bài nói đến điều gì?',[{key:'A',text:'Nhiệt độ nóng bức'},{key:'B',text:'Cảm giác được yêu thương, an toàn'},{key:'C',text:'Mặc nhiều quần áo'}],'B','easy','Ấm áp là cảm giác được yêu thương',2),
      r(id,1,'single_choice','Từ "lan tỏa" có nghĩa là gì?',[{key:'A',text:'Dừng lại một chỗ'},{key:'B',text:'Trải rộng ra, đến nhiều nơi'},{key:'C',text:'Thu lại, rút gọn'}],'B','easy','Lan tỏa nghĩa là trải rộng ra',3),
      r(id,1,'true_false','Ánh sáng trong bài là ẩn dụ cho tình yêu thương. Đúng hay sai?',null,true,'easy','Ánh sáng là ẩn dụ (hình ảnh) cho tình yêu thương',4),
      r(id,1,'true_false','Từ "tỏa" và "lan" có nghĩa khác nhau hoàn toàn. Đúng hay sai?',null,false,'easy','Tỏa và lan đều có nghĩa là trải rộng ra',5),
      r(id,1,'fill_blank','Tình yêu thương trong gia đình [b1] sáng như ánh đèn ấm áp.',[{key:'b1',text:''}],{b1:'tỏa'},'easy','Tỏa sáng là từ diễn đạt ánh sáng lan ra',6),
      r(id,1,'fill_blank','Ánh sáng của yêu thương [b1] đến mọi góc nhà, sưởi ấm mọi người.',[{key:'b1',text:''}],{b1:'lan'},'easy','Lan tỏa là ánh sáng trải rộng',7),
      r(id,1,'single_choice','Bài "Ánh sáng của yêu thương" thuộc thể loại gì?',[{key:'A',text:'Thơ'},{key:'B',text:'Văn xuôi / bài đọc'},{key:'C',text:'Truyện kể'}],'B','easy','Đây là bài văn xuôi hoặc bài đọc',8),
      r(id,1,'sorting','Sắp xếp các từ liên quan đến ánh sáng: tỏa / sáng / ấm / lan',[{key:'1',text:'tỏa'},{key:'2',text:'sáng'},{key:'3',text:'ấm'},{key:'4',text:'lan'}],['2','1','4','3'],'easy','Sáng → tỏa → lan → ấm là trình tự nghĩa',9),
      r(id,1,'true_false','Trong bài, ánh sáng giúp gia đình cảm thấy hạnh phúc và gắn bó. Đúng hay sai?',null,true,'easy','Ánh sáng yêu thương mang lại hạnh phúc cho gia đình',10),
      // Ex2 medium
      r(id,2,'single_choice','Trong đoạn văn ẩn dụ, "ánh sáng" đại diện cho điều gì cụ thể?',[{key:'A',text:'Bóng đèn sáng ở phòng khách'},{key:'B',text:'Tình yêu thương của gia đình sưởi ấm mọi người'},{key:'C',text:'Ngọn lửa nấu cơm'}],'B','medium','Ánh sáng là ẩn dụ cho tình yêu thương gia đình',1),
      r(id,2,'single_choice','Tại sao tác giả dùng hình ảnh "ánh sáng" để nói về tình yêu thương?',[{key:'A',text:'Vì tác giả thích điện'},{key:'B',text:'Vì ánh sáng mang lại ấm áp, xua tan bóng tối giống như tình yêu thương'},{key:'C',text:'Vì ánh sáng rất đắt tiền'}],'B','medium','Ánh sáng và tình yêu thương đều mang lại ấm áp, xua tan u tối',2),
      r(id,2,'fill_blank','Ẩn dụ "ánh sáng = [b1]" giúp người đọc cảm nhận được sự [b2] và ấm áp của tình cảm gia đình.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu thương',b2:'sáng rõ'},'medium','Ẩn dụ ánh sáng = yêu thương thể hiện sự sáng rõ và ấm áp',3),
      r(id,2,'true_false','Hình ảnh ánh sáng trong bài là cách diễn đạt trừu tượng bằng hình ảnh cụ thể. Đúng hay sai?',null,true,'medium','Đây là cách dùng hình ảnh cụ thể cho điều trừu tượng',4),
      r(id,2,'matching','Nối từ chỉ ánh sáng với nghĩa tượng trưng:',[{key:'A',text:'sáng'},{key:'B',text:'ấm áp'},{key:'C',text:'lan tỏa'}],{A:'Tình yêu thương rõ ràng, hiển hiện',B:'Cảm giác được yêu thương, an toàn',C:'Tình yêu thương truyền đến mọi người'},'medium',null,5),
      r(id,2,'single_choice','Ánh sáng "tỏa" ra nghĩa là tình yêu thương:',[{key:'A',text:'Chỉ thuộc về một người'},{key:'B',text:'Từ một người lan ra cho nhiều người'},{key:'C',text:'Giảm dần theo thời gian'}],'B','medium','Tỏa sáng = tình yêu lan từ một người ra nhiều người',6),
      r(id,2,'true_false','Trong bài, ánh sáng của yêu thương có thể xua tan bóng tối và u buồn. Đúng hay sai?',null,true,'medium','Ánh sáng yêu thương xua tan bóng tối, u buồn',7),
      r(id,2,'sorting','Sắp xếp ý để hiểu ẩn dụ trong bài:',[{key:'1',text:'Nhận ra ý nghĩa: ánh sáng = yêu thương'},{key:'2',text:'Đọc đoạn văn có hình ảnh ánh sáng'},{key:'3',text:'Hiểu tình yêu thương lan tỏa như ánh sáng'}],['2','1','3'],'medium','Đọc → nhận ra ẩn dụ → hiểu ý nghĩa',8),
      r(id,2,'fill_blank','Trong văn học, dùng hình ảnh [b1] để nói về tình cảm [b2] gọi là biện pháp ẩn dụ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ánh sáng',b2:'yêu thương'},'medium','Ẩn dụ: dùng ánh sáng để nói về yêu thương',9),
      r(id,2,'single_choice','Từ nào trong bài thể hiện sự lan rộng của tình yêu thương?',[{key:'A',text:'tắt'},{key:'B',text:'lan tỏa'},{key:'C',text:'tối'}],'B','medium','Lan tỏa thể hiện sự trải rộng của tình yêu thương',10),
      // Ex3 hard
      r(id,3,'single_choice','Ẩn dụ là biện pháp tu từ như thế nào?',[{key:'A',text:'So sánh có dùng từ "như", "tựa"'},{key:'B',text:'Dùng tên gọi của vật này để gọi vật khác vì có nét tương đồng'},{key:'C',text:'Lặp lại từ nhiều lần'}],'B','hard','Ẩn dụ dùng tên vật này gọi vật khác vì nét tương đồng',1),
      r(id,3,'single_choice','Điểm tương đồng giữa "ánh sáng" và "tình yêu thương" là gì?',[{key:'A',text:'Cả hai đều có thể mua ở cửa hàng'},{key:'B',text:'Cả hai đều mang lại ấm áp, xua tan bóng tối/u buồn và lan tỏa'},{key:'C',text:'Cả hai đều vô hình'}],'B','hard','Ánh sáng và yêu thương đều ấm áp, xua tan tối/buồn, lan tỏa',2),
      r(id,3,'fill_blank','Ẩn dụ "ánh sáng của yêu thương" có nghĩa là [b1] soi sáng, ấm áp và [b2] trong cuộc sống.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tình yêu thương',b2:'lan tỏa'},'hard','Tình yêu thương soi sáng và lan tỏa như ánh sáng',3),
      r(id,3,'true_false','So sánh và ẩn dụ đều dùng hình ảnh để diễn đạt, nhưng ẩn dụ không dùng từ "như", "tựa". Đúng hay sai?',null,true,'hard','Ẩn dụ khác so sánh ở chỗ không dùng từ so sánh',4),
      r(id,3,'matching','Phân biệt biện pháp tu từ:',[{key:'A',text:'So sánh'},{key:'B',text:'Ẩn dụ'},{key:'C',text:'Điệp từ'}],{A:'Mẹ như ánh nắng (có từ "như")',B:'Ánh sáng yêu thương (không dùng "như")',C:'Yêu thương, yêu thương mãi...'},'hard',null,5),
      r(id,3,'single_choice','Nhan đề "Ánh sáng của yêu thương" sử dụng biện pháp tu từ nào?',[{key:'A',text:'So sánh'},{key:'B',text:'Ẩn dụ'},{key:'C',text:'Nhân hóa'}],'B','hard','Nhan đề dùng ẩn dụ: ánh sáng = yêu thương',6),
      r(id,3,'sorting','Sắp xếp để phân tích biện pháp ẩn dụ trong bài:',[{key:'1',text:'Kết luận: Ẩn dụ làm tăng sức biểu cảm'},{key:'2',text:'Xác định: "ánh sáng" = "yêu thương"'},{key:'3',text:'Tìm điểm tương đồng: đều ấm áp, lan tỏa'}],['2','3','1'],'hard','Phân tích ẩn dụ: xác định → tìm điểm giống → kết luận',7),
      r(id,3,'fill_blank','Trong bài, ý nghĩa ẩn của "ánh sáng" là [b1] gia đình, còn "bóng tối" tượng trưng cho [b2] và khổ đau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tình yêu thương',b2:'nỗi buồn'},'hard','Ánh sáng = yêu thương, bóng tối = buồn khổ',8),
      r(id,3,'true_false','Biện pháp ẩn dụ trong bài làm cho nội dung trừu tượng trở nên dễ hiểu và sinh động hơn. Đúng hay sai?',null,true,'hard','Ẩn dụ giúp điều trừu tượng dễ hình dung hơn',9),
      r(id,3,'single_choice','Tại sao tác giả chọn "ánh sáng" mà không chọn hình ảnh khác để nói về tình yêu thương?',[{key:'A',text:'Vì ánh sáng là đặc trưng của mùa hè'},{key:'B',text:'Vì ánh sáng có nhiều nét tương đồng với yêu thương: ấm áp, xua tan u buồn, lan tỏa khắp nơi'},{key:'C',text:'Vì tác giả thích điện'}],'B','hard','Ánh sáng được chọn vì có nhiều nét tương đồng với yêu thương',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1177: Bài 32: Chơi chong chóng ──────────────────────────────────────
  {
    const id = 1177;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Chong chóng là đồ chơi như thế nào?',[{key:'A',text:'Đồ chơi chạy pin, phát sáng'},{key:'B',text:'Đồ chơi có cánh quay khi có gió'},{key:'C',text:'Đồ chơi bơm hơi to lớn'}],'B','easy','Chong chóng là đồ chơi có cánh quay nhờ gió',1),
      r(id,1,'single_choice','Điều gì làm cho chong chóng quay?',[{key:'A',text:'Ánh sáng mặt trời'},{key:'B',text:'Gió thổi'},{key:'C',text:'Nước chảy'}],'B','easy','Gió thổi làm chong chóng quay',2),
      r(id,1,'single_choice','Từ "vù vù" trong bài miêu tả điều gì?',[{key:'A',text:'Tiếng chó sủa'},{key:'B',text:'Âm thanh phát ra khi chong chóng quay nhanh'},{key:'C',text:'Tiếng mưa rơi'}],'B','easy','Vù vù là âm thanh chong chóng quay nhanh',3),
      r(id,1,'true_false','Chong chóng quay chậm khi gió mạnh. Đúng hay sai?',null,false,'easy','Gió mạnh thì chong chóng quay nhanh',4),
      r(id,1,'true_false','Từ "tít" mô tả tốc độ quay rất nhanh của chong chóng. Đúng hay sai?',null,true,'easy','Tít nghĩa là quay rất nhanh, không nhìn rõ được',5),
      r(id,1,'fill_blank','Khi gió [b1] mạnh, chong chóng quay [b2] vù vù.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thổi',b2:'tít'},'easy','Gió thổi mạnh → chong chóng quay tít',6),
      r(id,1,'fill_blank','Chong chóng có nhiều [b1] sắc đẹp, trông rất vui mắt khi quay.',[{key:'b1',text:''}],{b1:'màu'},'easy','Chong chóng có nhiều màu sắc',7),
      r(id,1,'single_choice','Chơi chong chóng thường mang lại cảm giác gì?',[{key:'A',text:'Buồn bã, chán nản'},{key:'B',text:'Vui vẻ, hào hứng và thích thú'},{key:'C',text:'Sợ hãi'}],'B','easy','Chơi chong chóng mang lại niềm vui',8),
      r(id,1,'sorting','Sắp xếp các bước chơi chong chóng:',[{key:'1',text:'Chong chóng quay vù vù'},{key:'2',text:'Gió thổi đến'},{key:'3',text:'Cầm chong chóng giơ lên cao'}],['3','2','1'],'easy','Cầm giơ lên → gió thổi → chong chóng quay',9),
      r(id,1,'true_false','Xào xạc là âm thanh phát ra khi gió thổi qua lá cây. Đúng hay sai?',null,true,'easy','Xào xạc là âm thanh gió thổi qua lá',10),
      // Ex2 medium
      r(id,2,'single_choice','Niềm vui của trẻ em khi chơi chong chóng đến từ đâu?',[{key:'A',text:'Từ việc chong chóng đắt tiền'},{key:'B',text:'Từ tiếng quay vui tai, màu sắc đẹp và cảm giác gió mát'},{key:'C',text:'Từ việc chong chóng rất to'}],'B','medium','Niềm vui từ âm thanh, màu sắc và cảm giác gió',1),
      r(id,2,'single_choice','Gió làm chong chóng quay như thế nào?',[{key:'A',text:'Gió nhẹ thì quay nhanh, gió mạnh thì quay chậm'},{key:'B',text:'Gió thổi vào cánh chong chóng làm nó quay, gió càng mạnh quay càng nhanh'},{key:'C',text:'Gió không liên quan đến tốc độ quay'}],'B','medium','Gió mạnh → chong chóng quay nhanh hơn',2),
      r(id,2,'fill_blank','Khi gió [b1], chong chóng quay chậm; khi gió [b2], chong chóng quay tít vù vù.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhẹ',b2:'mạnh'},'medium','Gió nhẹ → quay chậm; gió mạnh → quay nhanh',3),
      r(id,2,'true_false','Âm thanh "vù vù" trong bài là từ tượng thanh miêu tả tiếng chong chóng quay. Đúng hay sai?',null,true,'medium','Vù vù là từ tượng thanh',4),
      r(id,2,'matching','Nối từ với âm thanh hoặc hình ảnh nó miêu tả:',[{key:'A',text:'vù vù'},{key:'B',text:'xào xạc'},{key:'C',text:'tít'}],{A:'Tiếng chong chóng quay nhanh',B:'Tiếng gió thổi qua lá',C:'Quay rất nhanh, mờ cánh'},'medium',null,5),
      r(id,2,'single_choice','Từ "tượng thanh" là gì?',[{key:'A',text:'Từ diễn tả màu sắc'},{key:'B',text:'Từ mô phỏng âm thanh trong thực tế'},{key:'C',text:'Từ chỉ hành động'}],'B','medium','Từ tượng thanh mô phỏng âm thanh thực tế',6),
      r(id,2,'true_false','Màu sắc của chong chóng thêm vào vẻ đẹp và niềm vui khi chơi. Đúng hay sai?',null,true,'medium','Màu sắc góp phần tạo niềm vui khi chơi',7),
      r(id,2,'sorting','Sắp xếp từ mô tả tốc độ quay từ chậm đến nhanh:',[{key:'1',text:'quay chậm (gió nhẹ)'},{key:'2',text:'quay vừa'},{key:'3',text:'quay tít vù vù (gió mạnh)'}],['1','2','3'],'medium','Chậm → vừa → nhanh (tít vù vù)',8),
      r(id,2,'fill_blank','Bài "Chơi chong chóng" miêu tả niềm vui của trẻ em qua [b1] thanh và hình ảnh [b2] sắc của chong chóng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'âm',b2:'màu'},'medium','Âm thanh và màu sắc tạo niềm vui',9),
      r(id,2,'single_choice','Khi chong chóng quay, màu sắc trông như thế nào?',[{key:'A',text:'Tách rời từng màu rõ ràng'},{key:'B',text:'Hòa quyện, trông như vòng tròn màu sắc'},{key:'C',text:'Trở nên đen trắng'}],'B','medium','Quay nhanh thì màu sắc hòa quyện thành vòng tròn',10),
      // Ex3 hard
      r(id,3,'single_choice','Từ tượng thanh "vù vù" trong bài có tác dụng gì?',[{key:'A',text:'Làm bài thơ khó hơn'},{key:'B',text:'Giúp người đọc như nghe thấy tiếng chong chóng quay, tạo cảm giác sinh động'},{key:'C',text:'Làm bài ngắn hơn'}],'B','hard','Từ tượng thanh tạo cảm giác nghe thấy âm thanh thực',1),
      r(id,3,'single_choice','Ngôn ngữ miêu tả trong bài đặc biệt ở điểm nào?',[{key:'A',text:'Chỉ dùng từ ngắn gọn'},{key:'B',text:'Kết hợp từ tượng thanh và hình ảnh màu sắc để miêu tả sinh động'},{key:'C',text:'Không có hình ảnh màu sắc'}],'B','hard','Kết hợp từ tượng thanh và hình ảnh màu sắc',2),
      r(id,3,'fill_blank','Từ tượng thanh là từ [b1] lại âm thanh trong thực tế, ví dụ "vù vù" và "[b2]" trong bài.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mô phỏng',b2:'xào xạc'},'hard','Tượng thanh mô phỏng âm thanh: vù vù, xào xạc',3),
      r(id,3,'true_false','Từ tượng thanh làm cho bài văn trở nên sinh động vì người đọc như thật sự nghe thấy âm thanh. Đúng hay sai?',null,true,'hard','Tượng thanh tạo cảm giác thực cho người đọc',4),
      r(id,3,'matching','Nối từ tượng thanh với âm thanh nó mô phỏng:',[{key:'A',text:'vù vù'},{key:'B',text:'xào xạc'},{key:'C',text:'ù ù'}],{A:'Tiếng chong chóng / quạt máy quay nhanh',B:'Tiếng gió thổi qua lá cây',C:'Tiếng gió mạnh hoặc tiếng xe'},'hard',null,5),
      r(id,3,'single_choice','Tại sao màu sắc của chong chóng quan trọng trong bài miêu tả?',[{key:'A',text:'Vì màu sắc quyết định giá tiền'},{key:'B',text:'Vì màu sắc tạo vẻ đẹp hấp dẫn và tăng thêm niềm vui cho người chơi'},{key:'C',text:'Vì màu sắc giúp chong chóng quay nhanh'}],'B','hard','Màu sắc tạo vẻ đẹp và niềm vui',6),
      r(id,3,'sorting','Sắp xếp để phân tích ngôn ngữ miêu tả trong bài:',[{key:'1',text:'Kết luận: Ngôn ngữ sinh động, gợi cảm'},{key:'2',text:'Từ tượng thanh: vù vù, xào xạc'},{key:'3',text:'Hình ảnh màu sắc: chong chóng nhiều màu quay tít'}],['2','3','1'],'hard','Phân tích: tượng thanh → hình ảnh → kết luận',7),
      r(id,3,'fill_blank','Bài "Chơi chong chóng" dùng từ [b1] để tả tiếng quay và từ [b2] sắc để tả vẻ đẹp.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tượng thanh',b2:'màu'},'hard','Tượng thanh tả âm thanh, màu sắc tả vẻ đẹp',8),
      r(id,3,'true_false','Cả từ tượng thanh lẫn hình ảnh màu sắc trong bài đều góp phần miêu tả niềm vui chơi chong chóng. Đúng hay sai?',null,true,'hard','Cả hai yếu tố cùng tạo nên niềm vui trong bài',9),
      r(id,3,'single_choice','So sánh cách miêu tả chong chóng trong bài với cách miêu tả thông thường:',[{key:'A',text:'Bài này chỉ nói chong chóng quay, không có gì đặc biệt'},{key:'B',text:'Bài dùng từ tượng thanh và hình ảnh màu sắc làm cho chong chóng trở nên sống động hơn'},{key:'C',text:'Bài miêu tả chong chóng như một máy móc'}],'B','hard','Từ tượng thanh và màu sắc làm chong chóng sống động',10),
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
