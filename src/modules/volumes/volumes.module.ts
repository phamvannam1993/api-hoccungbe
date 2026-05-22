import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from './entities/volume.entity';
import { VolumesController } from './volumes.controller';
import { VolumesService } from './volumes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Volume])],
  controllers: [VolumesController],
  providers: [VolumesService],
  exports: [VolumesService, TypeOrmModule],
})
export class VolumesModule {}
