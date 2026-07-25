require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 77%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['oa, oe, uy', 'oai, uê, uy', 'oan, oăn, oat', 'ươn, ương, uê'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần oai?', ['khoai', 'huệ', 'thủy', 'lũy'], 'A', 'easy', 1, 2, '"khoai" có vần "oai".'),
  sc('Tiếng nào dưới đây có vần uê?', ['ngoại', 'huy', 'thuê', 'khoai'], 'C', 'easy', 1, 3, '"thuê" có vần "uê".'),
  sc('Tiếng nào dưới đây có vần uy?', ['xoài', 'thủy', 'quê', 'tuế'], 'B', 'easy', 1, 4, '"thủy" có vần "uy".'),
  sc('Ghép âm ng với vần oai và thêm dấu nặng được tiếng nào?', ['ngoái', 'ngoại', 'nguội', 'ngoan'], 'B', 'easy', 1, 5, 'ng + oai + dấu nặng = "ngoại".'),
  sc('Loại củ xuất hiện trong phần Đọc là gì?', ['Khoai sọ', 'Củ cà rốt', 'Củ cải', 'Củ hành'], 'A', 'easy', 1, 6),
  sc('Loại cây xuất hiện trong phần Đọc vần là cây gì?', ['Cây hoa hồng', 'Cây vạn tuế', 'Cây chuối', 'Cây tre'], 'B', 'easy', 1, 7),
  sc('Phương tiện đi lại trên mặt nước trong bài là gì?', ['Tàu hỏa', 'Xe buýt', 'Tàu thủy', 'Máy bay'], 'C', 'easy', 1, 8),
  sc('Quê ngoại của Hà có hàng cây gì?', ['Hàng dừa', 'Lũy tre xanh', 'Hàng thông', 'Hàng phượng'], 'B', 'easy', 1, 9),
  sc('Trong phần Nói, bạn nhỏ đang mơ ước về điều gì?', ['Một lớp học mới', 'Một khu vườn đẹp', 'Một chiếc tàu thủy', 'Một chuyến đi biển'], 'B', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần oai?', ['khoai, ngoái, ngoại', 'huệ, thuê, tuế', 'huy, lũy, thủy', 'khoai, huệ, thủy'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uê?', ['khoai, xoài, ngoại', 'huệ, thuê, tuế', 'huy, lũy, thủy', 'huệ, khoai, lũy'], 'B', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần uy?', ['quê, huệ, tuế', 'khoai, ngoái, xoài', 'huy, lũy, thủy', 'thủy, thuê, ngoại'], 'C', 'medium', 2, 3),
  sc('Trong cụm từ "khoai sọ", tiếng nào có vần oai?', ['khoai', 'sọ', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 4, '"khoai" có vần "oai".'),
  sc('Trong cụm từ "vạn tuế", tiếng nào có vần uê?', ['vạn', 'tuế', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"tuế" có vần "uê".'),
  sc('Trong cụm từ "tàu thủy", tiếng nào có vần uy?', ['tàu', 'thủy', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 6, '"thủy" có vần "uy".'),
  sc('Ngày nghỉ, Hà vui đùa ở đâu?', ['Trong sân trường', 'Ngoài công viên', 'Trong vườn nhà', 'Trên bãi biển'], 'C', 'medium', 2, 7),
  sc('Cây xoài trong vườn có đặc điểm gì?', ['Không có quả', 'Lúc lỉu quả', 'Đang rụng hết lá', 'Chỉ có một bông hoa'], 'B', 'medium', 2, 8),
  sc('Hà cúi trêu đám cây gì đang bò trên mặt đất?', ['Dây khoai lang', 'Dây mướp', 'Dây bí', 'Dây bầu'], 'A', 'medium', 2, 9),
  sc('Hà đưa tay vuốt ve những cánh hoa nào?', ['Hoa hồng', 'Hoa huệ', 'Hoa thủy tiên', 'Hoa đào'], 'C', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần oai – uê – uy?', ['ngoại – huệ – thủy', 'huệ – thủy – ngoại', 'thủy – ngoại – huệ', 'ngoại – thủy – huệ'], 'A', 'hard', 3, 1),
  sc('Câu nào có đủ cả ba vần oai, uê, uy?', ['Quê ngoại có lũy tre xanh.', 'Hà chơi trong vườn nhà.', 'Cây xoài lúc lỉu quả.', 'Những bông huệ đang nở.'], 'A', 'hard', 3, 2, 'ngoại (oai), quê (uê), lũy (uy).'),
  sc('Trong câu "Quê ngoại của Hà có lũy tre xanh, có cây trái xum xuê", có bao nhiêu tiếng chứa các vần oai, uê, uy?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'C', 'hard', 3, 3, 'Các tiếng đó là quê, ngoại, lũy, xuê.'),
  sc('Trong đoạn đọc về khu vườn nhà Hà, có bao nhiêu tiếng chứa các vần oai, uê, uy?', ['Ba tiếng', 'Bốn tiếng', 'Năm tiếng', 'Sáu tiếng'], 'C', 'hard', 3, 4, 'Các tiếng đó là thoải, xoài, khoai, huệ, thủy.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['khoai', 'ngoái', 'ngoại', 'huệ'], 'D', 'hard', 3, 5, '"khoai, ngoái, ngoại" có vần oai; "huệ" có vần uê.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['xoài – vần oai', 'huệ – vần uê', 'thủy – vần uy', 'ngoại – vần uê'], 'D', 'hard', 3, 6, 'Tiếng "ngoại" có vần "oai", không phải vần "uê".'),
  sc('Thứ tự nào phù hợp với nội dung đoạn đọc?', ['Hà chơi với hoa trái → thì thầm với cây xoài → trêu dây khoai lang → vuốt ve hoa thủy tiên', 'Hà vuốt hoa thủy tiên → về nhà → trồng khoai → hái xoài', 'Hà đi học → chơi với hoa → đi tàu thủy → về quê', 'Hà trêu dây khoai → đi ngủ → hái hoa huệ → ra biển'], 'A', 'hard', 3, 7),
  sc('Chi tiết nào cho thấy Hà yêu thích khu vườn nhà?', ['Hà không muốn ra vườn', 'Hà vui đùa, trò chuyện và vuốt ve những cây hoa trong vườn', 'Hà bẻ cành và hái hết hoa', 'Hà bỏ mặc cây cối'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: cây xoài / Hà / lúc lỉu quả / với / thì thầm',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'cây xoài' },
      { key: '2', text: 'Hà' },
      { key: '3', text: 'lúc lỉu quả' },
      { key: '4', text: 'với' },
      { key: '5', text: 'thì thầm' },
    ],
    correctAnswerJson: ['2', '5', '4', '1', '3'], // Hà thì thầm với cây xoài lúc lỉu quả
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Hà thì thầm với cây xoài lúc lỉu quả".',
  },
  sc('Em nên làm gì để có một khu vườn đẹp?', ['Trồng cây, tưới nước, nhổ cỏ và chăm sóc cây thường xuyên', 'Bẻ cành và hái hoa tùy ý', 'Giẫm lên các luống rau', 'Vứt rác trong vườn'], 'A', 'hard', 3, 10),
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
    console.log('B77 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
