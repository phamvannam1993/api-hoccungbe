import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameQuestion } from './entities/game-question.entity';
import { GameItem } from './entities/game-item.entity';
import { Puzzle } from './entities/puzzle.entity';
import { PuzzlePiece } from './entities/puzzle-piece.entity';
import { PuzzleProgress } from './entities/puzzle-progress.entity';
import { PuzzleLeaderboard } from './entities/puzzle-leaderboard.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { PuzzleController } from './controllers/puzzle.controller';
import { PuzzleService } from './services/puzzle.service';
import { PuzzleLeaderboardController } from './controllers/puzzle-leaderboard.controller';
import { PuzzleLeaderboardService } from './services/puzzle-leaderboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      GameQuestion,
      GameItem,
      Puzzle,
      PuzzlePiece,
      PuzzleProgress,
      PuzzleLeaderboard,
    ]),
  ],
  controllers: [GamesController, PuzzleController, PuzzleLeaderboardController],
  providers: [GamesService, PuzzleService, PuzzleLeaderboardService],
  exports: [GamesService, PuzzleService, PuzzleLeaderboardService, TypeOrmModule],
})
export class GamesModule {}
