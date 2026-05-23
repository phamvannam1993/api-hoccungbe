import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const ds = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'songtute',
    entities: [],
    synchronize: false,
  });
  await ds.initialize();
  await ds.query(`ALTER TABLE exam_questions MODIFY COLUMN questionType ENUM('single_choice','multiple_choice','true_false','matching','fill_blank','number_compare','table_fill','drag_to_position') NOT NULL DEFAULT 'single_choice'`);
  console.log('✅ Enum updated');
  await ds.destroy();
}
main().catch(console.error);
