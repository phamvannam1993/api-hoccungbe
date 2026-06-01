import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { MiniGamesService } from './mini-games.service';
import { CreateMiniGameDto } from './dto/create-mini-game.dto';
import { UpdateMiniGameDto } from './dto/update-mini-game.dto';
import { ReorderMiniGamesDto } from './dto/reorder-mini-games.dto';

@Controller('mini-games')
export class MiniGamesController {
  constructor(private readonly miniGamesService: MiniGamesService) {}

  @Get()
  findAll(
    @Query('showOnHomepage') showOnHomepage?: string,
    @Query('isActive') isActive?: string,
  ) {
    const query: { showOnHomepage?: boolean; isActive?: boolean } = {};
    if (showOnHomepage !== undefined) query.showOnHomepage = showOnHomepage === 'true';
    if (isActive !== undefined) query.isActive = isActive === 'true';
    return this.miniGamesService.findAll(query);
  }

  @Get('homepage')
  findHomepage() {
    return this.miniGamesService.findHomepage();
  }

  @Post('reorder')
  reorder(@Body() dto: ReorderMiniGamesDto) {
    return this.miniGamesService.reorder(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miniGamesService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateMiniGameDto) {
    return this.miniGamesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMiniGameDto) {
    return this.miniGamesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miniGamesService.remove(Number(id));
  }

  @Patch(':id/toggle-homepage')
  toggleHomepage(@Param('id') id: string) {
    return this.miniGamesService.toggleHomepage(Number(id));
  }
}
