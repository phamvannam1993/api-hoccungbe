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
function gm(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string,pair?:string}[], expl?:string): Row {
  return [lessonId, ex, 'game', text, JSON.stringify(opts), JSON.stringify({}), diff, expl||null, 10, sort];
}

// ─── LESSON 128: Luyện tập chung (mixed practice 0-10) ───────────────────────
const L128: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(128,1,1,'easy','Số liền sau của 6 là số nào?',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'6'}],'B','Số liền sau của 6 là 7.'),
  sc(128,1,2,'easy','Số nào lớn hơn 4 và nhỏ hơn 6?',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'5'},{key:'D',text:'7'}],'C','5 > 4 và 5 < 6.'),
  sc(128,1,3,'easy','5 + 3 = ?',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'8'},{key:'D',text:'6'}],'C','5 + 3 = 8.'),
  sc(128,1,4,'easy','10 - 4 = ?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'4'}],'B','10 - 4 = 6.'),
  tf(128,1,5,'easy','3 < 5. Đúng hay sai?',true,'3 nhỏ hơn 5 là đúng.'),
  tf(128,1,6,'easy','7 + 2 = 10. Đúng hay sai?',false,'7 + 2 = 9, không phải 10.'),
  tf(128,1,7,'easy','Số 0 là số nhỏ nhất trong các số từ 0 đến 10. Đúng hay sai?',true,'0 là số nhỏ nhất trong dãy 0-10.'),
  fb(128,1,8,'easy','4 + [b1] = 9',[{key:'b1',text:''}],{b1:'5'},'4 + 5 = 9.'),
  fb(128,1,9,'easy','[b1] - 3 = 6',[{key:'b1',text:''}],{b1:'9'},'9 - 3 = 6.'),
  fb(128,1,10,'easy','8 - [b1] = 2',[{key:'b1',text:''}],{b1:'6'},'8 - 6 = 2.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(128,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎 Có mấy quả táo?','7','Đếm được 7 quả táo.'),
  ct(128,2,2,'easy','🐟🐟🐟🐟🐟 Có mấy con cá?','5','Đếm được 5 con cá.'),
  ct(128,2,3,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐ Có mấy ngôi sao?','9','Đếm được 9 ngôi sao.'),
  so(128,2,4,'easy','Sắp xếp các số theo thứ tự từ nhỏ đến lớn: 7, 2, 9, 4',[{key:'a',text:'7'},{key:'b',text:'2'},{key:'c',text:'9'},{key:'d',text:'4'}],['b','d','a','c'],'Thứ tự đúng: 2, 4, 7, 9.'),
  so(128,2,5,'easy','Sắp xếp từ lớn đến nhỏ: 1, 8, 5, 3',[{key:'a',text:'1'},{key:'b',text:'8'},{key:'c',text:'5'},{key:'d',text:'3'}],['b','c','d','a'],'Thứ tự đúng: 8, 5, 3, 1.'),
  so(128,2,6,'easy','Sắp xếp từ nhỏ đến lớn: 6, 0, 10, 3',[{key:'a',text:'6'},{key:'b',text:'0'},{key:'c',text:'10'},{key:'d',text:'3'}],['b','d','a','c'],'Thứ tự đúng: 0, 3, 6, 10.'),
  co(128,2,7,'easy','Gạch bỏ số lẻ trong nhóm: 2, 4, 5, 6, 8',[{key:'a',text:'2'},{key:'b',text:'4'},{key:'c',text:'5'},{key:'d',text:'6'},{key:'e',text:'8'}],['c'],'5 là số lẻ.'),
  co(128,2,8,'easy','Gạch bỏ số không thuộc dãy 0-5: 2, 4, 7, 3, 5',[{key:'a',text:'2'},{key:'b',text:'4'},{key:'c',text:'7'},{key:'d',text:'3'},{key:'e',text:'5'}],['c'],'7 không thuộc dãy 0-5.'),
  fb(128,2,9,'easy','Số liền trước của 8 là [b1]',[{key:'b1',text:''}],{b1:'7'},'Số liền trước 8 là 7.'),
  fb(128,2,10,'easy','Số liền sau của 9 là [b1]',[{key:'b1',text:''}],{b1:'10'},'Số liền sau 9 là 10.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(128,3,1,'easy','Tách số 8 thành: 8 = 5 + ?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'1'}],'B','8 = 5 + 3.'),
  sc(128,3,2,'easy','2 + 2 + 2 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}],'C','2 + 2 + 2 = 6.'),
  sc(128,3,3,'easy','Số nào bằng 7 - 0?',[{key:'A',text:'0'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'8'}],'C','7 - 0 = 7.'),
  sc(128,3,4,'easy','Số liền trước của 10 là số nào?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'},{key:'D',text:'11'}],'B','Số liền trước 10 là 9.'),
  tf(128,3,5,'easy','6 + 4 = 10. Đúng hay sai?',true,'6 + 4 = 10 là đúng.'),
  tf(128,3,6,'easy','9 > 10. Đúng hay sai?',false,'9 < 10, nên 9 > 10 là sai.'),
  tf(128,3,7,'easy','5 = 3 + 2. Đúng hay sai?',true,'3 + 2 = 5 là đúng.'),
  fb(128,3,8,'easy','7 = 4 + [b1]',[{key:'b1',text:''}],{b1:'3'},'7 = 4 + 3.'),
  fb(128,3,9,'easy','10 - [b1] = 7',[{key:'b1',text:''}],{b1:'3'},'10 - 3 = 7.'),
  ct(128,3,10,'easy','🌸🌸🌸🌸🌸🌸 Có mấy bông hoa?','6','Đếm được 6 bông hoa.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(128,4,1,'medium','Nam có 5 quyển sách, mua thêm 4 quyển. Nam có tất cả bao nhiêu quyển?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'},{key:'D',text:'7'}],'B','5 + 4 = 9 quyển.'),
  sc(128,4,2,'medium','Có 10 quả cam, ăn hết 3 quả. Còn lại bao nhiêu quả?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'7'},{key:'D',text:'5'}],'C','10 - 3 = 7 quả.'),
  sc(128,4,3,'medium','Số nào vừa lớn hơn 3 vừa nhỏ hơn 7?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'7'},{key:'D',text:'8'}],'B','5 > 3 và 5 < 7.'),
  mc(128,4,4,'medium','Các số nào nhỏ hơn 6?',[{key:'A',text:'2'},{key:'B',text:'6'},{key:'C',text:'4'},{key:'D',text:'8'},{key:'E',text:'1'}],['A','C','E'],'2, 4, 1 đều nhỏ hơn 6.'),
  mc(128,4,5,'medium','Các phép tính nào cho kết quả bằng 8?',[{key:'A',text:'5+3'},{key:'B',text:'4+4'},{key:'C',text:'9-1'},{key:'D',text:'6+3'}],['A','B','C'],'5+3=8, 4+4=8, 9-1=8.'),
  mc(128,4,6,'medium','Số nào là số chẵn trong dãy 0-10?',[{key:'A',text:'0'},{key:'B',text:'3'},{key:'C',text:'6'},{key:'D',text:'9'},{key:'E',text:'10'}],['A','C','E'],'0, 6, 10 là số chẵn.'),
  mt(128,4,7,'medium','Nối phép tính với kết quả đúng',[{key:'3+4',text:'3+4'},{key:'8-2',text:'8-2'},{key:'5+5',text:'5+5'},{key:'9-3',text:'9-3'}],{'3+4':'7','8-2':'6','5+5':'10','9-3':'6'}),
  mt(128,4,8,'medium','Ghép số với cách tách đúng',[{key:'7',text:'7'},{key:'9',text:'9'},{key:'6',text:'6'},{key:'10',text:'10'}],{'7':'3+4','9':'5+4','6':'2+4','10':'6+4'}),
  dd(128,4,9,'medium','Kéo số điền vào chỗ trống: 3 + ? = 10',[{key:'a',text:'7'},{key:'b',text:'6'},{key:'c',text:'8'},{key:'d',text:'5'}],['a'],'3 + 7 = 10.'),
  dd(128,4,10,'medium','Kéo số thích hợp: 8 - ? = 5',[{key:'a',text:'2'},{key:'b',text:'3'},{key:'c',text:'4'},{key:'d',text:'1'}],['b'],'8 - 3 = 5.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(128,5,1,'medium','Điền vào bảng: 4+?=10 và 6+?=10',[{key:'r1',text:'4+?=10'},{key:'r2',text:'6+?=10'}],{r1:'6',r2:'4'},'4+6=10, 6+4=10.'),
  tf2(128,5,2,'medium','Điền vào bảng phép trừ: 10-?=3 và 10-?=7',[{key:'r1',text:'10-?=3'},{key:'r2',text:'10-?=7'}],{r1:'7',r2:'3'},'10-7=3, 10-3=7.'),
  nl(128,5,3,'medium','Điền số còn thiếu trên tia số: 0, ?, 2, 3, ?, 5',[{key:'p1',text:'?'},{key:'p2',text:'?'}],{p1:'1',p2:'4'},'Dãy số tự nhiên 0,1,2,3,4,5.'),
  nl(128,5,4,'medium','Điền số còn thiếu: 5, ?, 7, ?, 9, 10',[{key:'p1',text:'?'},{key:'p2',text:'?'}],{p1:'6',p2:'8'},'Dãy số tự nhiên 5,6,7,8,9,10.'),
  pz(128,5,5,'medium','Câu đố: Tôi là số lớn hơn 6 nhưng nhỏ hơn 8. Tôi là số nào?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'9'}],'B','7 > 6 và 7 < 8.'),
  pz(128,5,6,'medium','Câu đố: 5 + ? = 5 + 3. Số ? là bao nhiêu?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'},{key:'D',text:'5'}],'C','5+3=8, nên ?=3.'),
  pz(128,5,7,'medium','Câu đố: Số nào cộng với 4 bằng 10?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'4'}],'B','6 + 4 = 10.'),
  mt(128,5,8,'medium','Nối phép tính bằng nhau',[{key:'2+5',text:'2+5'},{key:'6+1',text:'6+1'},{key:'3+3',text:'3+3'},{key:'4+2',text:'4+2'}],{'2+5':'6+1','3+3':'4+2'}),
  mt(128,5,9,'medium','Nối số với phép tính tương ứng',[{key:'8',text:'8'},{key:'5',text:'5'},{key:'9',text:'9'},{key:'6',text:'6'}],{'8':'10-2','5':'3+2','9':'4+5','6':'8-2'}),
  dd(128,5,10,'medium','Sắp xếp đúng: 4 + 5 = ?',[{key:'a',text:'8'},{key:'b',text:'9'},{key:'c',text:'10'},{key:'d',text:'7'}],['b'],'4 + 5 = 9.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(128,6,1,'hard','[b1] + 6 = 10. Tìm [b1].',[{key:'b1',text:''}],{b1:'4'},'4 + 6 = 10.'),
  fb(128,6,2,'hard','9 - [b1] = 4. Tìm [b1].',[{key:'b1',text:''}],{b1:'5'},'9 - 5 = 4.'),
  fb(128,6,3,'hard','[b1] + [b1] = 8. Tìm [b1].',[{key:'b1',text:''}],{b1:'4'},'4 + 4 = 8.'),
  pz(128,6,4,'hard','Bé An có 10 viên bi, cho bạn 3 viên. Bé An còn bao nhiêu viên bi?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'5'}],'B','10 - 3 = 7 viên bi.'),
  pz(128,6,5,'hard','Trên cành có 4 con chim, bay đến thêm 5 con. Có tất cả mấy con chim?',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'9'},{key:'D',text:'7'}],'C','4 + 5 = 9 con chim.'),
  pz(128,6,6,'hard','Câu đố: Số tôi bằng tổng của 3 và 5. Tôi là số mấy?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'},{key:'D',text:'6'}],'B','3 + 5 = 8.'),
  mc(128,6,7,'hard','Các phép tính nào có kết quả nhỏ hơn 5?',[{key:'A',text:'2+1'},{key:'B',text:'3+3'},{key:'C',text:'1+2'},{key:'D',text:'0+4'},{key:'E',text:'5+1'}],['A','C','D'],'2+1=3, 1+2=3, 0+4=4 đều < 5.'),
  mc(128,6,8,'hard','Phép tính nào có kết quả bằng 10?',[{key:'A',text:'5+5'},{key:'B',text:'6+4'},{key:'C',text:'7+4'},{key:'D',text:'3+7'}],['A','B','D'],'5+5=10, 6+4=10, 3+7=10.'),
  so(128,6,9,'hard','Sắp xếp kết quả từ nhỏ đến lớn: 3+5, 2+2, 6+4, 1+3',[{key:'a',text:'3+5'},{key:'b',text:'2+2'},{key:'c',text:'6+4'},{key:'d',text:'1+3'}],['b','d','a','c'],'2+2=4, 1+3=4, 3+5=8, 6+4=10. Thứ tự: b,d,a,c.'),
  so(128,6,10,'hard','Sắp xếp từ lớn đến nhỏ: 9-2, 5+3, 10-1, 4+2',[{key:'a',text:'9-2'},{key:'b',text:'5+3'},{key:'c',text:'10-1'},{key:'d',text:'4+2'}],['c','a','b','d'],'10-1=9, 9-2=7, 5+3=8, 4+2=6. Thứ tự giảm: 9,8,7,6 => c,b,a,d.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(128,7,1,'hard','Ghép đôi phép tính có cùng kết quả',[{key:'1+4',text:'1+4',pair:'5'},{key:'2+3',text:'2+3',pair:'5'},{key:'7-1',text:'7-1',pair:'6'},{key:'4+2',text:'4+2',pair:'6'},{key:'3+7',text:'3+7',pair:'10'},{key:'10-0',text:'10-0',pair:'10'}],'Ghép các phép tính có cùng kết quả.'),
  gm(128,7,2,'hard','Ghép số với phép tính tương ứng',[{key:'n7',text:'7',pair:'7'},{key:'3+4',text:'3+4',pair:'7'},{key:'n9',text:'9',pair:'9'},{key:'5+4',text:'5+4',pair:'9'},{key:'n6',text:'6',pair:'6'},{key:'8-2',text:'8-2',pair:'6'}],'Ghép số với phép tính cho ra số đó.'),
  mt(128,7,3,'hard','Nối phép cộng với phép trừ tương đương',[{key:'3+4',text:'3+4'},{key:'5+2',text:'5+2'},{key:'4+6',text:'4+6'},{key:'2+8',text:'2+8'}],{'3+4':'7','5+2':'7','4+6':'10','2+8':'10'}),
  mt(128,7,4,'hard','Nối số với hai cách tách',[{key:'6a',text:'6=?+?'},{key:'8a',text:'8=?+?'},{key:'10a',text:'10=?+?'}],{'6a':'2+4','8a':'3+5','10a':'4+6'}),
  mt(128,7,5,'hard','Nối bài toán với phép tính',[{key:'q1',text:'5 bút + 3 bút'},{key:'q2',text:'9 kẹo - 4 kẹo'},{key:'q3',text:'6 chim + 2 chim'}],{'q1':'5+3=8','q2':'9-4=5','q3':'6+2=8'}),
  fb(128,7,6,'hard','Tìm hai số có tổng bằng 7 và hiệu bằng 1: số lớn là [b1], số nhỏ là [b2]',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'3'},'4+3=7, 4-3=1.'),
  fb(128,7,7,'hard','5 + [b1] = 3 + [b2], nếu [b1]=2 thì [b2]=?',[{key:'b2',text:''}],{b2:'4'},'5+2=7, 3+4=7.'),
  fb(128,7,8,'hard','Tổng của 3 số 2+3+[b1]=9. Tìm [b1].',[{key:'b1',text:''}],{b1:'4'},'2+3=5, 5+4=9.'),
  dd(128,7,9,'hard','Kéo thả để hoàn thành: ? + 3 + 2 = 10',[{key:'a',text:'4'},{key:'b',text:'5'},{key:'c',text:'6'},{key:'d',text:'3'}],['b'],'5 + 3 + 2 = 10.'),
  dd(128,7,10,'hard','Kéo số đúng: 10 - ? - 3 = 4',[{key:'a',text:'2'},{key:'b',text:'3'},{key:'c',text:'4'},{key:'d',text:'1'}],['b'],'10 - 3 - 3 = 4.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(128,8,1,'hard','Số nào vừa là số lẻ vừa lớn hơn 5?',[{key:'A',text:'4'},{key:'B',text:'7'},{key:'C',text:'9'},{key:'D',text:'6'},{key:'E',text:'3'}],['B','C'],'7 và 9 là số lẻ và > 5.'),
  mc(128,8,2,'hard','Phép tính nào bằng 6?',[{key:'A',text:'10-4'},{key:'B',text:'3+3'},{key:'C',text:'8-3'},{key:'D',text:'4+2'}],['A','B','D'],'10-4=6, 3+3=6, 4+2=6.'),
  mc(128,8,3,'hard','Chọn tất cả cách tách số 10:',[{key:'A',text:'5+5'},{key:'B',text:'6+4'},{key:'C',text:'3+8'},{key:'D',text:'7+3'},{key:'E',text:'2+8'}],['A','B','D','E'],'5+5=10, 6+4=10, 7+3=10, 2+8=10.'),
  pz(128,8,4,'hard','Lớp học có 10 học sinh, 4 bạn về nhà. Hỏi còn lại mấy bạn?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'4'}],'B','10 - 4 = 6 bạn.'),
  pz(128,8,5,'hard','Bé có 3 bông hoa đỏ và 4 bông hoa vàng. Hỏi có tất cả mấy bông hoa?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'5'}],'B','3 + 4 = 7 bông hoa.'),
  pz(128,8,6,'hard','Tổng của số liền trước 5 và số liền sau 5 bằng bao nhiêu?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'},{key:'D',text:'8'}],'B','4 + 6 = 10.'),
  so(128,8,7,'hard','Sắp xếp phép tính theo kết quả tăng dần: 4+1, 2+6, 3+3, 5+4',[{key:'a',text:'4+1'},{key:'b',text:'2+6'},{key:'c',text:'3+3'},{key:'d',text:'5+4'}],['a','c','b','d'],'5,6,8,9 => a,c,b,d.'),
  so(128,8,8,'hard','Sắp xếp phép tính theo kết quả giảm dần: 8-1, 10-5, 9-3, 7-2',[{key:'a',text:'8-1'},{key:'b',text:'10-5'},{key:'c',text:'9-3'},{key:'d',text:'7-2'}],['c','a','d','b'],'6,5,7,5 => 7,6,5,5 => c,a,d,b.'),
  co(128,8,9,'hard','Gạch bỏ phép tính sai: 3+4=7, 5+6=10, 8-2=6, 9-4=4',[{key:'a',text:'3+4=7'},{key:'b',text:'5+6=10'},{key:'c',text:'8-2=6'},{key:'d',text:'9-4=4'}],['b','d'],'5+6=11 (không phải 10), 9-4=5 (không phải 4).'),
  co(128,8,10,'hard','Gạch bỏ số không phù hợp: 2+?=8, điền: 6, 5, 7, 4',[{key:'a',text:'6'},{key:'b',text:'5'},{key:'c',text:'7'},{key:'d',text:'4'}],['b','c','d'],'2+6=8 là đúng, các số khác sai.'),
];

// ─── LESSON 129: Hình vuông, hình tròn, hình tam giác, hình chữ nhật ───────────────────────
const L129: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(129,1,1,'easy','Hình nào có 4 cạnh bằng nhau?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],'C','Hình vuông có 4 cạnh bằng nhau.'),
  sc(129,1,2,'easy','Hình tam giác có mấy góc?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'}],'B','Hình tam giác có 3 góc.'),
  sc(129,1,3,'easy','Hình nào không có cạnh thẳng?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],'B','Hình tròn không có cạnh thẳng.'),
  sc(129,1,4,'easy','Hình chữ nhật có mấy cạnh?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'},{key:'D',text:'6'}],'C','Hình chữ nhật có 4 cạnh.'),
  tf(129,1,5,'easy','Hình vuông có 4 cạnh. Đúng hay sai?',true,'Hình vuông có 4 cạnh bằng nhau.'),
  tf(129,1,6,'easy','Hình tròn có 3 cạnh. Đúng hay sai?',false,'Hình tròn không có cạnh thẳng nào.'),
  tf(129,1,7,'easy','Hình tam giác có 3 đỉnh. Đúng hay sai?',true,'Hình tam giác có 3 đỉnh và 3 cạnh.'),
  fb(129,1,8,'easy','Hình vuông có [b1] cạnh và [b2] góc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'4'},'Hình vuông có 4 cạnh và 4 góc.'),
  fb(129,1,9,'easy','Hình tam giác có [b1] cạnh.',[{key:'b1',text:''}],{b1:'3'},'Hình tam giác có 3 cạnh.'),
  fb(129,1,10,'easy','Hình [b1] không có cạnh thẳng.',[{key:'b1',text:''}],{b1:'tròn'},'Hình tròn không có cạnh thẳng.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(129,2,1,'easy','🔺🔺🔺🔺🔺 Có mấy hình tam giác?','5','Đếm được 5 hình tam giác.'),
  ct(129,2,2,'easy','⬛⬛⬛⬛⬛⬛ Có mấy hình vuông?','6','Đếm được 6 hình vuông.'),
  ct(129,2,3,'easy','⭕⭕⭕⭕⭕⭕⭕⭕ Có mấy hình tròn?','8','Đếm được 8 hình tròn.'),
  so(129,2,4,'easy','Sắp xếp hình theo số cạnh tăng dần: hình tròn, hình tam giác, hình vuông, hình chữ nhật',[{key:'a',text:'Hình tròn (0 cạnh)'},{key:'b',text:'Hình tam giác (3 cạnh)'},{key:'c',text:'Hình vuông (4 cạnh)'},{key:'d',text:'Hình chữ nhật (4 cạnh)'}],['a','b','c','d'],'0 cạnh, 3 cạnh, 4 cạnh, 4 cạnh.'),
  so(129,2,5,'easy','Sắp xếp hình theo số góc tăng dần: hình vuông, hình tam giác, hình tròn',[{key:'a',text:'Hình vuông (4 góc)'},{key:'b',text:'Hình tam giác (3 góc)'},{key:'c',text:'Hình tròn (0 góc)'}],['c','b','a'],'0, 3, 4 góc.'),
  so(129,2,6,'easy','Xếp theo thứ tự tên: hình tròn, hình chữ nhật, hình tam giác, hình vuông',[{key:'a',text:'Hình tròn'},{key:'b',text:'Hình chữ nhật'},{key:'c',text:'Hình tam giác'},{key:'d',text:'Hình vuông'}],['b','c','a','d'],'Chữ nhật, tam giác, tròn, vuông theo thứ tự.'),
  co(129,2,7,'easy','Gạch bỏ hình KHÔNG có góc: hình vuông, hình tròn, hình tam giác, hình chữ nhật',[{key:'a',text:'Hình vuông'},{key:'b',text:'Hình tròn'},{key:'c',text:'Hình tam giác'},{key:'d',text:'Hình chữ nhật'}],['b'],'Hình tròn không có góc.'),
  co(129,2,8,'easy','Gạch bỏ hình có số cạnh khác các hình còn lại: hình vuông, hình tròn, hình chữ nhật',[{key:'a',text:'Hình vuông (4)'},{key:'b',text:'Hình tròn (0)'},{key:'c',text:'Hình chữ nhật (4)'}],['b'],'Hình tròn không có cạnh, khác với hai hình kia.'),
  fb(129,2,9,'easy','Hình chữ nhật có [b1] cạnh dài và [b2] cạnh ngắn.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'2',b2:'2'},'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.'),
  fb(129,2,10,'easy','Hình vuông có tất cả các cạnh [b1] nhau.',[{key:'b1',text:''}],{b1:'bằng'},'Hình vuông có tất cả 4 cạnh bằng nhau.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(129,3,1,'easy','Vật nào có dạng hình tròn?',[{key:'A',text:'Quyển sách'},{key:'B',text:'Đồng hồ'},{key:'C',text:'Tờ giấy'},{key:'D',text:'Cái thước'}],'B','Đồng hồ có dạng hình tròn.'),
  sc(129,3,2,'easy','Hình nào có 3 cạnh?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],'D','Hình tam giác có 3 cạnh.'),
  sc(129,3,3,'easy','Tờ giấy thường có dạng hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình vuông'}],'C','Tờ giấy thường có dạng hình chữ nhật.'),
  sc(129,3,4,'easy','Hình nào có 4 cạnh bằng nhau và 4 góc vuông?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình tròn'}],'B','Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.'),
  tf(129,3,5,'easy','Hình chữ nhật và hình vuông đều có 4 cạnh. Đúng hay sai?',true,'Cả hai đều có 4 cạnh.'),
  tf(129,3,6,'easy','Hình tam giác có 4 đỉnh. Đúng hay sai?',false,'Hình tam giác chỉ có 3 đỉnh.'),
  tf(129,3,7,'easy','Hình tròn là hình có đường cong khép kín. Đúng hay sai?',true,'Hình tròn có đường cong khép kín.'),
  fb(129,3,8,'easy','Hình tam giác có [b1] cạnh và [b2] đỉnh.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'3',b2:'3'},'Hình tam giác có 3 cạnh và 3 đỉnh.'),
  fb(129,3,9,'easy','Hình có 4 cạnh bằng nhau là hình [b1].',[{key:'b1',text:''}],{b1:'vuông'},'Hình vuông có 4 cạnh bằng nhau.'),
  ct(129,3,10,'easy','🔺🔺⬛🔺⬛⬛🔺 Có mấy hình tam giác?','4','Có 4 hình tam giác trong dãy.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(129,4,1,'medium','Hình nào KHÔNG phải là tứ giác?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình thoi'}],'B','Hình tam giác có 3 cạnh, không phải tứ giác.'),
  sc(129,4,2,'medium','Một miếng bánh pizza hình tam giác có mấy cạnh?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'},{key:'D',text:'5'}],'C','Hình tam giác có 3 cạnh.'),
  sc(129,4,3,'medium','Điểm khác nhau giữa hình vuông và hình chữ nhật là gì?',[{key:'A',text:'Số cạnh'},{key:'B',text:'Số góc'},{key:'C',text:'Độ dài các cạnh'},{key:'D',text:'Số đỉnh'}],'C','Hình vuông có 4 cạnh bằng nhau, hình chữ nhật có 2 cặp cạnh bằng nhau.'),
  mc(129,4,4,'medium','Hình nào có góc?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],['B','C','D'],'Hình vuông, tam giác, chữ nhật đều có góc.'),
  mc(129,4,5,'medium','Hình nào có 4 cạnh?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật'}],['B','D'],'Hình vuông và hình chữ nhật đều có 4 cạnh.'),
  mc(129,4,6,'medium','Chọn những vật có dạng hình tròn:',[{key:'A',text:'Bánh xe'},{key:'B',text:'Quyển vở'},{key:'C',text:'Đồng xu'},{key:'D',text:'Cái khung cửa'},{key:'E',text:'Mặt đồng hồ'}],['A','C','E'],'Bánh xe, đồng xu, mặt đồng hồ đều có dạng hình tròn.'),
  mt(129,4,7,'medium','Nối hình với số cạnh',[{key:'Hình vuông',text:'Hình vuông'},{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình tròn',text:'Hình tròn'},{key:'Hình chữ nhật',text:'Hình chữ nhật'}],{'Hình vuông':'4','Hình tam giác':'3','Hình tròn':'0','Hình chữ nhật':'4'}),
  mt(129,4,8,'medium','Nối hình với số góc',[{key:'Hình vuông',text:'Hình vuông'},{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình tròn',text:'Hình tròn'}],{'Hình vuông':'4 góc','Hình tam giác':'3 góc','Hình tròn':'0 góc'}),
  dd(129,4,9,'medium','Kéo tên hình vào ô đúng: hình có 3 cạnh là...',[{key:'a',text:'Hình tròn'},{key:'b',text:'Hình tam giác'},{key:'c',text:'Hình vuông'},{key:'d',text:'Hình chữ nhật'}],['b'],'Hình tam giác có 3 cạnh.'),
  dd(129,4,10,'medium','Kéo tên hình: hình không có cạnh thẳng là...',[{key:'a',text:'Hình vuông'},{key:'b',text:'Hình chữ nhật'},{key:'c',text:'Hình tròn'},{key:'d',text:'Hình tam giác'}],['c'],'Hình tròn không có cạnh thẳng.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(129,5,1,'medium','Điền vào bảng số cạnh và số góc của các hình',[{key:'vuong',text:'Hình vuông: cạnh=?, góc=?'},{key:'tamgiac',text:'Hình tam giác: cạnh=?, góc=?'},{key:'tron',text:'Hình tròn: cạnh=?, góc=?'}],{vuong:'4,4',tamgiac:'3,3',tron:'0,0'},'Hình vuông: 4 cạnh 4 góc; Tam giác: 3 cạnh 3 góc; Tròn: 0 cạnh 0 góc.'),
  tf2(129,5,2,'medium','Điền đặc điểm của hình chữ nhật',[{key:'canh',text:'Số cạnh'},{key:'goc',text:'Số góc'},{key:'dac',text:'Đặc điểm cạnh'}],{canh:'4',goc:'4',dac:'2 cặp cạnh bằng nhau'},'Hình chữ nhật: 4 cạnh, 4 góc, 2 cặp cạnh bằng nhau.'),
  nl(129,5,3,'medium','Đếm hình và điền số: có ? hình vuông và ? hình tròn trong bộ sưu tập 10 hình',[{key:'vuong',text:'Số hình vuông'},{key:'tron',text:'Số hình tròn'}],{vuong:'4',tron:'6'},'Ví dụ: 4 hình vuông và 6 hình tròn, tổng = 10.'),
  nl(129,5,4,'medium','Điền số lượng: ? hình tam giác + ? hình chữ nhật = 8 hình',[{key:'tg',text:'Hình tam giác'},{key:'cn',text:'Hình chữ nhật'}],{tg:'3',cn:'5'},'3 + 5 = 8 hình.'),
  pz(129,5,5,'medium','Câu đố: Tôi có 3 cạnh và 3 góc. Tôi là hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],'C','Hình tam giác có 3 cạnh và 3 góc.'),
  pz(129,5,6,'medium','Câu đố: Tôi có 4 cạnh bằng nhau. Tôi là hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình tam giác'}],'C','Hình vuông có 4 cạnh bằng nhau.'),
  pz(129,5,7,'medium','Hình nào có thể lăn được vì không có góc nhọn?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật'}],'C','Hình tròn có thể lăn vì không có cạnh và góc.'),
  mt(129,5,8,'medium','Nối hình với vật thật tương ứng',[{key:'Hình tròn',text:'Hình tròn'},{key:'Hình vuông',text:'Hình vuông'},{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình chữ nhật',text:'Hình chữ nhật'}],{'Hình tròn':'Bánh xe','Hình vuông':'Khăn tay','Hình tam giác':'Biển báo','Hình chữ nhật':'Cửa sổ'}),
  mt(129,5,9,'medium','Ghép hình với mô tả',[{key:'4 canh bang',text:'4 cạnh bằng nhau'},{key:'3 canh',text:'3 cạnh'},{key:'0 canh',text:'Không có cạnh'},{key:'4 canh khac',text:'2 cặp cạnh bằng nhau'}],{'4 canh bang':'Hình vuông','3 canh':'Hình tam giác','0 canh':'Hình tròn','4 canh khac':'Hình chữ nhật'}),
  dd(129,5,10,'medium','Kéo tên hình phù hợp: Khung ảnh có dạng hình...',[{key:'a',text:'Hình tròn'},{key:'b',text:'Hình tam giác'},{key:'c',text:'Hình chữ nhật'},{key:'d',text:'Hình vuông'}],['c'],'Khung ảnh thường có dạng hình chữ nhật.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(129,6,1,'hard','Hình có [b1] cạnh bằng nhau và [b2] góc vuông được gọi là hình vuông.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'4'},'Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.'),
  fb(129,6,2,'hard','Tổng số cạnh của 1 hình tam giác và 1 hình vuông là [b1] cạnh.',[{key:'b1',text:''}],{b1:'7'},'3 + 4 = 7 cạnh.'),
  fb(129,6,3,'hard','Có 2 hình tam giác và 1 hình chữ nhật. Tổng số góc là [b1].',[{key:'b1',text:''}],{b1:'10'},'2×3 + 4 = 10 góc.'),
  pz(129,6,4,'hard','Ghép 2 hình tam giác lại có thể tạo thành hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông hoặc hình chữ nhật'},{key:'C',text:'Hình ngũ giác'},{key:'D',text:'Hình thang'}],'B','Ghép 2 tam giác vuông cân tạo được hình vuông hoặc hình chữ nhật.'),
  pz(129,6,5,'hard','Một tờ giấy hình chữ nhật gấp đôi theo chiều ngang tạo ra hình gì?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông hoặc hình chữ nhật nhỏ hơn'},{key:'D',text:'Hình thoi'}],'C','Gấp đôi tờ giấy chữ nhật tạo ra hình chữ nhật nhỏ hơn.'),
  pz(129,6,6,'hard','Trong lớp có 3 hình vuông và 4 hình tam giác. Tổng số cạnh là bao nhiêu?',[{key:'A',text:'21'},{key:'B',text:'24'},{key:'C',text:'20'},{key:'D',text:'18'}],'B','3×4 + 4×3 = 12 + 12 = 24 cạnh.'),
  mc(129,6,7,'hard','Hình nào có thể được tạo từ 4 hình tam giác ghép lại?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông lớn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình lục giác'}],['B','C'],'4 tam giác có thể ghép thành hình vuông hoặc hình chữ nhật.'),
  mc(129,6,8,'hard','Chọn những mô tả đúng về hình chữ nhật:',[{key:'A',text:'Có 4 cạnh'},{key:'B',text:'Có 4 góc'},{key:'C',text:'Tất cả cạnh bằng nhau'},{key:'D',text:'Có 2 cặp cạnh song song'}],['A','B','D'],'Hình chữ nhật có 4 cạnh, 4 góc và 2 cặp cạnh song song.'),
  so(129,6,9,'hard','Sắp xếp hình theo số cạnh từ ít đến nhiều: hình vuông, hình tròn, hình tam giác',[{key:'a',text:'Hình vuông'},{key:'b',text:'Hình tròn'},{key:'c',text:'Hình tam giác'}],['b','c','a'],'0, 3, 4 cạnh.'),
  so(129,6,10,'hard','Sắp xếp theo số góc giảm dần: hình chữ nhật, hình tròn, hình tam giác, hình vuông',[{key:'a',text:'Hình chữ nhật (4)'},{key:'b',text:'Hình tròn (0)'},{key:'c',text:'Hình tam giác (3)'},{key:'d',text:'Hình vuông (4)'}],['a','d','c','b'],'4, 4, 3, 0 góc.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(129,7,1,'hard','Ghép tên hình với số cạnh tương ứng',[{key:'vuong',text:'Hình vuông',pair:'4'},{key:'4a',text:'4',pair:'4'},{key:'tamgiac',text:'Hình tam giác',pair:'3'},{key:'3a',text:'3',pair:'3'},{key:'tron',text:'Hình tròn',pair:'0'},{key:'0a',text:'0',pair:'0'}],'Ghép hình với số cạnh tương ứng.'),
  gm(129,7,2,'hard','Ghép tên hình với hình ảnh thực tế',[{key:'vuong',text:'Hình vuông',pair:'square'},{key:'khan',text:'Khăn tay',pair:'square'},{key:'tron',text:'Hình tròn',pair:'circle'},{key:'banh',text:'Bánh xe',pair:'circle'},{key:'cn',text:'Hình chữ nhật',pair:'rectangle'},{key:'cuaso',text:'Cửa sổ',pair:'rectangle'}],'Ghép hình với vật thực tế.'),
  mt(129,7,3,'hard','Nối hình với đặc điểm nổi bật',[{key:'Hình tròn',text:'Hình tròn'},{key:'Hình vuông',text:'Hình vuông'},{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình chữ nhật',text:'Hình chữ nhật'}],{'Hình tròn':'Không có cạnh','Hình vuông':'4 cạnh bằng nhau','Hình tam giác':'3 đỉnh','Hình chữ nhật':'2 cặp cạnh bằng nhau'}),
  mt(129,7,4,'hard','Nối bài toán với câu trả lời',[{key:'q1',text:'2 hình vuông có bao nhiêu cạnh?'},{key:'q2',text:'3 hình tam giác có bao nhiêu góc?'},{key:'q3',text:'1 hình chữ nhật có bao nhiêu đỉnh?'}],{'q1':'8 cạnh','q2':'9 góc','q3':'4 đỉnh'}),
  mt(129,7,5,'hard','Ghép hình với số đỉnh',[{key:'Hình tam giác',text:'Hình tam giác'},{key:'Hình vuông',text:'Hình vuông'},{key:'Hình chữ nhật',text:'Hình chữ nhật'},{key:'Hình tròn',text:'Hình tròn'}],{'Hình tam giác':'3','Hình vuông':'4','Hình chữ nhật':'4','Hình tròn':'0'}),
  fb(129,7,6,'hard','Có 3 hình tam giác. Tổng số cạnh là [b1].',[{key:'b1',text:''}],{b1:'9'},'3 × 3 = 9 cạnh.'),
  fb(129,7,7,'hard','Có 2 hình vuông và 2 hình tròn. Tổng số góc là [b1].',[{key:'b1',text:''}],{b1:'8'},'2×4 + 2×0 = 8 góc.'),
  fb(129,7,8,'hard','Hình chữ nhật có [b1] cặp cạnh bằng nhau và [b2] cặp cạnh song song.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'2',b2:'2'},'Hình chữ nhật có 2 cặp cạnh bằng nhau và song song.'),
  dd(129,7,9,'hard','Kéo hình đúng: hình có số cạnh nhiều hơn hình tam giác là...',[{key:'a',text:'Hình tròn'},{key:'b',text:'Hình vuông'},{key:'c',text:'Hình tam giác lớn hơn'},{key:'d',text:'Nửa hình tròn'}],['b'],'Hình vuông có 4 cạnh > 3 cạnh của tam giác.'),
  dd(129,7,10,'hard','Kéo đáp án đúng: 1 hình vuông và 1 hình tam giác có tổng mấy cạnh?',[{key:'a',text:'5'},{key:'b',text:'6'},{key:'c',text:'7'},{key:'d',text:'8'}],['c'],'4 + 3 = 7 cạnh.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(129,8,1,'hard','Chọn những hình có số cạnh là số chẵn:',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Hình tam giác (3)'},{key:'C',text:'Hình vuông (4)'},{key:'D',text:'Hình chữ nhật (4)'}],['A','C','D'],'0, 4, 4 là số chẵn.'),
  mc(129,8,2,'hard','Hình nào có số góc bằng số cạnh?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['B','C','D'],'Hình có cạnh thẳng đều có số góc = số cạnh.'),
  mc(129,8,3,'hard','Các câu nào đúng về hình vuông?',[{key:'A',text:'Có 4 cạnh bằng nhau'},{key:'B',text:'Có 3 góc'},{key:'C',text:'Là hình chữ nhật đặc biệt'},{key:'D',text:'Có 4 góc vuông'}],['A','C','D'],'Hình vuông có 4 cạnh bằng nhau, 4 góc vuông và là hình chữ nhật đặc biệt.'),
  pz(129,8,4,'hard','Xếp 4 hình tam giác có thể tạo thành hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình ngũ giác'},{key:'C',text:'Hình vuông lớn'},{key:'D',text:'Hình thang'}],'C','4 tam giác vuông cân có thể ghép thành hình vuông lớn.'),
  pz(129,8,5,'hard','Bạn cắt một hình chữ nhật theo đường chéo. Được 2 hình gì?',[{key:'A',text:'2 hình vuông'},{key:'B',text:'2 hình tam giác'},{key:'C',text:'2 hình tròn'},{key:'D',text:'1 hình vuông và 1 hình tam giác'}],'B','Cắt theo đường chéo tạo ra 2 hình tam giác.'),
  pz(129,8,6,'hard','Trong tranh có 5 hình tròn, 3 hình vuông, 2 hình tam giác. Tổng số cạnh là bao nhiêu?',[{key:'A',text:'17'},{key:'B',text:'18'},{key:'C',text:'20'},{key:'D',text:'22'}],'B','5×0 + 3×4 + 2×3 = 0 + 12 + 6 = 18 cạnh.'),
  so(129,8,7,'hard','Sắp xếp theo tổng số cạnh tăng dần: 2 hình tròn, 2 hình tam giác, 1 hình vuông, 2 hình vuông',[{key:'a',text:'2 hình tròn (0)'},{key:'b',text:'2 hình tam giác (6)'},{key:'c',text:'1 hình vuông (4)'},{key:'d',text:'2 hình vuông (8)'}],['a','c','b','d'],'0, 4, 6, 8 cạnh.'),
  so(129,8,8,'hard','Sắp xếp theo số góc giảm dần: 1 hình chữ nhật, 1 hình tròn, 2 hình tam giác, 1 hình vuông',[{key:'a',text:'1 hình chữ nhật (4 góc)'},{key:'b',text:'1 hình tròn (0 góc)'},{key:'c',text:'2 hình tam giác (6 góc)'},{key:'d',text:'1 hình vuông (4 góc)'}],['c','a','d','b'],'6, 4, 4, 0 góc.'),
  co(129,8,9,'hard','Gạch bỏ mô tả SAI về hình tròn: "Hình tròn có 0 cạnh", "Hình tròn có đường cong", "Hình tròn có 3 góc", "Hình tròn có thể lăn"',[{key:'a',text:'Hình tròn có 0 cạnh'},{key:'b',text:'Hình tròn có đường cong'},{key:'c',text:'Hình tròn có 3 góc'},{key:'d',text:'Hình tròn có thể lăn'}],['c'],'Hình tròn không có góc.'),
  co(129,8,10,'hard','Gạch bỏ hình không thể ghép với hình tam giác để tạo hình chữ nhật: hình vuông, hình tròn, hình tam giác, hình thoi',[{key:'a',text:'Hình vuông'},{key:'b',text:'Hình tròn'},{key:'c',text:'Hình tam giác'},{key:'d',text:'Hình thoi'}],['b'],'Hình tròn không thể ghép với tam giác thành chữ nhật.'),
];

async function main() {
  await ds.initialize();
  const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

  for (const [lessonId, rows] of [[128, L128], [129, L129]] as [number, Row[]][]) {
    await ds.query(`DELETE FROM quizzes WHERE lessonId = ?`, [lessonId]);
    for (const row of rows) {
      await ds.query(SQL, row);
    }
    console.log(`✅ lessonId: ${lessonId}: ${rows.length}`);
  }

  await ds.destroy();
}

main().catch(e => { console.error(e); process.exit(1); });
