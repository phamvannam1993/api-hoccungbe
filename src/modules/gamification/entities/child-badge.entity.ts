import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Badge } from './badge.entity';

/** Huy hiệu một bé đã đạt được. */
@Entity('child_badges')
@Unique(['childId', 'badgeId'])
export class ChildBadge extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  badgeId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  earnedAt: Date;

  @ManyToOne(() => Badge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'badgeId' })
  badge?: Badge;
}
