import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Skill } from './skill.entity';

/** Liên kết trò chơi ↔ kỹ năng ("trò chơi gắn với kỹ năng"). */
@Entity('game_skills')
@Unique(['gameId', 'skillId'])
export class GameSkill extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  gameId: number;

  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill?: Skill;
}
