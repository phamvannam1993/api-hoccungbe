<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use getID3;

class AudioStorageService
{
    /**
     * Storage disk name
     */
    protected const STORAGE_DISK = 'local';

    /**
     * Storage path for audios
     */
    protected const STORAGE_PATH = 'audios';

    /**
     * Allowed MIME types
     */
    protected const ALLOWED_MIMES = ['audio/mpeg', 'audio/wav', 'audio/mp4'];

    /**
     * Allowed file extensions
     */
    protected const ALLOWED_EXTENSIONS = ['mp3', 'wav', 'm4a'];

    /**
     * Maximum file size in bytes (50MB)
     */
    protected const MAX_FILE_SIZE = 52428800; // 50 * 1024 * 1024

    /**
     * Store audio file.
     *
     * @param UploadedFile $file
     * @return array{path: string, mime_type: string, duration: int|null, file_size: int}
     * @throws \Exception
     */
    public function storeAudioFile(UploadedFile $file): array
    {
        // Validate file
        $this->validateFile($file);

        // Generate unique filename
        $filename = $this->generateUniqueFilename($file);

        // Store file
        $path = Storage::disk(self::STORAGE_DISK)->putFileAs(
            self::STORAGE_PATH,
            $file,
            $filename
        );

        if (!$path) {
            throw new \Exception('Failed to store audio file');
        }

        // Get full file path
        $fullPath = storage_path('app/' . $path);

        return [
            'path' => $path,
            'mime_type' => $file->getMimeType() ?? 'audio/mpeg',
            'duration' => $this->getAudioDuration($fullPath),
            'file_size' => $file->getSize(),
        ];
    }

    /**
     * Delete audio file.
     *
     * @param string $filePath
     * @return bool
     */
    public function deleteAudioFile(string $filePath): bool
    {
        try {
            return Storage::disk(self::STORAGE_DISK)->delete($filePath);
        } catch (\Exception $e) {
            \Log::warning("Failed to delete audio file: {$filePath}", ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Get audio duration in seconds.
     *
     * @param string $filePath
     * @return int|null
     */
    public function getAudioDuration(string $filePath): ?int
    {
        try {
            if (!file_exists($filePath)) {
                return null;
            }

            // Try using getID3 library if available
            if (class_exists('getID3')) {
                $getID3 = new getID3();
                $fileInfo = $getID3->analyze($filePath);

                if (isset($fileInfo['playtime_seconds'])) {
                    return (int) ceil($fileInfo['playtime_seconds']);
                }
            }

            // Fallback: Try using shell command (ffprobe)
            return $this->getAudioDurationUsingFfprobe($filePath);
        } catch (\Exception $e) {
            \Log::warning("Failed to get audio duration for {$filePath}", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Get audio duration using ffprobe command.
     *
     * @param string $filePath
     * @return int|null
     */
    protected function getAudioDurationUsingFfprobe(string $filePath): ?int
    {
        try {
            $command = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1:noprint_wrappers=1 \"" . escapeshellarg($filePath) . "\" 2>/dev/null";
            $duration = shell_exec($command);

            if ($duration !== null && is_numeric($duration)) {
                return (int) ceil((float) $duration);
            }
        } catch (\Exception $e) {
            \Log::debug("ffprobe not available or failed", ['error' => $e->getMessage()]);
        }

        return null;
    }

    /**
     * Validate uploaded file.
     *
     * @param UploadedFile $file
     * @throws \Exception
     */
    protected function validateFile(UploadedFile $file): void
    {
        // Check file size
        if ($file->getSize() > self::MAX_FILE_SIZE) {
            throw new \Exception('File size exceeds maximum limit of 50MB');
        }

        // Check MIME type
        $mimeType = $file->getMimeType();
        if (!in_array($mimeType, self::ALLOWED_MIMES)) {
            throw new \Exception("MIME type '{$mimeType}' is not allowed. Allowed types: " . implode(', ', self::ALLOWED_MIMES));
        }

        // Check file extension
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, self::ALLOWED_EXTENSIONS)) {
            throw new \Exception("File extension '{$extension}' is not allowed. Allowed extensions: " . implode(', ', self::ALLOWED_EXTENSIONS));
        }
    }

    /**
     * Generate unique filename.
     *
     * @param UploadedFile $file
     * @return string
     */
    protected function generateUniqueFilename(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $uuid = Str::uuid();

        return "{$uuid}.{$extension}";
    }

    /**
     * Get full file URL.
     *
     * @param string $filePath
     * @return string
     */
    public function getFileUrl(string $filePath): string
    {
        return url('storage/' . $filePath);
    }

    /**
     * Check if file exists.
     *
     * @param string $filePath
     * @return bool
     */
    public function fileExists(string $filePath): bool
    {
        return Storage::disk(self::STORAGE_DISK)->exists($filePath);
    }
}
