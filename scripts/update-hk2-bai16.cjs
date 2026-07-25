require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Hoa yêu thương%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Bông hoa của lớp', 'Hoa yêu thương', 'Cô giáo của em', 'Góc sáng tạo'], 'B', 'easy', 1, 1),
  sc('Cô giáo cho cả lớp làm gì?', ['Hát một bài', 'Vẽ những gì mình yêu thích', 'Viết một bài văn', 'Trồng một cây hoa'], 'B', 'easy', 1, 2),
  sc('Tuệ An vẽ nhân vật nào?', ['Mèo máy', 'Siêu nhân', 'Cô giáo', 'Chú bộ đội'], 'B', 'easy', 1, 3),
  sc('Siêu nhân của Tuệ An mặc áo màu gì?', ['Màu xanh', 'Màu vàng', 'Màu đỏ', 'Màu trắng'], 'C', 'easy', 1, 4),
  sc('Thắt lưng của siêu nhân có màu gì?', ['Màu vàng', 'Màu đỏ', 'Màu tím', 'Màu đen'], 'A', 'easy', 1, 5),
  sc('Gia Huy vẽ gì?', ['Một con mèo thật', 'Một chú mèo máy', 'Một bông hoa', 'Một ngôi nhà'], 'B', 'easy', 1, 6),
  sc('Ai vẽ bông hoa bốn cánh?', ['Tuệ An', 'Gia Huy', 'Hà', 'Cô giáo'], 'C', 'easy', 1, 7),
  sc('Bông hoa trong tranh của Hà có bao nhiêu cánh?', ['Hai cánh', 'Ba cánh', 'Bốn cánh', 'Năm cánh'], 'C', 'easy', 1, 8),
  sc('Ở giữa nhụy hoa có hình ảnh của ai?', ['Hà', 'Cô giáo', 'Tuệ An', 'Gia Huy'], 'B', 'easy', 1, 9),
  sc('Bức tranh được treo ở đâu?', ['Ngoài hành lang', 'Trong thư viện', 'Ở góc sáng tạo của lớp', 'Trong phòng giáo viên'], 'C', 'easy', 1, 10),
  sc('Từ "hí hoáy" miêu tả hoạt động như thế nào?', ['Chăm chú làm một việc bằng tay', 'Chạy nhảy rất nhanh', 'Nói chuyện thật to', 'Ngồi im không làm gì'], 'A', 'medium', 2, 1),
  sc('Từ "say sưa" cho biết Gia Huy vẽ như thế nào?', ['Chăm chú và rất thích thú', 'Vội vàng, không cẩn thận', 'Buồn ngủ và mệt mỏi', 'Không muốn tiếp tục vẽ'], 'A', 'medium', 2, 2),
  sc('Từ "tỉ mỉ" có nghĩa là gì?', ['Làm cẩn thận từng chi tiết nhỏ', 'Làm thật nhanh cho xong', 'Làm qua loa, không chú ý', 'Không hoàn thành công việc'], 'A', 'medium', 2, 3),
  sc('Từ "nắn nót" miêu tả cách viết như thế nào?', ['Viết cẩn thận, ngay ngắn', 'Viết thật nhanh', 'Viết nguệch ngoạc', 'Viết bằng phấn màu'], 'A', 'medium', 2, 4),
  sc('Trên mỗi cánh hoa ghi nội dung gì?', ['Tên một bạn trong lớp', 'Tên một tổ trong lớp', 'Tên một môn học', 'Tên một loài hoa'], 'B', 'medium', 2, 5),
  sc('Lớp của Hà có bao nhiêu tổ?', ['Hai tổ', 'Ba tổ', 'Bốn tổ', 'Năm tổ'], 'C', 'medium', 2, 6),
  sc('Dòng chữ nào được viết bên dưới bông hoa?', ['Lớp em đoàn kết', 'Cô giáo của em', 'Hoa yêu thương', 'Chúng em đi học'], 'C', 'medium', 2, 7),
  sc('Cuối giờ, các bạn làm gì với những bức tranh?', ['Cất tranh vào cặp', 'Mang tranh đính lên bảng', 'Đem tranh về nhà', 'Xé tranh để làm đồ chơi'], 'B', 'medium', 2, 8),
  sc('Tiếng nào dưới đây chứa vần oay?', ['hoáy', 'hoa', 'yêu', 'nhụy'], 'A', 'medium', 2, 9, '"hoáy" có vần "oay".'),
  sc('Dãy nào gồm toàn các tiếng chứa vần oay?', ['xoay, hoáy, loay hoay', 'hoa, họa, hòa', 'yêu, yếu, chiều', 'sáng, tạo, lớp'], 'A', 'medium', 2, 10),
  sc('Vì sao mọi ánh mắt đều hướng về bức tranh của Hà?', ['Vì bức tranh thể hiện cô giáo và tất cả các tổ trong lớp', 'Vì Hà vẽ một siêu nhân rất lớn', 'Vì bức tranh có nhiều đồ chơi', 'Vì Hà dùng nhiều giấy hơn các bạn'], 'A', 'hard', 3, 1),
  sc('Vì sao ai cũng thấy có mình trong bức tranh?', ['Vì mỗi cánh hoa ghi tên một tổ trong lớp', 'Vì Hà vẽ riêng khuôn mặt từng bạn', 'Vì các bạn cùng tô màu bức tranh', 'Vì mọi bạn đều ngồi cạnh Hà'], 'A', 'hard', 3, 2),
  sc('Hình ảnh cô giáo ở giữa nhụy hoa thể hiện điều gì?', ['Cô giáo là người gắn kết và yêu thương cả lớp', 'Cô giáo chỉ yêu một tổ', 'Cô giáo muốn giữ bức tranh cho riêng mình', 'Cô giáo không tham gia hoạt động của lớp'], 'A', 'hard', 3, 3),
  sc('Bốn cánh hoa tượng trưng cho điều gì?', ['Bốn mùa trong năm', 'Bốn tổ trong lớp', 'Bốn môn học', 'Bốn cô giáo'], 'B', 'hard', 3, 4),
  sc('Chi tiết nào cho thấy Hà rất cẩn thận khi làm tranh?', ['Hà viết dòng chữ "Hoa yêu thương" nắn nót', 'Hà mang tranh lên bảng cuối cùng', 'Hà dùng một tờ giấy nhỏ', 'Hà không tô màu bức tranh'], 'A', 'hard', 3, 5),
  sc('Thứ tự nào đúng với diễn biến bài đọc?', ['Cô giáo giao bài → các bạn vẽ → mang tranh lên bảng → cả lớp chú ý đến tranh của Hà → treo tranh ở góc sáng tạo', 'Các bạn treo tranh → cô giáo giao bài → Hà bắt đầu vẽ', 'Hà mang tranh về nhà → cô giáo giao bài → cả lớp nghỉ học', 'Cô giáo vẽ tranh → Hà tô màu → Gia Huy treo tranh'], 'A', 'hard', 3, 6),
  sc('Tên nào dưới đây cũng phù hợp với bức tranh của Hà?', ['Lớp học đoàn kết', 'Siêu nhân áo đỏ', 'Chú mèo máy', 'Chiếc rìu cong'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: Hà / bông hoa bốn cánh / vẽ / rất đẹp',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'Hà' },
      { key: '2', text: 'bông hoa bốn cánh' },
      { key: '3', text: 'vẽ' },
      { key: '4', text: 'rất đẹp' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Hà vẽ bông hoa bốn cánh rất đẹp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Hà vẽ bông hoa bốn cánh rất đẹp".',
  },
  sc('Việc treo tranh ở góc sáng tạo có ý nghĩa gì?', ['Giúp cả lớp cùng ngắm, trân trọng và ghi nhớ sản phẩm sáng tạo', 'Để che khuất bảng lớp', 'Để không ai nhìn thấy tranh', 'Để chuẩn bị mang tranh bỏ đi'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài đọc là gì?', ['Các thành viên trong lớp cần yêu thương, đoàn kết và trân trọng nhau', 'Chỉ những bạn vẽ đẹp mới được yêu quý', 'Mỗi tổ nên hoạt động riêng, không cần hợp tác', 'Không nên trưng bày sản phẩm của học sinh'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B16 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
