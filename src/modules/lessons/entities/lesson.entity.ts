import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Course } from '../../courses/entities/course.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Reward } from '../../rewards/entities/reward.entity';

@Entity('lessons')
@Unique(['courseId', 'slug'])
export class Lesson extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  courseId: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 180 })
  slug: string;

  @Column({ length: 255, nullable: true })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({
    type: 'enum',
    enum: ['video', 'story', 'game', 'quiz', 'interactive'],
    default: 'interactive',
  })
  lessonType: 'video' | 'story' | 'game' | 'quiz' | 'interactive';

  @Column({ length: 255, nullable: true })
  videoUrl?: string;

  @Column({ length: 255, nullable: true })
  audioUrl?: string;

  @Column({ length: 255, nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  durationMinutes: number;

  @Column({ default: false })
  isPreview: boolean;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizzes: Quiz[];

  @OneToMany(() => Progress, (progress) => progress.lesson)
  progressRecords: Progress[];

  @OneToMany(() => Reward, (reward) => reward.lesson)
  rewards: Reward[];
}
