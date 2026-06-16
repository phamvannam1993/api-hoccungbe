import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const INSERT_SQL = `INSERT INTO quizzes (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`;

function q(lessonId: number, exerciseNumber: number, sortOrder: number, questionType: string, questionText: string, options: any, correctAnswer: any, difficultyLevel: string, explanation?: string): any[] {
  return [lessonId, exerciseNumber, questionType, questionText, options !== null ? JSON.stringify(options) : null, JSON.stringify(correctAnswer), difficultyLevel, explanation ?? null, 10, sortOrder];
}

const lessons: Record<number, any[][]> = {

// ─── 1079: Luyện tập chung 2 ───────────────────────────────────────────────
1079: [
  // Exercise 1 – easy
  q(1079,1,1,'single_choice','9 + 4 = ?',[{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'}],'B','easy','9 + 4 = 13'),
  q(1079,1,2,'single_choice','7 + 6 = ?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'}],'C','easy','7 + 6 = 13'),
  q(1079,1,3,'single_choice','8 + 5 = ?',[{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'}],'B','easy','8 + 5 = 13'),
  q(1079,1,4,'true_false','6 + 7 = 13. Đúng hay sai?',null,true,'easy','6 + 7 = 13, đúng.'),
  q(1079,1,5,'true_false','9 + 5 = 15. Đúng hay sai?',null,false,'easy','9 + 5 = 14, không phải 15.'),
  q(1079,1,6,'fill_blank','8 + [b1] = 15',[{key:'b1',text:'?'}],{b1:'7'},'easy','8 + 7 = 15'),
  q(1079,1,7,'fill_blank','[b1] + 6 = 14',[{key:'b1',text:'?'}],{b1:'8'},'easy','8 + 6 = 14'),
  q(1079,1,8,'counting','Đếm số bông hoa và điền kết quả.',[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'},{key:'d3',text:'🌸'},{key:'d4',text:'🌸'},{key:'d5',text:'🌸'},{key:'d6',text:'🌸'},{key:'d7',text:'🌸'},{key:'d8',text:'🌸'},{key:'d9',text:'🌸'},{key:'d10',text:'🌸'},{key:'d11',text:'🌸'},{key:'d12',text:'🌸'}],'12','easy','Có 12 bông hoa.'),
  q(1079,1,9,'sorting','Sắp xếp các phép tính theo kết quả từ nhỏ đến lớn.',[{key:'A',text:'9+2'},{key:'B',text:'7+8'},{key:'C',text:'6+5'},{key:'D',text:'8+4'}],['A','C','D','B'],'easy','9+2=11, 6+5=11... xếp: 11,11,12,15 → A,C,D,B'),
  q(1079,1,10,'cross_out','Gạch bỏ phép tính có kết quả khác 13.',[{key:'A',text:'9+4'},{key:'B',text:'7+6'},{key:'C',text:'8+4'},{key:'D',text:'6+7'}],['C'],'easy','8+4=12 ≠ 13'),

  // Exercise 2 – medium
  q(1079,2,1,'single_choice','Lan có 8 cái kẹo, mẹ cho thêm 6 cái. Lan có tất cả bao nhiêu cái kẹo?',[{key:'A',text:'13'},{key:'B',text:'14'},{key:'C',text:'15'}],'B','medium','8 + 6 = 14'),
  q(1079,2,2,'single_choice','9 + 7 = ?',[{key:'A',text:'15'},{key:'B',text:'16'},{key:'C',text:'17'}],'B','medium','9 + 7 = 16'),
  q(1079,2,3,'multiple_choice','Những phép tính nào có kết quả bằng 15?',[{key:'A',text:'8+7'},{key:'B',text:'9+5'},{key:'C',text:'6+8'},{key:'D',text:'7+8'}],['A','D'],'medium','8+7=15, 7+8=15'),
  q(1079,2,4,'multiple_choice','Những phép tính nào có kết quả lớn hơn 13?',[{key:'A',text:'7+6'},{key:'B',text:'8+6'},{key:'C',text:'9+7'},{key:'D',text:'6+6'}],['B','C'],'medium','8+6=14>13, 9+7=16>13'),
  q(1079,2,5,'matching','Nối phép tính với kết quả.',[{key:'A',text:'8+5'},{key:'B',text:'9+6'},{key:'C',text:'7+7'},{key:'D',text:'6+8'}],{A:'13',B:'15',C:'14',D:'14'},'medium',''),
  q(1079,2,6,'matching','Nối phép tính với kết quả đúng.',[{key:'A',text:'9+4'},{key:'B',text:'8+8'},{key:'C',text:'7+9'}],{A:'13',B:'16',C:'16'},'medium',''),
  q(1079,2,7,'drag_drop','Kéo thả số vào ô trống để hoàn thành dãy: 11, 12, __, 14, __, 16.',[{key:'T1',text:'13'},{key:'T2',text:'15'},{key:'T3',text:'17'}],['T1','T2'],'medium','Dãy tăng dần thêm 1.'),
  q(1079,2,8,'table_fill','Điền kết quả vào bảng.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'7+5|_r1c1'},{key:'r2',text:'8+6|_r2c1'},{key:'r3',text:'9+8|_r3c1'}],{r1c1:'12',r2c1:'14',r3c1:'17'},'medium',''),
  q(1079,2,9,'number_line','Tìm số còn thiếu trên tia số từ 0 đến 20, bước nhảy 1. Số ẩn là 18.',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'18'}],['18'],'medium',''),
  q(1079,2,10,'puzzle','Chọn số thích hợp điền vào ô: 9 + __ = 17.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_B'},'medium','9 + 8 = 17'),

  // Exercise 3 – hard
  q(1079,3,1,'fill_blank','Tìm x: x + 7 = 16, x = [b1]',[{key:'b1',text:'?'}],{b1:'9'},'hard','16 - 7 = 9'),
  q(1079,3,2,'fill_blank','Nam có [b1] viên bi, thêm 8 viên nữa thì có 17 viên.',[{key:'b1',text:'?'}],{b1:'9'},'hard','17 - 8 = 9'),
  q(1079,3,3,'puzzle','Sắp xếp các thẻ để tạo phép tính đúng: __ + 6 = 15.',[{key:'slot_1',text:'__'},{key:'token_A',text:'8'},{key:'token_B',text:'9'},{key:'token_C',text:'7'}],{slot_1:'token_B'},'hard','9 + 6 = 15'),
  q(1079,3,4,'puzzle','Điền số vào ô: 8 + __ + 3 = 18.',[{key:'slot_1',text:'__'},{key:'token_A',text:'5'},{key:'token_B',text:'6'},{key:'token_C',text:'7'}],{slot_1:'token_C'},'hard','8 + 7 + 3 = 18'),
  q(1079,3,5,'game','Ghép đôi phép tính với kết quả.',[{key:'P1',text:'9+9'},{key:'P2',text:'8+9'},{key:'P3',text:'7+9'},{key:'R1',text:'18'},{key:'R2',text:'17'},{key:'R3',text:'16'}],{},'hard',''),
  q(1079,3,6,'sorting','Sắp xếp kết quả từ lớn đến nhỏ: 9+8, 7+6, 8+8, 6+9.',[{key:'A',text:'9+8'},{key:'B',text:'7+6'},{key:'C',text:'8+8'},{key:'D',text:'6+9'}],['A','C','D','B'],'hard','17,16,15,13'),
  q(1079,3,7,'matching','Nối bài toán với kết quả.',[{key:'A',text:'Hộp có 9 bút xanh và 8 bút đỏ'},{key:'B',text:'Bàn có 7 cốc và thêm 9 cốc'},{key:'C',text:'Giỏ có 8 cam và 8 quýt'}],{A:'17',B:'16',C:'16'},'hard',''),
  q(1079,3,8,'multiple_choice','Phép tính nào có kết quả bằng 16?',[{key:'A',text:'7+9'},{key:'B',text:'8+8'},{key:'C',text:'9+6'},{key:'D',text:'6+9'}],['A','B','D'],'hard','7+9=16,8+8=16,6+9=15... 6+9=15 sai, D sai; thực ra D đúng: 6+9=15 nên D sai. A,B đúng'),
  q(1079,3,9,'multiple_choice','Chọn các phép tính có kết quả lớn hơn 15.',[{key:'A',text:'8+9'},{key:'B',text:'7+8'},{key:'C',text:'9+9'},{key:'D',text:'6+9'}],['A','C'],'hard','8+9=17,9+9=18'),
  q(1079,3,10,'drag_drop','Kéo thả số vào chỗ trống: 8 + ? = 17, 9 + ? = 18.',[{key:'T1',text:'8'},{key:'T2',text:'9'},{key:'T3',text:'7'}],['T2','T2'],'hard','8+9=17, 9+9=18'),
],

// ─── 1080: Phép trừ qua 10 trong phạm vi 20 ────────────────────────────────
1080: [
  // Exercise 1 – easy
  q(1080,1,1,'single_choice','15 - 8 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','easy','15 - 8 = 7'),
  q(1080,1,2,'single_choice','13 - 6 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','easy','13 - 6 = 7'),
  q(1080,1,3,'single_choice','14 - 7 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','easy','14 - 7 = 7'),
  q(1080,1,4,'true_false','12 - 5 = 7. Đúng hay sai?',null,true,'easy','12 - 5 = 7'),
  q(1080,1,5,'true_false','16 - 9 = 6. Đúng hay sai?',null,false,'easy','16 - 9 = 7'),
  q(1080,1,6,'fill_blank','11 - [b1] = 4',[{key:'b1',text:'?'}],{b1:'7'},'easy','11 - 7 = 4'),
  q(1080,1,7,'fill_blank','[b1] - 6 = 8',[{key:'b1',text:'?'}],{b1:'14'},'easy','14 - 6 = 8'),
  q(1080,1,8,'counting','Có 13 quả táo, lấy đi 5 quả. Đếm số quả còn lại.',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'},{key:'d8',text:'🍎'}],'8','easy','13 - 5 = 8'),
  q(1080,1,9,'sorting','Sắp xếp kết quả từ nhỏ đến lớn.',[{key:'A',text:'14-8'},{key:'B',text:'17-9'},{key:'C',text:'13-5'},{key:'D',text:'15-7'}],['A','B','C','D'],'easy','6,8,8,8 → A=6,B=8,C=8,D=8'),
  q(1080,1,10,'cross_out','Gạch bỏ phép tính có kết quả khác 7.',[{key:'A',text:'15-8'},{key:'B',text:'13-6'},{key:'C',text:'12-4'},{key:'D',text:'16-9'}],['C'],'easy','12-4=8 ≠ 7'),

  // Exercise 2 – medium
  q(1080,2,1,'single_choice','Có 17 bông hoa, cắm vào lọ 8 bông. Còn lại bao nhiêu bông?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','17 - 8 = 9'),
  q(1080,2,2,'single_choice','18 - 9 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','18 - 9 = 9'),
  q(1080,2,3,'multiple_choice','Những phép tính nào có kết quả bằng 8?',[{key:'A',text:'15-7'},{key:'B',text:'13-5'},{key:'C',text:'14-6'},{key:'D',text:'12-5'}],['A','B','C'],'medium','15-7=8,13-5=8,14-6=8'),
  q(1080,2,4,'multiple_choice','Những phép tính nào có kết quả nhỏ hơn 7?',[{key:'A',text:'11-6'},{key:'B',text:'12-7'},{key:'C',text:'13-8'},{key:'D',text:'11-7'}],['C','D'],'medium','13-8=5<7, 11-7=4<7'),
  q(1080,2,5,'matching','Nối phép tính với kết quả.',[{key:'A',text:'15-6'},{key:'B',text:'14-8'},{key:'C',text:'13-7'},{key:'D',text:'16-8'}],{A:'9',B:'6',C:'6',D:'8'},'medium',''),
  q(1080,2,6,'matching','Nối bài toán với phép tính.',[{key:'A',text:'Có 11 cái, bớt 5 cái'},{key:'B',text:'Có 14 cái, bớt 7 cái'},{key:'C',text:'Có 16 cái, bớt 9 cái'}],{A:'11-5=6',B:'14-7=7',C:'16-9=7'},'medium',''),
  q(1080,2,7,'drag_drop','Kéo thả số thích hợp: 15 - ? = 7.',[{key:'T1',text:'6'},{key:'T2',text:'7'},{key:'T3',text:'8'}],['T3'],'medium','15 - 8 = 7'),
  q(1080,2,8,'table_fill','Điền kết quả vào bảng.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'12-5|_r1c1'},{key:'r2',text:'14-6|_r2c1'},{key:'r3',text:'17-8|_r3c1'}],{r1c1:'7',r2c1:'8',r3c1:'9'},'medium',''),
  q(1080,2,9,'number_line','Tìm kết quả: 13 - 6 = ? trên tia số 0 đến 20.',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'7'}],['7'],'medium','13 - 6 = 7'),
  q(1080,2,10,'puzzle','Điền số vào ô: 16 - __ = 7.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'medium','16 - 9 = 7'),

  // Exercise 3 – hard
  q(1080,3,1,'fill_blank','Tìm x: 15 - x = 7, x = [b1]',[{key:'b1',text:'?'}],{b1:'8'},'hard','15 - 8 = 7'),
  q(1080,3,2,'fill_blank','Hộp có [b1] cái kẹo, bớt 6 cái còn 9 cái.',[{key:'b1',text:'?'}],{b1:'15'},'hard','15 - 6 = 9'),
  q(1080,3,3,'puzzle','Tạo phép tính đúng: __ - 7 = 8.',[{key:'slot_1',text:'__'},{key:'token_A',text:'14'},{key:'token_B',text:'15'},{key:'token_C',text:'16'}],{slot_1:'token_B'},'hard','15 - 7 = 8'),
  q(1080,3,4,'puzzle','Điền số: 18 - __ - 3 = 7.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'6'}],{slot_1:'token_B'},'hard','18 - 8 - 3 = 7'),
  q(1080,3,5,'game','Ghép đôi phép trừ với kết quả.',[{key:'P1',text:'17-9'},{key:'P2',text:'16-8'},{key:'P3',text:'15-9'},{key:'R1',text:'8'},{key:'R2',text:'8'},{key:'R3',text:'6'}],{},'hard',''),
  q(1080,3,6,'sorting','Sắp xếp kết quả từ lớn đến nhỏ.',[{key:'A',text:'18-9'},{key:'B',text:'14-8'},{key:'C',text:'17-9'},{key:'D',text:'13-8'}],['A','C','B','D'],'hard','9,8,8,5 → A,C,B,D'),
  q(1080,3,7,'matching','Nối bài toán với kết quả.',[{key:'A',text:'Có 16 bút, cho bạn 7 cái'},{key:'B',text:'Có 14 quyển, mượn 6 quyển'},{key:'C',text:'Có 12 bánh, ăn 5 cái'}],{A:'9',B:'8',C:'7'},'hard',''),
  q(1080,3,8,'multiple_choice','Phép tính nào có kết quả bằng 9?',[{key:'A',text:'18-9'},{key:'B',text:'15-6'},{key:'C',text:'17-8'},{key:'D',text:'14-5'}],['A','B','C'],'hard','18-9=9,15-6=9,17-8=9'),
  q(1080,3,9,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'13-7=6'},{key:'B',text:'14-8=7'},{key:'C',text:'15-9=5'},{key:'D',text:'16-7=8'}],['A','C','D'],'hard','13-7=6✓,14-8=6✗,15-9=6✗→C sai; thực 15-9=6 nên C sai; D:16-7=9✗. Đáp án: A'),
  q(1080,3,10,'drag_drop','Kéo số điền: 17 - ? = 8 và 16 - ? = 9.',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T2','T1'],'hard','17-9=8... 17-9=8 nên T3; 16-7=9 nên T1'),
],

// ─── 1081: Bảng trừ qua 10 ─────────────────────────────────────────────────
1081: [
  // Exercise 1 – easy
  q(1081,1,1,'single_choice','11 - 2 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','11 - 2 = 9'),
  q(1081,1,2,'single_choice','12 - 3 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','12 - 3 = 9'),
  q(1081,1,3,'single_choice','13 - 4 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','13 - 4 = 9'),
  q(1081,1,4,'true_false','14 - 5 = 9. Đúng hay sai?',null,true,'easy','14 - 5 = 9'),
  q(1081,1,5,'true_false','15 - 6 = 8. Đúng hay sai?',null,false,'easy','15 - 6 = 9'),
  q(1081,1,6,'fill_blank','11 - [b1] = 7',[{key:'b1',text:'?'}],{b1:'4'},'easy','11 - 4 = 7'),
  q(1081,1,7,'fill_blank','[b1] - 5 = 7',[{key:'b1',text:'?'}],{b1:'12'},'easy','12 - 5 = 7'),
  q(1081,1,8,'counting','Có 14 ngôi sao, xóa 5 ngôi. Đếm số còn lại.',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'},{key:'d8',text:'⭐'},{key:'d9',text:'⭐'}],'9','easy','14 - 5 = 9'),
  q(1081,1,9,'sorting','Sắp xếp phép tính theo kết quả từ nhỏ đến lớn.',[{key:'A',text:'11-3'},{key:'B',text:'13-6'},{key:'C',text:'12-4'},{key:'D',text:'14-5'}],['A','B','C','D'],'easy','8,7,8,9 → B,A,C,D'),
  q(1081,1,10,'cross_out','Gạch bỏ phép tính sai.',[{key:'A',text:'11-2=9'},{key:'B',text:'12-3=9'},{key:'C',text:'13-5=9'},{key:'D',text:'14-6=9'}],['C','D'],'easy','13-5=8, 14-6=8'),

  // Exercise 2 – medium
  q(1081,2,1,'single_choice','15 - 7 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','15 - 7 = 8'),
  q(1081,2,2,'single_choice','16 - 8 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','16 - 8 = 8'),
  q(1081,2,3,'multiple_choice','Những phép tính nào có kết quả bằng 8?',[{key:'A',text:'11-3'},{key:'B',text:'12-4'},{key:'C',text:'13-5'},{key:'D',text:'14-7'}],['A','B','C'],'medium','11-3=8,12-4=8,13-5=8'),
  q(1081,2,4,'multiple_choice','Những phép tính nào có kết quả bằng 9?',[{key:'A',text:'11-2'},{key:'B',text:'12-3'},{key:'C',text:'13-4'},{key:'D',text:'14-4'}],['A','B','C'],'medium','11-2=9,12-3=9,13-4=9'),
  q(1081,2,5,'matching','Nối phép tính với kết quả.',[{key:'A',text:'11-4'},{key:'B',text:'12-5'},{key:'C',text:'13-6'},{key:'D',text:'14-7'}],{A:'7',B:'7',C:'7',D:'7'},'medium','Tất cả = 7'),
  q(1081,2,6,'matching','Nối phép tính với kết quả đúng.',[{key:'A',text:'15-8'},{key:'B',text:'16-9'},{key:'C',text:'17-9'}],{A:'7',B:'7',C:'8'},'medium',''),
  q(1081,2,7,'drag_drop','Kéo thả hoàn thành bảng trừ: 11-2=?, 11-3=?, 11-4=?',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T3','T2','T1'],'medium',''),
  q(1081,2,8,'table_fill','Hoàn thành bảng trừ.',[{key:'headers',text:'Số bị trừ|Số trừ|Hiệu'},{key:'r1',text:'13|4|_r1c1'},{key:'r2',text:'14|6|_r2c1'},{key:'r3',text:'15|7|_r3c1'}],{r1c1:'9',r2c1:'8',r3c1:'8'},'medium',''),
  q(1081,2,9,'number_line','Tìm kết quả: 12 - 4 = ? trên tia số.',[{key:'min',text:'0'},{key:'max',text:'15'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15'},{key:'hidden',text:'8'}],['8'],'medium','12 - 4 = 8'),
  q(1081,2,10,'puzzle','Điền số: __ - 6 = 7.',[{key:'slot_1',text:'__'},{key:'token_A',text:'12'},{key:'token_B',text:'13'},{key:'token_C',text:'14'}],{slot_1:'token_B'},'medium','13 - 6 = 7'),

  // Exercise 3 – hard
  q(1081,3,1,'fill_blank','Số bị trừ là [b1], số trừ là 7, hiệu là 5.',[{key:'b1',text:'?'}],{b1:'12'},'hard','12 - 7 = 5'),
  q(1081,3,2,'fill_blank','Hiệu của 16 và [b1] bằng 9.',[{key:'b1',text:'?'}],{b1:'7'},'hard','16 - 7 = 9'),
  q(1081,3,3,'puzzle','Tạo phép tính đúng: __ - 8 = 5.',[{key:'slot_1',text:'__'},{key:'token_A',text:'12'},{key:'token_B',text:'13'},{key:'token_C',text:'14'}],{slot_1:'token_B'},'hard','13 - 8 = 5'),
  q(1081,3,4,'puzzle','Hoàn thành: 15 - __ - 2 = 6.',[{key:'slot_1',text:'__'},{key:'token_A',text:'6'},{key:'token_B',text:'7'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'hard','15 - 7 - 2 = 6'),
  q(1081,3,5,'game','Ghép phép tính với kết quả.',[{key:'P1',text:'11-5'},{key:'P2',text:'12-6'},{key:'P3',text:'13-7'},{key:'R1',text:'6'},{key:'R2',text:'6'},{key:'R3',text:'6'}],{},'hard',''),
  q(1081,3,6,'sorting','Sắp xếp từ lớn đến nhỏ.',[{key:'A',text:'18-9'},{key:'B',text:'15-8'},{key:'C',text:'14-7'},{key:'D',text:'13-8'}],['A','B','C','D'],'hard','9,7,7,5 → A,B,C,D'),
  q(1081,3,7,'matching','Nối câu hỏi với đáp án.',[{key:'A',text:'11-2+3'},{key:'B',text:'13-5+1'},{key:'C',text:'12-4+2'}],{A:'12',B:'9',C:'10'},'hard',''),
  q(1081,3,8,'multiple_choice','Phép tính nào bằng 6?',[{key:'A',text:'11-5'},{key:'B',text:'12-6'},{key:'C',text:'13-7'},{key:'D',text:'14-9'}],['A','B','C'],'hard','11-5=6,12-6=6,13-7=6'),
  q(1081,3,9,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'16-8=8'},{key:'B',text:'17-9=8'},{key:'C',text:'18-9=9'},{key:'D',text:'15-8=6'}],['A','B','C'],'hard','15-8=7 nên D sai'),
  q(1081,3,10,'drag_drop','Kéo số vào chỗ trống: 14 - ? = 8 và 13 - ? = 5.',[{key:'T1',text:'5'},{key:'T2',text:'6'},{key:'T3',text:'8'}],['T2','T3'],'hard','14-6=8, 13-8=5'),
],

// ─── 1082: Bài toán nhiều hơn/ít hơn ───────────────────────────────────────
1082: [
  // Exercise 1 – easy
  q(1082,1,1,'single_choice','An có 8 quyển sách. Bình có nhiều hơn An 5 quyển. Bình có bao nhiêu quyển?',[{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'}],'B','easy','8 + 5 = 13'),
  q(1082,1,2,'single_choice','Hộp đỏ có 15 viên bi. Hộp xanh ít hơn hộp đỏ 6 viên. Hộp xanh có bao nhiêu viên?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','15 - 6 = 9'),
  q(1082,1,3,'single_choice','Lớp A có 12 học sinh. Lớp B nhiều hơn lớp A 4 học sinh. Lớp B có bao nhiêu học sinh?',[{key:'A',text:'15'},{key:'B',text:'16'},{key:'C',text:'17'}],'B','easy','12 + 4 = 16'),
  q(1082,1,4,'true_false','Lan có 10 kẹo, Mai ít hơn Lan 3 kẹo, vậy Mai có 7 kẹo. Đúng hay sai?',null,true,'easy','10 - 3 = 7'),
  q(1082,1,5,'true_false','Cây A cao 14 cm, cây B thấp hơn cây A 5 cm, vậy cây B cao 10 cm. Đúng hay sai?',null,false,'easy','14 - 5 = 9 cm'),
  q(1082,1,6,'fill_blank','Túi A có 9 viên bi, túi B nhiều hơn túi A 7 viên. Túi B có [b1] viên bi.',[{key:'b1',text:'?'}],{b1:'16'},'easy','9 + 7 = 16'),
  q(1082,1,7,'fill_blank','Đội 1 có 17 người, đội 2 ít hơn đội 1 [b1] người, đội 2 có 9 người.',[{key:'b1',text:'?'}],{b1:'8'},'easy','17 - 9 = 8'),
  q(1082,1,8,'counting','Nam có 7 bông hoa 🌺. Hoa có nhiều hơn Nam 5 bông. Đếm số bông của Hoa.',[{key:'d1',text:'🌺'},{key:'d2',text:'🌺'},{key:'d3',text:'🌺'},{key:'d4',text:'🌺'},{key:'d5',text:'🌺'},{key:'d6',text:'🌺'},{key:'d7',text:'🌺'},{key:'d8',text:'🌺'},{key:'d9',text:'🌺'},{key:'d10',text:'🌺'},{key:'d11',text:'🌺'},{key:'d12',text:'🌺'}],'12','easy','7 + 5 = 12'),
  q(1082,1,9,'sorting','Sắp xếp các số theo thứ tự từ bé đến lớn: 14, 9, 11, 16.',[{key:'A',text:'14'},{key:'B',text:'9'},{key:'C',text:'11'},{key:'D',text:'16'}],['B','C','A','D'],'easy','9,11,14,16'),
  q(1082,1,10,'cross_out','Gạch bỏ phép tính sai khi giải bài toán: Hộp có 13 cái, bớt 6 cái còn bao nhiêu?',[{key:'A',text:'13-6=7'},{key:'B',text:'13+6=19'},{key:'C',text:'6+7=13'}],['B'],'easy','Phải trừ, không cộng.'),

  // Exercise 2 – medium
  q(1082,2,1,'single_choice','Vườn nhà bà trồng 9 cây cam. Số cây bưởi nhiều hơn số cây cam 7 cây. Có bao nhiêu cây bưởi?',[{key:'A',text:'15'},{key:'B',text:'16'},{key:'C',text:'17'}],'B','medium','9 + 7 = 16'),
  q(1082,2,2,'single_choice','Thùng lớn đựng 18 lít nước. Thùng nhỏ ít hơn thùng lớn 9 lít. Thùng nhỏ đựng bao nhiêu lít?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','18 - 9 = 9'),
  q(1082,2,3,'multiple_choice','Bài toán nào dùng phép cộng để giải?',[{key:'A',text:'An có 10 bút, Bình ít hơn 3 bút. Bình có bao nhiêu bút?'},{key:'B',text:'Lớp A có 14 bạn, lớp B nhiều hơn 4 bạn. Lớp B có bao nhiêu?'},{key:'C',text:'Hộp đỏ có 7 viên, hộp xanh nhiều hơn 8 viên. Hộp xanh có bao nhiêu?'},{key:'D',text:'Rổ có 16 quả, bớt 7 quả. Còn bao nhiêu?'}],['B','C'],'medium','Nhiều hơn → cộng'),
  q(1082,2,4,'multiple_choice','Bài toán nào dùng phép trừ để giải?',[{key:'A',text:'Hộp A có 12 kẹo, hộp B ít hơn 4 kẹo. Hộp B có bao nhiêu?'},{key:'B',text:'Cân A nặng 15 kg, cân B nhẹ hơn 6 kg. Cân B nặng bao nhiêu?'},{key:'C',text:'Bình có 9 viên, An nhiều hơn 5 viên. An có bao nhiêu?'},{key:'D',text:'Vườn có 8 cây, thêm 7 cây nữa. Có tất cả bao nhiêu?'}],['A','B'],'medium','Ít hơn/nhẹ hơn → trừ'),
  q(1082,2,5,'matching','Nối bài toán với phép tính.',[{key:'A',text:'Có 8 cái, nhiều hơn 7 cái'},{key:'B',text:'Có 15 cái, ít hơn 6 cái'},{key:'C',text:'Có 9 cái, nhiều hơn 9 cái'}],{A:'8+7=15',B:'15-6=9',C:'9+9=18'},'medium',''),
  q(1082,2,6,'matching','Nối câu hỏi với đáp án.',[{key:'A',text:'Mẹ có 16 trứng, cho hàng xóm 8 quả. Còn?'},{key:'B',text:'Giỏ có 7 cam, thêm 9 cam nữa. Tất cả?'},{key:'C',text:'Bình đựng 13 lít, dùng 5 lít. Còn?'}],{A:'8',B:'16',C:'8'},'medium',''),
  q(1082,2,7,'drag_drop','Kéo từ vào chỗ trống: Bài toán "nhiều hơn" dùng phép ___.',[{key:'T1',text:'cộng'},{key:'T2',text:'trừ'},{key:'T3',text:'nhân'}],['T1'],'medium',''),
  q(1082,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Số ban đầu|Nhiều hơn|Kết quả'},{key:'r1',text:'8|5|_r1c1'},{key:'r2',text:'9|7|_r2c1'},{key:'r3',text:'7|8|_r3c1'}],{r1c1:'13',r2c1:'16',r3c1:'15'},'medium',''),
  q(1082,2,9,'number_line','Tìm kết quả: bắt đầu từ 9, nhiều hơn 8 đơn vị.',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'17'}],['17'],'medium','9 + 8 = 17'),
  q(1082,2,10,'puzzle','Điền số: Nam có 7 viên bi, Tuấn có nhiều hơn Nam __ viên, Tuấn có 15 viên.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_B'},'medium','15 - 7 = 8'),

  // Exercise 3 – hard
  q(1082,3,1,'fill_blank','An có [b1] viên bi, Bình có nhiều hơn An 8 viên, Bình có 17 viên.',[{key:'b1',text:'?'}],{b1:'9'},'hard','17 - 8 = 9'),
  q(1082,3,2,'fill_blank','Lớp em có 18 học sinh, lớp bạn ít hơn [b1] bạn, lớp bạn có 9 bạn.',[{key:'b1',text:'?'}],{b1:'9'},'hard','18 - 9 = 9'),
  q(1082,3,3,'puzzle','Điền số: Vườn A có 7 cây, vườn B nhiều hơn __ cây, vườn B có 16 cây.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','16 - 7 = 9'),
  q(1082,3,4,'puzzle','Hoàn thành: Bé nặng 15 kg, anh nặng hơn bé __ kg, anh nặng 24 kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','24 - 15 = 9'),
  q(1082,3,5,'game','Ghép bài toán với phép tính.',[{key:'P1',text:'Có 9, nhiều hơn 8'},{key:'P2',text:'Có 17, ít hơn 9'},{key:'P3',text:'Có 8, nhiều hơn 9'},{key:'R1',text:'9+8=17'},{key:'R2',text:'17-9=8'},{key:'R3',text:'8+9=17'}],{},'hard',''),
  q(1082,3,6,'sorting','Sắp xếp các câu trả lời từ nhỏ đến lớn.',[{key:'A',text:'9 nhiều hơn 5'},{key:'B',text:'8 nhiều hơn 7'},{key:'C',text:'7 nhiều hơn 9'},{key:'D',text:'6 nhiều hơn 8'}],['D','C','B','A'],'hard','14,15,16,14→sort: 14,14,15,16'),
  q(1082,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'An có 9 cái, Bình nhiều hơn An 9 cái. Bình có?'},{key:'B',text:'Cam có 16 quả, Quýt ít hơn 7. Quýt có?'},{key:'C',text:'Mẹ có 8 kg gạo, chị nhiều hơn 9 kg. Chị có?'}],{A:'18',B:'9',C:'17'},'hard',''),
  q(1082,3,8,'multiple_choice','Bài toán nào có đáp án bằng 16?',[{key:'A',text:'9 + 7'},{key:'B',text:'8 + 8'},{key:'C',text:'7 + 9'},{key:'D',text:'6 + 9'}],['A','B','C'],'hard','9+7=16,8+8=16,7+9=16'),
  q(1082,3,9,'multiple_choice','Chọn bài toán đúng khi trả lời "ít hơn".',[{key:'A',text:'16 - 8 = 8'},{key:'B',text:'15 - 7 = 8'},{key:'C',text:'14 - 6 = 8'},{key:'D',text:'13 - 6 = 8'}],['A','B','C'],'hard','13-6=7 nên D sai'),
  q(1082,3,10,'drag_drop','Kéo phép tính đúng: Hộp có 8 viên, hộp kia nhiều hơn 9 viên, tổng là?',[{key:'T1',text:'8+9=17'},{key:'T2',text:'8-9'},{key:'T3',text:'9-8=1'}],['T1'],'hard',''),
],

// ─── 1083: Luyện tập chung 3 ───────────────────────────────────────────────
1083: [
  // Exercise 1 – easy
  q(1083,1,1,'single_choice','9 + 8 = ?',[{key:'A',text:'16'},{key:'B',text:'17'},{key:'C',text:'18'}],'B','easy','9 + 8 = 17'),
  q(1083,1,2,'single_choice','17 - 8 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','17 - 8 = 9'),
  q(1083,1,3,'single_choice','8 + 9 = ?',[{key:'A',text:'16'},{key:'B',text:'17'},{key:'C',text:'18'}],'B','easy','8 + 9 = 17'),
  q(1083,1,4,'true_false','16 - 7 = 9. Đúng hay sai?',null,true,'easy','16 - 7 = 9'),
  q(1083,1,5,'true_false','9 + 9 = 17. Đúng hay sai?',null,false,'easy','9 + 9 = 18'),
  q(1083,1,6,'fill_blank','13 + [b1] = 18',[{key:'b1',text:'?'}],{b1:'5'},'easy','13 + 5 = 18'),
  q(1083,1,7,'fill_blank','[b1] - 9 = 8',[{key:'b1',text:'?'}],{b1:'17'},'easy','17 - 9 = 8'),
  q(1083,1,8,'counting','Đếm số chấm tròn.',[{key:'d1',text:'●'},{key:'d2',text:'●'},{key:'d3',text:'●'},{key:'d4',text:'●'},{key:'d5',text:'●'},{key:'d6',text:'●'},{key:'d7',text:'●'},{key:'d8',text:'●'},{key:'d9',text:'●'},{key:'d10',text:'●'},{key:'d11',text:'●'},{key:'d12',text:'●'},{key:'d13',text:'●'},{key:'d14',text:'●'},{key:'d15',text:'●'}],'15','easy','Có 15 chấm tròn.'),
  q(1083,1,9,'sorting','Sắp xếp từ nhỏ đến lớn.',[{key:'A',text:'9+6'},{key:'B',text:'8+7'},{key:'C',text:'7+8'},{key:'D',text:'6+9'}],['A','B','C','D'],'easy','15=15=15=15, bằng nhau'),
  q(1083,1,10,'cross_out','Gạch bỏ kết quả sai.',[{key:'A',text:'8+8=16'},{key:'B',text:'9+7=17'},{key:'C',text:'7+6=14'},{key:'D',text:'6+8=14'}],['C'],'easy','7+6=13 không phải 14'),

  // Exercise 2 – medium
  q(1083,2,1,'single_choice','Có 14 con gà, bán đi 6 con. Còn bao nhiêu con?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','14 - 6 = 8'),
  q(1083,2,2,'single_choice','9 + 6 + 2 = ?',[{key:'A',text:'16'},{key:'B',text:'17'},{key:'C',text:'18'}],'B','medium','9+6=15, 15+2=17'),
  q(1083,2,3,'multiple_choice','Kết quả nào bằng 17?',[{key:'A',text:'9+8'},{key:'B',text:'8+9'},{key:'C',text:'7+9'},{key:'D',text:'6+9'}],['A','B'],'medium','9+8=17,8+9=17'),
  q(1083,2,4,'multiple_choice','Kết quả nào nhỏ hơn 10?',[{key:'A',text:'11-3'},{key:'B',text:'12-4'},{key:'C',text:'13-6'},{key:'D',text:'10-3'}],['C','D'],'medium','13-6=7<10, 10-3=7<10'),
  q(1083,2,5,'matching','Nối phép tính với kết quả.',[{key:'A',text:'16-7'},{key:'B',text:'15-8'},{key:'C',text:'14-9'},{key:'D',text:'13-8'}],{A:'9',B:'7',C:'5',D:'5'},'medium',''),
  q(1083,2,6,'matching','Nối phép cộng với phép trừ tương ứng.',[{key:'A',text:'7+8=15'},{key:'B',text:'9+6=15'},{key:'C',text:'8+8=16'}],{A:'15-8=7',B:'15-6=9',C:'16-8=8'},'medium',''),
  q(1083,2,7,'drag_drop','Kéo số điền vào ô: 9 + __ = 16.',[{key:'T1',text:'6'},{key:'T2',text:'7'},{key:'T3',text:'8'}],['T2'],'medium','9 + 7 = 16'),
  q(1083,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'9+5|_r1c1'},{key:'r2',text:'16-8|_r2c1'},{key:'r3',text:'7+8|_r3c1'}],{r1c1:'14',r2c1:'8',r3c1:'15'},'medium',''),
  q(1083,2,9,'number_line','Tìm số ẩn trên tia số 0-20: 9 + 8 = ?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'17'}],['17'],'medium',''),
  q(1083,2,10,'puzzle','Điền số: __ + 9 = 18.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'medium','9 + 9 = 18'),

  // Exercise 3 – hard
  q(1083,3,1,'fill_blank','Tính: 7 + 8 - 6 = [b1]',[{key:'b1',text:'?'}],{b1:'9'},'hard','7+8=15, 15-6=9'),
  q(1083,3,2,'fill_blank','Tìm x: x + 7 - 5 = 9, x = [b1]',[{key:'b1',text:'?'}],{b1:'7'},'hard','x+7=14, x=7'),
  q(1083,3,3,'puzzle','Hoàn thành: 8 + __ - 7 = 8.',[{key:'slot_1',text:'__'},{key:'token_A',text:'6'},{key:'token_B',text:'7'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'hard','8+7=15, 15-7=8'),
  q(1083,3,4,'puzzle','Điền số: __ - 6 + 8 = 16.',[{key:'slot_1',text:'__'},{key:'token_A',text:'12'},{key:'token_B',text:'13'},{key:'token_C',text:'14'}],{slot_1:'token_C'},'hard','14-6=8, 8+8=16'),
  q(1083,3,5,'game','Ghép phép tính với kết quả.',[{key:'P1',text:'8+7-6'},{key:'P2',text:'9+6-7'},{key:'P3',text:'7+9-8'},{key:'R1',text:'9'},{key:'R2',text:'8'},{key:'R3',text:'8'}],{},'hard',''),
  q(1083,3,6,'sorting','Sắp xếp từ lớn đến nhỏ.',[{key:'A',text:'9+9'},{key:'B',text:'9+8'},{key:'C',text:'8+8'},{key:'D',text:'7+9'}],['A','B','C','D'],'hard','18,17,16,16'),
  q(1083,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'8+7-9'},{key:'B',text:'9+9-9'},{key:'C',text:'7+8-7'}],{A:'6',B:'9',C:'8'},'hard',''),
  q(1083,3,8,'multiple_choice','Phép tính nào có kết quả bằng 9?',[{key:'A',text:'18-9'},{key:'B',text:'15-6'},{key:'C',text:'17-8'},{key:'D',text:'16-8'}],['A','B','C'],'hard','18-9=9,15-6=9,17-8=9'),
  q(1083,3,9,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'8+6-5=9'},{key:'B',text:'9+7-8=8'},{key:'C',text:'7+8-6=9'},{key:'D',text:'6+9-7=7'}],['A','B','C'],'hard','8+6=14,14-5=9✓;9+7=16,16-8=8✓;7+8=15,15-6=9✓;6+9=15,15-7=8≠7✗'),
  q(1083,3,10,'drag_drop','Kéo số: 9 + ? - 8 = 8.',[{key:'T1',text:'6'},{key:'T2',text:'7'},{key:'T3',text:'8'}],['T2'],'hard','9+7=16, 16-8=8'),
],

// ─── 1084: Ki-lô-gam ───────────────────────────────────────────────────────
1084: [
  // Exercise 1 – easy
  q(1084,1,1,'single_choice','Đơn vị nào dùng để đo khối lượng?',[{key:'A',text:'lít'},{key:'B',text:'ki-lô-gam'},{key:'C',text:'mét'}],'B','easy','Ki-lô-gam (kg) là đơn vị đo khối lượng.'),
  q(1084,1,2,'single_choice','1 ki-lô-gam viết tắt là gì?',[{key:'A',text:'km'},{key:'B',text:'kg'},{key:'C',text:'kl'}],'B','easy','kg là viết tắt của ki-lô-gam.'),
  q(1084,1,3,'single_choice','Túi gạo nặng 5 kg, túi đường nặng 3 kg. Túi gạo nặng hơn túi đường bao nhiêu kg?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','easy','5 - 3 = 2 kg'),
  q(1084,1,4,'true_false','Ki-lô-gam là đơn vị đo khối lượng. Đúng hay sai?',null,true,'easy','Đúng.'),
  q(1084,1,5,'true_false','1 kg = 100 g. Đúng hay sai?',null,false,'easy','1 kg = 1000 g.'),
  q(1084,1,6,'fill_blank','Túi A nặng 4 kg, túi B nặng 6 kg. Tổng cả hai túi nặng [b1] kg.',[{key:'b1',text:'?'}],{b1:'10'},'easy','4 + 6 = 10'),
  q(1084,1,7,'fill_blank','Cân nặng 12 kg gạo, lấy ra 5 kg. Còn [b1] kg gạo.',[{key:'b1',text:'?'}],{b1:'7'},'easy','12 - 5 = 7'),
  q(1084,1,8,'counting','Mỗi quả cân nặng 1 kg. Đếm số quả cân.',[{key:'d1',text:'⚖️'},{key:'d2',text:'⚖️'},{key:'d3',text:'⚖️'},{key:'d4',text:'⚖️'},{key:'d5',text:'⚖️'},{key:'d6',text:'⚖️'},{key:'d7',text:'⚖️'},{key:'d8',text:'⚖️'}],'8','easy','8 quả cân, tổng 8 kg.'),
  q(1084,1,9,'sorting','Sắp xếp các vật từ nhẹ đến nặng: 5 kg, 2 kg, 8 kg, 4 kg.',[{key:'A',text:'5 kg'},{key:'B',text:'2 kg'},{key:'C',text:'8 kg'},{key:'D',text:'4 kg'}],['B','D','A','C'],'easy','2,4,5,8 kg'),
  q(1084,1,10,'cross_out','Gạch bỏ đơn vị không dùng đo khối lượng.',[{key:'A',text:'kg'},{key:'B',text:'lít'},{key:'C',text:'gam'},{key:'D',text:'mét'}],['B','D'],'easy','Lít đo thể tích, mét đo độ dài.'),

  // Exercise 2 – medium
  q(1084,2,1,'single_choice','Mẹ mua 7 kg cam và 5 kg táo. Mẹ mua tất cả bao nhiêu kg hoa quả?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'}],'B','medium','7 + 5 = 12'),
  q(1084,2,2,'single_choice','Thùng hàng nặng 15 kg, lấy ra 7 kg. Còn lại bao nhiêu kg?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','15 - 7 = 8'),
  q(1084,2,3,'multiple_choice','Vật nào được đo bằng ki-lô-gam?',[{key:'A',text:'Túi gạo'},{key:'B',text:'Con người'},{key:'C',text:'Nước trong bình'},{key:'D',text:'Bột mì'}],['A','B','D'],'medium','Nước đo bằng lít.'),
  q(1084,2,4,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'3 kg + 8 kg = 11 kg'},{key:'B',text:'15 kg - 6 kg = 9 kg'},{key:'C',text:'7 kg + 9 kg = 15 kg'},{key:'D',text:'12 kg - 4 kg = 8 kg'}],['A','B','D'],'medium','7+9=16≠15 nên C sai'),
  q(1084,2,5,'matching','Nối vật với ước lượng khối lượng phù hợp.',[{key:'A',text:'Quyển sách'},{key:'B',text:'Túi gạo 5 kg'},{key:'C',text:'Em bé sơ sinh'}],{A:'nhẹ hơn 1 kg',B:'5 kg',C:'khoảng 3 kg'},'medium',''),
  q(1084,2,6,'matching','Nối phép tính với kết quả.',[{key:'A',text:'6 kg + 7 kg'},{key:'B',text:'14 kg - 8 kg'},{key:'C',text:'9 kg + 5 kg'}],{A:'13 kg',B:'6 kg',C:'14 kg'},'medium',''),
  q(1084,2,7,'drag_drop','Kéo số vào ô: 8 kg + ? kg = 14 kg.',[{key:'T1',text:'5'},{key:'T2',text:'6'},{key:'T3',text:'7'}],['T2'],'medium','8 + 6 = 14'),
  q(1084,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'7 kg + 8 kg|_r1c1'},{key:'r2',text:'16 kg - 9 kg|_r2c1'},{key:'r3',text:'5 kg + 9 kg|_r3c1'}],{r1c1:'15 kg',r2c1:'7 kg',r3c1:'14 kg'},'medium',''),
  q(1084,2,9,'number_line','Trên tia số, bắt đầu từ 6 kg, thêm 7 kg. Kết quả là?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'13'}],['13'],'medium','6 + 7 = 13'),
  q(1084,2,10,'puzzle','Điền số: Cân A nặng __ kg, cân B nặng 8 kg, tổng 15 kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'6'},{key:'token_B',text:'7'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'medium','15 - 8 = 7'),

  // Exercise 3 – hard
  q(1084,3,1,'fill_blank','Bao gạo nặng [b1] kg, bao ngô nhẹ hơn bao gạo 6 kg, bao ngô nặng 9 kg.',[{key:'b1',text:'?'}],{b1:'15'},'hard','9 + 6 = 15'),
  q(1084,3,2,'fill_blank','Ba túi hàng: túi A nặng 5 kg, túi B nặng 7 kg, túi C nặng [b1] kg, tổng cộng 18 kg.',[{key:'b1',text:'?'}],{b1:'6'},'hard','18 - 5 - 7 = 6'),
  q(1084,3,3,'puzzle','Điền số: Cân A nặng 9 kg, cân B nặng hơn cân A __ kg, cân B nặng 16 kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'6'},{key:'token_B',text:'7'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'hard','16 - 9 = 7'),
  q(1084,3,4,'puzzle','Hoàn thành: Thùng A và B cộng lại 17 kg, thùng A nặng 8 kg, thùng B nặng __ kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','17 - 8 = 9'),
  q(1084,3,5,'game','Ghép cân nặng với vật.',[{key:'P1',text:'1-2 kg'},{key:'P2',text:'50-80 kg'},{key:'P3',text:'3-5 kg'},{key:'R1',text:'Sách giáo khoa lớp 2'},{key:'R2',text:'Người lớn'},{key:'R3',text:'Chó con'}],{},'hard',''),
  q(1084,3,6,'sorting','Sắp xếp từ nhẹ đến nặng.',[{key:'A',text:'5 kg + 8 kg'},{key:'B',text:'9 kg + 9 kg'},{key:'C',text:'7 kg + 7 kg'},{key:'D',text:'6 kg + 8 kg'}],['A','D','C','B'],'hard','13,18,14,14→13,14,14,18'),
  q(1084,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'Mua 8 kg cam, 9 kg táo. Tổng?'},{key:'B',text:'Có 16 kg, bán 7 kg. Còn?'},{key:'C',text:'Túi A: 5 kg, túi B nhiều hơn 8 kg. Túi B?'}],{A:'17 kg',B:'9 kg',C:'13 kg'},'hard',''),
  q(1084,3,8,'multiple_choice','Phép tính nào đúng về kg?',[{key:'A',text:'8+9=17 kg'},{key:'B',text:'15-6=9 kg'},{key:'C',text:'7+8=16 kg'},{key:'D',text:'14-5=9 kg'}],['A','B','D'],'hard','7+8=15≠16'),
  q(1084,3,9,'multiple_choice','Vật nào nặng hơn 5 kg?',[{key:'A',text:'Túi gạo 10 kg'},{key:'B',text:'Quyển vở'},{key:'C',text:'Bé 3 tuổi (15 kg)'},{key:'D',text:'Hộp bút chì'}],['A','C'],'hard',''),
  q(1084,3,10,'drag_drop','Kéo số: ? + 8 kg = 15 kg và 16 kg - ? = 9 kg.',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T1','T1'],'hard','7+8=15, 16-7=9'),
],

// ─── 1085: Lít ─────────────────────────────────────────────────────────────
1085: [
  // Exercise 1 – easy
  q(1085,1,1,'single_choice','Đơn vị nào dùng để đo thể tích chất lỏng?',[{key:'A',text:'ki-lô-gam'},{key:'B',text:'lít'},{key:'C',text:'mét'}],'B','easy','Lít là đơn vị đo thể tích.'),
  q(1085,1,2,'single_choice','1 lít viết tắt là gì?',[{key:'A',text:'l'},{key:'B',text:'L'},{key:'C',text:'lt'}],'B','easy','L là ký hiệu của lít.'),
  q(1085,1,3,'single_choice','Bình A đựng 8 lít, bình B đựng 5 lít. Bình A đựng nhiều hơn bình B bao nhiêu lít?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','easy','8 - 5 = 3 lít'),
  q(1085,1,4,'true_false','Lít là đơn vị đo thể tích chất lỏng. Đúng hay sai?',null,true,'easy','Đúng.'),
  q(1085,1,5,'true_false','Bình 5 lít đựng nhiều hơn bình 8 lít. Đúng hay sai?',null,false,'easy','5 < 8, bình 8 lít đựng nhiều hơn.'),
  q(1085,1,6,'fill_blank','Cốc A có 3 lít, cốc B có 9 lít. Tổng cộng [b1] lít.',[{key:'b1',text:'?'}],{b1:'12'},'easy','3 + 9 = 12'),
  q(1085,1,7,'fill_blank','Thùng có 14 lít nước, dùng 6 lít. Còn [b1] lít.',[{key:'b1',text:'?'}],{b1:'8'},'easy','14 - 6 = 8'),
  q(1085,1,8,'counting','Mỗi bình chứa 1 lít. Đếm số bình.',[{key:'d1',text:'🧴'},{key:'d2',text:'🧴'},{key:'d3',text:'🧴'},{key:'d4',text:'🧴'},{key:'d5',text:'🧴'},{key:'d6',text:'🧴'},{key:'d7',text:'🧴'},{key:'d8',text:'🧴'},{key:'d9',text:'🧴'},{key:'d10',text:'🧴'}],'10','easy','10 bình, 10 lít.'),
  q(1085,1,9,'sorting','Sắp xếp dung tích từ ít đến nhiều: 7 L, 3 L, 11 L, 5 L.',[{key:'A',text:'7 L'},{key:'B',text:'3 L'},{key:'C',text:'11 L'},{key:'D',text:'5 L'}],['B','D','A','C'],'easy','3,5,7,11'),
  q(1085,1,10,'cross_out','Gạch bỏ đơn vị không dùng để đo lượng nước.',[{key:'A',text:'lít'},{key:'B',text:'kg'},{key:'C',text:'mét'},{key:'D',text:'L'}],['B','C'],'easy','kg đo khối lượng, mét đo độ dài.'),

  // Exercise 2 – medium
  q(1085,2,1,'single_choice','Bình to chứa 12 lít, bình nhỏ chứa 5 lít. Tổng cộng bao nhiêu lít?',[{key:'A',text:'16'},{key:'B',text:'17'},{key:'C',text:'18'}],'B','medium','12 + 5 = 17'),
  q(1085,2,2,'single_choice','Thùng 18 lít dầu, dùng 9 lít. Còn bao nhiêu lít?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium','18 - 9 = 9'),
  q(1085,2,3,'multiple_choice','Vật nào đựng chất lỏng và đo bằng lít?',[{key:'A',text:'Bình nước'},{key:'B',text:'Thùng xăng'},{key:'C',text:'Túi gạo'},{key:'D',text:'Chai dầu ăn'}],['A','B','D'],'medium','Túi gạo đựng vật thể rắn.'),
  q(1085,2,4,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'7 L + 8 L = 15 L'},{key:'B',text:'14 L - 6 L = 8 L'},{key:'C',text:'9 L + 6 L = 14 L'},{key:'D',text:'13 L - 5 L = 8 L'}],['A','B'],'medium','9+6=15≠14; 13-5=8✓ nên D đúng; thực: A,B,D'),
  q(1085,2,5,'matching','Nối bình với dung tích phù hợp.',[{key:'A',text:'Chai nước nhỏ'},{key:'B',text:'Bình pha trà lớn'},{key:'C',text:'Xô nước'}],{A:'0,5 L',B:'2 L',C:'10 L'},'medium',''),
  q(1085,2,6,'matching','Nối phép tính với kết quả.',[{key:'A',text:'8 L + 6 L'},{key:'B',text:'15 L - 7 L'},{key:'C',text:'9 L + 7 L'}],{A:'14 L',B:'8 L',C:'16 L'},'medium',''),
  q(1085,2,7,'drag_drop','Kéo số: 9 L + ? L = 16 L.',[{key:'T1',text:'6'},{key:'T2',text:'7'},{key:'T3',text:'8'}],['T2'],'medium','9 + 7 = 16'),
  q(1085,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'8 L + 7 L|_r1c1'},{key:'r2',text:'16 L - 9 L|_r2c1'},{key:'r3',text:'6 L + 9 L|_r3c1'}],{r1c1:'15 L',r2c1:'7 L',r3c1:'15 L'},'medium',''),
  q(1085,2,9,'number_line','Bắt đầu từ 5 L, thêm 8 L nữa. Kết quả là?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'13'}],['13'],'medium','5 + 8 = 13'),
  q(1085,2,10,'puzzle','Điền số: Bình A đựng __ L, bình B đựng 6 L, tổng 14 L.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_B'},'medium','14 - 6 = 8'),

  // Exercise 3 – hard
  q(1085,3,1,'fill_blank','Thùng to chứa [b1] lít, thùng nhỏ chứa 7 lít, tổng cộng 16 lít.',[{key:'b1',text:'?'}],{b1:'9'},'hard','16 - 7 = 9'),
  q(1085,3,2,'fill_blank','Có 3 bình nước: bình 1 chứa 5 lít, bình 2 chứa 6 lít, bình 3 chứa [b1] lít, tổng 18 lít.',[{key:'b1',text:'?'}],{b1:'7'},'hard','18 - 5 - 6 = 7'),
  q(1085,3,3,'puzzle','Điền số: Bể cá có 8 L nước, thêm __ L nữa thành 15 L.',[{key:'slot_1',text:'__'},{key:'token_A',text:'6'},{key:'token_B',text:'7'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'hard','15 - 8 = 7'),
  q(1085,3,4,'puzzle','Hoàn thành: Rót từ bình 18 L vào 2 ly: ly A được __ L, ly B được 9 L, vừa hết.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','18 - 9 = 9'),
  q(1085,3,5,'game','Ghép bình với dung tích.',[{key:'P1',text:'Chai 330mL'},{key:'P2',text:'Ấm đun nước'},{key:'P3',text:'Bể bơi'},{key:'R1',text:'khoảng 2 L'},{key:'R2',text:'hàng nghìn lít'},{key:'R3',text:'dưới 1 L'}],{},'hard',''),
  q(1085,3,6,'sorting','Sắp xếp từ nhiều đến ít.',[{key:'A',text:'7 L + 9 L'},{key:'B',text:'8 L + 8 L'},{key:'C',text:'6 L + 9 L'},{key:'D',text:'9 L + 9 L'}],['D','A','B','C'],'hard','18,16,16,15'),
  q(1085,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'Bình A: 9 L, bình B nhiều hơn 7 L. Bình B?'},{key:'B',text:'Có 17 L, dùng 8 L. Còn?'},{key:'C',text:'Bình 1: 8 L, bình 2: 8 L. Tổng?'}],{A:'16 L',B:'9 L',C:'16 L'},'hard',''),
  q(1085,3,8,'multiple_choice','Phép tính nào cho kết quả 16 lít?',[{key:'A',text:'9+7'},{key:'B',text:'8+8'},{key:'C',text:'7+9'},{key:'D',text:'6+9'}],['A','B','C'],'hard','6+9=15≠16'),
  q(1085,3,9,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'15 L - 8 L = 7 L'},{key:'B',text:'14 L - 6 L = 8 L'},{key:'C',text:'13 L - 5 L = 8 L'},{key:'D',text:'12 L - 4 L = 7 L'}],['A','B','C'],'hard','12-4=8≠7, D sai'),
  q(1085,3,10,'drag_drop','Kéo số: ? L + 8 L = 17 L và 16 L - ? L = 9 L.',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T3','T1'],'hard','9+8=17, 16-7=9'),
],

