import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
  ) {}

  async create(dto: CreateTopicDto): Promise<Topic> {
    const topic = this.topicsRepository.create(dto);
    return await this.topicsRepository.save(topic);
  }

  async findAll(courseId?: number, volumeId?: number): Promise<Topic[]> {
    const where: Record<string, any> = {};
    if (courseId) where.courseId = courseId;
    if (volumeId) where.volumeId = volumeId;
    return await this.topicsRepository.find({
      where,
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Topic> {
    const topic = await this.topicsRepository.findOne({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic with id ${id} not found`);
    }
    return topic;
  }

  async update(id: number, dto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOne(id);
    Object.assign(topic, dto);
    return await this.topicsRepository.save(topic);
  }

  async remove(id: number): Promise<{ message: string }> {
    const topic = await this.findOne(id);
    await this.topicsRepository.remove(topic);
    return { message: 'Topic deleted successfully' };
  }
}
