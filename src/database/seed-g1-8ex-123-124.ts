import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const lessonIds = [123, 124];

const data: Record<number, { topic: string; questions: any[] }> = {
  123: {
    topic: 'Các số 0-5',
    questions: [
      // Exercise 1 - easy
      {ex:1,type:'single_choice',text:'Số nào đứng sau số 2?',opts:[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'4'}],ans:'B',diff:'easy',exp:'2, 3, 4... Số đứng sau 2 là 3',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'Số nào đứng trước số 4?',opts:[{key:'A',text:'5'},{key:'B',text:'2'},{key:'C',text:'3'}],ans:'C',diff:'easy',exp:'3, 4, 5... Số đứng trước 4 là 3',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'Có mấy ngôi sao? ⭐⭐⭐',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],ans:'B',diff:'easy',exp:'Đếm: 1, 2, 3 ngôi sao',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Số 0 là số như thế nào?',opts:[{key:'A',text:'Số lớn nhất'},{key:'B',text:'Số nhỏ nhất trong 0-5'},{key:'C',text:'Số ở giữa'}],ans:'B',diff:'easy',exp:'0 là số nhỏ nhất trong dãy 0-5',pts:10,sort:4},
      {ex:1,type:'true_false',text:'Số 3 đứng sau số 4. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Số 3 đứng TRƯỚC số 4, không phải sau',pts:10,sort:5},
      {ex:1,type:'true_false',text:'Số 5 là số lớn nhất trong các số 0, 1, 2, 3, 4, 5. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 5 là số lớn nhất trong dãy 0-5',pts:10,sort:6},
      {ex:1,type:'true_false',text:'Số 1 đứng sau số 2. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Số 1 đứng TRƯỚC số 2',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'Điền số còn thiếu: 0, 1, [b1], 3, 4, 5',opts:[{key:'b1',text:'?'}],ans:{b1:'2'},diff:'easy',exp:'Dãy số tự nhiên: 0, 1, 2, 3, 4, 5',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'Điền số: [b1], 2, 3',opts:[{key:'b1',text:'?'}],ans:{b1:'1'},diff:'easy',exp:'Số đứng trước 2 là 1',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'Điền số: 3, 4, [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'easy',exp:'Số đứng sau 4 là 5',pts:10,sort:10},
      // Exercise 2 - easy
      {ex:2,type:'counting',text:'Đếm số quả táo: 🍎🍎🍎🍎',opts:[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'}],ans:'4',diff:'easy',exp:'Đếm: 1, 2, 3, 4 quả táo',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm số con mèo: 🐱🐱🐱',opts:[{key:'d1',text:'🐱'},{key:'d2',text:'🐱'},{key:'d3',text:'🐱'}],ans:'3',diff:'easy',exp:'Đếm: 1, 2, 3 con mèo',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm số bông hoa: 🌸🌸',opts:[{key:'d1',text:'🌸'},{key:'d2',text:'🌸'}],ans:'2',diff:'easy',exp:'Đếm: 1, 2 bông hoa',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp các số theo thứ tự từ nhỏ đến lớn: 3, 1, 5, 0',opts:[{key:'1',text:'0'},{key:'2',text:'1'},{key:'3',text:'3'},{key:'4',text:'5'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 0, 1, 3, 5',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp các số theo thứ tự từ lớn đến nhỏ: 2, 4, 1, 3',opts:[{key:'1',text:'4'},{key:'2',text:'3'},{key:'3',text:'2'},{key:'4',text:'1'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 4, 3, 2, 1',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ nhỏ đến lớn: 5, 2, 0',opts:[{key:'1',text:'0'},{key:'2',text:'2'},{key:'3',text:'5'}],ans:['1','2','3'],diff:'easy',exp:'Thứ tự: 0, 2, 5',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ số không thuộc dãy 0-5: 1, 3, 7, 5',opts:[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'7'},{key:'D',text:'5'}],ans:['C'],diff:'easy',exp:'Số 7 không thuộc dãy 0-5',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ số lớn hơn 5: 2, 6, 4, 8',opts:[{key:'A',text:'2'},{key:'B',text:'6'},{key:'C',text:'4'},{key:'D',text:'8'}],ans:['B','D'],diff:'easy',exp:'Số 6 và 8 lớn hơn 5',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'Điền số: 1, [b1], 3, [b2], 5',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'2',b2:'4'},diff:'easy',exp:'Dãy số: 1, 2, 3, 4, 5',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'Số liền trước của 5 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'4'},diff:'easy',exp:'4 đứng ngay trước 5',pts:10,sort:20},
      // Exercise 3 - easy
      {ex:3,type:'single_choice',text:'Số nào lớn hơn 3 trong dãy 0-5?',opts:[{key:'A',text:'2'},{key:'B',text:'1'},{key:'C',text:'4'}],ans:'C',diff:'easy',exp:'4 > 3',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Hình nào có 5 chấm? (A: ●●●●● B: ●●●● C: ●●●)',opts:[{key:'A',text:'5 chấm'},{key:'B',text:'4 chấm'},{key:'C',text:'3 chấm'}],ans:'A',diff:'easy',exp:'5 chấm = số 5',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Số nào nhỏ hơn 2?',opts:[{key:'A',text:'3'},{key:'B',text:'1'},{key:'C',text:'4'}],ans:'B',diff:'easy',exp:'1 < 2',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'Dãy nào đúng theo thứ tự tăng dần?',opts:[{key:'A',text:'1,3,2,4'},{key:'B',text:'0,1,2,3'},{key:'C',text:'5,4,3,2'}],ans:'B',diff:'easy',exp:'0,1,2,3 là tăng dần',pts:10,sort:24},
      {ex:3,type:'true_false',text:'Số 0 nhỏ hơn số 1. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 0 < 1',pts:10,sort:25},
      {ex:3,type:'true_false',text:'Số 4 lớn hơn số 5. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 4 < 5',pts:10,sort:26},
      {ex:3,type:'true_false',text:'Có 3 số nằm giữa 1 và 5 (là 2, 3, 4). Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 2, 3, 4 nằm giữa 1 và 5',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'Số liền sau của 4 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'easy',exp:'5 đứng ngay sau 4',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'Số liền trước của 3 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'2'},diff:'easy',exp:'2 đứng ngay trước 3',pts:10,sort:29},
      {ex:3,type:'counting',text:'Đếm số con chim: 🐦🐦🐦🐦🐦',opts:[{key:'d1',text:'🐦'},{key:'d2',text:'🐦'},{key:'d3',text:'🐦'},{key:'d4',text:'🐦'},{key:'d5',text:'🐦'}],ans:'5',diff:'easy',exp:'Đếm: 1, 2, 3, 4, 5 con chim',pts:10,sort:30},
      // Exercise 4 - medium
      {ex:4,type:'single_choice',text:'3 + 1 = ?',opts:[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],ans:'B',diff:'medium',exp:'3 + 1 = 4',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'5 - 2 = ?',opts:[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'}],ans:'C',diff:'medium',exp:'5 - 2 = 3',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Có 4 quả cam, ăn 1 quả còn lại mấy quả?',opts:[{key:'A',text:'5'},{key:'B',text:'3'},{key:'C',text:'2'}],ans:'B',diff:'medium',exp:'4 - 1 = 3 quả',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Những số nào lớn hơn 2? (Chọn tất cả đáp án đúng)',opts:[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'0'}],ans:['B','C'],diff:'medium',exp:'3 > 2 và 4 > 2',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Những số nào nhỏ hơn 4?',opts:[{key:'A',text:'5'},{key:'B',text:'2'},{key:'C',text:'1'},{key:'D',text:'3'}],ans:['B','C','D'],diff:'medium',exp:'2 < 4, 1 < 4, 3 < 4',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Số nào là số chẵn trong 0-5?',opts:[{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'2'},{key:'D',text:'4'}],ans:['A','C','D'],diff:'medium',exp:'0, 2, 4 là số chẵn',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối số với số lượng tương ứng',opts:[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'5'}],ans:{A:'một',B:'ba',C:'năm'},diff:'medium',exp:'1=một, 3=ba, 5=năm',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối phép tính với kết quả',opts:[{key:'A',text:'1+1'},{key:'B',text:'2+2'},{key:'C',text:'3+2'}],ans:{A:'2',B:'4',C:'5'},diff:'medium',exp:'1+1=2, 2+2=4, 3+2=5',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo các số vào đúng vị trí tăng dần: _, _, _, _',opts:[{key:'A',text:'4'},{key:'B',text:'1'},{key:'C',text:'3'},{key:'D',text:'2'}],ans:['B','D','C','A'],diff:'medium',exp:'Thứ tự: 1, 2, 3, 4',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo số vào chỗ trống: 0, _, 2, _, 4',opts:[{key:'A',text:'1'},{key:'B',text:'3'}],ans:['A','B'],diff:'medium',exp:'0, 1, 2, 3, 4',pts:10,sort:40},
      // Exercise 5 - medium
      {ex:5,type:'table_fill',text:'Điền số còn thiếu vào bảng',opts:[{key:'headers',text:'Số|Liền trước|Liền sau'},{key:'r1',text:'2|_r1c1|_r1c2'},{key:'r2',text:'4|_r2c1|_r2c2'}],ans:{r1c1:'1',r1c2:'3',r2c1:'3',r2c2:'5'},diff:'medium',exp:'Liền trước 2 là 1, liền sau 2 là 3; liền trước 4 là 3, liền sau 4 là 5',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền kết quả vào bảng cộng',opts:[{key:'headers',text:'+|0|1|2'},{key:'r1',text:'1|_r1c1|_r1c2|_r1c3'},{key:'r2',text:'2|_r2c1|_r2c2|_r2c3'}],ans:{r1c1:'1',r1c2:'2',r1c3:'3',r2c1:'2',r2c2:'3',r2c3:'4'},diff:'medium',exp:'Bảng cộng: 1+0=1, 1+1=2, 1+2=3, 2+0=2, 2+1=3, 2+2=4',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Số nào nằm ở vị trí dấu ? trên tia số?',opts:[{key:'min',text:'0'},{key:'max',text:'5'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5'},{key:'hidden',text:'3'}],ans:['3'],diff:'medium',exp:'Số 3 nằm ở vị trí thứ 4 trên tia số 0-5',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Điền số còn thiếu trên tia số (0 đến 5)',opts:[{key:'min',text:'0'},{key:'max',text:'5'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5'},{key:'hidden',text:'1'}],ans:['1'],diff:'medium',exp:'Số 1 nằm giữa 0 và 2 trên tia số',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: 2 + ? = 5',opts:[{key:'slot_1',text:'2 + [?] = 5'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_3'},diff:'medium',exp:'2 + 3 = 5',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: 4 - ? = 2',opts:[{key:'slot_1',text:'4 - [?] = 2'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'medium',exp:'4 - 2 = 2',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: ? + 1 = 3',opts:[{key:'slot_1',text:'[?] + 1 = 3'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'medium',exp:'2 + 1 = 3',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối phép tính với kết quả đúng',opts:[{key:'A',text:'0 + 3'},{key:'B',text:'4 - 1'},{key:'C',text:'2 + 2'}],ans:{A:'3',B:'3',C:'4'},diff:'medium',exp:'0+3=3, 4-1=3, 2+2=4',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối số với chữ số tương ứng',opts:[{key:'A',text:'0'},{key:'B',text:'2'},{key:'C',text:'5'}],ans:{A:'không',B:'hai',C:'năm'},diff:'medium',exp:'0=không, 2=hai, 5=năm',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Kéo thẻ số vào thứ tự đúng từ lớn đến nhỏ',opts:[{key:'A',text:'5'},{key:'B',text:'3'},{key:'C',text:'1'},{key:'D',text:'0'}],ans:['A','B','C','D'],diff:'medium',exp:'5, 3, 1, 0 là thứ tự từ lớn đến nhỏ',pts:10,sort:50},
      // Exercise 6 - hard
      {ex:6,type:'fill_blank',text:'Có [b1] số tự nhiên từ 0 đến 5',opts:[{key:'b1',text:'?'}],ans:{b1:'6'},diff:'hard',exp:'0, 1, 2, 3, 4, 5 có 6 số',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'Số lớn nhất trong các số 2, 0, 5, 3 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'5 là số lớn nhất',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Số nhỏ nhất trong các số 4, 1, 3, 2 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'1'},diff:'hard',exp:'1 là số nhỏ nhất',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Tìm số x: x + 2 = 5',opts:[{key:'slot_1',text:'x + 2 = 5, x = [?]'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 5 - 2 = 3',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'Tìm số x: 5 - x = 3',opts:[{key:'slot_1',text:'5 - x = 3, x = [?]'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 5 - 3 = 2',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Tìm số x: x + x = 4',opts:[{key:'slot_1',text:'x + x = 4, x = [?]'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'hard',exp:'2 + 2 = 4, vậy x = 2',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Số nào khi cộng với 1 cho kết quả nhỏ hơn 5?',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'}],ans:['A','B','C'],diff:'hard',exp:'2+1=3<5, 3+1=4<5, 4+1=5 không nhỏ hơn 5',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả cặp số có tổng bằng 5',opts:[{key:'A',text:'0+5'},{key:'B',text:'2+3'},{key:'C',text:'1+4'},{key:'D',text:'2+2'}],ans:['A','B','C'],diff:'hard',exp:'0+5=5, 2+3=5, 1+4=5',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp các phép tính theo kết quả tăng dần',opts:[{key:'1',text:'1+0=1'},{key:'2',text:'0+2=2'},{key:'3',text:'2+2=4'},{key:'4',text:'2+3=5'}],ans:['1','2','3','4'],diff:'hard',exp:'1, 2, 4, 5 tăng dần',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp các số theo thứ tự từ lớn đến nhỏ: 1, 4, 0, 3',opts:[{key:'1',text:'4'},{key:'2',text:'3'},{key:'3',text:'1'},{key:'4',text:'0'}],ans:['1','2','3','4'],diff:'hard',exp:'4, 3, 1, 0 giảm dần',pts:10,sort:60},
      // Exercise 7 - hard
      {ex:7,type:'game',text:'Nhóm các số chẵn và lẻ từ 0-5',opts:[{key:'c1',text:'0',pair:'chẵn'},{key:'c2',text:'2',pair:'chẵn'},{key:'c3',text:'4',pair:'chẵn'},{key:'c4',text:'1',pair:'lẻ'},{key:'c5',text:'3',pair:'lẻ'},{key:'c6',text:'5',pair:'lẻ'}],ans:{},diff:'hard',exp:'Chẵn: 0,2,4; Lẻ: 1,3,5',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm các số nhỏ hơn 3 và lớn hơn 3',opts:[{key:'c1',text:'0',pair:'nhỏ hơn 3'},{key:'c2',text:'1',pair:'nhỏ hơn 3'},{key:'c3',text:'2',pair:'nhỏ hơn 3'},{key:'c4',text:'4',pair:'lớn hơn 3'},{key:'c5',text:'5',pair:'lớn hơn 3'}],ans:{},diff:'hard',exp:'Nhỏ hơn 3: 0,1,2; Lớn hơn 3: 4,5',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối phép tính với kết quả',opts:[{key:'A',text:'1+4'},{key:'B',text:'3+2'},{key:'C',text:'5-0'}],ans:{A:'5',B:'5',C:'5'},diff:'hard',exp:'1+4=5, 3+2=5, 5-0=5',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối số với vị trí trên tia số (0-5)',opts:[{key:'A',text:'Vị trí thứ 1'},{key:'B',text:'Vị trí thứ 3'},{key:'C',text:'Vị trí thứ 5'}],ans:{A:'0',B:'2',C:'4'},diff:'hard',exp:'Vị trí bắt đầu từ 0',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối số với số bù thành 5',opts:[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'1'}],ans:{A:'3',B:'1',C:'4'},diff:'hard',exp:'2+3=5, 4+1=5, 1+4=5',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'2 + 3 = [b1] và 3 + 2 = [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'5',b2:'5'},diff:'hard',exp:'Tính chất giao hoán: 2+3=3+2=5',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'5 - 2 = [b1] và 5 - 3 = [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'3',b2:'2'},diff:'hard',exp:'5-2=3 và 5-3=2',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Số lớn hơn 2 nhưng nhỏ hơn 5 là [b1] và [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'3',b2:'4'},diff:'hard',exp:'3 và 4 nằm giữa 2 và 5',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo thẻ vào đúng vị trí để hoàn thành phép tính: 1 + _ = 4',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],ans:['B'],diff:'hard',exp:'1 + 3 = 4',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo thẻ vào đúng vị trí: _ + 2 = 5',opts:[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],ans:['B'],diff:'hard',exp:'3 + 2 = 5',pts:10,sort:70},
      // Exercise 8 - hard
      {ex:8,type:'multiple_choice',text:'Chọn tất cả phép tính cho kết quả bằng 3',opts:[{key:'A',text:'1+2'},{key:'B',text:'4-1'},{key:'C',text:'0+3'},{key:'D',text:'5-3'}],ans:['A','B','C'],diff:'hard',exp:'1+2=3, 4-1=3, 0+3=3',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Số nào khi trừ đi 1 thì bằng 3?',opts:[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'3'}],ans:['B'],diff:'hard',exp:'4 - 1 = 3',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Chọn các phép tính có kết quả nhỏ hơn 3',opts:[{key:'A',text:'1+1'},{key:'B',text:'3-2'},{key:'C',text:'2+1'},{key:'D',text:'0+2'}],ans:['A','B','D'],diff:'hard',exp:'1+1=2<3, 3-2=1<3, 0+2=2<3',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'Tìm số x: 3 + x = 5',opts:[{key:'slot_1',text:'3 + x = 5, x = [?]'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 5 - 3 = 2',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'Điền số: _ + 3 = 5',opts:[{key:'slot_1',text:'[?] + 3 = 5'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'hard',exp:'2 + 3 = 5',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Điền số: 4 - _ = 1',opts:[{key:'slot_1',text:'4 - [?] = 1'},{key:'token_1',text:'2'},{key:'token_2',text:'3'},{key:'token_3',text:'4'}],ans:{slot_1:'token_2'},diff:'hard',exp:'4 - 3 = 1',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp phép tính theo kết quả giảm dần',opts:[{key:'1',text:'5-0=5'},{key:'2',text:'3+1=4'},{key:'3',text:'1+2=3'},{key:'4',text:'1+1=2'}],ans:['1','2','3','4'],diff:'hard',exp:'5, 4, 3, 2 giảm dần',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp các số theo thứ tự từ nhỏ đến lớn: 5, 0, 3, 1',opts:[{key:'1',text:'0'},{key:'2',text:'1'},{key:'3',text:'3'},{key:'4',text:'5'}],ans:['1','2','3','4'],diff:'hard',exp:'0, 1, 3, 5 tăng dần',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ phép tính có kết quả SAI: 1+2=3, 3+1=5, 4-2=2',opts:[{key:'A',text:'1+2=3'},{key:'B',text:'3+1=5'},{key:'C',text:'4-2=2'}],ans:['B'],diff:'hard',exp:'3+1=4, không phải 5',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ số không thuộc nhóm số chẵn trong 0-5: 0, 2, 3, 4',opts:[{key:'A',text:'0'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}],ans:['C'],diff:'hard',exp:'3 là số lẻ, không thuộc nhóm số chẵn',pts:10,sort:80},
    ]
  },
  124: {
    topic: 'Các số 6-10',
    questions: [
      // Exercise 1 - easy
      {ex:1,type:'single_choice',text:'Số nào đứng sau số 7?',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'9'}],ans:'B',diff:'easy',exp:'7, 8, 9... Số đứng sau 7 là 8',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'Số nào đứng trước số 9?',opts:[{key:'A',text:'10'},{key:'B',text:'7'},{key:'C',text:'8'}],ans:'C',diff:'easy',exp:'8, 9, 10... Số đứng trước 9 là 8',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'Có mấy quả cam? 🍊🍊🍊🍊🍊🍊🍊',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],ans:'B',diff:'easy',exp:'Đếm: 1, 2, 3, 4, 5, 6, 7 quả cam',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Số 10 là số như thế nào trong dãy 6-10?',opts:[{key:'A',text:'Số nhỏ nhất'},{key:'B',text:'Số lớn nhất'},{key:'C',text:'Số ở giữa'}],ans:'B',diff:'easy',exp:'10 là số lớn nhất trong dãy 6-10',pts:10,sort:4},
      {ex:1,type:'true_false',text:'Số 8 đứng sau số 9. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Số 8 đứng TRƯỚC số 9, không phải sau',pts:10,sort:5},
      {ex:1,type:'true_false',text:'Số 10 lớn hơn số 6. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 10 > 6',pts:10,sort:6},
      {ex:1,type:'true_false',text:'Số 7 nằm giữa số 6 và số 8. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 6, 7, 8 - số 7 ở giữa',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'Điền số còn thiếu: 6, 7, [b1], 9, 10',opts:[{key:'b1',text:'?'}],ans:{b1:'8'},diff:'easy',exp:'Dãy số: 6, 7, 8, 9, 10',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'Điền số: [b1], 7, 8',opts:[{key:'b1',text:'?'}],ans:{b1:'6'},diff:'easy',exp:'Số đứng trước 7 là 6',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'Điền số: 8, 9, [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'10'},diff:'easy',exp:'Số đứng sau 9 là 10',pts:10,sort:10},
      // Exercise 2 - easy
      {ex:2,type:'counting',text:'Đếm số con cá: 🐟🐟🐟🐟🐟🐟🐟🐟',opts:[{key:'d1',text:'🐟'},{key:'d2',text:'🐟'},{key:'d3',text:'🐟'},{key:'d4',text:'🐟'},{key:'d5',text:'🐟'},{key:'d6',text:'🐟'},{key:'d7',text:'🐟'},{key:'d8',text:'🐟'}],ans:'8',diff:'easy',exp:'Đếm: 1-8 con cá',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm số ngôi sao: ⭐⭐⭐⭐⭐⭐⭐',opts:[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'}],ans:'7',diff:'easy',exp:'Đếm: 1-7 ngôi sao',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm số quả bóng: 🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀',opts:[{key:'d1',text:'🏀'},{key:'d2',text:'🏀'},{key:'d3',text:'🏀'},{key:'d4',text:'🏀'},{key:'d5',text:'🏀'},{key:'d6',text:'🏀'},{key:'d7',text:'🏀'},{key:'d8',text:'🏀'},{key:'d9',text:'🏀'},{key:'d10',text:'🏀'}],ans:'10',diff:'easy',exp:'Đếm: 1-10 quả bóng',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp từ nhỏ đến lớn: 9, 6, 10, 7',opts:[{key:'1',text:'6'},{key:'2',text:'7'},{key:'3',text:'9'},{key:'4',text:'10'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 6, 7, 9, 10',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp từ lớn đến nhỏ: 8, 6, 10, 9',opts:[{key:'1',text:'10'},{key:'2',text:'9'},{key:'3',text:'8'},{key:'4',text:'6'}],ans:['1','2','3','4'],diff:'easy',exp:'Thứ tự: 10, 9, 8, 6',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ nhỏ đến lớn: 10, 7, 8',opts:[{key:'1',text:'7'},{key:'2',text:'8'},{key:'3',text:'10'}],ans:['1','2','3'],diff:'easy',exp:'Thứ tự: 7, 8, 10',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ số không thuộc dãy 6-10: 6, 8, 5, 9',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'5'},{key:'D',text:'9'}],ans:['C'],diff:'easy',exp:'Số 5 không thuộc dãy 6-10',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ số lớn hơn 10: 7, 11, 9, 12',opts:[{key:'A',text:'7'},{key:'B',text:'11'},{key:'C',text:'9'},{key:'D',text:'12'}],ans:['B','D'],diff:'easy',exp:'11 và 12 lớn hơn 10',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'Điền số: 6, [b1], 8, [b2], 10',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'7',b2:'9'},diff:'easy',exp:'Dãy số: 6, 7, 8, 9, 10',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'Số liền trước của 10 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'9'},diff:'easy',exp:'9 đứng ngay trước 10',pts:10,sort:20},
      // Exercise 3 - easy
      {ex:3,type:'single_choice',text:'Số nào lớn hơn 8 trong dãy 6-10?',opts:[{key:'A',text:'7'},{key:'B',text:'6'},{key:'C',text:'9'}],ans:'C',diff:'easy',exp:'9 > 8',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Số nào nhỏ hơn 7 trong dãy 6-10?',opts:[{key:'A',text:'8'},{key:'B',text:'6'},{key:'C',text:'9'}],ans:'B',diff:'easy',exp:'6 < 7',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Dãy nào đúng theo thứ tự tăng dần?',opts:[{key:'A',text:'6,8,7,9'},{key:'B',text:'7,8,9,10'},{key:'C',text:'10,9,8,7'}],ans:'B',diff:'easy',exp:'7,8,9,10 là tăng dần',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'6 + 1 = ?',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],ans:'B',diff:'easy',exp:'6 + 1 = 7',pts:10,sort:24},
      {ex:3,type:'true_false',text:'Số 9 lớn hơn số 8. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! 9 > 8',pts:10,sort:25},
      {ex:3,type:'true_false',text:'Số 6 lớn hơn số 7. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! 6 < 7',pts:10,sort:26},
      {ex:3,type:'true_false',text:'Có 5 số nằm trong dãy 6, 7, 8, 9, 10. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Đếm: 6, 7, 8, 9, 10 = 5 số',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'Số liền sau của 9 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'10'},diff:'easy',exp:'10 đứng ngay sau 9',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'Số liền trước của 7 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'6'},diff:'easy',exp:'6 đứng ngay trước 7',pts:10,sort:29},
      {ex:3,type:'counting',text:'Đếm số bướm: 🦋🦋🦋🦋🦋🦋',opts:[{key:'d1',text:'🦋'},{key:'d2',text:'🦋'},{key:'d3',text:'🦋'},{key:'d4',text:'🦋'},{key:'d5',text:'🦋'},{key:'d6',text:'🦋'}],ans:'6',diff:'easy',exp:'Đếm: 1-6 con bướm',pts:10,sort:30},
      // Exercise 4 - medium
      {ex:4,type:'single_choice',text:'7 + 2 = ?',opts:[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],ans:'B',diff:'medium',exp:'7 + 2 = 9',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'10 - 3 = ?',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'7'}],ans:'C',diff:'medium',exp:'10 - 3 = 7',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Có 8 quả táo, thêm 2 quả nữa. Có tất cả mấy quả?',opts:[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'11'}],ans:'B',diff:'medium',exp:'8 + 2 = 10 quả',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Những số nào lớn hơn 7 trong dãy 6-10?',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'9'},{key:'D',text:'10'}],ans:['B','C','D'],diff:'medium',exp:'8 > 7, 9 > 7, 10 > 7',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Những số nào nhỏ hơn 9?',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'10'}],ans:['A','B','C'],diff:'medium',exp:'6, 7, 8 đều nhỏ hơn 9',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Chọn số chẵn trong dãy 6-10',opts:[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'},{key:'D',text:'10'}],ans:['A','C','D'],diff:'medium',exp:'6, 8, 10 là số chẵn',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối số với số lượng',opts:[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],ans:{A:'sáu',B:'tám',C:'mười'},diff:'medium',exp:'6=sáu, 8=tám, 10=mười',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối phép tính với kết quả',opts:[{key:'A',text:'6+1'},{key:'B',text:'5+4'},{key:'C',text:'8+2'}],ans:{A:'7',B:'9',C:'10'},diff:'medium',exp:'6+1=7, 5+4=9, 8+2=10',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo số vào vị trí tăng dần: _, _, _, _',opts:[{key:'A',text:'9'},{key:'B',text:'6'},{key:'C',text:'8'},{key:'D',text:'7'}],ans:['B','D','C','A'],diff:'medium',exp:'Thứ tự: 6, 7, 8, 9',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo số vào chỗ trống: 6, _, 8, _, 10',opts:[{key:'A',text:'7'},{key:'B',text:'9'}],ans:['A','B'],diff:'medium',exp:'6, 7, 8, 9, 10',pts:10,sort:40},
      // Exercise 5 - medium
      {ex:5,type:'table_fill',text:'Điền số còn thiếu vào bảng',opts:[{key:'headers',text:'Số|Liền trước|Liền sau'},{key:'r1',text:'7|_r1c1|_r1c2'},{key:'r2',text:'9|_r2c1|_r2c2'}],ans:{r1c1:'6',r1c2:'8',r2c1:'8',r2c2:'10'},diff:'medium',exp:'Liền trước 7 là 6, liền sau 7 là 8; liền trước 9 là 8, liền sau 9 là 10',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền kết quả vào bảng',opts:[{key:'headers',text:'+|3|4|5'},{key:'r1',text:'3|_r1c1|_r1c2|_r1c3'},{key:'r2',text:'4|_r2c1|_r2c2|_r2c3'}],ans:{r1c1:'6',r1c2:'7',r1c3:'8',r2c1:'7',r2c2:'8',r2c3:'9'},diff:'medium',exp:'3+3=6, 3+4=7, 3+5=8, 4+3=7, 4+4=8, 4+5=9',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Tìm số ẩn trên tia số từ 6 đến 10',opts:[{key:'min',text:'6'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'6|7|8|9|10'},{key:'hidden',text:'8'}],ans:['8'],diff:'medium',exp:'Số 8 nằm ở giữa tia số 6-10',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Điền số còn thiếu trên tia số',opts:[{key:'min',text:'6'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'6|7|8|9|10'},{key:'hidden',text:'7'}],ans:['7'],diff:'medium',exp:'Số 7 nằm giữa 6 và 8 trên tia số',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: 6 + ? = 10',opts:[{key:'slot_1',text:'6 + [?] = 10'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],ans:{slot_1:'token_2'},diff:'medium',exp:'6 + 4 = 10',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: 9 - ? = 7',opts:[{key:'slot_1',text:'9 - [?] = 7'},{key:'token_1',text:'1'},{key:'token_2',text:'2'},{key:'token_3',text:'3'}],ans:{slot_1:'token_2'},diff:'medium',exp:'9 - 2 = 7',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'Điền số vào ô trống: ? + 4 = 10',opts:[{key:'slot_1',text:'[?] + 4 = 10'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],ans:{slot_1:'token_2'},diff:'medium',exp:'6 + 4 = 10',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối phép tính với kết quả',opts:[{key:'A',text:'4+4'},{key:'B',text:'3+6'},{key:'C',text:'5+5'}],ans:{A:'8',B:'9',C:'10'},diff:'medium',exp:'4+4=8, 3+6=9, 5+5=10',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối phép trừ với kết quả',opts:[{key:'A',text:'10-4'},{key:'B',text:'9-2'},{key:'C',text:'8-1'}],ans:{A:'6',B:'7',C:'7'},diff:'medium',exp:'10-4=6, 9-2=7, 8-1=7',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Kéo thẻ vào thứ tự từ lớn đến nhỏ',opts:[{key:'A',text:'10'},{key:'B',text:'8'},{key:'C',text:'7'},{key:'D',text:'6'}],ans:['A','B','C','D'],diff:'medium',exp:'10, 8, 7, 6 giảm dần',pts:10,sort:50},
      // Exercise 6 - hard
      {ex:6,type:'fill_blank',text:'Có [b1] số tự nhiên từ 6 đến 10',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'6, 7, 8, 9, 10 có 5 số',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'Số lớn nhất trong các số 7, 9, 6, 10, 8 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'10'},diff:'hard',exp:'10 là số lớn nhất',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Tổng của 2 số chẵn liên tiếp bắt đầu từ 6 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'14'},diff:'hard',exp:'6 + 8 = 14',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Tìm số x: x + 3 = 10',opts:[{key:'slot_1',text:'x + 3 = 10, x = [?]'},{key:'token_1',text:'6'},{key:'token_2',text:'7'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 10 - 3 = 7',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'Tìm số x: 10 - x = 4',opts:[{key:'slot_1',text:'10 - x = 4, x = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 10 - 4 = 6',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Tìm số x: x + x = 8 + 2',opts:[{key:'slot_1',text:'x + x = 10, x = [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],ans:{slot_1:'token_2'},diff:'hard',exp:'5 + 5 = 10, vậy x = 5',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Số nào khi cộng với 2 cho kết quả trong dãy 6-10?',opts:[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'8'}],ans:['A','B','C','D'],diff:'hard',exp:'5+2=7, 6+2=8, 7+2=9, 8+2=10 đều thuộc 6-10',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả cặp số có tổng bằng 10',opts:[{key:'A',text:'4+6'},{key:'B',text:'5+5'},{key:'C',text:'3+7'},{key:'D',text:'2+9'}],ans:['A','B','C'],diff:'hard',exp:'4+6=10, 5+5=10, 3+7=10',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp các phép tính theo kết quả tăng dần',opts:[{key:'1',text:'3+3=6'},{key:'2',text:'3+4=7'},{key:'3',text:'4+4=8'},{key:'4',text:'4+5=9'}],ans:['1','2','3','4'],diff:'hard',exp:'6, 7, 8, 9 tăng dần',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp từ lớn đến nhỏ: 7, 10, 6, 9',opts:[{key:'1',text:'10'},{key:'2',text:'9'},{key:'3',text:'7'},{key:'4',text:'6'}],ans:['1','2','3','4'],diff:'hard',exp:'10, 9, 7, 6 giảm dần',pts:10,sort:60},
      // Exercise 7 - hard
      {ex:7,type:'game',text:'Nhóm số chẵn và lẻ trong dãy 6-10',opts:[{key:'c1',text:'6',pair:'chẵn'},{key:'c2',text:'8',pair:'chẵn'},{key:'c3',text:'10',pair:'chẵn'},{key:'c4',text:'7',pair:'lẻ'},{key:'c5',text:'9',pair:'lẻ'}],ans:{},diff:'hard',exp:'Chẵn: 6,8,10; Lẻ: 7,9',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm số nhỏ hơn 8 và lớn hơn 8 trong dãy 6-10',opts:[{key:'c1',text:'6',pair:'nhỏ hơn 8'},{key:'c2',text:'7',pair:'nhỏ hơn 8'},{key:'c3',text:'9',pair:'lớn hơn 8'},{key:'c4',text:'10',pair:'lớn hơn 8'}],ans:{},diff:'hard',exp:'Nhỏ hơn 8: 6,7; Lớn hơn 8: 9,10',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối phép tính với kết quả',opts:[{key:'A',text:'5+5'},{key:'B',text:'8+2'},{key:'C',text:'6+4'}],ans:{A:'10',B:'10',C:'10'},diff:'hard',exp:'5+5=10, 8+2=10, 6+4=10',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối số với số bù thành 10',opts:[{key:'A',text:'7'},{key:'B',text:'6'},{key:'C',text:'9'}],ans:{A:'3',B:'4',C:'1'},diff:'hard',exp:'7+3=10, 6+4=10, 9+1=10',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối phép trừ với kết quả',opts:[{key:'A',text:'10-4'},{key:'B',text:'10-3'},{key:'C',text:'10-1'}],ans:{A:'6',B:'7',C:'9'},diff:'hard',exp:'10-4=6, 10-3=7, 10-1=9',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'6 + 4 = [b1] và 4 + 6 = [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'10',b2:'10'},diff:'hard',exp:'Tính chất giao hoán: 6+4=4+6=10',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'10 - 3 = [b1] và 10 - 7 = [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'7',b2:'3'},diff:'hard',exp:'10-3=7 và 10-7=3',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Có [b1] số lẻ trong dãy 6-10',opts:[{key:'b1',text:'?'}],ans:{b1:'2'},diff:'hard',exp:'7 và 9 là số lẻ trong dãy 6-10',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo thẻ để hoàn thành: 8 + _ = 10',opts:[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],ans:['B'],diff:'hard',exp:'8 + 2 = 10',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo thẻ để hoàn thành: 10 - _ = 6',opts:[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],ans:['B'],diff:'hard',exp:'10 - 4 = 6',pts:10,sort:70},
      // Exercise 8 - hard
      {ex:8,type:'multiple_choice',text:'Chọn tất cả phép tính cho kết quả bằng 8',opts:[{key:'A',text:'4+4'},{key:'B',text:'9-1'},{key:'C',text:'6+2'},{key:'D',text:'10-3'}],ans:['A','B','C'],diff:'hard',exp:'4+4=8, 9-1=8, 6+2=8',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Số nào khi trừ đi 2 thì bằng 7?',opts:[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'},{key:'D',text:'6'}],ans:['B'],diff:'hard',exp:'9 - 2 = 7',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Chọn các phép tính có kết quả từ 6 đến 8',opts:[{key:'A',text:'3+4'},{key:'B',text:'2+6'},{key:'C',text:'9-3'},{key:'D',text:'5+5'}],ans:['A','B','C'],diff:'hard',exp:'3+4=7, 2+6=8, 9-3=6 đều trong 6-8',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'Tìm số x: 5 + x = 9',opts:[{key:'slot_1',text:'5 + x = 9, x = [?]'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],ans:{slot_1:'token_2'},diff:'hard',exp:'x = 9 - 5 = 4',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'Điền số: _ + 6 = 10',opts:[{key:'slot_1',text:'[?] + 6 = 10'},{key:'token_1',text:'3'},{key:'token_2',text:'4'},{key:'token_3',text:'5'}],ans:{slot_1:'token_2'},diff:'hard',exp:'4 + 6 = 10',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Điền số: 9 - _ = 3',opts:[{key:'slot_1',text:'9 - [?] = 3'},{key:'token_1',text:'5'},{key:'token_2',text:'6'},{key:'token_3',text:'7'}],ans:{slot_1:'token_2'},diff:'hard',exp:'9 - 6 = 3',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp phép tính theo kết quả giảm dần',opts:[{key:'1',text:'5+5=10'},{key:'2',text:'4+5=9'},{key:'3',text:'4+4=8'},{key:'4',text:'3+4=7'}],ans:['1','2','3','4'],diff:'hard',exp:'10, 9, 8, 7 giảm dần',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp từ nhỏ đến lớn: 10, 6, 8, 7',opts:[{key:'1',text:'6'},{key:'2',text:'7'},{key:'3',text:'8'},{key:'4',text:'10'}],ans:['1','2','3','4'],diff:'hard',exp:'6, 7, 8, 10 tăng dần',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ phép tính có kết quả SAI: 6+3=9, 8+2=9, 7+3=10',opts:[{key:'A',text:'6+3=9'},{key:'B',text:'8+2=9'},{key:'C',text:'7+3=10'}],ans:['B'],diff:'hard',exp:'8+2=10, không phải 9',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ số không thuộc nhóm số lẻ trong 6-10: 7, 8, 9, 10',opts:[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'},{key:'D',text:'10'}],ans:['B','D'],diff:'hard',exp:'8 và 10 là số chẵn, không thuộc số lẻ',pts:10,sort:80},
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
