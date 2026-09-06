import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillPracticeService, type SubmitAnswer } from './skill-practice.service';

@ApiTags('skill-practice')
@Controller('skill-practice')
export class SkillPracticeController {
  constructor(private readonly service: SkillPracticeService) {}

  @Get('session')
  @ApiOperation({ summary: 'Bốc một phiên luyện theo kỹ năng (không kèm đáp án)' })
  session(
    @Query('skill') skill: string,
    @Query('grade') grade: string,
    @Query('limit') limit?: string,
    @Query('childId') childId?: string,
  ) {
    // Có childId thì phiên được chọn theo bậc thành thạo của bé; không có
    // (khách chưa tạo hồ sơ) thì rơi về mức dễ như người mới bắt đầu.
    return this.service.buildSession(
      skill,
      Number(grade),
      limit ? Number(limit) : 10,
      childId ? Number(childId) : null,
    );
  }

  @Post('check')
  @ApiOperation({ summary: 'Chấm một câu và trả lời giải thích cách làm' })
  check(@Body() body: { questionId: number; selectedIndex: number | null }) {
    return this.service.check(body.questionId, body.selectedIndex);
  }

  @Get('variant/:questionId')
  @ApiOperation({ summary: 'Câu tương tự cùng dạng, để bé làm lại sau khi sai' })
  variant(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.service.variantOf(questionId);
  }

  @Post('attempts')
  @ApiOperation({ summary: 'Lưu một phiên luyện kỹ năng + cập nhật mức thành thạo' })
  submit(
    @Body()
    body: { childId: number; skillCode: string; grade: number; timeSpentSec?: number; answers: SubmitAnswer[] },
  ) {
    return this.service.submit(body);
  }

  @Get('child/:childId/overview')
  @ApiOperation({ summary: 'Bậc thành thạo của bé trên toàn bộ kỹ năng của một lớp' })
  overview(
    @Param('childId', ParseIntPipe) childId: number,
    @Query('grade') grade: string,
    @Query('subject') subject?: string,
  ) {
    return this.service.childOverview(childId, Number(grade), subject);
  }

  @Get('child/:childId/skill/:code')
  @ApiOperation({ summary: 'Bậc thành thạo của bé với một kỹ năng' })
  childSkill(@Param('childId', ParseIntPipe) childId: number, @Param('code') code: string) {
    return this.service.childSkillLevel(childId, code);
  }

  @Get('child/:childId/due')
  @ApiOperation({ summary: 'Kỹ năng đến hạn ôn lại (ôn giãn cách)' })
  due(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.dueForReview(childId);
  }

  @Get('child/:childId/wrong')
  @ApiOperation({ summary: 'Câu bé từng làm sai khi luyện kỹ năng' })
  wrong(@Param('childId', ParseIntPipe) childId: number, @Query('limit') limit?: string) {
    return this.service.wrongQuestions(childId, limit ? Number(limit) : 20);
  }
}
