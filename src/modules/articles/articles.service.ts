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

  async findPublished(category?: string, page = 1, limit = 10, sortBy?: string, sortOrder?: 'asc' | 'desc') {
    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;

    const order: Record<string, 'ASC' | 'DESC'> = {};
    if (sortBy === 'createdAt') {
      order.createdAt = sortOrder === 'asc' ? 'ASC' : 'DESC';
    } else if (sortBy === 'publishedAt') {
      order.publishedAt = sortOrder === 'asc' ? 'ASC' : 'DESC';
    } else {
      order.publishedAt = 'DESC';
      order.createdAt = 'DESC';
    }

    const [data, total] = await this.articleRepo.findAndCount({
      where,
      order,
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

  async generate(topic: string, category: string) {
    const slug = topic
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const excerpt = `${topic} — hướng dẫn chi tiết dành cho phụ huynh giúp bé học hiệu quả hơn tại nhà.`;

    const content = `
<h2>Giới thiệu</h2>
<p>${topic} là một trong những chủ đề được nhiều phụ huynh quan tâm. Bài viết này sẽ chia sẻ những phương pháp thực tế, dễ áp dụng tại nhà để giúp bé tiến bộ nhanh chóng.</p>

<h2>Tại sao chủ đề này quan trọng?</h2>
<p>Giai đoạn tiểu học là nền tảng quan trọng cho việc học suốt đời của trẻ. Khi cha mẹ đồng hành đúng cách, bé không chỉ nắm vững kiến thức mà còn xây dựng được thói quen học tập tốt và tình yêu với việc khám phá.</p>
<p>Theo nhiều nghiên cứu giáo dục, trẻ em học tốt nhất khi được học trong môi trường vui vẻ, không áp lực và có sự khuyến khích từ gia đình.</p>

<h2>Phương pháp hiệu quả</h2>
<ul>
  <li><strong>Học qua trò chơi:</strong> Kết hợp nội dung học vào các trò chơi nhỏ giúp bé tiếp thu tự nhiên mà không cảm thấy nhàm chán.</li>
  <li><strong>Ôn luyện ngắn mỗi ngày:</strong> 15–20 phút luyện tập mỗi ngày hiệu quả hơn nhiều so với học dồn một buổi dài.</li>
  <li><strong>Khen ngợi kịp thời:</strong> Mỗi khi bé làm đúng, hãy khen ngợi cụ thể để tạo động lực.</li>
  <li><strong>Sử dụng đồ vật thực tế:</strong> Dùng các vật dụng quen thuộc trong nhà để minh họa bài học giúp bé hiểu sâu hơn.</li>
  <li><strong>Tạo thói quen cố định:</strong> Học vào cùng một khung giờ mỗi ngày giúp bé dần hình thành thói quen tự giác.</li>
</ul>

<h2>Lỗi thường gặp cần tránh</h2>
<p>Nhiều phụ huynh vô tình tạo áp lực cho con khi so sánh bé với bạn bè cùng lứa. Hãy nhớ rằng mỗi trẻ có tốc độ phát triển khác nhau — điều quan trọng là bé tiến bộ so với chính mình.</p>
<ul>
  <li>Không ép bé học khi đang mệt hoặc đói</li>
  <li>Tránh la mắng khi bé mắc lỗi — hãy kiên nhẫn hướng dẫn lại</li>
  <li>Không học quá dài trong một lần — hãy nghỉ giải lao 5 phút sau mỗi 20 phút</li>
</ul>

<h2>Gợi ý hoạt động tại nhà</h2>
<p>Dưới đây là một số hoạt động vui nhộn bạn có thể thực hiện cùng bé:</p>
<ul>
  <li>Cùng bé đọc sách trước khi ngủ và thảo luận về nội dung</li>
  <li>Tạo thẻ flashcard đầy màu sắc để ôn bài</li>
  <li>Chơi trò đố vui liên quan đến bài học</li>
  <li>Xem video học tập ngắn trên các nền tảng giáo dục uy tín</li>
  <li>Kể chuyện có liên quan đến nội dung bài học</li>
</ul>

<h2>Kết luận</h2>
<p>Việc học tập của trẻ là hành trình dài cần sự kiên nhẫn và đồng hành của cha mẹ. Hãy bắt đầu từ những bước nhỏ, tạo môi trường học vui vẻ và đừng quên rằng thời gian bạn dành cho con chính là món quà quý giá nhất. Chúc bé học tốt và mau tiến bộ!</p>
<p><em>Bé Hay Học — nền tảng học tập tương tác dành cho bé từ 3–10 tuổi với hàng trăm bài học và trò chơi giáo dục.</em></p>
    `.trim();

    const article = this.articleRepo.create({
      title: topic,
      slug,
      excerpt,
      content,
      category,
      tags: ['giáo dục', 'tiểu học', 'phụ huynh'],
      authorName: 'Bé Hay Học',
      isPublished: true,
      publishedAt: new Date(),
    });
    return this.articleRepo.save(article);
  }

  async togglePublish(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    article.isPublished = !article.isPublished;
    article.publishedAt = article.isPublished ? new Date() : undefined;
    return this.articleRepo.save(article);
  }
}
