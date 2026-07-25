require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Cây bàng và lớp học%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Cây bàng trước sân', 'Cây bàng và lớp học', 'Ngôi trường của em', 'Tán lá xanh'], 'B', 'easy', 1, 1),
  sc('Bên cửa lớp học có cây gì?', ['Cây phượng', 'Cây xoan', 'Cây bàng', 'Cây tre'], 'C', 'easy', 1, 2),
  sc('Cây bàng trong bài là cây bàng như thế nào?', ['Cây bàng non', 'Cây bàng già', 'Cây bàng nhỏ', 'Cây bàng mới trồng'], 'B', 'easy', 1, 3),
  sc('Tán lá bàng xòe ra giống vật gì?', ['Chiếc quạt', 'Chiếc nón', 'Chiếc ô', 'Chiếc thuyền'], 'C', 'easy', 1, 4),
  sc('Tán lá bàng có màu gì?', ['Đỏ thắm', 'Xanh mượt', 'Vàng óng', 'Trắng muốt'], 'B', 'easy', 1, 5),
  sc('Cây bàng ghé vào đâu?', ['Cửa lớp', 'Cổng trường', 'Phòng thư viện', 'Sân thể thao'], 'A', 'easy', 1, 6),
  sc('Cây bàng ghé cửa lớp để nghe ai giảng bài?', ['Thầy hiệu trưởng', 'Cô giáo', 'Các bạn học sinh', 'Bác bảo vệ'], 'B', 'easy', 1, 7),
  sc('Khi nào lớp học vắng?', ['Sáng thứ hai', 'Buổi trưa', 'Cuối tuần', 'Đầu năm học'], 'C', 'easy', 1, 8),
  sc('Khi lớp học vắng, tán bàng như thế nào?', ['Vui mừng', 'Ngơ ngác', 'Tức giận', 'Sợ hãi'], 'B', 'easy', 1, 9),
  sc('Khi thứ hai trở lại, lớp học như thế nào?', ['Vắng lặng', 'Tối tăm', 'Tưng bừng', 'Lạnh lẽo'], 'C', 'easy', 1, 10),
  sc('Từ "xanh mượt" miêu tả tán lá như thế nào?', ['Xanh tốt, mềm mại và đẹp mắt', 'Khô héo và rụng hết', 'Đỏ rực và cứng', 'Vàng úa, xơ xác'], 'A', 'medium', 2, 1),
  sc('Từ "ngơ ngác" nói lên trạng thái nào?', ['Bối rối, ngạc nhiên vì không thấy cảnh quen thuộc', 'Rất vui và phấn khởi', 'Tức giận, khó chịu', 'Buồn ngủ, mệt mỏi'], 'A', 'medium', 2, 2),
  sc('Từ "tưng bừng" miêu tả không khí như thế nào?', ['Vui vẻ, nhộn nhịp', 'Yên tĩnh, vắng vẻ', 'Buồn bã, lạnh lẽo', 'Tối tăm, đáng sợ'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào miêu tả tán lá cây bàng?', ['"Có cây bàng già"', '"Tán lá xòe ra"', '"Nghe cô giảng bài"', '"Không bạn vui đùa"'], 'B', 'medium', 2, 4),
  sc('Câu thơ nào cho biết cây bàng yêu thích việc học?', ['"Bàng ghé cửa lớp"', '"Cuối tuần, lớp vắng"', '"Tán bàng ngơ ngác"', '"Thứ hai trở lại"'], 'A', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau?', ['già – ra', 'học – mượt', 'lớp – bài', 'cô – ngác'], 'A', 'medium', 2, 6, '"già" và "ra" cùng vần "a".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['bài – mai', 'lớp – nắng', 'cô – đùa', 'học – xanh'], 'A', 'medium', 2, 7, '"bài" và "mai" cùng vần "ai".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['nắng – vắng', 'già – mượt', 'lớp – cô', 'đùa – ngác'], 'A', 'medium', 2, 8, '"nắng" và "vắng" cùng vần "ăng".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['bừng – mừng', 'trở – chào', 'xanh – bạn', 'hai – lớp'], 'A', 'medium', 2, 9, '"bừng" và "mừng" cùng vần "ưng".'),
  sc('Khi thứ hai trở lại, tán bàng làm gì?', ['Rụng hết lá', 'Vẫy chào các bạn', 'Quay lưng với lớp', 'Che kín cửa sổ'], 'B', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Giới thiệu cây bàng → cây nghe cô giảng bài → lớp vắng cuối tuần → thứ hai lớp vui trở lại', 'Lớp vắng → cây bàng được trồng → cô giáo đến lớp → cây rụng lá', 'Thứ hai lớp vui → cuối tuần lớp vắng → cây bàng mới xuất hiện', 'Cây bàng rụng lá → lớp học đóng cửa → các bạn về trường'], 'A', 'hard', 3, 1),
  sc('Vì sao tán bàng ngơ ngác vào cuối tuần?', ['Vì không thấy cô giáo và các bạn trong lớp', 'Vì trời có mưa lớn', 'Vì cây bàng bị chặt cành', 'Vì sân trường có nhiều người lạ'], 'A', 'hard', 3, 2),
  sc('Vì sao tán bàng vui mừng khi thứ hai trở lại?', ['Vì lại được gặp cô giáo và các bạn học sinh', 'Vì được tưới rất nhiều nước', 'Vì có người mang đồ chơi đến', 'Vì cây được chuyển sang nơi khác'], 'A', 'hard', 3, 3),
  sc('Câu thơ "Bàng ghé cửa lớp" khiến cây bàng giống như ai?', ['Một học sinh muốn nghe giảng bài', 'Một người bán hàng', 'Một người đang ngủ', 'Một chú chim đang bay'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Tán xanh vui mừng, vẫy chào các bạn" cho thấy cây bàng có tình cảm gì?', ['Yêu quý và mong chờ các bạn học sinh', 'Không muốn các bạn đến lớp', 'Sợ hãi khi nhìn thấy học sinh', 'Giận dữ với lớp học'], 'A', 'hard', 3, 5),
  sc('Hình ảnh "Như ô xanh mượt" có tác dụng gì?', ['Giúp người đọc hình dung tán bàng rộng, xanh và có thể che mát', 'Cho biết cây bàng rất thấp', 'Cho biết lá bàng có màu đỏ', 'Miêu tả thân cây giống chiếc ô'], 'A', 'hard', 3, 6),
  sc('Qua bài thơ, cây bàng và lớp học có mối quan hệ như thế nào?', ['Gần gũi, gắn bó với nhau mỗi ngày', 'Hoàn toàn không liên quan đến nhau', 'Cây bàng làm lớp học tối đi', 'Lớp học không thích cây bàng'], 'A', 'hard', 3, 7),
  sc('Nội dung chính của bài thơ là gì?', ['Tình cảm gắn bó giữa cây bàng với cô giáo và các bạn học sinh', 'Cách trồng và chăm sóc cây bàng', 'Những hoạt động trong ngày nghỉ cuối tuần', 'Cách xây dựng một lớp học mới'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: cây bàng / bên cửa lớp học / đứng',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'cây bàng' },
      { key: '2', text: 'bên cửa lớp học' },
      { key: '3', text: 'đứng' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Cây bàng đứng bên cửa lớp học
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Cây bàng đứng bên cửa lớp học".',
  },
  sc('Em nên làm gì để bảo vệ cây xanh trong trường?', ['Tưới cây, không bẻ cành và không giẫm lên gốc cây', 'Khắc tên lên thân cây', 'Hái lá và bẻ cành để chơi', 'Vứt rác quanh gốc cây'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B17 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
