require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Kiến và chim bồ câu%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Kiến và chim bồ câu', 'Chim bồ câu và thợ săn', 'Chú kiến thông minh', 'Người bạn tốt'], 'A', 'easy', 1, 1),
  sc('Con vật nào không may bị rơi xuống nước?', ['Chim bồ câu', 'Con kiến', 'Con ong', 'Con bướm'], 'B', 'easy', 1, 2),
  sc('Khi bị rơi xuống nước, kiến làm gì?', ['Nằm im', 'Vùng vẫy và kêu cứu', 'Bơi rất nhanh vào bờ', 'Gọi người thợ săn'], 'B', 'easy', 1, 3),
  sc('Con vật nào nghe thấy tiếng kiến kêu cứu?', ['Chim sẻ', 'Chim bồ câu', 'Chim sâu', 'Chim én'], 'B', 'easy', 1, 4),
  sc('Bồ câu thả vật gì xuống nước để cứu kiến?', ['Một cành cây', 'Một viên đá', 'Một chiếc lá', 'Một sợi dây'], 'C', 'easy', 1, 5),
  sc('Kiến làm gì để lên được bờ?', ['Bám vào chiếc lá', 'Bám vào chân bồ câu', 'Leo lên một tảng đá', 'Bơi theo dòng nước'], 'A', 'easy', 1, 6),
  sc('Ai định ngắm bắn chim bồ câu?', ['Người nông dân', 'Người thợ săn', 'Người đánh cá', 'Người chăn cừu'], 'B', 'easy', 1, 7),
  sc('Kiến cắn vào đâu của người thợ săn?', ['Bàn tay', 'Cánh tay', 'Bàn chân', 'Chân'], 'D', 'easy', 1, 8),
  sc('Khi người thợ săn giật mình, bồ câu làm gì?', ['Bay đi', 'Rơi xuống đất', 'Đậu lại trên cây', 'Bay đến chỗ người thợ săn'], 'A', 'easy', 1, 9),
  sc('Cuối câu chuyện, kiến và bồ câu cảm thấy thế nào?', ['Rất buồn', 'Rất tức giận', 'Rất vui', 'Rất lo lắng'], 'C', 'easy', 1, 10),
  sc('Từ "vùng vẫy" miêu tả hành động như thế nào?', ['Cử động mạnh để cố thoát khỏi nguy hiểm', 'Nằm yên để nghỉ ngơi', 'Đi lại thật chậm', 'Bay lên thật cao'], 'A', 'medium', 2, 1),
  sc('Từ "nhanh trí" dùng để nói về người như thế nào?', ['Biết nghĩ ra cách giải quyết nhanh chóng', 'Chạy nhanh hơn mọi người', 'Nói rất nhiều', 'Dễ bị hoảng sợ'], 'A', 'medium', 2, 2),
  sc('Từ "giật mình" chỉ trạng thái nào?', ['Bất ngờ và hoảng hốt trong chốc lát', 'Vui mừng vì được khen', 'Mệt mỏi sau khi làm việc', 'Buồn ngủ và muốn nghỉ'], 'A', 'medium', 2, 3),
  sc('Bồ câu đã làm gì để cứu kiến?', ['Nhặt một chiếc lá thả xuống nước', 'Dùng mỏ kéo kiến lên bờ', 'Gọi người thợ săn đến giúp', 'Bay xuống nước cõng kiến'], 'A', 'medium', 2, 4),
  sc('Kiến đã làm gì để cứu bồ câu?', ['Kêu thật to để báo cho bồ câu', 'Bò đến cắn vào chân người thợ săn', 'Ném đá vào người thợ săn', 'Kéo bồ câu xuống đất'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Nam (…) nghĩ ngay ra lời giải cho câu đố.', ['giật mình', 'nhanh trí', 'vùng vẫy', 'thợ săn'], 'B', 'medium', 2, 6),
  sc('Chọn từ thích hợp để hoàn thành câu: Ông kể cho em nghe một câu chuyện (…).', ['cảm động', 'nhanh trí', 'vùng vẫy', 'giật mình'], 'A', 'medium', 2, 7),
  sc('Hoàn thành câu theo nội dung bài: Kiến bò đến chỗ người thợ săn và (…).', ['cắn vào chân anh ta', 'gọi anh ta lại', 'đưa cho anh ta chiếc lá', 'trốn dưới chân anh ta'], 'A', 'medium', 2, 8),
  sc('Vì sao bồ câu cảm ơn kiến?', ['Vì kiến đã tìm thức ăn cho bồ câu', 'Vì kiến đã giúp bồ câu thoát khỏi người thợ săn', 'Vì kiến tặng bồ câu một chiếc lá', 'Vì kiến chỉ đường cho bồ câu'], 'B', 'medium', 2, 9),
  sc('Câu nào nói đúng về kiến và bồ câu?', ['Cả hai đều biết giúp đỡ nhau', 'Cả hai thường tranh giành nhau', 'Bồ câu không nhớ việc kiến đã làm', 'Kiến không biết cảm ơn bồ câu'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Kiến rơi xuống nước → bồ câu cứu kiến → thợ săn định bắn bồ câu → kiến cứu bồ câu', 'Thợ săn xuất hiện → kiến rơi xuống nước → bồ câu bay đi', 'Bồ câu cảm ơn kiến → kiến mới bị rơi xuống nước', 'Kiến cắn thợ săn → bồ câu thả lá → kiến lên bờ'], 'A', 'hard', 3, 1),
  sc('Vì sao bồ câu được xem là nhanh trí?', ['Vì bồ câu lập tức nghĩ ra cách dùng chiếc lá cứu kiến', 'Vì bồ câu bay nhanh hơn các loài chim khác', 'Vì bồ câu biết nói chuyện với kiến', 'Vì bồ câu nhìn thấy người thợ săn trước'], 'A', 'hard', 3, 2),
  sc('Vì sao kiến cắn vào chân người thợ săn?', ['Để người thợ săn giật mình, giúp bồ câu có cơ hội bay đi', 'Vì kiến muốn lấy thức ăn', 'Vì kiến không nhận ra người thợ săn', 'Để gọi bồ câu bay đến'], 'A', 'hard', 3, 3),
  sc('Chi tiết nào thể hiện kiến biết nhớ ơn?', ['Kiến cứu bồ câu khi thấy bồ câu gặp nguy hiểm', 'Kiến vùng vẫy dưới nước', 'Kiến leo lên chiếc lá', 'Kiến kêu cứu thật to'], 'A', 'hard', 3, 4),
  sc('Câu nói "Cậu cũng giúp tớ thoát chết mà" cho thấy kiến là người như thế nào?', ['Biết ơn và coi việc giúp lại bạn là điều nên làm', 'Không muốn nhận lời cảm ơn', 'Đang trách bồ câu', 'Muốn được bồ câu tặng quà'], 'A', 'hard', 3, 5),
  sc('Tiếng nào dưới đây chứa vần ân?', ['chân', 'tầng', 'thoát', 'loắt'], 'A', 'hard', 3, 6, '"chân" có vần "ân".'),
  sc('Tiếng nào dưới đây chứa vần âng?', ['thân', 'tầng', 'hoạt', 'choắt'], 'B', 'hard', 3, 7, '"tầng" có vần "âng".'),
  sc('Dãy nào lần lượt chứa các vần ân – âng – oat – oăt?', ['chân – tầng – thoát – choắt', 'tầng – chân – choắt – thoát', 'thoát – choắt – chân – tầng', 'choắt – thoát – tầng – chân'], 'A', 'hard', 3, 8),
  sc('Việc người thợ săn ngắm bắn chim bồ câu là đúng hay sai?', ['Đúng, vì chim bồ câu không có ích', 'Sai, vì không nên săn bắt và làm hại các loài chim', 'Đúng, vì người thợ săn đang vui chơi', 'Sai, vì người thợ săn không mang theo thức ăn'], 'B', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Cần biết yêu thương, giúp đỡ và biết ơn người đã giúp mình', 'Chỉ nên giúp những người khỏe mạnh', 'Không cần quan tâm khi người khác gặp nguy hiểm', 'Giúp đỡ người khác chỉ để được nhận quà'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B27 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
