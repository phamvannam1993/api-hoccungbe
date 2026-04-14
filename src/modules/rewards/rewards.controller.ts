import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Reward, RewardType } from './entities/reward.entity';

@ApiTags('Rewards')
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo phần thưởng mới cho bé' })
  @ApiResponse({
    status: 201,
    description: 'Tạo phần thưởng thành công',
    type: Reward,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách phần thưởng' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phần thưởng thành công',
    type: [Reward],
  })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get('child/:childId')
  @ApiOperation({ summary: 'Lấy danh sách phần thưởng theo childId' })
  @ApiParam({
    name: 'childId',
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phần thưởng của bé thành công',
    type: [Reward],
  })
  findByChild(@Param('childId', ParseIntPipe) childId: number) {
    return this.rewardsService.findByChild(childId);
  }

  @Get('child/:childId/type/:rewardType')
  @ApiOperation({ summary: 'Lấy phần thưởng theo childId và loại phần thưởng' })
  @ApiParam({
    name: 'childId',
    example: 1,
    description: 'ID hồ sơ bé',
  })
  @ApiParam({
    name: 'rewardType',
    enum: RewardType,
    example: RewardType.BADGE,
    description: 'Loại phần thưởng',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy phần thưởng theo loại thành công',
    type: [Reward],
  })
  @ApiResponse({
    status: 400,
    description: 'Loại phần thưởng không hợp lệ',
  })
  findByChildAndType(
    @Param('childId', ParseIntPipe) childId: number,
    @Param('rewardType', new ParseEnumPipe(RewardType)) rewardType: RewardType,
  ) {
    return this.rewardsService.findByChildAndType(childId, rewardType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết phần thưởng theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID phần thưởng',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết phần thưởng thành công',
    type: Reward,
  })
  @ApiResponse({
    status: 404,
    description: 'Phần thưởng không tồn tại',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rewardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật phần thưởng' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID phần thưởng',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật phần thưởng thành công',
    type: Reward,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu cập nhật không hợp lệ',
  })
  @ApiResponse({
    status: 404,
    description: 'Phần thưởng không tồn tại',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRewardDto: UpdateRewardDto,
  ) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phần thưởng theo id' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID phần thưởng',
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa phần thưởng thành công',
    schema: {
      example: {
        message: 'Xóa reward thành công',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Phần thưởng không tồn tại',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rewardsService.remove(id);
  }
}
