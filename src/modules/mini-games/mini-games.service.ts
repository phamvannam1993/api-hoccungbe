import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiniGame } from './entities/mini-game.entity';
import { CreateMiniGameDto } from './dto/create-mini-game.dto';
import { UpdateMiniGameDto } from './dto/update-mini-game.dto';
import { ReorderMiniGamesDto } from './dto/reorder-mini-games.dto';

const SLUG_TO_ROUTE: Record<string, string> = {
  'ghep-tu': 'match-word', 'toan-vui': 'math-fun', 'san-hinh-ghi-nho': 'memory-hunt',
  'tu-vung-tieng-anh': 'english-vocab', 'ghep-am-thanh': 'sound-match', 'chon-nhanh': 'quick-pick',
  'tim-so-thieu': 'missing-number', 'ghep-bong': 'shadow-match', 'sap-xep-mau': 'color-sort',
  'dem-dong-vat': 'count-animals', 'chu-cai-dau': 'first-letter', 'ghep-nhom': 'group-match',
  'cap-doi-trai-nghia': 'opposite-pairs', 'sap-xep-thu-tu': 'sequence-sort', 'tim-ke-le': 'odd-one-out',
  'am-dau': 'initial-sound', 'so-va-so-luong': 'number-quantity-match', 'hoan-thanh-quy-luat': 'pattern-complete',
  'nghe-va-lam': 'listen-and-do', 'me-cung-nho': 'mini-maze', 'ghep-doi': 'half-match',
  'nho-thu-tu': 'sequence-memory', 'ghep-van': 'rhyme-match', 'noi-so': 'connect-numbers',
  'hai-tao': 'apple-pick', 'cho-vat-an': 'animal-feed', 'toan-bong-bong': 'bubble-math',
  'cong-tren-so-do': 'number-line-addition', 'so-sanh-so': 'compare-numbers',
  'viet-day-so': 'number-sequence-write', 'so-roi': 'falling-number', 'tim-cho-cho-vat': 'where-belongs',
  'sap-xep-truyen': 'story-order', 'dem-chim': 'bird-count', 'chim-bay-mat': 'bird-subtraction',
  'tho-vao-hang': 'rabbit-hole', 'tho-cap-ca-rot': 'rabbit-steal-quantity',
  'ca-trong-ho': 'pool-fish-first-grade', 'hai-tao-hoc': 'apple-picking-complete',
  'tau-hoc-toan': 'train-complete-lessons', 'day-so': 'number-sequence', 'keo-cot-so': 'column-lift-drag',
};

const HOMEPAGE_SLUGS = [
  'tau-hoc-toan', 'day-so', 'tho-vao-hang', 'tho-cap-ca-rot',
  'chim-bay-mat', 'dem-chim', 'ca-trong-ho', 'hai-tao-hoc', 'keo-cot-so',
];

