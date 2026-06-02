import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Puzzle } from './puzzle.entity';
import { User } from '../../users/entities/user.entity';

@Entity('puzzle_progress')
@Index(['userId', 'puzzleId'], { unique: false })
export class PuzzleProgress extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  puzzleId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  attemptCount: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  completedCount: number; // number of times completed

  @Column({ type: 'int', unsigned: true, default: 0 })
  bestTime?: number; // seconds

  @Column({ type: 'int', unsigned: true, default: 0 })
  pointsEarned: number;

  @Column({ type: 'datetime', nullable: true })
  lastPlayedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  firstCompletedAt?: Date;

  @Column({ type: 'json', nullable: true })
  placedPieces?: string[]; // array of piece IDs already placed

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Puzzle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'puzzleId' })
  puzzle: Puzzle;
}
