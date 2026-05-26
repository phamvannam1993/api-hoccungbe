import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findPublished(
    @Query('category') category?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articlesService.findPublished(category, page ? Number(page) : 1, limit ? Number(limit) : 10);
  }

  @Get('all')
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    // numeric id → findById (admin, no published filter, no view increment)
    if (/^\d+$/.test(slug)) return this.articlesService.findById(Number(slug));
    return this.articlesService.findBySlug(slug);
  }

  @Post('generate')
  generate(@Body() body: { topic: string; category?: string }) {
    return this.articlesService.generate(body.topic, body.category || 'kien-thuc');
  }

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Patch(':id/publish')
  togglePublish(@Param('id') id: string) {
    return this.articlesService.togglePublish(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(Number(id));
  }
}
