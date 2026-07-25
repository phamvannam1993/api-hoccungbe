require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Rửa tay trước khi ăn%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Giữ gìn sức khỏe', 'Rửa tay trước khi ăn', 'Ăn chín, uống sôi', 'Em làm bác sĩ'], 'B', 'easy', 1, 1),
  sc('Các bạn trong tranh đang làm gì trước khi ăn?', ['Đánh răng', 'Rửa tay', 'Chải tóc', 'Lau bàn'], 'B', 'easy', 1, 2),
  sc('Vi trùng có ở đâu?', ['Chỉ ở ngoài sân', 'Chỉ ở trong nhà', 'Ở khắp nơi', 'Chỉ ở trên thức ăn'], 'C', 'easy', 1, 3),
  sc('Chúng ta có nhìn thấy vi trùng bằng mắt thường không?', ['Có thể nhìn rất rõ', 'Không nhìn thấy được', 'Chỉ nhìn thấy vào ban đêm', 'Chỉ người lớn nhìn thấy'], 'B', 'easy', 1, 4),
  sc('Khi tay tiếp xúc với đồ vật, thứ gì có thể dính vào tay?', ['Vi trùng', 'Ánh nắng', 'Không khí', 'Tiếng động'], 'A', 'easy', 1, 5),
  sc('Khi tay bẩn cầm thức ăn, vi trùng có thể đi vào đâu?', ['Vào bàn ghế', 'Vào cơ thể', 'Vào quần áo', 'Vào cặp sách'], 'B', 'easy', 1, 6),
  sc('Vi trùng đi vào cơ thể có thể khiến chúng ta thế nào?', ['Cao lớn ngay', 'Mắc bệnh', 'Chạy nhanh hơn', 'Ngủ ngon hơn'], 'B', 'easy', 1, 7),
  sc('Để phòng bệnh, chúng ta cần rửa tay khi nào?', ['Trước khi ăn', 'Trong khi ngủ', 'Sau khi đã ăn xong mới rửa', 'Chỉ vào cuối tuần'], 'A', 'easy', 1, 8),
  sc('Cần rửa tay bằng gì?', ['Chỉ bằng khăn khô', 'Xà phòng và nước sạch', 'Bằng nước ngọt', 'Bằng giấy màu'], 'B', 'easy', 1, 9),
  sc('Sau khi rửa tay sạch, chúng ta nên làm gì?', ['Lau khô tay', 'Bôi đất lên tay', 'Chạm vào rác', 'Vứt xà phòng xuống sàn'], 'A', 'easy', 1, 10),
  sc('Từ "vi trùng" trong bài chỉ gì?', ['Những sinh vật rất nhỏ có thể gây bệnh', 'Một loại đồ chơi', 'Một món ăn', 'Một loại cây'], 'A', 'medium', 2, 1),
  sc('Từ "tiếp xúc" có nghĩa là gì?', ['Chạm hoặc gần với một vật', 'Chạy thật nhanh', 'Ngồi yên một chỗ', 'Nói thật nhỏ'], 'A', 'medium', 2, 2),
  sc('Từ "mắc bệnh" có nghĩa là gì?', ['Bị ốm', 'Được khen', 'Khỏe hơn', 'Đi chơi'], 'A', 'medium', 2, 3),
  sc('Từ "phòng bệnh" có nghĩa là gì?', ['Làm những việc giúp tránh bị bệnh', 'Đi vào phòng ngủ', 'Chơi trong nhà', 'Uống thật nhiều nước ngọt'], 'A', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Ăn chín, uống sôi để (…).', ['vi trùng', 'rửa tay', 'phòng bệnh', 'vui chơi'], 'C', 'medium', 2, 5),
  sc('Tranh số 1 trong phần hướng dẫn rửa tay phù hợp với từ nào?', ['Xà phòng', 'Lau khô', 'Gấp quần áo', 'Chải tóc'], 'A', 'medium', 2, 6),
  sc('Tranh số 2 trong phần hướng dẫn rửa tay thể hiện việc gì?', ['Chà xát hai bàn tay', 'Lau bàn', 'Cầm thức ăn', 'Đeo găng tay'], 'A', 'medium', 2, 7),
  sc('Tranh số 3 trong phần hướng dẫn rửa tay thể hiện việc gì?', ['Rửa sạch tay dưới vòi nước', 'Bôi màu lên tay', 'Lau khô tay', 'Cầm bánh ăn'], 'A', 'medium', 2, 8),
  sc('Tranh số 4 trong phần hướng dẫn rửa tay thể hiện việc gì?', ['Chà xà phòng', 'Lau khô tay', 'Mở vòi nước', 'Chơi với nước'], 'B', 'medium', 2, 9),
  sc('Câu nào nói đúng đường đi của vi trùng?', ['Đồ vật → bàn tay → thức ăn → cơ thể', 'Cơ thể → thức ăn → bàn tay → đồ vật', 'Bàn tay → quần áo → bàn học', 'Thức ăn → đồ chơi → sân trường'], 'A', 'medium', 2, 10),
  sc('Vì sao chỉ nhìn tay sạch bằng mắt chưa chắc tay đã thật sạch?', ['Vì vi trùng rất nhỏ, mắt thường không nhìn thấy được', 'Vì bàn tay luôn có màu trắng', 'Vì nước làm tay sáng hơn', 'Vì xà phòng không có màu'], 'A', 'hard', 3, 1),
  sc('Vì sao cần rửa tay trước khi cầm thức ăn?', ['Để loại bỏ vi trùng, tránh đưa chúng vào cơ thể', 'Để tay có mùi thơm lâu hơn', 'Để thức ăn ngon hơn ngay lập tức', 'Để không cần dùng thìa'], 'A', 'hard', 3, 2),
  sc('Thứ tự nào đúng khi rửa tay?', ['Dùng xà phòng → chà xát → rửa sạch → lau khô', 'Lau khô → chà xát → ăn → rửa', 'Ăn trước → dùng xà phòng → lau khô', 'Chạm vào đồ bẩn → lau qua quần áo → ăn'], 'A', 'hard', 3, 3),
  sc('Bạn nhỏ vừa chơi đồ chơi dưới sàn rồi muốn ăn bánh. Bạn nên làm gì trước?', ['Rửa tay bằng xà phòng và nước sạch', 'Ăn bánh ngay', 'Lau tay vào áo', 'Thổi vào hai bàn tay'], 'A', 'hard', 3, 4),
  sc('Câu nào hoàn thành đúng nội dung bài: Để phòng bệnh, chúng ta phải (…).', ['rửa tay trước khi ăn', 'ăn bằng tay bẩn', 'không dùng nước sạch', 'chạm vào nhiều đồ vật'], 'A', 'hard', 3, 5),
  sc('Điền tr hoặc ch để tạo thành các từ đúng: vi …ùng – …à xát – nhanh …óng', ['tr – ch – ch', 'ch – tr – tr', 'tr – tr – ch', 'ch – ch – tr'], 'A', 'hard', 3, 6, 'Viết đúng: "vi trùng – chà xát – nhanh chóng".'),
  sc('Điền gh hoặc g để tạo thành các từ đúng: …i nhớ – cố …ắng – gọn …ẽ', ['g – gh – g', 'gh – g – gh', 'gh – gh – g', 'g – g – gh'], 'B', 'hard', 3, 7, 'Viết đúng: "ghi nhớ – cố gắng – gọn ghẽ".'),
  sc('Điền r, d hoặc gi để tạo thành các từ đúng: …a dẻ – …ửa tay – …ữ gìn', ['r – d – gi', 'd – r – gi', 'gi – r – d', 'd – gi – r'], 'B', 'hard', 3, 8, 'Viết đúng: "da dẻ – rửa tay – giữ gìn".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: trước khi ăn / chúng ta / rửa tay / cần',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'trước khi ăn' },
      { key: '2', text: 'chúng ta' },
      { key: '3', text: 'rửa tay' },
      { key: '4', text: 'cần' },
    ],
    correctAnswerJson: ['2', '4', '3', '1'], // Chúng ta cần rửa tay trước khi ăn
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Chúng ta cần rửa tay trước khi ăn".',
  },
  sc('Bài học quan trọng nhất của bài đọc là gì?', ['Cần rửa tay đúng cách bằng xà phòng và nước sạch để phòng bệnh', 'Chỉ cần rửa tay khi nhìn thấy tay bẩn', 'Có thể dùng tay bẩn để cầm thức ăn', 'Lau tay vào quần áo là đủ sạch'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B21 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
