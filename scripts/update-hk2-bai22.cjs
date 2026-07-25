require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Lời chào%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Người bạn mới', 'Lời chào', 'Lòng tốt', 'Buổi sáng'], 'B', 'easy', 1, 1),
  sc('Khi đi đến một nơi, điều gì nên đi trước?', ['Lời chào', 'Món quà', 'Tiếng hát', 'Bước chân'], 'A', 'easy', 1, 2),
  sc('Lời chào giúp chúng ta làm gì?', ['Kết bạn', 'Ngủ ngon', 'Chạy nhanh', 'Học toán'], 'A', 'easy', 1, 3),
  sc('Có lời chào, con đường trở nên như thế nào?', ['Xa hơn', 'Bớt xa', 'Dốc hơn', 'Tối hơn'], 'B', 'easy', 1, 4),
  sc('Lời chào được ví như loài vật nào?', ['Con chim', 'Không được ví với loài vật nào', 'Con bướm', 'Con ong'], 'B', 'easy', 1, 5),
  sc('Lời chào được ví như bông gì?', ['Bông hoa', 'Bông lúa', 'Bông tuyết', 'Bông lau'], 'A', 'easy', 1, 6),
  sc('Bông hoa lời chào nở từ đâu?', ['Từ mặt đất', 'Từ lòng tốt', 'Từ khu vườn', 'Từ bàn tay'], 'B', 'easy', 1, 7),
  sc('Lời chào còn được ví như cơn gì?', ['Cơn mưa lớn', 'Cơn gió mát', 'Cơn bão', 'Cơn sóng'], 'B', 'easy', 1, 8),
  sc('Lời chào được ví như bộ phận nào của cơ thể?', ['Đôi mắt', 'Bàn chân', 'Bàn tay', 'Mái tóc'], 'C', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Nguyễn Hoàng Sơn', 'Hoàng Minh Chính', 'Minh Tâm', 'Nguyễn Lãm Thắng'], 'A', 'easy', 1, 10),
  sc('Từ "chân thành" có nghĩa là gì?', ['Thật lòng, không giả dối', 'Nói thật to', 'Hành động thật nhanh', 'Cảm thấy sợ hãi'], 'A', 'medium', 2, 1),
  sc('Từ "cởi mở" nói về người như thế nào?', ['Thân thiện, dễ gần và sẵn sàng trò chuyện', 'Khó chịu và không muốn nói chuyện', 'Rụt rè, luôn tránh mọi người', 'Hay tức giận với người khác'], 'A', 'medium', 2, 2),
  sc('Câu thơ nào cho biết lời chào giúp con người gần gũi nhau hơn?', ['"Lời chào kết bạn"', '"Buổi sáng đầu ngày"', '"Ai ai cũng có"', '"Chẳng nặng là bao"'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào cho thấy lời chào xuất phát từ tình cảm tốt đẹp?', ['"Lời chào là hoa"', '"Nở từ lòng tốt"', '"Con đường bớt xa"', '"Bạn ơi đi đâu"'], 'B', 'medium', 2, 4),
  sc('Lời chào được so sánh với những sự vật nào?', ['Bông hoa, cơn gió mát và bàn tay', 'Ngôi nhà, con đường và dòng sông', 'Cánh chim, mặt trời và đám mây', 'Quyển sách, cây bút và bảng lớp'], 'A', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau?', ['trước – bước', 'chào – bạn', 'nơi – nhà', 'đường – tốt'], 'A', 'medium', 2, 6, '"trước" và "bước" cùng vần "ươc".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['nhà – xa', 'trước – nhà', 'bạn – tốt', 'ngày – bao'], 'A', 'medium', 2, 7, '"nhà" và "xa" cùng vần "a".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['mát – tốt', 'ngày – tay', 'hoa – mở', 'bạn – đường'], 'B', 'medium', 2, 8, '"ngày" và "tay" cùng vần "ay".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['có – đâu', 'bao – chào', 'nhé – mở', 'tốt – mát'], 'B', 'medium', 2, 9, '"bao" và "chào" cùng vần "ao".'),
  sc('Câu thơ "Chẳng nặng là bao" muốn nói điều gì?', ['Nói lời chào rất dễ dàng, không tốn công sức', 'Lời chào là một vật rất nặng', 'Chỉ người lớn mới có thể chào', 'Chào hỏi là việc khó thực hiện'], 'A', 'medium', 2, 10),
  sc('Vì sao bài thơ nói "Lời chào đi trước"?', ['Vì lời chào giúp mở đầu cuộc gặp gỡ một cách lịch sự', 'Vì lời chào có thể tự bước đi', 'Vì lời chào luôn được viết ở đầu sách', 'Vì người chào phải đi thật nhanh'], 'A', 'hard', 3, 1),
  sc('Vì sao lời chào giúp "con đường bớt xa"?', ['Vì lời chào giúp mọi người trở nên thân thiện và gần gũi hơn', 'Vì lời chào làm con đường ngắn lại thật sự', 'Vì lời chào giúp xe chạy nhanh hơn', 'Vì lời chào chỉ đường cho người đi bộ'], 'A', 'hard', 3, 2),
  sc('Hình ảnh "Lời chào là hoa, nở từ lòng tốt" có ý nghĩa gì?', ['Lời chào đẹp đẽ và xuất phát từ sự tử tế', 'Mỗi lời chào đều phải kèm một bông hoa', 'Chỉ được chào khi đứng trong vườn', 'Hoa có thể nói lời chào'], 'A', 'hard', 3, 3),
  sc('Vì sao lời chào được ví như "cơn gió mát"?', ['Vì lời chào mang lại cảm giác dễ chịu, vui vẻ', 'Vì lời chào làm cây cối chuyển động', 'Vì chỉ được chào vào ngày có gió', 'Vì lời chào phát ra âm thanh rất lớn'], 'A', 'hard', 3, 4),
  sc('Hình ảnh "Như một bàn tay" gợi cho em nghĩ đến điều gì?', ['Sự thân thiện, kết nối và đón chào', 'Một cuộc thi viết chữ', 'Một trò chơi ngoài sân', 'Việc rửa tay trước khi ăn'], 'A', 'hard', 3, 5),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Lời chào dẫn đường → giúp kết bạn → đem lại sự dễ chịu → nhắc mọi người luôn mang theo lời chào', 'Lời chào làm mọi người sợ → khiến đường xa hơn → kết thúc buổi gặp', 'Lời chào chỉ dùng vào buổi sáng → không dùng ở nơi khác', 'Lời chào là một món quà → chỉ dành cho người quen'], 'A', 'hard', 3, 6),
  sc('Khi gặp cô giáo vào buổi sáng, em nên nói gì?', ['"Em chào cô ạ!"', '"Cô tránh đường cho em!"', 'Không nói gì', '"Cô đưa vở cho em!"'], 'A', 'hard', 3, 7),
  sc('Khi gặp một người bạn mới, em nên làm gì?', ['Mỉm cười, chào hỏi và giới thiệu bản thân', 'Quay mặt đi nơi khác', 'Trêu chọc bạn', 'Không cho bạn cùng chơi'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: lời chào / mọi người / gần gũi hơn / giúp',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'lời chào' },
      { key: '2', text: 'mọi người' },
      { key: '3', text: 'gần gũi hơn' },
      { key: '4', text: 'giúp' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Lời chào giúp mọi người gần gũi hơn
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Lời chào giúp mọi người gần gũi hơn".',
  },
  sc('Bài học phù hợp nhất được rút ra từ bài thơ là gì?', ['Cần biết chào hỏi chân thành, lịch sự và cởi mở khi gặp mọi người', 'Chỉ cần chào những người mình đã quen', 'Không cần chào khi đến nơi mới', 'Lời chào chỉ dành cho người lớn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B22 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
