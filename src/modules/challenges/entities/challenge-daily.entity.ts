import { Entity, PrimaryGeneratedColumn, Column, Index, UpdateDateColumn } from 'typeorm';

/**
 * Điểm Thi Tài CỘNG DỒN theo NGÀY (định danh bằng biệt danh). Mỗi ngày một dòng cho
 * (name, date, grade, subject); điểm cộng dồn nhưng bị chặn TRẦN 1000/ngày để chống cày.
 * Bảng xếp hạng TUẦN = tổng points các ngày trong tuần → thưởng chơi đều, không thưởng cày.
 */
@Entity('challenge_daily')
@Index('uq_challenge_daily', ['name', 'date', 'grade', 'subject'], { unique: true })
@Index('idx_challenge_daily_week', ['week', 'grade', 'subject'])
export class ChallengeDaily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  date: string; // YYYY-MM-DD (UTC)

  @Column({ type: 'varchar', length: 10 })
  week: string; // YYYY-Www

  @Column({ type: 'varchar', length: 20, default: 'toan' })
  subject: string;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  grade: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  points: number; // đã cộng dồn trong ngày, tối đa 1000

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSec: number; // tổng thời gian đã thi (giây) — phá hoà khi bằng điểm: ít hơn xếp trên

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string | null; // ảnh đại diện của bé (đường dẫn) để hiện trên bảng xếp hạng

  @UpdateDateColumn()
  updatedAt: Date;
}
