import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Subscription,
  SubscriptionStatus,
} from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create({
      userId: createSubscriptionDto.userId,
      courseId: createSubscriptionDto.courseId,
      planName: createSubscriptionDto.planName,
      planType: createSubscriptionDto.planType,
      amount: createSubscriptionDto.amount,
      currency: createSubscriptionDto.currency,
      status: createSubscriptionDto.status,
      startDate: createSubscriptionDto.startDate
        ? new Date(createSubscriptionDto.startDate)
        : undefined,
      endDate: createSubscriptionDto.endDate
        ? new Date(createSubscriptionDto.endDate)
        : undefined,
      paymentMethod: createSubscriptionDto.paymentMethod,
      transactionCode: createSubscriptionDto.transactionCode,
      autoRenew: createSubscriptionDto.autoRenew,
    });

    return await this.subscriptionsRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      relations: ['user', 'course'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription với id ${id} không tồn tại`);
    }

    return subscription;
  }

  async update(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.findOne(id);

    Object.assign(subscription, {
      userId:
        updateSubscriptionDto.userId !== undefined
          ? updateSubscriptionDto.userId
          : subscription.userId,
      courseId:
        updateSubscriptionDto.courseId !== undefined
          ? updateSubscriptionDto.courseId
          : subscription.courseId,
      planName:
        updateSubscriptionDto.planName !== undefined
          ? updateSubscriptionDto.planName
          : subscription.planName,
      planType:
        updateSubscriptionDto.planType !== undefined
          ? updateSubscriptionDto.planType
          : subscription.planType,
      amount:
        updateSubscriptionDto.amount !== undefined
          ? updateSubscriptionDto.amount
          : subscription.amount,
      currency:
        updateSubscriptionDto.currency !== undefined
          ? updateSubscriptionDto.currency
          : subscription.currency,
      status:
        updateSubscriptionDto.status !== undefined
          ? updateSubscriptionDto.status
          : subscription.status,
      startDate:
        updateSubscriptionDto.startDate !== undefined
          ? new Date(updateSubscriptionDto.startDate)
          : subscription.startDate,
      endDate:
        updateSubscriptionDto.endDate !== undefined
          ? new Date(updateSubscriptionDto.endDate)
          : subscription.endDate,
      paymentMethod:
        updateSubscriptionDto.paymentMethod !== undefined
          ? updateSubscriptionDto.paymentMethod
          : subscription.paymentMethod,
      transactionCode:
        updateSubscriptionDto.transactionCode !== undefined
          ? updateSubscriptionDto.transactionCode
          : subscription.transactionCode,
      autoRenew:
        updateSubscriptionDto.autoRenew !== undefined
          ? updateSubscriptionDto.autoRenew
          : subscription.autoRenew,
    });

    return await this.subscriptionsRepository.save(subscription);
  }

  async remove(id: number): Promise<{ message: string }> {
    const subscription = await this.findOne(id);
    await this.subscriptionsRepository.remove(subscription);

    return {
      message: 'Xóa subscription thành công',
    };
  }

  async findByUser(userId: number): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      where: { userId },
      relations: ['course'],
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveByUser(userId: number): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
      relations: ['course'],
      order: { createdAt: 'DESC' },
    });
  }
}
