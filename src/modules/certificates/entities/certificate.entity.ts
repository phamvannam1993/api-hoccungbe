import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ChildProfile } from '../../children/entities/child-profile.entity';
import { Course } from '../../courses/entities/course.entity';

/** Chứng nhận hoàn thành khóa học của bé. */
@Entity('certificates')
@Unique(['childId', 'courseId'])
export class Certificate extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  childId: number;

  @Column({ type: 'bigint', unsigned: true })
  courseId: number;

  @Column({ length: 40, unique: true })
  code: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt: Date;

  @Column({ type: 'json', nullable: true })
  meta?: unknown;

  @ManyToOne(() => ChildProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'childId' })
  child?: ChildProfile;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course?: Course;
}
