require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Đèn giao thông%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Qua đường an toàn', 'Đèn giao thông', 'Đường phố đông vui', 'Phương tiện giao thông'], 'B', 'easy', 1, 1),
  sc('Đèn giao thông thường được đặt ở đâu?', ['Trong lớp học', 'Ở các ngã ba, ngã tư đường phố', 'Trong công viên', 'Ở giữa sân trường'], 'B', 'easy', 1, 2),
  sc('Đèn giao thông có mấy màu?', ['Hai màu', 'Ba màu', 'Bốn màu', 'Năm màu'], 'B', 'easy', 1, 3),
  sc('Ba màu của đèn giao thông là những màu nào?', ['Đỏ, vàng, xanh', 'Đỏ, trắng, đen', 'Vàng, tím, xanh', 'Đỏ, cam, tím'], 'A', 'easy', 1, 4),
  sc('Đèn đỏ báo hiệu điều gì?', ['Được phép di chuyển', 'Phải dừng lại', 'Được đi thật nhanh', 'Được quay đầu tùy ý'], 'B', 'easy', 1, 5),
  sc('Đèn xanh báo hiệu điều gì?', ['Được phép di chuyển', 'Phải dừng lại', 'Phải đi lùi', 'Phải tắt máy'], 'A', 'easy', 1, 6),
  sc('Theo bài đọc, đèn vàng báo hiệu điều gì?', ['Đi thật nhanh qua đường', 'Đi chậm lại trước khi dừng hẳn', 'Được phép đỗ xe', 'Phải quay trở lại'], 'B', 'easy', 1, 7),
  sc('Cây đèn có ba màu đỏ, vàng, xanh được gọi là gì?', ['Đèn học', 'Đèn đường', 'Đèn giao thông', 'Đèn pin'], 'C', 'easy', 1, 8),
  sc('Đèn giao thông điều khiển việc gì?', ['Việc đi lại trên đường phố', 'Việc học tập trong lớp', 'Việc mua bán ở chợ', 'Việc vui chơi trong công viên'], 'A', 'easy', 1, 9),
  sc('Bài đọc do ai viết?', ['Trung Kiên', 'Nguyễn Vũ', 'Minh Tâm', 'Lâm Anh'], 'A', 'easy', 1, 10),
  sc('Từ "ngã ba" chỉ nơi như thế nào?', ['Nơi ba con đường gặp nhau', 'Nơi hai con đường gặp nhau', 'Nơi có ba ngôi nhà', 'Nơi có ba cây cầu'], 'A', 'medium', 2, 1),
  sc('Từ "ngã tư" chỉ nơi như thế nào?', ['Nơi bốn con đường gặp nhau', 'Nơi có bốn phương tiện', 'Nơi có bốn ngôi nhà', 'Nơi dành riêng cho người đi bộ'], 'A', 'medium', 2, 2),
  sc('Từ "điều khiển" có nghĩa là gì?', ['Hướng dẫn và làm cho hoạt động diễn ra theo trật tự', 'Làm cho mọi thứ lộn xộn', 'Đứng yên không làm gì', 'Chạy thật nhanh trên đường'], 'A', 'medium', 2, 3),
  sc('Từ "tuân thủ" có nghĩa là gì?', ['Làm đúng theo quy định hoặc hướng dẫn', 'Tự ý làm theo ý mình', 'Không quan tâm đến quy định', 'Làm ngược lại lời hướng dẫn'], 'A', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Xe cộ cần phải dừng lại khi có (…).', ['đèn xanh', 'đèn vàng', 'đèn đỏ', 'đèn trắng'], 'C', 'medium', 2, 5),
  sc('Khi đèn xanh bật sáng, người và phương tiện được làm gì?', ['Được phép di chuyển', 'Phải đứng yên', 'Phải quay đầu', 'Phải đi lên vỉa hè'], 'A', 'medium', 2, 6),
  sc('Nếu không có đèn giao thông, việc đi lại sẽ như thế nào?', ['Rất lộn xộn và nguy hiểm', 'Rất yên tĩnh và an toàn', 'Nhanh chóng hơn', 'Không có phương tiện nào đi lại'], 'A', 'medium', 2, 7),
  sc('Tuân thủ đèn giao thông giúp chúng ta điều gì?', ['Bảo đảm an toàn khi đi lại', 'Đến nơi thật nhanh bằng mọi cách', 'Không cần quan sát đường', 'Có thể đi giữa lòng đường'], 'A', 'medium', 2, 8),
  sc('Khi đèn dành cho người đi bộ chuyển sang màu xanh, người đi bộ nên làm gì?', ['Qua đường tại phần đường dành cho người đi bộ', 'Đứng giữa lòng đường', 'Chạy sang đường ở bất cứ chỗ nào', 'Đi ngược chiều xe cộ'], 'A', 'medium', 2, 9),
  sc('Biển báo có hình người đang đi trên vạch kẻ đường báo hiệu điều gì?', ['Nơi người đi bộ qua đường', 'Nơi sửa xe', 'Nơi bán hàng', 'Nơi cấm đi bộ'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với ý nghĩa của ba màu đèn?', ['Đỏ – dừng lại; vàng – đi chậm để chuẩn bị dừng; xanh – được phép đi', 'Đỏ – được đi; vàng – đi nhanh; xanh – dừng lại', 'Đỏ – đi chậm; vàng – được đi; xanh – dừng lại', 'Đỏ – quay đầu; vàng – đỗ xe; xanh – đi lùi'], 'A', 'hard', 3, 1),
  sc('Vì sao đèn giao thông thường được đặt tại ngã ba, ngã tư?', ['Vì đây là nơi nhiều hướng đường và phương tiện gặp nhau', 'Vì nơi đó không có người qua lại', 'Vì ngã ba, ngã tư chỉ dành cho người đi bộ', 'Vì đó là nơi phương tiện được đi tùy ý'], 'A', 'hard', 3, 2),
  sc('Một bạn thấy đèn đỏ nhưng đường đang vắng. Bạn ấy nên làm gì?', ['Vẫn dừng lại và chờ đúng tín hiệu', 'Đi qua thật nhanh', 'Đi lên vỉa hè', 'Nhắm mắt chạy qua đường'], 'A', 'hard', 3, 3),
  sc('Khi đèn vàng bật sáng, người điều khiển phương tiện nên làm gì theo bài học?', ['Đi chậm lại để chuẩn bị dừng hẳn', 'Tăng tốc thật nhanh', 'Dừng xe giữa ngã tư', 'Quay đầu ngay lập tức'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào cho thấy đèn giao thông giúp đường phố có trật tự?', ['Đèn hướng dẫn lúc phải dừng và lúc được phép di chuyển', 'Đèn làm tất cả phương tiện chạy nhanh hơn', 'Đèn khiến người đi bộ không được qua đường', 'Đèn chỉ dùng để trang trí đường phố'], 'A', 'hard', 3, 5),
  sc('Câu nào hoàn thành đúng nội dung bài: Đèn giao thông có (…).', ['ba màu: đỏ, vàng, xanh', 'hai màu: đen và trắng', 'bốn màu khác nhau', 'một màu duy nhất'], 'A', 'hard', 3, 6),
  sc('Dấu thanh nào được dùng đúng trong các từ sau?', ['ngã ba, ngõ nhỏ, điều khiển, bút vẽ', 'ngả ba, ngỏ nhỏ, điều khiển, bút vẻ', 'ngã ba, ngỏ nhỏ, điều khiễn, bút vẽ', 'ngả ba, ngõ nhỏ, điều khiễn, bút vẻ'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đèn đỏ / phương tiện / phải dừng lại / khi có',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'đèn đỏ' },
      { key: '2', text: 'phương tiện' },
      { key: '3', text: 'phải dừng lại' },
      { key: '4', text: 'khi có' },
    ],
    correctAnswerJson: ['4', '1', '2', '3'], // Khi có đèn đỏ, phương tiện phải dừng lại
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Khi có đèn đỏ, phương tiện phải dừng lại".',
  },
  sc('Khi qua đường cùng người lớn, em nên làm gì?', ['Đi đúng vạch kẻ đường, quan sát tín hiệu đèn và đi cùng người lớn', 'Tự chạy qua đường trước', 'Đùa nghịch giữa lòng đường', 'Băng qua đường ở nơi khuất tầm nhìn'], 'A', 'hard', 3, 9),
  sc('Bài học quan trọng nhất của bài đọc là gì?', ['Mọi người cần tuân thủ tín hiệu đèn giao thông để bảo đảm an toàn', 'Có thể đi qua đường khi đèn đỏ nếu đường vắng', 'Đèn giao thông chỉ dành cho ô tô', 'Người đi bộ không cần quan sát tín hiệu đèn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B25 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
