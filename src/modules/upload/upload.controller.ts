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

  /** Tải tệp audio lên (dùng cho trang quản lý giọng đọc). */
  @Post('audio')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      // Chỉ nhận audio. Không lọc thì một tệp bất kỳ cũng lọt vào kho giọng đọc
      // và trang web phát ra tiếng rè hoặc im lặng.
      if (!/^audio\//.test(file.mimetype)) {
        callback(new BadRequestException('Chỉ nhận tệp âm thanh (mp3, m4a, wav…)'), false);
        return;
      }
      callback(null, true);
    },
  }))
  async uploadAudio(@UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string; size: number }) {
    if (!file) throw new BadRequestException('Chưa chọn tệp');
    const url = await this.s3.uploadAudio(
      { buffer: file.buffer, originalname: file.originalname, mimetype: file.mimetype },
      'tts',
    );
    return { url };
  }

  @Post('pdf')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      if (file.mimetype !== 'application/pdf') {
        callback(new BadRequestException('Only PDF files are allowed'), false);
        return;
      }
      callback(null, true);
    },
  }))
  async uploadPdf(@UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string; size: number }) {
    if (!file) throw new BadRequestException('No file provided');
    const url = await this.s3.uploadImage(
      { buffer: file.buffer, originalname: file.originalname, mimetype: file.mimetype },
      'documents/pdfs',
    );
    return { url, fileName: file.originalname };
  }
}
