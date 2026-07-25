require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Loài chim của biển cả%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Chim bay trên trời', 'Loài chim của biển cả', 'Những người đi biển', 'Đại dương xanh'], 'B', 'easy', 1, 1),
  sc('Loài chim được giới thiệu trong bài là chim gì?', ['Chim sẻ', 'Chim én', 'Hải âu', 'Chim sâu'], 'C', 'easy', 1, 2),
  sc('Hải âu sống chủ yếu ở đâu?', ['Trên đồng ruộng', 'Ở biển cả', 'Trong thành phố', 'Trong vườn cây'], 'B', 'easy', 1, 3),
  sc('Hải âu có sải cánh như thế nào?', ['Rất nhỏ', 'Ngắn và yếu', 'Lớn', 'Không có cánh'], 'C', 'easy', 1, 4),
  sc('Nhờ có sải cánh lớn, hải âu có thể làm gì?', ['Bay rất xa', 'Chạy rất nhanh', 'Đào hang sâu', 'Leo cây giỏi'], 'A', 'easy', 1, 5),
  sc('Hải âu có thể bay vượt qua những gì?', ['Những khu vườn nhỏ', 'Những đại dương mênh mông', 'Những mái nhà', 'Những cánh đồng hẹp'], 'B', 'easy', 1, 6),
  sc('Ngoài khả năng bay, hải âu còn làm gì rất giỏi?', ['Bơi', 'Chạy', 'Leo trèo', 'Đào đất'], 'A', 'easy', 1, 7),
  sc('Chân của hải âu có đặc điểm gì?', ['Có móng vuốt dài', 'Có màng như chân vịt', 'Rất ngắn và nhỏ', 'Có nhiều lông'], 'B', 'easy', 1, 8),
  sc('Hải âu thường bay ở đâu?', ['Trên mặt biển', 'Dưới lòng đất', 'Trong hang đá', 'Giữa cánh đồng'], 'A', 'easy', 1, 9),
  sc('Bài đọc do ai viết?', ['Trung Nguyên', 'Nguyễn Vũ', 'Phương Dung', 'Trung Kiên'], 'A', 'easy', 1, 10),
  sc('Từ "sải cánh" chỉ điều gì?', ['Khoảng rộng khi chim dang hai cánh', 'Màu sắc của đôi cánh', 'Số lượng lông trên cánh', 'Cách chim gấp cánh'], 'A', 'medium', 2, 1),
  sc('Từ "đại dương" chỉ nơi nào?', ['Một hồ nước nhỏ', 'Vùng biển rất rộng lớn', 'Một dòng suối', 'Một con sông ngắn'], 'B', 'medium', 2, 2),
  sc('Từ "mênh mông" có nghĩa là gì?', ['Rộng lớn, trải dài như không có giới hạn', 'Chật hẹp và nhỏ bé', 'Gồ ghề, khó đi', 'Tối tăm, lạnh lẽo'], 'A', 'medium', 2, 3),
  sc('Từ "dập dềnh" miêu tả trạng thái nào?', ['Lên xuống nhẹ nhàng theo mặt nước', 'Bay rất nhanh trên trời', 'Chạy liên tục trên bờ', 'Đứng yên không chuyển động'], 'A', 'medium', 2, 4),
  sc('Đôi khi, hải âu đậu ở đâu?', ['Trên mặt nước dập dềnh', 'Dưới đáy biển', 'Trong tổ trên cây', 'Trên mái nhà'], 'A', 'medium', 2, 5),
  sc('Khi trời sắp có bão, hải âu làm gì?', ['Bay thành đàn tìm nơi trú ẩn', 'Bơi ra xa bờ hơn', 'Nằm ngủ trên mặt biển', 'Bay riêng lẻ đến thành phố'], 'A', 'medium', 2, 6),
  sc('Vì sao hải âu được gọi là loài chim báo bão?', ['Vì chúng thường bay thành đàn tìm nơi trú ẩn trước khi bão đến', 'Vì chúng có bộ lông màu trắng', 'Vì chúng bơi rất giỏi', 'Vì chúng luôn bay vào ban đêm'], 'A', 'medium', 2, 7),
  sc('Hải âu được coi là bạn của những ai?', ['Những người làm ruộng', 'Những người đi biển', 'Những người thợ xây', 'Những người bán hàng'], 'B', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Ít có loài chim nào có thể (…) như hải âu.', ['đại dương', 'bay xa', 'thời tiết', 'đi biển'], 'B', 'medium', 2, 9),
  sc('Chọn từ thích hợp để hoàn thành câu: Những con tàu lớn có thể đi qua các (…).', ['đại dương', 'thời tiết', 'cánh', 'bão'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Giới thiệu hải âu → khả năng bay và bơi → hoạt động trên biển → dấu hiệu báo bão', 'Hải âu trú bão → học bơi → sống trong rừng → ra biển', 'Giới thiệu đại dương → tàu thuyền → cá → hải âu', 'Hải âu đậu trên cây → đi kiếm ăn → báo nắng'], 'A', 'hard', 3, 1),
  sc('Vì sao hải âu bơi giỏi?', ['Vì chân của chúng có màng như chân vịt', 'Vì chúng có chiếc đuôi rất dài', 'Vì bộ lông của chúng có nhiều màu', 'Vì chúng có chiếc mỏ lớn'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy hải âu thích nghi tốt với cuộc sống trên biển?', ['Có sải cánh lớn, bay xa và chân có màng để bơi', 'Có bộ lông nhiều màu và biết leo cây', 'Có chân dài để chạy trên đồng cỏ', 'Có móng sắc để đào hang'], 'A', 'hard', 3, 3),
  sc('Người đi biển có thể quan sát hải âu để biết điều gì?', ['Khả năng sắp có bão', 'Nơi có nhiều cây ăn quả', 'Thời điểm mặt trời mọc', 'Nơi có đường bộ'], 'A', 'hard', 3, 4),
  sc('Câu nào hoàn thành đúng nội dung bài: Ngoài bay xa, hải âu còn (…).', ['bơi rất giỏi', 'chạy rất nhanh', 'đào hang rất sâu', 'leo cây rất khéo'], 'A', 'hard', 3, 5),
  sc('Điền vần ân hoặc uân để tạo thành các từ đúng: đôi ch… – g… gũi – h… luyện', ['ân – ân – uân', 'uân – ân – ân', 'ân – uân – uân', 'uân – uân – ân'], 'A', 'hard', 3, 6, 'Viết đúng: "đôi chân – gần gũi – huấn luyện".'),
  sc('Điền vần im hoặc iêm để tạo thành các từ đúng: lim d… – quý h… – trái t…', ['im – iêm – im', 'iêm – im – iêm', 'im – im – iêm', 'iêm – iêm – im'], 'A', 'hard', 3, 7, 'Viết đúng: "lim dim – quý hiếm – trái tim".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: hải âu / trên mặt biển / bay / suốt ngày',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'hải âu' },
      { key: '2', text: 'trên mặt biển' },
      { key: '3', text: 'bay' },
      { key: '4', text: 'suốt ngày' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Hải âu bay suốt ngày trên mặt biển
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Hải âu bay suốt ngày trên mặt biển".',
  },
  sc('Việc làm nào giúp bảo vệ các loài chim?', ['Không săn bắt, không phá tổ và bảo vệ môi trường sống của chim', 'Bắt chim non về nuôi làm đồ chơi', 'Phá tổ để lấy trứng chim', 'Dùng súng cao su bắn chim'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Giới thiệu đặc điểm, khả năng và ích lợi của loài chim hải âu', 'Kể về một chuyến đi biển của học sinh', 'Hướng dẫn cách điều khiển tàu biển', 'Miêu tả các loài cá sống trong đại dương'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B33 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
