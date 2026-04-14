import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('progress')
@Unique(['childId', 'lessonId'])
export class Progress extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  courseId: number;

  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({
    type: 'enum',
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started',
  })
  status: 'not_started' | 'in_progress' | 'completed';

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  completionPercent: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  starsEarned: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  attemptsCount: number;

  @Column({ type: 'datetime', nullable: true })
  startedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  completedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastAccessedAt?: Date;

  @ManyToOne(() => ChildProfile, (child) => child.progressRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'childId' })
  child: ChildProfile;

  @ManyToOne(() => Course, (course) => course.progressRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Lesson, (lesson) => lesson.progressRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;
}
