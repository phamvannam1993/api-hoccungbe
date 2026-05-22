import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { GameQuestion } from './game-question.entity';

export enum GameType {
  CHOOSE_CORRECT = 'choose_correct',
  CONNECT = 'connect',
  ARRANGE = 'arrange',
  IMAGE_MATCH = 'image_match',
  DRAG = 'drag',
  DRAG_ARRANGE = 'drag_arrange',
}

@Entity('games')
export class Game extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  lessonId?: number;

  @Column({
    type: 'enum',
    enum: GameType,
    default: GameType.CHOOSE_CORRECT,
  })
  gameType: GameType;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  instruction?: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  timeLimit?: number;

  @Column({ type: 'int', unsigned: true, default: 10 })
  points: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  configJson?: Record<string, unknown>;

  @ManyToOne(() => Lesson, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'lessonId' })
  lesson?: Lesson;

  @OneToMany(() => GameQuestion, (question) => question.game, { cascade: true })
  questions: GameQuestion[];
}
