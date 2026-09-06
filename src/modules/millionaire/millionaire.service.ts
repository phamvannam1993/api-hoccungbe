import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { MillionaireRun } from './entities/millionaire-run.entity';
import { SkillQuestion } from '../skill-practice/entities/skill-question.entity';
import { Skill } from '../skills/entities/skill.entity';

/** Thang tiền thưởng 15 mốc, giống bảng bên phải màn chơi. */
export const PRIZES = [
  100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000,
  64000, 125000, 250000, 500000, 1000000,
];

/** Mốc an toàn: trả lời sai vẫn giữ được tiền của mốc gần nhất đã qua. */
export const SAFE_LEVELS = [4, 9]; // sau câu 5 và câu 10 (0-based)

type Mode = 'classic' | 'speed' | 'boss';

/**
 * Môn được dùng trong game: chỉ Toán và Tiếng Việt.
 * Bỏ Tiếng Anh vì trộn vào một ván thi kiến thức tiếng Việt thì câu hỏi và
 * giọng đọc nhảy ngôn ngữ liên tục, bé mất mạch.
 */
const GAME_SUBJECTS = ['math', 'language'];

/**
 * Mỗi chế độ là một DÃY BẬC KHÓ (1–15), mỗi phần tử ứng với một câu.
 *
 * Dùng `difficultyScore` chứ không dùng nhãn easy/medium/hard: nhãn chỉ có 3
 * bậc nên nếu chia 15 mốc thành ba khối 5 câu thì trong mỗi khối các câu khó
 * ngang nhau, rồi nhảy vọt ở mốc 6 và mốc 11 — mất hẳn cảm giác leo thang.
 */
const MODE_PLAN: Record<Mode, number[]> = {
  // Leo thang đúng 15 mốc, mỗi mốc một bậc khó.
  classic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  // 60 giây: câu ngắn dễ trả lời nhanh, nhích lên từ từ. Lấy dư cho khỏi hết câu.
  speed: Array.from({ length: 30 }, (_, i) => Math.min(9, 1 + Math.floor(i / 3))),
  // Boss: 10 câu ở nhóm khó nhất.
  boss: [11, 12, 12, 13, 13, 14, 14, 15, 15, 15],
};

export type PublicQ = {
  id: number;
  questionText: string;
  options: string[];
  difficulty: string;
  /** Bậc khó 1–15 — ứng với mốc thưởng cùng số thứ tự. */
  band: number;
  skillCode: string;
  skillName: string;
  /**
   * Môn của câu hỏi. Cần thiết cho GIỌNG ĐỌC: mỗi môn một cách chuẩn hoá khác
   * nhau (Toán đọc đơn vị đo, Tiếng Việt đọc âm con chữ "b" là "bờ", Tiếng Anh
   * đổi giọng). Ván chơi trộn cả ba môn nên không thể dùng chung một cách.
   */
  subject: 'math' | 'language' | 'english';
};

/** Bậc `b` trước, rồi lan dần sang hai bên: 7 → 7, 6, 8, 5, 9 … */
function nearestBands(b: number): number[] {
  const out = [b];
  for (let d = 1; d <= 14; d++) {
    if (b - d >= 1) out.push(b - d);
    if (b + d <= 15) out.push(b + d);
  }
  return out;
}

function isoWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function isoMonth(d = new Date()): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

@Injectable()
export class MillionaireService {
  constructor(
    @InjectRepository(MillionaireRun) private readonly runs: Repository<MillionaireRun>,
    @InjectRepository(SkillQuestion) private readonly questions: Repository<SkillQuestion>,
    @InjectRepository(Skill) private readonly skills: Repository<Skill>,
  ) {}

  private toPublic(q: SkillQuestion, skillById: Map<number, Skill>): PublicQ {
    const s = skillById.get(Number(q.skillId));
    return {
      id: q.id,
      questionText: q.questionText,
      options: q.optionsJson,
      difficulty: q.difficulty,
      band: q.difficultyScore,
      skillCode: s?.code ?? '',
      skillName: s?.name ?? '',
      subject: (s?.subject as 'math' | 'language' | 'english') ?? 'math',
    };
  }

  private async skillMap(): Promise<Map<number, Skill>> {
    const all = await this.skills.find({ where: { isActive: true } });
    return new Map(all.map((s) => [Number(s.id), s]));
  }

