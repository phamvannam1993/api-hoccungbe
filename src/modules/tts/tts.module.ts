import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TtsController } from './tts.controller';
import { TtsDownloadController } from './tts-download.controller';
import { TtsService } from './tts.service';

@Module({
  imports: [ConfigModule],
  controllers: [TtsController, TtsDownloadController],
  providers: [TtsService],
  exports: [TtsService],
})
export class TtsModule {}
