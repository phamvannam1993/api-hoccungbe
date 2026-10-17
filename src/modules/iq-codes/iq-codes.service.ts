import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { IqActivationCode } from './entities/iq-activation-code.entity';
import { IqEntitlement } from './entities/iq-entitlement.entity';
import { IqOrder } from './entities/iq-order.entity';
import {
  GenerateCodesDto,
  ListCodesQuery,
  UpdateCodeDto,
} from './dto/iq-codes.dto';

/** Bỏ các ký tự dễ nhầm (0/O, 1/I/L) để phụ huynh gõ tay / chép nội dung chuyển khoản không sai. */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
/** Mã kích hoạt: 6 ký tự, có cả chữ và số (31^6 ≈ 887 triệu khả năng), vd 'K7M3QX'. */
const CODE_LEN = 6;

function simpleCode() {
  for (;;) {
    let s = '';
    for (let i = 0; i < CODE_LEN; i++)
      s += ALPHABET[randomInt(ALPHABET.length)];
    if (/[A-Z]/.test(s) && /\d/.test(s)) return s;
  }
}

/**
 * Chuẩn hóa mã người dùng gõ / dán: in hoa, dấu cách / gạch dài → gạch nối.
 * Mã ngắn kiểu mới (6 ký tự) bỏ hết dấu ngăn ("k7m 3qx" → "K7M3QX"); mã cũ dạng
 * "L2K01-ABCDE-FGHJK" giữ gạch nối.
 */
