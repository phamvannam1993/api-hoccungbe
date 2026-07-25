require('dotenv').config();
const mysql = require('mysql2/promise');
const TITLE_LIKE = '%Những cánh cò%';
const sc = (q, opts, correct, diff, ex, sort, exp = '') => ({
  questionText: q, questionType: 'single_choice',
  optionsJson: opts.map((t, i) => ({ key: 'ABCD'[i], text: t })),
  correctAnswerJson: correct, difficultyLevel: diff, exerciseNumber: ex, sortOrder: sort, explanation: exp,
});
const Q = [
  sc('Bài đọc có tên là gì?', ['Cánh đồng quê', 'Những cánh cò', 'Đàn chim trắng', 'Quê hương của bé'], 'B', 'easy', 1, 1),
  sc('Ngày xưa, quê của bé có rất nhiều con gì?', ['Chim sẻ', 'Chim én', 'Cò', 'Công'], 'C', 'easy', 1, 2),
  sc('Cò thường bay về quê của bé vào mùa nào?', ['Mùa xuân', 'Mùa hè', 'Mùa thu', 'Mùa đông'], 'A', 'easy', 1, 3),
  sc('Những đàn cò có màu gì?', ['Màu đen', 'Màu trắng', 'Màu vàng', 'Màu nâu'], 'B', 'easy', 1, 4),
  sc('Đàn cò lượn ở đâu?', ['Dưới mặt đất', 'Trên bầu trời trong xanh', 'Trong nhà máy', 'Trên đường cao tốc'], 'B', 'easy', 1, 5),
  sc('Sau khi bay lượn, đàn cò hạ cánh xuống đâu?', ['Những mái nhà', 'Những lũy tre', 'Những con đường', 'Những tòa nhà'], 'B', 'easy', 1, 6),
  sc('Hằng ngày, cò đi mò con gì?', ['Tôm', 'Cua', 'Ốc', 'Sâu'], 'A', 'easy', 1, 7),
  sc('Ngoài mò tôm, cò còn làm gì?', ['Hái quả', 'Bắt cá', 'Bắt sâu trên cây', 'Đào hang'], 'B', 'easy', 1, 8),
  sc('Cò kiếm ăn ở đâu?', ['Ao, hồ, đầm', 'Trên đường phố', 'Trong nhà máy', 'Trên sân trường'], 'A', 'easy', 1, 9),
  sc('Cuối bài, bé ước ao điều gì?', ['Được nuôi một chú cò trong nhà', 'Được thấy những cánh cò trên cánh đồng quê', 'Được đến thăm nhà máy', 'Được đi trên đường cao tốc'], 'B', 'easy', 1, 10),
  sc('Từ "lũy tre" chỉ hình ảnh nào?', ['Nhiều cây tre mọc thành hàng quanh làng', 'Một cây tre nhỏ trong chậu', 'Những cây hoa ven đường', 'Một khu rừng thông'], 'A', 'medium', 2, 1),
  sc('Từ "cao vút" có nghĩa là gì?', ['Rất thấp', 'Cao thẳng lên phía trên', 'Nằm ngang trên mặt đất', 'Rộng lớn dưới mặt nước'], 'B', 'medium', 2, 2),
  sc('Từ "cao tốc" trong cụm từ "đường cao tốc" chỉ loại đường nào?', ['Đường dành cho phương tiện đi với tốc độ cao', 'Đường nhỏ trong làng', 'Đường chỉ dành cho người đi bộ', 'Đường đi lên núi'], 'A', 'medium', 2, 3),
  sc('Cụm từ "khói mịt mù" miêu tả cảnh như thế nào?', ['Khói dày đặc, làm khó nhìn rõ', 'Trời trong xanh, không có khói', 'Có vài đám mây trắng', 'Không khí rất mát mẻ'], 'A', 'medium', 2, 4),
  sc('Bây giờ, những gì đã thay thế ao, hồ, đầm?', ['Lũy tre và cánh đồng', 'Nhà cao tầng, đường cao tốc và nhà máy', 'Vườn hoa và công viên', 'Rừng cây và dòng suối'], 'B', 'medium', 2, 5),
  sc('Vì sao cò không còn nơi kiếm ăn?', ['Vì ao, hồ, đầm đã bị thu hẹp hoặc biến mất', 'Vì cò không thích ăn tôm cá', 'Vì cò chỉ ăn hoa quả', 'Vì cò không biết bay'], 'A', 'medium', 2, 6),
  sc('Điều gì khiến đàn cò sợ hãi?', ['Những âm thanh ồn ào', 'Bầu trời trong xanh', 'Những lũy tre', 'Các cánh đồng lúa'], 'A', 'medium', 2, 7),
  sc('Chọn từ thích hợp để hoàn thành câu: Đàn chim đậu trên những (…) cao vút.', ['ao hồ', 'đường cao tốc', 'ngọn cây', 'nhà máy'], 'C', 'medium', 2, 8),
  sc('Chọn từ thích hợp để hoàn thành câu: Từng áng mây trắng nhẹ trôi trên bầu trời (…).', ['ồn ào', 'trong xanh', 'mịt mù', 'cao tốc'], 'B', 'medium', 2, 9),
  sc('Câu nào nói đúng nội dung bài đọc?', ['Cò rời đi vì không còn nơi kiếm ăn và sợ tiếng ồn', 'Cò rời đi vì không thích mùa xuân', 'Cò rời đi vì muốn sống trong nhà máy', 'Cò rời đi vì cánh đồng có quá nhiều cá'], 'A', 'medium', 2, 10),
  sc('Thứ tự nào đúng với nội dung bài đọc?', ['Cò bay về quê → kiếm ăn ở ao hồ → môi trường thay đổi → cò bay đi → bé mong cò trở lại', 'Cò bay đi → ao hồ xuất hiện → bé xây nhà máy', 'Nhà máy biến mất → cò sợ hãi → đường cao tốc được xây', 'Bé gặp cò → cò xây nhà → cò đi học'], 'A', 'hard', 3, 1),
  sc('Vì sao cảnh quê ngày xưa thích hợp với đàn cò?', ['Có ao, hồ, đầm để kiếm ăn và có lũy tre để đậu', 'Có nhiều nhà cao tầng', 'Có nhiều xe cộ và đường cao tốc', 'Có nhiều nhà máy tỏa khói'], 'A', 'hard', 3, 2),
  sc('Điểm khác nhau chính giữa hai bức tranh đầu bài là gì?', ['Một bên là đồng quê trong lành, một bên là thành phố nhiều nhà máy và khói', 'Cả hai bên đều là cánh đồng quê', 'Một bên có cò, một bên có cá', 'Cả hai bên đều có không khí trong lành'], 'A', 'hard', 3, 3),
  sc('Vì sao bé ước được thấy những cánh cò trên cánh đồng quê?', ['Vì bé yêu cảnh quê thanh bình và mong cò có nơi sinh sống', 'Vì bé muốn bắt cò về nuôi', 'Vì bé muốn cò bay vào nhà máy', 'Vì bé không thích ao hồ'], 'A', 'hard', 3, 4),
  sc('Chi tiết nào cho thấy sự phát triển thiếu hợp lí đã ảnh hưởng đến đàn cò?', ['Ao, hồ, đầm phải nhường chỗ cho nhà cao tầng, đường cao tốc và nhà máy', 'Mùa xuân có nhiều đàn cò bay tới', 'Cò hạ cánh xuống những lũy tre', 'Cò mò tôm và bắt cá'], 'A', 'hard', 3, 5),
  sc('Trong các việc dưới đây, việc nào tốt cho môi trường?', ['Tưới và chăm sóc cây xanh', 'Vứt rác xuống đường', 'Ném rác xuống sông', 'Xả khói mịt mù'], 'A', 'hard', 3, 6),
  sc('Việc nào dưới đây chưa tốt?', ['Bỏ rác đúng thùng', 'Trồng và tưới cây', 'Vứt hộp rác ra đường', 'Giữ sạch ao hồ'], 'C', 'hard', 3, 7),
  sc('Dãy nào được điền đúng vần? cánh đ… – tr… suốt – ước m…', ['đồng – trong – mong', 'đong – trông – mông', 'đồng – trông – mong', 'đong – trong – mông'], 'A', 'hard', 3, 8, 'Viết đúng: "cánh đồng – trong suốt – ước mong".'),
  sc('Dãy nào được điền đúng vần anh hoặc ênh? c… chim – con k… – âm th…', ['cánh chim – con kênh – âm thanh', 'cênh chim – con kanh – âm thênh', 'cánh chim – con kánh – âm thênh', 'cênh chim – con kênh – âm thanh'], 'A', 'hard', 3, 9, 'Viết đúng: "cánh chim – con kênh – âm thanh".'),
  sc('Bài học quan trọng nhất được rút ra từ bài đọc là gì?', ['Cần bảo vệ ao hồ, cây cối và môi trường sống của các loài vật', 'Nên xây thật nhiều nhà máy ở nơi chim kiếm ăn', 'Có thể xả rác và tạo tiếng ồn ở mọi nơi', 'Chỉ cần bảo vệ những con vật được nuôi trong nhà'], 'A', 'hard', 3, 10),
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
    console.log('HK2-B43 XONG:', n.map(x => x.difficultyLevel + ':' + x.n).join(', '));
  } catch (e) { await c.rollback(); console.log('LỖI:', e.message); }
  await c.end();
})();
