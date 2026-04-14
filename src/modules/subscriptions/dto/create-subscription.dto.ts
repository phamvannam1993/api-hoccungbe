import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  SubscriptionPlanType,
  SubscriptionStatus,
} from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 1,
    description: 'ID người dùng',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID khóa học, null nếu là gói toàn hệ thống',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  courseId?: number;

  @ApiProperty({
    example: 'Gói năm toàn bộ khóa học',
    description: 'Tên gói đăng ký',
  })
  @IsString()
  planName: string;

  @ApiPropertyOptional({
    enum: SubscriptionPlanType,
    example: SubscriptionPlanType.YEARLY,
    description: 'Loại gói',
  })
  @IsOptional()
  @IsEnum(SubscriptionPlanType)
  planType?: SubscriptionPlanType;

  @ApiPropertyOptional({
    example: 999000,
    description: 'Số tiền thanh toán',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    example: 'VND',
    description: 'Đơn vị tiền tệ',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    enum: SubscriptionStatus,
    example: SubscriptionStatus.ACTIVE,
    description: 'Trạng thái gói',
  })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @ApiPropertyOptional({
    example: '2026-04-14T00:00:00.000Z',
    description: 'Ngày bắt đầu',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2027-04-14T00:00:00.000Z',
    description: 'Ngày kết thúc',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: 'momo',
    description: 'Phương thức thanh toán',
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({
    example: 'TXN_001',
    description: 'Mã giao dịch',
  })
  @IsOptional()
  @IsString()
  transactionCode?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Tự động gia hạn',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  autoRenew?: boolean;
}
