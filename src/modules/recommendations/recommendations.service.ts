import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DailyRecommendation } from './entities/daily-recommendation.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(DailyRecommendation) private readonly repo: Repository<DailyRecommendation>,
    @InjectRepository(Progress) private readonly progress: Repository<Progress>,
    @InjectRepository(Lesson) private readonly lessons: Repository<Lesson>,
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
   * Sinh gợi ý: ưu tiên các bài CHƯA hoàn thành theo thứ tự lộ trình.
   * (Heuristic đơn giản; có thể nâng cấp theo điểm yếu/kỹ năng sau.)
   */
  async generate(childId: number, date?: string, limit = 3): Promise<DailyRecommendation[]> {
    const forDate = date ?? todayStr();
    await this.repo.delete({ childId, forDate });

    const done = await this.progress.find({ where: { childId, status: 'completed' } });
    const doneIds = new Set(done.map((p) => p.lessonId));

    // Chỉ gợi ý các bài THUỘC KHÓA HỌC đã xuất bản (course.isPublished = 1),
    // bỏ qua bài lẻ / khóa nháp. Ưu tiên khóa bé đang học rồi tới các khóa khác.
    const learningCourseIds = [...new Set(done.map((p) => (p as { courseId?: number }).courseId).filter(Boolean))] as number[];

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
      .take(300)
      .getMany();

    const picks = candidates.filter((l) => !doneIds.has(l.id)).slice(0, limit);

    const recs = picks.map((l, i) =>
      this.repo.create({
        childId,
        forDate,
        lessonId: l.id,
        courseId: (l as { courseId?: number }).courseId,
        reason: i === 0 ? 'Bài tiếp theo trong lộ trình của con' : 'Luyện tập thêm cho con',
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
