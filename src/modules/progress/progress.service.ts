import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './entities/progress.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  create(dto: CreateProgressDto) {
    const entity = this.progressRepository.create(dto);
    return this.progressRepository.save(entity);
  }

  findAll() {
    return this.progressRepository.find({
      relations: ['child', 'course', 'lesson'],
    });
  }

  async findOne(id: number) {
    const item = await this.progressRepository.findOne({
      where: { id },
      relations: ['child', 'course', 'lesson'],
    });
    if (!item) throw new NotFoundException('Progress not found');
    return item;
  }

  async update(id: number, dto: UpdateProgressDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.progressRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.progressRepository.remove(item);
    return { message: 'Progress deleted successfully' };
  }
}
