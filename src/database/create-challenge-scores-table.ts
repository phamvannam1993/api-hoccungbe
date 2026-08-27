/**
 * Tạo bảng `challenge_scores` cho Đấu Trường (thi đấu tuần).
 *   npm run db:challenges:table
 * An toàn chạy lại (CREATE TABLE IF NOT EXISTS). Unique (name, week) giữ điểm cao nhất.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS challenge_scores (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  subject VARCHAR(20) NOT NULL DEFAULT 'toan',
  grade TINYINT UNSIGNED NOT NULL DEFAULT 1,
  score INT UNSIGNED NOT NULL DEFAULT 0,
  week VARCHAR(10) NOT NULL,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_challenge_name_week_grade_subject (name, week, grade, subject),
  KEY idx_challenge_week_subject_grade_score (week, subject, grade, score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function main() {
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  console.log(`→ Kết nối ${host}/${database} …`);
  const conn = await createConnection({
    host,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database,
    multipleStatements: true,
  });
  await conn.query(SQL);
  console.log('✓ Đã tạo/đảm bảo bảng challenge_scores.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng challenge_scores:', err);
  process.exit(1);
});
