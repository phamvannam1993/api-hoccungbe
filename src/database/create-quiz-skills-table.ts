/**
 * Tạo bảng `quiz_skills` — gắn kỹ năng ở mức CÂU HỎI.
 *   npm run db:quiz-skills:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột camelCase để khớp
 * entity TypeORM (QuizSkill) — DB không bật synchronize nên tạo bảng thủ công.
 *
 * Sau khi tạo bảng, chạy `node scripts/tag-quiz-skills.cjs --apply` để gắn dữ liệu.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS quiz_skills (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quizId BIGINT UNSIGNED NOT NULL,
  skillId BIGINT UNSIGNED NOT NULL,
  weight TINYINT UNSIGNED NOT NULL DEFAULT 1,
  source ENUM('rule','lesson','manual') NOT NULL DEFAULT 'rule',
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_quiz_skill (quizId, skillId),
  KEY idx_quiz_skills_skill (skillId)
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
  console.log('✓ Đã tạo/đảm bảo bảng quiz_skills.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng quiz_skills:', err);
  process.exit(1);
});
