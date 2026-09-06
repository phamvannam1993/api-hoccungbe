/**
 * Tạo các bảng cho chế độ "Học theo kỹ năng":
 *   skill_questions        — kho câu riêng (không dùng chung bảng quizzes)
 *   skill_attempts         — một phiên luyện kỹ năng
 *   skill_attempt_answers  — từng câu trong phiên
 *
 *   npm run db:skill-practice:tables
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS). Cột camelCase để khớp
 * entity TypeORM — DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const SQL = `
CREATE TABLE IF NOT EXISTS skill_questions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  code VARCHAR(120) NOT NULL,
  skillId BIGINT UNSIGNED NOT NULL,
  grade TINYINT UNSIGNED NOT NULL,
  difficulty ENUM('easy','medium','hard') NOT NULL DEFAULT 'easy',
  questionText TEXT NOT NULL,
  optionsJson JSON NOT NULL,
  correctIndex TINYINT UNSIGNED NOT NULL DEFAULT 0,
  explanation TEXT NOT NULL,
  variantGroup VARCHAR(120) NOT NULL,
  generator VARCHAR(60) NOT NULL,
  sortOrder INT UNSIGNED NOT NULL DEFAULT 1,
  isActive TINYINT NOT NULL DEFAULT 1,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_skill_question_code (code),
  KEY idx_sq_pick (skillId, grade, difficulty, isActive),
  KEY idx_sq_variant (variantGroup)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS skill_attempts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  childId BIGINT UNSIGNED NOT NULL,
  skillId BIGINT UNSIGNED NOT NULL,
  grade TINYINT UNSIGNED NOT NULL,
  totalQuestions INT UNSIGNED NOT NULL DEFAULT 0,
  correctCount INT UNSIGNED NOT NULL DEFAULT 0,
  score DECIMAL(5,2) NOT NULL DEFAULT 0,
  timeSpentSec INT UNSIGNED NOT NULL DEFAULT 0,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_sa_child_skill (childId, skillId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS skill_attempt_answers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  attemptId BIGINT UNSIGNED NOT NULL,
  questionId BIGINT UNSIGNED NOT NULL,
  childId BIGINT UNSIGNED NOT NULL,
  isCorrect TINYINT NOT NULL DEFAULT 0,
  selectedIndex TINYINT NULL,
  retriedCorrect TINYINT NOT NULL DEFAULT 0,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY idx_saa_child_wrong (childId, isCorrect),
  KEY idx_saa_attempt (attemptId)
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
  console.log('✓ Đã tạo/đảm bảo skill_questions, skill_attempts, skill_attempt_answers.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng skill practice:', err);
  process.exit(1);
});
