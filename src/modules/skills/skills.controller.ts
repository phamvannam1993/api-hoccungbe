import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
