import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
  synchronize: true,
});

// ─── Puzzle generators ────────────────────────────────────────────────────────

type Grid2 = (string | null)[][];

function makeMatrix2Puzzle(items: string[], variant: number): object {
  const [a, b] = items;
  // 4 valid 2×2 latin squares using 2 symbols, varied by emptyPos
  const grids: Grid2[] = [
    [[null, a], [a, b]],  // answer: b
    [[a, null], [b, a]],  // answer: b — wait, need valid latin square
    [[a, b], [null, a]],  // answer: b
    [[b, a], [a, null]],  // answer: b
  ];
  // All valid 2×2 latin squares (each row+col has both symbols)
  const validGrids: { grid: Grid2; emptyPos: [number, number]; answer: string }[] = [
    { grid: [[null, a], [a, b]], emptyPos: [0, 0], answer: b },
    { grid: [[a, null], [b, a]], emptyPos: [0, 1], answer: b },
    { grid: [[a, b], [null, b]], emptyPos: [1, 0], answer: b },  // invalid, fix:
    { grid: [[b, a], [a, null]], emptyPos: [1, 1], answer: b },
  ];
  // Actually let's compute properly
  // Full valid grids with 2 items:
  const full: Grid2[] = [
    [[a, b], [b, a]],
    [[b, a], [a, b]],
  ];
  const positions: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const v = variant % (full.length * positions.length);
  const gridIdx = Math.floor(v / positions.length);
  const posIdx = v % positions.length;
  const chosenGrid = full[gridIdx].map((r) => [...r]) as Grid2;
  const [er, ec] = positions[posIdx];
  const ans = chosenGrid[er][ec] as string;
  chosenGrid[er][ec] = null;
  return {
    gridSize: 2,
    theme: 'custom',
    grid: chosenGrid,
    emptyPos: [er, ec],
    answer: ans,
    options: shuffleArr([...items]),
    hint: `Mỗi hàng và cột phải có đủ ${items.length} hình khác nhau!`,
  };
}

function makeMatrix3Puzzle(items: string[], variant: number): object {
  // Generate a valid 3×3 latin square
  const base = [0, 1, 2];
  const offsets = [
    [0, 1, 2], [1, 2, 0], [2, 0, 1],
    [0, 2, 1], [2, 1, 0], [1, 0, 2],
  ];
  const off = offsets[variant % offsets.length];
  const fullGrid: string[][] = base.map((r) =>
    base.map((c) => items[(r + off[c]) % 3]),
  );
  const positions: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) positions.push([r, c]);
  const [er, ec] = positions[variant % positions.length];
  const ans = fullGrid[er][ec];
  const grid: Grid2 = fullGrid.map((r) => [...r]);
  grid[er][ec] = null;
  return {
    gridSize: 3,
    theme: 'custom',
    grid,
    emptyPos: [er, ec],
    answer: ans,
    options: shuffleArr([...items]),
    hint: `Mỗi hàng và cột phải có đủ ${items.length} hình khác nhau!`,
  };
}

function makePatternPuzzle(items: string[], patternLen: number, variant: number): object {
  // Alternating pattern: A B A B A ?
  const seq: string[] = [];
  for (let i = 0; i < patternLen; i++) seq.push(items[i % items.length]);
  const answer = items[patternLen % items.length];
  const sequence = [...seq, null];
  return {
    sequence,
    emptyPos: patternLen,
    patternRule: items.length === 2 ? 'alternate' : 'repeat3',
    answer,
    options: shuffleArr([...items]),
    hint: `Tìm quy luật lặp lại trong dãy hình!`,
  };
}

