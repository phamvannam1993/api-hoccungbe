import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TtsService, TtsResponse } from './tts.service';
import { CreateTtsDto } from './dto/create-tts.dto';

@ApiTags('Text-to-Speech')
@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Synthesize text to speech',
    description:
      'Convert text to speech audio using Vietnamese voices. Returns audio URL and filename.',
  })
  @ApiResponse({
    status: 200,
    description: 'Audio generated successfully',
    schema: {
      example: {
        status: 'success',
        audio_url: '/audio/ca78a0c49d23e9dc3d8d64eb478d9001.mp3',
        filename: 'ca78a0c49d23e9dc3d8d64eb478d9001.mp3',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async synthesize(@Body() dto: CreateTtsDto): Promise<TtsResponse> {
    return this.ttsService.synthesize(dto);
  }

  @Post('generate')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sinh sẵn (pre-generate) giọng đọc cho toàn bộ câu hỏi của một khóa học',
    description:
      'Truyền slug môn học/khóa học (vd toan-lop-2). Hệ thống chạy NỀN: đọc từng câu hỏi (đã preprocess giống FE) → tải audio → lưu S3 + tts_cache. Trả về ngay số lượng việc.',
  })
  @ApiResponse({ status: 200, schema: { example: { course: 'toan-lop-2', totalTexts: 1460, alreadyCached: 0, started: true } } })
  async generate(@Body() body: { course: string; limit?: number }) {
    return this.ttsService.generateForCourse(body?.course, body?.limit || 0);
  }

  @Post('generate-texts')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sinh sẵn giọng đọc cho một danh sách câu chữ bất kỳ',
    description:
      'Dùng cho dữ liệu tĩnh không nằm trong bảng quizzes — vd Vòng tròn âm vần (tên âm, từ, từng bước đánh vần). Chạy NỀN: gọi TTS cục bộ → tải mp3 → lưu S3 + tts_cache.',
  })
  @ApiResponse({ status: 200, schema: { example: { nhan: 'am-van', totalTexts: 1200, alreadyCached: 0, started: true } } })
  async generateTexts(@Body() body: { texts: string[]; nhan?: string }) {
    return this.ttsService.generateForTexts(body?.texts, body?.nhan || 'texts');
  }

  @Post('cached-map')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Tra hàng loạt audio đã cache',
    description:
      'Nhận mảng text, trả về { text: audioUrl } cho những đoạn đã có sẵn. Tối đa 500 đoạn mỗi lần.',
  })
  @ApiResponse({ status: 200, schema: { example: { 'bờ': 'https://.../tts/abc.mp3' } } })
  async cachedMap(@Body() body: { texts: string[]; voice?: string }) {
    return this.ttsService.lookupCachedMany(body?.texts || [], body?.voice || 'vi');
  }

  @Get('cached')
  @ApiOperation({
    summary: 'Tra audio đã cache theo text',
    description:
      'Trả về URL audio (S3) đã tổng hợp sẵn cho đoạn text nếu tồn tại, để dùng lại thay vì gọi TTS. 404 nếu chưa có.',
  })
  @ApiResponse({ status: 200, description: 'Có cache', schema: { example: { audioUrl: 'https://.../tts/abc.mp3', durationMs: 1403, mimeType: 'audio/mpeg' } } })
  @ApiResponse({ status: 404, description: 'Chưa có cache cho text này' })
  async cached(
    @Query('text') text: string,
    @Query('voice') voice = 'vi',
    @Query('rate') rate = '+0%',
    @Query('pitch') pitch = '+0Hz',
  ) {
    const hit = await this.ttsService.lookupCached(text, voice, rate, pitch);
    if (!hit) throw new NotFoundException('Chưa có cache');
    return hit;
  }

  /* ─────────── Trang quản trị kho giọng đọc ─────────── */

  @Get('admin/list')
  @ApiOperation({ summary: 'Liệt kê bản ghi giọng đọc (admin)' })
  adminList(
    @Query('q') q?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.ttsService.adminList(q || '', Math.min(Number(limit) || 60, 200), Number(offset) || 0);
  }

  @Post('admin/replace')
  @HttpCode(200)
  @ApiOperation({ summary: 'Thay tệp audio của một bản ghi' })
  adminReplace(@Body() body: { cacheKey: string; audioUrl: string }) {
    return this.ttsService.adminThayAudio(body?.cacheKey, body?.audioUrl);
  }

  @Post('admin/regenerate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Đọc lại đoạn này bằng máy chủ giọng đọc' })
  adminRegenerate(@Body() body: { cacheKey: string }) {
    return this.ttsService.adminSinhLai(body?.cacheKey);
  }

  @Delete('admin/:cacheKey')
  @ApiOperation({ summary: 'Xoá bản ghi giọng đọc' })
  adminXoa(@Param('cacheKey') cacheKey: string) {
    return this.ttsService.adminXoa(cacheKey);
  }
}
