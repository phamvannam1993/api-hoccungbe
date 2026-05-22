import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlayService } from './play.service';

@ApiTags('Play')
@Controller('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Get('subjects')
  @ApiOperation({ summary: 'Lấy danh sách chủ đề học' })
  findAllSubjects() {
    return this.playService.findAllSubjects();
  }

  @Get('subjects/:slug/topics')
  @ApiOperation({ summary: 'Lấy danh sách topic theo subject slug' })
  findTopics(@Param('slug') slug: string) {
    return this.playService.findTopicsBySubject(slug);
  }

  @Get('topics/:slug/levels')
  @ApiOperation({ summary: 'Lấy danh sách cấp độ theo topic slug' })
  findLevels(@Param('slug') slug: string) {
    return this.playService.findLevelsByTopic(slug);
  }

  @Get('levels/:slug/lessons')
  @ApiOperation({ summary: 'Lấy danh sách bài học theo level slug' })
  findLessons(@Param('slug') slug: string) {
    return this.playService.findLessonsByLevel(slug);
  }

  @Get('lessons/:id/questions')
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi theo lesson id' })
  findQuestions(@Param('id', ParseIntPipe) id: number) {
    return this.playService.findQuestionsByLesson(id);
  }
}
