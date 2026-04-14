import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Course } from '../../courses/entities/course.entity';

export enum UserRole {
  PARENT = 'parent',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity('users')
export class User extends BaseEntityCommon {
  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARENT,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ type: 'datetime', nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => ChildProfile, (child) => child.user)
  children: ChildProfile[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Course, (course) => course.createdBy)
  createdCourses: Course[];
}
