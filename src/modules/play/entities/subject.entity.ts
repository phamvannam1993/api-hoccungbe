import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from './topic.entity';

@Entity('play_subjects')
export class Subject {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  icon: string; // URL ảnh nhân vật tròn

  @Column({ length: 10, nullable: true })
  emoji: string;

  @Column({ length: 20, nullable: true })
  color: string; // border/accent color hex

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Topic, (t) => t.subject)
  topics: Topic[];
}
