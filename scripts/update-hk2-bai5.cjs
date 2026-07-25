require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Sinh nhật của voi con%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Voi con bị ốm', 'Sinh nhật của voi con', 'Những người bạn tốt', 'Bữa tiệc trong rừng'], 'B', 'easy', 1, 1),
  sc('Hôm nay là ngày gì của voi con?', ['Ngày voi con đi học', 'Ngày voi con đi chơi', 'Ngày sinh nhật của voi con', 'Ngày voi con chuyển nhà'], 'C', 'easy', 1, 2),
  sc('Vì sao voi con buồn bã?', ['Vì voi con bị ốm', 'Vì voi con bị lạc', 'Vì voi con mất đồ chơi', 'Vì voi con không có thức ăn'], 'A', 'easy', 1, 3),
  sc('Ai đã đến chúc mừng sinh nhật voi con?', ['Các bạn của voi con', 'Chỉ có thỏ trắng', 'Bố mẹ của voi con', 'Các cô giáo'], 'A', 'easy', 1, 4),
  sc('Thỏ trắng mang món quà gì?', ['Một quả táo', 'Một củ cà rốt', 'Một nải chuối', 'Một chiếc bánh'], 'B', 'easy', 1, 5),
  sc('Gấu đen mang món quà gì?', ['Một nải chuối', 'Một củ cà rốt', 'Một quả cam', 'Một bó hoa'], 'A', 'easy', 1, 6),
  sc('Khỉ vàng cùng con vật nào tặng voi con một tiết mục?', ['Thỏ trắng', 'Gấu đen', 'Sóc nâu', 'Vẹt mỏ khoằm'], 'C', 'easy', 1, 7),
  sc('Ai thay mặt các bạn nói lời chúc tốt đẹp?', ['Khỉ vàng', 'Vẹt mỏ khoằm', 'Gấu đen', 'Sóc nâu'], 'B', 'easy', 1, 8),
  sc('Voi con làm gì để cảm ơn các bạn?', ['Huơ vòi mấy vòng', 'Chạy quanh sân', 'Hát một bài', 'Tặng quà cho các bạn'], 'A', 'easy', 1, 9),
  sc('Cuối câu chuyện, voi con cảm thấy thế nào?', ['Lo lắng', 'Buồn bã', 'Rất vui', 'Tức giận'], 'C', 'easy', 1, 10),
  sc('Từ "buồn bã" chỉ trạng thái nào?', ['Không vui, cảm thấy buồn', 'Vui vẻ, phấn khởi', 'Tức giận, khó chịu', 'Ngạc nhiên, bất ngờ'], 'A', 'medium', 2, 1),
  sc('Từ "ngoạm" có nghĩa là gì?', ['Dùng miệng ngậm hoặc cắn chặt một vật', 'Dùng chân đẩy một vật', 'Dùng tay cầm nhẹ một vật', 'Dùng mũi ngửi một vật'], 'A', 'medium', 2, 2),
  sc('Cụm từ "tiết mục" chỉ điều gì?', ['Một phần biểu diễn', 'Một món ăn', 'Một món quà', 'Một trò chơi ngoài trời'], 'A', 'medium', 2, 3),
  sc('Cụm từ "ngúc ngoắc đuôi" miêu tả hành động nào?', ['Đưa đuôi qua lại liên tục', 'Giấu đuôi vào phía sau', 'Dùng đuôi cầm thức ăn', 'Nằm im không cử động'], 'A', 'medium', 2, 4),
  sc('Từ "mỏ khoằm" miêu tả chiếc mỏ như thế nào?', ['Cong quặp xuống', 'Dài và thẳng', 'Ngắn và tròn', 'Rộng và bằng'], 'A', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Vân rất (…) vì được đi chơi cùng các bạn.', ['tốt đẹp', 'vui', 'buồn bã', 'mệt mỏi'], 'B', 'medium', 2, 6),
  sc('Tiếng nào dưới đây có vần oam?', ['ngoạm', 'ngoắc', 'khoằm', 'huơ'], 'A', 'medium', 2, 7, '"ngoạm" có vần "oam".'),
  sc('Tiếng nào dưới đây có vần oăc?', ['ngoạm', 'ngoắc', 'khoằm', 'chúc'], 'B', 'medium', 2, 8, '"ngoắc" có vần "oăc".'),
  sc('Tiếng nào dưới đây có vần oăm?', ['ngoạm', 'khoằm', 'huơ', 'vui'], 'B', 'medium', 2, 9, '"khoằm" có vần "oăm".'),
  sc('Câu nào đúng với nội dung bài đọc?', ['Các bạn quên sinh nhật của voi con.', 'Voi con tổ chức sinh nhật một mình.', 'Các bạn đến thăm và chúc mừng sinh nhật voi con.', 'Voi con không muốn gặp các bạn.'], 'C', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Các bạn đến → voi con bị ốm → voi con cảm ơn → voi con buồn', 'Voi con bị ốm và buồn → các bạn đến chúc mừng → các bạn tặng quà, biểu diễn → voi con cảm ơn', 'Voi con cảm ơn → gấu mang chuối → voi con bị ốm → các bạn ra về', 'Thỏ mang cà rốt → voi con đi chơi → các bạn tổ chức cuộc thi'], 'B', 'hard', 3, 1),
  sc('Vì sao voi con từ buồn bã trở nên rất vui?', ['Vì voi con đã khỏi ốm ngay lập tức', 'Vì các bạn đến thăm, tặng quà, biểu diễn và chúc mừng sinh nhật', 'Vì voi con tìm thấy một món đồ chơi', 'Vì voi con được đi ra ngoài'], 'B', 'hard', 3, 2),
  sc('Chi tiết nào thể hiện các bạn rất quan tâm đến voi con?', ['Các bạn đến thăm và chúc mừng dù voi con đang bị ốm', 'Các bạn rủ nhau đi chơi xa', 'Các bạn giấu quà của voi con', 'Các bạn để voi con ở nhà một mình'], 'A', 'hard', 3, 3),
  sc('Ai mang quà là thức ăn cho voi con?', ['Thỏ trắng và gấu đen', 'Khỉ vàng và sóc nâu', 'Vẹt mỏ khoằm và khỉ vàng', 'Sóc nâu và vẹt mỏ khoằm'], 'A', 'hard', 3, 4),
  sc('Khỉ vàng và sóc nâu thể hiện tình cảm với voi con bằng cách nào?', ['Mang thuốc cho voi con', 'Tặng tiết mục "ngúc ngoắc đuôi"', 'Đưa voi con đi chơi', 'Nấu cơm cho voi con'], 'B', 'hard', 3, 5),
  sc('Câu nào hoàn thành đúng yêu cầu của bài: Voi con (…) để cảm ơn các bạn.', ['huơ vòi mấy vòng', 'ngoạm một nải chuối', 'nói những lời chúc tốt đẹp', 'mang một củ cà rốt'], 'A', 'hard', 3, 6),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đến / các bạn / sinh nhật / chúc mừng / voi con',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'đến' },
      { key: '2', text: 'các bạn' },
      { key: '3', text: 'sinh nhật' },
      { key: '4', text: 'chúc mừng' },
      { key: '5', text: 'voi con' },
    ],
    correctAnswerJson: ['2', '1', '4', '3', '5'], // Các bạn đến chúc mừng sinh nhật voi con
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 7,
    explanation: 'Câu đúng: "Các bạn đến chúc mừng sinh nhật voi con".',
  },
  sc('Lời chúc nào phù hợp để nói với một người bạn trong ngày sinh nhật?', ['Chúc bạn sinh nhật vui vẻ, luôn mạnh khỏe và học giỏi!', 'Bạn phải tặng quà cho mình nhé!', 'Hôm nay mình không muốn chơi với bạn.', 'Bạn không được mời các bạn khác.'], 'A', 'hard', 3, 8),
  sc('Khi một người bạn bị ốm đúng ngày sinh nhật, em nên làm gì?', ['Đến thăm hoặc gửi lời chúc, hỏi thăm và động viên bạn', 'Trêu chọc vì bạn không đi chơi được', 'Không quan tâm đến bạn', 'Bắt bạn tham gia các trò chơi vận động mạnh'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Bạn bè cần biết quan tâm, chia sẻ và mang niềm vui đến cho nhau', 'Quà sinh nhật phải là những món đồ đắt tiền', 'Khi bị ốm, không nên gặp bất cứ ai', 'Chỉ cần nhận quà, không cần cảm ơn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B5 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
