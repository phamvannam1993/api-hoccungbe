import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttemptsService } from './attempts.service';
import { RecordAttemptDto } from './dto/record-attempt.dto';

@ApiTags('attempts')
@Controller('attempts')
export class AttemptsController {
  constructor(private readonly service: AttemptsService) {}

  @Post()
  @ApiOperation({ summary: 'Lưu kết quả một lần làm bài tập (kèm từng câu trả lời)' })
  @ApiResponse({ status: 201, description: 'Đã lưu, cập nhật tiến độ bài học' })
  record(@Body() dto: RecordAttemptDto) {
    return this.service.record(dto);
  }

  @Get('wrong/:childId')
  @ApiOperation({ summary: 'Danh sách câu bé đang trả lời sai (Ôn lại câu sai)' })
  getWrong(
    @Param('childId', ParseIntPipe) childId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.service.getWrongAnswers(childId, limit ?? 50);
  }

  @Get('stats/:childId')
  @ApiOperation({ summary: 'Thống kê tổng hợp cho Dashboard phụ huynh' })
  getStats(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.getChildStats(childId);
  }

  @Get('history/:childId')
  @ApiOperation({ summary: 'Lịch sử làm bài gần đây của bé' })
  getHistory(
    @Param('childId', ParseIntPipe) childId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.service.getHistory(childId, limit ?? 20);
  }

  @Get('lesson/:childId/:lessonId')
  @ApiOperation({ summary: 'Trạng thái/điểm từng bài tập của bé trong 1 bài học' })
  getLessonStatus(
    @Param('childId', ParseIntPipe) childId: number,
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.service.getLessonStatus(childId, lessonId);
  }
}
