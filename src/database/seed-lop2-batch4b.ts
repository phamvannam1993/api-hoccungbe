import mysql from 'mysql2/promise';
const DB = { host:'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com', user:'admin', password:'jFUnRCumnerGsGaPT5pR', database:'songtute' };
const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

type Row = [number,number,string,string,string,string,string,string,number,number];

const data: Row[] = [
// ===================== LESSON 1102: Ôn tập phép cộng, trừ phạm vi 20 và 100 =====================
// Ex1 easy
[1102,1,'single_choice','14 + 5 = ?','["17","18","19","20"]','["19"]','easy','14 + 5 = 19.',10,1],
[1102,1,'single_choice','17 - 8 = ?','["7","8","9","10"]','["9"]','easy','17 - 8 = 9.',10,2],
[1102,1,'single_choice','45 + 30 = ?','["65","70","75","80"]','["75"]','easy','45 + 30 = 75.',10,3],
[1102,1,'true_false','9 + 8 = 17','["Đúng","Sai"]','["Đúng"]','easy','9 + 8 = 17.',10,4],
[1102,1,'true_false','80 - 50 = 20','["Đúng","Sai"]','["Sai"]','easy','80 - 50 = 30.',10,5],
[1102,1,'fill_blank','16 + ___ = 20','[]','["4"]','easy','20 - 16 = 4.',10,6],
[1102,1,'fill_blank','___ - 7 = 8','[]','["15"]','easy','8 + 7 = 15.',10,7],
[1102,1,'counting','Có 13 quả táo, ăn 6 quả. Còn lại bao nhiêu quả?','["5","6","7","8"]','["7"]','easy','13 - 6 = 7.',10,8],
[1102,1,'sorting','Sắp xếp kết quả từ nhỏ đến lớn: 12+5, 7+6, 14+3, 9+8.','["12+5","7+6","14+3","9+8"]','["7+6=13","12+5=17","14+3=17","9+8=17"]','easy','13, 17, 17, 17. Thứ tự: 13, rồi các số 17.',10,9],
[1102,1,'cross_out','Gạch bỏ phép tính có kết quả khác 15.','["8+7","6+9","5+10","4+9"]','["4+9"]','easy','4+9=13 ≠ 15. Các phép còn lại = 15.',10,10],

// Ex2 medium
[1102,2,'single_choice','63 + 25 = ?','["80","86","88","90"]','["88"]','medium','63 + 25 = 88.',20,1],
[1102,2,'single_choice','72 - 38 = ?','["32","33","34","36"]','["34"]','medium','72 - 38 = 34.',20,2],
[1102,2,'multiple_choice','Chọn tất cả phép tính có kết quả bằng 100.','["60+40","55+45","70+30","80+25"]','["60+40","55+45","70+30"]','medium','60+40=100; 55+45=100; 70+30=100; 80+25=105.',20,3],
[1102,2,'multiple_choice','Chọn tất cả phép tính có kết quả nhỏ hơn 50.','["30+15","20+25","40+12","10+30"]','["30+15","20+25","10+30"]','medium','45<50; 45<50; 52>50; 40<50. Đáp án: 30+15, 20+25, 10+30.',20,4],
[1102,2,'matching','Nối phép tính với kết quả đúng.','["14+6","18-9","55+35","100-45"]','["20","9","90","55"]','medium','14+6=20; 18-9=9; 55+35=90; 100-45=55.',20,5],
[1102,2,'matching','Nối bài toán với phép tính.','["Có 48 cái kẹo, cho đi 23 cái. Còn lại?","Có 35 cuốn sách, mua thêm 27 cuốn. Tất cả?"]','["48-23=25","35+27=62"]','medium','Phép trừ và phép cộng.',20,6],
[1102,2,'drag_drop','Kéo thả dấu +/- vào chỗ trống: 67 ___ 24 = 43','["+","-"]','["-"]','medium','67 - 24 = 43.',20,7],
[1102,2,'table_fill','Hoàn thành bảng cộng: 35+?, 35+20=?, 35+35=?','["35+10","35+20","35+35"]','["45","55","70"]','medium','35+10=45; 35+20=55; 35+35=70.',20,8],
[1102,2,'number_line','Trên trục số 0-20, thực hiện 8+6. Bắt đầu từ 8, đếm thêm 6.','["0","5","10","14","15","20"]','["14"]','medium','8 + 6 = 14.',20,9],
[1102,2,'puzzle','Lớp 2A có 18 học sinh nữ và 17 học sinh nam. Lớp 2B có 35 học sinh. Cả hai lớp có bao nhiêu học sinh?','["68","69","70","71"]','["70"]','medium','(18+17)+35 = 35+35 = 70.',20,10],

// Ex3 hard
[1102,3,'fill_blank','___ + 38 = 75','[]','["37"]','hard','75 - 38 = 37.',30,1],
[1102,3,'fill_blank','100 - ___ = 63','[]','["37"]','hard','100 - 63 = 37.',30,2],
[1102,3,'puzzle','Buổi sáng bán được 47 chiếc bánh, buổi chiều bán thêm 36 chiếc. Bán được tất cả bao nhiêu chiếc bánh?','["73","82","83","84"]','["83"]','hard','47 + 36 = 83.',30,3],
[1102,3,'puzzle','Túi có 100 viên bi. Cho bạn A 35 viên, cho bạn B 28 viên. Còn lại bao nhiêu viên?','["35","37","38","37"]','["37"]','hard','100 - 35 - 28 = 37.',30,4],
[1102,3,'game','Trò chơi tính nhanh: Tìm hai số có tổng bằng 100, biết một số là 64.','["34","36","38","46"]','["36"]','hard','100 - 64 = 36.',30,5],
[1102,3,'sorting','Sắp xếp kết quả từ lớn đến nhỏ: 100-45, 68+15, 90-12, 47+36.','["100-45","68+15","90-12","47+36"]','["90-12=78","68+15=83","47+36=83","100-45=55"]','hard','78, 83, 83, 55. Lớn→nhỏ: 83, 83, 78, 55.',30,6],
[1102,3,'matching','Nối phép tính cộng với phép tính trừ ngược lại.','["45+28=73","62+19=81","54+37=91"]','["73-28=45","81-19=62","91-37=54"]','hard','Quan hệ cộng-trừ.',30,7],
[1102,3,'multiple_choice','Chọn tất cả phép tính có kết quả từ 80 đến 90.','["45+38","63+25","50+32","47+36"]','["45+38","63+25","47+36"]','hard','83, 88, 82, 83. Tất cả trong 80-90. Thực: 45+38=83✓; 63+25=88✓; 50+32=82✓; 47+36=83✓. Chọn tất cả.',30,8],
[1102,3,'multiple_choice','Chọn các số khi điền vào ___ làm đúng: 65 + ___ > 90.','["20","25","26","30"]','["26","30"]','hard','65+20=85<90; 65+25=90 không>; 65+26=91>90✓; 65+30=95>90✓.',30,9],
[1102,3,'drag_drop','Kéo thả để tạo phép tính đúng với các số: 48, 27, 75. (Dùng cả 3 số)','["48 + 27 = 75","75 - 27 = 48","75 - 48 = 27"]','["48 + 27 = 75","75 - 27 = 48","75 - 48 = 27"]','hard','Cả 3 phép tính đều đúng với 3 số này.',30,10],

// ===================== LESSON 1103: Ôn tập hình phẳng =====================
// Ex1 easy
[1103,1,'single_choice','Hình tròn có bao nhiêu cạnh thẳng?','["0","1","2","3"]','["0"]','easy','Hình tròn không có cạnh thẳng.',10,1],
[1103,1,'single_choice','Hình nào có 3 cạnh và 3 góc?','["Hình vuông","Hình tam giác","Hình chữ nhật","Hình tròn"]','["Hình tam giác"]','easy','Hình tam giác có 3 cạnh, 3 góc.',10,2],
[1103,1,'single_choice','Hình vuông khác hình chữ nhật ở điểm nào?','["Số cạnh","Hình vuông có 4 cạnh bằng nhau","Số góc","Màu sắc"]','["Hình vuông có 4 cạnh bằng nhau"]','easy','Hình vuông có 4 cạnh bằng nhau; hình chữ nhật chỉ có 2 cặp cạnh bằng nhau.',10,3],
[1103,1,'true_false','Hình chữ nhật có 4 góc vuông.','["Đúng","Sai"]','["Đúng"]','easy','Hình chữ nhật có 4 góc vuông.',10,4],
[1103,1,'true_false','Hình tam giác có thể có 4 cạnh.','["Đúng","Sai"]','["Sai"]','easy','Tam giác chỉ có 3 cạnh.',10,5],
[1103,1,'fill_blank','Hình vuông có ___ cạnh bằng nhau.','[]','["4"]','easy','Hình vuông có 4 cạnh bằng nhau.',10,6],
[1103,1,'fill_blank','Hình chữ nhật có ___ cặp cạnh song song và bằng nhau.','[]','["2"]','easy','2 cặp cạnh.',10,7],
[1103,1,'counting','Đếm số hình vuông trong hình vẽ ghép từ 4 ô vuông nhỏ (2×2).','["1","2","4","5"]','["5"]','easy','4 ô nhỏ + 1 hình vuông lớn = 5.',10,8],
[1103,1,'sorting','Sắp xếp hình theo số cạnh từ ít đến nhiều: Hình vuông, Hình tròn, Hình tam giác, Hình chữ nhật.','["Hình vuông","Hình tròn","Hình tam giác","Hình chữ nhật"]','["Hình tròn","Hình tam giác","Hình vuông","Hình chữ nhật"]','easy','0, 3, 4, 4 cạnh.',10,9],
[1103,1,'cross_out','Gạch bỏ hình không có góc vuông.','["Hình vuông","Hình chữ nhật","Hình tam giác vuông","Hình tròn"]','["Hình tròn"]','easy','Hình tròn không có góc vuông.',10,10],

// Ex2 medium
[1103,2,'single_choice','Một hình chữ nhật có chiều dài 12 cm và chiều rộng 5 cm. Diện tích là bao nhiêu?','["60 cm²","34 cm²","17 cm","24 cm"]','["60 cm²"]','medium','Diện tích = 12 × 5 = 60 cm².',20,1],
[1103,2,'single_choice','Hình nào không phải là tứ giác?','["Hình vuông","Hình thoi","Hình tam giác","Hình chữ nhật"]','["Hình tam giác"]','medium','Tứ giác có 4 cạnh; tam giác có 3 cạnh.',20,2],
[1103,2,'multiple_choice','Chọn tất cả hình có 4 cạnh.','["Hình vuông","Hình tam giác","Hình chữ nhật","Hình thoi","Hình tròn"]','["Hình vuông","Hình chữ nhật","Hình thoi"]','medium','Vuông, chữ nhật, thoi đều có 4 cạnh.',20,3],
[1103,2,'multiple_choice','Hình nào có tất cả các cạnh bằng nhau?','["Hình vuông","Hình chữ nhật","Hình thoi","Hình tam giác đều"]','["Hình vuông","Hình thoi","Hình tam giác đều"]','medium','Vuông, thoi, tam giác đều có tất cả cạnh bằng nhau.',20,4],
[1103,2,'matching','Nối hình với số cạnh.','["Hình tròn","Hình tam giác","Hình tứ giác","Hình ngũ giác"]','["0","3","4","5"]','medium','Tròn=0, tam giác=3, tứ giác=4, ngũ giác=5.',20,5],
[1103,2,'matching','Nối hình với tên gọi.','["Hình có 4 cạnh bằng nhau và 4 góc vuông","Hình có 4 cạnh bằng nhau nhưng không có góc vuông","Hình có 2 cặp cạnh bằng nhau và 4 góc vuông"]','["Hình vuông","Hình thoi","Hình chữ nhật"]','medium','Đặc điểm từng hình.',20,6],
[1103,2,'drag_drop','Kéo thả hình vào đúng nhóm: có góc vuông / không có góc vuông.','["Hình vuông","Hình tròn","Hình chữ nhật","Hình tam giác thường"]','["Có góc vuông: Hình vuông, Hình chữ nhật","Không có góc vuông: Hình tròn, Hình tam giác thường"]','medium','Phân loại theo góc.',20,7],
[1103,2,'table_fill','Điền số cạnh và số góc của mỗi hình: Tam giác, Vuông, Chữ nhật, Tròn.','["Tam giác: cạnh?, góc?","Vuông: cạnh?, góc?","Chữ nhật: cạnh?, góc?","Tròn: cạnh?, góc?"]','["3,3","4,4","4,4","0,0"]','medium','Đặc điểm cơ bản từng hình.',20,8],
[1103,2,'number_line','Trục số biểu diễn số cạnh (0-6). Đánh dấu số cạnh của hình ngũ giác.','["0","1","2","3","4","5","6"]','["5"]','medium','Ngũ giác có 5 cạnh.',20,9],
[1103,2,'puzzle','Ghép 2 hình tam giác giống nhau có thể tạo thành hình gì?','["Hình vuông","Hình chữ nhật","Hình tam giác lớn hơn","Tất cả đều có thể"]','["Tất cả đều có thể"]','medium','Tùy cách ghép có thể tạo hình vuông, chữ nhật hoặc tam giác.',20,10],

// Ex3 hard
[1103,3,'fill_blank','Một hình vuông có diện tích 36 cm². Cạnh của hình vuông là ___ cm.','[]','["6"]','hard','Cạnh = √36 = 6 cm.',30,1],
[1103,3,'fill_blank','Chu vi hình chữ nhật là 30 cm. Chiều rộng là 5 cm. Chiều dài là ___ cm.','[]','["10"]','hard','Chiều dài = 30÷2 - 5 = 15 - 5 = 10 cm.',30,2],
[1103,3,'puzzle','Một tờ giấy hình chữ nhật dài 20 cm, rộng 15 cm. Cắt bỏ một góc hình vuông cạnh 5 cm. Diện tích còn lại là bao nhiêu cm²?','["275","300","25","275 cm²"]','["275 cm²"]','hard','20×15 - 5×5 = 300 - 25 = 275 cm².',30,3],
[1103,3,'puzzle','Xếp các hình tam giác nhỏ (mỗi tam giác có diện tích 4 cm²) để tạo hình vuông diện tích 32 cm². Cần bao nhiêu tam giác?','["4","6","8","10"]','["8"]','hard','32 ÷ 4 = 8 tam giác.',30,4],
[1103,3,'game','Trò chơi: Hình nào có thể ghép với hình tam giác để tạo hình chữ nhật?','["Hình tròn","Hình tam giác","Hình vuông","Hình ngũ giác"]','["Hình tam giác"]','hard','2 tam giác vuông ghép lại tạo hình chữ nhật.',30,5],
[1103,3,'sorting','Sắp xếp theo diện tích từ nhỏ đến lớn: Vuông 4cm, Chữ nhật 3×5cm, Vuông 5cm, Chữ nhật 4×4cm.','["Vuông 4cm","Chữ nhật 3×5cm","Vuông 5cm","Chữ nhật 4×4cm"]','["Vuông 4cm","Chữ nhật 3×5cm","Chữ nhật 4×4cm","Vuông 5cm"]','hard','16, 15, 25, 16. Sắp: 15, 16, 16, 25.',30,6],
[1103,3,'matching','Nối hình với công thức tính diện tích.','["Hình vuông","Hình chữ nhật","Hình tam giác vuông"]','["Cạnh × Cạnh","Dài × Rộng","Đáy × Chiều cao ÷ 2"]','hard','Công thức diện tích.',30,7],
[1103,3,'multiple_choice','Hình nào có diện tích bằng 20 cm²?','["Hình vuông cạnh 4 cm","Hình chữ nhật 5×4 cm","Hình chữ nhật 10×2 cm","Hình vuông cạnh 5 cm"]','["Hình chữ nhật 5×4 cm","Hình chữ nhật 10×2 cm"]','hard','16≠20; 20=20✓; 20=20✓; 25≠20.',30,8],
[1103,3,'multiple_choice','Chọn các nhận định đúng về hình vuông.','["Có 4 cạnh bằng nhau","Có 4 góc vuông","Là trường hợp đặc biệt của hình chữ nhật","Có chu vi = 3 × cạnh"]','["Có 4 cạnh bằng nhau","Có 4 góc vuông","Là trường hợp đặc biệt của hình chữ nhật"]','hard','Ba nhận định đầu đúng; chu vi = 4 × cạnh.',30,9],
[1103,3,'drag_drop','Kéo thả để hoàn thành: Hình chữ nhật dài 8 cm, rộng ? cm, diện tích 40 cm². Rộng = ___ cm.','["4","5","6","8"]','["5"]','hard','Rộng = 40 ÷ 8 = 5 cm.',30,10],

// ===================== LESSON 1104: Ôn tập đo lường =====================
// Ex1 easy
[1104,1,'single_choice','1 kg = ? g','["10 g","100 g","1000 g","10000 g"]','["1000 g"]','easy','1 kg = 1000 g.',10,1],
[1104,1,'single_choice','1 m = ? cm','["10 cm","100 cm","1000 cm","10 cm"]','["100 cm"]','easy','1 m = 100 cm.',10,2],
[1104,1,'single_choice','1 dm = ? cm','["1 cm","5 cm","10 cm","100 cm"]','["10 cm"]','easy','1 dm = 10 cm.',10,3],
[1104,1,'true_false','2 kg > 1500 g','["Đúng","Sai"]','["Đúng"]','easy','2 kg = 2000 g > 1500 g.',10,4],
[1104,1,'true_false','1 L = 100 mL','["Đúng","Sai"]','["Sai"]','easy','1 L = 1000 mL.',10,5],
[1104,1,'fill_blank','3 m = ___ cm','[]','["300"]','easy','3 × 100 = 300 cm.',10,6],
[1104,1,'fill_blank','500 g + 500 g = ___ kg','[]','["1"]','easy','500 + 500 = 1000 g = 1 kg.',10,7],
[1104,1,'counting','Một túi gạo nặng 5 kg. Có 3 túi gạo như vậy. Tổng cộng bao nhiêu kg?','["10","12","15","20"]','["15"]','easy','5 × 3 = 15 kg.',10,8],
[1104,1,'sorting','Sắp xếp từ ngắn đến dài: 1 m, 50 cm, 2 dm, 150 cm.','["1 m","50 cm","2 dm","150 cm"]','["2 dm","50 cm","1 m","150 cm"]','easy','20 cm, 50 cm, 100 cm, 150 cm.',10,9],
[1104,1,'cross_out','Gạch bỏ đơn vị không phải đơn vị đo độ dài.','["cm","dm","kg","m"]','["kg"]','easy','kg là đơn vị đo khối lượng.',10,10],

// Ex2 medium
[1104,2,'single_choice','Một bình chứa 3 L nước. Đổ ra 1500 mL. Còn lại bao nhiêu mL?','["1500 mL","2000 mL","1000 mL","500 mL"]','["1500 mL"]','medium','3000 - 1500 = 1500 mL.',20,1],
[1104,2,'single_choice','Chiều cao của Nam là 1 m 25 cm. Chiều cao của An là 130 cm. Ai cao hơn?','["Nam","An","Bằng nhau","Không xác định được"]','["An"]','medium','Nam = 125 cm; An = 130 cm. An cao hơn.',20,2],
[1104,2,'multiple_choice','Chọn tất cả đơn vị đo khối lượng.','["kg","L","g","dm","tấn"]','["kg","g","tấn"]','medium','kg, g, tấn là đơn vị khối lượng.',20,3],
[1104,2,'multiple_choice','Chọn các phép đổi đúng.','["1 m = 100 cm","1 kg = 100 g","1 dm = 10 cm","1 L = 1000 mL"]','["1 m = 100 cm","1 dm = 10 cm","1 L = 1000 mL"]','medium','1 kg = 1000 g (không phải 100 g).',20,4],
[1104,2,'matching','Nối đại lượng với đơn vị đo phù hợp.','["Chiều dài bàn học","Khối lượng quyển sách","Lượng nước bình uống","Chiều cao tòa nhà"]','["dm hoặc cm","g","mL hoặc L","m"]','medium','Đơn vị phù hợp với từng đại lượng.',20,5],
[1104,2,'matching','Nối các đơn vị bằng nhau.','["100 cm","1000 g","10 dm","1000 mL"]','["1 m","1 kg","1 m","1 L"]','medium','Quy đổi đơn vị.',20,6],
[1104,2,'drag_drop','Kéo thả đơn vị phù hợp: Cân nặng của em bé sơ sinh: 3 ___.','["g","kg","L","cm"]','["kg"]','medium','Em bé sơ sinh nặng khoảng 3 kg.',20,7],
[1104,2,'table_fill','Điền vào bảng quy đổi: 1 m = ? dm; 1 m = ? cm; 1 dm = ? cm.','["1 m = ? dm","1 m = ? cm","1 dm = ? cm"]','["10","100","10"]','medium','Bảng đơn vị đo dài.',20,8],
[1104,2,'number_line','Trên thước dài 1 m (100 cm), đánh dấu vị trí 65 cm.','["0","20","40","60","65","80","100"]','["65"]','medium','65 cm nằm giữa 60 và 70.',20,9],
[1104,2,'puzzle','Mẹ mua 2 kg táo và 1500 g cam. Tổng khối lượng trái cây là bao nhiêu gam?','["3000 g","3500 g","2500 g","4000 g"]','["3500 g"]','medium','2000 + 1500 = 3500 g.',20,10],

// Ex3 hard
[1104,3,'fill_blank','5 km = ___ m','[]','["5000"]','hard','1 km = 1000 m; 5 km = 5000 m.',30,1],
[1104,3,'fill_blank','2 tấn 500 kg = ___ kg','[]','["2500"]','hard','2 tấn = 2000 kg; 2000 + 500 = 2500 kg.',30,2],
[1104,3,'puzzle','Thùng A chứa 15 L nước. Thùng B chứa ít hơn thùng A 3 L. Thùng C chứa gấp đôi thùng B. Tổng ba thùng chứa bao nhiêu lít?','["51","54","57","60"]','["51"]','hard','B=12; C=24; A+B+C=15+12+24=51 L.',30,3],
[1104,3,'puzzle','Lan cao 1 m 25 cm. Mỗi năm Lan cao thêm 5 cm. Sau 3 năm Lan cao bao nhiêu cm?','["130 cm","135 cm","140 cm","145 cm"]','["140 cm"]','hard','125 + 5×3 = 125 + 15 = 140 cm.',30,4],
[1104,3,'game','Trò chơi: Ai đúng? A nói: 2 kg 500 g = 2500 g. B nói: 3 L 200 mL = 3020 mL.','["Chỉ A đúng","Chỉ B đúng","Cả hai đúng","Cả hai sai"]','["Chỉ A đúng"]','hard','A: 2000+500=2500✓; B: 3000+200=3200≠3020.',30,5],
[1104,3,'sorting','Sắp xếp từ nhẹ đến nặng: 1 kg 200 g, 900 g, 1500 g, 1 kg.','["1 kg 200 g","900 g","1500 g","1 kg"]','["900 g","1 kg","1 kg 200 g","1500 g"]','hard','900, 1000, 1200, 1500 g.',30,6],
[1104,3,'matching','Nối đơn vị lớn hơn với đơn vị nhỏ hơn.','["1 km","1 m","1 kg","1 L"]','["1000 m","100 cm","1000 g","1000 mL"]','hard','Quy đổi đơn vị lớn sang nhỏ.',30,7],
[1104,3,'multiple_choice','Chọn tất cả phép đổi đúng.','["2 m 50 cm = 250 cm","3 kg 200 g = 3200 g","1 dm 5 cm = 15 cm","4 L 500 mL = 4050 mL"]','["2 m 50 cm = 250 cm","3 kg 200 g = 3200 g","1 dm 5 cm = 15 cm"]','hard','200+50=250✓; 3000+200=3200✓; 10+5=15✓; 4000+500=4500≠4050.',30,8],
[1104,3,'multiple_choice','Các đơn vị nào lớn hơn cm?','["mm","dm","m","km"]','["dm","m","km"]','hard','dm>cm; m>cm; km>cm; mm<cm.',30,9],
[1104,3,'drag_drop','Kéo thả để hoàn thành: Bể cá hình chữ nhật dài 80 cm, rộng 40 cm. Chu vi bể là ___ cm.','["120","160","240","320"]','["240"]','hard','(80+40)×2 = 240 cm.',30,10],

// ===================== LESSON 1105: Ôn tập chung HK1 =====================
// Ex1 easy
[1105,1,'single_choice','35 + 47 = ?','["72","82","83","81"]','["82"]','easy','35 + 47 = 82.',10,1],
[1105,1,'single_choice','Hình chữ nhật có bao nhiêu góc vuông?','["2","3","4","5"]','["4"]','easy','Hình chữ nhật có 4 góc vuông.',10,2],
[1105,1,'single_choice','1 tuần = ? ngày','["5","6","7","8"]','["7"]','easy','1 tuần = 7 ngày.',10,3],
[1105,1,'true_false','90 - 45 = 45','["Đúng","Sai"]','["Đúng"]','easy','90 - 45 = 45.',10,4],
[1105,1,'true_false','Tháng 8 có 30 ngày.','["Đúng","Sai"]','["Sai"]','easy','Tháng 8 có 31 ngày.',10,5],
[1105,1,'fill_blank','1 m = ___ dm','[]','["10"]','easy','1 m = 10 dm.',10,6],
[1105,1,'fill_blank','Hình vuông có chu vi 24 cm thì cạnh dài ___ cm.','[]','["6"]','easy','Cạnh = 24 ÷ 4 = 6 cm.',10,7],
[1105,1,'counting','Đếm số hình tam giác trong hình ghép từ 8 tam giác nhỏ.','["4","6","8","10"]','["8"]','easy','Có 8 hình tam giác nhỏ.',10,8],
[1105,1,'sorting','Sắp xếp từ nhỏ đến lớn: 76, 67, 87, 78.','["76","67","87","78"]','["67","76","78","87"]','easy','67<76<78<87.',10,9],
[1105,1,'cross_out','Gạch bỏ số không phải số tròn chục.','["10","25","40","70"]','["25"]','easy','25 không phải số tròn chục.',10,10],

// Ex2 medium
[1105,2,'single_choice','Chu vi hình chữ nhật dài 9 cm, rộng 4 cm là bao nhiêu?','["13 cm","26 cm","36 cm","18 cm"]','["26 cm"]','medium','(9+4)×2 = 26 cm.',20,1],
[1105,2,'single_choice','Tháng 10 năm nay bắt đầu vào thứ Hai. Ngày 21 tháng 10 là thứ mấy?','["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm"]','["Thứ Hai"]','medium','21 - 1 = 20 ngày; 20 ÷ 7 = 2 tuần đúng; 1/10=Hai → 21/10=Hai.',20,2],
[1105,2,'multiple_choice','Chọn tất cả phép tính có kết quả bằng 50.','["25+25","80-30","60-10","35+15"]','["25+25","80-30","60-10","35+15"]','medium','Tất cả đều = 50.',20,3],
[1105,2,'multiple_choice','Hình nào có chu vi bằng 20 cm?','["Hình vuông cạnh 5 cm","Hình chữ nhật 6×4 cm","Hình chữ nhật 7×3 cm","Hình vuông cạnh 4 cm"]','["Hình vuông cạnh 5 cm","Hình chữ nhật 7×3 cm"]','medium','20=20✓; 20=20✓; 20=20✓; 16≠20. Thực: 4×5=20✓; (6+4)×2=20✓; (7+3)×2=20✓; 4×4=16.',20,4],
[1105,2,'matching','Nối mỗi bài toán với phép tính đúng.','["Hộp có 45 bút, thêm 28 bút. Tổng?","Rổ có 60 quả, lấy ra 35 quả. Còn?","Lớp 36 học sinh, nghỉ 4 người. Có mặt?"]','["45+28=73","60-35=25","36-4=32"]','medium','Cộng/trừ theo bài toán.',20,5],
[1105,2,'matching','Nối đơn vị đo với vật đo phù hợp.','["Đo chiều cao bức tường","Đo khối lượng túi gạo","Đo lượng nước chai","Đo chiều dài cây bút"]','["m","kg","mL","cm"]','medium','Đơn vị phù hợp.',20,6],
[1105,2,'drag_drop','Kéo thả điền vào chỗ trống: Lan có ___ quyển vở, mua thêm 15 quyển, tổng là 38 quyển. Lan có ___ quyển ban đầu.','["23","38","15","53"]','["23"]','hard','38 - 15 = 23 quyển.',20,7],
[1105,2,'table_fill','Hoàn thành bảng: Hình vuông cạnh 3,4,5 cm → chu vi = ?','["Cạnh 3 cm","Cạnh 4 cm","Cạnh 5 cm"]','["12 cm","16 cm","20 cm"]','medium','Chu vi = 4 × cạnh.',20,8],
[1105,2,'number_line','Trên trục số 0-100, thực hiện phép tính 58+24. Kết quả là?','["72","82","78","84"]','["82"]','medium','58 + 24 = 82.',20,9],
[1105,2,'puzzle','Lớp học có 35 học sinh. Số học sinh nữ nhiều hơn số học sinh nam 5 bạn. Có bao nhiêu học sinh nữ và nam?','["Nữ 20, nam 15","Nữ 18, nam 17","Nữ 22, nam 13","Nữ 25, nam 10"]','["Nữ 20, nam 15"]','medium','n+f=35; f-n=5 → f=20, n=15.',20,10],

// Ex3 hard
[1105,3,'fill_blank','Một kho có 100 tấn gạo. Xuất đi 35 tấn rồi nhập thêm 48 tấn. Kho có ___ tấn gạo.','[]','["113"]','hard','100 - 35 + 48 = 113 tấn.',30,1],
[1105,3,'fill_blank','Hình chữ nhật có chu vi 34 cm. Chiều dài hơn chiều rộng 5 cm. Chiều dài là ___ cm.','[]','["11"]','hard','2(d+r)=34 → d+r=17; d-r=5 → d=11, r=6.',30,2],
[1105,3,'puzzle','Bạn Hoa đọc sách: tuần 1 đọc 15 trang, tuần 2 đọc nhiều hơn tuần 1 là 8 trang, tuần 3 đọc ít hơn tuần 2 là 5 trang. Tổng số trang Hoa đọc trong 3 tuần là bao nhiêu?','["56","58","60","62"]','["56"]','hard','T1=15; T2=23; T3=18; Tổng=56.',30,3],
[1105,3,'puzzle','Vườn hình chữ nhật dài 25 m, rộng 15 m. Người ta làm hàng rào xung quanh, cứ 2 m cắm 1 cọc. Cần bao nhiêu cọc?','["40","41","80","81"]','["80"]','hard','Chu vi = (25+15)×2 = 80 m; 80÷2 = 40 khoảng → 40 cọc (hình chữ nhật khép kín).',30,4],
[1105,3,'game','Trò chơi tổng hợp: Ngày 1 tháng 9 là thứ Sáu. Lớp học 5 ngày/tuần (Hai-Sáu). Tuần đầu tháng 9 có bao nhiêu ngày học?','["1","2","3","4"]','["1"]','hard','1/9=Sáu, chỉ có ngày Sáu trong tuần đó.',30,5],
[1105,3,'sorting','Sắp xếp từ lớn đến nhỏ: 3 dm, 25 cm, 1 m, 8 dm.','["3 dm","25 cm","1 m","8 dm"]','["1 m","8 dm","3 dm","25 cm"]','hard','100, 80, 30, 25 cm.',30,6],
[1105,3,'matching','Nối kiến thức với ví dụ tương ứng.','["Phép cộng có nhớ","Đơn vị đo thể tích","Hình có 3 góc","Đọc giờ trên đồng hồ"]','["47+36=83","lít (L)","Hình tam giác","Kim ngắn ở 8, kim dài ở 12 = 8 giờ"]','hard','Ôn tổng hợp HK1.',30,7],
[1105,3,'multiple_choice','Chọn tất cả nhận định đúng.','["Hình vuông là hình chữ nhật đặc biệt","Tháng 2 luôn có 28 ngày","1 m = 10 dm","Chu vi hình vuông = 4 × cạnh"]','["Hình vuông là hình chữ nhật đặc biệt","1 m = 10 dm","Chu vi hình vuông = 4 × cạnh"]','hard','Năm nhuận tháng 2 có 29 ngày nên không phải luôn luôn 28.',30,8],
[1105,3,'multiple_choice','Chọn các bài toán có đáp án là 45.','["90÷2","100-55","23+22","60-15"]','["90÷2","100-55","60-15"]','hard','45=45✓; 45✓; 45✓; 45✓. Thực: 90÷2=45✓; 100-55=45✓; 23+22=45✓; 60-15=45✓. Tất cả đúng.',30,9],
[1105,3,'drag_drop','Kéo thả để hoàn thành bài toán: Bình phương cạnh 7 cm có chu vi ___ cm và diện tích ___ cm².','["28","49","14","56"]','["28","49"]','hard','Chu vi=4×7=28; Diện tích=7×7=49.',30,10],
];

async function main() {
  const conn = await mysql.createConnection(DB);
  const lessonIds = [1102,1103,1104,1105];
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
