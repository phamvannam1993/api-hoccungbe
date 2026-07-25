require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_TITLE_LIKE = '%Bài 69%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôi, uôm', 'uôn, uông', 'ươi, ươu', 'ươn, ương'], 'C', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ươi?', ['bướu', 'người', 'hươu', 'khướu'], 'B', 'easy', 1, 2, '"người" có vần "ươi".'),
  sc('Tiếng nào dưới đây có vần ươu?', ['cười', 'lưỡi', 'bưởi', 'hươu'], 'D', 'easy', 1, 3, '"hươu" có vần "ươu".'),
  sc('Ghép âm ng với vần ươi được tiếng nào?', ['người', 'ngươi', 'ngườu', 'ngươiêu'], 'B', 'easy', 1, 4, 'ng + ươi = "ngươi".'),
  sc('Loài chim nào biết bắt chước tiếng người?', ['Chim sẻ', 'Chim khướu', 'Chim én', 'Chim sâu'], 'B', 'easy', 1, 5),
  sc('Loại quả xuất hiện trong bài là quả gì?', ['Quả cam', 'Quả táo', 'Quả bưởi', 'Quả chuối'], 'C', 'easy', 1, 6),
  sc('Cụm từ nào phù hợp với hình ảnh bạn nhỏ đang mỉm cười?', ['tươi cười', 'buồn bã', 'tức giận', 'mệt mỏi'], 'A', 'easy', 1, 7),
  sc('Con vật có vỏ xuất hiện trong phần Đọc là con gì?', ['Ốc sên', 'Ốc bươu', 'Con trai', 'Con cua'], 'B', 'easy', 1, 8),
  sc('Con vật nào được giới thiệu trong đoạn đọc?', ['Con voi', 'Con ngựa', 'Lạc đà', 'Con hươu'], 'C', 'easy', 1, 9),
  sc('Lạc đà có bộ phận đặc biệt nào trên lưng?', ['Chiếc sừng', 'Cái bướu', 'Đôi cánh', 'Chiếc vòi'], 'B', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần ươi?', ['bưởi, cười, lưỡi, mười', 'bướu, hươu, khướu, rượu', 'bưởi, hươu, cười, bướu', 'lưỡi, khướu, mười, rượu'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần ươu?', ['cười, lưỡi, người', 'bưởi, mười, tươi', 'bướu, hươu, khướu, rượu', 'bướu, người, hươu, cười'], 'C', 'medium', 2, 2),
  sc('Trong cụm từ "tươi cười", có bao nhiêu tiếng mang vần ươi?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, 'Hai tiếng đó là "tươi" và "cười".'),
  sc('Trong cụm từ "quả bưởi", tiếng nào có vần ươi?', ['quả', 'bưởi', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"bưởi" có vần "ươi".'),
  sc('Trong cụm từ "ốc bươu", tiếng nào có vần ươu?', ['ốc', 'bươu', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"bươu" có vần "ươu".'),
  sc('Điền vần thích hợp để tạo thành tiếng "cười": c…', ['ươi', 'ươu', 'uôi', 'uôn'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "bướu": b…', ['ươi', 'ươu', 'ươn', 'ương'], 'B', 'medium', 2, 7),
  sc('Bướu của lạc đà là nơi dự trữ gì?', ['Nước biển', 'Chất béo', 'Không khí', 'Cát'], 'B', 'medium', 2, 8),
  sc('Nhờ có bướu, lạc đà có thể làm gì?', ['Bay trên trời', 'Bơi dưới biển', 'Sống qua nhiều ngày mà không cần ăn uống', 'Leo lên cây cao'], 'C', 'medium', 2, 9),
  sc('Lạc đà giúp con người đi qua nơi nào?', ['Những khu rừng rậm', 'Những vùng sa mạc khô cằn', 'Những cánh đồng lúa', 'Những dòng sông lớn'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần ươi – ươu?', ['người – khướu', 'hươu – cười', 'bướu – bưởi', 'rượu – lưỡi'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần ươi và vần ươu?', ['Bé đang tươi cười.', 'Con hươu chạy trong rừng.', 'Chim khướu bắt chước tiếng người.', 'Mẹ mua một quả bưởi.'], 'C', 'hard', 3, 2, '"khướu" có vần ươu; "người" có vần ươi.'),
  sc('Trong câu "Chim khướu biết bắt chước tiếng người", có bao nhiêu tiếng chứa vần ươi hoặc ươu?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là "khướu" và "người".'),
  sc('Trong đoạn đọc về lạc đà, có bao nhiêu lần tiếng "bướu" xuất hiện?', ['Một lần', 'Hai lần', 'Ba lần', 'Bốn lần'], 'B', 'hard', 3, 4),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['bưởi', 'cười', 'lưỡi', 'hươu'], 'D', 'hard', 3, 5, '"bưởi, cười, lưỡi" có vần ươi; "hươu" có vần ươu.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['người – vần ươi', 'bưởi – vần ươi', 'khướu – vần ươu', 'bướu – vần ươi'], 'D', 'hard', 3, 6, 'Tiếng "bướu" có vần "ươu", không phải vần "ươi".'),
  sc('Thứ tự nào phù hợp với nội dung đoạn đọc?', ['Lạc đà có bướu → bướu dự trữ chất béo → lạc đà sống được nhiều ngày → giúp người qua sa mạc', 'Lạc đà qua sa mạc → mọc bướu → tìm thức ăn → về nhà', 'Lạc đà uống nước → bướu biến mất → con người đi bộ', 'Lạc đà sống trong rừng → leo cây → giúp con người hái quả'], 'A', 'hard', 3, 7),
  sc('Vì sao lạc đà thích hợp với cuộc sống ở sa mạc?', ['Vì lạc đà có thể bay', 'Vì bướu dự trữ chất béo, giúp nó sống qua nhiều ngày không cần ăn uống', 'Vì lạc đà sống dưới nước', 'Vì lạc đà có đôi cánh rất lớn'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chim khướu / tiếng người / bắt chước / biết',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'chim khướu' }, { key: '2', text: 'tiếng người' }, { key: '3', text: 'bắt chước' }, { key: '4', text: 'biết' }],
    correctAnswerJson: ['1', '4', '3', '2'], // Chim khướu biết bắt chước tiếng người
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Chim khướu biết bắt chước tiếng người".',
  },
  sc('Vật nuôi mang lại lợi ích nào cho con người?', ['Cung cấp thực phẩm, hỗ trợ lao động và làm bạn với con người', 'Chỉ làm hỏng cây cối', 'Không mang lại lợi ích gì', 'Chỉ sống trong rừng sâu'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  const [ls] = await c.query("SELECT l.id FROM lessons l JOIN courses c ON c.id=l.courseId WHERE c.slug='tieng-viet-lop-1' AND l.title LIKE ?", [LESSON_TITLE_LIKE]);
  if (!ls.length) { console.log('KHÔNG tìm thấy lesson', LESSON_TITLE_LIKE); process.exit(1); }
  const LESSON_ID = ls[0].id;
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('lesson', LESSON_ID, '| vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B69 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
