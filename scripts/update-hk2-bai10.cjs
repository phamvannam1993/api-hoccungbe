require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Quạt cho bà ngủ%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Bà bị ốm', 'Quạt cho bà ngủ', 'Cháu yêu bà', 'Bàn tay bé nhỏ'], 'B', 'easy', 1, 1),
  sc('Trong bài thơ, ai đang bị ốm?', ['Mẹ', 'Bố', 'Bà', 'Em bé'], 'C', 'easy', 1, 2),
  sc('Bạn nhỏ nhờ con chim nào đừng hót nữa?', ['Chim sẻ', 'Chích chòe', 'Chim sâu', 'Chim én'], 'B', 'easy', 1, 3),
  sc('Vì sao bạn nhỏ muốn chim đừng hót?', ['Vì chim hót không hay', 'Vì bà đang ngủ và bị ốm', 'Vì bạn nhỏ muốn học bài', 'Vì trời đã tối'], 'B', 'easy', 1, 4),
  sc('Bạn nhỏ dùng vật gì để quạt cho bà?', ['Chiếc quạt', 'Chiếc khăn', 'Quyển sách', 'Cành cây'], 'A', 'easy', 1, 5),
  sc('Bàn tay của bạn nhỏ được miêu tả như thế nào?', ['To lớn', 'Bé nhỏ', 'Lạnh giá', 'Bị đau'], 'B', 'easy', 1, 6),
  sc('Bạn nhỏ vẫy quạt như thế nào?', ['Thật nhanh', 'Thật mạnh', 'Thật đều', 'Thật chậm'], 'C', 'easy', 1, 7),
  sc('Đôi mắt của bà như thế nào?', ['Mở to', 'Lim dim', 'Đỏ hoe', 'Sáng long lanh'], 'B', 'easy', 1, 8),
  sc('Trong vườn có những loài hoa nào?', ['Hoa hồng và hoa cúc', 'Hoa đào và hoa mai', 'Hoa cam và hoa khế', 'Hoa sen và hoa súng'], 'C', 'easy', 1, 9),
  sc('Bạn nhỏ mong bà làm gì?', ['Đi chơi', 'Ăn cơm', 'Ngủ ngon', 'Ra vườn'], 'C', 'easy', 1, 10),
  sc('Từ "lặng" trong câu "Lặng cho bà ngủ" có nghĩa là gì?', ['Giữ yên lặng, không gây tiếng động', 'Chạy thật nhanh', 'Nói chuyện thật to', 'Hát thật vui'], 'A', 'medium', 2, 1),
  sc('Từ "thiu thiu" miêu tả trạng thái nào?', ['Tỉnh táo hoàn toàn', 'Đang dần buồn ngủ', 'Rất vui vẻ', 'Đang khóc'], 'B', 'medium', 2, 2),
  sc('Từ "lim dim" miêu tả đôi mắt như thế nào?', ['Hơi nhắm lại vì buồn ngủ', 'Mở thật to', 'Nhìn sang hai bên', 'Chớp liên tục'], 'A', 'medium', 2, 3),
  sc('Câu thơ nào cho thấy bạn nhỏ đang quạt cho bà?', ['"Chim đừng hót nữa"', '"Vẫy quạt thật đều"', '"Cốc chén lặng im"', '"Chín lặng trong vườn"'], 'B', 'medium', 2, 4),
  sc('Câu thơ nào cho thấy căn nhà rất yên tĩnh?', ['"Bà em ốm rồi"', '"Bàn tay bé nhỏ"', '"Cốc chén lặng im"', '"Hoa cam, hoa khế"'], 'C', 'medium', 2, 5),
  sc('Tiếng nào cùng vần với tiếng "trắng"?', ['nắng', 'thơm', 'vườn', 'chim'], 'A', 'medium', 2, 6, '"trắng" và "nắng" cùng vần "ăng".'),
  sc('Tiếng nào cùng vần với tiếng "vườn"?', ['sườn', 'trắng', 'thơm', 'đều'], 'A', 'medium', 2, 7, '"vườn" và "sườn" cùng vần "ươn".'),
  sc('Tiếng nào cùng vần với tiếng "thơm"?', ['cơm', 'chim', 'cam', 'quạt'], 'A', 'medium', 2, 8, '"thơm" và "cơm" cùng vần "ơm".'),
  sc('Trong lúc bà ngủ, bạn nhỏ làm gì?', ['Chạy ra ngoài chơi', 'Ngồi vẫy quạt thật đều cho bà', 'Hát thật to', 'Gọi các bạn đến nhà'], 'B', 'medium', 2, 9),
  sc('Khổ thơ cuối cho biết bà mơ thấy điều gì?', ['Tay cháu quạt mang đầy hương thơm', 'Cháu đang đi học', 'Chim chích chòe đang bay', 'Cốc chén đang phát ra tiếng'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Bà ngủ → bạn nhỏ gọi chim → bạn nhỏ ra vườn', 'Bạn nhỏ nhờ chim giữ yên lặng → quạt cho bà → căn nhà yên tĩnh → bà ngủ ngon', 'Chim hót → bà thức dậy → bạn nhỏ đi chơi', 'Bạn nhỏ hái hoa → bà quạt cho cháu → cả nhà trò chuyện'], 'B', 'hard', 3, 1),
  sc('Vì sao bạn nhỏ muốn mọi vật xung quanh đều yên lặng?', ['Để bạn nhỏ học bài', 'Để bà đang ốm có thể ngủ ngon', 'Để chim bay đi nơi khác', 'Để bạn nhỏ được xem phim'], 'B', 'hard', 3, 2),
  sc('Chi tiết nào thể hiện rõ nhất sự chăm sóc của bạn nhỏ dành cho bà?', ['Bạn nhỏ ngắm hoa trong vườn', 'Bạn nhỏ vẫy quạt thật đều cho bà ngủ', 'Bạn nhỏ nhìn chim ngoài cửa sổ', 'Bạn nhỏ ngồi cạnh bàn'], 'B', 'hard', 3, 3),
  sc('Vì sao bạn nhỏ nhắc chim chích chòe đừng hót?', ['Vì tiếng chim có thể làm bà tỉnh giấc', 'Vì bạn nhỏ không thích chim', 'Vì chim làm hỏng vườn cây', 'Vì chim hót quá nhỏ'], 'A', 'hard', 3, 4),
  sc('Hình ảnh "Cốc chén lặng im" giúp người đọc cảm nhận điều gì?', ['Căn nhà rất yên tĩnh', 'Căn nhà đang có tiệc', 'Mọi người đang nói chuyện', 'Bạn nhỏ đang rửa cốc chén'], 'A', 'hard', 3, 5),
  sc('Qua bài thơ, em thấy bạn nhỏ là người như thế nào?', ['Hiếu thảo, biết yêu thương và chăm sóc bà', 'Nghịch ngợm và hay làm ồn', 'Lười biếng, không giúp đỡ ai', 'Ít quan tâm đến gia đình'], 'A', 'hard', 3, 6),
  sc('Hai câu thơ nào thể hiện lời chúc của bạn nhỏ dành cho bà?', ['"Bàn tay bé nhỏ – Vẫy quạt thật đều"', '"Đôi mắt lim dim – Ngủ ngon bà nhé"', '"Hoa cam, hoa khế – Chín lặng trong vườn"', '"Căn nhà đã vắng – Cốc chén lặng im"'], 'B', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: bạn nhỏ / quạt cho bà / thật đều',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'bạn nhỏ' },
      { key: '2', text: 'quạt cho bà' },
      { key: '3', text: 'thật đều' },
    ],
    correctAnswerJson: ['1', '2', '3'], // Bạn nhỏ quạt cho bà thật đều
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Bạn nhỏ quạt cho bà thật đều".',
  },
  sc('Khi ông bà hoặc người thân bị ốm, em nên làm gì?', ['Hỏi thăm, giữ yên lặng và giúp đỡ những việc phù hợp', 'Mở nhạc thật to', 'Rủ nhiều bạn đến chơi', 'Chạy nhảy quanh giường'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài thơ là gì?', ['Con cháu cần yêu thương, kính trọng và chăm sóc ông bà', 'Khi người thân ngủ, nên gọi họ thức dậy', 'Chỉ người lớn mới cần chăm sóc gia đình', 'Không nên đến gần người thân khi họ bị ốm'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B10 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
