import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { S3UploadService } from '../../common/services/s3-upload.service';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly s3: S3UploadService,
  ) {}

  @Get()
  findAll(
    @Query('folder') folder?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.mediaService.findAll(folder, search, page ? Number(page) : 1, limit ? Number(limit) : 40);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(
    @UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string; size: number },
    @Body('folder') folderBody?: string,
    @Query('folder') folderQuery?: string,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const folder = folderBody || folderQuery || (file.mimetype?.startsWith('image') ? 'media/images' : 'media/files');
    const url = await this.s3.uploadImage(
      { buffer: file.buffer, originalname: file.originalname, mimetype: file.mimetype },
      folder,
    );
    const media = await this.mediaService.create({
      url,
      originalName: file.originalname,
      folder,
      mimeType: file.mimetype,
      size: file.size,
    });
    return media;
  }

  // Tạo media từ link ảnh có sẵn (không upload file)
  @Post()
  async createFromUrl(
    @Body() body: { url?: string; originalName?: string; folder?: string; mimeType?: string },
  ) {
    const url = (body.url || '').trim();
    if (!url || !/^https?:\/\//i.test(url)) {
      throw new BadRequestException('Link ảnh không hợp lệ (phải bắt đầu bằng http:// hoặc https://)');
    }
    const nameFromUrl = decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'image');
    return this.mediaService.create({
      url,
      originalName: (body.originalName || '').trim() || nameFromUrl,
      folder: (body.folder || '').trim() || 'media/links',
      mimeType: body.mimeType || 'image/*',
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.delete(id);
  }
}
