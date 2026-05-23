import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';
import { S3UploadService } from '../../common/services/s3-upload.service';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [S3UploadService],
})
export class UploadModule {}
