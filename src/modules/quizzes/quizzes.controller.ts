import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { S3UploadService } from '../../common/services/s3-upload.service';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Tạo câu hỏi quiz mới' })
  @ApiResponse({ status: 201, description: 'Tạo câu hỏi quiz thành công', type: Quiz })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  create(@Body() dto: CreateQuizDto) {
    return this.quizzesService.create(dto);
  }

  @Post('upload-audio')
  @ApiOperation({
    summary: 'Upload audio lên S3 (câu hỏi, câu trả lời, giải thích)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'File audio (mp3, wav, ogg, m4a)' },
        folder: { type: 'string', example: 'quizzes/questions', description: 'Thư mục S3 (tùy chọn)' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Upload thành công, trả về URL',
    schema: { example: { url: 'https://bucket.s3.ap-southeast-1.amazonaws.com/quizzes/questions/uuid.mp3' } },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadAudio(
    @UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string },
    @Body('folder') folder?: string,
  ) {
    try {
      const url = await this.s3UploadService.uploadAudio(file, folder || 'quizzes/audio');
      return { url };
    } catch (err) {
      console.error('[uploadAudio] error:', err);
      throw err;
    }
  }

  @Post('upload-image')
  @ApiOperation({ summary: 'Upload ảnh lên S3 cho câu hỏi' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'File ảnh (jpg, png, gif, webp)' },
        folder: { type: 'string', example: 'quizzes/images', description: 'Thư mục S3 (tùy chọn)' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    schema: { example: { url: 'https://bucket.s3.ap-southeast-1.amazonaws.com/quizzes/images/uuid.jpg' } },
  })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadImage(
    @UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string },
    @Body('folder') folder?: string,
  ) {
    const url = await this.s3UploadService.uploadImage(file, folder || 'quizzes/images');
    return { url };
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi quiz' })
  @ApiQuery({ name: 'lessonId', required: false, type: Number })
  @ApiQuery({ name: 'courseId', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lấy danh sách câu hỏi quiz thành công', type: [Quiz] })
  findAll(
    @Query('lessonId') lessonId?: string,
    @Query('courseId') courseId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.quizzesService.findAll(
      lessonId ? +lessonId : undefined,
      courseId ? +courseId : undefined,
      search || undefined,
      page ? +page : 1,
      limit ? +limit : 20,
    );
  }

  @Get('by-lesson/:lessonId')
  @ApiOperation({ summary: 'Lấy câu hỏi theo bài học, nhóm theo trình độ' })
  @ApiParam({ name: 'lessonId', example: 1 })
  findByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.quizzesService.findByLesson(lessonId);
  }

  @Get('exercises/:lessonId')
  @ApiOperation({ summary: 'Lấy danh sách bài tập (mỗi bài 10 câu) của một bài học' })
  @ApiParam({ name: 'lessonId', example: 1 })
  findExercises(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.quizzesService.findExercises(lessonId);
  }

  @Get('exercises/:lessonId/:exerciseNumber')
  @ApiOperation({ summary: 'Lấy 10 câu hỏi của bài tập theo số thứ tự' })
  @ApiParam({ name: 'lessonId', example: 1 })
  @ApiParam({ name: 'exerciseNumber', example: 1 })
  findExercise(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Param('exerciseNumber', ParseIntPipe) exerciseNumber: number,
  ) {
    return this.quizzesService.findExerciseByNumber(lessonId, exerciseNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết câu hỏi quiz theo id' })
  @ApiParam({ name: 'id', example: 1, description: 'ID câu hỏi quiz' })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết câu hỏi quiz thành công', type: Quiz })
  @ApiResponse({ status: 404, description: 'Câu hỏi quiz không tồn tại' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật câu hỏi quiz' })
  @ApiParam({ name: 'id', example: 1, description: 'ID câu hỏi quiz' })
  @ApiResponse({ status: 200, description: 'Cập nhật câu hỏi quiz thành công', type: Quiz })
  @ApiResponse({ status: 400, description: 'Dữ liệu cập nhật không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Câu hỏi quiz không tồn tại' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizDto) {
    return this.quizzesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa câu hỏi quiz theo id' })
  @ApiParam({ name: 'id', example: 1, description: 'ID câu hỏi quiz' })
  @ApiResponse({
    status: 200,
    description: 'Xóa câu hỏi quiz thành công',
    schema: { example: { message: 'Quiz deleted successfully' } },
  })
  @ApiResponse({ status: 404, description: 'Câu hỏi quiz không tồn tại' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.remove(id);
  }
}
