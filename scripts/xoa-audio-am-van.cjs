/**
 * Xoá audio Vòng tròn âm vần: cả bản ghi tts_cache lẫn file trên S3.
 *   node scripts/xoa-audio-am-van.cjs /tmp/am-van-texts.json           # xem trước
 *   node scripts/xoa-audio-am-van.cjs /tmp/am-van-texts.json --apply   # xoá thật
 *
 * CHỈ xoá những đoạn nằm trong danh sách âm vần. Bảng `tts_cache` dùng CHUNG với
 * audio của phần bài tập — xoá sạch bảng là mất luôn giọng đọc của toàn bộ câu
 * hỏi, sinh lại rất lâu. Vì vậy script khoá phạm vi theo đúng 705 đoạn đó.
 */
require('dotenv').config();
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const FILE = process.argv[2] || '/tmp/am-van-texts.json';
const APPLY = process.argv.includes('--apply');

const TMP = path.join(__dirname, '..', '.tmp-xoa-tts');
fs.rmSync(TMP, { recursive: true, force: true });
execFileSync('node', [
  'node_modules/typescript/bin/tsc', '--target', 'es2020', '--module', 'commonjs',
  '--esModuleInterop', '--skipLibCheck', '--experimentalDecorators', '--emitDecoratorMetadata',
  '--outDir', TMP, 'src/common/services/s3-upload.service.ts', 'src/modules/tts/tts-preprocess.ts',
], { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

const { S3UploadService } = require(path.join(TMP, 'common/services/s3-upload.service.js'));
const { preprocessTTS, toVietnamesePhonics } = require(path.join(TMP, 'modules/tts/tts-preprocess.js'));
const s3 = new S3UploadService({ get: (k) => process.env[k] });

const chuanHoa = (text) => toVietnamesePhonics(
  String(text || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '').replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim(),
);
const khoa = (t) => crypto.createHash('sha256').update(`vi|+0%|+0Hz|${t}`).digest('hex');

(async () => {
  // Nhận cả hai dạng file: mảng phẳng (bản cũ) và { nhom, le } (bản theo nhóm).
  const doc = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const raw = Array.isArray(doc) ? doc : [...(doc.nhom || []).flat(), ...(doc.le || [])];
  const keys = [...new Set(raw.map((r) => chuanHoa(preprocessTTS(r))).filter(Boolean))].map(khoa);

  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await db.query('SELECT cacheKey, audioUrl FROM tts_cache WHERE cacheKey IN (?)', [keys]);
  const [[{ tong }]] = await db.query('SELECT COUNT(*) tong FROM tts_cache');

  console.log(`Đoạn âm vần trong danh sách : ${keys.length}`);
  console.log(`Đang có audio               : ${rows.length}`);
  console.log(`Tổng cả bảng tts_cache      : ${tong}  (phần còn lại là audio bài tập, KHÔNG đụng tới)`);

  if (!APPLY) {
    console.log('\nXem trước. Thêm --apply để xoá thật.');
    await db.end(); fs.rmSync(TMP, { recursive: true, force: true });
    return;
  }

  let xoaS3 = 0, loiS3 = 0;
  for (const r of rows) {
    try { await s3.deleteByUrl(r.audioUrl); xoaS3++; } catch { loiS3++; }
  }
  const [kq] = await db.query('DELETE FROM tts_cache WHERE cacheKey IN (?)', [keys]);
  console.log(`\n✓ Đã xoá ${kq.affectedRows} bản ghi, ${xoaS3} file trên S3${loiS3 ? ` (${loiS3} file xoá không được)` : ''}.`);
  await db.end();
  fs.rmSync(TMP, { recursive: true, force: true });
})().catch((e) => { console.error(e); process.exit(1); });
