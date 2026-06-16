/**
 * Seed script for mini_games table
 * Run with: npx ts-node -r tsconfig-paths/register src/database/seed-mini-games.ts
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { MiniGame } from '../modules/mini-games/entities/mini-game.entity';

dotenv.config();

// Map from slug → routeKey (English)
const SLUG_TO_ROUTE: Record<string, string> = {
  'ghep-tu': 'match-word',
  'toan-vui': 'math-fun',
  'san-hinh-ghi-nho': 'memory-hunt',
  'tu-vung-tieng-anh': 'english-vocab',
  'ghep-am-thanh': 'sound-match',
  'chon-nhanh': 'quick-pick',
  'tim-so-thieu': 'missing-number',
  'ghep-bong': 'shadow-match',
  'sap-xep-mau': 'color-sort',
  'dem-dong-vat': 'count-animals',
  'chu-cai-dau': 'first-letter',
  'ghep-nhom': 'group-match',
  'cap-doi-trai-nghia': 'opposite-pairs',
  'sap-xep-thu-tu': 'sequence-sort',
  'tim-ke-le': 'odd-one-out',
  'am-dau': 'initial-sound',
  'so-va-so-luong': 'number-quantity-match',
  'hoan-thanh-quy-luat': 'pattern-complete',
  'nghe-va-lam': 'listen-and-do',
  'me-cung-nho': 'mini-maze',
  'ghep-doi': 'half-match',
  'nho-thu-tu': 'sequence-memory',
  'ghep-van': 'rhyme-match',
  'noi-so': 'connect-numbers',
  'hai-tao': 'apple-pick',
  'cho-vat-an': 'animal-feed',
  'toan-bong-bong': 'bubble-math',
  'cong-tren-so-do': 'number-line-addition',
  'so-sanh-so': 'compare-numbers',
  'viet-day-so': 'number-sequence-write',
  'so-roi': 'falling-number',
  'tim-cho-cho-vat': 'where-belongs',
  'sap-xep-truyen': 'story-order',
  'dem-chim': 'bird-count',
  'chim-bay-mat': 'bird-subtraction',
  'tho-vao-hang': 'rabbit-hole',
  'tho-cap-ca-rot': 'rabbit-steal-quantity',
  'ca-trong-ho': 'pool-fish-first-grade',
  'hai-tao-hoc': 'apple-picking-complete',
  'tau-hoc-toan': 'train-complete-lessons',
  'day-so': 'number-sequence',
  'keo-cot-so': 'column-lift-drag',
};

// Games that should show on homepage, in order
const HOMEPAGE_SLUGS = [
  'tau-hoc-toan',
  'day-so',
  'tho-vao-hang',
  'tho-cap-ca-rot',
  'chim-bay-mat',
  'dem-chim',
  'ca-trong-ho',
  'hai-tao-hoc',
  'keo-cot-so',
];

const GAMES_SEED = [
  { slug: 'ghep-tu', title: 'Ghép chữ với hình', emoji: '🔤', description: 'Trò chơi giúp bé quan sát hình ảnh, liên kết từ ngữ với sự vật quen thuộc, từ đó tăng vốn từ vựng, ghi nhớ mặt chữ và phản xạ ngôn ngữ một cách tự nhiên.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Dễ', skills: ['Nhận diện từ', 'Ghi nhớ hình ảnh', 'Phản xạ ngôn ngữ'], sortOrder: 1 },
  { slug: 'toan-vui', title: 'Toán vui cộng trừ', emoji: '➕', description: 'Bé thực hành các phép tính cộng trừ cơ bản với cách trình bày ngắn gọn, dễ hiểu, giúp tăng khả năng tư duy số học và làm quen với toán học sớm.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Cộng trừ cơ bản', 'Tư duy logic', 'Tập trung'], sortOrder: 2 },
  { slug: 'san-hinh-ghi-nho', title: 'Săn hình ghi nhớ', emoji: '🧠', description: 'Trò chơi tăng khả năng quan sát, ghi nhớ ngắn hạn và phản xạ của bé thông qua việc tìm lại hình ảnh đã xuất hiện trong thời gian ngắn.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Dễ', skills: ['Ghi nhớ', 'Quan sát', 'Tập trung'], sortOrder: 3 },
  { slug: 'tu-vung-tieng-anh', title: 'Từ vựng tiếng Anh', emoji: '🌍', description: 'Bé học các từ vựng tiếng Anh quen thuộc như con vật, đồ vật, màu sắc và thực phẩm thông qua hình ảnh trực quan, dễ tiếp cận và dễ nhớ.', age: '6-8 tuổi', ageGroup: '6-8', category: 'Tiếng Anh', groupKey: 'english', difficulty: 'Trung bình', skills: ['Từ vựng tiếng Anh', 'Ghi nhớ', 'Phát âm cơ bản'], sortOrder: 4 },
  { slug: 'ghep-am-thanh', title: 'Ghép cặp âm thanh', emoji: '🔊', description: 'Trò chơi hỗ trợ bé phân biệt âm thanh, tăng khả năng lắng nghe và liên hệ âm thanh với hình ảnh quen thuộc trong cuộc sống hằng ngày.', age: '3-5 tuổi', ageGroup: '3-5', category: 'Âm thanh', groupKey: 'listening', difficulty: 'Dễ', skills: ['Lắng nghe', 'Nhận diện âm thanh', 'Ghi nhớ'], sortOrder: 5 },
  { slug: 'chon-nhanh', title: 'Nhìn nhanh chọn đúng', emoji: '⚡', description: 'Bé được rèn khả năng phản xạ thị giác, nhận biết nhanh và đưa ra quyết định chính xác trong thời gian ngắn với các câu hỏi đơn giản, vui nhộn.', age: '5-8 tuổi', ageGroup: '5-8', category: 'Phản xạ', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phản xạ', 'Quan sát', 'Tập trung'], sortOrder: 6 },
  { slug: 'tim-so-thieu', title: 'Tìm số còn thiếu', emoji: '🔢', description: 'Trò chơi giúp bé nhận biết quy luật đơn giản, làm quen với dãy số và phát triển tư duy toán học cơ bản thông qua các câu hỏi trực quan.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận diện số', 'Quy luật', 'Tư duy logic'], sortOrder: 7 },
  { slug: 'ghep-bong', title: 'Ghép bóng với đồ vật', emoji: '🌓', description: 'Bé quan sát hình dáng, so sánh đường nét và tìm đúng bóng của vật thể, từ đó phát triển khả năng quan sát hình khối và liên tưởng không gian.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Quan sát hình khối', 'So sánh', 'Tư duy không gian'], sortOrder: 8 },
  { slug: 'sap-xep-mau', title: 'Phân loại màu sắc', emoji: '🌈', description: 'Trò chơi giúp bé nhận biết màu sắc cơ bản, học cách phân loại và tăng khả năng quan sát thông qua các đối tượng quen thuộc, gần gũi.', age: '3-5 tuổi', ageGroup: '3-5', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Nhận diện màu sắc', 'Phân loại', 'Quan sát'], sortOrder: 9 },
  { slug: 'dem-dong-vat', title: 'Đếm con vật', emoji: '🐻', description: 'Bé tập đếm số lượng qua các hình minh hoạ đáng yêu, giúp củng cố kỹ năng đếm, ghi nhớ số lượng và kết nối toán học với hình ảnh cụ thể.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Quan sát', 'Tập trung', 'Phản xạ'], sortOrder: 10 },
  { slug: 'chu-cai-dau', title: 'Chọn chữ cái đầu', emoji: '🅰️', description: 'Bé nhìn hình ảnh rồi chọn chữ cái đầu tiên phù hợp, từ đó tăng khả năng nhận diện mặt chữ, phát âm và hình thành nền tảng đọc sớm.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Mặt chữ', 'Từ vựng', 'Phản xạ ngôn ngữ', 'Quan sát'], sortOrder: 11 },
  { slug: 'ghep-nhom', title: 'Nối hình theo nhóm', emoji: '🧩', description: 'Bé học cách phân nhóm theo đặc điểm giống nhau như màu sắc, hình dạng hoặc công dụng, giúp phát triển khả năng so sánh và phân loại.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phân loại', 'Tư duy logic', 'Quan sát', 'Ghi nhớ'], sortOrder: 12 },
  { slug: 'cap-doi-trai-nghia', title: 'Tìm cặp đối lập', emoji: '↔️', description: 'Trò chơi giúp bé làm quen với các cặp khái niệm đối lập như to - nhỏ, cao - thấp, nóng - lạnh, từ đó phát triển vốn từ, khả năng so sánh và tư duy ngôn ngữ.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['So sánh', 'Từ vựng', 'Tư duy ngôn ngữ', 'Quan sát'], sortOrder: 13 },
  { slug: 'sap-xep-thu-tu', title: 'Sắp xếp số theo thứ tự', emoji: '📏', description: 'Bé quan sát một dãy số chưa đúng thứ tự, sau đó sắp xếp lại theo yêu cầu từ bé đến lớn hoặc từ lớn đến bé.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Sắp xếp số', 'So sánh số', 'Thứ tự tăng dần', 'Thứ tự giảm dần'], sortOrder: 14 },
  { slug: 'tim-ke-le', title: 'Tìm vật khác nhóm', emoji: '🚫', description: 'Bé quan sát một nhóm hình và tìm ra đối tượng khác biệt, từ đó rèn khả năng phân loại, nhận biết điểm chung và suy luận logic cơ bản.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Phân loại', 'Quan sát', 'Tư duy logic', 'Nhận biết khác biệt'], sortOrder: 15 },
  { slug: 'am-dau', title: 'Nghe âm đầu chọn hình', emoji: '🔠', description: 'Trò chơi giúp bé liên kết âm thanh với từ ngữ quen thuộc, phát triển nhận thức ngữ âm và hỗ trợ hình thành nền tảng đọc sớm một cách tự nhiên.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Nhận biết âm đầu', 'Nghe hiểu', 'Từ vựng', 'Phản xạ ngôn ngữ'], sortOrder: 16 },
  { slug: 'so-va-so-luong', title: 'Ghép số với số lượng', emoji: '🔢', description: 'Bé quan sát số lượng đồ vật rồi ghép với chữ số phù hợp, từ đó củng cố kỹ năng đếm, nhận biết số và liên kết toán học với hình ảnh trực quan.', age: '3-5 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Nhận diện số', 'Ghép tương ứng', 'Quan sát'], sortOrder: 17 },
  { slug: 'hoan-thanh-quy-luat', title: 'Điền hình theo quy luật', emoji: '🟠', description: 'Bé quan sát chuỗi hình lặp lại hoặc thay đổi theo quy luật rồi chọn hình phù hợp để điền vào chỗ trống, từ đó phát triển tư duy quy luật và khả năng dự đoán.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Tư duy', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận diện quy luật', 'Suy luận', 'Quan sát', 'Tư duy logic'], sortOrder: 18 },
  { slug: 'nghe-va-lam', title: 'Nghe và làm theo', emoji: '👂', description: 'Trò chơi giúp bé rèn kỹ năng nghe hiểu, làm theo chỉ dẫn và phản xạ nhanh qua các yêu cầu đơn giản như chọn màu, chọn hình, chọn con vật hoặc đồ vật đúng.', age: '3-5 tuổi', ageGroup: '3-5', category: 'Âm thanh', groupKey: 'listening', difficulty: 'Dễ', skills: ['Nghe hiểu', 'Làm theo hướng dẫn', 'Tập trung', 'Phản xạ'], sortOrder: 19 },
  { slug: 'me-cung-nho', title: 'Mê cung vui nhộn', emoji: '🌀', description: 'Bé quan sát đường đi trong mê cung đơn giản và chọn hướng đúng để đưa nhân vật tới đích, qua đó phát triển định hướng không gian, kiên nhẫn và khả năng giải quyết vấn đề.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Định hướng không gian', 'Giải quyết vấn đề', 'Quan sát', 'Kiên nhẫn'], sortOrder: 20 },
  { slug: 'ghep-doi', title: 'Ghép nửa còn lại', emoji: '🧩', description: 'Bé quan sát các nửa hình và chọn phần còn lại phù hợp để ghép thành hình hoàn chỉnh, từ đó phát triển khả năng nhận diện hình dạng và tư duy tổng thể.', age: '3-5 tuổi', ageGroup: '3-5', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Dễ', skills: ['Nhận diện hình', 'Quan sát', 'Ghép nối', 'Tư duy trực quan'], sortOrder: 21 },
  { slug: 'nho-thu-tu', title: 'Nhớ thứ tự xuất hiện', emoji: '🧠', description: 'Trò chơi cho bé quan sát một chuỗi hình xuất hiện liên tiếp, sau đó yêu cầu sắp xếp lại theo đúng thứ tự, giúp tăng trí nhớ ngắn hạn và khả năng tập trung.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Trung bình', skills: ['Ghi nhớ chuỗi', 'Tập trung', 'Quan sát', 'Phản xạ'], sortOrder: 22 },
  { slug: 'ghep-van', title: 'Chọn vần giống nhau', emoji: '🎵', description: 'Bé nghe hoặc nhìn từ rồi tìm những từ có vần giống nhau, từ đó làm quen với âm vần tiếng Việt và hỗ trợ tốt cho việc học đọc, học nói.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Nhận biết vần', 'Nghe âm', 'Ngôn ngữ', 'Đọc sớm'], sortOrder: 23 },
  { slug: 'noi-so', title: 'Nối số theo thứ tự', emoji: '📍', description: 'Bé nối các số theo đúng thứ tự để hoàn thành hình hoặc đường đi, qua đó củng cố khả năng đếm, ghi nhớ thứ tự số và tăng phối hợp tay mắt.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Thứ tự số', 'Đếm số', 'Quan sát', 'Phối hợp tay mắt'], sortOrder: 24 },
  { slug: 'hai-tao', title: 'Nhặt táo theo số', emoji: '🍎', description: 'Bé quan sát vườn táo và nhặt đúng số lượng quả theo nhiệm vụ, qua đó luyện kỹ năng đếm số, nhận diện số lượng, tập trung và phản xạ toán học một cách vui nhộn.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Nhận diện số lượng', 'Quan sát', 'Tập trung'], sortOrder: 25 },
  { slug: 'cho-vat-an', title: 'Cho thú ăn đúng số lượng', emoji: '🐰', description: 'Bé nghe nhiệm vụ và chọn đúng số lượng đồ ăn cho từng con vật, qua đó luyện đếm số, nhận biết số lượng, tập trung và làm theo hướng dẫn một cách trực quan.', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Nhận diện số lượng', 'Làm theo hướng dẫn', 'Tập trung'], sortOrder: 26 },
  { slug: 'toan-bong-bong', title: 'Bắn bong bóng kết quả', emoji: '🎈', description: 'Bé quan sát phép tính cộng trừ đơn giản, sau đó bấm vào bong bóng mang kết quả đúng. Trò chơi giúp bé luyện tính nhẩm, phản xạ nhanh, tập trung và làm quen với toán học theo cách vui nhộn.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Cộng trừ cơ bản', 'Tính nhẩm', 'Phản xạ nhanh', 'Tập trung'], sortOrder: 27 },
  { slug: 'cong-tren-so-do', title: 'Cộng trên trục số', emoji: '📏', description: 'Bé quan sát phép cộng trên trục số, bắt đầu từ một số rồi nhảy thêm các bước để tìm điểm đến đúng. Trò chơi giúp bé hiểu bản chất phép cộng, nhận biết thứ tự số và rèn tư duy toán học trực quan.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Phép cộng', 'Trục số', 'Thứ tự số', 'Tư duy trực quan'], sortOrder: 28 },
  { slug: 'so-sanh-so', title: 'So sánh số', emoji: '⚖️', description: 'Bé quan sát hai số hoặc hai nhóm đồ vật, sau đó chọn dấu so sánh phù hợp. Trò chơi giúp bé hiểu lớn hơn, bé hơn, bằng nhau và làm quen với các dấu >, <, = một cách trực quan.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Dễ', skills: ['So sánh số', 'Lớn hơn bé hơn', 'Nhận diện dấu', 'Tư duy toán học'], sortOrder: 29 },
  { slug: 'viet-day-so', title: 'Viết dãy số', emoji: '✍️', description: 'Bé quan sát một dãy số có vài ô bị trống, sau đó nhập số còn thiếu để hoàn thành dãy. Trò chơi giúp bé luyện thứ tự số, số liền trước - liền sau, đếm cách đều và tư duy quy luật toán học.', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Dãy số', 'Thứ tự số', 'Số liền trước liền sau', 'Quy luật'], sortOrder: 30 },
  { slug: 'so-roi', title: 'Bắt số đúng', emoji: '🔢', description: 'Bé quan sát nhiệm vụ, tính số tiếp theo theo quy luật tăng dần như cộng 1, cộng 3, cộng 5 hoặc cộng 10, sau đó bấm vào số đúng đang rơi để nhận tiền thưởng.', age: '6-10 tuổi', ageGroup: '6-8', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Nâng cao', skills: ['Tính nhẩm', 'Số liền sau', 'Quy luật tăng dần', 'Phản xạ nhanh', 'Tập trung'], sortOrder: 31 },
  { slug: 'tim-cho-cho-vat', title: 'Đồ vật ở đâu?', emoji: '🏡', description: 'Bé quan sát đồ vật rồi chọn đúng nơi nó thường xuất hiện như nhà bếp, trường học, bãi biển hay sở thú.', age: '4-7 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phân loại', 'Liên hệ thực tế', 'Mở rộng vốn từ', 'Quan sát'], sortOrder: 32 },
  { slug: 'sap-xep-truyen', title: 'Sắp xếp trước - sau', emoji: '🧩', description: 'Bé quan sát các hình ảnh mô tả từng bước của câu chuyện rồi chạm vào chúng theo đúng thứ tự từ trước đến sau.', age: '5-8 tuổi', ageGroup: '5-8', category: 'Tư duy', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Tư duy thời gian', 'Nguyên nhân - kết quả', 'Quan sát', 'Kể chuyện'], sortOrder: 33 },
  { slug: 'dem-chim', title: 'Đếm chim', emoji: '🐦', description: 'Bé quan sát đàn chim đậu trên cành rồi đếm và chọn đúng số lượng. Trò chơi giúp bé luyện kỹ năng đếm số, nhận biết số lượng và phát triển khả năng quan sát chú ý đến chi tiết.', age: '3-6 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Nhận biết số lượng', 'Quan sát'], sortOrder: 34 },
  { slug: 'tho-vao-hang', title: 'Thỏ vào hang', emoji: '🐰', description: 'Bé giúp chú thỏ tìm về đúng hang bằng cách nhận biết con số. Trò chơi rèn luyện kỹ năng nhận diện số, phối hợp tay - mắt và phản xạ nhanh với độ khó tăng dần.', age: '3-7 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Nhận biết số', 'Phối hợp tay-mắt', 'Tập trung'], sortOrder: 35 },
  { slug: 'tho-cap-ca-rot', title: 'Thỏ cắp cà rốt', emoji: '🥕', description: 'Bé giúp chú thỏ cắp đúng số lượng củ cà rốt được yêu cầu bằng cách kéo thỏ chạm vào từng củ. Trò chơi rèn luyện kỹ năng đếm số lượng, phối hợp tay - mắt và tập trung với độ khó tăng dần.', age: '3-7 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số lượng', 'Phối hợp tay-mắt', 'Tập trung'], sortOrder: 36 },
  { slug: 'chim-bay-mat', title: 'Chim bay mất', emoji: '🐦', description: 'Bé nhìn đàn chim đậu trên cành rồi quan sát một số con bay đi, sau đó chọn đúng số chim còn lại. Trò chơi giúp bé luyện phép trừ, đếm số và khả năng quan sát tập trung.', age: '4-7 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép trừ', 'Đếm số', 'Quan sát'], sortOrder: 37 },
  { slug: 'ca-trong-ho', title: 'Cá trong hồ bơi', emoji: '🐟', description: 'Bé quan sát các chú cá bơi trong hồ, theo dõi cá bơi tới và bơi đi, sau đó chọn đúng số lượng cá còn lại.', age: '4-7 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số'], sortOrder: 38 },
  { slug: 'hai-tao-hoc', title: 'Hái táo học toán', emoji: '🍎', description: 'Bé tương tác với vườn táo sinh động để luyện nhiều kỹ năng toán học: đếm số lượng, phép cộng, phép trừ, so sánh, tách gộp số, tìm số thiếu, số liền trước liền sau và khung 10.', age: '4-8 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số', 'So sánh'], sortOrder: 39 },
  { slug: 'tau-hoc-toan', title: 'Đoàn tàu toán học', emoji: '🚂', description: 'Bé lái đoàn tàu qua 16 dạng bài toán sinh động: đếm toa, cộng/trừ toa, đếm hành khách, tìm số còn thiếu, so sánh, gộp số và nhiều hơn nữa.', age: '4-8 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số', 'So sánh', 'Dãy số'], sortOrder: 40 },
  { slug: 'day-so', title: 'Dãy số', emoji: '🔢', description: 'Trò chơi giúp bé nhận biết quy luật tăng dần, giảm dần trong dãy số và điền số còn thiếu đúng vị trí.', age: '5-8 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận biết quy luật', 'Dãy số', 'Tư duy logic'], sortOrder: 41 },
  { slug: 'keo-cot-so', title: 'Kéo cột số', emoji: '📊', description: 'Trò chơi giúp bé nhận biết quy luật tăng dần, giảm dần trong dãy số bằng cách kéo cột biểu đồ đến độ cao đúng.', age: '5-8 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận biết quy luật', 'Dãy số', 'Tư duy logic'], sortOrder: 42 },
];

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hoccungbe',
    entities: [MiniGame],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('Database connected');

  const repo = dataSource.getRepository(MiniGame);

  let inserted = 0;
  let skipped = 0;

  for (const data of GAMES_SEED) {
    const existing = await repo.findOne({ where: { slug: data.slug } });
    if (existing) {
      skipped++;
      continue;
    }

    const homepageIndex = HOMEPAGE_SLUGS.indexOf(data.slug);
    const game = repo.create({
      ...data,
      routeKey: SLUG_TO_ROUTE[data.slug] || data.slug,
      showOnHomepage: homepageIndex !== -1,
      homepageOrder: homepageIndex !== -1 ? homepageIndex : 99,
      isActive: true,
      status: 'ready',
    });
    await repo.save(game);
    inserted++;
    console.log(`  Inserted: ${data.slug}`);
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped (already exists): ${skipped}`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
