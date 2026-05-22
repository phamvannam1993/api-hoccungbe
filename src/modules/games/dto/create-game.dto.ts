import {
  IsBoolean,
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
import { GameType } from '../entities/game.entity';

export class CreateGameDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID bài học liên kết (tùy chọn)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonId?: number;

  @ApiProperty({
    enum: GameType,
    example: GameType.CHOOSE_CORRECT,
    description: 'Loại game',
  })
  @IsEnum(GameType)
  gameType: GameType;

  @ApiProperty({
    example: 'Game chọn đáp án đúng',
    description: 'Tiêu đề game',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    example: 'Mô tả game',
    description: 'Mô tả game',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Chọn đáp án đúng trong các lựa chọn bên dưới',
    description: 'Hướng dẫn chơi',
  })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiPropertyOptional({
    example: 60,
    description: 'Thời gian giới hạn (giây)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  timeLimit?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Số điểm thưởng khi hoàn thành game',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  points?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự sắp xếp',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái hoạt động',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: { bgImage: 'https://example.com/bg.png', theme: 'forest' },
    description: 'Cấu hình mở rộng (ảnh nền, theme, ...)',
  })
  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;
}
