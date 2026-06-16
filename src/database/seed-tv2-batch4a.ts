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

  // ─── 1194: Bài 17 – Những cách chào độc đáo ────────────────────────────────
  {
    const id = 1194;
    const rows: any[][] = [
      // Ex1 easy – greeting vocabulary
      r(id,1,'single_choice','Từ "chào" dùng để làm gì?',[{key:'A',text:'Hỏi tên'},{key:'B',text:'Nói lời chào hỏi'},{key:'C',text:'Tạm biệt'}],'B','easy','Chào là lời nói khi gặp nhau hoặc chia tay',1),
      r(id,1,'single_choice','Người Nhật Bản thường chào nhau bằng cách nào?',[{key:'A',text:'Bắt tay'},{key:'B',text:'Cúi đầu'},{key:'C',text:'Ôm nhau'}],'B','easy','Người Nhật cúi đầu khi chào để thể hiện sự tôn trọng',2),
      r(id,1,'single_choice','Hành động nào thể hiện lời chào ở nhiều nước phương Tây?',[{key:'A',text:'Cúi đầu'},{key:'B',text:'Chắp tay'},{key:'C',text:'Bắt tay'}],'C','easy','Bắt tay là cách chào phổ biến ở các nước phương Tây',3),
      r(id,1,'true_false','Mỗi quốc gia có thể có cách chào riêng. Đúng hay sai?',null,true,'easy','Mỗi nền văn hóa có cách chào hỏi đặc trưng riêng',4),
      r(id,1,'true_false','Cúi đầu và bắt tay là cùng một cách chào. Đúng hay sai?',null,false,'easy','Cúi đầu và bắt tay là hai cách chào khác nhau',5),
      r(id,1,'fill_blank','Người Việt Nam thường nói "[b1]" khi gặp nhau.',[{key:'b1',text:''}],{b1:'xin chào'},'easy','Lời chào phổ biến của người Việt là "xin chào"',6),
      r(id,1,'fill_blank','Ôm nhau và [b1] má là cách chào của nhiều nước châu Âu.',[{key:'b1',text:''}],{b1:'hôn'},'easy','Hôn má là cách chào thể hiện sự thân mật ở châu Âu',7),
      r(id,1,'sorting','Sắp xếp các từ thành câu: "nhau / chào / Chúng / hỏi / ta"',[{key:'1',text:'nhau'},{key:'2',text:'chào'},{key:'3',text:'Chúng'},{key:'4',text:'hỏi'},{key:'5',text:'ta'}],['3','5','2','4','1'],'easy','Chúng ta chào hỏi nhau',8),
      r(id,1,'true_false','Hôn má là cách chào phổ biến ở Nhật Bản. Đúng hay sai?',null,false,'easy','Ở Nhật Bản người ta cúi đầu chào, không phải hôn má',9),
      r(id,1,'single_choice','Từ nào KHÔNG phải là từ chỉ cách chào hỏi?',[{key:'A',text:'Cúi đầu'},{key:'B',text:'Bắt tay'},{key:'C',text:'Chạy nhảy'}],'C','easy','Chạy nhảy là hoạt động vui chơi, không phải cách chào',10),
      // Ex2 medium – match country to greeting style
      r(id,2,'single_choice','Ở Ấn Độ, người ta thường chào bằng cách nào?',[{key:'A',text:'Bắt tay'},{key:'B',text:'Chắp tay và cúi đầu (Namaste)'},{key:'C',text:'Ôm nhau'}],'B','medium','Namaste là cách chào truyền thống của người Ấn Độ, chắp tay trước ngực và cúi đầu',1),
      r(id,2,'matching','Nối quốc gia với cách chào đặc trưng:',[{key:'A',text:'Nhật Bản'},{key:'B',text:'Pháp'},{key:'C',text:'Mỹ'}],{A:'Cúi đầu',B:'Hôn má',C:'Bắt tay'},'medium',null,2),
      r(id,2,'single_choice','Cách chào nào thể hiện sự kính trọng người lớn tuổi ở Việt Nam?',[{key:'A',text:'Nói to và nhìn thẳng mắt'},{key:'B',text:'Khoanh tay cúi đầu chào'},{key:'C',text:'Vẫy tay từ xa'}],'B','medium','Khoanh tay cúi đầu là cách chào lễ phép với người lớn trong văn hóa Việt',3),
      r(id,2,'true_false','Người Thái Lan chào nhau bằng cách chắp tay (Wai). Đúng hay sai?',null,true,'medium','Wai là cách chào truyền thống của Thái Lan, tương tự Namaste của Ấn Độ',4),
      r(id,2,'matching','Nối cách chào với ý nghĩa:',[{key:'A',text:'Cúi đầu'},{key:'B',text:'Ôm nhau'},{key:'C',text:'Bắt tay'}],{A:'Kính trọng',B:'Thân thiết',C:'Lịch sự xã giao'},'medium',null,5),
      r(id,2,'fill_blank','Cách chào bằng cách [b1] tay thể hiện sự thân thiện và tôn trọng lẫn nhau.',[{key:'b1',text:''}],{b1:'bắt'},'medium','Bắt tay là cử chỉ thể hiện sự thân thiện và tôn trọng',6),
      r(id,2,'single_choice','Điều gì giống nhau ở tất cả các cách chào trên thế giới?',[{key:'A',text:'Đều dùng tay'},{key:'B',text:'Đều thể hiện sự tôn trọng và thân thiện'},{key:'C',text:'Đều nói cùng một từ'}],'B','medium','Dù cách chào khác nhau, tất cả đều nhằm thể hiện sự tôn trọng và thân thiện',7),
      r(id,2,'true_false','Bài đọc "Những cách chào độc đáo" cho thấy thế giới có rất nhiều cách chào khác nhau. Đúng hay sai?',null,true,'medium','Bài học giúp trẻ hiểu sự đa dạng văn hóa qua các cách chào hỏi',8),
      r(id,2,'sorting','Sắp xếp theo thứ tự: nước nào cúi đầu chào → chắp tay chào → bắt tay chào',[{key:'1',text:'Mỹ (bắt tay)'},{key:'2',text:'Nhật Bản (cúi đầu)'},{key:'3',text:'Ấn Độ (chắp tay)'}],['2','3','1'],'medium',null,9),
      r(id,2,'single_choice','Vì sao học về các cách chào ở nhiều nước lại quan trọng?',[{key:'A',text:'Để chào giống người nước ngoài'},{key:'B',text:'Để hiểu và tôn trọng văn hóa các dân tộc khác'},{key:'C',text:'Để không cần chào nữa'}],'B','medium','Hiểu văn hóa chào hỏi giúp ta tôn trọng sự khác biệt',10),
      // Ex3 hard – cultural respect, compare to Vietnamese greetings
      r(id,3,'single_choice','Tại sao bài đọc gọi các cách chào là "độc đáo"?',[{key:'A',text:'Vì chúng rất khó học'},{key:'B',text:'Vì mỗi cách chào mang nét đặc sắc riêng của từng nền văn hóa'},{key:'C',text:'Vì chúng đều giống nhau'}],'B','hard','Độc đáo nghĩa là mang tính riêng biệt, đặc trưng của từng dân tộc',1),
      r(id,3,'fill_blank','Khi gặp một người bạn nước ngoài, chúng ta nên [b1] cách chào hỏi của họ để thể hiện sự tôn trọng.',[{key:'b1',text:''}],{b1:'tôn trọng'},'hard','Tôn trọng phong tục chào hỏi của người khác là biểu hiện của văn hóa ứng xử',2),
      r(id,3,'true_false','Cách chào của người Việt Nam chỉ có một kiểu duy nhất. Đúng hay sai?',null,false,'hard','Người Việt có nhiều cách chào tùy theo đối tượng: bạn bè, người lớn, thầy cô',3),
      r(id,3,'single_choice','So sánh cách chào của Việt Nam và Nhật Bản, điểm giống nhau là gì?',[{key:'A',text:'Đều cúi đầu'},{key:'B',text:'Đều thể hiện sự kính trọng'},{key:'C',text:'Đều dùng tiếng Anh'}],'B','hard','Dù hình thức khác nhau nhưng cả hai đều nhằm thể hiện sự kính trọng',4),
      r(id,3,'matching','Nối tình huống với cách chào phù hợp nhất theo văn hóa Việt:',[{key:'A',text:'Gặp thầy cô giáo'},{key:'B',text:'Gặp bạn cùng lớp'},{key:'C',text:'Gặp khách nước ngoài'}],{A:'Khoanh tay cúi đầu chào thầy',B:'Vẫy tay nói xin chào',C:'Mỉm cười bắt tay'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp các bước chào hỏi lịch sự khi gặp người lớn: nhìn vào mặt người lớn / khoanh tay / cúi đầu / nói lời chào',[{key:'1',text:'Nhìn vào mặt người lớn'},{key:'2',text:'Khoanh tay'},{key:'3',text:'Cúi đầu'},{key:'4',text:'Nói lời chào'}],['1','2','3','4'],'hard','Thứ tự chào hỏi đúng cách thể hiện phép lịch sự',6),
      r(id,3,'true_false','Biết nhiều cách chào của các nước giúp chúng ta trở thành công dân toàn cầu tốt hơn. Đúng hay sai?',null,true,'hard','Hiểu văn hóa thế giới giúp trẻ hòa nhập và tôn trọng sự đa dạng',7),
      r(id,3,'single_choice','Điều quan trọng nhất khi chào hỏi là gì?',[{key:'A',text:'Chào thật to để mọi người nghe thấy'},{key:'B',text:'Chào đúng cách của nước mình thôi'},{key:'C',text:'Chào bằng thái độ chân thành và tôn trọng'}],'C','hard','Dù cách chào nào thì thái độ chân thành và tôn trọng mới là điều quan trọng nhất',8),
      r(id,3,'fill_blank','Sự [b1] văn hóa thể hiện qua cách chào hỏi là nét đẹp của mỗi dân tộc.',[{key:'b1',text:''}],{b1:'đa dạng'},'hard','Đa dạng văn hóa là điều đáng trân trọng',9),
      r(id,3,'single_choice','Nếu bạn gặp một người Nhật, cách chào nào sẽ phù hợp nhất?',[{key:'A',text:'Hôn má họ'},{key:'B',text:'Cúi đầu nhẹ để chào'},{key:'C',text:'Nhảy lên vui vẻ'}],'B','hard','Cúi đầu là cách chào truyền thống và được người Nhật trân trọng',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1195: Bài 18 – Thư viện biết đi ───────────────────────────────────────
  {
    const id = 1195;
    const rows: any[][] = [
      // Ex1 easy – mobile library vocabulary
      r(id,1,'single_choice','Thư viện là nơi dùng để làm gì?',[{key:'A',text:'Mua sách'},{key:'B',text:'Mượn và đọc sách'},{key:'C',text:'In sách'}],'B','easy','Thư viện là nơi lưu trữ sách để mọi người mượn và đọc',1),
      r(id,1,'single_choice','Xe thư viện còn được gọi là gì?',[{key:'A',text:'Xe cứu thương'},{key:'B',text:'Thư viện biết đi'},{key:'C',text:'Xe đồ chơi'}],'B','easy','Xe chở sách đến nhiều nơi nên được gọi là thư viện biết đi',2),
      r(id,1,'single_choice','Sau khi mượn sách, chúng ta phải làm gì?',[{key:'A',text:'Giữ mãi'},{key:'B',text:'Trả lại thư viện'},{key:'C',text:'Tặng cho bạn'}],'B','easy','Sách mượn phải được trả lại để người khác có thể đọc',3),
      r(id,1,'true_false','Thư viện chỉ có sách. Đúng hay sai?',null,false,'easy','Thư viện còn có báo, tạp chí, truyện tranh và nhiều tài liệu khác',4),
      r(id,1,'true_false','Xe thư viện mang sách đến những nơi không có thư viện. Đúng hay sai?',null,true,'easy','Đó chính là mục đích của thư viện lưu động',5),
      r(id,1,'fill_blank','Khi đến thư viện, em có thể [b1] sách để đọc ở nhà.',[{key:'b1',text:''}],{b1:'mượn'},'easy','Mượn sách là quyền lợi của người đến thư viện',6),
      r(id,1,'fill_blank','Thư viện [b1] đi là xe chở đầy sách đến phục vụ nhiều nơi.',[{key:'b1',text:''}],{b1:'biết'},'easy','Thư viện biết đi là tên gọi thân mật của xe thư viện lưu động',7),
      r(id,1,'sorting','Sắp xếp các từ thành câu: "sách / mượn / em / thư viện / ở"',[{key:'1',text:'sách'},{key:'2',text:'mượn'},{key:'3',text:'em'},{key:'4',text:'thư viện'},{key:'5',text:'ở'}],['3','2','1','5','4'],'easy','Em mượn sách ở thư viện',8),
      r(id,1,'true_false','Chúng ta nên giữ gìn sách cẩn thận khi mượn. Đúng hay sai?',null,true,'easy','Giữ gìn sách mượn để khi trả vẫn còn tốt cho người khác đọc',9),
      r(id,1,'single_choice','Từ nào KHÔNG liên quan đến thư viện?',[{key:'A',text:'Sách'},{key:'B',text:'Mượn'},{key:'C',text:'Bánh mì'}],'C','easy','Bánh mì không liên quan đến thư viện',10),
      // Ex2 medium – what is mobile library, why important
      r(id,2,'single_choice','Thư viện lưu động giúp ích gì cho các bạn nhỏ ở vùng xa?',[{key:'A',text:'Giúp các bạn mua sách rẻ hơn'},{key:'B',text:'Mang sách đến tận nơi để các bạn được đọc'},{key:'C',text:'Dạy các bạn viết chữ'}],'B','medium','Xe thư viện đến tận vùng xa nơi không có thư viện cố định',1),
      r(id,2,'single_choice','Vì sao gọi là "thư viện biết đi"?',[{key:'A',text:'Vì thư viện có chân để đi'},{key:'B',text:'Vì thư viện di chuyển được từ nơi này sang nơi khác'},{key:'C',text:'Vì sách biết tự đi'}],'B','medium','Gọi là biết đi vì xe thư viện di chuyển đến nhiều địa điểm khác nhau',2),
      r(id,2,'true_false','Thư viện lưu động quan trọng vì không phải nơi nào cũng có thư viện cố định. Đúng hay sai?',null,true,'medium','Đây là lý do chính thư viện lưu động ra đời',3),
      r(id,2,'matching','Nối từ với nghĩa:',[{key:'A',text:'Thư viện'},{key:'B',text:'Mượn'},{key:'C',text:'Trả'}],{A:'Nơi lưu trữ và cho mượn sách',B:'Lấy tạm một thời gian rồi trả',C:'Đưa lại cho chủ'},'medium',null,4),
      r(id,2,'fill_blank','Xe thư viện phục vụ những vùng [b1] xa không có thư viện.',[{key:'b1',text:''}],{b1:'nông thôn'},'medium','Nông thôn và vùng sâu vùng xa thường không có thư viện cố định',5),
      r(id,2,'single_choice','Điều gì xảy ra nếu không có thư viện lưu động ở vùng xa?',[{key:'A',text:'Trẻ em vùng xa không có sách để đọc'},{key:'B',text:'Trẻ em vùng xa đọc nhiều sách hơn'},{key:'C',text:'Không ảnh hưởng gì'}],'A','medium','Không có thư viện, trẻ em vùng xa bị thiếu sách và tài liệu học tập',6),
      r(id,2,'true_false','Mọi người đều có quyền được đọc sách. Đúng hay sai?',null,true,'medium','Quyền được tiếp cận tri thức là quyền của mọi người',7),
      r(id,2,'sorting','Sắp xếp quy trình mượn sách: trả sách / chọn sách / đọc sách / mượn sách',[{key:'1',text:'Trả sách'},{key:'2',text:'Chọn sách'},{key:'3',text:'Đọc sách'},{key:'4',text:'Mượn sách'}],['2','4','3','1'],'medium','Chọn sách → Mượn sách → Đọc sách → Trả sách',8),
      r(id,2,'single_choice','Sách mang lại lợi ích gì cho chúng ta?',[{key:'A',text:'Chỉ để trang trí'},{key:'B',text:'Mang lại kiến thức và niềm vui'},{key:'C',text:'Để bán lấy tiền'}],'B','medium','Sách là kho tàng tri thức và nguồn vui trong cuộc sống',9),
      r(id,2,'fill_blank','Đọc sách giúp em [b1] thêm nhiều điều mới.',[{key:'b1',text:''}],{b1:'học'},'medium','Đọc sách là cách học hiệu quả',10),
      // Ex3 hard – inference about remote children, importance of books
      r(id,3,'single_choice','Qua bài đọc, em thấy tác giả muốn nói điều gì?',[{key:'A',text:'Xe thư viện đẹp và to lớn'},{key:'B',text:'Mọi trẻ em đều xứng đáng được đọc sách dù ở đâu'},{key:'C',text:'Thư viện cố định tốt hơn thư viện lưu động'}],'B','hard','Thông điệp chính là quyền bình đẳng trong tiếp cận tri thức',1),
      r(id,3,'fill_blank','Thư viện lưu động góp phần xóa bỏ sự [b1] về cơ hội đọc sách giữa trẻ em thành thị và nông thôn.',[{key:'b1',text:''}],{b1:'bất bình đẳng'},'hard','Thư viện lưu động giúp san bằng khoảng cách về cơ hội học tập',2),
      r(id,3,'true_false','Trẻ em ở vùng xa có ít cơ hội đọc sách hơn trẻ em ở thành phố. Đúng hay sai?',null,true,'hard','Do thiếu thư viện và sách nên trẻ vùng xa ít có cơ hội đọc sách',3),
      r(id,3,'single_choice','Nếu em là người tổ chức thư viện lưu động, em sẽ chọn loại sách nào để mang đến cho trẻ em?',[{key:'A',text:'Sách toán khó'},{key:'B',text:'Sách truyện, sách khoa học và sách giáo khoa phù hợp lứa tuổi'},{key:'C',text:'Sách người lớn'}],'B','hard','Sách phù hợp lứa tuổi giúp trẻ hứng thú đọc và tiếp thu tốt',4),
      r(id,3,'matching','Nối nguyên nhân với kết quả:',[{key:'A',text:'Có thư viện lưu động'},{key:'B',text:'Thiếu sách'},{key:'C',text:'Đọc nhiều sách'}],{A:'Trẻ vùng xa được đọc sách',B:'Trẻ em ít hiểu biết',C:'Học giỏi và hiểu biết rộng'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp ý chính của bài theo thứ tự logic: sách quan trọng / thư viện lưu động ra đời / vùng xa thiếu sách / trẻ em được đọc sách',[{key:'1',text:'Sách quan trọng'},{key:'2',text:'Thư viện lưu động ra đời'},{key:'3',text:'Vùng xa thiếu sách'},{key:'4',text:'Trẻ em được đọc sách'}],['1','3','2','4'],'hard','Sách quan trọng → Vùng xa thiếu sách → Ra đời thư viện lưu động → Trẻ được đọc sách',6),
      r(id,3,'true_false','Thư viện biết đi là sáng kiến thể hiện tình yêu thương với trẻ em vùng khó khăn. Đúng hay sai?',null,true,'hard','Sáng kiến này xuất phát từ mong muốn mang sách đến mọi trẻ em',7),
      r(id,3,'fill_blank','Nhờ xe thư viện, các bạn nhỏ ở vùng xa cảm thấy [b1] và hạnh phúc hơn.',[{key:'b1',text:''}],{b1:'vui'},'hard','Được đọc sách mang lại niềm vui và kiến thức cho trẻ',8),
      r(id,3,'single_choice','Từ bài đọc, em học được bài học gì về sự chia sẻ?',[{key:'A',text:'Chỉ giữ sách cho mình'},{key:'B',text:'Chia sẻ tri thức và sách vở giúp mọi người cùng tiến bộ'},{key:'C',text:'Không cần chia sẻ gì cả'}],'B','hard','Thư viện lưu động là hình ảnh đẹp của sự chia sẻ tri thức',9),
      r(id,3,'single_choice','Điều gì cho thấy sách có giá trị lớn trong cuộc sống?',[{key:'A',text:'Sách được in bằng giấy đẹp'},{key:'B',text:'Người ta tổ chức xe thư viện để mang sách đến mọi nơi'},{key:'C',text:'Sách rất nặng'}],'B','hard','Việc tổ chức thư viện lưu động chứng tỏ sách có giá trị và cần thiết với mọi người',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1196: Bài 19 – Cảm ơn anh hà mã ───────────────────────────────────────
  {
    const id = 1196;
    const rows: any[][] = [
      // Ex1 easy – animal vocab, gratitude words
      r(id,1,'single_choice','Hà mã sống ở đâu?',[{key:'A',text:'Biển'},{key:'B',text:'Sông và hồ'},{key:'C',text:'Núi cao'}],'B','easy','Hà mã là loài động vật sống ở sông và hồ nước ngọt',1),
      r(id,1,'single_choice','Đặc điểm nổi bật của hà mã là gì?',[{key:'A',text:'To lớn, nặng nề và có răng to'},{key:'B',text:'Nhỏ bé và chạy nhanh'},{key:'C',text:'Có cánh và biết bay'}],'A','easy','Hà mã to lớn, nặng và có hàm rộng với những chiếc răng rất to',2),
      r(id,1,'single_choice','Từ "cảm ơn" dùng khi nào?',[{key:'A',text:'Khi xin lỗi ai đó'},{key:'B',text:'Khi ai đó giúp đỡ mình'},{key:'C',text:'Khi muốn chào hỏi'}],'B','easy','Cảm ơn là lời nói khi được ai đó giúp đỡ hoặc tặng quà',3),
      r(id,1,'true_false','Hà mã là loài động vật rất nhỏ. Đúng hay sai?',null,false,'easy','Hà mã là một trong những loài động vật lớn nhất trên cạn',4),
      r(id,1,'true_false','Nói "cảm ơn" là thể hiện lòng biết ơn. Đúng hay sai?',null,true,'easy','Lời cảm ơn thể hiện sự ghi nhận và biết ơn người đã giúp mình',5),
      r(id,1,'fill_blank','Hà mã có thân hình [b1] và rất nặng.',[{key:'b1',text:''}],{b1:'to lớn'},'easy','Hà mã là loài động vật to lớn',6),
      r(id,1,'fill_blank','Khi ai đó giúp đỡ em, em nói "[b1]".',[{key:'b1',text:''}],{b1:'cảm ơn'},'easy','Cảm ơn là lời nói lịch sự khi được giúp đỡ',7),
      r(id,1,'sorting','Sắp xếp từ thành câu: "to / Hà / mã / lớn / rất"',[{key:'1',text:'to'},{key:'2',text:'Hà'},{key:'3',text:'mã'},{key:'4',text:'lớn'},{key:'5',text:'rất'}],['2','3','5','1','4'],'easy','Hà mã rất to lớn',8),
      r(id,1,'true_false','Biết ơn và cảm ơn là hai điều khác nhau. Đúng hay sai?',null,false,'easy','Biết ơn là cảm xúc bên trong, cảm ơn là cách biểu đạt sự biết ơn đó',9),
      r(id,1,'single_choice','Từ nào là từ biểu lộ sự biết ơn?',[{key:'A',text:'Xin lỗi'},{key:'B',text:'Cảm ơn'},{key:'C',text:'Tạm biệt'}],'B','easy','Cảm ơn là lời biểu lộ sự biết ơn',10),
      // Ex2 medium – why thank the hippo
      r(id,2,'single_choice','Trong bài, vì sao nhân vật nói "cảm ơn anh hà mã"?',[{key:'A',text:'Vì hà mã đẹp'},{key:'B',text:'Vì hà mã đã giúp đỡ nhân vật'},{key:'C',text:'Vì hà mã hát hay'}],'B','medium','Nhân vật cảm ơn vì hà mã đã làm điều gì đó giúp ích cho mình',1),
      r(id,2,'single_choice','Anh hà mã đã giúp đỡ bằng cách nào trong câu chuyện?',[{key:'A',text:'Dùng thân hình to lớn làm cầu cho bạn nhỏ qua sông'},{key:'B',text:'Chở bạn đi học bằng xe'},{key:'C',text:'Tặng quà sinh nhật'}],'A','medium','Hà mã dùng thân hình to lớn của mình như một chiếc cầu để giúp bạn nhỏ qua sông',2),
      r(id,2,'true_false','Hà mã giúp đỡ vì muốn được khen. Đúng hay sai?',null,false,'medium','Hà mã giúp đỡ xuất phát từ lòng tốt, không phải để được khen',3),
      r(id,2,'matching','Nối từ với nghĩa phù hợp:',[{key:'A',text:'Biết ơn'},{key:'B',text:'Giúp đỡ'},{key:'C',text:'Cảm ơn'}],{A:'Ghi nhớ ơn của người khác',B:'Làm gì đó tốt cho người khác',C:'Lời nói bày tỏ sự biết ơn'},'medium',null,4),
      r(id,2,'fill_blank','Hà mã sẵn sàng [b1] dù bản thân có thể mệt mỏi.',[{key:'b1',text:''}],{b1:'giúp đỡ'},'medium','Sẵn sàng giúp đỡ thể hiện lòng tốt và tinh thần tương trợ',5),
      r(id,2,'single_choice','Câu chuyện dạy chúng ta điều gì về lòng biết ơn?',[{key:'A',text:'Không cần cảm ơn ai cả'},{key:'B',text:'Phải biết cảm ơn khi được giúp đỡ'},{key:'C',text:'Chỉ cảm ơn người lớn'}],'B','medium','Biết cảm ơn là nét đẹp trong ứng xử hằng ngày',6),
      r(id,2,'true_false','Nói lời cảm ơn làm cho người giúp mình cảm thấy vui. Đúng hay sai?',null,true,'medium','Lời cảm ơn tạo niềm vui cho người được nghe và thúc đẩy tinh thần giúp đỡ',7),
      r(id,2,'sorting','Sắp xếp diễn biến câu chuyện: nói cảm ơn / bạn nhỏ cần qua sông / hà mã giúp đỡ / bạn nhỏ qua được sông',[{key:'1',text:'Nói cảm ơn'},{key:'2',text:'Bạn nhỏ cần qua sông'},{key:'3',text:'Hà mã giúp đỡ'},{key:'4',text:'Bạn nhỏ qua được sông'}],['2','3','4','1'],'medium','Bạn nhỏ cần qua sông → Hà mã giúp → Bạn qua được → Nói cảm ơn',8),
      r(id,2,'single_choice','Tại sao bạn nhỏ lại cảm ơn hà mã ngay sau khi qua sông?',[{key:'A',text:'Vì bạn nhỏ bắt buộc phải làm vậy'},{key:'B',text:'Vì bạn nhỏ biết ơn và muốn bày tỏ sự trân trọng'},{key:'C',text:'Vì hà mã yêu cầu'}],'B','medium','Lời cảm ơn xuất phát từ lòng biết ơn chân thành',9),
      r(id,2,'fill_blank','Khi ai đó giúp đỡ mình, điều đầu tiên ta nên làm là nói lời "[b1]".',[{key:'b1',text:''}],{b1:'cảm ơn'},'medium','Cảm ơn là lời đầu tiên nên nói khi được giúp đỡ',10),
      // Ex3 hard – moral (biết ơn, giúp đỡ)
      r(id,3,'single_choice','Bài học đạo đức nào quan trọng nhất từ câu chuyện "Cảm ơn anh hà mã"?',[{key:'A',text:'Hà mã là loài vật to lớn'},{key:'B',text:'Biết ơn và giúp đỡ nhau là đức tính tốt đẹp'},{key:'C',text:'Nên tránh xa hà mã'}],'B','hard','Bài học cốt lõi là về lòng biết ơn và tinh thần tương trợ',1),
      r(id,3,'fill_blank','Người biết [b1] là người luôn nhớ đến sự giúp đỡ của người khác.',[{key:'b1',text:''}],{b1:'ơn'},'hard','Biết ơn là đức tính quý báu trong cuộc sống',2),
      r(id,3,'true_false','Câu chuyện chỉ đơn thuần kể về hà mã, không có bài học đạo đức. Đúng hay sai?',null,false,'hard','Câu chuyện có bài học đạo đức sâu sắc về lòng biết ơn',3),
      r(id,3,'single_choice','Nếu em được ai đó giúp đỡ nhưng không nói cảm ơn, điều đó thể hiện điều gì?',[{key:'A',text:'Em đang vui vẻ'},{key:'B',text:'Em thiếu lễ phép và chưa biết ơn'},{key:'C',text:'Em đang bận'}],'B','hard','Không nói cảm ơn thể hiện sự thiếu lễ phép và vô ơn',4),
      r(id,3,'matching','Nối hành động với đức tính tương ứng:',[{key:'A',text:'Nói cảm ơn khi được giúp'},{key:'B',text:'Giúp bạn khi bạn gặp khó khăn'},{key:'C',text:'Nhớ ơn người đã giúp mình'}],{A:'Lễ phép và biết ơn',B:'Tốt bụng và đoàn kết',C:'Biết ơn và trung thành'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp các bước để thể hiện lòng biết ơn đúng cách: hành động đáp lại / nhận ra sự giúp đỡ / nói lời cảm ơn / ghi nhớ ơn',[{key:'1',text:'Hành động đáp lại'},{key:'2',text:'Nhận ra sự giúp đỡ'},{key:'3',text:'Nói lời cảm ơn'},{key:'4',text:'Ghi nhớ ơn'}],['2','3','4','1'],'hard','Nhận ra → Cảm ơn → Ghi nhớ → Đáp lại',6),
      r(id,3,'true_false','Giúp đỡ người khác mà không đòi hỏi gì là biểu hiện của tình người cao đẹp. Đúng hay sai?',null,true,'hard','Giúp đỡ vô tư là biểu hiện đẹp nhất của tình thương yêu con người',7),
      r(id,3,'fill_blank','Câu chuyện "Cảm ơn anh hà mã" thuộc thể loại [b1] (kể về loài vật).',[{key:'b1',text:''}],{b1:'truyện'},'hard','Đây là truyện thiếu nhi với nhân vật là loài vật',8),
      r(id,3,'single_choice','Hà mã trong câu chuyện tượng trưng cho điều gì?',[{key:'A',text:'Sức mạnh và lòng tốt'},{key:'B',text:'Sự hung dữ và nguy hiểm'},{key:'C',text:'Sự lười biếng'}],'A','hard','Hà mã dùng sức mạnh của mình để giúp đỡ, tượng trưng cho lòng tốt và sức mạnh phục vụ',9),
      r(id,3,'single_choice','Điều gì giúp tình bạn giữa người và động vật trở nên đẹp hơn trong câu chuyện?',[{key:'A',text:'Sự biết ơn và yêu thương'},{key:'B',text:'Việc mua sắm quà tặng'},{key:'C',text:'Sự to lớn của hà mã'}],'A','hard','Sự biết ơn và yêu thương là nền tảng của mọi mối quan hệ tốt đẹp',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1197: Bài 20 – Từ chú bồ câu đến in-tơ-nét ───────────────────────────
  {
    const id = 1197;
    const rows: any[][] = [
      // Ex1 easy – communication vocabulary
      r(id,1,'single_choice','Ngày xưa, người ta dùng gì để gửi tin tức đi xa?',[{key:'A',text:'Điện thoại'},{key:'B',text:'Bồ câu đưa thư'},{key:'C',text:'Internet'}],'B','easy','Bồ câu đưa thư là phương tiện liên lạc xưa kia',1),
      r(id,1,'single_choice','Phương tiện liên lạc nào nhanh nhất trong các phương tiện sau?',[{key:'A',text:'Thư tay'},{key:'B',text:'Bồ câu đưa thư'},{key:'C',text:'Internet'}],'C','easy','Internet là phương tiện liên lạc nhanh nhất hiện nay',2),
      r(id,1,'single_choice','In-tơ-nét (Internet) dùng để làm gì?',[{key:'A',text:'Nấu ăn'},{key:'B',text:'Gửi thông tin và liên lạc nhanh chóng'},{key:'C',text:'Trồng cây'}],'B','easy','Internet cho phép truyền tải thông tin nhanh chóng trên toàn thế giới',3),
      r(id,1,'true_false','Bồ câu có thể mang thư đi rất xa. Đúng hay sai?',null,true,'easy','Bồ câu đưa thư được huấn luyện để bay về nhà từ rất xa',4),
      r(id,1,'true_false','Điện thoại ra đời trước bồ câu đưa thư. Đúng hay sai?',null,false,'easy','Bồ câu đưa thư có từ rất xưa, điện thoại mới được phát minh sau này',5),
      r(id,1,'fill_blank','Người ta viết [b1] và gắn vào chân chim bồ câu để gửi đi.',[{key:'b1',text:''}],{b1:'thư'},'easy','Thư được cuộn nhỏ và gắn vào chân chim bồ câu',6),
      r(id,1,'fill_blank','[b1] là phương tiện liên lạc hiện đại giúp con người kết nối toàn cầu.',[{key:'b1',text:''}],{b1:'Internet'},'easy','Internet kết nối hàng tỷ người trên khắp thế giới',7),
      r(id,1,'sorting','Sắp xếp từ cũ đến mới: Fax / Điện thoại / Bồ câu đưa thư / Internet',[{key:'1',text:'Fax'},{key:'2',text:'Điện thoại'},{key:'3',text:'Bồ câu đưa thư'},{key:'4',text:'Internet'}],['3','2','1','4'],'easy','Bồ câu → Điện thoại → Fax → Internet',8),
      r(id,1,'true_false','Máy tính giúp chúng ta gửi email nhanh hơn viết thư tay. Đúng hay sai?',null,true,'easy','Email qua máy tính gửi đi trong vài giây, thư tay mất nhiều ngày',9),
      r(id,1,'single_choice','Từ nào KHÔNG phải là phương tiện liên lạc?',[{key:'A',text:'Điện thoại'},{key:'B',text:'Thư'},{key:'C',text:'Bàn ghế'}],'C','easy','Bàn ghế là đồ dùng nội thất, không phải phương tiện liên lạc',10),
      // Ex2 medium – timeline old to new communication
      r(id,2,'matching','Nối phương tiện liên lạc với thời đại:',[{key:'A',text:'Bồ câu đưa thư'},{key:'B',text:'Điện thoại'},{key:'C',text:'Internet'}],{A:'Thời xưa',B:'Thế kỷ 20',C:'Thời hiện đại'},'medium',null,1),
      r(id,2,'single_choice','Phát minh nào giúp con người nói chuyện với nhau từ xa mà không cần gặp mặt?',[{key:'A',text:'Thư tay'},{key:'B',text:'Điện thoại'},{key:'C',text:'Bồ câu'}],'B','medium','Điện thoại cho phép nói chuyện trực tiếp qua đường dây điện từ xa',2),
      r(id,2,'true_false','Fax là máy truyền tài liệu qua đường điện thoại. Đúng hay sai?',null,true,'medium','Fax (facsimile) là thiết bị gửi hình ảnh tài liệu qua đường dây điện thoại',3),
      r(id,2,'fill_blank','Sự phát triển của phương tiện liên lạc giúp con người [b1] gần nhau hơn.',[{key:'b1',text:''}],{b1:'xích'},'medium','Công nghệ liên lạc giúp rút ngắn khoảng cách giữa con người',4),
      r(id,2,'single_choice','Tại sao Internet quan trọng hơn bồ câu đưa thư?',[{key:'A',text:'Internet không cần nuôi'},{key:'B',text:'Internet nhanh hơn, gửi được nhiều thông tin hơn'},{key:'C',text:'Internet đẹp hơn'}],'B','medium','Internet vượt trội về tốc độ và khả năng truyền tải thông tin',5),
      r(id,2,'sorting','Sắp xếp theo thứ tự tiến hóa: máy tính / điện thoại / bồ câu đưa thư / thư tay',[{key:'1',text:'Máy tính'},{key:'2',text:'Điện thoại'},{key:'3',text:'Bồ câu đưa thư'},{key:'4',text:'Thư tay'}],['3','4','2','1'],'medium','Bồ câu → Thư tay → Điện thoại → Máy tính',6),
      r(id,2,'true_false','Trong tương lai, phương tiện liên lạc sẽ còn hiện đại hơn Internet ngày nay. Đúng hay sai?',null,true,'medium','Công nghệ không ngừng phát triển nên phương tiện liên lạc sẽ ngày càng hiện đại',7),
      r(id,2,'matching','Nối phương tiện với ưu điểm:',[{key:'A',text:'Bồ câu đưa thư'},{key:'B',text:'Điện thoại'},{key:'C',text:'Internet'}],{A:'Không cần điện',B:'Nói chuyện trực tiếp',C:'Nhanh và nhiều thông tin'},'medium',null,8),
      r(id,2,'single_choice','Bài "Từ chú bồ câu đến in-tơ-nét" muốn nói về điều gì?',[{key:'A',text:'Chim bồ câu rất đẹp'},{key:'B',text:'Sự phát triển của phương tiện liên lạc theo thời gian'},{key:'C',text:'Máy tính rất đắt tiền'}],'B','medium','Bài học kể về lịch sử phát triển của các phương tiện liên lạc',9),
      r(id,2,'fill_blank','Nhờ có [b1], người ta có thể gọi điện, gửi tin nhắn và xem phim mọi lúc mọi nơi.',[{key:'b1',text:''}],{b1:'internet'},'medium','Internet mang lại nhiều tiện ích trong cuộc sống hiện đại',10),
      // Ex3 hard – compare past/present, infer future
      r(id,3,'single_choice','So sánh bồ câu đưa thư và email, điểm khác nhau lớn nhất là gì?',[{key:'A',text:'Bồ câu dễ thương hơn'},{key:'B',text:'Email nhanh hơn và không giới hạn khoảng cách'},{key:'C',text:'Bồ câu đắt tiền hơn'}],'B','hard','Email truyền đi trong vài giây đến bất kỳ đâu trên thế giới',1),
      r(id,3,'fill_blank','Sự tiến bộ của [b1] liên lạc đã thay đổi cuộc sống con người rất nhiều.',[{key:'b1',text:''}],{b1:'phương tiện'},'hard','Phương tiện liên lạc ngày càng tiến bộ giúp cuộc sống thuận tiện hơn',2),
      r(id,3,'true_false','Bồ câu đưa thư không còn được dùng trong thời hiện đại. Đúng hay sai?',null,true,'hard','Internet và điện thoại đã thay thế hoàn toàn bồ câu đưa thư',3),
      r(id,3,'single_choice','Em dự đoán trong tương lai, con người sẽ liên lạc bằng cách nào?',[{key:'A',text:'Quay lại dùng bồ câu'},{key:'B',text:'Dùng công nghệ tiên tiến hơn Internet hiện tại'},{key:'C',text:'Không liên lạc nữa'}],'B','hard','Xu hướng phát triển công nghệ sẽ tạo ra các phương tiện liên lạc mới tiên tiến hơn',4),
      r(id,3,'matching','Nối thời kỳ với phương tiện liên lạc chính:',[{key:'A',text:'Thời xưa xa'},{key:'B',text:'Thế kỷ 19-20'},{key:'C',text:'Thế kỷ 21'}],{A:'Bồ câu và thư tay',B:'Điện thoại và fax',C:'Internet và smartphone'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp theo tốc độ liên lạc từ chậm đến nhanh: email / bồ câu đưa thư / thư tay / điện thoại',[{key:'1',text:'Email'},{key:'2',text:'Bồ câu đưa thư'},{key:'3',text:'Thư tay'},{key:'4',text:'Điện thoại'}],['2','3','4','1'],'hard','Bồ câu chậm nhất → thư tay → điện thoại → email nhanh nhất',6),
      r(id,3,'true_false','Bài học này cho thấy con người luôn sáng tạo để cải thiện cuộc sống. Đúng hay sai?',null,true,'hard','Sự phát triển liên tục của phương tiện liên lạc chứng tỏ sự sáng tạo không ngừng của con người',7),
      r(id,3,'fill_blank','Phương tiện liên lạc ngày càng [b1] và tiện lợi hơn theo thời gian.',[{key:'b1',text:''}],{b1:'hiện đại'},'hard','Công nghệ liên tục phát triển giúp liên lạc ngày càng nhanh và tiện',8),
      r(id,3,'single_choice','Tại sao cần biết về lịch sử phát triển phương tiện liên lạc?',[{key:'A',text:'Để biết dùng bồ câu đưa thư'},{key:'B',text:'Để trân trọng công nghệ hiện đại và hiểu quá trình phát triển của xã hội'},{key:'C',text:'Không cần biết'}],'B','hard','Hiểu lịch sử giúp ta trân trọng những tiến bộ mà con người đã đạt được',9),
      r(id,3,'single_choice','Điểm giống nhau giữa tất cả phương tiện liên lạc xưa và nay là gì?',[{key:'A',text:'Đều dùng điện'},{key:'B',text:'Đều giúp con người truyền thông tin cho nhau'},{key:'C',text:'Đều cần máy tính'}],'B','hard','Mục đích cơ bản của mọi phương tiện liên lạc là truyền thông tin',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1198: Bài 21 – Mai An Tiêm ────────────────────────────────────────────
  {
    const id = 1198;
    const rows: any[][] = [
      // Ex1 easy – legend chars, basic story events
      r(id,1,'single_choice','Mai An Tiêm là nhân vật trong câu chuyện nào?',[{key:'A',text:'Tấm Cám'},{key:'B',text:'Truyền thuyết Mai An Tiêm'},{key:'C',text:'Sơn Tinh Thủy Tinh'}],'B','easy','Mai An Tiêm là nhân vật chính trong truyền thuyết cùng tên',1),
      r(id,1,'single_choice','Mai An Tiêm bị vua đày đến đâu?',[{key:'A',text:'Núi cao'},{key:'B',text:'Đảo hoang'},{key:'C',text:'Rừng sâu'}],'B','easy','Vua đày Mai An Tiêm ra đảo hoang vắng',2),
      r(id,1,'single_choice','Quả gì liên quan đến câu chuyện Mai An Tiêm?',[{key:'A',text:'Dưa hấu'},{key:'B',text:'Xoài'},{key:'C',text:'Cam'}],'A','easy','Dưa hấu gắn liền với câu chuyện Mai An Tiêm',3),
      r(id,1,'true_false','Mai An Tiêm là con trai của vua. Đúng hay sai?',null,true,'easy','Theo truyền thuyết, Mai An Tiêm là con nuôi của vua Hùng',4),
      r(id,1,'true_false','Mai An Tiêm bị đày vì làm điều xấu. Đúng hay sai?',null,false,'easy','Mai An Tiêm bị đày vì vua hiểu nhầm lời nói của chàng',5),
      r(id,1,'fill_blank','Mai An Tiêm trồng [b1] trên đảo hoang và sống sót.',[{key:'b1',text:''}],{b1:'dưa hấu'},'easy','Dưa hấu giúp Mai An Tiêm có thức ăn và nước uống để sống',6),
      r(id,1,'fill_blank','Câu chuyện Mai An Tiêm là thể loại [b1] dân gian.',[{key:'b1',text:''}],{b1:'truyền thuyết'},'easy','Truyền thuyết là thể loại truyện dân gian kể về nhân vật lịch sử hoặc anh hùng',7),
      r(id,1,'sorting','Sắp xếp sự kiện: về lại cung vua / trồng dưa hấu / bị đày ra đảo / sống sót trên đảo',[{key:'1',text:'Về lại cung vua'},{key:'2',text:'Trồng dưa hấu'},{key:'3',text:'Bị đày ra đảo'},{key:'4',text:'Sống sót trên đảo'}],['3','2','4','1'],'easy','Bị đày → Trồng dưa → Sống sót → Về cung',8),
      r(id,1,'true_false','Truyền thuyết Mai An Tiêm giải thích nguồn gốc của quả dưa hấu ở Việt Nam. Đúng hay sai?',null,true,'easy','Câu chuyện giải thích tại sao Việt Nam có quả dưa hấu',9),
      r(id,1,'single_choice','Mai An Tiêm sống sót trên đảo hoang nhờ điều gì?',[{key:'A',text:'Được vua giúp đỡ'},{key:'B',text:'Sự kiên trì và thông minh tìm ra cách trồng dưa hấu'},{key:'C',text:'Có nhiều lương thực mang theo'}],'A','easy','Mai An Tiêm nhờ vào bản thân kiên trì lao động mà sống sót',10),
      // Ex2 medium – why exiled, how survived
      r(id,2,'single_choice','Vì sao vua đày Mai An Tiêm ra đảo hoang?',[{key:'A',text:'Vì chàng lười biếng'},{key:'B',text:'Vì vua hiểu nhầm lời chàng nói về công lao của bản thân'},{key:'C',text:'Vì chàng phạm tội nặng'}],'B','medium','Vua hiểu nhầm lời Mai An Tiêm tự hào về sức lao động là kiêu ngạo',1),
      r(id,2,'single_choice','Mai An Tiêm đã sống sót như thế nào trên đảo hoang?',[{key:'A',text:'Được người khác tiếp tế thức ăn'},{key:'B',text:'Tự lao động trồng trọt và tìm thức ăn'},{key:'C',text:'Nằm chờ vua tha'}],'B','medium','Mai An Tiêm tự lực cánh sinh bằng sức lao động của mình',2),
      r(id,2,'true_false','Dưa hấu được Mai An Tiêm tìm thấy từ hạt do chim mang đến. Đúng hay sai?',null,true,'medium','Theo truyền thuyết, một con chim tha hạt dưa đến đảo và Mai An Tiêm trồng nó',3),
      r(id,2,'matching','Nối nhân vật với vai trò:',[{key:'A',text:'Mai An Tiêm'},{key:'B',text:'Vua Hùng'},{key:'C',text:'Vợ Mai An Tiêm'}],{A:'Nhân vật chính, bị đày ra đảo',B:'Vua đã đày Mai An Tiêm',C:'Người đồng cam cộng khổ cùng chồng'},'medium',null,4),
      r(id,2,'fill_blank','Mai An Tiêm đã [b1] không hề nản chí dù sống trên đảo hoang vắng.',[{key:'b1',text:''}],{b1:'kiên trì'},'medium','Kiên trì là phẩm chất đáng học hỏi của Mai An Tiêm',5),
      r(id,2,'single_choice','Điều gì giúp Mai An Tiêm trở về cung vua?',[{key:'A',text:'Vua tự nhiên nhớ ra và tha'},{key:'B',text:'Chàng khắc tên trên dưa hấu thả biển, vua nhận ra và tha tội'},{key:'C',text:'Chàng bơi về bờ'}],'B','medium','Mai An Tiêm khắc tên mình lên dưa hấu thả ra biển để người ta biết mình vẫn sống',6),
      r(id,2,'true_false','Câu chuyện Mai An Tiêm ca ngợi tinh thần tự lập và không bỏ cuộc. Đúng hay sai?',null,true,'medium','Bài học cốt lõi là tinh thần tự lực và kiên trì vượt khó',7),
      r(id,2,'sorting','Sắp xếp theo đúng trình tự: vua tha tội / Mai An Tiêm bị đày / dưa hấu được biết đến / chàng trồng dưa hấu',[{key:'1',text:'Vua tha tội'},{key:'2',text:'Mai An Tiêm bị đày'},{key:'3',text:'Dưa hấu được biết đến'},{key:'4',text:'Chàng trồng dưa hấu'}],['2','4','3','1'],'medium','Bị đày → Trồng dưa → Dưa được biết đến → Vua tha',8),
      r(id,2,'single_choice','Dưa hấu trong câu chuyện có ý nghĩa gì?',[{key:'A',text:'Chỉ là thức ăn bình thường'},{key:'B',text:'Là bằng chứng cho sự kiên trì và tự lực của Mai An Tiêm'},{key:'C',text:'Không có ý nghĩa gì'}],'B','medium','Dưa hấu là kết quả của lao động kiên trì, là minh chứng cho phẩm chất của Mai An Tiêm',9),
      r(id,2,'fill_blank','Mai An Tiêm khắc tên lên quả [b1] và thả ra biển để báo hiệu sự tồn tại của mình.',[{key:'b1',text:''}],{b1:'dưa hấu'},'medium','Đây là cách thông minh Mai An Tiêm dùng để liên lạc với đất liền',10),
      // Ex3 hard – moral (không nản chí, tự lực cánh sinh), legend genre
      r(id,3,'single_choice','Câu chuyện Mai An Tiêm thuộc thể loại văn học dân gian nào?',[{key:'A',text:'Cổ tích'},{key:'B',text:'Truyền thuyết'},{key:'C',text:'Thần thoại'}],'B','hard','Truyền thuyết là câu chuyện về nhân vật lịch sử có pha yếu tố kỳ ảo',1),
      r(id,3,'fill_blank','Phẩm chất "tự [b1] cánh sinh" của Mai An Tiêm dạy chúng ta không ỷ lại vào người khác.',[{key:'b1',text:''}],{b1:'lực'},'hard','Tự lực cánh sinh nghĩa là tự mình làm tất cả, không nhờ vào người khác',2),
      r(id,3,'true_false','Bài học "không nản chí" chỉ dành cho người lớn, không áp dụng cho trẻ em. Đúng hay sai?',null,false,'hard','Bài học không nản chí áp dụng cho mọi lứa tuổi trong cuộc sống',3),
      r(id,3,'single_choice','Nếu em rơi vào hoàn cảnh khó khăn như Mai An Tiêm, em nên làm gì?',[{key:'A',text:'Bỏ cuộc và khóc'},{key:'B',text:'Kiên trì tìm giải pháp và không nản chí'},{key:'C',text:'Chờ người khác giúp đỡ mà không làm gì'}],'B','hard','Tinh thần Mai An Tiêm dạy ta kiên trì vượt khó',4),
      r(id,3,'matching','Nối phẩm chất với biểu hiện trong câu chuyện:',[{key:'A',text:'Không nản chí'},{key:'B',text:'Thông minh'},{key:'C',text:'Tự lực'}],{A:'Tiếp tục sống và làm việc dù bị đày',B:'Dùng dưa hấu để liên lạc với đất liền',C:'Tự trồng trọt nuôi sống bản thân'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp bài học từ câu chuyện theo tầm quan trọng: thông minh sáng tạo / kiên trì không bỏ cuộc / tự lực cánh sinh / lòng dũng cảm',[{key:'1',text:'Thông minh sáng tạo'},{key:'2',text:'Kiên trì không bỏ cuộc'},{key:'3',text:'Tự lực cánh sinh'},{key:'4',text:'Lòng dũng cảm'}],['2','3','1','4'],'hard','Các bài học được sắp theo mức độ thể hiện trong câu chuyện',6),
      r(id,3,'true_false','Truyền thuyết thường có pha thêm yếu tố kỳ ảo để tăng tính hấp dẫn. Đúng hay sai?',null,true,'hard','Đây là đặc điểm của thể loại truyền thuyết trong văn học dân gian',7),
      r(id,3,'fill_blank','Mai An Tiêm là biểu tượng cho tinh thần [b1] của người Việt Nam.',[{key:'b1',text:''}],{b1:'kiên cường'},'hard','Kiên cường vượt khó là phẩm chất truyền thống của người Việt',8),
      r(id,3,'single_choice','So sánh truyền thuyết và cổ tích, điểm khác nhau chính là gì?',[{key:'A',text:'Cổ tích hay hơn truyền thuyết'},{key:'B',text:'Truyền thuyết liên quan đến lịch sử, cổ tích thường là hoàn toàn hư cấu'},{key:'C',text:'Không có gì khác nhau'}],'B','hard','Truyền thuyết gắn với nhân vật/sự kiện lịch sử có thật hoặc được cho là có thật',9),
      r(id,3,'single_choice','Điều gì làm cho câu chuyện Mai An Tiêm trở thành một truyền thuyết hay?',[{key:'A',text:'Chỉ vì nó cũ và xưa'},{key:'B',text:'Vì nó giải thích nguồn gốc dưa hấu và chứa bài học đạo đức sâu sắc'},{key:'C',text:'Vì nó rất ngắn'}],'B','hard','Truyền thuyết hay kết hợp giải thích hiện tượng tự nhiên với bài học đạo đức',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1199: Bài 22 – Thư gửi bố ngoài đảo ──────────────────────────────────
  {
    const id = 1199;
    const rows: any[][] = [
      // Ex1 easy – letter vocab
      r(id,1,'single_choice','Khi viết thư, chúng ta bắt đầu bằng gì?',[{key:'A',text:'Ký tên'},{key:'B',text:'Lời chào và địa chỉ người nhận'},{key:'C',text:'Lời kết'}],'B','easy','Đầu thư thường có ngày tháng, địa chỉ và lời chào',1),
      r(id,1,'single_choice','Trong thư, từ "kính gửi" dùng để làm gì?',[{key:'A',text:'Để kết thúc thư'},{key:'B',text:'Để ghi tên người nhận thư'},{key:'C',text:'Để viết ngày tháng'}],'B','easy','Kính gửi đứng trước tên người nhận để thể hiện sự kính trọng',2),
      r(id,1,'single_choice','Cuối thư, sau khi viết lời chúc, chúng ta phải làm gì?',[{key:'A',text:'Gạch ngang'},{key:'B',text:'Ký tên'},{key:'C',text:'Viết lại từ đầu'}],'B','easy','Cuối thư cần ký tên để người nhận biết ai gửi',3),
      r(id,1,'true_false','Thư là cách viết nhắn tin cho người thân hoặc bạn bè. Đúng hay sai?',null,true,'easy','Thư là phương tiện truyền đạt tình cảm và thông tin qua chữ viết',4),
      r(id,1,'true_false','Viết thư không cần ghi ngày tháng. Đúng hay sai?',null,false,'easy','Ngày tháng trong thư giúp người nhận biết thư được viết khi nào',5),
      r(id,1,'fill_blank','Bạn nhỏ viết thư để bày tỏ nỗi [b1] và tình yêu thương với bố.',[{key:'b1',text:''}],{b1:'nhớ'},'easy','Thư gửi bố thể hiện tình cảm nhớ nhung và yêu thương',6),
      r(id,1,'fill_blank','Bố của bạn nhỏ đang làm việc ngoài [b1] để bảo vệ đất nước.',[{key:'b1',text:''}],{b1:'đảo'},'easy','Người bố làm nhiệm vụ bảo vệ đảo của Tổ quốc',7),
      r(id,1,'sorting','Sắp xếp các phần của bức thư: Ký tên / Nội dung thư / Lời chào mở đầu / Ngày tháng và địa chỉ',[{key:'1',text:'Ký tên'},{key:'2',text:'Nội dung thư'},{key:'3',text:'Lời chào mở đầu'},{key:'4',text:'Ngày tháng và địa chỉ'}],['4','3','2','1'],'easy','Ngày tháng → Lời chào → Nội dung → Ký tên',8),
      r(id,1,'true_false','Trong thư, bạn nhỏ kể chuyện học tập và nỗi nhớ bố. Đúng hay sai?',null,true,'easy','Bức thư của bạn nhỏ thể hiện tình cảm gia đình và sự quan tâm',9),
      r(id,1,'single_choice','Từ nào thường xuất hiện trong thư gửi bố?',[{key:'A',text:'Nhớ, yêu, mong'},{key:'B',text:'Bán, mua, trả'},{key:'C',text:'Chạy, nhảy, leo'}],'A','easy','Nhớ, yêu, mong là những từ thể hiện tình cảm trong thư',10),
      // Ex2 medium – child's letter comprehension
      r(id,2,'single_choice','Bạn nhỏ trong bài viết thư để làm gì?',[{key:'A',text:'Hỏi xin tiền'},{key:'B',text:'Bày tỏ nỗi nhớ, tình yêu và kể chuyện cho bố nghe'},{key:'C',text:'Thông báo điểm số xấu'}],'B','medium','Bức thư là cách thể hiện tình cảm và kết nối với bố ở xa',1),
      r(id,2,'single_choice','Bố của bạn nhỏ đang làm nhiệm vụ gì?',[{key:'A',text:'Đi du lịch'},{key:'B',text:'Bảo vệ đảo và chủ quyền Tổ quốc'},{key:'C',text:'Đi buôn bán'}],'B','medium','Người bố làm nhiệm vụ bảo vệ lãnh thổ quốc gia ngoài đảo',2),
      r(id,2,'true_false','Bức thư thể hiện tình yêu đất nước qua tình yêu gia đình. Đúng hay sai?',null,true,'medium','Tình yêu cha mẹ và đất nước gắn kết chặt chẽ trong bức thư',3),
      r(id,2,'matching','Nối từ với ý nghĩa trong bức thư:',[{key:'A',text:'Nhớ'},{key:'B',text:'Mong'},{key:'C',text:'Yêu'}],{A:'Cảm giác thiếu vắng người thân',B:'Mong đợi gặp lại',C:'Tình cảm sâu sắc'},'medium',null,4),
      r(id,2,'fill_blank','Thư của bạn nhỏ viết cho bố thể hiện tình cảm [b1] gia đình đẹp đẽ.',[{key:'b1',text:''}],{b1:'gắn bó'},'medium','Thư là sợi dây kết nối tình cảm giữa con cái và cha mẹ',5),
      r(id,2,'single_choice','Vì sao người bố phải ở ngoài đảo xa?',[{key:'A',text:'Vì bố thích ở đảo'},{key:'B',text:'Vì đó là nhiệm vụ bảo vệ Tổ quốc'},{key:'C',text:'Vì nhà ở ngoài đảo'}],'B','medium','Người lính có nhiệm vụ bảo vệ đảo và chủ quyền đất nước',6),
      r(id,2,'true_false','Viết thư là cách hay để bày tỏ tình cảm khi không thể gặp nhau. Đúng hay sai?',null,true,'medium','Thư là phương tiện truyền tải tình cảm khi xa cách',7),
      r(id,2,'sorting','Sắp xếp nội dung bức thư theo thứ tự: bày tỏ nỗi nhớ / lời chúc sức khỏe / kể chuyện ở nhà / lời chào bố',[{key:'1',text:'Bày tỏ nỗi nhớ'},{key:'2',text:'Lời chúc sức khỏe'},{key:'3',text:'Kể chuyện ở nhà'},{key:'4',text:'Lời chào bố'}],['4','1','3','2'],'medium','Lời chào → Nhớ bố → Kể chuyện → Lời chúc',8),
      r(id,2,'single_choice','Cảm xúc chính của bạn nhỏ trong bức thư là gì?',[{key:'A',text:'Tức giận vì bố không về'},{key:'B',text:'Nhớ bố, yêu bố và tự hào về bố'},{key:'C',text:'Không quan tâm'}],'B','medium','Bức thư thể hiện tình cảm nhớ thương và tự hào về người bố làm nhiệm vụ',9),
      r(id,2,'fill_blank','Cuối thư, bạn nhỏ [b1] tên mình để bố biết ai viết thư.',[{key:'b1',text:''}],{b1:'ký'},'medium','Ký tên là phần bắt buộc cuối mỗi bức thư',10),
      // Ex3 hard – letter format, patriotic theme
      r(id,3,'single_choice','Qua bức thư, bài đọc muốn truyền tải thông điệp gì về tình yêu nước?',[{key:'A',text:'Đất nước không quan trọng'},{key:'B',text:'Tình yêu gia đình và tình yêu Tổ quốc luôn gắn bó với nhau'},{key:'C',text:'Nên ra đảo sống'}],'B','hard','Người bố bảo vệ đảo chính là bảo vệ gia đình và đất nước',1),
      r(id,3,'fill_blank','Thể loại văn bản của bài "Thư gửi bố ngoài đảo" là [b1].',[{key:'b1',text:''}],{b1:'thư'},'hard','Đây là văn bản thư, có đầy đủ các phần của một bức thư',2),
      r(id,3,'true_false','Bức thư của bạn nhỏ chỉ nói về chuyện học tập, không có tình cảm. Đúng hay sai?',null,false,'hard','Bức thư chứa đựng nhiều tình cảm yêu thương và nhớ nhung',3),
      r(id,3,'single_choice','Hình thức thư đúng chuẩn phải có những phần nào?',[{key:'A',text:'Chỉ cần nội dung chính'},{key:'B',text:'Ngày tháng, người nhận, nội dung, lời chúc và ký tên'},{key:'C',text:'Chỉ cần ký tên'}],'B','hard','Một bức thư chuẩn cần đầy đủ các phần: ngày tháng, người nhận, nội dung, lời chúc, ký tên',4),
      r(id,3,'matching','Nối phần thư với nội dung:',[{key:'A',text:'Đầu thư'},{key:'B',text:'Thân thư'},{key:'C',text:'Cuối thư'}],{A:'Ngày tháng, lời chào người nhận',B:'Nội dung muốn kể và chia sẻ',C:'Lời chúc và ký tên'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp để viết thư đúng quy cách: Ký tên / Lời chào và tên người nhận / Ngày tháng năm / Nội dung thư / Lời chúc',[{key:'1',text:'Ký tên'},{key:'2',text:'Lời chào và tên người nhận'},{key:'3',text:'Ngày tháng năm'},{key:'4',text:'Nội dung thư'},{key:'5',text:'Lời chúc'}],['3','2','4','5','1'],'hard','Đây là trình tự chuẩn khi viết thư',6),
      r(id,3,'true_false','Người lính bảo vệ đảo là người yêu nước. Đúng hay sai?',null,true,'hard','Hy sinh xa gia đình để bảo vệ đảo là biểu hiện cao đẹp của lòng yêu nước',7),
      r(id,3,'fill_blank','Bài đọc thuộc chủ đề [b1] của sách Tiếng Việt lớp 2.',[{key:'b1',text:''}],{b1:'Đất nước'},'hard','Bài thuộc chủ đề về tình yêu đất nước trong chương trình học',8),
      r(id,3,'single_choice','Câu nào thể hiện tình yêu đất nước trong bức thư?',[{key:'A',text:'Con học giỏi ở nhà'},{key:'B',text:'Bố ơi, con biết bố đang bảo vệ Tổ quốc, con rất tự hào về bố'},{key:'C',text:'Con muốn ăn kẹo'}],'B','hard','Câu bày tỏ sự tự hào về cha đang bảo vệ đất nước thể hiện tình yêu nước',9),
      r(id,3,'single_choice','Tại sao bài đọc này được đưa vào chương trình lớp 2?',[{key:'A',text:'Để dạy cách viết thư và bồi dưỡng tình yêu gia đình, đất nước'},{key:'B',text:'Vì bài ngắn và dễ đọc'},{key:'C',text:'Không có lý do đặc biệt'}],'A','hard','Bài kết hợp dạy kỹ năng viết thư với giáo dục tình cảm đẹp đẽ',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1200: Bài 23 – Bóp nát quả cam ────────────────────────────────────────
  {
    const id = 1200;
    const rows: any[][] = [
      // Ex1 easy – historical vocab
      r(id,1,'single_choice','Trần Quốc Toản là ai?',[{key:'A',text:'Một nông dân bình thường'},{key:'B',text:'Một thiếu niên anh hùng thời nhà Trần'},{key:'C',text:'Một nhà thơ nổi tiếng'}],'B','easy','Trần Quốc Toản là thiếu niên anh hùng trong lịch sử nhà Trần chống giặc Nguyên',1),
      r(id,1,'single_choice','Trần Quốc Toản bóp nát quả cam vì điều gì?',[{key:'A',text:'Quả cam quá cứng'},{key:'B',text:'Uất ức và căm thù giặc ngoại xâm'},{key:'C',text:'Muốn ép nước cam'}],'B','easy','Chàng bóp nát cam vì uất ức khi không được tham gia hội nghị chống giặc',2),
      r(id,1,'single_choice','Giặc trong bài là giặc nào?',[{key:'A',text:'Giặc Minh'},{key:'B',text:'Giặc Nguyên Mông'},{key:'C',text:'Giặc Pháp'}],'B','easy','Thời nhà Trần, Việt Nam phải chống lại giặc Nguyên Mông',3),
      r(id,1,'true_false','Trần Quốc Toản còn rất trẻ nhưng đã có lòng yêu nước. Đúng hay sai?',null,true,'easy','Dù còn nhỏ tuổi, Trần Quốc Toản đã thể hiện lòng yêu nước mãnh liệt',4),
      r(id,1,'true_false','Trần Quốc Toản được vào tham dự hội nghị các tướng lĩnh. Đúng hay sai?',null,false,'easy','Vì còn nhỏ tuổi, chàng không được vào hội nghị và phải chờ bên ngoài',5),
      r(id,1,'fill_blank','Trần Quốc Toản [b1] nát quả cam vì uất ức không được đánh giặc.',[{key:'b1',text:''}],{b1:'bóp'},'easy','Hành động bóp nát cam thể hiện sức mạnh và lòng uất ức của chàng thiếu niên',6),
      r(id,1,'fill_blank','Trần Quốc Toản muốn tham gia [b1] giặc để bảo vệ đất nước.',[{key:'b1',text:''}],{b1:'đánh'},'easy','Đánh giặc là mong muốn cháy bỏng của Trần Quốc Toản',7),
      r(id,1,'sorting','Sắp xếp sự kiện: bóp nát quả cam / chờ bên ngoài / muốn vào hội nghị / uất ức',[{key:'1',text:'Bóp nát quả cam'},{key:'2',text:'Chờ bên ngoài'},{key:'3',text:'Muốn vào hội nghị'},{key:'4',text:'Uất ức'}],['3','2','4','1'],'easy','Muốn vào → Chờ ngoài → Uất ức → Bóp nát cam',8),
      r(id,1,'true_false','Hành động bóp nát quả cam cho thấy Trần Quốc Toản rất mạnh mẽ. Đúng hay sai?',null,true,'easy','Sức mạnh bóp nát cam thể hiện cả sức khỏe lẫn tinh thần của chàng',9),
      r(id,1,'single_choice','Từ nào thể hiện lòng yêu nước của Trần Quốc Toản?',[{key:'A',text:'Đánh giặc, bảo vệ đất nước'},{key:'B',text:'Mua sắm, vui chơi'},{key:'C',text:'Ngủ nghỉ, ăn uống'}],'A','easy','Đánh giặc và bảo vệ đất nước là biểu hiện của lòng yêu nước',10),
      // Ex2 medium – who is Trần Quốc Toản, what he did
      r(id,2,'single_choice','Trần Quốc Toản sống vào thời đại nào trong lịch sử Việt Nam?',[{key:'A',text:'Thời Lý'},{key:'B',text:'Thời Trần'},{key:'C',text:'Thời Lê'}],'B','medium','Trần Quốc Toản là thiếu niên anh hùng thời nhà Trần',1),
      r(id,2,'single_choice','Sau khi không được vào hội nghị, Trần Quốc Toản đã làm gì?',[{key:'A',text:'Về nhà khóc'},{key:'B',text:'Tự chiêu mộ nghĩa quân và dương cờ đánh giặc'},{key:'C',text:'Chờ mãi bên ngoài'}],'B','medium','Trần Quốc Toản tự lập quân đội riêng và đánh giặc Nguyên Mông',2),
      r(id,2,'true_false','Trần Quốc Toản đã lập được chiến công trong cuộc kháng chiến chống giặc Nguyên. Đúng hay sai?',null,true,'medium','Chàng thiếu niên dũng cảm đã lập nhiều chiến công trong kháng chiến',3),
      r(id,2,'matching','Nối sự kiện với ý nghĩa:',[{key:'A',text:'Bóp nát quả cam'},{key:'B',text:'Tự lập quân đánh giặc'},{key:'C',text:'Dương cờ "Phá cường địch, báo hoàng ân"'}],{A:'Uất ức, căm thù giặc',B:'Tinh thần tự lực và dũng cảm',C:'Lòng trung thành với vua và Tổ quốc'},'medium',null,4),
      r(id,2,'fill_blank','Trần Quốc Toản dương lá cờ có chữ "Phá cường địch, [b1] hoàng ân".',[{key:'b1',text:''}],{b1:'báo'},'medium','Lá cờ thể hiện quyết tâm đánh giặc báo ơn vua',5),
      r(id,2,'single_choice','Điều gì khiến Trần Quốc Toản trở thành anh hùng dù còn trẻ?',[{key:'A',text:'Chàng rất cao lớn'},{key:'B',text:'Lòng yêu nước và tinh thần dũng cảm không sợ giặc'},{key:'C',text:'Chàng giàu có'}],'B','medium','Phẩm chất anh hùng không phụ thuộc vào tuổi tác mà vào tấm lòng',6),
      r(id,2,'true_false','Câu chuyện "Bóp nát quả cam" là câu chuyện lịch sử. Đúng hay sai?',null,true,'medium','Trần Quốc Toản là nhân vật lịch sử có thật trong thời nhà Trần',7),
      r(id,2,'sorting','Sắp xếp hành động của Trần Quốc Toản: lập chiến công / bóp nát cam / muốn đánh giặc / tự lập quân',[{key:'1',text:'Lập chiến công'},{key:'2',text:'Bóp nát cam'},{key:'3',text:'Muốn đánh giặc'},{key:'4',text:'Tự lập quân'}],['3','2','4','1'],'medium','Muốn đánh → Bóp cam → Tự lập quân → Lập chiến công',8),
      r(id,2,'single_choice','Hình ảnh quả cam bị bóp nát gợi lên điều gì?',[{key:'A',text:'Chàng thích ăn cam'},{key:'B',text:'Sức mạnh và lòng uất ức căm thù giặc của Trần Quốc Toản'},{key:'C',text:'Cam ở thời Trần rất cứng'}],'B','medium','Đây là hình ảnh ẩn dụ cho tinh thần yêu nước mạnh mẽ của chàng thiếu niên',9),
      r(id,2,'fill_blank','Trần Quốc Toản là tấm gương về [b1] và dũng cảm cho thế hệ trẻ.',[{key:'b1',text:''}],{b1:'yêu nước'},'medium','Lòng yêu nước và dũng cảm là phẩm chất đáng học hỏi từ Trần Quốc Toản',10),
      // Ex3 hard – historical context, character traits (yêu nước, dũng cảm)
      r(id,3,'single_choice','Câu chuyện "Bóp nát quả cam" thuộc thể loại văn học nào?',[{key:'A',text:'Thơ'},{key:'B',text:'Truyện lịch sử'},{key:'C',text:'Truyện cổ tích'}],'B','hard','Đây là truyện kể dựa trên nhân vật lịch sử Trần Quốc Toản',1),
      r(id,3,'fill_blank','Tinh thần [b1] của Trần Quốc Toản đã được nhân dân ta ca ngợi qua nhiều thế kỷ.',[{key:'b1',text:''}],{b1:'yêu nước'},'hard','Lòng yêu nước là phẩm chất được dân tộc Việt Nam trân trọng',2),
      r(id,3,'true_false','Tuổi trẻ không thể cống hiến gì cho đất nước. Đúng hay sai?',null,false,'hard','Trần Quốc Toản là minh chứng tuổi trẻ có thể đóng góp lớn cho đất nước',3),
      r(id,3,'single_choice','Nhà Trần chống giặc Nguyên Mông bao nhiêu lần?',[{key:'A',text:'Một lần'},{key:'B',text:'Hai lần'},{key:'C',text:'Ba lần'}],'C','hard','Nhà Trần đã ba lần đánh thắng quân Nguyên Mông xâm lược',4),
      r(id,3,'matching','Nối phẩm chất với biểu hiện của Trần Quốc Toản:',[{key:'A',text:'Yêu nước'},{key:'B',text:'Dũng cảm'},{key:'C',text:'Quyết đoán'}],{A:'Muốn đánh giặc bảo vệ Tổ quốc',B:'Tự lập quân dù còn trẻ',C:'Dương cờ và ra trận không do dự'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp theo tầm quan trọng trong câu chuyện: câu chuyện lịch sử / bài học yêu nước / chi tiết quả cam / nhân vật Trần Quốc Toản',[{key:'1',text:'Câu chuyện lịch sử'},{key:'2',text:'Bài học yêu nước'},{key:'3',text:'Chi tiết quả cam'},{key:'4',text:'Nhân vật Trần Quốc Toản'}],['4','3','1','2'],'hard','Nhân vật chính → Chi tiết đặc sắc → Bối cảnh lịch sử → Bài học đạo đức',6),
      r(id,3,'true_false','Hình ảnh "bóp nát quả cam" trở thành biểu tượng của lòng yêu nước trong văn hóa Việt Nam. Đúng hay sai?',null,true,'hard','Chi tiết ấn tượng này đã đi vào lịch sử và văn hóa dân tộc',7),
      r(id,3,'fill_blank','Em học được từ Trần Quốc Toản: dù còn nhỏ vẫn phải có [b1] đối với Tổ quốc.',[{key:'b1',text:''}],{b1:'trách nhiệm'},'hard','Trách nhiệm với đất nước không phân biệt lớn hay nhỏ',8),
      r(id,3,'single_choice','So với các thiếu niên cùng thời, Trần Quốc Toản đặc biệt ở điểm gì?',[{key:'A',text:'Chàng cao nhất'},{key:'B',text:'Lòng yêu nước và quyết tâm đánh giặc vượt lứa tuổi'},{key:'C',text:'Chàng thông minh nhất'}],'B','hard','Sự chín chắn về tinh thần yêu nước và dũng khí là điều đặc biệt của Trần Quốc Toản',9),
      r(id,3,'single_choice','Bài học nào em rút ra được từ câu chuyện về Trần Quốc Toản?',[{key:'A',text:'Nên bóp nát tất cả các quả cam'},{key:'B',text:'Dù còn nhỏ, hãy yêu nước và sẵn sàng đóng góp cho Tổ quốc'},{key:'C',text:'Không cần lo lắng về đất nước'}],'B','hard','Câu chuyện khuyến khích tinh thần yêu nước từ nhỏ',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1201: Bài 24 – Chiếc rễ đa tròn ───────────────────────────────────────
  {
    const id = 1201;
    const rows: any[][] = [
      // Ex1 easy – tree vocab
      r(id,1,'single_choice','Rễ đa là gì?',[{key:'A',text:'Rễ của cây đa'},{key:'B',text:'Rễ của cây cam'},{key:'C',text:'Rễ của cây thông'}],'A','easy','Cây đa có rễ khí sinh rủ xuống từ cành, còn gọi là rễ đa',1),
      r(id,1,'single_choice','Chiếc rễ đa tròn trong bài liên quan đến ai?',[{key:'A',text:'Bác Hồ'},{key:'B',text:'Bác Giáp'},{key:'C',text:'Bác Tôn'}],'A','easy','Câu chuyện kể về chiếc rễ đa tròn trong vườn nhà Bác Hồ',2),
      r(id,1,'single_choice','Cây đa thường mọc ở đâu?',[{key:'A',text:'Dưới biển'},{key:'B',text:'Sân vườn, đầu làng, cổng đình'},{key:'C',text:'Trên núi cao'}],'B','easy','Cây đa thường thấy ở đầu làng, cổng đình, sân vườn rộng',3),
      r(id,1,'true_false','Bác Hồ rất quan tâm đến thiên nhiên và cây cối. Đúng hay sai?',null,true,'easy','Bác Hồ nổi tiếng yêu thiên nhiên, thường chăm sóc vườn tược',4),
      r(id,1,'true_false','Chiếc rễ đa tròn là một điều bình thường không có ý nghĩa gì. Đúng hay sai?',null,false,'easy','Chiếc rễ đa tròn mang ý nghĩa văn hóa và lịch sử đặc biệt',5),
      r(id,1,'fill_blank','Cây [b1] có bộ rễ lớn và tuổi thọ rất cao.',[{key:'b1',text:''}],{b1:'đa'},'easy','Cây đa là loài cây to lớn, sống lâu năm',6),
      r(id,1,'fill_blank','Bác Hồ thường [b1] sóc cây cối trong vườn của mình.',[{key:'b1',text:''}],{b1:'chăm'},'easy','Chăm sóc cây là thói quen của Bác Hồ',7),
      r(id,1,'sorting','Sắp xếp từ thành câu: "tròn / rễ / chiếc / vườn / trong"',[{key:'1',text:'tròn'},{key:'2',text:'rễ'},{key:'3',text:'chiếc'},{key:'4',text:'vườn'},{key:'5',text:'trong'}],['3','2','1','5','4'],'easy','Chiếc rễ tròn trong vườn',8),
      r(id,1,'true_false','Cây đa là loài cây gắn bó với làng quê Việt Nam. Đúng hay sai?',null,true,'easy','Cây đa là biểu tượng quen thuộc của làng quê Việt Nam',9),
      r(id,1,'single_choice','Từ nào liên quan đến cây đa?',[{key:'A',text:'Rễ, tán, bóng mát'},{key:'B',text:'Cánh, lông, mỏ'},{key:'C',text:'Vây, vảy, đuôi'}],'A','easy','Rễ, tán và bóng mát đều là đặc điểm của cây đa',10),
      // Ex2 medium – story of round banyan root at Hồ Chí Minh's garden
      r(id,2,'single_choice','Chiếc rễ đa tròn được tạo thành như thế nào?',[{key:'A',text:'Do người ta cắt tỉa thành hình tròn'},{key:'B',text:'Bác Hồ uốn rễ đa thành vòng tròn để làm xà đơn cho thiếu nhi tập thể dục'},{key:'C',text:'Rễ cây tự nhiên mọc thành hình tròn'}],'B','medium','Bác Hồ uốn rễ đa thành vòng tròn để tặng cho thiếu nhi tập luyện',1),
      r(id,2,'single_choice','Bác Hồ làm chiếc rễ đa tròn với mục đích gì?',[{key:'A',text:'Để trang trí vườn'},{key:'B',text:'Để làm xà đơn cho các cháu thiếu nhi tập thể dục'},{key:'C',text:'Để bán'}],'B','medium','Bác Hồ nghĩ đến thiếu nhi và tạo dụng cụ tập luyện cho các cháu',2),
      r(id,2,'true_false','Chiếc rễ đa tròn là minh chứng cho tình yêu của Bác Hồ với thiếu nhi. Đúng hay sai?',null,true,'medium','Hành động nhỏ nhưng ý nghĩa lớn, thể hiện tình cảm của Bác với trẻ em',3),
      r(id,2,'matching','Nối từ với nghĩa trong bài:',[{key:'A',text:'Vườn'},{key:'B',text:'Rễ'},{key:'C',text:'Chăm sóc'}],{A:'Khu đất trồng cây xung quanh nhà',B:'Phần cây mọc dưới đất hoặc rủ xuống',C:'Giữ gìn và nuôi dưỡng'},'medium',null,4),
      r(id,2,'fill_blank','Bác Hồ uốn rễ đa thành [b1] tròn để thiếu nhi tập xà đơn.',[{key:'b1',text:''}],{b1:'vòng'},'medium','Chiếc vòng rễ đa là dụng cụ tập thể dục giản dị mà ý nghĩa',5),
      r(id,2,'single_choice','Câu chuyện về chiếc rễ đa tròn cho thấy điều gì về Bác Hồ?',[{key:'A',text:'Bác thích làm đồ gỗ'},{key:'B',text:'Bác luôn quan tâm đến trẻ em và sức khỏe của thiếu nhi'},{key:'C',text:'Bác rất giỏi làm vườn'}],'B','medium','Câu chuyện nhỏ cho thấy tình cảm lớn của Bác với thiếu nhi',6),
      r(id,2,'true_false','Những vật dụng do Bác Hồ tạo ra đều được gìn giữ và trân trọng. Đúng hay sai?',null,true,'medium','Mọi kỷ vật liên quan đến Bác Hồ đều được gìn giữ cẩn thận',7),
      r(id,2,'sorting','Sắp xếp sự kiện trong câu chuyện: thiếu nhi tập thể dục / Bác Hồ uốn rễ đa / chiếc rễ đa trở thành xà đơn / Bác quan sát rễ đa',[{key:'1',text:'Thiếu nhi tập thể dục'},{key:'2',text:'Bác Hồ uốn rễ đa'},{key:'3',text:'Chiếc rễ đa trở thành xà đơn'},{key:'4',text:'Bác quan sát rễ đa'}],['4','2','3','1'],'medium','Quan sát → Uốn rễ → Thành xà đơn → Thiếu nhi tập',8),
      r(id,2,'single_choice','Điều gì làm cho câu chuyện về chiếc rễ đa tròn trở nên đặc biệt?',[{key:'A',text:'Chiếc rễ rất đắt tiền'},{key:'B',text:'Đó là sáng tạo từ thiên nhiên và tình yêu thương của Bác Hồ với thiếu nhi'},{key:'C',text:'Cây đa rất to'}],'B','medium','Ý nghĩa đặc biệt nằm ở người tạo ra và tình cảm đằng sau đó',9),
      r(id,2,'fill_blank','Chiếc rễ đa tròn là [b1] vật của Bác Hồ để lại cho thiếu nhi.',[{key:'b1',text:''}],{b1:'kỷ'},'medium','Kỷ vật là đồ vật được giữ lại làm kỷ niệm về người thân',10),
      // Ex3 hard – symbolism, historical/cultural significance
      r(id,3,'single_choice','Chiếc rễ đa tròn trong vườn Bác Hồ có ý nghĩa biểu tượng gì?',[{key:'A',text:'Chỉ là một chiếc rễ bình thường'},{key:'B',text:'Biểu tượng cho tình yêu thương của Bác Hồ với thế hệ tương lai'},{key:'C',text:'Biểu tượng cho cây đa Việt Nam'}],'B','hard','Hành động uốn rễ đa tượng trưng cho tình cảm sâu sắc của Bác với thiếu nhi',1),
      r(id,3,'fill_blank','Bác Hồ là [b1] của thiếu nhi Việt Nam, luôn quan tâm đến sức khỏe và hạnh phúc của các cháu.',[{key:'b1',text:''}],{b1:'Bác'},'hard','Bác Hồ được coi như người cha, người bác yêu thương của thiếu nhi cả nước',2),
      r(id,3,'true_false','Những câu chuyện nhỏ về Bác Hồ giúp ta hiểu hơn về con người và tư tưởng của Người. Đúng hay sai?',null,true,'hard','Qua những chi tiết nhỏ, ta thấy được sự vĩ đại trong đời thường của Bác',3),
      r(id,3,'single_choice','Cây đa trong văn hóa Việt Nam tượng trưng cho điều gì?',[{key:'A',text:'Sự giàu có'},{key:'B',text:'Sức mạnh bền vững, gắn bó với làng quê và truyền thống'},{key:'C',text:'Sự cô đơn'}],'B','hard','Cây đa là biểu tượng của sức sống bền bỉ và tình gắn bó làng quê Việt Nam',4),
      r(id,3,'matching','Nối hình ảnh với ý nghĩa biểu tượng:',[{key:'A',text:'Cây đa'},{key:'B',text:'Chiếc rễ tròn'},{key:'C',text:'Vườn Bác Hồ'}],{A:'Sức sống bền vững của dân tộc',B:'Tình yêu thương và sự sáng tạo',C:'Nơi lưu giữ ký ức lịch sử'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp từ cụ thể đến khái quát: tình yêu đất nước / chiếc rễ đa tròn / tình yêu thiếu nhi / tình yêu thương con người',[{key:'1',text:'Tình yêu đất nước'},{key:'2',text:'Chiếc rễ đa tròn'},{key:'3',text:'Tình yêu thiếu nhi'},{key:'4',text:'Tình yêu thương con người'}],['2','3','4','1'],'hard','Cụ thể đến khái quát: rễ đa → thiếu nhi → con người → đất nước',6),
      r(id,3,'true_false','Bài đọc giúp học sinh hiểu về một di tích lịch sử gắn với Bác Hồ. Đúng hay sai?',null,true,'hard','Chiếc rễ đa trong vườn Bác là di tích mang giá trị lịch sử và văn hóa',7),
      r(id,3,'fill_blank','Câu chuyện về chiếc rễ đa tròn nhắc nhở chúng ta [b1] và trân trọng những kỷ vật lịch sử.',[{key:'b1',text:''}],{b1:'gìn giữ'},'hard','Gìn giữ kỷ vật lịch sử là trách nhiệm của thế hệ sau',8),
      r(id,3,'single_choice','Tại sao câu chuyện này được đưa vào sách giáo khoa Tiếng Việt lớp 2?',[{key:'A',text:'Vì câu chuyện rất dài và phức tạp'},{key:'B',text:'Để giáo dục tình yêu Bác Hồ, yêu thiên nhiên và tình yêu đất nước từ nhỏ'},{key:'C',text:'Vì câu chuyện về cây đa đẹp'}],'B','hard','Câu chuyện kết hợp giáo dục về tình yêu lãnh tụ, thiên nhiên và đất nước',9),
      r(id,3,'single_choice','Hành động chăm sóc cây của Bác Hồ gợi cho em suy nghĩ gì?',[{key:'A',text:'Cần trồng thật nhiều cây đa'},{key:'B',text:'Người vĩ đại cũng quan tâm đến những điều nhỏ bé trong cuộc sống'},{key:'C',text:'Nên tìm hiểu về các loài cây'}],'B','hard','Qua việc chăm sóc cây, ta thấy tâm hồn tinh tế và tình yêu thiên nhiên của Bác',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── INSERT ALL ──────────────────────────────────────────────────────────────
  for (const lesson of lessons) {
    for (const row of lesson.rows) {
      await conn.execute(INSERT, row);
    }
    console.log(`✓ Lesson ${lesson.id}: ${lesson.rows.length} rows inserted`);
  }

  await conn.end();
  console.log('Done! Total lessons:', lessons.length);
}

seed().catch(console.error);
