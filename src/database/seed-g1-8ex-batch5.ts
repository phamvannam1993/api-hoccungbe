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

// ─── LESSON 143: Số có hai chữ số (2-digit numbers) ───────────────────────
const L143: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(143,1,1,'easy','Số 35 có mấy chục?',[{key:'A',text:'5'},{key:'B',text:'3'},{key:'C',text:'8'}],'B','35 = 3 chục 5 đơn vị.'),
  sc(143,1,2,'easy','Số 47 có mấy đơn vị?',[{key:'A',text:'4'},{key:'B',text:'7'},{key:'C',text:'11'}],'B'),
  sc(143,1,3,'easy','Số nào có 6 chục và 2 đơn vị?',[{key:'A',text:'26'},{key:'B',text:'62'},{key:'C',text:'60'}],'B'),
  sc(143,1,4,'easy','Số liền sau của 49 là?',[{key:'A',text:'48'},{key:'B',text:'50'},{key:'C',text:'51'}],'B'),
  tf(143,1,5,'easy','Số 54 có 5 chục và 4 đơn vị. Đúng hay sai?',true),
  tf(143,1,6,'easy','Số 30 có 3 chục và 3 đơn vị. Đúng hay sai?',false,'30 = 3 chục 0 đơn vị.'),
  tf(143,1,7,'easy','Số nhỏ nhất có hai chữ số là 10. Đúng hay sai?',true),
  fb(143,1,8,'easy','Số 72 = [b1] chục [b2] đơn vị.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'7',b2:'2'}),
  fb(143,1,9,'easy','Số gồm 4 chục và 8 đơn vị là [b1].',[{key:'b1',text:''}],{b1:'48'}),
  fb(143,1,10,'easy','Số liền trước của 80 là [b1].',[{key:'b1',text:''}],{b1:'79'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(143,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 Có bao nhiêu quả táo?','12'),
  ct(143,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao?','15'),
  ct(143,2,3,'easy','🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵 Có bao nhiêu chấm xanh?','18'),
  so(143,2,4,'easy','Sắp xếp từ bé đến lớn: 23, 41, 15, 37',[{key:'1',text:'23'},{key:'2',text:'41'},{key:'3',text:'15'},{key:'4',text:'37'}],['3','1','4','2']),
  so(143,2,5,'easy','Sắp xếp từ lớn đến bé: 56, 65, 50, 60',[{key:'1',text:'56'},{key:'2',text:'65'},{key:'3',text:'50'},{key:'4',text:'60'}],['2','4','1','3']),
  so(143,2,6,'easy','Sắp xếp từ bé đến lớn: 99, 10, 55, 33',[{key:'1',text:'99'},{key:'2',text:'10'},{key:'3',text:'55'},{key:'4',text:'33'}],['2','4','3','1']),
  co(143,2,7,'easy','Gạch bỏ số không phải số có hai chữ số:',[{key:'A',text:'9'},{key:'B',text:'13'},{key:'C',text:'45'},{key:'D',text:'5'}],['A','D']),
  co(143,2,8,'easy','Gạch bỏ số lẻ trong dãy:',[{key:'A',text:'12'},{key:'B',text:'15'},{key:'C',text:'18'},{key:'D',text:'21'}],['B','D']),
  fb(143,2,9,'easy','Số 89 = [b1] chục [b2] đơn vị.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'8',b2:'9'}),
  fb(143,2,10,'easy','Số gồm 1 chục và 0 đơn vị là [b1].',[{key:'b1',text:''}],{b1:'10'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(143,3,1,'easy','Số 96 đọc là?',[{key:'A',text:'chín mươi sáu'},{key:'B',text:'sáu mươi chín'},{key:'C',text:'chín sáu'}],'A'),
  sc(143,3,2,'easy','Số "bảy mươi ba" viết là?',[{key:'A',text:'37'},{key:'B',text:'73'},{key:'C',text:'77'}],'B'),
  sc(143,3,3,'easy','Số nào lớn hơn 50?',[{key:'A',text:'45'},{key:'B',text:'38'},{key:'C',text:'67'}],'C'),
  sc(143,3,4,'easy','Số nào bé hơn 20?',[{key:'A',text:'19'},{key:'B',text:'20'},{key:'C',text:'21'}],'A'),
  tf(143,3,5,'easy','Số 10 là số có hai chữ số. Đúng hay sai?',true),
  tf(143,3,6,'easy','Số 9 là số có hai chữ số. Đúng hay sai?',false,'9 chỉ có một chữ số.'),
  tf(143,3,7,'easy','Số 77 có chữ số hàng chục bằng chữ số hàng đơn vị. Đúng hay sai?',true),
  fb(143,3,8,'easy','Số liền sau của 29 là [b1].',[{key:'b1',text:''}],{b1:'30'}),
  fb(143,3,9,'easy','Số liền trước của 61 là [b1].',[{key:'b1',text:''}],{b1:'60'}),
  ct(143,3,10,'easy','🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 Có bao nhiêu bông hoa?','14'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(143,4,1,'medium','Số nào có chữ số hàng chục là 7?',[{key:'A',text:'57'},{key:'B',text:'75'},{key:'C',text:'17'}],'B'),
  sc(143,4,2,'medium','Số nào có chữ số hàng đơn vị là 0?',[{key:'A',text:'40'},{key:'B',text:'04'},{key:'C',text:'44'}],'A'),
  sc(143,4,3,'medium','Số 2-chữ số có chữ số hàng chục gấp đôi chữ số hàng đơn vị là?',[{key:'A',text:'24'},{key:'B',text:'42'},{key:'C',text:'22'}],'A','2 = 2×1, nên 21 không đúng; 4=2×2 → 42.'),
  mc(143,4,4,'medium','Số nào có chữ số hàng đơn vị lớn hơn chữ số hàng chục?',[{key:'A',text:'39'},{key:'B',text:'72'},{key:'C',text:'58'}],['A','C']),
  mc(143,4,5,'medium','Số nào là số chẵn có hai chữ số?',[{key:'A',text:'11'},{key:'B',text:'24'},{key:'C',text:'36'}],['B','C']),
  mc(143,4,6,'medium','Số nào lớn hơn 40 và bé hơn 50?',[{key:'A',text:'42'},{key:'B',text:'50'},{key:'C',text:'47'}],['A','C']),
  mt(143,4,7,'medium','Nối số với cách đọc:',[{key:'A',text:'45'},{key:'B',text:'72'},{key:'C',text:'93'}],{A:'bốn mươi lăm',B:'bảy mươi hai',C:'chín mươi ba'}),
  mt(143,4,8,'medium','Nối số với phân tích:',[{key:'A',text:'36'},{key:'B',text:'81'},{key:'C',text:'50'}],{A:'3 chục 6 đơn vị',B:'8 chục 1 đơn vị',C:'5 chục 0 đơn vị'}),
  dd(143,4,9,'medium','Sắp xếp từ bé đến lớn: 64, 46, 44, 66',[{key:'1',text:'64'},{key:'2',text:'46'},{key:'3',text:'44'},{key:'4',text:'66'}],['3','2','1','4']),
  dd(143,4,10,'medium','Sắp xếp từ lớn đến bé: 31, 13, 33, 11',[{key:'1',text:'31'},{key:'2',text:'13'},{key:'3',text:'33'},{key:'4',text:'11'}],['3','1','2','4']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(143,5,1,'medium','Điền vào bảng: Số 34 = ? chục ? đơn vị',[{key:'chuc',text:'?'},{key:'donvi',text:'?'}],{chuc:'3',donvi:'4'}),
  tf2(143,5,2,'medium','Điền vào bảng: Số 60 = ? chục ? đơn vị',[{key:'chuc',text:'?'},{key:'donvi',text:'?'}],{chuc:'6',donvi:'0'}),
  nl(143,5,3,'medium','Điền số còn thiếu vào số dòng: 10, __, 30, 40',[{key:'a',text:'?'}],{a:'20'}),
  nl(143,5,4,'medium','Điền số còn thiếu: 55, 60, __, 70',[{key:'a',text:'?'}],{a:'65'}),
  pz(143,5,5,'medium','Tôi có 5 chục và 5 đơn vị. Tôi là số nào?',[{key:'A',text:'50'},{key:'B',text:'55'},{key:'C',text:'45'}],'B'),
  pz(143,5,6,'medium','Tôi là số liền sau của 39. Tôi là số nào?',[{key:'A',text:'38'},{key:'B',text:'40'},{key:'C',text:'41'}],'B'),
  pz(143,5,7,'medium','Tôi có chữ số hàng chục là 7 và chữ số hàng đơn vị là 7. Tôi là số nào?',[{key:'A',text:'77'},{key:'B',text:'7'},{key:'C',text:'17'}],'A'),
  mt(143,5,8,'medium','Nối số với hình minh hoạ (chục và đơn vị):',[{key:'A',text:'23'},{key:'B',text:'41'},{key:'C',text:'15'}],{A:'2 thanh 3 chấm',B:'4 thanh 1 chấm',C:'1 thanh 5 chấm'}),
  mt(143,5,9,'medium','Nối cách đọc với số:',[{key:'A',text:'mười hai'},{key:'B',text:'hai mươi mốt'},{key:'C',text:'một trăm'}],{A:'12',B:'21',C:'100'}),
  dd(143,5,10,'medium','Sắp xếp: 25, 52, 55, 22 từ bé đến lớn',[{key:'1',text:'25'},{key:'2',text:'52'},{key:'3',text:'55'},{key:'4',text:'22'}],['4','1','2','3']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(143,6,1,'hard','Số có 9 chục và 9 đơn vị là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fb(143,6,2,'hard','Số lớn nhất có hai chữ số là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fb(143,6,3,'hard','Có [b1] số có hai chữ số (từ 10 đến 99).',[{key:'b1',text:''}],{b1:'90'}),
  pz(143,6,4,'hard','Tôi là số chẵn, lớn hơn 48 và bé hơn 52. Tôi là số nào?',[{key:'A',text:'49'},{key:'B',text:'50'},{key:'C',text:'51'}],'B'),
  pz(143,6,5,'hard','Tôi có tổng hai chữ số bằng 10, hàng chục là 6. Tôi là số nào?',[{key:'A',text:'64'},{key:'B',text:'46'},{key:'C',text:'55'}],'A','6+4=10.'),
  pz(143,6,6,'hard','Tôi là số có hai chữ số giống nhau và bằng 66. Đúng hay sai?',[{key:'A',text:'Đúng'},{key:'B',text:'Sai'}],'A'),
  mc(143,6,7,'hard','Số nào có tổng hai chữ số bằng 9?',[{key:'A',text:'45'},{key:'B',text:'63'},{key:'C',text:'18'}],['A','B','C']),
  mc(143,6,8,'hard','Số nào lớn hơn 79 và nhỏ hơn 90?',[{key:'A',text:'80'},{key:'B',text:'85'},{key:'C',text:'90'}],['A','B']),
  so(143,6,9,'hard','Sắp xếp từ lớn đến bé: 17, 71, 11, 77',[{key:'1',text:'17'},{key:'2',text:'71'},{key:'3',text:'11'},{key:'4',text:'77'}],['4','2','1','3']),
  so(143,6,10,'hard','Sắp xếp từ bé đến lớn: 90, 19, 91, 10',[{key:'1',text:'90'},{key:'2',text:'19'},{key:'3',text:'91'},{key:'4',text:'10'}],['4','2','1','3']),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(143,7,1,'hard','Ghép cặp số với số liền sau của nó:',[{key:'A',text:'19'},{key:'B',text:'20'},{key:'C',text:'49'},{key:'D',text:'50'}]),
  gm(143,7,2,'hard','Ghép cặp số với cách phân tích chục-đơn vị:',[{key:'A',text:'36'},{key:'B',text:'3 chục 6 đơn vị'},{key:'C',text:'58'},{key:'D',text:'5 chục 8 đơn vị'}]),
  mt(143,7,3,'hard','Nối số với số liền trước:',[{key:'A',text:'40'},{key:'B',text:'70'},{key:'C',text:'100'}],{A:'39',B:'69',C:'99'}),
  mt(143,7,4,'hard','Nối số với số liền sau:',[{key:'A',text:'29'},{key:'B',text:'59'},{key:'C',text:'89'}],{A:'30',B:'60',C:'90'}),
  mt(143,7,5,'hard','Nối số với cách đọc bằng tiếng Việt:',[{key:'A',text:'11'},{key:'B',text:'21'},{key:'C',text:'31'}],{A:'mười một',B:'hai mươi mốt',C:'ba mươi mốt'}),
  fb(143,7,6,'hard','Số gồm 7 chục và 0 đơn vị là [b1].',[{key:'b1',text:''}],{b1:'70'}),
  fb(143,7,7,'hard','10 chục = [b1].',[{key:'b1',text:''}],{b1:'100'}),
  fb(143,7,8,'hard','Số liền trước số liền sau của 50 là [b1].',[{key:'b1',text:''}],{b1:'50'}),
  dd(143,7,9,'hard','Sắp xếp từ bé đến lớn: 88, 18, 81, 11',[{key:'1',text:'88'},{key:'2',text:'18'},{key:'3',text:'81'},{key:'4',text:'11'}],['4','2','3','1']),
  dd(143,7,10,'hard','Sắp xếp từ lớn đến bé: 43, 34, 44, 33',[{key:'1',text:'43'},{key:'2',text:'34'},{key:'3',text:'44'},{key:'4',text:'33'}],['3','1','2','4']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(143,8,1,'hard','Chọn tất cả số có hai chữ số giống nhau:',[{key:'A',text:'11'},{key:'B',text:'22'},{key:'C',text:'99'}],['A','B','C']),
  mc(143,8,2,'hard','Số nào có hàng chục lớn hơn hàng đơn vị?',[{key:'A',text:'73'},{key:'B',text:'37'},{key:'C',text:'85'}],['A','C']),
  mc(143,8,3,'hard','Số nào chia hết cho 10?',[{key:'A',text:'30'},{key:'B',text:'55'},{key:'C',text:'80'}],['A','C']),
  pz(143,8,4,'hard','Tôi là số lớn nhất có hai chữ số mà tổng hai chữ số là 10. Tôi là số nào?',[{key:'A',text:'91'},{key:'B',text:'82'},{key:'C',text:'55'}],'A','9+1=10, 91 > 82.'),
  pz(143,8,5,'hard','Tôi là số bé nhất có hai chữ số. Tôi là số nào?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'20'}],'A'),
  pz(143,8,6,'hard','Số nào khi bỏ chữ số hàng đơn vị đi thì còn lại số 5?',[{key:'A',text:'50'},{key:'B',text:'55'},{key:'C',text:'cả A và B'}],'C'),
  so(143,8,7,'hard','Sắp xếp từ bé đến lớn: 66, 56, 76, 46',[{key:'1',text:'66'},{key:'2',text:'56'},{key:'3',text:'76'},{key:'4',text:'46'}],['4','2','1','3']),
  so(143,8,8,'hard','Sắp xếp từ lớn đến bé: 28, 82, 22, 88',[{key:'1',text:'28'},{key:'2',text:'82'},{key:'3',text:'22'},{key:'4',text:'88'}],['4','2','1','3']),
  co(143,8,9,'hard','Gạch bỏ số không phải số chẵn:',[{key:'A',text:'24'},{key:'B',text:'35'},{key:'C',text:'46'},{key:'D',text:'57'}],['B','D']),
  co(143,8,10,'hard','Gạch bỏ số không có hai chữ số:',[{key:'A',text:'9'},{key:'B',text:'19'},{key:'C',text:'99'},{key:'D',text:'100'}],['A','D']),
];

// ─── LESSON 144: So sánh số có hai chữ số ─────────────────────────────────
const L144: Row[] = [
  // Ex1 easy
  sc(144,1,1,'easy','So sánh: 34 __ 43',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],'B'),
  sc(144,1,2,'easy','So sánh: 78 __ 78',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],'C'),
  sc(144,1,3,'easy','Số nào lớn hơn: 56 hay 65?',[{key:'A',text:'56'},{key:'B',text:'65'},{key:'C',text:'Bằng nhau'}],'B'),
  sc(144,1,4,'easy','Số nào bé hơn: 90 hay 89?',[{key:'A',text:'90'},{key:'B',text:'89'},{key:'C',text:'Bằng nhau'}],'B'),
  tf(144,1,5,'easy','45 > 54. Đúng hay sai?',false,'45 < 54.'),
  tf(144,1,6,'easy','32 < 33. Đúng hay sai?',true),
  tf(144,1,7,'easy','70 = 70. Đúng hay sai?',true),
  fb(144,1,8,'easy','23 [b1] 32 (điền dấu >, < hoặc =)',[{key:'b1',text:''}],{b1:'<'}),
  fb(144,1,9,'easy','99 [b1] 89 (điền dấu >, < hoặc =)',[{key:'b1',text:''}],{b1:'>'}),
  fb(144,1,10,'easy','55 [b1] 55 (điền dấu >, < hoặc =)',[{key:'b1',text:''}],{b1:'='}),

  // Ex2 easy
  ct(144,2,1,'easy','🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋 Có bao nhiêu quả chanh?','11'),
  ct(144,2,2,'easy','🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 Có bao nhiêu con cá?','13'),
  ct(144,2,3,'easy','🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺 Có bao nhiêu bông?','16'),
  so(144,2,4,'easy','Sắp xếp từ bé đến lớn: 42, 24, 44, 22',[{key:'1',text:'42'},{key:'2',text:'24'},{key:'3',text:'44'},{key:'4',text:'22'}],['4','2','1','3']),
  so(144,2,5,'easy','Sắp xếp từ lớn đến bé: 61, 16, 66, 11',[{key:'1',text:'61'},{key:'2',text:'16'},{key:'3',text:'66'},{key:'4',text:'11'}],['3','1','2','4']),
  so(144,2,6,'easy','Sắp xếp từ bé đến lớn: 38, 83, 33, 88',[{key:'1',text:'38'},{key:'2',text:'83'},{key:'3',text:'33'},{key:'4',text:'88'}],['3','1','2','4']),
  co(144,2,7,'easy','Gạch bỏ số bé hơn 50:',[{key:'A',text:'45'},{key:'B',text:'60'},{key:'C',text:'38'},{key:'D',text:'72'}],['A','C']),
  co(144,2,8,'easy','Gạch bỏ số lớn hơn 70:',[{key:'A',text:'65'},{key:'B',text:'80'},{key:'C',text:'71'},{key:'D',text:'50'}],['B','C']),
  fb(144,2,9,'easy','Số lớn nhất trong 34, 43, 30 là [b1].',[{key:'b1',text:''}],{b1:'43'}),
  fb(144,2,10,'easy','Số bé nhất trong 57, 75, 70 là [b1].',[{key:'b1',text:''}],{b1:'57'}),

  // Ex3 easy
  sc(144,3,1,'easy','Số lớn nhất trong 21, 12, 22 là?',[{key:'A',text:'21'},{key:'B',text:'12'},{key:'C',text:'22'}],'C'),
  sc(144,3,2,'easy','Số bé nhất trong 55, 45, 50 là?',[{key:'A',text:'55'},{key:'B',text:'45'},{key:'C',text:'50'}],'B'),
  sc(144,3,3,'easy','67 so với 76 thì?',[{key:'A',text:'67 > 76'},{key:'B',text:'67 < 76'},{key:'C',text:'67 = 76'}],'B'),
  sc(144,3,4,'easy','Điền dấu: 90 __ 80',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],'A'),
  tf(144,3,5,'easy','Số lớn nhất có hai chữ số là 99. Đúng hay sai?',true),
  tf(144,3,6,'easy','85 > 58. Đúng hay sai?',true),
  tf(144,3,7,'easy','40 < 39. Đúng hay sai?',false),
  fb(144,3,8,'easy','Số lớn hơn 59 và nhỏ hơn 61 là [b1].',[{key:'b1',text:''}],{b1:'60'}),
  fb(144,3,9,'easy','Điền dấu: 14 [b1] 41',[{key:'b1',text:''}],{b1:'<'}),
  ct(144,3,10,'easy','🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇 Có bao nhiêu chùm nho?','17'),

  // Ex4 medium
  sc(144,4,1,'medium','Số nào lớn nhất: 73, 37, 77, 33?',[{key:'A',text:'73'},{key:'B',text:'37'},{key:'C',text:'77'}],'C'),
  sc(144,4,2,'medium','Số nào bé nhất: 64, 46, 44, 66?',[{key:'A',text:'64'},{key:'B',text:'46'},{key:'C',text:'44'}],'C'),
  sc(144,4,3,'medium','Có bao nhiêu số lớn hơn 50 và bé hơn 55?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','51,52,53,54 có 4 số.'),
  mc(144,4,4,'medium','Chọn tất cả số lớn hơn 60:',[{key:'A',text:'58'},{key:'B',text:'62'},{key:'C',text:'71'}],['B','C']),
  mc(144,4,5,'medium','Chọn tất cả số bé hơn 30:',[{key:'A',text:'25'},{key:'B',text:'29'},{key:'C',text:'30'}],['A','B']),
  mc(144,4,6,'medium','Chọn tất cả số bằng nhau (nếu có):',[{key:'A',text:'50'},{key:'B',text:'50'},{key:'C',text:'55'}],['A','B']),
  mt(144,4,7,'medium','Nối số với dấu so sánh với 50:',[{key:'A',text:'45'},{key:'B',text:'50'},{key:'C',text:'55'}],{A:'< 50',B:'= 50',C:'> 50'}),
  mt(144,4,8,'medium','Nối cặp số bằng nhau hoặc không bằng:',[{key:'A',text:'66'},{key:'B',text:'88'},{key:'C',text:'77'}],{A:'lớn nhất',B:'lớn nhất',C:'ở giữa'}),
  dd(144,4,9,'medium','Sắp xếp từ bé đến lớn: 95, 59, 99, 55',[{key:'1',text:'95'},{key:'2',text:'59'},{key:'3',text:'99'},{key:'4',text:'55'}],['4','2','1','3']),
  dd(144,4,10,'medium','Sắp xếp từ lớn đến bé: 26, 62, 22, 66',[{key:'1',text:'26'},{key:'2',text:'62'},{key:'3',text:'22'},{key:'4',text:'66'}],['4','2','1','3']),

  // Ex5 medium
  tf2(144,5,1,'medium','So sánh và điền: 34 __ 43',[{key:'dau',text:'?'}],{dau:'<'}),
  tf2(144,5,2,'medium','So sánh và điền: 87 __ 78',[{key:'dau',text:'?'}],{dau:'>'}),
  nl(144,5,3,'medium','Điền số còn thiếu: 20, 30, __, 50',[{key:'a',text:'?'}],{a:'40'}),
  nl(144,5,4,'medium','Điền số còn thiếu: 45, 50, __, 60',[{key:'a',text:'?'}],{a:'55'}),
  pz(144,5,5,'medium','Tôi lớn hơn 49 và bé hơn 51. Tôi là số nào?',[{key:'A',text:'48'},{key:'B',text:'50'},{key:'C',text:'52'}],'B'),
  pz(144,5,6,'medium','Tôi là số bé nhất lớn hơn 89. Tôi là số nào?',[{key:'A',text:'89'},{key:'B',text:'90'},{key:'C',text:'91'}],'B'),
  pz(144,5,7,'medium','Tôi là số lớn nhất bé hơn 40. Tôi là số nào?',[{key:'A',text:'39'},{key:'B',text:'38'},{key:'C',text:'40'}],'A'),
  mt(144,5,8,'medium','Nối số với vị trí: lớn nhất / bé nhất trong nhóm 25, 52, 50:',[{key:'A',text:'25'},{key:'B',text:'52'},{key:'C',text:'50'}],{A:'bé nhất',B:'lớn nhất',C:'ở giữa'}),
  mt(144,5,9,'medium','Nối cặp so sánh đúng:',[{key:'A',text:'34 __ 43'},{key:'B',text:'67 __ 67'},{key:'C',text:'90 __ 80'}],{A:'<',B:'=',C:'>'}),
  dd(144,5,10,'medium','Sắp xếp từ bé đến lớn: 13, 31, 11, 33',[{key:'1',text:'13'},{key:'2',text:'31'},{key:'3',text:'11'},{key:'4',text:'33'}],['3','1','2','4']),

  // Ex6 hard
  fb(144,6,1,'hard','Số lớn nhất có hai chữ số là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fb(144,6,2,'hard','Số chẵn lớn nhất bé hơn 50 là [b1].',[{key:'b1',text:''}],{b1:'48'}),
  fb(144,6,3,'hard','Số lẻ bé nhất lớn hơn 80 là [b1].',[{key:'b1',text:''}],{b1:'81'}),
  pz(144,6,4,'hard','Tôi là số lớn nhất có hai chữ số giống nhau. Tôi là?',[{key:'A',text:'88'},{key:'B',text:'99'},{key:'C',text:'77'}],'B'),
  pz(144,6,5,'hard','Có bao nhiêu số có hai chữ số lớn hơn 95?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','96,97,98,99.'),
  pz(144,6,6,'hard','Số nào đứng giữa 74 và 76?',[{key:'A',text:'74'},{key:'B',text:'75'},{key:'C',text:'76'}],'B'),
  mc(144,6,7,'hard','Số nào vừa lớn hơn 40 vừa bé hơn 50?',[{key:'A',text:'41'},{key:'B',text:'45'},{key:'C',text:'50'}],['A','B']),
  mc(144,6,8,'hard','Số nào bé hơn 20?',[{key:'A',text:'10'},{key:'B',text:'15'},{key:'C',text:'20'}],['A','B']),
  so(144,6,9,'hard','Sắp xếp từ lớn đến bé: 48, 84, 44, 88',[{key:'1',text:'48'},{key:'2',text:'84'},{key:'3',text:'44'},{key:'4',text:'88'}],['4','2','1','3']),
  so(144,6,10,'hard','Sắp xếp từ bé đến lớn: 19, 91, 99, 11',[{key:'1',text:'19'},{key:'2',text:'91'},{key:'3',text:'99'},{key:'4',text:'11'}],['4','1','2','3']),

  // Ex7 hard
  gm(144,7,1,'hard','Ghép cặp số với dấu so sánh phù hợp:',[{key:'A',text:'34 _ 43'},{key:'B',text:'<'},{key:'C',text:'77 _ 77'},{key:'D',text:'='}]),
  gm(144,7,2,'hard','Ghép cặp: số lớn hơn 50 với số bé hơn 50:',[{key:'A',text:'60'},{key:'B',text:'40'},{key:'C',text:'70'},{key:'D',text:'30'}]),
  mt(144,7,3,'hard','Nối số với phát biểu so sánh đúng:',[{key:'A',text:'25'},{key:'B',text:'52'},{key:'C',text:'45'}],{A:'nhỏ hơn 30',B:'lớn hơn 50',C:'bằng 45'}),
  mt(144,7,4,'hard','Nối: số lớn nhất / nhỏ nhất trong từng nhóm:',[{key:'A',text:'nhóm 30,40,50'},{key:'B',text:'nhóm 11,22,33'}],{A:'lớn nhất: 50',B:'nhỏ nhất: 11'}),
  mt(144,7,5,'hard','Nối dãy với thứ tự sắp xếp:',[{key:'A',text:'10,20,30'},{key:'B',text:'99,88,77'}],{A:'tăng dần',B:'giảm dần'}),
  fb(144,7,6,'hard','Số lớn hơn 98 mà vẫn có hai chữ số là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fb(144,7,7,'hard','Trong 45 và 54, số lớn hơn là [b1].',[{key:'b1',text:''}],{b1:'54'}),
  fb(144,7,8,'hard','Số chẵn lớn nhất nhỏ hơn 100 là [b1].',[{key:'b1',text:''}],{b1:'98'}),
  dd(144,7,9,'hard','Sắp xếp từ bé đến lớn: 53, 35, 55, 33',[{key:'1',text:'53'},{key:'2',text:'35'},{key:'3',text:'55'},{key:'4',text:'33'}],['4','2','1','3']),
  dd(144,7,10,'hard','Sắp xếp từ lớn đến bé: 67, 76, 60, 70',[{key:'1',text:'67'},{key:'2',text:'76'},{key:'3',text:'60'},{key:'4',text:'70'}],['2','4','1','3']),

  // Ex8 hard
  mc(144,8,1,'hard','Số nào lớn hơn 85?',[{key:'A',text:'86'},{key:'B',text:'90'},{key:'C',text:'84'}],['A','B']),
  mc(144,8,2,'hard','Số nào bé hơn 15?',[{key:'A',text:'10'},{key:'B',text:'14'},{key:'C',text:'15'}],['A','B']),
  mc(144,8,3,'hard','Số nào có hàng chục lớn hơn hàng đơn vị?',[{key:'A',text:'73'},{key:'B',text:'37'},{key:'C',text:'92'}],['A','C']),
  pz(144,8,4,'hard','Tôi lớn hơn 88 và bé hơn 90. Tôi là?',[{key:'A',text:'87'},{key:'B',text:'89'},{key:'C',text:'91'}],'B'),
  pz(144,8,5,'hard','Số lẻ lớn nhất bé hơn 50 là?',[{key:'A',text:'49'},{key:'B',text:'47'},{key:'C',text:'48'}],'A'),
  pz(144,8,6,'hard','Số chẵn nhỏ nhất lớn hơn 90 là?',[{key:'A',text:'92'},{key:'B',text:'91'},{key:'C',text:'90'}],'A','91 lẻ, 92 chẵn.'),
  so(144,8,7,'hard','Sắp xếp từ bé đến lớn: 79, 97, 77, 99',[{key:'1',text:'79'},{key:'2',text:'97'},{key:'3',text:'77'},{key:'4',text:'99'}],['3','1','2','4']),
  so(144,8,8,'hard','Sắp xếp từ lớn đến bé: 14, 41, 11, 44',[{key:'1',text:'14'},{key:'2',text:'41'},{key:'3',text:'11'},{key:'4',text:'44'}],['4','2','1','3']),
  co(144,8,9,'hard','Gạch bỏ số không lớn hơn 50:',[{key:'A',text:'60'},{key:'B',text:'40'},{key:'C',text:'50'},{key:'D',text:'55'}],['B','C']),
  co(144,8,10,'hard','Gạch bỏ số không nhỏ hơn 70:',[{key:'A',text:'65'},{key:'B',text:'70'},{key:'C',text:'80'},{key:'D',text:'60'}],['B','C']),
];

// ─── LESSON 145: Bảng các số từ 1 đến 100 ─────────────────────────────────
const L145: Row[] = [
  // Ex1 easy
  sc(145,1,1,'easy','Trong bảng 1-100, số ở hàng 3 cột 5 là?',[{key:'A',text:'25'},{key:'B',text:'35'},{key:'C',text:'30'}],'A','Hàng 3: 21-30, cột 5 là 25.'),
  sc(145,1,2,'easy','Số 50 nằm ở hàng mấy trong bảng 1-100?',[{key:'A',text:'hàng 4'},{key:'B',text:'hàng 5'},{key:'C',text:'hàng 6'}],'B'),
  sc(145,1,3,'easy','Các số trong cùng một hàng của bảng 1-100 có điểm gì chung?',[{key:'A',text:'Cùng chữ số hàng chục'},{key:'B',text:'Cùng chữ số hàng đơn vị'},{key:'C',text:'Bằng nhau'}],'A'),
  sc(145,1,4,'easy','Các số trong cùng một cột của bảng 1-100 có điểm gì chung?',[{key:'A',text:'Cùng chữ số hàng chục'},{key:'B',text:'Cùng chữ số hàng đơn vị'},{key:'C',text:'Lớn hơn nhau 10'}],'B'),
  tf(145,1,5,'easy','Số 100 nằm ở hàng cuối của bảng 1-100. Đúng hay sai?',true),
  tf(145,1,6,'easy','Số 1 nằm ở góc trên bên trái của bảng 1-100. Đúng hay sai?',true),
  tf(145,1,7,'easy','Các số cùng cột cách nhau 5. Đúng hay sai?',false,'Cách nhau 10.'),
  fb(145,1,8,'easy','Số ở hàng 1 cột 7 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'7'}),
  fb(145,1,9,'easy','Số ở hàng 10 cột 10 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'100'}),
  fb(145,1,10,'easy','Số ở hàng 5 cột 1 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'41'}),

  // Ex2 easy
  ct(145,2,1,'easy','🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 Đếm số chấm vàng','19'),
  ct(145,2,2,'easy','🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 Đếm số chấm đỏ','20'),
  ct(145,2,3,'easy','🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 Đếm số chấm xanh lá','21'),
  so(145,2,4,'easy','Sắp xếp từ bé đến lớn: 75, 57, 70, 50',[{key:'1',text:'75'},{key:'2',text:'57'},{key:'3',text:'70'},{key:'4',text:'50'}],['4','2','3','1']),
  so(145,2,5,'easy','Sắp xếp từ lớn đến bé: 81, 18, 80, 10',[{key:'1',text:'81'},{key:'2',text:'18'},{key:'3',text:'80'},{key:'4',text:'10'}],['1','3','2','4']),
  so(145,2,6,'easy','Sắp xếp từ bé đến lớn: 6, 16, 60, 16',[{key:'1',text:'6'},{key:'2',text:'16'},{key:'3',text:'60'}],['1','2','3']),
  co(145,2,7,'easy','Gạch bỏ số không có trong bảng 1-100:',[{key:'A',text:'0'},{key:'B',text:'50'},{key:'C',text:'101'},{key:'D',text:'75'}],['A','C']),
  co(145,2,8,'easy','Gạch bỏ số không phải bội số của 10 trong 10-100:',[{key:'A',text:'20'},{key:'B',text:'25'},{key:'C',text:'50'},{key:'D',text:'55'}],['B','D']),
  fb(145,2,9,'easy','Trong bảng 1-100, hàng 2 gồm các số từ [b1] đến [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'11',b2:'20'}),
  fb(145,2,10,'easy','Trong bảng 1-100, hàng 7 gồm các số từ [b1] đến [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'61',b2:'70'}),

  // Ex3 easy
  sc(145,3,1,'easy','Số nào đứng ngay sau 39 trong bảng 1-100?',[{key:'A',text:'38'},{key:'B',text:'40'},{key:'C',text:'49'}],'B'),
  sc(145,3,2,'easy','Trong bảng, số ngay bên dưới 45 là?',[{key:'A',text:'44'},{key:'B',text:'46'},{key:'C',text:'55'}],'C'),
  sc(145,3,3,'easy','Trong bảng, số ngay bên trên 72 là?',[{key:'A',text:'62'},{key:'B',text:'73'},{key:'C',text:'71'}],'A'),
  sc(145,3,4,'easy','Hàng 1 của bảng 1-100 gồm các số nào?',[{key:'A',text:'0-9'},{key:'B',text:'1-10'},{key:'C',text:'11-20'}],'B'),
  tf(145,3,5,'easy','Số 30 nằm ở cuối hàng 3 của bảng 1-100. Đúng hay sai?',true),
  tf(145,3,6,'easy','Các số cùng cột trong bảng cách nhau 10. Đúng hay sai?',true),
  tf(145,3,7,'easy','Hàng 5 của bảng bắt đầu bằng số 50. Đúng hay sai?',false,'Hàng 5 bắt đầu từ 41.'),
  fb(145,3,8,'easy','Số ngay bên dưới 20 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'30'}),
  fb(145,3,9,'easy','Số ngay bên trên 91 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'81'}),
  ct(145,3,10,'easy','🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 Có bao nhiêu ngôi sao vàng?','10'),

  // Ex4 medium
  sc(145,4,1,'medium','Trong bảng 1-100, số ngay bên phải của 67 là?',[{key:'A',text:'57'},{key:'B',text:'68'},{key:'C',text:'77'}],'B'),
  sc(145,4,2,'medium','Trong bảng 1-100, số ngay bên trái của 40 là?',[{key:'A',text:'39'},{key:'B',text:'41'},{key:'C',text:'30'}],'A'),
  sc(145,4,3,'medium','Quy luật của bảng 1-100: đi từ trái sang phải, các số tăng thêm?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'10'}],'A'),
  mc(145,4,4,'medium','Số nào nằm ở cột 5 (chữ số hàng đơn vị là 5)?',[{key:'A',text:'15'},{key:'B',text:'25'},{key:'C',text:'35'}],['A','B','C']),
  mc(145,4,5,'medium','Số nào nằm ở hàng 8 (từ 71-80)?',[{key:'A',text:'75'},{key:'B',text:'80'},{key:'C',text:'81'}],['A','B']),
  mc(145,4,6,'medium','Số nào cùng cột với số 3 (chữ số hàng đơn vị là 3)?',[{key:'A',text:'13'},{key:'B',text:'33'},{key:'C',text:'53'}],['A','B','C']),
  mt(145,4,7,'medium','Nối số với hàng tương ứng trong bảng:',[{key:'A',text:'15'},{key:'B',text:'67'},{key:'C',text:'93'}],{A:'hàng 2',B:'hàng 7',C:'hàng 10'}),
  mt(145,4,8,'medium','Nối số với cột tương ứng (chữ số hàng đơn vị):',[{key:'A',text:'24'},{key:'B',text:'35'},{key:'C',text:'46'}],{A:'cột 4',B:'cột 5',C:'cột 6'}),
  dd(145,4,9,'medium','Sắp xếp từ bé đến lớn: 47, 74, 77, 44',[{key:'1',text:'47'},{key:'2',text:'74'},{key:'3',text:'77'},{key:'4',text:'44'}],['4','1','2','3']),
  dd(145,4,10,'medium','Sắp xếp từ lớn đến bé: 83, 38, 80, 30',[{key:'1',text:'83'},{key:'2',text:'38'},{key:'3',text:'80'},{key:'4',text:'30'}],['1','3','2','4']),

  // Ex5 medium
  tf2(145,5,1,'medium','Điền số còn thiếu trong bảng: hàng 6 cột 3 là?',[{key:'a',text:'?'}],{a:'53'}),
  tf2(145,5,2,'medium','Điền số còn thiếu trong bảng: hàng 9 cột 8 là?',[{key:'a',text:'?'}],{a:'88'}),
  nl(145,5,3,'medium','Điền số tiếp theo: 10, 20, 30, __, 50',[{key:'a',text:'?'}],{a:'40'}),
  nl(145,5,4,'medium','Điền số tiếp theo: 5, 15, 25, __, 45',[{key:'a',text:'?'}],{a:'35'}),
  pz(145,5,5,'medium','Tôi nằm ở hàng 4 cột 7 trong bảng 1-100. Tôi là số nào?',[{key:'A',text:'37'},{key:'B',text:'47'},{key:'C',text:'74'}],'A','Hàng 4: 31-40, cột 7: 37.'),
  pz(145,5,6,'medium','Tôi nằm ở hàng 6 cột 2 trong bảng 1-100. Tôi là số nào?',[{key:'A',text:'52'},{key:'B',text:'62'},{key:'C',text:'26'}],'A','Hàng 6: 51-60, cột 2: 52.'),
  pz(145,5,7,'medium','Tôi là số nằm ngay giữa 49 và 51 trong bảng. Tôi là số nào?',[{key:'A',text:'49'},{key:'B',text:'50'},{key:'C',text:'51'}],'B'),
  mt(145,5,8,'medium','Nối số với vị trí trong bảng:',[{key:'A',text:'1'},{key:'B',text:'100'},{key:'C',text:'55'}],{A:'góc trên trái',B:'góc dưới phải',C:'giữa bảng'}),
  mt(145,5,9,'medium','Nối quy luật với hướng đi trong bảng:',[{key:'A',text:'tăng 1'},{key:'B',text:'tăng 10'}],{A:'từ trái sang phải',B:'từ trên xuống dưới'}),
  dd(145,5,10,'medium','Sắp xếp từ bé đến lớn: 92, 29, 99, 22',[{key:'1',text:'92'},{key:'2',text:'29'},{key:'3',text:'99'},{key:'4',text:'22'}],['4','2','1','3']),

  // Ex6 hard
  fb(145,6,1,'hard','Bảng 1-100 có tất cả [b1] số.',[{key:'b1',text:''}],{b1:'100'}),
  fb(145,6,2,'hard','Bảng 1-100 có [b1] hàng, mỗi hàng có [b2] số.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'10',b2:'10'}),
  fb(145,6,3,'hard','Số nằm ở hàng 3 cột 9 trong bảng 1-100 là [b1].',[{key:'b1',text:''}],{b1:'29'}),
  pz(145,6,4,'hard','Tôi là số lớn nhất ở hàng 5 trong bảng 1-100. Tôi là?',[{key:'A',text:'40'},{key:'B',text:'50'},{key:'C',text:'59'}],'B','Hàng 5: 41-50.'),
  pz(145,6,5,'hard','Tôi là số nhỏ nhất ở hàng 8 trong bảng 1-100. Tôi là?',[{key:'A',text:'70'},{key:'B',text:'71'},{key:'C',text:'80'}],'B','Hàng 8: 71-80.'),
  pz(145,6,6,'hard','Từ số 35 đi xuống 3 hàng trong bảng ta được số nào?',[{key:'A',text:'38'},{key:'B',text:'65'},{key:'C',text:'55'}],'B','35 + 30 = 65.'),
  mc(145,6,7,'hard','Số nào nằm ở cột cuối (cột 10) trong bảng 1-100?',[{key:'A',text:'10'},{key:'B',text:'50'},{key:'C',text:'80'}],['A','B','C']),
  mc(145,6,8,'hard','Số nào là bội số của 5 trong hàng 3 (21-30)?',[{key:'A',text:'25'},{key:'B',text:'30'},{key:'C',text:'22'}],['A','B']),
  so(145,6,9,'hard','Sắp xếp từ lớn đến bé: 36, 63, 66, 33',[{key:'1',text:'36'},{key:'2',text:'63'},{key:'3',text:'66'},{key:'4',text:'33'}],['3','2','1','4']),
  so(145,6,10,'hard','Sắp xếp từ bé đến lớn: 59, 95, 55, 99',[{key:'1',text:'59'},{key:'2',text:'95'},{key:'3',text:'55'},{key:'4',text:'99'}],['3','1','2','4']),

  // Ex7 hard
  gm(145,7,1,'hard','Ghép số với hàng trong bảng 1-100:',[{key:'A',text:'17'},{key:'B',text:'hàng 2'},{key:'C',text:'89'},{key:'D',text:'hàng 9'}]),
  gm(145,7,2,'hard','Ghép số với vị trí cột (chữ số đơn vị):',[{key:'A',text:'24'},{key:'B',text:'cột 4'},{key:'C',text:'37'},{key:'D',text:'cột 7'}]),
  mt(145,7,3,'hard','Nối số với hàng trong bảng 1-100:',[{key:'A',text:'43'},{key:'B',text:'78'},{key:'C',text:'95'}],{A:'hàng 5',B:'hàng 8',C:'hàng 10'}),
  mt(145,7,4,'hard','Nối: đi từ 20, mỗi bước cộng 10, bước thứ mấy đến số nào:',[{key:'A',text:'bước 1'},{key:'B',text:'bước 3'},{key:'C',text:'bước 5'}],{A:'30',B:'50',C:'70'}),
  mt(145,7,5,'hard','Nối số với số cách 2 hàng bên dưới (cộng 20):',[{key:'A',text:'14'},{key:'B',text:'53'},{key:'C',text:'76'}],{A:'34',B:'73',C:'96'}),
  fb(145,7,6,'hard','Trong bảng 1-100, số nằm ngay dưới 49 là [b1].',[{key:'b1',text:''}],{b1:'59'}),
  fb(145,7,7,'hard','Trong bảng 1-100, số nằm ngay trên 71 là [b1].',[{key:'b1',text:''}],{b1:'61'}),
  fb(145,7,8,'hard','Cột số 3 trong bảng 1-100 gồm 3, 13, 23, 33, ... số cuối cùng là [b1].',[{key:'b1',text:''}],{b1:'93'}),
  dd(145,7,9,'hard','Sắp xếp từ bé đến lớn: 72, 27, 70, 20',[{key:'1',text:'72'},{key:'2',text:'27'},{key:'3',text:'70'},{key:'4',text:'20'}],['4','2','3','1']),
  dd(145,7,10,'hard','Sắp xếp từ lớn đến bé: 84, 48, 88, 44',[{key:'1',text:'84'},{key:'2',text:'48'},{key:'3',text:'88'},{key:'4',text:'44'}],['3','1','2','4']),

  // Ex8 hard
  mc(145,8,1,'hard','Số nào nằm ở hàng cuối (hàng 10) của bảng 1-100?',[{key:'A',text:'91'},{key:'B',text:'95'},{key:'C',text:'100'}],['A','B','C']),
  mc(145,8,2,'hard','Số nào nằm ở cột đầu (cột 1) của bảng 1-100?',[{key:'A',text:'1'},{key:'B',text:'11'},{key:'C',text:'21'}],['A','B','C']),
  mc(145,8,3,'hard','Số nào vừa là bội số của 10 vừa nằm trong bảng 1-100?',[{key:'A',text:'30'},{key:'B',text:'50'},{key:'C',text:'100'}],['A','B','C']),
  pz(145,8,4,'hard','Từ số 15 đi sang phải 5 ô trong bảng, ta đến số nào?',[{key:'A',text:'20'},{key:'B',text:'10'},{key:'C',text:'25'}],'A','15 + 5 = 20.'),
  pz(145,8,5,'hard','Từ số 40 đi lên 3 hàng trong bảng, ta đến số nào?',[{key:'A',text:'10'},{key:'B',text:'13'},{key:'C',text:'70'}],'A','40 - 30 = 10.'),
  pz(145,8,6,'hard','Số nào nằm ở giao hàng 7, cột 6 trong bảng 1-100?',[{key:'A',text:'76'},{key:'B',text:'67'},{key:'C',text:'66'}],'B','Hàng 7: 61-70, cột 6: 66.'),
  so(145,8,7,'hard','Sắp xếp từ lớn đến bé: 18, 81, 80, 10',[{key:'1',text:'18'},{key:'2',text:'81'},{key:'3',text:'80'},{key:'4',text:'10'}],['2','3','1','4']),
  so(145,8,8,'hard','Sắp xếp từ bé đến lớn: 39, 93, 33, 99',[{key:'1',text:'39'},{key:'2',text:'93'},{key:'3',text:'33'},{key:'4',text:'99'}],['3','1','2','4']),
  co(145,8,9,'hard','Gạch bỏ số không nằm trong bảng 1-100:',[{key:'A',text:'0'},{key:'B',text:'50'},{key:'C',text:'100'},{key:'D',text:'101'}],['A','D']),
  co(145,8,10,'hard','Gạch bỏ số không phải bội của 9 (trong bảng 1-100):',[{key:'A',text:'18'},{key:'B',text:'20'},{key:'C',text:'45'},{key:'D',text:'50'}],['B','D']),
];

// ─── LESSON 146: Luyện tập chung (2-digit numbers mixed) ──────────────────
const L146: Row[] = [
  // Ex1 easy
  sc(146,1,1,'easy','Số nào có hai chữ số?',[{key:'A',text:'7'},{key:'B',text:'15'},{key:'C',text:'100'}],'B'),
  sc(146,1,2,'easy','Số 46 đọc là?',[{key:'A',text:'bốn mươi sáu'},{key:'B',text:'sáu mươi bốn'},{key:'C',text:'bốn sáu'}],'A'),
  sc(146,1,3,'easy','Số nào lớn hơn 50?',[{key:'A',text:'47'},{key:'B',text:'50'},{key:'C',text:'51'}],'C'),
  sc(146,1,4,'easy','Số nào bé hơn 30?',[{key:'A',text:'31'},{key:'B',text:'29'},{key:'C',text:'30'}],'B'),
  tf(146,1,5,'easy','23 < 32. Đúng hay sai?',true),
  tf(146,1,6,'easy','55 = 55. Đúng hay sai?',true),
  tf(146,1,7,'easy','80 > 90. Đúng hay sai?',false),
  fb(146,1,8,'easy','Số gồm 5 chục 7 đơn vị là [b1].',[{key:'b1',text:''}],{b1:'57'}),
  fb(146,1,9,'easy','Số liền sau của 69 là [b1].',[{key:'b1',text:''}],{b1:'70'}),
  fb(146,1,10,'easy','Số liền trước của 40 là [b1].',[{key:'b1',text:''}],{b1:'39'}),

  // Ex2 easy
  ct(146,2,1,'easy','🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌 Có bao nhiêu quả chuối?','22'),
  ct(146,2,2,'easy','🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸 Có bao nhiêu con ếch?','23'),
  ct(146,2,3,'easy','🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼 Có bao nhiêu bông hoa?','24'),
  so(146,2,4,'easy','Sắp xếp từ bé đến lớn: 36, 63, 30, 60',[{key:'1',text:'36'},{key:'2',text:'63'},{key:'3',text:'30'},{key:'4',text:'60'}],['3','1','4','2']),
  so(146,2,5,'easy','Sắp xếp từ lớn đến bé: 71, 17, 77, 11',[{key:'1',text:'71'},{key:'2',text:'17'},{key:'3',text:'77'},{key:'4',text:'11'}],['3','1','2','4']),
  so(146,2,6,'easy','Sắp xếp từ bé đến lớn: 58, 85, 50, 80',[{key:'1',text:'58'},{key:'2',text:'85'},{key:'3',text:'50'},{key:'4',text:'80'}],['3','1','4','2']),
  co(146,2,7,'easy','Gạch bỏ số lẻ:',[{key:'A',text:'14'},{key:'B',text:'21'},{key:'C',text:'36'},{key:'D',text:'45'}],['B','D']),
  co(146,2,8,'easy','Gạch bỏ số chẵn:',[{key:'A',text:'11'},{key:'B',text:'22'},{key:'C',text:'33'},{key:'D',text:'44'}],['B','D']),
  fb(146,2,9,'easy','Số lớn nhất trong 49, 94, 44, 99 là [b1].',[{key:'b1',text:''}],{b1:'99'}),
  fb(146,2,10,'easy','Số bé nhất trong 73, 37, 77, 33 là [b1].',[{key:'b1',text:''}],{b1:'33'}),

  // Ex3 easy
  sc(146,3,1,'easy','10 + 20 = ?',[{key:'A',text:'20'},{key:'B',text:'30'},{key:'C',text:'12'}],'B'),
  sc(146,3,2,'easy','50 - 20 = ?',[{key:'A',text:'30'},{key:'B',text:'70'},{key:'C',text:'20'}],'A'),
  sc(146,3,3,'easy','Số nào có chữ số hàng chục là 4?',[{key:'A',text:'14'},{key:'B',text:'40'},{key:'C',text:'44'}],'B'),
  sc(146,3,4,'easy','Số nào có chữ số hàng đơn vị là 6?',[{key:'A',text:'60'},{key:'B',text:'16'},{key:'C',text:'61'}],'B'),
  tf(146,3,5,'easy','10 + 10 = 20. Đúng hay sai?',true),
  tf(146,3,6,'easy','60 - 30 = 20. Đúng hay sai?',false,'60-30=30.'),
  tf(146,3,7,'easy','Số 45 lớn hơn 54. Đúng hay sai?',false),
  fb(146,3,8,'easy','20 + 30 = [b1].',[{key:'b1',text:''}],{b1:'50'}),
  fb(146,3,9,'easy','70 - 40 = [b1].',[{key:'b1',text:''}],{b1:'30'}),
  ct(146,3,10,'easy','🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉 Có bao nhiêu quả dưa hấu?','25'),

  // Ex4 medium
  sc(146,4,1,'medium','Tìm x: x + 20 = 50',[{key:'A',text:'30'},{key:'B',text:'70'},{key:'C',text:'20'}],'A'),
  sc(146,4,2,'medium','Tìm x: 80 - x = 30',[{key:'A',text:'50'},{key:'B',text:'40'},{key:'C',text:'60'}],'A'),
  sc(146,4,3,'medium','Lan có 25 cái kẹo, Nam có 14 cái kẹo. Cả hai có bao nhiêu cái kẹo?',[{key:'A',text:'39'},{key:'B',text:'11'},{key:'C',text:'40'}],'A'),
  mc(146,4,4,'medium','Số nào là số chẵn và lớn hơn 40?',[{key:'A',text:'42'},{key:'B',text:'45'},{key:'C',text:'50'}],['A','C']),
  mc(146,4,5,'medium','Số nào là số lẻ và nhỏ hơn 20?',[{key:'A',text:'11'},{key:'B',text:'15'},{key:'C',text:'20'}],['A','B']),
  mc(146,4,6,'medium','Điền dấu đúng: 34 __ 43',[{key:'A',text:'<'},{key:'B',text:'>'},{key:'C',text:'='}],['A']),
  mt(146,4,7,'medium','Nối phép tính với kết quả:',[{key:'A',text:'30+20'},{key:'B',text:'70-30'},{key:'C',text:'40+10'}],{A:'50',B:'40',C:'50'}),
  mt(146,4,8,'medium','Nối số với chữ số hàng chục:',[{key:'A',text:'53'},{key:'B',text:'76'},{key:'C',text:'28'}],{A:'5',B:'7',C:'2'}),
  dd(146,4,9,'medium','Sắp xếp từ bé đến lớn: 62, 26, 66, 22',[{key:'1',text:'62'},{key:'2',text:'26'},{key:'3',text:'66'},{key:'4',text:'22'}],['4','2','1','3']),
  dd(146,4,10,'medium','Sắp xếp từ lớn đến bé: 39, 93, 30, 90',[{key:'1',text:'39'},{key:'2',text:'93'},{key:'3',text:'30'},{key:'4',text:'90'}],['2','4','1','3']),

  // Ex5 medium
  tf2(146,5,1,'medium','Tính: 40 + 30 = ?',[{key:'a',text:'?'}],{a:'70'}),
  tf2(146,5,2,'medium','Tính: 90 - 50 = ?',[{key:'a',text:'?'}],{a:'40'}),
  nl(146,5,3,'medium','Điền số còn thiếu: 30, 40, __, 60',[{key:'a',text:'?'}],{a:'50'}),
  nl(146,5,4,'medium','Điền số còn thiếu: 15, 25, __, 45',[{key:'a',text:'?'}],{a:'35'}),
  pz(146,5,5,'medium','Tôi là số chẵn, lớn hơn 54 và bé hơn 58. Tôi là?',[{key:'A',text:'55'},{key:'B',text:'56'},{key:'C',text:'57'}],'B'),
  pz(146,5,6,'medium','Tôi bằng 3 chục cộng 2 chục. Tôi là?',[{key:'A',text:'32'},{key:'B',text:'50'},{key:'C',text:'60'}],'B','30+20=50.'),
  pz(146,5,7,'medium','Tôi là số lẻ lớn nhất nhỏ hơn 30. Tôi là?',[{key:'A',text:'28'},{key:'B',text:'29'},{key:'C',text:'27'}],'B'),
  mt(146,5,8,'medium','Nối phép tính với kết quả:',[{key:'A',text:'20+50'},{key:'B',text:'80-30'},{key:'C',text:'60+10'}],{A:'70',B:'50',C:'70'}),
  mt(146,5,9,'medium','Nối số với số liền sau:',[{key:'A',text:'39'},{key:'B',text:'69'},{key:'C',text:'99'}],{A:'40',B:'70',C:'100'}),
  dd(146,5,10,'medium','Sắp xếp từ bé đến lớn: 41, 14, 44, 11',[{key:'1',text:'41'},{key:'2',text:'14'},{key:'3',text:'44'},{key:'4',text:'11'}],['4','2','1','3']),

  // Ex6 hard
  fb(146,6,1,'hard','Tìm x: x + 30 = 70. x = [b1].',[{key:'b1',text:''}],{b1:'40'}),
  fb(146,6,2,'hard','Tìm x: 100 - x = 40. x = [b1].',[{key:'b1',text:''}],{b1:'60'}),
  fb(146,6,3,'hard','Hoa có 35 cái bánh, ăn 15 cái. Còn lại [b1] cái bánh.',[{key:'b1',text:''}],{b1:'20'}),
  pz(146,6,4,'hard','Một số cộng với 25 bằng 50. Số đó là?',[{key:'A',text:'25'},{key:'B',text:'75'},{key:'C',text:'30'}],'A'),
  pz(146,6,5,'hard','Một số trừ đi 30 bằng 45. Số đó là?',[{key:'A',text:'15'},{key:'B',text:'75'},{key:'C',text:'65'}],'B'),
  pz(146,6,6,'hard','Số lớn hơn 60 và bé hơn 70 có chữ số hàng đơn vị bằng 5 là?',[{key:'A',text:'65'},{key:'B',text:'56'},{key:'C',text:'75'}],'A'),
  mc(146,6,7,'hard','Số nào vừa chẵn vừa lớn hơn 80?',[{key:'A',text:'82'},{key:'B',text:'85'},{key:'C',text:'90'}],['A','C']),
  mc(146,6,8,'hard','Số nào vừa lẻ vừa bé hơn 15?',[{key:'A',text:'11'},{key:'B',text:'13'},{key:'C',text:'15'}],['A','B']),
  so(146,6,9,'hard','Sắp xếp từ lớn đến bé: 25, 52, 55, 22',[{key:'1',text:'25'},{key:'2',text:'52'},{key:'3',text:'55'},{key:'4',text:'22'}],['3','2','1','4']),
  so(146,6,10,'hard','Sắp xếp từ bé đến lớn: 68, 86, 60, 80',[{key:'1',text:'68'},{key:'2',text:'86'},{key:'3',text:'60'},{key:'4',text:'80'}],['3','1','4','2']),

  // Ex7 hard
  gm(146,7,1,'hard','Ghép phép tính với kết quả:',[{key:'A',text:'40+40'},{key:'B',text:'80'},{key:'C',text:'30+30'},{key:'D',text:'60'}]),
  gm(146,7,2,'hard','Ghép cặp bài toán:',[{key:'A',text:'15 cộng 15'},{key:'B',text:'30'},{key:'C',text:'25 cộng 25'},{key:'D',text:'50'}]),
  mt(146,7,3,'hard','Nối bài toán với đáp số:',[{key:'A',text:'30+20+10'},{key:'B',text:'80-20-30'},{key:'C',text:'40+15+5'}],{A:'60',B:'30',C:'60'}),
  mt(146,7,4,'hard','Nối từng số với đặc điểm:',[{key:'A',text:'24'},{key:'B',text:'35'},{key:'C',text:'90'}],{A:'chẵn, bé hơn 30',B:'lẻ, giữa 30-40',C:'chẵn, bội của 10'}),
  mt(146,7,5,'hard','Nối dãy số với quy luật:',[{key:'A',text:'10,20,30,40'},{key:'B',text:'11,13,15,17'}],{A:'tăng 10',B:'tăng 2'}),
  fb(146,7,6,'hard','Tuổi bố là 40, tuổi con kém bố 27 tuổi. Con [b1] tuổi.',[{key:'b1',text:''}],{b1:'13'}),
  fb(146,7,7,'hard','Lớp học có 35 học sinh, nghỉ 5 em. Còn [b1] em.',[{key:'b1',text:''}],{b1:'30'}),
  fb(146,7,8,'hard','Số chẵn liền sau của 98 là [b1].',[{key:'b1',text:''}],{b1:'100'}),
  dd(146,7,9,'hard','Sắp xếp từ bé đến lớn: 37, 73, 77, 33',[{key:'1',text:'37'},{key:'2',text:'73'},{key:'3',text:'77'},{key:'4',text:'33'}],['4','1','2','3']),
  dd(146,7,10,'hard','Sắp xếp từ lớn đến bé: 46, 64, 44, 66',[{key:'1',text:'46'},{key:'2',text:'64'},{key:'3',text:'44'},{key:'4',text:'66'}],['4','2','1','3']),

  // Ex8 hard
  mc(146,8,1,'hard','Số nào là kết quả của 20 + 30?',[{key:'A',text:'50'},{key:'B',text:'23'},{key:'C',text:'5'}],['A']),
  mc(146,8,2,'hard','Số nào có thể điền vào: 40 + __ = 70?',[{key:'A',text:'30'},{key:'B',text:'110'},{key:'C',text:'3'}],['A']),
  mc(146,8,3,'hard','Số nào lớn hơn 75 và nhỏ hơn 80?',[{key:'A',text:'76'},{key:'B',text:'78'},{key:'C',text:'80'}],['A','B']),
  pz(146,8,4,'hard','Tổng hai số bằng 50, một số là 30. Số kia là?',[{key:'A',text:'20'},{key:'B',text:'80'},{key:'C',text:'15'}],'A'),
  pz(146,8,5,'hard','Hiệu hai số bằng 20, số lớn là 55. Số nhỏ là?',[{key:'A',text:'35'},{key:'B',text:'75'},{key:'C',text:'25'}],'A'),
  pz(146,8,6,'hard','Cộng số lớn nhất có một chữ số với chính nó. Kết quả là?',[{key:'A',text:'18'},{key:'B',text:'16'},{key:'C',text:'9'}],'A','9+9=18.'),
  so(146,8,7,'hard','Sắp xếp từ bé đến lớn: 85, 58, 88, 55',[{key:'1',text:'85'},{key:'2',text:'58'},{key:'3',text:'88'},{key:'4',text:'55'}],['4','2','1','3']),
  so(146,8,8,'hard','Sắp xếp từ lớn đến bé: 29, 92, 20, 90',[{key:'1',text:'29'},{key:'2',text:'92'},{key:'3',text:'20'},{key:'4',text:'90'}],['2','4','1','3']),
  co(146,8,9,'hard','Gạch bỏ số không phải kết quả của phép cộng hai số có một chữ số:',[{key:'A',text:'15'},{key:'B',text:'18'},{key:'C',text:'19'},{key:'D',text:'20'}],['C','D']),
  co(146,8,10,'hard','Gạch bỏ số không phải bội số của 5:',[{key:'A',text:'25'},{key:'B',text:'32'},{key:'C',text:'45'},{key:'D',text:'53'}],['B','D']),
];

// ─── LESSON 147: Dài hơn, ngắn hơn (Longer/Shorter) ─────────────────────
const L147: Row[] = [
  // Ex1 easy
  sc(147,1,1,'easy','Cây bút chì dài 10 cm, cây thước dài 15 cm. Cái nào dài hơn?',[{key:'A',text:'Bút chì'},{key:'B',text:'Thước'},{key:'C',text:'Bằng nhau'}],'B'),
  sc(147,1,2,'easy','Sợi dây xanh dài 8 cm, sợi dây đỏ dài 5 cm. Sợi nào ngắn hơn?',[{key:'A',text:'Sợi xanh'},{key:'B',text:'Sợi đỏ'},{key:'C',text:'Bằng nhau'}],'B'),
  sc(147,1,3,'easy','Con sâu A dài 6 cm, con sâu B dài 6 cm. So sánh chiều dài?',[{key:'A',text:'A dài hơn'},{key:'B',text:'B dài hơn'},{key:'C',text:'Bằng nhau'}],'C'),
  sc(147,1,4,'easy','Cầu vồng A dài hơn cầu vồng B. Cầu vồng nào ngắn hơn?',[{key:'A',text:'A'},{key:'B',text:'B'},{key:'C',text:'Bằng nhau'}],'B'),
  tf(147,1,5,'easy','Một sợi dây dài 12 cm dài hơn sợi dây 9 cm. Đúng hay sai?',true),
  tf(147,1,6,'easy','Bút 15 cm ngắn hơn bút 10 cm. Đúng hay sai?',false),
  tf(147,1,7,'easy','Hai vật có chiều dài bằng nhau thì không dài hơn cũng không ngắn hơn nhau. Đúng hay sai?',true),
  fb(147,1,8,'easy','Băng giấy A dài 20 cm, băng giấy B dài 15 cm. Băng [b1] dài hơn.',[{key:'b1',text:''}],{b1:'A'}),
  fb(147,1,9,'easy','Cây cọ cao 5 m, cây thông cao 8 m. Cây [b1] cao hơn.',[{key:'b1',text:''}],{b1:'thông'}),
  fb(147,1,10,'easy','Con kiến A đi được 10 cm, con kiến B đi được 7 cm. Con kiến [b1] đi được ngắn hơn.',[{key:'b1',text:''}],{b1:'B'}),

  // Ex2 easy
  ct(147,2,1,'easy','📏📏📏📏📏📏📏📏📏📏 Đếm số thước kẻ','10'),
  ct(147,2,2,'easy','✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ Đếm số bút chì','12'),
  ct(147,2,3,'easy','🪢🪢🪢🪢🪢🪢🪢🪢🪢🪢🪢🪢🪢🪢 Đếm số sợi dây','14'),
  so(147,2,4,'easy','Sắp xếp từ ngắn đến dài (cm): 5, 12, 8, 3',[{key:'1',text:'5cm'},{key:'2',text:'12cm'},{key:'3',text:'8cm'},{key:'4',text:'3cm'}],['4','1','3','2']),
  so(147,2,5,'easy','Sắp xếp từ dài đến ngắn (cm): 20, 15, 25, 10',[{key:'1',text:'20cm'},{key:'2',text:'15cm'},{key:'3',text:'25cm'},{key:'4',text:'10cm'}],['3','1','2','4']),
  so(147,2,6,'easy','Sắp xếp từ ngắn đến dài: bút 10cm, thước 30cm, tẩy 5cm',[{key:'1',text:'bút 10cm'},{key:'2',text:'thước 30cm'},{key:'3',text:'tẩy 5cm'}],['3','1','2']),
  co(147,2,7,'easy','Gạch bỏ vật ngắn hơn 10 cm:',[{key:'A',text:'8cm'},{key:'B',text:'15cm'},{key:'C',text:'6cm'},{key:'D',text:'20cm'}],['A','C']),
  co(147,2,8,'easy','Gạch bỏ vật dài hơn 20 cm:',[{key:'A',text:'10cm'},{key:'B',text:'25cm'},{key:'C',text:'30cm'},{key:'D',text:'15cm'}],['B','C']),
  fb(147,2,9,'easy','Vật dài nhất trong 15cm, 8cm, 22cm, 11cm là [b1] cm.',[{key:'b1',text:''}],{b1:'22'}),
  fb(147,2,10,'easy','Vật ngắn nhất trong 7cm, 12cm, 4cm, 9cm là [b1] cm.',[{key:'b1',text:''}],{b1:'4'}),

  // Ex3 easy
  sc(147,3,1,'easy','Để đo chiều dài, ta dùng đơn vị nào?',[{key:'A',text:'kg'},{key:'B',text:'cm'},{key:'C',text:'lít'}],'B'),
  sc(147,3,2,'easy','1 dm = ? cm',[{key:'A',text:'10'},{key:'B',text:'100'},{key:'C',text:'5'}],'A'),
  sc(147,3,3,'easy','Sợi dây dài 30 cm so với sợi dây dài 3 dm thì thế nào?',[{key:'A',text:'Dài hơn'},{key:'B',text:'Ngắn hơn'},{key:'C',text:'Bằng nhau'}],'C'),
  sc(147,3,4,'easy','Vật nào thường dài hơn?',[{key:'A',text:'Cây bút'},{key:'B',text:'Cây thước 30 cm'},{key:'C',text:'Tẩy'}],'B'),
  tf(147,3,5,'easy','20 cm dài hơn 2 dm. Đúng hay sai?',false,'20cm = 2dm.'),
  tf(147,3,6,'easy','Cây thước 30 cm dài hơn cây bút 15 cm. Đúng hay sai?',true),
  tf(147,3,7,'easy','Sợi dây ngắn hơn có chiều dài nhỏ hơn. Đúng hay sai?',true),
  fb(147,3,8,'easy','Sợi A dài 25 cm, sợi B dài 30 cm. Sợi B dài hơn sợi A là [b1] cm.',[{key:'b1',text:''}],{b1:'5'}),
  fb(147,3,9,'easy','Thanh gỗ dài 40 cm, cắt bớt 15 cm. Còn lại [b1] cm.',[{key:'b1',text:''}],{b1:'25'}),
  ct(147,3,10,'easy','📐📐📐📐📐📐📐📐📐📐📐📐📐📐📐📐 Đếm số ê-ke','16'),

  // Ex4 medium
  sc(147,4,1,'medium','Chiều cao của An là 95 cm, Bình là 98 cm. Bình cao hơn An bao nhiêu?',[{key:'A',text:'3 cm'},{key:'B',text:'2 cm'},{key:'C',text:'5 cm'}],'A'),
  sc(147,4,2,'medium','Sợi ruy băng đỏ dài 45 cm, sợi xanh dài 55 cm. Sợi nào dài hơn và dài hơn bao nhiêu?',[{key:'A',text:'Đỏ, 10 cm'},{key:'B',text:'Xanh, 10 cm'},{key:'C',text:'Bằng nhau'}],'B'),
  sc(147,4,3,'medium','Con đường A dài 80 m, con đường B dài 60 m. Con đường A dài hơn bao nhiêu?',[{key:'A',text:'20 m'},{key:'B',text:'140 m'},{key:'C',text:'10 m'}],'A'),
  mc(147,4,4,'medium','Chọn tất cả vật dài hơn 20 cm trong danh sách:',[{key:'A',text:'thước 30cm'},{key:'B',text:'bút 10cm'},{key:'C',text:'dây 25cm'}],['A','C']),
  mc(147,4,5,'medium','Chọn tất cả vật ngắn hơn 15 cm:',[{key:'A',text:'tẩy 5cm'},{key:'B',text:'kẹp 12cm'},{key:'C',text:'bút 20cm'}],['A','B']),
  mc(147,4,6,'medium','Sợi dây nào bằng nhau về chiều dài?',[{key:'A',text:'30cm'},{key:'B',text:'3dm'},{key:'C',text:'300mm'}],['A','B','C']),
  mt(147,4,7,'medium','Nối vật với chiều dài phù hợp:',[{key:'A',text:'Bút chì'},{key:'B',text:'Cây sào'},{key:'C',text:'Tẩy'}],{A:'19 cm',B:'2 m',C:'4 cm'}),
  mt(147,4,8,'medium','Nối so sánh đúng:',[{key:'A',text:'50cm và 5dm'},{key:'B',text:'30cm và 4dm'},{key:'C',text:'20cm và 1dm'}],{A:'bằng nhau',B:'30cm < 4dm',C:'20cm > 1dm'}),
  dd(147,4,9,'medium','Sắp xếp từ ngắn đến dài: 45cm, 54cm, 44cm, 55cm',[{key:'1',text:'45cm'},{key:'2',text:'54cm'},{key:'3',text:'44cm'},{key:'4',text:'55cm'}],['3','1','2','4']),
  dd(147,4,10,'medium','Sắp xếp từ dài đến ngắn: 30cm, 3dm, 25cm, 2dm',[{key:'1',text:'30cm'},{key:'2',text:'3dm'},{key:'3',text:'25cm'},{key:'4',text:'2dm'}],['1','2','3','4']),

  // Ex5 medium
  tf2(147,5,1,'medium','So sánh: 35cm __ 53cm',[{key:'dau',text:'?'}],{dau:'<'}),
  tf2(147,5,2,'medium','So sánh: 2dm __ 20cm',[{key:'dau',text:'?'}],{dau:'='}),
  nl(147,5,3,'medium','Điền số còn thiếu theo chiều dài tăng dần: 5, 10, __, 20',[{key:'a',text:'?'}],{a:'15'}),
  nl(147,5,4,'medium','Điền số còn thiếu: 50cm, 45cm, __, 35cm',[{key:'a',text:'?'}],{a:'40cm'}),
  pz(147,5,5,'medium','Sợi A dài hơn sợi B 8 cm. Sợi B dài 12 cm. Sợi A dài bao nhiêu?',[{key:'A',text:'20 cm'},{key:'B',text:'4 cm'},{key:'C',text:'8 cm'}],'A'),
  pz(147,5,6,'medium','Sợi X ngắn hơn sợi Y 5 cm. Sợi Y dài 25 cm. Sợi X dài bao nhiêu?',[{key:'A',text:'30 cm'},{key:'B',text:'20 cm'},{key:'C',text:'5 cm'}],'B'),
  pz(147,5,7,'medium','Cây A cao 70 cm, cây B thấp hơn cây A 20 cm. Cây B cao bao nhiêu?',[{key:'A',text:'50 cm'},{key:'B',text:'90 cm'},{key:'C',text:'20 cm'}],'A'),
  mt(147,5,8,'medium','Nối sợi với độ dài:',[{key:'A',text:'sợi ngắn nhất'},{key:'B',text:'sợi dài nhất'},{key:'C',text:'sợi ở giữa'}],{A:'5cm',B:'25cm',C:'15cm'}),
  mt(147,5,9,'medium','Nối cặp vật với so sánh:',[{key:'A',text:'bút 10cm và thước 30cm'},{key:'B',text:'dây 20cm và dây 20cm'}],{A:'thước dài hơn',B:'bằng nhau'}),
  dd(147,5,10,'medium','Sắp xếp từ ngắn đến dài: 1dm, 15cm, 2dm, 5cm',[{key:'1',text:'1dm'},{key:'2',text:'15cm'},{key:'3',text:'2dm'},{key:'4',text:'5cm'}],['4','1','2','3']),

  // Ex6 hard
  fb(147,6,1,'hard','Sợi A dài 36 cm, sợi B dài 24 cm. Sợi A dài hơn sợi B là [b1] cm.',[{key:'b1',text:''}],{b1:'12'}),
  fb(147,6,2,'hard','Thanh tre dài 50 cm, cắt thành 2 phần bằng nhau. Mỗi phần dài [b1] cm.',[{key:'b1',text:''}],{b1:'25'}),
  fb(147,6,3,'hard','Sợi dây ngắn hơn dài 15 cm, sợi dài hơn gấp đôi. Sợi dài hơn dài [b1] cm.',[{key:'b1',text:''}],{b1:'30'}),
  pz(147,6,4,'hard','Ba sợi dây dài 10cm, 20cm, 30cm. Tổng chiều dài là?',[{key:'A',text:'60 cm'},{key:'B',text:'50 cm'},{key:'C',text:'40 cm'}],'A'),
  pz(147,6,5,'hard','Sợi A dài gấp 3 lần sợi B. Sợi B dài 8 cm. Sợi A dài bao nhiêu?',[{key:'A',text:'24 cm'},{key:'B',text:'11 cm'},{key:'C',text:'5 cm'}],'A'),
  pz(147,6,6,'hard','An đo bằng gang tay: sách dài 3 gang, bàn dài 5 gang. Bàn dài hơn sách mấy gang?',[{key:'A',text:'2 gang'},{key:'B',text:'8 gang'},{key:'C',text:'3 gang'}],'A'),
  mc(147,6,7,'hard','Sợi nào có thể buộc thành vòng tròn có chu vi 30cm?',[{key:'A',text:'25cm'},{key:'B',text:'30cm'},{key:'C',text:'35cm'}],['B']),
  mc(147,6,8,'hard','Vật nào dài hơn 1 dm (10 cm)?',[{key:'A',text:'bút 15cm'},{key:'B',text:'tẩy 8cm'},{key:'C',text:'thước 30cm'}],['A','C']),
  so(147,6,9,'hard','Sắp xếp từ ngắn đến dài: 2dm, 25cm, 1dm, 15cm',[{key:'1',text:'2dm=20cm'},{key:'2',text:'25cm'},{key:'3',text:'1dm=10cm'},{key:'4',text:'15cm'}],['3','4','1','2']),
  so(147,6,10,'hard','Sắp xếp từ dài đến ngắn: 45cm, 4dm, 35cm, 3dm',[{key:'1',text:'45cm'},{key:'2',text:'4dm=40cm'},{key:'3',text:'35cm'},{key:'4',text:'3dm=30cm'}],['1','2','3','4']),

  // Ex7 hard
  gm(147,7,1,'hard','Ghép cặp vật với độ dài ước lượng phù hợp:',[{key:'A',text:'bút chì'},{key:'B',text:'19cm'},{key:'C',text:'bàn học'},{key:'D',text:'60cm'}]),
  gm(147,7,2,'hard','Ghép cặp so sánh chiều dài:',[{key:'A',text:'30cm'},{key:'B',text:'3dm'},{key:'C',text:'25cm'},{key:'D',text:'2dm5cm'}]),
  mt(147,7,3,'hard','Nối bài toán với đáp số:',[{key:'A',text:'Sợi 30cm dài hơn sợi 25cm bao nhiêu?'},{key:'B',text:'Sợi 15cm ngắn hơn sợi 25cm bao nhiêu?'},{key:'C',text:'Sợi 40cm và 10cm tổng bằng?'}],{A:'5cm',B:'10cm',C:'50cm'}),
  mt(147,7,4,'hard','Nối dụng cụ đo với đơn vị:',[{key:'A',text:'thước kẻ'},{key:'B',text:'thước dây'},{key:'C',text:'bước chân'}],{A:'cm, dm',B:'m, cm',C:'bước'}),
  mt(147,7,5,'hard','Nối vật với mô tả chiều dài:',[{key:'A',text:'dây 20cm'},{key:'B',text:'dây 30cm'},{key:'C',text:'dây 10cm'}],{A:'dài gấp đôi C',B:'dài nhất',C:'ngắn nhất'}),
  fb(147,7,6,'hard','Dây A dài 50 cm, dây B ngắn hơn A 15 cm. Dây B dài [b1] cm.',[{key:'b1',text:''}],{b1:'35'}),
  fb(147,7,7,'hard','Sợi dây dài 60 cm chia thành 3 phần bằng nhau. Mỗi phần dài [b1] cm.',[{key:'b1',text:''}],{b1:'20'}),
  fb(147,7,8,'hard','Chiều cao của tủ là 80 cm, ghế là 45 cm. Tủ cao hơn ghế [b1] cm.',[{key:'b1',text:''}],{b1:'35'}),
  dd(147,7,9,'hard','Sắp xếp từ ngắn đến dài: 3dm5cm, 30cm, 4dm, 25cm',[{key:'1',text:'3dm5cm=35cm'},{key:'2',text:'30cm'},{key:'3',text:'4dm=40cm'},{key:'4',text:'25cm'}],['4','2','1','3']),
  dd(147,7,10,'hard','Sắp xếp từ dài đến ngắn: 55cm, 5dm, 45cm, 4dm5cm',[{key:'1',text:'55cm'},{key:'2',text:'5dm=50cm'},{key:'3',text:'45cm'},{key:'4',text:'4dm5cm=45cm'}],['1','2','3','4']),

  // Ex8 hard
  mc(147,8,1,'hard','Sợi nào dài hơn 30 cm?',[{key:'A',text:'35cm'},{key:'B',text:'3dm'},{key:'C',text:'4dm'}],['A','C']),
  mc(147,8,2,'hard','Phát biểu nào đúng về so sánh chiều dài?',[{key:'A',text:'10cm < 1dm'},{key:'B',text:'20cm = 2dm'},{key:'C',text:'30cm > 4dm'}],['B']),
  mc(147,8,3,'hard','Sợi dây nào cùng chiều dài?',[{key:'A',text:'50cm'},{key:'B',text:'5dm'},{key:'C',text:'500mm'}],['A','B','C']),
  pz(147,8,4,'hard','Sợi A + sợi B = 40cm. Sợi A dài 25cm. Sợi B dài bao nhiêu?',[{key:'A',text:'15cm'},{key:'B',text:'65cm'},{key:'C',text:'25cm'}],'A'),
  pz(147,8,5,'hard','Nếu đo bằng que tính dài 10cm, cái bàn cần 8 que. Bàn dài bao nhiêu cm?',[{key:'A',text:'80 cm'},{key:'B',text:'8 cm'},{key:'C',text:'18 cm'}],'A'),
  pz(147,8,6,'hard','Sợi A dài hơn sợi B 12cm. Tổng hai sợi là 48cm. Sợi A dài bao nhiêu?',[{key:'A',text:'30 cm'},{key:'B',text:'18 cm'},{key:'C',text:'36 cm'}],'A','A=B+12; A+B=48→2B=36→B=18→A=30.'),
  so(147,8,7,'hard','Sắp xếp từ ngắn đến dài: 1m, 80cm, 1dm, 100cm',[{key:'1',text:'1m=100cm'},{key:'2',text:'80cm'},{key:'3',text:'1dm=10cm'},{key:'4',text:'100cm'}],['3','2','1','4']),
  so(147,8,8,'hard','Sắp xếp từ dài đến ngắn: 2m, 150cm, 180cm, 1m50cm',[{key:'1',text:'2m=200cm'},{key:'2',text:'150cm'},{key:'3',text:'180cm'},{key:'4',text:'1m50cm=150cm'}],['1','3','2','4']),
  co(147,8,9,'hard','Gạch bỏ vật không thể đo bằng thước kẻ 30cm:',[{key:'A',text:'bút 15cm'},{key:'B',text:'sân trường 50m'},{key:'C',text:'tẩy 5cm'},{key:'D',text:'chiều cao 1m30cm'}],['B','D']),
  co(147,8,10,'hard','Gạch bỏ phát biểu sai về chiều dài:',[{key:'A',text:'1m = 100cm'},{key:'B',text:'1dm = 100cm'},{key:'C',text:'1m = 10dm'},{key:'D',text:'1dm = 100mm'}],['B','D']),
];

const ALL_ROWS: Row[] = [...L143, ...L144, ...L145, ...L146, ...L147];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function main() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();
  try {
    await qr.query(`DELETE FROM quizzes WHERE lessonId IN (143,144,145,146,147)`);
    for (const row of ALL_ROWS) {
      await qr.query(SQL, row);
    }
    await qr.commitTransaction();
    // Print counts per lesson
    for (const lid of [143,144,145,146,147]) {
      const count = ALL_ROWS.filter(r => r[0] === lid).length;
      console.log(`✅ lessonId ${lid}: ${count} questions inserted`);
    }
    console.log(`Total: ${ALL_ROWS.length} questions`);
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch(err => { console.error(err); process.exit(1); });
