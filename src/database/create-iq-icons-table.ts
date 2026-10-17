/**
 * Tạo bảng `iq_icons` lưu icon admin upload cho khu Toán IQ (frontend /khoa-hoc-vui).
 *   npm run db:iq-icons:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột camelCase để khớp
 * entity TypeORM (IqIcon) — DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS iq_icons (
  iconKey VARCHAR(80) NOT NULL,
  imageUrl TEXT NOT NULL,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (iconKey)
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
  console.log('✓ Đã tạo/đảm bảo bảng iq_icons.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng iq_icons:', err);
  process.exit(1);
});
