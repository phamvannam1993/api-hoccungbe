/**
 * Đọc lại những đoạn audio nghe hỏng và giữ bản tốt nhất.
 *
 *   node scripts/sua-audio-hong.cjs            # xem trước danh sách nghi ngờ
 *   node scripts/sua-audio-hong.cjs --apply    # đọc lại và thay thật
 *   node scripts/sua-audio-hong.cjs --apply --text "con voi" --text "con trâu"
 *
 * VÌ SAO CHỌN THEO ĐỘ DÀI, KHÔNG DÙNG MÁY NGHE LẠI:
 * đã đo — faster-whisper nghe các mẩu 2 tiếng rời rất tệ, chấm cả giọng
 * Microsoft (vốn đọc chuẩn) 0/15. Lấy nó làm thước đo là tự bịt mắt mình.
 * Độ dài thì đo được chắc chắn: giọng nhái hỏng theo hai kiểu đều lộ ra ở đây —
 * nuốt chữ (quá ngắn) và lảm nhảm thêm (quá dài).
 *
 * Mốc chuẩn lấy từ TRUNG VỊ của chính kho audio, tính riêng theo số tiếng, nên
 * không phải đoán con số nào cả.
 */
require('dotenv').config();
const crypto = require('crypto');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// Dùng lại S3UploadService của dự án; biên dịch tạm VÀO TRONG dự án để file
// sinh ra còn thấy node_modules.
const tmp = path.join(__dirname, '..', '.tmp-sua-audio');
fs.rmSync(tmp, { recursive: true, force: true });
execFileSync('node', [
  'node_modules/typescript/bin/tsc',
  '--target', 'es2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck',
  '--experimentalDecorators', '--emitDecoratorMetadata', '--outDir', tmp,
  'src/common/services/s3-upload.service.ts',
], { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
const { S3UploadService } = require(path.join(tmp, 's3-upload.service.js'));

const APPLY = process.argv.includes('--apply');
const RIENG = process.argv.reduce((a, v, i) => (v === '--text' ? [...a, process.argv[i + 1]] : a), []);
const SO_LAN_DOC = Number(process.env.TTS_SO_LAN_DOC || 3);
const TTS_LOCAL = process.env.TTS_LOCAL_URL || 'http://localhost:8000/api/tts';
const TTS_RATE = process.env.TTS_RATE || '-15';

const soTieng = (t) => t.trim().split(/\s+/).length;

/** Trung vị ms/tiếng theo số tiếng — mốc để biết thế nào là "bình thường". */
function mocChuan(rows) {
  const theoN = new Map();
  for (const r of rows) {
    const n = soTieng(r.text);
    theoN.set(n, [...(theoN.get(n) || []), r.durationMs / n]);
  }
  const moc = new Map();
  for (const [n, ds] of theoN) {
    ds.sort((a, b) => a - b);
    moc.set(n, ds[Math.floor(ds.length / 2)]);
  }
  return moc;
}

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  const [rows] = await db.query('SELECT id, cacheKey, text, audioUrl, durationMs FROM tts_cache WHERE durationMs > 0');
  const moc = mocChuan(rows);

  // Nghi ngờ: lệch quá nửa so với mốc của nhóm cùng số tiếng.
  const lech = (r) => (r.durationMs / soTieng(r.text)) / (moc.get(soTieng(r.text)) || 1);
  const nghi = RIENG.length
    ? rows.filter((r) => RIENG.includes(r.text))
    : rows.filter((r) => lech(r) < 0.55 || lech(r) > 1.8);

  console.log(`Tổng bản ghi   : ${rows.length}`);
  console.log(`Nghi đọc hỏng  : ${nghi.length}`);
  if (!APPLY) {
    for (const r of nghi.slice(0, 40)) console.log(`  ${(lech(r)).toFixed(2)}x  ${r.durationMs}ms  ${JSON.stringify(r.text)}`);
    console.log('\nXem trước. Thêm --apply để đọc lại thật.');
    await db.end();
    return;
  }

  const s3 = new S3UploadService({ get: (k) => process.env[k] });
  let thay = 0, giu = 0, loi = 0;
  for (const r of nghi) {
    const dich = (moc.get(soTieng(r.text)) || 0) * soTieng(r.text);
    try {
      // Đọc lại vài lần rồi giữ bản gần mốc nhất — giọng nhái mỗi lần đọc một
      // khác, nên đọc lại đúng là cách sửa, không phải chỉnh tham số.
      let tot = null;
      for (let i = 0; i < SO_LAN_DOC; i++) {
        const res = await fetch(`${TTS_LOCAL}?rate=${TTS_RATE}&text=${encodeURIComponent(r.text)}`);
        if (!res.ok) continue;
        const j = await res.json();
        const url = j.url || j.audio_url;
        if (!url) continue;
        const ms = Math.round((j.duration || 0) * 1000);
        const xa = Math.abs(ms - dich);
        if (!tot || xa < tot.xa) tot = { url, ms, xa };
      }
      if (!tot) { loi++; continue; }
      // Bản mới cũng lệch hơn bản cũ thì giữ nguyên, đừng đổi cho xấu đi.
      if (tot.xa >= Math.abs(r.durationMs - dich)) { giu++; continue; }

      const ar = await fetch(tot.url);
      const buf = Buffer.from(await ar.arrayBuffer());
      const ten = tot.url.split('/').pop() || 'tts.mp3';
      const audioUrl = await s3.uploadAudio({ buffer: buf, originalname: ten, mimetype: 'audio/mpeg' }, 'tts');
      await db.query(
        'UPDATE tts_cache SET audioUrl=?, providerUrl=?, filename=?, fileSize=?, durationMs=?, updatedAt=NOW() WHERE id=?',
        [audioUrl, tot.url, ten, buf.length, tot.ms, r.id],
      );
      if (r.audioUrl && r.audioUrl !== audioUrl) await s3.deleteByUrl(r.audioUrl).catch(() => undefined);
      thay++;
      console.log(`  ✓ ${JSON.stringify(r.text)}: ${r.durationMs}ms → ${tot.ms}ms (mốc ${Math.round(dich)}ms)`);
    } catch (e) {
      loi++;
      console.log(`  ✗ ${JSON.stringify(r.text)}: ${e.message}`);
    }
  }
  console.log(`\n✓ Xong: thay ${thay}, giữ nguyên ${giu}, lỗi ${loi}`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
