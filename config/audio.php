<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Audio Configuration
    |--------------------------------------------------------------------------
    |
    | Configure audio upload and storage settings
    |
    */

    'storage' => [
        'disk' => env('AUDIO_STORAGE_DISK', 'local'),
        'path' => env('AUDIO_STORAGE_PATH', 'audios'),
    ],

    'upload' => [
        'max_size' => env('AUDIO_MAX_SIZE', 52428800), // 50MB in bytes
        'allowed_mimes' => ['audio/mpeg', 'audio/wav', 'audio/mp4'],
        'allowed_extensions' => ['mp3', 'wav', 'm4a'],
    ],

    'pagination' => [
        'default_per_page' => env('AUDIO_DEFAULT_PER_PAGE', 15),
        'max_per_page' => env('AUDIO_MAX_PER_PAGE', 100),
    ],

    'features' => [
        'auto_detect_duration' => env('AUDIO_AUTO_DETECT_DURATION', true),
        'soft_delete' => env('AUDIO_SOFT_DELETE', true),
    ],
];