const GAMES_SEED = [
  { slug: 'ghep-tu', title: 'Ghép chữ với hình', emoji: '🔤', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Dễ', skills: ['Nhận diện từ', 'Ghi nhớ hình ảnh', 'Phản xạ ngôn ngữ'], sortOrder: 1 },
  { slug: 'toan-vui', title: 'Toán vui cộng trừ', emoji: '➕', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Cộng trừ cơ bản', 'Tư duy logic'], sortOrder: 2 },
  { slug: 'san-hinh-ghi-nho', title: 'Săn hình ghi nhớ', emoji: '🧠', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Dễ', skills: ['Ghi nhớ', 'Quan sát', 'Tập trung'], sortOrder: 3 },
  { slug: 'tu-vung-tieng-anh', title: 'Từ vựng tiếng Anh', emoji: '🌍', age: '6-8 tuổi', ageGroup: '6-8', category: 'Tiếng Anh', groupKey: 'english', difficulty: 'Trung bình', skills: ['Từ vựng tiếng Anh', 'Ghi nhớ'], sortOrder: 4 },
  { slug: 'ghep-am-thanh', title: 'Ghép cặp âm thanh', emoji: '🔊', age: '3-5 tuổi', ageGroup: '3-5', category: 'Âm thanh', groupKey: 'listening', difficulty: 'Dễ', skills: ['Lắng nghe', 'Nhận diện âm thanh'], sortOrder: 5 },
  { slug: 'chon-nhanh', title: 'Nhìn nhanh chọn đúng', emoji: '⚡', age: '5-8 tuổi', ageGroup: '5-8', category: 'Phản xạ', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phản xạ', 'Quan sát'], sortOrder: 6 },
  { slug: 'tim-so-thieu', title: 'Tìm số còn thiếu', emoji: '🔢', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận diện số', 'Quy luật'], sortOrder: 7 },
  { slug: 'ghep-bong', title: 'Ghép bóng với đồ vật', emoji: '🌓', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Quan sát hình khối', 'So sánh'], sortOrder: 8 },
  { slug: 'sap-xep-mau', title: 'Phân loại màu sắc', emoji: '🌈', age: '3-5 tuổi', ageGroup: '3-5', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Nhận diện màu sắc', 'Phân loại'], sortOrder: 9 },
  { slug: 'dem-dong-vat', title: 'Đếm con vật', emoji: '🐻', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Quan sát'], sortOrder: 10 },
  { slug: 'chu-cai-dau', title: 'Chọn chữ cái đầu', emoji: '🅰️', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Mặt chữ', 'Từ vựng'], sortOrder: 11 },
  { slug: 'ghep-nhom', title: 'Nối hình theo nhóm', emoji: '🧩', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phân loại', 'Tư duy logic'], sortOrder: 12 },
  { slug: 'cap-doi-trai-nghia', title: 'Tìm cặp đối lập', emoji: '↔️', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['So sánh', 'Từ vựng'], sortOrder: 13 },
  { slug: 'sap-xep-thu-tu', title: 'Sắp xếp số theo thứ tự', emoji: '📏', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Sắp xếp số', 'So sánh số'], sortOrder: 14 },
  { slug: 'tim-ke-le', title: 'Tìm vật khác nhóm', emoji: '🚫', age: '4-6 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Dễ', skills: ['Phân loại', 'Tư duy logic'], sortOrder: 15 },
  { slug: 'am-dau', title: 'Nghe âm đầu chọn hình', emoji: '🔠', age: '4-6 tuổi', ageGroup: '4-6', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Nhận biết âm đầu', 'Từ vựng'], sortOrder: 16 },
  { slug: 'so-va-so-luong', title: 'Ghép số với số lượng', emoji: '🔢', age: '3-5 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Nhận diện số'], sortOrder: 17 },
  { slug: 'hoan-thanh-quy-luat', title: 'Điền hình theo quy luật', emoji: '🟠', age: '5-7 tuổi', ageGroup: '5-7', category: 'Tư duy', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận diện quy luật', 'Tư duy logic'], sortOrder: 18 },
  { slug: 'nghe-va-lam', title: 'Nghe và làm theo', emoji: '👂', age: '3-5 tuổi', ageGroup: '3-5', category: 'Âm thanh', groupKey: 'listening', difficulty: 'Dễ', skills: ['Nghe hiểu', 'Tập trung'], sortOrder: 19 },
  { slug: 'me-cung-nho', title: 'Mê cung vui nhộn', emoji: '🌀', age: '5-7 tuổi', ageGroup: '5-7', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Định hướng không gian', 'Quan sát'], sortOrder: 20 },
  { slug: 'ghep-doi', title: 'Ghép nửa còn lại', emoji: '🧩', age: '3-5 tuổi', ageGroup: '3-5', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Dễ', skills: ['Nhận diện hình', 'Quan sát'], sortOrder: 21 },
  { slug: 'nho-thu-tu', title: 'Nhớ thứ tự xuất hiện', emoji: '🧠', age: '5-7 tuổi', ageGroup: '5-7', category: 'Ghi nhớ', groupKey: 'memory', difficulty: 'Trung bình', skills: ['Ghi nhớ chuỗi', 'Tập trung'], sortOrder: 22 },
  { slug: 'ghep-van', title: 'Chọn vần giống nhau', emoji: '🎵', age: '5-7 tuổi', ageGroup: '5-7', category: 'Ngôn ngữ', groupKey: 'language', difficulty: 'Trung bình', skills: ['Nhận biết vần', 'Đọc sớm'], sortOrder: 23 },
  { slug: 'noi-so', title: 'Nối số theo thứ tự', emoji: '📍', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Thứ tự số', 'Đếm số'], sortOrder: 24 },
  { slug: 'hai-tao', title: 'Nhặt táo theo số', emoji: '🍎', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Quan sát'], sortOrder: 25 },
  { slug: 'cho-vat-an', title: 'Cho thú ăn đúng số lượng', emoji: '🐰', age: '4-6 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Tập trung'], sortOrder: 26 },
  { slug: 'toan-bong-bong', title: 'Bắn bong bóng kết quả', emoji: '🎈', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Cộng trừ cơ bản', 'Phản xạ nhanh'], sortOrder: 27 },
  { slug: 'cong-tren-so-do', title: 'Cộng trên trục số', emoji: '📏', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Phép cộng', 'Trục số'], sortOrder: 28 },
  { slug: 'so-sanh-so', title: 'So sánh số', emoji: '⚖️', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Dễ', skills: ['So sánh số'], sortOrder: 29 },
  { slug: 'viet-day-so', title: 'Viết dãy số', emoji: '✍️', age: '5-7 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Dãy số', 'Quy luật'], sortOrder: 30 },
  { slug: 'so-roi', title: 'Bắt số đúng', emoji: '🔢', age: '6-10 tuổi', ageGroup: '6-8', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Nâng cao', skills: ['Tính nhẩm', 'Phản xạ nhanh'], sortOrder: 31 },
  { slug: 'tim-cho-cho-vat', title: 'Đồ vật ở đâu?', emoji: '🏡', age: '4-7 tuổi', ageGroup: '4-6', category: 'Tư duy', groupKey: 'thinking-observation', difficulty: 'Trung bình', skills: ['Phân loại', 'Quan sát'], sortOrder: 32 },
  { slug: 'sap-xep-truyen', title: 'Sắp xếp trước - sau', emoji: '🧩', age: '5-8 tuổi', ageGroup: '5-8', category: 'Tư duy', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Tư duy thời gian', 'Quan sát'], sortOrder: 33 },
  { slug: 'dem-chim', title: 'Đếm chim', emoji: '🐦', age: '3-6 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số', 'Quan sát'], sortOrder: 34 },
  { slug: 'tho-vao-hang', title: 'Thỏ vào hang', emoji: '🐰', age: '3-7 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Nhận biết số', 'Phối hợp tay-mắt'], sortOrder: 35 },
  { slug: 'tho-cap-ca-rot', title: 'Thỏ cắp cà rốt', emoji: '🥕', age: '3-7 tuổi', ageGroup: '3-5', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Dễ', skills: ['Đếm số lượng', 'Phối hợp tay-mắt'], sortOrder: 36 },
  { slug: 'chim-bay-mat', title: 'Chim bay mất', emoji: '🐦', age: '4-7 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép trừ', 'Đếm số'], sortOrder: 37 },
  { slug: 'ca-trong-ho', title: 'Cá trong hồ bơi', emoji: '🐟', age: '4-7 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số'], sortOrder: 38 },
  { slug: 'hai-tao-hoc', title: 'Hái táo học toán', emoji: '🍎', age: '4-8 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số'], sortOrder: 39 },
  { slug: 'tau-hoc-toan', title: 'Đoàn tàu toán học', emoji: '🚂', age: '4-8 tuổi', ageGroup: '4-6', category: 'Toán học', groupKey: 'math-counting', difficulty: 'Trung bình', skills: ['Phép cộng', 'Phép trừ', 'Đếm số', 'Dãy số'], sortOrder: 40 },
  { slug: 'day-so', title: 'Dãy số', emoji: '🔢', age: '5-8 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận biết quy luật', 'Dãy số'], sortOrder: 41 },
  { slug: 'keo-cot-so', title: 'Kéo cột số', emoji: '📊', age: '5-8 tuổi', ageGroup: '5-7', category: 'Toán học', groupKey: 'math-logic', difficulty: 'Trung bình', skills: ['Nhận biết quy luật', 'Dãy số'], sortOrder: 42 },
];

@Injectable()
export class MiniGamesService implements OnModuleInit {
  private readonly logger = new Logger(MiniGamesService.name);

  constructor(
    @InjectRepository(MiniGame) private miniGameRepo: Repository<MiniGame>,
  ) {}

  async onModuleInit() {
    await this.seedIfEmpty();
  }

  private async seedIfEmpty() {
    const count = await this.miniGameRepo.count();
    if (count > 0) return; // already seeded

    this.logger.log('Seeding mini_games table...');
    let inserted = 0;
    for (const data of GAMES_SEED) {
      const homepageIndex = HOMEPAGE_SLUGS.indexOf(data.slug);
      const game = this.miniGameRepo.create({
        ...data,
        routeKey: SLUG_TO_ROUTE[data.slug] || data.slug,
        showOnHomepage: homepageIndex !== -1,
        homepageOrder: homepageIndex !== -1 ? homepageIndex : 99,
        isActive: true,
        status: 'ready',
      });
      await this.miniGameRepo.save(game);
      inserted++;
    }
    this.logger.log(`Seeded ${inserted} mini games.`);
  }

  findAll(query: { showOnHomepage?: boolean; isActive?: boolean } = {}) {
    const where: { showOnHomepage?: boolean; isActive?: boolean } = {};
    if (query.showOnHomepage !== undefined) where.showOnHomepage = query.showOnHomepage;
    if (query.isActive !== undefined) where.isActive = query.isActive;
    return this.miniGameRepo.find({ where, order: { sortOrder: 'ASC', id: 'ASC' } });
  }

  findHomepage() {
    return this.miniGameRepo.find({
      where: { showOnHomepage: true, isActive: true },
      order: { homepageOrder: 'ASC', sortOrder: 'ASC' },
    });
  }

  async findOne(id: number) {
    const game = await this.miniGameRepo.findOne({ where: { id } });
    if (!game) throw new NotFoundException('Mini game not found');
    return game;
  }

  create(dto: CreateMiniGameDto) {
    const game = this.miniGameRepo.create(dto);
    return this.miniGameRepo.save(game);
  }

  async update(id: number, dto: UpdateMiniGameDto) {
    const game = await this.findOne(id);
    Object.assign(game, dto);
    return this.miniGameRepo.save(game);
  }

  async remove(id: number) {
    const game = await this.findOne(id);
    return this.miniGameRepo.remove(game);
  }

  async toggleHomepage(id: number) {
    const game = await this.findOne(id);
    game.showOnHomepage = !game.showOnHomepage;
    return this.miniGameRepo.save(game);
  }

  async reorder(dto: ReorderMiniGamesDto) {
    const updates = dto.ids.map((id, index) =>
      this.miniGameRepo.update(id, { homepageOrder: index }),
    );
    await Promise.all(updates);
    return { success: true };
  }
}
