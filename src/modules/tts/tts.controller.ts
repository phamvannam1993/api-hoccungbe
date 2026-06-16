import {
  Body,
  Controller,
  HttpCode,
  Post,
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
}
