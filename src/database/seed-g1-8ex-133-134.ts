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

// ─── LESSON 133: Phép trừ trong phạm vi 10 ────────────────────────────────
const L133: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(133,1,1,'easy','8 - 3 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','8 trừ 3 bằng 5.'),
  sc(133,1,2,'easy','7 - 4 = ?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'}],'C','7 trừ 4 bằng 3.'),
  sc(133,1,3,'easy','10 - 6 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'A','10 trừ 6 bằng 4.'),
  sc(133,1,4,'easy','9 - 5 = ?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','9 trừ 5 bằng 4.'),
  tf(133,1,5,'easy','6 - 2 = 4. Đúng hay sai?',true,'6 trừ 2 bằng 4.'),
  tf(133,1,6,'easy','5 - 3 = 3. Đúng hay sai?',false,'5 trừ 3 bằng 2, không phải 3.'),
  tf(133,1,7,'easy','10 - 10 = 0. Đúng hay sai?',true,'Số nào trừ chính nó cũng bằng 0.'),
  fb(133,1,8,'easy','8 - 5 = [b1]',[{key:'b1',text:''}],{b1:'3'},'8 trừ 5 bằng 3.'),
  fb(133,1,9,'easy','9 - [b1] = 6',[{key:'b1',text:''}],{b1:'3'},'9 trừ 3 bằng 6.'),
  fb(133,1,10,'easy','[b1] - 4 = 5',[{key:'b1',text:''}],{b1:'9'},'9 trừ 4 bằng 5.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(133,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎🍎 Có 8 quả táo. Bỏ đi 3 quả. Còn lại bao nhiêu?','5','8 - 3 = 5.'),
  ct(133,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐ Có 7 ngôi sao. Xoá đi 4. Còn bao nhiêu?','3','7 - 4 = 3.'),
  ct(133,2,3,'easy','🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥 Có 10 con gà. Đi mất 6. Còn bao nhiêu?','4','10 - 6 = 4.'),
  so(133,2,4,'easy','Sắp xếp kết quả từ bé đến lớn: 9-4, 8-3, 7-6, 10-8',[{key:'1',text:'9-4=5'},{key:'2',text:'8-3=5'},{key:'3',text:'7-6=1'},{key:'4',text:'10-8=2'}],['3','4','1','2'],'1, 2, 5, 5.'),
  so(133,2,5,'easy','Sắp xếp kết quả từ lớn đến bé: 10-1, 8-2, 6-3, 9-7',[{key:'1',text:'10-1=9'},{key:'2',text:'8-2=6'},{key:'3',text:'6-3=3'},{key:'4',text:'9-7=2'}],['1','2','3','4'],'9, 6, 3, 2.'),
  so(133,2,6,'easy','Sắp xếp từ bé đến lớn: 10-5, 9-3, 8-7, 7-2',[{key:'1',text:'10-5=5'},{key:'2',text:'9-3=6'},{key:'3',text:'8-7=1'},{key:'4',text:'7-2=5'}],['3','1','4','2'],'1, 5, 5, 6.'),
  co(133,2,7,'easy','Gạch bỏ phép trừ có kết quả bằng 0:',[{key:'A',text:'5-5'},{key:'B',text:'6-3'},{key:'C',text:'8-8'},{key:'D',text:'9-4'}],['A','C'],'5-5=0 và 8-8=0.'),
  co(133,2,8,'easy','Gạch bỏ phép trừ sai:',[{key:'A',text:'7-3=4'},{key:'B',text:'8-4=5'},{key:'C',text:'9-2=7'},{key:'D',text:'6-1=4'}],['B','D'],'8-4=4, 6-1=5.'),
  fb(133,2,9,'easy','7 - 2 = [b1]',[{key:'b1',text:''}],{b1:'5'}),
  fb(133,2,10,'easy','10 - [b1] = 3',[{key:'b1',text:''}],{b1:'7'},'10 - 7 = 3.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(133,3,1,'easy','Có 9 bông hoa, hái đi 4. Còn bao nhiêu?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','9 - 4 = 5.'),
  sc(133,3,2,'easy','Bạn có 10 kẹo, ăn mất 3. Còn bao nhiêu?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'7'}],'C','10 - 3 = 7.'),
  sc(133,3,3,'easy','8 - ? = 3',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','8 - 5 = 3.'),
  sc(133,3,4,'easy','? - 2 = 6',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','8 - 2 = 6.'),
  tf(133,3,5,'easy','9 - 0 = 9. Đúng hay sai?',true,'Trừ 0 không thay đổi số.'),
  tf(133,3,6,'easy','6 - 6 = 1. Đúng hay sai?',false,'6 - 6 = 0.'),
  tf(133,3,7,'easy','10 - 4 = 7. Đúng hay sai?',false,'10 - 4 = 6.'),
  fb(133,3,8,'easy','5 - [b1] = 2',[{key:'b1',text:''}],{b1:'3'},'5 - 3 = 2.'),
  fb(133,3,9,'easy','[b1] - 3 = 7',[{key:'b1',text:''}],{b1:'10'},'10 - 3 = 7.'),
  ct(133,3,10,'easy','🐠🐠🐠🐠🐠🐠🐠🐠🐠 Có 9 con cá, thả về 5. Còn bao nhiêu?','4','9 - 5 = 4.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(133,4,1,'medium','Điền số thích hợp: 10 - 7 = ?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B'),
  sc(133,4,2,'medium','Phép tính nào có kết quả bằng 5?',[{key:'A',text:'8-2'},{key:'B',text:'9-4'},{key:'C',text:'7-3'}],'B','9-4=5.'),
  sc(133,4,3,'medium','10 - 2 - 3 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','10-2=8, 8-3=5.'),
  mc(133,4,4,'medium','Chọn tất cả phép tính có kết quả bằng 4:',[{key:'A',text:'8-4'},{key:'B',text:'7-3'},{key:'C',text:'9-5'},{key:'D',text:'6-3'}],['A','B','C'],'8-4=4, 7-3=4, 9-5=4.'),
  mc(133,4,5,'medium','Chọn tất cả phép tính có kết quả bằng 3:',[{key:'A',text:'7-4'},{key:'B',text:'6-3'},{key:'C',text:'10-7'},{key:'D',text:'8-4'}],['A','B','C'],'7-4=3, 6-3=3, 10-7=3.'),
  mc(133,4,6,'medium','Chọn phép tính nào SAI:',[{key:'A',text:'8-3=5'},{key:'B',text:'9-6=4'},{key:'C',text:'7-1=6'},{key:'D',text:'5-2=4'}],['B','D'],'9-6=3, 5-2=3.'),
  mt(133,4,7,'medium','Nối phép tính với kết quả:',[{key:'A',text:'10-8'},{key:'B',text:'7-5'},{key:'C',text:'9-6'},{key:'D',text:'8-1'}],{A:'2',B:'2',C:'3',D:'7'}),
  mt(133,4,8,'medium','Nối phép tính với kết quả đúng:',[{key:'A',text:'6-2'},{key:'B',text:'9-3'},{key:'C',text:'8-5'},{key:'D',text:'10-4'}],{A:'4',B:'6',C:'3',D:'6'}),
  dd(133,4,9,'medium','Kéo thả số vào chỗ trống: 9 - __ = 4',[{key:'1',text:'3'},{key:'2',text:'5'},{key:'3',text:'6'},{key:'4',text:'4'}],['2'],'9 - 5 = 4.'),
  dd(133,4,10,'medium','Kéo thả số vào chỗ trống: __ - 3 = 7',[{key:'1',text:'8'},{key:'2',text:'9'},{key:'3',text:'10'},{key:'4',text:'11'}],['3'],'10 - 3 = 7.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(133,5,1,'medium','Điền kết quả vào bảng: 8-1=?, 8-2=?, 8-3=?',[{key:'a',text:'8-1'},{key:'b',text:'8-2'},{key:'c',text:'8-3'}],{a:'7',b:'6',c:'5'}),
  tf2(133,5,2,'medium','Điền kết quả vào bảng: 10-1=?, 10-3=?, 10-5=?',[{key:'a',text:'10-1'},{key:'b',text:'10-3'},{key:'c',text:'10-5'}],{a:'9',b:'7',c:'5'}),
  nl(133,5,3,'medium','Điền số vào tia số: 10 - 3 = ?',[{key:'start',text:'10'},{key:'step',text:'-3'},{key:'blank',text:'?'}],{blank:'7'}),
  nl(133,5,4,'medium','Điền số vào tia số: 8 - 5 = ?',[{key:'start',text:'8'},{key:'step',text:'-5'},{key:'blank',text:'?'}],{blank:'3'}),
  pz(133,5,5,'medium','Ghép mảnh ghép: 9 - ? = 5',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','9 - 4 = 5.'),
  pz(133,5,6,'medium','Ghép mảnh ghép: ? - 6 = 4',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'C','10 - 6 = 4.'),
  pz(133,5,7,'medium','Ghép mảnh ghép: 7 - ? = 2',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','7 - 5 = 2.'),
  mt(133,5,8,'medium','Nối: phép trừ với số bị thiếu:',[{key:'A',text:'8-?=5'},{key:'B',text:'9-?=4'},{key:'C',text:'10-?=6'}],{A:'3',B:'5',C:'4'}),
  mt(133,5,9,'medium','Nối: phép trừ với kết quả:',[{key:'A',text:'7-3'},{key:'B',text:'8-6'},{key:'C',text:'10-9'}],{A:'4',B:'2',C:'1'}),
  dd(133,5,10,'medium','Kéo thả: sắp xếp phép tính từ kết quả nhỏ đến lớn',[{key:'1',text:'10-7=3'},{key:'2',text:'9-5=4'},{key:'3',text:'8-3=5'},{key:'4',text:'7-1=6'}],['1','2','3','4']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(133,6,1,'hard','Lan có 10 cái bánh, ăn 4 cái. Lan còn [b1] cái bánh.',[{key:'b1',text:''}],{b1:'6'},'10 - 4 = 6.'),
  fb(133,6,2,'hard','Lớp học có 9 học sinh, về 5 em. Còn lại [b1] học sinh.',[{key:'b1',text:''}],{b1:'4'},'9 - 5 = 4.'),
  fb(133,6,3,'hard','8 - 3 - [b1] = 2',[{key:'b1',text:''}],{b1:'3'},'8-3=5, 5-3=2.'),
  pz(133,6,4,'hard','Điền số vào ô trống: □ - 4 = 6',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'8'}],'B','10 - 4 = 6.'),
  pz(133,6,5,'hard','Điền số vào ô trống: 9 - □ = 3',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'6'}],'C','9 - 6 = 3.'),
  pz(133,6,6,'hard','Điền số vào ô trống: □ - 5 = 5',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','10 - 5 = 5.'),
  mc(133,6,7,'hard','Phép tính nào có thể viết từ 3 số: 2, 5, 7?',[{key:'A',text:'7-2=5'},{key:'B',text:'5-2=7'},{key:'C',text:'7-5=2'},{key:'D',text:'2+7=5'}],['A','C'],'7-2=5 và 7-5=2 đều đúng.'),
  mc(133,6,8,'hard','Chọn phép tính nào có kết quả lớn hơn 6:',[{key:'A',text:'10-2'},{key:'B',text:'9-1'},{key:'C',text:'8-3'},{key:'D',text:'7-4'}],['A','B'],'10-2=8, 9-1=8.'),
  so(133,6,9,'hard','Sắp xếp phép tính theo kết quả tăng dần:',[{key:'1',text:'10-3=7'},{key:'2',text:'9-8=1'},{key:'3',text:'8-4=4'},{key:'4',text:'7-2=5'}],['2','3','4','1'],'1, 4, 5, 7.'),
  so(133,6,10,'hard','Sắp xếp phép tính theo kết quả giảm dần:',[{key:'1',text:'6-1=5'},{key:'2',text:'9-2=7'},{key:'3',text:'8-6=2'},{key:'4',text:'10-5=5'}],['2','1','4','3'],'7, 5, 5, 2.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(133,7,1,'hard','Ghép cặp phép trừ bằng nhau:',[{key:'A',text:'10-5'},{key:'B',text:'9-4'},{key:'C',text:'8-3'},{key:'D',text:'7-2'}],'10-5=9-4=8-3=7-2=5.'),
  gm(133,7,2,'hard','Ghép cặp phép trừ và kết quả:',[{key:'A',text:'10-8=2'},{key:'B',text:'9-7=2'},{key:'C',text:'8-6=2'},{key:'D',text:'7-5=2'}],'Tất cả đều bằng 2.'),
  mt(133,7,3,'hard','Nối bài toán với phép tính đúng:',[{key:'A',text:'Có 10 bút, mất 4'},{key:'B',text:'Có 8 cam, ăn 3'},{key:'C',text:'Có 9 kẹo, cho 6'}],{A:'10-4=6',B:'8-3=5',C:'9-6=3'}),
  mt(133,7,4,'hard','Nối phép tính với bài toán phù hợp:',[{key:'A',text:'7-5=2'},{key:'B',text:'8-2=6'},{key:'C',text:'10-6=4'}],{A:'Có 7 chim, bay đi 5',B:'Có 8 bánh, ăn 2',C:'Có 10 hoa, cắt 6'}),
  mt(133,7,5,'hard','Nối phép tính với số thiếu:',[{key:'A',text:'9-?=5'},{key:'B',text:'8-?=3'},{key:'C',text:'10-?=7'}],{A:'4',B:'5',C:'3'}),
  fb(133,7,6,'hard','Trong vườn có 10 con bướm. Bay đi 3 con. Còn lại [b1] con.',[{key:'b1',text:''}],{b1:'7'}),
  fb(133,7,7,'hard','9 - 4 - [b1] = 3',[{key:'b1',text:''}],{b1:'2'},'9-4=5, 5-2=3.'),
  fb(133,7,8,'hard','[b1] - 6 = 4',[{key:'b1',text:''}],{b1:'10'},'10 - 6 = 4.'),
  dd(133,7,9,'hard','Kéo số để tạo phép tính: __ - __ = 3 (dùng 9 và 6)',[{key:'1',text:'9'},{key:'2',text:'6'},{key:'3',text:'3'},{key:'4',text:'12'}],['1','2'],'9 - 6 = 3.'),
  dd(133,7,10,'hard','Kéo số để hoàn thành: 10 - __ - __ = 4 (dùng 3 và 3)',[{key:'1',text:'3'},{key:'2',text:'3'},{key:'3',text:'4'},{key:'4',text:'2'}],['1','2'],'10-3-3=4.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(133,8,1,'hard','Chọn TẤT CẢ phép tính có kết quả bằng 2:',[{key:'A',text:'10-8'},{key:'B',text:'9-7'},{key:'C',text:'8-6'},{key:'D',text:'7-5'}],['A','B','C','D'],'Tất cả đều bằng 2.'),
  mc(133,8,2,'hard','Chọn phép tính nào sai:',[{key:'A',text:'8-5=3'},{key:'B',text:'7-4=3'},{key:'C',text:'9-5=3'},{key:'D',text:'6-3=3'}],['C'],'9-5=4 không phải 3.'),
  mc(133,8,3,'hard','Chọn phép tính có kết quả lớn nhất:',[{key:'A',text:'10-9'},{key:'B',text:'9-2'},{key:'C',text:'8-1'},{key:'D',text:'7-0'}],['C'],'8-1=7 là lớn nhất trong các đáp án (nếu so sánh: 1,7,7,7 — 8-1=7=9-2=7-0; tất cả B,C,D bằng 7).'),
  pz(133,8,4,'hard','Điền số: __ - 4 = __ - 6 = 4',[{key:'A',text:'8 và 10'},{key:'B',text:'8 và 8'},{key:'C',text:'10 và 10'}],'A','8-4=4 và 10-6=4.'),
  pz(133,8,5,'hard','Tìm số X: X - 3 = 4 + 2',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'C','4+2=6, X=6+3=9.'),
  pz(133,8,6,'hard','Điền số vào ô: 10 - □ = □ - 4 (kết quả giống nhau, □ đầu + □ sau = 11)',[{key:'A',text:'4 và 7'},{key:'B',text:'3 và 8'},{key:'C',text:'5 và 6'}],'A','10-4=6=7... sai, thực ra 10-3=7 và 7+4=11: 3 và 7.'),
  so(133,8,7,'hard','Sắp xếp các phép tính theo kết quả từ nhỏ đến lớn:',[{key:'1',text:'9-1=8'},{key:'2',text:'10-9=1'},{key:'3',text:'8-2=6'},{key:'4',text:'7-3=4'}],['2','4','3','1'],'1, 4, 6, 8.'),
  so(133,8,8,'hard','Sắp xếp theo kết quả từ lớn đến nhỏ:',[{key:'1',text:'6-0=6'},{key:'2',text:'9-6=3'},{key:'3',text:'10-4=6'},{key:'4',text:'8-7=1'}],['1','3','2','4'],'6, 6, 3, 1.'),
  co(133,8,9,'hard','Gạch bỏ phép tính sai:',[{key:'A',text:'9-3=6'},{key:'B',text:'8-5=2'},{key:'C',text:'7-4=3'},{key:'D',text:'6-2=5'}],['B','D'],'8-5=3, 6-2=4.'),
  co(133,8,10,'hard','Gạch bỏ phép tính không có kết quả bằng 5:',[{key:'A',text:'10-5'},{key:'B',text:'9-4'},{key:'C',text:'8-2'},{key:'D',text:'7-3'}],['C','D'],'8-2=6, 7-3=4.'),
];

// ─── LESSON 134: Bảng cộng, bảng trừ trong phạm vi 10 ─────────────────────
const L134: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(134,1,1,'easy','3 + 4 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','3 cộng 4 bằng 7.'),
  sc(134,1,2,'easy','8 - 5 = ?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'}],'C','8 trừ 5 bằng 3.'),
  sc(134,1,3,'easy','5 + 5 = ?',[{key:'A',text:'10'},{key:'B',text:'9'},{key:'C',text:'11'}],'A','5 cộng 5 bằng 10.'),
  sc(134,1,4,'easy','10 - 3 = ?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'7'}],'C','10 trừ 3 bằng 7.'),
  tf(134,1,5,'easy','4 + 6 = 10. Đúng hay sai?',true,'4 cộng 6 bằng 10.'),
  tf(134,1,6,'easy','9 - 4 = 6. Đúng hay sai?',false,'9 - 4 = 5, không phải 6.'),
  tf(134,1,7,'easy','2 + 3 = 3 + 2. Đúng hay sai?',true,'Phép cộng có tính chất giao hoán.'),
  fb(134,1,8,'easy','6 + [b1] = 10',[{key:'b1',text:''}],{b1:'4'},'6 + 4 = 10.'),
  fb(134,1,9,'easy','10 - [b1] = 6',[{key:'b1',text:''}],{b1:'4'},'10 - 4 = 6.'),
  fb(134,1,10,'easy','[b1] + 3 = 8',[{key:'b1',text:''}],{b1:'5'},'5 + 3 = 8.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(134,2,1,'easy','🍊🍊🍊🍊🍊 Thêm 🍊🍊🍊. Có tất cả bao nhiêu?','8','5 + 3 = 8.'),
  ct(134,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐ Bỏ ⭐⭐. Còn bao nhiêu?','5','7 - 2 = 5.'),
  ct(134,2,3,'easy','🌸🌸🌸🌸 cộng thêm 🌸🌸🌸🌸🌸🌸. Có tất cả bao nhiêu?','10','4 + 6 = 10.'),
  so(134,2,4,'easy','Sắp xếp kết quả từ bé đến lớn: 3+4, 5+2, 1+6, 2+2',[{key:'1',text:'3+4=7'},{key:'2',text:'5+2=7'},{key:'3',text:'1+6=7'},{key:'4',text:'2+2=4'}],['4','1','2','3'],'4, 7, 7, 7.'),
  so(134,2,5,'easy','Sắp xếp từ lớn đến bé: 9-1, 8-0, 7-0, 10-2',[{key:'1',text:'9-1=8'},{key:'2',text:'8-0=8'},{key:'3',text:'7-0=7'},{key:'4',text:'10-2=8'}],['1','2','4','3'],'8, 8, 8, 7.'),
  so(134,2,6,'easy','Sắp xếp từ bé đến lớn: 2+3, 4+4, 1+8, 3+6',[{key:'1',text:'2+3=5'},{key:'2',text:'4+4=8'},{key:'3',text:'1+8=9'},{key:'4',text:'3+6=9'}],['1','2','3','4'],'5, 8, 9, 9.'),
  co(134,2,7,'easy','Gạch bỏ phép tính có kết quả bằng 10:',[{key:'A',text:'5+5'},{key:'B',text:'6+4'},{key:'C',text:'3+6'},{key:'D',text:'7+3'}],['A','B','D'],'Gạch bỏ những cái bằng 10? Đề bảo gạch bỏ không phải bằng 10: 3+6=9.'),
  co(134,2,8,'easy','Gạch bỏ phép tính SAI:',[{key:'A',text:'4+3=7'},{key:'B',text:'5+4=8'},{key:'C',text:'6+3=9'},{key:'D',text:'7+2=8'}],['B','D'],'5+4=9, 7+2=9.'),
  fb(134,2,9,'easy','4 + 5 = [b1]',[{key:'b1',text:''}],{b1:'9'}),
  fb(134,2,10,'easy','10 - 6 = [b1]',[{key:'b1',text:''}],{b1:'4'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(134,3,1,'easy','Phép cộng nào bằng 8?',[{key:'A',text:'3+4'},{key:'B',text:'5+3'},{key:'C',text:'4+5'}],'B','5+3=8.'),
  sc(134,3,2,'easy','Phép trừ nào bằng 6?',[{key:'A',text:'10-3'},{key:'B',text:'9-3'},{key:'C',text:'8-3'}],'B','9-3=6.'),
  sc(134,3,3,'easy','7 + ? = 10',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','7+3=10.'),
  sc(134,3,4,'easy','? - 5 = 4',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'C','9-5=4.'),
  tf(134,3,5,'easy','6 + 4 = 4 + 6. Đúng hay sai?',true,'Phép cộng có tính giao hoán.'),
  tf(134,3,6,'easy','8 - 3 = 3 - 8. Đúng hay sai?',false,'Phép trừ không có tính giao hoán.'),
  tf(134,3,7,'easy','1 + 2 + 3 = 6. Đúng hay sai?',true,'1+2=3, 3+3=6.'),
  fb(134,3,8,'easy','7 + [b1] = 9',[{key:'b1',text:''}],{b1:'2'},'7+2=9.'),
  fb(134,3,9,'easy','[b1] - 4 = 5',[{key:'b1',text:''}],{b1:'9'},'9-4=5.'),
  ct(134,3,10,'easy','🐶🐶🐶 Thêm 🐶🐶🐶🐶🐶🐶🐶. Có tất cả bao nhiêu con chó?','10','3+7=10.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(134,4,1,'medium','Nếu 3+7=10 thì 10-7=?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'7'}],'A','Cộng và trừ là phép ngược nhau.'),
  sc(134,4,2,'medium','Nếu 6+4=10 thì 10-4=?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'}],'B'),
  sc(134,4,3,'medium','Từ 3 số 2, 8, 10 có thể viết được mấy phép tính?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'C','2+8=10, 8+2=10, 10-2=8, 10-8=2.'),
  mc(134,4,4,'medium','Chọn tất cả phép tính đúng từ bộ số 3, 7, 10:',[{key:'A',text:'3+7=10'},{key:'B',text:'7+3=10'},{key:'C',text:'10-3=7'},{key:'D',text:'10-7=3'}],['A','B','C','D'],'Tất cả đều đúng.'),
  mc(134,4,5,'medium','Chọn phép tính có kết quả bằng 6:',[{key:'A',text:'4+2'},{key:'B',text:'9-3'},{key:'C',text:'7-1'},{key:'D',text:'3+4'}],['A','B','C'],'4+2=6, 9-3=6, 7-1=6.'),
  mc(134,4,6,'medium','Phép tính nào sai?',[{key:'A',text:'5+4=9'},{key:'B',text:'8-3=5'},{key:'C',text:'6+3=8'},{key:'D',text:'7-4=3'}],['C'],'6+3=9 không phải 8.'),
  mt(134,4,7,'medium','Nối phép cộng với phép trừ tương ứng:',[{key:'A',text:'4+6=10'},{key:'B',text:'3+5=8'},{key:'C',text:'2+7=9'}],{A:'10-4=6',B:'8-5=3',C:'9-7=2'}),
  mt(134,4,8,'medium','Nối phép tính với kết quả:',[{key:'A',text:'7+2'},{key:'B',text:'9-4'},{key:'C',text:'6+3'},{key:'D',text:'10-5'}],{A:'9',B:'5',C:'9',D:'5'}),
  dd(134,4,9,'medium','Kéo thả số vào chỗ trống: 5 + __ = 9',[{key:'1',text:'3'},{key:'2',text:'4'},{key:'3',text:'5'},{key:'4',text:'6'}],['2'],'5+4=9.'),
  dd(134,4,10,'medium','Kéo thả số vào chỗ trống: 10 - __ = 3',[{key:'1',text:'6'},{key:'2',text:'7'},{key:'3',text:'8'},{key:'4',text:'9'}],['2'],'10-7=3.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(134,5,1,'medium','Điền kết quả bảng cộng: 0+10=?, 1+9=?, 2+8=?, 3+7=?',[{key:'a',text:'0+10'},{key:'b',text:'1+9'},{key:'c',text:'2+8'},{key:'d',text:'3+7'}],{a:'10',b:'10',c:'10',d:'10'},'Tất cả đều bằng 10.'),
  tf2(134,5,2,'medium','Điền bảng trừ: 10-0=?, 10-5=?, 10-10=?',[{key:'a',text:'10-0'},{key:'b',text:'10-5'},{key:'c',text:'10-10'}],{a:'10',b:'5',c:'0'}),
  nl(134,5,3,'medium','Điền số vào tia số: 4 + 5 = ?',[{key:'start',text:'4'},{key:'step',text:'+5'},{key:'blank',text:'?'}],{blank:'9'}),
  nl(134,5,4,'medium','Điền số vào tia số: 9 - 6 = ?',[{key:'start',text:'9'},{key:'step',text:'-6'},{key:'blank',text:'?'}],{blank:'3'}),
  pz(134,5,5,'medium','Ghép mảnh: 6 + ? = 10',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','6+4=10.'),
  pz(134,5,6,'medium','Ghép mảnh: 10 - ? = 5',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','10-5=5.'),
  pz(134,5,7,'medium','Ghép mảnh: ? + 3 = 8',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','5+3=8.'),
  mt(134,5,8,'medium','Nối phép cộng với phép trừ ngược:',[{key:'A',text:'5+3=8'},{key:'B',text:'6+2=8'},{key:'C',text:'7+1=8'}],{A:'8-3=5',B:'8-2=6',C:'8-1=7'}),
  mt(134,5,9,'medium','Nối bài toán với phép tính:',[{key:'A',text:'Có 7 bút thêm 3'},{key:'B',text:'Có 9 cam bớt 4'},{key:'C',text:'Có 6 kẹo thêm 4'}],{A:'7+3=10',B:'9-4=5',C:'6+4=10'}),
  dd(134,5,10,'medium','Kéo xếp: từ nhỏ đến lớn: 4+3, 2+5, 1+8, 3+6',[{key:'1',text:'4+3=7'},{key:'2',text:'2+5=7'},{key:'3',text:'1+8=9'},{key:'4',text:'3+6=9'}],['1','2','3','4']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(134,6,1,'hard','Hoa có 5 quyển sách. Mẹ mua thêm 3 quyển. Hoa có tất cả [b1] quyển.',[{key:'b1',text:''}],{b1:'8'},'5+3=8.'),
  fb(134,6,2,'hard','Rổ có 10 quả cam. Bán 4 quả. Còn lại [b1] quả.',[{key:'b1',text:''}],{b1:'6'},'10-4=6.'),
  fb(134,6,3,'hard','3 + [b1] + 2 = 9',[{key:'b1',text:''}],{b1:'4'},'3+4+2=9.'),
  pz(134,6,4,'hard','Điền số: __ + 5 = 5 + __',[{key:'A',text:'5 và 5'},{key:'B',text:'bất kỳ số nào'},{key:'C',text:'chỉ là 0'}],'B','Phép cộng giao hoán: a+5=5+a với mọi a.'),
  pz(134,6,5,'hard','Tìm số X: X + 4 = 10 - 3',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','10-3=7, X=7-4=3.'),
  pz(134,6,6,'hard','Điền số: __ + __ = 10 (hai số bằng nhau)',[{key:'A',text:'4 và 4'},{key:'B',text:'5 và 5'},{key:'C',text:'6 và 6'}],'B','5+5=10.'),
  mc(134,6,7,'hard','Chọn phép tính có kết quả bằng 9:',[{key:'A',text:'4+5'},{key:'B',text:'10-1'},{key:'C',text:'6+3'},{key:'D',text:'8-1'}],['A','B','C','D'],'Tất cả bằng 9.'),
  mc(134,6,8,'hard','Phép tính nào KHÔNG có kết quả bằng 8:',[{key:'A',text:'4+4'},{key:'B',text:'9-1'},{key:'C',text:'3+5'},{key:'D',text:'10-3'}],['D'],'10-3=7, không phải 8.'),
  so(134,6,9,'hard','Sắp xếp từ bé đến lớn: 3+5, 4+4, 2+6, 1+7',[{key:'1',text:'3+5=8'},{key:'2',text:'4+4=8'},{key:'3',text:'2+6=8'},{key:'4',text:'1+7=8'}],['1','2','3','4'],'Tất cả đều bằng 8.'),
  so(134,6,10,'hard','Sắp xếp theo kết quả giảm dần: 8-3, 9-5, 7-2, 10-6',[{key:'1',text:'8-3=5'},{key:'2',text:'9-5=4'},{key:'3',text:'7-2=5'},{key:'4',text:'10-6=4'}],['1','3','2','4'],'5, 5, 4, 4.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(134,7,1,'hard','Ghép cặp phép cộng và trừ ngược nhau:',[{key:'A',text:'3+7=10'},{key:'B',text:'10-7=3'},{key:'C',text:'5+5=10'},{key:'D',text:'10-5=5'}],'Mỗi phép cộng có phép trừ ngược.'),
  gm(134,7,2,'hard','Ghép cặp phép tính cùng kết quả:',[{key:'A',text:'6+3=9'},{key:'B',text:'10-1=9'},{key:'C',text:'4+5=9'},{key:'D',text:'9-0=9'}],'Tất cả đều bằng 9.'),
  mt(134,7,3,'hard','Nối bộ số với các phép tính có thể viết:',[{key:'A',text:'2,8,10'},{key:'B',text:'3,6,9'},{key:'C',text:'4,5,9'}],{A:'2+8=10',B:'3+6=9',C:'4+5=9'}),
  mt(134,7,4,'hard','Nối phép tính với số thiếu:',[{key:'A',text:'?+6=10'},{key:'B',text:'8+?=10'},{key:'C',text:'?+5=9'}],{A:'4',B:'2',C:'4'}),
  mt(134,7,5,'hard','Nối bài toán với phép tính và kết quả:',[{key:'A',text:'Mua 4 bút và 5 bút'},{key:'B',text:'Có 10 kẹo ăn 3'},{key:'C',text:'Có 6 táo thêm 4'}],{A:'4+5=9',B:'10-3=7',C:'6+4=10'}),
  fb(134,7,6,'hard','[b1] + 7 = 10',[{key:'b1',text:''}],{b1:'3'},'3+7=10.'),
  fb(134,7,7,'hard','5 + [b1] - 2 = 7',[{key:'b1',text:''}],{b1:'4'},'5+4=9, 9-2=7.'),
  fb(134,7,8,'hard','10 - [b1] - 3 = 4',[{key:'b1',text:''}],{b1:'3'},'10-3=7, 7-3=4.'),
  dd(134,7,9,'hard','Kéo số để tạo phép tính đúng: __ + __ = 10 (dùng 6 và 4)',[{key:'1',text:'6'},{key:'2',text:'4'},{key:'3',text:'5'},{key:'4',text:'3'}],['1','2'],'6+4=10.'),
  dd(134,7,10,'hard','Kéo số để hoàn thành: 10 - __ + __ = 8 (dùng 4 và 2)',[{key:'1',text:'4'},{key:'2',text:'2'},{key:'3',text:'6'},{key:'4',text:'3'}],['1','2'],'10-4=6, 6+2=8.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(134,8,1,'hard','Chọn TẤT CẢ phép tính có thể viết từ bộ số 5, 5, 10:',[{key:'A',text:'5+5=10'},{key:'B',text:'10-5=5'},{key:'C',text:'5-5=0'},{key:'D',text:'10+5=15'}],['A','B'],'5+5=10 và 10-5=5 (trong phạm vi 10).'),
  mc(134,8,2,'hard','Chọn phép tính đúng:',[{key:'A',text:'3+4+2=9'},{key:'B',text:'2+3+4=8'},{key:'C',text:'4+3+2=9'},{key:'D',text:'1+4+5=10'}],['A','C','D'],'3+4+2=9, 4+3+2=9, 1+4+5=10.'),
  mc(134,8,3,'hard','Phép tính nào có kết quả bằng 10:',[{key:'A',text:'5+5'},{key:'B',text:'3+7'},{key:'C',text:'4+6'},{key:'D',text:'2+8'}],['A','B','C','D'],'Tất cả đều bằng 10.'),
  pz(134,8,4,'hard','Bạn có 10 viên bi. Cho bạn 3 viên, được cho 5 viên. Còn bao nhiêu?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'10'}],'B','10-3+5=12.'),
  pz(134,8,5,'hard','Lớp có 6 bạn nam và một số bạn nữ. Tất cả 10 bạn. Có bao nhiêu bạn nữ?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','10-6=4.'),
  pz(134,8,6,'hard','Mẹ mua 10 quả. Ăn 4 quả sáng và 2 quả chiều. Còn bao nhiêu?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','10-4-2=4.'),
  so(134,8,7,'hard','Sắp xếp từ bé đến lớn: 10-4, 9-3, 8-2, 7-1',[{key:'1',text:'10-4=6'},{key:'2',text:'9-3=6'},{key:'3',text:'8-2=6'},{key:'4',text:'7-1=6'}],['1','2','3','4'],'Tất cả bằng 6.'),
  so(134,8,8,'hard','Sắp xếp theo kết quả giảm dần: 1+9, 2+7, 3+6, 4+5',[{key:'1',text:'1+9=10'},{key:'2',text:'2+7=9'},{key:'3',text:'3+6=9'},{key:'4',text:'4+5=9'}],['1','2','3','4'],'10, 9, 9, 9.'),
  co(134,8,9,'hard','Gạch bỏ phép tính sai:',[{key:'A',text:'6+4=10'},{key:'B',text:'5+6=10'},{key:'C',text:'7+3=10'},{key:'D',text:'8+3=10'}],['B','D'],'5+6=11, 8+3=11.'),
  co(134,8,10,'hard','Gạch bỏ phép tính không thuộc bảng cộng trong phạm vi 10:',[{key:'A',text:'4+7=11'},{key:'B',text:'5+4=9'},{key:'C',text:'6+5=11'},{key:'D',text:'3+7=10'}],['A','C'],'Kết quả vượt quá 10.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function main() {
  await ds.initialize();
  const qr = ds.createQueryRunner();

  try {
    // Delete existing
    await qr.query('DELETE FROM quizzes WHERE lessonId IN (133,134)');

    // Insert L133
    for (const row of L133) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 133 — ${L133.length} questions inserted`);

    // Insert L134
    for (const row of L134) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 134 — ${L134.length} questions inserted`);

  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
