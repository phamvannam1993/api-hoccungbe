/**
 * Bộ máy thành thạo cho "Học theo kỹ năng".
 *
 * Bài toán: luyện nhiều KHÔNG tự thành giỏi. Trung bình cộng dồn cả đời vừa ì
 * (mỗi câu mới chỉ dịch được 1%) vừa không phản ánh năng lực hiện tại — bé từng
 * đúng 90/100 rồi quên hết vẫn hiện 90%.
 *
 * Cách làm ở đây:
 *  1. Mức thành thạo tính trên CỬA SỔ GẦN ĐÂY, không phải toàn bộ lịch sử.
 *  2. Có 5 bậc, mỗi bậc gắn với một mức khó. Muốn lên bậc phải làm đúng ở ĐÚNG
 *     mức khó của bậc đó, và phải đúng trong ÍT NHẤT 2 NGÀY KHÁC NHAU — chống
 *     việc cày một buổi rồi hôm sau quên sạch.
 *  3. Làm sai nhiều thì tụt bậc, để bài quay lại mức vừa sức thay vì bỏ cuộc.
 *  4. Lên bậc xong được hẹn ôn lại theo khoảng cách tăng dần.
 */

export const MASTERY_LEVELS = [
  { level: 0, name: 'Mới bắt đầu', difficulty: 'easy' as const },
  { level: 1, name: 'Đang học', difficulty: 'easy' as const },
  { level: 2, name: 'Khá', difficulty: 'medium' as const },
  { level: 3, name: 'Giỏi', difficulty: 'hard' as const },
  { level: 4, name: 'Thành thạo', difficulty: 'hard' as const },
];

/** Các ngưỡng — để một chỗ cho dễ chỉnh khi chạy thật thấy quá dễ/quá khó. */
export const RULES = {
  /** Số câu gần nhất dùng để chấm mức thành thạo hiện tại. */
  window: 20,
  /** Số câu (ở đúng mức khó của bậc) cần có để xét lên bậc. */
  promoteWindow: 10,
  /** Trong đó phải đúng ít nhất bấy nhiêu câu. */
  promoteCorrect: 8,
  /** Và phải trải qua ít nhất bấy nhiêu NGÀY khác nhau. */
  promoteDistinctDays: 2,
  /** Đúng dưới mức này trong 10 câu gần nhất thì tụt bậc. */
  demoteBelow: 5,
  /** Khoảng cách ôn lại (ngày) theo từng bậc. */
  reviewDays: [1, 2, 7, 21, 45],
};

export type AnswerPoint = {
  isCorrect: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  /** Ngày làm bài, dạng 'YYYY-MM-DD' — để đếm số ngày khác nhau. */
  day: string;
};

export function difficultyForLevel(level: number) {
  return (MASTERY_LEVELS[Math.min(Math.max(level, 0), 4)] ?? MASTERY_LEVELS[0]).difficulty;
}

export function levelName(level: number) {
  return (MASTERY_LEVELS[Math.min(Math.max(level, 0), 4)] ?? MASTERY_LEVELS[0]).name;
}

export type MasteryVerdict = {
  level: number;
  previousLevel: number;
  changed: 'up' | 'down' | 'same';
  masteryPercent: number;
  /** Còn bao nhiêu câu đúng nữa (ở mức khó của bậc) là lên bậc. */
  toNextLevel: number;
  /** Đã luyện bậc này trong bao nhiêu ngày khác nhau. */
  distinctDays: number;
  nextReviewAt: Date | null;
};

/**
 * Chấm lại bậc thành thạo từ lịch sử trả lời (mới nhất trước).
 * Thuần tuý tính toán, không đụng DB — nhờ vậy kiểm thử được trực tiếp.
 */
export function evaluate(answers: AnswerPoint[], currentLevel: number, now = new Date()): MasteryVerdict {
  const recent = answers.slice(0, RULES.window);
  const masteryPercent = recent.length
    ? Math.round((recent.filter((a) => a.isCorrect).length / recent.length) * 10000) / 100
    : 0;

  const targetDiff = difficultyForLevel(currentLevel);
  const atLevel = answers.filter((a) => a.difficulty === targetDiff).slice(0, RULES.promoteWindow);
  const correctAtLevel = atLevel.filter((a) => a.isCorrect).length;
  const distinctDays = new Set(atLevel.filter((a) => a.isCorrect).map((a) => a.day)).size;

  let level = currentLevel;
  let changed: 'up' | 'down' | 'same' = 'same';

  const canPromote =
    currentLevel < 4 &&
    atLevel.length >= RULES.promoteWindow &&
    correctAtLevel >= RULES.promoteCorrect &&
    distinctDays >= RULES.promoteDistinctDays;

  const last10 = recent.slice(0, 10);
  const shouldDemote =
    currentLevel > 0 && last10.length >= 10 && last10.filter((a) => a.isCorrect).length < RULES.demoteBelow;

  if (canPromote) { level = currentLevel + 1; changed = 'up'; }
  else if (shouldDemote) { level = currentLevel - 1; changed = 'down'; }

  // Còn thiếu bao nhiêu câu đúng nữa (ở mức khó của bậc) để đủ điều kiện lên bậc.
  const toNextLevel = Math.max(0, RULES.promoteCorrect - correctAtLevel);

  const nextReviewAt = new Date(now);
  nextReviewAt.setDate(nextReviewAt.getDate() + (RULES.reviewDays[level] ?? 7));

  return {
    level,
    previousLevel: currentLevel,
    changed,
    masteryPercent,
    toNextLevel: level >= 4 ? 0 : toNextLevel,
    distinctDays,
    nextReviewAt,
  };
}
