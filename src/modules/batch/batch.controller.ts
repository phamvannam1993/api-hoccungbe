import { Controller, ForbiddenException, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BatchService } from './batch.service';

@ApiTags('cron')
@Controller('cron')
export class BatchController {
  constructor(private readonly service: BatchService) {}

  private assertSecret(secret?: string) {
    const expected = process.env.CRON_SECRET || process.env.CACHE_WARM_SECRET;
    if (!expected || secret !== expected) {
      throw new ForbiddenException('Sai hoặc thiếu cron secret');
    }
  }

  @Post('weekly-reports')
  @ApiOperation({ summary: '[cron] Sinh báo cáo tuần cho tất cả bé (mỗi Chủ nhật)' })
  weeklyReports(@Headers('x-cron-secret') secret?: string) {
    this.assertSecret(secret);
    return this.service.generateWeeklyReports();
  }

  @Post('reminders')
  @ApiOperation({ summary: '[cron] Gửi nhắc học cho bé chưa học hôm nay (mỗi tối)' })
  reminders(@Headers('x-cron-secret') secret?: string) {
    this.assertSecret(secret);
    return this.service.sendStudyReminders();
  }
}
