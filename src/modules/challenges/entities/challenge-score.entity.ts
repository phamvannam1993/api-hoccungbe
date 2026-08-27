import { Entity, PrimaryGeneratedColumn, Column, Index, UpdateDateColumn } from 'typeorm';

/**
 * Điểm thử thách "Đấu Trường" của bé theo tuần. Không cần tài khoản — định danh bằng
 * biệt danh (name). Giữ điểm CAO NHẤT của mỗi biệt danh trong mỗi tuần (unique name+week).
 */
@Entity('challenge_scores')
@Index('uq_challenge_name_week_grade', ['name', 'week', 'grade'], { unique: true })
export class ChallengeScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  /** Lớp thi đấu (1–5) — mỗi lớp một bảng xếp hạng riêng cho công bằng. */
  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  grade: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  score: number;

  @Column({ type: 'varchar', length: 10 })
  week: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
