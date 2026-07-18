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

// Đoạn đọc VIẾT LẠI khác hẳn văn phong SGK — giữ nguyên sự việc/nhân vật để đáp án đọc hiểu không đổi.
const P745 = 'Bên gốc cây, đàn gà con lon ton bên chân mẹ. Có mẹ che chắn, cả đàn chẳng sợ lũ quạ hung dữ.';
const P759 = 'Nghỉ hè, cả nhà Hà lên Tam Đảo chơi. Sáng sớm, khi cây cỏ còn ngái ngủ, Hà đã dậy ngắm biển mây bồng bềnh. Giữa trưa mà trời vẫn mát như mùa thu. Mùa hè ở Tam Đảo quả là dễ chịu.';
const P760 = 'Muốn ngắm Tây Bắc, bạn hãy tới Sa Pa. Ở đây, một ngày hè có khi trải qua cả bốn mùa. Sa Pa còn có Thác Bạc, Cầu Mây và những bản làng nhỏ xinh.';

type Fix = { id: number; text: string; opts?: [string, string][]; correct?: string };

const FIXES: Fix[] = [
  // Bài 745 — đổi đoạn (đáp án "Gần chân mẹ" vẫn đúng)
  { id: 8517, text: `Đọc đoạn: "${P745}" — Đàn gà con đi lại gần đâu?` },
  // Bài 745 — câu liệt kê tiếng theo đoạn mới (an/ăn/ân): đàn, chân, chắn
  { id: 8523, text: 'Nhóm nào gồm đúng các tiếng mang vần an, ăn hoặc ân trong đoạn đọc về đàn gà?',
    opts: [['A', 'đàn, chân, chắn'], ['B', 'gà, mẹ, quạ'], ['C', 'gốc, cây, sợ']], correct: 'A' },

  // Bài 759 — đổi đoạn (giữ câu "Mùa hè ở Tam Đảo quả là dễ chịu" cho câu đếm phía sau)
  { id: 8936, text: `Đọc đoạn: "${P759}" — Nghỉ hè, nhà Hà đi đâu?` },

  // Bài 760 — đổi đoạn Sa Pa (giữ Thác Bạc, Cầu Mây, bốn mùa)
  { id: 8968, text: `Đọc đoạn: "${P760}" — Vào mùa hè, mỗi ngày ở Sa Pa được ví như thế nào?` },
];

async function main() {
  await ds.initialize();
  console.log('Viết lại đoạn đọc (batch 1: bài 745, 759, 760)…');
  for (const f of FIXES) {
    if (f.opts && f.correct) {
      await ds.query('UPDATE quizzes SET questionText = ?, optionsJson = ?, correctAnswerJson = ? WHERE id = ?',
        [f.text, JSON.stringify(f.opts.map(([key, text]) => ({ key, text }))), JSON.stringify(f.correct), f.id]);
    } else {
      await ds.query('UPDATE quizzes SET questionText = ? WHERE id = ?', [f.text, f.id]);
    }
    console.log(`  ✓ #${f.id}`);
  }
  await ds.destroy();
  console.log('HOÀN TẤT ✅');
}

main().catch((e) => { console.error('LỖI:', e); process.exit(1); });
