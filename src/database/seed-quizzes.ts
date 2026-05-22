import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const RESET = process.argv.includes('--reset');

const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../modules/**/*.entity.{ts,js}')],
  synchronize: false,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizType = 'single_choice' | 'multiple_choice' | 'true_false' | 'drag_drop';

type QuizSeed = {
  questionText: string;
  questionType: QuizType;
  optionsJson?: { key: string; text: string }[];
  correctAnswerJson: unknown;
  explanation?: string;
  points?: number;
};

type LessonQuizMap = {
  lessonSlug: string;
  quizzes: QuizSeed[];
};

// ─── Quiz data per lesson ─────────────────────────────────────────────────────

const QUIZ_DATA: LessonQuizMap[] = [
  // ── TOÁN HỌC ─────────────────────────────────────────────────────────────

  {
    lessonSlug: 'so-1-2-3-nhung-nguoi-ban-dau-tien',
    quizzes: [
      {
        questionText: 'Con vịt nào mang số 2?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '1 con vịt' },
          { key: 'B', text: '2 con vịt' },
          { key: 'C', text: '3 con vịt' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Số 2 tương ứng với 2 con vịt.',
      },
      {
        questionText: 'Số 3 lớn hơn số 1 đúng không?',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: '3 > 1, nên đúng.',
      },
      {
        questionText: 'Sắp xếp thứ tự đúng từ nhỏ đến lớn',
        questionType: 'drag_drop',
        optionsJson: [
          { key: '1', text: '3' },
          { key: '2', text: '1' },
          { key: '3', text: '2' },
        ],
        correctAnswerJson: ['2', '3', '1'],
        explanation: '1 → 2 → 3 là thứ tự từ nhỏ đến lớn.',
      },
    ],
  },

  {
    lessonSlug: 'dem-den-5-cung-nhung-chu-vit',
    quizzes: [
      {
        questionText: 'Có mấy con vịt trong đàn: 🦆🦆🦆🦆🦆?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '4' },
          { key: 'B', text: '5' },
          { key: 'C', text: '6' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Đếm từng con: 1, 2, 3, 4, 5.',
      },
      {
        questionText: 'Số đứng ngay sau số 4 là số mấy?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '3' },
          { key: 'B', text: '5' },
          { key: 'C', text: '6' },
        ],
        correctAnswerJson: 'B',
        explanation: '4 + 1 = 5.',
      },
    ],
  },

  {
    lessonSlug: 'so-6-7-8-doi-quan-ong-mat',
    quizzes: [
      {
        questionText: '7 nằm giữa hai số nào?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '5 và 8' },
          { key: 'B', text: '6 và 8' },
          { key: 'C', text: '6 và 9' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Trên trục số: 6, 7, 8.',
      },
      {
        questionText: 'Số 8 lớn hơn số 6',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: '8 > 6.',
      },
    ],
  },

  {
    lessonSlug: 'so-9-va-10-dinh-cao-cua-dem-so',
    quizzes: [
      {
        questionText: 'Số lớn nhất trong nhóm: 7, 9, 10, 8 là số nào?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '9' },
          { key: 'B', text: '8' },
          { key: 'C', text: '10' },
        ],
        correctAnswerJson: 'C',
        explanation: '10 là số lớn nhất trong nhóm.',
      },
      {
        questionText: '10 - 1 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '8' },
          { key: 'B', text: '9' },
          { key: 'C', text: '11' },
        ],
        correctAnswerJson: 'B',
        explanation: '10 trừ 1 bằng 9.',
      },
    ],
  },

  {
    lessonSlug: 'so-sanh-nhieu-hon-it-hon',
    quizzes: [
      {
        questionText: 'Nhóm nào có nhiều hơn: 🍎🍎🍎 hay 🍊🍊?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '3 quả táo' },
          { key: 'B', text: '2 quả cam' },
          { key: 'C', text: 'Bằng nhau' },
        ],
        correctAnswerJson: 'A',
        explanation: '3 > 2, nên nhóm táo nhiều hơn.',
      },
      {
        questionText: '5 ít hơn 3',
        questionType: 'true_false',
        correctAnswerJson: false,
        explanation: '5 > 3, không phải ít hơn.',
      },
    ],
  },

  {
    lessonSlug: 'cong-don-gian-voi-ngon-tay',
    quizzes: [
      {
        questionText: '3 + 2 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '4' },
          { key: 'B', text: '5' },
          { key: 'C', text: '6' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Dùng ngón tay: 3 và thêm 2 bằng 5.',
      },
      {
        questionText: '1 + 4 = 5',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: '1 cộng 4 bằng 5.',
      },
      {
        questionText: '2 + 2 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '3' },
          { key: 'B', text: '4' },
          { key: 'C', text: '5' },
        ],
        correctAnswerJson: 'B',
        explanation: '2 + 2 = 4.',
      },
    ],
  },

  {
    lessonSlug: 'tru-vui-ve-chia-keo-cho-ban',
    quizzes: [
      {
        questionText: '5 - 3 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '1' },
          { key: 'B', text: '2' },
          { key: 'C', text: '3' },
        ],
        correctAnswerJson: 'B',
        explanation: '5 bớt 3 còn 2.',
      },
      {
        questionText: 'Bé có 4 cái kẹo, cho bạn 2 cái. Bé còn mấy cái?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '1' },
          { key: 'B', text: '2' },
          { key: 'C', text: '3' },
        ],
        correctAnswerJson: 'B',
        explanation: '4 - 2 = 2.',
      },
    ],
  },

  {
    lessonSlug: 'nhan-biet-so-tren-dong-ho',
    quizzes: [
      {
        questionText: 'Trên mặt đồng hồ có bao nhiêu con số?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '10' },
          { key: 'B', text: '11' },
          { key: 'C', text: '12' },
        ],
        correctAnswerJson: 'C',
        explanation: 'Đồng hồ có 12 số từ 1 đến 12.',
      },
      {
        questionText: 'Kim ngắn chỉ giờ, kim dài chỉ phút',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Đúng vậy.',
      },
    ],
  },

  {
    lessonSlug: 'so-chan-va-so-le',
    quizzes: [
      {
        questionText: 'Số nào là số chẵn?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '3' },
          { key: 'B', text: '5' },
          { key: 'C', text: '8' },
        ],
        correctAnswerJson: 'C',
        explanation: '8 chia hết cho 2 nên là số chẵn.',
      },
      {
        questionText: 'Số 7 là số lẻ',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: '7 không chia hết cho 2.',
      },
      {
        questionText: 'Chọn TẤT CẢ số chẵn trong nhóm: 1, 2, 4, 7',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: '1' },
          { key: 'B', text: '2' },
          { key: 'C', text: '4' },
          { key: 'D', text: '7' },
        ],
        correctAnswerJson: ['B', 'C'],
        explanation: '2 và 4 là số chẵn.',
      },
    ],
  },

  {
    lessonSlug: 'phep-cong-ket-qua-den-20',
    quizzes: [
      {
        questionText: '12 + 5 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '16' },
          { key: 'B', text: '17' },
          { key: 'C', text: '18' },
        ],
        correctAnswerJson: 'B',
        explanation: '12 + 5 = 17.',
      },
      {
        questionText: '10 + 10 = 20',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: '10 + 10 = 20.',
      },
    ],
  },

  {
    lessonSlug: 'phep-tru-trong-pham-vi-20',
    quizzes: [
      {
        questionText: '15 - 7 = ?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '7' },
          { key: 'B', text: '8' },
          { key: 'C', text: '9' },
        ],
        correctAnswerJson: 'B',
        explanation: '15 - 7 = 8.',
      },
      {
        questionText: '20 - 20 = 0',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Bất kỳ số nào trừ chính nó đều bằng 0.',
      },
    ],
  },

  // ── ĐỌC - VIẾT ────────────────────────────────────────────────────────────

  {
    lessonSlug: 'chao-bang-chu-cai-a-b-c',
    quizzes: [
      {
        questionText: 'Chữ cái nào đứng đầu tiên trong bảng chữ cái tiếng Việt?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'A' },
          { key: 'B', text: 'B' },
          { key: 'C', text: 'C' },
        ],
        correctAnswerJson: 'A',
        explanation: 'A là chữ cái đầu tiên.',
      },
      {
        questionText: 'Chữ B và chữ C đều là phụ âm',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'B và C là phụ âm, khác với nguyên âm A, E, I, O, U.',
      },
    ],
  },

  {
    lessonSlug: 'van-an-an-an-ghep-van-dau-tien',
    quizzes: [
      {
        questionText: 'Từ nào có vần AN?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'con mèo' },
          { key: 'B', text: 'bàn ăn' },
          { key: 'C', text: 'quả cam' },
        ],
        correctAnswerJson: 'B',
        explanation: '"Bàn" có vần AN.',
      },
      {
        questionText: '"Con lăn" có vần ĂN',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'lăn = l + ĂN.',
      },
    ],
  },

  {
    lessonSlug: 'tu-don-gian-con-vat-quen-thuoc',
    quizzes: [
      {
        questionText: 'Con vật nào kêu "gâu gâu"?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Mèo' },
          { key: 'B', text: 'Chó' },
          { key: 'C', text: 'Gà' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Chó kêu "gâu gâu".',
      },
      {
        questionText: '"Con bò" có mấy chữ cái?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '4' },
          { key: 'B', text: '5' },
          { key: 'C', text: '6' },
        ],
        correctAnswerJson: 'C',
        explanation: 'c-o-n-b-ò: đếm ký tự (không tính dấu cách): 6.',
      },
    ],
  },

  {
    lessonSlug: 'thanh-dieu-sau-not-nhac',
    quizzes: [
      {
        questionText: 'Tiếng Việt có mấy thanh điệu?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '5' },
          { key: 'B', text: '6' },
          { key: 'C', text: '7' },
        ],
        correctAnswerJson: 'B',
        explanation: '6 thanh: ngang, huyền, sắc, hỏi, ngã, nặng.',
      },
      {
        questionText: 'Thanh sắc có dấu (/) nghiêng lên trên',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Đúng, dấu sắc là /.',
      },
    ],
  },

  {
    lessonSlug: 'doc-tu-ghep-ket-hop-hai-tu-don',
    quizzes: [
      {
        questionText: '"Nhà" + "trường" tạo thành từ ghép nào?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'nhà ở' },
          { key: 'B', text: 'nhà trường' },
          { key: 'C', text: 'trường học' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Ghép hai từ "nhà" và "trường" thành "nhà trường".',
      },
    ],
  },

  {
    lessonSlug: 'tu-trai-nghia-to-nho',
    quizzes: [
      {
        questionText: 'Từ trái nghĩa của "to" là gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'lớn' },
          { key: 'B', text: 'nhỏ' },
          { key: 'C', text: 'dài' },
        ],
        correctAnswerJson: 'B',
        explanation: 'To ↔ nhỏ.',
      },
      {
        questionText: 'Từ trái nghĩa của "ngày" là "đêm"',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Ngày ↔ đêm.',
      },
      {
        questionText: 'Chọn tất cả các cặp trái nghĩa đúng',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: 'nóng - lạnh' },
          { key: 'B', text: 'nhanh - chậm' },
          { key: 'C', text: 'mèo - chó' },
          { key: 'D', text: 'dài - ngắn' },
        ],
        correctAnswerJson: ['A', 'B', 'D'],
        explanation: 'nóng-lạnh, nhanh-chậm, dài-ngắn là các cặp trái nghĩa.',
      },
    ],
  },

  // ── MÀU SẮC & SÁNG TẠO ────────────────────────────────────────────────────

  {
    lessonSlug: 'do-vang-xanh-ba-mau-ky-dieu',
    quizzes: [
      {
        questionText: 'Màu nào trong ba màu cơ bản: đỏ, vàng và ___?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'tím' },
          { key: 'B', text: 'xanh' },
          { key: 'C', text: 'cam' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Ba màu cơ bản: đỏ, vàng, xanh.',
      },
      {
        questionText: 'Cỏ có màu xanh lá',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Đúng, cỏ màu xanh lá cây.',
      },
    ],
  },

  {
    lessonSlug: 'pha-mau-ky-dieu',
    quizzes: [
      {
        questionText: 'Trộn màu đỏ + màu vàng ra màu gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Xanh lá' },
          { key: 'B', text: 'Cam' },
          { key: 'C', text: 'Tím' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Đỏ + Vàng = Cam.',
      },
      {
        questionText: 'Trộn màu xanh + vàng ra màu xanh lá',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Xanh dương + Vàng = Xanh lá.',
      },
    ],
  },

  {
    lessonSlug: 'hinh-tron-vuong-tam-giac',
    quizzes: [
      {
        questionText: 'Hình nào có 3 cạnh?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Hình tròn' },
          { key: 'B', text: 'Hình vuông' },
          { key: 'C', text: 'Hình tam giác' },
        ],
        correctAnswerJson: 'C',
        explanation: 'Hình tam giác có 3 cạnh và 3 góc.',
      },
      {
        questionText: 'Hình tròn không có góc',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Đúng, hình tròn không có góc hay cạnh thẳng.',
      },
    ],
  },

  {
    lessonSlug: 'doi-xung-hai-nua-bang-nhau',
    quizzes: [
      {
        questionText: 'Hình nào có trục đối xứng?',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: 'Hình tròn' },
          { key: 'B', text: 'Hình vuông' },
          { key: 'C', text: 'Hình tam giác cân' },
          { key: 'D', text: 'Hình chữ L' },
        ],
        correctAnswerJson: ['A', 'B', 'C'],
        explanation: 'Tròn, vuông và tam giác cân đều có ít nhất 1 trục đối xứng.',
      },
    ],
  },

  // ── CẢM XÚC ────────────────────────────────────────────────────────────────

  {
    lessonSlug: 'vui-khi-nao-be-cam-thay-vui',
    quizzes: [
      {
        questionText: 'Bé cảm thấy vui khi nào trong những tình huống dưới đây?',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: 'Được tặng quà' },
          { key: 'B', text: 'Bị ngã đau' },
          { key: 'C', text: 'Chơi với bạn bè' },
          { key: 'D', text: 'Hoàn thành bài tập' },
        ],
        correctAnswerJson: ['A', 'C', 'D'],
        explanation: 'Những tình huống tích cực thường mang lại niềm vui.',
      },
      {
        questionText: 'Khi vui, nụ cười xuất hiện trên khuôn mặt',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Đúng, nụ cười là biểu hiện của niềm vui.',
      },
    ],
  },

  {
    lessonSlug: 'buon-khong-sao-buon-la-binh-thuong',
    quizzes: [
      {
        questionText: 'Khi buồn, bé nên làm gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Giữ buồn trong lòng mãi' },
          { key: 'B', text: 'Nói chuyện với người thân' },
          { key: 'C', text: 'Tức giận với mọi người' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Chia sẻ cảm xúc giúp bé cảm thấy nhẹ hơn.',
      },
    ],
  },

  {
    lessonSlug: 'tuc-gian-lam-gi-khi-nong-gian',
    quizzes: [
      {
        questionText: 'Khi tức giận, bé nên làm gì đầu tiên?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Đánh bạn' },
          { key: 'B', text: 'Hít thở sâu và đếm đến 10' },
          { key: 'C', text: 'Ném đồ vật' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Hít thở sâu giúp bình tĩnh lại.',
      },
      {
        questionText: 'Tức giận là cảm xúc xấu, không được phép có',
        questionType: 'true_false',
        correctAnswerJson: false,
        explanation: 'Mọi cảm xúc đều tự nhiên. Quan trọng là cách bé xử lý.',
      },
    ],
  },

  {
    lessonSlug: 'biet-on-noi-loi-cam-on-tu-trai-tim',
    quizzes: [
      {
        questionText: 'Khi nào bé nên nói "cảm ơn"?',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: 'Khi được tặng quà' },
          { key: 'B', text: 'Khi bạn giúp đỡ mình' },
          { key: 'C', text: 'Khi bị ai đó la mắng' },
          { key: 'D', text: 'Khi thầy cô khen ngợi' },
        ],
        correctAnswerJson: ['A', 'B', 'D'],
        explanation: 'Nói cảm ơn khi nhận được điều tốt đẹp từ người khác.',
      },
    ],
  },

  {
    lessonSlug: 'tu-kiem-soat-cam-xuc',
    quizzes: [
      {
        questionText: 'Bài tập hít thở 4-7-8 nghĩa là hít vào mấy giây?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '4 giây' },
          { key: 'B', text: '7 giây' },
          { key: 'C', text: '8 giây' },
        ],
        correctAnswerJson: 'A',
        explanation: 'Hít vào 4 giây, nín thở 7 giây, thở ra 8 giây.',
      },
      {
        questionText: 'Tự kiểm soát cảm xúc giúp bé suy nghĩ sáng suốt hơn',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Khi bình tĩnh, bé suy nghĩ và quyết định tốt hơn.',
      },
    ],
  },

  // ── TƯ DUY LOGIC ───────────────────────────────────────────────────────────

  {
    lessonSlug: 'phan-loai-do-vat-cai-nay-thuoc-nhom-nao',
    quizzes: [
      {
        questionText: 'Con vật nào KHÔNG thuộc nhóm động vật bay?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Chim' },
          { key: 'B', text: 'Bướm' },
          { key: 'C', text: 'Cá' },
        ],
        correctAnswerJson: 'C',
        explanation: 'Cá sống dưới nước, không biết bay.',
      },
      {
        questionText: 'Táo, chuối, cam đều thuộc nhóm rau củ',
        questionType: 'true_false',
        correctAnswerJson: false,
        explanation: 'Táo, chuối, cam là trái cây, không phải rau củ.',
      },
    ],
  },

  {
    lessonSlug: 'quy-luat-mau-sac-tiep-theo-la-gi',
    quizzes: [
      {
        questionText: 'Dãy: đỏ, xanh, đỏ, xanh, ___. Tiếp theo là màu gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Vàng' },
          { key: 'B', text: 'Đỏ' },
          { key: 'C', text: 'Tím' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Quy luật lặp: đỏ-xanh-đỏ-xanh → tiếp theo là đỏ.',
      },
    ],
  },

  {
    lessonSlug: 'me-cung-cap-1-duong-ve-nha',
    quizzes: [
      {
        questionText: 'Khi đi mê cung, bé nên làm gì khi gặp ngõ cụt?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Bỏ cuộc' },
          { key: 'B', text: 'Quay lại và thử đường khác' },
          { key: 'C', text: 'Đi xuyên qua tường' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Thử sai và quay lại là cách giải mê cung hiệu quả.',
      },
    ],
  },

  {
    lessonSlug: 'doi-lap-dieu-nguoc-lai-la-gi',
    quizzes: [
      {
        questionText: 'Điều ngược lại của "nhanh" là gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Dài' },
          { key: 'B', text: 'Chậm' },
          { key: 'C', text: 'Cao' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Nhanh ↔ chậm.',
      },
      {
        questionText: 'Điều ngược lại của "ban ngày" là "ban đêm"',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Ngày ↔ đêm.',
      },
    ],
  },

  {
    lessonSlug: 'loai-bo-cai-nao-khong-thuoc-nhom',
    quizzes: [
      {
        questionText: 'Chọn vật KHÔNG thuộc nhóm: táo, chuối, cam, cà rốt',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Táo' },
          { key: 'B', text: 'Chuối' },
          { key: 'C', text: 'Cà rốt' },
        ],
        correctAnswerJson: 'C',
        explanation: 'Cà rốt là rau củ, còn lại là trái cây.',
      },
    ],
  },

  {
    lessonSlug: 'suy-luan-nhan-qua',
    quizzes: [
      {
        questionText: 'Nếu trời mưa thì...?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Bầu trời sẽ nắng' },
          { key: 'B', text: 'Mặt đường sẽ ướt' },
          { key: 'C', text: 'Hoa sẽ héo' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Mưa làm mặt đường ướt.',
      },
      {
        questionText: 'Nếu bé không ngủ đủ giấc thì bé sẽ mệt mỏi hơn',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Giấc ngủ đủ giúp bé có năng lượng.',
      },
    ],
  },

  // ── TIẾNG ANH ─────────────────────────────────────────────────────────────

  {
    lessonSlug: 'hello-xin-chao-bang-tieng-anh',
    quizzes: [
      {
        questionText: '"Hello" có nghĩa là gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Tạm biệt' },
          { key: 'B', text: 'Xin chào' },
          { key: 'C', text: 'Cảm ơn' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Hello = Xin chào.',
      },
      {
        questionText: '"Goodbye" nghĩa là tạm biệt',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Goodbye = Tạm biệt.',
      },
    ],
  },

  {
    lessonSlug: 'colors-hoc-mau-sac-bang-tieng-anh',
    quizzes: [
      {
        questionText: '"Red" là màu gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Xanh' },
          { key: 'B', text: 'Đỏ' },
          { key: 'C', text: 'Vàng' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Red = Đỏ.',
      },
      {
        questionText: '"Yellow" là màu vàng',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Yellow = Vàng.',
      },
      {
        questionText: 'Chọn TẤT CẢ màu xanh trong tiếng Anh',
        questionType: 'multiple_choice',
        optionsJson: [
          { key: 'A', text: 'Blue' },
          { key: 'B', text: 'Green' },
          { key: 'C', text: 'Red' },
          { key: 'D', text: 'Purple' },
        ],
        correctAnswerJson: ['A', 'B'],
        explanation: 'Blue = xanh dương, Green = xanh lá.',
      },
    ],
  },

  {
    lessonSlug: 'numbers-1-10-dem-bang-tieng-anh',
    quizzes: [
      {
        questionText: '"Five" là số mấy?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: '4' },
          { key: 'B', text: '5' },
          { key: 'C', text: '6' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Five = 5.',
      },
      {
        questionText: '"Ten" là số 10',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Ten = 10.',
      },
    ],
  },

  {
    lessonSlug: 'animals-nhung-nguoi-ban-dong-vat',
    quizzes: [
      {
        questionText: '"Dog" là con gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Mèo' },
          { key: 'B', text: 'Chó' },
          { key: 'C', text: 'Gà' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Dog = Chó.',
      },
      {
        questionText: '"Cat" là con mèo',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Cat = Mèo.',
      },
    ],
  },

  {
    lessonSlug: 'greetings-good-morning',
    quizzes: [
      {
        questionText: 'Buổi sáng, bé nói gì bằng tiếng Anh?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Good night' },
          { key: 'B', text: 'Good morning' },
          { key: 'C', text: 'Good afternoon' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Good morning = Chào buổi sáng.',
      },
      {
        questionText: '"Good night" là lời chào buổi tối',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Good night = Chúc ngủ ngon / chào buổi tối.',
      },
    ],
  },

  {
    lessonSlug: 'action-verbs-jump-run-clap',
    quizzes: [
      {
        questionText: '"Jump" nghĩa là gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Chạy' },
          { key: 'B', text: 'Nhảy' },
          { key: 'C', text: 'Vỗ tay' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Jump = Nhảy.',
      },
      {
        questionText: '"Run" là chạy và "Clap" là vỗ tay',
        questionType: 'true_false',
        correctAnswerJson: true,
        explanation: 'Run = chạy, Clap = vỗ tay.',
      },
    ],
  },

  {
    lessonSlug: 'opposites-big-and-small',
    quizzes: [
      {
        questionText: '"Big" và "Small" là cặp từ gì?',
        questionType: 'single_choice',
        optionsJson: [
          { key: 'A', text: 'Đồng nghĩa' },
          { key: 'B', text: 'Trái nghĩa' },
          { key: 'C', text: 'Cùng nghĩa' },
        ],
        correctAnswerJson: 'B',
        explanation: 'Big (to) và Small (nhỏ) là trái nghĩa.',
      },
    ],
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  await ds.initialize();
  console.log('✅ DB connected');

  if (RESET) {
    await ds.query('DELETE FROM quizzes');
    console.log('🗑️  Đã xoá toàn bộ quizzes');
  }

  const lessonRepo = ds.getRepository('lessons');
  const quizRepo = ds.getRepository('quizzes');

  let created = 0;
  let skipped = 0;

  for (const map of QUIZ_DATA) {
    // Try exact slug, then partial match
    let lesson = await lessonRepo.findOne({ where: { slug: map.lessonSlug } });

    if (!lesson) {
      // Partial slug match (lesson slug may have been generated differently)
      const all = await lessonRepo
        .createQueryBuilder('l')
        .where('l.slug LIKE :s', { s: `%${map.lessonSlug.slice(0, 12)}%` })
        .getOne();
      lesson = all ?? null;
    }

    if (!lesson) {
      console.log(`⚠️  Không tìm thấy bài học slug="${map.lessonSlug}", bỏ qua`);
      skipped++;
      continue;
    }

    for (let i = 0; i < map.quizzes.length; i++) {
      const q = map.quizzes[i];
      const existing = await quizRepo.findOne({
        where: { lessonId: lesson.id, questionText: q.questionText },
      });
      if (existing) continue;

      await quizRepo.save(
        quizRepo.create({
          lessonId: lesson.id,
          questionText: q.questionText,
          questionType: q.questionType,
          optionsJson: q.optionsJson ?? null,
          correctAnswerJson: q.correctAnswerJson,
          explanation: q.explanation ?? null,
          points: q.points ?? 10,
          sortOrder: i + 1,
          isActive: true,
        }),
      );
      created++;
    }
    console.log(`📝 [${lesson.slug}] → ${map.quizzes.length} câu hỏi`);
  }

  console.log(`\n✅ Hoàn thành: tạo ${created} quiz, bỏ qua ${skipped} bài không tìm thấy`);
  await ds.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
