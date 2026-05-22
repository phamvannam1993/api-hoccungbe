import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo chủ đề mới' })
  @ApiResponse({ status: 201, description: 'Tạo chủ đề thành công' })
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách chủ đề' })
  @ApiQuery({ name: 'courseId', required: false, type: Number })
  @ApiQuery({ name: 'volumeId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lấy danh sách chủ đề thành công' })
  findAll(
    @Query('courseId') courseId?: string,
    @Query('volumeId') volumeId?: string,
  ) {
    return this.topicsService.findAll(
      courseId ? Number(courseId) : undefined,
      volumeId ? Number(volumeId) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết chủ đề theo id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết chủ đề thành công' })
  @ApiResponse({ status: 404, description: 'Chủ đề không tồn tại' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật chủ đề' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Cập nhật chủ đề thành công' })
  @ApiResponse({ status: 404, description: 'Chủ đề không tồn tại' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa chủ đề theo id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Xóa chủ đề thành công' })
  @ApiResponse({ status: 404, description: 'Chủ đề không tồn tại' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.remove(id);
  }
}
