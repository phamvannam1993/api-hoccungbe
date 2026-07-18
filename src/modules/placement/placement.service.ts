import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { LessonSkill } from '../skills/entities/lesson-skill.entity';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsService } from '../skills/skills.service';

type Opt = { key: string; text: string };
export type PlacementAnswer = { quizId: number; selected: string };

function parseJson<T>(v: unknown, fb: T): T {
  if (v == null) return fb;
  if (typeof v === 'string') { try { return JSON.parse(v) as T; } catch { return fb; } }
  return v as T;
}

function toOptions(raw: unknown): Opt[] {
  const arr = parseJson<any[]>(raw, []);
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((o) => o && (o.key != null))
    .map((o) => ({ key: String(o.key), text: String(o.text ?? o.label ?? o.key) }));
}

function isCorrect(selected: string, correctRaw: unknown): boolean {
  const correct = parseJson<unknown>(correctRaw, correctRaw);
  if (Array.isArray(correct)) return correct.map(String).includes(String(selected));
  return String(correct) === String(selected);
}

function tierOf(pct: number): { tier: 'easy' | 'medium' | 'hard'; level: string; desc: string } {
  if (pct < 50) return { tier: 'easy', level: 'Làm quen', desc: 'Bắt đầu từ nền tảng, chắc từng bước' };
  if (pct < 80) return { tier: 'medium', level: 'Luyện tập', desc: 'Củng cố và mở rộng kiến thức' };
  return { tier: 'hard', level: 'Thử thách', desc: 'Nâng cao năng lực, bứt phá' };
}

@Injectable()
export class PlacementService {
  constructor(
    @InjectRepository(Quiz) private readonly quizzes: Repository<Quiz>,
    @InjectRepository(ChildProfile) private readonly children: Repository<ChildProfile>,
    @InjectRepository(LessonSkill) private readonly lessonSkills: Repository<LessonSkill>,
    @InjectRepository(Skill) private readonly skills: Repository<Skill>,
    private readonly skillsService: SkillsService,
  ) {}

  /** Bộ câu hỏi khảo sát: trải đều theo chủ đề trong các khóa của lớp bé (KHÔNG trả đáp án). */
  async getQuestions(grade: string, count = 12) {
    const rows = await this.quizzes
      .createQueryBuilder('q')
      .innerJoin('lessons', 'l', 'l.id = q.lessonId')
      .innerJoin('courses', 'co', 'co.id = l.courseId')
      .select('q.id', 'id')
      .addSelect('q.lessonId', 'lessonId')
      .addSelect('q.questionText', 'questionText')
      .addSelect('q.optionsJson', 'optionsJson')
      .addSelect('q.difficultyLevel', 'difficultyLevel')
      .addSelect('l.topicId', 'topicId')
      .addSelect('co.courseType', 'courseType')
      .where('co.isPublished = 1 AND l.isPublished = 1 AND q.isActive = 1')
      .andWhere("q.questionType = 'single_choice'")
      .andWhere('q.optionsJson IS NOT NULL')
      .andWhere('co.title LIKE :g', { g: `%lớp ${grade}%` })
      .orderBy('RAND()')
      .limit(300)
      .getRawMany<{
        id: number; lessonId: number; questionText: string;
        optionsJson: unknown; difficultyLevel: string; topicId: number; courseType: string;
      }>();

    // Trải đều: tối đa 2 câu / chủ đề trước, rồi lấp thêm cho đủ.
    const perTopic = new Map<number, number>();
    const chosen: typeof rows = [];
    const rest: typeof rows = [];
    for (const r of rows) {
      const t = Number(r.topicId ?? 0);
      const c = perTopic.get(t) ?? 0;
      if (c < 2 && chosen.length < count) { chosen.push(r); perTopic.set(t, c + 1); }
      else rest.push(r);
    }
    for (const r of rest) { if (chosen.length >= count) break; chosen.push(r); }

    return chosen.slice(0, count).map((r) => ({
      quizId: Number(r.id),
      lessonId: Number(r.lessonId),
      questionText: r.questionText,
      options: toOptions(r.optionsJson),
      difficulty: r.difficultyLevel,
      courseType: r.courseType,
    })).filter((q) => q.options.length >= 2);
  }

  /**
   * Chấm khảo sát → mức đề xuất + điểm mạnh/yếu theo kỹ năng.
   * Nếu childId là hồ sơ có thật (đã đăng nhập) thì lưu mastery + placementJson.
   */
  async submit(grade: string, answers: PlacementAnswer[], childId?: number) {
    const ids = [...new Set(answers.map((a) => a.quizId))];
    const quizzes = ids.length
      ? await this.quizzes.find({ where: { id: In(ids) }, select: { id: true, lessonId: true, correctAnswerJson: true } })
      : [];
    const byId = new Map(quizzes.map((q) => [q.id, q]));

    let correct = 0;
    const perLesson = new Map<number, { correct: number; total: number }>();
    for (const a of answers) {
      const q = byId.get(a.quizId);
      if (!q) continue;
      const ok = isCorrect(a.selected, q.correctAnswerJson);
      if (ok) correct++;
      const pl = perLesson.get(q.lessonId) ?? { correct: 0, total: 0 };
      pl.total++; if (ok) pl.correct++;
      perLesson.set(q.lessonId, pl);
    }
    const total = [...perLesson.values()].reduce((s, v) => s + v.total, 0);
    const overallPct = total ? Math.round((correct / total) * 100) : 0;
    const { tier, level, desc } = tierOf(overallPct);

    // Điểm theo kỹ năng: map bài → kỹ năng (lesson_skills), cộng dồn đúng/tổng.
    const lessonIds = [...perLesson.keys()];
    const links = lessonIds.length
      ? await this.lessonSkills.find({ where: { lessonId: In(lessonIds) } })
      : [];
    const skillIds = [...new Set(links.map((l) => l.skillId))];
    const skillRows = skillIds.length ? await this.skills.find({ where: { id: In(skillIds) } }) : [];
    const skillMeta = new Map(skillRows.map((s) => [s.id, s]));
    const perSkill = new Map<number, { correct: number; total: number }>();
    for (const link of links) {
      const pl = perLesson.get(link.lessonId);
      if (!pl) continue;
      const agg = perSkill.get(link.skillId) ?? { correct: 0, total: 0 };
      agg.correct += pl.correct; agg.total += pl.total;
      perSkill.set(link.skillId, agg);
    }
    const skillsResult = [...perSkill.entries()]
      .map(([skillId, v]) => {
        const meta = skillMeta.get(skillId);
        const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
        return { skillId, name: meta?.name ?? `Kỹ năng ${skillId}`, subject: meta?.subject ?? '', pct, correct: v.correct, total: v.total };
      })
      .sort((a, b) => b.pct - a.pct);

    const strengths = skillsResult.filter((s) => s.pct >= 70).map((s) => s.name);
    const weaknesses = skillsResult.filter((s) => s.pct < 50).map((s) => s.name);

    const result = {
      overallPct, correct, total, tier, level, desc,
      skills: skillsResult, strengths, weaknesses,
      date: new Date().toISOString().slice(0, 10),
    };

    // Lưu cho hồ sơ có thật (đã đăng nhập).
    if (childId) {
      const child = await this.children.findOne({ where: { id: childId } });
      if (child) {
        for (const [lessonId, v] of perLesson) {
          await this.skillsService.updateMasteryFromLesson(childId, lessonId, v.correct, v.total);
        }
        child.placementJson = result;
        await this.children.save(child);
      }
    }

    return result;
  }
}
