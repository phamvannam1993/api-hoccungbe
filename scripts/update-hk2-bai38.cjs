require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 6%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng nào dưới đây chứa vần ooc?', ['voọc', 'yểng', 'khoét', 'nhoẻn'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây chứa vần yết?', ['niêm yết', 'chim yểng', 'xoen xoét', 'chuệnh choạng'], 'A', 'easy', 1, 2),
  sc('Tiếng nào dưới đây chứa vần yêng?', ['yểng', 'ngoao', 'khoét', 'voọc'], 'A', 'easy', 1, 3),
  sc('Tiếng nào dưới đây chứa vần oen?', ['nhoẻn', 'yểng', 'khoét', 'chuệnh'], 'A', 'easy', 1, 4),
  sc('Tiếng nào dưới đây chứa vần oao?', ['ngoao', 'voọc', 'yết', 'khoét'], 'A', 'easy', 1, 5),
  sc('Tiếng nào dưới đây chứa vần oet?', ['khoét', 'chuệnh', 'voọc', 'yểng'], 'A', 'easy', 1, 6),
  sc('Tiếng nào dưới đây chứa vần uênh?', ['chuệnh', 'yểng', 'nhoẻn', 'ngoao'], 'A', 'easy', 1, 7),
  sc('Bài đọc nào nói về cây cối?', ['Cây liễu dẻo dai', 'Loài chim của biển cả', 'Chúa tể rừng xanh', 'Cuộc thi tài năng rừng xanh'], 'A', 'easy', 1, 8),
  sc('Bài đọc nào nói về hiện tượng cầu vồng?', ['Bảy sắc cầu vồng', 'Chúa tể rừng xanh', 'Loài chim của biển cả', 'Cây liễu dẻo dai'], 'A', 'easy', 1, 9),
  sc('Từ ngữ nào dưới đây chỉ một sự vật thuộc thiên nhiên?', ['Rừng', 'Trường học', 'Xe cộ', 'Nhà cửa'], 'A', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần ooc – yết – yêng – oen – oao – oet – uênh?', ['voọc – niêm yết – yểng – nhoẻn – ngoao – khoét – chuệnh', 'yểng – voọc – khoét – ngoao – nhoẻn – chuệnh – yết', 'khoét – chuệnh – voọc – yểng – yết – nhoẻn – ngoao', 'ngoao – khoét – nhoẻn – yểng – voọc – yết – chuệnh'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn những từ ngữ chỉ thiên nhiên?', ['Sóng, nắng, mưa, gió', 'Trường học, xe cộ, nhà cửa', 'Bàn ghế, sách vở, bút', 'Ô tô, xe máy, đèn đường'], 'A', 'medium', 2, 2),
  sc('Dãy nào gồm toàn những nơi thuộc thiên nhiên?', ['Rừng, biển, núi, sông', 'Lớp học, bệnh viện, siêu thị', 'Nhà ở, nhà ga, sân vận động', 'Cửa hàng, nhà máy, bến xe'], 'A', 'medium', 2, 3),
  sc('Bài đọc nào giới thiệu đặc điểm và khả năng của chim hải âu?', ['Loài chim của biển cả', 'Bảy sắc cầu vồng', 'Cây liễu dẻo dai', 'Chúa tể rừng xanh'], 'A', 'medium', 2, 4),
  sc('Bài đọc nào giới thiệu đặc điểm của loài hổ?', ['Chúa tể rừng xanh', 'Cuộc thi tài năng rừng xanh', 'Cây liễu dẻo dai', 'Bảy sắc cầu vồng'], 'A', 'medium', 2, 5),
  sc('Bài đọc nào có nhiều con vật cùng biểu diễn tài năng?', ['Cuộc thi tài năng rừng xanh', 'Loài chim của biển cả', 'Bảy sắc cầu vồng', 'Cây liễu dẻo dai'], 'A', 'medium', 2, 6),
  sc('Những bài đọc nào chủ yếu nói về con vật?', ['Loài chim của biển cả, Chúa tể rừng xanh, Cuộc thi tài năng rừng xanh', 'Bảy sắc cầu vồng, Cây liễu dẻo dai', 'Cây liễu dẻo dai, Loài chim của biển cả', 'Bảy sắc cầu vồng, Chúa tể rừng xanh'], 'A', 'medium', 2, 7),
  sc('Bài đọc nào không nói chủ yếu về con vật hoặc cây cối?', ['Bảy sắc cầu vồng', 'Cây liễu dẻo dai', 'Loài chim của biển cả', 'Chúa tể rừng xanh'], 'A', 'medium', 2, 8),
  sc('Câu nào nói đúng về thiên nhiên trong bức tranh?', ['Dòng sông uốn quanh núi và rừng cây xanh tốt.', 'Trên đường có rất nhiều xe cộ.', 'Các bạn đang ngồi học trong lớp.', 'Nhiều ngôi nhà cao tầng đứng cạnh nhau.'], 'A', 'medium', 2, 9),
  sc('Hai cuốn sách được giới thiệu ở phần đọc mở rộng là gì?', ['Thế giới động vật và Lời của cỏ cây', 'Tích Chu và Cây khế', 'Sóc nâu đi học và Lớp học của mèo con', 'Phòng tránh đuối nước và Kĩ năng sống 1'], 'A', 'medium', 2, 10),
  sc('Cách nối bài đọc với nội dung nào dưới đây là đúng?', ['Loài chim của biển cả – giới thiệu chim hải âu', 'Bảy sắc cầu vồng – giới thiệu cây liễu', 'Chúa tể rừng xanh – kể về chim công múa', 'Cây liễu dẻo dai – giới thiệu loài hổ'], 'A', 'hard', 3, 1),
  sc('Cách nối bài đọc với nội dung nào dưới đây không đúng?', ['Chúa tể rừng xanh – đặc điểm của hổ', 'Cây liễu dẻo dai – đặc điểm của cây liễu', 'Bảy sắc cầu vồng – bảy màu của cầu vồng', 'Cuộc thi tài năng rừng xanh – khả năng báo bão của hải âu'], 'D', 'hard', 3, 2, 'Khả năng báo bão của hải âu được nói đến trong bài "Loài chim của biển cả".'),
  sc('Điểm chung của bài Loài chim của biển cả và Chúa tể rừng xanh là gì?', ['Đều giới thiệu đặc điểm và khả năng của một loài vật', 'Đều kể về một loài cây', 'Đều miêu tả hiện tượng thời tiết', 'Đều kể về một cuộc thi'], 'A', 'hard', 3, 3),
  sc('Điểm khác nhau giữa Bảy sắc cầu vồng và Cây liễu dẻo dai là gì?', ['Một bài nói về hiện tượng thiên nhiên, một bài nói về cây cối', 'Cả hai bài đều nói về chim', 'Một bài nói về trường học, một bài nói về gia đình', 'Cả hai bài đều kể về cuộc thi'], 'A', 'hard', 3, 4),
  sc('Từ nào dưới đây không cùng nhóm với các từ còn lại?', ['Mưa', 'Gió', 'Nắng', 'Xe cộ'], 'D', 'hard', 3, 5, 'Ba từ mưa, gió, nắng đều chỉ hiện tượng thiên nhiên.'),
  sc('Nhóm nào gồm một hiện tượng thiên nhiên, một địa hình và một vùng nước?', ['Mưa – núi – biển', 'Xe cộ – trường học – nhà cửa', 'Bút – bàn – ghế', 'Đèn – đường – lớp học'], 'A', 'hard', 3, 6),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: thiên nhiên / nhiều cảnh đẹp / quanh em / có',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'thiên nhiên' },
      { key: '2', text: 'nhiều cảnh đẹp' },
      { key: '3', text: 'quanh em' },
      { key: '4', text: 'có' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Thiên nhiên quanh em có nhiều cảnh đẹp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 7,
    explanation: 'Câu đúng: "Thiên nhiên quanh em có nhiều cảnh đẹp".',
  },
  sc('Câu nào phù hợp để viết về bức tranh thiên nhiên?', ['Dòng sông trong xanh chảy giữa núi rừng xanh mát.', 'Các phương tiện dừng trước đèn đỏ.', 'Học sinh đang chăm chú nghe giảng.', 'Cả gia đình quây quần bên mâm cơm.'], 'A', 'hard', 3, 8),
  sc('Việc làm nào góp phần bảo vệ thiên nhiên?', ['Không xả rác, chăm sóc cây và bảo vệ các loài vật', 'Chặt cây, phá tổ chim và săn bắt thú', 'Vứt rác xuống sông, suối', 'Hái hoa và bẻ cành trong rừng'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của phần ôn tập Thiên nhiên kì thú là gì?', ['Ôn lại kiến thức về con vật, cây cối, hiện tượng và cảnh vật thiên nhiên', 'Hướng dẫn cách sử dụng phương tiện giao thông', 'Kể về hoạt động học tập ở trường', 'Giới thiệu các thành viên trong gia đình'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B38 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
