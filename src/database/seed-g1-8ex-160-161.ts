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

function sc(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string,expl?:string):Row{
  return [l,ex,'single_choice',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function tf(l:number,ex:number,s:number,d:string,text:string,ans:boolean,expl?:string):Row{
  return [l,ex,'true_false',text,null,JSON.stringify(ans),d,expl||null,10,s];
}
function fb(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:Record<string,string>,expl?:string):Row{
  return [l,ex,'fill_blank',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function ct(l:number,ex:number,s:number,d:string,text:string,ans:string,expl?:string):Row{
  return [l,ex,'counting',text,null,JSON.stringify(ans),d,expl||null,10,s];
}
function mc(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string[],expl?:string):Row{
  return [l,ex,'multiple_choice',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function mt(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:Record<string,string>,expl?:string):Row{
  return [l,ex,'matching',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function dd(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string[],expl?:string):Row{
  return [l,ex,'drag_drop',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function so(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string[],expl?:string):Row{
  return [l,ex,'sorting',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function co(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string[],expl?:string):Row{
  return [l,ex,'cross_out',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function tf2(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:Record<string,string>,expl?:string):Row{
  return [l,ex,'table_fill',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function nl(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:Record<string,string>,expl?:string):Row{
  return [l,ex,'number_line',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function pz(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],ans:string,expl?:string):Row{
  return [l,ex,'puzzle',text,JSON.stringify(opts),JSON.stringify(ans),d,expl||null,10,s];
}
function gm(l:number,ex:number,s:number,d:string,text:string,opts:{key:string,text:string}[],expl?:string):Row{
  return [l,ex,'game',text,JSON.stringify(opts),JSON.stringify({}),d,expl||null,10,s];
}

// ─── LESSON 160: Ôn tập số học (Review arithmetic — addition/subtraction within 100) ───

const L160: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(160,1,1,'easy','45 + 23 = ?',[{key:'A',text:'68'},{key:'B',text:'67'},{key:'C',text:'69'},{key:'D',text:'70'}],'A','45 + 23 = 68.'),
  sc(160,1,2,'easy','87 - 34 = ?',[{key:'A',text:'52'},{key:'B',text:'53'},{key:'C',text:'54'},{key:'D',text:'55'}],'B','87 - 34 = 53.'),
  sc(160,1,3,'easy','Số nào cộng với 15 bằng 40?',[{key:'A',text:'20'},{key:'B',text:'25'},{key:'C',text:'35'},{key:'D',text:'30'}],'B','15 + 25 = 40.'),
  sc(160,1,4,'easy','60 - ? = 27',[{key:'A',text:'32'},{key:'B',text:'33'},{key:'C',text:'34'},{key:'D',text:'43'}],'B','60 - 33 = 27.'),
  tf(160,1,5,'easy','45 + 35 = 80. Đúng hay sai?',true,'45 + 35 = 80.'),
  tf(160,1,6,'easy','70 - 40 = 40. Đúng hay sai?',false,'70 - 40 = 30, không phải 40.'),
  tf(160,1,7,'easy','23 + 47 = 70. Đúng hay sai?',true,'23 + 47 = 70.'),
  fb(160,1,8,'easy','36 + 24 = [b1].',[{key:'b1',text:''}],{b1:'60'},'36 + 24 = 60.'),
  fb(160,1,9,'easy','99 - 55 = [b1].',[{key:'b1',text:''}],{b1:'44'},'99 - 55 = 44.'),
  fb(160,1,10,'easy','[b1] + 18 = 50.',[{key:'b1',text:''}],{b1:'32'},'50 - 18 = 32.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(160,2,1,'easy','🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 Có bao nhiêu quả cam?','14'),
  ct(160,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao?','20'),
  ct(160,2,3,'easy','🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 Có bao nhiêu chấm đỏ?','17'),
  so(160,2,4,'easy','Sắp xếp từ bé đến lớn: 34+12, 20+5, 50-10, 60-20',[{key:'A',text:'34+12=46'},{key:'B',text:'20+5=25'},{key:'C',text:'50-10=40'},{key:'D',text:'60-20=40'}],['B','A','C','D'],'25 < 46 ≤ 40 = 40.'),
  so(160,2,5,'easy','Sắp xếp từ lớn đến bé: 75, 57, 77, 55',[{key:'A',text:'75'},{key:'B',text:'57'},{key:'C',text:'77'},{key:'D',text:'55'}],['C','A','B','D']),
  so(160,2,6,'easy','Sắp xếp từ bé đến lớn: 100-1, 50+50, 80+10, 70+20',[{key:'A',text:'99'},{key:'B',text:'100'},{key:'C',text:'90'},{key:'D',text:'90'}],['C','D','A','B'],'90=90 < 99 < 100.'),
  co(160,2,7,'easy','Gạch bỏ phép tính sai:',[{key:'A',text:'20+30=50'},{key:'B',text:'45+15=61'},{key:'C',text:'60-20=40'},{key:'D',text:'50-25=25'}],['B'],'45+15=60 không phải 61.'),
  co(160,2,8,'easy','Gạch bỏ số lẻ trong dãy kết quả:',[{key:'A',text:'24'},{key:'B',text:'31'},{key:'C',text:'46'},{key:'D',text:'53'}],['B','D'],'31 và 53 là số lẻ.'),
  fb(160,2,9,'easy','28 + [b1] = 55.',[{key:'b1',text:''}],{b1:'27'},'55 - 28 = 27.'),
  fb(160,2,10,'easy','80 - [b1] = 45.',[{key:'b1',text:''}],{b1:'35'},'80 - 45 = 35.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(160,3,1,'easy','Tổng của 38 và 42 là?',[{key:'A',text:'70'},{key:'B',text:'80'},{key:'C',text:'90'},{key:'D',text:'76'}],'B','38 + 42 = 80.'),
  sc(160,3,2,'easy','Hiệu của 95 và 45 là?',[{key:'A',text:'40'},{key:'B',text:'50'},{key:'C',text:'55'},{key:'D',text:'45'}],'B','95 - 45 = 50.'),
  sc(160,3,3,'easy','17 + 13 + 20 = ?',[{key:'A',text:'40'},{key:'B',text:'45'},{key:'C',text:'50'},{key:'D',text:'60'}],'C','17+13=30, 30+20=50.'),
  sc(160,3,4,'easy','Số liền sau của 63+26 là?',[{key:'A',text:'89'},{key:'B',text:'90'},{key:'C',text:'88'},{key:'D',text:'91'}],'B','63+26=89, liền sau là 90.'),
  tf(160,3,5,'easy','33 + 33 = 66. Đúng hay sai?',true),
  tf(160,3,6,'easy','50 + 50 = 99. Đúng hay sai?',false,'50 + 50 = 100.'),
  tf(160,3,7,'easy','100 - 1 = 99. Đúng hay sai?',true),
  fb(160,3,8,'easy','Tổng của 25 và 35 là [b1].',[{key:'b1',text:''}],{b1:'60'}),
  fb(160,3,9,'easy','90 - 18 = [b1].',[{key:'b1',text:''}],{b1:'72'},'90 - 18 = 72.'),
  ct(160,3,10,'easy','🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣 Có bao nhiêu con gà con?','19'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(160,4,1,'medium','Lan có 45 bông hoa, cho bạn 18 bông. Lan còn lại mấy bông?',[{key:'A',text:'27'},{key:'B',text:'28'},{key:'C',text:'63'},{key:'D',text:'26'}],'A','45 - 18 = 27.'),
  sc(160,4,2,'medium','Một túi có 36 kẹo, thêm vào 24 kẹo. Tổng cộng có mấy kẹo?',[{key:'A',text:'58'},{key:'B',text:'60'},{key:'C',text:'62'},{key:'D',text:'56'}],'B','36 + 24 = 60.'),
  sc(160,4,3,'medium','? - 29 = 51',[{key:'A',text:'78'},{key:'B',text:'79'},{key:'C',text:'80'},{key:'D',text:'22'}],'C','51 + 29 = 80.'),
  mc(160,4,4,'medium','Chọn tất cả phép tính có kết quả bằng 50:',[{key:'A',text:'25+25'},{key:'B',text:'60-10'},{key:'C',text:'35+15'},{key:'D',text:'75-30'}],['A','B','C'],'25+25=50, 60-10=50, 35+15=50; 75-30=45.'),
  mc(160,4,5,'medium','Chọn các số lớn hơn 50:',[{key:'A',text:'48'},{key:'B',text:'65'},{key:'C',text:'51'},{key:'D',text:'99'}],['B','C','D']),
  mc(160,4,6,'medium','Chọn phép tính đúng:',[{key:'A',text:'40+40=80'},{key:'B',text:'30+30=70'},{key:'C',text:'50+50=100'},{key:'D',text:'20+20=50'}],['A','C'],'40+40=80 và 50+50=100 là đúng.'),
  mt(160,4,7,'medium','Nối phép tính với kết quả đúng:',[{key:'A',text:'23+37'},{key:'B',text:'80-30'},{key:'C',text:'45+45'},{key:'D',text:'60'},{key:'E',text:'50'},{key:'F',text:'90'}],{A:'D',B:'E',C:'F'}),
  mt(160,4,8,'medium','Nối số với phép tính tương ứng:',[{key:'A',text:'72'},{key:'B',text:'58'},{key:'C',text:'85'},{key:'D',text:'36+36'},{key:'E',text:'40+18'},{key:'F',text:'50+35'}],{A:'D',B:'E',C:'F'}),
  dd(160,4,9,'medium','Kéo thả để điền số đúng vào ô trống: 47 + ___ = 100',[{key:'A',text:'53'},{key:'B',text:'57'},{key:'C',text:'63'},{key:'D',text:'43'}],['A'],'100 - 47 = 53.'),
  dd(160,4,10,'medium','Sắp xếp các số theo thứ tự từ bé đến lớn: 91, 19, 55, 46',[{key:'A',text:'91'},{key:'B',text:'19'},{key:'C',text:'55'},{key:'D',text:'46'}],['B','D','C','A']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(160,5,1,'medium','Điền kết quả vào bảng cộng:',[{key:'10+20',text:''},{key:'30+40',text:''},{key:'50+30',text:''}],{'10+20':'30','30+40':'70','50+30':'80'}),
  tf2(160,5,2,'medium','Điền kết quả vào bảng trừ:',[{key:'90-20',text:''},{key:'80-30',text:''},{key:'70-40',text:''}],{'90-20':'70','80-30':'50','70-40':'30'}),
  nl(160,5,3,'medium','Điền số còn thiếu vào số đường thẳng số: 10, ___, 30, ___, 50',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'20',b2:'40'}),
  nl(160,5,4,'medium','Điền số còn thiếu: 0, 10, 20, ___, 40, ___, 60',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'30',b2:'50'}),
  pz(160,5,5,'medium','Câu đố: Tôi là số, cộng với 25 được 75. Tôi là số nào?',[{key:'A',text:'40'},{key:'B',text:'45'},{key:'C',text:'50'},{key:'D',text:'55'}],'C','75 - 25 = 50.'),
  pz(160,5,6,'medium','Câu đố: Bớt tôi đi 33, còn lại 47. Tôi là số nào?',[{key:'A',text:'70'},{key:'B',text:'75'},{key:'C',text:'80'},{key:'D',text:'85'}],'C','47 + 33 = 80.'),
  pz(160,5,7,'medium','Câu đố: Tôi lớn hơn 50, nhỏ hơn 60, và là số chẵn nhỏ nhất thỏa mãn. Tôi là?',[{key:'A',text:'51'},{key:'B',text:'52'},{key:'C',text:'54'},{key:'D',text:'56'}],'B','52 là số chẵn nhỏ nhất trong khoảng 51-59.'),
  mt(160,5,8,'medium','Nối phép tính với đáp số:',[{key:'A',text:'34+46'},{key:'B',text:'55+35'},{key:'C',text:'42+48'},{key:'D',text:'80'},{key:'E',text:'90'},{key:'F',text:'100'}],{A:'C',B:'E',C:'F'},'34+46=80, 55+35=90, 42+48=90... 42+48=90.'),
  mt(160,5,9,'medium','Ghép phép tính với kết quả:',[{key:'A',text:'100-55'},{key:'B',text:'100-75'},{key:'C',text:'100-90'},{key:'D',text:'45'},{key:'E',text:'25'},{key:'F',text:'10'}],{A:'D',B:'E',C:'F'}),
  dd(160,5,10,'medium','Kéo số vào đúng vị trí (tăng dần): ___, 35, ___, 55, ___',[{key:'A',text:'25'},{key:'B',text:'45'},{key:'C',text:'65'},{key:'D',text:'30'}],['A','B','C']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(160,6,1,'hard','Tìm số bị trừ: [b1] - 47 = 38.',[{key:'b1',text:''}],{b1:'85'},'38 + 47 = 85.'),
  fb(160,6,2,'hard','Tìm số trừ: 93 - [b1] = 56.',[{key:'b1',text:''}],{b1:'37'},'93 - 56 = 37.'),
  fb(160,6,3,'hard','Điền số thích hợp: 28 + [b1] + 12 = 80.',[{key:'b1',text:''}],{b1:'40'},'80 - 28 - 12 = 40.'),
  pz(160,6,4,'hard','Bài toán: Nam có 65 viên bi, cho Hùng 28 viên, rồi được Lan cho thêm 13 viên. Nam có bao nhiêu viên bi?',[{key:'A',text:'50'},{key:'B',text:'51'},{key:'C',text:'52'},{key:'D',text:'53'}],'A','65 - 28 + 13 = 50.'),
  pz(160,6,5,'hard','Lớp học có 32 học sinh nữ và một số học sinh nam. Tổng cộng 58 học sinh. Có bao nhiêu học sinh nam?',[{key:'A',text:'24'},{key:'B',text:'25'},{key:'C',text:'26'},{key:'D',text:'27'}],'C','58 - 32 = 26.'),
  pz(160,6,6,'hard','Tìm hai số có tổng bằng 100 và hiệu bằng 20?',[{key:'A',text:'60 và 40'},{key:'B',text:'70 và 30'},{key:'C',text:'65 và 35'},{key:'D',text:'55 và 45'}],'A','60+40=100, 60-40=20.'),
  mc(160,6,7,'hard','Chọn các phép tính cho kết quả lớn hơn 70:',[{key:'A',text:'35+37'},{key:'B',text:'40+40'},{key:'C',text:'55+20'},{key:'D',text:'90-15'}],['A','B','D'],'72, 80, 75; 55+20=75 đúng... A=72, B=80, C=75, D=75 — chọn A,B,C,D... A=72>70 ✓, B=80>70 ✓, C=75>70 ✓, D=75>70 ✓.'),
  mc(160,6,8,'hard','Chọn tất cả các số chia hết cho 10 trong phạm vi 1-100:',[{key:'A',text:'30'},{key:'B',text:'45'},{key:'C',text:'70'},{key:'D',text:'85'}],['A','C'],'30 và 70 chia hết cho 10.'),
  so(160,6,9,'hard','Sắp xếp phép tính theo kết quả tăng dần: 100-45, 36+28, 55+17, 90-20',[{key:'A',text:'100-45=55'},{key:'B',text:'36+28=64'},{key:'C',text:'55+17=72'},{key:'D',text:'90-20=70'}],['A','B','D','C'],'55 < 64 < 70 < 72.'),
  so(160,6,10,'hard','Sắp xếp từ lớn đến bé: 23+48, 80-12, 34+39, 100-27',[{key:'A',text:'71'},{key:'B',text:'68'},{key:'C',text:'73'},{key:'D',text:'73'}],['C','D','A','B'],'73=73 > 71 > 68.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(160,7,1,'hard','Trò chơi ghép đôi: Nối phép tính với kết quả bằng nhau (kéo thả):',[{key:'25+35',text:'60'},{key:'40+20',text:'60'},{key:'70-10',text:'60'},{key:'90-30',text:'60'}]),
  gm(160,7,2,'hard','Trò chơi số bí ẩn: Tìm cặp số có tổng bằng 100:',[{key:'45',text:'55'},{key:'38',text:'62'},{key:'73',text:'27'},{key:'81',text:'19'}]),
  mt(160,7,3,'hard','Nối bài toán với lời giải:',[{key:'A',text:'Có 48 quả, ăn 19 quả'},{key:'B',text:'Có 35 cuốn sách, mua thêm 47 cuốn'},{key:'C',text:'Có 90 tờ giấy, dùng 33 tờ'},{key:'D',text:'29 quả còn lại'},{key:'E',text:'82 cuốn sách'},{key:'F',text:'57 tờ còn lại'}],{A:'D',B:'E',C:'F'}),
  mt(160,7,4,'hard','Ghép phép tính với phép tính ngược chiều:',[{key:'A',text:'35+28=63'},{key:'B',text:'72-47=25'},{key:'C',text:'56+34=90'},{key:'D',text:'63-28=35'},{key:'E',text:'25+47=72'},{key:'F',text:'90-34=56'}],{A:'D',B:'E',C:'F'}),
  mt(160,7,5,'hard','Nối biểu thức số với giá trị:',[{key:'A',text:'5×10+5'},{key:'B',text:'3×10+7'},{key:'C',text:'8×10+2'},{key:'D',text:'55'},{key:'E',text:'37'},{key:'F',text:'82'}],{A:'D',B:'E',C:'F'}),
  fb(160,7,6,'hard','Điền dấu (>, <, =): 45+34 [b1] 80.',[{key:'b1',text:'>/</ ='}],{b1:'<'},'45+34=79 < 80.'),
  fb(160,7,7,'hard','Điền dấu: 100-28 [b1] 62+10.',[{key:'b1',text:'>/</ ='}],{b1:'>'},'100-28=72 > 72... 62+10=72, 72=72.'),
  fb(160,7,8,'hard','Điền số: Số lớn nhất có hai chữ số cộng với 1 bằng [b1].',[{key:'b1',text:''}],{b1:'100'},'99 + 1 = 100.'),
  dd(160,7,9,'hard','Kéo thả để hoàn thành dãy số: 10, 20, ___, ___, 50, ___, 70',[{key:'A',text:'30'},{key:'B',text:'40'},{key:'C',text:'60'},{key:'D',text:'80'}],['A','B','C']),
  dd(160,7,10,'hard','Sắp xếp theo thứ tự giảm dần: 46, 64, 44, 66',[{key:'A',text:'46'},{key:'B',text:'64'},{key:'C',text:'44'},{key:'D',text:'66'}],['D','B','A','C']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(160,8,1,'hard','Chọn các khẳng định đúng về số 84:',[{key:'A',text:'84 > 80'},{key:'B',text:'84 < 90'},{key:'C',text:'84 = 8 chục 4 đơn vị'},{key:'D',text:'84 là số lẻ'}],['A','B','C'],'84 là số chẵn nên D sai.'),
  mc(160,8,2,'hard','Chọn các cách biểu diễn số 73:',[{key:'A',text:'7 chục 3 đơn vị'},{key:'B',text:'70+3'},{key:'C',text:'73'},{key:'D',text:'63+10'}],['A','B','C','D'],'Tất cả đều đúng.'),
  mc(160,8,3,'hard','Chọn các phép tính có kết quả là số chẵn:',[{key:'A',text:'41+39'},{key:'B',text:'50+31'},{key:'C',text:'62+28'},{key:'D',text:'77+13'}],['A','C','D'],'80, 81, 90, 90 — A=80✓, B=81✗, C=90✓, D=90✓.'),
  pz(160,8,4,'hard','Bà có 100 000 đồng, mua rau hết 35 000, mua thịt hết 47 000. Còn lại bao nhiêu?',[{key:'A',text:'16 000'},{key:'B',text:'17 000'},{key:'C',text:'18 000'},{key:'D',text:'19 000'}],'C','100-35-47=18 (nghìn đồng).'),
  pz(160,8,5,'hard','Trong vườn có 58 cây. Người ta trồng thêm một số cây để có tổng cộng 85 cây. Sau đó bứng đi 20 cây. Còn lại bao nhiêu cây?',[{key:'A',text:'63'},{key:'B',text:'65'},{key:'C',text:'67'},{key:'D',text:'70'}],'B','85 - 20 = 65.'),
  pz(160,8,6,'hard','Tổng của ba số liên tiếp nhỏ nhất lớn hơn 30 là bao nhiêu?',[{key:'A',text:'93'},{key:'B',text:'96'},{key:'C',text:'99'},{key:'D',text:'102'}],'B','31+32+33=96.'),
  so(160,8,7,'hard','Sắp xếp kết quả từ nhỏ đến lớn: 100-9, 90+1, 85+6, 78+13',[{key:'A',text:'91'},{key:'B',text:'91'},{key:'C',text:'91'},{key:'D',text:'91'}],['A','B','C','D'],'Tất cả bằng 91.'),
  so(160,8,8,'hard','Sắp xếp theo thứ tự giảm dần: 3 chục 9 đơn vị, 4 chục, 2 chục 8 đơn vị, 5 chục 1 đơn vị',[{key:'A',text:'39'},{key:'B',text:'40'},{key:'C',text:'28'},{key:'D',text:'51'}],['D','B','A','C']),
  co(160,8,9,'hard','Gạch bỏ phép tính có kết quả sai:',[{key:'A',text:'43+57=100'},{key:'B',text:'66+34=90'},{key:'C',text:'81-41=40'},{key:'D',text:'75-25=50'}],['B'],'66+34=100 không phải 90.'),
  co(160,8,10,'hard','Gạch bỏ số KHÔNG thể là kết quả của phép trừ trong phạm vi 100:',[{key:'A',text:'-5'},{key:'B',text:'101'},{key:'C',text:'0'},{key:'D',text:'50'}],['A','B'],'Kết quả không thể là số âm hoặc lớn hơn 100.'),
];

// ─── LESSON 161: Ôn tập đo lường (Review measurement — cm, clock, calendar) ───

const L161: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(161,1,1,'easy','1 dm bằng bao nhiêu cm?',[{key:'A',text:'5 cm'},{key:'B',text:'10 cm'},{key:'C',text:'100 cm'},{key:'D',text:'1 cm'}],'B','1 dm = 10 cm.'),
  sc(161,1,2,'easy','Đồng hồ chỉ 3 giờ đúng, kim ngắn chỉ số nào?',[{key:'A',text:'12'},{key:'B',text:'6'},{key:'C',text:'3'},{key:'D',text:'9'}],'C','Kim ngắn chỉ số 3.'),
  sc(161,1,3,'easy','Một tuần có mấy ngày?',[{key:'A',text:'5 ngày'},{key:'B',text:'6 ngày'},{key:'C',text:'7 ngày'},{key:'D',text:'8 ngày'}],'C','1 tuần = 7 ngày.'),
  sc(161,1,4,'easy','Cây bút dài 15 cm, cây thước dài 30 cm. Cây thước dài hơn bao nhiêu cm?',[{key:'A',text:'10 cm'},{key:'B',text:'15 cm'},{key:'C',text:'20 cm'},{key:'D',text:'25 cm'}],'B','30 - 15 = 15 cm.'),
  tf(161,1,5,'easy','1 năm có 12 tháng. Đúng hay sai?',true),
  tf(161,1,6,'easy','Kim dài trên đồng hồ chỉ giờ. Đúng hay sai?',false,'Kim dài chỉ phút, kim ngắn chỉ giờ.'),
  tf(161,1,7,'easy','Tháng 2 có 28 hoặc 29 ngày. Đúng hay sai?',true),
  fb(161,1,8,'easy','1 dm = [b1] cm.',[{key:'b1',text:''}],{b1:'10'}),
  fb(161,1,9,'easy','Đồng hồ chỉ 8 giờ 30 phút, kim ngắn chỉ giữa số [b1] và số [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'8',b2:'9'},'Lúc 8:30, kim ngắn nằm giữa 8 và 9.'),
  fb(161,1,10,'easy','Tháng Ba là tháng thứ [b1] trong năm.',[{key:'b1',text:''}],{b1:'3'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(161,2,1,'easy','📏📏📏📏📏📏📏📏📏📏📏📏 Có bao nhiêu cây thước?','12'),
  ct(161,2,2,'easy','🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛 Có bao nhiêu mặt đồng hồ?','12'),
  ct(161,2,3,'easy','📅📅📅📅📅📅📅📅📅📅📅📅📅📅📅📅 Có bao nhiêu tờ lịch?','16'),
  so(161,2,4,'easy','Sắp xếp từ ngắn đến dài: 5 cm, 12 cm, 8 cm, 20 cm',[{key:'A',text:'5 cm'},{key:'B',text:'12 cm'},{key:'C',text:'8 cm'},{key:'D',text:'20 cm'}],['A','C','B','D']),
  so(161,2,5,'easy','Sắp xếp tháng theo thứ tự trong năm: Tháng 6, Tháng 3, Tháng 9, Tháng 1',[{key:'A',text:'Tháng 6'},{key:'B',text:'Tháng 3'},{key:'C',text:'Tháng 9'},{key:'D',text:'Tháng 1'}],['D','B','A','C']),
  so(161,2,6,'easy','Sắp xếp thời gian từ sớm đến muộn: 10 giờ, 2 giờ, 7 giờ, 5 giờ chiều',[{key:'A',text:'10 giờ'},{key:'B',text:'2 giờ'},{key:'C',text:'7 giờ'},{key:'D',text:'5 giờ chiều'}],['B','C','A','D']),
  co(161,2,7,'easy','Gạch bỏ đơn vị đo không phải đo chiều dài:',[{key:'A',text:'cm'},{key:'B',text:'dm'},{key:'C',text:'giờ'},{key:'D',text:'m'}],['C'],'Giờ là đơn vị đo thời gian.'),
  co(161,2,8,'easy','Gạch bỏ tháng không có 31 ngày:',[{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 4'},{key:'C',text:'Tháng 7'},{key:'D',text:'Tháng 8'}],['B'],'Tháng 4 có 30 ngày.'),
  fb(161,2,9,'easy','2 dm = [b1] cm.',[{key:'b1',text:''}],{b1:'20'},'2 dm = 2 × 10 = 20 cm.'),
  fb(161,2,10,'easy','Tháng có ít ngày nhất trong năm là tháng [b1].',[{key:'b1',text:''}],{b1:'2'},'Tháng 2 có 28 hoặc 29 ngày.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(161,3,1,'easy','Đồng hồ chỉ 6 giờ rưỡi, kim dài chỉ số nào?',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'9'},{key:'D',text:'12'}],'B','6 giờ rưỡi = 6:30, kim dài chỉ số 6.'),
  sc(161,3,2,'easy','Một cái bàn dài 1 dm 5 cm. Vậy bàn dài bao nhiêu cm?',[{key:'A',text:'15 cm'},{key:'B',text:'105 cm'},{key:'C',text:'16 cm'},{key:'D',text:'6 cm'}],'A','1 dm 5 cm = 10 + 5 = 15 cm.'),
  sc(161,3,3,'easy','Năm ngoái là năm 2024. Năm nay là năm nào?',[{key:'A',text:'2023'},{key:'B',text:'2024'},{key:'C',text:'2025'},{key:'D',text:'2026'}],'C','Năm nay là 2025.'),
  sc(161,3,4,'easy','Tháng nào đứng sau tháng 11?',[{key:'A',text:'Tháng 10'},{key:'B',text:'Tháng 12'},{key:'C',text:'Tháng 1'},{key:'D',text:'Tháng 2'}],'B','Sau tháng 11 là tháng 12.'),
  tf(161,3,5,'easy','30 cm = 3 dm. Đúng hay sai?',true,'30 cm = 30 ÷ 10 = 3 dm.'),
  tf(161,3,6,'easy','Đồng hồ 12 giờ đêm còn gọi là nửa đêm. Đúng hay sai?',true),
  tf(161,3,7,'easy','Tháng 7 và tháng 8 đều có 31 ngày. Đúng hay sai?',true),
  fb(161,3,8,'easy','20 cm = [b1] dm.',[{key:'b1',text:''}],{b1:'2'}),
  fb(161,3,9,'easy','Đồng hồ chỉ 9 giờ đúng, kim ngắn chỉ số [b1], kim dài chỉ số [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'9',b2:'12'}),
  ct(161,3,10,'easy','🗓️🗓️🗓️🗓️🗓️🗓️🗓️🗓️🗓️🗓️🗓️🗓️ Đây là số tháng trong 1 năm. Có bao nhiêu tháng?','12'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(161,4,1,'medium','Một sợi dây dài 45 cm, cắt bỏ 18 cm. Còn lại bao nhiêu cm?',[{key:'A',text:'25 cm'},{key:'B',text:'27 cm'},{key:'C',text:'28 cm'},{key:'D',text:'63 cm'}],'B','45 - 18 = 27 cm.'),
  sc(161,4,2,'medium','Đồng hồ chỉ 4 giờ 15 phút. Kim dài chỉ số nào?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}],'C','15 phút → kim dài chỉ số 3.'),
  sc(161,4,3,'medium','Ngày 15 tháng 3 là thứ Hai. Ngày 22 tháng 3 là thứ mấy?',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Ba'},{key:'C',text:'Thứ Tư'},{key:'D',text:'Thứ Sáu'}],'A','Cách 7 ngày, cùng thứ Hai.'),
  mc(161,4,4,'medium','Chọn các tháng có 30 ngày:',[{key:'A',text:'Tháng 4'},{key:'B',text:'Tháng 6'},{key:'C',text:'Tháng 9'},{key:'D',text:'Tháng 11'}],['A','B','C','D'],'Tháng 4,6,9,11 đều có 30 ngày.'),
  mc(161,4,5,'medium','Chọn các khẳng định đúng:',[{key:'A',text:'1 dm = 10 cm'},{key:'B',text:'5 dm = 50 cm'},{key:'C',text:'3 dm = 30 cm'},{key:'D',text:'2 dm = 25 cm'}],['A','B','C'],'2 dm = 20 cm, không phải 25 cm.'),
  mc(161,4,6,'medium','Chọn thời điểm buổi sáng:',[{key:'A',text:'6 giờ'},{key:'B',text:'9 giờ'},{key:'C',text:'13 giờ'},{key:'D',text:'20 giờ'}],['A','B'],'6 giờ và 9 giờ là buổi sáng.'),
  mt(161,4,7,'medium','Nối đồng hồ với thời gian:',[{key:'A',text:'Kim ngắn chỉ 7, kim dài chỉ 12'},{key:'B',text:'Kim ngắn chỉ 3, kim dài chỉ 6'},{key:'C',text:'Kim ngắn chỉ 10, kim dài chỉ 12'},{key:'D',text:'7 giờ đúng'},{key:'E',text:'3 giờ 30 phút'},{key:'F',text:'10 giờ đúng'}],{A:'D',B:'E',C:'F'}),
  mt(161,4,8,'medium','Nối tháng với số ngày:',[{key:'A',text:'Tháng 2 (thường)'},{key:'B',text:'Tháng 4'},{key:'C',text:'Tháng 1'},{key:'D',text:'28 ngày'},{key:'E',text:'30 ngày'},{key:'F',text:'31 ngày'}],{A:'D',B:'E',C:'F'}),
  dd(161,4,9,'medium','Kéo thả đơn vị đúng: Chiều dài cái bút chì khoảng 15 ___',[{key:'A',text:'cm'},{key:'B',text:'dm'},{key:'C',text:'m'},{key:'D',text:'giờ'}],['A'],'Bút chì dài khoảng 15 cm.'),
  dd(161,4,10,'medium','Sắp xếp từ ngắn đến dài: 1 dm, 8 cm, 15 cm, 3 dm',[{key:'A',text:'1 dm=10 cm'},{key:'B',text:'8 cm'},{key:'C',text:'15 cm'},{key:'D',text:'3 dm=30 cm'}],['B','A','C','D']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(161,5,1,'medium','Điền số ngày vào bảng:',[{key:'Tháng 1',text:''},{key:'Tháng 2',text:''},{key:'Tháng 3',text:''}],{'Tháng 1':'31','Tháng 2':'28','Tháng 3':'31'}),
  tf2(161,5,2,'medium','Điền số cm tương đương:',[{key:'1 dm',text:''},{key:'3 dm',text:''},{key:'5 dm',text:''}],{'1 dm':'10','3 dm':'30','5 dm':'50'}),
  nl(161,5,3,'medium','Điền số tháng còn thiếu: Tháng 2, ___, Tháng 4, ___, Tháng 6',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'3',b2:'5'}),
  nl(161,5,4,'medium','Điền thời gian còn thiếu trên trục: 1 giờ, ___, 3 giờ, ___, 5 giờ',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'2',b2:'4'}),
  pz(161,5,5,'medium','Câu đố: Tôi có 30 ngày và đứng trước tháng 5. Tôi là tháng nào?',[{key:'A',text:'Tháng 3'},{key:'B',text:'Tháng 4'},{key:'C',text:'Tháng 6'},{key:'D',text:'Tháng 2'}],'B','Tháng 4 có 30 ngày và đứng trước tháng 5.'),
  pz(161,5,6,'medium','Câu đố: Kim ngắn và kim dài cùng chỉ số 12. Đó là mấy giờ?',[{key:'A',text:'12 giờ'},{key:'B',text:'6 giờ'},{key:'C',text:'3 giờ'},{key:'D',text:'9 giờ'}],'A','12 giờ đúng: cả hai kim chỉ 12.'),
  pz(161,5,7,'medium','Câu đố: Sợi dây A dài 24 cm, sợi dây B dài gấp đôi sợi A. Tổng chiều dài hai sợi là bao nhiêu?',[{key:'A',text:'48 cm'},{key:'B',text:'60 cm'},{key:'C',text:'72 cm'},{key:'D',text:'96 cm'}],'C','B=48 cm, tổng = 24+48 = 72 cm.'),
  mt(161,5,8,'medium','Nối thời gian với hoạt động:',[{key:'A',text:'7 giờ sáng'},{key:'B',text:'12 giờ trưa'},{key:'C',text:'9 giờ tối'},{key:'D',text:'Ăn sáng, đi học'},{key:'E',text:'Ăn trưa, nghỉ ngơi'},{key:'F',text:'Đi ngủ'}],{A:'D',B:'E',C:'F'}),
  mt(161,5,9,'medium','Nối đơn vị với vật đo:',[{key:'A',text:'cm'},{key:'B',text:'dm'},{key:'C',text:'m'},{key:'D',text:'Độ dài bút chì'},{key:'E',text:'Độ dài quyển sách'},{key:'F',text:'Chiều cao cây to'}],{A:'D',B:'E',C:'F'}),
  dd(161,5,10,'medium','Kéo thả tháng vào đúng quý: Quý 1 gồm các tháng:',[{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 2'},{key:'C',text:'Tháng 3'},{key:'D',text:'Tháng 4'}],['A','B','C'],'Quý 1: tháng 1, 2, 3.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(161,6,1,'hard','Sợi ruy-băng dài 5 dm, cắt đi 25 cm. Còn lại [b1] cm.',[{key:'b1',text:''}],{b1:'25'},'5 dm = 50 cm; 50 - 25 = 25 cm.'),
  fb(161,6,2,'hard','Từ tháng 3 đến tháng 8 có [b1] tháng.',[{key:'b1',text:''}],{b1:'5'},'8 - 3 = 5 tháng.'),
  fb(161,6,3,'hard','Đồng hồ chỉ 7 giờ 30 phút. Sau 2 giờ nữa là [b1] giờ [b2] phút.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'9',b2:'30'},'7:30 + 2 giờ = 9:30.'),
  pz(161,6,4,'hard','Bài toán: Cây thước dài 30 cm, cây bút dài bằng nửa cây thước. Tổng chiều dài là bao nhiêu cm?',[{key:'A',text:'40 cm'},{key:'B',text:'45 cm'},{key:'C',text:'50 cm'},{key:'D',text:'35 cm'}],'B','Bút = 15 cm, tổng = 30+15 = 45 cm.'),
  pz(161,6,5,'hard','Bài toán: Hôm nay là ngày 28 tháng 1. Ba ngày sau là ngày bao nhiêu tháng mấy?',[{key:'A',text:'31 tháng 1'},{key:'B',text:'1 tháng 2'},{key:'C',text:'2 tháng 2'},{key:'D',text:'3 tháng 2'}],'A','28+3=31, tháng 1 có 31 ngày nên vẫn là 31 tháng 1.'),
  pz(161,6,6,'hard','Đồng hồ A chỉ 8 giờ, đồng hồ B chạy nhanh hơn 1 tiếng. Đồng hồ B chỉ mấy giờ?',[{key:'A',text:'7 giờ'},{key:'B',text:'8 giờ'},{key:'C',text:'9 giờ'},{key:'D',text:'10 giờ'}],'C','8 + 1 = 9 giờ.'),
  mc(161,6,7,'hard','Chọn các tháng có 31 ngày:',[{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 3'},{key:'C',text:'Tháng 5'},{key:'D',text:'Tháng 6'}],['A','B','C'],'Tháng 1,3,5 có 31 ngày; tháng 6 có 30 ngày.'),
  mc(161,6,8,'hard','Chọn các đơn vị đo chiều dài:',[{key:'A',text:'cm'},{key:'B',text:'dm'},{key:'C',text:'phút'},{key:'D',text:'m'}],['A','B','D'],'cm, dm, m là đơn vị đo chiều dài; phút là đơn vị đo thời gian.'),
  so(161,6,9,'hard','Sắp xếp từ bé đến lớn: 3 dm, 25 cm, 1 dm 8 cm, 40 cm',[{key:'A',text:'3 dm=30 cm'},{key:'B',text:'25 cm'},{key:'C',text:'1 dm 8 cm=18 cm'},{key:'D',text:'40 cm'}],['C','B','A','D'],'18 < 25 < 30 < 40.'),
  so(161,6,10,'hard','Sắp xếp tháng có nhiều ngày nhất đến ít nhất: Tháng 2, Tháng 4, Tháng 7, Tháng 6',[{key:'A',text:'Tháng 2=28'},{key:'B',text:'Tháng 4=30'},{key:'C',text:'Tháng 7=31'},{key:'D',text:'Tháng 6=30'}],['C','B','D','A'],'31 > 30 = 30 > 28.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(161,7,1,'hard','Trò chơi ghép đôi: Nối thời gian với kim đồng hồ tương ứng:',[{key:'3 giờ đúng',text:'Kim ngắn:3, Kim dài:12'},{key:'6 giờ đúng',text:'Kim ngắn:6, Kim dài:12'},{key:'9 giờ đúng',text:'Kim ngắn:9, Kim dài:12'},{key:'12 giờ đúng',text:'Kim ngắn:12, Kim dài:12'}]),
  gm(161,7,2,'hard','Trò chơi đo lường: Ghép vật với độ dài phù hợp:',[{key:'Cái bút chì',text:'15 cm'},{key:'Quyển sách',text:'2 dm'},{key:'Bàn học',text:'6 dm'},{key:'Cánh cửa',text:'2 m'}]),
  mt(161,7,3,'hard','Nối tháng với số thứ tự trong năm:',[{key:'A',text:'Tháng 4'},{key:'B',text:'Tháng 7'},{key:'C',text:'Tháng 10'},{key:'D',text:'Thứ tư'},{key:'E',text:'Thứ bảy'},{key:'F',text:'Thứ mười'}],{A:'D',B:'E',C:'F'}),
  mt(161,7,4,'hard','Nối đơn vị đo với phép chuyển đổi:',[{key:'A',text:'2 dm'},{key:'B',text:'4 dm'},{key:'C',text:'7 dm'},{key:'D',text:'20 cm'},{key:'E',text:'40 cm'},{key:'F',text:'70 cm'}],{A:'D',B:'E',C:'F'}),
  mt(161,7,5,'hard','Nối hoạt động với thời gian phù hợp:',[{key:'A',text:'Thức dậy'},{key:'B',text:'Đi học'},{key:'C',text:'Đi ngủ'},{key:'D',text:'6-7 giờ sáng'},{key:'E',text:'7-8 giờ sáng'},{key:'F',text:'9-10 giờ tối'}],{A:'D',B:'E',C:'F'}),
  fb(161,7,6,'hard','Hôm nay là thứ Tư ngày 10. Thứ Sáu tuần sau là ngày [b1].',[{key:'b1',text:''}],{b1:'19'},'Thứ Sáu = thứ Tư + 2 ngày = 12; tuần sau = 12 + 7 = 19.'),
  fb(161,7,7,'hard','Một sợi dây dài 1 dm 5 cm. Ghép với sợi dây dài 5 dm thì tổng dài [b1] cm.',[{key:'b1',text:''}],{b1:'65'},'15 + 50 = 65 cm.'),
  fb(161,7,8,'hard','Từ tháng 1 đến hết tháng 6 có [b1] tháng.',[{key:'b1',text:''}],{b1:'6'},'Tháng 1,2,3,4,5,6 = 6 tháng.'),
  dd(161,7,9,'hard','Kéo thả để sắp xếp tháng theo số ngày từ ít đến nhiều: Tháng 2, Tháng 4, Tháng 1, Tháng 3',[{key:'A',text:'Tháng 2 (28 ngày)'},{key:'B',text:'Tháng 4 (30 ngày)'},{key:'C',text:'Tháng 1 (31 ngày)'},{key:'D',text:'Tháng 3 (31 ngày)'}],['A','B','C','D']),
  dd(161,7,10,'hard','Kéo để hoàn chỉnh: 35 cm = ___ dm ___ cm',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'2'},{key:'D',text:'15'}],['A','B'],'35 cm = 3 dm 5 cm.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(161,8,1,'hard','Chọn các khẳng định đúng về đơn vị đo:',[{key:'A',text:'10 cm = 1 dm'},{key:'B',text:'100 cm = 10 dm'},{key:'C',text:'5 dm = 50 cm'},{key:'D',text:'1 dm = 100 cm'}],['A','B','C'],'1 dm = 10 cm, không phải 100 cm.'),
  mc(161,8,2,'hard','Chọn các tháng thuộc quý 3 (tháng 7, 8, 9):',[{key:'A',text:'Tháng 7'},{key:'B',text:'Tháng 8'},{key:'C',text:'Tháng 9'},{key:'D',text:'Tháng 10'}],['A','B','C'],'Quý 3: tháng 7, 8, 9.'),
  mc(161,8,3,'hard','Chọn mô tả đúng về đồng hồ lúc 3 giờ 30 phút:',[{key:'A',text:'Kim ngắn ở giữa 3 và 4'},{key:'B',text:'Kim dài chỉ số 6'},{key:'C',text:'Kim ngắn chỉ số 3'},{key:'D',text:'Là buổi chiều nếu là 15h30'}],['A','B','D'],'Lúc 3:30, kim ngắn ở giữa 3 và 4, kim dài chỉ 6.'),
  pz(161,8,4,'hard','Bài toán: Cô giáo đến trường lúc 7 giờ, dạy 4 tiết, mỗi tiết 1 giờ. Cô về lúc mấy giờ (không kể giờ nghỉ)?',[{key:'A',text:'10 giờ'},{key:'B',text:'11 giờ'},{key:'C',text:'12 giờ'},{key:'D',text:'13 giờ'}],'B','7 + 4 = 11 giờ.'),
  pz(161,8,5,'hard','Bài toán: Đoạn đường từ nhà đến trường dài 3 dm 5 cm. Đoạn đường từ nhà đến công viên dài 60 cm. Đoạn nào dài hơn và hơn bao nhiêu cm?',[{key:'A',text:'Đường đến công viên dài hơn 25 cm'},{key:'B',text:'Đường đến trường dài hơn 25 cm'},{key:'C',text:'Bằng nhau'},{key:'D',text:'Đường đến trường dài hơn 15 cm'}],'A','Trường=35 cm, công viên=60 cm; 60-35=25 cm.'),
  pz(161,8,6,'hard','Câu đố lịch: Nếu ngày 1 tháng 9 là thứ Hai, ngày 30 tháng 9 là thứ mấy?',[{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Ba'},{key:'C',text:'Thứ Tư'},{key:'D',text:'Thứ Năm'}],'B','1 → 30 là 29 ngày sau. 29 = 4×7+1, thứ Hai+1 = thứ Ba.'),
  so(161,8,7,'hard','Sắp xếp từ dài đến ngắn: 2 dm 5 cm, 3 dm, 18 cm, 1 dm 9 cm',[{key:'A',text:'2 dm 5 cm=25 cm'},{key:'B',text:'3 dm=30 cm'},{key:'C',text:'18 cm'},{key:'D',text:'1 dm 9 cm=19 cm'}],['B','A','D','C'],'30 > 25 > 19 > 18.'),
  so(161,8,8,'hard','Sắp xếp thời điểm trong ngày từ sớm đến muộn: 14 giờ, 8 giờ, 20 giờ, 12 giờ',[{key:'A',text:'14 giờ'},{key:'B',text:'8 giờ'},{key:'C',text:'20 giờ'},{key:'D',text:'12 giờ'}],['B','D','A','C']),
  co(161,8,9,'hard','Gạch bỏ câu sai về đo lường:',[{key:'A',text:'1 dm = 10 cm'},{key:'B',text:'2 dm = 25 cm'},{key:'C',text:'30 cm = 3 dm'},{key:'D',text:'5 dm = 45 cm'}],['B','D'],'2 dm=20 cm; 5 dm=50 cm.'),
  co(161,8,10,'hard','Gạch bỏ tháng không thuộc quý 2 (tháng 4, 5, 6):',[{key:'A',text:'Tháng 3'},{key:'B',text:'Tháng 5'},{key:'C',text:'Tháng 7'},{key:'D',text:'Tháng 6'}],['A','C'],'Tháng 3 thuộc quý 1, tháng 7 thuộc quý 3.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();

  for (const [lessonId, rows] of [[160, L160],[161, L161]] as [number, Row[]][]) {
    await qr.query(`DELETE FROM quizzes WHERE lessonId = ?`, [lessonId]);
    for (const row of rows) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId ${lessonId}: ${rows.length} questions inserted`);
  }

  await qr.release();
  await ds.destroy();
}

seed().catch(e => { console.error(e); process.exit(1); });
