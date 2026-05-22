import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameLesson } from './game-lesson.entity';

export enum QuestionType {
  MATRIX = 'matrix',
  PATTERN = 'pattern',
  MAZE = 'maze',
  SPOT_DIFF = 'spot_diff',
  CONNECT = 'connect',
  COLOR_FILL = 'color_fill',
}

// ── Data shapes ──────────────────────────────────────────────────────────────

export type MatrixData = {
  gridSize: number;        // 2 | 3 | 4
  theme: string;           // fruit | animal | color | shape
  grid: (string | null)[][]; // rows × cols, null = empty cell
  emptyPos: [number, number]; // [row, col]
  answer: string;
  options: string[];
  hint?: string;
};

export type PatternData = {
  sequence: (string | null)[];
  emptyPos: number;
  patternRule: string;     // alternate | repeat3 | grow
  answer: string;
  options: string[];
  hint?: string;
};

export type SpotDiffData = {
  gridSize: number;
  imageA: string[][];
  imageB: string[][];
  differences: { row: number; col: number }[];
  totalDiff: number;
};

export type ConnectData = {
  pairs: { left: string; right: string }[];
  leftItems: string[];
  rightItems: string[];
  hint?: string;
};

export type MazeData = {
  grid: number[][];        // 0 = path, 1 = wall
  start: [number, number];
  end: [number, number];
  character: string;
  goal: string;
  hint?: string;
};

export type QuestionData = MatrixData | PatternData | SpotDiffData | ConnectData | MazeData;

// ─────────────────────────────────────────────────────────────────────────────

@Entity('play_game_questions')
export class GameQuestion {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @ManyToOne(() => GameLesson, (l) => l.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: GameLesson;

  @Column({ type: 'int', default: 1 })
  sortOrder: number;

  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MATRIX })
  type: QuestionType;

  @Column({ type: 'json' })
  data: QuestionData;
}
