require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 78%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôn, uông', 'uân, uât', 'oan, oat', 'ươn, ương'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uân?', ['luật', 'khuất', 'tuần', 'thuật'], 'C', 'easy', 1, 2, '"tuần" có vần "uân".'),
  sc('Tiếng nào dưới đây có vần uât?', ['xuân', 'chuẩn', 'huân', 'xuất'], 'D', 'easy', 1, 3, '"xuất" có vần "uât".'),
  sc('Ghép âm x với vần uân được tiếng nào?', ['xuân', 'xuất', 'xoan', 'xuyên'], 'A', 'easy', 1, 4, 'x + uân = "xuân".'),
  sc('Hình ảnh người chiến sĩ đi kiểm tra địa bàn minh họa từ nào?', ['Tuần tra', 'Võ thuật', 'Mùa xuân', 'Nghệ thuật'], 'A', 'easy', 1, 5),
  sc('Hình ảnh hoa đào, hoa mai nở minh họa từ nào?', ['Mùa hè', 'Mùa thu', 'Mùa xuân', 'Mùa đông'], 'C', 'easy', 1, 6),
  sc('Hoạt động luyện tập các thế võ trong bài được gọi là gì?', ['Mĩ thuật', 'Võ thuật', 'Kĩ thuật', 'Phẫu thuật'], 'B', 'easy', 1, 7),
  sc('Các bạn nhỏ xem chương trình gì?', ['Chương trình thể thao', 'Chương trình nghệ thuật', 'Chương trình thời sự', 'Chương trình nấu ăn'], 'B', 'easy', 1, 8),
  sc('Chương trình nghệ thuật được tổ chức để chào mùa nào?', ['Mùa hè', 'Mùa thu', 'Mùa đông', 'Mùa xuân'], 'D', 'easy', 1, 9),
  sc('Gần Tết, bố và Hà đi đâu?', ['Đi siêu thị', 'Đi chợ hoa', 'Đi công viên', 'Đi trường học'], 'B', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uân?', ['chuẩn, huân, khuân, tuần', 'khuất, luật, thuật, xuất', 'xuân, luật, tuần, thuật', 'chuẩn, khuất, huân, xuất'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uât?', ['chuẩn, huân, tuần', 'khuất, luật, thuật, xuất', 'xuân, khuân, xuất', 'huân, thuật, tuần'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "tuần tra", tiếng nào có vần uân?', ['tuần', 'tra', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 3, '"tuần" có vần "uân".'),
  sc('Trong cụm từ "mùa xuân", tiếng nào có vần uân?', ['mùa', 'xuân', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"xuân" có vần "uân".'),
  sc('Trong cụm từ "võ thuật", tiếng nào có vần uât?', ['võ', 'thuật', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"thuật" có vần "uât".'),
  sc('Điền vần thích hợp để tạo thành tiếng "tuần": t…', ['uân', 'uât', 'uôn', 'uôt'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "luật": l…', ['uân', 'uât', 'uôn', 'uông'], 'B', 'medium', 2, 7),
  sc('Bố và Hà đi chợ hoa mua những cây gì?', ['Đào và quất', 'Mai và lan', 'Hồng và cúc', 'Sen và súng'], 'A', 'medium', 2, 8),
  sc('Cành đào có đặc điểm gì?', ['Lá đã rụng hết', 'Chi chít lộc non, nụ hoa phớt hồng đang e ấp nở', 'Chỉ có những quả chín', 'Cành cây khô và không có nụ'], 'B', 'medium', 2, 9),
  sc('Cây quất được miêu tả như thế nào?', ['Thưa lá, quả còn xanh', 'Xum xuê, quả vàng óng', 'Không có quả', 'Cành khô, lá vàng'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uân – uât?', ['xuân – thuật', 'luật – tuần', 'xuất – chuẩn', 'khuất – huân'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uân và vần uât?', ['Bé tập võ thuật.', 'Mùa xuân đã đến.', 'Chúng em xem chương trình nghệ thuật chào xuân.', 'Chú bộ đội đi tuần tra.'], 'C', 'hard', 3, 2, 'thuật (uât), xuân (uân).'),
  sc('Trong câu "Chúng em xem chương trình nghệ thuật chào xuân", có bao nhiêu tiếng chứa vần uân hoặc uât?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là thuật và xuân.'),
  sc('Trong đoạn đọc về gia đình Hà đi chợ hoa, có bao nhiêu tiếng chứa vần uân hoặc uât?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'C', 'hard', 3, 4, 'Đó là hai tiếng quất và hai tiếng xuân.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['chuẩn', 'huân', 'tuần', 'thuật'], 'D', 'hard', 3, 5, '"chuẩn, huân, tuần" có vần uân; "thuật" có vần uât.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['xuân – vần uân', 'tuần – vần uân', 'luật – vần uât', 'xuất – vần uân'], 'D', 'hard', 3, 6, 'Tiếng "xuất" có vần "uât", không phải vần "uân".'),
  sc('Thứ tự nào đúng với nội dung đoạn đọc?', ['Bố và Hà đi chợ hoa → chọn đào và quất → mang về nhà → cả nhà vui đón xuân', 'Cả nhà đón xuân → bố đi làm → Hà đi học → mẹ mua hoa', 'Hà mua quất → mẹ đi chợ → bố trồng đào → cả nhà đi ngủ', 'Bố và Hà đi công viên → hái hoa → về nhà → đón Tết'], 'A', 'hard', 3, 7),
  sc('Vì sao mẹ nói hai bố con đã đem cả mùa xuân về nhà?', ['Vì bố và Hà mang về cành đào cùng cây quất đẹp, tượng trưng cho ngày Tết', 'Vì bố và Hà mang nhiều đồ chơi về nhà', 'Vì cả nhà chuyển đến một ngôi nhà mới', 'Vì thời tiết trong nhà trở nên ấm hơn'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: cả nhà / vui / đón xuân / cùng',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'cả nhà' },
      { key: '2', text: 'vui' },
      { key: '3', text: 'đón xuân' },
      { key: '4', text: 'cùng' },
    ],
    correctAnswerJson: ['1', '4', '2', '3'], // Cả nhà cùng vui đón xuân
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Cả nhà cùng vui đón xuân".',
  },
  sc('Để cùng gia đình chuẩn bị đón Tết, em nên làm gì?', ['Giúp dọn dẹp nhà cửa, trang trí và chúc Tết lễ phép', 'Bẻ cành hoa và vứt rác trong nhà', 'Chỉ chơi mà không giúp người lớn', 'Tự ý đốt pháo ở nơi đông người'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  const [ls] = await c.query("SELECT l.id FROM lessons l JOIN courses c ON c.id=l.courseId WHERE c.slug='tieng-viet-lop-1' AND l.title LIKE ?", [TITLE_LIKE]);
  if (!ls.length) { console.log('KHÔNG thấy lesson', TITLE_LIKE); process.exit(1); }
  const LESSON_ID = ls[0].id;
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('lesson', LESSON_ID, '| vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B78 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
