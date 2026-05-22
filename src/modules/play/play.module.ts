import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { Subject } from './entities/subject.entity';
import { Topic } from './entities/topic.entity';
import { Level } from './entities/level.entity';
import { GameLesson } from './entities/game-lesson.entity';
import { GameQuestion } from './entities/game-question.entity';
import { UserGameProgress } from './entities/user-game-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Topic, Level, GameLesson, GameQuestion, UserGameProgress])],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
