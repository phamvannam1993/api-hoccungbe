import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

/** Gửi email qua Resend (https://resend.com) bằng REST API — cần RESEND_API_KEY và EMAIL_FROM. */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  configured() {
    return !!(
      this.config.get<string>('RESEND_API_KEY') &&
      this.config.get<string>('EMAIL_FROM')
    );
  }

  /**
   * Người gửi hiển thị trong hộp thư: "Bé Hay Học <no-reply@…>". EMAIL_FROM chỉ là địa chỉ thì ghép
   * thêm tên từ EMAIL_FROM_NAME (mặc định "Bé Hay Học"); EMAIL_FROM đã có dạng "Tên <email>" thì giữ nguyên.
   */
  private sender(): string | undefined {
    const from = this.config.get<string>('EMAIL_FROM')?.trim();
    if (!from || from.includes('<')) return from;
    const name = (this.config.get<string>('EMAIL_FROM_NAME') || 'Bé Hay Học')
      .replace(/["<>]/g, '')
      .trim();
    return name ? `${name} <${from}>` : from;
  }

  /** Trả true nếu Resend nhận thư. Không ném lỗi — người gọi tự quyết định báo gì. */
  async send(msg: MailMessage): Promise<boolean> {
    const key = this.config.get<string>('RESEND_API_KEY');
    const from = this.sender();
    if (!key || !from) {
      this.logger.error('Chưa cấu hình RESEND_API_KEY / EMAIL_FROM');
      return false;
    }
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [msg.to],
          subject: msg.subject,
          html: msg.html,
          text: msg.text,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        this.logger.error(
          `Resend trả lỗi ${res.status}: ${(await res.text()).slice(0, 300)}`,
        );
        return false;
      }
      return true;
    } catch (err) {
      this.logger.error(`Không gửi được email: ${String(err)}`);
      return false;
    }
  }
}
