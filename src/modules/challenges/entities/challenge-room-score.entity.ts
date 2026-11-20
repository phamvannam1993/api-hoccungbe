import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
} from 'typeorm';

/** Điểm tốt nhất của từng người (theo biệt danh) trong một phòng thi đấu. */
@Entity('challenge_room_scores')
@Index('uq_challenge_room_player', ['roomId', 'name'], { unique: true })
export class ChallengeRoomScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  roomId: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string | null;

  @Column({ type: 'int', unsigned: true, default: 0 })
  score: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  correct: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  timeSec: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
