import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bài học mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài học thành công',
    type: Lesson,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bài học' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài học thành công',
    type: [Lesson],
  })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bài học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bài học',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết bài học thành công',
    type: Lesson,
  })
  @ApiResponse({
    status: 404,
    description: 'Bài học không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật bài học' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bài học',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài học thành công',
    type: Lesson,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Bài học không tồn tại',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bài học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bài học',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài học thành công',
    schema: {
      example: {
        message: 'Lesson deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bài học không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }
}
