import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { UsersService } from '../users/users.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import { User, UserRole, UserStatus } from '../users/entities/user.entity';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
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
        role: registerDto.role ?? UserRole.PARENT,
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
  