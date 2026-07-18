import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { DailyRecommendation } from './entities/daily-recommendation.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { AttemptAnswer } from '../attempts/entities/attempt-answer.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyRecommendation, Progress, Lesson, AttemptAnswer, Quiz])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
