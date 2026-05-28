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

  findAll(subject?: string, grade?: number, includeInactive = false) {
    const where: Record<string, unknown> = {};
    if (!includeInactive) where.isActive = true;
    if (subject) where.subject = subject;
    if (grade) where.grade = grade;
    return this.examRepo.find({ where, order: { grade: 'ASC', semester: 'ASC', id: 'ASC' } });
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
    const exam = await this.examRepo.findOne({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    const questions = await this.questionRepo.find({
      where: { examId: exam.id },
      order: { sortOrder: 'ASC' },
    });
    return { ...exam, questions };
  }

  async create(dto: Partial<Exam>) {
    const exam = this.examRepo.create(dto);
    return this.examRepo.save(exam);
  }

  async update(id: number, dto: Partial<Exam>) {
    const exam = await this.examRepo.findOne({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    Object.assign(exam, dto);
    return this.examRepo.save(exam);
  }

  async delete(id: number) {
    const exam = await this.examRepo.findOne({ where: { id } });
    if (!exam) throw new NotFoundException('Exam not found');
    await this.examRepo.remove(exam);
    return { success: true };
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  listQuestions(examId: number) {
    return this.questionRepo.find({ where: { examId }, order: { sortOrder: 'ASC' } });
  }

  async createQuestion(examId: number, dto: Partial<ExamQuestion>) {
    const exam = await this.examRepo.findOne({ where: { id: examId } });
    if (!exam) throw new NotFoundException('Exam not found');
    const q = this.questionRepo.create({ ...dto, examId });
    return this.questionRepo.save(q);
  }

  async updateQuestion(examId: number, qid: number, dto: Partial<ExamQuestion>) {
    const q = await this.questionRepo.findOne({ where: { id: qid, examId } });
    if (!q) throw new NotFoundException('Question not found');
    Object.assign(q, dto);
    return this.questionRepo.save(q);
  }

  async deleteQuestion(examId: number, qid: number) {
    const q = await this.questionRepo.findOne({ where: { id: qid, examId } });
    if (!q) throw new NotFoundException('Question not found');
    await this.questionRepo.remove(q);
    return { success: true };
  }
}
