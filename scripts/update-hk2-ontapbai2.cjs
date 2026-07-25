require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập và đánh giá - Bài tập số 2%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Năm học mới', 'Cảm ơn', 'Người bạn tốt', 'Ngày khai trường'], 'B', 'easy', 1, 1),
  sc('Từ nào thích hợp điền vào ô số 1? "Một tuần nữa là (…) kết thúc."', ['nhà trường', 'năm học', 'năm ngoái', 'giờ học'], 'B', 'easy', 1, 2),
  sc('Từ nào thích hợp điền vào ô số 2? "Thời gian (…) thật nhanh."', ['trả lời', 'lắng nghe', 'trôi qua', 'giúp đỡ'], 'C', 'easy', 1, 3),
  sc('Từ nào thích hợp điền vào ô số 3? "Từ tháng chín (…) đến nay..."', ['năm ngoái', 'năm học', 'trường', 'thân thiện'], 'A', 'easy', 1, 4),
  sc('Bạn nhỏ tiến bộ không ngừng nhờ điều gì?', ['Sự giúp đỡ của nhiều người', 'Được nghỉ học nhiều ngày', 'Có nhiều đồ chơi mới', 'Được đi du lịch'], 'A', 'easy', 1, 5),
  sc('Bạn nhỏ muốn cảm ơn người dạy dỗ mình là ai?', ['Bác bảo vệ', 'Cô giáo', 'Người hàng xóm', 'Bác sĩ'], 'B', 'easy', 1, 6),
  sc('Các bạn đã cùng bạn nhỏ làm gì?', ['Đi chơi công viên', 'Học nhóm', 'Trồng cây', 'Đi xem phim'], 'B', 'easy', 1, 7),
  sc('Bạn nhỏ đặc biệt muốn cảm ơn ai?', ['Bố mẹ', 'Người bán hàng', 'Bác tài xế', 'Khách du lịch'], 'A', 'easy', 1, 8),
  sc('Bố mẹ dành cho bạn nhỏ điều gì?', ['Nhiều đồ chơi', 'Tình yêu thương', 'Một chuyến đi xa', 'Những món quà đắt tiền'], 'B', 'easy', 1, 9),
  sc('Bạn nhỏ cảm thấy năm học vừa qua như thế nào?', ['Rất buồn', 'Quá dài', 'Tuyệt vời', 'Đáng sợ'], 'C', 'easy', 1, 10),
  sc('Từ nào thích hợp điền vào ô số 4? "Tôi đã tiến bộ không ngừng nhờ sự (…) của nhiều người."', ['trả lời', 'xin lỗi', 'giúp đỡ', 'lắng nghe'], 'C', 'medium', 2, 1),
  sc('Từ nào thích hợp điền vào ô số 5? "Tôi muốn (…) cô giáo."', ['cảm ơn', 'trả lời', 'giúp đỡ', 'xin lỗi'], 'A', 'medium', 2, 2),
  sc('Từ nào thích hợp điền vào ô số 6? "Các bạn cũng giúp tôi học được cách cư xử (…) với mọi người."', ['nhanh chóng', 'thân thiện', 'im lặng', 'xa lạ'], 'B', 'medium', 2, 3),
  sc('Từ nào thích hợp điền vào ô số 7? "Bố mẹ luôn chăm chú (…) những câu chuyện ở trường của tôi."', ['trả lời', 'xin lỗi', 'lắng nghe', 'trôi qua'], 'C', 'medium', 2, 4),
  sc('Từ "tận tâm" nói lên điều gì về cô giáo?', ['Cô rất nhiệt tình và hết lòng dạy học sinh', 'Cô thường xuyên nghỉ dạy', 'Cô không quan tâm đến học sinh', 'Cô chỉ thích vui chơi'], 'A', 'medium', 2, 5),
  sc('Từ "tiến bộ" có nghĩa là gì?', ['Ngày càng học tập và rèn luyện tốt hơn', 'Không thay đổi so với trước', 'Học tập kém đi', 'Không muốn làm việc'], 'A', 'medium', 2, 6),
  sc('Từ "thân thiện" có nghĩa là gì?', ['Gần gũi, vui vẻ và hòa nhã với mọi người', 'Hay cáu giận và gây gổ', 'Không nói chuyện với ai', 'Luôn tránh xa mọi người'], 'A', 'medium', 2, 7),
  sc('Vì sao bạn nhỏ cảm ơn cô giáo?', ['Vì cô tặng bạn nhiều đồ chơi', 'Vì cô tận tâm dạy dỗ, giúp bạn hiểu nhiều điều thú vị', 'Vì cô đưa bạn đi chơi', 'Vì cô làm bài tập thay bạn'], 'B', 'medium', 2, 8),
  sc('Vì sao bạn nhỏ cảm ơn các bạn?', ['Vì các bạn cho bạn nhiều quà', 'Vì các bạn cùng học nhóm và giúp bạn biết cư xử thân thiện', 'Vì các bạn làm bài hộ', 'Vì các bạn cho bạn nghỉ học'], 'B', 'medium', 2, 9),
  sc('Vì sao bạn nhỏ cảm ơn bố mẹ?', ['Vì bố mẹ luôn yêu thương và lắng nghe bạn', 'Vì bố mẹ mua nhiều bánh kẹo', 'Vì bố mẹ cho bạn xem ti vi cả ngày', 'Vì bố mẹ không yêu cầu bạn học bài'], 'A', 'medium', 2, 10),
  sc('Thứ tự những người được bạn nhỏ cảm ơn trong bài là:', ['Bố mẹ → cô giáo → các bạn', 'Các bạn → bố mẹ → cô giáo', 'Cô giáo → các bạn → bố mẹ', 'Cô giáo → bố mẹ → các bạn'], 'C', 'hard', 3, 1),
  sc('Câu nào cho thấy bố mẹ quan tâm đến việc học và cuộc sống của bạn nhỏ?', ['"Bố mẹ đã dành cho tôi tình yêu thương."', '"Bố mẹ luôn chăm chú lắng nghe những câu chuyện ở trường của tôi."', '"Năm học vừa qua quả là tuyệt vời."', '"Tôi muốn cảm ơn tất cả."'], 'B', 'hard', 3, 2),
  sc('Bạn nhỏ đã tiến bộ trong năm học chủ yếu nhờ đâu?', ['Nhờ sự yêu thương, dạy dỗ và giúp đỡ của mọi người', 'Nhờ tự nghỉ học ở nhà', 'Nhờ có nhiều đồ chơi mới', 'Nhờ không phải làm bài tập'], 'A', 'hard', 3, 3),
  sc('Qua bài đọc, bạn nhỏ là người như thế nào?', ['Biết ghi nhớ và trân trọng sự giúp đỡ của mọi người', 'Chỉ quan tâm đến bản thân', 'Không thích học cùng các bạn', 'Không nghe lời bố mẹ'], 'A', 'hard', 3, 4),
  sc('Khi được bạn giúp làm một việc khó, em nên nói gì?', ['Không cần nói gì', 'Cảm ơn bạn', 'Bạn phải giúp mình', 'Mình không cần bạn'], 'B', 'hard', 3, 5),
  sc('Khi làm sai và khiến bạn buồn, em nên làm gì?', ['Bỏ đi và không nói gì', 'Đổ lỗi cho người khác', 'Nói lời xin lỗi và sửa lỗi', 'Tiếp tục trêu bạn'], 'C', 'hard', 3, 6),
  sc('Câu nào sử dụng từ "lắng nghe" đúng nhất?', ['Em lắng nghe cô giáo giảng bài.', 'Em lắng nghe chiếc cặp lên bàn.', 'Em lắng nghe bài tập vào vở.', 'Em lắng nghe chạy quanh sân.'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: em / cảm ơn / đã giúp đỡ / bạn / em',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'em' },
      { key: '2', text: 'cảm ơn' },
      { key: '3', text: 'đã giúp đỡ' },
      { key: '4', text: 'bạn' },
      { key: '5', text: 'em' },
    ],
    correctAnswerJson: ['1', '2', '4', '3', '5'], // Em cảm ơn bạn đã giúp đỡ em
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Em cảm ơn bạn đã giúp đỡ em".',
  },
  sc('Việc làm nào thể hiện lòng biết ơn cô giáo?', ['Chăm chỉ học tập, lễ phép và thực hiện lời cô dạy', 'Nói chuyện riêng trong lớp', 'Không làm bài tập', 'Không chào cô giáo'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Bạn nhỏ nhớ lại năm học và bày tỏ lòng cảm ơn cô giáo, bạn bè, bố mẹ', 'Bạn nhỏ kể về chuyến đi du lịch', 'Bạn nhỏ giới thiệu ngôi trường mới', 'Bạn nhỏ kể về một trò chơi trong sân trường'], 'A', 'hard', 3, 10),
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
    console.log('ONTAP-BAI2 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
