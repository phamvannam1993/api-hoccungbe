require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập và đánh giá - Bài tập số 1%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tên bài ôn tập ở trang này là gì?', ['Ôn tập giữa kì', 'Ôn tập Bài 1', 'Kiểm tra cuối tuần', 'Đánh giá tháng'], 'B', 'easy', 1, 1),
  sc('Tranh số (1) vẽ các bạn nhỏ đang làm gì?', ['Đang nhảy dây', 'Đang đá cầu', 'Đang chơi ô ăn quan', 'Đang chơi lò cò'], 'D', 'easy', 1, 2),
  sc('Tranh số (2) vẽ ai?', ['Một gia đình đi dạo', 'Một cô giáo và học sinh', 'Các bạn đang đá bóng', 'Người đi chợ'], 'A', 'easy', 1, 3),
  sc('Tranh số (3) là hình ảnh gì?', ['Bệnh viện', 'Trường học', 'Nhà ga', 'Công viên'], 'B', 'easy', 1, 4),
  sc('Tranh số (4) gồm những gì?', ['Các con vật', 'Các biển cấm', 'Các loại cây', 'Các món ăn'], 'B', 'easy', 1, 5),
  sc('Tranh số (6) có những con vật nào?', ['Voi, hươu, khỉ, chim', 'Trâu, bò, ngựa, dê', 'Gà, vịt, ngan, ngỗng', 'Cá, cua, tôm, mực'], 'A', 'easy', 1, 6),
  sc('Tranh số (8) gợi đến địa danh nào?', ['Vịnh Hạ Long', 'Hồ Gươm – Tháp Rùa', 'Cầu Long Biên', 'Chợ Bến Thành'], 'B', 'easy', 1, 7),
  sc('Tranh số (9) vẽ con vật gì?', ['Cá voi', 'Cá heo', 'Cá mập', 'Con hải cẩu'], 'B', 'easy', 1, 8),
  sc('Tranh số (10) là gì?', ['Bản đồ Việt Nam', 'Bản đồ châu Á', 'Bản đồ Hà Nội', 'Bản đồ thế giới'], 'A', 'easy', 1, 9),
  sc('Trong câu đố: "Con gì đẹp nhất loài chim / Đuôi xoè rực rỡ như nghìn cánh hoa?", đáp án là:', ['Chim sẻ', 'Chim én', 'Con công', 'Con cò'], 'C', 'easy', 1, 10),
  sc('Theo câu đố, nơi bạn có thể thoả sức bơi lội, xây lâu đài cát là ở đâu?', ['Trên núi', 'Trong rừng', 'Ở bãi biển', 'Ở sân trường'], 'C', 'medium', 2, 1),
  sc('Ngày 28 tháng 6 hằng năm là ngày gì?', ['Ngày Quốc tế Thiếu nhi', 'Ngày Nhà giáo Việt Nam', 'Ngày Gia đình Việt Nam', 'Ngày Quốc khánh'], 'C', 'medium', 2, 2),
  sc('Câu đố "Cái gì chiếu sáng nhẹ nhàng / Xuyên qua kẽ lá chẳng làm lá rung?" nói đến gì?', ['Ánh trăng', 'Đèn pin', 'Tia nắng', 'Ngọn lửa'], 'C', 'medium', 2, 3),
  sc('"Ai ai cũng có / Chẳng nặng là bao / Bạn ơi đi đâu / Nhớ mang theo nhé" là nói đến:', ['Cái mũ', 'Cặp sách', 'Lời chào', 'Khăn quàng'], 'C', 'medium', 2, 4),
  sc('"Lá gì xoè ô che nắng / Râm mát đường trên đồi vắng em đi?" là lá gì?', ['Lá bàng', 'Lá cọ', 'Lá chuối', 'Lá tre'], 'B', 'medium', 2, 5),
  sc('Thành ngữ quen thuộc là: "Ăn quả nhớ kẻ trồng ..."', ['hoa', 'lá', 'cây', 'quả'], 'C', 'medium', 2, 6),
  sc('Ở tháng 1, em thường được bố mẹ cho gì?', ['Sách mới', 'Lì xì', 'Vé xem phim', 'Đồ chơi cát'], 'B', 'medium', 2, 7),
  sc('Ở tháng 3, ong đi tìm gì?', ['Lá', 'Cành', 'Mật', 'Tổ'], 'C', 'medium', 2, 8),
  sc('Cuối tháng 5, em thường được làm gì?', ['Đi học', 'Nghỉ hè', 'Tập văn nghệ', 'Thi cuối năm'], 'B', 'medium', 2, 9),
  sc('Tháng 6 gắn với hoạt động nào trong tranh?', ['Đi biển', 'Đi rừng', 'Đi học', 'Đi chợ'], 'A', 'medium', 2, 10),
  sc('Tháng 8, em thường chuẩn bị vào gì?', ['Kì nghỉ mới', 'Trò chơi mới', 'Năm học mới', 'Nhà mới'], 'C', 'hard', 3, 1),
  sc('Tháng 9 thường gắn với hoạt động nào?', ['Đi biển', 'Đi học', 'Đi cắm trại', 'Đi thăm ông bà'], 'B', 'hard', 3, 2),
  sc('Câu "Thời tiết không nóng và không (...)" ở tháng 10 nên điền từ nào?', ['vui', 'lạnh', 'xa', 'sáng'], 'B', 'hard', 3, 3),
  sc('Bức tranh nào phù hợp nhất với chủ điểm gia đình?', ['Tranh (2)', 'Tranh (5)', 'Tranh (8)', 'Tranh (10)'], 'A', 'hard', 3, 4),
  sc('Bức tranh nào phù hợp nhất với chủ điểm trường học?', ['Tranh (3)', 'Tranh (6)', 'Tranh (9)', 'Tranh (10)'], 'A', 'hard', 3, 5),
  sc('Bức tranh nào phù hợp với chủ điểm thiên nhiên, loài vật?', ['Tranh (5) hoặc (6)', 'Tranh (2) hoặc (3)', 'Tranh (4) hoặc (8)', 'Tranh (1) hoặc (10)'], 'A', 'hard', 3, 6),
  sc('Bức tranh nào gợi đến chủ điểm đất nước Việt Nam rõ nhất?', ['Tranh (1)', 'Tranh (4)', 'Tranh (8) hoặc (10)', 'Tranh (2)'], 'C', 'hard', 3, 7),
  sc('Các biển trong tranh (4) nhắc em điều gì?', ['Phải vui chơi thật to', 'Phải tuân thủ nội quy, giữ an toàn và vệ sinh', 'Có thể làm mọi điều mình thích', 'Chỉ cần nhìn cho đẹp'], 'B', 'hard', 3, 8),
  sc('Nếu em muốn chọn tranh cho chủ điểm biển Việt Nam, em nên chọn tranh nào?', ['Tranh (3)', 'Tranh (7)', 'Tranh (9)', 'Tranh (1)'], 'C', 'hard', 3, 9),
  sc('Nội dung chính của phần ôn tập này là gì?', ['Ôn lại các chủ điểm đã học, giải ô chữ và nói về các tháng trong năm', 'Chỉ học về con vật', 'Chỉ học về biển', 'Chỉ học về trường học'], 'A', 'hard', 3, 10),
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
    console.log('ONTAP-BAI1 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
