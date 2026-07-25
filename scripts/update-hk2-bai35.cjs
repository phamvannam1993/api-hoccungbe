require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Chúa tể rừng xanh%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Đáp án của câu đố ở đầu bài là con gì?', ['Con báo', 'Con hổ', 'Con voi', 'Con gấu'], 'B', 'easy', 1, 1),
  sc('Bài đọc có tên là gì?', ['Khu rừng xanh', 'Chúa tể rừng xanh', 'Những con vật trong rừng', 'Hổ đi tìm mồi'], 'B', 'easy', 1, 2),
  sc('Hổ là loài thú ăn gì?', ['Ăn cỏ', 'Ăn quả', 'Ăn thịt', 'Ăn hạt'], 'C', 'easy', 1, 3),
  sc('Hổ sống ở đâu?', ['Trong rừng', 'Dưới biển', 'Trên đồng ruộng', 'Trong ao hồ'], 'A', 'easy', 1, 4),
  sc('Lông hổ thường có màu gì?', ['Màu trắng pha chấm đỏ', 'Màu vàng pha những vằn đen', 'Màu xanh pha vằn trắng', 'Màu nâu không có vằn'], 'B', 'easy', 1, 5),
  sc('Răng hổ có đặc điểm gì?', ['Nhỏ và bằng', 'Sắc nhọn', 'Tròn và ngắn', 'Không có răng'], 'B', 'easy', 1, 6),
  sc('Mắt hổ có khả năng gì?', ['Nhìn rõ mọi vật trong đêm tối', 'Chỉ nhìn được ban ngày', 'Không nhìn được từ xa', 'Chỉ nhìn được dưới nước'], 'A', 'easy', 1, 7),
  sc('Bốn chân của hổ như thế nào?', ['Nhỏ và yếu', 'Chắc khỏe', 'Ngắn và mềm', 'Mảnh mai'], 'B', 'easy', 1, 8),
  sc('Chân hổ có gì sắc?', ['Móng tay', 'Vuốt', 'Vảy', 'Màng bơi'], 'B', 'easy', 1, 9),
  sc('Hổ được xem là gì của rừng xanh?', ['Người bạn của rừng', 'Chúa tể rừng xanh', 'Người trồng rừng', 'Loài vật nhỏ nhất'], 'B', 'easy', 1, 10),
  sc('Từ "chúa tể" có nghĩa là gì?', ['Kẻ đứng đầu, có sức mạnh và quyền uy', 'Một con vật nhỏ bé', 'Người chăm sóc cây cối', 'Một người đi săn'], 'A', 'medium', 2, 1),
  sc('Từ "vuốt" trong bài chỉ bộ phận nào?', ['Những móng nhọn ở chân hổ', 'Những chiếc răng của hổ', 'Phần lông ở đuôi', 'Đôi tai của hổ'], 'A', 'medium', 2, 2),
  sc('Đuôi hổ được miêu tả như thế nào?', ['Ngắn và mềm', 'Dài và cứng như roi sắt', 'Tròn như quả bóng', 'Xòe rộng như chiếc quạt'], 'B', 'medium', 2, 3),
  sc('Hổ di chuyển như thế nào?', ['Rất chậm', 'Nhanh', 'Chỉ bò sát mặt đất', 'Không thể chạy'], 'B', 'medium', 2, 4),
  sc('Hổ có thể nhảy như thế nào?', ['Nhảy xa', 'Chỉ nhảy tại chỗ', 'Không thể nhảy', 'Nhảy xuống nước rất sâu'], 'A', 'medium', 2, 5),
  sc('Hổ làm việc gì rất giỏi?', ['Xây tổ', 'Săn mồi', 'Hái quả', 'Đào ao'], 'B', 'medium', 2, 6),
  sc('Câu nào hoàn thành đúng nội dung bài: Hổ ăn (…) và sống (…).', ['cỏ – ngoài đồng', 'thịt – trong rừng', 'cá – dưới biển', 'hạt – trên cây'], 'B', 'medium', 2, 7),
  sc('Câu nào hoàn thành đúng nội dung bài: Đuôi hổ (…).', ['dài và cứng như roi sắt', 'ngắn và mềm như bông', 'tròn như quả bóng', 'xòe như chiếc quạt'], 'A', 'medium', 2, 8),
  sc('Nhóm nào gồm toàn những đặc điểm của hổ?', ['Răng sắc, chân khỏe, vuốt sắc', 'Mỏ nhọn, cánh rộng, chân có màng', 'Tai dài, đuôi ngắn, ăn cỏ', 'Mai cứng, chân ngắn, bò chậm'], 'A', 'medium', 2, 9),
  sc('Vì sao hầu hết các con vật trong rừng đều sợ hổ?', ['Vì hổ rất khỏe và hung dữ', 'Vì hổ có bộ lông đẹp', 'Vì hổ ngủ rất nhiều', 'Vì hổ sống trên cây'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào phù hợp với nội dung bài đọc?', ['Nơi sống và thức ăn → đặc điểm cơ thể → khả năng của hổ → vì sao hổ là chúa tể', 'Hổ đi kiếm bạn → hổ trồng cây → hổ trở về nhà', 'Hổ sống dưới biển → hổ học bay → hổ lên núi', 'Hổ ăn cỏ → hổ xây tổ → hổ ngủ đông'], 'A', 'hard', 3, 1),
  sc('Những đặc điểm nào giúp hổ săn mồi giỏi?', ['Mắt nhìn rõ, chân khỏe, vuốt sắc và di chuyển nhanh', 'Tai dài, chân có màng và biết bay', 'Mai cứng, mỏ nhọn và bò chậm', 'Lông trắng, đuôi ngắn và ăn cỏ'], 'A', 'hard', 3, 2),
  sc('Vì sao khả năng nhìn rõ trong đêm có ích cho hổ?', ['Giúp hổ phát hiện và săn mồi khi trời tối', 'Giúp hổ đọc sách vào ban đêm', 'Giúp hổ tìm hoa trong vườn', 'Giúp hổ bơi dưới biển'], 'A', 'hard', 3, 3),
  sc('Hình ảnh "đuôi dài và cứng như roi sắt" giúp người đọc hình dung điều gì?', ['Đuôi hổ dài, chắc và mạnh', 'Đuôi hổ rất mềm', 'Đuôi hổ có thể phát sáng', 'Đuôi hổ ngắn như đuôi thỏ'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào thể hiện rõ nhất sức mạnh của hổ?', ['Bốn chân chắc khỏe, vuốt sắc, có thể nhảy xa', 'Lông hổ có màu vàng', 'Hổ sống trong rừng', 'Hổ có chiếc đuôi dài'], 'A', 'hard', 3, 5),
  sc('Vì sao hổ được gọi là "chúa tể rừng xanh"?', ['Vì hổ khỏe, hung dữ và khiến nhiều con vật trong rừng khiếp sợ', 'Vì hổ biết chăm sóc tất cả cây rừng', 'Vì hổ là con vật duy nhất sống trong rừng', 'Vì hổ có thể bay trên bầu trời'], 'A', 'hard', 3, 6),
  sc('Câu nào nói đúng nhất về hổ?', ['Hổ là loài thú ăn thịt, khỏe và săn mồi giỏi', 'Hổ là loài chim có sải cánh lớn', 'Hổ là loài vật ăn cỏ, tính hiền lành', 'Hổ là loài cá sống dưới biển'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: trong rừng / hổ / là loài thú dữ / sống',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'trong rừng' },
      { key: '2', text: 'hổ' },
      { key: '3', text: 'là loài thú dữ' },
      { key: '4', text: 'sống' },
    ],
    correctAnswerJson: ['2', '3', '4', '1'], // Hổ là loài thú dữ sống trong rừng
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Hổ là loài thú dữ sống trong rừng".',
  },
  sc('Khi tham quan nơi nuôi hổ, em nên làm gì?', ['Đứng đúng khu vực an toàn và nghe hướng dẫn của người lớn', 'Trèo qua hàng rào để nhìn gần hơn', 'Tự ý cho hổ ăn', 'Chọc phá để hổ chạy lại'], 'A', 'hard', 3, 9),
  sc('Việc làm nào giúp bảo vệ loài hổ?', ['Không săn bắt hổ và bảo vệ môi trường rừng', 'Phá rừng để xây nhà', 'Mua bán các bộ phận của hổ', 'Đặt bẫy thú trong rừng'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B35 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
