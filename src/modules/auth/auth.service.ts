import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import { InjectRepository } from '@nestjs/typeorm';
  import { IsNull, MoreThan, Repository } from 'typeorm';
  import { createHash, randomBytes } from 'crypto';
  import * as bcrypt from 'bcrypt';
  import { MailService } from '../mail/mail.service';
  import { PasswordReset } from './entities/password-reset.entity';
  import { UsersService } from '../users/users.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { User, UserRole, UserStatus } from '../users/entities/user.entity';
  
  /** Link đặt lại mật khẩu dùng được trong ngần này phút. */
  const PASSWORD_RESET_MINUTES = 30;
  /** Mỗi tài khoản gửi tối đa ngần này email đặt lại trong 15 phút. */
  const MAX_RESETS_PER_WINDOW = 3;
  const RESET_WINDOW_MS = 15 * 60 * 1000;

  const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
  /** Bỏ mili-giây: cột DATETIME làm tròn giây. */
  const nowSec = () => new Date(Math.floor(Date.now() / 1000) * 1000);
  const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  const FORGOT_MESSAGE =
    'Bé Hay Học đã gửi link đặt lại mật khẩu tới email của bố mẹ. Bố mẹ kiểm tra hộp thư (cả mục Thư rác / Quảng cáo) nhé.';

  @Injectable()
  export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly mail: MailService,
      private readonly config: ConfigService,
      @InjectRepository(PasswordReset)
      private readonly resets: Repository<PasswordReset>,
      @InjectRepository(User)
      private readonly users: Repository<User>,
    ) {}

    /**
     * Quên mật khẩu: tạo token ngẫu nhiên (chỉ lưu SHA-256), gửi link đặt lại qua Resend.
     * Email chưa đăng ký → báo lỗi 404 để phụ huynh biết (theo yêu cầu sản phẩm; chống dò hàng loạt
     * nhờ giới hạn theo IP ở controller).
     */
    async forgotPassword(email: string, ip: string | null) {
      if (!this.mail.configured())
        throw new ServiceUnavailableException(
          'Hệ thống gửi email chưa được cấu hình, bố mẹ liên hệ hỗ trợ nhé.',
        );
      const user = await this.usersService.findByEmail(email.trim());
      const masked = email.trim().replace(/^(.{2}).*(@.*)$/, '$1***$2');
      if (!user) {
        this.logger.warn(`Quên mật khẩu: không có tài khoản ${masked} — không gửi mail`);
        throw new NotFoundException(
          'Email này chưa đăng ký tài khoản Bé Hay Học. Bố mẹ kiểm tra lại email hoặc đăng ký tài khoản mới nhé.',
        );
      }
      if (user.status !== UserStatus.ACTIVE) {
        this.logger.warn(`Quên mật khẩu: tài khoản #${user.id} không active — không gửi mail`);
        throw new BadRequestException(
          'Tài khoản này đang bị khóa. Bố mẹ liên hệ hỗ trợ nhé.',
        );
      }

      const now = nowSec();
      const recent = await this.resets.count({
        where: {
          userId: user.id,
          createdAt: MoreThan(new Date(now.getTime() - RESET_WINDOW_MS)),
        },
      });
      // Quá số lần thì im lặng bỏ qua (vẫn trả câu chung) — chống spam hộp thư người khác.
      if (recent >= MAX_RESETS_PER_WINDOW) {
        this.logger.warn(`Quên mật khẩu: tài khoản #${user.id} gửi quá ${MAX_RESETS_PER_WINDOW} lần / 15 phút — bỏ qua`);
        throw new HttpException(
          'Bé Hay Học vừa gửi link nhiều lần rồi. Bố mẹ kiểm tra hộp thư (cả Thư rác), hoặc thử lại sau 15 phút nhé.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      const token = randomBytes(32).toString('base64url');
      await this.resets.insert({
        userId: user.id,
        tokenHash: sha256(token),
        expiresAt: new Date(now.getTime() + PASSWORD_RESET_MINUTES * 60 * 1000),
        usedAt: null,
        requestIp: ip?.slice(0, 64) ?? null,
        createdAt: now,
      });

      const site = (
        this.config.get<string>('FRONTEND_URL') || 'https://behayhoc.com'
      ).replace(/\/+$/, '');
      const link = `${site}/dat-lai-mat-khau?token=${token}`;
      const name = escapeHtml(user.fullName || 'bố mẹ');
      const sent = await this.mail.send({
        to: user.email,
        subject: 'Đặt lại mật khẩu Bé Hay Học',
        text: `Xin chào ${user.fullName || 'bố mẹ'},\n\nBố mẹ vừa yêu cầu đặt lại mật khẩu tài khoản Bé Hay Học. Mở link sau để đặt mật khẩu mới (dùng được trong ${PASSWORD_RESET_MINUTES} phút, một lần):\n\n${link}\n\nNếu không phải bố mẹ yêu cầu, hãy bỏ qua email này — mật khẩu vẫn giữ nguyên.\n\nBé Hay Học`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1e293b">
  <h2 style="color:#0284c7;margin:0 0 16px">Đặt lại mật khẩu</h2>
  <p>Xin chào ${name},</p>
  <p>Bố mẹ vừa yêu cầu đặt lại mật khẩu tài khoản <b>Bé Hay Học</b>. Bấm nút dưới đây để đặt mật khẩu mới:</p>
  <p style="text-align:center;margin:28px 0">
    <a href="${link}" style="background:#0ea5e9;color:#fff;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block">Đặt mật khẩu mới</a>
  </p>
  <p style="font-size:14px;color:#475569">Link dùng được trong <b>${PASSWORD_RESET_MINUTES} phút</b> và chỉ dùng một lần. Nếu nút không bấm được, sao chép link này vào trình duyệt:<br><a href="${link}" style="color:#0284c7;word-break:break-all">${link}</a></p>
  <p style="font-size:14px;color:#475569">Nếu không phải bố mẹ yêu cầu, hãy bỏ qua email này — mật khẩu vẫn giữ nguyên.</p>
  <p style="margin-top:28px">Bé Hay Học</p>
</div>`,
      });
      if (!sent) {
        this.logger.error(`Không gửi được email đặt lại mật khẩu cho user #${user.id}`);
        throw new ServiceUnavailableException(
          'Chưa gửi được email, bố mẹ thử lại sau ít phút nhé.',
        );
      }
      this.logger.log(`Quên mật khẩu: đã gửi link cho tài khoản #${user.id}`);
      return { message: FORGOT_MESSAGE };
    }

    /** Đặt mật khẩu mới bằng token trong email. Token dùng một lần; dùng xong hủy mọi token khác. */
    async resetPassword(token: string, password: string) {
      const invalid = new BadRequestException(
        'Link đặt lại mật khẩu không đúng hoặc đã hết hạn. Bố mẹ yêu cầu gửi lại link mới nhé.',
      );
      const row = await this.resets.findOne({ where: { tokenHash: sha256(token) } });
      const now = nowSec();
      if (!row || row.usedAt || row.expiresAt.getTime() <= now.getTime()) throw invalid;

      // Đánh dấu đã dùng có điều kiện → hai lần bấm cùng lúc chỉ một lần đổi được.
      const claimed = await this.resets.update(
        { id: row.id, usedAt: IsNull() },
        { usedAt: now },
      );
      if (!claimed.affected) throw invalid;

      const user = await this.users.findOne({ where: { id: row.userId } });
      if (!user || user.status !== UserStatus.ACTIVE) throw invalid;
      user.passwordHash = await bcrypt.hash(password, 10);
      await this.users.save(user);
      await this.resets.update({ userId: user.id, usedAt: IsNull() }, { usedAt: now });
      return { message: 'Đã đặt mật khẩu mới. Bố mẹ đăng nhập lại bằng mật khẩu mới nhé.' };
    }
  
    async register(registerDto: RegisterDto) {
      const existingUser = await this.usersService.findByEmail(registerDto.email);
  
      if (existingUser) {
        throw new BadRequestException(
          `Email "${registerDto.email}" đã tồn tại`,
        );
      }
  
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);
  
      const user = await this.usersService.create({
        fullName: registerDto.fullName,
        email: registerDto.email,
        passwordHash,
        phone: registerDto.phone,
        // Đăng ký công khai luôn là phụ huynh — không nhận `role` từ client (tránh tự tạo tài khoản admin).
        role: UserRole.PARENT,
        status: UserStatus.ACTIVE,
        avatarUrl: registerDto.avatarUrl,
      });
  
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
  
      const accessToken = await this.jwtService.signAsync(payload);
  
      return {
        message: 'Đăng ký thành công',
        accessToken,
        user: this.buildUserResponse(user),
      };
    }
  
    async login(loginDto: LoginDto) {
      const user = await this.usersService.findByEmail(loginDto.email);
  
      if (!user) {
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }
  
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Tài khoản không hoạt động');
      }
  
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.passwordHash,
      );
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }
  
      /* Ghi mốc đăng nhập. Hỏng thì KHÔNG chặn đăng nhập — vào được là việc chính,
         mốc thời gian là việc phụ. Nhưng phải ghi lỗi ra: nuốt lặng lẽ thì cột lại
         rỗng mà không ai biết vì sao. */
      await this.usersService.ghiDangNhap(user.id).catch((e: unknown) => {
        this.logger.error(
          `Không ghi được lastLoginAt cho user ${user.id}: ${e instanceof Error ? e.message : String(e)}`,
        );
      });
  
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
  
      const accessToken = await this.jwtService.signAsync(payload);
  
      return {
        message: 'Đăng nhập thành công',
        accessToken,
        user: this.buildUserResponse(user),
      };
    }
  
    async validateUserById(userId: number): Promise<User | null> {
      try {
        const user = await this.usersService.findOne(userId);
        return user ?? null;
      } catch {
        return null;
      }
    }
  
    private buildUserResponse(user: User) {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      };
    }
  }
  