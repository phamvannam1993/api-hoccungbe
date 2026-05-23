import {
  Controller, Post, UploadedFile, UseInterceptors, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3UploadService } from '../../common/services/s3-upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3: S3UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  async uploadImage(@UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string; size: number }) {
    if (!file) throw new BadRequestException('No file provided');
    const url = await this.s3.uploadImage(
      { buffer: file.buffer, originalname: file.originalname, mimetype: file.mimetype },
      'articles/images',
    );
    return { url };
  }
}
