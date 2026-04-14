import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

export enum RewardType {
  STAR = 'star',
  BADGE = 'badge',
  CERTIFICATE = 'certificate',
  GIFT = 'gift',
}

@Entity('rewards')
export class Reward extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  courseId?: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  lessonId?: number;

  @Column({
    type: 'enum',
    enum: RewardType,
    default: RewardType.STAR,
  })
  rewardType: RewardType;

  @Column({ length: 100 })
  rewardName: string;

  @Column({ length: 255, nullable: true })
  rewardDescription?: string;

  @Column({ length: 255, nullable: true })
  rewardIconUrl?: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  points: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  awardedAt: Date;

  @ManyToOne(() => ChildProfile, (child) => child.rewards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'childId' })
  child: ChildProfile;

  @ManyToOne(() => Course, (course) => course.rewards, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'courseId' })
  course?: Course;

  @ManyToOne(() => Lesson, (lesson) => lesson.rewards, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'lessonId' })
  lesson?: Lesson;
}
