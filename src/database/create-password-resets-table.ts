/**
 * Tạo bảng `password_resets` (token đặt lại mật khẩu gửi qua email).
 *   npm run db:password-resets:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột camelCase để khớp entity
 * TypeORM (PasswordReset) — DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS password_resets (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT UNSIGNED NOT NULL,
  tokenHash CHAR(64) NOT NULL,
  expiresAt DATETIME NOT NULL,
  usedAt DATETIME NULL,
  requestIp VARCHAR(64) NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY UQ_password_resets_token (tokenHash),
  KEY IDX_password_resets_user (userId)
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
  });
  await conn.query(SQL);
  console.log('✓ Đã tạo/đảm bảo bảng password_resets.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng password_resets:', err);
  process.exit(1);
});
