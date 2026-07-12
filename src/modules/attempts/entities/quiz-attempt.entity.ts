import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { AttemptAnswer } from './attempt-answer.entity';

/**
 * Mỗi lần một bé làm 1 bài tập (exercise) của một bài học → 1 bản ghi.
 * Bổ sung cho `progress` (mức bài học) bằng dữ liệu chi tiết mức bài tập,
 * làm nền cho Dashboard phụ huynh, Báo cáo tuần và Ôn lại câu sai.
 */
@Entity('quiz_attempts')
@Index(['childId', 'lessonId'])
@Index(['childId', 'createdAt'])
export class QuizAttempt extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  courseId?: number;

  // Bài tập số mấy trong bài (1 = Dễ, 2 = Trung bình, 3 = Khó…)
  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  exerciseNumber: number;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'], nullable: true })
  difficultyLevel?: 'easy' | 'medium' | 'hard';

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalQuestions: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  correctCount: number;

  // Điểm 0–100
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSpentSec: number;

  @Column({ type: 'enum', enum: ['in_progress', 'completed'], default: 'completed' })
  status: 'in_progress' | 'completed';

  @Column({ type: 'datetime', nullable: true })
  completedAt?: Date;

  @ManyToOne(() => ChildProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'childId' })
  child?: ChildProfile;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson?: Lesson;

  @OneToMany(() => AttemptAnswer, (a) => a.attempt)
  answers?: AttemptAnswer[];
}
