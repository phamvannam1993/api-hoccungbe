import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'jFUnRCumnerGsGaPT5pR',
  database: 'songtute',
};

const INSERT_SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

const j = (v: any) => JSON.stringify(v);

type Q = [number, number, string, string, any, any, string, string, number, number];

function lesson1106(): Q[] {
  // Phép nhân — multiplication as repeated addition
  const id = 1106;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy: 3×single_choice, 2×true_false, 2×fill_blank, 1×counting, 1×sorting, 1×cross_out
  q(1,'single_choice','2 + 2 + 2 = 2 × ?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','easy','2 cộng 3 lần tức là 2 × 3');
  q(1,'single_choice','3 + 3 + 3 + 3 bằng bao nhiêu?',[{key:'A',text:'9'},{key:'B',text:'12'},{key:'C',text:'15'}],'B','easy','3 × 4 = 12');
  q(1,'single_choice','Phép nhân 4 × 3 nghĩa là:',[{key:'A',text:'4 + 3'},{key:'B',text:'4 + 4 + 4'},{key:'C',text:'3 + 3 + 3 + 3'}],'C','easy','4 × 3 là lấy 4 cộng 3 lần');
  q(1,'true_false','5 + 5 + 5 = 5 × 3. Đúng hay sai?',null,true,'easy','5 cộng 3 lần = 5 × 3 = 15');
  q(1,'true_false','2 × 4 = 2 + 4 = 6. Đúng hay sai?',null,false,'easy','2 × 4 = 2+2+2+2 = 8, không phải 6');
  q(1,'fill_blank','3 + 3 + 3 = 3 × [b1]',[{key:'b1',text:''}],{b1:'3'},'easy','3 cộng 3 lần = 3 × 3');
  q(1,'fill_blank','5 × 2 = [b1]',[{key:'b1',text:''}],{b1:'10'},'easy','5 × 2 = 5 + 5 = 10');
  q(1,'counting','Đếm số ô vuông: mỗi hàng có 3 ô, có 4 hàng. Tất cả có bao nhiêu ô?',[{key:'rows',text:'4'},{key:'cols',text:'3'}],'12','easy','4 hàng × 3 ô = 12 ô');
  q(1,'sorting','Sắp xếp theo kết quả tăng dần: 2×4, 3×2, 5×1',[{key:'1',text:'2×4'},{key:'2',text:'3×2'},{key:'3',text:'5×1'}],['3','2','1'],'easy','5×1=5, 3×2=6, 2×4=8');
  q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'2×3=6'},{key:'B',text:'4×2=6'},{key:'C',text:'3×3=9'},{key:'D',text:'5×2=10'}],['B'],'easy','4×2=8 không phải 6');

  // Ex2 medium: 2×single_choice, 2×multiple_choice, 2×matching, 1×drag_drop, 1×table_fill, 1×number_line, 1×puzzle
  q(2,'single_choice','Có 3 hộp, mỗi hộp có 4 quả cam. Tất cả có bao nhiêu quả cam?',[{key:'A',text:'7'},{key:'B',text:'12'},{key:'C',text:'10'}],'B','medium','3 × 4 = 12');
  q(2,'single_choice','Phép nhân nào bằng 10?',[{key:'A',text:'2×4'},{key:'B',text:'5×2'},{key:'C',text:'3×4'}],'B','medium','5×2=10');
  q(2,'multiple_choice','Phép tính nào có kết quả bằng 6?',[{key:'A',text:'2×3'},{key:'B',text:'3×2'},{key:'C',text:'6×1'},{key:'D',text:'4×2'}],['A','B','C'],'medium','2×3=6, 3×2=6, 6×1=6');
  q(2,'multiple_choice','Phép tính nào biểu diễn "3 cộng 4 lần"?',[{key:'A',text:'3×4'},{key:'B',text:'4×3'},{key:'C',text:'3+3+3+3'},{key:'D',text:'4+4+4'}],['A','C'],'medium','3×4 = 3+3+3+3');
  q(2,'matching','Nối phép nhân với tổng tương đương:',[{key:'A',text:'2×3'},{key:'B',text:'4×2'},{key:'C',text:'5×3'}],{A:'2+2+2',B:'4+4',C:'5+5+5'},'medium','');
  q(2,'matching','Nối phép tính với kết quả:',[{key:'A',text:'3×4'},{key:'B',text:'2×5'},{key:'C',text:'6×2'}],{A:'12',B:'10',C:'12'},'medium','3×4=12, 2×5=10, 6×2=12');
  q(2,'drag_drop','Kéo số đúng vào chỗ trống: 4×3=___, 2×6=___, 5×2=___',[{key:'1',text:'12'},{key:'2',text:'12'},{key:'3',text:'10'}],['1','2','3'],'medium','4×3=12, 2×6=12, 5×2=10');
  q(2,'table_fill','Điền kết quả vào bảng:',[{key:'headers',text:'Phép nhân|Kết quả'},{key:'r1',text:'2×5|_r1c1'},{key:'r2',text:'3×3|_r2c1'},{key:'r3',text:'4×2|_r3c1'}],{r1c1:'10',r2c1:'9',r3c1:'8'},'medium','2×5=10, 3×3=9, 4×2=8');
  q(2,'number_line','Dùng trục số tính 3×4 (nhảy 3 bước, mỗi bước 4 đơn vị):',[{key:'min',text:'0'},{key:'max',text:'15'},{key:'step',text:'4'},{key:'marks',text:'0|4|8|12'},{key:'hidden',text:'12'}],['12'],'medium','3 bước × 4 = 12');
  q(2,'puzzle','Ghép ô: Tìm số điền vào chỗ trống',[{key:'slot_1',text:'? × 3 = 9'},{key:'token_2',text:'2'},{key:'token_3',text:'3'},{key:'token_4',text:'4'}],{slot_1:'token_3'},'medium','3 × 3 = 9');

  // Ex3 hard: 2×fill_blank, 2×puzzle, 1×game, 1×sorting, 1×matching, 2×multiple_choice, 1×drag_drop
  q(3,'fill_blank','Lan xếp 5 hàng bút, mỗi hàng 3 cây. Lan có [b1] cây bút.',[{key:'b1',text:''}],{b1:'15'},'hard','5 × 3 = 15');
  q(3,'fill_blank','Một bảng có 4 cột, mỗi cột có 4 ô. Bảng có [b1] ô tất cả.',[{key:'b1',text:''}],{b1:'16'},'hard','4 × 4 = 16');
  q(3,'puzzle','Tìm số điền vào ô: ___ × 4 = 16',[{key:'slot_1',text:'? × 4 = 16'},{key:'token_3',text:'3'},{key:'token_4',text:'4'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'hard','4 × 4 = 16');
  q(3,'puzzle','Tìm số điền vào ô: 3 × ___ = 15',[{key:'slot_1',text:'3 × ? = 15'},{key:'token_4',text:'4'},{key:'token_5',text:'5'},{key:'token_6',text:'6'}],{slot_1:'token_5'},'hard','3 × 5 = 15');
  q(3,'game','Nối phép nhân với tổng tương đương:',[{key:'c1',text:'2×5',pair:'ten'},{key:'c2',text:'5×2',pair:'ten'},{key:'c3',text:'3×4',pair:'twelve'},{key:'c4',text:'4×3',pair:'twelve'},{key:'c5',text:'2×6',pair:'twelve'}],{},'hard','');
  q(3,'sorting','Sắp xếp từ nhỏ đến lớn: 3×5, 2×6, 4×4, 5×2',[{key:'1',text:'3×5'},{key:'2',text:'2×6'},{key:'3',text:'4×4'},{key:'4',text:'5×2'}],['2','4','1','3'],'hard','2×6=12=5×2, 3×5=15, 4×4=16');
  q(3,'matching','Nối bài toán với phép tính:',[{key:'A',text:'4 hộp, mỗi hộp 5 kẹo'},{key:'B',text:'3 xe, mỗi xe 6 bánh'},{key:'C',text:'2 túi, mỗi túi 8 quả'}],{A:'4×5',B:'3×6',C:'2×8'},'hard','');
  q(3,'multiple_choice','Phép tính nào có kết quả lớn hơn 10?',[{key:'A',text:'3×4'},{key:'B',text:'2×5'},{key:'C',text:'4×3'},{key:'D',text:'6×2'}],['A','C','D'],'hard','3×4=12, 4×3=12, 6×2=12; 2×5=10 không lớn hơn');
  q(3,'multiple_choice','Chọn tất cả phép tính bằng 12:',[{key:'A',text:'3×4'},{key:'B',text:'4×3'},{key:'C',text:'2×6'},{key:'D',text:'6×2'}],['A','B','C','D'],'hard','tất cả đều bằng 12');
  q(3,'drag_drop','Sắp xếp các bước nhân: Đọc phép nhân → Viết tổng → Tính tổng → Ghi kết quả',[{key:'1',text:'Đọc phép nhân'},{key:'2',text:'Viết tổng tương đương'},{key:'3',text:'Tính tổng'},{key:'4',text:'Ghi kết quả'}],['1','2','3','4'],'hard','');

  return qs;
}

function lesson1107(): Q[] {
  // Thừa số, tích — multiplicand, multiplier, product
  const id = 1107;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','Trong phép nhân 3 × 4 = 12, tích là:',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'12'}],'C','easy','Tích là kết quả của phép nhân');
  q(1,'single_choice','Trong phép nhân 5 × 2 = 10, thừa số thứ nhất là:',[{key:'A',text:'5'},{key:'B',text:'2'},{key:'C',text:'10'}],'A','easy','Thừa số thứ nhất là số đầu tiên');
  q(1,'single_choice','Phép nhân 4 × 6 = 24 có bao nhiêu thừa số?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','easy','Có 2 thừa số: 4 và 6');
  q(1,'true_false','Trong 3 × 5 = 15, số 15 là tích. Đúng hay sai?',null,true,'easy','15 là kết quả, gọi là tích');
  q(1,'true_false','Trong 2 × 7 = 14, số 7 là tích. Đúng hay sai?',null,false,'easy','7 là thừa số, 14 mới là tích');
  q(1,'fill_blank','Trong phép nhân 6 × 3 = 18: thừa số thứ hai là [b1]',[{key:'b1',text:''}],{b1:'3'},'easy','Thừa số thứ hai là 3');
  q(1,'fill_blank','Trong phép nhân 4 × 5 = 20: tích là [b1]',[{key:'b1',text:''}],{b1:'20'},'easy','Tích = 20');
  q(1,'counting','Trong phép tính 3 × 4 = 12, hãy đếm số thừa số',[{key:'p',text:'3 × 4 = 12'}],'2','easy','Có 2 thừa số');
  q(1,'sorting','Sắp xếp: Thừa số 1, Dấu nhân, Thừa số 2, Dấu bằng, Tích',[{key:'1',text:'Thừa số 1'},{key:'2',text:'×'},{key:'3',text:'Thừa số 2'},{key:'4',text:'='},{key:'5',text:'Tích'}],['1','2','3','4','5'],'easy','Thứ tự các thành phần phép nhân');
  q(1,'cross_out','Gạch bỏ câu sai về phép nhân 4 × 3 = 12:',[{key:'A',text:'Tích là 12'},{key:'B',text:'Thừa số thứ nhất là 3'},{key:'C',text:'Thừa số thứ hai là 3'},{key:'D',text:'Có 2 thừa số'}],['B'],'easy','Thừa số thứ nhất là 4 không phải 3');

  // Ex2 medium
  q(2,'single_choice','Tích của 5 và 4 là bao nhiêu?',[{key:'A',text:'9'},{key:'B',text:'20'},{key:'C',text:'1'}],'B','medium','5 × 4 = 20');
  q(2,'single_choice','Nếu tích là 18 và một thừa số là 3, thừa số kia là:',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','medium','18 ÷ 3 = 6');
  q(2,'multiple_choice','Phép nhân nào có tích bằng 12?',[{key:'A',text:'3×4'},{key:'B',text:'4×3'},{key:'C',text:'2×6'},{key:'D',text:'5×3'}],['A','B','C'],'medium','3×4=12, 4×3=12, 2×6=12');
  q(2,'multiple_choice','Chọn câu đúng về phép nhân:',[{key:'A',text:'Thừa số là các số được nhân'},{key:'B',text:'Tích là kết quả phép nhân'},{key:'C',text:'Tích luôn lớn hơn thừa số'},{key:'D',text:'Phép nhân có 2 thừa số'}],['A','B','D'],'medium','C sai vì 1×5=5 (không lớn hơn)');
  q(2,'matching','Nối phép nhân với tích:',[{key:'A',text:'5×3'},{key:'B',text:'4×4'},{key:'C',text:'6×2'}],{A:'15',B:'16',C:'12'},'medium','5×3=15, 4×4=16, 6×2=12');
  q(2,'matching','Nối thành phần với vai trò trong 6 × 4 = 24:',[{key:'A',text:'6'},{key:'B',text:'4'},{key:'C',text:'24'}],{A:'Thừa số thứ nhất',B:'Thừa số thứ hai',C:'Tích'},'medium','');
  q(2,'drag_drop','Kéo số đúng: Tích của 3×5=___, Tích của 4×4=___, Tích của 6×3=___',[{key:'1',text:'15'},{key:'2',text:'16'},{key:'3',text:'18'}],['1','2','3'],'medium','3×5=15, 4×4=16, 6×3=18');
  q(2,'table_fill','Điền vào bảng:',[{key:'headers',text:'Thừa số 1|Thừa số 2|Tích'},{key:'r1',text:'3|4|_r1c1'},{key:'r2',text:'5|_r2c1|25'},{key:'r3',text:'_r3c1|3|18'}],{r1c1:'12',r2c1:'5',r3c1:'6'},'medium','3×4=12, 5×5=25, 6×3=18');
  q(2,'number_line','Tích của 4 × 3 trên trục số:',[{key:'min',text:'0'},{key:'max',text:'15'},{key:'step',text:'3'},{key:'marks',text:'0|3|6|9|12'},{key:'hidden',text:'12'}],['12'],'medium','Nhảy 4 bước × 3 = 12');
  q(2,'puzzle','Tìm thừa số còn thiếu: 5 × ___ = 20',[{key:'slot_1',text:'5 × ? = 20'},{key:'token_3',text:'3'},{key:'token_4',text:'4'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'medium','5 × 4 = 20');

  // Ex3 hard
  q(3,'fill_blank','Tích của hai thừa số là 24, một thừa số là 4. Thừa số kia là [b1].',[{key:'b1',text:''}],{b1:'6'},'hard','24 ÷ 4 = 6');
  q(3,'fill_blank','Lan viết phép nhân: [b1] × 5 = 30',[{key:'b1',text:''}],{b1:'6'},'hard','30 ÷ 5 = 6');
  q(3,'puzzle','Tìm thừa số: ___ × 6 = 24',[{key:'slot_1',text:'? × 6 = 24'},{key:'token_3',text:'3'},{key:'token_4',text:'4'},{key:'token_5',text:'5'}],{slot_1:'token_4'},'hard','4 × 6 = 24');
  q(3,'puzzle','Tích là 18, thừa số thứ hai là 3. Thừa số thứ nhất là:',[{key:'slot_1',text:'? × 3 = 18'},{key:'token_5',text:'5'},{key:'token_6',text:'6'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard','6 × 3 = 18');
  q(3,'game','Nối mỗi phép nhân với đúng tích của nó:',[{key:'c1',text:'4×5',pair:'twenty'},{key:'c2',text:'5×4',pair:'twenty'},{key:'c3',text:'3×6',pair:'eighteen'},{key:'c4',text:'6×3',pair:'eighteen'},{key:'c5',text:'4×4',pair:'sixteen'}],{},'hard','');
  q(3,'sorting','Sắp xếp tích từ nhỏ đến lớn: 4×5, 3×6, 5×5, 2×8',[{key:'1',text:'4×5'},{key:'2',text:'3×6'},{key:'3',text:'5×5'},{key:'4',text:'2×8'}],['2','4','1','3'],'hard','3×6=18=2×8×... sai: 2×8=16, 3×6=18, 4×5=20, 5×5=25');
  q(3,'matching','Nối bài toán với phép nhân có tích đúng:',[{key:'A',text:'Tích là 15'},{key:'B',text:'Tích là 20'},{key:'C',text:'Tích là 24'}],{A:'3×5',B:'4×5',C:'4×6'},'hard','');
  q(3,'multiple_choice','Thừa số nào điền vào ___ × 4 = 20?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'},{key:'D',text:'3'}],['B'],'hard','5 × 4 = 20');
  q(3,'multiple_choice','Chọn tất cả câu đúng:',[{key:'A',text:'4×5 = 5×4'},{key:'B',text:'3×6 = 6×3'},{key:'C',text:'Tích là kết quả phép nhân'},{key:'D',text:'Thừa số luôn nhỏ hơn tích'}],['A','B','C'],'hard','D sai vì 1×5=5');
  q(3,'drag_drop','Xếp đúng thứ tự: Xác định thừa số → Thực hiện nhân → Ghi tích',[{key:'1',text:'Xác định thừa số'},{key:'2',text:'Thực hiện phép nhân'},{key:'3',text:'Ghi tích'}],['1','2','3'],'hard','');

  return qs;
}

function lesson1108(): Q[] {
  // Bảng nhân 2
  const id = 1108;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','2 × 3 = ?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','easy','2 × 3 = 6');
  q(1,'single_choice','2 × 7 = ?',[{key:'A',text:'12'},{key:'B',text:'14'},{key:'C',text:'16'}],'B','easy','2 × 7 = 14');
  q(1,'single_choice','2 × 9 = ?',[{key:'A',text:'16'},{key:'B',text:'18'},{key:'C',text:'20'}],'B','easy','2 × 9 = 18');
  q(1,'true_false','2 × 5 = 10. Đúng hay sai?',null,true,'easy','2 × 5 = 10');
  q(1,'true_false','2 × 8 = 15. Đúng hay sai?',null,false,'easy','2 × 8 = 16 không phải 15');
  q(1,'fill_blank','2 × 4 = [b1]',[{key:'b1',text:''}],{b1:'8'},'easy','2 × 4 = 8');
  q(1,'fill_blank','2 × 6 = [b1]',[{key:'b1',text:''}],{b1:'12'},'easy','2 × 6 = 12');
  q(1,'counting','Đếm các cặp: 🍎🍎 🍎🍎 🍎🍎 — có bao nhiêu quả?',[{key:'pairs',text:'3'}],'6','easy','3 cặp × 2 = 6');
  q(1,'sorting','Sắp xếp kết quả tăng dần: 2×6, 2×4, 2×8, 2×2',[{key:'1',text:'2×6'},{key:'2',text:'2×4'},{key:'3',text:'2×8'},{key:'4',text:'2×2'}],['4','2','1','3'],'easy','2×2=4, 2×4=8, 2×6=12, 2×8=16');
  q(1,'cross_out','Gạch bỏ phép tính sai trong bảng nhân 2:',[{key:'A',text:'2×3=6'},{key:'B',text:'2×5=12'},{key:'C',text:'2×7=14'},{key:'D',text:'2×4=8'}],['B'],'easy','2×5=10 không phải 12');

  // Ex2 medium
  q(2,'single_choice','Có 5 đôi tất. Có bao nhiêu chiếc tất?',[{key:'A',text:'5'},{key:'B',text:'10'},{key:'C',text:'15'}],'B','medium','5 × 2 = 10');
  q(2,'single_choice','2 × ___ = 18',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'C','medium','2 × 9 = 18');
  q(2,'multiple_choice','Phép tính nào có kết quả trong bảng nhân 2?',[{key:'A',text:'2×4=8'},{key:'B',text:'2×6=12'},{key:'C',text:'2×5=10'},{key:'D',text:'2×3=5'}],['A','B','C'],'medium','2×3=6 không phải 5');
  q(2,'multiple_choice','Kết quả nào là số chẵn trong bảng nhân 2?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'},{key:'D',text:'8'}],['A','B','C','D'],'medium','Tất cả kết quả của bảng nhân 2 đều là số chẵn');
  q(2,'matching','Nối phép nhân với kết quả:',[{key:'A',text:'2×3'},{key:'B',text:'2×5'},{key:'C',text:'2×8'}],{A:'6',B:'10',C:'16'},'medium','');
  q(2,'matching','Nối phép nhân 2 tương đương:',[{key:'A',text:'2×6'},{key:'B',text:'2×9'},{key:'C',text:'2×7'}],{A:'6×2',B:'9×2',C:'7×2'},'medium','Tính chất giao hoán');
  q(2,'drag_drop','Điền kết quả: 2×2=___, 2×5=___, 2×10=___',[{key:'1',text:'4'},{key:'2',text:'10'},{key:'3',text:'20'}],['1','2','3'],'medium','');
  q(2,'table_fill','Hoàn thành bảng nhân 2:',[{key:'headers',text:'×2|Kết quả'},{key:'r1',text:'3|_r1c1'},{key:'r2',text:'6|_r2c1'},{key:'r3',text:'9|_r3c1'}],{r1c1:'6',r2c1:'12',r3c1:'18'},'medium','2×3=6, 2×6=12, 2×9=18');
  q(2,'number_line','Dùng trục số tính 2×4:',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8'},{key:'hidden',text:'8'}],['8'],'medium','Nhảy 4 bước × 2 = 8');
  q(2,'puzzle','Tìm số: 2 × ___ = 14',[{key:'slot_1',text:'2 × ? = 14'},{key:'token_5',text:'5'},{key:'token_6',text:'6'},{key:'token_7',text:'7'}],{slot_1:'token_7'},'medium','2 × 7 = 14');

  // Ex3 hard
  q(3,'fill_blank','Nam mua 8 đôi bút. Anh có [b1] cây bút.',[{key:'b1',text:''}],{b1:'16'},'hard','8 × 2 = 16');
  q(3,'fill_blank','Một tuần có 7 ngày. Hai tuần có [b1] ngày.',[{key:'b1',text:''}],{b1:'14'},'hard','2 × 7 = 14');
  q(3,'puzzle','Tìm số: ___ × 2 = 20',[{key:'slot_1',text:'? × 2 = 20'},{key:'token_9',text:'9'},{key:'token_10',text:'10'},{key:'token_8',text:'8'}],{slot_1:'token_10'},'hard','10 × 2 = 20');
  q(3,'puzzle','Giải: có 9 cặp chân ghế. Tổng số chân là:',[{key:'slot_1',text:'9 × ? = __'},{key:'token_2',text:'2'},{key:'token_3',text:'3'},{key:'token_4',text:'4'}],{slot_1:'token_2'},'hard','9 × 2 = 18');
  q(3,'game','Nối phép nhân với kết quả đúng:',[{key:'c1',text:'2×4',pair:'eight'},{key:'c2',text:'2×9',pair:'eighteen'},{key:'c3',text:'2×6',pair:'twelve'},{key:'c4',text:'2×3',pair:'six'},{key:'c5',text:'2×10',pair:'twenty'}],{},'hard','');
  q(3,'sorting','Sắp xếp giảm dần: 2×9, 2×5, 2×10, 2×7',[{key:'1',text:'2×9'},{key:'2',text:'2×5'},{key:'3',text:'2×10'},{key:'4',text:'2×7'}],['3','1','4','2'],'hard','2×10=20, 2×9=18, 2×7=14, 2×5=10');
  q(3,'matching','Nối bài toán với phép tính đúng:',[{key:'A',text:'4 cặp giày'},{key:'B',text:'6 đôi tất'},{key:'C',text:'7 cặp đũa'}],{A:'4×2=8',B:'6×2=12',C:'7×2=14'},'hard','');
  q(3,'multiple_choice','Kết quả nào thuộc bảng nhân 2?',[{key:'A',text:'7'},{key:'B',text:'12'},{key:'C',text:'15'},{key:'D',text:'18'}],['B','D'],'hard','12=2×6, 18=2×9');
  q(3,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'2×8=16'},{key:'B',text:'2×7=15'},{key:'C',text:'2×9=18'},{key:'D',text:'2×6=14'}],['A','C'],'hard','2×7=14, 2×6=12');
  q(3,'drag_drop','Sắp xếp bảng nhân 2 theo thứ tự: 2×1, 2×3, 2×5, 2×7, 2×9',[{key:'1',text:'2×1=2'},{key:'2',text:'2×3=6'},{key:'3',text:'2×5=10'},{key:'4',text:'2×7=14'},{key:'5',text:'2×9=18'}],['1','2','3','4','5'],'hard','');

  return qs;
}

function lesson1109(): Q[] {
  // Bảng nhân 5
  const id = 1109;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','5 × 2 = ?',[{key:'A',text:'7'},{key:'B',text:'10'},{key:'C',text:'15'}],'B','easy','5 × 2 = 10');
  q(1,'single_choice','5 × 4 = ?',[{key:'A',text:'15'},{key:'B',text:'20'},{key:'C',text:'25'}],'B','easy','5 × 4 = 20');
  q(1,'single_choice','5 × 8 = ?',[{key:'A',text:'35'},{key:'B',text:'40'},{key:'C',text:'45'}],'B','easy','5 × 8 = 40');
  q(1,'true_false','5 × 6 = 30. Đúng hay sai?',null,true,'easy','5 × 6 = 30');
  q(1,'true_false','5 × 7 = 40. Đúng hay sai?',null,false,'easy','5 × 7 = 35 không phải 40');
  q(1,'fill_blank','5 × 3 = [b1]',[{key:'b1',text:''}],{b1:'15'},'easy','5 × 3 = 15');
  q(1,'fill_blank','5 × 9 = [b1]',[{key:'b1',text:''}],{b1:'45'},'easy','5 × 9 = 45');
  q(1,'counting','Đếm theo nhóm 5: 5, 10, 15, 20 — có bao nhiêu nhóm?',[{key:'groups',text:'5,10,15,20'}],'4','easy','4 nhóm × 5 = 20');
  q(1,'sorting','Sắp xếp tăng dần: 5×7, 5×3, 5×9, 5×5',[{key:'1',text:'5×7'},{key:'2',text:'5×3'},{key:'3',text:'5×9'},{key:'4',text:'5×5'}],['2','4','1','3'],'easy','5×3=15, 5×5=25, 5×7=35, 5×9=45');
  q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'5×4=20'},{key:'B',text:'5×6=35'},{key:'C',text:'5×8=40'},{key:'D',text:'5×2=10'}],['B'],'easy','5×6=30 không phải 35');

  // Ex2 medium
  q(2,'single_choice','Có 6 bàn tay. Có bao nhiêu ngón tay?',[{key:'A',text:'25'},{key:'B',text:'30'},{key:'C',text:'35'}],'B','medium','6 × 5 = 30');
  q(2,'single_choice','5 × ___ = 45',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'C','medium','5 × 9 = 45');
  q(2,'multiple_choice','Kết quả nào là bội số của 5?',[{key:'A',text:'15'},{key:'B',text:'25'},{key:'C',text:'33'},{key:'D',text:'40'}],['A','B','D'],'medium','15=5×3, 25=5×5, 40=5×8');
  q(2,'multiple_choice','Phép tính nào đúng trong bảng nhân 5?',[{key:'A',text:'5×5=25'},{key:'B',text:'5×7=35'},{key:'C',text:'5×3=20'},{key:'D',text:'5×10=50'}],['A','B','D'],'medium','5×3=15 không phải 20');
  q(2,'matching','Nối phép nhân với kết quả:',[{key:'A',text:'5×4'},{key:'B',text:'5×7'},{key:'C',text:'5×10'}],{A:'20',B:'35',C:'50'},'medium','');
  q(2,'matching','Nối bài toán với phép tính:',[{key:'A',text:'4 nhóm 5 người'},{key:'B',text:'7 túi mỗi túi 5 viên'},{key:'C',text:'9 xe mỗi xe 5 bánh... (xe đạp)'}],{A:'4×5=20',B:'7×5=35',C:'9×5=45'},'medium','');
  q(2,'drag_drop','Điền kết quả: 5×3=___, 5×6=___, 5×8=___',[{key:'1',text:'15'},{key:'2',text:'30'},{key:'3',text:'40'}],['1','2','3'],'medium','');
  q(2,'table_fill','Hoàn thành bảng nhân 5:',[{key:'headers',text:'×5|Kết quả'},{key:'r1',text:'2|_r1c1'},{key:'r2',text:'5|_r2c1'},{key:'r3',text:'8|_r3c1'}],{r1c1:'10',r2c1:'25',r3c1:'40'},'medium','5×2=10, 5×5=25, 5×8=40');
  q(2,'number_line','Tính 5×3 trên trục số:',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15'},{key:'hidden',text:'15'}],['15'],'medium','Nhảy 3 bước × 5 = 15');
  q(2,'puzzle','Tìm số: 5 × ___ = 35',[{key:'slot_1',text:'5 × ? = 35'},{key:'token_6',text:'6'},{key:'token_7',text:'7'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'medium','5 × 7 = 35');

  // Ex3 hard
  q(3,'fill_blank','Mỗi sao có 5 cánh, có 8 ngôi sao. Tổng số cánh sao là [b1].',[{key:'b1',text:''}],{b1:'40'},'hard','8 × 5 = 40');
  q(3,'fill_blank','Mỗi tuần học 5 buổi, học [b1] buổi trong 9 tuần.',[{key:'b1',text:''}],{b1:'45'},'hard','9 × 5 = 45');
  q(3,'puzzle','Tìm số: ___ × 5 = 50',[{key:'slot_1',text:'? × 5 = 50'},{key:'token_9',text:'9'},{key:'token_10',text:'10'},{key:'token_8',text:'8'}],{slot_1:'token_10'},'hard','10 × 5 = 50');
  q(3,'puzzle','Mỗi hộp có 5 bút, có bao nhiêu hộp để có 35 bút?',[{key:'slot_1',text:'? × 5 = 35'},{key:'token_6',text:'6'},{key:'token_7',text:'7'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard','7 × 5 = 35');
  q(3,'game','Nối phép nhân 5 với kết quả:',[{key:'c1',text:'5×3',pair:'fifteen'},{key:'c2',text:'5×6',pair:'thirty'},{key:'c3',text:'5×4',pair:'twenty'},{key:'c4',text:'5×9',pair:'fortyfive'},{key:'c5',text:'5×5',pair:'twentyfive'}],{},'hard','');
  q(3,'sorting','Sắp xếp giảm dần: 5×8, 5×4, 5×10, 5×6',[{key:'1',text:'5×8'},{key:'2',text:'5×4'},{key:'3',text:'5×10'},{key:'4',text:'5×6'}],['3','1','4','2'],'hard','5×10=50, 5×8=40, 5×6=30, 5×4=20');
  q(3,'matching','Nối kết quả với phép nhân 5 tương ứng:',[{key:'A',text:'25'},{key:'B',text:'45'},{key:'C',text:'35'}],{A:'5×5',B:'5×9',C:'5×7'},'hard','');
  q(3,'multiple_choice','Kết quả nào là bội của 5 và nhỏ hơn 30?',[{key:'A',text:'10'},{key:'B',text:'20'},{key:'C',text:'25'},{key:'D',text:'30'}],['A','B','C'],'hard','30 không nhỏ hơn 30');
  q(3,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'5×6=30'},{key:'B',text:'5×8=45'},{key:'C',text:'5×7=35'},{key:'D',text:'5×9=40'}],['A','C'],'hard','5×8=40, 5×9=45');
  q(3,'drag_drop','Sắp xếp bảng nhân 5 chẵn: 5×2, 5×4, 5×6, 5×8, 5×10',[{key:'1',text:'5×2=10'},{key:'2',text:'5×4=20'},{key:'3',text:'5×6=30'},{key:'4',text:'5×8=40'},{key:'5',text:'5×10=50'}],['1','2','3','4','5'],'hard','');

  return qs;
}

function lesson1110(): Q[] {
  // Phép chia — division as equal sharing
  const id = 1110;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','6 chia đều cho 2 bạn, mỗi bạn được bao nhiêu?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','easy','6 ÷ 2 = 3');
  q(1,'single_choice','10 : 2 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','easy','10 ÷ 2 = 5');
  q(1,'single_choice','8 chia 4 nhóm bằng nhau, mỗi nhóm có:',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','easy','8 ÷ 4 = 2');
  q(1,'true_false','12 : 3 = 4. Đúng hay sai?',null,true,'easy','12 ÷ 3 = 4');
  q(1,'true_false','10 : 5 = 3. Đúng hay sai?',null,false,'easy','10 ÷ 5 = 2');
  q(1,'fill_blank','15 : 5 = [b1]',[{key:'b1',text:''}],{b1:'3'},'easy','15 ÷ 5 = 3');
  q(1,'fill_blank','8 : 2 = [b1]',[{key:'b1',text:''}],{b1:'4'},'easy','8 ÷ 2 = 4');
  q(1,'counting','Chia 12 kẹo vào 4 túi đều nhau. Mỗi túi có bao nhiêu kẹo?',[{key:'total',text:'12'},{key:'groups',text:'4'}],'3','easy','12 ÷ 4 = 3');
  q(1,'sorting','Sắp xếp kết quả tăng dần: 10:5, 12:3, 8:4, 6:2',[{key:'1',text:'10:5'},{key:'2',text:'12:3'},{key:'3',text:'8:4'},{key:'4',text:'6:2'}],['1','3','4','2'],'easy','10÷5=2, 8÷4=2, 6÷2=3, 12÷3=4');
  q(1,'cross_out','Gạch bỏ phép chia sai:',[{key:'A',text:'6:2=3'},{key:'B',text:'10:5=3'},{key:'C',text:'8:4=2'},{key:'D',text:'12:4=3'}],['B'],'easy','10÷5=2 không phải 3');

  // Ex2 medium
  q(2,'single_choice','Có 20 cây bút chia đều cho 4 bạn. Mỗi bạn được:',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','medium','20 ÷ 4 = 5');
  q(2,'single_choice','16 : ___ = 4',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','medium','16 ÷ 4 = 4');
  q(2,'multiple_choice','Phép chia nào có kết quả bằng 3?',[{key:'A',text:'6:2'},{key:'B',text:'9:3'},{key:'C',text:'12:4'},{key:'D',text:'15:4'}],['A','B','C'],'medium','6÷2=3, 9÷3=3, 12÷4=3');
  q(2,'multiple_choice','Chia đều nghĩa là:',[{key:'A',text:'Mỗi phần bằng nhau'},{key:'B',text:'Phép chia không dư'},{key:'C',text:'Kết quả là số nguyên'},{key:'D',text:'Số bị chia lớn hơn số chia'}],['A','B','C'],'medium','');
  q(2,'matching','Nối phép chia với kết quả:',[{key:'A',text:'10:2'},{key:'B',text:'15:3'},{key:'C',text:'20:4'}],{A:'5',B:'5',C:'5'},'medium','10÷2=5, 15÷3=5, 20÷4=5');
  q(2,'matching','Nối bài toán với phép chia:',[{key:'A',text:'12 cái chia 3 nhóm'},{key:'B',text:'10 cái chia 2 nhóm'},{key:'C',text:'8 cái chia 4 nhóm'}],{A:'12:3=4',B:'10:2=5',C:'8:4=2'},'medium','');
  q(2,'drag_drop','Điền kết quả: 8:2=___, 10:5=___, 12:4=___',[{key:'1',text:'4'},{key:'2',text:'2'},{key:'3',text:'3'}],['1','2','3'],'medium','8÷2=4, 10÷5=2, 12÷4=3');
  q(2,'table_fill','Điền vào bảng chia:',[{key:'headers',text:'Phép chia|Kết quả'},{key:'r1',text:'12:3|_r1c1'},{key:'r2',text:'20:5|_r2c1'},{key:'r3',text:'16:4|_r3c1'}],{r1c1:'4',r2c1:'4',r3c1:'4'},'medium','12÷3=4, 20÷5=4, 16÷4=4');
  q(2,'number_line','Tính 10 : 2 bằng trục số (bước nhảy 2):',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'5'}],['5'],'medium','10 nhảy ngược 2 bước được 5 lần');
  q(2,'puzzle','Tìm số chia: 12 : ___ = 4',[{key:'slot_1',text:'12 : ? = 4'},{key:'token_2',text:'2'},{key:'token_3',text:'3'},{key:'token_4',text:'4'}],{slot_1:'token_3'},'medium','12 ÷ 3 = 4');

  // Ex3 hard
  q(3,'fill_blank','Có 18 học sinh chia thành 3 nhóm bằng nhau. Mỗi nhóm có [b1] học sinh.',[{key:'b1',text:''}],{b1:'6'},'hard','18 ÷ 3 = 6');
  q(3,'fill_blank','Mua 24 cái bánh chia đều cho 4 người. Mỗi người nhận [b1] cái.',[{key:'b1',text:''}],{b1:'6'},'hard','24 ÷ 4 = 6');
  q(3,'puzzle','Tìm số bị chia: ___ : 4 = 5',[{key:'slot_1',text:'? : 4 = 5'},{key:'token_16',text:'16'},{key:'token_20',text:'20'},{key:'token_24',text:'24'}],{slot_1:'token_20'},'hard','20 ÷ 4 = 5');
  q(3,'puzzle','Tìm số chia: 30 : ___ = 5',[{key:'slot_1',text:'30 : ? = 5'},{key:'token_5',text:'5'},{key:'token_6',text:'6'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard','30 ÷ 6 = 5');
  q(3,'game','Nối phép chia với kết quả đúng:',[{key:'c1',text:'6:3',pair:'two'},{key:'c2',text:'10:2',pair:'five'},{key:'c3',text:'12:4',pair:'three'},{key:'c4',text:'20:5',pair:'four'},{key:'c5',text:'16:4',pair:'four'}],{},'hard','');
  q(3,'sorting','Sắp xếp từ bé đến lớn: 20:4, 15:3, 12:2, 10:5',[{key:'1',text:'20:4'},{key:'2',text:'15:3'},{key:'3',text:'12:2'},{key:'4',text:'10:5'}],['4','1','2','3'],'hard','10÷5=2, 20÷4=5, 15÷3=5, 12÷2=6');
  q(3,'matching','Nối phép nhân với phép chia tương ứng:',[{key:'A',text:'3×4=12'},{key:'B',text:'5×4=20'},{key:'C',text:'6×3=18'}],{A:'12:4=3',B:'20:4=5',C:'18:3=6'},'hard','');
  q(3,'multiple_choice','Kết quả nào đúng?',[{key:'A',text:'18:3=6'},{key:'B',text:'20:5=3'},{key:'C',text:'16:4=4'},{key:'D',text:'15:3=5'}],['A','C','D'],'hard','20÷5=4 không phải 3');
  q(3,'multiple_choice','Phép nào chia đều không dư?',[{key:'A',text:'10:3'},{key:'B',text:'12:4'},{key:'C',text:'14:5'},{key:'D',text:'16:4'}],['B','D'],'hard','12÷4=3, 16÷4=4 không dư');
  q(3,'drag_drop','Xếp thứ tự giải bài chia: Đọc đề → Viết phép chia → Tính thương → Kiểm tra',[{key:'1',text:'Đọc đề bài'},{key:'2',text:'Viết phép chia'},{key:'3',text:'Tính thương'},{key:'4',text:'Kiểm tra kết quả'}],['1','2','3','4'],'hard','');

  return qs;
}

function lesson1111(): Q[] {
  // Số bị chia, số chia, thương
  const id = 1111;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','Trong phép chia 12 : 3 = 4, số bị chia là:',[{key:'A',text:'12'},{key:'B',text:'3'},{key:'C',text:'4'}],'A','easy','Số bị chia là số đứng trước dấu chia');
  q(1,'single_choice','Trong phép chia 15 : 5 = 3, thương là:',[{key:'A',text:'15'},{key:'B',text:'5'},{key:'C',text:'3'}],'C','easy','Thương là kết quả của phép chia');
  q(1,'single_choice','Trong phép chia 20 : 4 = 5, số chia là:',[{key:'A',text:'20'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','easy','Số chia là số đứng sau dấu chia');
  q(1,'true_false','Trong 18 : 6 = 3, số 3 là thương. Đúng hay sai?',null,true,'easy','Thương = 3');
  q(1,'true_false','Trong 16 : 4 = 4, số bị chia là 4. Đúng hay sai?',null,false,'easy','Số bị chia là 16');
  q(1,'fill_blank','Trong 14 : 2 = 7: số chia là [b1]',[{key:'b1',text:''}],{b1:'2'},'easy','Số chia = 2');
  q(1,'fill_blank','Trong 10 : 5 = 2: thương là [b1]',[{key:'b1',text:''}],{b1:'2'},'easy','Thương = 2');
  q(1,'counting','Trong phép chia có bao nhiêu thành phần (số bị chia, số chia, thương)?',[{key:'p',text:'__ : __ = __'}],'3','easy','Có 3 thành phần');
  q(1,'sorting','Sắp xếp thứ tự: Số bị chia, Dấu chia, Số chia, Dấu bằng, Thương',[{key:'1',text:'Số bị chia'},{key:'2',text:'÷'},{key:'3',text:'Số chia'},{key:'4',text:'='},{key:'5',text:'Thương'}],['1','2','3','4','5'],'easy','');
  q(1,'cross_out','Gạch bỏ câu sai về phép chia 20 : 5 = 4:',[{key:'A',text:'Số bị chia là 20'},{key:'B',text:'Số chia là 4'},{key:'C',text:'Thương là 4'},{key:'D',text:'Có 3 thành phần'}],['B'],'easy','Số chia là 5, thương là 4');

  // Ex2 medium
  q(2,'single_choice','Thương của 24 và 6 là:',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','medium','24 ÷ 6 = 4');
  q(2,'single_choice','Nếu số bị chia là 30, thương là 5, thì số chia là:',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','medium','30 ÷ ? = 5 → ? = 6');
  q(2,'multiple_choice','Trong 24 : 8 = 3, chọn câu đúng:',[{key:'A',text:'Số bị chia là 24'},{key:'B',text:'Số chia là 8'},{key:'C',text:'Thương là 3'},{key:'D',text:'Số chia là 3'}],['A','B','C'],'medium','D sai: số chia là 8, 3 là thương');
  q(2,'multiple_choice','Phép chia nào có thương bằng 4?',[{key:'A',text:'12:3'},{key:'B',text:'16:4'},{key:'C',text:'20:5'},{key:'D',text:'18:3'}],['A','B','C'],'medium','12÷3=4, 16÷4=4, 20÷5=4; 18÷3=6');
  q(2,'matching','Nối thành phần với giá trị trong 15:3=5:',[{key:'A',text:'Số bị chia'},{key:'B',text:'Số chia'},{key:'C',text:'Thương'}],{A:'15',B:'3',C:'5'},'medium','');
  q(2,'matching','Nối phép chia với thương:',[{key:'A',text:'20:4'},{key:'B',text:'18:3'},{key:'C',text:'16:2'}],{A:'5',B:'6',C:'8'},'medium','20÷4=5, 18÷3=6, 16÷2=8');
  q(2,'drag_drop','Điền thương: 24:6=___, 30:5=___, 18:9=___',[{key:'1',text:'4'},{key:'2',text:'6'},{key:'3',text:'2'}],['1','2','3'],'medium','24÷6=4, 30÷5=6, 18÷9=2');
  q(2,'table_fill','Điền vào bảng:',[{key:'headers',text:'Số bị chia|Số chia|Thương'},{key:'r1',text:'12|3|_r1c1'},{key:'r2',text:'20|_r2c1|4'},{key:'r3',text:'_r3c1|4|5'}],{r1c1:'4',r2c1:'5',r3c1:'20'},'medium','12÷3=4, 20÷5=4, 20÷4=5');
  q(2,'number_line','Tính 12 : 3 trên trục số:',[{key:'min',text:'0'},{key:'max',text:'12'},{key:'step',text:'3'},{key:'marks',text:'0|3|6|9|12'},{key:'hidden',text:'4'}],['4'],'medium','Nhảy 3 lần mỗi lần 3 đơn vị = 4 lần');
  q(2,'puzzle','Tìm số bị chia: ___ : 5 = 4',[{key:'slot_1',text:'? : 5 = 4'},{key:'token_15',text:'15'},{key:'token_20',text:'20'},{key:'token_25',text:'25'}],{slot_1:'token_20'},'medium','20 ÷ 5 = 4');

  // Ex3 hard
  q(3,'fill_blank','Số bị chia là 36, số chia là 4. Thương là [b1].',[{key:'b1',text:''}],{b1:'9'},'hard','36 ÷ 4 = 9');
  q(3,'fill_blank','Thương là 7, số chia là 3. Số bị chia là [b1].',[{key:'b1',text:''}],{b1:'21'},'hard','7 × 3 = 21');
  q(3,'puzzle','Tìm số chia: 42 : ___ = 6',[{key:'slot_1',text:'42 : ? = 6'},{key:'token_6',text:'6'},{key:'token_7',text:'7'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard','42 ÷ 7 = 6');
  q(3,'puzzle','Tìm số bị chia: ___ : 8 = 5',[{key:'slot_1',text:'? : 8 = 5'},{key:'token_35',text:'35'},{key:'token_40',text:'40'},{key:'token_45',text:'45'}],{slot_1:'token_40'},'hard','40 ÷ 8 = 5');
  q(3,'game','Nối mỗi phép chia với thương đúng:',[{key:'c1',text:'24:4',pair:'six'},{key:'c2',text:'30:6',pair:'five'},{key:'c3',text:'18:9',pair:'two'},{key:'c4',text:'28:7',pair:'four'},{key:'c5',text:'25:5',pair:'five'}],{},'hard','');
  q(3,'sorting','Sắp xếp thương từ lớn đến nhỏ: 20:4, 18:3, 16:8, 24:6',[{key:'1',text:'20:4'},{key:'2',text:'18:3'},{key:'3',text:'16:8'},{key:'4',text:'24:6'}],['2','4','1','3'],'hard','18÷3=6, 24÷6=4, 20÷4=5, 16÷8=2');
  q(3,'matching','Nối bài toán với phép chia:',[{key:'A',text:'28 cái chia 4 nhóm'},{key:'B',text:'30 cái chia 5 nhóm'},{key:'C',text:'24 cái chia 6 nhóm'}],{A:'28:4=7',B:'30:5=6',C:'24:6=4'},'hard','');
  q(3,'multiple_choice','Tìm số bị chia biết số chia là 5 và thương là 8:',[{key:'A',text:'13'},{key:'B',text:'3'},{key:'C',text:'40'},{key:'D',text:'45'}],['C'],'hard','8 × 5 = 40');
  q(3,'multiple_choice','Chọn câu đúng:',[{key:'A',text:'Số bị chia = Thương × Số chia'},{key:'B',text:'Số chia = Số bị chia × Thương'},{key:'C',text:'Thương = Số bị chia : Số chia'},{key:'D',text:'Thương luôn nhỏ hơn số bị chia'}],['A','C'],'hard','D sai vì nếu số chia = 1 thì thương = số bị chia');
  q(3,'drag_drop','Xếp thứ tự: Xác định số bị chia → Xác định số chia → Thực hiện chia → Ghi thương',[{key:'1',text:'Xác định số bị chia'},{key:'2',text:'Xác định số chia'},{key:'3',text:'Thực hiện phép chia'},{key:'4',text:'Ghi thương'}],['1','2','3','4'],'hard','');

  return qs;
}

function lesson1112(): Q[] {
  // Bảng chia 2
  const id = 1112;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','6 : 2 = ?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B','easy','6 ÷ 2 = 3');
  q(1,'single_choice','14 : 2 = ?',[{key:'A',text:'6'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','easy','14 ÷ 2 = 7');
  q(1,'single_choice','18 : 2 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','18 ÷ 2 = 9');
  q(1,'true_false','12 : 2 = 6. Đúng hay sai?',null,true,'easy','12 ÷ 2 = 6');
  q(1,'true_false','16 : 2 = 7. Đúng hay sai?',null,false,'easy','16 ÷ 2 = 8 không phải 7');
  q(1,'fill_blank','4 : 2 = [b1]',[{key:'b1',text:''}],{b1:'2'},'easy','4 ÷ 2 = 2');
  q(1,'fill_blank','10 : 2 = [b1]',[{key:'b1',text:''}],{b1:'5'},'easy','10 ÷ 2 = 5');
  q(1,'counting','Chia 8 quả vào 2 rổ bằng nhau, mỗi rổ có bao nhiêu quả?',[{key:'total',text:'8'},{key:'groups',text:'2'}],'4','easy','8 ÷ 2 = 4');
  q(1,'sorting','Sắp xếp kết quả giảm dần: 20:2, 8:2, 14:2, 6:2',[{key:'1',text:'20:2'},{key:'2',text:'8:2'},{key:'3',text:'14:2'},{key:'4',text:'6:2'}],['1','3','2','4'],'easy','20÷2=10, 14÷2=7, 8÷2=4, 6÷2=3');
  q(1,'cross_out','Gạch bỏ phép chia 2 sai:',[{key:'A',text:'10:2=5'},{key:'B',text:'16:2=9'},{key:'C',text:'12:2=6'},{key:'D',text:'18:2=9'}],['B'],'easy','16÷2=8 không phải 9');

  // Ex2 medium
  q(2,'single_choice','Có 16 chiếc bút chia đều cho 2 học sinh. Mỗi học sinh có:',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','16 ÷ 2 = 8');
  q(2,'single_choice','___ : 2 = 7',[{key:'A',text:'12'},{key:'B',text:'14'},{key:'C',text:'16'}],'B','medium','14 ÷ 2 = 7');
  q(2,'multiple_choice','Phép tính nào đúng trong bảng chia 2?',[{key:'A',text:'6:2=3'},{key:'B',text:'8:2=5'},{key:'C',text:'10:2=5'},{key:'D',text:'12:2=6'}],['A','C','D'],'medium','8÷2=4 không phải 5');
  q(2,'multiple_choice','Kết quả nào có thể là thương của bảng chia 2 (chia cho 2)?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'7'},{key:'D',text:'10'}],['A','B','C','D'],'medium','6÷2=3, 10÷2=5, 14÷2=7, 20÷2=10');
  q(2,'matching','Nối phép chia với kết quả:',[{key:'A',text:'8:2'},{key:'B',text:'12:2'},{key:'C',text:'20:2'}],{A:'4',B:'6',C:'10'},'medium','8÷2=4, 12÷2=6, 20÷2=10');
  q(2,'matching','Nối phép nhân với phép chia tương ứng:',[{key:'A',text:'2×5=10'},{key:'B',text:'2×7=14'},{key:'C',text:'2×9=18'}],{A:'10:2=5',B:'14:2=7',C:'18:2=9'},'medium','');
  q(2,'drag_drop','Điền thương: 4:2=___, 16:2=___, 18:2=___',[{key:'1',text:'2'},{key:'2',text:'8'},{key:'3',text:'9'}],['1','2','3'],'medium','');
  q(2,'table_fill','Hoàn thành bảng chia 2:',[{key:'headers',text:'Số bị chia|÷2|Thương'},{key:'r1',text:'6|÷2|_r1c1'},{key:'r2',text:'10|÷2|_r2c1'},{key:'r3',text:'14|÷2|_r3c1'}],{r1c1:'3',r2c1:'5',r3c1:'7'},'medium','6÷2=3, 10÷2=5, 14÷2=7');
  q(2,'number_line','Tính 10 : 2 bằng trục số (nhảy lùi):',[{key:'min',text:'0'},{key:'max',text:'10'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8|10'},{key:'hidden',text:'5'}],['5'],'medium','Nhảy lùi 2 bước = 5 lần');
  q(2,'puzzle','Tìm số bị chia: ___ : 2 = 8',[{key:'slot_1',text:'? : 2 = 8'},{key:'token_14',text:'14'},{key:'token_16',text:'16'},{key:'token_18',text:'18'}],{slot_1:'token_16'},'medium','16 ÷ 2 = 8');

  // Ex3 hard
  q(3,'fill_blank','Nam có 20 viên bi, chia đều 2 túi. Mỗi túi có [b1] viên.',[{key:'b1',text:''}],{b1:'10'},'hard','20 ÷ 2 = 10');
  q(3,'fill_blank','Cần chia 18 cái kẹo vào 2 hộp đều nhau. Mỗi hộp có [b1] cái.',[{key:'b1',text:''}],{b1:'9'},'hard','18 ÷ 2 = 9');
  q(3,'puzzle','Tìm số: ___ : 2 = 10',[{key:'slot_1',text:'? : 2 = 10'},{key:'token_18',text:'18'},{key:'token_20',text:'20'},{key:'token_22',text:'22'}],{slot_1:'token_20'},'hard','20 ÷ 2 = 10');
  q(3,'puzzle','Hai người được tổng 14 cái. Mỗi người có bao nhiêu?',[{key:'slot_1',text:'14 : 2 = ?'},{key:'token_6',text:'6'},{key:'token_7',text:'7'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'hard','14 ÷ 2 = 7');
  q(3,'game','Nối bảng chia 2 đúng:',[{key:'c1',text:'2:2',pair:'one'},{key:'c2',text:'8:2',pair:'four'},{key:'c3',text:'14:2',pair:'seven'},{key:'c4',text:'18:2',pair:'nine'},{key:'c5',text:'20:2',pair:'ten'}],{},'hard','');
  q(3,'sorting','Sắp xếp thương tăng dần: 16:2, 6:2, 20:2, 12:2',[{key:'1',text:'16:2'},{key:'2',text:'6:2'},{key:'3',text:'20:2'},{key:'4',text:'12:2'}],['2','4','1','3'],'hard','6÷2=3, 12÷2=6, 16÷2=8, 20÷2=10');
  q(3,'matching','Nối bảng nhân 2 với bảng chia 2 tương ứng:',[{key:'A',text:'2×3=6'},{key:'B',text:'2×6=12'},{key:'C',text:'2×8=16'}],{A:'6:2=3',B:'12:2=6',C:'16:2=8'},'hard','');
  q(3,'multiple_choice','Phép nào đúng?',[{key:'A',text:'8:2=4'},{key:'B',text:'12:2=7'},{key:'C',text:'16:2=8'},{key:'D',text:'20:2=10'}],['A','C','D'],'hard','12÷2=6 không phải 7');
  q(3,'multiple_choice','Số nào khi chia 2 cho thương là 9?',[{key:'A',text:'16'},{key:'B',text:'18'},{key:'C',text:'20'},{key:'D',text:'19'}],['B'],'hard','18 ÷ 2 = 9');
  q(3,'drag_drop','Sắp xếp bảng chia 2 chẵn: 4:2, 8:2, 12:2, 16:2, 20:2',[{key:'1',text:'4:2=2'},{key:'2',text:'8:2=4'},{key:'3',text:'12:2=6'},{key:'4',text:'16:2=8'},{key:'5',text:'20:2=10'}],['1','2','3','4','5'],'hard','');

  return qs;
}

function lesson1113(): Q[] {
  // Bảng chia 5
  const id = 1113;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','10 : 5 = ?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','easy','10 ÷ 5 = 2');
  q(1,'single_choice','25 : 5 = ?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','easy','25 ÷ 5 = 5');
  q(1,'single_choice','45 : 5 = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'C','easy','45 ÷ 5 = 9');
  q(1,'true_false','20 : 5 = 4. Đúng hay sai?',null,true,'easy','20 ÷ 5 = 4');
  q(1,'true_false','35 : 5 = 8. Đúng hay sai?',null,false,'easy','35 ÷ 5 = 7 không phải 8');
  q(1,'fill_blank','15 : 5 = [b1]',[{key:'b1',text:''}],{b1:'3'},'easy','15 ÷ 5 = 3');
  q(1,'fill_blank','40 : 5 = [b1]',[{key:'b1',text:''}],{b1:'8'},'easy','40 ÷ 5 = 8');
  q(1,'counting','Chia 30 học sinh vào 5 nhóm đều nhau. Mỗi nhóm có bao nhiêu?',[{key:'total',text:'30'},{key:'groups',text:'5'}],'6','easy','30 ÷ 5 = 6');
  q(1,'sorting','Sắp xếp thương tăng dần: 30:5, 10:5, 45:5, 20:5',[{key:'1',text:'30:5'},{key:'2',text:'10:5'},{key:'3',text:'45:5'},{key:'4',text:'20:5'}],['2','4','1','3'],'easy','10÷5=2, 20÷5=4, 30÷5=6, 45÷5=9');
  q(1,'cross_out','Gạch bỏ phép chia 5 sai:',[{key:'A',text:'15:5=3'},{key:'B',text:'25:5=6'},{key:'C',text:'35:5=7'},{key:'D',text:'50:5=10'}],['B'],'easy','25÷5=5 không phải 6');

  // Ex2 medium
  q(2,'single_choice','Có 40 cái bánh chia đều cho 5 bạn. Mỗi bạn được:',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','40 ÷ 5 = 8');
  q(2,'single_choice','___ : 5 = 6',[{key:'A',text:'25'},{key:'B',text:'30'},{key:'C',text:'35'}],'B','medium','30 ÷ 5 = 6');
  q(2,'multiple_choice','Phép tính nào đúng trong bảng chia 5?',[{key:'A',text:'10:5=2'},{key:'B',text:'20:5=5'},{key:'C',text:'30:5=6'},{key:'D',text:'45:5=9'}],['A','C','D'],'medium','20÷5=4 không phải 5');
  q(2,'multiple_choice','Số nào là kết quả của bảng chia 5 (1÷5 đến 10÷5)?',[{key:'A',text:'2'},{key:'B',text:'5'},{key:'C',text:'8'},{key:'D',text:'10'}],['A','B','C','D'],'medium','10÷5=2, 25÷5=5, 40÷5=8, 50÷5=10');
  q(2,'matching','Nối phép chia với kết quả:',[{key:'A',text:'15:5'},{key:'B',text:'35:5'},{key:'C',text:'50:5'}],{A:'3',B:'7',C:'10'},'medium','15÷5=3, 35÷5=7, 50÷5=10');
  q(2,'matching','Nối phép nhân 5 với phép chia 5 tương ứng:',[{key:'A',text:'5×4=20'},{key:'B',text:'5×7=35'},{key:'C',text:'5×9=45'}],{A:'20:5=4',B:'35:5=7',C:'45:5=9'},'medium','');
  q(2,'drag_drop','Điền thương: 5:5=___, 25:5=___, 45:5=___',[{key:'1',text:'1'},{key:'2',text:'5'},{key:'3',text:'9'}],['1','2','3'],'medium','');
  q(2,'table_fill','Hoàn thành bảng chia 5:',[{key:'headers',text:'Số bị chia|÷5|Thương'},{key:'r1',text:'10|÷5|_r1c1'},{key:'r2',text:'30|÷5|_r2c1'},{key:'r3',text:'50|÷5|_r3c1'}],{r1c1:'2',r2c1:'6',r3c1:'10'},'medium','10÷5=2, 30÷5=6, 50÷5=10');
  q(2,'number_line','Tính 25 : 5 trên trục số:',[{key:'min',text:'0'},{key:'max',text:'25'},{key:'step',text:'5'},{key:'marks',text:'0|5|10|15|20|25'},{key:'hidden',text:'5'}],['5'],'medium','Nhảy lùi 5 bước = 5 lần');
  q(2,'puzzle','Tìm số: 5 × ___ = 35',[{key:'slot_1',text:'5 × ? = 35 (35:5=?)'},{key:'token_6',text:'6'},{key:'token_7',text:'7'},{key:'token_8',text:'8'}],{slot_1:'token_7'},'medium','35 ÷ 5 = 7');

  // Ex3 hard
  q(3,'fill_blank','Mẹ mua 45 cái kẹo chia đều cho 5 đứa con. Mỗi đứa được [b1] cái.',[{key:'b1',text:''}],{b1:'9'},'hard','45 ÷ 5 = 9');
  q(3,'fill_blank','Có 50 học sinh xếp thành 5 hàng đều nhau. Mỗi hàng có [b1] học sinh.',[{key:'b1',text:''}],{b1:'10'},'hard','50 ÷ 5 = 10');
  q(3,'puzzle','Tìm số bị chia: ___ : 5 = 8',[{key:'slot_1',text:'? : 5 = 8'},{key:'token_35',text:'35'},{key:'token_40',text:'40'},{key:'token_45',text:'45'}],{slot_1:'token_40'},'hard','40 ÷ 5 = 8');
  q(3,'puzzle','Số bút được chia đều vào 5 hộp, mỗi hộp 7 cây. Tổng số bút là:',[{key:'slot_1',text:'5 × 7 = ?'},{key:'token_30',text:'30'},{key:'token_35',text:'35'},{key:'token_40',text:'40'}],{slot_1:'token_35'},'hard','5 × 7 = 35');
  q(3,'game','Nối phép chia 5 với kết quả:',[{key:'c1',text:'5:5',pair:'one'},{key:'c2',text:'20:5',pair:'four'},{key:'c3',text:'35:5',pair:'seven'},{key:'c4',text:'45:5',pair:'nine'},{key:'c5',text:'50:5',pair:'ten'}],{},'hard','');
  q(3,'sorting','Sắp xếp thương giảm dần: 40:5, 15:5, 50:5, 30:5',[{key:'1',text:'40:5'},{key:'2',text:'15:5'},{key:'3',text:'50:5'},{key:'4',text:'30:5'}],['3','1','4','2'],'hard','50÷5=10, 40÷5=8, 30÷5=6, 15÷5=3');
  q(3,'matching','Nối bài toán với phép chia:',[{key:'A',text:'35 bút chia 5 hộp'},{key:'B',text:'25 kẹo chia 5 bạn'},{key:'C',text:'45 quả chia 5 rổ'}],{A:'35:5=7',B:'25:5=5',C:'45:5=9'},'hard','');
  q(3,'multiple_choice','Kết quả nào thuộc bảng chia 5?',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'9'},{key:'D',text:'11'}],['A','B','C'],'hard','15÷5=3, 30÷5=6, 45÷5=9; 11 không có trong bảng chia 5');
  q(3,'multiple_choice','Phép chia nào đúng?',[{key:'A',text:'25:5=5'},{key:'B',text:'30:5=7'},{key:'C',text:'40:5=8'},{key:'D',text:'45:5=9'}],['A','C','D'],'hard','30÷5=6 không phải 7');
  q(3,'drag_drop','Sắp xếp bảng chia 5: 10:5, 20:5, 30:5, 40:5, 50:5',[{key:'1',text:'10:5=2'},{key:'2',text:'20:5=4'},{key:'3',text:'30:5=6'},{key:'4',text:'40:5=8'},{key:'5',text:'50:5=10'}],['1','2','3','4','5'],'hard','');

  return qs;
}

function lesson1114(): Q[] {
  // Luyện tập chung phép nhân, phép chia
  const id = 1114;
  const qs: Q[] = [];
  let s = 1;
  const q = (ex: number, type: string, text: string, opts: any, ans: any, diff: string, exp: string) => {
    qs.push([id, ex, type, text, j(opts), j(ans), diff, exp, ex === 1 ? 1 : ex === 2 ? 2 : 3, s++]);
  };

  // Ex1 easy
  q(1,'single_choice','2 × 6 = ?',[{key:'A',text:'10'},{key:'B',text:'12'},{key:'C',text:'14'}],'B','easy','2 × 6 = 12');
  q(1,'single_choice','5 × 4 = ?',[{key:'A',text:'18'},{key:'B',text:'20'},{key:'C',text:'22'}],'B','easy','5 × 4 = 20');
  q(1,'single_choice','18 : 2 = ?',[{key:'A',text:'8'},{key:'B',text:'9'},{key:'C',text:'10'}],'B','easy','18 ÷ 2 = 9');
  q(1,'true_false','5 × 7 = 35. Đúng hay sai?',null,true,'easy','5 × 7 = 35');
  q(1,'true_false','20 : 5 = 5. Đúng hay sai?',null,false,'easy','20 ÷ 5 = 4 không phải 5');
  q(1,'fill_blank','2 × 8 = [b1]',[{key:'b1',text:''}],{b1:'16'},'easy','2 × 8 = 16');
  q(1,'fill_blank','35 : 5 = [b1]',[{key:'b1',text:''}],{b1:'7'},'easy','35 ÷ 5 = 7');
  q(1,'counting','Tính: 5 nhóm, mỗi nhóm 4 người. Tổng bao nhiêu?',[{key:'groups',text:'5'},{key:'each',text:'4'}],'20','easy','5 × 4 = 20');
  q(1,'sorting','Sắp xếp kết quả tăng dần: 2×9, 5×3, 16:2, 30:5',[{key:'1',text:'2×9'},{key:'2',text:'5×3'},{key:'3',text:'16:2'},{key:'4',text:'30:5'}],['4','3','2','1'],'easy','30÷5=6, 16÷2=8, 5×3=15, 2×9=18');
  q(1,'cross_out','Gạch bỏ phép tính sai:',[{key:'A',text:'2×7=14'},{key:'B',text:'5×6=35'},{key:'C',text:'10:2=5'},{key:'D',text:'25:5=5'}],['B'],'easy','5×6=30 không phải 35');

  // Ex2 medium
  q(2,'single_choice','2 × ___ = 16, ___ = ?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','medium','2 × 8 = 16');
  q(2,'single_choice','Kết quả của 5 × 9 : 5 là:',[{key:'A',text:'5'},{key:'B',text:'9'},{key:'C',text:'45'}],'B','medium','5×9=45, 45÷5=9');
  q(2,'multiple_choice','Phép tính nào cho kết quả bằng 10?',[{key:'A',text:'2×5'},{key:'B',text:'5×2'},{key:'C',text:'20:2'},{key:'D',text:'50:5'}],['A','B','D'],'medium','2×5=10, 5×2=10, 50÷5=10; 20÷2=10 cũng đúng nhưng D=50÷5=10');
  q(2,'multiple_choice','Phép tính nào liên quan đến nhau?',[{key:'A',text:'2×6=12 và 12:2=6'},{key:'B',text:'5×4=20 và 20:5=4'},{key:'C',text:'2×9=18 và 18:9=2'},{key:'D',text:'5×7=35 và 35:5=7'}],['A','B','C','D'],'medium','Tất cả đều đúng (nhân-chia ngược nhau)');
  q(2,'matching','Nối phép nhân với phép chia nghịch đảo:',[{key:'A',text:'2×7=14'},{key:'B',text:'5×6=30'},{key:'C',text:'2×10=20'}],{A:'14:2=7',B:'30:5=6',C:'20:2=10'},'medium','');
  q(2,'matching','Nối kết quả với phép tính:',[{key:'A',text:'18'},{key:'B',text:'25'},{key:'C',text:'40'}],{A:'2×9',B:'5×5',C:'5×8'},'medium','2×9=18, 5×5=25, 5×8=40');
  q(2,'drag_drop','Điền kết quả: 2×6=___, 30:5=___, 5×8=___',[{key:'1',text:'12'},{key:'2',text:'6'},{key:'3',text:'40'}],['1','2','3'],'medium','');
  q(2,'table_fill','Hoàn thành bảng:',[{key:'headers',text:'Phép tính|Kết quả'},{key:'r1',text:'5×6|_r1c1'},{key:'r2',text:'2×9|_r2c1'},{key:'r3',text:'40:5|_r3c1'},{key:'r4',text:'16:2|_r4c1'}],{r1c1:'30',r2c1:'18',r3c1:'8',r4c1:'8'},'medium','5×6=30, 2×9=18, 40÷5=8, 16÷2=8');
  q(2,'number_line','Tính 5×4 = 20, rồi 20:2 = ? trên trục số:',[{key:'min',text:'0'},{key:'max',text:'20'},{key:'step',text:'2'},{key:'marks',text:'0|2|4|6|8|10|12|14|16|18|20'},{key:'hidden',text:'10'}],['10'],'medium','5×4=20, 20÷2=10');
  q(2,'puzzle','Ghép ô: 2 × ___ = 5 × 4',[{key:'slot_1',text:'2 × ? = 20'},{key:'token_8',text:'8'},{key:'token_10',text:'10'},{key:'token_12',text:'12'}],{slot_1:'token_10'},'medium','5×4=20, 2×10=20');

  // Ex3 hard
  q(3,'fill_blank','An mua 5 gói bánh, mỗi gói 8 cái. An chia đều cho 2 bạn. Mỗi bạn được [b1] cái.',[{key:'b1',text:''}],{b1:'20'},'hard','5×8=40, 40÷2=20');
  q(3,'fill_blank','Có 2 × 9 = [b1] quả cam, chia đều vào 6 đĩa, mỗi đĩa [b2] quả.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'18',b2:'3'},'hard','2×9=18, 18÷6=3');
  q(3,'puzzle','Tìm số: 5 × ___ = 2 × 15',[{key:'slot_1',text:'5 × ? = 30'},{key:'token_5',text:'5'},{key:'token_6',text:'6'},{key:'token_7',text:'7'}],{slot_1:'token_6'},'hard','2×15=30, 5×6=30');
  q(3,'puzzle','Ghép: (2 × ___) : 5 = 6',[{key:'slot_1',text:'(2 × ?) ÷ 5 = 6'},{key:'token_12',text:'12'},{key:'token_15',text:'15'},{key:'token_18',text:'18'}],{slot_1:'token_15'},'hard','2×15=30, 30÷5=6');
  q(3,'game','Nối phép nhân với phép chia tương đương:',[{key:'c1',text:'2×8=16',pair:'sixteen'},{key:'c2',text:'16:2=8',pair:'sixteen'},{key:'c3',text:'5×6=30',pair:'thirty'},{key:'c4',text:'30:5=6',pair:'thirty'},{key:'c5',text:'5×4=20',pair:'twenty'}],{},'hard','');
  q(3,'sorting','Sắp xếp từ lớn đến nhỏ: 5×9, 2×10, 45:5, 20:2',[{key:'1',text:'5×9'},{key:'2',text:'2×10'},{key:'3',text:'45:5'},{key:'4',text:'20:2'}],['1','2','4','3'],'hard','5×9=45, 2×10=20, 20÷2=10, 45÷5=9');
  q(3,'matching','Nối bài toán với phép tính:',[{key:'A',text:'3 bạn, mỗi bạn 5 quyển'},{key:'B',text:'30 quyển chia 5 bạn'},{key:'C',text:'9 cặp đôi'}],{A:'3×5=15',B:'30:5=6',C:'9×2=18'},'hard','');
  q(3,'multiple_choice','Kết quả nào bằng 10?',[{key:'A',text:'2×5'},{key:'B',text:'5×2'},{key:'C',text:'20:2'},{key:'D',text:'50:5'}],['A','B','C','D'],'hard','Tất cả đều bằng 10');
  q(3,'multiple_choice','Phép tính nào đúng?',[{key:'A',text:'2×7=14 và 14:2=7'},{key:'B',text:'5×8=40 và 40:8=5'},{key:'C',text:'2×9=18 và 18:9=3'},{key:'D',text:'5×6=30 và 30:6=5'}],['A','B','D'],'hard','C sai: 18÷9=2 không phải 3');
  q(3,'drag_drop','Sắp xếp các bước giải bài toán nhân chia hỗn hợp:',[{key:'1',text:'Đọc hiểu đề'},{key:'2',text:'Xác định phép tính'},{key:'3',text:'Thực hiện phép nhân'},{key:'4',text:'Thực hiện phép chia'},{key:'5',text:'Kiểm tra và ghi kết quả'}],['1','2','3','4','5'],'hard','');

  return qs;
}

async function main() {
  const conn = await mysql.createConnection(DB);
  console.log('Connected to DB');

  const lessons: { id: number; name: string; fn: () => Q[] }[] = [
    { id: 1106, name: 'Phép nhân', fn: lesson1106 },
    { id: 1107, name: 'Thừa số, tích', fn: lesson1107 },
    { id: 1108, name: 'Bảng nhân 2', fn: lesson1108 },
    { id: 1109, name: 'Bảng nhân 5', fn: lesson1109 },
    { id: 1110, name: 'Phép chia', fn: lesson1110 },
    { id: 1111, name: 'Số bị chia, số chia, thương', fn: lesson1111 },
    { id: 1112, name: 'Bảng chia 2', fn: lesson1112 },
    { id: 1113, name: 'Bảng chia 5', fn: lesson1113 },
    { id: 1114, name: 'Luyện tập chung', fn: lesson1114 },
  ];

  for (const lesson of lessons) {
    const questions = lesson.fn();
    for (const q of questions) {
      await conn.execute(INSERT_SQL, q);
    }
    console.log(`✅ lessonId ${lesson.id} (${lesson.name}): ${questions.length} questions inserted`);
  }

  await conn.end();
  console.log('Done!');
}

main().catch(console.error);
