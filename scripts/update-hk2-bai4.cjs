require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Giải thưởng tình bạn%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Cuộc chạy đua', 'Giải thưởng tình bạn', 'Nai và thỏ', 'Người bạn tốt'], 'B', 'easy', 1, 1),
  sc('Hai con vật tham gia cuộc chạy đua là ai?', ['Nai và hoẵng', 'Thỏ và rùa', 'Sóc và nhím', 'Gà và vịt'], 'A', 'easy', 1, 2),
  sc('Trước vạch xuất phát, nai và hoẵng làm gì?', ['Ngồi nghỉ', 'Xoạc chân lấy đà', 'Uống nước', 'Trò chuyện với nhau'], 'B', 'easy', 1, 3),
  sc('Ai ra hiệu bắt đầu cuộc chạy đua?', ['Khán giả', 'Trọng tài', 'Nai', 'Hoẵng'], 'B', 'easy', 1, 4),
  sc('Sau khi trọng tài ra hiệu, hai bạn chạy như thế nào?', ['Chậm rãi', 'Lao như tên bắn', 'Vừa đi vừa nghỉ', 'Đi từng bước nhỏ'], 'B', 'easy', 1, 5),
  sc('Trong phần đầu cuộc đua, nai và hoẵng ở vị trí nào?', ['Vị trí cuối cùng', 'Vị trí dẫn đầu', 'Ở giữa đoàn', 'Chưa bắt đầu chạy'], 'B', 'easy', 1, 6),
  sc('Hoẵng vấp phải vật gì?', ['Một cành cây', 'Một hòn đá', 'Một chiếc lá', 'Một vũng nước'], 'B', 'easy', 1, 7),
  sc('Sau khi vấp phải hòn đá, hoẵng bị làm sao?', ['Ngã oạch', 'Chạy nhanh hơn', 'Bay lên cao', 'Quay lại vạch xuất phát'], 'A', 'easy', 1, 8),
  sc('Khi hoẵng ngã, nai đã làm gì?', ['Tiếp tục chạy về đích', 'Dừng lại đỡ hoẵng đứng dậy', 'Gọi các bạn khác', 'Ngồi xuống nghỉ'], 'B', 'easy', 1, 9),
  sc('Nai và hoẵng được tặng giải thưởng gì?', ['Giải chạy nhanh nhất', 'Giải thưởng tình bạn', 'Giải về đích đầu tiên', 'Giải vận động viên khỏe nhất'], 'B', 'easy', 1, 10),
  sc('Từ "vạch xuất phát" chỉ nơi nào?', ['Nơi bắt đầu cuộc đua', 'Nơi kết thúc cuộc đua', 'Nơi khán giả ngồi', 'Nơi vận động viên nghỉ'], 'A', 'medium', 2, 1),
  sc('Cụm từ "lấy đà" có nghĩa là gì?', ['Chuẩn bị tư thế để chạy hoặc bật đi', 'Dừng lại để nghỉ ngơi', 'Quay trở lại phía sau', 'Đi thật chậm'], 'A', 'medium', 2, 2),
  sc('Từ "trọng tài" chỉ người làm nhiệm vụ gì?', ['Tham gia chạy đua', 'Điều khiển và giám sát cuộc thi', 'Cổ vũ cho vận động viên', 'Bán vé cho khán giả'], 'B', 'medium', 2, 3),
  sc('Cụm từ "lao như tên bắn" cho biết hai bạn chạy như thế nào?', ['Rất nhanh', 'Rất chậm', 'Không đều', 'Hay dừng lại'], 'A', 'medium', 2, 4),
  sc('Tiếng nào dưới đây chứa vần oăng?', ['xoạc', 'hoẵng', 'oạch', 'bước'], 'B', 'medium', 2, 5, '"hoẵng" có vần "oăng".'),
  sc('Tiếng nào dưới đây chứa vần oac?', ['hoẵng', 'xoạc', 'oạch', 'nước'], 'B', 'medium', 2, 6, '"xoạc" có vần "oac".'),
  sc('Tiếng nào dưới đây chứa vần oach?', ['hoẵng', 'xoạc', 'oạch', 'rượt'], 'C', 'medium', 2, 7, '"oạch" có vần "oach".'),
  sc('Chọn từ thích hợp để hoàn thành câu: Khi học múa, em phải tập (…) chân.', ['đi lại', 'xoạc', 'đứng dậy', 'chạy nhanh'], 'B', 'medium', 2, 8),
  sc('Điền vần ươc hoặc ươt để tạo thành cụm từ đúng: b… đi', ['ươc (bước đi)', 'ươt (bượt đi)'], 'A', 'medium', 2, 9, 'Viết đúng là "bước đi".'),
  sc('Điền vần inh hoặc in để tạo thành từ đúng: đội h…', ['inh (đội hình)', 'in (đội hin)'], 'A', 'medium', 2, 10, 'Viết đúng là "đội hình".'),
  sc('Thứ tự nào đúng với diễn biến câu chuyện?', ['Hoẵng ngã → cuộc đua bắt đầu → nai giúp hoẵng → hai bạn về đích', 'Cuộc đua bắt đầu → hai bạn dẫn đầu → hoẵng ngã → nai giúp hoẵng → hai bạn về đích', 'Nai giúp hoẵng → hai bạn lấy đà → trọng tài ra hiệu → hoẵng ngã', 'Hai bạn về đích → hoẵng ngã → nai tiếp tục chạy → cuộc đua bắt đầu'], 'B', 'hard', 3, 1),
  sc('Vì sao nai và hoẵng về đích cuối cùng?', ['Vì hai bạn chạy quá chậm', 'Vì nai dừng lại giúp hoẵng đứng dậy', 'Vì hai bạn không biết đường', 'Vì trọng tài không cho hai bạn chạy'], 'B', 'hard', 3, 2),
  sc('Vì sao nai cũng được nhận giải thưởng tình bạn?', ['Vì nai chạy nhanh nhất', 'Vì nai đã dừng lại giúp bạn khi bạn gặp khó khăn', 'Vì nai về đích đầu tiên', 'Vì nai là bạn của trọng tài'], 'B', 'hard', 3, 3),
  sc('Câu nào có đủ các vần oăng, oac, oach?', ['Hoẵng xoạc chân rồi ngã oạch.', 'Nai chạy rất nhanh.', 'Hai bạn về đích cuối cùng.', 'Trọng tài ra hiệu xuất phát.'], 'A', 'hard', 3, 4, 'hoẵng (oăng), xoạc (oac), oạch (oach).'),
  sc('Trong câu "Hoẵng xoạc chân rồi ngã oạch", có bao nhiêu tiếng chứa các vần oăng, oac, oach?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 5, 'Ba tiếng đó là hoẵng, xoạc, oạch.'),
  sc('Câu nào hoàn thành đúng yêu cầu của bài: Khi hoẵng ngã, nai (…).', ['tiếp tục chạy thật nhanh', 'vội dừng lại, đỡ hoẵng đứng dậy', 'quay về nhà', 'đứng nhìn rồi bỏ đi'], 'B', 'hard', 3, 6),
  sc('Chi tiết nào thể hiện rõ nhất tình bạn giữa nai và hoẵng?', ['Hai bạn cùng tham gia cuộc đua', 'Hai bạn luôn ở vị trí dẫn đầu', 'Nai dừng lại đỡ hoẵng đứng dậy', 'Hai bạn cùng đứng trước vạch xuất phát'], 'C', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: đỡ hoẵng / nai / đứng dậy / vội dừng lại',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'đỡ hoẵng' },
      { key: '2', text: 'nai' },
      { key: '3', text: 'đứng dậy' },
      { key: '4', text: 'vội dừng lại' },
    ],
    correctAnswerJson: ['2', '4', '1', '3'], // Nai vội dừng lại, đỡ hoẵng đứng dậy
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Nai vội dừng lại, đỡ hoẵng đứng dậy".',
  },
  sc('Hoạt động nào thể hiện các bạn biết đoàn kết với nhau?', ['Cùng học, cùng ăn, cùng chơi và cùng vẽ', 'Tranh giành đồ chơi của nhau', 'Chê bai khi bạn làm sai', 'Không cho bạn tham gia trò chơi'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ câu chuyện là gì?', ['Chiến thắng luôn quan trọng hơn bạn bè', 'Cần biết quan tâm và giúp đỡ bạn khi bạn gặp khó khăn', 'Không nên tham gia các cuộc thi', 'Chỉ nên giúp người về đích đầu tiên'], 'B', 'hard', 3, 10),
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
    console.log('HK2-B4 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