  /**
   * Bốc bộ câu cho một ván. Trộn kỹ năng để đúng tinh thần "thi kiến thức tổng
   * hợp", nhưng độ khó thì theo đúng kế hoạch của từng chế độ.
   */
  async session(grade: number, mode: Mode = 'classic') {
    const plan = MODE_PLAN[mode] ?? MODE_PLAN.classic;
    const skillById = await this.skillMap();

    // Bốc dư ở mỗi bậc để còn chỗ tránh trùng nhóm và cho quyền "đổi câu".
    const need = new Map<number, number>();
    for (const b of plan) need.set(b, (need.get(b) ?? 0) + 1);

    const pool = new Map<number, SkillQuestion[]>();
    await Promise.all(
      [...need.entries()].map(async ([bac, n]) => {
        pool.set(
          bac,
          await this.questions
            .createQueryBuilder('q')
            .innerJoin('skills', 's', 's.id = q.skillId AND s.isActive = 1')
            .where('q.grade = :g AND q.difficultyScore = :b AND q.isActive = 1', { g: grade, b: bac })
            .andWhere('s.subject IN (:...subs)', { subs: GAME_SUBJECTS })
            .orderBy('RAND()')
            .limit(n * 4)
            .getMany(),
        );
      }),
    );

    const usedGroups = new Set<string>();
    const usedIds = new Set<number>();
    const picked: SkillQuestion[] = [];

    for (const bac of plan) {
      // Ưu tiên đúng bậc; hết câu thì lấy bậc gần nhất để thang không bị hụt.
      let q: SkillQuestion | undefined;
      for (const b of nearestBands(bac)) {
        q = (pool.get(b) ?? []).find((x) => !usedIds.has(x.id) && !usedGroups.has(x.variantGroup));
        if (q) break;
      }
      if (!q) continue;
      usedIds.add(q.id);
      usedGroups.add(q.variantGroup);
      picked.push(q);
    }

    return {
      grade,
      mode,
      prizes: PRIZES,
      safeLevels: SAFE_LEVELS,
      questions: picked.map((q) => this.toPublic(q, skillById)),
    };
  }

  /** Chấm một câu, kèm giải thích cách làm (chấm ở server để đáp án không lộ). */
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
   * Trợ giúp "Gợi ý" (50:50): trả về hai đáp án SAI để loại bỏ.
   * Tính ở server, nếu không client phải biết đáp án đúng mới loại được.
   */
  async fiftyFifty(questionId: number) {
    const q = await this.questions.findOne({ where: { id: questionId } });
    if (!q) throw new NotFoundException('Không có câu hỏi này');
    const wrong = q.optionsJson.map((_, i) => i).filter((i) => i !== q.correctIndex);
    // Xáo rồi lấy 2 — mỗi lần dùng loại bỏ hai đáp án khác nhau.
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    return { questionId: q.id, remove: wrong.slice(0, 2) };
  }

  /**
   * Trợ giúp "Hỏi bạn": trả về ý kiến của các bạn dưới dạng phần trăm.
   * Bạn bè không phải lúc nào cũng đúng — càng câu khó thì càng ít chắc chắn,
   * để bé vẫn phải tự cân nhắc chứ không nhắm mắt nghe theo.
   */
  async askFriends(questionId: number) {
    const q = await this.questions.findOne({ where: { id: questionId } });
    if (!q) throw new NotFoundException('Không có câu hỏi này');
    const n = q.optionsJson.length;
    const doTinCay = q.difficulty === 'easy' ? 0.8 : q.difficulty === 'medium' ? 0.62 : 0.45;
    const votes = new Array(n).fill(0);
    votes[q.correctIndex] = Math.round(doTinCay * 100);
    let remain = 100 - votes[q.correctIndex];
    for (let i = 0; i < n; i++) {
      if (i === q.correctIndex) continue;
      const last = i === n - 1 || (q.correctIndex === n - 1 && i === n - 2);
      const v = last ? remain : Math.floor(Math.random() * (remain + 1));
      votes[i] = v;
      remain -= v;
    }
    if (remain > 0) votes[(q.correctIndex + 1) % n] += remain;
    return { questionId: q.id, votes };
  }

  /** Trợ giúp "Đổi câu hỏi": bốc câu khác CÙNG BẬC KHÓ, khác các câu đã dùng. */
  async swap(grade: number, band: number, excludeIds: number[]) {
    const skillById = await this.skillMap();
    const q = await this.questions
      .createQueryBuilder('q')
      .innerJoin('skills', 's', 's.id = q.skillId AND s.isActive = 1')
      .where('q.grade = :g AND q.difficultyScore = :b AND q.isActive = 1', { g: grade, b: band })
      .andWhere('s.subject IN (:...subs)', { subs: GAME_SUBJECTS })
      .andWhere(excludeIds.length ? 'q.id NOT IN (:...ids)' : '1=1', { ids: excludeIds })
      .orderBy('RAND()')
      .getOne();
    if (!q) throw new NotFoundException('Hết câu để đổi');
    return this.toPublic(q, skillById);
  }

