import * as mysql2 from 'mysql2/promise';

async function main() {
  const conn = await mysql2.createConnection({
    host: process.env.DB_HOST || "songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com",
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "jFUnRCumnerGsGaPT5pR",
    database: process.env.DB_NAME || "songtute",
  });

  // Lesson 123: Các số 0,1,2,3,4,5 → trace 0-5
  // Lesson 124: Các số 6,7,8,9,10 → trace 6-10
  const batches: { lessonId: number; numbers: number[]; diff: string }[] = [
    { lessonId: 123, numbers: [0, 1, 2, 3, 4, 5], diff: 'easy' },     // Toán L1: Các số 0-5
    { lessonId: 124, numbers: [6, 7, 8, 9, 10], diff: 'easy' },        // Toán L1: Các số 6-10
    { lessonId: 139, numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], diff: 'easy' }, // Toán L1: Ôn tập số phạm vi 10
    { lessonId: 51,  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], diff: 'easy' }, // Tiếng Anh: Numbers 1-10
    { lessonId: 88,  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9], diff: 'easy' },     // Sáng tạo: Tô màu theo số
  ];

  // Get current max exerciseNumber per lesson
  for (const batch of batches) {
    const [exRows] = await conn.execute(
      `SELECT COALESCE(MAX(exerciseNumber), 0) AS maxEx FROM quizzes WHERE lessonId = ?`,
      [batch.lessonId]
    ) as any[];
    // Use exerciseNumber 99 to not conflict with existing exercises (or append after max)
    const exerciseNum = (exRows[0].maxEx as number) + 1;

    for (let i = 0; i < batch.numbers.length; i++) {
      const n = batch.numbers[i];
      const questionText = `Tô số ${n}`;
      const correctAnswerJson = JSON.stringify({ number: String(n) });

      await conn.execute(`
        INSERT INTO quizzes
          (lessonId, questionText, questionType, difficultyLevel, exerciseNumber, sortOrder, correctAnswerJson, points, createdAt, updatedAt)
        VALUES (?, ?, 'trace_number', ?, ?, ?, ?, 10, NOW(), NOW())
      `, [batch.lessonId, questionText, batch.diff, exerciseNum, i + 1, correctAnswerJson]);

      console.log(`Inserted: lessonId=${batch.lessonId} ex=${exerciseNum} "${questionText}"`);
    }
  }

  console.log('\nDone.');
  await conn.end();
}

main().catch(console.error);
