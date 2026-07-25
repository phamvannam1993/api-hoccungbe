require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bảy sắc cầu vồng%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Cầu vồng', 'Bảy sắc cầu vồng', 'Sau cơn mưa', 'Bầu trời'], 'B', 'easy', 1, 1),
  sc('Đáp án của câu đố ở đầu bài là gì?', ['Cây cầu', 'Cầu vồng', 'Đám mây', 'Mặt trời'], 'B', 'easy', 1, 2),
  sc('Cầu vồng thường xuất hiện khi nào?', ['Khi vừa có mưa lại có nắng', 'Khi trời tối', 'Khi có gió lớn', 'Khi trời không có mây'], 'A', 'easy', 1, 3),
  sc('Cầu vồng có bao nhiêu màu?', ['Năm màu', 'Sáu màu', 'Bảy màu', 'Tám màu'], 'C', 'easy', 1, 4),
  sc('Nhìn thấy cầu vồng, bạn nhỏ cảm thấy thế nào?', ['Buồn bã', 'Mừng vui', 'Sợ hãi', 'Tức giận'], 'B', 'easy', 1, 5),
  sc('Màu đỏ trong bài được liên tưởng đến vật gì?', ['Mặt trời', 'Đu đủ', 'Lá cây', 'Hoa sim'], 'A', 'easy', 1, 6),
  sc('Màu cam được liên tưởng đến quả gì?', ['Quả xoài', 'Quả đu đủ', 'Quả táo', 'Quả chuối'], 'B', 'easy', 1, 7),
  sc('Màu lục là màu của gì?', ['Mặt trời', 'Đám mây', 'Lá cây', 'Áo mẹ'], 'C', 'easy', 1, 8),
  sc('Màu tím được liên tưởng đến loài hoa nào?', ['Hoa sen', 'Hoa hồng', 'Hoa sim', 'Hoa cúc'], 'C', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Ngọc Hà', 'Trung Nguyên', 'Phương Dung', 'Nguyễn Vũ'], 'A', 'easy', 1, 10),
  sc('Từ "ẩn hiện" có nghĩa là gì?', ['Lúc hiện ra, lúc khuất đi', 'Luôn xuất hiện rõ ràng', 'Biến mất hoàn toàn', 'Chuyển động rất nhanh'], 'A', 'medium', 2, 1),
  sc('Từ "bừng tỉnh" có nghĩa là gì?', ['Trở nên tươi sáng, sống động trở lại', 'Trở nên tối tăm', 'Chìm vào giấc ngủ', 'Hoàn toàn đứng yên'], 'A', 'medium', 2, 2),
  sc('Cụm từ "mưa rào" chỉ cơn mưa như thế nào?', ['Mưa nhiều và thường diễn ra trong thời gian ngắn', 'Mưa rất nhỏ kéo dài nhiều ngày', 'Mưa tuyết vào mùa đông', 'Mưa chỉ có vài giọt'], 'A', 'medium', 2, 3),
  sc('Màu vàng trong bài được liên tưởng đến gì?', ['Cá bơi', 'Đám mây', 'Áo mẹ', 'Hoa sim'], 'A', 'medium', 2, 4),
  sc('Màu lam trong bài được liên tưởng đến gì?', ['Lá cây', 'Đám mây', 'Mặt trời', 'Quả đu đủ'], 'B', 'medium', 2, 5),
  sc('Màu chàm trong bài được liên tưởng đến gì?', ['Áo mẹ', 'Hoa sim', 'Cá bơi', 'Lá cây'], 'A', 'medium', 2, 6),
  sc('Cặp tiếng nào cùng vần với nhau?', ['vồng – trông', 'nắng – màu', 'trời – lá', 'cam – tím'], 'A', 'medium', 2, 7, '"vồng" và "trông" cùng vần "ông".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['trời – bơi', 'vàng – lá', 'mẹ – sim', 'hiện – mau'], 'A', 'medium', 2, 8, '"trời" và "bơi" cùng vần "ơi".'),
  sc('Tiếng nào trong bài chứa vần ưa?', ['mưa', 'màu', 'trông', 'cầu'], 'A', 'medium', 2, 9, '"mưa" có vần "ưa".'),
  sc('Thứ tự đúng của bảy màu cầu vồng là gì?', ['Đỏ, cam, vàng, lục, lam, chàm, tím', 'Đỏ, vàng, cam, lam, lục, tím, chàm', 'Cam, đỏ, vàng, lục, tím, lam, chàm', 'Tím, chàm, lam, lục, vàng, cam, đỏ'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Cầu vồng xuất hiện → kể tên bảy màu → cầu vồng tan dần sau mưa', 'Cầu vồng tan đi → trời mưa → kể tên bảy màu', 'Kể tên bảy màu → trời tối → cầu vồng xuất hiện', 'Trời có bão → cầu vồng xuất hiện → mặt đất ngập nước'], 'A', 'hard', 3, 1),
  sc('Vì sao câu đố nói cầu vồng là cây cầu "không người nào qua"?', ['Vì cầu vồng chỉ là hiện tượng trên bầu trời, không phải cây cầu thật', 'Vì cầu vồng quá thấp', 'Vì cầu vồng bị đóng cửa', 'Vì cầu vồng nằm dưới nước'], 'A', 'hard', 3, 2),
  sc('Câu thơ nào cho biết cầu vồng xuất hiện rồi biến mất khá nhanh?', ['"Vừa mưa lại nắng"', '"Bảy màu tươi thắm"', '"Cầu vồng ẩn hiện / Rồi lại tan mau"', '"Màu đỏ mặt trời"'], 'C', 'hard', 3, 3),
  sc('Hai câu thơ "Đất trời bừng tỉnh / Sau cơn mưa rào" gợi lên cảnh vật như thế nào?', ['Cảnh vật trở nên tươi sáng và đầy sức sống sau mưa', 'Cảnh vật tối tăm hơn', 'Mọi vật chìm trong giấc ngủ', 'Trời bắt đầu có bão lớn'], 'A', 'hard', 3, 4),
  sc('Vì sao bạn nhỏ yêu thích cầu vồng?', ['Vì cầu vồng có bảy màu tươi thắm và rực rỡ', 'Vì cầu vồng có thể đưa bạn nhỏ đi xa', 'Vì cầu vồng xuất hiện suốt cả ngày', 'Vì cầu vồng tạo ra mưa'], 'A', 'hard', 3, 5),
  sc('Dãy nào ghép đúng màu sắc với sự vật trong bài?', ['Đỏ – mặt trời; cam – đu đủ; lục – lá; tím – hoa sim', 'Đỏ – lá; cam – đám mây; lục – mặt trời; tím – cá', 'Đỏ – hoa sim; cam – lá; lục – áo mẹ; tím – đu đủ', 'Đỏ – cá; cam – mặt trời; lục – hoa sim; tím – lá'], 'A', 'hard', 3, 6),
  sc('Màu nào nằm ngay sau màu vàng trong thứ tự bảy sắc cầu vồng?', ['Màu cam', 'Màu lục', 'Màu lam', 'Màu chàm'], 'B', 'hard', 3, 7),
  sc('Màu nào nằm giữa màu lam và màu tím?', ['Màu đỏ', 'Màu vàng', 'Màu chàm', 'Màu cam'], 'C', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: sau cơn mưa / cầu vồng / thường xuất hiện / có nắng',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'sau cơn mưa' },
      { key: '2', text: 'cầu vồng' },
      { key: '3', text: 'thường xuất hiện' },
      { key: '4', text: 'có nắng' },
    ],
    correctAnswerJson: ['2', '3', '1', '4'], // Cầu vồng thường xuất hiện sau cơn mưa có nắng
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Cầu vồng thường xuất hiện sau cơn mưa có nắng".',
  },
  sc('Khi nhìn thấy cầu vồng ngoài trời, em nên làm gì?', ['Quan sát vẻ đẹp của cầu vồng nhưng không nhìn thẳng vào mặt trời', 'Chạy ra giữa đường để ngắm', 'Nhìn thẳng vào mặt trời thật lâu', 'Tự trèo lên nơi cao nguy hiểm'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B34 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
