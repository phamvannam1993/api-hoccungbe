/* Báo phụ huynh: đã có đề kiểm tra giữa kì 1 lớp 1–5 làm trực tuyến, có chấm điểm.
 *
 *   npx tsx src/database/thu-de-giua-ki.ts               # CHẠY KHÔ: xem ai nhận, xem nội dung
 *   npx tsx src/database/thu-de-giua-ki.ts --thu=a@b.c   # GỬI THỬ một địa chỉ
 *   npx tsx src/database/thu-de-giua-ki.ts --that        # GỬI THẬT tới mọi phụ huynh đang hoạt động
 *
 * Mỗi phụ huynh một thư riêng có tên (gom 100 thư một lần gọi /emails/batch), viết như thư cá nhân
 * để Gmail xếp vào Hộp thư chính. Không dùng CC/BCC chung: CC làm mọi người thấy email
 * của nhau, thư BCC chung không có tên và dễ bị xếp vào Quảng cáo.
 *
 * Chạy lại KHÔNG gửi trùng: mỗi người nhận được ghi một thông báo trong ứng dụng
 * mang mã chiến dịch, sau khi bức thư chứa họ đi được. Lần sau bỏ qua những ai đã có.
 */
import 'dotenv/config';
import * as mysql from 'mysql2/promise';

const MA_CHIEN_DICH = 'de-giua-ki-1-lop-1-5-2026-11';
const MOI_THU = 100; // một lần gọi /emails/batch: tối đa 100 thư riêng
const NGHI_MS = 600;
const MIEN_HONG = new Set(['gamil.com', 'gmai.com', 'gmial.com', 'gmaill.com', 'yahou.com']);

type Nguoi = { id: number; fullName: string; email: string };

const TRANG = (process.env.FRONTEND_URL || 'https://behayhoc.com').replace(/\/+$/, '');
const HO_TRO = `${TRANG}/ho-tro`;

/** Đề giữa kì đang có trên site (đếm theo dữ liệu các khu /thi-lop-N). */
const LOP = [
  { lop: 1, de: '30 đề Toán', link: `${TRANG}/thi-lop-1`, goi: `${TRANG}/goi-tai-lieu/thi-giua-ki-1-lop-1` },
  { lop: 2, de: '5 đề Toán + 5 đề Tiếng Việt', link: `${TRANG}/thi-lop-2`, goi: `${TRANG}/goi-tai-lieu/de-giua-ki-1-toan-lop-2` },
  { lop: 3, de: '5 đề Toán', link: `${TRANG}/thi-lop-3`, goi: `${TRANG}/goi-tai-lieu/de-giua-ki-1-toan-lop-3` },
  { lop: 4, de: '5 đề Toán', link: `${TRANG}/thi-lop-4`, goi: `${TRANG}/goi-tai-lieu/de-giua-ki-1-toan-lop-4` },
  { lop: 5, de: '15 đề Toán', link: `${TRANG}/thi-lop-5`, goi: `${TRANG}/goi-tai-lieu/de-giua-ki-1-toan-lop-5` },
];

const TIEU_DE = 'Đề kiểm tra giữa kì 1 cho bé lớp 1–5';

function xung(ten: string): string {
  const t = (ten || '').trim();
  return t ? `anh/chị ${t}` : 'anh/chị';
}

/* Thư viết như thư cá nhân (chữ thường, không bảng/nút/màu/giá) để Gmail xếp vào
 * Hộp thư chính thay vì tab Quảng cáo — mẫu thư bản tin có nút màu và bảng giá là
 * dấu hiệu Gmail dùng để phân loại quảng cáo. */
function banChu(ten: string): string {
  return `Chào ${xung(ten)},

Sắp tới đợt kiểm tra giữa kì 1, bên mình vừa đưa lên đề giữa kì cho bé lớp 1 đến lớp 5, trình bày giống tờ đề giấy ở trường. Bé làm ngay trên điện thoại hoặc máy tính, nộp bài là có điểm và xem được đáp án từng câu. Làm trên web thì miễn phí.

${LOP.map((l) => `Lớp ${l.lop} (${l.de}): ${l.link}`).join('\n')}

Anh/chị cần bản in ra giấy thì trong từng trang có hướng dẫn.

Chúc bé thi tốt,
Bé Hay Học

---
Anh/chị nhận thư này vì đã đăng ký tài khoản tại Bé Hay Học. Không muốn nhận thư nữa, anh/chị nhắn giúp một dòng ở ${HO_TRO}.`;
}

