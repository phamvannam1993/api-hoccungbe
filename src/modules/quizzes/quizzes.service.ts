import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizzesRepository: Repository<Quiz>,
  ) {}

  create(dto: CreateQuizDto) {
    const entity = this.quizzesRepository.create(dto);
    return this.quizzesRepository.save(entity);
  }

  findAll() {
    return this.quizzesRepository.find({ relations: ['lesson'] });
  }

  async findOne(id: number) {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['lesson'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async update(id: number, dto: UpdateQuizDto) {
    const quiz = await this.findOne(id);
    Object.assign(quiz, dto);
    return this.quizzesRepository.save(quiz);
  }

  async remove(id: number) {
    const quiz = await this.findOne(id);
    await this.quizzesRepository.remove(quiz);
    return { message: 'Quiz deleted successfully' };
  }
}
