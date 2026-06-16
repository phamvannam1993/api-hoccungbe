import mysql from 'mysql2/promise';
async function main() {
  const conn = await mysql.createConnection({
    host: 'songtute.c8spusdhenpr.ap-southeast-1.rds.amazonaws.com',
    user: 'admin', password: 'jFUnRCumnerGsGaPT5pR', database: 'songtute',
  });
  await conn.execute(`ALTER TABLE quizzes MODIFY COLUMN questionType ENUM('single_choice','multiple_choice','true_false','drag_drop','image_choice','matching','fill_blank','table_fill','number_line','sorting','cross_out','coloring','puzzle','game','counting','find_errors') NOT NULL DEFAULT 'single_choice'`);
  console.log('Done');
  await conn.end();
}
main().catch(console.error);
