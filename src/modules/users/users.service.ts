import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        `Email "${createUserDto.email}" đã tồn tại`,
      );
    }

    const user = this.usersRepository.create({
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      passwordHash: createUserDto.passwordHash,
      phone: createUserDto.phone,
      role: createUserDto.role ?? UserRole.PARENT,
      status: createUserDto.status ?? UserStatus.ACTIVE,
      avatarUrl: createUserDto.avatarUrl,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['children', 'subscriptions', 'createdCourses'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['children', 'subscriptions', 'createdCourses'],
    });

    if (!user) {
      throw new NotFoundException(`User với id ${id} không tồn tại`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['children', 'subscriptions'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (
      updateUserDto.email !== undefined &&
      updateUserDto.email !== user.email
    ) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          `Email "${updateUserDto.email}" đã tồn tại`,
        );
      }
    }

    Object.assign(user, {
      fullName:
        updateUserDto.fullName !== undefined
          ? updateUserDto.fullName
          : user.fullName,
      email:
        updateUserDto.email !== undefined ? updateUserDto.email : user.email,
      passwordHash:
        updateUserDto.passwordHash !== undefined
          ? updateUserDto.passwordHash
          : user.passwordHash,
      phone:
        updateUserDto.phone !== undefined ? updateUserDto.phone : user.phone,
      role: updateUserDto.role !== undefined ? updateUserDto.role : user.role,
      status:
        updateUserDto.status !== undefined ? updateUserDto.status : user.status,
      avatarUrl:
        updateUserDto.avatarUrl !== undefined
          ? updateUserDto.avatarUrl
          : user.avatarUrl,
    });

    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);

    return {
      message: 'Xóa user thành công',
    };
  }
}
