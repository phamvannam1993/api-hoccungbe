import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { GameQuestion } from './game-question.entity';

export enum GameItemType {
  OPTION = 'option',
  LEFT = 'left',
  RIGHT = 'right',
  ITEM = 'item',
  CARD = 'card',
  DRAGGABLE = 'draggable',
  DROPZONE = 'dropzone',
}

@Entity('game_items')
export class GameItem extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  questionId: number;

  @Column({
    type: 'enum',
    enum: GameItemType,
    default: GameItemType.OPTION,
  })
  itemType: GameItemType;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ length: 500, nullable: true })
  imageUrl?: string;

  @Column({ length: 500, nullable: true })
  audioUrl?: string;

  @Column({ nullable: true })
  isCorrect?: boolean;

  @Column({ type: 'int', nullable: true })
  pairId?: number;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  configJson?: Record<string, unknown>;

  @ManyToOne(() => GameQuestion, (question) => question.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: GameQuestion;
}
