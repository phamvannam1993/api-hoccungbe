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

  // ─── 1146: Bài 1 - Tôi là học sinh lớp 2 ───────────────────────────────────
  {
    const id = 1146;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Đồ vật nào dùng để viết bài trên bảng?',[{key:'A',text:'Phấn'},{key:'B',text:'Bút chì'},{key:'C',text:'Thước kẻ'}],'A','easy','Phấn dùng để viết trên bảng đen',1),
      r(id,1,'single_choice','Học sinh ngồi trên cái gì trong lớp học?',[{key:'A',text:'Bàn'},{key:'B',text:'Ghế'},{key:'C',text:'Bảng'}],'B','easy','Học sinh ngồi trên ghế',2),
      r(id,1,'single_choice','Quyển sách bài tập còn gọi là gì?',[{key:'A',text:'Vở'},{key:'B',text:'Bút'},{key:'C',text:'Thước'}],'A','easy','Vở dùng để viết bài tập',3),
      r(id,1,'true_false','Học sinh lớp 2 đã học xong lớp 1. Đúng hay sai?',null,true,'easy','Lên lớp 2 nghĩa là đã học xong lớp 1',4),
      r(id,1,'true_false','Bảng đen dùng để viết bằng bút mực. Đúng hay sai?',null,false,'easy','Bảng đen dùng để viết bằng phấn',5),
      r(id,1,'matching','Nối đồ dùng học tập với công dụng:',[{key:'A',text:'Thước kẻ'},{key:'B',text:'Bút chì'},{key:'C',text:'Cục tẩy'}],{A:'Kẻ đường thẳng',B:'Viết và vẽ',C:'Xóa chữ'},'easy',null,6),
      r(id,1,'fill_blank','Mỗi sáng, em chào [b1] trước khi vào lớp.',[{key:'b1',text:''}],{b1:'thầy cô'},'easy','Học sinh chào thầy cô trước khi vào lớp',7),
      r(id,1,'single_choice','Khi gặp thầy cô, em nên làm gì?',[{key:'A',text:'Cúi đầu chào'},{key:'B',text:'Quay đi chỗ khác'},{key:'C',text:'Giả vờ không thấy'}],'A','easy','Cúi đầu chào thầy cô là lễ phép',8),
      r(id,1,'sorting','Sắp xếp các đồ dùng học tập theo thứ tự bảng chữ cái: Vở, Bút, Thước, Sách',[{key:'1',text:'Vở'},{key:'2',text:'Bút'},{key:'3',text:'Thước'},{key:'4',text:'Sách'}],['2','4','3','1'],'easy','Bút, Sách, Thước, Vở',9),
      r(id,1,'single_choice','Bạn học cùng lớp với em gọi là gì?',[{key:'A',text:'Bạn bè'},{key:'B',text:'Bạn cùng lớp'},{key:'C',text:'Hàng xóm'}],'B','easy','Bạn học cùng lớp gọi là bạn cùng lớp',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu nào là câu hỏi?',[{key:'A',text:'Em đi học.'},{key:'B',text:'Bạn tên là gì?'},{key:'C',text:'Lớp học rất đẹp.'}],'B','medium','Câu hỏi thường có từ để hỏi như "gì", "ai", "ở đâu"',1),
      r(id,2,'single_choice','Câu nào là câu kể?',[{key:'A',text:'Em học lớp mấy?'},{key:'B',text:'Tôi là học sinh lớp 2.'},{key:'C',text:'Bạn ơi, bạn tên gì?'}],'B','medium','Câu kể dùng để kể, tả, thông báo sự việc',2),
      r(id,2,'true_false','Câu "Trường em có sân rộng và nhiều cây xanh." là câu kể. Đúng hay sai?',null,true,'medium','Câu kể dùng để miêu tả, kể về sự vật',3),
      r(id,2,'true_false','Câu hỏi luôn kết thúc bằng dấu chấm than. Đúng hay sai?',null,false,'medium','Câu hỏi kết thúc bằng dấu chấm hỏi (?)',4),
      r(id,2,'fill_blank','Em tên là [b1], học lớp [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'(tên em)',b2:'2'},'medium','Câu giới thiệu bản thân',5),
      r(id,2,'matching','Nối câu với loại câu:',[{key:'A',text:'Lớp em có 30 bạn.'},{key:'B',text:'Bạn học ở đâu?'},{key:'C',text:'Em rất thích đi học!'}],{A:'Câu kể',B:'Câu hỏi',C:'Câu cảm'},'medium',null,6),
      r(id,2,'single_choice','Từ nào chỉ đồ dùng học tập?',[{key:'A',text:'Bàn ghế'},{key:'B',text:'Bảng, phấn, sách, vở'},{key:'C',text:'Trường, lớp, sân'}],'B','medium','Bảng, phấn, sách, vở là đồ dùng học tập',7),
      r(id,2,'single_choice','Câu "Chào buổi sáng, thưa cô!" thuộc loại câu nào?',[{key:'A',text:'Câu kể'},{key:'B',text:'Câu hỏi'},{key:'C',text:'Câu chào hỏi'}],'C','medium','Đây là câu dùng để chào hỏi',8),
      r(id,2,'fill_blank','Năm nay em học lớp [b1] tại trường [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'2',b2:'(tên trường)'},'medium','Câu giới thiệu lớp và trường',9),
      r(id,2,'sorting','Sắp xếp các từ thành câu hoàn chỉnh: học / em / lớp 2 / là / sinh',[{key:'1',text:'học'},{key:'2',text:'em'},{key:'3',text:'lớp 2'},{key:'4',text:'là'},{key:'5',text:'sinh'}],['2','4','1','5','3'],'medium','Em là học sinh lớp 2.',10),
      // Ex3 hard
      r(id,3,'single_choice','Từ nào là danh từ chỉ người?',[{key:'A',text:'Chạy'},{key:'B',text:'Học sinh'},{key:'C',text:'Vui vẻ'}],'B','hard','Học sinh là danh từ chỉ người',1),
      r(id,3,'single_choice','Từ nào là động từ (chỉ hành động)?',[{key:'A',text:'Sách'},{key:'B',text:'Đẹp'},{key:'C',text:'Đọc'}],'C','hard','Đọc là động từ chỉ hành động',2),
      r(id,3,'true_false','Từ "bảng đen" là danh từ chỉ đồ vật. Đúng hay sai?',null,true,'hard','Bảng đen là đồ vật trong lớp học',3),
      r(id,3,'matching','Phân loại từ — danh từ hay động từ:',[{key:'A',text:'Viết'},{key:'B',text:'Bút chì'},{key:'C',text:'Ngồi'},{key:'D',text:'Lớp học'}],{A:'Động từ',B:'Danh từ',C:'Động từ',D:'Danh từ'},'hard',null,4),
      r(id,3,'fill_blank','Buổi sáng, em [b1] dậy, [b2] mặt rồi đi học.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngủ dậy / thức',b2:'rửa'},'hard','Trình tự hoạt động buổi sáng',5),
      r(id,3,'sorting','Sắp xếp các sự việc theo đúng trình tự buổi sáng đi học: Chào thầy cô, Thức dậy, Đến trường, Ăn sáng',[{key:'1',text:'Chào thầy cô'},{key:'2',text:'Thức dậy'},{key:'3',text:'Đến trường'},{key:'4',text:'Ăn sáng'}],['2','4','3','1'],'hard','Thức dậy → Ăn sáng → Đến trường → Chào thầy cô',6),
      r(id,3,'single_choice','Câu nào dùng sai dấu câu?',[{key:'A',text:'Em học lớp 2.'},{key:'B',text:'Bạn tên là gì.'},{key:'C',text:'Trường em rất đẹp.'}],'B','hard','Câu hỏi phải kết thúc bằng dấu chấm hỏi (?)',7),
      r(id,3,'true_false','Từ "thước kẻ" gồm hai tiếng. Đúng hay sai?',null,true,'hard','Thước kẻ = thước + kẻ (hai tiếng)',8),
      r(id,3,'fill_blank','Em giới thiệu: "Tôi tên là [b1], năm nay [b2] tuổi, học lớp 2."',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'(tên)',b2:'7'},'hard','Học sinh lớp 2 thường 7-8 tuổi',9),
      r(id,3,'matching','Nối từ với nghĩa phù hợp:',[{key:'A',text:'Trường học'},{key:'B',text:'Giờ ra chơi'},{key:'C',text:'Bảng lớp'}],{A:'Nơi học sinh đến học',B:'Thời gian nghỉ giữa tiết học',C:'Vật dùng để thầy cô viết bài'},'hard',null,10),
      // ─ Ex 3 row 10 already added above as sortOrder 10
    ];
    lessons.push({ id, rows });
  }

  // ─── 1147: Bài 2 - Ngày hôm qua đâu rồi? ───────────────────────────────────
  {
    const id = 1147;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Ngày trước ngày hôm nay gọi là gì?',[{key:'A',text:'Ngày mai'},{key:'B',text:'Hôm qua'},{key:'C',text:'Hôm nay'}],'B','easy','Hôm qua là ngày đã qua trước hôm nay',1),
      r(id,1,'single_choice','Ngày sau ngày hôm nay gọi là gì?',[{key:'A',text:'Hôm qua'},{key:'B',text:'Hôm nay'},{key:'C',text:'Ngày mai'}],'C','easy','Ngày mai là ngày tiếp theo sau hôm nay',2),
      r(id,1,'single_choice','Thứ mấy đứng sau thứ Hai?',[{key:'A',text:'Chủ nhật'},{key:'B',text:'Thứ Ba'},{key:'C',text:'Thứ Sáu'}],'B','easy','Thứ Hai → Thứ Ba → Thứ Tư...',3),
      r(id,1,'true_false','Một tuần có 7 ngày. Đúng hay sai?',null,true,'easy','Một tuần: Thứ 2, 3, 4, 5, 6, 7, Chủ nhật',4),
      r(id,1,'true_false','Ngày mai đã xảy ra rồi. Đúng hay sai?',null,false,'easy','Ngày mai là ngày chưa đến, chưa xảy ra',5),
      r(id,1,'matching','Nối từ chỉ thời gian với nghĩa:',[{key:'A',text:'Hôm qua'},{key:'B',text:'Hôm nay'},{key:'C',text:'Ngày mai'}],{A:'Ngày đã qua',B:'Ngày hiện tại',C:'Ngày sắp đến'},'easy',null,6),
      r(id,1,'sorting','Sắp xếp các ngày trong tuần theo đúng thứ tự: Thứ Tư, Thứ Hai, Thứ Sáu, Thứ Tư',[{key:'1',text:'Thứ Tư'},{key:'2',text:'Thứ Hai'},{key:'3',text:'Thứ Sáu'},{key:'4',text:'Thứ Năm'}],['2','1','4','3'],'easy','Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu',7),
      r(id,1,'single_choice','Ngày cuối tuần (không đi học) là ngày gì?',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Sáu'},{key:'C',text:'Chủ nhật'}],'C','easy','Chủ nhật là ngày nghỉ cuối tuần',8),
      r(id,1,'fill_blank','Hôm nay là thứ Ba, thì hôm qua là thứ [b1] và ngày mai là thứ [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Hai',b2:'Tư'},'easy','Thứ Hai → Thứ Ba → Thứ Tư',9),
      r(id,1,'single_choice','Từ nào chỉ thời gian trong quá khứ?',[{key:'A',text:'Sẽ'},{key:'B',text:'Đang'},{key:'C',text:'Đã'}],'C','easy','Từ "đã" chỉ việc đã xảy ra trong quá khứ',10),
      // Ex2 medium
      r(id,2,'fill_blank','Hôm qua, em [b1] đi học vì bị ốm.',[{key:'b1',text:''}],{b1:'không'},'medium','Hôm qua là ngày đã qua, dùng với từ "đã", "không"',1),
      r(id,2,'fill_blank','Ngày [b1] tôi sẽ đi thăm bà ngoại.',[{key:'b1',text:''}],{b1:'mai'},'medium','Ngày mai chỉ sự việc sắp xảy ra',2),
      r(id,2,'single_choice','Câu nào dùng đúng từ chỉ thời gian?',[{key:'A',text:'Ngày mai, em đã đi học.'},{key:'B',text:'Hôm qua, em đã đi học.'},{key:'C',text:'Hôm nay, em sẽ đi học hôm qua.'}],'B','medium','Hôm qua + đã: chỉ việc đã xảy ra',3),
      r(id,2,'true_false','Câu "Ngày mai tôi sẽ đến thăm bạn." dùng đúng từ chỉ thời gian. Đúng hay sai?',null,true,'medium','Ngày mai + sẽ: chỉ việc sắp xảy ra là đúng',4),
      r(id,2,'matching','Nối câu với từ chỉ thời gian phù hợp:',[{key:'A',text:'_____, em đã làm bài tập.'},{key:'B',text:'_____, em đang ăn cơm.'},{key:'C',text:'_____, em sẽ đi picnic.'}],{A:'Hôm qua',B:'Hôm nay',C:'Ngày mai'},'medium',null,5),
      r(id,2,'single_choice','Thứ mấy đứng trước Chủ nhật?',[{key:'A',text:'Thứ Năm'},{key:'B',text:'Thứ Bảy'},{key:'C',text:'Thứ Sáu'}],'B','medium','Thứ Bảy đứng ngay trước Chủ nhật',6),
      r(id,2,'fill_blank','Một tuần bắt đầu từ thứ [b1] và kết thúc vào [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Hai',b2:'Chủ nhật'},'medium','Lịch Việt Nam: tuần bắt đầu từ thứ Hai',7),
      r(id,2,'single_choice','Hôm nay là thứ Sáu, hôm qua là thứ mấy?',[{key:'A',text:'Thứ Năm'},{key:'B',text:'Thứ Bảy'},{key:'C',text:'Thứ Tư'}],'A','medium','Thứ Sáu - 1 = Thứ Năm',8),
      r(id,2,'true_false','Hôm qua là thứ Tư, hôm nay là thứ Năm. Đúng hay sai?',null,true,'medium','Thứ Tư + 1 = Thứ Năm',9),
      r(id,2,'sorting','Sắp xếp các sự việc theo thứ tự thời gian đúng: Ngủ dậy, Ăn tối, Đi học, Ăn sáng',[{key:'1',text:'Ngủ dậy'},{key:'2',text:'Ăn tối'},{key:'3',text:'Đi học'},{key:'4',text:'Ăn sáng'}],['1','4','3','2'],'medium','Ngủ dậy → Ăn sáng → Đi học → Ăn tối',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu nào diễn tả việc đang xảy ra?',[{key:'A',text:'Hôm qua em học bài.'},{key:'B',text:'Em đang đọc sách.'},{key:'C',text:'Ngày mai em sẽ đi chơi.'}],'B','hard','Từ "đang" chỉ việc xảy ra ở hiện tại',1),
      r(id,3,'true_false','Từ "sẽ" dùng với sự việc ở tương lai. Đúng hay sai?',null,true,'hard','Sẽ chỉ sự việc chưa xảy ra, sắp xảy ra',2),
      r(id,3,'matching','Nối từ chỉ thời gian với thì phù hợp:',[{key:'A',text:'Đã'},{key:'B',text:'Đang'},{key:'C',text:'Sẽ'}],{A:'Quá khứ',B:'Hiện tại',C:'Tương lai'},'hard',null,3),
      r(id,3,'sorting','Sắp xếp các ngày theo đúng thứ tự trong tuần: Chủ nhật, Thứ Tư, Thứ Bảy, Thứ Hai',[{key:'1',text:'Chủ nhật'},{key:'2',text:'Thứ Tư'},{key:'3',text:'Thứ Bảy'},{key:'4',text:'Thứ Hai'}],['4','2','3','1'],'hard','Thứ Hai, Thứ Tư, Thứ Bảy, Chủ nhật',4),
      r(id,3,'fill_blank','Hôm qua em [b1] bài Tiếng Việt, hôm nay em đang [b2] bài Toán.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'học / làm',b2:'làm / học'},'hard','Hôm qua + đã/động từ; hôm nay + đang',5),
      r(id,3,'single_choice','Từ "hôm kia" chỉ ngày nào?',[{key:'A',text:'Ngày trước hôm qua'},{key:'B',text:'Hôm qua'},{key:'C',text:'Ngày mai'}],'A','hard','Hôm kia = 2 ngày trước hôm nay',6),
      r(id,3,'true_false','Nếu hôm nay là thứ Hai, thì ngày mai là thứ Ba và ngày kia là thứ Tư. Đúng hay sai?',null,true,'hard','Thứ Hai + 1 = Thứ Ba; Thứ Ba + 1 = Thứ Tư',7),
      r(id,3,'fill_blank','Một tháng có khoảng [b1] tuần.',[{key:'b1',text:''}],{b1:'4'},'hard','Một tháng có khoảng 4 tuần (28-31 ngày)',8),
      r(id,3,'single_choice','Câu "Hôm qua trời đẹp, hôm nay trời mưa." nói về điều gì?',[{key:'A',text:'Sự thay đổi thời tiết qua các ngày'},{key:'B',text:'Dự báo thời tiết ngày mai'},{key:'C',text:'Thời tiết mùa hè'}],'A','hard','So sánh thời tiết hôm qua và hôm nay',9),
      r(id,3,'matching','Nối câu với từ chỉ thời gian đúng:',[{key:'A',text:'_____ em sẽ được nghỉ học.'},{key:'B',text:'_____ em đã hoàn thành bài tập.'},{key:'C',text:'_____ em đang viết bài.'}],{A:'Ngày mai',B:'Hôm qua',C:'Hôm nay'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1148: Bài 3 - Niềm vui của Bi và Bống ─────────────────────────────────
  {
    const id = 1148;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Từ nào diễn tả cảm xúc vui vẻ?',[{key:'A',text:'Buồn'},{key:'B',text:'Vui'},{key:'C',text:'Tức giận'}],'B','easy','Vui là cảm xúc tích cực, hạnh phúc',1),
      r(id,1,'single_choice','Bạn cùng chơi với nhau gọi là gì?',[{key:'A',text:'Kẻ thù'},{key:'B',text:'Bạn bè'},{key:'C',text:'Người lạ'}],'B','easy','Bạn bè là những người chơi và học cùng nhau',2),
      r(id,1,'single_choice','Từ nào chỉ hành động chuyển động nhanh?',[{key:'A',text:'Ngồi'},{key:'B',text:'Ngủ'},{key:'C',text:'Chạy'}],'C','easy','Chạy là hành động di chuyển nhanh bằng chân',3),
      r(id,1,'true_false','Nhảy dây là một trò chơi dân gian của trẻ em. Đúng hay sai?',null,true,'easy','Nhảy dây là trò chơi truyền thống của trẻ em Việt Nam',4),
      r(id,1,'true_false','Từ "buồn" và từ "vui" có nghĩa giống nhau. Đúng hay sai?',null,false,'easy','Vui và buồn là hai cảm xúc trái ngược nhau',5),
      r(id,1,'matching','Nối cảm xúc với biểu hiện:',[{key:'A',text:'Vui'},{key:'B',text:'Buồn'},{key:'C',text:'Sợ'}],{A:'Cười, nhảy nhót',B:'Khóc, ủ rũ',C:'Run rẩy, trốn tránh'},'easy',null,6),
      r(id,1,'fill_blank','Bi và Bống cùng nhau [b1] ở sân trường.',[{key:'b1',text:''}],{b1:'chơi'},'easy','Hai bạn cùng nhau chơi là niềm vui',7),
      r(id,1,'single_choice','Từ nào chỉ hành động vui chơi?',[{key:'A',text:'Học'},{key:'B',text:'Nhảy'},{key:'C',text:'Ngủ'}],'B','easy','Nhảy là hành động vui chơi',8),
      r(id,1,'sorting','Sắp xếp theo mức độ vui từ ít đến nhiều: Hơi vui, Rất vui, Bình thường, Vui',[{key:'1',text:'Hơi vui'},{key:'2',text:'Rất vui'},{key:'3',text:'Bình thường'},{key:'4',text:'Vui'}],['3','1','4','2'],'easy','Bình thường < Hơi vui < Vui < Rất vui',9),
      r(id,1,'single_choice','Điều gì mang lại niềm vui khi chơi cùng bạn?',[{key:'A',text:'Tranh giành đồ chơi'},{key:'B',text:'Cùng nhau hợp tác và chia sẻ'},{key:'C',text:'Chơi một mình'}],'B','easy','Hợp tác và chia sẻ mang lại niềm vui cho bạn bè',10),
      // Ex2 medium
      r(id,2,'single_choice','Trong câu chuyện về Bi và Bống, hai bạn vui vì điều gì?',[{key:'A',text:'Được điểm cao'},{key:'B',text:'Cùng nhau chơi và chia sẻ'},{key:'C',text:'Mua được đồ chơi mới'}],'B','medium','Niềm vui của Bi và Bống đến từ tình bạn và sự chia sẻ',1),
      r(id,2,'single_choice','Từ "niềm vui" trong tựa bài thuộc loại từ gì?',[{key:'A',text:'Động từ'},{key:'B',text:'Danh từ'},{key:'C',text:'Tính từ'}],'B','medium','Niềm vui là danh từ chỉ cảm xúc',2),
      r(id,2,'true_false','Bạn bè tốt là người biết chia sẻ và giúp đỡ nhau. Đúng hay sai?',null,true,'medium','Bạn bè tốt luôn chia sẻ và giúp đỡ lẫn nhau',3),
      r(id,2,'fill_blank','Bi và Bống là [b1] thân thiết của nhau.',[{key:'b1',text:''}],{b1:'bạn bè'},'medium','Bi và Bống là đôi bạn thân',4),
      r(id,2,'matching','Nối hành động với cảm xúc tương ứng:',[{key:'A',text:'Được bạn giúp đỡ'},{key:'B',text:'Bị bạn bè bỏ rơi'},{key:'C',text:'Cùng chơi trò chơi vui'}],{A:'Vui và biết ơn',B:'Buồn và cô đơn',C:'Hạnh phúc và hào hứng'},'medium',null,5),
      r(id,2,'single_choice','Câu "Bi cười vui vẻ khi được bạn tặng quà." nói lên điều gì?',[{key:'A',text:'Bi thích đồ vật đắt tiền'},{key:'B',text:'Sự quan tâm của bạn bè mang lại niềm vui'},{key:'C',text:'Bi chỉ vui khi có quà'}],'B','medium','Sự quan tâm của bạn bè là nguồn vui',6),
      r(id,2,'true_false','Chơi cùng nhau không cần phải nhường nhịn. Đúng hay sai?',null,false,'medium','Chơi cùng nhau cần biết nhường nhịn để vui vẻ',7),
      r(id,2,'fill_blank','Hai bạn [b1] nhau rất thân, không bao giờ [b2] nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'quý',b2:'ghét'},'medium','Bạn bè tốt quý nhau và không ghét nhau',8),
      r(id,2,'single_choice','Từ "thân thiết" gần nghĩa với từ nào?',[{key:'A',text:'Xa lạ'},{key:'B',text:'Thân thiện'},{key:'C',text:'Ghét bỏ'}],'B','medium','Thân thiết và thân thiện đều chỉ sự gần gũi, tốt bụng',9),
      r(id,2,'sorting','Sắp xếp các câu thành đoạn văn có nghĩa: Hai bạn cùng cười vui vẻ. / Bi gặp Bống ở sân trường. / Họ rủ nhau chơi trò ô ăn quan.',[{key:'1',text:'Hai bạn cùng cười vui vẻ.'},{key:'2',text:'Bi gặp Bống ở sân trường.'},{key:'3',text:'Họ rủ nhau chơi trò ô ăn quan.'}],['2','3','1'],'medium','Gặp nhau → rủ nhau chơi → vui vẻ',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Bống nhảy lên vì vui mừng." — từ "vui mừng" là từ loại gì?',[{key:'A',text:'Danh từ'},{key:'B',text:'Động từ'},{key:'C',text:'Tính từ'}],'C','hard','Vui mừng là tính từ chỉ trạng thái cảm xúc',1),
      r(id,3,'true_false','Tình bạn chỉ có giá trị khi bạn bè có nhiều điểm chung. Đúng hay sai?',null,false,'hard','Tình bạn có giá trị ở sự quan tâm, không cần phải giống nhau hoàn toàn',2),
      r(id,3,'fill_blank','Bi cảm thấy [b1] khi Bống chia sẻ đồ ăn. Bống cũng [b2] khi thấy Bi mỉm cười.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vui / hạnh phúc',b2:'vui / hạnh phúc'},'hard','Chia sẻ mang lại hạnh phúc cho cả hai',3),
      r(id,3,'matching','Xác định cảm xúc của nhân vật trong từng tình huống:',[{key:'A',text:'Bi bị ngã, Bống đến đỡ dậy'},{key:'B',text:'Bống không được chơi cùng các bạn'},{key:'C',text:'Bi và Bống cùng thắng trò chơi'}],{A:'Bi cảm thấy ấm lòng',B:'Bống cảm thấy buồn',C:'Cả hai vui sướng'},'hard',null,4),
      r(id,3,'single_choice','Điều gì thể hiện tình bạn đẹp trong câu chuyện Bi và Bống?',[{key:'A',text:'Hai bạn luôn tranh nhau đồ chơi'},{key:'B',text:'Hai bạn chia sẻ, giúp đỡ và cùng vui chơi'},{key:'C',text:'Hai bạn chỉ chơi khi có người lớn'}],'B','hard','Chia sẻ và giúp đỡ thể hiện tình bạn đẹp',5),
      r(id,3,'sorting','Sắp xếp cảm xúc từ tiêu cực đến tích cực: Tức giận, Buồn, Bình thường, Vui, Hạnh phúc',[{key:'1',text:'Tức giận'},{key:'2',text:'Buồn'},{key:'3',text:'Bình thường'},{key:'4',text:'Vui'},{key:'5',text:'Hạnh phúc'}],['1','2','3','4','5'],'hard','Từ tiêu cực đến tích cực nhất',6),
      r(id,3,'true_false','Cách tốt nhất để giải quyết mâu thuẫn với bạn là bỏ mặc, không nói chuyện. Đúng hay sai?',null,false,'hard','Cần nói chuyện thẳng thắn và tha thứ cho nhau',7),
      r(id,3,'fill_blank','Trong tình bạn, điều quan trọng nhất là [b1] và [b2] nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tin tưởng',b2:'yêu quý / tôn trọng'},'hard','Tin tưởng và tôn trọng là nền tảng của tình bạn',8),
      r(id,3,'single_choice','Câu "Niềm vui được nhân đôi khi chia sẻ." có nghĩa gì?',[{key:'A',text:'Khi chia sẻ, niềm vui sẽ lớn hơn'},{key:'B',text:'Chia sẻ làm mất đi niềm vui'},{key:'C',text:'Chỉ vui khi một mình'}],'A','hard','Chia sẻ niềm vui với người khác làm niềm vui tăng lên',9),
      r(id,3,'matching','Nối hành động với giá trị thể hiện:',[{key:'A',text:'Giúp bạn khi bạn gặp khó khăn'},{key:'B',text:'Chia sẻ đồ ăn với bạn'},{key:'C',text:'Lắng nghe khi bạn buồn'}],{A:'Tinh thần giúp đỡ',B:'Sự hào phóng',C:'Sự đồng cảm'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1149: Bài 4 - Làm việc thật là vui ────────────────────────────────────
  {
    const id = 1149;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Việc nào là việc nhà?',[{key:'A',text:'Quét nhà'},{key:'B',text:'Chơi điện tử'},{key:'C',text:'Xem phim'}],'A','easy','Quét nhà là công việc nhà cần làm hàng ngày',1),
      r(id,1,'single_choice','Sau bữa ăn, em nên làm gì?',[{key:'A',text:'Rửa bát'},{key:'B',text:'Bỏ bát xuống sàn'},{key:'C',text:'Để bát trên bàn'}],'A','easy','Rửa bát sau bữa ăn là việc làm tốt',2),
      r(id,1,'single_choice','Việc nào giúp cây cối phát triển tốt?',[{key:'A',text:'Nhổ cây'},{key:'B',text:'Tưới cây'},{key:'C',text:'Giẫm lên cây'}],'B','easy','Tưới cây cung cấp nước cho cây sinh trưởng',3),
      r(id,1,'true_false','Gấp quần áo là việc nhà đơn giản mà em có thể tự làm. Đúng hay sai?',null,true,'easy','Gấp quần áo là việc nhà đơn giản, phù hợp với học sinh lớp 2',4),
      r(id,1,'true_false','Làm việc nhà là trách nhiệm chỉ của bố mẹ. Đúng hay sai?',null,false,'easy','Cả gia đình cùng nhau làm việc nhà',5),
      r(id,1,'matching','Nối việc làm với nơi thực hiện:',[{key:'A',text:'Rửa bát'},{key:'B',text:'Tưới cây'},{key:'C',text:'Lau nhà'}],{A:'Bếp / bồn rửa',B:'Vườn / ban công',C:'Phòng khách / sàn nhà'},'easy',null,6),
      r(id,1,'fill_blank','Em giúp mẹ [b1] nhà và [b2] cây mỗi buổi sáng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'quét',b2:'tưới'},'easy','Quét nhà và tưới cây là việc làm buổi sáng',7),
      r(id,1,'single_choice','Từ nào chỉ công việc trong nhà bếp?',[{key:'A',text:'Nấu cơm'},{key:'B',text:'Tưới cây'},{key:'C',text:'Quét sân'}],'A','easy','Nấu cơm là công việc trong bếp',8),
      r(id,1,'sorting','Sắp xếp các bước rửa bát đúng thứ tự: Tráng bát sạch, Xả nước, Cho xà phòng, Cọ bát',[{key:'1',text:'Tráng bát sạch'},{key:'2',text:'Xả nước'},{key:'3',text:'Cho xà phòng'},{key:'4',text:'Cọ bát'}],['2','3','4','1'],'easy','Xả nước → Cho xà phòng → Cọ bát → Tráng sạch',9),
      r(id,1,'single_choice','Làm việc nhà giúp ích điều gì?',[{key:'A',text:'Chỉ mất thời gian'},{key:'B',text:'Giúp gia đình ngăn nắp và em trưởng thành hơn'},{key:'C',text:'Không có ích gì'}],'B','easy','Làm việc nhà rèn luyện tính tự lập và giúp gia đình',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu "Mỗi chiều em quét sân." cho biết em làm gì?',[{key:'A',text:'Quét nhà'},{key:'B',text:'Quét sân'},{key:'C',text:'Quét lá'}],'B','medium','Em quét sân mỗi buổi chiều',1),
      r(id,2,'matching','Nối việc làm với phòng phù hợp:',[{key:'A',text:'Lau bàn ăn'},{key:'B',text:'Dọn đồ chơi'},{key:'C',text:'Nhặt rau'}],{A:'Phòng ăn',B:'Phòng trẻ em',C:'Bếp'},'medium',null,2),
      r(id,2,'true_false','Khi làm việc nhà cùng nhau, gia đình sẽ gắn bó hơn. Đúng hay sai?',null,true,'medium','Cùng làm việc tạo sự gắn kết trong gia đình',3),
      r(id,2,'fill_blank','Làm việc cùng nhau gọi là làm việc theo [b1].',[{key:'b1',text:''}],{b1:'nhóm / đội'},'medium','Làm việc nhóm là cùng nhau hợp tác',4),
      r(id,2,'single_choice','Từ nào chỉ hành động giúp đỡ gia đình?',[{key:'A',text:'Tranh giành'},{key:'B',text:'Phụ giúp'},{key:'C',text:'Làm phiền'}],'B','medium','Phụ giúp là tham gia làm cùng người lớn',5),
      r(id,2,'sorting','Sắp xếp các bước gấp quần áo: Đặt lên bề mặt phẳng, Gấp đôi lại, Xếp vào tủ, Gấp thêm lần nữa',[{key:'1',text:'Đặt lên bề mặt phẳng'},{key:'2',text:'Gấp đôi lại'},{key:'3',text:'Xếp vào tủ'},{key:'4',text:'Gấp thêm lần nữa'}],['1','2','4','3'],'medium','Đặt → Gấp đôi → Gấp thêm → Xếp vào tủ',6),
      r(id,2,'true_false','Em không nên làm việc nhà vì còn nhỏ. Đúng hay sai?',null,false,'medium','Em nên làm những việc vừa sức để rèn tính tự lập',7),
      r(id,2,'fill_blank','Khi làm việc, em cảm thấy [b1] vì đã [b2] được gia đình.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vui / tự hào',b2:'giúp ích / phụ giúp'},'medium','Làm việc giúp ích mang lại niềm vui',8),
      r(id,2,'single_choice','Câu tục ngữ "Chớ thấy sóng cả mà ngã tay chèo" khuyên điều gì?',[{key:'A',text:'Không nên làm việc khó'},{key:'B',text:'Kiên trì, không bỏ cuộc khi gặp khó khăn'},{key:'C',text:'Hãy để người khác làm'}],'B','medium','Câu tục ngữ khuyên kiên trì trong công việc',9),
      r(id,2,'matching','Nối câu với việc cần làm khi nào:',[{key:'A',text:'Quét nhà'},{key:'B',text:'Rửa bát'},{key:'C',text:'Tưới cây'}],{A:'Mỗi ngày',B:'Sau bữa ăn',C:'Mỗi sáng / chiều'},'medium',null,10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Làm việc thật là vui!" thuộc kiểu câu nào?',[{key:'A',text:'Câu kể'},{key:'B',text:'Câu hỏi'},{key:'C',text:'Câu cảm thán'}],'C','hard','Câu cảm thán diễn đạt cảm xúc mạnh, kết thúc bằng dấu chấm than',1),
      r(id,3,'true_false','Từ "phụ giúp" đồng nghĩa với từ "hỗ trợ". Đúng hay sai?',null,true,'hard','Phụ giúp và hỗ trợ đều có nghĩa là giúp đỡ',2),
      r(id,3,'fill_blank','Em [b1] làm việc nhà vì đó là [b2] của em trong gia đình.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nên / phải',b2:'trách nhiệm'},'hard','Làm việc nhà là trách nhiệm của mỗi thành viên',3),
      r(id,3,'sorting','Sắp xếp theo mức độ khó của công việc nhà từ dễ đến khó: Nấu ăn, Quét nhà, Gấp quần áo, Lau cửa kính',[{key:'1',text:'Nấu ăn'},{key:'2',text:'Quét nhà'},{key:'3',text:'Gấp quần áo'},{key:'4',text:'Lau cửa kính'}],['3','2','4','1'],'hard','Gấp quần áo < Quét nhà < Lau cửa kính < Nấu ăn',4),
      r(id,3,'matching','Nối việc làm với kỹ năng cần có:',[{key:'A',text:'Rửa bát'},{key:'B',text:'Tưới cây'},{key:'C',text:'Quét nhà'}],{A:'Khéo léo, cẩn thận',B:'Kiên nhẫn, nhẹ nhàng',C:'Siêng năng, chịu khó'},'hard',null,5),
      r(id,3,'single_choice','Vì sao làm việc nhà lại vui?',[{key:'A',text:'Vì được khen thưởng'},{key:'B',text:'Vì giúp ích cho gia đình và học được kỹ năng mới'},{key:'C',text:'Vì không phải học bài'}],'B','hard','Làm việc nhà mang lại cảm giác có ích và học hỏi',6),
      r(id,3,'true_false','Làm việc nhà từ nhỏ giúp em trở nên tự lập hơn khi lớn. Đúng hay sai?',null,true,'hard','Thói quen làm việc nhà rèn luyện tính tự lập',7),
      r(id,3,'fill_blank','Gia đình em [b1] nhau làm việc nhà, vì vậy nhà cửa luôn [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cùng / hỗ trợ',b2:'sạch sẽ / gọn gàng'},'hard','Cùng nhau làm việc giúp nhà cửa sạch sẽ',8),
      r(id,3,'single_choice','Câu "Siêng làm thì có, siêng học thì hay." dạy điều gì?',[{key:'A',text:'Chăm chỉ sẽ đạt được kết quả tốt'},{key:'B',text:'Chỉ cần làm việc không cần học'},{key:'C',text:'Làm việc và học bài là hai việc riêng biệt'}],'A','hard','Siêng năng làm việc và học hành sẽ đạt kết quả',9),
      r(id,3,'matching','Nối từ với nghĩa trái nghĩa:',[{key:'A',text:'Siêng năng'},{key:'B',text:'Sạch sẽ'},{key:'C',text:'Gọn gàng'}],{A:'Lười biếng',B:'Bẩn thỉu',C:'Lộn xộn'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1150: Bài 5 - Em có xinh không? ───────────────────────────────────────
  {
    const id = 1150;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Từ nào chỉ vẻ đẹp bên ngoài?',[{key:'A',text:'Tốt bụng'},{key:'B',text:'Xinh đẹp'},{key:'C',text:'Thông minh'}],'B','easy','Xinh đẹp chỉ vẻ đẹp về ngoại hình',1),
      r(id,1,'single_choice','Từ nào là từ trái nghĩa với "cao"?',[{key:'A',text:'Lớn'},{key:'B',text:'Thấp'},{key:'C',text:'Mập'}],'B','easy','Cao và thấp là hai từ trái nghĩa',2),
      r(id,1,'single_choice','Từ nào trái nghĩa với "gầy"?',[{key:'A',text:'Nhỏ'},{key:'B',text:'Béo'},{key:'C',text:'Thấp'}],'B','easy','Gầy và béo là hai từ trái nghĩa',3),
      r(id,1,'true_false','Vẻ đẹp bên trong quan trọng hơn vẻ đẹp bên ngoài. Đúng hay sai?',null,true,'easy','Tính cách tốt quan trọng hơn ngoại hình',4),
      r(id,1,'true_false','Từ "đẹp" và từ "xấu" là hai từ đồng nghĩa. Đúng hay sai?',null,false,'easy','Đẹp và xấu là hai từ trái nghĩa',5),
      r(id,1,'matching','Nối tính từ với từ trái nghĩa:',[{key:'A',text:'Xinh'},{key:'B',text:'Cao'},{key:'C',text:'Béo'}],{A:'Xấu',B:'Thấp',C:'Gầy'},'easy',null,6),
      r(id,1,'fill_blank','Bạn Nam rất [b1] vì hay giúp đỡ mọi người.',[{key:'b1',text:''}],{b1:'tốt bụng / đáng yêu'},'easy','Giúp đỡ mọi người thể hiện tính tốt bụng',7),
      r(id,1,'single_choice','Từ nào chỉ đặc điểm ngoại hình?',[{key:'A',text:'Nhân hậu'},{key:'B',text:'Dũng cảm'},{key:'C',text:'Tóc dài'}],'C','easy','Tóc dài là đặc điểm ngoại hình',8),
      r(id,1,'sorting','Sắp xếp các từ chỉ vẻ đẹp từ bên ngoài đến bên trong: Tốt bụng, Mặt xinh, Nhân hậu, Da trắng',[{key:'1',text:'Tốt bụng'},{key:'2',text:'Mặt xinh'},{key:'3',text:'Nhân hậu'},{key:'4',text:'Da trắng'}],['2','4','1','3'],'easy','Bên ngoài: Mặt xinh, Da trắng; Bên trong: Tốt bụng, Nhân hậu',9),
      r(id,1,'single_choice','Người như thế nào mới thực sự đẹp?',[{key:'A',text:'Có ngoại hình đẹp'},{key:'B',text:'Có tâm hồn đẹp và tính cách tốt'},{key:'C',text:'Mặc quần áo đẹp'}],'B','easy','Vẻ đẹp thực sự đến từ tâm hồn và tính cách',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu "Em có xinh không?" là kiểu câu gì?',[{key:'A',text:'Câu kể'},{key:'B',text:'Câu hỏi'},{key:'C',text:'Câu cảm thán'}],'B','medium','Câu hỏi có từ "không" ở cuối và dấu chấm hỏi',1),
      r(id,2,'true_false','Đánh giá người khác chỉ dựa vào ngoại hình là không đúng. Đúng hay sai?',null,true,'medium','Nên đánh giá người dựa vào tính cách và hành động',2),
      r(id,2,'fill_blank','Bên ngoài đẹp gọi là vẻ đẹp [b1], bên trong đẹp gọi là vẻ đẹp [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngoại hình / hình thức',b2:'tâm hồn / nội tâm'},'medium','Phân biệt vẻ đẹp bên ngoài và bên trong',3),
      r(id,2,'matching','Nối đặc điểm với loại vẻ đẹp:',[{key:'A',text:'Mái tóc đen óng'},{key:'B',text:'Lòng tốt bụng'},{key:'C',text:'Đôi mắt to'},{key:'D',text:'Sự trung thực'}],{A:'Vẻ đẹp hình thức',B:'Vẻ đẹp tâm hồn',C:'Vẻ đẹp hình thức',D:'Vẻ đẹp tâm hồn'},'medium',null,4),
      r(id,2,'single_choice','Từ "tự ti" có nghĩa là gì?',[{key:'A',text:'Tự hào về bản thân'},{key:'B',text:'Không tin vào khả năng của mình'},{key:'C',text:'Yêu bản thân'}],'B','medium','Tự ti là không tin tưởng vào giá trị của bản thân',5),
      r(id,2,'true_false','Mỗi người đều có vẻ đẹp riêng của mình. Đúng hay sai?',null,true,'medium','Mỗi người có nét đẹp riêng không giống ai',6),
      r(id,2,'fill_blank','Em nên [b1] bản thân và [b2] những điểm tốt của người khác.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu quý / chấp nhận',b2:'học hỏi / trân trọng'},'medium','Yêu bản thân và học hỏi từ người khác',7),
      r(id,2,'single_choice','Câu "Bạn Lan học giỏi và rất tốt bụng." nói về điều gì của bạn Lan?',[{key:'A',text:'Vẻ đẹp hình thức'},{key:'B',text:'Vẻ đẹp tâm hồn và trí tuệ'},{key:'C',text:'Sở thích của Lan'}],'B','medium','Học giỏi và tốt bụng là vẻ đẹp tâm hồn và trí tuệ',8),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn: Ai cũng có điểm đẹp riêng. / Có người đẹp vì tâm hồn. / Có người đẹp vì ngoại hình.',[{key:'1',text:'Ai cũng có điểm đẹp riêng.'},{key:'2',text:'Có người đẹp vì tâm hồn.'},{key:'3',text:'Có người đẹp vì ngoại hình.'}],['1','3','2'],'medium','Mở đầu → vẻ đẹp hình thức → vẻ đẹp tâm hồn',9),
      r(id,2,'single_choice','Từ "tự tin" nghĩa là gì?',[{key:'A',text:'Tin vào người khác'},{key:'B',text:'Tin vào bản thân mình'},{key:'C',text:'Không cần ai giúp'}],'B','medium','Tự tin là tin tưởng vào khả năng của bản thân',10),
      // Ex3 hard
      r(id,3,'single_choice','Từ "ngoại hình" và "nội tâm" có quan hệ gì?',[{key:'A',text:'Đồng nghĩa'},{key:'B',text:'Trái nghĩa'},{key:'C',text:'Không liên quan'}],'B','hard','Ngoại hình (bên ngoài) và nội tâm (bên trong) là hai mặt đối lập',1),
      r(id,3,'true_false','Câu "Em không xinh nhưng em tốt bụng." là câu ghép. Đúng hay sai?',null,true,'hard','Câu ghép có hai vế nối bằng từ "nhưng"',2),
      r(id,3,'fill_blank','Câu "Em có xinh không?" hỏi về [b1] của em. Câu "Em có tốt bụng không?" hỏi về [b2] của em.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngoại hình',b2:'tính cách / tâm hồn'},'hard','Phân biệt câu hỏi về ngoại hình và tính cách',3),
      r(id,3,'matching','Nối tính từ với loại đặc điểm:',[{key:'A',text:'Nhân ái'},{key:'B',text:'Mập mạp'},{key:'C',text:'Dũng cảm'},{key:'D',text:'Tóc xoăn'}],{A:'Tính cách',B:'Ngoại hình',C:'Tính cách',D:'Ngoại hình'},'hard',null,4),
      r(id,3,'single_choice','Tại sao tác giả đặt tên bài là "Em có xinh không?" chứ không phải "Em có tốt không?"?',[{key:'A',text:'Vì ngoại hình quan trọng hơn tính cách'},{key:'B',text:'Để đặt câu hỏi gợi suy nghĩ về vẻ đẹp thực sự'},{key:'C',text:'Vì bài chỉ nói về ngoại hình'}],'B','hard','Tên bài đặt câu hỏi để người đọc suy ngẫm về vẻ đẹp',5),
      r(id,3,'sorting','Sắp xếp từ quan trọng hơn đến ít quan trọng hơn trong đánh giá một người: Ngoại hình, Tính cách, Tài năng, Lòng tốt',[{key:'1',text:'Ngoại hình'},{key:'2',text:'Tính cách'},{key:'3',text:'Tài năng'},{key:'4',text:'Lòng tốt'}],['4','2','3','1'],'hard','Lòng tốt > Tính cách > Tài năng > Ngoại hình',6),
      r(id,3,'true_false','Sự tự tin làm cho người ta trở nên đẹp hơn. Đúng hay sai?',null,true,'hard','Người tự tin thường tỏa ra vẻ đẹp cuốn hút',7),
      r(id,3,'fill_blank','Em [b1] bản thân mình vì em biết mình có [b2] riêng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu / tự hào về',b2:'vẻ đẹp / giá trị'},'hard','Yêu bản thân và nhận ra giá trị của mình',8),
      r(id,3,'single_choice','Câu tục ngữ "Tốt gỗ hơn tốt nước sơn" có nghĩa gì?',[{key:'A',text:'Đồ gỗ tốt hơn đồ sơn'},{key:'B',text:'Chất lượng bên trong quan trọng hơn vẻ ngoài'},{key:'C',text:'Nên mua đồ gỗ thay vì đồ nhựa'}],'B','hard','Gỗ chỉ phẩm chất bên trong; nước sơn chỉ vẻ ngoài',9),
      r(id,3,'matching','Nối câu với giá trị thể hiện:',[{key:'A',text:'"Em tự tin vào bản thân mình."'},{key:'B',text:'"Em luôn giúp đỡ bạn bè."'},{key:'C',text:'"Em không chê bai ngoại hình người khác."'}],{A:'Sự tự tin',B:'Lòng tốt bụng',C:'Sự tôn trọng'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1151: Bài 6 - Một giờ học ─────────────────────────────────────────────
  {
    const id = 1151;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Khi thầy/cô hỏi bài, em cần làm gì?',[{key:'A',text:'Giơ tay xin phát biểu'},{key:'B',text:'Tự nói luôn'},{key:'C',text:'Im lặng'}],'A','easy','Giơ tay xin phát biểu là quy tắc lớp học',1),
      r(id,1,'single_choice','Hoạt động nào thường diễn ra trong giờ học Tiếng Việt?',[{key:'A',text:'Đá bóng'},{key:'B',text:'Đọc bài'},{key:'C',text:'Vẽ tranh'}],'B','easy','Đọc bài là hoạt động chính trong giờ Tiếng Việt',2),
      r(id,1,'single_choice','Khi giáo viên đang giảng bài, học sinh nên làm gì?',[{key:'A',text:'Nói chuyện riêng'},{key:'B',text:'Chú ý lắng nghe'},{key:'C',text:'Vẽ vào vở'}],'B','easy','Chú ý lắng nghe thầy cô giảng bài',3),
      r(id,1,'true_false','Viết bài là hoạt động trong giờ học. Đúng hay sai?',null,true,'easy','Viết bài là một trong các hoạt động học tập',4),
      r(id,1,'true_false','Trong giờ học, em có thể đứng dậy tự do bất cứ lúc nào. Đúng hay sai?',null,false,'easy','Phải xin phép thầy cô trước khi đứng dậy',5),
      r(id,1,'matching','Nối hoạt động với thời điểm trong giờ học:',[{key:'A',text:'Đọc bài'},{key:'B',text:'Làm bài tập'},{key:'C',text:'Giơ tay phát biểu'}],{A:'Khi cô gọi đọc',B:'Khi cô giao bài',C:'Khi biết câu trả lời'},'easy',null,6),
      r(id,1,'fill_blank','Trong giờ học, em [b1] tay khi muốn [b2] ý kiến.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'giơ',b2:'phát biểu / nêu'},'easy','Giơ tay trước khi phát biểu',7),
      r(id,1,'single_choice','Khi không hiểu bài, em nên làm gì?',[{key:'A',text:'Bỏ qua'},{key:'B',text:'Hỏi thầy cô hoặc bạn bè'},{key:'C',text:'Chép bài của bạn'}],'B','easy','Hỏi thầy cô khi không hiểu bài',8),
      r(id,1,'sorting','Sắp xếp các hoạt động theo thứ tự thường gặp trong một tiết học: Làm bài tập, Chào thầy cô vào lớp, Nghe giảng bài, Kiểm tra bài cũ',[{key:'1',text:'Làm bài tập'},{key:'2',text:'Chào thầy cô vào lớp'},{key:'3',text:'Nghe giảng bài'},{key:'4',text:'Kiểm tra bài cũ'}],['2','4','3','1'],'easy','Vào lớp → Kiểm tra → Nghe giảng → Làm bài',9),
      r(id,1,'single_choice','Giờ học bắt đầu bằng tín hiệu gì?',[{key:'A',text:'Tiếng trống / tiếng chuông'},{key:'B',text:'Tiếng còi'},{key:'C',text:'Thầy cô vỗ tay'}],'A','easy','Tiếng trống/chuông báo hiệu bắt đầu giờ học',10),
      // Ex2 medium
      r(id,2,'sorting','Sắp xếp đúng thứ tự một tiết học: Học sinh làm bài, Thầy cô nhận xét, Thầy cô giảng bài mới, Kiểm tra bài cũ',[{key:'1',text:'Học sinh làm bài'},{key:'2',text:'Thầy cô nhận xét'},{key:'3',text:'Thầy cô giảng bài mới'},{key:'4',text:'Kiểm tra bài cũ'}],['4','3','1','2'],'medium','Kiểm tra → Giảng mới → Làm bài → Nhận xét',1),
      r(id,2,'single_choice','Câu nào là câu hỏi trong lớp học?',[{key:'A',text:'Em đã làm bài xong.'},{key:'B',text:'Thưa cô, em chưa hiểu phần này ạ?'},{key:'C',text:'Cô giáo giảng bài rất hay.'}],'B','medium','Câu hỏi dùng để hỏi và xin giải thích',2),
      r(id,2,'true_false','Giờ học hiệu quả khi học sinh chú ý và tích cực tham gia. Đúng hay sai?',null,true,'medium','Sự chú ý và tham gia tích cực giúp học tốt hơn',3),
      r(id,2,'fill_blank','Thầy cô [b1] câu hỏi, học sinh [b2] tay để trả lời.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đặt / hỏi',b2:'giơ'},'medium','Thầy hỏi, học sinh giơ tay trả lời',4),
      r(id,2,'matching','Nối lời nói với người nói trong lớp học:',[{key:'A',text:'"Các em mở sách trang 15."'},{key:'B',text:'"Thưa cô, em xin phép ra ngoài."'},{key:'C',text:'"Bạn ơi, cho tớ mượn bút nhé."'}],{A:'Giáo viên',B:'Học sinh (nói với giáo viên)',C:'Học sinh (nói với bạn)'},'medium',null,5),
      r(id,2,'single_choice','Trong giờ học, câu "Thưa cô!" dùng để làm gì?',[{key:'A',text:'Chào hỏi'},{key:'B',text:'Xin phép phát biểu hoặc ra ngoài'},{key:'C',text:'Kết thúc bài'}],'B','medium','Thưa cô dùng trước khi xin phép hoặc phát biểu',6),
      r(id,2,'true_false','Học sinh nên giúp đỡ bạn trong giờ kiểm tra. Đúng hay sai?',null,false,'medium','Trong giờ kiểm tra, mỗi người tự làm bài của mình',7),
      r(id,2,'fill_blank','Một tiết học thường kéo dài [b1] phút.',[{key:'b1',text:''}],{b1:'35 / 40'},'medium','Tiết học ở tiểu học thường 35-40 phút',8),
      r(id,2,'single_choice','Từ "chăm chú" nghĩa là gì trong câu "Em chăm chú nghe giảng."?',[{key:'A',text:'Nghe một lúc rồi thôi'},{key:'B',text:'Tập trung chú ý hoàn toàn'},{key:'C',text:'Nghe nhưng không hiểu'}],'B','medium','Chăm chú nghĩa là tập trung chú ý hoàn toàn',9),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn về giờ học: Cô giảng bài rất hay. / Bạn nào cũng chăm chú lắng nghe. / Một giờ học trôi qua thật nhanh.',[{key:'1',text:'Cô giảng bài rất hay.'},{key:'2',text:'Bạn nào cũng chăm chú lắng nghe.'},{key:'3',text:'Một giờ học trôi qua thật nhanh.'}],['1','2','3'],'medium','Cô giảng → học sinh nghe → kết thúc',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Thưa cô, em xin phép phát biểu ạ!" thuộc kiểu câu gì?',[{key:'A',text:'Câu kể'},{key:'B',text:'Câu hỏi'},{key:'C',text:'Câu xin phép'}],'C','hard','Câu xin phép dùng để xin phép làm việc gì đó',1),
      r(id,3,'true_false','Câu "Bạn hiểu bài chưa?" và câu "Em chưa hiểu bài." diễn đạt cùng một ý. Đúng hay sai?',null,false,'hard','Câu đầu là câu hỏi; câu sau là câu kể về việc chưa hiểu',2),
      r(id,3,'fill_blank','Trong giờ học, em cần [b1] nghe giảng và [b2] bài đầy đủ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'chăm chú / tập trung',b2:'ghi / chép'},'hard','Tập trung nghe và ghi bài đầy đủ',3),
      r(id,3,'matching','Nối câu hỏi trong lớp học với mục đích:',[{key:'A',text:'"Bài này cô giảng lại được không ạ?"'},{key:'B',text:'"Bài tập về nhà là gì ạ?"'},{key:'C',text:'"Thưa cô, em xin phép ra ngoài ạ?"'}],{A:'Xin giải thích lại',B:'Hỏi bài về nhà',C:'Xin phép ra ngoài'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp các việc học sinh nên làm trong giờ học theo thứ tự quan trọng: Ghi bài, Chú ý nghe, Phát biểu, Hỏi khi chưa hiểu',[{key:'1',text:'Ghi bài'},{key:'2',text:'Chú ý nghe'},{key:'3',text:'Phát biểu'},{key:'4',text:'Hỏi khi chưa hiểu'}],['2','1','3','4'],'hard','Nghe trước → Ghi bài → Phát biểu → Hỏi thêm',5),
      r(id,3,'single_choice','Câu "Học sinh nào cũng chăm chú trong giờ học." dùng từ "nào cũng" để diễn tả điều gì?',[{key:'A',text:'Chỉ một số học sinh'},{key:'B',text:'Tất cả học sinh không ngoại lệ'},{key:'C',text:'Không có học sinh nào'}],'B','hard','"Nào cũng" chỉ tất cả mọi người không trừ ai',6),
      r(id,3,'true_false','Câu "Một giờ học thật bổ ích!" là câu cảm thán. Đúng hay sai?',null,true,'hard','Câu cảm thán bày tỏ cảm xúc và kết thúc bằng dấu chấm than',7),
      r(id,3,'fill_blank','Học sinh [b1] tay khi biết câu trả lời. Thầy cô [b2] học sinh để trả lời.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'giơ',b2:'gọi / mời'},'hard','Giơ tay và được gọi mới trả lời',8),
      r(id,3,'single_choice','Vì sao học sinh cần ngồi đúng tư thế trong giờ học?',[{key:'A',text:'Để trông đẹp hơn'},{key:'B',text:'Để bảo vệ sức khỏe cột sống và tập trung tốt hơn'},{key:'C',text:'Vì thầy cô yêu cầu'}],'B','hard','Ngồi đúng tư thế bảo vệ sức khỏe và giúp tập trung',9),
      r(id,3,'matching','Nối quy tắc với lý do:',[{key:'A',text:'Giơ tay trước khi phát biểu'},{key:'B',text:'Không nói chuyện riêng'},{key:'C',text:'Chú ý nghe giảng'}],{A:'Để tôn trọng thứ tự phát biểu',B:'Để không làm phiền bạn khác',C:'Để hiểu bài và học tốt'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1152: Bài 7 - Cây xấu hổ ──────────────────────────────────────────────
  {
    const id = 1152;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Cây xấu hổ còn có tên gọi khác là gì?',[{key:'A',text:'Cây hoa hồng'},{key:'B',text:'Cây trinh nữ / cây mắc cỡ'},{key:'C',text:'Cây xương rồng'}],'B','easy','Cây xấu hổ còn gọi là cây trinh nữ hoặc cây mắc cỡ',1),
      r(id,1,'single_choice','Khi bị chạm vào, lá cây xấu hổ làm gì?',[{key:'A',text:'Nở to ra'},{key:'B',text:'Co lại và cụp xuống'},{key:'C',text:'Rụng xuống đất'}],'B','easy','Lá cây xấu hổ tự động co lại khi bị chạm',2),
      r(id,1,'single_choice','Từ "xấu hổ" trong tên cây có nghĩa gì?',[{key:'A',text:'Cây trông xấu'},{key:'B',text:'Cây co lại như đang xấu hổ khi bị chạm'},{key:'C',text:'Cây có hoa màu đỏ'}],'B','easy','Cây được gọi là xấu hổ vì lá co lại như người đang xấu hổ',3),
      r(id,1,'true_false','Cây xấu hổ là một loài thực vật có thể chuyển động. Đúng hay sai?',null,true,'easy','Cây xấu hổ có thể cụp lá khi bị kích thích',4),
      r(id,1,'true_false','Tất cả các loài cây đều co lại khi bị chạm. Đúng hay sai?',null,false,'easy','Chỉ cây xấu hổ và một số loài đặc biệt mới có phản ứng này',5),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Lá'},{key:'B',text:'Thân'},{key:'C',text:'Rễ'}],{A:'Phần xanh trên cành',B:'Phần chính của cây',C:'Phần dưới đất hút nước'},'easy',null,6),
      r(id,1,'fill_blank','Khi em [b1] tay vào lá cây xấu hổ, lá sẽ [b2] lại.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'chạm',b2:'co / cụp'},'easy','Chạm vào → lá co lại',7),
      r(id,1,'single_choice','Cây xấu hổ thường mọc ở đâu?',[{key:'A',text:'Dưới nước'},{key:'B',text:'Bãi cỏ, ven đường'},{key:'C',text:'Trên núi cao'}],'B','easy','Cây xấu hổ thường mọc hoang ở bãi cỏ, ven đường',8),
      r(id,1,'sorting','Sắp xếp các bộ phận của cây từ dưới lên trên: Hoa, Lá, Thân, Rễ',[{key:'1',text:'Hoa'},{key:'2',text:'Lá'},{key:'3',text:'Thân'},{key:'4',text:'Rễ'}],['4','3','2','1'],'easy','Rễ → Thân → Lá → Hoa',9),
      r(id,1,'single_choice','Từ "co lại" trong câu "Lá cây co lại khi bị chạm" là từ loại gì?',[{key:'A',text:'Danh từ'},{key:'B',text:'Tính từ'},{key:'C',text:'Động từ'}],'C','easy','Co lại là động từ chỉ hành động',10),
      // Ex2 medium
      r(id,2,'single_choice','Tại sao cây xấu hổ co lá lại khi bị chạm?',[{key:'A',text:'Vì cây đang ngủ'},{key:'B',text:'Đây là phản ứng tự vệ của cây'},{key:'C',text:'Vì cây không thích bị chạm'}],'B','medium','Cây xấu hổ co lá để tự vệ, tránh bị ăn hoặc bị hại',1),
      r(id,2,'single_choice','Câu "Lá cây xấu hổ khẽ run rẩy rồi cụp xuống." sử dụng biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp từ'}],'B','medium','Nhân hóa: dùng hành động của người (run rẩy) để tả cây',2),
      r(id,2,'true_false','Cây xấu hổ sau khi co lại sẽ không bao giờ mở ra nữa. Đúng hay sai?',null,false,'medium','Sau một thời gian, lá cây xấu hổ sẽ mở ra lại',3),
      r(id,2,'fill_blank','Cây xấu hổ [b1] lá như thể đang cảm thấy [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cụp / co',b2:'xấu hổ / ngượng ngùng'},'medium','Hành động của cây giống như người xấu hổ',4),
      r(id,2,'matching','Nối từ với hành động tương ứng của cây xấu hổ:',[{key:'A',text:'Bình thường'},{key:'B',text:'Khi bị chạm nhẹ'},{key:'C',text:'Sau vài phút'}],{A:'Lá xòe ra bình thường',B:'Lá co lại nhanh chóng',C:'Lá từ từ mở ra'},'medium',null,5),
      r(id,2,'single_choice','Từ "khẽ" trong câu "Em khẽ chạm tay vào lá cây" có nghĩa là gì?',[{key:'A',text:'Chạm mạnh'},{key:'B',text:'Chạm rất nhẹ nhàng'},{key:'C',text:'Không chạm'}],'B','medium','Khẽ nghĩa là nhẹ nhàng, không mạnh',6),
      r(id,2,'true_false','Cây xấu hổ có thể cảm nhận được sự tiếp xúc. Đúng hay sai?',null,true,'medium','Cây xấu hổ có thụ thể cảm nhận sự tiếp xúc và phản ứng',7),
      r(id,2,'fill_blank','Lá cây xấu hổ có màu [b1] và xếp thành các [b2] nhỏ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xanh',b2:'cặp / đôi / hàng'},'medium','Lá cây xấu hổ màu xanh, xếp thành cặp',8),
      r(id,2,'single_choice','Câu "Cây xấu hổ như một cô bé nhút nhát." sử dụng biện pháp gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp từ'}],'B','medium','So sánh: cây như cô bé nhút nhát',9),
      r(id,2,'sorting','Sắp xếp quá trình cây xấu hổ phản ứng: Lá dần mở ra, Bị chạm vào, Lá co nhanh lại, Không bị chạm nữa',[{key:'1',text:'Lá dần mở ra'},{key:'2',text:'Bị chạm vào'},{key:'3',text:'Lá co nhanh lại'},{key:'4',text:'Không bị chạm nữa'}],['2','3','4','1'],'medium','Bị chạm → Co lại → Không chạm → Mở ra',10),
      // Ex3 hard
      r(id,3,'single_choice','Biện pháp nhân hóa trong câu "Cây xấu hổ cúi đầu ngượng ngùng." là gì?',[{key:'A',text:'Cây được gán hành động và cảm xúc của người'},{key:'B',text:'Cây được so sánh với người'},{key:'C',text:'Cây được mô tả màu sắc'}],'A','hard','Nhân hóa là dùng đặc điểm, hành động người để tả vật',1),
      r(id,3,'true_false','Từ "nhút nhát" và "rụt rè" là hai từ đồng nghĩa. Đúng hay sai?',null,true,'hard','Nhút nhát và rụt rè đều có nghĩa là sợ sệt, không dám làm',2),
      r(id,3,'fill_blank','Cây xấu hổ là ví dụ về [b1] trong tự nhiên. Khi bị [b2], nó phản ứng bằng cách co lại.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sự thích nghi / phản xạ',b2:'chạm / kích thích'},'hard','Phản xạ tự nhiên của cây xấu hổ',3),
      r(id,3,'matching','Xác định biện pháp tu từ trong mỗi câu:',[{key:'A',text:'"Lá cây run rẩy như người sợ hãi."'},{key:'B',text:'"Cây xấu hổ e thẹn cúi đầu."'},{key:'C',text:'"Lá, lá, lá cụp xuống liền."'}],{A:'So sánh',B:'Nhân hóa',C:'Điệp từ'},'hard',null,4),
      r(id,3,'single_choice','Tại sao tác giả lại chọn cây xấu hổ để viết bài văn?',[{key:'A',text:'Vì cây xấu hổ rất đẹp'},{key:'B',text:'Vì cây có phản ứng đặc biệt, gợi sự tò mò và liên tưởng'},{key:'C',text:'Vì cây xấu hổ rất phổ biến'}],'B','hard','Cây xấu hổ có phản ứng độc đáo khiến người đọc tò mò',5),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn mô tả cây xấu hổ: Lá của nó sẽ từ từ mở ra. / Khi bị chạm vào, lá cụp xuống ngay. / Cây xấu hổ có lá xanh nhỏ.',[{key:'1',text:'Lá của nó sẽ từ từ mở ra.'},{key:'2',text:'Khi bị chạm vào, lá cụp xuống ngay.'},{key:'3',text:'Cây xấu hổ có lá xanh nhỏ.'}],['3','2','1'],'hard','Giới thiệu → phản ứng → sau đó',6),
      r(id,3,'true_false','Câu "Lá cây xấu hổ xấu hổ." là câu có lỗi lặp từ. Đúng hay sai?',null,true,'hard','Lặp từ "xấu hổ" là lỗi về dùng từ',7),
      r(id,3,'fill_blank','Trong thiên nhiên, [b1] giúp động vật và thực vật tồn tại. Cây xấu hổ [b2] lá là cách tự vệ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'phản xạ / bản năng',b2:'co / cụp'},'hard','Phản xạ tự vệ trong tự nhiên',8),
      r(id,3,'single_choice','Từ "e thẹn" gần nghĩa với từ nào?',[{key:'A',text:'Dũng cảm'},{key:'B',text:'Ngượng ngùng'},{key:'C',text:'Hào hứng'}],'B','hard','E thẹn và ngượng ngùng đều chỉ sự xấu hổ, ngại ngùng',9),
      r(id,3,'matching','Nối từ ngữ chỉ cây xấu hổ với từ ngữ chỉ người tương đương (nhân hóa):',[{key:'A',text:'Lá cụp xuống'},{key:'B',text:'Cây rùng mình'},{key:'C',text:'Lá xòe ra'}],{A:'Cúi đầu xuống',B:'Người run lên',C:'Mở mắt ra'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1153: Bài 8 - Cầu thủ dự bị ───────────────────────────────────────────
  {
    const id = 1153;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Môn thể thao nào có cầu thủ dự bị?',[{key:'A',text:'Bơi lội'},{key:'B',text:'Bóng đá'},{key:'C',text:'Cầu lông'}],'B','easy','Bóng đá có cầu thủ chính và cầu thủ dự bị',1),
      r(id,1,'single_choice','Cầu thủ dự bị là người như thế nào?',[{key:'A',text:'Người không biết đá bóng'},{key:'B',text:'Người ngồi chờ, sẵn sàng vào thay khi cần'},{key:'C',text:'Người làm trọng tài'}],'B','easy','Cầu thủ dự bị ngồi chờ để vào thay thế khi cần',2),
      r(id,1,'single_choice','Sân bóng đá gọi là gì?',[{key:'A',text:'Sân khấu'},{key:'B',text:'Sân vận động'},{key:'C',text:'Bãi cỏ'}],'B','easy','Sân vận động là nơi thi đấu bóng đá',3),
      r(id,1,'true_false','Ghi bàn thắng là mục tiêu của mỗi cầu thủ trong trận đấu. Đúng hay sai?',null,true,'easy','Ghi bàn giúp đội giành chiến thắng',4),
      r(id,1,'true_false','Cầu thủ dự bị không quan trọng trong đội bóng. Đúng hay sai?',null,false,'easy','Cầu thủ dự bị rất quan trọng, sẵn sàng vào thay bất cứ lúc nào',5),
      r(id,1,'matching','Nối từ với nghĩa trong bóng đá:',[{key:'A',text:'Ghi bàn'},{key:'B',text:'Đội'},{key:'C',text:'Trọng tài'}],{A:'Đưa bóng vào lưới',B:'Nhóm cầu thủ cùng thi đấu',C:'Người điều hành trận đấu'},'easy',null,6),
      r(id,1,'fill_blank','Mỗi đội bóng đá có [b1] cầu thủ thi đấu trên sân.',[{key:'b1',text:''}],{b1:'11'},'easy','Mỗi đội bóng đá có 11 cầu thủ thi đấu',7),
      r(id,1,'single_choice','Người giữ lưới trong bóng đá gọi là gì?',[{key:'A',text:'Tiền đạo'},{key:'B',text:'Hậu vệ'},{key:'C',text:'Thủ môn'}],'C','easy','Thủ môn là người bảo vệ khung thành',8),
      r(id,1,'sorting','Sắp xếp diễn biến trận đấu: Đội thắng ăn mừng, Bắt đầu trận đấu, Ghi bàn, Huýt còi kết thúc',[{key:'1',text:'Đội thắng ăn mừng'},{key:'2',text:'Bắt đầu trận đấu'},{key:'3',text:'Ghi bàn'},{key:'4',text:'Huýt còi kết thúc'}],['2','3','4','1'],'easy','Bắt đầu → Ghi bàn → Kết thúc → Ăn mừng',9),
      r(id,1,'single_choice','Bóng đá cần bao nhiêu người chơi mới đủ một đội?',[{key:'A',text:'7'},{key:'B',text:'11'},{key:'C',text:'9'}],'B','easy','Mỗi đội bóng đá cần 11 cầu thủ',10),
      // Ex2 medium
      r(id,2,'single_choice','Trong câu chuyện, cầu thủ dự bị cảm thấy thế nào khi chưa được vào sân?',[{key:'A',text:'Vui vẻ vì được nghỉ ngơi'},{key:'B',text:'Buồn và nóng lòng muốn được thi đấu'},{key:'C',text:'Không quan tâm'}],'B','medium','Cầu thủ dự bị nóng lòng, muốn chứng tỏ bản thân',1),
      r(id,2,'single_choice','Điều gì giúp cầu thủ dự bị không bỏ cuộc?',[{key:'A',text:'Được trả nhiều tiền'},{key:'B',text:'Sự kiên trì và niềm tin vào bản thân'},{key:'C',text:'Được khen ngợi mỗi ngày'}],'B','medium','Kiên trì và tin vào bản thân là chìa khóa thành công',2),
      r(id,2,'true_false','Kiên nhẫn chờ đợi cơ hội là một đức tính tốt. Đúng hay sai?',null,true,'medium','Kiên nhẫn chờ cơ hội và sẵn sàng khi cơ hội đến là đức tính quý',3),
      r(id,2,'fill_blank','Cầu thủ dự bị [b1] luyện tập mỗi ngày dù chưa được [b2] thi đấu.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vẫn / chăm chỉ',b2:'vào sân / ra sân'},'medium','Vẫn luyện tập dù chưa được thi đấu',3),
      r(id,2,'matching','Nối cảm xúc với tình huống trong câu chuyện:',[{key:'A',text:'Khi ngồi dự bị mãi'},{key:'B',text:'Khi được huấn luyện viên gọi vào sân'},{key:'C',text:'Khi ghi bàn thắng'}],{A:'Buồn, nóng ruột',B:'Hồi hộp, vui mừng',C:'Hạnh phúc, tự hào'},'medium',null,5),
      r(id,2,'single_choice','Từ "kiên trì" nghĩa là gì?',[{key:'A',text:'Làm việc nhanh'},{key:'B',text:'Bền bỉ không bỏ cuộc dù khó khăn'},{key:'C',text:'Làm việc cho xong'}],'B','medium','Kiên trì là bền bỉ không bỏ cuộc',6),
      r(id,2,'true_false','Cầu thủ dự bị cần tập luyện chăm chỉ dù ít khi được ra sân. Đúng hay sai?',null,true,'medium','Luôn phải sẵn sàng để khi được gọi có thể thi đấu tốt',7),
      r(id,2,'fill_blank','Câu chuyện "Cầu thủ dự bị" dạy chúng ta về [b1] và [b2] trong cuộc sống.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'kiên nhẫn / kiên trì',b2:'sự cố gắng / không bỏ cuộc'},'medium','Bài học về kiên trì và nỗ lực',8),
      r(id,2,'single_choice','Câu "Em vẫn tập luyện mỗi ngày dù chưa được vào sân." thể hiện đức tính gì?',[{key:'A',text:'Lười biếng'},{key:'B',text:'Kiên trì, cần cù'},{key:'C',text:'Tự cao tự đại'}],'B','medium','Vẫn tập luyện dù chưa được thi đấu là kiên trì, cần cù',9),
      r(id,2,'sorting','Sắp xếp diễn biến tâm trạng của cầu thủ dự bị: Tự hào vì đã cố gắng, Buồn khi ngồi dự bị, Hồi hộp khi được gọi vào, Vui khi ghi bàn',[{key:'1',text:'Tự hào vì đã cố gắng'},{key:'2',text:'Buồn khi ngồi dự bị'},{key:'3',text:'Hồi hộp khi được gọi vào'},{key:'4',text:'Vui khi ghi bàn'}],['2','3','4','1'],'medium','Buồn → Hồi hộp → Vui → Tự hào',10),
      // Ex3 hard
      r(id,3,'single_choice','Ý nghĩa chính của câu chuyện "Cầu thủ dự bị" là gì?',[{key:'A',text:'Bóng đá là môn thể thao hay nhất'},{key:'B',text:'Hãy kiên trì và luôn sẵn sàng, cơ hội sẽ đến'},{key:'C',text:'Cầu thủ dự bị kém hơn cầu thủ chính'}],'B','hard','Bài học: kiên trì, cơ hội sẽ đến với người sẵn sàng',1),
      r(id,3,'true_false','Câu "Dù không được ra sân, em vẫn cổ vũ hết mình cho đội." thể hiện tinh thần tập thể. Đúng hay sai?',null,true,'hard','Cổ vũ đội dù không được thi đấu là tinh thần tập thể',2),
      r(id,3,'fill_blank','Bài học từ câu chuyện: Đừng [b1] khi chưa có cơ hội. Hãy [b2] và chờ đợi.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nản chí / bỏ cuộc',b2:'cố gắng / kiên trì'},'hard','Không bỏ cuộc, kiên trì chờ cơ hội',3),
      r(id,3,'matching','Nối hành động của cầu thủ dự bị với phẩm chất thể hiện:',[{key:'A',text:'Vẫn tập luyện hàng ngày'},{key:'B',text:'Cổ vũ đồng đội'},{key:'C',text:'Sẵn sàng vào sân khi được gọi'}],{A:'Kiên trì, cần cù',B:'Tinh thần đồng đội',C:'Sự chuẩn bị kỹ càng'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp các câu thành đoạn văn: Cuối cùng, em ghi được bàn thắng. / Em là cầu thủ dự bị. / Em kiên trì luyện tập. / Huấn luyện viên gọi em vào sân.',[{key:'1',text:'Cuối cùng, em ghi được bàn thắng.'},{key:'2',text:'Em là cầu thủ dự bị.'},{key:'3',text:'Em kiên trì luyện tập.'},{key:'4',text:'Huấn luyện viên gọi em vào sân.'}],['2','3','4','1'],'hard','Giới thiệu → Luyện tập → Được gọi → Thành công',5),
      r(id,3,'single_choice','Từ "nản lòng" trái nghĩa với từ nào?',[{key:'A',text:'Chán nản'},{key:'B',text:'Kiên trì'},{key:'C',text:'Buồn bã'}],'B','hard','Nản lòng là bỏ cuộc; kiên trì là không bỏ cuộc',6),
      r(id,3,'true_false','Câu chuyện "Cầu thủ dự bị" có thể áp dụng bài học vào cuộc sống hàng ngày, không chỉ trong thể thao. Đúng hay sai?',null,true,'hard','Bài học kiên trì áp dụng trong mọi lĩnh vực cuộc sống',7),
      r(id,3,'fill_blank','Câu "Dù khó khăn, em vẫn [b1]." thể hiện quyết tâm [b2] đến cùng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cố gắng / không bỏ cuộc',b2:'kiên trì / phấn đấu'},'hard','Quyết tâm và kiên trì',8),
      r(id,3,'single_choice','Câu tục ngữ nào phù hợp nhất với bài học của câu chuyện?',[{key:'A',text:'"Có công mài sắt có ngày nên kim"'},{key:'B',text:'"Trăm hay không bằng tay quen"'},{key:'C',text:'"Một con ngựa đau cả tàu bỏ cỏ"'}],'A','hard','Có công mài sắt có ngày nên kim = kiên trì sẽ thành công',9),
      r(id,3,'matching','Nối từ với từ đồng nghĩa:',[{key:'A',text:'Kiên nhẫn'},{key:'B',text:'Nỗ lực'},{key:'C',text:'Sẵn sàng'}],{A:'Bền bỉ',B:'Cố gắng',C:'Chuẩn bị sẵn'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1154: Bài 9 - Cô giáo lớp em ──────────────────────────────────────────
  {
    const id = 1154;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Người dạy học trong lớp gọi là gì?',[{key:'A',text:'Bác sĩ'},{key:'B',text:'Giáo viên / Cô giáo'},{key:'C',text:'Kỹ sư'}],'B','easy','Giáo viên / cô giáo là người dạy học',1),
      r(id,1,'single_choice','Cô giáo dùng gì để viết bài lên bảng?',[{key:'A',text:'Bút mực'},{key:'B',text:'Phấn'},{key:'C',text:'Bút chì'}],'B','easy','Cô giáo dùng phấn viết lên bảng đen',2),
      r(id,1,'single_choice','Học sinh gọi giáo viên nữ là gì?',[{key:'A',text:'Chị'},{key:'B',text:'Cô'},{key:'C',text:'Bà'}],'B','easy','Học sinh gọi giáo viên nữ là cô',3),
      r(id,1,'true_false','Cô giáo yêu thương và quan tâm đến học sinh. Đúng hay sai?',null,true,'easy','Cô giáo luôn yêu thương và chăm sóc học sinh',4),
      r(id,1,'true_false','Học sinh không cần kính trọng thầy cô. Đúng hay sai?',null,false,'easy','Học sinh phải kính trọng và biết ơn thầy cô',5),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Dạy học'},{key:'B',text:'Bảng đen'},{key:'C',text:'Lớp học'}],{A:'Truyền đạt kiến thức',B:'Nơi cô viết bài',C:'Nơi học sinh học'},'easy',null,6),
      r(id,1,'fill_blank','Cô giáo [b1] bài cho chúng em nghe và [b2] chúng em bài tập.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'đọc / giảng',b2:'giao / cho'},'easy','Cô giáo đọc và giao bài tập',7),
      r(id,1,'single_choice','Ngày gì là Ngày Nhà giáo Việt Nam?',[{key:'A',text:'20 tháng 10'},{key:'B',text:'20 tháng 11'},{key:'C',text:'1 tháng 6'}],'B','easy','Ngày Nhà giáo Việt Nam là 20/11',8),
      r(id,1,'sorting','Sắp xếp các câu chào thầy cô theo mức độ lịch sự: "Ê!", "Chào cô!", "Thưa cô, em kính chào cô ạ!"',[{key:'1',text:'"Ê!"'},{key:'2',text:'"Chào cô!"'},{key:'3',text:'"Thưa cô, em kính chào cô ạ!"'}],['1','2','3'],'easy','Ít lịch sự nhất đến lịch sự nhất',9),
      r(id,1,'single_choice','Điều gì thể hiện sự kính trọng thầy cô?',[{key:'A',text:'Nói chuyện khi thầy cô giảng'},{key:'B',text:'Cúi đầu chào khi gặp'},{key:'C',text:'Bỏ học'}],'B','easy','Cúi đầu chào là thể hiện sự kính trọng',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu thơ "Cô như mẹ hiền" sử dụng biện pháp tu từ gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp từ'}],'B','medium','So sánh cô với mẹ hiền',1),
      r(id,2,'true_false','Thầy cô không chỉ dạy kiến thức mà còn dạy đạo đức cho học sinh. Đúng hay sai?',null,true,'medium','Thầy cô dạy cả kiến thức và cách làm người',2),
      r(id,2,'fill_blank','Công ơn thầy cô như [b1], chúng em phải [b2] và kính trọng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'biển cả / núi cao',b2:'biết ơn / ghi nhớ'},'medium','Công ơn thầy cô rất lớn',3),
      r(id,2,'matching','Nối hành động học sinh với ý nghĩa:',[{key:'A',text:'Tặng hoa cho cô ngày 20/11'},{key:'B',text:'Học bài chăm chỉ'},{key:'C',text:'Chào cô lễ phép'}],{A:'Biết ơn thầy cô',B:'Đền đáp công ơn thầy cô',C:'Kính trọng thầy cô'},'medium',null,4),
      r(id,2,'single_choice','Từ "tận tụy" nghĩa là gì trong câu "Cô giáo tận tụy với học sinh"?',[{key:'A',text:'Hết lòng, hết sức vì người khác'},{key:'B',text:'Làm việc qua loa'},{key:'C',text:'Không quan tâm'}],'A','medium','Tận tụy nghĩa là hết lòng, tận tâm',5),
      r(id,2,'true_false','Câu "Ơn cô như ơn mẹ hiền." là câu so sánh. Đúng hay sai?',null,true,'medium','Câu so sánh dùng từ "như"',6),
      r(id,2,'fill_blank','Cô giáo [b1] và [b2] chúng em như người mẹ thứ hai.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu thương',b2:'quan tâm / chăm sóc'},'medium','Cô giáo yêu thương và quan tâm như mẹ',7),
      r(id,2,'single_choice','Bài thơ về cô giáo thường thể hiện cảm xúc gì?',[{key:'A',text:'Sợ hãi'},{key:'B',text:'Biết ơn, yêu mến'},{key:'C',text:'Buồn chán'}],'B','medium','Bài thơ về cô giáo thường thể hiện lòng biết ơn và yêu mến',8),
      r(id,2,'sorting','Sắp xếp câu thành bài thơ ngắn: Cô dạy chúng em chữ đẹp lời hay. / Cô giáo em tóc dài thướt tha. / Mỗi sáng đến trường lòng thêm vui.',[{key:'1',text:'Cô dạy chúng em chữ đẹp lời hay.'},{key:'2',text:'Cô giáo em tóc dài thướt tha.'},{key:'3',text:'Mỗi sáng đến trường lòng thêm vui.'}],['2','1','3'],'medium','Miêu tả cô → Công việc của cô → Cảm xúc của em',9),
      r(id,2,'single_choice','Từ "trìu mến" trong câu "Cô nhìn chúng em bằng đôi mắt trìu mến" nghĩa là gì?',[{key:'A',text:'Nghiêm khắc'},{key:'B',text:'Yêu thương, âu yếm'},{key:'C',text:'Xa lạ'}],'B','medium','Trìu mến nghĩa là yêu thương, âu yếm',10),
      // Ex3 hard
      r(id,3,'single_choice','Trong câu thơ "Mái tóc cô đen óng / Đôi mắt cô sáng ngời", tác giả sử dụng biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Liệt kê và miêu tả'}],'C','hard','Tác giả liệt kê và miêu tả đặc điểm của cô giáo',1),
      r(id,3,'true_false','Từ "yêu kính" bao gồm cả tình yêu thương lẫn sự kính trọng. Đúng hay sai?',null,true,'hard','Yêu kính = yêu thương + kính trọng',2),
      r(id,3,'fill_blank','Câu "Không thầy đố mày làm nên" có nghĩa là [b1] và nhắc nhở chúng ta phải [b2] thầy cô.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'không có thầy sẽ khó thành công',b2:'kính trọng / biết ơn'},'hard','Tục ngữ về công ơn thầy cô',3),
      r(id,3,'matching','Nối từ ngữ miêu tả cô giáo với ý nghĩa:',[{key:'A',text:'Dịu dàng'},{key:'B',text:'Tận tâm'},{key:'C',text:'Nghiêm khắc'}],{A:'Nhẹ nhàng, ân cần',B:'Hết lòng vì học sinh',C:'Đòi hỏi cao, kỷ luật chặt'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp theo mức độ trân trọng thầy cô từ ít đến nhiều: Không nghe lời thầy cô, Nghe lời thầy cô, Học tốt để đền ơn, Chào hỏi lễ phép',[{key:'1',text:'Không nghe lời thầy cô'},{key:'2',text:'Nghe lời thầy cô'},{key:'3',text:'Học tốt để đền ơn'},{key:'4',text:'Chào hỏi lễ phép'}],['1','4','2','3'],'hard','Từ ít đến nhiều sự trân trọng',5),
      r(id,3,'single_choice','Câu thơ "Bàn tay cô viết lên bảng / Mang theo bao điều tốt đẹp" ý muốn nói gì?',[{key:'A',text:'Cô viết chữ rất đẹp'},{key:'B',text:'Mỗi bài cô dạy đều chứa đựng điều tốt lành cho học sinh'},{key:'C',text:'Bảng cô dùng rất tốt'}],'B','hard','Công việc dạy học của cô mang lại nhiều điều tốt đẹp',6),
      r(id,3,'true_false','Từ "ân nhân" có thể dùng để nói về thầy cô. Đúng hay sai?',null,true,'hard','Thầy cô là ân nhân vì công ơn dạy dỗ rất lớn',7),
      r(id,3,'fill_blank','Tình cảm của học sinh dành cho cô giáo là [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'kính trọng / yêu quý',b2:'biết ơn / nhớ mãi'},'hard','Học sinh kính trọng và biết ơn cô giáo',8),
      r(id,3,'single_choice','Vì sao người ta gọi nghề giáo là "nghề cao quý"?',[{key:'A',text:'Vì giáo viên kiếm được nhiều tiền'},{key:'B',text:'Vì giáo viên góp phần tạo nên những con người có ích cho xã hội'},{key:'C',text:'Vì giáo viên được nghỉ nhiều'}],'B','hard','Nghề giáo cao quý vì đào tạo con người cho xã hội',9),
      r(id,3,'matching','Nối hành động cụ thể với cách thể hiện lòng biết ơn thầy cô:',[{key:'A',text:'Học bài đầy đủ trước khi đến lớp'},{key:'B',text:'Gặp thầy cô ngoài đường cúi đầu chào'},{key:'C',text:'Không nói chuyện khi thầy cô giảng'}],{A:'Chuẩn bị bài nghiêm túc',B:'Kính trọng trong mọi hoàn cảnh',C:'Tôn trọng công sức thầy cô'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1155: Bài 10 - Thời khoá biểu ─────────────────────────────────────────
  {
    const id = 1155;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Môn học nào rèn luyện tính toán?',[{key:'A',text:'Tiếng Việt'},{key:'B',text:'Toán'},{key:'C',text:'Âm nhạc'}],'B','easy','Môn Toán rèn luyện kỹ năng tính toán',1),
      r(id,1,'single_choice','Môn học nào dạy đọc và viết tiếng Việt?',[{key:'A',text:'Đạo đức'},{key:'B',text:'Tiếng Việt'},{key:'C',text:'Thể dục'}],'B','easy','Môn Tiếng Việt dạy đọc, viết, nói tiếng Việt',2),
      r(id,1,'single_choice','Môn Thể dục dạy học sinh điều gì?',[{key:'A',text:'Vẽ tranh'},{key:'B',text:'Hát hò'},{key:'C',text:'Vận động, thể thao'}],'C','easy','Thể dục rèn luyện thể chất và vận động',3),
      r(id,1,'true_false','Thời khoá biểu cho biết lịch học các môn trong tuần. Đúng hay sai?',null,true,'easy','Thời khoá biểu là bảng sắp xếp lịch học',4),
      r(id,1,'true_false','Môn Âm nhạc dạy học sinh vẽ tranh. Đúng hay sai?',null,false,'easy','Âm nhạc dạy hát và nhạc; Mĩ thuật dạy vẽ',5),
      r(id,1,'matching','Nối môn học với nội dung chính:',[{key:'A',text:'Mĩ thuật'},{key:'B',text:'Đạo đức'},{key:'C',text:'Tự nhiên và Xã hội'}],{A:'Vẽ và nghệ thuật',B:'Cách ứng xử, sống tốt',C:'Thiên nhiên và con người'},'easy',null,6),
      r(id,1,'fill_blank','Thứ Hai, em học [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Tiếng Việt',b2:'Toán'},'easy','Ví dụ thời khoá biểu thứ Hai',7),
      r(id,1,'single_choice','Tiết học thứ nhất trong ngày gọi là tiết mấy?',[{key:'A',text:'Tiết 2'},{key:'B',text:'Tiết 1'},{key:'C',text:'Tiết 3'}],'B','easy','Tiết đầu tiên trong ngày là tiết 1',8),
      r(id,1,'sorting','Sắp xếp các môn học theo bảng chữ cái: Toán, Âm nhạc, Mĩ thuật, Đạo đức, Tiếng Việt',[{key:'1',text:'Toán'},{key:'2',text:'Âm nhạc'},{key:'3',text:'Mĩ thuật'},{key:'4',text:'Đạo đức'},{key:'5',text:'Tiếng Việt'}],['2','4','3','5','1'],'easy','Âm nhạc, Đạo đức, Mĩ thuật, Tiếng Việt, Toán',9),
      r(id,1,'single_choice','Thời khoá biểu có ích như thế nào?',[{key:'A',text:'Giúp em biết chuẩn bị đúng sách vở cho mỗi ngày'},{key:'B',text:'Không có ích gì'},{key:'C',text:'Chỉ để treo trong lớp'}],'A','easy','Thời khoá biểu giúp chuẩn bị sách vở đúng môn',10),
      // Ex2 medium
      r(id,2,'single_choice','Nếu thứ Tư có môn Thể dục tiết 3, thì em cần mang gì?',[{key:'A',text:'Sách Toán'},{key:'B',text:'Quần áo thể thao'},{key:'C',text:'Bút vẽ'}],'B','medium','Giờ Thể dục cần quần áo thể thao',1),
      r(id,2,'single_choice','Thứ mấy thường không có học ở trường tiểu học?',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Tư'},{key:'C',text:'Chủ nhật'}],'C','medium','Chủ nhật là ngày nghỉ',2),
      r(id,2,'true_false','Mỗi ngày học, học sinh có thể có nhiều môn học khác nhau. Đúng hay sai?',null,true,'medium','Trong một ngày có thể có 3-5 tiết với các môn khác nhau',3),
      r(id,2,'fill_blank','Tiết 1 bắt đầu lúc [b1] giờ và kết thúc lúc [b2] giờ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'7 giờ 30 / 7h30',b2:'8 giờ 10 / 8h10'},'medium','Tiết học đầu tiên thường bắt đầu từ 7h30',4),
      r(id,2,'matching','Đọc thời khoá biểu và trả lời: Thứ Hai: Tiết 1-Tiếng Việt, Tiết 2-Toán. Thứ Ba: Tiết 1-Toán, Tiết 2-Đạo đức.',[{key:'A',text:'Thứ Hai tiết 2'},{key:'B',text:'Thứ Ba tiết 1'},{key:'C',text:'Thứ Hai tiết 1'}],{A:'Toán',B:'Toán',C:'Tiếng Việt'},'medium',null,5),
      r(id,2,'single_choice','Môn học nào giúp em hiểu biết về xã hội và thiên nhiên?',[{key:'A',text:'Toán'},{key:'B',text:'Tự nhiên và Xã hội'},{key:'C',text:'Âm nhạc'}],'B','medium','Tự nhiên và Xã hội dạy về thiên nhiên, con người và xã hội',6),
      r(id,2,'true_false','Em nên xem thời khoá biểu tối hôm trước để chuẩn bị sách vở cho ngày hôm sau. Đúng hay sai?',null,true,'medium','Xem thời khoá biểu trước giúp chuẩn bị đúng sách vở',7),
      r(id,2,'fill_blank','Một tuần học có [b1] ngày và mỗi ngày có khoảng [b2] tiết học.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'5',b2:'4-5'},'medium','Học từ thứ Hai đến thứ Sáu, mỗi ngày 4-5 tiết',8),
      r(id,2,'single_choice','Câu "Thời khoá biểu là người bạn đồng hành của học sinh." sử dụng biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp từ'}],'B','medium','Nhân hóa: thời khoá biểu được gọi như người bạn',9),
      r(id,2,'sorting','Sắp xếp theo thứ tự các tiết học trong một ngày: Tiết 4, Tiết 2, Tiết 1, Tiết 3',[{key:'1',text:'Tiết 4'},{key:'2',text:'Tiết 2'},{key:'3',text:'Tiết 1'},{key:'4',text:'Tiết 3'}],['3','2','4','1'],'medium','Tiết 1, 2, 3, 4',10),
      // Ex3 hard
      r(id,3,'single_choice','Nếu thứ Năm không có môn Mĩ thuật mà thứ Sáu có, em cần chuẩn bị đồ vẽ vào ngày nào?',[{key:'A',text:'Thứ Năm'},{key:'B',text:'Thứ Sáu'},{key:'C',text:'Thứ Tư'}],'A','hard','Cần chuẩn bị tối thứ Năm cho tiết Mĩ thuật thứ Sáu',1),
      r(id,3,'true_false','Thời khoá biểu giúp học sinh sắp xếp việc học khoa học và hợp lý. Đúng hay sai?',null,true,'hard','Thời khoá biểu giúp tổ chức học tập hiệu quả',2),
      r(id,3,'fill_blank','Em đọc thời khoá biểu để biết ngày [b1] học môn gì và [b2] sách vở cho đúng.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mai / hôm sau',b2:'chuẩn bị'},'hard','Đọc thời khoá biểu để chuẩn bị đúng',3),
      r(id,3,'matching','Nối môn học với đồ dùng cần mang:',[{key:'A',text:'Mĩ thuật'},{key:'B',text:'Thể dục'},{key:'C',text:'Tiếng Việt'}],{A:'Màu vẽ, giấy',B:'Quần áo thể thao, giày',C:'Sách Tiếng Việt, vở'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp các bước lập thời khoá biểu: Điền môn học vào từng ô, Kẻ bảng thứ/tiết, Xem lại cho đúng, Viết tiêu đề',[{key:'1',text:'Điền môn học vào từng ô'},{key:'2',text:'Kẻ bảng thứ/tiết'},{key:'3',text:'Xem lại cho đúng'},{key:'4',text:'Viết tiêu đề'}],['4','2','1','3'],'hard','Tiêu đề → Kẻ bảng → Điền môn → Kiểm tra',5),
      r(id,3,'fill_blank','Môn học yêu thích của em là [b1] vì [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'(tên môn)',b2:'(lý do)'},'hard','Học sinh tự trả lời về môn học yêu thích',6),
      r(id,3,'single_choice','Từ "tiết học" và "buổi học" khác nhau như thế nào?',[{key:'A',text:'Tiết học là một giờ học; buổi học là cả buổi sáng hoặc chiều'},{key:'B',text:'Chúng hoàn toàn giống nhau'},{key:'C',text:'Tiết học kéo dài cả buổi'}],'A','hard','Tiết học khoảng 40 phút; buổi học gồm nhiều tiết',7),
      r(id,3,'true_false','Có những môn học tuần chỉ học 1 tiết, có môn học 4-5 tiết. Đúng hay sai?',null,true,'hard','Tiếng Việt và Toán có nhiều tiết hơn các môn khác',8),
      r(id,3,'single_choice','Tại sao Tiếng Việt và Toán thường có nhiều tiết hơn trong thời khoá biểu?',[{key:'A',text:'Vì hai môn này khó hơn'},{key:'B',text:'Vì đây là hai môn nền tảng quan trọng nhất'},{key:'C',text:'Vì thầy cô thích hai môn này'}],'B','hard','Tiếng Việt và Toán là nền tảng cho mọi môn học',9),
      r(id,3,'matching','Nối tên môn học với kỹ năng được rèn luyện:',[{key:'A',text:'Âm nhạc'},{key:'B',text:'Đạo đức'},{key:'C',text:'Tự nhiên và Xã hội'}],{A:'Cảm thụ âm nhạc, hát',B:'Kỹ năng sống, ứng xử',C:'Tìm hiểu thế giới xung quanh'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1156: Bài 11 - Cái trống trường em ─────────────────────────────────────
  {
    const id = 1156;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Tiếng trống trường báo hiệu điều gì?',[{key:'A',text:'Trời sắp mưa'},{key:'B',text:'Bắt đầu hoặc kết thúc giờ học'},{key:'C',text:'Giờ ăn trưa'}],'B','easy','Tiếng trống báo hiệu bắt đầu hoặc kết thúc tiết học',1),
      r(id,1,'single_choice','Cái trống thường đặt ở đâu trong trường học?',[{key:'A',text:'Trong phòng học'},{key:'B',text:'Ở văn phòng hoặc hành lang'},{key:'C',text:'Trong nhà kho'}],'B','easy','Trống thường đặt ở hành lang hoặc văn phòng',2),
      r(id,1,'single_choice','Khi nghe tiếng trống vào lớp, học sinh phải làm gì?',[{key:'A',text:'Tiếp tục chơi'},{key:'B',text:'Vào lớp ngồi vào chỗ'},{key:'C',text:'Ra về'}],'B','easy','Tiếng trống vào lớp nhắc học sinh về chỗ ngồi',3),
      r(id,1,'true_false','Trống trường là biểu tượng gắn liền với cuộc sống học đường. Đúng hay sai?',null,true,'easy','Tiếng trống trường gắn với kỷ niệm học sinh',4),
      r(id,1,'true_false','Tiếng trống chỉ đánh một lần duy nhất trong ngày học. Đúng hay sai?',null,false,'easy','Trống đánh nhiều lần: đầu tiết, cuối tiết, ra chơi...',5),
      r(id,1,'matching','Nối tiếng trống với thời điểm:',[{key:'A',text:'Trống đầu buổi sáng'},{key:'B',text:'Trống ra chơi'},{key:'C',text:'Trống tan học'}],{A:'Học sinh vào lớp',B:'Học sinh ra sân chơi',C:'Học sinh ra về'},'easy',null,6),
      r(id,1,'fill_blank','Khi nghe tiếng [b1] vang lên, chúng em biết giờ ra [b2] đã đến.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'trống',b2:'chơi'},'easy','Tiếng trống ra chơi',7),
      r(id,1,'single_choice','Từ "vang vọng" mô tả âm thanh như thế nào?',[{key:'A',text:'Rất nhỏ, khó nghe'},{key:'B',text:'To và lan rộng'},{key:'C',text:'Nhẹ nhàng'}],'B','easy','Vang vọng nghĩa là âm thanh to và vang xa',8),
      r(id,1,'sorting','Sắp xếp các tiếng trống theo thứ tự trong ngày học: Trống tan học, Trống vào lớp buổi sáng, Trống ra chơi, Trống vào học lại',[{key:'1',text:'Trống tan học'},{key:'2',text:'Trống vào lớp buổi sáng'},{key:'3',text:'Trống ra chơi'},{key:'4',text:'Trống vào học lại'}],['2','3','4','1'],'easy','Vào lớp → Ra chơi → Vào lại → Tan học',9),
      r(id,1,'single_choice','Tiếng trống trường gợi lên cảm xúc gì cho học sinh?',[{key:'A',text:'Buồn bã'},{key:'B',text:'Hồi hộp, náo nức'},{key:'C',text:'Sợ hãi'}],'B','easy','Tiếng trống gợi lên sự háo hức của học sinh',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu "Tiếng trống vang lên như tiếng gọi của mùa khai giảng." sử dụng biện pháp tu từ gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp từ'}],'B','medium','So sánh tiếng trống với tiếng gọi',1),
      r(id,2,'true_false','Tiếng trống trường gắn liền với các mùa trong năm học (khai giảng, thi cử, bế giảng). Đúng hay sai?',null,true,'medium','Trống vang lên ở các dịp quan trọng của năm học',2),
      r(id,2,'fill_blank','Tiếng trống khai giảng năm học mới khiến học sinh cảm thấy [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'hồi hộp / háo hức',b2:'vui mừng / phấn khởi'},'medium','Khai giảng gợi sự háo hức và vui mừng',3),
      r(id,2,'matching','Nối câu văn với biện pháp tu từ được dùng:',[{key:'A',text:'"Cái trống nằm im chờ đợi."'},{key:'B',text:'"Tiếng trống vang như sấm."'},{key:'C',text:'"Trống, trống, trống vang lên."'}],{A:'Nhân hóa',B:'So sánh',C:'Điệp từ'},'medium',null,4),
      r(id,2,'single_choice','Từ "náo nức" trong câu "Học sinh náo nức đến trường." có nghĩa là gì?',[{key:'A',text:'Bồn chồn lo lắng'},{key:'B',text:'Hào hứng, phấn khởi'},{key:'C',text:'Mệt mỏi'}],'B','medium','Náo nức nghĩa là rất hào hứng, vui mừng',5),
      r(id,2,'true_false','Bài thơ về cái trống trường thường gợi nhớ kỷ niệm học sinh thơ ấu. Đúng hay sai?',null,true,'medium','Trống trường là biểu tượng của tuổi học trò',6),
      r(id,2,'fill_blank','Tiếng trống [b1] vang khắp sân trường, báo hiệu một ngày học mới [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'rộn rã / vang vọng',b2:'bắt đầu'},'medium','Tiếng trống báo hiệu ngày học mới',7),
      r(id,2,'single_choice','Câu "Mỗi khi nghe tiếng trống, lòng em lại rộn ràng." diễn tả điều gì?',[{key:'A',text:'Em sợ tiếng trống'},{key:'B',text:'Tiếng trống mang lại cảm xúc vui, háo hức cho em'},{key:'C',text:'Tiếng trống làm em buồn ngủ'}],'B','medium','Tiếng trống gợi cảm xúc vui, háo hức',8),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn: Học sinh ùa ra sân vui đùa. / Tiếng trống ra chơi vang lên. / Tiếng cười nói rộn rã khắp nơi.',[{key:'1',text:'Học sinh ùa ra sân vui đùa.'},{key:'2',text:'Tiếng trống ra chơi vang lên.'},{key:'3',text:'Tiếng cười nói rộn rã khắp nơi.'}],['2','1','3'],'medium','Trống vang → Học sinh ra sân → Vui đùa',9),
      r(id,2,'single_choice','Từ "rộn rã" trong câu "Tiếng trống rộn rã vang lên" là từ loại gì?',[{key:'A',text:'Danh từ'},{key:'B',text:'Động từ'},{key:'C',text:'Tính từ'}],'C','medium','Rộn rã là tính từ chỉ âm thanh vui vẻ, sôi động',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Cái trống trường như người bạn thân của chúng em." là biện pháp tu từ gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Liệt kê'}],'B','hard','So sánh trống với người bạn',1),
      r(id,3,'true_false','Hình ảnh cái trống trường trong thơ văn thường mang nghĩa ẩn dụ về tuổi học trò. Đúng hay sai?',null,true,'hard','Trống trường là hình ảnh biểu tượng cho kỷ niệm học sinh',2),
      r(id,3,'fill_blank','Biện pháp nhân hóa trong câu "Cái trống nằm yên lặng suốt mùa hè, chờ học sinh trở lại" là [b1]. Trống được gán hành động [b2] như người.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhân hóa',b2:'nằm yên / chờ đợi'},'hard','Trống được gán hành động của con người',3),
      r(id,3,'matching','Nối từ ngữ với cảm xúc gợi lên khi nghe tiếng trống:',[{key:'A',text:'Trống khai giảng'},{key:'B',text:'Trống tan học ngày cuối năm'},{key:'C',text:'Trống ra chơi'}],{A:'Hồi hộp, náo nức đón năm học mới',B:'Bùi ngùi, nhớ tiếc năm học cũ',C:'Vui vẻ, háo hức được nghỉ ngơi'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn hay về trống trường: Đó là tiếng gọi của tuổi thơ. / Tiếng trống trường ngân vang mỗi sáng. / Bao năm trôi qua, tiếng trống vẫn còn đó.',[{key:'1',text:'Đó là tiếng gọi của tuổi thơ.'},{key:'2',text:'Tiếng trống trường ngân vang mỗi sáng.'},{key:'3',text:'Bao năm trôi qua, tiếng trống vẫn còn đó.'}],['2','1','3'],'hard','Miêu tả → Ý nghĩa → Kết luận',5),
      r(id,3,'single_choice','Từ "ngân vang" khác "vang lên" ở điểm nào?',[{key:'A',text:'Ngân vang gợi âm thanh kéo dài và du dương hơn'},{key:'B',text:'Chúng hoàn toàn giống nhau'},{key:'C',text:'Vang lên to hơn ngân vang'}],'A','hard','Ngân vang gợi âm thanh kéo dài, du dương, gợi cảm hơn',6),
      r(id,3,'true_false','Câu "Tiếng trống, tiếng trống, tiếng trống vang lên." có lỗi lặp từ không cần thiết. Đúng hay sai?',null,false,'hard','Đây là điệp từ có chủ ý để nhấn mạnh cảm xúc',7),
      r(id,3,'fill_blank','Tiếng trống trường gợi nhớ [b1] học trò. Đó là [b2] của tuổi thơ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'kỷ niệm / ký ức',b2:'kỷ niệm / hình ảnh đẹp'},'hard','Trống trường gắn với kỷ niệm tuổi thơ',8),
      r(id,3,'single_choice','Câu nào có hình ảnh so sánh đẹp về tiếng trống?',[{key:'A',text:'"Tiếng trống to lắm."'},{key:'B',text:'"Tiếng trống vang như tiếng gọi mùa thu."'},{key:'C',text:'"Trống đánh nhiều lần."'}],'B','hard','Câu B có hình ảnh so sánh đẹp và gợi cảm',9),
      r(id,3,'matching','Nối từ ngữ miêu tả tiếng trống với hiệu ứng cảm xúc:',[{key:'A',text:'Rộn rã'},{key:'B',text:'Ngân vang'},{key:'C',text:'Thúc giục'}],{A:'Vui tươi, náo nhiệt',B:'Du dương, gợi cảm',C:'Khẩn trương, hối hả'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1157: Bài 12 - Danh sách học sinh ──────────────────────────────────────
  {
    const id = 1157;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Số thứ tự đầu tiên trong danh sách là số mấy?',[{key:'A',text:'Số 0'},{key:'B',text:'Số 1'},{key:'C',text:'Số 2'}],'B','easy','Danh sách bắt đầu từ số thứ tự 1',1),
      r(id,1,'single_choice','Trong danh sách học sinh, thông tin nào thường có?',[{key:'A',text:'Màu áo yêu thích'},{key:'B',text:'Họ và tên'},{key:'C',text:'Món ăn yêu thích'}],'B','easy','Danh sách học sinh ghi họ và tên học sinh',2),
      r(id,1,'single_choice','Thứ nhất, thứ hai, thứ ba là các số gì?',[{key:'A',text:'Số đếm'},{key:'B',text:'Số thứ tự'},{key:'C',text:'Số lẻ'}],'B','easy','Thứ nhất, thứ hai... là số thứ tự',3),
      r(id,1,'true_false','Họ và tên học sinh thường viết họ trước, tên sau. Đúng hay sai?',null,true,'easy','Họ và tên: Nguyễn Văn An — Nguyễn là họ, An là tên',4),
      r(id,1,'true_false','Danh sách học sinh thường sắp xếp theo ngẫu nhiên. Đúng hay sai?',null,false,'easy','Danh sách thường xếp theo thứ tự bảng chữ cái của tên',5),
      r(id,1,'matching','Nối số thứ tự với cách đọc:',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],{A:'Thứ nhất',B:'Thứ hai',C:'Thứ ba'},'easy',null,6),
      r(id,1,'fill_blank','Em đứng [b1] trong danh sách lớp vì tên em bắt đầu bằng chữ [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'(số thứ tự)',b2:'(chữ cái đầu tên)'},'easy','Số thứ tự phụ thuộc vào tên trong danh sách',7),
      r(id,1,'single_choice','Họ "Nguyễn" thường xếp ở vị trí nào trong danh sách theo bảng chữ cái?',[{key:'A',text:'Đầu danh sách'},{key:'B',text:'Gần cuối danh sách'},{key:'C',text:'Giữa danh sách'}],'B','medium','N là chữ thứ 14 trong bảng chữ cái, gần cuối',8),
      r(id,1,'sorting','Sắp xếp các tên theo thứ tự bảng chữ cái: Tuấn, An, Minh, Lan',[{key:'1',text:'Tuấn'},{key:'2',text:'An'},{key:'3',text:'Minh'},{key:'4',text:'Lan'}],['2','4','3','1'],'easy','An, Lan, Minh, Tuấn theo bảng chữ cái',9),
      r(id,1,'single_choice','Danh sách học sinh dùng để làm gì?',[{key:'A',text:'Chỉ để trưng bày'},{key:'B',text:'Quản lý thông tin học sinh trong lớp'},{key:'C',text:'Làm bài tập'}],'B','easy','Danh sách học sinh giúp quản lý và điểm danh',10),
      // Ex2 medium
      r(id,2,'single_choice','Khi điểm danh, giáo viên đọc tên theo danh sách như thế nào?',[{key:'A',text:'Đọc ngẫu nhiên'},{key:'B',text:'Theo thứ tự số thứ tự'},{key:'C',text:'Đọc tên học sinh giỏi trước'}],'B','medium','Điểm danh theo thứ tự số thứ tự trong danh sách',1),
      r(id,2,'single_choice','Trong danh sách "1. An, 2. Bình, 3. Chi", Bình đứng thứ mấy?',[{key:'A',text:'Thứ nhất'},{key:'B',text:'Thứ hai'},{key:'C',text:'Thứ ba'}],'B','medium','Bình ở số thứ tự 2 = thứ hai',2),
      r(id,2,'true_false','Tên học sinh trong danh sách thường sắp xếp theo vần A, B, C. Đúng hay sai?',null,true,'medium','Danh sách thường xếp theo bảng chữ cái của tên',3),
      r(id,2,'fill_blank','Lớp em có [b1] học sinh. Em đứng thứ [b2] trong danh sách.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'(số học sinh lớp)',b2:'(số thứ tự)'},'medium','Học sinh tự điền thông tin lớp mình',4),
      r(id,2,'matching','Nối thông tin với ô trong danh sách học sinh:',[{key:'A',text:'Số thứ tự'},{key:'B',text:'Họ và tên'},{key:'C',text:'Ngày sinh'}],{A:'1, 2, 3...',B:'Nguyễn Văn An',C:'15/03/2018'},'medium',null,5),
      r(id,2,'single_choice','Câu "Danh sách học sinh lớp 2A" cho biết điều gì?',[{key:'A',text:'Đây là danh sách học sinh của lớp 2A'},{key:'B',text:'Học sinh lớp 2A rất giỏi'},{key:'C',text:'Lớp 2A có ít học sinh'}],'A','medium','Tiêu đề cho biết nội dung của danh sách',6),
      r(id,2,'true_false','Danh sách học sinh giúp thầy cô biết ai vắng mặt. Đúng hay sai?',null,true,'medium','Thầy cô dùng danh sách để điểm danh',7),
      r(id,2,'fill_blank','Để viết tên đúng, em cần viết [b1] trước rồi mới viết [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'họ',b2:'tên'},'medium','Họ và tên: họ viết trước, tên viết sau',8),
      r(id,2,'single_choice','Số thứ tự thứ mười lăm viết bằng chữ số như thế nào?',[{key:'A',text:'14'},{key:'B',text:'15'},{key:'C',text:'16'}],'B','medium','Thứ mười lăm = số thứ tự 15',9),
      r(id,2,'sorting','Sắp xếp đúng thứ tự bảng chữ cái: Hoa, An, Minh, Chi, Bình',[{key:'1',text:'Hoa'},{key:'2',text:'An'},{key:'3',text:'Minh'},{key:'4',text:'Chi'},{key:'5',text:'Bình'}],['2','5','4','1','3'],'medium','An, Bình, Chi, Hoa, Minh',10),
      // Ex3 hard
      r(id,3,'single_choice','Khi viết đơn hay điền vào tờ khai, em cần ghi thông tin theo thứ tự nào?',[{key:'A',text:'Tên, họ, ngày sinh'},{key:'B',text:'Họ và tên, ngày sinh, lớp'},{key:'C',text:'Lớp, họ và tên, ngày sinh'}],'B','hard','Thứ tự thông thường: Họ tên → Ngày sinh → Lớp',1),
      r(id,3,'true_false','Tên "Nguyễn Thị Lan" và "Lan Thị Nguyễn" là cùng một người. Đúng hay sai?',null,false,'hard','Nguyễn là họ, Thị Lan là tên đệm và tên; đổi thứ tự là sai',2),
      r(id,3,'fill_blank','Trong tên "Trần Thị Hương", [b1] là họ và [b2] là tên.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'Trần',b2:'Hương'},'hard','Trần là họ, Thị là tên đệm, Hương là tên',3),
      r(id,3,'matching','Nối mục trong đơn với thông tin cần điền:',[{key:'A',text:'Họ và tên:'},{key:'B',text:'Ngày tháng năm sinh:'},{key:'C',text:'Lớp:'}],{A:'Nguyễn Văn Bình',B:'10/05/2018',C:'2A'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp các bước viết danh sách: Đánh số thứ tự, Điền họ và tên, Viết tiêu đề, Xem lại cho đúng chính tả',[{key:'1',text:'Đánh số thứ tự'},{key:'2',text:'Điền họ và tên'},{key:'3',text:'Viết tiêu đề'},{key:'4',text:'Xem lại cho đúng chính tả'}],['3','1','2','4'],'hard','Tiêu đề → Số thứ tự → Điền tên → Kiểm tra',5),
      r(id,3,'single_choice','Trong danh sách xếp theo vần, tên nào đứng trước: "Nguyễn Thị Lan" hay "Nguyễn Thị An"?',[{key:'A',text:'Nguyễn Thị Lan'},{key:'B',text:'Nguyễn Thị An'},{key:'C',text:'Xếp ngẫu nhiên'}],'B','hard','An (A) đứng trước Lan (L) trong bảng chữ cái',6),
      r(id,3,'true_false','Họ phụ thuộc vào gia đình, còn tên có thể do cha mẹ tự đặt. Đúng hay sai?',null,true,'hard','Họ thừa hưởng từ gia đình; tên do cha mẹ đặt',7),
      r(id,3,'fill_blank','Lớp em có [b1] bạn nam và [b2] bạn nữ, tổng cộng [b3] học sinh.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'(số bạn nam)',b2:'(số bạn nữ)',b3:'(tổng)'},'hard','Học sinh tự điền số liệu lớp mình',8),
      r(id,3,'single_choice','Tại sao cần ghi ngày sinh trong danh sách học sinh?',[{key:'A',text:'Để biết ai lớn tuổi hơn'},{key:'B',text:'Để quản lý hồ sơ và phân lớp đúng độ tuổi'},{key:'C',text:'Để tổ chức sinh nhật'}],'B','hard','Ngày sinh giúp quản lý hồ sơ và xếp lớp',9),
      r(id,3,'matching','Nối khái niệm với ví dụ:',[{key:'A',text:'Họ'},{key:'B',text:'Tên đệm'},{key:'C',text:'Tên'}],{A:'Lê, Trần, Nguyễn',B:'Văn, Thị, Hữu',C:'Lan, Minh, Hùng'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1158: Bài 13 - Yêu lắm trường ơi! ─────────────────────────────────────
  {
    const id = 1158;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Câu "Yêu lắm trường ơi!" thể hiện cảm xúc gì?',[{key:'A',text:'Ghét trường học'},{key:'B',text:'Yêu mến trường học'},{key:'C',text:'Sợ đi học'}],'B','easy','Câu cảm thán thể hiện tình yêu với trường',1),
      r(id,1,'single_choice','Từ "ơi" trong câu thơ dùng để làm gì?',[{key:'A',text:'Gọi, gợi sự thân thiết'},{key:'B',text:'Phủ định'},{key:'C',text:'Hỏi'}],'A','easy','Ơi là tiếng gọi thân thiết trong tiếng Việt',2),
      r(id,1,'single_choice','Từ nào chỉ cảm xúc tích cực với trường học?',[{key:'A',text:'Ghét'},{key:'B',text:'Sợ'},{key:'C',text:'Yêu'}],'C','easy','Yêu là cảm xúc tích cực, gắn bó với trường',3),
      r(id,1,'true_false','Trường học là nơi học sinh gắn bó và có nhiều kỷ niệm đẹp. Đúng hay sai?',null,true,'easy','Trường học gắn bó với nhiều kỷ niệm thời thơ ấu',4),
      r(id,1,'true_false','Câu cảm thán thường kết thúc bằng dấu chấm hỏi. Đúng hay sai?',null,false,'easy','Câu cảm thán kết thúc bằng dấu chấm than (!)',5),
      r(id,1,'matching','Nối nơi trong trường với hoạt động xảy ra ở đó:',[{key:'A',text:'Lớp học'},{key:'B',text:'Sân trường'},{key:'C',text:'Thư viện'}],{A:'Học bài, nghe giảng',B:'Vui chơi, thể thao',C:'Đọc sách, tra cứu'},'easy',null,6),
      r(id,1,'fill_blank','Em [b1] trường em vì trường là nơi em [b2] và có nhiều bạn bè.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'yêu',b2:'học'},'easy','Yêu trường vì nơi học và có bạn bè',7),
      r(id,1,'single_choice','Hình ảnh nào gắn liền với trường học?',[{key:'A',text:'Cột điện'},{key:'B',text:'Mái trường, sân chơi, thầy cô'},{key:'C',text:'Cửa hàng, chợ búa'}],'B','easy','Mái trường, sân chơi, thầy cô là hình ảnh đặc trưng',8),
      r(id,1,'sorting','Sắp xếp từ gần nghĩa với "yêu" theo mức độ: Thích, Mê, Rất yêu, Yêu',[{key:'1',text:'Thích'},{key:'2',text:'Mê'},{key:'3',text:'Rất yêu'},{key:'4',text:'Yêu'}],['1','4','3','2'],'easy','Thích < Yêu < Rất yêu < Mê',9),
      r(id,1,'single_choice','Điều gì em nhớ mãi khi nghĩ về trường?',[{key:'A',text:'Chỉ những lần bị điểm kém'},{key:'B',text:'Thầy cô, bạn bè và những giờ học vui'},{key:'C',text:'Chỉ những lúc ốm nghỉ học'}],'B','easy','Kỷ niệm đẹp với thầy cô và bạn bè là điều đáng nhớ',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu "Yêu lắm trường ơi!" có mấy từ?',[{key:'A',text:'3 từ'},{key:'B',text:'4 từ'},{key:'C',text:'5 từ'}],'A','medium','Yêu / lắm / trường ơi = 3 từ (hoặc 4 tiếng)',1),
      r(id,2,'true_false','Đoạn văn về tình yêu trường lớp thường dùng nhiều tính từ chỉ cảm xúc. Đúng hay sai?',null,true,'medium','Tình yêu được thể hiện qua các tính từ cảm xúc',2),
      r(id,2,'fill_blank','Em yêu trường vì có [b1] thân thiết và [b2] yêu thương dạy dỗ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bạn bè',b2:'thầy cô'},'medium','Bạn bè và thầy cô là lý do yêu trường',3),
      r(id,2,'matching','Nối cảm xúc với kỷ niệm tương ứng:',[{key:'A',text:'Nhớ tiếng trống trường'},{key:'B',text:'Nhớ giờ ra chơi vui vẻ'},{key:'C',text:'Nhớ lời cô giảng'}],{A:'Âm thanh đặc trưng của trường',B:'Kỷ niệm bạn bè',C:'Bài học từ thầy cô'},'medium',null,4),
      r(id,2,'single_choice','Từ "gắn bó" trong câu "Em gắn bó với mái trường này." có nghĩa là gì?',[{key:'A',text:'Không muốn rời xa'},{key:'B',text:'Xa cách'},{key:'C',text:'Không có cảm xúc'}],'A','medium','Gắn bó nghĩa là thân thiết, không muốn rời xa',5),
      r(id,2,'true_false','Câu "Trường ơi, em nhớ trường lắm!" là câu cảm thán. Đúng hay sai?',null,true,'medium','Câu cảm thán bày tỏ cảm xúc mạnh với dấu chấm than',6),
      r(id,2,'fill_blank','Những kỷ niệm [b1] ở trường là những kỷ niệm [b2] nhất trong cuộc đời.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thời thơ ấu / học sinh',b2:'đẹp / khó quên'},'medium','Kỷ niệm học sinh là kỷ niệm đẹp',7),
      r(id,2,'single_choice','Bài thơ "Yêu lắm trường ơi!" thuộc chủ đề gì?',[{key:'A',text:'Thiên nhiên'},{key:'B',text:'Tình yêu trường lớp'},{key:'C',text:'Gia đình'}],'B','medium','Bài thơ thể hiện tình yêu với mái trường',8),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn: Em yêu mái trường nhỏ. / Nơi đây em học bao điều hay. / Trường ơi, em nhớ trường mãi mãi!',[{key:'1',text:'Em yêu mái trường nhỏ.'},{key:'2',text:'Nơi đây em học bao điều hay.'},{key:'3',text:'Trường ơi, em nhớ trường mãi mãi!'}],['1','2','3'],'medium','Yêu trường → Lý do → Kết cảm xúc',9),
      r(id,2,'single_choice','Từ "thân thương" trong câu "Mái trường thân thương" là từ loại gì?',[{key:'A',text:'Danh từ'},{key:'B',text:'Tính từ'},{key:'C',text:'Động từ'}],'B','medium','Thân thương là tính từ chỉ sự thân thiết, yêu mến',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Mái trường như người mẹ hiền ôm ấp chúng em." sử dụng biện pháp tu từ gì?',[{key:'A',text:'Điệp từ'},{key:'B',text:'So sánh'},{key:'C',text:'Liệt kê'}],'B','hard','So sánh mái trường với người mẹ hiền',1),
      r(id,3,'true_false','Từ "thân thương" và "yêu quý" là hai từ đồng nghĩa. Đúng hay sai?',null,true,'hard','Thân thương và yêu quý đều chỉ sự gắn bó, yêu mến',2),
      r(id,3,'fill_blank','Câu "Yêu lắm, trường ơi!" có [b1] tiếng và thể hiện [b2] của học sinh với trường.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'tình cảm / tình yêu'},'hard','4 tiếng: Yêu / lắm / trường / ơi',3),
      r(id,3,'matching','Xác định biện pháp tu từ trong các câu:',[{key:'A',text:'"Trường ơi, trường ơi, em nhớ trường!"'},{key:'B',text:'"Mái trường như vòng tay mẹ."'},{key:'C',text:'"Trường học, nơi em gặp thầy cô, bạn bè, sách vở."'}],{A:'Điệp từ',B:'So sánh',C:'Liệt kê'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn hay: Mỗi buổi sáng đến trường, lòng em rộn rã. / Em gặp thầy cô và bạn bè thân thiết. / Trường học là thiên đường tuổi thơ của em.',[{key:'1',text:'Mỗi buổi sáng đến trường, lòng em rộn rã.'},{key:'2',text:'Em gặp thầy cô và bạn bè thân thiết.'},{key:'3',text:'Trường học là thiên đường tuổi thơ của em.'}],['1','2','3'],'hard','Mỗi sáng → Gặp gỡ → Kết luận yêu trường',5),
      r(id,3,'single_choice','Tại sao tác giả gọi trường học là "thiên đường tuổi thơ"?',[{key:'A',text:'Vì trường học ở trên cao'},{key:'B',text:'Vì trường học mang lại niềm vui, hạnh phúc và kiến thức cho trẻ em'},{key:'C',text:'Vì trường học rất đẹp'}],'B','hard','Thiên đường ẩn dụ: nơi hạnh phúc, tươi đẹp như thiên đường',6),
      r(id,3,'true_false','Tình yêu trường lớp giúp học sinh học tập hăng say hơn. Đúng hay sai?',null,true,'hard','Yêu trường giúp học sinh có động lực học tập',7),
      r(id,3,'fill_blank','Kỷ niệm về [b1] và [b2] ở trường là những điều em sẽ nhớ mãi.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bạn bè / thầy cô',b2:'giờ học / giờ chơi'},'hard','Kỷ niệm về thầy cô, bạn bè và giờ học',8),
      r(id,3,'single_choice','Từ "trân trọng" có nghĩa là gì trong ngữ cảnh "Em trân trọng những năm tháng học trò"?',[{key:'A',text:'Biết ơn và gìn giữ những giá trị quý báu'},{key:'B',text:'Cất giữ đồ vật cẩn thận'},{key:'C',text:'Không quan tâm'}],'A','hard','Trân trọng là biết giá trị và gìn giữ điều quý báu',9),
      r(id,3,'matching','Nối từ với từ trái nghĩa:',[{key:'A',text:'Yêu mến'},{key:'B',text:'Gắn bó'},{key:'C',text:'Thân thiết'}],{A:'Ghét bỏ',B:'Xa cách',C:'Xa lạ'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1159: Bài 14 - Em học vẽ ───────────────────────────────────────────────
  {
    const id = 1159;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Màu nào là màu của bầu trời trong sáng?',[{key:'A',text:'Đỏ'},{key:'B',text:'Xanh dương'},{key:'C',text:'Vàng'}],'B','easy','Bầu trời xanh dương / xanh da trời',1),
      r(id,1,'single_choice','Màu nào là màu của lá cây?',[{key:'A',text:'Đỏ'},{key:'B',text:'Xanh lá'},{key:'C',text:'Tím'}],'B','easy','Lá cây có màu xanh lá cây',2),
      r(id,1,'single_choice','Hình nào có 3 cạnh và 3 góc?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],'C','easy','Hình tam giác có 3 cạnh và 3 góc',3),
      r(id,1,'true_false','Hình vuông có 4 cạnh bằng nhau. Đúng hay sai?',null,true,'easy','Hình vuông có 4 cạnh bằng nhau và 4 góc vuông',4),
      r(id,1,'true_false','Màu cam pha từ màu đỏ và màu xanh lá. Đúng hay sai?',null,false,'easy','Màu cam pha từ màu đỏ và màu vàng',5),
      r(id,1,'matching','Nối màu với vật có màu đó:',[{key:'A',text:'Đỏ'},{key:'B',text:'Vàng'},{key:'C',text:'Xanh lá'}],{A:'Quả cà chua chín',B:'Quả chanh vàng',C:'Lá cây'},'easy',null,6),
      r(id,1,'fill_blank','Em dùng màu [b1] để vẽ mặt trời và màu [b2] để vẽ bầu trời.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vàng / đỏ cam',b2:'xanh dương / xanh da trời'},'easy','Mặt trời vàng, bầu trời xanh',7),
      r(id,1,'single_choice','Màu nào KHÔNG thuộc cầu vồng?',[{key:'A',text:'Đỏ'},{key:'B',text:'Đen'},{key:'C',text:'Tím'}],'B','easy','Cầu vồng có 7 màu: đỏ, cam, vàng, lục, lam, chàm, tím. Không có màu đen',8),
      r(id,1,'sorting','Sắp xếp màu cầu vồng theo thứ tự từ ngoài vào trong: Cam, Đỏ, Vàng, Xanh lục',[{key:'1',text:'Cam'},{key:'2',text:'Đỏ'},{key:'3',text:'Vàng'},{key:'4',text:'Xanh lục'}],['2','1','3','4'],'easy','Đỏ, Cam, Vàng, Xanh lục theo thứ tự cầu vồng',9),
      r(id,1,'single_choice','Dụng cụ nào dùng để vẽ?',[{key:'A',text:'Thước kẻ'},{key:'B',text:'Bút màu / bút chì màu'},{key:'C',text:'Cục tẩy'}],'B','easy','Bút màu dùng để vẽ và tô màu',10),
      // Ex2 medium
      r(id,2,'single_choice','Để vẽ một bức tranh, các bước nào là đúng thứ tự?',[{key:'A',text:'Tô màu → Phác thảo → Vẽ nét chính'},{key:'B',text:'Phác thảo → Vẽ nét chính → Tô màu'},{key:'C',text:'Vẽ nét chính → Phác thảo → Tô màu'}],'B','medium','Phác thảo → Vẽ → Tô màu là thứ tự đúng',1),
      r(id,2,'single_choice','Câu "Em vẽ một bức tranh đẹp về trường học." có mấy từ?',[{key:'A',text:'6 từ'},{key:'B',text:'8 từ'},{key:'C',text:'7 từ'}],'C','medium','Em/vẽ/một/bức tranh/đẹp/về/trường học = 7 từ',2),
      r(id,2,'true_false','Khi học vẽ, em cần quan sát vật mẫu trước khi vẽ. Đúng hay sai?',null,true,'medium','Quan sát kỹ trước khi vẽ giúp vẽ đúng và đẹp hơn',3),
      r(id,2,'fill_blank','Để vẽ tranh phong cảnh, em dùng màu [b1] cho cây cỏ và màu [b2] cho bầu trời.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'xanh lá',b2:'xanh dương / xanh da trời'},'medium','Màu cho cây và bầu trời trong tranh phong cảnh',4),
      r(id,2,'matching','Nối màu với cách pha:',[{key:'A',text:'Màu cam'},{key:'B',text:'Màu xanh lá đậm'},{key:'C',text:'Màu hồng'}],{A:'Đỏ + Vàng',B:'Xanh lá + Đen',C:'Đỏ + Trắng'},'medium',null,5),
      r(id,2,'single_choice','Từ "sáng tạo" trong học vẽ có nghĩa là gì?',[{key:'A',text:'Vẽ lại y hệt mẫu'},{key:'B',text:'Nghĩ ra cái mới, thể hiện ý tưởng riêng'},{key:'C',text:'Vẽ nhanh cho xong'}],'B','medium','Sáng tạo là tạo ra điều mới, không copy',6),
      r(id,2,'true_false','Học vẽ giúp em phát triển khả năng quan sát và sáng tạo. Đúng hay sai?',null,true,'medium','Vẽ rèn luyện quan sát, sáng tạo và sự kiên nhẫn',7),
      r(id,2,'fill_blank','Em [b1] bức tranh về gia đình em. Em vẽ [b2] người đang [b3] cùng nhau.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'vẽ',b2:'bốn / ba',b3:'ngồi ăn / vui chơi'},'medium','Mô tả bức tranh về gia đình',8),
      r(id,2,'sorting','Sắp xếp các bước vẽ tranh: Vẽ nét viền bằng bút chì đen, Xem lại và sửa, Phác thảo nhẹ bằng bút chì, Tô màu',[{key:'1',text:'Vẽ nét viền bằng bút chì đen'},{key:'2',text:'Xem lại và sửa'},{key:'3',text:'Phác thảo nhẹ bằng bút chì'},{key:'4',text:'Tô màu'}],['3','1','4','2'],'medium','Phác thảo → Vẽ viền → Tô màu → Xem lại',9),
      r(id,2,'single_choice','Hình chữ nhật khác hình vuông ở điểm nào?',[{key:'A',text:'Hình chữ nhật có 4 góc, hình vuông có 3 góc'},{key:'B',text:'Hình chữ nhật có hai cặp cạnh bằng nhau, hình vuông có 4 cạnh bằng nhau'},{key:'C',text:'Hình chữ nhật có màu khác'}],'B','medium','Hình chữ nhật: 2 cặp cạnh bằng nhau; hình vuông: 4 cạnh bằng nhau',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Bức tranh em vẽ sống động như thật." sử dụng biện pháp gì?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp từ'}],'B','hard','So sánh bức tranh như thật',1),
      r(id,3,'true_false','Màu sắc trong tranh có thể truyền tải cảm xúc. Đúng hay sai?',null,true,'hard','Màu đỏ gợi sự nóng bỏng; màu xanh gợi sự bình yên...',2),
      r(id,3,'fill_blank','Tranh vẽ bằng tay gọi là tranh [b1]. Tranh chụp bằng máy gọi là [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vẽ tay / tranh thủ công',b2:'ảnh / hình chụp'},'hard','Phân biệt tranh vẽ và ảnh chụp',3),
      r(id,3,'matching','Nối màu với cảm xúc thường gợi lên:',[{key:'A',text:'Màu đỏ'},{key:'B',text:'Màu xanh dương'},{key:'C',text:'Màu vàng'}],{A:'Nóng bỏng, mạnh mẽ',B:'Bình yên, mát mẻ',C:'Vui vẻ, ấm áp'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn mô tả bức tranh: Em tô màu xanh cho bầu trời. / Em vẽ một bức tranh mùa hè. / Em vẽ thêm mặt trời vàng rực rỡ.',[{key:'1',text:'Em tô màu xanh cho bầu trời.'},{key:'2',text:'Em vẽ một bức tranh mùa hè.'},{key:'3',text:'Em vẽ thêm mặt trời vàng rực rỡ.'}],['2','1','3'],'hard','Giới thiệu → Chi tiết 1 → Chi tiết 2',5),
      r(id,3,'single_choice','Tính từ nào không dùng để mô tả màu sắc?',[{key:'A',text:'Tươi sáng'},{key:'B',text:'Chạy nhanh'},{key:'C',text:'Đậm nhạt'}],'B','hard','Chạy nhanh là mô tả hành động, không phải màu sắc',6),
      r(id,3,'true_false','Trong một bức tranh, màu nền và màu chính cần phối hợp hài hòa. Đúng hay sai?',null,true,'hard','Màu nền và màu chính cần hài hòa để tranh đẹp',7),
      r(id,3,'fill_blank','Bức tranh em vẽ thể hiện [b1] của em và kể một [b2] qua hình ảnh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sự sáng tạo / ý tưởng',b2:'câu chuyện / điều gì đó'},'hard','Tranh thể hiện sáng tạo và kể chuyện qua hình ảnh',8),
      r(id,3,'single_choice','Câu nào mô tả bức tranh hay nhất?',[{key:'A',text:'"Bức tranh có màu đỏ và xanh."'},{key:'B',text:'"Bức tranh mô tả cảnh hoàng hôn rực rỡ trên biển."'},{key:'C',text:'"Bức tranh to và có nhiều màu."'}],'B','hard','Câu B mô tả cụ thể, gợi hình ảnh và cảm xúc nhất',9),
      r(id,3,'matching','Nối từ chỉ nghề nghiệp với sản phẩm tạo ra:',[{key:'A',text:'Họa sĩ'},{key:'B',text:'Nhà điêu khắc'},{key:'C',text:'Nhiếp ảnh gia'}],{A:'Tranh vẽ',B:'Tượng điêu khắc',C:'Ảnh chụp'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1160: Bài 15 - Cuốn sách của em ───────────────────────────────────────
  {
    const id = 1160;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Phần bên ngoài cùng bảo vệ cuốn sách gọi là gì?',[{key:'A',text:'Trang sách'},{key:'B',text:'Bìa sách'},{key:'C',text:'Gáy sách'}],'B','easy','Bìa sách là phần ngoài cùng bảo vệ cuốn sách',1),
      r(id,1,'single_choice','Người viết sách gọi là gì?',[{key:'A',text:'Họa sĩ'},{key:'B',text:'Tác giả'},{key:'C',text:'Độc giả'}],'B','easy','Tác giả là người viết cuốn sách',2),
      r(id,1,'single_choice','Nơi người ta mượn sách để đọc gọi là gì?',[{key:'A',text:'Nhà sách'},{key:'B',text:'Thư viện'},{key:'C',text:'Hiệu sách'}],'B','easy','Thư viện là nơi cho mượn sách để đọc',3),
      r(id,1,'true_false','Sách giúp người đọc học hỏi thêm kiến thức. Đúng hay sai?',null,true,'easy','Sách là nguồn kiến thức quý giá',4),
      r(id,1,'true_false','Đọc sách nhiều sẽ làm hỏng mắt nếu đọc sai cách. Đúng hay sai?',null,true,'easy','Đọc sai cách (thiếu sáng, quá gần) có thể ảnh hưởng mắt',5),
      r(id,1,'matching','Nối bộ phận với mô tả:',[{key:'A',text:'Bìa sách'},{key:'B',text:'Trang sách'},{key:'C',text:'Gáy sách'}],{A:'Phần bên ngoài có hình và tên sách',B:'Một tờ bên trong sách',C:'Phần nối các trang lại với nhau'},'easy',null,6),
      r(id,1,'fill_blank','Cuốn sách gồm nhiều [b1] in chữ và hình ảnh.',[{key:'b1',text:''}],{b1:'trang'},'easy','Sách gồm nhiều trang',7),
      r(id,1,'single_choice','Cách đọc sách đúng là gì?',[{key:'A',text:'Đọc trong bóng tối'},{key:'B',text:'Đọc ở nơi có đủ ánh sáng, ngồi thẳng'},{key:'C',text:'Đọc trong khi đi'}],'B','easy','Đọc đúng cách: đủ ánh sáng, tư thế đúng',8),
      r(id,1,'sorting','Sắp xếp các bộ phận của cuốn sách từ ngoài vào trong: Trang sách, Gáy sách, Bìa trước, Bìa sau',[{key:'1',text:'Trang sách'},{key:'2',text:'Gáy sách'},{key:'3',text:'Bìa trước'},{key:'4',text:'Bìa sau'}],['3','4','2','1'],'easy','Bìa trước → Bìa sau → Gáy → Trang trong',9),
      r(id,1,'single_choice','Từ nào dùng để chỉ người đọc sách?',[{key:'A',text:'Tác giả'},{key:'B',text:'Độc giả'},{key:'C',text:'Nhà xuất bản'}],'B','easy','Độc giả là người đọc sách',10),
      // Ex2 medium
      r(id,2,'single_choice','Vì sao đọc sách có ích?',[{key:'A',text:'Vì sách đẹp'},{key:'B',text:'Vì sách cung cấp kiến thức, mở rộng hiểu biết và phát triển ngôn ngữ'},{key:'C',text:'Vì mọi người đều đọc'}],'B','medium','Đọc sách mang lại kiến thức và phát triển ngôn ngữ',1),
      r(id,2,'matching','Nối thể loại sách với đặc điểm:',[{key:'A',text:'Truyện'},{key:'B',text:'Thơ'},{key:'C',text:'Sách khoa học'}],{A:'Có nhân vật và cốt truyện',B:'Có vần điệu và nhịp điệu',C:'Cung cấp kiến thức khoa học'},'medium',null,2),
      r(id,2,'true_false','Thư viện trường là nơi học sinh có thể mượn sách miễn phí để đọc. Đúng hay sai?',null,true,'medium','Thư viện trường cho học sinh mượn sách để đọc',3),
      r(id,2,'fill_blank','Em thích đọc [b1] vì câu chuyện rất [b2] và có nhiều điều hay.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'truyện / thơ / sách',b2:'hấp dẫn / thú vị'},'medium','Học sinh tự điền sách yêu thích',4),
      r(id,2,'single_choice','Thông tin nào thường có trên bìa sách?',[{key:'A',text:'Giá sách và tên hiệu sách'},{key:'B',text:'Tên sách và tên tác giả'},{key:'C',text:'Số điện thoại tác giả'}],'B','medium','Bìa sách thường có tên sách và tên tác giả',5),
      r(id,2,'true_false','Sách điện tử (ebook) cũng là sách nhưng đọc trên thiết bị điện tử. Đúng hay sai?',null,true,'medium','Ebook là sách kỹ thuật số đọc trên máy tính hoặc điện thoại',6),
      r(id,2,'fill_blank','Một cuốn sách hay là cuốn sách [b1] người đọc và giúp người đọc [b2] thêm điều gì đó.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'thu hút / lôi cuốn',b2:'học / hiểu / biết'},'medium','Sách hay lôi cuốn và giúp học hỏi',7),
      r(id,2,'single_choice','Câu "Sách là người bạn không bao giờ bỏ ta." sử dụng biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp từ'}],'B','medium','Nhân hóa: sách được gán đặc tính của người bạn',8),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn: Sách mang lại cho em nhiều điều thú vị. / Em rất yêu đọc sách. / Mỗi cuốn sách là một thế giới kỳ diệu.',[{key:'1',text:'Sách mang lại cho em nhiều điều thú vị.'},{key:'2',text:'Em rất yêu đọc sách.'},{key:'3',text:'Mỗi cuốn sách là một thế giới kỳ diệu.'}],['2','1','3'],'medium','Yêu sách → Sách mang lại gì → Kết luận',9),
      r(id,2,'single_choice','Từ "xuất bản" trong "nhà xuất bản" có nghĩa là gì?',[{key:'A',text:'In và phát hành sách'},{key:'B',text:'Viết sách'},{key:'C',text:'Bán sách'}],'A','medium','Xuất bản là in ấn và phát hành sách',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Mỗi cuốn sách là một chuyến đi khám phá." là biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Ẩn dụ'},{key:'C',text:'Điệp từ'}],'B','hard','Ẩn dụ: sách được so sánh ngầm với chuyến đi',1),
      r(id,3,'true_false','Đọc sách cần hiểu nội dung, không chỉ đọc qua loa. Đúng hay sai?',null,true,'hard','Đọc hiểu quan trọng hơn đọc nhanh mà không hiểu',2),
      r(id,3,'fill_blank','Thể loại sách [b1] có nhân vật, cốt truyện. Thể loại [b2] có vần điệu và nhịp điệu.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'truyện',b2:'thơ'},'hard','Phân biệt truyện và thơ',3),
      r(id,3,'matching','Nối thể loại với ví dụ tác phẩm phù hợp:',[{key:'A',text:'Truyện cổ tích'},{key:'B',text:'Thơ thiếu nhi'},{key:'C',text:'Sách khoa học'}],{A:'Tấm Cám, Cô bé Lọ Lem',B:'Thơ Trần Đăng Khoa',C:'Sách về động vật, vũ trụ'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp các bước đọc sách hiệu quả: Tóm tắt nội dung đã đọc, Chọn sách phù hợp, Đọc chú ý và ghi chép, Đặt câu hỏi trước khi đọc',[{key:'1',text:'Tóm tắt nội dung đã đọc'},{key:'2',text:'Chọn sách phù hợp'},{key:'3',text:'Đọc chú ý và ghi chép'},{key:'4',text:'Đặt câu hỏi trước khi đọc'}],['2','4','3','1'],'hard','Chọn sách → Đặt câu hỏi → Đọc ghi chép → Tóm tắt',5),
      r(id,3,'single_choice','Câu "Đọc một cuốn sách hay giống như nói chuyện với người khôn ngoan." là biện pháp gì?',[{key:'A',text:'Điệp từ'},{key:'B',text:'So sánh'},{key:'C',text:'Nhân hóa'}],'B','hard','So sánh: đọc sách như nói chuyện với người khôn',1),
      r(id,3,'true_false','Sách không chỉ chứa chữ mà còn có thể chứa hình ảnh, bản đồ, sơ đồ. Đúng hay sai?',null,true,'hard','Nhiều sách có hình ảnh minh họa, bản đồ, sơ đồ',7),
      r(id,3,'fill_blank','Đọc sách mỗi ngày giúp em [b1] từ vựng và [b2] khả năng viết văn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mở rộng / phong phú',b2:'nâng cao / phát triển'},'hard','Đọc sách giúp mở rộng từ vựng và viết văn tốt hơn',8),
      r(id,3,'single_choice','Vì sao nên đọc nhiều thể loại sách khác nhau?',[{key:'A',text:'Vì không có sách nào hoàn toàn hay'},{key:'B',text:'Vì mỗi thể loại giúp phát triển một kỹ năng khác nhau'},{key:'C',text:'Vì đọc nhiều mới nhanh hết sách'}],'B','hard','Mỗi thể loại phát triển kỹ năng khác nhau',9),
      r(id,3,'matching','Nối từ với nghĩa trong ngữ cảnh đọc sách:',[{key:'A',text:'Tác giả'},{key:'B',text:'Độc giả'},{key:'C',text:'Nhà xuất bản'}],{A:'Người viết sách',B:'Người đọc sách',C:'Đơn vị in và phát hành sách'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1161: Bài 16 - Khi trang sách mở ra ───────────────────────────────────
  {
    const id = 1161;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Từ nào chỉ nhân vật trong câu chuyện?',[{key:'A',text:'Cốt truyện'},{key:'B',text:'Nhân vật'},{key:'C',text:'Trang sách'}],'B','easy','Nhân vật là người, con vật hoặc đồ vật trong câu chuyện',1),
      r(id,1,'single_choice','Từ nào có nghĩa là tưởng ra điều gì đó trong đầu?',[{key:'A',text:'Ngủ mơ'},{key:'B',text:'Tưởng tượng'},{key:'C',text:'Nhớ lại'}],'B','easy','Tưởng tượng là nghĩ ra điều gì đó không có thật',2),
      r(id,1,'single_choice','Câu chuyện cổ tích thường có gì?',[{key:'A',text:'Phép màu, nhân vật tốt xấu rõ ràng'},{key:'B',text:'Công thức toán học'},{key:'C',text:'Bản đồ địa lý'}],'A','easy','Cổ tích thường có phép màu và nhân vật tốt - xấu rõ ràng',3),
      r(id,1,'true_false','Đọc sách giúp em tưởng tượng ra những thế giới kỳ diệu. Đúng hay sai?',null,true,'easy','Sách kích thích trí tưởng tượng',4),
      r(id,1,'true_false','Nhân vật trong truyện luôn phải là người thật. Đúng hay sai?',null,false,'easy','Nhân vật có thể là con vật, đồ vật, hay sinh vật tưởng tượng',5),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'Tưởng tượng'},{key:'B',text:'Câu chuyện'},{key:'C',text:'Phép màu'}],{A:'Nghĩ ra điều không có thật',B:'Chuỗi sự việc có nhân vật',C:'Điều kỳ diệu ngoài tự nhiên'},'easy',null,6),
      r(id,1,'fill_blank','Khi đọc sách, em như được [b1] đến những vùng đất [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'du lịch / bay',b2:'xa xôi / kỳ diệu'},'easy','Sách đưa người đọc đến những thế giới mới',7),
      r(id,1,'single_choice','Từ "kỳ diệu" có nghĩa là gì?',[{key:'A',text:'Bình thường, thường gặp'},{key:'B',text:'Tuyệt vời, kỳ lạ và đáng ngạc nhiên'},{key:'C',text:'Xấu xí'}],'B','easy','Kỳ diệu là điều tuyệt vời và đáng ngạc nhiên',8),
      r(id,1,'sorting','Sắp xếp từ chỉ mức độ kỳ diệu từ ít đến nhiều: Thú vị, Bình thường, Tuyệt vời, Kỳ diệu',[{key:'1',text:'Thú vị'},{key:'2',text:'Bình thường'},{key:'3',text:'Tuyệt vời'},{key:'4',text:'Kỳ diệu'}],['2','1','3','4'],'easy','Bình thường < Thú vị < Tuyệt vời < Kỳ diệu',9),
      r(id,1,'single_choice','Điều gì xảy ra "khi trang sách mở ra"?',[{key:'A',text:'Chỉ có chữ để đọc'},{key:'B',text:'Một thế giới mới mở ra trong trí tưởng tượng của người đọc'},{key:'C',text:'Sách bị ướt'}],'B','easy','Trang sách mở ra là thế giới trí tưởng tượng mở ra',10),
      // Ex2 medium
      r(id,2,'single_choice','Câu "Khi trang sách mở ra, em như được bay vào thế giới kỳ diệu." sử dụng biện pháp gì?',[{key:'A',text:'Điệp từ'},{key:'B',text:'So sánh'},{key:'C',text:'Liệt kê'}],'B','medium','So sánh: đọc sách như bay vào thế giới kỳ diệu',1),
      r(id,2,'true_false','Thế giới trong sách và thế giới thực có thể giống và khác nhau. Đúng hay sai?',null,true,'medium','Sách phản ánh thực tế nhưng cũng có nhiều yếu tố hư cấu',2),
      r(id,2,'fill_blank','Nhân vật trong truyện cổ tích thường có [b1] ma thuật và đại diện cho [b2] hoặc ác.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'phép màu / năng lực',b2:'thiện / tốt'},'medium','Nhân vật cổ tích có phép màu và tượng trưng cho thiện ác',3),
      r(id,2,'matching','Nối loại sách với thế giới nó đưa người đọc đến:',[{key:'A',text:'Truyện cổ tích'},{key:'B',text:'Sách lịch sử'},{key:'C',text:'Truyện khoa học viễn tưởng'}],{A:'Thế giới phép màu, thần tiên',B:'Quá khứ, các sự kiện lịch sử',C:'Tương lai, vũ trụ, robot'},'medium',null,4),
      r(id,2,'single_choice','Tại sao nên đọc sách trước khi ngủ?',[{key:'A',text:'Để mắt mờ đi'},{key:'B',text:'Để trí tưởng tượng hoạt động và ngủ ngon hơn'},{key:'C',text:'Vì không có gì khác làm'}],'B','medium','Đọc sách trước ngủ kích thích trí tưởng tượng',5),
      r(id,2,'true_false','Câu chuyện hư cấu là câu chuyện không có thật nhưng mang ý nghĩa giáo dục. Đúng hay sai?',null,true,'medium','Hư cấu không có thật nhưng vẫn có thể dạy bài học sống',6),
      r(id,2,'fill_blank','Đọc sách giúp em [b1] trí tưởng tượng và [b2] những điều mới mẻ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'phát triển / mở rộng',b2:'khám phá / học hỏi'},'medium','Sách phát triển trí tưởng tượng và khám phá',7),
      r(id,2,'single_choice','Câu "Trong sách có cả đại dương, núi cao và những vùng đất xa xôi." cho biết điều gì về sách?',[{key:'A',text:'Sách nặng nề và dày'},{key:'B',text:'Sách chứa đựng vô số thế giới và kiến thức'},{key:'C',text:'Sách vẽ bản đồ'}],'B','medium','Sách chứa đựng vô số thế giới và kiến thức',8),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn hay: Em nhắm mắt và tưởng tượng. / Khi trang sách mở ra, em thấy bao điều kỳ diệu. / Em như đang bay vào một thế giới khác.',[{key:'1',text:'Em nhắm mắt và tưởng tượng.'},{key:'2',text:'Khi trang sách mở ra, em thấy bao điều kỳ diệu.'},{key:'3',text:'Em như đang bay vào một thế giới khác.'}],['2','1','3'],'medium','Trang sách → Tưởng tượng → Cảm giác',9),
      r(id,2,'single_choice','Từ "hư cấu" nghĩa là gì?',[{key:'A',text:'Câu chuyện có thật'},{key:'B',text:'Câu chuyện do tác giả tưởng tượng ra'},{key:'C',text:'Câu chuyện cũ'}],'B','medium','Hư cấu là nội dung được tác giả tưởng tượng sáng tạo',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Sách là cánh cửa mở ra thế giới." là biện pháp tu từ gì?',[{key:'A',text:'So sánh'},{key:'B',text:'Ẩn dụ'},{key:'C',text:'Nhân hóa'}],'B','hard','Ẩn dụ: sách được gọi là cánh cửa, không có từ so sánh',1),
      r(id,3,'true_false','Phân biệt thực tế và hư cấu là kỹ năng quan trọng khi đọc sách. Đúng hay sai?',null,true,'hard','Biết phân biệt thực - hư giúp đọc hiểu tốt hơn',2),
      r(id,3,'fill_blank','Thế giới trong sách phong phú hơn thế giới thực vì sách có thể [b1] và vượt qua [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sáng tạo / tưởng tượng',b2:'giới hạn / thực tế'},'hard','Sách có thể sáng tạo vượt qua giới hạn thực tế',3),
      r(id,3,'matching','Nối ý nghĩa ẩn dụ với câu văn:',[{key:'A',text:'"Sách là người thầy im lặng."'},{key:'B',text:'"Mỗi trang sách là một bước chân khám phá."'},{key:'C',text:'"Sách là chiếc chìa khóa tri thức."'}],{A:'Sách dạy ta dù không nói lời nào',B:'Đọc sách là hành trình khám phá',C:'Sách mở ra cánh cửa kiến thức'},'hard',null,4),
      r(id,3,'sorting','Sắp xếp lập luận về lợi ích đọc sách: Vì vậy, em càng đọc càng giỏi hơn. / Mỗi cuốn sách dạy em điều gì đó mới. / Đọc sách mở rộng kiến thức.',[{key:'1',text:'Vì vậy, em càng đọc càng giỏi hơn.'},{key:'2',text:'Mỗi cuốn sách dạy em điều gì đó mới.'},{key:'3',text:'Đọc sách mở rộng kiến thức.'}],['3','2','1'],'hard','Luận điểm → Luận cứ → Kết luận',5),
      r(id,3,'single_choice','Điểm khác biệt giữa thực tế và hư cấu trong câu chuyện là gì?',[{key:'A',text:'Thực tế thú vị hơn hư cấu'},{key:'B',text:'Thực tế đã xảy ra; hư cấu là sản phẩm trí tưởng tượng'},{key:'C',text:'Hư cấu luôn có phép màu'}],'B','hard','Thực tế = đã xảy ra; hư cấu = do tưởng tượng',6),
      r(id,3,'true_false','Trí tưởng tượng là kỹ năng quan trọng cần được rèn luyện. Đúng hay sai?',null,true,'hard','Trí tưởng tượng giúp sáng tạo, giải quyết vấn đề',7),
      r(id,3,'fill_blank','Khi trang sách mở ra, [b1] của em cũng mở ra và em bắt đầu [b2] vào thế giới của sách.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'trí tưởng tượng / tâm hồn',b2:'chìm đắm / bước'},'hard','Tưởng tượng mở ra khi đọc sách',8),
      r(id,3,'single_choice','Câu "Mỗi cuốn sách đưa em đến một thế giới khác." có ý nghĩa gì sâu xa?',[{key:'A',text:'Sách có khả năng dịch chuyển vật lý'},{key:'B',text:'Đọc sách mở rộng tầm nhìn, cho em trải nghiệm những điều mới'},{key:'C',text:'Em cần đọc nhiều sách về địa lý'}],'B','hard','Sách mở rộng tầm nhìn và cho trải nghiệm mới qua tưởng tượng',9),
      r(id,3,'matching','Nối câu với ý nghĩa chính:',[{key:'A',text:'"Khi trang sách mở ra, em thấy cả thế giới."'},{key:'B',text:'"Nhân vật trong sách dạy em bài học cuộc sống."'},{key:'C',text:'"Đọc sách là hành trình không bao giờ kết thúc."'}],{A:'Sách chứa đựng thế giới vô hạn',B:'Nhân vật truyền cảm hứng và bài học',C:'Đọc sách là việc làm suốt đời'},'hard',null,10),
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
