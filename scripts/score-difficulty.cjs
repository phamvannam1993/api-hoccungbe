/**
 * Chấm ĐIỂM KHÓ 1–15 cho từng câu trong `skill_questions`.
 *
 * Vì sao cần: game "Ai là triệu phú" có 15 mốc tăng dần, nhưng nhãn của câu hỏi
 * chỉ có 3 bậc easy/medium/hard. Nếu mỗi mốc bốc ngẫu nhiên trong một bậc thì
 * câu 1 có thể khó hơn câu 5, rồi nhảy vọt ở câu 6 và câu 11 — mất hẳn cảm giác
 * leo thang.
 *
 * Cách chấm:
 *  1. Chấm điểm thô cho từng câu từ các đặc điểm ĐO ĐƯỢC (độ lớn của số, số
 *     phép tính, bài nhiều bước, độ dài đề, kỹ năng khó) CỘNG trọng số của nhãn.
 *  2. Xếp hạng TOÀN BỘ câu của cùng một lớp rồi chia đều vào 15 mốc.
 *     KHÔNG dùng nhãn làm khung cứng: nhãn chỉ có 3 bậc và không nhất quán —
 *     "4 × 6 = ?" gắn nhãn medium nhưng dễ hơn "số nào lớn nhất trong 4 số"
 *     gắn nhãn easy. Ép theo khung thì mốc 6 lại dễ hơn mốc 3.
 *  3. Câu nào đã có đủ lượt trả lời thật thì lấy TỈ LỆ ĐÚNG làm điểm chính —
 *     số liệu thật bao giờ cũng đáng tin hơn suy đoán từ đặc điểm.
 *
 *   node scripts/score-difficulty.cjs           # dry-run, in phân bố
 *   node scripts/score-difficulty.cjs --apply   # ghi vào DB
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const APPLY = process.argv.includes('--apply');

/** Số lượt trả lời tối thiểu để tin vào tỉ lệ đúng thật. */
const MIN_ANSWERS = 20;

/** Nhãn khó chỉ là MỘT đặc điểm trong nhiều đặc điểm, không phải khung cứng. */
const LABEL_WEIGHT = { easy: 0, medium: 3, hard: 6 };

/** Kỹ năng vốn khó hơn mặt bằng — cộng thêm điểm. */
const SKILL_WEIGHT = {
  'chuyen-dong': 2.5, 'ti-so-phan-tram': 2, 'the-tich': 2, 'so-thap-phan': 1.5,
  'phan-so': 1.5, 'toan-loi-van': 1.5, 'chu-vi-dien-tich': 1, 'tim-thanh-phan': 1,
  'thong-ke': 1, 'tap-lam-van': 1.5, 'doc-hieu': 1, 'luyen-tu-cau': 1,
  'dem-so': -0.5, 'nhan-biet-chu': -1, 'ghep-van': -0.5,
};

/**
 * Điểm thô từ đặc điểm câu hỏi. Không phải thang tuyệt đối — chỉ dùng để XẾP
 * HẠNG các câu trong cùng một khung.
 */
function rawScore(q) {
  const t = String(q.questionText);
  let s = 0;

  // Độ lớn của số có ảnh hưởng, nhưng KHÔNG phải yếu tố chính: "số liền sau của
  // 460" vẫn dễ hơn "3 + 5 × 3" dù số to hơn. Trọng số nhỏ thôi.
  const nums = (t.match(/\d[\d.,]*/g) || []).map((x) => Number(x.replace(/[.,]/g, ''))).filter(Number.isFinite);
  if (nums.length) s += Math.log10(Math.max(...nums) + 1) * 0.7;

  // DẠNG BÀI mới là thứ quyết định. Xếp theo mức tư duy cần huy động.
  const DANG = [
    [/tìm x/i, 3.5],                                  // giải phương trình đơn giản
    [/hai bước|2 bước|còn lại.*chia|sau đó/i, 3.5],   // nhiều bước
    [/đưa .* đồng|trả lại/i, 3],                      // mua bán, phải trừ tiếp
    [/tính:.*[+\-−].*[×÷]|tính:.*[×÷].*[+\-−]/i, 3], // thứ tự thực hiện phép tính
    [/diện tích|chu vi|thể tích/i, 2.5],              // phải nhớ công thức
    [/trung bình|phần trăm|tỉ số|vận tốc/i, 2.5],
    [/= \? (km|kg|l|m|cm|g|ml)|đổi/i, 2],             // đổi đơn vị
    [/gấp .* lần|giảm .* lần/i, 2],
    [/mấy giờ|sau .* phút/i, 1.8],                    // cộng thời gian có nhớ
    [/[×÷]|\d\s:\s\d/, 1.5],                        // nhân chia
    [/dãy|tiếp theo/i, 1.5],                          // tìm quy luật
    [/[+\-−]/, 0.8],                                  // cộng trừ thuần
    [/liền trước|liền sau|chữ số hàng|đọc số|viết số/i, -1.5], // nhận biết, rất nhẹ
    [/lớn nhất|bé nhất|điền dấu|so sánh/i, -0.5],
  ];
  for (const [re, w] of DANG) if (re.test(t)) s += w;

  // Đề dài (đoạn đọc hiểu, bảng số liệu) tốn sức đọc.
  s += Math.min(t.length / 110, 2.5);

  // Số lựa chọn nhiều hơn thì khó đoán mò hơn.
  const opts = typeof q.optionsJson === 'string' ? JSON.parse(q.optionsJson) : q.optionsJson;
  s += Math.max(0, (opts?.length ?? 4) - 4) * 0.5;

  s += SKILL_WEIGHT[q.skillCode] ?? 0;
  s += LABEL_WEIGHT[q.difficulty] ?? 0;
  return s;
}

