import { Column, Entity, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

// Bảng RIÊNG cho câu hỏi IQ / Toán tư duy (không dùng chung bảng quizzes).
// Lưu đúng theo format bộ câu hỏi: question / options / correct_index / countdown +
// bản _speech cho TTS. Phân theo `grade` (lớp 1–5).
@Entity('iq_questions')
export class IqQuestion extends BaseEntityCommon {
  // Mã ngoài (vd "thu-thach-iq-lop-2-01") — để dedupe khi import lại. Duy nhất, tùy chọn.
  @Index({ unique: true })
  @Column({ length: 120, nullable: true })
  code?: string;

  @Index()
  @Column({ type: 'tinyint', unsigned: true })
  grade: number; // 1..5

  @Column({ length: 255, nullable: true })
  subject?: string;

  @Column({ length: 255, nullable: true })
  lesson?: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  questionSpeech?: string;

  // Mảng đáp án dạng chuỗi: ["28 lần","32 lần","36 lần","40 lần"].
  @Column({ type: 'json' })
  optionsJson: string[];

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  correctIndex: number;

  // Đếm ngược (nếu dùng cho quiz video): ["5","4","3","2","1"].
  @Column({ type: 'json', nullable: true })
  countdownJson?: string[];

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ type: 'text', nullable: true })
  explanationSpeech?: string;

  // Mức độ khó: easy=dễ, medium=trung bình, hard=khó.
  @Index()
  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'], default: 'medium' })
  difficulty: 'easy' | 'medium' | 'hard';

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;
}
