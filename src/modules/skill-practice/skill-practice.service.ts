import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SkillQuestion } from './entities/skill-question.entity';
import { SkillAttempt } from './entities/skill-attempt.entity';
import { SkillAttemptAnswer } from './entities/skill-attempt-answer.entity';
import { Skill } from '../skills/entities/skill.entity';
import { ChildSkillMastery } from '../skills/entities/child-skill-mastery.entity';
import { evaluate, difficultyForLevel, levelName, RULES, type AnswerPoint, type MasteryVerdict } from './mastery';

/** Câu gửi cho client khi làm bài — KHÔNG kèm đáp án đúng. */
type PublicQuestion = {
  id: number;
  skillCode: string;
  skillName: string;
  grade: number;
  difficulty: string;
  questionText: string;
  options: string[];
};

export type SubmitAnswer = { questionId: number; selectedIndex: number | null; retriedCorrect?: boolean };

@Injectable()
export class SkillPracticeService {
  constructor(
    @InjectRepository(SkillQuestion) private readonly questions: Repository<SkillQuestion>,
    @InjectRepository(SkillAttempt) private readonly attempts: Repository<SkillAttempt>,
    @InjectRepository(SkillAttemptAnswer) private readonly answers: Repository<SkillAttemptAnswer>,
    @InjectRepository(Skill) private readonly skills: Repository<Skill>,
    @InjectRepository(ChildSkillMastery) private readonly mastery: Repository<ChildSkillMastery>,
  ) {}

  private toPublic(q: SkillQuestion, skill: Skill): PublicQuestion {
    return {
      id: q.id,
      skillCode: skill.code,
      skillName: skill.name,
      grade: q.grade,
      difficulty: q.difficulty,
      questionText: q.questionText,
      options: q.optionsJson,
    };
  }

  /** Bậc thành thạo hiện tại của bé với một kỹ năng (0 nếu chưa luyện). */
  private async currentLevel(childId: number | null, skillId: number): Promise<number> {
    if (!childId) return 0;
    const m = await this.mastery.findOne({ where: { childId, skillId } });
    return m?.level ?? 0;
  }

  /**
   * Chọn câu cho một mức khó, ƯU TIÊN theo thứ tự:
   *   1. câu bé từng làm SAI và chưa sửa được  — đúng chỗ bé đang hổng
   *   2. câu bé chưa gặp bao giờ               — mở rộng vùng đã luyện
   *   3. câu lâu rồi chưa gặp lại              — nhắc lại trước khi quên
   * Bốc ngẫu nhiên thuần sẽ lặp lại câu bé vốn đã làm đúng, luyện mãi không tiến.
   */
  private async pickForDifficulty(
    childId: number | null,
    skillId: number,
    grade: number,
    difficulty: 'easy' | 'medium' | 'hard',
    count: number,
    usedGroups: Set<string>,
    usedTexts: Set<string>,
  ): Promise<SkillQuestion[]> {
    if (count <= 0) return [];

    const qb = this.questions
      .createQueryBuilder('q')
      .where('q.skillId = :sid AND q.grade = :g AND q.difficulty = :d AND q.isActive = 1', {
        sid: skillId, g: grade, d: difficulty,
      });

    if (childId) {
      // Điểm ưu tiên: chưa sửa được xếp trước, rồi chưa gặp, rồi lâu chưa gặp.
      qb.leftJoin(
        (sub) =>
          sub
            .from(SkillAttemptAnswer, 'a')
            .select('a.questionId', 'questionId')
            .addSelect('SUM(a.isCorrect = 0)', 'wrongCount')
            .addSelect('SUM(a.isCorrect = 1)', 'rightCount')
            .addSelect('MAX(a.id)', 'lastSeen')
            .where('a.childId = :cid', { cid: childId })
            .groupBy('a.questionId'),
        'h',
        'h.questionId = q.id',
      )
        .addSelect('COALESCE(h.wrongCount, 0)', 'wrongCount')
        .addSelect('COALESCE(h.rightCount, 0)', 'rightCount')
        .setParameter('cid', childId)
        .orderBy('CASE WHEN COALESCE(h.wrongCount,0) > COALESCE(h.rightCount,0) THEN 0 WHEN h.questionId IS NULL THEN 1 ELSE 2 END', 'ASC')
        .addOrderBy('COALESCE(h.lastSeen, 0)', 'ASC')
        .addOrderBy('RAND()');
    } else {
      qb.orderBy('RAND()');
    }

    const pool = await qb.limit(count * 5).getMany();
    const out: SkillQuestion[] = [];
    for (const q of pool) {
      if (out.length >= count) break;
      if (usedGroups.has(q.variantGroup)) continue;
      // Chặn lặp lần hai: hai câu khác nhóm vẫn có thể trùng đề nếu kho ngữ liệu
      // của kỹ năng đó mỏng. Bé thấy lặp đề là mất tin tưởng ngay.
      if (usedTexts.has(q.questionText)) continue;
      usedGroups.add(q.variantGroup);
      usedTexts.add(q.questionText);
      out.push(q);
    }
    return out;
  }

