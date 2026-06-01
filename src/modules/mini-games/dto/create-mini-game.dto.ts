import {
  IsString, IsOptional, IsBoolean, IsInt, IsArray, MaxLength, Min,
} from 'class-validator';

export class CreateMiniGameDto {
  @IsString()
  @MaxLength(100)
  slug: string;

  @IsString()
  @MaxLength(100)
  routeKey: string;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(10)
  emoji: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  age?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  ageGroup?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  groupKey?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  difficulty?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  showOnHomepage?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  homepageOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;
}
