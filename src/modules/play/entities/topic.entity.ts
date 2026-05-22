import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Level } from './level.entity';

export enum PlayGameType {
  MATRIX = 'matrix',
  PATTERN = 'pattern',
  MAZE = 'maze',
  SPOT_DIFF = 'spot_diff',
  CONNECT = 'connect',
  COLOR_FILL = 'color_fill',
}

@Entity('play_topics')
export class Topic {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  subjectId: number;

  @ManyToOne(() => Subject, (s) => s.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  icon: string;

  @Column({ length: 10, nullable: true })
  emoji: string;

  @Column({ type: 'enum', enum: PlayGameType, default: PlayGameType.MATRIX })
  gameType: PlayGameType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Level, (l) => l.topic)
  levels: Level[];
}