  /**
   * Một PHIÊN luyện kỹ năng, THÍCH ỨNG theo bậc thành thạo của bé.
   *
   * Tỉ lệ cố định dễ/trung bình/khó là sai với cả hai đầu: bé mới bắt đầu gặp
   * câu khó thì nản, bé đã giỏi làm lại câu dễ thì chán và không tiến. Ở đây
   * phần lớn câu rơi đúng mức khó của bậc hiện tại, thêm ít câu khởi động dễ hơn
   * và một câu vươn lên khó hơn để còn đường lên bậc.
   *
   * Không lấy quá một câu trong cùng nhóm sinh đôi — câu còn lại để dành cho
   * lượt "thử câu tương tự" khi bé làm sai.
   */
  async buildSession(code: string, grade: number, limit = 10, childId?: number | null) {
    const skill = await this.skills.findOne({ where: { code, isActive: true } });
    if (!skill) throw new NotFoundException(`Không có kỹ năng "${code}"`);

    const n = Math.min(Math.max(limit, 1), 30);
    const level = await this.currentLevel(childId ?? null, skill.id);
    const core = difficultyForLevel(level);

    const ORDER = ['easy', 'medium', 'hard'] as const;
    const ci = ORDER.indexOf(core);
    const easier = ci > 0 ? ORDER[ci - 1] : null;
    const harder = ci < 2 ? ORDER[ci + 1] : null;

    // Khởi động 2 câu dễ hơn, vươn lên 1 câu khó hơn, còn lại đúng mức của bậc.
    const warmCount = easier && n >= 5 ? 2 : 0;
    const stretchCount = harder && n >= 5 ? 1 : 0;
    const coreCount = n - warmCount - stretchCount;

    const usedGroups = new Set<string>();
    const usedTexts = new Set<string>();
    const cid = childId ?? null;
    const warm = easier ? await this.pickForDifficulty(cid, skill.id, grade, easier, warmCount, usedGroups, usedTexts) : [];
    const main = await this.pickForDifficulty(cid, skill.id, grade, core, coreCount, usedGroups, usedTexts);
    const stretch = harder ? await this.pickForDifficulty(cid, skill.id, grade, harder, stretchCount, usedGroups, usedTexts) : [];

    let picked = [...warm, ...main, ...stretch];

    // Kỹ năng ít câu ở một mức thì lấp bằng mức bất kỳ, vẫn tránh trùng nhóm.
    if (picked.length < n) {
      for (const d of ORDER) {
        if (picked.length >= n) break;
        picked = picked.concat(
          await this.pickForDifficulty(cid, skill.id, grade, d, n - picked.length, usedGroups, usedTexts),
        );
      }
    }

    return {
      skill: { id: skill.id, code: skill.code, name: skill.name, icon: skill.icon },
      grade,
      level,
      levelName: levelName(level),
      questions: picked.map((q) => this.toPublic(q, skill)),
    };
  }

  /**
   * Chấm một câu: trả đúng/sai KÈM lời giải thích cách làm.
   * Chấm ở server để đáp án không nằm sẵn trong trang.
   */
  async check(questionId: number, selectedIndex: number | null) {
    const q = await this.questions.findOne({ where: { id: questionId } });
    if (!q) throw new NotFoundException('Không có câu hỏi này');
    return {
      questionId: q.id,
      isCorrect: selectedIndex != null && selectedIndex === q.correctIndex,
      correctIndex: q.correctIndex,
      correctAnswer: q.optionsJson[q.correctIndex],
      explanation: q.explanation,
    };
  }

