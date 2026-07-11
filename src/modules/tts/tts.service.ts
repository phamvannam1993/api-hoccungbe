import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import * as https from 'https';
import { ConfigService } from '@nestjs/config';
import { CreateTtsDto } from './dto/create-tts.dto';

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

  constructor(private readonly configService: ConfigService) {}

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
