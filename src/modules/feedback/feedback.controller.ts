import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class CreateFeedbackDto {
  @IsString() @IsNotEmpty() @MaxLength(100) name: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() @MaxLength(1000) message: string;
  @IsString() @IsOptional() @MaxLength(50) topic?: string;
}

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Gửi góp ý / liên hệ' })
  submit(@Body() dto: CreateFeedbackDto) {
    console.log('[Feedback]', dto);
    return { success: true, message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' };
  }
}
