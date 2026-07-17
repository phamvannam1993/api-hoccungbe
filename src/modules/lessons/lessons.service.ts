import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonDetail } from './entities/lesson-detail.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(LessonDetail)
    private readonly detailRepository: Repository<LessonDetail>,
  ) {}

  create(dto: CreateLessonDto) {
    const entity = this.lessonsRepository.create(dto);
    return this.lessonsRepository.save(entity);
  }

  findAll(courseId?: number, slim = false) {
    // slim = chỉ trường cần cho sitemap (không kèm quizzes/content nặng ~13MB).
    if (slim) {
      // + title/sortOrder/topicId để dựng điều hướng prev/next & bài cùng chủ đề (internal linking).
      // Sitemap chỉ đọc slug/date nên thêm field không ảnh hưởng.
      return this.lessonsRepository.find({
        where: courseId ? { courseId } : undefined,
        select: {
          id: true, slug: true, title: true, sortOrder: true, topicId: true,
          isPublished: true, updatedAt: true, createdAt: true,
        },
        order: { sortOrder: 'ASC' },
      });
    }
    return this.lessonsRepository.find({
      where: courseId ? { courseId } : undefined,
      relations: ['course', 'quizzes'],
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
      relations: ['course', 'quizzes'],
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async findBySlug(slug: string) {
    const lesson = await this.lessonsRepository.findOne({
      where: { slug },
      relations: ['course'],
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto) {
    const lesson = await this.findOne(id);
    Object.assign(lesson, dto);
    return this.lessonsRepository.save(lesson);
  }

  async findDetail(id: number) {
    const lesson = await this.findOne(id);
    const detail = await this.detailRepository.findOne({ where: { lessonId: id } });
    return { ...lesson, detail: detail || null };
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    await this.lessonsRepository.remove(lesson);
    return { message: 'Lesson deleted successfully' };
  }
}
