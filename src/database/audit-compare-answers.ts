import * as mysql2 from 'mysql2/promise';

function evalExpr(expr: string): number | null {
  try {
    const clean = expr.replace(/[^0-9+\-*/().\s]/g, '').trim();
    if (!clean) return null;
    return Function(`"use strict"; return (${clean})`)() as number;
  } catch { return null; }
}

function getCorrectSign(left: number, right: number): string {
  if (left > right) return '>';
  if (left < right) return '<';
  return '=';
}

async function main() {
  const conn = await mysql2.createConnection({
    host: process.env.DB_HOST || "songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com",
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "jFUnRCumnerGsGaPT5pR",
    database: process.env.DB_NAME || "songtute",
  });

  // --- FILL_BLANK audit ---
  const [fbRows] = await conn.execute(`
    SELECT q.id, q.questionText, q.correctAnswerJson, q.lessonId,
           l.title as lessonTitle
    FROM quizzes q
    LEFT JOIN lessons l ON q.lessonId = l.id
    WHERE q.questionType = 'fill_blank'
      AND (q.questionText LIKE '%[?]%' OR q.questionText LIKE '%(điền dấu so sánh)%')
  `) as any[];

  let wrongCount = 0;
  const fbFixes: { id: number; newJson: string; oldAnswer: string; text: string }[] = [];

  for (const row of fbRows) {
    const text: string = row.questionText;
    const match = text.match(/([0-9+\-*/\s()]+)\s*(?:\[\?\]|\[b\d+\])\s*([0-9+\-*/\s()]+?)(?:\s*\(điền dấu so sánh\))?$/i);
    if (!match) continue;

    const leftVal = evalExpr(match[1]);
    const rightVal = evalExpr(match[2]);
    if (leftVal === null || rightVal === null) continue;

    const correctSign = getCorrectSign(leftVal, rightVal);

    let storedAnswer = '';
    let originalObj: any;
    let key = 'b1';
    try {
      originalObj = typeof row.correctAnswerJson === 'string'
        ? JSON.parse(row.correctAnswerJson) : row.correctAnswerJson;
      key = Object.keys(originalObj)[0] || 'b1';
      storedAnswer = String(Object.values(originalObj)[0]);
    } catch { continue; }

    if (storedAnswer.trim() !== correctSign) {
      wrongCount++;
      console.log(`[fill_blank] WRONG id=${row.id} lesson="${row.lessonTitle}" (${row.lessonId})`);
      console.log(`  "${text}"`);
      console.log(`  ${leftVal} vs ${rightVal} → should="${correctSign}" stored="${storedAnswer}"`);
      fbFixes.push({ id: row.id, newJson: JSON.stringify({ [key]: correctSign }), oldAnswer: storedAnswer, text });
    }
  }

  // --- DRAG_DROP audit ---
  const [ddRows] = await conn.execute(`
    SELECT q.id, q.questionText, q.correctAnswerJson, q.optionsJson, q.lessonId,
           l.title as lessonTitle
    FROM quizzes q
    LEFT JOIN lessons l ON q.lessonId = l.id
    WHERE q.questionType = 'drag_drop'
      AND (
        q.questionText LIKE '%kéo dấu%'
        OR q.questionText LIKE '%điền dấu%'
        OR q.questionText LIKE '%dấu so sánh%'
      )
  `) as any[];

  const ddFixes: { id: number; newJson: string; oldJson: string; text: string }[] = [];

  for (const row of ddRows) {
    const text: string = row.questionText;

    // Extract left _ right from patterns like "3+4 _ 8" or "2+7 _ 5+5"
    const match = text.match(/([0-9+\-*/\s()]+)\s*_\s*([0-9+\-*/\s()]+)/);
    if (!match) continue;

    const leftVal = evalExpr(match[1]);
    const rightVal = evalExpr(match[2]);
    if (leftVal === null || rightVal === null) continue;

    const correctSign = getCorrectSign(leftVal, rightVal);

    // Parse options: find which key maps to the correct sign
    let optionsObj: any;
    let correctAnswerArr: string[];
    try {
      optionsObj = typeof row.optionsJson === 'string' ? JSON.parse(row.optionsJson) : row.optionsJson;
      const ans = typeof row.correctAnswerJson === 'string' ? JSON.parse(row.correctAnswerJson) : row.correctAnswerJson;
      correctAnswerArr = Array.isArray(ans) ? ans : [String(ans)];
    } catch { continue; }

    // Find the key whose value is correctSign
    // optionsJson may be array [{key, text}] or plain {A:">", B:"<", C:"="}
    let expectedKey: string | null = null;
    if (Array.isArray(optionsObj)) {
      for (const item of optionsObj) {
        if (String(item.text ?? item.value ?? '').trim() === correctSign) {
          expectedKey = String(item.key ?? item.id ?? '');
          break;
        }
      }
    } else {
      for (const [k, v] of Object.entries(optionsObj)) {
        if (String(v).trim() === correctSign) { expectedKey = k; break; }
      }
    }
    if (!expectedKey) {
      console.log(`[drag_drop] WARNING id=${row.id}: no option matches sign "${correctSign}" in options: ${JSON.stringify(optionsObj)}`);
      console.log(`  "${text}"`);
      continue;
    }

    const storedKey = correctAnswerArr[0];
    if (storedKey !== expectedKey) {
      wrongCount++;
      const storedSign = Array.isArray(optionsObj)
        ? (optionsObj.find((o: any) => String(o.key) === storedKey)?.text ?? '?')
        : (optionsObj[storedKey] ?? '?');
      console.log(`[drag_drop] WRONG id=${row.id} lesson="${row.lessonTitle}" (${row.lessonId})`);
      console.log(`  "${text}"`);
      console.log(`  ${leftVal} vs ${rightVal} → should="${correctSign}"(key ${expectedKey}) stored="${storedSign}"(key ${storedKey})`);
      ddFixes.push({ id: row.id, newJson: JSON.stringify([expectedKey]), oldJson: row.correctAnswerJson, text });
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`fill_blank checked: ${fbRows.length}, wrong: ${fbFixes.length}`);
  console.log(`drag_drop checked: ${ddRows.length}, wrong: ${ddFixes.length}`);
  console.log(`Total wrong: ${wrongCount}`);

  const allFixes = [...fbFixes.map(f => ({ id: f.id, newJson: f.newJson, label: `fill_blank` })),
                   ...ddFixes.map(f => ({ id: f.id, newJson: f.newJson, label: `drag_drop` }))];

  if (allFixes.length > 0) {
    console.log('\nAuto-fixing...');
    for (const f of allFixes) {
      await conn.execute('UPDATE quizzes SET correctAnswerJson=? WHERE id=?', [f.newJson, f.id]);
      console.log(`  Fixed [${f.label}] id=${f.id} → ${f.newJson}`);
    }
    console.log('Done.');
  } else {
    console.log('\nAll answers correct!');
  }

  await conn.end();
}

main().catch(console.error);
