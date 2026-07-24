import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as https from 'https';
import * as path from 'path';

@Injectable()
export class S3UploadService {
  private readonly bucket: string;
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  /** Tiền tố thư mục bắt buộc (khi IAM key chỉ được ghi trong 1 prefix). Rỗng = ghi thẳng gốc bucket. */
  private readonly prefix: string;

  constructor(private readonly configService: ConfigService) {
    // Chấp nhận cả 2 quy ước tên biến: AWS_S3_* (đang dùng trong .env) và AWS_* (chuẩn AWS SDK).
    const env = (...keys: string[]): string => {
      for (const k of keys) {
        const v = this.configService.get<string>(k);
        if (v && v.trim()) return v.trim();
      }
      return '';
    };

    this.bucket = env('AWS_S3_BUCKET', 'AWS_BUCKET');
    this.region = env('AWS_S3_REGION', 'AWS_REGION') || 'ap-southeast-1';
    this.accessKeyId = env('AWS_S3_ACCESS_KEY_ID', 'AWS_ACCESS_KEY_ID');
    this.secretAccessKey = env('AWS_S3_SECRET_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY');
    this.prefix = env('AWS_S3_PREFIX', 'AWS_S3_FOLDER').replace(/^\/+|\/+$/g, '');

    if (!this.bucket || !this.accessKeyId || !this.secretAccessKey) {
      // Báo sớm & rõ ràng thay vì để AWS trả lỗi "AuthorizationHeaderMalformed" khó hiểu.
      const missing = [
        !this.bucket && 'AWS_S3_BUCKET',
        !this.accessKeyId && 'AWS_S3_ACCESS_KEY_ID',
        !this.secretAccessKey && 'AWS_S3_SECRET_ACCESS_KEY',
      ].filter(Boolean);
      console.warn(`[S3UploadService] Thiếu cấu hình S3: ${missing.join(', ')} — upload sẽ thất bại.`);
    }
  }

  /** Ghép key S3, tự thêm prefix bắt buộc (nếu có) để không đụng giới hạn IAM. */
  private buildKey(folder: string, ext: string): string {
    const base = `${folder.replace(/^\/+|\/+$/g, '')}/${crypto.randomUUID()}${ext}`;
    return this.prefix ? `${this.prefix}/${base}` : base;
  }

  async uploadAudio(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    folder = 'quizzes/audio',
  ): Promise<string> {
    const ext = path.extname(file.originalname) || '.mp3';
    const key = this.buildKey(folder, ext);
    const contentType = file.mimetype || 'audio/mpeg';
    await this.putObject(key, file.buffer, contentType);
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async uploadImage(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    folder = 'quizzes/images',
  ): Promise<string> {
    const ext = path.extname(file.originalname) || '.jpg';
    const key = this.buildKey(folder, ext);
    const contentType = file.mimetype || 'image/jpeg';
    await this.putObject(key, file.buffer, contentType);
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async deleteByUrl(url: string): Promise<void> {
    try {
      const urlObj = new URL(url);
      const key = urlObj.pathname.replace(/^\//, '');
      await this.deleteObject(key);
    } catch {
      // ignore
    }
  }

  private putObject(key: string, body: Buffer, contentType: string): Promise<void> {
    const date = new Date();
    const dateStamp = date.toISOString().slice(0, 10).replace(/-/g, '');
    const amzDate = date.toISOString().replace(/[:-]/g, '').replace(/\.\d+/, '');
    const host = `${this.bucket}.s3.${this.region}.amazonaws.com`;

    const bodyHash = crypto.createHash('sha256').update(body).digest('hex');

    const canonicalHeaders =
      `content-type:${contentType}\n` +
      `host:${host}\n` +
      `x-amz-content-sha256:${bodyHash}\n` +
      `x-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = [
      'PUT',
      `/${key}`,
      '',
      canonicalHeaders,
      signedHeaders,
      bodyHash,
    ].join('\n');

    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const signingKey = this.getSigningKey(dateStamp);
    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(stringToSign)
      .digest('hex');

    const authorization =
      `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          method: 'PUT',
          host,
          path: `/${key}`,
          headers: {
            'Content-Type': contentType,
            'Content-Length': body.length,
            'x-amz-content-sha256': bodyHash,
            'x-amz-date': amzDate,
            Authorization: authorization,
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode < 300) {
            resolve();
          } else {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => reject(new Error(`S3 error ${res.statusCode}: ${data}`)));
          }
        },
      );
      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }

  private deleteObject(key: string): Promise<void> {
    const date = new Date();
    const dateStamp = date.toISOString().slice(0, 10).replace(/-/g, '');
    const amzDate = date.toISOString().replace(/[:-]/g, '').replace(/\.\d+/, '');
    const host = `${this.bucket}.s3.${this.region}.amazonaws.com`;
    const bodyHash = crypto.createHash('sha256').update('').digest('hex');

    const canonicalHeaders =
      `host:${host}\n` +
      `x-amz-content-sha256:${bodyHash}\n` +
      `x-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = ['DELETE', `/${key}`, '', canonicalHeaders, signedHeaders, bodyHash].join('\n');

    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const signingKey = this.getSigningKey(dateStamp);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorization =
      `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          method: 'DELETE',
          host,
          path: `/${key}`,
          headers: {
            'x-amz-content-sha256': bodyHash,
            'x-amz-date': amzDate,
            Authorization: authorization,
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode < 300) resolve();
          else reject(new Error(`S3 delete error ${res.statusCode}`));
        },
      );
      req.on('error', reject);
      req.end();
    });
  }

  private getSigningKey(dateStamp: string): Buffer {
    const kDate = crypto.createHmac('sha256', `AWS4${this.secretAccessKey}`).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(this.region).digest();
    const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
    return crypto.createHmac('sha256', kService).update('aws4_request').digest();
  }
}
