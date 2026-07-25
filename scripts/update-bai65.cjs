require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 779;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài 65 có nội dung chính là gì?', ['Học vần mới', 'Ôn tập và kể chuyện', 'Học các số', 'Luyện tính toán'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ong?', ['trong', 'trồng', 'khung', 'vừng'], 'A', 'easy', 1, 2, '"trong" có vần "ong".'),
  sc('Tiếng nào dưới đây có vần ông?', ['trong', 'trồng', 'khung', 'vừng'], 'B', 'easy', 1, 3, '"trồng" có vần "ông".'),
  sc('Tiếng nào dưới đây có vần ung?', ['việc', 'tiếng', 'khung', 'yến'], 'C', 'easy', 1, 4, '"khung" có vần "ung".'),
  sc('Tiếng nào dưới đây có vần ưng?', ['vừng', 'trong', 'trồng', 'yêu'], 'A', 'easy', 1, 5, '"vừng" có vần "ưng".'),
  sc('Tiếng nào dưới đây có vần iêc?', ['tiếng', 'việc', 'nhiệm', 'biết'], 'B', 'easy', 1, 6, '"việc" có vần "iêc".'),
  sc('Tiếng nào dưới đây có vần iêng?', ['tiếng', 'tiếp', 'chiên', 'nhiệm'], 'A', 'easy', 1, 7, '"tiếng" có vần "iêng".'),
  sc('Tiếng nào dưới đây có vần yên?', ['điều', 'yêu', 'yến', 'biết'], 'C', 'easy', 1, 8, '"yến" có vần "yên".'),
  sc('Câu nào được yêu cầu luyện viết trong bài?', ['Em rất yêu sách.', 'Biển xanh biếc.', 'Cánh diều chao liệng trên bầu trời.', 'Những đàn chim bay về tổ.'], 'C', 'easy', 1, 9),
  sc('Câu chuyện trong bài có tên là gì?', ['Hổ và cáo', 'Lửa, mưa và con hổ hung hăng', 'Chú mèo thông minh', 'Sư tử và chuột'], 'B', 'easy', 1, 10),
  sc('Từ nào dưới đây có tiếng chứa vần ông?', ['khu rừng', 'tiếng trống', 'xanh biếc', 'hiểu biết'], 'B', 'medium', 2, 1, '"trống" có vần "ông".'),
  sc('Tiếng nào dưới đây có vần iêp?', ['tiếp', 'tiếng', 'chiên', 'điều'], 'A', 'medium', 2, 2, '"tiếp" có vần "iêp".'),
  sc('Tiếng nào dưới đây có vần iêm?', ['yến', 'nhiệm', 'biết', 'yêu'], 'B', 'medium', 2, 3, '"nhiệm" có vần "iêm".'),
  sc('Tiếng nào dưới đây có vần iêt?', ['biết', 'điều', 'tiếng', 'tiếp'], 'A', 'medium', 2, 4, '"biết" có vần "iêt".'),
  sc('Tiếng nào dưới đây có vần iêu?', ['việc', 'điều', 'nhiệm', 'yến'], 'B', 'medium', 2, 5, '"điều" có vần "iêu".'),
  sc('Từ nào dưới đây có vần yêu?', ['yêu mến', 'hiểu biết', 'khiêm tốn', 'rong biển'], 'A', 'medium', 2, 6, '"yêu" có vần "yêu".'),
  sc('Trái đất của chúng ta được miêu tả như thế nào?', ['Vô cùng nhỏ bé', 'Vô cùng rộng lớn', 'Rất tối tăm', 'Không có sự sống'], 'B', 'medium', 2, 7),
  sc('Núi rừng được miêu tả bằng cụm từ nào?', ['Xanh biếc', 'Cao rộng', 'Trùng điệp', 'Yên tĩnh'], 'C', 'medium', 2, 8),
  sc('Sự sống trên Trái Đất diễn ra như thế nào?', ['Không ngừng sinh sôi, nảy nở', 'Ngày càng ít đi', 'Hoàn toàn đứng yên', 'Không có sự thay đổi'], 'A', 'medium', 2, 9),
  sc('Chúng ta cần làm gì với sự sống trên Trái Đất?', ['Phá bỏ và thay đổi', 'Bỏ mặc, không quan tâm', 'Yêu quý, giữ gìn và bảo vệ', 'Chỉ quan sát từ xa'], 'C', 'medium', 2, 10),
  sc('Trong câu "Cánh diều chao liệng trên bầu trời", có bao nhiêu tiếng chứa các vần đã ôn trong bài?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 1, '"diều" có vần iêu và "liệng" có vần iêng.'),
  sc('Dãy nào lần lượt chứa các vần ong – ông – ung – ưng?', ['trong – trồng – khung – vừng', 'trồng – trong – vừng – khung', 'khung – vừng – trong – trồng', 'vừng – khung – trồng – trong'], 'A', 'hard', 3, 2),
  sc('Dãy nào lần lượt chứa các vần iêc – iêp – iêng – iêm – yên?', ['việc – tiếp – tiếng – nhiệm – yến', 'tiếp – việc – nhiệm – tiếng – yến', 'tiếng – nhiệm – việc – yến – tiếp', 'yến – tiếng – tiếp – việc – nhiệm'], 'A', 'hard', 3, 3),
  sc('Thứ tự nào phù hợp với các tranh trong câu chuyện?', ['Hổ gặp lửa → hổ bị sém lông → mưa rơi → hổ thoát nạn', 'Mưa rơi → hổ gặp lửa → hổ ngủ → hổ về nhà', 'Hổ thoát nạn → hổ gặp lửa → trời nắng → hổ bị sém lông', 'Hổ gặp thợ săn → hổ đi ngủ → lửa xuất hiện → mưa tạnh'], 'A', 'hard', 3, 4),
  sc('Vì sao hổ bị sém lông?', ['Vì hổ đến quá gần và đụng vào lửa', 'Vì hổ ngã xuống nước', 'Vì hổ trèo lên cây', 'Vì hổ đứng dưới mưa'], 'A', 'hard', 3, 5),
  sc('Khi mưa rơi xuống, điều gì xảy ra với ngọn lửa trên người hổ?', ['Ngọn lửa cháy lớn hơn', 'Ngọn lửa được dập tắt', 'Ngọn lửa bay lên trời', 'Ngọn lửa biến thành con vật'], 'B', 'hard', 3, 6),
  sc('Trong bức tranh cuối, hổ nhìn thấy ai?', ['Hai người thợ săn', 'Hai bạn nhỏ', 'Một đàn chim', 'Một người bán hàng'], 'A', 'hard', 3, 7),
  sc('Qua câu chuyện, con hổ nên thay đổi tính cách nào?', ['Không nên hung hăng và coi thường mọi vật', 'Nên hung dữ hơn', 'Nên thường xuyên gây gổ', 'Không nên giúp đỡ ai'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: cần / sự sống / chúng ta / bảo vệ',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'cần' }, { key: '2', text: 'sự sống' }, { key: '3', text: 'chúng ta' }, { key: '4', text: 'bảo vệ' }],
    correctAnswerJson: ['3', '1', '4', '2'], // Chúng ta cần bảo vệ sự sống
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Chúng ta cần bảo vệ sự sống".',
  },
  sc('Việc làm nào góp phần bảo vệ sự sống trên Trái Đất?', ['Chặt phá rừng', 'Săn bắt động vật hoang dã', 'Trồng cây, giữ vệ sinh và bảo vệ động vật', 'Vứt rác xuống sông, biển'], 'C', 'hard', 3, 10),
];
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  if (Q.length !== 30) { console.log('LỖI: cần 30 câu, đang có', Q.length); process.exit(1); }
  await c.beginTransaction();
  try {
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa câu cũ:', del.affectedRows);
    for (const q of Q) await c.query(
      `INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
      [LESSON_ID, q.questionText, q.questionType, q.optionsJson ? JSON.stringify(q.optionsJson) : null, JSON.stringify(q.correctAnswerJson), q.explanation || null, q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10]);
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('XONG. Câu active mới:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI — rollback:', e.message); }
  await c.end();
})();
