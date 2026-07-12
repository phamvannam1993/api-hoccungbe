import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { Course } from '../courses/entities/course.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Progress } from '../progress/entities/progress.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate) private readonly repo: Repository<Certificate>,
    @InjectRepository(Course) private readonly courses: Repository<Course>,
    @InjectRepository(Lesson) private readonly lessons: Repository<Lesson>,
    @InjectRepository(Progress) private readonly progress: Repository<Progress>,
  ) {}

  listForChild(childId: number) {
    return this.repo.find({ where: { childId }, order: { issuedAt: 'DESC' } });
  }

  /** Cấp chứng nhận nếu bé đã hoàn thành toàn bộ bài của khóa (idempotent). */
  async issue(childId: number, courseId: number, force = false): Promise<Certificate> {
    const existing = await this.repo.findOne({ where: { childId, courseId } });
    if (existing) return existing;

    const course = await this.courses.findOne({ where: { id: courseId } });
    if (!course) throw new BadRequestException('Không tìm thấy khóa học');

    if (!force) {
      const totalLessons = await this.lessons.count({ where: { courseId, isPublished: true } });
      const done = await this.progress.count({ where: { childId, courseId, status: 'completed' } });
      if (totalLessons === 0 || done < totalLessons) {
        throw new BadRequestException(
          `Bé chưa hoàn thành khóa học (${done}/${totalLessons} bài).`,
        );
      }
    }

    const code = `CERT-${courseId}-${childId}-${randomBytes(3).toString('hex').toUpperCase()}`;
    return this.repo.save(
      this.repo.create({
        childId,
        courseId,
        code,
        title: `Chứng nhận hoàn thành: ${(course as { title?: string }).title ?? 'Khóa học'}`,
        issuedAt: new Date(),
        meta: { courseTitle: (course as { title?: string }).title },
      }),
    );
  }

  verify(code: string) {
    return this.repo.findOne({ where: { code } });
  }
}
