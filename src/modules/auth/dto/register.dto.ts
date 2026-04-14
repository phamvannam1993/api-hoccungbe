import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { UserRole } from '../../users/entities/user.entity';
  
  export class RegisterDto {
    @ApiProperty({
      example: 'Nguyen Van A',
      description: 'Họ và tên',
    })
    @IsString()
    @MaxLength(100)
    fullName: string;
  
    @ApiProperty({
      example: 'nguyenvana@gmail.com',
      description: 'Email đăng ký',
    })
    @IsEmail()
    @MaxLength(150)
    email: string;
  
    @ApiProperty({
      example: '123456',
      description: 'Mật khẩu',
    })
    @IsString()
    @MinLength(6)
    password: string;
  
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
      example: 'https://example.com/avatar.png',
      description: 'Ảnh đại diện',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    avatarUrl?: string;
  }
  