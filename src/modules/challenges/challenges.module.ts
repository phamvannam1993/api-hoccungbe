import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeScore } from './entities/challenge-score.entity';
import { ChallengeDaily } from './entities/challenge-daily.entity';
import { ChallengeRoom } from './entities/challenge-room.entity';
import { ChallengeRoomScore } from './entities/challenge-room-score.entity';
import { ChallengeRoomsService } from './challenge-rooms.service';
import { ChallengeRoomsController } from './challenge-rooms.controller';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChallengeScore,
      ChallengeDaily,
      ChallengeRoom,
      ChallengeRoomScore,
    ]),
  ],
  providers: [ChallengesService, ChallengeRoomsService],
  controllers: [ChallengesController, ChallengeRoomsController],
  exports: [ChallengesService],
})
export class ChallengesModule {}
