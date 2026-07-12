import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { AttemptAnswer } from './entities/attempt-answer.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { StreaksModule } from '../streaks/streaks.module';
import { RecommendationsModule } from '../recommendations/recommendations.module';
import { GamificationModule } from '../gamification/gamification.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAttempt, AttemptAnswer, Progress, Quiz]),
    StreaksModule,
    RecommendationsModule,
    GamificationModule,
    SkillsModule,
  ],
  controllers: [AttemptsController],
  providers: [AttemptsService],
  exports: [AttemptsService],
})
export class AttemptsModule {}
