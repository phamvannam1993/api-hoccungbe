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
import { PuzzleType, PuzzleDifficulty } from '../entities/puzzle.entity';

export class CreatePuzzleDto {
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
    enum: PuzzleType,
    example: PuzzleType.ANIMAL,
    description: 'Loại puzzle',
  })
  @IsEnum(PuzzleType)
  puzzleType: PuzzleType;

  @ApiProperty({
    enum: PuzzleDifficulty,
    example: PuzzleDifficulty.NORMAL,
    description: 'Độ khó',
  })
  @IsEnum(PuzzleDifficulty)
  difficulty: PuzzleDifficulty;

  @ApiProperty({
    example: 'Ghép Con Sư Tử',
    description: 'Tiêu đề puzzle',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    example: 'Ghép 9 mảnh để tạo thành hình con sư tử',
    description: 'Mô tả puzzle',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Kéo các mảnh vào ô vuông chính xác',
    description: 'Hướng dẫn chơi',
  })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiPropertyOptional({
    example: 9,
    description: 'Số lượng mảnh (9, 12, 16, ...)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(4)
  pieceCount?: number;

  @ApiPropertyOptional({
    example: 120,
    description: 'Giới hạn thời gian (giây)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  timeLimit?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Số điểm thưởng',
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
    example: { theme: 'forest', colors: ['green', 'brown'] },
    description: 'Cấu hình mở rộng',
  })
  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;

  @ApiPropertyOptional({
    example: 'https://bucket.s3.amazonaws.com/puzzle-image.jpg',
    description: 'S3 URL của ảnh puzzle (cho loại image)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số hàng trong lưới (2, 3, 4, hoặc 5)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  gridRows?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số cột trong lưới (2, 3, 4, hoặc 5)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  gridCols?: number;
}
