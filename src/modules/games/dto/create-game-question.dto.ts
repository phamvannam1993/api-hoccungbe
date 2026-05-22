import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameQuestionDto {
  @ApiPropertyOptional({
    example: 'Con vật nào sống dưới nước?',
    description: 'Nội dung câu hỏi',
  })
  @IsOptional()
  @IsString()
  questionText?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/question.png',
    description: 'URL ảnh câu hỏi',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  questionImageUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/question.mp3',
    description: 'URL audio câu hỏi',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  questionAudioUrl?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự sắp xếp câu hỏi trong game',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: { hint: 'Nghĩ về đại dương' },
    description: 'Cấu hình mở rộng cho câu hỏi',
  })
  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;
}
