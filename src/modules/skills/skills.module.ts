import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill } from './entities/skill.entity';
import { LessonSkill } from './entities/lesson-skill.entity';
import { GameSkill } from './entities/game-skill.entity';
import { ChildSkillMastery } from './entities/child-skill-mastery.entity';
import { QuizAttempt } from '../attempts/entities/quiz-attempt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, LessonSkill, GameSkill, ChildSkillMastery, QuizAttempt])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
