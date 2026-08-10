require('dotenv').config();
const mysql = require('mysql2/promise');
(async () => {
  const c = await mysql.createConnection({
    host: process.env.DB_HOST, port: process.env.DB_PORT||3306,
    user: process.env.DB_USERNAME||process.env.DB_USER, password: process.env.DB_PASSWORD||process.env.DB_PASS,
    database: process.env.DB_DATABASE||process.env.DB_NAME,
  });
  const [all] = await c.query(`SELECT id, title, sortOrder FROM lessons WHERE courseId=9 ORDER BY sortOrder, id`);
  console.log('course 9 lessons:', all.length);
  all.filter(l=>/\b31\b|an, ân|ân, ăn|vần an/i.test(l.title)).forEach(l=>console.log('MATCH', l.id, '|', l.title));
  console.log('--- lessons 28-34 by order ---');
  all.slice(27,34).forEach(l=>console.log(l.id, '|', l.sortOrder, '|', l.title));
  await c.end();
})().catch(e=>{console.error('ERR', e.message);process.exit(1)});
