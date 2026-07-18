import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });
async function hasCol(table:string,col:string){ const r:any[]=await ds.query(`SELECT COUNT(*) c FROM information_schema.columns WHERE table_schema=? AND table_name=? AND column_name=?`,[process.env.DB_NAME,table,col]); return Number(r[0].c)>0; }
async function main(){
  await ds.initialize();
  if(!(await hasCol('daily_recommendations','kind'))){
    await ds.query(`ALTER TABLE daily_recommendations ADD COLUMN kind ENUM('review_wrong','current','review_old','challenge') NOT NULL DEFAULT 'current' AFTER reason`);
    console.log('  + thêm cột kind');
  } else console.log('  kind đã có');
  if(!(await hasCol('daily_recommendations','wrongCount'))){
    await ds.query(`ALTER TABLE daily_recommendations ADD COLUMN wrongCount SMALLINT UNSIGNED NULL AFTER kind`);
    console.log('  + thêm cột wrongCount');
  } else console.log('  wrongCount đã có');
  // xóa gợi ý cũ để sinh lại theo công thức mới ở lần mở kế tiếp
  const del:any = await ds.query(`DELETE FROM daily_recommendations`);
  console.log('  xóa gợi ý cũ để tái sinh:', del.affectedRows ?? '');
  console.log('HOÀN TẤT ✅');
  await ds.destroy();
}
main().catch(e=>{console.error('LỖI:',e);process.exit(1);});
