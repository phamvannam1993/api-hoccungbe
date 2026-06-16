import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

type Question = {
  lessonId: number;
  exerciseNumber: number;
  questionType: string;
  questionText: string;
  optionsJson: any[] | null;
  correctAnswerJson: any;
  difficultyLevel: string;
  points: number;
  sortOrder: number;
};

// Helper
const j = (v: any) => JSON.stringify(v);

function makeQuestions(lessonId: number, topic: string): Question[] {
  const qs: Question[] = [];
  let order = 1;

  function q(ex: number, type: string, text: string, opts: any, ans: any, diff: string) {
    qs.push({
      lessonId,
      exerciseNumber: ex,
      questionType: type,
      questionText: text,
      optionsJson: opts,
      correctAnswerJson: ans,
      difficultyLevel: diff,
      points: ex === 1 ? 1 : ex === 2 ? 2 : 3,
      sortOrder: order++,
    });
  }

  // ========== LESSON 133: Phép trừ trong phạm vi 10 ==========
  if (lessonId === 133) {
    // Exercise 1 - easy
    q(1,'single_choice','8 - 3 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','easy');
    q(1,'single_choice','7 - 2 = ?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'}],'C','easy');
    q(1,'single_choice','9 - 4 = ?',[{key:'A',text:'5'},{key:'B',text:'4'},{key:'C',text:'6'}],'A','easy');
    q(1,'true_false','6 - 3 = 3. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','5 - 2 = 4. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','10 - 4 = [b1]',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'fill_blank','8 - 5 = [b1]',[{key:'b1',text:''}],{b1:'3'},'easy');
    q(1,'counting','Có mấy quả táo bị gạch đi? 🍎🍎~~🍎~~🍎🍎',[{key:'d1',text:'🍎'},{key:'d2',text:'🍎'},{key:'d3',text:'🍎'},{key:'d4',text:'🍎'},{key:'d5',text:'🍎'}],'2','easy');
    q(1,'sorting','Sắp xếp các phép trừ theo kết quả tăng dần: 9-5, 8-6, 10-3',[{key:'1',text:'9-5'},{key:'2',text:'8-6'},{key:'3',text:'10-3'}],['2','1','3'],'easy');
    q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'7-3=4'},{key:'B',text:'9-2=6'},{key:'C',text:'6-4=2'},{key:'D',text:'8-5=3'}],['B'],'easy');

    // Exercise 2 - medium
    q(2,'single_choice','Kết quả của 10 - 7 là:',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','medium');
    q(2,'single_choice','Số nào điền vào chỗ trống? 9 - ___ = 4',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'}],'C','medium');
    q(2,'multiple_choice','Những phép tính nào có kết quả bằng 3?',[{key:'A',text:'7-4'},{key:'B',text:'8-5'},{key:'C',text:'6-2'},{key:'D',text:'9-6'}],['A','B','D'],'medium');
    q(2,'multiple_choice','Phép tính nào có kết quả lớn hơn 5?',[{key:'A',text:'9-3'},{key:'B',text:'8-4'},{key:'C',text:'7-5'},{key:'D',text:'10-2'}],['A','D'],'medium');
    q(2,'matching','Nối phép tính với kết quả:',[{key:'A',text:'9-4'},{key:'B',text:'8-3'},{key:'C',text:'7-2'}],{A:'5',B:'5',C:'5'},'medium');
    q(2,'matching','Nối phép tính với kết quả đúng:',[{key:'A',text:'10-6'},{key:'B',text:'9-7'},{key:'C',text:'8-4'}],{A:'4',B:'2',C:'4'},'medium');
    q(2,'drag_drop','Kéo thả số thích hợp: 10 - ___ = 6, 9 - ___ = 5, 8 - ___ = 3',[{key:'1',text:'4'},{key:'2',text:'5'},{key:'3',text:'4'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền vào bảng trừ:',[{key:'headers',text:'Phép trừ|Kết quả'},{key:'r1',text:'8-2|_r1c1'},{key:'r2',text:'9-3|_r2c1'}],{r1c1:'6',r2c1:'6'},'medium');
    q(2,'number_line','Tìm số còn thiếu trên trục số: 10 - 4 = ?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'6'}],['6'],'medium');
    q(2,'puzzle','Ghép ô: Tìm số điền vào chỗ trống',[{key:'slot_1',text:'? - 3 = 6'},{key:'token_9',text:'9'},{key:'token_8',text:'8'},{key:'token_7',text:'7'}],{slot_1:'token_9'},'medium');

    // Exercise 3 - hard
    q(3,'fill_blank','Lan có 9 cái kẹo, cho bạn 4 cái. Lan còn [b1] cái kẹo.',[{key:'b1',text:''}],{b1:'5'},'hard');
    q(3,'fill_blank','Trên cây có 8 con chim, bay đi 3 con. Còn lại [b1] con chim.',[{key:'b1',text:''}],{b1:'5'},'hard');
    q(3,'puzzle','Tìm số điền vào ô trống: ___ - 4 = 5',[{key:'slot_1',text:'? - 4 = 5'},{key:'token_9',text:'9'},{key:'token_8',text:'8'},{key:'token_10',text:'10'}],{slot_1:'token_9'},'hard');
    q(3,'puzzle','Tìm số điền vào ô trống: 10 - ___ = 3',[{key:'slot_1',text:'10 - ? = 3'},{key:'token_7',text:'7'},{key:'token_6',text:'6'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard');
    q(3,'game','Nối các phép tính có cùng kết quả:',[{key:'c1',text:'9-4',pair:'five'},{key:'c2',text:'7-2',pair:'five'},{key:'c3',text:'10-6',pair:'four'},{key:'c4',text:'8-4',pair:'four'},{key:'c5',text:'10-4',pair:'six'},{key:'c6',text:'9-3',pair:'six'}],{},'hard');
    q(3,'sorting','Sắp xếp kết quả phép trừ từ lớn đến nhỏ: 10-3, 9-6, 8-1, 7-4',[{key:'1',text:'10-3'},{key:'2',text:'8-1'},{key:'3',text:'7-4'},{key:'4',text:'9-6'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối bài toán với lời giải:',[{key:'A',text:'Có 8 bút, mất 3 bút'},{key:'B',text:'Có 10 cam, ăn 4 cam'},{key:'C',text:'Có 7 sách, cho 2 sách'}],{A:'5 bút',B:'6 cam',C:'5 sách'},'hard');
    q(3,'multiple_choice','Chọn các phép tính cho kết quả bằng 4:',[{key:'A',text:'8-4'},{key:'B',text:'9-5'},{key:'C',text:'7-3'},{key:'D',text:'10-5'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'6-2=4'},{key:'B',text:'7-3=5'},{key:'C',text:'8-4=4'},{key:'D',text:'9-6=4'}],['A','C','D'],'hard');
    q(3,'drag_drop','Sắp xếp các bước giải bài toán theo thứ tự đúng:',[{key:'1',text:'Đọc đề bài'},{key:'2',text:'Viết phép tính'},{key:'3',text:'Tính kết quả'}],['1','2','3'],'hard');
  }

  // ========== LESSON 134: Bảng cộng, bảng trừ trong phạm vi 10 ==========
  else if (lessonId === 134) {
    // Exercise 1
    q(1,'single_choice','3 + 4 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','easy');
    q(1,'single_choice','6 - 2 = ?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}],'C','easy');
    q(1,'single_choice','5 + 5 = ?',[{key:'A',text:'9'},{key:'B',text:'11'},{key:'C',text:'10'}],'C','easy');
    q(1,'true_false','4 + 3 = 7. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','8 - 4 = 5. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','7 + [b1] = 10',[{key:'b1',text:''}],{b1:'3'},'easy');
    q(1,'fill_blank','9 - [b1] = 5',[{key:'b1',text:''}],{b1:'4'},'easy');
    q(1,'counting','Đếm số hình tròn: ⭕⭕⭕⭕⭕⭕',[{key:'d1',text:'⭕'},{key:'d2',text:'⭕'},{key:'d3',text:'⭕'},{key:'d4',text:'⭕'},{key:'d5',text:'⭕'},{key:'d6',text:'⭕'}],'6','easy');
    q(1,'sorting','Sắp xếp theo thứ tự tăng dần: 2+3, 1+1, 4+4',[{key:'1',text:'2+3'},{key:'2',text:'1+1'},{key:'3',text:'4+4'}],['2','1','3'],'easy');
    q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'3+4=7'},{key:'B',text:'5+3=9'},{key:'C',text:'6+2=8'},{key:'D',text:'4+5=9'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Số nào điền vào: ___ + 4 = 9',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','medium');
    q(2,'single_choice','Số nào điền vào: 10 - ___ = 3',[{key:'A',text:'7'},{key:'B',text:'6'},{key:'C',text:'8'}],'A','medium');
    q(2,'multiple_choice','Phép tính nào có kết quả bằng 8?',[{key:'A',text:'3+5'},{key:'B',text:'4+4'},{key:'C',text:'9-1'},{key:'D',text:'6+3'}],['A','B','C'],'medium');
    q(2,'multiple_choice','Chọn phép tính đúng:',[{key:'A',text:'5+3=8'},{key:'B',text:'7-2=5'},{key:'C',text:'6+4=9'},{key:'D',text:'8-3=5'}],['A','B','D'],'medium');
    q(2,'matching','Nối cộng với trừ tương ứng:',[{key:'A',text:'3+7=10'},{key:'B',text:'4+6=10'},{key:'C',text:'5+5=10'}],{A:'10-3=7',B:'10-4=6',C:'10-5=5'},'medium');
    q(2,'matching','Nối phép cộng với kết quả:',[{key:'A',text:'6+3'},{key:'B',text:'7+2'},{key:'C',text:'8+1'}],{A:'9',B:'9',C:'9'},'medium');
    q(2,'drag_drop','Điền số còn thiếu: 4+___=7, 6+___=9, 5+___=8',[{key:'1',text:'3'},{key:'2',text:'3'},{key:'3',text:'3'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền vào bảng cộng trừ:',[{key:'headers',text:'Cộng|Trừ'},{key:'r1',text:'3+4=_r1c1|7-3=_r1c2'}],{r1c1:'7',r1c2:'4'},'medium');
    q(2,'number_line','Tính 4 + 3 trên trục số:',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'7'}],['7'],'medium');
    q(2,'puzzle','Ghép: ___ + 5 = 9',[{key:'slot_1',text:'? + 5 = 9'},{key:'token_4',text:'4'},{key:'token_3',text:'3'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'medium');

    // Exercise 3
    q(3,'fill_blank','An có 5 quyển vở, mẹ mua thêm 4 quyển. An có tất cả [b1] quyển vở.',[{key:'b1',text:''}],{b1:'9'},'hard');
    q(3,'fill_blank','Hộp có 10 bút, lấy ra 6 bút. Còn lại [b1] bút trong hộp.',[{key:'b1',text:''}],{b1:'4'},'hard');
    q(3,'puzzle','Điền số: ___ - 3 = 4',[{key:'slot_1',text:'? - 3 = 4'},{key:'token_7',text:'7'},{key:'token_6',text:'6'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard');
    q(3,'puzzle','Điền số: 2 + ___ = 8',[{key:'slot_1',text:'2 + ? = 8'},{key:'token_6',text:'6'},{key:'token_5',text:'5'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard');
    q(3,'game','Nối cộng và trừ cùng kết quả:',[{key:'c1',text:'3+4',pair:'seven'},{key:'c2',text:'10-3',pair:'seven'},{key:'c3',text:'2+6',pair:'eight'},{key:'c4',text:'10-2',pair:'eight'},{key:'c5',text:'4+5',pair:'nine'},{key:'c6',text:'10-1',pair:'nine'}],{},'hard');
    q(3,'sorting','Sắp xếp từ nhỏ đến lớn: 3+4, 5+2, 1+6, 8+0',[{key:'1',text:'3+4'},{key:'2',text:'5+2'},{key:'3',text:'1+6'},{key:'4',text:'8+0'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối bài toán với phép tính:',[{key:'A',text:'5 thêm 3'},{key:'B',text:'9 bớt 4'},{key:'C',text:'7 thêm 2'}],{A:'5+3=8',B:'9-4=5',C:'7+2=9'},'hard');
    q(3,'multiple_choice','Chọn các cặp cộng trừ liên quan đến nhau:',[{key:'A',text:'4+3=7 và 7-3=4'},{key:'B',text:'5+2=7 và 7-2=5'},{key:'C',text:'6+4=10 và 10-4=6'},{key:'D',text:'3+5=9 và 9-5=4'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Điền số đúng vào: 8 - ___ = 3',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'3'}],['B'],'hard');
    q(3,'drag_drop','Sắp xếp phép tính theo kết quả giảm dần:',[{key:'1',text:'10-1'},{key:'2',text:'7+2'},{key:'3',text:'6+3'}],['1','2','3'],'hard');
  }

  // ========== LESSON 135: Luyện tập chung ==========
  else if (lessonId === 135) {
    // Exercise 1
    q(1,'single_choice','4 + 5 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy');
    q(1,'single_choice','10 - 6 = ?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}],'C','easy');
    q(1,'single_choice','3 + 3 = ?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','easy');
    q(1,'true_false','7 + 3 = 10. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','9 - 3 = 7. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','6 + [b1] = 10',[{key:'b1',text:''}],{b1:'4'},'easy');
    q(1,'fill_blank','8 - [b1] = 2',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'counting','Đếm số ngôi sao: ⭐⭐⭐⭐⭐⭐⭐',[{key:'d1',text:'⭐'},{key:'d2',text:'⭐'},{key:'d3',text:'⭐'},{key:'d4',text:'⭐'},{key:'d5',text:'⭐'},{key:'d6',text:'⭐'},{key:'d7',text:'⭐'}],'7','easy');
    q(1,'sorting','Sắp xếp tăng dần: 8-3, 4+1, 7-5',[{key:'1',text:'8-3'},{key:'2',text:'4+1'},{key:'3',text:'7-5'}],['3','2','1'],'easy');
    q(1,'cross_out','Gạch bỏ kết quả sai:',[{key:'A',text:'5+4=9'},{key:'B',text:'6+3=10'},{key:'C',text:'7+2=9'},{key:'D',text:'8+1=9'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Nam có 6 cái bánh, ăn 2 cái. Còn lại mấy cái?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'4'}],'C','medium');
    q(2,'single_choice','Điền số: ___ + 3 = 8',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','medium');
    q(2,'multiple_choice','Phép tính nào bằng 6?',[{key:'A',text:'3+3'},{key:'B',text:'8-2'},{key:'C',text:'10-4'},{key:'D',text:'4+3'}],['A','B','C'],'medium');
    q(2,'multiple_choice','Phép tính nào sai?',[{key:'A',text:'5+5=10'},{key:'B',text:'4+6=11'},{key:'C',text:'7+3=10'},{key:'D',text:'8+2=11'}],['B','D'],'medium');
    q(2,'matching','Nối đúng:',[{key:'A',text:'5+4'},{key:'B',text:'6+3'},{key:'C',text:'7+2'}],{A:'9',B:'9',C:'9'},'medium');
    q(2,'matching','Nối phép cộng với phép trừ tương ứng:',[{key:'A',text:'4+5=9'},{key:'B',text:'3+6=9'},{key:'C',text:'2+7=9'}],{A:'9-5=4',B:'9-6=3',C:'9-7=2'},'medium');
    q(2,'drag_drop','Kéo số đúng vào chỗ trống: 3+___=7, 5+___=9, 2+___=6',[{key:'1',text:'4'},{key:'2',text:'4'},{key:'3',text:'4'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền vào bảng:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'5+4|_r1c1'},{key:'r2',text:'9-4|_r2c1'}],{r1c1:'9',r2c1:'5'},'medium');
    q(2,'number_line','Tìm 7 - 3 = ? trên trục số:',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'4'}],['4'],'medium');
    q(2,'puzzle','Ghép số: 6 + ___ = 10',[{key:'slot_1',text:'6 + ? = 10'},{key:'token_4',text:'4'},{key:'token_3',text:'3'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'medium');

    // Exercise 3
    q(3,'fill_blank','Bình có 7 viên bi đỏ và 3 viên bi xanh. Bình có tất cả [b1] viên bi.',[{key:'b1',text:''}],{b1:'10'},'hard');
    q(3,'fill_blank','Vườn có 9 bông hoa, hái 5 bông. Còn lại [b1] bông hoa.',[{key:'b1',text:''}],{b1:'4'},'hard');
    q(3,'puzzle','Điền số: ___ - 5 = 4',[{key:'slot_1',text:'? - 5 = 4'},{key:'token_9',text:'9'},{key:'token_8',text:'8'},{key:'token_10',text:'10'}],{slot_1:'token_9'},'hard');
    q(3,'puzzle','Điền số: 3 + ___ = 9',[{key:'slot_1',text:'3 + ? = 9'},{key:'token_6',text:'6'},{key:'token_5',text:'5'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard');
    q(3,'game','Nối phép tính cùng kết quả:',[{key:'c1',text:'4+3',pair:'seven'},{key:'c2',text:'9-2',pair:'seven'},{key:'c3',text:'5+3',pair:'eight'},{key:'c4',text:'10-2',pair:'eight'},{key:'c5',text:'5+4',pair:'nine'},{key:'c6',text:'10-1',pair:'nine'}],{},'hard');
    q(3,'sorting','Sắp xếp giảm dần: 2+5, 4+4, 3+6, 1+8',[{key:'1',text:'3+6'},{key:'2',text:'1+8'},{key:'3',text:'4+4'},{key:'4',text:'2+5'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối bài toán với phép tính phù hợp:',[{key:'A',text:'Thêm 3 vào 6'},{key:'B',text:'Bớt 4 từ 9'},{key:'C',text:'Thêm 4 vào 5'}],{A:'6+3=9',B:'9-4=5',C:'5+4=9'},'hard');
    q(3,'multiple_choice','Chọn phép tính đúng:',[{key:'A',text:'6+4=10'},{key:'B',text:'7+3=10'},{key:'C',text:'8+2=10'},{key:'D',text:'5+4=10'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Số nào điền vào 10 - ___ = 4?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'},{key:'D',text:'4'}],['B'],'hard');
    q(3,'drag_drop','Kéo sắp xếp: 9-0, 5+3, 7+1, 10-2 theo thứ tự tăng dần:',[{key:'1',text:'5+3'},{key:'2',text:'7+1'},{key:'3',text:'10-2'},{key:'4',text:'9-0'}],['1','2','3','4'],'hard');
  }

  // ========== LESSON 136: Khối lập phương, khối hộp chữ nhật ==========
  else if (lessonId === 136) {
    // Exercise 1
    q(1,'single_choice','Khối lập phương có mấy mặt?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','easy');
    q(1,'single_choice','Hình nào là khối hộp chữ nhật?',[{key:'A',text:'Viên xúc xắc'},{key:'B',text:'Hộp giày'},{key:'C',text:'Quả bóng'}],'B','easy');
    q(1,'single_choice','Khối lập phương có bao nhiêu cạnh?',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'12'}],'C','easy');
    q(1,'true_false','Khối lập phương có 6 mặt bằng nhau. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Khối hộp chữ nhật là khối có tất cả các mặt bằng nhau. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','Khối lập phương có [b1] đỉnh.',[{key:'b1',text:''}],{b1:'8'},'easy');
    q(1,'fill_blank','Khối hộp chữ nhật có [b1] mặt.',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'counting','Đếm số khối lập phương trong hình: 🟦🟦🟦🟦',[{key:'d1',text:'🟦'},{key:'d2',text:'🟦'},{key:'d3',text:'🟦'},{key:'d4',text:'🟦'}],'4','easy');
    q(1,'sorting','Sắp xếp từ nhỏ đến lớn số mặt: tam giác, hình vuông, khối lập phương',[{key:'1',text:'Tam giác: 3 cạnh'},{key:'2',text:'Hình vuông: 4 cạnh'},{key:'3',text:'Khối lập phương: 12 cạnh'}],['1','2','3'],'easy');
    q(1,'cross_out','Gạch bỏ vật KHÔNG phải khối hộp chữ nhật:',[{key:'A',text:'Hộp sữa'},{key:'B',text:'Viên gạch'},{key:'C',text:'Quả cam'},{key:'D',text:'Quyển sách'}],['C'],'easy');

    // Exercise 2
    q(2,'single_choice','Vật nào có dạng khối lập phương?',[{key:'A',text:'Hộp bút chì'},{key:'B',text:'Viên xúc xắc'},{key:'C',text:'Cái ly'}],'B','medium');
    q(2,'single_choice','Khối hộp chữ nhật khác khối lập phương ở điểm nào?',[{key:'A',text:'Số mặt'},{key:'B',text:'Số đỉnh'},{key:'C',text:'Các mặt không đều bằng nhau'}],'C','medium');
    q(2,'multiple_choice','Vật nào có dạng khối hộp chữ nhật?',[{key:'A',text:'Hộp bánh'},{key:'B',text:'Viên xúc xắc'},{key:'C',text:'Quyển sách'},{key:'D',text:'Hộp sữa'}],['A','C','D'],'medium');
    q(2,'multiple_choice','Khối lập phương và khối hộp chữ nhật giống nhau ở điểm nào?',[{key:'A',text:'Đều có 6 mặt'},{key:'B',text:'Đều có 8 đỉnh'},{key:'C',text:'Đều có 12 cạnh'},{key:'D',text:'Các mặt đều bằng nhau'}],['A','B','C'],'medium');
    q(2,'matching','Nối hình với tên:',[{key:'A',text:'6 mặt bằng nhau'},{key:'B',text:'6 mặt không đều bằng nhau'},{key:'C',text:'Có dạng viên xúc xắc'}],{A:'Khối lập phương',B:'Khối hộp chữ nhật',C:'Khối lập phương'},'medium');
    q(2,'matching','Nối vật với hình khối:',[{key:'A',text:'Hộp giày'},{key:'B',text:'Khối rubik'},{key:'C',text:'Quyển vở'}],{A:'Khối hộp chữ nhật',B:'Khối lập phương',C:'Khối hộp chữ nhật'},'medium');
    q(2,'drag_drop','Kéo thả đặc điểm vào đúng hình khối:',[{key:'1',text:'6 mặt bằng nhau'},{key:'2',text:'12 cạnh bằng nhau'},{key:'3',text:'Mặt dài ngắn khác nhau'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền vào bảng so sánh:',[{key:'headers',text:'Đặc điểm|Khối lập phương|Khối hộp chữ nhật'},{key:'r1',text:'Số mặt|_r1c1|_r1c2'}],{r1c1:'6',r1c2:'6'},'medium');
    q(2,'number_line','Đếm số đỉnh của 2 khối lập phương:',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8|10|12|14|16'},{key:'hidden',text:'16'}],['16'],'medium');
    q(2,'puzzle','Ghép: Khối lập phương có ___ mặt',[{key:'slot_1',text:'Khối lập phương có ? mặt'},{key:'token_6',text:'6'},{key:'token_8',text:'8'},{key:'token_4',text:'4'}],{slot_1:'token_6'},'medium');

    // Exercise 3
    q(3,'fill_blank','Khối hộp chữ nhật có [b1] cạnh.',[{key:'b1',text:''}],{b1:'12'},'hard');
    q(3,'fill_blank','Mỗi mặt của khối lập phương là hình [b1].',[{key:'b1',text:''}],{b1:'vuông'},'hard');
    q(3,'puzzle','Điền số: Khối lập phương có ___ đỉnh',[{key:'slot_1',text:'Khối lập phương có ? đỉnh'},{key:'token_8',text:'8'},{key:'token_6',text:'6'},{key:'token_10',text:'10'}],{slot_1:'token_8'},'hard');
    q(3,'puzzle','Ghép: Có ___ hộp sữa (khối hộp chữ nhật) khi xếp 2 hàng, mỗi hàng 3 hộp',[{key:'slot_1',text:'Tổng số hộp = ?'},{key:'token_6',text:'6'},{key:'token_5',text:'5'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard');
    q(3,'game','Phân loại vật thể theo hình khối:',[{key:'c1',text:'Hộp bánh',pair:'hop_chu_nhat'},{key:'c2',text:'Viên xúc xắc',pair:'lap_phuong'},{key:'c3',text:'Hộp giày',pair:'hop_chu_nhat'},{key:'c4',text:'Khối rubik',pair:'lap_phuong'},{key:'c5',text:'Quyển sách',pair:'hop_chu_nhat'},{key:'c6',text:'Viên gạch đặc biệt',pair:'lap_phuong'}],{},'hard');
    q(3,'sorting','Sắp xếp từ ít đến nhiều: số mặt tam giác, số mặt khối lập phương, số cạnh khối lập phương',[{key:'1',text:'Tam giác: 3 cạnh'},{key:'2',text:'Khối lập phương: 6 mặt'},{key:'3',text:'Khối lập phương: 12 cạnh'}],['1','2','3'],'hard');
    q(3,'matching','Nối đúng đặc điểm:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Cả hai hình'}],{A:'Các mặt đều là hình vuông',B:'Có mặt hình chữ nhật',C:'Có 8 đỉnh'},'hard');
    q(3,'multiple_choice','Chọn đặc điểm đúng của khối lập phương:',[{key:'A',text:'6 mặt hình vuông bằng nhau'},{key:'B',text:'8 đỉnh'},{key:'C',text:'12 cạnh bằng nhau'},{key:'D',text:'4 mặt hình chữ nhật'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Khối hộp chữ nhật có:',[{key:'A',text:'8 đỉnh'},{key:'B',text:'12 cạnh'},{key:'C',text:'6 mặt'},{key:'D',text:'Tất cả các mặt đều bằng nhau'}],['A','B','C'],'hard');
    q(3,'drag_drop','Sắp xếp các bước vẽ khối lập phương:',[{key:'1',text:'Vẽ hình vuông phía trước'},{key:'2',text:'Vẽ hình vuông phía sau'},{key:'3',text:'Nối các đỉnh tương ứng'}],['1','2','3'],'hard');
  }

  // ========== LESSON 137: Vị trí, định hướng trong không gian ==========
  else if (lessonId === 137) {
    // Exercise 1
    q(1,'single_choice','Con mèo đứng bên trái con chó. Con chó đứng bên ___ con mèo.',[{key:'A',text:'trái'},{key:'B',text:'phải'},{key:'C',text:'trên'}],'B','easy');
    q(1,'single_choice','Quyển sách ở trên bàn. Bàn ở ___ quyển sách.',[{key:'A',text:'dưới'},{key:'B',text:'trên'},{key:'C',text:'trái'}],'A','easy');
    q(1,'single_choice','An đứng trước Bình. Bình đứng ___ An.',[{key:'A',text:'trước'},{key:'B',text:'sau'},{key:'C',text:'cạnh'}],'B','easy');
    q(1,'true_false','Khi ta nhìn về phía trước thì bên tay phải là phía phải. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Trên và dưới là cùng một hướng. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','Chim đang bay ở [b1] mây.',[{key:'b1',text:''}],{b1:'trên'},'easy');
    q(1,'fill_blank','Con cá bơi ở [b1] mặt nước.',[{key:'b1',text:''}],{b1:'dưới'},'easy');
    q(1,'counting','Đếm số hướng cơ bản trong không gian: trên, dưới, trái, phải, trước, sau',[{key:'d1',text:'trên'},{key:'d2',text:'dưới'},{key:'d3',text:'trái'},{key:'d4',text:'phải'},{key:'d5',text:'trước'},{key:'d6',text:'sau'}],'6','easy');
    q(1,'sorting','Sắp xếp từ dưới lên trên: tầng 1, tầng 3, tầng 2',[{key:'1',text:'tầng 1'},{key:'2',text:'tầng 3'},{key:'3',text:'tầng 2'}],['1','3','2'],'easy');
    q(1,'cross_out','Gạch bỏ từ chỉ vị trí sai:',[{key:'A',text:'trên'},{key:'B',text:'nhanh'},{key:'C',text:'dưới'},{key:'D',text:'trái'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Nhà ở phía Bắc trường. Trường ở phía ___ nhà.',[{key:'A',text:'Bắc'},{key:'B',text:'Nam'},{key:'C',text:'Đông'}],'B','medium');
    q(2,'single_choice','Bạn đang nhìn về phía trước. Cây ở bên phải bạn. Nếu bạn quay nửa vòng, cây ở phía nào?',[{key:'A',text:'Phải'},{key:'B',text:'Trái'},{key:'C',text:'Sau'}],'B','medium');
    q(2,'multiple_choice','Những từ nào chỉ vị trí trong không gian?',[{key:'A',text:'trên'},{key:'B',text:'đẹp'},{key:'C',text:'dưới'},{key:'D',text:'trước'}],['A','C','D'],'medium');
    q(2,'multiple_choice','Chọn câu mô tả đúng cho hình ảnh hộp đặt trên bàn:',[{key:'A',text:'Hộp ở trên bàn'},{key:'B',text:'Bàn ở dưới hộp'},{key:'C',text:'Hộp ở dưới bàn'},{key:'D',text:'Bàn đỡ hộp'}],['A','B','D'],'medium');
    q(2,'matching','Nối từ trái nghĩa:',[{key:'A',text:'trên'},{key:'B',text:'trái'},{key:'C',text:'trước'}],{A:'dưới',B:'phải',C:'sau'},'medium');
    q(2,'matching','Nối vật với vị trí:',[{key:'A',text:'Chim'},{key:'B',text:'Cá'},{key:'C',text:'Giun'}],{A:'trên trời',B:'dưới nước',C:'dưới đất'},'medium');
    q(2,'drag_drop','Điền hướng đúng: Mặt trời mọc ở ___, lặn ở ___, buổi trưa ở ___',[{key:'1',text:'phía Đông'},{key:'2',text:'phía Tây'},{key:'3',text:'trên đầu'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền vào bảng vị trí:',[{key:'headers',text:'Vật|Vị trí'},{key:'r1',text:'Mây|_r1c1'},{key:'r2',text:'Rễ cây|_r2c1'}],{r1c1:'trên trời',r2c1:'dưới đất'},'medium');
    q(2,'number_line','Điền số tầng: tầng 1 ở dưới cùng, tầng trên cùng là tầng 5. Tầng giữa là tầng:',[{key:'min',text:'1'},{key:'max',text:'5'},{key:'step',text:'1'},{key:'marks',text:'1|2|3|4|5'},{key:'hidden',text:'3'}],['3'],'medium');
    q(2,'puzzle','Ghép: Nếu A ở trên B, B ở trên C thì A ở ___ C',[{key:'slot_1',text:'A ở ? C'},{key:'token_tren',text:'trên'},{key:'token_duoi',text:'dưới'},{key:'token_canh',text:'cạnh'}],{slot_1:'token_tren'},'medium');

    // Exercise 3
    q(3,'fill_blank','Nam ngồi trước Lan. Lan ngồi sau [b1].',[{key:'b1',text:''}],{b1:'Nam'},'hard');
    q(3,'fill_blank','Hoa để quyển sách ở bên [b1] cái bút.',[{key:'b1',text:''}],{b1:'trái'},'hard');
    q(3,'puzzle','Ghép: Con chó đứng giữa con mèo và con gà. Con mèo ở bên trái. Con gà ở bên ___',[{key:'slot_1',text:'Con gà ở bên ?'},{key:'token_phai',text:'phải'},{key:'token_trai',text:'trái'},{key:'token_sau',text:'sau'}],{slot_1:'token_phai'},'hard');
    q(3,'puzzle','An đứng trước Bình, Bình đứng trước Cường. Ai đứng sau cùng?',[{key:'slot_1',text:'Ai đứng sau cùng?'},{key:'token_cuong',text:'Cường'},{key:'token_binh',text:'Bình'},{key:'token_an',text:'An'}],{slot_1:'token_cuong'},'hard');
    q(3,'game','Phân loại từ chỉ vị trí theo trục:',[{key:'c1',text:'trên',pair:'doc'},{key:'c2',text:'dưới',pair:'doc'},{key:'c3',text:'trái',pair:'ngang'},{key:'c4',text:'phải',pair:'ngang'},{key:'c5',text:'trước',pair:'sau_truoc'},{key:'c6',text:'sau',pair:'sau_truoc'}],{},'hard');
    q(3,'sorting','Sắp xếp vị trí từ thấp đến cao: tầng hầm, tầng 2, tầng 1, tầng 3',[{key:'1',text:'tầng hầm'},{key:'2',text:'tầng 1'},{key:'3',text:'tầng 2'},{key:'4',text:'tầng 3'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối mô tả với vị trí đúng:',[{key:'A',text:'Chim đậu trên cành cây'},{key:'B',text:'Cá bơi dưới hồ'},{key:'C',text:'Bạn đứng trước cửa'}],{A:'trên',B:'dưới',C:'trước'},'hard');
    q(3,'multiple_choice','Chọn câu đúng:',[{key:'A',text:'Trái và phải là hai hướng ngược nhau'},{key:'B',text:'Trên và dưới là hai hướng ngược nhau'},{key:'C',text:'Trước và sau là hai hướng ngược nhau'},{key:'D',text:'Trên và trái là hai hướng ngược nhau'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Điền từ thích hợp: Bố đứng ___ mẹ và con đứng ___ bố.',[{key:'A',text:'cạnh - sau'},{key:'B',text:'trước - sau'},{key:'C',text:'trái - phải'},{key:'D',text:'trên - dưới'}],['A','C'],'hard');
    q(3,'drag_drop','Sắp xếp theo vị trí từ trái sang phải: bút, sách, thước',[{key:'1',text:'bút'},{key:'2',text:'sách'},{key:'3',text:'thước'}],['1','2','3'],'hard');
  }

  // ========== LESSON 138: Luyện tập chung (hình học + không gian) ==========
  else if (lessonId === 138) {
    // Exercise 1
    q(1,'single_choice','Khối lập phương có mấy đỉnh?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'10'}],'B','easy');
    q(1,'single_choice','Từ nào chỉ vị trí?',[{key:'A',text:'đỏ'},{key:'B',text:'to'},{key:'C',text:'trên'}],'C','easy');
    q(1,'single_choice','Hộp giày có dạng hình gì?',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Hình tròn'}],'B','easy');
    q(1,'true_false','Khối lập phương có 12 cạnh bằng nhau. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Trên và dưới là cùng một hướng. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','Con chim bay [b1] bầu trời.',[{key:'b1',text:''}],{b1:'trên'},'easy');
    q(1,'fill_blank','Khối hộp chữ nhật có [b1] mặt.',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'counting','Đếm số khối hộp chữ nhật trong hình: 📦📦📦',[{key:'d1',text:'📦'},{key:'d2',text:'📦'},{key:'d3',text:'📦'}],'3','easy');
    q(1,'sorting','Sắp xếp số cạnh từ ít đến nhiều: tam giác, khối lập phương, hình vuông',[{key:'1',text:'tam giác: 3'},{key:'2',text:'hình vuông: 4'},{key:'3',text:'khối lập phương: 12'}],['1','2','3'],'easy');
    q(1,'cross_out','Gạch bỏ hình KHÔNG phải khối 3D:',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Hình tròn'},{key:'C',text:'Khối hộp chữ nhật'},{key:'D',text:'Hình tam giác'}],['B','D'],'easy');

    // Exercise 2
    q(2,'single_choice','Vật nào giống khối lập phương nhất?',[{key:'A',text:'Hộp sữa'},{key:'B',text:'Viên xúc xắc'},{key:'C',text:'Hộp bút'}],'B','medium');
    q(2,'single_choice','Nếu sách ở trên bàn, bàn ở ___ sách?',[{key:'A',text:'trên'},{key:'B',text:'dưới'},{key:'C',text:'bên cạnh'}],'B','medium');
    q(2,'multiple_choice','Những vật nào có dạng khối hộp chữ nhật?',[{key:'A',text:'Hộp bánh quy'},{key:'B',text:'Viên đá hình khối'},{key:'C',text:'Quyển sách'},{key:'D',text:'Hộp sữa'}],['A','C','D'],'medium');
    q(2,'multiple_choice','Chọn các cặp từ trái nghĩa chỉ vị trí:',[{key:'A',text:'trên - dưới'},{key:'B',text:'trái - phải'},{key:'C',text:'trước - sau'},{key:'D',text:'nhanh - chậm'}],['A','B','C'],'medium');
    q(2,'matching','Nối vật với hình khối phù hợp:',[{key:'A',text:'Hộp quà'},{key:'B',text:'Viên xúc xắc'},{key:'C',text:'Hộp giày'}],{A:'Khối hộp chữ nhật',B:'Khối lập phương',C:'Khối hộp chữ nhật'},'medium');
    q(2,'matching','Nối từ với nghĩa trái:',[{key:'A',text:'trên'},{key:'B',text:'trước'},{key:'C',text:'trái'}],{A:'dưới',B:'sau',C:'phải'},'medium');
    q(2,'drag_drop','Phân loại: Hộp bánh, Viên xúc xắc, Quyển vở vào đúng hình khối',[{key:'1',text:'Khối hộp chữ nhật: Hộp bánh'},{key:'2',text:'Khối lập phương: Viên xúc xắc'},{key:'3',text:'Khối hộp chữ nhật: Quyển vở'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền đặc điểm:',[{key:'headers',text:'Hình|Số mặt|Số đỉnh'},{key:'r1',text:'Khối lập phương|_r1c1|_r1c2'}],{r1c1:'6',r1c2:'8'},'medium');
    q(2,'number_line','Tổng số cạnh của 1 khối lập phương và 1 khối hộp chữ nhật = ?',[{key:'min',text:'0'},{key:'max',text:'30'},{key:'step',text:'2'},{key:'marks',text:'0|4|8|12|16|20|24'},{key:'hidden',text:'24'}],['24'],'medium');
    q(2,'puzzle','Khối lập phương có ___ cạnh',[{key:'slot_1',text:'Có ? cạnh'},{key:'token_12',text:'12'},{key:'token_6',text:'6'},{key:'token_8',text:'8'}],{slot_1:'token_12'},'medium');

    // Exercise 3
    q(3,'fill_blank','Một khối lập phương có [b1] đỉnh và [b1] cạnh bằng nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'8'},'hard');
    q(3,'fill_blank','An đứng [b1] cửa lớp học khi nhìn vào.',[{key:'b1',text:''}],{b1:'trước'},'hard');
    q(3,'puzzle','Điền số: Hộp quà có hình khối hộp chữ nhật. Hộp có ___ mặt',[{key:'slot_1',text:'Hộp có ? mặt'},{key:'token_6',text:'6'},{key:'token_8',text:'8'},{key:'token_4',text:'4'}],{slot_1:'token_6'},'hard');
    q(3,'puzzle','Nam ngồi sau Hoa. Hoa ngồi sau Bình. Ai ngồi đầu tiên?',[{key:'slot_1',text:'Ai ngồi đầu?'},{key:'token_binh',text:'Bình'},{key:'token_hoa',text:'Hoa'},{key:'token_nam',text:'Nam'}],{slot_1:'token_binh'},'hard');
    q(3,'game','Phân loại hình khối:',[{key:'c1',text:'Hộp giày',pair:'hop_chu_nhat'},{key:'c2',text:'Viên xúc xắc',pair:'lap_phuong'},{key:'c3',text:'Hộp bánh',pair:'hop_chu_nhat'},{key:'c4',text:'Khối rubik',pair:'lap_phuong'},{key:'c5',text:'Quyển sách',pair:'hop_chu_nhat'},{key:'c6',text:'Hộp quà đặc biệt',pair:'lap_phuong'}],{},'hard');
    q(3,'sorting','Sắp xếp số lượng: 1 khối lập phương có mặt, đỉnh, cạnh từ ít đến nhiều',[{key:'1',text:'6 mặt'},{key:'2',text:'8 đỉnh'},{key:'3',text:'12 cạnh'}],['1','2','3'],'hard');
    q(3,'matching','Nối hướng với ví dụ thực tế:',[{key:'A',text:'trên'},{key:'B',text:'dưới'},{key:'C',text:'trước'}],{A:'bầu trời',B:'mặt đất',C:'phía mình nhìn'},'hard');
    q(3,'multiple_choice','Đặc điểm của khối hộp chữ nhật là:',[{key:'A',text:'Có 6 mặt'},{key:'B',text:'Có 8 đỉnh'},{key:'C',text:'Có 12 cạnh'},{key:'D',text:'Tất cả mặt đều bằng nhau'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Chọn câu mô tả đúng:',[{key:'A',text:'Chim đứng trên cành cây'},{key:'B',text:'Cá bơi dưới nước'},{key:'C',text:'Mặt trăng ở trên bầu trời'},{key:'D',text:'Rễ cây mọc lên trời'}],['A','B','C'],'hard');
    q(3,'drag_drop','Sắp xếp từ gần đến xa: bàn học, cửa lớp, sân trường',[{key:'1',text:'bàn học'},{key:'2',text:'cửa lớp'},{key:'3',text:'sân trường'}],['1','2','3'],'hard');
  }

  // ========== LESSON 139: Ôn tập các số trong phạm vi 10 ==========
  else if (lessonId === 139) {
    // Exercise 1
    q(1,'single_choice','Số liền sau 7 là?',[{key:'A',text:'6'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','easy');
    q(1,'single_choice','Số liền trước 5 là?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'3'}],'A','easy');
    q(1,'single_choice','Số nào lớn nhất trong: 3, 7, 5?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'7'}],'C','easy');
    q(1,'true_false','Số 8 lớn hơn số 6. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Số 0 là số nhỏ nhất trong phạm vi 10. Đúng hay sai?',null,true,'easy');
    q(1,'fill_blank','Số [b1] đứng giữa 5 và 7.',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'fill_blank','Số lớn nhất trong phạm vi 10 là [b1].',[{key:'b1',text:''}],{b1:'10'},'easy');
    q(1,'counting','Đếm số chấm: ••••••••',[{key:'d1',text:'•'},{key:'d2',text:'•'},{key:'d3',text:'•'},{key:'d4',text:'•'},{key:'d5',text:'•'},{key:'d6',text:'•'},{key:'d7',text:'•'},{key:'d8',text:'•'}],'8','easy');
    q(1,'sorting','Sắp xếp theo thứ tự tăng dần: 4, 9, 2, 7',[{key:'1',text:'4'},{key:'2',text:'9'},{key:'3',text:'2'},{key:'4',text:'7'}],['3','1','4','2'],'easy');
    q(1,'cross_out','Gạch bỏ số không thuộc phạm vi 1-10:',[{key:'A',text:'5'},{key:'B',text:'11'},{key:'C',text:'8'},{key:'D',text:'0'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Có bao nhiêu số tự nhiên từ 0 đến 10?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'9'}],'B','medium');
    q(2,'single_choice','Số nào nhỏ hơn 6 và lớn hơn 3?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'7'}],'B','medium');
    q(2,'multiple_choice','Số nào lớn hơn 5?',[{key:'A',text:'6'},{key:'B',text:'4'},{key:'C',text:'8'},{key:'D',text:'10'}],['A','C','D'],'medium');
    q(2,'multiple_choice','Số nào có chữ số hàng đơn vị là 3?',[{key:'A',text:'3'},{key:'B',text:'13'},{key:'C',text:'23'},{key:'D',text:'30'}],['A'],'medium');
    q(2,'matching','Nối số với số chấm tương ứng:',[{key:'A',text:'5'},{key:'B',text:'8'},{key:'C',text:'3'}],{A:'•••••',B:'••••••••',C:'•••'},'medium');
    q(2,'matching','Nối số với tên:',[{key:'A',text:'7'},{key:'B',text:'9'},{key:'C',text:'6'}],{A:'bảy',B:'chín',C:'sáu'},'medium');
    q(2,'drag_drop','Kéo thả số vào đúng vị trí trên trục số: 3, 6, 9',[{key:'1',text:'3'},{key:'2',text:'6'},{key:'3',text:'9'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền số liền trước và liền sau:',[{key:'headers',text:'Liền trước|Số|Liền sau'},{key:'r1',text:'_r1c1|5|_r1c2'}],{r1c1:'4',r1c2:'6'},'medium');
    q(2,'number_line','Tìm số còn thiếu giữa 4 và 6:',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'5'}],['5'],'medium');
    q(2,'puzzle','Số liền sau của 7 là',[{key:'slot_1',text:'Liền sau 7 là ?'},{key:'token_8',text:'8'},{key:'token_6',text:'6'},{key:'token_9',text:'9'}],{slot_1:'token_8'},'medium');

    // Exercise 3
    q(3,'fill_blank','Số lớn hơn 7 và nhỏ hơn 10 là [b1] và [b1].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'8'},'hard');
    q(3,'fill_blank','Dãy số: 2, 4, [b1], 8, 10. Số thiếu là [b1].',[{key:'b1',text:''}],{b1:'6'},'hard');
    q(3,'puzzle','Tìm số: Tôi là số lớn hơn 6, nhỏ hơn 9, lẻ',[{key:'slot_1',text:'Tôi là số ?'},{key:'token_7',text:'7'},{key:'token_8',text:'8'},{key:'token_6',text:'6'}],{slot_1:'token_7'},'hard');
    q(3,'puzzle','Điền số còn thiếu: 1, 3, 5, ___, 9',[{key:'slot_1',text:'? = ?'},{key:'token_7',text:'7'},{key:'token_6',text:'6'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard');
    q(3,'game','Nối số với số chẵn/lẻ:',[{key:'c1',text:'2',pair:'chan'},{key:'c2',text:'4',pair:'chan'},{key:'c3',text:'6',pair:'chan'},{key:'c4',text:'1',pair:'le'},{key:'c5',text:'3',pair:'le'},{key:'c6',text:'5',pair:'le'}],{},'hard');
    q(3,'sorting','Sắp xếp giảm dần: 3, 8, 1, 6, 10',[{key:'1',text:'10'},{key:'2',text:'8'},{key:'3',text:'6'},{key:'4',text:'3'},{key:'5',text:'1'}],['1','2','3','4','5'],'hard');
    q(3,'matching','Nối số với cách đọc bằng tiếng Việt:',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'9'}],{A:'tám',B:'mười',C:'chín'},'hard');
    q(3,'multiple_choice','Chọn số chẵn từ 1-10:',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'},{key:'D',text:'7'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Số nào vừa lớn hơn 3 vừa nhỏ hơn 8?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'9'},{key:'D',text:'6'}],['A','B','D'],'hard');
    q(3,'drag_drop','Sắp xếp số lẻ từ nhỏ đến lớn: 9, 3, 7, 1, 5',[{key:'1',text:'1'},{key:'2',text:'3'},{key:'3',text:'5'},{key:'4',text:'7'},{key:'5',text:'9'}],['1','2','3','4','5'],'hard');
  }

  // ========== LESSON 140: Ôn tập phép cộng, phép trừ trong phạm vi 10 ==========
  else if (lessonId === 140) {
    // Exercise 1
    q(1,'single_choice','2 + 7 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy');
    q(1,'single_choice','10 - 8 = ?',[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'2'}],'C','easy');
    q(1,'single_choice','5 + 4 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy');
    q(1,'true_false','6 + 4 = 10. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','9 - 5 = 3. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','3 + [b1] = 10',[{key:'b1',text:''}],{b1:'7'},'easy');
    q(1,'fill_blank','10 - [b1] = 6',[{key:'b1',text:''}],{b1:'4'},'easy');
    q(1,'counting','Đếm số quả bóng: 🎈🎈🎈🎈🎈🎈🎈🎈🎈',[{key:'d1',text:'🎈'},{key:'d2',text:'🎈'},{key:'d3',text:'🎈'},{key:'d4',text:'🎈'},{key:'d5',text:'🎈'},{key:'d6',text:'🎈'},{key:'d7',text:'🎈'},{key:'d8',text:'🎈'},{key:'d9',text:'🎈'}],'9','easy');
    q(1,'sorting','Sắp xếp kết quả tăng dần: 4+5, 3+3, 2+7',[{key:'1',text:'4+5=9'},{key:'2',text:'3+3=6'},{key:'3',text:'2+7=9'}],['2','1','3'],'easy');
    q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'8+2=10'},{key:'B',text:'7+4=10'},{key:'C',text:'6+4=10'},{key:'D',text:'5+5=10'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Số nào điền vào: 4 + ___ = 9',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','medium');
    q(2,'single_choice','Kết quả của 7 + 2 - 4 là:',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'}],'C','medium');
    q(2,'multiple_choice','Phép tính nào bằng 10?',[{key:'A',text:'5+5'},{key:'B',text:'7+3'},{key:'C',text:'6+4'},{key:'D',text:'8+3'}],['A','B','C'],'medium');
    q(2,'multiple_choice','Phép tính nào sai?',[{key:'A',text:'3+7=10'},{key:'B',text:'4+5=10'},{key:'C',text:'6+4=10'},{key:'D',text:'2+8=10'}],['B'],'medium');
    q(2,'matching','Nối cộng với trừ liên quan:',[{key:'A',text:'3+6=9'},{key:'B',text:'4+5=9'},{key:'C',text:'2+7=9'}],{A:'9-6=3',B:'9-5=4',C:'9-7=2'},'medium');
    q(2,'matching','Nối phép tính với kết quả:',[{key:'A',text:'8-3'},{key:'B',text:'7-2'},{key:'C',text:'6-1'}],{A:'5',B:'5',C:'5'},'medium');
    q(2,'drag_drop','Điền: 5+___=8, 6+___=10, 7+___=9',[{key:'1',text:'3'},{key:'2',text:'4'},{key:'3',text:'2'}],['1','2','3'],'medium');
    q(2,'table_fill','Bảng cộng:',[{key:'headers',text:'+'  +'|2|3|4'},{key:'r1',text:'5|_r1c1|_r1c2|_r1c3'}],{r1c1:'7',r1c2:'8',r1c3:'9'},'medium');
    q(2,'number_line','Tính: 3 + 5 = ?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'8'}],['8'],'medium');
    q(2,'puzzle','___ + 4 = 7',[{key:'slot_1',text:'? + 4 = 7'},{key:'token_3',text:'3'},{key:'token_4',text:'4'},{key:'token_2',text:'2'}],{slot_1:'token_3'},'medium');

    // Exercise 3
    q(3,'fill_blank','Lan có 8 cái kẹo, cho Bình 3 cái. Lan còn [b1] cái kẹo.',[{key:'b1',text:''}],{b1:'5'},'hard');
    q(3,'fill_blank','Có 6 con gà và 4 con vịt. Có tất cả [b1] con vật.',[{key:'b1',text:''}],{b1:'10'},'hard');
    q(3,'puzzle','Điền: ___ - 6 = 4',[{key:'slot_1',text:'? - 6 = 4'},{key:'token_10',text:'10'},{key:'token_9',text:'9'},{key:'token_8',text:'8'}],{slot_1:'token_10'},'hard');
    q(3,'puzzle','Điền: 5 + ___ - 3 = 4',[{key:'slot_1',text:'5 + ? - 3 = 4'},{key:'token_2',text:'2'},{key:'token_3',text:'3'},{key:'token_4',text:'4'}],{slot_1:'token_2'},'hard');
    q(3,'game','Nối cộng-trừ cùng kết quả:',[{key:'c1',text:'3+5',pair:'eight'},{key:'c2',text:'10-2',pair:'eight'},{key:'c3',text:'4+3',pair:'seven'},{key:'c4',text:'9-2',pair:'seven'},{key:'c5',text:'5+4',pair:'nine'},{key:'c6',text:'10-1',pair:'nine'}],{},'hard');
    q(3,'sorting','Sắp xếp kết quả từ lớn đến nhỏ: 3+5, 6+3, 4+4, 2+6',[{key:'1',text:'6+3=9'},{key:'2',text:'4+4=8'},{key:'3',text:'3+5=8'},{key:'4',text:'2+6=8'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối bài toán với đáp số:',[{key:'A',text:'Có 7 con cá, thêm 3 con'},{key:'B',text:'Có 9 bông hoa, bớt 5 bông'},{key:'C',text:'Có 4 cái bát, thêm 5 cái'}],{A:'10 con',B:'4 bông',C:'9 cái'},'hard');
    q(3,'multiple_choice','Phép tính có kết quả bằng 7:',[{key:'A',text:'3+4'},{key:'B',text:'5+2'},{key:'C',text:'8-1'},{key:'D',text:'10-2'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Chọn câu đúng:',[{key:'A',text:'4+3=7+0'},{key:'B',text:'5+5=10-0'},{key:'C',text:'6+2=10-2'},{key:'D',text:'3+3=9-2'}],['A','B','C'],'hard');
    q(3,'drag_drop','Sắp xếp số hạng: ___ + ___ = 8 (dùng 3 và 5)',[{key:'1',text:'3'},{key:'2',text:'+'},{key:'3',text:'5'}],['1','2','3'],'hard');
  }

  // ========== LESSON 141: Ôn tập hình học ==========
  else if (lessonId === 141) {
    // Exercise 1
    q(1,'single_choice','Hình nào có 3 cạnh?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'}],'B','easy');
    q(1,'single_choice','Hình tròn có mấy cạnh?',[{key:'A',text:'0'},{key:'B',text:'1'},{key:'C',text:'Vô số'}],'A','easy');
    q(1,'single_choice','Hình nào có 4 cạnh bằng nhau?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình thang'},{key:'C',text:'Hình vuông'}],'C','easy');
    q(1,'true_false','Hình vuông là hình chữ nhật đặc biệt. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Hình tam giác có 4 góc. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','Hình chữ nhật có [b1] cạnh.',[{key:'b1',text:''}],{b1:'4'},'easy');
    q(1,'fill_blank','Khối lập phương có [b1] mặt hình vuông.',[{key:'b1',text:''}],{b1:'6'},'easy');
    q(1,'counting','Đếm số hình tam giác: △△△△△',[{key:'d1',text:'△'},{key:'d2',text:'△'},{key:'d3',text:'△'},{key:'d4',text:'△'},{key:'d5',text:'△'}],'5','easy');
    q(1,'sorting','Sắp xếp theo số cạnh tăng dần: hình tứ giác, hình tam giác, hình ngũ giác',[{key:'1',text:'hình tam giác: 3'},{key:'2',text:'hình tứ giác: 4'},{key:'3',text:'hình ngũ giác: 5'}],['1','2','3'],'easy');
    q(1,'cross_out','Gạch bỏ hình không phải hình phẳng:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình tam giác'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Hình nào có 2 cặp cạnh song song?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],'B','medium');
    q(2,'single_choice','Mặt của khối hộp chữ nhật là hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật hoặc hình vuông'}],'C','medium');
    q(2,'multiple_choice','Hình nào có góc vuông?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tam giác đều'},{key:'D',text:'Hình thang vuông'}],['A','B','D'],'medium');
    q(2,'multiple_choice','Hình 3D nào được đề cập trong chương trình lớp 1?',[{key:'A',text:'Khối lập phương'},{key:'B',text:'Khối hộp chữ nhật'},{key:'C',text:'Khối trụ'},{key:'D',text:'Khối cầu'}],['A','B'],'medium');
    q(2,'matching','Nối hình với số cạnh:',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình chữ nhật'}],{A:'3',B:'4',C:'4'},'medium');
    q(2,'matching','Nối hình với đặc điểm:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],{A:'Không có cạnh thẳng',B:'4 cạnh bằng nhau',C:'3 đỉnh'},'medium');
    q(2,'drag_drop','Phân loại: tam giác, tròn, vuông, hộp chữ nhật theo 2D và 3D',[{key:'1',text:'2D: tam giác, tròn, vuông'},{key:'2',text:'3D: khối lập phương, khối hộp'},{key:'3',text:'Khác: không có'}],['1','2','3'],'medium');
    q(2,'table_fill','Điền thông tin hình học:',[{key:'headers',text:'Hình|Số cạnh|Số góc'},{key:'r1',text:'Hình tam giác|_r1c1|_r1c2'}],{r1c1:'3',r1c2:'3'},'medium');
    q(2,'number_line','Tổng số cạnh: 2 hình tam giác + 1 hình vuông = ?',[{key:'min',text:'0'},{key:'max',text:'15'},{key:'step',text:'1'},{key:'marks',text:'0|2|4|6|8|10|12'},{key:'hidden',text:'10'}],['10'],'medium');
    q(2,'puzzle','Hình có ___ cạnh là hình vuông',[{key:'slot_1',text:'Hình có ? cạnh là hình vuông'},{key:'token_4',text:'4'},{key:'token_3',text:'3'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'medium');

    // Exercise 3
    q(3,'fill_blank','Hình chữ nhật có [b1] cặp cạnh bằng nhau và song song.',[{key:'b1',text:''}],{b1:'2'},'hard');
    q(3,'fill_blank','Mỗi mặt của khối lập phương là hình [b1].',[{key:'b1',text:''}],{b1:'vuông'},'hard');
    q(3,'puzzle','Hình nào? Tôi có 4 cạnh, 4 góc vuông, các cạnh không bằng nhau',[{key:'slot_1',text:'Tôi là hình ?'},{key:'token_cn',text:'chữ nhật'},{key:'token_vg',text:'vuông'},{key:'token_tg',text:'tam giác'}],{slot_1:'token_cn'},'hard');
    q(3,'puzzle','Tôi là hình phẳng có 3 cạnh và 3 góc. Tôi là hình ?',[{key:'slot_1',text:'Tôi là hình ?'},{key:'token_tg',text:'tam giác'},{key:'token_vg',text:'vuông'},{key:'token_tc',text:'tròn'}],{slot_1:'token_tg'},'hard');
    q(3,'game','Phân loại hình phẳng và khối 3D:',[{key:'c1',text:'Hình tròn',pair:'phang'},{key:'c2',text:'Hình vuông',pair:'phang'},{key:'c3',text:'Hình tam giác',pair:'phang'},{key:'c4',text:'Khối lập phương',pair:'khoi'},{key:'c5',text:'Khối hộp',pair:'khoi'},{key:'c6',text:'Hình chữ nhật',pair:'phang'}],{},'hard');
    q(3,'sorting','Sắp xếp theo số cạnh: hình tam giác, hình vuông, hình ngũ giác, hình lục giác',[{key:'1',text:'tam giác: 3'},{key:'2',text:'vuông: 4'},{key:'3',text:'ngũ giác: 5'},{key:'4',text:'lục giác: 6'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối hình với vật thật tương ứng:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],{A:'Bánh xe',B:'Khăn tay',C:'Biển báo'},'hard');
    q(3,'multiple_choice','Hình vuông và hình chữ nhật giống nhau ở điểm:',[{key:'A',text:'Đều có 4 cạnh'},{key:'B',text:'Đều có 4 góc vuông'},{key:'C',text:'Đều có các cạnh bằng nhau'},{key:'D',text:'Đều có 4 đỉnh'}],['A','B','D'],'hard');
    q(3,'multiple_choice','Chọn đặc điểm của hình tam giác:',[{key:'A',text:'Có 3 cạnh'},{key:'B',text:'Có 3 góc'},{key:'C',text:'Có 3 đỉnh'},{key:'D',text:'Có 4 góc'}],['A','B','C'],'hard');
    q(3,'drag_drop','Sắp xếp hình từ đơn giản đến phức tạp nhất:',[{key:'1',text:'Hình tròn'},{key:'2',text:'Hình tam giác'},{key:'3',text:'Hình vuông'},{key:'4',text:'Hình ngũ giác'}],['1','2','3','4'],'hard');
  }

  // ========== LESSON 142: Luyện tập chung (ôn tập tổng hợp) ==========
  else if (lessonId === 142) {
    // Exercise 1
    q(1,'single_choice','5 + 3 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','easy');
    q(1,'single_choice','Hình vuông có mấy cạnh?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','easy');
    q(1,'single_choice','Số liền sau số 9 là?',[{key:'A',text:'8'},{key:'B',text:'10'},{key:'C',text:'11'}],'B','easy');
    q(1,'true_false','9 - 4 = 5. Đúng hay sai?',null,true,'easy');
    q(1,'true_false','Khối lập phương có 8 mặt. Đúng hay sai?',null,false,'easy');
    q(1,'fill_blank','7 + [b1] = 10',[{key:'b1',text:''}],{b1:'3'},'easy');
    q(1,'fill_blank','Hình tam giác có [b1] cạnh.',[{key:'b1',text:''}],{b1:'3'},'easy');
    q(1,'counting','Đếm số hình vuông: ⬛⬛⬛⬛⬛⬛',[{key:'d1',text:'⬛'},{key:'d2',text:'⬛'},{key:'d3',text:'⬛'},{key:'d4',text:'⬛'},{key:'d5',text:'⬛'},{key:'d6',text:'⬛'}],'6','easy');
    q(1,'sorting','Sắp xếp: 9, 3, 7, 1, 5 theo thứ tự giảm dần',[{key:'1',text:'9'},{key:'2',text:'7'},{key:'3',text:'5'},{key:'4',text:'3'},{key:'5',text:'1'}],['1','2','3','4','5'],'easy');
    q(1,'cross_out','Gạch bỏ hình không phải hình 2D:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Khối lập phương'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình tam giác'}],['B'],'easy');

    // Exercise 2
    q(2,'single_choice','Con mèo ở phía nào của con chó nếu con mèo đứng bên trái?',[{key:'A',text:'Phải'},{key:'B',text:'Trái'},{key:'C',text:'Trên'}],'B','medium');
    q(2,'single_choice','3 + 4 + 2 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','medium');
    q(2,'multiple_choice','Chọn phép tính đúng:',[{key:'A',text:'4+6=10'},{key:'B',text:'7+3=10'},{key:'C',text:'5+6=10'},{key:'D',text:'8+2=10'}],['A','B','D'],'medium');
    q(2,'multiple_choice','Hình nào có 4 cạnh?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình thoi'}],['A','C','D'],'medium');
    q(2,'matching','Nối số với cách đọc:',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'10'}],{A:'bảy',B:'tám',C:'mười'},'medium');
    q(2,'matching','Nối phép cộng với phép trừ liên quan:',[{key:'A',text:'5+4=9'},{key:'B',text:'3+7=10'},{key:'C',text:'6+3=9'}],{A:'9-4=5',B:'10-7=3',C:'9-3=6'},'medium');
    q(2,'drag_drop','Điền số đúng: 6+___=9, 8-___=5, 4+___=7',[{key:'1',text:'3'},{key:'2',text:'3'},{key:'3',text:'3'}],['1','2','3'],'medium');
    q(2,'table_fill','Bảng tổng hợp:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'5+4|_r1c1'},{key:'r2',text:'10-3|_r2c1'}],{r1c1:'9',r2c1:'7'},'medium');
    q(2,'number_line','Tính: 5 + 4 = ?',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'1'},{key:'marks',text:'0|1|2|3|4|5|6|7|8|9|10'},{key:'hidden',text:'9'}],['9'],'medium');
    q(2,'puzzle','Điền số: ___ + 6 = 10',[{key:'slot_1',text:'? + 6 = 10'},{key:'token_4',text:'4'},{key:'token_3',text:'3'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'medium');

    // Exercise 3
    q(3,'fill_blank','Vườn có 7 bông hoa đỏ và 3 bông hoa vàng. Có tất cả [b1] bông hoa.',[{key:'b1',text:''}],{b1:'10'},'hard');
    q(3,'fill_blank','An đứng [b1] Bình vì An là người thứ nhất trong hàng.',[{key:'b1',text:''}],{b1:'trước'},'hard');
    q(3,'puzzle','Tìm số: Tôi cộng với 5 bằng 9. Tôi là?',[{key:'slot_1',text:'Tôi là số ?'},{key:'token_4',text:'4'},{key:'token_5',text:'5'},{key:'token_3',text:'3'}],{slot_1:'token_4'},'hard');
    q(3,'puzzle','Hình có 4 cạnh bằng nhau và 4 góc vuông là hình gì?',[{key:'slot_1',text:'Hình đó là hình ?'},{key:'token_vuong',text:'vuông'},{key:'token_cn',text:'chữ nhật'},{key:'token_tron',text:'tròn'}],{slot_1:'token_vuong'},'hard');
    q(3,'game','Ôn tập tổng hợp - Nối đúng:',[{key:'c1',text:'5+3',pair:'eight'},{key:'c2',text:'10-2',pair:'eight'},{key:'c3',text:'4+4',pair:'eight2'},{key:'c4',text:'6+2',pair:'eight2'},{key:'c5',text:'9-1',pair:'eight3'},{key:'c6',text:'7+1',pair:'eight3'}],{},'hard');
    q(3,'sorting','Sắp xếp từ nhỏ đến lớn: 5+3, 4+4, 6+2, 7+1',[{key:'1',text:'5+3=8'},{key:'2',text:'4+4=8'},{key:'3',text:'6+2=8'},{key:'4',text:'7+1=8'}],['1','2','3','4'],'hard');
    q(3,'matching','Nối bài toán với phép tính phù hợp:',[{key:'A',text:'Có 9 bông hoa, cắt 4 bông'},{key:'B',text:'Có 6 cái bút, thêm 3 cái'},{key:'C',text:'Có 8 con cá, thêm 2 con'}],{A:'9-4=5',B:'6+3=9',C:'8+2=10'},'hard');
    q(3,'multiple_choice','Chọn đặc điểm của hình vuông:',[{key:'A',text:'4 cạnh bằng nhau'},{key:'B',text:'4 góc vuông'},{key:'C',text:'2 cặp cạnh song song'},{key:'D',text:'3 đỉnh'}],['A','B','C'],'hard');
    q(3,'multiple_choice','Số nào vừa là số chẵn vừa nhỏ hơn 8?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'},{key:'D',text:'8'}],['A','B','C'],'hard');
    q(3,'drag_drop','Sắp xếp các bước giải bài toán:',[{key:'1',text:'Đọc và hiểu đề bài'},{key:'2',text:'Viết phép tính'},{key:'3',text:'Tính kết quả'},{key:'4',text:'Kiểm tra lại'}],['1','2','3','4'],'hard');
  }

  return qs;
}

async function main() {
  const conn = await mysql.createConnection(DB);

  const lessonIds = [133,134,135,136,137,138,139,140,141,142];

  // Delete existing quizzes
  for (const lid of lessonIds) {
    await conn.execute('DELETE FROM quizzes WHERE lessonId = ?', [lid]);
  }
  console.log('Deleted existing quizzes for lessons 133-142');

  const topics: Record<number,string> = {
    133: 'Phép trừ trong phạm vi 10',
    134: 'Bảng cộng, bảng trừ trong phạm vi 10',
    135: 'Luyện tập chung',
    136: 'Khối lập phương, khối hộp chữ nhật',
    137: 'Vị trí, định hướng trong không gian',
    138: 'Luyện tập chung - hình học',
    139: 'Ôn tập các số trong phạm vi 10',
    140: 'Ôn tập phép cộng, phép trừ',
    141: 'Ôn tập hình học',
    142: 'Luyện tập chung - tổng hợp',
  };

  for (const lid of lessonIds) {
    const questions = makeQuestions(lid, topics[lid]);
    let count = 0;
    for (const q of questions) {
      await conn.execute(
        `INSERT INTO quizzes
         (lessonId, exerciseNumber, questionType, questionText, optionsJson, correctAnswerJson, difficultyLevel, points, sortOrder, isActive, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          q.lessonId,
          q.exerciseNumber,
          q.questionType,
          q.questionText,
          q.optionsJson ? JSON.stringify(q.optionsJson) : null,
          JSON.stringify(q.correctAnswerJson),
          q.difficultyLevel,
          q.points,
          q.sortOrder, 1, new Date(), new Date(),
        ]
      );
      count++;
    }
    console.log(`✅ lessonId ${lid}: ${count} questions inserted`);
  }

  await conn.end();
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
