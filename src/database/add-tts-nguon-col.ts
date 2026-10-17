/* Thêm cột `nguon` cho bảng `tts_cache` — nhãn cho biết bản ghi giọng đọc này sinh ra
 * từ đâu: 'iq' (câu hỏi toán IQ), 'quiz:<slug>' (bài tập của một khoá), 'am-van', …
 *
 * VÌ SAO CẦN: trang quản lý audio phải khoanh được theo từng phần. Trước đây
 * `tts_cache` chỉ có chữ và file, nên muốn lọc riêng audio của IQ thì phải đoán theo
 * nội dung câu chữ — sai ngay khi một câu trùng nhau giữa hai phần.
 *
 * `generateForTexts()` đã nhận tham số `nhan` từ trước nhưng chỉ dùng nó làm khoá
 * chống chạy trùng, không ghi xuống DB. Nay ghi thật.
 *
 * DB không bật `synchronize` nên phải thêm cột thủ công, như mọi script `add-*.ts`
 * khác trong thư mục này. An toàn chạy lại nhiều lần.
 *
 *   npx ts-node src/database/add-tts-nguon-col.ts
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

(async () => {
  await ds.initialize();

  const coCot: { c: number }[] = await ds.query(
    "SELECT COUNT(*) c FROM information_schema.columns WHERE table_name='tts_cache' AND column_name='nguon'",
  );
  if (Number(coCot[0].c) === 0) {
    await ds.query("ALTER TABLE tts_cache ADD COLUMN nguon VARCHAR(64) NULL AFTER text");
    console.log('+ thêm cột nguon');
  } else {
    console.log('nguon đã có');
  }

  const coChiMuc: { c: number }[] = await ds.query(
    "SELECT COUNT(*) c FROM information_schema.statistics WHERE table_name='tts_cache' AND index_name='idx_tts_cache_nguon'",
  );
  if (Number(coChiMuc[0].c) === 0) {
    await ds.query('CREATE INDEX idx_tts_cache_nguon ON tts_cache (nguon)');
    console.log('+ thêm chỉ mục idx_tts_cache_nguon');
  } else {
    console.log('chỉ mục đã có');
  }

  /* GÁN NHÃN CHO BẢN GHI CŨ.
   *
   * Hàng nghìn bản ghi đã sinh trước khi có cột này, tất cả đều `nguon = NULL`. Trang
   * quản lý lọc theo `nguon` sẽ thấy trống trơn — trông như mất dữ liệu.
   *
   * Gán bằng cách đối chiếu chữ với chính bảng nguồn: chỉ những câu đang nằm trong
   * `iq_questions` mới được đánh 'iq'. Câu nào trùng giữa hai phần thì nhận nhãn 'iq'
   * — chấp nhận được, vì nó CÓ thuộc IQ thật; cái sai duy nhất là nó cũng thuộc phần
   * khác nữa, và phần khác sẽ gán nhãn của nó ở lượt sau. */
  const daCoBang: { c: number }[] = await ds.query(
    "SELECT COUNT(*) c FROM information_schema.tables WHERE table_name='iq_questions'",
  );
  if (Number(daCoBang[0].c) > 0) {
    const kq = await ds.query(
      `UPDATE tts_cache t
          SET t.nguon = 'iq'
        WHERE t.nguon IS NULL
          AND EXISTS (
            SELECT 1 FROM iq_questions q
             WHERE q.question = t.text
                OR q.questionSpeech = t.text
                OR q.explanation = t.text
                OR q.explanationSpeech = t.text
                OR JSON_CONTAINS(q.optionsJson, JSON_QUOTE(t.text))
          )`,
    );
    console.log(`+ gán nhãn 'iq' cho ${kq.affectedRows ?? 0} bản ghi cũ`);
  } else {
    console.log('chưa có bảng iq_questions — bỏ qua bước gán nhãn');
  }

  await ds.destroy();
})();
