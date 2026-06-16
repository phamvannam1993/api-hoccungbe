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

// ─── LESSON 132: Phép cộng trong phạm vi 10 ───────────────────────
const L = 132;
const rows: Row[] = [

  // ── Ex 1 (easy): 4 single_choice, 3 true_false, 3 fill_blank ──
  sc(L,1,1,'easy','3 + 4 = ?',
    [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','3 + 4 = 7.'),
  sc(L,1,2,'easy','2 + 5 = ?',
    [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','2 + 5 = 7.'),
  sc(L,1,3,'easy','1 + 9 = ?',
    [{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','1 + 9 = 10.'),
  sc(L,1,4,'easy','4 + 4 = ?',
    [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','4 + 4 = 8.'),
  tf(L,1,5,'easy','5 + 5 = 10. Đúng hay sai?',true,'5 + 5 = 10.'),
  tf(L,1,6,'easy','3 + 3 = 7. Đúng hay sai?',false,'3 + 3 = 6, không phải 7.'),
  tf(L,1,7,'easy','6 + 2 = 8. Đúng hay sai?',true,'6 + 2 = 8.'),
  fb(L,1,8,'easy','2 + 3 = [b1].',[{key:'b1',text:''}],{b1:'5'},'2 + 3 = 5.'),
  fb(L,1,9,'easy','4 + 5 = [b1].',[{key:'b1',text:''}],{b1:'9'},'4 + 5 = 9.'),
  fb(L,1,10,'easy','7 + [b1] = 10.',[{key:'b1',text:''}],{b1:'3'},'7 + 3 = 10.'),

  // ── Ex 2 (easy): 3 counting, 3 sorting, 2 cross_out, 2 fill_blank ──
  ct(L,2,1,'easy','🍎🍎🍎 + 🍎🍎🍎🍎 Đếm tổng số táo?','7','3 + 4 = 7.'),
  ct(L,2,2,'easy','⭐⭐ + ⭐⭐⭐⭐⭐⭐ Đếm tổng số ngôi sao?','8','2 + 6 = 8.'),
  ct(L,2,3,'easy','🐥🐥🐥🐥🐥 + 🐥🐥🐥🐥🐥 Đếm tổng số chú gà?','10','5 + 5 = 10.'),
  so(L,2,4,'easy','Sắp xếp kết quả từ bé đến lớn: 1+2, 3+3, 2+2, 1+1',
    [{key:'A',text:'1+1=2'},{key:'B',text:'1+2=3'},{key:'C',text:'2+2=4'},{key:'D',text:'3+3=6'}],
    ['A','B','C','D'],'2 < 3 < 4 < 6.'),
  so(L,2,5,'easy','Sắp xếp kết quả từ lớn đến bé: 4+4, 2+3, 1+3, 3+5',
    [{key:'A',text:'4+4=8'},{key:'B',text:'3+5=8'},{key:'C',text:'2+3=5'},{key:'D',text:'1+3=4'}],
    ['A','B','C','D'],'8=8 > 5 > 4.'),
  so(L,2,6,'easy','Sắp xếp từ bé đến lớn: 5+5, 0+1, 3+2, 4+2',
    [{key:'A',text:'5+5=10'},{key:'B',text:'0+1=1'},{key:'C',text:'3+2=5'},{key:'D',text:'4+2=6'}],
    ['B','C','D','A'],'1 < 5 < 6 < 10.'),
  co(L,2,7,'easy','Gạch bỏ phép tính có kết quả KHÔNG bằng 6:',
    [{key:'A',text:'3+3'},{key:'B',text:'4+2'},{key:'C',text:'5+2'},{key:'D',text:'1+5'}],['C'],'5+2=7, không phải 6.'),
  co(L,2,8,'easy','Gạch bỏ phép tính có kết quả KHÔNG bằng 10:',
    [{key:'A',text:'9+1'},{key:'B',text:'8+3'},{key:'C',text:'5+5'},{key:'D',text:'7+3'}],['B'],'8+3=11, không phải 10.'),
  fb(L,2,9,'easy','5 + [b1] = 8.',[{key:'b1',text:''}],{b1:'3'},'5 + 3 = 8.'),
  fb(L,2,10,'easy','[b1] + 4 = 9.',[{key:'b1',text:''}],{b1:'5'},'5 + 4 = 9.'),

  // ── Ex 3 (easy): 4 single_choice, 3 true_false, 2 fill_blank, 1 counting ──
  sc(L,3,1,'easy','Bạn có 3 cái kẹo, mẹ cho thêm 5 cái. Bạn có tất cả bao nhiêu cái kẹo?',
    [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','3 + 5 = 8.'),
  sc(L,3,2,'easy','Trong vườn có 2 con chim, bay thêm 7 con nữa đến. Có tất cả bao nhiêu con chim?',
    [{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','2 + 7 = 9.'),
  sc(L,3,3,'easy','Phép tính nào có kết quả bằng 7?',
    [{key:'A',text:'4+4'},{key:'B',text:'3+4'},{key:'C',text:'5+3'}],'B','3 + 4 = 7.'),
  sc(L,3,4,'easy','Phép tính nào có kết quả bằng 10?',
    [{key:'A',text:'5+4'},{key:'B',text:'6+5'},{key:'C',text:'4+6'}],'C','4 + 6 = 10.'),
  tf(L,3,5,'easy','0 + 8 = 8. Đúng hay sai?',true,'Cộng với 0 không thay đổi số đó.'),
  tf(L,3,6,'easy','9 + 1 = 11. Đúng hay sai?',false,'9 + 1 = 10, không phải 11.'),
  tf(L,3,7,'easy','Kết quả của 4 + 3 và 3 + 4 bằng nhau. Đúng hay sai?',true,'4+3 = 3+4 = 7 (tính chất giao hoán).'),
  fb(L,3,8,'easy','6 + [b1] = 10.',[{key:'b1',text:''}],{b1:'4'},'6 + 4 = 10.'),
  fb(L,3,9,'easy','[b1] + 2 = 7.',[{key:'b1',text:''}],{b1:'5'},'5 + 2 = 7.'),
  ct(L,3,10,'easy','🌸🌸🌸🌸 + 🌸🌸🌸 Đếm tổng số bông hoa?','7','4 + 3 = 7.'),

  // ── Ex 4 (medium): 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop ──
  sc(L,4,1,'medium','Điền số thích hợp: 8 + ? = 10',
    [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','8 + 2 = 10.'),
  sc(L,4,2,'medium','Lan có 4 bông hoa đỏ và 3 bông hoa vàng. Lan có tất cả mấy bông hoa?',
    [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','4 + 3 = 7.'),
  sc(L,4,3,'medium','Số nào cộng với 5 được kết quả là 9?',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','4 + 5 = 9.'),
  mc(L,4,4,'medium','Chọn TẤT CẢ các phép tính có kết quả bằng 8:',
    [{key:'A',text:'3+5'},{key:'B',text:'4+4'},{key:'C',text:'6+3'},{key:'D',text:'2+6'}],
    ['A','B','D'],'3+5=8, 4+4=8, 2+6=8. (6+3=9)'),
  mc(L,4,5,'medium','Chọn TẤT CẢ các phép tính có kết quả bằng 9:',
    [{key:'A',text:'5+4'},{key:'B',text:'6+3'},{key:'C',text:'7+2'},{key:'D',text:'8+2'}],
    ['A','B','C'],'5+4=6+3=7+2=9. (8+2=10)'),
  mc(L,4,6,'medium','Chọn TẤT CẢ các phép tính có kết quả bằng 6:',
    [{key:'A',text:'3+3'},{key:'B',text:'4+2'},{key:'C',text:'1+5'},{key:'D',text:'2+5'}],
    ['A','B','C'],'3+3=4+2=1+5=6. (2+5=7)'),
  mt(L,4,7,'medium','Nối phép tính với kết quả đúng:',
    [{key:'A',text:'2+3'},{key:'B',text:'4+4'},{key:'C',text:'1+6'},{key:'D',text:'5'},{key:'E',text:'8'},{key:'F',text:'7'}],
    {A:'D',B:'E',C:'F'},'2+3=5, 4+4=8, 1+6=7.'),
  mt(L,4,8,'medium','Nối phép tính với kết quả đúng:',
    [{key:'A',text:'6+4'},{key:'B',text:'3+6'},{key:'C',text:'5+3'},{key:'D',text:'10'},{key:'E',text:'9'},{key:'F',text:'8'}],
    {A:'D',B:'E',C:'F'},'6+4=10, 3+6=9, 5+3=8.'),
  dd(L,4,9,'medium','Kéo thả để hoàn thành: 7 + ? = 10',
    [{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}],
    ['C'],'7 + 3 = 10.'),
  dd(L,4,10,'medium','Kéo thả để hoàn thành: ? + 6 = 10',
    [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'}],
    ['C'],'4 + 6 = 10.'),

  // ── Ex 5 (medium): 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop ──
  tf2(L,5,1,'medium','Điền kết quả vào bảng cộng:',
    [{key:'2+1',text:''},{key:'2+2',text:''},{key:'2+3',text:''}],
    {'2+1':'3','2+2':'4','2+3':'5'},'2+1=3, 2+2=4, 2+3=5.'),
  tf2(L,5,2,'medium','Điền kết quả vào bảng cộng:',
    [{key:'5+1',text:''},{key:'5+2',text:''},{key:'5+3',text:''}],
    {'5+1':'6','5+2':'7','5+3':'8'},'5+1=6, 5+2=7, 5+3=8.'),
  nl(L,5,3,'medium','Tính 3 + 4 trên trục số. Kết quả nằm ở vị trí nào?',
    [{key:'b1',text:''}],{b1:'7'},'Bắt đầu từ 3, đếm thêm 4 bước → 7.'),
  nl(L,5,4,'medium','Tính 5 + 3 trên trục số. Kết quả nằm ở vị trí nào?',
    [{key:'b1',text:''}],{b1:'8'},'Bắt đầu từ 5, đếm thêm 3 bước → 8.'),
  pz(L,5,5,'medium','Ghép mảnh ghép: phép tính ? cho kết quả 7',
    [{key:'A',text:'3+4'},{key:'B',text:'2+4'},{key:'C',text:'4+4'}],'A','3+4=7.'),
  pz(L,5,6,'medium','Ghép mảnh ghép: phép tính ? cho kết quả 9',
    [{key:'A',text:'4+4'},{key:'B',text:'4+5'},{key:'C',text:'5+5'}],'B','4+5=9.'),
  pz(L,5,7,'medium','Ghép mảnh ghép: phép tính ? cho kết quả 10',
    [{key:'A',text:'4+5'},{key:'B',text:'6+4'},{key:'C',text:'7+4'}],'B','6+4=10.'),
  mt(L,5,8,'medium','Nối mỗi bài toán với đáp án:',
    [{key:'A',text:'Có 2 con cá, thêm 5 con nữa'},{key:'B',text:'Có 3 quả cam, thêm 4 quả nữa'},{key:'C',text:'7'},{key:'D',text:'7'}],
    {A:'C',B:'D'},'2+5=7, 3+4=7.'),
  mt(L,5,9,'medium','Nối phép tính với số còn thiếu:',
    [{key:'A',text:'3+?=8'},{key:'B',text:'6+?=10'},{key:'C',text:'5'},{key:'D',text:'4'}],
    {A:'C',B:'D'},'3+5=8, 6+4=10.'),
  dd(L,5,10,'medium','Kéo thả số thích hợp: 2 + ? = 6',
    [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'}],
    ['C'],'2 + 4 = 6.'),

  // ── Ex 6 (hard): 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting ──
  fb(L,6,1,'hard','Nam có [b1] viên bi, Hoa có 3 viên bi. Hai bạn có tất cả 9 viên bi. Tìm [b1].',
    [{key:'b1',text:''}],{b1:'6'},'6 + 3 = 9.'),
  fb(L,6,2,'hard','[b1] + [b2] = 10, biết [b1] = 7. Tìm [b2].',
    [{key:'b1',text:''},{key:'b2',text:''}],{b1:'7',b2:'3'},'7 + 3 = 10.'),
  fb(L,6,3,'hard','Điền dấu: 4 [b1] 5 = 9.',[{key:'b1',text:''}],{b1:'+'},'4 + 5 = 9.'),
  pz(L,6,4,'hard','Ghép mảnh: Bạn cần hai số cộng lại bằng 10. Chọn cặp đúng:',
    [{key:'A',text:'3 và 8'},{key:'B',text:'6 và 4'},{key:'C',text:'5 và 6'}],'B','6+4=10.'),
  pz(L,6,5,'hard','Ghép mảnh: Tìm số bị thiếu trong dãy 1+?=9:',
    [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','1+8=9.'),
  pz(L,6,6,'hard','Ghép mảnh: Phép tính nào KHÔNG thuộc phép cộng trong phạm vi 10?',
    [{key:'A',text:'5+5'},{key:'B',text:'6+5'},{key:'C',text:'4+6'}],'B','6+5=11 > 10, vượt phạm vi.'),
  mc(L,6,7,'hard','Chọn TẤT CẢ các cặp số có tổng bằng 10:',
    [{key:'A',text:'2 và 8'},{key:'B',text:'3 và 8'},{key:'C',text:'4 và 6'},{key:'D',text:'7 và 3'}],
    ['A','C','D'],'2+8=10, 4+6=10, 7+3=10. (3+8=11)'),
  mc(L,6,8,'hard','Chọn TẤT CẢ các phép tính SAI:',
    [{key:'A',text:'5+3=9'},{key:'B',text:'4+6=10'},{key:'C',text:'7+2=10'},{key:'D',text:'3+6=9'}],
    ['A','C'],'5+3=8 (không phải 9), 7+2=9 (không phải 10).'),
  so(L,6,9,'hard','Sắp xếp các phép tính theo kết quả từ bé đến lớn: 3+2, 4+5, 2+7, 1+4',
    [{key:'A',text:'3+2=5'},{key:'B',text:'4+5=9'},{key:'C',text:'2+7=9'},{key:'D',text:'1+4=5'}],
    ['A','D','B','C'],'5=5 < 9=9.'),
  so(L,6,10,'hard','Sắp xếp các phép tính theo kết quả từ lớn đến bé: 6+4, 2+3, 1+8, 4+3',
    [{key:'A',text:'6+4=10'},{key:'B',text:'2+3=5'},{key:'C',text:'1+8=9'},{key:'D',text:'4+3=7'}],
    ['A','C','D','B'],'10 > 9 > 7 > 5.'),

  // ── Ex 7 (hard): 2 game, 3 matching, 3 fill_blank, 2 drag_drop ──
  gm(L,7,1,'hard','Trò chơi ghép cặp: nối phép tính với kết quả (kéo thả nhanh nhất)',
    [{key:'3+7',text:'10'},{key:'5+4',text:'9'},{key:'6+3',text:'9'},{key:'2+8',text:'10'}]),
  gm(L,7,2,'hard','Trò chơi bắn phép tính: chọn đáp án đúng trước khi hết giờ',
    [{key:'4+4',text:'8'},{key:'3+5',text:'8'},{key:'7+2',text:'9'},{key:'1+9',text:'10'}]),
  mt(L,7,3,'hard','Nối bài toán với phép tính phù hợp:',
    [{key:'A',text:'Có 5 táo, mua thêm 4 táo'},{key:'B',text:'Có 3 cam, mua thêm 7 cam'},{key:'C',text:'5+4'},{key:'D',text:'3+7'}],
    {A:'C',B:'D'},'5+4=9, 3+7=10.'),
  mt(L,7,4,'hard','Nối phép cộng với phép cộng có cùng kết quả (tính chất giao hoán):',
    [{key:'A',text:'2+8'},{key:'B',text:'5+3'},{key:'C',text:'8+2'},{key:'D',text:'3+5'}],
    {A:'C',B:'D'},'2+8=8+2=10, 5+3=3+5=8.'),
  mt(L,7,5,'hard','Nối số còn thiếu vào phép tính:',
    [{key:'A',text:'?+4=7'},{key:'B',text:'?+3=8'},{key:'C',text:'3'},{key:'D',text:'5'}],
    {A:'C',B:'D'},'3+4=7, 5+3=8.'),
  fb(L,7,6,'hard','Trong hộp có 4 bút đỏ và [b1] bút xanh. Tất cả có 10 bút. Tìm [b1].',
    [{key:'b1',text:''}],{b1:'6'},'4 + 6 = 10.'),
  fb(L,7,7,'hard','[b1] + 3 = 10.',[{key:'b1',text:''}],{b1:'7'},'7 + 3 = 10.'),
  fb(L,7,8,'hard','5 + [b1] = 5. Tìm [b1].',[{key:'b1',text:''}],{b1:'0'},'5 + 0 = 5.'),
  dd(L,7,9,'hard','Kéo thả để tạo phép cộng đúng có kết quả 10: ? + ? = 10',
    [{key:'A',text:'6'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'3'}],
    ['A','B'],'6 + 4 = 10.'),
  dd(L,7,10,'hard','Kéo thả để xếp đúng: 3 + ? = 8',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'6'}],
    ['C'],'3 + 5 = 8.'),

  // ── Ex 8 (hard): 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out ──
  mc(L,8,1,'hard','Chọn TẤT CẢ các phép tính có tổng bằng 8:',
    [{key:'A',text:'2+6'},{key:'B',text:'3+5'},{key:'C',text:'4+5'},{key:'D',text:'1+7'}],
    ['A','B','D'],'2+6=3+5=1+7=8. (4+5=9)'),
  mc(L,8,2,'hard','Chọn TẤT CẢ các khẳng định ĐÚNG về phép cộng:',
    [{key:'A',text:'4+3 = 3+4'},{key:'B',text:'5+0 = 5'},{key:'C',text:'2+9 = 10'},{key:'D',text:'6+4 = 10'}],
    ['A','B','D'],'Giao hoán: 4+3=3+4=7; 5+0=5; 6+4=10. (2+9=11≠10)'),
  mc(L,8,3,'hard','Chọn TẤT CẢ các số có thể điền vào ? để 5 + ? ≤ 8:',
    [{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'},{key:'D',text:'3'},{key:'E',text:'4'}],
    ['A','B','C','D'],'5+0=5, 5+1=6, 5+2=7, 5+3=8. (5+4=9>8)'),
  pz(L,8,4,'hard','Ghép mảnh: Tìm phép tính đúng cho bài toán "Hà có 6 bông, Lan cho thêm 4 bông":',
    [{key:'A',text:'6-4=2'},{key:'B',text:'6+4=10'},{key:'C',text:'4+6=9'}],'B','6+4=10.'),
  pz(L,8,5,'hard','Ghép mảnh: Phép tính nào có kết quả lớn nhất trong phạm vi 10?',
    [{key:'A',text:'4+5=9'},{key:'B',text:'5+5=10'},{key:'C',text:'4+4=8'}],'B','5+5=10 là lớn nhất.'),
  pz(L,8,6,'hard','Ghép mảnh: Điền số thích hợp vào phép tính ? + 3 = 6 + 1',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','4+3=7=6+1.'),
  so(L,8,7,'hard','Sắp xếp từ bé đến lớn kết quả: 1+0, 3+3, 2+5, 4+6',
    [{key:'A',text:'1+0=1'},{key:'B',text:'3+3=6'},{key:'C',text:'2+5=7'},{key:'D',text:'4+6=10'}],
    ['A','B','C','D'],'1 < 6 < 7 < 10.'),
  so(L,8,8,'hard','Sắp xếp từ lớn đến bé: 3+4, 5+5, 2+4, 1+8',
    [{key:'A',text:'3+4=7'},{key:'B',text:'5+5=10'},{key:'C',text:'2+4=6'},{key:'D',text:'1+8=9'}],
    ['B','D','A','C'],'10 > 9 > 7 > 6.'),
  co(L,8,9,'hard','Gạch bỏ phép tính CÓ KẾT QUẢ SAI:',
    [{key:'A',text:'3+4=7'},{key:'B',text:'5+3=9'},{key:'C',text:'2+6=8'},{key:'D',text:'4+4=8'}],['B'],'5+3=8, không phải 9.'),
  co(L,8,10,'hard','Gạch bỏ số KHÔNG thể là kết quả của phép cộng hai số trong phạm vi 10:',
    [{key:'A',text:'0'},{key:'B',text:'5'},{key:'C',text:'11'},{key:'D',text:'10'}],['C'],'11 > 10, vượt phạm vi.'),
];

(async () => {
  await ds.initialize();
  await ds.query('DELETE FROM quizzes WHERE lessonId = ?', [L]);
  const sql = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;
  for (const r of rows) {
    await ds.query(sql, r);
  }
  console.log(`✅ ${L}: ${rows.length} questions`);
  await ds.destroy();
})();
