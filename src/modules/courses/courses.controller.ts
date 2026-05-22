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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo khóa học mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo khóa học thành công',
    type: Course,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách khóa học' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách khóa học thành công',
    type: [Course],
  })
  findAll(@Query('published') published?: string) {
    return this.coursesService.findAll(published === 'true');
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết khóa học theo slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết khóa học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID khóa học',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết khóa học thành công',
    type: Course,
  })
  @ApiResponse({
    status: 404,
    description: 'Khóa học không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật khóa học' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID khóa học',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật khóa học thành công',
    type: Course,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Khóa học không tồn tại',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa khóa học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID khóa học',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa khóa học thành công',
    schema: {
      example: {
        message: 'Course deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Khóa học không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
