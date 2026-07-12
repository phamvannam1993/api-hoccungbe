/**
 * Chạy file SQL migration gộp lên DB (Giai đoạn 1 + 2).
 *   npm run db:migrate:full
 * Đọc kết nối từ .env (DB_HOST/DB_PORT/DB_USERNAME/DB_PASSWORD/DB_NAME).
 * File SQL an toàn chạy lại nhiều lần (IF NOT EXISTS / INSERT IGNORE).
 */
import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createConnection } from 'mysql2/promise';

async function main() {
  const sqlPath = join(__dirname, 'sql', '00-full-migration.sql');
  const sql = readFileSync(sqlPath, 'utf8');

  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  console.log(`→ Kết nối ${host}/${database} …`);

  const conn = await createConnection({
    host,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database,
    multipleStatements: true, // bắt buộc: file có nhiều câu lệnh
  });

  try {
    console.log('→ Đang chạy migration (15 bảng + seed badges/quests/skills)…');
    const [results] = await conn.query(sql);
    // Câu SELECT kiểm tra ở cuối file là kết quả cuối cùng trả về.
    const rows = Array.isArray(results) ? results[results.length - 1] : results;
    console.log('\n✅ Migration xong. Thống kê bảng:');
    console.table(rows);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('❌ Migration lỗi:', err.message);
  process.exit(1);
});
