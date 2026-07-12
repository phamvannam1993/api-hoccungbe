import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationService } from './gamification.service';
import { GamificationController } from './gamification.controller';
import { Badge } from './entities/badge.entity';
import { ChildBadge } from './entities/child-badge.entity';
import { Quest } from './entities/quest.entity';
import { ChildQuestProgress } from './entities/child-quest-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge, ChildBadge, Quest, ChildQuestProgress])],
  controllers: [GamificationController],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
