require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 79%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uân, uât', 'uyên, uyêt', 'oai, uê', 'ươn, ương'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uyên?', ['tuyết', 'khuyết', 'thuyền', 'tuyệt'], 'C', 'easy', 1, 2, '"thuyền" có vần "uyên".'),
  sc('Tiếng nào dưới đây có vần uyêt?', ['luyện', 'chuyển', 'truyền', 'duyệt'], 'D', 'easy', 1, 3, '"duyệt" có vần "uyêt".'),
  sc('Ghép âm ch với vần uyên và thêm dấu nặng được tiếng nào?', ['chuyện', 'chuyệt', 'chuyển', 'chuyến'], 'A', 'easy', 1, 4, 'ch + uyên + dấu nặng = "chuyện".'),
  sc('Trong câu "Bà kể chuyện hay tuyệt", ai là người kể chuyện?', ['Mẹ', 'Bố', 'Bà', 'Cô giáo'], 'C', 'easy', 1, 5),
  sc('Bà kể chuyện như thế nào?', ['Rất nhỏ', 'Hay tuyệt', 'Rất nhanh', 'Khó hiểu'], 'B', 'easy', 1, 6),
  sc('Phương tiện đi lại trên mặt nước xuất hiện trong bài là gì?', ['Con thuyền', 'Xe máy', 'Máy bay', 'Tàu hỏa'], 'A', 'easy', 1, 7),
  sc('Mặt trăng không tròn đầy được gọi là gì?', ['Trăng sáng', 'Trăng khuyết', 'Trăng tròn', 'Trăng đỏ'], 'B', 'easy', 1, 8),
  sc('Câu chuyện được lưu truyền từ lâu đời, thường có những chi tiết kì lạ được gọi là gì?', ['Bài thơ', 'Truyền thuyết', 'Bài hát', 'Câu đố'], 'B', 'easy', 1, 9),
  sc('Bài thơ trong phần Đọc có tên là gì?', ['Trăng khuyết', 'Con thuyền', 'Trăng sáng', 'Cảnh biển'], 'C', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uyên?', ['chuyển, luyện, thuyền, truyền', 'duyệt, khuyết, tuyết, tuyệt', 'chuyện, tuyết, truyền, duyệt', 'luyện, khuyết, thuyền, tuyệt'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uyêt?', ['chuyển, luyện, thuyền', 'duyệt, khuyết, tuyết, tuyệt', 'chuyện, truyền, luyện', 'thuyền, tuyết, truyền'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "con thuyền", tiếng nào có vần uyên?', ['con', 'thuyền', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"thuyền" có vần "uyên".'),
  sc('Trong cụm từ "trăng khuyết", tiếng nào có vần uyêt?', ['trăng', 'khuyết', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"khuyết" có vần "uyêt".'),
  sc('Trong cụm từ "truyền thuyết", hai tiếng lần lượt có vần gì?', ['uyên và uyêt', 'uyêt và uyên', 'Cùng có vần uyên', 'Cùng có vần uyêt'], 'A', 'medium', 2, 5, '"truyền" có vần uyên; "thuyết" có vần uyêt.'),
  sc('Điền vần thích hợp để tạo thành tiếng "thuyền": th…', ['uyên', 'uyêt', 'uân', 'uât'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "tuyết": t…', ['uyên', 'uyêt', 'uê', 'uy'], 'B', 'medium', 2, 7),
  sc('Trong bài thơ, trăng tròn được so sánh với vật gì?', ['Quả bóng', 'Cái đĩa', 'Con thuyền', 'Chiếc bánh'], 'B', 'medium', 2, 8),
  sc('Trăng khuyết trông giống vật gì?', ['Con thuyền trôi', 'Cánh diều bay', 'Chiếc lá rơi', 'Quả chuối'], 'A', 'medium', 2, 9),
  sc('Khi bạn nhỏ đi, trăng dường như làm gì?', ['Trăng biến mất', 'Trăng rơi xuống đất', 'Trăng theo bước bạn nhỏ', 'Trăng chìm xuống biển'], 'C', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uyên – uyêt?', ['thuyền – tuyết', 'tuyết – thuyền', 'tuyệt – luyện', 'khuyết – truyền'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uyên và vần uyêt?', ['Bà kể chuyện hay tuyệt.', 'Con thuyền trôi trên sông.', 'Trăng khuyết trên bầu trời.', 'Bé chăm chỉ luyện viết.'], 'A', 'hard', 3, 2, 'chuyện (uyên), tuyệt (uyêt).'),
  sc('Trong câu "Bà kể chuyện hay tuyệt", có bao nhiêu tiếng chứa vần uyên hoặc uyêt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là chuyện và tuyệt.'),
  sc('Trong hai câu thơ "Những hôm nào trăng khuyết, trông giống con thuyền trôi", có bao nhiêu tiếng chứa vần uyên hoặc uyêt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 4, 'khuyết (uyêt), thuyền (uyên).'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['chuyển', 'luyện', 'truyền', 'khuyết'], 'D', 'hard', 3, 5, '"chuyển, luyện, truyền" có vần uyên; "khuyết" có vần uyêt.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['thuyền – vần uyên', 'truyền – vần uyên', 'tuyết – vần uyêt', 'tuyệt – vần uyên'], 'D', 'hard', 3, 6, 'Tiếng "tuyệt" có vần "uyêt", không phải vần "uyên".'),
  sc('Vì sao bạn nhỏ cảm thấy trăng muốn cùng mình đi chơi?', ['Vì trăng dường như di chuyển theo bước chân của bạn nhỏ', 'Vì trăng rơi xuống sân nhà', 'Vì bạn nhỏ cầm mặt trăng trên tay', 'Vì trăng biến thành con thuyền'], 'A', 'hard', 3, 7),
  sc('Hai hình ảnh so sánh trong bài thơ là gì?', ['Trăng tròn như cái đĩa; trăng khuyết giống con thuyền trôi', 'Trăng tròn như quả bóng; trăng khuyết giống chiếc lá', 'Trăng sáng như ngọn đèn; trăng khuyết giống cánh diều', 'Trăng tròn như mặt trời; trăng khuyết giống đám mây'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: trăng khuyết / giống / con thuyền trôi / trông',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'trăng khuyết' },
      { key: '2', text: 'giống' },
      { key: '3', text: 'con thuyền trôi' },
      { key: '4', text: 'trông' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Trăng khuyết trông giống con thuyền trôi
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Trăng khuyết trông giống con thuyền trôi".',
  },
  sc('Khi ngắm cảnh trăng trên biển, em nên làm gì?', ['Quan sát cảnh vật, giữ an toàn và không vứt rác xuống biển', 'Tự ý xuống thuyền khi không có người lớn', 'Đứng sát mép nước để đùa nghịch', 'Ném đồ vật xuống biển'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  const [ls] = await c.query("SELECT l.id FROM lessons l JOIN courses c ON c.id=l.courseId WHERE c.slug='tieng-viet-lop-1' AND l.title LIKE ?", [TITLE_LIKE]);
  if (!ls.length) { console.log('KHÔNG thấy lesson', TITLE_LIKE); process.exit(1); }
  const LESSON_ID = ls[0].id;
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('lesson', LESSON_ID, '| vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B79 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
