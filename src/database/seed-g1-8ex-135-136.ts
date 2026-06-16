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

// ─── LESSON 135: Luyện tập chung — mixed addition/subtraction 0-10 ─────────

const L135: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(135,1,1,'easy','3 + 4 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','3 + 4 = 7'),
  sc(135,1,2,'easy','9 - 5 = ?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','9 - 5 = 4'),
  sc(135,1,3,'easy','2 + 6 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','2 + 6 = 8'),
  sc(135,1,4,'easy','10 - 3 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','10 - 3 = 7'),
  tf(135,1,5,'easy','5 + 5 = 10. Đúng hay sai?',true,'5 + 5 = 10'),
  tf(135,1,6,'easy','8 - 4 = 5. Đúng hay sai?',false,'8 - 4 = 4'),
  tf(135,1,7,'easy','6 + 3 = 9. Đúng hay sai?',true,'6 + 3 = 9'),
  fb(135,1,8,'easy','4 + [b1] = 7',[{key:'b1',text:''}],{b1:'3'},'4 + 3 = 7'),
  fb(135,1,9,'easy','10 - [b1] = 6',[{key:'b1',text:''}],{b1:'4'},'10 - 4 = 6'),
  fb(135,1,10,'easy','[b1] + 2 = 8',[{key:'b1',text:''}],{b1:'6'},'6 + 2 = 8'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(135,2,1,'easy','🍎🍎🍎🍎🍎 Có bao nhiêu quả táo?','5'),
  ct(135,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao?','8'),
  ct(135,2,3,'easy','🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤 Có bao nhiêu con gà?','10'),
  so(135,2,4,'easy','Sắp xếp kết quả từ bé đến lớn: 3+4, 1+1, 5+3, 2+2',[{key:'1',text:'3+4=7'},{key:'2',text:'1+1=2'},{key:'3',text:'5+3=8'},{key:'4',text:'2+2=4'}],['2','4','1','3']),
  so(135,2,5,'easy','Sắp xếp từ lớn đến bé: 9-1, 7-3, 10-2, 6-4',[{key:'1',text:'9-1=8'},{key:'2',text:'7-3=4'},{key:'3',text:'10-2=8'},{key:'4',text:'6-4=2'}],['1','3','2','4'],'9-1=8, 10-2=8, 7-3=4, 6-4=2'),
  so(135,2,6,'easy','Sắp xếp từ bé đến lớn: 0+5, 3+3, 1+8, 4+4',[{key:'1',text:'0+5=5'},{key:'2',text:'3+3=6'},{key:'3',text:'1+8=9'},{key:'4',text:'4+4=8'}],['1','2','4','3']),
  co(135,2,7,'easy','Gạch bỏ phép tính có kết quả khác 6:',[{key:'A',text:'3+3'},{key:'B',text:'4+2'},{key:'C',text:'5+2'},{key:'D',text:'6+0'}],['C']),
  co(135,2,8,'easy','Gạch bỏ phép tính sai:',[{key:'A',text:'5+5=10'},{key:'B',text:'8-3=5'},{key:'C',text:'4+4=9'},{key:'D',text:'7-2=5'}],['C'],'4+4=8 không phải 9'),
  fb(135,2,9,'easy','7 - [b1] = 3',[{key:'b1',text:''}],{b1:'4'},'7 - 4 = 3'),
  fb(135,2,10,'easy','[b1] - 2 = 5',[{key:'b1',text:''}],{b1:'7'},'7 - 2 = 5'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(135,3,1,'easy','Kết quả của 6 + 4 là?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','6 + 4 = 10'),
  sc(135,3,2,'easy','8 - 0 = ?',[{key:'A',text:'0'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','Trừ 0 ra kết quả không đổi'),
  sc(135,3,3,'easy','Phép tính nào bằng 5?',[{key:'A',text:'3+3'},{key:'B',text:'2+3'},{key:'C',text:'4+2'}],'B','2 + 3 = 5'),
  sc(135,3,4,'easy','9 - 9 = ?',[{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'9'}],'A','9 - 9 = 0'),
  tf(135,3,5,'easy','0 + 7 = 7. Đúng hay sai?',true,'Cộng với 0 kết quả không đổi'),
  tf(135,3,6,'easy','5 + 4 = 10. Đúng hay sai?',false,'5 + 4 = 9'),
  tf(135,3,7,'easy','10 - 10 = 0. Đúng hay sai?',true),
  fb(135,3,8,'easy','[b1] + 5 = 10',[{key:'b1',text:''}],{b1:'5'}),
  fb(135,3,9,'easy','9 - [b1] = 4',[{key:'b1',text:''}],{b1:'5'},'9 - 5 = 4'),
  ct(135,3,10,'easy','🌸🌸🌸🌸🌸🌸🌸 Có bao nhiêu bông hoa?','7'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(135,4,1,'medium','Nam có 4 quả bóng, được thêm 3 quả. Nam có bao nhiêu quả?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','4 + 3 = 7'),
  sc(135,4,2,'medium','Có 9 con chim, bay đi 4 con. Còn lại mấy con?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','9 - 4 = 5'),
  sc(135,4,3,'medium','Phép tính nào có kết quả lớn nhất?',[{key:'A',text:'3+6'},{key:'B',text:'4+5'},{key:'C',text:'2+7'}],'A','3+6=9, 4+5=9, 2+7=9 — bằng nhau, chọn A'),
  mc(135,4,4,'medium','Chọn TẤT CẢ phép tính có kết quả bằng 8:',[{key:'A',text:'4+4'},{key:'B',text:'3+5'},{key:'C',text:'6+2'},{key:'D',text:'5+4'}],['A','B','C'],'4+4=8, 3+5=8, 6+2=8'),
  mc(135,4,5,'medium','Chọn TẤT CẢ phép tính có kết quả bằng 6:',[{key:'A',text:'3+3'},{key:'B',text:'4+2'},{key:'C',text:'8-2'},{key:'D',text:'7-2'}],['A','B','C'],'3+3=6, 4+2=6, 8-2=6'),
  mc(135,4,6,'medium','Chọn phép tính có kết quả nhỏ hơn 5:',[{key:'A',text:'2+1'},{key:'B',text:'1+3'},{key:'C',text:'5+0'},{key:'D',text:'3+3'}],['A','B'],'2+1=3, 1+3=4 đều nhỏ hơn 5'),
  mt(135,4,7,'medium','Nối phép tính với kết quả đúng:',[{key:'A',text:'3+5'},{key:'B',text:'9-4'},{key:'C',text:'6+2'},{key:'1',text:'8'},{key:'2',text:'5'},{key:'3',text:'8'}],{A:'1',B:'2',C:'3'}),
  mt(135,4,8,'medium','Nối phép tính với kết quả:',[{key:'A',text:'7-3'},{key:'B',text:'2+5'},{key:'C',text:'10-6'},{key:'1',text:'4'},{key:'2',text:'7'},{key:'3',text:'4'}],{A:'1',B:'2',C:'3'}),
  dd(135,4,9,'medium','Kéo số vào chỗ trống: 5 + ___ = 9',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],['B'],'5 + 4 = 9'),
  dd(135,4,10,'medium','Kéo số vào chỗ trống: 10 - ___ = 7',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],['B'],'10 - 3 = 7'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(135,5,1,'medium','Điền kết quả vào bảng cộng (hàng +3):',[{key:'0+3',text:''},{key:'1+3',text:''},{key:'2+3',text:''},{key:'3+3',text:''}],{'0+3':'3','1+3':'4','2+3':'5','3+3':'6'}),
  tf2(135,5,2,'medium','Điền kết quả vào bảng trừ (hàng 10-x):',[{key:'10-1',text:''},{key:'10-2',text:''},{key:'10-3',text:''},{key:'10-4',text:''}],{'10-1':'9','10-2':'8','10-3':'7','10-4':'6'}),
  nl(135,5,3,'medium','Điền số còn thiếu trên tia số: 0, 2, ___, 6, 8, 10',[{key:'p1',text:''}],{p1:'4'},'Dãy số cách nhau 2'),
  nl(135,5,4,'medium','Điền số còn thiếu: 10, 9, ___, 7, 6, 5',[{key:'p1',text:''}],{p1:'8'},'Dãy giảm dần 1'),
  pz(135,5,5,'medium','Ô số bí ẩn: ___ + 3 = 9, tìm ___',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','6 + 3 = 9'),
  pz(135,5,6,'medium','Ô số bí ẩn: 10 - ___ = 4, tìm ___',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','10 - 6 = 4'),
  pz(135,5,7,'medium','Câu đố: Tôi cộng với 5 thì được 10, tôi là số nào?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','5 + 5 = 10'),
  mt(135,5,8,'medium','Nối bài toán với phép tính đúng:',[{key:'A',text:'Có 7 quả, ăn 3 quả'},{key:'B',text:'Có 4 bút, mua thêm 6 bút'},{key:'1',text:'4+6'},{key:'2',text:'7-3'}],{A:'2',B:'1'}),
  mt(135,5,9,'medium','Nối phép tính tương đương:',[{key:'A',text:'4+3'},{key:'B',text:'5+2'},{key:'C',text:'6+1'},{key:'1',text:'7'},{key:'2',text:'7'},{key:'3',text:'7'}],{A:'1',B:'2',C:'3'},'Tất cả đều bằng 7'),
  dd(135,5,10,'medium','Kéo dấu đúng vào chỗ trống: 8 ___ 3 = 5',[{key:'A',text:'+'},{key:'B',text:'-'},{key:'C',text:'×'}],['B'],'8 - 3 = 5'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(135,6,1,'hard','[b1] + [b2] = 10, với [b1] < [b2], tìm [b1] và [b2]:',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'6'},'4 + 6 = 10'),
  fb(135,6,2,'hard','Điền dấu (+ hoặc -): 3 [b1] 4 [b2] 2 = 5',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'+',b2:'-'},'3 + 4 - 2 = 5'),
  fb(135,6,3,'hard','An có [b1] kẹo, cho bạn 3 cái, còn 6 cái. [b1] = ?',[{key:'b1',text:''}],{b1:'9'},'9 - 3 = 6'),
  pz(135,6,4,'hard','Lan có 4 bông hoa, Hoa có nhiều hơn Lan 3 bông. Hoa có mấy bông?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','4 + 3 = 7'),
  pz(135,6,5,'hard','Có 10 con chim, nửa số đó bay đi. Còn lại mấy con?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','10 ÷ 2 = 5'),
  pz(135,6,6,'hard','Số nào cộng với chính nó thì bằng 8?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','4 + 4 = 8'),
  mc(135,6,7,'hard','Chọn TẤT CẢ cặp số có tổng bằng 10:',[{key:'A',text:'3 và 7'},{key:'B',text:'4 và 6'},{key:'C',text:'2 và 8'},{key:'D',text:'5 và 4'}],['A','B','C'],'3+7=10, 4+6=10, 2+8=10'),
  mc(135,6,8,'hard','Chọn phép tính mà kết quả lớn hơn 7:',[{key:'A',text:'5+3'},{key:'B',text:'4+5'},{key:'C',text:'6+2'},{key:'D',text:'3+3'}],['B'],'4+5=9 > 7'),
  so(135,6,9,'hard','Sắp xếp theo thứ tự kết quả tăng dần: 10-1, 8-4, 6-2, 9-7',[{key:'1',text:'10-1=9'},{key:'2',text:'8-4=4'},{key:'3',text:'6-2=4'},{key:'4',text:'9-7=2'}],['4','2','3','1'],'2, 4, 4, 9'),
  so(135,6,10,'hard','Sắp xếp từ lớn đến bé: 2+8, 3+4, 1+5, 4+4',[{key:'1',text:'2+8=10'},{key:'2',text:'3+4=7'},{key:'3',text:'1+5=6'},{key:'4',text:'4+4=8'}],['1','4','2','3'],'10, 8, 7, 6'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(135,7,1,'hard','Trò chơi: Nối phép tính với kết quả đúng (kéo thẻ)!',[{key:'3+4',text:'7'},{key:'5+3',text:'8'},{key:'9-4',text:'5'},{key:'10-6',text:'4'}]),
  gm(135,7,2,'hard','Trò chơi: Ghép cặp phép cộng và phép trừ cùng kết quả!',[{key:'4+3',text:'7'},{key:'10-3',text:'7'},{key:'5+2',text:'7'},{key:'8-1',text:'7'}]),
  mt(135,7,3,'hard','Nối bài toán với phép tính:',[{key:'A',text:'Mua 3 kẹo, mua thêm 6 kẹo'},{key:'B',text:'Có 10 bóng, vỡ 5 bóng'},{key:'C',text:'8 con cá, thả thêm 2 con'},{key:'1',text:'8+2'},{key:'2',text:'3+6'},{key:'3',text:'10-5'}],{A:'2',B:'3',C:'1'}),
  mt(135,7,4,'hard','Nối phép tính với lời giải:',[{key:'A',text:'7-3'},{key:'B',text:'4+6'},{key:'C',text:'9-5'},{key:'1',text:'10'},{key:'2',text:'4'},{key:'3',text:'4'}],{A:'2',B:'1',C:'3'}),
  mt(135,7,5,'hard','Nối số với phép trừ tương ứng:',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'9'},{key:'1',text:'10-7'},{key:'2',text:'10-4'},{key:'3',text:'10-1'}],{A:'1',B:'2',C:'3'}),
  fb(135,7,6,'hard','Bé Minh có 5 cái bánh, mẹ cho thêm [b1] cái, bé có 9 cái. [b1] = ?',[{key:'b1',text:''}],{b1:'4'},'5 + 4 = 9'),
  fb(135,7,7,'hard','Điền số: 3 + 4 = 4 + [b1]',[{key:'b1',text:''}],{b1:'3'},'Tính chất giao hoán'),
  fb(135,7,8,'hard','Tổng của hai số là 10, một số là 6, số kia là [b1].',[{key:'b1',text:''}],{b1:'4'},'10 - 6 = 4'),
  dd(135,7,9,'hard','Kéo dấu để hoàn thành: 7 ___ 3 ___ 2 = 6',[{key:'A',text:'-'},{key:'B',text:'+'},{key:'C',text:'-'}],['A','B'],'7 - 3 + 2 = 6'),
  dd(135,7,10,'hard','Kéo số thích hợp: ___ + ___ = 9 (hai số bằng nhau gần nhất)',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'4'}],['A','B'],'4 + 5 = 9'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(135,8,1,'hard','Chọn TẤT CẢ phép tính đúng:',[{key:'A',text:'6+4=10'},{key:'B',text:'8-3=5'},{key:'C',text:'5+5=9'},{key:'D',text:'7-2=5'}],['A','B','D'],'5+5=10 không phải 9'),
  mc(135,8,2,'hard','Chọn các số khi cộng với 3 thì bằng hoặc lớn hơn 8:',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'4'}],['A','B','C'],'5+3=8, 6+3=9, 7+3=10'),
  mc(135,8,3,'hard','Chọn phép tính có kết quả bằng nhau:',[{key:'A',text:'3+4 và 2+5'},{key:'B',text:'6+2 và 5+4'},{key:'C',text:'8-3 và 6-1'},{key:'D',text:'9-4 và 7-2'}],['A','C','D'],'3+4=7=2+5, 8-3=5=6-1, 9-4=5=7-2'),
  pz(135,8,4,'hard','Mẹ mua 10 quả cam, đã ăn một số quả, còn 7 quả. Đã ăn mấy quả?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','10 - 7 = 3'),
  pz(135,8,5,'hard','Tuổi của Lan và Hoa cộng lại là 10. Lan 6 tuổi. Hoa mấy tuổi?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','10 - 6 = 4'),
  pz(135,8,6,'hard','Dãy số: 1, 3, 5, 7, ___. Số tiếp theo là?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','Dãy số lẻ, cộng thêm 2'),
  so(135,8,7,'hard','Sắp xếp các bài toán theo kết quả tăng dần: (10-8), (5+4), (3+3), (7-1)',[{key:'1',text:'10-8=2'},{key:'2',text:'5+4=9'},{key:'3',text:'3+3=6'},{key:'4',text:'7-1=6'}],['1','3','4','2'],'2, 6, 6, 9'),
  so(135,8,8,'hard','Sắp xếp từ lớn đến bé: (4+4), (10-0), (6+3), (5+5)',[{key:'1',text:'4+4=8'},{key:'2',text:'10-0=10'},{key:'3',text:'6+3=9'},{key:'4',text:'5+5=10'}],['2','4','3','1'],'10, 10, 9, 8'),
  co(135,8,9,'hard','Gạch bỏ phép tính SAI:',[{key:'A',text:'4+6=10'},{key:'B',text:'9-3=7'},{key:'C',text:'5+3=8'},{key:'D',text:'8-5=3'}],['B'],'9-3=6 không phải 7'),
  co(135,8,10,'hard','Gạch bỏ số KHÔNG phải kết quả của phép cộng hai số có tổng bằng 10:',[{key:'A',text:'5+5'},{key:'B',text:'4+7'},{key:'C',text:'3+7'},{key:'D',text:'6+4'}],['B'],'4+7=11 không bằng 10'),
];

// ─── LESSON 136: Khối lập phương, khối hộp chữ nhật — 3D shapes ────────────

const L136: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(136,1,1,'easy','Khối lập phương có bao nhiêu mặt?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','Khối lập phương có 6 mặt vuông bằng nhau'),
  sc(136,1,2,'easy','Khối hộp chữ nhật có bao nhiêu đỉnh?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],'B','Khối hộp chữ nhật có 8 đỉnh'),
  sc(136,1,3,'easy','Khối lập phương có bao nhiêu cạnh?',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'12'}],'C','Khối lập phương có 12 cạnh'),
  sc(136,1,4,'easy','Hình nào là khối lập phương?',[{key:'A',text:'Viên gạch'},{key:'B',text:'Con xúc xắc'},{key:'C',text:'Hộp bút dài'}],'B','Con xúc xắc có 6 mặt vuông bằng nhau'),
  tf(136,1,5,'easy','Khối lập phương có 6 mặt đều là hình vuông. Đúng hay sai?',true),
  tf(136,1,6,'easy','Khối hộp chữ nhật có 6 mặt đều là hình chữ nhật giống nhau. Đúng hay sai?',false,'Khối hộp chữ nhật có 3 cặp mặt chữ nhật bằng nhau'),
  tf(136,1,7,'easy','Khối lập phương là trường hợp đặc biệt của khối hộp chữ nhật. Đúng hay sai?',true,'Khi tất cả các cạnh bằng nhau'),
  fb(136,1,8,'easy','Khối lập phương có [b1] mặt, [b2] đỉnh, [b3] cạnh.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'6',b2:'8',b3:'12'}),
  fb(136,1,9,'easy','Khối hộp chữ nhật có [b1] mặt.',[{key:'b1',text:''}],{b1:'6'}),
  fb(136,1,10,'easy','Khối hộp chữ nhật có [b1] cạnh.',[{key:'b1',text:''}],{b1:'12'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(136,2,1,'easy','🎲🎲🎲🎲🎲 Có bao nhiêu khối lập phương (xúc xắc)?','5'),
  ct(136,2,2,'easy','📦📦📦📦📦📦📦 Có bao nhiêu khối hộp chữ nhật (hộp quà)?','7'),
  ct(136,2,3,'easy','🎲🎲🎲📦📦🎲📦🎲🎲📦 Có bao nhiêu hình khối tất cả?','10'),
  so(136,2,4,'easy','Sắp xếp số cạnh từ ít đến nhiều: Hình tam giác (3), Khối lập phương (12), Hình vuông (4), Khối hộp chữ nhật (12)',[{key:'1',text:'Tam giác:3'},{key:'2',text:'Khối LP:12'},{key:'3',text:'Hình vuông:4'},{key:'4',text:'Khối HCN:12'}],['1','3','2','4']),
  so(136,2,5,'easy','Sắp xếp từ ít mặt đến nhiều mặt: Hình tròn (1), Khối cầu (1), Khối lập phương (6), Khối hộp chữ nhật (6)',[{key:'1',text:'Hình tròn:1'},{key:'2',text:'Khối cầu:1'},{key:'3',text:'Khối LP:6'},{key:'4',text:'Khối HCN:6'}],['1','2','3','4']),
  so(136,2,6,'easy','Sắp xếp số đỉnh từ ít đến nhiều: Hình vuông (4), Hình tam giác (3), Khối lập phương (8), Khối hộp chữ nhật (8)',[{key:'1',text:'Hình vuông:4'},{key:'2',text:'Hình tam giác:3'},{key:'3',text:'Khối LP:8'},{key:'4',text:'Khối HCN:8'}],['2','1','3','4']),
  co(136,2,7,'easy','Gạch bỏ hình KHÔNG phải hình khối (3D):',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Hình vuông'},{key:'C',text:'Khối hộp chữ nhật'},{key:'D',text:'Hình tròn'}],['B','D'],'Hình vuông và hình tròn là hình phẳng (2D)'),
  co(136,2,8,'easy','Gạch bỏ đặc điểm SAI của khối lập phương:',[{key:'A',text:'6 mặt vuông'},{key:'B',text:'8 đỉnh'},{key:'C',text:'10 cạnh'},{key:'D',text:'12 cạnh'}],['C'],'Khối lập phương có 12 cạnh không phải 10'),
  fb(136,2,9,'easy','Mặt của khối lập phương là hình [b1].',[{key:'b1',text:''}],{b1:'vuông'}),
  fb(136,2,10,'easy','Mặt của khối hộp chữ nhật là hình [b1].',[{key:'b1',text:''}],{b1:'chữ nhật'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(136,3,1,'easy','Vật nào có dạng khối hộp chữ nhật?',[{key:'A',text:'Quả bóng'},{key:'B',text:'Viên gạch'},{key:'C',text:'Cái nón'}],'B'),
  sc(136,3,2,'easy','Vật nào có dạng khối lập phương?',[{key:'A',text:'Hộp sữa dài'},{key:'B',text:'Con xúc xắc'},{key:'C',text:'Quả bóng'}],'B'),
  sc(136,3,3,'easy','Khối lập phương và khối hộp chữ nhật đều có bao nhiêu đỉnh?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],'B','Cả hai đều có 8 đỉnh'),
  sc(136,3,4,'easy','Khối hộp chữ nhật có bao nhiêu cạnh?',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'12'}],'C','12 cạnh'),
  tf(136,3,5,'easy','Khối hộp chữ nhật có 8 đỉnh. Đúng hay sai?',true),
  tf(136,3,6,'easy','Khối lập phương có 8 cạnh. Đúng hay sai?',false,'Khối lập phương có 12 cạnh'),
  tf(136,3,7,'easy','Tất cả các mặt của khối lập phương đều bằng nhau. Đúng hay sai?',true),
  fb(136,3,8,'easy','Khối lập phương có [b1] mặt bằng nhau.',[{key:'b1',text:''}],{b1:'6'}),
  fb(136,3,9,'easy','Khối hộp chữ nhật có [b1] đỉnh.',[{key:'b1',text:''}],{b1:'8'}),
  ct(136,3,10,'easy','🎲🎲🎲🎲🎲🎲 Đếm số khối lập phương:','6'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(136,4,1,'medium','Nếu xếp 2 khối lập phương cạnh nhau thì được hình gì?',[{key:'A',text:'Khối lập phương lớn hơn'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình trụ'}],'B'),
  sc(136,4,2,'medium','Khối hộp chữ nhật có bao nhiêu cặp mặt bằng nhau?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','3 cặp mặt'),
  sc(136,4,3,'medium','Đặc điểm nào CHỈ có ở khối lập phương, không có ở khối hộp chữ nhật thông thường?',[{key:'A',text:'Có 6 mặt'},{key:'B',text:'Có 8 đỉnh'},{key:'C',text:'Tất cả các mặt bằng nhau'}],'C'),
  mc(136,4,4,'medium','Chọn TẤT CẢ đặc điểm đúng của khối lập phương:',[{key:'A',text:'6 mặt hình vuông'},{key:'B',text:'12 cạnh bằng nhau'},{key:'C',text:'8 đỉnh'},{key:'D',text:'4 mặt'}],['A','B','C']),
  mc(136,4,5,'medium','Chọn TẤT CẢ đặc điểm đúng của khối hộp chữ nhật:',[{key:'A',text:'6 mặt hình chữ nhật'},{key:'B',text:'12 cạnh'},{key:'C',text:'8 đỉnh'},{key:'D',text:'Tất cả mặt bằng nhau'}],['A','B','C']),
  mc(136,4,6,'medium','Chọn TẤT CẢ vật có dạng khối hộp chữ nhật:',[{key:'A',text:'Hộp bánh quy dài'},{key:'B',text:'Viên gạch'},{key:'C',text:'Con xúc xắc'},{key:'D',text:'Quyển sách'}],['A','B','D']),
  mt(136,4,7,'medium','Nối hình với số mặt tương ứng:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình vuông'},{key:'1',text:'6'},{key:'2',text:'6'},{key:'3',text:'1'}],{A:'1',B:'2',C:'3'}),
  mt(136,4,8,'medium','Nối hình với số cạnh tương ứng:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình vuông'},{key:'1',text:'12'},{key:'2',text:'12'},{key:'3',text:'4'}],{A:'1',B:'2',C:'3'}),
  dd(136,4,9,'medium','Kéo từ đúng: Khối lập phương có ___ mặt hình vuông.',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],['B']),
  dd(136,4,10,'medium','Kéo số đúng: Khối hộp chữ nhật có ___ đỉnh.',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],['B']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(136,5,1,'medium','Điền số vào bảng so sánh hình khối:',[{key:'KLP_mat',text:''},{key:'KLP_dinh',text:''},{key:'KLP_canh',text:''},{key:'KHCN_mat',text:''},{key:'KHCN_dinh',text:''},{key:'KHCN_canh',text:''}],{KLP_mat:'6',KLP_dinh:'8',KLP_canh:'12',KHCN_mat:'6',KHCN_dinh:'8',KHCN_canh:'12'}),
  tf2(136,5,2,'medium','Điền số mặt, đỉnh, cạnh cho các hình:',[{key:'vuong_mat',text:''},{key:'vuong_dinh',text:''},{key:'vuong_canh',text:''}],{vuong_mat:'1',vuong_dinh:'4',vuong_canh:'4'},'Hình vuông phẳng: 1 mặt, 4 đỉnh, 4 cạnh'),
  nl(136,5,3,'medium','Đếm mặt: hình vuông 1, khối lập phương ___',[{key:'p1',text:''}],{p1:'6'}),
  nl(136,5,4,'medium','Đếm cạnh: hình vuông 4, khối lập phương ___',[{key:'p1',text:''}],{p1:'12'}),
  pz(136,5,5,'medium','Có 3 khối lập phương xếp thành hàng. Tổng số mặt nhìn thấy bên ngoài là bao nhiêu?',[{key:'A',text:'14'},{key:'B',text:'16'},{key:'C',text:'18'}],'A','2 đầu × 4 mặt + 1 mặt trên + 1 mặt dưới + 2 mặt bên = 14 mặt ngoài'),
  pz(136,5,6,'medium','Đồ vật nào KHÔNG thể lăn được?',[{key:'A',text:'Quả bóng'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Khối trụ'}],'B','Khối lập phương có mặt phẳng nên không lăn được'),
  pz(136,5,7,'medium','Em xếp 4 khối lập phương nhỏ cạnh nhau theo hình vuông. Hình tạo thành trông giống gì?',[{key:'A',text:'Khối lập phương lớn hơn'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình tròn'}],'B'),
  mt(136,5,8,'medium','Nối đồ vật với hình khối tương ứng:',[{key:'A',text:'Hộp kem đánh răng'},{key:'B',text:'Con xúc xắc'},{key:'C',text:'Viên gạch'},{key:'1',text:'Khối lập phương'},{key:'2',text:'Khối hộp chữ nhật'},{key:'3',text:'Khối hộp chữ nhật'}],{A:'2',B:'1',C:'3'}),
  mt(136,5,9,'medium','Nối tên gọi với đặc điểm:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'1',text:'Tất cả các mặt bằng nhau'},{key:'2',text:'Có 3 cặp mặt bằng nhau'}],{A:'1',B:'2'}),
  dd(136,5,10,'medium','Kéo từ đúng điền vào: "Khối lập phương có ___ mặt là hình vuông"',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],['B']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(136,6,1,'hard','Khối lập phương có [b1] mặt, [b2] đỉnh, [b3] cạnh. Tổng là [b4].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''},{key:'b4',text:''}],{b1:'6',b2:'8',b3:'12',b4:'26'},'6+8+12=26'),
  fb(136,6,2,'hard','Khối hộp chữ nhật có [b1] cặp mặt bằng nhau. Tổng số mặt là [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'3',b2:'6'}),
  fb(136,6,3,'hard','Mô tả khối lập phương: tất cả [b1] cạnh bằng nhau, tất cả [b2] mặt là hình [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'12',b2:'6',b3:'vuông'}),
  pz(136,6,4,'hard','Có một hộp quà hình hộp chữ nhật. Mẹ muốn dán giấy bọc tất cả các mặt. Cần dán bao nhiêu mặt?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','Khối hộp chữ nhật có 6 mặt'),
  pz(136,6,5,'hard','Nam xếp các khối lập phương thành hình chữ L với 3 khối hàng ngang và 2 khối hàng dọc (chia sẻ 1 khối). Tổng khối là bao nhiêu?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'A','3 + 2 - 1 = 4 khối'),
  pz(136,6,6,'hard','Bề mặt tiếp xúc giữa 2 khối lập phương khi xếp cạnh nhau là hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'}],'B','Mặt khối lập phương là hình vuông'),
  mc(136,6,7,'hard','Chọn TẤT CẢ câu đúng về khối lập phương và khối hộp chữ nhật:',[{key:'A',text:'Cùng có 8 đỉnh'},{key:'B',text:'Cùng có 12 cạnh'},{key:'C',text:'Cùng có 6 mặt'},{key:'D',text:'Cùng có tất cả mặt bằng nhau'}],['A','B','C'],'D sai vì khối HCN có 3 cặp mặt khác nhau'),
  mc(136,6,8,'hard','Chọn TẤT CẢ vật có dạng khối lập phương:',[{key:'A',text:'Con xúc xắc'},{key:'B',text:'Khối Rubik'},{key:'C',text:'Hộp sữa vuông'},{key:'D',text:'Hộp bút dài'}],['A','B','C'],'D là khối hộp chữ nhật'),
  so(136,6,9,'hard','Sắp xếp theo số đỉnh tăng dần: Hình tam giác (3), Hình vuông (4), Khối lập phương (8), Khối hộp chữ nhật (8)',[{key:'1',text:'Tam giác:3'},{key:'2',text:'Hình vuông:4'},{key:'3',text:'KLP:8'},{key:'4',text:'KHCN:8'}],['1','2','3','4']),
  so(136,6,10,'hard','Sắp xếp theo số mặt giảm dần: Khối lập phương (6), Hình vuông (1), Khối hộp chữ nhật (6), Hình tròn (1)',[{key:'1',text:'KLP:6'},{key:'2',text:'Hình vuông:1'},{key:'3',text:'KHCN:6'},{key:'4',text:'Hình tròn:1'}],['1','3','2','4']),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(136,7,1,'hard','Trò chơi: Ghép hình khối với tên gọi đúng!',[{key:'🎲',text:'Khối lập phương'},{key:'📦',text:'Khối hộp chữ nhật'},{key:'⬛',text:'Hình vuông'},{key:'⬜',text:'Hình chữ nhật'}]),
  gm(136,7,2,'hard','Trò chơi: Kéo đặc điểm vào đúng hình khối!',[{key:'6 mặt vuông bằng nhau',text:'Khối lập phương'},{key:'3 cặp mặt chữ nhật',text:'Khối hộp chữ nhật'},{key:'12 cạnh bằng nhau',text:'Khối lập phương'},{key:'8 đỉnh',text:'Cả hai'}]),
  mt(136,7,3,'hard','Nối vật với hình khối:',[{key:'A',text:'Hộp giày'},{key:'B',text:'Khối Rubik'},{key:'C',text:'Viên gạch'},{key:'D',text:'Con xúc xắc'},{key:'1',text:'Khối hộp chữ nhật'},{key:'2',text:'Khối lập phương'}],{A:'1',B:'2',C:'1',D:'2'}),
  mt(136,7,4,'hard','Nối tên đặc điểm với số lượng:',[{key:'A',text:'Số mặt khối LP'},{key:'B',text:'Số đỉnh khối HCN'},{key:'C',text:'Số cạnh khối LP'},{key:'1',text:'6'},{key:'2',text:'8'},{key:'3',text:'12'}],{A:'1',B:'2',C:'3'}),
  mt(136,7,5,'hard','Nối hình phẳng với hình khối có mặt là hình đó:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'1',text:'Khối lập phương'},{key:'2',text:'Khối hộp chữ nhật'}],{A:'1',B:'2'}),
  fb(136,7,6,'hard','Xếp 2 khối lập phương nhỏ cạnh nhau, số cạnh nhìn thấy bên ngoài là [b1].',[{key:'b1',text:''}],{b1:'20'},'Hai khối 24 cạnh trừ 4 cạnh chồng nhau = 20'),
  fb(136,7,7,'hard','Khối lập phương có cạnh 1cm thì chu vi một mặt là [b1] cm.',[{key:'b1',text:''}],{b1:'4'},'Mỗi mặt là hình vuông cạnh 1cm, chu vi = 4×1=4cm'),
  fb(136,7,8,'hard','Một khối hộp chữ nhật có 3 cặp mặt. Nếu mỗi cặp mặt khác nhau thì có tối đa [b1] kích thước khác nhau.',[{key:'b1',text:''}],{b1:'3'},'Chiều dài, chiều rộng, chiều cao'),
  dd(136,7,9,'hard','Kéo từ đúng: Khối lập phương là ___ hộp chữ nhật khi tất cả cạnh bằng nhau.',[{key:'A',text:'loại khác'},{key:'B',text:'trường hợp đặc biệt của'},{key:'C',text:'lớn hơn'}],['B']),
  dd(136,7,10,'hard','Kéo số đúng: Khối hộp chữ nhật có ___ cặp mặt bằng nhau.',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],['B']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(136,8,1,'hard','Chọn TẤT CẢ câu đúng:',[{key:'A',text:'Khối LP có 6 mặt vuông'},{key:'B',text:'Khối HCN có 8 đỉnh'},{key:'C',text:'Khối LP có 10 cạnh'},{key:'D',text:'Khối HCN có 12 cạnh'}],['A','B','D'],'Khối LP có 12 cạnh không phải 10'),
  mc(136,8,2,'hard','Chọn TẤT CẢ hình là hình phẳng (2D), không phải hình khối (3D):',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Khối lập phương'},{key:'D',text:'Hình tròn'}],['A','B','D']),
  mc(136,8,3,'hard','Chọn TẤT CẢ điểm giống nhau của khối lập phương và khối hộp chữ nhật:',[{key:'A',text:'6 mặt'},{key:'B',text:'8 đỉnh'},{key:'C',text:'12 cạnh'},{key:'D',text:'Tất cả mặt bằng nhau'}],['A','B','C']),
  pz(136,8,4,'hard','Bạn An có 4 khối lập phương. Bạn xếp thành 2 hàng, mỗi hàng 2 khối. Hình tạo thành có bao nhiêu mặt phẳng bên ngoài?',[{key:'A',text:'12'},{key:'B',text:'14'},{key:'C',text:'16'}],'B','Xếp 2×2: mặt trên 4, mặt dưới 4, 4 mặt bên, trừ 4 mặt tiếp xúc = 14'),
  pz(136,8,5,'hard','Dùng đất nặn làm một khối lập phương. Cắt đôi theo chiều ngang, mỗi nửa có bao nhiêu mặt?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','Khối LP gốc 6 mặt, cắt đôi mỗi nửa có 5 mặt (4 mặt cũ + 1 mặt cắt mới)'),
  pz(136,8,6,'hard','Khối hộp chữ nhật có chiều dài, rộng, cao khác nhau. Có bao nhiêu mặt khác kích thước so với các mặt còn lại?',[{key:'A',text:'0'},{key:'B',text:'3'},{key:'C',text:'6'}],'B','3 cặp mặt, mỗi cặp có kích thước khác nhau'),
  so(136,8,7,'hard','Sắp xếp theo số mặt tăng dần: Hình tròn (1), Khối cầu (1), Hình tam giác (1), Khối lập phương (6)',[{key:'1',text:'Hình tròn:1'},{key:'2',text:'Khối cầu:1'},{key:'3',text:'Hình tam giác:1'},{key:'4',text:'Khối LP:6'}],['1','2','3','4']),
  so(136,8,8,'hard','Sắp xếp theo số cạnh giảm dần: Hình tam giác (3), Hình vuông (4), Khối lập phương (12), Hình lục giác (6)',[{key:'1',text:'Tam giác:3'},{key:'2',text:'Vuông:4'},{key:'3',text:'KLP:12'},{key:'4',text:'Lục giác:6'}],['3','4','2','1'],'12, 6, 4, 3'),
  co(136,8,9,'hard','Gạch bỏ đặc điểm SAI của khối hộp chữ nhật:',[{key:'A',text:'6 mặt'},{key:'B',text:'8 đỉnh'},{key:'C',text:'10 cạnh'},{key:'D',text:'12 cạnh'}],['C'],'Khối HCN có 12 cạnh không phải 10'),
  co(136,8,10,'hard','Gạch bỏ vật KHÔNG có dạng khối lập phương hoặc khối hộp chữ nhật:',[{key:'A',text:'Con xúc xắc'},{key:'B',text:'Quả bóng'},{key:'C',text:'Hộp giày'},{key:'D',text:'Cái nón'}],['B','D'],'Quả bóng là khối cầu, cái nón là khối nón'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();
  try {
    // Delete existing
    await qr.query('DELETE FROM quizzes WHERE lessonId IN (135,136)');

    for (const row of L135) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 135 — ${L135.length} questions inserted`);

    for (const row of L136) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 136 — ${L136.length} questions inserted`);

    await qr.commitTransaction();
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
