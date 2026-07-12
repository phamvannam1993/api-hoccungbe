import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { LearningStreak } from '../streaks/entities/learning-streak.entity';
import { ReportsService } from '../reports/reports.service';
import { NotificationsService } from '../notifications/notifications.service';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

@Injectable()
export class BatchService {
  private readonly logger = new Logger('BatchService');

  constructor(
    @InjectRepository(ChildProfile) private readonly children: Repository<ChildProfile>,
    @InjectRepository(LearningStreak) private readonly streaks: Repository<LearningStreak>,
    private readonly reports: ReportsService,
    private readonly notifications: NotificationsService,
  ) {}

  /** Sinh báo cáo tuần cho tất cả bé (gọi định kỳ mỗi Chủ nhật). */
  async generateWeeklyReports(): Promise<{ generated: number }> {
    const children = await this.children.find();
    let generated = 0;
    for (const child of children) {
      try {
        await this.reports.generateForChild(child.id);
        generated += 1;
      } catch (e) {
        this.logger.warn(`Weekly report lỗi cho child ${child.id}: ${(e as Error).message}`);
      }
    }
    return { generated };
  }

  /** Gửi thông báo nhắc học cho phụ huynh của các bé chưa học hôm nay. */
  async sendStudyReminders(): Promise<{ sent: number }> {
    const children = await this.children.find();
    const today = todayStr();
    let sent = 0;
    for (const child of children) {
      const userId = (child as { userId?: number }).userId;
      if (!userId) continue;
      const streak = await this.streaks.findOne({ where: { childId: child.id } });
      const activeToday = streak?.lastActiveDate === today;
      if (activeToday) continue;
      const name = (child as { fullName?: string }).fullName ?? 'bé';
      const streakTxt = streak?.currentStreak
        ? ` Đừng để chuỗi ${streak.currentStreak} ngày bị đứt nhé!`
        : '';
      try {
        await this.notifications.create({
          userId,
          childId: child.id,
          type: 'reminder',
          title: `Nhắc học cho ${name}`,
          body: `Hôm nay ${name} chưa học bài nào.${streakTxt} Cùng con học 10 phút nhé!`,
        });
        sent += 1;
      } catch {
        // bỏ qua
      }
    }
    return { sent };
  }
}
