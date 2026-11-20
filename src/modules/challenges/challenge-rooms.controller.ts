import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChallengeRoomsService } from './challenge-rooms.service';

/**
 * Phòng thi đấu Sân chơi Trí tuệ (công khai, định danh bằng biệt danh như bảng xếp hạng):
 * POST /api/challenge-rooms {hostName, grade, title?} → phòng mới (mã + seed, hạn 48 giờ)
 * GET  /api/challenge-rooms/:code → thông tin phòng + bảng điểm
 * POST /api/challenge-rooms/:code/submit {name, avatar?, score, correct, time} → lưu lượt tốt nhất
 */
@Controller('challenge-rooms')
export class ChallengeRoomsController {
  constructor(private readonly service: ChallengeRoomsService) {}

  @Post()
  create(
    @Body('hostName') hostName: string,
    @Body('grade') grade: number,
    @Body('title') title?: string,
  ) {
    return this.service.create(hostName, grade, title);
  }

  @Get(':code')
  get(@Param('code') code: string) {
    return this.service.get(code);
  }

  @Post(':code/submit')
  submit(@Param('code') code: string, @Body() body: Record<string, unknown>) {
    return this.service.submit(code, body);
  }
}
