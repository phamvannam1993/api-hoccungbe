import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';

interface UpsertExamDto {
  title: string;
  slug: string;
  subject: string;
  grade: number;
  semester: number;
  description?: string;
  timeLimitMinutes?: number;
  totalPoints?: number;
  isActive?: boolean;
}

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  findAll(
    @Query('subject') subject?: string,
    @Query('grade') grade?: string,
    @Query('all') all?: string,
    @Query('examGroup') examGroup?: string,
  ) {
    return this.examsService.findAll(subject, grade ? Number(grade) : undefined, all === '1', examGroup || undefined);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    if (/^\d+$/.test(id)) return this.examsService.findById(Number(id));
    return this.examsService.findBySlug(id);
  }

  @Post()
  create(@Body() dto: UpsertExamDto) {
    return this.examsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<UpsertExamDto>) {
    return this.examsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.delete(id);
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  @Get(':id/questions')
  listQuestions(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.listQuestions(id);
  }

  @Post(':id/questions')
  createQuestion(@Param('id', ParseIntPipe) id: number, @Body() dto: Record<string, unknown>) {
    return this.examsService.createQuestion(id, dto);
  }

  @Patch(':id/questions/:qid')
  updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Param('qid', ParseIntPipe) qid: number,
    @Body() dto: Record<string, unknown>,
  ) {
    return this.examsService.updateQuestion(id, qid, dto);
  }

  @Delete(':id/questions/:qid')
  deleteQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Param('qid', ParseIntPipe) qid: number,
  ) {
    return this.examsService.deleteQuestion(id, qid);
  }
}
