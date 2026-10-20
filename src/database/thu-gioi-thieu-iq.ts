/* Gửi bài giới thiệu Toán IQ tới 100 phụ huynh đăng ký gần đây:
 * một thông báo trong ứng dụng + một email cho mỗi người.
 *
 *   npx tsx src/database/thu-gioi-thieu-iq.ts              # CHẠY KHÔ: xem ai nhận, xem nội dung
 *   npx tsx src/database/thu-gioi-thieu-iq.ts --thu=a@b.c  # GỬI THỬ một địa chỉ
 *   npx tsx src/database/thu-gioi-thieu-iq.ts --that       # GỬI THẬT 100 người mới nhất
 *   npx tsx src/database/thu-gioi-thieu-iq.ts --tat-ca     # ... hoặc TẤT CẢ phụ huynh còn lại
 *
 * Vì sao mặc định là chạy khô: email đã gửi thì không thu hồi được, và đây là thư
 * gửi tới người thật nhân danh Bé Hay Học. Nhầm nội dung hay nhầm danh sách thì
 * không có nút hoàn tác.
 *
 * Chạy lại KHÔNG gửi trùng: trước khi gửi, kiểm xem người ấy đã có thông báo cùng
 * mã chiến dịch chưa. Mạng đứt giữa chừng thì chạy lại là gửi nốt phần còn thiếu,
 * không dội lại từ đầu vào hộp thư người đã nhận.
 */
import 'dotenv/config';
import * as mysql from 'mysql2/promise';

const MA_CHIEN_DICH = 'gioi-thieu-toan-iq-2026-10';
const SO_NGUOI = 100;
/* Nghỉ giữa hai LÔ. Tài khoản này được 10 yêu cầu/giây (đo bằng header
 * `ratelimit-limit` của Resend), mà mỗi lô chỉ là MỘT yêu cầu — nên 600ms là thừa
 * thãi an toàn, không phải chỗ thắt cổ chai. */
const NGHI_MS = 600;

/* Tên miền gõ sai — thư gửi vào đây chắc chắn dội ngược. Tỉ lệ dội cao làm tụt uy
 * tín người gửi, kéo theo cả những thư cần thiết (đặt lại mật khẩu) rơi vào spam.
 * Nên bỏ qua, và lấy bù người kế tiếp cho đủ số. */
const MIEN_HONG = new Set(['gamil.com', 'gmai.com', 'gmial.com', 'gmaill.com', 'yahou.com']);

type Nguoi = { id: number; fullName: string; email: string };

const TRANG = (process.env.FRONTEND_URL || 'https://behayhoc.com').replace(/\/+$/, '');
const LINK = `${TRANG}/khoa-hoc-iq`;
const HO_TRO = `${TRANG}/ho-tro`;

const TIEU_DE = 'Mở Toán IQ cho lớp 1–3: bài đầu mỗi khóa học thử miễn phí';

function xung(ten: string): string {
  const t = (ten || '').trim();
  return t ? `anh/chị ${t}` : 'anh/chị';
}

function banChu(ten: string): string {
  return `Chào ${xung(ten)},

Cảm ơn anh/chị đã mở tài khoản ở Bé Hay Học. Bên mình vừa làm xong phần Toán IQ cho bé lớp 1, 2 và 3.

Đây không phải bài tập chép lại sách. Mỗi câu là một thử thách nhỏ: tìm quy luật, suy luận, đếm hình, xem đồng hồ, tính tiền, đo độ dài. Bé chạm để chọn như chơi game, có đếm ngược nên không đọc lướt qua loa.

Ba chỗ bên mình làm kỹ nhất:

1) Bí thì có người mách, không phải đoán bừa.
   Cả 1.800 câu đều có phần "gợi ý cách làm" — không cho đáp án, chỉ chỉ hướng nghĩ. Bé tự đi tiếp được.

2) Sai thì biết sai ở đâu.
   Mỗi câu có lời giải từng bước, nói rõ cả những bẫy hay mắc. Bé hiểu vì sao sai chứ không chỉ biết mình sai.

3) Bé chưa đọc thạo vẫn làm được.
   Đề bài và gợi ý đều có giọng đọc. Bé nghe rồi làm, anh/chị không phải ngồi đọc hộ.

Quy mô: 3 lớp, mỗi lớp 12 khóa, mỗi khóa 5 bài, mỗi bài 10 câu — tổng 1.800 câu.

Bài đầu của cả 36 khóa đều học thử miễn phí. Tức là 36 bài, 360 câu, chưa phải trả đồng nào. Anh/chị cho bé thử trước rồi hãy quyết.

Cho bé thử ở đây: ${LINK}

Nếu thấy hợp, một khóa 29.000đ, hoặc trọn 12 khóa của một lớp 99.000đ.

Chúc bé học vui,
Bé Hay Học

---
Anh/chị nhận thư này vì đã đăng ký tài khoản tại Bé Hay Học. Không muốn nhận thư giới thiệu nữa, anh/chị nhắn giúp bên mình một dòng ở ${HO_TRO} — hòm thư này không nhận thư trả lời.`;
}

