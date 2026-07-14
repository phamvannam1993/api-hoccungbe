import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { AttemptAnswer } from './entities/attempt-answer.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { RecordAttemptDto } from './dto/record-attempt.dto';
import { StreaksService } from '../streaks/streaks.service';
import { RecommendationsService } from '../recommendations/recommendations.service';
import { GamificationService } from '../gamification/gamification.service';
import { SkillsService } from '../skills/skills.service';

function starsForScore(score: number): number {
  if (score >= 90) return 3;
  if (score >= 70) return 2;
  if (score >= 50) return 1;
  return 0;
}

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(QuizAttempt) private readonly attempts: Repository<QuizAttempt>,
    @InjectRepository(AttemptAnswer) private readonly answers: Repository<AttemptAnswer>,
    @InjectRepository(Progress) private readonly progress: Repository<Progress>,
    @InjectRepository(Quiz) private readonly quizzes: Repository<Quiz>,
    private readonly streaks: StreaksService,
    private readonly recommendations: RecommendationsService,
    private readonly gamification: GamificationService,
    private readonly skills: SkillsService,
  ) {}

  /** Lưu 1 lần làm bài + từng câu trả lời, đồng thời cập nhật tiến độ bài học. */
  async record(dto: RecordAttemptDto) {
    const total = dto.answers.length;
    const correct = dto.answers.filter((a) => a.isCorrect).length;
    const score = total ? Math.round((correct / total) * 10000) / 100 : 0;
    const exerciseNumber = dto.exerciseNumber ?? 1;

    // Làm lại → cập nhật kết quả cũ (mỗi childId+lessonId+exerciseNumber chỉ giữ 1 bản ghi).
    let attempt = await this.attempts.findOne({
      where: { childId: dto.childId, lessonId: dto.lessonId, exerciseNumber },
      order: { id: 'DESC' },
    });
    const isRedo = !!attempt;
    if (attempt) {
      attempt.courseId = dto.courseId ?? attempt.courseId;
      attempt.difficultyLevel = dto.difficultyLevel ?? attempt.difficultyLevel;
      attempt.totalQuestions = total;
      attempt.correctCount = correct;
      attempt.score = score;
      attempt.timeSpentSec = dto.timeSpentSec ?? 0;
      attempt.status = 'completed';
      attempt.completedAt = new Date();
    } else {
      attempt = this.attempts.create({
        childId: dto.childId,
        lessonId: dto.lessonId,
        courseId: dto.courseId,
        exerciseNumber,
        difficultyLevel: dto.difficultyLevel,
        totalQuestions: total,
        correctCount: correct,
        score,
        timeSpentSec: dto.timeSpentSec ?? 0,
        status: 'completed',
        completedAt: new Date(),
      });
    }
    attempt = await this.attempts.save(attempt);

    if (total) {
      // Làm lại: xóa câu trả lời cũ, thay bằng lần làm mới nhất.
      if (isRedo) await this.answers.delete({ attemptId: attempt.id });
      await this.answers.save(
        dto.answers.map((a) =>
          this.answers.create({
            attemptId: attempt!.id,
            quizId: a.quizId,
            childId: dto.childId,
            isCorrect: a.isCorrect,
            selectedAnswer: a.selectedAnswer ?? null,
            timeSpentSec: a.timeSpentSec ?? 0,
          }),
        ),
      );
    }

    await this.upsertLessonProgress(dto, score);
    const rewards = await this.runEngagement(dto, score);
    return { attempt, rewards };
  }

  /** Cập nhật gắn kết sau khi làm bài + trả về phần thưởng mới đạt. Không chặn nếu lỗi. */
  private async runEngagement(dto: RecordAttemptDto, score: number) {
    const empty = { newBadges: [], completedQuests: [] };
    try {
      const total = dto.answers.length;
      const correct = dto.answers.filter((a) => a.isCorrect).length;
      await this.skills.updateMasteryFromLesson(dto.childId, dto.lessonId, correct, total);
      const streak = await this.streaks.touch(dto.childId);
      await this.recommendations.markLessonDone(dto.childId, dto.lessonId);
      return this.gamification.applyActivity(dto.childId, {
        attempts: 1,
        lessonsCompleted: score >= 50 ? 1 : 0,
        perfectScores: score >= 100 ? 1 : 0,
        streakDays: streak.currentStreak,
      });
    } catch {
      return empty;
    }
  }

  private async upsertLessonProgress(dto: RecordAttemptDto, score: number) {
    if (!dto.courseId) return;
    const now = new Date();
    let p = await this.progress.findOne({
      where: { childId: dto.childId, lessonId: dto.lessonId },
    });
    if (!p) {
      p = this.progress.create({
        childId: dto.childId,
        courseId: dto.courseId,
        lessonId: dto.lessonId,
        startedAt: now,
        attemptsCount: 0,
      });
    }
    p.attemptsCount = (p.attemptsCount ?? 0) + 1;
    // Giữ điểm cao nhất
    p.score = Math.max(Number(p.score ?? 0), score);
    p.starsEarned = Math.max(p.starsEarned ?? 0, starsForScore(score));
    p.completionPercent = Math.max(p.completionPercent ?? 0, Math.round(score));
    p.status = score >= 50 ? 'completed' : 'in_progress';
    if (score >= 50 && !p.completedAt) p.completedAt = now;
    p.lastAccessedAt = now;
    await this.progress.save(p);
  }

  /** Danh sách câu bé từng làm SAI (mới nhất mỗi câu) — cho tính năng "Ôn lại câu sai". */
  async getWrongAnswers(childId: number, limit = 50) {
    // Lấy các quizId mà lần trả lời gần nhất là sai.
    const rows = await this.answers
      .createQueryBuilder('a')
      .select('a.quizId', 'quizId')
      .addSelect('MAX(a.id)', 'lastId')
      .where('a.childId = :childId', { childId })
      .groupBy('a.quizId')
      .getRawMany<{ quizId: number; lastId: number }>();

    if (!rows.length) return [];
    const lastIds = rows.map((r) => r.lastId);
    const lastAnswers = await this.answers.find({ where: lastIds.map((id) => ({ id })) });
    const wrongQuizIds = lastAnswers.filter((a) => !a.isCorrect).map((a) => a.quizId).slice(0, limit);
    if (!wrongQuizIds.length) return [];
    const quizzes = await this.quizzes.find({ where: wrongQuizIds.map((id) => ({ id })) });
    return quizzes;
  }

  /** Thống kê nhanh cho Dashboard phụ huynh. */
  async getChildStats(childId: number) {
    const attempts = await this.attempts.find({ where: { childId } });
    const totalAttempts = attempts.length;
    const avgScore = totalAttempts
      ? Math.round((attempts.reduce((s, a) => s + Number(a.score), 0) / totalAttempts) * 100) / 100
      : 0;
    const totalTimeSec = attempts.reduce((s, a) => s + (a.timeSpentSec ?? 0), 0);
    const totalQuestions = attempts.reduce((s, a) => s + a.totalQuestions, 0);
    const totalCorrect = attempts.reduce((s, a) => s + a.correctCount, 0);
    const lessonsCompleted = await this.progress.count({
      where: { childId, status: 'completed' },
    });
    return {
      childId,
      totalAttempts,
      avgScore,
      accuracy: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 10000) / 100 : 0,
      totalTimeSec,
      totalQuestions,
      totalCorrect,
      lessonsCompleted,
    };
  }

  /** Lịch sử làm bài gần đây của bé. */
  async getHistory(childId: number, limit = 20) {
    // Kèm môn học (courseType) + tên/slug bài để FE dựng bảng theo dõi & liên kết.
    const rows = await this.attempts.find({
      where: { childId },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: { lesson: { course: true } },
    });
    return rows.map((a) => ({
      id: a.id,
      lessonId: a.lessonId,
      lessonTitle: a.lesson?.title ?? null,
      lessonSlug: a.lesson?.slug ?? null,
      courseType: a.lesson?.course?.courseType ?? null,
      exerciseNumber: a.exerciseNumber,
      difficultyLevel: a.difficultyLevel,
      score: a.score,
      correctCount: a.correctCount,
      totalQuestions: a.totalQuestions,
      createdAt: a.createdAt,
    }));
  }

  /** Trạng thái làm bài của bé theo từng bài tập trong 1 bài học (cho danh sách bài tập). */
  async getLessonStatus(childId: number, lessonId: number) {
    const rows = await this.attempts.find({ where: { childId, lessonId } });
    // Mỗi exerciseNumber giữ bản ghi điểm cao nhất (phòng dữ liệu cũ có trùng).
    const byExercise = new Map<number, { score: number; correctCount: number; totalQuestions: number }>();
    for (const a of rows) {
      const score = Number(a.score);
      const cur = byExercise.get(a.exerciseNumber);
      if (!cur || score > cur.score) {
        byExercise.set(a.exerciseNumber, { score, correctCount: a.correctCount, totalQuestions: a.totalQuestions });
      }
    }
    return Array.from(byExercise.entries()).map(([exerciseNumber, v]) => ({
      exerciseNumber,
      score: v.score,
      correctCount: v.correctCount,
      totalQuestions: v.totalQuestions,
      stars: starsForScore(v.score),
      completed: v.score >= 50,
    }));
  }
}
