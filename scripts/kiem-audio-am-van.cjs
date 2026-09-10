/**
 * Soát audio đã sinh cho Vòng tròn âm vần.
 *   node scripts/kiem-audio-am-van.cjs /tmp/am-van-texts.json
 *
 * Bắt bốn loại lỗi, tất cả đều là lỗi ĐÃ TỪNG GẶP THẬT:
 *   1. Thiếu — có trong danh sách mà chưa sinh được audio.
 *   2. Quá dài — mô hình lảm nhảm thêm ("ê" từng ra 8,6 giây).
 *   3. Quá ngắn — bị cắt cụt ("ọt" từng ra 0,19 giây).
 *   4. Trùng file — hai câu chữ khác nhau lại trỏ cùng một file mp3.
 *
 * Ngưỡng tính theo SỐ TIẾNG, vì "y - ê - yê" dài hơn "bờ" là chuyện bình thường.
 */
require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const FILE = process.argv[2] || '/tmp/am-van-texts.json';
const NGAN_NHAT_MS = 200;   // mỗi tiếng
const DAI_NHAT_MS = 1800;   // mỗi tiếng, nới hơn ngưỡng lúc sinh cho khỏi báo oan

// Tự biên dịch tts-preprocess nếu chưa có: phải chuẩn hoá text GIỐNG HỆT lúc
// sinh, nếu không khoá cache lệch và script này sẽ báo "thiếu" toàn bộ.
const { execFileSync } = require('child_process');
const TMP = path.join(__dirname, '..', '.tmp-kiem-tts');
if (!fs.existsSync(path.join(TMP, 'tts-preprocess.js'))) {
  execFileSync('node', [
    'node_modules/typescript/bin/tsc', '--target', 'es2020', '--module', 'commonjs',
    '--esModuleInterop', '--skipLibCheck', '--outDir', TMP,
    'src/modules/tts/tts-preprocess.ts',
  ], { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
}
const { preprocessTTS, toVietnamesePhonics } = require(path.join(TMP, 'tts-preprocess.js'));

const chuanHoa = (text) => toVietnamesePhonics(
  String(text || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '').replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim(),
);
const khoa = (t) => crypto.createHash('sha256').update(`vi|+0%|+0Hz|${t}`).digest('hex');
/** Đếm tiếng: "bờ" = 1, "y - ê - yê" = 3, "cầu vồng" = 2. */
const demTieng = (t) => t.split(/[\s,.-]+/).filter(Boolean).length;

(async () => {
  const raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const thay = new Map();
  for (const r of raw) {
    const t = chuanHoa(preprocessTTS(String(r || '')));
    if (t) thay.set(khoa(t), t);
  }
  const keys = [...thay.keys()];

  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows] = await db.query(
    `SELECT cacheKey, text, durationMs, audioUrl, fileSize FROM tts_cache WHERE cacheKey IN (?)`, [keys],
  );
  await db.end();

  const coRoi = new Map(rows.map((r) => [r.cacheKey, r]));
  const thieu = [], quaDai = [], quaNgan = [], rong = [];
  const theoFile = new Map();

  for (const [k, text] of thay) {
    const r = coRoi.get(k);
    if (!r) { thieu.push(text); continue; }
    const n = demTieng(text);
    const ms = r.durationMs || 0;
    if (!r.fileSize) rong.push(text);
    else if (ms > DAI_NHAT_MS * n) quaDai.push({ text, ms, n });
    else if (ms < NGAN_NHAT_MS * n) quaNgan.push({ text, ms, n });
    theoFile.set(r.audioUrl, [...(theoFile.get(r.audioUrl) ?? []), text]);
  }
  const trungFile = [...theoFile.entries()].filter(([, ds]) => ds.length > 1);

  console.log(`Danh sách cần đọc : ${thay.size}`);
  console.log(`Đã có audio       : ${rows.length}`);
  console.log('');
  const in_ = (ten, ds, ve) => {
    if (!ds.length) { console.log(`✅ ${ten}: không có`); return; }
    console.log(`❌ ${ten}: ${ds.length}`);
    for (const x of ds.slice(0, 15)) console.log('   ' + ve(x));
    if (ds.length > 15) console.log(`   … và ${ds.length - 15} chỗ nữa`);
  };
  in_('Thiếu audio', thieu, (t) => `"${t}"`);
  in_('Quá dài (lảm nhảm)', quaDai, (x) => `"${x.text}" — ${x.ms}ms cho ${x.n} tiếng`);
  in_('Quá ngắn (cắt cụt)', quaNgan, (x) => `"${x.text}" — ${x.ms}ms cho ${x.n} tiếng`);
  in_('File rỗng', rong, (t) => `"${t}"`);
  in_('Trùng file mp3', trungFile, ([url, ds]) => `${ds.map((t) => `"${t}"`).join(' = ')}  → ${url.slice(-24)}`);

  const loi = thieu.length + quaDai.length + quaNgan.length + rong.length + trungFile.length;
  console.log(`\n${loi ? `❌ Tổng ${loi} vấn đề` : '✅ Không phát hiện lỗi'}`);
  process.exit(loi ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
