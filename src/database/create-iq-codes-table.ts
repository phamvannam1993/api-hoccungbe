/**
 * Tạo bảng `iq_activation_codes` (mã kích hoạt khóa Toán IQ) và `iq_entitlements`
 * (các lượt học 1 tháng theo tài khoản) và `iq_orders` (đơn mua chờ duyệt).
 *   npm run db:iq-codes:table
 * An toàn chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS, chỉ thêm cột còn thiếu). Cột
 * camelCase để khớp entity TypeORM — DB không bật synchronize nên tạo bảng thủ công.
 */
import 'dotenv/config';
import { createConnection } from 'mysql2/promise';

const CODES = `
CREATE TABLE IF NOT EXISTS iq_activation_codes (
  code VARCHAR(32) NOT NULL,
  prefix VARCHAR(20) NOT NULL,
  note VARCHAR(255) NULL,
  maxUses INT NOT NULL DEFAULT 1,
  useCount INT NOT NULL DEFAULT 0,
  status VARCHAR(16) NOT NULL DEFAULT 'active',
  createdBy VARCHAR(120) NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  lastUsedAt DATETIME NULL,
  redeemedBy INT NULL,
  redeemedEmail VARCHAR(150) NULL,
  PRIMARY KEY (code),
  KEY IDX_iq_codes_prefix (prefix),
  KEY IDX_iq_codes_redeemed_by (redeemedBy)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const ENTITLEMENTS = `
CREATE TABLE IF NOT EXISTS iq_entitlements (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  prefix VARCHAR(20) NOT NULL,
  code VARCHAR(32) NOT NULL,
  startsAt DATETIME NOT NULL,
  expiresAt DATETIME NOT NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY UQ_iq_entitlements_code (code),
  KEY IDX_iq_entitlements_user_prefix (userId, prefix)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const ORDERS = `
CREATE TABLE IF NOT EXISTS iq_orders (
  id INT NOT NULL AUTO_INCREMENT,
  code VARCHAR(32) NOT NULL,
  userId INT UNSIGNED NOT NULL,
  userEmail VARCHAR(150) NULL,
  userName VARCHAR(100) NULL,
  prefix VARCHAR(20) NOT NULL,
  title VARCHAR(200) NOT NULL,
  amount INT UNSIGNED NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'pending',
  adminNote VARCHAR(255) NULL,
  expiresAt DATETIME NULL,
  reviewedBy VARCHAR(120) NULL,
  reviewedAt DATETIME NULL,
  createdAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UQ_iq_orders_code (code),
  KEY IDX_iq_orders_user (userId),
  KEY IDX_iq_orders_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

/** Cột payOS của iq_orders (thêm nếu thiếu). */
const ORDER_COLUMNS: [string, string][] = [
  [
    'payosOrderCode',
    'ADD COLUMN payosOrderCode BIGINT NULL, ADD UNIQUE KEY UQ_iq_orders_payos (payosOrderCode)',
  ],
  ['payosAmount', 'ADD COLUMN payosAmount INT UNSIGNED NULL'],
  ['checkoutUrl', 'ADD COLUMN checkoutUrl TEXT NULL'],
  ['qrCode', 'ADD COLUMN qrCode TEXT NULL'],
  ['payosExpiresAt', 'ADD COLUMN payosExpiresAt DATETIME NULL'],
  ['paidAt', 'ADD COLUMN paidAt DATETIME NULL'],
  ['payRef', 'ADD COLUMN payRef VARCHAR(64) NULL'],
];

/** Bảng tạo từ bản cũ chưa có cột gắn tài khoản → thêm vào. */
const ADD_COLUMNS: [string, string][] = [
  [
    'redeemedBy',
    'ADD COLUMN redeemedBy INT NULL, ADD KEY IDX_iq_codes_redeemed_by (redeemedBy)',
  ],
  ['redeemedEmail', 'ADD COLUMN redeemedEmail VARCHAR(150) NULL'],
];

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

  await conn.query(CODES);
  for (const [column, alter] of ADD_COLUMNS) {
    const [rows] = await conn.query(
      `SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'iq_activation_codes' AND COLUMN_NAME = ?`,
      [database, column],
    );
    if ((rows as unknown[]).length === 0) {
      await conn.query(`ALTER TABLE iq_activation_codes ${alter}`);
      console.log(`  + thêm cột ${column}`);
    }
  }
  console.log('✓ Đã tạo/đảm bảo bảng iq_activation_codes.');

  await conn.query(ENTITLEMENTS);
  console.log('✓ Đã tạo/đảm bảo bảng iq_entitlements.');

  await conn.query(ORDERS);
  for (const [column, alter] of ORDER_COLUMNS) {
    const [rows] = await conn.query(
      `SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'iq_orders' AND COLUMN_NAME = ?`,
      [database, column],
    );
    if ((rows as unknown[]).length === 0) {
      await conn.query(`ALTER TABLE iq_orders ${alter}`);
      console.log(`  + thêm cột iq_orders.${column}`);
    }
  }
  console.log('✓ Đã tạo/đảm bảo bảng iq_orders.');
  await conn.end();
}

main().catch((err) => {
  console.error('✗ Lỗi tạo bảng mã kích hoạt Toán IQ:', err);
  process.exit(1);
});
