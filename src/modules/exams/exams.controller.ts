import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  findAll(@Query('subject') subject?: string, @Query('grade') grade?: string) {
    return this.examsService.findAll(subject, grade ? Number(grade) : undefined);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    // support both numeric id and slug
    if (/^\d+$/.test(id)) return this.examsService.findById(Number(id));
    return this.examsService.findBySlug(id);
  }
}
