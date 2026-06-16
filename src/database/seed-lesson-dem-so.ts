import * as mysql2 from 'mysql2/promise';

function opts(correct: number): { key: string; text: string }[] {
  const pool = new Set([0,1,2,3,4,5]);
  pool.delete(correct);
  const wrong = [...pool].sort(() => Math.random()-0.5).slice(0,3);
  return [correct, ...wrong].sort(() => Math.random()-0.5)
    .map((n,i) => ({ key: ['A','B','C','D'][i], text: String(n) }));
}
function ck(options: {key:string;text:string}[], correct: number) {
  return options.find(o => o.text === String(correct))!.key;
}

async function main() {
  const conn = await mysql2.createConnection({
    host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
    user: 'admin', password: 'jFUnRCumnerGsGaPT5pR', database: 'songtute',
  });

  // 1. Tìm hoặc tạo course "Test - Toán mầm non"
  const [cRows] = await conn.execute(
    `SELECT id FROM courses WHERE slug='test-toan-mam-non' LIMIT 1`
  ) as any[];

  let courseId: number;
  if (cRows.length > 0) {
    courseId = cRows[0].id;
    console.log('Course đã có, id=', courseId);
  } else {
    const [ins] = await conn.execute(`
      INSERT INTO courses (title, slug, description, isPublished, isFree, createdAt, updatedAt)
      VALUES (?,?,?,1,1,NOW(),NOW())
    `, ['[TEST] Toán Mầm Non', 'test-toan-mam-non', 'Bộ bài học test — toán mầm non']) as any[];
    courseId = (ins as any).insertId;
    console.log('Tạo course mới, id=', courseId);
  }

  // 2. Tạo lesson mới
  const [lIns] = await conn.execute(`
    INSERT INTO lessons (courseId, title, slug, isPublished, createdAt, updatedAt)
    VALUES (?,?,?,1,NOW(),NOW())
  `, [
    courseId,
    '[TEST] Bài 1: Đếm số lượng từ 0 đến 5',
    'test-dem-so-0-den-5',
  ]) as any[];
  const lessonId = (lIns as any).insertId;
  console.log('Tạo lesson mới, id=', lessonId);

  // 3. 10 câu hỏi
  const questions: { text: string; correct: number; note: string; customOpts?: {key:string;text:string}[] }[] = [
    { text: 'Có bao nhiêu quả táo trong rổ?',                  correct: 3, note: '3 quả táo' },
    { text: 'Đếm số chú cá đang bơi và chọn số đúng.',         correct: 5, note: '5 chú cá' },
    { text: 'Có bao nhiêu ông mặt trời trên bầu trời?',         correct: 1, note: '1 ông mặt trời' },
    { text: 'Đếm số ngôi sao trong hình vẽ.',                  correct: 4, note: '4 ngôi sao' },
    { text: 'Đếm số bánh sinh nhật có trên bàn.',              correct: 2, note: '2 chiếc bánh' },
    {
      text: 'Một bàn tay của em có bao nhiêu ngón tay?',
      correct: 5, note: 'Bàn tay 5 ngón',
      customOpts: [{key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'2'}],
    },
    { text: 'Đếm số con thỏ trong chuồng.',                    correct: 0, note: 'Chuồng trống — 0 con' },
    { text: 'Có bao nhiêu chiếc bút chì trong hộp?',           correct: 5, note: '5 chiếc bút' },
    { text: 'Đếm số quả bóng màu đỏ.',                         correct: 3, note: '3 bóng đỏ + 1 bóng xanh' },
    { text: 'Có bao nhiêu bông hoa trong lọ?',                 correct: 2, note: '2 bông hoa' },
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const options = q.customOpts ?? opts(q.correct);
    const correctKey = ck(options, q.correct);
    await conn.execute(`
      INSERT INTO quizzes
        (lessonId, questionText, questionType, difficultyLevel,
         exerciseNumber, sortOrder, optionsJson, correctAnswerJson,
         explanation, points, isActive, createdAt, updatedAt)
      VALUES (?,?,?,?,1,?,?,?,?,10,1,NOW(),NOW())
    `, [
      lessonId,
      q.text,
      'single_choice',
      'easy',
      i + 1,
      JSON.stringify(options),
      JSON.stringify(correctKey),
      `Ảnh minh họa: ${q.note}. Đáp án đúng: ${q.correct}.`,
    ]);
    console.log(`  [${i+1}] "${q.text}" → ${q.correct} (${q.note})`);
  }

  console.log(`\nXong! Lesson slug: test-dem-so-0-den-5`);
  console.log(`Vào /admin/quizzes → tìm bài "[TEST] Bài 1" → thêm ảnh cho từng câu.`);
  console.log(`Preview tại: /${lessonId} hoặc /test-dem-so-0-den-5`);
  await conn.end();
}

main().catch(console.error);
