import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { PuzzlePiece } from './puzzle-piece.entity';

export enum PuzzleType {
  ANIMAL = 'animal',
  FRUIT = 'fruit',
  LETTERS = 'letters',
  NUMBERS = 'numbers',
  MAP = 'map',
  FOOD = 'food',
  VEHICLES = 'vehicles',
  SHAPES = 'shapes',
  COLORS = 'colors',
}

export enum PuzzleDifficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}

@Entity('puzzles')
export class Puzzle extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  lessonId?: number;

  @Column({
    type: 'enum',
    enum: PuzzleType,
    default: PuzzleType.ANIMAL,
  })
  puzzleType: PuzzleType;

  @Column({
    type: 'enum',
    enum: PuzzleDifficulty,
    default: PuzzleDifficulty.NORMAL,
  })
  difficulty: PuzzleDifficulty;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  instruction?: string;

  @Column({ type: 'int', unsigned: true, default: 9 })
  pieceCount: number; // 9, 12, 16, etc.

  @Column({ type: 'int', unsigned: true, nullable: true })
  timeLimit?: number; // seconds

  @Column({ type: 'int', unsigned: true, default: 10 })
  points: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  configJson?: Record<string, unknown>; // theme, colors, etc.

  @ManyToOne(() => Lesson, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'lessonId' })
  lesson?: Lesson;

  @OneToMany(() => PuzzlePiece, (piece) => piece.puzzle, { cascade: true })
  pieces: PuzzlePiece[];
}
