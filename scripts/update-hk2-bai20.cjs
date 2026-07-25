require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 3%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng nào dưới đây chứa vần yêm?', ['yếm', 'tiếng', 'reng', 'xoay'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây chứa vần iêng?', ['quý', 'tiếng', 'yếm', 'hoáy'], 'B', 'easy', 1, 2),
  sc('Tiếng nào dưới đây chứa vần eng?', ['riêng', 'xoay', 'reng', 'thủy'], 'C', 'easy', 1, 3),
  sc('Tiếng nào dưới đây chứa vần uy?', ['quý', 'tiếng', 'xẻng', 'yếm'], 'A', 'easy', 1, 4),
  sc('Tiếng nào dưới đây chứa vần oay?', ['trường', 'xoay', 'bảng', 'lớp'], 'B', 'easy', 1, 5),
  sc('Từ ngữ nào dưới đây nói về người làm việc trong trường học?', ['Cô giáo', 'Bác sĩ', 'Người bán hàng', 'Tài xế'], 'A', 'easy', 1, 6),
  sc('Đồ dùng nào thường được học sinh mang đến trường?', ['Vở', 'Nồi cơm', 'Cái chảo', 'Gối ngủ'], 'A', 'easy', 1, 7),
  sc('Vật nào thường được dùng để viết bài?', ['Bút', 'Búp bê', 'Quả bóng', 'Đèn giao thông'], 'A', 'easy', 1, 8),
  sc('Nơi học sinh ngồi học cùng thầy cô được gọi là gì?', ['Lớp học', 'Vườn bách thú', 'Siêu thị', 'Bến xe'], 'A', 'easy', 1, 9),
  sc('Hai cuốn sách được giới thiệu ở phần Đọc mở rộng là gì?', ['Lớp học của mèo con và Sóc nâu đi học', 'Tích Chu và Cây khế', 'Thỏ và rùa và Sọ Dừa', 'Dế Mèn và Tấm Cám'], 'A', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần yêm – iêng – eng – uy – oay?', ['yếm – tiếng – reng – quý – xoay', 'tiếng – yếm – quý – reng – xoay', 'xoay – reng – tiếng – yếm – quý', 'quý – xoay – yếm – tiếng – reng'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn những từ ngữ về trường học?', ['Cô giáo, sách, lớp học, bảng', 'Búp bê, vườn bách thú, đèn giao thông', 'Nồi cơm, chảo, bát, đũa', 'Bệnh viện, bác sĩ, thuốc'], 'A', 'medium', 2, 2),
  sc('Từ ngữ nào dưới đây không thuộc nhóm từ về trường học?', ['Hiệu trưởng', 'Thầy giáo', 'Búp bê', 'Bảng'], 'C', 'medium', 2, 3),
  sc('Người quản lí, điều hành các hoạt động của một trường được gọi là gì?', ['Hiệu trưởng', 'Lớp trưởng', 'Bác bảo vệ', 'Học sinh'], 'A', 'medium', 2, 4),
  sc('Đồ vật nào thường được thầy cô dùng để viết nội dung bài học?', ['Bảng', 'Búp bê', 'Đèn giao thông', 'Chiếc nồi'], 'A', 'medium', 2, 5),
  sc('Câu nào nói đúng về hoạt động của học sinh trong lớp?', ['Học sinh nghe giảng và làm bài.', 'Học sinh điều khiển giao thông.', 'Học sinh bán hàng ngoài chợ.', 'Học sinh khám bệnh cho mọi người.'], 'A', 'medium', 2, 6),
  sc('Hoạt động nào thường diễn ra trong giờ ra chơi?', ['Nhảy dây, đá cầu và trò chuyện với bạn', 'Ngủ trên bàn cả buổi', 'Chạy ra ngoài cổng trường', 'Tự ý bỏ học về nhà'], 'A', 'medium', 2, 7),
  sc('Khi nghe tiếng trống báo vào lớp, học sinh nên làm gì?', ['Xếp hàng và nhanh chóng vào lớp', 'Tiếp tục chạy chơi', 'Đi ra khỏi trường', 'Trốn sau gốc cây'], 'A', 'medium', 2, 8),
  sc('Câu nào có tiếng chứa vần oay?', ['Bạn nhỏ loay hoay tìm quyển vở.', 'Cô giáo giảng bài rất hay.', 'Sân trường có nhiều cây xanh.', 'Các bạn đang đọc sách.'], 'A', 'medium', 2, 9, '"hoay" trong "loay hoay" có vần "oay".'),
  sc('Câu nào có tiếng chứa vần eng?', ['Chuông điện kêu reng reng.', 'Bạn nhỏ âu yếm em bé.', 'Các bạn nói chuyện vui vẻ.', 'Cây bàng tỏa bóng mát.'], 'A', 'medium', 2, 10, '"reng" có vần "eng".'),
  sc('Trong câu "Cô giáo âu yếm nhìn các bạn học sinh", tiếng nào chứa vần yêm?', ['giáo', 'yếm', 'nhìn', 'sinh'], 'B', 'hard', 3, 1, '"yếm" có vần "yêm".'),
  sc('Trong câu "Tiếng chuông điện kêu reng reng", có bao nhiêu tiếng chứa các vần iêng hoặc eng?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'B', 'hard', 3, 2, 'tiếng (iêng); reng, reng (eng).'),
  sc('Câu nào có đủ các vần yêm, iêng, eng?', ['Cô giáo âu yếm nghe tiếng chuông reng reng.', 'Các bạn đang vui chơi ngoài sân.', 'Cây bàng đứng bên cửa lớp.', 'Học sinh nhanh chóng xếp hàng.'], 'A', 'hard', 3, 3, 'yếm (yêm), tiếng (iêng), reng (eng).'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['yếm – vần yêm', 'tiếng – vần iêng', 'reng – vần eng', 'xoay – vần uy'], 'D', 'hard', 3, 4, 'Tiếng "xoay" chứa vần "oay", không phải vần "uy".'),
  sc('Dãy nào gồm toàn những đồ dùng học tập?', ['Sách, vở, bút', 'Bảng, hiệu trưởng, thầy giáo', 'Búp bê, quả bóng, ô tô', 'Vườn bách thú, đèn giao thông, công viên'], 'A', 'hard', 3, 5),
  sc('Thứ tự nào phù hợp với một ngày học ở trường?', ['Đến trường → vào lớp học → ra chơi → tiếp tục học → ra về', 'Ra về → đến trường → ngủ → ra chơi', 'Ra chơi → về nhà → đến trường → học bài', 'Đi chợ → đến trường → đi công viên'], 'A', 'hard', 3, 6),
  sc('Việc làm nào thể hiện học sinh có ý thức giữ gìn trường lớp?', ['Bỏ rác đúng nơi, giữ bàn ghế sạch và chăm sóc cây xanh', 'Vẽ lên bàn ghế', 'Bẻ cành cây trong sân', 'Vứt giấy xuống nền lớp'], 'A', 'hard', 3, 7),
  sc('Câu nào phù hợp nhất để viết về ngôi trường?', ['Trường em có nhiều cây xanh và sân chơi rộng rãi.', 'Trường em bán rất nhiều rau, thịt và cá.', 'Trường em có nhiều tàu thuyền ra khơi.', 'Trường em là nơi khám bệnh cho mọi người.'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: em / rất yêu / ngôi trường / của mình',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'em' },
      { key: '2', text: 'rất yêu' },
      { key: '3', text: 'ngôi trường' },
      { key: '4', text: 'của mình' },
    ],
    correctAnswerJson: ['1', '2', '3', '4'], // Em rất yêu ngôi trường của mình
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Em rất yêu ngôi trường của mình".',
  },
  sc('Bài học phù hợp nhất sau chủ đề Mái trường mến yêu là gì?', ['Học sinh cần yêu quý thầy cô, đoàn kết với bạn và giữ gìn trường lớp', 'Chỉ cần học giỏi, không cần quan tâm đến bạn bè', 'Có thể vui chơi mà không cần tuân theo nội quy', 'Việc giữ gìn trường lớp chỉ là trách nhiệm của thầy cô'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  const [ls] = await c.query("SELECT l.id, l.title FROM lessons l JOIN courses c ON c.id=l.courseId WHERE c.slug='tieng-viet-lop-1' AND l.title LIKE ?", [TITLE_LIKE]);
  if (!ls.length) { console.log('KHÔNG thấy lesson', TITLE_LIKE); process.exit(1); }
  if (ls.length > 1) { console.log('CẢNH BÁO: nhiều hơn 1 lesson khớp:', ls.map(x => x.id + ' ' + x.title).join(' | ')); process.exit(1); }
  const LESSON_ID = ls[0].id;
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('lesson', LESSON_ID, '(' + ls[0].title + ') | vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('HK2-B20 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
