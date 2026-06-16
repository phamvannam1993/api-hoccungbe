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

const COURSE_SLUG = 'toan-lop-3';

type LessonSeed = {
  title: string;
  slug: string;
  lessonType: 'interactive' | 'quiz' | 'story' | 'video' | 'game';
  sortOrder: number;
  durationMinutes: number;
  content: string;
};

// Tập 1: sortOrder 1-44 — 7 chủ đề
// Tập 2: sortOrder 45-81 — 9 chủ đề
const LESSONS: LessonSeed[] = [
  // ─── TẬP 1 ────────────────────────────────────────────────────────────────
  // Chủ đề 1: Ôn tập và bổ sung (các số đến 1000) (Bài 1-8)
  { title: 'Bài 1: Ôn tập các số đến 1000', slug: 'on-tap-cac-so-den-1000-l3', lessonType: 'interactive', sortOrder: 1, durationMinutes: 15, content: 'Bé ôn lại cách đọc, viết, phân tích cấu tạo và so sánh các số trong phạm vi 1000.' },
  { title: 'Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1000', slug: 'on-tap-phep-cong-tru-pham-vi-1000', lessonType: 'interactive', sortOrder: 2, durationMinutes: 15, content: 'Bé ôn tập đặt tính và thực hiện phép cộng, phép trừ (có nhớ và không nhớ) trong phạm vi 1000.' },
  { title: 'Bài 3: Tìm thành phần trong phép cộng, phép trừ', slug: 'tim-thanh-phan-phep-cong-tru-l3', lessonType: 'interactive', sortOrder: 3, durationMinutes: 15, content: 'Bé học tìm số hạng, số bị trừ, số trừ chưa biết trong phép cộng và phép trừ.' },
  { title: 'Bài 4: Ôn tập bảng nhân 2; 5, bảng chia 2; 5', slug: 'on-tap-bang-nhan-chia-2-5', lessonType: 'interactive', sortOrder: 4, durationMinutes: 15, content: 'Bé ôn lại bảng nhân và bảng chia 2, 5 đã học ở lớp 2, vận dụng vào giải toán.' },
  { title: 'Bài 5: Bảng nhân 3, bảng chia 3', slug: 'bang-nhan-chia-3', lessonType: 'interactive', sortOrder: 5, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 3 và bảng chia 3 qua các trò chơi và bài tập ghi nhớ.' },
  { title: 'Bài 6: Bảng nhân 4, bảng chia 4', slug: 'bang-nhan-chia-4', lessonType: 'interactive', sortOrder: 6, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 4 và bảng chia 4, hiểu mối quan hệ giữa phép nhân và phép chia.' },
  { title: 'Bài 7: Ôn tập hình học và đo lường', slug: 'on-tap-hinh-hoc-do-luong-l3', lessonType: 'interactive', sortOrder: 7, durationMinutes: 15, content: 'Bé ôn lại các hình phẳng, hình khối đã học và các đơn vị đo độ dài, khối lượng, dung tích ở lớp 2.' },
  { title: 'Bài 8: Luyện tập chung', slug: 'luyen-tap-chung-1-l3', lessonType: 'quiz', sortOrder: 8, durationMinutes: 15, content: 'Bé luyện tập tổng hợp kiến thức chủ đề 1 qua các bài tập đa dạng về số học, hình học và đo lường.' },

  // Chủ đề 2: Bảng nhân, bảng chia (Bài 9-15)
  { title: 'Bài 9: Bảng nhân 6, bảng chia 6', slug: 'bang-nhan-chia-6', lessonType: 'interactive', sortOrder: 9, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 6 và bảng chia 6, vận dụng giải toán có lời văn.' },
  { title: 'Bài 10: Bảng nhân 7, bảng chia 7', slug: 'bang-nhan-chia-7', lessonType: 'interactive', sortOrder: 10, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 7 và bảng chia 7 qua các bài tập luyện tập.' },
  { title: 'Bài 11: Bảng nhân 8, bảng chia 8', slug: 'bang-nhan-chia-8', lessonType: 'interactive', sortOrder: 11, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 8 và bảng chia 8, áp dụng vào tính nhanh.' },
  { title: 'Bài 12: Bảng nhân 9, bảng chia 9', slug: 'bang-nhan-chia-9', lessonType: 'interactive', sortOrder: 12, durationMinutes: 15, content: 'Bé học thuộc bảng nhân 9 và bảng chia 9, hoàn thiện hệ thống các bảng nhân/chia trong phạm vi 100.' },
  { title: 'Bài 13: Tìm thành phần trong phép nhân, phép chia', slug: 'tim-thanh-phan-phep-nhan-chia', lessonType: 'interactive', sortOrder: 13, durationMinutes: 15, content: 'Bé học tìm thừa số, số bị chia, số chia chưa biết trong phép nhân và phép chia.' },
  { title: 'Bài 14: Một phần mấy', slug: 'mot-phan-may', lessonType: 'interactive', sortOrder: 14, durationMinutes: 15, content: 'Bé làm quen với khái niệm 1/2, 1/3, 1/4… của một số lượng vật thể hoặc một hình.' },
  { title: 'Bài 15: Luyện tập chung', slug: 'luyen-tap-chung-2-l3', lessonType: 'quiz', sortOrder: 15, durationMinutes: 15, content: 'Bé luyện tập tổng hợp các bảng nhân, bảng chia từ 2 đến 9 và khái niệm một phần mấy.' },

  // Chủ đề 3: Làm quen với hình phẳng, hình khối (Bài 16-22)
  { title: 'Bài 16: Điểm ở giữa, trung điểm của đoạn thẳng', slug: 'diem-o-giua-trung-diem-doan-thang', lessonType: 'interactive', sortOrder: 16, durationMinutes: 15, content: 'Bé học nhận biết điểm ở giữa và trung điểm của đoạn thẳng, biết xác định và vẽ trung điểm.' },
  { title: 'Bài 17: Hình tròn. Tâm, bán kính, đường kính của hình tròn', slug: 'hinh-tron-tam-ban-kinh-duong-kinh', lessonType: 'interactive', sortOrder: 17, durationMinutes: 15, content: 'Bé học các yếu tố của hình tròn: tâm, bán kính, đường kính và mối quan hệ giữa chúng.' },
  { title: 'Bài 18: Góc - góc vuông, góc không vuông', slug: 'goc-goc-vuong-goc-khong-vuong', lessonType: 'interactive', sortOrder: 18, durationMinutes: 15, content: 'Bé làm quen với góc, biết nhận diện góc vuông và góc không vuông bằng ê-ke.' },
  { title: 'Bài 19: Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông', slug: 'hinh-tam-giac-tu-giac-chu-nhat-vuong', lessonType: 'interactive', sortOrder: 19, durationMinutes: 15, content: 'Bé học các đặc điểm của hình tam giác, tứ giác, hình chữ nhật và hình vuông; phân loại các hình.' },
  { title: 'Bài 20: Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí', slug: 'thuc-hanh-ve-goc-vuong-duong-tron-vuong-chu-nhat', lessonType: 'game', sortOrder: 20, durationMinutes: 15, content: 'Bé thực hành dùng ê-ke vẽ góc vuông, compa vẽ đường tròn và vẽ các hình trang trí sáng tạo.' },
  { title: 'Bài 21: Khối lập phương, khối hộp chữ nhật', slug: 'khoi-lap-phuong-khoi-hop-chu-nhat', lessonType: 'interactive', sortOrder: 21, durationMinutes: 15, content: 'Bé nhận biết khối lập phương và khối hộp chữ nhật, đếm mặt, đỉnh, cạnh của các khối hình.' },
  { title: 'Bài 22: Luyện tập chung', slug: 'luyen-tap-chung-3-l3', lessonType: 'quiz', sortOrder: 22, durationMinutes: 15, content: 'Bé luyện tập tổng hợp về hình phẳng và hình khối: nhận biết, vẽ và phân loại.' },

  // Chủ đề 4: Phép nhân, phép chia trong phạm vi 100 (Bài 23-29)
  { title: 'Bài 23: Nhân số có hai chữ số với số có một chữ số', slug: 'nhan-so-hai-chu-so-voi-mot-chu-so', lessonType: 'interactive', sortOrder: 23, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép nhân số có hai chữ số với số có một chữ số (có nhớ và không nhớ).' },
  { title: 'Bài 24: Gấp một số lên một số lần', slug: 'gap-mot-so-len-mot-so-lan', lessonType: 'interactive', sortOrder: 24, durationMinutes: 15, content: 'Bé học gấp một số lên k lần, vận dụng vào giải bài toán có lời văn.' },
  { title: 'Bài 25: Phép chia hết, phép chia có dư', slug: 'phep-chia-het-phep-chia-co-du', lessonType: 'interactive', sortOrder: 25, durationMinutes: 15, content: 'Bé học phân biệt phép chia hết (số dư = 0) và phép chia có dư, biết số dư luôn nhỏ hơn số chia.' },
  { title: 'Bài 26: Chia số có hai chữ số cho số có một chữ số', slug: 'chia-so-hai-chu-so-cho-mot-chu-so', lessonType: 'interactive', sortOrder: 26, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép chia số có hai chữ số cho số có một chữ số.' },
  { title: 'Bài 27: Giảm một số đi một số lần', slug: 'giam-mot-so-di-mot-so-lan', lessonType: 'interactive', sortOrder: 27, durationMinutes: 15, content: 'Bé học giảm một số đi k lần, phân biệt với giảm đi k đơn vị; vận dụng giải toán.' },
  { title: 'Bài 28: Bài toán giải bằng hai bước tính', slug: 'bai-toan-giai-bang-hai-buoc-tinh', lessonType: 'story', sortOrder: 28, durationMinutes: 15, content: 'Bé học cách giải bài toán có lời văn cần dùng hai bước tính, biết tóm tắt và trình bày lời giải.' },
  { title: 'Bài 29: Luyện tập chung', slug: 'luyen-tap-chung-4-l3', lessonType: 'quiz', sortOrder: 29, durationMinutes: 15, content: 'Bé luyện tập phép nhân, chia trong phạm vi 100 và giải bài toán hai bước tính.' },

  // Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ (Bài 30-35)
  { title: 'Bài 30: Mi-li-mét', slug: 'mi-li-met', lessonType: 'interactive', sortOrder: 30, durationMinutes: 15, content: 'Bé làm quen với đơn vị đo độ dài mi-li-mét (mm), biết 1 cm = 10 mm và áp dụng đo các vật nhỏ.' },
  { title: 'Bài 31: Gam', slug: 'gam', lessonType: 'interactive', sortOrder: 31, durationMinutes: 15, content: 'Bé làm quen với đơn vị đo khối lượng gam (g), biết 1 kg = 1000 g và sử dụng cân điện tử.' },
  { title: 'Bài 32: Mi-li-lít', slug: 'mi-li-lit', lessonType: 'interactive', sortOrder: 32, durationMinutes: 15, content: 'Bé làm quen với đơn vị đo dung tích mi-li-lít (ml), biết 1 lít = 1000 ml.' },
  { title: 'Bài 33: Nhiệt độ. Đơn vị đo nhiệt độ', slug: 'nhiet-do-don-vi-do-nhiet-do', lessonType: 'interactive', sortOrder: 33, durationMinutes: 15, content: 'Bé học khái niệm nhiệt độ và đơn vị đo độ C (°C), đọc nhiệt độ trên nhiệt kế.' },
  { title: 'Bài 34: Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C', slug: 'thuc-hanh-mm-g-ml-do-c', lessonType: 'game', sortOrder: 34, durationMinutes: 15, content: 'Bé thực hành đo độ dài bằng mm, cân vật bằng gam, đong chất lỏng bằng ml và đo nhiệt độ.' },
  { title: 'Bài 35: Luyện tập chung', slug: 'luyen-tap-chung-5-l3', lessonType: 'quiz', sortOrder: 35, durationMinutes: 15, content: 'Bé luyện tập đổi và sử dụng các đơn vị đo mm, g, ml, °C trong bài toán thực tế.' },

  // Chủ đề 6: Phép nhân, phép chia trong phạm vi 100 (tiếp) (Bài 36-40)
  { title: 'Bài 36: Nhân số có ba chữ số với số có một chữ số', slug: 'nhan-so-ba-chu-so-voi-mot-chu-so', lessonType: 'interactive', sortOrder: 36, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép nhân số có ba chữ số với số có một chữ số.' },
  { title: 'Bài 37: Chia số có ba chữ số cho số có một chữ số', slug: 'chia-so-ba-chu-so-cho-mot-chu-so', lessonType: 'interactive', sortOrder: 37, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép chia số có ba chữ số cho số có một chữ số.' },
  { title: 'Bài 38: Biểu thức số. Tính giá trị của biểu thức số', slug: 'bieu-thuc-so-tinh-gia-tri-bieu-thuc', lessonType: 'interactive', sortOrder: 38, durationMinutes: 15, content: 'Bé học khái niệm biểu thức số, quy tắc tính giá trị biểu thức có dấu ngoặc và không có dấu ngoặc.' },
  { title: 'Bài 39: So sánh số lớn gấp mấy lần số bé', slug: 'so-sanh-so-lon-gap-may-lan-so-be', lessonType: 'interactive', sortOrder: 39, durationMinutes: 15, content: 'Bé học so sánh hai số: số lớn gấp mấy lần số bé bằng cách thực hiện phép chia.' },
  { title: 'Bài 40: Luyện tập chung', slug: 'luyen-tap-chung-6-l3', lessonType: 'quiz', sortOrder: 40, durationMinutes: 15, content: 'Bé luyện tập tổng hợp về nhân, chia số có ba chữ số và biểu thức số.' },

  // Chủ đề 7: Ôn tập học kỳ 1 (Bài 41-44)
  { title: 'Bài 41: Ôn tập phép nhân, phép chia trong phạm vi 100, 1000', slug: 'on-tap-phep-nhan-chia-pham-vi-100-1000', lessonType: 'interactive', sortOrder: 41, durationMinutes: 20, content: 'Bé ôn tập toàn bộ phép nhân, phép chia đã học trong học kỳ 1, từ phạm vi 100 đến 1000.' },
  { title: 'Bài 42: Ôn tập biểu thức số', slug: 'on-tap-bieu-thuc-so', lessonType: 'interactive', sortOrder: 42, durationMinutes: 20, content: 'Bé ôn tập cách tính giá trị biểu thức số có và không có dấu ngoặc.' },
  { title: 'Bài 43: Ôn tập hình học và đo lường', slug: 'on-tap-hinh-hoc-do-luong-hk1', lessonType: 'interactive', sortOrder: 43, durationMinutes: 20, content: 'Bé ôn tập các hình phẳng, hình khối, góc và các đơn vị đo đã học trong học kỳ 1.' },
  { title: 'Bài 44: Ôn tập chung', slug: 'on-tap-chung-hk1-l3', lessonType: 'quiz', sortOrder: 44, durationMinutes: 20, content: 'Bài kiểm tra tổng hợp cuối học kỳ 1 lớp 3: số học, phép tính, biểu thức, đo lường và hình học.' },

  // ─── TẬP 2 ────────────────────────────────────────────────────────────────
  // Chủ đề 8: Các số đến 10 000 (Bài 45-49)
  { title: 'Bài 45: Các số có bốn chữ số. Số 10 000', slug: 'cac-so-co-bon-chu-so-so-10000', lessonType: 'interactive', sortOrder: 45, durationMinutes: 15, content: 'Bé học đọc, viết và phân tích cấu tạo các số có bốn chữ số; làm quen với số 10 000.' },
  { title: 'Bài 46: So sánh các số trong phạm vi 10 000', slug: 'so-sanh-cac-so-pham-vi-10000', lessonType: 'interactive', sortOrder: 46, durationMinutes: 15, content: 'Bé học so sánh hai số trong phạm vi 10 000 bằng cách so sánh từng hàng số.' },
  { title: 'Bài 47: Làm quen với chữ số La Mã', slug: 'lam-quen-chu-so-la-ma', lessonType: 'interactive', sortOrder: 47, durationMinutes: 15, content: 'Bé làm quen với các chữ số La Mã I, V, X và cách đọc các số La Mã từ 1 đến 12.' },
  { title: 'Bài 48: Làm tròn số đến hàng chục, hàng trăm', slug: 'lam-tron-so-den-hang-chuc-tram', lessonType: 'interactive', sortOrder: 48, durationMinutes: 15, content: 'Bé học quy tắc làm tròn số đến hàng chục và hàng trăm gần nhất.' },
  { title: 'Bài 49: Luyện tập chung chủ đề 8 - Các số đến 10 000', slug: 'luyen-tap-chung-so-den-10000', lessonType: 'quiz', sortOrder: 49, durationMinutes: 15, content: 'Bé luyện tập đọc, viết, so sánh, làm tròn các số trong phạm vi 10 000 và chữ số La Mã.' },

  // Chủ đề 9: Chu vi, diện tích một số hình phẳng (Bài 50-53)
  { title: 'Bài 50: Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông', slug: 'chu-vi-tam-giac-tu-giac-chu-nhat-vuong', lessonType: 'interactive', sortOrder: 50, durationMinutes: 15, content: 'Bé học tính chu vi hình tam giác, tứ giác, hình chữ nhật và hình vuông bằng công thức.' },
  { title: 'Bài 51: Diện tích của một hình. Xăng-ti-mét vuông', slug: 'dien-tich-cua-mot-hinh-cm-vuong', lessonType: 'interactive', sortOrder: 51, durationMinutes: 15, content: 'Bé làm quen với khái niệm diện tích và đơn vị đo diện tích xăng-ti-mét vuông (cm²).' },
  { title: 'Bài 52: Diện tích hình chữ nhật, diện tích hình vuông', slug: 'dien-tich-chu-nhat-vuong', lessonType: 'interactive', sortOrder: 52, durationMinutes: 15, content: 'Bé học công thức tính diện tích hình chữ nhật (dài × rộng) và hình vuông (cạnh × cạnh).' },
  { title: 'Bài 53: Luyện tập chung', slug: 'luyen-tap-chung-7-l3', lessonType: 'quiz', sortOrder: 53, durationMinutes: 15, content: 'Bé luyện tập tính chu vi và diện tích các hình phẳng đã học.' },

  // Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000 (Bài 54-58)
  { title: 'Bài 54: Phép cộng trong phạm vi 10 000', slug: 'phep-cong-pham-vi-10000', lessonType: 'interactive', sortOrder: 54, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép cộng các số trong phạm vi 10 000 (có nhớ và không nhớ).' },
  { title: 'Bài 55: Phép trừ trong phạm vi 10 000', slug: 'phep-tru-pham-vi-10000', lessonType: 'interactive', sortOrder: 55, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép trừ các số trong phạm vi 10 000 (có nhớ và không nhớ).' },
  { title: 'Bài 56: Nhân số có bốn chữ số với số có một chữ số', slug: 'nhan-so-bon-chu-so-voi-mot-chu-so', lessonType: 'interactive', sortOrder: 56, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép nhân số có bốn chữ số với số có một chữ số.' },
  { title: 'Bài 57: Chia số có bốn chữ số cho số có một chữ số', slug: 'chia-so-bon-chu-so-cho-mot-chu-so', lessonType: 'interactive', sortOrder: 57, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép chia số có bốn chữ số cho số có một chữ số.' },
  { title: 'Bài 58: Luyện tập chung chủ đề 10 - Cộng, trừ, nhân, chia trong phạm vi 10 000', slug: 'luyen-tap-chung-cong-tru-nhan-chia-10000', lessonType: 'quiz', sortOrder: 58, durationMinutes: 15, content: 'Bé luyện tập tổng hợp bốn phép tính trong phạm vi 10 000 và giải bài toán có lời văn.' },

  // Chủ đề 11: Các số đến 100 000 (Bài 59-62)
  { title: 'Bài 59: Các số có năm chữ số. Số 100 000', slug: 'cac-so-co-nam-chu-so-so-100000', lessonType: 'interactive', sortOrder: 59, durationMinutes: 15, content: 'Bé học đọc, viết các số có năm chữ số và làm quen với số 100 000.' },
  { title: 'Bài 60: So sánh các số trong phạm vi 100 000', slug: 'so-sanh-cac-so-pham-vi-100000', lessonType: 'interactive', sortOrder: 60, durationMinutes: 15, content: 'Bé học so sánh hai số trong phạm vi 100 000 và sắp xếp các số theo thứ tự.' },
  { title: 'Bài 61: Làm tròn các số đến hàng nghìn, hàng chục nghìn', slug: 'lam-tron-so-den-hang-nghin-chuc-nghin', lessonType: 'interactive', sortOrder: 61, durationMinutes: 15, content: 'Bé học quy tắc làm tròn số đến hàng nghìn và hàng chục nghìn gần nhất.' },
  { title: 'Bài 62: Luyện tập chung', slug: 'luyen-tap-chung-8-l3', lessonType: 'quiz', sortOrder: 62, durationMinutes: 15, content: 'Bé luyện tập đọc, viết, so sánh, làm tròn các số trong phạm vi 100 000.' },

  // Chủ đề 12: Cộng, trừ trong phạm vi 100 000 (Bài 63-65)
  { title: 'Bài 63: Phép cộng trong phạm vi 100 000', slug: 'phep-cong-pham-vi-100000', lessonType: 'interactive', sortOrder: 63, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép cộng các số trong phạm vi 100 000.' },
  { title: 'Bài 64: Phép trừ trong phạm vi 100 000', slug: 'phep-tru-pham-vi-100000', lessonType: 'interactive', sortOrder: 64, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép trừ các số trong phạm vi 100 000.' },
  { title: 'Bài 65: Luyện tập chung', slug: 'luyen-tap-chung-9-l3', lessonType: 'quiz', sortOrder: 65, durationMinutes: 15, content: 'Bé luyện tập phép cộng, phép trừ trong phạm vi 100 000 và giải bài toán có lời văn.' },

  // Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam (Bài 66-69)
  { title: 'Bài 66: Xem đồng hồ. Tháng - năm', slug: 'xem-dong-ho-thang-nam', lessonType: 'interactive', sortOrder: 66, durationMinutes: 15, content: 'Bé học xem giờ chính xác đến từng phút, hiểu mối quan hệ giữa tháng và năm.' },
  { title: 'Bài 67: Thực hành xem đồng hồ, xem lịch', slug: 'thuc-hanh-xem-dong-ho-lich', lessonType: 'game', sortOrder: 67, durationMinutes: 15, content: 'Bé thực hành xem đồng hồ kim, đồng hồ số và xem lịch để trả lời các câu hỏi thực tế.' },
  { title: 'Bài 68: Tiền Việt Nam', slug: 'tien-viet-nam-l3', lessonType: 'interactive', sortOrder: 68, durationMinutes: 15, content: 'Bé học các mệnh giá tiền Việt Nam, thực hiện đổi tiền và tính toán mua bán đơn giản.' },
  { title: 'Bài 69: Luyện tập chung', slug: 'luyen-tap-chung-10-l3', lessonType: 'quiz', sortOrder: 69, durationMinutes: 15, content: 'Bé luyện tập xem đồng hồ, lịch và bài toán về tiền Việt Nam.' },

  // Chủ đề 14: Nhân, chia trong phạm vi 100 000 (Bài 70-72)
  { title: 'Bài 70: Nhân số có năm chữ số với số có một chữ số', slug: 'nhan-so-nam-chu-so-voi-mot-chu-so', lessonType: 'interactive', sortOrder: 70, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép nhân số có năm chữ số với số có một chữ số.' },
  { title: 'Bài 71: Chia số có năm chữ số cho số có một chữ số', slug: 'chia-so-nam-chu-so-cho-mot-chu-so', lessonType: 'interactive', sortOrder: 71, durationMinutes: 15, content: 'Bé học đặt tính và thực hiện phép chia số có năm chữ số cho số có một chữ số.' },
  { title: 'Bài 72: Luyện tập chung', slug: 'luyen-tap-chung-11-l3', lessonType: 'quiz', sortOrder: 72, durationMinutes: 15, content: 'Bé luyện tập phép nhân, phép chia trong phạm vi 100 000 và giải bài toán có lời văn.' },

  // Chủ đề 15: Làm quen với yếu tố thống kê, xác suất (Bài 73-75)
  { title: 'Bài 73: Thu thập, phân loại, ghi chép số liệu. Bảng số liệu', slug: 'thu-thap-phan-loai-bang-so-lieu', lessonType: 'interactive', sortOrder: 73, durationMinutes: 15, content: 'Bé học cách thu thập, phân loại số liệu và trình bày dưới dạng bảng số liệu.' },
  { title: 'Bài 74: Khả năng xảy ra của một sự kiện', slug: 'kha-nang-xay-ra-su-kien', lessonType: 'interactive', sortOrder: 74, durationMinutes: 15, content: 'Bé làm quen với khái niệm xác suất: chắc chắn, có thể, không thể xảy ra của một sự kiện.' },
  { title: 'Bài 75: Luyện tập chung', slug: 'luyen-tap-chung-12-l3', lessonType: 'quiz', sortOrder: 75, durationMinutes: 15, content: 'Bé luyện tập về bảng số liệu và khả năng xảy ra của sự kiện qua các bài tập thực tế.' },

  // Chủ đề 16: Ôn tập cuối năm (Bài 76-81)
  { title: 'Bài 76: Ôn tập các số trong phạm vi 10 000, 100 000', slug: 'on-tap-cac-so-10000-100000', lessonType: 'interactive', sortOrder: 76, durationMinutes: 20, content: 'Bé ôn tập đọc, viết, so sánh, làm tròn các số trong phạm vi 10 000 và 100 000.' },
  { title: 'Bài 77: Ôn tập phép cộng, phép trừ trong phạm vi 100 000', slug: 'on-tap-cong-tru-pham-vi-100000', lessonType: 'interactive', sortOrder: 77, durationMinutes: 20, content: 'Bé ôn tập phép cộng và phép trừ trong phạm vi 100 000, luyện tập tính nhanh.' },
  { title: 'Bài 78: Ôn tập phép nhân, phép chia trong phạm vi 100 000', slug: 'on-tap-nhan-chia-pham-vi-100000', lessonType: 'interactive', sortOrder: 78, durationMinutes: 20, content: 'Bé ôn tập phép nhân, phép chia số có nhiều chữ số với/cho số có một chữ số.' },
  { title: 'Bài 79: Ôn tập hình học và đo lường', slug: 'on-tap-hinh-hoc-do-luong-cuoi-nam-l3', lessonType: 'interactive', sortOrder: 79, durationMinutes: 20, content: 'Bé ôn tập tính chu vi, diện tích các hình và các đơn vị đo đã học trong lớp 3.' },
  { title: 'Bài 80: Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện', slug: 'on-tap-bang-so-lieu-kha-nang-xay-ra', lessonType: 'interactive', sortOrder: 80, durationMinutes: 20, content: 'Bé ôn tập về thu thập số liệu, bảng số liệu và xác suất đơn giản.' },
  { title: 'Bài 81: Ôn tập chung', slug: 'on-tap-chung-cuoi-nam-l3', lessonType: 'quiz', sortOrder: 81, durationMinutes: 20, content: 'Bài kiểm tra tổng hợp cuối năm lớp 3: số học, phép tính, biểu thức, đo lường, hình học và thống kê.' },
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
        ['Toán lớp 3', LESSONS.length, LESSONS.length * 15, courseId],
      );
      console.log(`Updated course: Toán lớp 3 (id=${courseId})`);
    } else {
      const res = await qr.query(
        `INSERT INTO courses
         (title, slug, shortDescription, description, courseType, difficultyLevel,
          targetAgeMin, targetAgeMax, totalLessons, estimatedMinutes,
          isPublished, isFree, price, createdById, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          'Toán lớp 3',
          COURSE_SLUG,
          'Học Toán lớp 3 theo chương trình GDPT 2018: bảng nhân chia, số đến 100 000, chu vi - diện tích, đo lường và thống kê',
          'Khóa học Toán lớp 3 đầy đủ gồm 81 bài theo chương trình GDPT 2018. Tập 1 (bài 1-44): ôn tập số đến 1000, bảng nhân/chia, hình học, đo lường và phép nhân/chia trong phạm vi 100. Tập 2 (bài 45-81): các số đến 100 000, chu vi - diện tích, bốn phép tính trong phạm vi 100 000, xem đồng hồ - lịch - tiền Việt Nam và thống kê - xác suất.',
          'math',
          'intermediate',
          8, 9,
          LESSONS.length,
          LESSONS.length * 15,
          1, 0, 99000,
          adminId,
        ],
      );
      courseId = res.insertId;
      console.log(`Created course: Toán lớp 3 (id=${courseId})`);
    }

    // ── Volumes ──────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM volumes WHERE courseId = ?', [courseId]);
    const volDefs = [
      { name: 'TOÁN LỚP 3 - TẬP 1', sortOrder: 1 },
      { name: 'TOÁN LỚP 3 - TẬP 2', sortOrder: 2 },
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
      { name: 'Chủ đề 1: Ôn tập và bổ sung (các số đến 1000)',                vol: vol1Id, sortOrder: 1,  minOrder: 1,  maxOrder: 8  },
      { name: 'Chủ đề 2: Bảng nhân, bảng chia',                                vol: vol1Id, sortOrder: 2,  minOrder: 9,  maxOrder: 15 },
      { name: 'Chủ đề 3: Làm quen với hình phẳng, hình khối',                  vol: vol1Id, sortOrder: 3,  minOrder: 16, maxOrder: 22 },
      { name: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',              vol: vol1Id, sortOrder: 4,  minOrder: 23, maxOrder: 29 },
      { name: 'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ', vol: vol1Id, sortOrder: 5, minOrder: 30, maxOrder: 35 },
      { name: 'Chủ đề 6: Phép nhân, phép chia trong phạm vi 100 (tiếp)',       vol: vol1Id, sortOrder: 6,  minOrder: 36, maxOrder: 40 },
      { name: 'Chủ đề 7: Ôn tập học kì 1',                                     vol: vol1Id, sortOrder: 7,  minOrder: 41, maxOrder: 44 },
      // Tập 2
      { name: 'Chủ đề 8: Các số đến 10 000',                                   vol: vol2Id, sortOrder: 8,  minOrder: 45, maxOrder: 49 },
      { name: 'Chủ đề 9: Chu vi, diện tích một số hình phẳng',                 vol: vol2Id, sortOrder: 9,  minOrder: 50, maxOrder: 53 },
      { name: 'Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000',         vol: vol2Id, sortOrder: 10, minOrder: 54, maxOrder: 58 },
      { name: 'Chủ đề 11: Các số đến 100 000',                                 vol: vol2Id, sortOrder: 11, minOrder: 59, maxOrder: 62 },
      { name: 'Chủ đề 12: Cộng, trừ trong phạm vi 100 000',                   vol: vol2Id, sortOrder: 12, minOrder: 63, maxOrder: 65 },
      { name: 'Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam',           vol: vol2Id, sortOrder: 13, minOrder: 66, maxOrder: 69 },
      { name: 'Chủ đề 14: Nhân, chia trong phạm vi 100 000',                   vol: vol2Id, sortOrder: 14, minOrder: 70, maxOrder: 72 },
      { name: 'Chủ đề 15: Làm quen với yếu tố thống kê, xác suất',             vol: vol2Id, sortOrder: 15, minOrder: 73, maxOrder: 75 },
      { name: 'Chủ đề 16: Ôn tập cuối năm',                                    vol: vol2Id, sortOrder: 16, minOrder: 76, maxOrder: 81 },
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
      const volId = l.sortOrder <= 44 ? vol1Id : vol2Id;
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
