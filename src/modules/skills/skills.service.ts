import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { LessonSkill } from './entities/lesson-skill.entity';
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

  // ── Mastery ──
  /** Cập nhật mức thành thạo theo kỹ năng của bài học sau mỗi lần làm bài. */
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
   * Mức thành thạo theo MÔN (courseType) — tính từ các bài bé đã làm thật.
   * Chỉ hiện môn bé đã học; % = tổng câu đúng / tổng câu của các bài thuộc môn đó.
   */
  async getChildMastery(childId: number) {
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
