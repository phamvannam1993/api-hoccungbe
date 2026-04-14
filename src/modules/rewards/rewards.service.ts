import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward, RewardType } from './entities/reward.entity';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardsRepository: Repository<Reward>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = this.rewardsRepository.create({
      childId: createRewardDto.childId,
      courseId: createRewardDto.courseId,
      lessonId: createRewardDto.lessonId,
      rewardType: createRewardDto.rewardType ?? RewardType.STAR,
      rewardName: createRewardDto.rewardName,
      rewardDescription: createRewardDto.rewardDescription,
      rewardIconUrl: createRewardDto.rewardIconUrl,
      points: createRewardDto.points ?? 0,
      awardedAt: createRewardDto.awardedAt
        ? new Date(createRewardDto.awardedAt)
        : new Date(),
    });

    return await this.rewardsRepository.save(reward);
  }

  async findAll(): Promise<Reward[]> {
    return await this.rewardsRepository.find({
      relations: ['child', 'course', 'lesson'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Reward> {
    const reward = await this.rewardsRepository.findOne({
      where: { id },
      relations: ['child', 'course', 'lesson'],
    });

    if (!reward) {
      throw new NotFoundException(`Reward với id ${id} không tồn tại`);
    }

    return reward;
  }

  async update(id: number, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    const reward = await this.findOne(id);

    Object.assign(reward, {
      childId:
        updateRewardDto.childId !== undefined
          ? updateRewardDto.childId
          : reward.childId,
      courseId:
        updateRewardDto.courseId !== undefined
          ? updateRewardDto.courseId
          : reward.courseId,
      lessonId:
        updateRewardDto.lessonId !== undefined
          ? updateRewardDto.lessonId
          : reward.lessonId,
      rewardType:
        updateRewardDto.rewardType !== undefined
          ? updateRewardDto.rewardType
          : reward.rewardType,
      rewardName:
        updateRewardDto.rewardName !== undefined
          ? updateRewardDto.rewardName
          : reward.rewardName,
      rewardDescription:
        updateRewardDto.rewardDescription !== undefined
          ? updateRewardDto.rewardDescription
          : reward.rewardDescription,
      rewardIconUrl:
        updateRewardDto.rewardIconUrl !== undefined
          ? updateRewardDto.rewardIconUrl
          : reward.rewardIconUrl,
      points:
        updateRewardDto.points !== undefined
          ? updateRewardDto.points
          : reward.points,
      awardedAt:
        updateRewardDto.awardedAt !== undefined
          ? new Date(updateRewardDto.awardedAt)
          : reward.awardedAt,
    });

    return await this.rewardsRepository.save(reward);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reward = await this.findOne(id);
    await this.rewardsRepository.remove(reward);

    return {
      message: 'Xóa reward thành công',
    };
  }

  async findByChild(childId: number): Promise<Reward[]> {
    return await this.rewardsRepository.find({
      where: { childId },
      relations: ['course', 'lesson'],
      order: { awardedAt: 'DESC' },
    });
  }

  async findByChildAndType(
    childId: number,
    rewardType: RewardType,
  ): Promise<Reward[]> {
    return await this.rewardsRepository.find({
      where: {
        childId,
        rewardType,
      },
      relations: ['course', 'lesson'],
      order: { awardedAt: 'DESC' },
    });
  }
}
