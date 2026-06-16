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
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: false,
});

async function seedPuzzles() {
  try {
    await ds.initialize();
    console.log('✅ Connected to database');

    // Clear existing data
    await ds.query('DELETE FROM puzzle_pieces');
    await ds.query('DELETE FROM puzzles');
    console.log('✅ Cleared old data');

    // Insert puzzles
    const puzzles = [
      // Easy Level Puzzles
      {
        title: 'Số 1-9',
        description: 'Ghép các số từ 1 đến 9',
        instruction: 'Kéo các mảnh số để sắp xếp theo thứ tự từ 1 đến 9',
        puzzleType: 'numbers',
        difficulty: 'easy',
        pieceCount: 9,
        points: 10,
      },
      {
        title: 'Chữ cái A-C',
        description: 'Ghép chữ cái A, B, C',
        instruction: 'Kéo các mảnh chữ cái để tạo từ ABC',
        puzzleType: 'letters',
        difficulty: 'easy',
        pieceCount: 3,
        points: 8,
      },
      {
        title: 'Màu sắc cơ bản',
        description: 'Ghép các màu sắc cơ bản',
        instruction: 'Kéo các mảnh màu để hoàn thành bảng màu',
        puzzleType: 'colors',
        difficulty: 'easy',
        pieceCount: 9,
        points: 10,
      },

      // Normal Level Puzzles
      {
        title: 'Con sư tử',
        description: 'Ghép ảnh con sư tử hoang dã',
        instruction: 'Kéo các mảnh hình để ghép thành con sư tử hoàn chỉnh',
        puzzleType: 'animal',
        difficulty: 'normal',
        pieceCount: 9,
        points: 15,
      },
      {
        title: 'Trái cây tươi',
        description: 'Ghép ảnh trái cây',
        instruction: 'Kéo các mảnh hình để ghép thành trái cây hoàn chỉnh',
        puzzleType: 'fruit',
        difficulty: 'normal',
        pieceCount: 9,
        points: 15,
      },
      {
        title: 'Đồ ăn ngon lành',
        description: 'Ghép ảnh các loại đồ ăn',
        instruction: 'Kéo các mảnh hình để ghép thành các loại đồ ăn',
        puzzleType: 'food',
        difficulty: 'normal',
        pieceCount: 9,
        points: 15,
      },
      {
        title: 'Hình dạng cơ bản',
        description: 'Ghép các hình dạng hình học',
        instruction: 'Kéo các mảnh để tạo các hình dạng hoàn chỉnh',
        puzzleType: 'shapes',
        difficulty: 'normal',
        pieceCount: 9,
        points: 15,
      },

      // Hard Level Puzzles
      {
        title: 'Bản đồ Việt Nam',
        description: 'Ghép bản đồ Việt Nam',
        instruction: 'Kéo các mảnh để tạo bản đồ Việt Nam hoàn chỉnh',
        puzzleType: 'map',
        difficulty: 'hard',
        pieceCount: 12,
        points: 25,
      },
      {
        title: 'Phương tiện giao thông',
        description: 'Ghép ảnh các phương tiện giao thông',
        instruction: 'Kéo các mảnh hình để ghép thành các phương tiện',
        puzzleType: 'vehicles',
        difficulty: 'hard',
        pieceCount: 9,
        points: 20,
      },
    ];

    for (const puzzle of puzzles) {
      const insertResult = await ds.query(
        `INSERT INTO puzzles (title, description, instruction, puzzleType, difficulty, pieceCount, points, sortOrder, isActive, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, true, NOW(), NOW())`,
        [puzzle.title, puzzle.description, puzzle.instruction, puzzle.puzzleType, puzzle.difficulty, puzzle.pieceCount, puzzle.points, 1],
      );

      const puzzleId = insertResult.insertId;

      // Add pieces for this puzzle
      const pieceCount = puzzle.pieceCount;
      let content = '';
      let display = '';

      if (puzzle.puzzleType === 'numbers') {
        for (let i = 1; i <= pieceCount; i++) {
          content = String(i);
          display = String(i);
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i - 1, content, display, i - 1],
          );
        }
      } else if (puzzle.puzzleType === 'letters') {
        const letters = puzzle.title.includes('A-C') ? 'ABC' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const letterArray = letters.split('').slice(0, pieceCount);
        for (let i = 0; i < letterArray.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, letterArray[i], letterArray[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'colors') {
        const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚪', '⚫'];
        for (let i = 0; i < pieceCount && i < colors.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, colors[i], colors[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'animal') {
        const animals = ['🦁', '🦁', '🦁', '🦁', '🦁', '🦁', '🦁', '🦁', '🦁'];
        for (let i = 0; i < pieceCount && i < animals.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, animals[i], animals[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'fruit') {
        const fruits = ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎'];
        for (let i = 0; i < pieceCount && i < fruits.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, fruits[i], fruits[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'food') {
        const foods = ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕', '🍕', '🍕', '🍕'];
        for (let i = 0; i < pieceCount && i < foods.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, foods[i], foods[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'shapes') {
        const shapes = ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'];
        for (let i = 0; i < pieceCount && i < shapes.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, shapes[i], shapes[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'map') {
        const regions = ['🏔️', '🏔️', '🏔️', '🌾', '🇻🇳', '🏖️', '🌴', '🌴', '🏝️', '🏔️', '🏔️', '🌴'];
        for (let i = 0; i < pieceCount && i < regions.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, regions[i], regions[i], i],
          );
        }
      } else if (puzzle.puzzleType === 'vehicles') {
        const vehicles = ['🚗', '🚗', '🚗', '🚗', '🚗', '🚗', '🚗', '🚗', '🚗'];
        for (let i = 0; i < pieceCount && i < vehicles.length; i++) {
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, vehicles[i], vehicles[i], i],
          );
        }
      } else {
        for (let i = 0; i < pieceCount; i++) {
          content = `Part ${i + 1}`;
          display = `Phần ${i + 1}`;
          await ds.query(
            `INSERT INTO puzzle_pieces (puzzleId, position, content, display, sortOrder, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [puzzleId, i, content, display, i],
          );
        }
      }
    }

    console.log('✨ All puzzles seeded successfully!');
    console.log('✅ 9 puzzles created:');
    console.log('');
    console.log('📊 Easy Level (3):');
    console.log('  1. Số 1-9 (Numbers) - 9 pieces - 10 pts');
    console.log('  2. Chữ cái A-C (Letters) - 3 pieces - 8 pts');
    console.log('  3. Màu sắc cơ bản (Colors) - 9 pieces - 10 pts');
    console.log('');
    console.log('⭐ Normal Level (4):');
    console.log('  4. Con sư tử (Animals) - 9 pieces - 15 pts');
    console.log('  5. Trái cây tươi (Fruits) - 9 pieces - 15 pts');
    console.log('  6. Đồ ăn ngon lành (Food) - 9 pieces - 15 pts');
    console.log('  7. Hình dạng cơ bản (Shapes) - 9 pieces - 15 pts');
    console.log('');
    console.log('🏆 Hard Level (2):');
    console.log('  8. Bản đồ Việt Nam (Map) - 12 pieces - 25 pts');
    console.log('  9. Phương tiện giao thông (Vehicles) - 9 pieces - 20 pts');

    await ds.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await ds.destroy();
    process.exit(1);
  }
}

seedPuzzles();
