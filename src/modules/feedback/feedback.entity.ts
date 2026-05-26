import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../common/entities/base.entity';

@Entity('feedbacks')
export class Feedback extends BaseEntityCommon {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ length: 50, nullable: true })
  topic?: string;

  @Column({ default: false })
  isRead: boolean;
}
