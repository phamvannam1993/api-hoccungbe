import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';

/** Báo cáo học tập theo tuần cho phụ huynh. */
@Entity('weekly_reports')
@Unique(['childId', 'weekStart'])
export class WeeklyReport extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'date' })
  weekStart: string;

  @Column({ type: 'json' })
  stats: unknown;

  @Column({ type: 'datetime', nullable: true })
  sentAt?: Date;

  @ManyToOne(() => ChildProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'childId' })
  child?: ChildProfile;
}
