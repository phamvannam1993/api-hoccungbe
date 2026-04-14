import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export class CreateProgressDto {
  @ApiProperty({
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  childId: number;

  @ApiProperty({
    example: 2,
    description: 'ID khóa học',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiProperty({
    example: 5,
    description: 'ID bài học',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonId: number;

  @ApiPropertyOptional({
    enum: ProgressStatus,
    example: ProgressStatus.IN_PROGRESS,
    description: 'Trạng thái tiến độ học',
  })
  @IsOptional()
  @IsEnum(ProgressStatus)
  status?: ProgressStatus;

  @ApiPropertyOptional({
    example: 60,
    description: 'Phần trăm hoàn thành bài học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  completionPercent?: number;

  @ApiPropertyOptional({
    example: 8.5,
    description: 'Điểm số đạt được',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  score?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số sao đạt được',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  starsEarned?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Số lần làm bài',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  attemptsCount?: number;

  @ApiPropertyOptional({
    example: '2026-04-14T08:00:00.000Z',
    description: 'Thời điểm bắt đầu học',
  })
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @ApiPropertyOptional({
    example: '2026-04-14T08:30:00.000Z',
    description: 'Thời điểm hoàn thành bài học',
  })
  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @ApiPropertyOptional({
    example: '2026-04-14T08:20:00.000Z',
    description: 'Lần truy cập gần nhất',
  })
  @IsOptional()
  @IsDateString()
  lastAccessedAt?: string;
}
