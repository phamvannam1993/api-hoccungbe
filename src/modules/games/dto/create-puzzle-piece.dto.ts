import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePuzzlePieceDto {
  @ApiProperty({
    example: 0,
    description: 'Vị trí của mảnh (0-8 cho 3x3)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  position: number;

  @ApiPropertyOptional({
    example: '🦁',
    description: 'Nội dung mảnh (emoji, chữ, số)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  content?: string;

  @ApiPropertyOptional({
    example: 'emoji',
    description: 'Loại hiển thị (emoji, text, image)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  display?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/lion-piece.jpg',
    description: 'URL ảnh cho mảnh ảnh',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự sắp xếp',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: {},
    description: 'Cấu hình mở rộng',
  })
  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;
}
