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

const COURSE_SLUG = 'tieng-viet-lop-1';

type LessonSeed = {
  title: string;
  slug: string;
  lessonType: 'interactive' | 'quiz' | 'story' | 'video' | 'game';
  sortOrder: number;
  durationMinutes: number;
  content: string;
};

// Tập 1: sortOrder 1-80 — chữ cái, vần
// Tập 2: sortOrder 81-136 — đọc hiểu theo chủ đề
const LESSONS: LessonSeed[] = [
  // ─── Tập 1 ────────────────────────────────────────────────────────────────
  { title: 'Bài 1: Chữ cái A a', slug: 'chu-cai-a-a', lessonType: 'interactive', sortOrder: 1, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ cái A a qua hình ảnh và âm thanh sinh động.' },
  { title: 'Bài 2: Chữ B b', slug: 'chu-b-b', lessonType: 'interactive', sortOrder: 2, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ B b, tập đánh vần các từ bắt đầu bằng chữ B.' },
  { title: 'Bài 3: Chữ C c', slug: 'chu-c-c', lessonType: 'interactive', sortOrder: 3, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ C c, luyện đọc các từ có chứa chữ C.' },
  { title: 'Bài 4: Chữ cái E e Ê ê', slug: 'chu-cai-e-e-e-e', lessonType: 'interactive', sortOrder: 4, durationMinutes: 15, content: 'Bé phân biệt và học viết hai chữ cái E e và Ê ê trong tiếng Việt.' },
  { title: 'Bài 5: Ôn tập và kể chuyện', slug: 'on-tap-va-ke-chuyen-1', lessonType: 'quiz', sortOrder: 5, durationMinutes: 15, content: 'Bé ôn lại các chữ cái đã học và nghe kể câu chuyện thú vị về các chữ cái.' },
  { title: 'Bài 6: Chữ cái O o, dấu hỏi', slug: 'chu-cai-o-o-dau-hoi', lessonType: 'interactive', sortOrder: 6, durationMinutes: 15, content: 'Bé học chữ O o và cách viết dấu hỏi trên các chữ cái.' },
  { title: 'Bài 7: Chữ cái Ô ô, dấu nặng', slug: 'chu-cai-o-o-dau-nang', lessonType: 'interactive', sortOrder: 7, durationMinutes: 15, content: 'Bé học chữ Ô ô và cách viết dấu nặng, phân biệt với chữ O o.' },
  { title: 'Bài 8: Chữ cái D d Đ đ', slug: 'chu-cai-d-d-dd-d', lessonType: 'interactive', sortOrder: 8, durationMinutes: 15, content: 'Bé học phân biệt và viết hai chữ D d và Đ đ, nhận biết sự khác nhau giữa hai chữ.' },
  { title: 'Bài 9: Chữ cái Ơ ơ, dấu ngã', slug: 'chu-cai-o-o-dau-nga', lessonType: 'interactive', sortOrder: 9, durationMinutes: 15, content: 'Bé học chữ Ơ ơ và cách viết dấu ngã trong tiếng Việt.' },
  { title: 'Bài 10: Ôn tập và kể chuyện 2', slug: 'on-tap-va-ke-chuyen-2', lessonType: 'quiz', sortOrder: 10, durationMinutes: 15, content: 'Bé ôn tập các chữ và dấu đã học, cùng nghe câu chuyện vui về bạn bè.' },
  { title: 'Bài 11: Chữ I i, K k', slug: 'chu-i-i-k-k', lessonType: 'interactive', sortOrder: 11, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ I i và K k, tập đọc các từ đơn giản.' },
  { title: 'Bài 12: Chữ H h L l', slug: 'chu-h-h-l-l', lessonType: 'interactive', sortOrder: 12, durationMinutes: 15, content: 'Bé học chữ H h và L l, luyện viết và đọc các từ quen thuộc.' },
  { title: 'Bài 13: Chữ cái U u, Ư ư', slug: 'chu-cai-u-u-u-u', lessonType: 'interactive', sortOrder: 13, durationMinutes: 15, content: 'Bé phân biệt và học viết chữ U u và Ư ư trong tiếng Việt.' },
  { title: 'Bài 14: Chữ cái Ch Kh', slug: 'chu-cai-ch-kh', lessonType: 'interactive', sortOrder: 14, durationMinutes: 15, content: 'Bé học các chữ ghép Ch và Kh, nhận biết cách phát âm và đọc từ.' },
  { title: 'Bài 15: Ôn tập và kể chuyện 3', slug: 'on-tap-va-ke-chuyen-3', lessonType: 'quiz', sortOrder: 15, durationMinutes: 15, content: 'Bé ôn lại các chữ cái và chữ ghép, cùng nghe kể câu chuyện về thiên nhiên.' },
  { title: 'Bài 16: Chữ cái M m N n', slug: 'chu-cai-m-m-n-n', lessonType: 'interactive', sortOrder: 16, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ M m và N n qua các trò chơi thú vị.' },
  { title: 'Bài 17: Chữ cái g, gi', slug: 'chu-cai-g-gi', lessonType: 'interactive', sortOrder: 17, durationMinutes: 15, content: 'Bé học chữ g và chữ ghép gi, phân biệt cách phát âm và viết đúng.' },
  { title: 'Bài 18: Chữ cái Gh, Nh', slug: 'chu-cai-gh-nh', lessonType: 'interactive', sortOrder: 18, durationMinutes: 15, content: 'Bé học các chữ ghép Gh và Nh, nhận biết trong từ và câu đơn giản.' },
  { title: 'Bài 19: Chữ cái Ng, Ngh', slug: 'chu-cai-ng-ngh', lessonType: 'interactive', sortOrder: 19, durationMinutes: 15, content: 'Bé học phân biệt chữ ghép Ng và Ngh, luyện đọc từ chứa hai chữ này.' },
  { title: 'Bài 20: Ôn tập và kể chuyện 4', slug: 'on-tap-va-ke-chuyen-4', lessonType: 'quiz', sortOrder: 20, durationMinutes: 15, content: 'Bé ôn tập tất cả chữ ghép đã học và thưởng thức câu chuyện về động vật.' },
  { title: 'Bài 21: Chữ R r, S s', slug: 'chu-r-r-s-s', lessonType: 'interactive', sortOrder: 21, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ R r và S s, đọc các từ đơn giản.' },
  { title: 'Bài 22: Chữ T t, Tr tr', slug: 'chu-t-t-tr-tr', lessonType: 'interactive', sortOrder: 22, durationMinutes: 15, content: 'Bé học chữ T t và chữ ghép Tr tr, phân biệt cách phát âm.' },
  { title: 'Bài 23: Chữ Th, vần ia', slug: 'chu-th-van-ia', lessonType: 'interactive', sortOrder: 23, durationMinutes: 15, content: 'Bé học chữ ghép Th và vần ia, luyện đọc các từ có vần ia.' },
  { title: 'Bài 24: Vần ua, ưa', slug: 'van-ua-ua', lessonType: 'interactive', sortOrder: 24, durationMinutes: 15, content: 'Bé học vần ua và ưa, tập ghép âm tạo thành các từ có nghĩa.' },
  { title: 'Bài 25: Ôn tập và kể chuyện 5', slug: 'on-tap-va-ke-chuyen-5', lessonType: 'quiz', sortOrder: 25, durationMinutes: 15, content: 'Bé ôn lại các vần ia, ua, ưa và nghe câu chuyện về cuộc sống hàng ngày.' },
  { title: 'Bài 26: Chữ Ph, Qu', slug: 'chu-ph-qu', lessonType: 'interactive', sortOrder: 26, durationMinutes: 15, content: 'Bé học các chữ ghép Ph và Qu, nhận biết và đọc từ chứa hai chữ này.' },
  { title: 'Bài 27: Chữ V v, X x', slug: 'chu-v-v-x-x', lessonType: 'interactive', sortOrder: 27, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ V v và X x qua trò chơi sinh động.' },
  { title: 'Bài 28: Chữ Y y', slug: 'chu-y-y', lessonType: 'interactive', sortOrder: 28, durationMinutes: 15, content: 'Bé học nhận biết và viết chữ Y y, luyện đọc các từ có chữ Y.' },
  { title: 'Bài 29: Luyện tập chính tả', slug: 'luyen-tap-chinh-ta-1', lessonType: 'interactive', sortOrder: 29, durationMinutes: 15, content: 'Bé luyện viết đúng chính tả các chữ cái và từ đã học qua bài tập thú vị.' },
  { title: 'Bài 30: Ôn tập và kể chuyện 6', slug: 'on-tap-va-ke-chuyen-6', lessonType: 'quiz', sortOrder: 30, durationMinutes: 15, content: 'Bé ôn tập toàn bộ bảng chữ cái và nghe câu chuyện về trường học.' },
  { title: 'Bài 31: Vần an, ân, ăn', slug: 'van-an-an-an', lessonType: 'interactive', sortOrder: 31, durationMinutes: 15, content: 'Bé học phân biệt ba vần an, ân, ăn và luyện đọc từ chứa ba vần này.' },
  { title: 'Bài 32: Vần on, ôn, ơn', slug: 'van-on-on-on', lessonType: 'interactive', sortOrder: 32, durationMinutes: 15, content: 'Bé học phân biệt ba vần on, ôn, ơn qua các từ và hình ảnh minh họa.' },
  { title: 'Bài 33: Vần en, ên, in, un', slug: 'van-en-en-in-un', lessonType: 'interactive', sortOrder: 33, durationMinutes: 15, content: 'Bé học bốn vần en, ên, in, un và ghép với âm đầu để tạo từ.' },
  { title: 'Bài 34: Vần am, ăm, âm', slug: 'van-am-am-am', lessonType: 'interactive', sortOrder: 34, durationMinutes: 15, content: 'Bé học phân biệt ba vần am, ăm, âm và đọc các từ quen thuộc.' },
  { title: 'Bài 35: Ôn tập và kể chuyện 7', slug: 'on-tap-va-ke-chuyen-7', lessonType: 'quiz', sortOrder: 35, durationMinutes: 15, content: 'Bé ôn tập các vần kết thúc bằng n và m, cùng nghe câu chuyện về gia đình.' },
  { title: 'Bài 36: Vần om, ôm, ơm', slug: 'van-om-om-om', lessonType: 'interactive', sortOrder: 36, durationMinutes: 15, content: 'Bé học phân biệt ba vần om, ôm, ơm và luyện đọc từ chứa ba vần này.' },
  { title: 'Bài 37: Vần em, êm, im, um', slug: 'van-em-em-im-um', lessonType: 'interactive', sortOrder: 37, durationMinutes: 15, content: 'Bé học bốn vần em, êm, im, um qua các trò chơi ghép vần thú vị.' },
  { title: 'Bài 38: Vần ai, ay, ây', slug: 'van-ai-ay-ay', lessonType: 'interactive', sortOrder: 38, durationMinutes: 15, content: 'Bé học phân biệt ba vần ai, ay, ây và đọc các từ trong câu ngắn.' },
  { title: 'Bài 39: Vần oi, ôi, ơi', slug: 'van-oi-oi-oi', lessonType: 'interactive', sortOrder: 39, durationMinutes: 15, content: 'Bé học phân biệt ba vần oi, ôi, ơi và luyện đọc từ chứa ba vần này.' },
  { title: 'Bài 40: Ôn tập và kể chuyện 8', slug: 'on-tap-va-ke-chuyen-8', lessonType: 'quiz', sortOrder: 40, durationMinutes: 15, content: 'Bé ôn lại các vần chứa âm đôi và nghe câu chuyện về bạn bè.' },
  { title: 'Bài 41: Vần ui, ưi', slug: 'van-ui-ui', lessonType: 'interactive', sortOrder: 41, durationMinutes: 15, content: 'Bé học phân biệt hai vần ui và ưi, luyện đọc từ có hai vần này.' },
  { title: 'Bài 42: Vần ao, eo', slug: 'van-ao-eo', lessonType: 'interactive', sortOrder: 42, durationMinutes: 15, content: 'Bé học hai vần ao và eo, ghép với âm đầu để tạo từ có nghĩa.' },
  { title: 'Bài 43: Vần au, âu, êu', slug: 'van-au-au-eu', lessonType: 'interactive', sortOrder: 43, durationMinutes: 15, content: 'Bé học phân biệt ba vần au, âu, êu và đọc các từ trong câu đơn giản.' },
  { title: 'Bài 44: Vần iu, ưu', slug: 'van-iu-uu', lessonType: 'interactive', sortOrder: 44, durationMinutes: 15, content: 'Bé học hai vần iu và ưu, luyện đọc các từ chứa hai vần này.' },
  { title: 'Bài 45: Ôn tập và kể chuyện 9', slug: 'on-tap-va-ke-chuyen-9', lessonType: 'quiz', sortOrder: 45, durationMinutes: 15, content: 'Bé ôn tập các vần kết thúc bằng o và u, cùng nghe câu chuyện về thiên nhiên.' },
  { title: 'Bài 46: Vần ac, ăc, âc', slug: 'van-ac-ac-ac', lessonType: 'interactive', sortOrder: 46, durationMinutes: 15, content: 'Bé học phân biệt ba vần ac, ăc, âc và luyện đọc từ chứa ba vần này.' },
  { title: 'Bài 47: Vần oc, ôc, uc, ưc', slug: 'van-oc-oc-uc-uc', lessonType: 'interactive', sortOrder: 47, durationMinutes: 15, content: 'Bé học bốn vần oc, ôc, uc, ưc qua các trò chơi ghép vần sinh động.' },
  { title: 'Bài 48: Vần at, ăt, ât', slug: 'van-at-at-at', lessonType: 'interactive', sortOrder: 48, durationMinutes: 15, content: 'Bé học phân biệt ba vần at, ăt, ât và đọc các từ trong câu ngắn.' },
  { title: 'Bài 49: Vần ot, ôt, ơt', slug: 'van-ot-ot-ot', lessonType: 'interactive', sortOrder: 49, durationMinutes: 15, content: 'Bé học phân biệt ba vần ot, ôt, ơt và luyện đọc các từ quen thuộc.' },
  { title: 'Bài 50: Ôn tập và kể chuyện 10', slug: 'on-tap-va-ke-chuyen-10', lessonType: 'quiz', sortOrder: 50, durationMinutes: 15, content: 'Bé ôn tập các vần kết thúc bằng c và t, cùng nghe câu chuyện thú vị.' },
  { title: 'Bài 51: Vần et, êt, it', slug: 'van-et-et-it', lessonType: 'interactive', sortOrder: 51, durationMinutes: 15, content: 'Bé học phân biệt ba vần et, êt, it và ghép với âm đầu để đọc từ.' },
  { title: 'Bài 52: Vần ut, ưt', slug: 'van-ut-ut', lessonType: 'interactive', sortOrder: 52, durationMinutes: 15, content: 'Bé học hai vần ut và ưt, luyện đọc các từ chứa hai vần này.' },
  { title: 'Bài 53: Vần ap, ăp, âp', slug: 'van-ap-ap-ap', lessonType: 'interactive', sortOrder: 53, durationMinutes: 15, content: 'Bé học phân biệt ba vần ap, ăp, âp và đọc từ trong câu đơn giản.' },
  { title: 'Bài 54: Vần op, ôp, ơp', slug: 'van-op-op-op', lessonType: 'interactive', sortOrder: 54, durationMinutes: 15, content: 'Bé học phân biệt ba vần op, ôp, ơp và luyện đọc các từ quen thuộc.' },
  { title: 'Bài 55: Ôn tập và kể chuyện 11', slug: 'on-tap-va-ke-chuyen-11', lessonType: 'quiz', sortOrder: 55, durationMinutes: 15, content: 'Bé ôn tập các vần kết thúc bằng p và t, nghe câu chuyện về cuộc sống.' },
  { title: 'Bài 56: Vần ep, êp, ip, up', slug: 'van-ep-ep-ip-up', lessonType: 'interactive', sortOrder: 56, durationMinutes: 15, content: 'Bé học bốn vần ep, êp, ip, up qua các trò chơi ghép vần thú vị.' },
  { title: 'Bài 57: Vần anh, ênh, inh', slug: 'van-anh-enh-inh', lessonType: 'interactive', sortOrder: 57, durationMinutes: 15, content: 'Bé học phân biệt ba vần anh, ênh, inh và đọc từ trong câu ngắn.' },
  { title: 'Bài 58: Vần ach, êch, ich', slug: 'van-ach-ech-ich', lessonType: 'interactive', sortOrder: 58, durationMinutes: 15, content: 'Bé học phân biệt ba vần ach, êch, ich và luyện đọc các từ quen thuộc.' },
  { title: 'Bài 59: Vần ang, ăng, âng', slug: 'van-ang-ang-ang', lessonType: 'interactive', sortOrder: 59, durationMinutes: 15, content: 'Bé học phân biệt ba vần ang, ăng, âng và ghép với âm đầu để đọc từ.' },
  { title: 'Bài 60: Ôn tập và kể chuyện 12', slug: 'on-tap-va-ke-chuyen-12', lessonType: 'quiz', sortOrder: 60, durationMinutes: 15, content: 'Bé ôn tập các vần kết thúc bằng nh, ch, ng và nghe câu chuyện về trường học.' },
  { title: 'Bài 61: Vần ong, ông, ung, ưng', slug: 'van-ong-ong-ung-ung', lessonType: 'interactive', sortOrder: 61, durationMinutes: 15, content: 'Bé học bốn vần ong, ông, ung, ưng qua các trò chơi ghép vần sinh động.' },
  { title: 'Bài 62: Vần iêc, iên, iêp', slug: 'van-iec-ien-iep', lessonType: 'interactive', sortOrder: 62, durationMinutes: 15, content: 'Bé học ba vần iêc, iên, iêp và đọc từ trong câu đơn giản.' },
  { title: 'Bài 63: Vần iêng, iêm, yên', slug: 'van-ieng-iem-yen', lessonType: 'interactive', sortOrder: 63, durationMinutes: 15, content: 'Bé học phân biệt ba vần iêng, iêm, yên và luyện đọc từ quen thuộc.' },
  { title: 'Bài 64: Vần iêt, iêu, yêu', slug: 'van-iet-ieu-yeu', lessonType: 'interactive', sortOrder: 64, durationMinutes: 15, content: 'Bé học ba vần iêt, iêu, yêu và ghép với âm đầu để tạo từ có nghĩa.' },
  { title: 'Bài 65: Ôn tập và kể chuyện 13', slug: 'on-tap-va-ke-chuyen-13', lessonType: 'quiz', sortOrder: 65, durationMinutes: 15, content: 'Bé ôn tập các vần iê và nghe câu chuyện về bạn bè và gia đình.' },
  { title: 'Bài 66: Vần uôi, uôm', slug: 'van-uoi-uom', lessonType: 'interactive', sortOrder: 66, durationMinutes: 15, content: 'Bé học hai vần uôi và uôm, luyện đọc từ chứa hai vần này.' },
  { title: 'Bài 67: Vần uôc, uôt', slug: 'van-uoc-uot', lessonType: 'interactive', sortOrder: 67, durationMinutes: 15, content: 'Bé học hai vần uôc và uôt, nhận biết và đọc từ có hai vần này.' },
  { title: 'Bài 68: Vần uôn, uông', slug: 'van-uon-uong', lessonType: 'interactive', sortOrder: 68, durationMinutes: 15, content: 'Bé học phân biệt hai vần uôn và uông, luyện đọc từ và câu ngắn.' },
  { title: 'Bài 69: Vần ươi, ươu', slug: 'van-uoi-uou', lessonType: 'interactive', sortOrder: 69, durationMinutes: 15, content: 'Bé học hai vần ươi và ươu qua hình ảnh và trò chơi thú vị.' },
  { title: 'Bài 70: Ôn tập và kể chuyện 14', slug: 'on-tap-va-ke-chuyen-14', lessonType: 'quiz', sortOrder: 70, durationMinutes: 15, content: 'Bé ôn tập các vần uô và ươ, cùng nghe câu chuyện về thiên nhiên.' },
  { title: 'Bài 71: Vần ước, ướt', slug: 'van-uoc-uot-2', lessonType: 'interactive', sortOrder: 71, durationMinutes: 15, content: 'Bé học hai vần ước và ướt, nhận biết và đọc từ quen thuộc.' },
  { title: 'Bài 72: Vần ươm, ươp', slug: 'van-uom-uop', lessonType: 'interactive', sortOrder: 72, durationMinutes: 15, content: 'Bé học hai vần ươm và ươp, luyện đọc từ và câu đơn giản.' },
  { title: 'Bài 73: Vần ươn, ương', slug: 'van-uon-uong-2', lessonType: 'interactive', sortOrder: 73, durationMinutes: 15, content: 'Bé học phân biệt hai vần ươn và ương và đọc từ trong câu ngắn.' },
  { title: 'Bài 74: Vần oa, oe', slug: 'van-oa-oe', lessonType: 'interactive', sortOrder: 74, durationMinutes: 15, content: 'Bé học hai vần oa và oe, ghép với âm đầu để tạo từ có nghĩa.' },
  { title: 'Bài 75: Ôn tập và kể chuyện 15', slug: 'on-tap-va-ke-chuyen-15', lessonType: 'quiz', sortOrder: 75, durationMinutes: 15, content: 'Bé ôn tập các vần ươ và oa, cùng nghe câu chuyện về cuộc sống.' },
  { title: 'Bài 76: Vần oan, oăn, oat, oăt', slug: 'van-oan-oan-oat-oat', lessonType: 'interactive', sortOrder: 76, durationMinutes: 15, content: 'Bé học bốn vần oan, oăn, oat, oăt và luyện đọc từ chứa bốn vần này.' },
  { title: 'Bài 77: Vần oai, uê, uy', slug: 'van-oai-ue-uy', lessonType: 'interactive', sortOrder: 77, durationMinutes: 15, content: 'Bé học ba vần oai, uê, uy qua các trò chơi ghép vần sinh động.' },
  { title: 'Bài 78: Vần uân, uât', slug: 'van-uan-uat', lessonType: 'interactive', sortOrder: 78, durationMinutes: 15, content: 'Bé học hai vần uân và uât, nhận biết và đọc từ quen thuộc.' },
  { title: 'Bài 79: Vần uyên, uyêt', slug: 'van-uyen-uyet', lessonType: 'interactive', sortOrder: 79, durationMinutes: 15, content: 'Bé học hai vần uyên và uyêt, luyện đọc từ và câu đơn giản.' },
  { title: 'Bài 80: Ôn tập và kể chuyện 16', slug: 'on-tap-va-ke-chuyen-16', lessonType: 'quiz', sortOrder: 80, durationMinutes: 15, content: 'Bé ôn tập toàn bộ vần đã học trong tập 1 và nghe câu chuyện tổng kết.' },

  // ─── Tập 2 — Chủ đề 1: Tôi và các bạn ──────────────────────────────────────
  { title: 'Bài 1: Tôi là học sinh lớp 1', slug: 'toi-la-hoc-sinh-lop-1', lessonType: 'story', sortOrder: 81, durationMinutes: 15, content: 'Bé đọc bài văn về ngày đầu tiên đi học và cảm xúc của một học sinh lớp 1.' },
  { title: 'Bài 2: Đôi tai xấu xí', slug: 'doi-tai-xau-xi', lessonType: 'story', sortOrder: 82, durationMinutes: 15, content: 'Câu chuyện về bạn thỏ tự ti vì đôi tai dài và bài học về yêu thương bản thân.' },
  { title: 'Bài 3: Bạn của gió', slug: 'ban-cua-gio', lessonType: 'story', sortOrder: 83, durationMinutes: 15, content: 'Câu chuyện về cơn gió và những người bạn trong thiên nhiên, học về tình bạn.' },
  { title: 'Bài 4: Giải thưởng tình bạn', slug: 'giai-thuong-tinh-ban', lessonType: 'story', sortOrder: 84, durationMinutes: 15, content: 'Câu chuyện về tình bạn đẹp và phần thưởng dành cho những người biết quan tâm.' },
  { title: 'Bài 5: Sinh nhật của voi con', slug: 'sinh-nhat-cua-voi-con', lessonType: 'story', sortOrder: 85, durationMinutes: 15, content: 'Câu chuyện về sinh nhật vui vẻ của voi con và tình cảm bạn bè trong rừng xanh.' },
  { title: 'Bài 6: Ôn tập - Chủ đề 1', slug: 'on-tap-chu-de-1', lessonType: 'quiz', sortOrder: 86, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề bạn bè qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 2: Mái ấm gia đình ──────────────────────────────────────────────
  { title: 'Bài 7: Nụ hôn trên bàn tay', slug: 'nu-hon-tren-ban-tay', lessonType: 'story', sortOrder: 87, durationMinutes: 15, content: 'Câu chuyện cảm động về tình yêu thương của mẹ dành cho con qua chiếc hôn trên bàn tay.' },
  { title: 'Bài 8: Làm anh', slug: 'lam-anh', lessonType: 'story', sortOrder: 88, durationMinutes: 15, content: 'Bài thơ về trách nhiệm và niềm vui của một cậu bé khi trở thành người anh.' },
  { title: 'Bài 9: Cả nhà đi chơi núi', slug: 'ca-nha-di-choi-nui', lessonType: 'story', sortOrder: 89, durationMinutes: 15, content: 'Câu chuyện về chuyến dã ngoại vui vẻ của gia đình lên núi vào cuối tuần.' },
  { title: 'Bài 10: Quạt cho bà ngủ', slug: 'quat-cho-ba-ngu', lessonType: 'story', sortOrder: 90, durationMinutes: 15, content: 'Bài thơ về tình cảm cháu yêu bà, ngồi quạt mát để bà ngủ ngon trong buổi trưa hè.' },
  { title: 'Bài 11: Bữa cơm gia đình', slug: 'bua-com-gia-dinh', lessonType: 'story', sortOrder: 91, durationMinutes: 15, content: 'Bài văn về bữa cơm sum họp ấm cúng của gia đình và giá trị của những khoảnh khắc bên nhau.' },
  { title: 'Bài 12: Ngôi nhà', slug: 'ngoi-nha', lessonType: 'story', sortOrder: 92, durationMinutes: 15, content: 'Bài thơ về ngôi nhà thân yêu nơi cả gia đình quây quần và tình yêu gia đình.' },
  { title: 'Bài 13: Ôn tập - Chủ đề 2', slug: 'on-tap-chu-de-2', lessonType: 'quiz', sortOrder: 93, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề gia đình qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 3: Mái trường mến yêu ──────────────────────────────────────────
  { title: 'Bài 14: Tôi đi học', slug: 'toi-di-hoc', lessonType: 'story', sortOrder: 94, durationMinutes: 15, content: 'Câu chuyện về hành trình đến trường mỗi ngày và niềm vui được học bài.' },
  { title: 'Bài 15: Đi học', slug: 'di-hoc', lessonType: 'story', sortOrder: 95, durationMinutes: 15, content: 'Bài thơ về niềm vui đi học, gặp bạn bè và thầy cô mỗi buổi sáng.' },
  { title: 'Bài 16: Hoa yêu thương', slug: 'hoa-yeu-thuong', lessonType: 'story', sortOrder: 96, durationMinutes: 15, content: 'Câu chuyện về bé tặng hoa cho cô giáo và tình cảm thầy trò thân thiết.' },
  { title: 'Bài 17: Cây bàng và lớp học', slug: 'cay-bang-va-lop-hoc', lessonType: 'story', sortOrder: 97, durationMinutes: 15, content: 'Bài văn về cây bàng trong sân trường - người bạn gắn bó với tuổi học trò.' },
  { title: 'Bài 18: Bác trống trường', slug: 'bac-trong-truong', lessonType: 'story', sortOrder: 98, durationMinutes: 15, content: 'Câu chuyện về tiếng trống trường báo hiệu giờ học và ý nghĩa của nó với học sinh.' },
  { title: 'Bài 19: Giờ ra chơi', slug: 'gio-ra-choi', lessonType: 'story', sortOrder: 99, durationMinutes: 15, content: 'Bài thơ về những trò chơi vui vẻ trong giờ ra chơi cùng bạn bè ở sân trường.' },
  { title: 'Bài 20: Ôn tập - Chủ đề 3', slug: 'on-tap-chu-de-3', lessonType: 'quiz', sortOrder: 100, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề trường học qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 4: Điều em cần biết ─────────────────────────────────────────────
  { title: 'Bài 21: Rửa tay trước khi ăn', slug: 'rua-tay-truoc-khi-an', lessonType: 'story', sortOrder: 101, durationMinutes: 15, content: 'Bài học về thói quen vệ sinh tốt - rửa tay sạch trước khi ăn để bảo vệ sức khỏe.' },
  { title: 'Bài 22: Lời chào', slug: 'loi-chao', lessonType: 'story', sortOrder: 102, durationMinutes: 15, content: 'Câu chuyện về tầm quan trọng của lời chào và phép lịch sự trong cuộc sống hàng ngày.' },
  { title: 'Bài 23: Khi mẹ vắng nhà', slug: 'khi-me-vang-nha', lessonType: 'story', sortOrder: 103, durationMinutes: 15, content: 'Câu chuyện về bé tự làm việc nhà giúp mẹ và học tính tự lập từ nhỏ.' },
  { title: 'Bài 24: Nếu không may bị lạc', slug: 'neu-khong-may-bi-lac', lessonType: 'story', sortOrder: 104, durationMinutes: 15, content: 'Bài học về cách xử lý khi bị lạc và những điều cần làm để được an toàn.' },
  { title: 'Bài 25: Đèn giao thông', slug: 'den-giao-thong', lessonType: 'story', sortOrder: 105, durationMinutes: 15, content: 'Bài học về an toàn giao thông và ý nghĩa của các màu đèn xanh - đỏ - vàng.' },
  { title: 'Bài 26: Ôn tập - Chủ đề 4', slug: 'on-tap-chu-de-4', lessonType: 'quiz', sortOrder: 106, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề kỹ năng sống qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 5: Bài học từ cuộc sống ─────────────────────────────────────────
  { title: 'Bài 27: Kiến và chim bồ câu', slug: 'kien-va-chim-bo-cau', lessonType: 'story', sortOrder: 107, durationMinutes: 15, content: 'Câu chuyện ngụ ngôn về kiến và chim bồ câu, bài học về sự biết ơn và tương trợ.' },
  { title: 'Bài 28: Câu chuyện của rễ', slug: 'cau-chuyen-cua-re', lessonType: 'story', sortOrder: 108, durationMinutes: 15, content: 'Câu chuyện về chiếc rễ cây âm thầm nuôi dưỡng cây và bài học về sự hi sinh.' },
  { title: 'Bài 29: Câu hỏi của sói', slug: 'cau-hoi-cua-soi', lessonType: 'story', sortOrder: 109, durationMinutes: 15, content: 'Câu chuyện về chú sói tò mò đặt câu hỏi và hành trình tìm kiếm câu trả lời.' },
  { title: 'Bài 30: Chú bé chăn cừu', slug: 'chu-be-chan-cuu', lessonType: 'story', sortOrder: 110, durationMinutes: 15, content: 'Câu chuyện ngụ ngôn về chú bé hay nói dối và bài học về sự trung thực.' },
  { title: 'Bài 31: Tiếng vọng của núi', slug: 'tieng-vong-cua-nui', lessonType: 'story', sortOrder: 111, durationMinutes: 15, content: 'Câu chuyện về tiếng vọng của núi và bài học về điều mình cho đi sẽ nhận lại.' },
  { title: 'Bài 32: Ôn tập - Chủ đề 5', slug: 'on-tap-chu-de-5', lessonType: 'quiz', sortOrder: 112, durationMinutes: 15, content: 'Bé ôn tập các câu chuyện ngụ ngôn qua các câu hỏi đọc hiểu và rút ra bài học.' },

  // ─── Chủ đề 6: Thiên nhiên kì thú ───────────────────────────────────────────
  { title: 'Bài 33: Loài chim của biển cả', slug: 'loai-chim-cua-bien-ca', lessonType: 'story', sortOrder: 113, durationMinutes: 15, content: 'Bài đọc về loài chim biển và cuộc sống kỳ diệu của chúng trên đại dương.' },
  { title: 'Bài 34: Bảy sắc cầu vồng', slug: 'bay-sac-cau-vong', lessonType: 'story', sortOrder: 114, durationMinutes: 15, content: 'Câu chuyện về cầu vồng với bảy màu sắc rực rỡ và vẻ đẹp của thiên nhiên.' },
  { title: 'Bài 35: Chúa tể rừng xanh', slug: 'chua-te-rung-xanh', lessonType: 'story', sortOrder: 115, durationMinutes: 15, content: 'Câu chuyện về sư tử - chúa tể rừng xanh và cuộc sống các loài vật trong rừng.' },
  { title: 'Bài 36: Cuộc thi tài năng rừng xanh', slug: 'cuoc-thi-tai-nang-rung-xanh', lessonType: 'story', sortOrder: 116, durationMinutes: 15, content: 'Câu chuyện về cuộc thi tài năng vui nhộn của các loài vật trong khu rừng.' },
  { title: 'Bài 37: Cây liễu dẻo dai', slug: 'cay-lieu-deo-dai', lessonType: 'story', sortOrder: 117, durationMinutes: 15, content: 'Câu chuyện về cây liễu dẻo dai vượt qua bão tố và bài học về sự kiên cường.' },
  { title: 'Bài 38: Ôn tập - Chủ đề 6', slug: 'on-tap-chu-de-6', lessonType: 'quiz', sortOrder: 118, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề thiên nhiên qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 7: Thế giới trong mắt em ────────────────────────────────────────
  { title: 'Bài 39: Tia nắng đi đâu', slug: 'tia-nang-di-dau', lessonType: 'story', sortOrder: 119, durationMinutes: 15, content: 'Bài thơ về hành trình của tia nắng mặt trời chiếu sáng khắp nơi trên thế giới.' },
  { title: 'Bài 40: Trong giấc mơ buổi sáng', slug: 'trong-giac-mo-buoi-sang', lessonType: 'story', sortOrder: 120, durationMinutes: 15, content: 'Câu chuyện về giấc mơ đẹp của bé vào buổi sáng và thế giới tưởng tượng kỳ diệu.' },
  { title: 'Bài 41: Ngày mới bắt đầu', slug: 'ngay-moi-bat-dau', lessonType: 'story', sortOrder: 121, durationMinutes: 15, content: 'Bài thơ về buổi sáng tươi đẹp và những điều kỳ diệu khi một ngày mới bắt đầu.' },
  { title: 'Bài 42: Hỏi mẹ', slug: 'hoi-me', lessonType: 'story', sortOrder: 122, durationMinutes: 15, content: 'Bài thơ về bé hỏi mẹ những câu hỏi thú vị về thế giới xung quanh.' },
  { title: 'Bài 43: Những cánh cò', slug: 'nhung-canh-co', lessonType: 'story', sortOrder: 123, durationMinutes: 15, content: 'Bài thơ về những cánh cò trắng bay trên đồng lúa xanh - hình ảnh quen thuộc của làng quê.' },
  { title: 'Bài 44: Buổi trưa hè', slug: 'buoi-trua-he', lessonType: 'story', sortOrder: 124, durationMinutes: 15, content: 'Bài thơ về buổi trưa hè yên tĩnh với tiếng ve kêu và hình ảnh làng quê bình yên.' },
  { title: 'Bài 45: Hoa phượng', slug: 'hoa-phuong', lessonType: 'story', sortOrder: 125, durationMinutes: 15, content: 'Bài thơ về hoa phượng đỏ nở rực trời báo hiệu mùa hè và kỳ nghỉ của học sinh.' },
  { title: 'Bài 46: Ôn tập - Chủ đề 7', slug: 'on-tap-chu-de-7', lessonType: 'quiz', sortOrder: 126, durationMinutes: 15, content: 'Bé ôn tập các bài thơ về thiên nhiên và mùa hè qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 8: Đất nước và con người ────────────────────────────────────────
  { title: 'Bài 47: Cậu bé thông minh', slug: 'cau-be-thong-minh', lessonType: 'story', sortOrder: 127, durationMinutes: 15, content: 'Câu chuyện về cậu bé dùng trí thông minh để giải quyết vấn đề khó khăn.' },
  { title: 'Bài 48: Lính cứu hỏa', slug: 'linh-cuu-hoa', lessonType: 'story', sortOrder: 128, durationMinutes: 15, content: 'Bài đọc về công việc dũng cảm của các chú lính cứu hỏa và lòng biết ơn của mọi người.' },
  { title: 'Bài 49: Lớn lên bạn làm gì?', slug: 'lon-len-ban-lam-gi', lessonType: 'story', sortOrder: 129, durationMinutes: 15, content: 'Câu chuyện về các bạn nhỏ chia sẻ ước mơ nghề nghiệp khi lớn lên.' },
  { title: 'Bài 50: Ruộng bậc thang ở Sa Pa', slug: 'ruong-bac-thang-o-sa-pa', lessonType: 'story', sortOrder: 130, durationMinutes: 15, content: 'Bài đọc về vẻ đẹp kỳ diệu của ruộng bậc thang ở Sa Pa và cuộc sống người dân vùng cao.' },
  { title: 'Bài 51: Nhớ ơn', slug: 'nho-on', lessonType: 'story', sortOrder: 131, durationMinutes: 15, content: 'Bài thơ về lòng biết ơn đối với ông bà, cha mẹ và thầy cô đã dạy dỗ chúng ta.' },
  { title: 'Bài 52: Du lịch biển Việt Nam', slug: 'du-lich-bien-viet-nam', lessonType: 'story', sortOrder: 132, durationMinutes: 15, content: 'Bài đọc về vẻ đẹp của biển Việt Nam và những địa danh du lịch nổi tiếng.' },
  { title: 'Bài 53: Ôn tập - Chủ đề 8', slug: 'on-tap-chu-de-8', lessonType: 'quiz', sortOrder: 133, durationMinutes: 15, content: 'Bé ôn tập các bài đọc về chủ đề quê hương đất nước qua các câu hỏi đọc hiểu.' },

  // ─── Chủ đề 9: Ôn tập và đánh giá ───────────────────────────────────────────
  { title: 'Bài 54: Ôn tập và đánh giá - Bài tập số 1', slug: 'on-tap-danh-gia-bai-tap-1', lessonType: 'quiz', sortOrder: 134, durationMinutes: 20, content: 'Bé làm bài tập ôn tập tổng hợp phần 1 để củng cố kiến thức đã học trong học kỳ.' },
  { title: 'Bài 55: Ôn tập và đánh giá - Bài tập số 2', slug: 'on-tap-danh-gia-bai-tap-2', lessonType: 'quiz', sortOrder: 135, durationMinutes: 20, content: 'Bé làm bài tập ôn tập tổng hợp phần 2 với các bài đọc hiểu và câu hỏi kiểm tra.' },
  { title: 'Bài 56: Ôn tập và đánh giá - Bài tập số 3', slug: 'on-tap-danh-gia-bai-tap-3', lessonType: 'quiz', sortOrder: 136, durationMinutes: 20, content: 'Bé hoàn thành bài tập ôn tập cuối cùng để đánh giá toàn bộ kiến thức Tiếng Việt lớp 1.' },
];

async function seed() {
  await ds.initialize();
  console.log('Connected to database');
  const qr = ds.createQueryRunner();
  await qr.connect();

  try {
    // Xóa 2 course tập 1 & tập 2 (nếu có) cùng toàn bộ lessons
    for (const oldSlug of ['tieng-viet-lop-1-tap-1', 'tieng-viet-lop-1-tap-2']) {
      const rows = await qr.query('SELECT id FROM courses WHERE slug = ?', [oldSlug]);
      if (rows.length > 0) {
        const id = rows[0].id;
        await qr.query('DELETE FROM lessons WHERE courseId = ?', [id]);
        await qr.query('DELETE FROM courses WHERE id = ?', [id]);
        console.log(`Deleted old course: ${oldSlug}`);
      }
    }

    const adminRows = await qr.query('SELECT id FROM users LIMIT 1');
    const adminId: number = adminRows[0]?.id ?? 1;

    // Upsert course
    const existing = await qr.query('SELECT id FROM courses WHERE slug = ?', [COURSE_SLUG]);
    let courseId: number;

    if (existing.length > 0) {
      courseId = existing[0].id;
      await qr.query(
        `UPDATE courses SET title=?, totalLessons=?, estimatedMinutes=?, updatedAt=NOW() WHERE id=?`,
        ['Tiếng Việt lớp 1', LESSONS.length, LESSONS.length * 15, courseId],
      );
      console.log(`Updated course: Tiếng Việt lớp 1 (id=${courseId})`);
    } else {
      const res = await qr.query(
        `INSERT INTO courses
         (title, slug, shortDescription, description, courseType, difficultyLevel,
          targetAgeMin, targetAgeMax, totalLessons, estimatedMinutes,
          isPublished, isFree, price, createdById, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          'Tiếng Việt lớp 1',
          COURSE_SLUG,
          'Học chữ cái, vần và đọc hiểu văn bản Tiếng Việt lớp 1',
          'Khóa học toàn diện Tiếng Việt lớp 1: tập 1 học chữ cái và vần (80 bài), tập 2 luyện đọc hiểu văn bản theo 8 chủ đề (56 bài).',
          'language',
          'beginner',
          6, 7,
          LESSONS.length,
          LESSONS.length * 15,
          1, 0, 99000,
          adminId,
        ],
      );
      courseId = res.insertId;
      console.log(`Created course: Tiếng Việt lớp 1 (id=${courseId})`);
    }

    // ── Volumes ────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM volumes WHERE courseId = ?', [courseId]);
    const volDefs = [
      { name: 'TIẾNG VIỆT LỚP 1 - TẬP 1', sortOrder: 1 },
      { name: 'TIẾNG VIỆT LỚP 1 - TẬP 2', sortOrder: 2 },
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

    // ── Topics ─────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM topics WHERE courseId = ?', [courseId]);
    const topicDefs: { name: string; vol: number; sortOrder: number; minOrder: number; maxOrder: number }[] = [
      // Tập 1
      { name: 'Chữ cái và dấu thanh', vol: vol1Id, sortOrder: 1, minOrder: 1,  maxOrder: 30  },
      { name: 'Vần',                   vol: vol1Id, sortOrder: 2, minOrder: 31, maxOrder: 80  },
      // Tập 2
      { name: 'Chủ đề 1: Tôi và các bạn',         vol: vol2Id, sortOrder: 1, minOrder: 81,  maxOrder: 86  },
      { name: 'Chủ đề 2: Mái ấm gia đình',         vol: vol2Id, sortOrder: 2, minOrder: 87,  maxOrder: 93  },
      { name: 'Chủ đề 3: Mái trường mến yêu',      vol: vol2Id, sortOrder: 3, minOrder: 94,  maxOrder: 100 },
      { name: 'Chủ đề 4: Điều em cần biết',        vol: vol2Id, sortOrder: 4, minOrder: 101, maxOrder: 106 },
      { name: 'Chủ đề 5: Bài học từ cuộc sống',    vol: vol2Id, sortOrder: 5, minOrder: 107, maxOrder: 112 },
      { name: 'Chủ đề 6: Thiên nhiên kì thú',      vol: vol2Id, sortOrder: 6, minOrder: 113, maxOrder: 118 },
      { name: 'Chủ đề 7: Thế giới trong mắt em',   vol: vol2Id, sortOrder: 7, minOrder: 119, maxOrder: 126 },
      { name: 'Chủ đề 8: Đất nước và con người',   vol: vol2Id, sortOrder: 8, minOrder: 127, maxOrder: 133 },
      { name: 'Chủ đề 9: Ôn tập và đánh giá',      vol: vol2Id, sortOrder: 9, minOrder: 134, maxOrder: 136 },
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

    // ── Lessons ────────────────────────────────────────────────────────────────
    await qr.query('DELETE FROM lessons WHERE courseId = ?', [courseId]);

    for (const l of LESSONS) {
      const tm = topicMap.find((t) => l.sortOrder >= t.minOrder && l.sortOrder <= t.maxOrder);
      const volId = l.sortOrder <= 80 ? vol1Id : vol2Id;
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
