require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 784;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài 70 có nội dung chính là gì?', ['Học vần mới', 'Ôn tập và kể chuyện', 'Học các số', 'Luyện phép tính'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uôc?', ['luốc', 'vuốt', 'muôn', 'buồng'], 'A', 'easy', 1, 2, '"luốc" có vần "uôc".'),
  sc('Tiếng nào dưới đây có vần uôm?', ['chuối', 'nhuộm', 'cuộn', 'bưởi'], 'B', 'easy', 1, 3, '"nhuộm" có vần "uôm".'),
  sc('Tiếng nào dưới đây có vần uôn?', ['muôn', 'muốt', 'luống', 'khướu'], 'A', 'easy', 1, 4, '"muôn" có vần "uôn".'),
  sc('Tiếng nào dưới đây có vần uôt?', ['cuộn', 'vuốt', 'buồng', 'nuôi'], 'B', 'easy', 1, 5, '"vuốt" có vần "uôt".'),
  sc('Tiếng nào dưới đây có vần uông?', ['luống', 'luốc', 'muôn', 'chuối'], 'A', 'easy', 1, 6, '"luống" có vần "uông".'),
  sc('Tiếng nào dưới đây có vần uôi?', ['bưởi', 'chuối', 'bướu', 'nhuộm'], 'B', 'easy', 1, 7, '"chuối" có vần "uôi".'),
  sc('Tiếng nào dưới đây có vần ươi?', ['tươi', 'nuôi', 'khướu', 'muốt'], 'A', 'easy', 1, 8, '"tươi" có vần "ươi".'),
  sc('Tiếng nào dưới đây có vần ươu?', ['sưởi', 'bưởi', 'khướu', 'chuối'], 'C', 'easy', 1, 9, '"khướu" có vần "ươu".'),
  sc('Câu chuyện trong bài có tên là gì?', ['Chuột và mèo', 'Chuột nhà và chuột đồng', 'Chuột và sư tử', 'Hai chú chuột con'], 'B', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uôc?', ['cuốc, luộc, thuốc', 'vuốt, muốt, chuột', 'cuộn, muôn, nguồn', 'buồng, luống, chuông'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uôm?', ['buồm, nhuộm, muỗm', 'cuộn, muôn, nguồn', 'chuối, nuôi, đuôi', 'bưởi, tươi, sưởi'], 'A', 'medium', 2, 2),
  sc('Dãy nào gồm toàn các tiếng có vần uôn?', ['vuốt, muốt, chuột', 'cuộn, muôn, nguồn', 'buồng, luống, cuống', 'hươu, bướu, khướu'], 'B', 'medium', 2, 3),
  sc('Dãy nào gồm toàn các tiếng có vần uôt?', ['vuốt, muốt, chuột', 'cuốc, luộc, thuốc', 'buồm, nhuộm, muỗm', 'cuộn, muôn, nguồn'], 'A', 'medium', 2, 4),
  sc('Dãy nào gồm toàn các tiếng có vần uông?', ['chuối, nuôi, đuôi', 'buồng, luống, cuống', 'tươi, bưởi, sưởi', 'hươu, bướu, khướu'], 'B', 'medium', 2, 5),
  sc('Dãy nào gồm toàn các tiếng có vần uôi?', ['chuối, nuôi, đuôi', 'muôn, cuộn, nguồn', 'muốt, vuốt, chuột', 'bưởi, tươi, sưởi'], 'A', 'medium', 2, 6),
  sc('Dãy nào gồm toàn các tiếng có vần ươi?', ['hươu, bướu, khướu', 'tươi, bưởi, sưởi', 'chuối, nuôi, đuôi', 'buồm, nhuộm, muỗm'], 'B', 'medium', 2, 7),
  sc('Dãy nào gồm toàn các tiếng có vần ươu?', ['hươu, bướu, khướu', 'người, cười, lưỡi', 'buồng, luống, cuống', 'cuộn, muôn, nguồn'], 'A', 'medium', 2, 8),
  sc('Khóm cây nào đã xanh tươi và trổ buồng?', ['Khóm hoa', 'Khóm chuối', 'Khóm tre', 'Khóm mía'], 'B', 'medium', 2, 9),
  sc('Những con vật nào được nhắc đến trong đoạn đọc?', ['Gà, chim khướu và mèo', 'Trâu, bò và ngựa', 'Voi, hổ và khỉ', 'Cá, tôm và cua'], 'A', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uôc – uôm – uôn – uôt – uông – uôi – ươi – ươu?', ['luốc – nhuộm – muôn – vuốt – luống – chuối – bưởi – khướu', 'nhuộm – luốc – vuốt – muôn – chuối – luống – khướu – bưởi', 'vuốt – muôn – luốc – nhuộm – bưởi – khướu – luống – chuối', 'luống – chuối – bưởi – khướu – luốc – nhuộm – muôn – vuốt'], 'A', 'hard', 3, 1),
  sc('Câu nào có đủ các vần uôi, ươi, uông?', ['Khóm chuối xanh tươi đã trổ buồng.', 'Hàng bưởi ra bông trắng muốt.', 'Đôi chim khướu hót vang.', 'Chú mèo cuộn tròn bên thềm.'], 'A', 'hard', 3, 2, '"chuối" (uôi), "tươi" (ươi), "buồng" (uông).'),
  sc('Trong câu "Khóm chuối xanh tươi đã trổ buồng", có bao nhiêu tiếng chứa các vần đang ôn?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 3, 'Ba tiếng đó là: chuối, tươi, buồng.'),
  sc('Trong câu "Hàng bưởi ra bông trắng muốt", có bao nhiêu tiếng chứa vần ươi hoặc uôt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 4, '"bưởi" (ươi), "muốt" (uôt).'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['vuốt', 'muốt', 'chuột', 'cuộn'], 'D', 'hard', 3, 5, '"vuốt, muốt, chuột" có vần uôt; "cuộn" có vần uôn.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['luốc – vần uôc', 'nhuộm – vần uôm', 'luống – vần uông', 'khướu – vần ươi'], 'D', 'hard', 3, 6, 'Tiếng "khướu" có vần "ươu", không phải vần "ươi".'),
  sc('Thứ tự nào phù hợp với các tranh trong câu chuyện "Chuột nhà và chuột đồng"?', ['Chuột nhà mời chuột đồng lên thành phố → gặp mèo → gặp người và chó → chuột đồng trở về quê', 'Chuột đồng gặp chó → lên thành phố → gặp chuột nhà → đi ngủ', 'Hai chú chuột ra đồng → gặp mèo → mở kho thức ăn → ở lại thành phố', 'Chuột đồng về quê → gặp chuột nhà → ăn uống → lên thành phố'], 'A', 'hard', 3, 7),
  sc('Tối đầu tiên đi kiếm ăn ở thành phố, hai chú chuột gặp nguy hiểm gì?', ['Bị mèo đuổi bắt', 'Bị lạc đường', 'Gặp trời mưa lớn', 'Bị rơi xuống sông'], 'A', 'hard', 3, 8),
  sc('Vì sao chuột đồng quyết định trở về quê?', ['Vì chuột đồng không thích thức ăn', 'Vì cuộc sống ở thành phố có nhiều nguy hiểm', 'Vì chuột nhà không cho ở lại', 'Vì chuột đồng muốn đi chơi nơi khác'], 'B', 'hard', 3, 9),
  sc('Bài học phù hợp nhất rút ra từ câu chuyện là gì?', ['Cuộc sống giàu sang luôn tốt hơn mọi cuộc sống khác', 'Nên chọn cuộc sống bình yên, an toàn hơn là đầy đủ nhưng luôn nguy hiểm', 'Không nên kết bạn với người khác', 'Chỉ nên sống ở thành phố'], 'B', 'hard', 3, 10),
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
    console.log('B70 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
