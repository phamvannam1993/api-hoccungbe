"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
const https = __importStar(require("https"));
const path = __importStar(require("path"));
let S3UploadService = class S3UploadService {
    constructor(configService) {
        this.configService = configService;
        // Chấp nhận cả 2 quy ước tên biến: AWS_S3_* (đang dùng trong .env) và AWS_* (chuẩn AWS SDK).
        const env = (...keys) => {
            for (const k of keys) {
                const v = this.configService.get(k);
                if (v && v.trim())
                    return v.trim();
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
    buildKey(folder, ext) {
        const base = `${folder.replace(/^\/+|\/+$/g, '')}/${crypto.randomUUID()}${ext}`;
        return this.prefix ? `${this.prefix}/${base}` : base;
    }
    async uploadAudio(file, folder = 'quizzes/audio') {
        const ext = path.extname(file.originalname) || '.mp3';
        const key = this.buildKey(folder, ext);
        const contentType = file.mimetype || 'audio/mpeg';
        await this.putObject(key, file.buffer, contentType);
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }
    async uploadImage(file, folder = 'quizzes/images') {
        const ext = path.extname(file.originalname) || '.jpg';
        const key = this.buildKey(folder, ext);
        const contentType = file.mimetype || 'image/jpeg';
        await this.putObject(key, file.buffer, contentType);
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }
    async deleteByUrl(url) {
        try {
            const urlObj = new URL(url);
            const key = urlObj.pathname.replace(/^\//, '');
            await this.deleteObject(key);
        }
        catch {
            // ignore
        }
    }
    putObject(key, body, contentType) {
        const date = new Date();
        const dateStamp = date.toISOString().slice(0, 10).replace(/-/g, '');
        const amzDate = date.toISOString().replace(/[:-]/g, '').replace(/\.\d+/, '');
        const host = `${this.bucket}.s3.${this.region}.amazonaws.com`;
        const bodyHash = crypto.createHash('sha256').update(body).digest('hex');
        const canonicalHeaders = `content-type:${contentType}\n` +
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
        const authorization = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, ` +
            `SignedHeaders=${signedHeaders}, Signature=${signature}`;
        return new Promise((resolve, reject) => {
            const req = https.request({
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
            }, (res) => {
                if (res.statusCode && res.statusCode < 300) {
                    resolve();
                }
                else {
                    let data = '';
                    res.on('data', (chunk) => (data += chunk));
                    res.on('end', () => reject(new Error(`S3 error ${res.statusCode}: ${data}`)));
                }
            });
            req.on('error', reject);
            req.write(body);
            req.end();
        });
    }
    deleteObject(key) {
        const date = new Date();
        const dateStamp = date.toISOString().slice(0, 10).replace(/-/g, '');
        const amzDate = date.toISOString().replace(/[:-]/g, '').replace(/\.\d+/, '');
        const host = `${this.bucket}.s3.${this.region}.amazonaws.com`;
        const bodyHash = crypto.createHash('sha256').update('').digest('hex');
        const canonicalHeaders = `host:${host}\n` +
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
        const authorization = `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, ` +
            `SignedHeaders=${signedHeaders}, Signature=${signature}`;
        return new Promise((resolve, reject) => {
            const req = https.request({
                method: 'DELETE',
                host,
                path: `/${key}`,
                headers: {
                    'x-amz-content-sha256': bodyHash,
                    'x-amz-date': amzDate,
                    Authorization: authorization,
                },
            }, (res) => {
                if (res.statusCode && res.statusCode < 300)
                    resolve();
                else
                    reject(new Error(`S3 delete error ${res.statusCode}`));
            });
            req.on('error', reject);
            req.end();
        });
    }
    getSigningKey(dateStamp) {
        const kDate = crypto.createHmac('sha256', `AWS4${this.secretAccessKey}`).update(dateStamp).digest();
        const kRegion = crypto.createHmac('sha256', kDate).update(this.region).digest();
        const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
        return crypto.createHmac('sha256', kService).update('aws4_request').digest();
    }
};
exports.S3UploadService = S3UploadService;
exports.S3UploadService = S3UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3UploadService);