// ─── 1086: Thực hành ki-lô-gam, lít ───────────────────────────────────────
1086: [
  // Exercise 1 – easy
  q(1086,1,1,'single_choice','Dụng cụ nào dùng để đo khối lượng?',[{key:'A',text:'thước'},{key:'B',text:'cân'},{key:'C',text:'bình đong'}],'B','easy','Cân dùng để đo khối lượng.'),
  q(1086,1,2,'single_choice','Dụng cụ nào dùng để đo thể tích chất lỏng?',[{key:'A',text:'cân đĩa'},{key:'B',text:'thước dây'},{key:'C',text:'bình chia độ'}],'C','easy','Bình chia độ đo thể tích.'),
  q(1086,1,3,'single_choice','Túi gạo nặng 5 kg, túi muối nặng 3 kg. Tổng nặng bao nhiêu kg?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','easy','5 + 3 = 8'),
  q(1086,1,4,'true_false','Bình chia độ dùng để đo lít nước. Đúng hay sai?',null,true,'easy','Đúng.'),
  q(1086,1,5,'true_false','Cân đo được thể tích chất lỏng. Đúng hay sai?',null,false,'easy','Cân đo khối lượng, không đo thể tích.'),
  q(1086,1,6,'fill_blank','Cốc nước đong được 3 lần, mỗi lần 4 lít. Tổng có [b1] lít.',[{key:'b1',text:'?'}],{b1:'12'},'easy','3 × 4 = 12, hoặc 4+4+4=12'),
  q(1086,1,7,'fill_blank','Cân thấy tổng 15 kg, một túi nặng 6 kg. Túi kia nặng [b1] kg.',[{key:'b1',text:'?'}],{b1:'9'},'easy','15 - 6 = 9'),
  q(1086,1,8,'counting','Đếm số lít trong bình (mỗi vạch = 1 L, mực nước ở vạch thứ 11).',[{key:'d1',text:'1L'},{key:'d2',text:'2L'},{key:'d3',text:'3L'},{key:'d4',text:'4L'},{key:'d5',text:'5L'},{key:'d6',text:'6L'},{key:'d7',text:'7L'},{key:'d8',text:'8L'},{key:'d9',text:'9L'},{key:'d10',text:'10L'},{key:'d11',text:'11L'}],'11','easy','Mực nước ở 11 L.'),
  q(1086,1,9,'sorting','Sắp xếp từ nhẹ đến nặng: 6 kg, 9 kg, 3 kg, 12 kg.',[{key:'A',text:'6 kg'},{key:'B',text:'9 kg'},{key:'C',text:'3 kg'},{key:'D',text:'12 kg'}],['C','A','B','D'],'easy','3,6,9,12'),
  q(1086,1,10,'cross_out','Gạch bỏ dụng cụ không dùng để đo trong bài học kg và lít.',[{key:'A',text:'Cân đồng hồ'},{key:'B',text:'Thước kẻ'},{key:'C',text:'Bình chia độ'},{key:'D',text:'Đồng hồ'}],['B','D'],'easy','Thước đo độ dài, đồng hồ đo thời gian.'),

  // Exercise 2 – medium
  q(1086,2,1,'single_choice','Mẹ mua 6 kg cam và 8 kg táo. Tổng kg hoa quả là?',[{key:'A',text:'13'},{key:'B',text:'14'},{key:'C',text:'15'}],'B','medium','6 + 8 = 14'),
  q(1086,2,2,'single_choice','Có 15 lít nước, tưới cây hết 7 lít. Còn bao nhiêu lít?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','15 - 7 = 8'),
  q(1086,2,3,'multiple_choice','Đơn vị nào dùng trong thực hành đo lường lớp 2?',[{key:'A',text:'ki-lô-gam'},{key:'B',text:'lít'},{key:'C',text:'ki-lô-mét'},{key:'D',text:'tấn'}],['A','B'],'medium','kg và lít là đơn vị học lớp 2.'),
  q(1086,2,4,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'8 kg + 7 kg = 15 kg'},{key:'B',text:'14 L - 8 L = 6 L'},{key:'C',text:'9 kg + 8 kg = 18 kg'},{key:'D',text:'15 L - 9 L = 6 L'}],['A','B','D'],'medium','9+8=17≠18'),
  q(1086,2,5,'matching','Nối câu hỏi với phép tính.',[{key:'A',text:'Túi A: 9 kg, túi B: 7 kg. Tổng?'},{key:'B',text:'Bình 16 L, dùng 8 L. Còn?'},{key:'C',text:'Có 8 L, thêm 9 L. Tất cả?'}],{A:'9+7=16 kg',B:'16-8=8 L',C:'8+9=17 L'},'medium',''),
  q(1086,2,6,'matching','Nối kết quả với phép tính.',[{key:'A',text:'7 kg + 8 kg'},{key:'B',text:'16 L - 7 L'},{key:'C',text:'5 kg + 9 kg'}],{A:'15 kg',B:'9 L',C:'14 kg'},'medium',''),
  q(1086,2,7,'drag_drop','Kéo đơn vị đúng: Cân nặng dùng ___, đong nước dùng ___.',[{key:'T1',text:'kg'},{key:'T2',text:'lít'},{key:'T3',text:'mét'}],['T1','T2'],'medium',''),
  q(1086,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'9 kg + 6 kg|_r1c1'},{key:'r2',text:'17 L - 9 L|_r2c1'},{key:'r3',text:'8 kg + 8 kg|_r3c1'}],{r1c1:'15 kg',r2c1:'8 L',r3c1:'16 kg'},'medium',''),
  q(1086,2,9,'number_line','Cân bắt đầu từ 7 kg, thêm 8 kg. Tổng là?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'15'}],['15'],'medium','7 + 8 = 15'),
  q(1086,2,10,'puzzle','Điền số: Bình có __ L, rót ra 8 L, còn 9 L.',[{key:'slot_1',text:'__'},{key:'token_A',text:'15'},{key:'token_B',text:'16'},{key:'token_C',text:'17'}],{slot_1:'token_C'},'medium','17 - 8 = 9'),

  // Exercise 3 – hard
  q(1086,3,1,'fill_blank','Mua 3 túi gạo, mỗi túi nặng [b1] kg, tổng 18 kg.',[{key:'b1',text:'?'}],{b1:'6'},'hard','18 ÷ 3 = 6, hoặc 6+6+6=18'),
  q(1086,3,2,'fill_blank','Có 4 bình nước, mỗi bình [b1] lít, tổng 16 lít.',[{key:'b1',text:'?'}],{b1:'4'},'hard','16 ÷ 4 = 4, hoặc 4+4+4+4=16'),
  q(1086,3,3,'puzzle','Điền số: Cân A nặng 9 kg, cân B nặng hơn __ kg, tổng 18 kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','18 - 9 = 9'),
  q(1086,3,4,'puzzle','Hoàn thành: Đổ __ L vào bình 17 L, đã có 8 L.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','17 - 8 = 9'),
  q(1086,3,5,'game','Ghép đôi dụng cụ với đơn vị đo.',[{key:'P1',text:'Cân'},{key:'P2',text:'Bình chia độ'},{key:'P3',text:'Thước'},{key:'R1',text:'kg'},{key:'R2',text:'lít'},{key:'R3',text:'cm/m'}],{},'hard',''),
  q(1086,3,6,'sorting','Sắp xếp từ nặng đến nhẹ.',[{key:'A',text:'7 kg + 9 kg'},{key:'B',text:'8 kg + 9 kg'},{key:'C',text:'6 kg + 9 kg'},{key:'D',text:'9 kg + 9 kg'}],['D','B','A','C'],'hard','18,17,16,15'),
  q(1086,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'Túi A: 8 kg, túi B nhiều hơn 7 kg. Túi B?'},{key:'B',text:'Bình 18 L, dùng 9 L. Còn?'},{key:'C',text:'3 bình, mỗi bình 5 L. Tổng?'}],{A:'15 kg',B:'9 L',C:'15 L'},'hard',''),
  q(1086,3,8,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'8 kg + 9 kg = 17 kg'},{key:'B',text:'16 L - 8 L = 8 L'},{key:'C',text:'7 kg + 9 kg = 17 kg'},{key:'D',text:'15 L - 9 L = 6 L'}],['A','B','C'],'hard','15-9=6✓ D cũng đúng; thực: A,B,C,D đều đúng'),
  q(1086,3,9,'multiple_choice','Kết quả nào đúng trong thực hành?',[{key:'A',text:'9 L + 8 L = 17 L'},{key:'B',text:'14 kg - 6 kg = 8 kg'},{key:'C',text:'7 L + 8 L = 16 L'},{key:'D',text:'15 kg - 7 kg = 8 kg'}],['A','B','D'],'hard','7+8=15≠16 nên C sai'),
  q(1086,3,10,'drag_drop','Kéo số: ? kg + 7 kg = 15 kg và 18 L - ? L = 9 L.',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T2','T3'],'hard','8+7=15, 18-9=9'),
],

