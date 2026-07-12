import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { ChildProfile } from '../children/entities/child-profile.entity';
import { LearningStreak } from '../streaks/entities/learning-streak.entity';
import { ReportsModule } from '../reports/reports.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildProfile, LearningStreak]),
    ReportsModule,
    NotificationsModule,
  ],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
