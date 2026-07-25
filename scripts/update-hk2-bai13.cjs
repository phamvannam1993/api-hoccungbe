require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 2%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng "khuya" chứa vần nào?', ['uya', 'uây', 'uyp', 'uyu'], 'A', 'easy', 1, 1),
  sc('Tiếng "khuấy" chứa vần nào?', ['uya', 'uây', 'uynh', 'uych'], 'B', 'easy', 1, 2),
  sc('Tiếng "tuýp" chứa vần nào?', ['uyp', 'uyu', 'uya', 'oong'], 'A', 'easy', 1, 3),
  sc('Tiếng "huỳnh" chứa vần nào?', ['uych', 'uynh', 'uyp', 'uây'], 'B', 'easy', 1, 4),
  sc('Tiếng "huỵch" chứa vần nào?', ['uya', 'uych', 'uyu', 'uynh'], 'B', 'easy', 1, 5),
  sc('Tiếng "khuỷu" chứa vần nào?', ['uyu', 'uyp', 'uây', 'uya'], 'A', 'easy', 1, 6),
  sc('Tiếng "xoong" chứa vần nào?', ['ong', 'oong', 'uông', 'ương'], 'B', 'easy', 1, 7),
  sc('Từ ngữ nào dưới đây chỉ người thân trong gia đình?', ['Cô giáo', 'Bác sĩ', 'Ông nội', 'Bạn nam'], 'C', 'easy', 1, 8),
  sc('Từ ngữ nào dưới đây không chỉ người thân trong gia đình?', ['Chị gái', 'Em trai', 'Bà ngoại', 'Bạn nữ'], 'D', 'easy', 1, 9),
  sc('Trong tranh ở mục "Nói về gia đình em" có những ai?', ['Bố, mẹ và con gái', 'Ông, bà và cháu', 'Bố và hai con trai', 'Mẹ và hai con gái'], 'A', 'easy', 1, 10),
  sc('Dãy nào gồm toàn những từ chỉ người thân trong gia đình?', ['Ông nội, bà nội, anh trai', 'Cô giáo, bác sĩ, bạn nam', 'Bạn nữ, chị gái, cô giáo', 'Bác sĩ, ông ngoại, bạn nam'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn những người không phải là từ chỉ quan hệ gia đình?', ['Cô giáo, bác sĩ, bạn nữ', 'Bà ngoại, ông ngoại, em gái', 'Anh trai, chị gái, em trai', 'Ông nội, bà nội, em gái'], 'A', 'medium', 2, 2),
  sc('Trong cụm từ "đêm khuya", tiếng nào chứa vần uya?', ['đêm', 'khuya', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"khuya" có vần "uya".'),
  sc('Trong cụm từ "khuấy bột", tiếng nào chứa vần uây?', ['khuấy', 'bột', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 4, '"khuấy" có vần "uây".'),
  sc('Trong cụm từ "tuýp thuốc", tiếng nào chứa vần uyp?', ['tuýp', 'thuốc', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 5, '"tuýp" có vần "uyp".'),
  sc('Trong cụm từ "phụ huynh", tiếng nào chứa vần uynh?', ['phụ', 'huynh', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 6, '"huynh" có vần "uynh".'),
  sc('Trong cụm từ "khuỷu tay", tiếng nào chứa vần uyu?', ['khuỷu', 'tay', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 7, '"khuỷu" có vần "uyu".'),
  sc('Trong cụm từ "xoong nồi", tiếng nào chứa vần oong?', ['xoong', 'nồi', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 8, '"xoong" có vần "oong".'),
  sc('Câu nào phù hợp nhất với bức tranh gia đình đi chơi?', ['Gia đình bạn nhỏ vui vẻ đi chơi cùng nhau.', 'Bạn nhỏ đi học một mình.', 'Bố đang nấu cơm trong bếp.', 'Mẹ đang làm việc ở bệnh viện.'], 'A', 'medium', 2, 9),
  sc('Hai cuốn sách được giới thiệu trong phần đọc mở rộng là gì?', ['Người con nuôi hiếu thảo và Tích Chu', 'Thỏ và rùa và Cây khế', 'Dế Mèn phiêu lưu ký và Sọ Dừa', 'Tấm Cám và Cây tre trăm đốt'], 'A', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uya – uây – uyp – uynh – uych – uyu – oong?', ['khuya – khuấy – tuýp – huỳnh – huỵch – khuỷu – xoong', 'khuấy – khuya – huỳnh – tuýp – khuỷu – huỵch – xoong', 'tuýp – khuấy – khuya – huỵch – huỳnh – xoong – khuỷu', 'xoong – khuỷu – huỵch – huỳnh – tuýp – khuấy – khuya'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uyp và vần uyu?', ['Mẹ cầm tuýp thuốc bôi vào khuỷu tay cho bé.', 'Bố rửa xoong nồi trong bếp.', 'Đêm khuya, cả nhà đã ngủ.', 'Mẹ khuấy đều nồi cháo.'], 'A', 'hard', 3, 2, 'tuýp (uyp), khuỷu (uyu).'),
  sc('Trong câu "Đêm khuya, mẹ khuấy thức ăn trong xoong", có bao nhiêu tiếng chứa các vần đang ôn?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 3, 'khuya (uya), khuấy (uây), xoong (oong).'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['khuya – vần uya', 'tuýp – vần uyp', 'huỵch – vần uych', 'khuỷu – vần uynh'], 'D', 'hard', 3, 4, 'Tiếng "khuỷu" chứa vần "uyu", không phải vần "uynh".'),
  sc('Mẹ của bố được gọi là gì?', ['Bà nội', 'Bà ngoại', 'Chị gái', 'Cô giáo'], 'A', 'hard', 3, 5),
  sc('Bố của mẹ được gọi là gì?', ['Ông nội', 'Ông ngoại', 'Anh trai', 'Em trai'], 'B', 'hard', 3, 6),
  sc('Người con trai lớn tuổi hơn em trong gia đình được gọi là gì?', ['Em trai', 'Anh trai', 'Bạn nam', 'Ông nội'], 'B', 'hard', 3, 7),
  sc('Người con gái nhỏ tuổi hơn em trong gia đình được gọi là gì?', ['Chị gái', 'Bà ngoại', 'Em gái', 'Bạn nữ'], 'C', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: gia đình em / yêu thương / luôn / nhau',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'gia đình em' },
      { key: '2', text: 'yêu thương' },
      { key: '3', text: 'luôn' },
      { key: '4', text: 'nhau' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Gia đình em luôn yêu thương nhau
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Gia đình em luôn yêu thương nhau".',
  },
  sc('Việc làm nào thể hiện tình yêu thương đối với gia đình?', ['Lễ phép với ông bà, giúp đỡ bố mẹ và nhường nhịn anh chị em', 'Không nghe lời người lớn', 'Tranh giành đồ chơi với em', 'Vứt đồ dùng bừa bãi để bố mẹ dọn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B13 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
