import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const lessonIds = [125, 126];

const data: Record<number, { topic: string; questions: any[] }> = {
  125: {
    topic: 'Nhiều hơn, ít hơn, bằng nhau',
    questions: [
      // Exercise 1 - easy
      {ex:1,type:'single_choice',text:'5 con mèo và 3 con chó. Con nào nhiều hơn?',opts:[{key:'A',text:'Con chó'},{key:'B',text:'Con mèo'},{key:'C',text:'Bằng nhau'}],ans:'B',diff:'easy',exp:'5 > 3 nên con mèo nhiều hơn',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'4 quả táo và 4 quả cam. So sánh?',opts:[{key:'A',text:'Táo nhiều hơn'},{key:'B',text:'Cam nhiều hơn'},{key:'C',text:'Bằng nhau'}],ans:'C',diff:'easy',exp:'4 = 4 nên bằng nhau',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'2 con gà và 6 con vịt. Con nào ít hơn?',opts:[{key:'A',text:'Con vịt'},{key:'B',text:'Con gà'},{key:'C',text:'Bằng nhau'}],ans:'B',diff:'easy',exp:'2 < 6 nên con gà ít hơn',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Nhóm A có 7 phần tử, nhóm B có 9 phần tử. Nhóm nào nhiều hơn?',opts:[{key:'A',text:'Nhóm A'},{key:'B',text:'Nhóm B'},{key:'C',text:'Bằng nhau'}],ans:'B',diff:'easy',exp:'9 > 7 nên nhóm B nhiều hơn',pts:10,sort:4},
      {ex:1,type:'true_false',text:'3 con chim ít hơn 5 con chim. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 3 < 5',pts:10,sort:5},
      {ex:1,type:'true_false',text:'6 bông hoa nhiều hơn 8 bông hoa. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 6 < 8, nên 6 bông ít hơn',pts:10,sort:6},
      {ex:1,type:'true_false',text:'5 quả cam bằng 5 quả táo về số lượng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 5 = 5',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'3 < [b1] < 5, điền số còn thiếu',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'easy',exp:'4 nằm giữa 3 và 5',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'Nhóm A có 2 phần tử, nhóm B có [b1] phần tử, nhóm A ít hơn nhóm B 3 phần tử',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'easy',exp:'2 + 3 = 5',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'8 nhiều hơn 5 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'3'},diff:'easy',exp:'8 - 5 = 3',pts:10,sort:10},
      // Exercise 2 - easy
      {ex:2,type:'counting',text:'Đếm: 🍎🍎🍎 và 🍊🍊🍊🍊🍊. Quả nào nhiều hơn và nhiều hơn bao nhiêu?',opts:[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍊'},{key:'d5',text:'🍊'},{key:'d6',text:'🍊'},{key:'d7',text:'🍊'},{key:'d8',text:'🍊'}],ans:'5',diff:'easy',exp:'Cam có 5 quả, táo có 3 quả. Cam nhiều hơn',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm số hình vuông: □□□□□□',opts:[{key:'d1',text:'□'},{key:'d2',text:'□'},{key:'d3',text:'□'},{key:'d4',text:'□'},{key:'d5',text:'□'},{key:'d6',text:'□'}],ans:'6',diff:'easy',exp:'Đếm: 1-6 hình vuông',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm số hình tròn: ○○○○',opts:[{key:'d1',text:'○'},{key:'d2',text:'○'},{key:'d3',text:'○'},{key:'d4',text:'○'}],ans:'4',diff:'easy',exp:'Đếm: 1-4 hình tròn',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp từ ít đến nhiều: 7 con, 3 con, 5 con, 9 con',opts:[{key:'1',text:'3 con'},{key:'2',text:'5 con'},{key:'3',text:'7 con'},{key:'4',text:'9 con'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 3, 5, 7, 9',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp từ nhiều đến ít: 4 bút, 8 bút, 2 bút, 6 bút',opts:[{key:'1',text:'8 bút'},{key:'2',text:'6 bút'},{key:'3',text:'4 bút'},{key:'4',text:'2 bút'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 8, 6, 4, 2',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ ít đến nhiều: 10, 4, 7',opts:[{key:'1',text:'4'},{key:'2',text:'7'},{key:'3',text:'10'}],ans:['1','2','3'],diff:'easy',exp:'Thứ tự: 4, 7, 10',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ số nhiều hơn 5: 3, 7, 4, 9',opts:[{key:'A',text:'3'},{key:'B',text:'7'},{key:'C',text:'4'},{key:'D',text:'9'}],ans:['B','D'],diff:'easy',exp:'7 và 9 đều lớn hơn 5',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ số ít hơn 6: 8, 4, 2, 7',opts:[{key:'A',text:'8'},{key:'B',text:'4'},{key:'C',text:'2'},{key:'D',text:'7'}],ans:['B','C'],diff:'easy',exp:'4 và 2 đều nhỏ hơn 6',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'5 ít hơn 8 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'3'},diff:'easy',exp:'8 - 5 = 3',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'Nhóm A có [b1] phần tử nhiều hơn nhóm B 2 phần tử. Nhóm B có 4 phần tử.',opts:[{key:'b1',text:'?'}],ans:{b1:'6'},diff:'easy',exp:'4 + 2 = 6',pts:10,sort:20},
      // Exercise 3 - easy
      {ex:3,type:'single_choice',text:'Dùng dấu nào để so sánh: 5 _ 7?',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'B',diff:'easy',exp:'5 < 7',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Dùng dấu nào: 8 _ 8?',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'C',diff:'easy',exp:'8 = 8',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Dùng dấu nào: 9 _ 6?',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'A',diff:'easy',exp:'9 > 6',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'Nhóm nào có số phần tử bằng nhau? A:4&4 B:3&5 C:7&8',opts:[{key:'A',text:'A: 4 và 4'},{key:'B',text:'B: 3 và 5'},{key:'C',text:'C: 7 và 8'}],ans:'A',diff:'easy',exp:'4 = 4 nên nhóm A bằng nhau',pts:10,sort:24},
      {ex:3,type:'true_false',text:'10 nhiều hơn 7 là 3. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 10 - 7 = 3',pts:10,sort:25},
      {ex:3,type:'true_false',text:'4 ít hơn 2 là 2. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 4 > 2, 4 nhiều hơn 2 là 2',pts:10,sort:26},
      {ex:3,type:'true_false',text:'6 và 6 là bằng nhau. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 6 = 6',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'7 nhiều hơn 4 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'3'},diff:'easy',exp:'7 - 4 = 3',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'[b1] ít hơn 9 là 2, tìm [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'7'},diff:'easy',exp:'9 - 2 = 7',pts:10,sort:29},
      {ex:3,type:'counting',text:'Đếm: có 🐶🐶🐶🐶🐶 và 🐱🐱🐱. Chó nhiều hơn mèo bao nhiêu?',opts:[{key:'d1',text:'🐶'},{key:'d2',text:'🐶'},{key:'d3',text:'🐶'},{key:'d4',text:'🐶'},{key:'d5',text:'🐶'},{key:'d6',text:'🐱'},{key:'d7',text:'🐱'},{key:'d8',text:'🐱'}],ans:'5',diff:'easy',exp:'Chó có 5 con, mèo có 3 con. Chó nhiều hơn 2 con',pts:10,sort:30},
      // Exercise 4 - medium
      {ex:4,type:'single_choice',text:'Lớp A có 7 học sinh, lớp B có 5 học sinh. Lớp A nhiều hơn lớp B mấy học sinh?',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'12'}],ans:'A',diff:'medium',exp:'7 - 5 = 2 học sinh',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'Bình có 4 viên bi, Nam có 9 viên bi. Nam nhiều hơn Bình mấy viên?',opts:[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],ans:'B',diff:'medium',exp:'9 - 4 = 5 viên bi',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Để có số quả cam bằng số quả táo (táo=8), cần thêm mấy quả cam (cam hiện có=5)?',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],ans:'B',diff:'medium',exp:'8 - 5 = 3 quả',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Số nào nhiều hơn 5? (Chọn tất cả)',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'10'}],ans:['B','C','D'],diff:'medium',exp:'6, 7, 10 đều lớn hơn 5',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Cặp số nào bằng nhau?',opts:[{key:'A',text:'3 và 3'},{key:'B',text:'5 và 6'},{key:'C',text:'7 và 7'},{key:'D',text:'8 và 9'}],ans:['A','C'],diff:'medium',exp:'3=3 và 7=7',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Số nào ít hơn 8?',opts:[{key:'A',text:'9'},{key:'B',text:'5'},{key:'C',text:'3'},{key:'D',text:'10'}],ans:['B','C'],diff:'medium',exp:'5 < 8 và 3 < 8',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối quan hệ đúng',opts:[{key:'A',text:'3 _ 5'},{key:'B',text:'7 _ 7'},{key:'C',text:'9 _ 6'}],ans:{A:'<',B:'=',C:'>'},diff:'medium',exp:'3<5, 7=7, 9>6',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối với từ thích hợp',opts:[{key:'A',text:'4 so với 7'},{key:'B',text:'8 so với 3'},{key:'C',text:'5 so với 5'}],ans:{A:'ít hơn',B:'nhiều hơn',C:'bằng'},diff:'medium',exp:'4<7, 8>3, 5=5',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo dấu so sánh vào chỗ trống: 6 _ 4',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['A'],diff:'medium',exp:'6 > 4',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo dấu so sánh: 3 _ 8',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['B'],diff:'medium',exp:'3 < 8',pts:10,sort:40},
      // Exercise 5 - medium
      {ex:5,type:'table_fill',text:'So sánh và điền dấu vào bảng',opts:[{key:'headers',text:'Số A|Số B|So sánh'},{key:'r1',text:'4|7|_r1c1'},{key:'r2',text:'9|5|_r2c1'},{key:'r3',text:'6|6|_r3c1'}],ans:{r1c1:'<',r2c1:'>',r3c1:'='},diff:'medium',exp:'4<7, 9>5, 6=6',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền số còn thiếu vào bảng',opts:[{key:'headers',text:'Nhóm A|Nhóm B|Chênh lệch'},{key:'r1',text:'8|5|_r1c1'},{key:'r2',text:'3|7|_r2c1'}],ans:{r1c1:'3',r2c1:'4'},diff:'medium',exp:'8-5=3, 7-3=4',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Điểm nào trên tia số biểu thị "nhiều hơn 5 là 2"?',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'7'}],ans:['7'],diff:'medium',exp:'5 + 2 = 7',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Trên tia số, số nào ít hơn 9 là 3?',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'6'}],ans:['6'],diff:'medium',exp:'9 - 3 = 6',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Điền số: _ nhiều hơn 4 là 3',opts:[{key:'slot_1',text:'[?] nhiều hơn 4 là 3'},{key:'token_1',text:'6'},{key:'token_2',text:'7'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'medium',exp:'4 + 3 = 7',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Điền số: _ ít hơn 10 là 4',opts:[{key:'slot_1',text:'[?] ít hơn 10 là 4'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],ans:{slot_1:'token_2'},diff:'medium',exp:'10 - 4 = 6',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'Điền dấu: 5 [?] 8',opts:[{key:'slot_1',text:'5 [?] 8'},{key:'token_1',text:'>'},{key:'token_2',text:'<'},{key:'token_3',text:'='}],ans:{slot_1:'token_2'},diff:'medium',exp:'5 < 8',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối câu với kết quả đúng',opts:[{key:'A',text:'5 nhiều hơn 2 là'},{key:'B',text:'8 ít hơn 10 là'},{key:'C',text:'7 và 7 là'}],ans:{A:'3',B:'2',C:'bằng nhau'},diff:'medium',exp:'5-2=3, 10-8=2, 7=7',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối từ với dấu toán học',opts:[{key:'A',text:'nhiều hơn'},{key:'B',text:'ít hơn'},{key:'C',text:'bằng nhau'}],ans:{A:'>',B:'<',C:'='},diff:'medium',exp:'Nhiều hơn=>, ít hơn=<, bằng nhau==',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Kéo số vào để 3 nhóm bằng nhau (mỗi nhóm 4): Nhóm A có _, nhóm B có 4, nhóm C có 4',opts:[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'3'}],ans:['A'],diff:'medium',exp:'Mỗi nhóm phải có 4 để bằng nhau',pts:10,sort:50},
      // Exercise 6 - hard
      {ex:6,type:'fill_blank',text:'Minh có 6 nhãn vở, Hoa có nhiều hơn Minh 3 nhãn. Hoa có [b1] nhãn',opts:[{key:'b1',text:'?'}],ans:{b1:'9'},diff:'hard',exp:'6 + 3 = 9 nhãn',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'Lớp 1A có 8 bạn gái, ít hơn bạn trai 2 bạn. Lớp có [b1] bạn trai',opts:[{key:'b1',text:'?'}],ans:{b1:'10'},diff:'hard',exp:'8 + 2 = 10 bạn trai',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Hai nhóm có tổng 10 phần tử, nhóm A có 6. Nhóm B có [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'hard',exp:'10 - 6 = 4',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Số A nhiều hơn số B là 3, số B là 5. Số A là?',opts:[{key:'slot_1',text:'Số A = [?]'},{key:'token_1',text:'7'},{key:'token_2',text:'8'},{key:'token_3',text:'9'}],ans:{slot_1:'token_2'},diff:'hard',exp:'5 + 3 = 8',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'Số X ít hơn 10 là 4. Số X là?',opts:[{key:'slot_1',text:'Số X = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],ans:{slot_1:'token_2'},diff:'hard',exp:'10 - 4 = 6',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Để A bằng B=9, cần thêm vào A bao nhiêu? (A hiện có 5)',opts:[{key:'slot_1',text:'Cần thêm [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],ans:{slot_1:'token_2'},diff:'hard',exp:'9 - 5 = 4',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả câu ĐÚNG',opts:[{key:'A',text:'7 nhiều hơn 5 là 2'},{key:'B',text:'3 ít hơn 6 là 3'},{key:'C',text:'8 và 8 bằng nhau'},{key:'D',text:'9 ít hơn 7 là 2'}],ans:['A','B','C'],diff:'hard',exp:'7-5=2, 6-3=3, 8=8; 9>7 không phải ít hơn',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Số nào khi thêm 3 sẽ bằng 10?',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'5'}],ans:['B'],diff:'hard',exp:'7 + 3 = 10',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp theo thứ tự từ ít đến nhiều: 5 con, 9 con, 2 con, 7 con',opts:[{key:'1',text:'2 con'},{key:'2',text:'5 con'},{key:'3',text:'7 con'},{key:'4',text:'9 con'}],ans:['1','2','3','4'],diff:'hard',exp:'2, 5, 7, 9 tăng dần',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp từ nhiều đến ít: 8 bút, 3 bút, 10 bút, 6 bút',opts:[{key:'1',text:'10 bút'},{key:'2',text:'8 bút'},{key:'3',text:'6 bút'},{key:'4',text:'3 bút'}],ans:['1','2','3','4'],diff:'hard',exp:'10, 8, 6, 3 giảm dần',pts:10,sort:60},
      // Exercise 7 - hard
      {ex:7,type:'game',text:'Nhóm theo quan hệ so với số 5: nhiều hơn 5 và ít hơn 5',opts:[{key:'c1',text:'3',pair:'ít hơn 5'},{key:'c2',text:'1',pair:'ít hơn 5'},{key:'c3',text:'4',pair:'ít hơn 5'},{key:'c4',text:'7',pair:'nhiều hơn 5'},{key:'c5',text:'9',pair:'nhiều hơn 5'},{key:'c6',text:'6',pair:'nhiều hơn 5'}],ans:{},diff:'hard',exp:'Ít hơn 5: 1,3,4; Nhiều hơn 5: 6,7,9',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm theo từ "nhiều hơn" và "ít hơn" trong câu',opts:[{key:'c1',text:'7 nhiều hơn 4',pair:'nhiều hơn'},{key:'c2',text:'3 ít hơn 8',pair:'ít hơn'},{key:'c3',text:'9 nhiều hơn 2',pair:'nhiều hơn'},{key:'c4',text:'1 ít hơn 5',pair:'ít hơn'}],ans:{},diff:'hard',exp:'Nhóm nhiều hơn và ít hơn',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối câu hỏi với đáp án',opts:[{key:'A',text:'8 nhiều hơn 5 là mấy?'},{key:'B',text:'Số nào ít hơn 7 là 2?'},{key:'C',text:'Thêm mấy vào 4 để được 9?'}],ans:{A:'3',B:'5',C:'5'},diff:'hard',exp:'8-5=3, 7-2=5, 9-4=5',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối tình huống với phép tính',opts:[{key:'A',text:'Hơn 3 phần tử'},{key:'B',text:'Kém 2 phần tử'},{key:'C',text:'Bằng nhau'}],ans:{A:'+3',B:'-2',C:'+0'},diff:'hard',exp:'Nhiều hơn=cộng, ít hơn=trừ, bằng=giữ nguyên',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối các cặp số có hiệu bằng nhau',opts:[{key:'A',text:'8-5'},{key:'B',text:'7-4'},{key:'C',text:'9-6'}],ans:{A:'3',B:'3',C:'3'},diff:'hard',exp:'8-5=3, 7-4=3, 9-6=3 đều bằng 3',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'An có 7 kẹo, Bình có ít hơn An 3 kẹo. Bình có [b1] kẹo',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'hard',exp:'7 - 3 = 4 kẹo',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'Có [b1] số nằm giữa 3 và 8 (không kể 3 và 8)',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'hard',exp:'4, 5, 6, 7 nằm giữa 3 và 8, có 4 số',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Để 6 và 9 bằng nhau, cần bớt [b1] ở số lớn hơn',opts:[{key:'b1',text:'?'}],ans:{b1:'3'},diff:'hard',exp:'9 - 3 = 6',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo dấu đúng: 7 _ 4 (ít hơn hay nhiều hơn?)',opts:[{key:'A',text:'nhiều hơn'},{key:'B',text:'ít hơn'},{key:'C',text:'bằng'}],ans:['A'],diff:'hard',exp:'7 nhiều hơn 4',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo số để hoàn thành: _ nhiều hơn 6 là 3',opts:[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],ans:['B'],diff:'hard',exp:'6 + 3 = 9',pts:10,sort:70},
      // Exercise 8 - hard
      {ex:8,type:'multiple_choice',text:'Chọn tất cả câu đúng về so sánh',opts:[{key:'A',text:'4 < 7'},{key:'B',text:'9 > 5'},{key:'C',text:'6 = 6'},{key:'D',text:'3 > 8'}],ans:['A','B','C'],diff:'hard',exp:'4<7, 9>5, 6=6 đúng; 3>8 sai',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Câu nào diễn tả đúng mối quan hệ "nhiều hơn"?',opts:[{key:'A',text:'5 nhiều hơn 8'},{key:'B',text:'9 nhiều hơn 7'},{key:'C',text:'10 nhiều hơn 6'},{key:'D',text:'3 nhiều hơn 4'}],ans:['B','C'],diff:'hard',exp:'9>7 và 10>6 đúng',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Số nào khi bớt đi 3 thì bằng 6?',opts:[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'},{key:'D',text:'7'}],ans:['B'],diff:'hard',exp:'9 - 3 = 6',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'Cả hai nhóm cộng lại được 12. Nhóm 1 có 5. Nhóm 2 có?',opts:[{key:'slot_1',text:'Nhóm 2 có [?]'},{key:'token_1',text:'6'},{key:'token_2',text:'7'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'hard',exp:'12 - 5 = 7',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'Số A nhiều hơn số B là 4, tổng A+B=10. Số A là?',opts:[{key:'slot_1',text:'Số A = [?]'},{key:'token_1',text:'6'},{key:'token_2',text:'7'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'hard',exp:'A=7, B=3; 7+3=10 và 7-3=4',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Để nhóm A (5 phần tử) bằng nhóm B (8 phần tử), thêm vào A bao nhiêu?',opts:[{key:'slot_1',text:'Thêm [?] vào nhóm A'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],ans:{slot_1:'token_2'},diff:'hard',exp:'8 - 5 = 3',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp theo chênh lệch tăng dần: (7-5), (9-4), (8-7), (10-6)',opts:[{key:'1',text:'8-7=1'},{key:'2',text:'7-5=2'},{key:'3',text:'10-6=4'},{key:'4',text:'9-4=5'}],ans:['1','2','3','4'],diff:'hard',exp:'1, 2, 4, 5 tăng dần',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp từ ít hơn đến nhiều hơn so với 5: (3), (1), (8), (7)',opts:[{key:'1',text:'1'},{key:'2',text:'3'},{key:'3',text:'7'},{key:'4',text:'8'}],ans:['1','2','3','4'],diff:'hard',exp:'1<3<5<7<8',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ câu sai: "6 nhiều hơn 3 là 3", "4 ít hơn 7 là 3", "5 ít hơn 2 là 3"',opts:[{key:'A',text:'6 nhiều hơn 3 là 3'},{key:'B',text:'4 ít hơn 7 là 3'},{key:'C',text:'5 ít hơn 2 là 3'}],ans:['C'],diff:'hard',exp:'5 > 2 nên không thể ít hơn',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ so sánh SAI: 3<7, 8>5, 4=5, 9>10',opts:[{key:'A',text:'3 < 7'},{key:'B',text:'8 > 5'},{key:'C',text:'4 = 5'},{key:'D',text:'9 > 10'}],ans:['C','D'],diff:'hard',exp:'4≠5 và 9<10',pts:10,sort:80},
    ]
  },
  126: {
    topic: 'So sánh số (>, <, =)',
    questions: [
      // Exercise 1 - easy
      {ex:1,type:'single_choice',text:'Dấu nào đúng? 5 _ 3',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'A',diff:'easy',exp:'5 > 3',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'Dấu nào đúng? 4 _ 7',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'B',diff:'easy',exp:'4 < 7',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'Dấu nào đúng? 6 _ 6',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:'C',diff:'easy',exp:'6 = 6',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Biểu thức nào đúng?',opts:[{key:'A',text:'3 > 5'},{key:'B',text:'8 < 6'},{key:'C',text:'9 > 7'}],ans:'C',diff:'easy',exp:'9 > 7 đúng',pts:10,sort:4},
      {ex:1,type:'true_false',text:'2 < 4 là đúng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 2 nhỏ hơn 4',pts:10,sort:5},
      {ex:1,type:'true_false',text:'7 > 9 là đúng. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 7 < 9',pts:10,sort:6},
      {ex:1,type:'true_false',text:'5 = 5 là đúng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 5 bằng 5',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'6 [b1] 4 (điền dấu so sánh)',opts:[{key:'b1',text:'?'}],ans:{b1:'>'},diff:'easy',exp:'6 > 4',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'3 [b1] 8 (điền dấu so sánh)',opts:[{key:'b1',text:'?'}],ans:{b1:'<'},diff:'easy',exp:'3 < 8',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'7 [b1] 7 (điền dấu so sánh)',opts:[{key:'b1',text:'?'}],ans:{b1:'='},diff:'easy',exp:'7 = 7',pts:10,sort:10},
      // Exercise 2 - easy
      {ex:2,type:'counting',text:'Đếm và so sánh: 🍎🍎🍎🍎 và 🍊🍊🍊🍊🍊🍊',opts:[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍊'},{key:'d6',text:'🍊'},{key:'d7',text:'🍊'},{key:'d8',text:'🍊'},{key:'d9',text:'🍊'},{key:'d10',text:'🍊'}],ans:'6',diff:'easy',exp:'Táo có 4, Cam có 6. Chọn số Cam',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm: 🐦🐦🐦🐦🐦🐦🐦🐦',opts:[{key:'d1',text:'🐦'},{key:'d2',text:'🐦'},{key:'d3',text:'🐦'},{key:'d4',text:'🐦'},{key:'d5',text:'🐦'},{key:'d6',text:'🐦'},{key:'d7',text:'🐦'},{key:'d8',text:'🐦'}],ans:'8',diff:'easy',exp:'8 con chim',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm: ★★★★★',opts:[{key:'d1',text:'★'},{key:'d2',text:'★'},{key:'d3',text:'★'},{key:'d4',text:'★'},{key:'d5',text:'★'}],ans:'5',diff:'easy',exp:'5 ngôi sao',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp các dấu theo số tương ứng tăng dần: 8>5, 2<4, 7=7, 3<9',opts:[{key:'1',text:'2<4 (số 2)'},{key:'2',text:'3<9 (số 3)'},{key:'3',text:'5<8 (số 5)'},{key:'4',text:'7=7 (số 7)'}],ans:['1','2','3','4'],diff:'easy',exp:'2, 3, 5, 7 tăng dần',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp từ lớn đến nhỏ: 4, 10, 1, 7',opts:[{key:'1',text:'10'},{key:'2',text:'7'},{key:'3',text:'4'},{key:'4',text:'1'}],ans:['1','2','3','4'],diff:'easy',exp:'10, 7, 4, 1 giảm dần',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ nhỏ đến lớn: 9, 3, 6',opts:[{key:'1',text:'3'},{key:'2',text:'6'},{key:'3',text:'9'}],ans:['1','2','3'],diff:'easy',exp:'3, 6, 9 tăng dần',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ so sánh SAI: 3<5, 8>4, 6>9',opts:[{key:'A',text:'3 < 5'},{key:'B',text:'8 > 4'},{key:'C',text:'6 > 9'}],ans:['C'],diff:'easy',exp:'6 < 9, không phải lớn hơn',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ so sánh SAI: 7>3, 2=2, 5>8',opts:[{key:'A',text:'7 > 3'},{key:'B',text:'2 = 2'},{key:'C',text:'5 > 8'}],ans:['C'],diff:'easy',exp:'5 < 8, không phải lớn hơn',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'9 [b1] 6 > 5 (điền dấu để thành chuỗi đúng)',opts:[{key:'b1',text:'?'}],ans:{b1:'>'},diff:'easy',exp:'9 > 6 > 5',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'2 < [b1] < 5',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'easy',exp:'3 hoặc 4, nhưng đáp án là 4 (lớn nhất trong khoảng)',pts:10,sort:20},
      // Exercise 3 - easy
      {ex:3,type:'single_choice',text:'Phép so sánh nào đúng?',opts:[{key:'A',text:'4 > 6'},{key:'B',text:'3 = 5'},{key:'C',text:'8 > 2'}],ans:'C',diff:'easy',exp:'8 > 2 đúng',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Phép so sánh nào sai?',opts:[{key:'A',text:'5 < 9'},{key:'B',text:'7 > 4'},{key:'C',text:'6 > 8'}],ans:'C',diff:'easy',exp:'6 < 8, không phải lớn hơn',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Số nào điền vào: _ > 5?',opts:[{key:'A',text:'4'},{key:'B',text:'3'},{key:'C',text:'7'}],ans:'C',diff:'easy',exp:'7 > 5',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'Số nào điền vào: _ < 4?',opts:[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'3'}],ans:'C',diff:'easy',exp:'3 < 4',pts:10,sort:24},
      {ex:3,type:'true_false',text:'3 < 7 < 10 là đúng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 3 < 7 và 7 < 10',pts:10,sort:25},
      {ex:3,type:'true_false',text:'9 > 6 > 2 là đúng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 9 > 6 và 6 > 2',pts:10,sort:26},
      {ex:3,type:'true_false',text:'4 < 3 < 1 là đúng. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 4 > 3 > 1',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'Điền số: _ > 8',opts:[{key:'b1',text:'?'}],ans:{b1:'9'},diff:'easy',exp:'9 > 8 (hoặc 10)',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'Điền số: _ < 3',opts:[{key:'b1',text:'?'}],ans:{b1:'2'},diff:'easy',exp:'2 < 3 (hoặc 0, 1)',pts:10,sort:29},
      {ex:3,type:'counting',text:'So sánh: 🌟🌟🌟 _ 🌟🌟🌟🌟🌟 (điền dấu)',opts:[{key:'d1',text:'🌟'},{key:'d2',text:'🌟'},{key:'d3',text:'🌟'},{key:'d4',text:'🌟'},{key:'d5',text:'🌟'},{key:'d6',text:'🌟'},{key:'d7',text:'🌟'},{key:'d8',text:'🌟'}],ans:'8',diff:'easy',exp:'3 < 5',pts:10,sort:30},
      // Exercise 4 - medium
      {ex:4,type:'single_choice',text:'Điền số đúng vào: 5 < _ < 8',opts:[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'9'}],ans:'B',diff:'medium',exp:'6 nằm giữa 5 và 8',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'Điền số đúng: _ > 7',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'9'}],ans:'C',diff:'medium',exp:'9 > 7',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Biểu thức nào luôn đúng với mọi số a trong 0-10?',opts:[{key:'A',text:'a > 0'},{key:'B',text:'a < 10'},{key:'C',text:'a = a'}],ans:'C',diff:'medium',exp:'a = a luôn đúng',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Chọn tất cả so sánh đúng',opts:[{key:'A',text:'5 > 3'},{key:'B',text:'8 > 10'},{key:'C',text:'2 < 7'},{key:'D',text:'6 = 6'}],ans:['A','C','D'],diff:'medium',exp:'5>3, 2<7, 6=6 đúng; 8<10 sai',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Số nào có thể điền vào: _ < 6?',opts:[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'7'},{key:'D',text:'1'}],ans:['A','B','D'],diff:'medium',exp:'3, 5, 1 đều nhỏ hơn 6',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Số nào có thể điền vào: _ > 7?',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'9'},{key:'D',text:'10'}],ans:['B','C','D'],diff:'medium',exp:'8, 9, 10 đều lớn hơn 7',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối số với dấu so sánh thích hợp (so với 5)',opts:[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'8'}],ans:{A:'<',B:'=',C:'>'},diff:'medium',exp:'3<5, 5=5, 8>5',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối so sánh đúng',opts:[{key:'A',text:'2+3 _ 6'},{key:'B',text:'4+4 _ 8'},{key:'C',text:'7-2 _ 4'}],ans:{A:'<',B:'=',C:'>'},diff:'medium',exp:'5<6, 8=8, 5>4',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo dấu so sánh: 3+4 _ 8',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['B'],diff:'medium',exp:'3+4=7 < 8',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo dấu: 5+5 _ 10',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['C'],diff:'medium',exp:'5+5=10=10',pts:10,sort:40},
      // Exercise 5 - medium
      {ex:5,type:'table_fill',text:'Điền dấu so sánh vào bảng',opts:[{key:'headers',text:'Biểu thức A|Dấu|Biểu thức B'},{key:'r1',text:'2+3|_r1c1|6'},{key:'r2',text:'4+5|_r2c1|8'},{key:'r3',text:'3+3|_r3c1|6'}],ans:{r1c1:'<',r2c1:'>',r3c1:'='},diff:'medium',exp:'5<6, 9>8, 6=6',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền số thích hợp',opts:[{key:'headers',text:'Dấu|Số A|Số B'},{key:'r1',text:'<|3|_r1c1'},{key:'r2',text:'>|_r2c1|5'}],ans:{r1c1:'5',r2c1:'7'},diff:'medium',exp:'3<5, 7>5',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Trên tia số 0-10, điểm nào thỏa mãn > 5 và < 8?',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'6'}],ans:['6'],diff:'medium',exp:'6 thỏa mãn 5 < 6 < 8',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Tìm số trên tia số thỏa mãn > 3 và < 6',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'4'}],ans:['4'],diff:'medium',exp:'4 thỏa mãn 3 < 4 < 6',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Điền số: 3 + ? > 7',opts:[{key:'slot_1',text:'3 + [?] > 7'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],ans:{slot_1:'token_2'},diff:'medium',exp:'3 + 5 = 8 > 7',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Điền số: ? - 3 < 5',opts:[{key:'slot_1',text:'[?] - 3 < 5'},{key:'token_1',text:'6'},{key:'token_2',text:'7'},{key:'token_3',text:'8'}],ans:{slot_1:'token_1'},diff:'medium',exp:'6 - 3 = 3 < 5',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'Điền dấu: 4+3 [?] 6+1',opts:[{key:'slot_1',text:'4+3 [?] 6+1'},{key:'token_1',text:'>'},{key:'token_2',text:'<'},{key:'token_3',text:'='}],ans:{slot_1:'token_3'},diff:'medium',exp:'7 = 7',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối để tạo so sánh đúng',opts:[{key:'A',text:'5+2'},{key:'B',text:'8-3'},{key:'C',text:'3+3'}],ans:{A:'=7',B:'=5',C:'=6'},diff:'medium',exp:'5+2=7, 8-3=5, 3+3=6',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối so sánh với kết quả đúng/sai',opts:[{key:'A',text:'6 > 8'},{key:'B',text:'3 < 5'},{key:'C',text:'7 = 7'}],ans:{A:'Sai',B:'Đúng',C:'Đúng'},diff:'medium',exp:'6<8 nên 6>8 sai; 3<5 đúng; 7=7 đúng',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Sắp xếp theo thứ tự: 3 _ 1, 5 _ 7, 4 _ 4',opts:[{key:'A',text:'3>1'},{key:'B',text:'5<7'},{key:'C',text:'4=4'}],ans:['A','B','C'],diff:'medium',exp:'3>1, 5<7, 4=4',pts:10,sort:50},
      // Exercise 6 - hard
      {ex:6,type:'fill_blank',text:'Điền dấu để tạo chuỗi đúng: 2 [b1] 5 [b2] 8',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'<',b2:'<'},diff:'hard',exp:'2 < 5 < 8',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'Điền số: 3 < [b1] < 7',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'4 hoặc 5 hoặc 6, đáp án 5',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Tìm số n: n + 2 = 5 + 1',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'hard',exp:'n + 2 = 6, n = 4',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Tìm số x: x > 6 và x < 9',opts:[{key:'slot_1',text:'x = [?]'},{key:'token_1',text:'7'},{key:'token_2',text:'8'},{key:'token_3',text:'5'}],ans:{slot_1:'token_1'},diff:'hard',exp:'7 và 8 đều thỏa, nhưng đáp án là 7',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'Tìm phép tính đúng: 3+? = 4+2',opts:[{key:'slot_1',text:'3+[?]=6'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],ans:{slot_1:'token_2'},diff:'hard',exp:'3+3=6=4+2',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Điền dấu: 2+5 [?] 10-2',opts:[{key:'slot_1',text:'2+5 [?] 10-2'},{key:'token_1',text:'>'},{key:'token_2',text:'<'},{key:'token_3',text:'='}],ans:{slot_1:'token_3'},diff:'hard',exp:'7 = 8? Không, 2+5=7, 10-2=8, 7<8',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả x thỏa mãn 4 < x < 8',opts:[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'8'}],ans:['A','B','C'],diff:'hard',exp:'5, 6, 7 thỏa mãn 4 < x < 8',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Chọn so sánh đúng sau khi tính',opts:[{key:'A',text:'3+4 > 6'},{key:'B',text:'9-2 < 8'},{key:'C',text:'5+4 = 9'},{key:'D',text:'8-3 = 6'}],ans:['A','C'],diff:'hard',exp:'7>6, 7<8, 9=9 đúng; 5≠6 sai',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp biểu thức theo giá trị tăng dần: 2+3, 1+7, 4+1, 3+4',opts:[{key:'1',text:'4+1=5'},{key:'2',text:'2+3=5'},{key:'3',text:'3+4=7'},{key:'4',text:'1+7=8'}],ans:['1','2','3','4'],diff:'hard',exp:'5=5, 7, 8 → 5,5,7,8',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp từ lớn đến nhỏ: 10-3, 8-1, 6+1, 5+2',opts:[{key:'1',text:'8-1=7'},{key:'2',text:'6+1=7'},{key:'3',text:'10-3=7'},{key:'4',text:'5+2=7'}],ans:['1','2','3','4'],diff:'hard',exp:'Tất cả đều = 7',pts:10,sort:60},
      // Exercise 7 - hard
      {ex:7,type:'game',text:'Nhóm so sánh đúng và sai',opts:[{key:'c1',text:'3<5',pair:'Đúng'},{key:'c2',text:'7>4',pair:'Đúng'},{key:'c3',text:'6=6',pair:'Đúng'},{key:'c4',text:'8<5',pair:'Sai'},{key:'c5',text:'2>9',pair:'Sai'},{key:'c6',text:'4=7',pair:'Sai'}],ans:{},diff:'hard',exp:'Đúng: 3<5, 7>4, 6=6; Sai: 8<5, 2>9, 4=7',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm theo dấu so sánh: >, <, =',opts:[{key:'c1',text:'5>3',pair:'>'},{key:'c2',text:'2<8',pair:'<'},{key:'c3',text:'7=7',pair:'='},{key:'c4',text:'9>1',pair:'>'},{key:'c5',text:'4<6',pair:'<'},{key:'c6',text:'5=5',pair:'='}],ans:{},diff:'hard',exp:'Nhóm theo dấu >, <, =',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối mệnh đề với giá trị đúng/sai',opts:[{key:'A',text:'5+3 > 9'},{key:'B',text:'4+4 = 8'},{key:'C',text:'10-5 < 4'}],ans:{A:'Sai',B:'Đúng',C:'Sai'},diff:'hard',exp:'8>9 sai; 8=8 đúng; 5<4 sai',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối cặp phép tính bằng nhau',opts:[{key:'A',text:'3+4'},{key:'B',text:'5+2'},{key:'C',text:'9-2'}],ans:{A:'7',B:'7',C:'7'},diff:'hard',exp:'3+4=7, 5+2=7, 9-2=7',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối số với dấu so sánh (so với 6)',opts:[{key:'A',text:'4'},{key:'B',text:'8'},{key:'C',text:'6'}],ans:{A:'<6',B:'>6',C:'=6'},diff:'hard',exp:'4<6, 8>6, 6=6',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'3+4 [b1] 5+2 (điền dấu)',opts:[{key:'b1',text:'?'}],ans:{b1:'='},diff:'hard',exp:'7 = 7',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'2+[b1] = 9-3 (điền số)',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'hard',exp:'9-3=6, 2+4=6',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Tìm x: x > 4 và x < 7. Một giá trị x là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'5 hoặc 6 đều đúng, đáp án 5',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo dấu: 6+1 _ 4+2',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['A'],diff:'hard',exp:'7 > 6',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo dấu: 8-5 _ 1+2',opts:[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],ans:['C'],diff:'hard',exp:'3 = 3',pts:10,sort:70},
      // Exercise 8 - hard
      {ex:8,type:'multiple_choice',text:'Chọn tất cả so sánh đúng',opts:[{key:'A',text:'2+5 > 8'},{key:'B',text:'3+6 = 9'},{key:'C',text:'10-4 > 5'},{key:'D',text:'7-3 < 3'}],ans:['B','C'],diff:'hard',exp:'9=9, 6>5 đúng; 7<8 và 4>3 sai',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Số nào thỏa mãn điều kiện: số đó > 4 và số đó + 3 < 10?',opts:[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'8'}],ans:['A','B'],diff:'hard',exp:'5>4 và 8<10; 6>4 và 9<10; 7+3=10 không <10',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Chọn tất cả số x thỏa mãn: 2+x < 8',opts:[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}],ans:['A','B'],diff:'hard',exp:'2+3=5<8, 2+5=7<8, 2+6=8 không <8',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'Tìm x: 3 < x < 6',opts:[{key:'slot_1',text:'x = [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'3'}],ans:{slot_1:'token_1'},diff:'hard',exp:'4 thỏa mãn 3 < 4 < 6',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'Tìm n: n+2=7 và n>3',opts:[{key:'slot_1',text:'n = [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],ans:{slot_1:'token_2'},diff:'hard',exp:'n=7-2=5, và 5>3',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Điền dấu: 4+5 [?] 10-2',opts:[{key:'slot_1',text:'4+5 [?] 10-2'},{key:'token_1',text:'>'},{key:'token_2',text:'<'},{key:'token_3',text:'='}],ans:{slot_1:'token_3'},diff:'hard',exp:'9=8? Không, 9>8',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp theo giá trị tăng dần: 5+3, 9-1, 4+4, 6+2',opts:[{key:'1',text:'9-1=8'},{key:'2',text:'5+3=8'},{key:'3',text:'4+4=8'},{key:'4',text:'6+2=8'}],ans:['1','2','3','4'],diff:'hard',exp:'Tất cả đều = 8',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp biểu thức theo giá trị giảm dần: 6+3, 4+4, 2+5, 1+6',opts:[{key:'1',text:'6+3=9'},{key:'2',text:'4+4=8'},{key:'3',text:'2+5=7'},{key:'4',text:'1+6=7'}],ans:['1','2','3','4'],diff:'hard',exp:'9, 8, 7, 7 giảm dần',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ so sánh sai: 5+2>8, 3+6=9, 8-3<4',opts:[{key:'A',text:'5+2>8'},{key:'B',text:'3+6=9'},{key:'C',text:'8-3<4'}],ans:['A','C'],diff:'hard',exp:'7<8 nên 7>8 sai; 9=9 đúng; 5>4 nên 5<4 sai',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ biểu thức không bằng 7: 3+4, 5+2, 6+1, 4+4',opts:[{key:'A',text:'3+4=7'},{key:'B',text:'5+2=7'},{key:'C',text:'6+1=7'},{key:'D',text:'4+4=8'}],ans:['D'],diff:'hard',exp:'4+4=8 ≠ 7',pts:10,sort:80},
    ]
  }
};

async function seed() {
  const conn = await mysql.createConnection(dbConfig);
  try {
    for (const lessonId of lessonIds) {
      const { topic, questions } = data[lessonId];
      console.log(`Processing lesson ${lessonId}: ${topic}`);
      await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lessonId]);
      for (const q of questions) {
        const optionsJson = q.opts ? JSON.stringify(q.opts) : null;
        const correctAnswerJson = JSON.stringify(q.ans);
        await conn.execute(
          'INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())',
          [lessonId, q.ex, q.type, q.text, optionsJson, correctAnswerJson, q.diff, q.exp || null, q.pts, q.sort]
        );
      }
      console.log(`  ✓ Inserted ${questions.length} questions`);
    }
    console.log('Done!');
  } finally {
    await conn.end();
  }
}

seed().catch(console.error);
