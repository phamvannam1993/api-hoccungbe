import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildProfile } from './entities/child-profile.entity';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectRepository(ChildProfile)
    private readonly childrenRepository: Repository<ChildProfile>,
  ) {}

  create(dto: CreateChildDto) {
    const entity = this.childrenRepository.create(dto);
    return this.childrenRepository.save(entity);
  }

  findAll() {
    return this.childrenRepository.find({
      relations: ['user', 'progressRecords', 'rewards'],
    });
  }

  async findOne(id: number) {
    const child = await this.childrenRepository.findOne({
      where: { id },
      relations: ['user', 'progressRecords', 'rewards'],
    });
    if (!child) throw new NotFoundException('Child profile not found');
    return child;
  }

  async update(id: number, dto: UpdateChildDto) {
    const child = await this.findOne(id);
    Object.assign(child, dto);
    return this.childrenRepository.save(child);
  }

  async remove(id: number) {
    const child = await this.findOne(id);
    await this.childrenRepository.remove(child);
    return { message: 'Child profile deleted successfully' };
  }
}
