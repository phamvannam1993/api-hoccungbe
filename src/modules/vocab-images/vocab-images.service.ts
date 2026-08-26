import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VocabImage } from './entities/vocab-image.entity';

@Injectable()
export class VocabImagesService {
  constructor(
    @InjectRepository(VocabImage)
    private readonly repo: Repository<VocabImage>,
  ) {}

  /** Trả về map { wordId: imageUrl } cho frontend merge nhanh. */
  async getMap(): Promise<Record<string, string>> {
    const rows = await this.repo.find();
    const map: Record<string, string> = {};
    for (const row of rows) map[row.wordId] = row.imageUrl;
    return map;
  }

  /** Tạo/cập nhật ảnh cho một từ. */
  async upsert(wordId: string, imageUrl: string): Promise<VocabImage> {
    const existing = await this.repo.findOne({ where: { wordId } });
    if (existing) {
      existing.imageUrl = imageUrl;
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create({ wordId, imageUrl }));
  }

  /** Gỡ ảnh của một từ → về lại emoji mặc định. */
  async remove(wordId: string): Promise<{ removed: boolean }> {
    const res = await this.repo.delete({ wordId });
    return { removed: (res.affected ?? 0) > 0 };
  }
}
