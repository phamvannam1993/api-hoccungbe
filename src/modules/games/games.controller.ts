import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateGameQuestionDto } from './dto/create-game-question.dto';
import { UpdateGameQuestionDto } from './dto/update-game-question.dto';
import { CreateGameItemDto } from './dto/create-game-item.dto';
import { UpdateGameItemDto } from './dto/update-game-item.dto';
import { Game } from './entities/game.entity';
import { GameQuestion } from './entities/game-question.entity';
import { GameItem } from './entities/game-item.entity';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo game mới' })
  @ApiResponse({ status: 201, description: 'Tạo game thành công', type: Game })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createGame(@Body() dto: CreateGameDto) {
    return this.gamesService.createGame(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách game' })
  @ApiQuery({
    name: 'lessonId',
    required: false,
    type: Number,
    description: 'Lọc game theo ID bài học',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách game thành công',
    type: [Game],
  })
  findAllGames(@Query('lessonId', new ParseIntPipe({ optional: true })) lessonId?: number) {
    return this.gamesService.findAllGames(lessonId);
  }

  @Get('types')
  @ApiOperation({
    summary: 'Danh mục các loại trò chơi (mô tả, kỹ năng phát triển, cơ sở giáo dục)',
    description:
      'Trả về mô tả chi tiết cho từng loại trò chơi để hiển thị cho phụ huynh: cách chơi, kỹ năng trẻ phát triển, cơ sở giáo dục/khoa học và độ tuổi phù hợp.',
  })
  @ApiResponse({ status: 200, description: 'Lấy danh mục loại trò chơi thành công' })
  getGameTypes() {
    return this.gamesService.getGameTypeCatalog();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết game kèm câu hỏi và items' })
  @ApiParam({ name: 'id', example: 1, description: 'ID game' })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết game thành công', type: Game })
  @ApiResponse({ status: 404, description: 'Game không tồn tại' })
  findOneGame(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOneGame(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật game' })
  @ApiParam({ name: 'id', example: 1, description: 'ID game' })
  @ApiResponse({ status: 200, description: 'Cập nhật game thành công', type: Game })
  @ApiResponse({ status: 400, description: 'Dữ liệu cập nhật không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Game không tồn tại' })
  updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGameDto,
  ) {
    return this.gamesService.updateGame(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa game' })
  @ApiParam({ name: 'id', example: 1, description: 'ID game' })
  @ApiResponse({
    status: 200,
    description: 'Xóa game thành công',
    schema: { example: { message: 'Game deleted successfully' } },
  })
  @ApiResponse({ status: 404, description: 'Game không tồn tại' })
  removeGame(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.removeGame(id);
  }

  @Get(':id/play')
  @ApiOperation({ summary: 'Lấy dữ liệu chơi game (game + câu hỏi + items theo thứ tự)' })
  @ApiParam({ name: 'id', example: 1, description: 'ID game' })
  @ApiResponse({
    status: 200,
    description: 'Lấy dữ liệu chơi game thành công',
    type: Game,
  })
  @ApiResponse({ status: 404, description: 'Game không tồn tại' })
  getPlayData(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getPlayData(id);
  }

  @Post(':gameId/questions')
  @ApiOperation({ summary: 'Thêm câu hỏi vào game' })
  @ApiParam({ name: 'gameId', example: 1, description: 'ID game' })
  @ApiResponse({
    status: 201,
    description: 'Thêm câu hỏi thành công',
    type: GameQuestion,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createQuestion(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() dto: CreateGameQuestionDto,
  ) {
    return this.gamesService.createQuestion(gameId, dto);
  }

  @Get(':gameId/questions')
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi của game' })
  @ApiParam({ name: 'gameId', example: 1, description: 'ID game' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách câu hỏi thành công',
    type: [GameQuestion],
  })
  findQuestions(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.gamesService.findQuestions(gameId);
  }

  @Patch('questions/:questionId')
  @ApiOperation({ summary: 'Cập nhật câu hỏi' })
  @ApiParam({ name: 'questionId', example: 1, description: 'ID câu hỏi' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật câu hỏi thành công',
    type: GameQuestion,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu cập nhật không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Câu hỏi không tồn tại' })
  updateQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() dto: UpdateGameQuestionDto,
  ) {
    return this.gamesService.updateQuestion(questionId, dto);
  }

  @Delete('questions/:questionId')
  @ApiOperation({ summary: 'Xóa câu hỏi' })
  @ApiParam({ name: 'questionId', example: 1, description: 'ID câu hỏi' })
  @ApiResponse({
    status: 200,
    description: 'Xóa câu hỏi thành công',
    schema: { example: { message: 'Game question deleted successfully' } },
  })
  @ApiResponse({ status: 404, description: 'Câu hỏi không tồn tại' })
  removeQuestion(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.gamesService.removeQuestion(questionId);
  }

  @Post('questions/:questionId/items')
  @ApiOperation({ summary: 'Thêm item vào câu hỏi' })
  @ApiParam({ name: 'questionId', example: 1, description: 'ID câu hỏi' })
  @ApiResponse({
    status: 201,
    description: 'Thêm item thành công',
    type: GameItem,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createItem(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() dto: CreateGameItemDto,
  ) {
    return this.gamesService.createItem(questionId, dto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Cập nhật item' })
  @ApiParam({ name: 'itemId', example: 1, description: 'ID item' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật item thành công',
    type: GameItem,
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu cập nhật không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Item không tồn tại' })
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateGameItemDto,
  ) {
    return this.gamesService.updateItem(itemId, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Xóa item' })
  @ApiParam({ name: 'itemId', example: 1, description: 'ID item' })
  @ApiResponse({
    status: 200,
    description: 'Xóa item thành công',
    schema: { example: { message: 'Game item deleted successfully' } },
  })
  @ApiResponse({ status: 404, description: 'Item không tồn tại' })
  removeItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.gamesService.removeItem(itemId);
  }
}
