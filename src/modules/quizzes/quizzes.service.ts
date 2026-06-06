import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizzesRepository: Repository<Quiz>,
  ) {}

  create(dto: CreateQuizDto) {
    const entity = this.quizzesRepository.create(dto);
    return this.quizzesRepository.save(entity);
  }

  async findAll(lessonId?: number, courseId?: number, search?: string, page = 1, limit = 20, questionType?: string) {
    const qb = this.quizzesRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.lesson', 'lesson');

    if (lessonId) qb.andWhere('q.lessonId = :lessonId', { lessonId });
    if (courseId) qb.andWhere('lesson.courseId = :courseId', { courseId });
    if (search) qb.andWhere('q.questionText LIKE :search', { search: `%${search}%` });
    if (questionType) qb.andWhere('q.questionType = :questionType', { questionType });

    qb.orderBy('q.difficultyLevel', 'ASC').addOrderBy('q.sortOrder', 'ASC');

    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findByLesson(lessonId: number) {
    const quizzes = await this.quizzesRepository.find({
      where: { lessonId, isActive: true },
      order: { sortOrder: 'ASC' },
    });

    const order = ['easy', 'medium', 'hard'];
    const grouped = order.reduce<Record<string, typeof quizzes>>((acc, level) => {
      acc[level] = quizzes.filter((q) => q.difficultyLevel === level);
      return acc;
    }, {});

    return {
      total: quizzes.length,
      groups: order
        .filter((level) => grouped[level].length > 0)
        .map((level) => ({
          difficultyLevel: level,
          label: level === 'easy' ? 'Trình độ dễ' : level === 'medium' ? 'Trình độ trung bình' : 'Trình độ nâng cao',
          count: grouped[level].length,
          quizzes: grouped[level],
        })),
    };
  }

  async findExercises(lessonId: number) {
    const diffLabel: Record<string, string> = {
      easy: 'Trình độ dễ',
      medium: 'Trình độ trung bình',
      hard: 'Trình độ nâng cao',
    };
    const diffStars: Record<string, number> = { easy: 3, medium: 5, hard: 6 };

    const quizzes = await this.quizzesRepository.find({
      where: { lessonId, isActive: true },
      order: { exerciseNumber: 'ASC', sortOrder: 'ASC' },
    });

    // Group by exerciseNumber
    const map = new Map<number, typeof quizzes>();
    quizzes.forEach((q) => {
      const n = q.exerciseNumber ?? 1;
      if (!map.has(n)) map.set(n, []);
      map.get(n)!.push(q);
    });

    const exercises = Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([exNum, items]) => {
        const level = items[0].difficultyLevel;
        return {
          exerciseNumber: exNum,
          difficultyLevel: level,
          label: diffLabel[level] ?? level,
          stars: diffStars[level] ?? 3,
          quizCount: items.length,
          quizzes: items,
        };
      });

    return { total: quizzes.length, exercises };
  }

  async findExerciseByNumber(lessonId: number, exerciseNumber: number) {
    const { exercises } = await this.findExercises(lessonId);
    const exercise = exercises.find((e) => e.exerciseNumber === exerciseNumber);
    if (!exercise) throw new NotFoundException('Exercise not found');
    return exercise;
  }

  async findOne(id: number) {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['lesson'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async update(id: number, dto: UpdateQuizDto) {
    const quiz = await this.findOne(id);
    Object.assign(quiz, dto);
    return this.quizzesRepository.save(quiz);
  }

  async remove(id: number) {
    const quiz = await this.findOne(id);
    await this.quizzesRepository.remove(quiz);
    return { message: 'Quiz deleted successfully' };
  }

  async importQuestions(lessonId: number, questions: any[]) {
    if (!lessonId || !questions || questions.length === 0) {
      throw new Error('lessonId and questions array are required');
    }

    const created: Quiz[] = [];
    let sortOrder = 1;

    try {
      for (let idx = 0; idx < questions.length; idx++) {
        const q = questions[idx];
        try {
          // Ensure proper type conversion and validation
          const questionData = {
            lessonId: Number(lessonId),
            questionText: String(q.questionText || '').trim(),
            questionType: String(q.questionType || 'single_choice').toLowerCase(),
            difficultyLevel: String(q.difficultyLevel || 'easy').toLowerCase(),
            optionsJson: Array.isArray(q.optionsJson) ? q.optionsJson : [],
            correctAnswerJson: typeof q.correctAnswerJson === 'string'
              ? q.correctAnswerJson
              : JSON.stringify(q.correctAnswerJson || ''),
            explanation: String(q.explanation || '').trim(),
            sortOrder: Number(sortOrder++),
            exerciseNumber: Number(q.exerciseNumber || 1),
            points: Number(q.points || 10),
            isActive: true,
            questionImageUrl: q.questionImageUrl ? String(q.questionImageUrl) : undefined,
            questionAudioUrl: q.questionAudioUrl ? String(q.questionAudioUrl) : undefined,
            explanationAudioUrl: q.explanationAudioUrl ? String(q.explanationAudioUrl) : undefined,
          };

          console.log(`[importQuestions] Creating question ${idx + 1}:`, {
            questionText: questionData.questionText.substring(0, 50),
            questionType: questionData.questionType,
            difficultyLevel: questionData.difficultyLevel,
          });

          const entity = this.quizzesRepository.create(questionData);
          const saved = await this.quizzesRepository.save(entity);
          created.push(saved);
        } catch (itemError) {
          console.error(`[importQuestions] Error importing question ${idx + 1}:`, itemError);
          throw new Error(`Failed to import question ${idx + 1}: ${itemError instanceof Error ? itemError.message : String(itemError)}`);
        }
      }

      return {
        message: `Imported ${created.length} questions successfully`,
        total: created.length,
        data: created,
      };
    } catch (error) {
      console.error('[importQuestions] Error:', error);
      throw error;
    }
  }
}
