import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'Danh mục kỹ năng' })
  list() {
    return this.service.listSkills();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo kỹ năng' })
  create(@Body() dto: Partial<Skill>) {
    return this.service.createSkill(dto);
  }

  @Post('link/lesson')
  @ApiOperation({ summary: 'Gắn kỹ năng cho bài học' })
  linkLesson(@Body() body: { lessonId: number; skillId: number; weight?: number }) {
    return this.service.linkLesson(body.lessonId, body.skillId, body.weight ?? 1);
  }

  @Post('link/game')
  @ApiOperation({ summary: 'Gắn kỹ năng cho trò chơi' })
  linkGame(@Body() body: { gameId: number; skillId: number }) {
    return this.service.linkGame(body.gameId, body.skillId);
  }

  @Get('catalog')
  @ApiOperation({ summary: 'Danh mục kỹ năng kèm số bài (cho trang Học theo kỹ năng)' })
  catalog(@Query('grade') grade?: string, @Query('subject') subject?: string) {
    return this.service.catalog({ grade, subject });
  }

  @Get('code/:code/lessons')
  @ApiOperation({ summary: 'Các bài học thuộc một kỹ năng' })
  lessonsBySkill(@Param('code') code: string, @Query('grade') grade?: string) {
    return this.service.lessonsBySkill(code, grade);
  }

  @Get('code/:code/questions')
  @ApiOperation({ summary: 'Bốc câu hỏi theo kỹ năng (cho nhiệm vụ hằng ngày & luyện tự do)' })
  questionsBySkill(
    @Param('code') code: string,
    @Query('grade') grade?: string,
    @Query('limit') limit?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    return this.service.questionsBySkill(code, { grade, limit: limit ? Number(limit) : undefined, difficulty });
  }

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Kỹ năng của một bài học' })
  lessonSkills(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.service.getLessonSkills(lessonId);
  }

  @Get('child/:childId/mastery')
  @ApiOperation({ summary: 'Mức thành thạo kỹ năng của bé' })
  mastery(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.getChildMastery(childId);
  }
}
