import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VocabImage } from './entities/vocab-image.entity';
import { VocabImagesService } from './vocab-images.service';
import { VocabImagesController } from './vocab-images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VocabImage])],
  providers: [VocabImagesService],
  controllers: [VocabImagesController],
  exports: [VocabImagesService],
})
export class VocabImagesModule {}
