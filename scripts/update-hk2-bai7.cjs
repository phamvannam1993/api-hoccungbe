require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Nụ hôn trên bàn tay%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Ngày đầu đi học', 'Nụ hôn trên bàn tay', 'Mẹ đưa Nam đến trường', 'Mái ấm của Nam'], 'B', 'easy', 1, 1),
  sc('Ngày đầu đi học, Nam cảm thấy thế nào?', ['Hồi hộp', 'Tức giận', 'Buồn ngủ', 'Mệt mỏi'], 'A', 'easy', 1, 2),
  sc('Ai nhẹ nhàng đặt một nụ hôn vào bàn tay Nam?', ['Bố', 'Mẹ', 'Cô giáo', 'Bà'], 'B', 'easy', 1, 3),
  sc('Mẹ đặt nụ hôn vào đâu?', ['Bàn tay Nam', 'Mái tóc Nam', 'Chiếc cặp của Nam', 'Quyển vở của Nam'], 'A', 'easy', 1, 4),
  sc('Mẹ dặn Nam áp bàn tay lên đâu khi lo lắng?', ['Lên trán', 'Lên vai', 'Lên má', 'Lên ngực'], 'C', 'easy', 1, 5),
  sc('Mẹ nói mình lúc nào cũng ở đâu?', ['Ở trong lớp', 'Ở bên Nam', 'Ở ngoài sân', 'Ở thư viện'], 'B', 'easy', 1, 6),
  sc('Sau khi nghe mẹ dặn, Nam cảm thấy thế nào?', ['Thật ấm áp', 'Rất sợ hãi', 'Rất tức giận', 'Thật lạnh lẽo'], 'A', 'easy', 1, 7),
  sc('Nam bảo mẹ đưa gì cho mình?', ['Chiếc cặp', 'Quyển sách', 'Bàn tay', 'Chiếc ô'], 'C', 'easy', 1, 8),
  sc('Nam đặt gì vào bàn tay mẹ?', ['Một viên kẹo', 'Một nụ hôn', 'Một bông hoa', 'Một chiếc bút'], 'B', 'easy', 1, 9),
  sc('Sau khi chào mẹ, Nam làm gì?', ['Quay về nhà', 'Ngồi khóc ngoài cổng', 'Tung tăng bước vào lớp', 'Chạy ra công viên'], 'C', 'easy', 1, 10),
  sc('Từ "hồi hộp" nói lên trạng thái nào?', ['Lo lắng và mong chờ', 'Vui chơi thoải mái', 'Tức giận với người khác', 'Ngủ rất ngon'], 'A', 'medium', 2, 1),
  sc('Từ "nhẹ nhàng" có nghĩa là gì?', ['Êm dịu, không mạnh tay', 'Thật nhanh và mạnh', 'Ồn ào, náo nhiệt', 'Chậm chạp, mệt mỏi'], 'A', 'medium', 2, 2),
  sc('Từ "thủ thỉ" chỉ cách nói như thế nào?', ['Nói nhỏ nhẹ, thân mật', 'Nói thật to', 'Nói rất nhanh', 'Nói trong tức giận'], 'A', 'medium', 2, 3),
  sc('Từ "tung tăng" miêu tả dáng đi như thế nào?', ['Vui vẻ, nhanh nhẹn', 'Nặng nề, chậm chạp', 'Loạng choạng, mệt mỏi', 'Rón rén, sợ hãi'], 'A', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Mỗi lần em bị ốm, mẹ rất (…).', ['mỉm cười', 'lo lắng', 'thủ thỉ', 'tung tăng'], 'B', 'medium', 2, 5),
  sc('Bức tranh mẹ đưa thuốc cho bạn nhỏ phù hợp với câu nào?', ['Mẹ chăm sóc con khi con bị ốm.', 'Mẹ đưa con đi học.', 'Mẹ cùng con đọc sách.', 'Mẹ mua đồ chơi cho con.'], 'A', 'medium', 2, 6),
  sc('Bức tranh bố và bạn nhỏ chơi ô tô điện phù hợp với câu nào?', ['Bố chăm sóc con bị ốm.', 'Bố cho con chơi ô tô điện ở công viên.', 'Bố đưa con đến bệnh viện.', 'Bố cùng con làm bài tập.'], 'B', 'medium', 2, 7),
  sc('Điền n hoặc l để tạo thành từ đúng: …iềm vui', ['n (niềm vui)', 'l (liềm vui)'], 'A', 'medium', 2, 8, 'Viết đúng là "niềm vui".'),
  sc('Điền n hoặc l để tạo thành từ đúng: …o lắng', ['n (no lắng)', 'l (lo lắng)'], 'B', 'medium', 2, 9, 'Viết đúng là "lo lắng".'),
  sc('Điền c hoặc k để tạo thành từ đúng: mẹ …on', ['c (mẹ con)', 'k (mẹ kon)'], 'A', 'medium', 2, 10, 'Viết đúng là "mẹ con".'),
  sc('Thứ tự nào đúng với diễn biến bài đọc?', ['Nam vào lớp → mẹ hôn tay Nam → Nam hồi hộp → Nam hôn tay mẹ', 'Nam hồi hộp → mẹ hôn bàn tay Nam → Nam hôn bàn tay mẹ → Nam bước vào lớp', 'Nam hôn tay mẹ → Nam hồi hộp → mẹ đưa Nam về nhà', 'Mẹ vào lớp → Nam hôn tay mẹ → Nam bật khóc'], 'B', 'hard', 3, 1),
  sc('Vì sao mẹ đặt một nụ hôn vào bàn tay Nam?', ['Để Nam nhớ rằng mẹ luôn yêu thương và ở bên mình', 'Để Nam không phải đi học', 'Để Nam khoe với các bạn', 'Để Nam ngủ ngon hơn'], 'A', 'hard', 3, 2),
  sc('Vì sao Nam muốn mẹ đưa bàn tay cho mình?', ['Vì Nam muốn xem tay mẹ', 'Vì Nam muốn đặt một nụ hôn vào bàn tay mẹ', 'Vì Nam muốn mẹ cầm cặp', 'Vì Nam muốn mẹ dắt vào lớp'], 'B', 'hard', 3, 3),
  sc('Hành động Nam hôn vào bàn tay mẹ thể hiện điều gì?', ['Nam yêu thương và quan tâm đến mẹ', 'Nam không muốn đi học', 'Nam đang giận mẹ', 'Nam muốn mẹ mua quà'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào cho thấy Nam đã bớt lo lắng?', ['Nam im lặng mãi', 'Nam tung tăng bước vào lớp', 'Nam đứng ngoài cổng trường', 'Nam đòi quay về nhà'], 'B', 'hard', 3, 5),
  sc('Câu nào hoàn thành đúng nội dung bài: Ngày đầu đi học, Nam (…).', ['hồi hộp lắm', 'rất tức giận', 'ngủ quên ở nhà', 'không gặp mẹ'], 'A', 'hard', 3, 6),
  sc('Câu nào dưới đây được viết đúng chính tả?', ['Mẹ rất no nắng cho Nam.', 'Mẹ rất lo lắng cho Nam.', 'Mẹ rất no lắng cho Nam.', 'Mẹ rất lo nắng cho Nam.'], 'B', 'hard', 3, 7, 'Viết đúng là "lo lắng".'),
  sc('Điền c hoặc k vào các chỗ trống để tạo thành hai từ đúng: …ỉ niệm – …ì diệu', ['c – c', 'c – k', 'k – k', 'k – c'], 'C', 'hard', 3, 8, 'Viết đúng là "kỉ niệm – kì diệu".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: một nụ hôn / mẹ / vào bàn tay Nam / đặt',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'một nụ hôn' },
      { key: '2', text: 'mẹ' },
      { key: '3', text: 'vào bàn tay Nam' },
      { key: '4', text: 'đặt' },
    ],
    correctAnswerJson: ['2', '4', '1', '3'], // Mẹ đặt một nụ hôn vào bàn tay Nam
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Mẹ đặt một nụ hôn vào bàn tay Nam".',
  },
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Tình yêu thương của gia đình giúp chúng ta thêm tự tin và ấm áp', 'Trẻ em không nên đi học', 'Khi lo lắng, chúng ta nên bỏ về nhà', 'Chỉ mẹ mới cần được yêu thương'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B7 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
