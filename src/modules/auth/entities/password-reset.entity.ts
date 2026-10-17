import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Yêu cầu đặt lại mật khẩu. Chỉ lưu SHA-256 của token (token gốc chỉ nằm trong link gửi qua email),
 * dùng một lần, hết hạn sau PASSWORD_RESET_MINUTES phút.
 */
@Entity('password_resets')
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int', unsigned: true })
  userId: number;

  @Index({ unique: true })
  @Column({ type: 'char', length: 64 })
  tokenHash: string;

  @Column({ type: 'datetime' })
  expiresAt: Date;

  @Column({ type: 'datetime', nullable: true })
  usedAt: Date | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  requestIp: string | null;

  /** Ghi từ Node (không dùng DEFAULT CURRENT_TIMESTAMP) để cùng múi giờ với expiresAt khi so sánh. */
  @Column({ type: 'datetime' })
  createdAt: Date;
}
