import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { FeedbackService } from './feedback.service';

class CreateFeedbackDto {
  @IsString() @IsNotEmpty() @MaxLength(100) name: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() @MaxLength(1000) message: string;
  @IsString() @IsOptional() @MaxLength(50) topic?: string;
}

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Gửi góp ý / liên hệ' })
  async submit(@Body() dto: CreateFeedbackDto) {
    await this.feedbackService.create(dto);
    return { success: true, message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' };
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.feedbackService.findAll(page ? Number(page) : 1, limit ? Number(limit) : 20);
  }

  @Patch(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.markRead(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.delete(id);
  }
}
