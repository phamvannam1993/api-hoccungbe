require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Nếu không may bị lạc%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Một ngày ở công viên', 'Nếu không may bị lạc', 'Nam đi chơi', 'Tìm đường về nhà'], 'B', 'easy', 1, 1),
  sc('Bố đưa Nam và em đi chơi vào ngày nào?', ['Sáng thứ hai', 'Sáng thứ bảy', 'Sáng chủ nhật', 'Chiều chủ nhật'], 'C', 'easy', 1, 2),
  sc('Ai đưa Nam và em đi chơi?', ['Mẹ', 'Bố', 'Ông', 'Cô giáo'], 'B', 'easy', 1, 3),
  sc('Bố cho Nam và em đi chơi ở đâu?', ['Sở thú', 'Bờ biển', 'Công viên', 'Siêu thị'], 'C', 'easy', 1, 4),
  sc('Công viên hôm đó như thế nào?', ['Rất vắng vẻ', 'Đông như hội', 'Đang đóng cửa', 'Không có trò chơi'], 'B', 'easy', 1, 5),
  sc('Trên cổng công viên có gì rất to?', ['Một bông hoa', 'Một chiếc đồng hồ', 'Một lá cờ', 'Một quả bóng'], 'C', 'easy', 1, 6),
  sc('Vì sao Nam bị lạc?', ['Vì Nam ngủ quên', 'Vì Nam mải mê xem hết chỗ này đến chỗ khác', 'Vì Nam tự ý đi về nhà', 'Vì bố bảo Nam đi tìm em'], 'B', 'easy', 1, 7),
  sc('Khi không thấy bố và em, Nam cảm thấy thế nào?', ['Vui vẻ', 'Bình thản', 'Hoảng hốt, suýt khóc', 'Tức giận'], 'C', 'easy', 1, 8),
  sc('Nam nhìn thấy tấm biển nào?', ['"Khu vui chơi"', '"Lối ra cổng"', '"Quầy bán vé"', '"Nhà hàng"'], 'B', 'easy', 1, 9),
  sc('Nam gặp lại bố và em ở đâu?', ['Bên vòng quay', 'Trong quầy bán vé', 'Ở cổng có lá cờ lớn', 'Dưới một gốc cây'], 'C', 'easy', 1, 10),
  sc('Cụm từ "đông như hội" miêu tả nơi đó như thế nào?', ['Có rất nhiều người, không khí nhộn nhịp', 'Vắng người và yên tĩnh', 'Chỉ có trẻ em', 'Không có hoạt động gì'], 'A', 'medium', 2, 1),
  sc('Từ "mải mê" có nghĩa là gì?', ['Quá chăm chú vào một việc nên quên để ý xung quanh', 'Làm việc rất chậm', 'Không muốn xem gì', 'Cảm thấy sợ hãi'], 'A', 'medium', 2, 2),
  sc('Từ "ngoảnh lại" có nghĩa là gì?', ['Quay đầu nhìn lại phía sau', 'Cúi xuống nhìn đất', 'Nhắm mắt lại', 'Chạy thật nhanh về trước'], 'A', 'medium', 2, 3),
  sc('Từ "suýt" trong câu "Nam suýt khóc" có nghĩa là gì?', ['Đã khóc rất lâu', 'Gần xảy ra nhưng chưa xảy ra', 'Không thể khóc', 'Cố tình giả vờ khóc'], 'B', 'medium', 2, 4),
  sc('Tiếng nào dưới đây chứa vần oanh?', ['ngoảnh', 'cổng', 'mải', 'suýt'], 'A', 'medium', 2, 5, '"ngoảnh" có vần "oanh".'),
  sc('Chọn từ thích hợp để hoàn thành câu: Uyên không (…) khi bị lạc.', ['người lạ', 'hoảng hốt', 'mải mê', 'vui vẻ'], 'B', 'medium', 2, 6),
  sc('Hoàn thành câu theo nội dung bài: Bố cho Nam và em (…).', ['đi chơi ở công viên', 'đi học ở trường', 'đi chợ mua rau', 'đi thăm ông bà'], 'A', 'medium', 2, 7),
  sc('Khi vào cổng, bố dặn Nam và em điều gì?', ['Nếu bị lạc, nhớ ra cổng có lá cờ lớn', 'Có thể tự ý đi bất cứ đâu', 'Không cần để ý đến bố', 'Hãy rời khỏi công viên một mình'], 'A', 'medium', 2, 8),
  sc('Tiếng nào dưới đây chứa vần im?', ['tìm', 'điểm', 'đẹp', 'xếp'], 'A', 'medium', 2, 9, '"tìm" có vần "im".'),
  sc('Tiếng nào dưới đây chứa vần iêm?', ['tìm', 'điểm', 'đẹp', 'xếp'], 'B', 'medium', 2, 10, '"điểm" có vần "iêm".'),
  sc('Thứ tự nào đúng với diễn biến bài đọc?', ['Bố dặn dò → Nam mải mê xem → Nam bị lạc → Nam theo biển chỉ dẫn → gặp lại bố và em', 'Nam bị lạc → bố mới đưa Nam đến công viên → Nam ra về', 'Nam gặp bố → đi theo biển chỉ dẫn → bắt đầu vào công viên', 'Nam về nhà → bố đưa Nam đi chơi → Nam nhìn thấy lá cờ'], 'A', 'hard', 3, 1),
  sc('Vì sao bố chọn cổng có lá cờ lớn làm điểm hẹn?', ['Vì đó là vị trí dễ nhận biết và dễ tìm', 'Vì ở đó có nhiều đồ chơi', 'Vì bố muốn mua lá cờ', 'Vì cổng không có người qua lại'], 'A', 'hard', 3, 2),
  sc('Điều gì giúp Nam tìm lại được bố và em?', ['Nam nhớ lời bố dặn và đi theo tấm biển chỉ đường', 'Nam đi theo một người lạ', 'Nam chạy khỏi công viên', 'Nam trốn dưới gốc cây'], 'A', 'hard', 3, 3),
  sc('Khi phát hiện mình bị lạc, em nên làm gì trước tiên?', ['Giữ bình tĩnh và nhớ lại điểm hẹn hoặc lời dặn của người thân', 'Chạy lung tung để tìm người thân', 'Đi theo bất cứ người lạ nào', 'Tự ý rời khỏi khu vực'], 'A', 'hard', 3, 4),
  sc('Nếu không tìm thấy điểm hẹn, em nên nhờ ai giúp đỡ?', ['Nhân viên bảo vệ, công an hoặc người làm việc tại địa điểm đó', 'Một người lạ rủ lên xe', 'Bất cứ người nào đi ngang qua', 'Một bạn nhỏ không quen biết'], 'A', 'hard', 3, 5),
  sc('Tiếng nào dưới đây chứa vần ep?', ['đẹp', 'điểm', 'tìm', 'xếp'], 'A', 'hard', 3, 6, '"đẹp" có vần "ep".'),
  sc('Tiếng nào dưới đây chứa vần êp?', ['đẹp', 'xếp', 'điểm', 'tìm'], 'B', 'hard', 3, 7, '"xếp" có vần "êp".'),
  sc('Nhóm nào gồm các từ đều cần điền gi vào chỗ trống?', ['…ảng bài – …ày dép – canh …ữ', '…ẻo dai – …au cải – …ữ tợn', '…au cải – …ẻo dai – …ọt nước', '…ữ tợn – …ẻo dai – …au cải'], 'A', 'hard', 3, 8, 'Viết đúng: "giảng bài – giày dép – canh giữ".'),
  sc('Điền d, r, gi theo thứ tự để tạo thành các từ đúng: …ẻo dai – …au cải – …ọt nước', ['d – r – gi', 'r – d – gi', 'gi – r – d', 'd – gi – r'], 'A', 'hard', 3, 9, 'Viết đúng: "dẻo dai – rau cải – giọt nước".'),
  sc('Bài học quan trọng nhất từ câu chuyện là gì?', ['Khi đến nơi đông người, cần đi gần người thân, nhớ điểm hẹn và bình tĩnh tìm người đáng tin cậy nếu bị lạc', 'Có thể tự ý đi chơi một mình', 'Khi bị lạc, nên chạy theo người lạ', 'Không cần nghe lời dặn của bố mẹ'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B24 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
