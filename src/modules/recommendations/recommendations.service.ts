import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DailyRecommendation } from './entities/daily-recommendation.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { AttemptAnswer } from '../attempts/entities/attempt-answer.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

type Kind = 'review_wrong' | 'current' | 'review_old' | 'challenge';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(DailyRecommendation) private readonly repo: Repository<DailyRecommendation>,
    @InjectRepository(Progress) private readonly progress: Repository<Progress>,
    @InjectRepository(Lesson) private readonly lessons: Repository<Lesson>,
    @InjectRepository(AttemptAnswer) private readonly answers: Repository<AttemptAnswer>,
    @InjectRepository(Quiz) private readonly quizzes: Repository<Quiz>,
  ) {}

  /** Gợi ý của ngày (tự sinh nếu chưa có), kèm slug + tên bài để FE gắn link đúng. */
  async getForDay(childId: number, date?: string) {
    const forDate = date ?? todayStr();
    let recs = await this.repo.find({
      where: { childId, forDate },
      order: { sortOrder: 'ASC' },
    });
    // Nếu recs cũ còn trỏ tới bài không thuộc khóa học đã xuất bản → sinh lại.
    if (recs.length && !(await this.allInPublishedCourses(recs.map((r) => r.lessonId)))) {
      recs = [];
    }
    if (!recs.length) recs = await this.generate(childId, forDate);
    return this.withLessonInfo(recs);
  }

  /** Kiểm tra tất cả lessonId đều thuộc khóa học đã xuất bản. */
  private async allInPublishedCourses(lessonIds: number[]): Promise<boolean> {
    if (!lessonIds.length) return true;
    const valid = await this.lessons
      .createQueryBuilder('l')
      .innerJoin('courses', 'co', 'co.id = l.courseId')
      .where('l.id IN (:...ids)', { ids: lessonIds })
      .andWhere('l.isPublished = true')
      .andWhere('co.isPublished = true')
      .getCount();
    return valid === lessonIds.length;
  }

  /** Gắn slug + title của bài học vào mỗi gợi ý (để link tới đúng trang bài học). */
  private async withLessonInfo(recs: DailyRecommendation[]) {
    const ids = [...new Set(recs.map((r) => r.lessonId))];
    const lessons = ids.length ? await this.lessons.find({ where: { id: In(ids) } }) : [];
    const byId = new Map(lessons.map((l) => [l.id, l]));
    return recs.map((r) => {
      const l = byId.get(r.lessonId);
      return {
        ...r,
        lessonSlug: l?.slug ?? null,
        lessonTitle: l?.title ?? null,
      };
    });
  }

  /**
   * Bài học (thuộc khóa đã xuất bản) mà bé đang sai nhiều câu nhất — cho task "Ôn câu sai".
   * Lấy lần trả lời GẦN NHẤT của mỗi câu; nếu sai thì tính vào bài chứa câu đó.
   */
  private async topWrongLesson(
    childId: number,
    validLessonIds: Set<number>,
  ): Promise<{ lessonId: number; count: number } | null> {
    const lastPerQuiz = await this.answers
      .createQueryBuilder('a')
      .select('a.quizId', 'quizId')
      .addSelect('MAX(a.id)', 'lastId')
      .where('a.childId = :childId', { childId })
      .groupBy('a.quizId')
      .getRawMany<{ quizId: number; lastId: number }>();
    if (!lastPerQuiz.length) return null;

    const lastIds = lastPerQuiz.map((r) => r.lastId);
    const lastAnswers = await this.answers.find({ where: { id: In(lastIds) } });
    const wrongQuizIds = lastAnswers.filter((a) => !a.isCorrect).map((a) => a.quizId);
    if (!wrongQuizIds.length) return null;

    const quizzes = await this.quizzes.find({
      where: { id: In(wrongQuizIds) },
      select: { id: true, lessonId: true },
    });
    const countByLesson = new Map<number, number>();
    for (const q of quizzes) {
      if (!validLessonIds.has(q.lessonId)) continue; // bỏ câu thuộc bài/khóa chưa xuất bản
      countByLesson.set(q.lessonId, (countByLesson.get(q.lessonId) ?? 0) + 1);
    }
    let best: { lessonId: number; count: number } | null = null;
    for (const [lessonId, count] of countByLesson) {
      if (!best || count > best.count) best = { lessonId, count };
    }
    return best;
  }

  /**
   * Sinh kế hoạch hôm nay theo CÔNG THỨC 40/30/20/10:
   *  - 40% Ôn câu sai (review_wrong)   — bài bé đang sai nhiều nhất, học ở chế độ ôn câu sai.
   *  - 30% Bài đang học (current)      — bài tiếp theo chưa hoàn thành trong lộ trình.
   *  - 20% Ôn lại kiến thức cũ (review_old) — một bài đã hoàn thành, nhắc lại cho nhớ lâu.
   *  - 10% Thử thách (challenge)       — một bài ở phía trước để nâng năng lực.
   * Không đủ dữ liệu ở phần nào thì bỏ qua phần đó (vẫn ra kế hoạch hợp lệ).
   */
  async generate(childId: number, date?: string): Promise<DailyRecommendation[]> {
    const forDate = date ?? todayStr();
    await this.repo.delete({ childId, forDate });

    const done = await this.progress.find({ where: { childId, status: 'completed' } });
    const doneIds = new Set(done.map((p) => p.lessonId));
    const learningCourseIds = [
      ...new Set(done.map((p) => (p as { courseId?: number }).courseId).filter(Boolean)),
    ] as number[];

    // Ứng viên: bài thuộc khóa đã xuất bản, ưu tiên khóa bé đang học rồi tới khóa khác.
    const candidates = await this.lessons
      .createQueryBuilder('l')
      .innerJoin('courses', 'co', 'co.id = l.courseId')
      .where('l.isPublished = :lp', { lp: true })
      .andWhere('co.isPublished = :cp', { cp: true })
      .orderBy(
        learningCourseIds.length
          ? `CASE WHEN l.courseId IN (${learningCourseIds.join(',')}) THEN 0 ELSE 1 END`
          : 'l.courseId',
        'ASC',
      )
      .addOrderBy('l.sortOrder', 'ASC')
      .take(400)
      .getMany();

    const courseOf = (l: Lesson) => (l as { courseId?: number }).courseId;
    const validLessonIds = new Set(candidates.map((l) => l.id));
    const undone = candidates.filter((l) => !doneIds.has(l.id));
    const doneCandidates = candidates.filter((l) => doneIds.has(l.id));
    const used = new Set<number>();

    const plan: Array<{ kind: Kind; lessonId: number; courseId?: number; reason: string; wrongCount?: number }> = [];

    // 40% — Ôn câu sai
    const wrong = await this.topWrongLesson(childId, validLessonIds);
    if (wrong && wrong.count > 0) {
      plan.push({
        kind: 'review_wrong',
        lessonId: wrong.lessonId,
        courseId: courseOf(candidates.find((l) => l.id === wrong.lessonId)!),
        reason: `Ôn ${wrong.count} câu con từng làm sai`,
        wrongCount: wrong.count,
      });
      used.add(wrong.lessonId);
    }

    // 30% — Bài đang học (bài tiếp theo chưa hoàn thành)
    const current = undone.find((l) => !used.has(l.id));
    if (current) {
      plan.push({
        kind: 'current',
        lessonId: current.id,
        courseId: courseOf(current),
        reason: 'Bài mới tiếp theo trong lộ trình của con',
      });
      used.add(current.id);
    }

    // 20% — Ôn lại kiến thức cũ (một bài đã hoàn thành)
    const reviewOld = doneCandidates.find((l) => !used.has(l.id));
    if (reviewOld) {
      plan.push({
        kind: 'review_old',
        lessonId: reviewOld.id,
        courseId: courseOf(reviewOld),
        reason: 'Ôn lại kiến thức đã học cho nhớ lâu',
      });
      used.add(reviewOld.id);
    }

    // 10% — Thử thách (một bài ở phía trước, khó hơn)
    const remainingAhead = undone.filter((l) => !used.has(l.id));
    const challenge = remainingAhead[2] ?? remainingAhead[remainingAhead.length - 1];
    if (challenge) {
      plan.push({
        kind: 'challenge',
        lessonId: challenge.id,
        courseId: courseOf(challenge),
        reason: 'Thử thách nâng cao năng lực',
      });
      used.add(challenge.id);
    }

    const recs = plan.map((p, i) =>
      this.repo.create({
        childId,
        forDate,
        lessonId: p.lessonId,
        courseId: p.courseId,
        kind: p.kind,
        wrongCount: p.wrongCount,
        reason: p.reason,
        status: 'pending',
        sortOrder: i + 1,
      }),
    );
    return recs.length ? this.repo.save(recs) : [];
  }

  async setStatus(id: number, status: 'pending' | 'done' | 'skipped') {
    await this.repo.update(id, { status });
    return this.repo.findOne({ where: { id } });
  }

  /** Đánh dấu đã học xong các gợi ý gắn với một bài (gọi khi bé hoàn thành bài). */
  async markLessonDone(childId: number, lessonId: number) {
    await this.repo.update(
      { childId, lessonId, forDate: todayStr(), status: 'pending' },
      { status: 'done' },
    );
  }

  async findByIds(ids: number[]) {
    return ids.length ? this.repo.find({ where: { id: In(ids) } }) : [];
  }
}
