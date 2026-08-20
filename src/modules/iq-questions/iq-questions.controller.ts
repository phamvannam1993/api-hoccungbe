import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IqQuestionsService, RawIqQuestion } from './iq-questions.service';
import { CreateIqQuestionDto } from './dto/create-iq-question.dto';
import { UpdateIqQuestionDto } from './dto/update-iq-question.dto';
import { IqQuestion } from './entities/iq-question.entity';

@ApiTags('IQ Questions (Toán tư duy)')
@Controller('iq-questions')
export class IqQuestionsController {
  constructor(private readonly service: IqQuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo một câu hỏi IQ / Toán tư duy' })
  @ApiResponse({ status: 201, type: IqQuestion })
  create(@Body() dto: CreateIqQuestionDto) {
    return this.service.create(dto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import cả bộ câu hỏi cho một lớp (đúng format gốc, upsert theo id)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        grade: { type: 'number', example: 2 },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'thu-thach-iq-lop-2-01' },
              subject: { type: 'string' },
              lesson: { type: 'string' },
              question: { type: 'string' },
              question_speech: { type: 'string' },
              options: { type: 'array', items: { type: 'string' } },
              correct_index: { type: 'number' },
              countdown: { type: 'array', items: { type: 'string' } },
              explanation: { type: 'string' },
              explanation_speech: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Kết quả import (created/updated)' })
  import(@Body() body: { grade: number; questions: RawIqQuestion[] }) {
    return this.service.importQuestions(Number(body.grade), body.questions ?? []);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách câu hỏi IQ (lọc theo lớp)' })
  @ApiQuery({ name: 'grade', required: false, type: Number })
  @ApiQuery({ name: 'isActive', required: false, type: String, description: "'true' | 'false'" })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('grade') grade?: string,
    @Query('isActive') isActive?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.findAll(
      grade ? +grade : undefined,
      isActive || undefined,
      page ? +page : 1,
      limit ? +limit : 100,
    );
  }

  @Get('by-grade/:grade')
  @ApiOperation({ summary: 'Câu hỏi đang hoạt động của một lớp (cho frontend)' })
  @ApiParam({ name: 'grade', example: 2 })
  findByGrade(@Param('grade', ParseIntPipe) grade: number) {
    return this.service.findByGrade(grade);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết câu hỏi IQ theo id' })
  @ApiParam({ name: 'id', example: 1 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật câu hỏi IQ' })
  @ApiParam({ name: 'id', example: 1 })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateIqQuestionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa câu hỏi IQ' })
  @ApiParam({ name: 'id', example: 1 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
