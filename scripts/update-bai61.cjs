require('dotenv').config();
const mysql = require('mysql2/promise');

const LESSON_ID = 775;
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});

const Q = [
  // ── DỄ (easy, ex=1) ──
  sc('Bài học giới thiệu những vần nào?', ['on, ôn, un, ưn', 'ong, ông, ung, ưng', 'ang, ăng, âng, eng', 'om, ôm, um, ưm'], 'B', 'easy', 1, 1),
  sc('Tiếng nào dưới đây có vần ong?', ['dòng', 'bổng', 'thùng', 'vừng'], 'A', 'easy', 1, 2, '"dòng" có vần "ong".'),
  sc('Tiếng nào dưới đây có vần ông?', ['võng', 'đựng', 'bổng', 'thùng'], 'C', 'easy', 1, 3, '"bổng" có vần "ông".'),
  sc('Tiếng nào dưới đây có vần ung?', ['dòng', 'thùng', 'cộng', 'vừng'], 'B', 'easy', 1, 4, '"thùng" có vần "ung".'),
  sc('Tiếng nào dưới đây có vần ưng?', ['trong', 'bông', 'vừng', 'súng'], 'C', 'easy', 1, 5, '"vừng" có vần "ưng".'),
  sc('Đồ chơi có cánh quay trong bài được gọi là gì?', ['Chong chóng', 'Ô tô', 'Máy bay', 'Quả bóng'], 'A', 'easy', 1, 6),
  sc('Loài hoa mọc dưới nước trong bài là gì?', ['Bông hồng', 'Bông súng', 'Hoa đào', 'Hoa cúc'], 'B', 'easy', 1, 7),
  sc('Loại bánh được gói bằng lá trong bài là gì?', ['Bánh mì', 'Bánh rán', 'Bánh chưng', 'Bánh quy'], 'C', 'easy', 1, 8),
  sc('Nam theo mẹ đi đâu?', ['Đi học', 'Đi chợ', 'Đi chơi', 'Đi công viên'], 'B', 'easy', 1, 9),
  sc('Nam đi chợ cùng với ai?', ['Bố', 'Bà', 'Mẹ', 'Anh trai'], 'C', 'easy', 1, 10),
  // ── TRUNG BÌNH (medium, ex=2) ──
  sc('Ghép âm tr với vần ong được tiếng nào?', ['trông', 'trong', 'trung', 'trưng'], 'B', 'medium', 2, 1, 'tr + ong = "trong".'),
  sc('Tiếng "dòng" được tạo bởi âm đầu và vần nào?', ['d + ông', 'd + ong', 'đ + ong', 'd + ung'], 'B', 'medium', 2, 2),
  sc('Tiếng "cộng" được tạo bởi âm đầu và vần nào?', ['c + ong', 'c + ung', 'c + ông', 'c + ưng'], 'C', 'medium', 2, 3),
  sc('Điền vần thích hợp vào chỗ trống để tạo thành tiếng "thùng": th…', ['ong', 'ông', 'ung', 'ưng'], 'C', 'medium', 2, 4),
  sc('Điền vần thích hợp vào chỗ trống để tạo thành tiếng "đựng": đ…', ['ong', 'ông', 'ung', 'ưng'], 'D', 'medium', 2, 5),
  sc('Dãy nào gồm toàn các tiếng có vần ong?', ['dòng, võng, trong', 'bông, cộng, cổng', 'thùng, rung, súng', 'vừng, đựng, hứng'], 'A', 'medium', 2, 6),
  sc('Dãy nào gồm toàn các tiếng có vần ông?', ['dòng, võng, trong', 'bông, hồng, cổng', 'thùng, rung, súng', 'những, đựng, hứng'], 'B', 'medium', 2, 7),
  sc('Trong câu "Những bông hồng rung rinh trong gió", tiếng nào có vần ung?', ['những', 'bông', 'rung', 'trong'], 'C', 'medium', 2, 8, '"rung" có vần "ung".'),
  sc('Câu "Chợ đông vui và bán đủ thứ" cho biết điều gì?', ['Chợ rất vắng', 'Chợ chỉ bán rau', 'Chợ đông người và có nhiều hàng hóa', 'Chợ không có người mua'], 'C', 'medium', 2, 9),
  sc('Bên trong chợ có những hàng gì?', ['Hàng rau, thịt và cá', 'Hàng sách và bút', 'Hàng quần áo và giày dép', 'Hàng đồ chơi và bánh kẹo'], 'A', 'medium', 2, 10),
  // ── KHÓ (hard, ex=3) ──
  sc('Dãy nào lần lượt chứa các vần ong – ông – ung – ưng?', ['trong – bông – thùng – đựng', 'bông – trong – đựng – thùng', 'thùng – đựng – trong – bông', 'đựng – thùng – bông – trong'], 'A', 'hard', 3, 1),
  sc('Câu nào có cả vần ông và vần ưng?', ['Bé chơi chong chóng.', 'Ông đứng bên cổng.', 'Mẹ mua bánh chưng.', 'Cá bơi trong hồ.'], 'B', 'hard', 3, 2, '"ông", "cổng" có vần ông; "đứng" có vần ưng.'),
  sc('Trong câu "Những bông hồng rung rinh trong gió", có bao nhiêu tiếng chứa một trong các vần ong, ông, ung, ưng?', ['3 tiếng', '4 tiếng', '5 tiếng', '6 tiếng'], 'C', 'hard', 3, 3, 'Các tiếng đó là: những, bông, hồng, rung, trong.'),
  sc('Trong câu "Những bông hồng rung rinh trong gió", vần nào xuất hiện hai lần?', ['ong', 'ông', 'ung', 'ưng'], 'B', 'hard', 3, 4, 'Hai tiếng có vần ông là "bông" và "hồng".'),
  sc('Từ nào không cùng nhóm vần với ba từ còn lại?', ['dòng', 'võng', 'trong', 'bổng'], 'D', 'hard', 3, 5, '"dòng, võng, trong" có vần ong; "bổng" có vần ông.'),
  sc('Vì sao Nam rất thích đi chợ?', ['Vì Nam được mua đồ chơi', 'Vì lần đầu Nam được cùng mẹ đi chợ', 'Vì Nam gặp các bạn', 'Vì Nam được nghỉ học'], 'B', 'hard', 3, 6),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Nam xem hàng rau → Nam theo mẹ đi chợ → Nam thấy hàng đồ dùng gia đình', 'Nam theo mẹ đi chợ → thấy hàng đồ dùng gia đình → thấy hàng rau, thịt và cá', 'Nam thấy hàng cá → về nhà → theo mẹ đi chợ', 'Nam đi siêu thị → mua rau → gặp mẹ'], 'B', 'hard', 3, 7),
  sc('Chợ và siêu thị có điểm giống nhau nào?', ['Đều là nơi học tập', 'Đều là nơi vui chơi', 'Đều là nơi mua bán hàng hóa', 'Đều chỉ bán thực phẩm'], 'C', 'hard', 3, 8),
  // Câu 29 — SẮP XẾP (drag_drop): kéo từ thành câu "Nam theo mẹ đi chợ"
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: mẹ / Nam / theo / đi / chợ',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'mẹ' }, { key: '2', text: 'Nam' }, { key: '3', text: 'theo' }, { key: '4', text: 'đi' }, { key: '5', text: 'chợ' },
    ],
    correctAnswerJson: ['2', '3', '1', '4', '5'], // Nam theo mẹ đi chợ
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 9,
    explanation: 'Câu đúng: "Nam theo mẹ đi chợ".',
  },
  sc('Nhận xét nào đúng nhất về khu chợ trong bài?', ['Chợ chỉ có một người bán hàng', 'Chợ chỉ bán đồ dùng gia đình', 'Chợ có nhiều loại hàng hóa được bán ở các khu khác nhau', 'Chợ không bán rau, thịt và cá'], 'C', 'hard', 3, 10),
];

