require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 782;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôi, uôm', 'uôc, uôt', 'uôn, uông', 'ươn, ương'], 'C', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uôn?', ['buồng', 'cuốn', 'luống', 'vuông'], 'B', 'easy', 1, 2, '"cuốn" có vần "uôn".'),
  sc('Tiếng nào dưới đây có vần uông?', ['khuôn', 'muộn', 'nguồn', 'luống'], 'D', 'easy', 1, 3, '"luống" có vần "uông".'),
  sc('Ghép âm ch với vần uôn và thêm dấu huyền được tiếng nào?', ['chuồn', 'chuồng', 'chuộn', 'chuông'], 'A', 'easy', 1, 4, 'ch + uôn + dấu huyền = "chuồn".'),
  sc('Con vật nào bay qua các luống rau?', ['Con bướm', 'Con ong', 'Chuồn chuồn', 'Con chim'], 'C', 'easy', 1, 5),
  sc('Chuồn chuồn bay qua đâu?', ['Các luống rau', 'Những mái nhà', 'Mặt hồ', 'Sân trường'], 'A', 'easy', 1, 6),
  sc('Vật nào được dùng để may quần áo?', ['Cuộn chỉ', 'Buồng chuối', 'Quả chuông', 'Chiếc lá'], 'A', 'easy', 1, 7),
  sc('Nhiều quả chuối mọc thành một nhóm được gọi là gì?', ['Bó chuối', 'Buồng chuối', 'Chùm rau', 'Cuộn chuối'], 'B', 'easy', 1, 8),
  sc('Vật nào có thể phát ra tiếng kêu khi rung hoặc gõ?', ['Cuộn chỉ', 'Quả chuông', 'Buồng chuối', 'Luống rau'], 'B', 'easy', 1, 9),
  sc('Trong câu "Chuồn chuồn bay qua các luống rau", loài vật nào được nhắc đến?', ['Chuồn chuồn', 'Chim sẻ', 'Bọ rùa', 'Châu chấu'], 'A', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uôn?', ['khuôn, muộn, nguồn', 'buồng, luống, vuông', 'cuốn, luống, chuông', 'nguồn, buồng, vuông'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uông?', ['khuôn, muốn, nguồn', 'buồng, luống, vuông', 'cuốn, muộn, nguồn', 'chuồn, khuôn, buồng'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "cuộn chỉ", tiếng nào có vần uôn?', ['cuộn', 'chỉ', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 3, '"cuộn" có vần "uôn".'),
  sc('Trong cụm từ "buồng chuối", tiếng nào có vần uông?', ['buồng', 'chuối', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 4, '"buồng" có vần "uông".'),
  sc('Trong cụm từ "quả chuông", tiếng nào có vần uông?', ['quả', 'chuông', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"chuông" có vần "uông".'),
  sc('Điền vần thích hợp để tạo thành tiếng "cuốn": c…', ['uôn', 'uông', 'uôi', 'uôm'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "luống": l…', ['uôn', 'uông', 'uôc', 'uôt'], 'B', 'medium', 2, 7),
  sc('Khi trời sắp mưa, chuồn chuồn bay như thế nào?', ['Bay rất cao', 'Bay thấp', 'Đậu im trên cây', 'Bay vào nhà'], 'B', 'medium', 2, 8),
  sc('Bầu trời trước khi mưa được miêu tả như thế nào?', ['Trong xanh', 'Đỏ rực', 'Đen kịt', 'Đầy sao'], 'C', 'medium', 2, 9),
  sc('Gió mạnh cuốn theo thứ gì?', ['Những đám mây trắng', 'Những đám lá khô', 'Những cánh hoa', 'Những hạt cát'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uôn – uông?', ['cuốn – luống', 'luống – cuốn', 'buồng – nguồn', 'vuông – khuôn'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uôn và vần uông?', ['Bé cuốn sách lại.', 'Buồng chuối đã chín.', 'Gió cuốn lá khô rơi xuống.', 'Chuồn chuồn bay thấp.'], 'C', 'hard', 3, 2, '"cuốn" có vần uôn; "xuống" có vần uông.'),
  sc('Trong câu "Chuồn chuồn bay qua các luống rau", có bao nhiêu tiếng chứa vần uôn hoặc uông?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 3, 'Các tiếng đó là: chuồn, chuồn, luống.'),
  sc('Trong đoạn đọc về cơn mưa, có bao nhiêu tiếng chứa vần uôn hoặc uông?', ['Ba tiếng', 'Bốn tiếng', 'Năm tiếng', 'Sáu tiếng'], 'C', 'hard', 3, 4, 'Các tiếng đó là: chuồn, chuồn, cuốn, xuống, cuống.'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['khuôn', 'muộn', 'nguồn', 'vuông'], 'D', 'hard', 3, 5, '"khuôn, muộn, nguồn" có vần uôn; "vuông" có vần uông.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['cuốn – vần uôn', 'nguồn – vần uôn', 'buồng – vần uông', 'luống – vần uôn'], 'D', 'hard', 3, 6, 'Tiếng "luống" có vần "uông", không phải vần "uôn".'),
  sc('Thứ tự nào đúng với nội dung đoạn đọc?', ['Trời sắp mưa → chuồn chuồn bay thấp → mưa trút xuống → mưa tạnh', 'Mưa tạnh → trời sắp mưa → chuồn chuồn bay thấp → gió thổi', 'Bầu trời trong xanh → mưa trút xuống → trời sắp mưa', 'Mưa trút xuống → chuồn chuồn bay thấp → trời nắng'], 'A', 'hard', 3, 7),
  sc('Dấu hiệu nào cho thấy trời sắp mưa?', ['Chuồn chuồn bay thấp, trời đen kịt và gió thổi mạnh', 'Bầu trời trong xanh và nắng đẹp', 'Những hạt mưa đọng trên lá', 'Không khí mát mẻ'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chuồn chuồn / bay thấp / trời sắp mưa / khi',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'chuồn chuồn' }, { key: '2', text: 'bay thấp' }, { key: '3', text: 'trời sắp mưa' }, { key: '4', text: 'khi' }],
    correctAnswerJson: ['4', '3', '1', '2'], // Khi trời sắp mưa, chuồn chuồn bay thấp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Khi trời sắp mưa, chuồn chuồn bay thấp".',
  },
  sc('Khi gặp mưa lớn và gió mạnh, em nên làm gì?', ['Chạy ra ngoài chơi', 'Đứng dưới cây cao', 'Tìm nơi an toàn để trú và nghe theo người lớn', 'Lội qua chỗ nước sâu'], 'C', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B68 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
