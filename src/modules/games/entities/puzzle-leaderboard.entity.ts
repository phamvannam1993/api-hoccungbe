import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Puzzle } from './puzzle.entity';
import { User } from '../../users/entities/user.entity';

@Entity('puzzle_leaderboards')
@Index('idx_leaderboard_score', ['puzzleId', 'pointsEarned'])
@Index('idx_leaderboard_time', ['puzzleId', 'bestTime'])
@Index('idx_leaderboard_completed', ['puzzleId', 'completedCount'])
export class PuzzleLeaderboard extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  puzzleId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  pointsEarned: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  bestTime?: number; // seconds

  @Column({ type: 'int', unsigned: true, default: 0 })
  completedCount: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalAttempts: number;

  @Column({ type: 'datetime' })
  firstCompletedAt: Date;

  @Column({ type: 'datetime' })
  lastCompletedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  successRate: number; // percentage: completedCount / totalAttempts * 100

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Puzzle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'puzzleId' })
  puzzle: Puzzle;
}
