require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Trong giấc mơ buổi sáng%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Giấc mơ của em', 'Trong giấc mơ buổi sáng', 'Ông mặt trời', 'Buổi sáng đến trường'], 'B', 'easy', 1, 1),
  sc('Trong giấc mơ, bạn nhỏ gặp ai?', ['Chú gà trống', 'Cô giáo', 'Ông mặt trời', 'Người bạn mới'], 'C', 'easy', 1, 2),
  sc('Ông mặt trời mang theo vật gì?', ['Túi đầy hoa nắng', 'Giỏ đầy hoa hồng', 'Túi đầy sách vở', 'Giỏ đầy trái cây'], 'A', 'easy', 1, 3),
  sc('Ông mặt trời rải hoa vàng ở đâu?', ['Trong lớp học', 'Khắp nơi', 'Trên dòng sông', 'Trong khu vườn'], 'B', 'easy', 1, 4),
  sc('Bạn nhỏ đi qua nơi nào trong giấc mơ?', ['Thảo nguyên xanh', 'Thành phố đông đúc', 'Bãi biển rộng', 'Sân trường'], 'A', 'easy', 1, 5),
  sc('Trên thảo nguyên có gì?', ['Nhiều con vật', 'Rất nhiều hoa lạ', 'Nhiều ngôi nhà', 'Nhiều cây ăn quả'], 'B', 'easy', 1, 6),
  sc('Những bông hoa lạ mang tên ai?', ['Các thầy cô', 'Người thân trong gia đình', 'Các bạn trong lớp', 'Những con vật'], 'C', 'easy', 1, 7),
  sc('Bạn nhỏ nhìn thấy gì trong giấc mơ?', ['Một dòng sông', 'Một ngọn núi', 'Một khu rừng', 'Một cánh đồng lúa'], 'A', 'easy', 1, 8),
  sc('Dòng sông trong giấc mơ có màu gì?', ['Xanh biếc', 'Vàng óng', 'Trắng như sữa', 'Đỏ thắm'], 'C', 'easy', 1, 9),
  sc('Ai gọi bạn nhỏ dậy học bài?', ['Mẹ', 'Chú gà trống', 'Ông mặt trời', 'Bạn cùng lớp'], 'B', 'easy', 1, 10),
  sc('Từ "thảo nguyên" chỉ nơi nào?', ['Vùng đất rộng lớn, bằng phẳng, có nhiều cỏ', 'Một dòng sông lớn', 'Một khu phố đông người', 'Một bãi biển nhiều cát'], 'A', 'medium', 2, 1),
  sc('Từ "ban mai" có nghĩa là gì?', ['Buổi trưa', 'Buổi sáng sớm', 'Buổi chiều', 'Buổi tối'], 'B', 'medium', 2, 2),
  sc('Hình ảnh "hoa nắng" chỉ điều gì?', ['Những tia nắng vàng tươi', 'Một loài hoa màu trắng', 'Những đám mây trên trời', 'Những hạt mưa nhỏ'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào cho biết ánh nắng lan tỏa rộng khắp?', ['"Em gặp ông mặt trời"', '"Mang túi đầy hoa nắng"', '"Rải hoa vàng khắp nơi"', '"Em qua thảo nguyên xanh"'], 'C', 'medium', 2, 4),
  sc('Câu thơ nào cho biết bạn nhỏ yêu quý các bạn trong lớp?', ['"Có rất nhiều hoa lạ / Mang tên bạn lớp mình"', '"Em thấy một dòng sông"', '"Rải hoa vàng khắp nơi"', '"Em nghe rõ bên tai"'], 'A', 'medium', 2, 5),
  sc('Trong giấc mơ, dòng sông chảy qua đâu?', ['Khu rừng xanh', 'Ban mai hồng', 'Ngôi trường nhỏ', 'Thảo nguyên vàng'], 'B', 'medium', 2, 6),
  sc('Bạn nhỏ nghe thấy lời gì?', ['"Dậy mau đi! Học bài!"', '"Đi chơi thôi!"', '"Ăn sáng đi!"', '"Ngủ thêm nhé!"'], 'A', 'medium', 2, 7),
  sc('Cặp tiếng nào cùng vần với nhau?', ['trời – nơi', 'sáng – xanh', 'sông – trắng', 'tai – trống'], 'A', 'medium', 2, 8, '"trời" và "nơi" cùng vần "ơi".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['xanh – mình', 'sông – hồng', 'trời – vàng', 'tai – trống'], 'B', 'medium', 2, 9, '"sông" và "hồng" cùng vần "ông".'),
  sc('Bài thơ do ai sáng tác?', ['Thụy Anh', 'Nguyễn Lãm Thắng', 'Ngọc Hà', 'Hải An'], 'B', 'medium', 2, 10),
  sc('Thứ tự nào đúng với các sự việc trong giấc mơ?', ['Gặp mặt trời → qua thảo nguyên → thấy dòng sông → nghe gà trống gọi', 'Nghe gà gọi → gặp mặt trời → thấy dòng sông → qua thảo nguyên', 'Thấy dòng sông → qua thảo nguyên → gặp mặt trời → đi học', 'Qua thảo nguyên → nghe gà gọi → gặp mặt trời → thấy dòng sông'], 'A', 'hard', 3, 1),
  sc('Vì sao tác giả gọi các tia nắng là "hoa nắng"?', ['Vì tia nắng vàng đẹp và rực rỡ như những bông hoa', 'Vì mặt trời trồng được hoa', 'Vì hoa mọc trên bầu trời', 'Vì tia nắng có mùi thơm'], 'A', 'hard', 3, 2),
  sc('Hình ảnh những bông hoa mang tên bạn lớp mình thể hiện điều gì?', ['Tình yêu mến của bạn nhỏ dành cho các bạn', 'Bạn nhỏ không nhớ tên các bạn', 'Các bạn đang trồng hoa', 'Lớp học nằm trên thảo nguyên'], 'A', 'hard', 3, 3),
  sc('Dòng sông "chảy tràn dòng sữa trắng" là hình ảnh như thế nào?', ['Hình ảnh tưởng tượng đẹp và kì diệu trong giấc mơ', 'Một dòng sông có thật ở trường', 'Dòng nước bị ô nhiễm', 'Một con đường màu trắng'], 'A', 'hard', 3, 4),
  sc('Tiếng gọi của chú gà trống có tác dụng gì?', ['Đánh thức bạn nhỏ dậy để học bài', 'Ru bạn nhỏ ngủ tiếp', 'Gọi các bạn đến chơi', 'Báo trời sắp mưa'], 'A', 'hard', 3, 5),
  sc('Tâm trạng của bạn nhỏ trong giấc mơ chủ yếu là gì?', ['Vui vẻ, thích thú', 'Sợ hãi, lo lắng', 'Buồn bã, cô đơn', 'Tức giận, khó chịu'], 'A', 'hard', 3, 6),
  sc('Chi tiết nào cho biết giấc mơ sắp kết thúc?', ['Bạn nhỏ gặp ông mặt trời', 'Bạn nhỏ đi qua thảo nguyên', 'Chú gà trống gọi: "Dậy mau đi! Học bài!"', 'Bạn nhỏ thấy dòng sông trắng'], 'C', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: ông mặt trời / hoa nắng / khắp nơi / rải',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'ông mặt trời' },
      { key: '2', text: 'hoa nắng' },
      { key: '3', text: 'khắp nơi' },
      { key: '4', text: 'rải' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Ông mặt trời rải hoa nắng khắp nơi
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Ông mặt trời rải hoa nắng khắp nơi".',
  },
  sc('Giấc mơ của bạn nhỏ cho thấy bạn có trí tưởng tượng như thế nào?', ['Phong phú, trong sáng và ngộ nghĩnh', 'Nghèo nàn và buồn tẻ', 'Đáng sợ và tối tăm', 'Hoàn toàn không có hình ảnh thiên nhiên'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Giấc mơ buổi sáng đẹp đẽ, đầy ánh nắng, hoa, dòng sông và tình bạn của một bạn nhỏ', 'Hướng dẫn cách chăm sóc hoa', 'Kể về một chuyến đi chơi ngoài đời thật', 'Miêu tả công việc của chú gà trống'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B40 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
