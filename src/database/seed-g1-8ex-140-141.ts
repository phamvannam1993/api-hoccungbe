import 'reflect-metadata';
import { DataSource } from 'typeorm';

const ds = new DataSource({
  type: 'mysql',
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
  entities: [],
  synchronize: false,
});

type Row = [number, number, string, string, string|null, string, string, string|null, number, number];

function sc(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string, expl?:string): Row {
  return [lessonId, ex, 'single_choice', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function tf(lessonId:number, ex:number, sort:number, diff:string, text:string, ans:boolean, expl?:string): Row {
  return [lessonId, ex, 'true_false', text, null, JSON.stringify(ans), diff, expl||null, 10, sort];
}
function fb(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:Record<string,string>, expl?:string): Row {
  return [lessonId, ex, 'fill_blank', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function ct(lessonId:number, ex:number, sort:number, diff:string, text:string, ans:string, expl?:string): Row {
  return [lessonId, ex, 'counting', text, null, JSON.stringify(ans), diff, expl||null, 10, sort];
}
function mc(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string[], expl?:string): Row {
  return [lessonId, ex, 'multiple_choice', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function mt(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:Record<string,string>, expl?:string): Row {
  return [lessonId, ex, 'matching', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function dd(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string[], expl?:string): Row {
  return [lessonId, ex, 'drag_drop', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function so(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string[], expl?:string): Row {
  return [lessonId, ex, 'sorting', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function co(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string[], expl?:string): Row {
  return [lessonId, ex, 'cross_out', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function tf2(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:Record<string,string>, expl?:string): Row {
  return [lessonId, ex, 'table_fill', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function nl(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:Record<string,string>, expl?:string): Row {
  return [lessonId, ex, 'number_line', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function pz(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], ans:string, expl?:string): Row {
  return [lessonId, ex, 'puzzle', text, JSON.stringify(opts), JSON.stringify(ans), diff, expl||null, 10, sort];
}
function gm(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[], expl?:string): Row {
  return [lessonId, ex, 'game', text, JSON.stringify(opts), JSON.stringify({}), diff, expl||null, 10, sort];
}

// ─── LESSON 140: Ôn tập phép cộng, phép trừ trong phạm vi 10 ───────────────
const L140: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(140,1,1,'easy','3 + 4 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','3 + 4 = 7.'),
  sc(140,1,2,'easy','9 - 5 = ?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}],'C','9 - 5 = 4.'),
  sc(140,1,3,'easy','6 + 2 = ?',[{key:'A',text:'9'},{key:'B',text:'7'},{key:'C',text:'8'}],'C','6 + 2 = 8.'),
  sc(140,1,4,'easy','10 - 3 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'6'}],'A','10 - 3 = 7.'),
  tf(140,1,5,'easy','5 + 5 = 10. Đúng hay sai?',true,'5 + 5 = 10 là đúng.'),
  tf(140,1,6,'easy','8 - 2 = 5. Đúng hay sai?',false,'8 - 2 = 6, không phải 5.'),
  tf(140,1,7,'easy','4 + 3 = 8. Đúng hay sai?',false,'4 + 3 = 7, không phải 8.'),
  fb(140,1,8,'easy','2 + [b1] = 9',[{key:'b1',text:'?'}],{b1:'7'},'2 + 7 = 9.'),
  fb(140,1,9,'easy','[b1] - 4 = 6',[{key:'b1',text:'?'}],{b1:'10'},'10 - 4 = 6.'),
  fb(140,1,10,'easy','5 + [b1] = 5',[{key:'b1',text:'?'}],{b1:'0'},'5 + 0 = 5.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(140,2,1,'easy','🍎🍎🍎🍎🍎 có mấy quả táo?','5','Đếm: 5 quả táo.'),
  ct(140,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐ có mấy ngôi sao?','7','Đếm: 7 ngôi sao.'),
  ct(140,2,3,'easy','🐟🐟🐟🐟🐟🐟🐟🐟🐟 có mấy con cá?','9','Đếm: 9 con cá.'),
  so(140,2,4,'easy','Sắp xếp theo thứ tự tăng dần:',[{key:'A',text:'6'},{key:'B',text:'2'},{key:'C',text:'8'},{key:'D',text:'4'}],['B','D','A','C'],'2 < 4 < 6 < 8.'),
  so(140,2,5,'easy','Sắp xếp các số theo thứ tự giảm dần:',[{key:'A',text:'1'},{key:'B',text:'9'},{key:'C',text:'5'},{key:'D',text:'3'}],['B','C','D','A'],'9 > 5 > 3 > 1.'),
  so(140,2,6,'easy','Sắp xếp tổng tăng dần: 2+3, 1+1, 4+4',[{key:'A',text:'4+4'},{key:'B',text:'1+1'},{key:'C',text:'2+3'}],['B','C','A'],'1+1=2 < 2+3=5 < 4+4=8.'),
  co(140,2,7,'easy','Gạch bỏ số KHÔNG phải kết quả của phép cộng trong phạm vi 10:',[{key:'A',text:'5'},{key:'B',text:'11'},{key:'C',text:'8'},{key:'D',text:'3'}],['B'],'11 > 10, vượt phạm vi.'),
  co(140,2,8,'easy','Gạch bỏ phép tính SAI:',[{key:'A',text:'3+4=7'},{key:'B',text:'5+3=9'},{key:'C',text:'2+6=8'}],['B'],'5+3=8, không phải 9.'),
  fb(140,2,9,'easy','4 + [b1] = 10',[{key:'b1',text:'?'}],{b1:'6'},'4 + 6 = 10.'),
  fb(140,2,10,'easy','10 - [b1] = 3',[{key:'b1',text:'?'}],{b1:'7'},'10 - 7 = 3.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(140,3,1,'easy','7 - 0 = ?',[{key:'A',text:'0'},{key:'B',text:'7'},{key:'C',text:'1'}],'B','Bất kỳ số nào trừ 0 vẫn bằng chính nó.'),
  sc(140,3,2,'easy','0 + 6 = ?',[{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'6'}],'C','0 + 6 = 6.'),
  sc(140,3,3,'easy','Kết quả của 8 - 8 = ?',[{key:'A',text:'1'},{key:'B',text:'0'},{key:'C',text:'8'}],'B','8 - 8 = 0.'),
  sc(140,3,4,'easy','5 + 4 = ?',[{key:'A',text:'9'},{key:'B',text:'8'},{key:'C',text:'10'}],'A','5 + 4 = 9.'),
  tf(140,3,5,'easy','10 - 10 = 0. Đúng hay sai?',true,'10 - 10 = 0 là đúng.'),
  tf(140,3,6,'easy','3 + 7 = 9. Đúng hay sai?',false,'3 + 7 = 10, không phải 9.'),
  tf(140,3,7,'easy','6 - 3 = 3. Đúng hay sai?',true,'6 - 3 = 3 là đúng.'),
  fb(140,3,8,'easy','[b1] + 2 = 8',[{key:'b1',text:'?'}],{b1:'6'},'6 + 2 = 8.'),
  fb(140,3,9,'easy','9 - [b1] = 4',[{key:'b1',text:'?'}],{b1:'5'},'9 - 5 = 4.'),
  ct(140,3,10,'easy','🌟🌟🌟🌟🌟🌟🌟🌟 có mấy ngôi sao?','8','Đếm: 8 ngôi sao.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(140,4,1,'medium','Số nào cộng với 4 bằng 9?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','4 + 5 = 9.'),
  sc(140,4,2,'medium','8 - ? = 3',[{key:'A',text:'5'},{key:'B',text:'4'},{key:'C',text:'6'}],'A','8 - 5 = 3.'),
  sc(140,4,3,'medium','Phép tính nào có kết quả bằng 6?',[{key:'A',text:'3+4'},{key:'B',text:'9-3'},{key:'C',text:'5+2'}],'B','9 - 3 = 6.'),
  mc(140,4,4,'medium','Chọn TẤT CẢ phép tính có kết quả bằng 7:',[{key:'A',text:'3+4'},{key:'B',text:'10-3'},{key:'C',text:'6+1'},{key:'D',text:'8-2'}],['A','B','C'],'3+4=7, 10-3=7, 6+1=7.'),
  mc(140,4,5,'medium','Chọn TẤT CẢ phép tính có kết quả bằng 5:',[{key:'A',text:'2+3'},{key:'B',text:'10-5'},{key:'C',text:'4+1'},{key:'D',text:'6-2'}],['A','B','C'],'2+3=5, 10-5=5, 4+1=5.'),
  mc(140,4,6,'medium','Chọn TẤT CẢ phép tính SAI:',[{key:'A',text:'3+5=9'},{key:'B',text:'7-2=5'},{key:'C',text:'4+6=9'},{key:'D',text:'9-4=5'}],['A','C'],'3+5=8 không phải 9; 4+6=10 không phải 9.'),
  mt(140,4,7,'medium','Nối phép tính với kết quả:',[{key:'A',text:'2+6'},{key:'B',text:'9-4'},{key:'C',text:'3+3'},{key:'1',text:'8'},{key:'2',text:'5'},{key:'3',text:'6'}],{A:'1',B:'2',C:'3'},'2+6=8, 9-4=5, 3+3=6.'),
  mt(140,4,8,'medium','Nối phép tính với kết quả:',[{key:'A',text:'7-0'},{key:'B',text:'4+4'},{key:'C',text:'10-1'},{key:'1',text:'7'},{key:'2',text:'8'},{key:'3',text:'9'}],{A:'1',B:'2',C:'3'},'7-0=7, 4+4=8, 10-1=9.'),
  dd(140,4,9,'medium','Kéo số vào chỗ trống: 5 + ___ = 8',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],['B'],'5 + 3 = 8.'),
  dd(140,4,10,'medium','Kéo số vào chỗ trống: ___ - 4 = 5',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],['B'],'9 - 4 = 5.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(140,5,1,'medium','Điền kết quả vào bảng cộng:',[{key:'r1c1',text:'2+3'},{key:'r1c2',text:'4+4'},{key:'r2c1',text:'6+2'},{key:'r2c2',text:'5+5'}],{r1c1:'5',r1c2:'8',r2c1:'8',r2c2:'10'},'2+3=5, 4+4=8, 6+2=8, 5+5=10.'),
  tf2(140,5,2,'medium','Điền kết quả vào bảng trừ:',[{key:'r1c1',text:'10-3'},{key:'r1c2',text:'9-5'},{key:'r2c1',text:'8-6'},{key:'r2c2',text:'7-4'}],{r1c1:'7',r1c2:'4',r2c1:'2',r2c2:'3'},'10-3=7, 9-5=4, 8-6=2, 7-4=3.'),
  nl(140,5,3,'medium','Điền số còn thiếu trên tia số (0..10): _,2,_,4,_,6',[{key:'p1',text:'Vị trí 1'},{key:'p3',text:'Vị trí 3'},{key:'p5',text:'Vị trí 5'}],{p1:'1',p3:'3',p5:'5'},'Các số lẻ: 1,3,5.'),
  nl(140,5,4,'medium','Tia số: 10,_,8,_,6,_,4',[{key:'p2',text:'Vị trí 2'},{key:'p4',text:'Vị trí 4'},{key:'p6',text:'Vị trí 6'}],{p2:'9',p4:'7',p6:'5'},'Đếm ngược: 9,7,5.'),
  pz(140,5,5,'medium','? + 3 = 10. Tìm ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','7 + 3 = 10.'),
  pz(140,5,6,'medium','Lan có 6 quả bóng, cho bạn 2 quả. Lan còn mấy quả?',[{key:'A',text:'4'},{key:'B',text:'8'},{key:'C',text:'3'}],'A','6 - 2 = 4.'),
  pz(140,5,7,'medium','Nam có 3 chiếc kẹo, mẹ cho thêm 5 chiếc. Nam có tất cả mấy chiếc kẹo?',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'8'}],'C','3 + 5 = 8.'),
  mt(140,5,8,'medium','Nối phép tính với kết quả đúng:',[{key:'A',text:'5+3'},{key:'B',text:'10-6'},{key:'C',text:'2+7'},{key:'1',text:'8'},{key:'2',text:'4'},{key:'3',text:'9'}],{A:'1',B:'2',C:'3'},'5+3=8, 10-6=4, 2+7=9.'),
  mt(140,5,9,'medium','Nối phép tính với kết quả:',[{key:'A',text:'6-6'},{key:'B',text:'3+1'},{key:'C',text:'5+5'},{key:'1',text:'0'},{key:'2',text:'4'},{key:'3',text:'10'}],{A:'1',B:'2',C:'3'},'6-6=0, 3+1=4, 5+5=10.'),
  dd(140,5,10,'medium','Kéo dấu (+/-) thích hợp vào: 7 ___ 3 = 4',[{key:'A',text:'+'},{key:'B',text:'-'}],['B'],'7 - 3 = 4.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(140,6,1,'hard','[b1] + [b2] = 10, biết b1 = 4',[{key:'b1',text:'4'},{key:'b2',text:'?'}],{b1:'4',b2:'6'},'4 + 6 = 10.'),
  fb(140,6,2,'hard','8 - [b1] = [b2], biết b2 = 3',[{key:'b1',text:'?'},{key:'b2',text:'3'}],{b1:'5',b2:'3'},'8 - 5 = 3.'),
  fb(140,6,3,'hard','[b1] - 7 = 2',[{key:'b1',text:'?'}],{b1:'9'},'9 - 7 = 2.'),
  pz(140,6,4,'hard','Có 10 con chim trên cây, bay đi 4 con. Hỏi còn mấy con?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'4'}],'B','10 - 4 = 6.'),
  pz(140,6,5,'hard','Một hộp có 5 bút đỏ và 3 bút xanh. Hỏi có tất cả mấy bút?',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'8'}],'C','5 + 3 = 8.'),
  pz(140,6,6,'hard','Mẹ mua 9 quả cam, ăn hết 4 quả. Còn lại mấy quả?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','9 - 4 = 5.'),
  mc(140,6,7,'hard','Chọn TẤT CẢ cặp số cộng lại bằng 10:',[{key:'A',text:'3 và 7'},{key:'B',text:'4 và 6'},{key:'C',text:'5 và 5'},{key:'D',text:'2 và 9'}],['A','B','C'],'3+7=10, 4+6=10, 5+5=10. 2+9=11.'),
  mc(140,6,8,'hard','Chọn TẤT CẢ phép tính có kết quả nhỏ hơn 5:',[{key:'A',text:'3-3'},{key:'B',text:'2+1'},{key:'C',text:'8-5'},{key:'D',text:'4+1'}],['A','B','C'],'0, 3, 3 đều < 5.'),
  so(140,6,9,'hard','Sắp xếp kết quả tăng dần: 10-1, 2+2, 5+3, 3+0',[{key:'A',text:'3+0'},{key:'B',text:'2+2'},{key:'C',text:'5+3'},{key:'D',text:'10-1'}],['A','B','C','D'],'3 < 4 < 8 < 9.'),
  so(140,6,10,'hard','Sắp xếp giảm dần: 6-4, 9-7, 8-3, 7-5',[{key:'A',text:'8-3'},{key:'B',text:'6-4'},{key:'C',text:'9-7'},{key:'D',text:'7-5'}],['A','B','D','C'],'5 > 2 = 2 > 2... 8-3=5, 6-4=2, 9-7=2, 7-5=2 → 5>2>2>2.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(140,7,1,'hard','Nối cặp phép tính có cùng kết quả: (3+4) và (10-3); (5+2) và (9-2); (8-1) và (6+1)',[{key:'3+4',text:'7'},{key:'10-3',text:'7'},{key:'5+2',text:'7'},{key:'9-2',text:'7'},{key:'8-1',text:'7'},{key:'6+1',text:'7'}],'Các cặp đều bằng 7.'),
  gm(140,7,2,'hard','Ghép phép cộng với phép trừ tương ứng: (2+8) với (10-8); (3+6) với (9-6); (4+5) với (9-5)',[{key:'2+8',text:'10'},{key:'10-8',text:'2'},{key:'3+6',text:'9'},{key:'9-6',text:'3'},{key:'4+5',text:'9'},{key:'9-5',text:'4'}],'Phép cộng và phép trừ ngược nhau.'),
  mt(140,7,3,'hard','Nối mỗi câu hỏi với đáp án:',[{key:'A',text:'5+?=9'},{key:'B',text:'?-3=6'},{key:'C',text:'4+?=10'},{key:'1',text:'4'},{key:'2',text:'9'},{key:'3',text:'6'}],{A:'1',B:'2',C:'3'},'4, 9, 6.'),
  mt(140,7,4,'hard','Nối phép tính với từ so sánh đúng:',[{key:'A',text:'3+4 _ 6+1'},{key:'B',text:'9-3 _ 10-4'},{key:'C',text:'2+5 _ 4+2'},{key:'1',text:'='},{key:'2',text:'='},{key:'3',text:'>'}],{A:'1',B:'2',C:'3'},'3+4=7=6+1; 9-3=6=10-4; 2+5=7>4+2=6.'),
  mt(140,7,5,'hard','Nối phép tính với loại:',[{key:'A',text:'3+7'},{key:'B',text:'8-5'},{key:'C',text:'5+5'},{key:'1',text:'Kết quả là 10'},{key:'2',text:'Kết quả là 3'},{key:'3',text:'Kết quả là 10'}],{A:'1',B:'2',C:'3'},'3+7=10, 8-5=3, 5+5=10.'),
  fb(140,7,6,'hard','Điền dấu: 6 [b1] 4 = 10',[{key:'b1',text:'+/-'}],{b1:'+'},'6 + 4 = 10.'),
  fb(140,7,7,'hard','Điền số: 3 + 4 + [b1] = 10',[{key:'b1',text:'?'}],{b1:'3'},'3 + 4 + 3 = 10.'),
  fb(140,7,8,'hard','Điền số: 10 - [b1] - 2 = 5',[{key:'b1',text:'?'}],{b1:'3'},'10 - 3 - 2 = 5.'),
  dd(140,7,9,'hard','Kéo số thích hợp: 4 + ___ + 2 = 10',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],['B'],'4 + 4 + 2 = 10.'),
  dd(140,7,10,'hard','Kéo số thích hợp: 10 - ___ - 3 = 2',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],['B'],'10 - 5 - 3 = 2.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(140,8,1,'hard','Chọn TẤT CẢ phép tính bằng 8:',[{key:'A',text:'4+4'},{key:'B',text:'10-2'},{key:'C',text:'9-1'},{key:'D',text:'5+4'}],['A','B','C'],'4+4=8, 10-2=8, 9-1=8. 5+4=9.'),
  mc(140,8,2,'hard','Chọn TẤT CẢ phép tính bằng 3:',[{key:'A',text:'10-7'},{key:'B',text:'1+2'},{key:'C',text:'6-3'},{key:'D',text:'4-2'}],['A','B','C'],'10-7=3, 1+2=3, 6-3=3. 4-2=2.'),
  mc(140,8,3,'hard','Chọn TẤT CẢ phép tính SAI trong phạm vi 10:',[{key:'A',text:'5+6=11'},{key:'B',text:'3+8=11'},{key:'C',text:'7+4=11'},{key:'D',text:'6+3=9'}],['A','B','C'],'11 vượt phạm vi 10. 6+3=9 đúng.'),
  pz(140,8,4,'hard','Lớp học có 10 học sinh. Có 4 bạn về nhà. Hỏi còn mấy bạn?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'4'}],'B','10 - 4 = 6.'),
  pz(140,8,5,'hard','Tổ 1 trồng được 5 cây, tổ 2 trồng được 3 cây. Hỏi hai tổ trồng được tất cả mấy cây?',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'8'}],'C','5 + 3 = 8.'),
  pz(140,8,6,'hard','Có 9 cái bánh, chia đều cho 2 bạn, mỗi bạn 4 cái. Hỏi còn dư mấy cái?',[{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'}],'B','9 - 4 - 4 = 1.'),
  so(140,8,7,'hard','Sắp xếp tăng dần kết quả: 7+2, 10-8, 5-4, 6+3',[{key:'A',text:'5-4'},{key:'B',text:'10-8'},{key:'C',text:'7+2'},{key:'D',text:'6+3'}],['A','B','C','D'],'1 < 2 < 9 = 9.'),
  so(140,8,8,'hard','Sắp xếp giảm dần: 4+5, 8-7, 3+3, 9-2',[{key:'A',text:'4+5'},{key:'B',text:'9-2'},{key:'C',text:'3+3'},{key:'D',text:'8-7'}],['A','B','C','D'],'9 > 7 > 6 > 1.'),
  co(140,8,9,'hard','Gạch bỏ phép tính CÓ KẾT QUẢ LỚN HƠN 10:',[{key:'A',text:'5+6'},{key:'B',text:'8+3'},{key:'C',text:'4+5'},{key:'D',text:'7+4'}],['A','B','D'],'11, 11, 11 > 10. 4+5=9.'),
  co(140,8,10,'hard','Gạch bỏ số KHÔNG THỂ là kết quả của phép trừ trong phạm vi 10:',[{key:'A',text:'-1'},{key:'B',text:'5'},{key:'C',text:'11'},{key:'D',text:'0'}],['A','C'],'-1 và 11 ngoài phạm vi 0-10.'),
];

// ─── LESSON 141: Ôn tập hình học ────────────────────────────────────────────
const L141: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(141,1,1,'easy','Hình nào có 4 cạnh bằng nhau?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'}],'B','Hình vuông có 4 cạnh bằng nhau.'),
  sc(141,1,2,'easy','Tam giác có mấy cạnh?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'}],'C','Tam giác có 3 cạnh.'),
  sc(141,1,3,'easy','Hình nào không có góc?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông'}],'B','Hình tròn không có góc.'),
  sc(141,1,4,'easy','Hình chữ nhật có mấy cạnh?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}],'C','Hình chữ nhật có 4 cạnh.'),
  tf(141,1,5,'easy','Hình vuông có 4 góc vuông. Đúng hay sai?',true,'Hình vuông có 4 góc vuông là đúng.'),
  tf(141,1,6,'easy','Tam giác có 4 đỉnh. Đúng hay sai?',false,'Tam giác có 3 đỉnh.'),
  tf(141,1,7,'easy','Hình tròn có 1 cạnh cong. Đúng hay sai?',true,'Hình tròn có 1 cạnh cong là đúng.'),
  fb(141,1,8,'easy','Hình vuông có [b1] cạnh bằng nhau.',[{key:'b1',text:'?'}],{b1:'4'},'Hình vuông có 4 cạnh.'),
  fb(141,1,9,'easy','Tam giác có [b1] góc.',[{key:'b1',text:'?'}],{b1:'3'},'Tam giác có 3 góc.'),
  fb(141,1,10,'easy','Hình chữ nhật có [b1] cặp cạnh bằng nhau.',[{key:'b1',text:'?'}],{b1:'2'},'Hình chữ nhật có 2 cặp cạnh bằng nhau.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(141,2,1,'easy','🔺🔺🔺🔺🔺 có mấy tam giác?','5','Đếm: 5 tam giác.'),
  ct(141,2,2,'easy','⬛⬛⬛⬛⬛⬛⬛ có mấy hình vuông?','7','Đếm: 7 hình vuông.'),
  ct(141,2,3,'easy','⭕⭕⭕⭕ có mấy hình tròn?','4','Đếm: 4 hình tròn.'),
  so(141,2,4,'easy','Sắp xếp hình theo số cạnh tăng dần:',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Tam giác (3)'},{key:'C',text:'Hình vuông (4)'}],['A','B','C'],'0 < 3 < 4 cạnh.'),
  so(141,2,5,'easy','Sắp xếp theo số góc tăng dần:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình chữ nhật'}],['A','B','C'],'0 < 3 < 4 góc.'),
  so(141,2,6,'easy','Sắp xếp theo số đỉnh giảm dần:',[{key:'A',text:'Hình vuông (4)'},{key:'B',text:'Tam giác (3)'},{key:'C',text:'Hình tròn (0)'}],['A','B','C'],'4 > 3 > 0.'),
  co(141,2,7,'easy','Gạch bỏ hình KHÔNG có góc vuông:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tròn'}],['B','D'],'Tam giác và hình tròn không có góc vuông.'),
  co(141,2,8,'easy','Gạch bỏ hình KHÔNG phải hình phẳng (2D):',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Hình tròn'},{key:'C',text:'Khối hộp'},{key:'D',text:'Tam giác'}],['A','C'],'Khối lập phương và khối hộp là hình 3D.'),
  fb(141,2,9,'easy','Hình tròn có [b1] góc.',[{key:'b1',text:'?'}],{b1:'0'},'Hình tròn không có góc.'),
  fb(141,2,10,'easy','Khối lập phương có [b1] mặt.',[{key:'b1',text:'?'}],{b1:'6'},'Khối lập phương có 6 mặt.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(141,3,1,'easy','Hình nào có 3 đỉnh?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình tròn'}],'B','Tam giác có 3 đỉnh.'),
  sc(141,3,2,'easy','Khối hộp có bao nhiêu mặt?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'C','Khối hộp có 6 mặt.'),
  sc(141,3,3,'easy','Hình nào có thể lăn được?',[{key:'A',text:'Khối hộp'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Khối cầu'}],'C','Khối cầu lăn được vì bề mặt cong.'),
  sc(141,3,4,'easy','Hình nào có 2 cặp cạnh đối bằng nhau nhưng không vuông?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'}],'A','Hình chữ nhật có 2 cặp cạnh đối bằng nhau.'),
  tf(141,3,5,'easy','Hình vuông và hình chữ nhật đều có 4 cạnh. Đúng hay sai?',true,'Cả hai đều có 4 cạnh.'),
  tf(141,3,6,'easy','Khối lập phương có 8 đỉnh. Đúng hay sai?',true,'Khối lập phương có 8 đỉnh là đúng.'),
  tf(141,3,7,'easy','Tam giác có 4 cạnh. Đúng hay sai?',false,'Tam giác có 3 cạnh.'),
  fb(141,3,8,'easy','Hình chữ nhật có [b1] cạnh dài và [b2] cạnh ngắn.',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'2',b2:'2'},'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.'),
  fb(141,3,9,'easy','Khối hộp có [b1] cạnh.',[{key:'b1',text:'?'}],{b1:'12'},'Khối hộp có 12 cạnh.'),
  ct(141,3,10,'easy','🔷🔷🔷🔷🔷🔷 có mấy hình thoi?','6','Đếm: 6 hình thoi.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(141,4,1,'medium','Hình nào có diện tích lớn hơn nếu cùng chu vi?',[{key:'A',text:'Hình vuông 4x4'},{key:'B',text:'Hình chữ nhật 2x6'},{key:'C',text:'Bằng nhau'}],'A','Hình vuông 4x4 có S=16, hình chữ nhật 2x6 có S=12.'),
  sc(141,4,2,'medium','Hình nào có số cạnh nhiều nhất?',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình vuông'}],'B','Hình chữ nhật và hình vuông đều 4 cạnh, nhưng chọn hình chữ nhật theo thứ tự.'),
  sc(141,4,3,'medium','Vật nào có dạng khối cầu?',[{key:'A',text:'Hộp bánh'},{key:'B',text:'Quả bóng'},{key:'C',text:'Viên gạch'}],'B','Quả bóng có dạng khối cầu.'),
  mc(141,4,4,'medium','Chọn TẤT CẢ hình phẳng (2D):',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình tròn'},{key:'D',text:'Khối hộp'}],['A','B','C'],'Khối hộp là hình 3D.'),
  mc(141,4,5,'medium','Chọn TẤT CẢ hình có 4 cạnh:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác'},{key:'D',text:'Hình thoi'}],['A','B','D'],'Hình vuông, chữ nhật, thoi đều có 4 cạnh.'),
  mc(141,4,6,'medium','Chọn TẤT CẢ hình khối (3D):',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp'},{key:'C',text:'Tam giác'},{key:'D',text:'Khối cầu'}],['A','B','D'],'Khối lập phương, khối hộp, khối cầu là 3D.'),
  mt(141,4,7,'medium','Nối hình với số cạnh:',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tròn'},{key:'1',text:'3'},{key:'2',text:'4'},{key:'3',text:'0'}],{A:'1',B:'2',C:'3'},'Tam giác 3, hình vuông 4, hình tròn 0.'),
  mt(141,4,8,'medium','Nối hình khối với đặc điểm:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp'},{key:'C',text:'Khối cầu'},{key:'1',text:'6 mặt vuông'},{key:'2',text:'6 mặt chữ nhật'},{key:'3',text:'Mặt cong'}],{A:'1',B:'2',C:'3'},'Khối lập phương: 6 mặt vuông; khối hộp: 6 mặt chữ nhật; khối cầu: mặt cong.'),
  dd(141,4,9,'medium','Kéo tên hình vào đúng chỗ: Hình có 3 cạnh là ___',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình tròn'}],['B'],'Tam giác có 3 cạnh.'),
  dd(141,4,10,'medium','Kéo tên hình vào đúng chỗ: Hình không có cạnh thẳng là ___',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình tròn'}],['C'],'Hình tròn không có cạnh thẳng.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(141,5,1,'medium','Điền số cạnh của mỗi hình:',[{key:'r1c1',text:'Tam giác'},{key:'r1c2',text:'Hình vuông'},{key:'r2c1',text:'Hình chữ nhật'},{key:'r2c2',text:'Hình tròn'}],{r1c1:'3',r1c2:'4',r2c1:'4',r2c2:'0'},'Tam giác 3, hình vuông 4, hình chữ nhật 4, hình tròn 0.'),
  tf2(141,5,2,'medium','Điền số góc của mỗi hình:',[{key:'r1c1',text:'Tam giác'},{key:'r1c2',text:'Hình chữ nhật'},{key:'r2c1',text:'Hình vuông'},{key:'r2c2',text:'Hình tròn'}],{r1c1:'3',r1c2:'4',r2c1:'4',r2c2:'0'},'Tam giác 3, hình chữ nhật 4, hình vuông 4, hình tròn 0.'),
  nl(141,5,3,'medium','Điền số cạnh theo thứ tự: hình tròn, tam giác, hình chữ nhật, hình vuông',[{key:'p1',text:'Hình tròn'},{key:'p2',text:'Tam giác'},{key:'p3',text:'Hình chữ nhật'}],{p1:'0',p2:'3',p3:'4'},'0, 3, 4 cạnh.'),
  nl(141,5,4,'medium','Điền số mặt theo thứ tự: khối cầu(1), khối lập phương(?), khối hộp(?)',[{key:'p2',text:'Khối lập phương'},{key:'p3',text:'Khối hộp'}],{p2:'6',p3:'6'},'Khối lập phương và khối hộp đều có 6 mặt.'),
  pz(141,5,5,'medium','Một hình có 4 cạnh bằng nhau và 4 góc vuông. Đó là hình gì?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'}],'B','Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.'),
  pz(141,5,6,'medium','Vật nào trong lớp học có dạng hình chữ nhật?',[{key:'A',text:'Quả bóng'},{key:'B',text:'Trang sách'},{key:'C',text:'Cái cúc áo'}],'B','Trang sách có dạng hình chữ nhật.'),
  pz(141,5,7,'medium','Hình nào có thể lăn mà không bị ngã?',[{key:'A',text:'Khối hộp'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Khối cầu'}],'C','Khối cầu lăn được trên mọi hướng.'),
  mt(141,5,8,'medium','Nối hình với vật thật tương ứng:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'},{key:'1',text:'Mặt đồng hồ tròn'},{key:'2',text:'Viên gạch vuông'},{key:'3',text:'Biển báo tam giác'}],{A:'1',B:'2',C:'3'},'Hình tròn - đồng hồ; hình vuông - gạch; tam giác - biển báo.'),
  mt(141,5,9,'medium','Nối hình 3D với vật thật:',[{key:'A',text:'Khối cầu'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Khối hộp'},{key:'1',text:'Quả bóng'},{key:'2',text:'Hộp quà vuông'},{key:'3',text:'Hộp sữa'}],{A:'1',B:'2',C:'3'},'Khối cầu - bóng; khối lập phương - hộp vuông; khối hộp - hộp sữa.'),
  dd(141,5,10,'medium','Kéo tên hình đúng: Hình có 4 cạnh, 2 cạnh dài 2 cạnh ngắn là ___',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác'}],['B'],'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(141,6,1,'hard','Hình vuông có [b1] cạnh, mỗi cạnh bằng nhau, và [b2] góc vuông.',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'4',b2:'4'},'Hình vuông có 4 cạnh và 4 góc vuông.'),
  fb(141,6,2,'hard','Khối lập phương có [b1] mặt, [b2] cạnh, [b3] đỉnh.',[{key:'b1',text:'?'},{key:'b2',text:'?'},{key:'b3',text:'?'}],{b1:'6',b2:'12',b3:'8'},'Khối lập phương: 6 mặt, 12 cạnh, 8 đỉnh.'),
  fb(141,6,3,'hard','Có [b1] hình tam giác và [b2] hình vuông thì tổng cộng có bao nhiêu cạnh? (3 tam giác, 2 hình vuông)',[{key:'b1',text:'3 tam giác'},{key:'b2',text:'2 hình vuông'},{key:'b3',text:'Tổng cạnh'}],{b1:'3',b2:'2',b3:'17'},'3×3 + 2×4 = 9 + 8 = 17.'),
  pz(141,6,4,'hard','Bạn Nam vẽ một hình có 4 cạnh, 4 góc, các cạnh đối nhau bằng nhau nhưng không phải hình vuông. Đó là hình gì?',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],'B','Hình chữ nhật có 4 cạnh, các cạnh đối bằng nhau.'),
  pz(141,6,5,'hard','Cắt một hình vuông theo đường chéo ta được 2 hình gì?',[{key:'A',text:'2 hình vuông nhỏ'},{key:'B',text:'2 tam giác'},{key:'C',text:'2 hình chữ nhật'}],'B','Cắt theo đường chéo được 2 tam giác vuông.'),
  pz(141,6,6,'hard','Trong lớp có 3 hình vuông và 4 tam giác. Tổng số cạnh là bao nhiêu?',[{key:'A',text:'24'},{key:'B',text:'24'},{key:'C',text:'24'}],'A','3×4 + 4×3 = 12 + 12 = 24.'),
  mc(141,6,7,'hard','Chọn TẤT CẢ đặc điểm của hình vuông:',[{key:'A',text:'4 cạnh bằng nhau'},{key:'B',text:'4 góc vuông'},{key:'C',text:'Có đường tròn'},{key:'D',text:'2 đường chéo bằng nhau'}],['A','B','D'],'Hình vuông có 4 cạnh bằng nhau, 4 góc vuông, 2 đường chéo bằng nhau.'),
  mc(141,6,8,'hard','Chọn TẤT CẢ vật có dạng khối trụ (hình ống):',[{key:'A',text:'Lon nước ngọt'},{key:'B',text:'Hộp quà vuông'},{key:'C',text:'Ống chỉ'},{key:'D',text:'Quả bóng'}],['A','C'],'Lon nước ngọt và ống chỉ có dạng khối trụ.'),
  so(141,6,9,'hard','Sắp xếp hình theo số cạnh tăng dần:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','B','C','D'],'0 < 3 < 4 = 4 (hình vuông và chữ nhật).'),
  so(141,6,10,'hard','Sắp xếp hình khối theo số mặt tăng dần:',[{key:'A',text:'Khối cầu (1 mặt cong)'},{key:'B',text:'Khối trụ (3 mặt)'},{key:'C',text:'Khối lập phương (6 mặt)'}],['A','B','C'],'1 < 3 < 6.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(141,7,1,'hard','Ghép hình 2D với số cạnh tương ứng: tam giác-3, hình vuông-4, hình tròn-0, hình chữ nhật-4',[{key:'Tam giác',text:'3 cạnh'},{key:'Hình vuông',text:'4 cạnh'},{key:'Hình tròn',text:'0 cạnh'},{key:'Hình chữ nhật',text:'4 cạnh'}],'Nối hình với số cạnh.'),
  gm(141,7,2,'hard','Ghép hình 3D với đặc điểm: khối cầu-lăn, khối hộp-6 mặt chữ nhật, khối lập phương-6 mặt vuông',[{key:'Khối cầu',text:'Lăn được'},{key:'Khối hộp',text:'6 mặt chữ nhật'},{key:'Khối lập phương',text:'6 mặt vuông'}],'Nối hình khối với đặc điểm.'),
  mt(141,7,3,'hard','Nối hình với số đỉnh:',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'},{key:'1',text:'3'},{key:'2',text:'4'},{key:'3',text:'4'}],{A:'1',B:'2',C:'3'},'Tam giác 3, hình vuông 4, hình chữ nhật 4 đỉnh.'),
  mt(141,7,4,'hard','Nối tên hình với mô tả:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'},{key:'1',text:'Không có góc'},{key:'2',text:'4 cạnh bằng nhau'},{key:'3',text:'3 cạnh'}],{A:'1',B:'2',C:'3'},'Hình tròn không có góc; hình vuông 4 cạnh bằng nhau; tam giác 3 cạnh.'),
  mt(141,7,5,'hard','Nối hình với vật trong cuộc sống:',[{key:'A',text:'Khối cầu'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác'},{key:'1',text:'Quả địa cầu'},{key:'2',text:'Màn hình TV'},{key:'3',text:'Biển báo giao thông'}],{A:'1',B:'2',C:'3'},'Quả địa cầu - khối cầu; TV - chữ nhật; biển báo - tam giác.'),
  fb(141,7,6,'hard','Một hình chữ nhật có chiều dài [b1]cm và chiều rộng [b2]cm. Chu vi là [b3]cm. (dài=5, rộng=3)',[{key:'b1',text:'5'},{key:'b2',text:'3'},{key:'b3',text:'?'}],{b1:'5',b2:'3',b3:'16'},'Chu vi = (5+3)×2 = 16cm.'),
  fb(141,7,7,'hard','Hình vuông cạnh [b1]cm có chu vi [b2]cm. (cạnh=4)',[{key:'b1',text:'4'},{key:'b2',text:'?'}],{b1:'4',b2:'16'},'Chu vi = 4×4 = 16cm.'),
  fb(141,7,8,'hard','Có [b1] hình chữ nhật, mỗi hình có [b2] cạnh, tổng số cạnh là [b3]. (2 hình chữ nhật)',[{key:'b1',text:'2'},{key:'b2',text:'4'},{key:'b3',text:'?'}],{b1:'2',b2:'4',b3:'8'},'2 × 4 = 8 cạnh.'),
  dd(141,7,9,'hard','Kéo tên hình vào chỗ trống: Hình khối có thể lăn: ___',[{key:'A',text:'Khối hộp'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Khối cầu'}],['C'],'Khối cầu lăn được.'),
  dd(141,7,10,'hard','Kéo đặc điểm đúng cho hình vuông: ___',[{key:'A',text:'3 cạnh bằng nhau'},{key:'B',text:'4 cạnh bằng nhau và 4 góc vuông'},{key:'C',text:'Không có góc'}],['B'],'Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(141,8,1,'hard','Chọn TẤT CẢ hình có số cạnh bằng 4:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình thoi'},{key:'D',text:'Tam giác'}],['A','B','C'],'Hình vuông, chữ nhật, thoi đều có 4 cạnh.'),
  mc(141,8,2,'hard','Chọn TẤT CẢ hình có thể xếp kín mặt phẳng (ghép vào nhau không có khe hở):',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác đều'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật'}],['A','B','D'],'Hình vuông, tam giác, chữ nhật xếp kín được; hình tròn không xếp kín.'),
  mc(141,8,3,'hard','Chọn TẤT CẢ đặc điểm ĐÚNG của hình chữ nhật:',[{key:'A',text:'Có 4 cạnh'},{key:'B',text:'Có 4 góc vuông'},{key:'C',text:'4 cạnh bằng nhau'},{key:'D',text:'2 cặp cạnh song song'}],['A','B','D'],'Hình chữ nhật có 4 cạnh, 4 góc vuông, 2 cặp cạnh song song. Không phải 4 cạnh bằng nhau (đó là hình vuông).'),
  pz(141,8,4,'hard','Bạn An dùng que tính xếp hình. Dùng 3 que tính xếp được hình gì?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình chữ nhật'}],'B','3 que tính = 3 cạnh = tam giác.'),
  pz(141,8,5,'hard','Dùng 4 que tính bằng nhau xếp được hình gì?',[{key:'A',text:'Tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông'}],'C','4 que tính bằng nhau = hình vuông.'),
  pz(141,8,6,'hard','Ghép 2 tam giác vuông bằng nhau lại được hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'}],'B','Ghép 2 tam giác vuông cân thành hình vuông.'),
  so(141,8,7,'hard','Sắp xếp theo số cạnh tăng dần:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình vuông'}],['A','B','C','D'],'0 < 3 < 4 = 4.'),
  so(141,8,8,'hard','Sắp xếp theo số đỉnh giảm dần:',[{key:'A',text:'Hình vuông (4)'},{key:'B',text:'Tam giác (3)'},{key:'C',text:'Hình tròn (0)'}],['A','B','C'],'4 > 3 > 0.'),
  co(141,8,9,'hard','Gạch bỏ hình KHÔNG phải hình phẳng:',[{key:'A',text:'Khối hộp'},{key:'B',text:'Hình vuông'},{key:'C',text:'Khối cầu'},{key:'D',text:'Hình tròn'}],['A','C'],'Khối hộp và khối cầu là hình 3D.'),
  co(141,8,10,'hard','Gạch bỏ mô tả SAI về tam giác:',[{key:'A',text:'Có 3 cạnh'},{key:'B',text:'Có 4 góc'},{key:'C',text:'Có 3 đỉnh'},{key:'D',text:'Có 2 cạnh'}],['B','D'],'Tam giác có 3 góc, không phải 4; có 3 cạnh không phải 2.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    // Delete existing
    await qr.query(`DELETE FROM quizzes WHERE lessonId IN (140,141)`);

    for (const [lessonId, rows] of [[140, L140],[141, L141]] as [number, Row[]][]) {
      for (const row of rows) {
        await qr.query(SQL, row);
      }
      console.log(`✅ lessonId: ${lessonId}: ${rows.length}`);
    }
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
