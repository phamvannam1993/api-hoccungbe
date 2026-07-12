import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { WeeklyReport } from './entities/weekly-report.entity';
import { QuizAttempt } from '../attempts/entities/quiz-attempt.entity';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { SkillsService } from '../skills/skills.service';
import { NotificationsService } from '../notifications/notifications.service';

function mondayOf(d: Date): Date {
  const x = new Date(d);
  const day = x.getDay(); // 0=CN
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0, 0, 0, 0);
  return x;
}
function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(WeeklyReport) private readonly reports: Repository<WeeklyReport>,
    @InjectRepository(QuizAttempt) private readonly attempts: Repository<QuizAttempt>,
    @InjectRepository(ChildProfile) private readonly children: Repository<ChildProfile>,
    private readonly skills: SkillsService,
    private readonly notifications: NotificationsService,
  ) {}

  listForChild(childId: number) {
    return this.reports.find({ where: { childId }, order: { weekStart: 'DESC' } });
  }

  /** Tạo báo cáo tuần cho bé + gửi thông báo cho phụ huynh. */
  async generateForChild(childId: number, weekStartStr?: string, notify = true): Promise<WeeklyReport> {
    const start = weekStartStr ? mondayOf(new Date(weekStartStr)) : mondayOf(new Date());
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const attempts = await this.attempts.find({
      where: { childId, createdAt: Between(start, end) },
    });

    const attemptsCount = attempts.length;
    const totalQuestions = attempts.reduce((s, a) => s + a.totalQuestions, 0);
    const totalCorrect = attempts.reduce((s, a) => s + a.correctCount, 0);
    const totalTimeSec = attempts.reduce((s, a) => s + (a.timeSpentSec ?? 0), 0);
    const avgScore = attemptsCount
      ? Math.round((attempts.reduce((s, a) => s + Number(a.score), 0) / attemptsCount) * 100) / 100
      : 0;
    const lessonsPracticed = new Set(attempts.map((a) => a.lessonId)).size;

    const mastery = await this.skills.getChildMastery(childId);
    const practiced = mastery.filter((m) => m.totalCount > 0);
    const bestSkill = practiced[0]
      ? { name: practiced[0].skill?.name, percent: Number(practiced[0].masteryPercent) }
      : null;
    const weakestSkill = practiced.length
      ? {
          name: practiced[practiced.length - 1].skill?.name,
          percent: Number(practiced[practiced.length - 1].masteryPercent),
        }
      : null;

    const stats = {
      weekStart: toDateStr(start),
      attemptsCount,
      lessonsPracticed,
      totalQuestions,
      totalCorrect,
      accuracy: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 10000) / 100 : 0,
      avgScore,
      totalTimeMinutes: Math.round(totalTimeSec / 60),
      bestSkill,
      weakestSkill,
    };

    const weekStart = toDateStr(start);
    let report = await this.reports.findOne({ where: { childId, weekStart } });
    if (!report) report = this.reports.create({ childId, weekStart });
    report.stats = stats;
    report.sentAt = new Date();
    report = await this.reports.save(report);

    if (notify) {
      const child = await this.children.findOne({ where: { id: childId } });
      const userId = (child as { userId?: number } | null)?.userId;
      const name = (child as { fullName?: string } | null)?.fullName ?? 'bé';
      if (userId) {
        await this.notifications.create({
          userId,
          childId,
          type: 'report',
          title: `Báo cáo tuần của ${name}`,
          body: `Tuần này ${name} làm ${attemptsCount} bài, điểm trung bình ${avgScore}, học ${lessonsPracticed} bài.`,
          data: stats,
        });
      }
    }

    return report;
  }
}
