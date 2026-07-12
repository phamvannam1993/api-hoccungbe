import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Skill } from './skill.entity';

/** Liên kết bài học ↔ kỹ năng. */
@Entity('lesson_skills')
@Unique(['lessonId', 'skillId'])
export class LessonSkill extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  weight: number;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill?: Skill;
}