(async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await db.query(`
    SELECT sq.id, sq.grade, sq.difficulty, sq.questionText, sq.optionsJson, s.code AS skillCode
      FROM skill_questions sq JOIN skills s ON s.id = sq.skillId
     WHERE sq.isActive = 1`);

  // Tỉ lệ đúng THẬT của những câu đã có đủ lượt trả lời.
  // Gộp dữ liệu từ CẢ HAI nơi bé trả lời: phần luyện kỹ năng và game triệu phú.
  const [stats] = await db.query(`
    SELECT questionId, SUM(n) AS n, SUM(dung) / SUM(n) AS acc FROM (
      SELECT questionId, COUNT(*) AS n, SUM(isCorrect) AS dung FROM skill_attempt_answers GROUP BY questionId
      UNION ALL
      SELECT questionId, COUNT(*) AS n, SUM(isCorrect) AS dung FROM millionaire_answers GROUP BY questionId
    ) t GROUP BY questionId HAVING n >= ${MIN_ANSWERS}`);
  const accById = new Map(stats.map((r) => [Number(r.questionId), Number(r.acc)]));

  // Gom theo LỚP (không theo nhãn) rồi xếp hạng toàn bộ.
  const groups = new Map();
  for (const q of rows) {
    const key = String(q.grade);
    if (!groups.has(key)) groups.set(key, []);
    // Có số liệu thật thì dùng nó làm điểm chính: càng ít bé làm đúng càng khó.
    // Quy về cùng thang với điểm đặc điểm để hai nguồn xếp chung được một hàng.
    const acc = accById.get(Number(q.id));
    groups.get(key).push({
      ...q,
      _score: acc != null ? (1 - acc) * 20 : rawScore(q),
      _real: acc != null,
    });
  }

  const updates = [];
  const phanBo = new Map();
  let soCauCoSoLieuThat = 0;

  for (const [, list] of groups) {
    list.sort((a, b) => a._score - b._score);
    list.forEach((q, i) => {
      // Chia đều danh sách đã xếp hạng vào 15 mốc.
      const bac = 1 + Math.min(14, Math.floor((i / list.length) * 15));
      updates.push([q.id, bac]);
      phanBo.set(bac, (phanBo.get(bac) || 0) + 1);
      if (q._real) soCauCoSoLieuThat++;
    });
  }

  console.log('── Số câu ở mỗi mốc khó (1 = dễ nhất … 15 = khó nhất) ──');
  console.table([...phanBo.entries()].sort((a, b) => a[0] - b[0]).map(([bac, n]) => ({ moc: bac, so_cau: n })));
  console.log(`Tổng ${updates.length} câu. Trong đó ${soCauCoSoLieuThat} câu chấm bằng SỐ LIỆU TRẢ LỜI THẬT, còn lại suy từ đặc điểm.`);

  if (!APPLY) {
    console.log('\nDry-run. Chạy lại với --apply để ghi DB.');
    await db.end();
    return;
  }

  for (let i = 0; i < updates.length; i += 500) {
    const chunk = updates.slice(i, i + 500);
    // Một câu UPDATE cho cả lô bằng CASE — nhanh hơn nhiều so với 8.000 lệnh lẻ.
    const cases = chunk.map(() => 'WHEN ? THEN ?').join(' ');
    const params = chunk.flatMap(([id, bac]) => [id, bac]);
    await db.query(
      `UPDATE skill_questions SET difficultyScore = CASE id ${cases} END WHERE id IN (${chunk.map(() => '?').join(',')})`,
      [...params, ...chunk.map(([id]) => id)],
    );
  }
  console.log(`✓ Đã ghi điểm khó cho ${updates.length} câu`);
  await db.end();
})().catch((e) => { console.error(e); process.exit(1); });
