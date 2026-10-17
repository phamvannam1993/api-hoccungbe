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
  ) {}

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
      return existing;
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
        return await this.orders.save(row);
      } catch (err) {
        if (attempt < 3) continue; // trùng mã (hiếm) → tạo mã khác
        throw err;
      }
    }
  }

  /** Đơn của tài khoản (mới nhất trước). */
  mine(userId: number) {
    return this.orders.find({
      where: { userId },
      order: { id: 'DESC' },
      take: 20,
    });
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
