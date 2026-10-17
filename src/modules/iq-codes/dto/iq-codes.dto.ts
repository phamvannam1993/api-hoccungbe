import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class GenerateCodesDto {
  /** Mã khóa/combo, vd 'L2K01', 'L2ALL'. */
  @IsString()
  @Matches(/^[A-Z0-9]{2,12}$/, { message: 'Mã khóa không hợp lệ' })
  prefix: string;

  @IsInt()
  @Min(1)
  @Max(500)
  count: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;
}

export class UpdateCodeDto {
  @IsOptional()
  @IsIn(['active', 'revoked'])
  status?: 'active' | 'revoked';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;
}

export class ListCodesQuery {
  @IsOptional()
  @IsString()
  @MaxLength(12)
  prefix?: string;

  @IsOptional()
  @IsIn(['active', 'used', 'revoked'])
  status?: 'active' | 'used' | 'revoked';

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number;
}

export class RedeemCodeDto {
  @IsString()
  @MaxLength(40)
  code: string;
}
