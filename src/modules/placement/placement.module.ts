import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementController } from './placement.controller';
import { PlacementService } from './placement.service';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { LessonSkill } from '../skills/entities/lesson-skill.entity';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, ChildProfile, LessonSkill, Skill]),
    SkillsModule,
  ],
  controllers: [PlacementController],
  providers: [PlacementService],
})
export class PlacementModule {}
