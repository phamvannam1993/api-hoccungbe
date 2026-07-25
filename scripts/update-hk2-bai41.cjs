require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ngày mới bắt đầu%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Buổi sáng của bé', 'Ngày mới bắt đầu', 'Tia nắng buổi sớm', 'Mặt trời thức dậy'], 'B', 'easy', 1, 1),
  sc('Buổi sáng tinh mơ, vật gì nhô lên đỏ rực?', ['Mặt trăng', 'Mặt trời', 'Đám mây', 'Cầu vồng'], 'B', 'easy', 1, 2),
  sc('Những tia nắng tỏa đi đâu?', ['Chỉ trong ngôi nhà', 'Chỉ ngoài sân', 'Khắp nơi', 'Chỉ trên ngọn cây'], 'C', 'easy', 1, 3),
  sc('Những tia nắng làm gì?', ['Đánh thức mọi vật', 'Làm mọi vật ngủ tiếp', 'Gọi mưa đến', 'Làm trời tối đi'], 'A', 'easy', 1, 4),
  sc('Khi nắng chiếu vào tổ chim, chim làm gì?', ['Nằm ngủ trong tổ', 'Bay ra khỏi tổ và cất tiếng hót', 'Đi kiếm mật', 'Chạy quanh sân'], 'B', 'easy', 1, 5),
  sc('Khi nắng chiếu vào tổ ong, ong bay đi đâu?', ['Đi kiếm mật', 'Đi tìm thóc', 'Đi đến trường', 'Đi tìm tổ chim'], 'A', 'easy', 1, 6),
  sc('Nắng chiếu vào nơi ở nào của đàn gà?', ['Tổ ong', 'Tổ chim', 'Chuồng gà', 'Ngôi nhà'], 'C', 'easy', 1, 7),
  sc('Đàn gà ra khỏi chuồng để làm gì?', ['Đi kiếm mồi', 'Đi học', 'Đi tắm', 'Đi ngủ'], 'A', 'easy', 1, 8),
  sc('Nắng chiếu vào nhà để gọi ai thức dậy?', ['Mẹ', 'Bố', 'Bé', 'Cô giáo'], 'C', 'easy', 1, 9),
  sc('Sau khi thức dậy, bé chuẩn bị làm gì?', ['Đi ngủ tiếp', 'Đến trường', 'Đi chợ', 'Đi chơi công viên'], 'B', 'easy', 1, 10),
  sc('Từ "tinh mơ" chỉ thời điểm nào?', ['Lúc sáng sớm, trời vừa bắt đầu sáng', 'Lúc giữa trưa', 'Lúc chiều tối', 'Lúc nửa đêm'], 'A', 'medium', 2, 1),
  sc('Từ "lục tục" miêu tả đàn gà ra khỏi chuồng như thế nào?', ['Lần lượt nối tiếp nhau đi ra', 'Bay ra thật nhanh', 'Đứng yên trong chuồng', 'Cùng chạy ra một lúc'], 'A', 'medium', 2, 2),
  sc('Câu nào cho biết buổi sáng đã đến?', ['"Mặt trời nhô lên đỏ rực."', '"Bé đang nằm ngủ."', '"Đàn gà ở trong chuồng."', '"Chim ở trong tổ."'], 'A', 'medium', 2, 3),
  sc('Câu nào nói đúng hoạt động của chim?', ['Chim bay ra khỏi tổ, cất tiếng hót.', 'Chim đi kiếm mật.', 'Chim lục tục ra khỏi chuồng.', 'Chim chuẩn bị đến trường.'], 'A', 'medium', 2, 4),
  sc('Câu nào nói đúng hoạt động của ong?', ['Ong cất tiếng hót.', 'Ong đi kiếm mật.', 'Ong đi kiếm mồi dưới đất.', 'Ong chuẩn bị đến trường.'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Những (…) buổi sáng mở đầu một ngày mới.', ['mặt trời', 'tia nắng', 'đàn gà', 'tổ ong'], 'B', 'medium', 2, 6),
  sc('Chọn từ thích hợp để hoàn thành câu: Mấy chú chim chích chòe đang (…) vang trên cành cây.', ['gáy', 'hót', 'lục tục', 'ngủ'], 'B', 'medium', 2, 7),
  sc('Tiếng nào dưới đây chứa vần iêu?', ['chiều', 'dịu', 'chuồng', 'buồn'], 'A', 'medium', 2, 8, '"chiều" có vần "iêu".'),
  sc('Tiếng nào dưới đây chứa vần uông?', ['diều', 'dịu', 'chuồng', 'muốn'], 'C', 'medium', 2, 9, '"chuồng" có vần "uông".'),
  sc('Dãy nào lần lượt chứa các vần iêu – iu – uông – uôn?', ['chiều – dịu – chuồng – buồn', 'dịu – chiều – buồn – chuồng', 'chuồng – buồn – chiều – dịu', 'buồn – chuồng – dịu – chiều'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Mặt trời lên → chim bay khỏi tổ → ong đi kiếm mật → gà đi kiếm mồi → bé chuẩn bị đến trường', 'Bé đến trường → mặt trời lên → chim đi ngủ → ong về tổ', 'Gà đi kiếm mồi → trời tối → bé thức dậy → mặt trời lặn', 'Ong đi kiếm mật → bé đi ngủ → chim bay về tổ'], 'A', 'hard', 3, 1),
  sc('Vì sao bài đọc nói những tia nắng "đánh thức mọi vật"?', ['Vì khi trời sáng, chim, ong, gà và bé đều bắt đầu hoạt động', 'Vì tia nắng phát ra tiếng gọi rất lớn', 'Vì mọi vật đều sợ ánh nắng', 'Vì ánh nắng làm trời tối đi'], 'A', 'hard', 3, 2),
  sc('Điểm giống nhau giữa chim, ong và đàn gà là gì?', ['Đều rời nơi ở để bắt đầu hoạt động trong ngày', 'Đều đi kiếm mật', 'Đều cất tiếng hót', 'Đều chuẩn bị đến trường'], 'A', 'hard', 3, 3),
  sc('Ong đi kiếm mật còn đàn gà đi kiếm gì?', ['Kiếm hoa', 'Kiếm mồi', 'Kiếm tổ', 'Kiếm nước'], 'B', 'hard', 3, 4),
  sc('Hình ảnh mặt trời nhô lên và tia nắng tỏa khắp nơi gợi lên cảnh buổi sáng như thế nào?', ['Tươi sáng, ấm áp và đầy sức sống', 'Tối tăm, lạnh lẽo', 'Buồn bã, vắng vẻ', 'Đáng sợ, nguy hiểm'], 'A', 'hard', 3, 5),
  sc('Chi tiết nào cho thấy bé có ý thức thực hiện công việc hằng ngày?', ['Bé thức dậy và chuẩn bị đến trường', 'Bé nằm ngủ cả ngày', 'Bé chạy theo đàn gà', 'Bé đi tìm mật cùng ong'], 'A', 'hard', 3, 6),
  sc('Câu nào sử dụng từ "lục tục" phù hợp nhất?', ['Các bạn lục tục bước vào lớp.', 'Mặt trời lục tục đỏ rực.', 'Chim lục tục cất tiếng hót vang.', 'Tia nắng lục tục chiếu sáng.'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: buổi sáng / mọi vật / tia nắng / đánh thức',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'buổi sáng' },
      { key: '2', text: 'mọi vật' },
      { key: '3', text: 'tia nắng' },
      { key: '4', text: 'đánh thức' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Buổi sáng, tia nắng đánh thức mọi vật
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Buổi sáng, tia nắng đánh thức mọi vật".',
  },
  sc('Buổi sáng, em nên làm gì để bắt đầu ngày mới?', ['Thức dậy đúng giờ, vệ sinh cá nhân, ăn sáng và chuẩn bị đi học', 'Nằm ngủ đến trưa', 'Không ăn sáng và đi chơi', 'Để bố mẹ chuẩn bị mọi việc còn mình ngủ tiếp'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đọc là gì?', ['Ánh nắng buổi sáng đánh thức mọi vật và mở đầu một ngày mới', 'Kể về cách chim xây tổ', 'Giới thiệu cách ong làm mật', 'Hướng dẫn cách chăm sóc đàn gà'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B41 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
