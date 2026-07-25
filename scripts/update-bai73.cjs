require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 73%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['ươc, ươt', 'ươm, ươp', 'ươn, ương', 'uôn, uông'], 'C', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ươn?', ['đường', 'sương', 'lươn', 'phương'], 'C', 'easy', 1, 2, '"lươn" có vần "ươn".'),
  sc('Tiếng nào dưới đây có vần ương?', ['sườn', 'vượn', 'rướn', 'hướng'], 'D', 'easy', 1, 3, '"hướng" có vần "ương".'),
  sc('Ghép âm l với vần ươn được tiếng nào?', ['lươn', 'lương', 'luân', 'luông'], 'A', 'easy', 1, 4, 'l + ươn = "lươn".'),
  sc('Nơi trồng nhiều cây, hoa và rau trong bài được gọi là gì?', ['Khu rừng', 'Khu vườn', 'Sân trường', 'Cánh đồng'], 'B', 'easy', 1, 5),
  sc('Những giọt nước nhỏ thường đọng trên lá vào buổi sáng được gọi là gì?', ['Hạt mưa', 'Hạt cát', 'Hạt sương', 'Hạt giống'], 'C', 'easy', 1, 6),
  sc('Hình ảnh con đường trong bài có tiếng nào chứa vần ương?', ['con', 'đường', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'easy', 1, 7, '"đường" có vần "ương".'),
  sc('Đường tới trường lượn theo đâu?', ['Bờ sông', 'Sườn đồi', 'Cánh đồng', 'Bờ biển'], 'B', 'easy', 1, 8),
  sc('Trong câu "Đường tới trường lượn theo sườn đồi", các bạn nhỏ đang đi đâu?', ['Đi chợ', 'Đi chơi', 'Tới trường', 'Về nhà'], 'C', 'easy', 1, 9),
  sc('Bức tranh phần Nói thể hiện hoạt động nào của bạn nhỏ?', ['Đánh răng', 'Ăn sáng', 'Tập thể dục', 'Đọc sách'], 'A', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần ươn?', ['lươn, rướn, sườn, vượn', 'hướng, phương, sương, tưởng', 'lươn, sương, vượn, đường', 'phương, rướn, tưởng, sườn'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần ương?', ['lươn, rướn, sườn', 'hướng, phương, sương, tưởng', 'vượn, sườn, đường', 'lươn, phương, rướn'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "khu vườn", tiếng nào có vần ươn?', ['khu', 'vườn', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"vườn" có vần "ươn".'),
  sc('Trong cụm từ "hạt sương", tiếng nào có vần ương?', ['hạt', 'sương', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"sương" có vần "ương".'),
  sc('Điền vần thích hợp để tạo thành tiếng "sườn": s…', ['ươn', 'ương', 'uôn', 'uông'], 'A', 'medium', 2, 5),
  sc('Điền vần thích hợp để tạo thành tiếng "đường": đ…', ['ươn', 'ương', 'ươm', 'ươp'], 'B', 'medium', 2, 6),
  sc('Buổi sáng, tiếng gà gọi ai thức dậy?', ['Mặt trăng', 'Mặt trời', 'Các vì sao', 'Đám mây'], 'B', 'medium', 2, 7),
  sc('Bầu trời phía đông có màu gì?', ['Xanh biếc', 'Ửng hồng', 'Đen kịt', 'Trắng xóa'], 'B', 'medium', 2, 8),
  sc('Nắng đã làm gì với màn sương?', ['Làm màn sương dày hơn', 'Xua tan màn sương', 'Làm màn sương đóng băng', 'Giữ màn sương trên lá'], 'B', 'medium', 2, 9),
  sc('Sau một giấc ngủ dài, cây lá làm gì?', ['Héo xuống', 'Rụng hết lá', 'Bừng tỉnh và vươn mình đón nắng', 'Nằm im trong bóng tối'], 'C', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần ươn – ương?', ['sườn – đường', 'đường – sườn', 'sương – vượn', 'phương – lươn'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần ươn và vần ương?', ['Hạt sương đọng trên lá.', 'Con lươn bơi dưới nước.', 'Đường tới trường lượn theo sườn đồi.', 'Bé đang chơi trong vườn.'], 'C', 'hard', 3, 2, '"đường", "trường" có vần ương; "lượn", "sườn" có vần ươn.'),
  sc('Trong câu "Đường tới trường lượn theo sườn đồi", có bao nhiêu tiếng chứa vần ươn hoặc ương?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'C', 'hard', 3, 3, 'Các tiếng đó là: đường, trường, lượn, sườn.'),
  sc('Trong đoạn đọc về buổi sáng, có những tiếng nào chứa vần ươn hoặc ương?', ['sáng, tiếng', 'sương, vươn', 'bừng, rộn', 'trời, mới'], 'B', 'hard', 3, 4),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['lươn', 'rướn', 'sườn', 'sương'], 'D', 'hard', 3, 5, '"lươn, rướn, sườn" có vần ươn; "sương" có vần ương.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['vườn – vần ươn', 'sườn – vần ươn', 'đường – vần ương', 'phương – vần ươn'], 'D', 'hard', 3, 6, 'Tiếng "phương" có vần "ương", không phải vần "ươn".'),
  sc('Thứ tự nào đúng với nội dung đoạn đọc?', ['Mặt trời thức dậy → nắng xua tan sương → cây lá vươn mình → mọi người bắt đầu công việc', 'Cây lá ngủ → trời tối → mọi người về nhà → mặt trời lặn', 'Mưa rơi → trời đen kịt → cây lá héo → mọi người đi ngủ', 'Mẹ đi làm → trời tối → gà gáy → mặt trời lặn'], 'A', 'hard', 3, 7),
  sc('Chi tiết nào cho thấy làng quê bắt đầu một ngày mới?', ['Mọi người đều đi ngủ', 'Em tới lớp, mẹ đi làm', 'Trời bắt đầu tối', 'Cây lá rụng xuống'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: tới trường / theo sườn đồi / con đường / lượn',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'tới trường' }, { key: '2', text: 'theo sườn đồi' }, { key: '3', text: 'con đường' }, { key: '4', text: 'lượn' }],
    correctAnswerJson: ['3', '1', '4', '2'], // Con đường tới trường lượn theo sườn đồi
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Con đường tới trường lượn theo sườn đồi".',
  },
  sc('Buổi sáng, em nên làm gì để chuẩn bị đi học?', ['Thức dậy đúng giờ, vệ sinh cá nhân, ăn sáng và chuẩn bị sách vở', 'Tiếp tục ngủ và không đến lớp', 'Chơi điện thoại đến muộn', 'Không đánh răng và không ăn sáng'], 'A', 'hard', 3, 10),
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
    console.log('B73 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
