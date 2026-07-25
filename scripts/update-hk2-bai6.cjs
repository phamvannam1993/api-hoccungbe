require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 1%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng "xoạc" chứa vần nào?', ['oac', 'oăc', 'oach', 'oăng'], 'A', 'easy', 1, 1),
  sc('Tiếng "ngoắc" chứa vần nào?', ['oam', 'oăm', 'oăc', 'oac'], 'C', 'easy', 1, 2),
  sc('Tiếng "ngoạm" chứa vần nào?', ['oam', 'oăm', 'oăng', 'oach'], 'A', 'easy', 1, 3),
  sc('Tiếng "khoằm" chứa vần nào?', ['oam', 'oăm', 'oăc', 'oac'], 'B', 'easy', 1, 4),
  sc('Tiếng "huơ" chứa vần nào?', ['ươ', 'uơ', 'ua', 'uô'], 'B', 'easy', 1, 5),
  sc('Tiếng "oạch" chứa vần nào?', ['oac', 'oăc', 'oach', 'oăng'], 'C', 'easy', 1, 6),
  sc('Tiếng "hoẵng" chứa vần nào?', ['oang', 'oăng', 'oach', 'oăm'], 'B', 'easy', 1, 7),
  sc('Nam là học sinh lớp nào?', ['Lớp 1A', 'Lớp 1B', 'Lớp 2A', 'Lớp 2B'], 'A', 'easy', 1, 8),
  sc('Nam học ở trường nào?', ['Trường Tiểu học Nguyễn Du', 'Trường Tiểu học Kim Đồng', 'Trường Tiểu học Lê Quý Đôn', 'Trường Tiểu học Nguyễn Trãi'], 'C', 'easy', 1, 9),
  sc('Từ ngữ nào dùng để chỉ tình cảm bạn bè?', ['Đọc sách', 'Thân thiết', 'Đá bóng', 'Khỏe mạnh'], 'B', 'easy', 1, 10),
  sc('Nhóm nào gồm toàn những từ ngữ chỉ tình cảm bạn bè?', ['Thân thiết, gần gũi, quý mến', 'Đọc sách, đá bóng, khỏe mạnh', 'Gần gũi, thông minh, đá bóng', 'Quý mến, đọc sách, khỏe mạnh'], 'A', 'medium', 2, 1),
  sc('Từ nào dưới đây chỉ một hoạt động?', ['Thân thiết', 'Gần gũi', 'Đọc sách', 'Quý mến'], 'C', 'medium', 2, 2),
  sc('Điền từ thích hợp: Về đích cuối cùng, nhưng nai và hoẵng đều được nhận (…) tình bạn.', ['sinh nhật', 'giải thưởng', 'đôi tai', 'học sinh'], 'B', 'medium', 2, 3, 'Cụm đúng: "giải thưởng tình bạn".'),
  sc('Điền từ thích hợp: Voi con bị ốm vào đúng dịp (…) của mình.', ['sinh nhật', 'khai giảng', 'nghỉ hè', 'Trung thu'], 'A', 'medium', 2, 4),
  sc('Điền từ thích hợp: Thỏ có (…) vừa dài vừa to.', ['đôi chân', 'đôi mắt', 'đôi tai', 'đôi cánh'], 'C', 'medium', 2, 5),
  sc('Điền từ thích hợp vào câu thơ: Ai là (…) gió? / Mà gió đi tìm.', ['bạn', 'mẹ', 'cô', 'em'], 'A', 'medium', 2, 6),
  sc('Điền từ thích hợp: Nam là (…) lớp 1A, Trường Tiểu học Lê Quý Đôn.', ['giáo viên', 'học sinh', 'phụ huynh', 'hiệu trưởng'], 'B', 'medium', 2, 7),
  sc('Tên người bạn của Hà tìm được ở hàng dọc màu vàng là gì?', ['Nam', 'Minh', 'Thanh', 'Hùng'], 'C', 'medium', 2, 8),
  sc('Câu nào phù hợp để Nam giới thiệu về mình?', ['Tôi là Nam, học sinh lớp 1A, Trường Tiểu học Lê Quý Đôn.', 'Nam là cô giáo của lớp 1A.', 'Tôi là Nam, học sinh lớp 2A.', 'Nam học tại Trường Trung học Lê Quý Đôn.'], 'A', 'medium', 2, 9),
  sc('Câu nào nói đúng về sở thích của Nam?', ['Nam thích đọc truyện tranh.', 'Nam không thích làm quen bạn mới.', 'Nam chỉ thích ngủ.', 'Nam không tham gia hoạt động nào.'], 'A', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần oac – oăc – oam – oăm?', ['xoạc – ngoắc – ngoạm – khoằm', 'ngoắc – xoạc – khoằm – ngoạm', 'ngoạm – khoằm – xoạc – ngoắc', 'khoằm – ngoạm – ngoắc – xoạc'], 'A', 'hard', 3, 1),
  sc('Dãy nào lần lượt chứa các vần uơ – oach – oăng?', ['huơ – oạch – hoẵng', 'oạch – huơ – hoẵng', 'hoẵng – oạch – huơ', 'huơ – hoẵng – oạch'], 'A', 'hard', 3, 2),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['xoạc – vần oac', 'ngoắc – vần oăc', 'ngoạm – vần oăm', 'hoẵng – vần oăng'], 'C', 'hard', 3, 3, 'Tiếng "ngoạm" chứa vần "oam", không phải vần "oăm".'),
  sc('Câu nào có tiếng chứa cả vần oăng và vần oach?', ['Hoẵng chạy rồi ngã oạch.', 'Voi con huơ vòi.', 'Vẹt có chiếc mỏ khoằm.', 'Chú mèo ngoạm con cá.'], 'A', 'hard', 3, 4, 'hoẵng (oăng), oạch (oach).'),
  sc('Trong câu "Hoẵng xoạc chân rồi ngã oạch", có bao nhiêu tiếng chứa các vần đang ôn?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 5, 'Các tiếng đó là hoẵng, xoạc, oạch.'),
  sc('Vì sao từ "đọc sách" không thuộc nhóm từ chỉ tình cảm bạn bè?', ['Vì đó là tên một người', 'Vì đó là một hoạt động', 'Vì đó là tên một con vật', 'Vì đó là một đồ vật'], 'B', 'hard', 3, 6),
  sc('Lời giới thiệu nào đầy đủ và phù hợp nhất để Nam gửi cho người bạn mới?', ['Chào bạn! Mình là Nam, học sinh lớp 1A, Trường Tiểu học Lê Quý Đôn. Mình thích đọc truyện tranh và tập thể dục.', 'Chào bạn! Mình không muốn nói tên và trường của mình.', 'Mình là Nam. Mình không thích có bạn mới.', 'Chào bạn! Mình là giáo viên lớp 1A.'], 'A', 'hard', 3, 7),
  sc('Vì sao Nam nhờ chim bồ câu gửi thư?', ['Để xin nghỉ học', 'Để làm quen với một người bạn', 'Để gửi bài tập cho cô giáo', 'Để mua truyện tranh'], 'B', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: Nam / học sinh lớp 1A / là / Trường Tiểu học Lê Quý Đôn',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'Nam' },
      { key: '2', text: 'học sinh lớp 1A' },
      { key: '3', text: 'là' },
      { key: '4', text: 'Trường Tiểu học Lê Quý Đôn' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Nam là học sinh lớp 1A, Trường Tiểu học Lê Quý Đôn
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Nam là học sinh lớp 1A, Trường Tiểu học Lê Quý Đôn".',
  },
  sc('Việc làm nào giúp tình bạn ngày càng thân thiết?', ['Quan tâm, chia sẻ và giúp đỡ bạn', 'Chê bai điểm chưa tốt của bạn', 'Tranh giành đồ dùng với bạn', 'Không cho bạn cùng chơi'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B6 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
