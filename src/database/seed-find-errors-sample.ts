import mysql from 'mysql2/promise';

const DB = {
  host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
  user: 'admin', password: 'jFUnRCumnerGsGaPT5pR', database: 'songtute',
};

// Lesson IDs for Tiếng Việt lớp 2 — Chính tả (pick first few lessons)
// Using lesson id 1146 (Tự học và ôn tập) as sample target
const TARGET_LESSON_ID = 1146;

interface FindErrorsQ {
  sentence: string;       // full sentence
  errorWords: string[];   // words that are wrong (exact text)
  level: 'easy' | 'medium' | 'hard';
}

const QUESTIONS: FindErrorsQ[] = [
  // easy — 1 sai
  { sentence: 'Noáng một cái, tôi đã chuẩn bị song mọi thứ.', errorWords: ['Noáng', 'song'], level: 'easy' },
  { sentence: 'Bé học bài rất chăm chỉ và ngoan ngoãn.', errorWords: [], level: 'easy' }, // all correct — not useful, skip
  { sentence: 'Con trâu đang ăn cỏ ngoài đồng rộng.', errorWords: [], level: 'easy' },
  { sentence: 'Mẹ mua về một gói kẹo ngọt cho bé.', errorWords: [], level: 'easy' },
  // with errors
  { sentence: 'Chúng em đi học đún giờ mỗi ngày.', errorWords: ['đún'], level: 'easy' },
  { sentence: 'Bầu trời hôm nay xanh biết và có nhiều mây trắng.', errorWords: ['biết'], level: 'easy' },
  { sentence: 'Bé ngồi học bài một mình trong phòng rất im lặn.', errorWords: ['lặn'], level: 'easy' },
  { sentence: 'Các bạn nhỏ chơi đùa vui vẽ ở sân trường.', errorWords: ['vẽ'], level: 'medium' },
  { sentence: 'Cô giáo giảng bài rất hay và dể hiểu.', errorWords: ['dể'], level: 'medium' },
  { sentence: 'Con chim hót líu lo trên cành cây trước nhà.', errorWords: [], level: 'easy' },
  { sentence: 'Bố đi làm về mang theo quà cho cả gia đình.', errorWords: [], level: 'easy' },
  { sentence: 'Buổi sang mát mẻ, em cùng bạn đi dạo công viên.', errorWords: ['sang'], level: 'medium' },
  { sentence: 'Trên bầu trời, những ngôi sao lấp lán trong đêm.', errorWords: ['lán'], level: 'medium' },
  { sentence: 'Mưa rơi lộp độp trên mái ngói suốt cả buổi chiều.', errorWords: ['độp'], level: 'hard' },
  { sentence: 'Em rửa tay thật sạch trước khi ăng cơm.', errorWords: ['ăng'], level: 'easy' },
];

// Filter out sentences with no errors (they'd be trivially correct)
const VALID = QUESTIONS.filter((q) => q.errorWords.length > 0);

async function main() {
  const conn = await mysql.createConnection(DB);

  for (const q of VALID) {
    // Split sentence into words
    const rawWords = q.sentence.split(/\s+/);
    const options = rawWords.map((w, i) => ({ key: `w${i}`, text: w }));

    // Find keys of wrong words
    const correctAnswerJson = options
      .filter((o) => q.errorWords.some((e) => o.text === e || o.text.replace(/[.,!?]/g, '') === e))
      .map((o) => o.key);

    if (correctAnswerJson.length === 0) continue;

    const questionText = 'Hãy tìm trong câu sau những từ viết sai chính tả';

    await conn.execute(
      `INSERT INTO quizzes (lessonId, questionText, questionType, difficultyLevel, optionsJson, correctAnswerJson, points, createdAt, updatedAt)
       VALUES (?, ?, 'find_errors', ?, ?, ?, 10, NOW(), NOW())`,
      [
        TARGET_LESSON_ID,
        questionText,
        q.level,
        JSON.stringify(options),
        JSON.stringify(correctAnswerJson),
      ]
    );
    console.log(`Inserted: "${q.sentence.substring(0, 40)}..."`);
  }

  console.log(`Done! ${VALID.length} questions inserted.`);
  await conn.end();
}

main().catch(console.error);
