require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Giờ ra chơi%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Sân trường', 'Giờ ra chơi', 'Tiếng trống trường', 'Trò chơi của bé'], 'B', 'easy', 1, 1),
  sc('Âm thanh nào báo hiệu giờ ra chơi?', ['Tiếng chuông cửa', 'Tiếng trống', 'Tiếng chim hót', 'Tiếng cô giáo'], 'B', 'easy', 1, 2),
  sc('Các bạn học sinh được gọi bằng hình ảnh nào?', ['Từng đàn bướm vàng', 'Từng đàn chim áo trắng', 'Những chú thỏ con', 'Những bông hoa nhỏ'], 'B', 'easy', 1, 3),
  sc('Trước khi ra sân, các bạn làm gì?', ['Xếp sách vở', 'Mở sách đọc bài', 'Lau bảng', 'Đóng cửa lớp'], 'A', 'easy', 1, 4),
  sc('Các bạn ùa ra đâu?', ['Ngoài sân nắng', 'Ngoài cổng trường', 'Phòng thư viện', 'Phòng ăn'], 'A', 'easy', 1, 5),
  sc('Các bạn gái chơi trò gì?', ['Đá bóng', 'Nhảy dây', 'Đá cầu', 'Trốn tìm'], 'B', 'easy', 1, 6),
  sc('Các bạn trai chơi trò gì?', ['Nhảy dây', 'Đá cầu', 'Đọc sách', 'Tô màu'], 'B', 'easy', 1, 7),
  sc('Vòng dây quay như thế nào?', ['Rất chậm và nặng nề', 'Đều và êm ái', 'Nhanh rồi dừng lại', 'Không chuyển động'], 'B', 'easy', 1, 8),
  sc('Quả cầu bay như thế nào?', ['Vun vút', 'Chậm chạp', 'Nhẹ nhàng rơi xuống', 'Đứng yên'], 'A', 'easy', 1, 9),
  sc('Khi giờ chơi chấm dứt, các bạn đi đâu?', ['Đi về nhà', 'Vào lớp', 'Ra cổng trường', 'Đến thư viện'], 'B', 'easy', 1, 10),
  sc('Từ "ùa ra" cho biết các bạn ra sân như thế nào?', ['Cùng chạy ra rất nhanh và đông vui', 'Đi từng người thật chậm', 'Đứng im trong lớp', 'Lặng lẽ đi về nhà'], 'A', 'medium', 2, 1),
  sc('Từ "nhịp nhàng" miêu tả hoạt động như thế nào?', ['Đều đặn và phối hợp ăn ý', 'Lộn xộn, không đều', 'Chậm chạp, mệt mỏi', 'Bất ngờ dừng lại'], 'A', 'medium', 2, 2),
  sc('Từ "vun vút" miêu tả chuyển động như thế nào?', ['Rất nhanh', 'Rất chậm', 'Không chuyển động', 'Lúc nhanh, lúc chậm'], 'A', 'medium', 2, 3),
  sc('Cụm từ "đôi chân móc rất tài" cho biết các bạn trai đá cầu như thế nào?', ['Khéo léo', 'Vụng về', 'Chậm chạp', 'Sợ hãi'], 'A', 'medium', 2, 4),
  sc('Câu thơ nào cho thấy sân trường rất vui?', ['"Xếp sách vở mau thôi"', '"Rộn tiếng cười hòa vang"', '"Xếp hàng nhanh vào lớp"', '"Bài học mới sang trang"'], 'B', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau?', ['chơi – thôi', 'trắng – trai', 'dây – vang', 'lớp – trang'], 'A', 'medium', 2, 6, '"chơi" và "thôi" cùng vần "ơi".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['trắng – nắng', 'chơi – gái', 'trai – vút', 'thôi – lớp'], 'A', 'medium', 2, 7, '"trắng" và "nắng" cùng vần "ăng".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['gái – ái', 'dây – tài', 'vang – trai', 'chơi – nắng'], 'A', 'medium', 2, 8, '"gái" và "ái" cùng vần "ai".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['nhàng – vang', 'vút – tài', 'trai – lớp', 'gái – nắng'], 'A', 'medium', 2, 9, '"nhàng" và "vang" cùng vần "ang".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['vàng – trang', 'lớp – dứt', 'chơi – trắng', 'tài – ngực'], 'A', 'medium', 2, 10, '"vàng" và "trang" cùng vần "ang".'),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Trống báo ra chơi → các bạn ra sân → chơi nhảy dây, đá cầu → xếp hàng vào lớp', 'Các bạn vào lớp → trống báo ra chơi → các bạn về nhà', 'Các bạn đá cầu → học bài → trống mới báo ra chơi', 'Các bạn xếp hàng → về nhà → ra sân chơi'], 'A', 'hard', 3, 1),
  sc('Vì sao tác giả gọi học sinh là "từng đàn chim áo trắng"?', ['Vì các bạn mặc áo trắng, cùng vui vẻ ùa ra sân như đàn chim', 'Vì các bạn đều biết bay', 'Vì sân trường nuôi nhiều chim', 'Vì các bạn đang mặc trang phục biểu diễn'], 'A', 'hard', 3, 2),
  sc('Những từ ngữ nào cho thấy các bạn gái nhảy dây rất giỏi?', ['"Nhịp nhàng", "vòng quay đều êm ái"', '"Xếp sách vở", "ngoài sân nắng"', '"Vội vàng", "xếp hàng nhanh"', '"Đàn chim non", "bài học mới"'], 'A', 'hard', 3, 3),
  sc('Những từ ngữ nào cho thấy các bạn trai đá cầu rất giỏi?', ['"Bay vun vút", "đôi chân móc rất tài"', '"Vòng quay đều", "tiếng cười hòa vang"', '"Xếp hàng nhanh", "sang trang"', '"Mau thôi", "sân nắng"'], 'A', 'hard', 3, 4),
  sc('Vì sao các bạn phải nhanh chóng xếp hàng vào lớp?', ['Vì giờ chơi đã chấm dứt và giờ học mới bắt đầu', 'Vì ngoài sân sắp có mưa', 'Vì các bạn không thích chơi nữa', 'Vì các bạn muốn về nhà'], 'A', 'hard', 3, 5),
  sc('Câu thơ "Bài học mới sang trang" cho biết điều gì?', ['Các bạn tiếp tục một tiết học mới', 'Các bạn xé một trang sách', 'Các bạn đổi sách cho nhau', 'Các bạn kết thúc ngày học'], 'A', 'hard', 3, 6),
  sc('Không khí giờ ra chơi được miêu tả như thế nào?', ['Vui vẻ, nhộn nhịp và đầy tiếng cười', 'Yên tĩnh, vắng vẻ', 'Căng thẳng và buồn bã', 'Lộn xộn và đáng sợ'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: các bạn / vui vẻ / ngoài sân / chơi đùa',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'các bạn' },
      { key: '2', text: 'vui vẻ' },
      { key: '3', text: 'ngoài sân' },
      { key: '4', text: 'chơi đùa' },
    ],
    correctAnswerJson: ['1', '2', '4', '3'], // Các bạn vui vẻ chơi đùa ngoài sân
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Các bạn vui vẻ chơi đùa ngoài sân".',
  },
  sc('Khi nghe tiếng trống báo hết giờ chơi, em nên làm gì?', ['Dừng trò chơi, xếp hàng và nhanh chóng vào lớp', 'Tiếp tục chơi ngoài sân', 'Chạy ra khỏi cổng trường', 'Trốn sau cây để không vào lớp'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài thơ là gì?', ['Học sinh cần vui chơi đoàn kết, an toàn và thực hiện đúng nề nếp của trường', 'Giờ ra chơi có thể chơi bao lâu tùy thích', 'Chỉ các bạn giỏi thể thao mới được ra sân', 'Khi hết giờ chơi, học sinh không cần vào lớp'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B19 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
