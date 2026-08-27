import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeScore } from './entities/challenge-score.entity';

/** Khoá tuần ISO "YYYY-Www" — server tự tính để công bằng, không tin client. */
export function currentWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export type LeaderRow = { name: string; score: number; rank: number };

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(ChallengeScore) private readonly repo: Repository<ChallengeScore>,
  ) {}

  /** Nộp điểm: giữ điểm cao nhất của biệt danh trong tuần hiện tại. Trả về điểm & hạng. */
  async submit(rawName: string, rawScore: number): Promise<{ name: string; score: number; rank: number; best: number }> {
    const name = (rawName || 'Bé ẩn danh').toString().trim().slice(0, 40) || 'Bé ẩn danh';
    const score = Math.max(0, Math.min(999, Math.floor(Number(rawScore) || 0)));
    const week = currentWeek();

    let row = await this.repo.findOne({ where: { name, week } });
    if (!row) {
      row = this.repo.create({ name, week, score });
      await this.repo.save(row);
    } else if (score > row.score) {
      row.score = score;
      await this.repo.save(row);
    }

    const best = row.score;
    // Hạng = số bé có điểm cao hơn + 1.
    const higher = await this.repo
      .createQueryBuilder('c')
      .where('c.week = :week AND c.score > :best', { week, best })
      .getCount();
    return { name, score, rank: higher + 1, best };
  }

  async leaderboard(limit = 20): Promise<{ week: string; rows: LeaderRow[] }> {
    const week = currentWeek();
    const list = await this.repo.find({
      where: { week },
      order: { score: 'DESC', updatedAt: 'ASC' },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return { week, rows: list.map((r, i) => ({ name: r.name, score: r.score, rank: i + 1 })) };
  }
}
