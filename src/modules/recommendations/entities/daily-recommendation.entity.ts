import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

/** Gợi ý bài học hằng ngày cho từng bé (lộ trình cá nhân + gợi ý mỗi ngày). */
@Entity('daily_recommendations')
@Index(['childId', 'forDate'])
export class DailyRecommendation extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'date' })
  forDate: string;

  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  courseId?: number;

  @Column({ length: 255, nullable: true })
  reason?: string;

  @Column({ type: 'enum', enum: ['pending', 'done', 'skipped'], default: 'pending' })
  status: 'pending' | 'done' | 'skipped';

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  sortOrder: number;

  @ManyToOne(() => ChildProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'childId' })
  child?: ChildProfile;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson?: Lesson;
}
