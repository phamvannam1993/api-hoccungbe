import 'reflect-metadata'; import { DataSource } from 'typeorm'; import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });
(async()=>{ await ds.initialize();
  const pairs = [['toan-hoc-lop-1','toan-lop-1'],['toan-hoc-lop-2','toan-lop-2']];
  for(const [oldS,newS] of pairs){
    // tránh trùng nếu newS đã tồn tại
    const dup:any[] = await ds.query('SELECT id FROM courses WHERE slug=?',[newS]);
    if(dup.length){ console.log(`  ! ${newS} đã tồn tại — bỏ qua`); continue; }
    const r:any = await ds.query('UPDATE courses SET slug=? WHERE slug=?',[newS,oldS]);
    console.log(`  ${oldS} → ${newS}: ${r.affectedRows} khóa`);
  }
  const all:any[] = await ds.query("SELECT slug,title FROM courses WHERE title LIKE '%Toán%' AND isPublished=1 ORDER BY slug");
  console.log('Khóa Toán sau đổi:', all.map((c:any)=>c.slug));
  await ds.destroy();
})();