export function normalizeCode(input: string) {
  const n = input
    .trim()
    .toUpperCase()
    .replace(/[\s_–—.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const compact = n.replace(/-/g, '');
  return compact.length <= 8 ? compact : n;
}

/** Mỗi mã kích hoạt = quyền học gói đó trong ngần này tháng. */
export const IQ_ACCESS_MONTHS = 1;

function addMonths(d: Date, months: number) {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r;
}

/** Gói còn hạn của một tài khoản: prefix → hạn cuối (ISO). */
export type AccessItem = { prefix: string; expiresAt: string };

export type RedeemResult =
  | {
      ok: true;
      prefix: string;
      expiresAt: string;
      /** Mã này tài khoản đã nhập từ trước (không cộng thêm hạn). */
      already: boolean;
      access: AccessItem[];
    }
  | { ok: false; reason: 'not_found' | 'revoked' | 'used_up' | 'pending' };

@Injectable()
export class IqCodesService {
  constructor(
    @InjectRepository(IqActivationCode)
    private readonly repo: Repository<IqActivationCode>,
    @InjectRepository(IqEntitlement)
    private readonly grants: Repository<IqEntitlement>,
    @InjectRepository(IqOrder)
    private readonly orders: Repository<IqOrder>,
  ) {}

  /**
   * `n` mã mới chưa từng dùng: không trùng nhau, không trùng mã kích hoạt nào và không trùng mã của
   * đơn mua nào (cột code ở cả hai bảng đều UNIQUE, nên lỡ hai lần tạo cùng lúc thì insert báo lỗi).
   */
  async freeCodes(n: number): Promise<string[]> {
    const out = new Set<string>();
    while (out.size < n) {
      const batch = new Set<string>();
      while (batch.size < n - out.size) {
        const c = simpleCode();
        if (!out.has(c)) batch.add(c);
      }
      const list = [...batch];
      const [used, ordered] = await Promise.all([
        this.repo.find({ select: { code: true }, where: { code: In(list) } }),
        this.orders.find({ select: { code: true }, where: { code: In(list) } }),
      ]);
      const taken = new Set([...used, ...ordered].map((r) => r.code));
      for (const c of list) if (!taken.has(c)) out.add(c);
    }
    return [...out];
  }

  /** Tạo hàng loạt mã 6 ký tự (vd 'K7M3QX') cho một gói. Mỗi mã dùng cho 1 tài khoản. */
  async generate(dto: GenerateCodesDto, createdBy: string | null) {
    const rows: IqActivationCode[] = [];
    for (const code of await this.freeCodes(dto.count)) {
      rows.push(
        this.repo.create({
          code,
          prefix: dto.prefix,
          note: dto.note?.trim() || null,
          maxUses: 1,
          useCount: 0,
          status: 'active',
          createdBy,
        }),
      );
    }
    await this.repo.insert(rows);
    return rows.map((r) => r.code);
  }

  async list(query: ListCodesQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const qb = this.repo.createQueryBuilder('c');
    if (query.prefix)
      qb.andWhere('c.prefix = :prefix', { prefix: query.prefix });
    if (query.status === 'revoked') qb.andWhere("c.status = 'revoked'");
    if (query.status === 'active')
      qb.andWhere("c.status = 'active' AND c.redeemedBy IS NULL");
    if (query.status === 'used')
      qb.andWhere("c.status = 'active' AND c.redeemedBy IS NOT NULL");
    if (query.q?.trim()) {
      const like = `%${query.q.trim()}%`;
      qb.andWhere(
        new Brackets((w) =>
          w
            .where('c.code LIKE :like', { like })
            .orWhere('c.note LIKE :like', { like })
            .orWhere('c.redeemedEmail LIKE :like', { like }),
        ),
      );
    }
    qb.orderBy('c.createdAt', 'DESC').addOrderBy('c.code', 'ASC');
    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    // Kèm thời hạn học của từng mã đã kích hoạt.
    const grants = items.length
      ? await this.grants.find({
          where: { code: In(items.map((i) => i.code)) },
        })
      : [];
    const byCode = new Map(grants.map((g) => [g.code, g]));
    return {
      items: items.map((i) => ({
        ...i,
        startsAt: byCode.get(i.code)?.startsAt ?? null,
        expiresAt: byCode.get(i.code)?.expiresAt ?? null,
      })),
      total,
      page,
      limit,
    };
  }

  async update(code: string, dto: UpdateCodeDto) {
    const row = await this.repo.findOne({
      where: { code: normalizeCode(code) },
    });
    if (!row) throw new NotFoundException('Không tìm thấy mã');
    const before = row.status;
    if (dto.status) row.status = dto.status;
    if (dto.note !== undefined) row.note = dto.note.trim() || null;
    const saved = await this.repo.save(row);
    // Thu hồi mã đã kích hoạt → tài khoản mất lượt học của mã đó; mở lại → cấp lại lượt mới.
    if (before !== row.status && row.redeemedBy) {
      if (row.status === 'revoked')
        await this.grants.delete({ code: row.code });
      else await this.grant(row.redeemedBy, row.prefix, row.code);
    }
    return saved;
  }

  /** Sinh một mã mới chưa có trong bảng (dùng cho đơn mua — mã có trước, kích hoạt khi admin duyệt). */
  async newCode() {
    return (await this.freeCodes(1))[0];
  }

  /**
   * Kích hoạt mã `code` cho tài khoản (admin duyệt đơn mua): ghi mã đã gắn sẵn với tài khoản (hiện
   * trong trang mã kích hoạt, thu hồi / mở lại được như mã thường) và mở 1 lượt học tính từ bây giờ.
   */
  async issueToAccount(
    code: string,
    userId: number,
    email: string | null,
    prefix: string,
    note: string,
    createdBy: string | null,
  ) {
    const now = new Date(Math.floor(Date.now() / 1000) * 1000);
    await this.repo.insert({
      code,
      prefix,
      note: note.slice(0, 255),
      maxUses: 1,
      useCount: 1,
      status: 'active',
      createdBy,
      lastUsedAt: now,
      redeemedBy: userId,
      redeemedEmail: email,
    });
    const g = await this.grant(userId, prefix, code);
    return { code, startsAt: g.startsAt, expiresAt: g.expiresAt };
  }

  /** Thêm một lượt học: bắt đầu ngay, hoặc nối sau lượt cùng gói còn hạn của tài khoản. */
  private async grant(userId: number, prefix: string, code: string) {
    // Bỏ phần mili-giây: cột DATETIME làm TRÒN giây, lưu 12.850 thành 13 → lượt chưa "bắt đầu" ngay.
    const now = new Date(Math.floor(Date.now() / 1000) * 1000);
    const last = await this.grants
      .createQueryBuilder('g')
      .select('MAX(g.expiresAt)', 'max')
      .where('g.userId = :userId AND g.prefix = :prefix', { userId, prefix })
      .getRawOne<{ max: Date | string | null }>();
    const lastEnd = last?.max ? new Date(last.max) : null;
    const startsAt = lastEnd && lastEnd > now ? lastEnd : now;
    const row = this.grants.create({
      userId,
      prefix,
      code,
      startsAt,
      expiresAt: addMonths(startsAt, IQ_ACCESS_MONTHS),
    });
    await this.grants.upsert(row, ['code']);
    return row;
  }

  /** Các gói còn hạn của tài khoản (gộp các lượt nối tiếp nhau → hạn cuối cùng). */
  async access(userId: number): Promise<AccessItem[]> {
    const now = new Date();
    const rows = await this.grants
      .createQueryBuilder('g')
      .select('g.prefix', 'prefix')
      .addSelect('MAX(g.expiresAt)', 'expiresAt')
      .where('g.userId = :userId', { userId })
      .groupBy('g.prefix')
      // Đã có lượt bắt đầu, và lượt xa nhất (kể cả lượt gia hạn chưa tới ngày) chưa hết hạn.
      // So với giờ từ Node (không dùng NOW() của MySQL): TypeORM ghi DATETIME theo múi giờ của
      // Node, lệch với múi giờ của MySQL thì NOW() sai đến vài tiếng.
      .having('MIN(g.startsAt) <= :now AND MAX(g.expiresAt) > :now', { now })
      .getRawMany<{ prefix: string; expiresAt: Date | string }>();
    return rows.map((r) => ({
      prefix: r.prefix,
      expiresAt: new Date(r.expiresAt).toISOString(),
    }));
  }

  /**
   * Tài khoản nhập mã. Mã chỉ gắn được với MỘT tài khoản: UPDATE có điều kiện
   * `redeemedBy IS NULL` là thao tác nguyên tử nên hai người nhập cùng lúc chỉ một người được.
   * Cùng tài khoản nhập lại mã của mình → thành công nhưng không cộng thêm hạn.
   */
  async redeem(
    input: string,
    userId: number,
    email: string | null,
  ): Promise<RedeemResult> {
    const code = normalizeCode(input);
    const res = await this.repo
      .createQueryBuilder()
      .update(IqActivationCode)
      .set({
        useCount: () => 'useCount + 1',
        lastUsedAt: new Date(),
        redeemedBy: userId,
        redeemedEmail: email,
      })
      .where('code = :code', { code })
      .andWhere("status = 'active'")
      .andWhere('redeemedBy IS NULL')
      .execute();
    const row = await this.repo.findOne({ where: { code } });
    if (!row) {
      // Mã của đơn mua chưa được admin duyệt (chưa xác nhận tiền về).
      const order = await this.orders.findOne({ where: { code } });
      if (order?.status === 'pending' && order.userId === userId)
        return { ok: false, reason: 'pending' };
      return { ok: false, reason: 'not_found' };
    }
    if ((res.affected ?? 0) > 0) {
      const g = await this.grant(userId, row.prefix, code);
      return {
        ok: true,
        prefix: row.prefix,
        expiresAt: g.expiresAt.toISOString(),
        already: false,
        access: await this.access(userId),
      };
    }
    if (row.status === 'revoked') return { ok: false, reason: 'revoked' };
    if (row.redeemedBy !== userId) return { ok: false, reason: 'used_up' };
    const g = await this.grants.findOne({ where: { code } });
    return {
      ok: true,
      prefix: row.prefix,
      expiresAt: (g?.expiresAt ?? new Date()).toISOString(),
      already: true,
      access: await this.access(userId),
    };
  }

  /** Số mã theo khóa: tổng / chưa dùng / đã kích hoạt / thu hồi. */
  async stats() {
    const rows = await this.repo
      .createQueryBuilder('c')
      .select('c.prefix', 'prefix')
      .addSelect('COUNT(*)', 'total')
      .addSelect(
        "SUM(CASE WHEN c.status = 'active' AND c.redeemedBy IS NULL THEN 1 ELSE 0 END)",
        'active',
      )
      .addSelect(
        "SUM(CASE WHEN c.status = 'active' AND c.redeemedBy IS NOT NULL THEN 1 ELSE 0 END)",
        'used',
      )
      .addSelect(
        "SUM(CASE WHEN c.status = 'revoked' THEN 1 ELSE 0 END)",
        'revoked',
      )
      .groupBy('c.prefix')
      .getRawMany<{
        prefix: string;
        total: string;
        active: string;
        used: string;
        revoked: string;
      }>();
    return rows.map((r) => ({
      prefix: r.prefix,
      total: Number(r.total),
      active: Number(r.active),
      used: Number(r.used),
      revoked: Number(r.revoked),
    }));
  }
}
