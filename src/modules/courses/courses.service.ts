import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create({
      ...dto,
    });

    return await this.coursesRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.coursesRepository.find({
      relations: ['lessons', 'createdBy', 'subscriptions'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons', 'createdBy', 'subscriptions'],
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    return course;
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    Object.assign(course, dto);

    return await this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<{ message: string }> {
    const course = await this.findOne(id);
    await this.coursesRepository.remove(course);

    return {
      message: 'Course deleted successfully',
    };
  }
}
