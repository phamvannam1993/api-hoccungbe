require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 76%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['oan, oăn, oat, oăt', 'uôn, uông, ươn, ương', 'oa, oe, oai, oay', 'ươc, ươt, ươm, ươp'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần oan?', ['hoạt', 'khoan', 'xoắn', 'thoắt'], 'B', 'easy', 1, 2, '"khoan" có vần "oan".'),
  sc('Tiếng nào dưới đây có vần oăn?', ['xoăn', 'xoan', 'toán', 'hoạt'], 'A', 'easy', 1, 3, '"xoăn" có vần "oăn".'),
  sc('Tiếng nào dưới đây có vần oat?', ['thoăn', 'choắt', 'hoạt', 'xoan'], 'C', 'easy', 1, 4, '"hoạt" có vần "oat".'),
  sc('Tiếng nào dưới đây có vần oăt?', ['khoát', 'loạt', 'thoắt', 'ngoan'], 'C', 'easy', 1, 5, '"thoắt" có vần "oăt".'),
  sc('Trong phần Nhận biết, con vật nào bước khoan thai?', ['Con thỏ', 'Con voi', 'Con ngựa', 'Con hổ'], 'B', 'easy', 1, 6),
  sc('Con vật nào chạy thoăn thoắt?', ['Con voi', 'Con thỏ', 'Con mèo', 'Con chó'], 'B', 'easy', 1, 7),
  sc('Loài hoa nào xuất hiện trong phần Đọc vần?', ['Hoa xoan', 'Hoa đào', 'Hoa mai', 'Hoa sen'], 'A', 'easy', 1, 8),
  sc('Bạn nhỏ trong hình có kiểu tóc gì?', ['Tóc thẳng', 'Tóc dài', 'Tóc xoăn', 'Tóc ngắn'], 'C', 'easy', 1, 9),
  sc('Hình ảnh những chú mèo đang đuổi nhau minh họa từ nào?', ['Nhọn hoắt', 'Hoạt hình', 'Hoa xoan', 'Khoan thai'], 'B', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần oan?', ['khoan, toán, xoan', 'xoắn, ngoằn, thoăn', 'hoạt, khoát, loạt', 'choắt, hoắt, thoắt'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần oăn?', ['khoan, toán, xoan', 'xoắn, ngoằn, thoăn', 'hoạt, khoát, loạt', 'choắt, hoắt, thoắt'], 'B', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần oat?', ['hoạt, khoát, loạt', 'choắt, hoắt, thoắt', 'khoan, xoan, toán', 'xoắn, ngoằn, thoăn'], 'A', 'medium', 2, 3),
  sc('Dãy nào gồm toàn các tiếng có vần oăt?', ['toán, khoan, xoan', 'hoạt, khoát, loạt', 'choắt, hoắt, thoắt', 'xoắn, ngoằn, thoăn'], 'C', 'medium', 2, 4),
  sc('Trong cụm từ "hoa xoan", tiếng nào có vần oan?', ['hoa', 'xoan', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"xoan" có vần "oan".'),
  sc('Trong cụm từ "tóc xoăn", tiếng nào có vần oăn?', ['tóc', 'xoăn', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 6, '"xoăn" có vần "oăn".'),
  sc('Trong cụm từ "hoạt hình", tiếng nào có vần oat?', ['hoạt', 'hình', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 7, '"hoạt" có vần "oat".'),
  sc('Trong cụm từ "nhọn hoắt", tiếng nào có vần oăt?', ['nhọn', 'hoắt', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 8, '"hoắt" có vần "oăt".'),
  sc('Trong vườn, những cây nào đã trổ hoa hàng loạt?', ['Cây xoan và cây khế', 'Cây đào và cây mai', 'Cây cam và cây bưởi', 'Cây chuối và cây mít'], 'A', 'medium', 2, 9),
  sc('Vườn cây ngập tràn màu sắc gì?', ['Sắc đỏ', 'Sắc vàng', 'Sắc tím', 'Sắc trắng'], 'C', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần oan – oăn – oat – oăt?', ['khoan – thoăn – hoạt – thoắt', 'thoăn – khoan – thoắt – hoạt', 'hoạt – thoắt – khoan – thoăn', 'thoắt – hoạt – thoăn – khoan'], 'A', 'hard', 3, 1),
  sc('Câu nào có đủ cả bốn vần oan, oăn, oat, oăt?', ['Trên phim hoạt hình, voi bước khoan thai, thỏ chạy thoăn thoắt.', 'Cây xoan đã trổ hoa.', 'Bạn nhỏ có mái tóc xoăn.', 'Những chiếc bút chì nhọn hoắt.'], 'A', 'hard', 3, 2, 'khoan (oan), thoăn (oăn), hoạt (oat), thoắt (oăt).'),
  sc('Trong câu "Trên phim hoạt hình, voi bước khoan thai, thỏ chạy thoăn thoắt", có bao nhiêu tiếng chứa các vần đang học?', ['Hai tiếng', 'Ba tiếng', 'Bốn tiếng', 'Năm tiếng'], 'C', 'hard', 3, 3, 'Các tiếng đó là hoạt, khoan, thoăn, thoắt.'),
  sc('Trong đoạn đọc về khu vườn, có những tiếng nào chứa các vần đang học?', ['xoan, loạt, thoăn, thoắt', 'vườn, tím, sáng, ràng', 'khế, hoa, cành, vui', 'lích, rích, nhảy, nhót'], 'A', 'hard', 3, 4),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['khoan', 'toán', 'xoan', 'xoắn'], 'D', 'hard', 3, 5, '"khoan, toán, xoan" có vần oan; "xoắn" có vần oăn.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['xoan – vần oan', 'thoăn – vần oăn', 'hoạt – vần oat', 'thoắt – vần oat'], 'D', 'hard', 3, 6, 'Tiếng "thoắt" có vần "oăt", không phải vần "oat".'),
  sc('Mỗi buổi sáng, âm thanh nào làm khu vườn rộn ràng?', ['Tiếng xe chạy', 'Tiếng lích ra lích rích của những chú chích bông', 'Tiếng mưa rơi', 'Tiếng trống trường'], 'B', 'hard', 3, 7),
  sc('Những chú chích bông di chuyển như thế nào?', ['Bay chậm trên bầu trời', 'Thoăn thoắt nhảy từ cành này sang cành khác', 'Nằm ngủ dưới gốc cây', 'Bơi dưới ao'], 'B', 'hard', 3, 8),
  sc('Chú chích bông thường bắt gì để bảo vệ cây?', ['Bắt sâu', 'Bắt cá', 'Bắt bướm', 'Bắt ong'], 'A', 'hard', 3, 9, 'Chích bông bắt sâu, giúp bảo vệ cây cối trong vườn.'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: những chú chích bông / thoăn thoắt / từ cành này / sang cành khác / nhảy',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'những chú chích bông' },
      { key: '2', text: 'thoăn thoắt' },
      { key: '3', text: 'từ cành này' },
      { key: '4', text: 'sang cành khác' },
      { key: '5', text: 'nhảy' },
    ],
    correctAnswerJson: ['1', '2', '5', '3', '4'], // Những chú chích bông thoăn thoắt nhảy từ cành này sang cành khác
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 10,
    explanation: 'Câu đúng: "Những chú chích bông thoăn thoắt nhảy từ cành này sang cành khác".',
  },
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
    console.log('B76 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
