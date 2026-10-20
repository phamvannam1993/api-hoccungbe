import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export type IqOrderStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

/**
 * Đơn mua gói Toán IQ: phụ huynh bấm "Mua" → tạo đơn chờ duyệt kèm MÃ KÍCH HOẠT của gói (`code`),
 * cũng chính là nội dung chuyển khoản. Admin đối chiếu tiền về rồi duyệt → mã được kích hoạt cho
 * tài khoản mua, thời hạn 1 tháng tính từ lúc duyệt (IqCodesService.issueToAccount).
 */
@Entity('iq_orders')
export class IqOrder {
  @PrimaryGeneratedColumn()
  id: number;

  /** Mã kích hoạt của đơn = nội dung chuyển khoản, vd 'L2K01-ABCDE-FGHJK'. */
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 32 })
  code: string;

  @Index()
  @Column({ type: 'int', unsigned: true })
  userId: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  userEmail: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  userName: string | null;

  /** Mã gói ('L2K01', 'L2ALL'). */
  @Column({ type: 'varchar', length: 20 })
  prefix: string;

  /** Tên gói lúc mua (để admin đọc). */
  @Column({ type: 'varchar', length: 200 })
  title: string;

  /** Số tiền (đồng), tính ở server web theo bảng giá. */
  @Column({ type: 'int', unsigned: true })
  amount: number;

  @Index()
  @Column({ type: 'varchar', length: 16, default: 'pending' })
  status: IqOrderStatus;

  /** Ghi chú của admin (vd lý do từ chối). */
  @Column({ type: 'varchar', length: 255, nullable: true })
  adminNote: string | null;

  /** Hạn học sau khi duyệt (1 tháng tính từ lúc duyệt / nối sau gói còn hạn). */
  @Column({ type: 'datetime', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  reviewedBy: string | null;

  @Column({ type: 'datetime', nullable: true })
  reviewedAt: Date | null;

  // ── payOS: link / QR thanh toán của đơn, xác nhận tự động qua webhook ──
  /** orderCode bên payOS (số, duy nhất mỗi kênh thanh toán). */
  @Index({ unique: true })
  @Column({
    type: 'bigint',
    nullable: true,
    transformer: {
      to: (v: number | null) => v,
      from: (v: string | null) => (v === null ? null : Number(v)),
    },
  })
  payosOrderCode: number | null;

  /** Số tiền lúc tạo link (đổi giá → tạo link mới). */
  @Column({ type: 'int', unsigned: true, nullable: true })
  payosAmount: number | null;

  @Column({ type: 'text', nullable: true })
  checkoutUrl: string | null;

  /** Chuỗi VietQR payOS trả về (web tự vẽ ra ảnh QR). */
  @Column({ type: 'text', nullable: true })
  qrCode: string | null;

  @Column({ type: 'datetime', nullable: true })
  payosExpiresAt: Date | null;

  /** Đã nhận tiền: lúc nào, mã giao dịch ngân hàng. */
  @Column({ type: 'datetime', nullable: true })
  paidAt: Date | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  payRef: string | null;

  /** Ghi từ Node (không dùng DEFAULT CURRENT_TIMESTAMP) để cùng múi giờ với các cột khác. */
  @Column({ type: 'datetime' })
  createdAt: Date;
}
