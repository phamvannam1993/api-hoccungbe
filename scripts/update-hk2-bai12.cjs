require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ngôi nhà%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Đáp án của câu đố ở đầu bài là gì?', ['Cái ô', 'Áo mưa', 'Ngôi nhà', 'Cái võng'], 'C', 'easy', 1, 1),
  sc('Bài thơ có tên là gì?', ['Mái ấm', 'Ngôi nhà', 'Quê hương', 'Sân nhà'], 'B', 'easy', 1, 2),
  sc('Bạn nhỏ yêu điều gì?', ['Ngôi trường', 'Ngôi nhà', 'Công viên', 'Cánh đồng'], 'B', 'easy', 1, 3),
  sc('Trước ngõ nhà bạn nhỏ có hàng cây gì?', ['Hàng cau', 'Hàng dừa', 'Hàng xoan', 'Hàng tre'], 'C', 'easy', 1, 4),
  sc('Hoa xoan nở như thế nào?', ['Như mây từng chùm', 'Như nắng ban mai', 'Như những ngôi sao', 'Như hạt mưa rơi'], 'A', 'easy', 1, 5),
  sc('Bạn nhỏ yêu tiếng của con vật nào?', ['Tiếng gà', 'Tiếng chim', 'Tiếng mèo', 'Tiếng chó'], 'B', 'easy', 1, 6),
  sc('Tiếng chim hót ở đâu?', ['Ngoài cánh đồng', 'Trên sân phơi', 'Ở đầu hồi', 'Trong gian bếp'], 'C', 'easy', 1, 7),
  sc('Tiếng chim được miêu tả bằng từ nào?', ['Lảnh lót', 'Rì rào', 'Rộn ràng', 'Ầm ĩ'], 'A', 'easy', 1, 8),
  sc('Thứ gì được phơi đầy sân?', ['Quần áo', 'Hoa xoan', 'Rạ', 'Thóc'], 'C', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Tô Hà', 'Lâm Anh', 'Ngân Hà', 'Thạch Quỳ'], 'A', 'easy', 1, 10),
  sc('Ngôi nhà trong bài được làm từ những vật liệu nào?', ['Gỗ và tre', 'Gạch và kính', 'Sắt và thép', 'Đá và xi măng'], 'A', 'medium', 2, 1),
  sc('Từ "mộc mạc" có nghĩa là gì?', ['Giản dị, chân chất', 'Sang trọng, đắt tiền', 'Cũ kĩ, hư hỏng', 'Tối tăm, lạnh lẽo'], 'A', 'medium', 2, 2),
  sc('Từ "lảnh lót" dùng để miêu tả âm thanh như thế nào?', ['Trong trẻo, cao và vang', 'Trầm, nhỏ và đục', 'Rất ồn và chói tai', 'Ngắt quãng, khó nghe'], 'A', 'medium', 2, 3),
  sc('Cụm từ "đầu hồi" chỉ vị trí nào của ngôi nhà?', ['Phần tường ở hai đầu mái nhà', 'Khoảng sân phía trước', 'Cánh cửa chính', 'Gian bếp phía sau'], 'A', 'medium', 2, 4),
  sc('Hoa xoan trong bài được so sánh với gì?', ['Những đám mây', 'Những vì sao', 'Những bông tuyết', 'Những hạt mưa'], 'A', 'medium', 2, 5),
  sc('Câu thơ nào nói về mái nhà?', ['"Hàng xoan trước ngõ"', '"Đầu hồi lảnh lót"', '"Mái vàng thơm phức"', '"Bốn mùa chim ca"'], 'C', 'medium', 2, 6),
  sc('Tiếng nào cùng vần với tiếng "chùm"?', ['cụm', 'chim', 'chân', 'chén'], 'A', 'medium', 2, 7, '"chùm" và "cụm" cùng vần "um".'),
  sc('Tiếng nào cùng vần với tiếng "phơi"?', ['chơi', 'phải', 'phai', 'bay'], 'A', 'medium', 2, 8, '"phơi" và "chơi" cùng vần "ơi".'),
  sc('Tiếng nào cùng vần với tiếng "nước"?', ['bước', 'nhà', 'chim', 'tre'], 'A', 'medium', 2, 9, '"nước" và "bước" cùng vần "ươc".'),
  sc('Bạn nhỏ yêu ngôi nhà như yêu điều gì?', ['Đất nước', 'Trường học', 'Đồ chơi', 'Vườn hoa'], 'A', 'medium', 2, 10),
  sc('Dãy nào nêu đúng trình tự các hình ảnh trong bài thơ?', ['Hàng xoan và hoa → tiếng chim, mái nhà, sân phơi → ngôi nhà gỗ tre', 'Ngôi nhà gỗ tre → sân phơi → hàng xoan và hoa', 'Tiếng chim → đất nước → hàng xoan → mái nhà', 'Sân phơi → mái nhà → hàng xoan → cánh đồng'], 'A', 'hard', 3, 1),
  sc('Những chi tiết nào cho thấy ngôi nhà nằm ở một vùng quê yên bình?', ['Hàng xoan, tiếng chim, mái nhà và rạ phơi đầy sân', 'Xe cộ đông đúc và nhà cao tầng', 'Nhiều cửa hàng và biển quảng cáo', 'Tàu thuyền và bến cảng'], 'A', 'hard', 3, 2),
  sc('Câu thơ nào thể hiện ngôi nhà giản dị, gần gũi?', ['"Gỗ, tre mộc mạc"', '"Hoa xao xuyến nở"', '"Đầu hồi lảnh lót"', '"Bốn mùa chim ca"'], 'A', 'hard', 3, 3),
  sc('Vì sao tác giả nói hoa xoan nở "như mây từng chùm"?', ['Vì các chùm hoa xoan nở dày, mềm mại và đẹp như mây', 'Vì hoa xoan bay được trên trời', 'Vì hoa xoan có màu đen', 'Vì hoa xoan chỉ nở khi trời mưa'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Như yêu đất nước" thể hiện tình cảm gì?', ['Tình yêu sâu sắc đối với ngôi nhà và quê hương', 'Sự lo lắng khi phải xa nhà', 'Mong muốn xây một ngôi nhà mới', 'Sự buồn bã vì ngôi nhà nhỏ'], 'A', 'hard', 3, 5),
  sc('Cụm từ "Bốn mùa chim ca" cho thấy cảnh vật quanh nhà như thế nào?', ['Luôn vui tươi, thanh bình và đầy sức sống', 'Luôn vắng vẻ và im lặng', 'Chỉ đẹp vào mùa xuân', 'Thường xuyên có mưa bão'], 'A', 'hard', 3, 6),
  sc('Cụm từ "Em yêu" xuất hiện bao nhiêu lần trong bài thơ?', ['Một lần', 'Hai lần', 'Ba lần', 'Bốn lần'], 'C', 'hard', 3, 7, '"Em yêu nhà em", "Em yêu tiếng chim", "Em yêu ngôi nhà".'),
  sc('Nội dung chính của bài thơ là gì?', ['Tình yêu của bạn nhỏ dành cho ngôi nhà và quê hương', 'Cách xây dựng một ngôi nhà', 'Công việc phơi rạ ngoài sân', 'Đặc điểm của cây hoa xoan'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: bạn nhỏ / ngôi nhà / rất yêu / của mình',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'bạn nhỏ' },
      { key: '2', text: 'ngôi nhà' },
      { key: '3', text: 'rất yêu' },
      { key: '4', text: 'của mình' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Bạn nhỏ rất yêu ngôi nhà của mình
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Bạn nhỏ rất yêu ngôi nhà của mình".',
  },
  sc('Em nên làm gì để giữ gìn ngôi nhà luôn sạch đẹp?', ['Dọn dẹp, sắp xếp đồ dùng gọn gàng và giữ vệ sinh', 'Vứt rác bừa bãi trong nhà', 'Vẽ lên tường và làm hỏng đồ dùng', 'Để mọi việc cho người lớn làm'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B12 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
