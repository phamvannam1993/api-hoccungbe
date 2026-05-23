import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { ExamQuestion } from './exam-question.entity';

@Entity('exams')
export class Exam extends BaseEntityCommon {
  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ length: 50, default: 'tieng-viet' })
  subject: string; // tieng-viet | toan | tieng-anh

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  grade: number; // 1-5

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  semester: number; // 1 | 2

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  timeLimitMinutes?: number; // null = không giới hạn

  @Column({ type: 'smallint', unsigned: true, default: 10 })
  totalPoints: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ExamQuestion, (q) => q.exam, { cascade: true })
  questions: ExamQuestion[];
}
