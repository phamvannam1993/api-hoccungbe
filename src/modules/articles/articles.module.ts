import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Article } from './entities/article.entity';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { S3UploadService } from '../../common/services/s3-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ConfigModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, S3UploadService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
