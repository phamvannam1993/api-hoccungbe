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

  /** Loại nhiệm vụ theo công thức 40/30/20/10 (ôn câu sai / bài đang học / ôn cũ / thử thách). */
  @Column({
    type: 'enum',
    enum: ['review_wrong', 'current', 'review_old', 'challenge'],
    default: 'current',
  })
  kind: 'review_wrong' | 'current' | 'review_old' | 'challenge';

  /** Số câu sai cần ôn (chỉ dùng cho kind = review_wrong). */
  @Column({ type: 'smallint', unsigned: true, nullable: true })
  wrongCount?: number;

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
