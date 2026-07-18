import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChildGender } from '../entities/child-profile.entity';

export class CreateChildDto {
  @ApiProperty({
    example: 1,
    description: 'ID của phụ huynh sở hữu hồ sơ bé',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: 'Nguyen Minh Khang',
    description: 'Họ và tên đầy đủ của bé',
  })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiPropertyOptional({
    example: 'Khang',
    description: 'Tên gọi thân mật của bé',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  @ApiPropertyOptional({
    enum: ChildGender,
    example: ChildGender.MALE,
    description: 'Giới tính của bé',
  })
  @IsOptional()
  @IsEnum(ChildGender)
  gender?: ChildGender;

  @ApiPropertyOptional({
    example: '2020-05-10',
    description: 'Ngày sinh của bé',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({
    example: 6,
    description: 'Tuổi hiện tại của bé',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  age?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/child-avatar.png',
    description: 'Ảnh đại diện của bé',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'beginner',
    description: 'Mức độ hiện tại của bé',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  currentLevel?: string;

  @ApiPropertyOptional({
    example: ['logic', 'animals', 'drawing'],
    description: 'Các sở thích học tập của bé',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  interests?: string[];

  @ApiPropertyOptional({
    example: 'Phát triển tư duy logic và tăng khả năng tập trung',
    description: 'Mục tiêu học tập của bé',
  })
  @IsOptional()
  @IsString()
  learningGoal?: string;

  @ApiPropertyOptional({
    description: 'Thiết lập cá nhân hóa (bộ sách, môn ưu tiên, bài đang học, mục tiêu/ngày, mức độ, kỹ năng yếu)',
  })
  @IsOptional()
  @IsObject()
  prefsJson?: Record<string, unknown>;
}
