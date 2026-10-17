import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3UploadService } from '../../common/services/s3-upload.service';
import { AuthModule } from '../auth/auth.module';
import { IqIcon } from './entities/iq-icon.entity';
import { IqIconsService } from './iq-icons.service';
import { IqIconsController } from './iq-icons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IqIcon]), ConfigModule, AuthModule],
  providers: [IqIconsService, S3UploadService],
  controllers: [IqIconsController],
})
export class IqIconsModule {}
