import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'nguyenvana@gmail.com',
    description: 'Email tài khoản',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(150)
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Mã trong link đặt lại mật khẩu (gửi qua email)',
  })
  @IsString()
  @Matches(/^[A-Za-z0-9_-]{30,100}$/, {
    message: 'Link đặt lại mật khẩu không hợp lệ',
  })
  token: string;

  @ApiProperty({ example: 'matkhaumoi123', description: 'Mật khẩu mới' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(72, { message: 'Mật khẩu tối đa 72 ký tự' })
  password: string;
}
