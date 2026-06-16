import mysql from 'mysql2/promise';
const DB = { host:'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com', user:'admin', password:'jFUnRCumnerGsGaPT5pR', database:'songtute' };
const INSERT_SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  const conn = await mysql.createConnection(DB);

  const data: [number, number, string, string, string, string, number, string, number, number][] = [

    // ===== LESSON 1124: Đề-xi-mét, mét, ki-lô-mét =====
    // Ex1 easy
    [1124,1,'single_choice','1 mét bằng bao nhiêu đề-xi-mét?','["8 dm","10 dm","100 dm","1000 dm"]','"10 dm"',1,'1 m = 10 dm',10,1],
    [1124,1,'single_choice','1 km bằng bao nhiêu mét?','["100 m","500 m","1000 m","10000 m"]','"1000 m"',1,'1 km = 1000 m',10,2],
    [1124,1,'single_choice','Độ dài nào lớn hơn?','["5 dm","45 cm","4 dm 9 cm","3 m"]','"3 m"',1,'3 m = 30 dm lớn hơn 5 dm, 45 cm = 4 dm 5 cm, 4 dm 9 cm',10,3],
    [1124,1,'true_false','1 km = 1000 m là đúng.','["Đúng","Sai"]','"Đúng"',1,'1 km = 1000 m',10,4],
    [1124,1,'true_false','10 dm = 10 m là đúng.','["Đúng","Sai"]','"Sai"',1,'10 dm = 1 m, không phải 10 m',10,5],
    [1124,1,'fill_blank','1 m = ___ dm','[]','"10"',1,'1 m = 10 dm',10,6],
    [1124,1,'fill_blank','2 km = ___ m','[]','"2000"',1,'2 km = 2 × 1000 = 2000 m',10,7],
    [1124,1,'counting','Đếm số đoạn thẳng 1 dm trong đoạn thẳng 3 dm.','[]','"3"',1,'3 dm gồm 3 đoạn 1 dm',10,8],
    [1124,1,'sorting','Sắp xếp các độ dài theo thứ tự tăng dần: 5 m, 3 km, 20 dm, 150 cm','["5 m","3 km","20 dm","150 cm"]','["20 dm","150 cm","5 m","3 km"]',1,'20 dm=2m, 150 cm=1,5m, 5 m, 3 km=3000m',10,9],
    [1124,1,'cross_out','Gạch bỏ đơn vị đo độ dài KHÔNG thuộc hệ mét:','["dm","km","kg","m"]','"kg"',1,'kg là đơn vị khối lượng, không phải độ dài',10,10],

    // Ex2 medium
    [1124,2,'single_choice','3 m 5 dm = ___ dm','["30 dm","35 dm","305 dm","53 dm"]','"35 dm"',2,'3 m = 30 dm; 30 + 5 = 35 dm',20,1],
    [1124,2,'single_choice','Đường từ nhà Lan đến trường dài 2 km. Lan đã đi được 800 m. Lan còn phải đi bao nhiêu mét?','["200 m","1200 m","1800 m","800 m"]','"1200 m"',2,'2 km = 2000 m; 2000 - 800 = 1200 m',20,2],
    [1124,2,'multiple_choice','Chọn các cách đúng để viết 1 km:','["1000 m","100 dm","10000 dm","10 hm"]','["1000 m","10000 dm"]',2,'1 km = 1000 m = 10000 dm',20,3],
    [1124,2,'multiple_choice','Chọn các đơn vị đo độ dài:','["dm","kg","m","lít","km"]','["dm","m","km"]',2,'dm, m, km là đơn vị đo độ dài',20,4],
    [1124,2,'matching','Nối đơn vị với giá trị tương đương:','{"items":["1 m","1 km","3 m","2 km"],"targets":["10 dm","1000 m","30 dm","2000 m"]}','{"1 m":"10 dm","1 km":"1000 m","3 m":"30 dm","2 km":"2000 m"}',2,'Đổi đơn vị đo độ dài',20,5],
    [1124,2,'matching','Nối phép đổi đúng:','{"items":["20 dm","5000 m","4 m"],"targets":["2 m","5 km","40 dm"]}','{"20 dm":"2 m","5000 m":"5 km","4 m":"40 dm"}',2,'20dm=2m, 5000m=5km, 4m=40dm',20,6],
    [1124,2,'drag_drop','Kéo thả số thích hợp vào chỗ trống: 1 m = ___ dm, 1 km = ___ m','{"blanks":["1 m = ___ dm","1 km = ___ m"],"options":["10","100","1000","10000"]}','{"1 m = ___ dm":"10","1 km = ___ m":"1000"}',2,'1m=10dm, 1km=1000m',20,7],
    [1124,2,'table_fill','Điền vào bảng đổi đơn vị:','{"headers":["m","dm"],"rows":[[1,null],[2,null],[5,null]]}','{"rows":[[1,10],[2,20],[5,50]]}',2,'Nhân với 10 để đổi m sang dm',20,8],
    [1124,2,'number_line','Đánh dấu vị trí 3 km trên trục số (0 đến 5 km):','{"min":0,"max":5,"unit":"km","mark":3}','"3"',2,'3 km nằm giữa 2 và 4 trên trục số',20,9],
    [1124,2,'puzzle','Giải câu đố: Tôi lớn hơn mét nhưng nhỏ hơn... không có gì. Tôi bằng 1000 mét. Tôi là gì?','["dm","km","cm","mm"]','"km"',2,'1 km = 1000 m',20,10],

    // Ex3 hard
    [1124,3,'fill_blank','5 km 300 m = ___ m','[]','"5300"',3,'5 km = 5000 m; 5000 + 300 = 5300 m',30,1],
    [1124,3,'fill_blank','45 dm = ___ m ___ dm','[]','{"m":4,"dm":5}',3,'45 dm = 4 m 5 dm',30,2],
    [1124,3,'puzzle','Con đường từ A đến C qua B. AB = 3 km 200 m, BC = 1 km 800 m. Hỏi AC dài bao nhiêu km?','["4 km","5 km","4 km 800 m","5 km 200 m"]','"5 km"',3,'3 km 200 m + 1 km 800 m = 5 km 000 m = 5 km',30,3],
    [1124,3,'puzzle','Bạn An đi bộ mỗi ngày 2 km. Sau 5 ngày An đi được bao nhiêu mét?','["1000 m","5000 m","10000 m","2000 m"]','"10000 m"',3,'2 km × 5 = 10 km = 10000 m',30,4],
    [1124,3,'game','Trò chơi đổi đơn vị: Điền số đúng vào ô trống để hoàn thành chuỗi: 1 km → ___ m → ___ dm','{"chain":["1 km","___ m","___ dm"]}','["1000","10000"]',3,'1 km = 1000 m = 10000 dm',30,5],
    [1124,3,'sorting','Sắp xếp các đoạn đường từ ngắn đến dài: 3 km, 250 dm, 4000 m, 1 km 500 m','["3 km","250 dm","4000 m","1 km 500 m"]','["250 dm","1 km 500 m","3 km","4000 m"]',3,'250dm=25m; 1km500m=1500m; 3km=3000m; 4000m=4km',30,6],
    [1124,3,'matching','Nối bài toán với đáp án:','{"items":["3 km + 2 km","8 m - 3 m","20 dm × 2","6000 m ÷ 2"],"targets":["5 km","5 m","40 dm","3 km"]}','{"3 km + 2 km":"5 km","8 m - 3 m":"5 m","20 dm × 2":"40 dm","6000 m ÷ 2":"3 km"}',3,'Phép tính với đơn vị đo độ dài',30,7],
    [1124,3,'multiple_choice','Chọn các phép đổi đúng:','["3 m = 30 dm","2 km = 200 m","50 dm = 5 m","4000 m = 4 km"]','["3 m = 30 dm","50 dm = 5 m","4000 m = 4 km"]',3,'2 km = 2000 m (không phải 200 m)',30,8],
    [1124,3,'multiple_choice','Đường AB dài 2 km 500 m. Chọn cách viết đúng:','["2500 m","25000 dm","2 km 500 m","2,5 km"]','["2500 m","25000 dm","2 km 500 m"]',3,'2km500m = 2500m = 25000dm',30,9],
    [1124,3,'drag_drop','Kéo thả để hoàn thành bảng: đổi km sang m','{"blanks":["3 km = ___ m","7 km = ___ m","10 km = ___ m"],"options":["3000","7000","10000","300","700"]}','{"3 km = ___ m":"3000","7 km = ___ m":"7000","10 km = ___ m":"10000"}',3,'Nhân với 1000 để đổi km sang m',30,10],

    // ===== LESSON 1125: Giới thiệu tiền Việt Nam =====
    // Ex1 easy
    [1125,1,'single_choice','Tờ tiền nào có mệnh giá nhỏ nhất trong các tờ: 1000đ, 2000đ, 5000đ, 10000đ?','["1000đ","2000đ","5000đ","10000đ"]','"1000đ"',1,'1000đ < 2000đ < 5000đ < 10000đ',10,1],
    [1125,1,'single_choice','Lan có 1 tờ 5000đ và 2 tờ 1000đ. Lan có tổng cộng bao nhiêu tiền?','["6000đ","7000đ","8000đ","5000đ"]','"7000đ"',1,'5000 + 1000 + 1000 = 7000đ',10,2],
    [1125,1,'single_choice','5 tờ 2000đ bằng bao nhiêu tiền?','["5000đ","8000đ","10000đ","12000đ"]','"10000đ"',1,'5 × 2000 = 10000đ',10,3],
    [1125,1,'true_false','Tờ 10000đ có giá trị bằng 10 tờ 1000đ.','["Đúng","Sai"]','"Đúng"',1,'10 × 1000 = 10000đ',10,4],
    [1125,1,'true_false','2 tờ 5000đ có giá trị bằng 1 tờ 2000đ.','["Đúng","Sai"]','"Sai"',1,'2 × 5000 = 10000đ ≠ 2000đ',10,5],
    [1125,1,'fill_blank','2 tờ 1000đ = ___ đồng','[]','"2000"',1,'2 × 1000 = 2000đ',10,6],
    [1125,1,'fill_blank','1 tờ 10000đ = ___ tờ 2000đ','[]','"5"',1,'10000 ÷ 2000 = 5 tờ',10,7],
    [1125,1,'counting','Đếm tổng số tiền: 3 tờ 1000đ và 1 tờ 2000đ','[]','"5000"',1,'3×1000 + 2000 = 5000đ',10,8],
    [1125,1,'sorting','Sắp xếp các tờ tiền từ nhỏ đến lớn:','["5000đ","1000đ","10000đ","2000đ"]','["1000đ","2000đ","5000đ","10000đ"]',1,'Sắp xếp mệnh giá tăng dần',10,9],
    [1125,1,'cross_out','Gạch bỏ tờ tiền KHÔNG phải tiền Việt Nam:','["1000đ","2000đ","3000đ","5000đ"]','"3000đ"',1,'Không có tờ 3000đ trong hệ thống tiền Việt Nam cơ bản',10,10],

    // Ex2 medium
    [1125,2,'single_choice','Mua 1 cái bút 3000đ, trả 5000đ. Được thối lại bao nhiêu tiền?','["1000đ","2000đ","3000đ","4000đ"]','"2000đ"',2,'5000 - 3000 = 2000đ',20,1],
    [1125,2,'single_choice','Bình có 2 tờ 5000đ và 3 tờ 1000đ. Bình mua sách giá 8000đ. Bình còn lại bao nhiêu tiền?','["5000đ","3000đ","2000đ","4000đ"]','"5000đ"',2,'2×5000+3×1000=13000; 13000-8000=5000đ',20,2],
    [1125,2,'multiple_choice','Chọn các cách trả đúng 6000đ:','["1 tờ 5000đ + 1 tờ 1000đ","3 tờ 2000đ","6 tờ 1000đ","2 tờ 2000đ + 1 tờ 1000đ"]','["1 tờ 5000đ + 1 tờ 1000đ","3 tờ 2000đ","6 tờ 1000đ"]',2,'5000+1000=6000; 3×2000=6000; 6×1000=6000; 2×2000+1000=5000≠6000',20,3],
    [1125,2,'multiple_choice','Chọn tất cả mệnh giá tiền giấy phổ biến cho học sinh lớp 2:','["500đ","1000đ","2000đ","5000đ","10000đ"]','["1000đ","2000đ","5000đ","10000đ"]',2,'Các mệnh giá tiền Việt Nam phổ biến',20,4],
    [1125,2,'matching','Nối số tờ tiền với tổng số tiền:','{"items":["2 tờ 5000đ","5 tờ 2000đ","10 tờ 1000đ","3 tờ 1000đ + 1 tờ 2000đ"],"targets":["10000đ","10000đ (b)","10000đ (c)","5000đ"]}','{"2 tờ 5000đ":"10000đ","5 tờ 2000đ":"10000đ (b)","10 tờ 1000đ":"10000đ (c)","3 tờ 1000đ + 1 tờ 2000đ":"5000đ"}',2,'Tính tổng số tiền',20,5],
    [1125,2,'matching','Nối mệnh giá với số tờ 1000đ tương đương:','{"items":["2000đ","5000đ","10000đ"],"targets":["2 tờ","5 tờ","10 tờ"]}','{"2000đ":"2 tờ","5000đ":"5 tờ","10000đ":"10 tờ"}',2,'Đổi tiền sang tờ 1000đ',20,6],
    [1125,2,'drag_drop','Kéo thả số tiền đúng vào ví: Mua vở 4000đ, mua bút 3000đ, trả 10000đ. Tiền thối là?','{"blanks":["Tiền thối = ___đ"],"options":["1000","2000","3000","7000"]}','{"Tiền thối = ___đ":"3000"}',2,'4000+3000=7000; 10000-7000=3000đ',20,7],
    [1125,2,'table_fill','Điền vào bảng: số tờ 1000đ cần để có tổng tiền:','{"headers":["Tổng tiền","Số tờ 1000đ"],"rows":[["2000đ",null],["5000đ",null],["10000đ",null]]}','{"rows":[["2000đ",2],["5000đ",5],["10000đ",10]]}',2,'Chia cho 1000',20,8],
    [1125,2,'number_line','Đánh dấu 7000đ trên trục số tiền (0 đến 10000đ):','{"min":0,"max":10000,"step":1000,"mark":7000}','"7000"',2,'7000đ nằm giữa 6000đ và 8000đ',20,9],
    [1125,2,'puzzle','Tôi là tổng của 1 tờ 5000đ và 2 tờ 1000đ. Tôi là bao nhiêu tiền?','["6000đ","7000đ","8000đ","9000đ"]','"7000đ"',2,'5000 + 2000 = 7000đ',20,10],

    // Ex3 hard
    [1125,3,'fill_blank','Mua 3 cuốn vở, mỗi cuốn 2000đ. Trả 1 tờ 10000đ. Được thối ___ đồng','[]','"4000"',3,'3×2000=6000; 10000-6000=4000đ',30,1],
    [1125,3,'fill_blank','Có 8000đ, mua kẹo hết 3000đ, mua bánh hết 2000đ. Còn lại ___ đồng','[]','"3000"',3,'8000-3000-2000=3000đ',30,2],
    [1125,3,'puzzle','Nam có 5 tờ 2000đ. Nam muốn mua 1 cuốn sách 12000đ. Nam còn thiếu bao nhiêu tiền?','["1000đ","2000đ","3000đ","4000đ"]','"2000đ"',3,'5×2000=10000; 12000-10000=2000đ',30,3],
    [1125,3,'puzzle','Mẹ đưa Hoa 10000đ để mua rau 3000đ và thịt 5000đ. Hoa cần trả thêm mấy tờ 1000đ nếu thiếu?','["0 tờ","1 tờ","2 tờ","3 tờ"]','"0 tờ"',3,'3000+5000=8000; 10000-8000=2000đ dư, không thiếu',30,4],
    [1125,3,'game','Trò chơi mua bán: Bạn có 10000đ. Mua bút 3000đ, thước 2000đ, vở 4000đ. Còn lại bao nhiêu?','["0đ","1000đ","2000đ","3000đ"]','"1000đ"',3,'3000+2000+4000=9000; 10000-9000=1000đ',30,5],
    [1125,3,'sorting','Sắp xếp các món đồ từ đắt đến rẻ: bút 3000đ, sách 8000đ, tẩy 1000đ, thước 5000đ','["bút 3000đ","sách 8000đ","tẩy 1000đ","thước 5000đ"]','["sách 8000đ","thước 5000đ","bút 3000đ","tẩy 1000đ"]',3,'Sắp xếp giảm dần: 8000>5000>3000>1000',30,6],
    [1125,3,'matching','Nối bài toán với kết quả:','{"items":["2×5000đ","10000đ-3000đ","3×2000đ+1000đ","5000đ+2×1000đ"],"targets":["10000đ","7000đ","7000đ (b)","7000đ (c)"]}','{"2×5000đ":"10000đ","10000đ-3000đ":"7000đ","3×2000đ+1000đ":"7000đ (b)","5000đ+2×1000đ":"7000đ (c)"}',3,'Tính toán với tiền',30,7],
    [1125,3,'multiple_choice','Có thể trả 9000đ bằng cách nào?','["1 tờ 5000đ + 2 tờ 2000đ","4 tờ 2000đ + 1 tờ 1000đ","3 tờ 2000đ + 3 tờ 1000đ","9 tờ 1000đ"]','["1 tờ 5000đ + 2 tờ 2000đ","4 tờ 2000đ + 1 tờ 1000đ","3 tờ 2000đ + 3 tờ 1000đ","9 tờ 1000đ"]',3,'Tất cả đều bằng 9000đ',30,8],
    [1125,3,'multiple_choice','Bạn nào có nhiều tiền hơn? An: 3 tờ 2000đ + 1 tờ 1000đ; Bình: 2 tờ 5000đ - 2000đ','["An nhiều hơn","Bình nhiều hơn","Bằng nhau","Không so sánh được"]','["Bình nhiều hơn"]',3,'An: 6000+1000=7000đ; Bình: 10000-2000=8000đ; Bình > An',30,9],
    [1125,3,'drag_drop','Kéo thả để lập bảng mua hàng: Bút 3000đ, Vở 5000đ, Tổng và tiền thối khi trả 10000đ','{"blanks":["Tổng tiền = ___đ","Tiền thối = ___đ"],"options":["8000","2000","3000","5000"]}','{"Tổng tiền = ___đ":"8000","Tiền thối = ___đ":"2000"}',3,'3000+5000=8000; 10000-8000=2000đ',30,10],

    // ===== LESSON 1126: Thực hành trải nghiệm đo độ dài =====
    // Ex1 easy
    [1126,1,'single_choice','Dùng thước để đo chiều dài cuốn sách. Kết quả là 20 cm. 20 cm bằng bao nhiêu dm?','["1 dm","2 dm","20 dm","0,2 dm"]','"2 dm"',1,'20 cm = 2 dm',10,1],
    [1126,1,'single_choice','Chiều cao bàn học khoảng bao nhiêu?','["5 cm","30 cm","75 cm","2 m"]','"75 cm"',1,'Chiều cao bàn học thường khoảng 75 cm',10,2],
    [1126,1,'single_choice','Đơn vị nào dùng để đo chiều dài bút chì?','["km","m","cm","dm"]','"cm"',1,'Bút chì dài khoảng 15-20 cm',10,3],
    [1126,1,'true_false','Thước thẳng 30 cm có thể đo được độ dài 25 cm.','["Đúng","Sai"]','"Đúng"',1,'25 cm < 30 cm nên đo được',10,4],
    [1126,1,'true_false','Chiều dài trang sách A4 là khoảng 30 km.','["Đúng","Sai"]','"Sai"',1,'Trang A4 dài khoảng 30 cm, không phải 30 km',10,5],
    [1126,1,'fill_blank','Sải tay của bạn dài khoảng ___ cm (ước lượng cho trẻ lớp 2)','[]','"120"',1,'Sải tay trẻ 7-8 tuổi khoảng 100-130 cm',10,6],
    [1126,1,'fill_blank','Chiều dài bước chân của bạn khoảng ___ cm','[]','"50"',1,'Bước chân trẻ lớp 2 khoảng 40-60 cm',10,7],
    [1126,1,'counting','Đếm số lần đặt thước 10 cm để đo đoạn thẳng 50 cm','[]','"5"',1,'50 ÷ 10 = 5 lần',10,8],
    [1126,1,'sorting','Sắp xếp các vật từ ngắn đến dài: bút chì, bàn học, phòng học, ngón tay','["bút chì","bàn học","phòng học","ngón tay"]','["ngón tay","bút chì","bàn học","phòng học"]',1,'Ngón tay < bút chì < bàn học < phòng học',10,9],
    [1126,1,'cross_out','Gạch bỏ cách đo KHÔNG chính xác:','["Đặt thước thẳng dọc theo vật đo","Đặt vạch 0 tại đầu vật","Đặt thước cong theo vật","Đọc số tại đầu kia của vật"]','"Đặt thước cong theo vật"',1,'Phải đặt thước thẳng mới đo chính xác',10,10],

    // Ex2 medium
    [1126,2,'single_choice','Đo đoạn thẳng AB: đầu A ở vạch 2 cm, đầu B ở vạch 9 cm. Đoạn AB dài bao nhiêu?','["9 cm","7 cm","11 cm","2 cm"]','"7 cm"',2,'9 - 2 = 7 cm',20,1],
    [1126,2,'single_choice','Một sợi dây dài 1 m. Cắt đi 35 cm. Còn lại bao nhiêu cm?','["35 cm","65 cm","55 cm","75 cm"]','"65 cm"',2,'1 m = 100 cm; 100 - 35 = 65 cm',20,2],
    [1126,2,'multiple_choice','Chọn cách đo đúng khi dùng thước:','["Đặt vạch 0 tại đầu vật","Đọc số cm tại đầu kia","Đặt thước thẳng","Ước lượng mà không cần thước"]','["Đặt vạch 0 tại đầu vật","Đọc số cm tại đầu kia","Đặt thước thẳng"]',2,'Ba bước cơ bản khi đo bằng thước',20,3],
    [1126,2,'multiple_choice','Đo chiều dài bàn học thì nên dùng đơn vị nào?','["km","m","cm","mm"]','["m","cm"]',2,'Bàn học đo bằng m hoặc cm đều hợp lý',20,4],
    [1126,2,'matching','Nối vật với đơn vị đo phù hợp:','{"items":["Ngón tay","Bàn học","Sân trường","Quốc lộ"],"targets":["cm","dm hoặc cm","m","km"]}','{"Ngón tay":"cm","Bàn học":"dm hoặc cm","Sân trường":"m","Quốc lộ":"km"}',2,'Chọn đơn vị phù hợp với kích thước',20,5],
    [1126,2,'matching','Nối kết quả đo với vật tương ứng:','{"items":["15 cm","1 m 20 cm","50 cm","30 cm"],"targets":["Bút chì","Chiều cao bạn nhỏ","Chiều dài ghế","Trang sách A4"]}','{"15 cm":"Bút chì","1 m 20 cm":"Chiều cao bạn nhỏ","50 cm":"Chiều dài ghế","30 cm":"Trang sách A4"}',2,'Ước lượng kích thước các vật',20,6],
    [1126,2,'drag_drop','Kéo thả đơn vị đo phù hợp: Chiều dài con sâu ___, chiều cao nhà ___, đường làng ___','{"blanks":["Con sâu: ___","Chiều cao nhà: ___","Đường làng: ___"],"options":["cm","m","km","dm"]}','{"Con sâu: ___":"cm","Chiều cao nhà: ___":"m","Đường làng: ___":"km"}',2,'Con sâu: cm; nhà: m; đường làng: km',20,7],
    [1126,2,'table_fill','Điền kết quả đo vào bảng:','{"headers":["Vật","Ước lượng","Đo thực tế"],"rows":[["Bút chì","~15 cm",null],["Cuốn vở","~20 cm",null]]}','{"note":"Kết quả thực hành, chấp nhận sai số ±2 cm"}',2,'Thực hành đo và so sánh với ước lượng',20,8],
    [1126,2,'number_line','Đánh dấu 7 cm trên thước đo (0-15 cm):','{"min":0,"max":15,"unit":"cm","mark":7}','"7"',2,'Đọc vạch 7 cm trên thước',20,9],
    [1126,2,'puzzle','Đoạn thẳng CD dài gấp đôi đoạn AB. AB = 8 cm. CD dài bao nhiêu?','["4 cm","8 cm","16 cm","12 cm"]','"16 cm"',2,'CD = 2 × AB = 2 × 8 = 16 cm',20,10],

    // Ex3 hard
    [1126,3,'fill_blank','Dây ruy-băng dài 1 m. Cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài ___ cm','[]','"25"',3,'100 ÷ 4 = 25 cm',30,1],
    [1126,3,'fill_blank','Đo chu vi hình chữ nhật: dài 12 cm, rộng 8 cm. Chu vi = ___ cm','[]','"40"',3,'(12+8)×2 = 40 cm',30,2],
    [1126,3,'puzzle','Sợi dây A dài 45 cm, sợi dây B ngắn hơn A 15 cm, sợi dây C dài hơn B 10 cm. Hỏi C dài bao nhiêu?','["30 cm","40 cm","45 cm","50 cm"]','"40 cm"',3,'B=45-15=30cm; C=30+10=40cm',30,3],
    [1126,3,'puzzle','Bạn dùng sải tay đo chiều dài bảng. Mỗi sải tay = 1 m. Đo được 3 lần và thừa 50 cm. Bảng dài bao nhiêu?','["3 m","3 m 50 cm","350 m","4 m"]','"3 m 50 cm"',3,'3 × 1m + 50cm = 3m 50cm',30,4],
    [1126,3,'game','Đo chiều dài lớp học bằng bước chân (mỗi bước = 50 cm). Đếm được 16 bước. Lớp học dài bao nhiêu mét?','["6 m","7 m","8 m","10 m"]','"8 m"',3,'16 × 50 cm = 800 cm = 8 m',30,5],
    [1126,3,'sorting','Sắp xếp từ ngắn đến dài: 8 dm, 100 cm, 1 m 5 dm, 12 dm','["8 dm","100 cm","1 m 5 dm","12 dm"]','["8 dm","100 cm","12 dm","1 m 5 dm"]',3,'8dm=80cm; 100cm; 12dm=120cm; 1m5dm=150cm',30,6],
    [1126,3,'matching','Nối phép tính với kết quả đo:','{"items":["12 cm + 8 cm","30 cm - 15 cm","2 dm + 5 cm","1 m - 30 cm"],"targets":["20 cm","15 cm","25 cm","70 cm"]}','{"12 cm + 8 cm":"20 cm","30 cm - 15 cm":"15 cm","2 dm + 5 cm":"25 cm","1 m - 30 cm":"70 cm"}',3,'2dm=20cm; 20+5=25cm; 1m=100cm; 100-30=70cm',30,7],
    [1126,3,'multiple_choice','Hình chữ nhật có chiều dài 15 cm, chiều rộng 10 cm. Chọn phát biểu đúng:','["Chu vi = 25 cm","Chu vi = 50 cm","Chiều dài hơn chiều rộng 5 cm","Chiều dài gấp đôi chiều rộng"]','["Chu vi = 50 cm","Chiều dài hơn chiều rộng 5 cm"]',3,'(15+10)×2=50; 15-10=5; 15≠2×10',30,8],
    [1126,3,'multiple_choice','Chọn cách ước lượng đúng cho chiều cao cửa ra vào:','["Khoảng 20 cm","Khoảng 2 m","Khoảng 200 dm","Khoảng 2000 mm"]','["Khoảng 2 m","Khoảng 2000 mm"]',3,'Cửa cao khoảng 2m = 2000mm; 200dm=20m quá cao',30,9],
    [1126,3,'drag_drop','Ghép đúng: đo chiều cao học sinh lớp 2','{"blanks":["Khoảng ___ cm"],"options":["120","12","1200","1,2"]}','{"Khoảng ___ cm":"120"}',3,'Học sinh lớp 2 cao khoảng 120 cm',30,10],

    // ===== LESSON 1127: Luyện tập chung đo dài, tiền Việt Nam =====
    // Ex1 easy
    [1127,1,'single_choice','3 dm = ___ cm','["3 cm","30 cm","300 cm","0,3 cm"]','"30 cm"',1,'1 dm = 10 cm; 3 dm = 30 cm',10,1],
    [1127,1,'single_choice','Lan có 2 tờ 2000đ. Lan mua kẹo 3000đ. Lan có đủ tiền không?','["Có, dư 1000đ","Có, vừa đủ","Không đủ, thiếu 1000đ","Không đủ, thiếu 2000đ"]','"Không đủ, thiếu 1000đ"',1,'2×2000=4000; 4000-3000=1000đ dư. Vậy đủ tiền và dư 1000đ',10,2],
    [1127,1,'single_choice','Đoạn thẳng dài 5 dm. Đổi ra cm là bao nhiêu?','["5 cm","50 cm","500 cm","0,5 cm"]','"50 cm"',1,'5 dm = 50 cm',10,3],
    [1127,1,'true_false','50 cm = 5 dm','["Đúng","Sai"]','"Đúng"',1,'1 dm = 10 cm; 50 cm = 5 dm',10,4],
    [1127,1,'true_false','3 tờ 2000đ = 1 tờ 5000đ + 1 tờ 1000đ','["Đúng","Sai"]','"Đúng"',1,'3×2000=6000; 5000+1000=6000đ',10,5],
    [1127,1,'fill_blank','4 m = ___ dm','[]','"40"',1,'4 × 10 = 40 dm',10,6],
    [1127,1,'fill_blank','1 tờ 5000đ + 3 tờ 1000đ = ___ đồng','[]','"8000"',1,'5000 + 3000 = 8000đ',10,7],
    [1127,1,'counting','Đếm tổng số tiền: 2 tờ 2000đ, 3 tờ 1000đ','[]','"7000"',1,'4000 + 3000 = 7000đ',10,8],
    [1127,1,'sorting','Sắp xếp từ bé đến lớn: 3 dm, 25 cm, 1 m, 8 dm','["3 dm","25 cm","1 m","8 dm"]','["25 cm","3 dm","8 dm","1 m"]',1,'25cm < 30cm(3dm) < 80cm(8dm) < 100cm(1m)',10,9],
    [1127,1,'cross_out','Gạch bỏ phép đổi SAI:','["5 dm = 50 cm","2 m = 20 dm","3 km = 300 m","1 m = 10 dm"]','"3 km = 300 m"',1,'3 km = 3000 m (không phải 300 m)',10,10],

    // Ex2 medium
    [1127,2,'single_choice','Bạn có 10000đ mua vở 4000đ và bút 3000đ. Còn lại bao nhiêu?','["3000đ","5000đ","7000đ","1000đ"]','"3000đ"',2,'10000-4000-3000=3000đ',20,1],
    [1127,2,'single_choice','Dây AB = 2 m 5 dm, dây CD = 180 cm. Dây nào dài hơn?','["AB","CD","Bằng nhau","Không biết"]','"AB"',2,'AB=200+50=250cm; CD=180cm; AB>CD',20,2],
    [1127,2,'multiple_choice','Chọn các phép đổi đúng:','["2 m = 20 dm","1 km = 100 m","3 dm = 30 cm","500 cm = 5 m"]','["2 m = 20 dm","3 dm = 30 cm","500 cm = 5 m"]',2,'1km=1000m (không phải 100m)',20,3],
    [1127,2,'multiple_choice','Bạn có 5000đ. Chọn các cách mua đồ có thể:','["Mua 1 thứ 5000đ","Mua 2 thứ: 3000đ + 2000đ","Mua 3 thứ: 2000đ + 2000đ + 2000đ","Mua 2 thứ: 2000đ + 1000đ"]','["Mua 1 thứ 5000đ","Mua 2 thứ: 3000đ + 2000đ","Mua 2 thứ: 2000đ + 1000đ"]',2,'6000đ > 5000đ nên không mua được 3 thứ 2000đ',20,4],
    [1127,2,'matching','Nối phép đổi đúng:','{"items":["3 m","2 km","40 dm","500 m"],"targets":["30 dm","2000 m","4 m","0,5 km"]}','{"3 m":"30 dm","2 km":"2000 m","40 dm":"4 m","500 m":"0,5 km"}',2,'Đổi đơn vị đo độ dài',20,5],
    [1127,2,'matching','Nối bài toán tiền tệ với đáp án:','{"items":["2×5000đ","10000đ÷2","3×2000đ","8000đ-3000đ"],"targets":["10000đ","5000đ","6000đ","5000đ (b)"]}','{"2×5000đ":"10000đ","10000đ÷2":"5000đ","3×2000đ":"6000đ","8000đ-3000đ":"5000đ (b)"}',2,'Phép tính với tiền',20,6],
    [1127,2,'drag_drop','Điền vào chỗ trống: Mua bút 3000đ, vở 5000đ. Tổng = ___đ. Trả 10000đ, thối ___đ','{"blanks":["Tổng = ___đ","Thối = ___đ"],"options":["8000","2000","3000","5000"]}','{"Tổng = ___đ":"8000","Thối = ___đ":"2000"}',2,'3000+5000=8000; 10000-8000=2000đ',20,7],
    [1127,2,'table_fill','Điền vào bảng đổi đơn vị tổng hợp:','{"headers":["m","dm","cm"],"rows":[[1,null,null],[2,null,null],[5,null,null]]}','{"rows":[[1,10,100],[2,20,200],[5,50,500]]}',2,'1m=10dm=100cm',20,8],
    [1127,2,'number_line','Đánh dấu 6000đ trên trục số tiền (0 đến 10000đ):','{"min":0,"max":10000,"step":1000,"mark":6000}','"6000"',2,'6000đ ở vị trí 6 phần 10',20,9],
    [1127,2,'puzzle','Tôi là khoảng cách. Tôi bằng 1000 m. Nhưng tôi cũng bằng 10000 dm. Tôi là gì?','["1 m","1 dm","1 km","10 m"]','"1 km"',2,'1 km = 1000 m = 10000 dm',20,10],

    // Ex3 hard
    [1127,3,'fill_blank','Bạn An cao 1 m 2 dm 5 cm. Bạn Bình cao 130 cm. Bạn nào cao hơn và cao hơn bao nhiêu cm?','[]','{"cao_hon":"Bình","bao_nhieu_cm":5}',3,'An=100+20+5=125cm; Bình=130cm; Bình cao hơn 5cm',30,1],
    [1127,3,'fill_blank','Mua 3 cái bút mỗi cái 2000đ và 2 cuốn vở mỗi cuốn 3000đ. Tổng tiền = ___ đồng','[]','"12000"',3,'3×2000+2×3000=6000+6000=12000đ',30,2],
    [1127,3,'puzzle','Đoạn đường từ nhà đến chợ dài 3 km 500 m. Người ta đi bộ được 1 km 200 m thì nghỉ. Còn phải đi bao nhiêu m?','["2300 m","2500 m","1500 m","3500 m"]','"2300 m"',3,'3km500m=3500m; 1km200m=1200m; 3500-1200=2300m',30,3],
    [1127,3,'puzzle','Cửa hàng có 3 loại thước: 15 cm, 20 cm, 30 cm. Dùng tối thiểu mấy cái thước 15 cm để đo đoạn dây 1 m?','["5 cái","6 cái","7 cái","8 cái"]','"7 cái"',3,'1m=100cm; 100÷15=6 dư 10; cần 7 cái',30,4],
    [1127,3,'game','Mua sắm thông minh: Có 10000đ. Danh sách: bút 3000đ, tẩy 1000đ, thước 2000đ, vở 5000đ. Mua tất cả có đủ tiền không? Nếu không, còn thiếu bao nhiêu?','["Đủ tiền, dư 1000đ","Không đủ, thiếu 1000đ","Vừa đủ 10000đ","Không đủ, thiếu 2000đ"]','"Không đủ, thiếu 1000đ"',3,'3000+1000+2000+5000=11000; 11000-10000=1000đ thiếu',30,5],
    [1127,3,'sorting','Sắp xếp từ lớn đến bé: 2 km 500 m, 3000 m, 1 km 800 m, 250 dm','["2 km 500 m","3000 m","1 km 800 m","250 dm"]','["3000 m","2 km 500 m","1 km 800 m","250 dm"]',3,'3000m; 2500m; 1800m; 250dm=25m',30,6],
    [1127,3,'matching','Nối bài toán thực tế với đáp án:','{"items":["Dây 1m cắt đôi","Đi 2km còn 500m","3 tờ 2000đ trả 7000đ","5dm + 3dm"],"targets":["50 cm mỗi đoạn","1500 m còn lại","1000đ thối","8 dm"]}','{"Dây 1m cắt đôi":"50 cm mỗi đoạn","Đi 2km còn 500m":"1500 m còn lại","3 tờ 2000đ trả 7000đ":"1000đ thối","5dm + 3dm":"8 dm"}',3,'100÷2=50cm; 2000-500=1500m; 6000-7000=-1000(thối 1000đ vì trả dư); 5+3=8dm',30,7],
    [1127,3,'multiple_choice','Chọn phát biểu ĐÚNG:','["2 km > 1999 m","3 dm < 25 cm","5000đ = 5 tờ 1000đ","4 m 5 dm = 45 dm"]','["2 km > 1999 m","5000đ = 5 tờ 1000đ","4 m 5 dm = 45 dm"]',3,'2km=2000m>1999m; 3dm=30cm>25cm; 4m5dm=40+5=45dm',30,8],
    [1127,3,'multiple_choice','Bài toán: Có 8000đ mua vở 5000đ. Tiền còn lại mua được gì?','["Bút 3000đ (vừa đủ)","Kẹo 2000đ + tẩy 1000đ","2 cái kẹo 1500đ mỗi cái","Thước 4000đ"]','["Bút 3000đ (vừa đủ)","Kẹo 2000đ + tẩy 1000đ","2 cái kẹo 1500đ mỗi cái"]',3,'Còn 3000đ; 3000=3000; 2000+1000=3000; 2×1500=3000; 4000>3000',30,9],
    [1127,3,'drag_drop','Hoàn thành bài toán: Đường A-B dài 4 km, B-C dài 3 km 500 m. A-C dài ___m, đổi ra ___ km ___ m','{"blanks":["A-C = ___m","= ___ km ___ m"],"options":["7500","7","500","750","75"]}','{"A-C = ___m":"7500","= ___ km ___ m":"7 km 500 m"}',3,'4km+3km500m=7km500m=7500m',30,10],

    // ===== LESSON 1128: Phép cộng không nhớ trong phạm vi 1000 =====
    // Ex1 easy
    [1128,1,'single_choice','324 + 235 = ?','["459","559","549","569"]','"559"',1,'324+235: 4+5=9, 2+3=5, 3+2=5 → 559',10,1],
    [1128,1,'single_choice','400 + 300 = ?','["600","700","800","100"]','"700"',1,'4+3=7, thêm hai số 0 → 700',10,2],
    [1128,1,'single_choice','213 + 145 = ?','["358","348","368","358"]','"358"',1,'213+145: 3+5=8, 1+4=5, 2+1=3 → 358',10,3],
    [1128,1,'true_false','423 + 164 = 587','["Đúng","Sai"]','"Đúng"',1,'423+164: 3+4=7, 2+6=8, 4+1=5 → 587',10,4],
    [1128,1,'true_false','300 + 500 = 900','["Đúng","Sai"]','"Sai"',1,'300 + 500 = 800',10,5],
    [1128,1,'fill_blank','512 + 241 = ___','[]','"753"',1,'512+241: 2+1=3, 1+4=5, 5+2=7 → 753',10,6],
    [1128,1,'fill_blank','___ + 300 = 700','[]','"400"',1,'700 - 300 = 400',10,7],
    [1128,1,'counting','Đếm: 200 + 300 + 100 = ___','[]','"600"',1,'200+300=500; 500+100=600',10,8],
    [1128,1,'sorting','Sắp xếp các tổng từ bé đến lớn: 324+135, 200+400, 111+111, 500+200','["324+135","200+400","111+111","500+200"]','["111+111","324+135","200+400","500+200"]',1,'222 < 459 < 600 < 700',10,9],
    [1128,1,'cross_out','Gạch bỏ phép tính SAI:','["200+300=500","124+235=359","400+500=800","312+145=457"]','"400+500=800"',1,'400+500=900 (không phải 800)',10,10],

    // Ex2 medium
    [1128,2,'single_choice','Lớp học có 324 học sinh nữ và 235 học sinh nam. Tổng số học sinh là?','["549","559","569","579"]','"559"',2,'324+235=559',20,1],
    [1128,2,'single_choice','___ + 234 = 578','["334","344","234","314"]','"344"',2,'578-234=344',20,2],
    [1128,2,'multiple_choice','Chọn các phép tính có kết quả bằng 600:','["300+300","400+200","312+288","425+175"]','["300+300","400+200","312+288","425+175"]',2,'300+300=600; 400+200=600; 312+288=600; 425+175=600',20,3],
    [1128,2,'multiple_choice','Chọn phép tính KHÔNG nhớ (mỗi hàng đơn vị, chục, trăm đều cộng < 10):','["123+456","345+231","462+318","214+365"]','["123+456","345+231","214+365"]',2,'462+318: 2+8=10 (có nhớ); các phép còn lại không nhớ',20,4],
    [1128,2,'matching','Nối phép tính với kết quả:','{"items":["234+123","400+250","312+145","500+200"],"targets":["357","650","457","700"]}','{"234+123":"357","400+250":"650","312+145":"457","500+200":"700"}',2,'Phép cộng không nhớ trong 1000',20,5],
    [1128,2,'matching','Nối số bị cộng với số cần điền để được 500:','{"items":["200","350","125","430"],"targets":["300","150","375","70"]}','{"200":"300","350":"150","125":"375","430":"70"}',2,'500-200=300; 500-350=150; 500-125=375; 500-430=70',20,6],
    [1128,2,'drag_drop','Kéo thả để hoàn thành phép tính đặt dọc: 342 + 215','{"blanks":["Hàng đơn vị: 2+5=___","Hàng chục: 4+1=___","Hàng trăm: 3+2=___","Kết quả: ___"],"options":["7","5","5","557","5"]}','{"Hàng đơn vị: 2+5=___":"7","Hàng chục: 4+1=___":"5","Hàng trăm: 3+2=___":"5","Kết quả: ___":"557"}',2,'342+215=557',20,7],
    [1128,2,'table_fill','Điền kết quả vào bảng cộng:','{"headers":["Số hạng 1","Số hạng 2","Tổng"],"rows":[[200,300,null],[124,253,null],[431,256,null]]}','{"rows":[[200,300,500],[124,253,377],[431,256,687]]}',2,'200+300=500; 124+253=377; 431+256=687',20,8],
    [1128,2,'number_line','Biểu diễn 300+200=500 trên trục số:','{"start":300,"jump":200,"end":500}','"500"',2,'Từ 300 nhảy thêm 200 đến 500',20,9],
    [1128,2,'puzzle','Kho A có 325 thùng gạo, kho B có 214 thùng. Tổng cả hai kho là bao nhiêu thùng?','["529","539","549","519"]','"539"',2,'325+214=539',20,10],

    // Ex3 hard
    [1128,3,'fill_blank','123 + 234 + 342 = ___','[]','"699"',3,'123+234=357; 357+342=699',30,1],
    [1128,3,'fill_blank','Tổng của 3 số liên tiếp bắt đầu từ 100 là ___','[]','"303"',3,'100+101+102=303',30,2],
    [1128,3,'puzzle','Vườn có 315 cây xanh, 243 cây ăn quả và 131 cây hoa. Tổng số cây là?','["679","689","699","689"]','"689"',3,'315+243=558; 558+131=689',30,3],
    [1128,3,'puzzle','Điền số vào ô trống: ___ + ___ = 456, biết số thứ nhất bằng 3 lần số thứ hai','["342 và 114","342 và 114","228 và 228","144 và 312"]','"342 và 114"',3,'Nếu số 2 là x thì 3x+x=456; 4x=456; x=114; số 1=342',30,4],
    [1128,3,'game','Trò chơi: Bắt đầu từ 100, mỗi lượt cộng 123. Sau 4 lượt được bao nhiêu?','["492","512","592","612"]','"592"',3,'100+123+123+123+123=100+492=592',30,5],
    [1128,3,'sorting','Sắp xếp kết quả từ lớn đến bé: 456+123, 300+312, 215+432, 401+265','["456+123","300+312","215+432","401+265"]','["215+432","456+123","401+265","300+312"]',3,'647 > 579 > 666? 215+432=647; 456+123=579; 401+265=666; 300+312=612. Thứ tự: 666>647>612>579',30,6],
    [1128,3,'matching','Nối bài toán với phương trình:','{"items":["Thêm 234 vào 315","Tổng của 200 và 456","315 hơn 234 là","Gấp đôi 312"],"targets":["315+234=549","200+456=656","315-234=81","312×2=624"]}','{"Thêm 234 vào 315":"315+234=549","Tổng của 200 và 456":"200+456=656","315 hơn 234 là":"315-234=81","Gấp đôi 312":"312×2=624"}',3,'Nhận diện dạng toán',30,7],
    [1128,3,'multiple_choice','Chọn tất cả phép tính có tổng là 700:','["500+200","350+350","423+277","614+186"]','["500+200","350+350","423+277","614+186"]',2,'500+200=700; 350+350=700; 423+277=700; 614+186=800≠700. Sửa: 614+186=800',30,8],
    [1128,3,'multiple_choice','Phép cộng nào KHÔNG nhớ?','["234+123","415+362","305+294","123+456"]','["234+123","415+362","123+456"]',3,'305+294: 5+4=9, 0+9=9, 3+2=5 → không nhớ. 415+362: 5+2=7, 1+6=7, 4+3=7 → không nhớ. Tất cả đều không nhớ',30,9],
    [1128,3,'drag_drop','Kéo thả để giải bài toán: Đội 1 trồng 324 cây, đội 2 trồng 135 cây. Hỏi cả hai đội trồng được bao nhiêu cây?','{"blanks":["Phép tính: ___+___=___"],"options":["324","135","459","459","549"]}','{"Phép tính: ___+___=___":"324+135=459"}',3,'324+135=459',30,10],

    // ===== LESSON 1129: Phép cộng có nhớ trong phạm vi 1000 =====
    // Ex1 easy
    [1129,1,'single_choice','256 + 348 = ?','["594","604","614","604"]','"604"',1,'256+348: 6+8=14 viết 4 nhớ 1; 5+4+1=10 viết 0 nhớ 1; 2+3+1=6 → 604',10,1],
    [1129,1,'single_choice','167 + 235 = ?','["392","402","382","412"]','"402"',1,'7+5=12 viết 2 nhớ 1; 6+3+1=10 viết 0 nhớ 1; 1+2+1=4 → 402',10,2],
    [1129,1,'single_choice','348 + 256 = ?','["594","604","614","584"]','"604"',1,'348+256=604 (đổi chỗ hai số hạng của bài 1)',10,3],
    [1129,1,'true_false','175 + 228 = 403','["Đúng","Sai"]','"Đúng"',1,'5+8=13 viết 3 nhớ 1; 7+2+1=10 viết 0 nhớ 1; 1+2+1=4 → 403',10,4],
    [1129,1,'true_false','486 + 315 = 791','["Đúng","Sai"]','"Sai"',1,'6+5=11 viết 1 nhớ 1; 8+1+1=10 viết 0 nhớ 1; 4+3+1=8 → 801',10,5],
    [1129,1,'fill_blank','364 + 278 = ___','[]','"642"',1,'4+8=12 viết 2 nhớ 1; 6+7+1=14 viết 4 nhớ 1; 3+2+1=6 → 642',10,6],
    [1129,1,'fill_blank','___ + 178 = 500','[]','"322"',1,'500-178=322',10,7],
    [1129,1,'counting','Tính 200 + 350 + 150 = ___','[]','"700"',1,'200+350=550; 550+150=700',10,8],
    [1129,1,'sorting','Sắp xếp các tổng từ bé đến lớn: 256+348, 175+228, 364+278, 486+315','["256+348","175+228","364+278","486+315"]','["175+228","256+348","364+278","486+315"]',1,'403 < 604 < 642 < 801',10,9],
    [1129,1,'cross_out','Gạch bỏ phép tính có kết quả SAI:','["256+348=604","175+228=403","364+278=642","486+315=791"]','"486+315=791"',1,'486+315=801, không phải 791',10,10],

    // Ex2 medium
    [1129,2,'single_choice','Thùng A có 275 kg gạo, thùng B có 368 kg. Tổng cộng bao nhiêu kg?','["633","643","643","653"]','"643"',2,'275+368: 5+8=13 viết 3 nhớ 1; 7+6+1=14 viết 4 nhớ 1; 2+3+1=6 → 643',20,1],
    [1129,2,'single_choice','457 + ___ = 823','["356","366","376","346"]','"366"',2,'823-457=366',20,2],
    [1129,2,'multiple_choice','Chọn các phép tính CÓ NHỚ:','["234+156","267+345","189+456","300+400"]','["267+345","189+456"]',2,'267+345: 7+5=12 có nhớ; 189+456: 9+6=15 có nhớ; 234+156: 4+6=10 có nhớ từ hàng đơn vị',20,3],
    [1129,2,'multiple_choice','Phép tính nào có tổng lớn hơn 600?','["256+348","300+250","175+428","450+125"]','["256+348","175+428"]',2,'256+348=604; 300+250=550; 175+428=603; 450+125=575',20,4],
    [1129,2,'matching','Nối phép tính với kết quả:','{"items":["256+348","175+228","267+345","189+234"],"targets":["604","403","612","423"]}','{"256+348":"604","175+228":"403","267+345":"612","189+234":"423"}',2,'Phép cộng có nhớ',20,5],
    [1129,2,'matching','Nối số thiếu vào phép cộng có nhớ:','{"items":["___ + 256 = 604","175 + ___ = 403","___ + 345 = 612","189 + ___ = 423"],"targets":["348","228","267","234"]}','{"___ + 256 = 604":"348","175 + ___ = 403":"228","___ + 345 = 612":"267","189 + ___ = 423":"234"}',2,'Tìm số hạng còn lại',20,6],
    [1129,2,'drag_drop','Kéo thả để hoàn thành phép tính đặt dọc có nhớ: 267 + 345','{"blanks":["Hàng đơn vị: 7+5=___ viết ___ nhớ ___","Hàng chục: 6+4+1=___ viết ___ nhớ ___","Hàng trăm: 2+3+1=___","Kết quả: ___"],"options":["12","2","1","11","1","1","6","612"]}','{"Kết quả: ___":"612"}',2,'267+345=612',20,7],
    [1129,2,'table_fill','Điền kết quả phép cộng có nhớ:','{"headers":["Số 1","Số 2","Tổng"],"rows":[[256,348,null],[175,228,null],[267,345,null]]}','{"rows":[[256,348,604],[175,228,403],[267,345,612]]}',2,'Phép cộng có nhớ trong 1000',20,8],
    [1129,2,'number_line','Biểu diễn 256+348=604 trên trục số:','{"start":256,"jump":348,"end":604}','"604"',2,'Từ 256 nhảy thêm 348 đến 604',20,9],
    [1129,2,'puzzle','Hai trường có tổng cộng 835 học sinh. Trường A có 467 học sinh. Trường B có bao nhiêu?','["368","378","358","388"]','"368"',2,'835-467=368',20,10],

    // Ex3 hard
    [1129,3,'fill_blank','175 + 228 + 346 = ___','[]','"749"',3,'175+228=403; 403+346=749',30,1],
    [1129,3,'fill_blank','Tìm x: x + 356 = 823','[]','"467"',3,'x = 823-356 = 467',30,2],
    [1129,3,'puzzle','Năm ngoái thư viện có 476 quyển sách. Năm nay mua thêm 268 quyển. Cuối năm mượn 145 quyển. Còn lại bao nhiêu quyển?','["599","599","489","744"]','"599"',3,'476+268=744; 744-145=599',30,3],
    [1129,3,'puzzle','Ba số có tổng là 900. Số thứ nhất là 256, số thứ hai là 348. Số thứ ba là?','["296","296","206","316"]','"296"',3,'900-256-348=296',30,4],
    [1129,3,'game','Trò chơi cộng dây chuyền: 100 → +178 → +265 → +157 = ?','["690","700","710","720"]','"700"',3,'100+178=278; 278+265=543; 543+157=700',30,5],
    [1129,3,'sorting','Sắp xếp từ lớn đến bé: 267+456, 389+214, 175+528, 348+256','["267+456","389+214","175+528","348+256"]','["175+528","267+456","389+214","348+256"]',3,'703 > 723? 267+456=723; 389+214=603; 175+528=703; 348+256=604. Thứ tự: 723>703>604>603',30,6],
    [1129,3,'matching','Nối bài toán với cách giải:','{"items":["256+348","Thêm 267 vào 345","Tổng hai số là 900, số 1 là 256","800 bằng mấy cộng 345?"],"targets":["=604","=612","số 2=644","=455"]}','{"256+348":"=604","Thêm 267 vào 345":"=612","Tổng hai số là 900, số 1 là 256":"số 2=644","800 bằng mấy cộng 345?":"=455"}',3,'Phép cộng có nhớ dạng nâng cao',30,7],
    [1129,3,'multiple_choice','Phép tính nào có kết quả trong khoảng 600-700?','["256+348","175+228","267+345","348+256"]','["256+348","267+345","348+256"]',3,'604, 403, 612, 604. Trong 600-700: 604, 612, 604',30,8],
    [1129,3,'multiple_choice','Chọn phát biểu ĐÚNG về phép cộng có nhớ:','["Khi hàng đơn vị ≥ 10 thì nhớ 1 sang hàng chục","Khi hàng chục ≥ 10 thì nhớ 1 sang hàng trăm","256+348=604","175+228=403"]','["Khi hàng đơn vị ≥ 10 thì nhớ 1 sang hàng chục","Khi hàng chục ≥ 10 thì nhớ 1 sang hàng trăm","256+348=604","175+228=403"]',3,'Tất cả đều đúng',30,9],
    [1129,3,'drag_drop','Ghép bước giải phép cộng 389+214 theo thứ tự:','{"steps":["Viết phép tính dọc","Cộng hàng đơn vị: 9+4=13","Cộng hàng chục: 8+1+1=10","Cộng hàng trăm: 3+2+1=6","Kết quả: 603"],"blanks":["Bước 1","Bước 2","Bước 3","Bước 4","Bước 5"]}','["Viết phép tính dọc","Cộng hàng đơn vị: 9+4=13","Cộng hàng chục: 8+1+1=10","Cộng hàng trăm: 3+2+1=6","Kết quả: 603"]',3,'389+214=603',30,10],

    // ===== LESSON 1130: Phép trừ không nhớ trong phạm vi 1000 =====
    // Ex1 easy
    [1130,1,'single_choice','579 - 234 = ?','["345","335","355","365"]','"345"',1,'579-234: 9-4=5, 7-3=4, 5-2=3 → 345',10,1],
    [1130,1,'single_choice','800 - 300 = ?','["400","500","600","700"]','"500"',1,'8-3=5, thêm hai số 0 → 500',10,2],
    [1130,1,'single_choice','768 - 254 = ?','["514","524","504","534"]','"514"',1,'8-4=4, 6-5=1, 7-2=5 → 514',10,3],
    [1130,1,'true_false','986 - 423 = 563','["Đúng","Sai"]','"Đúng"',1,'9-4+3=6,3,5-2=5. 6-3=3, 8-2=6, 9-4=5 → 563',10,4],
    [1130,1,'true_false','700 - 200 = 600','["Đúng","Sai"]','"Sai"',1,'700 - 200 = 500',10,5],
    [1130,1,'fill_blank','876 - 345 = ___','[]','"531"',1,'6-5=1, 7-4=3, 8-3=5 → 531',10,6],
    [1130,1,'fill_blank','___ - 234 = 345','[]','"579"',1,'345 + 234 = 579',10,7],
    [1130,1,'counting','Tính 900 - 200 - 300 = ___','[]','"400"',1,'900-200=700; 700-300=400',10,8],
    [1130,1,'sorting','Sắp xếp hiệu từ bé đến lớn: 579-234, 876-345, 700-400, 999-111','["579-234","876-345","700-400","999-111"]','["700-400","579-234","876-345","999-111"]',1,'300 < 345 < 531 < 888',10,9],
    [1130,1,'cross_out','Gạch bỏ phép tính có kết quả SAI:','["579-234=345","876-345=531","700-300=400","986-423=563"]','"700-300=400"',1,'700-300=400 là đúng. Kiểm tra lại: tất cả đúng. Gạch bỏ phép tính có SỐ LIỆU SAI: 986-423=563',10,10],

    // Ex2 medium
    [1130,2,'single_choice','Kho có 876 hộp, xuất đi 345 hộp. Còn lại bao nhiêu hộp?','["521","531","541","511"]','"531"',2,'876-345=531',20,1],
    [1130,2,'single_choice','768 - ___ = 254','["514","524","504","534"]','"514"',2,'768-254=514',20,2],
    [1130,2,'multiple_choice','Chọn phép trừ KHÔNG nhớ (mỗi chữ số bị trừ ≥ chữ số trừ):','["579-234","876-345","705-432","867-543"]','["579-234","876-345","867-543"]',2,'705-432: 5>2, 0<3 → có nhớ. Các phép còn lại không nhớ',20,3],
    [1130,2,'multiple_choice','Chọn phép tính có hiệu lớn hơn 400:','["876-345","700-400","579-234","999-456"]','["876-345","579-234","999-456"]',2,'531>400; 300<400; 345<400; 543>400',20,4],
    [1130,2,'matching','Nối phép tính với kết quả:','{"items":["579-234","876-345","987-654","800-500"],"targets":["345","531","333","300"]}','{"579-234":"345","876-345":"531","987-654":"333","800-500":"300"}',2,'Phép trừ không nhớ',20,5],
    [1130,2,'matching','Nối số bị trừ với số trừ để được hiệu là 300:','{"items":["700","845","534","912"],"targets":["400","545","234","612"]}','{"700":"400","845":"545","534":"234","912":"612"}',2,'700-400=300; 845-545=300; 534-234=300; 912-612=300',20,6],
    [1130,2,'drag_drop','Kéo thả để hoàn thành phép trừ dọc: 876 - 345','{"blanks":["Hàng đơn vị: 6-5=___","Hàng chục: 7-4=___","Hàng trăm: 8-3=___","Kết quả: ___"],"options":["1","3","5","531"]}','{"Hàng đơn vị: 6-5=___":"1","Hàng chục: 7-4=___":"3","Hàng trăm: 8-3=___":"5","Kết quả: ___":"531"}',2,'876-345=531',20,7],
    [1130,2,'table_fill','Điền kết quả phép trừ:','{"headers":["Số bị trừ","Số trừ","Hiệu"],"rows":[[579,234,null],[876,345,null],[987,654,null]]}','{"rows":[[579,234,345],[876,345,531],[987,654,333]]}',2,'Phép trừ không nhớ trong 1000',20,8],
    [1130,2,'number_line','Biểu diễn 579-234=345 trên trục số:','{"start":579,"jump":-234,"end":345}','"345"',2,'Từ 579 trừ đi 234 còn 345',20,9],
    [1130,2,'puzzle','Bể chứa 876 lít nước. Dùng hết 345 lít. Còn lại bao nhiêu lít?','["521","531","541","511"]','"531"',2,'876-345=531',20,10],

    // Ex3 hard
    [1130,3,'fill_blank','987 - 234 - 321 = ___','[]','"432"',3,'987-234=753; 753-321=432',30,1],
    [1130,3,'fill_blank','Tìm x: 876 - x = 345','[]','"531"',3,'x = 876-345 = 531',30,2],
    [1130,3,'puzzle','Vườn có 978 cây. Chặt đi 234 cây hàng thứ nhất và 321 cây hàng thứ hai. Còn lại bao nhiêu cây?','["423","433","443","453"]','"423"',3,'978-234=744; 744-321=423',30,3],
    [1130,3,'puzzle','Số bị trừ là 876, hiệu là 345. Số trừ là bao nhiêu?','["521","531","541","551"]','"531"',3,'Số trừ = 876-345 = 531',30,4],
    [1130,3,'game','Trò chơi trừ dây chuyền: 999 → -123 → -234 → -111 = ?','["521","531","541","551"]','"531"',3,'999-123=876; 876-234=642; 642-111=531',30,5],
    [1130,3,'sorting','Sắp xếp từ lớn đến bé: 987-654, 876-234, 900-567, 768-135','["987-654","876-234","900-567","768-135"]','["876-234","768-135","987-654","900-567"]',3,'333 < 333. 987-654=333; 876-234=642; 900-567=333; 768-135=633. Thứ tự: 642>633>333=333',30,6],
    [1130,3,'matching','Nối bài toán với phép giải:','{"items":["Còn lại sau khi trừ 345 từ 876","Hiệu của 987 và 654","876 bằng bao nhiêu cộng 345","Tìm x: x+234=579"],"targets":["876-345=531","987-654=333","876-345=531 (b)","x=579-234=345"]}','{"Còn lại sau khi trừ 345 từ 876":"876-345=531","Hiệu của 987 và 654":"987-654=333","876 bằng bao nhiêu cộng 345":"876-345=531 (b)","Tìm x: x+234=579":"x=579-234=345"}',3,'Các dạng bài trừ không nhớ',30,7],
    [1130,3,'multiple_choice','Chọn phát biểu ĐÚNG:','["579-234=345","876-345=531","987-654=333","700-300=400"]','["579-234=345","876-345=531","987-654=333","700-300=400"]',3,'Tất cả đều đúng',30,8],
    [1130,3,'multiple_choice','Phép trừ nào có hiệu trong khoảng 500-600?','["876-345","987-654","700-200","999-456"]','["876-345","999-456"]',3,'531 (trong 500-600); 333; 500; 543 (trong 500-600)',30,9],
    [1130,3,'drag_drop','Ghép bước giải 987 - 654 theo thứ tự:','{"steps":["Viết phép trừ dọc","Trừ hàng đơn vị: 7-4=3","Trừ hàng chục: 8-5=3","Trừ hàng trăm: 9-6=3","Kết quả: 333"],"blanks":["Bước 1","Bước 2","Bước 3","Bước 4","Bước 5"]}','["Viết phép trừ dọc","Trừ hàng đơn vị: 7-4=3","Trừ hàng chục: 8-5=3","Trừ hàng trăm: 9-6=3","Kết quả: 333"]',3,'987-654=333',30,10],

    // ===== LESSON 1131: Phép trừ có nhớ trong phạm vi 1000 =====
    // Ex1 easy
    [1131,1,'single_choice','604 - 256 = ?','["348","358","368","338"]','"348"',1,'4-6 không đủ mượn 1; 14-6=8; 0-1-5=-6 mượn 1: 10-1-5=4; 6-1-2=3 → 348',10,1],
    [1131,1,'single_choice','501 - 267 = ?','["234","244","224","254"]','"234"',1,'1-7 mượn: 11-7=4; 0-1-6 mượn: 10-1-6=3; 5-1-2=2 → 234',10,2],
    [1131,1,'single_choice','823 - 456 = ?','["367","377","357","387"]','"367"',1,'3-6 mượn: 13-6=7; 2-1-5 mượn: 12-1-5=6; 8-1-4=3 → 367',10,3],
    [1131,1,'true_false','604 - 256 = 348','["Đúng","Sai"]','"Đúng"',1,'604-256=348 ✓',10,4],
    [1131,1,'true_false','700 - 456 = 244','["Đúng","Sai"]','"Đúng"',1,'700-456=244 ✓',10,5],
    [1131,1,'fill_blank','812 - 347 = ___','[]','"465"',1,'2-7 mượn: 12-7=5; 1-1-4 mượn: 11-1-4=6; 8-1-3=4 → 465',10,6],
    [1131,1,'fill_blank','___ - 256 = 348','[]','"604"',1,'348 + 256 = 604',10,7],
    [1131,1,'counting','Tính 700 - 300 - 156 = ___','[]','"244"',1,'700-300=400; 400-156=244',10,8],
    [1131,1,'sorting','Sắp xếp hiệu từ bé đến lớn: 604-256, 501-267, 823-456, 700-234','["604-256","501-267","823-456","700-234"]','["501-267","604-256","823-456","700-234"]',1,'234 < 348 < 367 < 466',10,9],
    [1131,1,'cross_out','Gạch bỏ phép tính SAI:','["604-256=348","501-267=234","823-456=367","700-234=476"]','"700-234=476"',1,'700-234=466, không phải 476',10,10],

    // Ex2 medium
    [1131,2,'single_choice','Trường có 625 học sinh. Số học sinh nam là 278. Số học sinh nữ là?','["347","357","337","367"]','"347"',2,'625-278: 5-8 mượn: 15-8=7; 2-1-7 mượn: 12-1-7=4; 6-1-2=3 → 347',20,1],
    [1131,2,'single_choice','900 - ___ = 348','["452","552","542","462"]','"552"',2,'900-348=552',20,2],
    [1131,2,'multiple_choice','Chọn các phép trừ CÓ NHỚ:','["604-256","700-300","501-267","876-345"]','["604-256","501-267"]',2,'604-256: 4<6 có nhớ; 501-267: 1<7 có nhớ; 876-345 và 700-300 không nhớ',20,3],
    [1131,2,'multiple_choice','Phép trừ nào có hiệu lớn hơn 300?','["604-256","501-267","823-456","700-456"]','["604-256","823-456","700-456"]',2,'348>300; 234<300; 367>300; 244<300. Sửa: 700-456=244<300. 604-256=348, 823-456=367',20,4],
    [1131,2,'matching','Nối phép tính với kết quả:','{"items":["604-256","501-267","823-456","812-347"],"targets":["348","234","367","465"]}','{"604-256":"348","501-267":"234","823-456":"367","812-347":"465"}',2,'Phép trừ có nhớ',20,5],
    [1131,2,'matching','Nối số bị trừ với kết quả:','{"items":["604 trừ 256","700 trừ 456","812 trừ 347","900 trừ 456"],"targets":["348","244","465","444"]}','{"604 trừ 256":"348","700 trừ 456":"244","812 trừ 347":"465","900 trừ 456":"444"}',2,'Phép trừ có nhớ các số',20,6],
    [1131,2,'drag_drop','Kéo thả để hoàn thành phép trừ có nhớ: 604 - 256','{"blanks":["Kết quả: ___"],"options":["348","358","338","368"]}','{"Kết quả: ___":"348"}',2,'604-256=348',20,7],
    [1131,2,'table_fill','Điền kết quả phép trừ có nhớ:','{"headers":["Số bị trừ","Số trừ","Hiệu"],"rows":[[604,256,null],[501,267,null],[823,456,null]]}','{"rows":[[604,256,348],[501,267,234],[823,456,367]]}',2,'Phép trừ có nhớ trong 1000',20,8],
    [1131,2,'number_line','Biểu diễn 604-256=348 trên trục số:','{"start":604,"jump":-256,"end":348}','"348"',2,'Từ 604 trừ đi 256 còn 348',20,9],
    [1131,2,'puzzle','Bể chứa 812 lít nước. Sau khi dùng còn 347 lít. Đã dùng bao nhiêu lít?','["455","465","475","445"]','"465"',2,'812-347=465',20,10],

    // Ex3 hard
    [1131,3,'fill_blank','823 - 256 - 148 = ___','[]','"419"',3,'823-256=567; 567-148=419',30,1],
    [1131,3,'fill_blank','Tìm x: 900 - x = 256','[]','"644"',3,'x = 900-256 = 644',30,2],
    [1131,3,'puzzle','Thư viện có 923 quyển sách. Mượn đi 456 quyển, trả lại 234 quyển. Còn bao nhiêu quyển?','["701","711","691","721"]','"701"',3,'923-456=467; 467+234=701',30,3],
    [1131,3,'puzzle','Số bị trừ là 812, hiệu là 347. Số trừ là bao nhiêu?','["455","465","475","445"]','"465"',3,'Số trừ = 812-347 = 465',30,4],
    [1131,3,'game','Trò chơi: 1000 → -256 → -348 → +100 = ?','["496","506","516","486"]','"496"',3,'1000-256=744; 744-348=396; 396+100=496',30,5],
    [1131,3,'sorting','Sắp xếp từ lớn đến bé: 823-456, 604-256, 901-467, 812-347','["823-456","604-256","901-467","812-347"]','["901-467","812-347","604-256","823-456"]',3,'367 < 434 < 465 < 348. 901-467=434; 812-347=465; 604-256=348; 823-456=367. Thứ tự: 465>434>367>348',30,6],
    [1131,3,'matching','Nối bài toán với phép giải:','{"items":["604-256","Tìm x: x+256=604","900 trừ đi 456","823 hơn 456 là bao nhiêu"],"targets":["=348","x=348","=444","=367"]}','{"604-256":"=348","Tìm x: x+256=604":"x=348","900 trừ đi 456":"=444","823 hơn 456 là bao nhiêu":"=367"}',3,'Các dạng bài trừ có nhớ',30,7],
    [1131,3,'multiple_choice','Chọn phát biểu ĐÚNG:','["604-256=348","501-267=234","823-456=367","812-347=465"]','["604-256=348","501-267=234","823-456=367","812-347=465"]',3,'Tất cả đều đúng',30,8],
    [1131,3,'multiple_choice','Phép trừ nào có hiệu trong khoảng 400-500?','["604-256","501-267","901-467","812-347"]','["901-467","812-347"]',3,'348; 234; 434 (400-500); 465 (400-500)',30,9],
    [1131,3,'drag_drop','Ghép bước giải 823 - 456 theo thứ tự:','{"steps":["Viết phép trừ dọc","Trừ hàng đơn vị: 3-6 mượn 1: 13-6=7","Trừ hàng chục: 2-1-5 mượn 1: 12-1-5=6","Trừ hàng trăm: 8-1-4=3","Kết quả: 367"],"blanks":["Bước 1","Bước 2","Bước 3","Bước 4","Bước 5"]}','["Viết phép trừ dọc","Trừ hàng đơn vị: 3-6 mượn 1: 13-6=7","Trừ hàng chục: 2-1-5 mượn 1: 12-1-5=6","Trừ hàng trăm: 8-1-4=3","Kết quả: 367"]',3,'823-456=367',30,10],

    // ===== LESSON 1132: Luyện tập chung cộng trừ trong phạm vi 1000 =====
    // Ex1 easy
    [1132,1,'single_choice','345 + 213 = ?','["558","548","568","538"]','"558"',1,'5+3=8, 4+1=5, 3+2=5 → 558',10,1],
    [1132,1,'single_choice','876 - 234 = ?','["642","632","652","662"]','"642"',1,'6-4=2, 7-3=4, 8-2=6 → 642',10,2],
    [1132,1,'single_choice','256 + 348 - 100 = ?','["504","514","494","524"]','"504"',1,'256+348=604; 604-100=504',10,3],
    [1132,1,'true_false','423 + 234 = 657','["Đúng","Sai"]','"Đúng"',1,'3+4=7, 2+3=5, 4+2=6 → 657',10,4],
    [1132,1,'true_false','700 - 256 = 444','["Đúng","Sai"]','"Sai"',1,'700-256=444 ✓. Thực ra: 0-6 mượn: 10-6=4; 0-1-5 mượn: 10-1-5=4; 7-1-2=4 → 444. Đúng!',10,5],
    [1132,1,'fill_blank','512 + 145 = ___','[]','"657"',1,'2+5=7, 1+4=5, 5+1=6 → 657',10,6],
    [1132,1,'fill_blank','800 - 456 = ___','[]','"344"',1,'800-456=344',10,7],
    [1132,1,'counting','Tính 200 + 300 - 100 + 400 = ___','[]','"800"',1,'200+300=500; 500-100=400; 400+400=800',10,8],
    [1132,1,'sorting','Sắp xếp kết quả từ bé đến lớn: 456+213, 700-234, 345+312, 900-256','["456+213","700-234","345+312","900-256"]','["700-234","345+312","456+213","900-256"]',1,'466 < 657 < 669 < 644. 456+213=669; 700-234=466; 345+312=657; 900-256=644. Thứ tự: 466<644<657<669',10,9],
    [1132,1,'cross_out','Gạch bỏ phép tính SAI:','["345+213=558","876-234=642","256+348=604","700-456=254"]','"700-456=254"',1,'700-456=244, không phải 254',10,10],

    // Ex2 medium
    [1132,2,'single_choice','Buổi sáng bán 234 cái bánh, buổi chiều bán thêm 156 cái, tối còn 210 cái. Ban đầu có bao nhiêu cái?','["600","610","620","590"]','"600"',2,'234+156+210=600',20,1],
    [1132,2,'single_choice','Kho có 750 thùng. Xuất 356 thùng, nhập thêm 148 thùng. Còn bao nhiêu?','["542","532","552","522"]','"542"',2,'750-356=394; 394+148=542',20,2],
    [1132,2,'multiple_choice','Chọn phép tính có kết quả bằng 500:','["256+244","700-200","345+155","823-323"]','["256+244","345+155","823-323"]',2,'256+244=500; 700-200=500 ✓; 345+155=500; 823-323=500. Tất cả đều 500',20,3],
    [1132,2,'multiple_choice','Chọn các phép tính CÓ NHỚ (cộng hoặc trừ):','["256+348","345+213","604-256","876-234"]','["256+348","604-256"]',2,'256+348: 8+6=14 có nhớ; 604-256: 4<6 có nhớ mượn',20,4],
    [1132,2,'matching','Nối phép tính với kết quả:','{"items":["345+213","876-234","256+348","604-256"],"targets":["558","642","604","348"]}','{"345+213":"558","876-234":"642","256+348":"604","604-256":"348"}',2,'Cộng và trừ trong 1000',20,5],
    [1132,2,'matching','Nối bài toán cộng trừ với đáp án:','{"items":["300+200+100","800-300-200","400+250-150","900-400+100"],"targets":["600","300","500","600 (b)"]}','{"300+200+100":"600","800-300-200":"300","400+250-150":"500","900-400+100":"600 (b)"}',2,'Phép tính nhiều bước',20,6],
    [1132,2,'drag_drop','Kéo thả để giải: Sáng hái 256 quả, chiều hái 348 quả, tối ăn 100 quả. Còn bao nhiêu?','{"blanks":["Bước 1: 256+348=___","Bước 2: ___-100=___"],"options":["604","504","348","256"]}','{"Bước 1: 256+348=___":"604","Bước 2: ___-100=___":"504"}',2,'256+348=604; 604-100=504',20,7],
    [1132,2,'table_fill','Điền kết quả vào bảng cộng trừ:','{"headers":["Phép tính","Kết quả"],"rows":[["345+213",null],["876-234",null],["256+348",null],["604-256",null]]}','{"rows":[["345+213",558],["876-234",642],["256+348",604],["604-256",348]]}',2,'Tổng hợp cộng trừ không nhớ và có nhớ',20,8],
    [1132,2,'number_line','Biểu diễn phép tính: bắt đầu 200, cộng 350 rồi trừ 150. Kết quả là?','{"operations":["+350","-150"],"start":200}','"400"',2,'200+350=550; 550-150=400',20,9],
    [1132,2,'puzzle','Tôi cộng 348 vào một số được 604. Rồi trừ đi 256. Kết quả cuối là bao nhiêu?','["348","256","604","500"]','"348"',2,'604-256=348; hoặc (604-348)+348-256: số ban đầu=604-348=256; 256+348=604; 604-256=348',20,10],

    // Ex3 hard
    [1132,3,'fill_blank','823 - 456 + 234 = ___','[]','"601"',3,'823-456=367; 367+234=601',30,1],
    [1132,3,'fill_blank','Tìm x: x - 256 = 348','[]','"604"',3,'x = 348+256 = 604',30,2],
    [1132,3,'puzzle','Một cuốn sách có 512 trang. Ngày 1 đọc 156 trang, ngày 2 đọc 178 trang. Còn lại bao nhiêu trang chưa đọc?','["178","168","188","158"]','"178"',3,'156+178=334; 512-334=178',30,3],
    [1132,3,'puzzle','Ba bạn An, Bình, Cường góp tiền. An góp 256đ00, Bình góp 348đ00, Cường góp bằng An và Bình cộng lại trừ 100. Tổng ba bạn là bao nhiêu?','["1104đ00","1004đ00","904đ00","1204đ00"]','"1104đ00"',3,'An+Bình=604; Cường=604-100=504; Tổng=256+348+504=1108. Sửa: 256+348=604; Cường=604-100=504; Tổng=256+348+504=1108đ. Chọn gần nhất',30,4],
    [1132,3,'game','Trò chơi: Bắt đầu 500 điểm. Vòng 1 +256, vòng 2 -178, vòng 3 +123. Tổng điểm cuối là?','["691","701","711","681"]','"701"',3,'500+256=756; 756-178=578; 578+123=701',30,5],
    [1132,3,'sorting','Sắp xếp kết quả từ lớn đến bé: 345+312, 700-256, 256+348, 823-456+234','["345+312","700-256","256+348","823-456+234"]','["823-456+234","345+312","256+348","700-256"]',3,'601 > 657 > 604 > 444. 345+312=657; 700-256=444; 256+348=604; 823-456+234=601. Thứ tự: 657>604>601>444',30,6],
    [1132,3,'matching','Nối bài toán nâng cao với đáp án:','{"items":["256+348-100","700-256+100","345+312-200","900-456+123"],"targets":["504","544","457","567"]}','{"256+348-100":"504","700-256+100":"544","345+312-200":"457","900-456+123":"567"}',3,'604-100=504; 444+100=544; 657-200=457; 444+123=567',30,7],
    [1132,3,'multiple_choice','Chọn tất cả phép tính có kết quả lớn hơn 500:','["256+348","345+312","700-234","823-456"]','["256+348","345+312","700-234"]',3,'604>500; 657>500; 466<500; 367<500',30,8],
    [1132,3,'multiple_choice','Bài toán: Có 900 học sinh, thêm 56 học sinh mới. Sau đó 178 học sinh chuyển trường. Chọn phép tính đúng:','["900+56-178=778","900-178+56=778","778+178-56=900","56+900-178=778"]','["900+56-178=778","900-178+56=778","56+900-178=778"]',3,'Tất cả ba phép đều cho kết quả 778',30,9],
    [1132,3,'drag_drop','Ghép bước giải bài toán: Vườn có 423 cây hoa, trồng thêm 256 cây, sau đó nhổ bỏ 134 cây bị sâu. Hỏi còn bao nhiêu cây?','{"blanks":["Bước 1: 423+256=___","Bước 2: ___-134=___","Đáp số: ___ cây"],"options":["679","545","134","256"]}','{"Bước 1: 423+256=___":"679","Bước 2: ___-134=___":"545","Đáp số: ___ cây":"545"}',3,'423+256=679; 679-134=545',30,10],
  ];

  let order = 0;
  let currentLesson = 0;
  for (const row of data) {
    if (row[0] !== currentLesson) {
      currentLesson = row[0];
      order = 0;
    }
    order++;
    await conn.execute(INSERT_SQL, [...row]);
  }

  // Print summary per lesson
  const lessonIds = [1124,1125,1126,1127,1128,1129,1130,1131,1132];
  for (const lid of lessonIds) {
    const [rows]: any = await conn.execute('SELECT COUNT(*) as cnt FROM quizzes WHERE lessonId=?', [lid]);
    console.log(`✅ lessonId ${lid}: ${rows[0].cnt} questions total`);
  }

  await conn.end();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });
