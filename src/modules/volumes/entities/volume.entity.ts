import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('volumes')
export class Volume extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  courseId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'courseId' })
  course: Course;
}