function banHtml(ten: string): string {
  const o = (t: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#1f2937">${t}</p>`;
  const muc = (so: string, dau: string, than: string) =>
    `<tr><td style="padding:0 0 14px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="top" style="width:30px;font-size:15px;font-weight:700;color:#1093b7;line-height:1.65">${so}</td>
      <td style="font-size:15px;line-height:1.65;color:#1f2937"><b>${dau}</b><br>${than}</td>
    </tr></table></td></tr>`;

  return `<!doctype html><html lang="vi"><body style="margin:0;padding:0;background:#f4f6f8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif">
  <tr><td style="background:#1093b7;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:800">Bé Hay Học</td></tr>
  <tr><td style="padding:28px">
    ${o(`Chào ${xung(ten)},`)}
    ${o('Cảm ơn anh/chị đã mở tài khoản ở Bé Hay Học. Bên mình vừa làm xong phần <b>Toán IQ</b> cho bé lớp 1, 2 và 3.')}
    ${o('Đây không phải bài tập chép lại sách. Mỗi câu là một thử thách nhỏ: tìm quy luật, suy luận, đếm hình, xem đồng hồ, tính tiền, đo độ dài. Bé chạm để chọn như chơi game, có đếm ngược nên không đọc lướt qua loa.')}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:4px 0 8px">
      ${muc('1.', 'Bí thì có người mách, không phải đoán bừa.', 'Cả 1.800 câu đều có phần “gợi ý cách làm” — không cho đáp án, chỉ chỉ hướng nghĩ. Bé tự đi tiếp được.')}
      ${muc('2.', 'Sai thì biết sai ở đâu.', 'Mỗi câu có lời giải từng bước, nói rõ cả những bẫy hay mắc. Bé hiểu vì sao sai chứ không chỉ biết mình sai.')}
      ${muc('3.', 'Bé chưa đọc thạo vẫn làm được.', 'Đề bài và gợi ý đều có giọng đọc. Bé nghe rồi làm, anh/chị không phải ngồi đọc hộ.')}
    </table>
    ${o('Quy mô: 3 lớp, mỗi lớp 12 khóa, mỗi khóa 5 bài, mỗi bài 10 câu — tổng <b>1.800 câu</b>.')}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:4px 0 18px">
      <tr><td style="background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.65;color:#1f2937">
        <b>Bài đầu của cả 36 khóa đều học thử miễn phí.</b><br>36 bài, 360 câu, chưa phải trả đồng nào. Anh/chị cho bé thử trước rồi hãy quyết.
      </td></tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px">
      <tr><td style="background:#f97316;border-radius:999px">
        <a href="${LINK}" style="display:inline-block;padding:13px 30px;color:#ffffff;font-size:16px;font-weight:800;text-decoration:none">Cho bé thử Toán IQ →</a>
      </td></tr>
    </table>
    ${o('Nếu thấy hợp, một khóa 29.000đ, hoặc trọn 12 khóa của một lớp 99.000đ.')}
    ${o('Chúc bé học vui,<br>Bé Hay Học')}
  </td></tr>
  <tr><td style="border-top:1px solid #eef1f4;padding:16px 28px;font-size:12px;line-height:1.6;color:#8a949e">
    Anh/chị nhận thư này vì đã đăng ký tài khoản tại Bé Hay Học.
    Không muốn nhận thư giới thiệu nữa, anh/chị nhắn giúp bên mình một dòng ở
    <a href="${HO_TRO}" style="color:#1093b7">trang hỗ trợ</a> — hòm thư này không nhận thư trả lời.
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

const TB_TIEU_DE = 'Toán IQ đã mở cho lớp 1, 2, 3';
const TB_THAN =
  'Bài đầu của cả 36 khóa học thử miễn phí. Mỗi câu đều có gợi ý cách làm, lời giải từng bước và giọng đọc. Chạm để cho bé thử.';

/** Lấy khoá gửi thư. Trả về null nếu thiếu cấu hình. */
function layResend(): { key: string; from: string } | null {
  const key = process.env.RESEND_API_KEY;
  const fromRaw = (process.env.EMAIL_FROM || '').trim();
  if (!key || !fromRaw) return null;
  const from = fromRaw.includes('<')
    ? fromRaw
    : `${(process.env.EMAIL_FROM_NAME || 'Bé Hay Học').replace(/["<>]/g, '').trim()} <${fromRaw}>`;
  return { key, from };
}

/* Gửi thử MỘT địa chỉ, đúng bức thư mà 100 người sẽ nhận.
 *
 * Xem trước trong terminal chỉ thấy chữ. Lỗi thật của email nằm chỗ khác: nút bấm
 * vỡ trên Gmail, chữ tràn trên điện thoại, thư rơi thẳng vào spam. Những thứ ấy chỉ
 * hiện ra trong hộp thư thật — và nếu phát hiện sau khi gửi thì đã 100 người thấy. */
async function guiThu(dia: string): Promise<void> {
  const r = layResend();
  if (!r) { console.log('  ! Chưa cấu hình RESEND_API_KEY / EMAIL_FROM — dừng.'); return; }
  const ten = 'Nguyễn Văn A';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${r.key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: r.from, to: [dia], subject: TIEU_DE,
      html: banHtml(ten), text: banChu(ten),
    }),
    signal: AbortSignal.timeout(15000),
  });
  const che = dia.replace(/(.{2})[^@]*(@.*)/, '$1***$2');
  if (res.ok) {
    console.log(`  đã gửi THỬ tới ${che} — đúng bức thư 100 người sẽ nhận.`);
    console.log(`  (tên trong thư để mẫu là "${ten}"; thư thật dùng tên từng người)`);
    console.log('  Kiểm giúp: nút bấm, chữ trên điện thoại, và thư có vào Inbox hay Spam.');
  } else {
    console.log(`  ! Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

async function chay(): Promise<void> {
  const coThu = process.argv.find((a) => a.startsWith('--thu='));
  if (coThu) { await guiThu(coThu.slice('--thu='.length).trim()); return; }

  const that = process.argv.includes('--that') || process.argv.includes('--tat-ca');
  const c = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  /* `--tat-ca`: mọi phụ huynh đang hoạt động. Không có cờ: 100 người mới nhất.
   *
   * Lấy dư rồi mới lọc, mới đủ 100 người nhận được thật. Lấy đúng 100 rồi mới bỏ
   * địa chỉ hỏng thì còn 97 — thiếu so với điều đã hứa mà không ai để ý. */
  const tatCa = process.argv.includes('--tat-ca');
  const [tho] = await c.query<mysql.RowDataPacket[]>(
    `SELECT id, fullName, email FROM users
      WHERE role = 'parent' AND status = 'active' AND email IS NOT NULL AND email <> ''
      ORDER BY createdAt DESC ${tatCa ? '' : 'LIMIT 200'}`,
  );

  const nhan: Nguoi[] = [];
  const bo: string[] = [];
  const daThay = new Set<string>();
  for (const r of tho as unknown as Nguoi[]) {
    if (!tatCa && nhan.length >= SO_NGUOI) break;
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

  console.log(`  chiến dịch     : ${MA_CHIEN_DICH}`);
  console.log(`  người nhận     : ${nhan.length} (bỏ qua ${bo.length} địa chỉ hỏng)`);
  for (const b of bo.slice(0, 8)) console.log(`     bỏ: ${b.replace(/(.{2})[^@]*(@.*)/, '$1***$2')}`);
  console.log(`  đã gửi trước đó: ${nhan.length - conLai.length} · còn phải gửi: ${conLai.length}`);
  console.log(`  tiêu đề thư    : ${TIEU_DE}`);
  console.log(`  liên kết       : ${LINK}`);

  if (!that || process.argv.includes('--kho')) {
    console.log('\n──────── NỘI DUNG (bản chữ, mẫu cho người đầu danh sách) ────────');
    console.log(banChu(conLai[0]?.fullName ?? ''));
    console.log('─────────────────────────────────────────────────────────────────');
    console.log('\n  (CHẠY KHÔ — chưa gửi gì cả. Thêm --that để gửi thật.)');
    await c.end();
    return;
  }

  const rs = layResend();
  if (!rs) { console.log('  ! Chưa cấu hình RESEND_API_KEY / EMAIL_FROM — dừng.'); await c.end(); return; }
  const { key, from } = rs;

  /* GỬI THEO LÔ: một yêu cầu HTTP cho tối đa 100 thư.
   *
   * Vẫn là 100 BỨC THƯ RIÊNG — mỗi bức một người nhận, một lời chào theo tên — chỉ
   * gộp lại thành một lần gọi. Khác hẳn chuyện nhét 100 địa chỉ vào cùng một thư:
   * làm thế thì mỗi phụ huynh nhìn thấy email của 99 người còn lại.
   *
   * Resend trả về `{data:[{id},…]}` KHỚP THEO THỨ TỰ với mảng gửi đi. Nhờ vậy biết
   * đích xác thư nào đi được: chỉ người có `id` mới được ghi dấu "đã nhận". Thiếu
   * dấu thì lần chạy sau gửi bù, chứ không bỏ sót im lặng. */
  let xongMail = 0, xongTb = 0;
  const CO_LO_MAIL = 100;

  for (let i = 0; i < conLai.length; i += CO_LO_MAIL) {
    const lo = conLai.slice(i, i + CO_LO_MAIL);
    const than = lo.map((n) => ({
      from, to: [n.email], subject: TIEU_DE,
      html: banHtml(n.fullName), text: banChu(n.fullName),
    }));

    let ket: { id?: string }[] = [];
    try {
      const res = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(than),
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) {
        console.log(`   ! lô ${i + 1}–${i + lo.length}: Resend ${res.status} ${(await res.text()).slice(0, 240)}`);
        continue;   // không ghi dấu ai cả — lần sau gửi lại nguyên lô
      }
      const j = (await res.json()) as { data?: { id?: string }[] };
      ket = Array.isArray(j.data) ? j.data : [];
    } catch (e) {
      console.log(`   ! lô ${i + 1}–${i + lo.length}: ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }

    if (ket.length !== lo.length) {
      console.log(`   ! lô ${i + 1}–${i + lo.length}: gửi ${lo.length} thư nhưng chỉ nhận ${ket.length} mã.`);
      console.log('     Chỉ ghi dấu những người CÓ mã; số còn lại để lần chạy sau gửi bù.');
    }

    for (let k = 0; k < lo.length; k++) {
      if (!ket[k]?.id) continue;
      xongMail++;
      /* Ghi thông báo SAU khi thư đi được: dòng này vừa là thông báo trong chuông,
       * vừa là dấu "người này đã nhận rồi". Ghi trước mà thư hỏng thì lần chạy sau
       * tưởng xong và bỏ sót người ấy vĩnh viễn. */
      await c.query(
        `INSERT INTO notifications (userId, type, title, body, data, sentAt, createdAt, updatedAt)
         VALUES (?, 'system', ?, ?, ?, NOW(), NOW(), NOW())`,
        [lo[k].id, TB_TIEU_DE, TB_THAN, JSON.stringify({ chienDich: MA_CHIEN_DICH, href: '/khoa-hoc-iq' })],
      );
      xongTb++;
    }
    console.log(`   lô ${i + lo.length}/${conLai.length} · thư đi được ${ket.filter((x) => x?.id).length}/${lo.length}`);
    if (i + CO_LO_MAIL < conLai.length) await new Promise((r) => setTimeout(r, NGHI_MS));
  }

  console.log(`\n  email gửi được  : ${xongMail}/${conLai.length}`);
  console.log(`  thông báo đã ghi: ${xongTb}`);
  if (xongMail < conLai.length) {
    console.log(`  còn ${conLai.length - xongMail} người chưa nhận — chạy lại lệnh này sẽ gửi bù đúng số đó.`);
  }
  await c.end();
}

void chay();
