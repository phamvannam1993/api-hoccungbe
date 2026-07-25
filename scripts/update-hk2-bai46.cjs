require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Cậu bé thông minh%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Quả bưởi dưới hố', 'Cậu bé thông minh', 'Trò chơi ngoài đồng', 'Nhà toán học nhỏ tuổi'], 'B', 'easy', 1, 1),
  sc('Cậu bé trong câu chuyện tên là gì?', ['Nam', 'Vinh', 'Đức', 'Minh'], 'B', 'easy', 1, 2),
  sc('Vinh đem quả gì ra làm bóng?', ['Quả cam', 'Quả bưởi', 'Quả bóng nhựa', 'Quả dừa'], 'B', 'easy', 1, 3),
  sc('Vinh cùng các bạn chơi ở đâu?', ['Trong lớp học', 'Trên bãi cỏ', 'Ngoài đường phố', 'Trong sân nhà'], 'B', 'easy', 1, 4),
  sc('Đang chơi, quả bưởi lăn xuống đâu?', ['Dòng sông', 'Cái giếng', 'Một cái hố', 'Bụi cây'], 'C', 'easy', 1, 5),
  sc('Cái hố có đặc điểm gì?', ['Rộng và nông', 'Hẹp và rất sâu', 'Rộng và đầy cát', 'Nông và có nhiều đá'], 'B', 'easy', 1, 6),
  sc('Vì sao các bạn không thể lấy quả bưởi bằng tay?', ['Vì quả bưởi quá nặng', 'Vì cái hố hẹp và sâu', 'Vì quả bưởi đã vỡ', 'Vì các bạn sợ nước'], 'B', 'easy', 1, 7),
  sc('Vinh rủ các bạn đi mượn vật gì?', ['Những chiếc xô', 'Những chiếc nón', 'Những chiếc rổ', 'Những chiếc chậu'], 'B', 'easy', 1, 8),
  sc('Các bạn dùng nón để làm gì?', ['Che nắng', 'Múc nước đổ vào hố', 'Đựng quả bưởi', 'Quạt cho mát'], 'B', 'easy', 1, 9),
  sc('Cậu bé Vinh sau này trở thành ai?', ['Một nhà văn nổi tiếng', 'Một nhà toán học xuất sắc', 'Một bác sĩ giỏi', 'Một họa sĩ tài năng'], 'B', 'easy', 1, 10),
  sc('Khi quả bưởi rơi xuống hố, các bạn cảm thấy thế nào?', ['Vui mừng', 'Nuối tiếc', 'Tức giận', 'Bình thản'], 'B', 'medium', 2, 1),
  sc('Từ "nuối tiếc" có nghĩa là gì?', ['Buồn vì mất đi hoặc không đạt được điều mình mong muốn', 'Vui vì vừa nhận được quà', 'Lo lắng vì sắp đi học', 'Ngạc nhiên trước một việc lạ'], 'A', 'medium', 2, 2),
  sc('Từ "thán phục" có nghĩa là gì?', ['Rất khâm phục và ngợi khen', 'Rất sợ hãi', 'Không quan tâm', 'Cảm thấy buồn ngủ'], 'A', 'medium', 2, 3),
  sc('Vì sao các bạn nhìn Vinh trầm trồ thán phục?', ['Vì Vinh có quả bưởi rất to', 'Vì Vinh nghĩ ra cách lấy quả bưởi thông minh', 'Vì Vinh chạy nhanh nhất', 'Vì Vinh biết chơi nhiều trò chơi'], 'B', 'medium', 2, 4),
  sc('Khi nước được đổ đầy vào hố, quả bưởi như thế nào?', ['Chìm xuống sâu hơn', 'Nổi dần lên', 'Bị vỡ ra', 'Biến mất'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Chúng tôi rất (…) vì đội bóng mình yêu thích đã bị thua.', ['thông minh', 'xuất sắc', 'nuối tiếc', 'vui mừng'], 'C', 'medium', 2, 6),
  sc('Chọn từ thích hợp để hoàn thành câu: Hoa vẽ rất đẹp. Cả lớp ai cũng (…) bạn ấy.', ['thán phục', 'nuối tiếc', 'vui mừng', 'thông minh'], 'A', 'medium', 2, 7),
  sc('Trò chơi trong bức tranh có các ô kẻ và những viên sỏi là trò gì?', ['Đánh quay', 'Ô ăn quan', 'Kéo co', 'Nhảy dây'], 'B', 'medium', 2, 8),
  sc('Trò chơi dùng dây quấn quanh con quay là trò gì?', ['Đánh quay', 'Ô ăn quan', 'Bịt mắt bắt dê', 'Đá cầu'], 'A', 'medium', 2, 9),
  sc('Dãy từ nào được viết đúng?', ['thông minh – huỳnh huỵch – bình tĩnh', 'thông muynh – hình huỵch – bình tuynh', 'thông minh – hình huỵch – bình tỉnh', 'thông muynh – huỳnh huỵch – bình tính'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Quả bưởi rơi xuống hố → Vinh nghĩ cách → các bạn đổ nước → quả bưởi nổi lên', 'Các bạn đổ nước → quả bưởi rơi xuống hố → Vinh đi tìm nón', 'Vinh lấy quả bưởi → các bạn đào hố → mọi người đổ nước', 'Quả bưởi nổi lên → Vinh mới rủ các bạn đi mượn nón'], 'A', 'hard', 3, 1),
  sc('Vinh đã dựa vào đặc điểm nào của quả bưởi để lấy quả lên?', ['Quả bưởi có thể nổi trên nước', 'Quả bưởi có thể tự bay', 'Quả bưởi có thể phát sáng', 'Quả bưởi có thể tự lăn lên dốc'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào thể hiện Vinh là người biết suy nghĩ?', ['Vinh ngồi nhìn xuống hố', 'Vinh suy nghĩ một lát rồi nghĩ ra cách đổ nước vào hố', 'Vinh đem quả bưởi ra chơi', 'Vinh đứng cùng các bạn'], 'B', 'hard', 3, 3),
  sc('Nếu cái hố không được đổ nước, điều gì có thể xảy ra?', ['Quả bưởi không thể tự nổi lên để các bạn lấy', 'Quả bưởi sẽ tự bay ra ngoài', 'Quả bưởi sẽ biến thành quả bóng', 'Cái hố sẽ tự đầy đất'], 'A', 'hard', 3, 4),
  sc('Qua cách giải quyết của Vinh, em học được điều gì?', ['Khi gặp khó khăn cần bình tĩnh suy nghĩ và tìm cách giải quyết', 'Khi gặp khó khăn nên bỏ cuộc ngay', 'Chỉ cần đứng chờ người khác giúp', 'Có thể làm việc mà không cần suy nghĩ'], 'A', 'hard', 3, 5),
  sc('Dãy nào lần lượt điền đúng vần inh hoặc uynh? thông m… – h… huỵch – bình t…', ['inh – uynh – inh', 'uynh – inh – uynh', 'inh – inh – uynh', 'uynh – uynh – inh'], 'A', 'hard', 3, 6, 'Viết đúng: "thông minh – huỳnh huỵch – bình tĩnh".'),
  sc('Dãy nào lần lượt điền đúng vần oan hoặc oăn? băn kh… – hân h… – h… thành', ['oan – oăn – oăn', 'oăn – oan – oan', 'oan – oan – oăn', 'oăn – oăn – oan'], 'B', 'hard', 3, 7, 'Viết đúng: "băn khoăn – hân hoan – hoàn thành".'),
  sc('Câu đố sau nói về con vật nào? "Đuôi ngắn, tai dài / Mắt hồng, lông mượt / Có tài chạy nhanh."', ['Con chó', 'Con thỏ', 'Con mèo', 'Con sóc'], 'B', 'hard', 3, 8),
  sc('Câu đố sau nói về vật gì? "Không phải để ăn / Mà dùng để đá, để lăn, để chuyền."', ['Quả cam', 'Quả bóng', 'Quả bưởi', 'Quả táo'], 'B', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Kể về sự thông minh của Lương Thế Vinh khi nghĩ ra cách lấy quả bưởi dưới hố', 'Hướng dẫn cách chơi ô ăn quan', 'Giới thiệu các loại quả ở nông thôn', 'Kể về một đội bóng bị thua'], 'A', 'hard', 3, 10),
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
    console.log('CAUBE-TM XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
