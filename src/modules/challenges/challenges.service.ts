import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeScore } from './entities/challenge-score.entity';
import { ChallengeDaily } from './entities/challenge-daily.entity';

const DAILY_CAP = 1000; // trần điểm xếp hạng mỗi ngày (chống cày)
function currentDate(d = new Date()): string {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
}

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
    @InjectRepository(ChallengeDaily) private readonly daily: Repository<ChallengeDaily>,
  ) {}

  private normGrade(g: unknown): number {
    const n = Math.floor(Number(g) || 1);
    return Math.min(5, Math.max(1, n));
  }

  private normSubject(s: unknown): string {
    // Các môn hợp lệ của Đấu Trường/Thi Tài; môn lạ → mặc định 'toan'.
    const allow = ['toan', 'tieng-viet', 'tieng-anh', 'kham-pha', 'tong-hop'];
    return typeof s === 'string' && allow.includes(s) ? s : 'toan';
  }

  /**
   * Nộp điểm Thi Tài. Điểm mỗi ván (đúng + tốc độ + combo + câu khó) do client tính,
   * server CỘNG DỒN vào điểm NGÀY nhưng chặn TRẦN 1000/ngày (chống cày). Điểm xếp hạng
   * TUẦN = tổng điểm các ngày trong tuần. Trả về hạng tuần & tổng điểm tuần (best).
   */
  async submit(rawName: string, rawScore: number, rawGrade: unknown, rawSubject: unknown, rawTime?: unknown): Promise<{ name: string; score: number; grade: number; subject: string; rank: number; best: number; dayPoints: number; capped: boolean }> {
    const name = (rawName || 'Bé ẩn danh').toString().trim().slice(0, 40) || 'Bé ẩn danh';
    const score = Math.max(0, Math.min(999, Math.floor(Number(rawScore) || 0)));
    const timeSec = Math.max(0, Math.min(3600, Math.floor(Number(rawTime) || 0))); // giây thi lượt này (chặn 1h)
    const grade = this.normGrade(rawGrade);
    const subject = this.normSubject(rawSubject);
    const week = currentWeek();
    const date = currentDate();

    // Cộng dồn điểm ngày, chặn trần 1000; cộng dồn thời gian để phá hoà.
    let row = await this.daily.findOne({ where: { name, date, grade, subject } });
    if (!row) {
      row = this.daily.create({ name, date, week, grade, subject, points: Math.min(DAILY_CAP, score), timeSec });
    } else {
      row.points = Math.min(DAILY_CAP, row.points + score);
      row.timeSec = row.timeSec + timeSec;
    }
    await this.daily.save(row);
    const dayPoints = row.points;
    const capped = row.points >= DAILY_CAP;

    // Tổng điểm & tổng thời gian tuần của bé (cùng lớp & môn).
    const mineRaw = await this.daily
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.points), 0)', 's')
      .addSelect('COALESCE(SUM(d.timeSec), 0)', 't')
      .where('d.week = :week AND d.grade = :grade AND d.subject = :subject AND d.name = :name', { week, grade, subject, name })
      .getRawOne<{ s: string; t: string }>();
    const best = Number(mineRaw?.s || 0);
    const myTime = Number(mineRaw?.t || 0);

    // Hạng tuần = số biệt danh xếp TRÊN mình: điểm cao hơn, HOẶC bằng điểm nhưng ÍT thời gian hơn.
    const higherRaw = await this.daily
      .createQueryBuilder('d')
      .select('d.name', 'name')
      .where('d.week = :week AND d.grade = :grade AND d.subject = :subject', { week, grade, subject })
      .groupBy('d.name')
      .having('SUM(d.points) > :best OR (SUM(d.points) = :best AND SUM(d.timeSec) < :myTime)', { best, myTime })
      .getRawMany();
    return { name, score, grade, subject, rank: higherRaw.length + 1, best, dayPoints, capped };
  }

  async leaderboard(rawGrade: unknown, rawSubject: unknown, limit = 20): Promise<{ week: string; grade: number; subject: string; rows: LeaderRow[] }> {
    const week = currentWeek();
    const grade = this.normGrade(rawGrade);
    const subject = this.normSubject(rawSubject);
    // Xếp hạng theo TỔNG điểm tuần cao → thấp; bằng điểm thì TỔNG thời gian ít hơn xếp trên.
    const rows = await this.daily
      .createQueryBuilder('d')
      .select('d.name', 'name')
      .addSelect('SUM(d.points)', 'score')
      .addSelect('SUM(d.timeSec)', 'time')
      .where('d.week = :week AND d.grade = :grade AND d.subject = :subject', { week, grade, subject })
      .groupBy('d.name')
      .orderBy('score', 'DESC')
      .addOrderBy('time', 'ASC')
      .addOrderBy('MAX(d.updatedAt)', 'ASC')
      .limit(Math.min(Math.max(limit, 1), 100))
      .getRawMany<{ name: string; score: string }>();
    return { week, grade, subject, rows: rows.map((r, i) => ({ name: r.name, score: Number(r.score), rank: i + 1 })) };
  }
}
