import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const lessonIds = [148, 149, 150];

function q(ex:number,type:string,text:string,opts:any,ans:any,diff:string,exp:string,sort:number){
  return {ex,type,text,opts,ans,diff,exp,pts:10,sort};
}

const data: Record<number,{topic:string;questions:any[]}> = {
  148: {
    topic: 'Đơn vị đo độ dài: cm',
    questions: [
      // Ex1 easy: 4 single, 3 true_false, 3 fill_blank
      q(1,'single_choice','Đơn vị đo độ dài học trong lớp 1 là?',[{key:'A',text:'m'},{key:'B',text:'cm'},{key:'C',text:'km'}],'B','easy','cm (xăng-ti-mét) là đơn vị đo độ dài học lớp 1',1),
      q(1,'single_choice','1 cm = bao nhiêu mm?',[{key:'A',text:'5 mm'},{key:'B',text:'10 mm'},{key:'C',text:'100 mm'}],'B','easy','1 cm = 10 mm',2),
      q(1,'single_choice','Cây bút chì dài khoảng bao nhiêu?',[{key:'A',text:'2 cm'},{key:'B',text:'17 cm'},{key:'C',text:'50 cm'}],'B','easy','Cây bút chì thường dài khoảng 17 cm',3),
      q(1,'single_choice','Chiều cao của bàn học khoảng bao nhiêu?',[{key:'A',text:'75 cm'},{key:'B',text:'10 cm'},{key:'C',text:'200 cm'}],'A','easy','Bàn học thường cao khoảng 75 cm',4),
      q(1,'true_false','1 cm ngắn hơn 1 m. Đúng hay sai?',null,true,'easy','Đúng! 1 m = 100 cm nên 1 cm < 1 m',5),
      q(1,'true_false','5 cm = 50 mm. Đúng hay sai?',null,true,'easy','Đúng! 5 cm = 5 × 10 mm = 50 mm',6),
      q(1,'true_false','Thước kẻ dùng để đo độ dài. Đúng hay sai?',null,true,'easy','Đúng! Thước kẻ dùng để đo độ dài',7),
      q(1,'fill_blank','Đoạn thẳng AB dài [b1] cm (đo trên thước thấy vạch 8)',[{key:'b1',text:'?'}],{b1:'8'},'easy','Đọc số trên thước tại điểm B là 8',8),
      q(1,'fill_blank','5 cm + 3 cm = [b1] cm',[{key:'b1',text:'?'}],{b1:'8'},'easy','5 + 3 = 8',9),
      q(1,'fill_blank','10 cm - 4 cm = [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'easy','10 - 4 = 6',10),
      // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
      q(2,'counting','Đếm số vạch trên thước: | | | | | | | |',[{key:'d1',text:'|'},{key:'d2',text:'|'},{key:'d3',text:'|'},{key:'d4',text:'|'},{key:'d5',text:'|'},{key:'d6',text:'|'},{key:'d7',text:'|'},{key:'d8',text:'|'}],'8','easy','Có 8 vạch',1),
      q(2,'counting','Đếm số cm của đoạn thẳng: [0-1-2-3-4-5]',[{key:'d1',text:'1'},{key:'d2',text:'2'},{key:'d3',text:'3'},{key:'d4',text:'4'},{key:'d5',text:'5'}],'5','easy','Đoạn thẳng dài 5 cm',2),
      q(2,'counting','Đếm số hình chữ nhật có cạnh 1 cm: [][][]',[{key:'d1',text:'▭'},{key:'d2',text:'▭'},{key:'d3',text:'▭'}],'3','easy','Có 3 hình chữ nhật',3),
      q(2,'sorting','Sắp xếp độ dài tăng dần: 8 cm, 3 cm, 5 cm, 1 cm',[{key:'1',text:'8 cm'},{key:'2',text:'3 cm'},{key:'3',text:'5 cm'},{key:'4',text:'1 cm'}],['4','2','3','1'],'easy','1 < 3 < 5 < 8',4),
      q(2,'sorting','Sắp xếp tăng dần: 10 cm, 6 cm, 2 cm, 7 cm',[{key:'1',text:'10 cm'},{key:'2',text:'6 cm'},{key:'3',text:'2 cm'},{key:'4',text:'7 cm'}],['3','2','4','1'],'easy','2 < 6 < 7 < 10',5),
      q(2,'sorting','Sắp xếp giảm dần: 4 cm, 9 cm, 1 cm, 6 cm',[{key:'1',text:'4 cm'},{key:'2',text:'9 cm'},{key:'3',text:'1 cm'},{key:'4',text:'6 cm'}],['2','4','1','3'],'easy','9 > 6 > 4 > 1',6),
      q(2,'cross_out','Gạch bỏ đơn vị KHÔNG dùng đo độ dài',[{key:'A',text:'cm'},{key:'B',text:'kg'},{key:'C',text:'m'},{key:'D',text:'mm'}],['B'],'easy','kg là đơn vị đo khối lượng, không phải độ dài',7),
      q(2,'cross_out','Gạch bỏ vật có độ dài ngắn nhất (2 cm, 15 cm, 8 cm, 20 cm)',[{key:'A',text:'2 cm'},{key:'B',text:'15 cm'},{key:'C',text:'8 cm'},{key:'D',text:'20 cm'}],['A'],'easy','2 cm là ngắn nhất',8),
      q(2,'fill_blank','3 cm + [b1] cm = 9 cm',[{key:'b1',text:'?'}],{b1:'6'},'easy','9 - 3 = 6',9),
      q(2,'fill_blank','[b1] cm - 4 cm = 5 cm',[{key:'b1',text:'?'}],{b1:'9'},'easy','5 + 4 = 9',10),
      // Ex3 easy: 4 single, 3 true_false, 2 fill_blank, 1 counting
      q(3,'single_choice','Cách đo đúng: đặt đầu thước tại điểm nào?',[{key:'A',text:'Vạch số 1'},{key:'B',text:'Vạch số 0'},{key:'C',text:'Giữa thước'}],'B','easy','Đặt đầu vật tại vạch 0 của thước',1),
      q(3,'single_choice','Đoạn AB: A ở vạch 0, B ở vạch 6. Đoạn AB dài?',[{key:'A',text:'5 cm'},{key:'B',text:'7 cm'},{key:'C',text:'6 cm'}],'C','easy','Đoạn thẳng dài 6 cm',2),
      q(3,'single_choice','Ngón tay dài khoảng bao nhiêu?',[{key:'A',text:'7 cm'},{key:'B',text:'30 cm'},{key:'C',text:'1 cm'}],'A','easy','Ngón tay thường dài khoảng 7 cm',3),
      q(3,'single_choice','2 cm + 6 cm = ?',[{key:'A',text:'7 cm'},{key:'B',text:'8 cm'},{key:'C',text:'9 cm'}],'B','easy','2 + 6 = 8',4),
      q(3,'true_false','Đoạn thẳng dài 4 cm ngắn hơn đoạn thẳng dài 6 cm. Đúng hay sai?',null,true,'easy','Đúng! 4 < 6',5),
      q(3,'true_false','10 cm = 1 m. Đúng hay sai?',null,false,'easy','Sai! 100 cm = 1 m',6),
      q(3,'true_false','Để đo độ dài cần dùng thước. Đúng hay sai?',null,true,'easy','Đúng! Dùng thước để đo độ dài',7),
      q(3,'fill_blank','Đoạn AB dài 7 cm, BC dài 3 cm. AC dài [b1] cm',[{key:'b1',text:'?'}],{b1:'10'},'easy','7 + 3 = 10',8),
      q(3,'fill_blank','Dây ruy-băng dài 10 cm, cắt đi 3 cm. Còn lại [b1] cm',[{key:'b1',text:'?'}],{b1:'7'},'easy','10 - 3 = 7',9),
      q(3,'counting','Đếm số đoạn thẳng 1 cm: |--|--|--|--|',[{key:'d1',text:'—'},{key:'d2',text:'—'},{key:'d3',text:'—'},{key:'d4',text:'—'}],'4','easy','Có 4 đoạn thẳng 1 cm',10),
      // Ex4 medium: 3 single, 3 multiple, 2 matching, 2 drag_drop (fill_blank)
      q(4,'single_choice','Hai bút: bút A dài 12 cm, bút B dài 9 cm. Bút A dài hơn bút B bao nhiêu?',[{key:'A',text:'2 cm'},{key:'B',text:'3 cm'},{key:'C',text:'4 cm'}],'B','medium','12 - 9 = 3 cm',1),
      q(4,'single_choice','Đoạn thẳng nào dài nhất: 5 cm, 8 cm, 3 cm?',[{key:'A',text:'5 cm'},{key:'B',text:'3 cm'},{key:'C',text:'8 cm'}],'C','medium','8 cm là dài nhất',2),
      q(4,'single_choice','Tổng độ dài: 4 cm + 5 cm + 1 cm = ?',[{key:'A',text:'9 cm'},{key:'B',text:'10 cm'},{key:'C',text:'11 cm'}],'B','medium','4 + 5 + 1 = 10',3),
      q(4,'multiple_choice','Những vật nào có độ dài khoảng 20 cm?',[{key:'A',text:'Tờ giấy A4'},{key:'B',text:'Ngón tay'},{key:'C',text:'Quyển sách'},{key:'D',text:'Cái kim'}],['A','C'],'medium','Tờ giấy A4 và quyển sách dài khoảng 20-30 cm',4),
      q(4,'multiple_choice','Chọn câu ĐÚNG',[{key:'A',text:'5 cm > 3 cm'},{key:'B',text:'10 cm < 2 cm'},{key:'C',text:'7 cm = 7 cm'},{key:'D',text:'1 cm > 9 cm'}],['A','C'],'medium','5>3 và 7=7 là đúng',5),
      q(4,'multiple_choice','Đâu là cách đo đúng?',[{key:'A',text:'Đặt đầu tại vạch 0'},{key:'B',text:'Đọc số tại điểm cuối'},{key:'C',text:'Đặt đầu tại vạch 1'},{key:'D',text:'Không cần thước thẳng'}],['A','B'],'medium','Đặt tại 0, đọc số cuối',6),
      q(4,'matching','Nối vật với độ dài phù hợp',[{key:'A',text:'Ngón tay'},{key:'B',text:'Bút chì'},{key:'C',text:'Quyển sách'}],{A:'7 cm',B:'17 cm',C:'25 cm'},'medium','Ước lượng độ dài các vật',7),
      q(4,'matching','Nối phép tính với kết quả',[{key:'A',text:'3 cm + 5 cm'},{key:'B',text:'10 cm - 4 cm'},{key:'C',text:'2 cm + 8 cm'}],{A:'8 cm',B:'6 cm',C:'10 cm'},'medium','Tính độ dài',8),
      q(4,'fill_blank','Đoạn AM = 4 cm, MB = 6 cm. AB = [b1] cm',[{key:'b1',text:'?'}],{b1:'10'},'medium','4 + 6 = 10',9),
      q(4,'fill_blank','AB = 9 cm, AC = 5 cm (C nằm giữa A và B). CB = [b1] cm',[{key:'b1',text:'?'}],{b1:'4'},'medium','9 - 5 = 4',10),
      // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 fill_blank
      q(5,'table_fill','Điền vào bảng đo độ dài',[{key:'headers',text:'Vật|Độ dài'},{key:'r1',text:'Bút chì|_r1c1'},{key:'r2',text:'Tẩy|_r2c1'}],{r1c1:'17 cm',r2c1:'5 cm'},'medium','Ước lượng độ dài thông thường',1),
      q(5,'table_fill','Điền kết quả phép tính',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'4+3|_r1c1'},{key:'r2',text:'8-2|_r2c1'}],{r1c1:'7 cm',r2c1:'6 cm'},'medium','4+3=7, 8-2=6',2),
      q(5,'number_line','Điền số vào số còn thiếu trên thước: 0, 2, _, 6, 8, 10',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'4'}],['4'],'medium','Mỗi vạch cách nhau 2 cm',3),
      q(5,'number_line','Đoạn thẳng dài bao nhiêu cm? Bắt đầu từ 0, kết thúc tại ?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'7'}],['7'],'medium','Đọc số tại điểm cuối của đoạn thẳng',4),
      q(5,'puzzle','Ghép: Đoạn thẳng dài 5 cm + ? cm = 8 cm',[{key:'slot_1',text:'5 + [?] = 8'},{key:'token_3',text:'3'},{key:'token_4',text:'4'},{key:'token_2',text:'2'}],{slot_1:'token_3'},'medium','8 - 5 = 3',5),
      q(5,'puzzle','Ghép: ? cm - 3 cm = 6 cm',[{key:'slot_1',text:'[?] - 3 = 6'},{key:'token_9',text:'9'},{key:'token_8',text:'8'},{key:'token_7',text:'7'}],{slot_1:'token_9'},'medium','6 + 3 = 9',6),
      q(5,'puzzle','Ghép đơn vị đúng: 15 [?]',[{key:'slot_1',text:'15 [?]'},{key:'token_cm',text:'cm'},{key:'token_kg',text:'kg'},{key:'token_l',text:'lít'}],{slot_1:'token_cm'},'medium','cm là đơn vị đo độ dài',7),
      q(5,'matching','Nối bằng nhau: 1 m = ?',[{key:'A',text:'1 m'},{key:'B',text:'50 cm + 50 cm'},{key:'C',text:'30 cm + 70 cm'}],{A:'100 cm',B:'100 cm',C:'100 cm'},'medium','1 m = 100 cm',8),
      q(5,'fill_blank','Thước dài 20 cm. Đo đoạn thẳng dài 15 cm thì còn thừa [b1] cm',[{key:'b1',text:'?'}],{b1:'5'},'medium','20 - 15 = 5',9),
      q(5,'matching','Nối câu hỏi với câu trả lời',[{key:'A',text:'Ngắn hơn 10 cm'},{key:'B',text:'Dài hơn 20 cm'}],{A:'Tẩy gôm',B:'Thước kẻ'},'medium','Ước lượng độ dài',10),
      // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
      q(6,'fill_blank','Đoạn AB = 10 cm. Điểm M nằm giữa AB, AM = 4 cm. MB = [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'hard','10 - 4 = 6',1),
      q(6,'fill_blank','Hai đoạn: AB = 6 cm, CD = 8 cm. Tổng = [b1] cm',[{key:'b1',text:'?'}],{b1:'14'},'hard','6 + 8 = 14',2),
      q(6,'fill_blank','Chu vi hình chữ nhật: dài 5 cm, rộng 3 cm. CV = [b1] cm',[{key:'b1',text:'?'}],{b1:'16'},'hard','(5+3)×2 = 16',3),
      q(6,'puzzle','Ghép: Bút A dài 15 cm, bút B ngắn hơn 5 cm. Bút B dài [?] cm',[{key:'slot_1',text:'B dài [?] cm'},{key:'token_10',text:'10'},{key:'token_12',text:'12'},{key:'token_8',text:'8'}],{slot_1:'token_10'},'hard','15 - 5 = 10',4),
      q(6,'puzzle','Ghép: Đoạn CD = 9 cm. Đoạn EF dài gấp đôi CD. EF = [?] cm',[{key:'slot_1',text:'EF = [?] cm'},{key:'token_18',text:'18'},{key:'token_16',text:'16'},{key:'token_20',text:'20'}],{slot_1:'token_18'},'hard','9 × 2 = 18',5),
      q(6,'puzzle','Ghép: 7 cm + 8 cm = [?] cm',[{key:'slot_1',text:'7 + 8 = [?]'},{key:'token_15',text:'15'},{key:'token_14',text:'14'},{key:'token_16',text:'16'}],{slot_1:'token_15'},'hard','7 + 8 = 15',6),
      q(6,'multiple_choice','Chọn câu đúng về đo độ dài',[{key:'A',text:'Đặt vạch 0 tại điểm đầu'},{key:'B',text:'Đo từ phải sang trái'},{key:'C',text:'Đọc số tại điểm cuối'},{key:'D',text:'Thước phải thẳng'}],['A','C','D'],'hard','Quy tắc đo đúng',7),
      q(6,'multiple_choice','Phép tính nào cho kết quả bằng 10 cm?',[{key:'A',text:'6+4'},{key:'B',text:'7+3'},{key:'C',text:'5+5'},{key:'D',text:'8+1'}],['A','B','C'],'hard','6+4=7+3=5+5=10',8),
      q(6,'sorting','Sắp xếp giảm dần: 15 cm, 7 cm, 12 cm, 3 cm',[{key:'1',text:'15 cm'},{key:'2',text:'7 cm'},{key:'3',text:'12 cm'},{key:'4',text:'3 cm'}],['1','3','2','4'],'hard','15>12>7>3',9),
      q(6,'sorting','Sắp xếp tăng dần: 20 cm, 5 cm, 18 cm, 9 cm',[{key:'1',text:'20 cm'},{key:'2',text:'5 cm'},{key:'3',text:'18 cm'},{key:'4',text:'9 cm'}],['2','4','3','1'],'hard','5<9<18<20',10),
      // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop (fill_blank)
      q(7,'game','Phân loại: Đơn vị độ dài / Không phải đơn vị độ dài',[{key:'c1',text:'cm',pair:'do_dai'},{key:'c2',text:'kg',pair:'khong'},{key:'c3',text:'m',pair:'do_dai'},{key:'c4',text:'lít',pair:'khong'},{key:'c5',text:'mm',pair:'do_dai'},{key:'c6',text:'giờ',pair:'khong'}],{},'hard','cm, m, mm là đơn vị đo độ dài',1),
      q(7,'game','Phân loại: Dài hơn 10 cm / Ngắn hơn 10 cm',[{key:'c1',text:'Ngón tay (7cm)',pair:'ngan'},{key:'c2',text:'Thước kẻ (30cm)',pair:'dai'},{key:'c3',text:'Tẩy (5cm)',pair:'ngan'},{key:'c4',text:'Bút chì (17cm)',pair:'dai'},{key:'c5',text:'Cúc áo (2cm)',pair:'ngan'},{key:'c6',text:'Sách giáo khoa (20cm)',pair:'dai'}],{},'hard','So sánh với 10 cm',2),
      q(7,'matching','Nối đúng',[{key:'A',text:'5+5'},{key:'B',text:'8+2'},{key:'C',text:'3+7'}],{A:'10 cm',B:'10 cm',C:'10 cm'},'hard','Tất cả bằng 10 cm',3),
      q(7,'matching','Nối vật với ước lượng',[{key:'A',text:'Chiều cao bàn'},{key:'B',text:'Chiều rộng sách'},{key:'C',text:'Dài ngón tay'}],{A:'75 cm',B:'15 cm',C:'7 cm'},'hard','Ước lượng đúng',4),
      q(7,'matching','Nối phép tính',[{key:'A',text:'AB=8cm, BC=5cm'},{key:'B',text:'PQ=10cm, RS=4cm'},{key:'C',text:'XY=6cm, YZ=7cm'}],{A:'AC=13cm',B:'PR=6cm',C:'XZ=13cm'},'hard','Tính tổng/hiệu đoạn thẳng',5),
      q(7,'fill_blank','Sợi dây dài 10 cm. Gấp đôi thì dài [b1] cm',[{key:'b1',text:'?'}],{b1:'20'},'hard','10 × 2 = 20',6),
      q(7,'fill_blank','Đoạn AB = 8 cm. Điểm C nằm ngoài AB về phía B, BC = 4 cm. AC = [b1] cm',[{key:'b1',text:'?'}],{b1:'12'},'hard','8 + 4 = 12',7),
      q(7,'fill_blank','Hình vuông cạnh 3 cm. Chu vi = [b1] cm',[{key:'b1',text:'?'}],{b1:'12'},'hard','4 × 3 = 12',8),
      q(7,'fill_blank','Muốn đo sợi dây cong, ta làm gì? Kéo thẳng ra rồi dùng [b1]',[{key:'b1',text:'?'}],{b1:'thước'},'hard','Kéo thẳng rồi dùng thước đo',9),
      q(7,'fill_blank','Hai đoạn thẳng cộng lại dài 14 cm, đoạn 1 dài 6 cm. Đoạn 2 dài [b1] cm',[{key:'b1',text:'?'}],{b1:'8'},'hard','14 - 6 = 8',10),
      // Ex8 hard: 3 multiple, 3 puzzle, 2 sorting, 2 cross_out
      q(8,'multiple_choice','Cách đo độ dài đúng gồm những bước nào?',[{key:'A',text:'Đặt đầu vật tại vạch 0'},{key:'B',text:'Kéo thước cong'},{key:'C',text:'Đọc số tại điểm cuối'},{key:'D',text:'Giữ thước thẳng'}],['A','C','D'],'hard','Quy trình đo đúng',1),
      q(8,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'5 cm + 3 cm = 8 cm'},{key:'B',text:'10 cm - 4 cm = 5 cm'},{key:'C',text:'6 cm + 2 cm = 8 cm'},{key:'D',text:'9 cm - 3 cm = 6 cm'}],['A','C','D'],'hard','5+3=8, 6+2=8, 9-3=6',2),
      q(8,'multiple_choice','Vật nào ngắn hơn 10 cm?',[{key:'A',text:'Tẩy (5 cm)'},{key:'B',text:'Thước (30 cm)'},{key:'C',text:'Ngón tay (7 cm)'},{key:'D',text:'Cây bút (17 cm)'}],['A','C'],'hard','5 và 7 đều nhỏ hơn 10',3),
      q(8,'puzzle','Ghép: Chu vi hình vuông cạnh 4 cm = [?] cm',[{key:'slot_1',text:'CV = [?] cm'},{key:'token_16',text:'16'},{key:'token_12',text:'12'},{key:'token_8',text:'8'}],{slot_1:'token_16'},'hard','4 × 4 = 16',4),
      q(8,'puzzle','Ghép: Dây A dài 14 cm, gấp đôi dây B. Dây B dài [?] cm',[{key:'slot_1',text:'B = [?] cm'},{key:'token_7',text:'7'},{key:'token_8',text:'8'},{key:'token_6',text:'6'}],{slot_1:'token_7'},'hard','14 ÷ 2 = 7',5),
      q(8,'puzzle','Ghép: AB = 6 cm, BC = 7 cm, AC = [?] cm',[{key:'slot_1',text:'AC = [?] cm'},{key:'token_13',text:'13'},{key:'token_12',text:'12'},{key:'token_14',text:'14'}],{slot_1:'token_13'},'hard','6 + 7 = 13',6),
      q(8,'sorting','Sắp xếp độ dài tăng dần: 3 cm, 16 cm, 8 cm, 11 cm',[{key:'1',text:'3 cm'},{key:'2',text:'16 cm'},{key:'3',text:'8 cm'},{key:'4',text:'11 cm'}],['1','3','4','2'],'hard','3<8<11<16',7),
      q(8,'sorting','Sắp xếp giảm dần: 9 cm, 14 cm, 2 cm, 7 cm',[{key:'1',text:'9 cm'},{key:'2',text:'14 cm'},{key:'3',text:'2 cm'},{key:'4',text:'7 cm'}],['2','1','4','3'],'hard','14>9>7>2',8),
      q(8,'cross_out','Gạch bỏ đáp án sai: Thước đo = ?',[{key:'A',text:'Dùng đo độ dài'},{key:'B',text:'Dùng đo khối lượng'},{key:'C',text:'Có các vạch chia cm'},{key:'D',text:'Đo được giờ'}],['B','D'],'hard','Thước chỉ đo độ dài',9),
      q(8,'cross_out','Gạch bỏ số đo sai: Chiều cao học sinh lớp 1',[{key:'A',text:'100 cm'},{key:'B',text:'5 cm'},{key:'C',text:'115 cm'},{key:'D',text:'200 cm'}],['B','D'],'hard','Học sinh lớp 1 cao khoảng 100-120 cm',10),
    ],
  },
  149: {
    topic: 'Ước lượng và đo độ dài',
    questions: [
      // Ex1
      q(1,'single_choice','Ước lượng nghĩa là gì?',[{key:'A',text:'Đo chính xác'},{key:'B',text:'Đoán gần đúng'},{key:'C',text:'Vẽ hình'}],'B','easy','Ước lượng là đoán gần đúng mà không dùng thước',1),
      q(1,'single_choice','Chiều dài lớp học khoảng bao nhiêu?',[{key:'A',text:'7 m'},{key:'B',text:'7 cm'},{key:'C',text:'70 cm'}],'A','easy','Lớp học dài khoảng 7 m',2),
      q(1,'single_choice','Để biết chính xác độ dài cần làm gì?',[{key:'A',text:'Ước lượng'},{key:'B',text:'Dùng thước đo'},{key:'C',text:'Nhìn mắt thường'}],'B','easy','Dùng thước mới biết chính xác',3),
      q(1,'single_choice','Quyển sách dày khoảng?',[{key:'A',text:'1 cm'},{key:'B',text:'10 cm'},{key:'C',text:'50 cm'}],'A','easy','Sách thường dày khoảng 1-2 cm',4),
      q(1,'true_false','Ước lượng độ dài luôn cho kết quả chính xác. Đúng hay sai?',null,false,'easy','Sai! Ước lượng chỉ gần đúng',5),
      q(1,'true_false','Cây bút chì dài hơn tẩy gôm. Đúng hay sai?',null,true,'easy','Đúng! Bút chì thường dài hơn tẩy',6),
      q(1,'true_false','Thước kẻ dài hơn cây bút chì. Đúng hay sai?',null,true,'easy','Đúng! Thước kẻ thường 30 cm, bút chì 17 cm',7),
      q(1,'fill_blank','Bàn học dài khoảng [b1] cm',[{key:'b1',text:'?'}],{b1:'60'},'easy','Bàn học thường dài 60 cm',8),
      q(1,'fill_blank','Thước kẻ thường dài [b1] cm',[{key:'b1',text:'?'}],{b1:'30'},'easy','Thước kẻ phổ thông dài 30 cm',9),
      q(1,'fill_blank','Chiều cao cửa sổ khoảng [b1] cm',[{key:'b1',text:'?'}],{b1:'120'},'easy','Cửa sổ thường cao khoảng 120 cm',10),
      // Ex2
      q(2,'counting','Ước lượng: Bao nhiêu ngón tay = 1 dm?',[{key:'d1',text:'👆'},{key:'d2',text:'👆'},{key:'d3',text:'👆'},{key:'d4',text:'👆'},{key:'d5',text:'👆'},{key:'d6',text:'👆'},{key:'d7',text:'👆'},{key:'d8',text:'👆'},{key:'d9',text:'👆'},{key:'d10',text:'👆'}],'10','easy','1 dm = 10 cm ≈ 10 ngón tay',1),
      q(2,'counting','Đếm số lần đặt tẩy (5cm) để đo đoạn 20cm',[{key:'d1',text:'🟦'},{key:'d2',text:'🟦'},{key:'d3',text:'🟦'},{key:'d4',text:'🟦'}],'4','easy','20 ÷ 5 = 4 lần',2),
      q(2,'counting','Đếm bước chân nhỏ (20cm) để đi 1m (100cm)',[{key:'d1',text:'👣'},{key:'d2',text:'👣'},{key:'d3',text:'👣'},{key:'d4',text:'👣'},{key:'d5',text:'👣'}],'5','easy','100 ÷ 20 = 5 bước',3),
      q(2,'sorting','Sắp xếp vật từ ngắn đến dài: sách, bút, thước, tẩy',[{key:'1',text:'Sách (25cm)'},{key:'2',text:'Bút (17cm)'},{key:'3',text:'Thước (30cm)'},{key:'4',text:'Tẩy (5cm)'}],['4','2','1','3'],'easy','5<17<25<30',4),
      q(2,'sorting','Sắp xếp từ gần đúng đến chính xác hơn',[{key:'1',text:'Nhìn bằng mắt'},{key:'2',text:'Dùng tay đo'},{key:'3',text:'Dùng thước đo'}],['1','2','3'],'easy','Thước cho kết quả chính xác nhất',5),
      q(2,'sorting','Sắp xếp vật dài nhất đến ngắn nhất: bàn, sách, bút, tẩy',[{key:'1',text:'Bàn (120cm)'},{key:'2',text:'Sách (25cm)'},{key:'3',text:'Bút (17cm)'},{key:'4',text:'Tẩy (5cm)'}],['1','2','3','4'],'easy','120>25>17>5',6),
      q(2,'cross_out','Gạch bỏ vật KHÔNG dùng ước lượng',[{key:'A',text:'Mắt nhìn'},{key:'B',text:'Tay đo'},{key:'C',text:'Thước chính xác'},{key:'D',text:'Bước chân'}],['C'],'easy','Thước chính xác cho kết quả đo, không phải ước lượng',7),
      q(2,'cross_out','Gạch bỏ ước lượng SAI về chiều cao học sinh lớp 1',[{key:'A',text:'110 cm'},{key:'B',text:'50 cm'},{key:'C',text:'120 cm'},{key:'D',text:'5 cm'}],['B','D'],'easy','Học sinh lớp 1 cao 100-120 cm',8),
      q(2,'fill_blank','Dùng bút chì (17 cm) đo đoạn dài 34 cm cần đặt [b1] lần',[{key:'b1',text:'?'}],{b1:'2'},'easy','34 ÷ 17 = 2',9),
      q(2,'fill_blank','Ước lượng: Bảng đen dài khoảng [b1] m',[{key:'b1',text:'?'}],{b1:'3'},'easy','Bảng đen thường dài khoảng 3 m',10),
      // Ex3
      q(3,'single_choice','So sánh: Ước lượng và đo chính xác, cái nào đúng hơn?',[{key:'A',text:'Ước lượng'},{key:'B',text:'Đo chính xác'},{key:'C',text:'Như nhau'}],'B','easy','Đo chính xác luôn đúng hơn ước lượng',1),
      q(3,'single_choice','Khi không có thước, ta có thể dùng gì để ước lượng?',[{key:'A',text:'Bàn tay, bước chân'},{key:'B',text:'Mắt kính'},{key:'C',text:'Cân đĩa'}],'A','easy','Có thể dùng bàn tay hoặc bước chân',2),
      q(3,'single_choice','Ước lượng 3 gang tay ≈ bao nhiêu cm? (1 gang ≈ 20cm)',[{key:'A',text:'40 cm'},{key:'B',text:'60 cm'},{key:'C',text:'80 cm'}],'B','easy','3 × 20 = 60 cm',3),
      q(3,'single_choice','Vật nào dễ ước lượng nhất?',[{key:'A',text:'Sợi tóc'},{key:'B',text:'Cây bút'},{key:'C',text:'Hạt gạo'}],'B','easy','Cây bút có kích thước quen thuộc dễ ước lượng',4),
      q(3,'true_false','Ước lượng giúp ta có được giá trị gần đúng. Đúng hay sai?',null,true,'easy','Đúng! Ước lượng cho giá trị gần đúng',5),
      q(3,'true_false','Bước chân là dụng cụ đo chính xác. Đúng hay sai?',null,false,'easy','Sai! Bước chân chỉ để ước lượng',6),
      q(3,'true_false','Ước lượng và đo luôn cho cùng kết quả. Đúng hay sai?',null,false,'easy','Sai! Ước lượng chỉ gần đúng',7),
      q(3,'fill_blank','1 gang tay ≈ 20 cm. 4 gang tay ≈ [b1] cm',[{key:'b1',text:'?'}],{b1:'80'},'easy','4 × 20 = 80',8),
      q(3,'fill_blank','Ước lượng: Cửa lớp cao khoảng [b1] cm',[{key:'b1',text:'?'}],{b1:'200'},'easy','Cửa thường cao khoảng 200 cm = 2 m',9),
      q(3,'counting','Đếm bước chân (50cm) để đi 2m (200cm)',[{key:'d1',text:'👣'},{key:'d2',text:'👣'},{key:'d3',text:'👣'},{key:'d4',text:'👣'}],'4','easy','200 ÷ 50 = 4 bước',10),
      // Ex4 medium
      q(4,'single_choice','Ước lượng: Phòng học rộng khoảng bao nhiêu m?',[{key:'A',text:'6 m'},{key:'B',text:'60 cm'},{key:'C',text:'600 m'}],'A','medium','Phòng học thường rộng 6-8 m',1),
      q(4,'single_choice','Ước lượng gần đúng hơn khi?',[{key:'A',text:'Không biết vật'},{key:'B',text:'Biết nhiều vật tương tự'},{key:'C',text:'Nhắm mắt'}],'B','medium','Kinh nghiệm giúp ước lượng tốt hơn',2),
      q(4,'single_choice','So sánh: 3 bước chân ≈ ? cm (1 bước = 50cm)',[{key:'A',text:'100 cm'},{key:'B',text:'150 cm'},{key:'C',text:'200 cm'}],'B','medium','3 × 50 = 150',3),
      q(4,'multiple_choice','Chọn vật có thể dùng để ước lượng độ dài',[{key:'A',text:'Bàn tay'},{key:'B',text:'Cân'},{key:'C',text:'Bước chân'},{key:'D',text:'Đồng hồ'}],['A','C'],'medium','Bàn tay và bước chân dùng để ước lượng',4),
      q(4,'multiple_choice','Câu nào đúng về ước lượng?',[{key:'A',text:'Giúp đoán gần đúng'},{key:'B',text:'Luôn chính xác'},{key:'C',text:'Nhanh hơn đo'},{key:'D',text:'Không cần thước'}],['A','C','D'],'medium','Ước lượng nhanh, gần đúng, không cần thước',5),
      q(4,'multiple_choice','Khi nào cần đo chính xác?',[{key:'A',text:'Mua vải may áo'},{key:'B',text:'Đoán chiều cao'},{key:'C',text:'Cắt gỗ làm đồ'},{key:'D',text:'Nhìn qua cửa sổ'}],['A','C'],'medium','Mua vải và cắt gỗ cần chính xác',6),
      q(4,'matching','Nối vật với đơn vị ước lượng phù hợp',[{key:'A',text:'Phòng học'},{key:'B',text:'Bút chì'},{key:'C',text:'Sân trường'}],{A:'mét',B:'cm',C:'chục mét'},'medium','Đơn vị phù hợp với kích thước',7),
      q(4,'matching','Nối dụng cụ với độ chính xác',[{key:'A',text:'Mắt nhìn'},{key:'B',text:'Tay đo'},{key:'C',text:'Thước kẻ'}],{A:'Kém nhất',B:'Trung bình',C:'Chính xác nhất'},'medium','Thước chính xác nhất',8),
      q(4,'fill_blank','Bước chân bạn dài 40 cm. Đi 5 bước được [b1] cm',[{key:'b1',text:'?'}],{b1:'200'},'medium','5 × 40 = 200',9),
      q(4,'fill_blank','Ước lượng: Hành lang trường dài 3 lần phòng học (7m). Hành lang dài khoảng [b1] m',[{key:'b1',text:'?'}],{b1:'21'},'medium','3 × 7 = 21',10),
      // Ex5 medium
      q(5,'table_fill','Điền vào bảng ước lượng',[{key:'headers',text:'Vật|Ước lượng|Đơn vị'},{key:'r1',text:'Chiều cao em|_r1c1|cm'},{key:'r2',text:'Chiều dài lớp|_r2c1|m'}],{r1c1:'110',r2c1:'7'},'medium','Ước lượng hợp lý',1),
      q(5,'table_fill','So sánh ước lượng và đo',[{key:'headers',text:'Vật|Ước lượng|Đo thực'},{key:'r1',text:'Bút chì|15 cm|_r1c1'},{key:'r2',text:'Thước kẻ|28 cm|_r2c1'}],{r1c1:'17 cm',r2c1:'30 cm'},'medium','Đo chính xác hơn ước lượng',2),
      q(5,'number_line','Ước lượng: Đoạn thẳng dài khoảng bao nhiêu cm?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'6'}],['6'],'medium','Đoạn nằm gần vạch 6',3),
      q(5,'number_line','Điền số còn thiếu: 0, 5, _, 15, 20',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'10'}],['10'],'medium','Cách đều 5',4),
      q(5,'puzzle','Ghép: 2 gang tay × 20 cm = [?] cm',[{key:'slot_1',text:'2 × 20 = [?] cm'},{key:'token_40',text:'40'},{key:'token_30',text:'30'},{key:'token_50',text:'50'}],{slot_1:'token_40'},'medium','2 × 20 = 40',5),
      q(5,'puzzle','Ghép: Cạnh bàn ≈ 3 thước kẻ × 30 cm = [?] cm',[{key:'slot_1',text:'3 × 30 = [?] cm'},{key:'token_90',text:'90'},{key:'token_80',text:'80'},{key:'token_100',text:'100'}],{slot_1:'token_90'},'medium','3 × 30 = 90',6),
      q(5,'puzzle','Ghép đơn vị phù hợp: Ngôi nhà cao 10 [?]',[{key:'slot_1',text:'10 [?]'},{key:'token_m',text:'m'},{key:'token_cm',text:'cm'},{key:'token_mm',text:'mm'}],{slot_1:'token_m'},'medium','Nhà cao tính bằng m',7),
      q(5,'matching','Nối: Bao nhiêu cm?',[{key:'A',text:'1 gang tay'},{key:'B',text:'1 bước chân'},{key:'C',text:'1 sải tay'}],{A:'20 cm',B:'50 cm',C:'160 cm'},'medium','Ước lượng thông thường',8),
      q(5,'fill_blank','Ước lượng: 1 sải tay = 160 cm = [b1] m + 60 cm',[{key:'b1',text:'?'}],{b1:'1'},'medium','160 cm = 1 m 60 cm',9),
      q(5,'matching','Nối câu với đáp án',[{key:'A',text:'Đo chính xác dùng'},{key:'B',text:'Ước lượng dùng'}],{A:'Thước',B:'Mắt và kinh nghiệm'},'medium','Phân biệt đo và ước lượng',10),
      // Ex6 hard
      q(6,'fill_blank','Ước lượng: Sân trường dài 50 m. Nếu bước chân 50 cm thì cần [b1] bước',[{key:'b1',text:'?'}],{b1:'100'},'hard','50 m = 5000 cm, 5000÷50=100',1),
      q(6,'fill_blank','Ước lượng bằng tay: Bàn dài 3 gang (1 gang = 20 cm). Bàn dài [b1] cm',[{key:'b1',text:'?'}],{b1:'60'},'hard','3 × 20 = 60',2),
      q(6,'fill_blank','Đo thực tế: Bàn dài 65 cm. Sai số ước lượng là [b1] cm',[{key:'b1',text:'?'}],{b1:'5'},'hard','65 - 60 = 5',3),
      q(6,'puzzle','Ghép: Dây dài bằng 4 bước chân (1 bước = 45 cm). Dây dài [?] cm',[{key:'slot_1',text:'4 × 45 = [?] cm'},{key:'token_180',text:'180'},{key:'token_160',text:'160'},{key:'token_200',text:'200'}],{slot_1:'token_180'},'hard','4 × 45 = 180',4),
      q(6,'puzzle','Ghép: Ước lượng chiều dài sân → đo lại thấy 30 m. Ước lượng 25 m. Sai số [?] m',[{key:'slot_1',text:'Sai số [?] m'},{key:'token_5',text:'5'},{key:'token_4',text:'4'},{key:'token_6',text:'6'}],{slot_1:'token_5'},'hard','30 - 25 = 5',5),
      q(6,'puzzle','Ghép: Sợi ruy-băng: 2 gang + 3 bước (gang=20cm, bước=50cm) = [?] cm',[{key:'slot_1',text:'Tổng = [?] cm'},{key:'token_190',text:'190'},{key:'token_150',text:'150'},{key:'token_200',text:'200'}],{slot_1:'token_190'},'hard','2×20 + 3×50 = 40+150 = 190',6),
      q(6,'multiple_choice','Ước lượng tốt hơn khi?',[{key:'A',text:'Biết vật tương tự'},{key:'B',text:'Có thước'},{key:'C',text:'Có kinh nghiệm'},{key:'D',text:'Không cần đo'}],['A','C'],'hard','Kinh nghiệm và vật tham chiếu giúp ước lượng tốt',7),
      q(6,'multiple_choice','Trường hợp nào ước lượng là đủ?',[{key:'A',text:'Mua vải may áo'},{key:'B',text:'Đặt bàn vào phòng'},{key:'C',text:'Cắt gỗ làm tủ'},{key:'D',text:'Xem phòng có rộng không'}],['B','D'],'hard','Đặt bàn và xem rộng hẹp chỉ cần ước lượng',8),
      q(6,'sorting','Sắp xếp từ kém chính xác đến chính xác nhất',[{key:'1',text:'Nhìn mắt'},{key:'2',text:'Bước chân'},{key:'3',text:'Gang tay'},{key:'4',text:'Thước kẻ'}],['1','2','3','4'],'hard','Thứ tự tăng dần độ chính xác',9),
      q(6,'sorting','Sắp xếp độ dài tăng dần: 2m, 50cm, 150cm, 80cm',[{key:'1',text:'2 m = 200cm'},{key:'2',text:'50 cm'},{key:'3',text:'150 cm'},{key:'4',text:'80 cm'}],['2','4','3','1'],'hard','50<80<150<200',10),
      // Ex7 hard
      q(7,'game','Phân loại: Cần đo chính xác / Ước lượng là đủ',[{key:'c1',text:'Mua vải',pair:'chinh_xac'},{key:'c2',text:'Xem nhà rộng không',pair:'uoc_luong'},{key:'c3',text:'Cắt gỗ',pair:'chinh_xac'},{key:'c4',text:'Đặt đồ',pair:'uoc_luong'},{key:'c5',text:'May quần',pair:'chinh_xac'},{key:'c6',text:'Chọn phòng',pair:'uoc_luong'}],{},'hard','Khi cần độ chính xác cao mới đo',1),
      q(7,'game','Phân loại: Dụng cụ đo / Dụng cụ ước lượng',[{key:'c1',text:'Thước kẻ',pair:'do'},{key:'c2',text:'Bàn tay',pair:'uoc'},{key:'c3',text:'Thước dây',pair:'do'},{key:'c4',text:'Bước chân',pair:'uoc'},{key:'c5',text:'Compa',pair:'do'},{key:'c6',text:'Nhìn mắt',pair:'uoc'}],{},'hard','Thước là dụng cụ đo chính xác',2),
      q(7,'matching','Nối vật với ước lượng phù hợp',[{key:'A',text:'Tòa nhà 5 tầng'},{key:'B',text:'Ô tô'},{key:'C',text:'Điện thoại'}],{A:'15 m',B:'4 m',C:'15 cm'},'hard','Ước lượng hợp lý các vật',3),
      q(7,'matching','Nối phương pháp với sai số',[{key:'A',text:'Thước kẻ'},{key:'B',text:'Gang tay'},{key:'C',text:'Mắt nhìn'}],{A:'Nhỏ nhất',B:'Vừa',C:'Lớn nhất'},'hard','Thước chính xác nhất',4),
      q(7,'matching','Nối câu hỏi với trả lời',[{key:'A',text:'Khi nào ước lượng?'},{key:'B',text:'Khi nào đo chính xác?'}],{A:'Khi không cần chính xác cao',B:'Khi cần biết chính xác'},'hard','Phân biệt khi nào dùng',5),
      q(7,'fill_blank','Dây A dài 3 m, dây B dài 150 cm. A dài hơn B [b1] cm',[{key:'b1',text:'?'}],{b1:'150'},'hard','300 - 150 = 150',6),
      q(7,'fill_blank','Ước lượng: Tường lớp cao 3 m = [b1] cm',[{key:'b1',text:'?'}],{b1:'300'},'hard','3 m = 300 cm',7),
      q(7,'fill_blank','Sai số ước lượng: Đoán 8 cm, đo thực 10 cm. Sai [b1] cm',[{key:'b1',text:'?'}],{b1:'2'},'hard','10 - 8 = 2',8),
      q(7,'fill_blank','Dùng gang (20cm) đo bàn được 3 gang rưỡi. Bàn dài khoảng [b1] cm',[{key:'b1',text:'?'}],{b1:'70'},'hard','3.5 × 20 = 70',9),
      q(7,'fill_blank','Hành lang: 10 bước chân (40cm/bước). Hành lang dài [b1] cm',[{key:'b1',text:'?'}],{b1:'400'},'hard','10 × 40 = 400',10),
      // Ex8 hard
      q(8,'multiple_choice','Ước lượng nào hợp lý về chiều cao học sinh lớp 1?',[{key:'A',text:'100 cm'},{key:'B',text:'115 cm'},{key:'C',text:'50 cm'},{key:'D',text:'200 cm'}],['A','B'],'hard','Học sinh lớp 1 cao 100-120 cm',1),
      q(8,'multiple_choice','Chọn phép tính đúng',[{key:'A',text:'1 m = 100 cm'},{key:'B',text:'1 m = 10 cm'},{key:'C',text:'50 cm = 0.5 m'},{key:'D',text:'2 m = 20 cm'}],['A','C'],'hard','1 m = 100 cm, 50 cm = 0.5 m',2),
      q(8,'multiple_choice','Trường hợp nào cần đo chính xác?',[{key:'A',text:'Xem bàn vừa phòng không'},{key:'B',text:'Cắt gỗ làm tủ'},{key:'C',text:'Mua rèm cửa'},{key:'D',text:'Chọn xe đạp'}],['B','C'],'hard','Cắt gỗ và mua rèm cần đúng kích thước',3),
      q(8,'puzzle','Ghép: 1 m = [?] cm',[{key:'slot_1',text:'1 m = [?] cm'},{key:'token_100',text:'100'},{key:'token_10',text:'10'},{key:'token_1000',text:'1000'}],{slot_1:'token_100'},'hard','1 m = 100 cm',4),
      q(8,'puzzle','Ghép: 5 bước (50cm/bước) = [?] cm',[{key:'slot_1',text:'5×50 = [?] cm'},{key:'token_250',text:'250'},{key:'token_200',text:'200'},{key:'token_300',text:'300'}],{slot_1:'token_250'},'hard','5 × 50 = 250',5),
      q(8,'puzzle','Ghép: Sai số = Đo thực - Ước lượng = 12-10 = [?]',[{key:'slot_1',text:'Sai số = [?]'},{key:'token_2',text:'2'},{key:'token_3',text:'3'},{key:'token_1',text:'1'}],{slot_1:'token_2'},'hard','12 - 10 = 2',6),
      q(8,'sorting','Sắp xếp từ ngắn đến dài: 3 m, 250 cm, 4 m, 150 cm',[{key:'1',text:'3 m = 300cm'},{key:'2',text:'250 cm'},{key:'3',text:'4 m = 400cm'},{key:'4',text:'150 cm'}],['4','2','1','3'],'hard','150<250<300<400',7),
      q(8,'sorting','Sắp xếp độ chính xác giảm dần',[{key:'1',text:'Thước kẻ'},{key:'2',text:'Gang tay'},{key:'3',text:'Bước chân'},{key:'4',text:'Mắt nhìn'}],['1','2','3','4'],'hard','Giảm dần từ chính xác đến kém',8),
      q(8,'cross_out','Gạch bỏ ước lượng KHÔNG hợp lý về chiều dài ô tô',[{key:'A',text:'4 m'},{key:'B',text:'40 cm'},{key:'C',text:'3.5 m'},{key:'D',text:'400 m'}],['B','D'],'hard','Ô tô dài khoảng 3-5 m',9),
      q(8,'cross_out','Gạch bỏ trường hợp ước lượng là ĐỦ',[{key:'A',text:'Mua thuốc đúng liều'},{key:'B',text:'Chọn phòng to nhỏ'},{key:'C',text:'Cắt gỗ đúng kích thước'},{key:'D',text:'Xem bàn có vừa không'}],['A','C'],'hard','Thuốc và cắt gỗ cần chính xác',10),
    ],
  },
  150: {
    topic: 'Luyện tập đo độ dài',
    questions: [
      // Ex1
      q(1,'single_choice','Đo đoạn thẳng CD, C tại 0, D tại 9. CD dài?',[{key:'A',text:'8 cm'},{key:'B',text:'9 cm'},{key:'C',text:'10 cm'}],'B','easy','D tại vạch 9 nên CD = 9 cm',1),
      q(1,'single_choice','Cách nào đo đoạn cong?',[{key:'A',text:'Đặt thước thẳng'},{key:'B',text:'Dùng dây rồi đo dây'},{key:'C',text:'Không đo được'}],'B','easy','Dùng dây theo đoạn cong rồi đo dây',2),
      q(1,'single_choice','Đoạn AB = 7 cm, đoạn CD = 4 cm. Tổng = ?',[{key:'A',text:'10 cm'},{key:'B',text:'11 cm'},{key:'C',text:'12 cm'}],'B','easy','7 + 4 = 11',3),
      q(1,'single_choice','Điểm M nằm giữa AB (AB=10). AM=6. MB=?',[{key:'A',text:'3 cm'},{key:'B',text:'4 cm'},{key:'C',text:'5 cm'}],'B','easy','10 - 6 = 4',4),
      q(1,'true_false','Đo độ dài xong phải ghi đơn vị. Đúng hay sai?',null,true,'easy','Đúng! Phải ghi đơn vị cm',5),
      q(1,'true_false','Thước dây dùng để đo đường cong. Đúng hay sai?',null,true,'easy','Đúng! Thước dây mềm dẻo đo được đường cong',6),
      q(1,'true_false','4 cm + 4 cm = 9 cm. Đúng hay sai?',null,false,'easy','Sai! 4 + 4 = 8 cm',7),
      q(1,'fill_blank','Đo đoạn thẳng: A ở 2 cm, B ở 8 cm. AB = [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'easy','8 - 2 = 6',8),
      q(1,'fill_blank','Chu vi tam giác: 3 cm + 4 cm + 5 cm = [b1] cm',[{key:'b1',text:'?'}],{b1:'12'},'easy','3 + 4 + 5 = 12',9),
      q(1,'fill_blank','Hình vuông cạnh 5 cm. Chu vi = [b1] cm',[{key:'b1',text:'?'}],{b1:'20'},'easy','4 × 5 = 20',10),
      // Ex2
      q(2,'counting','Đếm số đoạn 1 cm trong đoạn 6 cm',[{key:'d1',text:'—'},{key:'d2',text:'—'},{key:'d3',text:'—'},{key:'d4',text:'—'},{key:'d5',text:'—'},{key:'d6',text:'—'}],'6','easy','6 đoạn 1 cm = 6 cm',1),
      q(2,'counting','Đếm số lần đặt bút (17cm) vào đoạn 34cm',[{key:'d1',text:'✏️'},{key:'d2',text:'✏️'}],'2','easy','34 ÷ 17 = 2 lần',2),
      q(2,'counting','Đếm số đoạn 2 cm trong đoạn 10 cm',[{key:'d1',text:'▬'},{key:'d2',text:'▬'},{key:'d3',text:'▬'},{key:'d4',text:'▬'},{key:'d5',text:'▬'}],'5','easy','10 ÷ 2 = 5',3),
      q(2,'sorting','Sắp xếp tăng dần: 9 cm, 4 cm, 13 cm, 7 cm',[{key:'1',text:'9 cm'},{key:'2',text:'4 cm'},{key:'3',text:'13 cm'},{key:'4',text:'7 cm'}],['2','4','1','3'],'easy','4<7<9<13',4),
      q(2,'sorting','Sắp xếp giảm dần: 6 cm, 11 cm, 2 cm, 8 cm',[{key:'1',text:'6 cm'},{key:'2',text:'11 cm'},{key:'3',text:'2 cm'},{key:'4',text:'8 cm'}],['2','4','1','3'],'easy','11>8>6>2',5),
      q(2,'sorting','Sắp xếp các cạnh tam giác: 5, 3, 7 cm (từ ngắn đến dài)',[{key:'1',text:'5 cm'},{key:'2',text:'3 cm'},{key:'3',text:'7 cm'}],['2','1','3'],'easy','3<5<7',6),
      q(2,'cross_out','Gạch bỏ phép tính sai',[{key:'A',text:'5+3=8 cm'},{key:'B',text:'9-4=6 cm'},{key:'C',text:'7+2=9 cm'},{key:'D',text:'10-3=7 cm'}],['B'],'easy','9-4=5, không phải 6',7),
      q(2,'cross_out','Gạch bỏ đơn vị sai khi đo vật trong lớp',[{key:'A',text:'cm'},{key:'B',text:'km'},{key:'C',text:'mm'},{key:'D',text:'m'}],['B'],'easy','km dùng đo khoảng cách xa, không đo đồ vật trong lớp',8),
      q(2,'fill_blank','Đoạn PQ = 5 cm, QR = 3 cm. PR = [b1] cm',[{key:'b1',text:'?'}],{b1:'8'},'easy','5 + 3 = 8',9),
      q(2,'fill_blank','Hình chữ nhật: dài 6 cm, rộng 4 cm. Chu vi = [b1] cm',[{key:'b1',text:'?'}],{b1:'20'},'easy','(6+4)×2=20',10),
      // Ex3
      q(3,'single_choice','Đo chính xác nhất cần?',[{key:'A',text:'Nhìn mắt'},{key:'B',text:'Thước chính xác'},{key:'C',text:'Gang tay'}],'B','easy','Thước cho kết quả chính xác nhất',1),
      q(3,'single_choice','Đoạn AB = 10 cm, BC = 5 cm, C nằm ngoài AB. AC = ?',[{key:'A',text:'5 cm'},{key:'B',text:'15 cm'},{key:'C',text:'10 cm'}],'B','easy','10 + 5 = 15',2),
      q(3,'single_choice','Nếu đặt thước sai (không bắt đầu từ 0) thì?',[{key:'A',text:'Kết quả đúng'},{key:'B',text:'Kết quả sai'},{key:'C',text:'Không quan trọng'}],'B','easy','Phải bắt đầu từ vạch 0 mới đúng',3),
      q(3,'single_choice','Hai đoạn bằng nhau: AB = CD = 7 cm. Tổng = ?',[{key:'A',text:'13 cm'},{key:'B',text:'14 cm'},{key:'C',text:'15 cm'}],'B','easy','7 + 7 = 14',4),
      q(3,'true_false','Chu vi hình vuông cạnh 4 cm = 16 cm. Đúng hay sai?',null,true,'easy','Đúng! 4 × 4 = 16',5),
      q(3,'true_false','Thước dây mềm chính xác hơn thước kẻ cứng. Đúng hay sai?',null,false,'easy','Sai! Cả hai có độ chính xác như nhau nếu dùng đúng',6),
      q(3,'true_false','Đo từ trái sang phải là cách đo thông thường. Đúng hay sai?',null,true,'easy','Đúng! Thường đo từ trái sang phải',7),
      q(3,'fill_blank','Cạnh tam giác: 3cm, 4cm, 5cm. Cạnh dài nhất là [b1] cm',[{key:'b1',text:'?'}],{b1:'5'},'easy','5 là cạnh dài nhất',8),
      q(3,'fill_blank','Đoạn AB = 12 cm. Đoạn CD = AB ÷ 2 = [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'easy','12 ÷ 2 = 6',9),
      q(3,'counting','Đếm vạch chia trên đoạn 5 cm (mỗi cm 1 vạch, kể cả 2 đầu)',[{key:'d1',text:'|'},{key:'d2',text:'|'},{key:'d3',text:'|'},{key:'d4',text:'|'},{key:'d5',text:'|'},{key:'d6',text:'|'}],'6','easy','0,1,2,3,4,5 = 6 vạch',10),
      // Ex4 medium
      q(4,'single_choice','Chu vi hình chữ nhật dài 8 cm rộng 3 cm = ?',[{key:'A',text:'22 cm'},{key:'B',text:'24 cm'},{key:'C',text:'11 cm'}],'A','medium','(8+3)×2=22',1),
      q(4,'single_choice','Ba đoạn AB=5, BC=3, CD=7. Tổng AD = ?',[{key:'A',text:'14 cm'},{key:'B',text:'15 cm'},{key:'C',text:'16 cm'}],'B','medium','5+3+7=15',2),
      q(4,'single_choice','Hình vuông chu vi 20 cm. Cạnh dài = ?',[{key:'A',text:'4 cm'},{key:'B',text:'5 cm'},{key:'C',text:'6 cm'}],'B','medium','20÷4=5',3),
      q(4,'multiple_choice','Chọn cách đo đúng',[{key:'A',text:'Đặt 0 tại điểm đầu'},{key:'B',text:'Thước thẳng không cong'},{key:'C',text:'Bắt đầu từ vạch 2'},{key:'D',text:'Đọc số tại điểm cuối'}],['A','B','D'],'medium','3 bước đo đúng',4),
      q(4,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'6+5=11 cm'},{key:'B',text:'13-7=5 cm'},{key:'C',text:'8+4=12 cm'},{key:'D',text:'15-8=7 cm'}],['A','C','D'],'medium','6+5=11, 8+4=12, 15-8=7',5),
      q(4,'multiple_choice','Đơn vị nào dùng đo độ dài?',[{key:'A',text:'cm'},{key:'B',text:'g'},{key:'C',text:'m'},{key:'D',text:'kg'}],['A','C'],'medium','cm và m là đơn vị đo độ dài',6),
      q(4,'matching','Nối hình với chu vi',[{key:'A',text:'Hình vuông cạnh 4cm'},{key:'B',text:'HCN dài 6cm rộng 2cm'},{key:'C',text:'Tam giác đều cạnh 5cm'}],{A:'16 cm',B:'16 cm',C:'15 cm'},'medium','Tính chu vi',7),
      q(4,'matching','Nối phép đo với kết quả',[{key:'A',text:'AB=3cm, BC=5cm'},{key:'B',text:'PQ=9cm, QR=4cm'},{key:'C',text:'XY=7cm, YZ=8cm'}],{A:'AC=8cm',B:'PR=5cm',C:'XZ=15cm'},'medium','Tính độ dài',8),
      q(4,'fill_blank','Hình tam giác đều cạnh 6 cm. Chu vi = [b1] cm',[{key:'b1',text:'?'}],{b1:'18'},'medium','3 × 6 = 18',9),
      q(4,'fill_blank','Hình chữ nhật chu vi 24 cm, chiều dài 8 cm. Chiều rộng = [b1] cm',[{key:'b1',text:'?'}],{b1:'4'},'medium','(24÷2)-8=4',10),
      // Ex5 medium
      q(5,'table_fill','Điền chu vi các hình',[{key:'headers',text:'Hình|Kích thước|Chu vi'},{key:'r1',text:'HV cạnh 3cm|3cm|_r1c1'},{key:'r2',text:'HCN 5×2cm|5×2cm|_r2c1'}],{r1c1:'12 cm',r2c1:'14 cm'},'medium','CV HV=4×3=12, HCN=(5+2)×2=14',1),
      q(5,'table_fill','Điền vào bảng đo',[{key:'headers',text:'Đoạn|Điểm đầu|Điểm cuối|Dài'},{key:'r1',text:'AB|0|7|_r1c1'},{key:'r2',text:'CD|2|9|_r2c1'}],{r1c1:'7 cm',r2c1:'7 cm'},'medium','7-0=7, 9-2=7',2),
      q(5,'number_line','Điểm M nằm tại vị trí nào: AM=5, AB=10?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'5'}],['5'],'medium','M tại vạch 5',3),
      q(5,'number_line','Đoạn CD: C=2, D=8. CD=?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'6'}],['6'],'medium','8-2=6',4),
      q(5,'puzzle','Ghép: HCN dài 7, rộng 3. Chu vi = [?] cm',[{key:'slot_1',text:'CV = [?] cm'},{key:'token_20',text:'20'},{key:'token_18',text:'18'},{key:'token_22',text:'22'}],{slot_1:'token_20'},'medium','(7+3)×2=20',5),
      q(5,'puzzle','Ghép: Tam giác cạnh 4, 5, 6. Chu vi = [?] cm',[{key:'slot_1',text:'CV = [?] cm'},{key:'token_15',text:'15'},{key:'token_14',text:'14'},{key:'token_16',text:'16'}],{slot_1:'token_15'},'medium','4+5+6=15',6),
      q(5,'puzzle','Ghép: HV chu vi 28 cm. Cạnh = [?] cm',[{key:'slot_1',text:'Cạnh = [?] cm'},{key:'token_7',text:'7'},{key:'token_6',text:'6'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'medium','28÷4=7',7),
      q(5,'matching','Nối hình với công thức chu vi',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác đều'}],{A:'cạnh × 4',B:'(dài + rộng) × 2',C:'cạnh × 3'},'medium','Công thức chu vi',8),
      q(5,'fill_blank','Chu vi hình chữ nhật 30 cm, dài 9 cm. Rộng = [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'medium','30÷2-9=6',9),
      q(5,'matching','Nối đơn vị với vật đo',[{key:'A',text:'cm'},{key:'B',text:'m'},{key:'C',text:'km'}],{A:'Cây bút',B:'Phòng học',C:'Đường đi'},'medium','Đơn vị phù hợp',10),
      // Ex6 hard
      q(6,'fill_blank','HCN có chu vi 36 cm. Dài gấp đôi rộng. Rộng = [b1] cm, dài = [b1] cm... Rộng thôi: [b1] cm',[{key:'b1',text:'?'}],{b1:'6'},'hard','(36÷2)÷3×1=6',1),
      q(6,'fill_blank','Hình vuông A cạnh 5 cm, HV B cạnh 8 cm. CV B - CV A = [b1] cm',[{key:'b1',text:'?'}],{b1:'12'},'hard','32-20=12',2),
      q(6,'fill_blank','3 đoạn AB=4, BC=6, CD=5. Tổng = [b1] cm',[{key:'b1',text:'?'}],{b1:'15'},'hard','4+6+5=15',3),
      q(6,'puzzle','Ghép: HCN chu vi 22, dài 7. Rộng = [?] cm',[{key:'slot_1',text:'Rộng = [?] cm'},{key:'token_4',text:'4'},{key:'token_5',text:'5'},{key:'token_6',text:'6'}],{slot_1:'token_4'},'hard','22÷2-7=4',4),
      q(6,'puzzle','Ghép: HV cạnh 9. Chu vi = [?] cm',[{key:'slot_1',text:'CV = [?] cm'},{key:'token_36',text:'36'},{key:'token_32',text:'32'},{key:'token_40',text:'40'}],{slot_1:'token_36'},'hard','4×9=36',5),
      q(6,'puzzle','Ghép: Đoạn AB = 15 cm. M chia AB thành AM:MB = 2:1. AM = [?] cm',[{key:'slot_1',text:'AM = [?] cm'},{key:'token_10',text:'10'},{key:'token_8',text:'8'},{key:'token_12',text:'12'}],{slot_1:'token_10'},'hard','15×2÷3=10',6),
      q(6,'multiple_choice','Đo đúng cần?',[{key:'A',text:'Thước thẳng'},{key:'B',text:'Bắt đầu vạch 0'},{key:'C',text:'Đọc số cuối'},{key:'D',text:'Đo nhiều lần lấy trung bình'}],['A','B','C'],'hard','Quy trình đo cơ bản',7),
      q(6,'multiple_choice','Chu vi 20 cm có thể là?',[{key:'A',text:'HV cạnh 5cm'},{key:'B',text:'HCN 6×4cm'},{key:'C',text:'HCN 7×3cm'},{key:'D',text:'HV cạnh 4cm'}],['A','C'],'hard','4×5=20, (7+3)×2=20',8),
      q(6,'sorting','Sắp xếp chu vi tăng dần: HV3, HCN4×2, HV5, HCN6×3',[{key:'1',text:'HV cạnh 3 = 12cm'},{key:'2',text:'HCN 4×2 = 12cm'},{key:'3',text:'HV cạnh 5 = 20cm'},{key:'4',text:'HCN 6×3 = 18cm'}],['1','2','4','3'],'hard','12=12<18<20',9),
      q(6,'sorting','Sắp xếp từ hình có chu vi lớn nhất',[{key:'1',text:'HV cạnh 8 = 32cm'},{key:'2',text:'HCN 10×5 = 30cm'},{key:'3',text:'HV cạnh 6 = 24cm'},{key:'4',text:'HCN 7×4 = 22cm'}],['1','2','3','4'],'hard','32>30>24>22',10),
      // Ex7 hard
      q(7,'game','Phân loại: Đo được bằng thước kẻ / Cần thước dây',[{key:'c1',text:'Đoạn thẳng',pair:'thuoc_ke'},{key:'c2',text:'Vòng tay',pair:'thuoc_day'},{key:'c3',text:'Cạnh sách',pair:'thuoc_ke'},{key:'c4',text:'Chu vi quả bóng',pair:'thuoc_day'},{key:'c5',text:'Chiều cao cốc',pair:'thuoc_ke'},{key:'c6',text:'Sợi dây cong',pair:'thuoc_day'}],{},'hard','Thẳng dùng thước kẻ, cong dùng thước dây',1),
      q(7,'game','Phân loại: Chu vi dưới 20cm / Chu vi trên 20cm',[{key:'c1',text:'HV cạnh 4cm (16cm)',pair:'duoi'},{key:'c2',text:'HCN 8×5cm (26cm)',pair:'tren'},{key:'c3',text:'HV cạnh 3cm (12cm)',pair:'duoi'},{key:'c4',text:'HCN 7×4cm (22cm)',pair:'tren'},{key:'c5',text:'HV cạnh 5cm (20cm)',pair:'duoi'},{key:'c6',text:'HCN 9×3cm (24cm)',pair:'tren'}],{},'hard','So sánh chu vi với 20 cm',2),
      q(7,'matching','Nối hình với chu vi',[{key:'A',text:'HV cạnh 6cm'},{key:'B',text:'HCN 8×3cm'},{key:'C',text:'TG đều cạnh 7cm'}],{A:'24 cm',B:'22 cm',C:'21 cm'},'hard','Tính chu vi',3),
      q(7,'matching','Nối bài toán với đáp án',[{key:'A',text:'AB=6, BC=8, AC=?'},{key:'B',text:'PQ=15, QR=7, PR=?'},{key:'C',text:'XY=4, YZ=9, XZ=?'}],{A:'14 cm',B:'8 cm',C:'13 cm'},'hard','A+B, A-B hoặc tổng',4),
      q(7,'matching','Nối chu vi với cạnh hình vuông',[{key:'A',text:'Chu vi 24cm'},{key:'B',text:'Chu vi 32cm'},{key:'C',text:'Chu vi 40cm'}],{A:'6 cm',B:'8 cm',C:'10 cm'},'hard','Cạnh = CV÷4',5),
      q(7,'fill_blank','HCN vườn dài 9 m rộng 6 m. Hàng rào = [b1] m',[{key:'b1',text:'?'}],{b1:'30'},'hard','(9+6)×2=30',6),
      q(7,'fill_blank','Tam giác: 2 cạnh = 5cm, 8cm. Cạnh thứ 3 = ? nếu CV=20 cm → [b1] cm',[{key:'b1',text:'?'}],{b1:'7'},'hard','20-5-8=7',7),
      q(7,'fill_blank','HV A cạnh 4cm, HV B cạnh 3 lần HV A. Cạnh B = [b1] cm',[{key:'b1',text:'?'}],{b1:'12'},'hard','4×3=12',8),
      q(7,'fill_blank','CV HCN = 40 cm, rộng 7 cm. Dài = [b1] cm',[{key:'b1',text:'?'}],{b1:'13'},'hard','40÷2-7=13',9),
      q(7,'fill_blank','Sân hình vuông cạnh 8 m. Đi quanh sân = [b1] m',[{key:'b1',text:'?'}],{b1:'32'},'hard','4×8=32',10),
      // Ex8 hard
      q(8,'multiple_choice','Công thức chu vi hình chữ nhật?',[{key:'A',text:'dài + rộng'},{key:'B',text:'(dài + rộng) × 2'},{key:'C',text:'dài × rộng'},{key:'D',text:'4 × cạnh'}],['B'],'hard','CV HCN = (d+r)×2',1),
      q(8,'multiple_choice','Trường hợp nào chu vi = 20 cm?',[{key:'A',text:'HV cạnh 5cm'},{key:'B',text:'HCN 7×3cm'},{key:'C',text:'HCN 6×4cm'},{key:'D',text:'TG đều cạnh 6cm'}],['A','B'],'hard','4×5=20, (7+3)×2=20',2),
      q(8,'multiple_choice','Bước nào đúng khi đo?',[{key:'A',text:'Đặt 0 tại điểm đầu'},{key:'B',text:'Giữ thước thẳng'},{key:'C',text:'Ghi số kèm đơn vị'},{key:'D',text:'Đo từ cuối'}],['A','B','C'],'hard','3 bước đo đúng',3),
      q(8,'puzzle','Ghép: CV HCN = 26cm, dài 8. Rộng = [?] cm',[{key:'slot_1',text:'Rộng = [?] cm'},{key:'token_5',text:'5'},{key:'token_4',text:'4'},{key:'token_6',text:'6'}],{slot_1:'token_5'},'hard','26÷2-8=5',4),
      q(8,'puzzle','Ghép: TG cạnh 5, 6, 7. CV = [?] cm',[{key:'slot_1',text:'CV = [?] cm'},{key:'token_18',text:'18'},{key:'token_17',text:'17'},{key:'token_19',text:'19'}],{slot_1:'token_18'},'hard','5+6+7=18',5),
      q(8,'puzzle','Ghép: Hàng rào sân HV cạnh 6m = [?] m',[{key:'slot_1',text:'Hàng rào = [?] m'},{key:'token_24',text:'24'},{key:'token_20',text:'20'},{key:'token_28',text:'28'}],{slot_1:'token_24'},'hard','4×6=24',6),
      q(8,'sorting','Xếp tăng dần theo chu vi',[{key:'1',text:'HV cạnh 4 = 16cm'},{key:'2',text:'HCN 9×2 = 22cm'},{key:'3',text:'HV cạnh 3 = 12cm'},{key:'4',text:'HCN 6×5 = 22cm'}],['3','1','2','4'],'hard','12<16<22=22 (2 trước 4)',7),
      q(8,'sorting','Xếp giảm dần theo cạnh hình vuông biết chu vi',[{key:'1',text:'CV=36: cạnh 9cm'},{key:'2',text:'CV=20: cạnh 5cm'},{key:'3',text:'CV=28: cạnh 7cm'},{key:'4',text:'CV=24: cạnh 6cm'}],['1','3','4','2'],'hard','9>7>6>5',8),
      q(8,'cross_out','Gạch bỏ công thức sai cho hình vuông cạnh a',[{key:'A',text:'CV = 4a'},{key:'B',text:'CV = 2a'},{key:'C',text:'CV = a+a+a+a'},{key:'D',text:'CV = 3a'}],['B','D'],'hard','CV HV = 4a = a+a+a+a',9),
      q(8,'cross_out','Gạch bỏ phép tính sai',[{key:'A',text:'(6+4)×2=20'},{key:'B',text:'4×7=28'},{key:'C',text:'(8+3)×2=21'},{key:'D',text:'5+6+9=20'}],['C','D'],'hard','(8+3)×2=22, 5+6+9=20... 5+6+9=20? 20 đúng. Thực ra C sai vì 22≠21',9),
    ],
  },
};

async function seed() {
  const conn = await mysql.createConnection(dbConfig);
  try {
    for (const lessonId of lessonIds) {
      const { topic, questions } = data[lessonId];
      console.log(`Processing lesson ${lessonId}: ${topic}`);
      await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lessonId]);
      let i = 0;
      for (const q of questions) {
        const optionsJson = q.opts ? JSON.stringify(q.opts) : null;
        const correctAnswerJson = JSON.stringify(q.ans);
        await conn.execute(
          'INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())',
          [lessonId, q.ex, q.type, q.text, optionsJson, correctAnswerJson, q.diff, q.exp || null, q.pts, q.sort]
        );
        i++;
      }
      console.log(`  ✓ Inserted ${i} questions`);
    }
    console.log('Done!');
  } finally {
    await conn.end();
  }
}

seed().catch(console.error);
