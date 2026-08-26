import { Body, Controller, Delete, Get, Param, Put, BadRequestException } from '@nestjs/common';
import { VocabImagesService } from './vocab-images.service';

@Controller('vocab-images')
export class VocabImagesController {
  constructor(private readonly service: VocabImagesService) {}

  /** Công khai — frontend game từ vựng gọi khi load để biết từ nào có ảnh. */
  @Get()
  getMap() {
    return this.service.getMap();
  }

  /** Admin: gán ảnh cho một từ (imageUrl lấy từ /api/upload/image). */
  @Put(':wordId')
  upsert(@Param('wordId') wordId: string, @Body('imageUrl') imageUrl: string) {
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new BadRequestException('imageUrl is required');
    }
    return this.service.upsert(wordId, imageUrl);
  }

  /** Admin: gỡ ảnh của một từ (về emoji mặc định). */
  @Delete(':wordId')
  remove(@Param('wordId') wordId: string) {
    return this.service.remove(wordId);
  }
}
