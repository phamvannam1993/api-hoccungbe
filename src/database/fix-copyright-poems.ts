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

type Opt = [string, string];
type Fix = { id: number; text: string; opts?: Opt[]; correct?: string };

// Khổ thơ TỰ SÁNG TÁC cho bài 773 (thay cho "Mèo con đi học" có bản quyền) — vẫn dạy vần ang/ăng/âng.
const MEO =
  'Sáng nay nắng trải đường làng / Mèo con tung tăng tới lớp / Vai mang chiếc cặp gọn gàng / Lòng vui phơi phới nhẹ nhàng.';

// Đoạn văn TỰ VIẾT cho bài 772 (bỏ tên "Ếch cốm", chuyển thơ thành văn xuôi) — dạy vần ach/êch/ich.
const ECH =
  'Chú ếch con thích đọc sách. Chú ngồi đọc bên bờ ao. Mải xem đàn cào cào, chú quên cả sách.';

const FIXES: Fix[] = [
  // ===== BÀI 773 — Mèo con đi học (ang/ăng/âng) =====
  { id: 9358, text: `Đọc bài thơ về mèo con đi học: "${MEO}" — Buổi sáng mèo con đi học, thời tiết thế nào?`,
    opts: [['A', 'Nắng trải khắp đường làng'], ['B', 'Mưa rơi lộp độp'], ['C', 'Trời lạnh và có tuyết']], correct: 'A' },
  { id: 9359, text: 'Khi đi học, mèo con mang theo gì?',
    opts: [['A', 'Một chiếc cặp gọn gàng'], ['B', 'Nhiều bóng bay'], ['C', 'Một chiếc ô']], correct: 'A' },
  { id: 9363, text: 'Dòng thơ "Sáng nay nắng trải đường làng" có bao nhiêu tiếng?',
    opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'B' },
  { id: 9364, text: 'Trong cả bài thơ về mèo con đi học, có bao nhiêu tiếng chứa các vần ang, ăng hoặc âng?',
    opts: [['A', '5 tiếng'], ['B', '6 tiếng'], ['C', '7 tiếng']], correct: 'C' },
  { id: 9368, text: 'Sắp xếp nội dung theo đúng thứ tự bài thơ: (1) Sáng nắng, đường làng rực rỡ. (2) Mèo con tung tăng tới lớp. (3) Mèo mang chiếc cặp gọn gàng. (4) Mèo bước đi nhẹ nhàng, vui vẻ.',
    opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },

  // ===== BÀI 772 — chú ếch (ach/êch/ich) =====
  { id: 9328, text: `Đọc đoạn sau: "${ECH}" — Chú ếch ngồi đọc ở đâu?`,
    opts: [['A', 'Bờ ao'], ['B', 'Trong lớp học'], ['C', 'Dưới gầm bàn']], correct: 'A' },
  { id: 9329, text: 'Vì sao chú ếch quên sách?',
    opts: [['A', 'Vì làm mất sách'], ['B', 'Vì cho bạn mượn sách'], ['C', 'Vì mải xem đàn cào cào']], correct: 'C' },
  { id: 9333, text: 'Câu "Chú ngồi đọc bên bờ ao" có bao nhiêu tiếng?',
    opts: [['A', '4 tiếng'], ['B', '5 tiếng'], ['C', '6 tiếng']], correct: 'C' },
  { id: 9334, text: 'Trong đoạn đọc về chú ếch, có bao nhiêu tiếng chứa vần ach, êch, ich?',
    opts: [['A', '2 tiếng'], ['B', '3 tiếng'], ['C', '4 tiếng']], correct: 'C' },
  { id: 9338, text: 'Sắp xếp sự việc theo đúng thứ tự đoạn đọc: (1) Chú ếch ngồi đọc bên bờ ao. (2) Chú mải xem đàn cào cào. (3) Chú quên cả sách. (4) Đến lớp, chú xin lỗi cô.',
    opts: [['A', '1 – 2 – 3 – 4'], ['B', '2 – 4 – 1 – 3'], ['C', '3 – 1 – 4 – 2']], correct: 'A' },
  { id: 9339, text: 'Qua câu chuyện, chú ếch cần rút ra bài học gì?',
    opts: [['A', 'Chỉ cần vui chơi, không cần mang sách'], ['B', 'Chuẩn bị sách vở đầy đủ, tập trung học và biết nhận lỗi'], ['C', 'Có thể để sách ở bất cứ đâu']], correct: 'B' },
];

async function main() {
  await ds.initialize();
  console.log('Sửa nội dung dính bản quyền (bài 772, 773)…');
  for (const f of FIXES) {
    if (f.opts && f.correct) {
      const optionsJson = f.opts.map(([key, text]) => ({ key, text }));
      await ds.query(
        'UPDATE quizzes SET questionText = ?, optionsJson = ?, correctAnswerJson = ? WHERE id = ?',
        [f.text, JSON.stringify(optionsJson), JSON.stringify(f.correct), f.id],
      );
    } else {
      await ds.query('UPDATE quizzes SET questionText = ? WHERE id = ?', [f.text, f.id]);
    }
    console.log(`  ✓ #${f.id} → ${f.correct ? 'đáp án ' + f.correct : 'đổi đề'}`);
  }
  await ds.destroy();
  console.log('HOÀN TẤT ✅');
}

main().catch((e) => { console.error('LỖI:', e); process.exit(1); });
