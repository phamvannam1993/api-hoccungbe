import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

/**
 * Icon do admin upload để thay ảnh giao diện của khu Toán IQ (frontend /khoa-hoc-vui).
 * `iconKey` là tên file ảnh mặc định trong public/khoa-hoc-vui/images (vd 'icon_title.png').
 * Có bản ghi → frontend dùng ảnh này; không có → dùng ảnh mặc định.
 */
@Entity('iq_icons')
export class IqIcon {
  @PrimaryColumn({ type: 'varchar', length: 80 })
  iconKey: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
