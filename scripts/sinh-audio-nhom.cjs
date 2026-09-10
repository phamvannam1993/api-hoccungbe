/**
 * Sinh audio âm vần theo NHÓM: đọc cả câu một hơi rồi tách thành từng mẩu.
 *
 *   node scripts/sinh-audio-nhom.cjs /tmp/am-van.json           # xem trước
 *   node scripts/sinh-audio-nhom.cjs /tmp/am-van.json --apply   # sinh thật
 *
 * Vì sao đọc theo nhóm: mô hình nhái giọng đọc một tiếng trơ trọi thì trượt,
 * đọc cả câu thì chuẩn — đã đo và xác nhận. Gửi trọn bộ bước đánh vần của một
 * từ ("bờ, ong, bong, sắc, bóng") rồi cắt lại, vừa đúng tiếng vừa liền ngữ điệu.
 *
 * File đầu vào do bên hoccungbe xuất ra:
 *   node scripts/sinh-audio-am-van.cjs --xuat /tmp/am-van.json
 */
require('dotenv').config();
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const FILE = process.argv[2] || '/tmp/am-van.json';
const APPLY = process.argv.includes('--apply');
const TTS = process.env.TTS_LOCAL_URL || 'http://localhost:8000/api/tts';
const TTS_TACH = TTS.replace(/\/api\/tts.*$/, '/api/tts/tach');

const TMP = path.join(__dirname, '..', '.tmp-tts');
fs.rmSync(TMP, { recursive: true, force: true });
execFileSync('node', [
  'node_modules/typescript/bin/tsc', '--target', 'es2020', '--module', 'commonjs',
  '--esModuleInterop', '--skipLibCheck', '--experimentalDecorators', '--emitDecoratorMetadata',
  '--outDir', TMP, 'src/common/services/s3-upload.service.ts', 'src/modules/tts/tts-preprocess.ts',
], { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

const { S3UploadService } = require(path.join(TMP, 'common/services/s3-upload.service.js'));
const { preprocessTTS, toVietnamesePhonics } = require(path.join(TMP, 'modules/tts/tts-preprocess.js'));
const s3 = new S3UploadService({ get: (k) => process.env[k] });

/** Chuẩn hoá GIỐNG HỆT TtsService, nếu không khoá cache sẽ lệch và web không thấy audio. */
const chuanHoa = (text) => toVietnamesePhonics(
  String(text || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '').replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim(),
);
const khoa = (t) => crypto.createHash('sha256').update(`vi|+0%|+0Hz|${t}`).digest('hex');

(async () => {
  const { nhom, le } = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  /** Đã có audio chưa. */
  const daCo = async (text) => {
    const [r] = await db.query('SELECT id FROM tts_cache WHERE cacheKey = ? LIMIT 1', [khoa(text)]);
    return r.length > 0;
  };
  /** Tải mp3 → S3 → ghi tts_cache. */
  const luu = async (text, url, providerUrl, duration) => {
    const ar = await fetch(url);
    if (!ar.ok) throw new Error(`tải mp3 ${ar.status}`);
    const buf = Buffer.from(await ar.arrayBuffer());
    const filename = url.split('/').pop() || 'tts.mp3';
    const audioUrl = await s3.uploadAudio({ buffer: buf, originalname: filename, mimetype: 'audio/mpeg' }, 'tts');
    await db.query(
      `INSERT INTO tts_cache
         (cacheKey, text, voice, rate, pitch, audioUrl, providerUrl, filename, mimeType, fileSize, durationMs, storage, createdAt, updatedAt)
       VALUES (?,?, 'vi', '+0%', '+0Hz', ?,?,?, 'audio/mpeg', ?,?, 's3', NOW(), NOW())`,
      [khoa(text), text, audioUrl, providerUrl || url, filename, buf.length, Math.round((duration || 0) * 1000)],
    );
  };

  const nhomChuan = nhom.map((g) => g.map((t) => chuanHoa(preprocessTTS(t))).filter(Boolean))
    .filter((g) => g.length >= 2);
  const leChuan = [...new Set(le.map((t) => chuanHoa(preprocessTTS(t))).filter(Boolean))];

  console.log(`Nhóm      : ${nhomChuan.length}`);
  console.log(`Đoạn lẻ   : ${leChuan.length}`);
  console.log(`Máy chủ   : ${TTS_TACH}`);
  if (!APPLY) {
    console.log('\nXem trước. Thêm --apply để sinh thật.');
    await db.end(); return;
  }

  let moi = 0, boQua = 0, loi = 0, i = 0;

  // ── Nhóm: đọc cả câu rồi tách ────────────────────────────────────────────
  for (const g of nhomChuan) {
    i++;
    const thieu = [];
    for (const t of g) if (!(await daCo(t))) thieu.push(t);
    if (!thieu.length) { boQua += g.length; continue; }
    try {
      const r = await fetch(TTS_TACH, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: g }),
      });
      if (!r.ok) throw new Error(`tách ${r.status} ${(await r.text()).slice(0, 80)}`);
      const j = await r.json();
      for (const p of j.parts) {
        // Chỉ ghi mẩu còn thiếu; mẩu đã có thì giữ bản cũ cho khỏi đổi giọng lung tung.
        if (!thieu.includes(p.text)) continue;
        await luu(p.text, p.url, j.cau, p.duration);
        moi++;
      }
      boQua += g.length - thieu.length;
    } catch (e) {
      loi += thieu.length;
      if (loi <= 8) console.log(`  ✗ [${g.join(', ')}]: ${e.message}`);
    }
    if (i % 20 === 0) console.log(`  nhóm ${i}/${nhomChuan.length} — mới ${moi}, bỏ qua ${boQua}, lỗi ${loi}`);
  }

  // ── Đoạn lẻ: đọc một lần ─────────────────────────────────────────────────
  for (const t of leChuan) {
    if (await daCo(t)) { boQua++; continue; }
    try {
      const r = await fetch(`${TTS}?text=${encodeURIComponent(t)}`);
      if (!r.ok) throw new Error(`TTS ${r.status}`);
      const j = await r.json();
      await luu(t, j.url || j.audio_url, j.url, j.duration);
      moi++;
    } catch (e) {
      loi++;
      if (loi <= 8) console.log(`  ✗ "${t}": ${e.message}`);
    }
  }

  console.log(`\n✓ Xong: mới ${moi}, bỏ qua ${boQua}, lỗi ${loi}`);
  await db.end();
  fs.rmSync(TMP, { recursive: true, force: true });
})().catch((e) => { console.error(e); process.exit(1); });
