require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bạn của gió%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Cô gió', 'Bạn của gió', 'Gió và mây', 'Gió ngoài biển'], 'B', 'easy', 1, 1),
  sc('Những vật nào xuất hiện trong phần Quan sát tranh?', ['Chong chóng, diều và thuyền buồm', 'Ô tô, xe máy và tàu hỏa', 'Máy bay, xe đạp và con thuyền', 'Quả bóng, cái trống và chiếc ô'], 'A', 'easy', 1, 2),
  sc('Nhờ đâu mà chong chóng có thể quay?', ['Nhờ ánh nắng', 'Nhờ gió', 'Nhờ nước', 'Nhờ đất'], 'B', 'easy', 1, 3),
  sc('Trong khổ thơ đầu, gió bay theo gì?', ['Cánh chim', 'Đám mây', 'Chiếc lá', 'Cánh diều'], 'A', 'easy', 1, 4),
  sc('Gió lùa vào đâu?', ['Trong ngôi nhà', 'Trong tán lá', 'Dưới mặt đất', 'Dưới lòng sông'], 'B', 'easy', 1, 5),
  sc('Khi nhớ bạn, gió làm gì với cánh cửa?', ['Đóng cửa lại', 'Gõ cửa hoài', 'Sơn lại cửa', 'Mở toang cửa'], 'B', 'easy', 1, 6),
  sc('Gió đẩy gì dâng cao?', ['Đám mây', 'Ngọn núi', 'Sóng', 'Cánh chim'], 'C', 'easy', 1, 7),
  sc('Gió thổi làm cánh buồm như thế nào?', ['Căng lên', 'Rách ra', 'Rơi xuống', 'Ướt đẫm'], 'A', 'easy', 1, 8),
  sc('Khi gió đi vắng, lá như thế nào?', ['Bay rất cao', 'Buồn và lặng im', 'Rơi xuống nước', 'Đổi sang màu đỏ'], 'B', 'easy', 1, 9),
  sc('Khi không có gió, sóng làm gì?', ['Dâng cao', 'Ngủ trong nước', 'Tràn vào bờ', 'Đuổi theo thuyền'], 'B', 'easy', 1, 10),
  sc('Trong hai khổ thơ cuối, cặp tiếng nào cùng vần với nhau?', ['vắng – chẳng', 'lá – nước', 'chim – cửa', 'buồm – khơi'], 'A', 'medium', 2, 1),
  sc('Cặp tiếng nào cùng vần im?', ['im – chim', 'vắng – chim', 'nước – buồm', 'khơi – lá'], 'A', 'medium', 2, 2),
  sc('Cặp tiếng nào cùng vần ơi?', ['khơi – ơi', 'nước – biếc', 'buồm – chim', 'lá – cửa'], 'A', 'medium', 2, 3),
  sc('Từ "lùa" trong câu "Lùa trong tán lá" có nghĩa là gì?', ['Luồn và thổi qua', 'Nằm im một chỗ', 'Rơi từ trên cao', 'Chạy trên mặt đất'], 'A', 'medium', 2, 4),
  sc('Từ "hoài" trong câu "Nên gõ cửa hoài" có nghĩa là gì?', ['Chỉ một lần', 'Liên tục, mãi không thôi', 'Thật nhẹ nhàng', 'Rất chậm chạp'], 'B', 'medium', 2, 5),
  sc('Cụm từ "vòm lá" chỉ điều gì?', ['Những tán lá tạo thành khoảng cong phía trên', 'Một chiếc lá rơi xuống đất', 'Một cành cây bị gãy', 'Một khu vườn không có cây'], 'A', 'medium', 2, 6),
  sc('Từ "biếc" thường dùng để chỉ màu gì?', ['Màu đỏ thẫm', 'Màu xanh đẹp và trong', 'Màu vàng nhạt', 'Màu đen sẫm'], 'B', 'medium', 2, 7),
  sc('Ở khổ thơ thứ nhất, gió làm những gì để tìm bạn?', ['Bay theo cánh chim và lùa trong tán lá', 'Gõ cửa và đẩy sóng', 'Làm lá lặng im và sóng ngủ', 'Thổi mưa và gọi mặt trời'], 'A', 'medium', 2, 8),
  sc('Khi nhớ bạn, gió đã làm những việc gì?', ['Gõ cửa, đẩy sóng và thổi căng buồm', 'Ngủ trong nước và nằm trong lá', 'Làm chim ngừng bay và cửa đóng lại', 'Trốn sau mây và không hoạt động'], 'A', 'medium', 2, 9),
  sc('Điều gì xảy ra khi gió đi vắng?', ['Lá lặng im, vắng cánh chim và buồm không ra khơi', 'Sóng dâng cao và thuyền đi nhanh hơn', 'Chong chóng quay mạnh và diều bay cao', 'Cửa liên tục phát ra tiếng gõ'], 'A', 'medium', 2, 10),
  sc('Trình tự nào đúng với nội dung bài thơ?', ['Gió đi tìm bạn → gió nhớ bạn → gió đi vắng → mọi vật gọi gió', 'Gió đi vắng → gió tìm bạn → buồm ra khơi → sóng ngủ', 'Mọi vật gọi gió → gió đi vắng → gió nhớ bạn → lá chuyển màu', 'Sóng ngủ → gió thổi buồm → chim đi vắng → gió ngừng thổi'], 'A', 'hard', 3, 1),
  sc('Trong khổ thơ thứ hai, gió thực hiện bao nhiêu hành động?', ['Một hành động', 'Hai hành động', 'Ba hành động', 'Bốn hành động'], 'C', 'hard', 3, 2, 'Ba hành động: gõ cửa, đẩy sóng và thổi căng buồm.'),
  sc('Vì sao buồm chẳng thể ra khơi khi gió đi vắng?', ['Vì không có gió làm căng buồm và đẩy thuyền đi', 'Vì mặt biển không có nước', 'Vì con thuyền bị hỏng', 'Vì người lái thuyền đang ngủ'], 'A', 'hard', 3, 3),
  sc('Câu thơ nào khiến gió có hành động giống như con người?', ['"Nên gõ cửa hoài"', '"Bay theo cánh chim"', '"Lùa trong tán lá"', '"Đẩy sóng dâng cao"'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Sóng ngủ trong nước" cho thấy mặt nước khi không có gió như thế nào?', ['Êm và ít chuyển động', 'Có sóng rất lớn', 'Tràn ngập bọt trắng', 'Chảy thật nhanh'], 'A', 'hard', 3, 5),
  sc('Vật nào dưới đây không chuyển động chủ yếu nhờ gió?', ['Chong chóng', 'Cánh diều', 'Thuyền buồm', 'Xe đạp'], 'D', 'hard', 3, 6),
  sc('Qua bài thơ, gió có vai trò gì đối với cảnh vật?', ['Giúp lá, sóng, cánh chim và buồm chuyển động', 'Làm mọi vật đứng yên', 'Làm cây cối ngừng phát triển', 'Làm mặt nước biến mất'], 'A', 'hard', 3, 7),
  sc('Câu nào phù hợp nhất với nội dung bức tranh?', ['Gió làm chong chóng quay, diều bay và thuyền buồm chuyển động', 'Ánh nắng làm chiếc diều bay lên', 'Dòng nước làm chong chóng quay trên bãi cỏ', 'Cánh chim kéo thuyền buồm ra khơi'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: gió / thổi căng / cánh buồm',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'gió' },
      { key: '2', text: 'thổi căng' },
      { key: '3', text: 'cánh buồm' },
    ],
    correctAnswerJson: ['1', '2', '3'], // Gió thổi căng cánh buồm
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Gió thổi căng cánh buồm".',
  },
  sc('Khi chơi diều hoặc chong chóng ngoài trời, em nên làm gì?', ['Chơi ở nơi rộng rãi, tránh đường điện và nghe lời người lớn', 'Thả diều ngay dưới đường dây điện', 'Chạy ra giữa đường đông xe', 'Chơi ngoài trời khi có giông sét'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B3 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
