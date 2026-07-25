require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Du lịch biển Việt Nam%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Bãi biển quê em', 'Du lịch biển Việt Nam', 'Những đồi cát', 'Món quà của biển'], 'B', 'easy', 1, 1),
  sc('Theo bài đọc, biển nước ta như thế nào?', ['Nơi đâu cũng đẹp', 'Chỉ miền Trung mới đẹp', 'Chỉ có những bãi biển nhỏ', 'Không có nhiều du khách'], 'A', 'easy', 1, 2),
  sc('Địa phương nào được nhắc đến là có bãi biển nổi tiếng?', ['Thanh Hoá', 'Hà Giang', 'Bắc Kạn', 'Lào Cai'], 'A', 'easy', 1, 3),
  sc('Địa phương nào sau đây cũng được nhắc đến trong bài?', ['Đà Nẵng', 'Điện Biên', 'Cao Bằng', 'Tuyên Quang'], 'A', 'easy', 1, 4),
  sc('Bãi biển của địa phương nào được du khách yêu thích?', ['Khánh Hoà', 'Sơn La', 'Lai Châu', 'Hoà Bình'], 'A', 'easy', 1, 5),
  sc('Ngoài những bãi biển nổi tiếng, nước ta còn có nhiều bãi biển như thế nào?', ['Hoang sơ', 'Đông đúc', 'Nhân tạo', 'Khô cạn'], 'A', 'easy', 1, 6),
  sc('Khi đi biển, bạn có thể làm gì dưới nước?', ['Bơi lội', 'Leo núi', 'Trồng cây', 'Đạp xe'], 'A', 'easy', 1, 7),
  sc('Trên bãi biển, bạn có thể nhặt gì?', ['Vỏ sò', 'Lá khô', 'Quả thông', 'Hạt lúa'], 'A', 'easy', 1, 8),
  sc('Trẻ em có thể dùng cát để xây gì?', ['Lâu đài cát', 'Nhà cao tầng', 'Cầu sắt', 'Đường nhựa'], 'A', 'easy', 1, 9),
  sc('Ở Mũi Né có hoạt động nào rất thú vị?', ['Trượt cát', 'Trượt tuyết', 'Chèo thuyền trên hồ', 'Leo cây'], 'A', 'easy', 1, 10),
  sc('Từ "hoang sơ" có nghĩa là gì?', ['Còn giữ vẻ tự nhiên, ít bị con người tác động', 'Có rất nhiều nhà cao tầng', 'Luôn đông đúc, náo nhiệt', 'Được trang trí bằng nhiều đèn màu'], 'A', 'medium', 2, 1),
  sc('Từ "mênh mông" dùng để chỉ cảnh vật như thế nào?', ['Rộng lớn, trải ra xa', 'Nhỏ bé, chật hẹp', 'Cao và dựng đứng', 'Tối tăm, khó nhìn'], 'A', 'medium', 2, 2),
  sc('Từ "kì diệu" có nghĩa là gì?', ['Đặc biệt, đẹp đẽ và đáng ngạc nhiên', 'Bình thường, không có gì đáng chú ý', 'Nguy hiểm và đáng sợ', 'Cũ kĩ và hư hỏng'], 'A', 'medium', 2, 3),
  sc('Những bãi biển nổi tiếng được ai yêu thích?', ['Du khách', 'Chỉ người đánh cá', 'Chỉ trẻ em', 'Chỉ người dân địa phương'], 'A', 'medium', 2, 4),
  sc('Dọc theo chiều dài đất nước có những gì?', ['Nhiều bãi biển nổi tiếng và hoang sơ', 'Chỉ có những đồi cát', 'Chỉ có những thành phố lớn', 'Không có bãi biển'], 'A', 'medium', 2, 5),
  sc('Khi đi biển, bạn có thể tham gia những hoạt động nào?', ['Bơi lội, nô đùa trên sóng, nhặt vỏ sò và xây lâu đài cát', 'Gieo hạt, cày ruộng và gặt lúa', 'Leo núi, hái quả và chăn trâu', 'Đọc sách, viết bài và làm toán'], 'A', 'medium', 2, 6),
  sc('Nếu đến Mũi Né, du khách sẽ được ngắm nhìn gì?', ['Những đồi cát mênh mông', 'Những ruộng bậc thang', 'Những cánh rừng thông', 'Những vườn hoa rộng lớn'], 'A', 'medium', 2, 7),
  sc('Vì sao hình dạng của các đồi cát luôn thay đổi?', ['Vì cát bay', 'Vì người dân trồng cây', 'Vì nước biển dâng lên', 'Vì có nhiều nhà xây mới'], 'A', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Dọc bờ biển nước ta có nhiều khu du lịch đẹp (…).', ['nổi tiếng', 'thay đổi', 'chiều dài', 'đồi cát'], 'A', 'medium', 2, 9),
  sc('Chọn từ thích hợp để hoàn thành câu: Miền Nam nước ta có những cánh đồng lúa rộng (…).', ['mênh mông', 'nổi tiếng', 'thay đổi', 'chiều dài'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào phù hợp với nội dung bài đọc?', ['Giới thiệu vẻ đẹp biển Việt Nam → kể các hoạt động ở biển → giới thiệu đồi cát Mũi Né → khẳng định giá trị của biển', 'Giới thiệu đồi cát → kể chuyện đi học → nói về ruộng lúa', 'Kể về thành phố → giới thiệu nghề đánh cá → nói về núi rừng', 'Hướng dẫn bơi → kể về máy bay → giới thiệu Mũi Né'], 'A', 'hard', 3, 1),
  sc('Vì sao biển Việt Nam hấp dẫn du khách?', ['Vì có nhiều bãi biển đẹp, nổi tiếng và còn giữ vẻ hoang sơ', 'Vì tất cả bãi biển đều có nhà cao tầng', 'Vì biển chỉ có một hoạt động vui chơi', 'Vì biển không có sóng'], 'A', 'hard', 3, 2),
  sc('Câu nào cho thấy Mũi Né có cảnh quan đặc biệt?', ['"Bạn sẽ được ngắm nhìn những đồi cát mênh mông."', '"Biển nước ta nơi đâu cũng đẹp."', '"Bạn sẽ được thoả sức bơi lội."', '"Nước ta có nhiều bãi biển nổi tiếng."'], 'A', 'hard', 3, 3),
  sc('Cát bay tác động thế nào đến các đồi cát?', ['Làm hình dạng các đồi cát luôn thay đổi', 'Làm đồi cát biến thành núi đá', 'Làm đồi cát chìm xuống biển', 'Làm cát chuyển thành đất'], 'A', 'hard', 3, 4),
  sc('Vì sao tác giả gọi biển là "món quà kì diệu"?', ['Vì biển có cảnh đẹp, nhiều điều thú vị và mang lại niềm vui cho con người', 'Vì biển được đặt trong một hộp quà', 'Vì biển chỉ dành cho khách du lịch', 'Vì biển do con người tạo ra'], 'A', 'hard', 3, 5),
  sc('Câu nào phù hợp nhất để miêu tả bức tranh?', ['Bãi biển xanh trong, cát vàng và nhiều người đang vui chơi.', 'Trên đỉnh núi có tuyết rơi dày.', 'Các bạn nhỏ đang gặt lúa ngoài đồng.', 'Những chiếc xe đang đi trên đường cao tốc.'], 'A', 'hard', 3, 6),
  sc('Hoạt động nào giúp giữ gìn vẻ đẹp của biển?', ['Bỏ rác đúng nơi quy định và không làm hại sinh vật biển', 'Vứt túi ni-lông xuống nước', 'Bẻ san hô mang về', 'Để lại rác trên bãi cát'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: nước ta / nhiều bãi biển đẹp / có',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'nước ta' },
      { key: '2', text: 'nhiều bãi biển đẹp' },
      { key: '3', text: 'có' },
    ],
    correctAnswerJson: ['1', '3', '2'], // Nước ta có nhiều bãi biển đẹp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Nước ta có nhiều bãi biển đẹp".',
  },
  sc('Câu nào có tiếng chứa vần ươt hoặc ươp?', ['Em trượt cát trên đồi.', 'Bầu trời hôm nay rất xanh.', 'Sóng biển vỗ vào bờ.', 'Du khách xây lâu đài cát.'], 'A', 'hard', 3, 9, '"trượt" có vần "ươt".'),
  sc('Nội dung chính của bài đọc là gì?', ['Giới thiệu vẻ đẹp, các hoạt động thú vị và sự kì diệu của biển Việt Nam', 'Hướng dẫn cách xây lâu đài cát', 'Kể về cuộc sống của người đánh cá', 'Giải thích cách hình thành núi đá'], 'A', 'hard', 3, 10),
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
    console.log('BIENVN XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
