import { Column, Entity, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/** Thông báo học tập gửi cho phụ huynh/bé (nhắc học, báo hoàn thành, huy hiệu…). */
@Entity('notifications')
@Index(['userId', 'readAt'])
export class Notification extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  userId?: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  childId?: number;

  // reminder | achievement | report | streak | certificate | system…
  @Column({ length: 50, default: 'system' })
  type: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'json', nullable: true })
  data?: unknown;

  @Column({ type: 'datetime', nullable: true })
  scheduledAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  sentAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  readAt?: Date;
}
