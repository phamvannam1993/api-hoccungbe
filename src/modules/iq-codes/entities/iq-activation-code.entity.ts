import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

/**
 * Mã kích hoạt khóa Toán IQ (frontend /khoa-hoc-vui).
 * `prefix` là mã khóa/combo trong courses.json của frontend (vd 'L2K01', 'L2ALL').
 * Mỗi mã chỉ dùng cho MỘT tài khoản: tài khoản nhập đầu tiên được ghi vào redeemedBy,
 * tài khoản khác nhập lại sẽ bị từ chối. Mã còn dùng được khi status = 'active' và redeemedBy rỗng.
 */
@Entity('iq_activation_codes')
export class IqActivationCode {
  @PrimaryColumn({ type: 'varchar', length: 32 })
  code: string;

  @Index()
  @Column({ type: 'varchar', length: 20 })
  prefix: string;

  /** Ghi chú của admin: tên / SĐT phụ huynh, đơn hàng… */
  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string | null;

  @Column({ type: 'int', default: 1 })
  maxUses: number;

  @Column({ type: 'int', default: 0 })
  useCount: number;

  /** 'active' | 'revoked' (đã dùng suy ra từ redeemedBy). */
  @Column({ type: 'varchar', length: 16, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  createdBy: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  lastUsedAt: Date | null;

  /** Tài khoản (users.id) đã nhập mã này. */
  @Index()
  @Column({ type: 'int', nullable: true })
  redeemedBy: number | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  redeemedEmail: string | null;
}