function makeConnectPuzzle(pairs: { left: string; right: string }[]): object {
  return {
    pairs,
    leftItems: pairs.map((p) => p.left),
    rightItems: shuffleArr(pairs.map((p) => p.right)),
    hint: 'Nối từng hình bên trái với hình tương ứng bên phải!',
  };
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Theme item sets ──────────────────────────────────────────────────────────

const THEMES: Record<string, string[][]> = {
  fruit2:   [['🍎', '🍌'], ['🍊', '🍇'], ['🍓', '🍑'], ['🍒', '🥝'], ['🫐', '🍈']],
  fruit3:   [['🍎', '🍌', '🍊'], ['🍇', '🍓', '🍑'], ['🍒', '🥝', '🫐']],
  animal2:  [['🐱', '🐶'], ['🐸', '🐰'], ['🐼', '🦊'], ['🐨', '🐯']],
  animal3:  [['🐱', '🐶', '🐸'], ['🐰', '🐼', '🦊'], ['🦁', '🐻', '🐯']],
  color2:   [['🔴', '🔵'], ['🟡', '🟢'], ['🟠', '🟣'], ['⚪', '⚫']],
  color3:   [['🔴', '🔵', '🟡'], ['🟢', '🟠', '🟣'], ['🔴', '🟢', '🔵']],
  shape2:   [['⭐', '❤️'], ['🔶', '🔷'], ['⬛', '⬜'], ['🔺', '🔻']],
  shape3:   [['⭐', '❤️', '🔶'], ['🔷', '⬛', '⬜'], ['🔺', '🔻', '⭕']],
  veggie2:  [['🥕', '🥦'], ['🌽', '🍆'], ['🥔', '🧅'], ['🫑', '🥒']],
  vehicle2: [['🚗', '✈️'], ['🚢', '🚂'], ['🚁', '🚲'], ['🛸', '🚀']],
  math2:    [['1️⃣', '2️⃣'], ['3️⃣', '4️⃣'], ['5️⃣', '6️⃣'], ['7️⃣', '8️⃣']],
  math3:    [['1️⃣', '2️⃣', '3️⃣'], ['4️⃣', '5️⃣', '6️⃣'], ['7️⃣', '8️⃣', '9️⃣']],
};

// ─── Data definitions ─────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    name: 'Tư Duy', slug: 'tu-duy', emoji: '🧩', color: '#7C3AED',
    description: 'Phát triển tư duy logic, nhận biết quy luật và giải quyết vấn đề',
  },
  {
    name: 'Toán Học', slug: 'toan-hoc', emoji: '🔢', color: '#2563EB',
    description: 'Học số, đếm, cộng trừ, hình học qua trò chơi thú vị',
  },
  {
    name: 'Mỹ Thuật', slug: 'my-thuat', emoji: '🎨', color: '#EC4899',
    description: 'Sáng tạo qua màu sắc, hình dạng và nghệ thuật',
  },
  {
    name: 'Ngôn Ngữ', slug: 'ngon-ngu', emoji: '📖', color: '#059669',
    description: 'Học chữ cái, vần, từ vựng tiếng Việt',
  },
];

const TOPICS_MAP: Record<string, object[]> = {
  'tu-duy': [
    { name: 'Sudoku', slug: 'tu-duy-sudoku', emoji: '🔲', gameType: 'matrix',
      description: 'Điền hình vào ô trống sao cho mỗi hàng và cột không trùng nhau', sortOrder: 1 },
    { name: 'Quy Luật', slug: 'tu-duy-quy-luat', emoji: '🔄', gameType: 'pattern',
      description: 'Tìm quy luật trong dãy hình và điền vào ô còn thiếu', sortOrder: 2 },
    { name: 'Nối Điểm', slug: 'tu-duy-noi-diem', emoji: '🔗', gameType: 'connect',
      description: 'Nối các cặp hình ảnh phù hợp với nhau', sortOrder: 3 },
    { name: 'Điểm Khác Biệt', slug: 'tu-duy-diem-khac', emoji: '🔍', gameType: 'spot_diff',
      description: 'Tìm điểm khác nhau giữa hai hình ảnh', sortOrder: 4 },
    { name: 'Mê Cung', slug: 'tu-duy-me-cung', emoji: '🗺️', gameType: 'maze',
      description: 'Giúp nhân vật tìm đường thoát khỏi mê cung', sortOrder: 5 },
  ],
  'toan-hoc': [
    { name: 'Đếm Số', slug: 'toan-dem-so', emoji: '🔢', gameType: 'matrix',
      description: 'Nhận biết và đếm số lượng qua hình ảnh', sortOrder: 1 },
    { name: 'Cộng Trừ', slug: 'toan-cong-tru', emoji: '➕', gameType: 'pattern',
      description: 'Luyện phép cộng trừ cơ bản qua trò chơi', sortOrder: 2 },
    { name: 'Ghép Số', slug: 'toan-ghep-so', emoji: '🔗', gameType: 'connect',
      description: 'Nối số với số lượng đồ vật tương ứng', sortOrder: 3 },
    { name: 'Hình Học', slug: 'toan-hinh-hoc', emoji: '🔺', gameType: 'matrix',
      description: 'Nhận biết và phân loại các hình dạng', sortOrder: 4 },
  ],
};

