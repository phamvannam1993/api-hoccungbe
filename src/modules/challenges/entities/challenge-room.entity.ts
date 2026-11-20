import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

/**
 * Phòng thi đấu của Sân chơi Trí tuệ (bất đồng bộ): chủ phòng tạo mã mời, mọi người làm CÙNG
 * một bộ câu hỏi (client sinh đề từ `seed`) trong thời hạn phòng, rồi so điểm trên bảng của phòng.
 */
@Entity('challenge_rooms')
@Index('uq_challenge_room_code', ['code'], { unique: true })
export class ChallengeRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 8 })
  code: string; // mã mời 6 ký tự, không có ký tự dễ nhầm (0/O, 1/I)

  @Column({ type: 'varchar', length: 60 })
  title: string;

  @Column({ type: 'varchar', length: 60 })
  hostName: string;

  @Column({ type: 'tinyint', unsigned: true, default: 2 })
  grade: number;

  @Column({ type: 'varchar', length: 32 })
  seed: string; // hạt giống sinh đề — mọi người trong phòng nhận cùng 10 câu

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime' })
  expiresAt: Date;
}
