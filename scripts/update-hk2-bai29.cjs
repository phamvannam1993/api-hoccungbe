require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Câu hỏi của sói%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Sóc và những người bạn', 'Câu hỏi của sói', 'Sói và gà rừng', 'Chú sóc thông minh'], 'B', 'easy', 1, 1),
  sc('Con vật nào đang chuyền trên cành cây?', ['Sói', 'Sóc', 'Hươu', 'Gà rừng'], 'B', 'easy', 1, 2),
  sc('Chuyện gì xảy ra với sóc khi đang chuyền trên cành cây?', ['Sóc ngủ quên', 'Sóc trượt chân và rơi xuống', 'Sóc bị mắc vào cành cây', 'Sóc nhìn thấy thức ăn'], 'B', 'easy', 1, 3),
  sc('Sóc rơi trúng đầu con vật nào?', ['Hươu', 'Gà trống', 'Sói', 'Chim trĩ'], 'C', 'easy', 1, 4),
  sc('Khi sóc rơi xuống, sói đang làm gì?', ['Đang ăn', 'Đang ngái ngủ', 'Đang chạy', 'Đang uống nước'], 'B', 'easy', 1, 5),
  sc('Sói làm gì sau khi bị sóc rơi trúng đầu?', ['Bỏ chạy', 'Chồm dậy và túm lấy sóc', 'Trèo lên cây', 'Gọi các con vật khác'], 'B', 'easy', 1, 6),
  sc('Sóc van nài sói điều gì?', ['Cho sóc một ít thức ăn', 'Chỉ đường về nhà', 'Thả sóc ra', 'Giúp sóc trèo lên cây'], 'C', 'easy', 1, 7),
  sc('Sói muốn sóc trả lời điều gì?', ['Vì sao sóc có chiếc đuôi đẹp', 'Vì sao bọn sóc luôn nhảy nhót vui đùa còn sói luôn buồn bực', 'Vì sao sóc sống trên cây', 'Vì sao sóc thích ăn hạt'], 'B', 'easy', 1, 8),
  sc('Sau khi được thả, sóc nhảy lên đâu?', ['Một tảng đá', 'Một cây cao', 'Một mái nhà', 'Một bụi cỏ'], 'B', 'easy', 1, 9),
  sc('Vì sao sóc lúc nào cũng vui?', ['Vì sóc có nhiều thức ăn', 'Vì sóc chạy rất nhanh', 'Vì sóc có nhiều bạn tốt', 'Vì sóc sống trên cây cao'], 'C', 'easy', 1, 10),
  sc('Từ "ngái ngủ" chỉ trạng thái nào?', ['Vẫn còn buồn ngủ, chưa tỉnh hẳn', 'Rất tỉnh táo', 'Đang tức giận', 'Đang vui vẻ'], 'A', 'medium', 2, 1),
  sc('Từ "van nài" có nghĩa là gì?', ['Yêu cầu bằng giọng ra lệnh', 'Khẩn khoản cầu xin', 'Kể một câu chuyện', 'Trêu chọc người khác'], 'B', 'medium', 2, 2),
  sc('Cụm từ "nhảy tót" miêu tả hành động như thế nào?', ['Nhảy lên rất nhanh', 'Đi thật chậm', 'Nằm im một chỗ', 'Bò xuống đất'], 'A', 'medium', 2, 3),
  sc('Từ "gây gổ" chỉ hành vi nào?', ['Hay kiếm chuyện, cãi nhau với người khác', 'Thường xuyên giúp đỡ bạn bè', 'Nói chuyện nhỏ nhẹ', 'Chăm chỉ làm việc'], 'A', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Mấy chú chim sẻ đang (…) trên cành cây.', ['gây gổ', 'hát', 'tốt bụng', 'chăm chỉ'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Người nào hay (…) thì sẽ không có bạn bè.', ['nhảy nhót', 'hát', 'gây gổ', 'chăm chỉ'], 'C', 'medium', 2, 6),
  sc('Vì sao các con sóc thường bỏ chạy khi nhìn thấy sói?', ['Vì sói hay gây gổ', 'Vì sóc không thích khu rừng', 'Vì sói chạy quá chậm', 'Vì sóc muốn đi kiếm ăn'], 'A', 'medium', 2, 7),
  sc('Vì sao sói lúc nào cũng cảm thấy buồn bực?', ['Vì sói không có thức ăn', 'Vì sói không có bạn bè', 'Vì sói không biết trèo cây', 'Vì sói bị đau chân'], 'B', 'medium', 2, 8),
  sc('Câu nào nói đúng nội dung bài đọc?', ['Sói có nhiều bạn tốt nên lúc nào cũng vui', 'Sóc thường gây gổ nên không có bạn', 'Sói không có bạn vì thường xuyên gây gổ', 'Sóc không muốn trả lời câu hỏi của sói'], 'C', 'medium', 2, 9),
  sc('Dãy từ nào được viết đúng chính tả?', ['sợ hãi, xấu hổ, gây gổ', 'sợ hải, xấu hổ, gây gỗ', 'sợ hãi, xấu hỗ, gây gổ', 'sợ hải, xấu hỗ, gây gỗ'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Sóc rơi xuống → sói túm sóc → sói đặt câu hỏi → sói thả sóc → sóc trả lời', 'Sói thả sóc → sóc rơi xuống → sói đi ngủ', 'Sóc trả lời → sói túm sóc → sóc trèo cây', 'Sói hỏi sóc → sóc rơi xuống → sói bỏ chạy'], 'A', 'hard', 3, 1),
  sc('Vì sao sóc yêu cầu sói thả mình trước rồi mới trả lời?', ['Vì sóc muốn lên nơi an toàn rồi mới nói sự thật', 'Vì sóc không nghe rõ câu hỏi', 'Vì sóc muốn đi tìm bạn', 'Vì sóc không biết câu trả lời'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy sóc nhanh trí?', ['Sóc rơi xuống đầu sói', 'Sóc yêu cầu được thả rồi nhảy lên cây cao mới trả lời', 'Sóc chuyền trên cành cây', 'Sóc thường vui đùa với bạn bè'], 'B', 'hard', 3, 3),
  sc('Câu trả lời của sóc giúp sói hiểu điều gì?', ['Muốn có bạn bè, sói cần thôi gây gổ và sống thân thiện hơn', 'Sói cần học cách trèo cây', 'Sói nên ngủ nhiều hơn', 'Sói cần chạy nhanh như sóc'], 'A', 'hard', 3, 4),
  sc('Sự khác nhau giữa sóc và sói là gì?', ['Sóc có nhiều bạn tốt nên vui; sói hay gây gổ nên không có bạn và thường buồn bực', 'Sóc sống dưới đất còn sói sống trên cây', 'Sóc luôn buồn còn sói luôn vui', 'Sóc hay gây gổ còn sói rất thân thiện'], 'A', 'hard', 3, 5),
  sc('Câu đố sau nói về con vật nào? "Sớm sớm lích rích, / Rất thích bắt sâu, / Sâu trốn ở đâu, / Cũng tìm ra được."', ['Chim sâu', 'Con chó', 'Cú mèo', 'Con sóc'], 'A', 'hard', 3, 6),
  sc('Câu đố sau nói về con vật nào? "Ngày ngày ngồi đợi, / Mỗi khi chủ về, / Vẫy đuôi mừng rỡ."', ['Con mèo', 'Con chó', 'Con gà', 'Con chim'], 'B', 'hard', 3, 7),
  sc('Câu đố sau nói về con vật nào? "Trông xa tưởng là mèo, / Lại gần hóa ra chim, / Ban ngày ngủ lim dim, / Đêm đêm đi lùng chuột."', ['Chim sẻ', 'Cú mèo', 'Chim sâu', 'Chim bồ câu'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: sói / không có bạn bè / vì / hay gây gổ',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'sói' },
      { key: '2', text: 'không có bạn bè' },
      { key: '3', text: 'vì' },
      { key: '4', text: 'hay gây gổ' },
    ],
    correctAnswerJson: ['1', '2', '3', '4'], // Sói không có bạn bè vì hay gây gổ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Sói không có bạn bè vì hay gây gổ".',
  },
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Muốn có nhiều bạn tốt, chúng ta cần sống hòa thuận, thân thiện và không gây gổ', 'Muốn được vui, chúng ta cần sống một mình', 'Người mạnh hơn có thể bắt nạt người yếu hơn', 'Không nên nói chuyện với bạn bè'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B29 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
