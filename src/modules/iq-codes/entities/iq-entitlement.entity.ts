import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Một lượt quyền học khóa Toán IQ của một tài khoản, có được khi nhập một mã kích hoạt.
 * Mỗi lượt dài IQ_ACCESS_MONTHS tháng; mua tiếp khi còn hạn thì lượt mới nối tiếp sau lượt cũ.
 * Đăng nhập ở máy nào cũng mở được các khóa còn hạn.
 */
@Entity('iq_entitlements')
export class IqEntitlement {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  userId: number;

  /** Mã khóa / combo ('L2K01', 'L2ALL'). */
  @Column({ type: 'varchar', length: 20 })
  prefix: string;

  /** Mã kích hoạt tạo ra lượt này (mỗi mã đúng một lượt). */
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 32 })
  code: string;

  @Column({ type: 'datetime' })
  startsAt: Date;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
