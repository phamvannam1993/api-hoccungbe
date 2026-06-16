<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Audio extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'file_path',
        'duration',
        'file_size',
        'mime_type',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'duration' => 'integer',
        'file_size' => 'integer',
    ];

    /**
     * Get the formatted file size attribute.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function formattedFileSize(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return $this->formatFileSize($this->file_size);
            }
        );
    }

    /**
     * Get the formatted duration attribute.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function formattedDuration(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return $this->formatDuration($this->duration);
            }
        );
    }

    /**
     * Format file size to human readable format.
     *
     * @param int $bytes
     * @return string
     */
    public function formatFileSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }

    /**
     * Format duration (seconds) to human readable format (HH:MM:SS).
     *
     * @param int|null $seconds
     * @return string|null
     */
    public function formatDuration(?int $seconds): ?string
    {
        if ($seconds === null) {
            return null;
        }

        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $secs);
    }
}
