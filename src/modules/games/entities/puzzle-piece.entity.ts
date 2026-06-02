import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Puzzle } from './puzzle.entity';

@Entity('puzzle_pieces')
export class PuzzlePiece extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  puzzleId: number;

  @Column({ type: 'int', unsigned: true })
  position: number; // 0-8 for 3x3, 0-15 for 4x4, etc.

  @Column({ length: 500, nullable: true })
  content?: string; // emoji, letter, number, or image URL

  @Column({ length: 100, nullable: true })
  display?: string; // 'emoji', 'text', 'image'

  @Column({ length: 500, nullable: true })
  imageUrl?: string; // for image-based pieces

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  configJson?: {
    cropBox?: { x: number; y: number; width: number; height: number };
    edges?: { top: string; right: string; bottom: string; left: string };
    [key: string]: unknown;
  };

  @ManyToOne(() => Puzzle, (puzzle) => puzzle.pieces, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'puzzleId' })
  puzzle: Puzzle;
}
