import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillPracticeService } from './skill-practice.service';
import { SkillPracticeController } from './skill-practice.controller';
import { SkillQuestion } from './entities/skill-question.entity';
import { SkillAttempt } from './entities/skill-attempt.entity';
import { SkillAttemptAnswer } from './entities/skill-attempt-answer.entity';
import { Skill } from '../skills/entities/skill.entity';
import { ChildSkillMastery } from '../skills/entities/child-skill-mastery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillQuestion, SkillAttempt, SkillAttemptAnswer, Skill, ChildSkillMastery]),
  ],
  controllers: [SkillPracticeController],
  providers: [SkillPracticeService],
  exports: [SkillPracticeService],
})
export class SkillPracticeModule {}
