import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import * as https from 'https';
import * as http from 'http';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('admin')
  adminList(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('search') search?: string,
  ) {
    return this.documentsService.adminList(Number(page), Number(limit), search);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.documentsService.findAll(Number(page), Number(limit), search, categoryId ? Number(categoryId) : undefined);
  }

  @Get('download/:id')
  async downloadDocument(@Param('id') id: string, @Res() res: Response) {
    try {
      const document = await this.documentsService.findOne(Number(id));
      if (!document) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      const pdfUrl = document.pdfUrl;
      const protocol = pdfUrl.startsWith('https') ? https : http;

      protocol.get(pdfUrl, (response) => {
        if (response.statusCode !== 200) {
          res.status(404).json({ error: 'PDF not found' });
          return;
        }

        // Keep Vietnamese characters and spaces, remove only problematic filename chars
        const filename = `${document.title}.pdf`.replace(/[/\\:*?"<>|]/g, '').trim();
        const encodedFilename = encodeURIComponent(filename);
        res.setHeader('Content-Type', 'application/pdf');
        // RFC 5987 encoding for non-ASCII characters in headers
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
        response.pipe(res);
      }).on('error', () => {
        res.status(500).json({ error: 'Failed to download document' });
      });
    } catch (err) {
      throw new HttpException(
        err instanceof Error ? err.message : 'Failed to download document',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.documentsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(Number(id));
  }
}
