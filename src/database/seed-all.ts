/**
 * Seed toàn bộ dữ liệu cần thiết:
 *   1. Users (admin + phụ huynh demo)
 *   2. Children profiles
 *   3. Subscriptions demo
 *   4. Games + GameQuestions + GameItems cho từng bài học
 *
 * Chạy: npm run seed:all
 * Reset: npm run seed:all -- --reset
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const RESET = process.argv.includes('--reset');

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: false,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function q(sql: string, params: unknown[] = []) {
  return ds.query(sql, params);
}

async function findOne(table: string, where: Record<string, unknown>) {
  const conds = Object.keys(where).map((k) => `${k} = ?`).join(' AND ');
  const rows = await q(`SELECT * FROM \`${table}\` WHERE ${conds} LIMIT 1`, Object.values(where));
  return rows[0] ?? null;
}

async function insertIfNotExists(
  table: string,
  uniqueWhere: Record<string, unknown>,
  data: Record<string, unknown>,
): Promise<number> {
  const existing = await findOne(table, uniqueWhere);
  if (existing) return existing.id;
  const cols = Object.keys(data).map((k) => `\`${k}\``).join(', ');
  const vals = Object.keys(data).map(() => '?').join(', ');
  const res = await q(`INSERT INTO \`${table}\` (${cols}, createdAt, updatedAt) VALUES (${vals}, NOW(), NOW())`, Object.values(data));
  return res.insertId;
}

// ─── 1. Users ─────────────────────────────────────────────────────────────────

const USERS = [
  { fullName: 'Admin HocCungBe', email: 'admin@hoccungbe.com', role: 'admin', password: '123456' },
  { fullName: 'Nguyễn Thị Lan', email: 'lan@demo.com', role: 'user', password: '123456' },
  { fullName: 'Trần Văn Hùng', email: 'hung@demo.com', role: 'user', password: '123456' },
  { fullName: 'Lê Thị Mai', email: 'mai@demo.com', role: 'user', password: '123456' },
];

// ─── 2. Children ──────────────────────────────────────────────────────────────

const CHILDREN: {
  parentEmail: string;
  fullName: string;
  nickname: string;
  gender: string;
  age: number;
  currentLevel: string;
  interests: string[];
}[] = [
  { parentEmail: 'lan@demo.com', fullName: 'Nguyễn Minh Khoa', nickname: 'Khoa', gender: 'male', age: 5, currentLevel: 'beginner', interests: ['math', 'logic'] },
  { parentEmail: 'lan@demo.com', fullName: 'Nguyễn Thị Linh', nickname: 'Linh', gender: 'female', age: 4, currentLevel: 'beginner', interests: ['language', 'creative'] },
  { parentEmail: 'hung@demo.com', fullName: 'Trần Minh Tuấn', nickname: 'Tuấn', gender: 'male', age: 6, currentLevel: 'intermediate', interests: ['math', 'logic', 'language'] },
  { parentEmail: 'mai@demo.com', fullName: 'Lê Bảo Ngọc', nickname: 'Ngọc', gender: 'female', age: 3, currentLevel: 'beginner', interests: ['creative', 'emotion'] },
];

// ─── 3. Subscriptions ─────────────────────────────────────────────────────────

const SUBSCRIPTION_PLANS = [
  { userEmail: 'lan@demo.com', planName: 'Gói Gia Đình Năm', planType: 'yearly', amount: 899000, status: 'active', daysAgo: 30, durationDays: 365 },
  { userEmail: 'hung@demo.com', planName: 'Gói Tháng', planType: 'monthly', amount: 99000, status: 'active', daysAgo: 5, durationDays: 30 },
  { userEmail: 'mai@demo.com', planName: 'Gói Gia Đình Năm', planType: 'yearly', amount: 899000, status: 'expired', daysAgo: 400, durationDays: 365 },
];

// ─── 4. Games ─────────────────────────────────────────────────────────────────
// Mỗi game gắn với một bài học (theo slug), có nhiều questions + items

type GameItem = { itemType: string; content: string; isCorrect?: boolean; pairId?: number; sortOrder: number };
type GameQuestion = { questionText: string; sortOrder: number; items: GameItem[] };
type GameSeed = {
  lessonSlug: string;
  gameType: string;
  title: string;
  description: string;
  instruction: string;
  timeLimit: number;
  points: number;
  questions: GameQuestion[];
};

const GAMES: GameSeed[] = [
  // ── Toán học ─────────────────────────────────────────────────────────────

  {
    lessonSlug: 'so-1-2-3',
    gameType: 'choose_correct',
    title: 'Chọn số đúng',
    description: 'Bé nghe số và chọn hình đúng',
    instruction: 'Nhìn vào số, chọn hình có đúng số lượng đồ vật đó.',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: 'Số 1 — Chọn nhóm có 1 đồ vật',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '🍎', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: '🍎🍎', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🍎🍎🍎', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Số 2 — Chọn nhóm có 2 đồ vật',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '⭐', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '⭐⭐', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '⭐⭐⭐', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Số 3 — Chọn nhóm có 3 đồ vật',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: '🦆🦆', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '🦆🦆🦆', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '🦆', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'dem-den-5-chu-vit',
    gameType: 'choose_correct',
    title: 'Đếm vịt con',
    description: 'Đếm số vịt và chọn đáp án đúng',
    instruction: 'Đếm các chú vịt rồi chọn số đúng.',
    timeLimit: 60,
    points: 50,
    questions: [
      {
        questionText: '🦆🦆🦆 — Có mấy con vịt?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '2', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '3', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '🦆🦆🦆🦆🦆 — Có mấy con vịt?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '5', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '6', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'so-9-va-10',
    gameType: 'drag',
    title: 'Kéo thả số vào ô',
    description: 'Kéo số đúng vào ô tương ứng',
    instruction: 'Kéo số phù hợp vào ô còn trống.',
    timeLimit: 90,
    points: 60,
    questions: [
      {
        questionText: 'Điền số còn thiếu: 7, 8, ___, 10',
        sortOrder: 1,
        items: [
          { itemType: 'draggable', content: '9', isCorrect: true, sortOrder: 1 },
          { itemType: 'draggable', content: '6', isCorrect: false, sortOrder: 2 },
          { itemType: 'draggable', content: '11', isCorrect: false, sortOrder: 3 },
          { itemType: 'dropzone', content: '___', sortOrder: 4 },
        ],
      },
      {
        questionText: 'Điền số còn thiếu: ___, 8, 9, 10',
        sortOrder: 2,
        items: [
          { itemType: 'draggable', content: '7', isCorrect: true, sortOrder: 1 },
          { itemType: 'draggable', content: '6', isCorrect: false, sortOrder: 2 },
          { itemType: 'draggable', content: '5', isCorrect: false, sortOrder: 3 },
          { itemType: 'dropzone', content: '___', sortOrder: 4 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'cong-don-gian-ngon-tay',
    gameType: 'choose_correct',
    title: 'Phép cộng ngón tay',
    description: 'Tính toán và chọn kết quả đúng',
    instruction: 'Dùng ngón tay đếm rồi chọn kết quả đúng.',
    timeLimit: 120,
    points: 60,
    questions: [
      {
        questionText: '2 + 3 = ?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '5', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '6', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '1 + 4 = ?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '5', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '6', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '3 + 3 = ?',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: '5', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '6', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '7', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'tru-vui-ve-chia-keo',
    gameType: 'choose_correct',
    title: 'Chia kẹo',
    description: 'Phép trừ qua chia kẹo',
    instruction: 'Bé chia kẹo cho bạn rồi đếm xem còn lại bao nhiêu.',
    timeLimit: 120,
    points: 60,
    questions: [
      {
        questionText: '5 - 2 = ?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '2', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '3', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '4 - 1 = ?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '2', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '3', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '4', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  // ── Tiếng Việt ────────────────────────────────────────────────────────────

  {
    lessonSlug: 'van-an-an-an',
    gameType: 'connect',
    title: 'Nối âm với vần',
    description: 'Nối âm đầu với vần đúng để tạo thành từ',
    instruction: 'Kéo âm đầu nối với vần đúng để tạo thành từ có nghĩa.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: 'Nối âm với vần tương ứng',
        sortOrder: 1,
        items: [
          { itemType: 'left', content: 'b', pairId: 1, sortOrder: 1 },
          { itemType: 'left', content: 'l', pairId: 2, sortOrder: 2 },
          { itemType: 'left', content: 'b', pairId: 3, sortOrder: 3 },
          { itemType: 'right', content: 'àn (bàn)', pairId: 1, sortOrder: 4 },
          { itemType: 'right', content: 'ăn (lăn)', pairId: 2, sortOrder: 5 },
          { itemType: 'right', content: 'ân (bân)', pairId: 3, sortOrder: 6 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'van-en-in-on',
    gameType: 'arrange',
    title: 'Xe lửa vần',
    description: 'Sắp xếp từ thành câu đúng',
    instruction: 'Sắp xếp các từ để tạo câu đúng.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: 'Sắp xếp thành câu: "bé / ăn / cơm"',
        sortOrder: 1,
        items: [
          { itemType: 'item', content: 'ăn', sortOrder: 2 },
          { itemType: 'item', content: 'bé', sortOrder: 1 },
          { itemType: 'item', content: 'cơm', sortOrder: 3 },
        ],
      },
      {
        questionText: 'Sắp xếp thành câu: "con / mèo / kêu"',
        sortOrder: 2,
        items: [
          { itemType: 'item', content: 'kêu', sortOrder: 3 },
          { itemType: 'item', content: 'con', sortOrder: 1 },
          { itemType: 'item', content: 'mèo', sortOrder: 2 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'tu-don-gian-con-vat',
    gameType: 'image_match',
    title: 'Ghép từ với hình',
    description: 'Nối tên con vật với hình ảnh tương ứng',
    instruction: 'Kéo tên con vật vào đúng hình ảnh.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: 'Nối tên con vật với hình đúng',
        sortOrder: 1,
        items: [
          { itemType: 'left', content: 'mèo', pairId: 1, sortOrder: 1 },
          { itemType: 'left', content: 'chó', pairId: 2, sortOrder: 2 },
          { itemType: 'left', content: 'gà', pairId: 3, sortOrder: 3 },
          { itemType: 'right', content: '🐱', pairId: 1, sortOrder: 4 },
          { itemType: 'right', content: '🐶', pairId: 2, sortOrder: 5 },
          { itemType: 'right', content: '🐔', pairId: 3, sortOrder: 6 },
        ],
      },
    ],
  },

  // ── Màu sắc & Sáng tạo ───────────────────────────────────────────────────

  {
    lessonSlug: 'hinh-tron-vuong-tam-giac',
    gameType: 'choose_correct',
    title: 'Nhận biết hình',
    description: 'Chọn đúng tên hình dạng',
    instruction: 'Nhìn hình và chọn tên đúng.',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: '⭕ Đây là hình gì?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: 'Hình tròn', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: 'Hình vuông', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: 'Hình tam giác', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '🔺 Đây là hình gì?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: 'Hình tròn', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Hình vuông', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: 'Hình tam giác', isCorrect: true, sortOrder: 3 },
        ],
      },
      {
        questionText: '⬛ Đây là hình gì?',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: 'Hình tròn', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Hình vuông', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: 'Hình tam giác', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'ghep-hinh-ngoi-nha',
    gameType: 'drag_arrange',
    title: 'Ghép ngôi nhà',
    description: 'Kéo các hình ghép thành ngôi nhà',
    instruction: 'Kéo các hình vào đúng vị trí để tạo thành ngôi nhà.',
    timeLimit: 120,
    points: 60,
    questions: [
      {
        questionText: 'Ghép ngôi nhà từ các hình cơ bản',
        sortOrder: 1,
        items: [
          { itemType: 'draggable', content: '🔺 (mái nhà)', sortOrder: 1 },
          { itemType: 'draggable', content: '⬛ (thân nhà)', sortOrder: 2 },
          { itemType: 'draggable', content: '⬜ (cửa)', sortOrder: 3 },
          { itemType: 'dropzone', content: 'mái', sortOrder: 4, configJson: { position: 'top' } } as any,
          { itemType: 'dropzone', content: 'thân', sortOrder: 5, configJson: { position: 'middle' } } as any,
          { itemType: 'dropzone', content: 'cửa', sortOrder: 6, configJson: { position: 'bottom' } } as any,
        ],
      },
    ],
  },

  // ── Cảm xúc ───────────────────────────────────────────────────────────────

  {
    lessonSlug: 'cam-xuc-tuc-gian',
    gameType: 'choose_correct',
    title: 'Chọn cách xử lý đúng',
    description: 'Bé chọn cách ứng xử phù hợp khi tức giận',
    instruction: 'Khi tức giận, cách nào là đúng nhất?',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: 'Bạn lấy đồ chơi của bé mà không xin phép. Bé nên làm gì?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: 'Đánh bạn', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Hít thở sâu rồi nói chuyện với bạn', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: 'Ném đồ chơi', isCorrect: false, sortOrder: 3 },
          { itemType: 'option', content: 'Khóc thật to', isCorrect: false, sortOrder: 4 },
        ],
      },
      {
        questionText: 'Khi tức giận, bé nên làm gì đầu tiên?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: 'Đếm đến 10 và hít thở sâu', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: 'La hét thật to', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: 'Đập phá đồ vật', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'dong-cam-ban-be',
    gameType: 'choose_correct',
    title: 'Bé biết quan tâm',
    description: 'Chọn cách quan tâm bạn bè đúng',
    instruction: 'Chọn hành động đúng để thể hiện sự quan tâm.',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: 'Bạn bị ngã và khóc. Bé nên làm gì?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: 'Bỏ đi, mặc kệ bạn', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Lại hỏi thăm và giúp bạn đứng dậy', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: 'Cười bạn', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  // ── Tư duy Logic ──────────────────────────────────────────────────────────

  {
    lessonSlug: 'phan-loai-do-vat',
    gameType: 'drag',
    title: 'Phân loại đồ vật',
    description: 'Kéo đồ vật vào đúng nhóm',
    instruction: 'Kéo từng đồ vật vào nhóm phù hợp: Đồ ăn, Đồ chơi, hay Quần áo?',
    timeLimit: 120,
    points: 60,
    questions: [
      {
        questionText: 'Phân loại các đồ vật vào đúng nhóm',
        sortOrder: 1,
        items: [
          { itemType: 'draggable', content: '🍎 táo', sortOrder: 1, configJson: { group: 'food' } } as any,
          { itemType: 'draggable', content: '🧸 gấu bông', sortOrder: 2, configJson: { group: 'toy' } } as any,
          { itemType: 'draggable', content: '👕 áo', sortOrder: 3, configJson: { group: 'clothes' } } as any,
          { itemType: 'draggable', content: '🍌 chuối', sortOrder: 4, configJson: { group: 'food' } } as any,
          { itemType: 'draggable', content: '🚂 tàu hỏa', sortOrder: 5, configJson: { group: 'toy' } } as any,
          { itemType: 'draggable', content: '👖 quần', sortOrder: 6, configJson: { group: 'clothes' } } as any,
          { itemType: 'dropzone', content: '🍽️ Đồ ăn', sortOrder: 7, configJson: { group: 'food' } } as any,
          { itemType: 'dropzone', content: '🎮 Đồ chơi', sortOrder: 8, configJson: { group: 'toy' } } as any,
          { itemType: 'dropzone', content: '👗 Quần áo', sortOrder: 9, configJson: { group: 'clothes' } } as any,
        ],
      },
    ],
  },

  {
    lessonSlug: 'quy-luat-mau-sac',
    gameType: 'choose_correct',
    title: 'Tìm màu tiếp theo',
    description: 'Nhận biết quy luật màu và điền tiếp',
    instruction: 'Quan sát quy luật màu sắc và chọn màu tiếp theo.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: '🔴🔵🔴🔵🔴___ — Tiếp theo là màu gì?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '🔴 Đỏ', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '🔵 Xanh', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '🟡 Vàng', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '🟡🟢🟡🟢___ — Tiếp theo là màu gì?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '🟡 Vàng', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: '🟢 Xanh lá', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🔴 Đỏ', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: '🔴🟡🔵🔴🟡___ — Tiếp theo là màu gì?',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: '🔴 Đỏ', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '🟡 Vàng', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🔵 Xanh', isCorrect: true, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'cau-do-toi-la-ai',
    gameType: 'choose_correct',
    title: 'Câu đố: Tôi là ai?',
    description: 'Đoán tên đồ vật qua gợi ý',
    instruction: 'Nghe gợi ý và đoán xem đó là con vật hay đồ vật gì.',
    timeLimit: 120,
    points: 60,
    questions: [
      {
        questionText: 'Tôi có 4 chân, tôi kêu "gâu gâu", tôi là bạn thân của người. Tôi là ai?',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: 'Con mèo 🐱', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Con chó 🐶', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: 'Con gà 🐔', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Tôi màu vàng, tôi ngọt, tôi cong cong như trăng lưỡi liềm. Tôi là ai?',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: 'Quả táo 🍎', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Quả cam 🍊', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: 'Quả chuối 🍌', isCorrect: true, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Ban đêm tôi sáng lên trên bầu trời, tôi nhấp nháy như đèn. Tôi là ai?',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: 'Mặt trời ☀️', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: 'Ngôi sao ⭐', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: 'Đám mây ☁️', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'xep-hinh-tangram',
    gameType: 'drag_arrange',
    title: 'Tangram - Xếp hình con thỏ',
    description: 'Ghép các mảnh Tangram thành con thỏ',
    instruction: 'Kéo và xoay các mảnh hình học để ghép thành con thỏ.',
    timeLimit: 180,
    points: 80,
    questions: [
      {
        questionText: 'Ghép thành con thỏ 🐰',
        sortOrder: 1,
        items: [
          { itemType: 'draggable', content: '🔺 tam giác lớn', sortOrder: 1 },
          { itemType: 'draggable', content: '🔺 tam giác nhỏ', sortOrder: 2 },
          { itemType: 'draggable', content: '▪️ hình vuông', sortOrder: 3 },
          { itemType: 'draggable', content: '▱ hình bình hành', sortOrder: 4 },
          { itemType: 'dropzone', content: 'thân', sortOrder: 5 },
          { itemType: 'dropzone', content: 'tai trái', sortOrder: 6 },
          { itemType: 'dropzone', content: 'tai phải', sortOrder: 7 },
        ],
      },
    ],
  },

  // ── Tiếng Anh ─────────────────────────────────────────────────────────────

  {
    lessonSlug: 'colors-mau-sac',
    gameType: 'choose_correct',
    title: 'Touch the color!',
    description: 'Chọn màu đúng theo lệnh tiếng Anh',
    instruction: 'Đọc lệnh và chọn màu đúng.',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: 'Touch the RED color!',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '🔴 Red', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: '🔵 Blue', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🟡 Yellow', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Touch the BLUE color!',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '🔴 Red', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '🔵 Blue', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '🟢 Green', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Touch the YELLOW color!',
        sortOrder: 3,
        items: [
          { itemType: 'option', content: '🟡 Yellow', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: '🟠 Orange', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🟣 Purple', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'animals-dong-vat',
    gameType: 'image_match',
    title: 'Animal sounds!',
    description: 'Nối con vật với tiếng kêu tiếng Anh',
    instruction: 'Kéo tên con vật nối với tiếng kêu của nó.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: 'Match the animals with their sounds',
        sortOrder: 1,
        items: [
          { itemType: 'left', content: '🐶 Dog', pairId: 1, sortOrder: 1 },
          { itemType: 'left', content: '🐱 Cat', pairId: 2, sortOrder: 2 },
          { itemType: 'left', content: '🐄 Cow', pairId: 3, sortOrder: 3 },
          { itemType: 'right', content: 'Woof woof!', pairId: 1, sortOrder: 4 },
          { itemType: 'right', content: 'Meow!', pairId: 2, sortOrder: 5 },
          { itemType: 'right', content: 'Moo!', pairId: 3, sortOrder: 6 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'family-gia-dinh',
    gameType: 'connect',
    title: 'Family members',
    description: 'Nối từ tiếng Anh với thành viên gia đình',
    instruction: 'Kéo từ tiếng Anh nối với hình thành viên gia đình đúng.',
    timeLimit: 90,
    points: 50,
    questions: [
      {
        questionText: 'Match family members',
        sortOrder: 1,
        items: [
          { itemType: 'left', content: 'Mother', pairId: 1, sortOrder: 1 },
          { itemType: 'left', content: 'Father', pairId: 2, sortOrder: 2 },
          { itemType: 'left', content: 'Baby', pairId: 3, sortOrder: 3 },
          { itemType: 'right', content: '👩 Mẹ', pairId: 1, sortOrder: 4 },
          { itemType: 'right', content: '👨 Bố', pairId: 2, sortOrder: 5 },
          { itemType: 'right', content: '👶 Em bé', pairId: 3, sortOrder: 6 },
        ],
      },
    ],
  },

  {
    lessonSlug: 'shapes-hinh-dang',
    gameType: 'choose_correct',
    title: 'Find the shape!',
    description: 'Tìm đúng hình theo lệnh tiếng Anh',
    instruction: 'Đọc lệnh và chọn hình dạng đúng.',
    timeLimit: 60,
    points: 30,
    questions: [
      {
        questionText: 'Find the CIRCLE!',
        sortOrder: 1,
        items: [
          { itemType: 'option', content: '⭕ Circle', isCorrect: true, sortOrder: 1 },
          { itemType: 'option', content: '⬛ Square', isCorrect: false, sortOrder: 2 },
          { itemType: 'option', content: '🔺 Triangle', isCorrect: false, sortOrder: 3 },
        ],
      },
      {
        questionText: 'Find the SQUARE!',
        sortOrder: 2,
        items: [
          { itemType: 'option', content: '⭕ Circle', isCorrect: false, sortOrder: 1 },
          { itemType: 'option', content: '⬛ Square', isCorrect: true, sortOrder: 2 },
          { itemType: 'option', content: '🔺 Triangle', isCorrect: false, sortOrder: 3 },
        ],
      },
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await ds.initialize();
  console.log('✅ DB connected\n');

  if (RESET) {
    console.log('🗑️  Resetting...');
    await q('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of ['game_items', 'game_questions', 'games', 'progress', 'rewards', 'subscriptions', 'children_profiles']) {
      await q(`DELETE FROM \`${t}\``);
      console.log(`   cleared ${t}`);
    }
    // Remove demo users but keep admin
    await q(`DELETE FROM users WHERE email != 'admin@hoccungbe.com'`);
    await q('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Reset done\n');
  }

  // ── 1. Users ──────────────────────────────────────────────────────────────

  console.log('👤 Seeding users...');
  const userIdMap: Record<string, number> = {};
  for (const u of USERS) {
    const hash = await bcrypt.hash(u.password, 10);
    const id = await insertIfNotExists(
      'users',
      { email: u.email },
      { fullName: u.fullName, email: u.email, passwordHash: hash, role: u.role, status: 'active' },
    );
    userIdMap[u.email] = id;
    console.log(`  ${u.email} → id=${id}`);
  }

  // ── 2. Children ───────────────────────────────────────────────────────────

  console.log('\n👶 Seeding children...');
  const childIdMap: Record<string, number> = {};
  for (const c of CHILDREN) {
    const userId = userIdMap[c.parentEmail];
    if (!userId) continue;
    const id = await insertIfNotExists(
      'children_profiles',
      { userId, fullName: c.fullName },
      {
        userId,
        fullName: c.fullName,
        nickname: c.nickname,
        gender: c.gender,
        age: c.age,
        currentLevel: c.currentLevel,
        interests: JSON.stringify(c.interests),
        status: 'active',
      },
    );
    childIdMap[c.fullName] = id;
    console.log(`  ${c.fullName} → id=${id}`);
  }

  // ── 3. Subscriptions ──────────────────────────────────────────────────────

  console.log('\n💳 Seeding subscriptions...');
  for (const s of SUBSCRIPTION_PLANS) {
    const userId = userIdMap[s.userEmail];
    if (!userId) continue;
    const startDate = new Date(Date.now() - s.daysAgo * 86400000);
    const endDate = new Date(startDate.getTime() + s.durationDays * 86400000);
    const existing = await findOne('subscriptions', { userId, planType: s.planType });
    if (existing) { console.log(`  skip ${s.userEmail} ${s.planType}`); continue; }
    await q(
      `INSERT INTO subscriptions (userId, planName, planType, amount, status, startDate, endDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, s.planName, s.planType, s.amount, s.status, startDate, endDate],
    );
    console.log(`  ${s.userEmail} → ${s.planName} (${s.status})`);
  }

  // ── 4. Games ──────────────────────────────────────────────────────────────

  console.log('\n🎮 Seeding games...');
  for (const g of GAMES) {
    // Find lesson by slug
    const lessons = await q('SELECT id FROM lessons WHERE slug = ? LIMIT 1', [g.lessonSlug]);
    if (!lessons.length) {
      console.log(`  ⚠ lesson "${g.lessonSlug}" not found, skipping`);
      continue;
    }
    const lessonId = lessons[0].id;

    // Check if game already exists
    const existingGame = await q('SELECT id FROM games WHERE lessonId = ? AND title = ? LIMIT 1', [lessonId, g.title]);
    if (existingGame.length) {
      console.log(`  skip game "${g.title}"`);
      continue;
    }

    // Insert game
    const gameRes = await q(
      `INSERT INTO games (lessonId, gameType, title, description, instruction, timeLimit, points, sortOrder, isActive, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, NOW(), NOW())`,
      [lessonId, g.gameType, g.title, g.description, g.instruction, g.timeLimit, g.points],
    );
    const gameId = gameRes.insertId;

    // Insert questions + items
    for (const gq of g.questions) {
      const qRes = await q(
        `INSERT INTO game_questions (gameId, questionText, sortOrder, createdAt, updatedAt)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [gameId, gq.questionText, gq.sortOrder],
      );
      const questionId = qRes.insertId;

      for (const item of gq.items) {
        const configJson = (item as any).configJson ?? null;
        await q(
          `INSERT INTO game_items (questionId, itemType, content, isCorrect, pairId, sortOrder, configJson, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            questionId,
            item.itemType,
            item.content,
            item.isCorrect ?? null,
            item.pairId ?? null,
            item.sortOrder,
            configJson ? JSON.stringify(configJson) : null,
          ],
        );
      }
    }
    console.log(`  ✓ game "${g.title}" → lessonId=${lessonId}, ${g.questions.length} questions`);
  }

  // ── 5. Progress mẫu ───────────────────────────────────────────────────────

  console.log('\n📊 Seeding sample progress...');
  const childKhoa = childIdMap['Nguyễn Minh Khoa'];
  const childTuan = childIdMap['Trần Minh Tuấn'];

  // Lấy vài bài học đầu tiên của khóa toán
  const mathLessons = await q(
    `SELECT l.id, l.courseId FROM lessons l JOIN courses c ON c.id = l.courseId
     WHERE c.slug = 'kham-pha-the-gioi-so' ORDER BY l.sortOrder LIMIT 5`,
  );

  for (const [ci, childId] of [[childKhoa, childKhoa], [childTuan, childTuan]]) {
    if (!childId) continue;
    for (let i = 0; i < mathLessons.length; i++) {
      const ml = mathLessons[i];
      const status = i < 3 ? 'completed' : i === 3 ? 'in_progress' : 'not_started';
      const score = status === 'completed' ? 80 + Math.floor(Math.random() * 20) : status === 'in_progress' ? 50 : 0;
      const existing = await q('SELECT id FROM progress WHERE childId = ? AND lessonId = ?', [childId, ml.id]);
      if (existing.length) continue;
      await q(
        `INSERT INTO progress (childId, courseId, lessonId, status, completionPercent, score, starsEarned, attemptsCount, startedAt, completedAt, lastAccessedAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), NOW(), NOW())`,
        [
          childId, ml.courseId, ml.id, status,
          status === 'completed' ? 100 : status === 'in_progress' ? 60 : 0,
          score,
          status === 'completed' ? 3 : 0,
          status === 'not_started' ? 0 : i + 1,
          status === 'completed' ? new Date() : null,
        ],
      );
    }
    console.log(`  progress for child ${childId}`);
  }

  // ── 6. Rewards mẫu ────────────────────────────────────────────────────────

  console.log('\n🏆 Seeding sample rewards...');
  const rewardDefs = [
    { rewardType: 'star', rewardName: 'Ngôi sao đầu tiên', rewardDescription: 'Hoàn thành bài học đầu tiên', points: 10 },
    { rewardType: 'badge', rewardName: 'Toán thủ nhí', rewardDescription: 'Hoàn thành 3 bài toán liên tiếp', points: 30 },
    { rewardType: 'certificate', rewardName: 'Bé giỏi toán', rewardDescription: 'Hoàn thành khóa học Toán học', points: 100 },
  ];

  if (childKhoa && mathLessons.length) {
    for (const [ri, rd] of rewardDefs.entries()) {
      const existing = await q('SELECT id FROM rewards WHERE childId = ? AND rewardName = ?', [childKhoa, rd.rewardName]);
      if (existing.length) continue;
      await q(
        `INSERT INTO rewards (childId, courseId, lessonId, rewardType, rewardName, rewardDescription, points, awardedAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
        [childKhoa, mathLessons[0].courseId, mathLessons[ri]?.id ?? mathLessons[0].id, rd.rewardType, rd.rewardName, rd.rewardDescription, rd.points],
      );
      console.log(`  ★ ${rd.rewardName}`);
    }
  }

  console.log('\n✅ Seed hoàn tất!');
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
