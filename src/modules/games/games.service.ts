import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { GameQuestion } from './entities/game-question.entity';
import { GameItem } from './entities/game-item.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateGameQuestionDto } from './dto/create-game-question.dto';
import { UpdateGameQuestionDto } from './dto/update-game-question.dto';
import { CreateGameItemDto } from './dto/create-game-item.dto';
import { UpdateGameItemDto } from './dto/update-game-item.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    @InjectRepository(GameQuestion)
    private readonly questionsRepository: Repository<GameQuestion>,
    @InjectRepository(GameItem)
    private readonly itemsRepository: Repository<GameItem>,
  ) {}

  createGame(dto: CreateGameDto) {
    const entity = this.gamesRepository.create(dto);
    return this.gamesRepository.save(entity);
  }

  findAllGames(lessonId?: number) {
    if (lessonId) {
      return this.gamesRepository.find({ where: { lessonId } });
    }
    return this.gamesRepository.find();
  }

  async findOneGame(id: number) {
    const game = await this.gamesRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.items'],
    });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async updateGame(id: number, dto: UpdateGameDto) {
    const game = await this.findOneGame(id);
    Object.assign(game, dto);
    return this.gamesRepository.save(game);
  }

  async removeGame(id: number) {
    const game = await this.findOneGame(id);
    await this.gamesRepository.remove(game);
    return { message: 'Game deleted successfully' };
  }

  async getPlayData(id: number) {
    const game = await this.gamesRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.items'],
      order: {
        questions: {
          sortOrder: 'ASC',
          items: {
            sortOrder: 'ASC',
          },
        },
      },
    });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  createQuestion(gameId: number, dto: CreateGameQuestionDto) {
    const entity = this.questionsRepository.create({ ...dto, gameId });
    return this.questionsRepository.save(entity);
  }

  findQuestions(gameId: number) {
    return this.questionsRepository.find({
      where: { gameId },
      order: { sortOrder: 'ASC' },
      relations: ['items'],
    });
  }

  async updateQuestion(questionId: number, dto: UpdateGameQuestionDto) {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId },
    });
    if (!question) throw new NotFoundException('Game question not found');
    Object.assign(question, dto);
    return this.questionsRepository.save(question);
  }

  async removeQuestion(questionId: number) {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId },
    });
    if (!question) throw new NotFoundException('Game question not found');
    await this.questionsRepository.remove(question);
    return { message: 'Game question deleted successfully' };
  }

  createItem(questionId: number, dto: CreateGameItemDto) {
    const entity = this.itemsRepository.create({ ...dto, questionId });
    return this.itemsRepository.save(entity);
  }

  async updateItem(itemId: number, dto: UpdateGameItemDto) {
    const item = await this.itemsRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Game item not found');
    Object.assign(item, dto);
    return this.itemsRepository.save(item);
  }

  async removeItem(itemId: number) {
    const item = await this.itemsRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Game item not found');
    await this.itemsRepository.remove(item);
    return { message: 'Game item deleted successfully' };
  }
}
