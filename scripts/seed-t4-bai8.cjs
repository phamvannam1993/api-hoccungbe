require('dotenv').config();
const mysql = require('mysql2/promise');
const L = ['A','B','C','D'];
function sc(q, opts, correct, ex, explanation='') { return { q, qt:'single_choice', opt: opts.map((t,i)=>({key:L[i], text:String(t)})), correct, explanation, ex }; }
const DIFF = { 1:'easy', 2:'medium', 3:'hard' };
const G = ['Góc nhọn','Góc vuông','Góc tù','Góc bẹt'];

const DATA = {
  1: [
    sc('Góc có số đo bé hơn 90° là:', G, 'A'),
    sc('Góc có số đo bằng 90° là:', G, 'B'),
    sc('Góc có số đo lớn hơn 90° nhưng bé hơn 180° là:', G, 'C'),
    sc('Góc có số đo bằng 180° là:', G, 'D'),
    sc('Góc có số đo 45° là:', G, 'A'),
    sc('Góc có số đo 90° là:', G, 'B'),
    sc('Góc có số đo 120° là:', G, 'C'),
    sc('Góc có số đo 180° là:', G, 'D'),
    sc('Trong các góc sau, góc nào là góc nhọn?', ['Góc 35°','Góc 90°','Góc 135°','Góc 180°'], 'A'),
    sc('Trong các góc sau, góc nào là góc tù?', ['Góc 60°','Góc 89°','Góc 100°','Góc 180°'], 'C'),
  ],
  2: [
    sc('Góc 89° là:', G, 'A'),
    sc('Góc 91° là:', G, 'C'),
    sc('Góc 179° là:', G, 'C'),
    sc('Dãy nào dưới đây gồm toàn các góc nhọn?', ['25°; 60°; 85°','30°; 90°; 120°','95°; 110°; 150°','45°; 100°; 180°'], 'A'),
    sc('Dãy nào dưới đây gồm toàn các góc tù?', ['20°; 45°; 80°','90°; 100°; 110°','95°; 125°; 170°','120°; 150°; 180°'], 'C'),
    sc('Một góc lớn hơn góc vuông 25°. Góc đó có số đo là:', ['65°','90°','105°','115°'], 'D', '90° + 25° = 115°. Đây là góc tù.'),
    sc('Một góc bé hơn góc vuông 30°. Góc đó có số đo là:', ['30°','60°','90°','120°'], 'B', '90° − 30° = 60°. Đây là góc nhọn.'),
    sc('Khi đồng hồ chỉ đúng 1 giờ, góc nhỏ hơn tạo bởi kim giờ và kim phút là:', G, 'A', 'Góc nhỏ hơn tạo bởi hai kim có số đo 30°.'),
    sc('Khi đồng hồ chỉ đúng 3 giờ, góc nhỏ hơn tạo bởi kim giờ và kim phút là:', G, 'B', 'Góc nhỏ hơn tạo bởi hai kim có số đo 90°.'),
    sc('Khi đồng hồ chỉ đúng 5 giờ, góc nhỏ hơn tạo bởi kim giờ và kim phút là:', G, 'C', 'Góc nhỏ hơn tạo bởi hai kim có số đo 150°.'),
  ],
  3: [
    sc('Khi đồng hồ chỉ đúng 6 giờ, hai kim đồng hồ tạo thành:', G, 'D', 'Hai kim đồng hồ tạo thành góc 180°.'),
    sc('Khi đồng hồ chỉ đúng 8 giờ, góc nhỏ hơn tạo bởi hai kim là:', G, 'C', 'Góc nhỏ hơn tạo bởi hai kim có số đo 120°.'),
    sc('Một góc nhọn có số đo là một số tròn chục, lớn hơn 50° và bé hơn 70°. Góc đó có số đo là:', ['50°','60°','70°','80°'], 'B'),
    sc('Một góc tù có số đo là một số tròn chục, lớn hơn 130° và bé hơn 150°. Góc đó có số đo là:', ['120°','130°','140°','150°'], 'C'),
    sc('Góc A có số đo 55°. Góc B lớn hơn góc A 50°. Góc B là:', G, 'C', '55° + 50° = 105°. Góc 105° là góc tù.'),
    sc('Góc M có số đo 150°. Góc N bé hơn góc M 70°. Góc N là:', G, 'A', '150° − 70° = 80°. Góc 80° là góc nhọn.'),
    sc('Một góc bẹt được chia thành hai góc. Góc thứ nhất có số đo 70°. Góc thứ hai là:', G, 'C', '180° − 70° = 110°. Góc 110° là góc tù.'),
    sc('Một góc bẹt được chia thành hai góc bằng nhau. Mỗi góc là:', G, 'B', '180° : 2 = 90°.'),
    sc('Có bốn góc với số đo lần lượt là 40°, 90°, 135°, 180°. Thứ tự tên các góc tương ứng là:', ['Góc nhọn, góc vuông, góc tù, góc bẹt','Góc vuông, góc nhọn, góc tù, góc bẹt','Góc nhọn, góc tù, góc vuông, góc bẹt','Góc tù, góc vuông, góc nhọn, góc bẹt'], 'A'),
    sc('Rô-bốt đang nhìn thẳng về phía trước. Rô-bốt quay sang phải 90°, sau đó tiếp tục quay sang phải thêm 90°. Tổng góc quay của rô-bốt là:', G, 'D', '90° + 90° = 180°. Góc 180° là góc bẹt.'),
  ],
};

(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT||3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  const [[l]] = await c.query("SELECT id, title, slug FROM lessons WHERE slug='bai-8-goc-nhon-goc-tu-goc-bet'");
  if (!l) { console.log('❌ Không tìm thấy bài'); process.exit(1); }
  console.log('Bài:', 'L'+l.id, '|', l.slug, '|', l.title);
  for (const ex of Object.keys(DATA)) if (DATA[ex].length !== 10) { console.log(`❌ ex${ex}=${DATA[ex].length}`); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query("UPDATE quizzes SET isActive=0 WHERE lessonId=? AND isActive=1", [l.id]);
    console.log('Ẩn câu cũ:', del.affectedRows);
    let ins = 0;
    for (const ex of [1,2,3]) {
      for (let i = 0; i < DATA[ex].length; i++) {
        const it = DATA[ex][i];
        await c.query("INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, explanation, exerciseNumber, sortOrder, isActive) VALUES (?,?,?,?,?,?,?,?,?,1)",
          [l.id, it.q, it.qt, DIFF[ex], JSON.stringify(it.opt), JSON.stringify(it.correct), it.explanation || null, ex, i+1]);
        ins++;
      }
    }
    console.log('Chèn câu mới:', ins);
    await c.commit();
    const [chk] = await c.query("SELECT exerciseNumber ex, difficultyLevel d, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY ex,d ORDER BY ex", [l.id]);
    console.log('Sau:'); chk.forEach(r=>console.log(`  ex${r.ex} ${r.d}: ${r.n}`));
  } catch (e) { await c.rollback(); console.log('❌ rollback:', e.message); process.exit(1); }
  await c.end(); process.exit(0);
})().catch(e=>{console.log('ERR:',e.message);process.exit(1)});
