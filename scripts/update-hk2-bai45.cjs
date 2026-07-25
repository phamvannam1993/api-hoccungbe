require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 7%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng nào dưới đây chứa vần uyên?', ['thuyền', 'xuân', 'buồm', 'nước'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây chứa vần uân?', ['vườn', 'xuân', 'ướt', 'bướm'], 'B', 'easy', 1, 2),
  sc('Tiếng nào dưới đây chứa vần uôm?', ['buồm', 'trường', 'thuyền', 'nắng'], 'A', 'easy', 1, 3),
  sc('Tiếng nào dưới đây chứa vần ươc?', ['nước', 'ươm', 'trời', 'hương'], 'A', 'easy', 1, 4),
  sc('Tiếng nào dưới đây chứa vần ươm?', ['vườn ươm', 'cầu vồng', 'dòng suối', 'đàn cò'], 'A', 'easy', 1, 5, '"ươm" trong "vườn ươm".'),
  sc('Sự vật nào có thể nhìn thấy bằng mắt?', ['Tia nắng', 'Tiếng chim hót', 'Âm thanh ồn ào', 'Tiếng gió thổi'], 'A', 'easy', 1, 6),
  sc('Điều nào được cảm nhận bằng tai?', ['Hoa phượng đỏ', 'Trăng rằm', 'Tiếng chim hót', 'Bầu trời'], 'C', 'easy', 1, 7),
  sc('Điều nào được cảm nhận bằng mũi?', ['Hương thơm ngát', 'Ông sao', 'Đàn cò', 'Mặt trời'], 'A', 'easy', 1, 8),
  sc('Sự vật nào thường xuất hiện vào ban đêm?', ['Trăng rằm', 'Tia nắng', 'Hoa phượng đỏ', 'Đàn cò'], 'A', 'easy', 1, 9),
  sc('Sự vật nào có màu đỏ rực vào mùa hè?', ['Hoa phượng', 'Trăng rằm', 'Ông sao', 'Tia nắng'], 'A', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần uyên – uân – uôm – ươc – ươm?', ['thuyền – xuân – buồm – nước – ươm', 'xuân – thuyền – nước – buồm – ươm', 'buồm – xuân – thuyền – ươm – nước', 'nước – buồm – xuân – thuyền – ươm'], 'A', 'medium', 2, 1),
  sc('Từ ngữ nào có tiếng chứa vần uyên?', ['con thuyền', 'mùa xuân', 'cánh buồm', 'dòng nước'], 'A', 'medium', 2, 2),
  sc('Từ ngữ nào có tiếng chứa vần uân?', ['vườn cây', 'mùa xuân', 'ước mơ', 'cánh buồm'], 'B', 'medium', 2, 3),
  sc('Từ ngữ nào có tiếng chứa vần uôm?', ['cánh buồm', 'dòng suối', 'ngôi trường', 'mặt trời'], 'A', 'medium', 2, 4),
  sc('Từ ngữ nào có tiếng chứa vần ươc?', ['nước suối', 'hương thơm', 'đàn cò', 'tiếng chim'], 'A', 'medium', 2, 5),
  sc('Nhóm nào gồm toàn những sự vật có thể nhìn thấy?', ['Tia nắng, ông mặt trời, bầu trời', 'Tiếng chim hót, âm thanh ồn ào', 'Hương thơm ngát, mùi hoa', 'Tiếng gió, tiếng mưa, tiếng còi'], 'A', 'medium', 2, 6),
  sc('Nhóm nào gồm toàn những điều có thể nghe thấy?', ['Tiếng chim hót, âm thanh ồn ào', 'Hoa phượng đỏ, đàn cò', 'Trăng rằm, ông sao', 'Bầu trời, tia nắng'], 'A', 'medium', 2, 7),
  sc('Nhóm nào có thể cảm nhận bằng mũi?', ['Hương thơm ngát', 'Ông mặt trời', 'Đàn cò trắng', 'Trăng rằm'], 'A', 'medium', 2, 8),
  sc('Từ nào không cùng nhóm với các từ còn lại?', ['Ông mặt trời', 'Bầu trời', 'Trăng rằm', 'Tiếng chim hót'], 'D', 'medium', 2, 9, 'Ba từ còn lại chỉ những sự vật có thể nhìn thấy trên bầu trời.'),
  sc('Câu nào miêu tả đúng cảnh vật buổi sáng?', ['Ông mặt trời tỏa những tia nắng ấm áp.', 'Trăng rằm sáng giữa ban trưa.', 'Các vì sao hiện rõ dưới nắng.', 'Bầu trời tối đen khi mặt trời mọc.'], 'A', 'medium', 2, 10),
  sc('Cách phân loại nào đúng?', ['Nhìn thấy: hoa phượng đỏ; nghe thấy: tiếng chim hót; ngửi thấy: hương thơm ngát', 'Nhìn thấy: tiếng chim hót; nghe thấy: mặt trời; ngửi thấy: đàn cò', 'Nhìn thấy: âm thanh ồn ào; nghe thấy: trăng rằm; ngửi thấy: bầu trời', 'Nhìn thấy: hương thơm; nghe thấy: hoa phượng; ngửi thấy: tiếng chim'], 'A', 'hard', 3, 1),
  sc('Sự vật nào vừa có thể nhìn thấy vừa thường gợi cảm giác ấm áp?', ['Tia nắng', 'Tiếng chim hót', 'Âm thanh ồn ào', 'Hương thơm'], 'A', 'hard', 3, 2),
  sc('Điều nào không thể nhìn thấy trực tiếp nhưng có thể nghe thấy?', ['Âm thanh ồn ào', 'Hoa phượng đỏ', 'Trăng rằm', 'Đàn cò'], 'A', 'hard', 3, 3),
  sc('Câu nào có tiếng chứa vần ươc?', ['Em uống nước sau khi tập thể dục.', 'Mùa xuân có nhiều hoa đẹp.', 'Con thuyền đang ra khơi.', 'Cánh buồm căng gió.'], 'A', 'hard', 3, 4),
  sc('Câu nào có tiếng chứa vần uyên?', ['Chiếc thuyền nhỏ trôi trên sông.', 'Em ngắm hoa phượng đỏ.', 'Chim hót vang trên cành.', 'Mặt trời đang tỏa nắng.'], 'A', 'hard', 3, 5),
  sc('Câu nào có tiếng chứa vần uân?', ['Mùa xuân, cây cối đâm chồi.', 'Dòng nước trong xanh.', 'Cánh buồm no gió.', 'Vườn ươm có nhiều cây non.'], 'A', 'hard', 3, 6),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: trên bầu trời / tỏa sáng / ông mặt trời',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'trên bầu trời' },
      { key: '2', text: 'tỏa sáng' },
      { key: '3', text: 'ông mặt trời' },
    ],
    correctAnswerJson: ['3', '2', '1'], // Ông mặt trời tỏa sáng trên bầu trời
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 7,
    explanation: 'Câu đúng: "Ông mặt trời tỏa sáng trên bầu trời".',
  },
  sc('Câu nào phù hợp nhất để viết về cảnh vật xung quanh?', ['Buổi sáng, tia nắng vàng chiếu xuống hàng cây xanh mát.', 'Tiếng chim hót có màu đỏ rực.', 'Em nhìn thấy hương thơm đang bay.', 'Trăng rằm cất tiếng hót trên cành.'], 'A', 'hard', 3, 8),
  sc('Khi quan sát cảnh vật xung quanh, em nên sử dụng những giác quan nào?', ['Mắt để nhìn, tai để nghe và mũi để ngửi', 'Chỉ dùng mắt', 'Chỉ dùng tai', 'Không cần quan sát'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của phần ôn tập là gì?', ['Ôn các vần đã học và luyện quan sát cảnh vật bằng nhiều giác quan', 'Hướng dẫn cách chăm sóc vật nuôi', 'Kể về một chuyến đi biển', 'Giới thiệu các phương tiện giao thông'], 'A', 'hard', 3, 10),
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
    console.log('HK2-ONTAP7 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
