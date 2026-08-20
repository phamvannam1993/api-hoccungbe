import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIqQuestionDto {
  @ApiPropertyOptional({ example: 'thu-thach-iq-lop-2-01', description: 'Mã ngoài để dedupe khi import' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  code?: string;

  @ApiProperty({ example: 2, description: 'Lớp (1–5)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  grade: number;

  @ApiPropertyOptional({ example: 'THỬ THÁCH IQ|LỚP 2 - Toán suy luận' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  subject?: string;

  @ApiPropertyOptional({ example: 'Toán suy luận' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lesson?: string;

  @ApiProperty({ example: 'Có bao nhiêu số có 2 chữ số khác nhau…' })
  @IsString()
  question: string;

  @ApiPropertyOptional({ description: 'Bản đọc TTS của câu hỏi' })
  @IsOptional()
  @IsString()
  questionSpeech?: string;

  @ApiProperty({ example: ['24 số', '30 số', '36 số', '42 số'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  optionsJson: string[];

  @ApiProperty({ example: 1, description: 'Chỉ số đáp án đúng (0-based)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  correctIndex: number;

  @ApiPropertyOptional({ example: ['5', '4', '3', '2', '1'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  countdownJson?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({ description: 'Bản đọc TTS của lời giải' })
  @IsOptional()
  @IsString()
  explanationSpeech?: string;

  @ApiPropertyOptional({ enum: ['easy', 'medium', 'hard'], description: 'Mức độ khó' })
  @IsOptional()
  @IsString()
  difficulty?: 'easy' | 'medium' | 'hard';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
