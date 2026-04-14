import {
  IsArray,
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

export enum QuizQuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  DRAG_DROP = 'drag_drop',
  IMAGE_CHOICE = 'image_choice',
}

export class CreateQuizDto {
  @ApiProperty({
    example: 1,
    description: 'ID bài học mà câu hỏi thuộc về',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonId: number;

  @ApiProperty({
    example: 'Con vật nào biết sủa?',
    description: 'Nội dung câu hỏi',
  })
  @IsString()
  questionText: string;

  @ApiPropertyOptional({
    enum: QuizQuestionType,
    example: QuizQuestionType.SINGLE_CHOICE,
    description: 'Loại câu hỏi',
  })
  @IsOptional()
  @IsEnum(QuizQuestionType)
  questionType?: QuizQuestionType;

  @ApiPropertyOptional({
    example: 'https://example.com/question-image.png',
    description: 'Ảnh minh họa cho câu hỏi',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  questionImageUrl?: string;

  @ApiPropertyOptional({
    example: [
      { key: 'A', text: 'Con mèo' },
      { key: 'B', text: 'Con chó' },
      { key: 'C', text: 'Con cá' },
    ],
    description: 'Danh sách đáp án lựa chọn dưới dạng JSON',
    type: 'array',
    items: {
      type: 'object',
    },
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  optionsJson?: Record<string, unknown>[];

  @ApiPropertyOptional({
    example: ['B'],
    description: 'Đáp án đúng dưới dạng JSON',
  })
  @IsOptional()
  correctAnswerJson?: unknown;

  @ApiPropertyOptional({
    example: 'Con chó là loài vật biết sủa',
    description: 'Giải thích đáp án',
  })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Số điểm của câu hỏi',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  points?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự sắp xếp câu hỏi',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái hoạt động của câu hỏi',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
