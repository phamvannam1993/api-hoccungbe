require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bác trống trường%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Ngày khai trường', 'Bác trống trường', 'Anh chuông điện', 'Tiếng trống khai giảng'], 'B', 'easy', 1, 1),
  sc('Nhân vật kể chuyện trong bài là ai?', ['Một bạn học sinh', 'Thầy giáo', 'Trống trường', 'Chuông điện'], 'C', 'easy', 1, 2),
  sc('Thân hình của trống trường được miêu tả như thế nào?', ['Nhỏ nhắn', 'Đầy đà', 'Cao gầy', 'Mảnh mai'], 'B', 'easy', 1, 3),
  sc('Nước da của trống trường có màu gì?', ['Trắng sáng', 'Xanh biếc', 'Nâu bóng', 'Vàng nhạt'], 'C', 'easy', 1, 4),
  sc('Học trò thường gọi trống trường là gì?', ['Anh trống', 'Chú trống', 'Bác trống', 'Ông trống'], 'C', 'easy', 1, 5),
  sc('Hằng ngày, trống trường giúp học sinh làm gì?', ['Làm bài tập', 'Ra vào lớp đúng giờ', 'Xếp bàn ghế', 'Quét sân trường'], 'B', 'easy', 1, 6),
  sc('Tiếng trống trong ngày khai trường vang lên như thế nào?', ['Reng… reng… reng…', 'Tùng… tùng… tùng…', 'Tích… tắc… tích… tắc…', 'Líu… lo… líu… lo…'], 'B', 'easy', 1, 7),
  sc('Tiếng trống ngày khai trường báo hiệu điều gì?', ['Một năm học mới', 'Giờ ra chơi', 'Giờ tan học', 'Một ngày nghỉ lễ'], 'A', 'easy', 1, 8),
  sc('Đồ vật nào thỉnh thoảng cũng báo giờ học?', ['Đồng hồ treo tường', 'Anh chuông điện', 'Chiếc loa', 'Chiếc còi'], 'B', 'easy', 1, 9),
  sc('Chuông điện phát ra âm thanh nào?', ['Tùng… tùng…', 'Reng… reng…', 'Cốc… cốc…', 'Meo… meo…'], 'B', 'easy', 1, 10),
  sc('Từ "đầy đà" dùng để miêu tả dáng vẻ như thế nào?', ['Tròn trịa, chắc chắn', 'Cao và gầy', 'Nhỏ bé, yếu ớt', 'Mảnh mai, nhẹ nhàng'], 'A', 'medium', 2, 1),
  sc('Từ "nâu bóng" cho biết bề mặt trống như thế nào?', ['Có màu nâu và sáng bóng', 'Có màu đen và sần sùi', 'Có màu trắng và mềm mại', 'Có màu xanh và trong suốt'], 'A', 'medium', 2, 2),
  sc('Từ "báo hiệu" có nghĩa là gì?', ['Cho biết một sự việc sắp hoặc đang diễn ra', 'Giấu kín một thông tin', 'Kể lại một câu chuyện', 'Nói chuyện thật nhỏ'], 'A', 'medium', 2, 3),
  sc('Vì sao học trò gọi trống trường là "bác trống"?', ['Vì trống có kích thước nhỏ', 'Vì trống đã ở trường từ rất lâu', 'Vì trống biết nói chuyện', 'Vì trống được đặt trong lớp học'], 'B', 'medium', 2, 4),
  sc('Chọn từ ngữ thích hợp để hoàn thành câu: Năm nào cũng vậy, chúng em háo hức chờ đón (…).', ['trống trường', 'báo hiệu', 'ngày khai trường', 'ngày nghỉ hè'], 'C', 'medium', 2, 5),
  sc('Bức tranh các bạn đứng thành hàng phù hợp với từ ngữ nào?', ['Gấp sách vở', 'Xếp hàng', 'Đọc sách', 'Vui chơi'], 'B', 'medium', 2, 6),
  sc('Bức tranh hai bạn thu dọn sách trên bàn phù hợp với cụm từ nào?', ['Xếp hàng', 'Gấp sách vở', 'Đánh trống', 'Chào cờ'], 'B', 'medium', 2, 7),
  sc('Tiếng nào dưới đây chứa vần eng?', ['reng', 'trống', 'trường', 'giờ'], 'A', 'medium', 2, 8, '"reng" có vần "eng".'),
  sc('Tiếng nào dưới đây chứa vần au?', ['hàng', 'thân', 'nâu', 'báo'], 'C', 'medium', 2, 9, '"nâu" có vần "âu".'),
  sc('Tiếng nào dưới đây chứa vần ao?', ['thân', 'nâu', 'hàng', 'báo'], 'D', 'medium', 2, 10, '"báo" có vần "ao".'),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Giới thiệu trống trường → nói về công việc hằng ngày → tiếng trống ngày khai trường → giới thiệu chuông điện', 'Giới thiệu chuông điện → trống trường rời khỏi trường → học sinh vào lớp', 'Ngày khai trường → học sinh nghỉ học → trống trường được mang về nhà', 'Học sinh đánh chuông → trống trường mới được đưa đến trường'], 'A', 'hard', 3, 1),
  sc('Vì sao trống trường không biết mình đến trường từ bao giờ?', ['Vì trống đã ở trường từ rất lâu', 'Vì trống mới được mua về', 'Vì học sinh không nói cho trống biết', 'Vì trống thường xuyên được chuyển trường'], 'A', 'hard', 3, 2),
  sc('Dù đã có chuông điện, vì sao trống trường vẫn là người bạn thân thiết của học sinh?', ['Vì tiếng trống đã gắn bó lâu dài với nhiều hoạt động ở trường', 'Vì chuông điện không phát ra âm thanh', 'Vì trống trường được đặt trong lớp', 'Vì học sinh không biết sử dụng chuông điện'], 'A', 'hard', 3, 3),
  sc('Cách gọi "bác trống" và "anh chuông điện" có tác dụng gì?', ['Làm các đồ vật trở nên gần gũi như con người', 'Cho biết trống và chuông là động vật', 'Làm bài đọc trở nên đáng sợ', 'Cho biết trống và chuông biết đi lại'], 'A', 'hard', 3, 4),
  sc('Hoàn thành câu theo nội dung bài: Hằng ngày, trống trường giúp học sinh (…).', ['ra vào lớp đúng giờ', 'làm bài tập thật nhanh', 'dọn vệ sinh lớp học', 'chuẩn bị sách vở'], 'A', 'hard', 3, 5),
  sc('Dãy nào lần lượt chứa các vần ang – an – au – ao?', ['hàng – thân – nâu – báo', 'thân – hàng – báo – nâu', 'nâu – báo – hàng – thân', 'báo – nâu – thân – hàng'], 'A', 'hard', 3, 6),
  sc('Câu đố sau nói về đồ vật nào? "Ở lớp mặc áo đen, xanh / Với anh phấn trắng đã thành bạn thân."', ['Trống trường', 'Bảng lớp', 'Chuông điện', 'Bàn học'], 'B', 'hard', 3, 7),
  sc('Câu đố sau nói về đồ vật nào? "Reng… reng" là tiếng của tôi / Ra chơi, vào học, tôi thời báo ngay."', ['Chuông điện', 'Trống trường', 'Đồng hồ', 'Loa phát thanh'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: trống trường / học sinh / vào lớp / báo hiệu',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'trống trường' },
      { key: '2', text: 'học sinh' },
      { key: '3', text: 'vào lớp' },
      { key: '4', text: 'báo hiệu' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Trống trường báo hiệu học sinh vào lớp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Trống trường báo hiệu học sinh vào lớp".',
  },
  sc('Khi nghe tiếng trống hoặc tiếng chuông báo vào lớp, học sinh nên làm gì?', ['Nhanh chóng xếp hàng, vào lớp và chuẩn bị học tập', 'Tiếp tục chạy chơi ngoài sân', 'Đi ra khỏi cổng trường', 'Nói chuyện thật to trong hành lang'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B18 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
