import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from './topic.entity';
import { GameLesson } from './game-lesson.entity';

@Entity('play_levels')
export class Level {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  topicId: number;

  @ManyToOne(() => Topic, (t) => t.levels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  icon: string; // thumbnail preview image

  @Column({ length: 20, nullable: true })
  color: string; // card accent color

  @Column({
    type: 'enum',
    enum: ['beginner', 'easy', 'medium', 'hard'],
    default: 'beginner',
  })
  difficulty: string;

  @Column({ type: 'int', nullable: true })
  gridSize: number; // 2, 3, 4 for matrix games

  @Column({ length: 50, nullable: true })
  theme: string; // fruit, animal, color, shape

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  requiredLevelId: number; // null = always unlocked

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => GameLesson, (gl) => gl.level)
  lessons: GameLesson[];
}
