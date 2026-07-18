import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });

// content viết tay theo chương trình Toán lớp 1 — mỗi bài một nội dung riêng, chính xác.
const CONTENT: Record<number,string> = {
  123: 'Bé nhận biết, đọc và viết các số từ 0 đến 5; đếm và nối mỗi số với đúng số lượng đồ vật.',
  124: 'Bé nhận biết, đọc và viết các số từ 6 đến 10; đếm số lượng và so sánh các nhóm đồ vật quen thuộc.',
  125: 'Bé ghép cặp để so sánh hai nhóm đồ vật, nhận ra nhóm nào nhiều hơn, ít hơn hay bằng nhau.',
  126: 'Bé so sánh các số trong phạm vi 10 và dùng các dấu lớn hơn, bé hơn, bằng (>, <, =).',
  127: 'Bé tách và gộp một số thành hai phần, làm quen cấu tạo số để chuẩn bị học phép cộng, phép trừ.',
  128: 'Bé ôn luyện đọc, viết, đếm và so sánh các số đã học qua nhiều bài tập tổng hợp.',
  129: 'Bé nhận biết và gọi tên hình vuông, hình tròn, hình tam giác, hình chữ nhật qua đồ vật xung quanh.',
  130: 'Bé dùng các hình đã học để lắp ghép, xếp thành hình mới, phát triển tư duy hình học và sự khéo léo.',
  131: 'Bé ôn tập nhận dạng hình và xếp ghép hình qua các bài tập thực hành thú vị.',
  132: 'Bé làm quen phép cộng và tính kết quả các phép cộng trong phạm vi 10 bằng hình ảnh, đồ vật.',
  133: 'Bé làm quen phép trừ và tính kết quả các phép trừ trong phạm vi 10 qua ví dụ trực quan.',
  134: 'Bé ghi nhớ bảng cộng và bảng trừ trong phạm vi 10, tập tính nhẩm nhanh và chính xác hơn.',
  135: 'Bé luyện tập cộng, trừ trong phạm vi 10 và giải các bài toán đơn giản.',
  136: 'Bé nhận biết và gọi tên khối lập phương, khối hộp chữ nhật qua các vật thật quen thuộc.',
  137: 'Bé xác định vị trí trên – dưới, trước – sau, phải – trái của đồ vật trong không gian.',
  138: 'Bé ôn tập nhận dạng khối và xác định vị trí, phương hướng qua bài tập tổng hợp.',
  139: 'Bé ôn lại cách đọc, viết, đếm, so sánh và sắp thứ tự các số trong phạm vi 10.',
  140: 'Bé ôn tập phép cộng và phép trừ trong phạm vi 10, củng cố kỹ năng tính nhẩm.',
  141: 'Bé ôn tập nhận dạng các hình phẳng, hình khối và vị trí trong không gian đã học.',
  142: 'Bé tổng hợp kiến thức về số, phép tính và hình học qua các bài luyện tập.',
  143: 'Bé nhận biết, đọc và viết các số có hai chữ số trong phạm vi 100, hiểu hàng chục và hàng đơn vị.',
  144: 'Bé so sánh các số có hai chữ số dựa vào hàng chục và hàng đơn vị, dùng dấu >, <, =.',
  145: 'Bé làm quen bảng các số từ 1 đến 100, nhận ra quy luật và thứ tự các số.',
  146: 'Bé ôn luyện đọc, viết và so sánh các số trong phạm vi 100.',
  147: 'Bé so sánh độ dài của hai vật, nhận ra vật nào dài hơn, vật nào ngắn hơn.',
  148: 'Bé làm quen đơn vị đo độ dài xăng-ti-mét (cm) và cách đo độ dài đồ vật bằng thước.',
  149: 'Bé tập ước lượng rồi dùng thước đo độ dài các đồ vật quen thuộc và so sánh kết quả.',
  150: 'Bé ôn tập so sánh độ dài và đo độ dài qua các bài tập thực hành.',
  151: 'Bé thực hiện phép cộng số có hai chữ số với số có một chữ số trong phạm vi 100.',
  152: 'Bé đặt tính và cộng hai số có hai chữ số trong phạm vi 100.',
  153: 'Bé thực hiện phép trừ số có hai chữ số cho số có một chữ số trong phạm vi 100.',
  154: 'Bé đặt tính và trừ hai số có hai chữ số trong phạm vi 100.',
  155: 'Bé luyện tập cộng, trừ các số trong phạm vi 100 và giải toán có lời văn đơn giản.',
  156: 'Bé tập xem giờ đúng trên đồng hồ kim, đọc được mấy giờ trong ngày.',
  157: 'Bé nhận biết bảy ngày trong tuần và thứ tự các ngày, gắn với hoạt động hằng ngày.',
  158: 'Bé thực hành xem lịch, xem giờ đúng và gắn với các việc quen thuộc trong ngày.',
  159: 'Bé ôn tập xem giờ, xem lịch và các ngày trong tuần qua bài tập thực tế.',
  160: 'Bé ôn tập tổng hợp về số và phép cộng, phép trừ trong phạm vi 10.',
  161: 'Bé ôn tập đọc, viết, so sánh số và cộng, trừ trong phạm vi 100.',
  162: 'Bé tổng ôn toàn bộ kiến thức Toán lớp 1: số, phép tính, hình học, đo lường và thời gian.',
};

