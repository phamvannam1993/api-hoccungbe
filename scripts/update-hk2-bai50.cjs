require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Nhớ ơn%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đồng dao có tên là gì?', ['Người trồng cây', 'Nhớ ơn', 'Ăn quả nhớ người trồng cây', 'Công việc nhà nông'], 'B', 'easy', 1, 1),
  sc('Khi ăn một bát cơm, chúng ta nhớ đến ai?', ['Người cày ruộng', 'Người chèo đò', 'Người đào ao', 'Người mắc dây'], 'A', 'easy', 1, 2),
  sc('Khi ăn đĩa rau muống, chúng ta nhớ đến ai?', ['Người vun gốc', 'Người đào ao', 'Người đi mò', 'Người trồng cây'], 'B', 'easy', 1, 3),
  sc('Khi ăn một quả đào, chúng ta nhớ đến ai?', ['Người cày ruộng', 'Người chèo chống', 'Người vun gốc', 'Người đi mò'], 'C', 'easy', 1, 4),
  sc('Khi ăn một con ốc, chúng ta nhớ đến ai?', ['Người đi mò', 'Người trồng trọt', 'Người đào ao', 'Người cày ruộng'], 'A', 'easy', 1, 5),
  sc('Khi sang đò, chúng ta nhớ đến ai?', ['Người mắc dây', 'Người chèo chống', 'Người vun gốc', 'Người cày ruộng'], 'B', 'easy', 1, 6),
  sc('Khi nằm võng, chúng ta nhớ đến ai?', ['Người mắc dây', 'Người đi mò', 'Người trồng trọt', 'Người đào ao'], 'A', 'easy', 1, 7),
  sc('Khi đứng mát dưới gốc cây, chúng ta nhớ đến ai?', ['Người chèo đò', 'Người cày ruộng', 'Người trồng trọt', 'Người đi mò'], 'C', 'easy', 1, 8),
  sc('Trong tranh, các bạn nhỏ đang làm gì dưới gốc cây?', ['Học bài', 'Ăn quả đào và trò chuyện', 'Chơi đá bóng', 'Tưới cây'], 'B', 'easy', 1, 9),
  sc('Bài Nhớ ơn thuộc thể loại nào?', ['Truyện cổ tích', 'Đồng dao', 'Bài văn miêu tả', 'Câu đố'], 'B', 'easy', 1, 10),
  sc('Từ "cày ruộng" chỉ công việc gì?', ['Làm đất trên ruộng để chuẩn bị trồng cây', 'Chèo thuyền qua sông', 'Hái quả trên cây', 'Đan một chiếc võng'], 'A', 'medium', 2, 1),
  sc('Từ "vun gốc" có nghĩa là gì?', ['Gom đất vào quanh gốc cây để cây đứng vững và phát triển', 'Chặt bỏ toàn bộ cây', 'Múc nước ra khỏi ao', 'Hái hết lá trên cành'], 'A', 'medium', 2, 2),
  sc('Từ "mò" trong bài có nghĩa là gì?', ['Tìm bắt ốc, cua hoặc con vật dưới nước', 'Nhìn lên bầu trời', 'Chạy thật nhanh', 'Gieo hạt trên ruộng'], 'A', 'medium', 2, 3),
  sc('Cụm từ "sang đò" có nghĩa là gì?', ['Đi qua sông bằng đò', 'Đi bộ qua cầu', 'Đi xe đến trường', 'Bơi qua ao'], 'A', 'medium', 2, 4),
  sc('Trồng trọt là công việc nào?', ['Trồng và chăm sóc cây cối, hoa màu', 'Chế tạo máy móc', 'May quần áo', 'Xây dựng nhà cửa'], 'A', 'medium', 2, 5),
  sc('Cặp tiếng nào cùng vần với nhau trong bài?', ['ruộng – muống', 'cơm – cây', 'đào – võng', 'ốc – đò'], 'A', 'medium', 2, 6, '"ruộng" và "muống" cùng vần "uông".'),
  sc('Cặp tiếng nào cùng vần với nhau?', ['đào – ao', 'cây – ruộng', 'võng – ốc', 'cơm – chống'], 'A', 'medium', 2, 7, '"đào" và "ao" cùng vần "ao".'),
  sc('Dòng nào nêu đúng mối liên hệ giữa sản phẩm và người lao động?', ['Cơm – người cày ruộng', 'Quả đào – người chèo đò', 'Con ốc – người mắc dây', 'Chiếc võng – người đào ao'], 'A', 'medium', 2, 8),
  sc('Câu "Ăn quả nhớ kẻ trồng cây" khuyên chúng ta điều gì?', ['Biết ơn những người đã tạo ra thành quả cho mình hưởng', 'Chỉ ăn những quả do mình trồng', 'Không được hái quả trên cây', 'Phải trồng thật nhiều cây ăn quả'], 'A', 'medium', 2, 9),
  sc('Bài đồng dao nhắc chúng ta nhớ ơn những người nào?', ['Những người lao động tạo ra thức ăn và các điều có ích', 'Chỉ những người bán hàng', 'Chỉ những người thân trong gia đình', 'Chỉ những người sống ở thành phố'], 'A', 'medium', 2, 10),
  sc('Vì sao khi ăn cơm, chúng ta cần nhớ người cày ruộng?', ['Vì người cày ruộng đã vất vả làm đất và góp phần tạo ra hạt gạo', 'Vì người cày ruộng làm ra chiếc bát', 'Vì người cày ruộng chèo đò qua sông', 'Vì người cày ruộng đan võng'], 'A', 'hard', 3, 1),
  sc('Điểm chung của những người được nhắc đến trong bài là gì?', ['Đều lao động để tạo ra sản phẩm hoặc giúp ích cho mọi người', 'Đều làm việc trong trường học', 'Đều chỉ làm việc dưới nước', 'Đều là người bán hàng'], 'A', 'hard', 3, 2),
  sc('Việc làm nào thể hiện lòng biết ơn người làm ra hạt gạo?', ['Ăn hết phần cơm, không làm rơi vãi và không lãng phí', 'Bỏ cơm thừa vào thùng rác', 'Chê thức ăn không ngon', 'Làm đổ cơm ra bàn'], 'A', 'hard', 3, 3),
  sc('Việc làm nào thể hiện sự biết ơn người trồng cây?', ['Chăm sóc, bảo vệ cây và không bẻ cành', 'Hái quả xanh rồi vứt đi', 'Khắc chữ lên thân cây', 'Giẫm lên cây non'], 'A', 'hard', 3, 4),
  sc('Sắp xếp các ý sau theo đúng thứ tự xuất hiện trong bài: (1) Nhớ người vun gốc. (2) Nhớ người cày ruộng. (3) Nhớ người đi mò. (4) Nhớ người đào ao.', ['2 – 4 – 1 – 3', '1 – 2 – 3 – 4', '4 – 3 – 2 – 1', '3 – 1 – 4 – 2'], 'A', 'hard', 3, 5),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chúng ta / người lao động / cần / biết ơn',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'chúng ta' },
      { key: '2', text: 'người lao động' },
      { key: '3', text: 'cần' },
      { key: '4', text: 'biết ơn' },
    ],
    correctAnswerJson: ['1', '3', '4', '2'], // Chúng ta cần biết ơn người lao động
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 6,
    explanation: 'Câu đúng: "Chúng ta cần biết ơn người lao động".',
  },
  sc('Câu nào thể hiện đúng nội dung bài?', ['Khi hưởng một thành quả, cần nhớ đến công sức của người tạo ra nó.', 'Mọi sản phẩm đều tự nhiên mà có.', 'Chỉ người lớn mới cần biết ơn.', 'Không cần quan tâm ai đã làm ra thức ăn.'], 'A', 'hard', 3, 7),
  sc('Khi được thầy cô dạy kiến thức, em nên làm gì để thể hiện lòng biết ơn?', ['Lễ phép, chăm học và nghe lời thầy cô', 'Không làm bài tập', 'Nói chuyện trong giờ học', 'Không chào hỏi thầy cô'], 'A', 'hard', 3, 8),
  sc('Khi được ông bà, cha mẹ chăm sóc, em nên làm gì?', ['Lễ phép, yêu thương và giúp đỡ những việc vừa sức', 'Đòi hỏi mọi người phải phục vụ mình', 'Không nghe lời người lớn', 'Chỉ quan tâm đến bản thân'], 'A', 'hard', 3, 9),
  sc('Nội dung chính của bài đồng dao là gì?', ['Nhắc chúng ta trân trọng thành quả và biết ơn những người lao động', 'Hướng dẫn cách trồng cây đào', 'Kể về các trò chơi dưới gốc cây', 'Giới thiệu các món ăn ở nông thôn'], 'A', 'hard', 3, 10),
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
    console.log('NHOON XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
