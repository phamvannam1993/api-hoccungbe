import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async findAll(folder?: string, search?: string, page = 1, limit = 40) {
    const where: Record<string, unknown> = {};
    if (folder) where.folder = folder;
    if (search) where.originalName = Like(`%${search}%`);

    const [items, total] = await this.mediaRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async create(dto: {
    url: string;
    originalName?: string;
    folder?: string;
    mimeType?: string;
    size?: number;
  }): Promise<Media> {
    const media = this.mediaRepo.create({
      url: dto.url,
      originalName: dto.originalName,
      folder: dto.folder ?? '',
      mimeType: dto.mimeType,
      size: dto.size,
    });
    return this.mediaRepo.save(media);
  }

  async delete(id: number): Promise<void> {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) throw new NotFoundException('Media not found');
    await this.mediaRepo.remove(media);
  }
}
