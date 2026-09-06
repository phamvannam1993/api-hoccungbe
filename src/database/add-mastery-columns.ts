/**
 * Thêm cột lịch ôn tập cho `child_skill_mastery`.
 *   npm run db:mastery:cols
 *
 * `nextReviewAt`   — hẹn lần ôn tiếp theo (ôn giãn cách). Quá hạn mà không ôn
 *                    thì mức thành thạo bị coi là đã phai, cần kiểm tra lại.
 * `levelUpdatedAt` — mốc bé lên/tụt bậc gần nhất.
 *
 * An toàn chạy lại nhiều lần. DB không bật synchronize nên phải thêm cột thủ công.
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
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'child_skill_mastery'`,
    [process.env.DB_NAME],
  );
  const have = new Set(cols.map((r) => r.c));

  const wanted: [string, string][] = [
    ['nextReviewAt', 'ALTER TABLE child_skill_mastery ADD COLUMN nextReviewAt DATETIME NULL'],
    ['levelUpdatedAt', 'ALTER TABLE child_skill_mastery ADD COLUMN levelUpdatedAt DATETIME NULL'],
  ];

  for (const [name, sql] of wanted) {
    if (have.has(name)) {
      console.log(`· ${name}: đã có, bỏ qua`);
      continue;
    }
    await conn.query(sql);
    console.log(`✓ Đã thêm cột ${name}`);
  }

  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi thêm cột child_skill_mastery:', err);
  process.exit(1);
});
