import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Skill } from './skill.entity';

/** Mức thành thạo từng kỹ năng của một bé. */
@Entity('child_skill_mastery')
@Unique(['childId', 'skillId'])
export class ChildSkillMastery extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  totalCount: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  correctCount: number;

  // 0–100
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  masteryPercent: number;

  // 0=mới, 1=đang học, 2=khá, 3=giỏi, 4=thành thạo
  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  level: number;

  @Column({ type: 'datetime', nullable: true })
  lastPracticedAt?: Date;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill?: Skill;
}
