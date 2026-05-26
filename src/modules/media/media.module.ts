import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3UploadService } from '../../common/services/s3-upload.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), ConfigModule],
  controllers: [MediaController],
  providers: [MediaService, S3UploadService],
  exports: [MediaService],
})
export class MediaModule {}
