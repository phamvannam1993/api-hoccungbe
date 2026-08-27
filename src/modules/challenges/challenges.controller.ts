import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly service: ChallengesService) {}

  /** Nộp điểm thử thách. Body: { name, score, grade, subject }. Công khai (không cần đăng nhập). */
  @Post('submit')
  submit(@Body('name') name: string, @Body('score') score: number, @Body('grade') grade: number, @Body('subject') subject: string) {
    return this.service.submit(name, score, grade, subject);
  }

  /** Bảng xếp hạng tuần hiện tại theo lớp & môn. */
  @Get('leaderboard')
  leaderboard(@Query('grade') grade?: string, @Query('subject') subject?: string, @Query('limit') limit?: string) {
    return this.service.leaderboard(grade, subject, limit ? Number(limit) : 20);
  }
}
