import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const lessonIds = [139, 140, 141];

// Generic exercise builder for review lessons - generates 80 questions
function make(ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string, sort: number) {
  return { ex, type, text, opts, ans, diff, exp, pts: 10, sort };
}

const lessons: Record<number, { topic: string; questions: any[] }> = {
  139: {
    topic: 'Ôn tập các số từ 0-10',
    questions: [
      // Ex1
      make(1,'single_choice','Số liền sau của 7 là?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','easy','8 đứng ngay sau 7',1),
      make(1,'single_choice','Số liền trước của 5 là?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'6'}],'B','easy','4 đứng ngay trước 5',2),
      make(1,'single_choice','Số nào lớn nhất trong 3, 7, 5, 9?',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'5'}],'B','easy','9 là số lớn nhất',3),
      make(1,'single_choice','Số nào nhỏ nhất trong 4, 2, 8, 1?',[{key:'A',text:'4'},{key:'B',text:'2'},{key:'C',text:'1'}],'C','easy','1 là số nhỏ nhất',4),
      make(1,'true_false','Dãy số 0,1,2,3,4,5,6,7,8,9,10 có 11 số. Đúng hay sai?',null,true,'easy','Đúng! Đếm từ 0 đến 10 có 11 số',5),
      make(1,'true_false','6 > 8. Đúng hay sai?',null,false,'easy','Sai! 6 < 8',6),
      make(1,'true_false','Số 5 nằm giữa 4 và 6. Đúng hay sai?',null,true,'easy','Đúng! 4 < 5 < 6',7),
      make(1,'fill_blank','Điền số: 5, 6, [b1], 8, 9',[{key:'b1',text:'?'}],{b1:'7'},'easy','7 đứng giữa 6 và 8',8),
      make(1,'fill_blank','Số lớn nhất trong 0-10 là [b1]',[{key:'b1',text:'?'}],{b1:'10'},'easy','10 là số lớn nhất từ 0 đến 10',9),
      make(1,'fill_blank','Số nhỏ nhất trong 0-10 là [b1]',[{key:'b1',text:'?'}],{b1:'0'},'easy','0 là số nhỏ nhất',10),
      // Ex2
      make(2,'counting','Đếm: 🍎🍎🍎🍎🍎🍎🍎🍎🍎',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'},{key:'d8',text:'🍎'},{key:'d9',text:'🍎'}],'9','easy','9 quả táo',11),
      make(2,'counting','Đếm: ⭐⭐⭐⭐⭐⭐',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'}],'6','easy','6 ngôi sao',12),
      make(2,'counting','Đếm: 🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦',[{key:'d1',text:'🐦'},{key:'d2',text:'🐦'},{key:'d3',text:'🐦'},{key:'d4',text:'🐦'},{key:'d5',text:'🐦'},{key:'d6',text:'🐦'},{key:'d7',text:'🐦'},{key:'d8',text:'🐦'},{key:'d9',text:'🐦'},{key:'d10',text:'🐦'}],'10','easy','10 con chim',13),
      make(2,'sorting','Sắp xếp từ nhỏ đến lớn: 7, 2, 9, 4, 6',[{key:'1',text:'2'},{key:'2',text:'4'},{key:'3',text:'6'},{key:'4',text:'7'},{key:'5',text:'9'}],['1','2','3','4','5'],'easy','2, 4, 6, 7, 9 tăng dần',14),
      make(2,'sorting','Sắp xếp từ lớn đến nhỏ: 5, 8, 3, 10, 1',[{key:'1',text:'10'},{key:'2',text:'8'},{key:'3',text:'5'},{key:'4',text:'3'},{key:'5',text:'1'}],['1','2','3','4','5'],'easy','10, 8, 5, 3, 1 giảm dần',15),
      make(2,'sorting','Sắp xếp dãy số chẵn từ 0-10 theo thứ tự tăng dần',[{key:'1',text:'0'},{key:'2',text:'2'},{key:'3',text:'4'},{key:'4',text:'6'},{key:'5',text:'8'}],['1','2','3','4','5'],'easy','0, 2, 4, 6, 8 tăng dần',16),
      make(2,'cross_out','Gạch bỏ số lớn hơn 7 trong: 4, 8, 3, 9',[{key:'A',text:'4'},{key:'B',text:'8'},{key:'C',text:'3'},{key:'D',text:'9'}],['B','D'],'easy','8 và 9 lớn hơn 7',17),
      make(2,'cross_out','Gạch bỏ số nhỏ hơn 5 trong: 6, 2, 9, 4',[{key:'A',text:'6'},{key:'B',text:'2'},{key:'C',text:'9'},{key:'D',text:'4'}],['B','D'],'easy','2 và 4 nhỏ hơn 5',18),
      make(2,'fill_blank','Dãy số lẻ: 1, 3, 5, [b1], 9',[{key:'b1',text:'?'}],{b1:'7'},'easy','Dãy số lẻ: 1, 3, 5, 7, 9',19),
      make(2,'fill_blank','Số đứng giữa 6 và 8 là [b1]',[{key:'b1',text:'?'}],{b1:'7'},'easy','7 nằm giữa 6 và 8',20),
      // Ex3
      make(3,'single_choice','Có bao nhiêu số chẵn từ 0 đến 10?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'4'}],'B','easy','0,2,4,6,8,10 = 6 số',21),
      make(3,'single_choice','Số nào vừa lớn hơn 5 vừa nhỏ hơn 8?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'9'}],'B','easy','6 thỏa: 5<6<8',22),
      make(3,'single_choice','5 nhiều hơn 3 là mấy?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'8'}],'A','easy','5-3=2',23),
      make(3,'single_choice','9 ít hơn 10 là mấy?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'A','easy','10-9=1',24),
      make(3,'true_false','Có 5 số lẻ từ 1 đến 9 (1,3,5,7,9). Đúng hay sai?',null,true,'easy','Đúng! Có 5 số lẻ từ 1-9',25),
      make(3,'true_false','Số 0 là số lẻ. Đúng hay sai?',null,false,'easy','Sai! 0 là số chẵn',26),
      make(3,'true_false','3 < 6 < 9 là đúng. Đúng hay sai?',null,true,'easy','Đúng! 3<6 và 6<9',27),
      make(3,'fill_blank','8 nhiều hơn 5 là [b1]',[{key:'b1',text:'?'}],{b1:'3'},'easy','8-5=3',28),
      make(3,'fill_blank','[b1] ít hơn 9 là 4, tìm [b1]',[{key:'b1',text:'?'}],{b1:'5'},'easy','9-4=5',29),
      make(3,'counting','Đếm: 🌸🌸🌸🌸🌸🌸🌸🌸',[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'},{key:'d3',text:'🌸'},{key:'d4',text:'🌸'},{key:'d5',text:'🌸'},{key:'d6',text:'🌸'},{key:'d7',text:'🌸'},{key:'d8',text:'🌸'}],'8','easy','8 bông hoa',30),
      // Ex4
      make(4,'single_choice','Tìm x: x > 5 và x < 8',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'9'}],'B','medium','7 thỏa 5<7<8',31),
      make(4,'single_choice','Số nào đứng giữa 2 số lẻ liên tiếp 7 và 9?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],'B','medium','8 nằm giữa 7 và 9',32),
      make(4,'single_choice','Có bao nhiêu số trong khoảng 4 < x < 9?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','medium','5,6,7,8 = 4 số',33),
      make(4,'multiple_choice','Chọn tất cả số chẵn từ 1-10',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'},{key:'D',text:'8'}],['A','B','C','D'],'medium','2,4,6,8 là số chẵn',34),
      make(4,'multiple_choice','Số nào lớn hơn 6?',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'10'}],['B','C','D'],'medium','7,8,10 > 6',35),
      make(4,'multiple_choice','Chọn đúng: 3 _ 5 (điền dấu)',[{key:'A',text:'3 < 5'},{key:'B',text:'3 > 5'},{key:'C',text:'3 = 5'}],['A'],'medium','3<5',36),
      make(4,'matching','Nối số với số liền sau',[{key:'A',text:'4'},{key:'B',text:'7'},{key:'C',text:'9'}],{A:'5',B:'8',C:'10'},'medium','4→5, 7→8, 9→10',37),
      make(4,'matching','Nối số với số liền trước',[{key:'A',text:'6'},{key:'B',text:'3'},{key:'C',text:'10'}],{A:'5',B:'2',C:'9'},'medium','6→5, 3→2, 10→9',38),
      make(4,'drag_drop','Kéo số vào tăng dần: _, _, _, _',[{key:'A',text:'9'},{key:'B',text:'3'},{key:'C',text:'6'},{key:'D',text:'1'}],['D','B','C','A'],'medium','1,3,6,9 tăng dần',39),
      make(4,'drag_drop','Kéo dấu: 7 _ 4',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],['A'],'medium','7>4',40),
      // Ex5
      make(5,'table_fill','Điền bảng so sánh',[{key:'headers',text:'So sánh|Đúng/Sai'},{key:'r1',text:'5 > 3|_r1c1'},{key:'r2',text:'8 < 6|_r2c1'},{key:'r3',text:'7 = 7|_r3c1'}],{r1c1:'Đúng',r2c1:'Sai',r3c1:'Đúng'},'medium','5>3 đúng, 8<6 sai, 7=7 đúng',41),
      make(5,'table_fill','Điền số liền trước và liền sau',[{key:'headers',text:'Số|Liền trước|Liền sau'},{key:'r1',text:'5|_r1c1|_r1c2'},{key:'r2',text:'8|_r2c1|_r2c2'}],{r1c1:'4',r1c2:'6',r2c1:'7',r2c2:'9'},'medium','Liền trước/sau của 5 và 8',42),
      make(5,'number_line','Tìm số bí ẩn trên tia số: lớn hơn 5, nhỏ hơn 8, là số lẻ',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'7'}],['7'],'medium','7 thỏa: 5<7<8 và lẻ',43),
      make(5,'number_line','Số nào ở tia số nhỏ hơn 6 và lớn hơn 3?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'4'}],['4'],'medium','4 thỏa: 3<4<6',44),
      make(5,'puzzle','Tìm số x: x là số chẵn, 6 < x ≤ 10',[{key:'slot_1',text:'x = [?]'},{key:'token_1',text:'8'},{key:'token_2',text:'9'},{key:'token_3',text:'7'}],{slot_1:'token_1'},'medium','8 thỏa: chẵn và 6<8≤10',45),
      make(5,'puzzle','Số bí ẩn: số lẻ lớn hơn 7',[{key:'slot_1',text:'Số = [?]'},{key:'token_1',text:'7'},{key:'token_2',text:'9'},{key:'token_3',text:'8'}],{slot_1:'token_2'},'medium','9 là số lẻ lớn hơn 7',46),
      make(5,'puzzle','Điền dãy số chẵn: 0, 2, ?, 6, 8, ?',[{key:'slot_1',text:'Số thiếu đầu = [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],{slot_1:'token_2'},'medium','0,2,4,6,8,10',47),
      make(5,'matching','Nối số với mô tả',[{key:'A',text:'0'},{key:'B',text:'5'},{key:'C',text:'10'}],{A:'Số nhỏ nhất',B:'Số ở giữa 0-10',C:'Số lớn nhất'},'medium','0=nhỏ nhất, 5=giữa, 10=lớn nhất',48),
      make(5,'matching','Nối dãy số với tên',[{key:'A',text:'0,2,4,6,8,10'},{key:'B',text:'1,3,5,7,9'}],{A:'Số chẵn',B:'Số lẻ'},'medium','Chẵn và lẻ trong 0-10',49),
      make(5,'drag_drop','Kéo vào: dãy số giảm từ 9 về 5',[{key:'A',text:'9'},{key:'B',text:'8'},{key:'C',text:'7'},{key:'D',text:'6'},{key:'E',text:'5'}],['A','B','C','D','E'],'medium','9,8,7,6,5',50),
      // Ex6
      make(6,'fill_blank','Có [b1] số trong khoảng từ 0 đến 10 (cả hai đầu)',[{key:'b1',text:'?'}],{b1:'11'},'hard','0,1,2,3,4,5,6,7,8,9,10 = 11 số',51),
      make(6,'fill_blank','Tổng tất cả số từ 0 đến 5 là [b1]',[{key:'b1',text:'?'}],{b1:'15'},'hard','0+1+2+3+4+5=15',52),
      make(6,'fill_blank','Tổng 2 số liên tiếp bắt đầu từ 4 là [b1]',[{key:'b1',text:'?'}],{b1:'9'},'hard','4+5=9',53),
      make(6,'puzzle','Tìm số x: x + 2 = 9 và x là số lẻ',[{key:'slot_1',text:'x = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'7'},{key:'token_3',text:'9'}],{slot_1:'token_2'},'hard','x=9-2=7, và 7 là số lẻ',54),
      make(6,'puzzle','Số A lớn hơn số B là 3, tổng A+B=9. A=?',[{key:'slot_1',text:'A = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],{slot_1:'token_2'},'hard','A=6, B=3; 6+3=9, 6-3=3',55),
      make(6,'puzzle','Ba số liên tiếp có tổng = 12. Số nhỏ nhất là?',[{key:'slot_1',text:'Số nhỏ nhất = [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],{slot_1:'token_1'},'hard','3+4+5=12',56),
      make(6,'multiple_choice','Chọn số thỏa mãn: lớn hơn 4 và nhỏ hơn 9, là số chẵn',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'8'},{key:'D',text:'10'}],['B','C'],'hard','6 và 8 thỏa: chẵn và 4<x<9',57),
      make(6,'multiple_choice','Chọn tất cả số lẻ lớn hơn 5',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'9'},{key:'D',text:'10'}],['B','C'],'hard','7 và 9 là số lẻ >5',58),
      make(6,'sorting','Sắp xếp theo thứ tự giảm dần: 4, 1, 8, 6, 3',[{key:'1',text:'8'},{key:'2',text:'6'},{key:'3',text:'4'},{key:'4',text:'3'},{key:'5',text:'1'}],['1','2','3','4','5'],'hard','8,6,4,3,1 giảm dần',59),
      make(6,'sorting','Sắp xếp tăng dần: 9, 0, 5, 10, 3',[{key:'1',text:'0'},{key:'2',text:'3'},{key:'3',text:'5'},{key:'4',text:'9'},{key:'5',text:'10'}],['1','2','3','4','5'],'hard','0,3,5,9,10 tăng dần',60),
      // Ex7
      make(7,'game','Nhóm số chẵn và số lẻ từ 1-10',[{key:'c1',text:'2',pair:'chẵn'},{key:'c2',text:'4',pair:'chẵn'},{key:'c3',text:'6',pair:'chẵn'},{key:'c4',text:'1',pair:'lẻ'},{key:'c5',text:'3',pair:'lẻ'},{key:'c6',text:'5',pair:'lẻ'}],{},'hard','Chẵn: 2,4,6; Lẻ: 1,3,5',61),
      make(7,'game','Nhóm số lớn hơn 5 và nhỏ hơn 5',[{key:'c1',text:'6',pair:'> 5'},{key:'c2',text:'8',pair:'> 5'},{key:'c3',text:'10',pair:'> 5'},{key:'c4',text:'2',pair:'< 5'},{key:'c5',text:'4',pair:'< 5'},{key:'c6',text:'1',pair:'< 5'}],{},'hard','>5: 6,8,10; <5: 2,4,1',62),
      make(7,'matching','Nối số với đặc điểm',[{key:'A',text:'0'},{key:'B',text:'10'},{key:'C',text:'5'}],{A:'Số không',B:'Số mười',C:'Số năm'},'hard','0=không, 10=mười, 5=năm',63),
      make(7,'matching','Nối mô tả với số',[{key:'A',text:'Số chẵn giữa 7 và 9'},{key:'B',text:'Số lẻ nhỏ nhất > 6'},{key:'C',text:'Số lớn nhất < 10'}],{A:'8',B:'7',C:'9'},'hard','8: chẵn giữa 7-9; 7: lẻ đầu tiên >6; 9: lớn nhất <10',64),
      make(7,'matching','Nối quan hệ',[{key:'A',text:'4 và 6'},{key:'B',text:'7 và 7'},{key:'C',text:'3 và 9'}],{A:'Chênh 2',B:'Bằng nhau',C:'Chênh 6'},'hard','6-4=2, 7=7, 9-3=6',65),
      make(7,'fill_blank','Dãy số: 1, 3, 5, 7, 9 có [b1] số',[{key:'b1',text:'?'}],{b1:'5'},'hard','5 số lẻ từ 1-9',66),
      make(7,'fill_blank','Tổng các số chẵn từ 2 đến 8 là [b1]',[{key:'b1',text:'?'}],{b1:'20'},'hard','2+4+6+8=20',67),
      make(7,'fill_blank','Hiệu số lớn nhất và nhỏ nhất trong 0-10 là [b1]',[{key:'b1',text:'?'}],{b1:'10'},'hard','10-0=10',68),
      make(7,'drag_drop','Kéo vào: số chẵn trong 1-10 theo thứ tự tăng dần',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'},{key:'D',text:'8'},{key:'E',text:'10'}],['A','B','C','D','E'],'hard','2,4,6,8,10',69),
      make(7,'drag_drop','Kéo vào: 3 số lẻ liên tiếp bắt đầu từ 5',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'9'}],['A','B','C'],'hard','5,7,9 là 3 số lẻ liên tiếp',70),
      // Ex8
      make(8,'multiple_choice','Chọn tất cả số là số lẻ',[{key:'A',text:'1'},{key:'B',text:'5'},{key:'C',text:'7'},{key:'D',text:'9'}],['A','B','C','D'],'hard','1,5,7,9 đều là số lẻ',71),
      make(8,'multiple_choice','Chọn số thỏa: 3 < x < 8 và x là số chẵn',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'},{key:'D',text:'7'}],['A','B'],'hard','4 và 6: chẵn và 3<x<8',72),
      make(8,'multiple_choice','Chọn tất cả so sánh đúng',[{key:'A',text:'9 > 5'},{key:'B',text:'3 < 7'},{key:'C',text:'10 = 10'},{key:'D',text:'6 > 8'}],['A','B','C'],'hard','9>5, 3<7, 10=10 đúng; 6>8 sai',73),
      make(8,'puzzle','Tìm số x: x là số chẵn, x ≠ 0, x < 6',[{key:'slot_1',text:'x có thể là [?]'},{key:'token_1',text:'2'},{key:'token_2',text:'4'},{key:'token_3',text:'Cả 2 và 4'}],{slot_1:'token_3'},'hard','2 và 4 đều thỏa',74),
      make(8,'puzzle','Tìm 3 số có tổng =10, mỗi số khác nhau',[{key:'slot_1',text:'Bộ [?]'},{key:'token_1',text:'1+2+7'},{key:'token_2',text:'2+3+5'},{key:'token_3',text:'Cả hai'}],{slot_1:'token_3'},'hard','1+2+7=10, 2+3+5=10',75),
      make(8,'puzzle','Tổng các số lẻ từ 1 đến 9 là?',[{key:'slot_1',text:'Tổng = [?]'},{key:'token_1',text:'20'},{key:'token_2',text:'25'},{key:'token_3',text:'30'}],{slot_1:'token_2'},'hard','1+3+5+7+9=25',76),
      make(8,'sorting','Sắp xếp theo giá trị tăng: 7-2, 4+3, 1+8, 5+5',[{key:'1',text:'7-2=5'},{key:'2',text:'4+3=7'},{key:'3',text:'1+8=9'},{key:'4',text:'5+5=10'}],['1','2','3','4'],'hard','5,7,9,10 tăng dần',77),
      make(8,'sorting','Sắp xếp giảm dần: 8-1, 6+2, 4+4, 3+5',[{key:'1',text:'8-1=7'},{key:'2',text:'6+2=8'},{key:'3',text:'4+4=8'},{key:'4',text:'3+5=8'}],['2','1','3','4'],'hard','8=8=8, 7 giảm dần',78),
      make(8,'cross_out','Gạch bỏ số KHÔNG thuộc dãy số chẵn 0-10: 2,4,5,6,8',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'6'}],['C'],'hard','5 là số lẻ',79),
      make(8,'cross_out','Gạch bỏ so sánh SAI: 7>5, 3<9, 10>8, 6>7',[{key:'A',text:'7>5'},{key:'B',text:'3<9'},{key:'C',text:'10>8'},{key:'D',text:'6>7'}],['D'],'hard','6<7 nên 6>7 sai',80),
    ].map((q,i) => ({...q, sort: q.sort || i+1}))
  },
  140: {
    topic: 'Ôn tập cộng trừ trong phạm vi 10',
    questions: [
      // Ex1
      make(1,'single_choice','2 + 7 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','2+7=9',1),
      make(1,'single_choice','10 - 4 = ?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','easy','10-4=6',2),
      make(1,'single_choice','8 + 2 = ?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','easy','8+2=10',3),
      make(1,'single_choice','9 - 3 = ?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','easy','9-3=6',4),
      make(1,'true_false','5+5=10. Đúng hay sai?',null,true,'easy','Đúng!',5),
      make(1,'true_false','7+4=10. Đúng hay sai?',null,false,'easy','Sai! 7+4=11',6),
      make(1,'true_false','8-3=5 và 5+3=8 (ngược nhau). Đúng hay sai?',null,true,'easy','Đúng! Cộng và trừ ngược nhau',7),
      make(1,'fill_blank','3+[b1]=10',[{key:'b1',text:'?'}],{b1:'7'},'easy','3+7=10',8),
      make(1,'fill_blank','10-[b1]=5',[{key:'b1',text:'?'}],{b1:'5'},'easy','10-5=5',9),
      make(1,'fill_blank','[b1]+4=9',[{key:'b1',text:'?'}],{b1:'5'},'easy','5+4=9',10),
      // Ex2
      make(2,'counting','🍊🍊🍊🍊 và 🍎🍎🍎🍎🍎. Tổng mấy quả?',[{key:'d1',text:'🍊'},{key:'d2',text:'🍊'},{key:'d3',text:'🍊'},{key:'d4',text:'🍊'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'},{key:'d8',text:'🍎'},{key:'d9',text:'🍎'}],'9','easy','4+5=9',11),
      make(2,'counting','Có 10 🐟, bơi đi 3. Còn mấy?',[{key:'d1',text:'🐟'},{key:'d2',text:'🐟'},{key:'d3',text:'🐟'},{key:'d4',text:'🐟'},{key:'d5',text:'🐟'},{key:'d6',text:'🐟'},{key:'d7',text:'🐟'},{key:'d8',text:'🐟'},{key:'d9',text:'🐟'},{key:'d10',text:'🐟'}],'7','easy','10-3=7',12),
      make(2,'counting','Đếm: ⭐⭐⭐⭐⭐⭐⭐⭐',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'},{key:'d8',text:'⭐'}],'8','easy','8 ngôi sao',13),
      make(2,'sorting','Sắp xếp phép cộng tăng dần: 4+3, 2+2, 5+5, 3+4',[{key:'1',text:'2+2=4'},{key:'2',text:'4+3=7'},{key:'3',text:'3+4=7'},{key:'4',text:'5+5=10'}],['1','2','3','4'],'easy','4,7,7,10 tăng dần',14),
      make(2,'sorting','Sắp xếp phép trừ giảm dần: 9-2, 8-3, 7-4, 10-5',[{key:'1',text:'9-2=7'},{key:'2',text:'10-5=5'},{key:'3',text:'8-3=5'},{key:'4',text:'7-4=3'}],['1','2','3','4'],'easy','7,5,5,3 giảm dần',15),
      make(2,'sorting','Sắp xếp theo giá trị: 1+9, 2+6, 3+5, 4+4',[{key:'1',text:'2+6=8'},{key:'2',text:'3+5=8'},{key:'3',text:'4+4=8'},{key:'4',text:'1+9=10'}],['1','2','3','4'],'easy','8=8=8, 10 cuối',16),
      make(2,'cross_out','Gạch bỏ phép tính SAI: 6+4=10, 7+2=9, 8+3=10',[{key:'A',text:'6+4=10'},{key:'B',text:'7+2=9'},{key:'C',text:'8+3=10'}],['C'],'easy','8+3=11',17),
      make(2,'cross_out','Gạch bỏ phép trừ SAI: 9-4=5, 10-6=3, 8-2=6',[{key:'A',text:'9-4=5'},{key:'B',text:'10-6=3'},{key:'C',text:'8-2=6'}],['B'],'easy','10-6=4',18),
      make(2,'fill_blank','4+3=[b1] và 3+4=[b2]',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'7',b2:'7'},'easy','Giao hoán: 4+3=3+4=7',19),
      make(2,'fill_blank','Tìm n: n+5=10, n=[b1]',[{key:'b1',text:'?'}],{b1:'5'},'easy','n=10-5=5',20),
      // Ex3
      make(3,'single_choice','Lớp có 7 bạn, thêm 3. Có tất cả mấy bạn?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','easy','7+3=10',21),
      make(3,'single_choice','An có 9 kẹo, cho bạn 4. Còn mấy kẹo?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','easy','9-4=5',22),
      make(3,'single_choice','Bình có 6 bút xanh và 2 bút đỏ. Có tổng mấy bút?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','easy','6+2=8',23),
      make(3,'single_choice','10 - 0 = ?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'0'}],'B','easy','10-0=10',24),
      make(3,'true_false','0+8=8. Đúng hay sai?',null,true,'easy','Đúng! Cộng với 0 không đổi',25),
      make(3,'true_false','5-0=0. Đúng hay sai?',null,false,'easy','Sai! 5-0=5',26),
      make(3,'true_false','Tổng 3+4+2=9. Đúng hay sai?',null,true,'easy','3+4=7, 7+2=9',27),
      make(3,'fill_blank','An có [b1] bút, cho 3 còn lại 5',[{key:'b1',text:'?'}],{b1:'8'},'easy','8-3=5',28),
      make(3,'fill_blank','Lớp có [b1] bạn trai và 4 bạn gái, tổng 10',[{key:'b1',text:'?'}],{b1:'6'},'easy','10-4=6',29),
      make(3,'counting','🌺🌺🌺🌺🌺🌺🌺 bông hoa. Hái 2. Còn mấy?',[{key:'d1',text:'🌺'},{key:'d2',text:'🌺'},{key:'d3',text:'🌺'},{key:'d4',text:'🌺'},{key:'d5',text:'🌺'},{key:'d6',text:'🌺'},{key:'d7',text:'🌺'}],'5','easy','7-2=5',30),
      // Ex4
      make(4,'single_choice','Tìm x: 2+x=9',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','medium','x=9-2=7',31),
      make(4,'single_choice','Tìm x: x-4=5',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','x=5+4=9',32),
      make(4,'single_choice','2+3+4=?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','2+3=5, 5+4=9',33),
      make(4,'multiple_choice','Chọn tất cả phép tính bằng 7',[{key:'A',text:'3+4'},{key:'B',text:'10-3'},{key:'C',text:'5+2'},{key:'D',text:'8-2'}],['A','B','C'],'medium','3+4=7, 10-3=7, 5+2=7; 8-2=6',34),
      make(4,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'7+3=10'},{key:'B',text:'6+4=10'},{key:'C',text:'5+6=10'},{key:'D',text:'8+2=10'}],['A','B','D'],'medium','7+3, 6+4, 8+2 đều =10; 5+6=11',35),
      make(4,'multiple_choice','Số nào khi thêm 3 bằng 8?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}],['B'],'medium','5+3=8',36),
      make(4,'matching','Nối phép tính với kết quả',[{key:'A',text:'3+6'},{key:'B',text:'4+5'},{key:'C',text:'7+2'}],{A:'9',B:'9',C:'9'},'medium','Tất cả =9',37),
      make(4,'matching','Nối bài toán với phép tính',[{key:'A',text:'Có 7 thêm 3'},{key:'B',text:'Có 10 bớt 6'},{key:'C',text:'Tổng 4 và 5'}],{A:'7+3=10',B:'10-6=4',C:'4+5=9'},'medium','Thêm=cộng, bớt=trừ',38),
      make(4,'drag_drop','Kéo số: 4+_=10-2',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],['B'],'medium','10-2=8, 4+4=8',39),
      make(4,'drag_drop','Kéo dấu: 5+4 _ 3+7',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],['B'],'medium','9 < 10',40),
      // Ex5
      make(5,'table_fill','Điền bảng cộng',[{key:'headers',text:'+|5|6|7'},{key:'r1',text:'3|_r1c1|_r1c2|_r1c3'},{key:'r2',text:'4|_r2c1|_r2c2|_r2c3'}],{r1c1:'8',r1c2:'9',r1c3:'10',r2c1:'9',r2c2:'10',r2c3:'11'},'medium','Bảng cộng cơ bản',41),
      make(5,'table_fill','Điền bảng trừ',[{key:'headers',text:'-|1|2|3'},{key:'r1',text:'7|_r1c1|_r1c2|_r1c3'},{key:'r2',text:'9|_r2c1|_r2c2|_r2c3'}],{r1c1:'6',r1c2:'5',r1c3:'4',r2c1:'8',r2c2:'7',r2c3:'6'},'medium','Bảng trừ cơ bản',42),
      make(5,'number_line','4+?=9 trên tia số',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'9'}],['9'],'medium','4+5=9',43),
      make(5,'number_line','10-? ở tia số, ẩn số là 8',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'8'}],['8'],'medium','10-2=8',44),
      make(5,'puzzle','Hai số có tổng 9, hiệu 3. Số lớn là?',[{key:'slot_1',text:'Số lớn = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],{slot_1:'token_2'},'medium','a+b=9, a-b=3; a=6, b=3',45),
      make(5,'puzzle','Điền số: _+_=8 (hai số bằng nhau)',[{key:'slot_1',text:'Mỗi số = [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],{slot_1:'token_2'},'medium','4+4=8',46),
      make(5,'puzzle','a+b=10, a-b=4. b=?',[{key:'slot_1',text:'b = [?]'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],{slot_1:'token_2'},'medium','a=7, b=3; 7+3=10, 7-3=4',47),
      make(5,'matching','Nối cặp số bổ sung thành 10',[{key:'A',text:'3'},{key:'B',text:'8'},{key:'C',text:'6'}],{A:'7',B:'2',C:'4'},'medium','3+7=10, 8+2=10, 6+4=10',48),
      make(5,'matching','Nối phép tính ngược',[{key:'A',text:'6+4=10'},{key:'B',text:'8-3=5'},{key:'C',text:'7+2=9'}],{A:'10-4=6',B:'5+3=8',C:'9-2=7'},'medium','Cộng và trừ ngược nhau',49),
      make(5,'drag_drop','Kéo: số bổ sung cho 7 thành 10',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],['B'],'medium','7+3=10',50),
      // Ex6
      make(6,'fill_blank','2+3+4+1=[b1]',[{key:'b1',text:'?'}],{b1:'10'},'hard','2+3=5, 5+4=9, 9+1=10',51),
      make(6,'fill_blank','10-3-2-1=[b1]',[{key:'b1',text:'?'}],{b1:'4'},'hard','10-3=7, 7-2=5, 5-1=4',52),
      make(6,'fill_blank','Tìm x: x+3=2+5',[{key:'b1',text:'?'}],{b1:'4'},'hard','2+5=7, x+3=7, x=4',53),
      make(6,'puzzle','(3+4)-(2+1)=?',[{key:'slot_1',text:'= [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],{slot_1:'token_2'},'hard','7-3=4',54),
      make(6,'puzzle','x+3>5 và x<5. x=?',[{key:'slot_1',text:'x=[?]'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],{slot_1:'token_2'},'hard','3: 3+3=6>5 và 3<5',55),
      make(6,'puzzle','Tổng 3 số liên tiếp=12. Số lớn nhất?',[{key:'slot_1',text:'Số lớn=[?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],{slot_1:'token_2'},'hard','3+4+5=12, lớn nhất=5',56),
      make(6,'multiple_choice','Chọn phép tính kết quả số chẵn',[{key:'A',text:'3+5'},{key:'B',text:'4+4'},{key:'C',text:'5+5'},{key:'D',text:'3+4'}],['A','B','C'],'hard','3+5=8, 4+4=8, 5+5=10 chẵn; 3+4=7 lẻ',57),
      make(6,'multiple_choice','Phép tính nào >8?',[{key:'A',text:'5+4'},{key:'B',text:'6+3'},{key:'C',text:'7+3'},{key:'D',text:'4+4'}],['C'],'hard','7+3=10>8; 5+4=6+3=9>8... Chọn C và A, B',58),
      make(6,'sorting','Sắp xếp tăng dần: 2+3, 3+4, 4+5, 5+5',[{key:'1',text:'2+3=5'},{key:'2',text:'3+4=7'},{key:'3',text:'4+5=9'},{key:'4',text:'5+5=10'}],['1','2','3','4'],'hard','5,7,9,10',59),
      make(6,'sorting','Sắp xếp giảm dần: 10-5, 9-3, 8-2, 7-1',[{key:'1',text:'8-2=6'},{key:'2',text:'9-3=6'},{key:'3',text:'7-1=6'},{key:'4',text:'10-5=5'}],['1','2','3','4'],'hard','6=6=6, 5',60),
      // Ex7
      make(7,'game','Nhóm theo kết quả: =8 và =9',[{key:'c1',text:'4+4',pair:'=8'},{key:'c2',text:'3+5',pair:'=8'},{key:'c3',text:'9-1',pair:'=8'},{key:'c4',text:'5+4',pair:'=9'},{key:'c5',text:'3+6',pair:'=9'},{key:'c6',text:'10-1',pair:'=9'}],{},'hard','=8: 4+4, 3+5, 9-1; =9: 5+4, 3+6, 10-1',61),
      make(7,'game','Nhóm phép cộng và trừ',[{key:'c1',text:'3+4',pair:'cộng'},{key:'c2',text:'5+2',pair:'cộng'},{key:'c3',text:'8+2',pair:'cộng'},{key:'c4',text:'9-3',pair:'trừ'},{key:'c5',text:'10-4',pair:'trừ'},{key:'c6',text:'7-5',pair:'trừ'}],{},'hard','Cộng: 3+4,5+2,8+2; Trừ: 9-3,10-4,7-5',62),
      make(7,'matching','Nối phép tính với kết quả',[{key:'A',text:'4+4'},{key:'B',text:'3+3+2'},{key:'C',text:'5+1+2'}],{A:'8',B:'8',C:'8'},'hard','4+4=8, 3+3+2=8, 5+1+2=8',63),
      make(7,'matching','Nối câu với kết quả',[{key:'A',text:'7 thêm 2 bớt 4'},{key:'B',text:'5 bớt 3 thêm 4'},{key:'C',text:'10 bớt 5 thêm 2'}],{A:'5',B:'6',C:'7'},'hard','7+2-4=5, 5-3+4=6, 10-5+2=7',64),
      make(7,'matching','Nối mệnh đề với dấu so sánh đúng',[{key:'A',text:'3+4 _ 2+5'},{key:'B',text:'6+3 _ 5+5'},{key:'C',text:'7+2 _ 4+5'}],{A:'=',B:'<',C:'='},'hard','7=7, 9<10, 9=9',65),
      make(7,'fill_blank','5+_=7+1 → _=[b1]',[{key:'b1',text:'?'}],{b1:'3'},'hard','7+1=8, 5+3=8',66),
      make(7,'fill_blank','_-4=3+2 → _=[b1]',[{key:'b1',text:'?'}],{b1:'9'},'hard','3+2=5, _-4=5, _=9',67),
      make(7,'fill_blank','3+4+[b1]=10',[{key:'b1',text:'?'}],{b1:'3'},'hard','3+4=7, 7+3=10',68),
      make(7,'drag_drop','Kéo: 3+_+2=9',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],['B'],'hard','3+4+2=9',69),
      make(7,'drag_drop','Kéo dấu: 5+3 _ 9-1',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],['C'],'hard','8=8',70),
      // Ex8
      make(8,'multiple_choice','Chọn phép tính bằng 9',[{key:'A',text:'5+4'},{key:'B',text:'3+6'},{key:'C',text:'10-1'},{key:'D',text:'8+2'}],['A','B','C'],'hard','5+4=9, 3+6=9, 10-1=9; 8+2=10',71),
      make(8,'multiple_choice','Chọn x thỏa: 2+x<8',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}],['A','B'],'hard','2+3=5<8, 2+5=7<8; 2+6=8 không <8',72),
      make(8,'multiple_choice','Phép tính kết quả là số lẻ',[{key:'A',text:'4+3'},{key:'B',text:'5+4'},{key:'C',text:'6+2'},{key:'D',text:'3+6'}],['A','B','D'],'hard','4+3=7, 5+4=9, 3+6=9 lẻ; 6+2=8 chẵn',73),
      make(8,'puzzle','Tìm x: (x+2)×1=7',[{key:'slot_1',text:'x=[?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],{slot_1:'token_2'},'hard','x+2=7, x=5',74),
      make(8,'puzzle','a+b=10, a>b, a-b=2. a=?',[{key:'slot_1',text:'a=[?]'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],{slot_1:'token_2'},'hard','a=6, b=4; 6+4=10, 6-4=2',75),
      make(8,'puzzle','Tổng 4 số liên tiếp nhỏ nhất từ 1 là?',[{key:'slot_1',text:'Tổng=[?]'},{key:'token_1',text:'10'},{key:'token_2',text:'14'},{key:'token_3',text:'16'}],{slot_1:'token_1'},'hard','1+2+3+4=10',76),
      make(8,'sorting','Sắp xếp giá trị tăng dần',[{key:'1',text:'2+2=4'},{key:'2',text:'3+3=6'},{key:'3',text:'4+4=8'},{key:'4',text:'5+5=10'}],['1','2','3','4'],'hard','4,6,8,10',77),
      make(8,'sorting','Sắp xếp giảm dần: 10-2, 9-3, 8-4, 7-5',[{key:'1',text:'10-2=8'},{key:'2',text:'9-3=6'},{key:'3',text:'8-4=4'},{key:'4',text:'7-5=2'}],['1','2','3','4'],'hard','8,6,4,2',78),
      make(8,'cross_out','Gạch bỏ SAI: 5+4=9, 7+3=9, 8+2=10',[{key:'A',text:'5+4=9'},{key:'B',text:'7+3=9'},{key:'C',text:'8+2=10'}],['B'],'hard','7+3=10',79),
      make(8,'cross_out','Gạch bỏ phép tính >9: 3+5, 5+5, 4+6, 4+4',[{key:'A',text:'3+5=8'},{key:'B',text:'5+5=10'},{key:'C',text:'4+6=10'},{key:'D',text:'4+4=8'}],['B','C'],'hard','10>9',80),
    ]
  },
  141: {
    topic: 'Ôn tập hình học',
    questions: [
      // Ex1
      make(1,'single_choice','Tam giác có mấy cạnh?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','easy','Tam giác có 3 cạnh',1),
      make(1,'single_choice','Hình nào không có góc?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Tam giác'}],'B','easy','Hình tròn không có góc',2),
      make(1,'single_choice','Khối lập phương có mấy mặt?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','easy','6 mặt vuông',3),
      make(1,'single_choice','Mặt của khối lập phương là hình gì?',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông'}],'C','easy','Mặt khối LP là hình vuông',4),
      make(1,'true_false','Hình chữ nhật có 4 cạnh và 4 góc vuông. Đúng hay sai?',null,true,'easy','Đúng!',5),
      make(1,'true_false','Khối cầu có 8 đỉnh. Đúng hay sai?',null,false,'easy','Sai! Khối cầu không có đỉnh',6),
      make(1,'true_false','Tam giác và hình vuông đều có góc. Đúng hay sai?',null,true,'easy','Đúng! Cả hai đều có góc',7),
      make(1,'fill_blank','Hình vuông có [b1] cạnh bằng nhau',[{key:'b1',text:'?'}],{b1:'4'},'easy','4 cạnh bằng nhau',8),
      make(1,'fill_blank','Khối lập phương có [b1] đỉnh',[{key:'b1',text:'?'}],{b1:'8'},'easy','8 đỉnh',9),
      make(1,'fill_blank','Hình có ít cạnh nhất trong 4 hình cơ bản là hình [b1]',[{key:'b1',text:'?'}],{b1:'tam giác'},'easy','Tam giác có 3 cạnh - ít nhất',10),
      // Ex2
      make(2,'counting','Đếm tam giác: △△△△△△',[{key:'d1',text:'△'},{key:'d2',text:'△'},{key:'d3',text:'△'},{key:'d4',text:'△'},{key:'d5',text:'△'},{key:'d6',text:'△'}],'6','easy','6 tam giác',11),
      make(2,'counting','Đếm hình vuông: □□□□□',[{key:'d1',text:'□'},{key:'d2',text:'□'},{key:'d3',text:'□'},{key:'d4',text:'□'},{key:'d5',text:'□'}],'5','easy','5 hình vuông',12),
      make(2,'counting','Đếm: △△△ và □□□□. Tổng mấy hình?',[{key:'d1',text:'△'},{key:'d2',text:'△'},{key:'d3',text:'△'},{key:'d4',text:'□'},{key:'d5',text:'□'},{key:'d6',text:'□'},{key:'d7',text:'□'}],'7','easy','3+4=7',13),
      make(2,'sorting','Sắp xếp theo số cạnh tăng: hình tròn, tam giác, hình vuông',[{key:'1',text:'Hình tròn (0)'},{key:'2',text:'Tam giác (3)'},{key:'3',text:'Hình vuông (4)'}],['1','2','3'],'easy','0,3,4 tăng dần',14),
      make(2,'sorting','Sắp xếp theo số góc tăng: hình tròn, tam giác, hình chữ nhật',[{key:'1',text:'Hình tròn (0)'},{key:'2',text:'Tam giác (3)'},{key:'3',text:'Hình chữ nhật (4)'}],['1','2','3'],'easy','0,3,4 tăng dần',15),
      make(2,'sorting','Sắp xếp theo số hình vuông ghép: 1×1, 2×2, 3×3',[{key:'1',text:'1×1=1'},{key:'2',text:'2×2=4'},{key:'3',text:'3×3=9'}],['1','2','3'],'easy','1,4,9 tăng dần',16),
      make(2,'cross_out','Gạch bỏ hình không có cạnh thẳng: hình tròn, tam giác, hình vuông',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'}],['A'],'easy','Hình tròn không có cạnh thẳng',17),
      make(2,'cross_out','Gạch bỏ khối không thể lăn: LP, cầu, trụ',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],['A'],'easy','Khối LP không lăn được',18),
      make(2,'fill_blank','Hình chữ nhật có [b1] góc vuông',[{key:'b1',text:'?'}],{b1:'4'},'easy','4 góc vuông',19),
      make(2,'fill_blank','Khối trụ có [b1] mặt tròn',[{key:'b1',text:'?'}],{b1:'2'},'easy','2 mặt tròn',20),
      // Ex3
      make(3,'single_choice','Ghép 2 tam giác bằng nhau thành hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Ngũ giác'}],'B','easy','2 tam giác = hình chữ nhật',21),
      make(3,'single_choice','Cần mấy hình vuông để ghép hình 2×3?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'C','easy','2×3=6',22),
      make(3,'single_choice','Vật nào hình trụ?',[{key:'A',text:'Hộp bánh'},{key:'B',text:'Lon nước'},{key:'C',text:'Quả bóng'}],'B','easy','Lon nước hình trụ',23),
      make(3,'single_choice','Khi nhìn từ trên, khối trụ trông như?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Tam giác'}],'B','easy','Nhìn từ trên thấy hình tròn',24),
      make(3,'true_false','4 hình vuông nhỏ ghép thành 1 hình vuông lớn. Đúng hay sai?',null,true,'easy','Đúng! 2×2',25),
      make(3,'true_false','Hình vuông là loại hình chữ nhật đặc biệt. Đúng hay sai?',null,true,'easy','Đúng! Hình vuông có 4 cạnh bằng nhau',26),
      make(3,'true_false','Mặt của khối trụ chỉ là hình chữ nhật. Đúng hay sai?',null,false,'easy','Sai! Có 2 mặt tròn và 1 mặt cong',27),
      make(3,'fill_blank','Cần [b1] hình vuông để lát 3×4',[{key:'b1',text:'?'}],{b1:'12'},'easy','3×4=12',28),
      make(3,'fill_blank','Tổng cạnh của 2 tam giác là [b1]',[{key:'b1',text:'?'}],{b1:'6'},'easy','2×3=6',29),
      make(3,'counting','Đếm số mặt của 2 khối LP',[{key:'d1',text:'🎲'},{key:'d2',text:'🎲'}],'12','easy','2×6=12',30),
      // Ex4
      make(4,'single_choice','Tổng số góc của 1 tam giác + 1 hình vuông?',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'6'}],'B','medium','3+4=7',31),
      make(4,'single_choice','Ghép 3 hình vuông thành hàng = hình gì?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật 1×3'},{key:'C',text:'Tam giác'}],'B','medium','3 vuông thành hàng = chữ nhật 1×3',32),
      make(4,'single_choice','Bao nhiêu khối 1×1×1 trong hộp 2×2×2?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],'C','medium','2×2×2=8',33),
      make(4,'multiple_choice','Chọn hình có 4 góc vuông',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác'},{key:'D',text:'Hình tròn'}],['A','B'],'medium','Vuông và chữ nhật có 4 góc vuông',34),
      make(4,'multiple_choice','Chọn khối có thể lăn',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'},{key:'D',text:'Hộp CN'}],['B','C'],'medium','Cầu và trụ lăn được',35),
      make(4,'multiple_choice','Hình nào là mặt của khối LP?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['C'],'medium','Mặt LP là hình vuông',36),
      make(4,'matching','Nối hình với số cạnh',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'}],{A:'0',B:'3',C:'4'},'medium','Tròn=0, tam giác=3, vuông=4',37),
      make(4,'matching','Nối vật với hình',[{key:'A',text:'Đồng tiền'},{key:'B',text:'Cửa sổ'},{key:'C',text:'Biển cảnh báo'}],{A:'Hình tròn',B:'Hình chữ nhật',C:'Tam giác'},'medium','Đồng=tròn, cửa=CN, biển=tam giác',38),
      make(4,'drag_drop','Kéo hình vào "có góc": hình tròn, tam giác, hình vuông',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'}],['B','C'],'medium','Tam giác và vuông có góc',39),
      make(4,'drag_drop','Kéo số mặt: khối LP có _ mặt',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],['B'],'medium','6 mặt',40),
      // Ex5
      make(5,'table_fill','Điền bảng đặc điểm hình',[{key:'headers',text:'Hình|Cạnh|Góc'},{key:'r1',text:'Hình tròn|_r1c1|_r1c2'},{key:'r2',text:'Tam giác|_r2c1|_r2c2'},{key:'r3',text:'Hình vuông|_r3c1|_r3c2'}],{r1c1:'0',r1c2:'0',r2c1:'3',r2c2:'3',r3c1:'4',r3c2:'4'},'medium','Đặc điểm 3 hình cơ bản',41),
      make(5,'table_fill','Điền số mặt của khối',[{key:'headers',text:'Khối|Mặt|Đỉnh'},{key:'r1',text:'Khối LP|_r1c1|_r1c2'},{key:'r2',text:'Khối cầu|_r2c1|_r2c2'}],{r1c1:'6',r1c2:'8',r2c1:'0',r2c2:'0'},'medium','LP: 6 mặt 8 đỉnh; Cầu: 0 mặt phẳng 0 đỉnh',42),
      make(5,'number_line','Số cạnh của hình: hình tròn=0, tam giác=3, vuông=?',[{key:'min',text:'0'},{key:'max',text:'5'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5'},{key:'hidden',text:'4'}],['4'],'medium','Hình vuông có 4 cạnh',43),
      make(5,'number_line','Số khối vuông nhỏ cần cho 3×3',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'9'}],['9'],'medium','3×3=9',44),
      make(5,'puzzle','Hình nào có số cạnh = số góc = 3?',[{key:'slot_1',text:'Hình [?]'},{key:'token_1',text:'tròn'},{key:'token_2',text:'tam giác'},{key:'token_3',text:'vuông'}],{slot_1:'token_2'},'medium','Tam giác: 3 cạnh = 3 góc',45),
      make(5,'puzzle','Cần mấy hình vuông để lát 4×5?',[{key:'slot_1',text:'Cần [?]'},{key:'token_1',text:'16'},{key:'token_2',text:'20'},{key:'token_3',text:'25'}],{slot_1:'token_2'},'medium','4×5=20',46),
      make(5,'puzzle','Tổng góc của 3 tam giác + 1 hình vuông?',[{key:'slot_1',text:'Tổng = [?]'},{key:'token_1',text:'10'},{key:'token_2',text:'13'},{key:'token_3',text:'15'}],{slot_1:'token_2'},'medium','3×3+4=13',47),
      make(5,'matching','Nối khối với đặc điểm lăn',[{key:'A',text:'Lăn mọi chiều'},{key:'B',text:'Không lăn'},{key:'C',text:'Lăn 1 chiều'}],{A:'Khối cầu',B:'Khối LP',C:'Khối trụ'},'medium','Cầu mọi chiều, LP không, trụ 1 chiều',48),
      make(5,'matching','Nối hình ghép với kết quả',[{key:'A',text:'2 tam giác vuông'},{key:'B',text:'4 hình vuông nhỏ'},{key:'C',text:'2 hình chữ nhật 1×2'}],{A:'1 hình vuông',B:'1 hình vuông 2×2',C:'1 hình chữ nhật 2×2'},'medium','Ghép hình',49),
      make(5,'drag_drop','Kéo: số hình vuông nhỏ trong 3×3',[{key:'A',text:'6'},{key:'B',text:'9'},{key:'C',text:'12'}],['B'],'medium','3×3=9',50),
      // Ex6-8 (hard)
      make(6,'fill_blank','Tổng cạnh của 2 tam giác + 1 hình vuông = [b1]',[{key:'b1',text:'?'}],{b1:'10'},'hard','2×3+4=10',51),
      make(6,'fill_blank','Số khối 1×1×1 trong 2×3×4 là [b1]',[{key:'b1',text:'?'}],{b1:'24'},'hard','2×3×4=24',52),
      make(6,'fill_blank','Tổng đỉnh của 3 khối LP là [b1]',[{key:'b1',text:'?'}],{b1:'24'},'hard','3×8=24',53),
      make(6,'puzzle','Ghép 8 tam giác bằng nhau thành mấy hình vuông?',[{key:'slot_1',text:'Ghép được [?] hình'},{key:'token_1',text:'2'},{key:'token_2',text:'4'},{key:'token_3',text:'8'}],{slot_1:'token_2'},'hard','8÷2=4',54),
      make(6,'puzzle','Cần thêm mấy hình vuông từ 2×3 thành 3×4?',[{key:'slot_1',text:'Cần thêm [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'6'},{key:'token_3',text:'8'}],{slot_1:'token_2'},'hard','3×4=12, 2×3=6, cần thêm 6',55),
      make(6,'puzzle','Trong bảng 4×4, có bao nhiêu hình vuông 2×2?',[{key:'slot_1',text:'Có [?] hình'},{key:'token_1',text:'4'},{key:'token_2',text:'9'},{key:'token_3',text:'16'}],{slot_1:'token_2'},'hard','(4-2+1)²=9',56),
      make(6,'multiple_choice','Chọn mệnh đề đúng',[{key:'A',text:'Hình tròn không có góc'},{key:'B',text:'LP có 8 đỉnh'},{key:'C',text:'Tam giác có 4 cạnh'},{key:'D',text:'Hình chữ nhật có 4 góc vuông'}],['A','B','D'],'hard','A,B,D đúng; C sai (tam giác có 3 cạnh)',57),
      make(6,'multiple_choice','Hình nào có trục đối xứng?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác đều'},{key:'C',text:'Hình vuông'},{key:'D',text:'Tam giác lệch'}],['A','B','C'],'hard','Tròn, tam giác đều, vuông có đối xứng',58),
      make(6,'sorting','Sắp xếp theo số cạnh tăng: hình tròn, tam giác, tứ giác, ngũ giác',[{key:'1',text:'Hình tròn (0)'},{key:'2',text:'Tam giác (3)'},{key:'3',text:'Tứ giác (4)'},{key:'4',text:'Ngũ giác (5)'}],['1','2','3','4'],'hard','0,3,4,5',59),
      make(6,'sorting','Sắp xếp số hình vuông cần tăng dần: 2×2, 2×3, 3×3, 4×4',[{key:'1',text:'2×2=4'},{key:'2',text:'2×3=6'},{key:'3',text:'3×3=9'},{key:'4',text:'4×4=16'}],['1','2','3','4'],'hard','4,6,9,16',60),
      make(7,'game','Nhóm theo số cạnh: 3 cạnh và 4 cạnh',[{key:'c1',text:'Tam giác',pair:'3 cạnh'},{key:'c2',text:'Hình vuông',pair:'4 cạnh'},{key:'c3',text:'Hình chữ nhật',pair:'4 cạnh'},{key:'c4',text:'Tam giác đều',pair:'3 cạnh'}],{},'hard','3: tam giác; 4: vuông, chữ nhật',61),
      make(7,'game','Nhóm khối theo lăn được và không lăn',[{key:'c1',text:'Khối cầu',pair:'lăn'},{key:'c2',text:'Khối trụ',pair:'lăn'},{key:'c3',text:'Khối LP',pair:'không lăn'},{key:'c4',text:'Hộp CN',pair:'không lăn'}],{},'hard','Lăn: cầu, trụ; Không: LP, hộp CN',62),
      make(7,'matching','Nối mô tả với hình',[{key:'A',text:'0 góc, đường cong'},{key:'B',text:'3 góc, 3 cạnh'},{key:'C',text:'4 góc vuông, 4 cạnh bằng'}],{A:'Hình tròn',B:'Tam giác',C:'Hình vuông'},'hard','Mô tả 3 hình cơ bản',63),
      make(7,'matching','Nối khối với số mặt',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],{A:'6 mặt',B:'0 mặt phẳng',C:'3 mặt'},'hard','LP=6, cầu=0, trụ=3',64),
      make(7,'matching','Nối số hình vuông với kích thước',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'9'}],{A:'2×2',B:'2×3',C:'3×3'},'hard','4=2×2, 6=2×3, 9=3×3',65),
      make(7,'fill_blank','Tổng góc của 4 tam giác + 2 hình vuông = [b1]',[{key:'b1',text:'?'}],{b1:'20'},'hard','4×3+2×4=12+8=20',66),
      make(7,'fill_blank','Hình có số cạnh = số đỉnh = 4 là hình [b1]',[{key:'b1',text:'?'}],{b1:'vuông'},'hard','Hình vuông: 4 cạnh = 4 đỉnh',67),
      make(7,'fill_blank','Từ 2×4=8 tam giác tạo được [b1] hình vuông',[{key:'b1',text:'?'}],{b1:'4'},'hard','8÷2=4',68),
      make(7,'drag_drop','Kéo: tổng số mặt của 2 khối LP + 1 khối cầu',[{key:'A',text:'12'},{key:'B',text:'6'},{key:'C',text:'18'}],['A'],'hard','2×6+0=12',69),
      make(7,'drag_drop','Kéo: hình nào lăn mọi chiều',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],['B'],'hard','Khối cầu lăn mọi chiều',70),
      make(8,'multiple_choice','Chọn tất cả mệnh đề đúng',[{key:'A',text:'Hình tròn không có góc'},{key:'B',text:'LP có 12 cạnh'},{key:'C',text:'Tam giác có 4 cạnh'},{key:'D',text:'Hình chữ nhật có 4 góc vuông'}],['A','B','D'],'hard','A,B,D đúng; C sai',71),
      make(8,'multiple_choice','Hình nào ghép được thành hình chữ nhật?',[{key:'A',text:'2 hình vuông'},{key:'B',text:'2 tam giác vuông'},{key:'C',text:'3 tròn'},{key:'D',text:'4 hình vuông'}],['A','B','D'],'hard','2 vuông, 2 tam giác, 4 vuông đều tạo CN',72),
      make(8,'multiple_choice','Khối nào có mặt phẳng?',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp CN'},{key:'D',text:'Khối trụ'}],['A','C','D'],'hard','LP, hộp CN, trụ có mặt phẳng; cầu không',73),
      make(8,'puzzle','Tổng góc 5 tam giác đều là?',[{key:'slot_1',text:'Tổng=[?]'},{key:'token_1',text:'10'},{key:'token_2',text:'15'},{key:'token_3',text:'20'}],{slot_1:'token_2'},'hard','5×3=15',74),
      make(8,'puzzle','Bao nhiêu khối 2×2×2 trong hộp 4×4×4?',[{key:'slot_1',text:'Cần [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'8'},{key:'token_3',text:'16'}],{slot_1:'token_2'},'hard','(4÷2)³=2³=8',75),
      make(8,'puzzle','Nhìn hình 2D tạo thành từ 3 khối LP ghép hàng ngang từ trên. Thấy hình gì?',[{key:'slot_1',text:'Hình [?]'},{key:'token_1',text:'Hình chữ nhật 3×1'},{key:'token_2',text:'Tam giác'},{key:'token_3',text:'Hình tròn'}],{slot_1:'token_1'},'hard','3 LP ghép ngang nhìn từ trên thấy chữ nhật 3×1',76),
      make(8,'sorting','Sắp xếp số cạnh tăng: hình tròn(0), tam giác(3), chữ nhật(4), ngũ giác(5)',[{key:'1',text:'Hình tròn'},{key:'2',text:'Tam giác'},{key:'3',text:'Chữ nhật'},{key:'4',text:'Ngũ giác'}],['1','2','3','4'],'hard','0,3,4,5',77),
      make(8,'sorting','Sắp xếp theo số mặt khối giảm dần: LP(6), trụ(3), cầu(0)',[{key:'1',text:'Khối LP (6)'},{key:'2',text:'Khối trụ (3)'},{key:'3',text:'Khối cầu (0)'}],['1','2','3'],'hard','6,3,0 giảm dần',78),
      make(8,'cross_out','Gạch bỏ SAI: "Hình tròn có 0 góc", "Tam giác có 4 cạnh", "Hình vuông có 4 góc vuông"',[{key:'A',text:'Hình tròn có 0 góc'},{key:'B',text:'Tam giác có 4 cạnh'},{key:'C',text:'Hình vuông có 4 góc vuông'}],['B'],'hard','Tam giác có 3 cạnh',79),
      make(8,'cross_out','Gạch bỏ khối không có cạnh thẳng: LP, cầu, trụ, hộp CN',[{key:'A',text:'Khối LP'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'},{key:'D',text:'Hộp CN'}],['B'],'hard','Khối cầu không có cạnh thẳng',80),
    ]
  }
};

// Fix sort order
Object.values(lessons).forEach(lesson => {
  lesson.questions.forEach((q, i) => {
    if (!q.sort) q.sort = i + 1;
  });
});

async function seed() {
  const conn = await mysql.createConnection(dbConfig);
  try {
    for (const lessonId of lessonIds) {
      const { topic, questions } = lessons[lessonId];
      console.log(`Processing lesson ${lessonId}: ${topic}`);
      await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lessonId]);
      for (const q of questions) {
        const optionsJson = q.opts ? JSON.stringify(q.opts) : null;
        const correctAnswerJson = JSON.stringify(q.ans);
        await conn.execute(
          'INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())',
          [lessonId, q.ex, q.type, q.text, optionsJson, correctAnswerJson, q.diff, q.exp || null, q.pts, q.sort]
        );
      }
      console.log(`  ✓ Inserted ${questions.length} questions`);
    }
    console.log('Done!');
  } finally {
    await conn.end();
  }
}

seed().catch(console.error);
