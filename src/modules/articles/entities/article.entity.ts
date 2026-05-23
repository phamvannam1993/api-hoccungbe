import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

@Entity('articles')
export class Article extends BaseEntityCommon {
  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt?: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ length: 500, nullable: true })
  thumbnailUrl?: string;

  @Column({ length: 100, nullable: true })
  category?: string;

  @Column({ type: 'json', nullable: true })
  tags?: string[];

  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'datetime', nullable: true })
  publishedAt?: Date;

  @Column({ type: 'int', unsigned: true, default: 0 })
  viewCount: number;

  @Column({ length: 100, nullable: true })
  authorName?: string;
}
