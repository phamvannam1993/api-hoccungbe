import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Topic } from './entities/topic.entity';
import { Level } from './entities/level.entity';
import { GameLesson } from './entities/game-lesson.entity';
import { GameQuestion } from './entities/game-question.entity';

@Injectable()
export class PlayService {
  constructor(
    @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
    @InjectRepository(Level) private levelRepo: Repository<Level>,
    @InjectRepository(GameLesson) private lessonRepo: Repository<GameLesson>,
    @InjectRepository(GameQuestion) private questionRepo: Repository<GameQuestion>,
  ) {}

  findAllSubjects() {
    return this.subjectRepo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC' },
    });
  }

  async findTopicsBySubject(subjectSlug: string) {
    const subject = await this.subjectRepo.findOne({ where: { slug: subjectSlug } });
    if (!subject) throw new NotFoundException('Subject not found');
    const topics = await this.topicRepo.find({
      where: { subjectId: subject.id, isActive: true },
      order: { sortOrder: 'ASC' },
    });
    return { subject, topics };
  }

  async findLevelsByTopic(topicSlug: string) {
    const topic = await this.topicRepo.findOne({
      where: { slug: topicSlug },
      relations: ['subject'],
    });
    if (!topic) throw new NotFoundException('Topic not found');
    const levels = await this.levelRepo.find({
      where: { topicId: topic.id, isActive: true },
      order: { sortOrder: 'ASC' },
    });
    return { topic, levels };
  }

  async findLessonsByLevel(levelSlug: string) {
    const level = await this.levelRepo.findOne({
      where: { slug: levelSlug },
      relations: ['topic', 'topic.subject'],
    });
    if (!level) throw new NotFoundException('Level not found');
    const lessons = await this.lessonRepo.find({
      where: { levelId: level.id },
      order: { sortOrder: 'ASC' },
    });
    // attach question count
    const lessonsWithCount = await Promise.all(
      lessons.map(async (l) => {
        const count = await this.questionRepo.count({ where: { lessonId: l.id } });
        return { ...l, questionCount: count };
      }),
    );
    return { level, lessons: lessonsWithCount };
  }

  async findQuestionsByLesson(lessonId: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: ['level', 'level.topic', 'level.topic.subject'],
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    const questions = await this.questionRepo.find({
      where: { lessonId },
      order: { sortOrder: 'ASC' },
    });
    return { lesson, questions };
  }
}
