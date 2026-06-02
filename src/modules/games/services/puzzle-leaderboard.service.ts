import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuzzleLeaderboard } from '../entities/puzzle-leaderboard.entity';
import { PuzzleProgress } from '../entities/puzzle-progress.entity';

@Injectable()
export class PuzzleLeaderboardService {
  constructor(
    @InjectRepository(PuzzleLeaderboard)
    private readonly leaderboardRepository: Repository<PuzzleLeaderboard>,
    @InjectRepository(PuzzleProgress)
    private readonly progressRepository: Repository<PuzzleProgress>,
  ) {}

  // ─── Leaderboard Queries ──────────────────────────────────────────────

  async getGlobalLeaderboard(
    limit: number = 100,
    offset: number = 0,
    sortBy: 'points' | 'time' | 'completions' = 'points',
  ) {
    const orderBy: Record<string, 'ASC' | 'DESC'> = {
      points: 'DESC',
      time: 'ASC',
      completions: 'DESC',
    };

    const leaderboard = await this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .leftJoinAndSelect('leaderboard.user', 'user')
      .leftJoinAndSelect('leaderboard.puzzle', 'puzzle')
      .orderBy(
        sortBy === 'points'
          ? 'leaderboard.pointsEarned'
          : sortBy === 'time'
            ? 'leaderboard.bestTime'
            : 'leaderboard.completedCount',
        orderBy[sortBy],
      )
      .skip(offset)
      .take(limit)
      .getMany();

    return leaderboard.map((entry, idx) => ({
      rank: offset + idx + 1,
      user: {
        id: entry.user.id,
        name: entry.user.fullName || 'Anonymous',
        avatar: entry.user.avatarUrl,
      },
      puzzle: {
        id: entry.puzzle.id,
        title: entry.puzzle.title,
      },
      pointsEarned: entry.pointsEarned,
      bestTime: entry.bestTime,
      completedCount: entry.completedCount,
      totalAttempts: entry.totalAttempts,
      successRate: entry.successRate,
      lastCompletedAt: entry.lastCompletedAt,
    }));
  }

  async getPuzzleLeaderboard(puzzleId: number, limit: number = 50) {
    return this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .leftJoinAndSelect('leaderboard.user', 'user')
      .where('leaderboard.puzzleId = :puzzleId', { puzzleId })
      .orderBy('leaderboard.pointsEarned', 'DESC')
      .addOrderBy('leaderboard.bestTime', 'ASC')
      .take(limit)
      .getMany();
  }

  async getUserLeaderboardPosition(userId: number, puzzleId?: number) {
    let query = this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .where('leaderboard.userId = :userId', { userId });

    if (puzzleId) {
      query = query.andWhere('leaderboard.puzzleId = :puzzleId', { puzzleId });
    }

    return query.getMany();
  }

  async getUserRank(userId: number, sortBy: 'points' | 'completions' = 'points') {
    const sortField = sortBy === 'points' ? 'pointsEarned' : 'completedCount';

    const userEntry = await this.leaderboardRepository.findOne({
      where: { userId },
    });

    if (!userEntry) return null;

    const rank = await this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .where(`leaderboard.${sortField} > :value`, {
        value: userEntry[sortField],
      })
      .getCount();

    return rank + 1;
  }

  // ─── Update Leaderboard ───────────────────────────────────────────────

  async updateLeaderboardFromProgress(userId: number, puzzleId: number) {
    const progress = await this.progressRepository.findOne({
      where: { userId, puzzleId },
      relations: ['puzzle', 'user'],
    });

    if (!progress) return null;

    let leaderboardEntry = await this.leaderboardRepository.findOne({
      where: { userId, puzzleId },
    });

    if (!leaderboardEntry) {
      leaderboardEntry = this.leaderboardRepository.create({
        userId,
        puzzleId,
        user: progress.user,
        puzzle: progress.puzzle,
      });
    }

    // Update stats
    leaderboardEntry.pointsEarned = progress.pointsEarned || 0;
    leaderboardEntry.bestTime = progress.bestTime || 0;
    leaderboardEntry.completedCount = progress.completedCount || 0;
    leaderboardEntry.totalAttempts = progress.attemptCount || 0;

    if (progress.firstCompletedAt) {
      leaderboardEntry.firstCompletedAt = progress.firstCompletedAt;
    }

    if (progress.lastPlayedAt) {
      leaderboardEntry.lastCompletedAt = progress.lastPlayedAt;
    }

    // Calculate success rate
    if (leaderboardEntry.totalAttempts > 0) {
      leaderboardEntry.successRate = parseFloat(
        ((leaderboardEntry.completedCount / leaderboardEntry.totalAttempts) * 100).toFixed(2),
      );
    }

    return this.leaderboardRepository.save(leaderboardEntry);
  }

  async resetLeaderboard(userId: number, puzzleId?: number) {
    if (puzzleId) {
      await this.leaderboardRepository.delete({ userId, puzzleId });
    } else {
      await this.leaderboardRepository.delete({ userId });
    }
    return { message: 'Leaderboard reset successfully' };
  }

  // ─── Analytics ────────────────────────────────────────────────────────

  async getUserStats(userId: number) {
    const entries = await this.leaderboardRepository.find({
      where: { userId },
      relations: ['puzzle'],
    });

    const totalPoints = entries.reduce((sum, e) => sum + e.pointsEarned, 0);
    const totalCompletions = entries.reduce((sum, e) => sum + e.completedCount, 0);
    const avgSuccessRate =
      entries.length > 0
        ? entries.reduce((sum, e) => sum + e.successRate, 0) / entries.length
        : 0;

    const fastestTime = Math.min(
      ...entries
        .filter((e) => e.bestTime && e.bestTime > 0)
        .map((e) => e.bestTime as number),
      Infinity,
    );

    return {
      totalPoints,
      totalCompletions,
      totalPuzzlesSolved: entries.length,
      averageSuccessRate: parseFloat(avgSuccessRate.toFixed(2)),
      fastestCompletionTime: fastestTime === Infinity ? 0 : fastestTime,
      puzzleStats: entries,
    };
  }

  async getTopPlayers(limit: number = 10) {
    return this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .leftJoinAndSelect('leaderboard.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('user.avatar', 'userAvatar')
      .addSelect('SUM(leaderboard.pointsEarned)', 'totalPoints')
      .addSelect('COUNT(leaderboard.id)', 'puzzleCount')
      .addSelect('AVG(leaderboard.successRate)', 'avgSuccessRate')
      .groupBy('leaderboard.userId')
      .orderBy('totalPoints', 'DESC')
      .take(limit)
      .getRawMany();
  }
}
