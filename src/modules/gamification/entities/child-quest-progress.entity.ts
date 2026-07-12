import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Quest } from './quest.entity';

/** Tiến độ nhiệm vụ của một bé. */
@Entity('child_quest_progress')
@Unique(['childId', 'questId'])
export class ChildQuestProgress extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  questId: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  progress: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'datetime', nullable: true })
  completedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  claimedAt?: Date;

  @ManyToOne(() => Quest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questId' })
  quest?: Quest;
}
