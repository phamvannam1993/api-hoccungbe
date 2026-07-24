/**
 * Batch: sinh giọng đọc (TTS) cho toàn bộ câu hỏi Toán lớp 1, lưu file lên S3 và
 * ghi vào bảng tts_cache để DÙNG LẠI (read path tra bảng thay vì gọi TTS mỗi lần).
 *
 * Chạy:  LIMIT=3 npx ts-node scripts/tts-batch-lop1.ts     (test 3 câu)
 *        npx ts-node scripts/tts-batch-lop1.ts               (chạy toàn bộ)
 */
import 'dotenv/config';
import * as crypto from 'crypto';
import * as mysql from 'mysql2/promise';
import { S3UploadService } from '../src/common/services/s3-upload.service';
import { preprocessTTS } from './tts-preprocess';

const TTS_URL = process.env.TTS_LOCAL_URL || 'http://localhost:8000/api/tts';
const VOICE = 'vi';
const CONCURRENCY = Number(process.env.CONCURRENCY || 5);
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : 0;

// Chuẩn hóa text GIỐNG read path (app/api/tts/route.ts: removeEmojis) để cacheKey khớp.
function cleanText(t: string): string {
  return (t || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '')
    .replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}
const keyOf = (text: string) =>
  crypto.createHash('sha256').update(`${VOICE}|+0%|+0Hz|${text}`).digest('hex');

const s3 = new S3UploadService({ get: (k: string, d?: any) => process.env[k] ?? d } as any);

async function fetchTts(text: string): Promise<{ buf: Buffer; providerUrl: string; durationMs: number; filename: string }> {
  const r = await fetch(`${TTS_URL}?text=${encodeURIComponent(text)}`);
  if (!r.ok) throw new Error(`TTS ${r.status}`);
  const j: any = await r.json();
  const providerUrl: string = j.url || j.audio_url;
  if (!providerUrl) throw new Error('TTS thiếu url');
  const ar = await fetch(providerUrl);
  if (!ar.ok) throw new Error(`tải mp3 ${ar.status}`);
  const buf = Buffer.from(await ar.arrayBuffer());
  return { buf, providerUrl, durationMs: Math.round((j.duration || 0) * 1000), filename: providerUrl.split('/').pop() || 'tts.mp3' };
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });

  const [rows] = await conn.query<any[]>(
    `SELECT DISTINCT questionText FROM quizzes
     WHERE lessonId BETWEEN 123 AND 162 AND isActive = 1
       AND questionText IS NOT NULL AND questionText <> ''
     ${LIMIT ? 'LIMIT ' + LIMIT : ''}`,
  );

  // QUAN TRỌNG: áp ĐÚNG preprocessTTS của FE (số→chữ, [b1]→"mấy", +→"cộng"…) rồi mới đọc,
  // để audio đúng và cacheKey khớp read path. Sau đó cleanText (bỏ emoji, gộp space).
  const seen = new Set<string>();
  const texts: string[] = [];
  for (const r of rows) {
    const t = cleanText(preprocessTTS(r.questionText || ''));
    if (t && !seen.has(t)) { seen.add(t); texts.push(t); }
  }
  console.log(`Tổng câu hỏi active: ${rows.length} → text cần đọc (đã preprocess + khử trùng): ${texts.length}`);

  let done = 0, made = 0, skip = 0, fail = 0;
  let idx = 0;
  async function worker() {
    while (idx < texts.length) {
      const text = texts[idx++];
      const cacheKey = keyOf(text);
      try {
        const [ex] = await conn.query<any[]>('SELECT id FROM tts_cache WHERE cacheKey = ? LIMIT 1', [cacheKey]);
        if (ex.length) { skip++; done++; continue; }
        const { buf, providerUrl, durationMs, filename } = await fetchTts(text);
        const audioUrl = await s3.uploadAudio({ buffer: buf, originalname: filename, mimetype: 'audio/mpeg' }, 'tts');
        await conn.query(
          `INSERT INTO tts_cache (cacheKey, text, voice, rate, pitch, audioUrl, providerUrl, filename, mimeType, fileSize, durationMs, storage)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
           ON DUPLICATE KEY UPDATE audioUrl=VALUES(audioUrl), providerUrl=VALUES(providerUrl), durationMs=VALUES(durationMs), updatedAt=NOW()`,
          [cacheKey, text, VOICE, '+0%', '+0Hz', audioUrl, providerUrl, filename, 'audio/mpeg', buf.length, durationMs, 's3'],
        );
        made++;
      } catch (e: any) {
        fail++;
        console.log(`  ✗ [${text.slice(0, 40)}...] ${String(e.message).slice(0, 60)}`);
      }
      done++;
      if (done % 25 === 0 || done === texts.length) console.log(`  ...${done}/${texts.length} (mới ${made}, bỏ qua ${skip}, lỗi ${fail})`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, texts.length) }, worker));

  const [cnt] = await conn.query<any[]>('SELECT COUNT(*) n FROM tts_cache');
  console.log(`\nXONG: sinh mới ${made}, bỏ qua (đã có) ${skip}, lỗi ${fail}. Tổng row tts_cache: ${cnt[0].n}`);
  await conn.end();
}
main().catch((e) => { console.error('LỖI:', e.message); process.exit(1); });
