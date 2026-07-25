require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 5%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng nào dưới đây chứa vần ươt?', ['trượt', 'buồn', 'xuống', 'ngoài'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây chứa vần uôn?', ['trượt', 'buồn', 'uống', 'xoài'], 'B', 'easy', 1, 2),
  sc('Tiếng nào dưới đây chứa vần uông?', ['ngoài', 'muốn', 'xuống', 'mượt'], 'C', 'easy', 1, 3),
  sc('Tiếng nào dưới đây chứa vần oai?', ['ngoài', 'buồn', 'xuống', 'trượt'], 'A', 'easy', 1, 4),
  sc('Trong truyện "Kiến và chim bồ câu", nhân vật nào bị rơi xuống nước?', ['Bồ câu', 'Kiến', 'Sóc', 'Gấu con'], 'B', 'easy', 1, 5),
  sc('Bồ câu đã thả vật gì xuống nước để cứu kiến?', ['Một viên đá', 'Một cành cây', 'Một chiếc lá', 'Một sợi dây'], 'C', 'easy', 1, 6),
  sc('Trong truyện "Câu hỏi của sói", nhân vật nào lúc nào cũng thấy buồn bực?', ['Sóc', 'Sói', 'Kiến', 'Bồ câu'], 'B', 'easy', 1, 7),
  sc('Nhân vật nào nhảy nhót, vui đùa suốt ngày?', ['Sóc', 'Sói', 'Gấu mẹ', 'Chú bé chăn cừu'], 'A', 'easy', 1, 8),
  sc('Trong truyện "Tiếng vọng của núi", ai khuyên gấu con nói: "Tôi yêu bạn"?', ['Sóc', 'Gấu mẹ', 'Bồ câu', 'Các bác nông dân'], 'B', 'easy', 1, 9),
  sc('Nhân vật nào thường nói dối để trêu các bác nông dân?', ['Gấu con', 'Sói', 'Chú bé chăn cừu', 'Kiến'], 'C', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần ươt – uôn – uông – oai?', ['trượt – buồn – xuống – ngoài', 'buồn – trượt – ngoài – xuống', 'xuống – ngoài – trượt – buồn', 'ngoài – xuống – buồn – trượt'], 'A', 'medium', 2, 1),
  sc('Trong cụm từ "trượt chân", tiếng nào chứa vần ươt?', ['trượt', 'chân', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 2, '"trượt" có vần "ươt".'),
  sc('Trong cụm từ "buồn bực", tiếng nào chứa vần uôn?', ['buồn', 'bực', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 3, '"buồn" có vần "uôn".'),
  sc('Trong cụm từ "rơi xuống nước", tiếng nào chứa vần uông?', ['rơi', 'xuống', 'nước', 'Cả ba tiếng'], 'B', 'medium', 2, 4, '"xuống" có vần "uông".'),
  sc('Trong cụm từ "ngoài sân", tiếng nào chứa vần oai?', ['ngoài', 'sân', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 5, '"ngoài" có vần "oai".'),
  sc('Nhân vật nào phù hợp với chi tiết "không may bị rơi xuống nước"?', ['Kiến', 'Bồ câu', 'Sói', 'Gấu con'], 'A', 'medium', 2, 6),
  sc('Nhân vật nào phù hợp với chi tiết "nhặt một chiếc lá thả xuống nước"?', ['Sóc', 'Bồ câu', 'Gấu mẹ', 'Chú bé chăn cừu'], 'B', 'medium', 2, 7),
  sc('Nhân vật nào phù hợp với chi tiết "bật cười vui vẻ khi nghe tiếng vọng \'Tôi yêu bạn\'"?', ['Gấu con', 'Gấu mẹ', 'Sói', 'Kiến'], 'A', 'medium', 2, 8),
  sc('Các bác nông dân không đến cứu chú bé khi sói xuất hiện thật vì sao?', ['Vì họ không nghe thấy tiếng kêu', 'Vì họ nghĩ chú bé lại nói dối như mọi lần', 'Vì họ không biết chú bé', 'Vì họ đang ở rất xa'], 'B', 'medium', 2, 9),
  sc('Nhân vật nào không thuộc truyện "Kiến và chim bồ câu"?', ['Kiến', 'Bồ câu', 'Người thợ săn', 'Gấu con'], 'D', 'medium', 2, 10),
  sc('Cách nối nhân vật với chi tiết nào dưới đây đúng?', ['Kiến – bị rơi xuống nước', 'Bồ câu – hay nói dối', 'Sói – nói "Tôi yêu bạn" với núi', 'Sóc – nhặt lá cứu kiến'], 'A', 'hard', 3, 1),
  sc('Cách nối nhân vật với chi tiết nào dưới đây không đúng?', ['Sói – lúc nào cũng thấy buồn bực', 'Sóc – nhảy nhót, vui đùa suốt ngày', 'Gấu mẹ – khuyên con nói lời yêu thương', 'Các bác nông dân – giả vờ kêu có sói'], 'D', 'hard', 3, 2, 'Người giả vờ kêu có sói là chú bé chăn cừu.'),
  sc('Điểm giống nhau giữa kiến và bồ câu là gì?', ['Cả hai đều biết giúp đỡ và biết ơn nhau', 'Cả hai đều hay nói dối', 'Cả hai đều thường gây gổ', 'Cả hai đều sống trên cây'], 'A', 'hard', 3, 3),
  sc('Vì sao sóc vui vẻ còn sói thường buồn bực?', ['Sóc có nhiều bạn tốt, còn sói hay gây gổ nên không có bạn', 'Sóc có nhiều thức ăn hơn sói', 'Sóc chạy nhanh hơn sói', 'Sói không biết trèo cây'], 'A', 'hard', 3, 4),
  sc('Gấu con học được điều gì từ tiếng vọng của núi?', ['Nói lời yêu thương sẽ nhận lại những điều tốt đẹp', 'Muốn vui phải đi tìm nhiều hạt dẻ', 'Không nên nói chuyện trong núi', 'Tiếng vọng là một người bạn thật'], 'A', 'hard', 3, 5),
  sc('Chú bé chăn cừu phải chịu hậu quả gì vì nhiều lần nói dối?', ['Khi sói đến thật, không ai tin và đến cứu', 'Các bác nông dân luôn ở bên chú', 'Chú được mọi người khen', 'Sói không dám đến gần đàn cừu'], 'A', 'hard', 3, 6),
  sc('Nhân vật nào đáng quý nhất vì nhanh trí cứu bạn bằng một chiếc lá?', ['Kiến', 'Bồ câu', 'Sói', 'Gấu con'], 'B', 'hard', 3, 7),
  sc('Việc làm nào thể hiện bài học từ các câu chuyện đã học?', ['Giúp đỡ bạn, nói lời yêu thương và luôn trung thực', 'Trêu đùa bằng cách giả vờ kêu cứu', 'Gây gổ để mọi người sợ mình', 'Không quan tâm khi người khác gặp khó khăn'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: kiến và bồ câu / khi gặp nguy hiểm / giúp đỡ nhau',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'kiến và bồ câu' },
      { key: '2', text: 'khi gặp nguy hiểm' },
      { key: '3', text: 'giúp đỡ nhau' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Kiến và bồ câu giúp đỡ nhau khi gặp nguy hiểm
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Kiến và bồ câu giúp đỡ nhau khi gặp nguy hiểm".',
  },
  sc('Bài học chung phù hợp nhất với phần ôn tập là gì?', ['Cần sống trung thực, thân thiện, biết yêu thương và giúp đỡ người khác', 'Chỉ nên giúp những người quen biết', 'Có thể nói dối để làm mọi người vui', 'Người mạnh có thể bắt nạt người yếu'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B32 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
