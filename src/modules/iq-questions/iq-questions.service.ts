import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IqQuestion } from './entities/iq-question.entity';
import { CreateIqQuestionDto } from './dto/create-iq-question.dto';
import { UpdateIqQuestionDto } from './dto/update-iq-question.dto';

// Format thô của bộ câu hỏi (snake_case) — cho endpoint /import, dán trực tiếp mảng vào.
export type RawIqQuestion = {
  id?: string;
  subject?: string;
  lesson?: string;
  question: string;
  question_speech?: string;
  options: string[];
  correct_index: number;
  countdown?: string[];
  explanation?: string;
  explanation_speech?: string;
};

@Injectable()
export class IqQuestionsService {
  constructor(
    @InjectRepository(IqQuestion)
    private readonly repo: Repository<IqQuestion>,
  ) {}

  create(dto: CreateIqQuestionDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(grade?: number, isActive?: string, page = 1, limit = 100) {
    const qb = this.repo.createQueryBuilder('q');
    if (grade) qb.andWhere('q.grade = :grade', { grade });
    if (isActive === 'true' || isActive === 'false') qb.andWhere('q.isActive = :a', { a: isActive === 'true' });
    qb.orderBy('q.grade', 'ASC').addOrderBy('q.sortOrder', 'ASC').addOrderBy('q.id', 'ASC');
    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total, page, limit };
  }

  // Dùng cho frontend: chỉ câu ĐANG hoạt động của một lớp, đã sắp thứ tự.
  findByGrade(grade: number) {
    return this.repo.find({
      where: { grade, isActive: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Câu hỏi IQ không tồn tại');
    return item;
  }

  async update(id: number, dto: UpdateIqQuestionDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: 'IQ question deleted successfully' };
  }

  /**
   * Import cả bộ câu hỏi cho MỘT lớp theo đúng format gốc (snake_case).
   * Có `id` (code) thì upsert theo code (chạy lại an toàn), không thì thêm mới.
   */
  async importQuestions(grade: number, questions: RawIqQuestion[]) {
    let created = 0;
    let updated = 0;
    let order = 1;
    for (const raw of questions) {
      const payload: Partial<IqQuestion> = {
        code: raw.id,
        grade,
        subject: raw.subject,
        lesson: raw.lesson,
        question: raw.question,
        questionSpeech: raw.question_speech,
        optionsJson: raw.options ?? [],
        correctIndex: raw.correct_index ?? 0,
        countdownJson: raw.countdown,
        explanation: raw.explanation,
        explanationSpeech: raw.explanation_speech,
        sortOrder: order++,
        isActive: true,
      };

      const existing = raw.id ? await this.repo.findOne({ where: { code: raw.id } }) : null;
      if (existing) {
        Object.assign(existing, payload);
        await this.repo.save(existing);
        updated++;
      } else {
        await this.repo.save(this.repo.create(payload));
        created++;
      }
    }
    return { grade, received: questions.length, created, updated };
  }
}
