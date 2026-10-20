import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';

const BASE = 'https://api-merchant.payos.vn';

export type PayosLink = {
  checkoutUrl: string;
  qrCode: string;
  paymentLinkId: string;
  accountNumber?: string;
  accountName?: string;
  bin?: string;
};

export type PayosWebhookData = {
  orderCode: number;
  amount: number;
  description: string;
  reference?: string;
  transactionDateTime?: string;
  paymentLinkId?: string;
  code?: string;
  [k: string]: unknown;
};

/**
 * payOS (payos.vn) — tạo link / QR thanh toán cho đơn và xác thực webhook báo tiền về.
 * Cần PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY trong .env; thiếu thì configured() = false
 * và hệ thống dùng chuyển khoản + admin duyệt tay như cũ.
 */
@Injectable()
export class PayosService {
  private readonly logger = new Logger(PayosService.name);

  constructor(private readonly config: ConfigService) {}

  private get keys() {
    return {
      clientId: this.config.get<string>('PAYOS_CLIENT_ID') ?? '',
      apiKey: this.config.get<string>('PAYOS_API_KEY') ?? '',
      checksum: this.config.get<string>('PAYOS_CHECKSUM_KEY') ?? '',
    };
  }

  configured() {
    const k = this.keys;
    return !!(k.clientId && k.apiKey && k.checksum);
  }

  private hmac(data: string) {
    return createHmac('sha256', this.keys.checksum).update(data).digest('hex');
  }

  private headers() {
    const k = this.keys;
    return {
      'Content-Type': 'application/json',
      'x-client-id': k.clientId,
      'x-api-key': k.apiKey,
    };
  }

  /** Tạo link thanh toán. `description` tối đa 9 ký tự (tài khoản không liên kết qua payOS). */
  async createLink(input: {
    orderCode: number;
    amount: number;
    description: string;
    returnUrl: string;
    cancelUrl: string;
    buyerEmail?: string | null;
    buyerName?: string | null;
    itemName: string;
    expiredAt: number;
  }): Promise<PayosLink | null> {
    const { orderCode, amount, description, returnUrl, cancelUrl } = input;
    // Chữ ký: các trường xếp a→z, dạng key=value nối bằng &.
    const signature = this.hmac(
      `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`,
    );
    try {
      const res = await fetch(`${BASE}/v2/payment-requests`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({
          orderCode,
          amount,
          description,
          returnUrl,
          cancelUrl,
          buyerEmail: input.buyerEmail || undefined,
          buyerName: input.buyerName || undefined,
          items: [
            { name: input.itemName.slice(0, 120), quantity: 1, price: amount },
          ],
          expiredAt: input.expiredAt,
          signature,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const body = (await res.json().catch(() => ({}))) as {
        code?: string;
        desc?: string;
        data?: PayosLink;
      };
      if (body.code !== '00' || !body.data?.checkoutUrl) {
        this.logger.error(
          `payOS tạo link lỗi (${res.status}): ${body.code} ${body.desc}`,
        );
        return null;
      }
      return body.data;
    } catch (err) {
      this.logger.error(`payOS tạo link lỗi: ${String(err)}`);
      return null;
    }
  }

  /** Trạng thái link (PENDING / PAID / CANCELLED / EXPIRED…) — dự phòng khi webhook bị lỡ. */
  async getStatus(
    orderCode: number,
  ): Promise<{ status: string; amountPaid: number } | null> {
    try {
      const res = await fetch(`${BASE}/v2/payment-requests/${orderCode}`, {
        headers: this.headers(),
        signal: AbortSignal.timeout(8000),
      });
      const body = (await res.json().catch(() => ({}))) as {
        code?: string;
        data?: { status?: string; amountPaid?: number };
      };
      if (body.code !== '00' || !body.data?.status) return null;
      return {
        status: body.data.status,
        amountPaid: Number(body.data.amountPaid ?? 0),
      };
    } catch {
      return null;
    }
  }

  async cancel(orderCode: number) {
    try {
      await fetch(`${BASE}/v2/payment-requests/${orderCode}/cancel`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({ cancellationReason: 'Đơn đã thay đổi' }),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      /* bỏ qua */
    }
  }

  /** Đăng ký URL webhook với payOS (payOS gửi thử một giao dịch mẫu tới URL đó). */
  async confirmWebhook(webhookUrl: string) {
    const res = await fetch(`${BASE}/confirm-webhook`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ webhookUrl }),
      signal: AbortSignal.timeout(15000),
    });
    const body = (await res.json().catch(() => ({}))) as {
      code?: string;
      desc?: string;
    };
    return {
      ok: res.ok && body.code === '00',
      status: res.status,
      desc: body.desc ?? '',
    };
  }

  /**
   * Xác thực webhook: ký đối tượng `data` — các khóa xếp a→z, null/undefined → chuỗi rỗng,
   * mảng/đối tượng lồng → JSON (khóa bên trong cũng xếp a→z), nối key=value bằng &.
   */
  verifyWebhook(
    data: Record<string, unknown> | undefined,
    signature: string | undefined,
  ) {
    if (!data || !signature || !this.configured()) return false;
    const norm = (v: unknown): unknown => {
      if (Array.isArray(v)) return v.map(norm);
      if (v && typeof v === 'object')
        return Object.fromEntries(
          Object.keys(v)
            .sort()
            .map((k) => [k, norm((v as Record<string, unknown>)[k])]),
        );
      return v;
    };
    const str = Object.keys(data)
      .sort()
      .map((k) => {
        let v: unknown = data[k];
        if (v === null || v === undefined || v === 'null' || v === 'undefined')
          v = '';
        else if (typeof v === 'object') v = JSON.stringify(norm(v));
        return `${k}=${String(v)}`;
      })
      .join('&');
    const expected = Buffer.from(this.hmac(str));
    const got = Buffer.from(String(signature));
    return expected.length === got.length && timingSafeEqual(expected, got);
  }
}
