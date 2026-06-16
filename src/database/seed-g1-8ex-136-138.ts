import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const lessonIds = [136, 138];

// Helper to build 80 questions for any topic using generic math content
function buildQuestions(lessonId: number, topic: string) {
  const isLesson136 = lessonId === 136;

  if (isLesson136) {
    // Lesson 136: Khối lập phương và hộp chữ nhật (3D shapes)
    return [
      // Ex 1
      {ex:1,type:'single_choice',text:'Khối lập phương có mấy mặt?',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],ans:'B',diff:'easy',exp:'Khối lập phương có 6 mặt vuông bằng nhau',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'Hộp chữ nhật có mấy mặt?',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],ans:'B',diff:'easy',exp:'Hộp chữ nhật có 6 mặt',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'Khối trụ trông giống vật gì?',opts:[{key:'A',text:'Hộp diêm'},{key:'B',text:'Lon nước ngọt'},{key:'C',text:'Quả bóng'}],ans:'B',diff:'easy',exp:'Lon nước ngọt hình trụ tròn',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Vật nào có dạng khối cầu?',opts:[{key:'A',text:'Hộp quà'},{key:'B',text:'Bóng đá'},{key:'C',text:'Lon sữa bột'}],ans:'B',diff:'easy',exp:'Bóng đá hình cầu',pts:10,sort:4},
      {ex:1,type:'true_false',text:'Khối lập phương có 8 đỉnh. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Khối lập phương có 8 đỉnh',pts:10,sort:5},
      {ex:1,type:'true_false',text:'Khối cầu có thể lăn trên mặt phẳng. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Khối cầu có thể lăn',pts:10,sort:6},
      {ex:1,type:'true_false',text:'Hộp chữ nhật có tất cả các mặt bằng nhau. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! Chỉ khối lập phương mới có tất cả mặt bằng nhau',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'Khối lập phương có [b1] mặt vuông',opts:[{key:'b1',text:'?'}],ans:{b1:'6'},diff:'easy',exp:'6 mặt vuông bằng nhau',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'Khối lập phương có [b1] cạnh',opts:[{key:'b1',text:'?'}],ans:{b1:'12'},diff:'easy',exp:'12 cạnh',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'Khối trụ có [b1] mặt tròn',opts:[{key:'b1',text:'?'}],ans:{b1:'2'},diff:'easy',exp:'2 mặt tròn (trên và dưới)',pts:10,sort:10},
      // Ex 2
      {ex:2,type:'counting',text:'Đếm số khối lập phương: 🎲🎲🎲🎲🎲',opts:[{key:'d1',text:'🎲'},{key:'d2',text:'🎲'},{key:'d3',text:'🎲'},{key:'d4',text:'🎲'},{key:'d5',text:'🎲'}],ans:'5',diff:'easy',exp:'5 khối',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm số mặt của 2 khối lập phương',opts:[{key:'d1',text:'🎲'},{key:'d2',text:'🎲'}],ans:'12',diff:'easy',exp:'2 × 6 = 12 mặt',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm số đỉnh của 1 khối lập phương',opts:[{key:'d1',text:'🎲'}],ans:'8',diff:'easy',exp:'1 khối lập phương có 8 đỉnh',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp theo số mặt tăng dần: khối trụ, khối lập phương, khối cầu',opts:[{key:'1',text:'Khối cầu (0 mặt phẳng)'},{key:'2',text:'Khối trụ (2 mặt tròn+1 cong)'},{key:'3',text:'Khối lập phương (6 mặt)'}],ans:['1','2','3'],diff:'easy',exp:'0, 3, 6 mặt tăng dần',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp theo khả năng lăn: không lăn được, lăn 1 chiều, lăn mọi chiều',opts:[{key:'1',text:'Khối lập phương (không lăn)'},{key:'2',text:'Khối trụ (1 chiều)'},{key:'3',text:'Khối cầu (mọi chiều)'}],ans:['1','2','3'],diff:'easy',exp:'Lập phương=0, trụ=1 chiều, cầu=mọi chiều',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ ít đỉnh đến nhiều đỉnh: khối cầu, khối lập phương, khối trụ',opts:[{key:'1',text:'Khối cầu (0)'},{key:'2',text:'Khối trụ (0)'},{key:'3',text:'Khối lập phương (8)'}],ans:['1','2','3'],diff:'easy',exp:'0, 0, 8 đỉnh tăng dần',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ khối CÓ THỂ lăn: khối lập phương, khối cầu, khối trụ',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],ans:['A'],diff:'easy',exp:'Khối lập phương không lăn được',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ vật không phải khối hộp: hộp diêm, lon nước, viên xúc xắc',opts:[{key:'A',text:'Hộp diêm'},{key:'B',text:'Lon nước'},{key:'C',text:'Viên xúc xắc'}],ans:['B'],diff:'easy',exp:'Lon nước là khối trụ, không phải khối hộp',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'Hộp chữ nhật có [b1] đỉnh',opts:[{key:'b1',text:'?'}],ans:{b1:'8'},diff:'easy',exp:'8 đỉnh',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'Khối lập phương có [b1] cạnh bằng nhau',opts:[{key:'b1',text:'?'}],ans:{b1:'12'},diff:'easy',exp:'12 cạnh đều bằng nhau',pts:10,sort:20},
      // Ex 3
      {ex:3,type:'single_choice',text:'Vật nào hình khối trụ?',opts:[{key:'A',text:'Hộp bánh vuông'},{key:'B',text:'Ống bơ sữa'},{key:'C',text:'Quả cam'}],ans:'B',diff:'easy',exp:'Ống bơ sữa hình trụ',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Mặt nào của khối lập phương?',opts:[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'}],ans:'C',diff:'easy',exp:'Mặt khối lập phương là hình vuông',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Hộp chữ nhật khác khối lập phương ở điểm nào?',opts:[{key:'A',text:'Số mặt'},{key:'B',text:'Các mặt có thể khác nhau'},{key:'C',text:'Số đỉnh'}],ans:'B',diff:'easy',exp:'Hộp chữ nhật có các mặt khác kích thước',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'Khối nào có mặt phẳng VÀ mặt cong?',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],ans:'C',diff:'easy',exp:'Khối trụ có 2 mặt tròn phẳng + 1 mặt cong',pts:10,sort:24},
      {ex:3,type:'true_false',text:'Khối lập phương và hộp chữ nhật đều có 12 cạnh. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Cả hai đều có 12 cạnh',pts:10,sort:25},
      {ex:3,type:'true_false',text:'Khối cầu có mặt phẳng. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! Khối cầu chỉ có mặt cong',pts:10,sort:26},
      {ex:3,type:'true_false',text:'Khối trụ không thể lăn. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! Khối trụ có thể lăn theo một chiều',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'Khối cầu có [b1] mặt phẳng',opts:[{key:'b1',text:'?'}],ans:{b1:'0'},diff:'easy',exp:'Khối cầu không có mặt phẳng',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'Hộp diêm là ví dụ của khối [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'hộp chữ nhật'},diff:'easy',exp:'Hộp diêm hình hộp chữ nhật',pts:10,sort:29},
      {ex:3,type:'counting',text:'Đếm số mặt của 2 khối trụ (mỗi khối có 3 mặt: 2 tròn + 1 cong)',opts:[{key:'d1',text:'🥫'},{key:'d2',text:'🥫'}],ans:'6',diff:'easy',exp:'2 × 3 = 6 mặt',pts:10,sort:30},
      // Ex 4
      {ex:4,type:'single_choice',text:'Tổng số mặt của 1 khối lập phương và 1 hộp chữ nhật?',opts:[{key:'A',text:'10'},{key:'B',text:'12'},{key:'C',text:'14'}],ans:'B',diff:'medium',exp:'6 + 6 = 12 mặt',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'Cắt khối lập phương thành 2 nửa, mỗi nửa có mặt mới là hình gì?',opts:[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình chữ nhật'}],ans:'C',diff:'medium',exp:'Cắt ngang tạo ra mặt hình chữ nhật',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Bao nhiêu khối lập phương nhỏ 1×1×1 để xếp đầy hộp 2×2×2?',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],ans:'C',diff:'medium',exp:'2×2×2=8 khối',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Chọn tất cả khối CÓ MẶT PHẲNG',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp chữ nhật'},{key:'D',text:'Khối trụ'}],ans:['A','C','D'],diff:'medium',exp:'Lập phương, hộp, trụ đều có mặt phẳng; cầu không có',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Chọn vật thực có hình khối lập phương',opts:[{key:'A',text:'Xúc xắc'},{key:'B',text:'Lon coca'},{key:'C',text:'Khối Rubik'},{key:'D',text:'Quả bóng'}],ans:['A','C'],diff:'medium',exp:'Xúc xắc và khối Rubik hình lập phương',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Khối nào có đặc điểm: có cạnh thẳng?',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp chữ nhật'},{key:'D',text:'Khối trụ'}],ans:['A','C'],diff:'medium',exp:'Lập phương và hộp chữ nhật có cạnh thẳng',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối khối với số mặt',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],ans:{A:'6 mặt',B:'0 mặt phẳng',C:'3 mặt'},diff:'medium',exp:'LP=6, cầu=0, trụ=3(2 tròn+1 cong)',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối vật với khối tương ứng',opts:[{key:'A',text:'Bóng bàn'},{key:'B',text:'Hộp kem đánh răng'},{key:'C',text:'Lon đồ hộp'}],ans:{A:'Khối cầu',B:'Hộp chữ nhật',C:'Khối trụ'},diff:'medium',exp:'Bóng=cầu, hộp kem=hộp CN, lon=trụ',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo vào "Có thể lăn": khối lập phương, khối cầu, khối trụ',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Khối trụ'}],ans:['B','C'],diff:'medium',exp:'Cầu và trụ đều lăn được',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo số mặt đúng: khối lập phương có _ mặt',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],ans:['B'],diff:'medium',exp:'6 mặt',pts:10,sort:40},
      // Ex 5
      {ex:5,type:'table_fill',text:'Điền thông tin về các khối',opts:[{key:'headers',text:'Khối|Mặt|Cạnh|Đỉnh'},{key:'r1',text:'Lập phương|_r1c1|_r1c2|_r1c3'},{key:'r2',text:'Hộp chữ nhật|_r2c1|_r2c2|_r2c3'}],ans:{r1c1:'6',r1c2:'12',r1c3:'8',r2c1:'6',r2c2:'12',r2c3:'8'},diff:'medium',exp:'Lập phương và hộp CN đều có 6 mặt, 12 cạnh, 8 đỉnh',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền thông tin đặc điểm',opts:[{key:'headers',text:'Khối|Lăn được?|Mặt phẳng?'},{key:'r1',text:'Khối cầu|_r1c1|_r1c2'},{key:'r2',text:'Khối trụ|_r2c1|_r2c2'}],ans:{r1c1:'Có',r1c2:'Không',r2c1:'Có',r2c2:'Có'},diff:'medium',exp:'Cầu lăn mọi chiều, không có mặt phẳng; Trụ lăn 1 chiều, có mặt phẳng tròn',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Số đỉnh của hình từ 0 đến 8 (khối cầu=0, ...khối lập phương=8)',opts:[{key:'min',text:'0'},{key:'max',text:'8'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8'},{key:'hidden',text:'8'}],ans:['8'],diff:'medium',exp:'Khối lập phương có 8 đỉnh',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Số mặt của khối lập phương trên tia số (từ 0-10)',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'6'}],ans:['6'],diff:'medium',exp:'Khối lập phương có 6 mặt',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Khối nào không có góc nào?',opts:[{key:'slot_1',text:'Khối [?]'},{key:'token_1',text:'cầu'},{key:'token_2',text:'lập phương'},{key:'token_3',text:'trụ'}],ans:{slot_1:'token_1'},diff:'medium',exp:'Khối cầu không có góc',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Cần bao nhiêu khối 1×1×1 xếp đầy hộp 3×2×1?',opts:[{key:'slot_1',text:'Cần [?] khối'},{key:'token_1',text:'4'},{key:'token_2',text:'6'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'medium',exp:'3 × 2 × 1 = 6',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'Tổng số mặt của 3 khối lập phương là?',opts:[{key:'slot_1',text:'Tổng = [?] mặt'},{key:'token_1',text:'12'},{key:'token_2',text:'18'},{key:'token_3',text:'24'}],ans:{slot_1:'token_2'},diff:'medium',exp:'3 × 6 = 18 mặt',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối khối với ví dụ thực tế',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp chữ nhật'}],ans:{A:'Xúc xắc',B:'Bóng đá',C:'Hộp bìa'},diff:'medium',exp:'Xúc xắc=LP, bóng=cầu, hộp bìa=CN',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối khối với đặc điểm',opts:[{key:'A',text:'Lăn mọi chiều'},{key:'B',text:'Không lăn'},{key:'C',text:'Lăn 1 chiều'}],ans:{A:'Khối cầu',B:'Khối lập phương',C:'Khối trụ'},diff:'medium',exp:'Cầu=mọi chiều, lập phương=không, trụ=1 chiều',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Kéo số đỉnh vào khối: khối lập phương có _ đỉnh',opts:[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],ans:['C'],diff:'medium',exp:'8 đỉnh',pts:10,sort:50},
      // Ex 6
      {ex:6,type:'fill_blank',text:'Tổng số cạnh của 2 hộp chữ nhật là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'24'},diff:'hard',exp:'2 × 12 = 24 cạnh',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'Khối nào có số mặt=số cạnh÷2? [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'Khối lập phương'},diff:'hard',exp:'6 = 12÷2',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Cần [b1] khối 1×1×1 để xếp đầy hộp 2×3×2',opts:[{key:'b1',text:'?'}],ans:{b1:'12'},diff:'hard',exp:'2 × 3 × 2 = 12',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Cắt khối lập phương cạnh 2 thành các khối 1×1×1. Được mấy khối?',opts:[{key:'slot_1',text:'Được [?] khối'},{key:'token_1',text:'4'},{key:'token_2',text:'8'},{key:'token_3',text:'12'}],ans:{slot_1:'token_2'},diff:'hard',exp:'2×2×2=8 khối',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'Hộp 3×2×1 cần mấy khối 1×1×1?',opts:[{key:'slot_1',text:'Cần [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'6'},{key:'token_3',text:'8'}],ans:{slot_1:'token_2'},diff:'hard',exp:'3×2×1=6',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Tổng đỉnh của 3 khối lập phương + 1 khối cầu?',opts:[{key:'slot_1',text:'Tổng = [?]'},{key:'token_1',text:'24'},{key:'token_2',text:'0'},{key:'token_3',text:'8'}],ans:{slot_1:'token_1'},diff:'hard',exp:'3×8 + 0 = 24',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả khối có cạnh thẳng',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp chữ nhật'},{key:'D',text:'Khối trụ'}],ans:['A','C'],diff:'hard',exp:'Lập phương và hộp CN có cạnh thẳng; cầu và trụ không',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Mặt nào có thể xuất hiện khi cắt khối lập phương?',opts:[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình thoi'},{key:'D',text:'Hình tròn'}],ans:['A','B','C'],diff:'hard',exp:'Cắt theo chiều khác nhau tạo ra hình vuông, chữ nhật, hoặc thoi',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp theo số cạnh tăng dần: khối cầu, khối trụ, khối lập phương',opts:[{key:'1',text:'Khối cầu (0)'},{key:'2',text:'Khối trụ (0+2 đường cong)'},{key:'3',text:'Khối lập phương (12)'}],ans:['1','2','3'],diff:'hard',exp:'0, 0-2, 12 tăng dần',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp số khối nhỏ cần để xếp đầy hộp: 1×1×1, 2×2×2, 2×3×1, 3×3×3',opts:[{key:'1',text:'1×1×1=1'},{key:'2',text:'2×3×1=6'},{key:'3',text:'2×2×2=8'},{key:'4',text:'3×3×3=27'}],ans:['1','2','3','4'],diff:'hard',exp:'1, 6, 8, 27 tăng dần',pts:10,sort:60},
      // Ex 7
      {ex:7,type:'game',text:'Nhóm khối có thể lăn và không thể lăn',opts:[{key:'c1',text:'Khối cầu',pair:'lăn được'},{key:'c2',text:'Khối trụ',pair:'lăn được'},{key:'c3',text:'Khối lập phương',pair:'không lăn'},{key:'c4',text:'Hộp chữ nhật',pair:'không lăn'}],ans:{},diff:'hard',exp:'Lăn: cầu, trụ; Không: LP, hộp CN',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm theo số mặt phẳng: có mặt phẳng và không có mặt phẳng',opts:[{key:'c1',text:'Khối lập phương',pair:'có mặt phẳng'},{key:'c2',text:'Hộp chữ nhật',pair:'có mặt phẳng'},{key:'c3',text:'Khối trụ',pair:'có mặt phẳng'},{key:'c4',text:'Khối cầu',pair:'không có mặt phẳng'}],ans:{},diff:'hard',exp:'Có: LP, hộp CN, trụ; Không: cầu',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối khối với số đặc điểm',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Hộp chữ nhật'},{key:'C',text:'Khối cầu'}],ans:{A:'6M-12C-8Đ',B:'6M-12C-8Đ',C:'0M-0C-0Đ'},diff:'hard',exp:'LP=HCN về số M/C/Đ; Cầu=0',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối mô tả với khối',opts:[{key:'A',text:'Tất cả mặt là hình vuông bằng nhau'},{key:'B',text:'Mặt cong, không có góc'},{key:'C',text:'Mặt tròn và mặt cong hình ống'}],ans:{A:'Khối lập phương',B:'Khối cầu',C:'Khối trụ'},diff:'hard',exp:'Mô tả 3 khối cơ bản',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối vật thực với khối học',opts:[{key:'A',text:'Kem ốc quế'},{key:'B',text:'Xúc xắc'},{key:'C',text:'Hộp sữa'}],ans:{A:'Khối nón',B:'Khối lập phương',C:'Hộp chữ nhật'},diff:'hard',exp:'Kem ốc=nón, xúc xắc=LP, hộp sữa=hộp CN',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'2 khối lập phương + 1 hộp chữ nhật có tổng [b1] đỉnh',opts:[{key:'b1',text:'?'}],ans:{b1:'24'},diff:'hard',exp:'2×8 + 8 = 24',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'Khối nào có số mặt = số đỉnh? [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'Không có'},diff:'hard',exp:'LP: 6 mặt ≠ 8 đỉnh; không khối nào có M=Đ',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Số khối 1×1×1 cần để xếp thành hình chữ nhật 4×3×2 là [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'24'},diff:'hard',exp:'4 × 3 × 2 = 24',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo số cạnh vào khối lập phương: _ cạnh',opts:[{key:'A',text:'8'},{key:'B',text:'12'},{key:'C',text:'6'}],ans:['B'],diff:'hard',exp:'12 cạnh',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo vào nhóm "có 6 mặt": lập phương, cầu, hộp chữ nhật',opts:[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối cầu'},{key:'C',text:'Hộp chữ nhật'}],ans:['A','C'],diff:'hard',exp:'Lập phương và hộp CN đều có 6 mặt',pts:10,sort:70},
      // Ex 8
      {ex:8,type:'multiple_choice',text:'Chọn tất cả phát biểu đúng về khối lập phương',opts:[{key:'A',text:'6 mặt vuông bằng nhau'},{key:'B',text:'12 cạnh bằng nhau'},{key:'C',text:'8 đỉnh'},{key:'D',text:'Có thể lăn được'}],ans:['A','B','C'],diff:'hard',exp:'A,B,C đúng; D sai (LP không lăn)',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Khối nào phân biệt được với khối lập phương?',opts:[{key:'A',text:'Hộp chữ nhật (mặt khác kích thước)'},{key:'B',text:'Khối trụ (có mặt cong)'},{key:'C',text:'Khối cầu (không có góc)'},{key:'D',text:'Hộp đồng nhất (mặt = nhau)'}],ans:['A','B','C'],diff:'hard',exp:'A,B,C đều khác LP; D giống LP',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Tổng số mặt của 1 LP + 1 Cầu + 1 Trụ = ?',opts:[{key:'A',text:'9'},{key:'B',text:'6'},{key:'C',text:'15'}],ans:['A'],diff:'hard',exp:'6+0+3=9 mặt',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'Có 3 hộp chữ nhật. Tổng cạnh là?',opts:[{key:'slot_1',text:'Tổng = [?] cạnh'},{key:'token_1',text:'24'},{key:'token_2',text:'36'},{key:'token_3',text:'18'}],ans:{slot_1:'token_2'},diff:'hard',exp:'3 × 12 = 36',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'Bao nhiêu khối 1×1×1 để xếp 3 lớp trong hộp 3×3?',opts:[{key:'slot_1',text:'Cần [?] khối'},{key:'token_1',text:'9'},{key:'token_2',text:'27'},{key:'token_3',text:'18'}],ans:{slot_1:'token_2'},diff:'hard',exp:'3×3×3=27',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Tổng đỉnh của 4 khối LP + 2 hộp CN?',opts:[{key:'slot_1',text:'Tổng = [?]'},{key:'token_1',text:'40'},{key:'token_2',text:'48'},{key:'token_3',text:'56'}],ans:{slot_1:'token_2'},diff:'hard',exp:'(4+2) × 8 = 48',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp theo số mặt tăng dần: khối cầu, khối trụ, khối LP, tứ diện',opts:[{key:'1',text:'Khối cầu (0 mặt phẳng)'},{key:'2',text:'Khối trụ (3 mặt)'},{key:'3',text:'Tứ diện (4 mặt)'},{key:'4',text:'Khối LP (6 mặt)'}],ans:['1','2','3','4'],diff:'hard',exp:'0, 3, 4, 6 tăng dần',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp số khối nhỏ giảm dần: hộp 3×3×3, 2×2×3, 2×2×2, 1×2×3',opts:[{key:'1',text:'3×3×3=27'},{key:'2',text:'2×2×3=12'},{key:'3',text:'2×2×2=8'},{key:'4',text:'1×2×3=6'}],ans:['1','2','3','4'],diff:'hard',exp:'27, 12, 8, 6 giảm dần',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ phát biểu SAI: "LP có 6 mặt", "LP có 8 đỉnh", "LP có 10 cạnh"',opts:[{key:'A',text:'LP có 6 mặt'},{key:'B',text:'LP có 8 đỉnh'},{key:'C',text:'LP có 10 cạnh'}],ans:['C'],diff:'hard',exp:'LP có 12 cạnh, không phải 10',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ khối KHÔNG CÓ GÓC: khối cầu, khối LP, hộp CN',opts:[{key:'A',text:'Khối cầu'},{key:'B',text:'Khối LP'},{key:'C',text:'Hộp chữ nhật'}],ans:['B','C'],diff:'hard',exp:'Cầu không có góc; LP và hộp CN có góc',pts:10,sort:80},
    ];
  } else {
    // Lesson 138: Luyện tập hình học và không gian
    return [
      // Ex 1
      {ex:1,type:'single_choice',text:'Hình nào mô tả mặt của khối lập phương?',opts:[{key:'A',text:'Tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tròn'}],ans:'B',diff:'easy',exp:'Mặt khối lập phương là hình vuông',pts:10,sort:1},
      {ex:1,type:'single_choice',text:'Vật nào đặt ở TRÊN vật kia?',opts:[{key:'A',text:'Sàn nhà'},{key:'B',text:'Bàn ghế'},{key:'C',text:'Trần nhà'}],ans:'C',diff:'easy',exp:'Trần nhà ở phía trên cùng',pts:10,sort:2},
      {ex:1,type:'single_choice',text:'Hình 2D nào là mặt của hộp chữ nhật?',opts:[{key:'A',text:'Tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],ans:'B',diff:'easy',exp:'Mặt hộp chữ nhật là hình chữ nhật',pts:10,sort:3},
      {ex:1,type:'single_choice',text:'Khi nhìn từ trên xuống, khối trụ trông như hình gì?',opts:[{key:'A',text:'Hình vuông'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình tròn'}],ans:'C',diff:'easy',exp:'Nhìn từ trên xuống khối trụ thấy hình tròn',pts:10,sort:4},
      {ex:1,type:'true_false',text:'Khi nhìn từ cạnh, khối lập phương trông như hình vuông. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Nhìn ngang khối lập phương thấy hình vuông',pts:10,sort:5},
      {ex:1,type:'true_false',text:'Vật ở TRÁI và ở PHẢI là hai vật giống nhau. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! Trái và phải chỉ hướng, không chỉ đặc điểm vật',pts:10,sort:6},
      {ex:1,type:'true_false',text:'Hình tròn có thể là mặt của khối trụ. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Mặt trên và dưới của khối trụ là hình tròn',pts:10,sort:7},
      {ex:1,type:'fill_blank',text:'Nhìn từ trên xuống, hộp chữ nhật trông như hình [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'chữ nhật'},diff:'easy',exp:'Nhìn từ trên xuống hộp CN thấy hình chữ nhật',pts:10,sort:8},
      {ex:1,type:'fill_blank',text:'Vật ở [b1] vật A nghĩa là vật A đang nằm dưới',opts:[{key:'b1',text:'?'}],ans:{b1:'trên'},diff:'easy',exp:'Nếu B ở TRÊN A thì A ở dưới B',pts:10,sort:9},
      {ex:1,type:'fill_blank',text:'Khối cầu nhìn từ mọi hướng đều trông như hình [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'tròn'},diff:'easy',exp:'Khối cầu nhìn từ mọi góc đều thấy hình tròn',pts:10,sort:10},
      // Ex 2
      {ex:2,type:'counting',text:'Đếm số hình vuông nhỏ trong bảng 3×4',opts:[{key:'d1',text:'□'},{key:'d2',text:'□'},{key:'d3',text:'□'},{key:'d4',text:'□'},{key:'d5',text:'□'},{key:'d6',text:'□'},{key:'d7',text:'□'},{key:'d8',text:'□'},{key:'d9',text:'□'},{key:'d10',text:'□'},{key:'d11',text:'□'},{key:'d12',text:'□'}],ans:'12',diff:'easy',exp:'3 × 4 = 12',pts:10,sort:11},
      {ex:2,type:'counting',text:'Đếm số tam giác trong 2 hình vuông (mỗi hình cắt đường chéo)',opts:[{key:'d1',text:'△'},{key:'d2',text:'△'},{key:'d3',text:'△'},{key:'d4',text:'△'}],ans:'4',diff:'easy',exp:'2 × 2 = 4 tam giác',pts:10,sort:12},
      {ex:2,type:'counting',text:'Đếm số khối lập phương trong hình 2×2×2',opts:[{key:'d1',text:'🎲'},{key:'d2',text:'🎲'},{key:'d3',text:'🎲'},{key:'d4',text:'🎲'},{key:'d5',text:'🎲'},{key:'d6',text:'🎲'},{key:'d7',text:'🎲'},{key:'d8',text:'🎲'}],ans:'8',diff:'easy',exp:'2×2×2=8 khối',pts:10,sort:13},
      {ex:2,type:'sorting',text:'Sắp xếp hình 2D theo số cạnh tăng dần: hình tròn, tam giác, hình vuông',opts:[{key:'1',text:'Hình tròn (0)'},{key:'2',text:'Tam giác (3)'},{key:'3',text:'Hình vuông (4)'}],ans:['1','2','3'],diff:'easy',exp:'0, 3, 4 tăng dần',pts:10,sort:14},
      {ex:2,type:'sorting',text:'Sắp xếp vật theo vị trí từ thấp đến cao: ghế, mặt bàn, đèn trên trần',opts:[{key:'1',text:'Ghế'},{key:'2',text:'Mặt bàn'},{key:'3',text:'Đèn trần'}],ans:['1','2','3'],diff:'easy',exp:'Ghế thấp, bàn cao hơn, đèn cao nhất',pts:10,sort:15},
      {ex:2,type:'sorting',text:'Sắp xếp từ ít cạnh đến nhiều: hộp CN(12), LP(12), khối cầu(0), khối trụ(2)',opts:[{key:'1',text:'Khối cầu (0 cạnh thẳng)'},{key:'2',text:'Khối trụ (2 cạnh vòng)'},{key:'3',text:'Hộp chữ nhật (12)'},{key:'4',text:'Khối LP (12)'}],ans:['1','2','3','4'],diff:'easy',exp:'0, 2, 12, 12 tăng dần',pts:10,sort:16},
      {ex:2,type:'cross_out',text:'Gạch bỏ hướng không phải hướng cơ bản: trái, phải, xa, trên, dưới',opts:[{key:'A',text:'Trái'},{key:'B',text:'Xa'},{key:'C',text:'Trên'},{key:'D',text:'Dưới'}],ans:['B'],diff:'easy',exp:'"Xa" không phải hướng cơ bản như trái/phải/trên/dưới/trước/sau',pts:10,sort:17},
      {ex:2,type:'cross_out',text:'Gạch bỏ vị trí từ sai: "con mèo TRÊN ghế" khi mèo ngồi dưới ghế',opts:[{key:'A',text:'Con mèo dưới ghế'},{key:'B',text:'Con mèo trên ghế'},{key:'C',text:'Con mèo cạnh ghế'}],ans:['B'],diff:'easy',exp:'Nếu mèo ngồi dưới, thì "trên ghế" là sai',pts:10,sort:18},
      {ex:2,type:'fill_blank',text:'Nhìn từ mặt bên, khối lập phương trông như hình [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'vuông'},diff:'easy',exp:'Nhìn ngang khối LP thấy hình vuông',pts:10,sort:19},
      {ex:2,type:'fill_blank',text:'Mặt trên của khối trụ là hình [b1]',opts:[{key:'b1',text:'?'}],ans:{b1:'tròn'},diff:'easy',exp:'Mặt trên khối trụ là hình tròn',pts:10,sort:20},
      // Ex 3
      {ex:3,type:'single_choice',text:'Con mèo ở bên TRÁI con chó. Con chó ở bên nào con mèo?',opts:[{key:'A',text:'Trên'},{key:'B',text:'Phải'},{key:'C',text:'Dưới'}],ans:'B',diff:'easy',exp:'Nếu mèo ở trái chó, thì chó ở phải mèo',pts:10,sort:21},
      {ex:3,type:'single_choice',text:'Sách ở TRÊN bàn, bút ở DƯỚI sách. Bút ở đâu so với bàn?',opts:[{key:'A',text:'Trên bàn'},{key:'B',text:'Dưới bàn'},{key:'C',text:'Trên sách'}],ans:'A',diff:'easy',exp:'Bút dưới sách, sách trên bàn, nên bút vẫn trên bàn',pts:10,sort:22},
      {ex:3,type:'single_choice',text:'Từ nào mô tả vị trí theo chiều dọc?',opts:[{key:'A',text:'Trái và phải'},{key:'B',text:'Trên và dưới'},{key:'C',text:'Trước và sau'}],ans:'B',diff:'easy',exp:'Trên và dưới là chiều dọc',pts:10,sort:23},
      {ex:3,type:'single_choice',text:'Bình đứng TRƯỚC Lan. Lan đứng ở đâu so với Bình?',opts:[{key:'A',text:'Trước Bình'},{key:'B',text:'Sau Bình'},{key:'C',text:'Bên cạnh Bình'}],ans:'B',diff:'easy',exp:'Bình trước Lan → Lan sau Bình',pts:10,sort:24},
      {ex:3,type:'true_false',text:'"Trên" và "dưới" là hai hướng ngược nhau. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Trên và dưới ngược chiều nhau',pts:10,sort:25},
      {ex:3,type:'true_false',text:'Vật ở phía PHẢI có thể cùng lúc ở phía TRÊN. Đúng hay sai?',opts:null,ans:true,diff:'easy',exp:'Đúng! Vật có thể vừa ở phải vừa ở trên cùng lúc',pts:10,sort:26},
      {ex:3,type:'true_false',text:'Mặt bên của khối trụ là hình chữ nhật. Đúng hay sai?',opts:null,ans:false,diff:'easy',exp:'Sai! Mặt bên của khối trụ là mặt cong',pts:10,sort:27},
      {ex:3,type:'fill_blank',text:'Con cá ở [b1] mặt nước, con chim ở [b2] mặt nước',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'dưới',b2:'trên'},diff:'easy',exp:'Cá ở dưới nước, chim ở trên nước',pts:10,sort:28},
      {ex:3,type:'fill_blank',text:'Tủ ở PHẢI bàn, bàn ở [b1] tủ',opts:[{key:'b1',text:'?'}],ans:{b1:'trái'},diff:'easy',exp:'Tủ phải bàn → bàn trái tủ',pts:10,sort:29},
      {ex:3,type:'counting',text:'Đếm số hình vuông trên, dưới, trái, phải xung quanh 1 hình vuông trung tâm',opts:[{key:'d1',text:'□'},{key:'d2',text:'□'},{key:'d3',text:'□'},{key:'d4',text:'□'}],ans:'4',diff:'easy',exp:'4 hình vuông xung quanh',pts:10,sort:30},
      // Ex 4
      {ex:4,type:'single_choice',text:'Nhìn khối lập phương từ trên. Hình nào bạn thấy?',opts:[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình vuông'},{key:'C',text:'Tam giác'}],ans:'B',diff:'medium',exp:'Nhìn từ trên khối LP thấy hình vuông',pts:10,sort:31},
      {ex:4,type:'single_choice',text:'Hộp hình vuông 3×3×3. Số khối 1×1×1 bên trong là?',opts:[{key:'A',text:'9'},{key:'B',text:'27'},{key:'C',text:'18'}],ans:'B',diff:'medium',exp:'3×3×3=27',pts:10,sort:32},
      {ex:4,type:'single_choice',text:'Mặt trước của hộp chữ nhật là hình gì?',opts:[{key:'A',text:'Tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],ans:'B',diff:'medium',exp:'Mặt hộp chữ nhật là hình chữ nhật',pts:10,sort:33},
      {ex:4,type:'multiple_choice',text:'Chọn tất cả từ chỉ hướng không gian',opts:[{key:'A',text:'Trên'},{key:'B',text:'Trái'},{key:'C',text:'Sau'},{key:'D',text:'Nhanh'}],ans:['A','B','C'],diff:'medium',exp:'Trên, trái, sau là từ chỉ hướng; "nhanh" là từ chỉ tốc độ',pts:10,sort:34},
      {ex:4,type:'multiple_choice',text:'Hình nào có thể nhìn thấy khi nhìn khối LP từ các hướng khác nhau?',opts:[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình thoi'}],ans:['A'],diff:'medium',exp:'Nhìn LP từ mọi hướng đều thấy hình vuông',pts:10,sort:35},
      {ex:4,type:'multiple_choice',text:'Chọn tất cả mệnh đề đúng về vị trí',opts:[{key:'A',text:'Trái và phải là ngược nhau'},{key:'B',text:'Trên và dưới là ngược nhau'},{key:'C',text:'Trước và sau là ngược nhau'},{key:'D',text:'Trái và trên là ngược nhau'}],ans:['A','B','C'],diff:'medium',exp:'A,B,C đúng; D sai (không phải ngược nhau)',pts:10,sort:36},
      {ex:4,type:'matching',text:'Nối từ với hướng ngược lại',opts:[{key:'A',text:'Trên'},{key:'B',text:'Trước'},{key:'C',text:'Trái'}],ans:{A:'Dưới',B:'Sau',C:'Phải'},diff:'medium',exp:'Trên↔Dưới, Trước↔Sau, Trái↔Phải',pts:10,sort:37},
      {ex:4,type:'matching',text:'Nối hướng nhìn với hình thấy được (với khối LP)',opts:[{key:'A',text:'Nhìn từ trên xuống'},{key:'B',text:'Nhìn từ phía trước'},{key:'C',text:'Nhìn từ cạnh bên'}],ans:{A:'Hình vuông',B:'Hình vuông',C:'Hình vuông'},diff:'medium',exp:'Khối LP nhìn từ mọi hướng đều thấy hình vuông',pts:10,sort:38},
      {ex:4,type:'drag_drop',text:'Kéo từ vào đúng vị trí: "Trần nhà ở __ sàn nhà"',opts:[{key:'A',text:'dưới'},{key:'B',text:'trên'},{key:'C',text:'trái'}],ans:['B'],diff:'medium',exp:'Trần nhà ở TRÊN sàn nhà',pts:10,sort:39},
      {ex:4,type:'drag_drop',text:'Kéo từ: "Cá ở __ mặt nước"',opts:[{key:'A',text:'trên'},{key:'B',text:'dưới'},{key:'C',text:'phải'}],ans:['B'],diff:'medium',exp:'Cá ở DƯỚI mặt nước',pts:10,sort:40},
      // Ex 5
      {ex:5,type:'table_fill',text:'Điền từ chỉ vị trí ngược lại',opts:[{key:'headers',text:'Vị trí|Ngược lại'},{key:'r1',text:'Trên|_r1c1'},{key:'r2',text:'Trái|_r2c1'},{key:'r3',text:'Trước|_r3c1'}],ans:{r1c1:'Dưới',r2c1:'Phải',r3c1:'Sau'},diff:'medium',exp:'Trên↔Dưới, Trái↔Phải, Trước↔Sau',pts:10,sort:41},
      {ex:5,type:'table_fill',text:'Điền hình nhìn thấy theo hướng',opts:[{key:'headers',text:'Khối|Nhìn từ trên|Nhìn từ trước'},{key:'r1',text:'Khối LP|_r1c1|_r1c2'},{key:'r2',text:'Khối trụ|_r2c1|_r2c2'}],ans:{r1c1:'Hình vuông',r1c2:'Hình vuông',r2c1:'Hình tròn',r2c2:'Hình chữ nhật'},diff:'medium',exp:'LP: vuông từ mọi hướng; Trụ: tròn từ trên, chữ nhật từ trước',pts:10,sort:42},
      {ex:5,type:'number_line',text:'Trên tia số, vị trí nào ở GIỮA 3 và 7?',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'5'}],ans:['5'],diff:'medium',exp:'5 nằm giữa 3 và 7',pts:10,sort:43},
      {ex:5,type:'number_line',text:'Số nào ở PHẢI số 4 và ở TRÁI số 8 trên tia số?',opts:[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'6'}],ans:['6'],diff:'medium',exp:'6 nằm giữa 4 và 8',pts:10,sort:44},
      {ex:5,type:'puzzle',text:'Nhìn hộp chữ nhật dài 5, rộng 3 từ phía trước, thấy hình gì kích thước nào?',opts:[{key:'slot_1',text:'Hình [?] kích thước 5×3'},{key:'token_1',text:'chữ nhật'},{key:'token_2',text:'vuông'},{key:'token_3',text:'tròn'}],ans:{slot_1:'token_1'},diff:'medium',exp:'Hình chữ nhật 5×3',pts:10,sort:45},
      {ex:5,type:'puzzle',text:'Hình nào nhìn thấy khi nhìn khối cầu từ bất kỳ hướng nào?',opts:[{key:'slot_1',text:'Hình [?]'},{key:'token_1',text:'vuông'},{key:'token_2',text:'tròn'},{key:'token_3',text:'tam giác'}],ans:{slot_1:'token_2'},diff:'medium',exp:'Khối cầu nhìn từ mọi hướng đều thấy hình tròn',pts:10,sort:46},
      {ex:5,type:'puzzle',text:'A ở trái B. B ở trái C. A ở đâu so với C?',opts:[{key:'slot_1',text:'A ở [?] C'},{key:'token_1',text:'trái'},{key:'token_2',text:'phải'},{key:'token_3',text:'trên'}],ans:{slot_1:'token_1'},diff:'medium',exp:'A trái B, B trái C → A trái C',pts:10,sort:47},
      {ex:5,type:'matching',text:'Nối câu mô tả vị trí với hình minh họa',opts:[{key:'A',text:'Mèo trên ghế'},{key:'B',text:'Cá dưới nước'},{key:'C',text:'Chim trên cây'}],ans:{A:'🐱 ở trên 🪑',B:'🐟 ở dưới 💧',C:'🐦 ở trên 🌳'},diff:'medium',exp:'Mô tả vị trí của các vật',pts:10,sort:48},
      {ex:5,type:'matching',text:'Nối từ chỉ hướng với chiều',opts:[{key:'A',text:'Lên/Xuống'},{key:'B',text:'Sang phải/trái'},{key:'C',text:'Ra trước/sau'}],ans:{A:'Chiều dọc',B:'Chiều ngang',C:'Chiều sâu'},diff:'medium',exp:'3 chiều không gian: dọc, ngang, sâu',pts:10,sort:49},
      {ex:5,type:'drag_drop',text:'Kéo từ ngược lại: nếu mèo ở TRÁI chó, thì chó ở __ mèo',opts:[{key:'A',text:'trái'},{key:'B',text:'phải'},{key:'C',text:'trên'}],ans:['B'],diff:'medium',exp:'Chó ở PHẢI mèo',pts:10,sort:50},
      // Ex 6
      {ex:6,type:'fill_blank',text:'Có 5 vật xếp thành hàng. Vật thứ 3 ở [b1] vật thứ 1',opts:[{key:'b1',text:'?'}],ans:{b1:'phải'},diff:'hard',exp:'Xếp từ trái sang phải: vật 3 ở phải vật 1',pts:10,sort:51},
      {ex:6,type:'fill_blank',text:'A ở trên B 2 bậc, B ở trên C 3 bậc. A ở trên C [b1] bậc',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'2 + 3 = 5 bậc',pts:10,sort:52},
      {ex:6,type:'fill_blank',text:'Nhìn khối trụ từ trên thấy hình [b1], từ cạnh thấy hình [b2]',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'tròn',b2:'chữ nhật'},diff:'hard',exp:'Trụ: trên=tròn, cạnh=chữ nhật',pts:10,sort:53},
      {ex:6,type:'puzzle',text:'Có 4 hộp xếp chồng. Hộp nào ở cao nhất?',opts:[{key:'slot_1',text:'Hộp [?] cao nhất'},{key:'token_1',text:'thứ 4'},{key:'token_2',text:'thứ 1'},{key:'token_3',text:'thứ 2'}],ans:{slot_1:'token_1'},diff:'hard',exp:'Hộp thứ 4 xếp lên trên cùng',pts:10,sort:54},
      {ex:6,type:'puzzle',text:'A ở trước B, C ở sau B. C ở đâu so với A?',opts:[{key:'slot_1',text:'C ở [?] A'},{key:'token_1',text:'trước'},{key:'token_2',text:'sau'},{key:'token_3',text:'cạnh'}],ans:{slot_1:'token_2'},diff:'hard',exp:'A trước B, C sau B → C sau A',pts:10,sort:55},
      {ex:6,type:'puzzle',text:'Nhìn hộp 3×3×3 từ trên. Hình thấy được là hình vuông. Diện tích hình thấy là?',opts:[{key:'slot_1',text:'Diện tích = [?]'},{key:'token_1',text:'9 (3×3)'},{key:'token_2',text:'27 (3×3×3)'},{key:'token_3',text:'6'}],ans:{slot_1:'token_1'},diff:'hard',exp:'Nhìn từ trên: 3×3=9 ô vuông',pts:10,sort:56},
      {ex:6,type:'multiple_choice',text:'Chọn tất cả mô tả đúng vị trí',opts:[{key:'A',text:'Chim bay TRÊN nhà'},{key:'B',text:'Cá bơi DƯỚI thuyền'},{key:'C',text:'Mặt trăng ở DƯỚI mặt đất'},{key:'D',text:'Rễ cây ở DƯỚI đất'}],ans:['A','B','D'],diff:'hard',exp:'A,B,D đúng; C sai (trăng ở trên)',pts:10,sort:57},
      {ex:6,type:'multiple_choice',text:'Số nào thỏa mãn: ở phải 3 và ở trái 8 trên tia số?',opts:[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'7'}],ans:['A','B','C','D'],diff:'hard',exp:'4, 5, 6, 7 đều nằm giữa 3 và 8',pts:10,sort:58},
      {ex:6,type:'sorting',text:'Sắp xếp vật từ thấp đến cao: máy bay, tòa nhà, núi, mây',opts:[{key:'1',text:'Mặt đất'},{key:'2',text:'Tòa nhà'},{key:'3',text:'Mây'},{key:'4',text:'Máy bay'}],ans:['1','2','3','4'],diff:'hard',exp:'Đất, tòa nhà, mây, máy bay từ thấp lên cao',pts:10,sort:59},
      {ex:6,type:'sorting',text:'Sắp xếp theo vị trí từ trái sang phải trong câu: "...C ở phải B... B ở phải A..."',opts:[{key:'1',text:'A (ngoài cùng trái)'},{key:'2',text:'B'},{key:'3',text:'C (ngoài cùng phải)'}],ans:['1','2','3'],diff:'hard',exp:'A → B → C từ trái sang phải',pts:10,sort:60},
      // Ex 7
      {ex:7,type:'game',text:'Nhóm vật theo vị trí so với bạn: TRƯỚC mặt và SAU lưng',opts:[{key:'c1',text:'Bảng đen',pair:'trước mặt'},{key:'c2',text:'Cửa ra vào',pair:'trước mặt'},{key:'c3',text:'Ba lô trên lưng',pair:'sau lưng'},{key:'c4',text:'Bạn cùng bàn sau',pair:'sau lưng'}],ans:{},diff:'hard',exp:'Trước: bảng, cửa; Sau: ba lô, bạn sau',pts:10,sort:61},
      {ex:7,type:'game',text:'Nhóm hình nhìn thấy khi nhìn khối từ trên: hình tròn và hình vuông',opts:[{key:'c1',text:'Nhìn khối LP từ trên',pair:'hình vuông'},{key:'c2',text:'Nhìn khối trụ từ trên',pair:'hình tròn'},{key:'c3',text:'Nhìn hộp CN từ trên',pair:'hình vuông'},{key:'c4',text:'Nhìn khối cầu từ trên',pair:'hình tròn'}],ans:{},diff:'hard',exp:'Vuông: LP, hộp CN; Tròn: trụ, cầu',pts:10,sort:62},
      {ex:7,type:'matching',text:'Nối hướng đối lập',opts:[{key:'A',text:'Trái'},{key:'B',text:'Trên'},{key:'C',text:'Trước'}],ans:{A:'Phải',B:'Dưới',C:'Sau'},diff:'hard',exp:'Trái↔Phải, Trên↔Dưới, Trước↔Sau',pts:10,sort:63},
      {ex:7,type:'matching',text:'Nối mô tả vị trí với câu ví dụ',opts:[{key:'A',text:'Phía trên'},{key:'B',text:'Phía dưới'},{key:'C',text:'Phía trái'}],ans:{A:'Chim bay trên mây',B:'Cá dưới nước',C:'Tay trái cầm bút'},diff:'hard',exp:'Ví dụ cho mỗi hướng',pts:10,sort:64},
      {ex:7,type:'matching',text:'Nối câu điều kiện với kết luận vị trí',opts:[{key:'A',text:'A trái B, B trái C'},{key:'B',text:'X trên Y, Y trên Z'},{key:'C',text:'P trước Q, Q trước R'}],ans:{A:'A trái C',B:'X trên Z',C:'P trước R'},diff:'hard',exp:'Quan hệ vị trí có tính bắc cầu',pts:10,sort:65},
      {ex:7,type:'fill_blank',text:'Hàng 1 ở trên hàng 2. Hàng 3 ở dưới hàng 2. Hàng 1 ở [b1] hàng 3',opts:[{key:'b1',text:'?'}],ans:{b1:'trên'},diff:'hard',exp:'1 trên 2, 2 trên 3 → 1 trên 3',pts:10,sort:66},
      {ex:7,type:'fill_blank',text:'Số 5 ở [b1] số 3 và ở [b2] số 7 trên tia số',opts:[{key:'b1',text:'?'},{key:'b2',text:'?'}],ans:{b1:'phải',b2:'trái'},diff:'hard',exp:'3<5<7: 5 ở phải 3, và ở trái 7',pts:10,sort:67},
      {ex:7,type:'fill_blank',text:'Tủ ở phải bàn 2 bước. Ghế ở trái bàn 3 bước. Khoảng cách tủ-ghế là [b1] bước',opts:[{key:'b1',text:'?'}],ans:{b1:'5'},diff:'hard',exp:'2 + 3 = 5 bước',pts:10,sort:68},
      {ex:7,type:'drag_drop',text:'Kéo từ: "Số 9 ở __ số 5 trên tia số"',opts:[{key:'A',text:'trái'},{key:'B',text:'phải'},{key:'C',text:'trên'}],ans:['B'],diff:'hard',exp:'9 > 5 → 9 ở phía phải (lớn hơn) trên tia số',pts:10,sort:69},
      {ex:7,type:'drag_drop',text:'Kéo vào: "Mèo nằm __ bàn" khi mèo ở phía dưới mặt bàn',opts:[{key:'A',text:'trên'},{key:'B',text:'dưới'},{key:'C',text:'cạnh'}],ans:['B'],diff:'hard',exp:'Mèo nằm DƯỚI bàn',pts:10,sort:70},
      // Ex 8
      {ex:8,type:'multiple_choice',text:'Chọn từ chỉ hướng trong không gian',opts:[{key:'A',text:'Trên'},{key:'B',text:'Nhanh'},{key:'C',text:'Trái'},{key:'D',text:'Sau'}],ans:['A','C','D'],diff:'hard',exp:'Trên, trái, sau là từ chỉ hướng; nhanh là chỉ tốc độ',pts:10,sort:71},
      {ex:8,type:'multiple_choice',text:'Mệnh đề nào đúng về quan hệ vị trí?',opts:[{key:'A',text:'A trái B → B phải A'},{key:'B',text:'X trên Y → Y dưới X'},{key:'C',text:'P trước Q → Q sau P'},{key:'D',text:'M trái N → M phải N'}],ans:['A','B','C'],diff:'hard',exp:'A,B,C đúng; D sai (không thể vừa trái vừa phải)',pts:10,sort:72},
      {ex:8,type:'multiple_choice',text:'Chọn mô tả đúng về nhìn hình khối',opts:[{key:'A',text:'LP nhìn từ trên: hình vuông'},{key:'B',text:'Trụ nhìn từ trên: hình tròn'},{key:'C',text:'Cầu nhìn từ mọi hướng: hình tròn'},{key:'D',text:'LP nhìn từ mọi hướng: hình tròn'}],ans:['A','B','C'],diff:'hard',exp:'A,B,C đúng; D sai (LP nhìn thấy hình vuông)',pts:10,sort:73},
      {ex:8,type:'puzzle',text:'A ở trên B 3 bậc. C ở dưới A 5 bậc. C ở đâu so với B?',opts:[{key:'slot_1',text:'C ở [?] B'},{key:'token_1',text:'trên B 2 bậc'},{key:'token_2',text:'dưới B 2 bậc'},{key:'token_3',text:'cùng với B'}],ans:{slot_1:'token_2'},diff:'hard',exp:'A=B+3, C=A-5=B+3-5=B-2. C dưới B 2 bậc',pts:10,sort:74},
      {ex:8,type:'puzzle',text:'5 hộp xếp hàng ngang. Hộp đỏ ở vị trí 3 (giữa). Hộp xanh ở phải đỏ 2 chỗ. Hộp xanh ở vị trí?',opts:[{key:'slot_1',text:'Vị trí [?]'},{key:'token_1',text:'4'},{key:'token_2',text:'5'},{key:'token_3',text:'6'}],ans:{slot_1:'token_2'},diff:'hard',exp:'3 + 2 = 5',pts:10,sort:75},
      {ex:8,type:'puzzle',text:'Trên tia số 0-10, số nào vừa ở phải 4 vừa ở trái 8, và là số lẻ?',opts:[{key:'slot_1',text:'Số = [?]'},{key:'token_1',text:'5'},{key:'token_2',text:'7'},{key:'token_3',text:'6'}],ans:{slot_1:'token_1'},diff:'hard',exp:'5 và 7 đều thỏa mãn, đáp án 5',pts:10,sort:76},
      {ex:8,type:'sorting',text:'Sắp xếp theo vị trí từ trên cao đến thấp: sàn, trần, ghế, mặt bàn',opts:[{key:'1',text:'Trần nhà'},{key:'2',text:'Mặt bàn'},{key:'3',text:'Ghế'},{key:'4',text:'Sàn nhà'}],ans:['1','2','3','4'],diff:'hard',exp:'Trần cao nhất, sàn thấp nhất',pts:10,sort:77},
      {ex:8,type:'sorting',text:'Sắp xếp theo thứ tự từ trái sang phải: C ở phải B, A ở trái B, D ở phải C',opts:[{key:'1',text:'A'},{key:'2',text:'B'},{key:'3',text:'C'},{key:'4',text:'D'}],ans:['1','2','3','4'],diff:'hard',exp:'A→B→C→D từ trái sang phải',pts:10,sort:78},
      {ex:8,type:'cross_out',text:'Gạch bỏ mô tả VỊ TRÍ SAI: "mặt trăng trên mặt đất", "cá dưới nước", "chim bay trên nhà"',opts:[{key:'A',text:'Mặt trăng trên mặt đất'},{key:'B',text:'Cá dưới nước'},{key:'C',text:'Chim bay trên nhà'}],ans:[],diff:'hard',exp:'Tất cả đều đúng! Trăng trên đất, cá dưới nước, chim trên nhà',pts:10,sort:79},
      {ex:8,type:'cross_out',text:'Gạch bỏ từ KHÔNG phải chỉ hướng: trái, phải, nhanh, trên, to, dưới',opts:[{key:'A',text:'Trái'},{key:'B',text:'Nhanh'},{key:'C',text:'Trên'},{key:'D',text:'To'}],ans:['B','D'],diff:'hard',exp:'"Nhanh" và "to" không chỉ hướng không gian',pts:10,sort:80},
    ];
  }
}

const data: Record<number, { topic: string; questions: any[] }> = {
  136: { topic: 'Khối lập phương và hộp chữ nhật', questions: buildQuestions(136, '') },
  138: { topic: 'Luyện tập hình học và không gian', questions: buildQuestions(138, '') },
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
