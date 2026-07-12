import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Get(':childId')
  @ApiOperation({ summary: 'Gợi ý bài học hôm nay của bé (tự sinh nếu chưa có)' })
  getForDay(
    @Param('childId', ParseIntPipe) childId: number,
    @Query('date') date?: string,
  ) {
    return this.service.getForDay(childId, date);
  }

  @Post(':childId/generate')
  @ApiOperation({ summary: 'Sinh lại gợi ý cho bé' })
  generate(@Param('childId', ParseIntPipe) childId: number, @Query('date') date?: string) {
    return this.service.generate(childId, date);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cập nhật trạng thái gợi ý (done/skipped)' })
  setStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'pending' | 'done' | 'skipped',
  ) {
    return this.service.setStatus(id, status);
  }
}
