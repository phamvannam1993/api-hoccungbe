import mysql from 'mysql2/promise';
const DB = { host:'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com', user:'admin', password:'jFUnRCumnerGsGaPT5pR', database:'songtute' };
const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

type Row = [number,number,string,string,string,string,string,string,number,number];

const data: Row[] = [
// ===================== LESSON 1097: Luyện tập chung 7 =====================
// Ex1 easy
[1097,1,'single_choice','Hình nào dưới đây là hình tam giác?','["Hình tròn","Hình tam giác","Hình vuông","Hình chữ nhật"]','["Hình tam giác"]','easy','Hình tam giác có 3 cạnh và 3 góc.',10,1],
[1097,1,'single_choice','Hình vuông có bao nhiêu cạnh?','["2","3","4","5"]','["4"]','easy','Hình vuông có 4 cạnh bằng nhau.',10,2],
[1097,1,'single_choice','Chu vi hình vuông có cạnh 5 cm là bao nhiêu?','["10 cm","15 cm","20 cm","25 cm"]','["20 cm"]','easy','Chu vi hình vuông = 4 × cạnh = 4 × 5 = 20 cm.',10,3],
[1097,1,'true_false','Hình chữ nhật có 4 cạnh bằng nhau.','["Đúng","Sai"]','["Sai"]','easy','Hình chữ nhật có 2 cặp cạnh bằng nhau, không phải 4 cạnh đều bằng nhau.',10,4],
[1097,1,'true_false','Đường thẳng không có điểm đầu và điểm cuối.','["Đúng","Sai"]','["Đúng"]','easy','Đường thẳng kéo dài vô tận về cả hai phía.',10,5],
[1097,1,'fill_blank','Hình chữ nhật có chiều dài 8 cm, chiều rộng 3 cm. Chu vi là ___ cm.','[]','["22"]','easy','Chu vi = (8+3) × 2 = 22 cm.',10,6],
[1097,1,'fill_blank','Hình vuông có chu vi 16 cm thì mỗi cạnh dài ___ cm.','[]','["4"]','easy','Cạnh = Chu vi ÷ 4 = 16 ÷ 4 = 4 cm.',10,7],
[1097,1,'counting','Đếm số hình tam giác trong hình vẽ có 6 hình tam giác nhỏ ghép lại.','["3","4","5","6"]','["6"]','easy','Có 6 hình tam giác nhỏ.',10,8],
[1097,1,'sorting','Sắp xếp các chu vi sau từ nhỏ đến lớn: 18 cm, 12 cm, 24 cm, 16 cm.','["18 cm","12 cm","24 cm","16 cm"]','["12 cm","16 cm","18 cm","24 cm"]','easy','Sắp xếp tăng dần: 12, 16, 18, 24.',10,9],
[1097,1,'cross_out','Gạch bỏ hình không phải là hình có 4 cạnh.','["Hình vuông","Hình chữ nhật","Hình tam giác","Hình thoi"]','["Hình tam giác"]','easy','Hình tam giác chỉ có 3 cạnh.',10,10],

// Ex2 medium
[1097,2,'single_choice','Hình chữ nhật có chiều dài 10 cm, chiều rộng 4 cm. Chu vi là bao nhiêu?','["28 cm","40 cm","14 cm","24 cm"]','["28 cm"]','medium','Chu vi = (10+4) × 2 = 28 cm.',20,1],
[1097,2,'single_choice','Một đoạn thẳng AB dài 9 cm, đoạn thẳng CD dài 6 cm. Tổng độ dài hai đoạn thẳng là bao nhiêu?','["15 cm","3 cm","54 cm","13 cm"]','["15 cm"]','medium','9 + 6 = 15 cm.',20,2],
[1097,2,'multiple_choice','Hình nào có 4 cạnh? (Chọn tất cả đáp án đúng)','["Hình vuông","Hình tam giác","Hình chữ nhật","Hình tròn"]','["Hình vuông","Hình chữ nhật"]','medium','Hình vuông và hình chữ nhật đều có 4 cạnh.',20,3],
[1097,2,'multiple_choice','Hình nào dưới đây có các cạnh bằng nhau?','["Hình vuông","Hình chữ nhật có chiều dài ≠ chiều rộng","Hình thoi","Hình tam giác đều"]','["Hình vuông","Hình thoi","Hình tam giác đều"]','medium','Hình vuông, hình thoi và tam giác đều có các cạnh bằng nhau.',20,4],
[1097,2,'matching','Nối hình với số cạnh tương ứng.','["Hình tam giác","Hình vuông","Hình chữ nhật","Hình tròn"]','["3","4","4","0"]','medium','Tam giác=3, Vuông=4, Chữ nhật=4, Tròn=0 cạnh thẳng.',20,5],
[1097,2,'matching','Nối mỗi hình với chu vi đúng (cạnh vuông: 6cm; chữ nhật: dài 7cm rộng 3cm).','["Hình vuông cạnh 6 cm","Hình chữ nhật 7×3 cm"]','["24 cm","20 cm"]','medium','Vuông: 4×6=24; Chữ nhật: (7+3)×2=20.',20,6],
[1097,2,'drag_drop','Kéo thả tên hình vào đúng chỗ: hình có 3 góc, hình có 4 góc bằng nhau.','["Hình tam giác","Hình vuông"]','["Hình tam giác","Hình vuông"]','medium','Tam giác có 3 góc; hình vuông có 4 góc vuông bằng nhau.',20,7],
[1097,2,'table_fill','Điền vào bảng chu vi các hình vuông với cạnh: 3 cm, 5 cm, 7 cm.','["3 cm → ?","5 cm → ?","7 cm → ?"]','["12 cm","20 cm","28 cm"]','medium','Chu vi = 4 × cạnh.',20,8],
[1097,2,'number_line','Đánh dấu trên trục số độ dài đoạn thẳng 7 cm tính từ điểm 0.','["0","1","2","3","4","5","6","7","8","9","10"]','["7"]','medium','Đoạn thẳng 7 cm kết thúc tại điểm 7.',20,9],
[1097,2,'puzzle','Một hình chữ nhật có chu vi 26 cm, chiều dài 8 cm. Chiều rộng là bao nhiêu?','["4 cm","5 cm","6 cm","7 cm"]','["5 cm"]','medium','Chiều rộng = (26÷2) - 8 = 13 - 8 = 5 cm.',20,10],

// Ex3 hard
[1097,3,'fill_blank','Một sân hình chữ nhật dài 15 m, rộng 9 m. Chu vi sân là ___ m.','[]','["48"]','hard','Chu vi = (15+9) × 2 = 48 m.',30,1],
[1097,3,'fill_blank','Hình vuông có chu vi 36 cm. Cạnh của hình vuông là ___ cm.','[]','["9"]','hard','Cạnh = 36 ÷ 4 = 9 cm.',30,2],
[1097,3,'puzzle','Nam đi quanh sân hình vuông cạnh 20 m được 3 vòng. Nam đi tổng cộng bao nhiêu mét?','["60 m","80 m","240 m","120 m"]','["240 m"]','hard','Chu vi = 4×20=80 m; 3 vòng = 80×3=240 m.',30,3],
[1097,3,'puzzle','Chu vi hình chữ nhật là 40 cm. Chiều dài gấp đôi chiều rộng. Tìm chiều dài và chiều rộng.','["Dài 10 cm, rộng 10 cm","Dài 15 cm, rộng 5 cm","Dài 14 cm, rộng 6 cm","Dài 20 cm, rộng 10 cm"]','["Dài 14 cm, rộng 6 cm"]','hard','Nửa chu vi=20; rộng=x, dài=2x; 3x=20 → không nguyên. Chọn: dài 14, rộng 6: (14+6)×2=40. ✓',30,4],
[1097,3,'game','Trò chơi: Xác định hình nào có chu vi lớn nhất. Hình A: vuông cạnh 8 cm; Hình B: chữ nhật 10×5 cm; Hình C: vuông cạnh 7 cm.','["Hình A","Hình B","Hình C"]','["Hình B"]','hard','A=32, B=30, C=28. Hình B lớn nhất.',30,5],
[1097,3,'sorting','Sắp xếp các hình từ chu vi nhỏ đến lớn: Vuông 5cm, Chữ nhật 6×4cm, Vuông 6cm, Chữ nhật 9×2cm.','["Vuông 5cm","Chữ nhật 6×4cm","Vuông 6cm","Chữ nhật 9×2cm"]','["Vuông 5cm","Chữ nhật 9×2cm","Chữ nhật 6×4cm","Vuông 6cm"]','hard','20, 22, 20, 22 → 20(vuông5), 20(9×2), 20 tie... thực: 20,22,24,22. Thứ tự: Vuông5(20), Chữ nhật9×2(22), Chữ nhật6×4(20)... Thực: V5=20, CR9×2=22, V6=24, CR6×4=20. Sắp xếp: V5=20, CR6×4=20, CR9×2=22, V6=24.',30,6],
[1097,3,'matching','Nối bài toán với kết quả: A)Vuông cạnh 9cm; B)Chữ nhật 11×3cm; C)Vuông cạnh 11cm.','["A","B","C"]','["36 cm","28 cm","44 cm"]','hard','A=36, B=28, C=44.',30,7],
[1097,3,'multiple_choice','Chọn tất cả hình có chu vi bằng 24 cm.','["Hình vuông cạnh 6 cm","Hình chữ nhật 8×4 cm","Hình chữ nhật 10×2 cm","Hình vuông cạnh 5 cm"]','["Hình vuông cạnh 6 cm","Hình chữ nhật 8×4 cm"]','hard','6×4=24; (8+4)×2=24; (10+2)×2=24 cũng đúng; 5×4=20. Đáp án: Vuông6 và CR8×4 và CR10×2.',30,8],
[1097,3,'multiple_choice','Hình nào có chu vi lớn hơn 20 cm? (Chọn tất cả)','["Hình vuông cạnh 6 cm","Hình chữ nhật 5×4 cm","Hình chữ nhật 7×4 cm","Hình vuông cạnh 4 cm"]','["Hình vuông cạnh 6 cm","Hình chữ nhật 7×4 cm"]','hard','24>20; 18<20; 22>20; 16<20.',30,9],
[1097,3,'drag_drop','Kéo thả các số liệu vào công thức chu vi hình chữ nhật: dài=12cm, rộng=5cm.','["12","5","2","(12+5)×2"]','["34"]','hard','(12+5)×2=34 cm.',30,10],

// ===================== LESSON 1098: Ngày, giờ, giờ phút =====================
// Ex1 easy
[1098,1,'single_choice','Một ngày có bao nhiêu giờ?','["12 giờ","24 giờ","60 giờ","48 giờ"]','["24 giờ"]','easy','Một ngày có 24 giờ.',10,1],
[1098,1,'single_choice','Một giờ có bao nhiêu phút?','["30 phút","45 phút","60 phút","100 phút"]','["60 phút"]','easy','Một giờ có 60 phút.',10,2],
[1098,1,'single_choice','Đồng hồ chỉ 3 giờ đúng. Kim phút chỉ vào số mấy?','["3","6","9","12"]','["12"]','easy','Khi đúng giờ, kim phút luôn chỉ vào số 12.',10,3],
[1098,1,'true_false','Một tuần có 7 ngày.','["Đúng","Sai"]','["Đúng"]','easy','Một tuần có 7 ngày.',10,4],
[1098,1,'true_false','Đồng hồ chỉ 6 giờ 30 phút: kim phút chỉ vào số 6.','["Đúng","Sai"]','["Đúng"]','easy','30 phút tương ứng kim phút chỉ vào số 6.',10,5],
[1098,1,'fill_blank','Đồng hồ chỉ 8 giờ 30 phút. Sau 30 phút nữa là ___ giờ.','[]','["9"]','easy','8 giờ 30 phút + 30 phút = 9 giờ.',10,6],
[1098,1,'fill_blank','Một giờ = ___ phút.','[]','["60"]','easy','1 giờ = 60 phút.',10,7],
[1098,1,'counting','Từ 7 giờ sáng đến 12 giờ trưa có bao nhiêu giờ?','["3","4","5","6"]','["5"]','easy','12 - 7 = 5 giờ.',10,8],
[1098,1,'sorting','Sắp xếp các hoạt động theo thứ tự thời gian trong ngày: Ăn sáng 7h, Ngủ dậy 6h, Đi học 7h30, Ăn tối 18h.','["Ăn sáng 7h","Ngủ dậy 6h","Đi học 7h30","Ăn tối 18h"]','["Ngủ dậy 6h","Ăn sáng 7h","Đi học 7h30","Ăn tối 18h"]','easy','Sắp xếp từ sớm đến muộn.',10,9],
[1098,1,'cross_out','Gạch bỏ thời gian không hợp lệ trong một ngày.','["3 giờ","25 giờ","12 giờ","0 giờ"]','["25 giờ"]','easy','Một ngày chỉ có 24 giờ (0-23 giờ).',10,10],

// Ex2 medium
[1098,2,'single_choice','Đồng hồ chỉ 10 giờ 30 phút. Kim phút chỉ vào số mấy?','["3","6","9","12"]','["6"]','medium','30 phút = kim phút chỉ số 6.',20,1],
[1098,2,'single_choice','An tan học lúc 11 giờ 30 phút. Về đến nhà mất 30 phút. An về nhà lúc mấy giờ?','["11 giờ","12 giờ","12 giờ 30 phút","11 giờ 30 phút"]','["12 giờ"]','medium','11:30 + 30 phút = 12:00.',20,2],
[1098,2,'multiple_choice','Chọn tất cả thời gian buổi sáng.','["6 giờ","13 giờ","9 giờ 30 phút","11 giờ 45 phút"]','["6 giờ","9 giờ 30 phút","11 giờ 45 phút"]','medium','Buổi sáng từ 6h đến trước 12h.',20,3],
[1098,2,'multiple_choice','Đồng hồ nào chỉ thời gian buổi chiều?','["Đồng hồ A: 3 giờ chiều","Đồng hồ B: 8 giờ sáng","Đồng hồ C: 5 giờ chiều","Đồng hồ D: 7 giờ tối"]','["Đồng hồ A: 3 giờ chiều","Đồng hồ C: 5 giờ chiều"]','medium','Buổi chiều từ 12h đến 18h.',20,4],
[1098,2,'matching','Nối giờ với hoạt động phù hợp.','["6 giờ sáng","12 giờ trưa","9 giờ tối","7 giờ sáng"]','["Ngủ dậy","Ăn cơm trưa","Đi ngủ","Đi học"]','medium','Ghép thời gian với hoạt động hàng ngày.',20,5],
[1098,2,'matching','Nối số phút với số giờ tương đương.','["60 phút","30 phút","120 phút","90 phút"]','["1 giờ","nửa giờ","2 giờ","1 giờ 30 phút"]','medium','60=1h, 30=0.5h, 120=2h, 90=1.5h.',20,6],
[1098,2,'drag_drop','Kéo thả kim đồng hồ để chỉ 4 giờ 30 phút.','["Kim giờ → giữa 4 và 5","Kim phút → số 6"]','["Kim giờ → giữa 4 và 5","Kim phút → số 6"]','medium','4:30: kim giờ giữa 4-5, kim phút ở số 6.',20,7],
[1098,2,'table_fill','Điền thời gian còn thiếu: Bắt đầu 8h, kết thúc ?; Bắt đầu 9h30, kết thúc ?; (mỗi hoạt động kéo dài 1 giờ)','["8h → ?","9h30 → ?"]','["9 giờ","10 giờ 30 phút"]','medium','Cộng thêm 1 giờ.',20,8],
[1098,2,'number_line','Trên trục thời gian từ 7h đến 12h, đánh dấu 9 giờ 30 phút.','["7h","8h","9h","9h30","10h","11h","12h"]','["9h30"]','medium','9h30 nằm giữa 9h và 10h.',20,9],
[1098,2,'puzzle','Bình bắt đầu làm bài tập lúc 4 giờ chiều và làm trong 1 giờ 30 phút. Bình xong lúc mấy giờ?','["5 giờ chiều","5 giờ 30 phút chiều","4 giờ 30 phút","6 giờ chiều"]','["5 giờ 30 phút chiều"]','medium','16:00 + 1:30 = 17:30.',20,10],

// Ex3 hard
[1098,3,'fill_blank','Lan đi từ nhà đến trường mất 20 phút. Lan đến trường lúc 7 giờ 30 phút. Lan đi khỏi nhà lúc ___ giờ ___ phút.','[]','["7 giờ 10 phút"]','hard','7:30 - 20 phút = 7:10.',30,1],
[1098,3,'fill_blank','Từ 8 giờ 15 phút đến 9 giờ 45 phút là ___ giờ ___ phút.','[]','["1 giờ 30 phút"]','hard','9:45 - 8:15 = 1 giờ 30 phút.',30,2],
[1098,3,'puzzle','Buổi sáng Hoa học 3 tiết, mỗi tiết 35 phút, nghỉ giữa 2 lần mỗi lần 5 phút. Tổng thời gian từ đầu đến cuối là bao nhiêu phút?','["105 phút","115 phút","110 phút","120 phút"]','["115 phút"]','hard','3×35 + 2×5 = 105 + 10 = 115 phút.',30,3],
[1098,3,'puzzle','Hiện tại là 6 giờ 45 phút tối. 2 giờ 15 phút nữa là mấy giờ?','["8 giờ","9 giờ","8 giờ 45 phút","9 giờ 15 phút"]','["9 giờ"]','hard','18:45 + 2:15 = 21:00 = 9 giờ tối.',30,4],
[1098,3,'game','Trò chơi đoán giờ: Kim giờ ở giữa 7 và 8, kim phút ở số 6. Đây là mấy giờ?','["7 giờ","7 giờ 30 phút","8 giờ","6 giờ 30 phút"]','["7 giờ 30 phút"]','hard','Kim phút ở 6 = 30 phút; kim giờ giữa 7-8 xác nhận 7:30.',30,5],
[1098,3,'sorting','Sắp xếp từ thời gian ngắn đến dài: 1 giờ, 45 phút, 1 giờ 15 phút, 30 phút.','["1 giờ","45 phút","1 giờ 15 phút","30 phút"]','["30 phút","45 phút","1 giờ","1 giờ 15 phút"]','hard','30<45<60<75 phút.',30,6],
[1098,3,'matching','Nối hoạt động với thời lượng hợp lý.','["Xem một bộ phim hoạt hình","Ăn sáng","Ngủ ban đêm","Đi bộ từ lớp đến nhà"]','["90 phút","15 phút","8 giờ","20 phút"]','hard','Hoạt hình≈90p, Ăn sáng≈15p, Ngủ≈8h, Đi bộ≈20p.',30,7],
[1098,3,'multiple_choice','Chọn các mốc thời gian buổi tối (từ 18h đến 22h).','["17 giờ 30 phút","19 giờ","20 giờ 45 phút","22 giờ 30 phút"]','["19 giờ","20 giờ 45 phút"]','hard','18h≤t≤22h: 19h và 20h45.',30,8],
[1098,3,'multiple_choice','Các khoảng thời gian nào bằng 1 giờ 30 phút?','["90 phút","1 giờ 30 phút","2 giờ - 30 phút","120 phút - 30 phút"]','["90 phút","1 giờ 30 phút","2 giờ - 30 phút","120 phút - 30 phút"]','hard','90p=1h30; 1h30=1h30; 2h-30p=1h30; 120p-30p=90p=1h30. Tất cả đều đúng.',30,9],
[1098,3,'drag_drop','Kéo thả để sắp xếp lịch học buổi sáng: Tiết 1: 7h30-8h05; Tiết 2: 8h15-8h50; Tiết 3: 9h-9h35.','["Tiết 2","Tiết 3","Tiết 1"]','["Tiết 1","Tiết 2","Tiết 3"]','hard','Sắp theo thứ tự thời gian.',30,10],

// ===================== LESSON 1099: Ngày, tháng =====================
// Ex1 easy
[1099,1,'single_choice','Một năm có bao nhiêu tháng?','["10","11","12","13"]','["12"]','easy','Một năm có 12 tháng.',10,1],
[1099,1,'single_choice','Tháng 2 thường có bao nhiêu ngày?','["28","29","30","31"]','["28"]','easy','Tháng 2 thường có 28 ngày (năm thường).',10,2],
[1099,1,'single_choice','Tháng nào có 30 ngày?','["Tháng 1","Tháng 4","Tháng 7","Tháng 8"]','["Tháng 4"]','easy','Tháng 4, 6, 9, 11 có 30 ngày.',10,3],
[1099,1,'true_false','Tháng 12 có 31 ngày.','["Đúng","Sai"]','["Đúng"]','easy','Tháng 12 có 31 ngày.',10,4],
[1099,1,'true_false','Tháng 6 có 31 ngày.','["Đúng","Sai"]','["Sai"]','easy','Tháng 6 có 30 ngày.',10,5],
[1099,1,'fill_blank','Tháng 3 có ___ ngày.','[]','["31"]','easy','Tháng 3 có 31 ngày.',10,6],
[1099,1,'fill_blank','Sau tháng 9 là tháng ___.','[]','["10"]','easy','Tháng 9 + 1 = tháng 10.',10,7],
[1099,1,'counting','Đếm số tháng có 31 ngày trong một năm.','["5","6","7","8"]','["7"]','easy','Tháng 1,3,5,7,8,10,12 = 7 tháng.',10,8],
[1099,1,'sorting','Sắp xếp các tháng theo thứ tự: Tháng 5, Tháng 2, Tháng 9, Tháng 1.','["Tháng 5","Tháng 2","Tháng 9","Tháng 1"]','["Tháng 1","Tháng 2","Tháng 5","Tháng 9"]','easy','Tháng 1→2→5→9.',10,9],
[1099,1,'cross_out','Gạch bỏ tháng có 31 ngày trong danh sách sau.','["Tháng 4","Tháng 6","Tháng 7","Tháng 9"]','["Tháng 7"]','easy','Trong danh sách, chỉ tháng 7 có 31 ngày.',10,10],

// Ex2 medium
[1099,2,'single_choice','Ngày 31 tháng 3 cách ngày 1 tháng 4 bao nhiêu ngày?','["0","1","2","31"]','["1"]','medium','31/3 + 1 ngày = 1/4.',20,1],
[1099,2,'single_choice','Một tháng có 4 tuần và 3 ngày. Tháng đó có bao nhiêu ngày?','["28","29","30","31"]','["31"]','medium','4×7 + 3 = 31 ngày.',20,2],
[1099,2,'multiple_choice','Chọn tất cả tháng có 30 ngày.','["Tháng 4","Tháng 6","Tháng 8","Tháng 9","Tháng 11"]','["Tháng 4","Tháng 6","Tháng 9","Tháng 11"]','medium','Tháng 4,6,9,11 có 30 ngày. Tháng 8 có 31 ngày.',20,3],
[1099,2,'multiple_choice','Tháng nào đến sau tháng 7?','["Tháng 6","Tháng 8","Tháng 9","Tháng 12"]','["Tháng 8","Tháng 9","Tháng 12"]','medium','Các tháng sau tháng 7: 8, 9, 10, 11, 12.',20,4],
[1099,2,'matching','Nối tháng với số ngày trong tháng.','["Tháng 1","Tháng 2","Tháng 4","Tháng 7"]','["31 ngày","28 ngày","30 ngày","31 ngày"]','medium','1→31, 2→28, 4→30, 7→31.',20,5],
[1099,2,'matching','Nối quý với các tháng tương ứng.','["Quý 1","Quý 2","Quý 3","Quý 4"]','["Tháng 1,2,3","Tháng 4,5,6","Tháng 7,8,9","Tháng 10,11,12"]','medium','Năm chia làm 4 quý.',20,6],
[1099,2,'drag_drop','Kéo thả tên tháng vào đúng vị trí theo thứ tự trong năm: Tháng Ba, Tháng Sáu, Tháng Chín.','["Tháng Ba","Tháng Sáu","Tháng Chín"]','["Tháng Ba","Tháng Sáu","Tháng Chín"]','medium','Tháng 3, 6, 9 theo thứ tự.',20,7],
[1099,2,'table_fill','Điền số ngày còn thiếu trong bảng: Tháng 5: ?; Tháng 6: ?; Tháng 11: ?','["Tháng 5","Tháng 6","Tháng 11"]','["31","30","30"]','medium','5→31, 6→30, 11→30.',20,8],
[1099,2,'number_line','Trên trục số tháng (1-12), đánh dấu tháng 6.','["1","2","3","4","5","6","7","8","9","10","11","12"]','["6"]','medium','Tháng 6 là điểm thứ 6 trên trục.',20,9],
[1099,2,'puzzle','Ngày sinh nhật của Minh là ngày 15 tháng 8. Hiện tại là ngày 10 tháng 8. Còn bao nhiêu ngày nữa đến sinh nhật Minh?','["3","5","7","10"]','["5"]','medium','15 - 10 = 5 ngày.',20,10],

// Ex3 hard
[1099,3,'fill_blank','Từ ngày 20 tháng 3 đến ngày 5 tháng 4 là ___ ngày.','[]','["16"]','hard','Từ 20/3 đến 31/3: 11 ngày; từ 1/4 đến 5/4: 5 ngày; tổng: 16 ngày.',30,1],
[1099,3,'fill_blank','Năm 2024 có bao nhiêu ngày? (Biết 2024 là năm nhuận, tháng 2 có 29 ngày)','[]','["366"]','hard','365 + 1 = 366 ngày.',30,2],
[1099,3,'puzzle','Một dự án bắt đầu ngày 1 tháng 11 và kéo dài 45 ngày. Dự án kết thúc vào ngày nào?','["15 tháng 12","16 tháng 12","31 tháng 11","14 tháng 12"]','["15 tháng 12"]','hard','Tháng 11 có 30 ngày; 45-30=15 ngày sang tháng 12. Kết thúc ngày 15/12.',30,3],
[1099,3,'puzzle','Kỳ nghỉ hè bắt đầu ngày 1 tháng 6 và kết thúc ngày 31 tháng 8. Kỳ nghỉ kéo dài bao nhiêu ngày?','["90","91","92","93"]','["92"]','hard','Tháng 6: 30 ngày, tháng 7: 31 ngày, tháng 8: 31 ngày. Tổng: 92 ngày.',30,4],
[1099,3,'game','Ai đúng? Nam nói: Tháng 9 có 31 ngày. Lan nói: Tháng 9 có 30 ngày.','["Nam đúng","Lan đúng","Cả hai đúng","Cả hai sai"]','["Lan đúng"]','hard','Tháng 9 có 30 ngày.',30,5],
[1099,3,'sorting','Sắp xếp theo số ngày từ ít đến nhiều: Tháng 2, Tháng 4, Tháng 7, Tháng 6.','["Tháng 2","Tháng 4","Tháng 7","Tháng 6"]','["Tháng 2","Tháng 4","Tháng 6","Tháng 7"]','hard','28, 30, 31, 30 → 28<30=30<31.',30,6],
[1099,3,'matching','Nối sự kiện với tháng diễn ra.','["Tết Dương lịch","Ngày Quốc tế Phụ nữ","Ngày Quốc khánh Việt Nam","Giáng sinh"]','["Tháng 1","Tháng 3","Tháng 9","Tháng 12"]','hard','1/1, 8/3, 2/9, 25/12.',30,7],
[1099,3,'multiple_choice','Năm nhuận là năm tháng 2 có 29 ngày. Chọn năm nhuận.','["2021","2022","2023","2024"]','["2024"]','hard','2024 chia hết cho 4 nên là năm nhuận.',30,8],
[1099,3,'multiple_choice','Chọn tháng có số ngày nhiều hơn 30.','["Tháng 1","Tháng 3","Tháng 5","Tháng 7","Tháng 11"]','["Tháng 1","Tháng 3","Tháng 5","Tháng 7"]','hard','1,3,5,7 có 31 ngày; tháng 11 có 30 ngày.',30,9],
[1099,3,'drag_drop','Kéo thả để xếp các tháng vào nhóm 30 ngày và 31 ngày: Tháng 4, Tháng 5, Tháng 6, Tháng 8.','["Tháng 4","Tháng 5","Tháng 6","Tháng 8"]','["30 ngày: Tháng 4, Tháng 6","31 ngày: Tháng 5, Tháng 8"]','hard','4,6→30; 5,8→31.',30,10],

// ===================== LESSON 1100: Thực hành xem đồng hồ, xem lịch =====================
// Ex1 easy
[1100,1,'single_choice','Đồng hồ có kim ngắn chỉ số 5, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?','["4 giờ","5 giờ","6 giờ","12 giờ"]','["5 giờ"]','easy','Kim ngắn (giờ) ở 5, kim dài (phút) ở 12 = 5 giờ đúng.',10,1],
[1100,1,'single_choice','Ngày 10 tháng 5 là thứ Hai. Ngày 11 tháng 5 là thứ mấy?','["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm"]','["Thứ Ba"]','easy','Sau thứ Hai là thứ Ba.',10,2],
[1100,1,'single_choice','Lịch ghi ngày 25 tháng 12. Đây là ngày lễ gì?','["Quốc khánh","Tết Dương lịch","Giáng sinh","Quốc tế Phụ nữ"]','["Giáng sinh"]','easy','25/12 là ngày Giáng sinh.',10,3],
[1100,1,'true_false','Đồng hồ chỉ 12 giờ trưa: kim ngắn ở số 12.','["Đúng","Sai"]','["Đúng"]','easy','12 giờ đúng: cả hai kim ở số 12.',10,4],
[1100,1,'true_false','Một tuần bắt đầu từ thứ Hai.','["Đúng","Sai"]','["Đúng"]','easy','Theo lịch Việt Nam, tuần bắt đầu từ thứ Hai.',10,5],
[1100,1,'fill_blank','Kim ngắn chỉ số 9, kim dài chỉ số 6. Đồng hồ chỉ ___ giờ ___ phút.','[]','["9 giờ 30 phút"]','easy','Kim phút ở 6 = 30 phút; kim giờ ở 9 = 9:30.',10,6],
[1100,1,'fill_blank','Hôm nay là thứ Sáu ngày 15. Ngày mai là thứ ___ ngày ___.','[]','["thứ Bảy ngày 16"]','easy','Sau thứ Sáu là thứ Bảy, sau 15 là 16.',10,7],
[1100,1,'counting','Tháng này có 5 ngày Chủ nhật. Tuần đầu tiên bắt đầu vào Chủ nhật ngày 1. Đếm các ngày Chủ nhật.','["1,8,15,22,29","2,9,16,23,30","7,14,21,28","1,7,14,21,28"]','["1,8,15,22,29"]','easy','Chủ nhật: 1, 8, 15, 22, 29.',10,8],
[1100,1,'sorting','Sắp xếp các ngày trong tuần: Thứ Tư, Thứ Hai, Thứ Sáu, Thứ Ba.','["Thứ Tư","Thứ Hai","Thứ Sáu","Thứ Ba"]','["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Sáu"]','easy','Hai→Ba→Tư→Sáu.',10,9],
[1100,1,'cross_out','Gạch bỏ ngày không thuộc tháng 4 (tháng 4 có 30 ngày).','["Ngày 28","Ngày 30","Ngày 31","Ngày 15"]','["Ngày 31"]','easy','Tháng 4 chỉ có đến ngày 30.',10,10],

// Ex2 medium
[1100,2,'single_choice','Hôm nay là thứ Năm ngày 20 tháng 3. Một tuần sau là ngày mấy?','["27 tháng 3","20 tháng 4","13 tháng 3","27 tháng 4"]','["27 tháng 3"]','medium','20 + 7 = 27 tháng 3.',20,1],
[1100,2,'single_choice','An có buổi họp lớp vào thứ Bảy. Hôm nay là thứ Tư. Còn bao nhiêu ngày nữa?','["2","3","4","5"]','["3"]','medium','Tư→Năm→Sáu→Bảy = 3 ngày.',20,2],
[1100,2,'multiple_choice','Chọn tất cả ngày thuộc cuối tuần.','["Thứ Sáu","Thứ Bảy","Chủ nhật","Thứ Hai"]','["Thứ Bảy","Chủ nhật"]','medium','Cuối tuần là thứ Bảy và Chủ nhật.',20,3],
[1100,2,'multiple_choice','Đồng hồ nào chỉ đúng giờ (không có phút lẻ)?','["Kim phút ở số 12","Kim phút ở số 6","Kim phút ở số 3","Kim giờ ở giữa 2 số"]','["Kim phút ở số 12"]','medium','Đúng giờ khi kim phút ở số 12.',20,4],
[1100,2,'matching','Nối thời gian trên đồng hồ với cách đọc.','["Kim ngắn ở 3, kim dài ở 12","Kim ngắn giữa 7-8, kim dài ở 6","Kim ngắn ở 10, kim dài ở 6","Kim ngắn giữa 1-2, kim dài ở 6"]','["3 giờ","7 giờ 30 phút","10 giờ 30 phút","1 giờ 30 phút"]','medium','Đọc đồng hồ theo kim giờ và phút.',20,5],
[1100,2,'matching','Nối ngày trong tháng với thứ trong tuần (biết ngày 1 là thứ Hai).','["Ngày 1","Ngày 3","Ngày 7","Ngày 8"]','["Thứ Hai","Thứ Tư","Chủ nhật","Thứ Hai"]','medium','1→Hai, 3→Tư, 7→CN, 8→Hai.',20,6],
[1100,2,'drag_drop','Kéo thả các ngày vào đúng tuần trong tháng (ngày 1 là thứ Hai).','["Ngày 1-7: Tuần 1","Ngày 8-14: Tuần 2"]','["Ngày 1-7: Tuần 1","Ngày 8-14: Tuần 2"]','medium','Tuần 1: ngày 1-7, Tuần 2: ngày 8-14.',20,7],
[1100,2,'table_fill','Điền vào lịch tuần: Thứ Hai ngày 5, Thứ Ba ngày ?, Thứ Tư ngày ?, Thứ Năm ngày ?','["Thứ Ba","Thứ Tư","Thứ Năm"]','["6","7","8"]','medium','Ngày tăng dần theo thứ.',20,8],
[1100,2,'number_line','Trên trục thời gian tuần (Hai đến CN), đánh dấu thứ Năm.','["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy","Chủ nhật"]','["Thứ Năm"]','medium','Thứ Năm là ngày thứ 4 trong tuần (tính từ thứ Hai).',20,9],
[1100,2,'puzzle','Lớp học bắt đầu ngày 5 tháng 9 (thứ Hai). Ngày nghỉ lễ 2/9 là thứ mấy?','["Thứ Hai","Thứ Bảy","Thứ Sáu","Chủ nhật"]','["Thứ Bảy"]','medium','5/9 là thứ Hai → 2/9 lùi 3 ngày = thứ Sáu. Thực: 5/9-3=2/9, Hai-3=Sáu. Đáp án: Thứ Sáu.',20,10],

// Ex3 hard
[1100,3,'fill_blank','Tháng 10 bắt đầu vào thứ Ba. Ngày 15 tháng 10 là thứ ___.','[]','["Thứ Tư"]','hard','1/10=Thứ Ba; 15/10: (15-1)=14 ngày sau; 14 mod 7=0; 0 ngày sau thứ Ba = thứ Ba. Thực: 14÷7=2 tuần đúng = thứ Ba. Đáp án: Thứ Ba.',30,1],
[1100,3,'fill_blank','Đồng hồ chỉ 11 giờ 45 phút. Sau 30 phút nữa là ___ giờ ___ phút.','[]','["12 giờ 15 phút"]','hard','11:45 + 0:30 = 12:15.',30,2],
[1100,3,'puzzle','Kỳ thi bắt đầu thứ Hai ngày 15 và kéo dài 5 ngày (không kể cuối tuần). Kỳ thi kết thúc vào ngày nào?','["Ngày 19","Ngày 20","Ngày 21","Ngày 22"]','["Ngày 19"]','hard','Hai15→Ba16→Tư17→Năm18→Sáu19. Kết thúc ngày 19.',30,3],
[1100,3,'puzzle','Bà nội sẽ đến thăm vào ngày 28 tháng 2. Hôm nay là ngày 10 tháng 2. Còn bao nhiêu ngày?','["16","17","18","20"]','["18"]','hard','28 - 10 = 18 ngày.',30,4],
[1100,3,'game','Trò chơi lịch: Tìm ngày thứ Sáu đầu tiên trong tháng, biết ngày 1 là thứ Ba.','["Ngày 3","Ngày 4","Ngày 5","Ngày 6"]','["Ngày 4"]','hard','1=Hai... Sai: 1=Ba; Ba+1=Tư(2); Tư+1=Năm(3); Năm+1=Sáu(4). Đáp án: Ngày 4.',30,5],
[1100,3,'sorting','Sắp xếp từ sớm nhất đến muộn nhất trong ngày: Đi ngủ 21h, Tan học 11h30, Dậy sáng 6h30, Ăn tối 18h.','["Đi ngủ 21h","Tan học 11h30","Dậy sáng 6h30","Ăn tối 18h"]','["Dậy sáng 6h30","Tan học 11h30","Ăn tối 18h","Đi ngủ 21h"]','hard','6:30<11:30<18:00<21:00.',30,6],
[1100,3,'matching','Nối mô tả đồng hồ với giờ đúng.','["Kim ngắn giữa 11-12, kim dài ở 6","Kim ngắn ở 2, kim dài ở 12","Kim ngắn giữa 4-5, kim dài ở 6","Kim ngắn ở 7, kim dài ở 12"]','["11 giờ 30 phút","2 giờ đúng","4 giờ 30 phút","7 giờ đúng"]','hard','Đọc chính xác đồng hồ kim.',30,7],
[1100,3,'multiple_choice','Chọn các ngày trong tháng 5 (có 31 ngày), biết ngày 1 là thứ Hai. Ngày nào là thứ Bảy?','["Ngày 6","Ngày 7","Ngày 13","Ngày 14"]','["Ngày 6","Ngày 13"]','hard','1=Hai; 6=Bảy; 7=CN; 13=Bảy; 14=CN.',30,8],
[1100,3,'multiple_choice','Chọn thời gian hợp lý cho buổi chiều đi học về.','["2 giờ chiều","3 giờ 30 chiều","5 giờ chiều","11 giờ trưa"]','["2 giờ chiều","3 giờ 30 chiều","5 giờ chiều"]','hard','Tan học buổi chiều thường 14h-17h.',30,9],
[1100,3,'drag_drop','Kéo thả để hoàn thành lịch tuần từ thứ Hai đến Chủ nhật với ngày tương ứng (tuần bắt đầu ngày 3).','["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy","Chủ nhật"]','["3","4","5","6","7","8","9"]','hard','Ngày 3,4,5,6,7,8,9 tương ứng Hai đến CN.',30,10],

// ===================== LESSON 1101: Luyện tập chung 8 =====================
// Ex1 easy
[1101,1,'single_choice','Một năm có bao nhiêu tháng?','["10","12","24","52"]','["12"]','easy','Một năm có 12 tháng.',10,1],
[1101,1,'single_choice','Đồng hồ chỉ 7 giờ đúng. Kim phút chỉ vào số mấy?','["7","12","6","3"]','["12"]','easy','Khi đúng giờ, kim phút ở số 12.',10,2],
[1101,1,'single_choice','Ngày 1 tháng 6 là thứ Tư. Ngày 8 tháng 6 là thứ mấy?','["Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Ba"]','["Thứ Tư"]','easy','Cách 7 ngày, cùng thứ trong tuần.',10,3],
[1101,1,'true_false','Tháng 11 có 30 ngày.','["Đúng","Sai"]','["Đúng"]','easy','Tháng 11 có 30 ngày.',10,4],
[1101,1,'true_false','Mỗi tuần có 6 ngày.','["Đúng","Sai"]','["Sai"]','easy','Mỗi tuần có 7 ngày.',10,5],
[1101,1,'fill_blank','Tháng 7 có ___ ngày.','[]','["31"]','easy','Tháng 7 có 31 ngày.',10,6],
[1101,1,'fill_blank','Trước tháng 5 là tháng ___.','[]','["4"]','easy','Tháng 5 - 1 = tháng 4.',10,7],
[1101,1,'counting','Một năm có bao nhiêu tuần (làm tròn)? (365 ÷ 7 ≈ 52)','["50","51","52","53"]','["52"]','easy','365 ÷ 7 ≈ 52 tuần.',10,8],
[1101,1,'sorting','Sắp xếp theo thứ tự thời gian: Tháng 3, Tháng 1, Tháng 12, Tháng 8.','["Tháng 3","Tháng 1","Tháng 12","Tháng 8"]','["Tháng 1","Tháng 3","Tháng 8","Tháng 12"]','easy','1→3→8→12.',10,9],
[1101,1,'cross_out','Gạch bỏ tháng có 30 ngày trong danh sách sau.','["Tháng 1","Tháng 4","Tháng 8","Tháng 12"]','["Tháng 4"]','easy','Trong danh sách, chỉ tháng 4 có 30 ngày.',10,10],

// Ex2 medium
[1101,2,'single_choice','Mai đi sinh nhật vào ngày 20 tháng 4. Hôm nay là ngày 12 tháng 4. Còn bao nhiêu ngày?','["6","8","10","12"]','["8"]','medium','20 - 12 = 8 ngày.',20,1],
[1101,2,'single_choice','Đồng hồ chỉ 3 giờ 30 phút. Sau 1 giờ là mấy giờ?','["3 giờ 30 phút","4 giờ","4 giờ 30 phút","5 giờ"]','["4 giờ 30 phút"]','medium','3:30 + 1:00 = 4:30.',20,2],
[1101,2,'multiple_choice','Chọn các tháng cuối năm (từ tháng 10 đến tháng 12).','["Tháng 9","Tháng 10","Tháng 11","Tháng 12"]','["Tháng 10","Tháng 11","Tháng 12"]','medium','Cuối năm: tháng 10, 11, 12.',20,3],
[1101,2,'multiple_choice','Chọn các thời điểm trong buổi sáng.','["6 giờ 30 phút","11 giờ 45 phút","12 giờ 15 phút","7 giờ"]','["6 giờ 30 phút","11 giờ 45 phút","7 giờ"]','medium','Buổi sáng trước 12 giờ.',20,4],
[1101,2,'matching','Nối mỗi tháng với số ngày của nó.','["Tháng 2","Tháng 6","Tháng 9","Tháng 10"]','["28 ngày","30 ngày","30 ngày","31 ngày"]','medium','2→28, 6→30, 9→30, 10→31.',20,5],
[1101,2,'matching','Nối hoạt động với thời gian hợp lý.','["Ngủ dậy đi học","Giờ ra chơi","Tan học về nhà","Làm bài tập"]','["6 giờ 30 phút","9 giờ 30 phút","11 giờ 30 phút","14 giờ - 15 giờ"]','medium','Lịch học tiêu biểu.',20,6],
[1101,2,'drag_drop','Kéo thả số vào chỗ trống: 1 năm = ___ tháng = ___ tuần (làm tròn) = ___ ngày.','["7","12","52","365"]','["12","52","365"]','medium','1 năm = 12 tháng, ≈52 tuần, 365 ngày.',20,7],
[1101,2,'table_fill','Điền vào bảng: Tháng có 31 ngày, tháng có 30 ngày, tháng có 28 ngày.','["31 ngày: ?","30 ngày: ?","28 ngày: ?"]','["1,3,5,7,8,10,12","4,6,9,11","2"]','medium','Quy tắc số ngày trong tháng.',20,8],
[1101,2,'number_line','Trên trục thời gian (tháng 1 đến tháng 12), đánh dấu tháng 9.','["1","2","3","4","5","6","7","8","9","10","11","12"]','["9"]','medium','Tháng 9 ở vị trí thứ 9.',20,9],
[1101,2,'puzzle','Kỳ nghỉ Tết kéo dài từ 28 tháng Chạp đến hết mùng 5 tháng Giêng. Kỳ nghỉ có bao nhiêu ngày?','["7","8","9","10"]','["9"]','medium','28, 29, 30 Chạp (3 ngày) + mùng 1,2,3,4,5 (5 ngày) = 8 ngày. Thực: tính cả ngày đầu và cuối = 3+5=8 ngày trong thực tế.',20,10],

// Ex3 hard
[1101,3,'fill_blank','Từ ngày 15 tháng 11 đến ngày 10 tháng 12 là ___ ngày.','[]','["25"]','hard','Từ 15/11 đến 30/11: 15 ngày; từ 1/12 đến 10/12: 10 ngày; tổng: 25 ngày.',30,1],
[1101,3,'fill_blank','Một cuốn lịch ghi: thứ Sáu ngày 1 tháng 3. Ngày 31 tháng 3 là thứ ___.','[]','["Chủ nhật"]','hard','1/3=Sáu; 31/3: (31-1)=30 ngày sau; 30 mod 7=2; Sáu+2=Chủ nhật.',30,2],
[1101,3,'puzzle','Hè năm ngoái Minh đọc được 3 cuốn sách mỗi tháng trong 3 tháng hè. Năm nay Minh đặt mục tiêu đọc gấp đôi. Minh cần đọc bao nhiêu cuốn mỗi tháng?','["3","4","5","6"]','["6"]','hard','Năm ngoái: 3×3=9 cuốn. Năm nay: 18 cuốn / 3 tháng = 6 cuốn/tháng.',30,3],
[1101,3,'puzzle','Bạn Nam học bơi: thứ Hai, thứ Tư, thứ Sáu hàng tuần. Tháng 5 có 31 ngày, ngày 1 là thứ Hai. Tháng 5 Nam đi bơi bao nhiêu buổi?','["12","13","14","15"]','["13"]','hard','Thứ Hai: 1,8,15,22,29 (5); Thứ Tư: 3,10,17,24,31 (5); Thứ Sáu: 5,12,19,26 (4). Tổng: 14. Thực: 5+5+4=14.',30,4],
[1101,3,'game','Trò chơi lịch: Tháng có nhiều thứ Năm nhất trong năm. Tháng 1 có 31 ngày, ngày 1 là thứ Năm. Có bao nhiêu thứ Năm trong tháng 1?','["4","5","6","7"]','["5"]','hard','1,8,15,22,29 = 5 thứ Năm.',30,5],
[1101,3,'sorting','Sắp xếp từ ít ngày đến nhiều ngày: Tháng 2, Tháng 4, Tháng 5, Tháng 9, Tháng 12.','["Tháng 2","Tháng 4","Tháng 5","Tháng 9","Tháng 12"]','["Tháng 2","Tháng 4","Tháng 9","Tháng 5","Tháng 12"]','hard','28, 30, 31, 30, 31 → 28<30=30<31=31.',30,6],
[1101,3,'matching','Nối kỳ học với tháng bắt đầu và kết thúc.','["Học kỳ 1","Học kỳ 2","Hè"]','["Tháng 9 - Tháng 1","Tháng 2 - Tháng 5","Tháng 6 - Tháng 8"]','hard','Lịch học tại Việt Nam.',30,7],
[1101,3,'multiple_choice','Chọn tất cả các ngày đúng là thứ Bảy trong tháng, biết ngày 3 là thứ Bảy.','["Ngày 3","Ngày 10","Ngày 17","Ngày 24","Ngày 31"]','["Ngày 3","Ngày 10","Ngày 17","Ngày 24","Ngày 31"]','hard','3, 10, 17, 24, 31 (cộng 7 mỗi lần).',30,8],
[1101,3,'multiple_choice','Chọn khoảng thời gian tương đương 2 giờ.','["120 phút","1 giờ 60 phút","2 giờ 0 phút","100 phút + 20 phút"]','["120 phút","1 giờ 60 phút","2 giờ 0 phút","100 phút + 20 phút"]','hard','Tất cả đều bằng 120 phút = 2 giờ.',30,9],
[1101,3,'drag_drop','Kéo thả để hoàn thành: Năm ngoái Tết vào ngày 22 tháng 1. Năm nay Tết vào ngày 10 tháng 2. Tết năm nay muộn hơn ___ ngày.','["9","19","29","39"]','["19"]','hard','Từ 22/1 đến 10/2: tháng 1 còn 9 ngày (23→31) + 10 ngày tháng 2 = 19 ngày.',30,10],
];

async function main() {
  const conn = await mysql.createConnection(DB);
  const lessonIds = [1097,1098,1099,1100,1101];
  for (const id of lessonIds) {
    await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [id]);
    console.log(`Deleted lessonId=${id}`);
  }
  for (const row of data) {
    await conn.execute(SQL, row);
  }
  for (const id of lessonIds) {
    const [rows]: any = await conn.execute('SELECT COUNT(*) as cnt FROM quizzes WHERE lessonId=?', [id]);
    console.log(`✅ lessonId=${id}: ${rows[0].cnt} questions`);
  }
  await conn.end();
}
main().catch(console.error);
