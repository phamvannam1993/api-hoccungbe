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

  // ─── 1178: Bài 1 – Chuyện bốn mùa ─────────────────────────────────────────
  {
    const id = 1178;
    const rows: any[][] = [
      // Ex1 easy – từ vựng bốn mùa cơ bản
      r(id,1,'single_choice','Mùa nào trong năm có hoa đào nở rộ?',[{key:'A',text:'Mùa hè'},{key:'B',text:'Mùa xuân'},{key:'C',text:'Mùa thu'}],'B','easy','Hoa đào nở vào mùa xuân',1),
      r(id,1,'single_choice','Mùa hè thường có thời tiết như thế nào?',[{key:'A',text:'Lạnh và có tuyết'},{key:'B',text:'Mát mẻ và nhiều gió'},{key:'C',text:'Nóng và nắng nhiều'}],'C','easy','Mùa hè thời tiết nóng và nắng nhiều',2),
      r(id,1,'single_choice','Mùa nào lá cây thường chuyển sang màu vàng và rụng?',[{key:'A',text:'Mùa xuân'},{key:'B',text:'Mùa hè'},{key:'C',text:'Mùa thu'}],'C','easy','Mùa thu lá cây chuyển vàng và rụng',3),
      r(id,1,'true_false','Mùa đông là mùa lạnh nhất trong năm. Đúng hay sai?',null,true,'easy','Mùa đông thường lạnh nhất trong bốn mùa',4),
      r(id,1,'true_false','Mùa xuân là mùa của bão và lũ lụt. Đúng hay sai?',null,false,'easy','Mùa xuân là mùa ấm áp, có nhiều hoa nở',5),
      r(id,1,'fill_blank','Bốn mùa trong năm là: xuân, [b1], thu, đông.',[{key:'b1',text:''}],{b1:'hạ'},'easy','Bốn mùa: xuân, hạ (hè), thu, đông',6),
      r(id,1,'fill_blank','Mùa [b1] thường có mưa phùn và tiết trời se lạnh ở miền Bắc.',[{key:'b1',text:''}],{b1:'xuân'},'easy','Mùa xuân miền Bắc có mưa phùn và se lạnh',7),
      r(id,1,'sorting','Sắp xếp các mùa theo thứ tự trong năm: Hè, Đông, Xuân, Thu',[{key:'1',text:'Hè'},{key:'2',text:'Đông'},{key:'3',text:'Xuân'},{key:'4',text:'Thu'}],['3','1','4','2'],'easy','Thứ tự: Xuân → Hè → Thu → Đông',8),
      r(id,1,'matching','Nối mùa với đặc điểm:',[{key:'A',text:'Xuân'},{key:'B',text:'Hè'},{key:'C',text:'Đông'}],{A:'Hoa nở, ấm áp',B:'Nắng nóng, ve kêu',C:'Lạnh giá, mưa phùn'},'easy',null,9),
      r(id,1,'true_false','Mùa hè thường có ve kêu và học sinh được nghỉ học dài ngày. Đúng hay sai?',null,true,'easy','Đúng, mùa hè có ve kêu và nghỉ hè',10),
      // Ex2 medium
      r(id,2,'single_choice','Trong bài "Chuyện bốn mùa", mùa xuân được nhân hóa là ai?',[{key:'A',text:'Một người bà già'},{key:'B',text:'Một cô gái trẻ xinh đẹp'},{key:'C',text:'Một em bé'}],'B','medium','Mùa xuân được nhân hóa như cô gái trẻ xinh đẹp, tươi tắn',1),
      r(id,2,'single_choice','Mùa nào mang đến hoa quả chín mọng và ngày ngắn hơn đêm?',[{key:'A',text:'Mùa xuân'},{key:'B',text:'Mùa hè'},{key:'C',text:'Mùa thu'}],'C','medium','Mùa thu hoa quả chín và ngày ngắn dần',2),
      r(id,2,'single_choice','Điều gì đặc biệt mà mùa đông mang lại cho trẻ em vùng núi cao?',[{key:'A',text:'Nắng ấm để tắm biển'},{key:'B',text:'Tuyết rơi để vui chơi'},{key:'C',text:'Mưa to để tắm mưa'}],'B','medium','Mùa đông vùng núi cao có tuyết rơi',3),
      r(id,2,'true_false','Mỗi mùa trong năm đều có vẻ đẹp và đặc điểm riêng. Đúng hay sai?',null,true,'medium','Bốn mùa đều có vẻ đẹp và đặc trưng riêng',4),
      r(id,2,'true_false','Mùa hè ở miền Nam Việt Nam thường có nhiều mưa to. Đúng hay sai?',null,true,'medium','Mùa hè miền Nam là mùa mưa',5),
      r(id,2,'fill_blank','Mùa hè mang đến [b1] và tiếng ve kêu rộn rã.',[{key:'b1',text:''}],{b1:'nắng vàng'},'medium','Mùa hè có nắng vàng và tiếng ve kêu',6),
      r(id,2,'matching','Nối mùa với món quà mang lại:',[{key:'A',text:'Xuân'},{key:'B',text:'Hè'},{key:'C',text:'Thu'},{key:'D',text:'Đông'}],{A:'Hoa và chồi non',B:'Trái cây và nắng',C:'Lá vàng và quả chín',D:'Sương giá và không khí trong lành'},'medium',null,7),
      r(id,2,'sorting','Sắp xếp đặc điểm theo đúng mùa (Xuân→Hè→Thu→Đông): Tuyết rơi, Hoa nở, Lá vàng, Ve kêu',[{key:'1',text:'Tuyết rơi'},{key:'2',text:'Hoa nở'},{key:'3',text:'Lá vàng'},{key:'4',text:'Ve kêu'}],['2','4','3','1'],'medium','Xuân:hoa nở → Hè:ve kêu → Thu:lá vàng → Đông:tuyết',8),
      r(id,2,'single_choice','Câu nào diễn tả đúng đặc trưng của mùa xuân?',[{key:'A',text:'Gió bấc thổi lạnh, sương mù dày đặc'},{key:'B',text:'Trăm hoa đua nở, chim hót líu lo'},{key:'C',text:'Nắng gay gắt, hạn hán kéo dài'}],'B','medium','Mùa xuân trăm hoa đua nở, chim hót',9),
      r(id,2,'fill_blank','Mùa thu có bầu trời [b1] và không khí mát mẻ dễ chịu.',[{key:'b1',text:''}],{b1:'trong xanh'},'medium','Mùa thu bầu trời trong xanh, không khí mát',10),
      // Ex3 hard
      r(id,3,'single_choice','Biện pháp tu từ nào được dùng khi gọi bốn mùa như bốn người bạn?',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp ngữ'}],'B','hard','Gọi bốn mùa như người là nhân hóa',1),
      r(id,3,'single_choice','Tính từ nào dùng để miêu tả không khí mùa đông?',[{key:'A',text:'Oi bức'},{key:'B',text:'Giá lạnh'},{key:'C',text:'Ấm áp'}],'B','hard','Mùa đông giá lạnh',2),
      r(id,3,'fill_blank','Câu "Mùa xuân như cô gái trẻ đẹp" sử dụng biện pháp tu từ [b1].',[{key:'b1',text:''}],{b1:'so sánh'},'hard','Dùng "như" để so sánh mùa xuân với cô gái',3),
      r(id,3,'fill_blank','Các tính từ miêu tả mùa xuân: tươi [b1], xanh [b2], ấm [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'tắn',b2:'mướt',b3:'áp'},'hard',null,4),
      r(id,3,'matching','Nối tính từ với mùa phù hợp:',[{key:'A',text:'Oi ả, nóng bức'},{key:'B',text:'Vàng ươm, dịu mát'},{key:'C',text:'Giá rét, sương giá'},{key:'D',text:'Tươi xanh, mát lành'}],{A:'Mùa hè',B:'Mùa thu',C:'Mùa đông',D:'Mùa xuân'},'hard',null,5),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn miêu tả mùa xuân:',[{key:'1',text:'Chim hót líu lo trên cành cây xanh mướt.'},{key:'2',text:'Mùa xuân đến mang theo làn gió ấm áp.'},{key:'3',text:'Trăm hoa đua nhau khoe sắc rực rỡ.'},{key:'4',text:'Khắp nơi tràn đầy sức sống mới.'}],['2','3','1','4'],'hard',null,6),
      r(id,3,'true_false','Từ "rực rỡ" là tính từ miêu tả màu sắc hoặc vẻ đẹp nổi bật. Đúng hay sai?',null,true,'hard','Rực rỡ là tính từ chỉ màu sắc đẹp, nổi bật',7),
      r(id,3,'single_choice','Câu nào dùng nhân hóa đúng cách?',[{key:'A',text:'Mùa xuân đẹp như bức tranh.'},{key:'B',text:'Mùa xuân mỉm cười chào đón muôn loài.'},{key:'C',text:'Mùa xuân đến sớm năm nay.'}],'B','hard','Mỉm cười là hành động của người, dùng cho mùa xuân là nhân hóa',8),
      r(id,3,'fill_blank','Trong câu "Mùa đông khoác chiếc áo trắng tinh", động từ [b1] được dùng như hành động của con người.',[{key:'b1',text:''}],{b1:'khoác'},'hard','Khoác là động từ của người, dùng cho mùa đông là nhân hóa',9),
      r(id,3,'matching','Nối từ với loại từ:',[{key:'A',text:'ấm áp'},{key:'B',text:'nở rộ'},{key:'C',text:'mùa xuân'},{key:'D',text:'xanh mướt'}],{A:'Tính từ',B:'Động từ',C:'Danh từ',D:'Tính từ'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1179: Bài 2 – Mùa nước nổi ───────────────────────────────────────────
  {
    const id = 1179;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Mùa nước nổi thường xảy ra ở vùng nào của Việt Nam?',[{key:'A',text:'Miền núi phía Bắc'},{key:'B',text:'Đồng bằng sông Cửu Long'},{key:'C',text:'Vùng ven biển miền Trung'}],'B','easy','Mùa nước nổi (lũ) đặc trưng ở đồng bằng sông Cửu Long',1),
      r(id,1,'single_choice','Mùa nước nổi là mùa nào trong năm?',[{key:'A',text:'Mùa xuân'},{key:'B',text:'Mùa đông'},{key:'C',text:'Mùa mưa (hè - thu)'}],'C','easy','Mùa nước nổi xảy ra vào mùa mưa',2),
      r(id,1,'single_choice','Loài cá nào thường xuất hiện nhiều trong mùa nước nổi?',[{key:'A',text:'Cá voi'},{key:'B',text:'Cá linh'},{key:'C',text:'Cá mập'}],'B','easy','Cá linh là đặc sản mùa nước nổi',3),
      r(id,1,'true_false','Bông súng là loài cây mọc trên cánh đồng ngập lũ. Đúng hay sai?',null,true,'easy','Bông súng mọc nhiều trên đồng ngập nước mùa lũ',4),
      r(id,1,'true_false','Trong mùa nước nổi, người dân không thể di chuyển được. Đúng hay sai?',null,false,'easy','Người dân dùng thuyền để di chuyển trong mùa lũ',5),
      r(id,1,'fill_blank','Phương tiện di chuyển phổ biến trong mùa nước nổi là [b1].',[{key:'b1',text:''}],{b1:'thuyền'},'easy','Thuyền là phương tiện chính trong mùa lũ',6),
      r(id,1,'fill_blank','Cánh đồng [b1] là nơi nước tràn lên cao trong mùa lũ.',[{key:'b1',text:''}],{b1:'ngập nước'},'easy','Đồng bằng bị ngập nước trong mùa lũ',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'lũ'},{key:'B',text:'thuyền'},{key:'C',text:'bông súng'}],{A:'Nước dâng cao tràn bờ',B:'Phương tiện đi lại trên nước',C:'Loài hoa mọc dưới nước'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn theo độ nguy hiểm: Mưa nhỏ, Lũ lớn, Mưa vừa, Lũ nhỏ',[{key:'1',text:'Mưa nhỏ'},{key:'2',text:'Lũ lớn'},{key:'3',text:'Mưa vừa'},{key:'4',text:'Lũ nhỏ'}],['1','3','4','2'],'easy','Mưa nhỏ < Mưa vừa < Lũ nhỏ < Lũ lớn',9),
      r(id,1,'true_false','Người dân vùng lũ đã quen sống chung với lũ từ bao đời nay. Đúng hay sai?',null,true,'easy','Người dân đồng bằng sống chung với lũ hàng ngàn năm',10),
      // Ex2 medium
      r(id,2,'single_choice','Người dân vùng lũ thích ứng với mùa nước nổi bằng cách nào?',[{key:'A',text:'Bỏ đi nơi khác sinh sống'},{key:'B',text:'Đánh bắt cá và trồng rau muống nước'},{key:'C',text:'Xây tường ngăn nước vào nhà'}],'B','medium','Người dân tận dụng lũ để đánh cá, trồng rau',2),
      r(id,2,'single_choice','Bông súng trong mùa nước nổi có ý nghĩa gì với người dân?',[{key:'A',text:'Chỉ để ngắm cho đẹp'},{key:'B',text:'Là nguồn thức ăn và thuốc chữa bệnh'},{key:'C',text:'Dùng để xây nhà'}],'B','medium','Bông súng vừa là rau ăn, vừa là dược liệu',1),
      r(id,2,'fill_blank','Trong mùa nước nổi, trẻ em thường [b1] bắt cá cùng cha mẹ trên đồng.',[{key:'b1',text:''}],{b1:'theo thuyền'},'medium','Trẻ em theo thuyền ra đồng bắt cá',3),
      r(id,2,'true_false','Lũ lụt chỉ gây hại mà không mang lại lợi ích gì. Đúng hay sai?',null,false,'medium','Lũ mang phù sa màu mỡ cho đồng ruộng',4),
      r(id,2,'matching','Nối hoạt động với đặc điểm mùa nước nổi:',[{key:'A',text:'Đánh bắt cá linh'},{key:'B',text:'Hái bông súng'},{key:'C',text:'Đi thuyền trên đồng'}],{A:'Nguồn lợi thủy sản phong phú',B:'Rau rừng tự nhiên mùa lũ',C:'Di chuyển thay đường bộ'},'medium',null,5),
      r(id,2,'single_choice','Phù sa mùa lũ mang lại lợi ích gì cho đồng ruộng?',[{key:'A',text:'Làm đất khô cằn hơn'},{key:'B',text:'Bổ sung chất dinh dưỡng, giúp đất màu mỡ'},{key:'C',text:'Làm đất bị ô nhiễm'}],'B','medium','Phù sa làm đất thêm màu mỡ',6),
      r(id,2,'fill_blank','Sau mùa lũ, đất được bồi thêm [b1] màu mỡ giúp lúa tốt tươi.',[{key:'b1',text:''}],{b1:'phù sa'},'medium','Phù sa bồi đắp sau lũ',7),
      r(id,2,'sorting','Sắp xếp hoạt động trong ngày của người dân mùa lũ:',[{key:'1',text:'Nấu cơm bằng cá linh hái được'},{key:'2',text:'Chèo thuyền ra đồng sáng sớm'},{key:'3',text:'Thả lưới bắt cá trên cánh đồng'},{key:'4',text:'Thu lưới và chọn cá đem về'}],['2','3','4','1'],'medium','Sáng: ra đồng → thả lưới → thu lưới → về nấu ăn',8),
      r(id,2,'true_false','Cá linh chỉ xuất hiện vào mùa nước nổi ở đồng bằng sông Cửu Long. Đúng hay sai?',null,true,'medium','Cá linh theo mùa lũ về đồng bằng',9),
      r(id,2,'single_choice','Từ "nổi" trong "mùa nước nổi" có nghĩa là gì?',[{key:'A',text:'Nổi tiếng'},{key:'B',text:'Nổi lên cao, dâng lên'},{key:'C',text:'Nổi bật, đẹp'}],'B','medium','Nước nổi = nước dâng lên cao',10),
      // Ex3 hard
      r(id,3,'single_choice','Quan hệ nhân quả nào đúng về mùa nước nổi?',[{key:'A',text:'Lũ về → đất khô cằn → mất mùa'},{key:'B',text:'Mưa nhiều → lũ dâng → phù sa bồi đắp → đất màu mỡ'},{key:'C',text:'Nắng to → lũ dâng → cá chết hàng loạt'}],'B','hard','Mưa → lũ → phù sa → đất màu mỡ là chuỗi nhân quả đúng',1),
      r(id,3,'fill_blank','Từ "đồng bằng" chỉ địa hình [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'bằng phẳng',b2:'rộng lớn'},'hard','Đồng bằng là vùng đất bằng phẳng rộng lớn',2),
      r(id,3,'matching','Nối từ vùng lũ với nghĩa:',[{key:'A',text:'đồng ngập'},{key:'B',text:'phù sa'},{key:'C',text:'mùa nước nổi'},{key:'D',text:'cá linh'}],{A:'Cánh đồng bị nước bao phủ',B:'Đất bùn màu mỡ do lũ mang đến',C:'Mùa lũ hàng năm ở đồng bằng',D:'Loài cá nhỏ đặc trưng mùa lũ'},'hard',null,3),
      r(id,3,'sorting','Sắp xếp theo trình tự tự nhiên của mùa lũ:',[{key:'1',text:'Cá, tôm về đồng sinh sống'},{key:'2',text:'Mưa lớn kéo dài nhiều ngày'},{key:'3',text:'Lũ rút, đất được phù sa bồi đắp'},{key:'4',text:'Nước từ thượng nguồn đổ về dâng cao'}],['2','4','1','3'],'hard','Mưa → nước dâng → cá về → lũ rút',4),
      r(id,3,'true_false','Câu "Mùa nước nổi mang cá về như quà tặng thiên nhiên" sử dụng biện pháp so sánh. Đúng hay sai?',null,true,'hard','Dùng "như" để so sánh → biện pháp so sánh',5),
      r(id,3,'fill_blank','Trong câu "Con thuyền lướt nhẹ trên mặt nước phẳng lặng", từ [b1] là động từ chỉ cách di chuyển của thuyền.',[{key:'b1',text:''}],{b1:'lướt'},'hard','Lướt là động từ miêu tả cách thuyền di chuyển',6),
      r(id,3,'single_choice','Đoạn văn miêu tả mùa nước nổi nên bắt đầu bằng câu nào?',[{key:'A',text:'Mùa nước nổi, cánh đồng mênh mông nước trắng xóa.'},{key:'B',text:'Em rất thích ăn cá linh kho.'},{key:'C',text:'Thuyền là phương tiện đi lại.'}],'A','hard','Câu đầu nên giới thiệu khung cảnh chung',7),
      r(id,3,'matching','Nối từ láy với nghĩa:',[{key:'A',text:'mênh mông'},{key:'B',text:'lấp lánh'},{key:'C',text:'rì rào'}],{A:'Rộng lớn, không có giới hạn',B:'Ánh sáng phản chiếu lóng lánh',C:'Tiếng động nhẹ nhàng, liên tục'},'hard',null,8),
      r(id,3,'fill_blank','Từ "sinh sống" là từ [b1] nghĩa là cùng nhau tồn tại và phát triển.',[{key:'b1',text:''}],{b1:'ghép'},'hard','Sinh sống = từ ghép (sinh + sống)',9),
      r(id,3,'true_false','Người dân vùng lũ xem mùa nước nổi chỉ là thiên tai cần phòng chống. Đúng hay sai?',null,false,'hard','Họ sống chung với lũ, tận dụng lợi ích của lũ',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1180: Bài 3 – Họa mi hót ──────────────────────────────────────────────
  {
    const id = 1180;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Họa mi là loài gì?',[{key:'A',text:'Loài cá biển'},{key:'B',text:'Loài chim có giọng hót hay'},{key:'C',text:'Loài bướm nhiều màu sắc'}],'B','easy','Họa mi là loài chim nổi tiếng giọng hót',1),
      r(id,1,'single_choice','Từ nào diễn tả tiếng chim hót du dương, nhẹ nhàng?',[{key:'A',text:'Ầm ầm'},{key:'B',text:'Líu lo'},{key:'C',text:'Rầm rầm'}],'B','easy','Líu lo là từ mô phỏng tiếng chim hót nhẹ nhàng',2),
      r(id,1,'single_choice','Chim thường hót vào lúc nào trong ngày?',[{key:'A',text:'Ban đêm tối trời'},{key:'B',text:'Sáng sớm tinh mơ'},{key:'C',text:'Buổi trưa nắng gắt'}],'B','easy','Chim thường hót vào sáng sớm',3),
      r(id,1,'true_false','Từ "véo von" là từ mô phỏng tiếng chim hót. Đúng hay sai?',null,true,'easy','Véo von mô phỏng tiếng hót cao, trong của chim',4),
      r(id,1,'true_false','Họa mi chỉ hót vào mùa đông. Đúng hay sai?',null,false,'easy','Họa mi hót nhiều vào mùa xuân và hè',5),
      r(id,1,'fill_blank','Tiếng chim hót [b1] làm cho buổi sáng trở nên tươi vui.',[{key:'b1',text:''}],{b1:'líu lo'},'easy','Líu lo là âm thanh của tiếng chim',6),
      r(id,1,'fill_blank','Con [b1] có giọng hót hay nhất trong các loài chim.',[{key:'b1',text:''}],{b1:'họa mi'},'easy','Họa mi nổi tiếng hót hay',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'hót'},{key:'B',text:'líu lo'},{key:'C',text:'ngân nga'}],{A:'Chim kêu thành tiếng hay',B:'Tiếng hót nhỏ nhẹ, vui tươi',C:'Âm thanh kéo dài, ngân vang'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ mô phỏng âm thanh chim hót từ nhỏ đến lớn: Véo von, Líu lo, Ngân vang, Ríu rít',[{key:'1',text:'Véo von'},{key:'2',text:'Líu lo'},{key:'3',text:'Ngân vang'},{key:'4',text:'Ríu rít'}],['2','4','1','3'],'easy','Líu lo < Ríu rít < Véo von < Ngân vang',9),
      r(id,1,'true_false','Tiếng chim hót giúp con người thư giãn và cảm thấy vui vẻ. Đúng hay sai?',null,true,'easy','Tiếng chim hót có tác dụng làm dịu tâm hồn',10),
      // Ex2 medium
      r(id,2,'single_choice','Trong bài "Họa mi hót", tiếng hót của họa mi tác động đến mọi người như thế nào?',[{key:'A',text:'Làm mọi người buồn ngủ'},{key:'B',text:'Làm mọi người khó chịu'},{key:'C',text:'Làm mọi người thức dậy vui vẻ, yêu đời'}],'C','medium','Tiếng họa mi hót làm lòng người vui tươi',1),
      r(id,2,'single_choice','Từ "ngân nga" trong "tiếng hót ngân nga" có nghĩa là gì?',[{key:'A',text:'Tiếng hót ngắn và nhỏ'},{key:'B',text:'Tiếng hót kéo dài, vang xa'},{key:'C',text:'Tiếng hót to và chát chúa'}],'B','medium','Ngân nga = âm thanh kéo dài, vang xa',2),
      r(id,2,'fill_blank','Họa mi hót [b1] trên cành cây, tiếng hót [b2] khắp khu vườn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'líu lo',b2:'vang lên'},'medium',null,3),
      r(id,2,'true_false','Tiếng hót của họa mi được ví như một bản nhạc thiên nhiên. Đúng hay sai?',null,true,'medium','Tiếng hót như âm nhạc thiên nhiên tuyệt vời',4),
      r(id,2,'matching','Nối từ láy với loại âm thanh:',[{key:'A',text:'líu lo'},{key:'B',text:'ríu rít'},{key:'C',text:'véo von'},{key:'D',text:'ngân nga'}],{A:'Nhỏ nhẹ, vui tươi',B:'Nhiều âm xen kẽ, rộn ràng',C:'Cao, trong, xa',D:'Kéo dài, vang vọng'},'medium',null,5),
      r(id,2,'single_choice','Câu văn nào miêu tả tiếng họa mi hay nhất?',[{key:'A',text:'Con họa mi kêu ầm ĩ trong vườn.'},{key:'B',text:'Tiếng họa mi véo von ngân nga như tiếng sáo diều trên bầu trời.'},{key:'C',text:'Họa mi cất tiếng hót một tiếng rồi im.'}],'B','medium','Câu B dùng từ gợi cảm và so sánh hay',6),
      r(id,2,'fill_blank','Trong bài đọc, tiếng hót của họa mi làm cho [b1] trở nên sinh động và tươi vui.',[{key:'b1',text:''}],{b1:'buổi sáng'},'medium','Tiếng hót của họa mi làm buổi sáng tươi vui',7),
      r(id,2,'sorting','Sắp xếp các câu thành đoạn văn mô tả tiếng hót:',[{key:'1',text:'Tiếng hót vang lên ngân nga khắp vườn cây.'},{key:'2',text:'Sáng sớm, họa mi thức dậy trên cành.'},{key:'3',text:'Mọi người thức giấc với nụ cười trên môi.'},{key:'4',text:'Nó cất giọng hót líu lo, véo von.'}],['2','4','1','3'],'medium','Sáng → hót → vang lên → mọi người vui',8),
      r(id,2,'true_false','Từ "líu lo" và "véo von" đều là từ láy mô phỏng âm thanh. Đúng hay sai?',null,true,'medium','Cả hai đều là từ láy âm thanh (onomatopoeia)',9),
      r(id,2,'single_choice','Điều gì khiến tiếng họa mi đặc biệt hơn các loài chim khác?',[{key:'A',text:'Họa mi hót rất to'},{key:'B',text:'Giọng hót trong trẻo, ngân vang và có nhiều âm điệu'},{key:'C',text:'Họa mi chỉ hót một âm duy nhất'}],'B','medium','Giọng họa mi trong và có nhiều âm điệu',10),
      // Ex3 hard
      r(id,3,'single_choice','Biện pháp tu từ nào dùng trong câu "Tiếng hót họa mi như suối chảy róc rách"?',[{key:'A',text:'Nhân hóa'},{key:'B',text:'Điệp ngữ'},{key:'C',text:'So sánh'}],'C','hard','Dùng "như" để so sánh tiếng hót với suối chảy',1),
      r(id,3,'fill_blank','Từ "ríu rít" là từ [b1] mô phỏng [b2] của đàn chim.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'láy',b2:'âm thanh'},'hard','Ríu rít là từ láy âm thanh',2),
      r(id,3,'matching','Nối biện pháp tu từ với ví dụ:',[{key:'A',text:'So sánh'},{key:'B',text:'Nhân hóa'},{key:'C',text:'Điệp ngữ'}],{A:'Tiếng chim như tiếng đàn',B:'Chim ca hát chào đón mùa xuân',C:'Hót, hót mãi không thôi'},'hard',null,3),
      r(id,3,'true_false','Câu "Họa mi cất tiếng hát chào bình minh" dùng biện pháp nhân hóa. Đúng hay sai?',null,true,'hard','Hát chào là hành động của người, dùng cho chim là nhân hóa',4),
      r(id,3,'fill_blank','Câu "Tiếng chim hót véo von làm tan biến mọi âu lo" thể hiện [b1] của âm nhạc tự nhiên.',[{key:'b1',text:''}],{b1:'tác dụng chữa lành'},'hard','Tiếng chim có tác dụng xoa dịu, chữa lành tâm hồn',5),
      r(id,3,'sorting','Sắp xếp các bước viết đoạn văn tả tiếng chim hót:',[{key:'1',text:'Nêu cảm xúc của em khi nghe tiếng hót'},{key:'2',text:'Giới thiệu con chim và nơi nó đứng hót'},{key:'3',text:'Miêu tả âm thanh tiếng hót bằng từ láy'},{key:'4',text:'Kết đoạn bằng câu cảm nghĩ'}],['2','3','1','4'],'hard',null,6),
      r(id,3,'single_choice','Từ nào KHÔNG phải từ láy mô phỏng âm thanh?',[{key:'A',text:'líu lo'},{key:'B',text:'véo von'},{key:'C',text:'xanh mướt'},{key:'D',text:'ríu rít'}],'C','hard','Xanh mướt là tính từ chỉ màu sắc, không phải âm thanh',7),
      r(id,3,'fill_blank','Trong câu "Tiếng hót ngân vang khắp cánh rừng", từ [b1] là động từ và [b2] là tính từ chỉ mức độ.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ngân',b2:'vang'},'hard','Ngân là động từ, vang là tính từ bổ nghĩa',8),
      r(id,3,'true_false','Bài thơ về tiếng chim thường dùng nhiều từ láy gợi âm thanh. Đúng hay sai?',null,true,'hard','Thơ văn về chim hay dùng từ láy âm thanh như líu lo, véo von',9),
      r(id,3,'single_choice','Viết lại câu "Con chim hót" thêm từ gợi tả âm thanh, câu nào HAY nhất?',[{key:'A',text:'Con chim hót to.'},{key:'B',text:'Con chim hót líu lo véo von trên cành xanh biếc.'},{key:'C',text:'Con chim hót và hót.'}],'B','hard','Câu B dùng từ gợi tả âm thanh và màu sắc, hay và sinh động',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1181: Bài 4 – Tết đến rồi ─────────────────────────────────────────────
  {
    const id = 1181;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Tết Nguyên Đán diễn ra vào tháng nào âm lịch?',[{key:'A',text:'Tháng 12'},{key:'B',text:'Tháng 1'},{key:'C',text:'Tháng 6'}],'B','easy','Tết Nguyên Đán là mùng 1 tháng Giêng âm lịch',1),
      r(id,1,'single_choice','Loài hoa nào thường được chưng trong nhà dịp Tết ở miền Bắc?',[{key:'A',text:'Hoa mai'},{key:'B',text:'Hoa đào'},{key:'C',text:'Hoa sen'}],'B','easy','Hoa đào là biểu tượng Tết miền Bắc',2),
      r(id,1,'single_choice','Bánh chưng được gói bằng lá gì?',[{key:'A',text:'Lá chuối'},{key:'B',text:'Lá dong'},{key:'C',text:'Lá tre'}],'B','easy','Bánh chưng gói bằng lá dong',3),
      r(id,1,'true_false','Lì xì ngày Tết thường đựng trong phong bì đỏ. Đúng hay sai?',null,true,'easy','Phong bì đỏ tượng trưng cho may mắn, hạnh phúc',4),
      r(id,1,'true_false','Pháo hoa chỉ bắn vào buổi sáng ngày mùng 1 Tết. Đúng hay sai?',null,false,'easy','Pháo hoa thường bắn vào đêm giao thừa',5),
      r(id,1,'fill_blank','Đêm 30 Tết gọi là đêm [b1].',[{key:'b1',text:''}],{b1:'giao thừa'},'easy','Đêm giao thừa là thời khắc chuyển giao năm cũ và năm mới',6),
      r(id,1,'fill_blank','Trẻ em thích Tết vì được [b1] và mặc quần áo mới.',[{key:'b1',text:''}],{b1:'lì xì'},'easy','Lì xì tiền mừng tuổi là truyền thống dịp Tết',7),
      r(id,1,'matching','Nối từ Tết với nghĩa:',[{key:'A',text:'bánh chưng'},{key:'B',text:'hoa đào'},{key:'C',text:'lì xì'}],{A:'Bánh truyền thống ngày Tết miền Bắc',B:'Hoa đặc trưng Tết miền Bắc',C:'Phong bì tiền mừng tuổi'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các hoạt động Tết theo thứ tự thời gian:',[{key:'1',text:'Đi chúc Tết họ hàng'},{key:'2',text:'Chuẩn bị mâm cỗ Tất niên'},{key:'3',text:'Đón giao thừa xem pháo hoa'},{key:'4',text:'Mùng 1 đi lễ chùa'}],['2','3','1','4'],'easy','Tất niên → giao thừa → chúc Tết → lễ chùa',9),
      r(id,1,'true_false','Mâm cỗ ngày Tết thường có bánh chưng, dưa hành, thịt đông. Đúng hay sai?',null,true,'easy','Đây là các món ăn truyền thống ngày Tết',10),
      // Ex2 medium
      r(id,2,'single_choice','Phong tục nào thể hiện lòng biết ơn tổ tiên trong dịp Tết?',[{key:'A',text:'Đốt pháo hoa'},{key:'B',text:'Thắp hương cúng gia tiên'},{key:'C',text:'Mặc áo mới'}],'B','medium','Thắp hương cúng gia tiên là phong tục thể hiện biết ơn',1),
      r(id,2,'single_choice','Hoa mai là biểu tượng Tết của vùng nào?',[{key:'A',text:'Miền Bắc'},{key:'B',text:'Miền Trung và miền Nam'},{key:'C',text:'Vùng núi Tây Nguyên'}],'B','medium','Hoa mai là biểu tượng Tết miền Nam và miền Trung',2),
      r(id,2,'fill_blank','Câu chúc Tết thường gặp là "Chúc mừng năm [b1]" hoặc "Vạn sự như [b2]".',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mới',b2:'ý'},'medium',null,3),
      r(id,2,'true_false','Phong tục lì xì thể hiện mong muốn may mắn và sức khỏe cho người nhận. Đúng hay sai?',null,true,'medium','Lì xì kèm lời chúc mang ý nghĩa may mắn, sức khỏe',4),
      r(id,2,'matching','Nối hoạt động Tết với ý nghĩa:',[{key:'A',text:'Gói bánh chưng'},{key:'B',text:'Cúng giao thừa'},{key:'C',text:'Chúc Tết'},{key:'D',text:'Lì xì trẻ em'}],{A:'Giữ gìn truyền thống văn hóa',B:'Đón năm mới, cầu bình an',C:'Thể hiện tình cảm, gắn kết',D:'Mong trẻ hay ăn chóng lớn'},'medium',null,5),
      r(id,2,'single_choice','Tại sao mâm cỗ ngày Tết thường rất phong phú?',[{key:'A',text:'Để phô trương sự giàu có'},{key:'B',text:'Để cúng tổ tiên và đón khách với lòng hiếu khách'},{key:'C',text:'Vì ngày Tết phải ăn nhiều cho no'}],'B','medium','Mâm cỗ Tết thể hiện lòng thành kính và hiếu khách',6),
      r(id,2,'sorting','Sắp xếp các bước gói bánh chưng:',[{key:'1',text:'Buộc lạt và nấu trong nhiều giờ'},{key:'2',text:'Rửa và ngâm lá dong, gạo nếp, đậu xanh'},{key:'3',text:'Đặt gạo, đậu, thịt vào lá rồi gói'},{key:'4',text:'Xếp lá dong lên khuôn'}],['2','4','3','1'],'medium','Chuẩn bị → xếp lá → gói → nấu',7),
      r(id,2,'fill_blank','Ngày Tết, mọi người thường mặc quần áo [b1] và đi thăm [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'mới',b2:'họ hàng'},'medium',null,8),
      r(id,2,'true_false','Cây nêu ngày Tết có ý nghĩa xua đuổi tà ma và đón điều tốt lành. Đúng hay sai?',null,true,'medium','Cây nêu là phong tục cổ truyền bảo vệ gia đình',9),
      r(id,2,'single_choice','Cảm xúc nào thường gặp nhất khi Tết đến?',[{key:'A',text:'Buồn bã và lo lắng'},{key:'B',text:'Vui mừng, háo hức và ấm áp'},{key:'C',text:'Mệt mỏi và chán nản'}],'B','medium','Tết mang lại niềm vui, háo hức và ấm áp',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu nào thể hiện tình cảm gia đình trong dịp Tết sâu sắc nhất?',[{key:'A',text:'Tết có nhiều bánh kẹo ngon.'},{key:'B',text:'Ngày Tết, cả gia đình quây quần bên nhau, ôn lại kỷ niệm và ước mơ năm mới.'},{key:'C',text:'Tết được nghỉ học nhiều ngày.'}],'B','hard','Câu B thể hiện ý nghĩa sâu sắc về tình thân và hy vọng',1),
      r(id,3,'fill_blank','Phong tục Tết Nguyên Đán phản ánh [b1] và [b2] của người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'truyền thống văn hóa',b2:'đạo lý uống nước nhớ nguồn'},'hard',null,2),
      r(id,3,'matching','Nối biểu tượng Tết với ý nghĩa sâu xa:',[{key:'A',text:'Hoa đào, hoa mai'},{key:'B',text:'Bánh chưng xanh'},{key:'C',text:'Phong bì đỏ'},{key:'D',text:'Pháo hoa'}],{A:'Sức sống mới, may mắn đầu xuân',B:'Đất trời, tổ tiên và lòng biết ơn',C:'Lời chúc phúc, may mắn',D:'Niềm vui, xua đuổi điều xấu'},'hard',null,3),
      r(id,3,'true_false','Tết Nguyên Đán là dịp để người Việt thể hiện lòng biết ơn tổ tiên và gắn kết gia đình. Đúng hay sai?',null,true,'hard','Đây là ý nghĩa sâu xa nhất của Tết Nguyên Đán',4),
      r(id,3,'sorting','Sắp xếp cảm xúc theo mức độ từ nhẹ đến mạnh khi Tết đến:',[{key:'1',text:'Vui vẻ'},{key:'2',text:'Háo hức'},{key:'3',text:'Hạnh phúc vô bờ'},{key:'4',text:'Phấn khởi'}],['1','2','4','3'],'hard','Vui → háo hức → phấn khởi → hạnh phúc',5),
      r(id,3,'fill_blank','Câu "Tết đến, lòng người rộn ràng như tiếng trống hội" dùng biện pháp [b1].',[{key:'b1',text:''}],{b1:'so sánh'},'hard','Dùng như để so sánh → biện pháp so sánh',6),
      r(id,3,'single_choice','Từ "rộn ràng" trong câu Tết là từ loại gì?',[{key:'A',text:'Danh từ'},{key:'B',text:'Động từ'},{key:'C',text:'Tính từ'}],'C','hard','Rộn ràng là tính từ miêu tả trạng thái vui tươi, náo nhiệt',7),
      r(id,3,'true_false','Phong tục gói bánh chưng chỉ còn ở nông thôn, thành phố không còn nữa. Đúng hay sai?',null,false,'hard','Nhiều gia đình thành thị vẫn duy trì phong tục gói bánh chưng',8),
      r(id,3,'fill_blank','Viết một câu dùng so sánh về ngày Tết: Ngày Tết vui như [b1].',[{key:'b1',text:''}],{b1:'ngày hội lớn'},'hard','Có thể so sánh Tết với ngày hội hay niềm vui nào đó',9),
      r(id,3,'matching','Nối từ với loại từ trong câu Tết:',[{key:'A',text:'bánh chưng'},{key:'B',text:'rộn ràng'},{key:'C',text:'gói'},{key:'D',text:'xanh biếc'}],{A:'Danh từ',B:'Tính từ',C:'Động từ',D:'Tính từ'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1182: Bài 5 – Giọt nước và biển lớn ──────────────────────────────────
  {
    const id = 1182;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Nước mưa rơi xuống đất rồi chảy đi đâu?',[{key:'A',text:'Bay lên trời ngay'},{key:'B',text:'Chảy vào suối, sông rồi ra biển'},{key:'C',text:'Chìm xuống lòng đất mãi mãi'}],'B','easy','Nước mưa → suối → sông → biển',1),
      r(id,1,'single_choice','Hơi nước bốc lên từ biển tạo thành gì?',[{key:'A',text:'Băng tuyết'},{key:'B',text:'Mây và mưa'},{key:'C',text:'Sóng biển'}],'B','easy','Hơi nước → mây → mưa là vòng tuần hoàn của nước',2),
      r(id,1,'single_choice','Giọt nước nhỏ bé chảy từ đâu đến đâu trong vòng tuần hoàn?',[{key:'A',text:'Từ biển lên núi'},{key:'B',text:'Từ mây rơi xuống đất rồi chảy ra biển'},{key:'C',text:'Từ sông lên núi'}],'B','easy','Mây → mưa → đất → sông → biển',3),
      r(id,1,'true_false','Suối nhỏ chảy vào sông, sông chảy ra biển. Đúng hay sai?',null,true,'easy','Đây là hành trình của nước từ nguồn ra biển',4),
      r(id,1,'true_false','Nước trên trái đất không bao giờ thay đổi hay di chuyển. Đúng hay sai?',null,false,'easy','Nước luôn chuyển động trong vòng tuần hoàn',5),
      r(id,1,'fill_blank','Vòng tuần hoàn của nước: mưa → suối → sông → [b1].',[{key:'b1',text:''}],{b1:'biển'},'easy','Nước chảy từ đất liền ra biển',6),
      r(id,1,'fill_blank','Nước biển bốc hơi lên tạo thành [b1] rồi rơi xuống thành mưa.',[{key:'b1',text:''}],{b1:'mây'},'easy','Hơi nước → mây → mưa',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'suối'},{key:'B',text:'hơi nước'},{key:'C',text:'vòng tuần hoàn'}],{A:'Dòng nước nhỏ chảy từ núi xuống',B:'Nước ở dạng khí bay lên',C:'Chu kỳ nước thay đổi liên tục'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp hành trình của giọt nước:',[{key:'1',text:'Chảy ra biển'},{key:'2',text:'Rơi xuống đất thành mưa'},{key:'3',text:'Bốc hơi lên thành mây'},{key:'4',text:'Chảy vào suối, sông'}],['2','4','1','3'],'easy','Mưa → suối/sông → biển → bốc hơi',9),
      r(id,1,'true_false','Giọt nước dù nhỏ bé cũng góp phần tạo nên biển cả rộng lớn. Đúng hay sai?',null,true,'easy','Nhiều giọt nước nhỏ hợp thành biển lớn',10),
      // Ex2 medium
      r(id,2,'single_choice','Giọt nước trong bài đã đi những đâu trước khi ra biển?',[{key:'A',text:'Từ biển vào sông rồi lên núi'},{key:'B',text:'Từ mây rơi xuống → suối → sông → biển'},{key:'C',text:'Từ đất bay thẳng lên bầu trời'}],'B','medium','Hành trình: mây → mưa → đất → suối → sông → biển',1),
      r(id,2,'single_choice','Bài học nào em học được từ câu chuyện "Giọt nước và biển lớn"?',[{key:'A',text:'Nước biển rất mặn'},{key:'B',text:'Những điều nhỏ bé góp lại sẽ tạo nên điều lớn lao'},{key:'C',text:'Nên uống nhiều nước'}],'B','medium','Bài học: nhỏ bé góp thành lớn lao',2),
      r(id,2,'fill_blank','Giọt nước tuy [b1] nhưng đã góp phần làm nên [b2] rộng lớn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhỏ bé',b2:'biển cả'},'medium','Nhỏ bé → biển cả là ý nghĩa bài học',3),
      r(id,2,'true_false','Câu chuyện về giọt nước muốn nói: đừng tự ti vì nhỏ bé, hãy cố gắng hết mình. Đúng hay sai?',null,true,'medium','Bài học về sự nỗ lực dù nhỏ bé',4),
      r(id,2,'matching','Nối giai đoạn vòng tuần hoàn với mô tả:',[{key:'A',text:'Bay hơi'},{key:'B',text:'Ngưng tụ'},{key:'C',text:'Mưa rơi'},{key:'D',text:'Chảy ra biển'}],{A:'Nước biến thành hơi nước bay lên',B:'Hơi nước lạnh thành mây',C:'Giọt nước rơi xuống đất',D:'Nước sông chảy vào biển'},'medium',null,5),
      r(id,2,'single_choice','Khi giọt nước bốc hơi và bay lên, đó là trạng thái vật chất nào?',[{key:'A',text:'Rắn'},{key:'B',text:'Lỏng'},{key:'C',text:'Khí'}],'C','medium','Hơi nước là trạng thái khí của nước',6),
      r(id,2,'fill_blank','Hành trình của giọt nước là biểu tượng cho tinh thần [b1] và [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'kiên nhẫn',b2:'bền bỉ'},'medium','Giọt nước kiên nhẫn và bền bỉ trên hành trình dài',7),
      r(id,2,'sorting','Sắp xếp vòng tuần hoàn nước đầy đủ:',[{key:'1',text:'Mây hình thành trên cao'},{key:'2',text:'Nước biển bốc hơi lên'},{key:'3',text:'Mưa rơi xuống đất'},{key:'4',text:'Nước chảy vào sông ra biển'}],['2','1','3','4'],'medium','Bay hơi → mây → mưa → chảy ra biển',8),
      r(id,2,'true_false','Câu "Giọt nước nhỏ bé, biển cả mênh mông" nói về sự tương phản giữa nhỏ và lớn. Đúng hay sai?',null,true,'medium','Tương phản nhỏ bé - mênh mông tạo ý nghĩa sâu sắc',9),
      r(id,2,'single_choice','Từ "mênh mông" dùng để miêu tả gì?',[{key:'A',text:'Tiếng sóng biển'},{key:'B',text:'Màu sắc của biển'},{key:'C',text:'Sự rộng lớn vô cùng của biển'}],'C','medium','Mênh mông = rộng lớn không có giới hạn',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu "Giọt nước nhỏ bé như hạt cát, nhưng biển lớn được tạo nên từ muôn giọt nước" nhằm truyền thông điệp gì?',[{key:'A',text:'Nước biển mặn hơn nước suối'},{key:'B',text:'Sự đóng góp nhỏ bé của mỗi cá nhân tạo nên sức mạnh lớn lao của tập thể'},{key:'C',text:'Chỉ biển mới quan trọng'}],'B','hard','Bài học về sự đóng góp cá nhân cho cộng đồng',1),
      r(id,3,'fill_blank','Câu "Giọt nước tí hon nhưng chứa đựng cả một cuộc hành trình dài" dùng biện pháp [b1] để nói về sự [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'ẩn dụ',b2:'kiên trì và bền bỉ'},'hard','Ẩn dụ hành trình dài nói về kiên trì',2),
      r(id,3,'matching','Nối từ với loại biện pháp tu từ:',[{key:'A',text:'"Giọt nước ơi, hãy cố lên!"'},{key:'B',text:'"Giọt nước nhỏ như hạt sương"'},{key:'C',text:'"Chảy mãi, chảy mãi không ngừng"'}],{A:'Nhân hóa',B:'So sánh',C:'Điệp ngữ'},'hard',null,3),
      r(id,3,'true_false','Câu chuyện "Giọt nước và biển lớn" chỉ nói về khoa học tự nhiên, không có ý nghĩa về đời sống. Đúng hay sai?',null,false,'hard','Bài có cả kiến thức khoa học và bài học đạo đức',4),
      r(id,3,'sorting','Sắp xếp luận điểm của bài học từ cụ thể đến tổng quát:',[{key:'1',text:'Nhiều điều nhỏ hợp lại thành điều lớn'},{key:'2',text:'Giọt nước nhỏ chảy vào suối'},{key:'3',text:'Mỗi cá nhân cần cố gắng góp phần cho cộng đồng'},{key:'4',text:'Suối hợp thành sông, sông chảy ra biển'}],['2','4','1','3'],'hard','Cụ thể → trừu tượng → bài học cuộc sống',5),
      r(id,3,'fill_blank','Từ "tí hon" là từ [b1] chỉ sự [b2] của giọt nước.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tính từ',b2:'nhỏ bé'},'hard','Tí hon là tính từ nghĩa là rất nhỏ',6),
      r(id,3,'single_choice','Câu nào KHÔNG thể hiện bài học từ câu chuyện giọt nước?',[{key:'A',text:'Đừng coi thường những việc nhỏ.'},{key:'B',text:'Kiên trì và bền bỉ sẽ đến đích.'},{key:'C',text:'Nên uống đủ 8 ly nước mỗi ngày.'}],'C','hard','Uống nước là khoa học sức khỏe, không phải bài học từ truyện',7),
      r(id,3,'fill_blank','Viết câu dùng so sánh: Giọt nước nhỏ bé như [b1] nhưng góp lại thành [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'hạt sương mai',b2:'biển cả mênh mông'},'hard',null,8),
      r(id,3,'true_false','Hành trình của giọt nước là hình ảnh ẩn dụ cho cuộc đời của mỗi người. Đúng hay sai?',null,true,'hard','Hành trình dài, kiên trì của nước ví như cuộc đời người',9),
      r(id,3,'matching','Nối từ với nghĩa trong văn cảnh bài:',[{key:'A',text:'mênh mông'},{key:'B',text:'tí hon'},{key:'C',text:'bền bỉ'},{key:'D',text:'hợp lại'}],{A:'Rộng lớn vô cùng',B:'Rất nhỏ bé',C:'Kiên trì, không bỏ cuộc',D:'Cùng nhau tạo thành'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1183: Bài 6 – Mùa vàng ────────────────────────────────────────────────
  {
    const id = 1183;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Mùa vàng trong bài thường chỉ mùa nào?',[{key:'A',text:'Mùa xuân hoa nở'},{key:'B',text:'Mùa lúa chín, thu hoạch'},{key:'C',text:'Mùa đông có tuyết'}],'B','easy','Mùa vàng là mùa lúa chín vàng',1),
      r(id,1,'single_choice','Người làm công việc trồng lúa và thu hoạch gọi là gì?',[{key:'A',text:'Ngư dân'},{key:'B',text:'Thợ mỏ'},{key:'C',text:'Nông dân'}],'C','easy','Nông dân là người làm ruộng',2),
      r(id,1,'single_choice','Cánh đồng lúa chín có màu gì?',[{key:'A',text:'Xanh tươi'},{key:'B',text:'Vàng óng'},{key:'C',text:'Đỏ rực'}],'B','easy','Lúa chín có màu vàng óng',3),
      r(id,1,'true_false','Công việc gặt lúa thường làm bằng tay hoặc máy gặt. Đúng hay sai?',null,true,'easy','Gặt lúa có thể bằng tay (liềm) hoặc máy gặt',4),
      r(id,1,'true_false','Đồng ruộng mùa lúa chín thường có mùi thơm dịu của lúa. Đúng hay sai?',null,true,'easy','Lúa chín tỏa hương thơm dịu nhẹ',5),
      r(id,1,'fill_blank','Mùa [b1] là khi cánh đồng ngập tràn sắc vàng của lúa chín.',[{key:'b1',text:''}],{b1:'vàng'},'easy','Mùa vàng = mùa lúa chín',6),
      r(id,1,'fill_blank','Nông dân [b1] lúa bằng liềm hoặc máy gặt.',[{key:'b1',text:''}],{b1:'gặt'},'easy','Gặt là động tác thu hoạch lúa',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'gặt'},{key:'B',text:'đồng ruộng'},{key:'C',text:'lúa vàng'}],{A:'Thu hoạch lúa khi chín',B:'Mảnh đất trồng trọt',C:'Lúa đã chín, có màu vàng'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp các bước trồng lúa theo thứ tự:',[{key:'1',text:'Gặt lúa'},{key:'2',text:'Gieo mạ'},{key:'3',text:'Cấy lúa'},{key:'4',text:'Chăm bón, tưới nước'}],['2','3','4','1'],'easy','Gieo mạ → cấy → chăm bón → gặt',9),
      r(id,1,'true_false','Từ "bội thu" nghĩa là thu hoạch được nhiều, mùa màng tốt. Đúng hay sai?',null,true,'easy','Bội thu = thu hoạch nhiều, vụ mùa thắng lợi',10),
      // Ex2 medium
      r(id,2,'single_choice','Cảnh đồng lúa chín vàng gợi lên cảm xúc gì cho người nhìn?',[{key:'A',text:'Buồn bã, lo lắng'},{key:'B',text:'Vui mừng, hy vọng và biết ơn thiên nhiên'},{key:'C',text:'Sợ hãi vì gần mùa đông'}],'B','medium','Lúa vàng gợi vui mừng vì mùa bội thu',1),
      r(id,2,'single_choice','Màu vàng của cánh đồng mùa gặt tượng trưng cho điều gì?',[{key:'A',text:'Mặt trời nắng gắt'},{key:'B',text:'Sự no ấm, sung túc và vụ mùa bội thu'},{key:'C',text:'Sự khô hạn và thiếu nước'}],'B','medium','Màu vàng lúa = no ấm, sung túc',2),
      r(id,2,'fill_blank','Câu "Cánh đồng vàng óng như tấm thảm khổng lồ" dùng biện pháp [b1].',[{key:'b1',text:''}],{b1:'so sánh'},'medium','Dùng như để so sánh cánh đồng với tấm thảm',3),
      r(id,2,'true_false','Mùa vàng không chỉ đẹp về màu sắc mà còn mang ý nghĩa no ấm cho người dân. Đúng hay sai?',null,true,'medium','Màu vàng = no ấm, sung túc về vật chất',4),
      r(id,2,'matching','Nối hình ảnh với ý nghĩa trong mùa vàng:',[{key:'A',text:'Cánh đồng vàng ươm'},{key:'B',text:'Tiếng máy gặt rộn ràng'},{key:'C',text:'Nụ cười nông dân'},{key:'D',text:'Bông lúa trĩu nặng'}],{A:'Mùa màng bội thu',B:'Không khí lao động hăng say',C:'Niềm vui sau mùa vụ thành công',D:'Lúa chín đầy hạt, năng suất cao'},'medium',null,5),
      r(id,2,'single_choice','Câu văn nào miêu tả đồng lúa chín hay nhất?',[{key:'A',text:'Đồng lúa có rất nhiều lúa.'},{key:'B',text:'Cánh đồng lúa chín vàng óng, mênh mông như biển vàng dưới nắng thu.'},{key:'C',text:'Nông dân đang gặt lúa trên ruộng.'}],'B','medium','Câu B dùng từ gợi tả màu sắc và so sánh đẹp',6),
      r(id,2,'fill_blank','Từ "óng ả" là [b1] tả màu sắc [b2], bóng đẹp của lúa chín.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tính từ',b2:'vàng'},'medium','Óng ả tính từ miêu tả màu vàng bóng đẹp',7),
      r(id,2,'sorting','Sắp xếp hoạt động của nông dân trong ngày gặt:',[{key:'1',text:'Mang lúa về nhà phơi khô'},{key:'2',text:'Ra đồng từ sáng sớm'},{key:'3',text:'Gặt lúa và bó thành từng bó'},{key:'4',text:'Ăn cơm trưa trên bờ ruộng'}],['2','3','4','1'],'medium','Ra đồng → gặt → ăn trưa → mang về',8),
      r(id,2,'true_false','Nông dân rất vui và tự hào khi nhìn cánh đồng lúa chín vàng do mình trồng. Đúng hay sai?',null,true,'medium','Thành quả lao động mang lại niềm vui và tự hào',9),
      r(id,2,'single_choice','Tại sao hình ảnh "biển vàng" thường được dùng để miêu tả cánh đồng lúa chín?',[{key:'A',text:'Vì đồng lúa có nước như biển'},{key:'B',text:'Vì màu vàng của lúa trải dài mênh mông như biển'},{key:'C',text:'Vì đồng lúa nằm gần biển'}],'B','medium','Biển vàng so sánh màu vàng mênh mông của lúa',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu nào dùng nhân hóa để miêu tả mùa vàng?',[{key:'A',text:'Lúa vàng óng trải dài trên cánh đồng.'},{key:'B',text:'Những bông lúa cúi đầu chào mừng mùa gặt.'},{key:'C',text:'Nông dân gặt lúa từ sáng đến tối.'}],'B','hard','Cúi đầu chào là hành động của người → nhân hóa',1),
      r(id,3,'fill_blank','Từ "trĩu nặng" trong "bông lúa trĩu nặng" là [b1] tả lúa [b2] hạt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tính từ',b2:'nhiều'},'hard','Trĩu nặng = nhiều, nặng trĩu vì đầy hạt',2),
      r(id,3,'matching','Nối biện pháp tu từ với câu văn:',[{key:'A',text:'Nhân hóa'},{key:'B',text:'So sánh'},{key:'C',text:'Điệp ngữ'}],{A:'Bông lúa khẽ gật đầu trước gió',B:'Cánh đồng như tấm vải vàng khổng lồ',C:'Vàng, vàng mãi khắp cánh đồng'},'hard',null,3),
      r(id,3,'true_false','Màu vàng trong văn học Việt Nam thường tượng trưng cho sự giàu có và no đủ. Đúng hay sai?',null,true,'hard','Màu vàng lúa gắn với no ấm, sung túc trong văn hóa Việt',4),
      r(id,3,'sorting','Sắp xếp câu thành đoạn văn miêu tả mùa vàng:',[{key:'1',text:'Nông dân tất bật gặt lúa với nụ cười rạng rỡ.'},{key:'2',text:'Tháng mười, cánh đồng khoác tấm áo vàng rực rỡ.'},{key:'3',text:'Mùa vàng về mang theo niềm vui no ấm của người dân.'},{key:'4',text:'Những bông lúa trĩu nặng cúi đầu như chào đón vụ gặt.'}],['2','4','1','3'],'hard','Tả khung cảnh → chi tiết lúa → nông dân → ý nghĩa',5),
      r(id,3,'fill_blank','Câu "Mùa vàng là mùa của hạnh phúc và no ấm" nêu lên [b1] của mùa gặt.',[{key:'b1',text:''}],{b1:'ý nghĩa'},'hard','Câu nêu ý nghĩa của mùa vàng với người dân',6),
      r(id,3,'single_choice','Từ nào KHÔNG phải tính từ chỉ màu sắc hoặc vẻ đẹp của lúa?',[{key:'A',text:'vàng óng'},{key:'B',text:'trĩu nặng'},{key:'C',text:'óng ả'},{key:'D',text:'rực rỡ'}],'B','hard','Trĩu nặng chỉ trạng thái, không phải màu sắc hay vẻ đẹp',7),
      r(id,3,'fill_blank','Viết câu tả cánh đồng mùa vàng có dùng tính từ: Cánh đồng [b1] trải dài [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'vàng óng',b2:'mênh mông'},'hard',null,8),
      r(id,3,'true_false','Bài văn miêu tả mùa vàng thường dùng nhiều tính từ chỉ màu sắc và tình cảm. Đúng hay sai?',null,true,'hard','Miêu tả mùa vàng cần tính từ màu sắc và cảm xúc',9),
      r(id,3,'matching','Nối từ với loại từ:',[{key:'A',text:'nông dân'},{key:'B',text:'gặt'},{key:'C',text:'vàng óng'},{key:'D',text:'bội thu'}],{A:'Danh từ',B:'Động từ',C:'Tính từ',D:'Tính từ'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1184: Bài 7 – Hạt thóc ────────────────────────────────────────────────
  {
    const id = 1184;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Hạt thóc là gì?',[{key:'A',text:'Hạt của cây ngô'},{key:'B',text:'Hạt của cây lúa chưa bóc vỏ'},{key:'C',text:'Hạt của cây đậu'}],'B','easy','Thóc là lúa chưa xay, còn vỏ trấu',1),
      r(id,1,'single_choice','Từ hạt thóc đến bát cơm, bước nào đến trước?',[{key:'A',text:'Nấu cơm'},{key:'B',text:'Xay thóc thành gạo'},{key:'C',text:'Vo gạo'}],'B','easy','Thóc → xay → gạo → vo → nấu',2),
      r(id,1,'single_choice','Công đoạn nào biến gạo thành cơm?',[{key:'A',text:'Gieo mạ'},{key:'B',text:'Xay thóc'},{key:'C',text:'Nấu cơm'}],'C','easy','Nấu cơm là bước cuối cùng',3),
      r(id,1,'true_false','Muốn có hạt thóc phải trải qua công đoạn gieo trồng và chăm sóc. Đúng hay sai?',null,true,'easy','Trồng lúa cần nhiều công đoạn chăm sóc',4),
      r(id,1,'true_false','Hạt thóc có thể ăn ngay mà không cần chế biến. Đúng hay sai?',null,false,'easy','Thóc cần xay thành gạo rồi nấu chín mới ăn được',5),
      r(id,1,'fill_blank','Hạt thóc → xay thành [b1] → vo sạch → nấu thành [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'gạo',b2:'cơm'},'easy','Thóc → gạo → cơm là hành trình của hạt thóc',6),
      r(id,1,'fill_blank','Nông dân [b1] hạt thóc xuống đất để trồng lúa vụ mới.',[{key:'b1',text:''}],{b1:'gieo'},'easy','Gieo là bước đầu tiên trồng lúa',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'thóc'},{key:'B',text:'gạo'},{key:'C',text:'cơm'}],{A:'Lúa sau khi gặt, chưa xay',B:'Thóc đã xay bỏ vỏ trấu',C:'Gạo đã nấu chín'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp hành trình hạt thóc thành bát cơm:',[{key:'1',text:'Nấu cơm'},{key:'2',text:'Gieo mạ, trồng lúa'},{key:'3',text:'Gặt lúa'},{key:'4',text:'Xay thóc thành gạo'}],['2','3','4','1'],'easy','Gieo → gặt → xay → nấu',9),
      r(id,1,'true_false','Bát cơm trắng mang trong đó mồ hôi và công sức của người nông dân. Đúng hay sai?',null,true,'easy','Mỗi bát cơm chứa đựng công lao vất vả',10),
      // Ex2 medium
      r(id,2,'single_choice','Tại sao chúng ta cần trân trọng từng hạt cơm?',[{key:'A',text:'Vì cơm rất đắt tiền'},{key:'B',text:'Vì mỗi hạt cơm là kết quả của bao công lao vất vả của người trồng lúa'},{key:'C',text:'Vì cơm dễ hỏng'}],'B','medium','Hạt cơm kết tinh công lao nông dân',1),
      r(id,2,'single_choice','Bài học nào từ câu chuyện "Hạt thóc"?',[{key:'A',text:'Nên học nghề nông'},{key:'B',text:'Trân trọng thành quả lao động, không lãng phí'},{key:'C',text:'Cơm ngon hơn bánh mì'}],'B','medium','Bài học: trân trọng hạt cơm, không lãng phí',2),
      r(id,2,'fill_blank','Hành trình từ hạt thóc đến bát cơm đòi hỏi [b1] công đoạn và rất nhiều [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhiều'},'medium','Nhiều công đoạn và công sức',3),
      r(id,2,'true_false','Câu tục ngữ "Dẻo thơm một hạt, đắng cay muôn phần" nói về công lao trồng lúa. Đúng hay sai?',null,true,'medium','Câu tục ngữ ca ngợi công lao nông dân làm ra hạt gạo',4),
      r(id,2,'matching','Nối công đoạn với mô tả:',[{key:'A',text:'Gieo mạ'},{key:'B',text:'Gặt'},{key:'C',text:'Xay thóc'},{key:'D',text:'Nấu cơm'}],{A:'Bỏ hạt thóc vào đất để mọc mầm',B:'Thu hoạch lúa chín ngoài đồng',C:'Tách vỏ trấu để lấy gạo',D:'Đun gạo với nước cho chín'},'medium',null,5),
      r(id,2,'single_choice','Câu "Một hạt thóc chứa đựng bao mồ hôi của người nông dân" nghĩa là gì?',[{key:'A',text:'Thóc bị ướt bởi mồ hôi'},{key:'B',text:'Thóc được làm ra từ nhiều công sức vất vả'},{key:'C',text:'Người nông dân đổ mồ hôi vào thóc'}],'B','medium','Câu nói về công lao vất vả làm ra thóc',6),
      r(id,2,'fill_blank','Người ta thường nói "Ăn [b1] nhớ kẻ trồng [b2]" để nhắc nhở sự biết ơn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'cơm',b2:'lúa'},'medium','Tục ngữ nhắc nhở biết ơn người trồng lúa',7),
      r(id,2,'sorting','Sắp xếp câu chuyện hạt thóc theo nhân quả:',[{key:'1',text:'Bát cơm thơm ngon trên mâm'},{key:'2',text:'Nông dân vất vả cày bừa, gieo mạ'},{key:'3',text:'Lúa chín vàng, gặt về phơi thóc'},{key:'4',text:'Xay thóc, vo gạo, nấu cơm'}],['2','3','4','1'],'medium','Vất vả → lúa chín → xay gạo → cơm',8),
      r(id,2,'true_false','Lãng phí thức ăn là không trân trọng công lao người làm ra nó. Đúng hay sai?',null,true,'medium','Lãng phí đồ ăn là không biết ơn người lao động',9),
      r(id,2,'single_choice','Từ "trân trọng" nghĩa là gì?',[{key:'A',text:'Cất giữ kỹ lưỡng trong tủ'},{key:'B',text:'Quý trọng, biết ơn và giữ gìn cẩn thận'},{key:'C',text:'Đem tặng cho người khác'}],'B','medium','Trân trọng = quý trọng, biết ơn',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu nào thể hiện bài học đạo đức từ câu chuyện hạt thóc?',[{key:'A',text:'Thóc nhiều thì gạo nhiều.'},{key:'B',text:'Mỗi hạt cơm là công sức của người nông dân, hãy ăn hết không để thừa.'},{key:'C',text:'Nên học cách nấu cơm ngon.'}],'B','hard','Câu B nêu bài học đạo đức về trân trọng',1),
      r(id,3,'fill_blank','Câu "Hạt thóc vàng mang trong mình giọt mồ hôi mặn của người nông dân" dùng biện pháp [b1].',[{key:'b1',text:''}],{b1:'ẩn dụ'},'hard','Ẩn dụ: mồ hôi = công sức vất vả',2),
      r(id,3,'matching','Nối nguyên nhân với kết quả:',[{key:'A',text:'Nông dân cày cấy chăm chỉ'},{key:'B',text:'Không tưới nước đúng lúc'},{key:'C',text:'Gặt đúng thời điểm lúa chín'}],{A:'Lúa tốt tươi, năng suất cao',B:'Lúa èo uột, mất mùa',C:'Thóc chắc hạt, gạo ngon'},'hard',null,3),
      r(id,3,'true_false','Tục ngữ "Ai ơi bưng bát cơm đầy, dẻo thơm một hạt đắng cay muôn phần" muốn nói về ý nghĩa của sự lao động vất vả. Đúng hay sai?',null,true,'hard','Câu tục ngữ ca ngợi sự vất vả và nhắc biết ơn',4),
      r(id,3,'sorting','Sắp xếp lập luận từ hiện tượng đến bài học:',[{key:'1',text:'Vì vậy, chúng ta cần trân trọng từng hạt cơm.'},{key:'2',text:'Hạt thóc phải trải qua nhiều công đoạn mới thành bát cơm.'},{key:'3',text:'Mỗi công đoạn đều đòi hỏi sức lao động vất vả của nông dân.'},{key:'4',text:'Lãng phí cơm là lãng phí công lao của bao người.'}],['2','3','4','1'],'hard','Hiện tượng → lý giải → hệ quả → bài học',5),
      r(id,3,'fill_blank','Từ "dẻo thơm" là [b1] gợi tả [b2] của hạt cơm.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tính từ ghép',b2:'vị ngon và mùi hương'},'hard','Dẻo thơm = tính từ ghép tả vị và mùi cơm',6),
      r(id,3,'single_choice','Câu văn nào dùng điệp ngữ nhấn mạnh sự vất vả?',[{key:'A',text:'Nông dân cày bừa trên đồng ruộng.'},{key:'B',text:'Vất vả, vất vả lắm mới có bát cơm ngon.'},{key:'C',text:'Cơm trắng, mềm và thơm.'}],'B','hard','Điệp ngữ vất vả lặp để nhấn mạnh',7),
      r(id,3,'fill_blank','Viết câu cảm ơn người nông dân: Cảm ơn [b1] đã [b2] để có bát cơm ngon.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'người nông dân',b2:'vất vả trồng lúa'},'hard',null,8),
      r(id,3,'true_false','Hiểu được hành trình của hạt thóc giúp em biết quý trọng lao động và không lãng phí. Đúng hay sai?',null,true,'hard','Hiểu hành trình → trân trọng công lao → không lãng phí',9),
      r(id,3,'matching','Nối từ với nghĩa nâng cao:',[{key:'A',text:'trân trọng'},{key:'B',text:'vất vả'},{key:'C',text:'bội thu'},{key:'D',text:'chắt chiu'}],{A:'Quý trọng, nâng niu',B:'Khó nhọc, mệt mỏi',C:'Thu hoạch nhiều, thành công',D:'Tiết kiệm, giữ gìn từng chút'},'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1185: Bài 8 – Lũy tre ─────────────────────────────────────────────────
  {
    const id = 1185;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Lũy tre là gì?',[{key:'A',text:'Hàng rào bằng gỗ quanh nhà'},{key:'B',text:'Hàng tre xanh bao quanh làng'},{key:'C',text:'Đống rơm trước sân đình'}],'B','easy','Lũy tre là hàng tre xanh bảo vệ xung quanh làng',1),
      r(id,1,'single_choice','Cây tre có đặc điểm gì nổi bật?',[{key:'A',text:'Thân mập, lá rộng, màu đỏ'},{key:'B',text:'Thân thẳng, đốt rõ, lá xanh, rễ sâu'},{key:'C',text:'Thân mềm, leo giàn, hoa đẹp'}],'B','easy','Tre có thân thẳng, lóng đốt, lá xanh, rễ sâu',2),
      r(id,1,'single_choice','Tre mọc thành từng bụi gọi là gì?',[{key:'A',text:'Bụi tre'},{key:'B',text:'Rừng thông'},{key:'C',text:'Vườn chuối'}],'A','easy','Bụi tre là nhóm tre mọc cùng nhau',3),
      r(id,1,'true_false','Cây tre có rễ rất sâu và lan rộng giúp giữ đất chống sói mòn. Đúng hay sai?',null,true,'easy','Rễ tre lan rộng, bám chắc giữ đất',4),
      r(id,1,'true_false','Lũy tre thường được trồng trong nhà thay vì xung quanh làng. Đúng hay sai?',null,false,'easy','Lũy tre trồng xung quanh làng, không phải trong nhà',5),
      r(id,1,'fill_blank','Cây [b1] gắn bó lâu đời với làng quê Việt Nam.',[{key:'b1',text:''}],{b1:'tre'},'easy','Tre là cây quen thuộc của làng quê Việt',6),
      r(id,1,'fill_blank','Lũy [b1] xanh bao quanh làng như bức tường bảo vệ.',[{key:'b1',text:''}],{b1:'tre'},'easy','Lũy tre bảo vệ làng quê',7),
      r(id,1,'matching','Nối từ với nghĩa:',[{key:'A',text:'lũy'},{key:'B',text:'bụi tre'},{key:'C',text:'rễ'}],{A:'Hàng cây dày tạo thành tường bảo vệ',B:'Nhóm nhiều cây tre mọc cùng nhau',C:'Phần cây ăn sâu vào lòng đất'},'easy',null,8),
      r(id,1,'sorting','Sắp xếp từ chỉ bộ phận cây tre từ dưới lên trên:',[{key:'1',text:'Ngọn'},{key:'2',text:'Rễ'},{key:'3',text:'Thân'},{key:'4',text:'Cành lá'}],['2','3','4','1'],'easy','Rễ → thân → cành lá → ngọn',9),
      r(id,1,'true_false','Tre là loài cây thân gỗ, sống lâu năm và không lan rộng. Đúng hay sai?',null,false,'easy','Tre thân rỗng, sinh sản bằng chồi, lan rộng thành bụi',10),
      // Ex2 medium
      r(id,2,'single_choice','Lũy tre tượng trưng cho điều gì trong văn hóa Việt Nam?',[{key:'A',text:'Sự giàu có và quyền lực'},{key:'B',text:'Tình yêu quê hương, sự gắn bó và che chở'},{key:'C',text:'Thiên nhiên hoang dã'}],'B','medium','Tre = quê hương, tình gắn bó, bảo vệ',1),
      r(id,2,'single_choice','Hình ảnh "lũy tre làng" gợi lên cảm xúc gì?',[{key:'A',text:'Buồn bã và cô đơn'},{key:'B',text:'Ấm áp, gần gũi, nhớ thương quê hương'},{key:'C',text:'Sợ hãi vì tre gai nhọn'}],'B','medium','Lũy tre gợi cảm xúc ấm áp, nhớ quê',2),
      r(id,2,'fill_blank','Cây tre đứng thẳng trong mưa bão tượng trưng cho [b1] và [b2] của người Việt.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'sức mạnh',b2:'kiên cường'},'medium','Tre kiên cường trong bão = người Việt mạnh mẽ',3),
      r(id,2,'true_false','Nhiều bài thơ, bài văn Việt Nam dùng hình ảnh cây tre để nói về quê hương. Đúng hay sai?',null,true,'medium','Tre là hình ảnh thơ văn quen thuộc về làng quê',4),
      r(id,2,'matching','Nối hình ảnh tre với ý nghĩa biểu tượng:',[{key:'A',text:'Rễ tre bám sâu'},{key:'B',text:'Thân tre thẳng'},{key:'C',text:'Lá tre xanh quanh năm'},{key:'D',text:'Bụi tre sum xuê'}],{A:'Tình yêu quê hương, cội nguồn',B:'Khí tiết, thẳng thắn, chính trực',C:'Sức sống bền bỉ, trường tồn',D:'Tình đoàn kết, sống cùng nhau'},'medium',null,5),
      r(id,2,'single_choice','Câu thơ nào dùng nhân hóa về cây tre?',[{key:'A',text:'Cây tre xanh tươi mát bên dòng sông.'},{key:'B',text:'Tre ơi, tre đứng hiên ngang trước bão tố.'},{key:'C',text:'Bụi tre mọc ven đường làng.'}],'B','medium','Tre ơi → gọi tre như gọi người → nhân hóa',6),
      r(id,2,'fill_blank','Hình ảnh lũy tre làng gợi nhớ [b1] của những người con xa quê.',[{key:'b1',text:''}],{b1:'quê hương'},'medium','Lũy tre gợi nhớ quê hương da diết',7),
      r(id,2,'sorting','Sắp xếp câu thành đoạn văn về lũy tre:',[{key:'1',text:'Lũy tre xanh là biểu tượng của làng quê Việt Nam.'},{key:'2',text:'Tre đứng vững trong mưa bão như người Việt kiên cường.'},{key:'3',text:'Mỗi bụi tre là một tập thể đoàn kết, nương tựa nhau.'},{key:'4',text:'Vì vậy, tre mãi là hình ảnh thân thương trong lòng mỗi người.'}],['1','3','2','4'],'medium','Giới thiệu → đoàn kết → kiên cường → kết luận',8),
      r(id,2,'true_false','Cây tre được dùng để làm nhà, đan lát, làm đũa và nhiều vật dụng khác. Đúng hay sai?',null,true,'medium','Tre đa dụng: nhà, đồ dùng, công cụ',9),
      r(id,2,'single_choice','Tại sao lũy tre là "tường thành" bảo vệ làng?',[{key:'A',text:'Vì tre rất cao che bóng mát'},{key:'B',text:'Vì bụi tre dày, gai nhọn, ngăn gió và người lạ vào làng'},{key:'C',text:'Vì tre có màu xanh đẹp'}],'B','medium','Bụi tre dày, gai nhọn là rào cản tự nhiên',10),
      // Ex3 hard
      r(id,3,'single_choice','Câu nào thể hiện ý nghĩa biểu tượng sâu sắc nhất của cây tre?',[{key:'A',text:'Tre có thân rỗng và nhiều đốt.'},{key:'B',text:'Tre như người Việt Nam: kiên cường, đoàn kết, gắn bó với quê hương.'},{key:'C',text:'Tre mọc nhiều ở đồng bằng.'}],'B','hard','Câu B nêu ý nghĩa biểu tượng đầy đủ nhất',1),
      r(id,3,'fill_blank','Câu "Lũy tre làng ôm ấp, che chở từng mái nhà" dùng biện pháp [b1] khi gán hành động [b2] cho lũy tre.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'nhân hóa',b2:'ôm ấp, che chở'},'hard','Ôm ấp, che chở là hành động của người → nhân hóa',2),
      r(id,3,'matching','Nối biểu tượng với ý nghĩa trong thơ văn:',[{key:'A',text:'Lũy tre'},{key:'B',text:'Rễ tre'},{key:'C',text:'Thân tre thẳng'},{key:'D',text:'Bụi tre sum xuê'}],{A:'Làng quê, quê hương',B:'Cội nguồn, gốc rễ',C:'Tinh thần ngay thẳng',D:'Sức mạnh đoàn kết'},'hard',null,3),
      r(id,3,'true_false','Thơ văn Việt Nam dùng hình ảnh tre để nói về phẩm chất kiên cường và tình đoàn kết dân tộc. Đúng hay sai?',null,true,'hard','Tre là biểu tượng dân tộc trong văn học Việt',4),
      r(id,3,'sorting','Sắp xếp từ ý cụ thể đến ý khái quát về cây tre:',[{key:'1',text:'Tre tượng trưng cho tinh thần Việt Nam bất khuất'},{key:'2',text:'Cây tre có thân thẳng, rễ sâu, sống thành bụi'},{key:'3',text:'Vì vậy tre là hình ảnh thân thương gắn với hồn Việt'},{key:'4',text:'Tre đứng vững trong bão, bụi tre che chở cho nhau'}],['2','4','1','3'],'hard','Đặc điểm → phẩm chất → ý nghĩa → kết luận',5),
      r(id,3,'fill_blank','Từ "kiên cường" là [b1] ghép, nghĩa là [b2] và mạnh mẽ trước khó khăn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tính từ',b2:'vững vàng'},'hard','Kiên cường = tính từ ghép: kiên + cường = vững vàng mạnh mẽ',6),
      r(id,3,'single_choice','Câu nào dùng điệp ngữ về cây tre?',[{key:'A',text:'Tre xanh, tre mát, tre che chở đời ta.'},{key:'B',text:'Cây tre cao vút lên bầu trời.'},{key:'C',text:'Bụi tre bên đường làng.'}],'A','hard','Tre xanh, tre mát, tre... lặp lại tre là điệp ngữ',7),
      r(id,3,'fill_blank','Viết câu dùng nhân hóa về lũy tre: Lũy tre [b1] đứng [b2] trước giông bão.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'làng',b2:'hiên ngang'},'hard',null,8),
      r(id,3,'true_false','Hình ảnh lũy tre trong thơ không chỉ đẹp về thiên nhiên mà còn chứa đựng ý nghĩa văn hóa sâu sắc. Đúng hay sai?',null,true,'hard','Lũy tre vừa đẹp, vừa chứa ý nghĩa văn hóa dân tộc',9),
      r(id,3,'matching','Nối từ với loại từ trong câu về cây tre:',[{key:'A',text:'lũy tre'},{key:'B',text:'xanh mướt'},{key:'C',text:'che chở'},{key:'D',text:'kiên cường'}],{A:'Danh từ',B:'Tính từ',C:'Động từ',D:'Tính từ'},'hard',null,10),
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
