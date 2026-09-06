import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Skill } from '../../skills/entities/skill.entity';

/**
 * Kho câu hỏi RIÊNG cho chế độ "Học theo kỹ năng" — không dùng chung bảng `quizzes`.
 *
 * Vì sao tách: câu trong `quizzes` bám theo từng bài sách giáo khoa, phần giải
 * thích phần lớn chỉ nêu đáp án ("Đáp án đúng là 63") chứ không dạy cách nghĩ.
 * Luyện theo kỹ năng là một phiên TỔNG HỢP, cần câu độc lập khỏi thứ tự bài và
 * cần lời giải thích chỉ ra cách làm.
 *
 * Cùng `variantGroup` = các câu SINH ĐÔI (cùng dạng, khác số liệu). Bé làm sai
 * một câu thì bốc câu khác cùng nhóm cho bé thử lại ngay.
 */
@Entity('skill_questions')
export class SkillQuestion extends BaseEntityCommon {
  /** Mã ngoài để chạy lại bộ sinh mà không tạo trùng. */
  @Index({ unique: true })
  @Column({ length: 120 })
  code: string;

  @Index()
  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @Index()
  @Column({ type: 'tinyint', unsigned: true })
  grade: number;

  @Index()
  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'], default: 'easy' })
  difficulty: 'easy' | 'medium' | 'hard';

  @Column({ type: 'text' })
  questionText: string;

  /** Đáp án dạng mảng chuỗi: ["9","8","6","12"]. */
  @Column({ type: 'json' })
  optionsJson: string[];

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  correctIndex: number;

  /** Giải thích CÁCH LÀM, không chỉ nêu đáp án. */
  @Column({ type: 'text' })
  explanation: string;

  /** Nhóm câu sinh đôi — bốc câu khác cùng nhóm để bé thử lại. */
  @Index()
  @Column({ length: 120 })
  variantGroup: string;

  /** Bộ sinh đã tạo câu này, để truy vết khi cần sửa mẫu. */
  @Column({ length: 60 })
  generator: string;

  @Column({ type: 'int', unsigned: true, default: 1 })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill?: Skill;
}
