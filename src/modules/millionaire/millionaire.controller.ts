import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MillionaireService } from './millionaire.service';

@ApiTags('millionaire')
@Controller('millionaire')
export class MillionaireController {
  constructor(private readonly service: MillionaireService) {}

  @Get('session')
  @ApiOperation({ summary: 'Bốc bộ câu cho một ván (không kèm đáp án)' })
  session(@Query('grade') grade: string, @Query('mode') mode?: string) {
    const m = mode === 'speed' || mode === 'boss' ? mode : 'classic';
    return this.service.session(Number(grade) || 1, m);
  }

  @Post('check')
  @ApiOperation({ summary: 'Chấm một câu, kèm giải thích cách làm' })
  check(@Body() body: { questionId: number; selectedIndex: number | null }) {
    return this.service.check(body.questionId, body.selectedIndex);
  }

  @Get('hint/fifty')
  @ApiOperation({ summary: 'Trợ giúp Gợi ý — loại bỏ 2 đáp án sai' })
  fifty(@Query('questionId') questionId: string) {
    return this.service.fiftyFifty(Number(questionId));
  }

  @Get('hint/friends')
  @ApiOperation({ summary: 'Trợ giúp Hỏi bạn — ý kiến các bạn theo phần trăm' })
  friends(@Query('questionId') questionId: string) {
    return this.service.askFriends(Number(questionId));
  }

  @Get('hint/swap')
  @ApiOperation({ summary: 'Trợ giúp Đổi câu hỏi — bốc câu khác cùng mức khó' })
  swap(
    @Query('grade') grade: string,
    @Query('band') band: string,
    @Query('exclude') exclude?: string,
  ) {
    const ids = (exclude ?? '').split(',').map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0);
    return this.service.swap(Number(grade) || 1, Number(band) || 1, ids);
  }

  @Post('finish')
  @ApiOperation({ summary: 'Lưu kết quả ván chơi' })
  finish(
    @Body()
    body: {
      childId?: number | null; name: string; avatar?: string; grade: number;
      mode: 'classic' | 'speed' | 'boss'; totalQuestions: number; correctCount: number;
      prize: number; bestCombo: number; timeSec: number;
      answers?: { questionId: number; isCorrect: boolean }[];
    },
  ) {
    return this.service.finish(body);
  }

  @Post('analyse')
  @ApiOperation({ summary: 'Phân tích năng lực theo kỹ năng sau ván chơi' })
  analyse(@Body() body: { answers: { questionId: number; isCorrect: boolean }[] }) {
    return this.service.analyse(body.answers ?? []);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Bảng xếp hạng theo lớp và theo kỳ' })
  leaderboard(@Query('grade') grade: string, @Query('period') period?: string) {
    const p = period === 'month' || period === 'all' ? period : 'week';
    return this.service.leaderboard(Number(grade) || 1, p);
  }
}
