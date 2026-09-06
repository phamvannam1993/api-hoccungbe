/**
 * Bảng `millionaire_answers` — lưu ĐÚNG/SAI của từng câu trong game.
 *   npm run db:millionaire:answers
 *
 * Vì sao cần: `scripts/score-difficulty.cjs` chấm bậc khó chủ yếu bằng cách suy
 * từ đặc điểm câu hỏi, và cách đó có giới hạn rõ (không đoán nổi một câu từ
 * vựng khó tới đâu). Nguồn đáng tin là TỈ LỆ TRẢ LỜI ĐÚNG THẬT. Không lưu lại
 * thì thang khó mãi mãi chỉ là phỏng đoán.
 *
 * Bảng cố ý rất nhẹ: chỉ cần câu nào, đúng hay sai, lớp mấy.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS millionaire_answers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  runId BIGINT UNSIGNED NOT NULL,
  questionId BIGINT UNSIGNED NOT NULL,
  grade TINYINT UNSIGNED NOT NULL,
  isCorrect TINYINT NOT NULL DEFAULT 0,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_ma_question (questionId, isCorrect),
  KEY idx_ma_run (runId)
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
  console.log('✓ Đã tạo/đảm bảo bảng millionaire_answers.');
  await conn.end();
}

main().catch((err) => { console.error('✗ Lỗi:', err); process.exit(1); });
