import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { IqOrder } from './entities/iq-order.entity';
import { IqCodesService, normalizeCode } from './iq-codes.service';
import { CreateOrderDto, ListOrdersQuery } from './dto/iq-orders.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { PayosService, type PayosWebhookData } from './payos.service';

/** Link thanh toán payOS hết hạn sau ngần này giờ (bấm Mua lại thì tạo link mới). */
const PAY_LINK_HOURS = 24;

const nowSec = () => new Date(Math.floor(Date.now() / 1000) * 1000);
const vnd = (n: number) => `${n.toLocaleString('vi-VN')}đ`;
const fmtDay = (d: Date) =>
  d.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Mỗi tài khoản giữ tối đa ngần này đơn chờ duyệt cùng lúc (chống tạo rác). */
const MAX_PENDING = 5;

export type AccountUser = {
  userId: number;
  email?: string | null;
  fullName?: string | null;
};

@Injectable()
export class IqOrdersService {
  private readonly logger = new Logger(IqOrdersService.name);

  constructor(
    @InjectRepository(IqOrder) private readonly orders: Repository<IqOrder>,
    private readonly codes: IqCodesService,
    private readonly mail: MailService,
    private readonly payos: PayosService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Gắn link / QR payOS cho đơn đang chờ (nếu đã cấu hình payOS). Tạo mới khi chưa có, khi giá đổi
   * hoặc link đã hết hạn. payOS lỗi thì giữ đơn như cũ — phụ huynh vẫn chuyển khoản thường được.
   */
  private async ensurePayLink(order: IqOrder): Promise<IqOrder> {
    if (!this.payos.configured() || order.status !== 'pending') return order;
    const site = (
      this.config.get<string>('FRONTEND_URL') || 'https://behayhoc.com'
    ).replace(/\/+$/, '');
    // Link tạo ở môi trường khác (vd chạy thử local trỏ cùng DB → trang về là localhost) thì không dùng lại.
    const fresh =
      order.payosSite === site &&
      order.payosOrderCode &&
      order.payosAmount === order.amount &&
      order.payosExpiresAt &&
      order.payosExpiresAt.getTime() > Date.now() + 5 * 60 * 1000;
    if (fresh) return order;
    if (order.payosOrderCode) await this.payos.cancel(order.payosOrderCode);
    const expires = new Date(Date.now() + PAY_LINK_HOURS * 3600 * 1000);
    for (let attempt = 0; attempt < 3; attempt++) {
      const orderCode = Date.now() * 10 + attempt; // duy nhất, < 2^53
      const link = await this.payos.createLink({
        orderCode,
        amount: order.amount,
        description: order.code, // 6 ký tự = mã kích hoạt (payOS cho tối đa 9)
        returnUrl: `${site}/khoa-hoc-iq?thanh-toan=xong&ma=${order.code}`,
        cancelUrl: `${site}/khoa-hoc-iq?thanh-toan=huy&ma=${order.code}`,
        buyerEmail: order.userEmail,
        buyerName: order.userName,
        itemName: order.title,
        expiredAt: Math.floor(expires.getTime() / 1000),
      });
      if (!link) continue;
      order.payosOrderCode = orderCode;
      order.payosAmount = order.amount;
      order.checkoutUrl = link.checkoutUrl;
      order.qrCode = link.qrCode;
      order.payosExpiresAt = new Date(
        Math.floor(expires.getTime() / 1000) * 1000,
      );
      order.payosSite = site;
      return this.orders.save(order);
    }
    return order;
  }

  /** Ghi nhận đã trả tiền rồi duyệt đơn (mở khóa + email). Gọi nhiều lần vẫn chỉ duyệt một lần. */
  private async markPaid(order: IqOrder, reference: string | null, by: string) {
    if (order.status !== 'pending') return;
    await this.orders.update(
      { id: order.id },
      { paidAt: nowSec(), payRef: reference?.slice(0, 64) ?? null },
    );
    try {
      await this.approve(
        order.id,
        by,
        `Tự duyệt: đã nhận tiền qua payOS${reference ? ` (${reference})` : ''}`,
      );
      this.logger.log(`payOS: đã tự duyệt đơn ${order.code}`);
    } catch (err) {
      // Đơn đã được duyệt ở nơi khác cùng lúc → bỏ qua.
      this.logger.warn(
        `payOS: không duyệt được đơn ${order.code}: ${String(err)}`,
      );
    }
  }

  /** Webhook payOS báo tiền về. Trả true nếu chữ ký hợp lệ. */
  async handlePayosWebhook(body: {
    code?: string;
    success?: boolean;
    data?: PayosWebhookData;
    signature?: string;
  }) {
    const data = body.data;
    if (
      !this.payos.verifyWebhook(
        data as Record<string, unknown> | undefined,
        body.signature,
      )
    ) {
      this.logger.warn('payOS webhook: sai chữ ký — bỏ qua');
      return false;
    }
    if (!data || body.code !== '00') return true;
    const order = await this.orders.findOne({
      where: { payosOrderCode: Number(data.orderCode) },
    });
    if (!order) return true; // giao dịch thử của payOS (confirm-webhook) hoặc đơn không thuộc hệ thống
    if (Number(data.amount) < order.amount) {
      this.logger.warn(
        `payOS: đơn ${order.code} nhận ${data.amount}đ < ${order.amount}đ — chờ admin xử lý`,
      );
      await this.orders.update(
        { id: order.id },
        { adminNote: `Chuyển thiếu: nhận ${data.amount}đ / ${order.amount}đ` },
      );
      return true;
    }
    await this.markPaid(order, data.reference ?? null, 'payOS');
    return true;
  }

  /** Dự phòng webhook bị lỡ: hỏi payOS trạng thái các đơn đang chờ của tài khoản. */
  private async syncPending(orders: IqOrder[]) {
    if (!this.payos.configured()) return false;
    let changed = false;
    const recent = orders.filter(
      (o) =>
        o.status === 'pending' &&
        o.payosOrderCode &&
        o.createdAt.getTime() > Date.now() - 3 * 24 * 3600 * 1000,
    );
    for (const o of recent.slice(0, 3)) {
      const st = await this.payos.getStatus(o.payosOrderCode!);
      if (st?.status === 'PAID' && st.amountPaid >= o.amount) {
        await this.markPaid(o, null, 'payOS');
        changed = true;
      }
    }
    return changed;
  }

  async confirmPayosWebhook() {
    if (!this.payos.configured())
      throw new BadRequestException(
        'Chưa cấu hình PAYOS_CLIENT_ID / PAYOS_API_KEY / PAYOS_CHECKSUM_KEY',
      );
    const api = (
      this.config.get<string>('API_PUBLIC_URL') || 'https://api.behayhoc.com'
    ).replace(/\/+$/, '');
    const url = `${api}/api/iq-orders/payos-webhook`;
    return { url, ...(await this.payos.confirmWebhook(url)) };
  }

  payosConfigured() {
    return this.payos.configured();
  }

  /** Tạo đơn chờ duyệt; đã có đơn chờ cùng gói thì trả lại đơn đó (bấm Mua nhiều lần không sinh rác). */
  async create(user: AccountUser, dto: CreateOrderDto) {
    const existing = await this.orders.findOne({
      where: { userId: user.userId, prefix: dto.prefix, status: 'pending' },
      order: { id: 'DESC' },
    });
    if (existing) {
      // Bảng giá đổi thì cập nhật số tiền của đơn đang chờ.
      if (existing.amount !== dto.amount || existing.title !== dto.title) {
        existing.amount = dto.amount;
        existing.title = dto.title;
        await this.orders.save(existing);
      }
      return this.ensurePayLink(existing);
    }
    const pending = await this.orders.count({
      where: { userId: user.userId, status: 'pending' },
    });
    if (pending >= MAX_PENDING)
      throw new BadRequestException(
        'Bố mẹ đang có nhiều đơn chờ duyệt. Vui lòng chờ admin duyệt hoặc liên hệ hỗ trợ nhé.',
      );
    for (let attempt = 0; ; attempt++) {
      const row = this.orders.create({
        code: await this.codes.newCode(),
        userId: user.userId,
        userEmail: user.email ?? null,
        userName: user.fullName ?? null,
        prefix: dto.prefix,
        title: dto.title,
        amount: dto.amount,
        status: 'pending',
        createdAt: nowSec(),
      });
      try {
        return this.ensurePayLink(await this.orders.save(row));
      } catch (err) {
        if (attempt < 3) continue; // trùng mã (hiếm) → tạo mã khác
        throw err;
      }
    }
  }

  /** Đơn của tài khoản (mới nhất trước). Đơn đang chờ có link payOS → hỏi payOS xem đã trả tiền chưa. */
  async mine(userId: number) {
    const find = () =>
      this.orders.find({ where: { userId }, order: { id: 'DESC' }, take: 20 });
    const list = await find();
    return (await this.syncPending(list)) ? find() : list;
  }

  /** Phụ huynh hủy đơn chờ của mình. */
  async cancel(userId: number, code: string) {
    const res = await this.orders.update(
      { code: normalizeCode(code), userId, status: 'pending' },
      { status: 'cancelled', reviewedAt: nowSec() },
    );
    if (!res.affected)
      throw new NotFoundException('Không tìm thấy đơn chờ duyệt');
    return { ok: true };
  }

  async list(query: ListOrdersQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const qb = this.orders.createQueryBuilder('o');
    if (query.status)
      qb.andWhere('o.status = :status', { status: query.status });
    if (query.q?.trim()) {
      // Dán nội dung chuyển khoản ("L2K01 ABCDE FGHJK", "L2K01ABCDE…") cũng tìm được.
      const raw = query.q.trim();
      const like = `%${raw}%`;
      const compact = `%${normalizeCode(raw).replace(/-/g, '')}%`;
      qb.andWhere(
        new Brackets((w) =>
          w
            .where('o.code LIKE :like', { like })
            .orWhere("REPLACE(o.code, '-', '') LIKE :compact", { compact })
            .orWhere('o.userEmail LIKE :like', { like })
            .orWhere('o.userName LIKE :like', { like })
            .orWhere('o.prefix LIKE :like', { like }),
        ),
      );
    }
    qb.orderBy(
      "CASE WHEN o.status = 'pending' THEN 0 ELSE 1 END",
      'ASC',
    ).addOrderBy('o.id', 'DESC');
    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    const pending = await this.orders.count({ where: { status: 'pending' } });
    return { items, total, page, limit, pending };
  }

  /**
   * Admin duyệt: đổi trạng thái có điều kiện (chỉ đơn đang chờ) → hai admin bấm cùng lúc chỉ duyệt
   * một lần; rồi mở gói 1 tháng cho tài khoản và gửi email báo phụ huynh.
   */
  async approve(id: number, admin: string | null, note?: string) {
    const now = nowSec();
    const claimed = await this.orders.update(
      { id, status: 'pending' },
      {
        status: 'approved',
        reviewedBy: admin,
        reviewedAt: now,
        adminNote: note?.trim() || null,
      },
    );
    const order = await this.orders.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Không tìm thấy đơn');
    if (!claimed.affected)
      throw new BadRequestException('Đơn này đã được xử lý rồi');
    try {
      const issued = await this.codes.issueToAccount(
        order.code,
        order.userId,
        order.userEmail,
        order.prefix,
        `Đơn mua · ${vnd(order.amount)}`,
        admin,
      );
      order.expiresAt = issued.expiresAt;
      await this.orders.save(order);
      void this.notifyApproved(order);
      return order;
    } catch (err) {
      // Mở gói lỗi → trả đơn về chờ để admin duyệt lại.
      await this.orders.update(
        { id },
        { status: 'pending', reviewedBy: null, reviewedAt: null },
      );
      throw err;
    }
  }

  async reject(id: number, admin: string | null, note?: string) {
    const res = await this.orders.update(
      { id, status: 'pending' },
      {
        status: 'rejected',
        reviewedBy: admin,
        reviewedAt: nowSec(),
        adminNote: note?.trim() || null,
      },
    );
    if (!res.affected)
      throw new BadRequestException('Đơn này đã được xử lý rồi');
    return this.orders.findOne({ where: { id } });
  }

  private async notifyApproved(order: IqOrder) {
    if (!order.userEmail || !this.mail.configured() || !order.expiresAt) return;
    const name = escapeHtml(order.userName || 'bố mẹ');
    const title = escapeHtml(order.title);
    const until = fmtDay(order.expiresAt);
    const ok = await this.mail.send({
      to: order.userEmail,
      subject: `Đã mở khóa: ${order.title}`,
      text: `Xin chào ${order.userName || 'bố mẹ'},\n\nMã ${order.code} (${order.title}, ${vnd(order.amount)}) đã được duyệt. Bé học được đến hết ngày ${until}.\nĐăng nhập Bé Hay Học và vào mục Toán IQ để học ngay.\n\nBé Hay Học`,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1e293b">
  <h2 style="color:#0284c7;margin:0 0 16px">Đã mở khóa khóa học 🎉</h2>
  <p>Xin chào ${name},</p>
  <p>Mã kích hoạt <b>${order.code}</b> — <b>${title}</b> (${vnd(order.amount)}) đã được duyệt và kích hoạt cho tài khoản của bố mẹ.</p>
  <p>Bé học được đến hết ngày <b>${until}</b>. Bố mẹ đăng nhập Bé Hay Học và vào mục <b>Toán IQ</b> để bé học ngay nhé.</p>
  <p style="margin-top:28px">Bé Hay Học</p>
</div>`,
    });
    if (!ok)
      this.logger.warn(`Không gửi được email báo duyệt đơn ${order.code}`);
  }
}
