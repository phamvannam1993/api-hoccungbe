require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 780;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôi, uôm', 'iêt, iêu', 'uôn, uông', 'ươi, ươm'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uôi?', ['buồm', 'muối', 'nhuộm', 'muỗm'], 'B', 'easy', 1, 2, '"muối" có vần "uôi".'),
  sc('Tiếng nào dưới đây có vần uôm?', ['tuổi', 'muỗi', 'buồm', 'nguội'], 'C', 'easy', 1, 3, '"buồm" có vần "uôm".'),
  sc('Ghép âm x với vần uôi được tiếng nào?', ['xôi', 'xuôi', 'xươi', 'xuôm'], 'B', 'easy', 1, 4, 'x + uôi = "xuôi".'),
  sc('Dòng nước nhỏ chảy giữa cây cối trong bài được gọi là gì?', ['Con sông', 'Con suối', 'Cái hồ', 'Mặt biển'], 'B', 'easy', 1, 5),
  sc('Hình ảnh gà gáy khi mặt trời mọc chỉ thời gian nào?', ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'], 'A', 'easy', 1, 6),
  sc('Loại quả xuất hiện trong phần Đọc là quả gì?', ['Quả muỗm', 'Quả bưởi', 'Quả chuối', 'Quả xoài'], 'A', 'easy', 1, 7),
  sc('Trong câu "Thuyền buồm xuôi theo chiều gió", phương tiện nào được nhắc đến?', ['Tàu hỏa', 'Máy bay', 'Thuyền buồm', 'Xe đạp'], 'C', 'easy', 1, 8),
  sc('Thuyền buồm xuôi theo gì?', ['Dòng nước', 'Chiều gió', 'Đám mây', 'Bờ biển'], 'B', 'easy', 1, 9),
  sc('Phương tiện nhỏ hình tròn xuất hiện trong phần Nói là gì?', ['Thuyền thúng', 'Ca nô', 'Tàu ngầm', 'Bè gỗ'], 'A', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uôi?', ['muối, muỗi, nguội, tuổi', 'buồm, muỗm, nhuộm, nhuốm', 'muối, buồm, tuổi, muỗm', 'nguội, nhuộm, muỗi, buồm'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uôm?', ['muối, tuổi, xuôi', 'buồm, muỗm, nhuộm', 'muỗi, nguội, tuổi', 'xuôi, suối, đuôi'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "con suối", tiếng nào có vần uôi?', ['con', 'suối', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"suối" có vần "uôi".'),
  sc('Trong cụm từ "quả muỗm", tiếng nào có vần uôm?', ['quả', 'muỗm', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"muỗm" có vần "uôm".'),
  sc('Điền vần thích hợp vào chỗ trống để tạo thành tiếng "tuổi": t…', ['uôi', 'uôm', 'ươi', 'ươm'], 'A', 'medium', 2, 5),
  sc('Điền vần thích hợp vào chỗ trống để tạo thành tiếng "buồm": b…', ['uôi', 'uôm', 'uôn', 'uông'], 'B', 'medium', 2, 6),
  sc('Buổi sớm mai, ông mặt trời nhô lên từ đâu?', ['Từ sau ngọn núi', 'Từ cánh đồng', 'Từ biển', 'Từ mái nhà'], 'C', 'medium', 2, 7),
  sc('Mặt biển được nhuộm màu gì?', ['Màu đỏ rực', 'Màu xanh biếc', 'Màu vàng nhạt', 'Màu tím'], 'B', 'medium', 2, 8),
  sc('Đàn hải âu làm gì trên bầu trời?', ['Sải cánh bay liệng', 'Đậu trên mái nhà', 'Bơi dưới biển', 'Tìm thức ăn trên bờ'], 'A', 'medium', 2, 9),
  sc('Những chiếc tàu cá đang đi đâu?', ['Ra khơi', 'Nối đuôi nhau vào bờ', 'Đi đến hòn đảo', 'Đứng yên giữa biển'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uôi – uôm?', ['suối – buồm', 'buồm – tuổi', 'nhuộm – nguội', 'muỗm – muối'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uôi và vần uôm?', ['Con suối chảy qua cánh rừng.', 'Thuyền buồm xuôi theo chiều gió.', 'Buổi sáng, mặt trời nhô lên.', 'Quả muỗm đã chín.'], 'B', 'hard', 3, 2, '"buồm" có vần uôm; "xuôi" có vần uôi.'),
  sc('Trong câu "Thuyền buồm xuôi theo chiều gió", có bao nhiêu tiếng chứa vần uôi hoặc uôm?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là "buồm" và "xuôi".'),
  sc('Trong đoạn đọc về cảnh biển buổi sáng, có bao nhiêu tiếng chứa vần uôi hoặc uôm?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'C', 'hard', 3, 4, 'Các tiếng đó là: buổi, nhuộm, buồm, đuôi.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['muối', 'muỗi', 'tuổi', 'buồm'], 'D', 'hard', 3, 5, '"muối, muỗi, tuổi" có vần uôi; "buồm" có vần uôm.'),
  sc('Từ nào dưới đây được ghép với vần chưa đúng?', ['suối – vần uôi', 'tuổi – vần uôi', 'nhuộm – vần uôm', 'buồm – vần uôi'], 'D', 'hard', 3, 6, 'Tiếng "buồm" có vần "uôm", không phải vần "uôi".'),
  sc('Thứ tự nào đúng với nội dung đoạn đọc?', ['Mặt trời nhô lên → hải âu bay liệng → tàu cá nối đuôi nhau vào bờ', 'Tàu cá vào bờ → mặt trời lặn → hải âu đi ngủ', 'Hải âu bay → trời tối → thuyền buồm vào cảng', 'Mặt trời lặn → tàu cá ra khơi → biển đổi màu'], 'A', 'hard', 3, 7),
  sc('Vì sao những cánh buồm có thể căng lên?', ['Vì có gió thổi', 'Vì có mưa rơi', 'Vì có sóng lớn', 'Vì thuyền đứng yên'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: những chiếc tàu cá / vào bờ / nối đuôi nhau',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'những chiếc tàu cá' }, { key: '2', text: 'vào bờ' }, { key: '3', text: 'nối đuôi nhau' }],
    correctAnswerJson: ['1', '3', '2'], // Những chiếc tàu cá nối đuôi nhau vào bờ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Những chiếc tàu cá nối đuôi nhau vào bờ".',
  },
  sc('Khi đi lại trên biển, em nên làm gì để bảo đảm an toàn?', ['Tự ý đứng sát mép thuyền', 'Đùa nghịch và chạy trên thuyền', 'Mặc áo phao và nghe theo hướng dẫn của người lớn', 'Nhảy xuống biển khi thuyền đang chạy'], 'C', 'hard', 3, 10),
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
    console.log('B66 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI — rollback:', e.message); }
  await c.end();
})();