// Levels config for each topic
const LEVELS_MAP: Record<string, object[]> = {
  'tu-duy-sudoku': [
    { name: 'Làm quen 2×2', slug: 'sudoku-2x2', color: '#F97316', difficulty: 'beginner', gridSize: 2, theme: 'fruit', sortOrder: 1 },
    { name: 'Sudoku Hình 3×3', slug: 'sudoku-3x3-hinh', color: '#7C3AED', difficulty: 'easy', gridSize: 3, theme: 'animal', sortOrder: 2, locked: true },
    { name: 'Sudoku Màu Sắc', slug: 'sudoku-mau-sac', color: '#2563EB', difficulty: 'medium', gridSize: 3, theme: 'color', sortOrder: 3, locked: true },
    { name: 'Sudoku Con Vật', slug: 'sudoku-con-vat', color: '#059669', difficulty: 'hard', gridSize: 3, theme: 'animal', sortOrder: 4, locked: true },
  ],
  'tu-duy-quy-luat': [
    { name: 'Quy Luật 2 Hình', slug: 'quy-luat-2-hinh', color: '#F97316', difficulty: 'beginner', gridSize: 0, theme: 'color', sortOrder: 1 },
    { name: 'Quy Luật 3 Hình', slug: 'quy-luat-3-hinh', color: '#7C3AED', difficulty: 'easy', gridSize: 0, theme: 'shape', sortOrder: 2, locked: true },
    { name: 'Quy Luật Nâng Cao', slug: 'quy-luat-nang-cao', color: '#2563EB', difficulty: 'medium', gridSize: 0, theme: 'animal', sortOrder: 3, locked: true },
  ],
  'tu-duy-noi-diem': [
    { name: 'Nối Đơn Giản', slug: 'noi-don-gian', color: '#F97316', difficulty: 'beginner', gridSize: 0, theme: 'animal', sortOrder: 1 },
    { name: 'Nối Nâng Cao', slug: 'noi-nang-cao', color: '#7C3AED', difficulty: 'easy', gridSize: 0, theme: 'mixed', sortOrder: 2, locked: true },
  ],
  'tu-duy-diem-khac': [
    { name: 'Tìm 1 Điểm Khác', slug: 'tim-1-diem', color: '#F97316', difficulty: 'beginner', gridSize: 3, theme: 'animal', sortOrder: 1 },
    { name: 'Tìm 2-3 Điểm Khác', slug: 'tim-2-3-diem', color: '#7C3AED', difficulty: 'easy', gridSize: 4, theme: 'fruit', sortOrder: 2, locked: true },
  ],
  'tu-duy-me-cung': [
    { name: 'Mê Cung Nhỏ', slug: 'me-cung-nho', color: '#F97316', difficulty: 'beginner', gridSize: 4, theme: 'animal', sortOrder: 1 },
    { name: 'Mê Cung Vừa', slug: 'me-cung-vua', color: '#7C3AED', difficulty: 'easy', gridSize: 6, theme: 'animal', sortOrder: 2, locked: true },
  ],
  'toan-dem-so': [
    { name: 'Đếm 1-5', slug: 'dem-1-5', color: '#F97316', difficulty: 'beginner', gridSize: 2, theme: 'fruit', sortOrder: 1 },
    { name: 'Đếm 6-10', slug: 'dem-6-10', color: '#7C3AED', difficulty: 'easy', gridSize: 3, theme: 'animal', sortOrder: 2, locked: true },
  ],
  'toan-cong-tru': [
    { name: 'Cộng trong 5', slug: 'cong-trong-5', color: '#F97316', difficulty: 'beginner', gridSize: 0, theme: 'fruit', sortOrder: 1 },
    { name: 'Cộng trong 10', slug: 'cong-trong-10', color: '#7C3AED', difficulty: 'easy', gridSize: 0, theme: 'math', sortOrder: 2, locked: true },
  ],
  'toan-ghep-so': [
    { name: 'Ghép 1-5', slug: 'ghep-1-5', color: '#F97316', difficulty: 'beginner', gridSize: 0, theme: 'math', sortOrder: 1 },
    { name: 'Ghép 1-10', slug: 'ghep-1-10', color: '#7C3AED', difficulty: 'easy', gridSize: 0, theme: 'math', sortOrder: 2, locked: true },
  ],
  'toan-hinh-hoc': [
    { name: 'Hình Cơ Bản', slug: 'hinh-co-ban', color: '#F97316', difficulty: 'beginner', gridSize: 2, theme: 'shape', sortOrder: 1 },
    { name: 'Hình Nâng Cao', slug: 'hinh-nang-cao', color: '#7C3AED', difficulty: 'easy', gridSize: 3, theme: 'shape', sortOrder: 2, locked: true },
  ],
};

// ─── Question generators per topic ───────────────────────────────────────────

