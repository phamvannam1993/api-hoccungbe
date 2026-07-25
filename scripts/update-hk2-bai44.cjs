require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Hoa phượng%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Cây phượng già', 'Hoa phượng', 'Mùa hè của em', 'Con đường hoa đỏ'], 'B', 'easy', 1, 1),
  sc('Hôm qua, hoa phượng mới nở như thế nào?', ['Nở kín cả cây', 'Còn lấm tấm', 'Đã rụng xuống đường', 'Chưa có nụ'], 'B', 'easy', 1, 2),
  sc('Hoa phượng lấm tấm chen lẫn với màu gì?', ['Màu trời xanh', 'Màu lá xanh', 'Màu đất nâu', 'Màu mây trắng'], 'B', 'easy', 1, 3),
  sc('Sáng nay, hoa phượng có màu gì?', ['Trắng tinh', 'Vàng tươi', 'Đỏ thắm', 'Tím nhạt'], 'C', 'easy', 1, 4),
  sc('Hoa phượng nở ở đâu?', ['Trên cành', 'Dưới gốc cây', 'Trong vườn rau', 'Trên mái nhà'], 'A', 'easy', 1, 5),
  sc('Bạn nhỏ gọi ai trong bài thơ?', ['Mẹ', 'Bố', 'Bà', 'Cô giáo'], 'C', 'easy', 1, 6),
  sc('Hoa phượng được ví như có hàng nghìn gì?', ['Ngôi sao', 'Mắt lửa', 'Chiếc lá', 'Cánh chim'], 'B', 'easy', 1, 7),
  sc('Hoa phượng nở đỏ ở đâu?', ['Cả dãy phố nhà mình', 'Trong một khu rừng xa', 'Trên cánh đồng', 'Bên bờ biển'], 'A', 'easy', 1, 8),
  sc('Ai được bạn nhỏ tưởng tượng là quạt cho cây?', ['Chị mây', 'Chị gió', 'Chị nắng', 'Chị mưa'], 'B', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Lê Huy Hòa', 'Nguyễn Lãm Thắng', 'Thụy Anh', 'Ngọc Hà'], 'A', 'easy', 1, 10),
  sc('Từ "lấm tấm" trong bài có nghĩa là gì?', ['Xuất hiện thành những chấm nhỏ, rải rác', 'Nở thành từng bông rất lớn', 'Rụng hết xuống đất', 'Bị che kín hoàn toàn'], 'A', 'medium', 2, 1),
  sc('Từ "bừng" trong câu "Sáng nay bừng lửa thắm" diễn tả điều gì?', ['Bỗng trở nên rực sáng, nổi bật', 'Dần dần tối lại', 'Rơi xuống rất nhanh', 'Chuyển sang màu xanh'], 'A', 'medium', 2, 2),
  sc('Cụm từ "rừng rực cháy" miêu tả hoa phượng như thế nào?', ['Đỏ rực và nổi bật như ngọn lửa', 'Có khói bốc lên thật', 'Đang bị cháy khô', 'Có màu vàng nhạt'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào cho biết hoa phượng nở rất nhiều?', ['"Hôm qua còn lấm tấm"', '"Chen lẫn màu lá xanh"', '"Phượng nở nghìn mắt lửa"', '"Chị gió quạt cho cây?"'], 'C', 'medium', 2, 4),
  sc('Câu thơ nào cho biết hoa phượng nở rất nhanh?', ['"Bà ơi! Sao mà nhanh!"', '"Cả dãy phố nhà mình"', '"Hay đêm qua không ngủ"', '"Cho hoa bừng hôm nay?"'], 'A', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau?', ['xanh – nhanh', 'đỏ – cây', 'lửa – mình', 'thắm – nay'], 'A', 'medium', 2, 6, '"xanh" và "nhanh" cùng vần "anh".'),
  sc('Tiếng nào cùng vần với tiếng "xanh"?', ['lạnh', 'lửa', 'cây', 'đỏ'], 'A', 'medium', 2, 7, '"xanh" và "lạnh" cùng vần "anh".'),
  sc('Tiếng nào cùng vần với tiếng "lửa"?', ['giữa', 'lá', 'trời', 'cành'], 'A', 'medium', 2, 8, '"lửa" và "giữa" cùng vần "ưa".'),
  sc('Tiếng nào cùng vần với tiếng "cây"?', ['mây', 'xanh', 'lửa', 'đỏ'], 'A', 'medium', 2, 9, '"cây" và "mây" cùng vần "ây".'),
  sc('Theo trí tưởng tượng của bạn nhỏ, mặt trời đã làm gì?', ['Ủ lửa cho hoa phượng bừng nở', 'Làm hoa phượng rụng hết', 'Làm lá phượng chuyển sang màu trắng', 'Che cây phượng khỏi gió'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Hoa còn lấm tấm → sáng hôm sau hoa đỏ rực → bạn nhỏ ngạc nhiên → bạn tưởng tượng nguyên nhân hoa nở', 'Hoa rụng hết → bạn nhỏ trồng lại cây → hoa nở', 'Gió nổi lên → trời mưa → hoa phượng chuyển màu xanh', 'Mặt trời lặn → hoa phượng ngủ → bà gọi bạn nhỏ'], 'A', 'hard', 3, 1),
  sc('Vì sao hoa phượng được gọi là "nghìn mắt lửa"?', ['Vì rất nhiều bông hoa đỏ rực trông giống những đốm lửa', 'Vì trên cây có nhiều ngọn đèn', 'Vì hoa phượng có thể phát ra lửa', 'Vì cây phượng đang bị cháy'], 'A', 'hard', 3, 2),
  sc('Hình ảnh "một trời hoa phượng đỏ" giúp em hình dung cảnh vật như thế nào?', ['Hoa phượng nở dày, đỏ rực khắp dãy phố', 'Trời đang có bão lớn', 'Lá phượng đã rụng hết', 'Cả dãy phố chìm trong bóng tối'], 'A', 'hard', 3, 3),
  sc('Hai câu thơ "Hay đêm qua không ngủ / Chị gió quạt cho cây?" thể hiện điều gì?', ['Trí tưởng tượng hồn nhiên, ngộ nghĩnh của bạn nhỏ', 'Bạn nhỏ biết chính xác cách hoa nở', 'Chị của bạn nhỏ đang chăm sóc cây', 'Cây phượng chỉ nở khi có người quạt'], 'A', 'hard', 3, 4),
  sc('Tâm trạng của bạn nhỏ khi nhìn thấy hoa phượng là gì?', ['Ngạc nhiên và thích thú', 'Buồn bã và lo sợ', 'Tức giận và khó chịu', 'Mệt mỏi và buồn ngủ'], 'A', 'hard', 3, 5),
  sc('Màu đỏ của hoa phượng được so sánh với những hình ảnh nào?', ['Lửa thắm và mắt lửa', 'Mây trắng và dòng sông', 'Mặt trăng và ngôi sao', 'Lá xanh và cánh đồng'], 'A', 'hard', 3, 6),
  sc('Qua bài thơ, cây phượng thường được trồng ở đâu?', ['Dọc các dãy phố và gần nhà', 'Dưới đáy biển', 'Giữa cánh đồng lúa', 'Trong hang núi'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: hoa phượng / đỏ rực / trên cành / nở',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'hoa phượng' },
      { key: '2', text: 'đỏ rực' },
      { key: '3', text: 'trên cành' },
      { key: '4', text: 'nở' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Hoa phượng nở đỏ rực trên cành
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Hoa phượng nở đỏ rực trên cành".',
  },
  sc('Câu nào phù hợp nhất để miêu tả bức tranh?', ['Những chùm hoa phượng đỏ rực nổi bật giữa tán lá xanh.', 'Cây phượng đã rụng hết lá và hoa.', 'Trên cây chỉ có những bông hoa trắng.', 'Hoa phượng đang nở dưới mặt nước.'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Miêu tả vẻ đẹp rực rỡ của hoa phượng và sự ngạc nhiên, tưởng tượng đáng yêu của bạn nhỏ', 'Hướng dẫn cách trồng cây phượng', 'Kể về một trận cháy trên phố', 'Miêu tả công việc của bà và bạn nhỏ'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B44 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
