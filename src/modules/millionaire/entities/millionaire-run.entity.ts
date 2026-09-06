import { Column, Entity, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/**
 * Một ván "Ai Là Triệu Phú Nhí".
 *
 * Không dùng lại bảng `challenge_scores` của Thi Tài: bảng đó chặn điểm mỗi ván
 * ở 999 và có trần 1000 điểm/ngày, trong khi game này có mốc thưởng tới
 * 1.000.000. Nhét vào đó thì hoặc vỡ luật chống cày của Thi Tài, hoặc mất ý
 * nghĩa thang tiền của game.
 *
 * Không bắt buộc đăng nhập — định danh bằng biệt danh như Thi Tài, `childId`
 * chỉ có khi bé đã tạo hồ sơ.
 */
@Entity('millionaire_runs')
@Index(['grade', 'week'])
@Index(['name', 'grade'])
export class MillionaireRun extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  childId?: number;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 40, nullable: true })
  avatar?: string;

  @Column({ type: 'tinyint', unsigned: true })
  grade: number;

  /** classic = leo thang 15 câu, speed = 60 giây, boss = 10 câu khó liên tiếp. */
  @Column({ type: 'enum', enum: ['classic', 'speed', 'boss'], default: 'classic' })
  mode: 'classic' | 'speed' | 'boss';

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalQuestions: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  correctCount: number;

  /** Số tiền thưởng đạt được theo thang (0 … 1.000.000). */
  @Column({ type: 'int', unsigned: true, default: 0 })
  prize: number;

  /** Điểm xếp hạng — quy đổi từ tiền thưởng + combo + tốc độ. */
  @Column({ type: 'int', unsigned: true, default: 0 })
  score: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  bestCombo: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSec: number;

  /** Tuần ISO "2026-W36" — xếp hạng theo tuần như Thi Tài. */
  @Column({ length: 10 })
  week: string;

  /** Tháng "2026-09" — cho bảng xếp hạng tháng. */
  @Column({ length: 7 })
  month: string;
}
