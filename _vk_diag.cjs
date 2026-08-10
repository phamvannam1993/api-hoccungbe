require('dotenv').config();
const net = require('net');
const host = process.env.DB_HOST, port = Number(process.env.DB_PORT||3306);
console.log('resolved DB_HOST=', host, 'PORT=', port, 'DB=', process.env.DB_NAME);
const s = net.connect({host, port, timeout: 6000});
s.on('connect', ()=>{console.log('TCP CONNECT OK'); s.end(); process.exit(0);});
s.on('timeout', ()=>{console.log('TCP TIMEOUT'); s.destroy(); process.exit(1);});
s.on('error', e=>{console.log('TCP ERROR', e.code||e.message); process.exit(1);});
