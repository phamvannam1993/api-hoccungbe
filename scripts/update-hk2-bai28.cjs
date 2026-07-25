require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Câu chuyện của rễ%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Cây và hoa', 'Câu chuyện của rễ', 'Những trái ngọt', 'Vòm lá xanh'], 'B', 'easy', 1, 1),
  sc('Bộ phận nào của cây chìm trong đất?', ['Hoa', 'Lá', 'Rễ', 'Quả'], 'C', 'easy', 1, 2),
  sc('Hoa nở ở đâu?', ['Trên cành', 'Dưới đất', 'Trên rễ', 'Trong nước'], 'A', 'easy', 1, 3),
  sc('Hoa khoe điều gì?', ['Muôn sắc thắm', 'Những chiếc gai', 'Bộ rễ dài', 'Những hạt giống'], 'A', 'easy', 1, 4),
  sc('Lá cây có màu gì?', ['Đỏ thắm', 'Biếc xanh', 'Trắng muốt', 'Vàng nhạt'], 'B', 'easy', 1, 5),
  sc('Hoa tỏa hương ở đâu?', ['Trong mưa', 'Trong nắng', 'Dưới đất', 'Trong nhà'], 'B', 'easy', 1, 6),
  sc('Nhờ có rễ, quả như thế nào?', ['Trĩu cành', 'Rơi hết xuống đất', 'Không thể lớn', 'Bị khô héo'], 'A', 'easy', 1, 7),
  sc('Nếu không có rễ, cây không thể làm gì?', ['Đâm chồi', 'Đứng dưới nắng', 'Có thân cây', 'Được tưới nước'], 'A', 'easy', 1, 8),
  sc('Rễ được miêu tả như thế nào?', ['Ồn ào, to lớn', 'Âm thầm, nhỏ bé', 'Rực rỡ, nhiều màu', 'Cao lớn, mạnh mẽ'], 'B', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Phương Dung', 'Tô Hà', 'Minh Tâm', 'Lâm Anh'], 'A', 'easy', 1, 10),
  sc('Từ "sắc thắm" dùng để miêu tả điều gì?', ['Màu sắc đẹp và đậm', 'Âm thanh trong trẻo', 'Mùi hương nhẹ nhàng', 'Bộ rễ dài'], 'A', 'medium', 2, 1),
  sc('Từ "trĩu" trong cụm từ "quả trĩu cành" có nghĩa là gì?', ['Quả nhiều và nặng làm cành cong xuống', 'Quả còn nhỏ và chưa chín', 'Quả đã rụng hết', 'Cành cây không có quả'], 'A', 'medium', 2, 2),
  sc('Từ "chồi" chỉ điều gì?', ['Phần non mới mọc của cây', 'Một loại quả chín', 'Phần rễ nằm trong đất', 'Một bông hoa đã tàn'], 'A', 'medium', 2, 3),
  sc('Từ "khiêm nhường" nói về người như thế nào?', ['Không khoe khoang, biết nhường nhịn', 'Thường xuyên tự khen mình', 'Hay nói thật to', 'Không muốn giúp đỡ ai'], 'A', 'medium', 2, 4),
  sc('Nhờ có rễ, hoa như thế nào?', ['Nở đẹp', 'Khô héo', 'Rụng xuống', 'Không có màu sắc'], 'A', 'medium', 2, 5),
  sc('Nhờ có rễ, lá như thế nào?', ['Biếc xanh', 'Vàng úa', 'Khô giòn', 'Rụng hết'], 'A', 'medium', 2, 6),
  sc('Nếu không có rễ, cây sẽ không có những gì?', ['Chồi, trái ngọt và hoa tươi', 'Đất, nước và ánh nắng', 'Cành khô và lá rụng', 'Ong, bướm và chim'], 'A', 'medium', 2, 7),
  sc('Cặp tiếng nào cùng vần với nhau?', ['cành – xanh', 'hoa – đất', 'thắm – cành', 'đẹp – quả'], 'A', 'medium', 2, 8, '"cành" và "xanh" cùng vần "anh".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['lời – đời', 'rễ – chồi', 'bé – đất', 'lẽ – xanh'], 'A', 'medium', 2, 9, '"lời" và "đời" cùng vần "ơi".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['rễ – bé', 'cành – đất', 'chồi – tươi', 'thắm – đời'], 'A', 'medium', 2, 10, '"rễ" và "bé" cùng vần "e".'),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Miêu tả hoa, lá → nói về công lao của rễ → tưởng tượng cây không có rễ → ca ngợi đức tính của rễ', 'Miêu tả rễ → kể chuyện hái quả → nói về mưa → miêu tả bầu trời', 'Nói về cây không có rễ → kể chuyện trồng cây → miêu tả con vật', 'Miêu tả hoa tàn → nói về chim → ca ngợi người trồng cây'], 'A', 'hard', 3, 1),
  sc('Vì sao bộ rễ thường khó nhìn thấy?', ['Vì rễ chìm trong đất', 'Vì rễ nằm trên ngọn cây', 'Vì rễ có màu giống hoa', 'Vì rễ chỉ xuất hiện ban đêm'], 'A', 'hard', 3, 2),
  sc('Những từ ngữ nào thể hiện sự đáng quý của rễ?', ['Âm thầm, nhỏ bé, khiêm nhường, lặng lẽ', 'Sắc thắm, biếc xanh, trái ngọt', 'Cành cao, hoa đẹp, quả trĩu', 'Nắng vàng, đất nâu, trời xanh'], 'A', 'hard', 3, 3),
  sc('Vì sao rễ được xem là bộ phận quan trọng của cây?', ['Vì nhờ có rễ, cây đâm chồi, ra hoa, kết quả và xanh lá', 'Vì rễ có nhiều màu sắc nhất', 'Vì rễ nằm cao nhất trên cây', 'Vì rễ thu hút ong bướm'], 'A', 'hard', 3, 4),
  sc('Câu thơ "Rễ chẳng nhiều lời" muốn nói điều gì?', ['Rễ âm thầm làm việc, không khoe công', 'Rễ không có ích cho cây', 'Rễ không thể phát triển', 'Rễ không cần đất và nước'], 'A', 'hard', 3, 5),
  sc('Câu thơ "Làm đẹp cho đời" cho biết rễ có vai trò gì?', ['Giúp cây xanh tốt, nở hoa và cho quả', 'Làm đất trở nên khô cứng', 'Làm cây mất hết lá', 'Ngăn cây phát triển'], 'A', 'hard', 3, 6),
  sc('Qua hình ảnh của rễ, bài thơ ca ngợi đức tính nào?', ['Khiêm nhường và âm thầm cống hiến', 'Thích khoe khoang', 'Nóng vội và hấp tấp', 'Chỉ quan tâm đến bản thân'], 'A', 'hard', 3, 7),
  sc('Người có đức tính giống rễ sẽ làm gì?', ['Âm thầm làm việc tốt và không khoe khoang', 'Chỉ giúp người khác khi được thưởng', 'Luôn kể công với mọi người', 'Không muốn làm việc cùng ai'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: rễ cây / trong đất / âm thầm / làm việc',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'rễ cây' },
      { key: '2', text: 'trong đất' },
      { key: '3', text: 'âm thầm' },
      { key: '4', text: 'làm việc' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Rễ cây âm thầm làm việc trong đất
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Rễ cây âm thầm làm việc trong đất".',
  },
  sc('Bài học phù hợp nhất được rút ra từ bài thơ là gì?', ['Cần trân trọng những người âm thầm đóng góp và sống khiêm nhường', 'Chỉ những gì đẹp mắt mới đáng quý', 'Người làm việc tốt cần luôn khoe thành tích', 'Những việc không nhìn thấy đều không quan trọng'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B28 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
