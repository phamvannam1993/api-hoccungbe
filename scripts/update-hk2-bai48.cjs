require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Lớn lên bạn làm gì%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Nghề em yêu thích', 'Lớn lên bạn làm gì?', 'Ước mơ của bé', 'Em làm đầu bếp'], 'B', 'easy', 1, 1),
  sc('Ở khổ thơ đầu, bạn nhỏ muốn làm nghề gì?', ['Phi công', 'Thủy thủ', 'Bác sĩ', 'Giáo viên'], 'B', 'easy', 1, 2),
  sc('Người thủy thủ làm việc chủ yếu ở đâu?', ['Trên tàu', 'Trong bệnh viện', 'Trong lớp học', 'Trên đồng ruộng'], 'A', 'easy', 1, 3),
  sc('Bạn nhỏ muốn lái tàu vượt qua điều gì?', ['Núi cao', 'Sóng dữ', 'Rừng sâu', 'Đường đông'], 'B', 'easy', 1, 4),
  sc('Con tàu sẽ băng qua nhiều gì?', ['Dòng suối', 'Cánh đồng', 'Đại dương', 'Thành phố'], 'C', 'easy', 1, 5),
  sc('Ở khổ thơ thứ hai, bạn nhỏ muốn làm nghề gì?', ['Đầu bếp', 'Kĩ sư', 'Nông dân', 'Công an'], 'A', 'easy', 1, 6),
  sc('Bạn nhỏ muốn làm loại bánh nào?', ['Bánh ngọt', 'Bánh chưng', 'Bánh mì', 'Bánh cuốn'], 'A', 'easy', 1, 7),
  sc('Ngoài làm bánh, đầu bếp còn nấu món gì?', ['Cháo', 'Mì', 'Cơm rang', 'Canh rau'], 'B', 'easy', 1, 8),
  sc('Ở khổ thơ thứ ba, bạn nhỏ làm công việc gì?', ['Gieo hạt', 'Lái máy bay', 'Khám bệnh', 'Dạy học'], 'A', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Thái Dương', 'Thụy Anh', 'Lâm Anh', 'Nguyễn Lãm Thắng'], 'A', 'easy', 1, 10),
  sc('Thủy thủ là người làm công việc gì?', ['Làm việc và điều khiển công việc trên tàu thủy', 'Chữa bệnh cho mọi người', 'Dạy học sinh', 'Nấu ăn trong nhà hàng'], 'A', 'medium', 2, 1),
  sc('Cụm từ "sóng dữ" nói về những con sóng như thế nào?', ['Nhỏ và êm', 'Mạnh và nguy hiểm', 'Trong và mát', 'Lặng im, không chuyển động'], 'B', 'medium', 2, 2),
  sc('Đầu bếp là người làm nghề gì?', ['Chế biến và nấu các món ăn', 'Điều khiển máy bay', 'Xây dựng nhà cửa', 'Chăm sóc người bệnh'], 'A', 'medium', 2, 3),
  sc('Từ "gieo" trong bài có nghĩa là gì?', ['Rải hạt giống xuống đất để trồng cây', 'Thu hoạch lúa chín', 'Mang lúa về nhà', 'Tưới nước cho cây'], 'A', 'medium', 2, 4),
  sc('Mùa gặt là thời gian người nông dân làm gì?', ['Thu hoạch lúa chín', 'Gieo hạt giống', 'Làm đất trồng cây', 'Tát nước vào ruộng'], 'A', 'medium', 2, 5),
  sc('Hình ảnh nào xuất hiện khi mùa gặt đến?', ['Lúa vàng reo trên đồng', 'Sóng biển dâng cao', 'Máy bay bay trên trời', 'Bánh ngọt đặt trên bàn'], 'A', 'medium', 2, 6),
  sc('Tiếng nào trong khổ thơ thứ hai chứa vần at?', ['bánh', 'ngọt', 'đẹp', 'ngon'], 'B', 'medium', 2, 7, '"ngọt" có vần "ot" (theo bài).'),
  sc('Tiếng nào trong khổ thơ thứ hai chứa vần ep?', ['bếp', 'đẹp', 'mì', 'ngon'], 'A', 'medium', 2, 8, '"bếp" có vần "ep".'),
  sc('Tiếng nào trong khổ thơ thứ hai chứa vần ép?', ['bếp', 'bánh', 'đẹp', 'ngọt'], 'C', 'medium', 2, 9, '"đẹp" có vần "ep".'),
  sc('Bạn nhỏ ở khổ thơ cuối đã làm gì trước khi tiếp tục nghĩ về nghề nghiệp?', ['Làm bài', 'Đi ngủ', 'Đi chơi', 'Xem ti vi'], 'A', 'medium', 2, 10),
  sc('Thứ tự các công việc được nhắc đến trong bài là gì?', ['Thủy thủ → đầu bếp → gieo hạt → làm bài', 'Đầu bếp → thủy thủ → làm bài → gieo hạt', 'Gieo hạt → đầu bếp → thủy thủ → làm bài', 'Làm bài → thủy thủ → đầu bếp → gieo hạt'], 'A', 'hard', 3, 1),
  sc('Bạn nhỏ muốn làm thủy thủ để làm gì?', ['Lái tàu vượt sóng và đi qua nhiều đại dương', 'Làm bánh ngọt cho mọi người', 'Gieo hạt trên cánh đồng', 'Dạy học sinh trong lớp'], 'A', 'hard', 3, 2),
  sc('Khổ thơ thứ ba nói đến công việc của nghề nào?', ['Nghề nông', 'Nghề y', 'Nghề giáo viên', 'Nghề phi công'], 'A', 'hard', 3, 3),
  sc('Hình ảnh "Lúa vàng reo trên đồng" giúp em hình dung điều gì?', ['Cánh đồng lúa chín vàng lay động trong gió', 'Lúa có thể nói chuyện như con người', 'Cánh đồng đang bị ngập nước', 'Người nông dân đang nghỉ ngơi'], 'A', 'hard', 3, 4),
  sc('Vì sao bạn nhỏ nói câu hỏi về nghề nghiệp là "khó quá"?', ['Vì bạn còn nhỏ và có nhiều nghề đáng để lựa chọn', 'Vì bạn không thích bất cứ nghề nào', 'Vì bạn không hiểu câu hỏi', 'Vì bạn không muốn lớn lên'], 'A', 'hard', 3, 5),
  sc('Chi tiết "Để tớ làm bài đã" cho thấy bạn nhỏ là người như thế nào?', ['Biết ưu tiên việc học hiện tại', 'Không thích học bài', 'Chỉ thích vui chơi', 'Không có ước mơ'], 'A', 'hard', 3, 6),
  sc('Điểm chung của những nghề được nhắc đến trong bài là gì?', ['Đều tạo ra những điều có ích cho cuộc sống', 'Đều làm việc trên biển', 'Đều làm việc trong trường học', 'Đều chỉ cần làm vào buổi sáng'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: lớn lên / muốn / em / làm bác sĩ',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'lớn lên' },
      { key: '2', text: 'muốn' },
      { key: '3', text: 'em' },
      { key: '4', text: 'làm bác sĩ' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Lớn lên, em muốn làm bác sĩ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Lớn lên, em muốn làm bác sĩ".',
  },
  sc('Muốn thực hiện được nghề nghiệp mình yêu thích, em nên làm gì?', ['Chăm chỉ học tập và rèn luyện những kĩ năng cần thiết', 'Chỉ nói về ước mơ mà không cần cố gắng', 'Chờ người khác quyết định thay mình', 'Không cần tìm hiểu về nghề nghiệp'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Những ước mơ nghề nghiệp hồn nhiên của các bạn nhỏ và lời nhắc cần chăm chỉ học tập', 'Hướng dẫn cách làm bánh ngọt', 'Kể về một chuyến tàu vượt đại dương', 'Miêu tả mùa gặt trên cánh đồng'], 'A', 'hard', 3, 10),
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
    console.log('LONLEN XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
