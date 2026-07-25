require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Bài 75%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài 75 có nội dung chính là gì?', ['Học vần mới', 'Ôn tập và kể chuyện', 'Học phép cộng', 'Luyện viết số'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ươc?', ['lướt', 'ước', 'gươm', 'lượn'], 'B', 'easy', 1, 2, '"ước" có vần "ươc".'),
  sc('Tiếng nào dưới đây có vần ươt?', ['lướt', 'hương', 'hoa', 'gươm'], 'A', 'easy', 1, 3, '"lướt" có vần "ươt".'),
  sc('Tiếng nào dưới đây có vần ươm?', ['ướp', 'gươm', 'lượn', 'hoe'], 'B', 'easy', 1, 4, '"gươm" có vần "ươm".'),
  sc('Tiếng nào dưới đây có vần ươp?', ['mướp', 'cườm', 'vườn', 'hương'], 'A', 'easy', 1, 5, '"mướp" có vần "ươp".'),
  sc('Tiếng nào dưới đây có vần ươn?', ['tỏa', 'lượn', 'hoe', 'hương'], 'B', 'easy', 1, 6, '"lượn" có vần "ươn".'),
  sc('Tiếng nào dưới đây có vần ương?', ['hương', 'hoa', 'ước', 'lướt'], 'A', 'easy', 1, 7, '"hương" có vần "ương".'),
  sc('Tiếng nào dưới đây có vần oa?', ['hoe', 'hoa', 'hương', 'lượn'], 'B', 'easy', 1, 8, '"hoa" có vần "oa".'),
  sc('Tiếng nào dưới đây có vần oe?', ['hoe', 'hoa', 'tỏa', 'ước'], 'A', 'easy', 1, 9, '"hoe" có vần "oe".'),
  sc('Câu chuyện trong bài có tên là gì?', ['Mưa và gió', 'Chuyện của mây', 'Mặt trời thức dậy', 'Cô gió thi chạy'], 'B', 'easy', 1, 10),
  sc('Dãy nào lần lượt chứa các vần ươc – ươt – ươm – ươp?', ['ước – lướt – gươm – ướp', 'lướt – ước – ướp – gươm', 'gươm – ướp – ước – lướt', 'ướp – gươm – lướt – ước'], 'A', 'medium', 2, 1),
  sc('Dãy nào lần lượt chứa các vần ươn – ương – oa – oe?', ['hương – lượn – hoe – hoa', 'lượn – hương – hoa – hoe', 'hoa – hoe – lượn – hương', 'hoe – hoa – hương – lượn'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "lướt sóng", tiếng nào có vần ươt?', ['lướt', 'sóng', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 3, '"lướt" có vần "ươt".'),
  sc('Trong cụm từ "mèo mướp", tiếng nào có vần ươp?', ['mèo', 'mướp', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"mướp" có vần "ươp".'),
  sc('Trong cụm từ "hạt cườm", tiếng nào có vần ươm?', ['hạt', 'cườm', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"cườm" có vần "ươm".'),
  sc('Trong cụm từ "tỏa hương", hai tiếng lần lượt có vần gì?', ['oa và ương', 'oe và ươn', 'oa và ươn', 'oe và ương'], 'A', 'medium', 2, 6, '"tỏa" có vần oa; "hương" có vần ương.'),
  sc('Trong bài thơ "Buổi sớm", ai tỉnh giấc?', ['Cô gió', 'Mặt trời', 'Đám mây', 'Cánh rừng'], 'B', 'medium', 2, 7),
  sc('Hai má của mặt trời được miêu tả như thế nào?', ['Trắng muốt', 'Vàng hoe', 'Ửng hồng', 'Xanh biếc'], 'C', 'medium', 2, 8),
  sc('Cô gió chạy ở đâu?', ['Trong cánh rừng xa', 'Trên mặt biển', 'Giữa cánh đồng', 'Ngoài sân trường'], 'A', 'medium', 2, 9),
  sc('Cô gió mang thứ gì ùa vào lớp học?', ['Những hạt mưa', 'Hương hoa', 'Những chiếc lá', 'Ánh nắng'], 'B', 'medium', 2, 10),
  sc('Trong câu "Khắp vườn, hoa tỏa hương ngào ngạt", có bao nhiêu tiếng chứa các vần đang ôn?', ['Ba tiếng', 'Bốn tiếng', 'Năm tiếng', 'Sáu tiếng'], 'C', 'hard', 3, 1, 'Các tiếng: vườn (ươn); hoa, tỏa, ngào (oa); hương (ương).'),
  sc('Trong bài thơ "Buổi sớm", những tiếng nào chứa các vần ươn, ương, oa?', ['vươn, hương, hoa', 'trời, mây, gió', 'rừng, lớp, học', 'tỉnh, giấc, chạy'], 'A', 'hard', 3, 2),
  sc('Câu nào có cả vần ươn, ương và oa?', ['Hoa vàng nở trong vườn.', 'Khắp vườn, hoa tỏa hương ngào ngạt.', 'Bé đang lướt sóng.', 'Chú mèo mướp nằm ngủ.'], 'B', 'hard', 3, 3, 'vườn (ươn), hương (ương), hoa/tỏa/ngào (oa).'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['gươm', 'cườm', 'lượm', 'mướp'], 'D', 'hard', 3, 4, '"gươm, cườm, lượm" có vần ươm; "mướp" có vần ươp.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['ước – vần ươc', 'lướt – vần ươt', 'lượn – vần ương', 'hoe – vần oe'], 'C', 'hard', 3, 5, 'Tiếng "lượn" có vần "ươn", không phải vần "ương".'),
  sc('Thứ tự nào phù hợp với các tranh trong câu chuyện "Chuyện của mây"?', ['Mây buồn → mây đi làm mưa → mưa tưới mát cỏ cây → nước bốc hơi thành mây', 'Mưa rơi → mây buồn → mặt trời biến mất → cây cối khô héo', 'Nước bốc hơi → mưa tạnh → mây đi ngủ → trời tối', 'Mây bay đi → cây cối héo → trời có tuyết → nước đóng băng'], 'A', 'hard', 3, 6),
  sc('Mây muốn đi làm mưa để làm gì?', ['Làm cho đường bị ngập', 'Giúp con người và cỏ cây có nước', 'Che khuất mặt trời mãi mãi', 'Làm cho gió ngừng thổi'], 'B', 'hard', 3, 7),
  sc('Khi mưa xuống, con người và cỏ cây như thế nào?', ['Cỏ cây được tưới mát, con người vui mừng', 'Cỏ cây khô héo hơn', 'Mọi người đều đi ngủ', 'Cánh đồng biến thành sa mạc'], 'A', 'hard', 3, 8),
  sc('Nước biến thành mây bằng cách nào?', ['Nước gặp ánh nắng, bốc hơi lên cao rồi tạo thành mây', 'Nước chảy xuống lòng đất rồi biến thành mây', 'Nước đóng băng dưới ánh nắng', 'Nước được gió thổi trực tiếp thành mây'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất từ câu chuyện "Chuyện của mây" là gì?', ['Mỗi sự vật trong thiên nhiên đều có ích và góp phần duy trì sự sống', 'Mưa luôn gây hại cho con người', 'Mây không liên quan đến nước', 'Cây cối không cần nước để sống'], 'A', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30, có', Q.length); process.exit(1); }
  const [ls] = await c.query("SELECT l.id FROM lessons l JOIN courses c ON c.id=l.courseId WHERE c.slug='tieng-viet-lop-1' AND l.title LIKE ?", [TITLE_LIKE]);
  if (!ls.length) { console.log('KHÔNG thấy lesson', TITLE_LIKE); process.exit(1); }
  const LESSON_ID = ls[0].id;
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('lesson', LESSON_ID, '| vô hiệu hóa cũ:', del.affectedRows);
    for (const q of Q) await c.query(`INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('B75 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
