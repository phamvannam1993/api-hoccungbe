/**
 * Sinh audio cho một danh sách câu chữ rồi đẩy lên S3 + ghi bảng tts_cache.
 *
 *   node scripts/sinh-audio-tu-danh-sach.cjs <file.json>            # xem trước
 *   node scripts/sinh-audio-tu-danh-sach.cjs <file.json> --apply    # sinh thật
 *
 * Chạy THẲNG, không cần bật API. Dùng cho Vòng tròn âm vần: danh sách câu chữ
 * xuất từ bên hoccungbe bằng `node scripts/sinh-audio-am-van.cjs --xuat <file>`.
 *
 * Dùng LẠI S3UploadService và tts-preprocess của dự án (biên dịch tạm ra JS) thay
 * vì chép lại: phần ký AWS SigV4 và luật chuẩn hoá text mà lệch một chút là audio
 * sinh ra không khớp khoá cache, trang web sẽ không tìm thấy.
 */
require('dotenv').config();
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const FILE = process.argv[2];
const APPLY = process.argv.includes('--apply');
const SONG_SONG = Number(process.env.TTS_GEN_CONCURRENCY || 5);
const TTS_LOCAL = process.env.TTS_LOCAL_URL || 'http://localhost:8000/api/tts';
// Nhịp đọc: GIỮ NGUYÊN mức mặc định của máy chủ (-15). KHÔNG kéo chậm thêm.
//
// Kéo chậm để bắt chước nhịp Google là sai. Máy chủ làm chậm bằng bộ lọc
// `atempo` của ffmpeg — kéo giãn thời gian sau khi đã sinh tiếng — và kéo càng
// nhiều thì tiếng càng méo. Đo trên cùng 20 đoạn, nghe lại bằng máy nhận dạng:
//     nhịp -15 (mặc định) → đúng 14/20   ·  dài trung bình 0,88 s
//     nhịp -30            → đúng  9/20   ·  1,08 s
//     nhịp -45            → đúng 10/20   ·  1,37 s
// Chậm hơn mà đọc sai nhiều hơn. Giọng Google trên cùng bộ đó cũng 14/20.
const TTS_RATE = Number(process.env.TTS_RATE || -15);

if (!FILE || !fs.existsSync(FILE)) {
  console.error('Thiếu file danh sách. Vd: node scripts/sinh-audio-tu-danh-sach.cjs /tmp/am-van-texts.json');
  process.exit(1);
}

// Biên dịch vào TRONG dự án, không phải /tmp: file sinh ra vẫn require
// '@nestjs/common', mà ngoài dự án thì Node không tìm thấy node_modules.
const tmp = path.join(__dirname, '..', '.tmp-tts');
fs.rmSync(tmp, { recursive: true, force: true });
execFileSync('node', [
  'node_modules/typescript/bin/tsc',
  '--target', 'es2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck',
  '--experimentalDecorators', '--emitDecoratorMetadata',
  '--outDir', tmp,
  'src/common/services/s3-upload.service.ts', 'src/modules/tts/tts-preprocess.ts',
], { stdio: 'inherit' });

const { S3UploadService } = require(path.join(tmp, 'common/services/s3-upload.service.js'));
const { preprocessTTS, toVietnamesePhonics } = require(path.join(tmp, 'modules/tts/tts-preprocess.js'));

// ConfigService giả — service chỉ cần .get(tên biến môi trường).
const s3 = new S3UploadService({ get: (k) => process.env[k] });

/** Chuẩn hoá GIỐNG HỆT TtsService, nếu không khoá cache sẽ lệch. */
const chuanHoa = (text) => toVietnamesePhonics(
  String(text || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '')
    .replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim(),
);
const khoaCache = (text) =>
  crypto.createHash('sha256').update(`vi|+0%|+0Hz|${text}`).digest('hex');

(async () => {
  const raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const thay = new Set();
  const texts = [];
  for (const r of raw) {
    const t = chuanHoa(preprocessTTS(String(r || '')));
    if (t && !thay.has(t)) { thay.add(t); texts.push(t); }
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const keys = texts.map(khoaCache);
  const [[{ c }]] = await db.query(
    `SELECT COUNT(*) c FROM tts_cache WHERE cacheKey IN (${keys.map(() => '?').join(',')})`, keys,
  );

  console.log(`Đoạn trong file : ${raw.length}`);
  console.log(`Sau chuẩn hoá   : ${texts.length}`);
  console.log(`Đã có sẵn       : ${c}`);
  console.log(`Cần sinh mới    : ${texts.length - Number(c)}`);
  console.log(`Máy chủ TTS     : ${TTS_LOCAL}`);

  if (!APPLY) {
    console.log('\nXem trước. Thêm --apply để sinh thật.');
    await db.end(); fs.rmSync(tmp, { recursive: true, force: true });
    return;
  }

  let i = 0, moi = 0, boQua = 0, loi = 0;
  const chay = async () => {
    while (i < texts.length) {
      const text = texts[i++];
      const cacheKey = khoaCache(text);
      try {
        const [co] = await db.query('SELECT id FROM tts_cache WHERE cacheKey = ? LIMIT 1', [cacheKey]);
        if (co.length) { boQua++; continue; }

        const r = await fetch(`${TTS_LOCAL}?rate=${TTS_RATE}&text=${encodeURIComponent(text)}`);
        if (!r.ok) throw new Error(`TTS ${r.status}`);
        const j = await r.json();
        const providerUrl = j.url || j.audio_url;
        if (!providerUrl) throw new Error('TTS không trả url');

        const ar = await fetch(providerUrl);
        if (!ar.ok) throw new Error(`tải mp3 ${ar.status}`);
        const buf = Buffer.from(await ar.arrayBuffer());
        const filename = providerUrl.split('/').pop() || 'tts.mp3';

        const audioUrl = await s3.uploadAudio({ buffer: buf, originalname: filename, mimetype: 'audio/mpeg' }, 'tts');
        await db.query(
          `INSERT INTO tts_cache
             (cacheKey, text, voice, rate, pitch, audioUrl, providerUrl, filename, mimeType, fileSize, durationMs, storage, createdAt, updatedAt)
           VALUES (?,?, 'vi', '+0%', '+0Hz', ?,?,?, 'audio/mpeg', ?,?, 's3', NOW(), NOW())`,
          [cacheKey, text, audioUrl, providerUrl, filename, buf.length, Math.round((j.duration || 0) * 1000)],
        );
        moi++;
      } catch (e) {
        loi++;
        if (loi <= 5) console.log(`  ✗ "${text}": ${e.message}`);
      }
      const xong = moi + boQua + loi;
      if (xong % 25 === 0) console.log(`  ${xong}/${texts.length} (mới ${moi}, bỏ qua ${boQua}, lỗi ${loi})`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(SONG_SONG, texts.length) }, chay));

  console.log(`\n✓ Xong: mới ${moi}, bỏ qua ${boQua}, lỗi ${loi}`);
  await db.end();
  fs.rmSync(tmp, { recursive: true, force: true });
})().catch((e) => { console.error(e); process.exit(1); });
