import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Param,
  Patch,
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
import { IqCodesService } from './iq-codes.service';
import {
  GenerateCodesDto,
  ListCodesQuery,
  RedeemCodeDto,
  UpdateCodeDto,
} from './dto/iq-codes.dto';

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

@Controller('iq-codes')
export class IqCodesController {
  constructor(
    private readonly service: IqCodesService,
    private readonly config: ConfigService,
  ) {}

  /** Admin: tạo hàng loạt mã cho một khóa / combo. */
  @Post('generate')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async generate(
    @Body() dto: GenerateCodesDto,
    @Req() req: { user?: { email?: string } },
  ) {
    const codes = await this.service.generate(dto, req.user?.email ?? null);
    return { codes };
  }

  /** Admin: danh sách mã (lọc theo khóa, trạng thái, tìm theo mã / ghi chú). */
  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  list(@Query() query: ListCodesQuery) {
    return this.service.list(query);
  }

  /** Admin: thống kê số mã theo khóa. */
  @Get('stats')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  stats() {
    return this.service.stats();
  }

  /** Admin: thu hồi / mở lại mã, sửa ghi chú, số lượt dùng tối đa. */
  @Patch(':code')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(@Param('code') code: string, @Body() dto: UpdateCodeDto) {
    return this.service.update(code, dto);
  }

  /**
   * Tài khoản đang đăng nhập nhập mã. CHỈ server web (Next.js) gọi: kèm Bearer token của
   * phụ huynh và header `x-khv-key` = biến môi trường KHV_API_KEY — trình duyệt không gọi
   * thẳng được, nên giới hạn số lần nhập sai ở phía web không bị bỏ qua.
   */
  @Post('redeem')
  @UseGuards(AuthGuard('jwt'))
  redeem(
    @Body() dto: RedeemCodeDto,
    @Req() req: { user: { userId: number; email?: string } },
    @Headers('x-khv-key') key?: string,
  ) {
    const expected = this.config.get<string>('KHV_API_KEY');
    if (!expected)
      throw new ServiceUnavailableException('Chưa cấu hình KHV_API_KEY');
    // 403 (không phải 401) để web phân biệt với token phụ huynh hết hạn.
    if (!key || !safeEqual(key, expected)) throw new ForbiddenException();
    return this.service.redeem(
      dto.code,
      req.user.userId,
      req.user.email ?? null,
    );
  }

  /** Các gói Toán IQ còn hạn của tài khoản đang đăng nhập (đồng bộ khi đăng nhập máy khác). */
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: { user: { userId: number } }) {
    return this.service.access(req.user.userId);
  }
}
