import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
  ) {}

  create(data: { name: string; email: string; message: string; topic?: string }) {
    return this.repo.save(this.repo.create(data));
  }

  findAll(page = 1, limit = 20) {
    return this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    }).then(([items, total]) => ({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }));
  }

  markRead(id: number) {
    return this.repo.update(id, { isRead: true });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
