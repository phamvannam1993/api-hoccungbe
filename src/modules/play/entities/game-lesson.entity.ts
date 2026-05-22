import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';
import { GameQuestion } from './game-question.entity';

@Entity('play_game_lessons')
export class GameLesson {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  levelId: number;

  @ManyToOne(() => Level, (l) => l.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'levelId' })
  level: Level;

  @Column({ type: 'int', default: 1 })
  sortOrder: number;

  @Column({ length: 100 })
  title: string; // "Bài 1"

  @Column({ length: 10, nullable: true })
  icon: string; // emoji icon

  @Column({ type: 'int', default: 0 })
  timeLimit: number; // seconds, 0 = no limit

  @Column({ type: 'int', default: 80 })
  passingScore: number; // %

  @OneToMany(() => GameQuestion, (q) => q.lesson)
  questions: GameQuestion[];
}
