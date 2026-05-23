import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { ExamQuestion } from './entities/exam-question.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private examRepo: Repository<Exam>,
    @InjectRepository(ExamQuestion) private questionRepo: Repository<ExamQuestion>,
  ) {}

  findAll(subject?: string, grade?: number) {
    const where: Record<string, unknown> = { isActive: true };
    if (subject) where.subject = subject;
    if (grade) where.grade = grade;
    return this.examRepo.find({ where, order: { semester: 'ASC', id: 'ASC' } });
  }

  async findBySlug(slug: string) {
    const exam = await this.examRepo.findOne({ where: { slug, isActive: true } });
    if (!exam) throw new NotFoundException('Exam not found');
    const questions = await this.questionRepo.find({
      where: { examId: exam.id },
      order: { sortOrder: 'ASC' },
    });
    return { ...exam, questions };
  }

  async findById(id: number) {
    const exam = await this.examRepo.findOne({ where: { id, isActive: true } });
    if (!exam) throw new NotFoundException('Exam not found');
    const questions = await this.questionRepo.find({
      where: { examId: exam.id },
      order: { sortOrder: 'ASC' },
    });
    return { ...exam, questions };
  }
}