function banHtml(ten: string): string {
  const p = (t: string) => `<p style="margin:0 0 12px">${t}</p>`;
  return `<!doctype html><html lang="vi"><body style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#222">
${p(`Chào ${xung(ten)},`)}
${p('Sắp tới đợt kiểm tra giữa kì 1, bên mình vừa đưa lên đề giữa kì cho bé lớp 1 đến lớp 5, trình bày giống tờ đề giấy ở trường. Bé làm ngay trên điện thoại hoặc máy tính, nộp bài là có điểm và xem được đáp án từng câu. Làm trên web thì miễn phí.')}
${p(LOP.map((l) => `Lớp ${l.lop} (${l.de}): <a href="${l.link}">${l.link.replace(/^https?:\/\//, '')}</a>`).join('<br>'))}
${p('Anh/chị cần bản in ra giấy thì trong từng trang có hướng dẫn.')}
${p('Chúc bé thi tốt,<br>Bé Hay Học')}
<p style="margin:20px 0 0;font-size:12px;color:#777">Anh/chị nhận thư này vì đã đăng ký tài khoản tại Bé Hay Học. Không muốn nhận thư nữa, anh/chị nhắn giúp một dòng ở <a href="${HO_TRO}" style="color:#777">${HO_TRO.replace(/^https?:\/\//, '')}</a>.</p>
</body></html>`;
}

const TB_TIEU_DE = 'Đề kiểm tra giữa kì 1 lớp 1–5 đã có';
const TB_THAN = 'Bé làm trực tuyến như đề giấy, nộp bài có điểm ngay và xem đáp án từng câu. Chạm để chọn lớp.';

function layResend(): { key: string; from: string; hop: string } | null {
  const key = process.env.RESEND_API_KEY;
  /* Chiến dịch này gửi từ admin@ thay cho no-reply@: địa chỉ "không nhận trả lời" là dấu hiệu
   * thư hàng loạt khiến Gmail xếp vào tab Quảng cáo. Thư hệ thống khác vẫn dùng EMAIL_FROM. */
  const fromRaw = 'Bé Hay Học <admin@behayhoc.com>';
  if (!key) return null;
  const from = fromRaw.includes('<')
    ? fromRaw
    : `${(process.env.EMAIL_FROM_NAME || 'Bé Hay Học').replace(/["<>]/g, '').trim()} <${fromRaw}>`;
  // Địa chỉ ở ô "To" của thư chung: chính hòm thư gửi đi (người nhận thật nằm ở BCC)
  const hop = (fromRaw.match(/<([^>]+)>/)?.[1] ?? fromRaw).trim();
  return { key, from, hop };
}

async function gui(r: { key: string; from: string }, to: string, ten: string): Promise<string | null> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${r.key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: r.from, to: [to], subject: TIEU_DE, html: banHtml(ten), text: banChu(ten) }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    console.log(`   ! Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return null;
  }
  const j = (await res.json()) as { id?: string };
  return j.id ?? null;
}

const che = (m: string) => m.replace(/(.{2})[^@]*(@.*)/, '$1***$2');

async function chay(): Promise<void> {
  const coThu = process.argv.find((a) => a.startsWith('--thu='));
  if (coThu) {
    const r = layResend();
    if (!r) { console.log('  ! Chưa cấu hình RESEND_API_KEY / EMAIL_FROM — dừng.'); return; }
    const dia = coThu.slice('--thu='.length).trim();
    const id = await gui(r, dia, 'Nguyễn Văn A');
    if (id) console.log(`  đã gửi THỬ tới ${che(dia)} — đúng bức thư phụ huynh sẽ nhận. Kiểm giúp: thư vào tab Chính hay Quảng cáo/Spam, link, chữ trên điện thoại.`);
    return;
  }

  const that = process.argv.includes('--that');
  const c = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [tho] = await c.query<mysql.RowDataPacket[]>(
    `SELECT id, fullName, email FROM users
      WHERE role = 'parent' AND status = 'active' AND email IS NOT NULL AND email <> ''
      ORDER BY createdAt DESC`,
  );
  const nhan: Nguoi[] = [];
  const bo: string[] = [];
  const daThay = new Set<string>();
  for (const r of tho as unknown as Nguoi[]) {
    const mail = String(r.email).trim().toLowerCase();
    const mien = mail.split('@')[1] ?? '';
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(mail)) { bo.push(`${mail} (sai dạng)`); continue; }
    if (MIEN_HONG.has(mien)) { bo.push(`${mail} (tên miền gõ sai)`); continue; }
    if (daThay.has(mail)) { bo.push(`${mail} (trùng)`); continue; }
    daThay.add(mail);
    nhan.push({ id: r.id, fullName: r.fullName, email: String(r.email).trim() });
  }

  const [daGui] = await c.query<mysql.RowDataPacket[]>(
    `SELECT userId FROM notifications WHERE JSON_EXTRACT(data, '$.chienDich') = ?`,
    [MA_CHIEN_DICH],
  );
  const xong = new Set((daGui as { userId: number }[]).map((x) => Number(x.userId)));
  const conLai = nhan.filter((n) => !xong.has(n.id));
  const soThu = Math.ceil(conLai.length / MOI_THU);

  console.log(`  chiến dịch     : ${MA_CHIEN_DICH}`);
  console.log(`  người nhận     : ${nhan.length} (bỏ qua ${bo.length} địa chỉ hỏng)`);
  for (const b of bo.slice(0, 8)) console.log(`     bỏ: ${che(b)}`);
  console.log(`  đã gửi trước đó: ${nhan.length - conLai.length} · còn phải gửi: ${conLai.length}`);
  console.log(`  cách gửi       : mỗi người một thư riêng có tên, gom ${soThu} lần gọi Resend (không ai thấy email người khác)`);
  console.log(`  tiêu đề thư    : ${TIEU_DE}`);

  if (!that) {
    console.log('\n──────── NỘI DUNG (bản chữ) ────────');
    console.log(banChu((conLai[0] as Nguoi | undefined)?.fullName ?? ''));
    console.log('────────────────────────────────────');
    console.log('\n  (CHẠY KHÔ — chưa gửi gì cả. Thêm --that để gửi thật.)');
    await c.end();
    return;
  }

  const rs = layResend();
  if (!rs) { console.log('  ! Chưa cấu hình RESEND_API_KEY / EMAIL_FROM — dừng.'); await c.end(); return; }

  let daNhan = 0;
  for (let i = 0; i < conLai.length; i += MOI_THU) {
    const lo = conLai.slice(i, i + MOI_THU);
    let ket: { id?: string }[] = [];
    try {
      const res = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: { Authorization: `Bearer ${rs.key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(lo.map((n) => ({ from: rs.from, to: [n.email], subject: TIEU_DE, html: banHtml(n.fullName), text: banChu(n.fullName) }))),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) { console.log(`   ! lô ${i + 1}–${i + lo.length}: Resend ${res.status} ${(await res.text()).slice(0, 240)}`); continue; }
      const j = (await res.json()) as { data?: { id?: string }[] };
      ket = Array.isArray(j.data) ? j.data : [];
    } catch (e) {
      console.log(`   ! lô ${i + 1}–${i + lo.length}: ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }
    /* Resend trả mã theo đúng thứ tự gửi: chỉ ghi dấu "đã nhận" cho thư có mã (sau khi đi được),
     * thiếu mã thì lần chạy sau gửi bù. */
    for (let k = 0; k < lo.length; k++) {
      if (!ket[k]?.id) continue;
      await c.query(
        `INSERT INTO notifications (userId, type, title, body, data, sentAt, createdAt, updatedAt)
         VALUES (?, 'system', ?, ?, ?, NOW(), NOW(), NOW())`,
        [lo[k].id, TB_TIEU_DE, TB_THAN, JSON.stringify({ chienDich: MA_CHIEN_DICH, href: '/thi-lop-1' })],
      );
      daNhan++;
    }
    console.log(`   lô ${i + lo.length}/${conLai.length} · thư đi được ${ket.filter((x) => x?.id).length}/${lo.length}`);
    if (i + MOI_THU < conLai.length) await new Promise((r) => setTimeout(r, NGHI_MS));
  }

  console.log(`\n  đã gửi tới: ${daNhan}/${conLai.length} người`);
  if (daNhan < conLai.length) console.log(`  còn ${conLai.length - daNhan} người chưa nhận — chạy lại lệnh này sẽ gửi bù đúng số đó.`);
  await c.end();
}

void chay();
