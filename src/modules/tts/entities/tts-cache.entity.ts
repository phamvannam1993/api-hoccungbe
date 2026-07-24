import { Column, Entity, Index } from 'typeorm';
import { BaseEntityCommon } from '../../../common/entities/base.entity';

/**
 * Cache giọng đọc (TTS) đã tổng hợp, lưu file trên S3 để DÙNG LẠI —
 * tránh gọi API TTS lặp lại cho cùng một đoạn văn bản.
 * cacheKey = sha256(`${voice}|${rate}|${pitch}|${text}`).
 */
@Entity('tts_cache')
export class TtsCache extends BaseEntityCommon {
  @Index({ unique: true })
  @Column({ type: 'char', length: 64 })
  cacheKey: string;

  @Column({ type: 'text' })
  text: string;

  @Index()
  @Column({ length: 64, default: 'vi' })
  voice: string;

  @Column({ length: 8, default: '+0%' })
  rate: string;

  @Column({ length: 8, default: '+0Hz' })
  pitch: string;

  /** URL audio dùng lại (trên S3 của mình). */
  @Column({ length: 512 })
  audioUrl: string;

  /** URL gốc từ provider TTS (tham chiếu / fallback). */
  @Column({ length: 512, nullable: true })
  providerUrl: string;

  @Column({ length: 255, nullable: true })
  filename: string;

  @Column({ length: 64, default: 'audio/mpeg' })
  mimeType: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fileSize: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  durationMs: number;

  /** 's3' | 'provider' */
  @Column({ length: 16, default: 's3' })
  storage: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  hitCount: number;

  @Index()
  @Column({ type: 'datetime', nullable: true })
  lastUsedAt: Date;
}
