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
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo câu hỏi quiz mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo câu hỏi quiz thành công',
    type: Quiz,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() dto: CreateQuizDto) {
    return this.quizzesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi quiz' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách câu hỏi quiz thành công',
    type: [Quiz],
  })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết câu hỏi quiz theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID câu hỏi quiz',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết câu hỏi quiz thành công',
    type: Quiz,
  })
  @ApiResponse({
    status: 404,
    description: 'Câu hỏi quiz không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật câu hỏi quiz' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID câu hỏi quiz',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật câu hỏi quiz thành công',
    type: Quiz,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Câu hỏi quiz không tồn tại',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizDto) {
    return this.quizzesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa câu hỏi quiz theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID câu hỏi quiz',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa câu hỏi quiz thành công',
    schema: {
      example: {
        message: 'Quiz deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Câu hỏi quiz không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.remove(id);
  }
}
