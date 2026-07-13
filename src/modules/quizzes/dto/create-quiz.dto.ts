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
  MATCHING = 'matching',
  FILL_BLANK = 'fill_blank',
  SORTING = 'sorting',
  CROSS_OUT = 'cross_out',
  COUNTING = 'counting',
  COLORING = 'coloring',
  PUZZLE = 'puzzle',
  GAME = 'game',
  TABLE_FILL = 'table_fill',
  NUMBER_LINE = 'number_line',
  FIND_ERRORS = 'find_errors',
  TRACE_NUMBER = 'trace_number',
  LETTER_TRACING = 'letter_tracing',
  TRACE_SENTENCE = 'trace_sentence',
}

export enum QuizDifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
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
    enum: QuizDifficultyLevel,
    example: QuizDifficultyLevel.EASY,
    description: 'Trình độ câu hỏi: easy=Dễ, medium=Trung bình, hard=Nâng cao',
  })
  @IsOptional()
  @IsEnum(QuizDifficultyLevel)
  difficultyLevel?: QuizDifficultyLevel;

  @ApiPropertyOptional({
    example: 'https://example.com/question-image.png',
    description: 'Ảnh minh họa cho câu hỏi',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  questionImageUrl?: string;

  @ApiPropertyOptional({
    example: 'https://bucket.s3.amazonaws.com/audio/uuid.mp3',
    description: 'URL audio câu hỏi (upload qua POST /quizzes/upload-audio)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  questionAudioUrl?: string;

  @ApiPropertyOptional({
    example: 'https://bucket.s3.amazonaws.com/audio/uuid.mp3',
    description: 'URL audio giải thích đáp án',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  explanationAudioUrl?: string;

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
  // @Type(() => Object): giữ nguyên từng phần tử là object.
  // Không có nó, enableImplicitConversion (main.ts) sẽ ép object → [] (kiểu reflect là Array).
  @Type(() => Object)
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
    example: 1,
    minimum: 1,
    maximum: 8,
    description: 'Bài tập số (1-8) mà câu hỏi thuộc về',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  exerciseNumber?: number;

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
