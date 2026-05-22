import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Game } from './game.entity';
import { GameItem } from './game-item.entity';

@Entity('game_questions')
export class GameQuestion extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  gameId: number;

  @Column({ type: 'text', nullable: true })
  questionText?: string;

  @Column({ length: 500, nullable: true })
  questionImageUrl?: string;

  @Column({ length: 500, nullable: true })
  questionAudioUrl?: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  configJson?: Record<string, unknown>;

  @ManyToOne(() => Game, (game) => game.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @OneToMany(() => GameItem, (item) => item.question, { cascade: true })
  items: GameItem[];
}
