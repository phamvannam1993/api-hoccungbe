import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volume } from './entities/volume.entity';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';

@Injectable()
export class VolumesService {
  constructor(
    @InjectRepository(Volume)
    private readonly volumesRepository: Repository<Volume>,
  ) {}

  async create(dto: CreateVolumeDto): Promise<Volume> {
    const volume = this.volumesRepository.create(dto);
    return await this.volumesRepository.save(volume);
  }

  async findAll(courseId?: number): Promise<Volume[]> {
    const where = courseId ? { courseId } : {};
    return await this.volumesRepository.find({
      where,
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Volume> {
    const volume = await this.volumesRepository.findOne({ where: { id } });
    if (!volume) {
      throw new NotFoundException(`Volume with id ${id} not found`);
    }
    return volume;
  }

  async update(id: number, dto: UpdateVolumeDto): Promise<Volume> {
    const volume = await this.findOne(id);
    Object.assign(volume, dto);
    return await this.volumesRepository.save(volume);
  }

  async remove(id: number): Promise<{ message: string }> {
    const volume = await this.findOne(id);
    await this.volumesRepository.remove(volume);
    return { message: 'Volume deleted successfully' };
  }
}
