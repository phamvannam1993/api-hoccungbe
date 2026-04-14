import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Họ và tên người dùng',
  })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'nguyenvana@gmail.com',
    description: 'Email đăng nhập',
  })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    example: '123456hashed',
    description: 'Mật khẩu đã hash hoặc mật khẩu đầu vào',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  passwordHash: string;

  @ApiPropertyOptional({
    example: '0901234567',
    description: 'Số điện thoại',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    enum: UserRole,
    example: UserRole.PARENT,
    description: 'Vai trò người dùng',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: 'Trạng thái tài khoản',
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    description: 'Ảnh đại diện',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatarUrl?: string;
}
