require('dotenv').config();
const mysql = require('mysql2/promise');

const LESSON_ID = 777;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});

const Q = [
  // ── DỄ ──
  sc('Bài học giới thiệu những vần nào?', ['iêc, iên, iêp', 'iêng, iêm, yên', 'ong, ông, ung', 'uông, ương, ươn'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần iêng?', ['kiếm', 'yến', 'riêng', 'xiêm'], 'C', 'easy', 1, 2, '"riêng" có vần "iêng".'),
  sc('Tiếng nào dưới đây có vần iêm?', ['liệng', 'kiếm', 'yên', 'kiểng'], 'B', 'easy', 1, 3, '"kiếm" có vần "iêm".'),
  sc('Tiếng nào dưới đây có vần yên?', ['yến', 'diễm', 'riêng', 'liệng'], 'A', 'easy', 1, 4, '"yến" có vần "yên".'),
  sc('Loài chim nào được nhắc đến trong phần Nhận biết?', ['Chim sẻ', 'Yến phụng', 'Chim công', 'Đại bàng'], 'B', 'easy', 1, 5),
  sc('Yến phụng có bộ lông màu gì?', ['Màu tím biêng biếc', 'Màu đỏ rực', 'Màu vàng nhạt', 'Màu đen tuyền'], 'A', 'easy', 1, 6),
  sc('Loại quả có nhiều gai xuất hiện trong bài là gì?', ['Quả mít', 'Quả cam', 'Sầu riêng', 'Quả xoài'], 'C', 'easy', 1, 7),
  sc('Loài cá có chiếc mỏ dài giống thanh kiếm là gì?', ['Cá kiếm', 'Cá chép', 'Cá thu', 'Cá rô'], 'A', 'easy', 1, 8),
  sc('Hình ảnh những con chim nằm trong tổ được gọi là gì?', ['Tổ cò', 'Tổ yến', 'Tổ ong', 'Tổ kiến'], 'B', 'easy', 1, 9),
  sc('Hà theo bố đến đâu?', ['Sân trường', 'Công viên', 'Sân chim', 'Bờ biển'], 'C', 'easy', 1, 10),
  // ── TRUNG BÌNH ──
  sc('Dãy nào gồm toàn các tiếng có vần iêng?', ['kiểng, liệng, riêng', 'diễm, kiếm, xiêm', 'yến, yên, kiếm', 'riêng, xiêm, yến'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần iêm?', ['kiểng, liệng, riêng', 'diễm, kiếm, xiêm', 'yến, yên, riêng', 'liệng, kiếm, yến'], 'B', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần yên?', ['yến, yên', 'kiếm, xiêm', 'riêng, liệng', 'diễm, kiểng'], 'A', 'medium', 2, 3),
  sc('Trong cụm từ "tím biêng biếc", tiếng nào có vần iêng?', ['tím', 'biêng', 'biếc', 'tím và biếc'], 'B', 'medium', 2, 4, '"biêng" có vần "iêng".'),
  sc('Trong cụm từ "diêm dúa", tiếng nào có vần iêm?', ['diêm', 'dúa', 'cả hai tiếng', 'không có tiếng nào'], 'A', 'medium', 2, 5, '"diêm" có vần "iêm".'),
  sc('Trong cụm từ "Yến phụng", tiếng nào có vần yên?', ['Yến', 'phụng', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 6, '"Yến" có vần "yên".'),
  sc('Sân chim có những loài chim nào?', ['Cò, diệc, sáo và bồ nông', 'Gà, vịt, ngan và ngỗng', 'Công, phượng và đại bàng', 'Sẻ, chào mào và họa mi'], 'A', 'medium', 2, 7),
  sc('Hà nhìn thấy những đàn chim có màu sắc như thế nào?', ['Cò đen, diệc trắng', 'Cò trắng, diệc xám', 'Cò vàng, diệc xanh', 'Cò xám, diệc đỏ'], 'B', 'medium', 2, 8),
  sc('Sau một ngày đi kiếm ăn, những đàn chim bay về đâu?', ['Về tổ', 'Về đồng ruộng', 'Về bờ biển', 'Về sân nhà'], 'A', 'medium', 2, 9),
  sc('Cảnh sân chim khi các đàn chim trở về được miêu tả như thế nào?', ['Rất ồn ào và đáng sợ', 'Thật yên bình', 'Rất vắng vẻ', 'Tối tăm và lạnh lẽo'], 'B', 'medium', 2, 10),
  // ── KHÓ ──
  sc('Dãy nào lần lượt chứa các vần iêng – iêm – yên?', ['liệng – kiếm – yên', 'kiếm – yên – liệng', 'yến – riêng – xiêm', 'xiêm – liệng – yến'], 'A', 'hard', 3, 1),
  sc('Câu nào có đủ cả ba vần iêng, iêm, yên?', ['Yến phụng có bộ lông tím biêng biếc, trông rất diêm dúa.', 'Hà theo bố đến sân chim.', 'Từng đàn chim ríu rít về tổ.', 'Những đàn cò trắng đậu trên cây.'], 'A', 'hard', 3, 2, '"Yến" (yên), "biêng" (iêng), "diêm" (iêm).'),
  sc('Trong câu "Yến phụng có bộ lông tím biêng biếc, trông rất diêm dúa.", có bao nhiêu tiếng chứa các vần iêng, iêm, yên?', ['2 tiếng', '3 tiếng', '4 tiếng', '5 tiếng'], 'B', 'hard', 3, 3, 'Các tiếng đó là: Yến, biêng, diêm.'),
  sc('Trong đoạn đọc về sân chim, có bao nhiêu tiếng chứa một trong ba vần iêng, iêm, yên?', ['2 tiếng', '3 tiếng', '4 tiếng', '5 tiếng'], 'B', 'hard', 3, 4, 'Các tiếng đó là: liệng, kiếm, yên.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['kiểng', 'liệng', 'riêng', 'kiếm'], 'D', 'hard', 3, 5, '"kiểng, liệng, riêng" có vần iêng; "kiếm" có vần iêm.'),
  sc('Hai tiếng "yến" trong "Yến phụng" và "tổ yến" giống nhau ở điểm nào?', ['Đều có vần yên', 'Đều có vần iêm', 'Đều có vần iêng', 'Đều không có dấu thanh'], 'A', 'hard', 3, 6),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Chim về tổ → Hà đến sân chim → chim đi kiếm ăn', 'Hà theo bố đến sân chim → Hà quan sát các đàn chim → chim ríu rít về tổ', 'Hà về nhà → chim bay liệng → Hà đến sân chim', 'Chim đậu trên cây → Hà đi học → chim bay về tổ'], 'B', 'hard', 3, 7),
  sc('Vì sao cảnh sân chim cuối ngày trông thật yên bình?', ['Vì không có con chim nào ở đó', 'Vì từng đàn chim ríu rít trở về tổ sau một ngày kiếm ăn', 'Vì tất cả các cây đã bị chặt', 'Vì Hà và bố đã rời đi'], 'B', 'hard', 3, 8),
  // Câu 29 — SẮP XẾP (drag_drop): "Từng đàn chim ríu rít về tổ"
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đàn chim / về tổ / từng / ríu rít',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'đàn chim' }, { key: '2', text: 'về tổ' }, { key: '3', text: 'từng' }, { key: '4', text: 'ríu rít' }],
    correctAnswerJson: ['3', '1', '4', '2'], // Từng đàn chim ríu rít về tổ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Từng đàn chim ríu rít về tổ".',
  },
  sc('Em nên làm gì để bảo vệ các loài chim?', ['Phá tổ và lấy trứng chim', 'Săn bắt chim để làm đồ chơi', 'Bảo vệ cây xanh, không phá tổ và không săn bắt chim', 'Ném đá vào những đàn chim'], 'C', 'hard', 3, 10),
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
