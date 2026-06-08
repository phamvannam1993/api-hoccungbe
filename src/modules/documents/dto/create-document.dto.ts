import { IsString, IsOptional, IsUrl, MaxLength, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsUrl()
  @MaxLength(500)
  pdfUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  categoryId?: number;
}
