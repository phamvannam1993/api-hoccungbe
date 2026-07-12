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
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildProfile } from './entities/child-profile.entity';

@ApiTags('Children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hồ sơ bé mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo hồ sơ bé thành công',
    type: ChildProfile,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() dto: CreateChildDto) {
    return this.childrenService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách hồ sơ bé' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách hồ sơ bé thành công',
    type: [ChildProfile],
  })
  findAll(@Query('userId', new ParseIntPipe({ optional: true })) userId?: number) {
    return this.childrenService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết hồ sơ bé theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết hồ sơ bé thành công',
    type: ChildProfile,
  })
  @ApiResponse({
    status: 404,
    description: 'Hồ sơ bé không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.childrenService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật hồ sơ bé' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật hồ sơ bé thành công',
    type: ChildProfile,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Hồ sơ bé không tồn tại',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateChildDto) {
    return this.childrenService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa hồ sơ bé theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa hồ sơ bé thành công',
    schema: {
      example: {
        message: 'Child profile deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Hồ sơ bé không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.childrenService.remove(id);
  }
}
