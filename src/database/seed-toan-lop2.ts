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

const COURSE_SLUG = 'toan-lop-2';

type LessonSeed = {
  title: string;
  slug: string;
  lessonType: 'interactive' | 'quiz' | 'story' | 'video' | 'game';
  sortOrder: number;
  durationMinutes: number;
  content: string;
};

// Tập 1: sortOrder 1-36 — 7 chủ đề
// Tập 2: sortOrder 37-73 — 7 chủ đề
const LESSONS: LessonSeed[] = [
  // ─── TẬP 1 ────────────────────────────────────────────────────────────────
  // Chủ đề 1: Ôn tập và bổ sung (Bài 1-6)
  { title: 'Bài 1: Ôn tập các số đến 100', slug: 'on-tap-cac-so-den-100', lessonType: 'interactive', sortOrder: 1, durationMinutes: 15, content: 'Bé ôn lại cách đọc, viết và so sánh các số từ 0 đến 100. Luyện tập thứ tự số và điền số còn thiếu trong dãy số.' },
  { title: 'Bài 2: Tia số. Số liền trước, số liền sau', slug: 'tia-so-so-lien-truoc-lien-sau', lessonType: 'interactive', sortOrder: 2, durationMinutes: 15, content: 'Bé học biểu diễn số trên tia số và xác định số liền trước, số liền sau của một số bất kỳ trong phạm vi 100.' },
  { title: 'Bài 3: Các thành phần của phép cộng, phép trừ', slug: 'cac-thanh-phan-phep-cong-phep-tru', lessonType: 'interactive', sortOrder: 3, durationMinutes: 15, content: 'Bé học tên gọi các thành phần trong phép cộng (số hạng, tổng) và phép trừ (số bị trừ, số trừ, hiệu).' },
  { title: 'Bài 4: Hơn, kém nhau bao nhiêu', slug: 'hon-kem-nhau-bao-nhieu', lessonType: 'interactive', sortOrder: 4, durationMinutes: 15, content: 'Bé học cách so sánh hai số và tìm hiệu số: một số hơn hay kém số kia bao nhiêu đơn vị.' },
  { title: 'Bài 5: Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100', slug: 'on-tap-phep-cong-tru-khong-nho-100', lessonType: 'interactive', sortOrder: 5, durationMinutes: 15, content: 'Bé ôn luyện tính nhẩm và đặt tính cộng, trừ các số trong phạm vi 100 không có nhớ.' },
  { title: 'Bài 6: Luyện tập chung', slug: 'luyen-tap-chung-1', lessonType: 'quiz', sortOrder: 6, durationMinutes: 15, content: 'Bé luyện tập tổng hợp các kiến thức đã học trong chủ đề 1 qua các bài tập đa dạng.' },

  // Chủ đề 2: Phép cộng, phép trừ trong phạm vi 20 (Bài 7-14)
  { title: 'Bài 7: Phép cộng (qua 10) trong phạm vi 20', slug: 'phep-cong-qua-10-pham-vi-20', lessonType: 'interactive', sortOrder: 7, durationMinutes: 15, content: 'Bé học cộng hai số có tổng trong phạm vi 20 với kỹ thuật qua 10, ví dụ: 8 + 5 = 8 + 2 + 3 = 13.' },
  { title: 'Bài 8: Bảng cộng (qua 10)', slug: 'bang-cong-qua-10', lessonType: 'interactive', sortOrder: 8, durationMinutes: 15, content: 'Bé học thuộc bảng cộng có kết quả từ 11 đến 20 qua các bài tập và trò chơi ghi nhớ.' },
  { title: 'Bài 9: Bài toán về thêm, bớt một số đơn vị', slug: 'bai-toan-ve-them-bot-mot-so-don-vi', lessonType: 'story', sortOrder: 9, durationMinutes: 15, content: 'Bé giải bài toán có lời văn về thêm và bớt một số đơn vị, biết tóm tắt và trình bày lời giải.' },
  { title: 'Bài 10: Luyện tập chung', slug: 'luyen-tap-chung-2', lessonType: 'quiz', sortOrder: 10, durationMinutes: 15, content: 'Bé luyện tập phép cộng qua 10 và bài toán có lời văn liên quan đến phép cộng trong phạm vi 20.' },
  { title: 'Bài 11: Phép trừ (qua 10) trong phạm vi 20', slug: 'phep-tru-qua-10-pham-vi-20', lessonType: 'interactive', sortOrder: 11, durationMinutes: 15, content: 'Bé học trừ với kỹ thuật qua 10 trong phạm vi 20, ví dụ: 15 - 7 = 15 - 5 - 2 = 8.' },
  { title: 'Bài 12: Bảng trừ (qua 10)', slug: 'bang-tru-qua-10', lessonType: 'interactive', sortOrder: 12, durationMinutes: 15, content: 'Bé học thuộc bảng trừ có số bị trừ từ 11 đến 20 qua bài tập luyện tập.' },
  { title: 'Bài 13: Bài toán về nhiều hơn, ít hơn một số đơn vị', slug: 'bai-toan-nhieu-hon-it-hon-mot-so-don-vi', lessonType: 'story', sortOrder: 13, durationMinutes: 15, content: 'Bé giải bài toán có lời văn về nhiều hơn và ít hơn một số đơn vị dạng tìm số lớn hoặc số bé.' },
  { title: 'Bài 14: Luyện tập chung', slug: 'luyen-tap-chung-3', lessonType: 'quiz', sortOrder: 14, durationMinutes: 15, content: 'Bé luyện tập phép trừ qua 10 và giải toán có lời văn về nhiều hơn, ít hơn.' },

  // Chủ đề 3: Làm quen với khối lượng, dung tích (Bài 15-18)
  { title: 'Bài 15: Ki-lô-gam', slug: 'ki-lo-gam', lessonType: 'interactive', sortOrder: 15, durationMinutes: 15, content: 'Bé làm quen với đơn vị đo khối lượng ki-lô-gam (kg), biết dùng cân để đo khối lượng đồ vật.' },
  { title: 'Bài 16: Lít', slug: 'lit', lessonType: 'interactive', sortOrder: 16, durationMinutes: 15, content: 'Bé làm quen với đơn vị đo dung tích lít (l), biết dùng ca, chai để đo dung tích chất lỏng.' },
  { title: 'Bài 17: Thực hành và trải nghiệm với các đơn vị ki-lô-gam, lít', slug: 'thuc-hanh-ki-lo-gam-lit', lessonType: 'game', sortOrder: 17, durationMinutes: 15, content: 'Bé thực hành ước lượng và so sánh khối lượng, dung tích của các đồ vật quen thuộc trong cuộc sống.' },
  { title: 'Bài 18: Luyện tập chung', slug: 'luyen-tap-chung-4', lessonType: 'quiz', sortOrder: 18, durationMinutes: 15, content: 'Bé luyện tập các bài toán về đo khối lượng (kg) và dung tích (lít).' },

  // Chủ đề 4: Phép cộng, phép trừ (có nhớ) trong phạm vi 100 (Bài 19-24)
  { title: 'Bài 19: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số', slug: 'phep-cong-co-nho-hai-chu-so-voi-mot-chu-so', lessonType: 'interactive', sortOrder: 19, durationMinutes: 15, content: 'Bé học cộng có nhớ: số có hai chữ số cộng số có một chữ số, ví dụ: 25 + 7 = 32.' },
  { title: 'Bài 20: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số', slug: 'phep-cong-co-nho-hai-chu-so-voi-hai-chu-so', lessonType: 'interactive', sortOrder: 20, durationMinutes: 15, content: 'Bé học cộng có nhớ hai số có hai chữ số, ví dụ: 35 + 48 = 83, biết đặt tính và tính đúng.' },
  { title: 'Bài 21: Luyện tập chung', slug: 'luyen-tap-chung-5', lessonType: 'quiz', sortOrder: 21, durationMinutes: 15, content: 'Bé luyện tập phép cộng có nhớ và giải toán có lời văn liên quan đến phép cộng.' },
  { title: 'Bài 22: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số', slug: 'phep-tru-co-nho-hai-chu-so-cho-mot-chu-so', lessonType: 'interactive', sortOrder: 22, durationMinutes: 15, content: 'Bé học trừ có nhớ: số có hai chữ số trừ số có một chữ số, ví dụ: 32 - 5 = 27.' },
  { title: 'Bài 23: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số', slug: 'phep-tru-co-nho-hai-chu-so-cho-hai-chu-so', lessonType: 'interactive', sortOrder: 23, durationMinutes: 15, content: 'Bé học trừ có nhớ hai số có hai chữ số, ví dụ: 83 - 48 = 35, biết đặt tính và kiểm tra.' },
  { title: 'Bài 24: Luyện tập chung', slug: 'luyen-tap-chung-6', lessonType: 'quiz', sortOrder: 24, durationMinutes: 15, content: 'Bé luyện tập phép trừ có nhớ và giải bài toán có lời văn liên quan đến phép trừ có nhớ.' },

  // Chủ đề 5: Làm quen với hình phẳng (Bài 25-28)
  { title: 'Bài 25: Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng', slug: 'diem-doan-thang-duong-thang-duong-cong', lessonType: 'interactive', sortOrder: 25, durationMinutes: 15, content: 'Bé học nhận biết điểm, đoạn thẳng, đường thẳng, đường cong và xác định ba điểm thẳng hàng.' },
  { title: 'Bài 26: Đường gấp khúc. Hình tứ giác', slug: 'duong-gap-khuc-hinh-tu-giac', lessonType: 'interactive', sortOrder: 26, durationMinutes: 15, content: 'Bé học vẽ và tính độ dài đường gấp khúc, nhận biết hình tứ giác và các dạng đặc biệt của nó.' },
  { title: 'Bài 27: Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng', slug: 'thuc-hanh-gap-cat-ghep-xep-hinh-ve-doan-thang', lessonType: 'game', sortOrder: 27, durationMinutes: 15, content: 'Bé thực hành gấp, cắt giấy tạo hình, ghép các hình cơ bản thành hình mới và vẽ đoạn thẳng.' },
  { title: 'Bài 28: Luyện tập chung', slug: 'luyen-tap-chung-7', lessonType: 'quiz', sortOrder: 28, durationMinutes: 15, content: 'Bé luyện tập nhận biết hình phẳng, tính độ dài đường gấp khúc và vẽ hình.' },

  // Chủ đề 6: Ngày - giờ, giờ - phút, ngày - tháng (Bài 29-32)
  { title: 'Bài 29: Ngày - giờ, giờ - phút', slug: 'ngay-gio-gio-phut', lessonType: 'interactive', sortOrder: 29, durationMinutes: 15, content: 'Bé học đọc giờ trên đồng hồ chính xác đến phút, biết quan hệ giữa giờ và phút (1 giờ = 60 phút).' },
  { title: 'Bài 30: Ngày - tháng', slug: 'ngay-thang', lessonType: 'interactive', sortOrder: 30, durationMinutes: 15, content: 'Bé học đọc ngày, tháng trên lịch; biết 1 tuần có 7 ngày, 1 năm có 12 tháng; biết số ngày trong mỗi tháng.' },
  { title: 'Bài 31: Thực hành và trải nghiệm xem đồng hồ, xem lịch', slug: 'thuc-hanh-xem-dong-ho-xem-lich', lessonType: 'game', sortOrder: 31, durationMinutes: 15, content: 'Bé thực hành xem giờ trên đồng hồ kim và đồng hồ số, xem lịch và trả lời câu hỏi thực tế.' },
  { title: 'Bài 32: Luyện tập chung', slug: 'luyen-tap-chung-8', lessonType: 'quiz', sortOrder: 32, durationMinutes: 15, content: 'Bé luyện tập xem đồng hồ, xem lịch và giải bài toán thực tế về thời gian.' },

  // Chủ đề 7: Ôn tập học kỳ 1 (Bài 33-36)
  { title: 'Bài 33: Ôn tập phép cộng, phép trừ trong phạm vi 20, 100', slug: 'on-tap-phep-cong-tru-pham-vi-20-100', lessonType: 'interactive', sortOrder: 33, durationMinutes: 20, content: 'Bé ôn tập toàn bộ các phép cộng và phép trừ đã học trong học kỳ 1, từ phạm vi 20 đến 100.' },
  { title: 'Bài 34: Ôn tập hình phẳng', slug: 'on-tap-hinh-phang', lessonType: 'interactive', sortOrder: 34, durationMinutes: 20, content: 'Bé ôn tập nhận biết và phân loại các hình phẳng: đường thẳng, đường gấp khúc, hình tứ giác, tứ giác đặc biệt.' },
  { title: 'Bài 35: Ôn tập đo lường', slug: 'on-tap-do-luong', lessonType: 'interactive', sortOrder: 35, durationMinutes: 20, content: 'Bé ôn tập các đơn vị đo khối lượng (kg), dung tích (lít) và thời gian (giờ, phút, ngày, tháng).' },
  { title: 'Bài 36: Ôn tập chung học kỳ 1', slug: 'on-tap-chung-hk1', lessonType: 'quiz', sortOrder: 36, durationMinutes: 20, content: 'Bài kiểm tra tổng hợp cuối học kỳ 1: bao gồm số học, phép tính, đo lường và hình học.' },

  // ─── TẬP 2 ────────────────────────────────────────────────────────────────
  // Chủ đề 8: Phép nhân, phép chia (Bài 37-45)
  { title: 'Bài 37: Phép nhân', slug: 'phep-nhan', lessonType: 'interactive', sortOrder: 37, durationMinutes: 15, content: 'Bé làm quen với phép nhân qua các tổng nhiều số hạng bằng nhau: 2 + 2 + 2 = 2 × 3.' },
  { title: 'Bài 38: Thừa số, tích', slug: 'thua-so-tich', lessonType: 'interactive', sortOrder: 38, durationMinutes: 15, content: 'Bé học tên gọi các thành phần trong phép nhân: thừa số và tích; hiểu ý nghĩa của phép nhân.' },
  { title: 'Bài 39: Bảng nhân 2', slug: 'bang-nhan-2', lessonType: 'interactive', sortOrder: 39, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 2 từ 2 × 1 đến 2 × 10 qua các trò chơi ghi nhớ vui nhộn.' },
  { title: 'Bài 40: Bảng nhân 5', slug: 'bang-nhan-5', lessonType: 'interactive', sortOrder: 40, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 5 từ 5 × 1 đến 5 × 10 và áp dụng vào giải toán có lời văn.' },
  { title: 'Bài 41: Phép chia', slug: 'phep-chia', lessonType: 'interactive', sortOrder: 41, durationMinutes: 15, content: 'Bé làm quen với phép chia qua chia đều: chia 6 vật thành 3 nhóm bằng nhau, mỗi nhóm có 2 vật.' },
  { title: 'Bài 42: Số bị chia, số chia, thương', slug: 'so-bi-chia-so-chia-thuong', lessonType: 'interactive', sortOrder: 42, durationMinutes: 15, content: 'Bé học tên gọi các thành phần trong phép chia: số bị chia, số chia, thương và mối quan hệ với phép nhân.' },
  { title: 'Bài 43: Bảng chia 2', slug: 'bang-chia-2', lessonType: 'interactive', sortOrder: 43, durationMinutes: 15, content: 'Bé học bảng chia 2 từ bảng nhân 2, hiểu mối quan hệ ngược giữa nhân và chia.' },
  { title: 'Bài 44: Bảng chia 5', slug: 'bang-chia-5', lessonType: 'interactive', sortOrder: 44, durationMinutes: 15, content: 'Bé học bảng chia 5 từ bảng nhân 5 và thực hành giải các bài toán chia đều.' },
  { title: 'Bài 45: Luyện tập chung - Phép nhân, phép chia', slug: 'luyen-tap-chung-phep-nhan-phep-chia', lessonType: 'quiz', sortOrder: 45, durationMinutes: 15, content: 'Bé luyện tập phép nhân và phép chia trong bảng 2 và 5, giải toán có lời văn.' },

  // Chủ đề 9: Làm quen với hình khối (Bài 46-47)
  { title: 'Bài 46: Khối trụ, khối cầu', slug: 'khoi-tru-khoi-cau', lessonType: 'interactive', sortOrder: 46, durationMinutes: 15, content: 'Bé nhận biết hình dạng khối trụ và khối cầu qua các vật thể quen thuộc như lon nước, quả bóng.' },
  { title: 'Bài 47: Luyện tập chung - Khối trụ, khối cầu', slug: 'luyen-tap-chung-khoi-tru-khoi-cau', lessonType: 'quiz', sortOrder: 47, durationMinutes: 15, content: 'Bé luyện tập phân biệt khối trụ và khối cầu với các hình khối đã học trước đó.' },

  // Chủ đề 10: Các số trong phạm vi 1000 (Bài 48-54)
  { title: 'Bài 48: Đơn vị, chục, trăm, nghìn', slug: 'don-vi-chuc-tram-nghin', lessonType: 'interactive', sortOrder: 48, durationMinutes: 15, content: 'Bé học cấu tạo số theo đơn vị, chục, trăm, nghìn; hiểu 10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn.' },
  { title: 'Bài 49: Các số tròn trăm, tròn chục', slug: 'cac-so-tron-tram-tron-chuc', lessonType: 'interactive', sortOrder: 49, durationMinutes: 15, content: 'Bé học đọc, viết và nhận biết các số tròn trăm (100, 200,…, 900) và tròn chục trong phạm vi 1000.' },
  { title: 'Bài 50: So sánh các số tròn trăm, tròn chục', slug: 'so-sanh-cac-so-tron-tram-tron-chuc', lessonType: 'interactive', sortOrder: 50, durationMinutes: 15, content: 'Bé so sánh các số tròn trăm và tròn chục bằng cách so sánh từng hàng số.' },
  { title: 'Bài 51: Số có ba chữ số', slug: 'so-co-ba-chu-so', lessonType: 'interactive', sortOrder: 51, durationMinutes: 15, content: 'Bé học đọc và viết các số có ba chữ số từ 100 đến 999, phân tích cấu tạo hàng trăm, hàng chục, hàng đơn vị.' },
  { title: 'Bài 52: Viết số thành tổng các trăm, chục, đơn vị', slug: 'viet-so-thanh-tong-tram-chuc-don-vi', lessonType: 'interactive', sortOrder: 52, durationMinutes: 15, content: 'Bé học phân tích số có ba chữ số thành tổng các trăm, chục, đơn vị. Ví dụ: 345 = 300 + 40 + 5.' },
  { title: 'Bài 53: So sánh các số có ba chữ số', slug: 'so-sanh-cac-so-co-ba-chu-so', lessonType: 'interactive', sortOrder: 53, durationMinutes: 15, content: 'Bé so sánh hai số có ba chữ số bằng cách so sánh lần lượt hàng trăm, hàng chục, hàng đơn vị.' },
  { title: 'Bài 54: Luyện tập chung - Các số trong phạm vi 1000', slug: 'luyen-tap-chung-so-pham-vi-1000', lessonType: 'quiz', sortOrder: 54, durationMinutes: 15, content: 'Bé luyện tập đọc, viết, so sánh và sắp xếp các số trong phạm vi 1000.' },

  // Chủ đề 11: Độ dài và đơn vị đo độ dài, tiền Việt Nam (Bài 55-58)
  { title: 'Bài 55: Đề-xi-mét. Mét. Ki-lô-mét', slug: 'de-xi-met-met-ki-lo-met', lessonType: 'interactive', sortOrder: 55, durationMinutes: 15, content: 'Bé học các đơn vị đo độ dài: đề-xi-mét (dm), mét (m) và ki-lô-mét (km); biết mối quan hệ giữa các đơn vị.' },
  { title: 'Bài 56: Giới thiệu tiền Việt Nam', slug: 'gioi-thieu-tien-viet-nam', lessonType: 'interactive', sortOrder: 56, durationMinutes: 15, content: 'Bé làm quen với các tờ tiền Việt Nam thông dụng, biết đọc mệnh giá và thực hiện tính toán đơn giản.' },
  { title: 'Bài 57: Thực hành và trải nghiệm đo độ dài', slug: 'thuc-hanh-trai-nghiem-do-do-dai', lessonType: 'game', sortOrder: 57, durationMinutes: 15, content: 'Bé thực hành đo độ dài các đồ vật bằng thước kẻ, ước lượng và so sánh độ dài trong thực tế.' },
  { title: 'Bài 58: Luyện tập chung - Độ dài và đơn vị đo độ dài. Tiền Việt Nam', slug: 'luyen-tap-chung-do-dai-tien-viet-nam', lessonType: 'quiz', sortOrder: 58, durationMinutes: 15, content: 'Bé luyện tập đổi đơn vị đo độ dài, tính tiền và giải bài toán mua bán thực tế.' },

  // Chủ đề 12: Phép cộng, phép trừ trong phạm vi 1000 (Bài 59-63)
  { title: 'Bài 59: Phép cộng (không nhớ) trong phạm vi 1000', slug: 'phep-cong-khong-nho-pham-vi-1000', lessonType: 'interactive', sortOrder: 59, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép cộng không nhớ các số trong phạm vi 1000.' },
  { title: 'Bài 60: Phép cộng (có nhớ) trong phạm vi 1000', slug: 'phep-cong-co-nho-pham-vi-1000', lessonType: 'interactive', sortOrder: 60, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép cộng có nhớ một lần các số trong phạm vi 1000.' },
  { title: 'Bài 61: Phép trừ (không nhớ) trong phạm vi 1000', slug: 'phep-tru-khong-nho-pham-vi-1000', lessonType: 'interactive', sortOrder: 61, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép trừ không nhớ các số trong phạm vi 1000.' },
  { title: 'Bài 62: Phép trừ (có nhớ) trong phạm vi 1000', slug: 'phep-tru-co-nho-pham-vi-1000', lessonType: 'interactive', sortOrder: 62, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép trừ có nhớ một lần các số trong phạm vi 1000.' },
  { title: 'Bài 63: Luyện tập chung - Phép cộng, phép trừ trong phạm vi 1000', slug: 'luyen-tap-chung-cong-tru-pham-vi-1000', lessonType: 'quiz', sortOrder: 63, durationMinutes: 15, content: 'Bé luyện tập phép cộng và trừ trong phạm vi 1000, giải toán có lời văn hai bước.' },

  // Chủ đề 13: Làm quen với yếu tố thống kê, xác suất (Bài 64-67)
  { title: 'Bài 64: Thu thập, phân loại, kiểm đếm số liệu', slug: 'thu-thap-phan-loai-kiem-dem-so-lieu', lessonType: 'interactive', sortOrder: 64, durationMinutes: 15, content: 'Bé học thu thập thông tin, phân loại và đếm số liệu đơn giản từ thực tế cuộc sống.' },
  { title: 'Bài 65: Biểu đồ tranh', slug: 'bieu-do-tranh', lessonType: 'interactive', sortOrder: 65, durationMinutes: 15, content: 'Bé học đọc và phân tích biểu đồ tranh đơn giản, trả lời câu hỏi dựa vào thông tin trong biểu đồ.' },
  { title: 'Bài 66: Chắc chắn, có thể, không thể', slug: 'chac-chan-co-the-khong-the', lessonType: 'interactive', sortOrder: 66, durationMinutes: 15, content: 'Bé làm quen với khái niệm xác suất đơn giản: sự kiện chắc chắn, có thể xảy ra hoặc không thể xảy ra.' },
  { title: 'Bài 67: Thực hành và trải nghiệm thu thập, phân loại, kiểm đếm số liệu', slug: 'thuc-hanh-thu-thap-phan-loai-kiem-dem', lessonType: 'game', sortOrder: 67, durationMinutes: 15, content: 'Bé thực hành thu thập số liệu từ bạn bè trong lớp, vẽ biểu đồ tranh và rút ra nhận xét.' },

  // Chủ đề 14: Ôn tập cuối năm lớp 2 (Bài 68-73)
  { title: 'Bài 68: Ôn tập các số trong phạm vi 1000', slug: 'on-tap-cac-so-pham-vi-1000', lessonType: 'interactive', sortOrder: 68, durationMinutes: 20, content: 'Bé ôn tập đọc, viết, so sánh và sắp xếp các số trong phạm vi 1000.' },
  { title: 'Bài 69: Ôn tập phép cộng, phép trừ trong phạm vi 1000', slug: 'on-tap-cong-tru-pham-vi-1000', lessonType: 'interactive', sortOrder: 69, durationMinutes: 20, content: 'Bé ôn tập phép cộng và trừ trong phạm vi 1000, luyện tập tính nhanh và giải toán.' },
  { title: 'Bài 70: Ôn tập phép cộng, phép trừ trong phạm vi 1000', slug: 'on-tap-cong-tru-pham-vi-1000-tt', lessonType: 'interactive', sortOrder: 70, durationMinutes: 20, content: 'Tiếp tục ôn tập và luyện tập phép cộng, phép trừ trong phạm vi 1000 với các dạng bài phức tạp hơn.' },
  { title: 'Bài 71: Ôn tập phép nhân, phép chia', slug: 'on-tap-phep-nhan-phep-chia', lessonType: 'interactive', sortOrder: 71, durationMinutes: 20, content: 'Bé ôn tập bảng nhân và bảng chia 2, 5; giải toán có lời văn liên quan đến nhân và chia.' },
  { title: 'Bài 72: Ôn tập hình học: Hình phẳng. Hình khối', slug: 'on-tap-hinh-hoc-hinh-phang-hinh-khoi', lessonType: 'interactive', sortOrder: 72, durationMinutes: 20, content: 'Bé ôn tập nhận biết và phân loại các hình phẳng, hình khối đã học trong chương trình lớp 2.' },
  { title: 'Bài 73: Ôn tập đo lường: Khối lượng. Dung tích. Độ dài.', slug: 'on-tap-do-luong-khoi-luong-dung-tich-do-dai', lessonType: 'quiz', sortOrder: 73, durationMinutes: 20, content: 'Bài kiểm tra tổng hợp cuối năm lớp 2: ôn tập đo lường, đơn vị đo và giải toán thực tế.' },
];

async function seed() {
  await ds.initialize();
  console.log('Connected to database');
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    const adminRows = await qr.query('SELECT id FROM users LIMIT 1');
    const adminId: number = adminRows[0]?.id ?? 1;

    // Upsert course
    const existing = await qr.query('SELECT id FROM courses WHERE slug = ?', [COURSE_SLUG]);
    let courseId: number;

    if (existing.length > 0) {
      courseId = existing[0].id;
      await qr.query(
        `UPDATE courses SET title=?, totalLessons=?, estimatedMinutes=?, updatedAt=NOW() WHERE id=?`,
        ['Toán lớp 2', LESSONS.length, LESSONS.length * 15, courseId],
      );
      console.log(`Updated course: Toán lớp 2 (id=${courseId})`);
    } else {
      const res = await qr.query(
        `INSERT INTO courses
         (title, slug, shortDescription, description, courseType, difficultyLevel,
          targetAgeMin, targetAgeMax, totalLessons, estimatedMinutes,
          isPublished, isFree, price, createdById, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          'Toán lớp 2',
          COURSE_SLUG,
          'Học Toán lớp 2 theo chương trình GDPT 2018: số học, phép tính, đo lường và hình học',
          'Khóa học Toán lớp 2 đầy đủ gồm 73 bài theo chương trình GDPT 2018. Tập 1 (bài 1-36): ôn tập số đến 100, phép cộng trừ, đo lường và hình phẳng. Tập 2 (bài 37-73): phép nhân chia, số đến 1000, đo độ dài, thống kê và xác suất.',
          'math',
          'intermediate',
          7, 8,
          LESSONS.length,
          LESSONS.length * 15,
          1, 0, 99000,
          adminId,
        ],
      );
      courseId = res.insertId;
      console.log(`Created course: Toán lớp 2 (id=${courseId})`);
    }

    // ── Volumes ──────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM volumes WHERE courseId = ?', [courseId]);
    const volDefs = [
      { name: 'TOÁN LỚP 2 - TẬP 1', sortOrder: 1 },
      { name: 'TOÁN LỚP 2 - TẬP 2', sortOrder: 2 },
    ];
    const volIds: number[] = [];
    for (const v of volDefs) {
      const r = await qr.query(
        'INSERT INTO volumes (courseId, name, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [courseId, v.name, v.sortOrder],
      );
      volIds.push(r.insertId);
    }
    const [vol1Id, vol2Id] = volIds;
    console.log(`Created volumes: ${vol1Id}, ${vol2Id}`);

    // ── Topics ────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM topics WHERE courseId = ?', [courseId]);
    const topicDefs: { name: string; vol: number; sortOrder: number; minOrder: number; maxOrder: number }[] = [
      // Tập 1
      { name: 'Chủ đề 1: Ôn tập và bổ sung',                                   vol: vol1Id, sortOrder: 1,  minOrder: 1,  maxOrder: 6  },
      { name: 'Chủ đề 2: Phép cộng, phép trừ trong phạm vi 20',                vol: vol1Id, sortOrder: 2,  minOrder: 7,  maxOrder: 14 },
      { name: 'Chủ đề 3: Làm quen với khối lượng, dung tích',                  vol: vol1Id, sortOrder: 3,  minOrder: 15, maxOrder: 18 },
      { name: 'Chủ đề 4: Phép cộng, phép trừ (có nhớ) trong phạm vi 100',     vol: vol1Id, sortOrder: 4,  minOrder: 19, maxOrder: 24 },
      { name: 'Chủ đề 5: Làm quen với hình phẳng',                             vol: vol1Id, sortOrder: 5,  minOrder: 25, maxOrder: 28 },
      { name: 'Chủ đề 6: Ngày - giờ, giờ - phút, ngày - tháng',               vol: vol1Id, sortOrder: 6,  minOrder: 29, maxOrder: 32 },
      { name: 'Chủ đề 7: Ôn tập học kỳ 1',                                     vol: vol1Id, sortOrder: 7,  minOrder: 33, maxOrder: 36 },
      // Tập 2
      { name: 'Chủ đề 8: Phép nhân, phép chia',                                vol: vol2Id, sortOrder: 8,  minOrder: 37, maxOrder: 45 },
      { name: 'Chủ đề 9: Làm quen với hình khối',                              vol: vol2Id, sortOrder: 9,  minOrder: 46, maxOrder: 47 },
      { name: 'Chủ đề 10: Các số trong phạm vi 1000',                          vol: vol2Id, sortOrder: 10, minOrder: 48, maxOrder: 54 },
      { name: 'Chủ đề 11: Độ dài và đơn vị đo độ dài, tiền Việt Nam',         vol: vol2Id, sortOrder: 11, minOrder: 55, maxOrder: 58 },
      { name: 'Chủ đề 12: Phép cộng, phép trừ trong phạm vi 1000',            vol: vol2Id, sortOrder: 12, minOrder: 59, maxOrder: 63 },
      { name: 'Chủ đề 13: Làm quen với yếu tố thống kê, xác suất',            vol: vol2Id, sortOrder: 13, minOrder: 64, maxOrder: 67 },
      { name: 'Chủ đề 14: Ôn tập cuối năm lớp 2',                             vol: vol2Id, sortOrder: 14, minOrder: 68, maxOrder: 73 },
    ];
    const topicMap: { minOrder: number; maxOrder: number; topicId: number; volId: number }[] = [];
    for (const t of topicDefs) {
      const r = await qr.query(
        'INSERT INTO topics (courseId, volumeId, name, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [courseId, t.vol, t.name, t.sortOrder],
      );
      topicMap.push({ minOrder: t.minOrder, maxOrder: t.maxOrder, topicId: r.insertId, volId: t.vol });
    }
    console.log(`Created ${topicDefs.length} topics`);

    // ── Lessons ───────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM lessons WHERE courseId = ?', [courseId]);

    for (const l of LESSONS) {
      const tm = topicMap.find((t) => l.sortOrder >= t.minOrder && l.sortOrder <= t.maxOrder);
      const volId = l.sortOrder <= 36 ? vol1Id : vol2Id;
      await qr.query(
        `INSERT INTO lessons
         (courseId, volumeId, topicId, title, slug, content, lessonType, sortOrder, durationMinutes,
          isPreview, isPublished, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [courseId, volId, tm?.topicId ?? null, l.title, l.slug, l.content, l.lessonType, l.sortOrder, l.durationMinutes, 0, 1],
      );
      console.log(`  [${l.sortOrder}] ${l.title}`);
    }

    console.log(`\nDone! ${LESSONS.length} lessons inserted.`);
  } finally {
    await qr.release();
    await ds.destroy();
  }
}

seed().catch((err) => { console.error(err); process.exit(1); });
