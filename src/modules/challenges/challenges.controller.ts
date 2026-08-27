import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly service: ChallengesService) {}

  /** Nộp điểm thử thách. Body: { name, score, grade }. Công khai (không cần đăng nhập). */
  @Post('submit')
  submit(@Body('name') name: string, @Body('score') score: number, @Body('grade') grade: number) {
    return this.service.submit(name, score, grade);
  }

  /** Bảng xếp hạng tuần hiện tại theo lớp. */
  @Get('leaderboard')
  leaderboard(@Query('grade') grade?: string, @Query('limit') limit?: string) {
    return this.service.leaderboard(grade, limit ? Number(limit) : 20);
  }
}
