import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'nguyenvana@gmail.com',
    description: 'Email đăng nhập',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mật khẩu đăng nhập',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
