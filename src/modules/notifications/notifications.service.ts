import { Injectable, NotFoundException } from '@nestjs/common';
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

  /* Đánh dấu đã đọc, có kiểm chủ sở hữu.
   *
   * Ghi theo cả `id` LẪN `userId` trong một câu lệnh: kiểm trước rồi ghi sau thì
   * giữa hai bước vẫn có khe. Không trúng dòng nào thì báo không tìm thấy — không
   * nói rõ là "không có" hay "của người khác", vì nói rõ cũng là một kiểu rò rỉ. */
  async markRead(id: number, userId?: number, laAdmin = false) {
    const dieuKien = laAdmin || userId === undefined ? { id } : { id, userId };
    const kq = await this.repo.update(dieuKien, { readAt: new Date() });
    if (!kq.affected) throw new NotFoundException('Không tìm thấy thông báo');
    return this.repo.findOne({ where: { id } });
  }

  async markAllRead(userId: number) {
    await this.repo.update({ userId, readAt: IsNull() }, { readAt: new Date() });
    return { ok: true };
  }
}