  /** Lưu kết quả ván chơi. */
  async finish(dto: {
    childId?: number | null;
    name: string;
    avatar?: string;
    grade: number;
    mode: Mode;
    totalQuestions: number;
    correctCount: number;
    prize: number;
    bestCombo: number;
    timeSec: number;
    /** Đúng/sai từng câu — nguồn để bộ chấm bậc khó tự chuẩn dần theo thời gian. */
    answers?: { questionId: number; isCorrect: boolean }[];
  }) {
    const now = new Date();
    const name = (dto.name || 'Bé ẩn danh').trim().slice(0, 40) || 'Bé ẩn danh';
    // Điểm xếp hạng: tiền thưởng là chính, cộng thêm cho chuỗi đúng liên tiếp.
    const score = Math.min(999999, Math.floor(dto.prize / 100) + dto.bestCombo * 10);

    const run = await this.runs.save(
      this.runs.create({
        childId: dto.childId ?? undefined,
        name,
        avatar: dto.avatar,
        grade: Math.min(5, Math.max(1, Math.floor(dto.grade))),
        mode: dto.mode,
        totalQuestions: Math.max(0, dto.totalQuestions),
        correctCount: Math.max(0, dto.correctCount),
        prize: Math.max(0, Math.min(1000000, Math.floor(dto.prize))),
        score,
        bestCombo: Math.max(0, dto.bestCombo),
        timeSec: Math.max(0, Math.min(7200, Math.floor(dto.timeSec))),
        week: isoWeek(now),
        month: isoMonth(now),
      }),
    );
    // Lưu kết quả TỪNG CÂU. Đây là dữ liệu để `scripts/score-difficulty.cjs`
    // thay dần phỏng đoán từ đặc điểm bằng tỉ lệ trả lời đúng thật.
    const answers = (dto.answers ?? []).filter((a) => Number.isFinite(Number(a.questionId)));
    if (answers.length) {
      const values = answers.map((a) => [run.id, Number(a.questionId), run.grade, a.isCorrect ? 1 : 0]);
      await this.runs.manager.query(
        'INSERT INTO millionaire_answers (runId, questionId, grade, isCorrect) VALUES ' +
          values.map(() => '(?,?,?,?)').join(','),
        values.flat(),
      );
    }

    return { id: run.id, score, prize: run.prize };
  }

  /** Bảng xếp hạng: giữ điểm CAO NHẤT của mỗi biệt danh trong kỳ. */
  async leaderboard(grade: number, period: 'week' | 'month' | 'all' = 'week', limit = 20) {
    const qb = this.runs
      .createQueryBuilder('r')
      .select('r.name', 'name')
      .addSelect('MAX(r.score)', 'score')
      .addSelect('MAX(r.prize)', 'prize')
      .addSelect('ANY_VALUE(r.avatar)', 'avatar')
      .where('r.grade = :g', { g: grade })
      .groupBy('r.name')
      .orderBy('score', 'DESC')
      .limit(Math.min(Math.max(limit, 1), 50));

    if (period === 'week') qb.andWhere('r.week = :w', { w: isoWeek() });
    else if (period === 'month') qb.andWhere('r.month = :m', { m: isoMonth() });

    const rows = await qb.getRawMany<{ name: string; score: string; prize: string; avatar: string | null }>();
    return {
      grade,
      period,
      rows: rows.map((r, i) => ({
        rank: i + 1,
        name: r.name,
        avatar: r.avatar,
        score: Number(r.score),
        prize: Number(r.prize),
      })),
    };
  }

  /**
   * Phân tích năng lực sau ván chơi: đúng/sai theo TỪNG KỸ NĂNG.
   * Đây là điểm khác biệt so với một game đố vui thuần — chơi xong bé biết
   * mình yếu mảng nào để luyện tiếp.
   */
  async analyse(answers: { questionId: number; isCorrect: boolean }[]) {
    if (!answers.length) return [];
    const ids = answers.map((a) => a.questionId);
    const qs = await this.questions.find({ where: { id: In(ids) } });
    const byId = new Map(qs.map((q) => [Number(q.id), q]));
    const skillById = await this.skillMap();

    const tally = new Map<string, { code: string; name: string; icon?: string | null; correct: number; total: number }>();
    for (const a of answers) {
      const q = byId.get(Number(a.questionId));
      if (!q) continue;
      const s = skillById.get(Number(q.skillId));
      if (!s) continue;
      const cur = tally.get(s.code) ?? { code: s.code, name: s.name, icon: s.icon, correct: 0, total: 0 };
      cur.total += 1;
      if (a.isCorrect) cur.correct += 1;
      tally.set(s.code, cur);
    }

    return [...tally.values()]
      .map((t) => ({ ...t, percent: Math.round((t.correct / t.total) * 100) }))
      .sort((a, b) => b.percent - a.percent);
  }
}
