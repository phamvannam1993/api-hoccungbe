import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../../users/entities/user.entity';

class UserInfoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Nguyen Van A' })
  fullName: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.PARENT })
  role: UserRole;

  @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE })
  status: UserStatus;

  @ApiProperty({ example: '0901234567', required: false })
  phone?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', required: false })
  avatarUrl?: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'Đăng nhập thành công' })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy',
  })
  accessToken: string;

  @ApiProperty({ type: UserInfoDto })
  user: UserInfoDto;
}
