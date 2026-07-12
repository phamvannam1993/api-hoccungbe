import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StreaksService } from './streaks.service';

@ApiTags('streaks')
@Controller('streaks')
export class StreaksController {
  constructor(private readonly service: StreaksService) {}

  @Get(':childId')
  @ApiOperation({ summary: 'Xem chuỗi ngày học của bé' })
  get(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.get(childId);
  }

  @Post(':childId/touch')
  @ApiOperation({ summary: 'Đánh dấu bé có học hôm nay (cập nhật chuỗi ngày)' })
  touch(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.touch(childId);
  }
}
