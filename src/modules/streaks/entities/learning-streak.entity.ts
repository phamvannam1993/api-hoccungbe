import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';

/** Chuỗi ngày học liên tục của bé — nền cho thói quen học, huy hiệu, thông báo. */
@Entity('learning_streaks')
export class LearningStreak extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true, unique: true })
  childId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  currentStreak: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  longestStreak: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalActiveDays: number;

  @Column({ type: 'date', nullable: true })
  lastActiveDate?: string;

  @ManyToOne(() => ChildProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'childId' })
  child?: ChildProfile;
}
