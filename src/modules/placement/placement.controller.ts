import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlacementService, PlacementAnswer } from './placement.service';

@ApiTags('placement')
@Controller('placement')
export class PlacementController {
  constructor(private readonly service: PlacementService) {}

  /** Bộ câu hỏi khảo sát đầu vào theo lớp. */
  @Get('questions')
  getQuestions(@Query('grade') grade?: string, @Query('count') count?: string) {
    return this.service.getQuestions(grade || '1', count ? Number(count) : 12);
  }

  /** Nộp bài khảo sát → mức đề xuất + điểm mạnh/yếu. childId (tùy chọn) để lưu cho hồ sơ đã đăng nhập. */
  @Post('submit')
  submit(
    @Body() body: { grade?: string; childId?: number; answers: PlacementAnswer[] },
  ) {
    return this.service.submit(body.grade || '1', body.answers ?? [], body.childId);
  }
}
