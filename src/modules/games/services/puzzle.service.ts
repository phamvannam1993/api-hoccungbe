import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puzzle } from '../entities/puzzle.entity';
import { PuzzlePiece } from '../entities/puzzle-piece.entity';
import { PuzzleProgress } from '../entities/puzzle-progress.entity';
import { CreatePuzzleDto } from '../dto/create-puzzle.dto';
import { CreatePuzzlePieceDto } from '../dto/create-puzzle-piece.dto';
import { SubmitPuzzleDto } from '../dto/submit-puzzle.dto';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(Puzzle)
    private readonly puzzleRepository: Repository<Puzzle>,
    @InjectRepository(PuzzlePiece)
    private readonly pieceRepository: Repository<PuzzlePiece>,
    @InjectRepository(PuzzleProgress)
    private readonly progressRepository: Repository<PuzzleProgress>,
  ) {}

  // ─── Puzzle Management ──────────────────────────────────────────────────

  async createPuzzle(dto: CreatePuzzleDto) {
    const entity = this.puzzleRepository.create(dto);
    return this.puzzleRepository.save(entity);
  }

  async findAllPuzzles(lessonId?: number) {
    if (lessonId) {
      return this.puzzleRepository.find({
        where: { lessonId },
        order: { sortOrder: 'ASC' },
      });
    }
    return this.puzzleRepository.find({
      order: { sortOrder: 'ASC' },
    });
  }

  async findOnePuzzle(id: number) {
    const puzzle = await this.puzzleRepository.findOne({
      where: { id },
      relations: ['pieces'],
      order: {
        pieces: {
          sortOrder: 'ASC',
        },
      },
    });
    if (!puzzle) throw new NotFoundException('Puzzle not found');
    return puzzle;
  }

  async updatePuzzle(id: number, dto: Partial<CreatePuzzleDto>) {
    const puzzle = await this.findOnePuzzle(id);
    Object.assign(puzzle, dto);
    return this.puzzleRepository.save(puzzle);
  }

  async removePuzzle(id: number) {
    const puzzle = await this.findOnePuzzle(id);
    await this.puzzleRepository.remove(puzzle);
    return { message: 'Puzzle deleted successfully' };
  }

  async getPuzzlePlayData(id: number) {
    const puzzle = await this.findOnePuzzle(id);
    return {
      ...puzzle,
      pieces: puzzle.pieces.map((p) => ({
        id: p.id,
        position: p.position,
        content: p.content,
        display: p.display,
      })),
    };
  }

  // ─── Piece Management ───────────────────────────────────────────────────

  async createPiece(puzzleId: number, dto: CreatePuzzlePieceDto) {
    const entity = this.pieceRepository.create({ ...dto, puzzleId });
    return this.pieceRepository.save(entity);
  }

  async updatePiece(pieceId: number, dto: Partial<CreatePuzzlePieceDto>) {
    const piece = await this.pieceRepository.findOne({ where: { id: pieceId } });
    if (!piece) throw new NotFoundException('Piece not found');
    Object.assign(piece, dto);
    return this.pieceRepository.save(piece);
  }

  async removePiece(pieceId: number) {
    const piece = await this.pieceRepository.findOne({ where: { id: pieceId } });
    if (!piece) throw new NotFoundException('Piece not found');
    await this.pieceRepository.remove(piece);
    return { message: 'Piece deleted successfully' };
  }

  // ─── Progress Management ───────────────────────────────────────────────

  async getOrCreateProgress(userId: number, puzzleId: number) {
    let progress = await this.progressRepository.findOne({
      where: { userId, puzzleId },
      relations: ['puzzle'],
    });

    if (!progress) {
      const puzzle = await this.findOnePuzzle(puzzleId);
      progress = this.progressRepository.create({
        userId,
        puzzleId,
        puzzle,
      });
      progress = await this.progressRepository.save(progress);
    }

    return progress;
  }

  async getUserProgress(userId: number, puzzleId?: number) {
    if (puzzleId) {
      return this.progressRepository.findOne({
        where: { userId, puzzleId },
        relations: ['puzzle'],
      });
    }
    return this.progressRepository.find({
      where: { userId },
      relations: ['puzzle'],
      order: { createdAt: 'DESC' },
    });
  }

  async submitPuzzle(userId: number, dto: SubmitPuzzleDto) {
    const progress = await this.getOrCreateProgress(userId, dto.puzzleId);
    const puzzle = await this.findOnePuzzle(dto.puzzleId);

    // Check if all pieces placed correctly
    const allPiecesPlaced = dto.placedPieces.length === puzzle.pieceCount;

    if (allPiecesPlaced) {
      progress.isCompleted = true;
      progress.completedCount = (progress.completedCount || 0) + 1;
      progress.pointsEarned = (progress.pointsEarned || 0) + puzzle.points;
      progress.firstCompletedAt = progress.firstCompletedAt || new Date();

      if (dto.completionTime && (!progress.bestTime || dto.completionTime < progress.bestTime)) {
        progress.bestTime = dto.completionTime;
      }
    }

    progress.attemptCount = (progress.attemptCount || 0) + 1;
    progress.placedPieces = dto.placedPieces;
    progress.lastPlayedAt = new Date();

    return this.progressRepository.save(progress);
  }

  async resetProgress(userId: number, puzzleId: number) {
    const progress = await this.progressRepository.findOne({
      where: { userId, puzzleId },
    });
    if (progress) {
      await this.progressRepository.remove(progress);
    }
    return { message: 'Progress reset successfully' };
  }
}
