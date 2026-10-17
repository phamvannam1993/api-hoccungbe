import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { IqIconsService } from './iq-icons.service';
import { AdminGuard } from '../../common/guards/admin.guard';

/**
 * Tên icon = tên file ảnh mặc định ('icon_title.png', 'star_1.png'), hoặc emoji
 * trong nội dung bài viết dạng mã Unicode ('emoji-1f7e5', 'emoji-1f468-200d-1f469').
 */
const ICON_KEY =
  /^(?:[a-z0-9_-]{1,60}\.(png|jpg|jpeg|webp|svg)|emoji-[0-9a-f]{2,6}(?:-[0-9a-f]{2,6}){0,9})$/;
const IMAGE_TYPES = /^image\/(png|jpe?g|webp|svg\+xml|gif)$/;

function assertKey(iconKey: string) {
  if (!ICON_KEY.test(iconKey))
    throw new BadRequestException('Tên icon không hợp lệ');
}

@Controller('iq-icons')
export class IqIconsController {
  constructor(private readonly service: IqIconsService) {}

  /** Công khai — frontend khu Toán IQ gọi để biết icon nào đã được thay. */
  @Get()
  getMap() {
    return this.service.getMap();
  }

  /** Admin: upload ảnh mới cho một icon (multipart, field `file`). */
  @Post(':iconKey/upload')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!IMAGE_TYPES.test(file.mimetype)) {
          callback(
            new BadRequestException('Chỉ nhận ảnh png, jpg, webp, svg, gif'),
            false,
          );
          return;
        }
        callback(null, true);
      },
    }),
  )
  async upload(
    @Param('iconKey') iconKey: string,
    @UploadedFile()
    file: {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
      size: number;
    },
  ) {
    assertKey(iconKey);
    if (!file) throw new BadRequestException('Chưa chọn ảnh');
    return this.service.upload(iconKey, file);
  }

  /** Admin: khôi phục ảnh mặc định của một icon. */
  @Delete(':iconKey')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('iconKey') iconKey: string) {
    assertKey(iconKey);
    return this.service.remove(iconKey);
  }
}
