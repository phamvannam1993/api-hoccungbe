/**
 * PORT NGUYÊN VĂN từ FE (app/components/edu/QuizPlayPage.tsx: preprocessTTS/numToVi/VI_NUMBERS).
 * Batch phải sinh audio cho ĐÚNG text mà FE gửi tới /api/tts, nếu không sẽ đọc sai (vd "5 B1")
 * và cacheKey không khớp read path. Giữ y hệt logic FE.
 */
const VI_NUMBERS: Record<number, string> = {
  0: 'không', 1: 'một', 2: 'hai', 3: 'ba', 4: 'bốn', 5: 'năm',
  6: 'sáu', 7: 'bảy', 8: 'tám', 9: 'chín', 10: 'mười',
  11: 'mười một', 12: 'mười hai', 13: 'mười ba', 14: 'mười bốn', 15: 'mười lăm',
  16: 'mười sáu', 17: 'mười bảy', 18: 'mười tám', 19: 'mười chín', 20: 'hai mươi',
};

function numToVi(n: number): string {
  if (VI_NUMBERS[n] !== undefined) return VI_NUMBERS[n];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const tensWord = ['', '', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'][tens];
    const onesWord = ones === 0 ? '' : ones === 5 ? ' lăm' : ones === 1 ? ' mốt' : ' ' + VI_NUMBERS[ones];
    return `${tensWord} mươi${onesWord}`;
  }
  return String(n);
}

export function preprocessTTS(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FFFF}|\u{2600}-\u{27BF}|\u{1F300}-\u{1F9FF}|\u{FE00}-\u{FE0F}|\u{200D}]/gu, '')
    .replace(/[Dd]ấu\s+nào\s+đúng\?\s*(\d+)\s*_\s*(\d+)/g, (_m, a, b) =>
      `${numToVi(parseInt(a))} lớn hơn, bé hơn hay bằng ${numToVi(parseInt(b))}?`,
    )
    .replace(/(\d+)\s*\[b\d+\]\s*(\d+)\s*\(điền dấu so sánh\)/gi, (_m, a, b) =>
      `${numToVi(parseInt(a))} lớn hơn, bé hơn hay bằng ${numToVi(parseInt(b))}?`,
    )
    // Dãy số có ô trống [bN] (điền SỐ còn thiếu): "5 [b1] 3 [b2] 1" → "năm, mấy, ba, mấy, một".
    // Đọc lần lượt từng phần tử theo thứ tự (số → chữ, ô trống → "mấy"), giữ đúng vị trí ô trống.
    .replace(/(?:\d+|\[b\d+\])(?:\s+(?:\d+|\[b\d+\]))+/g, (m) =>
      m
        .trim()
        .split(/\s+/)
        .map((t) => (/^\[b\d+\]$/.test(t) ? 'mấy' : numToVi(parseInt(t))))
        .join(', '),
    )
    .replace(/\[b\d+\]/g, 'mấy')
    .replace(/[Dd]iền dấu[^:]*:\s*(.*?)\s*\[\?\]\s*([\w\d\s+\-×÷=<>]+)/g, (_m, left, right) => {
      const mathToVi = (s: string) =>
        s
          .replace(/(?<!\d)(\d)[-−–](\d)/g, '$1 đến $2')
          .replace(/[+＋]/g, ' cộng ')
          .replace(/[-−–]/g, ' trừ ')
          .replace(/[×✕*＊·]/g, ' nhân ')
          .replace(/[÷]/g, ' chia ')
          .replace(/\d+/g, (n) => numToVi(parseInt(n)))
          .trim();
      return `Điền dấu so sánh thích hợp vào chỗ trống: ${mathToVi(left)} như thế nào so với ${mathToVi(right)}?`;
    })
    .replace(/\[\?\]/g, 'như thế nào so với')
    .replace(/_{2,}/g, 'mấy')
    .replace(/_/g, 'mấy')
    .replace(/\?/g, '')
    .replace(/(?<!\d)(\d)[-−–](\d)/g, '$1 đến $2')
    .replace(/[+＋]/g, ' cộng ')
    .replace(/[-−–]/g, ' trừ ')
    .replace(/[×✕*＊·]/g, ' nhân ')
    .replace(/(?<=\w)\s+:\s+(?=\w)/g, ' chia ')
    .replace(/(\d)\s*:\s*(\d)/g, '$1 chia $2')
    .replace(/[÷]/g, ' chia ')
    .replace(/=/g, ' bằng ')
    .replace(/</g, ' nhỏ hơn ')
    .replace(/>/g, ' lớn hơn ')
    .replace(/≤/g, ' nhỏ hơn hoặc bằng ')
    .replace(/≥/g, ' lớn hơn hoặc bằng ')
    .replace(/≠/g, ' khác ')
    .replace(/\d+/g, (m) => numToVi(parseInt(m)))
    .replace(/\s{2,}/g, ' ')
    .trim();
}