const dot = (s:string) => s.replace(/\s+/g,' ').trim().replace(/[.。]+$/,'') + '.';
const pick = (n:number, arr:string[]) => arr[((n%arr.length)+arr.length)%arr.length];

function seoFor(id:number, title:string, content:string):string {
  const isRev = /ôn tập|luyện tập/i.test(title);
  const lead = dot(content);
  const skill = isRev
    ? 'Bài ôn tập Toán lớp 1 giúp bé hệ thống và củng cố các dạng bài đã học, thành thạo hơn khi làm bài.'
    : pick(id, [
        'Bài học Toán lớp 1 giúp bé hiểu bản chất, luyện tính nhanh và vận dụng vào các bài toán thực tế.',
        'Bé rèn tư duy và thực hành nhiều dạng bài từ dễ đến khó để nắm chắc kiến thức.',
        'Qua ví dụ trực quan và bài tập tương tác, bé làm quen và ghi nhớ kiến thức toán một cách nhẹ nhàng.',
      ]);
  const tail = pick(id+1, [
    'Bài tập tương tác gồm trắc nghiệm, đếm hình, nối và sắp xếp, có phản hồi ngay cùng phần ôn lại câu sai.',
    'Bé vừa học vừa chơi với bài tập đa dạng, xem đáp án kèm giải thích sau mỗi câu và học lại miễn phí nhiều lần.',
    'Các dạng bài phong phú kèm giải thích chi tiết giúp bé tự tin, nắm chắc kiến thức và nhớ lâu hơn.',
  ]);
  return `${lead} ${skill} ${tail}`;
}

async function main(){
  await ds.initialize();
  const rows:any[] = await ds.query(`SELECT id,title FROM lessons WHERE courseId=1 ORDER BY sortOrder`);
  let n=0, miss=0;
  for(const r of rows){
    const content = CONTENT[r.id];
    if(!content){ console.log('THIẾU map cho', r.id, r.title); miss++; continue; }
    const seo = seoFor(r.id, r.title, content);
    await ds.query('UPDATE lessons SET content=?, seoDescription=? WHERE id=?', [content, seo, r.id]);
    n++;
    if(n<=2) console.log(`  [${r.id}] ${r.title}\n     content: ${content}\n     seo: ${seo}`);
  }
  console.log(`HOÀN TẤT ✅ cập nhật ${n} bài | thiếu map: ${miss}`);
  await ds.destroy();
}
main().catch(e=>{console.error('LỖI:',e);process.exit(1);});
