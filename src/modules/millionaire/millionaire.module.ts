import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MillionaireService } from './millionaire.service';
import { MillionaireController } from './millionaire.controller';
import { MillionaireRun } from './entities/millionaire-run.entity';
import { SkillQuestion } from '../skill-practice/entities/skill-question.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MillionaireRun, SkillQuestion, Skill])],
  controllers: [MillionaireController],
  providers: [MillionaireService],
  exports: [MillionaireService],
})
export class MillionaireModule {}
