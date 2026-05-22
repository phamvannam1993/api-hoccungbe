import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum LessonType {
  VIDEO = 'video',
  STORY = 'story',
  GAME = 'game',
  QUIZ = 'quiz',
  INTERACTIVE = 'interactive',
}

export class CreateLessonDto {
  @ApiProperty({
    example: 1,
    description: 'ID khóa học mà bài học thuộc về',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiProperty({
    example: 'Bé học đếm số từ 1 đến 10',
    description: 'Tiêu đề bài học',
  })
  @IsString()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    example: 'be-hoc-dem-so-tu-1-den-10',
    description: 'Slug dùng cho URL bài học',
  })
  @IsString()
  @MaxLength(180)
  slug: string;

  @ApiPropertyOptional({ example: 1, description: 'ID tập (volumeId FK)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  volumeId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID chủ đề (topicId FK)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  topicId?: number;

  @ApiPropertyOptional({ example: 'Tập 1' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  volume?: string;

  @ApiPropertyOptional({ example: 'Chủ đề 1: Các số từ 0 đến 10' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  topicName?: string;

  @ApiPropertyOptional({
    example: 'Bài học giúp bé làm quen với các con số cơ bản',
    description: 'Mô tả ngắn của bài học',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  shortDescription?: string;

  @ApiPropertyOptional({
    example: 'Nội dung chi tiết của bài học',
    description: 'Nội dung đầy đủ của bài học',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    enum: LessonType,
    example: LessonType.INTERACTIVE,
    description: 'Loại bài học',
  })
  @IsOptional()
  @IsEnum(LessonType)
  lessonType?: LessonType;

  @ApiPropertyOptional({
    example: 'https://example.com/video.mp4',
    description: 'Đường dẫn video bài học',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  videoUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/audio.mp3',
    description: 'Đường dẫn audio bài học',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  audioUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/lesson-thumb.png',
    description: 'Ảnh thumbnail của bài học',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự sắp xếp bài học trong khóa',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: 15,
    description: 'Thời lượng bài học tính theo phút',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  durationMinutes?: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Bài học có phải bài xem trước hay không',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPreview?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái xuất bản bài học',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPublished?: boolean;
}
