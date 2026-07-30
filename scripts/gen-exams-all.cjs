require('dotenv').config();
const mysql = require('mysql2/promise');

const SUBJECT_LABEL = { toan: 'Toán', 'tieng-viet': 'Tiếng Việt', 'tieng-anh': 'Tiếng Anh' };
const COURSES = [ // toan-lop-1 đã làm → bỏ qua
  { id: 11, slug: 'toan-lop-2' }, { id: 14, slug: 'toan-lop-3' }, { id: 17, slug: 'toan-lop-4' }, { id: 18, slug: 'toan-lop-5' },
  { id: 9, slug: 'tieng-viet-lop-1' }, { id: 12, slug: 'tieng-viet-lop-2' }, { id: 15, slug: 'tieng-viet-lop-3' },
  { id: 16, slug: 'tieng-anh-lop-1' },
];
const GROUP_DEFS = [
  { key: 'giua-hk1', groupSlug: 'de-thi-giua-hoc-ky-1', label: 'giữa học kỳ 1', semester: 1, sem: 1, half: true,  desired: 15, time: 20 },
  { key: 'cuoi-hk1', groupSlug: 'de-thi-cuoi-hoc-ky-1', label: 'cuối học kỳ 1', semester: 1, sem: 1, half: false, desired: 20, time: 40 },
  { key: 'giua-hk2', groupSlug: 'de-thi-giua-hoc-ky-2', label: 'giữa học kỳ 2', semester: 2, sem: 2, half: true,  desired: 15, time: 20 },
  { key: 'cuoi-hk2', groupSlug: 'de-thi-cuoi-hoc-ky-2', label: 'cuối học kỳ 2', semester: 2, sem: 2, half: false, desired: 20, time: 40 },
];
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const asJson = (v) => v == null ? null : JSON.stringify(v);
function parse(slug){const m=/^(toan|tieng-viet|tieng-anh)-lop-(\d+)$/.exec(slug);return {subject:m[1],grade:+m[2]};}

(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, port: +(process.env.DB_PORT||3306), user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  let grandExams = 0, grandQ = 0;
  for (const course of COURSES) {
    const { subject, grade } = parse(course.slug);
    const sLabel = SUBJECT_LABEL[subject];
    // volumes → phạm vi sortOrder mỗi kỳ; nếu 1 volume → chia đôi
    const [vols] = await c.query(`SELECT MIN(l.sortOrder) mn, MAX(l.sortOrder) mx FROM lessons l WHERE l.courseId=? GROUP BY l.volumeId ORDER BY MIN(l.sortOrder)`, [course.id]);
    let hk1, hk2;
    if (vols.length >= 2) { hk1 = [vols[0].mn, vols[0].mx]; hk2 = [vols[1].mn, vols[1].mx]; }
    else { const lo = vols[0].mn, hi = vols[0].mx, mid = lo + Math.floor((hi - lo) / 2); hk1 = [lo, mid]; hk2 = [mid + 1, hi]; }
    const semRange = { 1: hk1, 2: hk2 };
    await c.query("UPDATE exams SET isActive=0 WHERE subject=? AND grade=? AND examGroup IS NULL", [subject, grade]);

    for (const g of GROUP_DEFS) {
      const [lo, hi] = semRange[g.sem];
      const range = g.half ? [lo, lo + Math.floor((hi - lo) / 2)] : [lo, hi];
      const [pool] = await c.query(
        `SELECT q.id, q.questionText, q.difficultyLevel, q.optionsJson, q.correctAnswerJson, q.explanation, q.questionImageUrl
         FROM quizzes q JOIN lessons l ON l.id=q.lessonId
         WHERE l.courseId=? AND l.sortOrder BETWEEN ? AND ? AND q.isActive=1 AND q.questionType='single_choice'
           AND q.optionsJson IS NOT NULL AND q.correctAnswerJson IS NOT NULL`, [course.id, range[0], range[1]]);
      const shuffled = shuffle(pool);
      const count = Math.max(6, Math.min(g.desired, Math.floor(shuffled.length / 5)));
      for (let n = 1; n <= 5; n++) {
        const slug = `${g.groupSlug}-${course.slug}-de-${n}`;
        const [[old]] = await c.query("SELECT id FROM exams WHERE slug=?", [slug]);
        if (old) { await c.query("DELETE FROM exam_questions WHERE examId=?", [old.id]); await c.query("DELETE FROM exams WHERE id=?", [old.id]); }
        const picks = shuffled.slice((n - 1) * count, n * count);
        if (picks.length < 5) { console.log(`⚠ ${slug}: chỉ ${picks.length} câu — bỏ qua`); continue; }
        const title = `Đề thi ${g.label} ${sLabel} lớp ${grade} – Đề ${n} (có đáp án)`;
        const desc = `Đề thi ${g.label} môn ${sLabel} lớp ${grade} (Đề ${n}) gồm ${picks.length} câu trắc nghiệm có đáp án và lời giải, chấm điểm online, bám sát chương trình.`;
        const [r] = await c.query(
          `INSERT INTO exams (title, slug, subject, grade, semester, description, metaDescription, timeLimitMinutes, totalPoints, examGroup, orderIndex, isActive, createdAt, updatedAt)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,1,NOW(),NOW())`,
          [title, slug, subject, grade, g.semester, desc, desc.slice(0,160), g.time, picks.length, g.key, n]);
        const examId = r.insertId; let so = 1;
        for (const q of picks) {
          await c.query(
            `INSERT INTO exam_questions (examId, quizId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, explanation, questionImageUrl, points, sortOrder, createdAt, updatedAt)
             VALUES (?,?,?,?,?,?,?,?,?,1,?,NOW(),NOW())`,
            [examId, q.id, q.questionText, 'single_choice', q.difficultyLevel || 'easy', asJson(q.optionsJson), asJson(q.correctAnswerJson), q.explanation || null, q.questionImageUrl || null, so++]);
          grandQ++;
        }
        grandExams++;
      }
    }
    console.log(`✓ ${course.slug}: xong (HK1 ${hk1}, HK2 ${hk2})`);
  }
  console.log(`\nTỔNG: ${grandExams} đề, ${grandQ} câu.`);
  await c.end(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
