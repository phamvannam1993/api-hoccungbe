import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { LessonSkill } from './entities/lesson-skill.entity';
import { QuizSkill } from './entities/quiz-skill.entity';
import { GameSkill } from './entities/game-skill.entity';
import { ChildSkillMastery } from './entities/child-skill-mastery.entity';
import { QuizAttempt } from '../attempts/entities/quiz-attempt.entity';

function levelFor(pct: number): number {
  if (pct < 20) return 0;
  if (pct < 40) return 1;
  if (pct < 60) return 2;
  if (pct < 80) return 3;
  return 4;
}

// Nhãn hiển thị mức thành thạo theo MÔN (courseType). Bé học môn nào mới hiện môn đó.
const SUBJECT_META: Record<string, { id: number; name: string; icon: string }> = {
  math: { id: 1, name: 'Toán', icon: '🔢' },
  language: { id: 2, name: 'Tiếng Việt', icon: '📖' },
  english: { id: 3, name: 'Tiếng Anh', icon: '🅰️' },
  logic: { id: 4, name: 'Tư duy logic', icon: '🧠' },
  creative: { id: 5, name: 'Sáng tạo', icon: '🎨' },
  emotion: { id: 6, name: 'Cảm xúc', icon: '💛' },
  other: { id: 7, name: 'Khác', icon: '✨' },
};

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly skills: Repository<Skill>,
    @InjectRepository(LessonSkill) private readonly lessonSkills: Repository<LessonSkill>,
    @InjectRepository(QuizSkill) private readonly quizSkills: Repository<QuizSkill>,
    @InjectRepository(GameSkill) private readonly gameSkills: Repository<GameSkill>,
    @InjectRepository(ChildSkillMastery) private readonly mastery: Repository<ChildSkillMastery>,
    @InjectRepository(QuizAttempt) private readonly attempts: Repository<QuizAttempt>,
  ) {}

  // ── Catalog & liên kết ──
  listSkills() {
    return this.skills.find({ where: { isActive: true } });
  }

  createSkill(dto: Partial<Skill>) {
    return this.skills.save(this.skills.create(dto));
  }

  async linkLesson(lessonId: number, skillId: number, weight = 1) {
    const existed = await this.lessonSkills.findOne({ where: { lessonId, skillId } });
    if (existed) return existed;
    return this.lessonSkills.save(this.lessonSkills.create({ lessonId, skillId, weight }));
  }

  async linkGame(gameId: number, skillId: number) {
    const existed = await this.gameSkills.findOne({ where: { gameId, skillId } });
    if (existed) return existed;
    return this.gameSkills.save(this.gameSkills.create({ gameId, skillId }));
  }

  getLessonSkills(lessonId: number) {
    return this.lessonSkills.find({ where: { lessonId }, relations: { skill: true } });
  }

  /**
   * Danh mục kỹ năng kèm số bài học — nguồn cho trang "Học theo kỹ năng".
   * Lọc theo lớp (slug khoá dạng "toan-lop-3") và/hoặc môn.
   * Chỉ trả kỹ năng thực sự có bài đã xuất bản.
   */
  async catalog(opts: { grade?: string; subject?: string } = {}) {
    const qb = this.lessonSkills
      .createQueryBuilder('ls')
      .innerJoin('skills', 's', 's.id = ls.skillId AND s.isActive = 1')
      .innerJoin('lessons', 'l', 'l.id = ls.lessonId AND l.isPublished = 1')
      .innerJoin('courses', 'co', 'co.id = l.courseId AND co.isPublished = 1')
      .select('s.id', 'id')
      .addSelect('s.code', 'code')
      .addSelect('s.name', 'name')
      .addSelect('s.subject', 'subject')
      .addSelect('s.icon', 'icon')
      .addSelect('COUNT(DISTINCT l.id)', 'lessonCount')
      .groupBy('s.id')
      .orderBy('s.subject', 'ASC')
      .addOrderBy('lessonCount', 'DESC');

    if (opts.grade) qb.andWhere('co.slug LIKE :g', { g: `%-lop-${opts.grade}` });
    if (opts.subject) qb.andWhere('co.courseType = :st', { st: opts.subject });

    const rows = await qb.getRawMany<{
      id: number; code: string; name: string; subject: string;
      icon: string | null; lessonCount: string;
    }>();
    if (!rows.length) return [];

    // Số CÂU HỎI của mỗi kỹ năng — quy mô thật của kho luyện tập, khác số bài.
    const counts = await this.quizSkills
      .createQueryBuilder('qs')
      .innerJoin('quizzes', 'q', 'q.id = qs.quizId AND q.isActive = 1')
      .innerJoin('lessons', 'l', 'l.id = q.lessonId AND l.isPublished = 1')
      .innerJoin('courses', 'co', 'co.id = l.courseId AND co.isPublished = 1')
      .select('qs.skillId', 'skillId')
      .addSelect('COUNT(*)', 'n')
      .where('qs.skillId IN (:...ids)', { ids: rows.map((r) => r.id) })
      .andWhere(opts.grade ? 'co.slug LIKE :g' : '1=1', { g: `%-lop-${opts.grade}` })
      .andWhere(opts.subject ? 'co.courseType = :st' : '1=1', { st: opts.subject })
      .groupBy('qs.skillId')
      .getRawMany<{ skillId: number; n: string }>();
    const qCount = new Map(counts.map((c) => [Number(c.skillId), Number(c.n)]));

    return rows.map((r) => ({
      ...r,
      lessonCount: Number(r.lessonCount),
      questionCount: qCount.get(Number(r.id)) ?? 0,
    }));
  }

  /** Các bài học thuộc một kỹ năng (theo code), tuỳ chọn lọc theo lớp. */
  async lessonsBySkill(code: string, grade?: string) {
    const qb = this.lessonSkills
      .createQueryBuilder('ls')
      .innerJoin('skills', 's', 's.id = ls.skillId AND s.isActive = 1')
      .innerJoin('lessons', 'l', 'l.id = ls.lessonId AND l.isPublished = 1')
      .innerJoin('courses', 'co', 'co.id = l.courseId AND co.isPublished = 1')
      .select('l.id', 'id')
      .addSelect('l.title', 'title')
      .addSelect('l.slug', 'slug')
      .addSelect('l.shortDescription', 'shortDescription')
      .addSelect('l.thumbnailUrl', 'thumbnailUrl')
      .addSelect('co.slug', 'courseSlug')
      .addSelect('co.title', 'courseTitle')
      .addSelect('co.courseType', 'courseType')
      .where('s.code = :code', { code })
      .orderBy('co.id', 'ASC')
      .addOrderBy('l.sortOrder', 'ASC');

    if (grade) qb.andWhere('co.slug LIKE :g', { g: `%-lop-${grade}` });
    return qb.getRawMany();
  }

  /**
   * Bốc câu hỏi theo KỸ NĂNG — nền cho "5 câu phép chia" trong nhiệm vụ hằng ngày
   * và cho chế độ luyện tự do theo kỹ năng.
   *
   * Trả cả đáp án + giải thích để client chấm và giải thích ngay tại chỗ, giống
   * luồng làm bài theo bài học.
   */
  async questionsBySkill(
    code: string,
    opts: { grade?: string; limit?: number; difficulty?: string } = {},
  ) {
    const limit = Math.min(Math.max(opts.limit ?? 10, 1), 50);

    const qb = this.quizSkills
      .createQueryBuilder('qs')
      .innerJoin('skills', 's', 's.id = qs.skillId AND s.isActive = 1')
      .innerJoin('quizzes', 'q', 'q.id = qs.quizId AND q.isActive = 1')
      .innerJoin('lessons', 'l', 'l.id = q.lessonId AND l.isPublished = 1')
      .innerJoin('courses', 'co', 'co.id = l.courseId AND co.isPublished = 1')
      .select('q.id', 'quizId')
      .addSelect('q.lessonId', 'lessonId')
      .addSelect('q.questionText', 'questionText')
      .addSelect('q.questionType', 'questionType')
      .addSelect('q.optionsJson', 'optionsJson')
      .addSelect('q.correctAnswerJson', 'correctAnswerJson')
      .addSelect('q.explanation', 'explanation')
      .addSelect('q.difficultyLevel', 'difficultyLevel')
      .addSelect('l.title', 'lessonTitle')
      .addSelect('l.slug', 'lessonSlug')
      .addSelect('co.slug', 'courseSlug')
      .where('s.code = :code', { code })
      // Ưu tiên câu gắn theo nội dung; câu kế thừa từ bài kém sát hơn.
      .orderBy("qs.source = 'rule'", 'DESC')
      .addOrderBy('RAND()')
      .limit(limit);

    if (opts.grade) qb.andWhere('co.slug LIKE :g', { g: `%-lop-${opts.grade}` });
    if (opts.difficulty) qb.andWhere('q.difficultyLevel = :d', { d: opts.difficulty });

    return qb.getRawMany();
  }

  // ── Mastery ──
  /**
   * Cập nhật mức thành thạo sau mỗi lần làm bài, tính theo KỸ NĂNG CỦA TỪNG CÂU.
   *
   * Quan trọng ở những bài trộn nhiều kỹ năng: nếu bé sai 3 câu luyện từ và câu
   * nhưng đúng hết phần đọc hiểu, chia đều theo bài sẽ hạ cả hai kỹ năng như nhau
   * và che mất đúng chỗ bé đang yếu.
   *
   * Câu nào chưa gắn kỹ năng thì rơi về kỹ năng của bài, nên không mất dữ liệu.
   */
  async updateMasteryFromAnswers(
    childId: number,
    lessonId: number,
    answers: { quizId: number; isCorrect: boolean }[],
  ) {
    if (!answers.length) return;

    const quizIds = answers.map((a) => a.quizId).filter((id) => id != null);
    const links = quizIds.length
      ? await this.quizSkills.find({ where: { quizId: In(quizIds) } })
      : [];

    // skillId → { total, correct }
    const tally = new Map<number, { total: number; correct: number }>();
    const bump = (skillId: number, isCorrect: boolean) => {
      const cur = tally.get(skillId) ?? { total: 0, correct: 0 };
      cur.total += 1;
      if (isCorrect) cur.correct += 1;
      tally.set(skillId, cur);
    };

    const skillsOfQuiz = new Map<number, number[]>();
    for (const l of links) {
      if (!skillsOfQuiz.has(l.quizId)) skillsOfQuiz.set(l.quizId, []);
      skillsOfQuiz.get(l.quizId)!.push(l.skillId);
    }

    // Câu chưa gắn kỹ năng → dùng kỹ năng của bài.
    const lessonFallback = answers.some((a) => !skillsOfQuiz.get(a.quizId)?.length)
      ? (await this.lessonSkills.find({ where: { lessonId } })).map((l) => l.skillId)
      : [];

    for (const a of answers) {
      const ids = skillsOfQuiz.get(a.quizId)?.length ? skillsOfQuiz.get(a.quizId)! : lessonFallback;
      for (const skillId of ids) bump(skillId, a.isCorrect);
    }

    for (const [skillId, t] of tally) {
      let m = await this.mastery.findOne({ where: { childId, skillId } });
      if (!m) m = this.mastery.create({ childId, skillId, totalCount: 0, correctCount: 0 });
      m.totalCount += t.total;
      m.correctCount += t.correct;
      const pct = Math.round((m.correctCount / m.totalCount) * 10000) / 100;
      m.masteryPercent = pct;
      m.level = levelFor(pct);
      m.lastPracticedAt = new Date();
      await this.mastery.save(m);
    }
  }

  /** Bản cũ theo BÀI — giữ cho những chỗ chỉ biết tổng đúng/tổng câu. */
  async updateMasteryFromLesson(childId: number, lessonId: number, correct: number, total: number) {
    if (total <= 0) return;
    const links = await this.lessonSkills.find({ where: { lessonId } });
    for (const link of links) {
      let m = await this.mastery.findOne({ where: { childId, skillId: link.skillId } });
      if (!m) m = this.mastery.create({ childId, skillId: link.skillId, totalCount: 0, correctCount: 0 });
      m.totalCount += total;
      m.correctCount += correct;
      const pct = Math.round((m.correctCount / m.totalCount) * 10000) / 100;
      m.masteryPercent = pct;
      m.level = levelFor(pct);
      m.lastPracticedAt = new Date();
      await this.mastery.save(m);
    }
  }

  /**
   * Mức thành thạo theo TỪNG KỸ NĂNG (child_skill_mastery) — cho radar & khảo sát đầu vào.
   */
  async masteryList(childId: number) {
    return this.mastery.find({
      where: { childId },
      relations: { skill: true },
      order: { masteryPercent: 'ASC' },
    });
  }

  /**
   * Mức thành thạo theo TỪNG KỸ NĂNG — nguồn cho radar hồ sơ năng lực,
   * "cần luyện thêm" trong báo cáo phụ huynh, và gợi ý bài theo kỹ năng.
   *
   * Tính từ đúng/sai của TỪNG CÂU (attempt_answers × quiz_skills), nên phân biệt
   * được các kỹ năng nằm chung một bài học — điều mà gộp theo bài không làm được.
   * Luôn phản ánh mapping kỹ năng hiện tại, và chỉ trả kỹ năng bé đã thực sự luyện.
   */
  async getChildMastery(childId: number) {
    const rows = await this.attempts.manager
      .createQueryBuilder()
      .from('attempt_answers', 'aa')
      .innerJoin('quiz_skills', 'qs', 'qs.quizId = aa.quizId')
      .innerJoin('skills', 's', 's.id = qs.skillId AND s.isActive = 1')
      .select('s.id', 'skillId')
      .addSelect('s.code', 'code')
      .addSelect('s.name', 'name')
      .addSelect('s.subject', 'subject')
      .addSelect('s.icon', 'icon')
      .addSelect('SUM(aa.isCorrect)', 'correct')
      .addSelect('COUNT(*)', 'total')
      .where('aa.childId = :childId', { childId })
      .groupBy('s.id')
      .getRawMany<{
        skillId: number; code: string; name: string; subject: string;
        icon: string | null; correct: string; total: string;
      }>();

    return rows
      .map((r) => {
        const total = Number(r.total) || 0;
        const correct = Number(r.correct) || 0;
        const pct = total ? Math.round((correct / total) * 10000) / 100 : 0;
        return {
          skillId: r.skillId,
          code: r.code,
          subject: r.subject,
          masteryPercent: pct,
          level: levelFor(pct),
          totalCount: total,
          correctCount: correct,
          skill: { name: r.name, subject: r.subject, icon: r.icon ?? '✨' },
        };
      })
      .sort((a, b) => b.masteryPercent - a.masteryPercent);
  }

  /**
   * Mức thành thạo theo MÔN (courseType) — bản tổng quan thô hơn getChildMastery,
   * dùng cho các chỗ chỉ cần "Toán / Tiếng Việt / Tiếng Anh".
   */
  async getChildSubjectMastery(childId: number) {
    const rows = await this.attempts
      .createQueryBuilder('qa')
      .innerJoin('lessons', 'l', 'l.id = qa.lessonId')
      .innerJoin('courses', 'co', 'co.id = l.courseId')
      .select('co.courseType', 'subject')
      .addSelect('SUM(qa.correctCount)', 'correct')
      .addSelect('SUM(qa.totalQuestions)', 'total')
      .where('qa.childId = :childId', { childId })
      .groupBy('co.courseType')
      .getRawMany<{ subject: string; correct: string; total: string }>();

    return rows
      .map((r) => {
        const total = Number(r.total) || 0;
        const correct = Number(r.correct) || 0;
        const pct = total ? Math.round((correct / total) * 10000) / 100 : 0;
        const meta = SUBJECT_META[r.subject] ?? { id: 99, name: r.subject || 'Khác', icon: '✨' };
        return {
          skillId: meta.id,
          subject: r.subject,
          masteryPercent: pct,
          level: levelFor(pct),
          totalCount: total,
          correctCount: correct,
          skill: { name: meta.name, subject: r.subject, icon: meta.icon },
        };
      })
      .sort((a, b) => b.masteryPercent - a.masteryPercent);
  }
}
