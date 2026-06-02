import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PuzzleLeaderboardService } from '../services/puzzle-leaderboard.service';

@ApiTags('Puzzle Leaderboards')
@Controller('puzzle-leaderboards')
export class PuzzleLeaderboardController {
  constructor(private readonly leaderboardService: PuzzleLeaderboardService) {}

  @Get('global')
  @ApiOperation({ summary: 'Lấy bảng xếp hạng toàn cầu' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Số lượng người chơi (mặc định: 100)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Vị trí bắt đầu (mặc định: 0)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['points', 'time', 'completions'],
    description: 'Sắp xếp theo (mặc định: points)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy bảng xếp hạng thành công',
  })
  getGlobalLeaderboard(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('sortBy') sortBy: 'points' | 'time' | 'completions' = 'points',
  ) {
    return this.leaderboardService.getGlobalLeaderboard(
      limit || 100,
      offset || 0,
      sortBy,
    );
  }

  @Get('top-players')
  @ApiOperation({ summary: 'Lấy danh sách top players' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Số lượng top players (mặc định: 10)',
  })
  @ApiResponse({ status: 200, description: 'Lấy top players thành công' })
  getTopPlayers(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.leaderboardService.getTopPlayers(limit || 10);
  }

  @Get('puzzle/:puzzleId')
  @ApiOperation({ summary: 'Lấy bảng xếp hạng puzzle cụ thể' })
  @ApiParam({ name: 'puzzleId', example: 1, description: 'ID puzzle' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Số lượng người chơi (mặc định: 50)',
  })
  @ApiResponse({ status: 200, description: 'Lấy bảng xếp hạng puzzle thành công' })
  getPuzzleLeaderboard(
    @Param('puzzleId', ParseIntPipe) puzzleId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.leaderboardService.getPuzzleLeaderboard(puzzleId, limit || 50);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Lấy vị trí bảng xếp hạng của người dùng' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiResponse({ status: 200, description: 'Lấy vị trí thành công' })
  getUserPosition(@Param('userId', ParseIntPipe) userId: number) {
    return this.leaderboardService.getUserLeaderboardPosition(userId);
  }

  @Get('user/:userId/rank')
  @ApiOperation({ summary: 'Lấy xếp hạng toàn cầu của người dùng' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['points', 'completions'],
    description: 'Sắp xếp theo (mặc định: points)',
  })
  @ApiResponse({ status: 200, description: 'Lấy xếp hạng thành công' })
  getUserRank(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('sortBy') sortBy: 'points' | 'completions' = 'points',
  ) {
    return this.leaderboardService.getUserRank(userId, sortBy);
  }

  @Get('user/:userId/stats')
  @ApiOperation({ summary: 'Lấy thống kê của người dùng' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiResponse({ status: 200, description: 'Lấy thống kê thành công' })
  getUserStats(@Param('userId', ParseIntPipe) userId: number) {
    return this.leaderboardService.getUserStats(userId);
  }

  @Delete('user/:userId')
  @ApiOperation({ summary: 'Reset bảng xếp hạng của người dùng' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiResponse({ status: 200, description: 'Reset thành công' })
  resetUserLeaderboard(@Param('userId', ParseIntPipe) userId: number) {
    return this.leaderboardService.resetLeaderboard(userId);
  }

  @Delete('user/:userId/puzzle/:puzzleId')
  @ApiOperation({ summary: 'Reset bảng xếp hạng puzzle của người dùng' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiParam({ name: 'puzzleId', example: 1, description: 'ID puzzle' })
  @ApiResponse({ status: 200, description: 'Reset thành công' })
  resetPuzzleLeaderboard(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('puzzleId', ParseIntPipe) puzzleId: number,
  ) {
    return this.leaderboardService.resetLeaderboard(userId, puzzleId);
  }
}
