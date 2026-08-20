/**
 * Tạo bảng RIÊNG cho câu hỏi IQ / Toán tư duy: `iq_questions`.
 *   npm run db:iq:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột đặt camelCase để khớp
 * entity TypeORM (IqQuestion) — DB không bật synchronize nên phải tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS iq_questions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(120) NULL,
  grade TINYINT UNSIGNED NOT NULL,
  subject VARCHAR(255) NULL,
  lesson VARCHAR(255) NULL,
  question TEXT NOT NULL,
  questionSpeech TEXT NULL,
  optionsJson JSON NOT NULL,
  correctIndex TINYINT UNSIGNED NOT NULL DEFAULT 0,
  countdownJson JSON NULL,
  explanation TEXT NULL,
  explanationSpeech TEXT NULL,
  sortOrder INT UNSIGNED NOT NULL DEFAULT 1,
  isActive TINYINT(1) NOT NULL DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_iq_questions_code (code),
  KEY idx_iq_questions_grade (grade)
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

  try {
    await conn.query(SQL);
    const [rows] = await conn.query('SHOW TABLES LIKE "iq_questions"');
    const ok = Array.isArray(rows) && rows.length > 0;
    console.log(ok ? '✅ Bảng iq_questions đã sẵn sàng.' : '⚠️ Không thấy bảng sau khi tạo.');
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('❌ Lỗi tạo bảng iq_questions:', err.message);
  process.exit(1);
});
