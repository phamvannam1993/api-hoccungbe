import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('weekly/child/:childId')
  @ApiOperation({ summary: 'Danh sách báo cáo tuần của bé' })
  list(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.listForChild(childId);
  }

  @Post('weekly/generate')
  @ApiOperation({ summary: 'Tạo báo cáo tuần cho bé (gửi thông báo phụ huynh)' })
  generate(@Body() body: { childId: number; weekStart?: string; notify?: boolean }) {
    return this.service.generateForChild(body.childId, body.weekStart, body.notify ?? true);
  }
}
