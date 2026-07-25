require('dotenv').config();
const mysql = require('mysql2/promise');
const LESSON_ID = 785;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài học giới thiệu những vần nào?', ['uôc, uôt', 'ươc, ươt', 'uôn, uông', 'ươi, ươu'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ươc?', ['lướt', 'mượt', 'bước', 'lượt'], 'C', 'easy', 1, 2, '"bước" có vần "ươc".'),
  sc('Tiếng nào dưới đây có vần ươt?', ['nước', 'ngược', 'lược', 'lướt'], 'D', 'easy', 1, 3, '"lướt" có vần "ươt".'),
  sc('Ghép âm đ với vần ươc và thêm dấu nặng được tiếng nào?', ['đước', 'được', 'đượt', 'đượn'], 'B', 'easy', 1, 4, 'đ + ươc + dấu nặng = "được".'),
  sc('Đồ dùng để đo độ dài xuất hiện trong bài là gì?', ['Thước kẻ', 'Bút chì', 'Quyển vở', 'Cái kéo'], 'A', 'easy', 1, 5),
  sc('Người làm công việc liên quan đến thuốc được gọi là gì?', ['Ca sĩ', 'Dược sĩ', 'Giáo viên', 'Phi công'], 'B', 'easy', 1, 6),
  sc('Hoạt động thể thao trên mặt nước xuất hiện trong bài là gì?', ['Bơi lội', 'Chèo thuyền', 'Lướt ván', 'Câu cá'], 'C', 'easy', 1, 7),
  sc('Hà ước được làm gì?', ['Lướt sóng biển', 'Bay trên trời', 'Lái tàu hỏa', 'Đi leo núi'], 'A', 'easy', 1, 8),
  sc('Lúc học hát, Nam ước làm nghề gì?', ['Nhà thơ', 'Ca sĩ', 'Dược sĩ', 'Giáo viên'], 'B', 'easy', 1, 9),
  sc('Khi nhìn lên bầu trời, Nam ước làm nghề gì?', ['Người lái tàu', 'Bác sĩ', 'Phi công', 'Công nhân'], 'C', 'easy', 1, 10),
  sc('Dãy nào gồm toàn các tiếng có vần ươc?', ['bước, lược, ngược, nước', 'lướt, lượt, mượt, mướt', 'bước, lướt, nước, lượt', 'ngược, mượt, nước, lướt'], 'A', 'medium', 2, 1),
  sc('Dãy nào gồm toàn các tiếng có vần ươt?', ['bước, lược, ngược, nước', 'lướt, lượt, mượt, mướt', 'nước, lướt, ngược, mượt', 'lược, lượt, bước, mướt'], 'B', 'medium', 2, 2),
  sc('Trong cụm từ "thước kẻ", tiếng nào có vần ươc?', ['thước', 'kẻ', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 3, '"thước" có vần "ươc".'),
  sc('Trong cụm từ "dược sĩ", tiếng nào có vần ươc?', ['dược', 'sĩ', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 4, '"dược" có vần "ươc".'),
  sc('Trong cụm từ "lướt ván", tiếng nào có vần ươt?', ['lướt', 'ván', 'Cả hai tiếng', 'Không có tiếng nào'], 'A', 'medium', 2, 5, '"lướt" có vần "ươt".'),
  sc('Điền vần thích hợp để tạo thành tiếng "nước": n…', ['ươc', 'ươt', 'uôc', 'uôt'], 'A', 'medium', 2, 6),
  sc('Điền vần thích hợp để tạo thành tiếng "mượt": m…', ['ươc', 'ươt', 'ươi', 'ươu'], 'B', 'medium', 2, 7),
  sc('Khi nghe mẹ đọc thơ, Nam ước trở thành ai?', ['Ca sĩ', 'Nhà thơ', 'Phi công', 'Dược sĩ'], 'B', 'medium', 2, 8),
  sc('Khi ra biển, Nam ước trở thành ai?', ['Người lái tàu', 'Người bán hàng', 'Người thợ xây', 'Người lái xe'], 'A', 'medium', 2, 9),
  sc('Cuối đoạn đọc, Nam tự hỏi điều gì?', ['Bao giờ mình được đi biển?', 'Bao giờ mình mới lớn?', 'Bao giờ mình được nghỉ học?', 'Bao giờ mình được lái máy bay?'], 'B', 'medium', 2, 10),
  sc('Dãy nào lần lượt chứa các vần ươc – ươt?', ['nước – lướt', 'lướt – nước', 'mượt – bước', 'lượt – lược'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần ươc và vần ươt?', ['Bé dùng thước kẻ.', 'Hà ước được lướt sóng biển.', 'Mái tóc của bé rất mượt.', 'Nam uống nước.'], 'B', 'hard', 3, 2, '"ước", "được" có vần ươc; "lướt" có vần ươt.'),
  sc('Trong câu "Hà ước được lướt sóng biển", có bao nhiêu tiếng chứa vần ươc hoặc ươt?', ['Một tiếng', 'Hai tiếng', 'Ba tiếng', 'Bốn tiếng'], 'C', 'hard', 3, 3, 'Ba tiếng đó là: ước, được, lướt.'),
  sc('Trong đoạn đọc về ước mơ của Nam, có bao nhiêu tiếng chứa vần ươc hoặc ươt?', ['Ba tiếng', 'Bốn tiếng', 'Năm tiếng', 'Sáu tiếng'], 'C', 'hard', 3, 4),
  sc('Tiếng nào không cùng nhóm vần với ba tiếng còn lại?', ['bước', 'lược', 'nước', 'mượt'], 'D', 'hard', 3, 5, '"bước, lược, nước" có vần ươc; "mượt" có vần ươt.'),
  sc('Cách ghép tiếng với vần nào dưới đây không đúng?', ['thước – vần ươc', 'dược – vần ươc', 'lướt – vần ươt', 'mượt – vần ươc'], 'D', 'hard', 3, 6, 'Tiếng "mượt" có vần "ươt", không phải vần "ươc".'),
  sc('Thứ tự nào đúng với những ước mơ của Nam trong đoạn đọc?', ['Ca sĩ → nhà thơ → người lái tàu → phi công', 'Nhà thơ → ca sĩ → phi công → người lái tàu', 'Người lái tàu → ca sĩ → nhà thơ → phi công', 'Phi công → người lái tàu → ca sĩ → nhà thơ'], 'A', 'hard', 3, 7),
  sc('Vì sao Nam có nhiều ước mơ khác nhau?', ['Vì Nam thích khám phá nhiều nghề nghiệp và hoạt động khác nhau', 'Vì Nam không thích học', 'Vì Nam muốn bỏ nhà đi', 'Vì Nam không biết mình đang làm gì'], 'A', 'hard', 3, 8),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: Nam / ước / làm / phi công',
    questionType: 'drag_drop',
    optionsJson: [{ key: '1', text: 'Nam' }, { key: '2', text: 'ước' }, { key: '3', text: 'làm' }, { key: '4', text: 'phi công' }],
    correctAnswerJson: ['1', '2', '3', '4'], // Nam ước làm phi công
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Nam ước làm phi công".',
  },
  sc('Để thực hiện được ước mơ của mình, em nên làm gì?', ['Chăm chỉ học tập, rèn luyện và cố gắng mỗi ngày', 'Chỉ ngồi chờ ước mơ thành sự thật', 'Không cần nghe lời người lớn', 'Bỏ học để đi chơi'], 'A', 'hard', 3, 10),
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
    console.log('B71 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