  /**
   * Câu SINH ĐÔI của một câu (cùng dạng, khác số liệu) — dùng cho vòng
   * "Sai → Giải thích → Thử một câu tương tự".
   */
  async variantOf(questionId: number) {
    const q = await this.questions.findOne({ where: { id: questionId } });
    if (!q) throw new NotFoundException('Không có câu hỏi này');
    const skill = await this.skills.findOne({ where: { id: q.skillId } });
    if (!skill) throw new NotFoundException('Không có kỹ năng của câu này');

    const sibling = await this.questions
      .createQueryBuilder('q')
      .where('q.variantGroup = :vg AND q.id <> :id AND q.isActive = 1', { vg: q.variantGroup, id: q.id })
      .orderBy('RAND()')
      .getOne();
    if (!sibling) return null;
    return this.toPublic(sibling, skill);
  }

  /** Lưu một phiên luyện và cập nhật mức thành thạo của kỹ năng đó. */
  async submit(dto: {
    childId: number;
    skillCode: string;
    grade: number;
    timeSpentSec?: number;
    answers: SubmitAnswer[];
  }) {
    const skill = await this.skills.findOne({ where: { code: dto.skillCode, isActive: true } });
    if (!skill) throw new NotFoundException(`Không có kỹ năng "${dto.skillCode}"`);

    const ids = dto.answers.map((a) => a.questionId);
    const qs = ids.length ? await this.questions.find({ where: { id: In(ids) } }) : [];
    const byId = new Map(qs.map((q) => [q.id, q]));

    const graded = dto.answers.map((a) => {
      const q = byId.get(a.questionId);
      return {
        ...a,
        isCorrect: !!q && a.selectedIndex != null && a.selectedIndex === q.correctIndex,
      };
    });

    const total = graded.length;
    const correct = graded.filter((a) => a.isCorrect).length;
    const score = total ? Math.round((correct / total) * 10000) / 100 : 0;

    const attempt = await this.attempts.save(
      this.attempts.create({
        childId: dto.childId,
        skillId: skill.id,
        grade: dto.grade,
        totalQuestions: total,
        correctCount: correct,
        score,
        timeSpentSec: dto.timeSpentSec ?? 0,
      }),
    );

    if (graded.length) {
      await this.answers.save(
        graded.map((a) =>
          this.answers.create({
            attemptId: attempt.id,
            questionId: a.questionId,
            childId: dto.childId,
            isCorrect: a.isCorrect,
            selectedIndex: a.selectedIndex ?? undefined,
            retriedCorrect: !!a.retriedCorrect,
          }),
        ),
      );
    }

    const mastery = await this.recomputeMastery(dto.childId, skill.id);
    return {
      attempt,
      score,
      correct,
      total,
      mastery: {
        level: mastery.level,
        levelName: levelName(mastery.level),
        changed: mastery.changed,
        masteryPercent: mastery.masteryPercent,
        toNextLevel: mastery.toNextLevel,
        distinctDays: mastery.distinctDays,
        needDays: RULES.promoteDistinctDays,
      },
    };
  }

  /**
   * Chấm lại bậc thành thạo của bé với một kỹ năng sau mỗi phiên.
   *
   * Đọc lịch sử trả lời gần đây rồi giao cho `evaluate()` quyết định — toàn bộ
   * luật lên/tụt bậc nằm ở `mastery.ts` để kiểm thử được mà không cần DB.
   */
  /** Lịch sử trả lời gần đây của bé với một kỹ năng (mới nhất trước). */
  private async historyFor(childId: number, skillId: number): Promise<AnswerPoint[]> {
    const rows = await this.answers
      .createQueryBuilder('a')
      .innerJoin(SkillQuestion, 'q', 'q.id = a.questionId')
      .innerJoin(SkillAttempt, 'sa', 'sa.id = a.attemptId')
      .select('a.isCorrect', 'isCorrect')
      .addSelect('q.difficulty', 'difficulty')
      .addSelect('DATE(sa.createdAt)', 'day')
      .where('a.childId = :childId AND q.skillId = :skillId', { childId, skillId })
      .orderBy('a.id', 'DESC')
      .limit(60)
      .getRawMany<{ isCorrect: number; difficulty: 'easy' | 'medium' | 'hard'; day: string | Date }>();

    return rows.map((r) => ({
      isCorrect: !!Number(r.isCorrect),
      difficulty: r.difficulty,
      day: typeof r.day === 'string' ? r.day.slice(0, 10) : r.day.toISOString().slice(0, 10),
    }));
  }

