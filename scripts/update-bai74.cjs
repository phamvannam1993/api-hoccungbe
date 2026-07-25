require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 74%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['ua, uê', 'oa, oe', 'ươn, ương', 'ươm, ươp'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần oa?', ['hoa', 'khoẻ', 'xoè', 'loé'], 'A', 'easy', 1, 2, '"hoa" có vần "oa".'),
  sc('Tiếng nào dưới đây có vần oe?', ['loa', 'toả', 'khoe', 'xoá'], 'C', 'easy', 1, 3, '"khoe" có vần "oe".'),
  sc('Ghép âm h với vần oa được tiếng nào?', ['hoe', 'hoa', 'hỏa', 'hưa'], 'B', 'easy', 1, 4, 'h + oa = "hoa".'),
  sc('Hình ảnh bông hồng trong bài được gọi là gì?', ['Đoá hoa', 'Cành cây', 'Bó rau', 'Quả đỏ'], 'A', 'easy', 1, 5),
  sc('Chiếc váy mở rộng ở phía dưới được gọi là gì?', ['Váy dài', 'Váy xoè', 'Váy hoa', 'Váy trắng'], 'B', 'easy', 1, 6),
  sc('Loài chim xuất hiện trong phần Đọc là chim gì?', ['Chích choè', 'Chim sẻ', 'Chim sâu', 'Chim én'], 'A', 'easy', 1, 7),
  sc('Các loài hoa trong phần Nhận biết đang làm gì?', ['Đua nhau khoe sắc', 'Cùng nhau ngủ', 'Bay trên trời', 'Rơi xuống đất'], 'A', 'easy', 1, 8),
  sc('Tết đến, những loài hoa nào được nhắc tới?', ['Hoa đào và hoa mai', 'Hoa sen và hoa súng', 'Hoa hồng và hoa cúc', 'Hoa phượng và hoa sữa'], 'A', 'easy', 1, 9),
  sc('Hoa mai trong bài có màu gì?', ['Màu đỏ', 'Màu tím', 'Màu vàng', 'Màu trắng'], 'C', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần oa?', ['hoà, loa, toả, xoá', 'khoẻ, loè, loé, xoè', 'hoa, khoẻ, xoá, xoè', 'loa, loè, toả, loé'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần oe?', ['hoa, loa, toả, xoá', 'khoẻ, loè, loé, xoè', 'hoà, khoẻ, toả, xoè', 'loa, loè, xoá, loé'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "đoá hoa", có bao nhiêu tiếng chứa vần oa?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, 'Hai tiếng đó là "đoá" và "hoa".'),
  sc('Trong cụm từ "váy xoè", tiếng nào có vần oe?', ['váy', 'xoè', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"xoè" có vần "oe".'),
  sc('Trong cụm từ "chích choè", tiếng nào có vần oe?', ['chích', 'choè', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"choè" có vần "oe".'),
  sc('Điền vần thích hợp để tạo thành tiếng "hoa": h…', ['oa', 'oe', 'ua', 'uê'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "xoè": x…', ['oa', 'oe', 'oai', 'uê'], 'B', 'medium', 2, 7),
  sc('Khi Tết đến, hoa đào khoe sắc như thế nào?', ['Hồng tươi', 'Trắng muốt', 'Tím biếc', 'Xanh thẫm'], 'A', 'medium', 2, 8),
  sc('Hè sang, loài hoa nào bừng lửa đỏ?', ['Hoa đào', 'Hoa cải', 'Hoa phượng', 'Hoa sữa'], 'C', 'medium', 2, 9),
  sc('Cuối thu, loài hoa nào toả hương nồng nàn?', ['Hoa mai', 'Hoa sữa', 'Hoa cải', 'Hoa sen'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần oa – oe?', ['hoa – khoe', 'khoe – hoa', 'xoè – loa', 'loé – toả'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần oa và vần oe?', ['Hoa mai vàng nở rộ.', 'Các loài hoa đua nhau khoe sắc.', 'Hoa cải nở bên sông.', 'Chim chích choè đang hót.'], 'B', 'hard', 3, 2, '"hoa" có vần oa; "khoe" có vần oe.'),
  sc('Trong câu "Các loài hoa đua nhau khoe sắc", có bao nhiêu tiếng chứa vần oa hoặc oe?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là "hoa" và "khoe".'),
  sc('Trong câu "Tết đến, hoa đào khoe sắc hồng tươi, hoa mai vàng nở rộ", có bao nhiêu tiếng chứa vần oa hoặc oe?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'B', 'hard', 3, 4, 'Các tiếng đó là: hoa, khoe, hoa.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['hoa', 'loa', 'toả', 'khoẻ'], 'D', 'hard', 3, 5, '"hoa, loa, toả" có vần oa; "khoẻ" có vần oe.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['hoa – vần oa', 'xoá – vần oa', 'khoe – vần oe', 'xoè – vần oa'], 'D', 'hard', 3, 6, 'Tiếng "xoè" có vần "oe", không phải vần "oa".'),
  sc('Thứ tự nào đúng với các mùa và loài hoa trong đoạn đọc?', ['Tết – hoa đào, hoa mai → hè – hoa phượng → cuối thu – hoa sữa → cuối đông – hoa cải', 'Tết – hoa cải → hè – hoa sữa → cuối thu – hoa mai → cuối đông – hoa phượng', 'Tết – hoa phượng → hè – hoa đào → cuối thu – hoa cải → cuối đông – hoa sữa', 'Tết – hoa sữa → hè – hoa mai → cuối thu – hoa phượng → cuối đông – hoa đào'], 'A', 'hard', 3, 7),
  sc('Hoa cải cuối đông được miêu tả như thế nào?', ['Trải thảm vàng rực rỡ bên sông', 'Bừng lửa đỏ ở góc trời', 'Toả hương nồng nàn trên phố', 'Khoe sắc hồng tươi trong vườn'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đua nhau / các loài hoa / khoe sắc',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'đua nhau' }, { key: '2', text: 'các loài hoa' }, { key: '3', text: 'khoe sắc' }],
    correctAnswerJson: ['2', '1', '3'], // Các loài hoa đua nhau khoe sắc
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Các loài hoa đua nhau khoe sắc".',
  },
  sc('Em nên làm gì để chăm sóc và bảo vệ hoa?', ['Tưới nước, không ngắt hoa và không giẫm lên cây', 'Hái tất cả hoa mang về nhà', 'Bẻ cành và giẫm lên luống hoa', 'Vứt rác vào vườn hoa'], 'A', 'hard', 3, 10),
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
    console.log('B74 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
