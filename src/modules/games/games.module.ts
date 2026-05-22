import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameQuestion } from './entities/game-question.entity';
import { GameItem } from './entities/game-item.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameQuestion, GameItem])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService, TypeOrmModule],
})
export class GamesModule {}
