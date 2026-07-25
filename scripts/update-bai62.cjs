require('dotenv').config();
const mysql = require('mysql2/promise');

const LESSON_ID = 776;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});

const Q = [
  // ── DỄ ──
  sc('Bài học giới thiệu những vần nào?', ['iêc, iên, iêp', 'ong, ông, ung', 'uôn, uông, ươn', 'iêt, iêu, yêu'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần iêc?', ['biển', 'biếc', 'điệp', 'thiên'], 'B', 'easy', 1, 2, '"biếc" có vần "iêc".'),
  sc('Tiếng nào dưới đây có vần iên?', ['biển', 'thiếc', 'thiệp', 'xiếc'], 'A', 'easy', 1, 3, '"biển" có vần "iên".'),
  sc('Tiếng nào dưới đây có vần iêp?', ['điện', 'kiến', 'điệp', 'tiệc'], 'C', 'easy', 1, 4, '"điệp" có vần "iêp".'),
  sc('Ghép âm b với vần iêc và thêm dấu sắc được tiếng nào?', ['biển', 'biếc', 'biết', 'biếp'], 'B', 'easy', 1, 5, 'b + iêc + dấu sắc = "biếc".'),
  sc('Từ nào phù hợp với hình ảnh mặt biển có màu xanh?', ['xanh biếc', 'bờ biển', 'sò điệp', 'tấm thiệp'], 'A', 'easy', 1, 6),
  sc('Nơi tiếp giáp giữa đất liền và biển được gọi là gì?', ['bờ sông', 'bờ hồ', 'bờ biển', 'bờ ruộng'], 'C', 'easy', 1, 7),
  sc('Con vật có hai mảnh vỏ xuất hiện trong bài là gì?', ['cá biển', 'sò điệp', 'rùa biển', 'sứa biển'], 'B', 'easy', 1, 8),
  sc('Vịnh Hạ Long là gì?', ['Một khu chợ', 'Một khu vui chơi', 'Một kì quan thiên nhiên', 'Một ngôi trường'], 'C', 'easy', 1, 9),
  sc('Con vật lớn đang bơi trong hình "Thế giới trong lòng biển" là con gì?', ['Cá heo', 'Cá voi', 'Rùa biển', 'Cá mập'], 'C', 'easy', 1, 10),
  // ── TRUNG BÌNH ──
  sc('Dãy nào gồm toàn các tiếng có vần iêc?', ['thiếc, tiệc, xiếc', 'điện, kiến, thiện', 'diệp, thiệp, tiệp', 'biển, biếc, điệp'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần iên?', ['thiếc, xiếc, biếc', 'điện, kiến, thiện', 'diệp, thiệp, tiệp', 'tiệc, biển, điệp'], 'B', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần iêp?', ['điện, kiến, biển', 'thiếc, tiệc, xiếc', 'diệp, thiệp, tiệp', 'biếc, biển, điệp'], 'C', 'medium', 2, 3),
  sc('Trong câu "Biển xanh biếc", tiếng nào có vần iêc?', ['Biển', 'xanh', 'biếc', 'Biển và xanh'], 'C', 'medium', 2, 4, '"biếc" có vần "iêc".'),
  sc('Trong câu "Biển xanh biếc", tiếng nào có vần iên?', ['Biển', 'xanh', 'biếc', 'xanh biếc'], 'A', 'medium', 2, 5, '"Biển" có vần "iên".'),
  sc('Trong cụm từ "trùng điệp", tiếng nào có vần iêp?', ['trùng', 'điệp', 'cả hai tiếng', 'không có tiếng nào'], 'B', 'medium', 2, 6, '"điệp" có vần "iêp".'),
  sc('Những hòn đảo ở Vịnh Hạ Long soi bóng ở đâu?', ['Trên bầu trời', 'Trên mặt biển', 'Trên bãi cát', 'Trên cánh đồng'], 'B', 'medium', 2, 7),
  sc('Du khách thích làm gì khi đến Vịnh Hạ Long?', ['Ngắm cảnh, tắm mát và đi dạo', 'Leo cây và hái quả', 'Thả diều và đá bóng', 'Đọc sách và học bài'], 'A', 'medium', 2, 8),
  sc('Cụm từ nào miêu tả các hòn đảo ở Vịnh Hạ Long?', ['cao và thẳng', 'lớn nhỏ trùng điệp', 'khô cằn, ít cây', 'bằng phẳng, rộng lớn'], 'B', 'medium', 2, 9),
  sc('Du khách đi dạo ở đâu?', ['Trên những bãi biển', 'Trên những cánh đồng', 'Trong khu chợ', 'Trong lớp học'], 'A', 'medium', 2, 10),
  // ── KHÓ ──
  sc('Trong hai câu "Biển xanh biếc. Những hòn đảo lớn nhỏ trùng điệp.", có bao nhiêu tiếng chứa các vần iêc, iên, iêp?', ['2 tiếng', '3 tiếng', '4 tiếng', '5 tiếng'], 'B', 'hard', 3, 1, 'Các tiếng đó là: biển, biếc, điệp.'),
  sc('Trong đoạn đọc về Vịnh Hạ Long, có bao nhiêu tiếng chứa một trong ba vần iêc, iên, iêp?', ['4 tiếng', '5 tiếng', '6 tiếng', '7 tiếng'], 'C', 'hard', 3, 2, 'Các tiếng đó là: thiên, nhiên, điệp, biển, biếc, biển.'),
  sc('Câu nào có đủ cả ba vần iêc, iên, iêp?', ['Biển xanh biếc, những hòn đảo trùng điệp.', 'Bé xem biểu diễn xiếc.', 'Mẹ mua một tấm thiệp.', 'Kiến bò trên mặt đất.'], 'A', 'hard', 3, 3, '"biếc" (iêc), "biển" (iên), "điệp" (iêp).'),
  sc('Hai tiếng "biển" và "biếc" giống nhau ở điểm nào?', ['Cùng có vần iên', 'Cùng có vần iêc', 'Cùng có âm đầu b', 'Cùng có dấu hỏi'], 'C', 'hard', 3, 4, '"biển" có vần iên, "biếc" có vần iêc; giống nhau ở âm đầu "b".'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['thiếc', 'tiệc', 'xiếc', 'kiến'], 'D', 'hard', 3, 5, '"thiếc, tiệc, xiếc" có vần iêc; "kiến" có vần iên.'),
  // Câu 26 — SẮP XẾP (drag_drop): "Biển xanh biếc"
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: xanh / biển / biếc',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'xanh' }, { key: '2', text: 'biển' }, { key: '3', text: 'biếc' }],
    correctAnswerJson: ['2', '1', '3'], // Biển xanh biếc
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 6,
    explanation: 'Câu đúng: "Biển xanh biếc".',
  },
  sc('Vì sao du khách thích đến Vịnh Hạ Long?', ['Vì nơi đây có nhiều nhà cao tầng', 'Vì nơi đây có cảnh thiên nhiên đẹp và nhiều hoạt động thú vị', 'Vì nơi đây có nhiều cửa hàng', 'Vì nơi đây có nhiều trường học'], 'B', 'hard', 3, 7),
  sc('Từ "điệp" trong "sò điệp" và "trùng điệp" có điểm nào giống nhau?', ['Đều chỉ một con vật', 'Đều miêu tả hòn đảo', 'Đều chứa vần iêp', 'Đều chứa vần iên'], 'C', 'hard', 3, 8),
  sc('Cách ghép tiếng và vần nào dưới đây không đúng?', ['thiếc – vần iêc', 'biển – vần iên', 'điệp – vần iêp', 'thiên – vần iêp'], 'D', 'hard', 3, 9, 'Tiếng "thiên" có vần "iên", không phải vần "iêp".'),
  sc('Em nên làm gì để bảo vệ "thế giới trong lòng biển"?', ['Vứt túi ni-lông xuống biển', 'Bắt các con vật biển mang về nhà', 'Giữ vệ sinh và không xả rác xuống biển', 'Bẻ san hô để làm đồ chơi'], 'C', 'hard', 3, 10),
];

(async () => {
  const c = await mysql.createConnection({
    host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  if (Q.length !== 30) { console.log('LỖI: cần 30 câu, đang có', Q.length); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa câu cũ:', del.affectedRows);
    for (const q of Q) {
      await c.query(
        `INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt)
         VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
        [LESSON_ID, q.questionText, q.questionType,
         q.optionsJson ? JSON.stringify(q.optionsJson) : null,
         JSON.stringify(q.correctAnswerJson), q.explanation || null,
         q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10],
      );
    }
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('XONG. Câu active mới:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI — rollback:', e.message); }
  await c.end();
})();
