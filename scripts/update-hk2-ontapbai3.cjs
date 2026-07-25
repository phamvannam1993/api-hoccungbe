require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập và đánh giá - Bài tập số 3%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Ngày đầu đi học', 'Gửi lời chào lớp Một', 'Cô giáo của em', 'Mái trường mến yêu'], 'B', 'easy', 1, 1),
  sc('Bài thơ là lời chào của ai?', ['Các bạn học sinh sắp chia tay lớp Một', 'Cô giáo mới đến trường', 'Các bạn chuẩn bị vào lớp Một', 'Bác bảo vệ trường học'], 'A', 'easy', 1, 2),
  sc('Lớp Một đã đón bạn nhỏ vào thời gian nào?', ['Sáng nay', 'Năm trước', 'Tháng trước', 'Hôm qua'], 'B', 'easy', 1, 3),
  sc('Hiện tại đã đến giờ phút gì?', ['Khai giảng', 'Ra chơi', 'Chia tay', 'Vào lớp'], 'C', 'easy', 1, 4),
  sc('Đồ vật nào được bạn nhỏ chào trong bài thơ?', ['Bảng đen', 'Chiếc xe đạp', 'Quả bóng', 'Cây đàn'], 'A', 'easy', 1, 5),
  sc('Bạn nhỏ chào bộ phận nào của lớp học?', ['Cổng trường', 'Cửa sổ', 'Sân bóng', 'Vườn hoa'], 'B', 'easy', 1, 6),
  sc('Bạn nhỏ chào nơi nào đã trở nên thân quen?', ['Chỗ ngồi', 'Nhà ăn', 'Phòng y tế', 'Thư viện'], 'A', 'easy', 1, 7),
  sc('Bạn nhỏ chào người nào với tình cảm kính mến?', ['Bác bảo vệ', 'Cô giáo', 'Người hàng xóm', 'Bác sĩ'], 'B', 'easy', 1, 8),
  sc('Lớp Một sẽ tiếp tục đón ai?', ['Các thầy cô mới', 'Các bạn nhỏ lên', 'Những người khách', 'Các anh chị lớp lớn'], 'B', 'easy', 1, 9),
  sc('Bài thơ do ai viết?', ['Hữu Tưởng', 'Thái Dương', 'Nguyễn Đình Thi', 'Lâm Anh'], 'A', 'easy', 1, 10),
  sc('Bạn nhỏ gửi lời chào lớp Một để làm gì?', ['Để tiến bước lên lớp mới', 'Để nghỉ học', 'Để chuyển sang trường khác', 'Để đi du lịch'], 'A', 'medium', 2, 1),
  sc('Những đồ vật nào ở lớp được nhắc đến trong bài?', ['Bảng đen, cửa sổ và chỗ ngồi', 'Bút chì, cặp sách và thước kẻ', 'Bàn giáo viên, trống trường và cổng trường', 'Quạt điện, máy tính và giá sách'], 'A', 'medium', 2, 2),
  sc('Cụm từ "chỗ ngồi thân quen" cho thấy điều gì?', ['Bạn nhỏ đã gắn bó với lớp học', 'Bạn nhỏ chưa từng ngồi ở đó', 'Bạn nhỏ không thích lớp học', 'Chỗ ngồi vừa được thay mới'], 'A', 'medium', 2, 3),
  sc('Từ "kính mến" thể hiện tình cảm nào của học sinh đối với cô giáo?', ['Kính trọng và yêu quý', 'Sợ hãi và lo lắng', 'Giận dữ và khó chịu', 'Xa lạ và thờ ơ'], 'A', 'medium', 2, 4),
  sc('Bạn nhỏ cần làm gì để cô giáo luôn ở bên mình?', ['Làm theo lời cô dạy', 'Không làm bài tập', 'Nghỉ học thường xuyên', 'Chỉ vui chơi cả ngày'], 'A', 'medium', 2, 5),
  sc('Câu thơ nào cho biết học sinh sắp rời lớp Một?', ['"Đón em vào năm trước"', '"Nay giờ phút chia tay"', '"Chào bảng đen, cửa sổ"', '"Đón các bạn nhỏ lên"'], 'B', 'medium', 2, 6),
  sc('Câu thơ nào thể hiện lời hứa của học sinh với cô giáo?', ['"Làm theo lời cô dạy"', '"Chào bảng đen, cửa sổ"', '"Đón em vào năm trước"', '"Gửi lời chào tiến bước"'], 'A', 'medium', 2, 7),
  sc('Vì sao cô giáo vẫn có thể "luôn ở bên" dù cô trò sắp xa nhau?', ['Vì lời dạy của cô vẫn được học sinh ghi nhớ và làm theo', 'Vì cô chuyển đến sống cùng học sinh', 'Vì học sinh không lên lớp mới', 'Vì cô luôn đứng ngoài cửa lớp'], 'A', 'medium', 2, 8),
  sc('Khổ thơ đầu được lặp lại ở đâu?', ['Cuối bài thơ', 'Giữa khổ thơ thứ hai', 'Ngay sau nhan đề', 'Không được lặp lại'], 'A', 'medium', 2, 9),
  sc('Việc lặp lại khổ thơ đầu có tác dụng gì?', ['Nhấn mạnh lời chia tay và tình cảm với lớp Một', 'Giới thiệu một nhân vật mới', 'Kể thêm một trò chơi', 'Miêu tả thời tiết'], 'A', 'medium', 2, 10),
  sc('Tâm trạng của bạn nhỏ khi chia tay lớp Một là gì?', ['Lưu luyến nhưng vui vì sắp bước sang lớp mới', 'Tức giận và không muốn đi học', 'Hoàn toàn thờ ơ', 'Sợ hãi vì phải ở lại lớp'], 'A', 'hard', 3, 1),
  sc('Cụm từ "gửi lời chào tiến bước" có ý nghĩa gì?', ['Tạm biệt lớp cũ để trưởng thành và bước tiếp', 'Quay lại ngày đầu tiên đi học', 'Rời trường và không học nữa', 'Chào các bạn để đi chơi'], 'A', 'hard', 3, 2),
  sc('Qua bài thơ, em thấy lớp Một có ý nghĩa như thế nào với bạn nhỏ?', ['Là nơi có nhiều kỉ niệm thân thương', 'Là nơi bạn nhỏ chưa từng đến', 'Là nơi khiến bạn nhỏ buồn chán', 'Là nơi chỉ để vui chơi'], 'A', 'hard', 3, 3),
  sc('Chi tiết nào thể hiện rõ nhất sự gắn bó với lớp học?', ['Chào bảng đen, cửa sổ và chỗ ngồi thân quen', 'Các bạn nhỏ đeo cặp sách', 'Ngoài sân có cây phượng', 'Cô giáo đứng trước cửa lớp'], 'A', 'hard', 3, 4),
  sc('Thứ tự lời chào trong bài thơ là:', ['Lớp Một → đồ vật trong lớp → cô giáo → lớp Một', 'Cô giáo → lớp Một → sân trường → bạn bè', 'Đồ vật → bạn bè → lớp Một → cô giáo', 'Lớp Một → bạn bè → bác bảo vệ → cô giáo'], 'A', 'hard', 3, 5),
  sc('Câu nào phù hợp nhất để nói về nội dung bức tranh?', ['Các bạn học sinh lưu luyến chào cô giáo và lớp học trước khi nghỉ hè', 'Các bạn đang thi chạy trong sân trường', 'Cô giáo đón học sinh trong ngày khai giảng đầu tiên', 'Các bạn đang tham gia một buổi biểu diễn văn nghệ'], 'A', 'hard', 3, 6),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chúng em / lời cô dạy / luôn ghi nhớ',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'chúng em' },
      { key: '2', text: 'lời cô dạy' },
      { key: '3', text: 'luôn ghi nhớ' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Chúng em luôn ghi nhớ lời cô dạy
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 7,
    explanation: 'Câu đúng: "Chúng em luôn ghi nhớ lời cô dạy".',
  },
  sc('Việc làm nào thể hiện tình cảm với cô giáo trong năm học vừa qua?', ['Lễ phép, chăm học và thực hiện lời cô dạy', 'Không làm bài tập', 'Nói chuyện riêng trong lớp', 'Không chào cô khi gặp'], 'A', 'hard', 3, 8),
  sc('Khi chia tay các bạn cuối năm học, em nên nói gì?', ['Chúc các bạn nghỉ hè vui vẻ và hẹn gặp lại', 'Tớ không muốn gặp lại các bạn', 'Các bạn đừng nói chuyện với tớ', 'Tớ sẽ không nhớ ai cả'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Học sinh lưu luyến chào lớp Một, cô giáo và những điều thân quen để bước lên lớp mới', 'Kể về ngày đầu tiên học sinh đến trường', 'Miêu tả cây phượng trong sân trường', 'Giới thiệu các đồ dùng học tập'], 'A', 'hard', 3, 10),
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
    console.log('ONTAP-BAI3 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
