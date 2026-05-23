import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Exam } from './exam.entity';

@Entity('exam_questions')
export class ExamQuestion extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  examId: number;

  @Column({ type: 'text' })
  questionText: string;

  @Column({
    type: 'enum',
    enum: ['single_choice', 'multiple_choice', 'true_false', 'matching', 'fill_blank', 'number_compare', 'table_fill', 'drag_to_position'],
    default: 'single_choice',
  })
  questionType: 'single_choice' | 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank' | 'number_compare' | 'table_fill' | 'drag_to_position';

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  })
  difficultyLevel: 'easy' | 'medium' | 'hard';

  @Column({ type: 'json', nullable: true })
  optionsJson?: { key: string; text: string }[];

  @Column({ type: 'json', nullable: true })
  correctAnswerJson?: unknown;

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ length: 500, nullable: true })
  questionImageUrl?: string;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  points: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'examId' })
  exam: Exam;
}
