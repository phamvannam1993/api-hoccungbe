/**
 * Danh mục mô tả chi tiết các loại trò chơi trên Học Cùng Bé.
 *
 * Mục tiêu: giúp phụ huynh hiểu rõ mỗi loại trò chơi vận hành thế nào, rèn luyện
 * kỹ năng gì cho trẻ, và cơ sở giáo dục/khoa học phía sau — để tin tưởng lựa chọn.
 *
 * Nội dung tổng hợp từ các phương pháp giáo dục sớm phổ biến (Montessori, Piaget,
 * học qua trò chơi - play-based learning) và nghiên cứu về trí nhớ làm việc, chức
 * năng điều hành ở trẻ mầm non & tiểu học.
 */

export interface GameTypeInfo {
  /** Mã loại trò chơi khớp với gameType trong DB */
  key: string;
  /** Hệ thống chứa loại trò chơi: 'games' (bài học tương tác) hoặc 'play' (khu trò chơi tư duy) */
  module: 'games' | 'play';
  /** Tên thân thiện hiển thị cho phụ huynh/trẻ */
  name: string;
  /** Trẻ chơi thế nào */
  howToPlay: string;
  /** Các kỹ năng trẻ phát triển */
  skills: string[];
  /** Cơ sở giáo dục / khoa học phía sau */
  educationalBasis: string;
  /** Độ tuổi phù hợp gợi ý */
  suitableAge: string;
}

