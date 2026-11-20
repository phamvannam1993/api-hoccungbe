import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, randomInt } from 'crypto';
import { Repository } from 'typeorm';
import { ChallengeRoom } from './entities/challenge-room.entity';
import { ChallengeRoomScore } from './entities/challenge-room-score.entity';

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bỏ 0/O, 1/I cho trẻ dễ gõ
const ROOM_HOURS = 48;
const MAX_PLAYERS = 60;
const MAX_SCORE = 200; // khớp trần điểm một lượt của Sân chơi

const name40 = (v: unknown, fallback = 'Bé ẩn danh') =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, 40) : fallback;

export type RoomView = {
  code: string;
  title: string;
  hostName: string;
  grade: number;
  seed: string;
  expiresAt: string;
  expired: boolean;
  players: {
    name: string;
    avatar: string | null;
    score: number;
    correct: number;
    timeSec: number;
    rank: number;
  }[];
};

@Injectable()
export class ChallengeRoomsService {
  constructor(
    @InjectRepository(ChallengeRoom)
    private readonly rooms: Repository<ChallengeRoom>,
    @InjectRepository(ChallengeRoomScore)
    private readonly scores: Repository<ChallengeRoomScore>,
  ) {}

  private code() {
    let s = '';
    for (let i = 0; i < 6; i++)
      s += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
    return s;
  }

  /** Tạo phòng: trả mã mời + seed. Thử lại vài lần nếu trùng mã (hiếm). */
  async create(
    rawHost: unknown,
    rawGrade: unknown,
    rawTitle: unknown,
  ): Promise<RoomView> {
    const hostName = name40(rawHost);
    const grade = Math.min(5, Math.max(1, Math.floor(Number(rawGrade) || 2)));
    const title = name40(rawTitle, `Phòng của ${hostName}`).slice(0, 60);
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = this.code();
      if (await this.rooms.exist({ where: { code } })) continue;
      const room = this.rooms.create({
        code,
        title,
        hostName,
        grade,
        seed: randomBytes(8).toString('hex'),
        expiresAt: new Date(Date.now() + ROOM_HOURS * 3600 * 1000),
      });
      await this.rooms.save(room);
      return this.view(room);
    }
    throw new BadRequestException('Chưa tạo được phòng, vui lòng thử lại.');
  }

  private async find(rawCode: unknown): Promise<ChallengeRoom> {
    const code =
      typeof rawCode === 'string' ? rawCode.trim().toUpperCase() : '';
    if (!/^[A-Z0-9]{6}$/.test(code))
      throw new NotFoundException('Mã phòng không đúng.');
    const room = await this.rooms.findOne({ where: { code } });
    if (!room)
      throw new NotFoundException('Không tìm thấy phòng. Kiểm tra lại mã nhé.');
    return room;
  }

  private async view(room: ChallengeRoom): Promise<RoomView> {
    const rows = await this.scores.find({
      where: { roomId: room.id },
      order: { score: 'DESC', timeSec: 'ASC', updatedAt: 'ASC' },
      take: MAX_PLAYERS,
    });
    return {
      code: room.code,
      title: room.title,
      hostName: room.hostName,
      grade: room.grade,
      seed: room.seed,
      expiresAt: room.expiresAt.toISOString(),
      expired: room.expiresAt.getTime() < Date.now(),
      players: rows.map((r, i) => ({
        name: r.name,
        avatar: r.avatar,
        score: r.score,
        correct: r.correct,
        timeSec: r.timeSec,
        rank: i + 1,
      })),
    };
  }

  async get(rawCode: unknown): Promise<RoomView> {
    return this.view(await this.find(rawCode));
  }

  /** Nộp điểm: giữ lượt tốt nhất của mỗi biệt danh. Phòng hết hạn hoặc đủ người thì từ chối. */
  async submit(
    rawCode: unknown,
    body: {
      name?: unknown;
      avatar?: unknown;
      score?: unknown;
      correct?: unknown;
      time?: unknown;
    },
  ): Promise<RoomView & { myRank: number }> {
    const room = await this.find(rawCode);
    if (room.expiresAt.getTime() < Date.now())
      throw new BadRequestException('Phòng đã kết thúc.');
    const name = name40(body.name);
    const score = Math.max(
      0,
      Math.min(MAX_SCORE, Math.floor(Number(body.score) || 0)),
    );
    const correct = Math.max(
      0,
      Math.min(10, Math.floor(Number(body.correct) || 0)),
    );
    const timeSec = Math.max(
      0,
      Math.min(3600, Math.floor(Number(body.time) || 0)),
    );
    const avatar =
      typeof body.avatar === 'string' && body.avatar
        ? body.avatar.slice(0, 255)
        : null;
    let row = await this.scores.findOne({ where: { roomId: room.id, name } });
    if (!row) {
      if (
        (await this.scores.count({ where: { roomId: room.id } })) >= MAX_PLAYERS
      )
        throw new BadRequestException('Phòng đã đủ người.');
      row = this.scores.create({
        roomId: room.id,
        name,
        avatar,
        score,
        correct,
        timeSec,
      });
    } else if (
      score > row.score ||
      (score === row.score && timeSec < row.timeSec)
    ) {
      Object.assign(row, {
        score,
        correct,
        timeSec,
        avatar: avatar ?? row.avatar,
      });
    } else if (avatar) {
      row.avatar = avatar;
    }
    await this.scores.save(row);
    const view = await this.view(room);
    return {
      ...view,
      myRank: view.players.find((p) => p.name === name)?.rank ?? 0,
    };
  }
}
