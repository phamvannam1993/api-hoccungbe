import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IqQuestion } from './entities/iq-question.entity';
import { IqQuestionsController } from './iq-questions.controller';
import { IqQuestionsService } from './iq-questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([IqQuestion])],
  controllers: [IqQuestionsController],
  providers: [IqQuestionsService],
  exports: [IqQuestionsService, TypeOrmModule],
})
export class IqQuestionsModule {}