  private async recomputeMastery(childId: number, skillId: number): Promise<MasteryVerdict> {
    const history = await this.historyFor(childId, skillId);

    let m = await this.mastery.findOne({ where: { childId, skillId } });
    if (!m) m = this.mastery.create({ childId, skillId, totalCount: 0, correctCount: 0, level: 0 });

    const verdict = evaluate(history, m.level ?? 0);

    m.totalCount = history.length;
    m.correctCount = history.filter((h) => h.isCorrect).length;
    m.masteryPercent = verdict.masteryPercent;
    m.lastPracticedAt = new Date();
    m.nextReviewAt = verdict.nextReviewAt ?? undefined;
    if (verdict.changed !== 'same') {
      m.level = verdict.level;
      m.levelUpdatedAt = new Date();
    }
    await this.mastery.save(m);
    return verdict;
  }

  /** Bậc thành thạo của bé với MỘT kỹ năng — để trang kỹ năng hiện tiến trình ngay khi mở. */
  async childSkillLevel(childId: number, code: string) {
    const skill = await this.skills.findOne({ where: { code, isActive: true } });
    if (!skill) throw new NotFoundException(`Không có kỹ năng "${code}"`);
    const m = await this.mastery.findOne({ where: { childId, skillId: skill.id } });
    const level = m?.level ?? 0;

    // Tính luôn CÒN THIẾU GÌ để lên bậc — thanh bậc mà không nói cách lên thì
    // bé và phụ huynh không biết phải làm gì tiếp.
    const history = await this.historyFor(childId, skill.id);
    const v = evaluate(history, level);

    return {
      skillCode: code,
      level,
      levelName: levelName(level),
      masteryPercent: m ? Number(m.masteryPercent) : 0,
      practiced: !!m && Number(m.totalCount) > 0,
      nextReviewAt: m?.nextReviewAt ?? null,
      dueForReview: !!m?.nextReviewAt && new Date(m.nextReviewAt) <= new Date(),
      // Điều kiện lên bậc, gửi kèm để giao diện nói đúng con số thật.
      progress: {
        difficulty: difficultyForLevel(level),
        needCorrect: RULES.promoteCorrect,
        needQuestions: RULES.promoteWindow,
        toNextLevel: v.toNextLevel,
        distinctDays: v.distinctDays,
        needDays: RULES.promoteDistinctDays,
        isMax: level >= 4,
      },
    };
  }

  /**
   * Xếp loại một kỹ năng cho phụ huynh/bé nhìn là hiểu ngay.
   * Bậc + % gần đây gộp thành 4 nhãn, vì "level 2, 63%" không nói lên điều gì
   * với người dùng.
   */
  private classify(practiced: boolean, level: number, pct: number) {
    if (!practiced) return { status: 'chua-luyen' as const, label: 'Chưa luyện', tone: 'slate' as const };
    if (level >= 3 && pct >= 80) return { status: 'tot' as const, label: 'Đang rất tốt', tone: 'emerald' as const };
    if (pct >= 60) return { status: 'on' as const, label: 'Ổn', tone: 'sky' as const };
    if (pct >= 40) return { status: 'can-luyen' as const, label: 'Cần luyện thêm', tone: 'amber' as const };
    return { status: 'yeu' as const, label: 'Đang yếu', tone: 'rose' as const };
  }

