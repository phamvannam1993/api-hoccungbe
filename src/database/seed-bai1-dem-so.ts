import * as mysql2 from 'mysql2/promise';

async function main() {
  const conn = await mysql2.createConnection({
    host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
    user: 'admin', password: 'jFUnRCumnerGsGaPT5pR', database: 'songtute',
  });

  const LESSON_ID = 123; // Bài 1: Các số 0, 1, 2, 3, 4, 5
  const EX = 11;         // exercise mới, không đụng bài cũ

  // helper tạo options 4 số ngẫu nhiên quanh đáp án đúng
  function opts(correct: number): { key: string; text: string }[] {
    const pool = new Set([0,1,2,3,4,5]);
    pool.delete(correct);
    const wrong = [...pool].sort(() => Math.random()-0.5).slice(0,3);
    const all = [correct, ...wrong].sort(() => Math.random()-0.5);
    return all.map((n, i) => ({ key: ['A','B','C','D'][i], text: String(n) }));
  }

  function correctKey(options: {key:string;text:string}[], correct: number) {
    return options.find(o => o.text === String(correct))!.key;
  }

  const questions: {
    text: string; imageNote: string; correct: number; type?: string;
    customOptions?: {key:string;text:string}[];
  }[] = [
    { text: 'Có bao nhiêu quả táo trong rổ?', imageNote: 'Vẽ 3 quả táo', correct: 3 },
    { text: 'Đếm số chú cá đang bơi và chọn số đúng.', imageNote: 'Vẽ 5 chú cá', correct: 5 },
    { text: 'Có bao nhiêu ông mặt trời trên bầu trời?', imageNote: 'Vẽ 1 ông mặt trời', correct: 1 },
    { text: 'Đếm số ngôi sao trong hình vẽ sau.', imageNote: 'Vẽ 4 ngôi sao', correct: 4 },
    { text: 'Đếm số bánh sinh nhật có trên bàn.', imageNote: 'Vẽ 2 chiếc bánh', correct: 2 },
    {
      text: 'Một bàn tay của em có bao nhiêu ngón tay? Đếm và chọn số đúng.',
      imageNote: 'Vẽ bàn tay 5 ngón',
      correct: 5,
      customOptions: [{ key:'A',text:'3'},{key:'B',text:'4'},{key:'C',text:'5'},{key:'D',text:'2'}],
    },
    { text: 'Đếm số con thỏ trong chuồng.', imageNote: 'Vẽ chuồng trống — 0 con thỏ', correct: 0 },
    { text: 'Có bao nhiêu chiếc bút chì trong hộp?', imageNote: 'Vẽ 5 chiếc bút chì', correct: 5 },
    { text: 'Đếm số quả bóng màu đỏ.', imageNote: 'Vẽ 3 bóng đỏ + 1 bóng xanh', correct: 3 },
    { text: 'Có bao nhiêu bông hoa trong lọ?', imageNote: 'Vẽ 2 bông hoa', correct: 2 },
  ];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const options = q.customOptions ?? opts(q.correct);
    const ck = correctKey(options, q.correct);
    const explanation = `${q.imageNote} → đáp án đúng là ${q.correct}.`;

    await conn.execute(`
      INSERT INTO quizzes
        (lessonId, questionText, questionType, difficultyLevel,
         exerciseNumber, sortOrder, optionsJson, correctAnswerJson,
         explanation, points, isActive, createdAt, updatedAt)
      VALUES (?,?,?,?,?,?,?,?,?,10,1,NOW(),NOW())
    `, [
      LESSON_ID,
      q.text,
      'single_choice',
      'easy',
      EX,
      i + 1,
      JSON.stringify(options),
      JSON.stringify(ck),
      explanation,
    ]);
    console.log(`[${i+1}/10] "${q.text}" → đúng: ${q.correct} (key ${ck})`);
    console.log(`        ảnh cần: ${q.imageNote}`);
  }

  console.log('\nXong! Vào /admin/quizzes → lọc bài học "Bài 1" → exerciseNumber=11 để thêm ảnh.');
  await conn.end();
}

main().catch(console.error);
