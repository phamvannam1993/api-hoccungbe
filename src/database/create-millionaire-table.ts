/**
 * Tạo bảng `millionaire_runs` cho game "Ai Là Triệu Phú Nhí".
 *   npm run db:millionaire:table
 * An toàn chạy lại nhiều lần. DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS millionaire_runs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  childId BIGINT UNSIGNED NULL,
  name VARCHAR(40) NOT NULL,
  avatar VARCHAR(40) NULL,
  grade TINYINT UNSIGNED NOT NULL,
  mode ENUM('classic','speed','boss') NOT NULL DEFAULT 'classic',
  totalQuestions INT UNSIGNED NOT NULL DEFAULT 0,
  correctCount INT UNSIGNED NOT NULL DEFAULT 0,
  prize INT UNSIGNED NOT NULL DEFAULT 0,
  score INT UNSIGNED NOT NULL DEFAULT 0,
  bestCombo INT UNSIGNED NOT NULL DEFAULT 0,
  timeSec INT UNSIGNED NOT NULL DEFAULT 0,
  week VARCHAR(10) NOT NULL,
  month VARCHAR(7) NOT NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_mr_week (grade, week),
  KEY idx_mr_name (name, grade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function main() {
  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  await conn.query(SQL);
  console.log('✓ Đã tạo/đảm bảo bảng millionaire_runs.');
  await conn.end();
}

main().catch((err) => { console.error('✗ Lỗi tạo bảng millionaire_runs:', err); process.exit(1); });
