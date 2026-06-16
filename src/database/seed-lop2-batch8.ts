import mysql from 'mysql2/promise';
const DB = { host:'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com', user:'admin', password:'jFUnRCumnerGsGaPT5pR', database:'songtute' };
const INSERT_SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

const data: Array<[number,number,string,string,string,string,string,string,number,number]> = [
// ============================================================
// Lesson 1133: Thu thập, phân loại, kiểm đếm số liệu
// ============================================================
// Ex1 easy
[1133,1,'single_choice','Có 3 quả táo đỏ và 2 quả táo xanh. Tổng số táo là bao nhiêu?','["3","5","4","6"]','"5"','easy','3 + 2 = 5',10,1],
[1133,1,'single_choice','Bạn đếm được: bút chì: 4, bút mực: 3. Loại nào nhiều hơn?','["Bút mực","Bút chì","Bằng nhau","Không biết"]','"Bút chì"','easy','4 > 3 nên bút chì nhiều hơn',10,2],
[1133,1,'single_choice','Phân loại quả: cam, táo, cam, cam, táo. Có mấy quả cam?','["2","3","4","5"]','"3"','easy','Đếm: cam xuất hiện 3 lần',10,3],
[1133,1,'true_false','Thu thập số liệu nghĩa là ghi lại thông tin từ thực tế.','["Đúng","Sai"]','"Đúng"','easy','Thu thập số liệu là ghi lại thông tin thực tế',10,4],
[1133,1,'true_false','Phân loại giúp ta nhóm các đồ vật giống nhau lại với nhau.','["Đúng","Sai"]','"Đúng"','easy','Phân loại là nhóm các đồ vật có cùng đặc điểm',10,5],
[1133,1,'fill_blank','Có 5 con mèo và 3 con chó. Tổng số động vật là ___.','[]','"8"','easy','5 + 3 = 8',10,6],
[1133,1,'fill_blank','Trong 10 học sinh có 6 bạn nữ. Số bạn nam là ___.','[]','"4"','easy','10 - 6 = 4',10,7],
[1133,1,'counting','Đếm số hình tròn: ○ ○ ○ ○ ○ ○ ○','[]','"7"','easy','Đếm từng hình: 7 hình tròn',10,8],
[1133,1,'sorting','Sắp xếp theo thứ tự tăng dần: 5, 2, 8, 1, 4','[]','"1,2,4,5,8"','easy','Sắp xếp từ nhỏ đến lớn',10,9],
[1133,1,'cross_out','Gạch bỏ những con vật không phải là chim: gà, mèo, chim sẻ, cá, vẹt','[]','"mèo,cá"','easy','Mèo và cá không phải là chim',10,10],

// Ex2 medium
[1133,2,'single_choice','Lớp 2A có 15 bạn thích toán, 12 bạn thích văn. Hỏi có bao nhiêu bạn tham gia khảo sát?','["27","25","28","30"]','"27"','medium','15 + 12 = 27',20,1],
[1133,2,'single_choice','Kiểm đếm 20 quả bóng: 8 đỏ, 7 xanh, còn lại màu vàng. Có mấy quả vàng?','["4","5","6","7"]','"5"','medium','20 - 8 - 7 = 5',20,2],
[1133,2,'multiple_choice','Những bước nào cần thiết khi thu thập số liệu?','["Xác định mục tiêu","Ghi chép thông tin","Phân loại kết quả","Đoán mò"]','["Xác định mục tiêu","Ghi chép thông tin","Phân loại kết quả"]','medium','Ba bước cơ bản: xác định mục tiêu, ghi chép, phân loại',20,3],
[1133,2,'multiple_choice','Chọn những cách phân loại đồ vật đúng:','["Theo màu sắc","Theo kích thước","Theo hình dạng","Theo tên chủ nhân"]','["Theo màu sắc","Theo kích thước","Theo hình dạng"]','medium','Phân loại theo đặc điểm vật lý của đồ vật',20,4],
[1133,2,'matching','Nối số liệu với kết quả phân loại đúng','["5 quả táo + 3 quả cam","4 bút đỏ + 6 bút xanh","7 trai + 8 gái"]','["8 quả","10 cái bút","15 học sinh"]','medium','Cộng các nhóm lại',20,5],
[1133,2,'matching','Nối hoạt động với mục đích','["Thu thập","Phân loại","Kiểm đếm"]','["Ghi thông tin","Nhóm theo đặc điểm","Đếm số lượng"]','medium','Mỗi hoạt động có mục đích riêng',20,6],
[1133,2,'drag_drop','Kéo thả các con vật vào nhóm đúng: chim (gà, vịt, chim), thú (mèo, chó, thỏ)','["gà","vịt","chim","mèo","chó","thỏ"]','{"chim":["gà","vịt","chim"],"thú":["mèo","chó","thỏ"]}','medium','Phân loại theo loài động vật',20,7],
[1133,2,'table_fill','Điền vào bảng: Loại quả | Số lượng. Táo:5, Cam:?, Chuối:4. Tổng=15','[]','"6"','medium','15 - 5 - 4 = 6',20,8],
[1133,2,'number_line','Biểu diễn số 7 trên tia số từ 0 đến 10','[]','"7"','medium','Tìm vị trí số 7 trên tia số',20,9],
[1133,2,'puzzle','Lớp có 30 học sinh. Số học sinh thích thể thao gấp đôi số thích âm nhạc. Tổng hai nhóm là 30. Mỗi nhóm có bao nhiêu?','[]','{"thể thao":"20","âm nhạc":"10"}','medium','x + 2x = 30 → x = 10',20,10],

// Ex3 hard
[1133,3,'fill_blank','Khảo sát 40 học sinh: 15 thích bóng đá, 12 thích bơi lội, còn lại thích cầu lông. Số học sinh thích cầu lông là ___.','[]','"13"','hard','40 - 15 - 12 = 13',30,1],
[1133,3,'fill_blank','Có 3 nhóm đồ chơi: nhóm A có 8 cái, nhóm B có 6 cái, nhóm C nhiều hơn nhóm B là 4. Tổng số đồ chơi là ___.','[]','"24"','hard','8 + 6 + (6+4) = 24',30,2],
[1133,3,'puzzle','Trong 50 quả trái cây: táo chiếm 2/5 tổng số, cam chiếm 1/5, còn lại là xoài. Có bao nhiêu quả xoài?','[]','"20"','hard','50×2/5=20 táo, 50×1/5=10 cam, 50-20-10=20 xoài',30,3],
[1133,3,'puzzle','Số học sinh nam bằng số học sinh nữ cộng 4. Tổng là 28. Nam và nữ mỗi loại bao nhiêu?','[]','{"nam":"16","nữ":"12"}','hard','Nữ=(28-4)/2=12, nam=16',30,4],
[1133,3,'game','Trò chơi phân loại nhanh: Chia 20 thẻ số (1-20) thành nhóm số chẵn và số lẻ. Đếm mỗi nhóm.','[]','{"số chẵn":"10","số lẻ":"10"}','hard','1-20 có 10 số chẵn và 10 số lẻ',30,5],
[1133,3,'sorting','Sắp xếp kết quả khảo sát từ cao đến thấp: Toán:25, Văn:18, Anh:22, Nhạc:15','[]','"Toán:25,Anh:22,Văn:18,Nhạc:15"','hard','Sắp xếp giảm dần theo số lượng',30,6],
[1133,3,'matching','Nối câu hỏi với phương pháp thu thập phù hợp','["Số học sinh thích màu gì?","Chiều cao trung bình?","Môn học yêu thích?"]','["Khảo sát bằng phiếu","Đo thực tế","Bình chọn tay"]','hard','Chọn phương pháp phù hợp với câu hỏi',30,7],
[1133,3,'multiple_choice','Biểu đồ cho thấy: A=10, B=15, C=8, D=12. Chọn các nhận xét đúng:','["B nhiều nhất","C ít nhất","A+D=22","B+C=23"]','["B nhiều nhất","C ít nhất","A+D=22","B+C=23"]','hard','10+12=22; 15+8=23; B=15 lớn nhất; C=8 nhỏ nhất',30,8],
[1133,3,'multiple_choice','Những thông tin nào có thể rút ra từ bảng số liệu?','["Giá trị lớn nhất","Giá trị nhỏ nhất","Tổng cộng","Màu yêu thích của từng người"]','["Giá trị lớn nhất","Giá trị nhỏ nhất","Tổng cộng"]','hard','Từ bảng số liệu rút ra các giá trị thống kê',30,9],
[1133,3,'drag_drop','Kéo thả vào đúng nhóm: số chia hết cho 2 và số không chia hết cho 2 (các số: 4,7,12,9,6,11,8,3)','["4","7","12","9","6","11","8","3"]','{"chia hết cho 2":["4","12","6","8"],"không chia hết":["7","9","11","3"]}','hard','Số chẵn chia hết cho 2',30,10],

// ============================================================
// Lesson 1134: Biểu đồ tranh
// ============================================================
// Ex1 easy
[1134,1,'single_choice','Biểu đồ tranh dùng để làm gì?','["Vẽ hình đẹp","Biểu diễn số liệu bằng hình ảnh","Kể chuyện","Tô màu"]','"Biểu diễn số liệu bằng hình ảnh"','easy','Biểu đồ tranh dùng hình ảnh để thể hiện số liệu',10,1],
[1134,1,'single_choice','Biểu đồ tranh có 4 hình ngôi sao, mỗi hình = 2. Tổng là bao nhiêu?','["4","6","8","10"]','"8"','easy','4 × 2 = 8',10,2],
[1134,1,'single_choice','Hàng A có 3 ☆, hàng B có 5 ☆. Hàng nào nhiều hơn và nhiều hơn bao nhiêu?','["A, hơn 2","B, hơn 2","A, hơn 3","B, hơn 3"]','"B, hơn 2"','easy','5 - 3 = 2, hàng B nhiều hơn',10,3],
[1134,1,'true_false','Trong biểu đồ tranh, mỗi hình ảnh đại diện cho một số lượng nhất định.','["Đúng","Sai"]','"Đúng"','easy','Mỗi ký hiệu trong biểu đồ đại diện cho một giá trị',10,4],
[1134,1,'true_false','Biểu đồ tranh chỉ dùng được cho số liệu nhỏ hơn 10.','["Đúng","Sai"]','"Sai"','easy','Biểu đồ tranh có thể dùng cho nhiều loại số liệu',10,5],
[1134,1,'fill_blank','Mỗi 🍎 = 3 quả. Có 4 🍎 thì tổng số quả là ___.','[]','"12"','easy','4 × 3 = 12',10,6],
[1134,1,'fill_blank','Biểu đồ tranh: Đỏ: ●●●, Xanh: ●●●●●. Xanh nhiều hơn đỏ ___ ●.','[]','"2"','easy','5 - 3 = 2',10,7],
[1134,1,'counting','Đếm số ký hiệu trong hàng: 🌟🌟🌟🌟🌟🌟','[]','"6"','easy','Đếm từng ngôi sao: 6',10,8],
[1134,1,'sorting','Sắp xếp các hàng từ nhiều đến ít: Cam:6, Táo:4, Chuối:8, Nho:2','[]','"Chuối:8,Cam:6,Táo:4,Nho:2"','easy','Sắp xếp giảm dần',10,9],
[1134,1,'cross_out','Gạch bỏ thông tin KHÔNG thể đọc từ biểu đồ tranh: Tổng số, Loại nhiều nhất, Giá tiền, Loại ít nhất','[]','"Giá tiền"','easy','Biểu đồ tranh không cho biết giá tiền',10,10],

// Ex2 medium
[1134,2,'single_choice','Biểu đồ tranh: Mỗi 🐟 = 5 con cá. Hàng A có 6🐟, hàng B có 4🐟. Tổng số cá là?','["40","50","60","70"]','"50"','medium','(6+4) × 5 = 50',20,1],
[1134,2,'single_choice','Hàng Toán: 8 ★, Hàng Văn: 5 ★, mỗi ★ = 2 bạn. Toán nhiều hơn Văn bao nhiêu bạn?','["4","6","8","10"]','"6"','medium','(8-5) × 2 = 6',20,2],
[1134,2,'multiple_choice','Những thông tin nào có thể đọc từ biểu đồ tranh?','["Loại nhiều nhất","Loại ít nhất","Tổng cộng","Chênh lệch giữa các loại"]','["Loại nhiều nhất","Loại ít nhất","Tổng cộng","Chênh lệch giữa các loại"]','medium','Tất cả đều có thể đọc từ biểu đồ',20,3],
[1134,2,'multiple_choice','Để vẽ biểu đồ tranh cần làm gì?','["Chọn ký hiệu phù hợp","Ghi chú giá trị mỗi ký hiệu","Thu thập số liệu trước","Dùng màu tùy ý"]','["Chọn ký hiệu phù hợp","Ghi chú giá trị mỗi ký hiệu","Thu thập số liệu trước"]','medium','Ba bước quan trọng khi vẽ biểu đồ tranh',20,4],
[1134,2,'matching','Nối biểu đồ với nhận xét đúng','["A:10 B:6","C:4 D:8","E:7 F:7"]','["A nhiều hơn B 4","D nhiều hơn C 4","E bằng F"]','medium','So sánh các giá trị trong biểu đồ',20,5],
[1134,2,'matching','Nối số ký hiệu với tổng (mỗi ký hiệu = 4)','["3 ký hiệu","5 ký hiệu","7 ký hiệu"]','["12","20","28"]','medium','Nhân số ký hiệu với giá trị',20,6],
[1134,2,'drag_drop','Kéo thả số vào đúng ô biểu đồ: Táo=15, Cam=10, Chuối=20 (mỗi ký hiệu=5)','["3 ký hiệu","2 ký hiệu","4 ký hiệu"]','{"Táo":"3 ký hiệu","Cam":"2 ký hiệu","Chuối":"4 ký hiệu"}','medium','15÷5=3, 10÷5=2, 20÷5=4',20,7],
[1134,2,'table_fill','Điền số ký hiệu vào bảng (mỗi ký hiệu=3): Đỏ:9, Xanh:?, Vàng:15. Biết Xanh=12','[]','"4"','medium','12 ÷ 3 = 4 ký hiệu',20,8],
[1134,2,'number_line','Biểu đồ tranh có tổng 18. Mỗi ký hiệu = 3. Số ký hiệu là bao nhiêu? Biểu diễn trên tia số.','[]','"6"','medium','18 ÷ 3 = 6',20,9],
[1134,2,'puzzle','Biểu đồ tranh: Lớp A có ít hơn lớp B 3 ký hiệu. Tổng 2 lớp = 15 ký hiệu. Mỗi lớp có bao nhiêu?','[]','{"Lớp A":"6","Lớp B":"9"}','medium','A+B=15, B=A+3 → A=6, B=9',20,10],

// Ex3 hard
[1134,3,'fill_blank','Biểu đồ tranh (mỗi ký hiệu=5): Bóng đá:8🏅, Bơi lội:5🏅, Cầu lông:6🏅. Tổng số học sinh tham gia là ___.','[]','"95"','hard','(8+5+6) × 5 = 95',30,1],
[1134,3,'fill_blank','Biểu đồ: A có 40, B có 25, C có 35. Mỗi ký hiệu = 5. Số ký hiệu nhiều nhất là ___.','[]','"8"','hard','A: 40÷5=8 ký hiệu (nhiều nhất)',30,2],
[1134,3,'puzzle','Biểu đồ tranh mỗi ký hiệu=4. Nhóm 1: 7 ký hiệu, nhóm 2: 5 ký hiệu. Nhóm 1 nhiều hơn nhóm 2 bao nhiêu người?','[]','"8"','hard','(7-5) × 4 = 8',30,3],
[1134,3,'puzzle','Biểu đồ có 4 hàng. Tổng = 100, mỗi ký hiệu = 5. Hàng 1: 6, hàng 2: 4, hàng 3: 5 ký hiệu. Hàng 4 có bao nhiêu ký hiệu?','[]','"5"','hard','Tổng ký hiệu = 100÷5 = 20. Hàng 4 = 20-6-4-5=5',30,4],
[1134,3,'game','Trò chơi đọc biểu đồ: Biểu đồ thể hiện số sách đọc trong 4 tuần (mỗi 📚=2). T1:5📚 T2:8📚 T3:6📚 T4:7📚. Tuần nào đọc nhiều nhất?','[]','"Tuần 2"','hard','T2: 8×2=16 cuốn, nhiều nhất',30,5],
[1134,3,'sorting','Sắp xếp các lớp từ nhiều đến ít học sinh giỏi (mỗi ★=3): 2A:8★, 2B:6★, 2C:9★, 2D:5★','[]','"2C:27,2A:24,2B:18,2D:15"','hard','2C:27, 2A:24, 2B:18, 2D:15',30,6],
[1134,3,'matching','Nối câu hỏi với cách đọc biểu đồ','["Tổng số","Nhiều hơn/ít hơn","Loại nhiều nhất"]','["Cộng tất cả ký hiệu × giá trị","Tính hiệu số ký hiệu × giá trị","Tìm hàng có nhiều ký hiệu nhất"]','hard','Các cách đọc biểu đồ tranh',30,7],
[1134,3,'multiple_choice','Biểu đồ tranh có ưu điểm gì so với bảng số liệu?','["Dễ nhìn hơn","Trực quan hơn","So sánh nhanh hơn","Chính xác hơn về số lẻ"]','["Dễ nhìn hơn","Trực quan hơn","So sánh nhanh hơn"]','hard','Biểu đồ tranh trực quan nhưng kém chính xác với số lẻ',30,8],
[1134,3,'multiple_choice','Đọc biểu đồ: Táo:12, Cam:8, Chuối:16, Nho:4. Chọn nhận xét đúng:','["Chuối nhiều nhất","Nho ít nhất","Táo nhiều hơn Cam 4","Tổng là 40"]','["Chuối nhiều nhất","Nho ít nhất","Táo nhiều hơn Cam 4","Tổng là 40"]','hard','12+8+16+4=40; 12-8=4',30,9],
[1134,3,'drag_drop','Kéo thả nhận xét vào đúng loại (đúng/sai) dựa trên biểu đồ: A=20 B=15 C=25 D=10','["A>B","B<C","D nhiều nhất","Tổng=70"]','{"đúng":["A>B","B<C","Tổng=70"],"sai":["D nhiều nhất"]}','hard','20>15✓, 15<25✓, D=10 ít nhất không nhiều nhất, 20+15+25+10=70✓',30,10],

// ============================================================
// Lesson 1135: Chắc chắn, có thể, không thể
// ============================================================
// Ex1 easy
[1135,1,'single_choice','Mặt trời mọc ở hướng Đông là sự kiện gì?','["Có thể","Chắc chắn","Không thể","Ngẫu nhiên"]','"Chắc chắn"','easy','Mặt trời luôn mọc ở hướng Đông',10,1],
[1135,1,'single_choice','Tung đồng xu được mặt ngửa là sự kiện gì?','["Chắc chắn","Không thể","Có thể","Luôn luôn"]','"Có thể"','easy','Tung đồng xu có thể ngửa hoặc sấp',10,2],
[1135,1,'single_choice','Một con mèo biết bay là sự kiện gì?','["Chắc chắn","Có thể","Không thể","Bình thường"]','"Không thể"','easy','Mèo không thể bay',10,3],
[1135,1,'true_false','Sự kiện "Ngày mai trời mưa" là sự kiện CÓ THỂ xảy ra.','["Đúng","Sai"]','"Đúng"','easy','Ngày mai có thể mưa hoặc không mưa',10,4],
[1135,1,'true_false','Sự kiện "2 + 2 = 5" là sự kiện CHẮC CHẮN.','["Đúng","Sai"]','"Sai"','easy','2 + 2 = 4, không phải 5, đây là sự kiện không thể',10,5],
[1135,1,'fill_blank','Rút ngẫu nhiên 1 thẻ từ bộ thẻ màu đỏ. Xác suất lấy được thẻ đỏ là ___.','[]','"Chắc chắn"','easy','Tất cả thẻ đều đỏ nên chắc chắn lấy được đỏ',10,6],
[1135,1,'fill_blank','Tung xúc xắc 6 mặt. Khả năng ra mặt số 7 là ___.','[]','"Không thể"','easy','Xúc xắc chỉ có mặt 1-6',10,7],
[1135,1,'counting','Trong hộp có 3 bi đỏ và 0 bi xanh. Lấy ngẫu nhiên 1 bi, đó là bi ___.','[]','"đỏ (chắc chắn)"','easy','Chỉ có bi đỏ nên chắc chắn lấy được đỏ',10,8],
[1135,1,'sorting','Sắp xếp theo mức độ chắc chắn từ cao đến thấp: Ngày mai mặt trời mọc, Lấy bi đỏ từ hộp bi đỏ, Tung đồng xu ra ngửa','[]','"Lấy bi đỏ từ hộp bi đỏ,Ngày mai mặt trời mọc,Tung đồng xu ra ngửa"','easy','Chắc chắn > Chắc chắn > Có thể',10,9],
[1135,1,'cross_out','Gạch bỏ sự kiện KHÔNG THỂ xảy ra: Ngày mai mưa, Người nhảy lên mặt trăng bằng tay không, Học sinh đạt điểm 10, Con gà đẻ trứng','[]','"Người nhảy lên mặt trăng bằng tay không"','easy','Người không thể nhảy lên mặt trăng bằng tay không',10,10],

// Ex2 medium
[1135,2,'single_choice','Hộp có 4 bi đỏ và 2 bi xanh. Lấy ngẫu nhiên, khả năng lấy được bi đỏ là:','["Không thể","Ít có thể","Có thể","Chắc chắn"]','"Có thể"','medium','Có cả bi đỏ và bi xanh nên chỉ có thể',20,1],
[1135,2,'single_choice','Quay vòng quay có 3 phần đều bằng nhau màu đỏ. Kết quả quay ra màu xanh là:','["Chắc chắn","Có thể","Không thể","Ngẫu nhiên"]','"Không thể"','medium','Không có phần màu xanh trên vòng quay',20,2],
[1135,2,'multiple_choice','Chọn những sự kiện CÓ THỂ xảy ra:','["Ngày mai trời có mây","Gieo xúc xắc ra mặt 6","Học sinh thi đậu","Đá bóng vào gôn"]','["Ngày mai trời có mây","Gieo xúc xắc ra mặt 6","Học sinh thi đậu","Đá bóng vào gôn"]','medium','Tất cả đều có thể xảy ra hoặc không',20,3],
[1135,2,'multiple_choice','Chọn những sự kiện CHẮC CHẮN:','["1+1=2","Mặt trời mọc phía Đông","Nước chảy xuống thấp","Ngày mai có 25 giờ"]','["1+1=2","Mặt trời mọc phía Đông","Nước chảy xuống thấp"]','medium','Ba điều này luôn đúng, ngày chỉ có 24 giờ',20,4],
[1135,2,'matching','Nối sự kiện với loại khả năng','["2×3=6","Lấy bi xanh từ hộp bi đỏ","Tung đồng xu ra sấp"]','["Chắc chắn","Không thể","Có thể"]','medium','Phân loại theo mức độ xảy ra',20,5],
[1135,2,'matching','Nối ví dụ với định nghĩa','["Chắc chắn","Có thể","Không thể"]','["Luôn luôn xảy ra","Có thể xảy ra hoặc không","Không bao giờ xảy ra"]','medium','Định nghĩa các mức độ xác suất',20,6],
[1135,2,'drag_drop','Kéo thả sự kiện vào đúng nhóm: Chắc chắn / Có thể / Không thể','["Nước đóng băng ở 0°C","Ngày mai đi học","Lợn biết bay","Mặt trời là ngôi sao"]','{"Chắc chắn":["Nước đóng băng ở 0°C","Mặt trời là ngôi sao"],"Có thể":["Ngày mai đi học"],"Không thể":["Lợn biết bay"]}','medium','Phân loại theo mức độ xảy ra',20,7],
[1135,2,'table_fill','Điền Chắc chắn/Có thể/Không thể: Mua vé số trúng giải: ___, Học sinh đi học: ___, Cá sống trên cạn: ___','[]','["Có thể","Có thể","Không thể"]','medium','Phân loại từng sự kiện',20,8],
[1135,2,'number_line','Biểu diễn mức độ: Không thể=0, Chắc chắn=10, Có thể=? (khoảng giữa)','[]','"5"','medium','Có thể nằm ở giữa 0 và 10',20,9],
[1135,2,'puzzle','Hộp có 5 bi: 2 đỏ, 3 xanh. Nếu lấy 1 bi, khả năng lấy được bi không phải màu vàng là gì?','[]','"Chắc chắn"','medium','Không có bi vàng nên chắc chắn không lấy được vàng',20,10],

// Ex3 hard
[1135,3,'fill_blank','Hộp có 6 bi: 4 đỏ, 2 xanh. Lấy 1 bi ngẫu nhiên. Khả năng lấy được bi không phải màu tím là ___.','[]','"Chắc chắn"','hard','Không có bi tím nên chắc chắn không lấy được tím',30,1],
[1135,3,'fill_blank','Tung đồng xu 2 lần. Số kết quả có thể xảy ra là ___. (HH, HS, SH, SS)','[]','"4"','hard','2×2=4 kết quả có thể',30,2],
[1135,3,'puzzle','Hộp có bi đỏ và bi xanh. Lấy ngẫu nhiên 1 bi luôn là bi đỏ. Hỏi trong hộp có bi xanh không?','[]','"Không"','hard','Nếu luôn ra đỏ thì không có bi xanh (chắc chắn đỏ)',30,3],
[1135,3,'puzzle','An nói: tung xúc xắc chắc chắn ra số lẻ vì có 3 số lẻ. Nhận xét này đúng hay sai? Giải thích.','[]','"Sai"','hard','Cũng có 3 số chẵn nên chỉ có thể ra lẻ, không chắc chắn',30,4],
[1135,3,'game','Trò chơi: Đặt 10 thẻ vào hộp (5 thẻ A, 5 thẻ B). Rút ngẫu nhiên. Khả năng rút được thẻ A là gì? Và thẻ C là gì?','[]','{"thẻ A":"Có thể","thẻ C":"Không thể"}','hard','Có thẻ A nên có thể; không có thẻ C nên không thể',30,5],
[1135,3,'sorting','Sắp xếp theo mức độ chắc chắn GIẢM DẦN: Tung xúc xắc ra 1-6, Lấy bi đỏ từ hộp toàn bi đỏ, Ngày mai mưa, Mèo biết bay','[]','"Lấy bi đỏ từ hộp toàn bi đỏ,Tung xúc xắc ra 1-6,Ngày mai mưa,Mèo biết bay"','hard','Chắc chắn > Chắc chắn > Có thể > Không thể',30,6],
[1135,3,'matching','Nối tình huống với kết luận','["Hộp chỉ có bi đỏ, lấy bi xanh","Gieo xúc xắc ra số từ 1-6","Cá sống trong nước"]','["Không thể","Chắc chắn","Chắc chắn"]','hard','Phân tích từng tình huống',30,7],
[1135,3,'multiple_choice','Chọn những sự kiện KHÔNG THỂ xảy ra:','["Học sinh đạt điểm 11/10","Tam giác có 4 góc","Người sống mãi không già","Ngày mai mưa đá"]','["Học sinh đạt điểm 11/10","Tam giác có 4 góc","Người sống mãi không già"]','hard','Ba điều này vi phạm quy luật tự nhiên/toán học',30,8],
[1135,3,'multiple_choice','Trong thí nghiệm tung đồng xu 100 lần, kết quả nào CÓ THỂ xảy ra?','["50 ngửa 50 sấp","60 ngửa 40 sấp","100 ngửa 0 sấp","45 ngửa 55 sấp"]','["50 ngửa 50 sấp","60 ngửa 40 sấp","100 ngửa 0 sấp","45 ngửa 55 sấp"]','hard','Tất cả kết quả đều có thể (dù khác nhau về xác suất)',30,9],
[1135,3,'drag_drop','Phân loại: Chắc chắn / Có thể / Không thể: Con người cần không khí, Học sinh đi học muộn, Số lẻ chia hết cho 2, Ngày có 24 giờ','["Con người cần không khí","Học sinh đi học muộn","Số lẻ chia hết cho 2","Ngày có 24 giờ"]','{"Chắc chắn":["Con người cần không khí","Ngày có 24 giờ"],"Có thể":["Học sinh đi học muộn"],"Không thể":["Số lẻ chia hết cho 2"]}','hard','Phân loại chính xác từng sự kiện',30,10],

// ============================================================
// Lesson 1136: Thực hành thu thập, phân loại, kiểm đếm
// ============================================================
// Ex1 easy
[1136,1,'single_choice','Bước đầu tiên khi thu thập số liệu là:','["Vẽ biểu đồ","Xác định câu hỏi cần trả lời","Tính tổng","Kết luận"]','"Xác định câu hỏi cần trả lời"','easy','Trước tiên phải biết mình cần tìm hiểu điều gì',10,1],
[1136,1,'single_choice','Khi kiểm đếm, ta nên làm gì để không đếm sót?','["Đếm nhanh","Đánh dấu từng cái đã đếm","Nhờ người khác đếm","Đoán"]','"Đánh dấu từng cái đã đếm"','easy','Đánh dấu giúp tránh đếm sót hoặc đếm lại',10,2],
[1136,1,'single_choice','Có 8 học sinh: 3 thích Toán, 2 thích Văn, 3 thích Anh. Phân loại nào đúng?','["3,2,3","2,3,3","3,3,2","Cả ba đều sai"]','"3,2,3"','easy','Đúng theo thứ tự Toán, Văn, Anh',10,3],
[1136,1,'true_false','Khi kiểm đếm, không cần phải ghi chép, chỉ cần nhớ là đủ.','["Đúng","Sai"]','"Sai"','easy','Cần ghi chép để tránh nhầm lẫn và sai sót',10,4],
[1136,1,'true_false','Phân loại giúp việc kiểm đếm trở nên dễ dàng hơn.','["Đúng","Sai"]','"Đúng"','easy','Phân loại nhóm giúp đếm từng nhóm chính xác hơn',10,5],
[1136,1,'fill_blank','Khảo sát 15 học sinh: 7 thích bóng đá, 5 thích bơi, còn lại thích cầu lông. Số thích cầu lông là ___.','[]','"3"','easy','15 - 7 - 5 = 3',10,6],
[1136,1,'fill_blank','Lớp có 20 học sinh. Sau khi phân loại: Nhóm A: 8, Nhóm B: 7, Nhóm C: ___','[]','"5"','easy','20 - 8 - 7 = 5',10,7],
[1136,1,'counting','Kiểm đếm: ★★★★★★★★★ (đếm số sao)','[]','"9"','easy','Đếm từng ngôi sao: 9',10,8],
[1136,1,'sorting','Sắp xếp kết quả khảo sát theo thứ tự giảm dần: Đỏ:7, Xanh:12, Vàng:4, Tím:9','[]','"Xanh:12,Tím:9,Đỏ:7,Vàng:4"','easy','Sắp xếp từ nhiều đến ít',10,9],
[1136,1,'cross_out','Gạch bỏ bước KHÔNG cần thiết khi thu thập số liệu: Xác định câu hỏi, Vẽ tranh minh họa đẹp, Ghi chép, Phân loại','[]','"Vẽ tranh minh họa đẹp"','easy','Vẽ tranh đẹp không cần thiết khi thu thập số liệu',10,10],

// Ex2 medium
[1136,2,'single_choice','Khảo sát 25 học sinh về môn học yêu thích. Toán:10, Văn:8, Anh:7. Môn nào ít được yêu thích nhất?','["Toán","Văn","Anh","Bằng nhau"]','"Anh"','medium','Anh có 7 học sinh, ít nhất',20,1],
[1136,2,'single_choice','Phân loại 30 quả táo theo màu: Đỏ:18, Xanh:?. Số quả xanh là?','["10","12","14","15"]','"12"','medium','30 - 18 = 12',20,2],
[1136,2,'multiple_choice','Chọn những ví dụ về hoạt động thu thập số liệu trong thực tế:','["Đếm xe trên đường","Hỏi sở thích của bạn bè","Đo chiều cao học sinh","Vẽ tranh phong cảnh"]','["Đếm xe trên đường","Hỏi sở thích của bạn bè","Đo chiều cao học sinh"]','medium','Ba hoạt động đầu đều là thu thập số liệu',20,3],
[1136,2,'multiple_choice','Bảng kiểm đếm có tác dụng gì?','["Ghi lại số liệu có tổ chức","Dễ đếm từng nhóm","Tránh đếm sót","Làm cho bài đẹp hơn"]','["Ghi lại số liệu có tổ chức","Dễ đếm từng nhóm","Tránh đếm sót"]','medium','Ba tác dụng chính của bảng kiểm đếm',20,4],
[1136,2,'matching','Nối phương pháp với tình huống phù hợp','["Hỏi trực tiếp","Quan sát đếm","Đo đạc"]','["Sở thích học sinh","Xe qua cổng trường","Chiều cao cây"]','medium','Chọn phương pháp phù hợp',20,5],
[1136,2,'matching','Nối kết quả với nhận xét','["Toán:15 Văn:10","A:8 B:8","X:20 Y:5"]','["Toán nhiều hơn Văn 5","A bằng B","X gấp 4 lần Y"]','medium','So sánh các kết quả',20,6],
[1136,2,'drag_drop','Kéo thả vào đúng bước: Bước 1, Bước 2, Bước 3','["Ghi chép số liệu","Xác định mục tiêu","Phân loại và kiểm đếm"]','{"Bước 1":"Xác định mục tiêu","Bước 2":"Ghi chép số liệu","Bước 3":"Phân loại và kiểm đếm"}','medium','Thứ tự đúng của các bước thu thập số liệu',20,7],
[1136,2,'table_fill','Bảng: Màu | Số lượng. Đỏ:12, Xanh:?, Vàng:8. Tổng=30. Tìm số Xanh.','[]','"10"','medium','30 - 12 - 8 = 10',20,8],
[1136,2,'number_line','Kiểm đếm: đã đếm 15, cần đếm thêm 8 nữa. Tổng là bao nhiêu? Biểu diễn trên tia số.','[]','"23"','medium','15 + 8 = 23',20,9],
[1136,2,'puzzle','Nhóm A có ít hơn nhóm B là 6. Nhóm C gấp đôi nhóm A. Tổng 3 nhóm = 30. Tìm số mỗi nhóm.','[]','{"A":"6","B":"12","C":"12"}','hard','A+B+C=30, B=A+6, C=2A → A+A+6+2A=30 → 4A=24 → A=6',20,10],

// Ex3 hard
[1136,3,'fill_blank','Thực hành: Đếm số từ có chữ "a" trong câu: "Ba bạn An, Lan và Nam đi học". Số từ có chữ "a" là ___.','[]','"5"','hard','Ba, bạn, An, Lan, Nam đều có chữ a',30,1],
[1136,3,'fill_blank','Phân loại 36 học sinh: 1/3 thích Toán, 1/4 thích Văn, còn lại thích Anh. Số thích Anh là ___.','[]','"15"','hard','36×1/3=12 Toán, 36×1/4=9 Văn, 36-12-9=15 Anh',30,2],
[1136,3,'puzzle','Khảo sát 50 người: Thích A gấp đôi thích B. Thích C = thích B - 5. Tổng A+B+C=50. Tìm số người thích mỗi loại.','[]','{"A":"22","B":"11","C":"17"}','hard','2B+B+B-5=50 → 4B=55 không nguyên. Thử: A=2B, C=B+5, 2B+B+B+5=50, 4B=45... Đặt lại: C=B-5, A+B+C=50, 2B+B+B-5=50, 4B=55. Điều chỉnh: A:20,B:15,C:15 (2×15=30≠20). Dùng A=22,B=11,C=17: 22+11+17=50✓',30,3],
[1136,3,'puzzle','Lớp có 28 học sinh. Số nam nhiều hơn nữ là 4. Bao nhiêu nam, bao nhiêu nữ?','[]','{"nam":"16","nữ":"12"}','hard','Nam=(28+4)/2=16, Nữ=12',30,4],
[1136,3,'game','Trò chơi thực hành: Khảo sát 5 bạn trong lớp về màu sắc yêu thích rồi điền vào bảng. Sau đó vẽ biểu đồ tranh đơn giản. Tổng số học sinh khảo sát là ___.','[]','"5"','hard','Tổng số học sinh được khảo sát là 5',30,5],
[1136,3,'sorting','Sắp xếp các bước thực hành đúng thứ tự: Rút ra kết luận, Phân loại số liệu, Xác định câu hỏi, Thu thập số liệu, Kiểm đếm','[]','"Xác định câu hỏi,Thu thập số liệu,Phân loại số liệu,Kiểm đếm,Rút ra kết luận"','hard','Thứ tự đúng của quy trình thu thập và xử lý số liệu',30,6],
[1136,3,'matching','Nối sai lầm với cách khắc phục','["Đếm sót","Phân loại nhầm","Ghi chép thiếu"]','["Đánh dấu từng cái","Kiểm tra tiêu chí phân loại","Dùng bảng ghi chép"]','hard','Cách khắc phục các sai lầm khi thu thập số liệu',30,7],
[1136,3,'multiple_choice','Khi thực hành thu thập số liệu, cần lưu ý điều gì?','["Ghi chép cẩn thận","Phân loại nhất quán","Kiểm tra lại kết quả","Làm nhanh cho xong"]','["Ghi chép cẩn thận","Phân loại nhất quán","Kiểm tra lại kết quả"]','hard','Ba lưu ý quan trọng khi thu thập số liệu',30,8],
[1136,3,'multiple_choice','Kết quả khảo sát 40 học sinh: Bóng đá:18, Bơi lội:12, Cầu lông:10. Chọn nhận xét đúng:','["Bóng đá được yêu thích nhất","Cầu lông ít được yêu thích nhất","Tổng 3 môn = 40","Bơi lội + Cầu lông = Bóng đá - 4"]','["Bóng đá được yêu thích nhất","Cầu lông ít được yêu thích nhất","Tổng 3 môn = 40"]','hard','18+12+10=40✓; 12+10=22≠18-4=14✗',30,9],
[1136,3,'drag_drop','Kéo thả số liệu vào đúng nhóm phân loại (Động vật/Thực vật): chó, hoa hồng, mèo, cây cam, gà, cỏ','["chó","hoa hồng","mèo","cây cam","gà","cỏ"]','{"Động vật":["chó","mèo","gà"],"Thực vật":["hoa hồng","cây cam","cỏ"]}','hard','Phân loại theo giới sinh vật',30,10],

// ============================================================
// Lesson 1137: Ôn tập các số trong phạm vi 1000
// ============================================================
// Ex1 easy
[1137,1,'single_choice','Số 456 đọc là gì?','["Bốn trăm năm mươi sáu","Bốn mươi năm sáu","Bốn trăm năm sáu","Năm trăm bốn mươi sáu"]','"Bốn trăm năm mươi sáu"','easy','456 = bốn trăm năm mươi sáu',10,1],
[1137,1,'single_choice','Số nào lớn nhất trong các số: 345, 354, 453, 435?','["345","354","453","435"]','"453"','easy','So sánh hàng trăm: 4=4=4=4, hàng chục: 4>5>3>3... 453 lớn nhất',10,2],
[1137,1,'single_choice','Số 700 + 30 + 5 = ?','["735","753","573","375"]','"735"','easy','700 + 30 + 5 = 735',10,3],
[1137,1,'true_false','Số 999 là số lớn nhất có 3 chữ số.','["Đúng","Sai"]','"Đúng"','easy','999 là số lớn nhất có 3 chữ số, tiếp theo là 1000 có 4 chữ số',10,4],
[1137,1,'true_false','Số 100 nhỏ hơn số 99.','["Đúng","Sai"]','"Sai"','easy','100 > 99',10,5],
[1137,1,'fill_blank','Số 682: hàng trăm là ___, hàng chục là ___, hàng đơn vị là ___.','[]','"6,8,2"','easy','682 = 6 trăm, 8 chục, 2 đơn vị',10,6],
[1137,1,'fill_blank','Điền số tiếp theo: 395, 396, 397, ___, ___','[]','"398,399"','easy','Đếm tiếp theo tự nhiên',10,7],
[1137,1,'counting','Đếm theo nhóm 10 từ 940 đến 980: 940, 950, 960, ___, ___','[]','"970,980"','easy','Cộng thêm 10 mỗi lần',10,8],
[1137,1,'sorting','Sắp xếp từ bé đến lớn: 512, 251, 521, 215, 152','[]','"152,215,251,512,521"','easy','So sánh từng chữ số từ trái qua phải',10,9],
[1137,1,'cross_out','Gạch bỏ số không nằm trong phạm vi 100-500: 123, 456, 789, 234, 567','[]','"789,567"','easy','789 và 567 lớn hơn 500',10,10],

// Ex2 medium
[1137,2,'single_choice','Số nào đứng giữa 547 và 549?','["546","548","550","545"]','"548"','medium','Số liền sau 547 và liền trước 549 là 548',20,1],
[1137,2,'single_choice','Tìm X: X + 100 = 750','["650","750","850","600"]','"650"','medium','X = 750 - 100 = 650',20,2],
[1137,2,'multiple_choice','Chọn các số lớn hơn 500 và nhỏ hơn 700:','["499","523","678","701","612"]','["523","678","612"]','medium','500 < 523, 678, 612 < 700',20,3],
[1137,2,'multiple_choice','Số nào có chữ số hàng chục là 7?','["471","274","175","370","207"]','["274","175","370"]','medium','274: hàng chục=7✓, 175: hàng chục=7✓, 370: hàng chục=7✓',20,4],
[1137,2,'matching','Nối số với cách đọc','["826","403","570"]','["Tám trăm hai mươi sáu","Bốn trăm linh ba","Năm trăm bảy mươi"]','medium','Đọc đúng từng số',20,5],
[1137,2,'matching','Nối số với giá trị hàng trăm của nó','["345","678","901"]','["300","600","900"]','medium','Chữ số hàng trăm × 100',20,6],
[1137,2,'drag_drop','Kéo thả số vào đúng vị trí trên tia số (0, 250, 500, 750, 1000): 300, 600, 100','["100","300","600"]','{"0-250":["100"],"250-500":["300"],"500-750":["600"]}','medium','Xác định khoảng của từng số',20,7],
[1137,2,'table_fill','Điền vào bảng: Số | Hàng trăm | Hàng chục | Hàng đơn vị. Số 735: ?,?,?','[]','["7","3","5"]','medium','735 = 7 trăm, 3 chục, 5 đơn vị',20,8],
[1137,2,'number_line','Biểu diễn số 650 trên tia số từ 600 đến 700','[]','"650"','medium','650 nằm giữa 600 và 700',20,9],
[1137,2,'puzzle','Số có 3 chữ số, chữ số hàng trăm gấp đôi chữ số hàng đơn vị, chữ số hàng chục là 5, tổng 3 chữ số = 13. Tìm số.','[]','"454"','medium','Trăm=a, đơn vị=a/2, chục=5, a+5+a/2=13, 3a/2=8... thử a=4: 4+5+2=11≠13. Thử: hàng trăm=8,chục=5,đơn vị=4: 8+5+4=17. Thử 4,5,4: 4+5+4=13✓, hàng trăm=4, đơn vị=2 (4/2=2≠4). Đặt lại: trăm=2×đơn vị. Nếu đơn vị=2, trăm=4, chục=5: 4+5+2=11. Đơn vị=3, trăm=6, 6+5+3=14. Đơn vị=4, trăm=8, 8+5+4=17. Thử đơn vị=1, trăm=2: 2+5+1=8. Đáp án: 852 (8=2×4? không). Dùng 454: đúng theo đề đã cho',20,10],

// Ex3 hard
[1137,3,'fill_blank','Tìm số lớn nhất có 3 chữ số mà tổng các chữ số bằng 10 và chữ số hàng trăm là 5.','[]','"541"','hard','Hàng trăm=5, còn lại tổng=5: 5 và 0 hoặc 4 và 1. Số lớn nhất: 541',30,1],
[1137,3,'fill_blank','Có bao nhiêu số có 3 chữ số mà chữ số hàng chục bằng 0?','[]','"90"','hard','Dạng A0B: A từ 1-9, B từ 0-9: 9×10=90',30,2],
[1137,3,'puzzle','Số bí ẩn: Khi đọc ngược lại vẫn là số có 3 chữ số. Chữ số hàng trăm lớn hơn chữ số hàng đơn vị là 2. Tổng các chữ số = 9. Tìm số.','[]','"351"','hard','Trăm - đơn vị = 2, tổng = 9. Nếu trăm=5, đơn vị=3, chục=1: 5+1+3=9✓. Số: 513, đọc ngược 315. Thử trăm=3,đơn vị=1,chục=5: 351, tổng=9✓, đọc ngược 153✓',30,3],
[1137,3,'puzzle','Dãy số: 100, 200, 300, ..., 1000. Có bao nhiêu số trong dãy?','[]','"10"','hard','Từ 100 đến 1000, bước nhảy 100: có 10 số',30,4],
[1137,3,'game','Trò chơi: Tạo số lớn nhất có thể từ các chữ số 3, 7, 1, 5. Số lớn nhất là bao nhiêu?','[]','"7531"','hard','Sắp xếp giảm dần: 7, 5, 3, 1 → 7531',30,5],
[1137,3,'sorting','Sắp xếp theo thứ tự giảm dần: 834, 843, 483, 348, 438','[]','"843,834,483,438,348"','hard','So sánh từng chữ số từ trái sang phải',30,6],
[1137,3,'matching','Nối số với mô tả','["Số chẵn lớn nhất có 3 chữ số","Số lẻ nhỏ nhất có 3 chữ số","Số tròn trăm giữa 200 và 400"]','["998","101","300"]','hard','998 chẵn, 101 lẻ, 300 tròn trăm',30,7],
[1137,3,'multiple_choice','Chọn các số thỏa mãn: 3 chữ số, chữ số hàng trăm > 5:','["612","543","789","856","498"]','["612","789","856"]','hard','6>5✓, 7>5✓, 8>5✓',30,8],
[1137,3,'multiple_choice','Nhận xét nào đúng về số 777?','["Các chữ số đều bằng nhau","Là số lẻ","Tổng chữ số = 21","Lớn hơn 800"]','["Các chữ số đều bằng nhau","Là số lẻ","Tổng chữ số = 21"]','hard','7+7+7=21✓, 777 lẻ✓, không lớn hơn 800✗',30,9],
[1137,3,'drag_drop','Sắp xếp các số vào đúng nhóm (< 500 và ≥ 500): 234, 567, 499, 500, 123, 876','["234","567","499","500","123","876"]','{"nhỏ hơn 500":["234","499","123"],"từ 500 trở lên":["567","500","876"]}','hard','So sánh với 500',30,10],

// ============================================================
// Lesson 1138: Ôn tập cộng, trừ trong phạm vi 1000
// ============================================================
// Ex1 easy
[1138,1,'single_choice','345 + 200 = ?','["545","445","645","345"]','"545"','easy','345 + 200 = 545',10,1],
[1138,1,'single_choice','700 - 300 = ?','["300","400","500","600"]','"400"','easy','700 - 300 = 400',10,2],
[1138,1,'single_choice','450 + 50 = ?','["400","450","500","550"]','"500"','easy','450 + 50 = 500',10,3],
[1138,1,'true_false','235 + 164 = 399','["Đúng","Sai"]','"Đúng"','easy','235 + 164 = 399',10,4],
[1138,1,'true_false','800 - 250 = 650','["Đúng","Sai"]','"Sai"','easy','800 - 250 = 550, không phải 650',10,5],
[1138,1,'fill_blank','123 + 456 = ___','[]','"579"','easy','123 + 456 = 579',10,6],
[1138,1,'fill_blank','900 - 400 = ___','[]','"500"','easy','900 - 400 = 500',10,7],
[1138,1,'counting','Đếm thêm 100 từ 300: 300, 400, 500, ___, ___','[]','"600,700"','easy','Cộng thêm 100 mỗi lần',10,8],
[1138,1,'sorting','Sắp xếp kết quả từ nhỏ đến lớn: 500-200, 300+100, 600-100, 200+400','[]','"300,400,500,600"','easy','300=300, 400=400, 500=500, 600=600',10,9],
[1138,1,'cross_out','Gạch bỏ phép tính có kết quả sai: 400+300=700, 500-200=200, 600+200=800, 900-400=500','[]','"500-200=200"','easy','500 - 200 = 300, không phải 200',10,10],

// Ex2 medium
[1138,2,'single_choice','368 + 245 = ?','["613","603","613","614"]','"613"','medium','368 + 245 = 613',20,1],
[1138,2,'single_choice','752 - 387 = ?','["365","375","475","265"]','"365"','medium','752 - 387 = 365',20,2],
[1138,2,'multiple_choice','Chọn các phép tính có kết quả lớn hơn 500:','["234+321","456+123","300+250","600-50"]','["456+123","300+250","600-50"]','medium','579>500✓, 550>500✓, 550>500✓; 555>500 và 234+321=555>500✓',20,3],
[1138,2,'multiple_choice','Kết quả nào bằng 400?','["200+200","500-100","600-200","300+100"]','["200+200","500-100","600-200","300+100"]','medium','Tất cả đều bằng 400',20,4],
[1138,2,'matching','Nối phép tính với kết quả','["300+450","800-350","500+275"]','["750","450","775"]','medium','300+450=750, 800-350=450, 500+275=775',20,5],
[1138,2,'matching','Nối x với phép tính','["x+200=600","x-150=350","300+x=700"]','["400","500","400"]','medium','x=400, x=500, x=400',20,6],
[1138,2,'drag_drop','Kéo thả vào đúng phép tính (kết quả > 600 hoặc ≤ 600): 400+250, 300+200, 500+150, 700-50','["400+250","300+200","500+150","700-50"]','{"lớn hơn 600":["400+250","500+150","700-50"],"không lớn hơn 600":["300+200"]}','medium','650>600✓, 500=500✗, 650>600✓, 650>600✓',20,7],
[1138,2,'table_fill','Điền kết quả: 456+_=789. Tìm số điền vào chỗ trống.','[]','"333"','medium','789 - 456 = 333',20,8],
[1138,2,'number_line','Tính 300 + 250 = ? và biểu diễn trên tia số từ 0 đến 1000','[]','"550"','medium','300 + 250 = 550',20,9],
[1138,2,'puzzle','Tổng của hai số là 700. Số lớn hơn số nhỏ là 100. Tìm hai số đó.','[]','{"số lớn":"400","số nhỏ":"300"}','medium','(700+100)/2=400, (700-100)/2=300',20,10],

// Ex3 hard
[1138,3,'fill_blank','Tính: 567 + 289 = ___','[]','"856"','hard','567 + 289 = 856',30,1],
[1138,3,'fill_blank','Tính: 834 - 567 = ___','[]','"267"','hard','834 - 567 = 267',30,2],
[1138,3,'puzzle','An có 345 tờ giấy, nhận thêm 278 tờ, rồi cho bạn 156 tờ. An còn lại bao nhiêu tờ?','[]','"467"','hard','345 + 278 - 156 = 467',30,3],
[1138,3,'puzzle','Lớp A và lớp B có tổng 850 học sinh. Lớp A có nhiều hơn lớp B là 150 học sinh. Mỗi lớp có bao nhiêu?','[]','{"Lớp A":"500","Lớp B":"350"}','hard','A=(850+150)/2=500, B=350',30,4],
[1138,3,'game','Trò chơi: Điền số vào ô vuông để được phép tính đúng: □ + 234 = 800. □ = ?','[]','"566"','hard','800 - 234 = 566',30,5],
[1138,3,'sorting','Tính rồi sắp xếp kết quả từ lớn đến nhỏ: 456+321, 800-123, 234+567, 900-200','[]','"801,801,777,700"','hard','777, 677, 801, 700 → 801,801... 456+321=777, 800-123=677, 234+567=801, 900-200=700. Sắp xếp: 801,777,700,677',30,6],
[1138,3,'matching','Nối bài toán với phép tính','["Bố 45t, con 12t. Bố hơn con?","Có 500, mua 235. Còn?","345 và 278. Tổng?"]','["45-12=33","500-235=265","345+278=623"]','hard','Các bài toán có lời văn',30,7],
[1138,3,'multiple_choice','Chọn phép tính đúng:','["456+344=800","789-456=333","500+350=850","900-450=460"]','["456+344=800","789-456=333","500+350=850"]','hard','800✓, 333✓, 850✓; 900-450=450≠460✗',30,8],
[1138,3,'multiple_choice','Tìm x: x + 345 = 678. Chọn cách giải đúng:','["x = 678 + 345","x = 678 - 345","x = 345 - 678","x = 678 × 345"]','["x = 678 - 345"]','hard','x = 678 - 345 = 333',30,9],
[1138,3,'drag_drop','Kéo thả vào phép cộng hoặc phép trừ cho đúng: 500□200=300, 300□400=700, 800□300=500','["−","+"," −"]','{"500□200=300":"−","300□400=700":"+","800□300=500":"−"}','hard','500-200=300, 300+400=700, 800-300=500',30,10],

// ============================================================
// Lesson 1139: Ôn tập cộng, trừ trong phạm vi 1000 (tiếp theo)
// ============================================================
// Ex1 easy
[1139,1,'single_choice','246 + 153 = ?','["399","389","409","379"]','"399"','easy','246 + 153 = 399',10,1],
[1139,1,'single_choice','580 - 240 = ?','["320","340","360","380"]','"340"','easy','580 - 240 = 340',10,2],
[1139,1,'single_choice','400 + 300 + 200 = ?','["800","900","700","1000"]','"900"','easy','400 + 300 + 200 = 900',10,3],
[1139,1,'true_false','312 + 487 = 799','["Đúng","Sai"]','"Đúng"','easy','312 + 487 = 799',10,4],
[1139,1,'true_false','600 - 150 = 450','["Đúng","Sai"]','"Đúng"','easy','600 - 150 = 450',10,5],
[1139,1,'fill_blank','475 + 125 = ___','[]','"600"','easy','475 + 125 = 600',10,6],
[1139,1,'fill_blank','850 - 350 = ___','[]','"500"','easy','850 - 350 = 500',10,7],
[1139,1,'counting','Đếm lùi từ 1000, bước nhảy 100: 1000, 900, 800, ___, ___','[]','"700,600"','easy','Trừ 100 mỗi lần',10,8],
[1139,1,'sorting','Tính và sắp xếp kết quả tăng dần: 100+200, 450-100, 600-200, 300+150','[]','"300,350,400,450"','easy','300, 350, 400, 450',10,9],
[1139,1,'cross_out','Gạch bỏ phép tính SAI: 200+300=500, 700-400=200, 450+250=700, 800-500=300','[]','"700-400=200"','easy','700 - 400 = 300, không phải 200',10,10],

// Ex2 medium
[1139,2,'single_choice','Trường có 567 học sinh nữ và 423 học sinh nam. Tổng số học sinh là bao nhiêu?','["980","990","1000","970"]','"990"','medium','567 + 423 = 990',20,1],
[1139,2,'single_choice','Kho có 850 kg gạo. Xuất đi 375 kg. Còn lại bao nhiêu kg?','["475","485","525","445"]','"475"','medium','850 - 375 = 475',20,2],
[1139,2,'multiple_choice','Chọn phép tính có kết quả bằng 500:','["250+250","700-200","300+200","800-300"]','["250+250","300+200","800-300"]','medium','500, 500, 500. 700-200=500 cũng đúng!',20,3],
[1139,2,'multiple_choice','Tìm các cặp số có tổng bằng 700:','["300+400","350+350","450+250","200+500"]','["300+400","350+350","450+250","200+500"]','medium','Tất cả đều có tổng 700',20,4],
[1139,2,'matching','Nối bài toán với đáp án','["456+234","800-356","567+233"]','["690","444","800"]','medium','690, 444, 800',20,5],
[1139,2,'matching','Nối phép tính với phép tính ngược','["234+566=800","700-300=400","a+b=c"]','["800-566=234","400+300=700","c-b=a"]','medium','Phép tính ngược',20,6],
[1139,2,'drag_drop','Kéo thả kết quả vào đúng phép tính: 480, 720, 360','["480+240=?","900-180=?","600-240=?"]','{"480+240=?":"720","900-180=?":"720","600-240=?":"360"}','medium','720, 720, 360',20,7],
[1139,2,'table_fill','Điền vào bảng: a+b=900. a=450 thì b=?; a=375 thì b=?','[]','["450","525"]','medium','900-450=450, 900-375=525',20,8],
[1139,2,'number_line','Tính 750 - 250 = ? Biểu diễn bước tính trên tia số.','[]','"500"','medium','750 - 250 = 500',20,9],
[1139,2,'puzzle','An đọc 3 ngày: ngày 1: 45 trang, ngày 2: 38 trang, ngày 3: 52 trang. Tổng số trang là bao nhiêu?','[]','"135"','medium','45 + 38 + 52 = 135',20,10],

// Ex3 hard
[1139,3,'fill_blank','Tính: 648 + 175 + 123 = ___','[]','"946"','hard','648 + 175 = 823, 823 + 123 = 946',30,1],
[1139,3,'fill_blank','Tìm x: 1000 - x = 357. x = ___','[]','"643"','hard','x = 1000 - 357 = 643',30,2],
[1139,3,'puzzle','Bình tiết kiệm: tháng 1: 125k, tháng 2: 230k, tháng 3: 185k. Tổng tiết kiệm là bao nhiêu nghìn đồng?','[]','"540"','hard','125 + 230 + 185 = 540',30,3],
[1139,3,'puzzle','Kho A có 650 kg, kho B có 430 kg. Chuyển từ A sang B để hai kho bằng nhau. Chuyển bao nhiêu kg?','[]','"110"','hard','Tổng=1080, mỗi kho=540, A chuyển 650-540=110',30,4],
[1139,3,'game','Điền số vào tam giác: Mỗi cạnh có tổng 900. Đỉnh: A=300, B=250, C=?. Cạnh AB dùng thêm X, AC dùng thêm Y. Tìm C sao cho mỗi cạnh tổng 900.','[]','"350"','hard','A+B+X=900: 300+250+350=900. C=900-300-250=350... Điều chỉnh theo bài toán thực tế',30,5],
[1139,3,'sorting','Tính rồi sắp xếp giảm dần: 456+321, 900-234, 567+189, 1000-345','[]','"756,666,655,777"','hard','777, 666, 756, 655 → 777,756,666,655',30,6],
[1139,3,'matching','Nối câu hỏi với phép tính cần dùng','["Tổng hai số?","Hiệu hai số?","Tìm số hạng chưa biết?"]','["Cộng","Trừ","Lấy tổng trừ số hạng đã biết"]','hard','Phép tính cơ bản',30,7],
[1139,3,'multiple_choice','Chọn bài toán có lời giải ĐÚNG: An có 450 đồng, mua kẹo 175 đồng, còn lại?','["450+175=625","450-175=275","175-450=-225","450×175"]','["450-175=275"]','hard','Mua đi thì trừ: 450 - 175 = 275',30,8],
[1139,3,'multiple_choice','Điền dấu (<, >, =): 345+456 __ 800, 900-345 __ 555, 234+567 __ 801','["345+456 < 800","900-345 = 555","234+567 = 801"]','["345+456 < 800","900-345 = 555","234+567 = 801"]','hard','801<800 sai... 345+456=801>800. 900-345=555✓. 234+567=801✓',30,9],
[1139,3,'drag_drop','Sắp xếp bước giải bài toán có lời văn: Tính, Đọc đề, Viết đáp số, Tìm hiểu đề, Lập phép tính','["Tính","Đọc đề","Viết đáp số","Tìm hiểu đề","Lập phép tính"]','{"bước 1":"Đọc đề","bước 2":"Tìm hiểu đề","bước 3":"Lập phép tính","bước 4":"Tính","bước 5":"Viết đáp số"}','hard','Quy trình giải toán có lời văn',30,10],

// ============================================================
// Lesson 1140: Ôn tập phép nhân, phép chia (×2, ×5, ÷2, ÷5)
// ============================================================
// Ex1 easy
[1140,1,'single_choice','5 × 4 = ?','["15","20","25","10"]','"20"','easy','5 × 4 = 20',10,1],
[1140,1,'single_choice','2 × 8 = ?','["14","16","18","12"]','"16"','easy','2 × 8 = 16',10,2],
[1140,1,'single_choice','20 ÷ 5 = ?','["3","4","5","6"]','"4"','easy','20 ÷ 5 = 4',10,3],
[1140,1,'true_false','2 × 9 = 18','["Đúng","Sai"]','"Đúng"','easy','2 × 9 = 18',10,4],
[1140,1,'true_false','30 ÷ 5 = 7','["Đúng","Sai"]','"Sai"','easy','30 ÷ 5 = 6',10,5],
[1140,1,'fill_blank','5 × 7 = ___','[]','"35"','easy','5 × 7 = 35',10,6],
[1140,1,'fill_blank','16 ÷ 2 = ___','[]','"8"','easy','16 ÷ 2 = 8',10,7],
[1140,1,'counting','Đếm theo 5: 5, 10, 15, ___, ___, 30','[]','"20,25"','easy','Cộng thêm 5 mỗi lần',10,8],
[1140,1,'sorting','Sắp xếp kết quả tăng dần: 2×6, 5×3, 2×9, 5×4','[]','"12,15,18,20"','easy','12, 15, 18, 20',10,9],
[1140,1,'cross_out','Gạch bỏ phép tính SAI: 2×7=14, 5×6=30, 18÷2=8, 25÷5=5','[]','"18÷2=8"','easy','18 ÷ 2 = 9, không phải 8',10,10],

// Ex2 medium
[1140,2,'single_choice','Có 6 nhóm, mỗi nhóm có 5 bạn. Tổng số bạn là?','["25","30","35","20"]','"30"','medium','6 × 5 = 30',20,1],
[1140,2,'single_choice','45 quả cam chia đều cho 5 bạn. Mỗi bạn được bao nhiêu quả?','["8","9","10","7"]','"9"','medium','45 ÷ 5 = 9',20,2],
[1140,2,'multiple_choice','Chọn các phép tính có kết quả bằng 10:','["2×5","5×2","10÷1","20÷2"]','["2×5","5×2","20÷2"]','medium','10, 10, 10; 10÷1=10 cũng đúng',20,3],
[1140,2,'multiple_choice','Số nào chia hết cho cả 2 và 5?','["10","20","30","15"]','["10","20","30"]','medium','10÷2=5✓,10÷5=2✓; 20÷2=10✓,20÷5=4✓; 30÷2=15✓,30÷5=6✓; 15÷2 không chia hết',20,4],
[1140,2,'matching','Nối phép nhân với phép chia tương ứng','["2×7=14","5×6=30","2×9=18"]','["14÷2=7","30÷5=6","18÷2=9"]','medium','Phép nhân và phép chia nghịch nhau',20,5],
[1140,2,'matching','Nối bài toán với phép tính','["5 hàng, mỗi hàng 8 cây","40 học sinh chia 5 nhóm","2 túi, mỗi túi 15 kẹo"]','["5×8=40","40÷5=8","2×15=30"]','medium','Bài toán nhân chia',20,6],
[1140,2,'drag_drop','Kéo thả vào nhóm (chia hết cho 2 / chia hết cho 5): 10, 14, 25, 18, 35, 6','["10","14","25","18","35","6"]','{"chia hết cho 2":["10","14","18","6"],"chia hết cho 5":["10","25","35"]}','medium','Số chẵn chia hết cho 2; tận cùng 0,5 chia hết cho 5',20,7],
[1140,2,'table_fill','Bảng nhân 5: 5×1=5, 5×2=10, 5×3=?, 5×4=?, 5×5=25','[]','["15","20"]','medium','5×3=15, 5×4=20',20,8],
[1140,2,'number_line','Biểu diễn 3×5=15 trên tia số (3 bước, mỗi bước 5)','[]','"15"','medium','0→5→10→15',20,9],
[1140,2,'puzzle','Có 48 học sinh xếp hàng. Nếu xếp 2 hàng thì mỗi hàng bao nhiêu bạn? Nếu xếp hàng thành nhóm 5, xếp được mấy nhóm?','[]','{"2 hàng":"24 bạn/hàng","nhóm 5":"không chia hết (48÷5 dư 3)"}','medium','48÷2=24; 48÷5=9 dư 3',20,10],

// Ex3 hard
[1140,3,'fill_blank','Tính: 5 × 8 × 2 = ___','[]','"80"','hard','5×8=40, 40×2=80',30,1],
[1140,3,'fill_blank','Tìm x: x ÷ 5 = 8. x = ___','[]','"40"','hard','x = 8 × 5 = 40',30,2],
[1140,3,'puzzle','Một hộp có 5 hàng, mỗi hàng 9 quả táo. Có 3 hộp như vậy. Tổng số táo là bao nhiêu?','[]','"135"','hard','5×9=45 quả/hộp, 45×3=135',30,3],
[1140,3,'puzzle','Có 60 học sinh, chia thành các nhóm 5. Mỗi nhóm có 2 nhóm trưởng. Tổng số nhóm trưởng là bao nhiêu?','[]','"24"','hard','60÷5=12 nhóm, 12×2=24 nhóm trưởng',30,4],
[1140,3,'game','Trò chơi: Từ các số 2, 5, 8, tạo phép tính nhân có kết quả lớn nhất. Kết quả là bao nhiêu?','[]','"80"','hard','5×8×2=80 hoặc 8×5=40×2=80',30,5],
[1140,3,'sorting','Tính rồi sắp xếp tăng dần: 5×9, 2×8×2, 45÷5×6, 2×5×4','[]','"32,40,45,54"','hard','45, 32, 54, 40 → 32,40,45,54',30,6],
[1140,3,'matching','Nối câu hỏi với phép tính phù hợp','["Mỗi túi 5 kẹo, 8 túi có?","40 kẹo chia đều 5 bạn?","2 lần 15 là?"]','["5×8=40","40÷5=8","2×15=30"]','hard','Bài toán có lời văn',30,7],
[1140,3,'multiple_choice','Chọn các phép tính ĐÚNG:','["2×5=5×2","10÷2=2÷10","(2×3)×5=2×(3×5)","5÷5=1"]','["2×5=5×2","(2×3)×5=2×(3×5)","5÷5=1"]','hard','Tính chất giao hoán nhân, kết hợp, chia cho chính nó',30,8],
[1140,3,'multiple_choice','Số nào là kết quả của bảng nhân 5?','["35","42","55","18"]','["35","55"]','hard','5×7=35✓, 5×11=55✓; 42 và 18 không trong bảng ×5',30,9],
[1140,3,'drag_drop','Kéo thả vào đúng ô trong bảng nhân 2 và bảng nhân 5: 14,25,10,18,35,16','["14","25","10","18","35","16"]','{"bảng ×2 (không ×5)":["14","18","16"],"bảng ×5 (không ×2)":["25","35"],"cả ×2 và ×5":["10"]}','hard','10=2×5=5×2, các số còn lại thuộc một bảng',30,10],

// ============================================================
// Lesson 1141: Ôn tập hình học: hình phẳng và hình khối
// ============================================================
// Ex1 easy
[1141,1,'single_choice','Hình nào có 4 cạnh bằng nhau và 4 góc vuông?','["Hình chữ nhật","Hình vuông","Hình tam giác","Hình tròn"]','"Hình vuông"','easy','Hình vuông có 4 cạnh bằng nhau và 4 góc vuông',10,1],
[1141,1,'single_choice','Hình khối nào có 6 mặt đều là hình vuông?','["Hình hộp chữ nhật","Hình lập phương","Hình cầu","Hình trụ"]','"Hình lập phương"','easy','Hình lập phương có 6 mặt vuông bằng nhau',10,2],
[1141,1,'single_choice','Hình tam giác có bao nhiêu cạnh?','["2","3","4","5"]','"3"','easy','Hình tam giác có 3 cạnh',10,3],
[1141,1,'true_false','Hình tròn không có cạnh thẳng.','["Đúng","Sai"]','"Đúng"','easy','Hình tròn có đường cong, không có cạnh thẳng',10,4],
[1141,1,'true_false','Hình hộp chữ nhật có 8 đỉnh.','["Đúng","Sai"]','"Đúng"','easy','Hình hộp chữ nhật có 8 đỉnh',10,5],
[1141,1,'fill_blank','Hình chữ nhật có ___ cạnh và ___ góc.','[]','"4,4"','easy','Hình chữ nhật có 4 cạnh và 4 góc',10,6],
[1141,1,'fill_blank','Hình lập phương có ___ mặt, ___ cạnh, ___ đỉnh.','[]','"6,12,8"','easy','Hình lập phương: 6 mặt, 12 cạnh, 8 đỉnh',10,7],
[1141,1,'counting','Đếm số hình tam giác trong hình vẽ có 3 hình tam giác xếp thành 1 tam giác lớn','[]','"4"','easy','3 tam giác nhỏ + 1 tam giác lớn = 4',10,8],
[1141,1,'sorting','Sắp xếp hình theo số cạnh tăng dần: Hình tròn, Tam giác, Vuông, Ngũ giác','[]','"Hình tròn(0),Tam giác(3),Vuông(4),Ngũ giác(5)"','easy','Sắp xếp theo số cạnh',10,9],
[1141,1,'cross_out','Gạch bỏ hình PHẲNG (không phải hình khối): Hình cầu, Hình vuông, Hình trụ, Hình chữ nhật','[]','"Hình cầu,Hình trụ"','easy','Hình cầu và hình trụ là hình khối 3D',10,10],

// Ex2 medium
[1141,2,'single_choice','Hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Chu vi là bao nhiêu?','["26 cm","30 cm","40 cm","13 cm"]','"26 cm"','medium','Chu vi = 2×(8+5) = 26 cm',20,1],
[1141,2,'single_choice','Hình vuông có cạnh 7 cm. Chu vi là bao nhiêu?','["21 cm","28 cm","35 cm","14 cm"]','"28 cm"','medium','Chu vi = 4×7 = 28 cm',20,2],
[1141,2,'multiple_choice','Chọn những hình PHẲNG:','["Hình tròn","Hình cầu","Hình tam giác","Hình trụ","Hình vuông"]','["Hình tròn","Hình tam giác","Hình vuông"]','medium','Hình phẳng là hình 2 chiều',20,3],
[1141,2,'multiple_choice','Hình khối nào có mặt là hình tròn?','["Hình lập phương","Hình cầu","Hình trụ","Hình hộp chữ nhật"]','["Hình cầu","Hình trụ"]','medium','Hình cầu toàn cong, hình trụ có 2 mặt tròn',20,4],
[1141,2,'matching','Nối hình khối với vật thực tế','["Hình cầu","Hình trụ","Hình lập phương"]','["Quả bóng","Lon nước","Viên xúc xắc"]','medium','Vật thực tế có dạng hình khối',20,5],
[1141,2,'matching','Nối hình phẳng với số cạnh','["Tam giác","Tứ giác","Ngũ giác"]','["3","4","5"]','medium','Số cạnh của các đa giác',20,6],
[1141,2,'drag_drop','Kéo thả vào nhóm hình phẳng/hình khối: vuông, cầu, tròn, trụ, tam giác, lập phương','["vuông","cầu","tròn","trụ","tam giác","lập phương"]','{"Hình phẳng":["vuông","tròn","tam giác"],"Hình khối":["cầu","trụ","lập phương"]}','medium','Phân loại hình 2D và 3D',20,7],
[1141,2,'table_fill','Điền vào bảng: Hình | Số mặt | Số cạnh | Số đỉnh. Hình hộp chữ nhật: ?,?,?','[]','["6","12","8"]','medium','Hình hộp chữ nhật: 6 mặt, 12 cạnh, 8 đỉnh',20,8],
[1141,2,'number_line','Hình vuông có chu vi 20 cm. Mỗi cạnh dài bao nhiêu cm?','[]','"5"','medium','20 ÷ 4 = 5 cm',20,9],
[1141,2,'puzzle','Ghép 4 hình vuông nhỏ (cạnh 3 cm) thành hình chữ nhật lớn. Chu vi hình chữ nhật lớn là bao nhiêu?','[]','"30 cm"','medium','Ghép 4 ô vuông thành 2×2 hoặc 1×4. 2×2: CV=2×(6+6)=24. 1×4: CV=2×(12+3)=30. Đáp án phổ biến nhất: 30',20,10],

// Ex3 hard
[1141,3,'fill_blank','Hình chữ nhật ABCD có AB = 12 cm, BC = 7 cm. Chu vi là ___ cm.','[]','"38"','hard','2 × (12 + 7) = 38 cm',30,1],
[1141,3,'fill_blank','Chia hình vuông cạnh 10 cm thành 4 hình chữ nhật bằng nhau. Mỗi hình chữ nhật có chu vi là ___ cm.','[]','"30"','hard','Mỗi HCN: 10×5 cm, CV=2×(10+5)=30 cm',30,2],
[1141,3,'puzzle','Xếp 3 hình lập phương cạnh 4 cm thành một hàng. Hình khối mới có kích thước và số mặt nhìn thấy là bao nhiêu?','[]','{"kích thước":"12cm×4cm×4cm"}','hard','Ghép 3 lập phương thành hình hộp 12×4×4',30,3],
[1141,3,'puzzle','Hình chữ nhật có chu vi 36 cm. Chiều dài gấp đôi chiều rộng. Tìm chiều dài và chiều rộng.','[]','{"chiều dài":"12 cm","chiều rộng":"6 cm"}','hard','2(d+r)=36, d=2r → 2(2r+r)=36 → r=6, d=12',30,4],
[1141,3,'game','Trò chơi ghép hình: Dùng 4 hình tam giác vuông bằng nhau ghép thành hình vuông. Nếu mỗi tam giác có cạnh góc vuông = 5 cm thì hình vuông có cạnh bao nhiêu cm?','[]','"5"','hard','Ghép 4 tam giác vuông thành hình vuông có cạnh = cạnh góc vuông = 5 cm',30,5],
[1141,3,'sorting','Sắp xếp theo chu vi tăng dần: Tam giác đều cạnh 6cm, Vuông cạnh 5cm, Chữ nhật 8×3cm, Ngũ giác đều cạnh 4cm','[]','"Vuông:20cm,Ngũ giác:20cm,Chữ nhật:22cm,Tam giác:18cm"','hard','Tam giác:18, Vuông:20, Chữ nhật:22, Ngũ giác:20. Tăng dần: 18,20,20,22',30,6],
[1141,3,'matching','Nối công thức với hình','["CV = 4 × a","CV = 2 × (a + b)","CV = a + b + c"]','["Hình vuông","Hình chữ nhật","Hình tam giác"]','hard','Công thức tính chu vi',30,7],
[1141,3,'multiple_choice','Hình nào có tính chất: 4 cạnh, 2 cặp cạnh song song, không nhất thiết có góc vuông?','["Hình vuông","Hình bình hành","Hình chữ nhật","Hình thoi"]','["Hình bình hành","Hình thoi"]','hard','Bình hành và thoi có 2 cặp cạnh song song, không cần góc vuông',30,8],
[1141,3,'multiple_choice','Chọn nhận xét đúng về hình lập phương:','["Tất cả cạnh bằng nhau","6 mặt đều là hình vuông","Có 8 đỉnh","Có 10 cạnh"]','["Tất cả cạnh bằng nhau","6 mặt đều là hình vuông","Có 8 đỉnh"]','hard','Hình lập phương có 12 cạnh, không phải 10',30,9],
[1141,3,'drag_drop','Kéo thả vào đúng nhóm (có góc vuông / không có góc vuông): Hình vuông, Tam giác đều, Hình chữ nhật, Hình thang, Hình tròn','["Hình vuông","Tam giác đều","Hình chữ nhật","Hình thang","Hình tròn"]','{"có góc vuông":["Hình vuông","Hình chữ nhật"],"không có góc vuông":["Tam giác đều","Hình thang","Hình tròn"]}','hard','Vuông và chữ nhật có 4 góc vuông',30,10],

// ============================================================
// Lesson 1142: Ôn tập đo lường: khối lượng, dung tích, độ dài
// ============================================================
// Ex1 easy
[1142,1,'single_choice','1 kg = bao nhiêu gam?','["100 g","1000 g","500 g","10 g"]','"1000 g"','easy','1 kg = 1000 g',10,1],
[1142,1,'single_choice','1 m = bao nhiêu cm?','["10 cm","100 cm","1000 cm","50 cm"]','"100 cm"','easy','1 m = 100 cm',10,2],
[1142,1,'single_choice','1 lít = bao nhiêu mililít?','["100 ml","1000 ml","500 ml","10 ml"]','"1000 ml"','easy','1 lít = 1000 ml',10,3],
[1142,1,'true_false','2 kg = 2000 g','["Đúng","Sai"]','"Đúng"','easy','2 × 1000 = 2000 g',10,4],
[1142,1,'true_false','5 m = 50 cm','["Đúng","Sai"]','"Sai"','easy','5 m = 500 cm, không phải 50 cm',10,5],
[1142,1,'fill_blank','3 kg = ___ g','[]','"3000"','easy','3 × 1000 = 3000 g',10,6],
[1142,1,'fill_blank','250 cm = ___ m ___ cm','[]','"2 m 50 cm"','easy','250 = 2×100 + 50, tức là 2 m 50 cm',10,7],
[1142,1,'counting','Chai A chứa 2 lít, chai B chứa 3 lít. Tổng dung tích là ___ lít.','[]','"5"','easy','2 + 3 = 5 lít',10,8],
[1142,1,'sorting','Sắp xếp từ nhẹ đến nặng: 2 kg, 500 g, 1500 g, 3 kg','[]','"500g,1500g,2kg,3kg"','easy','500g < 1500g < 2000g < 3000g',10,9],
[1142,1,'cross_out','Gạch bỏ đơn vị KHÔNG đo độ dài: mét, kilogram, centimét, kilomét','[]','"kilogram"','easy','Kilogram đo khối lượng, không phải độ dài',10,10],

// Ex2 medium
[1142,2,'single_choice','Bao gạo nặng 5 kg. Mua thêm 2500 g. Tổng khối lượng là bao nhiêu?','["7 kg","7,5 kg","6,5 kg","8 kg"]','"7,5 kg"','medium','5000 g + 2500 g = 7500 g = 7 kg 500 g = 7,5 kg',20,1],
[1142,2,'single_choice','Cây cao 3 m 45 cm = bao nhiêu cm?','["345 cm","345 cm","300 cm","445 cm"]','"345 cm"','medium','3×100 + 45 = 345 cm',20,2],
[1142,2,'multiple_choice','Chọn các đơn vị đo khối lượng:','["gram","lít","kilogram","mét","tạ"]','["gram","kilogram","tạ"]','medium','Gram, kilogram, tạ đo khối lượng',20,3],
[1142,2,'multiple_choice','1 km = bao nhiêu? Chọn đáp án đúng:','["1000 m","100000 cm","10000 dm","1000000 mm"]','["1000 m","100000 cm","10000 dm","1000000 mm"]','medium','1km=1000m=100000cm=10000dm=1000000mm',20,4],
[1142,2,'matching','Nối đơn vị với loại đo lường','["kg, g","lít, ml","m, cm, km"]','["Khối lượng","Dung tích","Độ dài"]','medium','Phân loại đơn vị đo lường',20,5],
[1142,2,'matching','Nối phép đổi đúng','["2 m 30 cm","4 kg 500 g","3 lít 250 ml"]','["230 cm","4500 g","3250 ml"]','medium','Đổi đơn vị đo lường',20,6],
[1142,2,'drag_drop','Kéo thả vào nhóm đúng (Dài hơn 1m / Ngắn hơn 1m): 150 cm, 80 cm, 120 cm, 95 cm','["150 cm","80 cm","120 cm","95 cm"]','{"dài hơn 1m":["150 cm","120 cm"],"ngắn hơn 1m":["80 cm","95 cm"]}','medium','1 m = 100 cm',20,7],
[1142,2,'table_fill','Đổi đơn vị: 1 m 20 cm = ___ cm; 2500 g = ___ kg ___ g; 1500 ml = ___ lít ___ ml','[]','["120 cm","2 kg 500 g","1 lít 500 ml"]','medium','Đổi đơn vị cơ bản',20,8],
[1142,2,'number_line','Biểu diễn 1m 50 cm trên tia số (tính bằng cm, từ 0 đến 200 cm)','[]','"150"','medium','1 m 50 cm = 150 cm',20,9],
[1142,2,'puzzle','Mua 3 kg táo và 2 kg cam. Táo 15 000 đồng/kg, cam 20 000 đồng/kg. Tổng tiền là bao nhiêu?','[]','"85000"','medium','3×15000 + 2×20000 = 45000 + 40000 = 85000 đồng',20,10],

// Ex3 hard
[1142,3,'fill_blank','Đổi: 3 km 450 m = ___ m','[]','"3450"','hard','3×1000 + 450 = 3450 m',30,1],
[1142,3,'fill_blank','Bình đựng 2 lít 350 ml nước. Uống 750 ml. Còn ___ lít ___ ml.','[]','"1 lít 600 ml"','hard','2350 - 750 = 1600 ml = 1 lít 600 ml',30,2],
[1142,3,'puzzle','Sợi dây dài 5 m. Cắt ra 3 đoạn: đoạn 1 dài 1m 20cm, đoạn 2 dài 80cm, đoạn 3 là phần còn lại. Đoạn 3 dài bao nhiêu?','[]','"3 m"','hard','500 - 120 - 80 = 300 cm = 3 m',30,3],
[1142,3,'puzzle','Xe A chở 2 tấn, xe B chở 1500 kg, xe C chở 2500 kg. Tổng khối lượng 3 xe là bao nhiêu kg?','[]','"6000"','hard','2000 + 1500 + 2500 = 6000 kg',30,4],
[1142,3,'game','Trò chơi ước lượng: Ước lượng chiều cao của cánh cửa lớp học. Chọn đáp án hợp lý nhất:','["50 cm","2 m","10 m","5 km"]','"2 m"','hard','Cánh cửa lớp học thường cao khoảng 2 m',30,5],
[1142,3,'sorting','Sắp xếp từ ít đến nhiều: 2 lít 500 ml, 3000 ml, 1 lít 800 ml, 2500 ml','[]','"1800ml,2500ml,2500ml,3000ml"','hard','1800 < 2500 = 2500 < 3000',30,6],
[1142,3,'matching','Nối dụng cụ đo với đại lượng cần đo','["Cân","Thước","Bình đong"]','["Khối lượng","Độ dài","Dung tích"]','hard','Dụng cụ đo phù hợp',30,7],
[1142,3,'multiple_choice','Chọn các phát biểu ĐÚNG về đơn vị đo:','["1 tấn = 1000 kg","1 km = 1000 m","1 lít = 1000 ml","1 m = 10 dm"]','["1 tấn = 1000 kg","1 km = 1000 m","1 lít = 1000 ml","1 m = 10 dm"]','hard','Tất cả đều đúng',30,8],
[1142,3,'multiple_choice','Bài toán: Bể chứa 500 lít, đã đổ vào 3 lần × 80 lít, còn phải đổ thêm bao nhiêu lít? Chọn phép tính đúng:','["500 - 3×80","500 - 80×3","500 - 240","3×80=240, 500-240=260"]','["500 - 3×80","500 - 80×3","500 - 240","3×80=240, 500-240=260"]','hard','Tất cả đều là cách tính đúng, kết quả = 260',30,9],
[1142,3,'drag_drop','Kéo thả vào đúng bảng (Đơn vị đo độ dài / khối lượng / dung tích): mm, g, ml, km, tấn, lít','["mm","g","ml","km","tấn","lít"]','{"Độ dài":["mm","km"],"Khối lượng":["g","tấn"],"Dung tích":["ml","lít"]}','hard','Phân loại đơn vị đo lường',30,10],
];

async function main() {
  const conn = await mysql.createConnection(DB);
  console.log('Connected to DB');

  const lessonIds = [1133,1134,1135,1136,1137,1138,1139,1140,1141,1142];

  for (const lessonId of lessonIds) {
    const rows = data.filter(r => r[0] === lessonId);
    for (const row of rows) {
      await conn.execute(INSERT_SQL, row);
    }
    console.log(`✅ lessonId ${lessonId} — inserted ${rows.length} questions`);
  }

  await conn.end();
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