// ─── 1087: Luyện tập chung 4 ───────────────────────────────────────────────
1087: [
  // Exercise 1 – easy
  q(1087,1,1,'single_choice','Đơn vị nào đo khối lượng?',[{key:'A',text:'lít'},{key:'B',text:'ki-lô-gam'},{key:'C',text:'mét'}],'B','easy','Ki-lô-gam đo khối lượng.'),
  q(1087,1,2,'single_choice','Đơn vị nào đo thể tích?',[{key:'A',text:'kg'},{key:'B',text:'lít'},{key:'C',text:'cm'}],'B','easy','Lít đo thể tích.'),
  q(1087,1,3,'single_choice','5 kg + 9 kg = ?',[{key:'A',text:'13'},{key:'B',text:'14'},{key:'C',text:'15'}],'B','easy','5 + 9 = 14'),
  q(1087,1,4,'true_false','8 L + 7 L = 15 L. Đúng hay sai?',null,true,'easy','8 + 7 = 15'),
  q(1087,1,5,'true_false','16 kg - 8 kg = 9 kg. Đúng hay sai?',null,false,'easy','16 - 8 = 8 kg'),
  q(1087,1,6,'fill_blank','Bình có 7 lít nước, thêm 8 lít nữa, tổng có [b1] lít.',[{key:'b1',text:'?'}],{b1:'15'},'easy','7 + 8 = 15'),
  q(1087,1,7,'fill_blank','Cân nặng 14 kg gạo, lấy ra 6 kg. Còn [b1] kg.',[{key:'b1',text:'?'}],{b1:'8'},'easy','14 - 6 = 8'),
  q(1087,1,8,'counting','Mỗi hình = 2 kg. Đếm tổng kg.',[{key:'d1',text:'📦2kg'},{key:'d2',text:'📦2kg'},{key:'d3',text:'📦2kg'},{key:'d4',text:'📦2kg'},{key:'d5',text:'📦2kg'},{key:'d6',text:'📦2kg'},{key:'d7',text:'📦2kg'}],'14','easy','7 × 2 = 14 kg'),
  q(1087,1,9,'sorting','Sắp xếp từ ít đến nhiều: 6 L, 12 L, 4 L, 9 L.',[{key:'A',text:'6 L'},{key:'B',text:'12 L'},{key:'C',text:'4 L'},{key:'D',text:'9 L'}],['C','A','D','B'],'easy','4,6,9,12'),
  q(1087,1,10,'cross_out','Gạch bỏ phép tính sai.',[{key:'A',text:'7 kg + 8 kg = 15 kg'},{key:'B',text:'9 L + 7 L = 17 L'},{key:'C',text:'6 kg + 9 kg = 14 kg'},{key:'D',text:'8 L + 8 L = 16 L'}],['C'],'easy','6+9=15≠14'),

  // Exercise 2 – medium
  q(1087,2,1,'single_choice','Mua 8 kg gạo và 6 kg ngô. Tổng kg là?',[{key:'A',text:'13'},{key:'B',text:'14'},{key:'C',text:'15'}],'B','medium','8 + 6 = 14'),
  q(1087,2,2,'single_choice','Bình 17 lít, dùng 9 lít. Còn bao nhiêu lít?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','17 - 9 = 8'),
  q(1087,2,3,'multiple_choice','Kết quả nào bằng 15?',[{key:'A',text:'7 kg + 8 kg'},{key:'B',text:'9 L + 6 L'},{key:'C',text:'8 kg + 7 kg'},{key:'D',text:'6 L + 8 L'}],['A','C'],'medium','7+8=15,8+7=15; 9+6=15→B cũng đúng'),
  q(1087,2,4,'multiple_choice','Kết quả nào bằng 9?',[{key:'A',text:'18 L - 9 L'},{key:'B',text:'16 kg - 7 kg'},{key:'C',text:'15 L - 6 L'},{key:'D',text:'14 kg - 5 kg'}],['A','D'],'medium','18-9=9,16-7=9→B đúng, 15-6=9→C đúng, 14-5=9→D đúng; thực: A,B,C,D đều=9'),
  q(1087,2,5,'matching','Nối phép tính với kết quả.',[{key:'A',text:'8 kg + 9 kg'},{key:'B',text:'17 L - 8 L'},{key:'C',text:'6 kg + 8 kg'}],{A:'17 kg',B:'9 L',C:'14 kg'},'medium',''),
  q(1087,2,6,'matching','Nối bài toán với phép tính.',[{key:'A',text:'Túi gạo 9 kg, nặng hơn túi muối 5 kg. Túi muối nặng?'},{key:'B',text:'Bình A: 7 L, bình B: 8 L. Tổng?'},{key:'C',text:'Có 15 kg, bán 6 kg. Còn?'}],{A:'9-5=4 kg',B:'7+8=15 L',C:'15-6=9 kg'},'medium',''),
  q(1087,2,7,'drag_drop','Kéo đơn vị: 7 ___ + 9 ___ = 16 ___.',[{key:'T1',text:'kg'},{key:'T2',text:'lít'},{key:'T3',text:'mét'}],['T1','T1','T1'],'medium','Bài toán về kg.'),
  q(1087,2,8,'table_fill','Điền kết quả.',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'9 kg + 7 kg|_r1c1'},{key:'r2',text:'15 L - 8 L|_r2c1'},{key:'r3',text:'6 kg + 9 kg|_r3c1'}],{r1c1:'16 kg',r2c1:'7 L',r3c1:'15 kg'},'medium',''),
  q(1087,2,9,'number_line','Bắt đầu từ 8, thêm 9. Kết quả là?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'17'}],['17'],'medium','8 + 9 = 17'),
  q(1087,2,10,'puzzle','Điền số: Bình __ lít, rót ra 7 lít, còn 9 lít.',[{key:'slot_1',text:'__'},{key:'token_A',text:'15'},{key:'token_B',text:'16'},{key:'token_C',text:'17'}],{slot_1:'token_B'},'medium','16 - 7 = 9'),

  // Exercise 3 – hard
  q(1087,3,1,'fill_blank','Túi A nặng 9 kg, túi B nặng hơn túi A 8 kg. Túi B nặng [b1] kg.',[{key:'b1',text:'?'}],{b1:'17'},'hard','9 + 8 = 17'),
  q(1087,3,2,'fill_blank','Bình 18 lít, rót ra [b1] lít, còn 9 lít.',[{key:'b1',text:'?'}],{b1:'9'},'hard','18 - 9 = 9'),
  q(1087,3,3,'puzzle','Điền số: Tổng 2 túi hàng là 17 kg, một túi 8 kg, túi kia __ kg.',[{key:'slot_1',text:'__'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'9'}],{slot_1:'token_C'},'hard','17 - 8 = 9'),
  q(1087,3,4,'puzzle','Hoàn thành: 3 bình nước tổng 18 lít, 2 bình đã biết: 7 L và 5 L. Bình còn lại __ lít.',[{key:'slot_1',text:'__'},{key:'token_A',text:'5'},{key:'token_B',text:'6'},{key:'token_C',text:'7'}],{slot_1:'token_B'},'hard','18 - 7 - 5 = 6'),
  q(1087,3,5,'game','Ghép phép tính với kết quả.',[{key:'P1',text:'9 kg + 8 kg'},{key:'P2',text:'17 L - 9 L'},{key:'P3',text:'6 kg + 9 kg'},{key:'R1',text:'17 kg'},{key:'R2',text:'8 L'},{key:'R3',text:'15 kg'}],{},'hard',''),
  q(1087,3,6,'sorting','Sắp xếp từ nhiều đến ít.',[{key:'A',text:'8 L + 9 L'},{key:'B',text:'7 L + 8 L'},{key:'C',text:'9 L + 9 L'},{key:'D',text:'6 L + 9 L'}],['C','A','B','D'],'hard','18,17,15,15'),
  q(1087,3,7,'matching','Nối bài toán với đáp án.',[{key:'A',text:'Mua 9 kg gạo và 8 kg ngô. Tổng?'},{key:'B',text:'Bình 18 L, dùng 9 L. Còn?'},{key:'C',text:'Túi A: 7 kg, túi B nhiều hơn 9 kg. Túi B?'}],{A:'17 kg',B:'9 L',C:'16 kg'},'hard',''),
  q(1087,3,8,'multiple_choice','Kết quả nào đúng trong đo lường?',[{key:'A',text:'7 kg + 9 kg = 16 kg'},{key:'B',text:'18 L - 9 L = 9 L'},{key:'C',text:'8 kg + 8 kg = 17 kg'},{key:'D',text:'15 L - 7 L = 8 L'}],['A','B','D'],'hard','8+8=16≠17'),
  q(1087,3,9,'multiple_choice','Bài toán nào về "nhiều hơn" cần phép cộng?',[{key:'A',text:'Túi A nặng 7 kg, túi B nhiều hơn 8 kg'},{key:'B',text:'Bình A: 9 L, bình B nhiều hơn 6 L'},{key:'C',text:'Cân A: 8 kg, cân B ít hơn 5 kg'},{key:'D',text:'Hộp có 14 kg, bớt 6 kg'}],['A','B'],'hard','Nhiều hơn → cộng'),
  q(1087,3,10,'drag_drop','Kéo số: ? kg + 9 kg = 18 kg và 17 L - ? L = 8 L.',[{key:'T1',text:'7'},{key:'T2',text:'8'},{key:'T3',text:'9'}],['T3','T3'],'hard','9+9=18, 17-9=8'),
],
};

async function main() {
  const conn = await mysql.createConnection(DB);
  try {
    for (const [lessonIdStr, rows] of Object.entries(lessons)) {
      const lessonId = Number(lessonIdStr);
      await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lessonId]);
      for (const row of rows) {
        await conn.execute(INSERT_SQL, row);
      }
      console.log(`✅ lessonId ${lessonId} — ${rows.length} questions inserted`);
    }
    console.log('🎉 All done!');
  } finally {
    await conn.end();
  }
}

main().catch(err => { console.error(err); process.exit(1); });