(async () => {
  const c = await mysql.createConnection({
    host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  if (Q.length !== 30) { console.log('LỖI: cần 30 câu, đang có', Q.length); process.exit(1); }

  await c.beginTransaction();
  try {
    // Vô hiệu hóa 30 câu cũ (an toàn với FK quiz_attempts) thay vì xóa cứng.
    const [del] = await c.query('UPDATE quizzes SET isActive = 0 WHERE lessonId = ? AND isActive = 1', [LESSON_ID]);
    console.log('Vô hiệu hóa câu cũ:', del.affectedRows);

    for (const q of Q) {
      await c.query(
        `INSERT INTO quizzes (lessonId, questionText, questionType, optionsJson, correctAnswerJson, explanation, difficultyLevel, exerciseNumber, sortOrder, points, isActive, createdAt, updatedAt)
         VALUES (?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
        [LESSON_ID, q.questionText, q.questionType,
         q.optionsJson ? JSON.stringify(q.optionsJson) : null,
         JSON.stringify(q.correctAnswerJson), q.explanation || null,
         q.difficultyLevel, q.exerciseNumber, q.sortOrder, 10],
      );
    }
    await c.commit();
    const [n] = await c.query('SELECT difficultyLevel, COUNT(*) n FROM quizzes WHERE lessonId=? AND isActive=1 GROUP BY difficultyLevel', [LESSON_ID]);
    console.log('XONG. Câu active mới:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) {
    await c.rollback();
    console.log('LỖI — rollback:', e.message);
  }
  await c.end();
})();
