import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Reward } from '../../rewards/entities/reward.entity';

export enum CourseType {
  LOGIC = 'logic',
  MATH = 'math',
  LANGUAGE = 'language',
  EMOTION = 'emotion',
  CREATIVE = 'creative',
  OTHER = 'other',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('courses')
export class Course extends BaseEntityCommon {
  @Column({ length: 150 })
  title: string;

  @Column({ length: 180, unique: true })
  slug: string;

  @Column({ length: 255, nullable: true })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  thumbnailUrl?: string;

  @Column({ length: 255, nullable: true })
  bannerUrl?: string;

  @Column({ length: 255, nullable: true })
  videoUrl?: string;

  @Column({
    type: 'enum',
    enum: CourseType,
    default: CourseType.OTHER,
  })
  courseType: CourseType;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.BEGINNER,
  })
  difficultyLevel: DifficultyLevel;

  @Column({ type: 'tinyint', unsigned: true, default: 6 })
  targetAgeMin: number;

  @Column({ type: 'tinyint', unsigned: true, default: 6 })
  targetAgeMax: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalLessons: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  estimatedMinutes: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'boolean', default: false })
  isFree: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  createdById?: number;

  @ManyToOne(() => User, (user) => user.createdCourses, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'createdById' })
  createdBy?: User;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Subscription, (subscription) => subscription.course)
  subscriptions: Subscription[];

  @OneToMany(() => Progress, (progress) => progress.course)
  progressRecords: Progress[];

  @OneToMany(() => Reward, (reward) => reward.course)
  rewards: Reward[];
}
