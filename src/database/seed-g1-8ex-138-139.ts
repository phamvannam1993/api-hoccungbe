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

// ─── LESSON 138: Luyện tập chung — hình học và phương hướng ───────────────────
const L138: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(138,1,1,'easy','Hình nào có 4 cạnh bằng nhau?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'}],'C','Hình vuông có 4 cạnh bằng nhau.'),
  sc(138,1,2,'easy','Hình nào không có cạnh thẳng?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'}],'B','Hình tròn không có cạnh thẳng.'),
  sc(138,1,3,'easy','Hình tam giác có bao nhiêu cạnh?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'3'}],'C','Hình tam giác có 3 cạnh.'),
  sc(138,1,4,'easy','Hình chữ nhật có bao nhiêu góc?',[{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'}],'B','Hình chữ nhật có 4 góc vuông.'),
  tf(138,1,5,'easy','Hình vuông có 4 cạnh bằng nhau. Đúng hay sai?',true,'Hình vuông có 4 cạnh bằng nhau.'),
  tf(138,1,6,'easy','Hình tròn có 3 cạnh. Đúng hay sai?',false,'Hình tròn không có cạnh thẳng nào.'),
  tf(138,1,7,'easy','Hình chữ nhật có 2 cặp cạnh bằng nhau. Đúng hay sai?',true,'Hình chữ nhật có 2 cặp cạnh dài-ngắn bằng nhau từng đôi.'),
  fb(138,1,8,'easy','Hình [b1] có 3 cạnh.',[{key:'b1',text:'?'}],{b1:'tam giác'},'Hình tam giác có 3 cạnh.'),
  fb(138,1,9,'easy','Hình [b1] không có cạnh thẳng.',[{key:'b1',text:'?'}],{b1:'tròn'},'Hình tròn không có cạnh thẳng.'),
  fb(138,1,10,'easy','Hình vuông có [b1] cạnh bằng nhau.',[{key:'b1',text:'?'}],{b1:'4'},'Hình vuông có 4 cạnh bằng nhau.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(138,2,1,'easy','🔴🔴🔴🔴🔴 Có mấy hình tròn?','5','Đếm: 5 hình tròn.'),
  ct(138,2,2,'easy','🟦🟦🟦 Có mấy hình vuông?','3','Đếm: 3 hình vuông.'),
  ct(138,2,3,'easy','🔺🔺🔺🔺 Có mấy hình tam giác?','4','Đếm: 4 hình tam giác.'),
  so(138,2,4,'easy','Sắp xếp số cạnh từ ít đến nhiều: hình tròn, tam giác, chữ nhật',[{key:'A',text:'hình tròn (0)'},{key:'B',text:'hình tam giác (3)'},{key:'C',text:'hình chữ nhật (4)'}],['A','B','C'],'0 < 3 < 4.'),
  so(138,2,5,'easy','Sắp xếp số góc từ ít đến nhiều: tam giác, chữ nhật, vuông',[{key:'A',text:'tam giác (3)'},{key:'B',text:'chữ nhật (4)'},{key:'C',text:'vuông (4)'}],['A','B','C'],'Tam giác có 3 góc; chữ nhật và vuông có 4 góc.'),
  so(138,2,6,'easy','Sắp xếp hình theo số cạnh tăng dần: hình tròn, vuông, tam giác',[{key:'A',text:'hình tròn'},{key:'B',text:'hình tam giác'},{key:'C',text:'hình vuông'}],['A','B','C'],'0, 3, 4 cạnh.'),
  co(138,2,7,'easy','Gạch bỏ hình KHÔNG phải hình vuông:',[{key:'A',text:'🟦'},{key:'B',text:'🔴'},{key:'C',text:'🟦'},{key:'D',text:'🔺'}],['B','D'],'Hình tròn và tam giác không phải hình vuông.'),
  co(138,2,8,'easy','Gạch bỏ hình có CẠnh THẲNG:',[{key:'A',text:'hình tròn'},{key:'B',text:'hình vuông'},{key:'C',text:'hình tam giác'},{key:'D',text:'hình tròn'}],['B','C'],'Hình vuông và tam giác có cạnh thẳng.'),
  fb(138,2,9,'easy','Hình tròn có [b1] cạnh.',[{key:'b1',text:'?'}],{b1:'0'},'Hình tròn không có cạnh thẳng nào.'),
  fb(138,2,10,'easy','Hình tam giác có [b1] đỉnh.',[{key:'b1',text:'?'}],{b1:'3'},'Hình tam giác có 3 đỉnh.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(138,3,1,'easy','Quyển sách nằm TRÊN bàn. Bàn ở đâu so với quyển sách?',[{key:'A',text:'Trên'},{key:'B',text:'Dưới'},{key:'C',text:'Trái'}],'B','Bàn ở dưới quyển sách.'),
  sc(138,3,2,'easy','Con mèo ở bên TRÁI con chó. Con chó ở đâu so với con mèo?',[{key:'A',text:'Trái'},{key:'B',text:'Phải'},{key:'C',text:'Trên'}],'B','Con chó ở bên phải con mèo.'),
  sc(138,3,3,'easy','Mặt trời mọc ở hướng nào?',[{key:'A',text:'Tây'},{key:'B',text:'Đông'},{key:'C',text:'Nam'}],'B','Mặt trời mọc ở hướng Đông.'),
  sc(138,3,4,'easy','Đồ vật ở phía TRƯỚC mặt bạn. Bạn quay lại thì đồ vật ở đâu?',[{key:'A',text:'Trước'},{key:'B',text:'Sau'},{key:'C',text:'Bên cạnh'}],'B','Sau khi quay lại, đồ vật ở phía sau.'),
  tf(138,3,5,'easy','Trên và dưới là hai hướng ngược nhau. Đúng hay sai?',true,'Trên và dưới là hai hướng đối lập.'),
  tf(138,3,6,'easy','Trái và phải là cùng một hướng. Đúng hay sai?',false,'Trái và phải là hai hướng đối lập.'),
  tf(138,3,7,'easy','Hình vuông có thể đặt ở trên bàn. Đúng hay sai?',true,'Hình vuông là đồ vật, có thể đặt ở bất kỳ đâu.'),
  fb(138,3,8,'easy','Ngược với "trên" là [b1].',[{key:'b1',text:'?'}],{b1:'dưới'},'Trên - dưới là cặp từ trái nghĩa.'),
  fb(138,3,9,'easy','Ngược với "trái" là [b1].',[{key:'b1',text:'?'}],{b1:'phải'},'Trái - phải là cặp từ trái nghĩa.'),
  ct(138,3,10,'easy','🟦🔺🟦🔺🟦 Có mấy hình vuông?','3','Đếm hình vuông: 3.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(138,4,1,'medium','Hình nào có số cạnh nhiều hơn hình tam giác?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],'B','Hình vuông có 4 cạnh > 3 cạnh của tam giác.'),
  sc(138,4,2,'medium','Bạn đứng quay mặt về phía Bắc. Tay phải bạn chỉ về hướng nào?',[{key:'A',text:'Bắc'},{key:'B',text:'Tây'},{key:'C',text:'Đông'}],'C','Quay về Bắc, tay phải chỉ về Đông.'),
  sc(138,4,3,'medium','Hình nào vừa có cạnh thẳng vừa có 4 góc?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'}],'C','Hình chữ nhật có 4 cạnh thẳng và 4 góc.'),
  mc(138,4,4,'medium','Chọn các hình có CẠnh THẲNG:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],['A','C','D'],'Hình tròn không có cạnh thẳng.'),
  mc(138,4,5,'medium','Chọn các từ chỉ VỊ TRÍ:',[{key:'A',text:'Trên'},{key:'B',text:'Đỏ'},{key:'C',text:'Dưới'},{key:'D',text:'Trái'}],['A','C','D'],'Đỏ là màu sắc, không phải vị trí.'),
  mc(138,4,6,'medium','Hình nào có số cạnh bằng nhau?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác đều'}],['A','D'],'Hình vuông và tam giác đều có các cạnh bằng nhau.'),
  mt(138,4,7,'medium','Nối hình với số cạnh tương ứng:',[{key:'hình tròn',text:'hình tròn'},{key:'hình tam giác',text:'hình tam giác'},{key:'hình vuông',text:'hình vuông'},{key:'hình chữ nhật',text:'hình chữ nhật'}],{'hình tròn':'0','hình tam giác':'3','hình vuông':'4','hình chữ nhật':'4'},'Tròn: 0, Tam giác: 3, Vuông: 4, Chữ nhật: 4.'),
  mt(138,4,8,'medium','Nối hướng với hướng ngược lại:',[{key:'trên',text:'trên'},{key:'dưới',text:'dưới'},{key:'trái',text:'trái'},{key:'phải',text:'phải'}],{'trên':'dưới','trái':'phải'},'Trên-dưới, trái-phải là các cặp đối lập.'),
  dd(138,4,9,'medium','Kéo thả hình vào đúng nhóm "Có cạnh thẳng":',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'},{key:'D',text:'Hình chữ nhật'}],['A','C','D'],'Hình tròn không có cạnh thẳng.'),
  dd(138,4,10,'medium','Sắp xếp các từ vị trí vào đúng cặp đối lập:',[{key:'A',text:'trên'},{key:'B',text:'phải'},{key:'C',text:'dưới'},{key:'D',text:'trái'}],['A','C','B','D'],'Trên-dưới, phải-trái.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(138,5,1,'medium','Điền số cạnh của mỗi hình vào bảng:',[{key:'tròn',text:'Hình tròn'},{key:'tam_giac',text:'Hình tam giác'},{key:'vuong',text:'Hình vuông'},{key:'chu_nhat',text:'Hình chữ nhật'}],{'tròn':'0','tam_giac':'3','vuong':'4','chu_nhat':'4'},'Tròn: 0, Tam giác: 3, Vuông: 4, Chữ nhật: 4.'),
  tf2(138,5,2,'medium','Điền hướng ngược lại:',[{key:'tren',text:'Trên →'},{key:'trai',text:'Trái →'}],{'tren':'dưới','trai':'phải'},'Trên-dưới, trái-phải.'),
  nl(138,5,3,'medium','Đặt số thứ tự đúng: hình tròn=1, tam giác=2, vuông=3, chữ nhật=4',[{key:'p1',text:'hình tròn'},{key:'p2',text:'hình tam giác'},{key:'p3',text:'hình vuông'},{key:'p4',text:'hình chữ nhật'}],{'p1':'1','p2':'2','p3':'3','p4':'4'},'Thứ tự: tròn, tam giác, vuông, chữ nhật.'),
  nl(138,5,4,'medium','Điền số cạnh vào đúng vị trí trục số (0, 3, 4):',[{key:'p0',text:'hình tròn'},{key:'p3',text:'hình tam giác'},{key:'p4a',text:'hình vuông'}],{'p0':'0','p3':'3','p4a':'4'},'Tròn: 0, Tam giác: 3, Vuông: 4.'),
  pz(138,5,5,'medium','Ghép mảnh: hình nào có 4 cạnh và 4 góc vuông nhưng các cạnh KHÔNG bằng nhau?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tam giác'}],'B','Hình chữ nhật có 4 góc vuông nhưng cạnh dài ≠ cạnh ngắn.'),
  pz(138,5,6,'medium','Tôi có 3 cạnh và 3 đỉnh. Tôi là hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông'},{key:'C',text:'Hình tam giác'}],'C','Hình tam giác có 3 cạnh và 3 đỉnh.'),
  pz(138,5,7,'medium','Không có cạnh thẳng, tròn trịa. Tôi là hình gì?',[{key:'A',text:'Hình chữ nhật'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình tam giác'}],'B','Hình tròn tròn trịa, không có cạnh thẳng.'),
  mt(138,5,8,'medium','Nối vật dụng với hình tương ứng:',[{key:'banh',text:'Quả bóng'},{key:'hop',text:'Hộp quà'},{key:'khan_tay',text:'Khăn tay vuông'},{key:'non',text:'Nón lá'}],{'banh':'hình tròn','hop':'hình chữ nhật','khan_tay':'hình vuông','non':'hình tam giác'},'Bóng-tròn, hộp-chữ nhật, khăn-vuông, nón-tam giác.'),
  mt(138,5,9,'medium','Nối mô tả với hình:',[{key:'3canh',text:'Có 3 cạnh'},{key:'0canh',text:'Không có cạnh'},{key:'4canh_bang',text:'4 cạnh bằng nhau'}],{'3canh':'hình tam giác','0canh':'hình tròn','4canh_bang':'hình vuông'},'3 cạnh-tam giác, 0 cạnh-tròn, 4 cạnh bằng-vuông.'),
  dd(138,5,10,'medium','Kéo hình vào đúng nhóm số cạnh (0, 3, 4):',[{key:'A',text:'Hình tròn → 0'},{key:'B',text:'Hình tam giác → 3'},{key:'C',text:'Hình vuông → 4'}],['A','B','C'],'Tròn 0, tam giác 3, vuông 4.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(138,6,1,'hard','Hình có 4 cạnh bằng nhau và 4 góc vuông gọi là hình [b1].',[{key:'b1',text:'?'}],{b1:'vuông'},'Hình vuông: 4 cạnh bằng nhau, 4 góc vuông.'),
  fb(138,6,2,'hard','Một hình có 2 cạnh dài và 2 cạnh ngắn là hình [b1].',[{key:'b1',text:'?'}],{b1:'chữ nhật'},'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.'),
  fb(138,6,3,'hard','Bạn đứng quay mặt về phía Nam. Bên trái bạn là hướng [b1].',[{key:'b1',text:'?'}],{b1:'Đông'},'Quay Nam: tay trái chỉ về Đông.'),
  pz(138,6,4,'hard','Ghép: Hình nào khi xếp 2 cái lại tạo thành hình chữ nhật?',[{key:'A',text:'2 hình tam giác vuông'},{key:'B',text:'2 hình tròn'},{key:'C',text:'2 hình vuông'}],'A','2 tam giác vuông ghép lại tạo thành hình chữ nhật.'),
  pz(138,6,5,'hard','Tôi có 4 cạnh, 2 cạnh dài = nhau, 2 cạnh ngắn = nhau, nhưng cạnh dài ≠ cạnh ngắn. Tôi là gì?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình chữ nhật'},{key:'C',text:'Hình tam giác'}],'B','Đặc điểm của hình chữ nhật.'),
  pz(138,6,6,'hard','Hình nào có thể lăn được?',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình tròn'}],'C','Hình tròn có thể lăn vì cạnh cong đều.'),
  mc(138,6,7,'hard','Chọn những câu ĐÚNG về hình chữ nhật:',[{key:'A',text:'Có 4 cạnh'},{key:'B',text:'Có 4 cạnh bằng nhau'},{key:'C',text:'Có 4 góc vuông'},{key:'D',text:'Không có cạnh thẳng'}],['A','C'],'Hình chữ nhật có 4 cạnh và 4 góc vuông, nhưng 4 cạnh không nhất thiết bằng nhau.'),
  mc(138,6,8,'hard','Chọn các hình KHÔNG phải hình tứ giác:',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình vuông'},{key:'D',text:'Hình chữ nhật'}],['A','B'],'Tứ giác là hình có 4 cạnh; tròn và tam giác không phải tứ giác.'),
  so(138,6,9,'hard','Sắp xếp số cạnh từ nhiều đến ít: chữ nhật, tròn, tam giác, vuông',[{key:'A',text:'chữ nhật (4)'},{key:'B',text:'vuông (4)'},{key:'C',text:'tam giác (3)'},{key:'D',text:'tròn (0)'}],['A','B','C','D'],'4, 4, 3, 0.'),
  so(138,6,10,'hard','Sắp xếp các hướng theo chiều kim đồng hồ: Đông, Nam, Tây, Bắc',[{key:'A',text:'Bắc'},{key:'B',text:'Đông'},{key:'C',text:'Nam'},{key:'D',text:'Tây'}],['A','B','C','D'],'Chiều kim đồng hồ: Bắc → Đông → Nam → Tây.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(138,7,1,'hard','Trò chơi: Nối hình với tên đúng (hình tròn, vuông, tam giác, chữ nhật)',[{key:'🔴',text:'hình tròn'},{key:'🟦',text:'hình vuông'},{key:'🔺',text:'hình tam giác'},{key:'▬',text:'hình chữ nhật'}],'Nối đúng hình với tên.'),
  gm(138,7,2,'hard','Trò chơi: Ghép cặp hướng đối lập (trên-dưới, trái-phải, trước-sau)',[{key:'trên',text:'dưới'},{key:'trái',text:'phải'},{key:'trước',text:'sau'}],'Ghép đúng các cặp hướng ngược nhau.'),
  mt(138,7,3,'hard','Nối hình với số đỉnh:',[{key:'tron',text:'Hình tròn'},{key:'tam_giac',text:'Hình tam giác'},{key:'vuong',text:'Hình vuông'},{key:'chu_nhat',text:'Hình chữ nhật'}],{'tron':'0','tam_giac':'3','vuong':'4','chu_nhat':'4'},'Tròn: 0, Tam giác: 3, Vuông: 4, Chữ nhật: 4 đỉnh.'),
  mt(138,7,4,'hard','Nối vật thật với hình học:',[{key:'dong_ho',text:'Mặt đồng hồ tròn'},{key:'gach',text:'Viên gạch'},{key:'tam_giac_canh',text:'Biển báo tam giác'},{key:'khan',text:'Khăn vuông'}],{'dong_ho':'hình tròn','gach':'hình chữ nhật','tam_giac_canh':'hình tam giác','khan':'hình vuông'},'Nhận biết hình trong thực tế.'),
  mt(138,7,5,'hard','Nối mô tả vị trí:',[{key:'den_tren',text:'Đèn ở ___ bàn'},{key:'sach_duoi',text:'Sách ở ___ bàn'},{key:'meo_trai',text:'Mèo ở ___ chó'}],{'den_tren':'trên','sach_duoi':'dưới','meo_trai':'trái'},'Điền đúng từ chỉ vị trí.'),
  fb(138,7,6,'hard','Hình [b1] có 3 cạnh và 3 góc.',[{key:'b1',text:'?'}],{b1:'tam giác'},'Tam giác: 3 cạnh, 3 góc.'),
  fb(138,7,7,'hard','Khi bạn quay mặt về Đông, bên phải bạn là hướng [b1].',[{key:'b1',text:'?'}],{b1:'Nam'},'Quay Đông: tay phải chỉ Nam.'),
  fb(138,7,8,'hard','Hình [b1] và hình [b2] đều có 4 cạnh.',[{key:'b1',text:'?'},{key:'b2',text:'?'}],{b1:'vuông',b2:'chữ nhật'},'Cả vuông và chữ nhật đều có 4 cạnh.'),
  dd(138,7,9,'hard','Kéo hình vào đúng vị trí trên/dưới/trái/phải:',[{key:'A',text:'Hình tròn → trên'},{key:'B',text:'Hình vuông → dưới'},{key:'C',text:'Hình tam giác → trái'}],['A','B','C'],'Đặt đúng vị trí theo mô tả.'),
  dd(138,7,10,'hard','Sắp xếp: đặt hình có ÍT cạnh nhất lên trước:',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Hình tam giác (3)'},{key:'C',text:'Hình vuông (4)'}],['A','B','C'],'0 < 3 < 4.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(138,8,1,'hard','Chọn các hình có 4 CẠnh:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tam giác'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tròn'}],['A','C'],'Vuông và chữ nhật mỗi hình có 4 cạnh.'),
  mc(138,8,2,'hard','Những câu nào ĐÚNG về hướng?',[{key:'A',text:'Trên và dưới ngược nhau'},{key:'B',text:'Trái và phải cùng chiều'},{key:'C',text:'Trước và sau ngược nhau'},{key:'D',text:'Bắc và Nam ngược nhau'}],['A','C','D'],'B sai: trái-phải ngược nhau.'),
  mc(138,8,3,'hard','Chọn đặc điểm ĐÚNG của hình tròn:',[{key:'A',text:'Không có cạnh thẳng'},{key:'B',text:'Có thể lăn được'},{key:'C',text:'Có 4 góc'},{key:'D',text:'Cạnh cong đều'}],['A','B','D'],'Hình tròn không có cạnh thẳng, không có góc, có thể lăn, cạnh cong đều.'),
  pz(138,8,4,'hard','Xếp 4 hình vuông nhỏ thành 1 hình lớn → hình gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình vuông lớn'},{key:'C',text:'Hình tam giác'}],'B','4 hình vuông nhỏ xếp 2×2 tạo thành 1 hình vuông lớn.'),
  pz(138,8,5,'hard','Cắt hình chữ nhật theo đường chéo được 2 hình gì?',[{key:'A',text:'2 hình tròn'},{key:'B',text:'2 hình tam giác'},{key:'C',text:'2 hình vuông'}],'B','Cắt chéo hình chữ nhật được 2 hình tam giác vuông.'),
  pz(138,8,6,'hard','Tôi có nhiều cạnh hơn tam giác nhưng ít hơn ngũ giác (5 cạnh). Tôi là gì?',[{key:'A',text:'Hình tròn'},{key:'B',text:'Hình tứ giác (4 cạnh)'},{key:'C',text:'Hình lục giác'}],'B','Tam giác: 3, tứ giác: 4 < 5 của ngũ giác.'),
  so(138,8,7,'hard','Sắp xếp hình theo số góc tăng dần: tròn, tam giác, vuông, chữ nhật',[{key:'A',text:'Hình tròn (0)'},{key:'B',text:'Hình tam giác (3)'},{key:'C',text:'Hình vuông (4)'},{key:'D',text:'Hình chữ nhật (4)'}],['A','B','C','D'],'0, 3, 4, 4 góc.'),
  so(138,8,8,'hard','Sắp xếp hướng theo thứ tự ngược chiều kim đồng hồ từ Bắc:',[{key:'A',text:'Bắc'},{key:'B',text:'Tây'},{key:'C',text:'Nam'},{key:'D',text:'Đông'}],['A','B','C','D'],'Ngược chiều kim đồng hồ: Bắc → Tây → Nam → Đông.'),
  co(138,8,9,'hard','Gạch bỏ hình KHÔNG phải tứ giác:',[{key:'A',text:'Hình vuông'},{key:'B',text:'Hình tròn'},{key:'C',text:'Hình chữ nhật'},{key:'D',text:'Hình tam giác'}],['B','D'],'Tròn và tam giác không phải tứ giác.'),
  co(138,8,10,'hard','Gạch bỏ từ KHÔNG chỉ hướng:',[{key:'A',text:'Trên'},{key:'B',text:'Đỏ'},{key:'C',text:'Dưới'},{key:'D',text:'To'}],['B','D'],'Đỏ (màu sắc) và To (kích thước) không phải từ chỉ hướng.'),
];

// ─── LESSON 139: Ôn tập các số trong phạm vi 10 ──────────────────────────────
const L139: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(139,1,1,'easy','Số liền sau của 5 là số nào?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'7'}],'B','5 + 1 = 6.'),
  sc(139,1,2,'easy','Số liền trước của 8 là số nào?',[{key:'A',text:'9'},{key:'B',text:'6'},{key:'C',text:'7'}],'C','8 - 1 = 7.'),
  sc(139,1,3,'easy','Số nào lớn nhất trong các số: 3, 7, 5, 9?',[{key:'A',text:'3'},{key:'B',text:'7'},{key:'C',text:'9'}],'C','9 là số lớn nhất.'),
  sc(139,1,4,'easy','Số nào nhỏ nhất trong các số: 4, 2, 6, 0?',[{key:'A',text:'0'},{key:'B',text:'2'},{key:'C',text:'4'}],'A','0 là số nhỏ nhất.'),
  tf(139,1,5,'easy','Số 7 lớn hơn số 5. Đúng hay sai?',true,'7 > 5.'),
  tf(139,1,6,'easy','Số 3 lớn hơn số 6. Đúng hay sai?',false,'3 < 6.'),
  tf(139,1,7,'easy','Số 10 là số lớn nhất trong phạm vi 10. Đúng hay sai?',true,'Trong phạm vi 0-10, số 10 là lớn nhất.'),
  fb(139,1,8,'easy','Số liền sau của 9 là [b1].',[{key:'b1',text:'?'}],{b1:'10'},'9 + 1 = 10.'),
  fb(139,1,9,'easy','Số liền trước của 1 là [b1].',[{key:'b1',text:'?'}],{b1:'0'},'1 - 1 = 0.'),
  fb(139,1,10,'easy','6 > [b1] (điền một số nhỏ hơn 6).',[{key:'b1',text:'?'}],{b1:'5'},'Ví dụ: 6 > 5.'),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(139,2,1,'easy','🍎🍎🍎🍎🍎🍎🍎 Có mấy quả táo?','7','Đếm: 7 quả táo.'),
  ct(139,2,2,'easy','⭐⭐⭐⭐⭐⭐⭐⭐⭐ Có mấy ngôi sao?','9','Đếm: 9 ngôi sao.'),
  ct(139,2,3,'easy','🐟🐟🐟🐟🐟🐟 Có mấy con cá?','6','Đếm: 6 con cá.'),
  so(139,2,4,'easy','Sắp xếp từ bé đến lớn: 5, 2, 8, 1',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'5'},{key:'D',text:'8'}],['A','B','C','D'],'1 < 2 < 5 < 8.'),
  so(139,2,5,'easy','Sắp xếp từ lớn đến bé: 3, 9, 6, 0',[{key:'A',text:'9'},{key:'B',text:'6'},{key:'C',text:'3'},{key:'D',text:'0'}],['A','B','C','D'],'9 > 6 > 3 > 0.'),
  so(139,2,6,'easy','Sắp xếp từ bé đến lớn: 4, 7, 0, 10',[{key:'A',text:'0'},{key:'B',text:'4'},{key:'C',text:'7'},{key:'D',text:'10'}],['A','B','C','D'],'0 < 4 < 7 < 10.'),
  co(139,2,7,'easy','Gạch bỏ số LẺ trong dãy: 2, 3, 4, 5, 6',[{key:'A',text:'2'},{key:'B',text:'3'},{key:'C',text:'4'},{key:'D',text:'5'},{key:'E',text:'6'}],['B','D'],'3 và 5 là số lẻ.'),
  co(139,2,8,'easy','Gạch bỏ số CHẴN trong dãy: 1, 2, 3, 4, 5',[{key:'A',text:'1'},{key:'B',text:'2'},{key:'C',text:'3'},{key:'D',text:'4'},{key:'E',text:'5'}],['B','D'],'2 và 4 là số chẵn.'),
  fb(139,2,9,'easy','Điền số còn thiếu: 0, 1, 2, [b1], 4, 5.',[{key:'b1',text:'?'}],{b1:'3'},'Dãy tăng dần: 0,1,2,3,4,5.'),
  fb(139,2,10,'easy','Điền số còn thiếu: 10, 9, 8, [b1], 6.',[{key:'b1',text:'?'}],{b1:'7'},'Dãy giảm dần: 10,9,8,7,6.'),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(139,3,1,'easy','Số nào đứng giữa 4 và 6?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'7'}],'B','4, 5, 6 — số 5 đứng giữa.'),
  sc(139,3,2,'easy','Có 8 con chim, bay đi 2 con. Còn mấy con?',[{key:'A',text:'6'},{key:'B',text:'10'},{key:'C',text:'8'}],'A','8 - 2 = 6.'),
  sc(139,3,3,'easy','Số nào là số chẵn?',[{key:'A',text:'3'},{key:'B',text:'5'},{key:'C',text:'8'}],'C','8 là số chẵn (chia hết cho 2).'),
  sc(139,3,4,'easy','Số nào là số lẻ?',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'7'}],'C','7 là số lẻ.'),
  tf(139,3,5,'easy','Số 0 nhỏ hơn mọi số từ 1 đến 10. Đúng hay sai?',true,'0 < 1 < 2 < ... < 10.'),
  tf(139,3,6,'easy','Số 5 nằm giữa 4 và 7. Đúng hay sai?',true,'4 < 5 < 7, vậy 5 nằm giữa 4 và 7.'),
  tf(139,3,7,'easy','Số 10 = 1 chục. Đúng hay sai?',true,'10 = 1 chục đơn vị.'),
  fb(139,3,8,'easy','Số lớn hơn 7 và nhỏ hơn 9 là [b1].',[{key:'b1',text:'?'}],{b1:'8'},'7 < 8 < 9.'),
  fb(139,3,9,'easy','3 + 4 = [b1].',[{key:'b1',text:'?'}],{b1:'7'},'3 + 4 = 7.'),
  ct(139,3,10,'easy','🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 Có mấy bông hoa?','10','Đếm: 10 bông hoa.'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(139,4,1,'medium','Điền dấu đúng: 5 ○ 8',[{key:'A',text:'>'},{key:'B',text:'<'},{key:'C',text:'='}],'B','5 < 8.'),
  sc(139,4,2,'medium','Có 3 con thỏ trắng và 4 con thỏ nâu. Có tất cả bao nhiêu con thỏ?',[{key:'A',text:'1'},{key:'B',text:'7'},{key:'C',text:'8'}],'B','3 + 4 = 7 con thỏ.'),
  sc(139,4,3,'medium','Số nào vừa lớn hơn 5 vừa nhỏ hơn 8?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'9'}],'B','5 < 6 < 8.'),
  mc(139,4,4,'medium','Chọn tất cả số CHẴN từ 0 đến 10:',[{key:'A',text:'0'},{key:'B',text:'2'},{key:'C',text:'4'},{key:'D',text:'6'},{key:'E',text:'8'},{key:'F',text:'10'}],['A','B','C','D','E','F'],'0,2,4,6,8,10 là số chẵn.'),
  mc(139,4,5,'medium','Chọn các số LỚN HƠN 5:',[{key:'A',text:'3'},{key:'B',text:'6'},{key:'C',text:'8'},{key:'D',text:'10'}],['B','C','D'],'6, 8, 10 > 5.'),
  mc(139,4,6,'medium','Chọn các số NẰM GIỮA 3 và 8:',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'7'},{key:'E',text:'9'}],['B','C','D'],'4, 5, 7 nằm giữa 3 và 8.'),
  mt(139,4,7,'medium','Nối phép tính với kết quả:',[{key:'3+4',text:'3 + 4'},{key:'5+2',text:'5 + 2'},{key:'8-3',text:'8 - 3'},{key:'10-4',text:'10 - 4'}],{'3+4':'7','5+2':'7','8-3':'5','10-4':'6'},'3+4=7, 5+2=7, 8-3=5, 10-4=6.'),
  mt(139,4,8,'medium','Nối số với số chẵn/lẻ:',[{key:'2',text:'2'},{key:'3',text:'3'},{key:'5',text:'5'},{key:'8',text:'8'}],{'2':'chẵn','3':'lẻ','5':'lẻ','8':'chẵn'},'2,8 chẵn; 3,5 lẻ.'),
  dd(139,4,9,'medium','Kéo số vào đúng thứ tự tăng dần: 7, 2, 9, 4',[{key:'A',text:'2'},{key:'B',text:'4'},{key:'C',text:'7'},{key:'D',text:'9'}],['A','B','C','D'],'2 < 4 < 7 < 9.'),
  dd(139,4,10,'medium','Kéo số vào đúng thứ tự giảm dần: 1, 6, 3, 10',[{key:'A',text:'10'},{key:'B',text:'6'},{key:'C',text:'3'},{key:'D',text:'1'}],['A','B','C','D'],'10 > 6 > 3 > 1.'),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(139,5,1,'medium','Điền kết quả phép tính vào bảng:',[{key:'p1',text:'4 + 3 = ?'},{key:'p2',text:'9 - 2 = ?'},{key:'p3',text:'5 + 5 = ?'},{key:'p4',text:'8 - 4 = ?'}],{'p1':'7','p2':'7','p3':'10','p4':'4'},'4+3=7, 9-2=7, 5+5=10, 8-4=4.'),
  tf2(139,5,2,'medium','Điền số chẵn hoặc lẻ:',[{key:'s1',text:'1'},{key:'s2',text:'4'},{key:'s3',text:'7'},{key:'s4',text:'10'}],{'s1':'lẻ','s2':'chẵn','s3':'lẻ','s4':'chẵn'},'1,7 lẻ; 4,10 chẵn.'),
  nl(139,5,3,'medium','Điền số còn thiếu trên trục số (0 đến 10):',[{key:'p2',text:'?'},{key:'p5',text:'?'},{key:'p8',text:'?'}],{'p2':'2','p5':'5','p8':'8'},'Trục số: 0,1,2,...,10.'),
  nl(139,5,4,'medium','Điền số vào đúng vị trí: các số chẵn từ 0 đến 10:',[{key:'pos0',text:'_'},{key:'pos2',text:'_'},{key:'pos4',text:'_'},{key:'pos6',text:'_'},{key:'pos8',text:'_'},{key:'pos10',text:'_'}],{'pos0':'0','pos2':'2','pos4':'4','pos6':'6','pos8':'8','pos10':'10'},'Số chẵn: 0,2,4,6,8,10.'),
  pz(139,5,5,'medium','Tôi là số lớn hơn 6 và nhỏ hơn 8. Tôi là số mấy?',[{key:'A',text:'5'},{key:'B',text:'7'},{key:'C',text:'9'}],'B','6 < 7 < 8.'),
  pz(139,5,6,'medium','Tổng của hai số bằng 10. Một số là 3. Số kia là bao nhiêu?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'7'}],'C','10 - 3 = 7.'),
  pz(139,5,7,'medium','Có 10 quả, ăn một số quả, còn 4 quả. Ăn bao nhiêu quả?',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'14'}],'B','10 - 4 = 6 quả đã ăn.'),
  mt(139,5,8,'medium','Nối phép trừ với kết quả đúng:',[{key:'10-1',text:'10 - 1'},{key:'10-3',text:'10 - 3'},{key:'10-5',text:'10 - 5'},{key:'10-7',text:'10 - 7'}],{'10-1':'9','10-3':'7','10-5':'5','10-7':'3'},'10-1=9, 10-3=7, 10-5=5, 10-7=3.'),
  mt(139,5,9,'medium','Nối số với số liền trước của nó:',[{key:'5',text:'5'},{key:'8',text:'8'},{key:'10',text:'10'},{key:'3',text:'3'}],{'5':'4','8':'7','10':'9','3':'2'},'Số liền trước = số đó - 1.'),
  dd(139,5,10,'medium','Kéo số vào đúng vị trí trên trục số 0-10: 3, 6, 9',[{key:'A',text:'3 → vị trí 3'},{key:'B',text:'6 → vị trí 6'},{key:'C',text:'9 → vị trí 9'}],['A','B','C'],'3, 6, 9 trên trục số.'),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(139,6,1,'hard','Điền dấu: 3 + 4 [b1] 8.',[{key:'b1',text:'?'}],{b1:'<'},'3+4=7 < 8.'),
  fb(139,6,2,'hard','Số nào cộng với 4 bằng 10? [b1]',[{key:'b1',text:'?'}],{b1:'6'},'10 - 4 = 6, vậy 6 + 4 = 10.'),
  fb(139,6,3,'hard','Có [b1] số lẻ từ 1 đến 10.',[{key:'b1',text:'?'}],{b1:'5'},'1,3,5,7,9 — có 5 số lẻ.'),
  pz(139,6,4,'hard','Số nào cộng với chính nó bằng 10?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','5 + 5 = 10.'),
  pz(139,6,5,'hard','Tôi là số chẵn, lớn hơn 6, nhỏ hơn 10. Tôi là số mấy?',[{key:'A',text:'7'},{key:'B',text:'8'},{key:'C',text:'9'}],'B','8 chẵn, 6 < 8 < 10.'),
  pz(139,6,6,'hard','Có 10 bạn, một nửa là bạn gái. Có mấy bạn trai?',[{key:'A',text:'4'},{key:'B',text:'5'},{key:'C',text:'6'}],'B','10 : 2 = 5 bạn gái, 10 - 5 = 5 bạn trai.'),
  mc(139,6,7,'hard','Chọn các phép tính có kết quả bằng 8:',[{key:'A',text:'4 + 4'},{key:'B',text:'3 + 5'},{key:'C',text:'10 - 2'},{key:'D',text:'9 - 2'}],['A','B','C'],'4+4=8, 3+5=8, 10-2=8; 9-2=7.'),
  mc(139,6,8,'hard','Chọn các số LẺ từ 0 đến 10:',[{key:'A',text:'1'},{key:'B',text:'3'},{key:'C',text:'5'},{key:'D',text:'7'},{key:'E',text:'9'}],['A','B','C','D','E'],'1,3,5,7,9 là số lẻ.'),
  so(139,6,9,'hard','Sắp xếp kết quả từ nhỏ đến lớn: 3+2, 1+1, 4+4, 5+3',[{key:'A',text:'1+1=2'},{key:'B',text:'3+2=5'},{key:'C',text:'5+3=8'},{key:'D',text:'4+4=8'}],['A','B','C','D'],'2 < 5 < 8 = 8.'),
  so(139,6,10,'hard','Sắp xếp từ lớn đến nhỏ: 10-1, 10-5, 10-3, 10-8',[{key:'A',text:'10-1=9'},{key:'B',text:'10-3=7'},{key:'C',text:'10-5=5'},{key:'D',text:'10-8=2'}],['A','B','C','D'],'9 > 7 > 5 > 2.'),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(139,7,1,'hard','Trò chơi: Ghép số với số liền sau (1→2, 3→4, 5→6, 7→8, 9→10)',[{key:'1',text:'2'},{key:'3',text:'4'},{key:'5',text:'6'},{key:'7',text:'8'},{key:'9',text:'10'}],'Nối số với số liền sau.'),
  gm(139,7,2,'hard','Trò chơi: Ghép phép tính với kết quả (2+3→5, 4+4→8, 7+3→10, 6+2→8)',[{key:'2+3',text:'5'},{key:'4+4',text:'8'},{key:'7+3',text:'10'},{key:'6+2',text:'8'}],'Nối phép tính với kết quả.'),
  mt(139,7,3,'hard','Nối phép cộng với phép trừ tương ứng (phép tính ngược):',[{key:'3+7',text:'3 + 7 = 10'},{key:'4+6',text:'4 + 6 = 10'},{key:'2+8',text:'2 + 8 = 10'}],{'3+7':'10 - 7 = 3','4+6':'10 - 6 = 4','2+8':'10 - 8 = 2'},'Phép tính ngược: a+b=10 ↔ 10-b=a.'),
  mt(139,7,4,'hard','Nối số với số chẵn liền sau:',[{key:'1',text:'1'},{key:'3',text:'3'},{key:'5',text:'5'},{key:'7',text:'7'}],{'1':'2','3':'4','5':'6','7':'8'},'Số chẵn liền sau số lẻ n là n+1.'),
  mt(139,7,5,'hard','Nối biểu thức với giá trị đúng:',[{key:'e1',text:'Số lớn nhất < 10'},{key:'e2',text:'Số nhỏ nhất > 0'},{key:'e3',text:'Số chẵn giữa 4 và 8'}],{'e1':'9','e2':'1','e3':'6'},'Số lớn nhất <10 là 9; nhỏ nhất >0 là 1; chẵn giữa 4,8 là 6.'),
  fb(139,7,6,'hard','5 + [b1] = 10.',[{key:'b1',text:'?'}],{b1:'5'},'5 + 5 = 10.'),
  fb(139,7,7,'hard','[b1] - 3 = 7.',[{key:'b1',text:'?'}],{b1:'10'},'10 - 3 = 7.'),
  fb(139,7,8,'hard','Số liền trước và liền sau của 6 là [b1] và [b2].',[{key:'b1',text:'liền trước'},{key:'b2',text:'liền sau'}],{b1:'5',b2:'7'},'5, 6, 7.'),
  dd(139,7,9,'hard','Kéo số vào đúng phép tính: 10 - ___ = 4 (chọn số thích hợp)',[{key:'A',text:'4'},{key:'B',text:'6'},{key:'C',text:'5'}],['B'],'10 - 6 = 4.'),
  dd(139,7,10,'hard','Sắp xếp: 0, 10, 5, 3, 8 từ nhỏ đến lớn',[{key:'A',text:'0'},{key:'B',text:'3'},{key:'C',text:'5'},{key:'D',text:'8'},{key:'E',text:'10'}],['A','B','C','D','E'],'0 < 3 < 5 < 8 < 10.'),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(139,8,1,'hard','Chọn phép tính có kết quả bằng 7:',[{key:'A',text:'4 + 3'},{key:'B',text:'10 - 3'},{key:'C',text:'5 + 2'},{key:'D',text:'8 - 2'}],['A','B','C'],'4+3=7, 10-3=7, 5+2=7; 8-2=6.'),
  mc(139,8,2,'hard','Chọn những câu ĐÚNG về số 10:',[{key:'A',text:'10 là số chẵn'},{key:'B',text:'10 = 5 + 5'},{key:'C',text:'10 < 9'},{key:'D',text:'10 là số lớn nhất trong phạm vi 10'}],['A','B','D'],'C sai: 10 > 9.'),
  mc(139,8,3,'hard','Chọn các cặp số có tổng bằng 10:',[{key:'A',text:'3 và 7'},{key:'B',text:'4 và 6'},{key:'C',text:'2 và 9'},{key:'D',text:'5 và 5'}],['A','B','D'],'3+7=10, 4+6=10, 5+5=10; 2+9=11≠10.'),
  pz(139,8,4,'hard','Nam có 10 viên bi. Nam cho bạn một số viên, còn lại 3. Nam cho bao nhiêu viên?',[{key:'A',text:'3'},{key:'B',text:'7'},{key:'C',text:'13'}],'B','10 - 3 = 7 viên bi đã cho.'),
  pz(139,8,5,'hard','Dãy số: 2, 4, 6, 8, ___. Số tiếp theo là bao nhiêu?',[{key:'A',text:'9'},{key:'B',text:'10'},{key:'C',text:'12'}],'B','Dãy số chẵn tăng dần: 2,4,6,8,10.'),
  pz(139,8,6,'hard','Lan đếm ngược từ 10: 10, 9, 8, 7, ___. Số tiếp theo là bao nhiêu?',[{key:'A',text:'5'},{key:'B',text:'6'},{key:'C',text:'8'}],'B','Đếm ngược: 10,9,8,7,6.'),
  so(139,8,7,'hard','Sắp xếp phép tính theo thứ tự kết quả tăng dần: 2+1, 4+3, 6+2, 1+0',[{key:'A',text:'1+0=1'},{key:'B',text:'2+1=3'},{key:'C',text:'6+2=8'},{key:'D',text:'4+3=7'}],['A','B','D','C'],'1 < 3 < 7 < 8.'),
  so(139,8,8,'hard','Sắp xếp theo kết quả giảm dần: 10-0, 10-4, 10-7, 10-10',[{key:'A',text:'10-0=10'},{key:'B',text:'10-4=6'},{key:'C',text:'10-7=3'},{key:'D',text:'10-10=0'}],['A','B','C','D'],'10 > 6 > 3 > 0.'),
  co(139,8,9,'hard','Gạch bỏ phép tính có kết quả SAI:',[{key:'A',text:'3+4=7 ✓'},{key:'B',text:'5+6=10 ✗'},{key:'C',text:'8-3=5 ✓'},{key:'D',text:'9-2=8 ✗'}],['B','D'],'5+6=11≠10; 9-2=7≠8.'),
  co(139,8,10,'hard','Gạch bỏ số KHÔNG phải số lẻ:',[{key:'A',text:'1'},{key:'B',text:'4'},{key:'C',text:'7'},{key:'D',text:'10'}],['B','D'],'4 và 10 là số chẵn.'),
];

const SQL = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;

async function seed() {
  await ds.initialize();
  const qr = ds.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();
  try {
    await qr.query('DELETE FROM quizzes WHERE lessonId IN (138,139)');

    for (const row of L138) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 138: ${L138.length} questions inserted`);

    for (const row of L139) {
      await qr.query(SQL, row);
    }
    console.log(`✅ lessonId: 139: ${L139.length} questions inserted`);

    await qr.commitTransaction();
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
