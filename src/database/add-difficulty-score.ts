/**
 * Thêm cột `difficultyScore` (1–15) cho `skill_questions`.
 *   npm run db:difficulty:col
 *
 * Nhãn easy/medium/hard chỉ có 3 bậc, không đủ để xếp 15 mốc leo thang của
 * "Ai là triệu phú". Cột này lưu bậc khó tinh hơn, tính bằng
 * `scripts/score-difficulty.cjs`.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

async function main() {
  const conn = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [cols] = await conn.query<any[]>(
    `SELECT COLUMN_NAME AS c FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skill_questions'`,
    [process.env.DB_NAME],
  );
  if (cols.some((r) => r.c === 'difficultyScore')) {
    console.log('· difficultyScore: đã có, bỏ qua');
  } else {
    await conn.query('ALTER TABLE skill_questions ADD COLUMN difficultyScore TINYINT UNSIGNED NOT NULL DEFAULT 0');
    await conn.query('ALTER TABLE skill_questions ADD KEY idx_sq_score (grade, difficultyScore, isActive)');
    console.log('✓ Đã thêm cột difficultyScore + chỉ mục');
  }
  await conn.end();
}

main().catch((err) => { console.error('✗ Lỗi:', err); process.exit(1); });
