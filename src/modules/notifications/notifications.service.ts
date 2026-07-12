import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

type CreateNotification = {
  userId?: number;
  childId?: number;
  type?: string;
  title: string;
  body?: string;
  data?: unknown;
  scheduledAt?: Date;
};

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private readonly repo: Repository<Notification>,
  ) {}

  create(dto: CreateNotification): Promise<Notification> {
    return this.repo.save(
      this.repo.create({
        ...dto,
        type: dto.type ?? 'system',
        sentAt: dto.scheduledAt ? undefined : new Date(),
      }),
    );
  }

  listForUser(userId: number, limit = 30) {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  unreadCount(userId: number) {
    return this.repo.count({ where: { userId, readAt: IsNull() } });
  }

  async markRead(id: number) {
    await this.repo.update(id, { readAt: new Date() });
    return this.repo.findOne({ where: { id } });
  }

  async markAllRead(userId: number) {
    await this.repo.update({ userId, readAt: IsNull() }, { readAt: new Date() });
    return { ok: true };
  }
}
