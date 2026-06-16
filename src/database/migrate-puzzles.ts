/**
 * Migration: Create Puzzle Tables
 *
 * Creates:
 *   1. puzzles table
 *   2. puzzle_pieces table
 *   3. puzzle_progress table
 *   4. Indexes for performance
 *
 * Run: npm run db:migrate -- migrate-puzzles
 */

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

async function createTables() {
  try {
    await ds.initialize();
    console.log('✅ Connected to database');

    // Drop existing tables
    await ds.query('SET FOREIGN_KEY_CHECKS=0');
    await ds.query('DROP TABLE IF EXISTS puzzle_leaderboards');
    await ds.query('DROP TABLE IF EXISTS puzzle_progress');
    await ds.query('DROP TABLE IF EXISTS puzzle_pieces');
    await ds.query('DROP TABLE IF EXISTS puzzles');
    await ds.query('SET FOREIGN_KEY_CHECKS=1');
    console.log('✅ Cleaned up old tables');

    // Create puzzles table
    await ds.query(`
      CREATE TABLE IF NOT EXISTS \`puzzles\` (
        \`id\` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        \`lessonId\` int unsigned,
        \`puzzleType\` enum('animal','fruit','letters','numbers','map','food','vehicles','shapes','colors') DEFAULT 'animal',
        \`difficulty\` enum('easy','normal','hard') DEFAULT 'normal',
        \`title\` varchar(255) NOT NULL,
        \`description\` text,
        \`instruction\` text,
        \`pieceCount\` int unsigned DEFAULT 9,
        \`timeLimit\` int unsigned,
        \`points\` int unsigned DEFAULT 10,
        \`sortOrder\` int unsigned DEFAULT 1,
        \`isActive\` boolean DEFAULT true,
        \`configJson\` json,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`lessonId\`) REFERENCES \`lessons\`(\`id\`) ON DELETE SET NULL,
        INDEX idx_lesson (lessonId),
        INDEX idx_type (puzzleType),
        INDEX idx_difficulty (difficulty),
        INDEX idx_active (isActive)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created puzzles table');

    // Create puzzle_pieces table
    await ds.query(`
      CREATE TABLE IF NOT EXISTS \`puzzle_pieces\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        \`puzzleId\` int unsigned NOT NULL,
        \`position\` int unsigned NOT NULL,
        \`content\` varchar(500),
        \`display\` varchar(100),
        \`imageUrl\` varchar(500),
        \`sortOrder\` int unsigned DEFAULT 1,
        \`configJson\` json,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`puzzleId\`) REFERENCES \`puzzles\`(\`id\`) ON DELETE CASCADE,
        INDEX idx_puzzle (puzzleId),
        INDEX idx_position (position),
        UNIQUE KEY unique_puzzle_position (\`puzzleId\`, \`position\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created puzzle_pieces table');

    // Create puzzle_progress table
    await ds.query(`
      CREATE TABLE IF NOT EXISTS \`puzzle_progress\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        \`userId\` int unsigned NOT NULL,
        \`puzzleId\` int unsigned NOT NULL,
        \`attemptCount\` int unsigned DEFAULT 0,
        \`completedCount\` int unsigned DEFAULT 0,
        \`bestTime\` int unsigned DEFAULT 0,
        \`pointsEarned\` int unsigned DEFAULT 0,
        \`lastPlayedAt\` datetime,
        \`firstCompletedAt\` datetime,
        \`placedPieces\` json,
        \`isCompleted\` boolean DEFAULT false,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`puzzleId\`) REFERENCES \`puzzles\`(\`id\`) ON DELETE CASCADE,
        UNIQUE KEY unique_user_puzzle (\`userId\`, \`puzzleId\`),
        INDEX idx_user (userId),
        INDEX idx_puzzle (puzzleId),
        INDEX idx_completed (isCompleted),
        INDEX idx_last_played (lastPlayedAt)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created puzzle_progress table');

    // Create puzzle_leaderboards table
    await ds.query(`
      CREATE TABLE IF NOT EXISTS \`puzzle_leaderboards\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
        \`userId\` int unsigned NOT NULL,
        \`puzzleId\` int unsigned NOT NULL,
        \`pointsEarned\` int unsigned DEFAULT 0,
        \`bestTime\` int unsigned DEFAULT 0,
        \`completedCount\` int unsigned DEFAULT 0,
        \`totalAttempts\` int unsigned DEFAULT 0,
        \`firstCompletedAt\` datetime,
        \`lastCompletedAt\` datetime,
        \`successRate\` decimal(5, 2) DEFAULT 0,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`puzzleId\`) REFERENCES \`puzzles\`(\`id\`) ON DELETE CASCADE,
        UNIQUE KEY unique_user_puzzle_lb (\`userId\`, \`puzzleId\`),
        INDEX idx_leaderboard_score (puzzleId, pointsEarned),
        INDEX idx_leaderboard_time (puzzleId, bestTime),
        INDEX idx_leaderboard_completed (puzzleId, completedCount),
        INDEX idx_user (userId),
        INDEX idx_puzzle (puzzleId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created puzzle_leaderboards table');

    console.log('\n✨ All puzzle tables created successfully!');
    await ds.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    await ds.destroy();
    process.exit(1);
  }
}

createTables();
