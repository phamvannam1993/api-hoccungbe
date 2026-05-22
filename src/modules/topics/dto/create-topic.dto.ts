import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({ example: 1, description: 'ID khóa học' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID tập (tùy chọn)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  volumeId?: number;

  @ApiProperty({ example: 'Chủ đề 1: Các số từ 0 đến 10', description: 'Tên chủ đề' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'Thứ tự sắp xếp' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;
}
