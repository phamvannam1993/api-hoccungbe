import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildProfile } from './entities/child-profile.entity';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChildProfile])],
  providers: [ChildrenService],
  controllers: [ChildrenController],
  exports: [TypeOrmModule, ChildrenService],
})
export class ChildrenModule {}
