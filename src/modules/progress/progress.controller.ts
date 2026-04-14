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
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Progress } from './entities/progress.entity';

@ApiTags('Progress')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo tiến độ học mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo tiến độ học thành công',
    type: Progress,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() dto: CreateProgressDto) {
    return this.progressService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tiến độ học' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách tiến độ học thành công',
    type: [Progress],
  })
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tiến độ học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bản ghi tiến độ',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết tiến độ học thành công',
    type: Progress,
  })
  @ApiResponse({
    status: 404,
    description: 'Bản ghi tiến độ không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật tiến độ học' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bản ghi tiến độ',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật tiến độ học thành công',
    type: Progress,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Bản ghi tiến độ không tồn tại',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.progressService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tiến độ học theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID bản ghi tiến độ',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa tiến độ học thành công',
    schema: {
      example: {
        message: 'Progress deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bản ghi tiến độ không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.remove(id);
  }
}
