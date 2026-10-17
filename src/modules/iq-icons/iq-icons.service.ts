import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IqIcon } from './entities/iq-icon.entity';
import { S3UploadService } from '../../common/services/s3-upload.service';

@Injectable()
export class IqIconsService {
  constructor(
    @InjectRepository(IqIcon)
    private readonly repo: Repository<IqIcon>,
    private readonly s3: S3UploadService,
  ) {}

  /** Map { iconKey: imageUrl } cho frontend thay ảnh nhanh. */
  async getMap(): Promise<Record<string, string>> {
    const rows = await this.repo.find();
    const map: Record<string, string> = {};
    for (const row of rows) map[row.iconKey] = row.imageUrl;
    return map;
  }

  /** Upload ảnh lên S3 rồi gán cho icon; ảnh cũ (nếu có) bị xóa khỏi S3. */
  async upload(
    iconKey: string,
    file: { buffer: Buffer; originalname: string; mimetype: string },
  ): Promise<IqIcon> {
    const imageUrl = await this.s3.uploadImage(file, 'iq-icons');
    const existing = await this.repo.findOne({ where: { iconKey } });
    if (existing) {
      const oldUrl = existing.imageUrl;
      existing.imageUrl = imageUrl;
      const saved = await this.repo.save(existing);
      if (oldUrl && oldUrl !== imageUrl) await this.s3.deleteByUrl(oldUrl);
      return saved;
    }
    return this.repo.save(this.repo.create({ iconKey, imageUrl }));
  }

  /** Gỡ ảnh đã upload → frontend về ảnh mặc định. */
  async remove(iconKey: string): Promise<{ removed: boolean }> {
    const existing = await this.repo.findOne({ where: { iconKey } });
    if (!existing) return { removed: false };
    await this.repo.delete({ iconKey });
    await this.s3.deleteByUrl(existing.imageUrl);
    return { removed: true };
  }
}
