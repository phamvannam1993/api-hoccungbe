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

/** Server web gửi lên (kèm x-khv-key): giá và tên gói lấy từ bảng giá phía web. */
export class CreateOrderDto {
  @IsString()
  @Matches(/^[A-Z0-9]{2,12}$/, { message: 'Mã gói không hợp lệ' })
  prefix: string;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsInt()
  @Min(1000)
  @Max(100000000)
  amount: number;
}

export class ListOrdersQuery {
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected', 'cancelled'])
  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';

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

export class ReviewOrderDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;
}