export const GAME_TYPE_CATALOG: GameTypeInfo[] = [
  {
    key: 'choose_correct',
    module: 'games',
    name: 'Chọn đáp án đúng',
    howToPlay:
      'Bé đọc/nghe câu hỏi kèm hình ảnh minh họa rồi chọn đáp án đúng trong nhiều lựa chọn. Sai sẽ được nhắc lại, đúng sẽ được khen ngay.',
    skills: [
      'Nhận biết và phân loại thông tin',
      'Ghi nhớ kiến thức đã học',
      'Ra quyết định và tự tin lựa chọn',
      'Tập trung chú ý',
    ],
    educationalBasis:
      'Dựa trên nguyên lý phản hồi tức thì (immediate feedback) trong học tăng cường: mỗi lựa chọn đúng được củng cố ngay giúp bé ghi nhớ bền hơn, giảm áp lực sợ sai.',
    suitableAge: '4–8 tuổi',
  },
  {
    key: 'connect',
    module: 'games',
    name: 'Nối cặp tương ứng',
    howToPlay:
      'Bé nối các mục tương ứng với nhau: chữ với hình, số với số lượng, con vật với thức ăn... bằng cách kéo đường nối giữa hai cột.',
    skills: [
      'Tư duy liên kết, tìm mối quan hệ',
      'Ghép tương ứng 1–1 (nền tảng toán học)',
      'Phối hợp mắt – tay',
      'Ghi nhớ khái niệm theo cặp',
    ],
    educationalBasis:
      'Vận dụng học kết hợp (associative learning): trẻ xây dựng liên kết khái niệm giữa hai đối tượng. Tương ứng 1–1 là bước nền cho khái niệm số lượng theo lý thuyết phát triển nhận thức của Piaget.',
    suitableAge: '4–7 tuổi',
  },
  {
    key: 'arrange',
    module: 'games',
    name: 'Sắp xếp thứ tự',
    howToPlay:
      'Bé sắp xếp các mục theo đúng trình tự: số tăng dần, thứ tự bảng chữ cái, hoặc các bước của một câu chuyện/quy trình.',
    skills: [
      'Tư duy trình tự và logic',
      'Hiểu khái niệm thứ tự, trước – sau',
      'So sánh lớn – nhỏ',
      'Lập kế hoạch từng bước',
    ],
    educationalBasis:
      'Rèn tư duy chuỗi (sequencing) — kỹ năng tiền đọc–viết và tiền toán học quan trọng. Theo Piaget, sắp xếp theo trật tự (seriation) là dấu mốc của giai đoạn thao tác cụ thể.',
    suitableAge: '5–9 tuổi',
  },
  {
    key: 'image_match',
    module: 'games',
    name: 'Ghép hình giống nhau',
    howToPlay:
      'Bé quan sát và ghép các hình giống nhau hoặc tương ứng với nhau (ví dụ ghép hình bóng với vật thật).',
    skills: [
      'Quan sát chi tiết',
      'Trí nhớ hình ảnh',
      'Phân biệt tương đồng – khác biệt',
      'Kiên nhẫn',
    ],
    educationalBasis:
      'Phát triển trí nhớ thị giác (visual memory) và tri giác hình — nền tảng để bé nhận mặt chữ cái và chữ số, hỗ trợ trực tiếp cho việc học đọc.',
    suitableAge: '3–7 tuổi',
  },
  {
    key: 'drag',
    module: 'games',
    name: 'Kéo thả phân loại',
    howToPlay:
      'Bé dùng ngón tay kéo từng mục về đúng vị trí hoặc đúng nhóm (ví dụ kéo trái cây vào giỏ, kéo chữ vào ô).',
    skills: [
      'Vận động tinh (fine motor)',
      'Phối hợp mắt – tay',
      'Phân loại theo tiêu chí',
      'Thao tác trực tiếp trên màn hình',
    ],
    educationalBasis:
      'Học qua thao tác (hands-on / kinesthetic learning). Phương pháp Montessori nhấn mạnh vai trò của bàn tay: trẻ thao tác trực tiếp sẽ ghi nhớ sâu và hiểu bản chất tốt hơn.',
    suitableAge: '3–7 tuổi',
  },
  {
    key: 'drag_arrange',
    module: 'games',
    name: 'Kéo thả sắp xếp',
    howToPlay:
      'Bé vừa kéo thả vừa sắp xếp các mục theo đúng thứ tự — kết hợp thao tác tay và tư duy trình tự trong một trò chơi.',
    skills: [
      'Vận động tinh kết hợp tư duy logic',
      'Giải quyết vấn đề nhiều bước',
      'Ghi nhớ và thực hiện theo kế hoạch',
      'Kiểm soát và tự sửa lỗi',
    ],
    educationalBasis:
      'Kết hợp vận động và logic giúp phát triển chức năng điều hành (executive function) — khả năng lập kế hoạch, ghi nhớ làm việc và tự điều chỉnh, vốn dự báo mạnh cho kết quả học tập về sau.',
    suitableAge: '5–9 tuổi',
  },
  {
    key: 'matrix',
    module: 'play',
    name: 'Ma trận ghi nhớ',
    howToPlay:
      'Bé quan sát một lưới ô (2×2, 3×3...) rồi ghi nhớ vị trí và tái hiện lại theo yêu cầu.',
    skills: [
      'Trí nhớ làm việc (working memory)',
      'Tư duy không gian',
      'Tập trung cao độ',
      'Ghi nhớ ngắn hạn có tổ chức',
    ],
    educationalBasis:
      'Rèn trí nhớ làm việc — theo nghiên cứu của Alloway, đây là yếu tố dự báo thành tích học tập còn mạnh hơn cả chỉ số IQ ở trẻ nhỏ.',
    suitableAge: '5–10 tuổi',
  },
  {
    key: 'pattern',
    module: 'play',
    name: 'Tìm quy luật',
    howToPlay:
      'Bé quan sát một dãy (màu sắc, hình khối, con số) rồi nhận ra quy luật và chọn phần tử tiếp theo cho đúng.',
    skills: [
      'Nhận biết và tiếp nối quy luật',
      'Tư duy logic – toán học',
      'Dự đoán, suy luận',
      'Khái quát hóa',
    ],
    educationalBasis:
      'Nhận biết quy luật (pattern recognition) là nền tảng của tư duy đại số sớm và toán học. Trẻ giỏi tìm quy luật thường học toán thuận lợi hơn ở tiểu học.',
    suitableAge: '5–10 tuổi',
  },
  {
    key: 'maze',
    module: 'play',
    name: 'Mê cung tìm đường',
    howToPlay:
      'Bé tìm và vẽ đường đi từ điểm bắt đầu đến đích trong mê cung, tránh các ngõ cụt.',
    skills: [
      'Tư duy không gian và định hướng',
      'Lập kế hoạch trước khi hành động',
      'Kiên trì, không bỏ cuộc',
      'Giải quyết vấn đề',
    ],
    educationalBasis:
      'Rèn khả năng định hướng không gian và lập kế hoạch (planning) — các chức năng điều hành của thùy trán, giúp trẻ biết suy nghĩ trước khi làm.',
    suitableAge: '4–9 tuổi',
  },
  {
    key: 'spot_diff',
    module: 'play',
    name: 'Tìm điểm khác biệt',
    howToPlay:
      'Bé so sánh hai bức tranh gần giống nhau và tìm ra những điểm khác biệt giữa chúng.',
    skills: [
      'Quan sát tỉ mỉ, chú ý chi tiết',
      'Chú ý chọn lọc (selective attention)',
      'So sánh và đối chiếu',
      'Kiên nhẫn, bền bỉ',
    ],
    educationalBasis:
      'Rèn chú ý chọn lọc và tri giác thị giác — kỹ năng nền giúp trẻ đọc kỹ, phát hiện lỗi và tập trung lâu hơn trong học tập.',
    suitableAge: '4–9 tuổi',
  },
];

/** Tra cứu mô tả một loại trò chơi theo mã. */
export function getGameTypeInfo(key: string): GameTypeInfo | undefined {
  return GAME_TYPE_CATALOG.find((item) => item.key === key);
}
