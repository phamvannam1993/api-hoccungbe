/**
 * Tạo bảng `challenge_daily` cho Thi Tài (điểm cộng dồn theo ngày, trần 1000/ngày).
 *   npm run db:challenges:daily
 * An toàn chạy lại (CREATE TABLE IF NOT EXISTS).
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS challenge_daily (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  date VARCHAR(10) NOT NULL,
  week VARCHAR(10) NOT NULL,
  subject VARCHAR(20) NOT NULL DEFAULT 'toan',
  grade TINYINT UNSIGNED NOT NULL DEFAULT 1,
  points INT UNSIGNED NOT NULL DEFAULT 0,
  timeSec INT UNSIGNED NOT NULL DEFAULT 0,
  avatar VARCHAR(255) NULL,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_challenge_daily (name, date, grade, subject),
  KEY idx_challenge_daily_week (week, grade, subject)
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
  // Đảm bảo cột `avatar` tồn tại (bảng cũ tạo trước khi thêm ảnh) — thêm nếu thiếu.
  const [cols] = (await conn.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'challenge_daily' AND COLUMN_NAME = 'avatar'`,
    [database],
  )) as unknown as [Array<{ COLUMN_NAME: string }>];
  if (!cols.length) {
    await conn.query(`ALTER TABLE challenge_daily ADD COLUMN avatar VARCHAR(255) NULL AFTER timeSec`);
    console.log('  + Đã thêm cột avatar.');
  }
  console.log('✓ Đã tạo/đảm bảo bảng challenge_daily.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng challenge_daily:', err);
  process.exit(1);
});
