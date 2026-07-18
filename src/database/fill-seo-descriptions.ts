import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });

const dot = (s:string) => s.replace(/\s+/g,' ').trim().replace(/[.。]+$/,'') + '.';
const pick = (n:number, arr:string[]) => arr[((n%arr.length)+arr.length)%arr.length];
const gradeOf = (course:string) => (/(lớp\s*\d+)/i.exec(course||'')?.[1] || '').toLowerCase();

function gen(l:any):string {
  const title = String(l.title||'').trim();
  const content = String(l.content||'').trim();
  const ct = l.courseType;
  const grade = gradeOf(l.course);
  const isRevision = /ôn tập|ôn lại/i.test(title);
  const lead = content ? dot(content) : `Cùng bé học bài "${title}" tại Bé Hay Học.`;

  let skill:string;
  if (ct === 'english') {
    skill = isRevision
      ? `Bài ôn tập Tiếng Anh ${grade} giúp bé hệ thống lại từ vựng và mẫu câu đã học, ghi nhớ và tự tin sử dụng.`
      : pick(l.id, [
          `Bài học Tiếng Anh ${grade} giúp bé làm quen từ vựng và mẫu câu quen thuộc, luyện nghe – nói cơ bản với phát âm chuẩn.`,
          `Qua trò chơi tương tác, bé ghi nhớ từ mới, tập nói những câu tiếng Anh đầu tiên một cách tự nhiên và vui vẻ.`,
          `Bé vừa nghe vừa nói theo, mở rộng vốn từ tiếng Anh và làm quen cách giao tiếp đơn giản hằng ngày.`,
        ]);
  } else if (ct === 'math') {
    skill = isRevision
      ? `Bài ôn tập Toán ${grade} giúp bé củng cố và hệ thống các dạng toán đã học, thành thạo hơn khi làm bài.`
      : pick(l.id, [
          `Bài học Toán ${grade} giúp bé hiểu bản chất, luyện tính nhanh và vận dụng vào các bài toán thực tế.`,
          `Bé rèn tư duy, thực hành nhiều dạng bài từ dễ đến khó để nắm chắc kiến thức toán học.`,
          `Qua ví dụ trực quan và bài tập tương tác, bé làm quen và ghi nhớ kiến thức toán một cách nhẹ nhàng.`,
        ]);
  } else { // language (Tiếng Việt)
    skill = isRevision
      ? `Bài ôn tập Tiếng Việt ${grade} giúp bé hệ thống, củng cố kiến thức và ghi nhớ những gì đã học.`
      : pick(l.id, [
          `Bài học Tiếng Việt ${grade} giúp bé luyện đọc hiểu, mở rộng vốn từ và cảm nhận nội dung bài đọc.`,
          `Bé rèn kĩ năng đọc – hiểu, trả lời câu hỏi và diễn đạt ý qua nhiều dạng bài tập phong phú.`,
          `Bé đọc kĩ bài, nắm ý chính và luyện dùng từ đặt câu một cách tự nhiên, mạch lạc.`,
        ]);
  }

  const tail = pick(l.id+1, [
    `Bài tập tương tác gồm trắc nghiệm, điền chỗ trống, nối từ và sắp xếp câu, có phản hồi ngay cùng phần ôn lại câu sai.`,
    `Bé vừa học vừa chơi với bài tập đa dạng, xem đáp án kèm giải thích sau mỗi câu và học lại miễn phí nhiều lần.`,
    `Các dạng bài phong phú kèm giải thích chi tiết giúp bé tự tin, nắm chắc kiến thức và nhớ lâu hơn.`,
  ]);

  return `${lead} ${skill} ${tail}`;
}

async function main(){
  await ds.initialize();
  const rows:any[] = await ds.query(`
    SELECT l.id,l.title,l.content,c.title course,c.courseType
    FROM lessons l JOIN courses c ON c.id=l.courseId
    WHERE (l.seoDescription IS NULL OR l.seoDescription='') AND l.content IS NOT NULL AND l.content<>''
    ORDER BY l.courseId,l.sortOrder`);
  console.log(`Bài thiếu seoDescription (có content): ${rows.length}`);
  let n=0;
  for(const r of rows){
    const s = gen(r);
    await ds.query('UPDATE lessons SET seoDescription=? WHERE id=?', [s, r.id]);
    n++;
    if(n<=3 || n%40===0) console.log(`  [${r.id}] ${r.title}\n     → ${s}`);
  }
  console.log(`HOÀN TẤT ✅ cập nhật ${n} bài`);
  await ds.destroy();
}
main().catch(e=>{console.error('LỖI:',e);process.exit(1);});
