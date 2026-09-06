import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { SkillAttempt } from './skill-attempt.entity';

/** Từng câu trong một phiên luyện kỹ năng — nền cho "ôn lại câu sai" theo kỹ năng. */
@Entity('skill_attempt_answers')
@Index(['childId', 'isCorrect'])
export class SkillAttemptAnswer extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  attemptId: number;

  @Column({ type: 'bigint', unsigned: true })
  questionId: number;

  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @Column({ type: 'tinyint', nullable: true })
  selectedIndex?: number;

  /** Bé làm sai rồi làm lại câu sinh đôi và đúng — dấu hiệu đã hiểu ra. */
  @Column({ default: false })
  retriedCorrect: boolean;

  @ManyToOne(() => SkillAttempt, (a) => a.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attemptId' })
  attempt?: SkillAttempt;
}
