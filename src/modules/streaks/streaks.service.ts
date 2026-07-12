import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningStreak } from './entities/learning-streak.entity';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}
function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

@Injectable()
export class StreaksService {
  constructor(
    @InjectRepository(LearningStreak) private readonly repo: Repository<LearningStreak>,
  ) {}

  async get(childId: number): Promise<LearningStreak> {
    let s = await this.repo.findOne({ where: { childId } });
    if (!s) s = await this.repo.save(this.repo.create({ childId }));
    return s;
  }

  /** Gọi mỗi khi bé có hoạt động học trong ngày → cập nhật chuỗi ngày. */
  async touch(childId: number): Promise<LearningStreak> {
    const s = await this.get(childId);
    const today = todayStr();
    if (s.lastActiveDate === today) return s; // đã tính hôm nay

    const gap = s.lastActiveDate ? daysBetween(s.lastActiveDate, today) : null;
    if (gap === 1) s.currentStreak += 1; // học liên tiếp
    else s.currentStreak = 1; // bắt đầu chuỗi mới (hoặc lần đầu)

    s.totalActiveDays += 1;
    s.longestStreak = Math.max(s.longestStreak, s.currentStreak);
    s.lastActiveDate = today;
    return this.repo.save(s);
  }
}