  /**
   * Bậc thành thạo của bé trên TOÀN BỘ kỹ năng của một lớp (và môn nếu có).
   * Dùng để trang danh sách kỹ năng chỉ thẳng ra bé đang yếu chỗ nào, thay vì
   * hiện số bài — con số đó chẳng giúp bé chọn nên luyện gì.
   */
  async childOverview(childId: number, grade: number, subject?: string) {
    const qb = this.skills
      .createQueryBuilder('s')
      .leftJoin(ChildSkillMastery, 'm', 'm.skillId = s.id AND m.childId = :childId', { childId })
      .innerJoin('lesson_skills', 'ls', 'ls.skillId = s.id')
      .innerJoin('lessons', 'l', 'l.id = ls.lessonId AND l.isPublished = 1')
      .innerJoin('courses', 'co', 'co.id = l.courseId AND co.isPublished = 1')
      .select('s.code', 'code')
      .addSelect('s.name', 'name')
      .addSelect('s.icon', 'icon')
      .addSelect('s.subject', 'subject')
      .addSelect('MAX(m.level)', 'level')
      .addSelect('MAX(m.masteryPercent)', 'masteryPercent')
      .addSelect('MAX(m.totalCount)', 'totalCount')
      .addSelect('MAX(m.nextReviewAt)', 'nextReviewAt')
      .where('s.isActive = 1')
      .andWhere('co.slug LIKE :g', { g: `%-lop-${grade}` })
      .groupBy('s.id');

    if (subject) qb.andWhere('co.courseType = :st', { st: subject });

    const rows = await qb.getRawMany<{
      code: string; name: string; icon: string | null; subject: string;
      level: number | null; masteryPercent: string | null; totalCount: number | null;
      nextReviewAt: Date | null;
    }>();

    const now = new Date();
    return rows
      .map((r) => {
        const practiced = Number(r.totalCount ?? 0) > 0;
        const level = Number(r.level ?? 0);
        const pct = Number(r.masteryPercent ?? 0);
        return {
          code: r.code,
          name: r.name,
          icon: r.icon,
          subject: r.subject,
          practiced,
          level,
          levelName: levelName(level),
          masteryPercent: pct,
          dueForReview: !!r.nextReviewAt && new Date(r.nextReviewAt) <= now,
          ...this.classify(practiced, level, pct),
        };
      })
      // Yếu nhất lên trước — bé mở trang là thấy ngay chỗ cần luyện.
      .sort((a, b) => {
        const rank = { yeu: 0, 'can-luyen': 1, on: 2, 'chua-luyen': 3, tot: 4 };
        return rank[a.status] - rank[b.status] || a.masteryPercent - b.masteryPercent;
      });
  }

  /**
   * Kỹ năng đến hạn ôn lại — nền cho "nhắc ôn" trong nhiệm vụ hằng ngày.
   * Giữ được lâu mới là giỏi, nên bậc cao mà bỏ lâu vẫn phải kiểm tra lại.
   */
  async dueForReview(childId: number) {
    const rows = await this.mastery
      .createQueryBuilder('m')
      .innerJoin(Skill, 's', 's.id = m.skillId AND s.isActive = 1')
      .select('s.code', 'code')
      .addSelect('s.name', 'name')
      .addSelect('s.icon', 'icon')
      .addSelect('m.level', 'level')
      .addSelect('m.masteryPercent', 'masteryPercent')
      .addSelect('m.nextReviewAt', 'nextReviewAt')
      .where('m.childId = :childId AND m.nextReviewAt IS NOT NULL AND m.nextReviewAt <= NOW()', { childId })
      .orderBy('m.nextReviewAt', 'ASC')
      .getRawMany();
    return rows.map((r) => ({ ...r, levelName: levelName(Number(r.level)) }));
  }

  /** Các câu bé từng làm sai trong chế độ luyện kỹ năng — cho "ôn lại câu sai". */
  async wrongQuestions(childId: number, limit = 20) {
    const rows = await this.answers
      .createQueryBuilder('a')
      .innerJoin(SkillQuestion, 'q', 'q.id = a.questionId')
      .innerJoin(Skill, 's', 's.id = q.skillId')
      .select('q.id', 'id')
      .addSelect('q.questionText', 'questionText')
      .addSelect('q.optionsJson', 'options')
      .addSelect('q.difficulty', 'difficulty')
      .addSelect('q.grade', 'grade')
      .addSelect('s.code', 'skillCode')
      .addSelect('s.name', 'skillName')
      .addSelect('COUNT(*)', 'wrongCount')
      .where('a.childId = :childId AND a.isCorrect = 0', { childId })
      .groupBy('q.id')
      .orderBy('wrongCount', 'DESC')
      .limit(Math.min(Math.max(limit, 1), 50))
      .getRawMany();
    return rows;
  }
}
