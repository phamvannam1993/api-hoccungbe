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
import { PuzzleService } from '../services/puzzle.service';
import { CreatePuzzleDto } from '../dto/create-puzzle.dto';
import { CreatePuzzlePieceDto } from '../dto/create-puzzle-piece.dto';
import { SubmitPuzzleDto } from '../dto/submit-puzzle.dto';
import { Puzzle } from '../entities/puzzle.entity';
import { PuzzlePiece } from '../entities/puzzle-piece.entity';

@ApiTags('Puzzles')
@Controller('puzzles')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo puzzle mới' })
  @ApiResponse({ status: 201, description: 'Tạo puzzle thành công', type: Puzzle })
  createPuzzle(@Body() dto: CreatePuzzleDto) {
    return this.puzzleService.createPuzzle(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách puzzle' })
  @ApiQuery({
    name: 'lessonId',
    required: false,
    type: Number,
    description: 'Lọc puzzle theo ID bài học',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách puzzle thành công',
    type: [Puzzle],
  })
  findAllPuzzles(@Query('lessonId', new ParseIntPipe({ optional: true })) lessonId?: number) {
    return this.puzzleService.findAllPuzzles(lessonId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết puzzle kèm mảnh' })
  @ApiParam({ name: 'id', example: 1, description: 'ID puzzle' })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết puzzle thành công', type: Puzzle })
  @ApiResponse({ status: 404, description: 'Puzzle không tồn tại' })
  findOnePuzzle(@Param('id', ParseIntPipe) id: number) {
    return this.puzzleService.findOnePuzzle(id);
  }

  @Get(':id/play')
  @ApiOperation({ summary: 'Lấy dữ liệu chơi puzzle' })
  @ApiParam({ name: 'id', example: 1, description: 'ID puzzle' })
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  getPuzzlePlayData(@Param('id', ParseIntPipe) id: number) {
    return this.puzzleService.getPuzzlePlayData(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật puzzle' })
  @ApiParam({ name: 'id', example: 1, description: 'ID puzzle' })
  @ApiResponse({ status: 200, description: 'Cập nhật puzzle thành công', type: Puzzle })
  updatePuzzle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreatePuzzleDto>,
  ) {
    return this.puzzleService.updatePuzzle(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa puzzle' })
  @ApiParam({ name: 'id', example: 1, description: 'ID puzzle' })
  @ApiResponse({
    status: 200,
    description: 'Xóa puzzle thành công',
    schema: { example: { message: 'Puzzle deleted successfully' } },
  })
  removePuzzle(@Param('id', ParseIntPipe) id: number) {
    return this.puzzleService.removePuzzle(id);
  }

  // ─── Piece Management ──────────────────────────────────────────────────

  @Post(':puzzleId/pieces')
  @ApiOperation({ summary: 'Thêm mảnh vào puzzle' })
  @ApiParam({ name: 'puzzleId', example: 1, description: 'ID puzzle' })
  @ApiResponse({
    status: 201,
    description: 'Thêm mảnh thành công',
    type: PuzzlePiece,
  })
  createPiece(
    @Param('puzzleId', ParseIntPipe) puzzleId: number,
    @Body() dto: CreatePuzzlePieceDto,
  ) {
    return this.puzzleService.createPiece(puzzleId, dto);
  }

  @Patch('pieces/:pieceId')
  @ApiOperation({ summary: 'Cập nhật mảnh' })
  @ApiParam({ name: 'pieceId', example: 1, description: 'ID mảnh' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật mảnh thành công',
    type: PuzzlePiece,
  })
  updatePiece(
    @Param('pieceId', ParseIntPipe) pieceId: number,
    @Body() dto: Partial<CreatePuzzlePieceDto>,
  ) {
    return this.puzzleService.updatePiece(pieceId, dto);
  }

  @Delete('pieces/:pieceId')
  @ApiOperation({ summary: 'Xóa mảnh' })
  @ApiParam({ name: 'pieceId', example: 1, description: 'ID mảnh' })
  @ApiResponse({
    status: 200,
    description: 'Xóa mảnh thành công',
    schema: { example: { message: 'Piece deleted successfully' } },
  })
  removePiece(@Param('pieceId', ParseIntPipe) pieceId: number) {
    return this.puzzleService.removePiece(pieceId);
  }

  // ─── Progress Management ───────────────────────────────────────────────

  @Get('progress/:userId/:puzzleId')
  @ApiOperation({ summary: 'Lấy tiến độ người dùng cho puzzle' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiParam({ name: 'puzzleId', example: 1, description: 'ID puzzle' })
  @ApiResponse({ status: 200, description: 'Lấy tiến độ thành công' })
  getUserProgress(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('puzzleId', ParseIntPipe) puzzleId: number,
  ) {
    return this.puzzleService.getUserProgress(userId, puzzleId);
  }

  @Post('submit')
  @ApiOperation({ summary: 'Nộp kết quả giải puzzle' })
  @ApiResponse({
    status: 201,
    description: 'Nộp kết quả thành công',
  })
  submitPuzzle(@Body() dto: SubmitPuzzleDto) {
    // Note: In production, extract userId from JWT token
    // For now, using a placeholder - implement proper auth
    const userId = 1; // TODO: Get from authentication
    return this.puzzleService.submitPuzzle(userId, dto);
  }

  @Delete('progress/:userId/:puzzleId')
  @ApiOperation({ summary: 'Reset tiến độ' })
  @ApiParam({ name: 'userId', example: 1, description: 'ID người dùng' })
  @ApiParam({ name: 'puzzleId', example: 1, description: 'ID puzzle' })
  @ApiResponse({
    status: 200,
    description: 'Reset tiến độ thành công',
  })
  resetProgress(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('puzzleId', ParseIntPipe) puzzleId: number,
  ) {
    return this.puzzleService.resetProgress(userId, puzzleId);
  }
}
