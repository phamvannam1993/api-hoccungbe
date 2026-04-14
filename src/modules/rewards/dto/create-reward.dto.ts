import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RewardType } from '../entities/reward.entity';

export class CreateRewardDto {
  @ApiProperty({
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  childId: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID khóa học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId?: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'ID bài học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonId?: number;

  @ApiPropertyOptional({
    enum: RewardType,
    example: RewardType.BADGE,
    description: 'Loại phần thưởng',
  })
  @IsOptional()
  @IsEnum(RewardType)
  rewardType?: RewardType;

  @ApiProperty({
    example: 'Nhà toán học nhí',
    description: 'Tên phần thưởng',
  })
  @IsString()
  @MaxLength(100)
  rewardName: string;

  @ApiPropertyOptional({
    example: 'Hoàn thành toàn bộ khóa học toán tư duy',
    description: 'Mô tả phần thưởng',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  rewardDescription?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/badge.png',
    description: 'Biểu tượng phần thưởng',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  rewardIconUrl?: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Số điểm thưởng',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  points?: number;

  @ApiPropertyOptional({
    example: '2026-04-14T10:00:00.000Z',
    description: 'Thời điểm trao thưởng',
  })
  @IsOptional()
  @IsDateString()
  awardedAt?: string;
}
