import 'reflect-metadata'; import { DataSource } from 'typeorm'; import * as dotenv from 'dotenv'; import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const ds = new DataSource({ type:'mysql', host:process.env.DB_HOST, port:Number(process.env.DB_PORT), username:process.env.DB_USERNAME, password:process.env.DB_PASSWORD, database:process.env.DB_NAME, entities:[], synchronize:false });
(async()=>{ await ds.initialize();
  const r:any[]=await ds.query("SELECT COUNT(*) c FROM information_schema.columns WHERE table_name='children_profiles' AND column_name='prefsJson'");
  if(Number(r[0].c)===0){ await ds.query("ALTER TABLE children_profiles ADD COLUMN prefsJson JSON NULL AFTER placementJson"); console.log('+ thêm prefsJson'); } else console.log('prefsJson đã có');
  await ds.destroy();
})();
