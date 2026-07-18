import 'reflect-metadata'; import { DataSource } from 'typeorm'; import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });
(async()=>{ await ds.initialize();
  const r:any[]=await ds.query("SELECT COUNT(*) c FROM information_schema.columns WHERE table_name='children_profiles' AND column_name='placementJson'");
  if(Number(r[0].c)===0){ await ds.query("ALTER TABLE children_profiles ADD COLUMN placementJson JSON NULL AFTER interests"); console.log('+ thêm placementJson'); }
  else console.log('placementJson đã có');
  await ds.destroy();
})();
