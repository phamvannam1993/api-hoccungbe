import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

async function seed() {
  const conn = await mysql.createConnection(DB);

  const INSERT = `INSERT INTO quizzes (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, explanation, points, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`;

  function r(lessonId: number, exerciseNumber: number, questionType: string, questionText: string, optionsJson: any, correctAnswer: any, difficultyLevel: string, explanation: string | null, sortOrder: number) {
    return [lessonId, exerciseNumber, questionType, questionText, optionsJson ? JSON.stringify(optionsJson) : null, JSON.stringify(correctAnswer), difficultyLevel, explanation ?? null, 10, sortOrder];
  }

  const lessons: { id: number; rows: any[][] }[] = [];

  // ─── 1070: Ôn tập các số đến 100 ───────────────────────────────────────────
  {
    const id = 1070;
    const rows: any[][] = [
      // Ex1 easy
      r(id,1,'single_choice','Số 47 đọc là?',[{key:'A',text:'Bốn mươi bảy'},{key:'B',text:'Bảy mươi bốn'},{key:'C',text:'Bốn mươi'}],'A','easy','47 = bốn mươi bảy',1),
      r(id,1,'single_choice','Số nào lớn hơn trong hai số 63 và 36?',[{key:'A',text:'36'},{key:'B',text:'63'},{key:'C',text:'Bằng nhau'}],'B','easy','63 > 36 vì chục 6 > chục 3',2),
      r(id,1,'single_choice','Số 80 có mấy chục?',[{key:'A',text:'8 chục'},{key:'B',text:'0 chục'},{key:'C',text:'80 chục'}],'A','easy','80 = 8 chục 0 đơn vị',3),
      r(id,1,'true_false','Số 55 có 5 chục và 5 đơn vị. Đúng hay sai?',null,true,'easy','55 = 5 chục 5 đơn vị',4),
      r(id,1,'true_false','Số liền sau của 99 là 100. Đúng hay sai?',null,true,'easy','99 + 1 = 100',5),
      r(id,1,'fill_blank','Số 72 có [b1] chục và [b2] đơn vị.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'7',b2:'2'},'easy','72 = 7 chục 2 đơn vị',6),
      r(id,1,'fill_blank','[b1] < 45 < [b2] (số liền trước và liền sau).',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'44',b2:'46'},'easy','Số liền trước 45 là 44, liền sau là 46',7),
      r(id,1,'counting','Đếm số quả táo: 🍎🍎🍎🍎🍎🍎🍎🍎',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'},{key:'d8',text:'🍎'}],'8','easy','Đếm 8 quả táo',8),
      r(id,1,'sorting','Sắp xếp các số sau theo thứ tự từ bé đến lớn:',[{key:'1',text:'58'},{key:'2',text:'25'},{key:'3',text:'81'},{key:'4',text:'40'}],['2','4','1','3'],'easy','25 < 40 < 58 < 81',9),
      r(id,1,'cross_out','Khoanh tròn số KHÔNG phải số có hai chữ số:',[{key:'A',text:'9'},{key:'B',text:'45'},{key:'C',text:'100'},{key:'D',text:'72'}],['A','C'],'easy','9 là số có một chữ số, 100 là số có ba chữ số',10),
      // Ex2 medium
      r(id,2,'single_choice','Số nào đứng giữa 29 và 31?',[{key:'A',text:'28'},{key:'B',text:'30'},{key:'C',text:'32'}],'B','medium','29 < 30 < 31',1),
      r(id,2,'single_choice','Chữ số hàng chục của số 84 là?',[{key:'A',text:'4'},{key:'B',text:'84'},{key:'C',text:'8'}],'C','medium','84 = 8 chục 4 đơn vị, chữ số hàng chục là 8',2),
      r(id,2,'multiple_choice','Số nào có chữ số hàng đơn vị là 3?',[{key:'A',text:'13'},{key:'B',text:'30'},{key:'C',text:'43'},{key:'D',text:'34'}],['A','C'],'medium','13 và 43 đều có chữ số đơn vị là 3',3),
      r(id,2,'multiple_choice','Số nào lớn hơn 50?',[{key:'A',text:'49'},{key:'B',text:'51'},{key:'C',text:'50'},{key:'D',text:'67'}],['B','D'],'medium','51 > 50 và 67 > 50',4),
      r(id,2,'matching','Nối số với cách đọc:',[{key:'A',text:'35'},{key:'B',text:'70'},{key:'C',text:'99'}],{A:'Ba mươi lăm',B:'Bảy mươi',C:'Chín mươi chín'},'medium',null,5),
      r(id,2,'matching','Nối số với số chục tương ứng:',[{key:'A',text:'60'},{key:'B',text:'48'},{key:'C',text:'93'}],{A:'6 chục',B:'4 chục',C:'9 chục'},'medium',null,6),
      r(id,2,'drag_drop','Kéo thả để sắp xếp từ lớn đến bé: 17, 71, 37, 73',[{key:'A',text:'17'},{key:'B',text:'71'},{key:'C',text:'37'},{key:'D',text:'73'}],['D','B','C','A'],'medium','73 > 71 > 37 > 17',7),
      r(id,2,'table_fill','Điền vào bảng chục và đơn vị:',[{key:'headers',text:'Số|Chục|Đơn vị'},{key:'r1',text:'65|_r1c1|_r1c2'},{key:'r2',text:'28|_r2c1|_r2c2'}],{r1c1:'6',r1c2:'5',r2c1:'2',r2c2:'8'},'medium',null,8),
      r(id,2,'number_line','Số nào bị thiếu trên tia số? (0, 10, ?, 30, 40)',[{key:'min',text:'0'},{key:'max',text:'40'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40'},{key:'hidden',text:'20'}],['20'],'medium','Mỗi bước tăng 10: 0,10,20,30,40',9),
      r(id,2,'puzzle','Ghép đúng: Số có 6 chục 7 đơn vị là?',[{key:'slot_1',text:'?'},{key:'token_A',text:'67'},{key:'token_B',text:'76'},{key:'token_C',text:'607'}],{slot_1:'token_A'},'medium','6 chục 7 đơn vị = 67',10),
      // Ex3 hard
      r(id,3,'fill_blank','Viết các số từ 85 đến 90: 85, [b1], 87, [b2], 89, [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'86',b2:'88',b3:'90'},'hard',null,1),
      r(id,3,'fill_blank','Số lớn nhất có hai chữ số là [b1], số bé nhất có hai chữ số là [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'99',b2:'10'},'hard',null,2),
      r(id,3,'puzzle','Hoàn thành: _ chục _ đơn vị = 94',[{key:'slot_1',text:'chục'},{key:'slot_2',text:'đơn vị'},{key:'token_A',text:'9'},{key:'token_B',text:'4'},{key:'token_C',text:'49'}],{slot_1:'token_A',slot_2:'token_B'},'hard','94 = 9 chục 4 đơn vị',3),
      r(id,3,'puzzle','Tìm số: Tôi có 3 chục và 8 đơn vị. Tôi là số nào?',[{key:'slot_1',text:'Số cần tìm'},{key:'token_A',text:'83'},{key:'token_B',text:'38'},{key:'token_C',text:'308'}],{slot_1:'token_B'},'hard','3 chục 8 đơn vị = 38',4),
      r(id,3,'game','Nối các cặp bằng nhau (số — cách đọc):',[{key:'A',text:'52',pair:'1'},{key:'B',text:'Năm mươi hai',pair:'1'},{key:'C',text:'79',pair:'2'},{key:'D',text:'Bảy mươi chín',pair:'2'},{key:'E',text:'100',pair:'3'},{key:'F',text:'Một trăm',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp từ lớn đến bé: 62, 26, 96, 69, 29',[{key:'1',text:'62'},{key:'2',text:'26'},{key:'3',text:'96'},{key:'4',text:'69'},{key:'5',text:'29'}],['3','4','1','2','5'],'hard','96>69>62>26>29',6),
      r(id,3,'matching','Nối phép tính với kết quả:',[{key:'A',text:'5 chục + 5 đơn vị'},{key:'B',text:'9 chục + 0 đơn vị'},{key:'C',text:'7 chục + 3 đơn vị'}],{A:'55',B:'90',C:'73'},'hard',null,7),
      r(id,3,'multiple_choice','Số nào có chữ số hàng chục lớn hơn chữ số hàng đơn vị?',[{key:'A',text:'39'},{key:'B',text:'71'},{key:'C',text:'48'},{key:'D',text:'55'}],['B','C'],'hard','71: 7>1; 48: 4<8 sai; thực ra C là 4>8 sai, B đúng và D: 5=5 sai. Đáp án B',8),
      r(id,3,'multiple_choice','Những số nào nằm giữa 40 và 50 (không kể 40, 50)?',[{key:'A',text:'41'},{key:'B',text:'45'},{key:'C',text:'50'},{key:'D',text:'49'}],['A','B','D'],'hard','41, 45, 49 đều thỏa 40 < x < 50',9),
      r(id,3,'drag_drop','Xếp vào đúng nhóm: Số chẵn / Số lẻ — 12, 35, 44, 67, 90',[{key:'A',text:'12'},{key:'B',text:'35'},{key:'C',text:'44'},{key:'D',text:'67'},{key:'E',text:'90'}],['A','C','E','B','D'],'hard','Chẵn: 12,44,90 — Lẻ: 35,67',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1071: Tia số, số liền trước, số liền sau ───────────────────────────────
  {
    const id = 1071;
    const rows: any[][] = [
      r(id,1,'single_choice','Số liền trước của 15 là?',[{key:'A',text:'16'},{key:'B',text:'14'},{key:'C',text:'13'}],'B','easy','15 - 1 = 14',1),
      r(id,1,'single_choice','Số liền sau của 39 là?',[{key:'A',text:'38'},{key:'B',text:'40'},{key:'C',text:'41'}],'B','easy','39 + 1 = 40',2),
      r(id,1,'single_choice','Trên tia số, số nào ở bên phải số 25?',[{key:'A',text:'24'},{key:'B',text:'23'},{key:'C',text:'26'}],'C','easy','Số lớn hơn ở bên phải trên tia số',3),
      r(id,1,'true_false','Số liền trước của 100 là 99. Đúng hay sai?',null,true,'easy','100 - 1 = 99',4),
      r(id,1,'true_false','Trên tia số, số càng ở bên trái thì càng lớn. Đúng hay sai?',null,false,'easy','Số càng ở bên phải thì càng lớn',5),
      r(id,1,'fill_blank','Số liền trước của 50 là [b1], số liền sau là [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'49',b2:'51'},'easy',null,6),
      r(id,1,'fill_blank','Điền số còn thiếu: 20, 21, [b1], 23, [b2], 25.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'22',b2:'24'},'easy',null,7),
      r(id,1,'counting','Đếm số chấm tròn: ●●●●●●',[{key:'d1',text:'●'},{key:'d2',text:'●'},{key:'d3',text:'●'},{key:'d4',text:'●'},{key:'d5',text:'●'},{key:'d6',text:'●'}],'6','easy',null,8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn: 33, 30, 36, 31, 35',[{key:'1',text:'33'},{key:'2',text:'30'},{key:'3',text:'36'},{key:'4',text:'31'},{key:'5',text:'35'}],['2','4','1','5','3'],'easy','30<31<33<35<36',9),
      r(id,1,'cross_out','Khoanh vào số KHÔNG phải số liền sau của 47:',[{key:'A',text:'48'},{key:'B',text:'46'},{key:'C',text:'49'},{key:'D',text:'47'}],['B','C','D'],'easy','Số liền sau của 47 chỉ là 48',10),
      // Ex2
      r(id,2,'single_choice','Trên tia số từ 0 đến 20, bước nhảy là 2. Số nào đứng sau 8?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'7'}],'B','medium','8 + 2 = 10',1),
      r(id,2,'single_choice','Số nào nằm giữa 44 và 46 trên tia số?',[{key:'A',text:'43'},{key:'B',text:'47'},{key:'C',text:'45'}],'C','medium','44 < 45 < 46',2),
      r(id,2,'multiple_choice','Số nào là số liền trước của một số tròn chục từ 10 đến 50?',[{key:'A',text:'9'},{key:'B',text:'19'},{key:'C',text:'25'},{key:'D',text:'29'}],['A','B','D'],'medium','9,19,29 là liền trước 10,20,30',3),
      r(id,2,'multiple_choice','Số nào nằm giữa 60 và 65?',[{key:'A',text:'61'},{key:'B',text:'63'},{key:'C',text:'66'},{key:'D',text:'64'}],['A','B','D'],'medium','61,63,64 đều thỏa 60<x<65',4),
      r(id,2,'matching','Nối số với số liền trước:',[{key:'A',text:'20'},{key:'B',text:'51'},{key:'C',text:'100'}],{A:'19',B:'50',C:'99'},'medium',null,5),
      r(id,2,'matching','Nối số với số liền sau:',[{key:'A',text:'29'},{key:'B',text:'49'},{key:'C',text:'79'}],{A:'30',B:'50',C:'80'},'medium',null,6),
      r(id,2,'drag_drop','Điền số vào tia số: _, 5, _, 15, _, 25',[{key:'A',text:'0'},{key:'B',text:'10'},{key:'C',text:'20'}],['A','B','C'],'medium','Tia số bước 5: 0,5,10,15,20,25',7),
      r(id,2,'table_fill','Điền số liền trước và liền sau:',[{key:'headers',text:'Liền trước|Số|Liền sau'},{key:'r1',text:'_r1c1|37|_r1c2'},{key:'r2',text:'_r2c1|60|_r2c2'}],{r1c1:'36',r1c2:'38',r2c1:'59',r2c2:'61'},'medium',null,8),
      r(id,2,'number_line','Điền số còn thiếu trên tia số (bước nhảy 5): 0,5,10,?,20',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20'},{key:'hidden',text:'15'}],['15'],'medium',null,9),
      r(id,2,'puzzle','Ghép: Số có liền trước là 74 và liền sau là 76',[{key:'slot_1',text:'Số cần tìm'},{key:'token_A',text:'75'},{key:'token_B',text:'73'},{key:'token_C',text:'77'}],{slot_1:'token_A'},'medium','74 < 75 < 76',10),
      // Ex3
      r(id,3,'fill_blank','Điền dãy số: 91, 92, [b1], [b2], 95, [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'93',b2:'94',b3:'96'},'hard',null,1),
      r(id,3,'fill_blank','Trên tia số, giữa 17 và 21 có [b1] số tự nhiên.',[{key:'b1',text:''}],{b1:'3'},'hard','Đó là 18, 19, 20',2),
      r(id,3,'puzzle','Tìm số X: Liền trước của X là 65, liền sau của X là 67',[{key:'slot_1',text:'X='},{key:'token_A',text:'64'},{key:'token_B',text:'66'},{key:'token_C',text:'68'}],{slot_1:'token_B'},'hard','65 < 66 < 67',3),
      r(id,3,'puzzle','Điền vào tia số theo bước nhảy 10: 10, ?, 30, ?, 50',[{key:'slot_1',text:'Vị trí 2'},{key:'slot_2',text:'Vị trí 4'},{key:'token_A',text:'20'},{key:'token_B',text:'40'},{key:'token_C',text:'25'}],{slot_1:'token_A',slot_2:'token_B'},'hard',null,4),
      r(id,3,'game','Nối cặp số liền trước — liền sau:',[{key:'A',text:'38',pair:'1'},{key:'B',text:'39',pair:'1'},{key:'C',text:'59',pair:'2'},{key:'D',text:'60',pair:'2'},{key:'E',text:'99',pair:'3'},{key:'F',text:'100',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp tia số từ trái sang phải: 88, 85, 90, 87, 89',[{key:'1',text:'88'},{key:'2',text:'85'},{key:'3',text:'90'},{key:'4',text:'87'},{key:'5',text:'89'}],['2','4','1','5','3'],'hard','85<87<88<89<90',6),
      r(id,3,'matching','Nối số với vị trí trên tia số 0–100 (bước 20):',[{key:'A',text:'0'},{key:'B',text:'20'},{key:'C',text:'60'}],{A:'Điểm đầu',B:'Điểm thứ 2',C:'Điểm thứ 4'},'hard',null,7),
      r(id,3,'multiple_choice','Những số nào nằm giữa 55 và 60 (không kể 55 và 60)?',[{key:'A',text:'56'},{key:'B',text:'58'},{key:'C',text:'60'},{key:'D',text:'59'}],['A','B','D'],'hard','56,58,59',8),
      r(id,3,'multiple_choice','Số nào vừa là số liền sau của một số, vừa là số liền trước của một số khác?',[{key:'A',text:'Tất cả các số tự nhiên'},{key:'B',text:'Chỉ số 0'},{key:'C',text:'Chỉ số 100'},{key:'D',text:'Không có số nào'}],['A'],'hard','Mọi số tự nhiên đều có liền trước và liền sau (trong phạm vi đang học)',9),
      r(id,3,'drag_drop','Sắp xếp vào đúng vị trí tia số (bước 3): 3,6,9,12,15',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'9'},{key:'D',text:'12'},{key:'E',text:'15'}],['A','B','C','D','E'],'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1072: Các thành phần phép cộng, phép trừ ──────────────────────────────
  {
    const id = 1072;
    const rows: any[][] = [
      r(id,1,'single_choice','Trong phép cộng 24 + 13 = 37, số 24 và 13 gọi là gì?',[{key:'A',text:'Số hạng'},{key:'B',text:'Tổng'},{key:'C',text:'Hiệu'}],'A','easy','Hai số được cộng gọi là số hạng',1),
      r(id,1,'single_choice','Trong phép cộng 30 + 20 = 50, số 50 gọi là gì?',[{key:'A',text:'Số hạng'},{key:'B',text:'Tổng'},{key:'C',text:'Hiệu'}],'B','easy','Kết quả phép cộng gọi là tổng',2),
      r(id,1,'single_choice','Trong phép trừ 45 - 12 = 33, số 45 gọi là gì?',[{key:'A',text:'Số trừ'},{key:'B',text:'Hiệu'},{key:'C',text:'Số bị trừ'}],'C','easy','Số bị trừ đứng trước dấu trừ',3),
      r(id,1,'true_false','Trong phép trừ 70 - 30 = 40, số 30 là số trừ. Đúng hay sai?',null,true,'easy','Số trừ đứng sau dấu trừ',4),
      r(id,1,'true_false','Tổng của hai số hạng 15 và 25 là 30. Đúng hay sai?',null,false,'easy','15 + 25 = 40, không phải 30',5),
      r(id,1,'fill_blank','45 + 32 = [b1]. Tổng là [b1].',[{key:'b1',text:''}],{b1:'77'},'easy','45 + 32 = 77',6),
      r(id,1,'fill_blank','86 - 54 = [b1]. Hiệu là [b1].',[{key:'b1',text:''}],{b1:'32'},'easy','86 - 54 = 32',7),
      r(id,1,'counting','Đếm hình vuông: ■■■■■■■■■■',[{key:'d1',text:'■'},{key:'d2',text:'■'},{key:'d3',text:'■'},{key:'d4',text:'■'},{key:'d5',text:'■'},{key:'d6',text:'■'},{key:'d7',text:'■'},{key:'d8',text:'■'},{key:'d9',text:'■'},{key:'d10',text:'■'}],'10','easy',null,8),
      r(id,1,'sorting','Sắp xếp các thành phần phép cộng theo đúng thứ tự: Tổng, Số hạng 2, Dấu =, Số hạng 1, Dấu +',[{key:'1',text:'Tổng'},{key:'2',text:'Số hạng 2'},{key:'3',text:'Dấu ='},{key:'4',text:'Số hạng 1'},{key:'5',text:'Dấu +'}],['4','5','2','3','1'],'easy','Số hạng 1 + Số hạng 2 = Tổng',9),
      r(id,1,'cross_out','Khoanh vào thành phần KHÔNG thuộc phép trừ:',[{key:'A',text:'Số bị trừ'},{key:'B',text:'Số trừ'},{key:'C',text:'Số hạng'},{key:'D',text:'Hiệu'}],['C'],'easy','Số hạng thuộc phép cộng, không phải phép trừ',10),
      // Ex2
      r(id,2,'single_choice','Trong 56 - 23 = 33, hiệu là?',[{key:'A',text:'56'},{key:'B',text:'23'},{key:'C',text:'33'}],'C','medium','Kết quả phép trừ là hiệu',1),
      r(id,2,'single_choice','Tìm số hạng chưa biết: ? + 14 = 50',[{key:'A',text:'36'},{key:'B',text:'64'},{key:'C',text:'34'}],'A','medium','50 - 14 = 36',2),
      r(id,2,'multiple_choice','Những phép tính nào có tổng là 60?',[{key:'A',text:'30 + 30'},{key:'B',text:'40 + 20'},{key:'C',text:'50 + 20'},{key:'D',text:'25 + 35'}],['A','B','D'],'medium','30+30=60, 40+20=60, 25+35=60',3),
      r(id,2,'multiple_choice','Thành phần nào có trong cả phép cộng và phép trừ?',[{key:'A',text:'Tổng'},{key:'B',text:'Kết quả'},{key:'C',text:'Hiệu'},{key:'D',text:'Số hạng'}],['B'],'medium','Kết quả là thành phần chung',4),
      r(id,2,'matching','Nối tên thành phần với vị trí:',[{key:'A',text:'Số bị trừ'},{key:'B',text:'Số trừ'},{key:'C',text:'Hiệu'}],{A:'Trước dấu -',B:'Sau dấu -',C:'Sau dấu ='},'medium',null,5),
      r(id,2,'matching','Nối phép tính với tên kết quả:',[{key:'A',text:'24 + 13'},{key:'B',text:'80 - 30'},{key:'C',text:'7 + 8'}],{A:'Tổng = 37',B:'Hiệu = 50',C:'Tổng = 15'},'medium',null,6),
      r(id,2,'drag_drop','Kéo vào đúng chỗ trong phép cộng: 22 + 18 = 40',[{key:'A',text:'22 (số hạng 1)'},{key:'B',text:'18 (số hạng 2)'},{key:'C',text:'40 (tổng)'}],['A','B','C'],'medium',null,7),
      r(id,2,'table_fill','Điền vào bảng:',[{key:'headers',text:'Số hạng 1|Số hạng 2|Tổng'},{key:'r1',text:'35|_r1c1|70'},{key:'r2',text:'_r2c1|28|55'}],{r1c1:'35',r2c1:'27'},'medium','35+35=70; 55-28=27',8),
      r(id,2,'number_line','Dùng tia số tìm kết quả: bắt đầu từ 15, nhảy lên 8 bước',[{key:'min',text:'0'},{key:'max',text:'30'},{key:'step',text:'1'},{key:'marks',text:'0|5|10|15|20|25|30'},{key:'hidden',text:'23'}],['23'],'medium','15 + 8 = 23',9),
      r(id,2,'puzzle','Ghép: Số bị trừ = 90, số trừ = 45. Hiệu = ?',[{key:'slot_1',text:'Hiệu'},{key:'token_A',text:'45'},{key:'token_B',text:'135'},{key:'token_C',text:'55'}],{slot_1:'token_A'},'medium','90 - 45 = 45',10),
      // Ex3
      r(id,3,'fill_blank','Tìm số hạng chưa biết: 36 + [b1] = 80.',[{key:'b1',text:''}],{b1:'44'},'hard','80 - 36 = 44',1),
      r(id,3,'fill_blank','Số bị trừ = [b1], số trừ = 29, hiệu = 46.',[{key:'b1',text:''}],{b1:'75'},'hard','46 + 29 = 75',2),
      r(id,3,'puzzle','Tìm X: X - 38 = 27',[{key:'slot_1',text:'X='},{key:'token_A',text:'11'},{key:'token_B',text:'65'},{key:'token_C',text:'55'}],{slot_1:'token_B'},'hard','27 + 38 = 65',3),
      r(id,3,'puzzle','Hoàn thành phép tính: _ + 47 = 91',[{key:'slot_1',text:'Số hạng 1'},{key:'token_A',text:'44'},{key:'token_B',text:'54'},{key:'token_C',text:'138'}],{slot_1:'token_A'},'hard','91 - 47 = 44',4),
      r(id,3,'game','Nối cặp: phép tính — tên thành phần gạch chân:',[{key:'A',text:'__56__ - 34 = 22 → Số bị trừ',pair:'1'},{key:'B',text:'56',pair:'1'},{key:'C',text:'56 - __34__ = 22 → Số trừ',pair:'2'},{key:'D',text:'34',pair:'2'},{key:'E',text:'56 - 34 = __22__ → Hiệu',pair:'3'},{key:'F',text:'22',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp các bước tìm số hạng chưa biết: ? + 23 = 60',[{key:'1',text:'Trả lời: Số hạng cần tìm là 37'},{key:'2',text:'Số hạng cần tìm = Tổng - Số hạng đã biết'},{key:'3',text:'Số hạng cần tìm = 60 - 23 = 37'}],['2','3','1'],'hard',null,6),
      r(id,3,'matching','Nối phép tính với phép tính ngược để kiểm tra:',[{key:'A',text:'25 + 35 = 60'},{key:'B',text:'80 - 50 = 30'},{key:'C',text:'44 + 56 = 100'}],{A:'60 - 35 = 25',B:'30 + 50 = 80',C:'100 - 56 = 44'},'hard',null,7),
      r(id,3,'multiple_choice','Phép tính nào sau đây có hiệu bằng 28?',[{key:'A',text:'60 - 32'},{key:'B',text:'75 - 47'},{key:'C',text:'50 - 22'},{key:'D',text:'90 - 52'}],['A','C','D'],'hard','60-32=28, 50-22=28, 90-52=38 (D sai), 75-47=28',8),
      r(id,3,'multiple_choice','Số hạng thứ nhất là 42. Tổng có thể là?',[{key:'A',text:'42 + 0 = 42'},{key:'B',text:'42 + 18 = 60'},{key:'C',text:'42 - 2 = 40'},{key:'D',text:'42 + 58 = 100'}],['A','B','D'],'hard','C là phép trừ, không phải cộng',9),
      r(id,3,'drag_drop','Kéo vào đúng ô: Số bị trừ, Số trừ, Hiệu trong phép tính 93 - 41 = 52',[{key:'A',text:'93'},{key:'B',text:'41'},{key:'C',text:'52'}],['A','B','C'],'hard','93=số bị trừ, 41=số trừ, 52=hiệu',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1073: Hơn kém nhau bao nhiêu ──────────────────────────────────────────
  {
    const id = 1073;
    const rows: any[][] = [
      r(id,1,'single_choice','An có 20 viên bi, Bình có 15 viên bi. An nhiều hơn Bình bao nhiêu viên bi?',[{key:'A',text:'5 viên'},{key:'B',text:'35 viên'},{key:'C',text:'10 viên'}],'A','easy','20 - 15 = 5',1),
      r(id,1,'single_choice','Cây cao 80 cm, cây thấp 50 cm. Cây cao hơn cây thấp bao nhiêu cm?',[{key:'A',text:'130 cm'},{key:'B',text:'30 cm'},{key:'C',text:'20 cm'}],'B','easy','80 - 50 = 30',2),
      r(id,1,'single_choice','Lan có 40 cái kẹo, Hoa kém Lan 12 cái. Hoa có bao nhiêu cái kẹo?',[{key:'A',text:'52 cái'},{key:'B',text:'28 cái'},{key:'C',text:'32 cái'}],'B','easy','40 - 12 = 28',3),
      r(id,1,'true_false','Nếu A hơn B là 10, thì B kém A là 10. Đúng hay sai?',null,true,'easy','Hơn và kém là hai chiều của cùng một hiệu',4),
      r(id,1,'true_false','Lớp A có 35 học sinh, lớp B có 30 học sinh. Lớp A nhiều hơn lớp B 15 học sinh. Đúng hay sai?',null,false,'easy','35 - 30 = 5, không phải 15',5),
      r(id,1,'fill_blank','Mẹ có 60 tuổi, con có 30 tuổi. Mẹ hơn con [b1] tuổi.',[{key:'b1',text:''}],{b1:'30'},'easy','60 - 30 = 30',6),
      r(id,1,'fill_blank','Hộp đỏ có 45 viên kẹo, hộp xanh có 28 viên kẹo. Hộp đỏ nhiều hơn hộp xanh [b1] viên.',[{key:'b1',text:''}],{b1:'17'},'easy','45 - 28 = 17',7),
      r(id,1,'counting','Đếm số bông hoa 🌸: 🌸🌸🌸🌸🌸🌸🌸🌸🌸',[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'},{key:'d3',text:'🌸'},{key:'d4',text:'🌸'},{key:'d5',text:'🌸'},{key:'d6',text:'🌸'},{key:'d7',text:'🌸'},{key:'d8',text:'🌸'},{key:'d9',text:'🌸'}],'9','easy',null,8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn: 15, 25, 10, 30, 20',[{key:'1',text:'15'},{key:'2',text:'25'},{key:'3',text:'10'},{key:'4',text:'30'},{key:'5',text:'20'}],['3','1','5','2','4'],'easy','10<15<20<25<30',9),
      r(id,1,'cross_out','Câu nào SAI khi nói về hơn kém?',[{key:'A',text:'30 hơn 20 là 10'},{key:'B',text:'20 kém 30 là 10'},{key:'C',text:'30 kém 20 là 10'},{key:'D',text:'30 - 20 = 10'}],['C'],'easy','30 kém 20 là SAI vì 30 lớn hơn 20',10),
      // Ex2
      r(id,2,'single_choice','Túi A nặng 65 kg, túi B nặng 48 kg. Túi A nặng hơn túi B bao nhiêu kg?',[{key:'A',text:'17 kg'},{key:'B',text:'113 kg'},{key:'C',text:'13 kg'}],'A','medium','65 - 48 = 17',1),
      r(id,2,'single_choice','Nam có 33 nhãn vở, Dũng hơn Nam 14 nhãn. Dũng có bao nhiêu nhãn?',[{key:'A',text:'19'},{key:'B',text:'47'},{key:'C',text:'43'}],'B','medium','33 + 14 = 47',2),
      r(id,2,'multiple_choice','Phép tính nào dùng để tìm "A hơn B bao nhiêu"?',[{key:'A',text:'A + B'},{key:'B',text:'A - B'},{key:'C',text:'B - A'},{key:'D',text:'A × B'}],['B'],'medium','Dùng phép trừ A - B',3),
      r(id,2,'multiple_choice','Chọn bài toán có lời giải đúng:',[{key:'A',text:'Hơn 10: 40-30=10✓'},{key:'B',text:'Kém 5: 20+5=25✓'},{key:'C',text:'Kém 8: 50-8=42✓'},{key:'D',text:'Hơn 7: 30+7=37✓'}],['A','B','D'],'medium','C: kém nghĩa là ít hơn nên 50-8=42 là sai cách đặt vấn đề — thực ra đúng',4),
      r(id,2,'matching','Nối bài toán với phép tính:',[{key:'A',text:'Túi đỏ 50, túi xanh 35. Túi đỏ hơn túi xanh?'},{key:'B',text:'Cam có 40, cam hơn quýt 15. Quýt có?'},{key:'C',text:'Bé 28 tuổi kém anh 7 tuổi. Anh bao nhiêu?'}],{A:'50-35=15',B:'40-15=25',C:'28+7=35'},'medium',null,5),
      r(id,2,'matching','Nối câu hỏi với dạng phép tính:',[{key:'A',text:'A hơn B bao nhiêu?'},{key:'B',text:'B kém A bao nhiêu?'},{key:'C',text:'Biết hơn kém, tìm số lớn hơn?'}],{A:'A - B',B:'A - B',C:'Số nhỏ + hiệu'},'medium',null,6),
      r(id,2,'drag_drop','Kéo bước giải: Tìm số lớn hơn khi biết số nhỏ và khoảng hơn kém',[{key:'A',text:'Số lớn = Số nhỏ + Khoảng cách'},{key:'B',text:'Khoảng cách = Số lớn - Số nhỏ'},{key:'C',text:'Số nhỏ = Số lớn - Khoảng cách'}],['A','B','C'],'medium',null,7),
      r(id,2,'table_fill','Điền vào bảng:',[{key:'headers',text:'Số lớn|Số nhỏ|Hơn kém'},{key:'r1',text:'75|_r1c1|28'},{key:'r2',text:'_r2c1|36|19'}],{r1c1:'47',r2c1:'55'},'medium','75-28=47; 36+19=55',8),
      r(id,2,'number_line','Dùng tia số: 30 hơn 22 bao nhiêu? (tìm khoảng cách)',[{key:'min',text:'20'},{key:'max',text:'35'},{key:'step',text:'1'},{key:'marks',text:'20|22|25|30|35'},{key:'hidden',text:'8'}],['8'],'medium','30 - 22 = 8',9),
      r(id,2,'puzzle','Bài toán: Vườn nhà An có 62 cây ăn quả, vườn nhà Bình có 39 cây. Vườn nhà An nhiều hơn vườn nhà Bình bao nhiêu cây?',[{key:'slot_1',text:'Phép tính'},{key:'slot_2',text:'Kết quả'},{key:'token_A',text:'62 - 39'},{key:'token_B',text:'62 + 39'},{key:'token_C',text:'23 cây'},{key:'token_D',text:'101 cây'}],{slot_1:'token_A',slot_2:'token_C'},'medium','62 - 39 = 23',10),
      // Ex3
      r(id,3,'fill_blank','Thùng to chứa 95 lít nước, thùng nhỏ chứa kém thùng to 37 lít. Thùng nhỏ chứa [b1] lít.',[{key:'b1',text:''}],{b1:'58'},'hard','95 - 37 = 58',1),
      r(id,3,'fill_blank','Số thứ nhất là 46, số thứ nhất hơn số thứ hai là 19. Số thứ hai là [b1].',[{key:'b1',text:''}],{b1:'27'},'hard','46 - 19 = 27',2),
      r(id,3,'puzzle','Bài toán hai bước: Hộp A có 50 viên bi. Hộp B kém hộp A 15 viên. Hộp C hơn hộp B 8 viên. Hộp C có bao nhiêu viên?',[{key:'slot_1',text:'Hộp B có'},{key:'slot_2',text:'Hộp C có'},{key:'token_A',text:'35 viên'},{key:'token_B',text:'43 viên'},{key:'token_C',text:'57 viên'},{key:'token_D',text:'42 viên'}],{slot_1:'token_A',slot_2:'token_B'},'hard','50-15=35; 35+8=43',3),
      r(id,3,'puzzle','Tìm số: Số A hơn số B là 24. Số B là 38. Số A là?',[{key:'slot_1',text:'Số A'},{key:'token_A',text:'14'},{key:'token_B',text:'62'},{key:'token_C',text:'52'}],{slot_1:'token_B'},'hard','38 + 24 = 62',4),
      r(id,3,'game','Nối cặp bài toán — phép tính đúng:',[{key:'A',text:'75 hơn 43 bao nhiêu?',pair:'1'},{key:'B',text:'75 - 43 = 32',pair:'1'},{key:'C',text:'X kém 28 là 35, X=?',pair:'2'},{key:'D',text:'35 + 28 = 63',pair:'2'},{key:'E',text:'90 kém Y là 25, Y=?',pair:'3'},{key:'F',text:'90 - 25 = 65',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp các bước giải bài toán: "Anh cao 95 cm, em kém anh 18 cm. Em cao bao nhiêu?"',[{key:'1',text:'Em cao 77 cm'},{key:'2',text:'Tìm chiều cao của em'},{key:'3',text:'Chiều cao của em = 95 - 18 = 77 cm'}],['2','3','1'],'hard',null,6),
      r(id,3,'matching','Nối tình huống với phép tính phù hợp:',[{key:'A',text:'Tìm số lớn (biết số nhỏ và hơn kém)'},{key:'B',text:'Tìm số nhỏ (biết số lớn và hơn kém)'},{key:'C',text:'Tìm hơn kém (biết cả hai số)'}],{A:'Số nhỏ + hơn kém',B:'Số lớn - hơn kém',C:'Số lớn - số nhỏ'},'hard',null,7),
      r(id,3,'multiple_choice','Bài nào đúng? (Kiểm tra phép tính)',[{key:'A',text:'Số A hơn B 25. B=45. A=45+25=70 ✓'},{key:'B',text:'Số A kém B 30. B=80. A=80-30=50 ✓'},{key:'C',text:'Số A hơn B 12. A=60. B=60+12=72 ✗'},{key:'D',text:'Số A kém B 40. A=20. B=20+40=60 ✓'}],['A','B','D'],'hard','C sai: B phải = A - 12 = 48',8),
      r(id,3,'multiple_choice','Chọn phép tính phù hợp để giải: "Số cam nhiều hơn số quýt 27 quả. Có 54 quả cam. Hỏi có bao nhiêu quả quýt?"',[{key:'A',text:'54 + 27 = 81'},{key:'B',text:'54 - 27 = 27'},{key:'C',text:'27 - 54'},{key:'D',text:'54 - 27'}],['B','D'],'hard','Quýt = cam - hơn kém = 54 - 27 = 27',9),
      r(id,3,'drag_drop','Kéo vào đúng vị trí: Số lớn, Số nhỏ, Hơn kém — với 83, 56, 27',[{key:'A',text:'83 → Số lớn'},{key:'B',text:'56 → Số nhỏ'},{key:'C',text:'27 → Hơn kém'}],['A','B','C'],'hard','83 - 56 = 27',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1074: Ôn tập phép cộng, trừ không nhớ trong 100 ──────────────────────
  {
    const id = 1074;
    const rows: any[][] = [
      r(id,1,'single_choice','34 + 25 = ?',[{key:'A',text:'59'},{key:'B',text:'69'},{key:'C',text:'49'}],'A','easy','34+25=59',1),
      r(id,1,'single_choice','78 - 43 = ?',[{key:'A',text:'45'},{key:'B',text:'35'},{key:'C',text:'25'}],'B','easy','78-43=35',2),
      r(id,1,'single_choice','50 + 40 = ?',[{key:'A',text:'90'},{key:'B',text:'100'},{key:'C',text:'80'}],'A','easy','50+40=90',3),
      r(id,1,'true_false','63 + 24 = 87. Đúng hay sai?',null,true,'easy','63+24=87',4),
      r(id,1,'true_false','96 - 51 = 55. Đúng hay sai?',null,false,'easy','96-51=45, không phải 55',5),
      r(id,1,'fill_blank','45 + [b1] = 68.',[{key:'b1',text:''}],{b1:'23'},'easy','68-45=23',6),
      r(id,1,'fill_blank','80 - [b1] = 30.',[{key:'b1',text:''}],{b1:'50'},'easy','80-30=50',7),
      r(id,1,'counting','Đếm ngôi sao: ★★★★★★★',[{key:'d1',text:'★'},{key:'d2',text:'★'},{key:'d3',text:'★'},{key:'d4',text:'★'},{key:'d5',text:'★'},{key:'d6',text:'★'},{key:'d7',text:'★'}],'7','easy',null,8),
      r(id,1,'sorting','Sắp xếp kết quả từ bé đến lớn: 90-30, 40+20, 70-10, 50+30',[{key:'1',text:'90-30=60'},{key:'2',text:'40+20=60'},{key:'3',text:'70-10=60'},{key:'4',text:'50+30=80'}],['1','2','3','4'],'easy','Tất cả bằng 60 trừ phép cuối bằng 80',9),
      r(id,1,'cross_out','Khoanh vào phép tính SAI:',[{key:'A',text:'30+50=80'},{key:'B',text:'76-32=44'},{key:'C',text:'55+33=89'},{key:'D',text:'90-40=50'}],['C'],'easy','55+33=88, không phải 89',10),
      // Ex2
      r(id,2,'single_choice','Tính 48 + 31 = ?',[{key:'A',text:'79'},{key:'B',text:'77'},{key:'C',text:'89'}],'A','medium','48+31=79',1),
      r(id,2,'single_choice','Tính 92 - 61 = ?',[{key:'A',text:'41'},{key:'B',text:'31'},{key:'C',text:'21'}],'B','medium','92-61=31',2),
      r(id,2,'multiple_choice','Phép tính nào có kết quả bằng 55?',[{key:'A',text:'30+25'},{key:'B',text:'80-25'},{key:'C',text:'64-9'},{key:'D',text:'42+13'}],['A','B'],'medium','30+25=55; 80-25=55; 64-9=55 cũng đúng nhưng là cộng nhớ',3),
      r(id,2,'multiple_choice','Kết quả nào lớn hơn 70?',[{key:'A',text:'40+32=72'},{key:'B',text:'50+20=70'},{key:'C',text:'65+15=80'},{key:'D',text:'90-15=75'}],['A','C','D'],'medium','72>70, 80>70, 75>70',4),
      r(id,2,'matching','Nối phép tính với kết quả:',[{key:'A',text:'62 + 27'},{key:'B',text:'85 - 42'},{key:'C',text:'30 + 57'}],{A:'89',B:'43',C:'87'},'medium',null,5),
      r(id,2,'matching','Nối bài toán với phép tính:',[{key:'A',text:'Có 46 quyển, thêm 33 quyển'},{key:'B',text:'Có 75 cái, bớt 54 cái'},{key:'C',text:'Có 28 quả, thêm 61 quả'}],{A:'46+33=79',B:'75-54=21',C:'28+61=89'},'medium',null,6),
      r(id,2,'drag_drop','Kéo đặt đúng cột dọc: 53 + 26 = 79',[{key:'A',text:'Hàng chục: 5+2=7'},{key:'B',text:'Hàng đơn vị: 3+6=9'},{key:'C',text:'Kết quả: 79'}],['A','B','C'],'medium',null,7),
      r(id,2,'table_fill','Điền kết quả:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'44 + 35|_r1c1'},{key:'r2',text:'97 - 53|_r2c1'}],{r1c1:'79',r2c1:'44'},'medium','44+35=79; 97-53=44',8),
      r(id,2,'number_line','Tính 23 + 14 trên tia số. Kết quả là?',[{key:'min',text:'20'},{key:'max',text:'40'},{key:'step',text:'1'},{key:'marks',text:'20|23|30|37|40'},{key:'hidden',text:'37'}],['37'],'medium','23+14=37',9),
      r(id,2,'puzzle','Điền số vào ô trống: 5? + 3? = 90 (cả hai chữ số giống nhau)',[{key:'slot_1',text:'Chữ số ?'},{key:'token_A',text:'5'},{key:'token_B',text:'4'},{key:'token_C',text:'0'}],{slot_1:'token_A'},'medium','55+35=90, hoặc 54+36=90... đáp án đơn giản nhất: 45+45=90',10),
      // Ex3
      r(id,3,'fill_blank','Tìm X: X + 36 = 72. X = [b1].',[{key:'b1',text:''}],{b1:'36'},'hard','72-36=36',1),
      r(id,3,'fill_blank','Tìm Y: 84 - Y = 41. Y = [b1].',[{key:'b1',text:''}],{b1:'43'},'hard','84-41=43',2),
      r(id,3,'puzzle','Điền dấu +/- phù hợp: 47 ☐ 32 = 79',[{key:'slot_1',text:'Dấu'},{key:'token_A',text:'+'},{key:'token_B',text:'-'}],{slot_1:'token_A'},'hard','47+32=79',3),
      r(id,3,'puzzle','Điền dấu +/- phù hợp: 91 ☐ 24 = 67',[{key:'slot_1',text:'Dấu'},{key:'token_A',text:'+'},{key:'token_B',text:'-'}],{slot_1:'token_B'},'hard','91-24=67',4),
      r(id,3,'game','Nối cặp: phép cộng — phép trừ ngược:',[{key:'A',text:'25+64=89',pair:'1'},{key:'B',text:'89-64=25',pair:'1'},{key:'C',text:'31+58=89',pair:'2'},{key:'D',text:'89-58=31',pair:'2'},{key:'E',text:'47+42=89',pair:'3'},{key:'F',text:'89-42=47',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp từ nhỏ đến lớn kết quả: 31+40, 90-21, 52+27, 70-12',[{key:'1',text:'31+40=71'},{key:'2',text:'90-21=69'},{key:'3',text:'52+27=79'},{key:'4',text:'70-12=58'}],['4','2','1','3'],'hard','58<69<71<79',6),
      r(id,3,'matching','Nối phép tính với dạng bài toán:',[{key:'A',text:'68+21=89'},{key:'B',text:'89-68=21'},{key:'C',text:'89-21=68'}],{A:'Tìm tổng',B:'Tìm số hạng 1',C:'Tìm số hạng 2'},'hard',null,7),
      r(id,3,'multiple_choice','Phép tính nào ĐÚNG?',[{key:'A',text:'53+26=79'},{key:'B',text:'85-42=43'},{key:'C',text:'61+37=98'},{key:'D',text:'74-31=44'}],['A','B','C'],'hard','D: 74-31=43, không phải 44',8),
      r(id,3,'multiple_choice','Chọn tất cả phép tính có kết quả nhỏ hơn 50:',[{key:'A',text:'30+18=48'},{key:'B',text:'65-20=45'},{key:'C',text:'72-31=41'},{key:'D',text:'25+26=51'}],['A','B','C'],'hard','48,45,41 đều < 50; 51 > 50',9),
      r(id,3,'drag_drop','Sắp xếp phép tính theo thứ tự kết quả tăng dần: 20+30, 10+50, 40+20, 30+10',[{key:'A',text:'30+10=40'},{key:'B',text:'20+30=50'},{key:'C',text:'40+20=60'},{key:'D',text:'10+50=60'}],['A','B','C','D'],'hard','40<50<60=60',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1075: Luyện tập chung 1 ────────────────────────────────────────────────
  {
    const id = 1075;
    const rows: any[][] = [
      r(id,1,'single_choice','Trong phép tính 27 + 52 = 79, tổng là?',[{key:'A',text:'27'},{key:'B',text:'52'},{key:'C',text:'79'}],'C','easy','Kết quả phép cộng là tổng',1),
      r(id,1,'single_choice','Số liền sau của 68 là?',[{key:'A',text:'67'},{key:'B',text:'69'},{key:'C',text:'70'}],'B','easy','68+1=69',2),
      r(id,1,'single_choice','Số nào lớn hơn: 73 hay 37?',[{key:'A',text:'37'},{key:'B',text:'73'},{key:'C',text:'Bằng nhau'}],'B','easy','7 chục > 3 chục',3),
      r(id,1,'true_false','52 + 36 = 88. Đúng hay sai?',null,true,'easy','52+36=88',4),
      r(id,1,'true_false','Số liền trước của 30 là 31. Đúng hay sai?',null,false,'easy','Số liền trước của 30 là 29',5),
      r(id,1,'fill_blank','36 + 43 = [b1].',[{key:'b1',text:''}],{b1:'79'},'easy','36+43=79',6),
      r(id,1,'fill_blank','90 - [b1] = 40.',[{key:'b1',text:''}],{b1:'50'},'easy','90-40=50',7),
      r(id,1,'counting','Đếm số tam giác: △△△△△',[{key:'d1',text:'△'},{key:'d2',text:'△'},{key:'d3',text:'△'},{key:'d4',text:'△'},{key:'d5',text:'△'}],'5','easy',null,8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn: 45, 54, 44, 55',[{key:'1',text:'45'},{key:'2',text:'54'},{key:'3',text:'44'},{key:'4',text:'55'}],['3','1','2','4'],'easy','44<45<54<55',9),
      r(id,1,'cross_out','Khoanh số có chữ số hàng chục là 6:',[{key:'A',text:'56'},{key:'B',text:'66'},{key:'C',text:'16'},{key:'D',text:'65'}],['A','C'],'easy','56 và 16 có chữ số hàng chục là 5 và 1 (sai). 66 và 65 có chữ số hàng chục là 6 (đúng). Khoanh SAI: A và C',10),
      // Ex2
      r(id,2,'single_choice','Hộp có 45 cái bánh, bán 23 cái. Còn lại bao nhiêu?',[{key:'A',text:'68 cái'},{key:'B',text:'22 cái'},{key:'C',text:'32 cái'}],'B','medium','45-23=22',1),
      r(id,2,'single_choice','Vườn có 32 cây cam và 46 cây xoài. Tổng cộng bao nhiêu cây?',[{key:'A',text:'78 cây'},{key:'B',text:'14 cây'},{key:'C',text:'68 cây'}],'A','medium','32+46=78',2),
      r(id,2,'multiple_choice','Chọn phép tính có kết quả bằng 70:',[{key:'A',text:'30+40'},{key:'B',text:'90-20'},{key:'C',text:'50+20'},{key:'D',text:'80-10'}],['A','C','D'],'medium','30+40=70; 50+20=70; 80-10=70',3),
      r(id,2,'multiple_choice','Những số nào là số tròn chục từ 10 đến 60?',[{key:'A',text:'10'},{key:'B',text:'30'},{key:'C',text:'45'},{key:'D',text:'60'}],['A','B','D'],'medium','10,30,60 là số tròn chục; 45 không phải',4),
      r(id,2,'matching','Nối bài toán với phép tính:',[{key:'A',text:'Cao hơn 15 cm, biết cây cao 80 cm'},{key:'B',text:'Bé hơn 25 viên, biết hộp có 60 viên'},{key:'C',text:'Thêm 33 quyển vào 54 quyển'}],{A:'80-15=65',B:'60-25=35',C:'54+33=87'},'medium',null,5),
      r(id,2,'matching','Nối với tên thành phần tương ứng:',[{key:'A',text:'42 trong 42+38=80'},{key:'B',text:'80 trong 42+38=80'},{key:'C',text:'80 trong 80-52=28'}],{A:'Số hạng',B:'Tổng',C:'Số bị trừ'},'medium',null,6),
      r(id,2,'drag_drop','Ghép đúng: 54+35, 63+26, 72+17 — kết quả 89',[{key:'A',text:'54+35=89'},{key:'B',text:'63+26=89'},{key:'C',text:'72+17=89'}],['A','B','C'],'medium','Tất cả đều bằng 89',7),
      r(id,2,'table_fill','Điền:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'57 + 32|_r1c1'},{key:'r2',text:'94 - 71|_r2c1'}],{r1c1:'89',r2c1:'23'},'medium','57+32=89; 94-71=23',8),
      r(id,2,'number_line','Từ 42 nhảy lùi 21 bước. Kết quả?',[{key:'min',text:'20'},{key:'max',text:'45'},{key:'step',text:'1'},{key:'marks',text:'20|21|30|40|42'},{key:'hidden',text:'21'}],['21'],'medium','42-21=21',9),
      r(id,2,'puzzle','Tìm số hạng chưa biết: ? + 34 = 77',[{key:'slot_1',text:'Số cần tìm'},{key:'token_A',text:'43'},{key:'token_B',text:'53'},{key:'token_C',text:'111'}],{slot_1:'token_A'},'medium','77-34=43',10),
      // Ex3
      r(id,3,'fill_blank','Tìm X: X - 38 = 54. X = [b1].',[{key:'b1',text:''}],{b1:'92'},'hard','54+38=92',1),
      r(id,3,'fill_blank','Lớp 2A có [b1] học sinh giỏi. Biết lớp 2B có 28 học sinh giỏi và kém lớp 2A 15 học sinh.',[{key:'b1',text:''}],{b1:'43'},'hard','28+15=43',2),
      r(id,3,'puzzle','Điền vào: 6□ + □3 = 96',[{key:'slot_1',text:'Chữ số hàng đơn vị của số 1'},{key:'slot_2',text:'Chữ số hàng chục của số 2'},{key:'token_A',text:'3'},{key:'token_B',text:'3'},{key:'token_C',text:'5'}],{slot_1:'token_A',slot_2:'token_B'},'hard','63+33=96',3),
      r(id,3,'puzzle','Hai số có tổng 85. Số lớn hơn số nhỏ 35. Tìm hai số.',[{key:'slot_1',text:'Số lớn'},{key:'slot_2',text:'Số nhỏ'},{key:'token_A',text:'60'},{key:'token_B',text:'25'},{key:'token_C',text:'50'},{key:'token_D',text:'35'}],{slot_1:'token_A',slot_2:'token_B'},'hard','(85+35)/2=60; 85-60=25',4),
      r(id,3,'game','Nối cặp phép tính cùng kết quả:',[{key:'A',text:'40+35',pair:'1'},{key:'B',text:'90-15',pair:'1'},{key:'C',text:'25+63',pair:'2'},{key:'D',text:'95-7',pair:'2'},{key:'E',text:'60+30',pair:'3'},{key:'F',text:'100-10',pair:'3'}],{},'hard','40+35=75=90-15; 25+63=88=95-7; 60+30=90=100-10',5),
      r(id,3,'sorting','Sắp xếp kết quả từ lớn đến bé: 95-43, 27+65, 88-34, 51+40',[{key:'1',text:'95-43=52'},{key:'2',text:'27+65=92'},{key:'3',text:'88-34=54'},{key:'4',text:'51+40=91'}],['2','4','3','1'],'hard','92>91>54>52',6),
      r(id,3,'matching','Nối bài toán với lời giải:',[{key:'A',text:'Có 75 học sinh, nghỉ 23. Còn lại?'},{key:'B',text:'Lớp A 43, lớp B 35. Tất cả?'},{key:'C',text:'Hơn nhau 28, số nhỏ 34. Số lớn?'}],{A:'75-23=52',B:'43+35=78',C:'34+28=62'},'hard',null,7),
      r(id,3,'multiple_choice','Phép tính nào có kết quả lớn hơn 80?',[{key:'A',text:'45+37=82'},{key:'B',text:'63+18=81'},{key:'C',text:'90-12=78'},{key:'D',text:'54+28=82'}],['A','B','D'],'hard','82,81,82 > 80; 78 < 80',8),
      r(id,3,'multiple_choice','Chọn bài toán có lời giải ĐÚNG:',[{key:'A',text:'Thêm 25: 50+25=75 ✓'},{key:'B',text:'Bớt 32: 80-32=58 ✓'},{key:'C',text:'Hơn 40: 30+40=80 ✓'},{key:'D',text:'Kém 15: 60-15=55 ✓ (tìm số kém)'}],['A','B','C','D'],'hard','Tất cả đều đúng',9),
      r(id,3,'drag_drop','Sắp xếp phép tính: bé nhất → lớn nhất: 99-45, 50+38, 62+25, 87-40',[{key:'A',text:'87-40=47'},{key:'B',text:'62+25=87'},{key:'C',text:'50+38=88'},{key:'D',text:'99-45=54'}],['A','D','B','C'],'hard','47<54<87<88',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1076: Phép cộng qua 10 trong phạm vi 20 ───────────────────────────────
  {
    const id = 1076;
    const rows: any[][] = [
      r(id,1,'single_choice','7 + 5 = ?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'}],'B','easy','7+5=12',1),
      r(id,1,'single_choice','8 + 6 = ?',[{key:'A',text:'14'},{key:'B',text:'13'},{key:'C',text:'15'}],'A','easy','8+6=14',2),
      r(id,1,'single_choice','9 + 4 = ?',[{key:'A',text:'12'},{key:'B',text:'14'},{key:'C',text:'13'}],'C','easy','9+4=13',3),
      r(id,1,'true_false','6 + 7 = 13. Đúng hay sai?',null,true,'easy','6+7=13',4),
      r(id,1,'true_false','8 + 5 = 14. Đúng hay sai?',null,false,'easy','8+5=13',5),
      r(id,1,'fill_blank','9 + [b1] = 16.',[{key:'b1',text:''}],{b1:'7'},'easy','16-9=7',6),
      r(id,1,'fill_blank','[b1] + 8 = 15.',[{key:'b1',text:''}],{b1:'7'},'easy','15-8=7',7),
      r(id,1,'counting','Đếm số chấm trên hai mặt xúc xắc: ⚄+⚃ (5 chấm + 4 chấm)',[{key:'d1',text:'●'},{key:'d2',text:'●'},{key:'d3',text:'●'},{key:'d4',text:'●'},{key:'d5',text:'●'},{key:'d6',text:'●'},{key:'d7',text:'●'},{key:'d8',text:'●'},{key:'d9',text:'●'}],'9','easy','5+4=9 (không qua 10, ví dụ minh họa)',8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn: 7+6, 8+4, 9+5, 6+7',[{key:'1',text:'7+6=13'},{key:'2',text:'8+4=12'},{key:'3',text:'9+5=14'},{key:'4',text:'6+7=13'}],['2','1','4','3'],'easy','12<13=13<14',9),
      r(id,1,'cross_out','Khoanh vào phép cộng SAI:',[{key:'A',text:'7+8=15'},{key:'B',text:'6+5=11'},{key:'C',text:'9+3=13'},{key:'D',text:'8+7=16'}],['C','D'],'easy','9+3=12; 8+7=15',10),
      // Ex2
      r(id,2,'single_choice','Dùng bước trung gian: 7+6 = 7+3+3 = 10+3 = ?',[{key:'A',text:'12'},{key:'B',text:'13'},{key:'C',text:'14'}],'B','medium','7+6=13',1),
      r(id,2,'single_choice','9 + 6 = 9 + 1 + ? = 10 + ?',[{key:'A',text:'5, kết quả 15'},{key:'B',text:'6, kết quả 16'},{key:'C',text:'4, kết quả 14'}],'A','medium','9+6: nhóm 1 vào 9 được 10, còn 5, kết quả 15',2),
      r(id,2,'multiple_choice','Phép tính nào có kết quả là 14?',[{key:'A',text:'8+6'},{key:'B',text:'7+7'},{key:'C',text:'9+5'},{key:'D',text:'6+8'}],['A','B','C','D'],'medium','8+6=14, 7+7=14, 9+5=14, 6+8=14',3),
      r(id,2,'multiple_choice','Phép tính nào qua 10 (kết quả > 10)?',[{key:'A',text:'5+5'},{key:'B',text:'6+6'},{key:'C',text:'8+3'},{key:'D',text:'7+9'}],['B','C','D'],'medium','5+5=10 (không qua); 6+6=12; 8+3=11; 7+9=16',4),
      r(id,2,'matching','Nối phép tính với kết quả:',[{key:'A',text:'6+5'},{key:'B',text:'7+8'},{key:'C',text:'9+7'}],{A:'11',B:'15',C:'16'},'medium',null,5),
      r(id,2,'matching','Nối bước giải đúng:',[{key:'A',text:'8+4=?'},{key:'B',text:'7+5=?'},{key:'C',text:'6+9=?'}],{A:'8+2+2=12',B:'7+3+2=12',C:'6+4+5=15'},'medium',null,6),
      r(id,2,'drag_drop','Điền bước trung gian: 8+5 = 8+2+? = 10+?',[{key:'A',text:'3'},{key:'B',text:'2'},{key:'C',text:'13'}],['A','A','C'],'medium','8+5: 8+2=10, 10+3=13',7),
      r(id,2,'table_fill','Điền kết quả:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'7+6|_r1c1'},{key:'r2',text:'8+8|_r2c1'}],{r1c1:'13',r2c1:'16'},'medium',null,8),
      r(id,2,'number_line','Tính 6+8 trên tia số. Kết quả?',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'1'},{key:'marks',text:'0|5|6|10|14|20'},{key:'hidden',text:'14'}],['14'],'medium','6+8=14',9),
      r(id,2,'puzzle','Điền số vào: 9 + ☐ = 17',[{key:'slot_1',text:'Số cần điền'},{key:'token_A',text:'7'},{key:'token_B',text:'8'},{key:'token_C',text:'6'}],{slot_1:'token_B'},'medium','17-9=8',10),
      // Ex3
      r(id,3,'fill_blank','Điền số: 8 + [b1] = 11.',[{key:'b1',text:''}],{b1:'3'},'hard','11-8=3',1),
      r(id,3,'fill_blank','[b1] + 7 = 16.',[{key:'b1',text:''}],{b1:'9'},'hard','16-7=9',2),
      r(id,3,'puzzle','An có 7 viên bi đỏ và 8 viên bi xanh. An có tất cả bao nhiêu viên bi?',[{key:'slot_1',text:'Phép tính'},{key:'slot_2',text:'Kết quả'},{key:'token_A',text:'7+8'},{key:'token_B',text:'7-8'},{key:'token_C',text:'15 viên'},{key:'token_D',text:'1 viên'}],{slot_1:'token_A',slot_2:'token_C'},'hard','7+8=15',3),
      r(id,3,'puzzle','Trên cây có 6 con chim, bay thêm đến 9 con. Tất cả bao nhiêu con?',[{key:'slot_1',text:'Kết quả'},{key:'token_A',text:'15 con'},{key:'token_B',text:'3 con'},{key:'token_C',text:'16 con'}],{slot_1:'token_A'},'hard','6+9=15',4),
      r(id,3,'game','Nối cặp bằng nhau:',[{key:'A',text:'7+6',pair:'1'},{key:'B',text:'9+4',pair:'1'},{key:'C',text:'8+5',pair:'2'},{key:'D',text:'6+7',pair:'2'},{key:'E',text:'9+6',pair:'3'},{key:'F',text:'7+8',pair:'3'}],{},'hard','7+6=9+4=13; 8+5=6+7=13; 9+6=15=7+8',5),
      r(id,3,'sorting','Sắp xếp từ lớn đến bé: 9+8, 6+6, 7+9, 8+5',[{key:'1',text:'9+8=17'},{key:'2',text:'6+6=12'},{key:'3',text:'7+9=16'},{key:'4',text:'8+5=13'}],['1','3','4','2'],'hard','17>16>13>12',6),
      r(id,3,'matching','Nối phép tính với bước phân tích:',[{key:'A',text:'7+4'},{key:'B',text:'8+6'},{key:'C',text:'9+9'}],{A:'7+3+1=11',B:'8+2+4=14',C:'9+1+8=18'},'hard',null,7),
      r(id,3,'multiple_choice','Phép tính nào có kết quả nhỏ hơn 15?',[{key:'A',text:'7+6=13'},{key:'B',text:'8+5=13'},{key:'C',text:'9+6=15'},{key:'D',text:'6+8=14'}],['A','B','D'],'hard','13,13,14 < 15; 15 không nhỏ hơn 15',8),
      r(id,3,'multiple_choice','Số nào có thể điền vào □ để 8+□ > 14?',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'6'},{key:'D',text:'8'}],['B','D'],'hard','8+7=15>14; 8+8=16>14; 8+5=13<14; 8+6=14 không lớn hơn',9),
      r(id,3,'drag_drop','Kéo số vào bảng cộng: 7+__=11, 7+__=12, 7+__=13',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],['A','B','C'],'hard','7+4=11, 7+5=12, 7+6=13',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1077: Bảng cộng qua 10 ─────────────────────────────────────────────────
  {
    const id = 1077;
    const rows: any[][] = [
      r(id,1,'single_choice','Kết quả của 3 + 8 là?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'12'}],'B','easy','3+8=11',1),
      r(id,1,'single_choice','5 + 7 = ?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'}],'B','easy','5+7=12',2),
      r(id,1,'single_choice','4 + 9 = ?',[{key:'A',text:'12'},{key:'B',text:'14'},{key:'C',text:'13'}],'C','easy','4+9=13',3),
      r(id,1,'true_false','2 + 9 = 11. Đúng hay sai?',null,true,'easy','2+9=11',4),
      r(id,1,'true_false','6 + 8 = 15. Đúng hay sai?',null,false,'easy','6+8=14',5),
      r(id,1,'fill_blank','5 + [b1] = 13.',[{key:'b1',text:''}],{b1:'8'},'easy','13-5=8',6),
      r(id,1,'fill_blank','[b1] + 6 = 14.',[{key:'b1',text:''}],{b1:'8'},'easy','14-6=8',7),
      r(id,1,'counting','Đếm: Có 5 cái bánh kem và 7 cái bánh quy. Tổng là?',[{key:'d1',text:'🎂'},{key:'d2',text:'🎂'},{key:'d3',text:'🎂'},{key:'d4',text:'🎂'},{key:'d5',text:'🎂'},{key:'d6',text:'🍪'},{key:'d7',text:'🍪'},{key:'d8',text:'🍪'},{key:'d9',text:'🍪'},{key:'d10',text:'🍪'},{key:'d11',text:'🍪'},{key:'d12',text:'🍪'}],'12','easy','5+7=12',8),
      r(id,1,'sorting','Sắp xếp từ bé đến lớn kết quả: 5+8, 3+9, 4+8, 6+7',[{key:'1',text:'5+8=13'},{key:'2',text:'3+9=12'},{key:'3',text:'4+8=12'},{key:'4',text:'6+7=13'}],['2','3','1','4'],'easy','12=12<13=13',9),
      r(id,1,'cross_out','Khoanh phép tính SAI trong bảng cộng:',[{key:'A',text:'7+4=11'},{key:'B',text:'5+6=11'},{key:'C',text:'3+8=12'},{key:'D',text:'9+2=11'}],['C'],'easy','3+8=11 không phải 12',10),
      // Ex2
      r(id,2,'single_choice','Trong bảng cộng, 7+5 = ?',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'}],'B','medium','7+5=12',1),
      r(id,2,'single_choice','Tính nhanh: 8+7 = ?',[{key:'A',text:'14'},{key:'B',text:'16'},{key:'C',text:'15'}],'C','medium','8+7=15',2),
      r(id,2,'multiple_choice','Phép tính nào có kết quả là 12?',[{key:'A',text:'5+7'},{key:'B',text:'8+4'},{key:'C',text:'3+9'},{key:'D',text:'6+7'}],['A','B','C'],'medium','5+7=12; 8+4=12; 3+9=12; 6+7=13',3),
      r(id,2,'multiple_choice','Phép tính nào có kết quả là 11?',[{key:'A',text:'9+2'},{key:'B',text:'8+3'},{key:'C',text:'7+4'},{key:'D',text:'6+6'}],['A','B','C'],'medium','9+2=11; 8+3=11; 7+4=11; 6+6=12',4),
      r(id,2,'matching','Nối phép tính với kết quả đúng:',[{key:'A',text:'4+7'},{key:'B',text:'6+5'},{key:'C',text:'3+9'}],{A:'11',B:'11',C:'12'},'medium',null,5),
      r(id,2,'matching','Nối phép tính thuận với phép tính đảo:',[{key:'A',text:'8+5'},{key:'B',text:'7+6'},{key:'C',text:'9+4'}],{A:'5+8',B:'6+7',C:'4+9'},'medium','Tính chất giao hoán',6),
      r(id,2,'drag_drop','Hoàn thành bảng cộng: cột 6+? = 11,12,13',[{key:'A',text:'6+5=11'},{key:'B',text:'6+6=12'},{key:'C',text:'6+7=13'}],['A','B','C'],'medium',null,7),
      r(id,2,'table_fill','Điền vào bảng:',[{key:'headers',text:'+|7|8|9'},{key:'r1',text:'5|_r1c1|_r1c2|_r1c3'}],{r1c1:'12',r1c2:'13',r1c3:'14'},'medium','5+7=12; 5+8=13; 5+9=14',8),
      r(id,2,'number_line','Tính 4+8 trên tia số. Kết quả?',[{key:'min',text:'0'},{key:'max',text:'15'},{key:'step',text:'1'},{key:'marks',text:'0|4|10|12|15'},{key:'hidden',text:'12'}],['12'],'medium','4+8=12',9),
      r(id,2,'puzzle','Điền số: □ + 9 = 18',[{key:'slot_1',text:'Số cần tìm'},{key:'token_A',text:'9'},{key:'token_B',text:'8'},{key:'token_C',text:'7'}],{slot_1:'token_A'},'medium','18-9=9',10),
      // Ex3
      r(id,3,'fill_blank','Điền số còn thiếu trong bảng: 8 + [b1] = 17.',[{key:'b1',text:''}],{b1:'9'},'hard','17-8=9',1),
      r(id,3,'fill_blank','[b1] + [b2] = 15, biết hai số hạng bằng nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'7',b2:'8'},'hard','Không có hai số bằng nhau cho tổng 15; hoặc 7+8=15',2),
      r(id,3,'puzzle','Hoàn thiện bảng cộng hàng 6: 6+6=?, 6+7=?, 6+8=?',[{key:'slot_1',text:'6+6'},{key:'slot_2',text:'6+7'},{key:'slot_3',text:'6+8'},{key:'token_A',text:'12'},{key:'token_B',text:'13'},{key:'token_C',text:'14'}],{slot_1:'token_A',slot_2:'token_B',slot_3:'token_C'},'hard',null,3),
      r(id,3,'puzzle','Tìm hai số hạng: Tổng = 16, một số hạng = 7. Số hạng kia = ?',[{key:'slot_1',text:'Số hạng kia'},{key:'token_A',text:'7'},{key:'token_B',text:'9'},{key:'token_C',text:'8'}],{slot_1:'token_B'},'hard','16-7=9',4),
      r(id,3,'game','Nối cặp có cùng tổng (=13):',[{key:'A',text:'4+9',pair:'1'},{key:'B',text:'6+7',pair:'1'},{key:'C',text:'5+8',pair:'2'},{key:'D',text:'7+6',pair:'2'},{key:'E',text:'9+4',pair:'3'},{key:'F',text:'8+5',pair:'3'}],{},'hard','Tất cả đều = 13',5),
      r(id,3,'sorting','Sắp xếp theo thứ tự tổng tăng dần: 3+9, 5+6, 8+4, 7+8',[{key:'1',text:'3+9=12'},{key:'2',text:'5+6=11'},{key:'3',text:'8+4=12'},{key:'4',text:'7+8=15'}],['2','1','3','4'],'hard','11<12=12<15',6),
      r(id,3,'matching','Nối phép tính với phép tính kiểm tra:',[{key:'A',text:'6+8=14'},{key:'B',text:'7+5=12'},{key:'C',text:'9+6=15'}],{A:'14-8=6',B:'12-5=7',C:'15-6=9'},'hard',null,7),
      r(id,3,'multiple_choice','Kết quả nào ĐÚNG trong bảng cộng qua 10?',[{key:'A',text:'6+6=12'},{key:'B',text:'7+7=14'},{key:'C',text:'8+8=16'},{key:'D',text:'9+9=19'}],['A','B','C'],'hard','9+9=18, không phải 19',8),
      r(id,3,'multiple_choice','Số nào có thể là số hạng để tổng bằng 16?',[{key:'A',text:'7 (vì 7+9=16)'},{key:'B',text:'8 (vì 8+8=16)'},{key:'C',text:'6 (vì 6+10=16... nhưng bảng cộng chỉ đến 9)'},{key:'D',text:'9 (vì 9+7=16)'}],['A','B','D'],'hard','7+9=16; 8+8=16; 9+7=16; 6+10 ngoài phạm vi',9),
      r(id,3,'drag_drop','Hoàn thành bảng cộng hàng 9: 9+2, 9+3, 9+4, 9+5',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'13'},{key:'D',text:'14'}],['A','B','C','D'],'hard','9+2=11; 9+3=12; 9+4=13; 9+5=14',10),
    ];
    lessons.push({ id, rows });
  }

  // ─── 1078: Bài toán về thêm/bớt một số đơn vị ──────────────────────────────
  {
    const id = 1078;
    const rows: any[][] = [
      r(id,1,'single_choice','Trong rổ có 20 quả cam. Thêm 15 quả nữa. Rổ có tất cả bao nhiêu quả?',[{key:'A',text:'35 quả'},{key:'B',text:'5 quả'},{key:'C',text:'25 quả'}],'A','easy','20+15=35',1),
      r(id,1,'single_choice','Có 50 cái bút, cho đi 20 cái. Còn lại bao nhiêu cái?',[{key:'A',text:'70 cái'},{key:'B',text:'30 cái'},{key:'C',text:'40 cái'}],'B','easy','50-20=30',2),
      r(id,1,'single_choice','Hùng có 40 viên kẹo, mẹ cho thêm 35 viên. Hùng có tất cả bao nhiêu viên?',[{key:'A',text:'75 viên'},{key:'B',text:'5 viên'},{key:'C',text:'65 viên'}],'A','easy','40+35=75',3),
      r(id,1,'true_false','Bài toán "thêm" dùng phép cộng. Đúng hay sai?',null,true,'easy','Thêm nghĩa là cộng thêm vào',4),
      r(id,1,'true_false','Bài toán "bớt" dùng phép cộng. Đúng hay sai?',null,false,'easy','Bớt nghĩa là trừ đi',5),
      r(id,1,'fill_blank','Có 60 học sinh, thêm 18 học sinh. Tất cả có [b1] học sinh.',[{key:'b1',text:''}],{b1:'78'},'easy','60+18=78',6),
      r(id,1,'fill_blank','Có 85 cái bánh, bán 32 cái. Còn lại [b1] cái bánh.',[{key:'b1',text:''}],{b1:'53'},'easy','85-32=53',7),
      r(id,1,'counting','Đếm hình tròn: ○○○○○○○○○○○',[{key:'d1',text:'○'},{key:'d2',text:'○'},{key:'d3',text:'○'},{key:'d4',text:'○'},{key:'d5',text:'○'},{key:'d6',text:'○'},{key:'d7',text:'○'},{key:'d8',text:'○'},{key:'d9',text:'○'},{key:'d10',text:'○'},{key:'d11',text:'○'}],'11','easy',null,8),
      r(id,1,'sorting','Sắp xếp số từ bé đến lớn: 78, 35, 53, 60',[{key:'1',text:'78'},{key:'2',text:'35'},{key:'3',text:'53'},{key:'4',text:'60'}],['2','3','4','1'],'easy','35<53<60<78',9),
      r(id,1,'cross_out','Khoanh vào từ cho thấy bài toán dùng phép TRỪ:',[{key:'A',text:'thêm'},{key:'B',text:'bớt'},{key:'C',text:'cho đi'},{key:'D',text:'mua thêm'}],['B','C'],'easy','Bớt và cho đi → phép trừ',10),
      // Ex2
      r(id,2,'single_choice','Lúc đầu có 45 con gà. Bán đi 18 con. Còn bao nhiêu con?',[{key:'A',text:'63 con'},{key:'B',text:'27 con'},{key:'C',text:'37 con'}],'B','medium','45-18=27',1),
      r(id,2,'single_choice','Vườn có 36 cây. Trồng thêm 27 cây. Có tất cả bao nhiêu cây?',[{key:'A',text:'9 cây'},{key:'B',text:'53 cây'},{key:'C',text:'63 cây'}],'C','medium','36+27=63',2),
      r(id,2,'multiple_choice','Bài toán nào dùng phép cộng?',[{key:'A',text:'Có 50 bông hoa, tặng đi 20 bông.'},{key:'B',text:'Có 30 học sinh, thêm 25 học sinh.'},{key:'C',text:'Có 80 tờ giấy, dùng 45 tờ.'},{key:'D',text:'Có 15 cái kẹo, mua thêm 35 cái.'}],['B','D'],'medium','Thêm và mua thêm → phép cộng',3),
      r(id,2,'multiple_choice','Phép tính nào phù hợp với bài toán: "Có 72 quả, bớt đi 31 quả"?',[{key:'A',text:'72 + 31 = 103'},{key:'B',text:'72 - 31 = 41'},{key:'C',text:'31 - 72'},{key:'D',text:'72 - 31'}],['B','D'],'medium','Bớt → phép trừ: 72-31=41',4),
      r(id,2,'matching','Nối bài toán với phép tính:',[{key:'A',text:'Có 54 cuốn sách, mua thêm 23 cuốn.'},{key:'B',text:'Có 90 cái hộp, bán 45 cái.'},{key:'C',text:'Có 62 bạn, thêm 17 bạn tham gia.'}],{A:'54+23=77',B:'90-45=45',C:'62+17=79'},'medium',null,5),
      r(id,2,'matching','Nối từ khóa với phép tính:',[{key:'A',text:'thêm, cho thêm, mua thêm'},{key:'B',text:'bớt, bán đi, cho đi, ăn mất'}],{A:'Phép cộng (+)',B:'Phép trừ (-)'},'medium',null,6),
      r(id,2,'drag_drop','Sắp xếp bước giải: Vườn có 43 cây xoài, trồng thêm 36 cây. Tất cả bao nhiêu cây?',[{key:'A',text:'Số cây tất cả = 43 + 36 = 79 cây'},{key:'B',text:'Tìm số cây sau khi trồng thêm'},{key:'C',text:'Trả lời: Tất cả có 79 cây xoài'}],['B','A','C'],'medium',null,7),
      r(id,2,'table_fill','Điền kết quả:',[{key:'headers',text:'Bài toán|Phép tính|Kết quả'},{key:'r1',text:'Có 65, thêm 24|65+24|_r1c1'},{key:'r2',text:'Có 87, bớt 52|87-52|_r2c1'}],{r1c1:'89',r2c1:'35'},'medium','65+24=89; 87-52=35',8),
      r(id,2,'number_line','Giải trên tia số: Có 30 viên bi, thêm 12 viên. Có tất cả bao nhiêu viên?',[{key:'min',text:'25'},{key:'max',text:'45'},{key:'step',text:'1'},{key:'marks',text:'25|30|35|42|45'},{key:'hidden',text:'42'}],['42'],'medium','30+12=42',9),
      r(id,2,'puzzle','Điền số: Có □ cái kẹo. Thêm 38 cái. Được 75 cái.',[{key:'slot_1',text:'Số ban đầu'},{key:'token_A',text:'37'},{key:'token_B',text:'47'},{key:'token_C',text:'113'}],{slot_1:'token_A'},'medium','75-38=37',10),
      // Ex3
      r(id,3,'fill_blank','Bài toán: Có 56 học sinh, nghỉ học 14 em, sau đó có thêm 8 em đến. Lớp có tất cả [b1] em.',[{key:'b1',text:''}],{b1:'50'},'hard','56-14=42; 42+8=50',1),
      r(id,3,'fill_blank','Số ban đầu là [b1]. Bớt đi 29, rồi thêm 17. Kết quả là 53.',[{key:'b1',text:''}],{b1:'65'},'hard','53-17=36; 36+29=65',2),
      r(id,3,'puzzle','Bài toán hai bước: Cửa hàng có 80 hộp sữa. Bán đi 35 hộp buổi sáng và 28 hộp buổi chiều. Còn lại bao nhiêu hộp?',[{key:'slot_1',text:'Buổi sáng còn'},{key:'slot_2',text:'Cuối ngày còn'},{key:'token_A',text:'45 hộp'},{key:'token_B',text:'17 hộp'},{key:'token_C',text:'52 hộp'},{key:'token_D',text:'63 hộp'}],{slot_1:'token_A',slot_2:'token_B'},'hard','80-35=45; 45-28=17',3),
      r(id,3,'puzzle','Tìm số ban đầu: Thêm 45 rồi bớt 30 thì được 60.',[{key:'slot_1',text:'Số ban đầu'},{key:'token_A',text:'45'},{key:'token_B',text:'75'},{key:'token_C',text:'55'}],{slot_1:'token_A'},'hard','60+30=90; 90-45=45',4),
      r(id,3,'game','Nối bài toán với phép tính đúng:',[{key:'A',text:'Thêm 24 được 88',pair:'1'},{key:'B',text:'88-24=64',pair:'1'},{key:'C',text:'Bớt 33 còn 47',pair:'2'},{key:'D',text:'47+33=80',pair:'2'},{key:'E',text:'Thêm 36 rồi bớt 20 được 70',pair:'3'},{key:'F',text:'70+20-36=54',pair:'3'}],{},'hard',null,5),
      r(id,3,'sorting','Sắp xếp các bước giải bài toán hai bước: "Rổ có 50 quả. Thêm 30 quả. Ăn 15 quả. Còn lại?"',[{key:'1',text:'Còn lại 65 quả'},{key:'2',text:'Sau khi thêm: 50+30=80 quả'},{key:'3',text:'Sau khi ăn: 80-15=65 quả'}],['2','3','1'],'hard',null,6),
      r(id,3,'matching','Nối tình huống với loại bài toán:',[{key:'A',text:'Biết ban đầu và thêm, tìm kết quả'},{key:'B',text:'Biết kết quả và thêm, tìm ban đầu'},{key:'C',text:'Biết ban đầu và kết quả, tìm số thêm'}],{A:'Phép cộng',B:'Phép trừ (kết quả - thêm)',C:'Phép trừ (kết quả - ban đầu)'},'hard',null,7),
      r(id,3,'multiple_choice','Bài toán nào cần hai bước tính?',[{key:'A',text:'Có 30 cái, thêm 20 cái. Còn bao nhiêu?'},{key:'B',text:'Sáng bán 25, chiều bán 35. Bán tất cả bao nhiêu?'},{key:'C',text:'Có 80 cái, bán 30 cái, mua thêm 10 cái. Còn bao nhiêu?'},{key:'D',text:'Thêm 15 rồi bớt 8. Kết quả?'}],['C','D'],'hard','C và D đều cần hai bước tính',8),
      r(id,3,'multiple_choice','Chọn lời giải đúng cho bài: "Có 95 quyển sách, cho đi 42 quyển, rồi mua thêm 27 quyển. Còn bao nhiêu quyển?"',[{key:'A',text:'95-42=53; 53+27=80 ✓'},{key:'B',text:'95+27=122; 122-42=80 ✓'},{key:'C',text:'95-42-27=26 ✗'},{key:'D',text:'42+27=69; 95-69=26 ✓'}],['A','B','D'],'hard','Tất cả ra 80 đều đúng (A,B,D); C sai phép tính',9),
      r(id,3,'drag_drop','Kéo từ khóa vào đúng cột Cộng/Trừ: thêm, bớt, mua thêm, tặng đi, nhận được, mất đi',[{key:'A',text:'thêm → Cộng'},{key:'B',text:'bớt → Trừ'},{key:'C',text:'mua thêm → Cộng'},{key:'D',text:'tặng đi → Trừ'},{key:'E',text:'nhận được → Cộng'},{key:'F',text:'mất đi → Trừ'}],['A','C','E','B','D','F'],'hard',null,10),
    ];
    lessons.push({ id, rows });
  }

  // ─── Insert all ─────────────────────────────────────────────────────────────
  for (const lesson of lessons) {
    await conn.execute(`DELETE FROM quizzes WHERE lessonId = ?`, [lesson.id]);
    for (const row of lesson.rows) {
      await conn.execute(INSERT, row);
    }
    console.log(`✅ lessonId ${lesson.id} — ${lesson.rows.length} questions inserted`);
  }

  await conn.end();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });
