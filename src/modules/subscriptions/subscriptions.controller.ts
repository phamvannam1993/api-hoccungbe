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
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo gói đăng ký mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo subscription thành công',
    type: Subscription,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách gói đăng ký' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách subscription thành công',
    type: [Subscription],
  })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Lấy danh sách gói đăng ký theo userId' })
  @ApiParam({
    name: 'userId',
    example: 1,
    description: 'ID người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách subscription theo user thành công',
    type: [Subscription],
  })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.findByUser(userId);
  }

  @Get('user/:userId/active')
  @ApiOperation({
    summary: 'Lấy danh sách gói đăng ký đang hoạt động theo userId',
  })
  @ApiParam({
    name: 'userId',
    example: 1,
    description: 'ID người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách subscription active thành công',
    type: [Subscription],
  })
  findActiveByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.findActiveByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết gói đăng ký theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID subscription',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết subscription thành công',
    type: Subscription,
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật gói đăng ký' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID subscription',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật subscription thành công',
    type: Subscription,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription không tồn tại',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa gói đăng ký theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID subscription',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa subscription thành công',
    schema: {
      example: {
        message: 'Xóa subscription thành công',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
