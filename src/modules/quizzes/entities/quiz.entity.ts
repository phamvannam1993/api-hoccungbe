import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('quizzes')
export class Quiz extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ type: 'text' })
  questionText: string;

  @Column({
    type: 'enum',
    enum: [
      'single_choice',
      'multiple_choice',
      'true_false',
      'drag_drop',
      'image_choice',
    ],
    default: 'single_choice',
  })
  questionType:
    | 'single_choice'
    | 'multiple_choice'
    | 'true_false'
    | 'drag_drop'
    | 'image_choice';

  @Column({ length: 255, nullable: true })
  questionImageUrl?: string;

  @Column({ type: 'json', nullable: true })
  optionsJson?: Record<string, unknown>[];

  @Column({ type: 'json', nullable: true })
  correctAnswerJson?: unknown;

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ type: 'int', unsigned: true, default: 10 })
  points: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Lesson, (lesson) => lesson.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;
}
