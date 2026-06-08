import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
  ) {}

  async create(dto: CreateDocumentDto) {
    const slug = dto.slug || this.generateSlug(dto.title);
    const entity = this.documentsRepository.create({
      ...dto,
      slug,
    });
    return this.documentsRepository.save(entity);
  }

  async findAll(page = 1, limit = 20, search?: string, categoryId?: number) {
    const qb = this.documentsRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.category', 'category')
      .where('d.isActive = :isActive', { isActive: true });

    if (search) qb.andWhere('d.title LIKE :search', { search: `%${search}%` });

    if (categoryId) qb.andWhere('d.categoryId = :categoryId', { categoryId });

    qb.orderBy('d.sortOrder', 'ASC').addOrderBy('d.createdAt', 'DESC');

    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const doc = await this.documentsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async findBySlug(slug: string) {
    const doc = await this.documentsRepository.findOne({
      where: { slug, isActive: true },
      relations: ['category'],
    });
    if (!doc) throw new NotFoundException('Document not found');
    await this.documentsRepository.increment({ id: doc.id }, 'viewCount', 1);
    return doc;
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const doc = await this.findOne(id);
    if (dto.title && !dto.slug) {
      dto.slug = this.generateSlug(dto.title);
    }
    Object.assign(doc, dto);
    await this.documentsRepository.save(doc);
    // Reload with relationships
    return this.documentsRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.category', 'category')
      .where('d.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    await this.documentsRepository.remove(doc);
    return { message: 'Document deleted successfully' };
  }

  async adminList(page = 1, limit = 20, search?: string) {
    const qb = this.documentsRepository.createQueryBuilder('d');

    if (search) qb.where('d.title LIKE :search', { search: `%${search}%` });

    qb.orderBy('d.sortOrder', 'ASC').addOrderBy('d.createdAt', 'DESC');

    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
