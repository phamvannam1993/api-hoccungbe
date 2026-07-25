require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 8%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Đoạn thơ trong bài có tên là gì?', ['Việt Nam quê hương ta', 'Những cánh cò', 'Ruộng bậc thang ở Sa Pa', 'Du lịch biển Việt Nam'], 'A', 'easy', 1, 1),
  sc('Đoạn thơ nói về đất nước nào?', ['Lào', 'Việt Nam', 'Thái Lan', 'Nhật Bản'], 'B', 'easy', 1, 2),
  sc('Đoạn thơ do ai sáng tác?', ['Nguyễn Đình Thi', 'Lê Huy Hòa', 'Thái Dương', 'Nguyễn Lãm Thắng'], 'A', 'easy', 1, 3),
  sc('Trong đoạn thơ có hình ảnh biển gì?', ['Biển lúa', 'Biển cát', 'Biển hoa', 'Biển mây'], 'A', 'easy', 1, 4),
  sc('Con vật nào được nhắc đến trong đoạn thơ?', ['Chim én', 'Cánh cò', 'Chim công', 'Hải âu'], 'B', 'easy', 1, 5),
  sc('Cánh cò bay như thế nào?', ['Bay lả rập rờn', 'Bay rất thấp', 'Bay trong đêm tối', 'Bay vào trong rừng'], 'A', 'easy', 1, 6),
  sc('Mây mờ che đỉnh núi nào?', ['Ba Vì', 'Fansipan', 'Trường Sơn', 'Tam Đảo'], 'C', 'easy', 1, 7),
  sc('Mây che đỉnh Trường Sơn vào thời gian nào?', ['Chỉ buổi sáng', 'Chỉ buổi chiều', 'Sớm chiều', 'Chỉ ban đêm'], 'C', 'easy', 1, 8),
  sc('Tên riêng nào xuất hiện trong đoạn thơ?', ['quê hương', 'biển lúa', 'Việt Nam', 'cánh cò'], 'C', 'easy', 1, 9),
  sc('Tên riêng chỉ người trong đoạn thơ là gì?', ['Trường Sơn', 'Nguyễn Đình Thi', 'Việt Nam', 'quê hương'], 'B', 'easy', 1, 10),
  sc('Câu thơ nào thể hiện tình yêu và niềm tự hào về đất nước?', ['"Việt Nam đất nước ta ơi"', '"Cánh cò bay lả rập rờn"', '"Mây mờ che đỉnh Trường Sơn"', '"Sớm chiều"'], 'A', 'medium', 2, 1),
  sc('Từ "mênh mông" có nghĩa là gì?', ['Rộng lớn, trải dài', 'Nhỏ và hẹp', 'Cao và dốc', 'Tối và lạnh'], 'A', 'medium', 2, 2),
  sc('Hình ảnh "biển lúa" giúp em hình dung điều gì?', ['Cánh đồng lúa rất rộng lớn', 'Lúa mọc dưới biển', 'Biển có màu vàng', 'Người dân trồng lúa trên thuyền'], 'A', 'medium', 2, 3),
  sc('Từ "rập rờn" diễn tả cánh cò bay như thế nào?', ['Bay nhẹ nhàng, lúc lên lúc xuống', 'Bay rất nhanh rồi biến mất', 'Đứng yên trên mặt đất', 'Bay trong mưa bão'], 'A', 'medium', 2, 4),
  sc('Nhóm nào gồm toàn những tên riêng trong đoạn thơ?', ['Việt Nam, Trường Sơn, Nguyễn Đình Thi', 'biển lúa, cánh cò, mây mờ', 'quê hương, đất nước, sớm chiều', 'mênh mông, đẹp hơn, rập rờn'], 'A', 'medium', 2, 5),
  sc('Khi viết tên riêng, em cần nhớ điều gì?', ['Viết hoa chữ cái đầu mỗi tiếng tạo thành tên riêng', 'Viết tất cả bằng chữ thường', 'Không cần viết dấu thanh', 'Viết liền tất cả các tiếng'], 'A', 'medium', 2, 6),
  sc('Cách viết nào đúng?', ['việt nam', 'Việt nam', 'Việt Nam', 'việt Nam'], 'C', 'medium', 2, 7),
  sc('Cách viết nào đúng?', ['trường sơn', 'Trường Sơn', 'Trường sơn', 'trường Sơn'], 'B', 'medium', 2, 8),
  sc('Câu nào được viết đúng chính tả?', ['nam và hà là học sinh lớp 1.', 'Nam và hà là học sinh lớp 1.', 'Nam và Hà là học sinh lớp 1.', 'nam và Hà là học sinh lớp 1.'], 'C', 'medium', 2, 9),
  sc('Câu nào được viết đúng chính tả?', ['những người lính cứu hoả rất dũng cảm.', 'Những người lính cứu hoả rất dũng cảm.', 'Những Người Lính Cứu Hoả Rất Dũng Cảm.', 'những Người lính cứu hoả rất dũng cảm.'], 'B', 'medium', 2, 10),
  sc('Đoạn thơ miêu tả những cảnh vật nào của Việt Nam?', ['Biển lúa, cánh cò, mây và núi Trường Sơn', 'Nhà máy, đường cao tốc và xe cộ', 'Trường học, lớp học và sân chơi', 'Bãi biển, đồi cát và lâu đài cát'], 'A', 'hard', 3, 1),
  sc('Qua đoạn thơ, cảnh vật Việt Nam hiện lên như thế nào?', ['Rộng lớn, thanh bình và tươi đẹp', 'Tối tăm và đáng sợ', 'Chật hẹp và ồn ào', 'Khô cằn và vắng vẻ'], 'A', 'hard', 3, 2),
  sc('Vì sao tác giả gọi cánh đồng lúa là "biển lúa"?', ['Vì cánh đồng lúa rộng lớn, trải dài như biển', 'Vì lúa được trồng dưới nước biển', 'Vì trên ruộng có nhiều tàu thuyền', 'Vì lúa có vị mặn'], 'A', 'hard', 3, 3),
  sc('Câu nào phù hợp nhất để nói về bức tranh?', ['Cánh cò bay trên cánh đồng lúa xanh, phía xa là núi Trường Sơn.', 'Các bạn nhỏ đang chơi trong sân trường.', 'Nhiều xe cộ đang đi trên đường phố.', 'Những người lính cứu hoả đang dập lửa.'], 'A', 'hard', 3, 4),
  sc('Từ nào dưới đây không phải là tên riêng?', ['Việt Nam', 'Trường Sơn', 'Nguyễn Đình Thi', 'quê hương'], 'D', 'hard', 3, 5),
  sc('Cách viết nào đúng tên của một người?', ['nguyễn đình thi', 'Nguyễn đình thi', 'Nguyễn Đình Thi', 'nguyễn Đình Thi'], 'C', 'hard', 3, 6),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: quê hương / Việt Nam / em / là',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'quê hương' },
      { key: '2', text: 'Việt Nam' },
      { key: '3', text: 'em' },
      { key: '4', text: 'là' },
    ],
    correctAnswerJson: ['2', '4', '1', '3'], // Việt Nam là quê hương em
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 7,
    explanation: 'Câu đúng: "Việt Nam là quê hương em".',
  },
  sc('Câu nào phù hợp để giới thiệu nơi em đang sống?', ['Em sống ở Hà Nội. Nơi đây có nhiều cây xanh và đường phố đẹp.', 'Hà Nội em sống nơi đẹp nhiều.', 'Nơi sống em là rất.', 'Em ở đâu không biết.'], 'A', 'hard', 3, 8),
  sc('Việc làm nào thể hiện tình yêu quê hương?', ['Giữ gìn vệ sinh, bảo vệ cảnh đẹp và chăm sóc cây xanh', 'Vứt rác xuống sông', 'Vẽ bậy lên di tích', 'Bẻ cành cây nơi công cộng'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của phần ôn tập là gì?', ['Luyện đọc thơ về Việt Nam, nhận biết tên riêng và tập nói, viết về quê hương', 'Hướng dẫn cách đi du lịch biển', 'Giới thiệu công việc của lính cứu hoả', 'Kể lại câu chuyện về Lương Thế Vinh'], 'A', 'hard', 3, 10),
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
    console.log('ONTAP8 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
