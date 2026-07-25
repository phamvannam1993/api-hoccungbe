import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as https from 'https';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTtsDto } from './dto/create-tts.dto';
import { TtsCache } from './entities/tts-cache.entity';
import { S3UploadService } from '../../common/services/s3-upload.service';
import { preprocessTTS, toVietnamesePhonics } from './tts-preprocess';

export interface TtsResponse {
  status: string;
  audio_url: string;
  filename: string;
}

interface CacheEntry {
  data: TtsResponse;
  timestamp: number;
}

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_CACHE_SIZE = 500;
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
  private readonly RETRY_ATTEMPTS = 2;
  private readonly RETRY_DELAY = 1000; // 1 second

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TtsCache)
    private readonly ttsCacheRepo: Repository<TtsCache>,
    private readonly s3: S3UploadService,
  ) {}

  /** Cờ tránh chạy 2 job sinh audio cho cùng 1 khóa cùng lúc. */
  private readonly generating = new Set<string>();

  /**
   * Sinh (pre-generate) audio TTS cho TOÀN BỘ câu hỏi của một MÔN HỌC/KHÓA HỌC (theo slug),
   * lưu file lên S3 và ghi vào tts_cache. Chạy nền (không chặn request), trả về ngay số việc.
   */
  async generateForCourse(course: string, limit = 0): Promise<{
    course: string; totalTexts: number; alreadyCached: number; started: boolean;
  }> {
    const slug = (course || '').trim();
    if (!slug) throw new BadRequestException('course (slug khóa học) là bắt buộc');

    const rows: { questionText: string }[] = await this.ttsCacheRepo.manager.query(
      `SELECT DISTINCT q.questionText AS questionText
         FROM quizzes q
         JOIN lessons l ON l.id = q.lessonId
         JOIN courses c ON c.id = l.courseId
        WHERE c.slug = ? AND q.isActive = 1
          AND q.questionText IS NOT NULL AND q.questionText <> ''
        ${limit ? 'LIMIT ' + Number(limit) : ''}`,
      [slug],
    );

    // Áp ĐÚNG pipeline như FE: preprocessTTS → toVietnamesePhonics → chuẩn hóa.
    // (canonicalTts = phần chung với read path, để cacheKey khớp & audio đọc chuẩn "chờ/trờ".)
    const seen = new Set<string>();
    const texts: string[] = [];
    for (const r of rows) {
      const t = this.canonicalTts(preprocessTTS(r.questionText || ''));
      if (t && !seen.has(t)) { seen.add(t); texts.push(t); }
    }

    // Đếm sẵn bao nhiêu đã có cache (để báo cáo nhanh).
    let alreadyCached = 0;
    if (texts.length) {
      const keys = texts.map((t) => this.buildCacheKey(t, 'vi', '+0%', '+0Hz'));
      const [{ c }] = await this.ttsCacheRepo.manager.query(
        `SELECT COUNT(*) c FROM tts_cache WHERE cacheKey IN (${keys.map(() => '?').join(',')})`,
        keys,
      );
      alreadyCached = Number(c);
    }

    if (!this.generating.has(slug)) {
      this.generating.add(slug);
      // Fire-and-forget: chạy nền, không chặn HTTP response.
      this.runGeneration(slug, texts)
        .catch((e) => this.logger.error(`[TTS gen ${slug}] ${e.message}`))
        .finally(() => this.generating.delete(slug));
    }

    return { course: slug, totalTexts: texts.length, alreadyCached, started: true };
  }

  private async runGeneration(slug: string, texts: string[]): Promise<void> {
    const CONCURRENCY = Number(this.configService.get('TTS_GEN_CONCURRENCY') || 5);
    let idx = 0, made = 0, skip = 0, fail = 0;
    const worker = async () => {
      while (idx < texts.length) {
        const text = texts[idx++];
        const cacheKey = this.buildCacheKey(text, 'vi', '+0%', '+0Hz');
        try {
          const exists = await this.ttsCacheRepo.findOne({ where: { cacheKey }, select: ['id'] });
          if (exists) { skip++; continue; }
          const { buf, providerUrl, durationMs, filename } = await this.fetchLocalTts(text);
          const audioUrl = await this.s3.uploadAudio(
            { buffer: buf, originalname: filename, mimetype: 'audio/mpeg' }, 'tts',
          );
          await this.ttsCacheRepo.save(this.ttsCacheRepo.create({
            cacheKey, text, voice: 'vi', rate: '+0%', pitch: '+0Hz',
            audioUrl, providerUrl, filename, mimeType: 'audio/mpeg',
            fileSize: buf.length, durationMs, storage: 's3',
          }));
          made++;
        } catch {
          fail++;
        }
        if ((made + skip + fail) % 50 === 0) {
          this.logger.log(`[TTS gen ${slug}] ${made + skip + fail}/${texts.length} (mới ${made}, bỏ qua ${skip}, lỗi ${fail})`);
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, texts.length) }, worker));
    this.logger.log(`[TTS gen ${slug}] HOÀN TẤT: mới ${made}, bỏ qua ${skip}, lỗi ${fail}`);
  }

  private async fetchLocalTts(text: string): Promise<{ buf: Buffer; providerUrl: string; durationMs: number; filename: string }> {
    const base = this.configService.get<string>('TTS_LOCAL_URL') || 'http://localhost:8000/api/tts';
    const r = await fetch(`${base}?text=${encodeURIComponent(text)}`);
    if (!r.ok) throw new Error(`TTS ${r.status}`);
    const j: any = await r.json();
    const providerUrl: string = j.url || j.audio_url;
    if (!providerUrl) throw new Error('TTS thiếu url');
    const ar = await fetch(providerUrl);
    if (!ar.ok) throw new Error(`tải mp3 ${ar.status}`);
    const buf = Buffer.from(await ar.arrayBuffer());
    return { buf, providerUrl, durationMs: Math.round((j.duration || 0) * 1000), filename: providerUrl.split('/').pop() || 'tts.mp3' };
  }

  /**
   * Pipeline CHUẨN dùng chung cho cả sinh cache lẫn tra cache — khớp 100% với FE
   * (app/api/tts/route.ts: toVietnamesePhonics(removeEmojis(text))). FE gửi text đã
   * qua preprocessTTS, nên ở đây chỉ cần phonics + chuẩn hóa. toVietnamesePhonics chỉ
   * đụng chữ cái, normalizeText chỉ đụng emoji/khoảng trắng → thứ tự không đổi kết quả.
   */
  private canonicalTts(text: string): string {
    return toVietnamesePhonics(this.normalizeText(text));
  }

  /** Chuẩn hóa text GIỐNG batch & read path (bỏ emoji, gộp khoảng trắng) để cacheKey khớp. */
  private normalizeText(text: string): string {
    return (text || '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/[\u{2600}-\u{27BF}]/gu, '')
      .replace(/[\u{2B50}]/gu, '')
      .replace(/[\u{1F000}-\u{1F02F}]/gu, '')
      .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private buildCacheKey(text: string, voice: string, rate: string, pitch: string): string {
    return crypto.createHash('sha256').update(`${voice}|${rate}|${pitch}|${text}`).digest('hex');
  }

  /**
   * Tra bảng tts_cache: nếu đã có audio cho đoạn text (cùng voice) → trả URL S3 để DÙNG LẠI,
   * tránh gọi API TTS lại. Trả null nếu chưa có (caller sẽ dùng luồng cũ).
   */
  async lookupCached(
    rawText: string,
    voice = 'vi',
    rate = '+0%',
    pitch = '+0Hz',
  ): Promise<{ audioUrl: string; durationMs: number | null; mimeType: string } | null> {
    const text = this.canonicalTts(rawText);
    if (!text) return null;
    const cacheKey = this.buildCacheKey(text, voice, rate, pitch);
    const row = await this.ttsCacheRepo.findOne({ where: { cacheKey } });
    if (!row) return null;
    // Đếm lượt dùng lại (fire-and-forget, không chặn response).
    this.ttsCacheRepo
      .update(row.id, { hitCount: () => 'hitCount + 1', lastUsedAt: new Date() } as any)
      .catch(() => undefined);
    return { audioUrl: row.audioUrl, durationMs: row.durationMs ?? null, mimeType: row.mimeType };
  }

  async synthesize(dto: CreateTtsDto): Promise<TtsResponse> {
    const cacheKey = this.generateCacheKey(dto);
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      this.logger.debug(`[TTS] Cache hit for: ${cacheKey}`);
      return cached;
    }

    let lastError: Error | undefined;
    for (let attempt = 0; attempt <= this.RETRY_ATTEMPTS; attempt++) {
      try {
        const result = await this.makeRequest(dto);
        this.setCache(cacheKey, result);
        this.logger.log(`[TTS] Successfully synthesized: ${dto.text.substring(0, 50)}...`);
        return result;
      } catch (error) {
        lastError = error;
        const isRetryable = this.isRetryableError(error);
        this.logger.warn(
          `[TTS] Attempt ${attempt + 1}/${this.RETRY_ATTEMPTS + 1} failed: ${error.message}. Retryable: ${isRetryable}`,
        );

        if (isRetryable && attempt < this.RETRY_ATTEMPTS) {
          await this.delay(this.RETRY_DELAY * Math.pow(2, attempt)); // Exponential backoff
        } else {
          throw error;
        }
      }
    }

    throw lastError ?? new Error('[TTS] Synthesis failed after all retry attempts');
  }

  private isRetryableError(error: any): boolean {
    const message = error.message || '';
    // Retry on timeout or connection errors
    return (
      message.includes('timeout') ||
      message.includes('ECONNREFUSED') ||
      message.includes('ECONNRESET') ||
      message.includes('ETIMEDOUT') ||
      message.includes('EHOSTUNREACH')
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async makeRequest(dto: CreateTtsDto): Promise<TtsResponse> {
    return new Promise((resolve, reject) => {
      const apiUrl = this.configService.get<string>('TTS_API_URL') || 'https://api-v2.behayhoc.com/tts';
      const baseUrl = this.configService.get<string>('TTS_BASE_URL') || 'https://api-v2.behayhoc.com';
      const payload = {
        text: dto.text,
        voice: dto.voice || 'vi-VN-HoaiMyNeural',
        rate: dto.rate || '+0%',
        pitch: dto.pitch || '+0Hz',
      };

      const postData = JSON.stringify(payload);

      const options = {
        hostname: 'api-v2.behayhoc.com',
        port: 443,
        path: '/tts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Origin': 'https://behayhoc.com',
          'Referer': 'https://behayhoc.com/',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              reject(
                new BadRequestException(
                  `TTS API error: ${res.statusCode} - ${res.statusMessage}`,
                ),
              );
              return;
            }

            const response: TtsResponse = JSON.parse(data);
            if (response.status !== 'success') {
              reject(
                new BadRequestException(
                  `TTS API returned error: ${response.status}`,
                ),
              );
              return;
            }

            // Convert relative audio_url to absolute URL
            if (response.audio_url && response.audio_url.startsWith('/')) {
              response.audio_url = baseUrl + response.audio_url;
            }

            resolve(response);
          } catch (error) {
            reject(
              new InternalServerErrorException(
                `Failed to parse TTS response: ${error.message}`,
              ),
            );
          }
        });
      });

      req.on('error', (error) => {
        const errorMsg = `TTS API request failed: ${error.message}`;
        this.logger.error(`[TTS] ${errorMsg}`);
        reject(new InternalServerErrorException(errorMsg));
      });

      req.setTimeout(this.REQUEST_TIMEOUT, () => {
        req.destroy();
        const timeoutMsg = `TTS API request timeout (${this.REQUEST_TIMEOUT / 1000}s) - External service may be slow or unavailable`;
        this.logger.error(`[TTS] ${timeoutMsg}`);
        reject(new InternalServerErrorException(timeoutMsg));
      });

      req.on('socket', (socket) => {
        socket.on('timeout', () => {
          req.destroy();
          const socketTimeoutMsg = 'TTS API socket timeout - Connection lost';
          this.logger.error(`[TTS] ${socketTimeoutMsg}`);
          reject(new InternalServerErrorException(socketTimeoutMsg));
        });
      });

      req.write(postData);
      req.end();
    });
  }

  private generateCacheKey(dto: CreateTtsDto): string {
    return `${dto.text}|${dto.voice}|${dto.rate || '+0%'}|${dto.pitch || '+0Hz'}`;
  }

  private getFromCache(key: string): TtsResponse | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache(key: string, data: TtsResponse): void {
    // Evict oldest entry if cache is full
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }
}
