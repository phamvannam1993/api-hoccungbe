require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Đôi tai xấu xí%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Đôi chân nhanh nhẹn', 'Đôi tai xấu xí', 'Chú thỏ thông minh', 'Những người bạn tốt'], 'B', 'easy', 1, 1),
  sc('Đôi tai của thỏ có đặc điểm gì?', ['Ngắn và nhỏ', 'Dài và to', 'Tròn và bé', 'Mỏng và ngắn'], 'B', 'easy', 1, 2),
  sc('Vì sao thỏ buồn?', ['Vì thỏ bị lạc đường', 'Vì thỏ không có bạn', 'Vì các bạn chê đôi tai của thỏ', 'Vì thỏ bị đau chân'], 'C', 'easy', 1, 3),
  sc('Ai đã động viên thỏ?', ['Thỏ mẹ', 'Thỏ bố', 'Cô giáo', 'Bạn sóc'], 'B', 'easy', 1, 4),
  sc('Thỏ bố nói đôi tai của thỏ như thế nào?', ['Rất xấu', 'Rất nhỏ', 'Rất đẹp', 'Rất yếu'], 'C', 'easy', 1, 5),
  sc('Một lần, thỏ và các bạn đi đâu?', ['Đi học', 'Đi chợ', 'Đi chơi xa', 'Đi tìm thức ăn'], 'C', 'easy', 1, 6),
  sc('Chuyện gì xảy ra khi thỏ và các bạn đi chơi xa?', ['Cả nhóm gặp mưa', 'Cả nhóm quên đường về', 'Cả nhóm bị đau chân', 'Cả nhóm mất thức ăn'], 'B', 'easy', 1, 7),
  sc('Thỏ nghe thấy tiếng của ai?', ['Tiếng của mẹ', 'Tiếng của cô giáo', 'Tiếng của bố', 'Tiếng của bạn sóc'], 'C', 'easy', 1, 8),
  sc('Các bạn đã khen bộ phận nào của thỏ?', ['Đôi mắt', 'Đôi chân', 'Chiếc đuôi', 'Đôi tai'], 'D', 'easy', 1, 9),
  sc('Từ đó, thỏ cảm thấy thế nào về đôi tai của mình?', ['Không còn buồn vì đôi tai nữa', 'Vẫn rất xấu hổ', 'Muốn giấu đôi tai đi', 'Không thích nghe âm thanh'], 'A', 'easy', 1, 10),
  sc('Từ "động viên" có nghĩa là gì?', ['Chê bai người khác', 'Khích lệ, giúp người khác có thêm tự tin', 'Làm người khác sợ hãi', 'Không quan tâm đến người khác'], 'B', 'medium', 2, 1),
  sc('Cụm từ "quên khuấy" có nghĩa là gì?', ['Nhớ rất rõ', 'Quên hoàn toàn', 'Nhớ lại một chút', 'Cố tình không nói'], 'B', 'medium', 2, 2),
  sc('Từ "hoảng sợ" nói lên trạng thái nào?', ['Rất vui vẻ', 'Bình tĩnh', 'Lo lắng và sợ hãi', 'Tự hào'], 'C', 'medium', 2, 3),
  sc('Thỏ nói "Suỵt!" để làm gì?', ['Bảo các bạn giữ im lặng để nghe tiếng gọi', 'Gọi các bạn chạy thật nhanh', 'Rủ các bạn đi chơi tiếp', 'Báo cho các bạn trời sắp mưa'], 'A', 'medium', 2, 4),
  sc('Cụm từ "tấm tắc khen" có nghĩa là gì?', ['Chê rất nhiều', 'Khen ngợi với vẻ thích thú', 'Nói thật nhỏ', 'Không nói gì'], 'B', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Chú mèo (…) nghe tiếng chít chít của lũ chuột.', ['chạy nhanh', 'dỏng tai', 'nhắm mắt', 'ngủ say'], 'B', 'medium', 2, 6),
  sc('Tiếng nào dưới đây chứa vần uây?', ['khuấy', 'hoảng', 'suỵt', 'tuyệt'], 'A', 'medium', 2, 7, '"khuấy" có vần "uây".'),
  sc('Tiếng nào dưới đây chứa vần oang?', ['biết', 'hoảng', 'mít', 'suỵt'], 'B', 'medium', 2, 8, '"hoảng" có vần "oang".'),
  sc('Tiếng nào dưới đây chứa vần uyt?', ['tuyệt', 'biết', 'suỵt', 'khuấy'], 'C', 'medium', 2, 9, '"suỵt" có vần "uyt".'),
  sc('Hoàn thành câu theo nội dung bài: Cả nhóm tìm được đường về nhà nhờ (…).', ['đôi chân của sóc', 'đôi tai thính của thỏ', 'đôi cánh của chim', 'ánh sáng của mặt trời'], 'B', 'medium', 2, 10),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Thỏ bị chê → cả nhóm đi chơi xa → quên đường → thỏ nghe tiếng bố → cả nhóm về nhà', 'Cả nhóm về nhà → thỏ bị chê → thỏ nghe tiếng bố → đi chơi xa', 'Thỏ nghe tiếng bố → đi chơi xa → bị chê → quên đường', 'Thỏ được khen → quên đường → đi chơi xa → bị chê'], 'A', 'hard', 3, 1),
  sc('Vì sao thỏ có thể nghe thấy tiếng bố gọi?', ['Vì thỏ đứng ở nơi cao', 'Vì thỏ có đôi tai dài, to và rất thính', 'Vì bố thỏ đứng ngay bên cạnh', 'Vì các bạn chỉ đường cho thỏ'], 'B', 'hard', 3, 2),
  sc('Vì sao các bạn thay đổi cách nhìn về đôi tai của thỏ?', ['Vì đôi tai giúp cả nhóm tìm được đường về nhà', 'Vì thỏ che đôi tai lại', 'Vì thỏ chạy nhanh nhất', 'Vì thỏ có bộ lông đẹp'], 'A', 'hard', 3, 3),
  sc('Câu nào thể hiện đúng nhất sự thay đổi của thỏ?', ['Từ tự hào trở nên buồn bã', 'Từ buồn vì bị chê đến vui và tự tin về đôi tai', 'Từ vui vẻ trở nên tức giận', 'Từ dũng cảm trở nên sợ hãi'], 'B', 'hard', 3, 4),
  sc('Tiếng nào dưới đây chứa vần uyêt?', ['suỵt', 'mít', 'tuyệt', 'biết'], 'C', 'hard', 3, 5, '"tuyệt" có vần "uyêt".'),
  sc('Tiếng nào dưới đây chứa vần iêt?', ['biết', 'mít', 'suỵt', 'khuấy'], 'A', 'hard', 3, 6, '"biết" có vần "iêt".'),
  sc('Tiếng nào dưới đây chứa vần it?', ['tuyệt', 'biết', 'mít', 'suỵt'], 'C', 'hard', 3, 7, '"mít" có vần "it".'),
  sc('Khi thấy một người bạn có đặc điểm khác biệt, em nên làm gì?', ['Chê cười bạn', 'Trêu chọc bạn trước lớp', 'Tôn trọng và động viên bạn', 'Không chơi với bạn'], 'C', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đôi tai thính / cả nhóm / nhờ / về được nhà / của thỏ',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'đôi tai thính' },
      { key: '2', text: 'cả nhóm' },
      { key: '3', text: 'nhờ' },
      { key: '4', text: 'về được nhà' },
      { key: '5', text: 'của thỏ' },
    ],
    correctAnswerJson: ['3', '1', '5', '2', '4'], // Nhờ đôi tai thính của thỏ, cả nhóm về được nhà
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Nhờ đôi tai thính của thỏ, cả nhóm về được nhà".',
  },
  sc('Bài học phù hợp nhất rút ra từ câu chuyện là gì?', ['Chỉ những đặc điểm đẹp mới có ích', 'Không nên tự ti hoặc chê bai điểm khác biệt của người khác', 'Không nên đi chơi cùng bạn bè', 'Đôi tai dài luôn đẹp hơn đôi tai ngắn'], 'B', 'hard', 3, 10),
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
    console.log('HK2-B2 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
