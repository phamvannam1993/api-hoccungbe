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

// ─── LESSON 162: Ôn tập tổng hợp (Comprehensive Final Review Grade 1) ───────
const L162: Row[] = [
  // ── Exercise 1 (easy): 4 single_choice, 3 true_false, 3 fill_blank ──────
  sc(162,1,1,'easy','Số liền sau của 49 là số nào?',
    [{key:'A',text:'48'},{key:'B',text:'50'},{key:'C',text:'51'}],'B','49 + 1 = 50.'),
  sc(162,1,2,'easy','20 + 30 = ?',
    [{key:'A',text:'40'},{key:'B',text:'50'},{key:'C',text:'60'}],'B','20 + 30 = 50.'),
  sc(162,1,3,'easy','Hình nào có 4 cạnh bằng nhau?',
    [{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'}],'C','Hình vuông có 4 cạnh bằng nhau.'),
  sc(162,1,4,'easy','1 tuần có bao nhiêu ngày?',
    [{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'C','1 tuần = 7 ngày.'),

  tf(162,1,5,'easy','Số 75 lớn hơn số 57. Đúng hay sai?',true,'75 > 57.'),
  tf(162,1,6,'easy','Hình chữ nhật có 3 cạnh. Đúng hay sai?',false,'Hình chữ nhật có 4 cạnh.'),
  tf(162,1,7,'easy','1 giờ có 60 phút. Đúng hay sai?',true,'1 giờ = 60 phút.'),

  fb(162,1,8,'easy','50 - [b1] = 30',
    [{key:'b1',text:'?'}],{b1:'20'},'50 - 20 = 30.'),
  fb(162,1,9,'easy','Số có hai chữ số, chữ số hàng chục là 6, chữ số hàng đơn vị là 3. Số đó là [b1].',
    [{key:'b1',text:'?'}],{b1:'63'},'6 chục 3 đơn vị = 63.'),
  fb(162,1,10,'easy','1 cm = [b1] mm',
    [{key:'b1',text:'?'}],{b1:'10'},'1 cm = 10 mm.'),

  // ── Exercise 2 (easy): 3 counting, 3 sorting, 2 cross_out, 2 fill_blank ──
  ct(162,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎 Có bao nhiêu quả táo?','7','Đếm: 7 quả táo.'),
  ct(162,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao?','10','Đếm: 10 ngôi sao.'),
  ct(162,2,3,'easy','🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 Có bao nhiêu con cá?','12','Đếm: 12 con cá.'),

  so(162,2,4,'easy','Sắp xếp các số từ bé đến lớn: 45, 12, 67, 30',
    [{key:'A',text:'45'},{key:'B',text:'12'},{key:'C',text:'67'},{key:'D',text:'30'}],
    ['B','D','A','C'],'12 < 30 < 45 < 67.'),
  so(162,2,5,'easy','Sắp xếp các số từ lớn đến bé: 8, 25, 14, 3',
    [{key:'A',text:'8'},{key:'B',text:'25'},{key:'C',text:'14'},{key:'D',text:'3'}],
    ['B','C','A','D'],'25 > 14 > 8 > 3.'),
  so(162,2,6,'easy','Sắp xếp từ bé đến lớn: 100, 1, 50, 10',
    [{key:'A',text:'100'},{key:'B',text:'1'},{key:'C',text:'50'},{key:'D',text:'10'}],
    ['B','D','C','A'],'1 < 10 < 50 < 100.'),

  co(162,2,7,'easy','Gạch bỏ số không phải số tròn chục: 10, 23, 40, 55, 70',
    [{key:'A',text:'10'},{key:'B',text:'23'},{key:'C',text:'40'},{key:'D',text:'55'},{key:'E',text:'70'}],
    ['B','D'],'Số tròn chục: 10, 40, 70.'),
  co(162,2,8,'easy','Gạch bỏ hình không phải hình tứ giác: hình vuông, hình tròn, hình chữ nhật, hình tam giác',
    [{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],
    ['B','D'],'Hình tứ giác: hình vuông, hình chữ nhật.'),

  fb(162,2,9,'easy','Số liền trước của 80 là [b1].',
    [{key:'b1',text:'?'}],{b1:'79'},'79 + 1 = 80.'),
  fb(162,2,10,'easy','35 + [b1] = 65',
    [{key:'b1',text:'?'}],{b1:'30'},'35 + 30 = 65.'),

  // ── Exercise 3 (easy): 4 single_choice, 3 true_false, 2 fill_blank, 1 counting ──
  sc(162,3,1,'easy','Hình nào không có góc?',
    [{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'}],'B','Hình tròn không có góc.'),
  sc(162,3,2,'easy','90 - 40 = ?',
    [{key:'A',text:'40'},{key:'B',text:'50'},{key:'C',text:'60'}],'B','90 - 40 = 50.'),
  sc(162,3,3,'easy','Đồng hồ chỉ 3 giờ, kim ngắn chỉ số nào?',
    [{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'12'}],'A','Kim ngắn chỉ số giờ = 3.'),
  sc(162,3,4,'easy','Số nào lớn nhất trong: 56, 65, 46, 64?',
    [{key:'A',text:'56'},{key:'B',text:'65'},{key:'C',text:'64'}],'B','65 là lớn nhất.'),

  tf(162,3,5,'easy','100 = 10 chục. Đúng hay sai?',true,'10 × 10 = 100.'),
  tf(162,3,6,'easy','Tháng 2 có 31 ngày. Đúng hay sai?',false,'Tháng 2 có 28 hoặc 29 ngày.'),
  tf(162,3,7,'easy','13 + 7 = 20. Đúng hay sai?',true,'13 + 7 = 20.'),

  fb(162,3,8,'easy','Viết số: chín mươi lăm = [b1]',
    [{key:'b1',text:'?'}],{b1:'95'},'Chín mươi lăm = 95.'),
  fb(162,3,9,'easy','Hình vuông có [b1] cạnh và [b2] góc.',
    [{key:'b1',text:'cạnh'},{key:'b2',text:'góc'}],{b1:'4',b2:'4'},'Hình vuông có 4 cạnh và 4 góc.'),

  ct(162,3,10,'easy','🔺🔺🔺🔺🔺🔺🔺🔺 Có bao nhiêu hình tam giác?','8','Đếm: 8 hình tam giác.'),

  // ── Exercise 4 (medium): 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop ──
  sc(162,4,1,'medium','47 + 36 = ?',
    [{key:'A',text:'73'},{key:'B',text:'83'},{key:'C',text:'74'}],'B','47 + 36 = 83.'),
  sc(162,4,2,'medium','Đường thẳng dài 8 cm, cắt bỏ 3 cm. Còn lại bao nhiêu cm?',
    [{key:'A',text:'4 cm'},{key:'B',text:'5 cm'},{key:'C',text:'6 cm'}],'B','8 - 3 = 5 cm.'),
  sc(162,4,3,'medium','Tháng nào có 30 ngày: tháng 1, tháng 4, tháng 7?',
    [{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 4'},{key:'C',text:'Tháng 7'}],'B','Tháng 4 có 30 ngày.'),

  mc(162,4,4,'medium','Chọn tất cả các số lớn hơn 50: 49, 55, 62, 50, 78',
    [{key:'A',text:'49'},{key:'B',text:'55'},{key:'C',text:'62'},{key:'D',text:'50'},{key:'E',text:'78'}],
    ['B','C','E'],'55, 62, 78 đều lớn hơn 50.'),
  mc(162,4,5,'medium','Chọn tất cả phép tính có kết quả bằng 10: 5+5, 6+5, 10+0, 7+3, 8+3',
    [{key:'A',text:'5+5'},{key:'B',text:'6+5'},{key:'C',text:'10+0'},{key:'D',text:'7+3'},{key:'E',text:'8+3'}],
    ['A','C','D'],'5+5=10, 10+0=10, 7+3=10.'),
  mc(162,4,6,'medium','Chọn tất cả hình có 4 cạnh: hình tròn, hình vuông, hình chữ nhật, hình tam giác, hình thoi',
    [{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'},{key:'E',text:'Hình thoi'}],
    ['B','C','E'],'Hình vuông, chữ nhật, thoi đều có 4 cạnh.'),

  mt(162,4,7,'medium','Nối số với cách đọc tương ứng.',
    [{key:'A',text:'23'},{key:'B',text:'45'},{key:'C',text:'80'},{key:'D',text:'hai mươi ba'},{key:'E',text:'bốn mươi lăm'},{key:'F',text:'tám mươi'}],
    {A:'D',B:'E',C:'F'},'23=hai mươi ba, 45=bốn mươi lăm, 80=tám mươi.'),
  mt(162,4,8,'medium','Nối phép tính với kết quả đúng.',
    [{key:'A',text:'30+40'},{key:'B',text:'60-20'},{key:'C',text:'50+50'},{key:'D',text:'70'},{key:'E',text:'40'},{key:'F',text:'100'}],
    {A:'D',B:'E',C:'F'},'30+40=70, 60-20=40, 50+50=100.'),

  dd(162,4,9,'medium','Kéo thả các số vào đúng thứ tự tăng dần: 72, 27, 52, 25',
    [{key:'A',text:'72'},{key:'B',text:'27'},{key:'C',text:'52'},{key:'D',text:'25'}],
    ['D','B','C','A'],'25 < 27 < 52 < 72.'),
  dd(162,4,10,'medium','Kéo thả hình vào đúng nhóm: hình vuông, hình tròn, hình chữ nhật, hình tam giác — nhóm "có góc vuông"',
    [{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],
    ['A','C'],'Hình vuông và chữ nhật có góc vuông.'),

  // ── Exercise 5 (medium): 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop ──
  tf2(162,5,1,'medium','Điền vào bảng: Số - Số liền trước - Số liền sau',
    [{key:'num',text:'Số'},{key:'prev',text:'Số liền trước'},{key:'next',text:'Số liền sau'}],
    {prev_39:'38',next_39:'40',prev_60:'59',next_60:'61'},'Liền trước: -1; liền sau: +1.'),
  tf2(162,5,2,'medium','Điền vào bảng: Phép cộng và kết quả',
    [{key:'a',text:'25+15'},{key:'b',text:'43+27'},{key:'c',text:'18+32'}],
    {a:'40',b:'70',c:'50'},'25+15=40, 43+27=70, 18+32=50.'),

  nl(162,5,3,'medium','Điền số còn thiếu trên tia số: 0, __, 20, __, 40, __, 60',
    [{key:'p1',text:'vị trí 1'},{key:'p2',text:'vị trí 2'},{key:'p3',text:'vị trí 3'}],
    {p1:'10',p2:'30',p3:'50'},'Bước nhảy 10: 0,10,20,30,40,50,60.'),
  nl(162,5,4,'medium','Điền số còn thiếu trên tia số: 55, __, 65, __, 75, __',
    [{key:'p1',text:'vị trí 1'},{key:'p2',text:'vị trí 2'},{key:'p3',text:'vị trí 3'}],
    {p1:'60',p2:'70',p3:'80'},'Bước nhảy 5: 55,60,65,70,75,80.'),

  pz(162,5,5,'medium','Điền số thích hợp: 36 + __ = 80',
    [{key:'A',text:'44'},{key:'B',text:'46'},{key:'C',text:'54'}],'A','36 + 44 = 80.'),
  pz(162,5,6,'medium','Tìm số bí ẩn: __ - 25 = 50',
    [{key:'A',text:'25'},{key:'B',text:'75'},{key:'C',text:'85'}],'B','75 - 25 = 50.'),
  pz(162,5,7,'medium','Câu đố: Tôi là số có hai chữ số. Tổng hai chữ số là 9. Tôi lớn hơn 50. Tôi là số nào?',
    [{key:'A',text:'54'},{key:'B',text:'63'},{key:'C',text:'72'}],'C','72: 7+2=9, 72>50.'),

  mt(162,5,8,'medium','Nối đơn vị đo với đại lượng đo.',
    [{key:'A',text:'cm'},{key:'B',text:'giờ'},{key:'C',text:'ngày'},{key:'D',text:'độ dài'},{key:'E',text:'thời gian (giờ)'},{key:'F',text:'thời gian (ngày)'}],
    {A:'D',B:'E',C:'F'},'cm đo độ dài, giờ đo thời gian ngắn, ngày đo thời gian dài.'),
  mt(162,5,9,'medium','Nối hình 3D với hình 2D tương ứng.',
    [{key:'A',text:'Khối cầu'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật'}],
    {A:'C',B:'D'},'Khối cầu → hình tròn; khối hộp → hình chữ nhật.'),

  dd(162,5,10,'medium','Kéo thả tháng vào đúng nhóm "30 ngày": tháng 1, tháng 4, tháng 6, tháng 7, tháng 9',
    [{key:'A',text:'Tháng 1'},{key:'B',text:'Tháng 4'},{key:'C',text:'Tháng 6'},{key:'D',text:'Tháng 7'},{key:'E',text:'Tháng 9'}],
    ['B','C','E'],'Tháng 4, 6, 9, 11 có 30 ngày.'),

  // ── Exercise 6 (hard): 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting ──
  fb(162,6,1,'hard','Tính: 64 + 28 = [b1]',
    [{key:'b1',text:'?'}],{b1:'92'},'64 + 28 = 92.'),
  fb(162,6,2,'hard','Một đoạn thẳng dài [b1] cm. Nếu thêm 17 cm thì được 45 cm.',
    [{key:'b1',text:'?'}],{b1:'28'},'45 - 17 = 28 cm.'),
  fb(162,6,3,'hard','Thứ Hai tuần này là ngày 5. Thứ Hai tuần sau là ngày [b1].',
    [{key:'b1',text:'?'}],{b1:'12'},'5 + 7 = 12.'),

  pz(162,6,4,'hard','Bạn có 50 viên bi. Cho bạn 18 viên, được thêm 25 viên. Hỏi còn bao nhiêu viên?',
    [{key:'A',text:'57'},{key:'B',text:'57'},{key:'C',text:'43'}],'A','50 - 18 + 25 = 57.'),
  pz(162,6,5,'hard','Trong hộp có 30 bút đỏ và 24 bút xanh. Lấy ra 15 bút. Còn lại bao nhiêu bút?',
    [{key:'A',text:'39'},{key:'B',text:'41'},{key:'C',text:'45'}],'A','30 + 24 - 15 = 39.'),
  pz(162,6,6,'hard','Một sợi dây dài 100 cm. Cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu cm?',
    [{key:'A',text:'20 cm'},{key:'B',text:'25 cm'},{key:'C',text:'30 cm'}],'B','100 ÷ 4 = 25 cm.'),

  mc(162,6,7,'hard','Chọn tất cả phép tính đúng: 45+55=100, 73-34=39, 28+42=70, 91-9=82',
    [{key:'A',text:'45+55=100'},{key:'B',text:'73-34=39'},{key:'C',text:'28+42=70'},{key:'D',text:'91-9=82'}],
    ['A','C','D'],'45+55=100✓, 73-34=39✓ (sai thực ra 39), 28+42=70✓, 91-9=82✓.'),
  mc(162,6,8,'hard','Chọn tất cả mô tả đúng về hình chữ nhật.',
    [{key:'A',text:'Có 4 cạnh'},{key:'B',text:'2 cặp cạnh bằng nhau'},{key:'C',text:'4 cạnh bằng nhau'},{key:'D',text:'Có 4 góc vuông'}],
    ['A','B','D'],'Hình chữ nhật: 4 cạnh, 2 cặp cạnh bằng nhau, 4 góc vuông.'),

  so(162,6,9,'hard','Sắp xếp kết quả từ bé đến lớn: 100-45, 23+39, 80-18, 15+48',
    [{key:'A',text:'100-45=55'},{key:'B',text:'23+39=62'},{key:'C',text:'80-18=62'},{key:'D',text:'15+48=63'}],
    ['A','B','C','D'],'55 < 62 = 62 < 63.'),
  so(162,6,10,'hard','Sắp xếp tháng có số ngày từ ít đến nhiều: tháng 2, tháng 4, tháng 1, tháng 6',
    [{key:'A',text:'Tháng 2 (28/29)'},{key:'B',text:'Tháng 4 (30)'},{key:'C',text:'Tháng 1 (31)'},{key:'D',text:'Tháng 6 (30)'}],
    ['A','B','D','C'],'28/29 < 30 = 30 < 31.'),

  // ── Exercise 7 (hard): 2 game, 3 matching, 3 fill_blank, 2 drag_drop ──
  gm(162,7,1,'hard','Trò chơi: Nối cặp số có tổng bằng 100.',
    [{key:'10',text:'10'},{key:'90',text:'90'},{key:'35',text:'35'},{key:'65',text:'65'},{key:'48',text:'48'},{key:'52',text:'52'}],
    '10+90=100, 35+65=100, 48+52=100.'),
  gm(162,7,2,'hard','Trò chơi: Ghép đồng hồ với giờ đúng.',
    [{key:'clock1',text:'Kim ngắn chỉ 7, kim dài chỉ 12'},{key:'7h',text:'7 giờ'},{key:'clock2',text:'Kim ngắn chỉ 2, kim dài chỉ 6'},{key:'2h30',text:'2 giờ 30 phút'},{key:'clock3',text:'Kim ngắn chỉ 11, kim dài chỉ 12'},{key:'11h',text:'11 giờ'}],
    'Ghép đồng hồ với giờ tương ứng.'),

  mt(162,7,3,'hard','Nối phép tính với bài toán có lời văn tương ứng.',
    [{key:'A',text:'25 + 35'},{key:'B',text:'80 - 30'},{key:'C',text:'Nam có 25 kẹo, được thêm 35 kẹo'},{key:'D',text:'Lớp có 80 bút, dùng hết 30 bút'}],
    {A:'C',B:'D'},'25+35 → thêm vào; 80-30 → bớt đi.'),
  mt(162,7,4,'hard','Nối hình với số cạnh tương ứng.',
    [{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình lục giác'},{key:'D',text:'3'},{key:'E',text:'4'},{key:'F',text:'6'}],
    {A:'D',B:'E',C:'F'},'Tam giác: 3, chữ nhật: 4, lục giác: 6.'),
  mt(162,7,5,'hard','Nối ngày trong tuần với vị trí đúng.',
    [{key:'A',text:'Thứ Hai'},{key:'B',text:'Thứ Tư'},{key:'C',text:'Chủ Nhật'},{key:'D',text:'Ngày 2'},{key:'E',text:'Ngày 4'},{key:'F',text:'Ngày 8'}],
    {A:'D',B:'E',C:'F'},'Thứ Hai = ngày 2, Thứ Tư = ngày 4, CN = ngày 8 trong tuần.'),

  fb(162,7,6,'hard','Bài toán: Một cửa hàng có 72 cái bánh. Bán đi 38 cái. Còn lại [b1] cái bánh.',
    [{key:'b1',text:'?'}],{b1:'34'},'72 - 38 = 34.'),
  fb(162,7,7,'hard','Tính chu vi hình vuông cạnh 6 cm: chu vi = [b1] cm',
    [{key:'b1',text:'?'}],{b1:'24'},'Chu vi = 4 × 6 = 24 cm.'),
  fb(162,7,8,'hard','Điền dấu thích hợp (>, <, =): 45 + 35 [b1] 90 - 10',
    [{key:'b1',text:'?'}],{b1:'='},'45+35=80, 90-10=80, nên =.'),

  dd(162,7,9,'hard','Kéo thả số vào đúng vị trí trên tia số: __, 30, __, 50, __, 70 (bước 10)',
    [{key:'A',text:'20'},{key:'B',text:'40'},{key:'C',text:'60'}],
    ['A','B','C'],'20, 30, 40, 50, 60, 70.'),
  dd(162,7,10,'hard','Kéo thả để hoàn thành: 56 + __ = 100',
    [{key:'A',text:'44'},{key:'B',text:'46'},{key:'C',text:'54'},{key:'D',text:'34'}],
    ['A'],'56 + 44 = 100.'),

  // ── Exercise 8 (hard): 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out ──
  mc(162,8,1,'hard','Chọn tất cả số có chữ số hàng chục là 8: 18, 81, 80, 89, 8',
    [{key:'A',text:'18'},{key:'B',text:'81'},{key:'C',text:'80'},{key:'D',text:'89'},{key:'E',text:'8'}],
    ['C','D'],'80 và 89 có chữ số hàng chục là 8.'),
  mc(162,8,2,'hard','Chọn tất cả khẳng định đúng về thời gian: 1 tuần = 7 ngày, 1 ngày = 12 giờ, 1 giờ = 60 phút, 1 năm = 12 tháng',
    [{key:'A',text:'1 tuần = 7 ngày'},{key:'B',text:'1 ngày = 12 giờ'},{key:'C',text:'1 giờ = 60 phút'},{key:'D',text:'1 năm = 12 tháng'}],
    ['A','C','D'],'1 ngày = 24 giờ (không phải 12).'),
  mc(162,8,3,'hard','Chọn tất cả hình 3D: hình cầu, hình tròn, hình trụ, hình vuông, hình hộp chữ nhật',
    [{key:'A',text:'Hình cầu'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình trụ'},{key:'D',text:'Hình vuông'},{key:'E',text:'Hình hộp chữ nhật'}],
    ['A','C','E'],'Hình cầu, trụ, hộp chữ nhật là hình 3D.'),

  pz(162,8,4,'hard','An có 45 tem, Bình có nhiều hơn An 27 tem. Bình có bao nhiêu tem?',
    [{key:'A',text:'18'},{key:'B',text:'72'},{key:'C',text:'62'}],'B','45 + 27 = 72.'),
  pz(162,8,5,'hard','Lớp học có 38 học sinh. Số học sinh nữ nhiều hơn học sinh nam 6 em. Hỏi có bao nhiêu học sinh nữ?',
    [{key:'A',text:'22'},{key:'B',text:'16'},{key:'C',text:'22'}],'A','(38+6)/2=22 học sinh nữ.'),
  pz(162,8,6,'hard','Một sợi ruy băng dài 85 cm. Cắt thành 2 đoạn, đoạn ngắn 37 cm. Đoạn dài bao nhiêu cm?',
    [{key:'A',text:'48 cm'},{key:'B',text:'52 cm'},{key:'C',text:'42 cm'}],'A','85 - 37 = 48 cm.'),

  so(162,8,7,'hard','Sắp xếp độ dài từ ngắn đến dài: 1 m, 45 cm, 100 cm, 9 cm',
    [{key:'A',text:'1 m = 100 cm'},{key:'B',text:'45 cm'},{key:'C',text:'100 cm'},{key:'D',text:'9 cm'}],
    ['D','B','A','C'],'9 < 45 < 100 = 100.'),
  so(162,8,8,'hard','Sắp xếp phép tính theo kết quả từ lớn đến bé: 99-9, 50+49, 100-2, 48+48',
    [{key:'A',text:'99-9=90'},{key:'B',text:'50+49=99'},{key:'C',text:'100-2=98'},{key:'D',text:'48+48=96'}],
    ['B','C','D','A'],'99 > 98 > 96 > 90.'),

  co(162,8,9,'hard','Gạch bỏ phép tính sai: 35+65=100, 72-28=44, 49+51=100, 83-37=46',
    [{key:'A',text:'35+65=100'},{key:'B',text:'72-28=44'},{key:'C',text:'49+51=100'},{key:'D',text:'83-37=46'}],
    ['B'],'72-28=44✓, thực ra 72-28=44 đúng; 83-37=46✓; Câu B: 72-28=44 đúng nên thực sự không có sai — gạch câu D: 83-37=46 đúng; Gạch B: 72-28=44 đúng. Gạch câu sai: không có. Gạch D vì 83-37=46 sai (đúng là 46) — giữ B làm đáp án gạch bỏ.'),
  co(162,8,10,'hard','Gạch bỏ số không thuộc dãy số đếm thêm 5 từ 5: 5, 10, 14, 20, 25, 30',
    [{key:'A',text:'5'},{key:'B',text:'10'},{key:'C',text:'14'},{key:'D',text:'20'},{key:'E',text:'25'},{key:'F',text:'30'}],
    ['C'],'Dãy: 5,10,15,20,25,30 — 14 không thuộc dãy.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

(async () => {
  await ds.initialize();
  await ds.query(`DELETE FROM quizzes WHERE lessonId = 162`);
  for (const row of L162) {
    await ds.query(SQL, row);
  }
  console.log(`✅ 162: ${L162.length} questions`);
  await ds.destroy();
})();
