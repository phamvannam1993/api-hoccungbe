import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_CACHE_SIZE = 500;
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds

  constructor(private readonly configService: ConfigService) {}

  async synthesize(dto: CreateTtsDto): Promise<TtsResponse> {
    const cacheKey = this.generateCacheKey(dto);
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    const result = await this.makeRequest(dto);
    this.setCache(cacheKey, result);
    return result;
  }

  private async makeRequest(dto: CreateTtsDto): Promise<TtsResponse> {
    return new Promise((resolve, reject) => {
      const apiUrl = 'https://api-v2.behayhoc.com/tts';
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
              response.audio_url = 'https://api-v2.behayhoc.com' + response.audio_url;
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
        reject(
          new InternalServerErrorException(
            `TTS API request failed: ${error.message}`,
          ),
        );
      });

      req.setTimeout(this.REQUEST_TIMEOUT, () => {
        req.destroy();
        reject(
          new InternalServerErrorException(
            'TTS API request timeout (30s)',
          ),
        );
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
