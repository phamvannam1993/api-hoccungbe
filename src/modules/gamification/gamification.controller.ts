import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { Badge } from './entities/badge.entity';
import { Quest } from './entities/quest.entity';

@ApiTags('gamification')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly service: GamificationService) {}

  @Get('badges')
  @ApiOperation({ summary: 'Danh mục huy hiệu' })
  badges() {
    return this.service.listBadges();
  }

  @Post('badges')
  @ApiOperation({ summary: '[admin] Tạo huy hiệu' })
  createBadge(@Body() dto: Partial<Badge>) {
    return this.service.createBadge(dto);
  }

  @Post('quests')
  @ApiOperation({ summary: '[admin] Tạo nhiệm vụ' })
  createQuest(@Body() dto: Partial<Quest>) {
    return this.service.createQuest(dto);
  }

  @Get('child/:childId/badges')
  @ApiOperation({ summary: 'Huy hiệu bé đã đạt' })
  childBadges(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.childBadgeList(childId);
  }

  @Get('quests')
  @ApiOperation({ summary: 'Danh sách nhiệm vụ' })
  quests() {
    return this.service.listQuests();
  }

  @Get('child/:childId/quests')
  @ApiOperation({ summary: 'Nhiệm vụ + tiến độ của bé' })
  childQuests(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.childQuests(childId);
  }

  @Post('child/:childId/quests/:questId/claim')
  @ApiOperation({ summary: 'Nhận thưởng nhiệm vụ đã hoàn thành' })
  claim(
    @Param('childId', ParseIntPipe) childId: number,
    @Param('questId', ParseIntPipe) questId: number,
  ) {
    return this.service.claimQuest(childId, questId);
  }
}
