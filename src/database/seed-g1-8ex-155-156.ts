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

// ─── LESSON 155: Luyện tập cộng trừ số có hai chữ số ────────────────────────
const L155: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(155,1,1,'easy','23 + 14 = ?',[{key:'A',text:'36'},{key:'B',text:'37'},{key:'C',text:'38'}],'B','23 + 14 = 37.'),
  sc(155,1,2,'easy','47 - 23 = ?',[{key:'A',text:'22'},{key:'B',text:'23'},{key:'C',text:'24'}],'C','47 - 23 = 24.'),
  sc(155,1,3,'easy','35 + 22 = ?',[{key:'A',text:'55'},{key:'B',text:'57'},{key:'C',text:'56'}],'B','35 + 22 = 57.'),
  sc(155,1,4,'easy','68 - 35 = ?',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B','68 - 35 = 33.'),
  tf(155,1,5,'easy','42 + 15 = 57. Đúng hay sai?',true,'42 + 15 = 57.'),
  tf(155,1,6,'easy','76 - 34 = 43. Đúng hay sai?',false,'76 - 34 = 42, không phải 43.'),
  tf(155,1,7,'easy','50 + 30 = 80. Đúng hay sai?',true,'50 + 30 = 80.'),
  fb(155,1,8,'easy','31 + 25 = [b1]',[{key:'b1',text:''}],{b1:'56'},'31 + 25 = 56.'),
  fb(155,1,9,'easy','85 - [b1] = 40',[{key:'b1',text:''}],{b1:'45'},'85 - 45 = 40.'),
  fb(155,1,10,'easy','[b1] + 21 = 63',[{key:'b1',text:''}],{b1:'42'},'42 + 21 = 63.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(155,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 Có 10 quả táo rồi thêm 20 quả nữa. Có tất cả bao nhiêu quả?','30','10 + 20 = 30.'),
  ct(155,2,2,'easy','🌟🌟🌟🌟🌟 Có 45 ngôi sao. Xoá đi 12. Còn bao nhiêu?','33','45 - 12 = 33.'),
  ct(155,2,3,'easy','🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦 Có 36 con chim. Thêm 21 con. Có tất cả bao nhiêu?','57','36 + 21 = 57.'),
  so(155,2,4,'easy','Sắp xếp kết quả từ bé đến lớn: 20+10, 30+5, 40+15, 10+8',[{key:'1',text:'20+10=30'},{key:'2',text:'30+5=35'},{key:'3',text:'40+15=55'},{key:'4',text:'10+8=18'}],['4','1','2','3'],'18, 30, 35, 55.'),
  so(155,2,5,'easy','Sắp xếp kết quả từ lớn đến bé: 90-20, 80-30, 70-40, 60-50',[{key:'1',text:'90-20=70'},{key:'2',text:'80-30=50'},{key:'3',text:'70-40=30'},{key:'4',text:'60-50=10'}],['1','2','3','4'],'70, 50, 30, 10.'),
  so(155,2,6,'easy','Sắp xếp từ bé đến lớn: 55-5, 44+4, 33+3, 22+2',[{key:'1',text:'55-5=50'},{key:'2',text:'44+4=48'},{key:'3',text:'33+3=36'},{key:'4',text:'22+2=24'}],['4','3','2','1'],'24, 36, 48, 50.'),
  co(155,2,7,'easy','Gạch bỏ phép tính có kết quả lớn hơn 50:',[{key:'A',text:'20+25=45'},{key:'B',text:'30+30=60'},{key:'C',text:'40+15=55'},{key:'D',text:'10+35=45'}],['B','C'],'60 và 55 đều lớn hơn 50.'),
  co(155,2,8,'easy','Gạch bỏ phép tính sai:',[{key:'A',text:'23+14=37'},{key:'B',text:'45-23=21'},{key:'C',text:'36+21=57'},{key:'D',text:'68-35=32'}],['B','D'],'45-23=22, 68-35=33.'),
  fb(155,2,9,'easy','40 + 30 = [b1]',[{key:'b1',text:''}],{b1:'70'},'40 + 30 = 70.'),
  fb(155,2,10,'easy','90 - 50 = [b1]',[{key:'b1',text:''}],{b1:'40'},'90 - 50 = 40.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(155,3,1,'easy','54 + 13 = ?',[{key:'A',text:'67'},{key:'B',text:'66'},{key:'C',text:'68'}],'A','54 + 13 = 67.'),
  sc(155,3,2,'easy','79 - 46 = ?',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B','79 - 46 = 33.'),
  sc(155,3,3,'easy','28 + 31 = ?',[{key:'A',text:'58'},{key:'B',text:'59'},{key:'C',text:'60'}],'B','28 + 31 = 59.'),
  sc(155,3,4,'easy','96 - 42 = ?',[{key:'A',text:'53'},{key:'B',text:'54'},{key:'C',text:'55'}],'B','96 - 42 = 54.'),
  tf(155,3,5,'easy','63 + 25 = 88. Đúng hay sai?',true,'63 + 25 = 88.'),
  tf(155,3,6,'easy','84 - 51 = 34. Đúng hay sai?',false,'84 - 51 = 33, không phải 34.'),
  tf(155,3,7,'easy','70 - 30 = 40. Đúng hay sai?',true,'70 - 30 = 40.'),
  fb(155,3,8,'easy','52 + [b1] = 75',[{key:'b1',text:''}],{b1:'23'},'52 + 23 = 75.'),
  fb(155,3,9,'easy','[b1] - 34 = 25',[{key:'b1',text:''}],{b1:'59'},'59 - 34 = 25.'),
  ct(155,3,10,'easy','🍋🍋🍋🍋🍋🍋🍋🍋 Có 32 quả chanh thêm 15 quả. Có tất cả bao nhiêu?','47','32 + 15 = 47.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(155,4,1,'medium','Tìm số x: x + 35 = 78',[{key:'A',text:'42'},{key:'B',text:'43'},{key:'C',text:'44'}],'B','78 - 35 = 43.'),
  sc(155,4,2,'medium','Tìm số x: 92 - x = 47',[{key:'A',text:'44'},{key:'B',text:'45'},{key:'C',text:'46'}],'B','92 - 47 = 45.'),
  sc(155,4,3,'medium','Kết quả của 38 + 24 là:',[{key:'A',text:'61'},{key:'B',text:'62'},{key:'C',text:'63'}],'B','38 + 24 = 62.'),
  mc(155,4,4,'medium','Chọn các phép tính có kết quả bằng 50:',[{key:'A',text:'30+20'},{key:'B',text:'70-20'},{key:'C',text:'25+25'},{key:'D',text:'60-15'}],['A','B','C'],'30+20=50, 70-20=50, 25+25=50.'),
  mc(155,4,5,'medium','Chọn các phép tính có kết quả nhỏ hơn 40:',[{key:'A',text:'20+15'},{key:'B',text:'50-12'},{key:'C',text:'18+18'},{key:'D',text:'65-28'}],['A','C'],'20+15=35, 18+18=36.'),
  mc(155,4,6,'medium','Chọn phép tính đúng:',[{key:'A',text:'45+23=68'},{key:'B',text:'76-34=42'},{key:'C',text:'53+16=79'},{key:'D',text:'81-40=40'}],['A','B'],'45+23=68, 76-34=42.'),
  mt(155,4,7,'medium','Nối phép tính với kết quả:',[{key:'A',text:'23+14'},{key:'B',text:'58-25'},{key:'C',text:'41+36'},{key:'D',text:'90-47'}],{A:'37',B:'33',C:'77',D:'43'},'Ghép đúng kết quả.'),
  mt(155,4,8,'medium','Nối phép tính với kết quả đúng:',[{key:'A',text:'65-32'},{key:'B',text:'27+31'},{key:'C',text:'84-51'},{key:'D',text:'46+23'}],{A:'33',B:'58',C:'33',D:'69'},'Ghép đúng kết quả.'),
  dd(155,4,9,'medium','Kéo số điền vào chỗ trống: 56 + ___ = 89',[{key:'A',text:'33'},{key:'B',text:'34'},{key:'C',text:'32'}],['A'],'56 + 33 = 89.'),
  dd(155,4,10,'medium','Kéo số điền vào chỗ trống: ___ - 27 = 45',[{key:'A',text:'72'},{key:'B',text:'71'},{key:'C',text:'73'}],['A'],'27 + 45 = 72.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(155,5,1,'medium','Hoàn thành bảng cộng (điền kết quả):',[{key:'23+14',text:'23+14'},{key:'35+22',text:'35+22'},{key:'41+28',text:'41+28'},{key:'50+30',text:'50+30'}],{'23+14':'37','35+22':'57','41+28':'69','50+30':'80'},'Tính đúng từng phép cộng.'),
  tf2(155,5,2,'medium','Hoàn thành bảng trừ (điền kết quả):',[{key:'68-35',text:'68-35'},{key:'79-46',text:'79-46'},{key:'85-42',text:'85-42'},{key:'97-53',text:'97-53'}],{'68-35':'33','79-46':'33','85-42':'43','97-53':'44'},'Tính đúng từng phép trừ.'),
  nl(155,5,3,'medium','Điền số còn thiếu trên tia số (bước nhảy +10): 20, ___, 40, ___, 60',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'30',b2:'50'},'Mỗi bước nhảy thêm 10.'),
  nl(155,5,4,'medium','Điền số còn thiếu trên tia số (bước nhảy -10): 90, ___, 70, ___, 50',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'80',b2:'60'},'Mỗi bước nhảy bớt 10.'),
  pz(155,5,5,'medium','Ghép mảnh ghép: 45 + ? = 78',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B','78 - 45 = 33.'),
  pz(155,5,6,'medium','Ghép mảnh ghép: 91 - ? = 48',[{key:'A',text:'42'},{key:'B',text:'43'},{key:'C',text:'44'}],'B','91 - 48 = 43.'),
  pz(155,5,7,'medium','Ghép mảnh ghép: ? + 37 = 64',[{key:'A',text:'26'},{key:'B',text:'27'},{key:'C',text:'28'}],'B','64 - 37 = 27.'),
  mt(155,5,8,'medium','Nối phép tính với kết quả:',[{key:'A',text:'20+40'},{key:'B',text:'80-30'},{key:'C',text:'60+10'},{key:'D',text:'90-40'}],{A:'60',B:'50',C:'70',D:'50'},'Tính từng phép tính.'),
  mt(155,5,9,'medium','Nối số với phép tính cho ra kết quả đó:',[{key:'A',text:'45'},{key:'B',text:'55'},{key:'C',text:'65'},{key:'D',text:'75'}],{A:'30+15',B:'30+25',C:'40+25',D:'50+25'},'Ghép đúng phép tính.'),
  dd(155,5,10,'medium','Kéo thẻ điền vào: 33 + ___ + 14 = 74',[{key:'A',text:'27'},{key:'B',text:'28'},{key:'C',text:'26'}],['A'],'33 + 27 + 14 = 74.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(155,6,1,'hard','[b1] + 36 = 72',[{key:'b1',text:''}],{b1:'36'},'72 - 36 = 36.'),
  fb(155,6,2,'hard','85 - [b1] + 13 = 65',[{key:'b1',text:''}],{b1:'33'},'85 + 13 = 98; 98 - 65 = 33.'),
  fb(155,6,3,'hard','[b1] + [b2] = 67, biết [b1] = 34',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'34',b2:'33'},'67 - 34 = 33.'),
  pz(155,6,4,'hard','Tìm số bí mật: Số đó cộng 28 rồi trừ 15 bằng 56.',[{key:'A',text:'41'},{key:'B',text:'43'},{key:'C',text:'45'}],'B','56 + 15 - 28 = 43.'),
  pz(155,6,5,'hard','Ghép mảnh: Số nào cộng 47 bằng 89?',[{key:'A',text:'41'},{key:'B',text:'42'},{key:'C',text:'43'}],'B','89 - 47 = 42.'),
  pz(155,6,6,'hard','Ghép mảnh: 78 trừ đi số nào bằng 35?',[{key:'A',text:'42'},{key:'B',text:'43'},{key:'C',text:'44'}],'B','78 - 35 = 43.'),
  mc(155,6,7,'hard','Chọn tất cả phép tính có kết quả bằng 60:',[{key:'A',text:'30+30'},{key:'B',text:'90-30'},{key:'C',text:'45+15'},{key:'D',text:'75-20'}],['A','B','C'],'30+30=60, 90-30=60, 45+15=60.'),
  mc(155,6,8,'hard','Chọn phép tính sai:',[{key:'A',text:'56+23=79'},{key:'B',text:'84-41=44'},{key:'C',text:'67+22=89'},{key:'D',text:'95-52=42'}],['B','D'],'84-41=43, 95-52=43.'),
  so(155,6,9,'hard','Sắp xếp từ bé đến lớn: 78-35, 56+23, 45+32, 90-46',[{key:'1',text:'78-35=43'},{key:'2',text:'56+23=79'},{key:'3',text:'45+32=77'},{key:'4',text:'90-46=44'}],['1','4','3','2'],'43, 44, 77, 79.'),
  so(155,6,10,'hard','Sắp xếp từ lớn đến bé: 63+25, 91-28, 47+36, 82-19',[{key:'1',text:'63+25=88'},{key:'2',text:'91-28=63'},{key:'3',text:'47+36=83'},{key:'4',text:'82-19=63'}],['1','3','2','4'],'88, 83, 63, 63.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(155,7,1,'hard','Trò chơi ghép cặp: Nối phép tính với kết quả đúng (kéo thả).',[{key:'23+14',text:'37'},{key:'58-25',text:'33'},{key:'41+36',text:'77'},{key:'90-47',text:'43'}],'Ghép đúng tất cả cặp.'),
  gm(155,7,2,'hard','Trò chơi tìm cặp: Ghép phép tính cộng và trừ có cùng kết quả.',[{key:'20+30',text:'50'},{key:'80-30',text:'50'},{key:'25+25',text:'50'},{key:'70-20',text:'50'}],'Tất cả đều bằng 50.'),
  mt(155,7,3,'hard','Nối phép tính 2 bước với kết quả:',[{key:'A',text:'20+10+5'},{key:'B',text:'50-10-5'},{key:'C',text:'30+20-8'},{key:'D',text:'60-20+3'}],{A:'35',B:'35',C:'42',D:'43'},'Tính lần lượt từ trái qua phải.'),
  mt(155,7,4,'hard','Nối hai phép tính cho cùng kết quả:',[{key:'A',text:'45+15'},{key:'B',text:'90-30'},{key:'C',text:'30+40'},{key:'D',text:'80-10'}],{A:'B',C:'D'},'60=60 và 70=70.'),
  mt(155,7,5,'hard','Nối số với phép tính tương đương:',[{key:'A',text:'88'},{key:'B',text:'76'},{key:'C',text:'54'},{key:'D',text:'43'}],{A:'63+25',B:'98-22',C:'27+27',D:'78-35'},'Tính từng phép tính.'),
  fb(155,7,6,'hard','23 + 14 + [b1] = 50',[{key:'b1',text:''}],{b1:'13'},'23+14=37; 50-37=13.'),
  fb(155,7,7,'hard','[b1] - 23 + 14 = 55',[{key:'b1',text:''}],{b1:'64'},'55 - 14 + 23 = 64.'),
  fb(155,7,8,'hard','76 - [b1] - 13 = 28',[{key:'b1',text:''}],{b1:'35'},'76 - 13 = 63; 63 - 28 = 35.'),
  dd(155,7,9,'hard','Kéo thẻ điền đúng: ___ + 28 + 13 = 76',[{key:'A',text:'35'},{key:'B',text:'34'},{key:'C',text:'36'}],['A'],'76 - 13 - 28 = 35.'),
  dd(155,7,10,'hard','Kéo thẻ điền đúng: 93 - ___ - 15 = 47',[{key:'A',text:'31'},{key:'B',text:'30'},{key:'C',text:'32'}],['A'],'93 - 15 = 78; 78 - 47 = 31.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(155,8,1,'hard','Chọn tất cả phép tính đúng:',[{key:'A',text:'54+23=77'},{key:'B',text:'86-43=43'},{key:'C',text:'37+42=79'},{key:'D',text:'75-32=44'}],['A','B','C'],'54+23=77, 86-43=43, 37+42=79.'),
  mc(155,8,2,'hard','Số nào có thể điền vào: 40 + ___ < 70?',[{key:'A',text:'25'},{key:'B',text:'30'},{key:'C',text:'29'},{key:'D',text:'31'}],['A','C'],'40+25=65<70, 40+29=69<70.'),
  mc(155,8,3,'hard','Chọn phép tính mà kết quả bằng kết quả của 56+27:',[{key:'A',text:'90-7'},{key:'B',text:'83+0'},{key:'C',text:'100-17'},{key:'D',text:'50+33'}],['B','C'],'56+27=83; 83+0=83, 100-17=83.'),
  pz(155,8,4,'hard','Bí ẩn số: Số đó trừ 27 rồi cộng 15 bằng 52.',[{key:'A',text:'63'},{key:'B',text:'64'},{key:'C',text:'65'}],'B','52 - 15 + 27 = 64.'),
  pz(155,8,5,'hard','Số nào khi cộng với chính nó bằng 64?',[{key:'A',text:'31'},{key:'B',text:'32'},{key:'C',text:'33'}],'B','32 + 32 = 64.'),
  pz(155,8,6,'hard','Hai số hơn kém nhau 15, tổng bằng 55. Số lớn là?',[{key:'A',text:'34'},{key:'B',text:'35'},{key:'C',text:'36'}],'B','(55+15)/2 = 35.'),
  so(155,8,7,'hard','Sắp xếp từ bé đến lớn các kết quả: 45+32, 87-23, 56+28, 93-41',[{key:'1',text:'45+32=77'},{key:'2',text:'87-23=64'},{key:'3',text:'56+28=84'},{key:'4',text:'93-41=52'}],['4','2','1','3'],'52, 64, 77, 84.'),
  so(155,8,8,'hard','Sắp xếp từ lớn đến bé: 23+45, 67-14, 38+29, 76-23',[{key:'1',text:'23+45=68'},{key:'2',text:'67-14=53'},{key:'3',text:'38+29=67'},{key:'4',text:'76-23=53'}],['1','3','2','4'],'68, 67, 53, 53.'),
  co(155,8,9,'hard','Gạch bỏ phép tính có kết quả nhỏ hơn 50:',[{key:'A',text:'25+30=55'},{key:'B',text:'62-14=48'},{key:'C',text:'33+24=57'},{key:'D',text:'71-25=46'}],['B','D'],'48 và 46 nhỏ hơn 50.'),
  co(155,8,10,'hard','Gạch bỏ phép tính sai:',[{key:'A',text:'34+43=77'},{key:'B',text:'85-42=42'},{key:'C',text:'56+31=87'},{key:'D',text:'93-50=44'}],['B','D'],'85-42=43, 93-50=43.'),
];

// ─── LESSON 156: Bài toán có lời văn ────────────────────────────────────────
const L156: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(156,1,1,'easy','Có 25 quả táo, bán 12 quả. Còn lại mấy quả?',[{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'}],'B','25 - 12 = 13.'),
  sc(156,1,2,'easy','An có 30 viên kẹo, cho bạn 15 viên. An còn mấy viên?',[{key:'A',text:'14'},{key:'B',text:'15'},{key:'C',text:'16'}],'B','30 - 15 = 15.'),
  sc(156,1,3,'easy','Có 24 con gà, thêm 13 con. Có tất cả mấy con?',[{key:'A',text:'36'},{key:'B',text:'37'},{key:'C',text:'38'}],'B','24 + 13 = 37.'),
  sc(156,1,4,'easy','Hộp có 45 bút, lấy ra 22 cái. Còn lại mấy cái?',[{key:'A',text:'22'},{key:'B',text:'23'},{key:'C',text:'24'}],'B','45 - 22 = 23.'),
  tf(156,1,5,'easy','Có 32 học sinh, thêm 14 em. Tất cả 46 em. Đúng hay sai?',true,'32 + 14 = 46.'),
  tf(156,1,6,'easy','Có 50 cái bánh, ăn 20 cái, còn 25 cái. Đúng hay sai?',false,'50 - 20 = 30, không phải 25.'),
  tf(156,1,7,'easy','Mua 35 cam, bán 15 quả, còn 20 quả. Đúng hay sai?',true,'35 - 15 = 20.'),
  fb(156,1,8,'easy','Có 40 quyển vở, cho đi 18 quyển. Còn [b1] quyển.',[{key:'b1',text:''}],{b1:'22'},'40 - 18 = 22.'),
  fb(156,1,9,'easy','Lớp có [b1] học sinh nam và 17 học sinh nữ, tổng cộng 35 em.',[{key:'b1',text:''}],{b1:'18'},'35 - 17 = 18.'),
  fb(156,1,10,'easy','Bé có 26 bông hoa, mẹ cho thêm 23 bông. Bé có tất cả [b1] bông.',[{key:'b1',text:''}],{b1:'49'},'26 + 23 = 49.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(156,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 Cửa hàng có 45 táo. Bán đi 20 quả. Còn lại bao nhiêu quả?','25','45 - 20 = 25.'),
  ct(156,2,2,'easy','🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈 Có 33 bóng bay. Thêm 24 bóng. Có tất cả bao nhiêu bóng?','57','33 + 24 = 57.'),
  ct(156,2,3,'easy','🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 Bể có 56 con cá. Vớt ra 13 con. Còn bao nhiêu con?','43','56 - 13 = 43.'),
  so(156,2,4,'easy','Sắp xếp số học sinh từ ít đến nhiều: Lớp A 35, Lớp B 42, Lớp C 28, Lớp D 50',[{key:'1',text:'Lớp A: 35'},{key:'2',text:'Lớp B: 42'},{key:'3',text:'Lớp C: 28'},{key:'4',text:'Lớp D: 50'}],['3','1','2','4'],'28, 35, 42, 50.'),
  so(156,2,5,'easy','Sắp xếp số sách từ nhiều đến ít: Kệ A 67, Kệ B 45, Kệ C 78, Kệ D 23',[{key:'1',text:'Kệ A: 67'},{key:'2',text:'Kệ B: 45'},{key:'3',text:'Kệ C: 78'},{key:'4',text:'Kệ D: 23'}],['3','1','2','4'],'78, 67, 45, 23.'),
  so(156,2,6,'easy','Sắp xếp số quả từ ít đến nhiều: cam 54, xoài 31, chuối 68, ổi 47',[{key:'1',text:'cam: 54'},{key:'2',text:'xoài: 31'},{key:'3',text:'chuối: 68'},{key:'4',text:'ổi: 47'}],['2','4','1','3'],'31, 47, 54, 68.'),
  co(156,2,7,'easy','Gạch bỏ bài toán có đáp án sai:',[{key:'A',text:'20+35=55'},{key:'B',text:'48-23=26'},{key:'C',text:'34+12=46'},{key:'D',text:'70-40=30'}],['B'],'48-23=25, không phải 26.'),
  co(156,2,8,'easy','Gạch bỏ phép tính không phù hợp với bài: "Có 30 học sinh, đến thêm 15". Phép tính:',[{key:'A',text:'30+15=45'},{key:'B',text:'30-15=15'},{key:'C',text:'15+30=45'},{key:'D',text:'15-30=-15'}],['B','D'],'Thêm vào nên dùng phép cộng.'),
  fb(156,2,9,'easy','Vườn có 47 cây. Trồng thêm [b1] cây thì có 63 cây.',[{key:'b1',text:''}],{b1:'16'},'63 - 47 = 16.'),
  fb(156,2,10,'easy','Kho có 85 túi gạo. Xuất đi [b1] túi, còn 42 túi.',[{key:'b1',text:''}],{b1:'43'},'85 - 42 = 43.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(156,3,1,'easy','Bé có 23 nhãn vở. Mẹ mua thêm 14. Bé có tất cả mấy nhãn?',[{key:'A',text:'36'},{key:'B',text:'37'},{key:'C',text:'38'}],'B','23 + 14 = 37.'),
  sc(156,3,2,'easy','Túi có 68 viên bi, đổ ra 35 viên. Còn lại mấy viên?',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B','68 - 35 = 33.'),
  sc(156,3,3,'easy','Trường có 54 giáo viên, thêm 23 giáo viên mới. Có tất cả mấy giáo viên?',[{key:'A',text:'76'},{key:'B',text:'77'},{key:'C',text:'78'}],'B','54 + 23 = 77.'),
  sc(156,3,4,'easy','Hộp có 96 tờ giấy, dùng hết 42 tờ. Còn lại mấy tờ?',[{key:'A',text:'53'},{key:'B',text:'54'},{key:'C',text:'55'}],'B','96 - 42 = 54.'),
  tf(156,3,5,'easy','Bài toán: "Có 48 bạn học, thêm 21 bạn. Tất cả 69 bạn." Đúng hay sai?',true,'48 + 21 = 69.'),
  tf(156,3,6,'easy','Bài toán: "Có 75 quyển sách, bán 32 quyển. Còn 44 quyển." Đúng hay sai?',false,'75 - 32 = 43, không phải 44.'),
  tf(156,3,7,'easy','Bài toán: "Mua 36 trứng, vỡ 14 trứng. Còn 22 trứng." Đúng hay sai?',true,'36 - 14 = 22.'),
  fb(156,3,8,'easy','Bà có 50 quả bưởi, bán [b1] quả, còn 27 quả.',[{key:'b1',text:''}],{b1:'23'},'50 - 27 = 23.'),
  fb(156,3,9,'easy','Lớp 1A có 34 học sinh, lớp 1B có 33 học sinh. Hai lớp có tất cả [b1] học sinh.',[{key:'b1',text:''}],{b1:'67'},'34 + 33 = 67.'),
  ct(156,3,10,'easy','🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 Cửa hàng có 62 cam. Bán đi 28 quả. Còn bao nhiêu quả?','34','62 - 28 = 34.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(156,4,1,'medium','Lớp có 45 học sinh. Số học sinh nam nhiều hơn nữ 5 em. Số học sinh nữ là?',[{key:'A',text:'19'},{key:'B',text:'20'},{key:'C',text:'21'}],'B','(45-5)/2 = 20.'),
  sc(156,4,2,'medium','Bác có 80 quả. Bán đợt 1 được 35 quả, đợt 2 được 23 quả. Còn lại mấy quả?',[{key:'A',text:'21'},{key:'B',text:'22'},{key:'C',text:'23'}],'B','80 - 35 - 23 = 22.'),
  sc(156,4,3,'medium','Hai đội trồng được 78 cây. Đội A trồng nhiều hơn đội B 14 cây. Đội A trồng mấy cây?',[{key:'A',text:'45'},{key:'B',text:'46'},{key:'C',text:'47'}],'B','(78+14)/2 = 46.'),
  mc(156,4,4,'medium','Bài toán nào có phép tính là phép cộng?',[{key:'A',text:'Có 30 bạn, đi về 12 bạn'},{key:'B',text:'Có 25 quyển, mua thêm 13 quyển'},{key:'C',text:'Có 40 cam, ăn 15 quả'},{key:'D',text:'Có 20 bạn nam, thêm 15 bạn nữ vào lớp'}],['B','D'],'Mua thêm và thêm vào → phép cộng.'),
  mc(156,4,5,'medium','Bài toán nào có phép tính là phép trừ?',[{key:'A',text:'Có 50 viên bi, cho đi 20 viên'},{key:'B',text:'Thêm 25 học sinh vào lớp'},{key:'C',text:'Bán đi 15 quyển sách từ 48 quyển'},{key:'D',text:'Mua thêm 30 cái bánh'}],['A','C'],'Cho đi và bán đi → phép trừ.'),
  mc(156,4,6,'medium','Chọn các bài toán có đáp án đúng:',[{key:'A',text:'25+13=38 học sinh'},{key:'B',text:'70-45=26 quả'},{key:'C',text:'34+23=57 cây'},{key:'D',text:'86-42=44 quyển'}],['A','C','D'],'25+13=38, 34+23=57, 86-42=44. 70-45=25.'),
  mt(156,4,7,'medium','Nối bài toán với phép tính đúng:',[{key:'A',text:'Có 30 táo, mua thêm 25'},{key:'B',text:'Có 60 cam, bán 28'},{key:'C',text:'Có 45 bút, cho 13'},{key:'D',text:'Có 22 sách, mua thêm 35'}],{A:'30+25',B:'60-28',C:'45-13',D:'22+35'},'Bài cho thêm → cộng; cho đi/bán → trừ.'),
  mt(156,4,8,'medium','Nối bài toán với đáp án:',[{key:'A',text:'28+19=?'},{key:'B',text:'63-27=?'},{key:'C',text:'45+32=?'},{key:'D',text:'84-51=?'}],{A:'47',B:'36',C:'77',D:'33'},'Tính từng phép tính.'),
  dd(156,4,9,'medium','Kéo thẻ điền vào: Có 56 học sinh, thêm ___ học sinh thì đủ 89 học sinh.',[{key:'A',text:'33'},{key:'B',text:'34'},{key:'C',text:'32'}],['A'],'89 - 56 = 33.'),
  dd(156,4,10,'medium','Kéo thẻ: Kho có 94 thùng. Xuất ___ thùng thì còn 47 thùng.',[{key:'A',text:'47'},{key:'B',text:'46'},{key:'C',text:'48'}],['A'],'94 - 47 = 47.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(156,5,1,'medium','Điền đáp án vào bảng bài toán (số còn lại):',[{key:'ban_dau',text:'Lúc đầu'},{key:'them_bot',text:'Thêm/Bớt'},{key:'con_lai',text:'Còn lại'}],{ban_dau_1:'45', them_bot_1:'+12', con_lai_1:'57', ban_dau_2:'80', them_bot_2:'-35', con_lai_2:'45'},'Cộng/trừ tương ứng.'),
  tf2(156,5,2,'medium','Hoàn thành bảng tóm tắt bài toán:',[{key:'so_co',text:'Số có'},{key:'so_them',text:'Số thêm'},{key:'tat_ca',text:'Tất cả'}],{so_co:'34', so_them:'25', tat_ca:'59', so_co_2:'47', so_them_2:'31', tat_ca_2:'78'},'34+25=59, 47+31=78.'),
  nl(156,5,3,'medium','Tia số: bắt đầu từ 20, thêm 15, được bao nhiêu? Điền vào ô trống.',[{key:'b1',text:'?'}],{b1:'35'},'20 + 15 = 35.'),
  nl(156,5,4,'medium','Tia số: bắt đầu từ 78, bớt 23, được bao nhiêu? Điền vào ô trống.',[{key:'b1',text:'?'}],{b1:'55'},'78 - 23 = 55.'),
  pz(156,5,5,'medium','Điền số vào bài toán: Có ___ quyển sách. Cho đi 17 quyển, còn 38 quyển.',[{key:'A',text:'54'},{key:'B',text:'55'},{key:'C',text:'56'}],'B','38 + 17 = 55.'),
  pz(156,5,6,'medium','Điền số vào bài toán: Lớp có 35 học sinh nữ và ___ học sinh nam. Tất cả 68 học sinh.',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'}],'B','68 - 35 = 33.'),
  pz(156,5,7,'medium','Bài toán ngược: Kết quả là 42. Phép trừ nào cho ra 42?',[{key:'A',text:'77-35'},{key:'B',text:'79-37'},{key:'C',text:'80-38'}],'B','79 - 37 = 42.'),
  mt(156,5,8,'medium','Nối bài toán với kết quả:',[{key:'A',text:'Có 54 quả, bán 23'},{key:'B',text:'Có 37 bông, thêm 25'},{key:'C',text:'Có 80 tờ, dùng 48'},{key:'D',text:'Có 26 bút, mua thêm 34'}],{A:'31',B:'62',C:'32',D:'60'},'54-23=31, 37+25=62, 80-48=32, 26+34=60.'),
  mt(156,5,9,'medium','Nối câu hỏi với phép tính:',[{key:'A',text:'Còn lại bao nhiêu?'},{key:'B',text:'Có tất cả bao nhiêu?'},{key:'C',text:'Thêm bao nhiêu để đủ?'},{key:'D',text:'Nhiều hơn bao nhiêu?'}],{A:'phép trừ',B:'phép cộng',C:'phép trừ ngược',D:'phép trừ'},'Phân loại dạng toán.'),
  dd(156,5,10,'medium','Kéo thẻ: Bé hái ___ quả. Ăn 16 quả còn 27 quả. Bé hái bao nhiêu quả?',[{key:'A',text:'43'},{key:'B',text:'42'},{key:'C',text:'44'}],['A'],'27 + 16 = 43.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(156,6,1,'hard','Lớp có [b1] học sinh. Có 23 học sinh nữ. Học sinh nam nhiều hơn nữ 8 em. Học sinh nam là bao nhiêu?',[{key:'b1',text:''}],{b1:'54'},'23+8=31 nam; 23+31=54 tổng.'),
  fb(156,6,2,'hard','Bác Tư có 65 con vịt và [b1] con gà. Số gà ít hơn vịt 28 con. Tổng là bao nhiêu?',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'37',b2:'102'},'65-28=37 gà; 65+37=102 tổng.'),
  fb(156,6,3,'hard','Có 84 học sinh chia đều vào 2 lớp, thêm [b1] học sinh vào lớp A thì lớp A có 50 học sinh.',[{key:'b1',text:''}],{b1:'8'},'84/2=42 mỗi lớp; 50-42=8.'),
  pz(156,6,4,'hard','Bài toán hai bước: Có 48 bút. Mua thêm 25 cái rồi cho đi 18 cái. Còn lại mấy cái?',[{key:'A',text:'54'},{key:'B',text:'55'},{key:'C',text:'56'}],'B','48+25=73; 73-18=55.'),
  pz(156,6,5,'hard','Bài toán: Anh có 36 viên bi, em có ít hơn 12 viên. Hai anh em có tất cả bao nhiêu viên?',[{key:'A',text:'59'},{key:'B',text:'60'},{key:'C',text:'61'}],'B','36-12=24; 36+24=60.'),
  pz(156,6,6,'hard','Bài toán ngược: Sau khi bán 27 quyển, số sách còn lại là 54. Ban đầu có bao nhiêu quyển?',[{key:'A',text:'80'},{key:'B',text:'81'},{key:'C',text:'82'}],'B','54 + 27 = 81.'),
  mc(156,6,7,'hard','Bài toán nào cần hai bước tính?',[{key:'A',text:'Có 50 táo, ăn 15 quả. Còn lại?'},{key:'B',text:'Có 40 cam, mua thêm 20, bán 15. Còn lại?'},{key:'C',text:'Lớp có 35 học sinh, thêm 8. Có tất cả?'},{key:'D',text:'Có 60 kẹo, ăn 10 rồi cho 15. Còn lại?'}],['B','D'],'Hai bước tính có "rồi" hoặc hai hành động.'),
  mc(156,6,8,'hard','Chọn phép tính đúng cho bài: "Bé có 26 bóng xanh và 34 bóng đỏ, thổi vỡ 15 bóng. Còn lại?"',[{key:'A',text:'26+34-15=45'},{key:'B',text:'26+34=60; 60-15=45'},{key:'C',text:'34-15+26=45'},{key:'D',text:'26-15+34=45'}],['A','B'],'Đều cho ra 45 và đúng logic.'),
  so(156,6,9,'hard','Sắp xếp các bước giải bài toán đúng thứ tự: Đọc đề, Tính kết quả, Viết phép tính, Trả lời',[{key:'1',text:'Đọc đề'},{key:'2',text:'Tính kết quả'},{key:'3',text:'Viết phép tính'},{key:'4',text:'Trả lời'}],['1','3','2','4'],'Đúng quy trình giải toán có lời văn.'),
  so(156,6,10,'hard','Sắp xếp đáp số từ bé đến lớn: Bài A còn 34, Bài B còn 52, Bài C còn 28, Bài D còn 47',[{key:'1',text:'Bài A: 34'},{key:'2',text:'Bài B: 52'},{key:'3',text:'Bài C: 28'},{key:'4',text:'Bài D: 47'}],['3','1','4','2'],'28, 34, 47, 52.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(156,7,1,'hard','Trò chơi ghép đôi: Nối bài toán với phép tính và đáp án.',[{key:'Có 35 cam thêm 24',text:'35+24=59'},{key:'Có 78 táo bán 45',text:'78-45=33'},{key:'Có 46 bút cho 23',text:'46-23=23'},{key:'Có 27 sách mua thêm 31',text:'27+31=58'}],'Ghép đúng tất cả.'),
  gm(156,7,2,'hard','Trò chơi: Tìm cặp bài toán cho cùng đáp số.',[{key:'Có 60 mua thêm 15',text:'75'},{key:'Có 90 bán đi 15',text:'75'},{key:'Có 50 thêm 25',text:'75'},{key:'Có 100 cho đi 25',text:'75'}],'Tất cả đều bằng 75.'),
  mt(156,7,3,'hard','Nối từ gợi ý với phép tính:',[{key:'A',text:'Thêm vào'},{key:'B',text:'Bán đi'},{key:'C',text:'Mua thêm'},{key:'D',text:'Cho đi'}],{A:'cộng',B:'trừ',C:'cộng',D:'trừ'},'Thêm/mua thêm → cộng; bán/cho đi → trừ.'),
  mt(156,7,4,'hard','Nối bài toán với dạng toán:',[{key:'A',text:'Tìm tổng hai số'},{key:'B',text:'Tìm phần còn lại'},{key:'C',text:'Tìm số lớn hơn'},{key:'D',text:'Tìm số ban đầu'}],{A:'phép cộng',B:'phép trừ',C:'phép trừ',D:'phép trừ ngược'},'Phân loại dạng toán theo yêu cầu.'),
  mt(156,7,5,'hard','Nối bài toán với đáp án đúng:',[{key:'A',text:'Có 56 quyển, mua 27, cho 13. Còn?'},{key:'B',text:'Có 34 cam, ăn 12, mua 25. Có?'},{key:'C',text:'Có 80 học sinh, thêm 15, về 22. Còn?'},{key:'D',text:'Có 45 bóng, vỡ 8, mua 20. Có?'}],{A:'70',B:'47',C:'73',D:'57'},'56+27-13=70, 34-12+25=47, 80+15-22=73, 45-8+20=57.'),
  fb(156,7,6,'hard','Bài toán: Vườn có [b1] cây. Trồng thêm 28 cây, chặt 15 cây, còn 67 cây.',[{key:'b1',text:''}],{b1:'54'},'67 + 15 - 28 = 54.'),
  fb(156,7,7,'hard','Lớp có 36 học sinh. Nghỉ [b1] bạn rồi thêm 8 bạn mới, còn 38 bạn.',[{key:'b1',text:''}],{b1:'6'},'36 + 8 - 38 = 6.'),
  fb(156,7,8,'hard','Hộp có [b1] kẹo. Cho 24 cái, mua thêm 35 cái, còn 56 cái.',[{key:'b1',text:''}],{b1:'45'},'56 + 24 - 35 = 45.'),
  dd(156,7,9,'hard','Kéo thẻ điền: Đàn có ___ con bò. Bán 23 con, mua 15 con, còn 37 con.',[{key:'A',text:'45'},{key:'B',text:'44'},{key:'C',text:'46'}],['A'],'37 + 23 - 15 = 45.'),
  dd(156,7,10,'hard','Kéo thẻ điền: Kho có 65 thùng. Nhập ___ thùng, xuất 28 thùng, còn 57 thùng.',[{key:'A',text:'20'},{key:'B',text:'21'},{key:'C',text:'19'}],['A'],'57 + 28 - 65 = 20.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(156,8,1,'hard','Chọn tất cả cách giải đúng cho bài: "Có 45 học sinh, thêm 23, bớt 18. Còn?"',[{key:'A',text:'45+23-18=50'},{key:'B',text:'45+23=68; 68-18=50'},{key:'C',text:'23-18=5; 45+5=50'},{key:'D',text:'45-18+23=50'}],['A','B','C','D'],'Tất cả đều cho kết quả 50.'),
  mc(156,8,2,'hard','Chọn bài toán mà đáp số là 38:',[{key:'A',text:'Có 55 quả, ăn 17'},{key:'B',text:'Có 25 cây, trồng thêm 13'},{key:'C',text:'Có 70 bút, dùng 32'},{key:'D',text:'Có 46 sách, mượn 8'}],['A','C'],'55-17=38, 70-32=38.'),
  mc(156,8,3,'hard','Chọn phép tính phù hợp với câu hỏi "Còn lại bao nhiêu?":',[{key:'A',text:'56+23'},{key:'B',text:'78-34'},{key:'C',text:'45-12'},{key:'D',text:'33+47'}],['B','C'],'Còn lại → phép trừ.'),
  pz(156,8,4,'hard','Giải bài toán: Cửa hàng có 75 cái áo. Sáng bán 28 cái, chiều bán 19 cái. Còn lại?',[{key:'A',text:'27'},{key:'B',text:'28'},{key:'C',text:'29'}],'B','75 - 28 - 19 = 28.'),
  pz(156,8,5,'hard','Giải bài toán: Lớp 1A có 32 học sinh, 1B nhiều hơn 1A là 6 học sinh. Hai lớp có tất cả bao nhiêu?',[{key:'A',text:'69'},{key:'B',text:'70'},{key:'C',text:'71'}],'B','1B = 32+6 = 38; 32+38 = 70.'),
  pz(156,8,6,'hard','Bài toán: Ban đầu có một số cam. Cho đi 25 quả rồi mua thêm 16 quả thì có 54 quả. Ban đầu có bao nhiêu?',[{key:'A',text:'62'},{key:'B',text:'63'},{key:'C',text:'64'}],'B','54 + 25 - 16 = 63.'),
  so(156,8,7,'hard','Sắp xếp bài toán theo đáp số từ bé đến lớn: (A)35+23, (B)78-21, (C)46+15, (D)90-43',[{key:'1',text:'A: 35+23=58'},{key:'2',text:'B: 78-21=57'},{key:'3',text:'C: 46+15=61'},{key:'4',text:'D: 90-43=47'}],['4','2','1','3'],'47, 57, 58, 61.'),
  so(156,8,8,'hard','Sắp xếp từ lớn đến bé: (A)67-24, (B)38+28, (C)52+21, (D)89-32',[{key:'1',text:'A: 67-24=43'},{key:'2',text:'B: 38+28=66'},{key:'3',text:'C: 52+21=73'},{key:'4',text:'D: 89-32=57'}],['3','2','4','1'],'73, 66, 57, 43.'),
  co(156,8,9,'hard','Gạch bỏ bài toán có đáp án sai:',[{key:'A',text:'Có 47 táo, ăn 23, còn 24'},{key:'B',text:'Có 65 cam, bán 28, còn 38'},{key:'C',text:'Có 83 quyển, cho 35, còn 48'},{key:'D',text:'Có 72 bút, dùng 45, còn 26'}],['B','D'],'65-28=37 (không phải 38); 72-45=27 (không phải 26).'),
  co(156,8,10,'hard','Gạch bỏ phép tính không phù hợp với bài "Có bao nhiêu tất cả?":',[{key:'A',text:'35+42=77'},{key:'B',text:'68-25=43'},{key:'C',text:'23+54=77'},{key:'D',text:'90-37=53'}],['B','D'],'Tất cả → phép cộng; trừ không phù hợp.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();
  try {
    // Delete existing
    await qr.query('DELETE FROM quizzes WHERE lessonId IN (155,156)');

    // Insert L155
    for (const row of L155) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 155 — ${L155.length} questions inserted`);

    // Insert L156
    for (const row of L156) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 156 — ${L156.length} questions inserted`);

  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
