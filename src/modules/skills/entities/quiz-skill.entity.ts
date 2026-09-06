import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';
import { Skill } from './skill.entity';

/**
 * Liên kết CÂU HỎI ↔ kỹ năng.
 *
 * Chi tiết hơn `lesson_skills` một bậc, và cần thiết ở những chỗ một bài học
 * trộn nhiều kỹ năng: một bài Tiếng Việt lớp 3 vừa hỏi đọc hiểu, vừa hỏi luyện
 * từ và câu, vừa hỏi chính tả — gắn ở mức bài thì cả ba kỹ năng luôn bằng nhau,
 * không bao giờ chỉ ra được bé yếu mảng nào.
 *
 * Do `attempt_answers` lưu đúng/sai theo từng câu, bảng này cho phép tính mức
 * thành thạo chính xác theo kỹ năng thay vì chia đều theo bài.
 */
@Entity('quiz_skills')
@Unique(['quizId', 'skillId'])
@Index(['skillId'])
export class QuizSkill extends BaseEntityCommon {
  @Column({ type: 'bigint', unsigned: true })
  quizId: number;

  @Column({ type: 'bigint', unsigned: true })
  skillId: number;

  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  weight: number;

  /**
   * Nguồn gắn kỹ năng:
   *  - 'rule'   : khớp luật trên nội dung câu hỏi (chính xác nhất)
   *  - 'lesson' : kế thừa từ kỹ năng của bài học (khi không luật nào khớp)
   *  - 'manual' : người biên tập gắn tay
   */
  @Column({ type: 'enum', enum: ['rule', 'lesson', 'manual'], default: 'rule' })
  source: 'rule' | 'lesson' | 'manual';

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill?: Skill;
}
