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

// ─── LESSON 137: Vị trí, định hướng trong không gian ───────────────────────
const L137: Row[] = [
  // Ex1 easy: 4 single_choice, 3 true_false, 3 fill_blank
  sc(137,1,1,'easy','Con mèo ngồi TRÊN bàn. Con mèo ở vị trí nào?',
    [{key:'A',text:'Dưới bàn'},{key:'B',text:'Trên bàn'},{key:'C',text:'Bên cạnh bàn'}],'B','Con mèo ngồi trên bàn nên ở vị trí trên bàn.'),
  sc(137,1,2,'easy','Quả bóng nằm DƯỚI ghế. Quả bóng ở vị trí nào?',
    [{key:'A',text:'Trên ghế'},{key:'B',text:'Trong ghế'},{key:'C',text:'Dưới ghế'}],'C','Quả bóng nằm dưới ghế.'),
  sc(137,1,3,'easy','Chú chim đậu ở cành cây phía TRÊN. Đây là hướng nào?',
    [{key:'A',text:'Dưới'},{key:'B',text:'Trên'},{key:'C',text:'Trái'}],'B'),
  sc(137,1,4,'easy','Chiếc xe đồ chơi nằm DƯỚI tủ. Từ nào mô tả đúng vị trí?',
    [{key:'A',text:'Trên'},{key:'B',text:'Bên cạnh'},{key:'C',text:'Dưới'}],'C'),
  tf(137,1,5,'easy','Quyển sách để trên bàn nghĩa là sách ở phía cao hơn mặt bàn. Đúng hay sai?',true,'Trên có nghĩa là phía cao hơn.'),
  tf(137,1,6,'easy','Con chó nằm dưới gầm giường nghĩa là chó ở phía trên giường. Đúng hay sai?',false,'Dưới gầm giường là ở phía thấp hơn, không phải phía trên.'),
  tf(137,1,7,'easy','Đèn trần nhà ở phía trên đầu chúng ta. Đúng hay sai?',true),
  fb(137,1,8,'easy','Con chim bay ở phía [b1] bầu trời.',
    [{key:'b1',text:''}],{b1:'trên'},'Bầu trời ở phía trên, chim bay trên bầu trời.'),
  fb(137,1,9,'easy','Chiếc giày nằm [b1] gầm giường.',
    [{key:'b1',text:''}],{b1:'dưới'}),
  fb(137,1,10,'easy','Mặt trời mọc ở phía [b1] chân trời.',
    [{key:'b1',text:''}],{b1:'trên'}),

  // Ex2 easy: 3 counting, 3 sorting, 2 cross_out, 2 fill_blank
  ct(137,2,1,'easy','🐦🐦🐦🐦🐦 Có bao nhiêu con chim bay phía trên cây?','5'),
  ct(137,2,2,'easy','🌸🌸🌸🌸🌸🌸🌸 Có bao nhiêu bông hoa ở phía trên hàng rào?','7'),
  ct(137,2,3,'easy','⭐⭐⭐⭐⭐⭐ Có bao nhiêu ngôi sao phía trên mây?','6'),
  so(137,2,4,'easy','Sắp xếp theo thứ tự từ dưới lên trên: tầng 1, tầng 3, tầng 2, tầng 4',
    [{key:'1',text:'tầng 1'},{key:'2',text:'tầng 3'},{key:'3',text:'tầng 2'},{key:'4',text:'tầng 4'}],['1','3','2','4']),
  so(137,2,5,'easy','Sắp xếp vị trí từ cao xuống thấp: đỉnh núi, sườn núi, chân núi, mây',
    [{key:'A',text:'đỉnh núi'},{key:'B',text:'sườn núi'},{key:'C',text:'chân núi'},{key:'D',text:'mây'}],['D','A','B','C']),
  so(137,2,6,'easy','Sắp xếp theo thứ tự từ trên xuống: trần nhà, bàn, sàn nhà, đèn',
    [{key:'A',text:'trần nhà'},{key:'B',text:'bàn'},{key:'C',text:'sàn nhà'},{key:'D',text:'đèn'}],['A','D','B','C']),
  co(137,2,7,'easy','Gạch bỏ những thứ KHÔNG ở phía trên:',
    [{key:'A',text:'mây'},{key:'B',text:'giếng'},{key:'C',text:'máy bay'},{key:'D',text:'hầm'}],['B','D'],'Giếng và hầm ở phía dưới đất.'),
  co(137,2,8,'easy','Gạch bỏ những thứ KHÔNG ở phía dưới:',
    [{key:'A',text:'rễ cây'},{key:'B',text:'đỉnh núi'},{key:'C',text:'gầm bàn'},{key:'D',text:'sao trời'}],['B','D']),
  fb(137,2,9,'easy','Rễ cây mọc ở phía [b1] mặt đất.',
    [{key:'b1',text:''}],{b1:'dưới'}),
  fb(137,2,10,'easy','Mây trôi ở phía [b1] bầu trời.',
    [{key:'b1',text:''}],{b1:'trên'}),

  // Ex3 easy: 4 single_choice, 3 true_false, 2 fill_blank, 1 counting
  sc(137,3,1,'easy','Bạn Nam đứng TRƯỚC cổng trường. Bạn Nam ở đâu?',
    [{key:'A',text:'Trong trường'},{key:'B',text:'Sau cổng'},{key:'C',text:'Trước cổng'}],'C'),
  sc(137,3,2,'easy','Con chó chạy SAU con mèo. Con chó ở vị trí nào so với con mèo?',
    [{key:'A',text:'Phía trước'},{key:'B',text:'Phía sau'},{key:'C',text:'Bên cạnh'}],'B','Sau nghĩa là ở phía sau.'),
  sc(137,3,3,'easy','Bạn Lan đứng TRƯỚC bạn Hoa. Bạn nào đứng phía sau?',
    [{key:'A',text:'Bạn Lan'},{key:'B',text:'Bạn Hoa'},{key:'C',text:'Cả hai'}],'B','Bạn Lan đứng trước nên bạn Hoa đứng sau.'),
  sc(137,3,4,'easy','Từ nào mô tả vị trí người đứng đầu hàng?',
    [{key:'A',text:'Sau'},{key:'B',text:'Giữa'},{key:'C',text:'Trước'}],'C'),
  tf(137,3,5,'easy','Người đứng trước là người ở đầu hàng, gần phía trước nhất. Đúng hay sai?',true),
  tf(137,3,6,'easy','Đứng sau cửa nghĩa là đứng ở phía trước cửa. Đúng hay sai?',false,'Đứng sau cửa là ở phía sau, không phải phía trước.'),
  tf(137,3,7,'easy','Bạn đứng trước gương thì gương ở phía trước bạn. Đúng hay sai?',true),
  fb(137,3,8,'easy','Bạn Minh đứng [b1] bạn Tuấn trong hàng, tức là Minh gần đầu hơn.',
    [{key:'b1',text:''}],{b1:'trước'}),
  fb(137,3,9,'easy','Con vịt đi [b1] đàn, tức là ở cuối đàn.',
    [{key:'b1',text:''}],{b1:'sau'}),
  ct(137,3,10,'easy','🐤🐤🐤🐤🐤🐤🐤🐤 Có bao nhiêu chú gà con đi sau gà mẹ?','8'),

  // Ex4 medium: 3 single_choice, 3 multiple_choice, 2 matching, 2 drag_drop
  sc(137,4,1,'medium','Cái cốc ở BÊN TRÁI cái đĩa. Cái cốc ở đâu?',
    [{key:'A',text:'Bên phải đĩa'},{key:'B',text:'Bên trái đĩa'},{key:'C',text:'Trên đĩa'}],'B'),
  sc(137,4,2,'medium','Bạn giơ tay PHẢI lên. Tay nào đang giơ?',
    [{key:'A',text:'Tay trái'},{key:'B',text:'Tay phải'},{key:'C',text:'Cả hai tay'}],'B'),
  sc(137,4,3,'medium','Nhà số 5 ở BÊN PHẢI nhà số 3. Nhà số 3 ở đâu so với nhà số 5?',
    [{key:'A',text:'Bên phải nhà 5'},{key:'B',text:'Bên trái nhà 5'},{key:'C',text:'Sau nhà 5'}],'B','Nếu nhà 5 bên phải nhà 3 thì nhà 3 bên trái nhà 5.'),
  mc(137,4,4,'medium','Những vật nào có thể ở BÊN TRÁI một vật khác? (chọn tất cả đúng)',
    [{key:'A',text:'Chiếc ghế'},{key:'B',text:'Quyển sách'},{key:'C',text:'Con búp bê'},{key:'D',text:'Tất cả đều có thể'}],['D'],'Bất kỳ vật nào cũng có thể ở bên trái vật khác.'),
  mc(137,4,5,'medium','Các từ nào chỉ hướng trái-phải? (chọn tất cả đúng)',
    [{key:'A',text:'bên trái'},{key:'B',text:'phía trên'},{key:'C',text:'bên phải'},{key:'D',text:'phía dưới'}],['A','C']),
  mc(137,4,6,'medium','Bạn đang nhìn về phía trước. Những gì có thể ở bên phải bạn?',
    [{key:'A',text:'Bức tường bên phải'},{key:'B',text:'Cửa sổ bên phải'},{key:'C',text:'Ghế bên phải'},{key:'D',text:'Tất cả đều có thể'}],['D']),
  mt(137,4,7,'medium','Nối từ chỉ hướng với hình ảnh đúng:',
    [{key:'A',text:'Trên'},{key:'B',text:'Dưới'},{key:'C',text:'Trái'},{key:'D',text:'Phải'}],
    {A:'phía cao',B:'phía thấp',C:'bên này',D:'bên kia'}),
  mt(137,4,8,'medium','Nối mỗi câu với từ chỉ hướng phù hợp:',
    [{key:'P',text:'Chim bay... bầu trời'},{key:'Q',text:'Cá bơi... nước'},{key:'R',text:'Tay cầm bút... là tay phải'}],
    {P:'trên',Q:'dưới',R:'bên'}),
  dd(137,4,9,'medium','Kéo từ đúng vào chỗ trống: "Cái bàn ở ___ cái ghế" (ghế ở bên trái bàn)',
    [{key:'A',text:'bên trái'},{key:'B',text:'bên phải'},{key:'C',text:'phía trên'}],['B']),
  dd(137,4,10,'medium','Kéo từ đúng vào chỗ trống: "Bạn Nam đứng ___ bạn Lan" (Nam gần đầu hàng hơn)',
    [{key:'A',text:'trước'},{key:'B',text:'sau'},{key:'C',text:'dưới'}],['A']),

  // Ex5 medium: 2 table_fill, 2 number_line, 3 puzzle, 2 matching, 1 drag_drop
  tf2(137,5,1,'medium','Điền "trên" hoặc "dưới" vào bảng vị trí:',
    [{key:'r1c1',text:'Mây so với đất'},{key:'r2c1',text:'Rễ cây so với mặt đất'},{key:'r3c1',text:'Chim so với cây'}],
    {r1c1:'trên',r2c1:'dưới',r3c1:'trên'}),
  tf2(137,5,2,'medium','Điền "trái" hoặc "phải" vào bảng:',
    [{key:'r1c1',text:'Tay viết của người thuận phải'},{key:'r2c1',text:'Tay giơ chào của người thuận phải'},{key:'r3c1',text:'Tim nằm ở phía nào ngực?'}],
    {r1c1:'phải',r2c1:'phải',r3c1:'trái'}),
  nl(137,5,3,'medium','Đặt các từ chỉ vị trí lên thước: "trên" ở đầu, "dưới" ở cuối. "Giữa" ở đâu?',
    [{key:'start',text:'trên'},{key:'end',text:'dưới'},{key:'mid',text:'?'}],
    {mid:'giữa'}),
  nl(137,5,4,'medium','Trên đường thẳng nằm ngang: bên trái là điểm A, bên phải là điểm B. Điểm C ở giữa A và B. Điền vị trí của C so với A:',
    [{key:'posC',text:'Điểm C so với A'}],{posC:'bên phải'}),
  pz(137,5,5,'medium','Ghép mảnh: Vật nào ở TRÊN bàn? 🍎 trên bàn hay 🐕 dưới bàn?',
    [{key:'A',text:'🍎 trên bàn'},{key:'B',text:'🐕 dưới bàn'}],'A'),
  pz(137,5,6,'medium','Ghép mảnh: "Cái gương treo ___ tường" — từ nào đúng?',
    [{key:'A',text:'trên'},{key:'B',text:'dưới'},{key:'C',text:'sau'}],'A','Gương treo trên tường.'),
  pz(137,5,7,'medium','Ghép mảnh: Bạn đứng quay mặt về phía Bắc. Phía Đông ở bên nào của bạn?',
    [{key:'A',text:'Bên trái'},{key:'B',text:'Bên phải'},{key:'C',text:'Phía sau'}],'B','Quay mặt Bắc thì Đông ở bên phải.'),
  mt(137,5,8,'medium','Nối hành động với hướng:',
    [{key:'1',text:'Leo lên cầu thang'},{key:'2',text:'Đi xuống dốc'},{key:'3',text:'Rẽ sang bên phải'}],
    {'1':'trên','2':'dưới','3':'phải'}),
  mt(137,5,9,'medium','Nối câu hỏi với câu trả lời đúng:',
    [{key:'X',text:'Mặt trăng ở đâu so với chúng ta?'},{key:'Y',text:'Giun đất sống ở đâu?'},{key:'Z',text:'Cờ treo trên đỉnh cột nghĩa là?'}],
    {X:'phía trên',Y:'phía dưới đất',Z:'ở vị trí cao nhất'}),
  dd(137,5,10,'medium','Kéo đúng từ: "Đứng ___ hàng" nghĩa là đứng ở đầu, gần phía trước nhất.',
    [{key:'A',text:'trước'},{key:'B',text:'sau'},{key:'C',text:'giữa'}],['A']),

  // Ex6 hard: 3 fill_blank, 3 puzzle, 2 multiple_choice, 2 sorting
  fb(137,6,1,'hard','Bạn đứng quay mặt về phía Nam. Tay [b1] của bạn chỉ về phía Đông.',
    [{key:'b1',text:''}],{b1:'trái'},'Quay mặt Nam: Đông ở bên trái, Tây ở bên phải.'),
  fb(137,6,2,'hard','Con kiến bò TỪ dưới đất LÊN cây. Con kiến đang di chuyển về hướng [b1].',
    [{key:'b1',text:''}],{b1:'trên'}),
  fb(137,6,3,'hard','Trong tranh: nhà ở [b1] đường, cây ở [b2] nhà.',
    [{key:'b1',text:''},{key:'b2',text:''}],{b1:'bên phải',b2:'trước'},'Mô tả theo tranh chuẩn.'),
  pz(137,6,4,'hard','Câu đố: Tôi không ở trên, không ở dưới, không ở trái, không ở phải. Tôi ở đâu?',
    [{key:'A',text:'Ở giữa'},{key:'B',text:'Ở trong'},{key:'C',text:'Ở ngoài'}],'A'),
  pz(137,6,5,'hard','Bạn đứng trong phòng nhìn ra cửa sổ. Cửa sổ ở phía TRƯỚC bạn. Bức tường sau lưng bạn ở phía nào?',
    [{key:'A',text:'Trước'},{key:'B',text:'Sau'},{key:'C',text:'Trái'}],'B'),
  pz(137,6,6,'hard','Xếp 3 hộp lên kệ 3 tầng. Hộp đỏ ở tầng cao nhất, hộp xanh ở tầng thấp nhất. Hộp vàng ở đâu?',
    [{key:'A',text:'Trên hộp đỏ'},{key:'B',text:'Giữa hộp đỏ và hộp xanh'},{key:'C',text:'Dưới hộp xanh'}],'B'),
  mc(137,6,7,'hard','Những câu nào đúng về vị trí? (chọn tất cả đúng)',
    [{key:'A',text:'Trên và dưới là hai hướng ngược nhau'},{key:'B',text:'Trái và phải là hai hướng ngược nhau'},{key:'C',text:'Trước và sau là hai hướng ngược nhau'},{key:'D',text:'Tất cả đều đúng'}],['D']),
  mc(137,6,8,'hard','Bạn đứng quay mặt về phía trước. Những phát biểu nào đúng? (chọn tất cả đúng)',
    [{key:'A',text:'Phía sau lưng bạn là hướng sau'},{key:'B',text:'Tay phải bạn chỉ về phía phải'},{key:'C',text:'Phía trên đầu bạn là hướng trên'},{key:'D',text:'Tất cả đều đúng'}],['D']),
  so(137,6,9,'hard','Sắp xếp các vị trí theo thứ tự từ cao nhất đến thấp nhất: mặt đất, tầng 2, mái nhà, hầm',
    [{key:'A',text:'mặt đất'},{key:'B',text:'tầng 2'},{key:'C',text:'mái nhà'},{key:'D',text:'hầm'}],['C','B','A','D']),
  so(137,6,10,'hard','Sắp xếp theo thứ tự từ trước ra sau trong cảnh: cổng trường, sân trường, cửa lớp, bảng lớp',
    [{key:'A',text:'cổng trường'},{key:'B',text:'sân trường'},{key:'C',text:'cửa lớp'},{key:'D',text:'bảng lớp'}],['A','B','C','D']),

  // Ex7 hard: 2 game, 3 matching, 3 fill_blank, 2 drag_drop
  gm(137,7,1,'hard','Trò chơi ghép cặp: Nối từ trái nghĩa với nhau',
    [{key:'trên',text:'trên'},{key:'dưới',text:'dưới'},{key:'trái',text:'trái'},{key:'phải',text:'phải'},{key:'trước',text:'trước'},{key:'sau',text:'sau'},{key:'trong',text:'trong'},{key:'ngoài',text:'ngoài'}]),
  gm(137,7,2,'hard','Trò chơi: Ghép câu với hình ảnh đúng về vị trí đồ vật',
    [{key:'A',text:'Mèo trên bàn'},{key:'B',text:'Chó dưới gầm'},{key:'C',text:'Sách bên trái'},{key:'D',text:'Bút bên phải'}]),
  mt(137,7,3,'hard','Nối từ chỉ hướng với hoạt động phù hợp:',
    [{key:'1',text:'Nhảy lên'},{key:'2',text:'Ngồi xuống'},{key:'3',text:'Rẽ trái'},{key:'4',text:'Rẽ phải'}],
    {'1':'trên','2':'dưới','3':'trái','4':'phải'}),
  mt(137,7,4,'hard','Nối mô tả với từ chỉ hướng:',
    [{key:'P',text:'Phía bạn đang nhìn'},{key:'Q',text:'Phía sau lưng bạn'},{key:'R',text:'Phía tay cầm bút của người thuận tay phải'}],
    {P:'trước',Q:'sau',R:'phải'}),
  mt(137,7,5,'hard','Nối câu với vị trí đúng:',
    [{key:'X',text:'Cá sống trong ao'},{key:'Y',text:'Chim bay ngoài trời'},{key:'Z',text:'Mèo núp trong hộp'}],
    {X:'trong',Y:'ngoài',Z:'trong'}),
  fb(137,7,6,'hard','Bạn đứng [b1] cổng trường nghĩa là bạn chưa vào bên trong.',
    [{key:'b1',text:''}],{b1:'ngoài'}),
  fb(137,7,7,'hard','Chú cá đang bơi [b1] bể nước, không ra ngoài.',
    [{key:'b1',text:''}],{b1:'trong'}),
  fb(137,7,8,'hard','Khi đi từ trong nhà ra sân, bạn đi từ [b1] ra [b2].',
    [{key:'b1',text:''},{key:'b2',text:''}],{b1:'trong',b2:'ngoài'}),
  dd(137,7,9,'hard','Kéo từ đúng: "Con chim đang ở ___ lồng" (chim không bay ra ngoài được)',
    [{key:'A',text:'trong'},{key:'B',text:'ngoài'},{key:'C',text:'trên'}],['A']),
  dd(137,7,10,'hard','Kéo từ đúng: "Bạn đứng ___ nhà" nghĩa là bạn đang ở sân, chưa vào nhà.',
    [{key:'A',text:'trong'},{key:'B',text:'ngoài'},{key:'C',text:'trên'}],['B']),

  // Ex8 hard: 3 multiple_choice, 3 puzzle, 2 sorting, 2 cross_out
  mc(137,8,1,'hard','Những câu nào dùng đúng từ "trong"? (chọn tất cả đúng)',
    [{key:'A',text:'Cá bơi trong nước'},{key:'B',text:'Chim bay trong lồng'},{key:'C',text:'Sách để trong tủ'},{key:'D',text:'Mây trôi trong bầu trời'}],['A','B','C','D']),
  mc(137,8,2,'hard','Những phát biểu nào SAI về hướng không gian? (chọn tất cả sai)',
    [{key:'A',text:'Trên và trái là hai hướng đối nhau'},{key:'B',text:'Trong và ngoài là hai hướng đối nhau'},{key:'C',text:'Trước và phải là hai hướng đối nhau'},{key:'D',text:'Sau và dưới là hai hướng đối nhau'}],['A','C','D']),
  mc(137,8,3,'hard','Bạn đứng trong phòng. Những câu nào đúng? (chọn tất cả đúng)',
    [{key:'A',text:'Phòng ở ngoài bạn'},{key:'B',text:'Bạn ở trong phòng'},{key:'C',text:'Cửa phòng ở trước mặt bạn (nếu bạn nhìn ra cửa)'},{key:'D',text:'Tất cả đều có thể đúng'}],['B','C']),
  pz(137,8,4,'hard','Câu đố: Tôi có thể ở trên, dưới, trái, phải, trước, sau, trong, ngoài cùng một lúc không?',
    [{key:'A',text:'Có, nếu nhìn từ nhiều hướng khác nhau'},{key:'B',text:'Không, một vật chỉ ở một vị trí'},{key:'C',text:'Có, vị trí là tương đối'}],'C','Vị trí mang tính tương đối so với vật mốc.'),
  pz(137,8,5,'hard','Bạn và bạn thân đứng đối mặt nhau. Tay phải của bạn ở phía nào của bạn thân?',
    [{key:'A',text:'Bên phải bạn thân'},{key:'B',text:'Bên trái bạn thân'},{key:'C',text:'Phía trước bạn thân'}],'B','Khi đối mặt, trái-phải bị đảo ngược.'),
  pz(137,8,6,'hard','Hộp A ở trong hộp B, hộp B ở trong hộp C. Hộp A ở đâu so với hộp C?',
    [{key:'A',text:'Ngoài hộp C'},{key:'B',text:'Trong hộp C'},{key:'C',text:'Bên cạnh hộp C'}],'B','A trong B, B trong C nên A cũng trong C.'),
  so(137,8,7,'hard','Sắp xếp từ "trong nhất" đến "ngoài nhất": phòng ngủ, ngôi nhà, khu phố, thành phố',
    [{key:'A',text:'phòng ngủ'},{key:'B',text:'ngôi nhà'},{key:'C',text:'khu phố'},{key:'D',text:'thành phố'}],['A','B','C','D']),
  so(137,8,8,'hard','Sắp xếp theo thứ tự từ trong ra ngoài: nhân quả, vỏ quả, lớp cùi, hạt',
    [{key:'A',text:'nhân quả'},{key:'B',text:'vỏ quả'},{key:'C',text:'lớp cùi'},{key:'D',text:'hạt'}],['A','D','C','B']),
  co(137,8,9,'hard','Gạch bỏ câu dùng SAI từ chỉ hướng:',
    [{key:'A',text:'Cá bơi trong nước'},{key:'B',text:'Chim bay dưới bầu trời'},{key:'C',text:'Mèo ngồi ngoài nhà khi trời mưa'},{key:'D',text:'Sách để trên kệ'}],['B'],'Chim bay TRÊN bầu trời, không phải dưới.'),
  co(137,8,10,'hard','Gạch bỏ câu mô tả SAI vị trí:',
    [{key:'A',text:'Rễ cây mọc dưới đất'},{key:'B',text:'Đèn trần treo dưới sàn nhà'},{key:'C',text:'Cá sống trong nước'},{key:'D',text:'Bướm bay ngoài vườn'}],['B'],'Đèn trần treo TRÊN đầu, không phải dưới sàn.'),
];

async function main() {
  await ds.initialize();
  await ds.query('DELETE FROM quizzes WHERE lessonId = 137');
  const sql = `INSERT INTO quizzes (lessonId,exerciseNumber,questionType,questionText,optionsJson,correctAnswerJson,difficultyLevel,explanation,points,sortOrder,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`;
  for (const row of L137) {
    await ds.query(sql, row);
  }
  console.log(`✅ 137: ${L137.length} questions`);
  await ds.destroy();
}

main().catch(e => { console.error(e); process.exit(1); });
