import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';

@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @Get('child/:childId')
  @ApiOperation({ summary: 'Danh sách chứng nhận của bé' })
  listForChild(@Param('childId', ParseIntPipe) childId: number) {
    return this.service.listForChild(childId);
  }

  @Post('issue')
  @ApiOperation({ summary: 'Cấp chứng nhận khi bé hoàn thành khóa học' })
  issue(@Body() body: { childId: number; courseId: number; force?: boolean }) {
    return this.service.issue(body.childId, body.courseId, body.force ?? false);
  }

  @Get('verify/:code')
  @ApiOperation({ summary: 'Xác thực chứng nhận theo mã' })
  verify(@Param('code') code: string) {
    return this.service.verify(code);
  }
}
