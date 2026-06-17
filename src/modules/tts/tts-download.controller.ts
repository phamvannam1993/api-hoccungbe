import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import * as https from 'https';

@Controller('tts')
export class TtsDownloadController {
  private readonly logger = new Logger(TtsDownloadController.name);
  private readonly externalApiBaseUrl = process.env.TTS_BASE_URL || 'https://api-v2.behayhoc.com';

  @Get('download')
  downloadAudio(
    @Query('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      // Validate filename
      if (!filename) {
        res.status(400).json({ error: 'Filename is required' });
        return;
      }

      // Security: Validate filename format (prevent directory traversal)
      if (filename.includes('..') || filename.includes('/')) {
        res.status(400).json({ error: 'Invalid filename format' });
        return;
      }

      // Build the complete audio URL
      const audioUrl = `${this.externalApiBaseUrl}/audio/${filename}`;

      this.logger.log(`[TTS Download] Downloading: ${audioUrl}`);

      // Fetch audio from external API using https.get
      const urlObj = new URL(audioUrl);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        timeout: 30000, // 30 seconds timeout
      };

      https.get(options, (externalResponse) => {
        // Check if response is successful
        if (externalResponse.statusCode !== 200) {
          this.logger.error(
            `[TTS Download] External API returned ${externalResponse.statusCode}`,
          );
          res.status(externalResponse.statusCode || 500).json({
            error: externalResponse.statusCode === 404
              ? 'Audio file not found'
              : 'Failed to download from external API',
          });
          return;
        }

        // Set response headers for download
        const contentType = externalResponse.headers['content-type'] || 'audio/mpeg';
        const contentLength = externalResponse.headers['content-length'] || '';

        res.set({
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'public, max-age=604800', // 7 days
          ...(contentLength && { 'Content-Length': contentLength }),
        });

        // Stream the audio file
        externalResponse.pipe(res);

        // Handle streaming errors
        externalResponse.on('error', (error) => {
          this.logger.error('[TTS Download] Stream error:', error);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Download stream failed' });
          }
        });
      }).on('error', (error) => {
        this.logger.error('[TTS Download] Request error:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Download failed' });
        }
      });
    } catch (error) {
      this.logger.error('[TTS Download] Error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Download failed' });
      }
    }
  }
}
