// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('/Users/phamvannam/nam/demo-php/api-hoccungbe/node_modules/mysql2/promise');

interface Quiz {
  lessonId: number;
  exerciseNumber: number;
  questionText: string;
  questionType: string;
  optionsJson: any;
  correctAnswerJson: any;
  hint?: string;
}

function q(
  lessonId: number,
  exerciseNumber: number,
  questionText: string,
  questionType: string,
  optionsJson: any,
  correctAnswerJson: any,
  hint?: string,
): Quiz {
  return { lessonId, exerciseNumber, questionText, questionType, optionsJson, correctAnswerJson, hint };
}

const quizzes: Quiz[] = [

  // ============ LESSON 143: Số có hai chữ số ============
  // Exercise 1 (easy): 3×single_choice, 2×true_false, 2×fill_blank, 1×counting, 1×sorting, 1×cross_out
  q(143,1,'Số 35 có mấy chục?','single_choice',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'5'}],'B'),
  q(143,1,'Số 47 có mấy đơn vị?','single_choice',[{key:'A',text:'4'},{key:'B',text:'7'},{key:'C',text:'9'}],'B'),
  q(143,1,'Số nào có 6 chục và 2 đơn vị?','single_choice',[{key:'A',text:'26'},{key:'B',text:'62'},{key:'C',text:'66'}],'B'),
  q(143,1,'Số 50 có 5 chục và 0 đơn vị. Đúng hay sai?','true_false',null,true),
  q(143,1,'Số 19 có 9 chục và 1 đơn vị. Đúng hay sai?','true_false',null,false),
  q(143,1,'Số 4 chục 8 đơn vị là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'48'}),
  q(143,1,'Số 7 chục 3 đơn vị là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'73'}),
  q(143,1,'Đếm số quả táo dưới đây:','counting',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'},{key:'d6',text:'🍎'},{key:'d7',text:'🍎'}],'7'),
  q(143,1,'Sắp xếp các số theo thứ tự từ bé đến lớn:','sorting',[{key:'1',text:'23'},{key:'2',text:'10'},{key:'3',text:'45'},{key:'4',text:'32'}],['2','1','4','3']),
  q(143,1,'Gạch bỏ số không phải số có hai chữ số:','cross_out',[{key:'A',text:'12'},{key:'B',text:'5'},{key:'C',text:'99'},{key:'D',text:'7'}],['B','D']),

  // Exercise 2 (medium): 2×single_choice, 2×multiple_choice, 2×matching, 1×drag_drop, 1×table_fill, 1×number_line, 1×puzzle
  q(143,2,'Số 83 đọc là gì?','single_choice',[{key:'A',text:'Tám mươi ba'},{key:'B',text:'Ba mươi tám'},{key:'C',text:'Tám ba'}],'A'),
  q(143,2,'Số nào có chữ số hàng chục là 5?','single_choice',[{key:'A',text:'15'},{key:'B',text:'51'},{key:'C',text:'55'}],'B'),
  q(143,2,'Chọn tất cả các số có chữ số hàng đơn vị là 4:','multiple_choice',[{key:'A',text:'14'},{key:'B',text:'41'},{key:'C',text:'44'},{key:'D',text:'24'}],['A','C','D']),
  q(143,2,'Chọn tất cả các số có 2 chục:','multiple_choice',[{key:'A',text:'20'},{key:'B',text:'22'},{key:'C',text:'12'},{key:'D',text:'29'}],['A','B','D']),
  q(143,2,'Ghép số với cách đọc:','matching',[{key:'A',text:'42'},{key:'B',text:'67'},{key:'C',text:'91'}],{A:'Bốn mươi hai',B:'Sáu mươi bảy',C:'Chín mươi mốt'}),
  q(143,2,'Ghép số với số chục và đơn vị:','matching',[{key:'A',text:'35'},{key:'B',text:'72'},{key:'C',text:'18'}],{A:'3 chục 5 đơn vị',B:'7 chục 2 đơn vị',C:'1 chục 8 đơn vị'}),
  q(143,2,'Kéo thả các số vào đúng vị trí từ bé đến lớn:','drag_drop',[{key:'A',text:'15'},{key:'B',text:'51'},{key:'C',text:'11'},{key:'D',text:'55'}],['C','A','B','D']),
  q(143,2,'Điền vào bảng giá trị hàng chục và đơn vị:','table_fill',[{key:'headers',text:'Số|Chục|Đơn vị'},{key:'r1',text:'25|_r1c1|_r1c2'},{key:'r2',text:'63|_r2c1|_r2c2'},{key:'r3',text:'89|_r3c1|_r3c2'}],{r1c1:'2',r1c2:'5',r2c1:'6',r2c2:'3',r3c1:'8',r3c2:'9'}),
  q(143,2,'Đánh dấu số 70 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'70'}],['70']),
  q(143,2,'Ghép ô để tạo số đúng: _chục_ đơn vị = 54','puzzle',[{key:'slot_t',text:'chục'},{key:'slot_u',text:'đơn vị'},{key:'tok_5',text:'5'},{key:'tok_4',text:'4'}],{slot_t:'tok_5',slot_u:'tok_4'}),

  // Exercise 3 (hard): 2×fill_blank, 2×puzzle, 1×game, 1×sorting, 1×matching, 2×multiple_choice, 1×drag_drop
  q(143,3,'Số có 9 chục và 9 đơn vị là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'99'}),
  q(143,3,'Số lớn nhất có hai chữ số là [b1], số nhỏ nhất có hai chữ số là [b2]','fill_blank',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'99',b2:'10'}),
  q(143,3,'Ghép: hàng chục và hàng đơn vị tạo số 76','puzzle',[{key:'slot_t',text:'chục'},{key:'slot_u',text:'đơn vị'},{key:'tok_7',text:'7'},{key:'tok_6',text:'6'}],{slot_t:'tok_7',slot_u:'tok_6'}),
  q(143,3,'Ghép: hàng chục và hàng đơn vị tạo số 93','puzzle',[{key:'slot_t',text:'chục'},{key:'slot_u',text:'đơn vị'},{key:'tok_9',text:'9'},{key:'tok_3',text:'3'}],{slot_t:'tok_9',slot_u:'tok_3'}),
  q(143,3,'Nối đôi: số và cách đọc tương ứng','game',[{key:'A',text:'10',pair:'1'},{key:'B',text:'Mười',pair:'1'},{key:'C',text:'20',pair:'2'},{key:'D',text:'Hai mươi',pair:'2'},{key:'E',text:'30',pair:'3'},{key:'F',text:'Ba mươi',pair:'3'}],{}),
  q(143,3,'Sắp xếp các số từ lớn đến bé:','sorting',[{key:'1',text:'78'},{key:'2',text:'87'},{key:'3',text:'17'},{key:'4',text:'71'}],['2','1','4','3']),
  q(143,3,'Ghép số với số chục:','matching',[{key:'A',text:'42'},{key:'B',text:'68'},{key:'C',text:'95'}],{A:'4',B:'6',C:'9'}),
  q(143,3,'Chọn tất cả số có chữ số hàng chục lớn hơn chữ số hàng đơn vị:','multiple_choice',[{key:'A',text:'31'},{key:'B',text:'13'},{key:'C',text:'52'},{key:'D',text:'25'}],['A','C']),
  q(143,3,'Chọn tất cả số tròn chục (đơn vị = 0):','multiple_choice',[{key:'A',text:'10'},{key:'B',text:'21'},{key:'C',text:'50'},{key:'D',text:'99'}],['A','C']),
  q(143,3,'Kéo thả từ lớn đến bé:','drag_drop',[{key:'A',text:'90'},{key:'B',text:'19'},{key:'C',text:'91'},{key:'D',text:'9'}],['C','A','B','D']),

  // ============ LESSON 144: So sánh số có hai chữ số ============
  // Exercise 1
  q(144,1,'12 so với 21 như thế nào?','single_choice',[{key:'A',text:'12 > 21'},{key:'B',text:'12 < 21'},{key:'C',text:'12 = 21'}],'B'),
  q(144,1,'45 so với 45 như thế nào?','single_choice',[{key:'A',text:'45 > 45'},{key:'B',text:'45 < 45'},{key:'C',text:'45 = 45'}],'C'),
  q(144,1,'Số nào lớn hơn: 73 hay 37?','single_choice',[{key:'A',text:'37'},{key:'B',text:'73'},{key:'C',text:'Bằng nhau'}],'B'),
  q(144,1,'34 < 43. Đúng hay sai?','true_false',null,true),
  q(144,1,'99 < 89. Đúng hay sai?','true_false',null,false),
  q(144,1,'56 [b1] 65 (điền < hoặc >)','fill_blank',[{key:'b1',text:''}],{b1:'<'}),
  q(144,1,'88 [b1] 80 (điền < hoặc >)','fill_blank',[{key:'b1',text:''}],{b1:'>'}),
  q(144,1,'Đếm số hình vuông:','counting',[{key:'d1',text:'■'},{key:'d2',text:'■'},{key:'d3',text:'■'},{key:'d4',text:'■'},{key:'d5',text:'■'},{key:'d6',text:'■'}],'6'),
  q(144,1,'Sắp xếp từ bé đến lớn:','sorting',[{key:'1',text:'55'},{key:'2',text:'15'},{key:'3',text:'51'},{key:'4',text:'11'}],['4','2','3','1']),
  q(144,1,'Gạch bỏ số nhỏ hơn 50:','cross_out',[{key:'A',text:'49'},{key:'B',text:'51'},{key:'C',text:'39'},{key:'D',text:'60'}],['A','C']),

  // Exercise 2
  q(144,2,'Số nào nhỏ nhất trong các số: 34, 43, 30?','single_choice',[{key:'A',text:'34'},{key:'B',text:'43'},{key:'C',text:'30'}],'C'),
  q(144,2,'Số nào lớn nhất trong các số: 67, 76, 70?','single_choice',[{key:'A',text:'67'},{key:'B',text:'76'},{key:'C',text:'70'}],'B'),
  q(144,2,'Chọn tất cả số lớn hơn 50:','multiple_choice',[{key:'A',text:'49'},{key:'B',text:'55'},{key:'C',text:'51'},{key:'D',text:'50'}],['B','C']),
  q(144,2,'Chọn tất cả số nhỏ hơn hoặc bằng 30:','multiple_choice',[{key:'A',text:'30'},{key:'B',text:'31'},{key:'C',text:'29'},{key:'D',text:'20'}],['A','C','D']),
  q(144,2,'Ghép cặp so sánh đúng:','matching',[{key:'A',text:'25 _ 52'},{key:'B',text:'63 _ 36'},{key:'C',text:'44 _ 44'}],{A:'<',B:'>',C:'='}),
  q(144,2,'Ghép số với vị trí trên trục số:','matching',[{key:'A',text:'10'},{key:'B',text:'50'},{key:'C',text:'90'}],{A:'nhỏ nhất',B:'ở giữa',C:'lớn nhất'}),
  q(144,2,'Kéo thả theo thứ tự tăng dần:','drag_drop',[{key:'A',text:'82'},{key:'B',text:'28'},{key:'C',text:'80'},{key:'D',text:'20'}],['D','B','C','A']),
  q(144,2,'Bảng so sánh:','table_fill',[{key:'headers',text:'Số A|Số B|Dấu'},{key:'r1',text:'24|42|_r1c1'},{key:'r2',text:'65|56|_r2c1'},{key:'r3',text:'33|33|_r3c1'}],{r1c1:'<',r2c1:'>',r3c1:'='}),
  q(144,2,'Đánh dấu số 40 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'40'}],['40']),
  q(144,2,'Ghép: số lớn hơn vào ô bên phải: 37 ○ [b1]','puzzle',[{key:'slot_r',text:'số lớn hơn'},{key:'tok_37',text:'37'},{key:'tok_73',text:'73'},{key:'tok_30',text:'30'}],{slot_r:'tok_73'}),

  // Exercise 3
  q(144,3,'Số lớn nhất có hai chữ số khác nhau, chữ số hàng chục là 7 là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'79'}),
  q(144,3,'Có [b1] số có hai chữ số từ 90 đến 99','fill_blank',[{key:'b1',text:''}],{b1:'10'}),
  q(144,3,'Xếp đúng: 15, 51, 11, 55 từ lớn đến bé','puzzle',[{key:'s1',text:'vị trí 1'},{key:'s2',text:'vị trí 2'},{key:'s3',text:'vị trí 3'},{key:'s4',text:'vị trí 4'},{key:'t55',text:'55'},{key:'t51',text:'51'},{key:'t15',text:'15'},{key:'t11',text:'11'}],{s1:'t55',s2:'t51',s3:'t15',s4:'t11'}),
  q(144,3,'Xếp đúng: 29, 92, 22, 99 từ bé đến lớn','puzzle',[{key:'s1',text:'vị trí 1'},{key:'s2',text:'vị trí 2'},{key:'s3',text:'vị trí 3'},{key:'s4',text:'vị trí 4'},{key:'t22',text:'22'},{key:'t29',text:'29'},{key:'t92',text:'92'},{key:'t99',text:'99'}],{s1:'t22',s2:'t29',s3:'t92',s4:'t99'}),
  q(144,3,'Nối đôi: cặp số bằng nhau','game',[{key:'A',text:'40',pair:'1'},{key:'B',text:'Bốn mươi',pair:'1'},{key:'C',text:'75',pair:'2'},{key:'D',text:'Bảy mươi lăm',pair:'2'},{key:'E',text:'99',pair:'3'},{key:'F',text:'Chín mươi chín',pair:'3'}],{}),
  q(144,3,'Sắp xếp từ lớn đến bé:','sorting',[{key:'1',text:'60'},{key:'2',text:'16'},{key:'3',text:'61'},{key:'4',text:'10'}],['3','1','2','4']),
  q(144,3,'Ghép cặp số lớn hơn 60:','matching',[{key:'A',text:'61'},{key:'B',text:'59'},{key:'C',text:'70'}],{A:'lớn hơn 60',B:'nhỏ hơn 60',C:'lớn hơn 60'}),
  q(144,3,'Chọn tất cả số nằm giữa 40 và 50 (không bao gồm 40 và 50):','multiple_choice',[{key:'A',text:'41'},{key:'B',text:'40'},{key:'C',text:'49'},{key:'D',text:'50'}],['A','C']),
  q(144,3,'Chọn tất cả số lớn hơn 75:','multiple_choice',[{key:'A',text:'74'},{key:'B',text:'76'},{key:'C',text:'80'},{key:'D',text:'75'}],['B','C']),
  q(144,3,'Kéo thả từ nhỏ đến lớn:','drag_drop',[{key:'A',text:'88'},{key:'B',text:'18'},{key:'C',text:'81'},{key:'D',text:'11'}],['D','B','C','A']),

  // ============ LESSON 145: Bảng các số từ 1 đến 100 ============
  // Exercise 1
  q(145,1,'Số tiếp theo của 29 là?','single_choice',[{key:'A',text:'28'},{key:'B',text:'30'},{key:'C',text:'31'}],'B'),
  q(145,1,'Số đứng trước 50 là?','single_choice',[{key:'A',text:'51'},{key:'B',text:'49'},{key:'C',text:'48'}],'B'),
  q(145,1,'Hàng thứ 5 của bảng số bắt đầu bằng số?','single_choice',[{key:'A',text:'40'},{key:'B',text:'41'},{key:'C',text:'50'}],'B'),
  q(145,1,'Số 100 là số lớn nhất trong bảng 1-100. Đúng hay sai?','true_false',null,true),
  q(145,1,'Số 55 nằm ở hàng thứ 6 của bảng (mỗi hàng 10 số). Đúng hay sai?','true_false',null,true),
  q(145,1,'Số đứng sau 39 là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'40'}),
  q(145,1,'Số đứng trước 71 là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'70'}),
  q(145,1,'Đếm số ngôi sao:','counting',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'},{key:'d8',text:'⭐'}],'8'),
  q(145,1,'Sắp xếp từ bé đến lớn:','sorting',[{key:'1',text:'70'},{key:'2',text:'40'},{key:'3',text:'10'},{key:'4',text:'100'}],['3','2','1','4']),
  q(145,1,'Gạch bỏ số không nằm trong hàng đầu (1-10):','cross_out',[{key:'A',text:'5'},{key:'B',text:'11'},{key:'C',text:'10'},{key:'D',text:'20'}],['B','D']),

  // Exercise 2
  q(145,2,'Trong bảng 1-100, cột cuối cùng chứa các số nào?','single_choice',[{key:'A',text:'Số tròn chục'},{key:'B',text:'Số lẻ'},{key:'C',text:'Số tận cùng là 5'}],'A'),
  q(145,2,'Số nằm ở hàng 7, cột 3 trong bảng 1-100 là?','single_choice',[{key:'A',text:'63'},{key:'B',text:'73'},{key:'C',text:'74'}],'A'),
  q(145,2,'Chọn tất cả số tròn chục trong 1-100:','multiple_choice',[{key:'A',text:'10'},{key:'B',text:'55'},{key:'C',text:'80'},{key:'D',text:'100'}],['A','C','D']),
  q(145,2,'Chọn tất cả số có chữ số đơn vị là 5:','multiple_choice',[{key:'A',text:'15'},{key:'B',text:'51'},{key:'C',text:'25'},{key:'D',text:'52'}],['A','C']),
  q(145,2,'Ghép hàng với dãy số tương ứng:','matching',[{key:'A',text:'Hàng 2'},{key:'B',text:'Hàng 5'},{key:'C',text:'Hàng 9'}],{A:'11-20',B:'41-50',C:'81-90'}),
  q(145,2,'Ghép số với vị trí cột:','matching',[{key:'A',text:'23'},{key:'B',text:'47'},{key:'C',text:'61'}],{A:'cột 3',B:'cột 7',C:'cột 1'}),
  q(145,2,'Kéo thả điền vào dãy số: 31, ?, 33, ?, 35','drag_drop',[{key:'A',text:'32'},{key:'B',text:'34'},{key:'C',text:'36'},{key:'D',text:'30'}],['A','B']),
  q(145,2,'Bảng điền số còn thiếu:','table_fill',[{key:'headers',text:'Vị trí|Số'},{key:'r1',text:'Sau 49|_r1c1'},{key:'r2',text:'Trước 80|_r2c1'},{key:'r3',text:'Sau 99|_r3c1'}],{r1c1:'50',r2c1:'79',r3c1:'100'}),
  q(145,2,'Đánh dấu số 50 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'50'}],['50']),
  q(145,2,'Ghép: số đứng liền sau 59 là gì?','puzzle',[{key:'slot_ans',text:'đáp án'},{key:'tok_59',text:'59'},{key:'tok_60',text:'60'},{key:'tok_61',text:'61'}],{slot_ans:'tok_60'}),

  // Exercise 3
  q(145,3,'Trong bảng 1-100, có [b1] số tròn chục (10, 20, ..., 100)','fill_blank',[{key:'b1',text:''}],{b1:'10'}),
  q(145,3,'Số đứng giữa 64 và 66 là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'65'}),
  q(145,3,'Xếp đúng dãy số: 47, 48, 49, 50','puzzle',[{key:'s1',text:'vị trí 1'},{key:'s2',text:'vị trí 2'},{key:'s3',text:'vị trí 3'},{key:'s4',text:'vị trí 4'},{key:'t47',text:'47'},{key:'t48',text:'48'},{key:'t49',text:'49'},{key:'t50',text:'50'}],{s1:'t47',s2:'t48',s3:'t49',s4:'t50'}),
  q(145,3,'Xếp đúng dãy số: 97, 98, 99, 100','puzzle',[{key:'s1',text:'vị trí 1'},{key:'s2',text:'vị trí 2'},{key:'s3',text:'vị trí 3'},{key:'s4',text:'vị trí 4'},{key:'t97',text:'97'},{key:'t98',text:'98'},{key:'t99',text:'99'},{key:'t100',text:'100'}],{s1:'t97',s2:'t98',s3:'t99',s4:'t100'}),
  q(145,3,'Nối đôi số và chữ viết:','game',[{key:'A',text:'41',pair:'1'},{key:'B',text:'Bốn mươi mốt',pair:'1'},{key:'C',text:'62',pair:'2'},{key:'D',text:'Sáu mươi hai',pair:'2'},{key:'E',text:'85',pair:'3'},{key:'F',text:'Tám mươi lăm',pair:'3'}],{}),
  q(145,3,'Sắp xếp từ lớn đến bé:','sorting',[{key:'1',text:'95'},{key:'2',text:'59'},{key:'3',text:'99'},{key:'4',text:'55'}],['3','1','2','4']),
  q(145,3,'Ghép dãy số với quy luật:','matching',[{key:'A',text:'10,20,30,40'},{key:'B',text:'11,13,15,17'},{key:'C',text:'5,10,15,20'}],{A:'tăng 10',B:'tăng 2',C:'tăng 5'}),
  q(145,3,'Chọn tất cả số nằm trong hàng 4 của bảng 1-100 (31-40):','multiple_choice',[{key:'A',text:'31'},{key:'B',text:'40'},{key:'C',text:'41'},{key:'D',text:'39'}],['A','B','D']),
  q(145,3,'Chọn tất cả số có hai chữ số giống nhau:','multiple_choice',[{key:'A',text:'11'},{key:'B',text:'12'},{key:'C',text:'33'},{key:'D',text:'55'}],['A','C','D']),
  q(145,3,'Kéo thả theo thứ tự từ bé đến lớn:','drag_drop',[{key:'A',text:'100'},{key:'B',text:'10'},{key:'C',text:'50'},{key:'D',text:'1'}],['D','B','C','A']),

  // ============ LESSON 146: Luyện tập chung ============
  // Exercise 1
  q(146,1,'Số 58 có chữ số hàng chục là?','single_choice',[{key:'A',text:'5'},{key:'B',text:'8'},{key:'C',text:'58'}],'A'),
  q(146,1,'Số nào nhỏ hơn 30?','single_choice',[{key:'A',text:'31'},{key:'B',text:'29'},{key:'C',text:'30'}],'B'),
  q(146,1,'Số đứng sau 69 là?','single_choice',[{key:'A',text:'68'},{key:'B',text:'70'},{key:'C',text:'71'}],'B'),
  q(146,1,'74 > 47. Đúng hay sai?','true_false',null,true),
  q(146,1,'Số 10 là số nhỏ nhất có hai chữ số. Đúng hay sai?','true_false',null,true),
  q(146,1,'Số có 6 chục và 0 đơn vị là [b1]','fill_blank',[{key:'b1',text:''}],{b1:'60'}),
  q(146,1,'5 chục 9 đơn vị = [b1]','fill_blank',[{key:'b1',text:''}],{b1:'59'}),
  q(146,1,'Đếm số bông hoa:','counting',[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'},{key:'d3',text:'🌸'},{key:'d4',text:'🌸'},{key:'d5',text:'🌸'}],'5'),
  q(146,1,'Sắp xếp từ bé đến lớn:','sorting',[{key:'1',text:'84'},{key:'2',text:'48'},{key:'3',text:'44'},{key:'4',text:'88'}],['3','2','1','4']),
  q(146,1,'Gạch bỏ số không có chữ số hàng chục là 3:','cross_out',[{key:'A',text:'33'},{key:'B',text:'13'},{key:'C',text:'31'},{key:'D',text:'43'}],['B','D']),

  // Exercise 2
  q(146,2,'Số nào có tổng hai chữ số bằng 9?','single_choice',[{key:'A',text:'18'},{key:'B',text:'19'},{key:'C',text:'36'}],'A'),
  q(146,2,'Giá trị hàng chục của 75 là?','single_choice',[{key:'A',text:'7'},{key:'B',text:'70'},{key:'C',text:'5'}],'B'),
  q(146,2,'Chọn tất cả số mà chữ số hàng chục nhỏ hơn chữ số hàng đơn vị:','multiple_choice',[{key:'A',text:'12'},{key:'B',text:'21'},{key:'C',text:'34'},{key:'D',text:'43'}],['A','C']),
  q(146,2,'Chọn tất cả số từ 60 đến 70:','multiple_choice',[{key:'A',text:'60'},{key:'B',text:'65'},{key:'C',text:'70'},{key:'D',text:'71'}],['A','B','C']),
  q(146,2,'Ghép đúng:','matching',[{key:'A',text:'46'},{key:'B',text:'64'},{key:'C',text:'60'}],{A:'bốn chục sáu đơn vị',B:'sáu chục bốn đơn vị',C:'sáu chục không đơn vị'}),
  q(146,2,'Ghép số với dấu so sánh:','matching',[{key:'A',text:'50 ○ 50'},{key:'B',text:'38 ○ 83'},{key:'C',text:'77 ○ 70'}],{A:'=',B:'<',C:'>'}),
  q(146,2,'Kéo thả: xếp theo thứ tự tăng dần','drag_drop',[{key:'A',text:'53'},{key:'B',text:'35'},{key:'C',text:'33'},{key:'D',text:'55'}],['C','B','A','D']),
  q(146,2,'Bảng điền giá trị:','table_fill',[{key:'headers',text:'Số|Chục|Đơn vị'},{key:'r1',text:'71|_r1c1|_r1c2'},{key:'r2',text:'19|_r2c1|_r2c2'},{key:'r3',text:'40|_r3c1|_r3c2'}],{r1c1:'7',r1c2:'1',r2c1:'1',r2c2:'9',r3c1:'4',r3c2:'0'}),
  q(146,2,'Đánh dấu số 30 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'30'}],['30']),
  q(146,2,'Ghép để hoàn thành: Số nhỏ nhất có hai chữ số khác nhau là [?]','puzzle',[{key:'slot_ans',text:'đáp án'},{key:'tok_10',text:'10'},{key:'tok_12',text:'12'},{key:'tok_01',text:'01'}],{slot_ans:'tok_10'}),

  // Exercise 3
  q(146,3,'Số 2 chục lớn hơn [b1] đơn vị và nhỏ hơn 21','fill_blank',[{key:'b1',text:''}],{b1:'20'}),
  q(146,3,'Giữa 49 và 51 có [b1] số','fill_blank',[{key:'b1',text:''}],{b1:'1'}),
  q(146,3,'Sắp đúng: số chẵn từ 20 đến 28','puzzle',[{key:'s1',text:'1'},{key:'s2',text:'2'},{key:'s3',text:'3'},{key:'s4',text:'4'},{key:'s5',text:'5'},{key:'t20',text:'20'},{key:'t22',text:'22'},{key:'t24',text:'24'},{key:'t26',text:'26'},{key:'t28',text:'28'}],{s1:'t20',s2:'t22',s3:'t24',s4:'t26',s5:'t28'}),
  q(146,3,'Xếp theo thứ tự giảm dần: 91, 19, 99, 11','puzzle',[{key:'s1',text:'vị trí 1'},{key:'s2',text:'vị trí 2'},{key:'s3',text:'vị trí 3'},{key:'s4',text:'vị trí 4'},{key:'t99',text:'99'},{key:'t91',text:'91'},{key:'t19',text:'19'},{key:'t11',text:'11'}],{s1:'t99',s2:'t91',s3:'t19',s4:'t11'}),
  q(146,3,'Nối đôi: dạng viết và chữ','game',[{key:'A',text:'36',pair:'1'},{key:'B',text:'Ba mươi sáu',pair:'1'},{key:'C',text:'48',pair:'2'},{key:'D',text:'Bốn mươi tám',pair:'2'},{key:'E',text:'57',pair:'3'},{key:'F',text:'Năm mươi bảy',pair:'3'}],{}),
  q(146,3,'Sắp xếp từ nhỏ đến lớn:','sorting',[{key:'1',text:'22'},{key:'2',text:'92'},{key:'3',text:'29'},{key:'4',text:'99'}],['1','3','2','4']),
  q(146,3,'Ghép: số chục × 10 = số tròn chục','matching',[{key:'A',text:'3'},{key:'B',text:'7'},{key:'C',text:'9'}],{A:'30',B:'70',C:'90'}),
  q(146,3,'Chọn tất cả số có chữ số đơn vị lớn hơn 5:','multiple_choice',[{key:'A',text:'16'},{key:'B',text:'51'},{key:'C',text:'28'},{key:'D',text:'39'}],['A','C','D']),
  q(146,3,'Chọn tất cả số lớn hơn 44 và nhỏ hơn 50:','multiple_choice',[{key:'A',text:'44'},{key:'B',text:'45'},{key:'C',text:'49'},{key:'D',text:'50'}],['B','C']),
  q(146,3,'Kéo thả từ lớn đến bé:','drag_drop',[{key:'A',text:'73'},{key:'B',text:'37'},{key:'C',text:'77'},{key:'D',text:'33'}],['C','A','B','D']),

  // ============ LESSON 147: Dài hơn, ngắn hơn ============
  // Exercise 1
  q(147,1,'Cái nào dài hơn: bút chì 5cm hay thước 30cm?','single_choice',[{key:'A',text:'Bút chì'},{key:'B',text:'Thước'},{key:'C',text:'Bằng nhau'}],'B'),
  q(147,1,'Con sâu 3cm và con rắn 30cm. Con nào ngắn hơn?','single_choice',[{key:'A',text:'Con sâu'},{key:'B',text:'Con rắn'},{key:'C',text:'Bằng nhau'}],'A'),
  q(147,1,'Sợi dây 10cm so với sợi dây 10cm là?','single_choice',[{key:'A',text:'Dài hơn'},{key:'B',text:'Ngắn hơn'},{key:'C',text:'Bằng nhau'}],'C'),
  q(147,1,'Cây bút 15cm dài hơn cây thước 20cm. Đúng hay sai?','true_false',null,false),
  q(147,1,'Con kiến đi đường ngắn hơn con voi. Đúng hay sai?','true_false',null,true),
  q(147,1,'Đoạn thẳng AB dài 8cm, đoạn CD dài 5cm. Đoạn nào dài hơn? [b1]','fill_blank',[{key:'b1',text:''}],{b1:'AB'}),
  q(147,1,'Bàn 80cm, ghế 40cm. Bàn [b1] hơn ghế.','fill_blank',[{key:'b1',text:''}],{b1:'dài'}),
  q(147,1,'Đếm số đoạn thẳng:','counting',[{key:'d1',text:'—'},{key:'d2',text:'—'},{key:'d3',text:'—'},{key:'d4',text:'—'}],'4'),
  q(147,1,'Sắp xếp từ ngắn đến dài (cm):','sorting',[{key:'1',text:'15cm'},{key:'2',text:'5cm'},{key:'3',text:'25cm'},{key:'4',text:'10cm'}],['2','4','1','3']),
  q(147,1,'Gạch bỏ vật ngắn hơn 20cm:','cross_out',[{key:'A',text:'Thước 30cm'},{key:'B',text:'Bút chì 15cm'},{key:'C',text:'Sách 25cm'},{key:'D',text:'Tẩy 5cm'}],['B','D']),

  // Exercise 2
  q(147,2,'So sánh: đoạn thẳng 12cm và 21cm, đoạn nào ngắn hơn?','single_choice',[{key:'A',text:'12cm'},{key:'B',text:'21cm'},{key:'C',text:'Bằng nhau'}],'A'),
  q(147,2,'Cây cao 2m, cột điện 10m. Cây so với cột điện như thế nào?','single_choice',[{key:'A',text:'Cao hơn'},{key:'B',text:'Thấp hơn'},{key:'C',text:'Bằng nhau'}],'B'),
  q(147,2,'Chọn tất cả vật dài hơn 10cm (ước tính):','multiple_choice',[{key:'A',text:'Bàn học'},{key:'B',text:'Cục tẩy'},{key:'C',text:'Cửa nhà'},{key:'D',text:'Hạt đậu'}],['A','C']),
  q(147,2,'Chọn tất cả vật ngắn hơn 1m:','multiple_choice',[{key:'A',text:'Bút viết'},{key:'B',text:'Xe ô tô'},{key:'C',text:'Thước 30cm'},{key:'D',text:'Nhà'}],['A','C']),
  q(147,2,'Ghép vật với độ dài phù hợp:','matching',[{key:'A',text:'Bút chì'},{key:'B',text:'Sân bóng'},{key:'C',text:'Ngón tay'}],{A:'15cm',B:'100m',C:'5cm'}),
  q(147,2,'Ghép dấu so sánh:','matching',[{key:'A',text:'8cm ○ 10cm'},{key:'B',text:'20cm ○ 20cm'},{key:'C',text:'35cm ○ 30cm'}],{A:'<',B:'=',C:'>'}),
  q(147,2,'Kéo thả: xếp từ ngắn đến dài','drag_drop',[{key:'A',text:'50cm'},{key:'B',text:'5cm'},{key:'C',text:'500cm'},{key:'D',text:'15cm'}],['B','D','A','C']),
  q(147,2,'Bảng so sánh độ dài:','table_fill',[{key:'headers',text:'Vật A|Vật B|So sánh'},{key:'r1',text:'12cm|21cm|_r1c1'},{key:'r2',text:'30cm|30cm|_r2c1'},{key:'r3',text:'45cm|40cm|_r3c1'}],{r1c1:'<',r2c1:'=',r3c1:'>'}),
  q(147,2,'Đánh dấu độ dài 30 trên thước số:','number_line',[{key:'min',text:'0'},{key:'max',text:'50'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50'},{key:'hidden',text:'30'}],['30']),
  q(147,2,'Ghép: vật nào dài hơn trong cặp đôi','puzzle',[{key:'slot_long',text:'dài hơn'},{key:'tok_pen',text:'Bút 20cm'},{key:'tok_ruler',text:'Thước 30cm'},{key:'tok_eraser',text:'Tẩy 5cm'}],{slot_long:'tok_ruler'}),

  // Exercise 3
  q(147,3,'Đoạn AB dài 25cm, đoạn BC dài 15cm. Đoạn AC dài [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'40'}),
  q(147,3,'Sợi dây dài 30cm, cắt đi 12cm. Còn lại [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'18'}),
  q(147,3,'Xếp đúng từ ngắn đến dài:','puzzle',[{key:'s1',text:'ngắn nhất'},{key:'s2',text:'ngắn thứ 2'},{key:'s3',text:'dài nhất'},{key:'t8',text:'8cm'},{key:'t18',text:'18cm'},{key:'t28',text:'28cm'}],{s1:'t8',s2:'t18',s3:'t28'}),
  q(147,3,'Xếp đúng từ dài đến ngắn:','puzzle',[{key:'s1',text:'dài nhất'},{key:'s2',text:'thứ 2'},{key:'s3',text:'ngắn nhất'},{key:'t40',text:'40cm'},{key:'t14',text:'14cm'},{key:'t22',text:'22cm'}],{s1:'t40',s2:'t22',s3:'t14'}),
  q(147,3,'Nối đôi: vật với ước lượng độ dài','game',[{key:'A',text:'Bút chì',pair:'1'},{key:'B',text:'~15cm',pair:'1'},{key:'C',text:'Cửa nhà',pair:'2'},{key:'D',text:'~200cm',pair:'2'},{key:'E',text:'Ngón tay',pair:'3'},{key:'F',text:'~5cm',pair:'3'}],{}),
  q(147,3,'Sắp xếp từ dài đến ngắn:','sorting',[{key:'1',text:'100cm'},{key:'2',text:'10cm'},{key:'3',text:'50cm'},{key:'4',text:'1cm'}],['1','3','2','4']),
  q(147,3,'Ghép vật với so sánh độ dài:','matching',[{key:'A',text:'Tay bé'},{key:'B',text:'Tường nhà'},{key:'C',text:'Bàn học'}],{A:'ngắn nhất',B:'dài nhất',C:'ở giữa'}),
  q(147,3,'Chọn tất cả câu đúng:','multiple_choice',[{key:'A',text:'30cm > 29cm'},{key:'B',text:'15cm < 51cm'},{key:'C',text:'40cm = 40cm'},{key:'D',text:'20cm > 25cm'}],['A','B','C']),
  q(147,3,'Chọn tất cả vật dài hơn 30cm (ước lượng):','multiple_choice',[{key:'A',text:'Bàn học'},{key:'B',text:'Tẩy'},{key:'C',text:'Thước 50cm'},{key:'D',text:'Hạt gạo'}],['A','C']),
  q(147,3,'Kéo thả: xếp từ dài đến ngắn','drag_drop',[{key:'A',text:'90cm'},{key:'B',text:'9cm'},{key:'C',text:'19cm'},{key:'D',text:'91cm'}],['D','A','C','B']),

  // ============ LESSON 148: Đơn vị đo độ dài (cm) ============
  // Exercise 1
  q(148,1,'cm là viết tắt của đơn vị đo nào?','single_choice',[{key:'A',text:'Centimét'},{key:'B',text:'Kilômét'},{key:'C',text:'Mét'}],'A'),
  q(148,1,'Dùng thước để đo độ dài, đặt đầu vật ở vạch số mấy?','single_choice',[{key:'A',text:'1'},{key:'B',text:'0'},{key:'C',text:'5'}],'B'),
  q(148,1,'Bút chì dài 14cm và 6mm thì làm tròn là bao nhiêu cm?','single_choice',[{key:'A',text:'14cm'},{key:'B',text:'15cm'},{key:'C',text:'16cm'}],'A'),
  q(148,1,'1cm ngắn hơn 1m. Đúng hay sai?','true_false',null,true),
  q(148,1,'Đo độ dài bằng tay (gang tay) cho kết quả chính xác hơn thước. Đúng hay sai?','true_false',null,false),
  q(148,1,'Chiều dài bàn học khoảng [b1] cm (50/500/5000)','fill_blank',[{key:'b1',text:''}],{b1:'50'}),
  q(148,1,'Bút chì dài khoảng [b1] cm','fill_blank',[{key:'b1',text:''}],{b1:'15'}),
  q(148,1,'Đếm số vạch cm trên thước từ 0 đến 5:','counting',[{key:'d1',text:'|'},{key:'d2',text:'|'},{key:'d3',text:'|'},{key:'d4',text:'|'},{key:'d5',text:'|'},{key:'d6',text:'|'}],'6'),
  q(148,1,'Sắp xếp từ ngắn đến dài:','sorting',[{key:'1',text:'20cm'},{key:'2',text:'2cm'},{key:'3',text:'12cm'},{key:'4',text:'21cm'}],['2','3','1','4']),
  q(148,1,'Gạch bỏ đơn vị đo không dùng cho độ dài ngắn:','cross_out',[{key:'A',text:'cm'},{key:'B',text:'kg'},{key:'C',text:'mm'},{key:'D',text:'lít'}],['B','D']),

  // Exercise 2
  q(148,2,'Thước kẻ thông thường dài bao nhiêu cm?','single_choice',[{key:'A',text:'20cm'},{key:'B',text:'30cm'},{key:'C',text:'10cm'}],'B'),
  q(148,2,'Đặt thước đo, đầu bút ở vạch 0, cuối bút ở vạch 17. Bút dài bao nhiêu?','single_choice',[{key:'A',text:'16cm'},{key:'B',text:'17cm'},{key:'C',text:'18cm'}],'B'),
  q(148,2,'Chọn tất cả đơn vị đo độ dài:','multiple_choice',[{key:'A',text:'cm'},{key:'B',text:'kg'},{key:'C',text:'m'},{key:'D',text:'km'}],['A','C','D']),
  q(148,2,'Chọn tất cả vật có chiều dài khoảng 10cm:','multiple_choice',[{key:'A',text:'Ngón tay'},{key:'B',text:'Bút màu'},{key:'C',text:'Tờ giấy A4'},{key:'D',text:'Hạt đậu'}],['B']),
  q(148,2,'Ghép vật với độ dài ước lượng:','matching',[{key:'A',text:'Chiều cao bàn học'},{key:'B',text:'Bút chì'},{key:'C',text:'Tẩy'}],{A:'75cm',B:'17cm',C:'5cm'}),
  q(148,2,'Ghép phép đo đúng:','matching',[{key:'A',text:'0 đến 8 trên thước'},{key:'B',text:'0 đến 15 trên thước'},{key:'C',text:'0 đến 30 trên thước'}],{A:'8cm',B:'15cm',C:'30cm'}),
  q(148,2,'Kéo thả: sắp theo thứ tự tăng dần','drag_drop',[{key:'A',text:'25cm'},{key:'B',text:'52cm'},{key:'C',text:'2cm'},{key:'D',text:'5cm'}],['C','D','A','B']),
  q(148,2,'Bảng đo độ dài:','table_fill',[{key:'headers',text:'Vật|Đầu|Cuối|Dài'},{key:'r1',text:'Bút|0|18|_r1c1'},{key:'r2',text:'Tẩy|0|6|_r2c1'},{key:'r3',text:'Thước|0|30|_r3c1'}],{r1c1:'18cm',r2c1:'6cm',r3c1:'30cm'}),
  q(148,2,'Đánh dấu 15cm trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'30'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20|25|30'},{key:'hidden',text:'15'}],['15']),
  q(148,2,'Ghép: đơn vị đo với ký hiệu','puzzle',[{key:'slot_cm',text:'xăng-ti-mét'},{key:'tok_cm',text:'cm'},{key:'tok_m',text:'m'},{key:'tok_km',text:'km'}],{slot_cm:'tok_cm'}),

  // Exercise 3
  q(148,3,'Bàn dài 120cm. Đổi ra mét: [b1]m [b2]cm','fill_blank',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'1',b2:'20'}),
  q(148,3,'Bút dài 18cm, tẩy dài 6cm. Bút dài hơn tẩy [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'12'}),
  q(148,3,'Xếp đúng thứ tự đo: 0→cuối','puzzle',[{key:'s1',text:'bước 1'},{key:'s2',text:'bước 2'},{key:'s3',text:'bước 3'},{key:'t1',text:'Đặt vật cạnh thước'},{key:'t2',text:'Đầu vật ở vạch 0'},{key:'t3',text:'Đọc vạch ở cuối vật'}],{s1:'t1',s2:'t2',s3:'t3'}),
  q(148,3,'Ghép đơn vị phù hợp với vật:','puzzle',[{key:'slot_short',text:'độ dài bút'},{key:'slot_long',text:'độ dài đường phố'},{key:'tok_cm',text:'cm'},{key:'tok_km',text:'km'}],{slot_short:'tok_cm',slot_long:'tok_km'}),
  q(148,3,'Nối đôi: vật và ước lượng cm','game',[{key:'A',text:'Ngón tay',pair:'1'},{key:'B',text:'5cm',pair:'1'},{key:'C',text:'Bút chì',pair:'2'},{key:'D',text:'17cm',pair:'2'},{key:'E',text:'Thước kẻ',pair:'3'},{key:'F',text:'30cm',pair:'3'}],{}),
  q(148,3,'Sắp xếp từ ngắn đến dài:','sorting',[{key:'1',text:'1cm'},{key:'2',text:'10cm'},{key:'3',text:'100cm'},{key:'4',text:'1000cm'}],['1','2','3','4']),
  q(148,3,'Ghép: vật với đơn vị đo phù hợp','matching',[{key:'A',text:'Chiều dài sân trường'},{key:'B',text:'Chiều dài ngón tay'},{key:'C',text:'Chiều dài con đường'}],{A:'m',B:'cm',C:'km'}),
  q(148,3,'Chọn tất cả câu đúng về đo độ dài:','multiple_choice',[{key:'A',text:'Đặt đầu vật tại vạch 0'},{key:'B',text:'Đọc số ở cuối vật'},{key:'C',text:'Đơn vị là cm'},{key:'D',text:'Đặt đầu vật tại vạch 1'}],['A','B','C']),
  q(148,3,'Chọn tất cả vật có thể đo bằng thước cm:','multiple_choice',[{key:'A',text:'Bút chì'},{key:'B',text:'Khoảng cách Hà Nội - HCM'},{key:'C',text:'Cuốn sách'},{key:'D',text:'Chiều cao bàn'}],['A','C','D']),
  q(148,3,'Kéo thả theo thứ tự từ nhỏ đến lớn:','drag_drop',[{key:'A',text:'30cm'},{key:'B',text:'3cm'},{key:'C',text:'13cm'},{key:'D',text:'31cm'}],['B','C','A','D']),

  // ============ LESSON 149: Thực hành ước lượng và đo độ dài ============
  // Exercise 1
  q(149,1,'Ước lượng chiều dài bút chì là khoảng bao nhiêu cm?','single_choice',[{key:'A',text:'5cm'},{key:'B',text:'15cm'},{key:'C',text:'50cm'}],'B'),
  q(149,1,'Dùng bao nhiêu gang tay để đo chiều dài bàn 60cm nếu gang tay = 15cm?','single_choice',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B'),
  q(149,1,'Ước lượng chiều cao của cốc nước là?','single_choice',[{key:'A',text:'10cm'},{key:'B',text:'100cm'},{key:'C',text:'1000cm'}],'A'),
  q(149,1,'Ước lượng là đo chính xác. Đúng hay sai?','true_false',null,false),
  q(149,1,'Đo bằng thước chính xác hơn đo bằng tay. Đúng hay sai?','true_false',null,true),
  q(149,1,'Chiều dài tờ giấy A4 khoảng [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'30'}),
  q(149,1,'Chiều cao học sinh lớp 1 khoảng [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'110'}),
  q(149,1,'Đếm số đơn vị dài:','counting',[{key:'d1',text:'📏'},{key:'d2',text:'📏'},{key:'d3',text:'📏'},{key:'d4',text:'📏'},{key:'d5',text:'📏'},{key:'d6',text:'📏'},{key:'d7',text:'📏'},{key:'d8',text:'📏'},{key:'d9',text:'📏'}],'9'),
  q(149,1,'Sắp xếp theo thứ tự ước lượng từ ngắn đến dài:','sorting',[{key:'1',text:'Ngón tay'},{key:'2',text:'Bàn học'},{key:'3',text:'Bút chì'},{key:'4',text:'Sân trường'}],['1','3','2','4']),
  q(149,1,'Gạch bỏ ước lượng sai:','cross_out',[{key:'A',text:'Bút chì dài 15cm'},{key:'B',text:'Ô tô dài 5cm'},{key:'C',text:'Ngón tay dài 5cm'},{key:'D',text:'Bàn học dài 5cm'}],['B','D']),

  // Exercise 2
  q(149,2,'Đo bằng gang tay, bàn dài 4 gang. Nếu gang = 18cm thì bàn dài bao nhiêu cm?','single_choice',[{key:'A',text:'22cm'},{key:'B',text:'72cm'},{key:'C',text:'14cm'}],'B'),
  q(149,2,'Hai bạn đo cùng vật, kết quả khác nhau. Nguyên nhân có thể là?','single_choice',[{key:'A',text:'Dùng thước khác nhau'},{key:'B',text:'Vật thay đổi kích thước'},{key:'C',text:'Ánh sáng khác nhau'}],'A'),
  q(149,2,'Chọn tất cả ước lượng hợp lý:','multiple_choice',[{key:'A',text:'Bút chì 15cm'},{key:'B',text:'Bàn học 60cm'},{key:'C',text:'Cửa nhà 200cm'},{key:'D',text:'Hạt gạo 50cm'}],['A','B','C']),
  q(149,2,'Chọn tất cả cách đo chính xác:','multiple_choice',[{key:'A',text:'Dùng thước kẻ'},{key:'B',text:'Ước lượng bằng mắt'},{key:'C',text:'Dùng thước dây'},{key:'D',text:'Dùng gang tay'}],['A','C']),
  q(149,2,'Ghép vật với ước lượng độ dài:','matching',[{key:'A',text:'Sách giáo khoa'},{key:'B',text:'Cây bút bi'},{key:'C',text:'Chiều cao cửa'}],{A:'20cm',B:'15cm',C:'200cm'}),
  q(149,2,'Ghép kết quả đo:','matching',[{key:'A',text:'Vật từ vạch 0 đến 12'},{key:'B',text:'Vật từ vạch 0 đến 25'},{key:'C',text:'Vật từ vạch 0 đến 8'}],{A:'12cm',B:'25cm',C:'8cm'}),
  q(149,2,'Kéo thả: sắp ước lượng từ ngắn đến dài','drag_drop',[{key:'A',text:'Bàn 60cm'},{key:'B',text:'Bút 15cm'},{key:'C',text:'Tẩy 5cm'},{key:'D',text:'Thước 30cm'}],['C','B','D','A']),
  q(149,2,'Bảng ước lượng và đo thực:','table_fill',[{key:'headers',text:'Vật|Ước lượng|Đo thực'},{key:'r1',text:'Bút|15cm|_r1c1'},{key:'r2',text:'Tẩy|5cm|_r2c1'},{key:'r3',text:'Thước|30cm|_r3c1'}],{r1c1:'18cm',r2c1:'6cm',r3c1:'30cm'}),
  q(149,2,'Đánh dấu ước lượng 20cm:','number_line',[{key:'min',text:'0'},{key:'max',text:'30'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20|25|30'},{key:'hidden',text:'20'}],['20']),
  q(149,2,'Ghép: ước lượng đúng cho bút chì','puzzle',[{key:'slot_est',text:'ước lượng bút chì'},{key:'tok_5',text:'5cm'},{key:'tok_15',text:'15cm'},{key:'tok_50',text:'50cm'}],{slot_est:'tok_15'}),

  // Exercise 3
  q(149,3,'Ước lượng bàn học dài 60cm. Đo thực tế: 65cm. Sai số là [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'5'}),
  q(149,3,'Đo dây ruy băng: đặt tại 0, kết thúc tại 45. Dây dài [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'45'}),
  q(149,3,'Xếp thứ tự ước lượng từ nhỏ đến lớn:','puzzle',[{key:'s1',text:'ngắn nhất'},{key:'s2',text:'thứ 2'},{key:'s3',text:'dài nhất'},{key:'tE',text:'Tẩy ~5cm'},{key:'tP',text:'Bút ~15cm'},{key:'tR',text:'Thước ~30cm'}],{s1:'tE',s2:'tP',s3:'tR'}),
  q(149,3,'Xếp đúng quy trình đo:','puzzle',[{key:'s1',text:'Bước 1'},{key:'s2',text:'Bước 2'},{key:'s3',text:'Bước 3'},{key:'s4',text:'Bước 4'},{key:'t1',text:'Chuẩn bị thước'},{key:'t2',text:'Đặt vật cạnh thước'},{key:'t3',text:'Căn vạch 0'},{key:'t4',text:'Đọc kết quả'}],{s1:'t1',s2:'t2',s3:'t3',s4:'t4'}),
  q(149,3,'Nối đôi: vật và cách đo phù hợp','game',[{key:'A',text:'Bút chì',pair:'1'},{key:'B',text:'Thước kẻ',pair:'1'},{key:'C',text:'Vải may',pair:'2'},{key:'D',text:'Thước dây',pair:'2'},{key:'E',text:'Chiều cao người',pair:'3'},{key:'F',text:'Thước đứng',pair:'3'}],{}),
  q(149,3,'Sắp xếp từ ngắn đến dài:','sorting',[{key:'1',text:'5cm'},{key:'2',text:'15cm'},{key:'3',text:'25cm'},{key:'4',text:'35cm'}],['1','2','3','4']),
  q(149,3,'Ghép: ước lượng với vật thực','matching',[{key:'A',text:'~5cm'},{key:'B',text:'~15cm'},{key:'C',text:'~200cm'}],{A:'Tẩy',B:'Bút',C:'Cửa'}),
  q(149,3,'Chọn tất cả ước lượng hợp lý cho lớp học:','multiple_choice',[{key:'A',text:'Chiều dài lớp học 8m'},{key:'B',text:'Chiều dài lớp học 8cm'},{key:'C',text:'Chiều rộng lớp học 6m'},{key:'D',text:'Chiều cao tường 3m'}],['A','C','D']),
  q(149,3,'Chọn tất cả dụng cụ đo độ dài:','multiple_choice',[{key:'A',text:'Thước kẻ'},{key:'B',text:'Cân đồng hồ'},{key:'C',text:'Thước dây'},{key:'D',text:'Thước cuộn'}],['A','C','D']),
  q(149,3,'Kéo thả: xếp từ ước lượng ngắn đến dài','drag_drop',[{key:'A',text:'Sân trường ~50m'},{key:'B',text:'Bút ~15cm'},{key:'C',text:'Ngón tay ~5cm'},{key:'D',text:'Bàn học ~60cm'}],['C','B','D','A']),

  // ============ LESSON 150: Luyện tập chung (đo độ dài) ============
  // Exercise 1
  q(150,1,'Đơn vị đo độ dài thông dụng nhất trong lớp học là?','single_choice',[{key:'A',text:'km'},{key:'B',text:'cm'},{key:'C',text:'m'}],'B'),
  q(150,1,'Thước kẻ 30cm, bút chì 18cm. Thước dài hơn bút bao nhiêu cm?','single_choice',[{key:'A',text:'10cm'},{key:'B',text:'12cm'},{key:'C',text:'48cm'}],'B'),
  q(150,1,'Sợi dây 25cm, cắt bỏ 10cm. Còn lại bao nhiêu cm?','single_choice',[{key:'A',text:'15cm'},{key:'B',text:'35cm'},{key:'C',text:'25cm'}],'A'),
  q(150,1,'20cm + 15cm = 35cm. Đúng hay sai?','true_false',null,true),
  q(150,1,'50cm - 30cm = 10cm. Đúng hay sai?','true_false',null,false),
  q(150,1,'Bút dài 17cm, tẩy dài 5cm. Tổng là [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'22'}),
  q(150,1,'Dây dài 40cm, dùng 15cm. Còn lại [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'25'}),
  q(150,1,'Đếm số thước kẻ:','counting',[{key:'d1',text:'📐'},{key:'d2',text:'📐'},{key:'d3',text:'📐'},{key:'d4',text:'📐'},{key:'d5',text:'📐'},{key:'d6',text:'📐'},{key:'d7',text:'📐'},{key:'d8',text:'📐'},{key:'d9',text:'📐'},{key:'d10',text:'📐'}],'10'),
  q(150,1,'Sắp xếp từ ngắn đến dài:','sorting',[{key:'1',text:'35cm'},{key:'2',text:'53cm'},{key:'3',text:'13cm'},{key:'4',text:'31cm'}],['3','4','1','2']),
  q(150,1,'Gạch bỏ phép tính sai:','cross_out',[{key:'A',text:'10cm+10cm=20cm'},{key:'B',text:'30cm-10cm=10cm'},{key:'C',text:'15cm+5cm=20cm'},{key:'D',text:'25cm-10cm=15cm'}],['B']),

  // Exercise 2
  q(150,2,'Chu vi hình vuông cạnh 5cm là bao nhiêu?','single_choice',[{key:'A',text:'10cm'},{key:'B',text:'20cm'},{key:'C',text:'25cm'}],'B'),
  q(150,2,'Bàn dài 80cm, ghế dài 40cm. Tổng chiều dài là?','single_choice',[{key:'A',text:'40cm'},{key:'B',text:'120cm'},{key:'C',text:'140cm'}],'B'),
  q(150,2,'Chọn tất cả phép tính đúng:','multiple_choice',[{key:'A',text:'12cm+8cm=20cm'},{key:'B',text:'25cm-5cm=20cm'},{key:'C',text:'30cm+10cm=50cm'},{key:'D',text:'40cm-15cm=25cm'}],['A','B','D']),
  q(150,2,'Chọn tất cả độ dài hợp lý:','multiple_choice',[{key:'A',text:'Bút chì: 15cm'},{key:'B',text:'Bàn học: 60cm'},{key:'C',text:'Cửa sổ: 100cm'},{key:'D',text:'Tẩy: 100cm'}],['A','B','C']),
  q(150,2,'Ghép phép tính với kết quả:','matching',[{key:'A',text:'10cm+15cm'},{key:'B',text:'30cm-12cm'},{key:'C',text:'20cm+20cm'}],{A:'25cm',B:'18cm',C:'40cm'}),
  q(150,2,'Ghép vật với độ dài:','matching',[{key:'A',text:'Tẩy'},{key:'B',text:'Bàn học'},{key:'C',text:'Thước 30cm'}],{A:'5cm',B:'60cm',C:'30cm'}),
  q(150,2,'Kéo thả: sắp phép tính theo kết quả tăng dần','drag_drop',[{key:'A',text:'5+5=10'},{key:'B',text:'10+15=25'},{key:'C',text:'5+10=15'},{key:'D',text:'10+20=30'}],['A','C','B','D']),
  q(150,2,'Bảng tính độ dài:','table_fill',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'15+5|_r1c1'},{key:'r2',text:'30-10|_r2c1'},{key:'r3',text:'20+15|_r3c1'}],{r1c1:'20cm',r2c1:'20cm',r3c1:'35cm'}),
  q(150,2,'Đánh dấu 25cm trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'50'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20|25|30|35|40|45|50'},{key:'hidden',text:'25'}],['25']),
  q(150,2,'Ghép: đáp án đúng cho phép tính 30-18=?','puzzle',[{key:'slot_ans',text:'kết quả'},{key:'tok_10',text:'10'},{key:'tok_12',text:'12'},{key:'tok_14',text:'14'}],{slot_ans:'tok_12'}),

  // Exercise 3
  q(150,3,'Bút A dài 18cm, bút B dài 12cm. Bút A dài hơn bút B [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'6'}),
  q(150,3,'Sợi dây dài 50cm, nối thêm 30cm. Tổng là [b1]cm','fill_blank',[{key:'b1',text:''}],{b1:'80'}),
  q(150,3,'Xếp thứ tự bài toán: tính chiều dài','puzzle',[{key:'s1',text:'Cho biết'},{key:'s2',text:'Tìm'},{key:'s3',text:'Phép tính'},{key:'s4',text:'Đáp án'},{key:'t1',text:'Bút 15cm, tẩy 5cm'},{key:'t2',text:'Tổng chiều dài'},{key:'t3',text:'15+5=20'},{key:'t4',text:'20cm'}],{s1:'t1',s2:'t2',s3:'t3',s4:'t4'}),
  q(150,3,'Ghép bài toán với đáp án:','puzzle',[{key:'s1',text:'30-12=?'},{key:'s2',text:'15+8=?'},{key:'tok_18',text:'18'},{key:'tok_23',text:'23'},{key:'tok_20',text:'20'}],{s1:'tok_18',s2:'tok_23'}),
  q(150,3,'Nối đôi: phép tính và kết quả','game',[{key:'A',text:'10+10',pair:'1'},{key:'B',text:'20',pair:'1'},{key:'C',text:'30-5',pair:'2'},{key:'D',text:'25',pair:'2'},{key:'E',text:'15+10',pair:'3'},{key:'F',text:'25',pair:'3'}],{}),
  q(150,3,'Sắp xếp kết quả từ nhỏ đến lớn:','sorting',[{key:'1',text:'10+5'},{key:'2',text:'20+10'},{key:'3',text:'5+5'},{key:'4',text:'15+10'}],['3','1','4','2']),
  q(150,3,'Ghép: vấn đề với cách giải','matching',[{key:'A',text:'Tính tổng hai chiều dài'},{key:'B',text:'Tính hiệu hai chiều dài'},{key:'C',text:'So sánh hai chiều dài'}],{A:'cộng',B:'trừ',C:'so sánh'}),
  q(150,3,'Chọn tất cả phép tính có kết quả bằng 20cm:','multiple_choice',[{key:'A',text:'15+5'},{key:'B',text:'25-5'},{key:'C',text:'10+10'},{key:'D',text:'30-5'}],['A','B','C']),
  q(150,3,'Chọn tất cả đúng:','multiple_choice',[{key:'A',text:'10cm < 20cm'},{key:'B',text:'30cm > 25cm'},{key:'C',text:'15cm = 15cm'},{key:'D',text:'5cm > 10cm'}],['A','B','C']),
  q(150,3,'Kéo thả theo thứ tự tăng dần kết quả:','drag_drop',[{key:'A',text:'10+10'},{key:'B',text:'5+5'},{key:'C',text:'15+5'},{key:'D',text:'10+15'}],['B','A','C','D']),

  // ============ LESSON 151: Phép cộng số có hai chữ số với số có một chữ số ============
  // Exercise 1
  q(151,1,'23 + 4 = ?','single_choice',[{key:'A',text:'27'},{key:'B',text:'26'},{key:'C',text:'28'}],'A'),
  q(151,1,'31 + 7 = ?','single_choice',[{key:'A',text:'37'},{key:'B',text:'38'},{key:'C',text:'39'}],'B'),
  q(151,1,'50 + 9 = ?','single_choice',[{key:'A',text:'58'},{key:'B',text:'59'},{key:'C',text:'60'}],'B'),
  q(151,1,'42 + 5 = 47. Đúng hay sai?','true_false',null,true),
  q(151,1,'64 + 3 = 68. Đúng hay sai?','true_false',null,false),
  q(151,1,'71 + 6 = [b1]','fill_blank',[{key:'b1',text:''}],{b1:'77'}),
  q(151,1,'35 + 4 = [b1]','fill_blank',[{key:'b1',text:''}],{b1:'39'}),
  q(151,1,'Đếm số quả cam (23 quả + 4 quả thêm):','counting',[{key:'d1',text:'🍊'},{key:'d2',text:'🍊'},{key:'d3',text:'🍊'},{key:'d4',text:'🍊'},{key:'d5',text:'🍊'},{key:'d6',text:'🍊'},{key:'d7',text:'🍊'}],'7'),
  q(151,1,'Sắp xếp kết quả từ nhỏ đến lớn:','sorting',[{key:'1',text:'21+5'},{key:'2',text:'11+5'},{key:'3',text:'41+5'},{key:'4',text:'31+5'}],['2','1','4','3']),
  q(151,1,'Gạch bỏ phép tính sai:','cross_out',[{key:'A',text:'20+5=25'},{key:'B',text:'32+3=36'},{key:'C',text:'41+7=48'},{key:'D',text:'53+6=59'}],['B']),

  // Exercise 2
  q(151,2,'Lớp 1A có 23 bạn, thêm 4 bạn chuyển đến. Tổng bao nhiêu bạn?','single_choice',[{key:'A',text:'26'},{key:'B',text:'27'},{key:'C',text:'28'}],'B'),
  q(151,2,'62 + ? = 69','single_choice',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B'),
  q(151,2,'Chọn tất cả phép tính có kết quả là 49:','multiple_choice',[{key:'A',text:'43+6'},{key:'B',text:'42+7'},{key:'C',text:'44+5'},{key:'D',text:'40+9'}],['A','B','C','D']),
  q(151,2,'Chọn tất cả phép tính đúng:','multiple_choice',[{key:'A',text:'25+3=28'},{key:'B',text:'34+5=39'},{key:'C',text:'42+6=49'},{key:'D',text:'51+8=59'}],['A','B','D']),
  q(151,2,'Ghép phép tính với kết quả:','matching',[{key:'A',text:'33+5'},{key:'B',text:'44+4'},{key:'C',text:'55+3'}],{A:'38',B:'48',C:'58'}),
  q(151,2,'Ghép số thiếu:','matching',[{key:'A',text:'21+?=27'},{key:'B',text:'34+?=38'},{key:'C',text:'52+?=59'}],{A:'6',B:'4',C:'7'}),
  q(151,2,'Kéo thả: sắp kết quả từ nhỏ đến lớn','drag_drop',[{key:'A',text:'72+5'},{key:'B',text:'12+5'},{key:'C',text:'52+5'},{key:'D',text:'32+5'}],['B','D','C','A']),
  q(151,2,'Bảng phép tính:','table_fill',[{key:'headers',text:'Số hạng 1|Số hạng 2|Tổng'},{key:'r1',text:'23|5|_r1c1'},{key:'r2',text:'46|3|_r2c1'},{key:'r3',text:'61|8|_r3c1'}],{r1c1:'28',r2c1:'49',r3c1:'69'}),
  q(151,2,'Đánh dấu kết quả 36+3 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'50'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50'},{key:'hidden',text:'39'}],['39']),
  q(151,2,'Ghép: kết quả đúng cho 75+4=?','puzzle',[{key:'slot_ans',text:'kết quả'},{key:'tok_78',text:'78'},{key:'tok_79',text:'79'},{key:'tok_80',text:'80'}],{slot_ans:'tok_79'}),

  // Exercise 3
  q(151,3,'Trong vườn có 45 cái cây, trồng thêm 3 cây. Hỏi có tất cả [b1] cái cây','fill_blank',[{key:'b1',text:''}],{b1:'48'}),
  q(151,3,'Số cần điền: 76 + [b1] = 79','fill_blank',[{key:'b1',text:''}],{b1:'3'}),
  q(151,3,'Xếp đúng: thực hiện phép tính 53+4','puzzle',[{key:'s1',text:'bước 1'},{key:'s2',text:'bước 2'},{key:'s3',text:'kết quả'},{key:'t1',text:'53+4'},{key:'t2',text:'50+3+4=50+7'},{key:'t3',text:'57'}],{s1:'t1',s2:'t2',s3:'t3'}),
  q(151,3,'Điền kết quả đúng:','puzzle',[{key:'s1',text:'26+3=?'},{key:'s2',text:'47+2=?'},{key:'tok_29',text:'29'},{key:'tok_49',text:'49'},{key:'tok_48',text:'48'}],{s1:'tok_29',s2:'tok_49'}),
  q(151,3,'Nối đôi: phép tính và kết quả','game',[{key:'A',text:'31+6',pair:'1'},{key:'B',text:'37',pair:'1'},{key:'C',text:'52+7',pair:'2'},{key:'D',text:'59',pair:'2'},{key:'E',text:'84+5',pair:'3'},{key:'F',text:'89',pair:'3'}],{}),
  q(151,3,'Sắp xếp kết quả từ lớn đến bé:','sorting',[{key:'1',text:'10+9'},{key:'2',text:'80+9'},{key:'3',text:'30+9'},{key:'4',text:'50+9'}],['2','4','3','1']),
  q(151,3,'Ghép bài toán với phép tính:','matching',[{key:'A',text:'24 bạn thêm 5 bạn'},{key:'B',text:'32 bút thêm 7 bút'},{key:'C',text:'61 cây thêm 8 cây'}],{A:'24+5=29',B:'32+7=39',C:'61+8=69'}),
  q(151,3,'Chọn tất cả phép tính có kết quả > 50:','multiple_choice',[{key:'A',text:'43+9'},{key:'B',text:'44+8'},{key:'C',text:'41+5'},{key:'D',text:'55+3'}],['A','B','D']),
  q(151,3,'Chọn tất cả phép tính đúng:','multiple_choice',[{key:'A',text:'73+6=79'},{key:'B',text:'82+5=87'},{key:'C',text:'91+4=96'},{key:'D',text:'60+7=68'}],['A','B','C']),
  q(151,3,'Kéo thả: sắp theo kết quả tăng dần','drag_drop',[{key:'A',text:'60+9'},{key:'B',text:'20+9'},{key:'C',text:'40+9'},{key:'D',text:'80+9'}],['B','C','A','D']),

  // ============ LESSON 152: Phép cộng số có hai chữ số với số có hai chữ số ============
  // Exercise 1
  q(152,1,'23 + 14 = ?','single_choice',[{key:'A',text:'36'},{key:'B',text:'37'},{key:'C',text:'38'}],'B'),
  q(152,1,'31 + 25 = ?','single_choice',[{key:'A',text:'55'},{key:'B',text:'56'},{key:'C',text:'57'}],'B'),
  q(152,1,'40 + 30 = ?','single_choice',[{key:'A',text:'60'},{key:'B',text:'70'},{key:'C',text:'80'}],'B'),
  q(152,1,'12 + 35 = 47. Đúng hay sai?','true_false',null,true),
  q(152,1,'24 + 33 = 58. Đúng hay sai?','true_false',null,false),
  q(152,1,'21 + 46 = [b1]','fill_blank',[{key:'b1',text:''}],{b1:'67'}),
  q(152,1,'53 + 24 = [b1]','fill_blank',[{key:'b1',text:''}],{b1:'77'}),
  q(152,1,'Đếm số khối hình (23+14):','counting',[{key:'d1',text:'□'},{key:'d2',text:'□'},{key:'d3',text:'□'},{key:'d4',text:'□'},{key:'d5',text:'□'},{key:'d6',text:'□'}],'6'),
  q(152,1,'Sắp xếp kết quả từ nhỏ đến lớn:','sorting',[{key:'1',text:'10+20'},{key:'2',text:'10+10'},{key:'3',text:'10+40'},{key:'4',text:'10+30'}],['2','1','4','3']),
  q(152,1,'Gạch bỏ phép tính sai:','cross_out',[{key:'A',text:'20+30=50'},{key:'B',text:'11+22=33'},{key:'C',text:'13+24=38'},{key:'D',text:'31+42=73'}],['C']),

  // Exercise 2
  q(152,2,'Lớp 1A có 23 bạn, lớp 1B có 24 bạn. Cả hai lớp có bao nhiêu bạn?','single_choice',[{key:'A',text:'46'},{key:'B',text:'47'},{key:'C',text:'48'}],'B'),
  q(152,2,'45 + ? = 79','single_choice',[{key:'A',text:'33'},{key:'B',text:'34'},{key:'C',text:'35'}],'B'),
  q(152,2,'Chọn tất cả phép tính có kết quả bằng 55:','multiple_choice',[{key:'A',text:'30+25'},{key:'B',text:'33+22'},{key:'C',text:'24+31'},{key:'D',text:'40+15'}],['A','B','C','D']),
  q(152,2,'Chọn tất cả phép tính đúng:','multiple_choice',[{key:'A',text:'12+24=36'},{key:'B',text:'31+45=76'},{key:'C',text:'20+60=80'},{key:'D',text:'14+23=38'}],['A','B','C']),
  q(152,2,'Ghép phép tính với kết quả:','matching',[{key:'A',text:'21+35'},{key:'B',text:'43+24'},{key:'C',text:'52+16'}],{A:'56',B:'67',C:'68'}),
  q(152,2,'Ghép số thiếu:','matching',[{key:'A',text:'21+?=45'},{key:'B',text:'34+?=56'},{key:'C',text:'52+?=74'}],{A:'24',B:'22',C:'22'}),
  q(152,2,'Kéo thả: sắp kết quả tăng dần','drag_drop',[{key:'A',text:'50+20'},{key:'B',text:'10+20'},{key:'C',text:'30+20'},{key:'D',text:'40+20'}],['B','C','D','A']),
  q(152,2,'Bảng phép cộng:','table_fill',[{key:'headers',text:'Số hạng 1|Số hạng 2|Tổng'},{key:'r1',text:'23|14|_r1c1'},{key:'r2',text:'41|37|_r2c1'},{key:'r3',text:'52|26|_r3c1'}],{r1c1:'37',r2c1:'78',r3c1:'78'}),
  q(152,2,'Đánh dấu kết quả 33+14 trên trục số:','number_line',[{key:'min',text:'0'},{key:'max',text:'100'},{key:'step',text:'10'},{key:'marks',text:'0|10|20|30|40|50|60|70|80|90|100'},{key:'hidden',text:'47'}],['47']),
  q(152,2,'Ghép: kết quả đúng cho 35+42=?','puzzle',[{key:'slot_ans',text:'kết quả'},{key:'tok_76',text:'76'},{key:'tok_77',text:'77'},{key:'tok_78',text:'78'}],{slot_ans:'tok_77'}),

  // Exercise 3
  q(152,3,'Vườn A có 35 cây, vườn B có 44 cây. Hai vườn có tất cả [b1] cây','fill_blank',[{key:'b1',text:''}],{b1:'79'}),
  q(152,3,'Số cần điền: 42 + [b1] = 65','fill_blank',[{key:'b1',text:''}],{b1:'23'}),
  q(152,3,'Xếp đúng: thực hiện phép tính 34+25','puzzle',[{key:'s1',text:'bước 1'},{key:'s2',text:'bước 2'},{key:'s3',text:'kết quả'},{key:'t1',text:'34+25'},{key:'t2',text:'(30+20)+(4+5)=50+9'},{key:'t3',text:'59'}],{s1:'t1',s2:'t2',s3:'t3'}),
  q(152,3,'Điền kết quả đúng:','puzzle',[{key:'s1',text:'26+13=?'},{key:'s2',text:'47+21=?'},{key:'tok_39',text:'39'},{key:'tok_68',text:'68'},{key:'tok_67',text:'67'}],{s1:'tok_39',s2:'tok_68'}),
  q(152,3,'Nối đôi: phép tính và kết quả','game',[{key:'A',text:'31+16',pair:'1'},{key:'B',text:'47',pair:'1'},{key:'C',text:'52+27',pair:'2'},{key:'D',text:'79',pair:'2'},{key:'E',text:'64+15',pair:'3'},{key:'F',text:'79',pair:'3'}],{}),
  q(152,3,'Sắp xếp kết quả từ lớn đến bé:','sorting',[{key:'1',text:'10+80'},{key:'2',text:'10+20'},{key:'3',text:'10+50'},{key:'4',text:'10+30'}],['1','3','4','2']),
  q(152,3,'Ghép bài toán với phép tính:','matching',[{key:'A',text:'23 quyển và 14 quyển'},{key:'B',text:'42 cây và 35 cây'},{key:'C',text:'61 bạn và 28 bạn'}],{A:'23+14=37',B:'42+35=77',C:'61+28=89'}),
  q(152,3,'Chọn tất cả phép tính có kết quả > 70:','multiple_choice',[{key:'A',text:'43+29'},{key:'B',text:'50+21'},{key:'C',text:'34+38'},{key:'D',text:'61+10'}],['A','C','D']),
  q(152,3,'Chọn tất cả phép tính đúng:','multiple_choice',[{key:'A',text:'23+34=57'},{key:'B',text:'41+38=79'},{key:'C',text:'52+27=79'},{key:'D',text:'60+30=80'}],['A','B','C']),
  q(152,3,'Kéo thả: sắp theo kết quả tăng dần','drag_drop',[{key:'A',text:'20+50'},{key:'B',text:'20+10'},{key:'C',text:'20+30'},{key:'D',text:'20+70'}],['B','C','A','D']),
];

async function main() {
  const db = await mysql.createConnection({
    host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'jFUnRCumnerGsGaPT5pR',
    database: 'songtute',
  });

  const lessonIds = [143,144,145,146,147,148,149,150,151,152];

  // Delete existing quizzes
  await db.execute(
    `DELETE FROM quizzes WHERE lessonId IN (${lessonIds.join(',')})`,
  );

  for (const lessonId of lessonIds) {
    const lessonQuizzes = quizzes.filter(q => q.lessonId === lessonId);
    for (const quiz of lessonQuizzes) {
      await db.execute(
        `INSERT INTO quizzes (lessonId, exerciseNumber, questionText, questionType, optionsJson, correctAnswerJson)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          quiz.lessonId,
          quiz.exerciseNumber,
          quiz.questionText,
          quiz.questionType,
          quiz.optionsJson !== null ? JSON.stringify(quiz.optionsJson) : null,
          JSON.stringify(quiz.correctAnswerJson),
        ],
      );
    }
    console.log(`✅ Lesson ${lessonId}: inserted ${lessonQuizzes.length} questions`);
  }

  await db.end();
}

main().catch(e => { console.error(e); process.exit(1); });
