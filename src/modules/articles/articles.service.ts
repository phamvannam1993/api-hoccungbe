import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as https from 'https';
import * as http from 'http';
import * as path from 'path';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { S3UploadService } from '../../common/services/s3-upload.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    private readonly s3: S3UploadService,
  ) {}

  // ─── Rehost external images in HTML content ─────────────────────────────────

  private downloadUrl(url: string): Promise<{ buffer: Buffer; contentType: string; ext: string }> {
    return new Promise((resolve, reject) => {
      const get = url.startsWith('https') ? https.get : http.get;
      const req = get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // follow one redirect
          return resolve(this.downloadUrl(res.headers.location));
        }
        if (!res.statusCode || res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = res.headers['content-type'] || 'image/jpeg';
          const extMap: Record<string, string> = {
            'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif',
            'image/webp': '.webp', 'image/svg+xml': '.svg',
          };
          const ext = extMap[contentType.split(';')[0].trim()]
            || path.extname(new URL(url).pathname) || '.jpg';
          resolve({ buffer, contentType: contentType.split(';')[0].trim(), ext });
        });
        res.on('error', reject);
      });
      req.on('error', reject);
      req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
    });
  }

  private async rehostImages(html: string, ownDomain: string): Promise<string> {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const matches: { full: string; src: string }[] = [];
    let m: RegExpExecArray | null;
    while ((m = imgRegex.exec(html)) !== null) {
      matches.push({ full: m[0], src: m[1] });
    }

    for (const { src } of matches) {
      // skip already-hosted, data URIs, relative paths
      if (
        src.startsWith('data:') ||
        src.startsWith('/') ||
        src.includes(ownDomain) ||
        src.includes('amazonaws.com')
      ) continue;

      try {
        const { buffer, contentType, ext } = await this.downloadUrl(src);
        const s3Url = await this.s3.uploadImage(
          { buffer, originalname: `article${ext}`, mimetype: contentType },
          'articles/images',
        );
        html = html.replaceAll(src, s3Url);
      } catch (err) {
        console.warn(`[ArticlesService] Failed to rehost image ${src}:`, err);
      }
    }
    return html;
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  async findPublished(category?: string, page = 1, limit = 10) {
    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;
    const [data, total] = await this.articleRepo.findAndCount({
      where,
      order: { publishedAt: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  findAll() {
    return this.articleRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findBySlug(slug: string) {
    let article: Article | null = null;
    if (/^\d+$/.test(slug)) {
      article = await this.articleRepo.findOne({ where: { id: Number(slug) } });
    } else {
      article = await this.articleRepo.findOne({ where: { slug, isPublished: true } });
    }
    if (!article) throw new NotFoundException('Article not found');
    await this.articleRepo.update(article.id, { viewCount: article.viewCount + 1 });
    article.viewCount += 1;
    return article;
  }

  async findById(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async findRelated(category: string | undefined, excludeSlug: string, limit = 3) {
    const qb = this.articleRepo.createQueryBuilder('a')
      .where('a.isPublished = true')
      .andWhere('a.slug != :slug', { slug: excludeSlug })
      .orderBy('a.publishedAt', 'DESC')
      .take(limit);
    if (category) qb.andWhere('a.category = :category', { category });
    return qb.getMany();
  }

  async create(dto: CreateArticleDto) {
    const content = dto.content
      ? await this.rehostImages(dto.content, 'amazonaws.com')
      : dto.content;
    const article = this.articleRepo.create({ ...dto, content });
    return this.articleRepo.save(article);
  }

  async update(id: number, dto: UpdateArticleDto) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    if (dto.content) {
      dto.content = await this.rehostImages(dto.content, 'amazonaws.com');
    }
    Object.assign(article, dto);
    return this.articleRepo.save(article);
  }

  async remove(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    return this.articleRepo.remove(article);
  }

  async togglePublish(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    article.isPublished = !article.isPublished;
    article.publishedAt = article.isPublished ? new Date() : undefined;
    return this.articleRepo.save(article);
  }
}
