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

  private normGrade(g: unknown): number {
    const n = Math.floor(Number(g) || 1);
    return Math.min(5, Math.max(1, n));
  }

  private normSubject(s: unknown): string {
    return s === 'kham-pha' ? 'kham-pha' : 'toan';
  }

  /** Nộp điểm: giữ điểm cao nhất của biệt danh trong tuần, lớp & môn hiện tại. Trả về điểm & hạng. */
  async submit(rawName: string, rawScore: number, rawGrade: unknown, rawSubject: unknown): Promise<{ name: string; score: number; grade: number; subject: string; rank: number; best: number }> {
    const name = (rawName || 'Bé ẩn danh').toString().trim().slice(0, 40) || 'Bé ẩn danh';
    const score = Math.max(0, Math.min(999, Math.floor(Number(rawScore) || 0)));
    const grade = this.normGrade(rawGrade);
    const subject = this.normSubject(rawSubject);
    const week = currentWeek();

    let row = await this.repo.findOne({ where: { name, week, grade, subject } });
    if (!row) {
      row = this.repo.create({ name, week, grade, subject, score });
      await this.repo.save(row);
    } else if (score > row.score) {
      row.score = score;
      await this.repo.save(row);
    }

    const best = row.score;
    // Hạng trong CÙNG lớp & CÙNG môn = số bé có điểm cao hơn + 1.
    const higher = await this.repo
      .createQueryBuilder('c')
      .where('c.week = :week AND c.grade = :grade AND c.subject = :subject AND c.score > :best', { week, grade, subject, best })
      .getCount();
    return { name, score, grade, subject, rank: higher + 1, best };
  }

  async leaderboard(rawGrade: unknown, rawSubject: unknown, limit = 20): Promise<{ week: string; grade: number; subject: string; rows: LeaderRow[] }> {
    const week = currentWeek();
    const grade = this.normGrade(rawGrade);
    const subject = this.normSubject(rawSubject);
    const list = await this.repo.find({
      where: { week, grade, subject },
      order: { score: 'DESC', updatedAt: 'ASC' },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return { week, grade, subject, rows: list.map((r, i) => ({ name: r.name, score: r.score, rank: i + 1 })) };
  }
}
