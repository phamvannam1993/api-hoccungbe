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

// ─── LESSON 142: Luyện tập chung — comprehensive review ───────────────────
const L142: Row[] = [

  // ── Ex 1 (easy): 4×single_choice, 3×true_false, 3×fill_blank ──────────
  // Topics: numbers 0-10, comparison, shapes
  sc(142,1,1,'easy','Số 7 đứng liền sau số nào?',
    [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','6 đứng liền trước 7.'),
  sc(142,1,2,'easy','Hình nào có 3 cạnh?',
    [{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'}],'C'),
  sc(142,1,3,'easy','Số nào lớn hơn 5 và nhỏ hơn 8?',
    [{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'9'}],'B'),
  sc(142,1,4,'easy','3 + 4 = ?',
    [{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B'),
  tf(142,1,5,'easy','Số 9 lớn hơn số 6. Đúng hay sai?',true),
  tf(142,1,6,'easy','Hình vuông có 3 cạnh. Đúng hay sai?',false,'Hình vuông có 4 cạnh bằng nhau.'),
  tf(142,1,7,'easy','5 + 5 = 10. Đúng hay sai?',true),
  fb(142,1,8,'easy','Số liền sau của 8 là [b1].',[{key:'b1',text:''}],{b1:'9'}),
  fb(142,1,9,'easy','4 + [b1] = 7.',[{key:'b1',text:''}],{b1:'3'}),
  fb(142,1,10,'easy','Số liền trước của 6 là [b1].',[{key:'b1',text:''}],{b1:'5'}),

  // ── Ex 2 (easy): 3×counting, 3×sorting, 2×cross_out, 2×fill_blank ─────
  // Topics: counting objects, ordering numbers
  ct(142,2,1,'easy','🍎🍎🍎🍎🍎 Có bao nhiêu quả táo?','5'),
  ct(142,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao?','8'),
  ct(142,2,3,'easy','🐶🐶🐶🐶🐶🐶🐶 Có bao nhiêu con chó?','7'),
  so(142,2,4,'easy','Sắp xếp từ bé đến lớn: 5, 2, 8, 1',
    [{key:'1',text:'5'},{key:'2',text:'2'},{key:'3',text:'8'},{key:'4',text:'1'}],['4','2','1','3']),
  so(142,2,5,'easy','Sắp xếp từ lớn đến bé: 3, 7, 0, 9',
    [{key:'1',text:'3'},{key:'2',text:'7'},{key:'3',text:'0'},{key:'4',text:'9'}],['4','2','1','3']),
  so(142,2,6,'easy','Sắp xếp từ bé đến lớn: 6, 4, 10, 2',
    [{key:'1',text:'6'},{key:'2',text:'4'},{key:'3',text:'10'},{key:'4',text:'2'}],['4','2','1','3']),
  co(142,2,7,'easy','Gạch bỏ số lẻ trong dãy:',
    [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'}],['B','D']),
  co(142,2,8,'easy','Gạch bỏ số không thuộc dãy số từ 0 đến 5:',
    [{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'1'},{key:'D',text:'8'}],['B','D']),
  fb(142,2,9,'easy','2 + [b1] = 6.',[{key:'b1',text:''}],{b1:'4'}),
  fb(142,2,10,'easy','9 - [b1] = 3.',[{key:'b1',text:''}],{b1:'6'}),

  // ── Ex 3 (easy): 4×single_choice, 3×true_false, 2×fill_blank, 1×counting ──
  // Topics: subtraction within 10, spatial directions, comparison
  sc(142,3,1,'easy','10 - 4 = ?',
    [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B'),
  sc(142,3,2,'easy','Vật nào ở bên trái trong hình: mèo ở trái, chó ở phải?',
    [{key:'A',text:'Con mèo'},{key:'B',text:'Con chó'},{key:'C',text:'Cả hai'}],'A'),
  sc(142,3,3,'easy','Số 0 là số?',
    [{key:'A',text:'Số lớn nhất'},{key:'B',text:'Số nhỏ nhất trong 0-10'},{key:'C',text:'Số âm'}],'B'),
  sc(142,3,4,'easy','Hình nào không có góc?',
    [{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tròn'}],'C'),
  tf(142,3,5,'easy','8 - 3 = 5. Đúng hay sai?',true),
  tf(142,3,6,'easy','Số 4 đứng trước số 3 trong dãy số. Đúng hay sai?',false,'Số 3 đứng trước số 4.'),
  tf(142,3,7,'easy','Hình chữ nhật có 4 cạnh. Đúng hay sai?',true),
  fb(142,3,8,'easy','7 - [b1] = 4.',[{key:'b1',text:''}],{b1:'3'}),
  fb(142,3,9,'easy','[b1] + 2 = 9.',[{key:'b1',text:''}],{b1:'7'}),
  ct(142,3,10,'easy','🌸🌸🌸🌸🌸🌸 Có bao nhiêu bông hoa?','6'),

  // ── Ex 4 (medium): 3×single_choice, 3×multiple_choice, 2×matching, 2×drag_drop ──
  // Topics: addition/subtraction, comparison, shapes
  sc(142,4,1,'medium','Số nào bằng 3 + 5?',
    [{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B'),
  sc(142,4,2,'medium','Có 10 quả cam, ăn 6 quả. Còn lại bao nhiêu?',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B'),
  sc(142,4,3,'medium','Số nào vừa lớn hơn 4 vừa nhỏ hơn 7?',
    [{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'8'}],'B'),
  mc(142,4,4,'medium','Chọn tất cả các số chẵn từ 0 đến 10:',
    [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'6'},{key:'E',text:'7'}],['A','C','D']),
  mc(142,4,5,'medium','Chọn tất cả phép tính có kết quả bằng 6:',
    [{key:'A',text:'3+3'},{key:'B',text:'4+2'},{key:'C',text:'7-1'},{key:'D',text:'5+2'}],['A','B','C']),
  mc(142,4,6,'medium','Chọn tất cả các hình có góc vuông:',
    [{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],['B','C']),
  mt(142,4,7,'medium','Nối phép tính với kết quả:',
    [{key:'L1',text:'2+3'},{key:'L2',text:'4+4'},{key:'L3',text:'9-2'},{key:'R1',text:'8'},{key:'R2',text:'5'},{key:'R3',text:'7'}],
    {L1:'R2',L2:'R1',L3:'R3'}),
  mt(142,4,8,'medium','Nối số với số lượng tương ứng:',
    [{key:'L1',text:'3'},{key:'L2',text:'5'},{key:'L3',text:'7'},{key:'R1',text:'🍊🍊🍊🍊🍊'},{key:'R2',text:'🍊🍊🍊'},{key:'R3',text:'🍊🍊🍊🍊🍊🍊🍊'}],
    {L1:'R2',L2:'R1',L3:'R3'}),
  dd(142,4,9,'medium','Kéo số vào ô trống: 5 + __ = 10',
    [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],['B']),
  dd(142,4,10,'medium','Kéo dấu thích hợp vào chỗ trống: 8 __ 3 = 5',
    [{key:'A',text:'+'},{key:'B',text:'-'},{key:'C',text:'×'}],['B']),

  // ── Ex 5 (medium): 2×table_fill, 2×number_line, 3×puzzle, 2×matching, 1×drag_drop ──
  // Topics: number patterns, sequences, addition/subtraction
  tf2(142,5,1,'medium','Điền số vào bảng cộng:',
    [{key:'r1c1',text:'2+1=?'},{key:'r1c2',text:'3+2=?'},{key:'r2c1',text:'4+3=?'},{key:'r2c2',text:'5+4=?'}],
    {r1c1:'3',r1c2:'5',r2c1:'7',r2c2:'9'}),
  tf2(142,5,2,'medium','Điền số vào bảng trừ:',
    [{key:'r1c1',text:'5-1=?'},{key:'r1c2',text:'6-2=?'},{key:'r2c1',text:'8-3=?'},{key:'r2c2',text:'10-4=?'}],
    {r1c1:'4',r1c2:'4',r2c1:'5',r2c2:'6'}),
  nl(142,5,3,'medium','Điền số còn thiếu trên tia số từ 0 đến 10:',
    [{key:'p0',text:'0'},{key:'p1',text:'?'},{key:'p2',text:'2'},{key:'p3',text:'?'},{key:'p4',text:'4'}],
    {p1:'1',p3:'3'}),
  nl(142,5,4,'medium','Điền số còn thiếu trên tia số từ 5 đến 10:',
    [{key:'p5',text:'5'},{key:'p6',text:'?'},{key:'p7',text:'7'},{key:'p8',text:'?'},{key:'p9',text:'9'},{key:'p10',text:'?'}],
    {p6:'6',p8:'8',p10:'10'}),
  pz(142,5,5,'medium','? + 3 = 8. Tìm số ?',
    [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','8 - 3 = 5.'),
  pz(142,5,6,'medium','10 - ? = 6. Tìm số ?',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','10 - 4 = 6.'),
  pz(142,5,7,'medium','? - 2 = 7. Tìm số ?',
    [{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','9 - 2 = 7.'),
  mt(142,5,8,'medium','Nối hình với tên gọi:',
    [{key:'L1',text:'△'},{key:'L2',text:'□'},{key:'L3',text:'○'},{key:'R1',text:'Hình tròn'},{key:'R2',text:'Hình vuông'},{key:'R3',text:'Hình tam giác'}],
    {L1:'R3',L2:'R2',L3:'R1'}),
  mt(142,5,9,'medium','Nối phép tính với kết quả:',
    [{key:'L1',text:'6+3'},{key:'L2',text:'7+2'},{key:'L3',text:'5+5'},{key:'R1',text:'10'},{key:'R2',text:'9'},{key:'R3',text:'9'}],
    {L1:'R2',L2:'R3',L3:'R1'}),
  dd(142,5,10,'medium','Kéo số vào ô trống: 7 - __ = 3',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],['B']),

  // ── Ex 6 (hard): 3×fill_blank, 3×puzzle, 2×multiple_choice, 2×sorting ──
  // Topics: complex addition/subtraction, comparison chains
  fb(142,6,1,'hard','3 + 4 + 2 = [b1].',[{key:'b1',text:''}],{b1:'9'}),
  fb(142,6,2,'hard','10 - 3 - 2 = [b1].',[{key:'b1',text:''}],{b1:'5'}),
  fb(142,6,3,'hard','An có 6 cái kẹo, mua thêm 3 cái, cho bạn 4 cái. An còn [b1] cái kẹo.',[{key:'b1',text:''}],{b1:'5'}),
  pz(142,6,4,'hard','Tìm số lớn nhất trong: 7, 3, 9, 5, 1',
    [{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'5'}],'B'),
  pz(142,6,5,'hard','Tổng của hai số là 10, hiệu của chúng là 2. Số lớn hơn là?',
    [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','(10+2)/2=6, (10-2)/2=4.'),
  pz(142,6,6,'hard','Có 5 con gà và 3 con vịt. Tất cả bao nhiêu con? Sau đó bán đi 4 con. Còn lại?',
    [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','5+3=8, 8-4=4.'),
  mc(142,6,7,'hard','Chọn tất cả phép tính có kết quả bằng 10:',
    [{key:'A',text:'5+5'},{key:'B',text:'6+4'},{key:'C',text:'7+3'},{key:'D',text:'8+3'}],['A','B','C']),
  mc(142,6,8,'hard','Chọn tất cả số lớn hơn 6:',
    [{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'10'}],['B','C','D']),
  so(142,6,9,'hard','Sắp xếp kết quả từ bé đến lớn: 3+5, 2+4, 1+9, 4+3',
    [{key:'1',text:'3+5=8'},{key:'2',text:'2+4=6'},{key:'3',text:'1+9=10'},{key:'4',text:'4+3=7'}],['2','4','1','3']),
  so(142,6,10,'hard','Sắp xếp từ lớn đến bé: 10-1, 10-3, 10-5, 10-7',
    [{key:'1',text:'10-1=9'},{key:'2',text:'10-3=7'},{key:'3',text:'10-5=5'},{key:'4',text:'10-7=3'}],['1','2','3','4']),

  // ── Ex 7 (hard): 2×game, 3×matching, 3×fill_blank, 2×drag_drop ──────
  // Topics: all topics mixed — game pairs, matching concepts
  gm(142,7,1,'hard','Ghép đôi phép tính bằng nhau:',
    [{key:'A',text:'3+4'},{key:'B',text:'8-1'},{key:'C',text:'2+5'},{key:'D',text:'4+3'}]),
  gm(142,7,2,'hard','Ghép đôi số với hình ảnh tương ứng:',
    [{key:'A',text:'4'},{key:'B',text:'🍎🍎🍎🍎'},{key:'C',text:'6'},{key:'D',text:'🍎🍎🍎🍎🍎🍎'}]),
  mt(142,7,3,'hard','Nối câu hỏi với câu trả lời:',
    [{key:'L1',text:'Hình nào có 4 cạnh bằng nhau?'},{key:'L2',text:'Hình nào không có cạnh?'},{key:'L3',text:'Hình nào có 3 góc?'},{key:'R1',text:'Hình tam giác'},{key:'R2',text:'Hình tròn'},{key:'R3',text:'Hình vuông'}],
    {L1:'R3',L2:'R2',L3:'R1'}),
  mt(142,7,4,'hard','Nối từ chỉ vị trí với ví dụ:',
    [{key:'L1',text:'Bên trên'},{key:'L2',text:'Bên dưới'},{key:'L3',text:'Bên phải'},{key:'R1',text:'Mèo ở phía tay phải'},{key:'R2',text:'Mây ở trên bầu trời'},{key:'R3',text:'Cá ở dưới nước'}],
    {L1:'R2',L2:'R3',L3:'R1'}),
  mt(142,7,5,'hard','Nối phép tính với câu đố tương ứng:',
    [{key:'L1',text:'Có 9 cái, lấy đi 5 cái'},{key:'L2',text:'Có 4 cái, thêm 6 cái'},{key:'L3',text:'Có 7 cái, thêm 2 cái'},{key:'R1',text:'7+2=9'},{key:'R2',text:'4+6=10'},{key:'R3',text:'9-5=4'}],
    {L1:'R3',L2:'R2',L3:'R1'}),
  fb(142,7,6,'hard','Lan có 8 bông hoa, tặng bạn 3 bông. Lan còn [b1] bông hoa.',[{key:'b1',text:''}],{b1:'5'}),
  fb(142,7,7,'hard','[b1] + 6 = 10.',[{key:'b1',text:''}],{b1:'4'}),
  fb(142,7,8,'hard','9 - [b1] = 2.',[{key:'b1',text:''}],{b1:'7'}),
  dd(142,7,9,'hard','Kéo kết quả đúng vào ô: 4 + 5 = __',
    [{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],['B']),
  dd(142,7,10,'hard','Kéo dấu đúng vào ô: 10 __ 10 = 0',
    [{key:'A',text:'+'},{key:'B',text:'-'},{key:'C',text:'×'}],['B']),

  // ── Ex 8 (hard): 3×multiple_choice, 3×puzzle, 2×sorting, 2×cross_out ──
  // Topics: comprehensive review — numbers, operations, shapes, directions
  mc(142,8,1,'hard','Chọn tất cả các số nhỏ hơn 5:',
    [{key:'A',text:'0'},{key:'B',text:'3'},{key:'C',text:'5'},{key:'D',text:'7'}],['A','B']),
  mc(142,8,2,'hard','Chọn tất cả phép tính đúng:',
    [{key:'A',text:'3+4=7'},{key:'B',text:'5+5=9'},{key:'C',text:'8-3=5'},{key:'D',text:'6-2=3'}],['A','C']),
  mc(142,8,3,'hard','Chọn tất cả đặc điểm đúng của hình vuông:',
    [{key:'A',text:'4 cạnh bằng nhau'},{key:'B',text:'4 góc vuông'},{key:'C',text:'3 cạnh'},{key:'D',text:'Không có góc'}],['A','B']),
  pz(142,8,4,'hard','Tìm số hạng chưa biết: __ + 4 = 9',
    [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','9-4=5.'),
  pz(142,8,5,'hard','Nam có một số bút, sau khi mua thêm 3 cái thì có 8 cái. Nam có bao nhiêu bút ban đầu?',
    [{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','8-3=5.'),
  pz(142,8,6,'hard','Số nào khi cộng với 7 bằng 10?',
    [{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','10-7=3.'),
  so(142,8,7,'hard','Sắp xếp từ bé đến lớn: 9-4, 8-2, 7-3, 6-1',
    [{key:'1',text:'9-4=5'},{key:'2',text:'8-2=6'},{key:'3',text:'7-3=4'},{key:'4',text:'6-1=5'}],['3','1','4','2']),
  so(142,8,8,'hard','Sắp xếp từ lớn đến bé: 2+7, 3+6, 4+5, 5+4',
    [{key:'1',text:'2+7=9'},{key:'2',text:'3+6=9'},{key:'3',text:'4+5=9'},{key:'4',text:'5+4=9'}],['1','2','3','4']),
  co(142,8,9,'hard','Gạch bỏ phép tính sai:',
    [{key:'A',text:'5+5=10'},{key:'B',text:'3+4=8'},{key:'C',text:'9-3=6'},{key:'D',text:'7-2=4'}],['B','D']),
  co(142,8,10,'hard','Gạch bỏ hình KHÔNG có cạnh thẳng:',
    [{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],['B']),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function main() {
  await ds.initialize();
  await ds.query(`DELETE FROM quizzes WHERE lessonId = 142`);
  for (const row of L142) {
    await ds.query(SQL, row);
  }
  console.log(`✅ 142: ${L142.length} questions`);
  await ds.destroy();
}

main().catch(e => { console.error(e); process.exit(1); });
