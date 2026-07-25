require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Ôn tập%Chủ đề 4%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Tiếng nào dưới đây chứa vần oanh?', ['khoanh', 'điểm', 'suýt', 'nhiều'], 'A', 'easy', 1, 1),
  sc('Tiếng nào dưới đây chứa vần uyt?', ['điểm', 'suýt', 'ngoảnh', 'chiều'], 'B', 'easy', 1, 2),
  sc('Tiếng nào dưới đây chứa vần iêu?', ['nhiều', 'điểm', 'khoanh', 'suýt'], 'A', 'easy', 1, 3),
  sc('Tiếng nào dưới đây chứa vần iêm?', ['điều', 'điểm', 'ngoảnh', 'suýt'], 'B', 'easy', 1, 4),
  sc('Bài nào khuyên chúng ta giữ tay sạch để phòng bệnh?', ['Lời chào', 'Rửa tay trước khi ăn', 'Đèn giao thông', 'Khi mẹ vắng nhà'], 'B', 'easy', 1, 5),
  sc('Bài nào nhắc chúng ta không mở cửa cho người lạ?', ['Khi mẹ vắng nhà', 'Nếu không may bị lạc', 'Lời chào', 'Đèn giao thông'], 'A', 'easy', 1, 6),
  sc('Bài nào hướng dẫn cách xử lí khi bị lạc?', ['Rửa tay trước khi ăn', 'Lời chào', 'Nếu không may bị lạc', 'Đèn giao thông'], 'C', 'easy', 1, 7),
  sc('Bài nào khuyên chúng ta chào hỏi khi gặp người khác?', ['Lời chào', 'Khi mẹ vắng nhà', 'Đèn giao thông', 'Rửa tay trước khi ăn'], 'A', 'easy', 1, 8),
  sc('Bài nào giúp chúng ta hiểu ý nghĩa của đèn đỏ, đèn vàng và đèn xanh?', ['Lời chào', 'Đèn giao thông', 'Khi mẹ vắng nhà', 'Nếu không may bị lạc'], 'B', 'easy', 1, 9),
  sc('Khi được người khác giúp đỡ, em nên nói gì?', ['Xin lỗi', 'Cảm ơn', 'Xin phép', 'Chúc mừng'], 'B', 'easy', 1, 10),
  sc('Lời khuyên nào phù hợp với bài "Rửa tay trước khi ăn"?', ['Không mở cửa cho người lạ', 'Rửa tay sạch trước khi ăn để phòng bệnh', 'Tuân thủ đèn giao thông', 'Nhớ điểm hẹn khi đi chơi'], 'B', 'medium', 2, 1),
  sc('Lời khuyên nào phù hợp với bài "Lời chào"?', ['Nhớ chào hỏi khi gặp gỡ', 'Không được đi một mình', 'Phải rửa tay sau khi ngủ', 'Chỉ chào người quen'], 'A', 'medium', 2, 2),
  sc('Lời khuyên nào phù hợp với bài "Khi mẹ vắng nhà"?', ['Mở cửa khi người ngoài gọi tên mình', 'Không mở cửa cho người lạ khi ở nhà một mình', 'Đi theo người lạ để tìm bố mẹ', 'Tự ý rời khỏi nhà'], 'B', 'medium', 2, 3),
  sc('Lời khuyên nào phù hợp với bài "Nếu không may bị lạc"?', ['Chạy lung tung để tìm người thân', 'Khi đi chơi chỗ đông người, cần chú ý để phòng bị lạc', 'Đi theo bất cứ người lạ nào', 'Không cần nhớ điểm hẹn'], 'B', 'medium', 2, 4),
  sc('Lời khuyên nào phù hợp với bài "Đèn giao thông"?', ['Có thể đi khi đèn đỏ nếu đường vắng', 'Cần tuân thủ sự điều khiển của đèn giao thông', 'Chỉ ô tô mới cần nhìn đèn', 'Người đi bộ không cần quan sát tín hiệu'], 'B', 'medium', 2, 5),
  sc('Khi gặp một người lần đầu và muốn người đó biết về mình, em nên làm gì?', ['Xin lỗi', 'Giới thiệu', 'Cảm ơn', 'Chúc mừng'], 'B', 'medium', 2, 6),
  sc('Khi em có lỗi với người khác, em nên nói gì?', ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Chúc mừng'], 'A', 'medium', 2, 7),
  sc('Khi muốn người khác cho phép mình làm một việc, em nên làm gì?', ['Tự ý thực hiện', 'Xin phép', 'Cảm ơn', 'Giới thiệu'], 'B', 'medium', 2, 8),
  sc('Khi bạn đạt điểm tốt, em nên nói gì?', ['Xin lỗi bạn', 'Chúc mừng bạn', 'Xin phép bạn', 'Tạm biệt bạn'], 'B', 'medium', 2, 9),
  sc('Hai cuốn sách được giới thiệu ở phần đọc mở rộng là gì?', ['Phòng tránh đuối nước và Thực hành kĩ năng sống 1', 'Tích Chu và Cây khế', 'Sóc nâu đi học và Lớp học của mèo con', 'Thỏ và rùa và Sọ Dừa'], 'A', 'medium', 2, 10),
  sc('Bạn Minh cho em mượn bút khi em quên mang. Em nên nói gì?', ['"Mình xin lỗi bạn."', '"Mình cảm ơn bạn."', '"Mình chúc mừng bạn."', '"Mình xin phép bạn."'], 'B', 'hard', 3, 1),
  sc('Em vô ý làm rơi hộp bút của bạn. Em nên làm gì?', ['Bỏ đi và không nói gì', 'Xin lỗi bạn và giúp bạn nhặt đồ', 'Đổ lỗi cho người khác', 'Cười vì bạn bị rơi đồ'], 'B', 'hard', 3, 2),
  sc('Em muốn mượn quyển truyện của chị. Câu nói nào phù hợp nhất?', ['"Đưa truyện cho em!"', '"Chị cho em mượn quyển truyện này được không ạ?"', '"Em lấy truyện nhé!"', '"Chị phải cho em mượn!"'], 'B', 'hard', 3, 3),
  sc('Một người lạ gõ cửa khi em đang ở nhà một mình. Em nên làm gì?', ['Mở cửa ngay', 'Không mở cửa, liên lạc với bố mẹ hoặc người lớn đáng tin cậy', 'Đi ra ngoài nói chuyện với người đó', 'Cho người đó biết em đang ở nhà một mình'], 'B', 'hard', 3, 4),
  sc('Khi bị lạc ở nơi đông người, em nên làm gì?', ['Bình tĩnh, đến điểm hẹn hoặc nhờ nhân viên bảo vệ giúp đỡ', 'Chạy ra khỏi khu vui chơi', 'Đi theo người lạ mời lên xe', 'Trốn ở một nơi kín'], 'A', 'hard', 3, 5),
  sc('Em đang định qua đường nhưng đèn dành cho người đi bộ đang đỏ. Em nên làm gì?', ['Chạy thật nhanh qua đường', 'Đứng chờ đến khi có tín hiệu được phép đi', 'Đi theo xe máy', 'Đi xuống lòng đường để quan sát'], 'B', 'hard', 3, 6),
  sc('Bạn em vừa giành giải trong cuộc thi vẽ. Em nên nói gì?', ['"Bạn phải cho mình phần thưởng."', '"Chúc mừng bạn! Bức tranh của bạn rất đẹp."', '"Mình không quan tâm."', '"Bạn không nên vui."'], 'B', 'hard', 3, 7),
  sc('Câu nào nêu một việc nên làm?', ['Em nên rửa tay sạch trước khi ăn.', 'Em nên mở cửa cho người lạ.', 'Em nên chạy qua đường khi đèn đỏ.', 'Em nên đi theo người lạ khi bị lạc.'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: khi gặp gỡ / chúng ta / nên / chào hỏi',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'khi gặp gỡ' },
      { key: '2', text: 'chúng ta' },
      { key: '3', text: 'nên' },
      { key: '4', text: 'chào hỏi' },
    ],
    correctAnswerJson: ['2', '3', '4', '1'], // Chúng ta nên chào hỏi khi gặp gỡ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Chúng ta nên chào hỏi khi gặp gỡ".',
  },
  sc('Nội dung chính của phần ôn tập là gì?', ['Giúp học sinh biết giữ vệ sinh, giao tiếp lịch sự và xử lí an toàn trong một số tình huống', 'Hướng dẫn học sinh mua đồ chơi', 'Giúp học sinh tự đi chơi ở nơi đông người', 'Khuyên học sinh không cần nghe lời người lớn'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B26 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
