require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ruộng bậc thang%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Mùa lúa chín', 'Ruộng bậc thang ở Sa Pa', 'Cánh đồng quê em', 'Sa Pa mùa xuân'], 'B', 'easy', 1, 1),
  sc('Bài đọc giới thiệu ruộng bậc thang ở đâu?', ['Hà Nội', 'Sa Pa', 'Huế', 'Đà Nẵng'], 'B', 'easy', 1, 2),
  sc('Khách du lịch đến Sa Pa vào mùa nào để ngắm ruộng bậc thang vàng rực?', ['Mùa lúa chín', 'Mùa đông', 'Mùa mưa', 'Mùa hoa đào'], 'A', 'easy', 1, 3),
  sc('Vào mùa lúa chín, ruộng bậc thang có màu gì?', ['Màu trắng', 'Màu vàng', 'Màu đỏ', 'Màu tím'], 'B', 'easy', 1, 4),
  sc('Nhìn từ xa, những khu ruộng giống như gì?', ['Những dòng sông', 'Những bậc thang khổng lồ', 'Những ngôi nhà cao tầng', 'Những con đường lớn'], 'B', 'easy', 1, 5),
  sc('Những bậc ruộng được miêu tả như nối mặt đất với đâu?', ['Dòng sông', 'Cánh rừng', 'Bầu trời', 'Bản làng'], 'C', 'easy', 1, 6),
  sc('Hương gì lan tỏa khắp nơi vào mùa lúa chín?', ['Hương hoa', 'Hương lúa', 'Hương quả', 'Hương trà'], 'B', 'easy', 1, 7),
  sc('Ruộng bậc thang ở Sa Pa đã có từ bao lâu?', ['Vài tháng', 'Vài năm', 'Hàng chục ngày', 'Hàng trăm năm'], 'D', 'easy', 1, 8),
  sc('Những người dân tộc nào được nhắc đến trong bài?', ['H’Mông, Dao, Hà Nhì', 'Tày, Nùng, Mường', 'Chăm, Khmer, Ê-đê', 'Thái, Kinh, Hoa'], 'A', 'easy', 1, 9),
  sc('Ruộng bậc thang được tạo nên bởi gì?', ['Máy móc hiện đại', 'Đôi bàn tay chăm chỉ, cần mẫn của người dân', 'Nước mưa và gió', 'Khách du lịch'], 'B', 'easy', 1, 10),
  sc('Từ "khổng lồ" có nghĩa là gì?', ['Rất nhỏ', 'Rất lớn', 'Rất thấp', 'Rất nhẹ'], 'B', 'medium', 2, 1),
  sc('Từ "bất tận" có nghĩa là gì?', ['Dài rộng như không có điểm kết thúc', 'Ngắn và hẹp', 'Tối và lạnh', 'Nhiều màu sắc'], 'A', 'medium', 2, 2),
  sc('Từ "ngạt ngào" dùng để miêu tả điều gì?', ['Hương thơm lan tỏa mạnh và dễ chịu', 'Âm thanh rất lớn', 'Màu sắc rất tối', 'Con đường quanh co'], 'A', 'medium', 2, 3),
  sc('Từ "cần mẫn" có nghĩa là gì?', ['Chăm chỉ và chịu khó', 'Chậm chạp và lười biếng', 'Vui vẻ và hài hước', 'Nhanh nhẹn và ồn ào'], 'A', 'medium', 2, 4),
  sc('Câu nào cho biết ruộng bậc thang trải rộng?', ['"Một màu vàng trải dài bất tận."', '"Khách du lịch có dịp ngắm nhìn."', '"Chúng được tạo nên bởi đôi bàn tay."', '"Sa Pa có nhiều dân tộc sinh sống."'], 'A', 'medium', 2, 5),
  sc('Câu nào miêu tả hình dáng của ruộng bậc thang?', ['"Chúng giống như những bậc thang khổng lồ."', '"Đâu đâu cũng ngạt ngào hương lúa."', '"Một màu vàng trải dài bất tận."', '"Khách du lịch có dịp ngắm nhìn."'], 'A', 'medium', 2, 6),
  sc('Vì sao ruộng bậc thang ở Sa Pa có giá trị đặc biệt?', ['Vì đã tồn tại hàng trăm năm và do người dân chăm chỉ tạo nên', 'Vì chỉ có một thửa ruộng nhỏ', 'Vì ruộng nằm giữa thành phố', 'Vì ruộng không cần người chăm sóc'], 'A', 'medium', 2, 7),
  sc('Chọn từ thích hợp để hoàn thành câu: Hương lúa chín (…) khắp các thửa ruộng.', ['khổng lồ', 'ngạt ngào', 'cao vút', 'chênh chếch'], 'B', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Những người nông dân (…) làm việc trên đồng ruộng.', ['cần mẫn', 'bất tận', 'khổng lồ', 'rực rỡ'], 'A', 'medium', 2, 9),
  sc('Dãy nào lần lượt điền đúng vần ich hoặc it? tờ l… – yêu th… – tối m…', ['tờ lịch – yêu thích – tối mịt', 'tờ lịt – yêu thít – tối mịch', 'tờ lịch – yêu thít – tối mịt', 'tờ lịt – yêu thích – tối mịch'], 'A', 'medium', 2, 10, 'Viết đúng: "tờ lịch – yêu thích – tối mịt".'),
  sc('Thứ tự nào phù hợp với nội dung bài đọc?', ['Giới thiệu vẻ đẹp mùa lúa chín → miêu tả ruộng bậc thang → nói về lịch sử và người tạo nên ruộng', 'Giới thiệu người dân → kể chuyện đi học → miêu tả thành phố', 'Miêu tả mùa đông → nói về đường cao tốc → giới thiệu khách sạn', 'Kể về mùa gặt → nói về biển → giới thiệu nghề đánh cá'], 'A', 'hard', 3, 1),
  sc('Vì sao ruộng bậc thang được so sánh với những bậc thang khổng lồ?', ['Vì các thửa ruộng xếp thành nhiều tầng nối tiếp nhau trên sườn núi', 'Vì trên ruộng có những chiếc cầu thang thật', 'Vì ruộng được xây bằng gạch', 'Vì ruộng nằm trong tòa nhà cao tầng'], 'A', 'hard', 3, 2),
  sc('Hình ảnh "nối mặt đất với bầu trời" giúp em cảm nhận ruộng bậc thang như thế nào?', ['Cao, rộng và trải dài theo sườn núi', 'Nhỏ và nằm dưới lòng đất', 'Tối tăm và chật hẹp', 'Bằng phẳng như sân trường'], 'A', 'hard', 3, 3),
  sc('Chi tiết nào cho thấy mùa lúa chín ở Sa Pa hấp dẫn nhiều người?', ['Khách du lịch có dịp ngắm nhìn vẻ đẹp rực rỡ của ruộng bậc thang', 'Người dân xây nhiều nhà cao tầng', 'Có nhiều xe cộ trên đường', 'Trời thường có mưa lớn'], 'A', 'hard', 3, 4),
  sc('Qua bài đọc, em thấy người dân H’Mông, Dao, Hà Nhì có phẩm chất gì?', ['Chăm chỉ, cần mẫn và khéo léo', 'Lười biếng và thiếu kiên trì', 'Nhút nhát và sợ khó', 'Chỉ thích vui chơi'], 'A', 'hard', 3, 5),
  sc('Câu nào phù hợp nhất để miêu tả bức tranh?', ['Những thửa ruộng bậc thang vàng óng uốn quanh các sườn núi.', 'Nhiều tòa nhà cao tầng nằm giữa thành phố.', 'Những con tàu đang ra khơi đánh cá.', 'Các bạn nhỏ đang vui chơi trong sân trường.'], 'A', 'hard', 3, 6),
  sc('Dãy nào lần lượt điền đúng vần ach hoặc êch? c… xa – túi x… – chênh ch…', ['cách xa – túi xách – chênh chếch', 'cếch xa – túi xếch – chênh chách', 'cách xa – túi xếch – chênh chách', 'cếch xa – túi xách – chênh chếch'], 'A', 'hard', 3, 7, 'Viết đúng: "cách xa – túi xách – chênh chếch".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: mùa lúa chín / ruộng bậc thang / vàng rực / vào',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'mùa lúa chín' },
      { key: '2', text: 'ruộng bậc thang' },
      { key: '3', text: 'vàng rực' },
      { key: '4', text: 'vào' },
    ],
    correctAnswerJson: ['4', '1', '2', '3'], // Vào mùa lúa chín, ruộng bậc thang vàng rực
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Vào mùa lúa chín, ruộng bậc thang vàng rực".',
  },
  sc('Việc làm nào góp phần bảo vệ vẻ đẹp của ruộng bậc thang?', ['Không xả rác, không giẫm lên lúa và tôn trọng cuộc sống của người dân', 'Hái lúa của người dân mang về', 'Vứt rác xuống ruộng', 'Tự ý đi vào các thửa ruộng đang canh tác'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Giới thiệu vẻ đẹp, lịch sử và những người tạo nên ruộng bậc thang ở Sa Pa', 'Hướng dẫn cách đi du lịch Sa Pa', 'Kể về một ngày đi học của trẻ em vùng cao', 'Giới thiệu các món ăn của người H’Mông'], 'A', 'hard', 3, 10),
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
    console.log('SAPA XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
