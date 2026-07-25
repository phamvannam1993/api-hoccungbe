require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Tia nắng đi đâu%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Tia nắng buổi sáng', 'Tia nắng đi đâu?', 'Nhà của mặt trời', 'Bé đón bình minh'], 'B', 'easy', 1, 1),
  sc('Buổi sáng thức dậy, bé cảm thấy thế nào?', ['Buồn ngủ', 'Buồn cười', 'Lo lắng', 'Sợ hãi'], 'B', 'easy', 1, 2),
  sc('Bé thấy điều gì như đang nhảy?', ['Một chú chim', 'Một chiếc lá', 'Tia nắng', 'Một con bướm'], 'C', 'easy', 1, 3),
  sc('Tia nắng nhảy trong đâu?', ['Lòng bàn tay', 'Túi áo', 'Cặp sách', 'Mái tóc'], 'A', 'easy', 1, 4),
  sc('Tia nắng nhảy trên đồ vật nào?', ['Chiếc giường', 'Bàn học', 'Cánh cửa', 'Giá sách'], 'B', 'easy', 1, 5),
  sc('Ngoài lòng bàn tay và bàn học, tia nắng còn nhảy ở đâu?', ['Trên tán cây', 'Dưới mặt đất', 'Trong dòng sông', 'Trên mái nhà'], 'A', 'easy', 1, 6),
  sc('Khi nào bé đi tìm tia nắng?', ['Buổi sáng', 'Buổi trưa', 'Tối đến giờ ngủ', 'Lúc đang đi học'], 'C', 'easy', 1, 7),
  sc('Khi bé tìm, tia nắng như thế nào?', ['Đang nhảy múa', 'Đang ngủ, lặng im', 'Đang chạy ngoài sân', 'Đang bay trên trời'], 'B', 'easy', 1, 8),
  sc('Theo bé, tia nắng ngủ ở đâu?', ['Trong tán cây', 'Trên bàn học', 'Ở nhà nắng', 'Trong lòng bàn tay'], 'C', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Thụy Anh', 'Ngọc Hà', 'Hải An', 'Phương Dung'], 'A', 'easy', 1, 10),
  sc('Từ "sực nhớ" có nghĩa là gì?', ['Bỗng nhiên nhớ ra', 'Quên hoàn toàn', 'Nhớ rất lâu', 'Cố tình không nhớ'], 'A', 'medium', 2, 1),
  sc('Từ "ngẫm nghĩ" chỉ hoạt động nào?', ['Suy nghĩ kĩ về một điều', 'Chạy nhảy ngoài sân', 'Nói chuyện thật to', 'Ngủ thật sâu'], 'A', 'medium', 2, 2),
  sc('Cụm từ "lặng im" có nghĩa là gì?', ['Không có tiếng động', 'Rất ồn ào', 'Chuyển động thật nhanh', 'Vừa hát vừa nhảy'], 'A', 'medium', 2, 3),
  sc('Những nơi nào có tia nắng vào buổi sáng?', ['Lòng bàn tay, bàn học và tán cây', 'Dưới gầm bàn, trong tủ và ngoài ngõ', 'Trong cặp sách, hộp bút và quyển vở', 'Dưới nước, trong hang và dưới đất'], 'A', 'medium', 2, 4),
  sc('Câu thơ nào cho biết bé bỗng nhớ đến tia nắng?', ['"Buổi sáng thức dậy"', '"Sực nhớ bé tìm"', '"Nhảy trên bàn học"', '"Mai gặp lại nhau"'], 'B', 'medium', 2, 5),
  sc('Câu thơ nào cho biết tia nắng không còn xuất hiện vào buổi tối?', ['"Có ai đang nhảy"', '"Nhảy trên tán cây"', '"Ngủ rồi. Lặng im..."', '"Một bài vui vui"'], 'C', 'medium', 2, 6),
  sc('Cặp tiếng nào cùng vần với nhau trong khổ thơ đầu?', ['dậy – thấy', 'cười – nhảy', 'ai – bài', 'sáng – vui'], 'A', 'medium', 2, 7, '"dậy" và "thấy" cùng vần "ây".'),
  sc('Trong câu "Tia nắng nhảy trên bàn học", từ nào chỉ hoạt động?', ['tia nắng', 'nhảy', 'bàn', 'học'], 'B', 'medium', 2, 8),
  sc('Tia nắng được miêu tả giống như ai?', ['Một người bạn nhỏ đang vui đùa', 'Một người đang ngủ quên', 'Một con vật đang săn mồi', 'Một người đang buồn bã'], 'A', 'medium', 2, 9),
  sc('Câu nào hoàn thành đúng nội dung bài thơ: Tối đến, bé sực nhớ và (…).', ['đi tìm tia nắng', 'chạy ra ngoài chơi', 'mở sách học bài', 'gọi bạn đến nhà'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Bé thấy tia nắng → tia nắng nhảy khắp nơi → tối bé đi tìm → bé nghĩ nắng về nhà ngủ', 'Bé đi ngủ → tia nắng xuất hiện → bé ra ngoài chơi', 'Tia nắng biến mất → bé thức dậy → trời bắt đầu mưa', 'Bé tìm tia nắng → tia nắng mới chiếu vào phòng → bé đi ngủ'], 'A', 'hard', 3, 1),
  sc('Vì sao tia nắng được miêu tả là đang "nhảy"?', ['Vì ánh nắng chiếu lấp lánh, chuyển đổi vị trí trên các sự vật', 'Vì tia nắng có đôi chân', 'Vì có người cầm tia nắng di chuyển', 'Vì tia nắng là một con vật'], 'A', 'hard', 3, 2),
  sc('Vì sao buổi tối bé không tìm thấy tia nắng?', ['Vì mặt trời đã lặn nên không còn ánh nắng chiếu xuống', 'Vì tia nắng bị khóa trong tủ', 'Vì bé đã đóng sách lại', 'Vì cây đã che kín cửa sổ'], 'A', 'hard', 3, 3),
  sc('Câu nói "Nắng ngủ nhà nắng" thể hiện điều gì?', ['Trí tưởng tượng hồn nhiên của bạn nhỏ', 'Bé biết chính xác địa chỉ của tia nắng', 'Bé đang giận tia nắng', 'Bé không thích ánh nắng'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Mai gặp lại nhau" cho biết điều gì?', ['Bé tin sáng hôm sau tia nắng sẽ xuất hiện trở lại', 'Bé không muốn nhìn thấy tia nắng nữa', 'Tia nắng sẽ biến mất mãi mãi', 'Bé sẽ đi tìm tia nắng vào ban đêm'], 'A', 'hard', 3, 5),
  sc('Tâm trạng của bé thay đổi như thế nào trong bài thơ?', ['Vui thích → thắc mắc → yên tâm chờ sáng hôm sau', 'Tức giận → sợ hãi → bỏ chạy', 'Buồn ngủ → khóc → giận mẹ', 'Lo lắng → thất vọng → không muốn gặp nắng'], 'A', 'hard', 3, 6),
  sc('Theo em, "nhà nắng" có thể được hiểu là ở đâu?', ['Nơi mặt trời ở phía bên kia bầu trời khi đêm xuống', 'Trong chiếc hộp bút của bé', 'Dưới gốc cây trước nhà', 'Trong ngăn bàn học'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: tia nắng / trên tán cây / vui vẻ / nhảy',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'tia nắng' },
      { key: '2', text: 'trên tán cây' },
      { key: '3', text: 'vui vẻ' },
      { key: '4', text: 'nhảy' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Tia nắng vui vẻ nhảy trên tán cây
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Tia nắng vui vẻ nhảy trên tán cây".',
  },
  sc('Ánh nắng buổi sáng có ích lợi gì?', ['Giúp cảnh vật sáng rõ, mang lại sự ấm áp và giúp cây phát triển', 'Làm cho mọi vật tối đi', 'Khiến cây không thể lớn', 'Làm cho con người không nhìn thấy đường'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Sự quan sát và tưởng tượng ngộ nghĩnh của bé về tia nắng', 'Cách trồng và chăm sóc cây xanh', 'Một chuyến đi chơi trong rừng', 'Câu chuyện về một chú chim nhỏ'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B39 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
