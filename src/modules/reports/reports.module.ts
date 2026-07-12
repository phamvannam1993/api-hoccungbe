import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { WeeklyReport } from './entities/weekly-report.entity';
import { QuizAttempt } from '../attempts/entities/quiz-attempt.entity';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { SkillsModule } from '../skills/skills.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeeklyReport, QuizAttempt, ChildProfile]),
    SkillsModule,
    NotificationsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
