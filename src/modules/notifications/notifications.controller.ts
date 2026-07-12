import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Danh sách thông báo của phụ huynh' })
  list(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.listForUser(userId);
  }

  @Get('user/:userId/unread-count')
  @ApiOperation({ summary: 'Số thông báo chưa đọc' })
  unread(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.unreadCount(userId).then((count) => ({ count }));
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu đã đọc' })
  markRead(@Param('id', ParseIntPipe) id: number) {
    return this.service.markRead(id);
  }

  @Patch('user/:userId/read-all')
  @ApiOperation({ summary: 'Đánh dấu đã đọc tất cả' })
  markAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.markAllRead(userId);
  }
}
