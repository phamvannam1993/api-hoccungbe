import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TtsController } from './tts.controller';
import { TtsDownloadController } from './tts-download.controller';
import { TtsService } from './tts.service';
import { TtsCache } from './entities/tts-cache.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TtsCache])],
  controllers: [TtsController, TtsDownloadController],
  providers: [TtsService],
  exports: [TtsService],
})
export class TtsModule {}
