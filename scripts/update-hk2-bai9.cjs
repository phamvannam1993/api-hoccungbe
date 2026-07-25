require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Cả nhà đi chơi núi%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Cả nhà đi biển', 'Cả nhà đi chơi núi', 'Một ngày ở công viên', 'Chuyến đi về quê'], 'B', 'easy', 1, 1),
  sc('Bố mẹ cho những ai đi chơi núi?', ['Nam và Hà', 'Nam và Đức', 'Đức và Minh', 'Hà và Đức'], 'B', 'easy', 1, 2),
  sc('Trước chuyến đi, ai thức khuya để chuẩn bị đồ?', ['Bố', 'Mẹ', 'Nam', 'Đức'], 'B', 'easy', 1, 3),
  sc('Mẹ chuẩn bị loại trang phục nào cho chuyến đi?', ['Quần áo', 'Đồng phục', 'Áo mưa', 'Áo biểu diễn'], 'A', 'easy', 1, 4),
  sc('Mẹ chuẩn bị những gì để cả nhà ăn và uống?', ['Thức ăn và nước uống', 'Bánh sinh nhật và sữa', 'Rau và cá', 'Kẹo và nước ngọt'], 'A', 'easy', 1, 5),
  sc('Mẹ mang theo loại thuốc gì?', ['Thuốc đau bụng', 'Thuốc ho', 'Tuýp thuốc chống côn trùng', 'Thuốc nhỏ mắt'], 'C', 'easy', 1, 6),
  sc('Hôm sau, cả nhà đã tới đâu?', ['Đỉnh núi', 'Chân núi', 'Bờ biển', 'Công viên'], 'B', 'easy', 1, 7),
  sc('Nam và Đức đuổi nhau như thế nào?', ['Chậm chạp', 'Rón rén', 'Huỳnh huỵch', 'Nhẹ nhàng'], 'C', 'easy', 1, 8),
  sc('Khi đường lên núi dốc và khúc khuỷu, bố làm gì?', ['Cõng Đức', 'Cõng Nam', 'Quay về nhà', 'Ngồi nghỉ'], 'A', 'easy', 1, 9),
  sc('Khi lên đến đỉnh núi, Nam và Đức làm gì?', ['Ngồi ngủ', 'Vui sướng hét vang', 'Đi xuống ngay', 'Bắt côn trùng'], 'B', 'easy', 1, 10),
  sc('Từ "thích thú" nói lên cảm xúc nào?', ['Vui vẻ và hào hứng', 'Sợ hãi và lo lắng', 'Buồn bã và mệt mỏi', 'Tức giận và khó chịu'], 'A', 'medium', 2, 1),
  sc('Từ "khúc khuỷu" dùng để miêu tả con đường như thế nào?', ['Thẳng và bằng phẳng', 'Quanh co, nhiều chỗ gấp khúc', 'Rộng và đông người', 'Ngắn và dễ đi'], 'B', 'medium', 2, 2),
  sc('Cụm từ "huỳnh huỵch" gợi tả âm thanh hoặc dáng chạy như thế nào?', ['Nhẹ nhàng, không có tiếng động', 'Mạnh và phát ra tiếng liên tiếp', 'Chậm rãi, mệt mỏi', 'Rón rén, cẩn thận'], 'B', 'medium', 2, 3),
  sc('Thỉnh thoảng, mẹ làm gì cho hai anh em?', ['Cho hai anh em ăn bánh', 'Lau mồ hôi cho hai anh em', 'Cõng cả hai anh em', 'Mua đồ chơi cho hai anh em'], 'B', 'medium', 2, 4),
  sc('Điền từ thích hợp vào chỗ trống: Đường lên núi quanh co, (…).', ['thấp', 'hào hứng', 'khúc khuỷu', 'bằng phẳng'], 'C', 'medium', 2, 5),
  sc('Tiếng "tuýp" chứa vần nào?', ['uya', 'uyp', 'uynh', 'uych'], 'B', 'medium', 2, 6, '"tuýp" có vần "uyp".'),
  sc('Tiếng "khuỷu" chứa vần nào?', ['uyu', 'uyp', 'uya', 'uynh'], 'A', 'medium', 2, 7, '"khuỷu" có vần "uyu".'),
  sc('Tiếng "huỳnh" chứa vần nào?', ['uyp', 'uynh', 'uych', 'uyu'], 'B', 'medium', 2, 8, '"huỳnh" có vần "uynh".'),
  sc('Tiếng "huỵch" chứa vần nào?', ['uynh', 'uya', 'uych', 'uyp'], 'C', 'medium', 2, 9, '"huỵch" có vần "uych".'),
  sc('Cụm từ nào được viết đúng?', ['Đèn khuỷu', 'Đèn tuýp', 'Đèn huỳnh', 'Đèn huỵch'], 'B', 'medium', 2, 10, 'Viết đúng là "đèn tuýp".'),
  sc('Thứ tự nào đúng với diễn biến chuyến đi?', ['Đến đỉnh núi → mẹ chuẩn bị đồ → cả nhà tới chân núi', 'Mẹ chuẩn bị đồ → cả nhà tới chân núi → leo núi → lên đến đỉnh', 'Nam và Đức hét vang → bố cõng Đức → mẹ chuẩn bị đồ', 'Bố cõng Đức → cả nhà về nhà → mẹ chuẩn bị đồ'], 'B', 'hard', 3, 1),
  sc('Vì sao mẹ phải thức khuya trước chuyến đi?', ['Vì mẹ phải làm việc ở trường', 'Vì mẹ chuẩn bị đầy đủ đồ dùng cho cả nhà', 'Vì mẹ không muốn đi ngủ', 'Vì mẹ phải xem phim'], 'B', 'hard', 3, 2),
  sc('Vì sao bố phải cõng Đức?', ['Vì Đức muốn nhìn cảnh vật từ trên cao', 'Vì đường càng lên cao càng dốc và khúc khuỷu', 'Vì Đức làm mất giày', 'Vì Đức muốn chạy nhanh hơn Nam'], 'B', 'hard', 3, 3),
  sc('Chi tiết nào cho thấy mẹ quan tâm, chăm sóc các con?', ['Mẹ đi trước cả nhà', 'Mẹ lau mồ hôi cho hai anh em', 'Mẹ ngồi nghỉ dưới chân núi', 'Mẹ hái hoa bên đường'], 'B', 'hard', 3, 4),
  sc('Câu nào hoàn thành đúng nội dung bài: Đến đoạn đường dốc và khúc khuỷu, bố phải (…).', ['cõng Đức', 'cõng Nam', 'quay xuống chân núi', 'chạy thật nhanh'], 'A', 'hard', 3, 5),
  sc('Dãy nào lần lượt chứa các vần uyp – uyu – uynh – uych?', ['tuýp – khuỷu – huỳnh – huỵch', 'khuỷu – tuýp – huỵch – huỳnh', 'huỳnh – huỵch – tuýp – khuỷu', 'huỵch – huỳnh – khuỷu – tuýp'], 'A', 'hard', 3, 6),
  sc('Điền vần thích hợp để tạo thành các từ đúng: đèn t… – kh… tay', ['uyu – uyp', 'uyp – uyu', 'uynh – uych', 'uych – uynh'], 'B', 'hard', 3, 7, 'Viết đúng là "đèn tuýp – khuỷu tay".'),
  sc('Điền vần thích hợp để tạo thành các từ đúng: h… tay – phụ h…', ['uynh – uych', 'uych – uynh', 'uyp – uyu', 'uyu – uyp'], 'B', 'hard', 3, 8, 'Viết đúng là "huých tay – phụ huynh".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: hai anh em / lên đến đỉnh núi / vui sướng / hét vang',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'hai anh em' },
      { key: '2', text: 'lên đến đỉnh núi' },
      { key: '3', text: 'vui sướng' },
      { key: '4', text: 'hét vang' },
    ],
    correctAnswerJson: ['2', '1', '3', '4'], // Lên đến đỉnh núi, hai anh em vui sướng hét vang
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Lên đến đỉnh núi, hai anh em vui sướng hét vang".',
  },
  sc('Khi đi chơi núi cùng gia đình, em nên làm gì để bảo đảm an toàn?', ['Tự ý tách khỏi gia đình để khám phá', 'Chạy nhanh trên đoạn đường dốc', 'Đi theo người lớn, mang đủ nước và cẩn thận trên đường dốc', 'Leo lên những tảng đá cao một mình'], 'C', 'hard', 3, 10),
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
    console.log('HK2-B9 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
