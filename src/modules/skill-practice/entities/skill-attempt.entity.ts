import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { SkillAttemptAnswer } from './skill-attempt-answer.entity';

/**
 * Một PHIÊN luyện theo kỹ năng (vd "10 câu phép chia").
 *
 * Tách khỏi `quiz_attempts` có chủ đích: bản ghi ở đó khoá theo bài + số bài tập
 * và bị ghi đè, nên nhét một phiên trộn nhiều bài vào đó sẽ làm hỏng tiến độ của
 * chính những bài ấy.
 */
@Entity('skill_attempts')
@Index(['childId', 'skillId'])
export class SkillAttempt extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @Column({ type: 'tinyint', unsigned: true })
  grade: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalQuestions: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  correctCount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSpentSec: number;

  @OneToMany(() => SkillAttemptAnswer, (a) => a.attempt)
  answers?: SkillAttemptAnswer[];
}
