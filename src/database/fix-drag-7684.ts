import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

// Quiz 7684: drag_drop "Sắp xếp các từ sau thành câu đúng: bố – Nam – và – câu cá"
// Options: A=Nam, B=và, C=bố, D=câu cá.  → câu đúng "Bố và Nam câu cá." = C B A D
async function main() {
  await ds.initialize();
  await ds.query('UPDATE quizzes SET correctAnswerJson = ? WHERE id = ?', [
    JSON.stringify(['C', 'B', 'A', 'D']),
    7684,
  ]);
  const [row] = await ds.query('SELECT id, questionType, correctAnswerJson FROM quizzes WHERE id = 7684');
  console.log('Đã cập nhật:', row);
  await ds.destroy();
}

main().catch((e) => {
  console.error('LỖI:', e);
  process.exit(1);
});
