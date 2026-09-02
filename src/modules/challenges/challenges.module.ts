import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeScore } from './entities/challenge-score.entity';
import { ChallengeDaily } from './entities/challenge-daily.entity';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeScore, ChallengeDaily])],
  providers: [ChallengesService],
  controllers: [ChallengesController],
  exports: [ChallengesService],
})
export class ChallengesModule {}
