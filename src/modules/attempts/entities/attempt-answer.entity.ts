import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { QuizAttempt } from './quiz-attempt.entity';

/**
 * Mỗi câu trả lời của bé trong một lần làm bài → 1 bản ghi.
 * Là nền cho tính năng "Ôn lại câu sai" và phân tích điểm yếu theo câu hỏi.
 */
@Entity('attempt_answers')
@Index(['childId', 'isCorrect'])
@Index(['childId', 'quizId'])
export class AttemptAnswer extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  attemptId: number;

  // Câu hỏi (bảng quizzes)
  @Column({ type: 'bigint', unsigned: true })
  quizId: number;

  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  // Đáp án bé đã chọn/điền (json — hỗ trợ mọi dạng câu hỏi)
  @Column({ type: 'json', nullable: true })
  selectedAnswer?: unknown;

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSpentSec: number;

  @ManyToOne(() => QuizAttempt, (a) => a.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attemptId' })
  attempt?: QuizAttempt;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz?: Quiz;
}
