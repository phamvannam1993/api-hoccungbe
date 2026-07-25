require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Hỏi mẹ%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Chú Cuội', 'Hỏi mẹ', 'Bầu trời xanh', 'Trăng rằm'], 'B', 'easy', 1, 1),
  sc('Bạn nhỏ hỏi ai trong bài thơ?', ['Bố', 'Mẹ', 'Cô giáo', 'Chị gái'], 'B', 'easy', 1, 2),
  sc('Bạn nhỏ hỏi ai đã quạt thành gì?', ['Thành mưa', 'Thành gió', 'Thành mây', 'Thành nắng'], 'B', 'easy', 1, 3),
  sc('Gió thổi vật gì ngang trời?', ['Mây', 'Lá cây', 'Cánh diều', 'Chim én'], 'A', 'easy', 1, 4),
  sc('Bạn nhỏ thắc mắc ai đã nhuộm bầu trời thành màu gì?', ['Màu đỏ', 'Màu vàng', 'Màu xanh', 'Màu tím'], 'C', 'easy', 1, 5),
  sc('Trong bài thơ, ông sao có đặc điểm gì?', ['Rất lớn', 'Bé', 'Tròn to', 'Màu đỏ'], 'B', 'easy', 1, 6),
  sc('Trăng rằm được miêu tả như thế nào?', ['Cong và nhỏ', 'Tròn to', 'Mờ nhạt', 'Đỏ rực'], 'B', 'easy', 1, 7),
  sc('Cuội ngồi ở đâu?', ['Gốc đa', 'Bên dòng sông', 'Trên đám mây', 'Trong ngôi nhà'], 'A', 'easy', 1, 8),
  sc('Theo bài thơ, Cuội phải làm gì mãi?', ['Hái hoa', 'Chăn trâu', 'Trồng cây', 'Thả diều'], 'B', 'easy', 1, 9),
  sc('Ai bay lên thăm Cuội?', ['Chú bộ đội', 'Chú phi công', 'Người nông dân', 'Người đánh cá'], 'B', 'easy', 1, 10),
  sc('Từ "nhuộm" trong câu "Ai nhuộm mẹ ơi" có nghĩa là gì?', ['Làm cho sự vật có màu', 'Làm cho sự vật biến mất', 'Làm cho sự vật nhỏ lại', 'Làm cho sự vật chuyển động'], 'A', 'medium', 2, 1),
  sc('Trăng rằm là mặt trăng vào thời điểm nào?', ['Khi trăng có hình lưỡi liềm', 'Khi trăng tròn và sáng', 'Khi không nhìn thấy trăng', 'Khi mặt trời vừa mọc'], 'B', 'medium', 2, 2),
  sc('Phi công là người làm công việc gì?', ['Điều khiển máy bay', 'Lái tàu biển', 'Lái ô tô', 'Điều khiển tàu hỏa'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào nói về sự chuyển động của mây?', ['"Ai quạt thành gió"', '"Thổi mây ngang trời?"', '"Trăng rằm tròn to"', '"Cuội ngồi gốc đa"'], 'B', 'medium', 2, 4),
  sc('Câu thơ nào miêu tả màu sắc của bầu trời?', ['"Ông sao thì bé"', '"Bầu trời xanh thế?"', '"Phải chăn trâu mãi."', '"Bay lên thăm Cuội?"'], 'B', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau?', ['không – công', 'trời – thế', 'bé – to', 'đa – mãi'], 'A', 'medium', 2, 6, '"không" và "công" cùng vần "ông".'),
  sc('Bạn nhỏ cho rằng vì sao chú phi công bay lên thăm Cuội?', ['Vì Cuội đang bị ốm', 'Vì Cuội buồn và phải chăn trâu mãi', 'Vì Cuội muốn đi học', 'Vì Cuội bị lạc đường'], 'B', 'medium', 2, 7),
  sc('Trong bài thơ, bạn nhỏ hỏi về những sự vật nào trên bầu trời?', ['Gió, mây, bầu trời, sao và trăng', 'Sông, suối, biển và hồ', 'Cây, hoa, cỏ và lá', 'Nhà, đường, xe và trường học'], 'A', 'medium', 2, 8),
  sc('Dòng nào gồm toàn những hiện tượng hoặc sự vật thiên nhiên?', ['Gió, mây, sao, trăng', 'Phi công, máy bay, ngôi nhà', 'Bàn, ghế, sách, vở', 'Trường học, công viên, đường phố'], 'A', 'medium', 2, 9),
  sc('Bài thơ do ai sáng tác?', ['Nguyễn Lãm Thắng', 'Nguyễn Xuân Bồi', 'Thụy Anh', 'Hải An'], 'B', 'medium', 2, 10),
  sc('Bạn nhỏ trong bài thơ là người như thế nào?', ['Ham hiểu biết và có trí tưởng tượng phong phú', 'Không quan tâm đến thiên nhiên', 'Chỉ thích chơi một mình', 'Không muốn hỏi người lớn'], 'A', 'hard', 3, 1),
  sc('Vì sao bạn nhỏ liên tục hỏi mẹ?', ['Vì bạn muốn tìm hiểu những điều mình quan sát được', 'Vì bạn không muốn đi ngủ', 'Vì bạn muốn mẹ mua đồ chơi', 'Vì bạn đang giận mẹ'], 'A', 'hard', 3, 2),
  sc('Hình ảnh "Ai quạt thành gió" thể hiện điều gì?', ['Cách tưởng tượng hồn nhiên của trẻ nhỏ về nguồn gốc của gió', 'Có một người thật đang dùng quạt ngoài trời', 'Gió chỉ xuất hiện khi có quạt điện', 'Gió được tạo ra từ máy bay'], 'A', 'hard', 3, 3),
  sc('Hình ảnh "Ai nhuộm mẹ ơi, bầu trời xanh thế?" cho thấy bạn nhỏ cảm nhận bầu trời như thế nào?', ['Bầu trời rất đẹp và xanh trong', 'Bầu trời tối tăm và đáng sợ', 'Bầu trời không có màu sắc', 'Bầu trời rất thấp'], 'A', 'hard', 3, 4),
  sc('Vì sao sao nhìn nhỏ hơn trăng khi quan sát từ mặt đất?', ['Vì các ngôi sao ở rất xa Trái Đất', 'Vì sao nhỏ hơn hạt cát', 'Vì trăng nằm ngay trên mái nhà', 'Vì sao không phát sáng'], 'A', 'hard', 3, 5),
  sc('Chi tiết nào thể hiện rõ nhất tình cảm của bạn nhỏ dành cho Cuội?', ['Bạn lo Cuội buồn vì phải chăn trâu mãi', 'Bạn hỏi ai làm ra gió', 'Bạn thấy bầu trời xanh', 'Bạn quan sát những ngôi sao'], 'A', 'hard', 3, 6),
  sc('Nội dung nào không được bạn nhỏ hỏi trong bài thơ?', ['Vì sao có gió', 'Vì sao bầu trời có màu xanh', 'Vì sao trăng to hơn sao', 'Vì sao trời có cầu vồng'], 'D', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: bạn nhỏ / về thiên nhiên / hỏi mẹ / nhiều điều',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'bạn nhỏ' },
      { key: '2', text: 'về thiên nhiên' },
      { key: '3', text: 'hỏi mẹ' },
      { key: '4', text: 'nhiều điều' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Bạn nhỏ hỏi mẹ nhiều điều về thiên nhiên
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Bạn nhỏ hỏi mẹ nhiều điều về thiên nhiên".',
  },
  sc('Khi có điều chưa hiểu về thiên nhiên, em nên làm gì?', ['Quan sát, đặt câu hỏi và tìm hiểu từ người lớn hoặc sách', 'Không cần quan tâm', 'Tự đưa ra câu trả lời rồi cho là đúng', 'Chỉ hỏi bạn nhỏ hơn mình'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Những câu hỏi hồn nhiên, giàu tưởng tượng của bạn nhỏ về thiên nhiên và chú Cuội', 'Kể về công việc hằng ngày của phi công', 'Giải thích cách tạo ra gió và mây', 'Miêu tả một chuyến bay lên Mặt Trăng'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B42 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
