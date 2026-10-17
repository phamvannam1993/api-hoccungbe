import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../common/guards/admin.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
// Quản lý người dùng chỉ dành cho admin (trước đây không có guard: ai cũng xem email
// hoặc tự đổi role thành admin qua PATCH /users/:id).
@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* Bỏ `passwordHash` trước khi trả ra.
   *
   * `findAll`/`findOne` trả nguyên thực thể TypeORM, nghĩa là băm bcrypt mật khẩu
   * của cả 178 người dùng đi thẳng vào trình duyệt admin, rồi nằm lại trong DevTools,
   * trong bộ nhớ đệm, trong log của mọi proxy trên đường. Guard admin chặn được người
   * lạ, nhưng băm mật khẩu thì không có lý do gì rời khỏi máy chủ.
   *
   * Lọc ở ĐÂY chứ không ở service: `update()` đọc `user.passwordHash` làm giá trị giữ
   * nguyên khi không đổi mật khẩu, nên service vẫn phải lấy được cột ấy. */
  private congKhai(u: User): Omit<User, 'passwordHash'> {
    const ra: Partial<User> = { ...u };
    delete ra.passwordHash;
    return ra as Omit<User, 'passwordHash'>;
  }

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
  async create(@Body() createUserDto: CreateUserDto) {
    return this.congKhai(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách user thành công',
    type: [User],
  })
  async findAll() {
    return (await this.usersService.findAll()).map((u) => this.congKhai(u));
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
  async findByEmail(@Param('email') email: string) {
    const u = await this.usersService.findByEmail(email);
    return u ? this.congKhai(u) : null;
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.congKhai(await this.usersService.findOne(id));
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.congKhai(await this.usersService.update(id, updateUserDto));
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
