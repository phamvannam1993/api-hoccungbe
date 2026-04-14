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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo user thành công',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ hoặc email đã tồn tại',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách user thành công',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Tìm người dùng theo email' })
  @ApiParam({
    name: 'email',
    example: 'nguyenvana@gmail.com',
    description: 'Email người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm user theo email thành công',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy user',
  })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết người dùng theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết user thành công',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật user thành công',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'User không tồn tại',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa user thành công',
    schema: {
      example: {
        message: 'Xóa user thành công',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
