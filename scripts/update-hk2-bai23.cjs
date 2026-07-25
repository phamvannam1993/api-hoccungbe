require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Khi mẹ vắng nhà%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Dê mẹ đi kiếm cỏ', 'Khi mẹ vắng nhà', 'Chú sói gian ác', 'Đàn dê con ngoan ngoãn'], 'B', 'easy', 1, 1),
  sc('Đàn dê con sống cùng ai?', ['Dê bố', 'Dê mẹ', 'Chó sói', 'Thỏ trắng'], 'B', 'easy', 1, 2),
  sc('Dê mẹ đi đâu?', ['Đi kiếm cỏ', 'Đi thăm bạn', 'Đi chơi', 'Đi tìm nước'], 'A', 'easy', 1, 3),
  sc('Trước khi đi, dê mẹ dặn các con làm gì?', ['Mở cửa cho mọi người', 'Không mở cửa cho người lạ', 'Ra ngoài chơi', 'Đi theo dê mẹ'], 'B', 'easy', 1, 4),
  sc('Dê mẹ dặn đàn con chỉ mở cửa khi nào?', ['Khi nghe tiếng gõ cửa', 'Khi nghe đúng tiếng mẹ', 'Khi trời tối', 'Khi có quà'], 'B', 'easy', 1, 5),
  sc('Con vật nào nấp gần nhà dê?', ['Con hổ', 'Con cáo', 'Con sói', 'Con gấu'], 'C', 'easy', 1, 6),
  sc('Sói đợi đến khi nào mới gõ cửa?', ['Khi dê mẹ đi xa', 'Khi dê mẹ trở về', 'Khi đàn dê con đi ngủ', 'Khi trời mưa'], 'A', 'easy', 1, 7),
  sc('Sói giả giọng của ai?', ['Dê con', 'Dê mẹ', 'Thỏ mẹ', 'Người hàng xóm'], 'B', 'easy', 1, 8),
  sc('Đàn dê con có mở cửa cho sói không?', ['Có', 'Không', 'Chỉ mở một nửa', 'Không biết'], 'B', 'easy', 1, 9),
  sc('Khi dê mẹ trở về, đàn dê con làm gì?', ['Trốn trong nhà', 'Ra mở cửa', 'Bỏ chạy vào rừng', 'Không trả lời'], 'B', 'easy', 1, 10),
  sc('Từ "giả giọng" có nghĩa là gì?', ['Bắt chước giọng nói của người khác', 'Nói thật to', 'Không nói được', 'Hát một bài hát'], 'A', 'medium', 2, 1),
  sc('Từ "tíu tít" miêu tả cách nói như thế nào?', ['Nói chuyện vui vẻ, liên tục', 'Nói rất chậm', 'Không nói gì', 'Nói trong tức giận'], 'A', 'medium', 2, 2),
  sc('Vì sao đàn dê con không mở cửa cho sói?', ['Vì chúng không nghe thấy tiếng gọi', 'Vì đó không phải giọng của mẹ', 'Vì cửa bị khóa', 'Vì chúng đang ngủ'], 'B', 'medium', 2, 3),
  sc('Khi đàn dê con không mở cửa, sói làm gì?', ['Phá cửa vào nhà', 'Đành bỏ đi', 'Ngồi đợi dê mẹ', 'Gọi thêm bạn đến'], 'B', 'medium', 2, 4),
  sc('Khi nghe đúng tiếng mẹ, đàn dê con làm gì?', ['Ra mở cửa', 'Tiếp tục im lặng', 'Trốn dưới gầm bàn', 'Chạy ra cửa sau'], 'A', 'medium', 2, 5),
  sc('Đàn dê con đã kể gì với mẹ?', ['Có tiếng gọi cửa nhưng không phải giọng mẹ nên chúng không mở', 'Sói đã vào được trong nhà', 'Chúng đã đi chơi ngoài rừng', 'Chúng quên mất lời mẹ dặn'], 'A', 'medium', 2, 6),
  sc('Dê mẹ làm gì khi nghe các con kể chuyện?', ['Trách mắng các con', 'Xoa đầu các con', 'Đóng cửa bỏ đi', 'Gọi sói quay lại'], 'B', 'medium', 2, 7),
  sc('Dê mẹ khen đàn con như thế nào?', ['"Các con giỏi chạy lắm!"', '"Các con ngoan lắm!"', '"Các con hát hay lắm!"', '"Các con lớn nhanh lắm!"'], 'B', 'medium', 2, 8),
  sc('Hoàn thành câu theo nội dung bài: Khi dê mẹ vừa đi xa, sói (…).', ['gõ cửa và giả giọng dê mẹ', 'đi tìm cỏ', 'ngủ bên gốc cây', 'chạy về nhà'], 'A', 'medium', 2, 9),
  sc('Câu nào nói đúng về đàn dê con?', ['Đàn dê con biết nghe lời mẹ', 'Đàn dê con mở cửa cho người lạ', 'Đàn dê con đi theo sói', 'Đàn dê con không nhớ lời mẹ'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Dê mẹ dặn con → sói giả giọng → dê con không mở cửa → dê mẹ trở về', 'Sói bỏ đi → dê mẹ dặn con → dê con mở cửa', 'Dê mẹ trở về → sói gõ cửa → đàn dê con đi chơi', 'Đàn dê con mở cửa → sói giả giọng → dê mẹ đi kiếm cỏ'], 'A', 'hard', 3, 1),
  sc('Vì sao sói phải giả giọng dê mẹ?', ['Vì muốn lừa đàn dê con mở cửa', 'Vì sói bị đau họng', 'Vì sói muốn hát cho dê nghe', 'Vì dê mẹ nhờ sói gọi cửa'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy đàn dê con rất cảnh giác?', ['Chúng nhận ra đó không phải giọng mẹ và không mở cửa', 'Chúng chạy ra ngoài ngay', 'Chúng mời sói vào nhà', 'Chúng quên lời mẹ dặn'], 'A', 'hard', 3, 3),
  sc('Nếu đàn dê con mở cửa cho sói, điều gì có thể xảy ra?', ['Đàn dê con có thể gặp nguy hiểm', 'Sói sẽ giúp chúng dọn nhà', 'Dê mẹ sẽ về sớm hơn', 'Cả nhà sẽ cùng đi chơi'], 'A', 'hard', 3, 4),
  sc('Vì sao dê mẹ khen các con ngoan?', ['Vì các con nhớ lời dặn và không mở cửa cho kẻ lạ', 'Vì các con đã đi kiếm cỏ', 'Vì các con mời sói vào nhà', 'Vì các con ngủ suốt ngày'], 'A', 'hard', 3, 5),
  sc('Trong bức tranh đầu bài, người đàn ông lạ bảo mình là bạn của bố. Bạn nhỏ nên làm gì?', ['Mở cửa ngay', 'Không mở cửa và gọi điện báo cho bố mẹ hoặc người lớn tin cậy', 'Đi ra ngoài nói chuyện', 'Đưa chìa khóa cho người đó'], 'B', 'hard', 3, 6),
  sc('Khi ở nhà một mình và có người lạ gọi cửa, em không nên làm gì?', ['Giữ cửa khóa cẩn thận', 'Báo cho bố mẹ', 'Mở cửa cho người lạ vào', 'Gọi người lớn đáng tin cậy giúp đỡ'], 'C', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đàn dê con / lời mẹ / nhớ / không mở cửa',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'đàn dê con' },
      { key: '2', text: 'lời mẹ' },
      { key: '3', text: 'nhớ' },
      { key: '4', text: 'không mở cửa' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Đàn dê con nhớ lời mẹ, không mở cửa
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Đàn dê con nhớ lời mẹ, không mở cửa".',
  },
  sc('Qua câu chuyện, đàn dê con là những người con như thế nào?', ['Ngoan ngoãn, cẩn thận và biết nghe lời', 'Nghịch ngợm, không nghe lời', 'Nhút nhát, không dám nói', 'Lười biếng, không làm việc'], 'A', 'hard', 3, 9),
  sc('Bài học quan trọng nhất từ câu chuyện là gì?', ['Khi ở nhà không có người lớn, không được mở cửa cho người lạ và phải nhớ lời dặn của bố mẹ', 'Có thể tin bất cứ ai gọi cửa', 'Nên ra ngoài chơi khi bố mẹ vắng nhà', 'Chỉ cần nghe giọng giống người thân là mở cửa ngay'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B23 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
