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

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET', '');
    this.region = this.configService.get<string>('AWS_REGION', 'ap-southeast-1');
    this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID', '');
    this.secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY', '');
  }

  async uploadAudio(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    folder = 'quizzes/audio',
  ): Promise<string> {
    const ext = path.extname(file.originalname) || '.mp3';
    const key = `${folder}/${crypto.randomUUID()}${ext}`;
    const contentType = file.mimetype || 'audio/mpeg';
    await this.putObject(key, file.buffer, contentType);
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async uploadImage(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    folder = 'quizzes/images',
  ): Promise<string> {
    const ext = path.extname(file.originalname) || '.jpg';
    const key = `${folder}/${crypto.randomUUID()}${ext}`;
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
