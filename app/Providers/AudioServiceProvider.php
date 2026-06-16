<?php

namespace App\Providers;

use App\Repositories\AudioRepository;
use App\Services\AudioStorageService;
use Illuminate\Support\ServiceProvider;

class AudioServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Register AudioStorageService as singleton
        $this->app->singleton(AudioStorageService::class, function ($app) {
            return new AudioStorageService();
        });

        // Register AudioRepository as singleton
        $this->app->singleton(AudioRepository::class, function ($app) {
            return new AudioRepository();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Publish configuration
        $this->publishes([
            __DIR__ . '/../../config/audio.php' => config_path('audio.php'),
        ]);
    }
}
