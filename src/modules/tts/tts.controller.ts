import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TtsService, TtsResponse } from './tts.service';
import { CreateTtsDto } from './dto/create-tts.dto';

@ApiTags('Text-to-Speech')
@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Synthesize text to speech',
    description:
      'Convert text to speech audio using Vietnamese voices. Returns audio URL and filename.',
  })
  @ApiResponse({
    status: 200,
    description: 'Audio generated successfully',
    schema: {
      example: {
        status: 'success',
        audio_url: '/audio/ca78a0c49d23e9dc3d8d64eb478d9001.mp3',
        filename: 'ca78a0c49d23e9dc3d8d64eb478d9001.mp3',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async synthesize(@Body() dto: CreateTtsDto): Promise<TtsResponse> {
    return this.ttsService.synthesize(dto);
  }

  @Get('cached')
  @ApiOperation({
    summary: 'Tra audio đã cache theo text',
    description:
      'Trả về URL audio (S3) đã tổng hợp sẵn cho đoạn text nếu tồn tại, để dùng lại thay vì gọi TTS. 404 nếu chưa có.',
  })
  @ApiResponse({ status: 200, description: 'Có cache', schema: { example: { audioUrl: 'https://.../tts/abc.mp3', durationMs: 1403, mimeType: 'audio/mpeg' } } })
  @ApiResponse({ status: 404, description: 'Chưa có cache cho text này' })
  async cached(
    @Query('text') text: string,
    @Query('voice') voice = 'vi',
    @Query('rate') rate = '+0%',
    @Query('pitch') pitch = '+0Hz',
  ) {
    const hit = await this.ttsService.lookupCached(text, voice, rate, pitch);
    if (!hit) throw new NotFoundException('Chưa có cache');
    return hit;
  }
}
