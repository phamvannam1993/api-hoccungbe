/**
 * Xóa audio TTS của MỘT khóa khỏi tts_cache + xóa file S3.
 * Chỉ xóa những cacheKey RIÊNG của khóa cần xóa; key nào trùng với KEEP_COURSES (audio dùng chung)
 * sẽ được GIỮ LẠI để không phá các khóa khác.
 *
 * Chạy: DELETE_COURSE=tieng-viet-lop-1 KEEP_COURSES=toan-lop-1,toan-lop-2,toan-lop-3 \
 *       npx ts-node -r tsconfig-paths/register scripts/tts-delete-course.ts
 *       (thêm DRY=1 để chỉ xem, không xóa)
 */
import 'dotenv/config';
import * as crypto from 'crypto';
import * as mysql from 'mysql2/promise';
import { S3UploadService } from '../src/common/services/s3-upload.service';
import { preprocessTTS } from './tts-preprocess';

const DELETE_COURSE = process.env.DELETE_COURSE || 'tieng-viet-lop-1';
const KEEP_COURSES = (process.env.KEEP_COURSES || 'toan-lop-1,toan-lop-2,toan-lop-3')
  .split(',').map((s) => s.trim()).filter(Boolean);
const DRY = process.env.DRY === '1';
const CONCURRENCY = Number(process.env.CONCURRENCY || 8);

function normalizeText(t: string): string {
  return (t || '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2B50}]/gu, '').replace(/[\u{1F000}-\u{1F02F}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim();
}
const keyOf = (raw: string) =>
  crypto.createHash('sha256').update(`vi|+0%|+0Hz|${normalizeText(preprocessTTS(raw || ''))}`).digest('hex');

const s3 = new S3UploadService({ get: (k: string, d?: any) => process.env[k] ?? d } as any);

async function keysForCourse(conn: mysql.Connection, slug: string): Promise<Set<string>> {
  const [rows] = await conn.query<any[]>(
    `SELECT DISTINCT q.questionText qt FROM quizzes q
       JOIN lessons l ON l.id=q.lessonId JOIN courses c ON c.id=l.courseId
      WHERE c.slug=? AND q.isActive=1 AND q.questionText IS NOT NULL AND q.questionText<>''`,
    [slug],
  );
  const set = new Set<string>();
  for (const r of rows) { const k = keyOf(r.qt); if (normalizeText(preprocessTTS(r.qt || ''))) set.add(k); }
  return set;
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });

  const delKeys = await keysForCourse(conn, DELETE_COURSE);
  const keepKeys = new Set<string>();
  for (const kc of KEEP_COURSES) for (const k of await keysForCourse(conn, kc)) keepKeys.add(k);

  const targetKeys = [...delKeys].filter((k) => !keepKeys.has(k));
  const shared = delKeys.size - targetKeys.length;
  console.log(`Khóa xóa: ${DELETE_COURSE} → ${delKeys.size} key | trùng KEEP (giữ lại): ${shared} | cần xóa: ${targetKeys.length}`);

  if (!targetKeys.length) { console.log('Không có gì để xóa.'); await conn.end(); return; }

  // Lấy các row thực sự có trong tts_cache
  const rows: { id: number; audioUrl: string }[] = [];
  for (let i = 0; i < targetKeys.length; i += 500) {
    const chunk = targetKeys.slice(i, i + 500);
    const [r] = await conn.query<any[]>(
      `SELECT id, audioUrl FROM tts_cache WHERE cacheKey IN (${chunk.map(() => '?').join(',')})`, chunk);
    rows.push(...r);
  }
  console.log(`Row có trong tts_cache: ${rows.length}${DRY ? ' (DRY RUN — không xóa)' : ''}`);
  if (DRY || !rows.length) { await conn.end(); return; }

  let s3ok = 0, s3fail = 0, dbdel = 0, idx = 0;
  async function worker() {
    while (idx < rows.length) {
      const row = rows[idx++];
      try { await s3.deleteByUrl(row.audioUrl); s3ok++; } catch { s3fail++; }
      await conn.query('DELETE FROM tts_cache WHERE id=?', [row.id]);
      dbdel++;
      if (dbdel % 100 === 0) console.log(`  ...${dbdel}/${rows.length} (S3 xóa ${s3ok}, lỗi S3 ${s3fail})`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, rows.length) }, worker));

  const [[{ n }]] = await conn.query<any[]>('SELECT COUNT(*) n FROM tts_cache') as any;
  console.log(`XONG: xóa ${dbdel} row DB | xóa ${s3ok} file S3 (lỗi S3 ${s3fail}). tts_cache còn ${n} row.`);
  await conn.end();
}
main().catch((e) => { console.error('LỖI:', e.message); process.exit(1); });
