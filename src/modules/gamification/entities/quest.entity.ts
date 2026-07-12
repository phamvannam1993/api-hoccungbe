import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/** Nhiệm vụ cho bé (vd: hoàn thành 5 bài, giữ chuỗi 7 ngày, 3 bài điểm 100…). */
@Entity('quests')
export class Quest extends BaseEntityCommon {
  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  // Loại đo tiến độ: lessons_completed | attempts | streak_days | perfect_scores
  @Column({ length: 40 })
  type: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  target: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  rewardPoints: number;

  // Mã huy hiệu thưởng khi hoàn thành (tùy chọn)
  @Column({ length: 50, nullable: true })
  rewardBadgeCode?: string;

  @Column({ default: true })
  isActive: boolean;
}
