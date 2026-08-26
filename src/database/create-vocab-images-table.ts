/**
 * Tạo bảng `vocab_images` lưu ảnh admin upload cho từ vựng tiếng Anh.
 *   npm run db:vocab-images:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột camelCase để khớp
 * entity TypeORM (VocabImage) — DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS vocab_images (
  wordId VARCHAR(120) NOT NULL,
  imageUrl TEXT NOT NULL,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (wordId)
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
  console.log('✓ Đã tạo/đảm bảo bảng vocab_images.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng vocab_images:', err);
  process.exit(1);
});
