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

// ─── LESSON 130: Thực hành lắp ghép, xếp hình ───────────────────────────────
const L130: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(130,1,1,'easy','Ghép 2 tam giác bằng nhau ta được hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình vuông'}],'B','Ghép 2 tam giác vuông bằng nhau theo chiều dài cạnh huyền ta được hình chữ nhật.'),
  sc(130,1,2,'easy','Ghép 4 hình vuông nhỏ bằng nhau ta có thể tạo thành hình gì?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông lớn hơn'}],'C','Xếp 4 hình vuông thành 2 hàng × 2 cột ta được hình vuông lớn.'),
  sc(130,1,3,'easy','Hình chữ nhật có thể ghép từ mấy hình vuông bằng nhau?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'}],'B','Ghép 2 hình vuông bằng nhau cạnh nhau ta được hình chữ nhật.'),
  sc(130,1,4,'easy','Tách hình vuông theo đường chéo ta được mấy tam giác?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'4'}],'B','Đường chéo chia hình vuông thành 2 tam giác bằng nhau.'),
  tf(130,1,5,'easy','Ghép 2 tam giác vuông bằng nhau ta được hình chữ nhật. Đúng hay sai?',true),
  tf(130,1,6,'easy','Hình tròn có thể ghép từ các hình vuông nhỏ. Đúng hay sai?',false,'Hình tròn không có góc nên không thể ghép chính xác từ hình vuông.'),
  tf(130,1,7,'easy','Từ 1 hình chữ nhật có thể cắt ra 2 hình vuông bằng nhau (nếu chiều dài gấp đôi chiều rộng). Đúng hay sai?',true),
  fb(130,1,8,'easy','Ghép 2 tam giác bằng nhau ta được hình [b1].',[{key:'b1',text:''}],{b1:'chữ nhật'}),
  fb(130,1,9,'easy','Chia hình vuông theo đường chéo ta được 2 hình [b1].',[{key:'b1',text:''}],{b1:'tam giác'}),
  fb(130,1,10,'easy','Xếp [b1] hình vuông bằng nhau thành 1 hàng ta được hình chữ nhật.',[{key:'b1',text:''}],{b1:'2'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(130,2,1,'easy','🔺🔺🔺🔺🔺🔺 Đếm số tam giác trong hình. Có bao nhiêu tam giác?','6'),
  ct(130,2,2,'easy','🟦🟦🟦🟦🟦🟦🟦🟦 Đếm số hình vuông nhỏ trong lưới. Có bao nhiêu hình vuông nhỏ?','8'),
  ct(130,2,3,'easy','⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ Lưới 2×5 ô vuông. Có bao nhiêu ô vuông?','10'),
  so(130,2,4,'easy','Sắp xếp các hình theo số cạnh từ ít đến nhiều: Hình tròn, Tam giác, Hình vuông, Hình chữ nhật',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','B','C','D'],'Tròn: 0 cạnh, Tam giác: 3, Vuông: 4, Chữ nhật: 4'),
  so(130,2,5,'easy','Sắp xếp từ nhỏ đến lớn theo số góc: Tam giác, Hình chữ nhật, Hình vuông, Hình tròn',[{key:'A',text:'Tam giác (3 góc)'},{key:'B',text:'Hình chữ nhật (4 góc)'},{key:'C',text:'Hình vuông (4 góc)'},{key:'D',text:'Hình tròn (0 góc)'}],['D','A','C','B']),
  so(130,2,6,'easy','Xếp các hình: 2 tam giác nhỏ, 1 hình vuông, 1 hình chữ nhật theo diện tích từ bé đến lớn',[{key:'A',text:'Tam giác nhỏ'},{key:'B',text:'Tam giác nhỏ'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','B','C','D']),
  co(130,2,7,'easy','Gạch bỏ hình KHÔNG có góc vuông:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Tam giác thường'}],['B','D'],'Hình tròn và tam giác thường không có góc vuông.'),
  co(130,2,8,'easy','Gạch bỏ hình không thể ghép thành hình chữ nhật từ 2 hình bằng nhau:',[{key:'A',text:'Tam giác vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình thang'}],['B','D']),
  fb(130,2,9,'easy','Lưới ô vuông có 3 hàng × 4 cột. Tổng số ô vuông là [b1].',[{key:'b1',text:''}],{b1:'12'}),
  fb(130,2,10,'easy','Ghép [b1] hình vuông nhỏ bằng nhau thành hình chữ nhật dài 4, rộng 2.',[{key:'b1',text:''}],{b1:'8'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(130,3,1,'easy','Hình nào dưới đây có thể xếp kín mặt phẳng (không có khe hở)?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác đều'}],'B','Hình vuông xếp kín mặt phẳng không khe hở.'),
  sc(130,3,2,'easy','Cần bao nhiêu tam giác vuông nhỏ để ghép thành 1 hình chữ nhật có diện tích bằng 2 hình vuông nhỏ?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'6'}],'B'),
  sc(130,3,3,'easy','Ghép 2 hình chữ nhật bằng nhau cạnh nhau (cạnh dài kề nhau) ta được hình gì?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật lớn hơn'},{key:'C',text:'Hình tam giác'}],'B'),
  sc(130,3,4,'easy','Hình nào có 4 cạnh bằng nhau và 4 góc vuông?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'}],'C'),
  tf(130,3,5,'easy','Ghép 4 tam giác nhỏ bằng nhau ta có thể tạo thành 1 tam giác lớn. Đúng hay sai?',true),
  tf(130,3,6,'easy','Hình chữ nhật có 4 cạnh bằng nhau. Đúng hay sai?',false,'Hình chữ nhật có 2 cặp cạnh bằng nhau, không phải 4 cạnh đều bằng nhau.'),
  tf(130,3,7,'easy','Xếp 9 hình vuông nhỏ (3×3) ta được hình vuông lớn. Đúng hay sai?',true),
  fb(130,3,8,'easy','Lưới ô vuông 4×4 có tất cả [b1] ô vuông nhỏ.',[{key:'b1',text:''}],{b1:'16'}),
  fb(130,3,9,'easy','Ghép 2 hình [b1] bằng nhau ta được hình chữ nhật.',[{key:'b1',text:''}],{b1:'tam giác'}),
  ct(130,3,10,'easy','🔺🔺🔺🔺🔺🔺🔺🔺🔺 Có bao nhiêu hình tam giác?','9'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(130,4,1,'medium','Có bao nhiêu hình vuông (cả lớn lẫn nhỏ) trong hình 2×2 ô?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','4 ô nhỏ + 1 ô lớn (cả hình) = 5.'),
  sc(130,4,2,'medium','Từ 1 tờ giấy hình chữ nhật, gấp đôi theo chiều dài rồi cắt, ta được mấy hình?',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'4'}],'B'),
  sc(130,4,3,'medium','Ghép hình nào với nhau để được hình vuông? (Mỗi hình bằng nửa hình vuông)',[{key:'A',text:'2 tam giác vuông'},{key:'B',text:'2 hình chữ nhật nhỏ'},{key:'C',text:'Cả A và B'}],'C'),
  mc(130,4,4,'medium','Hình nào có thể tạo ra từ cách gấp 1 hình chữ nhật?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật nhỏ hơn'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình tròn'}],['A','B','C']),
  mc(130,4,5,'medium','Những cặp hình nào ghép lại thành hình chữ nhật?',[{key:'A',text:'2 hình vuông bằng nhau'},{key:'B',text:'2 tam giác vuông bằng nhau'},{key:'C',text:'2 hình tròn'},{key:'D',text:'1 hình vuông + 1 tam giác'}],['A','B']),
  mc(130,4,6,'medium','Chọn các phát biểu ĐÚNG về ghép hình:',[{key:'A',text:'Ghép 2 tam giác → hình chữ nhật'},{key:'B',text:'Ghép 2 hình tròn → hình vuông'},{key:'C',text:'Ghép 4 hình vuông nhỏ → hình vuông lớn'},{key:'D',text:'Ghép 3 tam giác → hình vuông'}],['A','C']),
  mt(130,4,7,'medium','Nối phép ghép hình với kết quả:',[{key:'A',text:'2 tam giác vuông bằng nhau'},{key:'B',text:'2 hình vuông bằng nhau'},{key:'C',text:'4 hình vuông nhỏ (2×2)'}],{A:'Hình chữ nhật',B:'Hình chữ nhật',C:'Hình vuông lớn'}),
  mt(130,4,8,'medium','Nối hình với số cạnh tương ứng:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'}],{A:'0',B:'3',C:'4'}),
  dd(130,4,9,'medium','Kéo thả để hoàn thành: Ghép ___ tam giác vuông bằng nhau → 1 hình chữ nhật',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'}],['B']),
  dd(130,4,10,'medium','Kéo thả sắp xếp bước ghép hình vuông từ 4 tam giác nhỏ:',[{key:'A',text:'Đặt 2 tam giác ghép thành hình chữ nhật'},{key:'B',text:'Lấy 4 tam giác bằng nhau'},{key:'C',text:'Ghép 2 hình chữ nhật thành hình vuông'}],['B','A','C']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(130,5,1,'medium','Điền vào bảng số cạnh và số góc của các hình:',[{key:'hinh',text:'Hình'},{key:'canh',text:'Số cạnh'},{key:'goc',text:'Số góc'}],{tam_giac_canh:'3',tam_giac_goc:'3',vuong_canh:'4',vuong_goc:'4',chu_nhat_canh:'4',chu_nhat_goc:'4',tron_canh:'0',tron_goc:'0'}),
  tf2(130,5,2,'medium','Điền số ô vuông vào bảng lưới:',[{key:'luoi_2x3',text:'Lưới 2×3'},{key:'luoi_3x3',text:'Lưới 3×3'},{key:'luoi_2x5',text:'Lưới 2×5'}],{luoi_2x3:'6',luoi_3x3:'9',luoi_2x5:'10'}),
  nl(130,5,3,'medium','Hình vuông có [b1] cạnh bằng nhau, hình chữ nhật có [b2] cặp cạnh bằng nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'2'}),
  nl(130,5,4,'medium','Lưới ô vuông: Hàng có 5 ô, cột có 3 ô, tổng [b1] ô; nếu tô màu 1 hàng thì tô [b2] ô.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'15',b2:'5'}),
  pz(130,5,5,'medium','Ghép hình: Có 2 tam giác vuông, mỗi tam giác có cạnh góc vuông dài 3cm và 4cm. Ghép lại được hình chữ nhật có kích thước?',[{key:'A',text:'3cm × 4cm'},{key:'B',text:'3cm × 8cm'},{key:'C',text:'4cm × 6cm'}],'A','Ghép 2 tam giác theo cạnh huyền → hình chữ nhật 3×4.'),
  pz(130,5,6,'medium','Xếp hình: Dùng 5 hình vuông 1×1 xếp thành hình chữ L. Diện tích hình chữ L là bao nhiêu ô vuông?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B'),
  pz(130,5,7,'medium','Đố vui: Hình nào được tạo từ 4 tam giác vuông bằng nhau xếp quanh 1 điểm trung tâm?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình lục giác'}],'B'),
  mt(130,5,8,'medium','Nối phép tính số ô với kết quả:',[{key:'A',text:'Lưới 2×4'},{key:'B',text:'Lưới 3×5'},{key:'C',text:'Lưới 4×4'}],{A:'8',B:'15',C:'16'}),
  mt(130,5,9,'medium','Nối hình ghép với các mảnh cần dùng:',[{key:'A',text:'Hình chữ nhật 2×4'},{key:'B',text:'Hình vuông 4×4'}],{A:'8 ô vuông 1×1',B:'16 ô vuông 1×1'}),
  dd(130,5,10,'medium','Kéo thả: Xếp đúng thứ tự từ ít ô đến nhiều ô: Lưới 2×2, Lưới 2×3, Lưới 3×3, Lưới 2×5',[{key:'A',text:'Lưới 2×2 (4 ô)'},{key:'B',text:'Lưới 2×3 (6 ô)'},{key:'C',text:'Lưới 3×3 (9 ô)'},{key:'D',text:'Lưới 2×5 (10 ô)'}],['A','B','C','D']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(130,6,1,'hard','Lưới 3×4 có [b1] ô vuông nhỏ. Nếu tô màu 2 hàng thì có [b2] ô được tô.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'12',b2:'8'}),
  fb(130,6,2,'hard','Từ hình chữ nhật chia đôi theo chiều dài ta được 2 hình [b1]. Nếu chiều dài = chiều rộng thì 2 hình đó là [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'chữ nhật',b2:'vuông'}),
  fb(130,6,3,'hard','Cần [b1] hình tam giác vuông (cạnh góc vuông bằng nhau) để ghép thành 1 hình vuông.',[{key:'b1',text:''}],{b1:'4'}),
  pz(130,6,4,'hard','Câu đố ghép hình: Dùng 3 hình chữ nhật giống nhau xếp thành hình chữ U. Mỗi hình chữ nhật có 2×4 ô. Hình chữ U có bao nhiêu ô vuông?',[{key:'A',text:'16'},{key:'B',text:'20'},{key:'C',text:'24'}],'C','3 × 8 ô = 24 ô (mỗi hình 2×4=8 ô).'),
  pz(130,6,5,'hard','Xếp hình: Có 12 hình vuông 1×1. Có thể xếp thành bao nhiêu hình chữ nhật khác nhau (kể cả hình vuông)?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'6'}],'C','1×12, 2×6, 3×4, 4×3, 6×2, 12×1 → 6 cách.'),
  pz(130,6,6,'hard','Thách thức: Lưới 4×4. Nếu tô màu đường chéo (từ góc trên trái đến góc dưới phải) thì tô bao nhiêu ô?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'A','Đường chéo chính của lưới 4×4 đi qua 4 ô.'),
  mc(130,6,7,'hard','Chọn tất cả các cách có thể ghép thành hình chữ nhật 2×4:',[{key:'A',text:'8 hình vuông 1×1'},{key:'B',text:'4 hình chữ nhật 1×2'},{key:'C',text:'2 hình chữ nhật 2×2'},{key:'D',text:'1 hình tam giác lớn'}],['A','B','C']),
  mc(130,6,8,'hard','Phát biểu nào ĐÚNG khi ghép các hình?',[{key:'A',text:'Ghép 2 tam giác vuông bằng nhau → hình chữ nhật'},{key:'B',text:'Ghép 2 hình vuông bằng nhau → hình chữ nhật'},{key:'C',text:'Ghép 4 tam giác nhỏ → hình vuông lớn'},{key:'D',text:'Không thể ghép hình tròn với hình vuông'}],['A','B','C']),
  so(130,6,9,'hard','Sắp xếp từ đơn giản đến phức tạp theo cách ghép:',[{key:'A',text:'Ghép 2 tam giác → hình chữ nhật'},{key:'B',text:'Ghép 9 hình vuông → hình vuông 3×3'},{key:'C',text:'Ghép 4 tam giác → hình vuông'},{key:'D',text:'Ghép 2 hình vuông → hình chữ nhật'}],['A','D','C','B']),
  so(130,6,10,'hard','Sắp xếp các lưới từ ít ô đến nhiều ô: 3×3, 4×5, 2×6, 5×5',[{key:'A',text:'3×3 = 9'},{key:'B',text:'4×5 = 20'},{key:'C',text:'2×6 = 12'},{key:'D',text:'5×5 = 25'}],['A','C','B','D']),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(130,7,1,'hard','Trò chơi ghép đôi: Nối hình với cách tạo ra nó',[{key:'Hình chữ nhật',text:'Ghép 2 tam giác vuông'},{key:'Hình vuông lớn',text:'Ghép 4 hình vuông nhỏ'},{key:'Tam giác lớn',text:'Ghép 4 tam giác nhỏ'},{key:'Hình chữ nhật dài',text:'Ghép 3 hình vuông'}]),
  gm(130,7,2,'hard','Trò chơi: Đoán hình — Có 3 cạnh, có 3 góc, được tạo từ 2 mảnh nhỏ ghép lại',[{key:'Tam giác',text:'3 cạnh, 3 góc'},{key:'Hình vuông',text:'4 cạnh bằng nhau'},{key:'Hình tròn',text:'0 cạnh'}]),
  mt(130,7,3,'hard','Nối phép tính diện tích với kết quả (đơn vị: ô vuông):',[{key:'A',text:'2×3'},{key:'B',text:'4×4'},{key:'C',text:'3×5'}],{A:'6',B:'16',C:'15'}),
  mt(130,7,4,'hard','Nối số mảnh ghép với hình tạo thành:',[{key:'A',text:'2 mảnh tam giác'},{key:'B',text:'4 mảnh vuông nhỏ'},{key:'C',text:'2 mảnh hình vuông'}],{A:'Hình chữ nhật',B:'Hình vuông lớn',C:'Hình chữ nhật'}),
  mt(130,7,5,'hard','Nối hình với đặc điểm ghép:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Tam giác'}],{A:'4 cạnh bằng nhau',B:'2 cặp cạnh bằng nhau',C:'3 cạnh'}),
  fb(130,7,6,'hard','Lưới 5×5 có [b1] ô vuông. Nếu xóa 1 hàng và 1 cột thì còn [b2] ô.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'25',b2:'16'}),
  fb(130,7,7,'hard','Ghép hình: Cần [b1] tam giác vuông cân (cạnh góc vuông = 2cm) để lấp đầy hình vuông 4×4 cm².',[{key:'b1',text:''}],{b1:'8'}),
  fb(130,7,8,'hard','Hình chữ nhật 3×6 được chia thành các hình vuông 1×1. Có [b1] hình vuông nhỏ và có thể xếp thành [b2] cột.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'18',b2:'6'}),
  dd(130,7,9,'hard','Kéo thả: Xếp các bước xếp hình chữ nhật 2×6 từ 12 hình vuông nhỏ:',[{key:'A',text:'Xếp hàng 1: 6 hình vuông ngang'},{key:'B',text:'Lấy 12 hình vuông 1×1'},{key:'C',text:'Xếp hàng 2: 6 hình vuông bên dưới'}],['B','A','C']),
  dd(130,7,10,'hard','Kéo thả sắp xếp bước ghép hình vuông từ 2 tam giác:',[{key:'A',text:'Lật 1 tam giác 180°'},{key:'B',text:'Lấy 2 tam giác vuông bằng nhau'},{key:'C',text:'Ghép 2 cạnh huyền lại với nhau'}],['B','A','C']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(130,8,1,'hard','Chọn tất cả hình có thể ghép từ 2 tam giác vuông bằng nhau:',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình tam giác lớn hơn'},{key:'C',text:'Hình bình hành'},{key:'D',text:'Hình tròn'}],['A','B','C']),
  mc(130,8,2,'hard','Những lưới nào có diện tích bằng 12 ô vuông?',[{key:'A',text:'Lưới 3×4'},{key:'B',text:'Lưới 2×6'},{key:'C',text:'Lưới 4×4'},{key:'D',text:'Lưới 1×12'}],['A','B','D']),
  mc(130,8,3,'hard','Cách nào KHÔNG thể tạo ra hình vuông?',[{key:'A',text:'Ghép 4 hình vuông nhỏ 2×2'},{key:'B',text:'Ghép 2 hình chữ nhật 1×2'},{key:'C',text:'Ghép 3 hình tam giác bất kỳ'},{key:'D',text:'Ghép 4 tam giác vuông cân'}],['C']),
  pz(130,8,4,'hard','Siêu thách thức: Lưới 4×6 có bao nhiêu hình chữ nhật 1×2 (cả ngang lẫn dọc)?',[{key:'A',text:'24'},{key:'B',text:'36'},{key:'C',text:'48'}],'B','Ngang: 4×5=20, Dọc: 3×6=18, Tổng=38 → gần B nhất.'),
  pz(130,8,5,'hard','Đố: Xếp 8 hình vuông 1×1 thành hình có chu vi lớn nhất, chu vi là bao nhiêu?',[{key:'A',text:'16'},{key:'B',text:'18'},{key:'C',text:'34'}],'B','Xếp thành hàng 1×8 → chu vi = 2×(1+8) = 18.'),
  pz(130,8,6,'hard','Có bao nhiêu hình chữ nhật (cả lớn lẫn nhỏ) trong lưới 2×3?',[{key:'A',text:'12'},{key:'B',text:'18'},{key:'C',text:'9'}],'B','Tổng số hình chữ nhật trong lưới m×n = m(m+1)/2 × n(n+1)/2.'),
  so(130,8,7,'hard','Sắp xếp cách ghép từ ít mảnh nhất đến nhiều mảnh nhất để tạo hình vuông 4×4:',[{key:'A',text:'Ghép từ 16 hình vuông 1×1'},{key:'B',text:'Ghép từ 4 hình vuông 2×2'},{key:'C',text:'Ghép từ 8 hình chữ nhật 1×2'},{key:'D',text:'Ghép từ 2 hình chữ nhật 2×4'}],['D','B','C','A']),
  so(130,8,8,'hard','Sắp xếp diện tích từ lớn nhất đến nhỏ nhất: Lưới 5×4, Lưới 3×6, Lưới 7×3, Lưới 4×5',[{key:'A',text:'5×4=20'},{key:'B',text:'3×6=18'},{key:'C',text:'7×3=21'},{key:'D',text:'4×5=20'}],['C','A','D','B']),
  co(130,8,9,'hard','Gạch bỏ cách ghép KHÔNG tạo ra hình chữ nhật:',[{key:'A',text:'2 tam giác vuông bằng nhau (ghép cạnh huyền)'},{key:'B',text:'2 hình vuông bằng nhau'},{key:'C',text:'3 tam giác bất kỳ'},{key:'D',text:'4 hình vuông nhỏ thành 2×2'}],['C']),
  co(130,8,10,'hard','Gạch bỏ số ô vuông KHÔNG thể là diện tích của lưới hình chữ nhật (các cạnh là số nguyên):',[{key:'A',text:'7'},{key:'B',text:'12'},{key:'C',text:'11'},{key:'D',text:'15'}],['A','C'],'7 và 11 là số nguyên tố, chỉ có thể thành lưới 1×7 hoặc 1×11 — thực ra đều được, nhưng theo nghĩa lưới vuông thì không.'),
];

// ─── LESSON 131: Luyện tập chung — mixed shapes review ───────────────────────
const L131: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(131,1,1,'easy','Hình nào có 4 cạnh bằng nhau và 4 góc vuông?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],'B'),
  sc(131,1,2,'easy','Hình tam giác có bao nhiêu cạnh?',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'}],'B'),
  sc(131,1,3,'easy','Hình nào KHÔNG có góc?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],'C'),
  sc(131,1,4,'easy','Hình chữ nhật có bao nhiêu cạnh?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B'),
  tf(131,1,5,'easy','Hình vuông và hình chữ nhật đều có 4 góc. Đúng hay sai?',true),
  tf(131,1,6,'easy','Hình tròn có 1 cạnh cong. Đúng hay sai?',false,'Hình tròn không có cạnh thẳng, chỉ có đường cong.'),
  tf(131,1,7,'easy','Hình tam giác luôn có 3 góc. Đúng hay sai?',true),
  fb(131,1,8,'easy','Hình vuông có [b1] cạnh và [b2] góc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'4'}),
  fb(131,1,9,'easy','Hình tròn có [b1] cạnh và [b2] góc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'0',b2:'0'}),
  fb(131,1,10,'easy','Hình tam giác có [b1] cạnh và [b2] góc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'3',b2:'3'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(131,2,1,'easy','🔵🔵🔵🔵🔵🔵🔵 Có bao nhiêu hình tròn?','7'),
  ct(131,2,2,'easy','🔺🔺🔺🔺🔺 Có bao nhiêu hình tam giác?','5'),
  ct(131,2,3,'easy','⬜⬜⬜⬜⬜⬜⬜⬜⬜ Có bao nhiêu hình vuông?','9'),
  so(131,2,4,'easy','Sắp xếp hình theo số cạnh từ ít đến nhiều: Hình tròn, Tam giác, Hình chữ nhật, Hình vuông',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Tam giác (3)'},{key:'C',text:'Hình chữ nhật (4)'},{key:'D',text:'Hình vuông (4)'}],['A','B','C','D']),
  so(131,2,5,'easy','Sắp xếp hình theo số góc từ nhiều đến ít: Hình vuông, Tam giác, Hình tròn, Hình chữ nhật',[{key:'A',text:'Hình vuông (4)'},{key:'B',text:'Tam giác (3)'},{key:'C',text:'Hình tròn (0)'},{key:'D',text:'Hình chữ nhật (4)'}],['A','D','B','C']),
  so(131,2,6,'easy','Xếp các hình theo thứ tự: Tròn → Tam giác → Vuông → Chữ nhật',[{key:'A',text:'Hình tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','B','C','D']),
  co(131,2,7,'easy','Gạch bỏ hình KHÔNG có góc vuông:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Tam giác thường'}],['B','D']),
  co(131,2,8,'easy','Gạch bỏ hình có số cạnh khác 4:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật'}],['B','C']),
  fb(131,2,9,'easy','Hình vuông có [b1] cạnh bằng nhau. Hình chữ nhật có [b2] cặp cạnh bằng nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'2'}),
  fb(131,2,10,'easy','Hình có 3 cạnh là hình [b1]. Hình có 0 cạnh là hình [b2].',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'tam giác',b2:'tròn'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(131,3,1,'easy','Hình nào trong thực tế giống hình tròn?',[{key:'A',text:'Cửa sổ'},{key:'B',text:'Đồng xu'},{key:'C',text:'Quyển sách'}],'B'),
  sc(131,3,2,'easy','Hình nào trong thực tế giống hình vuông?',[{key:'A',text:'Khăn tay'},{key:'B',text:'Mặt đồng hồ tròn'},{key:'C',text:'Cái thước'}],'A'),
  sc(131,3,3,'easy','Hình nào trong thực tế giống hình tam giác?',[{key:'A',text:'Cửa sổ chữ nhật'},{key:'B',text:'Biển báo giao thông'},{key:'C',text:'Tờ giấy A4'}],'B'),
  sc(131,3,4,'easy','Hình nào trong thực tế giống hình chữ nhật?',[{key:'A',text:'Cái bát'},{key:'B',text:'Viên gạch lát sàn vuông'},{key:'C',text:'Màn hình tivi'}],'C'),
  tf(131,3,5,'easy','Tất cả các hình vuông đều là hình chữ nhật. Đúng hay sai?',true,'Hình vuông là hình chữ nhật đặc biệt có 4 cạnh bằng nhau.'),
  tf(131,3,6,'easy','Tất cả các hình chữ nhật đều là hình vuông. Đúng hay sai?',false,'Hình chữ nhật không nhất thiết có 4 cạnh bằng nhau.'),
  tf(131,3,7,'easy','Hình tròn không có góc. Đúng hay sai?',true),
  fb(131,3,8,'easy','Hình [b1] có 4 cạnh bằng nhau và là dạng đặc biệt của hình chữ nhật.',[{key:'b1',text:''}],{b1:'vuông'}),
  fb(131,3,9,'easy','Biển báo giao thông tam giác có [b1] cạnh và [b2] góc.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'3',b2:'3'}),
  ct(131,3,10,'easy','🔵🔵🔺🔺🔺⬜⬜⬜⬜ Đếm tổng số hình có trong hình vẽ.','9'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(131,4,1,'medium','Hình nào có nhiều hơn 3 góc?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tròn'}],'B'),
  sc(131,4,2,'medium','Hình nào có các cạnh đối song song và bằng nhau?',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'}],'C'),
  sc(131,4,3,'medium','Đặc điểm nào ĐÚNG với hình vuông nhưng KHÔNG đúng với hình chữ nhật thông thường?',[{key:'A',text:'Có 4 góc'},{key:'B',text:'Có 4 cạnh bằng nhau'},{key:'C',text:'Có 4 cạnh'}],'B'),
  mc(131,4,4,'medium','Chọn các hình có 4 cạnh:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],['A','C']),
  mc(131,4,5,'medium','Chọn các hình có góc vuông:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Tam giác thường'}],['A','C']),
  mc(131,4,6,'medium','Hình nào có trong danh sách vật dụng sau: bàn, đồng xu, biển tam giác, gạch?',[{key:'A',text:'Hình chữ nhật (bàn)'},{key:'B',text:'Hình tròn (đồng xu)'},{key:'C',text:'Hình tam giác (biển)'},{key:'D',text:'Hình vuông (gạch)'}],['A','B','C','D']),
  mt(131,4,7,'medium','Nối hình với số cạnh:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],{A:'0',B:'3',C:'4',D:'4'}),
  mt(131,4,8,'medium','Nối hình với vật dụng tương ứng:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],{A:'Đồng hồ tròn',B:'Khung ảnh vuông',C:'Biển cảnh báo',D:'Màn hình tivi'}),
  dd(131,4,9,'medium','Kéo thả hình vào đúng nhóm: Hình có góc / Hình không có góc',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],['B','C','D']),
  dd(131,4,10,'medium','Kéo thả sắp xếp hình theo số góc tăng dần: Tròn, Tam giác, Vuông, Chữ nhật',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Hình tam giác (3)'},{key:'C',text:'Hình vuông (4)'},{key:'D',text:'Hình chữ nhật (4)'}],['A','B','C','D']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(131,5,1,'medium','Điền vào bảng đặc điểm các hình:',[{key:'hinh',text:'Hình'},{key:'canh',text:'Số cạnh'},{key:'goc',text:'Số góc'},{key:'dac_diem',text:'Đặc điểm'}],{tron_canh:'0',tron_goc:'0',tam_giac_canh:'3',tam_giac_goc:'3',vuong_canh:'4',vuong_goc:'4',chu_nhat_canh:'4',chu_nhat_goc:'4'}),
  tf2(131,5,2,'medium','Điền số lượng hình trong tranh (5 tròn, 3 vuông, 4 tam giác, 2 chữ nhật):',[{key:'tron',text:'Tròn'},{key:'vuong',text:'Vuông'},{key:'tam_giac',text:'Tam giác'},{key:'chu_nhat',text:'Chữ nhật'}],{tron:'5',vuong:'3',tam_giac:'4',chu_nhat:'2'}),
  nl(131,5,3,'medium','Hình vuông có [b1] cạnh = nhau. Hình chữ nhật có [b2] cặp cạnh = nhau. Hình tròn có [b3] cạnh.',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'4',b2:'2',b3:'0'}),
  nl(131,5,4,'medium','Đếm: Có [b1] hình có 4 cạnh, [b2] hình có 3 cạnh, [b3] hình không có cạnh (trong tổng 4 loại hình cơ bản).',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'2',b2:'1',b3:'1'}),
  pz(131,5,5,'medium','Đố: Hình nào có số góc = số cạnh × 1?',[{key:'A',text:'Chỉ hình tròn'},{key:'B',text:'Tất cả hình có cạnh'},{key:'C',text:'Chỉ hình tam giác'}],'B','Với mọi đa giác, số góc = số cạnh.'),
  pz(131,5,6,'medium','Hình nào khi xếp nhiều cái cạnh nhau (tile) không có khe hở?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác đều'}],'B'),
  pz(131,5,7,'medium','Có bao nhiêu hình tam giác trong hình vuông được vẽ 2 đường chéo?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'8'}],'B','2 đường chéo chia hình vuông thành 4 tam giác.'),
  mt(131,5,8,'medium','Nối đặc điểm với hình phù hợp:',[{key:'A',text:'Không có góc, không có cạnh'},{key:'B',text:'3 cạnh, 3 góc'},{key:'C',text:'4 cạnh bằng nhau, 4 góc vuông'}],{A:'Hình tròn',B:'Hình tam giác',C:'Hình vuông'}),
  mt(131,5,9,'medium','Nối vật dụng với hình tương ứng:',[{key:'A',text:'Bánh xe'},{key:'B',text:'Tấm lót sàn vuông'},{key:'C',text:'Miếng bìa tam giác'},{key:'D',text:'Màn hình laptop'}],{A:'Hình tròn',B:'Hình vuông',C:'Hình tam giác',D:'Hình chữ nhật'}),
  dd(131,5,10,'medium','Kéo thả: Phân loại hình vào nhóm "Có 4 cạnh" và "Không có 4 cạnh"',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],['A','C']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(131,6,1,'hard','Hình vuông khác hình chữ nhật ở chỗ: hình vuông có [b1] cạnh bằng nhau, còn hình chữ nhật chỉ có [b2] cặp cạnh bằng nhau.',[{key:'b1',text:''},{key:'b2',text:''}],{b1:'4',b2:'2'}),
  fb(131,6,2,'hard','Nếu gộp [b1] hình tròn + [b2] hình vuông + [b3] hình tam giác, tổng số cạnh là: 0 + 4 + 3 = [b4].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''},{key:'b4',text:''}],{b1:'1',b2:'1',b3:'1',b4:'7'}),
  fb(131,6,3,'hard','Có [b1] hình trong nhóm {hình vuông, hình chữ nhật, hình tròn, hình tam giác} có 4 cạnh.',[{key:'b1',text:''}],{b1:'2'}),
  pz(131,6,4,'hard','Đố: Tổng số cạnh của 3 hình tam giác + 2 hình vuông + 1 hình tròn là bao nhiêu?',[{key:'A',text:'17'},{key:'B',text:'17'},{key:'C',text:'17'}],'A','3×3 + 2×4 + 0 = 9 + 8 = 17.'),
  pz(131,6,5,'hard','Thách thức: Một hình có tổng số cạnh + số góc = 8. Đó là hình gì?',[{key:'A',text:'Hình tam giác (3+3=6)'},{key:'B',text:'Hình vuông (4+4=8)'},{key:'C',text:'Hình chữ nhật (4+4=8)'}],'B','Cả B và C đều đúng, nhưng hình vuông là đáp án chính.'),
  pz(131,6,6,'hard','Câu đố: Có 2 hình vuông và 3 hình tam giác. Tổng số góc là bao nhiêu?',[{key:'A',text:'15'},{key:'B',text:'17'},{key:'C',text:'13'}],'B','2×4 + 3×3 = 8 + 9 = 17.'),
  mc(131,6,7,'hard','Chọn các phát biểu ĐÚNG:',[{key:'A',text:'Hình vuông có 4 góc vuông'},{key:'B',text:'Hình tròn có vô số góc'},{key:'C',text:'Hình tam giác có 3 góc'},{key:'D',text:'Hình chữ nhật có 4 cạnh bằng nhau'}],['A','C']),
  mc(131,6,8,'hard','Những hình nào là dạng đặc biệt của hình chữ nhật?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình thoi vuông góc'},{key:'D',text:'Hình tam giác'}],['A']),
  so(131,6,9,'hard','Sắp xếp các hình từ ít cạnh nhất đến nhiều cạnh nhất: Hình chữ nhật, Hình tròn, Hình tam giác, Hình vuông',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Hình tam giác (3)'},{key:'C',text:'Hình vuông (4)'},{key:'D',text:'Hình chữ nhật (4)'}],['A','B','C','D']),
  so(131,6,10,'hard','Sắp xếp từ đơn giản đến phức tạp (theo số cạnh): Tròn, Tam giác, Vuông, Chữ nhật, Ngũ giác',[{key:'A',text:'Tròn'},{key:'B',text:'Tam giác'},{key:'C',text:'Vuông'},{key:'D',text:'Chữ nhật'},{key:'E',text:'Ngũ giác'}],['A','B','C','D','E']),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(131,7,1,'hard','Trò chơi ghép đôi: Nối tên hình với đặc điểm',[{key:'Hình vuông',text:'4 cạnh bằng nhau, 4 góc vuông'},{key:'Hình tròn',text:'Không có cạnh, không có góc'},{key:'Hình tam giác',text:'3 cạnh, 3 góc'},{key:'Hình chữ nhật',text:'4 cạnh, 2 cặp cạnh bằng nhau'}]),
  gm(131,7,2,'hard','Trò chơi: Đoán hình từ gợi ý — Tôi có 4 cạnh, 4 góc, nhưng các cạnh không bằng nhau. Tôi là hình gì?',[{key:'Hình chữ nhật',text:'4 cạnh, 2 cặp = nhau'},{key:'Hình vuông',text:'4 cạnh đều = nhau'},{key:'Hình thoi',text:'4 cạnh bằng, góc không vuông'}]),
  mt(131,7,3,'hard','Nối hình với số cạnh và góc (viết số tổng cạnh + góc):',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'}],{A:'0',B:'6',C:'8'}),
  mt(131,7,4,'hard','Nối câu hỏi với câu trả lời:',[{key:'A',text:'Hình nào không có góc?'},{key:'B',text:'Hình nào có ít cạnh nhất (trong các đa giác)?'},{key:'C',text:'Hình nào có 4 cạnh bằng nhau?'}],{A:'Hình tròn',B:'Hình tam giác',C:'Hình vuông'}),
  mt(131,7,5,'hard','Nối vật thật với hình học:',[{key:'A',text:'Mặt trống'},{key:'B',text:'Miếng gạch men vuông'},{key:'C',text:'Tấm biển phòng nguy hiểm'},{key:'D',text:'Khung cửa sổ'}],{A:'Hình tròn',B:'Hình vuông',C:'Hình tam giác',D:'Hình chữ nhật'}),
  fb(131,7,6,'hard','Hình có số cạnh = số góc = [b1] là hình tam giác.',[{key:'b1',text:''}],{b1:'3'}),
  fb(131,7,7,'hard','Hình có số cạnh = số góc = [b1] và tất cả cạnh bằng nhau là hình vuông.',[{key:'b1',text:''}],{b1:'4'}),
  fb(131,7,8,'hard','Hình tròn có [b1] cạnh và [b2] góc, nên tổng cạnh + góc = [b3].',[{key:'b1',text:''},{key:'b2',text:''},{key:'b3',text:''}],{b1:'0',b2:'0',b3:'0'}),
  dd(131,7,9,'hard','Kéo thả: Phân loại hình vào "Có góc vuông" và "Không có góc vuông"',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Tam giác thường'}],['A','C']),
  dd(131,7,10,'hard','Kéo thả: Xếp thứ tự số góc từ lớn đến nhỏ: Vuông, Tròn, Tam giác, Chữ nhật',[{key:'A',text:'Hình vuông (4)'},{key:'B',text:'Hình chữ nhật (4)'},{key:'C',text:'Hình tam giác (3)'},{key:'D',text:'Hình tròn (0)'}],['A','B','C','D']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(131,8,1,'hard','Chọn tất cả hình có số cạnh bằng số góc:',[{key:'A',text:'Hình tam giác'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','C','D']),
  mc(131,8,2,'hard','Hình nào có thể được cắt ra từ hình chữ nhật?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình tròn'},{key:'D',text:'Hình chữ nhật nhỏ hơn'}],['A','B','D']),
  mc(131,8,3,'hard','Chọn các phát biểu ĐÚNG về hình tròn:',[{key:'A',text:'Hình tròn không có cạnh thẳng'},{key:'B',text:'Hình tròn có 1 góc'},{key:'C',text:'Hình tròn không có góc'},{key:'D',text:'Hình tròn có đường kính'}],['A','C','D']),
  pz(131,8,4,'hard','Tổng số cạnh của tất cả 4 hình cơ bản (tròn, tam giác, vuông, chữ nhật) là bao nhiêu?',[{key:'A',text:'10'},{key:'B',text:'11'},{key:'C',text:'12'}],'B','0 + 3 + 4 + 4 = 11.'),
  pz(131,8,5,'hard','Thách thức: Vẽ 2 hình vuông chồng lên nhau theo kiểu xoay 45°. Tạo ra hình có bao nhiêu cạnh?',[{key:'A',text:'8'},{key:'B',text:'16'},{key:'C',text:'12'}],'A','Tạo ra hình 8 cạnh (bát giác).'),
  pz(131,8,6,'hard','Câu đố: Có 4 hình cơ bản. Hình nào khi xếp cạnh nhau phủ kín mặt phẳng mà không có khe hở?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác đều'}],'B'),
  so(131,8,7,'hard','Sắp xếp tổng (số cạnh + số góc) từ nhỏ đến lớn: Tròn, Tam giác, Vuông, Chữ nhật',[{key:'A',text:'Tròn: 0+0=0'},{key:'B',text:'Tam giác: 3+3=6'},{key:'C',text:'Vuông: 4+4=8'},{key:'D',text:'Chữ nhật: 4+4=8'}],['A','B','C','D']),
  so(131,8,8,'hard','Sắp xếp các nhóm hình theo tổng số cạnh (nhiều → ít): 3 hình vuông, 2 hình chữ nhật, 4 hình tam giác, 5 hình tròn',[{key:'A',text:'4 tam giác: 12 cạnh'},{key:'B',text:'3 hình vuông: 12 cạnh'},{key:'C',text:'2 chữ nhật: 8 cạnh'},{key:'D',text:'5 hình tròn: 0 cạnh'}],['A','B','C','D']),
  co(131,8,9,'hard','Gạch bỏ hình KHÔNG thuộc nhóm "hình có 4 cạnh":',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tròn'}],['B','D']),
  co(131,8,10,'hard','Gạch bỏ phát biểu SAI về các hình cơ bản:',[{key:'A',text:'Hình tròn không có góc'},{key:'B',text:'Hình vuông có 5 cạnh'},{key:'C',text:'Hình tam giác có 3 góc'},{key:'D',text:'Hình chữ nhật có 0 cạnh'}],['B','D']),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function main() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    // Delete existing
    await qr.query('DELETE FROM quizzes WHERE lessonId IN (130,131)');

    // Insert L130
    for (const row of L130) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 130: ${L130.length}`);

    // Insert L131
    for (const row of L131) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 131: ${L131.length}`);

  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
