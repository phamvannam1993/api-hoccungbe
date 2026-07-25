require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Tôi đi học%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Ngày đầu đến lớp', 'Tôi đi học', 'Mái trường của em', 'Người bạn mới'], 'B', 'easy', 1, 1),
  sc('Trong bức tranh đầu bài, các bạn nhỏ đang đến trường nào?', ['Trường Tiểu học Kim Đồng', 'Trường Tiểu học Lê Quý Đôn', 'Trường Tiểu học Nguyễn Du', 'Trường Tiểu học Nguyễn Trãi'], 'A', 'easy', 1, 2),
  sc('Ai nắm tay bạn nhỏ dẫn đi học?', ['Bố', 'Mẹ', 'Bà', 'Cô giáo'], 'B', 'easy', 1, 3),
  sc('Mẹ dẫn bạn nhỏ đi trên con đường như thế nào?', ['Rộng và đông đúc', 'Dài và hẹp', 'Ngắn và bằng phẳng', 'Quanh co và dốc'], 'B', 'easy', 1, 4),
  sc('Bạn nhỏ đã đi lại trên con đường ấy như thế nào?', ['Chưa đi lần nào', 'Chỉ đi một lần', 'Đã đi lại nhiều lần', 'Chỉ đi vào buổi tối'], 'C', 'easy', 1, 5),
  sc('Lần này, bạn nhỏ thấy con đường như thế nào?', ['Tự nhiên thấy lạ', 'Rất đáng sợ', 'Ngắn hơn trước', 'Đông người hơn trước'], 'A', 'easy', 1, 6),
  sc('Những học trò mới đứng ở đâu khi còn bỡ ngỡ?', ['Giữa sân trường', 'Nép bên người thân', 'Trong lớp học', 'Cạnh thầy giáo'], 'B', 'easy', 1, 7),
  sc('Ai đón các bạn học sinh mới vào lớp?', ['Cô hiệu trưởng', 'Các anh chị lớp trên', 'Thầy giáo trẻ', 'Bác bảo vệ'], 'C', 'easy', 1, 8),
  sc('Gương mặt của thầy giáo được miêu tả như thế nào?', ['Nghiêm nghị', 'Hiền từ', 'Buồn bã', 'Lo lắng'], 'B', 'easy', 1, 9),
  sc('Bạn nhỏ cảm thấy thế nào về người bạn ngồi bên?', ['Rất xa lạ', 'Đã quen từ lâu', 'Chưa quen nhưng không thấy xa lạ', 'Không muốn nói chuyện'], 'C', 'easy', 1, 10),
  sc('Từ "buổi mai" có nghĩa là gì?', ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'], 'A', 'medium', 2, 1),
  sc('Từ "âu yếm" chỉ cách thể hiện tình cảm như thế nào?', ['Dịu dàng và yêu thương', 'Giận dữ và khó chịu', 'Vội vàng và hấp tấp', 'Lạnh lùng và xa cách'], 'A', 'medium', 2, 2),
  sc('Từ "bỡ ngỡ" nói lên trạng thái nào?', ['Chưa quen với hoàn cảnh mới nên còn lúng túng', 'Đã quen thuộc với mọi người', 'Rất tức giận', 'Đang buồn ngủ'], 'A', 'medium', 2, 3),
  sc('Từ "nép" trong bài có nghĩa là gì?', ['Đứng sát vào bên cạnh một người hoặc một vật', 'Chạy thật nhanh về phía trước', 'Ngồi xuống giữa sân', 'Đứng một mình ở nơi xa'], 'A', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Cô giáo (…) nhìn các bạn chơi ở sân trường.', ['buổi mai', 'âu yếm', 'xa lạ', 'bỡ ngỡ'], 'B', 'medium', 2, 5),
  sc('Câu nào phù hợp với bức tranh các bạn đang trò chuyện trong lớp?', ['Các bạn rất thân thiện với nhau.', 'Các bạn đang ngủ trong lớp.', 'Các bạn đang tranh giành đồ dùng.', 'Các bạn không muốn nói chuyện.'], 'A', 'medium', 2, 6),
  sc('Từ nào phù hợp để miêu tả lớp học có nhiều bạn tham gia hoạt động?', ['Vắng vẻ', 'Sôi nổi', 'Yên ắng', 'Buồn tẻ'], 'B', 'medium', 2, 7),
  sc('Tiếng nào dưới đây chứa vần ương?', ['đường', 'vườn', 'tươi', 'hươu'], 'A', 'medium', 2, 8, '"đường" có vần "ương".'),
  sc('Tiếng nào dưới đây chứa vần ươn?', ['trường', 'vườn', 'người', 'hươu'], 'B', 'medium', 2, 9, '"vườn" có vần "ươn".'),
  sc('Dãy nào lần lượt chứa các vần ương – ươn – ươi – ươu?', ['đường – vườn – tươi – hươu', 'vườn – đường – hươu – tươi', 'tươi – hươu – đường – vườn', 'hươu – tươi – vườn – đường'], 'A', 'medium', 2, 10),
  sc('Vì sao con đường đã đi nhiều lần nhưng hôm ấy bạn nhỏ lại thấy lạ?', ['Vì con đường vừa được xây lại', 'Vì đó là ngày đầu bạn nhỏ đi học nên cảm xúc và cách nhìn thay đổi', 'Vì bạn nhỏ bị lạc đường', 'Vì trời tối nên bạn không nhìn rõ'], 'B', 'hard', 3, 1),
  sc('Chi tiết nào cho thấy bạn nhỏ còn bỡ ngỡ trong ngày đầu đi học?', ['Bạn nhỏ đứng nép bên người thân', 'Bạn nhỏ chạy chơi trong sân', 'Bạn nhỏ đã quen tất cả các bạn', 'Bạn nhỏ tự đi về nhà'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào giúp các học sinh mới cảm thấy yên tâm hơn?', ['Thầy giáo trẻ có gương mặt hiền từ đón các bạn vào lớp', 'Sân trường rất rộng', 'Con đường làng dài và hẹp', 'Các bạn mang theo nhiều đồ chơi'], 'A', 'hard', 3, 3),
  sc('Vì sao bạn nhỏ nhận bàn ghế là vật riêng của mình?', ['Vì đó là chỗ ngồi của bạn trong lớp học', 'Vì bạn mang bàn ghế từ nhà đến', 'Vì bạn muốn đem bàn ghế về nhà', 'Vì bàn ghế có màu đẹp nhất'], 'A', 'hard', 3, 4),
  sc('Thứ tự nào đúng với diễn biến bài đọc?', ['Mẹ dẫn đi học → bạn nhỏ thấy cảnh vật khác lạ → thầy giáo đón vào lớp → bạn nhìn chỗ ngồi và bạn bên cạnh', 'Thầy giáo đón vào lớp → mẹ dẫn đi học → bạn nhỏ về nhà', 'Bạn nhỏ gặp bạn mới → mẹ dẫn đi học → thầy giáo ra về', 'Bạn nhỏ ngồi vào lớp → mẹ mới dẫn bạn đến trường'], 'A', 'hard', 3, 5),
  sc('Sự thay đổi cảm xúc của bạn nhỏ trong bài diễn ra như thế nào?', ['Từ bỡ ngỡ đến dần cảm thấy gần gũi với lớp học và bạn mới', 'Từ vui vẻ đến tức giận', 'Từ tự tin đến sợ hãi', 'Từ thân thiện đến xa cách'], 'A', 'hard', 3, 6),
  sc('Câu nào hoàn thành đúng nội dung bài: Ngày đầu đi học, bạn nhỏ thấy cảnh vật xung quanh (…).', ['đều thay đổi', 'hoàn toàn biến mất', 'tối tăm hơn', 'không có gì khác'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: mẹ / âu yếm / nắm tay tôi / dẫn đi học',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'mẹ' },
      { key: '2', text: 'âu yếm' },
      { key: '3', text: 'nắm tay tôi' },
      { key: '4', text: 'dẫn đi học' },
    ],
    correctAnswerJson: ['1', '2', '3', '4'], // Mẹ âu yếm nắm tay tôi dẫn đi học
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Mẹ âu yếm nắm tay tôi dẫn đi học".',
  },
  sc('Khi gặp một người bạn mới trong lớp, em nên làm gì?', ['Mỉm cười, chào hỏi và thân thiện với bạn', 'Không nói chuyện với bạn', 'Chê bai và trêu chọc bạn', 'Không cho bạn ngồi cùng'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Cảm xúc bỡ ngỡ nhưng đầy yêu thương, gần gũi trong ngày đầu đi học', 'Cách xây dựng một ngôi trường', 'Những trò chơi trong sân trường', 'Công việc hằng ngày của thầy giáo'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B14 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
