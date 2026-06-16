import mysql from 'mysql2/promise';
const DB = { host:'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com', user:'admin', password:'jFUnRCumnerGsGaPT5pR', database:'songtute' };
const INSERT_SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  const conn = await mysql.createConnection(DB);

  const data: Array<[number, number, string, string, string | null, string, string, string, number, number]> = [

    // =========================================================
    // Lesson 1115: Khối trụ, khối cầu
    // =========================================================
    // Ex1 easy: 3×single_choice, 2×true_false, 2×fill_blank, 1×counting, 1×sorting, 1×cross_out
    [1115,1,'single_choice','Hình nào dưới đây là khối trụ?','["Quả bóng","Lon nước ngọt","Hộp bánh vuông","Viên gạch"]','["Lon nước ngọt"]','easy','Khối trụ có dạng hình ống như lon nước ngọt.',10,1],
    [1115,1,'single_choice','Hình nào dưới đây là khối cầu?','["Hộp sữa","Viên bi","Lon sơn","Cái hộp"]','["Viên bi"]','easy','Khối cầu có dạng tròn như viên bi.',10,2],
    [1115,1,'single_choice','Đồ vật nào có dạng khối trụ?','["Quả dưa hấu","Bánh xe","Ống nước","Viên đá"]','["Ống nước"]','easy','Ống nước có hình dạng khối trụ.',10,3],
    [1115,1,'true_false','Quả bóng có dạng khối cầu.','["Đúng","Sai"]','["Đúng"]','easy','Quả bóng có hình dạng tròn đều — đó là khối cầu.',10,4],
    [1115,1,'true_false','Khối trụ có thể lăn theo mọi hướng giống khối cầu.','["Đúng","Sai"]','["Sai"]','easy','Khối trụ chỉ lăn được theo một hướng; khối cầu lăn được mọi hướng.',10,5],
    [1115,1,'fill_blank','Lon sữa có dạng khối ___.',null,'["trụ"]','easy','Lon sữa hình ống — đó là khối trụ.',10,6],
    [1115,1,'fill_blank','Viên bi có dạng khối ___.',null,'["cầu"]','easy','Viên bi tròn đều — đó là khối cầu.',10,7],
    [1115,1,'counting','Đếm số khối trụ trong nhóm: lon nước, quả bóng, ống nhựa, viên bi, hộp bánh trụ.','["1","2","3","4","5"]','["3"]','easy','Lon nước, ống nhựa, hộp bánh trụ — có 3 khối trụ.',10,8],
    [1115,1,'sorting','Sắp xếp các đồ vật vào hai nhóm: khối trụ và khối cầu. Đồ vật: quả cam, lon bia, viên đạn bi, ống tre, trái địa cầu.','["khối trụ: lon bia, ống tre","khối cầu: quả cam, viên đạn bi, trái địa cầu"]','["khối trụ: lon bia, ống tre","khối cầu: quả cam, viên đạn bi, trái địa cầu"]','easy','Lon bia và ống tre là khối trụ; quả cam, viên đạn bi, trái địa cầu là khối cầu.',10,9],
    [1115,1,'cross_out','Gạch bỏ đồ vật KHÔNG phải khối cầu: quả bóng, viên bi, lon nước, trái dưa hấu.','["quả bóng","viên bi","lon nước","trái dưa hấu"]','["lon nước"]','easy','Lon nước là khối trụ, không phải khối cầu.',10,10],

    // Ex2 medium: 2×single_choice, 2×multiple_choice, 2×matching, 1×drag_drop, 1×table_fill, 1×number_line, 1×puzzle
    [1115,2,'single_choice','Mặt đáy của khối trụ có hình dạng gì?','["Hình vuông","Hình tròn","Hình tam giác","Hình chữ nhật"]','["Hình tròn"]','medium','Mặt đáy khối trụ là hình tròn.',10,11],
    [1115,2,'single_choice','Khối cầu khác khối trụ ở điểm nào?','["Màu sắc","Khối cầu không có mặt phẳng","Khối cầu nhẹ hơn","Khối cầu lớn hơn"]','["Khối cầu không có mặt phẳng"]','medium','Khối cầu hoàn toàn cong, không có mặt phẳng; khối trụ có hai mặt đáy phẳng.',10,12],
    [1115,2,'multiple_choice','Chọn TẤT CẢ đồ vật có dạng khối trụ:','["Lon bia","Quả bóng","Ống nước","Cuộn chỉ","Viên bi"]','["Lon bia","Ống nước","Cuộn chỉ"]','medium','Lon bia, ống nước và cuộn chỉ đều có hình khối trụ.',10,13],
    [1115,2,'multiple_choice','Chọn TẤT CẢ đặc điểm của khối cầu:','["Có hai mặt đáy tròn","Lăn được mọi hướng","Không có góc cạnh","Có mặt bên hình chữ nhật"]','["Lăn được mọi hướng","Không có góc cạnh"]','medium','Khối cầu tròn đều, không góc cạnh, lăn mọi hướng.',10,14],
    [1115,2,'matching','Nối đồ vật với hình khối tương ứng:','{"items":["Quả bóng tennis","Lon nước ngọt","Viên đạn bi","Ống tre"],"targets":["Khối cầu","Khối trụ"]}','{"Quả bóng tennis":"Khối cầu","Lon nước ngọt":"Khối trụ","Viên đạn bi":"Khối cầu","Ống tre":"Khối trụ"}','medium','Phân loại theo hình dạng.',10,15],
    [1115,2,'matching','Nối tính chất với hình khối:','{"items":["Lăn mọi hướng","Đứng thẳng được","Có mặt đáy tròn","Hoàn toàn cong"],"targets":["Khối cầu","Khối trụ"]}','{"Lăn mọi hướng":"Khối cầu","Đứng thẳng được":"Khối trụ","Có mặt đáy tròn":"Khối trụ","Hoàn toàn cong":"Khối cầu"}','medium','Tính chất phân biệt hai khối.',10,16],
    [1115,2,'drag_drop','Kéo thả đồ vật vào đúng nhóm khối trụ hoặc khối cầu:','{"items":["Quả cam","Hộp trụ","Bóng đá","Ống nhựa"],"zones":["Khối trụ","Khối cầu"]}','{"Khối trụ":["Hộp trụ","Ống nhựa"],"Khối cầu":["Quả cam","Bóng đá"]}','medium','Phân loại đúng hình khối.',10,17],
    [1115,2,'table_fill','Điền vào bảng: Đồ vật — Hình khối. Lon bia: ___, Viên bi: ___, Ống nước: ___, Quả bóng: ___.','{"headers":["Đồ vật","Hình khối"],"rows":[["Lon bia","?"],["Viên bi","?"],["Ống nước","?"],["Quả bóng","?"]]}','{"Lon bia":"Khối trụ","Viên bi":"Khối cầu","Ống nước":"Khối trụ","Quả bóng":"Khối cầu"}','medium','Phân loại từng đồ vật.',10,18],
    [1115,2,'number_line','Có 5 khối trụ và 3 khối cầu. Tổng cộng có bao nhiêu khối?','{"min":0,"max":10,"marks":[5,3]}','["8"]','medium','5 + 3 = 8 khối.',10,19],
    [1115,2,'puzzle','Ghép mảnh: Đặc điểm nào giúp phân biệt khối trụ và khối cầu?','["Khối trụ có mặt đáy phẳng","Khối cầu lăn mọi hướng","Khối trụ lăn một hướng","Khối cầu không có mặt phẳng"]','["Khối trụ có mặt đáy phẳng","Khối cầu lăn mọi hướng","Khối trụ lăn một hướng","Khối cầu không có mặt phẳng"]','medium','Tất cả các đặc điểm trên đều đúng.',10,20],

    // Ex3 hard: 2×fill_blank, 2×puzzle, 1×game, 1×sorting, 1×matching, 2×multiple_choice, 1×drag_drop
    [1115,3,'fill_blank','Khối trụ có ___ mặt đáy hình tròn và ___ mặt bên.',null,'["2","1"]','hard','Khối trụ có 2 mặt đáy hình tròn và 1 mặt bên cong.',10,21],
    [1115,3,'fill_blank','Khối cầu có ___ mặt phẳng.',null,'["0"]','hard','Khối cầu hoàn toàn cong, không có mặt phẳng nào.',10,22],
    [1115,3,'puzzle','Xếp hình: Dùng 2 khối trụ và 1 khối cầu xây tháp. Khối nào nên đặt ở dưới cùng?','["Khối cầu","Khối trụ","Cả hai đều được","Không xây được"]','["Khối trụ"]','hard','Khối trụ có đáy phẳng nên đặt dưới làm nền vững chắc.',10,23],
    [1115,3,'puzzle','Câu đố: Tôi có thể lăn nhưng không thể đứng yên trên mặt phẳng nghiêng. Tôi là hình gì?','["Khối trụ","Khối cầu","Khối hộp","Khối chóp"]','["Khối cầu"]','hard','Khối cầu lăn mọi hướng không giữ được vị trí trên mặt nghiêng.',10,24],
    [1115,3,'game','Trò chơi: Tìm nhanh — Trong 10 giây kể tên 3 đồ vật hình khối cầu và 3 đồ vật hình khối trụ trong nhà bếp.','{"khối cầu":["quả cam","quả táo","trứng"],"khối trụ":["lon thực phẩm","chai nước","ống hút"]}','{"khối cầu":["quả cam","quả táo","trứng"],"khối trụ":["lon thực phẩm","chai nước","ống hút"]}','hard','Ví dụ tham khảo — chấp nhận các đáp án hợp lý khác.',10,25],
    [1115,3,'sorting','Sắp xếp theo độ dễ lăn (dễ nhất → khó nhất): khối hộp, khối cầu, khối trụ.','["khối hộp","khối cầu","khối trụ"]','["khối cầu","khối trụ","khối hộp"]','hard','Khối cầu dễ lăn nhất (mọi hướng), khối trụ lăn một chiều, khối hộp không lăn.',10,26],
    [1115,3,'matching','Nối: Ứng dụng thực tế với hình khối phù hợp:','{"items":["Bánh xe","Bình nước","Bóng rổ","Lon sơn"],"targets":["Khối cầu","Khối trụ"]}','{"Bánh xe":"Khối trụ","Bình nước":"Khối trụ","Bóng rổ":"Khối cầu","Lon sơn":"Khối trụ"}','hard','Ứng dụng thực tế của hai hình khối.',10,27],
    [1115,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG về khối trụ:','["Có 2 mặt đáy tròn","Lăn mọi hướng","Có mặt bên cong","Không có góc cạnh nhọn"]','["Có 2 mặt đáy tròn","Có mặt bên cong","Không có góc cạnh nhọn"]','hard','Khối trụ lăn chỉ một hướng (không phải mọi hướng).',10,28],
    [1115,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG về khối cầu:','["Có mặt đáy phẳng","Không có góc","Lăn được mọi hướng","Có thể xếp chồng dễ dàng"]','["Không có góc","Lăn được mọi hướng"]','hard','Khối cầu không có góc, lăn mọi hướng nhưng không có mặt đáy phẳng và khó xếp chồng.',10,29],
    [1115,3,'drag_drop','Kéo thả: Xây tháp đúng cách — khối nào có thể xếp chồng ổn định?','{"items":["Khối cầu trên khối cầu","Khối trụ trên khối trụ","Khối trụ trên khối hộp"],"valid":true}','["Khối trụ trên khối trụ","Khối trụ trên khối hộp"]','hard','Khối trụ đứng thẳng nên xếp chồng được; khối cầu không xếp chồng ổn định.',10,30],

    // =========================================================
    // Lesson 1116: Luyện tập chung khối trụ, khối cầu
    // =========================================================
    // Ex1 easy
    [1116,1,'single_choice','Đồ vật nào có dạng khối trụ?','["Viên bi ve","Lon nước ngọt","Hộp sữa hình chữ nhật","Quả bóng"]','["Lon nước ngọt"]','easy','Lon nước ngọt hình ống — đó là khối trụ.',10,1],
    [1116,1,'single_choice','Đồ vật nào có dạng khối cầu?','["Ống tre","Trái cam","Hộp bánh","Cuộn chỉ"]','["Trái cam"]','easy','Trái cam tròn — đó là khối cầu.',10,2],
    [1116,1,'single_choice','Hình khối nào KHÔNG có mặt phẳng?','["Khối trụ","Khối hộp","Khối cầu","Khối chóp"]','["Khối cầu"]','easy','Khối cầu hoàn toàn cong, không có mặt phẳng.',10,3],
    [1116,1,'true_false','Khối trụ có thể lăn được.','["Đúng","Sai"]','["Đúng"]','easy','Khối trụ lăn được theo một hướng.',10,4],
    [1116,1,'true_false','Khối cầu và khối trụ đều không có mặt phẳng.','["Đúng","Sai"]','["Sai"]','easy','Khối trụ có 2 mặt đáy phẳng; chỉ khối cầu mới không có mặt phẳng.',10,5],
    [1116,1,'fill_blank','Mặt đáy của khối trụ có hình ___.',null,'["tròn"]','easy','Hai mặt đáy của khối trụ đều hình tròn.',10,6],
    [1116,1,'fill_blank','Khối cầu lăn được ___ hướng.',null,'["mọi"]','easy','Khối cầu tròn đều nên lăn mọi hướng.',10,7],
    [1116,1,'counting','Đếm số khối cầu: bóng đá, lon sơn, cam, trứng, ống nước, viên bi.','["1","2","3","4","5","6"]','["4"]','easy','Bóng đá, cam, trứng, viên bi — 4 khối cầu.',10,8],
    [1116,1,'sorting','Sắp xếp: khối trụ và khối cầu. Đồ vật: ống hút, bóng tennis, lon nước, quả táo, cuộn chỉ, viên đá cuội tròn.','["khối trụ: ống hút, lon nước, cuộn chỉ","khối cầu: bóng tennis, quả táo, viên đá cuội tròn"]','["khối trụ: ống hút, lon nước, cuộn chỉ","khối cầu: bóng tennis, quả táo, viên đá cuội tròn"]','easy','Phân loại theo hình dạng.',10,9],
    [1116,1,'cross_out','Gạch bỏ đồ vật KHÔNG phải khối trụ: ống sáo, lon bia, quả bóng, bình nước hình trụ.','["ống sáo","lon bia","quả bóng","bình nước hình trụ"]','["quả bóng"]','easy','Quả bóng là khối cầu, không phải khối trụ.',10,10],

    // Ex2 medium
    [1116,2,'single_choice','Có bao nhiêu mặt đáy của khối trụ?','["0","1","2","3"]','["2"]','medium','Khối trụ có 2 mặt đáy hình tròn.',10,11],
    [1116,2,'single_choice','Điểm khác nhau giữa khối trụ và khối cầu là gì?','["Khối trụ có màu sắc","Khối trụ có mặt đáy phẳng","Khối cầu lớn hơn","Khối trụ nhẹ hơn"]','["Khối trụ có mặt đáy phẳng"]','medium','Đặc điểm phân biệt quan trọng nhất.',10,12],
    [1116,2,'multiple_choice','Chọn tất cả đồ vật hình khối trụ:','["Lon bia","Quả bóng","Ống tre","Bóng đèn tròn","Hộp trụ đựng bánh"]','["Lon bia","Ống tre","Hộp trụ đựng bánh"]','medium','Ba đồ vật có hình dạng khối trụ.',10,13],
    [1116,2,'multiple_choice','Chọn đặc điểm của khối trụ:','["Có 2 mặt đáy hình tròn","Lăn mọi hướng","Có mặt bên cong","Không có mặt phẳng nào"]','["Có 2 mặt đáy hình tròn","Có mặt bên cong"]','medium','Khối trụ lăn một chiều và có mặt đáy phẳng.',10,14],
    [1116,2,'matching','Nối hình khối với đồ vật:','{"items":["Khối trụ","Khối cầu"],"targets":["Lon nước","Quả bóng","Ống nhựa","Viên bi"]}','{"Khối trụ":["Lon nước","Ống nhựa"],"Khối cầu":["Quả bóng","Viên bi"]}','medium','Mỗi hình khối có nhiều đồ vật đại diện.',10,15],
    [1116,2,'matching','Nối: Hình khối — Số mặt phẳng:','{"items":["Khối cầu","Khối trụ"],"targets":["0 mặt phẳng","2 mặt phẳng"]}','{"Khối cầu":"0 mặt phẳng","Khối trụ":"2 mặt phẳng"}','medium','Đặc điểm về mặt phẳng.',10,16],
    [1116,2,'drag_drop','Kéo thả đồ vật vào hộp phân loại:','{"items":["Bóng tennis","Lon nước","Cam","Ống hút","Viên bi"],"zones":["Khối trụ","Khối cầu"]}','{"Khối trụ":["Lon nước","Ống hút"],"Khối cầu":["Bóng tennis","Cam","Viên bi"]}','medium','Phân loại chính xác.',10,17],
    [1116,2,'table_fill','Điền bảng đặc điểm:','{"headers":["Hình khối","Có mặt phẳng","Lăn được","Đứng vững"],"rows":[["Khối trụ","?","?","?"],["Khối cầu","?","?","?"]]}','{"Khối trụ":{"Có mặt phẳng":"Có","Lăn được":"Có (1 chiều)","Đứng vững":"Có"},"Khối cầu":{"Có mặt phẳng":"Không","Lăn được":"Có (mọi chiều)","Đứng vững":"Không"}}','medium','So sánh hai hình khối.',10,18],
    [1116,2,'number_line','Trong lớp có 6 đồ vật khối trụ và 4 đồ vật khối cầu. Khối trụ nhiều hơn bao nhiêu?','{"min":0,"max":10}','["2"]','medium','6 - 4 = 2.',10,19],
    [1116,2,'puzzle','Câu đố hình khối: Tôi có 2 mặt tròn và 1 mặt cong. Tôi là hình gì?','["Khối cầu","Khối trụ","Khối hộp","Khối chóp"]','["Khối trụ"]','medium','Khối trụ có 2 mặt đáy tròn và 1 mặt bên cong.',10,20],

    // Ex3 hard
    [1116,3,'fill_blank','Để phân biệt khối trụ và khối cầu, ta có thể quan sát ___.',null,'["mặt đáy"]','hard','Khối trụ có mặt đáy phẳng; khối cầu không có.',10,21],
    [1116,3,'fill_blank','Khối trụ lăn theo ___ hướng, còn khối cầu lăn theo ___ hướng.',null,'["một","mọi"]','hard','Đặc điểm lăn của hai hình khối.',10,22],
    [1116,3,'puzzle','Xếp hình: Muốn xây tháp cao nhất, nên chọn hình khối nào làm nền?','["Khối cầu","Khối trụ","Cả hai giống nhau","Không xây được"]','["Khối trụ"]','hard','Khối trụ có mặt đáy phẳng, đứng vững hơn.',10,23],
    [1116,3,'puzzle','Câu đố: Tôi được dùng làm bánh xe vì tôi lăn tốt theo một hướng. Tôi là hình gì?','["Khối cầu","Khối trụ","Khối hộp","Khối chóp tứ giác"]','["Khối trụ"]','hard','Bánh xe hình khối trụ.',10,24],
    [1116,3,'game','Trò chơi nhóm: Mỗi nhóm có 1 phút liệt kê đồ vật hình khối trụ và khối cầu trong trường học. Nhóm nào nhiều hơn thắng.','{"gợi ý khối trụ":["ống bút","lon đựng bút","trống","cột cờ"],"gợi ý khối cầu":["bóng đá","bóng rổ","quả địa cầu"]}','{"khối trụ":["ống bút","lon đựng bút","trống","cột cờ"],"khối cầu":["bóng đá","bóng rổ","quả địa cầu"]}','hard','Chấp nhận đáp án hợp lý.',10,25],
    [1116,3,'sorting','Sắp xếp từ dễ lăn đến khó lăn: khối cầu, khối hộp, khối trụ, khối chóp.','["khối hộp","khối chóp","khối trụ","khối cầu"]','["khối cầu","khối trụ","khối chóp","khối hộp"]','hard','Khối cầu > trụ > chóp > hộp (dễ → khó lăn).',10,26],
    [1116,3,'matching','Nối ứng dụng với hình khối:','{"items":["Bóng đá","Ống cống","Quả địa cầu","Thùng phuy"],"targets":["Khối cầu","Khối trụ"]}','{"Bóng đá":"Khối cầu","Ống cống":"Khối trụ","Quả địa cầu":"Khối cầu","Thùng phuy":"Khối trụ"}','hard','Ứng dụng thực tế.',10,27],
    [1116,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG:','["Khối cầu có mặt đáy tròn","Khối trụ có thể đứng thẳng","Khối cầu không có góc cạnh","Khối trụ lăn theo mọi hướng"]','["Khối trụ có thể đứng thẳng","Khối cầu không có góc cạnh"]','hard','Khối cầu không có mặt đáy; khối trụ lăn một hướng.',10,28],
    [1116,3,'multiple_choice','Chọn tất cả phát biểu SAI:','["Khối trụ có 2 mặt tròn","Khối cầu lăn mọi hướng","Khối trụ không có mặt phẳng","Khối cầu có mặt phẳng"]','["Khối trụ không có mặt phẳng","Khối cầu có mặt phẳng"]','hard','Khối trụ có mặt phẳng; khối cầu không có.',10,29],
    [1116,3,'drag_drop','Kéo thả đặc điểm vào đúng hình khối:','{"items":["Lăn mọi hướng","Có 2 mặt đáy","Không mặt phẳng","Lăn 1 hướng"],"zones":["Khối cầu","Khối trụ"]}','{"Khối cầu":["Lăn mọi hướng","Không mặt phẳng"],"Khối trụ":["Có 2 mặt đáy","Lăn 1 hướng"]}','hard','Đặc điểm của từng hình khối.',10,30],

    // =========================================================
    // Lesson 1117: Đơn vị, chục, trăm, nghìn
    // =========================================================
    // Ex1 easy
    [1117,1,'single_choice','10 đơn vị bằng mấy chục?','["1 chục","2 chục","5 chục","10 chục"]','["1 chục"]','easy','10 đơn vị = 1 chục.',10,1],
    [1117,1,'single_choice','1 trăm bằng mấy chục?','["1 chục","5 chục","10 chục","100 chục"]','["10 chục"]','easy','1 trăm = 10 chục.',10,2],
    [1117,1,'single_choice','1 nghìn bằng mấy trăm?','["1 trăm","5 trăm","10 trăm","100 trăm"]','["10 trăm"]','easy','1 nghìn = 10 trăm.',10,3],
    [1117,1,'true_false','10 chục bằng 1 trăm.','["Đúng","Sai"]','["Đúng"]','easy','10 chục = 100 = 1 trăm.',10,4],
    [1117,1,'true_false','1 nghìn bằng 100 chục.','["Đúng","Sai"]','["Đúng"]','easy','1 nghìn = 1000, 100 chục = 100×10 = 1000.',10,5],
    [1117,1,'fill_blank','20 đơn vị = ___ chục.',null,'["2"]','easy','20 : 10 = 2 chục.',10,6],
    [1117,1,'fill_blank','3 trăm = ___ chục.',null,'["30"]','easy','3 trăm = 300 = 30 chục.',10,7],
    [1117,1,'counting','Đếm số chục trong 50: 10, 20, 30, 40, 50.','["3","4","5","6"]','["5"]','easy','50 = 5 chục.',10,8],
    [1117,1,'sorting','Sắp xếp từ nhỏ đến lớn: 1 nghìn, 1 chục, 1 đơn vị, 1 trăm.','["1 nghìn","1 trăm","1 chục","1 đơn vị"]','["1 đơn vị","1 chục","1 trăm","1 nghìn"]','easy','1 < 10 < 100 < 1000.',10,9],
    [1117,1,'cross_out','Gạch bỏ số KHÔNG phải bội của 10: 10, 25, 30, 50, 43, 70.','["10","25","30","50","43","70"]','["25","43"]','easy','25 và 43 không chia hết cho 10.',10,10],

    // Ex2 medium
    [1117,2,'single_choice','Số 1000 có bao nhiêu chục?','["10","100","1000","10000"]','["100"]','medium','1000 : 10 = 100 chục.',10,11],
    [1117,2,'single_choice','4 chục bằng bao nhiêu đơn vị?','["4","14","40","400"]','["40"]','medium','4 chục = 4 × 10 = 40.',10,12],
    [1117,2,'multiple_choice','Chọn tất cả các cách đúng để diễn đạt 100:','["1 trăm","10 chục","100 đơn vị","1000 phần mười"]','["1 trăm","10 chục","100 đơn vị"]','medium','"1000 phần mười" không phù hợp cấp độ lớp 2.',10,13],
    [1117,2,'multiple_choice','Chọn số có 3 chục:','["300","30","3","130"]','["30","130"]','medium','30 = 3 chục; 130 = 1 trăm 3 chục.',10,14],
    [1117,2,'matching','Nối: Số — Cách đọc:','{"items":["10","100","1000","10"],"targets":["Một chục","Một trăm","Một nghìn"]}','{"10":"Một chục","100":"Một trăm","1000":"Một nghìn"}','medium','Cách đọc các đơn vị.',10,15],
    [1117,2,'matching','Nối: Chuyển đổi đơn vị:','{"items":["2 chục","3 trăm","5 nghìn","4 chục"],"targets":["20","300","5000","40"]}','{"2 chục":"20","3 trăm":"300","5 nghìn":"5000","4 chục":"40"}','medium','Chuyển đổi sang số.',10,16],
    [1117,2,'drag_drop','Kéo thả số vào đúng vị trí trên bảng chục-trăm-nghìn:','{"numbers":["10","100","1000","50","200"],"positions":["chục","trăm","nghìn"]}','{"chục":["10","50"],"trăm":["100","200"],"nghìn":["1000"]}','medium','Phân loại theo hàng.',10,17],
    [1117,2,'table_fill','Điền bảng: Số — Đơn vị — Chục — Trăm. 100: ___đơn vị, ___chục, ___trăm.','{"headers":["Số","Đơn vị","Chục","Trăm"],"rows":[["100","?","?","?"],["1000","?","?","?"]]}','{"100":{"Đơn vị":"100","Chục":"10","Trăm":"1"},"1000":{"Đơn vị":"1000","Chục":"100","Trăm":"10"}}','medium','Chuyển đổi đơn vị.',10,18],
    [1117,2,'number_line','Điền số còn thiếu trên tia số: 100, 200, ___, 400, 500.','{"min":100,"max":500,"step":100,"missing":[3]}','["300"]','medium','100, 200, 300, 400, 500 — bước nhảy 100.',10,19],
    [1117,2,'puzzle','Câu đố: Tôi là 10 lần của 100. Tôi là số nào?','["100","1000","10","10000"]','["1000"]','medium','10 × 100 = 1000.',10,20],

    // Ex3 hard
    [1117,3,'fill_blank','7 trăm 5 chục 3 đơn vị = ___.',null,'["753"]','hard','700 + 50 + 3 = 753.',10,21],
    [1117,3,'fill_blank','1000 = ___ trăm = ___ chục = ___ đơn vị.',null,'["10","100","1000"]','hard','Chuyển đổi hoàn chỉnh.',10,22],
    [1117,3,'puzzle','Xếp hình số: Dùng các thẻ 1, 0, 0, 0 tạo số lớn nhất có thể. Số đó là?','["1","100","1000","10000"]','["1000"]','hard','Xếp 1 ở hàng nghìn: 1000.',10,23],
    [1117,3,'puzzle','Câu đố: Tôi lớn hơn 9 chục nhưng nhỏ hơn 11 chục. Tôi là bao nhiêu đơn vị?','["90","95","100","110"]','["100"]','hard','10 chục = 100; nằm giữa 90 và 110.',10,24],
    [1117,3,'game','Trò chơi "Đổi tiền": Có 300 đồng, đổi thành chục đồng được bao nhiêu tờ?','{"mệnh giá":10,"tổng":300}','["30"]','hard','300 : 10 = 30 tờ chục đồng.',10,25],
    [1117,3,'sorting','Sắp xếp từ lớn đến nhỏ: 1 nghìn, 99, 1 trăm, 10 chục, 9 chục 9 đơn vị.','["1 nghìn","99","1 trăm","10 chục","9 chục 9 đơn vị"]','["1 nghìn","1 trăm","10 chục","9 chục 9 đơn vị","99"]','hard','1000 > 100 = 100 > 99 = 99.',10,26],
    [1117,3,'matching','Nối biểu thức với kết quả:','{"items":["10 × 10","10 × 100","100 × 10","10 + 90"],"targets":["100","1000","100"]}','{"10 × 10":"100","10 × 100":"1000","100 × 10":"1000","10 + 90":"100"}','hard','Tính toán nhanh.',10,27],
    [1117,3,'multiple_choice','Chọn tất cả số bằng 1 trăm:','["100","10 chục","1000 phần 10","99 + 1"]','["100","10 chục","99 + 1"]','hard','"1000 phần 10" ngoài chương trình lớp 2.',10,28],
    [1117,3,'multiple_choice','Chọn tất cả số có chữ số hàng chục là 5:','["50","150","500","253","459"]','["50","150","253","459"]','hard','Kiểm tra hàng chục từng số.',10,29],
    [1117,3,'drag_drop','Kéo số về đúng hàng giá trị:','{"numbers":["635","435","135"],"problem":"Chữ số hàng trăm của 635 là bao nhiêu?"}','["6"]','hard','635: hàng trăm là 6.',10,30],

    // =========================================================
    // Lesson 1118: Các số tròn trăm, tròn chục
    // =========================================================
    // Ex1 easy
    [1118,1,'single_choice','Số nào là số tròn trăm?','["150","205","300","450"]','["300"]','easy','300 là số tròn trăm (chữ số hàng chục và đơn vị đều là 0).',10,1],
    [1118,1,'single_choice','Số nào là số tròn chục?','["23","40","57","99"]','["40"]','easy','40 là số tròn chục (chữ số hàng đơn vị là 0).',10,2],
    [1118,1,'single_choice','Số tròn trăm tiếp theo của 400 là số nào?','["410","450","500","401"]','["500"]','easy','400, 500 — bước nhảy 100.',10,3],
    [1118,1,'true_false','200 là số tròn trăm.','["Đúng","Sai"]','["Đúng"]','easy','200 có hàng chục và đơn vị đều là 0.',10,4],
    [1118,1,'true_false','50 là số tròn trăm.','["Đúng","Sai"]','["Sai"]','easy','50 là số tròn chục, không phải tròn trăm.',10,5],
    [1118,1,'fill_blank','Các số tròn trăm từ 100 đến 500: 100, 200, ___, 400, 500.',null,'["300"]','easy','Bước nhảy 100.',10,6],
    [1118,1,'fill_blank','Các số tròn chục từ 10 đến 50: 10, 20, ___, 40, 50.',null,'["30"]','easy','Bước nhảy 10.',10,7],
    [1118,1,'counting','Đếm số tròn trăm từ 100 đến 1000.','["5","8","9","10"]','["10"]','easy','100,200,300,400,500,600,700,800,900,1000 — 10 số.',10,8],
    [1118,1,'sorting','Sắp xếp tăng dần: 500, 200, 800, 100, 1000.','["100","200","500","800","1000"]','["100","200","500","800","1000"]','easy','Thứ tự tăng dần các số tròn trăm.',10,9],
    [1118,1,'cross_out','Gạch bỏ số KHÔNG phải số tròn chục: 10, 30, 45, 60, 78, 90.','["10","30","45","60","78","90"]','["45","78"]','easy','45 và 78 không có chữ số đơn vị là 0.',10,10],

    // Ex2 medium
    [1118,2,'single_choice','Số tròn chục lớn nhất nhỏ hơn 100 là số nào?','["80","88","90","99"]','["90"]','medium','90 là số tròn chục lớn nhất < 100.',10,11],
    [1118,2,'single_choice','Có bao nhiêu số tròn chục từ 10 đến 90?','["8","9","10","7"]','["9"]','medium','10,20,30,40,50,60,70,80,90 — 9 số.',10,12],
    [1118,2,'multiple_choice','Chọn tất cả số tròn trăm:','["100","150","300","500","750","1000"]','["100","300","500","1000"]','medium','Số tròn trăm có hàng chục và đơn vị là 0.',10,13],
    [1118,2,'multiple_choice','Chọn tất cả số tròn chục từ 40 đến 80:','["40","45","50","60","75","80"]','["40","50","60","80"]','medium','45 và 75 không phải số tròn chục.',10,14],
    [1118,2,'matching','Nối: Số — Loại:','{"items":["200","70","450","30","600"],"targets":["Tròn trăm","Tròn chục","Không phải"]}','{"200":"Tròn trăm","70":"Tròn chục","450":"Không phải","30":"Tròn chục","600":"Tròn trăm"}','medium','Phân loại số.',10,15],
    [1118,2,'matching','Nối: Số tròn trăm — Cách đọc:','{"items":["100","400","700","1000"],"targets":["Một trăm","Bốn trăm","Bảy trăm","Một nghìn"]}','{"100":"Một trăm","400":"Bốn trăm","700":"Bảy trăm","1000":"Một nghìn"}','medium','Cách đọc số tròn trăm.',10,16],
    [1118,2,'drag_drop','Kéo số vào đúng nhóm tròn chục hoặc tròn trăm:','{"numbers":["20","200","50","500","80","800"],"zones":["Tròn chục (không tròn trăm)","Tròn trăm"]}','{"Tròn chục (không tròn trăm)":["20","50","80"],"Tròn trăm":["200","500","800"]}','medium','Tròn trăm cũng là tròn chục nhưng nhóm chúng riêng.',10,17],
    [1118,2,'table_fill','Điền số còn thiếu:','{"headers":["Tròn chục trước","Số","Tròn chục sau"],"rows":[["?","35","?"],["?","72","?"],["?","158","?"]]}','{"35":{"trước":"30","sau":"40"},"72":{"trước":"70","sau":"80"},"158":{"trước":"150","sau":"160"}}','medium','Tìm số tròn chục gần nhất.',10,18],
    [1118,2,'number_line','Điền số tròn trăm còn thiếu: ___, 400, ___, 600, 700.','{"min":300,"max":700,"step":100}','["300","500"]','medium','Tia số nhảy 100.',10,19],
    [1118,2,'puzzle','Tôi là số tròn chục, lớn hơn 60 nhưng nhỏ hơn 80. Tôi là số nào?','["60","70","80","75"]','["70"]','medium','Số tròn chục giữa 60 và 80 là 70.',10,20],

    // Ex3 hard
    [1118,3,'fill_blank','Số tròn trăm lớn nhất có 3 chữ số là ___.',null,'["900"]','hard','900 là số tròn trăm lớn nhất có 3 chữ số.',10,21],
    [1118,3,'fill_blank','Giữa 300 và 600 có ___ số tròn trăm (không tính 300 và 600).',null,'["2"]','hard','400 và 500 — 2 số tròn trăm.',10,22],
    [1118,3,'puzzle','Câu đố: Tôi là số tròn trăm, bằng tổng của 200 và 300. Tôi là số nào?','["400","500","600","700"]','["500"]','hard','200 + 300 = 500.',10,23],
    [1118,3,'puzzle','Câu đố: Tôi là số tròn chục lớn nhất nhỏ hơn 1000. Tôi là số nào?','["900","990","980","1000"]','["990"]','hard','990 là số tròn chục lớn nhất < 1000.',10,24],
    [1118,3,'game','Trò chơi làm tròn: Làm tròn đến chục gần nhất: 43 → ___; 67 → ___; 85 → ___.','{"43":"40","67":"70","85":"90"}','{"43":"40","67":"70","85":"90"}','hard','Quy tắc làm tròn: đơn vị < 5 → giữ nguyên chục; ≥ 5 → tăng 1 chục.',10,25],
    [1118,3,'sorting','Sắp xếp giảm dần: 70, 300, 20, 800, 50, 600.','["800","600","300","70","50","20"]','["800","600","300","70","50","20"]','hard','Sắp xếp hỗn hợp tròn trăm và tròn chục.',10,26],
    [1118,3,'matching','Nối: Phép tính — Kết quả tròn trăm:','{"items":["200+300","100×4","500+200","1000-300"],"targets":["500","400","700","700"]}','{"200+300":"500","100×4":"400","500+200":"700","1000-300":"700"}','hard','Tính toán ra số tròn trăm.',10,27],
    [1118,3,'multiple_choice','Chọn tất cả số vừa là tròn chục vừa là tròn trăm:','["10","100","200","50","300","600"]','["100","200","300","600"]','hard','Số tròn trăm cũng là tròn chục.',10,28],
    [1118,3,'multiple_choice','Chọn tất cả số tròn chục từ 100 đến 150 (không tính 100 và 150):','["110","120","130","140","145"]','["110","120","130","140"]','hard','Số tròn chục: 110, 120, 130, 140.',10,29],
    [1118,3,'drag_drop','Kéo số về đúng vị trí trên tia số tròn trăm 0–1000:','{"numbers":["300","700","500"],"numberline":{"min":0,"max":1000,"step":100}}','{"300":3,"700":7,"500":5}','hard','Vị trí trên tia số.',10,30],

    // =========================================================
    // Lesson 1119: So sánh các số tròn trăm, tròn chục
    // =========================================================
    // Ex1 easy
    [1119,1,'single_choice','200 ___ 300','["<",">","=","≠"]','["<"]','easy','200 nhỏ hơn 300.',10,1],
    [1119,1,'single_choice','50 ___ 30','["<",">","="]','[">"]','easy','50 lớn hơn 30.',10,2],
    [1119,1,'single_choice','Số nào lớn nhất: 100, 400, 700, 200?','["100","400","700","200"]','["700"]','easy','700 > 400 > 200 > 100.',10,3],
    [1119,1,'true_false','500 > 400','["Đúng","Sai"]','["Đúng"]','easy','500 lớn hơn 400.',10,4],
    [1119,1,'true_false','60 = 60','["Đúng","Sai"]','["Đúng"]','easy','60 bằng 60.',10,5],
    [1119,1,'fill_blank','300 ___ 200 (dùng dấu <, >, =)',null,'[">"]','easy','300 > 200.',10,6],
    [1119,1,'fill_blank','70 ___ 80 (dùng dấu <, >, =)',null,'["<"]','easy','70 < 80.',10,7],
    [1119,1,'counting','Có bao nhiêu số tròn trăm lớn hơn 300 và nhỏ hơn 700?','["2","3","4","5"]','["3"]','easy','400, 500, 600 — 3 số.',10,8],
    [1119,1,'sorting','Sắp xếp tăng dần: 600, 200, 900, 400, 100.','["100","200","400","600","900"]','["100","200","400","600","900"]','easy','So sánh và sắp xếp.',10,9],
    [1119,1,'cross_out','Gạch bỏ số nhỏ hơn 500: 300, 600, 100, 800, 400.','["300","600","100","800","400"]','["300","100","400"]','easy','300, 100, 400 đều nhỏ hơn 500.',10,10],

    // Ex2 medium
    [1119,2,'single_choice','Số tròn chục nào nằm giữa 40 và 60?','["30","50","70","55"]','["50"]','medium','50 nằm giữa 40 và 60.',10,11],
    [1119,2,'single_choice','So sánh: 800 ___ 700 + 100','["<",">","="]','["="]','medium','700 + 100 = 800.',10,12],
    [1119,2,'multiple_choice','Chọn tất cả số tròn trăm nhỏ hơn 600:','["100","300","500","600","700"]','["100","300","500"]','medium','100, 300, 500 đều < 600.',10,13],
    [1119,2,'multiple_choice','Chọn tất cả dấu đúng cho: 400 ___ 400:','["<",">","=","≤","≥"]','["=","≤","≥"]','medium','400 = 400 nên cả =, ≤, ≥ đều đúng.',10,14],
    [1119,2,'matching','Nối cặp số bằng nhau:','{"items":["200","400","600","800"],"targets":["100+100","200+200","300+300","400+400"]}','{"200":"100+100","400":"200+200","600":"300+300","800":"400+400"}','medium','Phép cộng ra số tròn trăm.',10,15],
    [1119,2,'matching','Nối số với dấu so sánh phù hợp (so với 500):','{"items":["300","500","700","400"],"targets":["<","=",">"]}','{"300":"<","500":"=","700":">","400":"<"}','medium','So sánh với 500.',10,16],
    [1119,2,'drag_drop','Kéo dấu (<, >, =) vào ô trống:','{"pairs":[["300","500"],["700","700"],["200","100"],["80","90"]]}','{"300_500":"<","700_700":"=","200_100":">","80_90":"<"}','medium','So sánh từng cặp.',10,17],
    [1119,2,'table_fill','Điền dấu so sánh:','{"headers":["Số 1","Dấu","Số 2"],"rows":[["400","?","300"],["600","?","600"],["100","?","200"],["80","?","70"]]}','{"row1":">","row2":"=","row3":"<","row4":">"}','medium','So sánh từng cặp.',10,18],
    [1119,2,'number_line','Trên tia số, số nào lớn hơn: số ở bên trái hay bên phải?','{"question":"Trên tia số 0-1000, 300 nằm ở đâu so với 700?","options":["300 ở trái 700","300 ở phải 700","300 = 700"]}','["300 ở trái 700"]','medium','Số ở bên phải lớn hơn.',10,19],
    [1119,2,'puzzle','Tìm số: Tôi lớn hơn 500 và nhỏ hơn 700. Tôi là số tròn trăm. Tôi là số nào?','["500","600","700","650"]','["600"]','medium','600 là số tròn trăm duy nhất giữa 500 và 700.',10,20],

    // Ex3 hard
    [1119,3,'fill_blank','Số tròn chục lớn nhất nhỏ hơn 150 là ___.',null,'["140"]','hard','140 < 150 và là số tròn chục lớn nhất trong điều kiện đó.',10,21],
    [1119,3,'fill_blank','Số tròn trăm nhỏ nhất lớn hơn 750 là ___.',null,'["800"]','hard','800 > 750 và là số tròn trăm nhỏ nhất thỏa mãn.',10,22],
    [1119,3,'puzzle','Xếp 4 số tròn trăm: 400, 700, 200, 900 theo thứ tự giảm dần.','["900,700,400,200","200,400,700,900","400,700,200,900","900,400,700,200"]','["900,700,400,200"]','hard','Sắp xếp giảm dần.',10,23],
    [1119,3,'puzzle','Câu đố: Tôi là số tròn chục, bằng tổng của 3 số tròn chục: 20 + 30 + 40. Tôi là số nào?','["70","80","90","100"]','["90"]','hard','20 + 30 + 40 = 90.',10,24],
    [1119,3,'game','Trò chơi "Ai nhiều hơn": Nam có 400 tem, Lan có 300 tem, Hùng có 600 tem. Ai có nhiều tem nhất?','{"Nam":400,"Lan":300,"Hùng":600}','["Hùng"]','hard','600 > 400 > 300.',10,25],
    [1119,3,'sorting','Sắp xếp hỗn hợp tăng dần: 800, 30, 500, 70, 200, 10.','["10","30","70","200","500","800"]','["10","30","70","200","500","800"]','hard','So sánh số tròn chục và tròn trăm.',10,26],
    [1119,3,'matching','Nối phép tính với kết quả so sánh:','{"items":["300+200 ___ 400","100+100 ___ 200","500+100 ___ 700","400-100 ___ 200"],"targets":[">","=","<",">"]}','{"300+200 ___ 400":">","100+100 ___ 200":"=","500+100 ___ 700":"<","400-100 ___ 200":">"}','hard','Tính rồi so sánh.',10,27],
    [1119,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG:','["500 > 400","300 = 200+100","700 < 800","600 > 700"]','["500 > 400","300 = 200+100","700 < 800"]','hard','600 > 700 là sai.',10,28],
    [1119,3,'multiple_choice','Chọn tất cả số tròn chục lớn hơn 60 và nhỏ hơn 100:','["70","80","90","60","100"]','["70","80","90"]','hard','70, 80, 90 thỏa mãn điều kiện.',10,29],
    [1119,3,'drag_drop','Sắp xếp thẻ số tròn trăm vào đúng thứ tự trên tia số:','{"numbers":["600","100","900","300"],"order":"tăng dần"}','["100","300","600","900"]','hard','Sắp xếp tăng dần.',10,30],

    // =========================================================
    // Lesson 1120: Số có ba chữ số
    // =========================================================
    // Ex1 easy
    [1120,1,'single_choice','Số nào có 3 chữ số?','["45","100","9","99"]','["100"]','easy','100 là số nhỏ nhất có 3 chữ số.',10,1],
    [1120,1,'single_choice','Số 235 có chữ số hàng trăm là số nào?','["2","3","5","23"]','["2"]','easy','235: hàng trăm = 2.',10,2],
    [1120,1,'single_choice','Đọc số 342: Số này là?','["Ba mươi bốn","Ba trăm bốn mươi hai","Ba nghìn bốn trăm hai","Bốn trăm ba mươi hai"]','["Ba trăm bốn mươi hai"]','easy','342 đọc là ba trăm bốn mươi hai.',10,3],
    [1120,1,'true_false','Số 100 là số có 3 chữ số.','["Đúng","Sai"]','["Đúng"]','easy','100 gồm 3 chữ số: 1, 0, 0.',10,4],
    [1120,1,'true_false','Số 99 là số có 3 chữ số.','["Đúng","Sai"]','["Sai"]','easy','99 chỉ có 2 chữ số.',10,5],
    [1120,1,'fill_blank','Số 456: hàng trăm = ___, hàng chục = ___, hàng đơn vị = ___.',null,'["4","5","6"]','easy','456 = 4 trăm 5 chục 6 đơn vị.',10,6],
    [1120,1,'fill_blank','Số nhỏ nhất có 3 chữ số là ___.',null,'["100"]','easy','100 là số có 3 chữ số nhỏ nhất.',10,7],
    [1120,1,'counting','Đếm số chữ số của 523: 5, 2, 3 — có bao nhiêu chữ số?','["2","3","4","5"]','["3"]','easy','523 có 3 chữ số.',10,8],
    [1120,1,'sorting','Sắp xếp tăng dần: 321, 123, 213, 312, 132.','["123","132","213","312","321"]','["123","132","213","312","321"]','easy','So sánh hàng trăm trước.',10,9],
    [1120,1,'cross_out','Gạch bỏ số KHÔNG phải số có 3 chữ số: 100, 99, 500, 45, 789.','["100","99","500","45","789"]','["99","45"]','easy','99 và 45 chỉ có 2 chữ số.',10,10],

    // Ex2 medium
    [1120,2,'single_choice','Số 607 có chữ số hàng chục là số nào?','["6","0","7","60"]','["0"]','medium','607: hàng chục = 0.',10,11],
    [1120,2,'single_choice','Số nào lớn hơn 500 và nhỏ hơn 600?','["499","512","600","601"]','["512"]','medium','512 nằm trong khoảng 500–600.',10,12],
    [1120,2,'multiple_choice','Chọn tất cả số có chữ số hàng trăm là 3:','["300","345","431","399","530"]','["300","345","399"]','medium','300, 345, 399 có hàng trăm = 3.',10,13],
    [1120,2,'multiple_choice','Chọn tất cả số có 3 chữ số khác nhau:','["111","123","100","234","321"]','["123","234","321"]','medium','123, 234, 321 có 3 chữ số phân biệt.',10,14],
    [1120,2,'matching','Nối số với cách đọc:','{"items":["245","509","780","103"],"targets":["Hai trăm bốn mươi lăm","Năm trăm linh chín","Bảy trăm tám mươi","Một trăm linh ba"]}','{"245":"Hai trăm bốn mươi lăm","509":"Năm trăm linh chín","780":"Bảy trăm tám mươi","103":"Một trăm linh ba"}','medium','Cách đọc số có 3 chữ số.',10,15],
    [1120,2,'matching','Nối số với giá trị hàng chục:','{"items":["234","567","891","312"],"targets":["3","6","9","1"]}','{"234":"3","567":"6","891":"9","312":"1"}','medium','Hàng chục là chữ số thứ hai từ phải.',10,16],
    [1120,2,'drag_drop','Kéo chữ số vào đúng hàng: Số 473 — kéo 4 vào hàng ___, 7 vào hàng ___, 3 vào hàng ___.','{"digits":["4","7","3"],"positions":["Hàng trăm","Hàng chục","Hàng đơn vị"]}','{"4":"Hàng trăm","7":"Hàng chục","3":"Hàng đơn vị"}','medium','Phân tích hàng số.',10,17],
    [1120,2,'table_fill','Điền bảng phân tích:','{"headers":["Số","Hàng trăm","Hàng chục","Hàng đơn vị"],"rows":[["356","?","?","?"],["809","?","?","?"],["470","?","?","?"]]}','{"356":{"trăm":"3","chục":"5","đơn vị":"6"},"809":{"trăm":"8","chục":"0","đơn vị":"9"},"470":{"trăm":"4","chục":"7","đơn vị":"0"}}','medium','Phân tích từng số.',10,18],
    [1120,2,'number_line','Điền số còn thiếu: 300, ___, 500, ___, 700.','{"min":300,"max":700,"step":100}','["400","600"]','medium','Tia số nhảy 100.',10,19],
    [1120,2,'puzzle','Câu đố: Tôi có 3 chữ số. Chữ số hàng trăm là 5, hàng chục là 0, hàng đơn vị là 8. Tôi là số nào?','["508","580","850","805"]','["508"]','medium','500 + 0 + 8 = 508.',10,20],

    // Ex3 hard
    [1120,3,'fill_blank','Số lớn nhất có 3 chữ số là ___.',null,'["999"]','hard','999 là số lớn nhất có 3 chữ số.',10,21],
    [1120,3,'fill_blank','Dùng 3 thẻ số 2, 5, 8 tạo số lớn nhất có 3 chữ số: ___.',null,'["852"]','hard','Xếp chữ số lớn nhất vào hàng trăm: 852.',10,22],
    [1120,3,'puzzle','Dùng 3 thẻ số 1, 3, 7 tạo số nhỏ nhất có 3 chữ số. Số đó là?','["137","173","317","371"]','["137"]','hard','Xếp chữ số nhỏ nhất vào hàng trăm: 137.',10,23],
    [1120,3,'puzzle','Câu đố: Tôi có 3 chữ số. Tổng các chữ số của tôi là 9. Hàng trăm là 4, hàng chục là 3. Tôi là số nào?','["432","431","439","430"]','["432"]','hard','4+3+x=9 → x=2; số là 432.',10,24],
    [1120,3,'game','Trò chơi tạo số: Dùng thẻ 0, 4, 6 tạo tất cả số có 3 chữ số khác nhau (chữ số hàng trăm ≠ 0).','{"thẻ":["0","4","6"]}','["406","460","604","640"]','hard','4 số: 406, 460, 604, 640.',10,25],
    [1120,3,'sorting','Sắp xếp giảm dần: 379, 793, 397, 739, 973, 937.','["973","937","793","739","397","379"]','["973","937","793","739","397","379"]','hard','So sánh hàng trăm trước.',10,26],
    [1120,3,'matching','Nối số với mô tả:','{"items":["100","999","500","123"],"targets":["Số 3 chữ số nhỏ nhất","Số 3 chữ số lớn nhất","Số chính giữa khoảng 100-999","Số có 3 chữ số liên tiếp"]}','{"100":"Số 3 chữ số nhỏ nhất","999":"Số 3 chữ số lớn nhất","500":"Số chính giữa khoảng 100-999","123":"Số có 3 chữ số liên tiếp"}','hard','Đặc điểm số.',10,27],
    [1120,3,'multiple_choice','Chọn tất cả số có chữ số hàng đơn vị lớn hơn chữ số hàng chục:','["123","245","317","456","801"]','["123","245","317","456"]','hard','123:3>2✓, 245:5>4✓, 317:7>1✓, 456:6>5✓, 801:1>0✗.',10,28],
    [1120,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG về số 408:','["Hàng trăm là 4","Hàng chục là 0","Hàng đơn vị là 8","Số này nhỏ hơn 400"]','["Hàng trăm là 4","Hàng chục là 0","Hàng đơn vị là 8"]','hard','408 > 400, không nhỏ hơn 400.',10,29],
    [1120,3,'drag_drop','Kéo thẻ số vào bảng để tạo số 756:','{"digits":["5","7","6","3"],"positions":["Hàng trăm","Hàng chục","Hàng đơn vị"]}','{"Hàng trăm":"7","Hàng chục":"5","Hàng đơn vị":"6"}','hard','756: trăm=7, chục=5, đơn vị=6.',10,30],

    // =========================================================
    // Lesson 1121: Viết số thành tổng trăm, chục, đơn vị
    // =========================================================
    // Ex1 easy
    [1121,1,'single_choice','345 = 300 + ___ + 5','["4","40","400","45"]','["40"]','easy','345 = 300 + 40 + 5.',10,1],
    [1121,1,'single_choice','200 + 30 + 7 = ?','["237","273","327","372"]','["237"]','easy','200+30+7 = 237.',10,2],
    [1121,1,'single_choice','Dạng khai triển của 508 là?','["500+8","500+0+8","500+80","50+8"]','["500+8"]','easy','508 = 500 + 0 + 8 = 500 + 8 (bỏ qua hạng tử 0).',10,3],
    [1121,1,'true_false','456 = 400 + 50 + 6','["Đúng","Sai"]','["Đúng"]','easy','400+50+6 = 456.',10,4],
    [1121,1,'true_false','300 + 20 + 1 = 231','["Đúng","Sai"]','["Sai"]','easy','300+20+1 = 321, không phải 231.',10,5],
    [1121,1,'fill_blank','789 = 700 + ___ + 9.',null,'["80"]','easy','789 = 700+80+9.',10,6],
    [1121,1,'fill_blank','600 + 50 + 4 = ___.',null,'["654"]','easy','600+50+4 = 654.',10,7],
    [1121,1,'counting','123 = 100 + 20 + 3. Có bao nhiêu hạng tử trong dạng khai triển?','["2","3","4","5"]','["3"]','easy','Ba hạng tử: 100, 20, 3.',10,8],
    [1121,1,'sorting','Viết 234, 432, 324 dưới dạng khai triển và sắp xếp theo thứ tự tăng dần.','["200+30+4","300+20+4","400+30+2"]','["200+30+4","300+20+4","400+30+2"]','easy','234 < 324 < 432.',10,9],
    [1121,1,'cross_out','Gạch bỏ dạng khai triển SAI của 415: 400+10+5, 415, 400+15, 300+100+15.','["400+10+5","415","400+15","300+100+15"]','["415","300+100+15"]','easy','415 không phải dạng khai triển; 300+100+15=415 đúng về giá trị nhưng không đúng chuẩn.',10,10],

    // Ex2 medium
    [1121,2,'single_choice','Dạng khai triển chuẩn của 903 là?','["900+3","900+0+3","90+3","9+0+3"]','["900+3"]','medium','903 = 900+0+3 = 900+3 (bỏ hạng tử 0).',10,11],
    [1121,2,'single_choice','400 + 60 = ?','["406","460","640","446"]','["460"]','medium','400+60 = 460.',10,12],
    [1121,2,'multiple_choice','Chọn tất cả dạng khai triển đúng của 250:','["200+50","200+50+0","250","200+5"]','["200+50","200+50+0"]','medium','Cả hai cách viết đều biểu diễn 250.',10,13],
    [1121,2,'multiple_choice','Chọn tất cả phép tính bằng 732:','["700+30+2","700+3+2","73+2","700+32"]','["700+30+2","700+32"]','medium','700+30+2=732; 700+32=732.',10,14],
    [1121,2,'matching','Nối số với dạng khai triển:','{"items":["321","567","405","180"],"targets":["300+20+1","500+60+7","400+5","100+80"]}','{"321":"300+20+1","567":"500+60+7","405":"400+5","180":"100+80"}','medium','Khai triển số 3 chữ số.',10,15],
    [1121,2,'matching','Nối dạng khai triển với số:','{"items":["800+40+9","300+7","600+20","500+50+5"],"targets":["849","307","620","555"]}','{"800+40+9":"849","300+7":"307","600+20":"620","500+50+5":"555"}','medium','Tính tổng.',10,16],
    [1121,2,'drag_drop','Kéo số vào đúng chỗ: 364 = ___ + ___ + ___.','{"options":["300","60","4","30","6","400"]}','["300","60","4"]','medium','364 = 300+60+4.',10,17],
    [1121,2,'table_fill','Điền bảng:','{"headers":["Số","Trăm","Chục","Đơn vị","Dạng khai triển"],"rows":[["246","?","?","?","?"],["805","?","?","?","?"]]}','{"246":{"trăm":"200","chục":"40","đơn vị":"6","khai triển":"200+40+6"},"805":{"trăm":"800","chục":"0","đơn vị":"5","khai triển":"800+5"}}','medium','Phân tích và khai triển.',10,18],
    [1121,2,'number_line','300 + 40 + 5 nằm ở đâu trên tia số 300–400?','{"min":300,"max":400,"answer":345}','["345"]','medium','300+40+5 = 345.',10,19],
    [1121,2,'puzzle','Câu đố: 500 + ___ + 7 = 537','["3","30","37","300"]','["30"]','medium','500+30+7 = 537.',10,20],

    // Ex3 hard
    [1121,3,'fill_blank','___ + 80 + 6 = 786.',null,'["700"]','hard','786-80-6 = 700.',10,21],
    [1121,3,'fill_blank','400 + ___ + 9 = 459.',null,'["50"]','hard','459-400-9 = 50.',10,22],
    [1121,3,'puzzle','Tìm số: 200 + 30 + x = 235. x = ?','["3","5","15","50"]','["5"]','hard','235-200-30 = 5.',10,23],
    [1121,3,'puzzle','Câu đố: Số nào có dạng khai triển 600 + 0 + 3?','["630","603","360","306"]','["603"]','hard','600+0+3 = 603.',10,24],
    [1121,3,'game','Trò chơi tạo số: Cho hàng trăm = 5, hàng chục = 0, hàng đơn vị = 0. Viết số đó và dạng khai triển.','{"số":"500","khai triển":"500+0+0 = 500"}','{"số":"500","khai triển":"500"}','hard','500 = 500 (hàng chục và đơn vị = 0).',10,25],
    [1121,3,'sorting','Sắp xếp các dạng khai triển từ nhỏ đến lớn: 300+50+9, 200+80+5, 400+10+3, 300+50+2.','["200+80+5","300+50+2","300+50+9","400+10+3"]','["200+80+5","300+50+2","300+50+9","400+10+3"]','hard','285 < 352 < 359 < 413.',10,26],
    [1121,3,'matching','Nối: Thiếu số trong khai triển:','{"items":["500+?+7=527","?+60+3=463","800+40+?=849"],"targets":["20","400","9"]}','{"500+?+7=527":"20","?+60+3=463":"400","800+40+?=849":"9"}','hard','Tìm số còn thiếu.',10,27],
    [1121,3,'multiple_choice','Chọn tất cả dạng khai triển của 930:','["900+30","900+30+0","93×10","900+3"]','["900+30","900+30+0"]','hard','900+30=930; 93×10=930 (ngoài chương trình); 900+3=903≠930.',10,28],
    [1121,3,'multiple_choice','Chọn tất cả số có chữ số hàng chục là 5 (tức hàng chục = 50):','["150","250","350","451","562"]','["150","250","350","451"]','hard','150,250,350,451 đều có chữ số hàng chục là 5; 562 có hàng chục là 6.',10,29],
    [1121,3,'drag_drop','Kéo hạng tử vào đúng vị trí: ___ + ___ + ___ = 628.','{"options":["600","20","8","60","200","800"]}','["600","20","8"]','hard','628 = 600+20+8.',10,30],

    // =========================================================
    // Lesson 1122: So sánh các số có ba chữ số
    // =========================================================
    // Ex1 easy
    [1122,1,'single_choice','234 ___ 243','["<",">","="]','["<"]','easy','234 < 243 (hàng trăm bằng nhau, hàng chục 3<4).',10,1],
    [1122,1,'single_choice','Số nào lớn hơn: 567 hay 576?','["567","576","Bằng nhau"]','["576"]','easy','Hàng trăm và chục bằng nhau, hàng đơn vị 7>6.',10,2],
    [1122,1,'single_choice','Số lớn nhất trong: 300, 289, 310, 299 là?','["300","289","310","299"]','["310"]','easy','310 > 300 > 299 > 289.',10,3],
    [1122,1,'true_false','456 > 465','["Đúng","Sai"]','["Sai"]','easy','456 < 465 (hàng chục 5<6).',10,4],
    [1122,1,'true_false','321 = 321','["Đúng","Sai"]','["Đúng"]','easy','Hai số bằng nhau.',10,5],
    [1122,1,'fill_blank','567 ___ 576 (dùng <, >, =)',null,'["<"]','easy','Hàng chục 6<7.',10,6],
    [1122,1,'fill_blank','800 ___ 799 (dùng <, >, =)',null,'[">"]','easy','Hàng trăm 8>7.',10,7],
    [1122,1,'counting','Trong dãy: 100, 250, 350, 150, 200 — có bao nhiêu số lớn hơn 200?','["1","2","3","4"]','["2"]','easy','250 và 350 lớn hơn 200.',10,8],
    [1122,1,'sorting','Sắp xếp tăng dần: 423, 342, 243, 432, 234.','["234","243","342","423","432"]','["234","243","342","423","432"]','easy','So sánh từ hàng trăm.',10,9],
    [1122,1,'cross_out','Gạch bỏ số nhỏ hơn 300: 150, 350, 299, 400, 201.','["150","350","299","400","201"]','["150","299","201"]','easy','150, 299, 201 đều < 300.',10,10],

    // Ex2 medium
    [1122,2,'single_choice','Số nào nằm giữa 456 và 465?','["455","460","466","454"]','["460"]','medium','455<456<460<465<466.',10,11],
    [1122,2,'single_choice','Cách so sánh đúng: So sánh 2 số có 3 chữ số, ta so sánh từ:','["Hàng đơn vị trước","Hàng chục trước","Hàng trăm trước","Hàng nào cũng được"]','["Hàng trăm trước"]','medium','So sánh từ hàng cao nhất (hàng trăm).',10,12],
    [1122,2,'multiple_choice','Chọn tất cả số lớn hơn 500 và nhỏ hơn 600:','["499","501","550","599","600"]','["501","550","599"]','medium','Số nằm trong khoảng (500;600).',10,13],
    [1122,2,'multiple_choice','Chọn tất cả dấu đúng cho 678 ___ 687:','["<","≤","=",">"]','["<","≤"]','medium','678 < 687 nên < và ≤ đều đúng.',10,14],
    [1122,2,'matching','Nối cặp số với dấu so sánh:','{"items":["345 ___ 354","600 ___ 600","789 ___ 798","400 ___ 399"],"targets":["<","=","<",">"]}','{"345 ___ 354":"<","600 ___ 600":"=","789 ___ 798":"<","400 ___ 399":">"}','medium','So sánh từng cặp.',10,15],
    [1122,2,'matching','Nối số với vị trí (lớn nhất/nhỏ nhất) trong nhóm:','{"groups":{"nhóm1":["234","342","243"],"nhóm2":["789","879","897"]},"labels":["lớn nhất","nhỏ nhất"]}','{"nhóm1":{"lớn nhất":"342","nhỏ nhất":"234"},"nhóm2":{"lớn nhất":"897","nhỏ nhất":"789"}}','medium','Tìm lớn nhất và nhỏ nhất.',10,16],
    [1122,2,'drag_drop','Kéo dấu (<, >, =) vào ô trống:','{"pairs":[["456","465"],["700","700"],["321","312"],["199","200"]]}','{"456_465":"<","700_700":"=","321_312":">","199_200":"<"}','medium','So sánh từng cặp.',10,17],
    [1122,2,'table_fill','Sắp xếp và điền bảng:','{"headers":["Số nhỏ nhất","Số lớn nhất"],"groups":[["456","654","546"],["123","321","213"]]}','{"nhóm1":{"nhỏ nhất":"456","lớn nhất":"654"},"nhóm2":{"nhỏ nhất":"123","lớn nhất":"321"}}','medium','Tìm giá trị nhỏ nhất và lớn nhất.',10,18],
    [1122,2,'number_line','Trên tia số, 345 và 354 — số nào ở bên phải (lớn hơn)?','{"options":["345","354","Bằng nhau"]}','["354"]','medium','354 > 345 nên nằm bên phải.',10,19],
    [1122,2,'puzzle','Câu đố: Tôi lớn hơn 450 nhưng nhỏ hơn 460. Tôi có chữ số đơn vị là 5. Tôi là số nào?','["455","450","456","451"]','["455"]','medium','455 nằm giữa 450 và 460, đơn vị là 5.',10,20],

    // Ex3 hard
    [1122,3,'fill_blank','Số lớn nhất có 3 chữ số dùng thẻ 1, 2, 3 là ___.',null,'["321"]','hard','Xếp 3 vào hàng trăm, 2 vào chục, 1 vào đơn vị.',10,21],
    [1122,3,'fill_blank','Điền chữ số thích hợp: 4_6 > 456. Chữ số hàng chục có thể là ___.',null,'["6","7","8","9"]','hard','4x6 > 456 khi x > 5, tức x ∈ {6,7,8,9}.',10,22],
    [1122,3,'puzzle','Câu đố: Dùng thẻ 5, 7, 9 tạo số lớn nhất. Số đó là?','["579","597","759","975"]','["975"]','hard','Xếp 9 vào trăm, 7 vào chục, 5 vào đơn vị.',10,23],
    [1122,3,'puzzle','Câu đố: Số nào lớn nhất trong: 555, 5+50+500, 500+50+6, 550+4?','["555","5+50+500","500+50+6","550+4"]','["500+50+6"]','hard','555=555, 5+50+500=555, 500+50+6=556, 550+4=554. Lớn nhất là 556.',10,24],
    [1122,3,'game','Trò chơi xếp hạng: Nam 437 điểm, Lan 374 điểm, Hùng 473 điểm. Xếp thứ từ cao đến thấp.','{"Nam":437,"Lan":374,"Hùng":473}','["Hùng (473)","Nam (437)","Lan (374)"]','hard','473 > 437 > 374.',10,25],
    [1122,3,'sorting','Sắp xếp giảm dần: 512, 521, 152, 251, 215, 125.','["521","512","251","215","152","125"]','["521","512","251","215","152","125"]','hard','So sánh từ hàng trăm.',10,26],
    [1122,3,'matching','Nối phép tính với số và dấu so sánh phù hợp:','{"items":["300+50+2 ___ 352","400+60+7 ___ 476","500+0+8 ___ 509"],"targets":["=","<","<"]}','{"300+50+2 ___ 352":"=","400+60+7 ___ 476":"<","500+0+8 ___ 509":"<"}','hard','Tính rồi so sánh: 352=352, 467<476, 508<509.',10,27],
    [1122,3,'multiple_choice','Chọn tất cả số có hàng trăm lớn hơn hàng đơn vị:','["321","159","814","372","605"]','["321","814","372","605"]','hard','321:3>1✓, 159:1<9✗, 814:8>4✓, 372:3>2✓, 605:6>5✓.',10,28],
    [1122,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG khi so sánh 3 số 456, 654, 546:','["456 < 546","654 là lớn nhất","546 > 654","456 là nhỏ nhất"]','["456 < 546","654 là lớn nhất","456 là nhỏ nhất"]','hard','546 > 654 là sai (546 < 654).',10,29],
    [1122,3,'drag_drop','Sắp xếp thẻ số vào thứ tự giảm dần: 639, 369, 963, 693, 396.','{"numbers":["639","369","963","693","396"],"order":"giảm dần"}','["963","693","639","396","369"]','hard','963>693>639>396>369.',10,30],

    // =========================================================
    // Lesson 1123: Luyện tập chung số trong phạm vi 1000
    // =========================================================
    // Ex1 easy
    [1123,1,'single_choice','Số 1000 có mấy chữ số?','["3","4","5","2"]','["4"]','easy','1000 gồm 4 chữ số: 1, 0, 0, 0.',10,1],
    [1123,1,'single_choice','Số nào lớn nhất trong phạm vi 1000?','["999","1000","998","1001"]','["1000"]','easy','1000 là số lớn nhất trong phạm vi 0–1000.',10,2],
    [1123,1,'single_choice','500 + 200 = ?','["300","700","600","900"]','["700"]','easy','500 + 200 = 700.',10,3],
    [1123,1,'true_false','999 < 1000','["Đúng","Sai"]','["Đúng"]','easy','999 nhỏ hơn 1000.',10,4],
    [1123,1,'true_false','Số 560 là số tròn chục.','["Đúng","Sai"]','["Đúng"]','easy','560 có chữ số đơn vị là 0.',10,5],
    [1123,1,'fill_blank','800 + 90 + 5 = ___.',null,'["895"]','easy','800+90+5 = 895.',10,6],
    [1123,1,'fill_blank','Số liền sau 999 là ___.',null,'["1000"]','easy','999 + 1 = 1000.',10,7],
    [1123,1,'counting','Đếm số tròn trăm từ 100 đến 1000 (bao gồm cả hai đầu).','["8","9","10","11"]','["10"]','easy','100,200,...,1000 — 10 số.',10,8],
    [1123,1,'sorting','Sắp xếp tăng dần: 1000, 100, 500, 250, 750.','["100","250","500","750","1000"]','["100","250","500","750","1000"]','easy','Thứ tự tăng dần.',10,9],
    [1123,1,'cross_out','Gạch bỏ số KHÔNG thuộc phạm vi 0–1000: 500, 1001, 0, 999, 1100.','["500","1001","0","999","1100"]','["1001","1100"]','easy','1001 và 1100 vượt quá 1000.',10,10],

    // Ex2 medium
    [1123,2,'single_choice','Số nào có hàng trăm là 7, hàng chục là 3, hàng đơn vị là 9?','["739","793","937","379"]','["739"]','medium','7 trăm 3 chục 9 đơn vị = 739.',10,11],
    [1123,2,'single_choice','345 làm tròn đến trăm gần nhất là?','["300","400","350","345"]','["300"]','medium','345 gần 300 hơn 400 (hàng chục là 4 < 5).',10,12],
    [1123,2,'multiple_choice','Chọn tất cả số trong phạm vi 400–600:','["399","400","500","600","601"]','["400","500","600"]','medium','400, 500, 600 thuộc [400;600].',10,13],
    [1123,2,'multiple_choice','Chọn tất cả số có chữ số hàng trăm lớn hơn 5:','["600","550","789","512","900"]','["600","789","900"]','medium','600:6>5✓, 789:7>5✓, 900:9>5✓.',10,14],
    [1123,2,'matching','Nối số với dạng khai triển:','{"items":["456","307","890","125"],"targets":["400+50+6","300+7","800+90","100+20+5"]}','{"456":"400+50+6","307":"300+7","890":"800+90","125":"100+20+5"}','medium','Khai triển số.',10,15],
    [1123,2,'matching','Nối: Phép so sánh — Kết quả:','{"items":["234 ___ 243","567 ___ 567","800 ___ 799","100 ___ 200"],"targets":["<","=",">","<"]}','{"234 ___ 243":"<","567 ___ 567":"=","800 ___ 799":">","100 ___ 200":"<"}','medium','So sánh số.',10,16],
    [1123,2,'drag_drop','Kéo số vào đúng vị trí trên tia số 0–1000:','{"numbers":["200","500","800","100","700"],"numberline":{"min":0,"max":1000,"step":100}}','{"200":2,"500":5,"800":8,"100":1,"700":7}','medium','Vị trí trên tia số.',10,17],
    [1123,2,'table_fill','Điền bảng tổng hợp:','{"headers":["Số","Hàng trăm","Hàng chục","Hàng đơn vị","Dạng khai triển"],"rows":[["572","?","?","?","?"],["904","?","?","?","?"],["310","?","?","?","?"]]}','{"572":{"trăm":"5","chục":"7","đơn vị":"2","khai triển":"500+70+2"},"904":{"trăm":"9","chục":"0","đơn vị":"4","khai triển":"900+4"},"310":{"trăm":"3","chục":"1","đơn vị":"0","khai triển":"300+10"}}','medium','Phân tích toàn diện.',10,18],
    [1123,2,'number_line','Điền số còn thiếu: 0, 250, ___, 750, 1000.','{"min":0,"max":1000,"step":250}','["500"]','medium','Tia số nhảy 250.',10,19],
    [1123,2,'puzzle','Câu đố: Tôi là số có 3 chữ số. Dạng khai triển của tôi là 700+0+5. Tôi là số nào?','["705","750","507","570"]','["705"]','medium','700+0+5 = 705.',10,20],

    // Ex3 hard
    [1123,3,'fill_blank','Dùng thẻ 0, 5, 8 tạo số lớn nhất có 3 chữ số: ___.',null,'["850"]','hard','850 (chữ số 0 ở hàng đơn vị).',10,21],
    [1123,3,'fill_blank','Số nhỏ nhất có 3 chữ số khác nhau, dùng thẻ 3, 6, 9 là ___.',null,'["369"]','hard','Xếp 3 vào trăm, 6 vào chục, 9 vào đơn vị.',10,22],
    [1123,3,'puzzle','Câu đố: Tôi có 3 chữ số. Hàng trăm gấp đôi hàng chục. Hàng đơn vị = 7. Hàng chục = 3. Tôi là số nào?','["637","367","736","673"]','["637"]','hard','Hàng trăm = 2×3 = 6, hàng chục = 3, đơn vị = 7 → 637.',10,23],
    [1123,3,'puzzle','Câu đố: Tổng hai số tròn trăm là 700. Một số là 400. Số kia là?','["200","300","400","500"]','["300"]','hard','700 - 400 = 300.',10,24],
    [1123,3,'game','Bài toán thực tế: Cửa hàng có 350 quyển sách. Bán 150 quyển. Còn lại bao nhiêu quyển?','{"ban_dau":350,"ban":150}','["200"]','hard','350 - 150 = 200.',10,25],
    [1123,3,'sorting','Sắp xếp giảm dần theo giá trị: 245+300, 500+20+5, 400+40+4, 700-100, 1000-200.','["1000-200","700-100","245+300","500+20+5","400+40+4"]','["1000-200","700-100","245+300","500+20+5","400+40+4"]','hard','1000-200=800, 700-100=600, 245+300=545, 500+20+5=525, 400+40+4=444. Thứ tự giảm: 800>600>545>525>444.',10,26],
    [1123,3,'matching','Nối bài toán với kết quả:','{"items":["300+400+100","1000-500","600-200+100","200×3"],"targets":["800","500","500","600"]}','{"300+400+100":"800","1000-500":"500","600-200+100":"500","200×3":"600"}','hard','Tính toán hỗn hợp.',10,27],
    [1123,3,'multiple_choice','Chọn tất cả phát biểu ĐÚNG về số trong phạm vi 1000:','["Số lớn nhất là 999","1000 thuộc phạm vi","Có 900 số có 3 chữ số","Số tròn trăm có 10 số (100-1000)"]','["1000 thuộc phạm vi","Có 900 số có 3 chữ số","Số tròn trăm có 10 số (100-1000)"]','hard','999 không phải số lớn nhất vì 1000 cũng thuộc phạm vi.',10,28],
    [1123,3,'multiple_choice','Chọn tất cả phép tính có kết quả trong phạm vi 500–700:','["300+250","800-200","400+250","1000-500","600+200"]','["300+250","800-200","400+250","1000-500"]','hard','550✓, 600✓, 650✓, 500✓, 800✗.',10,29],
    [1123,3,'drag_drop','Kéo thẻ số vào thứ tự đúng (tăng dần): 234, 432, 342, 243, 324.','{"numbers":["234","432","342","243","324"]}','["234","243","324","342","432"]','hard','234<243<324<342<432.',10,30],
  ];

  let total = 0;
  let currentLesson = 0;

  for (const row of data) {
    const [lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder] = row;
    await conn.execute(INSERT_SQL, [lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder]);
    total++;
    if (lessonId !== currentLesson) {
      if (currentLesson !== 0) console.log(`✅ lessonId ${currentLesson} done`);
      currentLesson = lessonId as number;
    }
  }
  if (currentLesson !== 0) console.log(`✅ lessonId ${currentLesson} done`);

  await conn.end();
  console.log(`\nTotal inserted: ${total} rows`);
}

seed().catch(console.error);
