require('dotenv').config();
const mysql = require('mysql2/promise');

const TYPE_VI = {
  single_choice: 'trắc nghiệm', multiple_choice: 'chọn nhiều đáp án', true_false: 'đúng–sai',
  drag_drop: 'sắp xếp câu', matching: 'nối', fill_blank: 'điền chỗ trống',
  sorting: 'sắp xếp thứ tự', image_choice: 'chọn hình',
};
const PRACTICE = [
  (t) => `Bé được luyện qua các dạng ${t}, có phản hồi đúng/sai ngay sau mỗi câu.`,
  (t) => `Các bài tập ${t} giúp bé ghi nhớ và vận dụng kiến thức ngay trong bài.`,
  (t) => `Bé thực hành bằng ${t}, kèm giải thích đáp án để hiểu sâu hơn.`,
  (t) => `Thông qua ${t}, bé vừa học vừa chơi và tự kiểm tra kết quả của mình.`,
];

function buildIntro(content, types, id) {
  const uniq = types.map((x) => TYPE_VI[x] || x).filter((v, i, a) => a.indexOf(v) === i);
  const t = uniq.length ? uniq.join(', ') : 'trắc nghiệm, nối, đúng–sai và sắp xếp câu';
  const core = (content || '').trim().replace(/\s+/g, ' ');
  return `${core} ${PRACTICE[id % PRACTICE.length](t)}`.trim();
}

(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  const [rows] = await c.query(
    "SELECT id, title, content FROM lessons WHERE seoDescription LIKE '%kỹ năng%chương trình%' AND content IS NOT NULL AND TRIM(content) <> ''"
  );
  console.log('Bài cần sửa:', rows.length);
  let done = 0, skip = 0;
  for (const r of rows) {
    const [tp] = await c.query('SELECT DISTINCT questionType FROM quizzes WHERE lessonId=? AND isActive=1', [r.id]);
    const intro = buildIntro(r.content, tp.map((x) => x.questionType), r.id);
    if (!intro || intro.length < 20) { skip++; continue; }
    await c.query('UPDATE lessons SET seoDescription=? WHERE id=?', [intro, r.id]);
    done++;
  }
  console.log(`✅ Đã cập nhật: ${done} | bỏ qua: ${skip}`);
  const [[left]] = await c.query("SELECT COUNT(*) n FROM lessons WHERE seoDescription LIKE '%kỹ năng%chương trình%'");
  console.log('Còn dính mẫu lỗi:', left.n);
  await c.end();
})();
