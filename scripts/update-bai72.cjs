require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 786;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['ươc, ươt', 'ươi, ươu', 'ươm, ươp', 'uôm, uôp'], 'C', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ươm?', ['mướp', 'bướm', 'ướp', 'nượp'], 'B', 'easy', 1, 2, '"bướm" có vần "ươm".'),
  sc('Tiếng nào dưới đây có vần ươp?', ['gươm', 'lượm', 'mướp', 'đượm'], 'C', 'easy', 1, 3, '"mướp" có vần "ươp".'),
  sc('Ghép âm b với vần ươm và thêm dấu sắc được tiếng nào?', ['bướp', 'bướm', 'bườm', 'bượm'], 'B', 'easy', 1, 4, 'b + ươm + dấu sắc = "bướm".'),
  sc('Loài côn trùng có đôi cánh nhiều màu xuất hiện trong bài là con gì?', ['Con ong', 'Con kiến', 'Con bướm', 'Con chuồn chuồn'], 'C', 'easy', 1, 5),
  sc('Loại cây có hoa màu vàng và quả dài trong bài là cây gì?', ['Cây mướp', 'Cây cam', 'Cây chuối', 'Cây bưởi'], 'A', 'easy', 1, 6),
  sc('Hoa mướp có màu gì?', ['Màu đỏ', 'Màu vàng', 'Màu tím', 'Màu trắng'], 'B', 'easy', 1, 7),
  sc('Từ nào miêu tả màu vàng đẹp, tươi sáng?', ['vàng ươm', 'xanh biếc', 'đỏ thắm', 'trắng muốt'], 'A', 'easy', 1, 8),
  sc('Con vật nào được nhắc đến trong đoạn đọc?', ['Chú chó', 'Chú mèo mướp', 'Chú thỏ', 'Chú chim'], 'B', 'easy', 1, 9),
  sc('Chú mèo nằm ở đâu?', ['Trong bếp', 'Trên mái nhà', 'Bên thềm', 'Dưới gầm bàn'], 'C', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần ươm?', ['chườm, lượm, đượm, gươm', 'mướp, nượp, ướp', 'bướm, mướp, ướp', 'gươm, nượp, lượm'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần ươp?', ['bướm, gươm, lượm', 'mướp, nượp, ướp', 'chườm, đượm, ướm', 'bướm, mướp, gươm'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "con bướm", tiếng nào có vần ươm?', ['con', 'bướm', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"bướm" có vần "ươm".'),
  sc('Trong cụm từ "giàn mướp", tiếng nào có vần ươp?', ['giàn', 'mướp', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"mướp" có vần "ươp".'),
  sc('Trong cụm từ "nườm nượp", tiếng nào có vần ươm?', ['nườm', 'nượp', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 5, '"nườm" có vần "ươm".'),
  sc('Trong cụm từ "nườm nượp", tiếng nào có vần ươp?', ['nườm', 'nượp', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 6, '"nượp" có vần "ươp".'),
  sc('Nắng vàng ươm được so sánh với gì?', ['Như hoa', 'Như mật', 'Như lửa', 'Như lá'], 'B', 'medium', 2, 7),
  sc('Chú mèo mướp nằm bên thềm để làm gì?', ['Để ăn cá', 'Để bắt chuột', 'Để sưởi nắng', 'Để uống nước'], 'C', 'medium', 2, 8),
  sc('Đôi mắt của chú mèo được miêu tả như thế nào?', ['Mở to', 'Lim dim', 'Nhắm chặt', 'Đỏ hoe'], 'B', 'medium', 2, 9),
  sc('Sưởi nắng giúp chú mèo như thế nào?', ['Ngủ lâu hơn', 'Ăn khỏe hơn', 'Dẻo dai hơn', 'Chạy chậm hơn'], 'C', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần ươm – ươp?', ['bướm – mướp', 'mướp – bướm', 'ướp – gươm', 'nượp – lượm'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần ươm và vần ươp?', ['Con bướm bay trên vườn hoa.', 'Mẹ đem cá đi ướp.', 'Hoa mướp vàng ươm.', 'Bé nhặt được thanh gươm đồ chơi.'], 'C', 'hard', 3, 2, '"mướp" có vần ươp; "ươm" có vần ươm.'),
  sc('Trong câu "Hoa mướp vàng ươm, bướm bay rập rờn", có bao nhiêu tiếng chứa vần ươm hoặc ươp?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 3, 'Ba tiếng đó là: mướp, ươm, bướm.'),
  sc('Trong đoạn đọc về chú mèo mướp, có bao nhiêu tiếng chứa vần ươm hoặc ươp?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 4, 'Hai tiếng đó là: ươm và mướp.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['chườm', 'lượm', 'gươm', 'mướp'], 'D', 'hard', 3, 5, '"chườm, lượm, gươm" có vần ươm; "mướp" có vần ươp.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['bướm – vần ươm', 'đượm – vần ươm', 'mướp – vần ươp', 'ướp – vần ươm'], 'D', 'hard', 3, 6, 'Tiếng "ướp" có vần "ươp", không phải vần "ươm".'),
  sc('Vì sao không nên nghĩ chú mèo lười khi thấy chú nằm dài?', ['Vì chú mèo đang trốn chủ', 'Vì chú mèo đang sưởi nắng để cơ thể dẻo dai hơn', 'Vì chú mèo đang đợi ăn', 'Vì chú mèo đang canh cửa'], 'B', 'hard', 3, 7),
  sc('Chi tiết nào cho thấy chú mèo đang cảm thấy thích thú?', ['Chú chạy quanh sân', 'Chú kêu thật to', 'Mắt chú lim dim, ria mép rung rinh', 'Chú nhảy lên mái nhà'], 'C', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chú mèo mướp / bên thềm / nằm sưởi nắng',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'chú mèo mướp' }, { key: '2', text: 'bên thềm' }, { key: '3', text: 'nằm sưởi nắng' }],
    correctAnswerJson: ['1', '3', '2'], // Chú mèo mướp nằm sưởi nắng bên thềm
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Chú mèo mướp nằm sưởi nắng bên thềm".',
  },
  sc('Em nên làm gì để chăm sóc vật nuôi?', ['Cho vật nuôi ăn uống đầy đủ, giữ vệ sinh và chăm sóc nhẹ nhàng', 'Trêu chọc vật nuôi khi chúng đang ngủ', 'Bỏ mặc vật nuôi ngoài trời mưa', 'Không cho vật nuôi uống nước'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B72 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
