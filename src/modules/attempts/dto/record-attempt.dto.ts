import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray, IsBoolean, IsIn, IsInt, IsOptional, Min, ValidateNested,
} from 'class-validator';

export class AttemptAnswerDto {
  @ApiProperty({ description: 'ID câu hỏi (bảng quizzes)' })
  @IsInt()
  quizId: number;

  @ApiProperty({ description: 'Bé trả lời đúng hay sai' })
  @IsBoolean()
  isCorrect: boolean;

  @ApiPropertyOptional({ description: 'Đáp án bé chọn/điền (bất kỳ dạng)' })
  @IsOptional()
  selectedAnswer?: unknown;

  @ApiPropertyOptional({ description: 'Thời gian làm câu này (giây)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentSec?: number;
}

export class RecordAttemptDto {
  @ApiProperty()
  @IsInt()
  childId: number;

  @ApiProperty()
  @IsInt()
  lessonId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  courseId?: number;

  @ApiPropertyOptional({ default: 1, description: '1=Dễ, 2=Trung bình, 3=Khó' })
  @IsOptional()
  @IsInt()
  exerciseNumber?: number;

  @ApiPropertyOptional({ enum: ['easy', 'medium', 'hard'] })
  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficultyLevel?: 'easy' | 'medium' | 'hard';

  @ApiPropertyOptional({ description: 'Tổng thời gian làm bài (giây)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  timeSpentSec?: number;

  @ApiProperty({ type: [AttemptAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttemptAnswerDto)
  answers: AttemptAnswerDto[];
}
