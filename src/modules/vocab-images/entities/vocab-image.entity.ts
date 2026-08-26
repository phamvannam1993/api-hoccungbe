import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

/**
 * Ảnh do admin upload cho từng từ vựng tiếng Anh (game từ vựng).
 * `wordId` khớp `id` trong dữ liệu tĩnh `englishVocabularyData.ts` (vd 'animal-cat').
 * Nếu có bản ghi → frontend hiển thị ảnh; không có → dùng emoji mặc định.
 */
@Entity('vocab_images')
export class VocabImage {
  @PrimaryColumn({ type: 'varchar', length: 120 })
  wordId: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
