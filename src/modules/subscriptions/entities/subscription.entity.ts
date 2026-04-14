import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

export enum SubscriptionPlanType {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  LIFETIME = 'lifetime',
  SINGLE_COURSE = 'single_course',
}

export enum SubscriptionStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('subscriptions')
export class Subscription extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  courseId?: number;

  @Column({ length: 100 })
  planName: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPlanType,
    default: SubscriptionPlanType.SINGLE_COURSE,
  })
  planType: SubscriptionPlanType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ length: 10, default: 'VND' })
  currency: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  @Column({ type: 'datetime', nullable: true })
  startDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate?: Date;

  @Column({ length: 50, nullable: true })
  paymentMethod?: string;

  @Column({ length: 100, nullable: true })
  transactionCode?: string;

  @Column({ type: 'boolean', default: false })
  autoRenew: boolean;

  @ManyToOne(() => User, (user) => user.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Course, (course) => course.subscriptions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'courseId' })
  course?: Course;
}
