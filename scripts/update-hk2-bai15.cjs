require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 15: Đi học%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài thơ có tên là gì?', ['Tôi đi học', 'Đi học', 'Ngày đầu đến lớp', 'Trường của em'], 'B', 'easy', 1, 1),
  sc('Hôm qua, ai dắt tay bạn nhỏ tới trường?', ['Bố', 'Mẹ', 'Bà', 'Cô giáo'], 'B', 'easy', 1, 2),
  sc('Mẹ dắt tay bạn nhỏ như thế nào?', ['Từng bước', 'Thật nhanh', 'Vội vàng', 'Chạy thật xa'], 'A', 'easy', 1, 3),
  sc('Hôm nay, mẹ đi đâu?', ['Đi chợ', 'Lên nương', 'Đi học', 'Ra suối'], 'B', 'easy', 1, 4),
  sc('Hôm nay, bạn nhỏ tới lớp cùng ai?', ['Cùng mẹ', 'Cùng bố', 'Một mình', 'Cùng cô giáo'], 'C', 'easy', 1, 5),
  sc('Ngôi trường của bạn nhỏ có đặc điểm gì?', ['Rất lớn', 'Be bé', 'Rất cao', 'Rất mới'], 'B', 'easy', 1, 6),
  sc('Ngôi trường nằm ở đâu?', ['Giữa thành phố', 'Bên bờ biển', 'Giữa rừng cây', 'Trong khu chợ'], 'C', 'easy', 1, 7),
  sc('Cô giáo của bạn nhỏ như thế nào?', ['Tre trẻ', 'Rất già', 'Nghiêm khắc', 'Ít nói'], 'A', 'easy', 1, 8),
  sc('Cô giáo dạy bạn nhỏ làm gì?', ['Vẽ tranh', 'Hát', 'Bơi', 'Nấu ăn'], 'B', 'easy', 1, 9),
  sc('Bài thơ do ai sáng tác?', ['Tô Hà', 'Hoàng Minh Chính', 'Thanh Tịnh', 'Lâm Anh'], 'B', 'easy', 1, 10),
  sc('Từ "nương" trong bài chỉ nơi nào?', ['Mảnh đất trên đồi hoặc núi dùng để trồng trọt', 'Một căn phòng trong nhà', 'Một dòng sông lớn', 'Sân chơi của trường'], 'A', 'medium', 2, 1),
  sc('Từ "thầm thì" miêu tả âm thanh như thế nào?', ['Nhỏ nhẹ, khe khẽ', 'Rất to và dữ dội', 'Chói tai, ồn ào', 'Ngắt quãng, khó nghe'], 'A', 'medium', 2, 2),
  sc('Câu thơ nào cho biết hôm nay bạn nhỏ tự đi học?', ['"Hôm qua em tới trường"', '"Mẹ dắt tay từng bước"', '"Một mình em tới lớp"', '"Dạy em hát rất hay"'], 'C', 'medium', 2, 3),
  sc('Câu thơ nào miêu tả vị trí của ngôi trường?', ['"Trường của em be bé"', '"Nằm lặng giữa rừng cây"', '"Cô giáo em tre trẻ"', '"Râm mát đường em đi"'], 'B', 'medium', 2, 4),
  sc('Nước suối trong bài được miêu tả như thế nào?', ['Đục ngầu và chảy xiết', 'Trong và thầm thì', 'Sâu và lạnh buốt', 'Rộng như biển'], 'B', 'medium', 2, 5),
  sc('Cây cọ làm gì trên đường bạn nhỏ đi học?', ['Xòe ô che nắng', 'Làm đường thêm tối', 'Rụng hết lá', 'Che khuất ngôi trường'], 'A', 'medium', 2, 6),
  sc('Cặp tiếng nào cùng vần với nhau?', ['trường – nương', 'bước – lớp', 'cây – vắng', 'hát – suối'], 'A', 'medium', 2, 7, '"trường" và "nương" cùng vần "ương".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['cây – hay', 'trường – lớp', 'vắng – đi', 'suối – nắng'], 'A', 'medium', 2, 8, '"cây" và "hay" cùng vần "ay".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['vắng – nắng', 'thì – cây', 'bé – lớp', 'bước – trường'], 'A', 'medium', 2, 9, '"vắng" và "nắng" cùng vần "ăng".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['thì – đi', 'lớp – bước', 'trẻ – cây', 'suối – nương'], 'A', 'medium', 2, 10, '"thì" và "đi" cùng vần "i".'),
  sc('Vì sao hôm nay bạn nhỏ phải đi học một mình?', ['Vì mẹ lên nương làm việc', 'Vì bạn nhỏ không muốn đi cùng mẹ', 'Vì trường ở rất gần nhà', 'Vì cô giáo đến đón'], 'A', 'hard', 3, 1),
  sc('Chi tiết nào cho thấy bạn nhỏ đã tự tin và tự lập hơn?', ['Bạn nhỏ được mẹ dắt tay', 'Bạn nhỏ một mình tới lớp', 'Bạn nhỏ đứng bên dòng suối', 'Bạn nhỏ nghe cô giáo hát'], 'B', 'hard', 3, 2),
  sc('Những hình ảnh nào xuất hiện trên đường bạn nhỏ tới trường?', ['Hương rừng, đồi vắng, nước suối và cây cọ', 'Nhà cao tầng, xe buýt và cửa hàng', 'Biển xanh, tàu thuyền và bãi cát', 'Chợ đông, hàng rau và hàng cá'], 'A', 'hard', 3, 3),
  sc('Câu thơ "Cọ xòe ô che nắng" sử dụng hình ảnh nào để tả lá cọ?', ['Lá cọ giống một chiếc ô', 'Lá cọ giống một con thuyền', 'Lá cọ giống một quyển sách', 'Lá cọ giống một bông hoa'], 'A', 'hard', 3, 4),
  sc('Qua bài thơ, ngôi trường hiện lên như thế nào?', ['Nhỏ bé, yên bình và gần gũi với thiên nhiên', 'Rộng lớn, đông đúc và ồn ào', 'Tối tăm, vắng vẻ và đáng sợ', 'Hiện đại, nằm giữa thành phố'], 'A', 'hard', 3, 5),
  sc('Thứ tự nào đúng với nội dung bài thơ?', ['Mẹ dắt bạn đi học → hôm nay bạn tự đi → giới thiệu trường và cô giáo → miêu tả đường đến trường', 'Bạn nhỏ gặp cô giáo → mẹ lên nương → bạn nhỏ về nhà', 'Bạn nhỏ ra suối → mẹ dắt tới trường → cô giáo lên nương', 'Bạn nhỏ tự đi học → mẹ dắt về nhà → trường chuyển đến thành phố'], 'A', 'hard', 3, 6),
  sc('Vì sao con đường tới trường râm mát?', ['Vì những cây cọ xòe lá che nắng', 'Vì trời luôn có mưa', 'Vì bạn nhỏ đi vào ban đêm', 'Vì con đường nằm dưới lòng đất'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: một mình / hôm nay / tới lớp / em',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'một mình' },
      { key: '2', text: 'hôm nay' },
      { key: '3', text: 'tới lớp' },
      { key: '4', text: 'em' },
    ],
    correctAnswerJson: ['2', '1', '4', '3'], // Hôm nay, một mình em tới lớp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Hôm nay, một mình em tới lớp".',
  },
  sc('Khi tự đi học, em nên làm gì để bảo đảm an toàn?', ['Đi đúng đường, chú ý quan sát và không đi theo người lạ', 'Chạy nhảy giữa lòng đường', 'Đi sang những nơi chưa từng biết', 'Mải chơi và đến lớp muộn'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài thơ là gì?', ['Niềm vui đi học và vẻ đẹp của ngôi trường, con đường miền núi', 'Công việc của mẹ trên nương', 'Cách trồng cây cọ trong rừng', 'Một chuyến đi chơi cùng gia đình'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B15 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
