require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Tôi là học sinh lớp 1%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bạn nhỏ trong bài đọc tên là gì?', ['Minh', 'Nam', 'Hà', 'Hùng'], 'B', 'easy', 1, 1),
  sc('Nam là học sinh lớp nào?', ['Lớp 1A', 'Lớp 1B', 'Lớp 2A', 'Lớp 2B'], 'A', 'easy', 1, 2),
  sc('Nam học ở trường nào?', ['Trường Tiểu học Kim Đồng', 'Trường Tiểu học Lê Quý Đôn', 'Trường Tiểu học Nguyễn Du', 'Trường Tiểu học Trần Quốc Toản'], 'B', 'easy', 1, 3),
  sc('Ngày đầu đi học, Nam mặc trang phục gì?', ['Quần áo thể thao', 'Bộ đồng phục của trường', 'Quần áo ngủ', 'Áo mưa'], 'B', 'easy', 1, 4),
  sc('Khi mặc đồng phục của trường, Nam cảm thấy thế nào?', ['Hãnh diện', 'Lo lắng', 'Buồn bã', 'Tức giận'], 'A', 'easy', 1, 5),
  sc('Hồi đầu năm học, Nam mới học gì?', ['Làm văn', 'Chữ cái', 'Phép nhân', 'Tiếng Anh'], 'B', 'easy', 1, 6),
  sc('Bây giờ, Nam đã đọc được gì?', ['Báo', 'Truyện tranh', 'Bản đồ', 'Thời khóa biểu'], 'B', 'easy', 1, 7),
  sc('Ngoài đọc truyện tranh, Nam còn biết làm gì?', ['Nấu cơm', 'Làm toán', 'May áo', 'Lái xe'], 'B', 'easy', 1, 8),
  sc('Từ khi đi học, Nam có thêm điều gì?', ['Nhiều đồ chơi mới', 'Nhiều bạn mới', 'Nhiều vật nuôi', 'Nhiều quần áo'], 'B', 'easy', 1, 9),
  sc('Bài đọc có tên là gì?', ['Ngôi trường của em', 'Người bạn mới', 'Tôi là học sinh lớp 1', 'Một ngày ở trường'], 'C', 'easy', 1, 10),
  sc('Từ "đồng phục" chỉ loại quần áo nào?', ['Quần áo mặc khi đi ngủ', 'Quần áo giống nhau dành cho học sinh của một trường', 'Quần áo mặc khi đi biển', 'Quần áo dùng để biểu diễn'], 'B', 'medium', 2, 1),
  sc('Từ "hãnh diện" gần nghĩa nhất với từ nào?', ['Tự hào', 'Sợ hãi', 'Xấu hổ', 'Mệt mỏi'], 'A', 'medium', 2, 2),
  sc('Từ "chững chạc" nói về người như thế nào?', ['Trưởng thành và nghiêm túc hơn', 'Hay khóc và nhõng nhẽo', 'Lười biếng và chậm chạp', 'Nghịch ngợm hơn trước'], 'A', 'medium', 2, 3),
  sc('Điền từ thích hợp vào chỗ trống: Nam rất … khi được cô giáo khen.', ['bổ ích', 'mới', 'hãnh diện', 'chững chạc'], 'C', 'medium', 2, 4),
  sc('Điền s hoặc x để tạo thành từ đúng: học …inh', ['s (học sinh)', 'x (học xinh)', 'ch (học chinh)', 'tr (học trinh)'], 'A', 'medium', 2, 5, 'Viết đúng là "học sinh".'),
  sc('Điền s hoặc x để tạo thành từ đúng: …inh đẹp', ['s (sinh đẹp)', 'x (xinh đẹp)', 'ch (chinh đẹp)', 'tr (trinh đẹp)'], 'B', 'medium', 2, 6, 'Viết đúng là "xinh đẹp".'),
  sc('Điền s hoặc x để tạo thành từ đúng: …ách vở', ['s (sách vở)', 'x (xách vở)', 'ch (chách vở)', 'tr (trách vở)'], 'A', 'medium', 2, 7, 'Viết đúng là "sách vở".'),
  sc('Điền tr hoặc ch để tạo thành từ đúng: …anh ảnh', ['tr (tranh ảnh)', 'ch (chanh ảnh)', 's (sanh ảnh)', 'x (xanh ảnh)'], 'A', 'medium', 2, 8, 'Viết đúng là "tranh ảnh".'),
  sc('Điền tr hoặc ch để tạo thành từ đúng: …ữ cái', ['tr (trữ cái)', 'ch (chữ cái)', 's (sữ cái)', 'x (xữ cái)'], 'B', 'medium', 2, 9, 'Viết đúng là "chữ cái".'),
  sc('Điền tr hoặc ch để tạo thành từ đúng: vui …ơi', ['tr (vui trơi)', 'ch (vui chơi)', 's (vui sơi)', 'x (vui xơi)'], 'B', 'medium', 2, 10, 'Viết đúng là "vui chơi".'),
  sc('Nội dung nào cho thấy Nam đã tiến bộ trong học tập?', ['Nam có một chiếc cặp mới', 'Nam đã đọc được truyện tranh và biết làm toán', 'Nam mặc đồng phục đến trường', 'Nam thích chơi ở sân trường'], 'B', 'hard', 3, 1),
  sc('Vì sao mọi người nói Nam chững chạc hơn từ khi đi học?', ['Vì Nam cao hơn các bạn', 'Vì Nam biết đọc, biết làm toán và có nhiều bạn mới', 'Vì Nam có nhiều đồ chơi', 'Vì Nam được nghỉ học nhiều ngày'], 'B', 'hard', 3, 2),
  sc('Thứ tự nào đúng với sự tiến bộ của Nam?', ['Đọc truyện tranh → học chữ cái → đi học lớp 1', 'Học chữ cái → đọc được truyện tranh → biết làm toán', 'Biết làm toán → học chữ cái → đọc truyện tranh', 'Có nhiều bạn → chưa biết chữ → nghỉ học'], 'B', 'hard', 3, 3),
  sc('Câu nào viết đúng nội dung bài đọc?', ['Nam học lớp 2A.', 'Nam chưa biết đọc truyện tranh.', 'Nam là học sinh lớp 1A.', 'Nam không có bạn mới.'], 'C', 'hard', 3, 4),
  sc('Hoàn thành câu theo yêu cầu của bài: Nam học (…).', ['lớp 1A', 'ở công viên', 'cùng em bé', 'vào buổi tối'], 'A', 'hard', 3, 5),
  sc('Nhóm nào gồm toàn các hoạt động xuất hiện trong tranh ở mục 6?', ['Đá bóng, đọc sách, kéo co, múa', 'Bơi, đá bóng, nấu ăn, múa', 'Đọc sách, câu cá, chạy bộ, hát', 'Kéo co, trồng cây, đi chợ, múa'], 'A', 'hard', 3, 6),
  sc('Câu nào phù hợp với tranh bạn nhỏ cầm sách?', ['Bạn nhỏ đang đá bóng.', 'Bạn nhỏ đang đọc sách.', 'Bạn nhỏ đang kéo co.', 'Bạn nhỏ đang múa.'], 'B', 'hard', 3, 7),
  sc('Câu nào được viết đúng chính tả?', ['Nam đã đọc được truyện chanh.', 'Nam đã đọc được chuyện tranh.', 'Nam đã đọc được truyện tranh.', 'Nam đã đọc được chuyện chanh.'], 'C', 'hard', 3, 8, 'Viết đúng là "truyện tranh".'),
  sc('Việc làm nào cho thấy một học sinh lớp 1 đang dần chững chạc?', ['Tự chuẩn bị sách vở và đi học đúng giờ', 'Thường xuyên khóc nhè', 'Không nghe lời thầy cô', 'Vứt đồ dùng học tập bừa bãi'], 'A', 'hard', 3, 9),
  sc('Từ khi đi học lớp 1, em nên làm gì?', ['Chăm học, hòa đồng với bạn và tự giác hơn', 'Không làm bài tập', 'Thường xuyên đi học muộn', 'Không giữ gìn sách vở'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B1 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
