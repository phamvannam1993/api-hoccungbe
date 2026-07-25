require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 778;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['iêc, iên, iêp', 'iêng, iêm, yên', 'iêt, iêu, yêu', 'uôt, uôn, uông'], 'C', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần iêt?', ['viết', 'diều', 'yếu', 'yêu'], 'A', 'easy', 1, 2, '"viết" có vần "iêt".'),
  sc('Tiếng nào dưới đây có vần iêu?', ['biết', 'Việt', 'kiểu', 'yêu'], 'C', 'easy', 1, 3, '"kiểu" có vần "iêu".'),
  sc('Tiếng nào dưới đây có vần yêu?', ['chiết', 'chiều', 'diều', 'yếu'], 'D', 'easy', 1, 4, '"yếu" có vần "yêu".'),
  sc('Ghép âm b với vần iêt và thêm dấu sắc được tiếng nào?', ['biết', 'biếu', 'biếc', 'biên'], 'A', 'easy', 1, 5, 'b + iêt + dấu sắc = "biết".'),
  sc('Dụng cụ dùng để đo nhiệt độ trong bài là gì?', ['Đồng hồ', 'Nhiệt kế', 'Thước kẻ', 'Cái cân'], 'B', 'easy', 1, 6),
  sc('Đồ chơi được thả bay trên trời là gì?', ['Quả bóng', 'Chong chóng', 'Con diều', 'Máy bay giấy'], 'C', 'easy', 1, 7),
  sc('Hình ảnh người mẹ ôm và chăm sóc em bé thể hiện từ nào?', ['Yêu chiều', 'Chăm học', 'Vui chơi', 'Đọc sách'], 'A', 'easy', 1, 8),
  sc('Bạn nhỏ trong phần Nhận biết yêu điều gì?', ['Yêu cây', 'Yêu sách', 'Yêu biển', 'Yêu đồ chơi'], 'B', 'easy', 1, 9),
  sc('Nhờ có sách, bạn nhỏ biết được điều gì?', ['Nhiều điều hay', 'Nhiều trò chơi', 'Cách thả diều', 'Cách trồng cây'], 'A', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần iêt?', ['chiết, viết, Việt', 'chiều, diều, kiểu', 'yêu, yếu, yểu', 'biết, diều, yêu'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần iêu?', ['chiết, viết, Việt', 'chiều, diều, kiểu', 'yêu, yếu, yểu', 'nhiệt, diều, yếu'], 'B', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần yêu?', ['yêu, yếu, yểu', 'viết, Việt, biết', 'chiều, diều, kiểu', 'yêu, diều, nhiệt'], 'A', 'medium', 2, 3),
  sc('Trong câu "Em yêu sách", tiếng nào có vần yêu?', ['Em', 'yêu', 'sách', 'Em và sách'], 'B', 'medium', 2, 4, '"yêu" có vần "yêu".'),
  sc('Trong câu "Em biết nhiều điều hay", tiếng nào có vần iêt?', ['Em', 'biết', 'nhiều', 'điều'], 'B', 'medium', 2, 5, '"biết" có vần "iêt".'),
  sc('Trong câu "Em biết nhiều điều hay", có bao nhiêu tiếng mang vần iêu?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'medium', 2, 6, 'Hai tiếng đó là "nhiều" và "điều".'),
  sc('Bố cho Nam và em chơi trò gì?', ['Đá bóng', 'Thả diều', 'Nhảy dây', 'Bịt mắt bắt dê'], 'B', 'medium', 2, 7),
  sc('Bố dạy Nam làm gì để con diều có thể bay cao?', ['Đứng yên và giữ dây', 'Vừa chạy, vừa kéo căng dây và giật giật', 'Thả dây xuống đất', 'Cầm diều chạy vào nhà'], 'B', 'medium', 2, 8),
  sc('Hai anh em ngắm nhìn những cánh diều ở đâu?', ['Trên mặt biển', 'Trên cánh đồng', 'Trên bầu trời', 'Trong sân nhà'], 'C', 'medium', 2, 9),
  sc('Những cánh diều được miêu tả như thế nào?', ['Nhỏ bé và cũ kĩ', 'Sặc sỡ, đáng yêu', 'Màu đen và nặng', 'Trắng tinh và đứng yên'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần iêt – iêu – yêu?', ['biết – diều – yêu', 'diều – biết – yêu', 'yêu – diều – biết', 'biết – yêu – diều'], 'A', 'hard', 3, 1),
  sc('Câu nào có đủ cả ba vần iêt, iêu, yêu?', ['Em yêu sách nên biết nhiều điều hay.', 'Bé đang đọc sách.', 'Nam thả con diều.', 'Bố yêu hai anh em.'], 'A', 'hard', 3, 2, '"biết" (iêt), "nhiều/điều" (iêu), "yêu" (yêu).'),
  sc('Trong câu "Em yêu sách. Nhờ có sách, em biết nhiều điều hay.", có bao nhiêu tiếng chứa các vần iêt, iêu, yêu?', ['Ba tiếng', 'Bốn tiếng', 'Năm tiếng', 'Sáu tiếng'], 'B', 'hard', 3, 3, 'Các tiếng đó là: yêu, biết, nhiều, điều.'),
  sc('Trong đoạn đọc về thả diều, tiếng nào dưới đây có vần iêt?', ['biết', 'diều', 'yêu', 'liệng'], 'A', 'hard', 3, 4, '"biết" có vần "iêt".'),
  sc('Trong đoạn đọc về thả diều, những tiếng nào có vần iêu?', ['biết, thích', 'diều, liệng', 'yêu, cao', 'nhiều, điều'], 'B', 'hard', 3, 5),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['chiết', 'viết', 'Việt', 'diều'], 'D', 'hard', 3, 6, '"chiết, viết, Việt" có vần iêt; "diều" có vần iêu.'),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Hai anh em ngắm diều → bố cho thả diều → bố dạy Nam', 'Bố cho hai anh em thả diều → bố dạy Nam cách thả → hai anh em ngắm những cánh diều', 'Bố dạy Nam → hai anh em về nhà → bố mua diều', 'Nam thả diều → bố đi biển → hai anh em đọc sách'], 'B', 'hard', 3, 7),
  sc('Vì sao Nam phải vừa chạy vừa kéo căng dây và giật giật?', ['Để dây diều bị đứt', 'Để con diều có thể bay cao', 'Để con diều rơi xuống đất', 'Để cuộn dây lại thật nhanh'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: những cánh diều / hai anh em / ngắm nhìn / trên bầu trời',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'những cánh diều' }, { key: '2', text: 'hai anh em' }, { key: '3', text: 'ngắm nhìn' }, { key: '4', text: 'trên bầu trời' }],
    correctAnswerJson: ['2', '3', '1', '4'], // Hai anh em ngắm nhìn những cánh diều trên bầu trời
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Hai anh em ngắm nhìn những cánh diều trên bầu trời".',
  },
  sc('Khi thả diều, em nên làm gì để bảo đảm an toàn?', ['Thả diều gần đường điện', 'Chạy giữa đường đông xe', 'Thả diều ở nơi rộng rãi, xa đường điện và có người lớn hướng dẫn', 'Thả diều khi trời có mưa giông'], 'C', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30 câu, đang có', Q.length); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa câu cũ:', del.affectedRows);
    for (const q of Q) await c.query(
      `INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('XONG. Câu active mới:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI — rollback:', e.message); }
  await c.end();
})();
