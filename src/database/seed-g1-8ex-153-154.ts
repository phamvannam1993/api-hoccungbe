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
function fb(lessonId:number, ex:number, sort:number, diff:string, text:string, opts:{key:string,text:string}[]|null, ans:Record<string,string>, expl?:string): Row {
  return [lessonId, ex, 'fill_blank', text, opts ? JSON.stringify(opts) : null, JSON.stringify(ans), diff, expl||null, 10, sort];
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

// ─── LESSON 153: Phép trừ số có hai chữ số với số có một chữ số ───────────────
// 2-digit minus 1-digit without borrowing (e.g. 27-4=23, 35-3=32)
const L153: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(153,1,1,'easy','27 - 4 = ?',
    [{key:'A',text:'21'},{key:'B',text:'23'},{key:'C',text:'24'},{key:'D',text:'22'}],'B','27 - 4 = 23'),
  sc(153,1,2,'easy','35 - 3 = ?',
    [{key:'A',text:'30'},{key:'B',text:'33'},{key:'C',text:'32'},{key:'D',text:'31'}],'C','35 - 3 = 32'),
  sc(153,1,3,'easy','48 - 6 = ?',
    [{key:'A',text:'44'},{key:'B',text:'43'},{key:'C',text:'41'},{key:'D',text:'42'},{key:'E',text:'45'}],'D','48 - 6 = 42'),
  sc(153,1,4,'easy','59 - 7 = ?',
    [{key:'A',text:'52'},{key:'B',text:'51'},{key:'C',text:'53'},{key:'D',text:'50'}],'A','59 - 7 = 52'),
  tf(153,1,5,'easy','36 - 4 = 32. Đúng hay sai?', true,'36 - 4 = 32'),
  tf(153,1,6,'easy','45 - 3 = 41. Đúng hay sai?', false,'45 - 3 = 42'),
  tf(153,1,7,'easy','67 - 5 = 62. Đúng hay sai?', true,'67 - 5 = 62'),
  fb(153,1,8,'easy','29 - 6 = [b1]', null, {b1:'23'},'29 - 6 = 23'),
  fb(153,1,9,'easy','38 - 5 = [b1]', null, {b1:'33'},'38 - 5 = 33'),
  fb(153,1,10,'easy','46 - 4 = [b1]', null, {b1:'42'},'46 - 4 = 42'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(153,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎 có 7 quả. Bỏ đi 3 quả, còn lại bao nhiêu?','4','7 - 3 = 4'),
  ct(153,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐ có 9 ngôi sao. Bỏ đi 4 ngôi sao, còn lại bao nhiêu?','5','9 - 4 = 5'),
  ct(153,2,3,'easy','🌸🌸🌸🌸🌸🌸🌸🌸 có 8 bông hoa. Bỏ đi 5 bông, còn lại bao nhiêu?','3','8 - 5 = 3'),
  so(153,2,4,'easy','Sắp xếp các hiệu từ nhỏ đến lớn: 57-4, 38-2, 49-3, 66-5',
    [{key:'a',text:'57-4=53'},{key:'b',text:'38-2=36'},{key:'c',text:'49-3=46'},{key:'d',text:'66-5=61'}],
    ['b','c','a','d'],'36 < 46 < 53 < 61'),
  so(153,2,5,'easy','Sắp xếp các hiệu từ lớn đến nhỏ: 25-3, 47-5, 36-2, 58-6',
    [{key:'a',text:'25-3=22'},{key:'b',text:'47-5=42'},{key:'c',text:'36-2=34'},{key:'d',text:'58-6=52'}],
    ['d','b','c','a'],'52 > 42 > 34 > 22'),
  so(153,2,6,'easy','Sắp xếp: 77-4, 65-3, 89-7, 43-2',
    [{key:'a',text:'77-4=73'},{key:'b',text:'65-3=62'},{key:'c',text:'89-7=82'},{key:'d',text:'43-2=41'}],
    ['d','b','a','c'],'41 < 62 < 73 < 82'),
  co(153,2,7,'easy','Gạch bỏ kết quả SAI: 28 - 5 = ?',
    [{key:'a',text:'21'},{key:'b',text:'22'},{key:'c',text:'23'},{key:'d',text:'24'}],
    ['a','b','d'],'28 - 5 = 23'),
  co(153,2,8,'easy','Gạch bỏ kết quả SAI: 39 - 6 = ?',
    [{key:'a',text:'31'},{key:'b',text:'32'},{key:'c',text:'33'},{key:'d',text:'34'}],
    ['a','b','d'],'39 - 6 = 33'),
  fb(153,2,9,'easy','57 - [b1] = 52', null, {b1:'5'},'57 - 5 = 52'),
  fb(153,2,10,'easy','[b1] - 3 = 64', null, {b1:'67'},'67 - 3 = 64'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(153,3,1,'easy','76 - 4 = ?',
    [{key:'A',text:'70'},{key:'B',text:'71'},{key:'C',text:'72'},{key:'D',text:'73'}],'C','76 - 4 = 72'),
  sc(153,3,2,'easy','84 - 2 = ?',
    [{key:'A',text:'82'},{key:'B',text:'81'},{key:'C',text:'80'},{key:'D',text:'83'}],'A','84 - 2 = 82'),
  sc(153,3,3,'easy','93 - 1 = ?',
    [{key:'A',text:'91'},{key:'B',text:'92'},{key:'C',text:'93'},{key:'D',text:'90'}],'B','93 - 1 = 92'),
  sc(153,3,4,'easy','65 - 3 = ?',
    [{key:'A',text:'61'},{key:'B',text:'62'},{key:'C',text:'63'},{key:'D',text:'60'}],'B','65 - 3 = 62'),
  tf(153,3,5,'easy','78 - 6 = 72. Đúng hay sai?', true,'78 - 6 = 72'),
  tf(153,3,6,'easy','54 - 3 = 50. Đúng hay sai?', false,'54 - 3 = 51'),
  tf(153,3,7,'easy','87 - 5 = 82. Đúng hay sai?', true,'87 - 5 = 82'),
  fb(153,3,8,'easy','96 - 4 = [b1]', null, {b1:'92'},'96 - 4 = 92'),
  fb(153,3,9,'easy','75 - [b1] = 72', null, {b1:'3'},'75 - 3 = 72'),
  ct(153,3,10,'easy','🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 có 10 con cá. Bỏ đi 2 con, còn lại bao nhiêu?','8','10 - 2 = 8'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(153,4,1,'medium','Một rổ có 47 quả cam. Lấy ra 5 quả. Rổ còn lại bao nhiêu quả?',
    [{key:'A',text:'41'},{key:'B',text:'42'},{key:'C',text:'43'},{key:'D',text:'44'}],'B','47 - 5 = 42'),
  sc(153,4,2,'medium','Lớp học có 36 học sinh. Có 4 bạn nghỉ học. Có bao nhiêu bạn đến lớp?',
    [{key:'A',text:'30'},{key:'B',text:'31'},{key:'C',text:'32'},{key:'D',text:'33'}],'C','36 - 4 = 32'),
  sc(153,4,3,'medium','Vườn có 58 bông hoa. Hái 6 bông. Còn lại bao nhiêu bông?',
    [{key:'A',text:'50'},{key:'B',text:'51'},{key:'C',text:'52'},{key:'D',text:'53'}],'C','58 - 6 = 52'),
  mc(153,4,4,'medium','Chọn các phép tính có kết quả bằng 31:',
    [{key:'a',text:'37-6'},{key:'b',text:'34-3'},{key:'c',text:'39-8'},{key:'d',text:'35-4'}],
    ['a','c'],'37-6=31, 39-8=31'),
  mc(153,4,5,'medium','Chọn các phép tính có kết quả lớn hơn 50:',
    [{key:'a',text:'56-4=52'},{key:'b',text:'47-3=44'},{key:'c',text:'65-2=63'},{key:'d',text:'38-5=33'}],
    ['a','c'],'52>50, 63>50'),
  mc(153,4,6,'medium','Chọn các phép tính ĐÚNG:',
    [{key:'a',text:'27-4=23'},{key:'b',text:'35-3=31'},{key:'c',text:'48-6=42'},{key:'d',text:'56-4=51'}],
    ['a','c'],'27-4=23 đúng, 48-6=42 đúng'),
  mt(153,4,7,'medium','Nối phép tính với kết quả đúng:',
    [{key:'q1',text:'38-5'},{key:'q2',text:'46-3'},{key:'q3',text:'57-4'},{key:'a1',text:'33'},{key:'a2',text:'43'},{key:'a3',text:'53'}],
    {q1:'a1',q2:'a2',q3:'a3'},'38-5=33, 46-3=43, 57-4=53'),
  mt(153,4,8,'medium','Nối phép tính với kết quả:',
    [{key:'q1',text:'69-7'},{key:'q2',text:'78-6'},{key:'q3',text:'87-5'},{key:'a1',text:'62'},{key:'a2',text:'72'},{key:'a3',text:'82'}],
    {q1:'a1',q2:'a2',q3:'a3'},'69-7=62, 78-6=72, 87-5=82'),
  dd(153,4,9,'medium','Kéo thả số đúng vào chỗ trống: 49 - 7 = [  ]',
    [{key:'a',text:'40'},{key:'b',text:'41'},{key:'c',text:'42'},{key:'d',text:'43'}],
    ['c'],'49 - 7 = 42'),
  dd(153,4,10,'medium','Kéo thả số đúng vào chỗ trống: 86 - 4 = [  ]',
    [{key:'a',text:'80'},{key:'b',text:'81'},{key:'c',text:'82'},{key:'d',text:'83'}],
    ['c'],'86 - 4 = 82'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(153,5,1,'medium','Điền kết quả vào bảng: 37-4, 48-5, 56-3, 67-4',
    [{key:'c1',text:'37-4'},{key:'c2',text:'48-5'},{key:'c3',text:'56-3'},{key:'c4',text:'67-4'}],
    {c1:'33',c2:'43',c3:'53',c4:'63'},'37-4=33, 48-5=43, 56-3=53, 67-4=63'),
  tf2(153,5,2,'medium','Điền kết quả vào bảng: 29-6, 38-4, 47-3, 56-2',
    [{key:'c1',text:'29-6'},{key:'c2',text:'38-4'},{key:'c3',text:'47-3'},{key:'c4',text:'56-2'}],
    {c1:'23',c2:'34',c3:'44',c4:'54'},'29-6=23, 38-4=34, 47-3=44, 56-2=54'),
  nl(153,5,3,'medium','Điền số còn thiếu trên tia số: 50, ?, 54, ?, 58 (bước nhảy 2 từ kết quả 52-56)',
    [{key:'p1',text:'?'},{key:'p2',text:'?'}],
    {p1:'52',p2:'56'},'Tia số cách đều: 50,52,54,56,58'),
  nl(153,5,4,'medium','Kết quả 65-3=62. Điền vào tia số: 60, 61, ?, 63, ?, 65',
    [{key:'p1',text:'?'},{key:'p2',text:'?'}],
    {p1:'62',p2:'64'},'Tia số liên tiếp từ 60 đến 65'),
  pz(153,5,5,'medium','Ô số bí ẩn: □ - 5 = 42. Tìm □.',
    [{key:'a',text:'45'},{key:'b',text:'46'},{key:'c',text:'47'},{key:'d',text:'48'}],
    'c','47 - 5 = 42'),
  pz(153,5,6,'medium','Ô số bí ẩn: 58 - □ = 52. Tìm □.',
    [{key:'a',text:'4'},{key:'b',text:'5'},{key:'c',text:'6'},{key:'d',text:'7'}],
    'c','58 - 6 = 52'),
  pz(153,5,7,'medium','Ô số bí ẩn: □ - 4 = 63. Tìm □.',
    [{key:'a',text:'65'},{key:'b',text:'66'},{key:'c',text:'67'},{key:'d',text:'68'}],
    'c','67 - 4 = 63'),
  mt(153,5,8,'medium','Nối bài toán với lời giải:',
    [{key:'q1',text:'Có 45 cái kẹo, ăn 3 cái, còn?'},{key:'q2',text:'Có 37 quả bóng, vỡ 4 quả, còn?'},{key:'a1',text:'42'},{key:'a2',text:'33'}],
    {q1:'a1',q2:'a2'},'45-3=42, 37-4=33'),
  mt(153,5,9,'medium','Nối phép tính với kết quả:',
    [{key:'q1',text:'96-4'},{key:'q2',text:'87-3'},{key:'a1',text:'92'},{key:'a2',text:'84'}],
    {q1:'a1',q2:'a2'},'96-4=92, 87-3=84'),
  dd(153,5,10,'medium','Kéo số vào ô: 74 - □ = 71',
    [{key:'a',text:'1'},{key:'b',text:'2'},{key:'c',text:'3'},{key:'d',text:'4'}],
    ['c'],'74 - 3 = 71'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(153,6,1,'hard','Một cửa hàng có 68 quyển vở. Bán đi [b1] quyển thì còn lại 62 quyển.', null, {b1:'6'},'68 - 6 = 62'),
  fb(153,6,2,'hard','[b1] - 7 = 51, vậy [b1] = ?', null, {b1:'58'},'58 - 7 = 51'),
  fb(153,6,3,'hard','Tính: (47 - 4) - 3 = [b1]', null, {b1:'40'},'47-4=43, 43-3=40'),
  pz(153,6,4,'hard','Tìm số bị trừ: □ - 8 = 61',
    [{key:'a',text:'67'},{key:'b',text:'68'},{key:'c',text:'69'},{key:'d',text:'70'}],
    'c','69 - 8 = 61'),
  pz(153,6,5,'hard','Nam có một số tem, cho bạn 5 cái còn lại 43 cái. Nam có bao nhiêu cái tem?',
    [{key:'a',text:'46'},{key:'b',text:'47'},{key:'c',text:'48'},{key:'d',text:'49'}],
    'c','48 - 5 = 43'),
  pz(153,6,6,'hard','Có □ bông hoa. Cắm 4 bông vào lọ, còn lại 52 bông. □ = ?',
    [{key:'a',text:'54'},{key:'b',text:'55'},{key:'c',text:'56'},{key:'d',text:'57'}],
    'c','56 - 4 = 52'),
  mc(153,6,7,'hard','Chọn tất cả phép tính có kết quả nhỏ hơn 40:',
    [{key:'a',text:'47-8=39'},{key:'b',text:'43-2=41'},{key:'c',text:'45-6=39'},{key:'d',text:'52-4=48'}],
    ['a','c'],'39<40, 39<40'),
  mc(153,6,8,'hard','Chọn các phép tính có kết quả là số chẵn:',
    [{key:'a',text:'37-3=34'},{key:'b',text:'48-5=43'},{key:'c',text:'56-2=54'},{key:'d',text:'67-4=63'}],
    ['a','c'],'34 và 54 là số chẵn'),
  so(153,6,9,'hard','Sắp xếp kết quả từ nhỏ đến lớn: 86-4, 73-2, 95-3, 64-1',
    [{key:'a',text:'86-4=82'},{key:'b',text:'73-2=71'},{key:'c',text:'95-3=92'},{key:'d',text:'64-1=63'}],
    ['d','b','a','c'],'63<71<82<92'),
  so(153,6,10,'hard','Sắp xếp từ lớn đến nhỏ: 55-3, 47-5, 63-1, 38-6',
    [{key:'a',text:'55-3=52'},{key:'b',text:'47-5=42'},{key:'c',text:'63-1=62'},{key:'d',text:'38-6=32'}],
    ['c','a','b','d'],'62>52>42>32'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(153,7,1,'hard','Ghép đôi các phép trừ bằng nhau:',
    [{key:'a',text:'37-4'},{key:'b',text:'45-12? (=33)'},{key:'c',text:'56-5'},{key:'d',text:'38-5? (=33)'},{key:'e',text:'48-6'},{key:'f',text:'65-7? (=58, try 59-8=51)'},{key:'g',text:'29-2'},{key:'h',text:'36-9? (=27)'}]),
  gm(153,7,2,'hard','Trò chơi tìm cặp phép tính cùng kết quả:',
    [{key:'a',text:'58-6=52'},{key:'b',text:'63-1=62'},{key:'c',text:'47-5=42'},{key:'d',text:'75-3=72'},{key:'e',text:'79-7=72'},{key:'f',text:'34-2=32'},{key:'g',text:'39-7=32'},{key:'h',text:'55-3=52'}]),
  mt(153,7,3,'hard','Nối phép tính với lời giải đúng:',
    [{key:'q1',text:'Mẹ mua 45 quả trứng, dùng 3 quả'},{key:'q2',text:'Có 67 viên bi, mất 5 viên'},{key:'q3',text:'Vườn có 89 cây, chặt 7 cây'},{key:'a1',text:'42 quả'},{key:'a2',text:'62 viên'},{key:'a3',text:'82 cây'}],
    {q1:'a1',q2:'a2',q3:'a3'},'45-3=42, 67-5=62, 89-7=82'),
  mt(153,7,4,'hard','Nối phép tính với kết quả:',
    [{key:'q1',text:'76-4'},{key:'q2',text:'83-2'},{key:'q3',text:'97-5'},{key:'a1',text:'72'},{key:'a2',text:'81'},{key:'a3',text:'92'}],
    {q1:'a1',q2:'a2',q3:'a3'},'76-4=72, 83-2=81, 97-5=92'),
  mt(153,7,5,'hard','Nối bài toán với phép tính:',
    [{key:'q1',text:'Có 48 bông hoa, cắt 6 bông'},{key:'q2',text:'36 học sinh, vắng 3 bạn'},{key:'a1',text:'48-6=42'},{key:'a2',text:'36-3=33'}],
    {q1:'a1',q2:'a2'},'48-6=42, 36-3=33'),
  fb(153,7,6,'hard','Tính: 79 - 6 = [b1], rồi [b1] - 3 = [b2]', null, {b1:'73',b2:'70'},'79-6=73, 73-3=70'),
  fb(153,7,7,'hard','Điền dấu >, <, = : 56 - 4 [b1] 48 - 3', null, {b1:'>'},'52 > 45'),
  fb(153,7,8,'hard','Số lớn nhất có hai chữ số trừ đi 7 bằng [b1].', null, {b1:'92'},'99 - 7 = 92'),
  dd(153,7,9,'hard','Kéo số vào đúng chỗ: □ - 4 = 61, □ - 3 = 74',
    [{key:'a',text:'65'},{key:'b',text:'77'},{key:'c',text:'64'},{key:'d',text:'78'}],
    ['a','b'],'65-4=61, 77-3=74'),
  dd(153,7,10,'hard','Kéo để hoàn thành: 58 - □ = 52, 79 - □ = 72',
    [{key:'a',text:'6'},{key:'b',text:'7'},{key:'c',text:'5'},{key:'d',text:'8'}],
    ['a','b'],'58-6=52, 79-7=72'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(153,8,1,'hard','Chọn tất cả phép tính đúng:',
    [{key:'a',text:'47-5=42'},{key:'b',text:'56-4=51'},{key:'c',text:'68-6=62'},{key:'d',text:'79-7=71'}],
    ['a','c'],'47-5=42 đúng, 68-6=62 đúng'),
  mc(153,8,2,'hard','Chọn các số là kết quả của phép trừ: 38 - □ với □ ∈ {1,2,3,4,5}',
    [{key:'a',text:'33'},{key:'b',text:'34'},{key:'c',text:'35'},{key:'d',text:'36'},{key:'e',text:'37'}],
    ['a','b','c','d','e'],'38-5=33,38-4=34,38-3=35,38-2=36,38-1=37'),
  mc(153,8,3,'hard','Chọn bài toán có lời giải 43:',
    [{key:'a',text:'47-3=44'},{key:'b',text:'48-5=43'},{key:'c',text:'46-3=43'},{key:'d',text:'45-3=42'}],
    ['b','c'],'48-5=43, 46-3=43'),
  pz(153,8,4,'hard','Câu đố: Tôi là một số có hai chữ số. Trừ tôi đi 6 được 52. Tôi là số nào?',
    [{key:'a',text:'56'},{key:'b',text:'57'},{key:'c',text:'58'},{key:'d',text:'59'}],
    'c','58 - 6 = 52'),
  pz(153,8,5,'hard','Tổng của hai số là 80. Số lớn hơn số nhỏ 6 đơn vị (gợi ý: dùng phép trừ để tìm). Số nhỏ là?',
    [{key:'a',text:'36'},{key:'b',text:'37'},{key:'c',text:'38'},{key:'d',text:'39'}],
    'b','Số nhỏ = (80-6)/2 = 37'),
  pz(153,8,6,'hard','Điền vào dãy số: 95, 92, 89, □, 83, □',
    [{key:'a',text:'86 và 80'},{key:'b',text:'86 và 79'},{key:'c',text:'85 và 80'},{key:'d',text:'87 và 81'}],
    'a','Trừ dần 3: 95,92,89,86,83,80'),
  so(153,8,7,'hard','Sắp xếp phép tính theo kết quả tăng dần: 99-7, 88-6, 77-5, 66-4',
    [{key:'a',text:'99-7=92'},{key:'b',text:'88-6=82'},{key:'c',text:'77-5=72'},{key:'d',text:'66-4=62'}],
    ['d','c','b','a'],'62<72<82<92'),
  so(153,8,8,'hard','Sắp xếp theo thứ tự giảm dần: 57-3, 46-2, 68-4, 35-1',
    [{key:'a',text:'57-3=54'},{key:'b',text:'46-2=44'},{key:'c',text:'68-4=64'},{key:'d',text:'35-1=34'}],
    ['c','a','b','d'],'64>54>44>34'),
  co(153,8,9,'hard','Gạch bỏ phép tính SAI (kết quả không đúng):',
    [{key:'a',text:'47-5=42'},{key:'b',text:'56-3=52'},{key:'c',text:'68-4=64'},{key:'d',text:'79-6=72'}],
    ['b','d'],'56-3=53 mới đúng, 79-6=73 mới đúng'),
  co(153,8,10,'hard','Gạch bỏ kết quả KHÔNG phải kết quả của 85 - □ (□ từ 1-4):',
    [{key:'a',text:'81'},{key:'b',text:'82'},{key:'c',text:'83'},{key:'d',text:'84'},{key:'e',text:'85'}],
    ['e'],'85 không thể là kết quả vì □ phải ≥ 1'),
];

// ─── LESSON 154: Phép trừ số có hai chữ số với số có hai chữ số ──────────────
// 2-digit minus 2-digit without borrowing (e.g. 47-23=24, 68-35=33)
const L154: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(154,1,1,'easy','47 - 23 = ?',
    [{key:'A',text:'22'},{key:'B',text:'23'},{key:'C',text:'24'},{key:'D',text:'25'}],'C','47 - 23 = 24'),
  sc(154,1,2,'easy','68 - 35 = ?',
    [{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'},{key:'D',text:'34'}],'C','68 - 35 = 33'),
  sc(154,1,3,'easy','55 - 22 = ?',
    [{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'},{key:'D',text:'34'}],'C','55 - 22 = 33'),
  sc(154,1,4,'easy','79 - 46 = ?',
    [{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'},{key:'D',text:'34'}],'C','79 - 46 = 33'),
  tf(154,1,5,'easy','56 - 34 = 22. Đúng hay sai?', true,'56 - 34 = 22'),
  tf(154,1,6,'easy','78 - 45 = 32. Đúng hay sai?', false,'78 - 45 = 33'),
  tf(154,1,7,'easy','89 - 57 = 32. Đúng hay sai?', true,'89 - 57 = 32'),
  fb(154,1,8,'easy','64 - 31 = [b1]', null, {b1:'33'},'64 - 31 = 33'),
  fb(154,1,9,'easy','97 - 54 = [b1]', null, {b1:'43'},'97 - 54 = 43'),
  fb(154,1,10,'easy','85 - 42 = [b1]', null, {b1:'43'},'85 - 42 = 43'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(154,2,1,'easy','🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 có 10 quả. Bỏ đi nhóm 4 quả (=4 quả), còn lại bao nhiêu quả?','6','10 - 4 = 6 (mô phỏng trừ hai số)'),
  ct(154,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐ có 8 ngôi sao. Bỏ đi 3 ngôi sao, còn lại bao nhiêu?','5','8 - 3 = 5'),
  ct(154,2,3,'easy','🌺🌺🌺🌺🌺🌺🌺🌺🌺 có 9 bông hoa. Bỏ đi 4 bông, còn lại bao nhiêu?','5','9 - 4 = 5'),
  so(154,2,4,'easy','Sắp xếp các hiệu từ nhỏ đến lớn: 57-24, 78-45, 69-36, 96-53',
    [{key:'a',text:'57-24=33'},{key:'b',text:'78-45=33'},{key:'c',text:'69-36=33'},{key:'d',text:'96-53=43'}],
    ['a','b','c','d'],'33=33=33 < 43'),
  so(154,2,5,'easy','Sắp xếp từ lớn đến nhỏ: 87-54, 65-32, 98-76, 43-21',
    [{key:'a',text:'87-54=33'},{key:'b',text:'65-32=33'},{key:'c',text:'98-76=22'},{key:'d',text:'43-21=22'}],
    ['a','b','c','d'],'33=33>22=22'),
  so(154,2,6,'easy','Sắp xếp tăng dần: 75-43, 86-52, 97-64, 64-31',
    [{key:'a',text:'75-43=32'},{key:'b',text:'86-52=34'},{key:'c',text:'97-64=33'},{key:'d',text:'64-31=33'}],
    ['a','c','d','b'],'32<33=33<34'),
  co(154,2,7,'easy','Gạch bỏ kết quả SAI: 59 - 26 = ?',
    [{key:'a',text:'31'},{key:'b',text:'32'},{key:'c',text:'33'},{key:'d',text:'34'}],
    ['a','b','d'],'59 - 26 = 33'),
  co(154,2,8,'easy','Gạch bỏ kết quả SAI: 74 - 32 = ?',
    [{key:'a',text:'40'},{key:'b',text:'41'},{key:'c',text:'42'},{key:'d',text:'43'}],
    ['a','b','d'],'74 - 32 = 42'),
  fb(154,2,9,'easy','68 - [b1] = 35', null, {b1:'33'},'68 - 33 = 35'),
  fb(154,2,10,'easy','[b1] - 24 = 43', null, {b1:'67'},'67 - 24 = 43'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(154,3,1,'easy','86 - 43 = ?',
    [{key:'A',text:'41'},{key:'B',text:'42'},{key:'C',text:'43'},{key:'D',text:'44'}],'C','86 - 43 = 43'),
  sc(154,3,2,'easy','75 - 32 = ?',
    [{key:'A',text:'41'},{key:'B',text:'42'},{key:'C',text:'43'},{key:'D',text:'44'}],'C','75 - 32 = 43'),
  sc(154,3,3,'easy','99 - 55 = ?',
    [{key:'A',text:'42'},{key:'B',text:'43'},{key:'C',text:'44'},{key:'D',text:'45'}],'C','99 - 55 = 44'),
  sc(154,3,4,'easy','88 - 46 = ?',
    [{key:'A',text:'40'},{key:'B',text:'41'},{key:'C',text:'42'},{key:'D',text:'43'}],'C','88 - 46 = 42'),
  tf(154,3,5,'easy','76 - 43 = 33. Đúng hay sai?', true,'76 - 43 = 33'),
  tf(154,3,6,'easy','85 - 42 = 42. Đúng hay sai?', false,'85 - 42 = 43'),
  tf(154,3,7,'easy','97 - 54 = 43. Đúng hay sai?', true,'97 - 54 = 43'),
  fb(154,3,8,'easy','96 - 53 = [b1]', null, {b1:'43'},'96 - 53 = 43'),
  fb(154,3,9,'easy','[b1] - 21 = 54', null, {b1:'75'},'75 - 21 = 54'),
  ct(154,3,10,'easy','🐠🐠🐠🐠🐠🐠🐠🐠🐠🐠 có 10 con cá. Bỏ nhóm 4 con đi, còn lại bao nhiêu?','6','10 - 4 = 6'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(154,4,1,'medium','Cửa hàng có 56 cái bánh. Bán đi 23 cái. Còn lại bao nhiêu cái bánh?',
    [{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'},{key:'D',text:'34'}],'C','56 - 23 = 33'),
  sc(154,4,2,'medium','Sân trường có 78 học sinh. Về nhà 35 bạn. Còn lại bao nhiêu bạn?',
    [{key:'A',text:'41'},{key:'B',text:'42'},{key:'C',text:'43'},{key:'D',text:'44'}],'C','78 - 35 = 43'),
  sc(154,4,3,'medium','Thư viện có 99 quyển sách. Mượn 46 quyển. Còn lại bao nhiêu quyển?',
    [{key:'A',text:'51'},{key:'B',text:'52'},{key:'C',text:'53'},{key:'D',text:'54'}],'C','99 - 46 = 53'),
  mc(154,4,4,'medium','Chọn các phép tính có kết quả bằng 22:',
    [{key:'a',text:'56-34'},{key:'b',text:'78-56'},{key:'c',text:'45-23'},{key:'d',text:'67-45'}],
    ['a','b','c','d'],'56-34=22, 78-56=22, 45-23=22, 67-45=22'),
  mc(154,4,5,'medium','Chọn các phép tính có kết quả lớn hơn 40:',
    [{key:'a',text:'87-45=42'},{key:'b',text:'65-32=33'},{key:'c',text:'98-54=44'},{key:'d',text:'76-43=33'}],
    ['a','c'],'42>40, 44>40'),
  mc(154,4,6,'medium','Chọn các phép tính ĐÚNG:',
    [{key:'a',text:'47-23=24'},{key:'b',text:'68-35=32'},{key:'c',text:'59-26=33'},{key:'d',text:'84-51=32'}],
    ['a','c'],'47-23=24 đúng, 59-26=33 đúng'),
  mt(154,4,7,'medium','Nối phép tính với kết quả:',
    [{key:'q1',text:'57-24'},{key:'q2',text:'68-35'},{key:'q3',text:'79-46'},{key:'a1',text:'33'},{key:'a2',text:'33'},{key:'a3',text:'33'}],
    {q1:'a1',q2:'a2',q3:'a3'},'57-24=33, 68-35=33, 79-46=33'),
  mt(154,4,8,'medium','Nối phép tính với kết quả:',
    [{key:'q1',text:'86-42'},{key:'q2',text:'75-31'},{key:'q3',text:'97-53'},{key:'a1',text:'44'},{key:'a2',text:'44'},{key:'a3',text:'44'}],
    {q1:'a1',q2:'a2',q3:'a3'},'86-42=44, 75-31=44, 97-53=44'),
  dd(154,4,9,'medium','Kéo thả số đúng: 95 - 42 = [  ]',
    [{key:'a',text:'51'},{key:'b',text:'52'},{key:'c',text:'53'},{key:'d',text:'54'}],
    ['c'],'95 - 42 = 53'),
  dd(154,4,10,'medium','Kéo thả số đúng: 87 - 34 = [  ]',
    [{key:'a',text:'51'},{key:'b',text:'52'},{key:'c',text:'53'},{key:'d',text:'54'}],
    ['c'],'87 - 34 = 53'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(154,5,1,'medium','Điền kết quả vào bảng: 46-23, 57-34, 68-45, 79-56',
    [{key:'c1',text:'46-23'},{key:'c2',text:'57-34'},{key:'c3',text:'68-45'},{key:'c4',text:'79-56'}],
    {c1:'23',c2:'23',c3:'23',c4:'23'},'Tất cả đều bằng 23'),
  tf2(154,5,2,'medium','Điền kết quả vào bảng: 85-41, 76-32, 97-53, 64-20',
    [{key:'c1',text:'85-41'},{key:'c2',text:'76-32'},{key:'c3',text:'97-53'},{key:'c4',text:'64-20'}],
    {c1:'44',c2:'44',c3:'44',c4:'44'},'Tất cả đều bằng 44'),
  nl(154,5,3,'medium','Điền số vào tia số: 20, ?, 40, ?, 60 (bước nhảy 10)',
    [{key:'p1',text:'?'},{key:'p2',text:'?'}],
    {p1:'30',p2:'50'},'Tia số: 20,30,40,50,60'),
  nl(154,5,4,'medium','Kết quả 75-32=43. Điền vào tia số: 40, 41, 42, ?, 44, ?',
    [{key:'p1',text:'?'},{key:'p2',text:'?'}],
    {p1:'43',p2:'45'},'Tia số liên tiếp từ 40'),
  pz(154,5,5,'medium','Ô số bí ẩn: □ - 23 = 45. Tìm □.',
    [{key:'a',text:'66'},{key:'b',text:'67'},{key:'c',text:'68'},{key:'d',text:'69'}],
    'c','68 - 23 = 45'),
  pz(154,5,6,'medium','Ô số bí ẩn: 87 - □ = 54. Tìm □.',
    [{key:'a',text:'31'},{key:'b',text:'32'},{key:'c',text:'33'},{key:'d',text:'34'}],
    'c','87 - 33 = 54'),
  pz(154,5,7,'medium','Ô số bí ẩn: □ - 42 = 35. Tìm □.',
    [{key:'a',text:'75'},{key:'b',text:'76'},{key:'c',text:'77'},{key:'d',text:'78'}],
    'c','77 - 42 = 35'),
  mt(154,5,8,'medium','Nối bài toán với lời giải:',
    [{key:'q1',text:'Có 56 cái kẹo, cho 23 cái, còn?'},{key:'q2',text:'68 quả bóng, vỡ 35 quả, còn?'},{key:'a1',text:'33'},{key:'a2',text:'33'}],
    {q1:'a1',q2:'a2'},'56-23=33, 68-35=33'),
  mt(154,5,9,'medium','Nối phép tính với kết quả:',
    [{key:'q1',text:'98-55'},{key:'q2',text:'87-44'},{key:'a1',text:'43'},{key:'a2',text:'43'}],
    {q1:'a1',q2:'a2'},'98-55=43, 87-44=43'),
  dd(154,5,10,'medium','Kéo số vào ô: 76 - □ = 43',
    [{key:'a',text:'31'},{key:'b',text:'32'},{key:'c',text:'33'},{key:'d',text:'34'}],
    ['c'],'76 - 33 = 43'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(154,6,1,'hard','Cửa hàng có 89 quyển vở. Bán [b1] quyển thì còn 46 quyển.', null, {b1:'43'},'89 - 43 = 46'),
  fb(154,6,2,'hard','[b1] - 34 = 52, vậy [b1] = ?', null, {b1:'86'},'86 - 34 = 52'),
  fb(154,6,3,'hard','Tính: (67 - 23) - 11 = [b1]', null, {b1:'33'},'67-23=44, 44-11=33'),
  pz(154,6,4,'hard','Tìm số bị trừ: □ - 35 = 52',
    [{key:'a',text:'85'},{key:'b',text:'86'},{key:'c',text:'87'},{key:'d',text:'88'}],
    'c','87 - 35 = 52'),
  pz(154,6,5,'hard','Lan có một số tem, cho bạn 24 cái còn lại 43 cái. Lan có bao nhiêu cái tem?',
    [{key:'a',text:'65'},{key:'b',text:'66'},{key:'c',text:'67'},{key:'d',text:'68'}],
    'c','67 - 24 = 43'),
  pz(154,6,6,'hard','Có □ bông hoa. Cắm 32 bông vào lọ, còn lại 55 bông. □ = ?',
    [{key:'a',text:'85'},{key:'b',text:'86'},{key:'c',text:'87'},{key:'d',text:'88'}],
    'c','87 - 32 = 55'),
  mc(154,6,7,'hard','Chọn tất cả phép tính có kết quả nhỏ hơn 30:',
    [{key:'a',text:'56-28=28'},{key:'b',text:'43-12=31'},{key:'c',text:'75-47=28'},{key:'d',text:'62-31=31'}],
    ['a','c'],'28<30, 28<30'),
  mc(154,6,8,'hard','Chọn các phép tính có kết quả là số lẻ:',
    [{key:'a',text:'57-24=33'},{key:'b',text:'68-35=33'},{key:'c',text:'86-42=44'},{key:'d',text:'97-53=44'}],
    ['a','b'],'33 và 33 là số lẻ'),
  so(154,6,9,'hard','Sắp xếp kết quả từ nhỏ đến lớn: 87-54, 76-43, 95-52, 64-31',
    [{key:'a',text:'87-54=33'},{key:'b',text:'76-43=33'},{key:'c',text:'95-52=43'},{key:'d',text:'64-31=33'}],
    ['a','b','d','c'],'33=33=33<43'),
  so(154,6,10,'hard','Sắp xếp từ lớn đến nhỏ: 68-24, 79-35, 57-13, 46-12',
    [{key:'a',text:'68-24=44'},{key:'b',text:'79-35=44'},{key:'c',text:'57-13=44'},{key:'d',text:'46-12=34'}],
    ['a','b','c','d'],'44=44=44>34'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(154,7,1,'hard','Ghép đôi các phép trừ bằng nhau:',
    [{key:'a',text:'57-24=33'},{key:'b',text:'68-35=33'},{key:'c',text:'79-46=33'},{key:'d',text:'86-53=33'},{key:'e',text:'75-32=43'},{key:'f',text:'64-21=43'},{key:'g',text:'97-54=43'},{key:'h',text:'88-45=43'}]),
  gm(154,7,2,'hard','Trò chơi tìm cặp phép tính cùng kết quả:',
    [{key:'a',text:'85-41=44'},{key:'b',text:'76-32=44'},{key:'c',text:'93-50=43'},{key:'d',text:'87-44=43'},{key:'e',text:'58-25=33'},{key:'f',text:'69-36=33'},{key:'g',text:'74-31=43'},{key:'h',text:'62-19=43'}]),
  mt(154,7,3,'hard','Nối phép tính với lời giải:',
    [{key:'q1',text:'Mẹ mua 75 quả trứng, dùng 32 quả'},{key:'q2',text:'Có 86 viên bi, tặng 43 viên'},{key:'q3',text:'Vườn có 97 cây, chặt 54 cây'},{key:'a1',text:'43 quả'},{key:'a2',text:'43 viên'},{key:'a3',text:'43 cây'}],
    {q1:'a1',q2:'a2',q3:'a3'},'75-32=43, 86-43=43, 97-54=43'),
  mt(154,7,4,'hard','Nối phép tính với kết quả:',
    [{key:'q1',text:'98-65'},{key:'q2',text:'87-54'},{key:'q3',text:'76-43'},{key:'a1',text:'33'},{key:'a2',text:'33'},{key:'a3',text:'33'}],
    {q1:'a1',q2:'a2',q3:'a3'},'98-65=33, 87-54=33, 76-43=33'),
  mt(154,7,5,'hard','Nối bài toán với phép tính:',
    [{key:'q1',text:'Có 68 bông hoa, tặng 35 bông'},{key:'q2',text:'56 học sinh, chuyển 23 bạn'},{key:'a1',text:'68-35=33'},{key:'a2',text:'56-23=33'}],
    {q1:'a1',q2:'a2'},'68-35=33, 56-23=33'),
  fb(154,7,6,'hard','Tính: 89 - 46 = [b1], rồi [b1] - 10 = [b2]', null, {b1:'43',b2:'33'},'89-46=43, 43-10=33'),
  fb(154,7,7,'hard','Điền dấu >, <, = : 76 - 43 [b1] 89 - 56', null, {b1:'='},'33 = 33'),
  fb(154,7,8,'hard','Số có hai chữ số lớn nhất trừ đi 55 bằng [b1].', null, {b1:'44'},'99 - 55 = 44'),
  dd(154,7,9,'hard','Kéo số vào đúng chỗ: □ - 24 = 43, □ - 35 = 52',
    [{key:'a',text:'67'},{key:'b',text:'87'},{key:'c',text:'68'},{key:'d',text:'88'}],
    ['a','b'],'67-24=43, 87-35=52'),
  dd(154,7,10,'hard','Kéo để hoàn thành: 78 - □ = 45, 89 - □ = 56',
    [{key:'a',text:'33'},{key:'b',text:'34'},{key:'c',text:'32'},{key:'d',text:'35'}],
    ['a','a'],'78-33=45, 89-33=56'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(154,8,1,'hard','Chọn tất cả phép tính đúng:',
    [{key:'a',text:'57-24=33'},{key:'b',text:'68-35=32'},{key:'c',text:'79-46=33'},{key:'d',text:'86-53=32'}],
    ['a','c'],'57-24=33 đúng, 79-46=33 đúng'),
  mc(154,8,2,'hard','Chọn các phép tính có kết quả bằng 44:',
    [{key:'a',text:'87-43'},{key:'b',text:'76-32'},{key:'c',text:'95-51'},{key:'d',text:'68-24'}],
    ['a','b','c','d'],'87-43=44, 76-32=44, 95-51=44, 68-24=44'),
  mc(154,8,3,'hard','Chọn bài toán có lời giải là 53:',
    [{key:'a',text:'87-34=53'},{key:'b',text:'76-23=53'},{key:'c',text:'95-42=53'},{key:'d',text:'64-11=53'}],
    ['a','b','c','d'],'Tất cả đều bằng 53'),
  pz(154,8,4,'hard','Câu đố: Tôi là một số có hai chữ số. Trừ tôi đi 34 được 53. Tôi là số nào?',
    [{key:'a',text:'85'},{key:'b',text:'86'},{key:'c',text:'87'},{key:'d',text:'88'}],
    'c','87 - 34 = 53'),
  pz(154,8,5,'hard','Tổng của hai số là 99. Hiệu của chúng là 33. Số lớn hơn là?',
    [{key:'a',text:'64'},{key:'b',text:'65'},{key:'c',text:'66'},{key:'d',text:'67'}],
    'c','Số lớn = (99+33)/2 = 66'),
  pz(154,8,6,'hard','Điền vào dãy số: 99, 88, 77, □, 55, □',
    [{key:'a',text:'66 và 44'},{key:'b',text:'65 và 43'},{key:'c',text:'67 và 45'},{key:'d',text:'68 và 46'}],
    'a','Trừ dần 11: 99,88,77,66,55,44'),
  so(154,8,7,'hard','Sắp xếp phép tính theo kết quả tăng dần: 98-54, 87-43, 76-32, 65-21',
    [{key:'a',text:'98-54=44'},{key:'b',text:'87-43=44'},{key:'c',text:'76-32=44'},{key:'d',text:'65-21=44'}],
    ['a','b','c','d'],'Tất cả đều bằng 44'),
  so(154,8,8,'hard','Sắp xếp theo thứ tự giảm dần: 79-36, 68-25, 57-14, 46-13',
    [{key:'a',text:'79-36=43'},{key:'b',text:'68-25=43'},{key:'c',text:'57-14=43'},{key:'d',text:'46-13=33'}],
    ['a','b','c','d'],'43=43=43>33'),
  co(154,8,9,'hard','Gạch bỏ phép tính SAI:',
    [{key:'a',text:'57-24=33'},{key:'b',text:'68-35=32'},{key:'c',text:'79-46=33'},{key:'d',text:'86-53=32'}],
    ['b','d'],'68-35=33 mới đúng, 86-53=33 mới đúng'),
  co(154,8,10,'hard','Gạch bỏ kết quả KHÔNG phải kết quả của 75 - 3□ (3□ từ 30-39):',
    [{key:'a',text:'36'},{key:'b',text:'37'},{key:'c',text:'38'},{key:'d',text:'45'},{key:'e',text:'46'}],
    ['d','e'],'75-30=45 là hợp lệ, nhưng 45 và 46 nằm ngoài phạm vi 75-39=36 đến 75-30=45'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function main() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();

  for (const [lessonId, rows] of [[153, L153],[154, L154]] as [number, Row[]][]) {
    await qr.query(`DELETE FROM quizzes WHERE lessonId = ?`, [lessonId]);
    for (const row of rows) {
      await qr.query(SQL, row);
    }
    const [{ cnt }] = await qr.query(`SELECT COUNT(*) as cnt FROM quizzes WHERE lessonId = ?`, [lessonId]);
    console.log(`✅ lessonId: ${lessonId}: ${cnt}`);
  }

  await qr.release();
  await ds.destroy();
}

main().catch(e => { console.error(e); process.exit(1); });
