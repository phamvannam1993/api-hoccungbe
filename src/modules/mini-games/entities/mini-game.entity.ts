import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

@Entity('mini_games')
export class MiniGame extends BaseEntityCommon {
  @Column({ length: 100 })
  slug: string;

  @Column({ length: 100 })
  routeKey: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 10 })
  emoji: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  age: string;

  @Column({ length: 20, nullable: true })
  ageGroup: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ length: 50, nullable: true })
  groupKey: string;

  @Column({ length: 20, nullable: true })
  difficulty: string;

  @Column({ type: 'json', nullable: true })
  skills: string[];

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: false })
  showOnHomepage: boolean;

  @Column({ type: 'int', default: 99 })
  homepageOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 20, default: 'ready' })
  status: string;
}
