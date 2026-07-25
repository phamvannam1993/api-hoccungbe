require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 80%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài 80 có nội dung chính là gì?', ['Học vần mới', 'Ôn tập và kể chuyện', 'Học phép tính', 'Luyện viết số'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần oan?', ['ngoan', 'loắt', 'hoạt', 'thoăn'], 'A', 'easy', 1, 2, '"ngoan" có vần "oan".'),
  sc('Tiếng nào dưới đây có vần oăn?', ['loài', 'thoăn', 'luật', 'huệ'], 'B', 'easy', 1, 3, '"thoăn" có vần "oăn".'),
  sc('Tiếng nào dưới đây có vần oat?', ['hoạt', 'loắt', 'chuyển', 'ngoan'], 'A', 'easy', 1, 4, '"hoạt" có vần "oat".'),
  sc('Tiếng nào dưới đây có vần oăt?', ['luận', 'loài', 'loắt', 'duyệt'], 'C', 'easy', 1, 5, '"loắt" có vần "oăt".'),
  sc('Tiếng nào dưới đây có vần oai?', ['huệ', 'loài', 'tuỳ', 'luật'], 'B', 'easy', 1, 6, '"loài" có vần "oai".'),
  sc('Tiếng nào dưới đây có vần uê?', ['huệ', 'tuỳ', 'luận', 'chuyển'], 'A', 'easy', 1, 7, '"huệ" có vần "uê".'),
  sc('Tiếng nào dưới đây có vần uy?', ['duyệt', 'tuỳ', 'huệ', 'ngoại'], 'B', 'easy', 1, 8, '"tuỳ" có vần "uy".'),
  sc('Câu chuyện trong bài có tên là gì?', ['Hươu và sói', 'Cặp sừng và đôi chân', 'Hươu và dòng suối', 'Đôi chân nhanh nhẹn'], 'B', 'easy', 1, 9),
  sc('Câu nào được yêu cầu luyện viết trong bài?', ['Mỗi lần về quê, Hà lại được nghe kể chuyện.', 'Xuân về, đào nở thắm, quất trĩu quả.', 'Hà rất thích nghe bà kể chuyện.', 'Hươu chạy thoăn thoắt trong rừng.'], 'B', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần oan – oăn – oat – oăt?', ['ngoan – thoăn – hoạt – loắt', 'thoăn – ngoan – loắt – hoạt', 'hoạt – loắt – ngoan – thoăn', 'loắt – hoạt – thoăn – ngoan'], 'A', 'medium', 2, 1),
  sc('Dãy nào lần lượt chứa các vần oai – uê – uy?', ['ngoại – huệ – tuỳ', 'huệ – tuỳ – ngoại', 'tuỳ – ngoại – huệ', 'ngoại – tuỳ – huệ'], 'A', 'medium', 2, 2),
  sc('Dãy nào lần lượt chứa các vần uân – uât – uyên – uyêt?', ['luận – luật – chuyển – duyệt', 'luật – luận – duyệt – chuyển', 'chuyển – duyệt – luận – luật', 'duyệt – chuyển – luật – luận'], 'A', 'medium', 2, 3),
  sc('Trong cụm từ "ngoan ngoãn", cả hai tiếng có vần gì?', ['oan', 'oăn', 'oat', 'oăt'], 'A', 'medium', 2, 4, '"ngoan" và "ngoãn" đều có vần "oan".'),
  sc('Trong cụm từ "thoăn thoắt", hai tiếng lần lượt có vần gì?', ['oan và oat', 'oăn và oăt', 'oat và oăt', 'oăn và oat'], 'B', 'medium', 2, 5, '"thoăn" có vần oăn; "thoắt" có vần oăt.'),
  sc('Trong cụm từ "tuyệt vời", tiếng "tuyệt" có vần gì?', ['uyên', 'uyêt', 'uân', 'uât'], 'B', 'medium', 2, 6, '"tuyệt" có vần "uyêt".'),
  sc('Mỗi lần về quê, ai kể chuyện cho Hà nghe?', ['Ông', 'Bố', 'Bà', 'Mẹ'], 'C', 'medium', 2, 7),
  sc('Bà kể cho Hà nghe những truyền thuyết nào?', ['Lạc Long Quân, Thánh Gióng và hồ Hoàn Kiếm', 'Sơn Tinh, Thủy Tinh và cây khế', 'Sự tích trầu cau và bánh chưng', 'Chú Cuội và cây đa'], 'A', 'medium', 2, 8),
  sc('Bà kể những sự tích về cây gì?', ['Cây đào và cây mai', 'Cây quất và cây xoài', 'Cây chuối và cây mít', 'Cây khế và cây tre'], 'B', 'medium', 2, 9),
  sc('Giọng kể của bà được miêu tả như thế nào?', ['Cao và nhanh', 'Trầm ấm', 'Nhỏ và khó nghe', 'Gấp gáp'], 'B', 'medium', 2, 10),
  sc('Trong cụm từ "Xuân về, đào nở thắm, quất trĩu quả", tiếng nào chứa vần uân?', ['về', 'xuân', 'quất', 'quả'], 'B', 'hard', 3, 1, '"xuân" có vần "uân".'),
  sc('Trong câu "Xuân về, đào nở thắm, quất trĩu quả", tiếng nào chứa vần uât?', ['xuân', 'đào', 'quất', 'trĩu'], 'C', 'hard', 3, 2, '"quất" có vần "uât".'),
  sc('Cụm từ nào có cả vần oăn và vần oăt?', ['ngoan ngoãn', 'thoăn thoắt', 'tuyệt vời', 'xum xuê'], 'B', 'hard', 3, 3, '"thoăn" (oăn) và "thoắt" (oăt).'),
  sc('Trong đoạn đọc, vì sao Hà chăm chú nghe bà kể chuyện từ đầu đến cuối?', ['Vì Hà phải ghi chép lại', 'Vì giọng bà trầm ấm và những câu chuyện rất hấp dẫn', 'Vì bà không cho Hà đi chơi', 'Vì Hà đang làm bài tập'], 'B', 'hard', 3, 4),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['chuyển', 'truyền', 'thuyền', 'duyệt'], 'D', 'hard', 3, 5, '"chuyển, truyền, thuyền" có vần uyên; "duyệt" có vần uyêt.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['ngoan – vần oan', 'thoăn – vần oăn', 'luật – vần uât', 'duyệt – vần uyên'], 'D', 'hard', 3, 6, 'Tiếng "duyệt" có vần "uyêt", không phải vần "uyên".'),
  sc('Trước khi gặp chó sói, hươu cảm thấy thế nào về cặp sừng và đôi chân của mình?', ['Hươu thích đôi chân và không thích cặp sừng', 'Hươu tự hào về cặp sừng nhưng không hài lòng với đôi chân', 'Hươu không quan tâm đến cả sừng và chân', 'Hươu đều không thích cặp sừng và đôi chân'], 'B', 'hard', 3, 7),
  sc('Khi đang đi trong rừng, hươu gặp nguy hiểm gì?', ['Gặp một con chó sói đuổi bắt', 'Gặp một trận mưa lớn', 'Bị rơi xuống sông', 'Gặp một người thợ săn'], 'A', 'hard', 3, 8),
  sc('Bộ phận nào đã giúp hươu chạy nhanh và thoát khỏi nguy hiểm?', ['Cặp sừng', 'Đôi tai', 'Đôi chân', 'Chiếc đuôi'], 'C', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện "Cặp sừng và đôi chân" là gì?', ['Không nên chỉ đánh giá sự vật qua vẻ đẹp bên ngoài', 'Cặp sừng luôn quan trọng hơn đôi chân', 'Những bộ phận đẹp mới có ích', 'Không cần trân trọng những gì mình có'], 'A', 'hard', 3, 10),
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
    console.log('B80 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
