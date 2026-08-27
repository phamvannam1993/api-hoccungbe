import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly service: ChallengesService) {}

  /** Nộp điểm thử thách. Body: { name, score }. Công khai (không cần đăng nhập). */
  @Post('submit')
  submit(@Body('name') name: string, @Body('score') score: number) {
    return this.service.submit(name, score);
  }

  /** Bảng xếp hạng tuần hiện tại. */
  @Get('leaderboard')
  leaderboard(@Query('limit') limit?: string) {
    return this.service.leaderboard(limit ? Number(limit) : 20);
  }
}
