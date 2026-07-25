require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Chú bé chăn cừu%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Sói và đàn cừu', 'Chú bé chăn cừu', 'Những bác nông dân', 'Trò đùa nguy hiểm'], 'B', 'easy', 1, 1),
  sc('Chú bé thường thả cừu ở đâu?', ['Gần chân núi', 'Bên bờ biển', 'Trong sân nhà', 'Giữa thành phố'], 'A', 'easy', 1, 2),
  sc('Vì sao chú bé nghĩ ra một trò đùa?', ['Vì chú đang tức giận', 'Vì chú thấy buồn', 'Vì chú muốn tìm cừu', 'Vì chú bị lạc đường'], 'B', 'easy', 1, 3),
  sc('Chú bé giả vờ kêu điều gì?', ['"Cháy! Cháy!"', '"Mưa! Mưa!"', '"Sói! Sói! Cứu tôi với!"', '"Cừu chạy mất rồi!"'], 'C', 'easy', 1, 4),
  sc('Ai nghe tiếng kêu cứu của chú bé?', ['Các bác nông dân', 'Những người thợ săn', 'Các bạn học sinh', 'Người bán hàng'], 'A', 'easy', 1, 5),
  sc('Nghe tiếng kêu cứu, các bác nông dân làm gì?', ['Tiếp tục ngủ', 'Tức tốc chạy tới', 'Đi về nhà', 'Gọi chú bé lại'], 'B', 'easy', 1, 6),
  sc('Lần đầu chạy đến, các bác nông dân có thấy sói không?', ['Có', 'Không', 'Thấy hai con sói', 'Không được nói rõ'], 'B', 'easy', 1, 7),
  sc('Khi thấy các bác nông dân bị lừa, chú bé cảm thấy thế nào?', ['Xấu hổ', 'Khoái chí', 'Lo lắng', 'Hối hận'], 'B', 'easy', 1, 8),
  sc('Sau đó, con vật nào đã đến thật?', ['Con hổ', 'Con cáo', 'Con sói', 'Con gấu'], 'C', 'easy', 1, 9),
  sc('Khi sói đến thật, các bác nông dân có chạy đến cứu không?', ['Có, họ đến ngay', 'Không, họ vẫn thản nhiên làm việc', 'Chỉ một người chạy đến', 'Họ gọi người thợ săn'], 'B', 'easy', 1, 10),
  sc('Từ "tức tốc" có nghĩa là gì?', ['Rất nhanh, không chậm trễ', 'Thật chậm và cẩn thận', 'Không chịu di chuyển', 'Vừa đi vừa nghỉ'], 'A', 'medium', 2, 1),
  sc('Từ "thản nhiên" chỉ trạng thái nào?', ['Bình thản như không có chuyện gì xảy ra', 'Hốt hoảng và lo sợ', 'Vui mừng, phấn khởi', 'Buồn bã, thất vọng'], 'A', 'medium', 2, 2),
  sc('Cụm từ "thỏa thuê" có nghĩa là gì?', ['Một cách đầy đủ, tùy thích', 'Một cách vội vàng', 'Một cách khó khăn', 'Một cách sợ hãi'], 'A', 'medium', 2, 3),
  sc('Vì sao các bác nông dân không đến cứu khi sói xuất hiện thật?', ['Vì họ không nghe thấy chú bé kêu', 'Vì họ nghĩ chú bé lại nói dối', 'Vì họ đang ở rất xa', 'Vì họ sợ đàn cừu'], 'B', 'medium', 2, 4),
  sc('Chọn từ thích hợp để hoàn thành câu: Nhiều người (…) vì có đám cháy.', ['thản nhiên', 'hốt hoảng', 'nông dân', 'tiếng kêu cứu'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Các bác (…) đang làm việc chăm chỉ.', ['hốt hoảng', 'tiếng kêu cứu', 'nông dân', 'thản nhiên'], 'C', 'medium', 2, 6),
  sc('Điền vần ai hoặc ay để tạo thành từ đúng: b… trò', ['ai (bài trò)', 'ay (bày trò)'], 'B', 'medium', 2, 7, 'Viết đúng là "bày trò".'),
  sc('Điền vần ai hoặc ay để tạo thành từ đúng: b… học', ['ai (bài học)', 'ay (bày học)'], 'A', 'medium', 2, 8, 'Viết đúng là "bài học".'),
  sc('Điền vần iêc hoặc iêt để tạo thành từ đúng: v… làm', ['iêc (việc làm)', 'iêt (việt làm)'], 'A', 'medium', 2, 9, 'Viết đúng là "việc làm".'),
  sc('Điền vần iêc hoặc iêt để tạo thành từ đúng: tạm b…', ['iêc (tạm biệc)', 'iêt (tạm biệt)'], 'B', 'medium', 2, 10, 'Viết đúng là "tạm biệt".'),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Chú bé nói dối → nông dân chạy đến → chú lại nói dối → sói đến thật → không ai tin chú', 'Sói đến thật → chú bé nói dối → các bác nông dân chạy đến', 'Các bác nông dân bỏ đi → chú bé mới bắt đầu chăn cừu', 'Chú bé cứu đàn cừu → sói bỏ chạy → nông dân cảm ơn chú'], 'A', 'hard', 3, 1),
  sc('Vì sao chú bé khoái chí sau lần lừa đầu tiên?', ['Vì chú thấy trò đùa của mình khiến các bác nông dân vội chạy đến', 'Vì các bác nông dân tặng quà cho chú', 'Vì đàn cừu tìm được nhiều cỏ', 'Vì chú đã đuổi được sói'], 'A', 'hard', 3, 2),
  sc('Việc chú bé nhiều lần giả vờ kêu cứu gây ra hậu quả gì?', ['Mọi người không còn tin lời chú khi nguy hiểm thật sự xảy ra', 'Các bác nông dân luôn ở bên chú', 'Đàn cừu được bảo vệ tốt hơn', 'Sói không dám đến gần đàn cừu'], 'A', 'hard', 3, 3),
  sc('Chi tiết nào cho thấy chú bé rất sợ hãi khi sói đến thật?', ['Chú ngồi nghỉ dưới gốc cây', 'Chú hốt hoảng kêu gào xin cứu giúp', 'Chú khoái chí cười', 'Chú tiếp tục nghĩ trò đùa'], 'B', 'hard', 3, 4),
  sc('Nếu ngay từ đầu chú bé không nói dối, chuyện gì có thể xảy ra khi sói đến?', ['Các bác nông dân có thể tin và chạy đến giúp chú', 'Sói sẽ trở thành bạn của chú', 'Đàn cừu tự chạy về nhà', 'Chú bé sẽ không cần gọi cứu'], 'A', 'hard', 3, 5),
  sc('Câu nào hoàn thành đúng nội dung bài: Em nghĩ rằng (…).', ['chúng ta không nên nói dối và trêu đùa bằng những chuyện nguy hiểm', 'nói dối nhiều lần sẽ khiến mọi người yêu quý hơn', 'có thể giả vờ kêu cứu để mua vui', 'lời nói không ảnh hưởng đến lòng tin của người khác'], 'A', 'hard', 3, 6),
  sc('Điền vần thích hợp để tạo thành các từ đúng: ch… trốn – rạp x…', ['ai – iêt', 'ay – iêc', 'ai – iêc', 'ay – iêt'], 'B', 'hard', 3, 7, 'Viết đúng: "chạy trốn – rạp xiếc".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: các bác nông dân / chạy tới / nghe tiếng kêu cứu / tức tốc',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'các bác nông dân' },
      { key: '2', text: 'chạy tới' },
      { key: '3', text: 'nghe tiếng kêu cứu' },
      { key: '4', text: 'tức tốc' },
    ],
    correctAnswerJson: ['3', '1', '4', '2'], // Nghe tiếng kêu cứu, các bác nông dân tức tốc chạy tới
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Nghe tiếng kêu cứu, các bác nông dân tức tốc chạy tới".',
  },
  sc('Khi mắc lỗi vì đã nói không đúng sự thật, em nên làm gì?', ['Thành thật nhận lỗi, xin lỗi và không lặp lại', 'Tiếp tục nói dối để che giấu', 'Đổ lỗi cho người khác', 'Không cần quan tâm đến hậu quả'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Người hay nói dối sẽ mất lòng tin và có thể không được giúp đỡ khi gặp nguy hiểm', 'Nói dối là một trò chơi vui và không gây hậu quả', 'Chỉ cần nói thật khi có người lớn ở bên', 'Có thể kêu cứu giả để thử lòng người khác'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B30 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
