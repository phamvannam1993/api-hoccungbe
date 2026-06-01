import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniGame } from './entities/mini-game.entity';
import { MiniGamesService } from './mini-games.service';
import { MiniGamesController } from './mini-games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MiniGame])],
  controllers: [MiniGamesController],
  providers: [MiniGamesService],
  exports: [MiniGamesService],
})
export class MiniGamesModule {}
