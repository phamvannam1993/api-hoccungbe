import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from './entities/badge.entity';
import { ChildBadge } from './entities/child-badge.entity';
import { Quest } from './entities/quest.entity';
import { ChildQuestProgress } from './entities/child-quest-progress.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Badge) private readonly badges: Repository<Badge>,
    @InjectRepository(ChildBadge) private readonly childBadges: Repository<ChildBadge>,
    @InjectRepository(Quest) private readonly quests: Repository<Quest>,
    @InjectRepository(ChildQuestProgress) private readonly cqp: Repository<ChildQuestProgress>,
  ) {}

  // ── Badges ──
  listBadges() {
    return this.badges.find({ where: { isActive: true } });
  }

  createBadge(dto: Partial<Badge>) {
    return this.badges.save(this.badges.create(dto));
  }

  createQuest(dto: Partial<Quest>) {
    return this.quests.save(this.quests.create(dto));
  }

  async childBadgeList(childId: number) {
    return this.childBadges.find({ where: { childId }, relations: { badge: true }, order: { earnedAt: 'DESC' } });
  }

  /** Trao huy hiệu cho bé theo mã (idempotent). */
  async awardBadge(childId: number, code: string): Promise<ChildBadge | null> {
    const badge = await this.badges.findOne({ where: { code } });
    if (!badge) return null;
    const existed = await this.childBadges.findOne({ where: { childId, badgeId: badge.id } });
    if (existed) return existed;
    return this.childBadges.save(this.childBadges.create({ childId, badgeId: badge.id, earnedAt: new Date() }));
  }

  // ── Quests ──
  listQuests() {
    return this.quests.find({ where: { isActive: true } });
  }

  async childQuests(childId: number) {
    const quests = await this.quests.find({ where: { isActive: true } });
    const progresses = await this.cqp.find({ where: { childId } });
    const byQuest = new Map(progresses.map((p) => [p.questId, p]));
    return quests.map((q) => ({
      quest: q,
      progress: byQuest.get(q.id)?.progress ?? 0,
      completed: byQuest.get(q.id)?.completed ?? false,
      claimed: !!byQuest.get(q.id)?.claimedAt,
    }));
  }

  /** Tăng tiến độ các nhiệm vụ cùng loại khi bé có hoạt động (gọi từ attempts/streaks). */
  async bumpQuests(childId: number, type: string, amount = 1) {
    const quests = await this.quests.find({ where: { isActive: true, type } });
    for (const q of quests) {
      let p = await this.cqp.findOne({ where: { childId, questId: q.id } });
      if (!p) p = this.cqp.create({ childId, questId: q.id, progress: 0, completed: false });
      if (p.completed) continue;
      p.progress = Math.min(p.progress + amount, q.target);
      if (p.progress >= q.target) {
        p.completed = true;
        p.completedAt = new Date();
        if (q.rewardBadgeCode) await this.awardBadge(childId, q.rewardBadgeCode);
      }
      await this.cqp.save(p);
    }
  }

  /** Đặt thẳng tiến độ (vd nhiệm vụ theo chuỗi ngày = currentStreak). */
  async setQuestProgress(childId: number, type: string, value: number) {
    const quests = await this.quests.find({ where: { isActive: true, type } });
    for (const q of quests) {
      let p = await this.cqp.findOne({ where: { childId, questId: q.id } });
      if (!p) p = this.cqp.create({ childId, questId: q.id, progress: 0, completed: false });
      if (p.completed) continue;
      p.progress = Math.min(value, q.target);
      if (p.progress >= q.target) {
        p.completed = true;
        p.completedAt = new Date();
        if (q.rewardBadgeCode) await this.awardBadge(childId, q.rewardBadgeCode);
      }
      await this.cqp.save(p);
    }
  }

  /** Trao huy hiệu, trả về thông tin nếu là huy hiệu MỚI (chưa từng có). */
  private async awardBadgeIfNew(
    childId: number,
    code: string,
  ): Promise<{ code: string; name: string; icon?: string } | null> {
    const badge = await this.badges.findOne({ where: { code } });
    if (!badge) return null;
    const existed = await this.childBadges.findOne({ where: { childId, badgeId: badge.id } });
    if (existed) return null;
    await this.childBadges.save(this.childBadges.create({ childId, badgeId: badge.id, earnedAt: new Date() }));
    return { code: badge.code, name: badge.name, icon: badge.icon };
  }

  /**
   * Áp toàn bộ hoạt động của bé lên nhiệm vụ + trao huy hiệu, trả về phần thưởng MỚI đạt được.
   * mode 'bump' cộng dồn, 'set' đặt thẳng (dùng cho chuỗi ngày).
   */
  async applyActivity(
    childId: number,
    opts: { attempts?: number; lessonsCompleted?: number; perfectScores?: number; streakDays?: number },
  ): Promise<{ newBadges: { code: string; name: string; icon?: string }[]; completedQuests: { code: string; name: string }[] }> {
    const newBadges: { code: string; name: string; icon?: string }[] = [];
    const completedQuests: { code: string; name: string }[] = [];

    const handle = async (type: string, mode: 'bump' | 'set', value: number) => {
      const quests = await this.quests.find({ where: { isActive: true, type } });
      for (const q of quests) {
        let p = await this.cqp.findOne({ where: { childId, questId: q.id } });
        if (!p) p = this.cqp.create({ childId, questId: q.id, progress: 0, completed: false });
        if (p.completed) continue;
        p.progress = mode === 'set' ? Math.min(value, q.target) : Math.min(p.progress + value, q.target);
        if (p.progress >= q.target) {
          p.completed = true;
          p.completedAt = new Date();
          completedQuests.push({ code: q.code, name: q.name });
          if (q.rewardBadgeCode) {
            const b = await this.awardBadgeIfNew(childId, q.rewardBadgeCode);
            if (b) newBadges.push(b);
          }
        }
        await this.cqp.save(p);
      }
    };

    if (opts.attempts) await handle('attempts', 'bump', opts.attempts);
    if (opts.lessonsCompleted) await handle('lessons_completed', 'bump', opts.lessonsCompleted);
    if (opts.perfectScores) await handle('perfect_scores', 'bump', opts.perfectScores);
    if (opts.streakDays != null) await handle('streak_days', 'set', opts.streakDays);

    return { newBadges, completedQuests };
  }

  async claimQuest(childId: number, questId: number) {
    const p = await this.cqp.findOne({ where: { childId, questId } });
    if (!p || !p.completed || p.claimedAt) return p;
    p.claimedAt = new Date();
    return this.cqp.save(p);
  }
}
