import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  originalName: string;

  @Column({ default: '' })
  folder: string;

  @Column({ nullable: true })
  mimeType: string;

  @Column({ nullable: true })
  size: number;

  @CreateDateColumn()
  createdAt: Date;
}
