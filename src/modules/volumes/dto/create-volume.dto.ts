import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVolumeDto {
  @ApiProperty({ example: 1, description: 'ID khóa học' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiProperty({ example: 'Tập 1', description: 'Tên tập' })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'Thứ tự sắp xếp' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;
}
