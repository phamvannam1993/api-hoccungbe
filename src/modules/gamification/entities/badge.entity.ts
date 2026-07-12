import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/** Catalog huy hiệu (định nghĩa). Huy hiệu bé đạt được lưu ở child_badges. */
@Entity('badges')
export class Badge extends BaseEntityCommon {
  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  icon?: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  points: number;

  @Column({ default: true })
  isActive: boolean;
}
