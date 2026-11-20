/**
 * Tạo bảng phòng thi đấu Sân chơi Trí tuệ: `challenge_rooms`, `challenge_room_scores`.
 *   npm run db:challenges:rooms
 * An toàn chạy lại (CREATE TABLE IF NOT EXISTS).
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS challenge_rooms (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(8) NOT NULL,
  title VARCHAR(60) NOT NULL,
  hostName VARCHAR(60) NOT NULL,
  grade TINYINT UNSIGNED NOT NULL DEFAULT 2,
  seed VARCHAR(32) NOT NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  expiresAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_challenge_room_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS challenge_room_scores (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  roomId INT UNSIGNED NOT NULL,
  name VARCHAR(60) NOT NULL,
  avatar VARCHAR(255) NULL,
  score INT UNSIGNED NOT NULL DEFAULT 0,
  correct TINYINT UNSIGNED NOT NULL DEFAULT 0,
  timeSec INT UNSIGNED NOT NULL DEFAULT 0,
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_challenge_room_player (roomId, name),
  KEY idx_challenge_room_scores_room (roomId, score)
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
  console.log('✓ Đã tạo/đảm bảo bảng challenge_rooms, challenge_room_scores.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng phòng thi đấu:', err);
  process.exit(1);
});
