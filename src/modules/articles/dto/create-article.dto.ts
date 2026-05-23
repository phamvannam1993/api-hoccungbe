import { IsString, IsOptional, IsBoolean, IsArray, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  authorName?: string;
}
