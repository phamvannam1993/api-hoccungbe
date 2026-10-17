import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

type JwtReq = { user: { userId: number; role?: string } };

/* Thông báo là dữ liệu riêng của từng người.
 *
 * Bản trước KHÔNG có guard nào: `GET /notifications/user/5` ai gọi cũng được, đổi
 * số là đọc thông báo của người khác; `PATCH /:id/read` thì đánh dấu đã đọc hộ bất
 * kỳ ai. Trang web cũ chưa gọi tới nên chưa ai thấy, nhưng nối giao diện vào là mở
 * thẳng cửa ấy ra.
 *
 * Nay danh tính lấy từ TOKEN, không lấy từ địa chỉ. Đường `/user/:userId` giữ lại
 * cho tương thích nhưng chỉ chính chủ hoặc admin gọi được. */
@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  /** Chặn xem trộm: chỉ chính chủ hoặc admin. */
  private chinhChu(req: JwtReq, userId: number): void {
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      throw new ForbiddenException('Không xem được thông báo của người khác');
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Thông báo của chính mình' })
  listMine(@Req() req: JwtReq) {
    return this.service.listForUser(req.user.userId);
  }

  @Get('me/unread-count')
  @ApiOperation({ summary: 'Số thông báo chưa đọc của chính mình' })
  async unreadMine(@Req() req: JwtReq) {
    return { count: await this.service.unreadCount(req.user.userId) };
  }

  @Patch('me/read-all')
  @ApiOperation({ summary: 'Đánh dấu đã đọc tất cả của chính mình' })
  markAllMine(@Req() req: JwtReq) {
    return this.service.markAllRead(req.user.userId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Danh sách thông báo của một phụ huynh (chính chủ hoặc admin)' })
  list(@Param('userId', ParseIntPipe) userId: number, @Req() req: JwtReq) {
    this.chinhChu(req, userId);
    return this.service.listForUser(userId);
  }

  @Get('user/:userId/unread-count')
  @ApiOperation({ summary: 'Số thông báo chưa đọc (chính chủ hoặc admin)' })
  async unread(@Param('userId', ParseIntPipe) userId: number, @Req() req: JwtReq) {
    this.chinhChu(req, userId);
    return { count: await this.service.unreadCount(userId) };
  }

  @Patch('user/:userId/read-all')
  @ApiOperation({ summary: 'Đánh dấu đã đọc tất cả (chính chủ hoặc admin)' })
  markAll(@Param('userId', ParseIntPipe) userId: number, @Req() req: JwtReq) {
    this.chinhChu(req, userId);
    return this.service.markAllRead(userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu một thông báo đã đọc (chỉ thông báo của mình)' })
  markRead(@Param('id', ParseIntPipe) id: number, @Req() req: JwtReq) {
    /* Truyền userId xuống chứ không tin id suông: không có nó thì ai cũng đánh dấu
       đã đọc hộ người khác, và bên gọi không cách nào biết mình vừa chạm vào ai. */
    return this.service.markRead(id, req.user.userId, req.user.role === 'admin');
  }
}
