require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bữa cơm gia đình%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Ngày nghỉ của gia đình', 'Bữa cơm gia đình', 'Mẹ đi chợ', 'Cả nhà đi chơi'], 'B', 'easy', 1, 1),
  sc('Ai đi chợ mua nhiều đồ ăn về?', ['Bố', 'Mẹ', 'Bà', 'Chi'], 'B', 'easy', 1, 2),
  sc('Ai hỏi mẹ vì sao mua nhiều đồ ăn?', ['Chi', 'Bố', 'Ông', 'Em bé'], 'A', 'easy', 1, 3),
  sc('Chi chạy lại xem gì?', ['Đồng hồ', 'Lịch', 'Tivi', 'Sách'], 'B', 'easy', 1, 4),
  sc('Ngày Gia đình Việt Nam là ngày nào?', ['Ngày 1 tháng 6', 'Ngày 20 tháng 11', 'Ngày 28 tháng 6', 'Ngày 2 tháng 9'], 'C', 'easy', 1, 5),
  sc('Gia đình Chi tổ chức hoạt động gì?', ['Đi du lịch', 'Liên hoan', 'Thi đấu thể thao', 'Đi xem phim'], 'B', 'easy', 1, 6),
  sc('Chi giúp mẹ làm việc gì?', ['Nhặt rau', 'Nấu cơm', 'Rửa quần áo', 'Quét sân'], 'A', 'easy', 1, 7),
  sc('Ai dọn nhà và rửa xoong nồi, cốc chén?', ['Chi', 'Mẹ', 'Bố', 'Bà'], 'C', 'easy', 1, 8),
  sc('Ông bà giúp gia đình làm gì?', ['Đi mua thức ăn', 'Trông em bé', 'Nấu cơm', 'Dọn bàn ăn'], 'B', 'easy', 1, 9),
  sc('Cả nhà làm gì bên nhau?', ['Quây quần', 'Tranh cãi', 'Đi ngủ', 'Ra ngoài chơi'], 'A', 'easy', 1, 10),
  sc('Từ "liên hoan" có nghĩa là gì?', ['Cùng tổ chức ăn uống, vui vẻ nhân một dịp đặc biệt', 'Cùng nhau đi ngủ', 'Mỗi người làm một việc riêng', 'Đi học đúng giờ'], 'A', 'medium', 2, 1),
  sc('Từ "quây quần" miêu tả cảnh nào?', ['Mọi người tụ họp gần gũi bên nhau', 'Mọi người đi đến nhiều nơi khác nhau', 'Một người ngồi một mình', 'Mọi người đang vội vàng'], 'A', 'medium', 2, 2),
  sc('Chọn từ thích hợp để hoàn thành câu: Buổi tối, gia đình em thường (…) bên nhau.', ['liên hoan', 'quây quần', 'gặp', 'chạy'], 'B', 'medium', 2, 3),
  sc('Vì sao mẹ mua nhiều đồ ăn?', ['Vì nhà sắp có khách', 'Vì gia đình tổ chức liên hoan nhân Ngày Gia đình Việt Nam', 'Vì mẹ muốn mở cửa hàng', 'Vì Chi đòi mua nhiều thức ăn'], 'B', 'medium', 2, 4),
  sc('Câu nào nói đúng việc làm của Chi?', ['Chi rửa xoong nồi.', 'Chi trông em bé.', 'Chi nhặt rau giúp mẹ.', 'Chi đi mua đồ ăn.'], 'C', 'medium', 2, 5),
  sc('Câu nào nói đúng việc làm của bố?', ['Bố dọn nhà và rửa xoong nồi, cốc chén.', 'Bố nhặt rau và nấu cơm.', 'Bố trông em bé và xem lịch.', 'Bố đi chợ mua đồ ăn.'], 'A', 'medium', 2, 6),
  sc('Bức tranh ông và bạn nhỏ cầm sách phù hợp với câu nào?', ['Ông và cháu cùng đọc sách.', 'Ông và cháu cùng nấu ăn.', 'Ông dạy cháu tập xe đạp.', 'Ông và cháu cùng trồng cây.'], 'A', 'medium', 2, 7),
  sc('Bức tranh bố đi bên cạnh bạn nhỏ đang đạp xe phù hợp với câu nào?', ['Bố cùng con đọc sách.', 'Bố dạy con tập xe đạp.', 'Bố cùng con nấu cơm.', 'Bố đưa con đi chợ.'], 'B', 'medium', 2, 8),
  sc('Điền gi hoặc d để tạo thành từ đúng: đôi …ày', ['gi (đôi giày)', 'd (đôi dày)'], 'A', 'medium', 2, 9, 'Viết đúng là "đôi giày".'),
  sc('Điền ng hoặc ngh để tạo thành từ đúng: …ày lễ', ['ng (ngày lễ)', 'ngh (nghày lễ)'], 'A', 'medium', 2, 10, 'Viết đúng là "ngày lễ".'),
  sc('Thứ tự nào đúng với diễn biến bài đọc?', ['Chi xem lịch → mẹ đi chợ về → cả nhà dùng bữa → Chi nhặt rau', 'Mẹ đi chợ về → Chi xem lịch → các thành viên cùng chuẩn bị → cả nhà quây quần dùng bữa', 'Cả nhà dùng bữa → mẹ đi chợ → bố dọn nhà → Chi xem lịch', 'Bố rửa cốc chén → cả nhà đi chợ → ông bà nấu ăn'], 'B', 'hard', 3, 1),
  sc('Vì sao Chi rất vui?', ['Vì Chi được nghỉ học một tháng', 'Vì cả gia đình cùng làm việc và quây quần bên bữa cơm', 'Vì Chi được mua nhiều đồ chơi', 'Vì Chi không phải giúp mẹ'], 'B', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy mọi người trong gia đình biết chia sẻ công việc?', ['Mẹ làm tất cả mọi việc', 'Chi nhặt rau, bố dọn dẹp, ông bà trông em bé', 'Mỗi người ngồi ở một phòng', 'Cả nhà chỉ chờ mẹ nấu ăn'], 'B', 'hard', 3, 3),
  sc('Vì sao Chi mong ngày nào cũng là Ngày Gia đình Việt Nam?', ['Vì Chi muốn ngày nào cũng được nghỉ học', 'Vì Chi thích không khí cả nhà vui vẻ, quây quần bên nhau', 'Vì Chi muốn mẹ mua thật nhiều đồ ăn', 'Vì Chi không muốn làm việc nhà'], 'B', 'hard', 3, 4),
  sc('Câu nào hoàn thành đúng nội dung bài: Vào ngày này, gia đình Chi (…).', ['cùng chuẩn bị bữa ăn và quây quần bên nhau', 'mỗi người đi chơi một nơi', 'chỉ có Chi và mẹ ở nhà', 'không tổ chức hoạt động gì'], 'A', 'hard', 3, 5),
  sc('Điền gi hoặc d vào các chỗ trống để tạo thành những từ đúng: nuôi …ưỡng – tờ …ấy', ['gi – gi', 'd – gi', 'gi – d', 'd – d'], 'B', 'hard', 3, 6, 'Viết đúng là "nuôi dưỡng – tờ giấy".'),
  sc('Điền ng hoặc ngh vào các chỗ trống để tạo thành những từ đúng: …e nhạc – …ỉ ngơi', ['ng – ng', 'ngh – ngh', 'ng – ngh', 'ngh – ng'], 'B', 'hard', 3, 7, 'Viết đúng là "nghe nhạc – nghỉ ngơi".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: gia đình Chi / bên nhau / quây quần',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'gia đình Chi' },
      { key: '2', text: 'bên nhau' },
      { key: '3', text: 'quây quần' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Gia đình Chi quây quần bên nhau
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Gia đình Chi quây quần bên nhau".',
  },
  sc('Việc làm nào thể hiện em biết giúp đỡ gia đình?', ['Giúp nhặt rau, dọn bàn và sắp xếp đồ dùng phù hợp với sức mình', 'Để người lớn làm tất cả mọi việc', 'Vứt đồ chơi bừa bãi trong nhà', 'Chỉ chơi mà không quan tâm đến mọi người'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài đọc là gì?', ['Các thành viên trong gia đình cần yêu thương, chia sẻ công việc và dành thời gian bên nhau', 'Chỉ những ngày lễ gia đình mới cần quan tâm nhau', 'Trẻ em không cần giúp việc nhà', 'Bữa cơm chỉ cần có nhiều món ăn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B11 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
