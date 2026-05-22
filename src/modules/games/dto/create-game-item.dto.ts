import {
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
import { GameItemType } from '../entities/game-item.entity';

export class CreateGameItemDto {
  @ApiProperty({
    enum: GameItemType,
    example: GameItemType.OPTION,
    description: 'Vai trò của item theo loại game',
  })
  @IsEnum(GameItemType)
  itemType: GameItemType;

  @ApiPropertyOptional({
    example: 'Con cá',
    description: 'Nội dung text của item',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/fish.png',
    description: 'URL ảnh của item',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/fish.mp3',
    description: 'URL audio của item',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  audioUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Đáp án đúng hay sai (dùng cho choose_correct)',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isCorrect?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID cặp đôi (dùng cho connect, image_match, drag)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pairId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự đúng (dùng cho arrange, drag_arrange)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sortOrder?: number;

  @ApiPropertyOptional({
    example: { color: '#ff0000' },
    description: 'Cấu hình mở rộng cho item',
  })
  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;
}
