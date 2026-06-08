import {
  IsString, IsOptional, IsBoolean, IsInt, IsArray, MaxLength, Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateMiniGameDto {
  // System fields - excluded from validation & transformation
  @Exclude({ toPlainOnly: true, toClassOnly: true })
  id?: number;

  @Exclude({ toPlainOnly: true, toClassOnly: true })
  createdAt?: Date;

  @Exclude({ toPlainOnly: true, toClassOnly: true })
  updatedAt?: Date;

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
