import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateTtsDto {
  @MinLength(1, { message: 'Text must be at least 1 character' })
  @MaxLength(500, { message: 'Text must not exceed 500 characters' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  voice: string;

  @IsOptional()
  @Matches(/^[+-]\d{1,3}%$/, {
    message: 'Rate must be in format like "+0%", "+50%", "-50%"',
  })
  rate?: string = '+0%';

  @IsOptional()
  @Matches(/^[+-]\d{1,2}Hz$/, {
    message: 'Pitch must be in format like "+0Hz", "+10Hz", "-10Hz"',
  })
  pitch?: string = '+0Hz';
}