function genQuestionsForLevel(topicSlug: string, level: any, lessonIdx: number): object[] {
  const gt = (level as any).gameType || 'matrix';
  const questions: object[] = [];

  if (gt === 'matrix' || topicSlug.includes('sudoku') || topicSlug.includes('hinh-hoc') || topicSlug.includes('dem')) {
    const gs = level.gridSize || 2;
    const themeKey = `${level.theme}${gs}`;
    const themeItems = THEMES[themeKey] || THEMES['fruit2'];
    const itemSet = themeItems[lessonIdx % themeItems.length];

    for (let q = 0; q < 6; q++) {
      const data = gs === 2
        ? makeMatrix2Puzzle(itemSet, lessonIdx * 6 + q)
        : makeMatrix3Puzzle(itemSet, lessonIdx * 6 + q);
      questions.push({ type: 'matrix', sortOrder: q + 1, data });
    }
  } else if (gt === 'pattern' || topicSlug.includes('quy-luat') || topicSlug.includes('cong-tru')) {
    const themeKey = `${level.theme}2`;
    const themeItems = THEMES[themeKey] || THEMES['color2'];
    const itemSet = themeItems[lessonIdx % themeItems.length];
    for (let q = 0; q < 6; q++) {
      const seqLen = 4 + (lessonIdx % 3);
      const data = makePatternPuzzle(itemSet, seqLen + q, lessonIdx + q);
      questions.push({ type: 'pattern', sortOrder: q + 1, data });
    }
  } else if (gt === 'connect' || topicSlug.includes('noi') || topicSlug.includes('ghep')) {
    const pairSets: { left: string; right: string }[][] = [
      [{ left: '🐱', right: 'Mèo' }, { left: '🐶', right: 'Chó' }, { left: '🐸', right: 'Ếch' }],
      [{ left: '🍎', right: 'Táo' }, { left: '🍌', right: 'Chuối' }, { left: '🍊', right: 'Cam' }],
      [{ left: '1️⃣', right: '🍎' }, { left: '2️⃣', right: '🍎🍎' }, { left: '3️⃣', right: '🍎🍎🍎' }],
      [{ left: '🔴', right: 'Đỏ' }, { left: '🔵', right: 'Xanh' }, { left: '🟡', right: 'Vàng' }],
      [{ left: '⬛', right: 'Vuông' }, { left: '🔺', right: 'Tam giác' }, { left: '⭕', right: 'Tròn' }],
    ];
    for (let q = 0; q < 5; q++) {
      const pairs = pairSets[(lessonIdx + q) % pairSets.length];
      questions.push({ type: 'connect', sortOrder: q + 1, data: makeConnectPuzzle(pairs) });
    }
  } else if (gt === 'spot_diff') {
    const animals3 = ['🐱', '🐶', '🐸', '🐰', '🦊', '🐼', '🐯', '🦁', '🐻'];
    for (let q = 0; q < 4; q++) {
      const gs = 3;
      const all = shuffleArr([...animals3]).slice(0, gs * gs);
      const imageA: string[][] = [];
      for (let r = 0; r < gs; r++) imageA.push(all.slice(r * gs, (r + 1) * gs));
      const imageB = imageA.map((r) => [...r]);
      const diffR = (lessonIdx + q) % gs;
      const diffC = (lessonIdx + q + 1) % gs;
      const pool = animals3.filter((x) => x !== imageA[diffR][diffC]);
      imageB[diffR][diffC] = pool[(lessonIdx + q) % pool.length];
      questions.push({
        type: 'spot_diff',
        sortOrder: q + 1,
        data: { gridSize: gs, imageA, imageB, differences: [{ row: diffR, col: diffC }], totalDiff: 1 },
      });
    }
  } else if (gt === 'maze') {
    // Simple 4×4 mazes
    const mazes = [
      { grid: [[0,0,1,0],[1,0,1,0],[1,0,0,0],[1,1,0,0]], start:[0,0] as [number,number], end:[3,3] as [number,number] },
      { grid: [[0,0,0,1],[0,1,0,0],[0,1,1,0],[0,0,0,0]], start:[0,0] as [number,number], end:[3,3] as [number,number] },
      { grid: [[0,1,0,0],[0,0,0,1],[1,1,0,1],[0,0,0,0]], start:[0,0] as [number,number], end:[3,3] as [number,number] },
    ];
    for (let q = 0; q < 3; q++) {
      const m = mazes[(lessonIdx + q) % mazes.length];
      questions.push({
        type: 'maze',
        sortOrder: q + 1,
        data: { ...m, character: '🐰', goal: '🥕', hint: 'Giúp thỏ tìm đường đến củ cà rốt!' },
      });
    }
  }

  return questions;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await ds.initialize();
  console.log('✅ Connected.\n');
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    if (RESET) {
      console.log('🗑️  Clearing play tables...');
      await qr.query('SET FOREIGN_KEY_CHECKS = 0');
      await qr.query('TRUNCATE TABLE play_game_questions');
      await qr.query('TRUNCATE TABLE play_game_lessons');
      await qr.query('TRUNCATE TABLE play_levels');
      await qr.query('TRUNCATE TABLE play_topics');
      await qr.query('TRUNCATE TABLE play_subjects');
      await qr.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('✅ Cleared.\n');
    }

    for (const sub of SUBJECTS) {
      const existing = await qr.query('SELECT id FROM play_subjects WHERE slug = ?', [sub.slug]);
      let subjectId: number;
      if (existing.length > 0) {
        subjectId = existing[0].id;
        console.log(`[skip subject] ${sub.name}`);
      } else {
        await qr.query(
          `INSERT INTO play_subjects (name, slug, emoji, color, description, sortOrder, isActive) VALUES (?,?,?,?,?,?,1)`,
          [sub.name, sub.slug, sub.emoji, sub.color, sub.description, SUBJECTS.indexOf(sub)],
        );
        const [{ id }] = await qr.query('SELECT LAST_INSERT_ID() as id');
        subjectId = id;
        console.log(`[✓ subject] ${sub.name} #${subjectId}`);
      }

      const topics = TOPICS_MAP[sub.slug] || [];
      for (const top of topics as any[]) {
        const topExist = await qr.query('SELECT id FROM play_topics WHERE slug = ?', [top.slug]);
        let topicId: number;
        if (topExist.length > 0) {
          topicId = topExist[0].id;
        } else {
          await qr.query(
            `INSERT INTO play_topics (subjectId, name, slug, emoji, gameType, description, sortOrder, isActive) VALUES (?,?,?,?,?,?,?,1)`,
            [subjectId, top.name, top.slug, top.emoji, top.gameType, top.description, top.sortOrder],
          );
          const [{ id }] = await qr.query('SELECT LAST_INSERT_ID() as id');
          topicId = id;
          console.log(`  [✓ topic] ${top.name} #${topicId}`);
        }

        const levels = LEVELS_MAP[top.slug] || [];
        let prevLevelId: number | null = null;
        for (const lev of levels as any[]) {
          const levExist = await qr.query('SELECT id FROM play_levels WHERE slug = ?', [lev.slug]);
          let levelId: number;
          if (levExist.length > 0) {
            levelId = levExist[0].id;
          } else {
            const reqId = lev.locked ? prevLevelId : null;
            await qr.query(
              `INSERT INTO play_levels (topicId, name, slug, color, difficulty, gridSize, theme, sortOrder, requiredLevelId, isActive)
               VALUES (?,?,?,?,?,?,?,?,?,1)`,
              [topicId, lev.name, lev.slug, lev.color, lev.difficulty, lev.gridSize || 0, lev.theme, lev.sortOrder, reqId],
            );
            const [{ id }] = await qr.query('SELECT LAST_INSERT_ID() as id');
            levelId = id;
            console.log(`    [✓ level] ${lev.name} #${levelId} ${lev.locked ? '🔒' : '🔓'}`);
          }
          prevLevelId = levelId;

          // Create 4 lessons per level
          const lessonCount = await qr.query('SELECT COUNT(*) as c FROM play_game_lessons WHERE levelId = ?', [levelId]);
          if (lessonCount[0].c > 0) continue;

          const lessonIcons = ['❓', '🧩', '⚡', '🏆'];
          for (let li = 0; li < 4; li++) {
            await qr.query(
              `INSERT INTO play_game_lessons (levelId, sortOrder, title, icon, timeLimit, passingScore) VALUES (?,?,?,?,?,?)`,
              [levelId, li + 1, `Bài ${li + 1}`, lessonIcons[li], 0, 80],
            );
            const [{ id: lessonId }] = await qr.query('SELECT LAST_INSERT_ID() as id');

            const mergedLevel = { ...lev, gameType: top.gameType };
            const questions = genQuestionsForLevel(top.slug, mergedLevel, li);
            for (const q of questions as any[]) {
              await qr.query(
                `INSERT INTO play_game_questions (lessonId, sortOrder, type, data) VALUES (?,?,?,?)`,
                [lessonId, q.sortOrder, q.type, JSON.stringify(q.data)],
              );
            }
            console.log(`      [✓ lesson] Bài ${li + 1} → ${questions.length} câu`);
          }
        }
      }
    }

    console.log('\n✅ Done! Play data seeded.');
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
