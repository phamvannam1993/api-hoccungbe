import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  create(dto: CreateLessonDto) {
    const entity = this.lessonsRepository.create(dto);
    return this.lessonsRepository.save(entity);
  }

  findAll() {
    return this.lessonsRepository.find({ relations: ['course', 'quizzes'] });
  }

  async findOne(id: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id },
      relations: ['course', 'quizzes'],
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto) {
    const lesson = await this.findOne(id);
    Object.assign(lesson, dto);
    return this.lessonsRepository.save(lesson);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    await this.lessonsRepository.remove(lesson);
    return { message: 'Lesson deleted successfully' };
  }
}
