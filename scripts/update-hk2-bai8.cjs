require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Làm anh%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Em gái bé', 'Làm anh', 'Anh em trong nhà', 'Người anh tốt'], 'B', 'easy', 1, 1),
  sc('Trong bài thơ, làm anh được miêu tả như thế nào?', ['Rất dễ', 'Khó đấy', 'Không cần cố gắng', 'Chỉ là chuyện đùa'], 'B', 'easy', 1, 2),
  sc('Người anh cần tỏ ra như thế nào với em gái bé?', ['Như một người lớn', 'Như một người lạ', 'Như một em bé', 'Như một người bạn mới'], 'A', 'easy', 1, 3),
  sc('Khi em bé khóc, anh phải làm gì?', ['Bỏ đi chơi', 'Dỗ dành em', 'Gọi các bạn', 'Giấu đồ chơi'], 'B', 'easy', 1, 4),
  sc('Khi em bé bị ngã, anh phải làm gì?', ['Cười em', 'Đứng nhìn', 'Nâng em dịu dàng', 'Chạy về nhà'], 'C', 'easy', 1, 5),
  sc('Khi mẹ cho quà bánh, anh nên làm gì?', ['Giữ hết cho mình', 'Chia em phần hơn', 'Cất quà đi', 'Đem cho người khác'], 'B', 'easy', 1, 6),
  sc('Khi có đồ chơi đẹp, anh nên làm gì?', ['Nhường em', 'Giấu đi', 'Làm hỏng', 'Không cho em nhìn'], 'A', 'easy', 1, 7),
  sc('Làm anh tuy khó nhưng cảm thấy thế nào?', ['Thật buồn', 'Thật sợ', 'Thật vui', 'Thật mệt'], 'C', 'easy', 1, 8),
  sc('Ai có thể làm anh tốt?', ['Người yêu thương em bé', 'Người hay tranh giành', 'Người không quan tâm đến em', 'Người thường trêu em khóc'], 'A', 'easy', 1, 9),
  sc('Trong tranh, hai anh em đang chơi đồ chơi gì?', ['Máy bay', 'Tàu hỏa', 'Quả bóng', 'Chong chóng'], 'B', 'easy', 1, 10),
  sc('Từ "dỗ dành" có nghĩa là gì?', ['Nói hoặc làm cho người đang buồn, đang khóc vui trở lại', 'Làm cho người khác tức giận', 'Tranh giành đồ chơi', 'Bỏ mặc người khác'], 'A', 'medium', 2, 1),
  sc('Từ "dịu dàng" nói về cách cư xử như thế nào?', ['Nhẹ nhàng và ân cần', 'Mạnh tay và nóng nảy', 'Ồn ào và vội vàng', 'Lạnh lùng và khó chịu'], 'A', 'medium', 2, 2),
  sc('Câu thơ nào nói về việc người anh chăm sóc em khi em khóc?', ['"Phải đâu chuyện đùa"', '"Anh phải dỗ dành"', '"Chia em phần hơn"', '"Thì làm được thôi"'], 'B', 'medium', 2, 3),
  sc('Câu thơ nào nói về việc người anh giúp em khi em bị ngã?', ['"Anh nâng dịu dàng"', '"Có đồ chơi đẹp"', '"Mẹ cho quà bánh"', '"Nhưng mà thật vui"'], 'A', 'medium', 2, 4),
  sc('Tiếng nào cùng vần với tiếng "bánh"?', ['cánh', 'bàn', 'bóng', 'bạn'], 'A', 'medium', 2, 5, '"bánh" và "cánh" cùng vần "anh".'),
  sc('Tiếng nào cùng vần với tiếng "đẹp"?', ['dép', 'đọc', 'đèn', 'đũa'], 'A', 'medium', 2, 6, '"đẹp" và "dép" cùng vần "ep".'),
  sc('Tiếng nào cùng vần với tiếng "vui"?', ['núi', 'vườn', 'voi', 'hoa'], 'A', 'medium', 2, 7, '"vui" và "núi" cùng vần "ui".'),
  sc('Trong bài thơ, người anh cần nhường em những gì?', ['Quà bánh và đồ chơi đẹp', 'Sách giáo khoa và bút mực', 'Quần áo và giày dép', 'Cặp sách và bàn học'], 'A', 'medium', 2, 8),
  sc('Hai khổ thơ cuối nói chủ yếu về điều gì?', ['Người anh biết chia sẻ với em và thấy vui khi yêu thương em', 'Người anh không muốn chơi với em', 'Người anh chỉ thích nhận quà', 'Người anh thường làm em khóc'], 'A', 'medium', 2, 9),
  sc('Câu nào phù hợp nhất với nội dung bài thơ?', ['Anh luôn yêu thương, chăm sóc và nhường nhịn em', 'Anh thường tranh đồ chơi với em', 'Anh không quan tâm khi em ngã', 'Anh giữ hết quà bánh cho mình'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với những việc người anh cần làm trong bài thơ?', ['Dỗ em khi khóc → nâng em khi ngã → chia quà bánh → nhường đồ chơi', 'Nhường đồ chơi → làm em khóc → giữ quà bánh → bỏ đi', 'Chia quà bánh → tranh đồ chơi → để em tự đứng dậy', 'Nâng em khi ngã → giấu quà → không chơi với em'], 'A', 'hard', 3, 1),
  sc('Vì sao bài thơ nói "Làm anh khó đấy"?', ['Vì người anh cần biết chăm sóc, nhường nhịn và làm gương cho em', 'Vì người anh không được chơi', 'Vì người anh phải đi học xa', 'Vì người anh không được nhận quà'], 'A', 'hard', 3, 2),
  sc('Vì sao làm anh tuy khó nhưng vẫn thật vui?', ['Vì được yêu thương, chăm sóc và chơi cùng em', 'Vì được giữ hết đồ chơi', 'Vì không cần giúp đỡ em', 'Vì luôn được mẹ cho nhiều quà hơn'], 'A', 'hard', 3, 3),
  sc('Chi tiết nào thể hiện rõ nhất sự nhường nhịn của người anh?', ['"Chia em phần hơn"', '"Phải đâu chuyện đùa"', '"Khi em bé khóc"', '"Làm anh khó đấy"'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Phải \'người lớn\' cơ" muốn nhắc người anh điều gì?', ['Cần cư xử chững chạc, biết chăm sóc và làm gương cho em', 'Cần nói thật to với em', 'Không cần chơi cùng em', 'Có thể tranh giành với em'], 'A', 'hard', 3, 5),
  sc('Khi em nhỏ làm hỏng đồ chơi của mình, người anh nên làm gì?', ['Bình tĩnh, nhẹ nhàng nhắc em và cùng sửa đồ chơi', 'Quát mắng và đánh em', 'Giấu tất cả đồ chơi', 'Không nói chuyện với em nữa'], 'A', 'hard', 3, 6),
  sc('Khi em bé đang khóc, câu nói nào phù hợp nhất?', ['"Em đừng buồn, anh ở đây với em nhé!"', '"Em khóc tiếp đi!"', '"Anh không quan tâm đâu!"', '"Em tự lo lấy nhé!"'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: anh / đồ chơi đẹp / nhường / cho em',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'anh' },
      { key: '2', text: 'đồ chơi đẹp' },
      { key: '3', text: 'nhường' },
      { key: '4', text: 'cho em' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Anh nhường đồ chơi đẹp cho em
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Anh nhường đồ chơi đẹp cho em".',
  },
  sc('Việc làm nào thể hiện tình cảm tốt đẹp giữa anh chị em?', ['Chăm sóc, chia sẻ và nhường nhịn nhau', 'Tranh giành quà bánh', 'Chê bai khi em mắc lỗi', 'Không cho em cùng chơi'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài thơ là gì?', ['Anh chị em trong gia đình cần yêu thương, chăm sóc và nhường nhịn nhau', 'Người anh luôn phải nhận phần quà nhiều hơn', 'Em nhỏ phải tự làm mọi việc', 'Anh chị em không nên chơi cùng nhau'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B8 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
