require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Cây liễu dẻo dai%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Cây liễu bên hồ', 'Cây liễu dẻo dai', 'Cây xanh che nắng', 'Cành liễu mềm mại'], 'B', 'easy', 1, 1),
  sc('Khi trời nổi gió to, cây liễu như thế nào?', ['Đứng yên', 'Không ngừng lắc lư', 'Bị bật gốc ngay', 'Rụng hết lá'], 'B', 'easy', 1, 2),
  sc('Ai lo cây liễu sẽ bị gãy?', ['Mẹ', 'Nam', 'Cô giáo', 'Người trồng cây'], 'B', 'easy', 1, 3),
  sc('Nam hỏi ai về cây liễu?', ['Bố', 'Mẹ', 'Bạn học', 'Ông'], 'B', 'easy', 1, 4),
  sc('Nam cho rằng cây liễu trông như thế nào?', ['Cứng cáp', 'Mềm yếu', 'Khô héo', 'Rất thấp'], 'B', 'easy', 1, 5),
  sc('Mẹ bảo Nam điều gì?', ['Cây liễu sẽ bị gãy', 'Cây liễu sẽ không sao', 'Phải chặt cây liễu', 'Phải đưa cây vào nhà'], 'B', 'easy', 1, 6),
  sc('Thân cây liễu có đặc điểm gì?', ['To và cứng', 'Không to nhưng dẻo dai', 'Nhỏ và dễ gãy', 'Rỗng ở bên trong'], 'B', 'easy', 1, 7),
  sc('Cành liễu có đặc điểm gì?', ['Khô cứng', 'Mềm mại', 'Có nhiều gai', 'Ngắn và thẳng'], 'B', 'easy', 1, 8),
  sc('Cành liễu có thể chuyển động theo gì?', ['Dòng nước', 'Chiều gió', 'Ánh nắng', 'Tiếng chim'], 'B', 'easy', 1, 9),
  sc('Bài đọc do ai viết?', ['Hải An', 'Ngọc Hà', 'Trung Nguyên', 'Lâm Anh'], 'A', 'easy', 1, 10),
  sc('Từ "dẻo dai" có nghĩa là gì?', ['Có khả năng chịu lực và khó bị gãy', 'Khô giòn và dễ vỡ', 'Rất nặng và cứng', 'Không thể chuyển động'], 'A', 'medium', 2, 1),
  sc('Từ "lắc lư" miêu tả chuyển động như thế nào?', ['Qua lại nhẹ nhàng theo nhiều phía', 'Đứng im hoàn toàn', 'Rơi thẳng xuống đất', 'Xoay tròn rất nhanh'], 'A', 'medium', 2, 2),
  sc('Từ "mềm mại" có nghĩa là gì?', ['Mềm, nhẹ và uyển chuyển', 'Khô cứng, thô ráp', 'Nặng nề, khó di chuyển', 'Sắc nhọn và nguy hiểm'], 'A', 'medium', 2, 3),
  sc('Vì sao cây liễu không dễ bị gãy khi có gió?', ['Vì cây không có cành', 'Vì thân dẻo dai, cành mềm mại và chuyển động theo gió', 'Vì cây được buộc vào cột', 'Vì gió không thổi tới cây'], 'B', 'medium', 2, 4),
  sc('Vì sao liễu được coi là loài cây dễ trồng?', ['Vì chỉ cần cắm cành xuống đất, cành có thể mọc thành cây non', 'Vì liễu không cần đất', 'Vì liễu chỉ sống trong chậu', 'Vì liễu không cần chăm sóc'], 'A', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Cành liễu rủ lá trông (…) như một mái tóc.', ['dễ gãy', 'mềm mại', 'lắc lư', 'xanh tốt'], 'B', 'medium', 2, 6),
  sc('Chọn từ thích hợp để hoàn thành câu: Tập thể dục hằng ngày giúp cho cơ thể (…).', ['dễ gãy', 'lắc lư', 'dẻo dai', 'mềm yếu'], 'C', 'medium', 2, 7),
  sc('Câu nào nói đúng đặc điểm của cây liễu?', ['Cây liễu cứng nên không chuyển động khi có gió', 'Cây liễu mềm mại nhưng không dễ bị gãy', 'Cây liễu chỉ mọc được từ hạt', 'Cây liễu không thể sống gần nước'], 'B', 'medium', 2, 8),
  sc('Câu nào phù hợp với bức tranh học sinh đi dưới hàng cây?', ['Cây xanh tỏa bóng mát cho học sinh.', 'Học sinh đang chặt cây.', 'Cây làm cho đường đi nóng hơn.', 'Học sinh đang trồng lúa.'], 'A', 'medium', 2, 9),
  sc('Dãy từ nào được viết đúng chính tả?', ['chồi non, đứa trẻ, trồng trọt', 'trồi non, đứa chẻ, chồng trọt', 'chồi non, đứa chẻ, trồng chọt', 'trồi non, đứa trẻ, chồng chọt'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Gió nổi lên → Nam lo lắng → Nam hỏi mẹ → mẹ giải thích đặc điểm của cây liễu', 'Mẹ trồng cây → Nam chặt cành → gió nổi lên', 'Cây bị gãy → Nam hỏi mẹ → mẹ trồng cây mới', 'Nam tưới cây → cây rụng lá → mẹ gọi Nam'], 'A', 'hard', 3, 1),
  sc('Vì sao Nam lo cây liễu bị gãy?', ['Vì Nam thấy cây liễu mềm yếu và lắc lư trong gió', 'Vì cây liễu đã bị chặt mất rễ', 'Vì cây liễu không có lá', 'Vì Nam không thích cây liễu'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy cây liễu có khả năng thích nghi với gió?', ['Cành liễu chuyển động theo chiều gió', 'Lá liễu có màu xanh', 'Cây liễu mọc gần hồ', 'Thân cây liễu không to'], 'A', 'hard', 3, 3),
  sc('Cây liễu mềm nhưng không dễ gãy cho thấy điều gì?', ['Mềm mại không có nghĩa là yếu đuối', 'Cây càng cứng càng dễ trồng', 'Mọi cây mềm đều bị gãy', 'Cây liễu không chịu được gió'], 'A', 'hard', 3, 4),
  sc('Cách trồng cây liễu nào được nhắc đến trong bài?', ['Cắm một cành liễu xuống đất', 'Thả lá liễu xuống nước', 'Đặt cành liễu trên đá', 'Treo cành liễu lên cao'], 'A', 'hard', 3, 5),
  sc('Dãy nào lần lượt điền đúng tr hoặc ch? …ồi non – đứa …ẻ – …ồng trọt', ['ch – tr – tr', 'tr – ch – ch', 'ch – ch – tr', 'tr – tr – ch'], 'C', 'hard', 3, 6, 'Viết đúng: "chồi non – đứa trẻ – trồng trọt".'),
  sc('Dãy nào lần lượt điền đúng r hoặc d? …ễ cây – …ễ dàng – mềm …ẻo', ['r – d – d', 'd – r – r', 'r – r – d', 'd – d – r'], 'A', 'hard', 3, 7, 'Viết đúng: "rễ cây – dễ dàng – mềm dẻo".'),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: cành liễu / theo chiều gió / mềm mại / chuyển động',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'cành liễu' },
      { key: '2', text: 'theo chiều gió' },
      { key: '3', text: 'mềm mại' },
      { key: '4', text: 'chuyển động' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Cành liễu mềm mại, chuyển động theo chiều gió
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Cành liễu mềm mại, chuyển động theo chiều gió".',
  },
  sc('Qua đặc điểm của cây liễu, em có thể rút ra bài học nào?', ['Cần biết linh hoạt, thích nghi trước khó khăn', 'Gặp khó khăn thì nên bỏ cuộc', 'Chỉ người mạnh nhất mới vượt qua thử thách', 'Không cần thay đổi trong bất cứ hoàn cảnh nào'], 'A', 'hard', 3, 9),
  sc('Việc làm nào giúp bảo vệ cây xanh?', ['Tưới cây, không bẻ cành và giữ sạch khu vực quanh gốc', 'Khắc chữ lên thân cây', 'Bẻ cành liễu để chơi', 'Vứt rác quanh gốc cây'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B37 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
