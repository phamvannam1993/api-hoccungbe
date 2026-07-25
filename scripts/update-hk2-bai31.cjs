require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Tiếng vọng của núi%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Gấu con đi chơi', 'Tiếng vọng của núi', 'Hạt dẻ trong rừng', 'Gấu mẹ và gấu con'], 'B', 'easy', 1, 1),
  sc('Gấu con đang đi chơi ở đâu?', ['Trong công viên', 'Trên bãi biển', 'Trong núi', 'Ngoài cánh đồng'], 'C', 'easy', 1, 2),
  sc('Gấu con nhìn thấy vật gì?', ['Một quả táo', 'Một hạt dẻ', 'Một bông hoa', 'Một chiếc lá'], 'B', 'easy', 1, 3),
  sc('Khi nhìn thấy hạt dẻ, gấu con cảm thấy thế nào?', ['Buồn bã', 'Vui mừng', 'Lo lắng', 'Tức giận'], 'B', 'easy', 1, 4),
  sc('Gấu con đã reo lên tiếng gì?', ['"Ôi!"', '"A!"', '"Này!"', '"Mẹ ơi!"'], 'B', 'easy', 1, 5),
  sc('Sau khi gấu con reo "A!", điều gì xảy ra?', ['Có tiếng "A!" vọng lại', 'Một con gấu khác xuất hiện', 'Hạt dẻ rơi xuống đất', 'Trời bắt đầu mưa'], 'A', 'easy', 1, 6),
  sc('Tiếng vọng phát ra từ đâu?', ['Từ ngôi nhà', 'Từ mặt hồ', 'Từ vách núi', 'Từ trên cây'], 'C', 'easy', 1, 7),
  sc('Gấu con đã nói câu nào khi bực tức?', ['"Tôi yêu bạn."', '"Tôi nhớ bạn."', '"Tôi ghét bạn."', '"Tôi chào bạn."'], 'C', 'easy', 1, 8),
  sc('Khi nghe tiếng "Tôi ghét bạn" vọng lại, gấu con làm gì?', ['Bật cười', 'Tủi thân và òa khóc', 'Chạy đi tìm bạn', 'Ngồi ăn hạt dẻ'], 'B', 'easy', 1, 9),
  sc('Ai đã khuyên gấu con quay lại nói lời yêu thương?', ['Gấu bố', 'Một người bạn', 'Gấu mẹ', 'Một chú chim'], 'C', 'easy', 1, 10),
  sc('Từ "tiếng vọng" chỉ âm thanh như thế nào?', ['Âm thanh dội lại sau khi phát ra', 'Âm thanh rất nhỏ không nghe thấy', 'Âm thanh của chim hót', 'Âm thanh của mưa rơi'], 'A', 'medium', 2, 1),
  sc('Từ "bực tức" chỉ trạng thái nào?', ['Vui vẻ, hào hứng', 'Giận dữ, khó chịu', 'Buồn ngủ, mệt mỏi', 'Ngạc nhiên, tò mò'], 'B', 'medium', 2, 2),
  sc('Từ "tủi thân" có nghĩa là gì?', ['Buồn vì cảm thấy mình không được yêu thương hoặc quan tâm', 'Vui vì được mọi người khen', 'Tự hào về bản thân', 'Tức giận vì bị mất đồ'], 'A', 'medium', 2, 3),
  sc('Từ "quả nhiên" có nghĩa là gì?', ['Đúng như đã nghĩ hoặc dự đoán', 'Hoàn toàn bất ngờ', 'Không thể xảy ra', 'Xảy ra rất chậm'], 'A', 'medium', 2, 4),
  sc('Gấu mẹ khuyên gấu con nói gì với núi?', ['"Tôi ghét bạn."', '"Bạn là ai?"', '"Tôi yêu bạn."', '"Hãy im lặng!"'], 'C', 'medium', 2, 5),
  sc('Sau khi gấu con nói "Tôi yêu bạn", tiếng vọng đáp lại thế nào?', ['"Tôi không biết."', '"Tôi yêu bạn."', '"Tôi ghét bạn."', '"Bạn đi đâu?"'], 'B', 'medium', 2, 6),
  sc('Sau khi làm theo lời mẹ, gấu con cảm thấy thế nào?', ['Bật cười vui vẻ', 'Tiếp tục òa khóc', 'Rất sợ hãi', 'Vẫn bực tức'], 'A', 'medium', 2, 7),
  sc('Chọn từ thích hợp để hoàn thành câu: Hà luôn giúp đỡ bạn nên được cả lớp (…).', ['tủi thân', 'nhìn thấy', 'yêu mến', 'reo lên'], 'C', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Gấu con (…) vì các bạn không chơi cùng.', ['vui mừng', 'tủi thân', 'reo lên', 'yêu mến'], 'B', 'medium', 2, 9),
  sc('Trong bức tranh hai bạn gặp nhau trước cổng trường, câu nói nào phù hợp nhất?', ['"Tôi ghét bạn."', '"Không chơi với bạn."', '"Chào bạn!"', '"Bạn đi đi!"'], 'C', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Gấu con thấy hạt dẻ → nghe tiếng vọng → nói lời tức giận → về kể mẹ → quay lại nói lời yêu thương', 'Gấu mẹ đi núi → gấu con khóc → hạt dẻ xuất hiện', 'Gấu con nói lời yêu thương → nghe tiếng ghét bỏ → về nhà', 'Gấu con gặp một người bạn → cùng nhau hái hạt dẻ'], 'A', 'hard', 3, 1),
  sc('Vì sao núi đáp lại đúng những lời gấu con nói?', ['Vì trong núi có một con gấu khác', 'Vì âm thanh của gấu con dội lại tạo thành tiếng vọng', 'Vì gấu mẹ đứng sau vách núi', 'Vì núi biết nói chuyện'], 'B', 'hard', 3, 2),
  sc('Vì sao lúc đầu gấu con tưởng có ai đó đang nói với mình?', ['Vì gấu con chưa hiểu đó là tiếng vọng', 'Vì gấu con nhìn thấy một người bạn', 'Vì gấu mẹ gọi gấu con', 'Vì có nhiều con vật trong núi'], 'A', 'hard', 3, 3),
  sc('Lời khuyên của gấu mẹ giúp gấu con hiểu điều gì?', ['Những lời mình nói ra có thể nhận lại những lời tương tự', 'Núi luôn ghét tất cả mọi người', 'Không nên đi chơi trong núi', 'Hạt dẻ không thể ăn được'], 'A', 'hard', 3, 4),
  sc('Hai phần của bức tranh đầu bài khác nhau chủ yếu ở điều gì?', ['Một bên gấu nói lời ghét, một bên gấu nói lời yêu thương', 'Một bên có núi, một bên không có núi', 'Một bên là ban ngày, một bên là ban đêm', 'Một bên có gấu, một bên không có gấu'], 'A', 'hard', 3, 5),
  sc('Chi tiết nào cho thấy lời nói tích cực đem lại niềm vui?', ['Gấu con nói "Tôi yêu bạn", nghe lời yêu thương vọng lại và bật cười', 'Gấu con tìm thấy hạt dẻ', 'Gấu con hỏi "Bạn là ai?"', 'Gấu con về nhà kể chuyện'], 'A', 'hard', 3, 6),
  sc('Dãy nào lần lượt chứa các vần iêt – iêp – ưc – ưt?', ['biết – tiếp – bực – đứt', 'tiếp – biết – đứt – bực', 'bực – đứt – biết – tiếp', 'đứt – bực – tiếp – biết'], 'A', 'hard', 3, 7),
  sc('Nhóm từ nào được ghép đúng theo mối quan hệ?', ['Tắt đèn – tối; tập thể dục – khỏe mạnh; chăm học – được khen', 'Tắt đèn – sáng; trời mưa – đường khô; chăm học – bị phê bình', 'Bật đèn – tối; tập thể dục – mệt yếu; chăm học – không tiến bộ', 'Mưa – đường khô; tắt đèn – sáng; lười học – được khen'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: gấu con / lời yêu thương / nói với núi',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'gấu con' },
      { key: '2', text: 'lời yêu thương' },
      { key: '3', text: 'nói với núi' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Gấu con nói với núi lời yêu thương
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Gấu con nói với núi lời yêu thương".',
  },
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Nên nói lời tốt đẹp, yêu thương và cư xử thân thiện với mọi người', 'Khi tức giận, nên nói những lời làm người khác buồn', 'Chỉ cần thân thiện với người quen', 'Không cần quan tâm lời nói của mình ảnh hưởng đến ai'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B31 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
