/**
 * Xoá file audio TTS trên S3 KHÔNG CÒN bản ghi nào trỏ tới (file mồ côi).
 *   node scripts/xoa-s3-mo-coi.cjs           # xem trước
 *   node scripts/xoa-s3-mo-coi.cjs --apply   # xoá thật
 *
 * Vì sao có file mồ côi: những lượt trước xoá bản ghi trong `tts_cache` bằng SQL
 * mà quên xoá file trên S3, nên file vẫn nằm đó, tốn dung lượng và không ai dùng.
 *
 * Chỉ đụng đến thư mục `<prefix>/tts/` — nơi duy nhất chứa audio TTS.
 */
require('dotenv').config();
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');
const BUCKET = process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET;
const REGION = process.env.AWS_S3_REGION || process.env.AWS_REGION || 'ap-southeast-1';
const KEY_ID = process.env.AWS_ACCESS_KEY_ID || process.env.AWS_S3_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_S3_SECRET_ACCESS_KEY;
const PREFIX = (process.env.AWS_S3_PREFIX || process.env.AWS_S3_FOLDER || '').replace(/^\/+|\/+$/g, '');
const THU_MUC = (PREFIX ? `${PREFIX}/` : '') + 'tts/';
const HOST = `${BUCKET}.s3.${REGION}.amazonaws.com`;

/** Ký AWS SigV4 cho một GET (dùng để liệt kê). Phần PUT/DELETE đã có trong S3UploadService. */
function kyGet(canonicalUri, canonicalQuery) {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const bodyHash = crypto.createHash('sha256').update('').digest('hex');
  const canonicalHeaders = `host:${HOST}\nx-amz-content-sha256:${bodyHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = ['GET', canonicalUri, canonicalQuery, canonicalHeaders, signedHeaders, bodyHash].join('\n');
  const scope = `${dateStamp}/${REGION}/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex')].join('\n');
  const hmac = (k, d) => crypto.createHmac('sha256', k).update(d).digest();
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${SECRET}`, dateStamp), REGION), 's3'), 'aws4_request');
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  return {
    Authorization: `AWS4-HMAC-SHA256 Credential=${KEY_ID}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    'x-amz-content-sha256': bodyHash,
    'x-amz-date': amzDate,
  };
}

function lietKe(token) {
  const q = ['list-type=2', `prefix=${encodeURIComponent(THU_MUC)}`, 'max-keys=1000']
    .concat(token ? [`continuation-token=${encodeURIComponent(token)}`] : [])
    .sort().join('&');
  return new Promise((resolve, reject) => {
    const req = https.request({ method: 'GET', host: HOST, path: `/?${q}`, headers: kyGet('/', q) }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => (res.statusCode === 200 ? resolve(body) : reject(new Error(`S3 ${res.statusCode}: ${body.slice(0, 200)}`))));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  if (!BUCKET || !KEY_ID || !SECRET) { console.error('Thiếu cấu hình S3 trong .env'); process.exit(1); }

  const TMP = path.join(__dirname, '..', '.tmp-s3');
  fs.rmSync(TMP, { recursive: true, force: true });
  execFileSync('node', ['node_modules/typescript/bin/tsc', '--target', 'es2020', '--module', 'commonjs',
    '--esModuleInterop', '--skipLibCheck', '--experimentalDecorators', '--emitDecoratorMetadata',
    '--outDir', TMP, 'src/common/services/s3-upload.service.ts'], { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  const { S3UploadService } = require(path.join(TMP, 's3-upload.service.js'));
  const s3 = new S3UploadService({ get: (k) => process.env[k] });

  // Liệt kê mọi file trong thư mục tts/
  const tatCa = [];
  let token = null;
  do {
    const xml = await lietKe(token);
    for (const m of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) tatCa.push(m[1]);
    const t = xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/);
    token = xml.includes('<IsTruncated>true</IsTruncated>') && t ? t[1] : null;
  } while (token);

  // Những file đang được dùng
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await db.query("SELECT audioUrl FROM tts_cache WHERE audioUrl LIKE '%/tts/%'");
  const dangDung = new Set(rows.map((r) => { try { return new URL(r.audioUrl).pathname.replace(/^\//, ''); } catch { return ''; } }));

  const moCoi = tatCa.filter((k) => !dangDung.has(k));
  console.log(`File trong ${THU_MUC} : ${tatCa.length}`);
  console.log(`Đang được dùng        : ${dangDung.size}`);
  console.log(`MỒ CÔI (xoá được)     : ${moCoi.length}`);

  if (!APPLY) {
    console.log('\nXem trước. Thêm --apply để xoá thật.');
    await db.end(); fs.rmSync(TMP, { recursive: true, force: true }); return;
  }

  let xong = 0, loi = 0;
  for (const k of moCoi) {
    try { await s3.deleteByUrl(`https://${HOST}/${k}`); xong++; } catch { loi++; }
    if ((xong + loi) % 100 === 0) console.log(`  ${xong + loi}/${moCoi.length}`);
  }
  console.log(`\n✓ Đã xoá ${xong} file mồ côi${loi ? `, ${loi} file xoá không được` : ''}.`);
  await db.end();
  fs.rmSync(TMP, { recursive: true, force: true });
})().catch((e) => { console.error(e); process.exit(1); });
