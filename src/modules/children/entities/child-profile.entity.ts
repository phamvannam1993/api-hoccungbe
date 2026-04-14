import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Reward } from '../../rewards/entities/reward.entity';

export enum ChildGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('children_profiles')
export class ChildProfile extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 50, nullable: true })
  nickname?: string;

  @Column({ type: 'enum', enum: ChildGender, nullable: true })
  gender?: ChildGender;

  @Column({ type: 'date', nullable: true })
  birthDate?: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ length: 50, nullable: true })
  currentLevel?: string;

  @Column({ type: 'json', nullable: true })
  interests?: string[];

  @Column({ type: 'text', nullable: true })
  learningGoal?: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @ManyToOne(() => User, (user) => user.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Progress, (progress) => progress.child)
  progressRecords: Progress[];

  @OneToMany(() => Reward, (reward) => reward.child)
  rewards: Reward[];
}
