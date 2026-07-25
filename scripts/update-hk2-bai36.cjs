require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Cuộc thi tài năng rừng xanh%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Ngày hội muông thú', 'Cuộc thi tài năng rừng xanh', 'Khu rừng mùa xuân', 'Những con vật đáng yêu'], 'B', 'easy', 1, 1),
  sc('Các con vật tổ chức cuộc thi vào dịp nào?', ['Mừng năm học mới', 'Mừng mùa hè', 'Mừng xuân', 'Mừng Trung thu'], 'C', 'easy', 1, 2),
  sc('Cuộc thi được tổ chức ở đâu?', ['Trong rừng', 'Trong lớp học', 'Bên bờ biển', 'Ngoài cánh đồng'], 'A', 'easy', 1, 3),
  sc('Con vật nào biểu diễn đầu tiên?', ['Chim công', 'Chim yểng', 'Mèo rừng', 'Voọc xám'], 'B', 'easy', 1, 4),
  sc('Chim yểng biểu diễn tài năng gì?', ['Múa', 'Khoét tổ', 'Bắt chước tiếng của một số loài vật', 'Đu cây'], 'C', 'easy', 1, 5),
  sc('Mèo rừng biểu diễn tiết mục gì?', ['Hát ca khúc "ngoao ngoao"', 'Nhảy qua vòng', 'Bắt chước tiếng chim', 'Múa với chiếc đuôi'], 'A', 'easy', 1, 6),
  sc('Con vật nào khoét được một cái tổ xinh xắn?', ['Chim công', 'Chim yểng', 'Gõ kiến', 'Voọc xám'], 'C', 'easy', 1, 7),
  sc('Chim công biểu diễn tài năng gì?', ['Ca hát', 'Múa', 'Đu cây', 'Khoét tổ'], 'B', 'easy', 1, 8),
  sc('Voọc xám biểu diễn tiết mục gì?', ['Đu cây', 'Múa xòe đuôi', 'Hót', 'Đào hang'], 'A', 'easy', 1, 9),
  sc('Cuối bài, các con vật được nhận gì?', ['Mỗi con vật đều xứng đáng nhận phần thưởng', 'Chỉ chim công được nhận thưởng', 'Chỉ voọc xám được nhận thưởng', 'Không con vật nào được nhận thưởng'], 'A', 'easy', 1, 10),
  sc('Từ "niêm yết" có nghĩa là gì?', ['Viết hoặc dán công khai để mọi người cùng biết', 'Giấu kín một thông tin', 'Nói nhỏ với một người', 'Xóa nội dung trên bảng'], 'A', 'medium', 2, 1),
  sc('Cụm từ "nhoẻn miệng cười" miêu tả hành động nào?', ['Khẽ mỉm cười', 'Khóc thật to', 'Hét lớn', 'Há miệng ngáp'], 'A', 'medium', 2, 2),
  sc('Từ "điêu luyện" có nghĩa là gì?', ['Thực hiện rất thành thạo và khéo léo', 'Thực hiện chậm chạp', 'Làm việc một cách vụng về', 'Chưa biết cách thực hiện'], 'A', 'medium', 2, 3),
  sc('Từ "trầm trồ" thể hiện cảm xúc nào?', ['Thán phục và thích thú', 'Buồn bã và thất vọng', 'Tức giận và khó chịu', 'Lo lắng và sợ hãi'], 'A', 'medium', 2, 4),
  sc('Từ "chuệnh choạng" miêu tả trạng thái như thế nào?', ['Đi đứng không vững, nghiêng ngả', 'Đứng rất ngay ngắn', 'Chạy nhanh và mạnh', 'Ngồi yên không cử động'], 'A', 'medium', 2, 5),
  sc('Chọn từ thích hợp để hoàn thành câu: Cô bé (…) miệng cười khi thấy anh đi học về.', ['niêm yết', 'nhoẻn', 'bắt đầu', 'cuộc thi'], 'B', 'medium', 2, 6),
  sc('Chọn từ thích hợp để hoàn thành câu: Nhà trường (…) chương trình văn nghệ trên bảng tin.', ['vui vẻ', 'bắt đầu', 'niêm yết', 'nhoẻn'], 'C', 'medium', 2, 7),
  sc('Sau tiết mục của chim yểng là tiết mục của con vật nào?', ['Mèo rừng', 'Gõ kiến', 'Chim công', 'Voọc xám'], 'A', 'medium', 2, 8),
  sc('Chi tiết nào cho thấy gõ kiến làm việc rất nhanh?', ['Gõ kiến hót rất hay', 'Gõ kiến chỉ trong nháy mắt đã khoét được cái tổ', 'Gõ kiến múa rất đẹp', 'Gõ kiến đu cây điêu luyện'], 'B', 'medium', 2, 9),
  sc('Dãy nào gồm toàn những con vật tham gia cuộc thi?', ['Chim yểng, mèo rừng, gõ kiến, chim công, voọc xám', 'Hổ, voi, cá heo, thỏ, gấu', 'Hải âu, cá, dê, sói, kiến', 'Bồ câu, sóc, cừu, hươu, bò'], 'A', 'medium', 2, 10),
  sc('Thứ tự biểu diễn nào đúng với bài đọc?', ['Chim yểng → mèo rừng → gõ kiến → chim công → voọc xám', 'Mèo rừng → chim công → chim yểng → voọc xám → gõ kiến', 'Chim công → gõ kiến → mèo rừng → chim yểng → voọc xám', 'Voọc xám → chim yểng → chim công → gõ kiến → mèo rừng'], 'A', 'hard', 3, 1),
  sc('Vì sao tất cả các con vật đều xứng đáng nhận phần thưởng?', ['Vì mỗi con vật đều có một tài năng riêng và biểu diễn hết mình', 'Vì tất cả đều biểu diễn cùng một tiết mục', 'Vì không có khán giả xem cuộc thi', 'Vì phần thưởng không có giá trị'], 'A', 'hard', 3, 2),
  sc('Chi tiết nào cho thấy chim yểng có khả năng đặc biệt?', ['Chim yểng có thể bắt chước tiếng của một số loài vật', 'Chim yểng khoét tổ rất nhanh', 'Chim yểng múa xòe đuôi', 'Chim yểng đu cây rất giỏi'], 'A', 'hard', 3, 3),
  sc('Vì sao tiết mục của chim công làm khán giả say mê?', ['Vì chim công có điệu múa tuyệt đẹp', 'Vì chim công hát "ngoao ngoao"', 'Vì chim công khoét được chiếc tổ', 'Vì chim công bắt chước tiếng các loài vật'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào thể hiện voọc xám biểu diễn rất thành thạo?', ['Voọc xám đu cây điêu luyện', 'Voọc xám nhoẻn miệng cười', 'Voọc xám hát một ca khúc', 'Voọc xám khoét tổ trong nháy mắt'], 'A', 'hard', 3, 5),
  sc('Điểm chung giữa các con vật tham gia cuộc thi là gì?', ['Mỗi con vật đều tự tin thể hiện khả năng riêng', 'Tất cả đều biết múa', 'Tất cả đều biết hót', 'Tất cả đều sống dưới nước'], 'A', 'hard', 3, 6),
  sc('Câu nào hoàn thành đúng nội dung bài: Cuộc thi mở đầu bằng (…).', ['tiết mục bắt chước tiếng các loài vật của chim yểng', 'điệu múa của chim công', 'tiết mục đu cây của voọc xám', 'ca khúc của mèo rừng'], 'A', 'hard', 3, 7),
  {
    questionText: 'Sắp xếp các từ sau thành câu đúng: chim công / điệu múa / trình diễn / tuyệt đẹp',
    questionType: 'drag_drop',
    optionsJson: [
      { key: '1', text: 'chim công' },
      { key: '2', text: 'điệu múa' },
      { key: '3', text: 'trình diễn' },
      { key: '4', text: 'tuyệt đẹp' },
    ],
    correctAnswerJson: ['1', '3', '2', '4'], // Chim công trình diễn điệu múa tuyệt đẹp
    difficultyLevel: 'hard', exerciseNumber: 3, sortOrder: 8,
    explanation: 'Câu đúng: "Chim công trình diễn điệu múa tuyệt đẹp".',
  },
  sc('Tên nào phù hợp với bức tranh cá heo đang nhảy khỏi mặt nước?', ['Cá heo tung mình trên sóng', 'Chim công múa đẹp', 'Voọc xám đu cây', 'Gõ kiến làm tổ'], 'A', 'hard', 3, 9),
  sc('Bài học phù hợp nhất được rút ra từ bài đọc là gì?', ['Mỗi người đều có khả năng riêng, cần tự tin thể hiện và tôn trọng tài năng của người khác', 'Chỉ người giỏi nhất mới đáng được khen', 'Không nên tham gia các hoạt động tập thể', 'Mọi người phải có tài năng giống nhau'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B36 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
