import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitPuzzleDto {
  @ApiProperty({
    example: 1,
    description: 'ID puzzle',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  puzzleId: number;

  @ApiProperty({
    example: ['piece-1', 'piece-2', 'piece-3'],
    description: 'Danh sách ID mảnh đã ghép',
  })
  @IsArray()
  @IsString({ each: true })
  placedPieces: string[];

  @ApiPropertyOptional({
    example: 45,
    description: 'Thời gian hoàn thành (giây)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  completionTime?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số lần cố gắng',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  attemptCount?: number;
}
