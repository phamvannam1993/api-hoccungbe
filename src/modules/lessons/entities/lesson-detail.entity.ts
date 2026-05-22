import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './lesson.entity';

export type GoalItem = string;

export type WarmupSection = {
  title: string;
  duration: number; // phút
  description: string;
  steps: string[];
  emoji: string;
};

export type KnowledgePoint = {
  title: string;
  explanation: string;
  example?: string;
  visual?: string; // emoji hoặc mô tả hình ảnh
};

export type KnowledgeSection = {
  title: string;
  summary: string;
  points: KnowledgePoint[];
};

export type PracticeItem = {
  type: 'fill' | 'choose' | 'match' | 'drag' | 'write';
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
};

export type PracticeSection = {
  title: string;
  instruction: string;
  items: PracticeItem[];
};

export type GameSection = {
  title: string;
  type: string; // 'drag-drop' | 'tap' | 'match' | 'quiz-race' | 'collect' | 'sort'
  description: string;
  duration: number; // phút
  instructions: string[];
  reward: string; // phần thưởng khi thắng
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  emoji?: string;
};

export type QuizSection = {
  title: string;
  passingScore: number; // %
  questions: QuizQuestion[];
};

export type RewardSection = {
  badge: string; // emoji huy hiệu
  title: string;
  description: string;
  points: number;
  message: string;
};

export type ReportItem = {
  metric: string;
  description: string;
};

export type ReportSection = {
  summary: string;
  tracked: ReportItem[];
  tips: string[];
};

export type ReviewSection = {
  title: string;
  keyPoints: string[];
  nextLesson: string;
  encouragement: string;
};

@Entity('lesson_details')
export class LessonDetail {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, unique: true })
  lessonId: number;

  @OneToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column({ type: 'json', nullable: true })
  goals: GoalItem[];

  @Column({ type: 'json', nullable: true })
  warmup: WarmupSection;

  @Column({ type: 'json', nullable: true })
  knowledge: KnowledgeSection;

  @Column({ type: 'json', nullable: true })
  practice: PracticeSection;

  @Column({ type: 'json', nullable: true })
  game: GameSection;

  @Column({ type: 'json', nullable: true })
  quiz: QuizSection;

  @Column({ type: 'json', nullable: true })
  reward: RewardSection;

  @Column({ type: 'json', nullable: true })
  report: ReportSection;

  @Column({ type: 'json', nullable: true })
  review: ReviewSection;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
