require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 781;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôi, uôm', 'uôc, uôt', 'ươc, ươt', 'uôn, uông'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần uôc?', ['vuốt', 'chuột', 'buộc', 'tuột'], 'C', 'easy', 1, 2, '"buộc" có vần "uôc".'),
  sc('Tiếng nào dưới đây có vần uôt?', ['thuốc', 'cuốc', 'luộc', 'vuốt'], 'D', 'easy', 1, 3, '"vuốt" có vần "uôt".'),
  sc('Ghép âm b với vần uôc và thêm dấu nặng được tiếng nào?', ['buốt', 'buộc', 'bước', 'buồm'], 'B', 'easy', 1, 4, 'b + uôc + dấu nặng = "buộc".'),
  sc('Vật dùng để thắp sáng trong bài là gì?', ['Ngọn đuốc', 'Bóng đèn', 'Cây nến', 'Đèn pin'], 'A', 'easy', 1, 5),
  sc('Hình ảnh các viên dùng để chữa bệnh được gọi là gì?', ['Viên kẹo', 'Viên thuốc', 'Viên bi', 'Viên đá'], 'B', 'easy', 1, 6),
  sc('Con vật nhỏ có chiếc đuôi dài xuất hiện trong bài là con gì?', ['Con mèo', 'Con sóc', 'Con chuột', 'Con thỏ'], 'C', 'easy', 1, 7),
  sc('Mẹ vuốt bộ phận nào của Hà?', ['Tóc', 'Tay', 'Chân', 'Vai'], 'A', 'easy', 1, 8),
  sc('Mẹ buộc gì cho Hà?', ['Buộc dây giày', 'Buộc nơ', 'Buộc tóc đuôi ngựa', 'Buộc khăn'], 'B', 'easy', 1, 9),
  sc('Mẹ cho Hà đi đâu?', ['Đi học', 'Đi chợ', 'Đi công viên', 'Đi siêu thị'], 'C', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần uôc?', ['cuốc, luộc, ruốc, thuộc', 'vuốt, buốt, ruột, tuột', 'cuốc, vuốt, thuốc, chuột', 'buộc, chuột, tuột, ruột'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần uôt?', ['buộc, cuốc, thuốc', 'vuốt, buốt, ruột, tuột', 'luộc, ruốc, thuộc', 'đuốc, chuột, thuốc'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "ngọn đuốc", tiếng nào có vần uôc?', ['ngọn', 'đuốc', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 3, '"đuốc" có vần "uôc".'),
  sc('Trong cụm từ "viên thuốc", tiếng nào có vần uôc?', ['viên', 'thuốc', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 4, '"thuốc" có vần "uôc".'),
  sc('Trong cụm từ "con chuột", tiếng nào có vần uôt?', ['con', 'chuột', 'Cả hai tiếng', 'Không có tiếng nào'], 'B', 'medium', 2, 5, '"chuột" có vần "uôt".'),
  sc('Điền vần thích hợp để tạo thành tiếng "thuốc": th…', ['uôc', 'uôt', 'uôi', 'uôm'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "chuột": ch…', ['uôc', 'uôt', 'ươt', 'uôn'], 'B', 'medium', 2, 7),
  sc('Hà mặc trang phục gì khi đi công viên?', ['Váy trắng', 'Váy đỏ', 'Quần xanh', 'Áo vàng'], 'A', 'medium', 2, 8),
  sc('Hà đi đôi giày màu gì?', ['Màu trắng', 'Màu xanh', 'Màu hồng', 'Màu vàng'], 'C', 'medium', 2, 9),
  sc('Mẹ dặn Hà khi đi chơi cần ăn mặc như thế nào?', ['Thật nhiều màu sắc', 'Gọn gàng, lịch sự', 'Thật đắt tiền', 'Giống các bạn'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần uôc – uôt?', ['buộc – vuốt', 'vuốt – buộc', 'chuột – thuốc', 'tuột – cuốc'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần uôc và vần uôt?', ['Bé nhìn thấy con chuột.', 'Mẹ mua một viên thuốc.', 'Mẹ vuốt tóc và buộc nơ cho Hà.', 'Bố cầm ngọn đuốc.'], 'C', 'hard', 3, 2, '"vuốt" có vần uôt; "buộc" có vần uôc.'),
  sc('Trong câu "Mẹ vuốt tóc và buộc nơ cho Hà", có bao nhiêu tiếng chứa vần uôc hoặc uôt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 3, 'Hai tiếng đó là "vuốt" và "buộc".'),
  sc('Trong đoạn đọc về Hà đi công viên, có bao nhiêu tiếng chứa vần uôc hoặc uôt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'B', 'hard', 3, 4, 'Hai tiếng đó là "vuốt" và "buộc".'),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['cuốc', 'luộc', 'thuốc', 'chuột'], 'D', 'hard', 3, 5, '"cuốc, luộc, thuốc" có vần uôc; "chuột" có vần uôt.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['đuốc – vần uôc', 'thuốc – vần uôc', 'chuột – vần uôt', 'buộc – vần uôt'], 'D', 'hard', 3, 6, 'Tiếng "buộc" có vần "uôc", không phải vần "uôt".'),
  sc('Thứ tự nào phù hợp với nội dung đoạn đọc?', ['Hà đi công viên → Hà mặc váy trắng, đi giày hồng → mẹ vuốt tóc và buộc nơ cho Hà', 'Mẹ buộc nơ → Hà đi ngủ → Hà đến trường', 'Hà đi chợ → mẹ mua váy → Hà về nhà', 'Hà mặc váy → Hà đi học → mẹ đưa Hà đến công viên'], 'A', 'hard', 3, 7),
  sc('Vì sao mẹ vuốt tóc và buộc nơ cho Hà?', ['Để Hà chuẩn bị đi chơi thật gọn gàng', 'Để Hà chuẩn bị đi ngủ', 'Để Hà làm bài tập', 'Để Hà nấu ăn'], 'A', 'hard', 3, 8),
  sc('Để chuẩn bị đi dự sinh nhật, hai bạn nhỏ trong hình đang làm gì?', ['Gói quà và viết thiệp', 'Đọc sách và làm bài', 'Nấu ăn và rửa bát', 'Trồng cây và tưới hoa'], 'A', 'hard', 3, 9),
  sc('Khi đi dự sinh nhật, em nên làm gì?', ['Ăn mặc gọn gàng, chuẩn bị quà hoặc thiệp và cư xử lịch sự', 'Tự ý mở quà của bạn', 'Chạy nhảy và làm ồn trong nhà', 'Đến muộn mà không báo trước'], 'A', 'hard', 3, 10),
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
    console.log('B67 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
