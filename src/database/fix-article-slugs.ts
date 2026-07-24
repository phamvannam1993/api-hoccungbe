import 'reflect-metadata'; import { DataSource } from 'typeorm'; import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });
const FIX=[['cach-luyen-oc-hieu-cho-hoc-sinh-lop-1','cach-luyen-doc-hieu-cho-hoc-sinh-lop-1'],['vi-sao-con-oc-uoc-nhung-khong-hieu-bai','vi-sao-con-doc-duoc-nhung-khong-hieu-bai']];
(async()=>{ await ds.initialize();
  for(const [o,n] of FIX){
    const dup:any[]=await ds.query('SELECT id FROM articles WHERE slug=?',[n]);
    if(dup.length){ console.log(`  ! ${n} đã tồn tại — bỏ qua`); continue; }
    const r:any=await ds.query('UPDATE articles SET slug=?, updatedAt=NOW() WHERE slug=?',[n,o]);
    console.log(`  ${o} → ${n}: ${r.affectedRows}`);
  }
  await ds.destroy(); console.log('HOÀN TẤT ✅');
})();
