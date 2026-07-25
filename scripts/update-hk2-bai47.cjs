require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Lính cứu ho%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Xe cứu thương', 'Lính cứu hoả', 'Người bảo vệ', 'Ngôi nhà cao tầng'], 'B', 'easy', 1, 1),
  sc('Âm thanh nào vang lên khi xảy ra cháy?', ['Tiếng trống trường', 'Chuông báo cháy', 'Tiếng chim hót', 'Tiếng nhạc'], 'B', 'easy', 1, 2),
  sc('Những người đi dập tắt đám cháy được gọi là gì?', ['Lính cứu hoả', 'Bác sĩ', 'Giáo viên', 'Công nhân'], 'A', 'easy', 1, 3),
  sc('Xe cứu hoả có màu gì?', ['Màu xanh', 'Màu vàng', 'Màu đỏ', 'Màu trắng'], 'C', 'easy', 1, 4),
  sc('Xe cứu hoả chở đầy gì?', ['Đất', 'Nước', 'Cát', 'Gạo'], 'B', 'easy', 1, 5),
  sc('Khi chạy đến nơi có cháy, xe cứu hoả làm gì?', ['Tắt đèn và đi chậm', 'Bật đèn báo hiệu và rú còi', 'Dừng lại giữa đường', 'Không phát ra âm thanh'], 'B', 'easy', 1, 6),
  sc('Lính cứu hoả dùng vật gì để phun nước?', ['Vòi phun nước', 'Chiếc chổi', 'Chiếc ô', 'Cái xẻng'], 'A', 'easy', 1, 7),
  sc('Lính cứu hoả phun nước để làm gì?', ['Tưới cây', 'Rửa xe', 'Dập tắt đám cháy', 'Làm sạch đường'], 'C', 'easy', 1, 8),
  sc('Lính cứu hoả đội gì trên đầu?', ['Mũ', 'Khăn', 'Nón lá', 'Vòng hoa'], 'A', 'easy', 1, 9),
  sc('Công việc cứu hoả như thế nào?', ['Rất nguy hiểm', 'Rất nhàn', 'Không cần sức khoẻ', 'Chỉ làm vào ban ngày'], 'A', 'easy', 1, 10),
  sc('Trang phục của lính cứu hoả gồm những gì?', ['Quần áo chữa cháy, ủng, găng và mũ', 'Áo mưa, dép và ô', 'Áo trắng, giày thể thao và cặp sách', 'Áo khoác, khăn quàng và nón lá'], 'A', 'medium', 2, 1),
  sc('Lính cứu hoả đi gì ở chân?', ['Dép', 'Ủng', 'Guốc', 'Giày vải'], 'B', 'medium', 2, 2),
  sc('Lính cứu hoả đeo gì để bảo vệ bàn tay?', ['Đồng hồ', 'Vòng tay', 'Găng', 'Khăn'], 'C', 'medium', 2, 3),
  sc('Từ "hoả hoạn" có nghĩa là gì?', ['Một trận mưa lớn', 'Một vụ cháy gây nguy hiểm', 'Một cơn gió mạnh', 'Một vụ tắc đường'], 'B', 'medium', 2, 4),
  sc('Từ "sẵn sàng" trong bài cho biết lính cứu hoả như thế nào?', ['Luôn chuẩn bị để làm nhiệm vụ', 'Không muốn làm việc', 'Chỉ làm việc khi rảnh', 'Thường đến muộn'], 'A', 'medium', 2, 5),
  sc('Khi nghe chuông báo cháy, những người lính cứu hoả làm gì?', ['Lập tức mặc trang phục rồi lao ra xe', 'Ngồi nghỉ tại chỗ', 'Đi về nhà', 'Chờ đến ngày hôm sau'], 'A', 'medium', 2, 6),
  sc('Khi lính cứu hoả đến nơi, ngọn lửa như thế nào?', ['Đã tắt hoàn toàn', 'Mỗi lúc một lớn', 'Chỉ còn một đốm nhỏ', 'Không còn khói'], 'B', 'medium', 2, 7),
  sc('Lính cứu hoả cứu những gì cho người dân?', ['Tính mạng và tài sản', 'Sách vở và đồ chơi', 'Cây cối và hoa quả', 'Chỉ các phương tiện giao thông'], 'A', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Giống như xe cứu hoả, xe cứu thương cũng có (…).', ['tài sản', 'đèn báo hiệu', 'tính mạng', 'chuyên dụng'], 'B', 'medium', 2, 9),
  sc('Chọn từ thích hợp để hoàn thành câu: Chúng ta cần bảo vệ (…) của nhà trường.', ['sẵn sàng', 'tính mạng', 'tài sản', 'đèn báo hiệu'], 'C', 'medium', 2, 10),
  sc('Thứ tự nào đúng với hoạt động của lính cứu hoả?', ['Nghe chuông báo cháy → mặc trang phục → lên xe → đến nơi cháy → phun nước', 'Phun nước → nghe chuông → mặc trang phục → về nhà', 'Lên xe → đi ngủ → nghe chuông → phun nước', 'Đến nơi cháy → mặc trang phục → nghe chuông'], 'A', 'hard', 3, 1),
  sc('Vì sao xe cứu hoả phải bật đèn báo hiệu và rú còi?', ['Để mọi người nhận biết và nhường đường cho xe nhanh chóng đến nơi cháy', 'Để làm cho đường phố ồn ào', 'Để mọi người đi theo xe', 'Để trang trí cho chiếc xe'], 'A', 'hard', 3, 2),
  sc('Vì sao lính cứu hoả cần mặc quần áo chữa cháy, đi ủng và đeo găng?', ['Để bảo vệ cơ thể khi làm việc ở nơi nguy hiểm', 'Để quần áo trông đẹp hơn', 'Để tham gia biểu diễn', 'Để đi chơi ngoài trời'], 'A', 'hard', 3, 3),
  sc('Những từ ngữ nào phù hợp để miêu tả người lính cứu hoả?', ['Dũng cảm, nhanh nhẹn và khoẻ mạnh', 'Nhút nhát, chậm chạp và yếu ớt', 'Lười biếng và thiếu trách nhiệm', 'Buồn ngủ và mệt mỏi'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào thể hiện lòng dũng cảm của lính cứu hoả?', ['Họ quên mình cứu tính mạng và tài sản của người dân', 'Họ lái chiếc xe màu đỏ', 'Họ đội mũ và đi ủng', 'Họ đứng bên xe cứu hoả'], 'A', 'hard', 3, 5),
  sc('Dãy nào lần lượt điền đúng vần oa hoặc uê? t… nhà – trí t… – kh… cửa', ['tòa nhà – trí tuệ – khóa cửa', 'tùê nhà – trí toa – khuê cửa', 'tòa nhà – trí toa – khóa cửa', 'tuệ nhà – trí tuệ – khoa cửa'], 'A', 'hard', 3, 6, 'Viết đúng: "tòa nhà – trí tuệ – khóa cửa".'),
  sc('Dãy nào lần lượt điền đúng vần ưu hoặc iu? c… giúp – nặng tr… – l… ý', ['cứu giúp – nặng trĩu – lưu ý', 'cíu giúp – nặng trữu – liu ý', 'cứu giúp – nặng trữu – liu ý', 'cíu giúp – nặng trĩu – lưu ý'], 'A', 'hard', 3, 7, 'Viết đúng: "cứu giúp – nặng trĩu – lưu ý".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: dùng vòi phun nước / lính cứu hoả / đám cháy / dập tắt',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'dùng vòi phun nước' },
      { key: '2', text: 'lính cứu hoả' },
      { key: '3', text: 'đám cháy' },
      { key: '4', text: 'dập tắt' },
    ],
    correctAnswerJson: ['2', '1', '4', '3'], // Lính cứu hoả dùng vòi phun nước dập tắt đám cháy
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Lính cứu hoả dùng vòi phun nước dập tắt đám cháy".',
  },
  sc('Tên nào phù hợp nhất với hình người lính cứu hoả?', ['Người lính cứu hoả dũng cảm', 'Người lái xe buýt', 'Chú bảo vệ trường học', 'Bác sĩ tận tâm'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Giới thiệu công việc nguy hiểm, khẩn trương và dũng cảm của những người lính cứu hoả', 'Hướng dẫn cách lái xe cứu hoả', 'Kể về một chuyến đi chơi ở thành phố', 'Giới thiệu những toà nhà cao tầng'], 'A', 'hard', 3, 10),
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
    console.log('LINHCUUHOA XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
