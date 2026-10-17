import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { AdminGuard } from '../../common/guards/admin.guard';
import { UsersService } from '../users/users.service';
import { IqOrdersService } from './iq-orders.service';
import {
  CreateOrderDto,
  ListOrdersQuery,
  ReviewOrderDto,
} from './dto/iq-orders.dto';

type JwtReq = { user: { userId: number; email?: string } };

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

@Controller('iq-orders')
export class IqOrdersController {
  constructor(
    private readonly service: IqOrdersService,
    private readonly users: UsersService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Phụ huynh bấm "Mua". CHỈ server web gọi (Bearer phụ huynh + x-khv-key) vì giá gói do web tính
   * theo bảng giá — trình duyệt không tự đặt được số tiền.
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() dto: CreateOrderDto,
    @Req() req: JwtReq,
    @Headers('x-khv-key') key?: string,
  ) {
    const expected = this.config.get<string>('KHV_API_KEY');
    if (!expected)
      throw new ServiceUnavailableException('Chưa cấu hình KHV_API_KEY');
    if (!key || !safeEqual(key, expected)) throw new ForbiddenException();
    const user = await this.users.findOne(req.user.userId).catch(() => null);
    return this.service.create(
      {
        userId: req.user.userId,
        email: user?.email ?? req.user.email,
        fullName: user?.fullName,
      },
      dto,
    );
  }

  /** Đơn của tài khoản đang đăng nhập. */
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  mine(@Req() req: JwtReq) {
    return this.service.mine(req.user.userId);
  }

  @Post('me/:code/cancel')
  @UseGuards(AuthGuard('jwt'))
  cancel(@Req() req: JwtReq, @Param('code') code: string) {
    return this.service.cancel(req.user.userId, code);
  }

  /** Admin: danh sách đơn (đơn chờ duyệt lên đầu). */
  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  list(@Query() query: ListOrdersQuery) {
    return this.service.list(query);
  }

  @Post(':id/approve')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  approve(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReviewOrderDto,
    @Req() req: JwtReq,
  ) {
    return this.service.approve(id, req.user.email ?? null, dto.note);
  }

  @Post(':id/reject')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReviewOrderDto,
    @Req() req: JwtReq,
  ) {
    return this.service.reject(id, req.user.email ?? null, dto.note);
  }
}
