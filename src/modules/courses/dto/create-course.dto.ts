import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseType, DifficultyLevel } from '../entities/course.entity';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Toán tư duy cho bé 6 tuổi',
    description: 'Tên khóa học',
  })
  @IsString()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    example: 'toan-tu-duy-cho-be-6-tuoi',
    description: 'Slug dùng cho URL',
  })
  @IsString()
  @MaxLength(180)
  slug: string;

  @ApiPropertyOptional({
    example: 'Khóa học giúp bé phát triển tư duy logic',
    description: 'Mô tả ngắn',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  shortDescription?: string;

  @ApiPropertyOptional({
    example: 'Nội dung chi tiết của khóa học',
    description: 'Mô tả đầy đủ',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/course-thumb.png',
    description: 'Ảnh thumbnail',
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/course-banner.png',
    description: 'Ảnh banner',
  })
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.youtube.com/watch?v=...' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  videoUrl?: string;

  @ApiPropertyOptional({
    enum: CourseType,
    example: CourseType.MATH,
    description: 'Loại khóa học',
  })
  @IsOptional()
  @IsEnum(CourseType)
  courseType?: CourseType;

  @ApiPropertyOptional({
    enum: DifficultyLevel,
    example: DifficultyLevel.BEGINNER,
    description: 'Độ khó',
  })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel;

  @ApiPropertyOptional({
    example: 6,
    description: 'Độ tuổi tối thiểu',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  targetAgeMin?: number;

  @ApiPropertyOptional({
    example: 8,
    description: 'Độ tuổi tối đa',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  targetAgeMax?: number;

  @ApiPropertyOptional({
    example: 20,
    description: 'Tổng số bài học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  totalLessons?: number;

  @ApiPropertyOptional({
    example: 300,
    description: 'Tổng thời lượng ước tính tính theo phút',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  estimatedMinutes?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái xuất bản',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Có miễn phí hay không',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isFree?: boolean;

  @ApiPropertyOptional({
    example: 299000,
    description: 'Giá khóa học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID admin tạo khóa học',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  createdById?: number;
}
