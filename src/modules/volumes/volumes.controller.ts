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
import { VolumesService } from './volumes.service';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';

@ApiTags('Volumes')
@Controller('volumes')
export class VolumesController {
  constructor(private readonly volumesService: VolumesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo tập mới' })
  @ApiResponse({ status: 201, description: 'Tạo tập thành công' })
  create(@Body() dto: CreateVolumeDto) {
    return this.volumesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tập' })
  @ApiQuery({ name: 'courseId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lấy danh sách tập thành công' })
  findAll(@Query('courseId') courseId?: string) {
    return this.volumesService.findAll(courseId ? Number(courseId) : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tập theo id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết tập thành công' })
  @ApiResponse({ status: 404, description: 'Tập không tồn tại' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.volumesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật tập' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Cập nhật tập thành công' })
  @ApiResponse({ status: 404, description: 'Tập không tồn tại' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVolumeDto) {
    return this.volumesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tập theo id' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Xóa tập thành công' })
  @ApiResponse({ status: 404, description: 'Tập không tồn tại' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.volumesService.remove(id);
  }
}
