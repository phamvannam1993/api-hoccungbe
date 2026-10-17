import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Ip,
  Headers,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';

// Chống dò / spam: mỗi IP tối đa 10 yêu cầu quên mật khẩu trong 15 phút (bộ nhớ tiến trình).
const IP_MAX = 10;
const IP_WINDOW_MS = 15 * 60 * 1000;
const ipHits = new Map<string, { count: number; resetAt: number }>();

/** IP người dùng: sau proxy / load balancer thì lấy địa chỉ đầu trong x-forwarded-for. */
function clientIp(forwarded: string | undefined, ip: string | undefined) {
  return forwarded?.split(',')[0].trim() || ip || undefined;
}

function limitIp(ip: string | undefined) {
  if (!ip) return;
  const now = Date.now();
  if (ipHits.size > 5000)
    for (const [k, v] of ipHits) if (v.resetAt <= now) ipHits.delete(k);
  const cur = ipHits.get(ip);
  const hit =
    cur && cur.resetAt > now ? cur : { count: 0, resetAt: now + IP_WINDOW_MS };
  hit.count += 1;
  ipHits.set(ip, hit);
  if (hit.count > IP_MAX)
    throw new HttpException(
      'Bố mẹ gửi yêu cầu nhiều lần quá, thử lại sau 15 phút nhé.',
      HttpStatus.TOO_MANY_REQUESTS,
    );
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Email đã tồn tại hoặc dữ liệu không hợp lệ',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiResponse({
    status: 201,
    description: 'Đăng nhập thành công',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Email hoặc mật khẩu không đúng',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Quên mật khẩu: gửi link đặt lại qua email (Resend)',
  })
  forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') forwarded?: string,
  ) {
    const client = clientIp(forwarded, ip);
    limitIp(client);
    return this.authService.forgotPassword(dto.email, client ?? null);
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Đặt mật khẩu mới bằng token trong email' })
  resetPassword(
    @Body() dto: ResetPasswordDto,
    @Ip() ip: string,
    @Headers('x-forwarded-for') forwarded?: string,
  ) {
    limitIp(clientIp(forwarded, ip));
    return this.authService.resetPassword(dto.token, dto.password);
  }
}
