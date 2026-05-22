import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Course } from '../../courses/entities/course.entity';
import { Volume } from '../../volumes/entities/volume.entity';

@Entity('topics')
export class Topic extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  courseId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  volumeId?: number;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Volume, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'volumeId' })
  volume?: Volume;
}
