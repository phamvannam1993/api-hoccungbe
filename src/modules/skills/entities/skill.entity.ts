import { Column, Entity } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/** Kỹ năng (taxonomy) — vd: nhận biết chữ, đọc hiểu, cộng trừ, tư duy logic… */
@Entity('skills')
export class Skill extends BaseEntityCommon {
  @Column({ length: 60, unique: true })
  code: string;

  @Column({ length: 120 })
  name: string;

  // math | language | english | thinking | memory…
  @Column({ length: 40, nullable: true })
  subject?: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ length: 255, nullable: true })
  icon?: string;

  @Column({ default: true })
  isActive: boolean;
}
